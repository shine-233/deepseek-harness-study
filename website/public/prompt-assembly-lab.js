/**
 * 提示词装配实验页的渲染层。模型在 prompt-assembly-model.js；
 * 本文件只画返回值：缓存地形条、分段表和读数读的是同一次装配。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText,
  animateNumber,
  installDeclaredIcons,
  installScrollProgress,
  installInputReset,
} from './study-lab-kit.js'
import {
  buildPromptAssemblyModel,
  evaluatePromptAssemblyOracle,
} from './prompt-assembly-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const PA_STATE_SCHEMA = {
  personaVersion: { enum: ['v1', 'v2'] },
  policy: { enum: ['ask', 'never', 'absent'] },
  changeTarget: { enum: ['none', 'persona', 'policy', 'tools'] },
  toolOrder: { enum: ['default', 'custom-first'] },
}

function renderCacheBar(model, target, note) {
  target.replaceChildren()
  const bar = svgElement('svg', {
    viewBox: '0 0 900 96',
    role: 'img',
    'aria-labelledby': 'pa-svg-title pa-svg-desc',
    width: '100%',
  })
  bar.append(
    svgElement('title', { id: 'pa-svg-title' }, '提示词分段的缓存地形图'),
    svgElement('desc', { id: 'pa-svg-desc' },
      '每个色块是一个 order 段，宽度与字节数成正比；亮色为命中缓存，'
      + '虚线描边是本轮的变化段，其后所有色块重新计费。'),
  )
  const total = Math.max(1, model.observations.totalBytes)
  let x = 4
  const boundary = model.observations.changedIndex
  for (const [index, segment] of model.segments.entries()) {
    const width = Math.max(10, (segment.bytes / total) * 892)
    const block = svgElement('g', {
      class: 'pa-block',
      'data-lane': segment.lane,
      'data-reveal': '',
      transform: `translate(${x}, 8)`,
    })
    const isCached = boundary === null || index < boundary
    block.append(
      svgElement('rect', {
        width: width - 3, height: 80, rx: 6,
        class: isCached ? 'is-cached' : 'is-changed',
        fill: 'inherit',
      }),
      svgElement('text', { x: 6, y: 20, class: 'cell-type' }, String(segment.order)),
      svgElement('text', { x: 6, y: 40, class: 'cell-seq' }, segment.lane),
      svgElement('text', { x: 6, y: 60, class: 'cell-glyph' }, String(segment.bytes) + 'B'),
    )
    block.append(svgElement('title', {},
      `order ${segment.order} · ${segment.source} · ${segment.bytes} 字节 · `
      + (isCached ? '命中缓存' : '重新计费')))
    bar.append(block)
    x += width
  }
  target.append(bar)
  revealOnScroll(target)

  const hit = model.observations.cacheHitRatio
  writeText(note, model.observations.changedIndex === null
    ? `本轮没有任何变化：${model.observations.totalBytes} 字节全部命中缓存。`
    : `变化落在第 ${model.observations.changedIndex} 段：前缀命中 ${model.observations.cachedBytes} 字节（${hit}%），`
      + '其后 ' + model.observations.freshBytes + ' 字节重新计费。')
}

function initializePage() {
  const elements = {
    form: document.querySelector('#pa-form'),
    persona: document.querySelector('#persona'),
    policy: document.querySelector('#policy'),
    changeTarget: document.querySelector('#change-target'),
    toolOrder: document.querySelector('#tool-order'),
    feedback: document.querySelector('#pa-feedback'),
    plot: document.querySelector('#pa-plot'),
    note: document.querySelector('#pa-note'),
    tableBody: document.querySelector('#pa-table-body'),
    tableCaption: document.querySelector('#pa-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    segments: document.querySelector('#pa-metric-segments'),
    total: document.querySelector('#pa-metric-total'),
    cached: document.querySelector('#pa-metric-cached'),
    fresh: document.querySelector('#pa-metric-fresh'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  const rebuild = () => {
    try {
      const model = buildPromptAssemblyModel({
        personaVersion: elements.persona.value,
        policy: elements.policy.value,
        changeTarget: elements.changeTarget.value,
        toolOrder: elements.toolOrder.value,
      })
      const verdict = evaluatePromptAssemblyOracle(model)
      renderCacheBar(model, elements.plot, elements.note)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      renderRows(elements.tableBody, model.segments.map((segment, index) => ({
        key: String(index),
        state: index === model.observations.changedIndex ? 'remind' : 'plain',
        cells: [
          String(index),
          String(segment.order),
          segment.lane,
          segment.source,
          String(segment.bytes),
          model.observations.changedIndex !== null && index >= model.observations.changedIndex ? '重算' : '命中',
        ],
      })))
      writeText(elements.tableCaption, '当前输入的 ' + String(model.segments.length) + ' 个分段')
      animateNumber(elements.segments, model.observations.segmentCount)
      animateNumber(elements.total, model.observations.totalBytes)
      animateNumber(elements.cached, model.observations.cachedBytes)
      animateNumber(elements.fresh, model.observations.freshBytes)
      setFeedback('已装配：' + String(model.segments.length) + ' 段、'
        + String(model.observations.totalBytes) + ' 字节，命中率 '
        + String(model.observations.cacheHitRatio) + '%。', 'success')
      persistState()
    } catch (error) {
      console.error('[prompt-assembly] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        personaVersion: elements.persona.value,
        policy: elements.policy.value,
        changeTarget: elements.changeTarget.value,
        toolOrder: elements.toolOrder.value,
      }, PA_STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', event => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.persona, elements.policy, elements.changeTarget, elements.toolOrder]) {
    control.addEventListener('change', rebuild)
  }

  const restored = readStateFromHash(location.hash, PA_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.persona.value = restored.value.personaVersion
    elements.policy.value = restored.value.policy
    elements.changeTarget.value = restored.value.changeTarget
    elements.toolOrder.value = restored.value.toolOrder
  }
  rebuild()

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可，状态就在 #state= 后面。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'prefix-safe',
    explain: {
      'prefix-safe': '正确。CACHE_BOUNDARY_ARITHMETIC 算的是「第一个变化段之前」：115 号之前的 -100 和 0 号两段一字未动，全部命中。',
      'all-rebilled': 'CACHE_BOUNDARY_ARITHMETIC 不这么算：缓存边界在第一个变化段，之前的前缀照旧便宜。',
      'policy-only-free': '反了——变化段自己以及排在它后面的段落才重新计费；它前面的部分不受影响。',
    },
  })
}
