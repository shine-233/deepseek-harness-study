/**
 * host-gateway-lab 实验页的渲染层。模型在 host-gateway-model.js；本文件只画返回值。
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
  HOST_REQUESTS,
  HOST_REQUEST_LABELS,
  PICKER_BACKENDS,
  PICKER_LABELS,
  buildHostGatewayModel,
  evaluateHostGatewayOracle,
} from './host-gateway-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const HOST_STATE_SCHEMA = {
  request: { enum: HOST_REQUESTS },
  picker: { enum: PICKER_BACKENDS },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

function renderTimeline(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'hg-timeline'
  for (const step of model.steps) {
    const item = document.createElement('li')
    item.className = 'hg-step'
    item.setAttribute('data-reveal', '')
    item.dataset.index = String(step.index)
    if (step.kind === 'scan') item.classList.toggle('is-hit', step.hit === true)
    if (step.kind === 'serve') item.classList.add(step.fallback ? 'is-fallback' : 'is-registered')
    const head = document.createElement('div')
    head.className = 'hg-step-head'
    const op = document.createElement('code')
    writeText(op, '#' + String(step.index) + ' ' + step.op)
    head.append(op)
    if (step.kind === 'serve') {
      const badge = document.createElement('span')
      badge.className = 'tj-view-chip' + (step.fallback ? ' is-suppressed' : '')
      writeText(badge, step.fallback ? '回退座位' : '已注册路由')
      head.append(badge)
    }
    const detail = document.createElement('p')
    detail.className = 'hg-step-detail'
    writeText(detail, step.detail)
    item.append(head, detail)
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#host-form'),
    request: document.querySelector('#host-request'),
    picker: document.querySelector('#host-picker'),
    requestNote: document.querySelector('#host-request-note'),
    feedback: document.querySelector('#host-feedback'),
    timeline: document.querySelector('#hg-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    responder: document.querySelector('#metric-responder'),
    scan: document.querySelector('#metric-scan'),
    fallback: document.querySelector('#metric-fallback'),
    backend: document.querySelector('#metric-backend'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#hg-step'),
    stepOutput: document.querySelector('#hg-step-output'),
    stepPrev: document.querySelector('#hg-step-prev'),
    stepNext: document.querySelector('#hg-step-next'),
    stepCaption: document.querySelector('#hg-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  for (const request of HOST_REQUESTS) {
    const option = document.createElement('option')
    option.value = request
    writeText(option, HOST_REQUEST_LABELS[request])
    elements.request.append(option)
  }
  for (const picker of PICKER_BACKENDS) {
    const option = document.createElement('option')
    option.value = picker
    writeText(option, PICKER_LABELS[picker])
    elements.picker.append(option)
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
    for (const item of elements.timeline.querySelectorAll('.hg-step')) {
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
      const model = buildHostGatewayModel({
        request: elements.request.value,
        picker: elements.picker.value,
      })
      const verdict = evaluateHostGatewayOracle(model)
      currentModel = model

      writeText(elements.requestNote, HOST_REQUEST_LABELS[model.input.request])
      renderTimeline(model, elements.timeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      const serveStep = model.steps.find(step => step.kind === 'serve')
      writeText(elements.responder, serveStep?.op ?? '—')
      writeText(elements.scan, String(model.observations.scanSteps) + ' 次')
      writeText(elements.fallback, model.observations.usedFallback ? '是——没人认领' : '否——注册方应答')
      writeText(elements.backend, model.observations.servingBackend ?? '（非选择器请求）')

      setFeedback(model.observations.usedFallback
        ? '全部路由未命中：frontend-static 从回退座位应答。'
        : '已注册路由命中：回退座位保持沉默。', 'success')
      syncStep()
      persistState()
    } catch (error) {
      console.error('[host-gateway] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        request: elements.request.value,
        picker: elements.picker.value,
        step: Number(elements.step.value),
      }, HOST_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.request, elements.picker]) {
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
  bindAutoAdvance(document.getElementById('hg-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('hg-speed') })
  // 图形即控制器：点时间线的任意一步，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
  bindRangeKeys(elements.step)

  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  const restored = readStateFromHash(location.hash, HOST_STATE_SCHEMA)
  const hasRestoredStep = restored !== null && restored.ok
  if (restored !== null && restored.ok) {
    elements.request.value = restored.value.request
    elements.picker.value = restored.value.picker
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
    // 模型步骤用 op 命名阶段，另有 kind 短标签：轨迹引擎取 kind 作相位。
    const trace = input => buildHostGatewayModel(input).steps.map((step, index) => ({
      lane: 'webserver', phase: step.kind ?? step.op, detail: step.detail, index: step.index ?? index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'host-gateway-ladder',
      rungs: replayRungs([
        {
          title: '唯一载体，顺序扫描',
          text: '无论哪种客户端形态，请求都从 webserver 这条载体进来。路由表按注册顺序逐条比较，命中即由属主应答——插件清单接口就是这么被找到的。',
          traces: [{ id: 'api', label: 'inventory-api', steps: trace({ request: 'inventory-api', picker: 'auto' }), focusPhases: ['serve'] }],
        },
        {
          title: '回退座位：谁都不认领时才轮到它',
          text: 'SPA 文档与静态资源在注册表里三次未命中，最后由 frontend-static 应答。回退座位不参与竞争——它只在没有任何已注册路由命中时出场。',
          traces: [
            { id: 'doc', label: 'GET /', steps: trace({ request: 'spa-doc', picker: 'auto' }) },
            { id: 'asset', label: 'GET /assets/app.css', steps: trace({ request: 'spa-asset', picker: 'browse' }) },
          ],
        },
        {
          title: '共享接缝：换后端不改契约',
          text: 'directory-picker 是一条共享接缝：native 与 browse 两个后端互相替换，auto 按宿主能力装配其一。消费方发出的请求契约始终不变。',
          traces: [
            { id: 'native', label: 'native 后端', steps: trace({ request: 'picker-api', picker: 'native' }), focusPhases: ['seam'] },
            { id: 'browse', label: 'browse 后端', steps: trace({ request: 'picker-api', picker: 'browse' }), focusPhases: ['seam'] },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'after-miss',
    explain: {
      'first-look': '那样静态服务会截走本该由插件处理的 API 路径；上游把它安排在「回退座位」。',
      'after-miss': '正确。frontend-static 只在没有任何已注册路由认领时才把 SPA dist 发出去。',
      'never-doc': '文档请求恰恰是回退座位的常客：没有插件认领 / 时，它负责送出 index.html。',
    },
  })
}
