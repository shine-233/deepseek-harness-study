/**
 * 瀑布语义阶梯实验室：五级台阶讲清 Cordis waterfall 的 next() 与短路。
 * 台阶解锁与逐帧循环由 study-lab-ladder.js 管，本文件只负责画链路与跑轨迹。
 */
import {
  buildWaterfallTrace,
  evaluateWaterfall,
  WATERFALL_INITIAL_VALUE,
  TRANSFORMS,
} from './waterfall-ladder-model.js'
import {
  installDeclaredIcons, installMotionPauseToggle, installScrollProgress,
  renderRows, replaceList, requireElements, writeText,
} from './study-lab-kit.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { installPredictionGate } from './study-lab-gate.js'
import { installThemeToggle } from './study-lab-theme.js'
import { icon } from './study-lab-icons.js'

const SIM_H = 232
const GATE_W = 76
const GATE_H = 50
const LANE_Y = 128
const DUR = { hop: 620, run: 520, stop: 760, result: 500 }

let uidCounter = 0

function makeChainSim(host, api, opts) {
  const reduced = api.reducedMotion
  const canvas = document.createElement('canvas')
  canvas.className = 'wf-stage'
  // 图形即控制器：画布本身就是播放头，可拖拽、可聚焦、可键盘逐拍。
  canvas.setAttribute('role', 'slider')
  canvas.tabIndex = 0
  canvas.setAttribute('aria-label', '瀑布链播放头：横向拖拽或用 ←/→ 键逐拍查看')
  const controls = document.createElement('div')
  controls.className = 'ladder-sim-controls'
  const caption = document.createElement('p')
  caption.className = 'ladder-caption'
  caption.setAttribute('role', 'status')
  caption.setAttribute('aria-live', 'polite')
  host.append(canvas, controls, caption)

  const uid = 'wf' + String(++uidCounter)
  const inputs = new Map()
  let W = 640
  const ratio = Math.min(2, window.devicePixelRatio || 1)
  const disposables = []
  let dirty = true
  let chain = ['A', 'B', 'C']
  const state = { ball: null, gateValues: new Map(), flashes: new Map(), short: null, result: null }
  // 最近一次派发的轨迹与提示序列：拖拽/键盘按拍回看时从这里重建。
  let lastTrace = null
  let lastCues = null
  const fit = () => {
    W = Math.max(360, host.clientWidth || 640)
    canvas.width = Math.round(W * ratio)
    canvas.height = Math.round(SIM_H * ratio)
    dirty = true
  }
  fit()
  if (typeof ResizeObserver === 'function') {
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)
    disposables.push(() => ro.disconnect())
  } else {
    window.addEventListener('resize', fit)
    disposables.push(() => window.removeEventListener('resize', fit))
  }
  const c2d = canvas.getContext('2d')

  const palette = () => {
    const s = getComputedStyle(canvas)
    return {
      brand: s.getPropertyValue('--brand').trim() || '#3157c8',
      bright: s.getPropertyValue('--brand-bright').trim() || '#466fe0',
      signal: s.getPropertyValue('--signal').trim() || '#d46b3e',
      deny: s.getPropertyValue('--deny').trim() || '#b03040',
      allow: s.getPropertyValue('--allow').trim() || '#0f7a52',
      ink: s.getPropertyValue('--ink').trim() || '#1f2228',
      muted: s.getPropertyValue('--muted').trim() || '#5b5b66',
      line: s.getPropertyValue('--line-strong').trim() || 'rgba(60,60,67,.28)',
    }
  }
  let palCache = ''
  setInterval(() => {
    const sig = getComputedStyle(canvas).getPropertyValue('--brand').trim()
    if (sig !== palCache) { palCache = sig; dirty = true }
  }, 1200)

  let anim = null
  let touched = false

  const positions = () => {
    const order = ['ctx', ...chain, '__result']
    const pad = 56
    const pts = new Map()
    for (const [i, id] of order.entries()) {
      pts.set(id, { x: pad + (i * (W - 2 * pad)) / (order.length - 1), y: LANE_Y })
    }
    return pts
  }

  function buildControls() {
    for (const spec of opts.controls) {
      if (spec.kind === 'button') {
        const b = document.createElement('button')
        b.type = 'button'
        b.className = 'button button-primary'
        writeText(b, spec.label)
        b.addEventListener('click', () => dispatch(false))
        controls.append(b)
        continue
      }
      const label = document.createElement('label')
      const span = document.createElement('span')
      writeText(span, spec.label)
      label.append(span)
      if (spec.kind === 'range') {
        const inp = document.createElement('input')
        inp.type = 'range'
        inp.min = String(spec.min)
        inp.max = String(spec.max)
        inp.step = '1'
        inp.value = String(spec.value ?? WATERFALL_INITIAL_VALUE)
        const out = document.createElement('output')
        writeText(out, inp.value)
        inputs.set(spec.key, () => Number(inp.value))
        inp.addEventListener('input', () => { writeText(out, inp.value); dirty = true })
        label.append(inp, out)
      } else if (spec.kind === 'checkbox') {
        const inp = document.createElement('input')
        inp.type = 'checkbox'
        inp.checked = Boolean(spec.checked)
        inputs.set(spec.key, () => inp.checked)
        inp.addEventListener('change', () => { dirty = true })
        label.append(inp)
      } else if (spec.kind === 'radio') {
        const name = uid + '-' + spec.key
        const wrap = document.createElement('span')
        for (const [value, text] of spec.options) {
          const opt = document.createElement('label')
          const inp = document.createElement('input')
          inp.type = 'radio'
          inp.name = name
          inp.value = value
          inp.checked = value === spec.value
          if (!inputs.has(spec.key)) inputs.set(spec.key, () => {
            const picked = wrap.querySelector('input:checked')
            return picked !== null ? picked.value : spec.value
          })
          inp.addEventListener('change', () => { dirty = true })
          writeText(opt, '')
          opt.append(inp, document.createTextNode(text))
          wrap.append(opt)
        }
        label.append(wrap)
      }
      controls.append(label)
    }
  }
  buildControls()

  const readInputs = () => {
    const snapshot = {}
    for (const [key, get] of inputs) snapshot[key] = get()
    return snapshot
  }
  const say = text => writeText(caption, text)

  const toCues = trace => {
    const cues = []
    for (const step of trace.steps) {
      if (step.phase === 'dispatch') {
        cues.push({ kind: 'hop', from: 'ctx', to: step.to, value: step.value, dur: DUR.hop, cap: `值 ${step.value} 从 ctx 出发 → ${step.to}` })
      } else if (step.phase === 'run') {
        cues.push({ kind: 'run', at: step.at, transform: step.transform, vin: step.valueIn, vout: step.valueOut, dur: DUR.run, cap: `${step.at} 执行（${step.transform}）：${step.valueIn} → ${step.valueOut}` })
      } else if (step.phase === 'delegate') {
        cues.push({ kind: 'hop', from: step.from, to: step.to, value: step.value, dur: DUR.hop, cap: `${step.from} 调 next(${step.value})，交给 ${step.to}` })
      } else {
        cues.push({ kind: 'stop', at: step.at, skipped: step.skipped, value: step.value, dur: DUR.stop, cap: `${step.at} 直接 return，没调 next()：${step.skipped.join('、')} 收不到` })
      }
    }
    cues.push({ kind: 'result', value: trace.result.value, verdict: trace.result.verdict, dur: DUR.result })
    return cues
  }

  const verdictWord = v => (v === 'deny' ? '已拒绝' : v === 'short-circuit' ? '短路收束' : '委派完成')
  const capResult = trace => `合成结果 ${trace.result.value}：${verdictWord(trace.result.verdict)}。`

  function applyEnd(trace) {
    chain = trace.chain
    state.ball = null
    state.flashes.clear()
    state.short = null
    state.gateValues.clear()
    let value = null
    for (const step of trace.steps) {
      if (step.phase === 'run') state.gateValues.set(step.at, step.valueOut)
      if (step.phase === 'short-circuit') state.short = { at: step.at, skipped: step.skipped }
      if (step.phase === 'run') value = step.valueOut
    }
    state.result = { value: trace.result.value, verdict: trace.result.verdict }
    dirty = true
  }

  function dispatch(silent) {
    touched = true
    const trace = opts.trace(readInputs())
    lastTrace = trace
    lastCues = toCues(trace)
    canvas.setAttribute('aria-valuemax', String(lastCues.length))
    if (reduced) {
      applyEnd(trace)
      say(capResult(trace))
      opts.onFinish(trace, { silent })
      return
    }
    anim = { cues: lastCues, i: 0, acc: 0, last: 0, started: false, trace, silent }
    dirty = true
  }

  function advance(now) {
    const a = anim
    if (a.last === 0) a.last = now
    a.acc += Math.min(50, now - a.last)
    a.last = now
    const cue = a.cues[a.i]
    const pts = positions()
    if (!a.started) {
      a.started = true
      a.ballStartX = state.ball !== null ? state.ball.x : pts.get('ctx').x
      if (cue.kind === 'run') {
        state.flashes.set(cue.at, performance.now())
        state.gateValues.set(cue.at, cue.vin)
        state.ball = { x: pts.get(cue.at).x, value: cue.vin }
      } else if (cue.kind === 'stop') {
        state.short = { at: cue.at, skipped: cue.skipped.slice() }
        state.ball = { x: pts.get(cue.at).x, value: cue.value }
      }
      if (cue.cap) say(cue.cap)
    }
    if (cue.kind === 'hop') {
      const p = easeInOut(clamp01(a.acc / cue.dur))
      const from = pts.get(cue.from)
      const to = pts.get(cue.to)
      state.ball = { x: from.x + (to.x - from.x) * p, value: cue.value }
    } else if (cue.kind === 'run') {
      if (a.acc >= cue.dur / 2 && !cue.swapped) {
        cue.swapped = true
        state.gateValues.set(cue.at, cue.vout)
        if (state.ball !== null) state.ball.value = cue.vout
      }
    } else if (cue.kind === 'result') {
      const p = easeInOut(clamp01(a.acc / cue.dur))
      const target = pts.get('__result').x
      state.ball = { x: a.ballStartX + (target - a.ballStartX) * p, value: cue.value }
    }
    if (a.acc >= cue.dur) {
      if (cue.kind === 'result') {
        state.result = { value: cue.value, verdict: cue.verdict }
        state.ball = null
        say(capResult(a.trace))
        anim = null
        dirty = true
        opts.onFinish(a.trace, { silent: a.silent })
        return
      }
      a.acc = 0
      a.started = false
      a.i += 1
    }
    dirty = true
  }

  api.everyFrame(now => {
    if (anim !== null) { advance(now); draw(now); return }
    if (dirty) { draw(now); dirty = false }
  })

  // 按拍回看：把世界重建为「前 k 条提示完成之后」的样子。
  // 与动画共享同一份 state/draw，拖到哪一拍，画面就是哪一拍的定格。
  function scrubTo(k) {
    if (lastTrace === null || lastCues === null) return
    touched = true
    anim = null
    const kk = Math.max(0, Math.min(lastCues.length, k))
    const pts = positions()
    const st = { ball: null, gateValues: new Map(), flashes: new Map(), short: null, result: null }
    for (let i = 0; i < kk; i += 1) {
      const cue = lastCues[i]
      if (cue.kind === 'hop') st.ball = { x: pts.get(cue.to).x, value: cue.value }
      else if (cue.kind === 'run') st.gateValues.set(cue.at, cue.vout)
      else if (cue.kind === 'stop') {
        st.short = { at: cue.at, skipped: cue.skipped.slice() }
        st.ball = { x: pts.get(cue.at).x, value: cue.value }
      } else if (cue.kind === 'result') {
        st.result = { value: cue.value, verdict: cue.verdict }
        st.ball = null
      }
    }
    chain = lastTrace.chain.slice()
    state.ball = st.ball
    state.gateValues = st.gateValues
    state.flashes = st.flashes
    state.short = st.short
    state.result = st.result
    say(kk === 0 ? '起点：值还在 ctx，尚未派发。' : (lastCues[kk - 1].cap ?? capResult(lastTrace)))
    canvas.setAttribute('aria-valuenow', String(kk))
    dirty = true
  }

  let scrubbingWf = false
  const cueFromClientX = clientX => {
    if (typeof canvas.getBoundingClientRect !== 'function') return null
    const rect = canvas.getBoundingClientRect()
    if (!(rect.width > 0)) return null
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return Math.round(frac * lastCues.length)
  }
  canvas.addEventListener('pointerdown', event => {
    if (lastCues === null) return
    scrubbingWf = true
    canvas.classList.add('is-scrubbing')
    try { if (typeof canvas.setPointerCapture === 'function') canvas.setPointerCapture(event.pointerId) } catch { /* 捕获失败不影响拖拽本身 */ }
    const k = typeof event.clientX === 'number' ? cueFromClientX(event.clientX) : null
    if (k !== null) scrubTo(k)
  })
  canvas.addEventListener('pointermove', event => {
    if (!scrubbingWf || typeof event.clientX !== 'number') return
    const k = cueFromClientX(event.clientX)
    if (k !== null) scrubTo(k)
  })
  const endScrubWf = () => {
    scrubbingWf = false
    canvas.classList.remove('is-scrubbing')
  }
  canvas.addEventListener('pointerup', endScrubWf)
  canvas.addEventListener('pointercancel', endScrubWf)

  canvas.addEventListener('keydown', event => {
    if (lastCues === null) return
    const actions = { ArrowLeft: (Number(canvas.getAttribute('aria-valuenow') ?? 0) || 0) - 1, ArrowRight: (Number(canvas.getAttribute('aria-valuenow') ?? 0) || 0) + 1, Home: 0, End: lastCues.length }
    const next = actions[event.key]
    if (next === undefined) return
    event.preventDefault()
    scrubTo(next)
  })

  function draw(now) {
    const ctx = c2d
    const pal = palette()
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.clearRect(0, 0, W, SIM_H)
    const pts = positions()
    const order = ['ctx', ...chain, '__result']
    ctx.strokeStyle = pal.line
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pts.get('ctx').x + 18, LANE_Y)
    ctx.lineTo(pts.get('__result').x - 26, LANE_Y)
    ctx.stroke()

    for (let k = 0; k < order.length - 1; k += 1) {
      const target = order[k + 1]
      const skippedTarget = state.short !== null && state.short.skipped.includes(target)
      ctx.beginPath()
      ctx.setLineDash(skippedTarget ? [6, 6] : [])
      ctx.strokeStyle = skippedTarget ? pal.deny : pal.line
      ctx.lineWidth = skippedTarget ? 1.5 : 1
      ctx.moveTo(pts.get(order[k]).x + (order[k] === 'ctx' ? 18 : GATE_W / 2), LANE_Y)
      ctx.lineTo(pts.get(target).x - (target === '__result' ? 26 : GATE_W / 2), LANE_Y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    drawNode(ctx, pal, 'ctx', pts.get('ctx'))
    for (const id of chain) drawGate(ctx, pal, id, pts.get(id))
    const res = pts.get('__result')
    drawResult(ctx, pal, res)

    if (state.short !== null) {
      const b = pts.get(state.short.at)
      const x = b.x + GATE_W / 2 + 14
      ctx.strokeStyle = pal.deny
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(x - 6, LANE_Y - 6); ctx.lineTo(x + 6, LANE_Y + 6)
      ctx.moveTo(x + 6, LANE_Y - 6); ctx.lineTo(x - 6, LANE_Y + 6)
      ctx.stroke()
    }

    for (const [id, start] of state.flashes.entries()) {
      const age = now - start
      if (age > 450) { state.flashes.delete(id); continue }
      const p = age / 450
      const g = pts.get(id)
      ctx.strokeStyle = pal.bright
      ctx.globalAlpha = (1 - p) * 0.8
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(g.x, LANE_Y, 30 + p * 16, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    const ball = state.ball
    if (ball !== null) {
      ctx.fillStyle = pal.brand
      ctx.beginPath()
      ctx.arc(ball.x, LANE_Y, 11, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = '700 11px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(ball.value), ball.x, LANE_Y)
    }
  }

  function drawNode(ctx, pal, id, pt) {
    ctx.strokeStyle = pal.ink
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(pt.x, LANE_Y, 14, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = pal.muted
    ctx.font = '600 11px ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.fillText(id, pt.x, LANE_Y + 28)
  }

  function drawGate(ctx, pal, id, pt) {
    const skipped = state.short !== null && state.short.skipped.includes(id)
    ctx.globalAlpha = skipped ? 0.38 : 1
    ctx.strokeStyle = pal.line
    ctx.fillStyle = 'transparent'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    roundedRect(ctx, pt.x - GATE_W / 2, LANE_Y - GATE_H / 2, GATE_W, GATE_H, 10)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = pal.ink
    ctx.font = '700 19px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(id, pt.x, LANE_Y - 6)
    const display = state.gateValues.get(id)
    if (display !== undefined) {
      ctx.font = '700 12px system-ui, sans-serif'
      ctx.fillStyle = pal.allow
      ctx.fillText(String(display), pt.x, LANE_Y + 12)
    }
    ctx.font = '500 11px system-ui, sans-serif'
    ctx.fillStyle = skipped ? pal.deny : pal.muted
    ctx.fillText(skipped ? '未收到' : TRANSFORMS[id].label, pt.x, LANE_Y + GATE_H / 2 + 14)
    ctx.globalAlpha = 1
  }

  function drawResult(ctx, pal, pt) {
    const r = state.result
    ctx.setLineDash(r === null ? [4, 4] : [])
    ctx.strokeStyle = r === null ? pal.muted : r.verdict === 'deny' ? pal.deny : r.verdict === 'short-circuit' ? pal.signal : pal.allow
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(pt.x, LANE_Y, 22, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    if (r !== null) {
      ctx.fillStyle = ctx.strokeStyle
      ctx.font = '700 14px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(r.value), pt.x, LANE_Y)
      ctx.font = '500 11px system-ui, sans-serif'
      ctx.fillText(verdictWord(r.verdict), pt.x, LANE_Y + 34)
    } else {
      ctx.fillStyle = pal.muted
      ctx.font = '700 13px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('—', pt.x, LANE_Y)
      ctx.font = '500 11px system-ui, sans-serif'
      ctx.fillText('合成结果', pt.x, LANE_Y + 34)
    }
  }

  const autoplay = setTimeout(() => { if (!touched) dispatch(true) }, 850)

  return {
    dispatch,
    writeHint: hint => say(hint),
    dispose() {
      clearTimeout(autoplay)
      for (const off of disposables) off()
    },
  }
}

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp01 = t => Math.max(0, Math.min(1, t))

function roundedRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

const RUNG_DEFS = [
  {
    title: '一个事件，一个监听器',
    text: 'ctx.waterfall 派发的值从 ctx 出发，到达第一个监听器。点「派发一次」，看信号走完这一段。此时还没有返回值的概念，只有到达。',
    controls: [{ kind: 'button', label: '派发一次' }],
    trace: () => buildWaterfallTrace({ scenario: 'single' }),
  },
  {
    title: '两个监听器，按注册顺序',
    text: '同一事件挂两个监听器时，执行顺序就是注册顺序：信号先 A 后 B，谁先注册谁先收到。顺序错了，包装就会套反。',
    controls: [{ kind: 'button', label: '派发一次' }],
    trace: () => buildWaterfallTrace({ scenario: 'order' }),
  },
  {
    title: 'waterfall：next() 把值传下去',
    text: '瀑布里每个监听器拿到的是上一步的返回值。A 把值翻倍再 next(value)，B 加十再交出去，C 原样放行——拖动初始值再派发，看数值一路变化。',
    controls: [
      { kind: 'range', key: 'initialValue', min: 1, max: 9, value: 3, label: '初始值' },
      { kind: 'button', label: '派发' },
    ],
    trace: input => buildWaterfallTrace({ scenario: 'compose', initialValue: input.initialValue }),
  },
  {
    title: 'return 而不 next()：链条在这里结束',
    text: 'B 不调 next() 直接 return：链条在 B 结束，C 永远收不到，合成结果就是 B 的返回值。勾选开关让 B 恢复委托，把两种结局各派发一次。',
    controls: [
      { kind: 'checkbox', key: 'bNext', checked: false, label: 'B 调用 next() 委托给 C' },
      { kind: 'button', label: '派发' },
    ],
    trace: input => buildWaterfallTrace({ scenario: 'shortcircuit', bDelegates: input.bNext }),
  },
  {
    title: '策略官可以短路，记录员必须委托',
    text: '单决策事件里短路是设计：策略官拥有决定权，拒绝时不委托；记录员只做注释，必须调用 next()。两个角色各派发一次，两种结局都合法。',
    controls: [
      { kind: 'radio', key: 'role', value: 'annotator', options: [['annotator', '记录员（必须委托）'], ['policy', '策略官（可以拒绝）']] },
      { kind: 'button', label: '派发' },
    ],
    trace: input => buildWaterfallTrace({ scenario: 'roles', role: input.role }),
  },
]

const DEFAULT_TRACES = [
  ['一', () => buildWaterfallTrace({ scenario: 'single' })],
  ['二', () => buildWaterfallTrace({ scenario: 'order' })],
  ['三', () => buildWaterfallTrace({ scenario: 'compose', initialValue: WATERFALL_INITIAL_VALUE })],
  ['四', () => buildWaterfallTrace({ scenario: 'shortcircuit', bDelegates: false })],
  ['五', () => buildWaterfallTrace({ scenario: 'roles', role: 'policy' })],
]

const PHASE_LABEL = { dispatch: '派发', run: '执行', delegate: '委托 next()', 'short-circuit': '短路' }

function traceRows(tier, trace) {
  return trace.steps.map(step => {
    if (step.phase === 'dispatch') return { key: tier + '-d', state: 'plain', cells: [tier, '派发', `ctx→${step.to}`, String(step.value), ''] }
    if (step.phase === 'run') return { key: tier + '-r' + step.at, state: 'ok', cells: [tier, '执行', '@' + step.at, `${step.valueIn}→${step.valueOut}`, step.transform] }
    if (step.phase === 'delegate') return { key: tier + '-g' + step.from, state: 'ok', cells: [tier, '委托 next()', `${step.from}→${step.to}`, String(step.value), ''] }
    return { key: tier + '-s', state: 'fail', cells: [tier, '短路', `在${step.at}，跳过${step.skipped.join('、')}`, String(step.value), ''] }
  })
}

function initializePage() {
  const els = {
    root: document.querySelector('#ladder-root'),
    gateForm: document.querySelector('#prediction-gate'),
    gated: document.querySelector('#gated-controls'),
    gateFeedback: document.querySelector('#gate-feedback'),
    stepsBody: document.querySelector('#wf-steps-body'),
    oracleList: document.querySelector('#oracle-list'),
    oracleBadge: document.querySelector('#wf-oracle-badge'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    motion: document.querySelector('#motion-toggle'),
    theme: document.querySelector('#theme-toggle'),
  }
  if (!requireElements(els)) return

  const traces = DEFAULT_TRACES.map(([tier, make]) => ({ tier, trace: make() }))
  renderRows(els.stepsBody, traces.flatMap(({ tier, trace }) => traceRows(tier, trace)))

  const checks = []
  let allOk = true
  for (const { tier, trace } of traces) {
    const verdict = evaluateWaterfall(trace)
    allOk = allOk && verdict.ok
    for (const check of verdict.checks) checks.push({ ...check, name: `${tier}·${check.name}` })
  }
  els.oracleList.replaceChildren()
  for (const check of checks) {
    const item = document.createElement('li')
    item.dataset.pass = String(check.pass)
    const title = document.createElement('strong')
    const detail = document.createElement('span')
    writeText(title, check.name)
    writeText(detail, check.detail)
    item.append(title, detail)
    els.oracleList.append(item)
  }
  writeText(els.oracleBadge, allOk ? '通过' : '未通过')
  els.oracleBadge.dataset.pass = String(allOk)

  replaceList(els.canProve, [
    '注册顺序、next() 传值、短路跳尾、记录员必委托——每次派发都由 evaluateWaterfall 对轨迹独立重算。',
    '五种结局出自同一个纯函数模型；视图只负责把它画出来，不另藏逻辑。',
  ])
  replaceList(els.cannotProve, [
    '真实宿主里 Cordis Fiber 的行为——本页不启动 Fiber。',
    '生产事件的真实参数与负载——示例值是最小教学设定。',
  ])

  const trackers = { four: new Set(), five: new Set() }
  const rungs = RUNG_DEFS.map((def, index) => ({
    id: 'rung-' + String(index + 1),
    title: def.title,
    text: def.text,
    build(host, api) {
      let sim = null
      sim = makeChainSim(host, api, {
        controls: def.controls,
        trace: def.trace,
        onFinish: (trace, { silent }) => {
          if (silent) return
          if (index <= 2) { api.engage(); return }
          if (index === 3) {
            trackers.four.add(String(trace.result.bShortCircuits))
            if (trackers.four.size < 2) sim.writeHint('把开关切到另一侧再派发一次，对比两种结局。')
            else api.engage()
          } else {
            trackers.five.add(String(trace.result.role))
            if (trackers.five.size < 2) sim.writeHint('换另一个角色再派发一次。')
            else api.engage()
          }
        },
      })
      return sim
    },
  }))

  createConceptLadder(els.root, { storageKey: 'waterfall-ladder', rungs })

  installPredictionGate({
    form: els.gateForm,
    locked: els.gated,
    feedback: els.gateFeedback,
    correct: 'skipped',
    explain: {
      'still-runs': 'C 会照常执行的前提是 B 调了 next()；不委托的 return 把链条在 B 处收束，第四级台阶会演示这一幕。',
      skipped: '正确。return 而不 next() 就是短路：尾部监听器一次都不执行，B 的返回值成为合成结果。',
      'whole-fails': '短路不是错误——它是 waterfall 的合法语义，派发正常结束，只是 C 没有参与。',
    },
    hint: '线索：第五级台阶里「记录员必须委托」的反面是什么。',
  })

  installDeclaredIcons()
  installScrollProgress()
  installMotionPauseToggle(els.motion)
  installThemeToggle(els.theme, n => icon(n, 15))
}

if (typeof document !== 'undefined') initializePage()
