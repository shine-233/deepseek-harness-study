/**
 * 流式装配实验页的渲染层。模型在 llm-stream-model.js，本文件只画返回值。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, bindRangeKeys, bindAutoAdvance, installScrollProgress } from './study-lab-kit.js'
import {
  STREAM_SCENARIOS,
  buildStreamModel,
  evaluateStreamOracle,
} from './llm-stream-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STREAM_STATE_SCHEMA = {
  scenario: { enum: STREAM_SCENARIOS.map(scenario => scenario.id) },
  upTo: { integerRange: [0, 99] },
}

const KIND_CLASS = { text: 'st-text', reasoning: 'st-reasoning', 'tool-call': 'st-tool' }

function renderStream(model, target, note) {
  const slot = 64
  const laneHeight = 66
  const top = 34
  const left = 110
  const width = Math.max(900, left + model.observations.totalArrivals * slot + 24)
  const height = top + laneHeight * 2 + 46
  const xFor = arrival => left + arrival * slot + slot / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'stream-svg-title stream-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'stream-svg-title' }, '到达序列与接受结果'),
    svgElement('desc', { id: 'stream-svg-desc' },
      '上排一格是一个按到达顺序进来的 chunk；下排只画被装配器接受的块；'
      + '红描边方块是被拒绝的迟到重复。颜色只区分 chunk 类型。'),
  )

  const acceptedY = top + laneHeight + laneHeight / 2
  const arrivedY = top + laneHeight / 2
  svg.append(
    svgElement('text', { x: left - 14, y: arrivedY + 5, class: 'axis', 'text-anchor': 'end' }, '已到达'),
    svgElement('text', { x: left - 14, y: acceptedY + 5, class: 'axis', 'text-anchor': 'end' }, '已接受'),
    svgElement('line', { x1: left, y1: arrivedY, x2: width - 18, y2: arrivedY, class: 'grid' }),
    svgElement('line', { x1: left, y1: acceptedY, x2: width - 18, y2: acceptedY, class: 'grid' }),
  )

  for (const chunk of model.arrivals) {
    const rejectedHere = model.rejected.some(item => item.arrival === chunk.arrival)
    const rect = svgElement('rect', {
      'data-reveal': '',
      x: xFor(chunk.arrival) - slot / 2 + 3,
      y: arrivedY - 12,
      width: slot - 6,
      height: 24,
      rx: 4,
      class: (KIND_CLASS[chunk.kind] ?? 'st-text') + (rejectedHere ? ' is-rejected' : ''),
    })
    rect.append(svgElement('title', {},
      '#' + String(chunk.arrival) + ' · ' + chunk.kind + '：' + chunk.text
      + (rejectedHere ? '（被拒绝）' : '')))
    svg.append(rect)
    svg.append(svgElement('text', {
      x: xFor(chunk.arrival), y: height - 16, class: 'axis', 'text-anchor': 'middle',
    }, String(chunk.arrival)))
  }

  let cursor = left
  for (const chunk of model.accepted) {
    const w = Math.max(30, Math.min(slot * 1.4, chunk.text.length * 9 + 14))
    const block = svgElement('rect', {
      x: cursor, y: acceptedY - 13, width: w, height: 26, rx: 5,
      class: (KIND_CLASS[chunk.kind] ?? 'st-text') + ' accepted',
    })
    block.append(svgElement('title', {}, chunk.kind + '：' + chunk.text))
    svg.append(block)
    cursor += w + 8
  }
  if (model.accepted.length === 0) {
    svg.append(svgElement('text', { x: left, y: acceptedY + 5, class: 'axis' }, '（还没有接受的块）'))
  }

  target.append(svg)
  revealOnScroll(target)
  const late = model.input.scenario === 'late-duplicate'
  writeText(note, late && model.observations.finished
    ? '迟到的那份「好的，」到达了但被拒绝——正文里它只出现一次，这就是装配器的防线。'
    : '拖动滑块推进到达序列；迟到增量在最后一步才出现。')
}

function initializePage() {
  const elements = {
    form: document.querySelector('#stream-form'),
    scenario: document.querySelector('#scenario'),
    scenarioNote: document.querySelector('#scenario-note'),
    upto: document.querySelector('#upto'),
    uptoOutput: document.querySelector('#upto-output'),
    feedback: document.querySelector('#stream-feedback'),
    plot: document.querySelector('#stream-plot'),
    note: document.querySelector('#stream-note'),
    messageText: document.querySelector('#message-text'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    arrived: document.querySelector('#metric-arrived'),
    accepted: document.querySelector('#metric-accepted'),
    rejected: document.querySelector('#metric-rejected'),
    chars: document.querySelector('#metric-chars'),
    tools: document.querySelector('#metric-tools'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const scenario of STREAM_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario.id
    writeText(option, scenario.label)
    elements.scenario.append(option)
  }

  const rebuild = () => {
    try {
      const model = buildStreamModel({
        scenario: elements.scenario.value,
        upTo: Number(elements.upto.value),
      })
      const verdict = evaluateStreamOracle(model)

      elements.upto.max = String(model.observations.totalArrivals)
      writeText(elements.uptoOutput, String(Math.min(Number(elements.upto.value), model.observations.totalArrivals)))
      writeText(elements.scenarioNote, model.scenario.description)

      renderStream(model, elements.plot, elements.note)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      writeText(elements.messageText, model.messageText === '' ? '（空）' : model.messageText)

      writeText(elements.arrived, String(model.observations.arrivedCount))
      writeText(elements.accepted, String(model.observations.acceptedCount))
      writeText(elements.rejected, String(model.observations.rejectedCount))
      writeText(elements.chars, String(model.observations.messageChars))
      writeText(elements.tools, String(model.observations.toolCalls))
      setFeedback('已装配到第 ' + String(model.input.upTo) + ' 个到达：接受 '
        + String(model.observations.acceptedCount) + '、拒绝 '
        + String(model.observations.rejectedCount) + '。', 'success')
      persistState()
    } catch (error) {
      console.error('[stream] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        upTo: Number(elements.upto.value),
      }, STREAM_STATE_SCHEMA))
    } catch {
      // 状态链接是增强，不是前提。
    }
  }

  elements.form.addEventListener('submit', (event) => { event.preventDefault(); rebuild() })
  elements.scenario.addEventListener('change', () => {
    elements.upto.value = elements.upto.max
    rebuild()
  })
  elements.upto.addEventListener('input', rebuild)
  // 焦点在页面其它地方时，← / → / Home / End 直接步进这条主时间轴。
  bindRangeKeys(elements.upto)
  const playButton = document.querySelector('#frame-play')
  if (playButton instanceof HTMLButtonElement) bindAutoAdvance(playButton, elements.upto, { stepMs: 320 })

  const restored = readStateFromHash(location.hash, STREAM_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.upto.value = String(restored.value.upTo)
  }

  rebuild()
  if (Number(elements.upto.value) > Number(elements.upto.max)) {
    elements.upto.value = elements.upto.max
    rebuild()
  }

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可。', 'error')
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
    correct: 'once',
    explain: {
      once: 'LATE_DUPLICATE_IGNORED 这条校验固定了它：finish 后的重复增量被拒绝，正文里只有最初那份。',
      twice: '那样消息就被污染了——同一段话出现两遍正是装配器要防的事故。',
      zero: '拒绝的只是迟到的重复块，已经接受的部分不受影响。',
    },
  })
}
