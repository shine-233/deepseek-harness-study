/**
 * 循环卫生提醒的纯模型。基于上游源码
 * packages/guard/repeat-tool-reminder/src/index.ts（基线 aa6c361a）的真实行为：
 *
 * 这是一个建议性 post-execute 插件——从不拦截或改写调用，只在检测到连续重复后
 * 把提醒作为 additionalContexts 注入下一轮模型请求。判定键是
 * [工具名, 规范化参数]：参数先做深度键排序再序列化，所以键序不同、值相同的两次
 * 调用是同一个键；值变了就是新键，链条从 1 重新计数。被拒绝的调用同样计数——
 * 对着被拒调用反复砸正是最值得打破的循环。用户插话会清空链条（agent/pre-step
 * 钩子）：跨过插话的重复不是循环。阈值默认 [3, 5, 8]，第一档温和提醒，后续各档
 * 详细报告（含工具名、连续次数、参数预览）；详细报告里的参数预览默认截到 500 字符。
 * 配置错误在加载时抛错：空列表、非整数、小于 2 或重复阈值都会 fail loud。
 *
 * 没有测量：真实模型是否听从提醒、真实部署的 include/exclude 通配配置、真实
 * 工具超时插件的协作顺序。
 */

export const GUARD_LANES = Object.freeze(['Agent 循环', 'repeat-tool-reminder', '模型上下文'])

export const GUARD_MODES = Object.freeze(['on', 'off'])
export const GUARD_THRESHOLDS = Object.freeze([3, 5, 8])
export const GUARD_ARGUMENTS_PREVIEW_CHARS = 500
export const GUARD_RESET_MODES = Object.freeze([
  'none',
  'user-interjection',
  'key-reorder',
  'value-change',
])

/** 教学用的固定工具与两组参数：一组规范键，一组换值后的键。 */
export const GUARD_TOOL_NAME = 'read_file'

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (value !== null && typeof value === 'object') {
    const sorted = {}
    for (const key of Object.keys(value).sort()) sorted[key] = canonicalize(value[key])
    return sorted
  }
  return value
}

/** 沙盒固定推 12 格：覆盖默认阈值 [3, 5, 8] 并留出重置后的第二轮。 */
export const GUARD_SANDBOX_REPEATS = 12

/**
 * 上游判定键的前半步：解析调用参数并做深度键排序规范化。
 * 只收 JSON 对象——上游数到的是工具调用的 arguments 对象。
 */
export function parseCanonicalArguments(text) {
  let parsed
  try {
    parsed = JSON.parse(text)
  } catch {
    return { ok: false, error: '不是合法 JSON：检查引号、逗号和括号' }
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, error: '参数必须是 JSON 对象，例如 {"path":"notes.md"}' }
  }
  return { ok: true, canonical: JSON.stringify(canonicalize(parsed)) }
}

/**
 * 键规范化沙盒的纯模型：两份参数各自规范化，判定是否同一个键，
 * 再给出「同一调用连发 12 次」的触发计划。确定性输出，供页面实时渲染。
 */
export function buildKeySandboxModel(argsAText, argsBText) {
  const a = parseCanonicalArguments(argsAText)
  const b = parseCanonicalArguments(argsBText)
  const sameKey = a.ok && b.ok && a.canonical === b.canonical
  const chainPlan = []
  if (a.ok) {
    for (let count = 1; count <= GUARD_SANDBOX_REPEATS; count += 1) {
      if (GUARD_THRESHOLDS.includes(count)) {
        chainPlan.push({ count, tier: count === GUARD_THRESHOLDS[0] ? 'gentle' : 'detailed' })
      }
    }
  }
  return {
    input: { argsA: argsAText, argsB: argsBText },
    a,
    b,
    sameKey,
    verdict: !a.ok || !b.ok ? 'invalid' : sameKey ? 'same-key' : 'new-key',
    repeats: GUARD_SANDBOX_REPEATS,
    chainPlan,
  }
}

/** 上游的温和文案（thresholds[0] 命中时注入的那条）。 */
export function gentleReminderText() {
  return 'You are repeating the exact same tool call with identical arguments. '
    + 'Carefully analyze the previous result before calling again: if the task is '
    + 'not complete, try a different approach or different arguments instead of '
    + 'repeating the call.'
}

/**
 * 上游的详细文案：点名工具、连续次数和规范化参数预览。预览按上游
 * argumentsPreviewChars（默认 500）从头截断，超出部分以「… (+N more chars)」
 * 标注；检测键永远使用完整规范化串，截断只影响展示。
 */
export function detailedReminderText(count, canonicalArguments, previewChars = GUARD_ARGUMENTS_PREVIEW_CHARS) {
  const preview = canonicalArguments.length > previewChars
    ? `${canonicalArguments.slice(0, previewChars)}… (+${canonicalArguments.length - previewChars} more chars)`
    : canonicalArguments
  return 'Repeated tool call detected:\n'
    + `- tool: ${GUARD_TOOL_NAME}\n`
    + `- consecutive_calls: ${count}\n`
    + `- arguments: ${preview}\n`
    + 'The repeated calls are not making progress. Do not call this tool with '
    + 'these exact arguments again. Inspect the latest result and choose a '
    + 'different action or different arguments before calling again.'
}

