/**
 * Token 计量（dsh-token-meter）的纯教学模型：基于上游
 * packages/llm/token-meter（基线 aa6c361a）的公开行为。
 *
 * 核心规则：
 * - 计量从 Session 日志重放推导：同一前缀重放出同一读数。
 * - 基线两种来源，总数却一致：
 *     measured：provider 返回过 usage → 基线锚定 header+已有表面，
 *               增量只算锚定之后新增的内容；
 *     estimated：没有 usage → 基线只有 header 估算，增量算全部表面。
 *   两种口径下 totalTokens 相同——差别只在「哪些字节进了基线」的归属。
 * - totalTokens = max(0, baseline + surfaceDelta)；上下文压力 = 总数 / 窗口。
 *   压力只是读数：跨阈值不截断，瘦身是 compaction/spill 的事。
 *
 * 教学模型不装 tokenizer：估算按每字符 0.25 token 的粗口径——不是 tokenizer，
 * 也不是 provider 的 input token 字段。
 */

export const METER_LANES = Object.freeze(['Session 日志', 'token-meter', '读数'])

export const METER_LIMITS = Object.freeze({
  windowTokens: Object.freeze({ min: 1000, max: 32000 }),
})

/**
 * 结构化定价常量，逐条对照上游 estimate.ts:13-19：
 * 文本密度每 4 字符 1 token；每个内容块加 JSON 框架与类型标签的结构开销；
 * 每条消息再加角色字段框架开销。
 */
export const METER_ESTIMATE_CONSTANTS = Object.freeze({
  CHARS_PER_TOKEN: 4,
  BLOCK_OVERHEAD: 4,
  ROLE_OVERHEAD: 4,
})

const { CHARS_PER_TOKEN, BLOCK_OVERHEAD, ROLE_OVERHEAD } = METER_ESTIMATE_CONSTANTS

const ceilDiv = (chars) => Math.ceil(chars / CHARS_PER_TOKEN)

/**
 * 递归定价内容块数组——上游 estimateContent 的忠实移植。
 * @param {Array<{ kind: string, label: string, nameChars?: number, argsChars?: number, textChars?: number, children?: Array }> | undefined} blocks
 * @returns {{ tokens: number, rows: Array<{ label: string, formula: string, tokens: number }> }}
 */
export function estimateBlocks(blocks) {
  let tokens = 0
  const rows = []
  for (const block of blocks ?? []) {
    if (block.kind === 'text') {
      const price = ceilDiv(block.textChars) + BLOCK_OVERHEAD
      tokens += price
      rows.push({ label: block.label, formula: `⌈${String(block.textChars)}/4⌉ + 块开销4`, tokens: price })
    } else if (block.kind === 'tool-call') {
      const price = ceilDiv(block.nameChars) + ceilDiv(block.argsChars) + BLOCK_OVERHEAD
      tokens += price
      rows.push({ label: block.label, formula: `⌈名${String(block.nameChars)}/4⌉+⌈参${String(block.argsChars)}/4⌉ + 块开销4`, tokens: price })
    } else if (block.kind === 'tool-result') {
      const inner = estimateBlocks(block.children)
      const price = inner.tokens + BLOCK_OVERHEAD
      tokens += price
      rows.push({ label: block.label, formula: `嵌套 ${String(inner.tokens)} + 块开销4（递归进入子内容）`, tokens: price })
    } else {
      throw new TypeError('未知块类型：' + String(block?.kind))
    }
  }
  return { tokens, rows }
}

/** 系统提示词定价：文本 + 角色框架开销（estimateSystemTokens）。 */
export function estimateSystemTokens(systemChars) {
  return ceilDiv(systemChars) + ROLE_OVERHEAD
}

