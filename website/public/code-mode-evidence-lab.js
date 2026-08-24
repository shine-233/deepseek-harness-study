// 教学模型（simulate、独立 oracle、帧序列）留在本文件；渲染辅助改用共享的
// study-lab-kit。kit 的 renderOracle / renderBoundary / renderRows 会引入本页
// 从未有过的图标和另一套行数据集契约，按「页面现行为优先」保留原样，差异见各处注释。
import { icon } from './study-lab-icons.js'
import { revealOnScroll } from './study-lab-reveal.js'

import { installThemeToggle } from './study-lab-theme.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import {
  installDeclaredIcons,
  installInputReset,
  makeFeedback,
  prefersReducedMotion,
  replaceList,
  svgElement,
  writeText,
} from './study-lab-kit.js'

const UINT32_MAX = 0xffffffff
const MAX_PARALLELISM = 3
const DEFAULT_INPUT = Object.freeze({
  seed: 17,
  policy: 'deny-write',
  parallelism: 2,
})

export const CODE_MODE_POLICIES = Object.freeze([
  Object.freeze({
    id: 'deny-write',
    label: '只读放行，写入拒绝',
    description: 'read 调用进入主体；write 调用在 policy lane 形成拒绝结果。',
  }),
  Object.freeze({
    id: 'allow-all',
    label: '全部放行',
    description: '每个子调用仍逐次经过 policy lane，然后才进入主体。',
  }),
  Object.freeze({
    id: 'deny-all',
    label: '全部拒绝',
    description: '每个子调用都形成拒绝结果，工具主体执行次数保持为 0。',
  }),
])

// 状态链接的输入契约：seed 是 32 位无符号整数，策略是三个教学枚举之一，
// 并行上限在 1..MAX_PARALLELISM。帧位置不进状态——时间轴位置不算实验输入。
const CODE_MODE_STATE_SCHEMA = {
  seed: { integerRange: [0, UINT32_MAX] },
  policy: { enum: CODE_MODE_POLICIES.map(policy => policy.id) },
  parallelism: { integerRange: [1, MAX_PARALLELISM] },
}

const CALL_SPECS = Object.freeze([
  Object.freeze({
    key: 'inspect-context',
    name: 'inspect_context',
    access: 'read',
    mode: 'parallel',
    purpose: '读取已声明的上下文摘要',
  }),
  Object.freeze({
    key: 'search-workspace',
    name: 'search_workspace',
    access: 'read',
    mode: 'parallel',
    purpose: '搜索工作区中的候选文件',
  }),
  Object.freeze({
    key: 'write-summary',
    name: 'write_summary',
    access: 'write',
    mode: 'exclusive',
    purpose: '把整理后的摘要写入工作区',
  }),
  Object.freeze({
    key: 'read-session',
    name: 'read_session',
    access: 'read',
    mode: 'parallel',
    purpose: '读取一次 Session 投影',
  }),
])

const CAN_PROVE = Object.freeze([
  '在这个固定教学模型里，每个子调用都有同一个外层 parent，并且先经过 policy lane。',
  '在 deny 路径里，被拒绝调用的工具主体执行次数为 0，但仍产生 post-execute 和 result。',
  '在 allow 路径里，内部调用仍保留 policy-check 与 policy-decision 记录。',
  '在这个调度模型里，parallel 主体并发不超过所选上限，exclusive 主体不与其他主体重叠。',
])

const CANNOT_PROVE = Object.freeze([
  '不能证明当前浏览器连接过真实 DSH Host、Session、模型、审批服务或工具进程。',
  '不能证明生产事件的字段、tick、耗时或错误文本与这组教学事件相同。',
  '不能证明所有插件都采用同一权限规则，也不能证明外部副作用可以回滚。',
  '不能用本页通过替代 rc.6 源码测试、真实模型 E2E、生产日志或人工审批证据。',
])

const PHASE_RANK = Object.freeze({
  'outer-dispatch': 0,
  'outer-body-start': 1,
  'dispatch-start': 2,
  'pre-execute': 3,
  'policy-check': 4,
  'policy-decision': 5,
  'body-start': 6,
  'body-end': 7,
  'post-execute': 8,
  result: 9,
  'outer-body-end': 10,
  'outer-result': 11,
})

const STATE_BY_PHASE = Object.freeze({
  'dispatch-start': '已分发',
  'pre-execute': 'pre-execute',
  'policy-check': '策略检查',
  'policy-decision': '策略已决定',
  'body-start': '主体执行中',
  'body-end': '主体已结束',
  'post-execute': 'post-execute',
  result: '已结算',
})

function resolveInput(input = {}) {
  const seed = input.seed ?? DEFAULT_INPUT.seed
  const policy = input.policy ?? DEFAULT_INPUT.policy
  const parallelism = input.parallelism ?? DEFAULT_INPUT.parallelism
  if (!Number.isInteger(seed) || seed < 0 || seed > UINT32_MAX) {
    throw new RangeError('seed must be an integer between 0 and 4294967295')
  }
  if (!CODE_MODE_POLICIES.some(candidate => candidate.id === policy)) {
    throw new RangeError('policy must be deny-write, allow-all, or deny-all')
  }
  if (!Number.isInteger(parallelism) || parallelism < 1 || parallelism > MAX_PARALLELISM) {
    throw new RangeError('parallelism must be an integer between 1 and 3')
  }
  return { seed, policy, parallelism }
}

function seededGenerator(seed) {
  let state = seed >>> 0
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state
  }
}

function policyDecision(policy, access) {
  if (policy === 'allow-all') return 'allow'
  if (policy === 'deny-all') return 'deny'
  return access === 'write' ? 'deny' : 'allow'
}

function policyReason(policy, access) {
  if (policy === 'allow-all') return 'ALLOW_ALL'
  if (policy === 'deny-all') return 'DENY_ALL'
  return access === 'write' ? 'WRITE_REQUIRES_APPROVAL' : 'READ_ALLOWED'
}

