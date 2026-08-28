import { buildScheduleModel, evaluateScheduleOracle, foldFrames, SCHEDULE_SCENARIOS } from './schedule-lab-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  writeText, installDeclaredIcons, installScrollProgress,
  bindAutoAdvance, bindRangeKeys } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const KIND_LABELS = { create: '创建', dispatch: '触发', fork: '分叉' }
const STATE_SCHEMA = {
  scenario: { enum: SCHEDULE_SCENARIOS.map(item => item.id) },
  clockSeconds: { integerRange: [0, 2400] },
  everySeconds: { integerRange: [300, 900] },
}

function initializePage() {
  const el = {
    form: document.querySelector('#sch-form'),
    scenario: document.querySelector('#sch-scenario'),
    clock: document.querySelector('#sch-clock'), clockOut: document.querySelector('#sch-clock-out'),
    every: document.querySelector('#sch-every'), everyOut: document.querySelector('#sch-every-out'),
    feedback: document.querySelector('#sch-feedback'),
    step: document.querySelector('#sch-step'),
    caption: document.querySelector('#sch-step-caption'),
    log: document.querySelector('#sch-log'),
    fold: document.querySelector('#sch-fold'),
    ruler: document.querySelector('#sch-ruler'),
    mActive: document.querySelector('#metric-active'),
    mSkipped: document.querySelector('#metric-skipped'),
    mNext: document.querySelector('#metric-next'),
    oracleBadge: document.querySelector('#metric-oracle'), oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'), cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        scenario: el.scenario.value, clockSeconds: Number(el.clock.value), everySeconds: Number(el.every.value),
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  let frames = []
  let model = null

  function renderFold(at) {
    const fold = foldFrames(frames.slice(0, at + 1))
    const clock = model.input.clockSeconds
    const rows = []
    for (const record of fold.active.values()) {
      const due = `T0+${String(record.dueSec)}s`
      const shape = record.kind === 'every'
        ? `固定频率 · 每 ${String(record.everySeconds)} 秒 · 下一拍 ${due}`
        : `一次性 · ${due} 触发`
      const state = clock >= record.dueSec ? '已到点' : '未到点'
      rows.push(`<li><span class="sch-fold-id">${record.id}</span><span>${shape}</span><span class="sch-fold-state${clock >= record.dueSec ? ' sch-overdue' : ''}">${state}</span></li>`)
    }
    el.fold.innerHTML = rows.length === 0
      ? '<li class="sch-fold-empty">（空——这个视图里没有活动提醒）</li>'
      : rows.join('')
  }

  function renderRuler(at) {
    const ruler = frames[at]?.ruler
    if (ruler === undefined) {
      el.ruler.hidden = true
      el.ruler.innerHTML = ''
      return
    }
    const interval = model.input.everySeconds
    const scale = ruler.nextSec + interval
    const place = value => `calc(16px + (100% - 32px) * ${(value / scale).toFixed(4)})`
    const missed = []
    for (let step = 1; step < ruler.missed + 1; step += 1) {
      const at2 = ruler.anchorSec + step * interval
      missed.push(`<span class="sch-mark sch-missed" style="left:${place(at2)}"></span>`)
    }
    el.ruler.innerHTML = [
      '<span class="sch-track"></span>',
      `<span class="sch-mark sch-anchor" style="left:${place(ruler.anchorSec)}"></span><span class="sch-label" style="left:${place(ruler.anchorSec)}">锚点 T0+${String(ruler.anchorSec)}s</span>`,
      missed.join(''),
      `<span class="sch-mark sch-occurrence" style="left:${place(ruler.occurrenceSec)}"></span><span class="sch-label" style="left:${place(ruler.occurrenceSec)}">只补这一拍 T0+${String(ruler.occurrenceSec)}s</span>`,
      `<span class="sch-mark sch-accepted" style="left:${place(ruler.acceptedSec)}"></span><span class="sch-label" style="left:${place(ruler.acceptedSec)}">醒来 T0+${String(ruler.acceptedSec)}s</span>`,
      `<span class="sch-mark" style="left:${place(ruler.nextSec)}"></span><span class="sch-label" style="left:${place(ruler.nextSec)}">下一拍 T0+${String(ruler.nextSec)}s</span>`,
      `<span class="sch-legend">错过 ${String(ruler.missed)} 拍不重放</span>`,
    ].join('')
    el.ruler.hidden = false
  }

  function renderFrame(at, { scroll = true } = {}) {
    for (const [index, row] of el.log.querySelectorAll('[data-index]').entries()) {
      row.classList.toggle('is-current', index === at)
    }
    const current = el.log.querySelector('.is-current')
    if (scroll && current !== null) current.scrollIntoView({ block: 'nearest' })
    if (frames[at] === undefined) return
    writeText(el.caption, `${frames[at].label} —— ${frames[at].detail}`)
    const fold = foldFrames(frames.slice(0, at + 1))
    writeText(el.mActive, String(fold.active.size))
    writeText(el.mSkipped, frames[at].ruler === undefined ? '—' : String(frames[at].ruler.missed))
    writeText(el.mNext, frames[at].ruler === undefined ? '—' : `T0+${String(frames[at].ruler.nextSec)}s`)
    renderFold(at)
    renderRuler(at)
  }

  function rebuild() {
    try {
      model = buildScheduleModel({
        scenario: el.scenario.value,
        clockSeconds: Number(el.clock.value),
        everySeconds: Number(el.every.value),
      })
      const verdict = evaluateScheduleOracle(model)
      frames = model.frames
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.clockOut, `T0+${String(model.input.clockSeconds)}s`)
      writeText(el.everyOut, `${String(model.input.everySeconds)} 秒`)
      el.step.max = String(frames.length - 1)
      el.step.value = String(frames.length - 1)
      const rows = frames.map((frame, index) =>
        `<li data-index="${String(index)}" class="log-row"><span class="log-kind">${KIND_LABELS[frame.kind] ?? frame.kind}</span><strong>${frame.label}</strong><small>${frame.detail}</small></li>`)
      el.log.innerHTML = rows.join('')
      renderFrame(frames.length - 1, { scroll: false })
      const summary = model.input.scenario === 'one-shot'
        ? (model.observations.dispatchCount > 0 ? '一次性提醒已触发并除名。' : '提醒还在等它的触发时刻。')
        : model.input.scenario === 'catch-up'
          ? (model.observations.missedCount === null ? '还没到第一拍。' : `睡过 ${String(model.observations.missedCount)} 拍，只补最新一拍，下一拍 T0+${String(model.observations.nextSec)}s。`)
          : `子会话从零开始，父会话 ${String(model.observations.activeCount)} 条提醒不受影响。`
      fb(summary, 'success')
      persistState()
    } catch (error) {
      console.error('[schedule-lab]', error)
      fb(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  el.scenario.addEventListener('change', rebuild)
  for (const c of [el.clock, el.every]) c.addEventListener('input', rebuild)
  el.step.addEventListener('input', () => renderFrame(Number.parseInt(el.step.value, 10)))
  bindRangeKeys(el.step)
  bindAutoAdvance(document.getElementById('sch-play'), el.step, { stepMs: 680, speedSelect: document.getElementById('sch-speed') })
  el.log.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    el.step.value = item.dataset.index
    el.step.dispatchEvent(new Event('input', { bubbles: true }))
  })
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.scenario.value = restored.value.scenario
    el.clock.value = String(restored.value.clockSeconds)
    el.every.value = String(restored.value.everySeconds)
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 模型产出 frames（{tick, kind, label, detail}）：逐帧映射成轨迹步骤。
    const trace = (scenario, extra = {}) => buildScheduleModel({ scenario, ...extra }).frames.map(frame => ({
      lane: '事件日志', phase: frame.kind, index: frame.tick,
      detail: `${frame.label}：${frame.detail}`,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'schedule-lab-ladder',
      rungs: replayRungs([
        {
          title: '一次性提醒：触发即除名',
          text: 'after 形态在创建时把「现在 + 延迟」写进 scheduledAt，到点 dispatch 一次就从活动集合里消失。持久保存的是事件，不是一份会过期的表。',
          traces: [{ id: 'one-shot', label: '一次性', steps: trace('one-shot', { clockSeconds: 900 }) }],
        },
        {
          title: '固定频率：睡过几拍只补最新一拍',
          text: 'every 形态的锚点对齐决定每一拍落点；醒来时 dispatch 带 acceptedAt，只认最新应答拍，错过队列不逐拍重放，下一拍写回记录。',
          traces: [{ id: 'catch-up', label: '补最新一拍', steps: trace('catch-up', { clockSeconds: 1050, everySeconds: 300 }), focusPhases: ['dispatch'] }],
        },
        {
          title: 'fork 边界：子会话不继承提醒',
          text: 'fork 按 seedLength 切日志：子会话只重放自己拥有的后缀，活动提醒为零，id 计数也从零开始——父子两段里的 schedule-1 互不相干。',
          traces: [{ id: 'fork', label: '不继承', steps: trace('fork', { clockSeconds: 120 }), focusPhases: ['fork'] }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'latest',
    explain: {
      latest: 'dispatch 带 acceptedAt，锚点对齐算出最新应答拍：错过的队列不重放，下一拍写回记录继续走。',
      backlog: '上游没有积压队列：fold 里只有一条记录和一个 scheduledAt，没有「欠了几拍」的账本。',
      void: '错过不等于作废：记录还在、下一拍已经写回，只是中间那些拍不补。',
    },
    hint: '线索：fold 里一条固定频率提醒只存几个字段？存得下三次欠账吗？',
  })
}