const resolveInput = function (input = {}) {
  const intNonNeg = (name, value) => {
    if (typeof value !== 'number' || !Number.isInteger(value)) throw new TypeError(name + ' 必须是整数')
    if (value < 0 || value > 20000) throw new RangeError(name + ' 超出范围：' + String(value))
    return value
  }
  const existingChars = intNonNeg('existingChars', input.existingChars ?? 1200)
  const newChars = intNonNeg('newChars', input.newChars ?? 400)
  if (input.measuredBaseline !== undefined && typeof input.measuredBaseline !== 'boolean') {
    throw new TypeError('measuredBaseline 必须是布尔值')
  }
  if (input.withToolPair !== undefined && typeof input.withToolPair !== 'boolean') {
    throw new TypeError('withToolPair 必须是布尔值')
  }
  const windowTokens = input.windowTokens ?? 8000
  if (typeof windowTokens !== 'number' || !Number.isInteger(windowTokens)
    || windowTokens < METER_LIMITS.windowTokens.min || windowTokens > METER_LIMITS.windowTokens.max) {
    throw new RangeError('windowTokens 超出范围：' + String(windowTokens))
  }
  return {
    headerChars: 120, existingChars, newChars,
    measuredBaseline: input.measuredBaseline !== false,
    withToolPair: input.withToolPair === true,
    windowTokens,
  }
}

/** 新表面的块计划：一段新增文本，可选一对工具调用与结果。 */
function surfaceBlocks(withToolPair, newChars) {
  const blocks = [{ kind: 'text', label: '新增助手文本', textChars: newChars }]
  if (withToolPair) {
    blocks.push({ kind: 'tool-call', label: 'tool-call read_file', nameChars: 9, argsChars: 120 })
    blocks.push({ kind: 'tool-result', label: 'tool-result（内嵌 200 字符文本）', children: [{ kind: 'text', label: '工具输出正文', textChars: 200 }] })
  }
  return blocks
}

/** 从日志前缀推演出计量读数。 */
export function buildMeterModel(input = {}) {
  const resolved = resolveInput(input)
  const { headerChars, existingChars, newChars, measuredBaseline, withToolPair, windowTokens } = resolved

  const headerTokens = estimateSystemTokens(headerChars)
  const newSurface = estimateBlocks(surfaceBlocks(withToolPair, newChars))
  const existingSurface = estimateBlocks([{ kind: 'text', label: '已有助手文本', textChars: existingChars }])
  const everything = estimateBlocks([...surfaceBlocks(withToolPair, newChars), { kind: 'text', label: '已有助手文本', textChars: existingChars }])

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: METER_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'replay', '重放日志前缀：header 与表面内容逐事件累加，consumedEvents 记账到当前为止。')
  const baselineTokens = measuredBaseline
    ? headerTokens + existingSurface.tokens
    : headerTokens
  const surfaceDeltaTokens = measuredBaseline ? newSurface.tokens : everything.tokens
  push(1, 'baseline', measuredBaseline
    ? 'provider 返回过 usage：实测基线锚定 header + 已有表面 = ' + String(baselineTokens) + ' tokens。'
    : '没有 usage：估算基线只有 header（⌈120/4⌉+角色开销4）= ' + String(baselineTokens) + ' tokens。')
  push(1, 'surface-delta', '表面增量 +' + String(surfaceDeltaTokens) + ' tokens（'
    + (measuredBaseline ? '仅锚定之后的新增内容' : '全部表面内容') + '）。')
  const totalTokens = Math.max(0, baselineTokens + surfaceDeltaTokens)
  push(2, 'total', '总读数 ' + String(totalTokens) + ' tokens —— 与另一口径殊途同归。')
  const pressurePct = Math.min(100, Math.round((totalTokens / windowTokens) * 100))
  push(2, 'pressure', '上下文压力 ' + String(pressurePct) + '%（窗口 ' + String(windowTokens) + '）。'
    + (pressurePct >= 80 ? '已越过 80% 提示线——瘦身交给 compaction/spill，计量器只报数。' : ''))

  return {
    input: { ...resolved },
    lanes: METER_LANES,
    steps,
    breakdown: {
      headerFormula: `⌈${String(headerChars)}/4⌉ + 角色开销4`,
      headerTokens,
      rows: [...newSurface.rows, ...existingSurface.rows],
      totalTokens,
    },
    observations: {
      baselineKind: measuredBaseline ? 'measured' : 'estimated',
      baselineTokens,
      surfaceDeltaTokens,
      totalTokens,
      windowTokens,
      pressurePct,
      overThreshold: pressurePct >= 80,
      forkShape: pressurePct >= 80 ? '高压：接近窗口上限' : '常规：压力可控',
    },
    canProve: [
      '同一日志前缀重放出同一读数（确定性）。',
      'totalTokens = max(0, baseline + surfaceDelta)；两种基线口径的总数一致。',
      '块级定价规则与上游 estimate.ts 逐条一致：文本 ⌈字符/4⌉+4、工具调用名与参数分开计价、工具结果递归进入子内容、每条消息再加角色开销。',
      '压力只是读数：计量器不做截断，也不承诺 provider 口径的精确值。',
      '估算口径是固定密度的粗账——不是 tokenizer。',
    ],
    cannotProve: [
      '不能证明真实 provider 的 input/cached token 字段值。',
      '不能证明真实 tokenizer 对多语言文本的切分。',
      '不能证明真实 EpochHeader 的结构或版本机制。',
      '不能用本页替代 compaction 的瘦身决策。',
    ],
  }
}

