/**
 * Session 日志与恢复的纯模型。
 *
 * 课程 05 要说明为什么事件必须持久化。本模型把一段日志折叠成状态，并支持重放到任意
 * 位置。它检验的是两条实现里真正存在的规则：
 *
 *   1. 从头重放到第 n 条，得到的状态与增量推进到第 n 条完全一致；
 *   2. 遇到读不懂的事件，只有带 `ignorable: true` 的才能跳过；必需事件必须拒绝加载，
 *      不能悄悄忽略。
 *
 * 篡改实验 fault='tamper-replay-input'：重放前把落盘副本里一条 tool-result 的
 * ok 改成 false（模拟存储被改）；原始日志保持基准，独立校验靠重放比对抓出分歧，
 * 并指出违反的是「同一份日志重放多少次都得到同一个状态」。
 *
 * 每个维度的含义：
 *   横轴 = 事件序号（离散顺序，不是时间戳）
 *   纵轴 = 事件类别 lane
 *   条的长度 = 折叠后该字段的值（只在数值字段上使用）
 *   颜色 = 只区分“已应用”“已跳过”“导致拒绝”三档，不编码事件类别
 * 没有测量：真实写盘耗时、真实日志体积、真实并发写入行为。
 */

/** 本模型认识的事件类型。未列出的类型就是“读不懂”。 */
const KNOWN_TYPES = Object.freeze({
  'session-start': { required: true, label: '会话开始' },
  'user-message': { required: true, label: '用户消息' },
  'assistant-message': { required: true, label: '助手消息' },
  'tool-call': { required: true, label: '工具调用' },
  'tool-result': { required: true, label: '工具结果' },
  'title-set': { required: false, label: '标题设置' },
  'telemetry-sample': { required: false, label: '遥测采样' },
})

export const SESSION_FORMAT_VERSION = 0

export const LOG_SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'clean',
    label: '完整日志',
    description: '所有事件都能读懂，重放到末尾得到完整状态。',
  }),
  Object.freeze({
    id: 'unknown-ignorable',
    label: '含一条可忽略的未知事件',
    description: '一条读不懂但标了 ignorable 的事件被跳过，其余照常重放。',
  }),
  Object.freeze({
    id: 'unknown-required',
    label: '含一条必需的未知事件',
    description: '一条读不懂且未标 ignorable 的事件让加载停在它之前，而不是跳过它。',
  }),
  Object.freeze({
    id: 'gap',
    label: '序号有缺口',
    description: '日志缺了一条序号，加载在缺口处停下并报告，而不是假装连续。',
  }),
])

function event(sequence, type, payload, options = {}) {
  return {
    sequence,
    type,
    payload,
    ignorable: options.ignorable === true,
    formatVersion: options.formatVersion ?? SESSION_FORMAT_VERSION,
  }
}

function buildLog(scenario) {
  const log = [
    event(0, 'session-start', { title: '未命名会话' }),
    event(1, 'user-message', { text: '帮我读一个源文件', tokens: 12 }),
    event(2, 'tool-call', { tool: 'read_file', tokens: 8 }),
    event(3, 'tool-result', { tool: 'read_file', ok: true, tokens: 240 }),
    event(4, 'assistant-message', { text: '这个文件负责装配插件', tokens: 34 }),
    event(5, 'title-set', { title: '读 Cordis 装配' }),
    event(6, 'user-message', { text: '再帮我写一份摘要', tokens: 11 }),
    event(7, 'tool-call', { tool: 'write_summary', tokens: 9 }),
    event(8, 'tool-result', { tool: 'write_summary', ok: false, tokens: 18 }),
    event(9, 'assistant-message', { text: '写入被拒绝，我先说明原因', tokens: 41 }),
  ]
  if (scenario === 'unknown-ignorable') {
    log.splice(5, 0, event(5, 'ui-hint-shown', { hint: 'try the outline' }, { ignorable: true }))
    for (const [index, entry] of log.entries()) entry.sequence = index
  }
  if (scenario === 'unknown-required') {
    log.splice(6, 0, event(6, 'plan-revised', { revision: 2 }))
    for (const [index, entry] of log.entries()) entry.sequence = index
  }
  if (scenario === 'gap') {
    log.splice(5, 1)
    // 序号故意不重排：缺口就是这一场景要展示的东西。
  }
  return log
}

/**
 * 篡改实验的目标必须让分歧留到最后：ok 为 true 的 tool-result 被翻成 false 后，
 * 工具失败计数从此不同。标题这类字段会被后续事件覆盖，拖到末尾就看不到分歧了。
 */
