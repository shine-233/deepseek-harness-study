/**
 * 审批流实验页的渲染层。模型在 approval-flow-model.js；本文件只画返回值。
 * 时间线、步骤表和读数读的是同一个 steps 数组，三者不可能互相矛盾。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  APPROVAL_LANES,
  buildApprovalFlowModel,
  evaluateApprovalFlowOracle,
} from './approval-flow-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：两个维度都是受控枚举；步进位置的上界由模型按步骤数给出，
// 这里只卡整数下界，越界值在恢复时被拉回当前输入的末步。
const APPROVAL_STATE_SCHEMA = {
  responder: { enum: ['ui-answerer', 'none'] },
  decision: { enum: ['allow', 'deny'] },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

function renderFlow(model, target, note) {
  const slot = 72
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + APPROVAL_LANES.length * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + APPROVAL_LANES.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'af-svg-title af-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'af-svg-title' }, '一次 ask 的有序步骤'),
    svgElement('desc', { id: 'af-svg-desc' },
      '纵轴是参与方：工具主体、审批服务、应答者和结果；横轴是步骤序号。'
      + '裁决点落在应答者泳道，最后一格注明主体是否运行与结局分类。'),
  )

  for (const lane of APPROVAL_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const step of model.steps) {
    const x = xFor(step.index)
    const y = yFor(step.lane)
    const classes = ['af-dot']
    if (step.phase === 'decide') classes.push('is-decide')
    if (step.phase === 'execute') classes.push('is-exec')
    if (step.phase === 'skip') classes.push('is-skip')
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

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步：主体'
    + (model.observations.toolBodyRan ? '执行了这一次调用' : '没有运行') + '，结局「'
    + model.observations.finalOutcome + '」。'
  if (model.input.responder === 'none') {
    message += '应答者缺席：审批通道自己变成了拒绝，这就是 fail closed。'
  } else if (model.input.decision === 'allow') {
    message += 'allow 只覆盖这一次——它不是持久授权。'
  } else {
    message += '拒绝收敛进统一的结果分类，工具不需要自定义失败协议。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#af-form'),
    responder: document.querySelector('#responder'),
    decision: document.querySelector('#decision'),
    feedback: document.querySelector('#af-feedback'),
    flow: document.querySelector('#af-plot'),
    flowNote: document.querySelector('#af-note'),
    tableBody: document.querySelector('#af-table-body'),
    tableCaption: document.querySelector('#af-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    ran: document.querySelector('#metric-ran'),
    runs: document.querySelector('#metric-runs'),
    outcome: document.querySelector('#metric-outcome'),
    lane: document.querySelector('#metric-lane'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#af-step'),
    stepOutput: document.querySelector('#af-step-output'),
    stepPrev: document.querySelector('#af-step-prev'),
    stepNext: document.querySelector('#af-step-next'),
    stepCaption: document.querySelector('#af-step-caption'),
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
        responder: elements.responder.value,
        decision: elements.decision.value,
      }
      const model = buildApprovalFlowModel(input)
      const verdict = evaluateApprovalFlowOracle(model)
      currentModel = model

      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.tableBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.phase === 'skip' ? 'skip'
          : step.phase === 'settle' ? 'final'
          : step.phase === 'decide' ? 'decide' : 'plain',
        cells: [
          String(step.index),
          step.lane,
          step.phase,
          step.detail,
          typeof step.bodyRan === 'boolean' ? (step.bodyRan ? '是' : '否') : '—',
        ],
      })))
      writeText(elements.tableCaption, '当前输入的全部 ' + String(model.steps.length) + ' 步')

      const bodyRuns = model.steps.filter(step => step.bodyRan === true).length
      writeText(elements.ran, model.observations.toolBodyRan ? '是' : '否')
      writeText(elements.runs, String(bodyRuns))
      writeText(elements.outcome, model.observations.finalOutcome)
      writeText(elements.lane, model.observations.responderLaneUsed ? '用到' : '空置')
      setFeedback('已推演：主体运行=' + (model.observations.toolBodyRan ? '是' : '否')
        + '，结局「' + model.observations.finalOutcome + '」。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[approval-flow] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        responder: elements.responder.value,
        decision: elements.decision.value,
        step: Number(elements.step.value),
      }, APPROVAL_STATE_SCHEMA)
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
  for (const control of [elements.responder, elements.decision]) {
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

  // 恢复前先放宽滑杆上界：max=0 时赋值会被浏览器钳回 0，hash 里的步进会丢；
  // 真实上界由同步步骤按模型步数写回。
  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, APPROVAL_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.responder.value = restored.value.responder
    elements.decision.value = restored.value.decision
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
    correct: 'fail-closed',
    explain: {
      'runs-anyway': 'FAIL_CLOSED 这条校验不允许它发生：没有可用 approval service 或 answerer 时，询问退化为拒绝。',
      'fail-closed': '正确。FAIL_CLOSED 与 DENY_NO_EXECUTION 一起固定了这条规则：缺席即拒绝，工具主体不运行。',
      'hangs': '链上没有等待这回事——路由层发现无人可问时直接给出结论，SINGLE_USE_ALLOW 的计数保持为零。',
    },
  })
}
