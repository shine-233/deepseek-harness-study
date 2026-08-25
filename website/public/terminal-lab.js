import { buildTerminalModel, evaluateTerminalOracle, TERM_SCRIPTS } from './terminal-model.js'
import { makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress, pulseSignal } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const TERM_LANES = ['调用方', '终端缝', 'PTY 会话', '进程树']

const STATE_SCHEMA = {
  scriptId: { enum: TERM_SCRIPTS.map(script => script.id) },
  freshEach: { boolean: true },
  concurrentSend: { boolean: true },
  killAfter: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#terminal-form'),
    script: document.querySelector('#tm-script'),
    scriptNote: document.querySelector('#tm-script-note'),
    fresh: document.querySelector('#tm-fresh'),
    concurrent: document.querySelector('#tm-concurrent'),
    kill: document.querySelector('#tm-kill'),
    feedback: document.querySelector('#terminal-feedback'),
    plot: document.querySelector('#tm-plot'),
    note: document.querySelector('#tm-note'),
    shape: document.querySelector('#metric-shape'),
    mSends: document.querySelector('#metric-sends'),
    mSessions: document.querySelector('#metric-sessions'),
    mCarried: document.querySelector('#metric-carried'),
    mReject: document.querySelector('#metric-reject'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stepsBody: document.querySelector('#tm-steps-body'),
    caption: document.querySelector('#tm-caption'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        scriptId: el.script.value,
        freshEach: el.fresh.checked,
        concurrentSend: el.concurrent.checked,
        killAfter: el.kill.checked,
      }, STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  function renderTimeline(model, target) {
    target.replaceChildren()
    const lh = 58
    const top = 34
    const left = 110
    const slot = 92
    const w = Math.max(900, left + model.steps.length * slot + 24)
    const h = top + TERM_LANES.length * lh + 42
    const svg = svgElement('svg', {
      viewBox: `0 0 ${w} ${h}`, role: 'img',
      'aria-labelledby': 'tm-svg-title tm-svg-desc',
    })
    svg.append(svgElement('title', { id: 'tm-svg-title' }, '终端会话的有序步骤'))
    svg.append(svgElement('desc', { id: 'tm-svg-desc' },
      `模式：${model.observations.forkShape}，共 ${model.steps.length} 步。`))
    for (const lane of TERM_LANES) {
      const y = top + TERM_LANES.indexOf(lane) * lh + lh / 2
      svg.append(
        svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
        svgElement('line', { x1: left, y1: y, x2: w - 18, y2: y, class: 'grid' }),
      )
    }
    for (const [i, s] of model.steps.entries()) {
      const cls = ['tm-dot']
      if (s.phase === 'state') cls.push(s.carried === true ? 'is-carried' : 'is-reset')
      if (s.phase === 'second-send-rejected') cls.push('is-reject')
      if (s.phase === 'settled') cls.push('is-settled')
      const c = svgElement('circle', {
        cx: left + i * slot + 30, cy: top + TERM_LANES.indexOf(s.lane) * lh + lh / 2,
        r: 9, class: cls.join(' '), 'data-reveal': '', 'data-step': String(i),
      })
      c.append(svgElement('title', {}, `${i} ${s.phase}: ${s.detail}`))
      svg.append(c)
    }
    target.append(svg)
    revealOnScroll(target)
  }

  function rebuild() {
    try {
      const model = buildTerminalModel({
        scriptId: el.script.value,
        freshEach: el.fresh.checked,
        concurrentSend: el.concurrent.checked,
        killAfter: el.kill.checked,
      })
      const verdict = evaluateTerminalOracle(model)
      renderTimeline(model, el.plot)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.stepsBody, model.steps.map((s, i) => ({
        key: String(i),
        state: s.phase === 'second-send-rejected' ? 'fail' : s.carried === true ? 'ok' : 'plain',
        cells: [String(i), s.lane, s.phase, s.detail],
      })))
      writeText(el.caption, '当前输入的全部 ' + String(model.steps.length) + ' 步')
      writeText(el.scriptNote, model.script.description)
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mSends, String(model.observations.sends))
      writeText(el.mSessions, String(model.observations.sessionCount))
      writeText(el.mCarried, model.observations.stateCarried ? '延续' : '每次归零')
      writeText(el.mReject, model.observations.secondSendRejected ? '已拒绝' : '未触发')
      fb(model.observations.stateCarried
        ? '持久会话：第二次发送读到了第一次留下的状态。'
        : '一次性模式：每条命令都在全新会话里跑。', 'success')
      persistState()
    } catch (e) {
      console.error('[terminal]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.script, el.fresh, el.concurrent, el.kill]) {
    c.addEventListener('change', rebuild)
  }
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  // 图形即控制器：点泳道圆点，步骤表滚到并闪亮那一行；点行也点亮圆点。
  const flashRow = row => {
    row.classList.remove('metric-flash')
    void row.offsetWidth
    row.classList.add('metric-flash')
    row.scrollIntoView({ block: 'nearest' })
  }
  el.plot.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return
    const dot = event.target.closest('[data-step]')
    if (dot === null) return
    pulseSignal(dot, 'is-picked')
    const row = el.stepsBody.querySelector('tr[data-key="' + dot.getAttribute('data-step') + '"]')
    if (row !== null) flashRow(row)
  })
  el.stepsBody.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return
    const row = event.target.closest('tr[data-key]')
    if (row === null) return
    const dot = el.plot.querySelector('[data-step="' + row.dataset.key + '"]')
    if (dot !== null) pulseSignal(dot, 'is-picked')
  })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.script.value = restored.value.scriptId
    el.fresh.checked = restored.value.freshEach
    el.concurrent.checked = restored.value.concurrentSend
    el.kill.checked = restored.value.killAfter
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
    correct: 'home',
    explain: {
      home: 'TM_STATE_ACCOUNTING 校验钉住了它：一次性模式下每次发送都开全新会话，cd 留下的状态不在里面。',
      '/tmp': '那是持久会话的行为；切到一次性模式后两次发送住在两个互不相识的会话里。',
      error: '不会报错——pwd 正常执行了，只是它所在的会话从没听过 cd /tmp 这件事。',
    },
    hint: '线索：「状态」这一格在一次性模式下的颜色。',
  })
}
