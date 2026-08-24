/**
 * 循环卫生提醒实验页的渲染层。模型在 guard-loop-model.js。
 */
import {
  makeFeedback,
  pulseSignal, renderBoundary, renderOracle, renderRows,
  requireElements, svgElement, writeText, animateNumber,
  installDeclaredIcons, installScrollProgress, installInputReset,
  bindRangeKeys, bindPlotScrub,
} from './study-lab-kit.js'
import { buildGuardLoopModel, buildKeySandboxModel, evaluateGuardLoopOracle } from './guard-loop-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const SCHEMA = {
  attempts: { integerRange: [1, 12] },
  guard: { enum: ['on', 'off'] },
  resetMode: { enum: ['none', 'user-interjection', 'key-reorder', 'value-change'] },
  // 这里只卡整数下界，越界值在恢复时被拉回当前输入的末步。
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}
const LANES = ['Agent 循环', 'repeat-tool-reminder', '模型上下文']

function renderFlow(model, target, note) {
  const slot = 64, lh = 58, top = 34, left = 110
  const w = Math.max(900, left + model.steps.length * slot + 24)
  const h = top + LANES.length * lh + 42
  const xf = i => left + i * slot + 30
  const yf = l => top + LANES.indexOf(l) * lh + lh / 2

  target.replaceChildren()
  const svg = svgElement('svg', { viewBox: `0 0 ${w} ${h}`, role: 'img', 'aria-labelledby': 'gl-st gl-ds' })
  svg.append(
    svgElement('title', { id: 'gl-st' }, '重复调用与提醒注入的有序步骤'),
    svgElement('desc', { id: 'gl-ds' }, '纵轴是参与方，横轴是步骤序号。信号色圆点是注入的提醒；没有任何一步拦截调用，插话或换值会显式清零链条。'),
  )
  for (const lane of LANES) {
    const y = yf(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: w - 18, y2: y, class: 'grid' }),
    )
  }
  for (const s of model.steps) {
    const cls = ['gl-dot']
    if (s.phase === 'remind') cls.push('is-remind')
    if (s.phase === 'receive') cls.push('is-receive')
    if (s.resets === true) cls.push('is-reset')
    const c = svgElement('circle', { 'data-reveal': '', 'data-step': String(s.index), cx: xf(s.index), cy: yf(s.lane), r: 9, class: cls.join(' ') })
    c.append(svgElement('title', {}, `${s.index} ${s.phase}: ${s.detail}`))
    svg.append(c)
  }
  target.append(svg); revealOnScroll(target)
  writeText(note, `${model.observations.reminderCount} 条提醒注入，全部 ${model.observations.attempts} 次调用照常执行——建议性插件不拦截任何东西。`)
}

function renderSandboxVerdict(model, verdictTarget, canonicalATarget, canonicalBTarget) {
  if (!model.a.ok) {
    writeText(canonicalATarget, model.a.error)
    writeText(canonicalBTarget, model.b.ok ? model.b.canonical : model.b.error)
    verdictTarget.dataset.verdict = 'invalid'
    writeText(verdictTarget, `先修参数：${model.a.ok ? model.b.error : model.a.error}`)
    return
  }
  writeText(canonicalATarget, model.a.canonical)
  if (!model.b.ok) {
    writeText(canonicalBTarget, model.b.error)
    verdictTarget.dataset.verdict = 'invalid'
    writeText(verdictTarget, `先修参数：${model.b.error}`)
    return
  }
  writeText(canonicalBTarget, model.b.canonical)
  verdictTarget.dataset.verdict = model.verdict
  writeText(verdictTarget, model.sameKey
    ? '同一个键：两份规范化后一字不差。B 进来链条照常累计——只换键序骗不过判定键。'
    : '新键：规范化结果不同。B 进来链条从 1 重数——换了值就是新的循环。')
}