function addEvent(events, event) {
  events.push({
    scope: 'child',
    decision: null,
    reason: null,
    bodyExecutionDelta: 0,
    ...event,
  })
}

function scheduleBatch({
  specs,
  startTick,
  policy,
  rootCallId,
  parallelism,
  random,
  events,
  callRecords,
}) {
  let orderedTick = startTick
  const scheduled = []

  for (const [batchIndex, spec] of specs.entries()) {
    const callIndex = CALL_SPECS.indexOf(spec)
    const callId = rootCallId + ':code:' + String(callIndex + 1)
    const lane = spec.mode === 'exclusive'
      ? 'exclusive'
      : 'parallel-' + String((batchIndex % parallelism) + 1)
    const decision = policyDecision(policy, spec.access)
    const reason = policyReason(policy, spec.access)
    const duration = 8 + (random() % 5)
    const dispatchTick = orderedTick
    const preTick = orderedTick + 1
    const checkTick = orderedTick + 2
    const decisionTick = orderedTick + 3
    const bodyStartTick = decisionTick + 1
    const bodyEndTick = decision === 'allow' ? bodyStartTick + duration : null

    const common = {
      rootCallId,
      parentCallId: rootCallId,
      callId,
      callOrder: callIndex,
      name: spec.name,
      access: spec.access,
      mode: spec.mode,
      lane,
    }
    addEvent(events, {
      ...common,
      tick: dispatchTick,
      phase: 'dispatch-start',
      detail: spec.purpose,
    })
    addEvent(events, {
      ...common,
      tick: preTick,
      phase: 'pre-execute',
      detail: '建立子调用并进入有序前置阶段',
    })
    addEvent(events, {
      ...common,
      tick: checkTick,
      phase: 'policy-check',
      detail: '按 access=' + spec.access + ' 读取当前教学策略',
    })
    addEvent(events, {
      ...common,
      tick: decisionTick,
      phase: 'policy-decision',
      decision,
      reason,
      detail: decision === 'allow' ? '策略允许进入工具主体' : '策略拒绝进入工具主体',
    })
    if (decision === 'allow') {
      addEvent(events, {
        ...common,
        tick: bodyStartTick,
        phase: 'body-start',
        decision,
        reason,
        bodyExecutionDelta: 1,
        detail: '工具主体开始；只有这个阶段可以与其他 parallel 主体重叠',
      })
      addEvent(events, {
        ...common,
        tick: bodyEndTick,
        phase: 'body-end',
        decision,
        reason,
        detail: '工具主体结束，等待有序提交',
      })
    }
    const settleTick = bodyEndTick ?? bodyStartTick
    const record = {
      ...common,
      key: spec.key,
      purpose: spec.purpose,
      decision,
      reason,
      duration: decision === 'allow' ? duration : 0,
      bodyStartTick: decision === 'allow' ? bodyStartTick : null,
      bodyEndTick,
      settleTick,
      postTick: null,
      resultTick: null,
    }
    callRecords.push(record)
    scheduled.push(record)
    orderedTick += 5
  }

  let commitTick = Math.max(orderedTick, ...scheduled.map(record => record.settleTick))
  for (const record of scheduled) {
    record.postTick = commitTick
    record.resultTick = commitTick + 1
    addEvent(events, {
      rootCallId: record.rootCallId,
      parentCallId: record.parentCallId,
      callId: record.callId,
      callOrder: record.callOrder,
      name: record.name,
      access: record.access,
      mode: record.mode,
      lane: record.lane,
      tick: record.postTick,
      phase: 'post-execute',
      decision: record.decision,
      reason: record.reason,
      detail: record.decision === 'allow'
        ? '主体结果进入有序后置阶段'
        : '拒绝结果进入有序后置阶段；主体没有执行',
    })
    addEvent(events, {
      rootCallId: record.rootCallId,
      parentCallId: record.parentCallId,
      callId: record.callId,
      callOrder: record.callOrder,
      name: record.name,
      access: record.access,
      mode: record.mode,
      lane: record.lane,
      tick: record.resultTick,
      phase: 'result',
      decision: record.decision,
      reason: record.reason,
      detail: record.decision === 'allow' ? '子调用成功结算' : '子调用以策略拒绝结算',
    })
    commitTick += 2
  }
  return commitTick
}

function maxBodyConcurrency(records) {
  const endTick = Math.max(0, ...records.map(record => record.bodyEndTick ?? 0))
  let maximum = 0
  for (let tick = 0; tick <= endTick; tick += 1) {
    const active = records.filter(record =>
      record.bodyStartTick !== null
      && record.bodyEndTick !== null
      && record.bodyStartTick <= tick
      && tick < record.bodyEndTick).length
    maximum = Math.max(maximum, active)
  }
  return maximum
}

function stateForCall(record, events, tick) {
  const latest = events
    .filter(event => event.callId === record.callId && event.tick <= tick)
    .at(-1)
  if (latest === undefined) return '排队中'
  if (latest.phase === 'policy-decision' && latest.decision === 'deny') return '已拒绝，等待提交'
  return STATE_BY_PHASE[latest.phase] ?? '排队中'
}

function frameSummary(tick, finalTick, currentEvents) {
  if (tick === 0) return '首帧：外层 run_code 已分发，尚无内部工具主体执行。'
  if (tick === finalTick) return '末帧：所有子调用已结算，外层结果完成。'
  if (currentEvents.length === 0) return '有主体仍在执行，当前 tick 没有新的有序事件。'
  return currentEvents.map(event => event.name + ' · ' + event.phase).join('；')
}

