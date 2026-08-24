import { buildWireModel, evaluateWireOracle, WIRE_SCRIPTS } from './wire-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  scriptId: { enum: WIRE_SCRIPTS.map(script => script.id) },
}

function initializePage() {
  const el = {
    form: document.querySelector('#wire-form'),
    script: document.querySelector('#wp-script'),
    note: document.querySelector('#wp-note'),
    feedback: document.querySelector('#wire-feedback'),
    plot: document.querySelector('#wp-plot'), chartNote: document.querySelector('#wp-note'),
    shape: document.querySelector('#metric-shape'),
    mReq: document.querySelector('#metric-req'), mRes: document.querySelector('#metric-res'),
    mNote: document.querySelector('#metric-note'),
    oracleBadge: document.querySelector('#metric-oracle'), oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'), cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, { scriptId: el.script.value }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function renderSequence(model) {
    el.plot.replaceChildren()
    const rowH = 46
    const svg = svgElement('svg', { viewBox: `0 0 ${900} ${model.steps.length * rowH + 40}`,
      role: 'img', 'aria-labelledby': 'wp-svg-title wp-svg-desc' })
    svg.append(svgElement('title', { id: 'wp-svg-title' }, '客户端与服务器之间的消息序列'))
    svg.append(svgElement('desc', { id: 'wp-svg-desc' }, `${model.steps.length} 条消息，方向与类型逐条给出。`))
    const mid = 450
    svg.append(
      svgElement('text', { x: mid / 2, y: 22, class: 'axis', 'text-anchor': 'middle' }, 'SDK 客户端'),
      svgElement('line', { x1: mid / 2, y1: 30, x2: mid / 2, y2: model.steps.length * rowH + 20, class: 'lifeline' }),
      svgElement('text', { x: mid + mid / 2, y: 22, class: 'axis', 'text-anchor': 'middle' }, 'Runtime Server'),
      svgElement('line', { x1: mid + mid / 2, y1: 30, x2: mid + mid / 2, y2: model.steps.length * rowH + 20, class: 'lifeline' }),
    )
    model.steps.forEach((s, i) => {
      const y = 48 + i * rowH
      const toServer = s.lane === 'SDK 客户端' || s.phase === 'out' || s.phase === 'out-note'
        ? true : s.phase === 'in' || s.phase === 'in-note' ? false : i % 2 === 0
      const x1 = toServer ? 120 : mid + 120 - (mid - 120)
      const x2 = toServer ? mid + 120 : 120
      const cls = s.phase === 'error-response' ? 'msg is-error'
        : s.phase.includes('notification') ? 'msg is-note'
        : s.phase === 'note' ? 'msg is-note-line' : 'msg'
      const arrow = svgElement('path', { d: `M ${x1} ${y} L ${x2} ${y}`, class: cls, 'data-reveal': '' })
      arrow.append(svgElement('title', {}, `${s.phase}: ${s.detail}`))
      svg.append(arrow,
        svgElement('text', { x: (x1 + x2) / 2, y: y - 8, class: 'axis msg-label', 'text-anchor': 'middle' },
          String(s.phase)),
      )
    })
    el.plot.append(svg)
    revealOnScroll(el.plot)
  }

  function rebuild() {
    try {
      const model = buildWireModel({ scriptId: el.script.value })
      const verdict = evaluateWireOracle(model)
      renderSequence(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      const scriptMeta = WIRE_SCRIPTS.find(s => s.id === model.input.scriptId)
      writeText(el.note, scriptMeta.description ?? '')
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mReq, String(model.observations.requests))
      writeText(el.mRes, String(model.observations.responses))
      writeText(el.mNote, String(model.observations.notifications))
      fb(model.observations.forkShape, 'success')
      persistState()
    } catch (e) { console.error('[wire]', e); fb(e instanceof Error ? e.message : '输入无效。', 'error') }
  }

  el.script.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) el.script.value = r.value.scriptId
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'reject',
    explain: {
      reject: 'WP_INITIALIZE_FIRST 校验钉住了它：initialize 是能力协商，之前的业务方法没有意义。',
      queue: '排队会掩盖调用方的状态错误；协议选择立刻拒绝并让客户端自己纠正。',
      disconnect: '乱序是带内错误：走 error-response，行传输保持可用。',
    },
    hint: '线索：错误是「协议内的一等公民」——这句话排除了哪个选项？',
  })
}