function renderSandboxMeter(model, target) {
  target.replaceChildren()
  for (let position = 1; position <= model.repeats; position += 1) {
    const fired = model.chainPlan.find(plan => plan.count === position)
    const cell = document.createElement('span')
    cell.className = 'sandbox-cell'
    if (fired !== undefined) {
      cell.classList.add(fired.tier === 'gentle' ? 'is-gentle' : 'is-detailed', 'fires')
      cell.textContent = String(fired.count)
      cell.title = `第 ${position} 次同一调用：命中阈值 ${fired.count}，注入${fired.tier === 'gentle' ? '温和' : '详细'}提醒`
    } else {
      cell.title = `第 ${position} 次同一调用：未到阈值，链条继续累计`
    }
    target.append(cell)
  }
}

function initializePage() {
  const el = {
    form: document.querySelector('#gl-form'),
    attempts: document.querySelector('#attempts'),
    attemptsOutput: document.querySelector('#attempts-output'),
    guard: document.querySelector('#guard'),
    resetMode: document.querySelector('#reset-mode'),
    feedback: document.querySelector('#gl-feedback'),
    flow: document.querySelector('#gl-plot'),
    note: document.querySelector('#gl-note'),
    tableBody: document.querySelector('#gl-table-body'),
    tableCaption: document.querySelector('#gl-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    mAttempts: document.querySelector('#metric-attempts'),
    mReminders: document.querySelector('#metric-reminders'),
    mExecuted: document.querySelector('#metric-executed'),
    mTiers: document.querySelector('#metric-tiers'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#gl-step'),
    stepOutput: document.querySelector('#gl-step-output'),
    stepPrev: document.querySelector('#gl-step-prev'),
    stepNext: document.querySelector('#gl-step-next'),
    stepCaption: document.querySelector('#gl-step-caption'),
    sandboxA: document.querySelector('#gl-sandbox-a'),
    sandboxB: document.querySelector('#gl-sandbox-b'),
    sandboxCanonicalA: document.querySelector('#gl-sandbox-canonical-a'),
    sandboxCanonicalB: document.querySelector('#gl-sandbox-canonical-b'),
    sandboxVerdict: document.querySelector('#gl-sandbox-verdict'),
    sandboxMeter: document.querySelector('#gl-sandbox-meter'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const rebuildSandbox = () => {
    const sandboxModel = buildKeySandboxModel(el.sandboxA.value, el.sandboxB.value)
    renderSandboxVerdict(sandboxModel, el.sandboxVerdict, el.sandboxCanonicalA, el.sandboxCanonicalB)
    renderSandboxMeter(sandboxModel, el.sandboxMeter)
  }
  el.sandboxA.addEventListener('input', rebuildSandbox)
  el.sandboxB.addEventListener('input', rebuildSandbox)
  rebuildSandbox()

  let currentModel = null

  // 把滑杆位置同步到图和表：当前步加描边高亮，之后的步骤淡出；
  // 说明文字逐字取自模型步骤，不在这里新编事实。
  const syncStep = () => {
    if (currentModel === null) return
    const total = currentModel.steps.length
    el.step.max = String(total - 1)
    if (Number(el.step.value) > total - 1 || Number(el.step.value) < 0) el.step.value = String(total - 1)
    const index = Number(el.step.value)
    writeText(el.stepOutput, String(index))
    for (const row of el.tableBody.querySelectorAll('tr[data-key]')) {
      const at = Number(row.dataset.key)
      row.classList.toggle('is-current', at === index)
      row.classList.toggle('is-future', at > index)
    }
    const entry = currentModel.steps[index]
    writeText(el.stepCaption, '第 ' + String(entry.index) + ' 步 · ' + entry.lane
      + ' · ' + entry.phase + '：' + entry.detail)
    for (const dot of el.flow.querySelectorAll('[data-step]')) {
      const at = Number(dot.getAttribute('data-step'))
      dot.classList.toggle('is-current', at === index)
      dot.classList.toggle('is-future', at > index)
    }
    // 签名瞬间：阈值命中脉冲（温和单响 / 详细双响）。
    const sigDot = el.flow.querySelector('[data-step="' + index + '"]')
    if (entry.phase === 'remind') pulseSignal(sigDot, entry.tier === 'gentle' ? 'is-ping' : 'is-thud')
    el.stepPrev.disabled = index <= 0
    el.stepNext.disabled = index >= total - 1
  }

  const rebuild = () => {
    try {
      const model = buildGuardLoopModel({
        attempts: Number(el.attempts.value),
        guard: el.guard.value,
        resetMode: el.resetMode.value,
      })
      const v = evaluateGuardLoopOracle(model)
      currentModel = model
      renderFlow(model, el.flow, el.note)
      renderOracle(v, el.oracleList, el.oracle)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.tableBody, model.steps.map(s => ({
        key: String(s.index),
        state: s.phase === 'remind' ? 'remind' : s.phase === 'receive' ? 'receive' : 'plain',
        cells: [String(s.index), s.lane, s.phase, s.detail, String(s.attempt ?? '—')],
      })))
      writeText(el.tableCaption, `当前输入的全部 ${model.steps.length} 步`)
      writeText(el.mAttempts, String(model.observations.attempts))
      animateNumber(el.mExecuted, model.observations.executedCount)
      animateNumber(el.mReminders, model.observations.reminderCount)
      writeText(el.mTiers, `${model.observations.gentleCount} · ${model.observations.detailedCount}`)
      fb(`已推演：${model.observations.reminderCount} 条提醒、${model.observations.attempts} 次调用全部执行。`, 'success')
      syncStep()
      persist()
    } catch (e) {
      console.error('[guard-loop]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  const persist = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        attempts: Number(el.attempts.value),
        guard: el.guard.value,
        resetMode: el.resetMode.value,
        step: Number(el.step.value),
      }, SCHEMA))
    } catch {}
  }

  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })
  el.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })
  el.attempts.addEventListener('input', () => {
    writeText(el.attemptsOutput, el.attempts.value)
    rebuild()
  })
  for (const c of [el.guard, el.resetMode]) c.addEventListener('change', () => {
    // 换输入会改变步数：先按新输入重建，再把步进拉回末尾看完整时间线。
    rebuild()
    el.step.value = el.step.max
    el.step.dispatchEvent(new (el.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })

  // 时间轴步进：只改高亮和读数，不改推演结果。
  el.step.max = String(Number.MAX_SAFE_INTEGER)
  el.step.addEventListener('input', () => { syncStep(); persist() })
  const nudgeStep = delta => {
    el.step.value = String(Math.min(Number(el.step.max),
      Math.max(Number(el.step.min), Number(el.step.value) + delta)))
    el.step.dispatchEvent(new (el.step?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  el.stepPrev.addEventListener('click', () => nudgeStep(-1))
  el.stepNext.addEventListener('click', () => nudgeStep(1))
  bindRangeKeys(el.step)
  bindPlotScrub(el.flow, el.step)

  const r = readStateFromHash(location.hash, SCHEMA)
  const hasRestoredStep = r !== null && r.ok
  if (hasRestoredStep) {
    el.attempts.value = String(r.value.attempts)
    el.guard.value = r.value.guard
    el.resetMode.value = r.value.resetMode
    // 恢复前滑杆上界已放宽到 MAX_SAFE_INTEGER，这里的赋值不会被浏览器钳掉。
    el.step.value = String(r.value.step)
  }
  writeText(el.attemptsOutput, el.attempts.value)
  rebuild()
  if (!hasRestoredStep || Number(el.step.value) > Number(el.step.max)) {
    el.step.value = el.step.max
  }
  syncStep()

  el.copyLink.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); fb('已复制链接。', 'success') }
    catch { fb('复制失败：手动复制地址栏链接即可。', 'error') }
  })
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'advisory',
      hint: 'repeat-tool-reminder 是 post-execute 的建议性提醒，从不拦截任何调用。',
    explain: {
      advisory: 'ADVISORY_ONLY 校验钉住了它：repeat-tool-reminder 是建议性 post-execute 插件，只把提醒挂进 additionalContexts。',
      blocking: '那是另一个机制——Cordis 的 guard() 瀑布可以在 pre-execute 阶段拒绝；repeat-tool-reminder 不走那条路。',
      'model-stops': '页面测不了模型听不听劝：提醒只是注入上下文，EXECUTION_ACCOUNT 显示所有调用都执行了。',
    },
  })
}
