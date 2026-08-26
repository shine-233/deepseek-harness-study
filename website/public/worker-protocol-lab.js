/**
 * worker-protocol 实验页的渲染层。模型在 worker-protocol-model.js。
 * 双泳道消息流 + 步进滑杆，读数读的是同一次推演。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  PROTOCOL_SCENARIOS,
  buildProtocolModel,
  evaluateProtocolOracle,
} from './worker-protocol-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const SCENARIO_LABELS = {
  normal: '正常完成（两个子代理顺序执行）',
  'cancel-mid-flight': '中途取消——hooks 抛出、脚本死亡、强制结算',
  'child-start-error': '子代理启动失败——不产生子生命周期事件',
}

const WP_STATE_SCHEMA = {
  scenario: { enum: PROTOCOL_SCENARIOS },
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

function initializePage() {
  const elements = {
    form: document.querySelector('#wp-form'),
    scenario: document.querySelector('#wp-scenario'),
    feedback: document.querySelector('#wp-feedback'),
    timeline: document.querySelector('#wp-timeline'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    total: document.querySelector('#metric-total'),
    rpcs: document.querySelector('#metric-rpcs'),
    results: document.querySelector('#metric-results'),
    handshake: document.querySelector('#metric-handshake'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#wp-step'),
    stepOutput: document.querySelector('#wp-step-output'),
    stepPrev: document.querySelector('#wp-step-prev'),
    stepNext: document.querySelector('#wp-step-next'),
    stepCaption: document.querySelector('#wp-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  for (const s of PROTOCOL_SCENARIOS) {
    const option = document.createElement('option')
    option.value = s
    option.textContent = SCENARIO_LABELS[s]
    elements.scenario.append(option)
  }

  const syncStep = () => {
    if (currentModel === null) return
    const total = currentModel.messages.length
    elements.step.max = String(total - 1)
    if (Number(elements.step.value) > total - 1 || Number(elements.step.value) < 0) {
      elements.step.value = String(total - 1)
    }
    const index = Number(elements.step.value)
    writeText(elements.stepOutput, String(index))
    for (const item of elements.timeline.querySelectorAll('[data-index]')) {
      const at = Number(item.getAttribute('data-index'))
      item.classList.toggle('is-current', at === index)
      item.classList.toggle('is-future', at > index)
    }
    const msg = currentModel.messages[index]
    if (msg !== undefined) {
      writeText(elements.stepCaption, `#${String(index)} ${msg.dir} · ${msg.tag}：${msg.detail}`)
    }
    elements.stepPrev.disabled = index <= 0
    elements.stepNext.disabled = index >= total - 1
  }

  const rebuild = () => {
    try {
      const model = buildProtocolModel({ scenario: elements.scenario.value })
      const verdict = evaluateProtocolOracle(model)
      currentModel = model

      elements.timeline.replaceChildren()
      for (const msg of model.messages) {
        const item = document.createElement('li')
        item.className = 'jb-step wp-msg is-' + (msg.dir === 'host→worker' ? 'host' : 'worker')
        item.setAttribute('data-reveal', '')
        item.dataset.index = String(msg.index)
        const head = document.createElement('div')
        head.className = 'jb-step-head'
        const dir = document.createElement('span')
        dir.className = 'wp-dir'
        writeText(dir, msg.dir === 'host→worker' ? 'Host →' : '→ Worker')
        const tag = document.createElement('code')
        writeText(tag, msg.tag)
        head.append(dir, tag)
        const detail = document.createElement('p')
        detail.className = 'jb-step-detail'
        writeText(detail, msg.detail)
        item.append(head, detail)
        elements.timeline.append(item)
      }
      revealOnScroll(elements.timeline)

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.total, String(model.observations.total))
      writeText(elements.rpcs, `${String(model.observations.childStarts)} → ${String(model.observations.childReplies)}`)
      writeText(elements.results, String(model.observations.results))
      writeText(elements.handshake, model.observations.handshakePresent ? '✓ Ready/Go' : '✕')

      syncStep()
      persistState()
    } catch (error) {
      console.error('[worker-protocol] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        step: Number(elements.step.value),
      }, WP_STATE_SCHEMA))
    } catch { /* 保持安静 */ }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.scenario.addEventListener('change', rebuild)

  elements.step.addEventListener('input', () => {
    syncStep()
    persistState()
  })
  const nudgeStep = delta => {
    elements.step.value = String(Math.min(Number(elements.step.max),
      Math.max(Number(elements.step.min), Number(elements.step.value) + delta)))
    elements.step.dispatchEvent(new Event('input', { bubbles: true }))
  }
  elements.stepPrev.addEventListener('click', () => nudgeStep(-1))
  elements.stepNext.addEventListener('click', () => nudgeStep(1))
  bindRangeKeys(elements.step)
  // 图形即控制器：点时间线的任意一条消息，滑杆直接跳到那一步。
  elements.timeline.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new Event('input', { bubbles: true }))
  })

  elements.step.max = String(Number.MAX_SAFE_INTEGER)

  const restored = readStateFromHash(location.hash, WP_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.step.value = String(restored.value.step)
  }

  rebuild()
  if (Number(elements.step.value) > Number(elements.step.max)) {
    elements.step.value = elements.step.max
    rebuild()
  }

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏链接。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 协议消息天然分两条泳道：方向即泳道，消息标签即相位。
    const toSteps = model => model.messages.map(msg => ({
      lane: msg.dir,
      phase: msg.tag,
      detail: `${msg.tag}：${msg.detail}`,
      index: msg.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'worker-protocol-ladder',
      rungs: replayRungs([
        {
          title: '一次正常往返：Start、Started、Result',
          text: '宿主发 Start，工作线程回 Started，干完活再回 Result。协议就是这条双向消息序列——没有别的魔法。',
          traces: [{ id: 'normal', label: '正常往返', steps: toSteps(buildProtocolModel({ scenario: 'normal' })) }],
        },
        {
          title: '中途取消：取消本身也是一条消息',
          text: '活干到一半被取消时，协议不靠异常逃逸，而是让取消在消息流里留痕。谁在哪一步停下，日志说得清。',
          traces: [{ id: 'cancel', label: '中途取消', steps: toSteps(buildProtocolModel({ scenario: 'cancel-mid-flight' })) }],
        },
        {
          title: '启动失败：ChildStartError 也是回复',
          text: '子线程根本没起来时，回应不是沉默而是一条 ChildStartError。错误被协议化之后，调用方才有可能确定性地结算。',
          traces: [{ id: 'start-error', label: '启动失败', steps: toSteps(buildProtocolModel({ scenario: 'child-start-error' })) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'cancel-hooks-throw',
    explain: {
      'result-normal': '取消后 result 不走正常路径——hooks 开始抛出，脚本死在下一个 await。',
      'hangs-forever': '有界宽限保证不会永远悬挂：引擎强制结算为 cancelled。',
      'cancel-hooks-throw': '正确。Cancel 让 hooks 开始抛出，脚本在下一个 await 处死亡；有界宽限内强制结算为 cancelled。',
    },
  })
}
