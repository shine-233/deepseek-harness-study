import { buildMeterModel, evaluateMeterOracle, METER_LIMITS } from './tokenmeter-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
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

  function renderGauge(model) {
    el.plot.replaceChildren()
    const w = 900
    const pct = model.observations.pressurePct / 100
    const svg = svgElement('svg', { viewBox: `0 0 ${w} ${170}`, role: 'img',
      'aria-labelledby': 'tmk-svg-title tmk-svg-desc' })
    svg.append(svgElement('title', { id: 'tmk-svg-title' }, '上下文压力表'))
    svg.append(svgElement('desc', { id: 'tmk-svg-desc' },
      `总读数 ${model.observations.totalTokens} tokens，窗口 ${model.observations.windowTokens}，压力 ${model.observations.pressurePct}%。`))
    // 窗口轨道
    svg.append(svgElement('rect', { x: 30, y: 30, width: w - 60, height: 40, rx: 8, class: 'tmk-track' }))
    if (model.input.measuredBaseline) {
      const baseW = (model.observations.baselineTokens / model.observations.windowTokens) * (w - 60)
      const deltaW = Math.max((model.observations.surfaceDeltaTokens / model.observations.windowTokens) * (w - 60), 0)
      svg.append(
        svgElement('rect', { x: 30, y: 30, width: Math.min(baseW, w - 60), height: 40, rx: 0, class: 'tmk-base', 'data-reveal': '' }),
        svgElement('rect', { x: 30 + Math.min(baseW, w - 60), y: 30, width: Math.min(deltaW, w - 60 - baseW), height: 40, class: 'tmk-delta', 'data-reveal': '' }),
      )
    } else {
      const totalW = Math.min(pct * (w - 60), w - 60)
      svg.append(svgElement('rect', { x: 30, y: 30, width: totalW, height: 40, class: 'tmk-est', 'data-reveal': '' }))
    }
    // 80% 阈值线
    const thrX = 30 + 0.8 * (w - 60)
    svg.append(svgElement('line', { x1: thrX, y1: 20, x2: thrX, y2: 84, class: 'cap-line' }),
      svgElement('text', { x: thrX + 5, y: 18, class: 'cap-label' }, '80% 提示线'))
    // 双口径说明
    svg.append(svgElement('text', { x: 30, y: 110, class: 'axis' },
      model.input.measuredBaseline
        ? '当前口径 measured：绿色增量只算锚定之后的新增内容。'
        : '当前口径 estimated：整段表面都算增量，基线只剩 header。'))
    svg.append(svgElement('text', { x: 30, y: 138, class: 'axis' },
      `两种口径总数恒等：${String(model.observations.totalTokens)} tokens（切换上方勾选框验证）`))
    el.plot.append(svg)
    revealOnScroll(el.plot)
  }

  function rebuild() {
    try {
      const model = buildMeterModel({
        existingChars: Number(el.existing.value), newChars: Number(el.nw.value),
        windowTokens: Number(el.win.value), measuredBaseline: el.measured.checked,
      })
      const verdict = evaluateMeterOracle(model)
      renderGauge(model)
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
      persistState()
    } catch (e) { console.error('[tokenmeter]', e); fb(e instanceof Error ? e.message : '输入无效。', 'error') }
  }

  for (const c of [el.existing, el.nw, el.win]) c.addEventListener('input', rebuild)
  el.measured.addEventListener('change', rebuild)
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
