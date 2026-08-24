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
  writeText, installDeclaredIcons, bindRangeKeys, bindAutoAdvance, installScrollProgress, bindRowJump, bindPlotScrub } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  TURN_SANDBOX_LIMITS,
  TURN_SCENARIOS,
  buildTurnModel,
  buildTurnSandboxModel,
  evaluateTurnOracle,
  evaluateTurnSandboxOracle,
} from './turn-flow-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：场景是枚举，步数上限由模型在运行时给出，
// 所以这里只卡整数下界；越界值在恢复时会被拉回当前场景的最大步。
const TURN_STATE_SCHEMA = {
  scenario: { enum: TURN_SCENARIOS.map(scenario => scenario.id) },
  upTo: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
  sbWords: { integerRange: [TURN_SANDBOX_LIMITS.messageWords.min, TURN_SANDBOX_LIMITS.messageWords.max] },
  sbTools: { integerRange: [TURN_SANDBOX_LIMITS.toolCalls.min, TURN_SANDBOX_LIMITS.toolCalls.max] },
  sbFail: { integerRange: [0, TURN_SANDBOX_LIMITS.toolCalls.max] },
  sbRejected: { boolean: true },
  sbAbort: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

// 只带主表单两个字段的旧版链接：恢复时沙盒留在默认值，不报错打断阅读。
const LEGACY_TURN_STATE_SCHEMA = {
  scenario: { enum: TURN_SCENARIOS.map(scenario => scenario.id) },
  upTo: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

const SB_DEFAULTS = Object.freeze({
  words: 24,
  tools: 2,
  fail: 0,
  abort: 0,
  rejected: false,
})

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

/*
 * 沙盒轨迹：与主轨迹共用同一套 lane 和配色。完整序列全部画出——
 * 中止点之后的步骤按淡色显示，这样红线的两侧都有可以抓的圆点，
 * 拖到哪一格就中止在哪一格；用户消息圆点随词数变大（教学单位，不是 token）。
 */
function renderSandboxTrace(model, fullModel, target, note) {
  const width = Math.max(900, 190 + fullModel.totalSteps * 54)
  const laneHeight = 62
  const top = 34
  const left = 150
  const height = top + fullModel.lanes.length * laneHeight + 42
  const xFor = index => left + index * 54 + 20
  const yFor = lane => top + fullModel.lanes.indexOf(lane) * laneHeight + laneHeight / 2
  const cutAfter = model.aborted ? model.input.abortAtStep : Number.POSITIVE_INFINITY

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'sb-svg-title sb-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'sb-svg-title' }, '可调输入下的 Turn 轨迹'),
    svgElement('desc', { id: 'sb-svg-desc' },
      model.input.rejected
        ? '首次领取被拒：只有 Session 日志 lane 上的一条结束事件。'
        : '五个旋钮决定这条五 lane 轨迹的长度和形状；红色竖线标记中止位置，'
          + '红线左侧的步骤已发生，右侧淡色的步骤尚未发生，可以直接横向拖动红线。'),
  )

  for (const lane of fullModel.lanes) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 16, y: y + 5, class: 'axis', 'text-anchor': 'end' }, LANE_LABELS[lane] ?? lane),
      svgElement('line', { x1: left, y1: y, x2: width - 20, y2: y, class: 'grid' }),
    )
  }

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

  if (model.aborted) {
    // 中止线画在被保留的最后一步与其后一步之间：它截断的是「之后」。
    const lineX = xFor(model.input.abortAtStep) + 27
    svg.append(
      svgElement('line', { x1: lineX, y1: top - 12, x2: lineX, y2: height - 30, class: 'abort-line' }),
      svgElement('text', { x: lineX + 6, y: top - 14, class: 'abort-label' }, '在此中止'),
    )
  }

  for (const entry of fullModel.steps) {
    const inFuture = model.aborted && entry.index > cutAfter
    const x = xFor(entry.index)
    const y = yFor(entry.lane)
    const classes = ['trace-dot']
    if (!inFuture && entry.modelVisible) classes.push('is-visible')
    if (!inFuture && entry.logged) classes.push('is-logged')
    if (entry.failed === true) classes.push('is-failed')
    if (entry.phase === 'user-message') classes.push('is-user-input')
    if (inFuture) classes.push('is-future')
    const radius = entry.phase === 'user-message'
      ? 6 + Math.round(fullModel.input.messageWords / 10)
      : 8
    const dot = svgElement('circle', {
      cx: x, cy: y, r: radius, class: classes.join(' '), 'data-step': String(entry.index),
    })
    dot.append(svgElement('title', {},
      '第 ' + String(entry.index) + ' 步 · ' + entry.phase
      + '：' + (inFuture ? '（尚未发生——把红线拖走让它发生）'
        : entry.detail)
      + (!inFuture && entry.modelVisible ? ' · 进入模型请求' : '')
      + (!inFuture && entry.logged ? ' · 写入日志' : '')))
    svg.append(
      dot,
      svgElement('text', { x, y: height - 22, class: 'axis', 'text-anchor': 'middle',
        ...(inFuture ? { class: 'axis is-future-label' } : {}) }, String(entry.index)),
    )
  }

  target.append(svg)
  revealOnScroll(target)
  writeText(note, model.observations.forkShape + '：'
    + String(model.observations.steps) + ' 步、'
    + String(model.observations.modelRequests) + ' 次模型请求、'
    + String(model.observations.loggedEvents) + ' 个日志事件。'
    + (model.aborted
      ? '红线之后是尚未发生的淡色步骤；已写入的日志全部保留。'
      : '进入模型请求的 ' + String(model.observations.modelVisiblePayloads)
        + ' 份内容全部可从日志重建。'))
}

