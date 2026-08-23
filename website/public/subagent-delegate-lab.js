/**
 * subagent 委派实验页的渲染层。模型在 subagent-delegate-model.js；
 * 本文件只画返回值。时间线、步骤表和读数读的是同一个 steps 数组。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import {
  DELEGATE_LANES,
  buildSubagentDelegateModel,
  evaluateSubagentDelegateOracle,
} from './subagent-delegate-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：两个维度都是受控枚举；越界值在恢复时会被模型的
// 校验拒绝并给出明确反馈。
const DELEGATE_STATE_SCHEMA = {
  depth: { enum: ['within-limit', 'beyond-limit'] },
  outcome: { enum: ['report', 'fail'] },
}

function renderFlow(model, target, note) {
  const slot = 72
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + DELEGATE_LANES.length * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + DELEGATE_LANES.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'sd-svg-title sd-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'sd-svg-title' }, '一次委派的有序步骤'),
    svgElement('desc', { id: 'sd-svg-desc' },
      '纵轴是参与方：父 Agent、委派边界、子 Agent 和回报；横轴是步骤序号。'
      + '虚线圆环是边界拒绝，回报泳道的实心点是结算，父泳道不会出现子的执行。'),
  )

  for (const lane of DELEGATE_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const step of model.steps) {
    const x = xFor(step.index)
    const y = yFor(step.lane)
    const classes = ['sd-dot']
    if (step.phase === 'reject') classes.push('is-reject')
    if (step.phase === 'accept') classes.push('is-accept')
    if (step.phase === 'run') classes.push('is-run')
    if (step.phase === 'settle') classes.push('is-final')
    const dot = svgElement('circle', {
      'data-reveal': '',
      cx: x, cy: y, r: 9, class: classes.join(' '), 'data-step': String(step.index),
    })
    dot.append(svgElement('title', {},
      '第 ' + String(step.index) + ' 步 · ' + step.phase + '：' + step.detail))
    svg.append(
      dot,
      svgElement('text', { x, y: height - 20, class: 'axis', 'text-anchor': 'middle' }, String(step.index)),
    )
  }

  target.append(svg)
  revealOnScroll(target)

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步：边界'
    + (model.observations.depthAccepted ? '放行' : '拒绝') + '，'
    + (model.observations.childRan ? '子在会话里执行并' + model.observations.reportKind + '。'
      : '本轮没有产生任何子工作。')
  if (model.observations.childRan && model.observations.reportKind === 'fail') {
    message += '失败也是一次完整结算——父对话必须知道发生了什么。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#sd-form'),
    depth: document.querySelector('#depth'),
    outcome: document.querySelector('#outcome'),
    feedback: document.querySelector('#sd-feedback'),
    flow: document.querySelector('#sd-plot'),
    flowNote: document.querySelector('#sd-note'),
    tableBody: document.querySelector('#sd-table-body'),
    tableCaption: document.querySelector('#sd-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    childran: document.querySelector('#metric-childran'),
    depth: document.querySelector('#metric-depth'),
    report: document.querySelector('#metric-report'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  const rebuild = () => {
    try {
      const input = {
        depth: elements.depth.value,
        outcome: elements.outcome.value,
      }
      const model = buildSubagentDelegateModel(input)
      const verdict = evaluateSubagentDelegateOracle(model)

      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.tableBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.phase === 'reject' ? 'skip'
          : step.phase === 'accept' ? 'accept'
          : step.phase === 'settle' ? 'final' : 'plain',
        cells: [
          String(step.index),
          step.lane,
          step.phase,
          step.detail,
          typeof step.reportKind === 'string' ? step.reportKind : '—',
        ],
      })))
      writeText(elements.tableCaption, '当前输入的全部 ' + String(model.steps.length) + ' 步')

      writeText(elements.childran, model.observations.childRan ? '是' : '否')
      writeText(elements.depth, model.observations.depthAccepted ? '通过' : '拒绝')
      writeText(elements.report, model.observations.reportKind ?? '—')
      setFeedback('已推演：边界' + (model.observations.depthAccepted ? '放行' : '拒绝')
        + '，子' + (model.observations.childRan ? '已启动' : '未启动') + '。', 'success')
      persistState()
    } catch (error) {
      console.error('[subagent-delegate] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        depth: elements.depth.value,
        outcome: elements.outcome.value,
      }, DELEGATE_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.depth, elements.outcome]) {
    control.addEventListener('change', rebuild)
  }

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, DELEGATE_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.depth.value = restored.value.depth
    elements.outcome.value = restored.value.outcome
  }

  rebuild()

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可，状态就在 #state= 后面。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'rejected-at-boundary',
    explain: {
      'spawns-anyway': 'DEPTH_LIMIT_ENFORCED 不允许它发生：上限是拦截，不是记录。',
      'rejected-at-boundary': '正确。超限委派在边界处被拒，LANE_ISOLATION 同时确认子泳道完全为空。',
      'spawns-silent': 'REPORT_SETTLES 要求启动过的子工作恰好回报一次——但这里根本不会启动。',
    },
  })
}
