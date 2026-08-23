/**
 * 循环卫生提醒实验页的渲染层。模型在 guard-loop-model.js。
 */
import {
  makeFeedback, renderBoundary, renderOracle, renderRows,
  requireElements, svgElement, writeText,
  installDeclaredIcons, installScrollProgress,
} from './study-lab-kit.js'
import { buildGuardLoopModel, evaluateGuardLoopOracle } from './guard-loop-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const SCHEMA = { attempts: { integerRange: [1, 9] }, guard: { enum: ['on', 'off'] } }
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
    svgElement('desc', { id: 'gl-ds' }, '纵轴是参与方，横轴是步骤序号。信号色圆点是提醒注入，实心圆是调用发出。'),
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
    const c = svgElement('circle', { 'data-reveal': '', cx: xf(s.index), cy: yf(s.lane), r: 9, class: cls.join(' ') })
    c.append(svgElement('title', {}, `${s.index} ${s.phase}: ${s.detail}`))
    svg.append(c)
  }
  target.append(svg); revealOnScroll(target)
  writeText(note, `${model.observations.reminderCount} 条提醒注入，全部 ${model.observations.attempts} 次调用照常执行——建议性插件不拦截任何东西。`)
}

function initializePage() {
  const el = {
    form: document.querySelector('#gl-form'),
    attempts: document.querySelector('#attempts'),
    attemptsOutput: document.querySelector('#attempts-output'),
    guard: document.querySelector('#guard'),
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
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const rebuild = () => {
    try {
      const model = buildGuardLoopModel({ attempts: Number(el.attempts.value), guard: el.guard.value })
      const v = evaluateGuardLoopOracle(model)
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
      writeText(el.mReminders, String(model.observations.reminderCount))
      writeText(el.mExecuted, String(model.observations.executedCount))
      fb(`已推演：${model.observations.reminderCount} 条提醒、${model.observations.attempts} 次调用全部执行。`, 'success')
      persist()
    } catch (e) {
      console.error('[guard-loop]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  const persist = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        attempts: Number(el.attempts.value), guard: el.guard.value,
      }, SCHEMA))
    } catch {}
  }

  el.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })
  for (const c of [el.attempts, el.guard]) c.addEventListener('input', () => {
    if (c === el.attempts) writeText(el.attemptsOutput, c.value)
    rebuild()
  })

  const r = readStateFromHash(location.hash, SCHEMA)
  if (r !== null && r.ok) { el.attempts.value = String(r.value.attempts); el.guard.value = r.value.guard }
  writeText(el.attemptsOutput, el.attempts.value)
  rebuild()

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
    explain: {
      advisory: 'ADVISORY_ONLY 校验钉住了它：repeat-tool-reminder 是建议性 post-execute 插件，不拦截任何调用。',
      blocking: '那是另一个机制——Cordis 的 guard() 瀑布可以在 pre-execute 阶段拒绝；repeat-tool-reminder 不走那条路。',
      'model-stops': '提醒只是注入上下文——模型可以忽略它继续调，EXECUTION_ACCOUNT 显示所有调用都执行了。',
    },
  })
}
