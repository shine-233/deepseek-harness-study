import {
  buildTypertGraphModel,
  buildTypertRegistryModel,
  evaluateTypertGraphOracle,
  evaluateTypertRegistryOracle,
} from './typert-model.js'
import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  svgElement,
  writeText,
  installDeclaredIcons,
  installScrollProgress,
} from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  shape: { enum: ['flat', 'nested', 'with-ref'] },
  face: { enum: ['host', 'client'] },
  scenario: { enum: ['clean', 'endpoint-dup', 'id-dup'] },
  withdrawOwner: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#typert-form'),
    shape: document.querySelector('#ty-shape'),
    face: document.querySelector('#ty-face'),
    scenario: document.querySelector('#ty-scenario'),
    withdraw: document.querySelector('#ty-withdraw'),
    feedback: document.querySelector('#typert-feedback'),
    rendered: document.querySelector('#ty-rendered'),
    graphNote: document.querySelector('#ty-graph-note'),
    regSteps: document.querySelector('#ty-reg-steps'),
    mNodes: document.querySelector('#metric-nodes'),
    mEdges: document.querySelector('#metric-edges'),
    mDepth: document.querySelector('#metric-depth'),
    mEndpoints: document.querySelector('#metric-endpoints'),
    mChanges: document.querySelector('#metric-changes'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const graphOracles = []
  const registryOracles = []

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        shape: el.shape.value,
        face: el.face.value,
        scenario: el.scenario.value,
        withdrawOwner: el.withdraw.checked,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒。 */ }
  }

  function rebuild() {
    try {
      const input = {
        shape: el.shape.value,
        face: el.face.value,
        scenario: el.scenario.value,
        withdrawOwner: el.withdraw.checked,
      }
      const graph = buildTypertGraphModel(input)
      const registry = buildTypertRegistryModel(input)
      const graphVerdict = evaluateTypertGraphOracle(graph)
      const regVerdict = evaluateTypertRegistryOracle(registry)

      writeText(el.rendered, graph.renderedText)
      writeText(el.mNodes, String(graph.observations.nodeCount))
      writeText(el.mEdges, String(graph.observations.edgeCount))
      writeText(el.mDepth, String(graph.observations.maxDepth))
      writeText(el.mEndpoints, registry.observations.remainingEndpoints.join('、') || '（空）')
      writeText(el.mChanges, String(registry.observations.changeEvents))

      // 两个面板的校验合并展示：图侧标「图」，账目侧标「账」。
      const merged = [
        ...graphVerdict.checks.map(c => ({ ...c, label: '[图] ' + c.label })),
        ...regVerdict.checks.map(c => ({ ...c, label: '[账] ' + c.label })),
      ]
      renderOracle(
        { pass: graphVerdict.pass && regVerdict.pass, checks: merged },
        el.oracleList,
        el.oracleBadge,
      )
      renderBoundary(graph, el.canProve, el.cannotProve)

      // 注册步骤逐条列出。
      el.regSteps.replaceChildren()
      for (const s of registry.steps) {
        const item = document.createElement('li')
        item.className = 'ty-step'
        if (s.phase === 'prepare-rejected' || s.phase === 'no-change') item.classList.add('is-reject')
        if (s.phase === 'committed') item.classList.add('is-ok')
        const owner = document.createElement('strong')
        writeText(owner, s.lane + ' · ' + s.phase)
        const detail = document.createElement('span')
        writeText(detail, s.detail)
        item.append(owner, detail)
        el.regSteps.append(item)
      }
      graphOracles.length = 0
      graphOracles.push(graphVerdict.pass, regVerdict.pass)
      fb(graph.observations.forkShape + '；注册表：'
        + (registry.observations.remainingEndpoints.join('、') || '（空）'), 'success')
      persistState()
    } catch (e) {
      console.error('[typert]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.shape, el.face, el.scenario]) c.addEventListener('change', rebuild)
  el.withdraw.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.shape.value = r.value.shape
    el.face.value = r.value.face
    el.scenario.value = r.value.scenario
    el.withdraw.checked = r.value.withdrawOwner
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
    // 注册表模型的步骤自带贡献/注册/变更三条泳道，直接按序重放。
    const toSteps = model => model.steps.map(step => ({
      lane: step.lane,
      phase: step.phase,
      detail: `${step.lane} · ${step.detail}`,
      index: step.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'typert-ladder',
      rungs: replayRungs([
        {
          title: '干净注册：贡献面到注册面的落地',
          text: '一个端点从贡献面提交，注册面登记，变更面记录这次变更。先看一条没有任何意外的轨迹。',
          traces: [{ id: 'clean', label: 'clean', steps: toSteps(buildTypertRegistryModel({ scenario: 'clean' })) }],
        },
        {
          title: '端点重复：同名登记当场被拒',
          text: '两个来源想注册同一个端点名——重复在最早的解析点被拒绝，而不是最后静默覆盖。',
          traces: [{ id: 'dup-endpoint', label: 'endpoint-dup', steps: toSteps(buildTypertRegistryModel({ scenario: 'endpoint-dup' })) }],
        },
        {
          title: 'id 重复：另一条唯一性红线',
          text: '端点名可以别名共存，id 不行。第二类唯一性约束由同一套 fail loud 语义守护。',
          traces: [{ id: 'dup-id', label: 'id-dup', steps: toSteps(buildTypertRegistryModel({ scenario: 'id-dup' })) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'id-conflict',
    explain: {
      'id-conflict': 'TR_ZERO_RESIDUE 校验钉住了它：invocation id 与端点各自全表唯一——跨端点重号同样被拒。',
      'ok-diff-endpoint': '端点唯一只是两条规则之一；id 唯一性独立生效。',
      replace: '静默顶替违反零残留：冲突必须显式失败，绝不悄悄改写别人的注册。',
    },
    hint: '线索：registry 的 prepare 同时查两张表——端点表和 id 表。',
  })
}
