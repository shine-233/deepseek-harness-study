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
  writeText,
} from './study-lab-kit.js'
import {
  AGENT_SCOPES,
  EXECUTION_POLICIES,
  TOOL_BUNDLES,
  buildToolVisibilityModel,
  evaluateToolVisibilityOracle,
} from './tool-visibility-model.js'

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
        svgElement('rect', { x, y, width: Math.min(168, zone.w / perRow - 8), height: 24, rx: 6, class: 'chip-box' }),
        svgElement('text', { x: x + 9, y: y + 16, class: 'chip-text' },
          (zone.level === 3 ? '✓ ' : '✕ ') + tool.name),
      )
      chip.append(svgElement('title', {},
        tool.name + '（' + tool.bundle + ' · ' + tool.access + ' · risk=' + tool.risk + '）：'
        + (tool.executionAllowed ? '允许执行' : '停在' + LEVEL_LABELS[tool.reachedLevel] + '，' + tool.blockedBy)))
      svg.append(chip)
    }
  }

  target.append(svg)
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
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

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
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.scope.addEventListener('change', rebuild)
  elements.policy.addEventListener('change', rebuild)
  rebuild()
}

if (typeof document !== 'undefined') initializePage()
