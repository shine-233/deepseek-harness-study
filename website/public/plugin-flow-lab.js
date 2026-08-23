/**
 * 插件事件流实验页的渲染层。
 *
 * 模型在 plugin-flow-model.js；本文件只画返回值。时间线、步骤表和读数读的是
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
import { installInputReset } from './study-lab-kit.js'
import {
  PLUGIN_LANES,
  PLUGIN_SCENARIOS,
  buildPluginFlowModel,
  evaluatePluginFlowOracle,
} from './plugin-flow-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：场景与订阅是枚举，预览长度只卡整数下界；
// 越界值在恢复时会被模型的校验拒绝并给出明确反馈。
const FLOW_STATE_SCHEMA = {
  scenario: { enum: PLUGIN_SCENARIOS.map(scenario => scenario.id) },
  subscribed: { enum: ['yes', 'no'] },
  maxLength: { integerRange: [0, 60] },
}

const LANE_LABELS = {
  '工具': '工具',
  '事件总线': '事件总线',
  '观察插件': '观察插件',
  'Session 日志': 'Session 日志',
}

function renderFlow(model, target, note) {
  const slot = 64
  const laneHeight = 58
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.steps.length * slot + 24)
  const height = top + model.lanesLength() * laneHeight + 42
  const xFor = index => left + index * slot + 30
  const yFor = lane => top + model.lanes.indexOf(lane) * laneHeight + laneHeight / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'flow-svg-title flow-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'flow-svg-title' }, '最小插件事件流的有序步骤'),
    svgElement('desc', { id: 'flow-svg-desc' },
      '纵轴是参与方：工具、事件总线、观察插件和 Session 日志；横轴是步骤序号。'
      + '实心点是插件写了预览的步骤，虚线圆环是卸载，日志 lane 的每一步都由宿主写入。'),
  )

  for (const lane of PLUGIN_LANES) {
    const y = yFor(lane)
    svg.append(
      svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, LANE_LABELS[lane] ?? lane),
      svgElement('line', { x1: left, y1: y, x2: width - 18, y2: y, class: 'grid' }),
    )
  }

  for (const entry of model.steps) {
    const x = xFor(entry.index)
    const y = yFor(entry.lane)
    const classes = ['pf-dot']
    if (entry.phase === 'preview') classes.push('is-preview')
    if (entry.phase === 'unload') classes.push('is-unload')
    if (entry.phase === 'skip') classes.push('is-skip')
    if (entry.phase === 'broadcast') classes.push('is-broadcast')
    const dot = svgElement('circle', {
      'data-reveal': '',
      cx: x, cy: y, r: 9, class: classes.join(' '), 'data-step': String(entry.index),
    })
    dot.append(svgElement('title', {},
      '第 ' + String(entry.index) + ' 步 · ' + entry.phase + '：' + entry.detail))
    svg.append(
      dot,
      svgElement('text', { x, y: height - 20, class: 'axis', 'text-anchor': 'middle' }, String(entry.index)),
    )
  }

  target.append(svg)
  revealOnScroll(target)

  let message = '这条时间线共 ' + String(model.observations.steps) + ' 步：'
    + String(model.observations.broadcasts) + ' 次广播、'
    + String(model.observations.loggedEvents) + ' 条宿主日志、'
    + String(model.observations.previewsWritten) + ' 条预览。'
  if (!model.input.subscribed) {
    message += '插件未订阅：广播从它面前经过，什么也不会发生。'
  } else if (model.input.scenario === 'denied') {
    message += '策略拒绝了主体执行，但拒绝结果照样产生事件、照样入册。'
  } else if (model.input.scenario === 'unload-midway') {
    message += '卸载之后第二次广播没有产生预览——订阅已经随效果注销一起消失，而日志照记。'
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#flow-form'),
    scenario: document.querySelector('#scenario'),
    scenarioNote: document.querySelector('#scenario-note'),
    subscribed: document.querySelector('#subscribed'),
    maxLength: document.querySelector('#max-length'),
    lengthOutput: document.querySelector('#length-output'),
    feedback: document.querySelector('#flow-feedback'),
    flow: document.querySelector('#flow-plot'),
    flowNote: document.querySelector('#flow-note'),
    stepsBody: document.querySelector('#steps-table-body'),
    stepsCaption: document.querySelector('#steps-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    steps: document.querySelector('#metric-steps'),
    broadcasts: document.querySelector('#metric-broadcasts'),
    logs: document.querySelector('#metric-logs'),
    previews: document.querySelector('#metric-previews'),
    effects: document.querySelector('#metric-effects'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const scenario of PLUGIN_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario.id
    writeText(option, scenario.label)
    elements.scenario.append(option)
  }

  // lanes 不是模型输出的一部分（模型里是常量 PLUGIN_LANES），
  // 这里挂到模型对象上让渲染层少传一个参数。
  const rebuild = () => {
    try {
      const input = {
        scenario: elements.scenario.value,
        subscribed: elements.subscribed.value === 'yes',
        maxLength: Number(elements.maxLength.value),
      }
      const model = buildPluginFlowModel(input)
      model.lanes = PLUGIN_LANES
      model.lanesLength = () => PLUGIN_LANES.length
      const verdict = evaluatePluginFlowOracle(model)

      writeText(elements.scenarioNote, model.scenario.description)
      renderFlow(model, elements.flow, elements.flowNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.stepsBody, model.steps.map(entry => ({
        key: String(entry.index),
        state: entry.phase === 'preview' ? 'preview'
          : entry.phase === 'skip' ? 'skip'
          : entry.phase === 'log' ? 'log' : 'plain',
        cells: [
          String(entry.index),
          LANE_LABELS[entry.lane] ?? entry.lane,
          entry.phase,
          entry.detail,
          entry.phase === 'log' ? '✓' : '—',
          entry.effectChange ?? '—',
          typeof entry.previewText === 'string' ? entry.previewText : '—',
        ],
      })))
      writeText(elements.stepsCaption, '当前场景的全部 ' + String(model.steps.length) + ' 步')

      writeText(elements.steps, String(model.observations.steps))
      writeText(elements.broadcasts, String(model.observations.broadcasts))
      writeText(elements.logs, String(model.observations.loggedEvents))
      writeText(elements.previews, String(model.observations.previewsWritten))
      writeText(elements.effects, String(model.observations.effectsActiveAtEnd))
      setFeedback('已推演：' + String(model.observations.steps) + ' 步、'
        + String(model.observations.previewsWritten) + ' 条预览，结束时活跃效果 '
        + String(model.observations.effectsActiveAtEnd) + ' 个。', 'success')
      persistState()
    } catch (error) {
      console.error('[plugin-flow] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  // replaceState 在 file:// 或沙箱环境下可能被拒；状态链接是增强，不是前提。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        subscribed: elements.subscribed.value,
        maxLength: Number(elements.maxLength.value),
      }, FLOW_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.scenario, elements.subscribed]) {
    control.addEventListener('change', rebuild)
  }
  elements.maxLength.addEventListener('input', () => {
    writeText(elements.lengthOutput, elements.maxLength.value)
    rebuild()
  })

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, FLOW_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.subscribed.value = restored.value.subscribed
    elements.maxLength.value = String(restored.value.maxLength)
  }
  writeText(elements.lengthOutput, elements.maxLength.value)

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
    correct: 'logged-only',
    explain: {
      'logged-only': 'LOG_COMPLETE 和 UNLOAD_SEMANTICS 两条校验一起固定了这个组合：日志由宿主写入，订阅只决定插件收不收得到广播。',
      neither: '那就违反「call 与 result 全部入册」——日志完整性不依赖任何插件的存活。',
      'still-preview': '监听已经随卸载注销了；广播找不到接收者，预览无从谈起。',
    },
  })
}
