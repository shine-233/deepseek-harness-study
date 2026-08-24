/**
 * 溢出转储（spill-policy）的纯教学模型：基于上游
 * packages/spill/spill-policy/src/index.ts（基线 aa6c361a）的真实行为。
 *
 * 核心规则（全部来自上游顶注与 config 校验）：
 * - `maxInlineBytes` 未配置 ⇒ 这个插件根本不注册监听器，是真 no-op。
 * - 只有「最终 formatted 文本是纯文本」的结果才参与；带任何非文本块的结果原样放行。
 * - `read` 工具被模型侧豁免：避免 read → spill → 再 read 的循环；
 *   `tools/code-dispatch-log` 那条臂仍会给 read 的子调用封顶（日志副本不是模型上下文）。
 * - 超 cap 时：完整文本逐字存入会话作用域工件（`ctx.spillStore`），
 *   模型看到的是 head/tail 有界预览 + 一行定位符与取回指引；
 *   提示行的字节成本计在预算内，替换后总尺寸不超过 cap。
 * - 尽力而为：没有会话属主、没有 spillStore 后端或保存失败 ⇒ 记录并原样返回，
 *   绝不把成功的工具调用变成 isError，也绝不隐藏行内结果。
 *
 * 没有测量：真实 UTF-8 编码差异按字节数直接模拟；不启动真实文件系统。
 */

export const SPILL_LANES = Object.freeze(['工具结果', '策略闸', '模型上下文', '溢出工件'])

export const SPILL_LIMITS = Object.freeze({
  resultBytes: Object.freeze({ min: 0, max: 4000 }),
  maxInlineBytes: Object.freeze({ min: 100, max: 1500 }),
})

/**
 * head/tail 有界预览的纯数学：把预算对半分给两端，
 * 提示行单独计费后再从总预算里扣除——这是上游「replacement 不超 cap」的关键。
 */
export function planPreviewBudget(resultBytes, maxInlineBytes, noticeBytes) {
  if (!Number.isInteger(maxInlineBytes) || maxInlineBytes < 0) throw new RangeError('cap 必须是非负整数')
  if (!Number.isInteger(noticeBytes) || noticeBytes < 0) throw new RangeError('noticeBytes 必须是非负整数')
  const remaining = maxInlineBytes - noticeBytes
  if (remaining < 2) return null // 连一行省略号都放不下：上游此时退化为最小预览，本页判为不可行
  const half = Math.floor(remaining / 2)
  return { headBytes: Math.min(half, resultBytes), tailBytes: Math.min(remaining - Math.min(half, resultBytes), resultBytes), noticeBytes }
}

function resolveInput(input = {}) {
  const limits = SPILL_LIMITS
  const intIn = (name, value, min, max) => {
    if (typeof value !== 'number' || !Number.isInteger(value)) throw new TypeError(name + ' 必须是整数')
    if (value < min || value > max) throw new RangeError(name + ' 超出范围：' + String(value))
    return value
  }
  const resultBytes = intIn('resultBytes', input.resultBytes ?? 900, limits.resultBytes.min, limits.resultBytes.max)
  const configured = input.configured !== false
  const maxInlineBytes = configured
    ? intIn('maxInlineBytes', input.maxInlineBytes ?? 600, limits.maxInlineBytes.min, limits.maxInlineBytes.max)
    : null
  if (input.isReadTool !== undefined && typeof input.isReadTool !== 'boolean') throw new TypeError('isReadTool 必须是布尔值')
  if (input.hasBackend !== undefined && typeof input.hasBackend !== 'boolean') throw new TypeError('hasBackend 必须是布尔值')
  if (input.plainText !== undefined && typeof input.plainText !== 'boolean') throw new TypeError('plainText 必须是布尔值')
  return {
    resultBytes,
    maxInlineBytes,
    configured,
    isReadTool: input.isReadTool === true,
    hasBackend: input.hasBackend !== false,
    plainText: input.plainText !== false,
  }
}

/**
 * 推演一次工具结果的「进上下文之旅」。
 */
