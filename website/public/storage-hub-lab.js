/**
 * storage-hub-lab 实验页的渲染层。模型在 storage-hub-model.js；本文件只画返回值。
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
  BACKEND_LABELS,
  SCENARIO_LABELS,
  STORAGE_BACKENDS,
  STORAGE_SCENARIOS,
  STORAGE_UNIT_NAMES,
  buildStorageModel,
  evaluateStorageOracle,
} from './storage-hub-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STORAGE_STATE_SCHEMA = {
  backend: { enum: STORAGE_BACKENDS },
  scenario: { enum: STORAGE_SCENARIOS },
  unitName: { enum: STORAGE_UNIT_NAMES },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

const KIND_TONES = {
  resolve: 'is-hit',
  facet: '',
  name: '',
  open: 'is-registered',
  write: 'is-registered',
  'delete-idempotent': 'is-fallback',
  close: 'is-hit',
  reopen: 'is-registered',
  error: 'is-fallback',
}

function renderTimeline(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'sh-timeline'
  for (const step of model.steps) {
    const item = document.createElement('li')
    item.className = 'sh-step ' + (KIND_TONES[step.kind] ?? '')
    item.setAttribute('data-reveal', '')
    item.dataset.index = String(step.index)
    const head = document.createElement('div')
    head.className = 'sh-step-head'
    const op = document.createElement('code')
    writeText(op, '#' + String(step.index) + ' ' + step.op)
    head.append(op)
    if (step.kind === 'error') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip is-suppressed'
      writeText(badge, String(step.code))
      head.append(badge)
    }
    if (step.kind === 'facet' || step.kind === 'name') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip' + (step.pass ? '' : ' is-suppressed')
      writeText(badge, step.pass ? '通过' : '大声失败')
      head.append(badge)
    }
    const detail = document.createElement('p')
    detail.className = 'sh-step-detail'
    writeText(detail, step.detail)
    item.append(head, detail)
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#storage-form'),
    backend: document.querySelector('#storage-backend'),
    scenario: document.querySelector('#storage-scenario'),
    unitName: document.querySelector('#storage-unit'),
    backendNote: document.querySelector('#storage-backend-note'),
    feedback: document.querySelector('#storage-feedback'),
    timeline: document.querySelector('#sh-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    errorCode: document.querySelector('#metric-errorcode'),
    openUnit: document.querySelector('#metric-openunit'),
    durable: document.querySelector('#metric-durable'),
    idempotent: document.querySelector('#metric-idempotent'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#sh-step'),
    stepOutput: document.querySelector('#sh-step-output'),
    stepPrev: document.querySelector('#sh-step-prev'),
    stepNext: document.querySelector('#sh-step-next'),
    stepCaption: document.querySelector('#sh-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  for (const backend of STORAGE_BACKENDS) {
    const option = document.createElement('option')
    option.value = backend
    writeText(option, BACKEND_LABELS[backend])
    elements.backend.append(option)
  }
  for (const scenario of STORAGE_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario
    writeText(option, SCENARIO_LABELS[scenario])
    elements.scenario.append(option)
  }
  for (const unitName of STORAGE_UNIT_NAMES) {
    const option = document.createElement('option')
    option.value = unitName
    writeText(option, unitName)
    elements.unitName.append(option)
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
    for (const item of elements.timeline.querySelectorAll('.sh-step')) {
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
      const model = buildStorageModel({
        backend: elements.backend.value,
        scenario: elements.scenario.value,
        unitName: elements.unitName.value,
      })
      const verdict = evaluateStorageOracle(model)
      currentModel = model

      writeText(elements.backendNote, BACKEND_LABELS[model.input.backend] + ' × ' + SCENARIO_LABELS[model.input.scenario])
      renderTimeline(model, elements.timeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.errorCode, model.observations.errorCode ?? '无（成功）')
      writeText(elements.openUnit, model.observations.openedUnit ?? '未打开')
      writeText(elements.durable, model.observations.durableOnceResolved ? '是' : '—')
      writeText(elements.idempotent, model.observations.deleteIdempotent === null ? '（剧本未涉及）' : model.observations.deleteIdempotent ? '是——空操作' : '否')

      setFeedback(model.observations.errorCode
        ? '在「' + (model.steps.find(step => step.kind === 'error')?.op ?? '') + '」处按 ' + model.observations.errorCode + ' 拒绝。'
        : '全流程走通：写入即持久，重开读回完整快照。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[storage-hub] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        backend: elements.backend.value,
        scenario: elements.scenario.value,
        unitName: elements.unitName.value,
        step: Number(elements.step.value),
      }, STORAGE_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.backend, elements.scenario, elements.unitName]) {
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
  bindAutoAdvance(document.getElementById('sh-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('sh-speed') })
  // 图形即控制器：点时间线的任意一步，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
  bindRangeKeys(elements.step)

  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  const restored = readStateFromHash(location.hash, STORAGE_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.backend.value = restored.value.backend
    elements.scenario.value = restored.value.scenario
    elements.unitName.value = restored.value.unitName
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
    // 存储步骤没有天然泳道，统一放进一条「存取」泳道按序重放。
    const toSteps = model => model.steps.map(step => ({
      lane: '存取',
      phase: step.op,
      detail: `${step.op}：${step.detail}`,
      index: step.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'storage-hub-ladder',
      rungs: replayRungs([
        {
          title: '最小闭环：开、写、关、重开读回',
          text: '持久化的全部语义先在这一条轨迹里看全：打开单元、写入、关闭、再打开时读到刚才那份。',
          traces: [{ id: 'happy-json', label: 'JSON 后端', steps: toSteps(buildStorageModel({ backend: 'json', scenario: 'happy-path', unitName: 'todos_v2' })) }],
        },
        {
          title: '版本戳对不上：拒绝而不是猜',
          text: '重开时版本戳对不上，加载当场停下。格式演进靠显式版本号，静默兼容才是事故来源。',
          traces: [{ id: 'mismatch', label: '版本不匹配', steps: toSteps(buildStorageModel({ backend: 'json', scenario: 'version-mismatch', unitName: 'todos_v2' })) }],
        },
        {
          title: '介质内容坏了：在最早的解析点大声失败',
          text: '文件内容不是本单元的格式时不做任何抢救性解读——misconfiguration fails loud 在存储缝上的样子。',
          traces: [{ id: 'malformed', label: '介质损坏', steps: toSteps(buildStorageModel({ backend: 'json', scenario: 'malformed-medium', unitName: 'todos_v2' })) }],
        },
        {
          title: '换后端：接缝语义不变',
          text: '把 JSON 换成 SQLite 再走一遍同样的剧本——调用方看到的步骤顺序和结论保持一致，这就是接缝两侧解耦的含义。',
          traces: [
            { id: 'json', label: 'JSON', steps: toSteps(buildStorageModel({ backend: 'json', scenario: 'happy-path', unitName: 'todos_v2' })) },
            { id: 'sqlite', label: 'SQLite', steps: toSteps(buildStorageModel({ backend: 'sqlite', scenario: 'happy-path', unitName: 'todos_v2' })) },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'idempotent-noop',
    explain: {
      'rejects-missing': '那样调用方就得先读再删，多一次往返还引入竞态；上游把删除定义为幂等。',
      'idempotent-noop': '正确。缺失键照常 resolve：删除的终点是「键不在了」，起点是什么不重要。',
      tombstone: '墓碑属于同步复制的世界；这里的介质就是最终事实，不需要标记删除。',
    },
  })
}
