/**
 * 工作流运行折叠成单个聊天节点的纯模型。
 *
 * 执行层直接复用 orchestration-model 的 buildWorkflowModel（同一条时间线），
 * 再按固定提交 aa6c361a 里两份契约投影：
 *
 *   持久记录（tool-workflow）：仅根传输调用写记录；run-start 在 start() 返回后
 *   追加；成员 start/end 按 run.id 配对；run-end 只在拿到 result 且 dispose()
 *   达成静默之后追加。第一次追加失败即停写——日志要么为空、要么是合法连续
 *   前缀，工具结果不变。invariant 拒绝重复 start、未配对成员、带开放成员的
 *   终局、run-end 之后的更新；接受缺失的终端后缀（那是中断证据，不是损坏）。
 *
 *   UI 折叠（client/ui-workflow-run）：四个事件经 Conversation Node 引擎折成
 *   一个 workflow-run 聊天节点，锚在 run-start 序号上、原工具卡之后；相位分组
 *   只来自真正启动过的成员，精确字符串共享一组，省略 phase 与空字符串不同；
 *   缺终局事实的成员/运行以 interrupted 呈现且不改工具结果。
 *
 * 教学约定：runId 与成员标签是教学常量。没有真实 Session 或 React 渲染。
 */

import { buildWorkflowModel } from './orchestration-model.js'

export const NODE_ENDINGS = Object.freeze(['completed', 'error', 'cancelled'])
export const NODE_SHAPES = Object.freeze(['sequential-2', 'parallel-3-one-fails'])

const RUN_ID = 'wf-run-1'
const META_NAME = 'code-review'

/** 每个脚本形状的成员表：phase 为 undefined 表示「省略」，'' 是显式空串。 */
const MEMBERS = {
  'sequential-2': [
    { seq: 1, phase: '调研', label: 'reader 子代理' },
    { seq: 2, phase: undefined, label: 'writer 子代理' },
  ],
  'parallel-3-one-fails': [
    { seq: 1, phase: '调研', label: 'searcher-A' },
    { seq: 2, phase: '调研', label: 'searcher-B（会失败）' },
    { seq: 3, phase: '', label: 'aggregator（显式空相位）' },
  ],
}

function resolveInput(input = {}) {
  const ending = NODE_ENDINGS.find(item => item === input.ending) ?? 'completed'
  const shape = NODE_SHAPES.find(item => item === input.shape) ?? 'sequential-2'
  const truncated = input.truncated === true
  return { ending, shape, truncated }
}

/** 把执行时间线投影成持久记录流；truncated 时在 run-end 与末个成员端之前截断。 */
function projectRecords(execution, shape, truncated) {
  const members = MEMBERS[shape]
  const records = []
  let startEmitted = false
  let resultKnownAt = null
  let quiescentAt = null

  for (const step of execution.steps) {
    if (step.kind === 'start') {
      records.push({
        order: records.length,
        event: 'tool-workflow/run-start',
        runId: RUN_ID,
        metaName: META_NAME,
        afterStep: step.index,
        anchoredAfterToolNode: true,
      })
      startEmitted = true
      continue
    }
    if (step.event === 'workflow/agent-start') {
      const member = members.find(item => item.seq === step.seq)
      records.push({
        order: records.length,
        event: 'tool-workflow/member-start',
        runId: RUN_ID,
        seq: step.seq,
        // 省略 phase 的成员不携带该字段：空字符串与省略必须可区分。
        ...(member.phase === undefined ? {} : { phase: member.phase }),
        label: member.label,
        afterStep: step.index,
      })
      continue
    }
    if (step.event === 'workflow/agent-end') {
      const outcome = step.outcome === 'child-failed'
        ? 'failed'
        : step.synthesized === true ? 'interrupted' : 'ok'
      records.push({
        order: records.length,
        event: 'tool-workflow/member-end',
        runId: RUN_ID,
        seq: step.seq,
        outcome,
        afterStep: step.index,
      })
      continue
    }
    if (step.kind === 'settle') {
      resultKnownAt = step.index
      continue
    }
    if (step.kind === 'dispose') {
      quiescentAt = step.index
      records.push({
        order: records.length,
        event: 'tool-workflow/run-end',
        runId: RUN_ID,
        stopReason: execution.observations.stopReason,
        agentsStarted: execution.observations.agentEnds,
        afterStep: step.index,
      })
    }
  }

  if (truncated) {
    // 中断证据：截掉尾部终端事件——可能只剩 run-start + 若干成员更新。
    const lastMemberEnd = [...records].reverse().find(record => record.event === 'tool-workflow/member-end')
    const cutBefore = Math.max(0, lastMemberEnd ? records.indexOf(lastMemberEnd) : records.length)
    return { records: records.slice(0, cutBefore), resultKnownAt, quiescentAt }
  }
  return { records, resultKnownAt, quiescentAt }
}