/**
 * 流式时间线：新增表面按 chunk 逐拍到达，计量读数逐拍上涨；
 * 最后一拍是「usage 是否落地」的判定——measured 口径在这里完成归属切换，
 * estimated 口径则宣布整段都留在增量里。
 * @param {object} input - 与 buildMeterModel 相同的输入。
 * @returns {{ frames: Array<{ tick: number, label: string, detail: string, totalTokens: number, baselineKind: string }>, finalTotal: number }}
 */
export function buildStreamFrames(input = {}) {
  const model = buildMeterModel(input)
  const { newChars, measuredBaseline } = model.input
  const chunkCount = Math.min(12, Math.max(1, Math.ceil(newChars / 80)))
  const perChunkChars = Math.ceil(newChars / chunkCount)
  const frames = []
  for (let i = 1; i <= chunkCount; i += 1) {
    const partialInput = { ...model.input, newChars: perChunkChars * i }
    const partial = buildMeterModel(partialInput)
    frames.push({
      tick: frames.length,
      label: `chunk ${String(i)}/${String(chunkCount)} 到达`,
      detail: `+${String(perChunkChars)} 字符 → 读数 ${String(partial.observations.totalTokens)} tokens（压力 ${String(partial.observations.pressurePct)}%）。`,
      totalTokens: partial.observations.totalTokens,
      pressurePct: partial.observations.pressurePct,
      baselineKind: partial.observations.baselineKind,
    })
  }
  if (measuredBaseline) {
    frames.push({
      tick: frames.length,
      label: 'usage 落地',
      detail: `provider usage 到达：已有表面划入实测基线，归属切换、总数不变 ${String(model.observations.totalTokens)} tokens。`,
      totalTokens: model.observations.totalTokens,
      pressurePct: model.observations.pressurePct,
      baselineKind: 'measured',
    })
  } else {
    frames.push({
      tick: frames.length,
      label: '无 usage',
      detail: `provider 没有返回 usage：整段保持估算增量，总读数仍是 ${String(model.observations.totalTokens)} tokens——粗账可用，但别当实测报。`,
      totalTokens: model.observations.totalTokens,
      pressurePct: model.observations.pressurePct,
      baselineKind: 'estimated',
    })
  }
  return { frames, finalTotal: model.observations.totalTokens }
}

/** 独立校验：只读 steps 与 observations，自己重算账目。 */
export function evaluateMeterOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildMeterModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('TM_DETERMINISTIC', '同一日志前缀重放出同一读数',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  add('TM_TOTAL_ACCOUNTS', '总数等于基线加增量且不为负',
    o.totalTokens === Math.max(0, o.baselineTokens + o.surfaceDeltaTokens),
    String(Math.max(0, o.baselineTokens + o.surfaceDeltaTokens)),
    String(o.totalTokens))

  // 两种口径对同一份日志必须给出同一个总数——这是「基线只是归属方式」的证据。
  const otherKind = buildMeterModel({ ...model.input, measuredBaseline: !model.input.measuredBaseline })
  add('TM_KINDS_AGREE_ON_TOTAL', 'measured 与 estimated 两口径的总数一致',
    otherKind.observations.totalTokens === o.totalTokens,
    String(o.totalTokens),
    String(otherKind.observations.totalTokens))

  add('TM_PRESSURE_MATH', '压力百分比来自总数除以窗口',
    o.pressurePct === Math.min(100, Math.round((o.totalTokens / o.windowTokens) * 100)),
    String(Math.min(100, Math.round((o.totalTokens / o.windowTokens) * 100))) + '%',
    String(o.pressurePct) + '%')

  return { pass: checks.every(c => c.pass), checks }
}
