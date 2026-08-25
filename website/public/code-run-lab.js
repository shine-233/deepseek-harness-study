/**
 * code-run-lab 实验页的渲染层。模型在 code-run-model.js；本文件只画返回值。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText,
  installDeclaredIcons,
  bindRangeKeys,
  installScrollProgress,
  bindAutoAdvance,
  installInputReset,
} from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import {
  BINDING_CANDIDATES,
  BINDING_LABELS,
  CODE_RUN_SCENARIOS,
  buildCodeRunModel,
  evaluateCodeRunOracle,
} from './code-run-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const CODE_RUN_STATE_SCHEMA = {
  scenario: { enum: CODE_RUN_SCENARIOS },
  binding: { enum: BINDING_CANDIDATES },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

const SCENARIO_LABELS = {
  success: 'success：正常返回完成值',
  exception: 'exception：程序抛出 TypeError',
  timeout: 'timeout：预算到期，硬停程序',
  abort: 'abort：signal 触发，运行时不再等待',
  'worker-exit': 'worker-exit：基底未结算就死亡',
  'invalid-output': 'invalid-output：完成值不是无损 JSON',
  'output-limit': 'output-limit：序列化整体超限',
}

const KIND_TONES = {
  exception: 'is-failed',
  timeout: 'is-stopping',
  abort: 'is-killed',
  'worker-exit': 'is-killed',
  'invalid-output': 'is-failed',
  'output-limit': 'is-stopping',
}

function renderTimeline(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'cr-timeline'
  for (const step of model.steps) {
    const item = document.createElement('li')
    item.className = 'cr-step'
    item.setAttribute('data-reveal', '')
    item.dataset.index = String(step.index)
    const head = document.createElement('div')
    head.className = 'cr-step-head'
    const op = document.createElement('code')
    writeText(op, '#' + String(step.index) + ' ' + step.op)
    if (step.kind === 'validate') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip ' + (step.pass ? '' : 'is-suppressed')
      writeText(badge, step.pass ? '三道检查通过' : '装配被拒')
      head.append(op, badge)
    } else {
      head.append(op)
    }
    const detail = document.createElement('p')
    detail.className = 'cr-step-detail'
    writeText(detail, step.detail)
    item.append(head, detail)
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#code-run-form'),
    scenario: document.querySelector('#code-run-scenario'),
    binding: document.querySelector('#code-run-binding'),
    scenarioNote: document.querySelector('#code-run-scenario-note'),
    feedback: document.querySelector('#code-run-feedback'),
    timeline: document.querySelector('#cr-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    failure: document.querySelector('#metric-failure'),
    logs: document.querySelector('#metric-logs'),
    resolved: document.querySelector('#metric-resolved'),
    blocked: document.querySelector('#metric-blocked'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#cr-step'),
    stepOutput: document.querySelector('#cr-step-output'),
    stepPrev: document.querySelector('#cr-step-prev'),
    stepNext: document.querySelector('#cr-step-next'),
    stepCaption: document.querySelector('#cr-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  for (const scenario of CODE_RUN_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario
    writeText(option, SCENARIO_LABELS[scenario])
    elements.scenario.append(option)
  }
  for (const binding of BINDING_CANDIDATES) {
    const option = document.createElement('option')
    option.value = binding
    writeText(option, BINDING_LABELS[binding])
    elements.binding.append(option)
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
    for (const item of elements.timeline.querySelectorAll('.cr-step')) {
      item.classList.toggle('is-current', Number(item.dataset.index) === index)
      item.classList.toggle('is-future', Number(item.dataset.index) > index)
    }
    const entry = currentModel.steps[index]
    if (entry !== undefined) {
      writeText(elements.stepCaption, '第 ' + String(index) + ' 步 · ' + entry.op)
    }
    elements.stepPrev.disabled = index <= 0
    elements.stepNext.disabled = index >= total - 1
  }

  const rebuild = () => {
    try {
      const model = buildCodeRunModel({
        scenario: elements.scenario.value,
        binding: elements.binding.value,
      })
      const verdict = evaluateCodeRunOracle(model)
      currentModel = model

      writeText(elements.scenarioNote, SCENARIO_LABELS[model.input.scenario]
        + ' × 命名空间 ' + model.input.binding)
      renderTimeline(model, elements.timeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.failure, model.observations.failureKind ?? '无（成功）')
      if (model.observations.failureKind !== null) {
        elements.failure.className = KIND_TONES[model.observations.failureKind] ?? ''
      } else {
        elements.failure.className = ''
      }
      writeText(elements.logs, String(model.observations.logCount) + ' 条')
      writeText(elements.resolved, model.observations.resolvedWithoutReject ? '是——错误是字段' : '—')
      writeText(elements.blocked, model.observations.blockedBeforeRun ? '是（命名空间非法）' : '否')

      setFeedback(model.result.blockedBeforeRun
        ? '装配在启动前被拒：' + model.bindingCheck.reason
        : '已结算：failureKind=' + String(model.observations.failureKind ?? 'none')
          + '，run() resolve 而不 reject。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[code-run] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        binding: elements.binding.value,
        step: Number(elements.step.value),
      }, CODE_RUN_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.scenario, elements.binding]) {
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
  bindAutoAdvance(document.getElementById('cr-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('cr-speed') })
  // 图形即控制器：点时间线的任意一步，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
  bindRangeKeys(elements.step)

  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  const restored = readStateFromHash(location.hash, CODE_RUN_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.binding.value = restored.value.binding
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

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'error-field',
    explain: {
      rejects: '那样调用方就得为每个失败剧本写 catch；上游契约明确 run() 不 reject。',
      'error-field': '正确。失败的程序随 resolve 报告：error 是结果字段，报告失败是调用方的职责，不是异常路径。',
      'silent-null': 'value 为 null 不够：六种失败类必须以 kind 说明是谁、为什么，供模型自我修正。',
    },
  })
}
