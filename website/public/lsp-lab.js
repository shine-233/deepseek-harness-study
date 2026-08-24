import { buildLspModel, evaluateLspOracle } from './lsp-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  conflict: { boolean: true },
  invalidExt: { boolean: true },
  queryExt: { enum: ['ts', 'py'] },
  queryOp: { enum: ['hover', 'goToDefinition', 'findReferences', 'goToImplementation'] },
}

function initializePage() {
  const el = {
    form: document.querySelector('#lsp-form'),
    conflict: document.querySelector('#lsp-conflict'),
    invalid: document.querySelector('#lsp-invalid'),
    ext: document.querySelector('#lsp-ext'),
    op: document.querySelector('#lsp-op'),
    feedback: document.querySelector('#lsp-feedback'),
    plot: document.querySelector('#lsp-plot'), note: document.querySelector('#lsp-note'),
    shape: document.querySelector('#metric-shape'), mRoute: document.querySelector('#metric-route'),
    mFail: document.querySelector('#metric-fail'), mOps: document.querySelector('#metric-ops'),
    oracleBadge: document.querySelector('#metric-oracle'), oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'), cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        conflict: el.conflict.checked, invalidExt: el.invalid.checked,
        queryExt: el.ext.value, queryOp: el.op.value,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function renderTable(model) {
    el.plot.replaceChildren()
    const reservations = []
    if (!model.input.invalidExt) reservations.push(['.ts', 'typescript-lsp'])
    reservations.push(['.py', 'python-lsp'])
    if (model.input.conflict && model.input.invalidExt === false) reservations.push(['.ts ✕ 被 deno-lsp 抢注失败', null])
    const svg = svgElement('svg', { viewBox: `0 0 ${900} ${reservations.length * 54 + (model.observations.routedTo ? 110 : 60)}`,
      role: 'img', 'aria-labelledby': 'lsp-svg-title lsp-svg-desc' })
    svg.append(svgElement('title', { id: 'lsp-svg-title' }, '扩展名预留表与查询路由'))
    svg.append(svgElement('desc', { id: 'lsp-svg-desc' }, `查询 sample.${model.observations.queryExt} 路由到 ${model.observations.routedTo ?? '无处'}。`))
    let y = 30
    for (const [ext, provider] of reservations) {
      const failed = provider === null
      const rect = svgElement('rect', { x: 30, y, width: 820, height: 38, rx: 6,
        class: failed ? 'lsp-row is-dead' : 'lsp-row', 'data-reveal': '' })
      rect.append(svgElement('title', {}, failed ? '冲突注册：整体被拒，零残留' : `${ext} 由 ${provider} 独占`))
      svg.append(rect,
        svgElement('text', { x: 52, y: y + 25, class: failed ? 'axis is-strike' : 'axis' }, ext),
        svgElement('text', { x: 200, y: y + 25, class: failed ? 'axis is-strike' : 'axis' }, failed ? 'deno-lsp 的注册被整体拒收' : String(provider)))
      y += 54
    }
    if (model.observations.routedTo !== null) {
      svg.append(
        svgElement('text', { x: 30, y: y + 34, class: 'axis is-query' },
          `sample.${model.observations.queryExt} 的 ${model.observations.queryOp} → ${model.observations.routedTo}`),
      )
    }
    el.plot.append(svg)
    revealOnScroll(el.plot)
  }

  function rebuild() {
    try {
      const model = buildLspModel({
        conflict: el.conflict.checked, invalidExt: el.invalid.checked,
        queryExt: el.ext.value, queryOp: el.op.value,
      })
      const verdict = evaluateLspOracle(model)
      renderTable(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mRoute, String(model.observations.routedTo ?? '无路可走'))
      writeText(el.mFail, model.observations.registrationFailed ? '有（零残留）' : '无')
      writeText(el.mOps, String(model.observations.opsExposed.length) + ' 个固定操作')
      fb(model.observations.forkShape, model.observations.registrationFailed ? 'error' : 'success')
      persistState()
    } catch (e) { console.error('[lsp]', e); fb(e instanceof Error ? e.message : '输入无效。', 'error') }
  }

  for (const c of [el.conflict, el.invalid]) c.addEventListener('change', rebuild)
  for (const c of [el.ext, el.op]) c.addEventListener('input', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.conflict.checked = r.value.conflict; el.invalid.checked = r.value.invalidExt
    el.ext.value = r.value.queryExt; el.op.value = r.value.queryOp
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
    correct: 'rejected',
    explain: {
      rejected: 'LS_ATOMIC_REGISTRATION 校验钉住了它：扩展名独占，冲突注册在生效前被整体拒收。',
      share: '共享会让两个服务器对同一文件给出互相矛盾的答案——所以设计上不允许。',
      'last-wins': '后到者赢会破坏已建立的会话状态；这里选择保护先到者。',
    },
    hint: '线索：预留是「原子事务」——先全部校验，通过才生效。',
  })
}
