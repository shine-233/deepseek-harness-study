/**
 * 工具可见性实验页的渲染层。
 *
 * 模型在 tool-visibility-model.js；本文件只画返回值，不做判定。同心集合图和分层
 * 计数条读的是同一个 tools 数组，所以两张图和表格不可能互相矛盾。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  AGENT_SCOPES,
  EXECUTION_POLICIES,
  TOOL_BUNDLES,
  buildToolVisibilityModel,
  evaluateToolVisibilityOracle,
} from './tool-visibility-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：勾选的 Bundle 必须都来自模型认识的清单；
// 作用域和执行策略是枚举。空勾选是合法输入，对应“什么都没装”的教学状态。
const VISIBILITY_STATE_SCHEMA = {
  bundles: { stringList: TOOL_BUNDLES },
  scope: { enum: AGENT_SCOPES.map(scope => scope.id) },
  policy: { enum: EXECUTION_POLICIES.map(policy => policy.id) },
}

const LEVEL_LABELS = ['未注册', '已注册', '模型可见', '允许执行']

/**
 * 同心矩形：外圈是已注册，中圈是模型可见，内圈是允许执行。
 * 一个工具只画一次，画在它到达的最内层里；被挡住的工具留在把它挡下的那一圈。
 */
function renderNest(model, target, note) {
  const width = 1080
  const height = 470
  const pad = 26
  target.replaceChildren()

  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'nest-svg-title nest-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'nest-svg-title' }, '工具注册、模型可见与允许执行的三层同心集合'),
    svgElement('desc', { id: 'nest-svg-desc' },
      '三个同心矩形分别是已注册、模型可见和允许执行；工具画在它能到达的最内层。'
      + '完整判定在本页最后的表格里逐行给出。'),
  )

  const rings = [
    { id: 'registered', label: '已注册', inset: 0 },
    { id: 'model-visible', label: '模型可见', inset: 74 },
    { id: 'execution-allowed', label: '允许执行', inset: 148 },
  ]
  for (const [index, ring] of rings.entries()) {
    svg.append(
      svgElement('rect', {
        x: pad + ring.inset,
        y: pad + ring.inset * 0.42,
        width: width - 2 * pad - 2 * ring.inset,
        height: height - 2 * pad - ring.inset * 0.84,
        rx: 18,
        class: 'ring ring-' + String(index + 1),
      }),
      svgElement('text', {
        x: pad + ring.inset + 14,
        y: pad + ring.inset * 0.42 + 22,
        class: 'ring-label',
      }, ring.label + '（' + String(model.levels[index].members.length) + '）'),
    )
  }

  // 每一圈里，工具按 Bundle 分组横排；位置只是布局，不承载数值。
  const byLevel = new Map([[0, []], [1, []], [2, []], [3, []]])
  for (const tool of model.tools) byLevel.get(tool.reachedLevel).push(tool)

  const zones = [
    { level: 3, x: pad + 162, y: pad + 74, w: width - 2 * pad - 324 },
    { level: 2, x: pad + 88, y: pad + 300, w: width - 2 * pad - 176 },
    { level: 1, x: pad + 14, y: pad + 372, w: width - 2 * pad - 28 },
    { level: 0, x: pad + 14, y: pad + 414, w: width - 2 * pad - 28 },
  ]

  for (const zone of zones) {
    const tools = byLevel.get(zone.level)
    if (tools.length === 0) continue
    const perRow = Math.max(1, Math.floor(zone.w / 176))
    for (const [index, tool] of tools.entries()) {
      const column = index % perRow
      const row = Math.floor(index / perRow)
      const x = zone.x + column * (zone.w / perRow)
      const y = zone.y + row * 30
      const chip = svgElement('g', { class: 'chip level-' + String(zone.level), 'data-tool': tool.name })
      chip.append(
        svgElement('rect', { x, y, width: Math.min(168, zone.w / perRow - 8), height: 24, rx: 6, class: 'chip-box', 'data-reveal': '' }),
        svgElement('text', { x: x + 9, y: y + 16, class: 'chip-text' },
          (zone.level === 3 ? '✓ ' : '✕ ') + tool.name),
      )
      chip.append(svgElement('title', {},
        tool.name + '（' + tool.bundle + ' · ' + tool.access + ' · risk=' + tool.risk + '）：'
        + (tool.executionAllowed ? '允许执行' : '停在' + LEVEL_LABELS[tool.reachedLevel] + '，' + tool.blockedBy)))
      chip.setAttribute('tabindex', '0')
      chip.setAttribute('role', 'button')
      chip.setAttribute('aria-label', tool.name + '：'
        + (tool.executionAllowed ? '允许执行' : '停在' + LEVEL_LABELS[tool.reachedLevel] + '，' + tool.blockedBy)
        + '；按回车键追踪它的判定链路')
      svg.append(chip)
    }
  }

  target.append(svg)
  revealOnScroll(target)
  const gap = model.observations.visibleButNotAllowed
  writeText(note, gap.length === 0
    ? '当前输入下没有“模型可见但不允许执行”的工具：这一档要靠更宽的作用域配更严的策略才造得出来。'
    : '模型看得见却不允许执行的有 ' + String(gap.length) + ' 个：' + gap.join('、')
      + '。它们出现在工具清单里，但策略不放它们进执行。')
}

