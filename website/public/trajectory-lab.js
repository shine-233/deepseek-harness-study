/**
 * trajectory 实验页的渲染层。模型在 trajectory-model.js；本文件只画返回值。
 * 左列事件流、右列投影卡片和读数读的是同一次重放。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { bindAutoAdvance } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  TRAJECTORY_EVENTS,
  TRAJECTORY_SCENARIOS,
  buildTrajectoryModel,
  evaluateTrajectoryOracle,
} from './trajectory-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const VIEW_LABELS = {
  generic: 'generic',
  terminal: 'terminal',
  diff: 'diff',
  read: 'read',
  search: 'search',
}

function renderEvents(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'tj-events'
  for (const entry of model.consumed) {
    const item = document.createElement('li')
    item.className = 'tj-event ' + (entry.applied ? 'is-applied' : 'is-future')
    item.dataset.index = String(entry.index)
    // 事件序号就是步进滑杆的步号；带上 data-step，图上拖拽才能联动滑杆。
    item.dataset.step = String(entry.index)
    const event = model.events[entry.index]
    const title = document.createElement('strong')
    writeText(title, '#' + String(entry.index) + ' ' + event.kind)
    const note = document.createElement('small')
    writeText(note, event.detail ?? event.argsPreview ?? '')
    item.append(title, note)
    list.append(item)
  }
  target.append(list)
}

function renderCards(model, target) {
  target.replaceChildren()
  for (const card of model.cards) {
    const node = document.createElement('div')
    node.setAttribute('data-reveal', '')
    if (card.type === 'user') {
      node.className = 'tj-card is-user'
      writeText(node, card.text)
    } else if (card.type === 'assistant-streaming') {
      node.className = 'tj-card is-assistant is-streaming'
      writeText(node, card.text)
      const tag = document.createElement('span')
      tag.className = 'tj-tag'
      writeText(tag, '打字中（chunk）——还没有 assistant/message 定稿')
      node.append(tag)
    } else if (card.type === 'assistant') {
      node.className = 'tj-card is-assistant'
      writeText(node, card.text)
    } else {
      node.className = 'tj-card is-tool is-' + card.state
      const head = document.createElement('div')
      head.className = 'tj-card-head'
      const viewKind = card.state === 'settled' ? card.resultCard : card.pendingKind ?? card.pendingCard
      const stateChip = document.createElement('span')
      stateChip.className = 'tj-tag is-state-' + card.state
      writeText(stateChip, card.state === 'pending' ? 'pending' : 'settled · ' + (card.outcome ?? ''))
      const viewChip = document.createElement('span')
      viewChip.className = 'tj-view-chip'
      writeText(viewChip, 'card: ' + (card.state === 'settled' ? card.resultCard : card.pendingCard)
        + (VIEW_LABELS[viewKind] && viewKind !== (card.state === 'settled' ? card.resultCard : card.pendingCard) ? ' · kind: ' + viewKind : ''))
      const title = document.createElement('code')
      writeText(title, card.tool + ' ' + card.argsPreview)
      head.append(title, stateChip, viewChip)
      node.append(head)
    }
    target.append(node)
  }
  if (model.cards.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'fe-empty-diff'
    writeText(empty, '重放位置在第 0 步之前：还没有任何卡片。')
    target.append(empty)
  }
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#traj-form'),
    feedback: document.querySelector('#traj-feedback'),
    events: document.querySelector('#traj-events'),
    cards: document.querySelector('#traj-cards'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    cardsMetric: document.querySelector('#metric-cards'),
    pending: document.querySelector('#metric-pending'),
    diff: document.querySelector('#metric-diff'),
    blocks: document.querySelector('#metric-blocks'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#traj-step'),
    stepOutput: document.querySelector('#traj-step-output'),
    stepPrev: document.querySelector('#traj-step-prev'),
    stepNext: document.querySelector('#traj-step-next'),
    stepCaption: document.querySelector('#traj-step-caption'),
    scenario: document.querySelector('#traj-scenario'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  const rebuild = () => {
    try {
      const model = buildTrajectoryModel({ upto: Number(elements.step.value), scenario: elements.scenario.value })
      const verdict = evaluateTrajectoryOracle(model)
      currentModel = model

      elements.step.max = String(model.events.length - 1)
      if (Number.parseInt(elements.step.value, 10) > model.events.length - 1) {
        elements.step.value = String(model.events.length - 1)
      }

      renderEvents(model, elements.events)
      renderCards(model, elements.cards)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      for (const item of elements.events.querySelectorAll('[data-index]')) {
        const at = Number(item.getAttribute('data-index'))
        item.classList.toggle('is-current', at === model.input.upto)
      }
      const event = model.events[model.input.upto]
      writeText(elements.stepCaption, '第 ' + String(event.index) + ' 步 · ' + event.kind + '：'
        + (event.detail ?? event.argsPreview ?? ''))

      writeText(elements.cardsMetric, String(model.observations.cards))
      writeText(elements.pending, String(model.observations.pendingCards))
      writeText(elements.diff, String(model.observations.diffCards))
      writeText(elements.blocks, String(model.observations.finalizedAssistantBlocks))
      setFeedback('已重放到第 ' + String(model.input.upto) + ' 步（' + model.scenarioLabel + '）：' + String(model.observations.cards)
        + ' 张卡片、' + String(model.observations.pendingCards) + ' 张还在等待结果。', 'success')
      persistState()
    } catch (error) {
      console.error('[trajectory] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        step: Number(elements.step.value),
        scenario: elements.scenario.value,
      }, { step: { integerRange: [0, Number.MAX_SAFE_INTEGER] }, scenario: { enum: TRAJECTORY_SCENARIOS.map(item => item.id) } }))
    } catch {
      // 保持安静。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })

  elements.step.max = String(TRAJECTORY_EVENTS.length - 1)

  elements.scenario.addEventListener('change', () => {
    elements.step.value = '0'
    writeText(elements.stepOutput, '0')
    rebuild()
    persistState()
  })

  elements.step.addEventListener('input', () => {
    writeText(elements.stepOutput, elements.step.value)
    rebuild()
    persistState()
  })
  const nudgeStep = delta => {
    elements.step.value = String(Math.min(Number(elements.step.max),
      Math.max(Number(elements.step.min), Number(elements.step.value) + delta)))
    elements.step.dispatchEvent(new (elements.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  elements.stepPrev.addEventListener('click', () => nudgeStep(-1))
  elements.stepNext.addEventListener('click', () => nudgeStep(1))
  bindAutoAdvance(document.getElementById('traj-play'), elements.step, { stepMs: 650, speedSelect: document.getElementById('traj-speed') })
  bindRangeKeys(elements.step)
  // 事件列表是纵向排布的，横向「拖到最近点」没有意义；改成点击任意一行直接跳到那一步。
  elements.events.addEventListener('click', (event) => {
    const item = event.target instanceof Element ? event.target.closest('[data-step]') : null
    if (item === null) return
    nudgeStep(Number(item.dataset.step) - Number(elements.step.value))
  })

  const restored = readStateFromHash(location.hash, { step: { integerRange: [0, Number.MAX_SAFE_INTEGER] }, scenario: { enum: TRAJECTORY_SCENARIOS.map(item => item.id) } })
  if (restored !== null && restored.ok) {
    elements.step.value = String(restored.value.step)
    if (typeof restored.value.scenario === 'string') elements.scenario.value = restored.value.scenario
  }
  writeText(elements.stepOutput, elements.step.value)

  rebuild()

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
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'search-generic',
    explain: {
      'search-generic': '正确。grep 的等待态保持 generic 调用卡——那时还没有任何匹配或路径可展示；search 结果卡要等 tool/result 到来。',
      'search-early': '呈现契约明确排除了这种提前换卡：pending 状态没有 matches 字段可填。',
      'no-call': '等待态也是一张卡：模型发起了调用，UI 必须显示它正在发生。',
    },
  })
}
