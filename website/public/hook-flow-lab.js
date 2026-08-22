/**
 * Hook 瀑布短路实验页的渲染层。
 *
 * 模型在 hook-flow-model.js；本文件只画返回值。时间线、步骤表和读数读的是
 * 同一个 steps 数组，所以三者不可能互相矛盾。
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
  HOOK_LANES,
  buildHookFlowModel,
  evaluateHookFlowOracle,
} from './hook-flow-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：两个维度都是受控枚举；越界值在恢复时会被模型的
// 校验拒绝并给出明确反馈。
const HOOK_STATE_SCHEMA = {
  behavior: { enum: ['call-next', 'return-direct'] },
  verdict: { enum: ['allow', 'deny'] },
}

function renderFlow(model, target, note) {
  const slot = 64
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + HOOK_LANES.length * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + HOOK_LANES.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'hook-svg-title hook-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'hook-svg-title' }, '瀑布事件的有序步骤'),
    svgElement('desc', { id: 'hook-svg-desc' },
      '纵轴是参与方：调用方、审计监听器、策略监听器和默认放行；横轴是步骤序号。'
      + '实心点是真实执行的动作，虚线圆环是被短路跳过的兜底，最后一格写在调用方泳道上。'),
  )

  for (const lane of HOOK_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const step of model.steps) {
    const x = xFor(step.index)
    const y = yFor(step.lane)
    const classes = ['hf-dot']
    if (step.phase === 'decide') classes.push('is-decide')
    if (step.phase === 'skip') classes.push('is-skip')
    if (step.phase === 'final') classes.push('is-final')
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

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步：进入 '
    + String(model.observations.executedListeners) + ' 个监听器，最终结果 '
    + model.observations.finalVerdict + '（由' + model.observations.finalAuthor + '写出）。'
  if (model.observations.shortCircuited) {
    message += '策略监听器直接 return：控制权没有交还，兜底连执行的机会都没有。'
  } else {
    message += '策略监听器把控制权交还了链条，兜底按规则接住了这一棒。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#hook-form'),
    behavior: document.querySelector('#behavior'),
    verdict: document.querySelector('#verdict'),
    feedback: document.querySelector('#hook-feedback'),
    flow: document.querySelector('#hook-plot'),
    flowNote: document.querySelector('#hook-note'),
    chainBody: document.querySelector('#chain-table-body'),
    chainCaption: document.querySelector('#chain-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    executed: document.querySelector('#metric-executed'),
    skipped: document.querySelector('#metric-skipped'),
    fallback: document.querySelector('#metric-fallback'),
    final: document.querySelector('#metric-final'),
    author: document.querySelector('#metric-author'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  const rebuild = () => {
    try {
      const input = {
        behavior: elements.behavior.value,
        verdict: elements.verdict.value,
      }
      const model = buildHookFlowModel(input)
      const verdict = evaluateHookFlowOracle(model)

      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.chainBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.phase === 'skip' ? 'skip'
          : step.phase === 'final' ? 'final'
          : step.phase === 'decide' ? 'decide' : 'plain',
        cells: [
          String(step.index),
          step.lane,
          step.phase,
          step.detail,
          typeof step.action === 'string' ? step.action : '—',
        ],
      })))
      writeText(elements.chainCaption, '当前输入的全部 ' + String(model.steps.length) + ' 步')

      writeText(elements.executed, String(model.observations.executedListeners))
      writeText(elements.skipped, String(model.steps.filter(step => step.phase === 'skip').length))
      writeText(elements.fallback, model.observations.fallbackReached ? '是' : '否')
      writeText(elements.final, model.observations.finalVerdict)
      writeText(elements.author, model.observations.finalAuthor)
      setFeedback('已推演：进入 ' + String(model.observations.executedListeners)
        + ' 个监听器，短路=' + (model.observations.shortCircuited ? '是' : '否')
        + '，最终结果 ' + model.observations.finalVerdict + '（'
        + model.observations.finalAuthor + '）。', 'success')
      persistState()
    } catch (error) {
      console.error('[hook-flow] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  // replaceState 在 file:// 或沙箱环境下可能被拒；状态链接是增强，不是前提。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        behavior: elements.behavior.value,
        verdict: elements.verdict.value,
      }, HOOK_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.behavior, elements.verdict]) {
    control.addEventListener('change', rebuild)
  }

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, HOOK_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.behavior.value = restored.value.behavior
    elements.verdict.value = restored.value.verdict
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
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'short-circuit',
    explain: {
      'fallback-runs': '那需要策略监听器先把控制权交还给链条——DELEGATE_ORDER 这条校验显示，只有调用 next 之后兜底才有机会执行。',
      'short-circuit': 'SHORT_CIRCUIT_RULE 和 FINAL_AUTHOR 两条校验一起固定了它：直接 return 不交还控制权，兜底被跳过，策略返回的 deny 就是最终结果。',
      'no-result': '短路只跳过兜底，不吞掉结果——策略返回的对象本身就是最终结果，FINAL_AUTHOR 校验写明了它的作者。',
    },
  })
}
