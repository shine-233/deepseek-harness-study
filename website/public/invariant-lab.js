/**
 * invariant-lab 实验页的渲染层。模型在 invariant-model.js；本文件只画返回值。
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
  FILTER_LABELS,
  INVARIANT_FILTERS,
  INVARIANT_FAULT_TYPES,
  INVARIANT_OUTCOMES,
  INVARIANT_PACKAGES,
  OUTCOME_LABELS,
  buildInvariantModel,
  evaluateInvariantOracle,
} from './invariant-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const INVARIANT_STATE_SCHEMA = {
  packageName: { enum: INVARIANT_PACKAGES },
  filter: { enum: INVARIANT_FILTERS },
  outcome: { enum: INVARIANT_OUTCOMES },
  fault: { enum: [...INVARIANT_FAULT_TYPES] },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

const KIND_TONES = {
  reserve: 'is-registered',
  filter: '',
  skip: 'is-fallback',
  'child-start': 'is-hit',
  'check-pass': 'is-registered',
  violate: 'is-fallback',
  'dispose-release': '',
}

function renderTimeline(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'iv-timeline'
  for (const step of model.steps) {
    const item = document.createElement('li')
    item.className = 'iv-step ' + (KIND_TONES[step.kind] ?? '')
    item.setAttribute('data-reveal', '')
    item.dataset.index = String(step.index)
    const head = document.createElement('div')
    head.className = 'iv-step-head'
    const op = document.createElement('code')
    writeText(op, '#' + String(step.index) + ' ' + step.op)
    head.append(op)
    if (step.kind === 'filter') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip' + (step.selected ? '' : ' is-suppressed')
      writeText(badge, step.selected ? '安装检查' : '仅保留名字')
      head.append(badge)
    }
    if (step.kind === 'violate') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip is-suppressed'
      writeText(badge, '错误归属：' + String(step.attributed))
      head.append(badge)
    }
    const detail = document.createElement('p')
    detail.className = 'iv-step-detail'
    writeText(detail, step.detail)
    item.append(head, detail)
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#invariant-form'),
    packageName: document.querySelector('#invariant-package'),
    filter: document.querySelector('#invariant-filter'),
    outcome: document.querySelector('#invariant-outcome'),
    faultType: document.querySelector('#iv-fault-type'),
    faultNote: document.querySelector('#iv-fault-note'),
    packageNote: document.querySelector('#invariant-package-note'),
    feedback: document.querySelector('#invariant-feedback'),
    timeline: document.querySelector('#iv-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    reserved: document.querySelector('#metric-reserved'),
    selected: document.querySelector('#metric-selected'),
    error: document.querySelector('#metric-error'),
    stepsOut: document.querySelector('#metric-steps'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#iv-step'),
    stepOutput: document.querySelector('#iv-step-output'),
    stepPrev: document.querySelector('#iv-step-prev'),
    stepNext: document.querySelector('#iv-step-next'),
    stepCaption: document.querySelector('#iv-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  for (const packageName of INVARIANT_PACKAGES) {
    const option = document.createElement('option')
    option.value = packageName
    writeText(option, packageName)
    elements.packageName.append(option)
  }
  for (const filter of INVARIANT_FILTERS) {
    const option = document.createElement('option')
    option.value = filter
    writeText(option, FILTER_LABELS[filter])
    elements.filter.append(option)
  }
  for (const outcome of INVARIANT_OUTCOMES) {
    const option = document.createElement('option')
    option.value = outcome
    writeText(option, OUTCOME_LABELS[outcome])
    elements.outcome.append(option)
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
    for (const item of elements.timeline.querySelectorAll('.iv-step')) {
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
      const model = buildInvariantModel({
        packageName: elements.packageName.value,
        filter: elements.filter.value,
        outcome: elements.outcome.value,
        fault: elements.faultType.value,
      })
      const verdict = evaluateInvariantOracle(model)
      currentModel = model

      writeText(elements.packageNote, model.input.packageName + ' × ' + FILTER_LABELS[model.input.filter])
      renderTimeline(model, elements.timeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      // 篡改实验的反馈：注入未生效或 oracle 变红时，指认被违反的那条规则。
      const swallowActive = elements.faultType.value === 'swallow-violation'
        && elements.outcome.value !== 'pass'
      if (swallowActive && !model.observations.selected) {
        writeText(elements.faultNote,
          '过滤器把检查关掉了：没有真正跑起来的检查也就没有可吞掉的违规，注入未生效。')
        elements.faultNote.hidden = false
      } else if (swallowActive && !verdict.pass) {
        writeText(elements.faultNote,
          '你刚刚把一次真实违规吞成了「通过」：fail() 步骤被抹掉，错误凭据消失。'
          + '抓住它的是 FAIL_ATTRIBUTES_PACKAGE——失败必须带包归属和稳定码，'
          + '「没有错误」本身就是一条无法解释的观测。')
        elements.faultNote.hidden = false
      } else {
        elements.faultNote.hidden = true
      }

      writeText(elements.reserved, '已保留（第 0 步）')
      writeText(elements.selected, model.observations.selected ? '是——子 fiber 安装' : '否——仅占名')
      writeText(elements.error, model.observations.error
        ? `${model.observations.error.code} @ ${model.observations.error.packageName}`
        : '无')
      writeText(elements.stepsOut, String(model.steps.length) + ' 步')

      setFeedback(model.observations.error
        ? '检查失败：' + model.observations.error.message + '（子 fiber 已销毁，保留位已释放）'
        : model.observations.selected ? '检查落座：disposer 负责销毁子 fiber 并释放保留位。'
          : '过滤器拦下了安装：包名仍被保留。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[invariant] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        packageName: elements.packageName.value,
        filter: elements.filter.value,
        outcome: elements.outcome.value,
        fault: elements.faultType.value,
        step: Number(elements.step.value),
      }, INVARIANT_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.packageName, elements.filter, elements.outcome, elements.faultType]) {
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
  bindAutoAdvance(document.getElementById('iv-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('iv-speed') })
  // 图形即控制器：点时间线的任意一步，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
  bindRangeKeys(elements.step)

  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  const restored = readStateFromHash(location.hash, INVARIANT_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.packageName.value = restored.value.packageName
    elements.filter.value = restored.value.filter
    elements.outcome.value = restored.value.outcome
    elements.faultType.value = restored.value.fault
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
    const trace = input => buildInvariantModel(input).steps.map(step => ({
      lane: step.lane ?? '校验', phase: step.phase ?? step.kind ?? 'step', detail: step.detail ?? '', index: step.index,
    }))
    const base = outcome => ({ packageName: '@deepseek-ai/dsh-jobs', filter: 'unfiltered', outcome })
    createConceptLadder(ladderRoot, {
      storageKey: 'invariant-ladder',
      rungs: replayRungs([
        {
          title: '全绿：每条不变量都通过',
          text: '包启动、逐条校验、全部放行——先看不变量机制安静时的样子。',
          traces: [{ id: 'pass', label: 'pass', steps: trace(base('pass')) }],
        },
        {
          title: '违规：在运行时被拦下',
          text: '一条不变量被打破：违规当场报告并进入结算。运行时不变量断言的是被拥有的关系。',
          traces: [{ id: 'violation', label: 'violation', steps: trace(base('violation')), focusPhases: ['violation'] }],
        },
        {
          title: '启动即报错：fail loud 的第一道门',
          text: '有些问题等不到运行——配置层面就错时，包在启动路径上大声失败，根本不进入校验循环。',
          traces: [{ id: 'startup', label: 'startup-error', steps: trace(base('startup-error')) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'reserved-anyway',
    explain: {
      'not-reserved': '那样关掉诊断就能让同一个包再注册一份同名检查；注册表会失去「谁占了这个名字」的账。',
      'reserved-anyway': '正确。register 第一步就保留包名，过滤只决定是否真正安装检查。',
      'throws-disabled': '关闭开关是合法配置：register 正常返回 disposer，只是不装检查。',
    },
  })
}
