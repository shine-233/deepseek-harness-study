import { buildMcpModel, evaluateMcpOracle, MCP_LIMITS } from './mcp-model.js'
import { makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  serverDown: { boolean: true },
  reconnect: { boolean: true },
  maxAttempts: { integerRange: [MCP_LIMITS.maxAttempts.min, MCP_LIMITS.maxAttempts.max] },
  initialDelayMs: { integerRange: [MCP_LIMITS.initialDelayMs.min, MCP_LIMITS.initialDelayMs.max] },
  action: { enum: ['connect-list', 'call-tool', 'dispose'] },
  callFails: { boolean: true },
  hmrSwap: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#mcp-form'),
    action: document.querySelector('#mc-action'),
    delay: document.querySelector('#mc-delay'),
    delayOut: document.querySelector('#mc-delay-output'),
    attempts: document.querySelector('#mc-attempts'),
    attemptsOut: document.querySelector('#mc-attempts-output'),
    down: document.querySelector('#mc-down'),
    reconnect: document.querySelector('#mc-reconnect'),
    fail: document.querySelector('#mc-fail'),
    hmr: document.querySelector('#mc-hmr'),
    feedback: document.querySelector('#mcp-feedback'),
    plot: document.querySelector('#mc-plot'),
    note: document.querySelector('#mc-note'),
    chips: document.querySelector('#mc-tools'),
    shape: document.querySelector('#metric-shape'),
    mConnected: document.querySelector('#metric-connected'),
    mTools: document.querySelector('#metric-tools'),
    mGaveUp: document.querySelector('#metric-gaveup'),
    mNs: document.querySelector('#metric-ns'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        serverDown: el.down.checked,
        reconnect: el.reconnect.checked,
        maxAttempts: Number(el.attempts.value),
        initialDelayMs: Number(el.delay.value),
        action: el.action.value,
        callFails: el.fail.checked,
        hmrSwap: el.hmr.checked,
      }, STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  // 重连时间线：每格宽度按延迟比例；封顶之后格子等宽，翻倍关系一眼可见。
  function renderBackoff(model, target) {
    target.replaceChildren()
    const retries = model.steps.filter(s => s.phase === 'retry')
    if (retries.length === 0) {
      const ok = svgElement('p', { class: 'mc-ok' }, '服务器在线：没有重连发生。')
      target.append(ok)
      return
    }
    const maxDelay = Math.max(...retries.map(s => s.delayMs))
    const svg = svgElement('svg', {
      viewBox: `0 0 ${Math.max(900, retries.length * 130 + 60)} ${120}`,
      role: 'img', 'aria-labelledby': 'mc-svg-title mc-svg-desc',
    })
    svg.append(svgElement('title', { id: 'mc-svg-title' }, '重连退避时间线'))
    svg.append(svgElement('desc', { id: 'mc-svg-desc' },
      `${retries.length} 次尝试，延迟从 ${retries[0].delayMs}ms 到 ${retries.at(-1).delayMs}ms。`))
    retries.forEach((step, i) => {
      const widthRatio = step.delayMs / maxDelay
      const barW = 40 + Math.round(widthRatio * 90)
      const x = 30 + i * (barW + 24)
      const bar = svgElement('rect', {
        x, y: 34, width: barW, height: 34, rx: 5,
        class: i === retries.length - 1 ? 'mc-bar is-final' : 'mc-bar',
        'data-reveal': '',
      })
      bar.append(svgElement('title', {}, `第 ${i + 1} 次尝试：失败后等 ${step.delayMs}ms${i === retries.length - 1 ? '（预算耗尽）' : ''}`))
      svg.append(
        bar,
        svgElement('text', { x: x + barW / 2, y: 26, class: 'axis', 'text-anchor': 'middle' }, String(step.delayMs) + 'ms'),
        svgElement('text', { x: x + barW / 2, y: 92, class: 'axis', 'text-anchor': 'middle' }, '#' + String(i + 1)),
      )
    })
    target.append(svg)
    revealOnScroll(target)
  }

  function renderChips(model) {
    el.chips.replaceChildren()
    if (model.observations.visibleTools.length === 0) {
      const none = svgElement('span', { class: 'mc-chip is-none' },
        model.observations.namespaceReleased ? '命名空间已释放——没有任何 mcp__ 工具可见' : '没有工具可见（服务器未连上）')
      el.chips.append(none)
      return
    }
    for (const name of model.observations.visibleTools) {
      el.chips.append(svgElement('code', { class: 'mc-chip' }, name))
    }
  }

  function rebuild() {
    try {
      const model = buildMcpModel({
        serverDown: el.down.checked,
        reconnect: el.reconnect.checked,
        maxAttempts: Number(el.attempts.value),
        initialDelayMs: Number(el.delay.value),
        action: el.action.value,
        callFails: el.fail.checked,
        hmrSwap: el.hmr.checked,
      })
      const verdict = evaluateMcpOracle(model)
      renderBackoff(model, el.plot)
      renderChips(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.delayOut, String(model.input.initialDelayMs))
      writeText(el.attemptsOut, String(model.input.maxAttempts))
      writeText(el.shape, model.observations.forkShape || '已连接')
      writeText(el.mConnected, model.observations.connected ? '在线' : '离线/放弃')
      writeText(el.mTools, String(model.observations.visibleTools.length))
      writeText(el.mGaveUp, model.observations.gaveUpAfter > 0 ? '第 ' + String(model.observations.gaveUpAfter) + ' 次' : '—')
      writeText(el.mNs, model.observations.namespaceReleased ? '已释放' : '持有中')
      fb(model.observations.connected
        ? '已连接：限定名工具对模型可见。'
        : '本次加载放弃：模型看不到这台服务器的任何工具。', model.observations.connected ? 'success' : 'error')
      persistState()
    } catch (e) {
      console.error('[mcp]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.action, el.delay, el.attempts, el.down, el.reconnect, el.fail, el.hmr]) {
    c.addEventListener('input', rebuild)
    c.addEventListener('change', rebuild)
  }
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.down.checked = restored.value.serverDown
    el.reconnect.checked = restored.value.reconnect
    el.attempts.value = String(restored.value.maxAttempts)
    el.delay.value = String(restored.value.initialDelayMs)
    el.action.value = restored.value.action
    el.fail.checked = restored.value.callFails
    el.hmr.checked = restored.value.hmrSwap
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'doubling',
    explain: {
      doubling: 'MC_BACKOFF_DOUBLING 校验钉住了它：首值取 initialDelayMs，其后每次翻倍，封顶之前一直增长。',
      linear: '那是固定间隔重试——上游的策略是指数退避，避免把刚崩溃的服务器立刻再打一遍。',
      'capped-first': '封顶只限制上界：序列仍从 initialDelayMs 起步。',
    },
    hint: '线索：为什么默认首次延迟只有 500ms，而不是直接等最久？',
  })
}
