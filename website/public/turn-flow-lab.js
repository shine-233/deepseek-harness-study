/**
 * Turn 流程实验页的渲染层。
 *
 * 模型在 turn-flow-model.js；本文件只画返回值。轨迹图、配对表和步骤表读的是同一个
 * steps 数组，所以三者不可能互相矛盾。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons } from './study-lab-kit.js'
import {
  TURN_SCENARIOS,
  buildTurnModel,
  evaluateTurnOracle,
} from './turn-flow-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const LANE_LABELS = {
  user: '用户',
  context: '上下文装配',
  model: '模型',
  tool: '工具',
  session: 'Session 日志',
}

function renderTrace(model, target, note) {
  const width = Math.max(900, 190 + model.steps.length * 54)
  const laneHeight = 62
  const top = 34
  const left = 150
  const height = top + model.lanes.length * laneHeight + 42
  const xFor = index => left + index * 54 + 20
  const yFor = lane => top + model.lanes.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'trace-svg-title trace-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'trace-svg-title' }, '一次 Turn 的有序步骤与日志对应'),
    svgElement('desc', { id: 'trace-svg-desc' },
      '横轴是步骤序号，纵轴是用户、上下文装配、模型、工具和 Session 日志五条 lane；'
      + '虚线连接同一份内容的日志事件和模型请求。完整步骤在本页最后的表格里逐行给出。'),
  )

  for (const lane of model.lanes) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 16, y: y + 5, class: 'axis', 'text-anchor': 'end' }, LANE_LABELS[lane] ?? lane),
      svgElement('line', { x1: left, y1: y, x2: width - 20, y2: y, class: 'grid' }),
    )
  }

  // 先画连线，让它落在圆点下面：连线是关系，圆点是事件。
  for (const pair of model.pairs) {
    if (!pair.reconstructable) continue
    for (const visibleAt of pair.visibleAt) {
      for (const loggedAt of pair.loggedAt) {
        if (loggedAt === visibleAt) continue
        const from = model.steps[loggedAt]
        const to = model.steps[visibleAt]
        svg.append(svgElement('path', {
          d: 'M ' + String(xFor(loggedAt)) + ' ' + String(yFor(from.lane))
            + ' L ' + String(xFor(visibleAt)) + ' ' + String(yFor(to.lane)),
          class: 'pair-link',
        }))
      }
    }
  }

  for (const entry of model.steps) {
    const x = xFor(entry.index)
    const y = yFor(entry.lane)
    const classes = ['trace-dot']
    if (entry.modelVisible) classes.push('is-visible')
    if (entry.logged) classes.push('is-logged')
    if (entry.denied === true) classes.push('is-denied')
    if (entry.failed === true) classes.push('is-failed')
    const dot = svgElement('circle', {
      'data-reveal': '',
      cx: x, cy: y, r: 8, class: classes.join(' '), 'data-step': String(entry.index),
    })
    dot.append(svgElement('title', {},
      '第 ' + String(entry.index) + ' 步 · ' + entry.phase + '：' + entry.detail
      + (entry.modelVisible ? ' · 进入模型请求' : '')
      + (entry.logged ? ' · 写入日志' : '')))
    svg.append(
      dot,
      svgElement('text', { x, y: height - 22, class: 'axis', 'text-anchor': 'middle' }, String(entry.index)),
    )
  }

  target.append(svg)
  revealOnScroll(target)
  const orphan = model.observations.unreconstructable
  writeText(note, orphan.length === 0
    ? '本场景里 ' + String(model.observations.modelVisiblePayloads)
      + ' 份进入模型请求的内容全部有日志事件，所以下一轮投影可以重建它们。'
      + '模型请求共 ' + String(model.observations.modelRequests) + ' 次——一次 Turn 不是一次调用。'
    : '有 ' + String(orphan.length) + ' 份内容进了模型请求但没有日志事件：' + orphan.join('、')
      + '。这正是那条规则被违反的样子，oracle 因此失败。')
}

function initializePage() {
  const elements = {
    form: document.querySelector('#turn-form'),
    scenario: document.querySelector('#scenario'),
    scenarioNote: document.querySelector('#scenario-note'),
    feedback: document.querySelector('#turn-feedback'),
    trace: document.querySelector('#trace-plot'),
    traceNote: document.querySelector('#trace-note'),
    pairBody: document.querySelector('#pair-table-body'),
    pairCaption: document.querySelector('#pair-caption'),
    stepsBody: document.querySelector('#steps-table-body'),
    stepsCaption: document.querySelector('#steps-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    steps: document.querySelector('#metric-steps'),
    requests: document.querySelector('#metric-requests'),
    runs: document.querySelector('#metric-runs'),
    logged: document.querySelector('#metric-logged'),
    orphan: document.querySelector('#metric-orphan'),
    oracle: document.querySelector('#metric-oracle'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const scenario of TURN_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario.id
    writeText(option, scenario.label)
    elements.scenario.append(option)
  }

  const rebuild = () => {
    try {
      const model = buildTurnModel({ scenario: elements.scenario.value })
      const verdict = evaluateTurnOracle(model)

      writeText(elements.scenarioNote, model.scenario.description)
      renderTrace(model, elements.trace, elements.traceNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.pairBody, model.pairs.map(pair => ({
        key: pair.payloadId,
        state: pair.reconstructable ? 'ok' : 'orphan',
        cells: [
          pair.payloadId,
          pair.visibleAt.join('、'),
          pair.loggedAt.join('、') || '—',
          pair.reconstructable ? '✓ 可重建' : '✕ 无法重建',
        ],
      })))
      writeText(elements.pairCaption, '当前场景的 ' + String(model.pairs.length) + ' 份模型可见载荷')

      renderRows(elements.stepsBody, model.steps.map(entry => ({
        key: String(entry.index),
        state: entry.denied === true ? 'denied' : entry.failed === true ? 'failed' : 'plain',
        cells: [
          String(entry.index),
          LANE_LABELS[entry.lane] ?? entry.lane,
          entry.phase,
          entry.detail,
          entry.modelVisible ? '✓' : '✕',
          entry.logged ? '✓' : '✕',
          entry.payloadId ?? '—',
        ],
      })))
      writeText(elements.stepsCaption, '当前场景的全部 ' + String(model.steps.length) + ' 步')

      writeText(elements.steps, String(model.observations.steps))
      writeText(elements.requests, String(model.observations.modelRequests))
      writeText(elements.runs, String(model.observations.toolRuns))
      writeText(elements.logged, String(model.observations.loggedEvents))
      writeText(elements.orphan, String(model.observations.unreconstructable.length))
      setFeedback('已重建 Turn：' + String(model.observations.steps) + ' 步，'
        + String(model.observations.modelRequests) + ' 次模型请求，'
        + String(model.observations.loggedEvents) + ' 个日志事件。', 'success')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '场景无效。', 'error')
    }
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.scenario.addEventListener('change', rebuild)
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))
}
