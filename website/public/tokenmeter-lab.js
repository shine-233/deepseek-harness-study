import { buildMeterModel, evaluateMeterOracle, buildStreamFrames, METER_LIMITS } from './tokenmeter-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress,
  bindAutoAdvance, bindRangeKeys } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  existingChars: { integerRange: [0, 20000] },
  newChars: { integerRange: [0, 20000] },
  windowTokens: { integerRange: [METER_LIMITS.windowTokens.min, METER_LIMITS.windowTokens.max] },
  measuredBaseline: { boolean: true },
}

const REDUCED_MOTION = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** 数值缓动：让条宽在两次重建之间连续滑动，而不是瞬移；reduced-motion 直落终点。 */
function tweenWidth(element, fromPx, toPx, widthPx) {
  if (REDUCED_MOTION || fromPx === toPx) {
    element.setAttribute('width', String(toPx))
    return () => {}
  }
  const start = performance.now()
  let raf = 0
  const tick = (now) => {
    const t = Math.min(1, (now - start) / 320)
    const eased = 1 - (1 - t) ** 3
    element.setAttribute('width', String(Math.round(fromPx + (toPx - fromPx) * eased)))
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

function initializePage() {
  const el = {
    form: document.querySelector('#meter-form'),
    existing: document.querySelector('#tmk-existing'), existingOut: document.querySelector('#tmk-existing-output'),
    nw: document.querySelector('#tmk-new'), newOut: document.querySelector('#tmk-new-output'),
    win: document.querySelector('#tmk-window'), winOut: document.querySelector('#tmk-window-output'),
    measured: document.querySelector('#tmk-measured'),
    feedback: document.querySelector('#meter-feedback'),
    plot: document.querySelector('#tmk-plot'), note: document.querySelector('#tmk-note'),
    kind: document.querySelector('#metric-kind'), mBase: document.querySelector('#metric-baseline'),
    mDelta: document.querySelector('#metric-delta'), mTotal: document.querySelector('#metric-total'),
    mPressure: document.querySelector('#metric-pressure'),
    oracleBadge: document.querySelector('#metric-oracle'), oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'), cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#tmk-step'),
    caption: document.querySelector('#tmk-step-caption'),
    frames: document.querySelector('#tmk-frames'),
    ledger: document.querySelector('#tmk-ledger'),
    streamBar: document.querySelector('#tmk-stream-bar'),
    streamNote: document.querySelector('#tmk-stream-note'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        existingChars: Number(el.existing.value), newChars: Number(el.nw.value),
        windowTokens: Number(el.win.value), measuredBaseline: el.measured.checked,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  let lastBaseW = 0
  let lastDeltaW = 0

  function renderGauge(model) {
    el.plot.replaceChildren()
    const w = 900
    const svg = svgElement('svg', { viewBox: `0 0 ${w} ${170}`, role: 'img',
      'aria-labelledby': 'tmk-svg-title tmk-svg-desc' })
    svg.append(svgElement('title', { id: 'tmk-svg-title' }, '上下文压力表'))
    svg.append(svgElement('desc', { id: 'tmk-svg-desc' },
      `总读数 ${model.observations.totalTokens} tokens，窗口 ${model.observations.windowTokens}，压力 ${model.observations.pressurePct}%。`))
    svg.append(svgElement('rect', { x: 30, y: 30, width: w - 60, height: 40, rx: 8, class: 'tmk-track' }))
    const scale = model.observations.windowTokens > 0 ? (w - 60) / model.observations.windowTokens : 0
    const baseW = Math.min(model.observations.baselineTokens * scale, w - 60)
    const deltaW = Math.max(Math.min((model.observations.baselineTokens + model.observations.surfaceDeltaTokens) * scale, w - 60) - baseW, 0)
    if (model.input.measuredBaseline) {
      const baseRect = svgElement('rect', { x: 30, y: 30, height: 40, class: 'tmk-base', 'data-reveal': '' })
      const deltaRect = svgElement('rect', { x: 30, y: 30, height: 40, class: 'tmk-delta', 'data-reveal': '' })
      svg.append(baseRect, deltaRect)
      tweenWidth(baseRect, lastBaseW, baseW)
      deltaRect.setAttribute('x', String(30 + baseW))
      tweenWidth(deltaRect, lastDeltaW, deltaW)
      lastBaseW = baseW
      lastDeltaW = deltaW
    } else {
      const estRect = svgElement('rect', { x: 30, y: 30, height: 40, class: 'tmk-est', 'data-reveal': '' })
      svg.append(estRect)
      tweenWidth(estRect, lastBaseW + lastDeltaW, baseW + deltaW)
      lastBaseW = 0
      lastDeltaW = baseW + deltaW
    }
    const thrX = 30 + 0.8 * (w - 60)
    svg.append(svgElement('line', { x1: thrX, y1: 20, x2: thrX, y2: 84, class: 'cap-line' }),
      svgElement('text', { x: thrX + 5, y: 18, class: 'cap-label' }, '80% 提示线'))
    svg.append(svgElement('text', { x: 30, y: 110, class: 'axis' },
      model.input.measuredBaseline
        ? '当前口径 measured：绿色增量只算锚定之后的新增内容。'
        : '当前口径 estimated：整段表面都算增量，基线只剩 header。'))
    svg.append(svgElement('text', { x: 30, y: 138, class: 'axis' },
      `两种口径总数恒等：${String(model.observations.totalTokens)} tokens（切换上方勾选框验证）`))
    el.plot.append(svg)
    revealOnScroll(el.plot)
  }

  function renderLedger(model) {
    const rows = [
      `<tr><td>header（系统提示词）</td><td>${model.breakdown.headerFormula}</td><td>${String(model.breakdown.headerTokens)}</td></tr>`,
      ...model.breakdown.rows.map(row => `<tr><td>${row.label}</td><td>${row.formula}</td><td>${String(row.tokens)}</td></tr>`),
    ]
    el.ledger.innerHTML = rows.join('')
  }

  let streamFrames = []
  function renderStreamFrame(at) {
    if (streamFrames.length === 0) return
    const frame = streamFrames[Math.min(at, streamFrames.length - 1)]
    for (const [index, row] of el.frames.querySelectorAll('[data-index]').entries()) {
      row.classList.toggle('is-current', Number(row.dataset.index) === at)
    }
    const current = el.frames.querySelector('.is-current')
    if (current !== null) current.scrollIntoView({ block: 'nearest' })
    writeText(el.caption, `${frame.label} —— ${frame.detail}`)
    const finalTotal = streamFrames.at(-1).totalTokens || 1
    const pct = Math.min(100, (frame.totalTokens / finalTotal) * 100)
    el.streamBar.style.width = `${pct.toFixed(1)}%`
    writeText(el.streamNote, `第 ${String(at + 1)}/${String(streamFrames.length)} 拍 · 读数 ${String(frame.totalTokens)} tokens · 口径 ${frame.baselineKind === 'measured' ? '实测' : '估算'}`)
  }

  function rebuild() {
    try {
      const input = {
        existingChars: Number(el.existing.value), newChars: Number(el.nw.value),
        windowTokens: Number(el.win.value), measuredBaseline: el.measured.checked,
      }
      const model = buildMeterModel(input)
      const verdict = evaluateMeterOracle(model)
      renderGauge(model)
      renderLedger(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.existingOut, String(model.input.existingChars))
      writeText(el.newOut, String(model.input.newChars))
      writeText(el.winOut, String(model.observations.windowTokens))
      writeText(el.kind, model.observations.baselineKind === 'measured' ? '实测（usage）' : '估算（无 usage）')
      writeText(el.mBase, String(model.observations.baselineTokens))
      writeText(el.mDelta, '+' + String(model.observations.surfaceDeltaTokens))
      writeText(el.mTotal, String(model.observations.totalTokens))
      writeText(el.mPressure, String(model.observations.pressurePct) + '%')
      fb(model.observations.forkShape + '；计量器只报数，不截断。',
        model.observations.overThreshold ? 'error' : 'success')

      const stream = buildStreamFrames(input)
      streamFrames = stream.frames
      el.step.max = String(streamFrames.length - 1)
      if (Number.parseInt(el.step.value, 10) > streamFrames.length - 1 || el.step.value === '') el.step.value = String(streamFrames.length - 1)
      const rows = streamFrames.map((frame, index) =>
        `<li data-index="${String(index)}" class="log-row"><span class="log-kind">${String(index + 1)}</span><strong>${frame.label}</strong><small>${frame.detail}</small></li>`)
      el.frames.innerHTML = rows.join('')
      renderStreamFrame(Number.parseInt(el.step.value, 10))
      persistState()
    } catch (e) { console.error('[tokenmeter]', e); fb(e instanceof Error ? e.message : '输入无效。', 'error') }
  }

  for (const c of [el.existing, el.nw, el.win]) c.addEventListener('input', rebuild)
  el.measured.addEventListener('change', rebuild)
  el.step.addEventListener('input', () => { if (streamFrames.length > 0) renderStreamFrame(Number.parseInt(el.step.value, 10)) })
  bindRangeKeys(el.step)
  bindAutoAdvance(document.getElementById('tmk-play'), el.step, { stepMs: 620, speedSelect: document.getElementById('tmk-speed') })
  el.frames.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    el.step.value = item.dataset.index
    el.step.dispatchEvent(new Event('input', { bubbles: true }))
  })
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.existing.value = String(r.value.existingChars); el.nw.value = String(r.value.newChars)
    el.win.value = String(r.value.windowTokens); el.measured.checked = r.value.measuredBaseline
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
    correct: 'same',
    explain: {
      same: 'TM_KINDS_AGREE_ON_TOTAL 校验钉住了它：基线只是归属方式——measured 把已有表面记进基线，estimated 把它记进增量，总账不变。',
      lower: '少的是「实测」这个来源标签，不是总量。',
      zero: '没有 usage 时退化为估算口径，读数依然存在且可用。',
    },
    hint: '线索：切换勾选框前后，盯住「总读数」这一格。',
  })
}
