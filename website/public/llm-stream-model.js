/**
 * LLM 流式装配的纯模型。
 *
 * 课程 06 的核心：chunk 按到达顺序进入 BlockAssembler，finish 之后迟到的重复
 * 增量必须被忽略，否则消息被污染。本模型把这条规则变成可操作的实验。
 *
 * 每个视觉维度的含义：
 *   上排 = 到达序号（不是发送顺序，更不是时间戳）
 *   下排 = 被接受进消息的块
 *   颜色只区分块类型，不编码数值。
 */

export const STREAM_KINDS = Object.freeze(['text', 'reasoning', 'tool-call'])

/** 教学用固定到达序列：finish 发生在第 5 个（下标 4）chunk 之后。 */
const BASE_CHUNKS = Object.freeze([
  Object.freeze({ kind: 'reasoning', text: '用户想要配置示例。' }),
  Object.freeze({ kind: 'text', text: '好的，' }),
  Object.freeze({ kind: 'text', text: '下面是 retry 的配置：' }),
  Object.freeze({ kind: 'tool-call', name: 'read_file', args: '{ "path": "retry.yml" }', text: '{ "path": "retry.yml" }' }),
  Object.freeze({ kind: 'text', text: '\n需要的话我可以逐行解释。' }),
])

/** 注入的教学干扰：finish 之后迟到的重复增量，正确行为是忽略。 */
const LATE_DUPLICATE = Object.freeze({ kind: 'text', text: '好的，' })
const FINISHED_AT = BASE_CHUNKS.length - 1

export const STREAM_SCENARIOS = Object.freeze([
  Object.freeze({ id: 'clean', label: '干净到达', description: '五个 chunk 按序到达，全部接受。' }),
  Object.freeze({
    id: 'late-duplicate',
    label: '含一条 finish 后的迟到重复',
    description: '消息结束后又到了一份与第 2 条相同的增量——正确的装配器会忽略它。',
  }),
])

function buildArrivals(scenarioId) {
  const arrivals = BASE_CHUNKS.map((chunk, arrival) => ({ ...chunk, arrival }))
  if (scenarioId === 'late-duplicate') {
    arrivals.push({ ...LATE_DUPLICATE, arrival: arrivals.length })
  }
  return arrivals
}

/** 场景的完整到达序列（含尚未推进到的块），供文字替代表格逐行列出。 */
export function listArrivals(scenarioId) {
  return buildArrivals(scenarioId)
}

/** 接受规则独立成函数：迟到（finish 后）且与更早到达内容相同的增量被拒绝。 */
function acceptArrivals(arrivals, upTo) {
  const accepted = []
  const rejected = []
  for (const chunk of arrivals) {
    if (chunk.arrival > upTo) break
    const afterFinish = chunk.arrival > FINISHED_AT
    const duplicateOfEarlier = arrivals.some(earlier =>
      earlier.arrival < chunk.arrival && earlier.text === chunk.text && earlier.kind === chunk.kind)
    if (afterFinish && duplicateOfEarlier) {
      rejected.push({ arrival: chunk.arrival, reason: 'finish 后的迟到重复' })
      continue
    }
    accepted.push(chunk)
  }
  return { accepted, rejected }
}

export function buildStreamModel(input) {
  const scenario = STREAM_SCENARIOS.find(item => item.id === input.scenario)
  if (scenario === undefined) throw new RangeError('未知场景：' + String(input.scenario))
  if (!Number.isInteger(input.upTo)) throw new TypeError('推进步数必须是整数')
  if (input.upTo < 0) throw new RangeError('推进步数不能为负')

  const arrivals = buildArrivals(scenario.id)
  const { accepted, rejected } = acceptArrivals(arrivals, input.upTo)
  const visibleArrivals = arrivals.filter(chunk => chunk.arrival <= input.upTo)
  const messageText = accepted
    .filter(chunk => chunk.kind === 'text')
    .map(chunk => chunk.text)
    .join('')

  return {
    input: { ...input },
    scenario,
    arrivals: visibleArrivals,
    accepted,
    rejected,
    messageText,
    observations: {
      arrivedCount: visibleArrivals.length,
      totalArrivals: arrivals.length,
      acceptedCount: accepted.length,
      rejectedCount: rejected.length,
      messageChars: messageText.length,
      toolCalls: accepted.filter(chunk => chunk.kind === 'tool-call').length,
      finished: input.upTo >= FINISHED_AT,
    },
    canProve: Object.freeze([
      '同一段到达序列重放到同一位置，得到完全相同的消息（确定性）',
      'finish 之后到达的重复增量不计入消息，也不计入工具调用数',
      'tool-call 块单独成类，不混进正文文本',
    ]),
    cannotProve: Object.freeze([
      '真实 provider 的网络抖动、重试或乱序传输',
      '真实 tokenizer 的 token 计数或首字延迟',
      '真实 DeepSeek adapter 对这些 chunk 的处理结果',
    ]),
  }
}

export function evaluateStreamOracle(model) {
  const checks = []

  const rebuilt = buildStreamModel(model.input)
  checks.push({
    id: 'STREAM_DETERMINISTIC',
    label: '同一到达序列重放得到同一份消息',
    expected: '两次构建的消息逐字节一致',
    actual: rebuilt.messageText === model.messageText ? '一致' : '不一致',
    pass: rebuilt.messageText === model.messageText,
  })

  // 独立重算期望正文：只接受 finish 之前的 text 块；迟到重复永远不在正文里。
  let expectedText = ''
  for (let arrival = 0; arrival <= Math.min(model.input.upTo, FINISHED_AT); arrival += 1) {
    const chunk = BASE_CHUNKS[arrival]
    if (chunk.kind === 'text') expectedText += chunk.text
  }
  checks.push({
    id: 'MESSAGE_ASSEMBLED',
    label: '接受的 text 块按序拼接成最终消息',
    expected: JSON.stringify(expectedText),
    actual: JSON.stringify(model.messageText),
    pass: model.messageText === expectedText,
  })

  const duplicateText = LATE_DUPLICATE.text
  const occurrences = model.messageText.split(duplicateText).length - 1
  const lateArrivedAndReplayed = model.input.scenario === 'late-duplicate'
    && model.input.upTo >= FINISHED_AT + 1
  checks.push({
    id: 'LATE_DUPLICATE_IGNORED',
    label: 'finish 后的迟到重复不计入消息',
    expected: lateArrivedAndReplayed
      ? `「${duplicateText}」在正文中出现恰好 1 次`
      : '本推演位置没有迟到增量需要处理',
    actual: lateArrivedAndReplayed ? `实际出现 ${occurrences} 次` : `已推进 ${model.input.upTo} 步`,
    pass: lateArrivedAndReplayed ? occurrences === 1 : true,
  })

  const toolCalls = model.accepted.filter(chunk => chunk.kind === 'tool-call').length
  checks.push({
    id: 'TOOL_CALL_SEPARATE',
    label: 'tool-call 块独立计数，不混入正文',
    expected: String(toolCalls),
    actual: String(model.observations.toolCalls),
    pass: model.observations.toolCalls === toolCalls,
  })

  return { pass: checks.every(check => check.pass), checks }
}
