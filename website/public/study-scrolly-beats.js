/**
 * 课程页滚动引导的场景定义：Session 日志与恢复、上下文压缩。
 *
 * 每个场景导出 `{ beats, buildStage }`：beats 是右侧卡片的固定文案，buildStage
 * 接收舞台元素并返回按拍索引重绘的函数。所有数字都在模块加载时从与实验页相同的
 * 纯模型算出（session-log-model、session-fork-model、compaction-model），文案里
 * 不出现模型之外的教学数据；本模块在 Node 里可无 DOM 导入，DOM 只出现在构建函数内。
 */

import { buildCompactionModel, evaluateCompactionOracle } from './compaction-model.js'
import { buildSessionForkModel } from './session-fork-model.js'
import { buildSessionLogModel } from './session-log-model.js'

const cleanFull = buildSessionLogModel({ scenario: 'clean' })
const cleanStart = buildSessionLogModel({ scenario: 'clean', upTo: 2 })
const cleanMiddle = buildSessionLogModel({ scenario: 'clean', upTo: 4 })
const unknownRequired = buildSessionLogModel({ scenario: 'unknown-required' })
const crashedFork = buildSessionForkModel({ crash: 'crash-mid-tool', fork: 'fork' })

const requiredRefused = unknownRequired.partial.dispositions.find(entry => entry.disposition === 'refused')
const requiredNotReached = unknownRequired.partial.dispositions.filter(entry => entry.disposition === 'not-reached').length

const compaction = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })
const compactionOracle = evaluateCompactionOracle(compaction)
const compactionObs = compaction.observations
const citedSeqCount = compaction.summary.sourceEventSeqs.length
const oraclePassCount = compactionOracle.checks.filter(check => check.pass).length

const DISPOSITION_TEXT = Object.freeze({
  applied: '已应用',
  skipped: '跳过',
  refused: '拒绝',
  'not-reached': '未到达',
})

function element(tag, className, text) {
  const node = document.createElement(tag)
  if (className !== null) node.className = className
  if (text !== null) node.textContent = text
  return node
}

function entryDetail(entry) {
  const parts = []
  const payload = entry.payload
  if (typeof payload.tool === 'string') parts.push(payload.tool)
  if (payload.ok === true) parts.push('成功')
  if (payload.ok === false) parts.push('失败')
  if (typeof payload.tokens === 'number') parts.push(String(payload.tokens) + ' token')
  if (typeof payload.text === 'string') parts.push(payload.text)
  if (typeof payload.title === 'string') parts.push('标题定为「' + payload.title + '」')
  if (typeof payload.revision === 'number') parts.push('revision ' + String(payload.revision))
  return parts.join(' · ')
}

function logRows(model) {
  const rows = element('ul', 'dsh-scrolly-rows', null)
  for (const disposition of model.partial.dispositions) {
    const entry = model.log.find(candidate => candidate.sequence === disposition.sequence)
    const item = element('li', 'dsh-scrolly-row is-' + disposition.disposition, null)
    item.append(
      element('span', 'dsh-row-seq', '#' + String(disposition.sequence)),
      element('span', 'dsh-row-type', entry.type),
    )
    const detail = entryDetail(entry)
    if (detail !== '') item.append(element('span', 'dsh-row-detail', detail))
    item.append(element('span', 'dsh-row-tag', DISPOSITION_TEXT[disposition.disposition]))
    rows.append(item)
  }
  return rows
}

function logReadout(model) {
  const readouts = model.observations
  const parts = ['已应用 ' + String(readouts.applied) + ' 条']
  if (readouts.skipped > 0) parts.push('跳过 ' + String(readouts.skipped) + ' 条')
  if (readouts.refusedAt !== null) parts.push('在第 ' + String(readouts.refusedAt) + ' 条处拒绝并停止')
  parts.push(String(readouts.messages) + ' 条消息 · 标题「' + (readouts.title ?? '无') + '」 · ' + String(readouts.tokens) + ' token')
  return element('p', 'dsh-scrolly-readout', parts.join('，'))
}

function forkRows(focusPhase) {
  const rows = element('ul', 'dsh-scrolly-rows', null)
  for (const step of crashedFork.steps) {
    const focused = step.phase === focusPhase
    const item = element('li', 'dsh-scrolly-row' + (focused ? ' is-focus' : ''), null)
    item.append(
      element('span', 'dsh-row-seq', '#' + String(step.index)),
      element('span', 'dsh-row-type', step.lane),
      element('span', 'dsh-row-detail', step.detail),
    )
    if (focused) item.append(element('span', 'dsh-row-tag', '这一步'))
    rows.append(item)
  }
  return rows
}