function initializePage() {
  const elements = {    form: document.querySelector('#turn-form'),
    scenario: document.querySelector('#scenario'),
    scenarioNote: document.querySelector('#scenario-note'),
    upTo: document.querySelector('#upto'),
    upToOutput: document.querySelector('#upto-output'),
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
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    // 沙盒区的控件与读数。
    sbForm: document.querySelector('#sandbox-form'),
    sbWords: document.querySelector('#sb-words'),
    sbWordsOutput: document.querySelector('#sb-words-output'),
    sbTools: document.querySelector('#sb-tools'),
    sbToolsOutput: document.querySelector('#sb-tools-output'),
    sbFail: document.querySelector('#sb-fail'),
    sbFailOutput: document.querySelector('#sb-fail-output'),
    sbAbort: document.querySelector('#sb-abort'),
    sbAbortOutput: document.querySelector('#sb-abort-output'),
    sbRejected: document.querySelector('#sb-rejected'),
    sbReset: document.querySelector('#sb-reset'),
    sbPlot: document.querySelector('#sb-plot'),
    sbNote: document.querySelector('#sb-note'),
    sbShape: document.querySelector('#sb-shape'),
    sbStepsMetric: document.querySelector('#sb-metric-steps'),
    sbRequestsMetric: document.querySelector('#sb-metric-requests'),
    sbRetriesMetric: document.querySelector('#sb-metric-retries'),
    sbOrphanMetric: document.querySelector('#sb-metric-orphan'),
    sbOracleBadge: document.querySelector('#sb-oracle-badge'),
    sbOracleList: document.querySelector('#sb-oracle-list'),
    sbStepsBody: document.querySelector('#sb-steps-body'),
    sbCaption: document.querySelector('#sb-caption'),
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
      const model = buildTurnModel({
        scenario: elements.scenario.value,
        upTo: Number(elements.upTo.value),
      })
      const verdict = evaluateTurnOracle(model)

      // 换场景时步数会变，上限跟着走；滑块停在越界值上会读出一个不存在的步骤。
      elements.upTo.max = String(model.totalSteps - 1)
      writeText(elements.upToOutput, String(model.input.upTo))

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
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '场景无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  // replaceState 在 file:// 或沙箱环境下可能被拒；状态链接是增强，不是前提。
  // 主表单和沙盒共用同一段 #state=，一次全量写入避免互相覆盖。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        upTo: Number(elements.upTo.value),
        sbWords: Number(elements.sbWords.value),
        sbTools: Number(elements.sbTools.value),
        sbFail: Number(elements.sbFail.value),
        sbRejected: elements.sbRejected.checked,
        sbAbort: Number(elements.sbAbort.value),
      }, TURN_STATE_SCHEMA)
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
  elements.scenario.addEventListener('change', () => {
    // 换场景时步数会变，先把滑块拉到末尾，避免停在一个不存在的步骤上。
    elements.upTo.value = elements.upTo.max
    rebuild()
  })
  elements.upTo.addEventListener('input', rebuild)
  // 焦点在页面其它地方时，← / → / Home / End 直接步进这条主时间轴。
  bindRangeKeys(elements.upTo)
  // 反向联动：点步骤表里的一行，时间轴跳到那一步（linked views 的另一半）。
  bindRowJump(elements.stepsBody, elements.upTo)
  const playButton = document.querySelector('#frame-play')
  if (playButton instanceof HTMLButtonElement) bindAutoAdvance(playButton, elements.upTo, { stepMs: 700 })

  // 从状态链接恢复输入；链接缺失或损坏时保持默认场景，不报错打断阅读。
  // 新版链接带沙盒五个字段；只有旧版两个字段的老书签也能恢复主表单，
  // 沙盒留在 authored 默认值。
  const restored = readStateFromHash(location.hash, TURN_STATE_SCHEMA)
  const legacy = restored !== null && !restored.ok
    ? readStateFromHash(location.hash, LEGACY_TURN_STATE_SCHEMA)
    : null
  const hasRestoredUpTo = (restored !== null && restored.ok)
    || (legacy !== null && legacy.ok)
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.upTo.value = String(restored.value.upTo)
    elements.sbWords.value = String(restored.value.sbWords)
    elements.sbTools.value = String(restored.value.sbTools)
    elements.sbFail.value = String(restored.value.sbFail)
    elements.sbRejected.checked = restored.value.sbRejected
    elements.sbAbort.value = String(restored.value.sbAbort)
  } else if (legacy !== null && legacy.ok) {
    elements.scenario.value = legacy.value.scenario
    elements.upTo.value = String(legacy.value.upTo)
  }

  // 首次进入显示完整 Turn；逐步推进是主动动作，不该是默认状态。
  rebuild()
  if (!hasRestoredUpTo || Number(elements.upTo.value) > Number(elements.upTo.max)) {
    elements.upTo.value = elements.upTo.max
    rebuild()
  }

  /*
   * 沙盒：五个旋钮里任何一个动一格，轨迹立刻重排——不需要提交按钮。
   * 工具数变化时，失败位的上限跟着走（失败位不能指向不存在的调用）；
   * 中止位上限由模型在运行时给出，越界值拉回有效区间。
   */
  const rebuildSandbox = () => {
    try {
      // 失败位上限依赖工具数：先夹住滑块值再交给模型。
      if (Number(elements.sbFail.value) > Number(elements.sbTools.value)) {
        elements.sbFail.value = elements.sbTools.value
      }
      const model = buildTurnSandboxModel({
        messageWords: Number(elements.sbWords.value),
        toolCalls: Number(elements.sbTools.value),
        failAtCall: Number(elements.sbFail.value),
        rejected: elements.sbRejected.checked,
        abortAtStep: Number(elements.sbAbort.value),
      })
      const verdict = evaluateTurnSandboxOracle(model)
      // 渲染用完整序列（中止点之后淡色显示），读数和校验用截断后的模型。
      const fullModel = model.aborted
        ? buildTurnSandboxModel({ ...model.input, abortAtStep: 0 })
        : model

      elements.sbAbort.max = String(Math.max(0, model.totalSteps - 1))
      if (Number(elements.sbAbort.value) > Number(elements.sbAbort.max)) {
        elements.sbAbort.value = elements.sbAbort.max
      }
      writeText(elements.sbWordsOutput, String(model.input.messageWords))
      writeText(elements.sbToolsOutput, String(model.input.toolCalls))
      writeText(elements.sbFailOutput, String(model.input.failAtCall))
      writeText(elements.sbAbortOutput, String(model.input.abortAtStep))

      renderSandboxTrace(model, fullModel, elements.sbPlot, elements.sbNote)
      renderOracle(verdict, elements.sbOracleList, elements.sbOracleBadge)
      writeText(elements.sbShape, model.observations.forkShape)
      writeText(elements.sbStepsMetric, String(model.observations.steps))
      writeText(elements.sbRequestsMetric, String(model.observations.modelRequests))
      writeText(elements.sbRetriesMetric, String(model.observations.retries))
      writeText(elements.sbOrphanMetric, String(model.observations.unreconstructable.length))

      renderRows(elements.sbStepsBody, model.steps.map(entry => ({
        key: String(entry.index),
        state: entry.failed === true ? 'failed' : entry.phase === 'turn-abort' ? 'denied' : entry.phase === 'user-message' ? 'ok' : 'plain',
        cells: [String(entry.index), LANE_LABELS[entry.lane] ?? entry.lane, entry.phase, entry.detail],
      })))
      writeText(elements.sbCaption,
        '当前旋钮位置的全部 ' + String(model.steps.length) + ' 步')
      persistState()
    } catch (error) {
      console.error('[turn-sandbox] rebuild failed', error)
    }
  }

  for (const control of [elements.sbWords, elements.sbTools, elements.sbFail]) {
    control.addEventListener('input', rebuildSandbox)
  }
  bindRangeKeys(elements.sbWords)
  bindRangeKeys(elements.sbTools)
  bindRangeKeys(elements.sbFail)
  elements.sbAbort.addEventListener('input', rebuildSandbox)
  elements.sbRejected.addEventListener('change', () => {
    // 被拒形态没有步骤序列，中止位失去意义：切回来时留在合法范围即可。
    elements.sbAbort.value = '0'
    rebuildSandbox()
  })
  // 图上的红线可以直接拖：圆点按列分布，横向最近的列就是中止点。
  bindPlotScrub(elements.sbPlot, elements.sbAbort)
  elements.sbReset.addEventListener('click', () => {
    elements.sbWords.value = String(SB_DEFAULTS.words)
    elements.sbTools.value = String(SB_DEFAULTS.tools)
    elements.sbFail.value = String(SB_DEFAULTS.fail)
    elements.sbAbort.value = String(SB_DEFAULTS.abort)
    elements.sbRejected.checked = SB_DEFAULTS.rejected
    rebuildSandbox()
  })
  rebuildSandbox()

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
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'has-event',
      hint: '没有 Step 的 Turn 真实存在；每条模型可见输入都必须能从日志重建。',
    explain: {
      'has-event': 'DENIED_HAS_NO_BODY 和 EVERY_CALL_HAS_RESULT 两条校验项一起固定了这个组合。',
      nothing: '那样就违反「进了模型请求的东西日志里必须找得到」——拒绝本身也是要重建的事实。',
      'body-only': '拒绝发生在主体之前，所以主体一次都没跑。',
      'result-only': '每个结果都能追到一次调用，否则日志无法重建这一步。',
    },
  })
}
