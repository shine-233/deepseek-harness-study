/**
 * plan-stack 实验页的渲染层。模型在 plan-stack-model.js；本文件只画返回值。
 * 三面板模式切换：todo 快照 / plan 状态机 / goal 生命周期。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'
import { installPredictionGate } from './study-lab-gate.js'
import {
  GOAL_PHASES,
  GOAL_VERBS,
  PLAN_ACTIONS,
  TODO_PRESETS,
  TODO_STRICT_MODES,
  buildGoalModel,
  buildPlanModeModel,
  buildTodoStackModel,
  evaluatePlanStackOracle,
} from './plan-stack-model.js'

const PRESET_LABELS = {
  validSingle: '合法清单（单任务进行中）',
  validParallel: '合法清单（两任务并行进行中）',
  duplicateContent: '重复 content',
  emptyContent: '空 content',
  extendedKeys: '扩展键 id',
}

function initializePage() {
  const elements = {
    form: document.querySelector('#stack-form'),
    mode: document.querySelector('#stack-mode'),
    panelTodo: document.querySelector('#panel-todo'),
    panelPlan: document.querySelector('#panel-plan'),
    panelGoal: document.querySelector('#panel-goal'),
    preset: document.querySelector('#todo-preset'),
    strictMode: document.querySelector('#todo-strict'),
    loggedActive: document.querySelector('#plan-logged'),
    agentBusy: document.querySelector('#plan-busy'),
    planAction: document.querySelector('#plan-action'),
    goalPhase: document.querySelector('#goal-phase'),
    goalVerb: document.querySelector('#goal-verb'),
    goalCap: document.querySelector('#goal-cap'),
    feedback: document.querySelector('#stack-feedback'),
    verdictOut: document.querySelector('#todo-verdict'),
    errorBox: document.querySelector('#todo-error-box'),
    errorMetric: document.querySelector('#todo-error-metric'),
    todoList: document.querySelector('#todo-list'),
    countsOut: document.querySelector('#metric-counts'),
    eventOut: document.querySelector('#metric-event'),
    resultOut: document.querySelector('#plan-result'),
    loggedOut: document.querySelector('#plan-logged-after'),
    pendingOut: document.querySelector('#plan-pending-after'),
    goalFrom: document.querySelector('#goal-from'),
    goalTo: document.querySelector('#goal-to'),
    armedOut: document.querySelector('#goal-armed'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    oracle: document.querySelector('#metric-oracle'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const [id, label] of Object.entries(PRESET_LABELS)) {
    const option = document.createElement('option')
    option.value = id
    option.textContent = label
    elements.preset.append(option)
  }
  for (const mode of TODO_STRICT_MODES) {
    const option = document.createElement('option')
    option.value = mode
    option.textContent = mode === 'parallel-allowed' ? '允许多任务 in_progress' : '只允许一个 in_progress'
    elements.strictMode.append(option)
  }
  for (const action of PLAN_ACTIONS) {
    const option = document.createElement('option')
    option.value = action
    option.textContent = action
    elements.planAction.append(option)
  }
  for (const phase of GOAL_PHASES) {
    const option = document.createElement('option')
    option.value = phase
    option.textContent = phase
    elements.goalPhase.append(option)
  }
  for (const verb of GOAL_VERBS) {
    const option = document.createElement('option')
    option.value = verb
    option.textContent = verb
    elements.goalVerb.append(option)
  }

  const rebuild = () => {
    try {
      const mode = elements.mode.value
      elements.panelTodo.hidden = mode !== 'todo'
      elements.panelPlan.hidden = mode !== 'plan'
      elements.panelGoal.hidden = mode !== 'goal'

      let model
      if (mode === 'todo') {
        model = buildTodoStackModel({
          preset: elements.preset.value,
          allowParallelInProgress: elements.strictMode.value === 'parallel-allowed',
        })
      } else if (mode === 'plan') {
        model = buildPlanModeModel({
          loggedActive: elements.loggedActive.checked,
          agentBusy: elements.agentBusy.checked,
          action: elements.planAction.value,
        })
      } else {
        model = buildGoalModel({
          phase: elements.goalPhase.value,
          verb: elements.goalVerb.value,
          roundsCapReached: elements.goalCap.checked,
        })
      }
      const verdict = evaluatePlanStackOracle(model)

      if (mode === 'todo') {
        elements.todoList.replaceChildren()
        if (model.verdict.ok) {
          for (const item of model.todos) {
            const li = document.createElement('li')
            li.className = 'wt-source'
            li.textContent = `[${item.status}] ${item.content}`
            elements.todoList.append(li)
          }
          elements.errorBox.hidden = true
          writeText(elements.errorMetric, '通过')
        } else {
          elements.errorBox.hidden = false
          writeText(elements.errorBox, model.verdict.error)
          writeText(elements.errorMetric, '拒绝')
        }
        writeText(elements.verdictOut, model.verdict.ok ? `通过 · ${String(model.todos.length)} 条` : '拒绝')
        writeText(elements.countsOut, model.verdict.ok
          ? `${String(model.counts.pending)} pending · ${String(model.counts.inProgress)} in_progress · ${String(model.counts.completed)} completed`
          : '—')
        writeText(elements.eventOut, model.appendedEvent ?? '（无写入）')
      } else if (mode === 'plan') {
        writeText(elements.verdictOut, model.result)
        writeText(elements.errorMetric, '—')
        writeText(elements.countsOut, `logged=${model.loggedAfter ? 'active' : 'inactive'}`)
        writeText(elements.eventOut, model.pendingAfter === null ? '无 pending' : `pending=${String(model.pendingAfter)}`)
      } else {
        writeText(elements.verdictOut, model.illegal ? '非法迁移' : `${String(model.from)} → ${String(model.to)}`)
        writeText(elements.errorMetric, model.illegal ? model.detail : '—')
        writeText(elements.countsOut, model.armed ? 'armed' : 'disarmed')
        writeText(elements.eventOut, model.appendedEvent ?? '（disarm 不写事件）')
      }

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      setFeedback(`已推演：${mode}。`, 'success')
    } catch (error) {
      console.error('[plan-stack] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of elements.form.querySelectorAll('input, select')) {
    control.addEventListener('change', rebuild)
  }

  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installStoryRail()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'rejected-wholesale',
    explain: {
      'partial-update': 'todo_write 没有增量接口：每次调用替换整表，想改就提交改完后的完整清单。',
      'ignored-silent': '也不会静默忽略——重复 content 在入口显式报错，文案逐字来自上游。',
      'rejected-wholesale': '正确。整次调用被拒绝并给出重复项的原文——一次都不写。',
    },
  })
}
