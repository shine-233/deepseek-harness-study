/**
 * subagent 委派实验页的渲染层。模型在 subagent-delegate-model.js；
 * 本文件只画返回值。时间线、步骤表和读数读的是同一个 steps 数组。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  pulseSignal,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installInputReset, animateNumber, bindPlotScrub } from './study-lab-kit.js'
import {
  DELEGATE_LANES,
  buildSubagentDelegateModel,
  evaluateSubagentDelegateOracle,
} from './subagent-delegate-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：两个维度都是受控枚举；步进位置的上界由模型按步骤数给出，
// 这里只卡整数下界，越界值在恢复时被拉回当前输入的末步。
const DELEGATE_STATE_SCHEMA = {
  depth: { enum: ['0', '1', '2', '3'] },
  outcome: { enum: ['report', 'fail'] },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

function renderFlow(model, target, note) {
  const slot = 72
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + DELEGATE_LANES.length * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + DELEGATE_LANES.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'sd-svg-title sd-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'sd-svg-title' }, '一次委派的有序步骤'),
    svgElement('desc', { id: 'sd-svg-desc' },
      '纵轴是参与方：父 Agent、委派边界、子 Agent 和回报；横轴是步骤序号。'
      + '虚线圆环是边界拒绝，回报泳道的实心点是结算，父泳道不会出现子的执行。'),
  )

  for (const lane of DELEGATE_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const step of model.steps) {
    const x = xFor(step.index)
    const y = yFor(step.lane)
    const classes = ['sd-dot']
    if (step.phase === 'reject') classes.push('is-reject')
    if (step.phase === 'accept') classes.push('is-accept')
    if (step.phase === 'run') classes.push('is-run')
    if (step.phase === 'settle') classes.push('is-final')
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

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步：子深度 '
    + String(model.observations.childDepth) + '（上限 '
    + String(model.observations.maxDepth) + '），边界'
    + (model.observations.depthAccepted ? '放行' : '拒绝') + '，'
    + (model.observations.childRan ? '子在会话里执行并' + model.observations.reportKind + '。'
      : '本轮没有产生任何子工作。')
  if (model.observations.childRan && model.observations.reportKind === 'fail') {
    message += '失败也是一次完整结算——父对话必须知道发生了什么。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#sd-form'),
    depth: document.querySelector('#depth'),
    outcome: document.querySelector('#outcome'),
    feedback: document.querySelector('#sd-feedback'),
    flow: document.querySelector('#sd-plot'),
    flowNote: document.querySelector('#sd-note'),
    tableBody: document.querySelector('#sd-table-body'),
    tableCaption: document.querySelector('#sd-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    childdepth: document.querySelector('#metric-childdepth'),
    depthMetric: document.querySelector('#metric-depth'),
    report: document.querySelector('#metric-report'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#sd-step'),
    stepOutput: document.querySelector('#sd-step-output'),
    stepPrev: document.querySelector('#sd-step-prev'),
    stepNext: document.querySelector('#sd-step-next'),
    stepCaption: document.querySelector('#sd-step-caption'),
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
    // 签名瞬间：深度墙撞击 / 子会话创建弹出。
    const sigDot = elements.flow.querySelector('[data-step="' + index + '"]')
    const sigStep = currentModel.steps[index]
    if (sigStep.rejected === true) pulseSignal(sigDot, 'is-wall')
    else if (sigStep.phase === 'create') pulseSignal(sigDot, 'is-pop')
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
        depth: elements.depth.value,
        outcome: elements.outcome.value,
      }
      const model = buildSubagentDelegateModel({ parentDepth: Number(input.depth), outcome: input.outcome })
      const verdict = evaluateSubagentDelegateOracle(model)
      currentModel = model

      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.tableBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.phase === 'reject' ? 'skip'
          : step.phase === 'accept' ? 'accept'
          : step.phase === 'settle' ? 'final' : 'plain',
        cells: [
          String(step.index),
          step.lane,
          step.phase,
          step.detail,
          typeof step.reportKind === 'string' ? step.reportKind : '—',
        ],
      })))
      writeText(elements.tableCaption, '当前输入的全部 ' + String(model.steps.length) + ' 步')

      animateNumber(elements.childdepth, model.observations.childDepth)
      writeText(elements.depthMetric, model.observations.depthAccepted ? '通过' : '拒绝')
      writeText(elements.report, model.observations.reportKind ?? '—')
      setFeedback('已推演：边界' + (model.observations.depthAccepted ? '放行' : '拒绝')
        + '，子' + (model.observations.childRan ? '已启动（深度 ' + String(model.observations.childDepth) + '）' : '未启动') + '。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[subagent-delegate] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        depth: elements.depth.value,
        outcome: elements.outcome.value,
        step: Number(elements.step.value),
      }, DELEGATE_STATE_SCHEMA)
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
  for (const control of [elements.depth, elements.outcome]) {
    control.addEventListener('change', () => {
      // 换输入会改变步数：先按新输入重建，再把步进拉回末尾看完整时间线。
      rebuild()
      elements.step.value = elements.step.max
      elements.step.dispatchEvent(new (step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
    })
  }

  elements.step.addEventListener('input', () => {
    syncStep()
    persistState()
  })
  const nudgeStep = delta => {
    elements.step.value = String(Math.min(Number(elements.step.max),
      Math.max(Number(elements.step.min), Number(elements.step.value) + delta)))
    elements.step.dispatchEvent(new (step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
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
  const restored = readStateFromHash(location.hash, DELEGATE_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.depth.value = restored.value.depth
    elements.outcome.value = restored.value.outcome
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
    correct: 'rejected-at-boundary',
      hint: '数字 maxDepth 在委派边界逐请求核对，超限的子代理根本不会被创建。',
    explain: {
      'spawns-anyway': 'REJECTION_RULE 不允许它发生：子深度超过上限就抛 SubagentDepthError，不是记一笔了事。',
      'rejected-at-boundary': '正确。超限委派在边界处被拒，LANE_ISOLATION 同时确认子泳道完全为空。',
      'spawns-silent': 'REPORT_SETTLES 要求启动过的子工作恰好回报一次——但这里根本不会启动。',
    },
  })
}