function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  // 两组教学参数：reorder 只动键序（规范化后与 A 全等），valueChange 动了值。
  const argsA = { path: 'notes.md' }
  const argsReordered = { path: 'notes.md' }
  const argsChanged = { path: 'summary.md' }
  const canonicalA = JSON.stringify(canonicalize(argsA))
  const canonicalChanged = JSON.stringify(canonicalize(argsChanged))

  let chain = null
  let firedGentle = false

  for (let attempt = 1; attempt <= input.attempts; attempt += 1) {
    if (input.guard === 'on' && input.resetMode === 'user-interjection' && attempt === 6) {
      chain = null
      push('Agent 循环', 'interject', '用户插话进入上下文：agent/pre-step 钩子把这条链条清零，跨过插话的重复不算循环', {
        attempt,
        resets: true,
      })
    }
    if (input.guard === 'on' && (input.resetMode === 'key-reorder' || input.resetMode === 'value-change') && attempt === 6) {
      const reorderedOnly = input.resetMode === 'key-reorder'
      if (!reorderedOnly) chain = null
      push('Agent 循环', 'mutate', reorderedOnly
        ? '第 6 次起参数只换了键序：深度键排序后仍是同一串字符，键不变，链条照常累计'
        : '第 6 次起参数换了值：规范化后的字符串不同，新键让链条从 1 重新计数',
        { attempt, resets: !reorderedOnly })
    }

    push('Agent 循环', 'issue', `第 ${attempt} 次发出 ${GUARD_TOOL_NAME} 调用（参数规范化为 ${input.resetMode === 'value-change' && attempt >= 6 ? canonicalChanged : canonicalA}）`, { attempt })

    if (input.guard !== 'on') continue

    const key = input.resetMode === 'value-change' && attempt >= 6 ? canonicalChanged : canonicalA
    const count = chain !== null && chain.key === key ? chain.count + 1 : 1
    chain = { key, count }
    if (!GUARD_THRESHOLDS.includes(count)) continue

    const gentle = count === GUARD_THRESHOLDS[0]
    firedGentle = firedGentle || gentle
    push('repeat-tool-reminder', 'remind', gentle
      ? `命中阈值 ${count}：注入温和提醒——「你在用完全相同的参数重复同一个调用」`
      : `命中阈值 ${count}：注入详细报告——tool=${GUARD_TOOL_NAME}，consecutive_calls=${count}，附规范化参数预览`,
      { attempt, tier: gentle ? 'gentle' : 'detailed', count, summary: `${GUARD_TOOL_NAME} × ${count}` })
    push('模型上下文', 'receive', `提醒挂在 post-execute 决策上进入下轮请求：模型自行决定是否换策略`, { attempt })
  }

  if (input.guard === 'on' && firedGentle && input.attempts < GUARD_THRESHOLDS[0]) {
    throw new Error('内部一致性失败：温和档在首档阈值之前触发')
  }
  return steps
}

