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
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
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

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 三个模型都不产 steps 时间线：这里把每次推演的判定顺序枚举成轨迹，
    // detail 全部引用模型返回的字段，不新编事实。
    const todoTrace = input => {
      const model = buildTodoStackModel(input)
      const steps = [{ lane: '入口校验', phase: 'validate', index: 0, detail: model.verdict.ok
        ? `content/status/键形校验通过：${String(model.observations.itemCount)} 条。`
        : model.verdict.error }]
      if (model.verdict.ok) {
        steps.push({ lane: '日志', phase: 'append', index: 1, detail: `整表快照追加为一条 ${model.appendedEvent}——没有增量接口。` })
        steps.push({ lane: '投影', phase: 'confirm', index: 2,
          detail: `计数确认：${String(model.counts.pending)} pending · ${String(model.counts.inProgress)} in_progress · ${String(model.counts.completed)} completed。` })
      } else {
        steps.push({ lane: '日志', phase: 'reject', index: 1, detail: '调用整体拒绝，一次都不写：旧清单保持原样。' })
      }
      return steps
    }
    const planTrace = input => {
      const model = buildPlanModeModel(input)
      return [
        { lane: '读状态', phase: 'read', index: 0,
          detail: `logged=${model.input.loggedActive ? 'active' : 'inactive'}，agent ${model.input.agentBusy ? '正在跑' : '空闲'}。` },
        { lane: '状态机', phase: 'apply', index: 1, detail: `动作 ${model.input.action} → 结果 ${model.result}。` },
        { lane: '落账', phase: 'settle', index: 2, detail: model.pendingAfter !== null
          ? `挂起 pending=${String(model.pendingAfter)}，等下一个 pre-step 再生效。`
          : `logged=${model.loggedAfter ? 'active' : 'inactive'}${model.result === 'noop' ? '（noop 不追加事件）' : ''}。` },
      ]
    }
    const goalTrace = input => {
      const model = buildGoalModel(input)
      const steps = [{ lane: '迁移表', phase: 'lookup', index: 0, detail: `${model.input.phase} × ${model.input.verb}${model.input.roundsCapReached ? '（轮次上限已打满）' : ''}。` }]
      if (model.illegal) {
        steps.push({ lane: '结果', phase: 'reject', index: 1, detail: `${model.detail}——非法组合显式拒绝，不静默跳过。` })
        return steps
      }
      steps.push({ lane: '结果', phase: 'transition', index: 1,
        detail: `${String(model.from)} → ${String(model.to)}；revision ${String(model.revisionBefore)}→${String(model.revisionAfter)}。` })
      steps.push({ lane: '权限与事件', phase: model.armed ? 'arm' : 'disarm', index: 2,
        detail: `${model.armed ? '目标保持激活' : '撤权生效'}；${model.appendedEvent ?? 'disarm 不写事件——只撤进程本地的激活权'}。` })
      return steps
    }

    createConceptLadder(ladderRoot, {
      storageKey: 'plan-stack-ladder',
      rungs: replayRungs([
        {
          title: 'todo_write：整表快照，拒绝也是整体的',
          text: 'todo_write 没有增量接口：合法清单整表追加进日志并返回计数确认。空内容、重复条目在入口显式拒绝，文案逐字来自上游。',
          traces: [
            { id: 'valid', label: '合法清单', steps: todoTrace({ preset: 'validSingle' }) },
            { id: 'dup', label: '重复 content', steps: todoTrace({ preset: 'duplicateContent' }), focusPhases: ['reject'] },
            { id: 'parallel', label: '并行 vs strict', steps: todoTrace({ preset: 'validParallel', allowParallelInProgress: false }), focusPhases: ['reject'] },
          ],
        },
        {
          title: 'plan/mode：闲即提交，忙即排队',
          text: 'logged 与 pending 是两个格子：空闲时动作立即 commit，agent 正在跑时挂起到下一个 pre-step。noop 表示请求与当前状态一致，不追加事件。',
          traces: [
            { id: 'idle', label: '空闲提交', steps: planTrace({ loggedActive: false, agentBusy: false, action: '/plan' }) },
            { id: 'busy', label: '忙碌排队', steps: planTrace({ loggedActive: false, agentBusy: true, action: '/plan' }), focusPhases: ['settle'] },
          ],
        },
        {
          title: 'goal：封闭迁移表 + revision 栅栏',
          text: '不在迁移表内的组合显式报 illegal transition；合法迁移让 revision 单调递增。pause/block/clear 都撤权，resume 在轮次上限打满时被拒。',
          traces: [
            { id: 'pause-resume', label: '暂停→恢复', steps: goalTrace({ phase: 'paused', verb: 'resume' }) },
            { id: 'cap', label: '上限打满的 resume', steps: goalTrace({ phase: 'paused', verb: 'resume', roundsCapReached: true }), focusPhases: ['reject'] },
          ],
        },
      ]),
    })
  }

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