/**
 * 折叠：按日志序消费记录得到一个聊天节点。历史尾只有更新时保持 pending，
 * 直到旧页补出唯一 start；缺终局事实以 interrupted 呈现。
 */
export function buildWorkflowNodeModel(input = {}) {
  const resolved = resolveInput(input)
  const execution = buildWorkflowModel({ ending: resolved.ending, shape: resolved.shape })
  const { records } = projectRecords(execution, resolved.shape, resolved.truncated)

  let context = null
  for (const record of records) {
    if (record.event === 'tool-workflow/run-start') {
      if (context !== null) throw new Error('invariant: duplicate run-start')
      context = { runId: record.runId, metaName: record.metaName, members: new Map(), runEnded: null }
      continue
    }
    if (context === null) throw new Error('invariant: updates before run-start')
    if (context.runEnded !== null) throw new Error('invariant: updates after run-end')
    if (record.event === 'tool-workflow/member-start') {
      if (context.members.has(record.seq)) throw new Error(`invariant: duplicate member seq ${String(record.seq)}`)
      context.members.set(record.seq, {
        seq: record.seq,
        label: record.label,
        phase: Object.prototype.hasOwnProperty.call(record, 'phase') ? record.phase : undefined,
        outcome: null,
      })
      continue
    }
    if (record.event === 'tool-workflow/member-end') {
      const member = context.members.get(record.seq)
      if (member === undefined || member.outcome !== null) throw new Error(`invariant: unpaired member end seq ${String(record.seq)}`)
      member.outcome = record.outcome
      continue
    }
    if (record.event === 'tool-workflow/run-end') {
      const openMembers = [...context.members.values()].filter(member => member.outcome === null)
      if (openMembers.length > 0) throw new Error('invariant: run ended with open members')
      context.runEnded = record.stopReason
    }
  }

  const hasContext = context !== null
  const members = hasContext ? [...context.members.values()] : []
  const allSettled = members.length > 0 && members.every(member => member.outcome !== null)
  const interrupted = !hasContext || context.runEnded === null || !allSettled

  // 相位分组只来自真正启动过的成员；省略 phase 与 '' 分属不同组。
  const phaseGroups = []
  for (const member of members) {
    const key = member.phase === undefined ? '(省略)' : member.phase
    let group = phaseGroups.find(item => item.key === key)
    if (group === undefined) {
      group = { key, exact: member.phase, members: [] }
      phaseGroups.push(group)
    }
    group.members.push(member)
  }

  const runStatus = interrupted ? 'interrupted' : context.runEnded
  const memberOutcome = member => member.outcome ?? 'running'
  const groupSettled = group => group.members.every(member => member.outcome !== null)
  const groupFailed = group => group.members.some(member => memberOutcome(member) === 'failed')

  // 披露初始态：挂载时打开 running/failed/cancelled/interrupted 层级，
  // 完全完成的层级关闭——全部从持久事实重建。
  const levelShouldOpen = () => runStatus !== 'completed'
  const groupShouldOpen = group => !(groupSettled(group) && !groupFailed(group))

  return {
    mode: 'workflow-node',
    input: resolved,
    executionSummary: {
      stopReason: execution.observations.stopReason,
      agentStarts: execution.observations.agentStarts,
    },
    records,
    node: {
      anchor: 'run-start 序号处、原 workflow 工具卡之后',
      runId: RUN_ID,
      metaName: META_NAME,
      status: runStatus,
      toolCardUnchanged: true,
      initialOpen: levelShouldOpen(),
      phases: phaseGroups.map(group => ({
        title: group.key,
        exactPhase: group.exact,
        memberCount: group.members.length,
        initialOpen: groupShouldOpen(group),
        members: group.members.map(member => ({
          seq: member.seq,
          label: member.label,
          status: memberOutcome(member),
        })),
      })),
    },
    observations: {
      records: records.length,
      hasRunEnd: records.some(record => record.event === 'tool-workflow/run-end'),
      openMembersAtCut: members.filter(member => member.outcome === null).length,
      phaseGroupCount: phaseGroups.length,
      emptyVsOmittedSplit: phaseGroups.some(group => group.exact === '') && phaseGroups.some(group => group.exact === undefined),
    },
    canProve: Object.freeze([
      '四个 log-only 事件折成一个聊天节点，锚在 run-start 上且原工具卡不变。',
      '截断后的日志是合法连续前缀：缺 run-end 或缺成员端都按 interrupted 呈现。',
      '相位分组只来自真正启动过的成员；省略 phase 与空字符串分属两组。',
      '披露初始态从持久事实重建：完成层关闭，其余层打开。',
    ]),
    cannotProve: Object.freeze([
      '真实 React 组件的键盘焦点管理。',
      '子会话导航的全部守卫条件（origin、parentId、列表行状态）。',
      '嵌套 Code Mode 调用——它们本来就不写这些记录。',
    ]),
  }
}

export function evaluateWorkflowNodeOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildWorkflowNodeModel(model.input)
  add('FOLD_DETERMINISTIC', '同一输入重放得到同一个节点',
    JSON.stringify(rebuilt.node) === JSON.stringify(model.node) && rebuilt.records.length === model.records.length,
    '两次一致', rebuilt.records.length === model.records.length ? '一致' : '不一致')

  const hasRunEnd = model.observations.hasRunEnd
  if (model.input.truncated) {
    add('LEGAL_PREFIX', '截断日志是合法前缀：没有 run-end，允许开放成员',
      !hasRunEnd, '无 run-end', hasRunEnd ? '出现了 run-end' : '无 run-end')
    add('INTERRUPTED_PRESENTATION', '缺终局事实按 interrupted 呈现且工具结果不变',
      model.node.status === 'interrupted' && model.node.toolCardUnchanged === true,
      'interrupted + 工具卡不变', `${model.node.status} + ${model.node.toolCardUnchanged ? '不变' : '被改'}`)
  } else {
    const last = model.records[model.records.length - 1]
    add('RUN_END_LAST', '完整日志的最后一笔是 run-end',
      hasRunEnd && last?.event === 'tool-workflow/run-end', 'run-end 收尾',
      last?.event ?? '空')

    const endsBySeq = new Map()
    for (const record of model.records) {
      if (record.event === 'tool-workflow/member-end') endsBySeq.set(record.seq, (endsBySeq.get(record.seq) ?? 0) + 1)
    }
    const starts = model.records.filter(record => record.event === 'tool-workflow/member-start').length
    add('MEMBER_PAIRING', '成员端恰好覆盖每个启动过的 seq 一次',
      endsBySeq.size === starts && [...endsBySeq.values()].every(count => count === 1),
      `${String(starts)} 个成员各配对一次`,
      `${String(endsBySeq.size)} 个已配对`)
  }

  const startedPhases = new Set()
  for (const record of model.records) {
    if (record.event === 'tool-workflow/member-start') {
      startedPhases.add(Object.prototype.hasOwnProperty.call(record, 'phase') ? record.phase : '(省略)')
    }
  }
  const nodeGroups = model.node.phases.map(group => group.title)
  add('PHASES_FROM_MEMBER_STARTS', '相位分组等于启动成员的精确相位集合',
    nodeGroups.length === startedPhases.size && nodeGroups.every(title => startedPhases.has(title)),
    `[${[...startedPhases].join(' | ')}]`,
    `[${nodeGroups.join(' | ')}]`)

  const runStart = model.records[0]
  add('ANCHORED_AFTER_TOOL_NODE', '节点锚在 run-start 之后、原工具卡之后',
    runStart !== undefined && runStart.event === 'tool-workflow/run-start' && runStart.anchoredAfterToolNode === true,
    '锚定', runStart?.anchoredAfterToolNode === true ? '锚定' : '漂移')

  return { pass: checks.every(check => check.pass), checks }
}