function turnCells() {
  const grid = element('ul', 'dsh-comp-grid', null)
  for (const turn of compaction.turns) {
    const tokens = turn.events.reduce((total, entry) => total + entry.tokens, 0)
    const cell = element('li', 'dsh-comp-cell', null)
    cell.append(
      element('strong', null, turn.label),
      element('small', null, String(turn.events.length) + ' 事件 · ' + String(tokens) + ' token'),
    )
    grid.append(cell)
  }
  return grid
}

function surfaceStrip(focusKept) {
  const strip = element('ul', 'dsh-comp-strip', null)
  for (const node of compaction.surfaceNodes) {
    const isSummary = node.kind === 'compaction-summary'
    const item = element('li', 'dsh-comp-node ' + (isSummary ? 'is-summary' : 'is-kept' + (focusKept ? ' is-focus' : '')), null)
    item.style.flexGrow = String(Math.max(node.tokens, 24))
    item.append(element('strong', null, isSummary ? '压缩摘要' : node.turn))
    item.append(element('small', null, isSummary
      ? String(node.tokens) + ' token · 引用 ' + String(node.sourceEventSeqs.length) + ' 条来源'
      : String(node.tokens) + ' token'))
    strip.append(item)
  }
  return strip
}

function oracleRows() {
  const rows = element('ul', 'dsh-scrolly-rows', null)
  for (const check of compactionOracle.checks) {
    const item = element('li', 'dsh-scrolly-row ' + (check.pass ? 'is-pass' : 'is-fail'), null)
    item.append(
      element('span', 'dsh-row-type', check.label),
      element('span', 'dsh-row-detail', '期望：' + check.expected),
      element('span', 'dsh-row-tag', (check.pass ? '✓ ' : '✗ ') + check.actual),
    )
    rows.append(item)
  }
  return rows
}

const sessionLogViews = [
  () => [logRows(cleanStart), logReadout(cleanStart)],
  () => [logRows(cleanFull), logReadout(cleanFull)],
  () => [logRows(cleanMiddle), logReadout(cleanMiddle)],
  () => [logRows(unknownRequired), logReadout(unknownRequired)],
  () => [forkRows('inherit'), element('p', 'dsh-scrolly-readout',
    '继承前缀长度 ' + String(crashedFork.observations.eventsInherited) + '：parent、seed length 与边界都已记录')],
  () => [forkRows('repair'), element('p', 'dsh-scrolly-readout',
    '恰好补出 1 条 interrupted 修复，结果记为 unknown；幽灵成功：' + String(crashedFork.observations.ghostSuccess))],
]

export const SESSION_LOG_SCROLLY = {
  beats: [
    { title: '事件按序落日志',
      text: '日志开头三条：#0 session-start 把标题定为「' + cleanFull.log[0].payload.title + '」，#1 user-message 带 '
        + String(cleanFull.log[1].payload.tokens) + ' token，#2 tool-call 记下 ' + cleanFull.log[2].payload.tool
        + ' 的调用意图。每条事件的序号就是恢复时的坐标，后面的每个读数都从这些事件折叠出来。' },
    { title: '重放到末尾，状态折叠完成',
      text: String(cleanFull.observations.events) + ' 条事件全部应用后得到：标题「' + cleanFull.observations.title + '」、'
        + String(cleanFull.observations.messages) + ' 条消息、' + String(cleanFull.observations.toolCalls) + ' 次工具调用（其中 '
        + String(cleanFull.observations.toolFailures) + ' 次失败），合计 ' + String(cleanFull.observations.tokens)
        + ' token。状态里没有一处是页面自己记住的——每一项都能指回某条事件。' },
    { title: '恢复就是前缀重放',
      text: '只重放到 #' + String(cleanMiddle.input.upTo) + '：' + String(cleanMiddle.observations.messages) + ' 条消息，标题还停在「'
        + cleanMiddle.observations.title + '」。从头重放到同一位与增量推进到同一位给出完全一致的值——恢复不需要额外快照，重放本身就是恢复。' },
    { title: '必需的未知事件让加载停下',
      text: '读到 #' + String(requiredRefused.sequence) + ' 的 ' + requiredRefused.type + '：读不懂且没标 ignorable，加载在它之前停下；之前 '
        + String(unknownRequired.observations.applied) + ' 条已经折出可用的部分状态，之后 ' + String(requiredNotReached)
        + ' 条一条都不应用——它们建立在一个没人知道的状态上。' },
    { title: 'fork 继承父日志前缀',
      text: '崩溃发生在工具结果到来之前。fork 出子 Session 时，第一步是继承父日志前缀：parent 已记录、seed length='
        + String(crashedFork.observations.eventsInherited) + '、边界已记录——之后的事件属于子工作，父日志一个字都不会改。' },
    { title: 'interrupted 修复记 unknown',
      text: '恢复阶段对那条永远等不到结果的意图补出 interrupted：工具结果记为 unknown，而不是假装成功。这条时间线上不存在「意图有、结果缺、却标记成功」的幽灵成功。' },
  ],
  buildStage(stage) {
    stage.append(element('p', 'dsh-scrolly-figure',
      '每行是一条事件的去向：蓝线＝已应用，虚线＝跳过（ignorable），红线＝拒绝点，暗行＝未到达。读数来自 session-log-model 与 session-fork-model 的纯函数。'))
    const body = element('div', null, null)
    stage.append(body)
    return index => {
      body.replaceChildren(...sessionLogViews[index]())
    }
  },
}

