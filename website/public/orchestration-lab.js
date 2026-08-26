/**
 * orchestration 实验页的渲染层。模型在 orchestration-model.js；本文件只画返回值。
 * 模式开关切换 schedule / workflow 两套时间线，读数读的是同一次推演。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress,
  bindAutoAdvance } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  SCHEDULE_KINDS,
  SESSION_STATES,
  WORKFLOW_ENDINGS,
  WORKFLOW_SHAPES,
  ORCH_FAULT_TYPES,
  buildScheduleModel,
  buildWorkflowModel,
  evaluateOrchestrationOracle,
} from './orchestration-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const KIND_LABELS = {
  after: 'after —— 延迟一次性（90 秒后提交代码）',
  at: 'at —— 绝对时刻一次性（09:00Z 站会）',
  every: 'every —— 固定速率（每 10 分钟查构建，锚点对齐）',
}

const STATE_LABELS = {
  'live-idle': '会话存活且空闲',
  busy: '到点时回合正在跑',
  'cold-reopen': '会话冷了一段时间后重开',
}

const SHAPE_LABELS = {
  'sequential-2': '顺序两步：调研 → 实现',
  'parallel-3-one-fails': '并发三代理：一个子运行失败',
}

function renderTimeline(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'jb-timeline'
  for (const step of model.steps) {
    const item = document.createElement('li')
    item.className = 'jb-step'
    item.setAttribute('data-reveal', '')
    item.dataset.index = String(step.index)
    const head = document.createElement('div')
    head.className = 'jb-step-head'
    const op = document.createElement('code')
    writeText(op, '#' + String(step.index) + ' ' + step.op)
    if (step.event !== undefined) {
      const chip = document.createElement('span')
      chip.className = 'tj-view-chip'
      writeText(chip, step.event)
      head.append(chip)
    }
    const detail = document.createElement('p')
    detail.className = 'jb-step-detail'
    writeText(detail, step.detail)
    item.append(head, detail)
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#orch-form'),
    mode: document.querySelector('#orch-mode'),
    schedPanel: document.querySelector('#panel-schedule'),
    wfPanel: document.querySelector('#panel-workflow'),
    kind: document.querySelector('#sched-kind'),
    sessionState: document.querySelector('#sched-state'),
    ending: document.querySelector('#wf-ending'),
    shape: document.querySelector('#wf-shape'),
    faultType: document.querySelector('#orch-fault-type'),
    faultNote: document.querySelector('#orch-fault-note'),
    feedback: document.querySelector('#orch-feedback'),
    timeline: document.querySelector('#orch-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    dispatches: document.querySelector('#metric-dispatches'),
    skipped: document.querySelector('#metric-skipped'),
    agents: document.querySelector('#metric-agents'),
    stopReason: document.querySelector('#metric-stop'),
    oracle: document.querySelector('#metric-oracle'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#orch-step'),
    stepOutput: document.querySelector('#orch-step-output'),
    stepPrev: document.querySelector('#orch-step-prev'),
    stepNext: document.querySelector('#orch-step-next'),
    stepCaption: document.querySelector('#orch-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  const syncStep = () => {
    if (currentModel === null) return
    const total = currentModel.steps.length
    elements.step.max = String(total - 1)
    if (Number(elements.step.value) > total - 1 || Number(elements.step.value) < 0) {
      elements.step.value = String(total - 1)
    }
    const index = Number(elements.step.value)
    writeText(elements.stepOutput, String(index))
    for (const item of elements.timeline.querySelectorAll('.jb-step')) {
      item.classList.toggle('is-current', Number(item.dataset.index) === index)
      item.classList.toggle('is-future', Number(item.dataset.index) > index)
    }
    const entry = currentModel.steps[index]
    if (entry !== undefined) {
      writeText(elements.stepCaption, '第 ' + String(index) + ' 步 · ' + entry.op
        + (entry.event !== undefined ? ' · ' + entry.event : ''))
    }
    elements.stepPrev.disabled = index <= 0
    elements.stepNext.disabled = index >= total - 1
  }

  for (const kind of SCHEDULE_KINDS) {
    const option = document.createElement('option')
    option.value = kind
    writeText(option, KIND_LABELS[kind])
    elements.kind.append(option)
  }
  for (const state of SESSION_STATES) {
    const option = document.createElement('option')
    option.value = state
    writeText(option, STATE_LABELS[state])
    elements.sessionState.append(option)
  }
  for (const ending of WORKFLOW_ENDINGS) {
    const option = document.createElement('option')
    option.value = ending
    writeText(option, ending)
    elements.ending.append(option)
  }
  for (const shape of WORKFLOW_SHAPES) {
    const option = document.createElement('option')
    option.value = shape
    writeText(option, SHAPE_LABELS[shape])
    elements.shape.append(option)
  }

  const rebuild = () => {
    try {
      const isSchedule = elements.mode.value === 'schedule'
      elements.schedPanel.hidden = !isSchedule
      elements.wfPanel.hidden = isSchedule

      let model
      if (isSchedule) {
        model = buildScheduleModel({
          kind: elements.kind.value,
          sessionState: elements.sessionState.value,
          fault: elements.faultType.value,
        })
      } else {
        model = buildWorkflowModel({
          ending: elements.ending.value,
          shape: elements.shape.value,
          fault: elements.faultType.value,
        })
      }
      const verdict = evaluateOrchestrationOracle(model)
      currentModel = model

      // 篡改实验的反馈：按当前模式判定生效条件，不满足就明说。
      const fault = elements.faultType.value
      const effective = (fault === 'replay-missed' && isSchedule && model.input.sessionState !== 'live-idle')
        || (fault === 'drop-agent-end' && !isSchedule && model.input.ending !== 'cancelled')
      if (fault !== 'none' && !effective) {
        writeText(elements.faultNote, isSchedule
          ? 'live-idle 会话没有滑过的锚点，账本无可谎报，注入未生效。切到忙/冷会话再看。'
          : '取消路径靠引擎合成端记账：在那里吞端会同时弄脏两处校验，注入未生效。换个结局。')
        elements.faultNote.hidden = false
      } else if (fault !== 'none' && !verdict.pass) {
        writeText(elements.faultNote, isSchedule
          ? '你刚刚让账本谎报了补票：滑过的锚点被记成零，而时间线里的 overdue 步骤还在原地。'
            + '抓住它的是 CATCHUP_LATEST_ONLY——错过的区间不枚举、也不许被「已补投」。'
          : '你刚刚吞掉了一条 workflow/agent-end：start/end 按 seq 配对是观察者的生命线。'
            + '抓住它的是 AGENT_PAIRING——少一条端，配对当场报缺。')
        elements.faultNote.hidden = false
      } else {
        elements.faultNote.hidden = true
      }

      renderTimeline(model, elements.timeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      if (isSchedule) {
        writeText(elements.dispatches, String(model.observations.dispatchCount))
        writeText(elements.skipped, String(model.observations.skippedAnchors))
        writeText(elements.agents, '—')
        writeText(elements.stopReason, model.observations.recordStillActive ? '记录仍激活' : '记录退役')
        setFeedback('已推演：派发 ' + String(model.observations.dispatchCount)
          + ' 次，跳过 ' + String(model.observations.skippedAnchors) + ' 个错过锚点。', 'success')
      } else {
        writeText(elements.dispatches, '—')
        writeText(elements.skipped, '—')
        writeText(elements.agents, `${String(model.observations.agentEnds)} / ${String(model.observations.agentStarts)}`
          + (model.observations.synthesizedEnds > 0 ? `（含 ${String(model.observations.synthesizedEnds)} 个引擎合成端）` : ''))
        writeText(elements.stopReason, model.observations.stopReason)
        setFeedback('已推演：' + String(model.observations.stopReason)
          + '；agent 配对 ' + String(model.observations.agentEnds) + '/' + String(model.observations.agentStarts) + '。', 'success')
      }
      syncStep()
    } catch (error) {
      console.error('[orchestration] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.mode, elements.kind, elements.sessionState, elements.ending, elements.shape, elements.faultType]) {
    control.addEventListener('change', () => {
      rebuild()
      elements.step.value = elements.step.max
      syncStep()
    })
  }

  rebuild()

  elements.step.addEventListener('input', syncStep)
  const nudgeStep = delta => {
    elements.step.value = String(Math.min(Number(elements.step.max),
      Math.max(Number(elements.step.min), Number(elements.step.value) + delta)))
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  elements.stepPrev.addEventListener('click', () => nudgeStep(-1))
  elements.stepNext.addEventListener('click', () => nudgeStep(1))
  bindAutoAdvance(document.getElementById('orch-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('orch-speed') })
  bindRangeKeys(elements.step)
  // 图形即控制器：点时间线的任意一步，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    const trace = input => buildWorkflowModel(input).steps.map(step => ({
      lane: step.lane ?? '编排', phase: step.phase ?? step.kind ?? 'step', detail: step.detail ?? '', index: step.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'orchestration-ladder',
      rungs: replayRungs([
        {
          title: '顺序两步，走完即成',
          text: '两个子代理按序执行、全部完成——最短的一条完整编排轨迹。',
          traces: [{ id: 'seq-ok', label: '顺序·完成', steps: trace({ shape: 'sequential-2', ending: 'completed' }) }],
        },
        {
          title: '并行三路，一路失败',
          text: '并行扇出里一个子代理报错：失败被如实上报，其余兄弟不被牵连，整体以 error 结算。',
          traces: [{ id: 'par-err', label: '并行·出错', steps: trace({ shape: 'parallel-3-one-fails', ending: 'error' }), focusPhases: ['error'] }],
        },
        {
          title: '取消：宽限与强制结算',
          text: 'cancel 给有界宽限；脚本不肯停也要被引擎推到 cancelled——绝不悬挂在卡死的子任务上。',
          traces: [{ id: 'cancel', label: '取消', steps: trace({ shape: 'sequential-2', ending: 'cancelled' }) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'latest-only-advance',
    explain: {
      'replay-each': '那样会把错过的区间逐个重放成多轮模型回合；协议明确不枚举、不持久化、不重放。',
      'drop-record': '也不会作废：记录直接推进到决策时间后第一个创建锚点对齐的目标，继续按固定速率走。',
      'latest-only-advance': '正确。一条 Every 只投递其最新一次到期，然后一步跨过所有错过的锚点——批量化把模型回合数压住。',
    },
  })
}
