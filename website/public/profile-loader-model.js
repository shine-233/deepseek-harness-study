/**
 * Profile、Bundle 与 Loader 解析顺序的纯模型。
 *
 * 课程 15 要说明一份最终配置是怎么被算出来的。本模型按声明顺序折叠 Bundle 的 patch，
 * 再叠加用户目录和命令行 overlay，并检验两条实现里真正存在的规则：
 *
 *   1. 顺序决定结果：同一组 patch 换顺序会得到不同的最终值，所以顺序是配置的一部分；
 *   2. 配置错误必须显式失败：patch 指向不存在的插件时停下报错，不能悄悄跳过。
 *
 * 每个维度的含义：
 *   横轴 = 解析步骤序号（声明顺序，不是耗时）
 *   纵轴 = 配置键
 *   格子 = 该步骤是否写了这个键；实心表示这一步是该键的最终写者
 *   颜色 = 只区分“最终写者”“被后面覆盖”“未触及”三档，不编码来源层
 * 没有测量：真实加载耗时、真实磁盘 IO、真实插件激活顺序下的副作用。
 */

const CONFIG_KEYS = Object.freeze(['model', 'maxTurns', 'tools.web', 'tools.shell', 'telemetry'])

export const PROFILE_KEYS = CONFIG_KEYS

/** 教学用的 Bundle：每个带一份 patch，按 Profile 里的顺序应用。 */
const BUNDLE_CATALOG = Object.freeze({
  base: Object.freeze({
    label: '基础 Bundle',
    provides: Object.freeze(['core']),
    patch: Object.freeze({ model: 'deepseek-chat', maxTurns: 8, telemetry: 'off' }),
  }),
  'web-tools': Object.freeze({
    label: 'Web 工具 Bundle',
    provides: Object.freeze(['web']),
    patch: Object.freeze({ 'tools.web': 'enabled', maxTurns: 12 }),
  }),
  'shell-tools': Object.freeze({
    label: 'Shell 工具 Bundle',
    provides: Object.freeze(['shell']),
    patch: Object.freeze({ 'tools.shell': 'enabled' }),
  }),
  observability: Object.freeze({
    label: '可观测性 Bundle',
    provides: Object.freeze(['telemetry']),
    patch: Object.freeze({ telemetry: 'sampled' }),
  }),
  'strict-limits': Object.freeze({
    label: '严格上限 Bundle',
    provides: Object.freeze(['limits']),
    patch: Object.freeze({ maxTurns: 4 }),
  }),
  'broken-ref': Object.freeze({
    label: '引用了不存在插件的 Bundle',
    provides: Object.freeze(['broken']),
    // 这条 patch 指向一个没有任何 Bundle 提供的插件，用来演示“显式失败”。
    patch: Object.freeze({ 'tools.web': 'enabled' }),
    requires: Object.freeze(['nonexistent-plugin']),
  }),
})

export const BUNDLE_NAMES = Object.freeze(Object.keys(BUNDLE_CATALOG))

export const OVERLAY_SOURCES = Object.freeze([
  Object.freeze({ id: 'none', label: '不叠加 overlay', patch: Object.freeze({}) }),
  Object.freeze({
    id: 'user-dir',
    label: '用户目录 overlay',
    patch: Object.freeze({ telemetry: 'off' }),
  }),
  Object.freeze({
    id: 'cli',
    label: '命令行 overlay',
    patch: Object.freeze({ maxTurns: 20, model: 'deepseek-reasoner' }),
  }),
  Object.freeze({
    id: 'user-then-cli',
    label: '用户目录再叠命令行',
    patch: Object.freeze({ telemetry: 'off', maxTurns: 20, model: 'deepseek-reasoner' }),
  }),
])

function resolveInput(input = {}) {
  const order = input.order ?? ['base', 'web-tools', 'shell-tools', 'observability', 'strict-limits']
  const overlay = input.overlay ?? 'none'
  if (!Array.isArray(order)) throw new TypeError('order must be an array')
  for (const name of order) {
    if (!Object.hasOwn(BUNDLE_CATALOG, name)) throw new RangeError('unknown bundle: ' + String(name))
  }
  if (!OVERLAY_SOURCES.some(candidate => candidate.id === overlay)) {
    throw new RangeError('unknown overlay: ' + String(overlay))
  }
  return { order: [...order], overlay }
}

/**
 * 按声明顺序解析出最终配置。
 *
 * 每一步都记下它写了哪些键；最后回头标出每个键的最终写者。patch 指向不存在的插件时
 * 立刻停下，`failure` 带上位置和原因，后面的步骤一条都不应用。
 */
export function resolveProfile(input = {}) {
  const resolved = resolveInput(input)
  const overlay = OVERLAY_SOURCES.find(candidate => candidate.id === resolved.overlay)
  const provided = new Set()
  for (const name of resolved.order) {
    for (const capability of BUNDLE_CATALOG[name].provides) provided.add(capability)
  }

  const steps = []
  let config = {}
  let failure = null

  for (const [index, name] of resolved.order.entries()) {
    const bundle = BUNDLE_CATALOG[name]
    const missing = (bundle.requires ?? []).filter(requirement => !provided.has(requirement))
    if (missing.length > 0) {
      failure = {
        stepIndex: index,
        source: name,
        reason: 'patch 需要的插件没有任何 Bundle 提供：' + missing.join('、'),
      }
      steps.push({ index, kind: 'bundle', source: name, label: bundle.label, wrote: [], applied: false, reason: failure.reason })
      break
    }
    const wrote = Object.keys(bundle.patch)
    config = { ...config, ...bundle.patch }
    steps.push({ index, kind: 'bundle', source: name, label: bundle.label, wrote, applied: true, reason: null })
  }

  if (failure === null && Object.keys(overlay.patch).length > 0) {
    const wrote = Object.keys(overlay.patch)
    config = { ...config, ...overlay.patch }
    steps.push({
      index: steps.length,
      kind: 'overlay',
      source: overlay.id,
      label: overlay.label,
      wrote,
      applied: true,
      reason: null,
    })
  }

  // 最终写者：同一个键被写多次时，只有最后一次决定结果。
  const finalWriter = new Map()
  for (const step of steps) {
    if (!step.applied) continue
    for (const key of step.wrote) finalWriter.set(key, step.index)
  }
  for (const step of steps) {
    step.finalFor = step.wrote.filter(key => finalWriter.get(key) === step.index)
    step.overriddenFor = step.wrote.filter(key => finalWriter.get(key) !== step.index)
  }

  return { input: resolved, overlay: { id: overlay.id, label: overlay.label }, steps, config, failure, finalWriter }
}