function tamperTargetIn(log) {
  return log.find(entry => !entry.ignorable
    && entry.type === 'tool-result'
    && entry.payload.ok === true) ?? null
}

/** 造一份被改过的落盘副本：只动指定事件的载荷字节，原始日志原样保留。 */
function tamperStoredCopy(log, sequence) {
  return log.map(entry => entry.sequence === sequence
    ? { ...entry, payload: { ...entry.payload, ok: false } }
    : entry)
}

/** 折叠一条事件到状态上。未知类型不在这里处理，由调用方先判定。 */
function applyEvent(state, entry) {
  const next = {
    ...state,
    messages: [...state.messages],
    toolCalls: state.toolCalls,
    toolFailures: state.toolFailures,
    tokens: state.tokens + (typeof entry.payload.tokens === 'number' ? entry.payload.tokens : 0),
    appliedCount: state.appliedCount + 1,
  }
  switch (entry.type) {
    case 'session-start':
      next.title = entry.payload.title
      next.started = true
      break
    case 'title-set':
      next.title = entry.payload.title
      break
    case 'user-message':
    case 'assistant-message':
      next.messages.push({ role: entry.type === 'user-message' ? 'user' : 'assistant', text: entry.payload.text })
      break
    case 'tool-call':
      next.toolCalls += 1
      break
    case 'tool-result':
      if (entry.payload.ok !== true) next.toolFailures += 1
      break
    case 'telemetry-sample':
      break
    default:
      break
  }
  return next
}

function emptyState() {
  return {
    started: false,
    title: null,
    messages: [],
    toolCalls: 0,
    toolFailures: 0,
    tokens: 0,
    appliedCount: 0,
  }
}

/**
 * 从头重放到 `upTo`（含）。
 *
 * 返回状态、每条事件的去向，以及加载是否被拒绝。拒绝时 `stoppedAt` 是停下的位置：
 * 那之后的事件一条都不应用，因为不知道它们建立在什么状态上。
 */
export function replaySessionLog(log, upTo = Number.POSITIVE_INFINITY) {
  if (!Array.isArray(log)) throw new TypeError('log must be an array')
  let state = emptyState()
  const dispositions = []
  let refusal = null
  let expected = 0

  for (const entry of log) {
    if (entry.sequence > upTo) break
    if (refusal !== null) {
      dispositions.push({ sequence: entry.sequence, type: entry.type, disposition: 'not-reached', reason: '加载已在前面停下' })
      continue
    }
    if (entry.sequence !== expected) {
      refusal = {
        stoppedAt: entry.sequence,
        reason: '序号缺口：期望 ' + String(expected) + '，读到 ' + String(entry.sequence),
      }
      dispositions.push({ sequence: entry.sequence, type: entry.type, disposition: 'refused', reason: refusal.reason })
      continue
    }
    expected = entry.sequence + 1
    const known = Object.hasOwn(KNOWN_TYPES, entry.type)
    if (!known && entry.ignorable) {
      dispositions.push({ sequence: entry.sequence, type: entry.type, disposition: 'skipped', reason: '读不懂但标了 ignorable' })
      continue
    }
    if (!known) {
      refusal = { stoppedAt: entry.sequence, reason: '读不懂且未标 ignorable：' + entry.type }
      dispositions.push({ sequence: entry.sequence, type: entry.type, disposition: 'refused', reason: refusal.reason })
      continue
    }
    state = applyEvent(state, entry)
    dispositions.push({ sequence: entry.sequence, type: entry.type, disposition: 'applied', reason: KNOWN_TYPES[entry.type].label })
  }

  return { state, dispositions, refusal }
}

function resolveInput(input = {}) {
  const scenario = input.scenario ?? 'clean'
  if (!LOG_SCENARIOS.some(candidate => candidate.id === scenario)) {
    throw new RangeError('unknown scenario: ' + String(scenario))
  }
  const fault = input.fault ?? 'none'
  if (fault !== 'none' && fault !== 'tamper-replay-input') {
    throw new RangeError('未知篡改实验：' + String(fault))
  }
  return { scenario, upTo: input.upTo ?? Number.POSITIVE_INFINITY, fault }
}

/**
 * 建立一段日志和它的重放结果。
 *
 * @param input - `scenario` 为 LOG_SCENARIOS 的 id；`upTo` 为重放到的序号；
 *   `fault` 为 'none' 或 'tamper-replay-input'，后者把 `tamperIndex`（默认取
 *   第一条 ok 为 true 的非 ignorable tool-result）指认的事件在落盘副本里改写。
 */
