import { buildGoalModel, evaluateGoalOracle, GOAL_PATTERNS } from './goal-loop-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  writeText, installDeclaredIcons, installScrollProgress,
  bindAutoAdvance, bindRangeKeys } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

function initializePage() {
  const el = {
    form: document.querySelector('#goal-form'),
    rounds: document.querySelector('#gl-rounds'), roundsOut: document.querySelector('#gl-rounds-out'),
    budget: document.querySelector('#gl-budget'), budgetOut: document.querySelector('#gl-budget-out'),
    pattern: document.querySelector('#gl-pattern'),
    feedback: document.querySelector('#gl-feedback'),
    step: document.querySelector('#gl-step'),
    caption: document.querySelector('#gl-step-caption'),
    log: document.querySelector('#gl-log'),
    mRounds: document.querySelector('#metric-rounds'),
    mStatus: document.querySelector('#metric-status'),
    mHandoff: document.querySelector('#metric-handoff'),
    oracleBadge: document.querySelector('#metric-oracle'), oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'), cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        rounds: Number(el.rounds.value), handoffBudget: Number(el.budget.value), pattern: el.pattern.value,
      }, {
        rounds: { integerRange: [1, 8] },
        handoffBudget: { integerRange: [40, 400] },
        pattern: { enum: GOAL_PATTERNS.map(item => item.id) },
      }))
    } catch { /* file:// 下可能被拒。 */ }
  }

  let frames = []

  function renderFrame(at) {
    for (const [index, row] of el.log.querySelectorAll('[data-index]').entries()) {
      row.classList.toggle('is-current', index === at)
    }
    const current = el.log.querySelector('.is-current')
    if (current !== null) current.scrollIntoView({ block: 'nearest' })
    if (frames[at] === undefined) return
    writeText(el.caption, `${frames[at].label} —— ${frames[at].detail}`)
    writeText(el.mRounds, String(Math.ceil((at + 1) / 3)))
    writeText(el.mHandoff, String(frames[at].handoffChars))
  }

  function rebuild() {
    try {
      const model = buildGoalModel({
        rounds: Number(el.rounds.value),
        handoffBudget: Number(el.budget.value),
        pattern: el.pattern.value,
      })
      const verdict = evaluateGoalOracle(model)
      frames = model.frames
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.roundsOut, `${el.rounds.value} 轮`)
      writeText(el.budgetOut, `${el.budget.value} 字符`)
      writeText(el.mStatus, model.observations.finalStatus)
      el.step.max = String(frames.length - 1)
      el.step.value = String(frames.length - 1)
      const rows = frames.map((frame, index) =>
        `<li data-index="${String(index)}" class="log-row"><span class="log-kind">${frame.kind === 'spawn' ? '启动' : frame.kind === 'report' ? '回报' : frame.kind === 'carry' ? '交接' : '出口'}</span><strong>${frame.label}</strong><small>${frame.detail}</small></li>`)
      el.log.innerHTML = rows.join('')
      renderFrame(frames.length - 1)
      fb(`循环在 ${String(model.observations.usedRounds)} 轮内以 ${model.observations.finalStatus} 结束。`, 'success')
      persistState()
    } catch (error) {
      console.error('[goal-loop]', error)
      fb(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.rounds, el.budget]) c.addEventListener('input', rebuild)
  el.pattern.addEventListener('change', rebuild)
  el.step.addEventListener('input', () => renderFrame(Number.parseInt(el.step.value, 10)))
  bindRangeKeys(el.step)
  bindAutoAdvance(document.getElementById('gl-play'), el.step, { stepMs: 680, speedSelect: document.getElementById('gl-speed') })
  el.log.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    el.step.value = item.dataset.index
    el.step.dispatchEvent(new Event('input', { bubbles: true }))
  })
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const restored = readStateFromHash(location.hash, {
    rounds: { integerRange: [1, 8] },
    handoffBudget: { integerRange: [40, 400] },
    pattern: { enum: GOAL_PATTERNS.map(item => item.id) },
  })
  if (restored !== null && restored.ok) {
    el.rounds.value = String(restored.value.rounds)
    el.budget.value = String(restored.value.handoffBudget)
    el.pattern.value = restored.value.pattern
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'script',
    explain: {
      script: 'tool-ralph 的顶注定死了它：固定脚本每轮启动全新子代理——模型在轮内干活，轮数归脚本管。',
      model: '模型不能给自己续轮；它每轮交回的只有结构化状态与摘要。',
      memory: '子代理之间没有共享记忆：唯一传下去的是截断后的交接摘要。',
    },
    hint: '线索：谁决定循环次数，谁就拥有「再来一轮」这个动作。',
  })
}