/** 分层计数条：四段之和恒等于清单总数，这一点由 oracle 检查。 */
function renderFunnel(model, target, note) {
  const width = 1080
  const height = 176
  const left = 128
  const right = 30
  const rowHeight = 34
  const total = model.observations.catalog
  target.replaceChildren()

  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'funnel-svg-title funnel-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'funnel-svg-title' }, '工具在四种去向上的数量'),
    svgElement('desc', { id: 'funnel-svg-desc' },
      '条的长度是工具数量；四段分别是被 Bundle 挡下、被作用域挡下、被策略挡下和允许执行。'),
  )

  const rows = [
    { label: '允许执行', count: model.observations.executionAllowed, tone: 'allow' },
    { label: '策略挡下', count: model.observations.blockedByPolicy, tone: 'policy' },
    { label: '作用域挡下', count: model.observations.blockedByScope, tone: 'scope' },
    { label: 'Bundle 未加载', count: model.observations.blockedByBundle, tone: 'bundle' },
  ]

  for (const [index, row] of rows.entries()) {
    const y = 14 + index * rowHeight
    const barWidth = total === 0 ? 0 : (row.count / total) * (width - left - right)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 17, class: 'axis', 'text-anchor': 'end' }, row.label),
      svgElement('rect', {
        x: left, y, width: Math.max(row.count === 0 ? 0 : 3, barWidth), height: 22, rx: 4,
        class: 'funnel-bar tone-' + row.tone,
      }),
      svgElement('text', { x: left + barWidth + 10, y: y + 17, class: 'mark-value' }, String(row.count)),
    )
  }

  target.append(svg)
  revealOnScroll(target)
  writeText(note, '四段之和 ' + String(rows.reduce((sum, row) => sum + row.count, 0))
    + ' 等于清单里的 ' + String(total) + ' 个工具；作用域是「' + model.scope.label
    + '」，策略是「' + model.policy.label + '」。')
}