function buildFrames(events, records) {
  const finalTick = Math.max(...events.map(event => event.tick))
  return Array.from({ length: finalTick + 1 }, (_, tick) => {
    const currentEvents = events.filter(event => event.tick === tick)
    const activeBodyCount = records.filter(record =>
      record.bodyStartTick !== null
      && record.bodyEndTick !== null
      && record.bodyStartTick <= tick
      && tick < record.bodyEndTick).length
    return {
      index: tick,
      tick,
      isFirst: tick === 0,
      isLast: tick === finalTick,
      summary: frameSummary(tick, finalTick, currentEvents),
      currentEventIds: currentEvents.map(event => event.id),
      activeBodyCount,
      settledChildCount: records.filter(record => record.resultTick <= tick).length,
      callStates: records.map(record => ({
        callId: record.callId,
        name: record.name,
        decision: record.decision,
        state: stateForCall(record, events, tick),
      })),
    }
  })
}

function phaseCount(events, phase) {
  return events.filter(event => event.phase === phase).length
}

function makeOracleCheck(id, label, pass, expected, actual) {
  return { id, label, pass, expected, actual }
}

export function evaluateCodeModeOracle({ events, policy, parallelism }) {
  if (!Array.isArray(events)) throw new TypeError('events must be an array')
  if (!CODE_MODE_POLICIES.some(candidate => candidate.id === policy)) {
    throw new RangeError('oracle policy is invalid')
  }
  if (!Number.isInteger(parallelism) || parallelism < 1 || parallelism > MAX_PARALLELISM) {
    throw new RangeError('oracle parallelism is invalid')
  }

  const outerDispatch = events.find(event => event.phase === 'outer-dispatch')
  const outerResult = events.find(event => event.phase === 'outer-result')
  const rootCallId = outerDispatch?.callId
  const childEvents = events.filter(event => event.scope === 'child')
  const callIds = [...new Set(childEvents.map(event => event.callId))]
  const checks = []

  const linkedEvents = childEvents.filter(event =>
    event.rootCallId === rootCallId && event.parentCallId === rootCallId).length
  checks.push(makeOracleCheck(
    'PARENT_LINKED',
    '每个子事件都指回同一个外层调用',
    rootCallId !== undefined && linkedEvents === childEvents.length,
    String(childEvents.length) + ' linked child events',
    String(linkedEvents) + ' linked child events',
  ))

  let orderedPipelines = 0
  let matchingPolicies = 0
  let deniedWithZeroBodies = 0
  let allowedWithOneBody = 0
  let completeResults = 0
  const intervals = []

  for (const callId of callIds) {
    const stream = childEvents.filter(event => event.callId === callId)
    const one = phase => stream.filter(event => event.phase === phase)
    const dispatch = one('dispatch-start')
    const pre = one('pre-execute')
    const policyCheck = one('policy-check')
    const policyEvents = one('policy-decision')
    const starts = one('body-start')
    const ends = one('body-end')
    const posts = one('post-execute')
    const results = one('result')
    const decisionEvent = policyEvents[0]
    const expectedDecision = decisionEvent === undefined
      ? null
      : policyDecision(policy, decisionEvent.access)
    const pipelineTicks = [
      dispatch[0]?.tick,
      pre[0]?.tick,
      policyCheck[0]?.tick,
      decisionEvent?.tick,
      posts[0]?.tick,
      results[0]?.tick,
    ]
    const phasesPresent = [dispatch, pre, policyCheck, policyEvents, posts, results]
      .every(matches => matches.length === 1)
    const ticksOrdered = pipelineTicks.every(Number.isInteger)
      && pipelineTicks.every((tick, index) => index === 0 || tick > pipelineTicks[index - 1])
    if (phasesPresent && ticksOrdered) orderedPipelines += 1
    if (decisionEvent?.decision === expectedDecision) matchingPolicies += 1
    if (decisionEvent?.decision === 'deny' && starts.length === 0 && ends.length === 0) {
      deniedWithZeroBodies += 1
    }
    if (decisionEvent?.decision === 'allow'
      && starts.length === 1
      && ends.length === 1
      && starts[0].tick < ends[0].tick
      && decisionEvent.tick < starts[0].tick
      && ends[0].tick <= posts[0]?.tick) {
      allowedWithOneBody += 1
      intervals.push({
        callId,
        mode: starts[0].mode,
        start: starts[0].tick,
        end: ends[0].tick,
      })
    }
    if (results.length === 1) completeResults += 1
  }

  checks.push(makeOracleCheck(
    'PIPELINE_ORDERED',
    '每个子调用按 dispatch、pre、policy、post、result 排序',
    orderedPipelines === callIds.length,
    String(callIds.length) + ' ordered pipelines',
    String(orderedPipelines) + ' ordered pipelines',
  ))
  checks.push(makeOracleCheck(
    'POLICY_MATCHES_INPUT',
    '每个 policy decision 与所选规则一致',
    matchingPolicies === callIds.length,
    String(callIds.length) + ' matching decisions',
    String(matchingPolicies) + ' matching decisions',
  ))

  const deniedCalls = childEvents.filter(event =>
    event.phase === 'policy-decision' && event.decision === 'deny').length
  checks.push(makeOracleCheck(
    'DENIED_BODY_ZERO',
    '被拒绝调用没有进入工具主体',
    deniedWithZeroBodies === deniedCalls,
    String(deniedCalls) + ' denied calls with zero bodies',
    String(deniedWithZeroBodies) + ' denied calls with zero bodies',
  ))

  const allowedCalls = childEvents.filter(event =>
    event.phase === 'policy-decision' && event.decision === 'allow').length
  checks.push(makeOracleCheck(
    'ALLOWED_BODY_ONCE',
    '被允许调用各执行一次主体',
    allowedWithOneBody === allowedCalls,
    String(allowedCalls) + ' allowed calls with one body',
    String(allowedWithOneBody) + ' allowed calls with one body',
  ))
  checks.push(makeOracleCheck(
    'RESULT_RECORDED',
    '每个子调用都产生一个 result',
    completeResults === callIds.length,
    String(callIds.length) + ' child results',
    String(completeResults) + ' child results',
  ))

  const maxTick = Math.max(0, ...intervals.map(interval => interval.end))
  let observedConcurrency = 0
  let exclusiveOverlap = 0
  for (let tick = 0; tick <= maxTick; tick += 1) {
    const active = intervals.filter(interval => interval.start <= tick && tick < interval.end)
    observedConcurrency = Math.max(observedConcurrency, active.length)
    if (active.some(interval => interval.mode === 'exclusive') && active.length > 1) {
      exclusiveOverlap += 1
    }
  }
  checks.push(makeOracleCheck(
    'PARALLELISM_BOUNDED',
    '主体并发不超过上限，exclusive 不重叠',
    observedConcurrency <= parallelism && exclusiveOverlap === 0,
    'max <= ' + String(parallelism) + '; exclusive overlap = 0',
    'max = ' + String(observedConcurrency) + '; exclusive overlap ticks = ' + String(exclusiveOverlap),
  ))

  const lastChildResultTick = Math.max(
    -1,
    ...childEvents.filter(event => event.phase === 'result').map(event => event.tick),
  )
  checks.push(makeOracleCheck(
    'OUTER_SETTLES_LAST',
    '外层结果晚于所有子调用结果',
    outerResult !== undefined && outerResult.tick > lastChildResultTick,
    'outer result tick > ' + String(lastChildResultTick),
    outerResult === undefined ? 'outer result missing' : 'outer result tick = ' + String(outerResult.tick),
  ))

  return {
    pass: checks.every(check => check.pass),
    checks,
  }
}

