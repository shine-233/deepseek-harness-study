/**
 * orchestration 实验页的渲染层。模型在 orchestration-model.js；本文件只画返回值。
 * 模式开关切换 schedule / workflow 两套时间线，读数读的是同一次推演。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  SCHEDULE_KINDS,
  SESSION_STATES,
  WORKFLOW_ENDINGS,
  WORKFLOW_SHAPES,
  buildScheduleModel,
  buildWorkflowModel,
  evaluateOrchestrationOracle,
} from './orchestration-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
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
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

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
        })
      } else {
        model = buildWorkflowModel({
          ending: elements.ending.value,
          shape: elements.shape.value,
        })
      }
      const verdict = evaluateOrchestrationOracle(model)

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
  for (const control of [elements.mode, elements.kind, elements.sessionState, elements.ending, elements.shape]) {
    control.addEventListener('change', rebuild)
  }

  rebuild()
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
    correct: 'latest-only-advance',
    explain: {
      'replay-each': '那样会把错过的区间逐个重放成多轮模型回合；协议明确不枚举、不持久化、不重放。',
      'drop-record': '也不会作废：记录直接推进到决策时间后第一个创建锚点对齐的目标，继续按固定速率走。',
      'latest-only-advance': '正确。一条 Every 只投递其最新一次到期，然后一步跨过所有错过的锚点——批量化把模型回合数压住。',
    },
  })
}