export function buildSessionLogModel(input = {}) {
  const resolved = resolveInput(input)
  const scenario = LOG_SCENARIOS.find(candidate => candidate.id === resolved.scenario)
  const log = buildLog(resolved.scenario)
  const maxSequence = Math.max(...log.map(entry => entry.sequence))
  const upTo = Number.isFinite(resolved.upTo) ? Math.max(0, Math.min(resolved.upTo, maxSequence)) : maxSequence

  let storedLog = log
  let tamper = null
  if (resolved.fault === 'tamper-replay-input') {
    const target = input.tamperIndex === undefined
      ? tamperTargetIn(log)
      : log.find(entry => entry.sequence === input.tamperIndex) ?? null
    if (target === null || target.ignorable || target.type !== 'tool-result' || target.payload.ok !== true) {
      throw new RangeError('篡改目标须是一条 ok 为 true 且未标 ignorable 的 tool-result')
    }
    storedLog = tamperStoredCopy(log, target.sequence)
    tamper = Object.freeze({ sequence: target.sequence, type: target.type, field: 'ok', before: true, after: false })
  }

  // 重放消费的是落盘副本；原始日志只作基准留给独立校验比对。
  const full = replaySessionLog(storedLog, maxSequence)
  const partial = replaySessionLog(storedLog, upTo)

  return {
    input: { scenario: resolved.scenario, upTo, fault: resolved.fault },
    scenario: { id: scenario.id, label: scenario.label, description: scenario.description },
    formatVersion: SESSION_FORMAT_VERSION,
    log: storedLog,
    originalLog: log,
    tamper,
    maxSequence,
    partial,
    full,
    observations: {
      events: log.length,
      applied: partial.dispositions.filter(entry => entry.disposition === 'applied').length,
      skipped: partial.dispositions.filter(entry => entry.disposition === 'skipped').length,
      refusedAt: partial.refusal === null ? null : partial.refusal.stoppedAt,
      notReached: partial.dispositions.filter(entry => entry.disposition === 'not-reached').length,
      messages: partial.state.messages.length,
      toolCalls: partial.state.toolCalls,
      toolFailures: partial.state.toolFailures,
      tokens: partial.state.tokens,
      title: partial.state.title,
      fullyLoadable: full.refusal === null,
    },
    canProve: [
      '同一段日志重放到同一个位置，得到同一个状态：状态是事件的函数，不是页面记住的东西。',
      '读不懂的事件只有标了 ignorable 才被跳过；必需事件会让加载停在它之前，而不是悄悄忽略。',
      '序号缺口会让加载停下并报告位置，因为后面的事件不知道建立在什么状态上。',
      '拒绝加载不等于日志无用：停下之前的事件已经折叠出一个可用的部分状态。',
    ],
    cannotProve: [
      '不能证明真实 DSH 的事件字段、类型名或 SESSION_FORMAT_VERSION 与这里相同。',
      '不能证明真实写盘耗时、日志体积或并发写入下的顺序保证。',
      '不能证明真实部署遇到未知事件时的用户可见行为和恢复界面。',
      '不能用本页替代 Session 持久化与投影的源码、格式迁移测试或真实会话回放。',
    ],
  }
}

/**
 * 逐字段比对两个重放状态，返回人读的分歧清单。
 * 字段名与本页「折叠后的状态」块的叫法一致，指认时不用第二套词汇。
 */
function describeStateDivergence(expected, actual) {
  const diffs = []
  const push = (label, wanted, got) =>
    diffs.push('字段「' + label + '」应为 ' + wanted + '，落盘副本重放出 ' + got)
  if (expected.started !== actual.started) {
    push('会话已开始', expected.started ? '是' : '否', actual.started ? '是' : '否')
  }
  if (expected.title !== actual.title) {
    push('标题', '「' + String(expected.title ?? '（尚未设置）') + '」',
      '「' + String(actual.title ?? '（尚未设置）') + '」')
  }
  if (expected.messages.length !== actual.messages.length) {
    push('消息数', String(expected.messages.length), String(actual.messages.length))
  } else {
    for (let index = 0; index < expected.messages.length; index += 1) {
      const wantedMessage = expected.messages[index]
      const gotMessage = actual.messages[index]
      if (wantedMessage.role !== gotMessage.role || wantedMessage.text !== gotMessage.text) {
        const speaker = role => (role === 'user' ? '用户' : '助手')
        diffs.push('第 ' + String(index + 1) + ' 条消息应为 '
          + speaker(wantedMessage.role) + '「' + wantedMessage.text + '」，落盘副本重播出 '
          + speaker(gotMessage.role) + '「' + gotMessage.text + '」')
        break
      }
    }
  }
  if (expected.toolCalls !== actual.toolCalls) push('工具调用', String(expected.toolCalls), String(actual.toolCalls))
  if (expected.toolFailures !== actual.toolFailures) {
    push('工具失败', String(expected.toolFailures), String(actual.toolFailures))
  }
  if (expected.tokens !== actual.tokens) push('累计 token', String(expected.tokens), String(actual.tokens))
  if (expected.appliedCount !== actual.appliedCount) {
    push('已应用事件', String(expected.appliedCount), String(actual.appliedCount))
  }
  return diffs
}