export function simulateCodeMode(input = {}) {
  const resolved = resolveInput(input)
  const random = seededGenerator(resolved.seed)
  const rootCallId = 'run-code-' + random().toString(16).padStart(8, '0')
  const events = []
  const callRecords = []

  addEvent(events, {
    scope: 'outer',
    rootCallId,
    parentCallId: null,
    callId: rootCallId,
    callOrder: -1,
    name: 'run_code',
    access: 'execute',
    mode: 'outer',
    lane: 'parent',
    tick: 0,
    phase: 'outer-dispatch',
    detail: '外层 run_code 进入教学模型',
  })
  addEvent(events, {
    scope: 'outer',
    rootCallId,
    parentCallId: null,
    callId: rootCallId,
    callOrder: -1,
    name: 'run_code',
    access: 'execute',
    mode: 'outer',
    lane: 'parent',
    tick: 1,
    phase: 'outer-body-start',
    detail: '程序开始提交内部工具调用',
  })

  const groups = [
    CALL_SPECS.filter(spec => spec.key === 'inspect-context' || spec.key === 'search-workspace'),
    CALL_SPECS.filter(spec => spec.key === 'write-summary'),
    CALL_SPECS.filter(spec => spec.key === 'read-session'),
  ]
  let cursor = 2
  for (const group of groups) {
    const batchSize = group[0]?.mode === 'exclusive' ? 1 : resolved.parallelism
    for (let offset = 0; offset < group.length; offset += batchSize) {
      cursor = scheduleBatch({
        specs: group.slice(offset, offset + batchSize),
        startTick: cursor,
        policy: resolved.policy,
        rootCallId,
        parallelism: resolved.parallelism,
        random,
        events,
        callRecords,
      })
    }
  }

  addEvent(events, {
    scope: 'outer',
    rootCallId,
    parentCallId: null,
    callId: rootCallId,
    callOrder: -1,
    name: 'run_code',
    access: 'execute',
    mode: 'outer',
    lane: 'parent',
    tick: cursor,
    phase: 'outer-body-end',
    detail: '程序已收到所有内部调用的结算值',
  })
  addEvent(events, {
    scope: 'outer',
    rootCallId,
    parentCallId: null,
    callId: rootCallId,
    callOrder: -1,
    name: 'run_code',
    access: 'execute',
    mode: 'outer',
    lane: 'parent',
    tick: cursor + 1,
    phase: 'outer-result',
    detail: '外层只返回整理后的教学结果',
  })

  events.sort((left, right) =>
    left.tick - right.tick
    || (PHASE_RANK[left.phase] ?? 99) - (PHASE_RANK[right.phase] ?? 99)
    || left.callOrder - right.callOrder)
  events.forEach((event, index) => {
    event.index = index
    event.id = 'event-' + String(index + 1).padStart(3, '0')
  })

  const frames = buildFrames(events, callRecords)
  const observations = {
    rootCallId,
    childCount: callRecords.length,
    policyChecks: phaseCount(events, 'policy-check'),
    allowedCalls: callRecords.filter(record => record.decision === 'allow').length,
    deniedCalls: callRecords.filter(record => record.decision === 'deny').length,
    bodyExecutions: phaseCount(events, 'body-start'),
    deniedBodyExecutions: callRecords
      .filter(record => record.decision === 'deny')
      .reduce((count, record) =>
        count + events.filter(event => event.callId === record.callId && event.phase === 'body-start').length, 0),
    childResults: phaseCount(events, 'result'),
    maxObservedBodyConcurrency: maxBodyConcurrency(callRecords),
    requestedParallelism: resolved.parallelism,
    firstFrameMeaning: frames[0].summary,
    lastFrameMeaning: frames.at(-1).summary,
  }
  const oracle = evaluateCodeModeOracle({
    events,
    policy: resolved.policy,
    parallelism: resolved.parallelism,
  })
  return {
    input: resolved,
    calls: callRecords,
    frames,
    events,
    observations,
    oracle,
    canProve: [...CAN_PROVE],
    cannotProve: [...CANNOT_PROVE],
  }
}

export function frameAt(simulation, index) {
  if (typeof simulation !== 'object' || simulation === null || !Array.isArray(simulation.frames)) {
    throw new TypeError('simulation must contain frames')
  }
  if (!Number.isFinite(index)) throw new TypeError('frame index must be finite')
  const resolved = Math.max(0, Math.min(simulation.frames.length - 1, Math.trunc(index)))
  return simulation.frames[resolved]
}

