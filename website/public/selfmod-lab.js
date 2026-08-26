import { buildSelfModModel, evaluateSelfModOracle } from './selfmod-model.js'
import { makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress, pulseSignal } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  actionId: { enum: ['full-lifecycle', 'run-only', 'broken-yml'] },
  guardDenies: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#selfmod-form'),
    action: document.querySelector('#sm-action'),
    guard: document.querySelector('#sm-guard'),
    feedback: document.querySelector('#selfmod-feedback'),
    plot: document.querySelector('#sm-plot'),
    note: document.querySelector('#sm-note'),
    schemaChips: document.querySelector('#sm-schema'),
    shape: document.querySelector('#metric-shape'),
    mFiber: document.querySelector('#metric-fiber'),
    mGrow: document.querySelector('#metric-grow'),
    mShrink: document.querySelector('#metric-shrink'),
    mGuard: document.querySelector('#metric-guard'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  let currentModel = null

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        actionId: el.action.value,
        guardDenies: el.guard.checked,
      }, STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  function renderTimeline(model, target) {
    target.replaceChildren()
    const LANES = model.lanes
    const lh = 58
    const top = 34
    const left = 150
    const slot = 96
    const w = Math.max(900, left + model.steps.length * slot + 24)
    const h = top + LANES.length * lh + 42
    const svg = svgElement('svg', {
      viewBox: `0 0 ${w} ${h}`, role: 'img',
      'aria-labelledby': 'sm-svg-title sm-svg-desc',
    })
    svg.append(svgElement('title', { id: 'sm-svg-title' }, '自我修改的有序步骤'))
    svg.append(svgElement('desc', { id: 'sm-svg-desc' },
      `${model.observations.forkShape}，共 ${model.steps.length} 步。`))
    for (const lane of LANES) {
      const y = top + LANES.indexOf(lane) * lh + lh / 2
      svg.append(
        svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
        svgElement('line', { x1: left, y1: y, x2: w - 18, y2: y, class: 'grid' }),
      )
    }
    for (const [i, s] of model.steps.entries()) {
      const cls = ['sm-dot']
      if (s.phase === 'schema-grows') cls.push('is-grow')
      if (s.phase === 'schema-shrinks') cls.push('is-shrink')
      if (s.phase === 'parse-fail') cls.push('is-fail')
      if (s.phase === 'guard-denied') cls.push('is-reject')
      const c = svgElement('circle', {
        cx: left + i * slot + 30, cy: top + LANES.indexOf(s.lane) * lh + lh / 2,
        r: 9, class: cls.join(' '), 'data-reveal': '', 'data-step': String(i),
      })
      c.append(svgElement('title', {}, `${i} ${s.phase}: ${s.detail}`))
      svg.append(c)
    }
    target.append(svg)
    revealOnScroll(target)
  }

  function renderSchema(model) {
    el.schemaChips.replaceChildren()
    const visible = model.observations.finalToolVisible
    const chip = svgElement('code', {
      class: 'mc-chip' + (visible ? '' : ' is-none'),
    }, visible ? 'dyn__greet（动态注册）' : 'schema 里没有动态工具')
    el.schemaChips.append(chip)
  }

  function rebuild() {
    try {
      const model = buildSelfModModel({
        actionId: el.action.value,
        guardDenies: el.guard.checked,
      })
      currentModel = model
      const verdict = evaluateSelfModOracle(model)
      renderTimeline(model, el.plot)
      renderSchema(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mFiber, model.observations.fiberActivated ? '已激活' : '未激活')
      writeText(el.mGrow, model.observations.schemaGrew ? '+1 工具' : '不变')
      writeText(el.mShrink, model.observations.schemaShrunk ? '-1 工具' : '—')
      writeText(el.mGuard, model.observations.guardDenied ? '已拒绝' : '未触发')
      fb(model.observations.forkShape, model.observations.brokenYml ? 'error' : 'success')
      persistState()
    } catch (e) {
      console.error('[selfmod]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  el.action.addEventListener('change', rebuild)
  el.guard.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  // 图形即控制器：点泳道圆点，图下说明行换成那一步的原文。
  el.plot.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return
    const dot = event.target.closest('[data-step]')
    if (dot === null) return
    pulseSignal(dot, 'is-picked')
    const step = currentModel?.steps[Number(dot.getAttribute('data-step'))]
    if (step !== undefined) writeText(el.note, `第 ${dot.getAttribute('data-step')} 步 · ${step.lane} · ${step.phase}：${step.detail}`)
  })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.action.value = restored.value.actionId
    el.guard.checked = restored.value.guardDenies
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    const trace = input => buildSelfModModel(input).steps.map(step => ({
      lane: step.lane, phase: step.phase, detail: step.detail, index: step.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'selfmod-ladder',
      rungs: replayRungs([
        {
          title: '先看脚下，再动手：inspect 是第一动作',
          text: '模型先用 cordis_inspect 查看自己装载了哪些包、哪些在运行。自修改不是盲改——每一步都从读取现状开始。',
          traces: [{ id: 'run-only', label: '只运行不卸载', steps: trace({ actionId: 'run-only' }), focusPhases: ['inspect'] }],
        },
        {
          title: '完整生命周期：schema 随挂载生长、随卸载收缩',
          text: 'define → run → stop → undefine：动态包挂载后工具注册表长出新条目，卸载后精确缩回。模型看到的工具面随生命周期实时变化。',
          traces: [{ id: 'full', label: '完整生命周期', steps: trace({ actionId: 'full-lifecycle' }) }],
        },
        {
          title: '两道防线：guard 拦调用，坏 yml 挂不上',
          text: 'broken-yml 在解析处失败：nothing-mounted，schema 纹丝不动。守卫插件还能拒绝敏感的动态调用——失败被关在最外层。',
          traces: [
            { id: 'broken', label: '坏 yml', steps: trace({ actionId: 'broken-yml' }), focusPhases: ['parse-fail', 'nothing-mounted'] },
            { id: 'guarded', label: 'guard 拒绝', steps: trace({ actionId: 'full-lifecycle', guardDenies: true }), focusPhases: ['guard-denied'] },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'fail-loud',
    explain: {
      'fail-loud': 'SM_FAIL_LOUD 校验钉住了它：配置解析失败时错误原文回到模型，Fiber 从未激活。',
      'partial-mount': '半挂载正是被禁止的状态——要么整个包活下来，要么什么都不挂。',
      'silent-skip': '静默跳过违反 fail loud：误配置必须在最早可解析的点大声失败。',
    },
    hint: '线索：仓库规则「Misconfiguration fails loud at load」对动态包同样生效。',
  })
}
