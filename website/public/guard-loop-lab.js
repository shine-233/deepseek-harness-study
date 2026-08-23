/**
 * 循环卫生实验页的渲染层。模型在 guard-loop-model.js；本文件只画返回值。
 * 时间线、步骤表和读数读的是同一个 steps 数组。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import {
  GUARD_LANES,
  buildGuardLoopModel,
  evaluateGuardLoopOracle,
} from './guard-loop-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：次数是带上下界的整数，守卫是枚举；越界值在恢复时会被
// 模型的校验拒绝并给出明确反馈。
const GUARD_STATE_SCHEMA = {
  attempts: { integerRange: [1, 5] },
  guard: { enum: ['yes', 'no'] },
}

function renderFlow(model, target, note) {
  const slot = 64
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + GUARD_LANES.length * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + GUARD_LANES.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'gl-svg-title gl-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'gl-svg-title' }, '重复调用与拦截的有序步骤'),
    svgElement('desc', { id: 'gl-svg-desc' },
      '纵轴是参与方：Agent 循环、循环卫生 guard、工具主体和后置结算；横轴是步骤序号。'
      + '实心点是放行的执行，信号色圆点是拦截，虚线圆环是注定无效的撤销尝试。'),
  )

  for (const lane of GUARD_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const step of model.steps) {
    const x = xFor(step.index)
    const y = yFor(step.lane)
    const classes = ['gl-dot']
    if (step.phase === 'block') classes.push('is-block')
    if (step.phase === 'undo') classes.push('is-undo')
    if (step.phase === 'execute') classes.push('is-exec')
    const dot = svgElement('circle', {
      'data-reveal': '',
      cx: x, cy: y, r: 9, class: classes.join(' '), 'data-step': String(step.index),
      'data-attempt': step.attempt === undefined ? '' : String(step.attempt),
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

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步：发出 '
    + String(model.observations.attempts) + ' 次，执行 '
    + String(model.observations.executedCount) + ' 次，拦截 '
    + String(model.observations.blockedCount) + ' 次。'
  if (model.observations.undoAttempted) {
    message += '后置结算试过撤销——MONOTONIC_UNDO 说它永远无效。'
  } else if (!model.observations.guardOn) {
    message += '守卫关闭：没有刹车，账目上全是执行。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#gl-form'),
    attempts: document.querySelector('#attempts'),
    attemptsOutput: document.querySelector('#attempts-output'),
    guard: document.querySelector('#guard'),
    feedback: document.querySelector('#gl-feedback'),
    flow: document.querySelector('#gl-plot'),
    flowNote: document.querySelector('#gl-note'),
    tableBody: document.querySelector('#gl-table-body'),
    tableCaption: document.querySelector('#gl-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    attemptsMetric: document.querySelector('#metric-attempts'),
    executed: document.querySelector('#metric-executed'),
    blocked: document.querySelector('#metric-blocked'),
    undo: document.querySelector('#metric-undo'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  const rebuild = () => {
    try {
      const input = {
        attempts: Number(elements.attempts.value),
        guard: elements.guard.value,
      }
      const model = buildGuardLoopModel(input)
      const verdict = evaluateGuardLoopOracle(model)

      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.tableBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.phase === 'block' ? 'block'
          : step.phase === 'undo' ? 'undo' : 'plain',
        cells: [
          String(step.index),
          step.lane,
          step.phase,
          step.detail,
          step.attempt === undefined ? '—' : String(step.attempt),
        ],
      })))
      writeText(elements.tableCaption, '当前输入的全部 ' + String(model.steps.length) + ' 步')

      writeText(elements.attemptsMetric, String(model.observations.attempts))
      writeText(elements.executed, String(model.observations.executedCount))
      writeText(elements.blocked, String(model.observations.blockedCount))
      writeText(elements.undo, model.observations.undoSucceeded ? '是' : '否')
      setFeedback('已推演：执行 ' + String(model.observations.executedCount)
        + ' 次、拦截 ' + String(model.observations.blockedCount) + ' 次，撤销生效='
        + (model.observations.undoSucceeded ? '是' : '否') + '。', 'success')
      persistState()
    } catch (error) {
      console.error('[guard-loop] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        attempts: Number(elements.attempts.value),
        guard: elements.guard.value,
      }, GUARD_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.attempts, elements.guard]) {
    control.addEventListener('input', () => {
      if (control === elements.attempts) writeText(elements.attemptsOutput, control.value)
      rebuild()
    })
  }

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, GUARD_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.attempts.value = String(restored.value.attempts)
    elements.guard.value = restored.value.guard
  }
  writeText(elements.attemptsOutput, elements.attempts.value)

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
    correct: 'monotonic',
    explain: {
      'undo-works': 'MONOTONIC_UNDO 这条校验钉住了相反的结论：撤销尝试存在，但它的 undoWorked 恒为 false。',
      'monotonic': '正确。拒绝发生在主体执行前且不可改写——EXECUTION_ACCOUNT 里它始终计为拦截而非执行。',
      'retry-passes': '第 4 次仍是同一调用：THRESHOLD_RULE 让它在第 3 步之后继续被拦，不会摇身变成新调用。',
    },
  })
}
