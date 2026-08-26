/**
 * 上下文压缩实验页的渲染层。
 *
 * 模型在 compaction-model.js；本文件只画返回值。折叠图、节点表和读数读的是同一个
 * surfaceNodes 数组，所以三者不可能互相矛盾。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, bindRangeKeys, bindAutoAdvance, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  COMPACTION_SCENARIOS,
  buildCompactionModel,
  evaluateCompactionOracle,
} from './compaction-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'

// 状态链接的输入契约：场景和篡改实验是枚举，保留轮数的上限由模型在运行时给出，
// 所以这里只卡整数下界；越界值在恢复时会被拉回当前场景的总轮数。
const COMPACTION_STATE_SCHEMA = {
  scenario: { enum: COMPACTION_SCENARIOS.map(scenario => scenario.id) },
  keepRecent: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
  faultType: { enum: ['none', 'lossy-summary'] },
}

const EVENT_CLASSES = {
  'user-message': 'ev-user',
  'tool-call': 'ev-call',
  'tool-result': 'ev-result',
  'assistant-message': 'ev-assistant',
  'assistant-chunk': 'ev-chunk',
}

function renderFold(model, target, note) {
  const events = model.turns.flatMap(turn => turn.events)
  const slot = 24
  const laneHeight = 66
  const top = 40
  const left = 96
  const width = Math.max(900, left + events.length * slot + 24)
  const height = top + laneHeight * 2 + 46
  const xFor = sequence => left + sequence * slot + slot / 2

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'fold-svg-title fold-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'fold-svg-title' }, '原始事件与压缩后表面的对应'),
    svgElement('desc', { id: 'fold-svg-desc' },
      '上排一格是一条原始事件，位置是它的序号；下排一个节点横跨它引用的事件序号范围，'
      + '摘要节点用虚线边框并连回它替换的范围。矩形长度编码覆盖的事件数，不编码 token。'),
  )

  const eventY = top + laneHeight / 2
  const nodeY = top + laneHeight + laneHeight / 2
  svg.append(
    svgElement('text', { x: left - 14, y: eventY + 5, class: 'axis', 'text-anchor': 'end' }, '原始事件'),
    svgElement('text', { x: left - 14, y: nodeY + 5, class: 'axis', 'text-anchor': 'end' }, '表面节点'),
    svgElement('line', { x1: left, y1: eventY, x2: width - 18, y2: eventY, class: 'grid' }),
    svgElement('line', { x1: left, y1: nodeY, x2: width - 18, y2: nodeY, class: 'grid' }),
  )

  // 先画引用连线再画矩形：连线是关系，矩形是节点。
  const summary = model.summary
  if (summary !== null) {
    const seqs = summary.sourceEventSeqs
    const first = Math.min(...seqs)
    const last = Math.max(...seqs)
    const summaryLeft = xFor(first) - slot / 2 + 1
    const summaryRight = xFor(last) + slot / 2 - 1
    svg.append(
      svgElement('path', {
        d: 'M ' + String(summaryLeft) + ' ' + String(nodeY - 12)
          + ' L ' + String(summaryLeft) + ' ' + String(eventY + 14)
          + ' M ' + String(summaryRight) + ' ' + String(nodeY - 12)
          + ' L ' + String(summaryRight) + ' ' + String(eventY + 14),
        class: 'cite-link',
      }),
    )
  }

  for (const entry of events) {
    const rect = svgElement('rect', {
      'data-reveal': '',
      x: xFor(entry.sequence) - slot / 2 + 2,
      y: eventY - 10,
      width: slot - 4,
      height: 20,
      rx: 3,
      class: 'ev ' + (EVENT_CLASSES[entry.kind] ?? 'ev-assistant'),
    })
    rect.append(svgElement('title', {},
      '#' + String(entry.sequence) + ' · ' + entry.label + ' · 约 ' + String(entry.tokens) + ' token'))
    svg.append(rect)
  }

  model.surfaceNodes.forEach((node, index) => {
    const first = Math.min(...node.sourceEventSeqs)
    const last = Math.max(...node.sourceEventSeqs)
    const classes = ['fold-node']
    if (node === summary) classes.push('is-summary')
    const rect = svgElement('rect', {
      'data-reveal': '',
      x: xFor(first) - slot / 2 + 1,
      y: nodeY - 11,
      width: last - first + slot - 2,
      height: 22,
      rx: 4,
      class: classes.join(' '),
      'data-node': String(index),
    })
    rect.append(svgElement('title', {},
      node.label + ' · 引用 ' + String(node.sourceEventSeqs.length) + ' 条事件 · 约 '
      + String(node.tokens) + ' token'))
    svg.append(rect)
    if (node === summary) {
      svg.append(svgElement('text', {
        x: (xFor(first) + xFor(last)) / 2,
        y: nodeY + 30,
        class: 'axis',
        'text-anchor': 'middle',
      }, '摘要'))
    }
  })

  for (let sequence = 0; sequence < events.length; sequence += 8) {
    svg.append(svgElement('text', {
      x: xFor(sequence), y: height - 16, class: 'axis', 'text-anchor': 'middle',
    }, String(sequence)))
  }

  target.append(svg)
  revealOnScroll(target)
  const saved = model.observations.savedRatio
  let message
  if (summary === null) {
    message = '保留轮数不少于总轮数：没有节点被替换，surface 就是完整的折叠视图。'
  } else {
    message = '最近 ' + String(model.input.keepRecent) + ' 轮原样保留，其余 '
      + String(model.observations.nodesBefore - model.observations.nodesAfter + 1)
      + ' 个节点换成一份摘要（估算 ' + String(model.observations.summaryTokens) + ' token）。'
      + '事件数不变：' + String(model.observations.eventCount) + ' 条一条不少。'
    if (saved < 15 && saved > 0) {
      message += ' 这个形状只省下 ' + String(saved) + '%——大头在最近一轮里，压缩救不了它。'
    }
  }
  writeText(note, message)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#compaction-form'),
    scenario: document.querySelector('#scenario'),
    scenarioNote: document.querySelector('#scenario-note'),
    keepRecent: document.querySelector('#keep-recent'),
    keepOutput: document.querySelector('#keep-output'),
    faultType: document.querySelector('#fault-type'),
    feedback: document.querySelector('#compaction-feedback'),
    fold: document.querySelector('#fold-plot'),
    foldNote: document.querySelector('#fold-note'),
    nodesBody: document.querySelector('#nodes-table-body'),
    nodesCaption: document.querySelector('#nodes-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    events: document.querySelector('#metric-events'),
    nodes: document.querySelector('#metric-nodes'),
    before: document.querySelector('#metric-before'),
    after: document.querySelector('#metric-after'),
    saved: document.querySelector('#metric-saved'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const scenario of COMPACTION_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario.id
    writeText(option, scenario.label)
    elements.scenario.append(option)
  }

  const rebuild = () => {
    try {
      const model = buildCompactionModel({
        scenario: elements.scenario.value,
        keepRecent: Number(elements.keepRecent.value),
        fault: elements.faultType.value,
      })
      const verdict = evaluateCompactionOracle(model)

      // 换场景时轮数会变，上限跟着走；滑块停在越界值上等于要求不存在的保留轮。
      elements.keepRecent.max = String(model.turns.length)
      writeText(elements.keepOutput, String(model.input.keepRecent))

      writeText(elements.scenarioNote, model.scenario.description)
      renderFold(model, elements.fold, elements.foldNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.nodesBody, model.surfaceNodes.map((node, index) => ({
        key: String(index),
        state: node === model.summary ? 'summary' : 'plain',
        cells: [
          node.label,
          node.turn,
          node.sourceEventSeqs.join('、'),
          String(node.tokens),
        ],
      })))
      writeText(elements.nodesCaption, '当前表面的 ' + String(model.surfaceNodes.length)
        + ' 个节点，估算合计 ' + String(model.observations.tokensAfter) + ' token')

      writeText(elements.events, String(model.observations.eventCount))
      writeText(elements.nodes, String(model.observations.nodesBefore) + ' → '
        + String(model.observations.nodesAfter))
      writeText(elements.before, String(model.observations.tokensBefore))
      writeText(elements.after, String(model.observations.tokensAfter))
      writeText(elements.saved, String(model.observations.savedRatio) + '%')
      if (!verdict.pass) {
        setFeedback('注入的故障被独立校验抓住了：下方未通过的那条给出被违反的规则和缺失的引用。', 'error')
      } else if (elements.faultType.value !== 'none' && model.summary === null) {
        setFeedback('这次折叠没有任何节点被替换，摘要无从漏引——把保留轮数调小再注入。', 'notice')
      } else {
        setFeedback('已重新折叠：' + String(model.observations.eventCount) + ' 条事件折成 '
          + String(model.observations.nodesAfter) + ' 个表面节点，估算 '
          + String(model.observations.tokensBefore) + ' → ' + String(model.observations.tokensAfter)
          + ' token。', 'success')
      }
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  // replaceState 在 file:// 或沙箱环境下可能被拒；状态链接是增强，不是前提。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        keepRecent: Number(elements.keepRecent.value),
        faultType: elements.faultType.value,
      }, COMPACTION_STATE_SCHEMA)
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
  elements.scenario.addEventListener('change', () => {
    // 换场景时轮数会变，先把滑块拉回 2，避免停在一个不存在的保留轮数上。
    elements.keepRecent.value = String(Math.min(2, Number(elements.keepRecent.max) || 0))
    rebuild()
  })
  elements.keepRecent.addEventListener('input', rebuild)
  elements.faultType.addEventListener('change', rebuild)
  // 焦点在页面其它地方时，← / → / Home / End 直接步进保留轮数。
  bindRangeKeys(elements.keepRecent)
  const playButton = document.querySelector('#frame-play')
  if (playButton instanceof HTMLButtonElement) bindAutoAdvance(playButton, elements.keepRecent, { stepMs: 800 })

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, COMPACTION_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.keepRecent.value = String(restored.value.keepRecent)
    elements.faultType.value = restored.value.faultType
  }

  rebuild()
  if (Number(elements.keepRecent.value) > Number(elements.keepRecent.max)) {
    elements.keepRecent.value = elements.keepRecent.max
    rebuild()
  }

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

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // surfaceNodes 就是下一次请求真正看到的东西：一条摘要 + 近端保留的事件。
    const toSteps = model => model.surfaceNodes.map(node => ({
      lane: '请求上下文',
      phase: node.kind === 'compaction-summary' ? 'summary' : 'kept',
      detail: `${node.label}（${node.tokens} tok）`,
      index: node.sourceEventSeqs?.[0] ?? 0,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'compaction-ladder',
      rungs: replayRungs([
        {
          title: '全部保留：上下文就是完整历史',
          text: '保留轮数拉满时，每一轮的每条事件都原样进入下一次请求。先看这条不折叠的基线。',
          traces: [{ id: 'keep-all', label: '全部保留', steps: toSteps(buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 12 })) }],
        },
        {
          title: '近重留、旧重折：一条摘要顶替一段历史',
          text: '只保留最近几轮，更早的事件被折叠成一条 compaction-summary。信息还在，粒度变了。',
          traces: [{ id: 'fold', label: '折叠旧轮', steps: toSteps(buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 3 })), focusPhases: ['summary'] }],
        },
        {
          title: '有损摘要：省 token 的代价看得见',
          text: '篡改实验把摘要换成有损版本——省下了 token，也丢掉了细节。压缩从来不是免费的，只是把损失换了个位置。',
          traces: [{ id: 'lossy', label: '有损摘要', steps: toSteps(buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 3, fault: 'lossy-summary' })), focusPhases: ['summary'] }],
        },
      ]),
    })
  }

  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'unchanged',
      hint: '压缩替换的是视图，底层日志一条不少——自己重放一遍就有答案。',
    explain: {
      unchanged: 'LOG_APPEND_ONLY 这条校验固定了它：压缩替换的是 surface，日志只追加。',
      fewer: '那样会破坏可重建性——被替换的内容必须仍能从日志逐条找回。',
      depends: '无论保留几轮，替换都只发生在 surface；原始事件一条不动。',
    },
  })
}
