import { buildAcpModel, evaluateAcpOracle, ACP_CANCEL_POINTS, ACP_ENDINGS, STOP_REASON_RULES } from './acp-lab-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements, svgElement,
  writeText, installDeclaredIcons, installScrollProgress, installInputReset,
  bindAutoAdvance, bindRangeKeys, bindPlotScrub } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  chunks: { min: 1, max: 8 },
  cancelAt: { enum: ACP_CANCEL_POINTS.map(point => point.id) },
  ending: { enum: ACP_ENDINGS.map(item => item.id) },
}

const LANES = [
  { id: 'client', x: 110, label: '自动化客户端' },
  { id: 'bridge', x: 450, label: 'ACP 桥' },
  { id: 'agent', x: 790, label: 'DSH Agent' },
]

function laneX(dir) {
  if (dir === 'c2b') return [LANES[0].x + 40, LANES[1].x - 40]
  if (dir === 'b2c') return [LANES[1].x - 40, LANES[0].x + 40]
  if (dir === 'b2a') return [LANES[1].x + 40, LANES[2].x - 40]
  return [LANES[2].x - 40, LANES[1].x + 40]
}

function initializePage() {
  const el = {
    form: document.querySelector('#acp-form'),
    chunks: document.querySelector('#acp-chunks'),
    chunksOut: document.querySelector('#acp-chunks-out'),
    cancelAt: document.querySelector('#acp-cancel'),
    ending: document.querySelector('#acp-ending'),
    feedback: document.querySelector('#acp-feedback'),
    step: document.querySelector('#acp-step'),
    caption: document.querySelector('#acp-step-caption'),
    plot: document.querySelector('#acp-plot'),
    chartNote: document.querySelector('#acp-note'),
    log: document.querySelector('#acp-log'),
    mFrames: document.querySelector('#metric-frames'),
    mNotes: document.querySelector('#metric-notes'),
    mStop: document.querySelector('#metric-stop'),
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
        chunks: el.chunks.value,
        cancelAt: el.cancelAt.value,
        ending: el.ending.value,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function readInputs() {
    return {
      chunks: Number.parseInt(el.chunks.value, 10),
      cancelAt: el.cancelAt.value,
      ending: el.ending.value,
    }
  }

  function renderFrame(model, index) {
    const frame = model.frames[index]
    const rowH = 54
    const width = 900
    const height = model.frames.length * rowH + 70
    const svg = svgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      'aria-labelledby': 'acp-svg-title acp-svg-desc',
    })
    svg.append(svgElement('title', { id: 'acp-svg-title' }, '客户端、ACP 桥与 Agent 三条生命线之间的消息序列'))
    svg.append(svgElement('desc', { id: 'acp-svg-desc' }, `共 ${String(model.frames.length)} 帧，当前展示第 ${String(index + 1)} 帧：${frame.label}。`))
    for (const lane of LANES) {
      svg.append(
        svgElement('text', { x: lane.x, y: 24, class: 'axis', 'text-anchor': 'middle' }, lane.label),
        svgElement('line', { x1: lane.x, y1: 34, x2: lane.x, y2: height - 14, class: 'lifeline' }),
      )
    }
    for (let i = 0; i <= index; i += 1) {
      const item = model.frames[i]
      const y = 56 + i * rowH
      if (item.dir !== null) {
        const [x1, x2] = laneX(item.dir)
        const cls = item.kind === 'note' ? 'msg is-note' : item.kind === 'wire' ? 'msg' : 'msg is-internal'
        const arrow = svgElement('path', { d: `M ${x1} ${y} L ${x2} ${y}`, class: i === index ? `${cls} is-live` : cls })
        arrow.append(svgElement('title', {}, `${item.label}：${item.detail}`))
        svg.append(arrow)
        svg.append(svgElement('text', {
          x: (x1 + x2) / 2, y: y - 7, class: 'axis msg-label', 'text-anchor': 'middle',
        }, item.lane === 'update' ? 'session/update' : item.label.split(' ·')[0]))
      } else {
        svg.append(svgElement('text', {
          x: width / 2, y, class: 'phase-label', 'text-anchor': 'middle',
        }, `【${item.label}】`))
      }
    }
    el.plot.replaceChildren(svg)
  }

  function renderLog(model, upto) {
    const rows = model.frames.slice(0, upto + 1).map((frame, i) => {
      const active = i === upto ? ' is-current' : ''
      const kindLabel = { wire: '线上', note: '通知', internal: '内部', phase: '阶段', settle: '结算' }[frame.kind] ?? ''
      return `<li data-index="${String(i)}" class="log-row${active}"><span class="log-kind">${kindLabel}</span><strong>${frame.label}</strong><small>${frame.detail}</small></li>`
    })
    el.log.replaceChildren()
    el.log.innerHTML = rows.join('')
    const current = el.log.querySelector('.is-current')
    if (current !== null) current.scrollIntoView({ block: 'nearest' })
  }

  let latest = null

  function rebuild() {
    try {
      const model = buildAcpModel(readInputs())
      latest = model
      const verdict = evaluateAcpOracle(model)
      el.step.max = String(model.frames.length - 1)
      if (Number.parseInt(el.step.value, 10) > model.frames.length - 1) el.step.value = String(model.frames.length - 1)
      const at = Number.parseInt(el.step.value, 10)
      renderFrame(model, at)
      renderLog(model, at)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      const current = model.frames[at]
      const seenNotes = model.frames.slice(0, at + 1).filter(frame => frame.kind === 'note').length
      writeText(el.chunksOut, `${el.chunks.value} 块`)
      writeText(el.mFrames, String(at + 1))
      writeText(el.mNotes, String(seenNotes))
      writeText(el.mStop, model.observations.stopReason)
      writeText(el.caption, `${current.label} —— ${current.detail}`)
      writeText(el.chartNote, `第 ${String(at + 1)}/${String(model.frames.length)} 帧。点右侧日志任意一行跳到那一拍。`)
      fb(current.detail, 'success')
      persistState()
    } catch (error) {
      console.error('[acp]', error)
      fb(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  el.chunks.addEventListener('input', () => { el.step.value = '0'; rebuild() })
  el.cancelAt.addEventListener('change', () => { el.step.value = '0'; rebuild() })
  el.ending.addEventListener('change', () => { el.step.value = '0'; rebuild() })
  el.step.addEventListener('input', rebuild)
  bindRangeKeys(el.step)
  bindAutoAdvance(document.getElementById('acp-play'), el.step, { stepMs: 720, speedSelect: document.getElementById('acp-speed') })
  bindPlotScrub(el.plot, el.step)
  el.log.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    el.step.value = item.dataset.index
    el.step.dispatchEvent(new Event('input', { bubbles: true }))
  })
  installInputReset(el.resetInputs, el.form, { onReset: () => { el.step.value = '0'; rebuild() } })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.chunks.value = String(restored.value.chunks)
    el.cancelAt.value = restored.value.cancelAt
    el.ending.value = restored.value.ending
  }
  el.step.value = '0'
  rebuild()

  // 词表速查表由模型规则渲染，避免正文与模型两份事实。
  const table = document.querySelector('#acp-stoprules')
  if (table !== null && latest !== null) {
    const body = table.querySelector('tbody')
    if (body !== null) {
      body.innerHTML = STOP_REASON_RULES.map(rule => {
        const endingMeta = ACP_ENDINGS.find(item => item.id === rule.ending)
        return `<tr><td>${endingMeta?.label ?? rule.ending}</td><td><code>${rule.stopReason}</code></td><td>${rule.why}</td></tr>`
      }).join('')
    }
  }
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 模型产出 frames（tick/kind/lane/label/detail）：收窄成轨迹引擎的四元组；
    // phase 帧没有泳道，统一落进「桥内」。
    const trace = input => buildAcpModel(input).frames.map(frame => ({
      lane: frame.lane ?? '桥内',
      phase: frame.kind,
      detail: `${frame.label}：${frame.detail}`,
      index: frame.tick,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'acp-ladder',
      rungs: replayRungs([
        {
          title: '一条 prompt 的正常旅程',
          text: '客户端请求占用本会话唯一的 prompt 槽，消息经准入进入 Agent 的持久 inbox，认领后流式运行，静止后结算并回应。每一帧都按 tick 顺序发生。',
          traces: [{ id: 'happy', label: '正常完成', steps: trace({ chunks: 3, cancelAt: 'off', ending: 'completed' }) }],
        },
        {
          title: '三个取消窗口，三种效果',
          text: '取消越晚，语义越不同：准入中获胜则消息根本不入队；入队未认领时取消要走 agent.cancel({kind:"user"})；流式中途取消把当前 Turn 停下来。三个窗口的最终 stopReason 都是 cancelled。',
          traces: [
            { id: 'admission', label: '准入中', steps: trace({ chunks: 2, cancelAt: 'admission', ending: 'completed' }), focusPhases: ['settle'] },
            { id: 'queued', label: '已入队', steps: trace({ chunks: 2, cancelAt: 'queued', ending: 'completed' }), focusPhases: ['settle'] },
            { id: 'claimed', label: '流式中', steps: trace({ chunks: 2, cancelAt: 'claimed', ending: 'completed' }), focusPhases: ['settle'] },
          ],
        },
        {
          title: '五种收尾，一个 prompt 级词表',
          text: 'Turn 级的结束方式映射到桥的固定词表后才发给客户端。token 上限在结算处被改写成 end_turn——cancelled 是保留字，只留给显式取消与连接处置。',
          traces: [
            { id: 'completed', label: '正常完成', steps: trace({ chunks: 2, cancelAt: 'off', ending: 'completed' }) },
            { id: 'max-tokens', label: 'token 上限', steps: trace({ chunks: 8, cancelAt: 'off', ending: 'max-tokens' }), focusPhases: ['settle', 'wire'] },
            { id: 'aborted', label: 'hook 中止', steps: trace({ chunks: 2, cancelAt: 'off', ending: 'aborted' }), focusPhases: ['settle', 'wire'] },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'end-turn',
    explain: {
      'end-turn': 'settleAfterQuiescence 在 prompt 级拦截了它：token 上限不是停止原因，普通静止报告 end_turn（index.ts:204-206）。',
      'max-tokens': 'codec.ts 里确实有这条映射，但桥在结算处把它改写成了 end_turn——prompt 级词表比 Turn 级窄。',
      cancelled: 'cancelled 只保留给显式 session/cancel 与连接处置；自然结局拿不到它。',
    },
    hint: '线索：注释说「cancelled 是保留字」。谁还配得上它？',
  })
}
