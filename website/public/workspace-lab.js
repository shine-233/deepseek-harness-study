import { buildWorkspaceModel, evaluateWorkspaceOracle } from './workspace-model.js'
import {
  makeFeedback, renderBoundary, renderOracle, renderRows, requireElements, writeText,
  installDeclaredIcons, installScrollProgress,
} from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  duplicate: { boolean: true },
  moveInvalid: { boolean: true },
  attachSession: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#workspace-form'),
    dup: document.querySelector('#ws-duplicate'),
    inv: document.querySelector('#ws-move-invalid'),
    attach: document.querySelector('#ws-attach'),
    feedback: document.querySelector('#workspace-feedback'),
    shape: document.querySelector('#metric-shape'),
    mCount: document.querySelector('#metric-count'),
    mOrder: document.querySelector('#metric-order'),
    mReject: document.querySelector('#metric-reject'),
    mAttach: document.querySelector('#metric-attach'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stepsBody: document.querySelector('#ws-steps-body'),
    caption: document.querySelector('#ws-caption'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        duplicate: el.dup.checked,
        moveInvalid: el.inv.checked,
        attachSession: el.attach.checked,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function rebuild() {
    try {
      const model = buildWorkspaceModel({
        duplicate: el.dup.checked,
        moveInvalid: el.inv.checked,
        attachSession: el.attach.checked,
      })
      const verdict = evaluateWorkspaceOracle(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.stepsBody, model.steps.map(s => ({
        key: String(s.index),
        state: s.phase === 'move-rejected' ? 'fail' : s.phase === 'dedupe' ? 'ok' : 'plain',
        cells: [String(s.index), s.lane, s.phase, s.detail],
      })))
      writeText(el.caption, '当前输入的全部 ' + String(model.steps.length) + ' 步')
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mCount, String(model.observations.recordCount))
      writeText(el.mOrder, '稳定（追加式）')
      writeText(el.mReject, model.observations.moveRejected ? '已拒绝' : '未触发')
      writeText(el.mAttach, model.observations.sessionAttached ? '已挂接' : '未挂接')
      fb(model.observations.forkShape, 'success')
      persistState()
    } catch (e) {
      console.error('[workspace]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.dup, el.inv, el.attach]) c.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.dup.checked = r.value.duplicate
    el.inv.checked = r.value.moveInvalid
    el.attach.checked = r.value.attachSession
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
    correct: 'one',
    explain: {
      one: 'WS_RECORD_COUNT 校验钉住了它：realpath 归一化后与既有记录相同——返回同一条而非新增。',
      two: '重复行会让「哪条是真身」变成猜谜；注册表按路径唯一。',
      error: '重复注册不是错误：幂等返回同一条记录即可。',
    },
    hint: '线索：顶注里的关键词是「durable workspace records」和「stable registry order」。',
  })
}