function phaseLabel(phase) {
  const labels = {
    'outer-dispatch': 'outer dispatch',
    'outer-body-start': 'outer body start',
    'dispatch-start': 'dispatch start',
    'pre-execute': 'pre-execute',
    'policy-check': 'policy check',
    'policy-decision': 'policy decision',
    'body-start': 'body start',
    'body-end': 'body end',
    'post-execute': 'post-execute',
    result: 'result',
    'outer-body-end': 'outer body end',
    'outer-result': 'outer result',
  }
  return labels[phase] ?? phase
}

function renderTimeline(simulation, target) {
  const width = 1120
  const left = 170
  const right = 32
  const top = 44
  const laneHeight = 74
  const laneIds = ['parent']
  for (let lane = 1; lane <= simulation.input.parallelism; lane += 1) {
    laneIds.push('parallel-' + String(lane))
  }
  laneIds.push('exclusive')
  const laneLabels = {
    parent: 'outer run_code',
    exclusive: 'exclusive body',
  }
  const height = top + laneIds.length * laneHeight + 46
  const maxTick = simulation.frames.at(-1).tick
  const xFor = tick => left + (tick / maxTick) * (width - left - right)
  const yFor = lane => top + laneIds.indexOf(lane) * laneHeight + laneHeight / 2
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'timeline-title timeline-description',
  })
  svg.append(
    svgElement('title', { id: 'timeline-title' }, 'Code Mode 教学事件时间轴'),
    svgElement('desc', { id: 'timeline-description' }, '横轴是离散 tick，纵轴是外层、并发主体和独占主体。下方事件表提供完整文字替代。'),
  )

  const tickStep = Math.max(1, Math.ceil(maxTick / 10))
  for (let tick = 0; tick <= maxTick; tick += tickStep) {
    const x = xFor(tick)
    svg.append(
      svgElement('line', { x1: x, y1: top - 12, x2: x, y2: height - 30, class: 'tick-grid' }),
      svgElement('text', { x, y: 22, class: 'tick-label', 'text-anchor': 'middle' }, String(tick)),
    )
  }
  if (maxTick % tickStep !== 0) {
    const x = xFor(maxTick)
    svg.append(
      svgElement('line', { x1: x, y1: top - 12, x2: x, y2: height - 30, class: 'tick-grid' }),
      svgElement('text', { x, y: 22, class: 'tick-label', 'text-anchor': 'middle' }, String(maxTick)),
    )
  }

  for (const lane of laneIds) {
    const y = yFor(lane)
    const label = laneLabels[lane] ?? lane.replace('-', ' ')
    svg.append(
      svgElement('text', { x: left - 18, y: y + 5, class: 'lane-label', 'text-anchor': 'end' }, label),
      svgElement('line', { x1: left, y1: y, x2: width - right, y2: y, class: 'lane-line' }),
    )
  }

  for (const call of simulation.calls) {
    if (call.bodyStartTick === null || call.bodyEndTick === null) continue
    const x = xFor(call.bodyStartTick)
    const end = xFor(call.bodyEndTick)
    const y = yFor(call.lane)
    const rect = svgElement('rect', {
      'data-reveal': '',
      x,
      y: y - 13,
      width: Math.max(4, end - x),
      height: 26,
      rx: 13,
      class: 'body-interval mode-' + call.mode,
      'data-start': call.bodyStartTick,
      'data-end': call.bodyEndTick,
    })
    rect.append(svgElement('title', {}, call.name + ' body: tick ' + String(call.bodyStartTick) + '–' + String(call.bodyEndTick)))
    svg.append(rect)
  }

  for (const event of simulation.events) {
    const marker = svgElement('circle', {
      'data-reveal': '',
      cx: xFor(event.tick),
      cy: yFor(event.lane),
      r: event.phase === 'policy-decision' ? 8 : 6,
      class: 'event-marker phase-' + event.phase + (event.decision === 'deny' ? ' decision-deny' : ''),
      'data-tick': event.tick,
      'data-event-id': event.id,
    })
    marker.append(svgElement('title', {}, 'tick ' + String(event.tick) + ' · ' + event.name + ' · ' + phaseLabel(event.phase)))
    svg.append(marker)
  }

  const guide = svgElement('line', {
    id: 'timeline-current-guide',
    x1: xFor(0),
    y1: top - 18,
    x2: xFor(0),
    y2: height - 24,
    class: 'current-guide',
  })
  svg.append(guide)
  target.replaceChildren(svg)
  revealOnScroll(target)
}

/**
 * 与 kit 的 renderRows 的差异：本页行带 data-tick / data-event-id，供逐帧联动
 * 高亮和当前帧定位；kit 版只支持 key/state 数据集，表达不了这个契约，所以保留自绘。
 */
function renderEventTable(simulation, tableBody) {
  tableBody.replaceChildren()
  for (const event of simulation.events) {
    const row = document.createElement('tr')
    row.dataset.tick = String(event.tick)
    row.dataset.eventId = event.id
    const values = [
      String(event.tick),
      event.lane,
      event.name,
      phaseLabel(event.phase),
      event.decision ?? '—',
      event.detail,
    ]
    for (const value of values) {
      const cell = document.createElement('td')
      writeText(cell, value)
      row.append(cell)
    }
    tableBody.append(row)
  }
}

/**
 * Phase columns in the order the scheduler runs them, so a row reads left to
 * right as one child call's progress. `body-start` and `body-end` sit in the
 * middle because that is where a denial removes them.
 */
export const CHILD_PHASE_ORDER = Object.freeze([
  'dispatch-start',
  'pre-execute',
  'policy-check',
  'policy-decision',
  'body-start',
  'body-end',
  'post-execute',
  'result',
])

/**
 * Which phase ticks each child call actually reached.
 *
 * Both dimensions carry meaning and neither is decorative: rows are the child
 * calls, columns are the ordered pipeline phases. A missing cell is the point of
 * the view — a denied call has no `body-start` or `body-end`, so its row shows a
 * gap instead of a differently coloured cell, which keeps the allow/deny
 * distinction off hue alone.
 *
 * @param simulation - Return value of {@link simulateCodeMode}.
 * @returns One row per child call, each with a tick or null per phase.
 */
