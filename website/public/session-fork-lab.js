/**
 * Session fork 与崩溃修复实验页的渲染层。模型在 session-fork-model.js；
 * 本文件只画返回值。时间线、步骤表和读数读的是同一个 steps 数组。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installInputReset, bindPlotScrub } from './study-lab-kit.js'
import {
  FORK_LANES,
  buildSessionForkModel,
  evaluateSessionForkOracle,
} from './session-fork-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：两个维度都是受控枚举；步进位置的上界由模型按步骤数给出，
// 这里只卡整数下界，越界值在恢复时被拉回当前输入的末步。
const FORK_STATE_SCHEMA = {
  crash: { enum: ['complete', 'crash-mid-tool'] },
  fork: { enum: ['no-fork', 'fork'] },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

function renderFlow(model, target, note) {
  const slot = 72
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + FORK_LANES.length * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + FORK_LANES.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'sf-svg-title sf-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'sf-svg-title' }, '崩溃、恢复与继承的有序步骤'),
    svgElement('desc', { id: 'sf-svg-desc' },
      '纵轴是参与方：父 Session、恢复阶段和子 Session；横轴是步骤序号。'
      + '虚线圆环是崩溃标记，恢复泳道的实心点是 unknown 修复，子泳道的第一步是前缀继承。'),
  )

  for (const lane of FORK_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const step of model.steps) {
    const x = xFor(step.index)
    const y = yFor(step.lane)
    const classes = ['sf-dot']
    if (step.phase === 'crash') classes.push('is-crash')
    if (step.phase === 'repair') classes.push('is-repair')
    if (step.phase === 'inherit') classes.push('is-inherit')
    if (step.phase === 'result') classes.push('is-result')
    const dot = svgElement('circle', {
      'data-reveal': '',
      cx: x, cy: y, r: 9, class: classes.join(' '), 'data-step': String(step.index),
    })
    dot.append(svgElement('title', {},
      '第 ' + String(step.index) + ' 步 · ' + step.phase + '：' + step.detail))
    svg.append(
      dot,
      svgElement('text', { x, y: height - 20, class: 'axis', 'text-anchor': 'middle' }, String(step.index)),
    )
  }

  target.append(svg)
  revealOnScroll(target)

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步，收束在「'
    + model.observations.closingLane + '」泳道。'
  if (model.input.crash === 'crash-mid-tool') {
    message += '崩溃后恢复补出 interrupted、结果记为 unknown——诚实优先于好看。'
  } else {
    message += '没有崩溃：意图和结果成对出现，不需要任何修复。'
  }
  if (model.observations.eventsInherited !== null) {
    message += 'fork 继承了父日志前缀的 ' + String(model.observations.eventsInherited) + ' 个事件。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#sf-form'),
    crash: document.querySelector('#crash'),
    fork: document.querySelector('#fork'),
    feedback: document.querySelector('#sf-feedback'),
    flow: document.querySelector('#sf-plot'),
    flowNote: document.querySelector('#sf-note'),
    tableBody: document.querySelector('#sf-table-body'),
    tableCaption: document.querySelector('#sf-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    inherited: document.querySelector('#metric-inherited'),
    repairs: document.querySelector('#metric-repairs'),
    closing: document.querySelector('#metric-closing'),
    ghost: document.querySelector('#metric-ghost'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#sf-step'),
    stepOutput: document.querySelector('#sf-step-output'),
    stepPrev: document.querySelector('#sf-step-prev'),
    stepNext: document.querySelector('#sf-step-next'),
    stepCaption: document.querySelector('#sf-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  // 把滑杆位置同步到图和表：当前步加描边高亮，之后的步骤淡出；
  // 说明文字逐字取自模型步骤，不在这里新编事实。
  const syncStep = () => {
    if (currentModel === null) return
    const total = currentModel.steps.length
    const max = String(total - 1)
    elements.step.max = max
    if (Number(elements.step.value) > total - 1 || Number(elements.step.value) < 0) {
      elements.step.value = max
    }
    const index = Number(elements.step.value)
    writeText(elements.stepOutput, String(index))
    for (const dot of elements.flow.querySelectorAll('[data-step]')) {
      const at = Number(dot.getAttribute('data-step'))
      dot.classList.toggle('is-current', at === index)
      dot.classList.toggle('is-future', at > index)
    }
    for (const row of elements.tableBody.querySelectorAll('tr[data-key]')) {
      const at = Number(row.dataset.key)
      row.classList.toggle('is-current', at === index)
      row.classList.toggle('is-future', at > index)
    }
    const entry = currentModel.steps[index]
    writeText(elements.stepCaption, '第 ' + String(entry.index) + ' 步 · ' + entry.lane
      + ' · ' + entry.phase + '：' + entry.detail)
    elements.stepPrev.disabled = index <= 0
    elements.stepNext.disabled = index >= total - 1
  }

  const rebuild = () => {
    try {
      const input = {
        crash: elements.crash.value,
        fork: elements.fork.value,
      }
      const model = buildSessionForkModel(input)
      const verdict = evaluateSessionForkOracle(model)
      currentModel = model

      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.tableBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.phase === 'crash' ? 'skip'
          : step.phase === 'repair' ? 'repair'
          : step.phase === 'inherit' ? 'inherit' : 'plain',
        cells: [
          String(step.index),
          step.lane,
          step.phase,
          step.detail,
          typeof step.inherited === 'number' ? 'seed=' + String(step.inherited)
            : step.repairedAsUnknown === true ? 'unknown' : '—',
        ],
      })))
      writeText(elements.tableCaption, '当前输入的全部 ' + String(model.steps.length) + ' 步')

      const repairCount = model.steps.filter(step => step.phase === 'repair').length
      writeText(elements.inherited, model.observations.eventsInherited === null
        ? '—' : String(model.observations.eventsInherited))
      writeText(elements.repairs, String(repairCount))
      writeText(elements.closing, model.observations.closingLane)
      writeText(elements.ghost, model.observations.ghostSuccess ? '有' : '无')
      setFeedback('已推演：修复 ' + String(repairCount) + ' 条，收束于「'
        + model.observations.closingLane + '」。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[session-fork] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        crash: elements.crash.value,
        fork: elements.fork.value,
        step: Number(elements.step.value),
      }, FORK_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.crash, elements.fork]) {
    control.addEventListener('change', () => {
      // 换输入会改变步数：先按新输入重建，再把步进拉回末尾看完整时间线。
      rebuild()
      elements.step.value = elements.step.max
      elements.step.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }

  elements.step.addEventListener('input', () => {
    syncStep()
    persistState()
  })
  const nudgeStep = delta => {
    elements.step.value = String(Math.min(Number(elements.step.max),
      Math.max(Number(elements.step.min), Number(elements.step.value) + delta)))
    elements.step.dispatchEvent(new Event('input', { bubbles: true }))
  }
  elements.stepPrev.addEventListener('click', () => nudgeStep(-1))
  elements.stepNext.addEventListener('click', () => nudgeStep(1))
  // 焦点在页面其它地方时，← / → / Home / End 直接步进这条主时间轴。
  bindRangeKeys(elements.step)
  bindPlotScrub(elements.flow, elements.step)

  // 恢复前先放宽滑杆上界：max=0 时赋值会被浏览器钳回 0，hash 里的步进会丢；
  // 真实上界由同步步骤按模型步数写回。
  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, FORK_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.crash.value = restored.value.crash
    elements.fork.value = restored.value.fork
    elements.step.value = String(restored.value.step)
  }

  rebuild()
  if (!hasRestoredStep || Number(elements.step.value) > Number(elements.step.max)) {
    elements.step.value = elements.step.max
    rebuild()
  }

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
    correct: 'interrupted-unknown',
    explain: {
      'marked-ok': 'REPAIR_HONESTY 不允许它发生：结果从未落册，把它写成成功就是伪造证据。',
      'interrupted-unknown': '正确。恢复阶段根据未闭合事实补出 interrupted，NO_GHOST_SUCCESS 同时确认每个意图都有去向。',
      'dropped-intent': '追加式日志不丢历史——意图已经入册，NO_GHOST_SUCCESS 要求它必须有 unknown 这样的去向。',
    },
  })
}