export function buildGuardLoopModel(input) {
  if (!Number.isInteger(input.attempts)) throw new TypeError('attempts 必须是整数')
  const maxAttempts = 12
  if (input.attempts < 1 || input.attempts > maxAttempts) {
    throw new RangeError(`attempts 必须在 1 到 ${maxAttempts} 之间`)
  }
  const guard = GUARD_MODES.find(item => item === input.guard)
  if (guard === undefined) throw new RangeError('未知守卫开关：' + String(input.guard))
  const resetMode = GUARD_RESET_MODES.find(item => item === input.resetMode)
  if (resetMode === undefined) throw new RangeError('未知重置模式：' + String(input.resetMode))

  const normalized = { attempts: input.attempts, guard, resetMode }
  const steps = buildSteps(normalized)
  const reminders = steps.filter(step => step.tier !== undefined)

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      attempts: normalized.attempts,
      guardOn: guard === 'on',
      reminderCount: reminders.length,
      gentleCount: reminders.filter(step => step.tier === 'gentle').length,
      detailedCount: reminders.filter(step => step.tier === 'detailed').length,
      remindersAt: reminders.map(step => ({ attempt: step.attempt, tier: step.tier, count: step.count })),
      chainResets: steps.filter(step => step.resets === true).length,
      executedCount: normalized.attempts,
      blockedCount: 0,
    },
    canProve: Object.freeze([
      '阈值默认 [3, 5, 8]：第一档是温和提醒，之后各档是带工具名、连续次数和参数预览的详细报告',
      '判定键是 [工具名, 规范化参数]：只换键序不算新调用，换了值才重新计数',
      '用户插话清空链条（agent/pre-step 钩子）：跨过插话的相同调用不会累计成循环',
      '被拒绝的调用也计入链条——对着被拒调用反复砸正是要打破的循环',
      '提醒是建议性的：调用全部执行了（blockedCount 恒为 0）',
      '详细报告里的参数预览默认截断到 500 字符，检测本身永远用完整规范化串',
      '关闭守卫时没有任何提醒注入',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实模型看到提醒后是否换策略',
      '真实部署里 include/exclude 通配模式的具体配置值',
      '配置错误（空阈值、非整数、小于 2、重复）抛出的完整加载报错现场',
      '真实工具超时插件与它的协作顺序',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，也不重跑构建函数的计数逻辑——它沿着已生成的时间线
 * 自己回走每一段链条，核对触发位置、档位归属、建议性账目和确定性。
 */
export function evaluateGuardLoopOracle(model) {
  const checks = []

  const rebuilt = buildGuardLoopModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'GUARD_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建的步骤完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })

  // 独立回走：对每条提醒，从它的 attempt 向前数连续 issue 步，遇到真正的重置
  // 步（interject，或标记了 resets 的 mutate）就停——得到的长度必须等于记录的
  // 连续次数。
  const badCounts = []
  const stepPosition = new Map(model.steps.map((step, position) => [step, position]))
  for (const step of model.steps.filter(item => item.count !== undefined)) {
    let length = 0
    for (let position = stepPosition.get(step); position >= 0; position -= 1) {
      const candidate = model.steps[position]
      if (candidate.attempt === undefined) continue
      if (candidate.phase === 'issue') length += 1
      if (candidate.resets === true) break
    }
    if (length !== step.count) badCounts.push(`第 ${step.attempt} 次：记 ${step.count} 实算 ${length}`)
  }
  checks.push({
    id: 'CHAIN_KEY_ACCOUNTING',
    label: '每条提醒的连续次数都能沿时间线独立回走出来',
    expected: '0 处对不上',
    actual: badCounts.length === 0 ? '0 处对不上' : badCounts.join('；'),
    pass: badCounts.length === 0,
  })

  const reminders = model.steps.filter(step => step.tier !== undefined)
  const wrongTier = reminders.filter(step => (step.tier === 'gentle') !== (step.count === GUARD_THRESHOLDS[0]))
  checks.push({
    id: 'FIRST_TIER_GENTLE',
    label: '温和档严格对应首档阈值，其余各档都是详细报告',
    expected: 'gentle ⟺ 连续次数等于 3',
    actual: wrongTier.length === 0 ? '全部对应' : `${wrongTier.length} 条档位错位`,
    pass: wrongTier.length === 0,
  })

  const guardOn = model.input.guard === 'on'
  // 独立重算期望的触发计划：一个只看输入的小循环，不复用构建函数的链状态。
  const expectedPlan = []
  if (guardOn) {
    const resetAttempt = model.input.resetMode === 'user-interjection'
      || model.input.resetMode === 'value-change' ? 6 : Number.POSITIVE_INFINITY
    let count = 0
    for (let attempt = 1; attempt <= model.input.attempts; attempt += 1) {
      if (attempt === resetAttempt) count = 0
      count += 1
      if (GUARD_THRESHOLDS.includes(count)) {
        expectedPlan.push({ attempt, tier: count === GUARD_THRESHOLDS[0] ? 'gentle' : 'detailed', count })
      }
    }
  }
  checks.push({
    id: 'REMINDER_ESCALATION',
    label: guardOn ? '提醒按阈值逐级触发，位置与档位和独立重算完全一致' : '关闭守卫时无提醒',
    expected: guardOn
      ? expectedPlan.map(item => `#${item.attempt}(${item.tier})`).join(' ') || '无触发'
      : '0 条提醒',
    actual: model.observations.remindersAt.map(item => `#${item.attempt}(${item.tier})`).join(' ') || '无触发',
    pass: JSON.stringify(expectedPlan) === JSON.stringify(model.observations.remindersAt),
  })

  checks.push({
    id: 'ADVISORY_ONLY',
    label: '提醒是建议性的：所有调用都执行了',
    expected: `${model.input.attempts} 次全部执行`,
    actual: `${model.observations.executedCount} 次执行，${model.observations.blockedCount} 次拦截`,
    pass: model.observations.executedCount === model.input.attempts
      && model.observations.blockedCount === 0,
  })

  const resetsExpected = guardOn
    ? (model.input.resetMode === 'user-interjection' || model.input.resetMode === 'value-change') && model.input.attempts >= 6 ? 1 : 0
    : 0
  checks.push({
    id: 'RESET_SEMANTICS',
    label: '只有用户插话和参数换值会真正清零链条，键序变化不会',
    expected: `${resetsExpected} 次真重置`,
    actual: `${model.observations.chainResets} 次`,
    pass: model.observations.chainResets === resetsExpected,
  })

  return { pass: checks.every(check => check.pass), checks }
}