export function phaseMatrix(simulation) {
  return simulation.calls.map((call) => {
    const own = simulation.events.filter(event => event.callId === call.callId)
    return {
      callId: call.callId,
      name: call.name,
      access: call.access,
      decision: call.decision,
      cells: CHILD_PHASE_ORDER.map((phase) => {
        const event = own.find(candidate => candidate.phase === phase)
        return { phase, tick: event === undefined ? null : event.tick }
      }),
    }
  })
}

function renderPhaseMatrix(simulation, target) {
  const rows = phaseMatrix(simulation)
  target.replaceChildren()

  const table = document.createElement('table')
  table.className = 'matrix-table'
  const caption = document.createElement('caption')
  writeText(caption, '每个子调用实际到达的阶段与 tick；空格表示该阶段没有发生。')
  table.append(caption)

  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  const corner = document.createElement('th')
  corner.scope = 'col'
  writeText(corner, '子调用')
  headRow.append(corner)
  for (const phase of CHILD_PHASE_ORDER) {
    const cell = document.createElement('th')
    cell.scope = 'col'
    writeText(cell, phaseLabel(phase))
    headRow.append(cell)
  }
  head.append(headRow)

  const body = document.createElement('tbody')
  for (const row of rows) {
    const tr = document.createElement('tr')
    tr.dataset.decision = row.decision
    const label = document.createElement('th')
    label.scope = 'row'
    writeText(label, row.name + ' · ' + row.access)
    tr.append(label)
    for (const cell of row.cells) {
      const td = document.createElement('td')
      td.dataset.phase = cell.phase
      if (cell.tick === null) {
        td.dataset.state = 'absent'
        writeText(td, '—')
        td.setAttribute('aria-label', phaseLabel(cell.phase) + ' 未发生')
      } else {
        td.dataset.state = 'present'
        td.dataset.tick = String(cell.tick)
        writeText(td, String(cell.tick))
      }
      tr.append(td)
    }
    body.append(tr)
  }

  table.append(head, body)
  target.append(table)
}

/**
 * Body concurrency per tick, next to the requested cap.
 *
 * One ordered dimension (tick) against one magnitude (how many tool bodies are
 * inside their execution window). The cap is drawn as a reference line, so
 * "concurrency never exceeds the cap" becomes something a reader checks by
 * looking rather than by trusting the oracle's PASS.
 *
 * @param simulation - Return value of {@link simulateCodeMode}.
 * @returns Per-tick concurrency plus the cap and the observed maximum.
 */
export function concurrencySeries(simulation) {
  return {
    cap: simulation.input.parallelism,
    observedMax: simulation.observations.maxObservedBodyConcurrency,
    points: simulation.frames.map(frame => ({ tick: frame.tick, count: frame.activeBodyCount })),
  }
}

function renderConcurrencyChart(simulation, target) {
  const series = concurrencySeries(simulation)
  const width = 1120
  const left = 170
  const right = 32
  const top = 26
  const plotHeight = 132
  const height = top + plotHeight + 38
  const maxTick = series.points.at(-1).tick
  const ceiling = Math.max(series.cap, series.observedMax, 1)
  const xFor = tick => left + (tick / maxTick) * (width - left - right)
  const yFor = count => top + plotHeight - (count / ceiling) * plotHeight

  target.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'concurrency-title concurrency-description',
  })
  svg.append(
    svgElement('title', { id: 'concurrency-title' }, '每个 tick 的工具主体并发数'),
    svgElement('desc', { id: 'concurrency-description' },
      '横轴是离散 tick，纵轴是同时处于执行区间的工具主体数量；虚线是本次请求的并发上限 '
      + String(series.cap) + '。同一份数字也在下方事件表和观测读数中给出。'),
  )

  for (let count = 0; count <= ceiling; count += 1) {
    const y = yFor(count)
    svg.append(
      svgElement('line', { x1: left, y1: y, x2: width - right, y2: y, class: 'conc-grid' }),
      svgElement('text', { x: left - 14, y: y + 4, class: 'conc-axis', 'text-anchor': 'end' }, String(count)),
    )
  }

  const capY = yFor(series.cap)
  svg.append(
    svgElement('line', { x1: left, y1: capY, x2: width - right, y2: capY, class: 'conc-cap' }),
    svgElement('text', { x: width - right, y: capY - 8, class: 'conc-cap-label', 'text-anchor': 'end' },
      'parallelism 上限 ' + String(series.cap)),
  )

  // A step path, not a smoothed line: concurrency changes at a tick boundary and
  // holds until the next one, so interpolating between ticks would invent values.
  const commands = []
  for (const [index, point] of series.points.entries()) {
    const x = xFor(point.tick)
    const y = yFor(point.count)
    if (index === 0) {
      commands.push('M ' + String(x) + ' ' + String(y))
      continue
    }
    commands.push('L ' + String(x) + ' ' + String(yFor(series.points[index - 1].count)))
    commands.push('L ' + String(x) + ' ' + String(y))
  }
  svg.append(svgElement('path', { d: commands.join(' '), class: 'conc-step', 'data-reveal': '' }))

  for (const point of series.points) {
    const marker = svgElement('circle', {
      'data-reveal': '',
      cx: xFor(point.tick),
      cy: yFor(point.count),
      r: 5,
      class: 'conc-point',
      'data-tick': String(point.tick),
    })
    marker.append(svgElement('title', {},
      'tick ' + String(point.tick) + '：' + String(point.count) + ' 个主体在执行'))
    svg.append(marker)
  }

  svg.append(svgElement('line', {
    id: 'concurrency-current-guide',
    x1: left,
    y1: top - 10,
    x2: left,
    y2: top + plotHeight + 10,
    class: 'conc-guide',
  }))

  target.append(svg)
  revealOnScroll(target)
}