/** 提示行的字节预算：最多 120 字节，且永远给两端的预览各留出至少 1 字节。 */
function spillNoticeBudget(maxInlineBytes) {
  return Math.min(120, Math.max(0, maxInlineBytes - 2))
}
export function buildSpillModel(input = {}) {
  const resolved = resolveInput(input)
  const { resultBytes, maxInlineBytes, configured, isReadTool, hasBackend, plainText } = resolved

  const steps = []
  let lane = 0
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ lane: SPILL_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'produce', '工具执行完成，产出 ' + String(resultBytes) + ' 字节'
    + (plainText ? '纯文本结果。' : '结果，其中包含非文本块。'))

  if (!configured) {
    push(1, 'not-registered', 'maxInlineBytes 未配置：这个插件不注册任何监听器，整条链路是真 no-op。')
    push(2, 'inline', '结果原样进入模型上下文：' + String(resultBytes) + ' 字节。')
  } else if (!plainText) {
    push(1, 'non-text-pass', '结果携带非文本块：策略只认得最终 formatted 文本，原样放行。')
    push(2, 'inline', '结果原样进入模型上下文：' + String(resultBytes) + ' 字节。')
  } else if (isReadTool) {
    push(1, 'read-exempt', 'read 由模型侧豁免：避免 read → spill → 再 read 的循环。')
    push(2, 'inline', '结果原样进入模型上下文：' + String(resultBytes) + ' 字节。')
    push(3, 'log-arm-note', 'dispatch-log 那条臂仍会给 read 子调用的日志副本封顶——日志不是模型上下文。')
  } else if (resultBytes <= maxInlineBytes) {
    push(1, 'within-cap', String(resultBytes) + ' ≤ cap ' + String(maxInlineBytes) + '：未超限，不需要转储。')
    push(2, 'inline', '结果原样进入模型上下文：' + String(resultBytes) + ' 字节。')
  } else if (!hasBackend) {
    push(1, 'best-effort', '没有可用的 ctx.spillStore 后端：spill 是尽力而为——记录并原样放行。')
    push(2, 'inline', '结果原样进入模型上下文：' + String(resultBytes) + ' 字节。转储失败绝不把成功调用变成 isError。')
  } else {
    push(1, 'over-cap', String(resultBytes) + ' > cap ' + String(maxInlineBytes) + '：触发转储。')
    const locator = 'spill://' + String(resultBytes) + '-' + String(maxInlineBytes)
    push(3, 'save-full', '完整文本逐字存入会话作用域工件，定位符 ' + locator + '。', { artifactBytes: resultBytes })
    // 提示行成本计在预算内；cap 小到连提示行都快装不下时，提示行先让位——
    // 至少留出 2 字节给两端的省略号，替换后总尺寸仍然不超过 cap。
    const noticeBytes = spillNoticeBudget(maxInlineBytes)
    const budget = planPreviewBudget(resultBytes, maxInlineBytes, noticeBytes)
      ?? planPreviewBudget(resultBytes, maxInlineBytes, Math.min(noticeBytes, Math.max(0, maxInlineBytes - 2)))
      ?? { headBytes: 0, tailBytes: 0, noticeBytes: maxInlineBytes }
    push(1, 'compose-preview', '预算内拼装替换：head ' + String(budget.headBytes)
      + ' + tail ' + String(budget.tailBytes)
      + ' + 空行 + 提示行 ' + String(budget.noticeBytes)
      + '，提示行成本计在预算内。')
    push(2, 'model-sees', '模型看到的：有界预览 + 定位符 ' + locator + ' 和取回指引，共 '
      + String(Math.min(resultBytes, budget.headBytes + budget.tailBytes + budget.noticeBytes)) + ' 字节 ≤ cap。')
  }

  const spilled = steps.some(s => s.phase === 'save-full')
  let replacementBytes = resultBytes
  let preview = null
  if (spilled) {
    const noticeBudget = spillNoticeBudget(maxInlineBytes)
    const b = planPreviewBudget(resultBytes, maxInlineBytes, noticeBudget)
      ?? planPreviewBudget(resultBytes, maxInlineBytes, Math.min(noticeBudget, Math.max(0, maxInlineBytes - 2)))
      ?? { headBytes: 0, tailBytes: 0, noticeBytes: maxInlineBytes }
    replacementBytes = Math.min(resultBytes, b.headBytes + b.tailBytes + b.noticeBytes)
    preview = { headBytes: b.headBytes, tailBytes: b.tailBytes, noticeBytes: b.noticeBytes }
  }

  return {
    input: { ...resolved },
    steps,
    lanes: SPILL_LANES,
    observations: {
      resultBytes,
      maxInlineBytes,
      configured,
      spilled,
      replacementBytes,
      preview,
      savedFullBytes: spilled ? resultBytes : null,
      withinCap: replacementBytes <= (configured ? maxInlineBytes : Number.MAX_SAFE_INTEGER),
      loopPrevented: !isReadTool || !spilled,
      bestEffortFallback: !hasBackend && configured,
      forkShape: spilled ? '转储 + 预览替换'
        : !configured ? '未配置：真 no-op'
        : isReadTool ? 'read 豁免'
        : !plainText ? '非文本放行'
        : !hasBackend ? '尽力而为放行'
        : '未超限直通',
    },
    canProve: [
      '超过 maxInlineBytes 的纯文本结果被替换为预算内的预览加定位符，完整文本在工件里逐字保留。',
      '替换后的总尺寸不超过 cap：提示行的字节成本计在预算内。',
      'read 永远不会被模型侧转储，循环在结构上不可能发生。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 UTF-8 编码下的字节边界：本页按给定字节数直接推演。',
      '不能证明真实文件系统的命名冲突处理或私有权限位。',
      '不能证明真实 dispatch-log 臂的事件字段与这里相同。',
      '不能用本页替代 output-retention（TextRetainer）的预览实现细节。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算每一条规则。 */
export function evaluateSpillOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildSpillModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('SP_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  const cap = o.configured ? o.maxInlineBytes : Number.POSITIVE_INFINITY
  // cap 承诺只在真正发生转储时成立；尽力而为放行的原始超大结果不受它保护。
  add('SP_WITHIN_CAP', '发生转储时，进入模型上下文的尺寸不超过 cap',
    !o.spilled || o.replacementBytes <= cap,
    '≤ ' + (o.configured ? String(o.maxInlineBytes) : '∞（未配置）'),
    String(o.replacementBytes))

  add('SP_FULL_VERBATIM', '发生转储时完整文本逐字保留在工件里',
    !o.spilled || o.savedFullBytes === o.resultBytes,
    o.spilled ? '工件 ' + String(o.resultBytes) + ' 字节' : '本输入未触发转储',
    o.spilled ? String(o.savedFullBytes) + ' 字节' : '—')

  const readSteps = model.steps.filter(s => s.phase === 'read-exempt')
  add('SP_READ_EXEMPT', 'read 工具不被模型侧转储',
    o.loopPrevented,
    '豁免或未触发',
    readSteps.length > 0 ? '已豁免' : (o.spilled ? '非 read，正常转储' : '未触发'))

  add('SP_BEST_EFFORT', '没有后端时原样放行而不是报错',
    o.bestEffortFallback ? o.replacementBytes === o.resultBytes && !o.spilled : true,
    o.bestEffortFallback ? '原样返回' : '不适用',
    o.bestEffortFallback ? String(o.replacementBytes) + ' 字节原样' : '—')

  const noopStep = model.steps.some(s => s.phase === 'not-registered')
  add('SP_UNSET_NOOP', '未配置 maxInlineBytes 时插件不注册任何行为',
    o.configured ? !noopStep : noopStep,
    o.configured ? '存在策略步骤' : '零步骤 no-op',
    noopStep ? '真 no-op' : '已注册')

  return { pass: checks.every(c => c.pass), checks }
}
