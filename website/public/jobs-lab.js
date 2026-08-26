/**
 * jobs-lab 实验页的渲染层。模型在 jobs-model.js；本文件只画返回值。
 * 时间线步进、状态快照条和读数读的是同一次推演。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import { bindAutoAdvance } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  JOBS_ENDINGS,
  JOBS_SCRIPTS,
  buildJobsModel,
  evaluateJobsOracle,
} from './jobs-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const JOBS_STATE_SCHEMA = {
  script: { enum: JOBS_SCRIPTS },
  ending: { enum: JOBS_ENDINGS },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

const SCRIPT_LABELS = {
  reader: '读者流：read 消费增量，终局读认领 reported',
  killer: '杀手流：kill 认领 reported，通知被抑制',
  teardown: '拆除流：owner dispose 取消并排空，零通知',
}

const ENDING_LABELS = {
  completed: '正常完成（exit code: 0）',
  failed: 'producer 的 done 被拒绝',
  'late-completed': '取消后 producer 迟到地 resolved(completed)',
}

const STATUS_TONES = {
  running: 'is-running',
  stopping: 'is-stopping',
  completed: 'is-completed',
  killed: 'is-killed',
  failed: 'is-failed',
  '—': 'is-none',
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
    const transition = document.createElement('span')
    transition.className = 'jb-transition'
    writeText(transition, `${step.statusBefore ?? '∅'} → ${step.statusAfter}`)
    head.append(op, transition)
    const detail = document.createElement('p')
    detail.className = 'jb-step-detail'
    writeText(detail, step.detail)
    item.append(head, detail)
    if (step.kind === 'notice') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip ' + (step.suppressed ? 'is-suppressed' : '')
      writeText(badge, step.suppressed ? '通知被抑制（reported 已认领）' : '完成通知送达')
      item.append(badge)
    }
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#jobs-form'),
    script: document.querySelector('#jobs-script'),
    ending: document.querySelector('#jobs-ending'),
    scriptNote: document.querySelector('#jobs-script-note'),
    feedback: document.querySelector('#jobs-feedback'),
    timeline: document.querySelector('#jb-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    terminal: document.querySelector('#metric-terminal'),
    notices: document.querySelector('#metric-notices'),
    stepsOut: document.querySelector('#metric-steps'),
    lateIgnored: document.querySelector('#metric-late'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#jb-step'),
    stepOutput: document.querySelector('#jb-step-output'),
    stepPrev: document.querySelector('#jb-step-prev'),
    stepNext: document.querySelector('#jb-step-next'),
    stepCaption: document.querySelector('#jb-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  for (const script of JOBS_SCRIPTS) {
    const option = document.createElement('option')
    option.value = script
    writeText(option, SCRIPT_LABELS[script])
    elements.script.append(option)
  }
  for (const ending of JOBS_ENDINGS) {
    const option = document.createElement('option')
    option.value = ending
    writeText(option, ENDING_LABELS[ending])
    elements.ending.append(option)
  }

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
        + '：' + (entry.statusBefore ?? '∅') + ' → ' + entry.statusAfter)
    }
    elements.stepPrev.disabled = index <= 0
    elements.stepNext.disabled = index >= total - 1
  }

  const rebuild = () => {
    try {
      const model = buildJobsModel({
        script: elements.script.value,
        ending: elements.ending.value,
      })
      const verdict = evaluateJobsOracle(model)
      currentModel = model

      writeText(elements.scriptNote, SCRIPT_LABELS[model.input.script] + ' × ' + ENDING_LABELS[model.input.ending])
      renderTimeline(model, elements.timeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.terminal, String(model.observations.terminalStatus))
      writeText(elements.notices, String(model.observations.noticesDelivered))
      writeText(elements.stepsOut, String(model.observations.steps))
      writeText(elements.lateIgnored, model.observations.lateOutcomeIgnored ? '是——先到先得' : '无迟到结果')

      setFeedback('已推演：终局 ' + String(model.observations.terminalStatus)
        + '，通知 ' + String(model.observations.noticesDelivered) + ' 条。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[jobs] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        script: elements.script.value,
        ending: elements.ending.value,
        step: Number(elements.step.value),
      }, JOBS_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.script, elements.ending]) {
    control.addEventListener('change', () => {
      rebuild()
      elements.step.value = elements.step.max
      elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
    })
  }

  elements.step.addEventListener('input', () => {
    syncStep()
    persistState()
  })
  const nudgeStep = delta => {
    elements.step.value = String(Math.min(Number(elements.step.max),
      Math.max(Number(elements.step.min), Number(elements.step.value) + delta)))
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  elements.stepPrev.addEventListener('click', () => nudgeStep(-1))
  elements.stepNext.addEventListener('click', () => nudgeStep(1))
    bindAutoAdvance(document.getElementById('jb-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('jb-speed') })
bindRangeKeys(elements.step)
  // 图形即控制器：点时间线的任意一步，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })

  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  const restored = readStateFromHash(location.hash, JOBS_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.script.value = restored.value.script
    elements.ending.value = restored.value.ending
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
      setFeedback('已复制当前实验状态的链接。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installStoryRail()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    const trace = input => buildJobsModel(input).steps.map(step => ({
      lane: step.lane ?? '任务', phase: step.phase ?? step.kind ?? 'step', detail: step.detail ?? '', index: step.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'jobs-ladder',
      rungs: replayRungs([
        {
          title: '正常收尾：drain 到 settled',
          text: 'producer 完结、队列排干、任务结算——一条从头到尾都顺利的生命周期。',
          traces: [{ id: 'ok', label: 'reader·completed', steps: trace({ script: 'reader', ending: 'completed' }) }],
        },
        {
          title: '失败也结算：failed 不是悬挂',
          text: '脚本失败时任务同样走到终态。生命周期协议保证每种结局都有名字、有记录。',
          traces: [{ id: 'fail', label: 'killer·failed', steps: trace({ script: 'killer', ending: 'failed' }), focusPhases: ['failed'] }],
        },
        {
          title: '迟到的完成：late-completed 的归宿',
          text: '取消之后结果才回来——迟到不等于丢失，协议给这类完成单独的归宿。',
          traces: [{ id: 'late', label: 'teardown·late-completed', steps: trace({ script: 'teardown', ending: 'late-completed' }) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'killed-first-wins',
    explain: {
      'completed-wins': '那样就违反 FIRST_SETTLEMENT_WINS：结算先到先得，迟到的结果整体被忽略。',
      'failed-forever': '也不会卡在 stopping：producer 排空后记录落为 killed。',
      'killed-first-wins': '正确。kill 已把记录标成 stopping 并认领 reported；随后的 done(killed) 先落册，迟到的 completed 被忽略。',
    },
  })
}