function initializePage() {
  const form = document.querySelector('#lab-config-form')
  const seedInput = document.querySelector('#seed')
  const policyInput = document.querySelector('#policy')
  const parallelismInput = document.querySelector('#parallelism')
  const parallelismOutput = document.querySelector('#parallelism-output')
  const previousButton = document.querySelector('#frame-previous')
  const playButton = document.querySelector('#frame-play')
  const nextButton = document.querySelector('#frame-next')
  const resetButton = document.querySelector('#frame-reset')
  const seek = document.querySelector('#timeline-seek')
  const timeline = document.querySelector('#timeline-plot')
  const phaseMatrixTarget = document.querySelector('#phase-matrix')
  const concurrencyTarget = document.querySelector('#concurrency-plot')
  const frameTick = document.querySelector('#frame-tick')
  const framePosition = document.querySelector('#frame-position')
  const frameSummaryTarget = document.querySelector('#frame-summary')
  const currentEvents = document.querySelector('#current-events')
  const currentStates = document.querySelector('#current-states')
  const tableBody = document.querySelector('#event-table-body')
  const oracleList = document.querySelector('#oracle-list')
  const canProveList = document.querySelector('#can-prove-list')
  const cannotProveList = document.querySelector('#cannot-prove-list')
  const feedback = document.querySelector('#lab-feedback')
  const motionStatus = document.querySelector('#motion-status')
  const metrics = {
    checks: document.querySelector('#metric-policy-checks'),
    bodies: document.querySelector('#metric-body-executions'),
    deniedBodies: document.querySelector('#metric-denied-bodies'),
    concurrency: document.querySelector('#metric-concurrency'),
    oracle: document.querySelector('#metric-oracle'),
  }
  const required = [
    form, seedInput, policyInput, parallelismInput, parallelismOutput,
    previousButton, playButton, nextButton, resetButton, seek, timeline,
    phaseMatrixTarget, concurrencyTarget,
    frameTick, framePosition, frameSummaryTarget, currentEvents, currentStates,
    tableBody, oracleList, canProveList, cannotProveList, feedback, motionStatus,
    ...Object.values(metrics),
  ]
  if (required.some(value => !(value instanceof HTMLElement))) return

  let simulation = null
  let frameIndex = 0
  let timer = null
  // 布尔判断走 kit 的 prefersReducedMotion；这里保留 MediaQueryList 句柄，
  // 是因为系统偏好变化时要实时停掉自动播放，kit 不暴露这个订阅点。
  const motionQuery = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null

  const setFeedback = makeFeedback(feedback)
  const setPlayingLabel = playing => {
    writeText(playButton, playing ? '暂停' : '播放')
    playButton.setAttribute('aria-pressed', String(playing))
  }
  const pause = () => {
    if (timer !== null) window.clearInterval(timer)
    timer = null
    setPlayingLabel(false)
  }

  const setFrame = requestedIndex => {
    if (simulation === null) return
    const frame = frameAt(simulation, requestedIndex)
    frameIndex = frame.index
    seek.value = String(frameIndex)
    writeText(frameTick, String(frame.tick))
    writeText(framePosition, String(frameIndex + 1) + ' / ' + String(simulation.frames.length))
    writeText(frameSummaryTarget, frame.summary)
    replaceList(
      currentEvents,
      simulation.events
        .filter(event => frame.currentEventIds.includes(event.id))
        .map(event => event.name + ' · ' + phaseLabel(event.phase) + ' · ' + event.detail),
      '这个 tick 没有新事件；可能仍有工具主体在执行。',
    )
    replaceList(
      currentStates,
      frame.callStates.map(call =>
        call.name + ' · ' + call.state + ' · decision=' + call.decision),
      '没有子调用。',
    )
    previousButton.disabled = frame.isFirst
    nextButton.disabled = frame.isLast
    if (frame.isLast) pause()

    const maxTick = simulation.frames.at(-1).tick
    const guide = timeline.querySelector('#timeline-current-guide')
    if (guide instanceof SVGElement) {
      const x = 170 + (frame.tick / maxTick) * (1120 - 170 - 32)
      guide.setAttribute('x1', String(x))
      guide.setAttribute('x2', String(x))
    }
    for (const marker of timeline.querySelectorAll('[data-tick]')) {
      const tick = Number(marker.getAttribute('data-tick'))
      marker.classList.toggle('is-past', tick < frame.tick)
      marker.classList.toggle('is-current', tick === frame.tick)
      marker.classList.toggle('is-future', tick > frame.tick)
    }
    const concurrencyGuide = concurrencyTarget.querySelector('#concurrency-current-guide')
    if (concurrencyGuide instanceof SVGElement) {
      const x = 170 + (frame.tick / maxTick) * (1120 - 170 - 32)
      concurrencyGuide.setAttribute('x1', String(x))
      concurrencyGuide.setAttribute('x2', String(x))
    }
    for (const marker of concurrencyTarget.querySelectorAll('[data-tick]')) {
      const tick = Number(marker.getAttribute('data-tick'))
      marker.classList.toggle('is-past', tick < frame.tick)
      marker.classList.toggle('is-current', tick === frame.tick)
      marker.classList.toggle('is-future', tick > frame.tick)
    }
    for (const cell of phaseMatrixTarget.querySelectorAll('td[data-tick]')) {
      const tick = Number(cell.getAttribute('data-tick'))
      cell.classList.toggle('is-past', tick < frame.tick)
      cell.classList.toggle('is-current', tick === frame.tick)
      cell.classList.toggle('is-future', tick > frame.tick)
    }
    for (const row of tableBody.querySelectorAll('tr')) {
      const tick = Number(row.dataset.tick)
      row.classList.toggle('is-current', tick === frame.tick)
      row.classList.toggle('is-future', tick > frame.tick)
    }
  }

  const renderSimulation = () => {
    if (simulation === null) return
    seek.max = String(simulation.frames.length - 1)
    renderTimeline(simulation, timeline)
    renderPhaseMatrix(simulation, phaseMatrixTarget)
    renderConcurrencyChart(simulation, concurrencyTarget)
    renderEventTable(simulation, tableBody)
    writeText(metrics.checks, String(simulation.observations.policyChecks))
    writeText(metrics.bodies, String(simulation.observations.bodyExecutions))
    writeText(metrics.deniedBodies, String(simulation.observations.deniedBodyExecutions))
    writeText(
      metrics.concurrency,
      String(simulation.observations.maxObservedBodyConcurrency)
      + ' / ' + String(simulation.observations.requestedParallelism),
    )
    writeText(metrics.oracle, simulation.oracle.pass ? '通过' : '未通过')
    metrics.oracle.dataset.pass = String(simulation.oracle.pass)
    // 与 kit 的 renderOracle 的差异：kit 版会给每条校验标题加 check/cross 图标，
    // 本页列表保持纯文字（页面现行为优先）；badge 文本、data-pass 和期望/实测
    // 行的写法与 kit 完全一致，所以不引入该导出。
    oracleList.replaceChildren()
    for (const check of simulation.oracle.checks) {
      const item = document.createElement('li')
      item.dataset.pass = String(check.pass)
      const title = document.createElement('strong')
      const detail = document.createElement('span')
      writeText(title, (check.pass ? '通过 · ' : '未通过 · ') + check.label)
      writeText(detail, '期望：' + check.expected + '；实测：' + check.actual)
      item.append(title, detail)
      oracleList.append(item)
    }
    // 不用 kit 的 renderBoundary：它会顺带给两栏的 h3 标题加图标，本页标题
    // 保持纯文字；列表填充部分与 kit 的 replaceList 行为相同。
    replaceList(canProveList, simulation.canProve, '没有 canProve 声明。')
    replaceList(cannotProveList, simulation.cannotProve, '没有 cannotProve 声明。')
    setFrame(0)
  }

  const rebuild = () => {
    pause()
    try {
      simulation = simulateCodeMode({
        seed: Number(seedInput.value),
        policy: policyInput.value,
        parallelism: Number(parallelismInput.value),
      })
      renderSimulation()
      const denied = simulation.observations.deniedCalls
      setFeedback(
        '已重建确定性教学模型：' + String(simulation.events.length)
        + ' 个事件，' + String(denied) + ' 个拒绝，未连接任何 Host。',
        'success',
      )
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '实验输入无效。', 'error')
    }
  }

  // 状态进 URL hash；replaceState 被拒（file:// 等）时页面行为不变。
  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        seed: Number(seedInput.value),
        policy: policyInput.value,
        parallelism: Number(parallelismInput.value),
      }, CODE_MODE_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  const play = () => {
    if (simulation === null) return
    if (prefersReducedMotion()) {
      pause()
      setFeedback('系统已启用减少动态效果；请使用上一步、下一步或滑块逐帧查看。', 'notice')
      return
    }
    if (timer !== null) {
      pause()
      return
    }
    if (frameIndex >= simulation.frames.length - 1) setFrame(0)
    setPlayingLabel(true)
    timer = window.setInterval(() => setFrame(frameIndex + 1), 650)
  }

  const applyMotionPreference = () => {
    const reduced = prefersReducedMotion()
    if (reduced) pause()
    playButton.disabled = reduced
    writeText(
      motionStatus,
      reduced
        ? '减少动态效果：自动播放已关闭，逐帧控件仍可用。'
        : '标准动态效果：可以播放，也可以逐帧或拖动。',
    )
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    rebuild()
  })
  parallelismInput.addEventListener('input', () => {
    writeText(parallelismOutput, parallelismInput.value)
  })
  previousButton.addEventListener('click', () => setFrame(frameIndex - 1))
  nextButton.addEventListener('click', () => setFrame(frameIndex + 1))
  resetButton.addEventListener('click', () => {
    pause()
    setFrame(0)
    setFeedback('时间轴已回到首帧；实验输入没有改变。')
  })
  playButton.addEventListener('click', play)
  seek.addEventListener('input', () => {
    pause()
    setFrame(Number(seek.value))
  })
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const target = event.target
    if (target instanceof HTMLInputElement
      || target instanceof HTMLSelectElement
      || target instanceof HTMLButtonElement
      || target instanceof HTMLTextAreaElement) return
    const actions = {
      ArrowLeft: () => setFrame(frameIndex - 1),
      ArrowRight: () => setFrame(frameIndex + 1),
      Home: () => setFrame(0),
      End: () => setFrame(simulation === null ? 0 : simulation.frames.length - 1),
      ' ': play,
    }
    const action = actions[event.key]
    if (action === undefined) return
    event.preventDefault()
    action()
  })
  motionQuery?.addEventListener?.('change', applyMotionPreference)

  writeText(parallelismOutput, parallelismInput.value)
  applyMotionPreference()

  // 从状态链接恢复输入；链接缺失或损坏时保持默认输入，不报错打断阅读。
  const restored = readStateFromHash(location.hash, CODE_MODE_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    seedInput.value = String(restored.value.seed)
    policyInput.value = restored.value.policy
    parallelismInput.value = String(restored.value.parallelism)
  }

  rebuild()

  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  installInputReset(document.querySelector('#reset-inputs'), form, { onReset: rebuild })

  document.querySelector('#copy-state-link')?.addEventListener('click', async () => {
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
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'deny',
      hint: '子调用走的是同一条权限管线；deny 分支在工具主体执行之前就返回了。',
    explain: {
      allow: '默认策略是 deny-write，写入调用会被拒绝。',
      deny: 'prepareExecution 在拒绝时返回 post-result 而不是 dispatch，所以没有 body-start。',
      'deny-with-body': '主体只在调度器拿到 dispatch 之后才运行；拒绝时它拿不到。',
      skipped: '每个调用都有自己的 policy-check，切到全部放行也还是四次。',
    },
  })
}