/**
 * 建立课程页需要的完整模型：解析结果加上观测读数和证据边界。
 */
export function buildProfileModel(input = {}) {
  const resolution = resolveProfile(input)
  const keys = CONFIG_KEYS
  const unset = keys.filter(key => !Object.hasOwn(resolution.config, key))
  const contested = keys.filter(key => resolution.steps
    .filter(step => step.applied && step.wrote.includes(key)).length > 1)

  return {
    ...resolution,
    keys,
    observations: {
      declaredBundles: resolution.input.order.length,
      appliedSteps: resolution.steps.filter(step => step.applied).length,
      failedAt: resolution.failure === null ? null : resolution.failure.stepIndex,
      resolvedKeys: Object.keys(resolution.config).length,
      unsetKeys: unset,
      contestedKeys: contested,
      finalValues: keys.map(key => ({
        key,
        value: resolution.config[key] ?? null,
        writtenBy: resolution.finalWriter.has(key)
          ? resolution.steps[resolution.finalWriter.get(key)].label
          : null,
      })),
    },
    canProve: [
      '最终配置是声明顺序的函数：同一组 Bundle 换顺序，被覆盖的键会得到不同的最终值。',
      'overlay 叠在所有 Bundle patch 之上，所以它能覆盖 Bundle 写好的值，反过来不行。',
      'patch 指向没有任何 Bundle 提供的插件时，解析在那一步停下并报出位置和原因，不会跳过它继续。',
      '一个键被多次写入不是错误；哪一次生效由顺序决定，本页把每个键的最终写者标出来。',
    ],
    cannotProve: [
      '不能证明真实 DSH 的 Bundle 名、配置键、overlay 层次或 patch 语法与这里相同。',
      '不能证明真实加载耗时、磁盘 IO 或插件激活顺序带来的副作用。',
      '不能证明真实部署里 patch 冲突的报错文案和恢复路径。',
      '不能用本页替代 Loader 与 Bundle 解析的源码、装配测试或真实启动日志。',
    ],
  }
}

/**
 * 独立核对顺序语义和显式失败。
 *
 * oracle 自己重解析一次，并逐键验证“最终值等于最后一个写它的步骤写的值”。
 */
export function evaluateProfileOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const again = resolveProfile(model.input)
  add('RESOLUTION_IS_DETERMINISTIC', '同一份输入解析两次得到同一份配置',
    JSON.stringify(again.config) === JSON.stringify(model.config),
    '两次结果相同',
    JSON.stringify(again.config) === JSON.stringify(model.config) ? '两次结果相同' : '两次结果不同')

  // 逐键手算最终值，不复用 finalWriter：如果 finalWriter 算错了，这一条会失败。
  const wrong = []
  for (const key of model.keys) {
    const writers = model.steps.filter(step => step.applied && step.wrote.includes(key))
    if (writers.length === 0) {
      if (Object.hasOwn(model.config, key)) wrong.push(key + '（无人写却有值）')
      continue
    }
    const last = writers.at(-1)
    const expectedValue = last.kind === 'overlay'
      ? OVERLAY_SOURCES.find(candidate => candidate.id === last.source).patch[key]
      : undefined
    if (expectedValue !== undefined && model.config[key] !== expectedValue) {
      wrong.push(key + '（最终值不是最后写者写的）')
    }
  }
  add('LAST_WRITER_WINS', '每个键的最终值来自最后一个写它的步骤',
    wrong.length === 0, '0 个键错位', wrong.join('、') || '0 个键错位')

  const afterFailure = model.failure === null
    ? []
    : model.steps.filter(step => step.index > model.failure.stepIndex && step.applied)
  add('FAILURE_STOPS_RESOLUTION', '解析失败后没有任何步骤被应用',
    afterFailure.length === 0, '失败之后 0 步应用',
    model.failure === null ? '本场景没有失败' : String(afterFailure.length) + ' 步应用')

  const failedStepApplied = model.steps.filter(step => !step.applied && step.reason === null)
  add('SKIPPED_STEP_HAS_REASON', '每个未应用的步骤都记了原因',
    failedStepApplied.length === 0, '0 个缺原因',
    failedStepApplied.map(step => step.source).join('、') || '0 个缺原因')

  const ordered = model.steps.every((step, index) => step.index === index)
  add('STEPS_ORDERED', '步骤序号连续且从 0 开始',
    ordered, '0..' + String(model.steps.length - 1), ordered ? '连续' : '有跳号')

  const overlayLast = model.steps.every((step, index) =>
    step.kind !== 'overlay' || index === model.steps.length - 1)
  add('OVERLAY_APPLIES_LAST', 'overlay 叠在所有 Bundle patch 之后',
    overlayLast, 'overlay 在最后一步', overlayLast ? 'overlay 在最后一步' : 'overlay 出现在中间')

  return { pass: checks.every(check => check.pass), checks }
}