const compactionViews = [
  () => [turnCells(), element('p', 'dsh-scrolly-readout',
    '压缩前：' + String(compactionObs.nodesBefore) + ' 个表面节点 · 估算 ' + String(compactionObs.tokensBefore)
    + ' token · 底层日志 ' + String(compactionObs.eventCount) + ' 条事件')],
  () => [surfaceStrip(false), element('p', 'dsh-scrolly-readout',
    '最近 ' + String(compaction.input.keepRecent) + ' 轮之外的历史替换成 1 个摘要节点：引用 ' + String(citedSeqCount)
    + ' 条来源事件，摘要自身估算 ' + String(compactionObs.summaryTokens) + ' token，surface 从 '
    + String(compactionObs.nodesBefore) + ' 个节点变成 ' + String(compactionObs.nodesAfter) + ' 个')],
  () => [surfaceStrip(true), element('p', 'dsh-scrolly-readout',
    '最近 ' + String(compaction.input.keepRecent) + ' 轮逐字保留；日志事件数不变：' + String(compactionObs.eventCount)
    + ' 条——被替换的是视图，不是事实')],
  () => [oracleRows(), element('p', 'dsh-scrolly-readout',
    '独立校验 ' + String(oraclePassCount) + '/' + String(compactionOracle.checks.length)
    + ' 项通过：它不信任上面任何一行，自己重新折叠一次并逐条核对来源引用')],
]

export const COMPACTION_SCROLLY = {
  beats: [
    { title: '压缩前的 surface',
      text: '十二轮混合会话折叠成 ' + String(compactionObs.nodesBefore) + ' 个表面节点、估算 ' + String(compactionObs.tokensBefore)
        + ' token；支撑它的日志是 ' + String(compactionObs.eventCount) + ' 条原始事件，一条不少。压缩只回答两个问题：保留什么，丢什么。' },
    { title: '替换：历史换成一个摘要',
      text: '最近 ' + String(compaction.input.keepRecent) + ' 轮之外的 ' + String(citedSeqCount) + ' 个节点被替换成一个摘要节点。摘要不是免费的：固定底价加被替换内容的一个比例，这里估算 '
        + String(compactionObs.summaryTokens) + ' token。' },
    { title: '保留什么，丢什么',
      text: '留下的部分：最近 ' + String(compaction.input.keepRecent) + ' 轮逐字保留。丢掉的部分：' + String(citedSeqCount)
        + ' 条事件的原文离开 surface，但它们的序号全部出现在摘要的 sourceEventSeqs 里，日志里仍能逐条找到。' },
    { title: 'oracle 独立核对',
      text: '独立校验不信任渲染层：它重新折叠一次、核对摘要恰好引用被替换事件的序号、检查最近几轮原样保留、逐节点重加估算。'
        + String(oraclePassCount) + '/' + String(compactionOracle.checks.length) + ' 项通过，这份前后对比才可以当作证据使用。' },
  ],
  buildStage(stage) {
    stage.append(element('p', 'dsh-scrolly-figure',
      'token 一栏是构造教学数据上的启发式估计，不是真实 tokenizer 的计数；读数来自 compaction-model 的纯函数。'))
    const body = element('div', null, null)
    stage.append(body)
    return index => {
      body.replaceChildren(...compactionViews[index]())
    }
  },
}
