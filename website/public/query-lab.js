import { buildQueryModel, evaluateQueryOracle, QUERY_LOG } from './query-model.js'
import {
  makeFeedback, renderBoundary, renderOracle, requireElements, writeText,
  installDeclaredIcons, installScrollProgress,
} from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  kindFilter: { enum: ['all', 'user/message', 'tool/call', 'tool/result'] },
  searchText: { string: true },
  winStart: { integerRange: [0, QUERY_LOG.length - 1] },
  winEnd: { integerRange: [0, QUERY_LOG.length - 1] },
}

function initializePage() {
  const el = {
    form: document.querySelector('#query-form'),
    kind: document.querySelector('#sq-kind'),
    search: document.querySelector('#sq-search'),
    start: document.querySelector('#sq-start'), startOut: document.querySelector('#sq-start-output'),
    end: document.querySelector('#sq-end'), endOut: document.querySelector('#sq-end-output'),
    feedback: document.querySelector('#query-feedback'),
    shape: document.querySelector('#metric-shape'),
    mCount: document.querySelector('#metric-count'),
    mSeqs: document.querySelector('#metric-seqs'),
    mKinds: document.querySelector('#metric-kinds'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stepsBody: document.querySelector('#sq-steps-body'),
    caption: document.querySelector('#sq-caption'),
    note: document.querySelector('#wp-note'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        kindFilter: el.kind.value,
        searchText: el.search.value,
        winStart: Number(el.start.value),
        winEnd: Number(el.end.value),
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function rebuild() {
    try {
      if (Number(el.start.value) > Number(el.end.value)) el.end.value = el.start.value
      const model = buildQueryModel({
        kindFilter: el.kind.value,
        searchText: el.search.value,
        window: [Number(el.start.value), Number(el.end.value)],
      })
      const verdict = evaluateQueryOracle(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mCount, String(model.observations.matchCount))
      writeText(el.mSeqs, model.observations.matchedSeqs.join('、') || '—')
      writeText(el.mKinds, model.observations.kindsPresent.join('、') || '—')
      writeText(el.startOut, String(model.input.window[0]))
      writeText(el.endOut, String(model.input.window[1]))
      el.stepsBody.replaceChildren()
      for (const entry of QUERY_LOG) {
        if (!model.observations.matchedSeqs.includes(entry.seq)) continue
        const row = document.createElement('tr')
        const seq = document.createElement('td'); writeText(seq, '#' + String(entry.seq))
        const kind = document.createElement('td'); writeText(kind, entry.kind)
        const text = document.createElement('td'); writeText(text, entry.text)
        row.append(seq, kind, text)
        el.stepsBody.append(row)
      }
      writeText(el.caption, `命中 ${model.observations.matchCount} 条（窗口 [${model.input.window[0]}, ${model.input.window[1]}]）`)
      fb(model.observations.forkShape, model.observations.matchCount > 0 ? 'success' : 'error')
      persistState()
    } catch (e) {
      console.error('[query]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.kind]) c.addEventListener('change', rebuild)
  for (const c of [el.search, el.start, el.end]) c.addEventListener('input', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.kind.value = r.value.kindFilter
    el.search.value = r.value.searchText
    el.start.value = String(r.value.winStart)
    el.end.value = String(r.value.winEnd)
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: '3',
    explain: {
      '3': 'Q_KIND_FILTER 校验钉住了它：read_file ×2 + edit_file ×1，三次 tool/call。',
      '2': '漏了 edit_file——它也是一次 tool/call，只是发生在第 5 步。',
      '0': '日志里确实有 call：三次工具调用都留下了 tool/call 记录。',
    },
    hint: '线索：数一数脚本里有多少次「请求调用」——edit_file 也是一次调用。',
  })
}
