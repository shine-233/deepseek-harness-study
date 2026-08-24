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

const estimate = chars => Math.ceil(chars / 4)

function resolveInput(input = {}) {
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
  const windowTokens = input.windowTokens ?? 8000
  if (typeof windowTokens !== 'number' || !Number.isInteger(windowTokens)
    || windowTokens < METER_LIMITS.windowTokens.min || windowTokens > METER_LIMITS.windowTokens.max) {
    throw new RangeError('windowTokens 超出范围：' + String(windowTokens))
  }
  return { headerChars: 120, existingChars, newChars, measuredBaseline: input.measuredBaseline !== false, windowTokens }
}

/** 从日志前缀推演出计量读数。 */
export function buildMeterModel(input = {}) {
  const resolved = resolveInput(input)
  const { headerChars, existingChars, newChars, measuredBaseline, windowTokens } = resolved

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: METER_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'replay', '重放日志前缀：header 与表面内容逐事件累加，consumedEvents 记账到当前为止。')
  const baselineTokens = measuredBaseline
    ? estimate(headerChars) + estimate(existingChars)
    : estimate(headerChars)
  const surfaceDeltaTokens = measuredBaseline ? estimate(newChars) : estimate(existingChars + newChars)
  push(1, 'baseline', measuredBaseline
    ? 'provider 返回过 usage：实测基线锚定 header + 已有表面 = ' + String(baselineTokens) + ' tokens。'
    : '没有 usage：估算基线只有 header = ' + String(baselineTokens) + ' tokens。')
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
      '压力只是读数：计量器不做截断，也不承诺 provider 口径的精确值。',
      '估算口径是每字符 0.25 token 的粗账——不是 tokenizer。',
    ],
    cannotProve: [
      '不能证明真实 provider 的 input/cached token 字段值。',
      '不能证明真实 tokenizer 对多语言文本的切分。',
      '不能证明真实 EpochHeader 的结构或版本机制。',
      '不能用本页替代 compaction 的瘦身决策。',
    ],
  }
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
