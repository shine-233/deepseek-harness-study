import { buildCredentialModel, evaluateCredentialOracle, CRED_LANES } from './credential-model.js'
import { makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const SCHEMA = {
  refName: { enum: ['github-token', 'api-key', 'unknown-ref'] },
  source: { enum: ['env', 'keychain', 'none'] },
}

function initializePage() {
  const el = {
    form: document.querySelector('#cred-form'),
    refName: document.querySelector('#ref-name'),
    source: document.querySelector('#source'),
    feedback: document.querySelector('#cred-feedback'),
    flow: document.querySelector('#cred-plot'),
    note: document.querySelector('#cred-note'),
    tableBody: document.querySelector('#cred-table-body'),
    tableCaption: document.querySelector('#cred-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    oracle: document.querySelector('#metric-oracle'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    mResolved: document.querySelector('#metric-resolved'),
    mFailClosed: document.querySelector('#metric-failclosed'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  function renderFlow(model, target) {
    target.replaceChildren()
    const slot = 80
    const lh = 58
    const top = 34
    const left = 110
    const w = Math.max(900, left + model.steps.length * slot + 24)
    const h = top + CRED_LANES.length * lh + 42
    const xf = i => left + i * slot + 30
    const yf = laneName => top + CRED_LANES.indexOf(laneName) * lh + lh / 2

    const svg = svgElement('svg', { viewBox: `0 0 ${w} ${h}`, role: 'img', 'aria-labelledby': 'cr-st' })
    svg.append(svgElement('title', { id: 'cr-st' }, '凭据解析的有序步骤'))
    for (const lane of CRED_LANES) {
      const y = yf(lane)
      svg.append(
        svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
        svgElement('line', { x1: left, y1: y, x2: w - 18, y2: y, class: 'grid' }),
      )
    }
    for (const s of model.steps) {
      const cls = ['cr-dot']
      if (s.phase === 'resolve' || s.phase === 'settle-ok') cls.push('is-ok')
      if (s.phase === 'settle-fail') cls.push('is-fail')
      if (s.phase === 'miss') cls.push('is-miss')
      const c = svgElement('circle', { 'data-reveal': '', 'data-step': String(s.index ?? model.steps.indexOf(s)), cx: xf(model.steps.indexOf(s)), cy: yf(s.lane), r: 9, class: cls.join(' ') })
      c.append(svgElement('title', {}, `${model.steps.indexOf(s)} ${s.phase}: ${s.detail}`))
      svg.append(c)
    }
    target.append(svg)
    revealOnScroll(target)
  }

  let currentModel = null

  function rebuild() {
    try {
      const model = buildCredentialModel({ refName: el.refName.value, source: el.source.value })
      const verdict = evaluateCredentialOracle(model)
      currentModel = model
      renderFlow(model, el.flow)
      renderOracle(verdict, el.oracleList, el.oracle)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.tableBody, model.steps.map((s, i) => ({
        key: String(i),
        state: s.phase === 'settle-fail' ? 'fail' : s.phase === 'settle-ok' ? 'ok' : 'plain',
        cells: [String(i), s.lane, s.phase, s.detail],
      })))
      writeText(el.tableCaption, `当前输入的 ${model.steps.length} 步`)
      writeText(el.mResolved, model.observations.resolved ?? '（未命中）')
      writeText(el.mFailClosed, model.observations.failClosed ? '是' : '否')
      fb(model.observations.failClosed ? 'Fail-closed 拒绝：工具调用被阻止。' : '凭据注入成功。', model.observations.failClosed ? 'error' : 'success')
      persist()
    } catch (e) {
      console.error('[credential]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  const persist = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        refName: el.refName.value, source: el.source.value,
      }, SCHEMA))
    } catch {}
  }

  installInputReset(el.resetInputs, el.form, { onReset: rebuild })
  el.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })
  for (const c of [el.refName, el.source]) c.addEventListener('change', rebuild)

  const r = readStateFromHash(location.hash, SCHEMA)
  if (r !== null && r.ok) { el.refName.value = r.value.refName; el.source.value = r.value.source }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 模型步骤没有 index 字段：轨迹引擎按数组位置定位，这里补上序号。
    const trace = input => buildCredentialModel(input).steps.map((step, index) => ({
      lane: step.lane, phase: step.phase, detail: step.detail, index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'credential-ladder',
      rungs: replayRungs([
        {
          title: '三步流水线：声明、询问、结算',
          text: '配置只声明「我要用哪个凭据」，值由注册的 Provider 逐个询问供应。命中时凭据走安全通道注入 ctx.authorization——值本身不进日志。',
          traces: [{ id: 'env-hit', label: 'env 命中', steps: trace({ refName: 'github-token', source: 'env' }) }],
        },
        {
          title: '零个 Provider：fail-closed 拒绝',
          text: '没有任何 Provider 声明过这个引用时，解析直接拒绝。工具调用被整体阻止——不是返回空值让调用方猜。',
          traces: [{ id: 'unknown', label: 'unknown-ref', steps: trace({ refName: 'unknown-ref', source: 'env' }), focusPhases: ['miss', 'settle-fail'] }],
        },
        {
          title: '来源标记不等于供应能力',
          text: '来源 none 表示没有已注册的 Provider 可查：声明写得再完整也兑现不出凭据。能兑现引用的是注册进来的 Provider，不是配置文本。',
          traces: [{ id: 'none', label: '无 Provider', steps: trace({ refName: 'api-key', source: 'none' }), focusPhases: ['settle-fail'] }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'fail-closed',
    explain: {
      'fail-closed': 'FAIL_CLOSED 校验钉住了它：没有 Provider 能供应时，请求被拒绝——不是静默返回空。',
      'silent-null': '那是另一种设计——DSH 选择 fail-closed，因为空凭据比明确拒绝更危险。',
      partial: '部分注入会更危险：调用方分不清哪些键是真凭据、哪些是空值，所以解析要么全命中、要么整体拒绝。',
    },
    hint: '线索：看「结算」泳道的最后一步——它说的是"阻止"还是"返回"。',
  })
}