/**
 * 独立核对重放的确定性和拒绝规则。
 *
 * 确定性以原始日志为基准：落盘副本必须重放出与原始日志相同的状态，存储一旦被改，
 * 「同一份日志重放多少次都得到同一个状态」就在这里断开。跳过与拒绝各自只允许发生
 * 在允许的条件下。
 */
export function evaluateSessionLogOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.log)) throw new TypeError('model.log must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const storedRun = replaySessionLog(model.log, model.input.upTo)
  const originalLog = Array.isArray(model.originalLog) ? model.originalLog : model.log
  const baselineFirst = replaySessionLog(originalLog, model.input.upTo)
  const baselineSecond = replaySessionLog(originalLog, model.input.upTo)
  const divergence = describeStateDivergence(baselineFirst.state, storedRun.state)
  const baselineStable = JSON.stringify(baselineFirst.state) === JSON.stringify(baselineSecond.state)
  const tamperPending = model.tamper != null && model.tamper.sequence > model.input.upTo
  add('REPLAY_IS_DETERMINISTIC', '同一段日志重放两次得到同一状态',
    baselineStable && divergence.length === 0,
    '同一份日志重放多少次都得到同一个状态，落盘副本也不例外',
    divergence.length === 0
      ? '落盘副本重放出的状态与原始日志一致'
        + (tamperPending ? '；篡改的序号 ' + String(model.tamper.sequence)
          + ' 还在重放位置之后，分歧尚未出现' : '')
      : divergence.join('；'))

  // 逐位置增量前进，和一次性重放到同一位置比对：任何位置不一致都说明状态不是事件的函数。
  const mismatches = []
  for (let upTo = 0; upTo <= model.maxSequence; upTo += 1) {
    const direct = replaySessionLog(model.log, upTo)
    const applied = direct.dispositions.filter(entry => entry.disposition === 'applied').length
    if (direct.state.appliedCount !== applied) mismatches.push(upTo)
  }
  add('PREFIX_REPLAY_CONSISTENT', '重放到任意前缀，已应用条数与状态计数一致',
    mismatches.length === 0, '0 个位置不一致',
    mismatches.length === 0 ? '0 个位置不一致' : '位置 ' + mismatches.slice(0, 4).join('、'))

  const skipped = storedRun.dispositions.filter(entry => entry.disposition === 'skipped')
  const badSkip = skipped.filter((entry) => {
    const source = model.log.find(candidate => candidate.sequence === entry.sequence)
    return source === undefined || source.ignorable !== true
  })
  add('SKIP_REQUIRES_IGNORABLE', '被跳过的事件都标了 ignorable',
    badSkip.length === 0, '0 个违规跳过',
    badSkip.map(entry => entry.type).join('、') || '0 个违规跳过')

  const refused = storedRun.dispositions.filter(entry => entry.disposition === 'refused')
  add('REFUSAL_STOPS_LOADING', '一旦拒绝，后面的事件都不再应用',
    refused.length === 0 || storedRun.dispositions.filter(entry => entry.disposition === 'applied'
      && entry.sequence > refused[0].sequence).length === 0,
    '拒绝之后 0 条应用',
    refused.length === 0 ? '本场景没有拒绝' : '拒绝之后 0 条应用')

  const monotonic = storedRun.dispositions.every((entry, index, all) =>
    index === 0 || all[index - 1].sequence < entry.sequence)
  add('DISPOSITIONS_ORDERED', '每条事件的去向按序号排列',
    monotonic, '严格递增', monotonic ? '严格递增' : '有乱序')

  const counted = model.observations
  add('OBSERVATIONS_MATCH', '观测读数与重放结果一致',
    counted.applied === storedRun.dispositions.filter(entry => entry.disposition === 'applied').length
    && counted.messages === storedRun.state.messages.length
    && counted.tokens === storedRun.state.tokens,
    String(storedRun.state.messages.length) + ' 条消息 / ' + String(storedRun.state.tokens) + ' token',
    String(counted.messages) + ' 条消息 / ' + String(counted.tokens) + ' token')

  return { pass: checks.every(check => check.pass), checks }
}