function initializePage() {
  const elements = {
    form: document.querySelector('#visibility-form'),
    bundleChecks: document.querySelector('#bundle-checks'),
    scope: document.querySelector('#scope'),
    scopeNote: document.querySelector('#scope-note'),
    policy: document.querySelector('#policy'),
    policyNote: document.querySelector('#policy-note'),
    feedback: document.querySelector('#visibility-feedback'),
    nest: document.querySelector('#nest-plot'),
    nestNote: document.querySelector('#nest-note'),
    funnel: document.querySelector('#funnel-plot'),
    funnelNote: document.querySelector('#funnel-note'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    tableBody: document.querySelector('#visibility-table-body'),
    tableCaption: document.querySelector('#table-caption'),
    catalog: document.querySelector('#metric-catalog'),
    registered: document.querySelector('#metric-registered'),
    visible: document.querySelector('#metric-visible'),
    allowed: document.querySelector('#metric-allowed'),
    gap: document.querySelector('#metric-gap'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    traceNote: document.querySelector('#trace-note'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null
  let tracedTool = null

  // 点击追踪：选中一个工具后，同心图、计数条、圆环和表格行同时高亮同一条判定链路；
  // 说明文字逐字段取自模型输出，不在这里新编原因。
  // 点击追踪：选中一个工具后，同心图、计数条、圆环和表格行同时高亮同一条判定链路；
  // 说明文字逐字段取自模型输出，不在这里新编原因。
  // 传播动画：环（0/80/160ms）→ 计数条（200ms）→ 色块脉冲（260ms）；
  // prefers-reduced-motion 下跳过级联延迟，直接落位。
  const TRACE_TONES = { 3: 'allow', 2: 'policy', 1: 'scope', 0: 'bundle' }
  const reducedMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const applyTrace = () => {
    if (currentModel === null) return
    const tool = tracedTool === null ? null : currentModel.tools.find(item => item.name === tracedTool) ?? null
    for (const chip of elements.nest.querySelectorAll('[data-tool]')) {
      chip.classList.toggle('is-traced', tool !== null && chip.getAttribute('data-tool') === tool.name)
      chip.classList.toggle('is-dim', tool !== null && chip.getAttribute('data-tool') !== tool.name)
    }
    for (const row of elements.tableBody.querySelectorAll('tr[data-key]')) {
      row.classList.toggle('is-traced', tool !== null && row.dataset.key === tool.name)
      row.classList.toggle('is-dim', tool !== null && row.dataset.key !== tool.name)
    }
    for (const bar of elements.funnel.querySelectorAll('.funnel-bar')) bar.classList.remove('is-traced')
    const rings = [1, 2, 3].map(index => elements.nest.querySelector('.ring-' + String(index)))
    rings.forEach((ring, index) => {
      ring?.classList.remove('is-block', 'is-dim-ring')
      if (ring && !reducedMotion) ring.style.transitionDelay = `${String(index * 80)}ms`
    })
    if (tool === null) {
      writeText(elements.traceNote, '点击任意一个工具（同心图色块或表格行），追踪它走到哪一层、被哪道收窄挡下；再点一次取消。')
      return
    }
    if (tool.reachedLevel < 3) {
      const blocker = rings[tool.reachedLevel]
      if (blocker) {
        if (!reducedMotion) blocker.style.transitionDelay = '240ms'
        blocker.classList.add('is-block')
      }
      rings.forEach((ring, index) => {
        if (index !== tool.reachedLevel && index > tool.reachedLevel) ring?.classList.add('is-dim-ring')
      })
    } else if (rings[0]) {
      rings.forEach((ring, index) => {
        if (!reducedMotion) ring.style.transitionDelay = `${String(index * 80)}ms`
        ring?.classList.add('is-pass')
      })
    }
    const tone = TRACE_TONES[tool.reachedLevel]
    const bar = elements.funnel.querySelector('.tone-' + tone)
    if (bar) {
      if (!reducedMotion) bar.style.transitionDelay = '300ms'
      bar.classList.add('is-traced')
    }
    const tracedChip = elements.nest.querySelector(`[data-tool="${tool.name}"]`)
    if (tracedChip && !reducedMotion) tracedChip.style.transitionDelay = '260ms'
    // SVG 路径描边：从工具色块到被挡环的连接线
    const svg = elements.nest.querySelector('svg')
    if (svg) {
      svg.querySelectorAll('.tv-trace-path').forEach(p => p.remove())
      if (tool.reachedLevel < 3) {
        const chipBox = tracedChip?.querySelector('.chip-box')
        if (chipBox) {
          const cx = Number(chipBox.getAttribute('x') ?? 0) + Number(chipBox.getAttribute('width') ?? 0) / 2
          const cy = Number(chipBox.getAttribute('y') ?? 0) + Number(chipBox.getAttribute('height') ?? 0) / 2
          const targetRing = rings[tool.reachedLevel]
          if (targetRing) {
            const rx = Number(targetRing.getAttribute('x') ?? 0) + 14
            const ry = Number(targetRing.getAttribute('y') ?? 0) + Number(targetRing.getAttribute('height') ?? 0) / 2
            const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            lineEl.setAttribute('x1', String(cx))
            lineEl.setAttribute('y1', String(cy))
            lineEl.setAttribute('x2', String(rx))
            lineEl.setAttribute('y2', String(ry))
            lineEl.setAttribute('class', 'tv-trace-path is-drawing')
            svg.append(lineEl)
          }
        }
      }
    }
    const stepsText = [
      'Bundle ' + tool.bundle + '：' + (tool.registered ? '已加载 ✓' : '未加载 ✕'),
      'agent 作用域「' + currentModel.scope.label + '」：' + (tool.modelVisible ? '模型可见 ✓' : '不可见 ✕'),
      '执行策略「' + currentModel.policy.label + '」：' + (tool.executionAllowed ? '允许执行 ✓' : '不放行 ✕'),
    ]
    writeText(elements.traceNote, '追踪 ' + tool.name + '：' + stepsText.join(' → ')
      + (tool.executionAllowed ? '。它落在最内层。' : '。停在「' + LEVEL_LABELS[tool.reachedLevel] + '」，被 ' + tool.blockedBy + ' 挡下。'))
  }

  for (const bundle of TOOL_BUNDLES) {
    const label = document.createElement('label')
    label.className = 'bundle-check'
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.value = bundle
    input.checked = true
    const text = document.createElement('span')
    writeText(text, bundle)
    label.append(input, text)
    elements.bundleChecks.append(label)
    input.addEventListener('change', () => rebuild())
  }
  for (const scope of AGENT_SCOPES) {
    const option = document.createElement('option')
    option.value = scope.id
    writeText(option, scope.label)
    elements.scope.append(option)
  }
  for (const policy of EXECUTION_POLICIES) {
    const option = document.createElement('option')
    option.value = policy.id
    writeText(option, policy.label)
    elements.policy.append(option)
  }
  elements.scope.value = 'full'
  elements.policy.value = 'read-only'

  const rebuild = () => {
    try {
      const bundles = [...elements.bundleChecks.querySelectorAll('input:checked')].map(input => input.value)
      const model = buildToolVisibilityModel({
        bundles,
        scope: elements.scope.value,
        policy: elements.policy.value,
      })
      const verdict = evaluateToolVisibilityOracle(model)
      currentModel = model

      writeText(elements.scopeNote, model.scope.description)
      writeText(elements.policyNote, model.policy.description)
      renderNest(model, elements.nest, elements.nestNote)
      renderFunnel(model, elements.funnel, elements.funnelNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      renderRows(elements.tableBody, model.tools.map(tool => ({
        key: tool.name,
        state: String(tool.reachedLevel),
        cells: [
          tool.name, tool.bundle, tool.access, tool.risk,
          tool.registered ? '✓' : '✕',
          tool.modelVisible ? '✓' : '✕',
          tool.executionAllowed ? '✓' : '✕',
          tool.blockedBy ?? '—',
        ],
      })))
      writeText(elements.tableCaption, '当前输入下的全部 ' + String(model.tools.length) + ' 个工具')
      writeText(elements.catalog, String(model.observations.catalog))
      writeText(elements.registered, String(model.observations.registered))
      writeText(elements.visible, String(model.observations.modelVisible))
      writeText(elements.allowed, String(model.observations.executionAllowed))
      writeText(elements.gap, String(model.observations.visibleButNotAllowed.length))
      setFeedback('已重建三层：' + String(model.observations.registered) + ' 已注册 → '
        + String(model.observations.modelVisible) + ' 模型可见 → '
        + String(model.observations.executionAllowed) + ' 允许执行。', 'success')
      if (tracedTool !== null && !model.tools.some(tool => tool.name === tracedTool)) tracedTool = null
      applyTrace()
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        bundles: [...elements.bundleChecks.querySelectorAll('input:checked')].map(input => input.value),
        scope: elements.scope.value,
        policy: elements.policy.value,
      }, VISIBILITY_STATE_SCHEMA))
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
  elements.scope.addEventListener('change', rebuild)
  elements.policy.addEventListener('change', rebuild)

  // 追踪交互：点图里的工具色块或表格行都指向同一个名字；键盘回车/空格等效点击。
  const toggleTrace = (name) => {
    tracedTool = tracedTool === name ? null : name
    applyTrace()
  }
  elements.nest.addEventListener('click', (event) => {
    const chip = event.target.closest?.('[data-tool]')
    if (chip !== null) toggleTrace(chip.getAttribute('data-tool'))
  })
  elements.nest.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    const chip = event.target.closest?.('[data-tool]')
    if (chip !== null) {
      event.preventDefault()
      toggleTrace(chip.getAttribute('data-tool'))
    }
  })
  elements.tableBody.addEventListener('click', (event) => {
    const row = event.target.closest?.('tr[data-key]')
    if (row !== null) toggleTrace(row.dataset.key)
  })

  // 从状态链接恢复输入；链接缺失或损坏时保持默认（全部勾选 + full/read-only）。
  const restored = readStateFromHash(location.hash, VISIBILITY_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    for (const input of elements.bundleChecks.querySelectorAll('input')) {
      input.checked = restored.value.bundles.includes(input.value)
    }
    elements.scope.value = restored.value.scope
    elements.policy.value = restored.value.policy
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
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  // 正文术语联动：导语里的三个集合名悬停/聚焦时，指标卡高亮对应读数。
  for (const term of document.querySelectorAll('[data-metric]')) {
    const card = document.querySelector('#metric-' + term.getAttribute('data-metric'))?.closest('div')
    if (card === null || card === undefined) continue
    const on = () => card.classList.add('term-flash')
    const off = () => card.classList.remove('term-flash')
    term.addEventListener('pointerover', on)
    term.addEventListener('pointerleave', off)
    term.addEventListener('focus', on)
    term.addEventListener('blur', off)
  }

  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'monotonic',
      hint: '已注册、模型可见、执行允许是三层集合；restrict 只会让可见集合单调缩小。',
    explain: {
      monotonic: '这一页的 COUNTS_MONOTONIC 校验项每次重算都检查这个不等式。',
      'visible-only': '两层都会变：作用域先决定可见集合，执行策略再从可见集合里筛。',
      'can-invert': 'ALLOWED_SUBSET_VISIBLE 校验项就是在排除这种情况——允许执行必须是可见的子集。',
      'registered-fixed': '已注册只由加载了哪些 Bundle 决定，和作用域无关。',
    },
  })
}
