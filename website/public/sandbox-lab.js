import { buildSandboxModel, evaluateSandboxOracle } from './sandbox-model.js'
import {
  makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
  writeText, installDeclaredIcons, installScrollProgress,
} from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  mode: { enum: ['read-only', 'workspace-write', 'danger-full-access'] },
  op: { enum: ['read', 'write-in-workspace', 'write-temp', 'write-outside'] },
  sessionOverride: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#sandbox-form'),
    mode: document.querySelector('#sbx-mode'),
    op: document.querySelector('#sbx-op'),
    override: document.querySelector('#sbx-override'),
    feedback: document.querySelector('#sandbox-feedback'),
    shape: document.querySelector('#metric-shape'),
    mMode: document.querySelector('#metric-mode'),
    mVerdict: document.querySelector('#metric-verdict'),
    mOverride: document.querySelector('#metric-override'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stepsBody: document.querySelector('#sbx-steps-body'),
    caption: document.querySelector('#sbx-caption'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        mode: el.mode.value, op: el.op.value, sessionOverride: el.override.checked,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function rebuild() {
    try {
      const model = buildSandboxModel({
        mode: el.mode.value,
        op: el.op.value,
        sessionOverride: el.override.checked,
      })
      const verdict = evaluateSandboxOracle(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.stepsBody, model.steps.map(s => ({
        key: String(s.index),
        state: s.phase === 'enforce-deny' ? 'fail' : s.phase === 'enforce-allow' ? 'ok' : 'plain',
        cells: [String(s.index), s.lane, s.phase, s.detail],
      })))
      writeText(el.caption, '当前输入的 ' + String(model.steps.length) + ' 步')
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mMode, model.observations.effectiveMode)
      writeText(el.mVerdict, model.observations.verdict === 'allowed' ? '放行' : '拒绝')
      writeText(el.mOverride, model.input.sessionOverride ? '已入册' : '未覆盖')
      fb(model.observations.forkShape, model.observations.verdict === 'allowed' ? 'success' : 'error')
      persistState()
    } catch (e) {
      console.error('[sandbox]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.mode, el.op]) c.addEventListener('change', rebuild)
  el.override.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.mode.value = r.value.mode
    el.op.value = r.value.op
    el.override.checked = r.value.sessionOverride
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    const trace = input => buildSandboxModel(input).steps.map((step, index) => ({
      lane: step.lane, phase: step.phase, detail: step.detail, index: step.index ?? index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'sandbox-ladder',
      rungs: replayRungs([
        {
          title: '部署默认先行：read-only 挡下写入',
          text: '请求声明「要写工作区」，策略解析读出部署默认 read-only，文件沙箱在执行前拒绝写效应。拒绝连同升级指引一起返回给模型——被拒不等于死路。',
          traces: [{ id: 'deny', label: '只读 × 写入', steps: trace({ mode: 'read-only', op: 'write-in-workspace' }), focusPhases: ['enforce-deny', 'denial-guidance'] }],
        },
        {
          title: '放开一档：workspace-write 放行工作区内',
          text: '同一操作换到 workspace-write 就能通过：策略是档位不是开关，放行的范围由模式明确圈定。',
          traces: [{ id: 'allow', label: '工作区可写', steps: trace({ mode: 'workspace-write', op: 'write-in-workspace' }), focusPhases: ['enforce-allow', 'done-allow'] }],
        },
        {
          title: '临时文件与界外路径：同一次判定分开对待',
          text: 'write-temp 通常随工作区可写一起放行；写到界外则始终需要更高档位。路径落在哪里，决定它归哪条规则管。',
          traces: [
            { id: 'temp', label: '写临时目录', steps: trace({ mode: 'workspace-write', op: 'write-temp' }) },
            { id: 'outside', label: '写界外', steps: trace({ mode: 'workspace-write', op: 'write-outside' }), focusPhases: ['enforce-deny'] },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'allowed',
    explain: {
      allowed: '判定表钉住了它：workspace-write 的白名单包含平台临时区。',
      denied: '那是工作区外路径的结局；临时区被明确列入白名单。',
      ask: '沙箱策略不弹窗——它只做确定性判定，交互确认属于审批缝。',
    },
    hint: '线索：workspace-write 的名字里说的是「工作区内」，但白名单不止工作区。',
  })
}
