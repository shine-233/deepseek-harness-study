/**
 * 循环卫生提醒的纯模型。基于上游源码
 * packages/guard/repeat-tool-reminder/src/index.ts 的真实行为：
 *
 * 这是一个建议性 post-execute 插件——不拦截任何调用，而是在检测到连续
 * 重复后向模型上下文注入提醒消息。阈值默认 [3, 5, 8] 逐级升级。
 *
 * 没有测量：真实模型是否听从提醒、真实工具超时插件、真实配置来源。
 */

export const GUARD_LANES = Object.freeze(['Agent 循环', 'repeat-tool-reminder', '模型上下文'])

export const GUARD_MODES = Object.freeze(['on', 'off'])
export const GUARD_THRESHOLDS = Object.freeze([3, 5, 8])

function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  let fired = 0
  for (let attempt = 1; attempt <= input.attempts; attempt += 1) {
    push('Agent 循环', 'issue', `第 ${attempt} 次发出同一调用`, { attempt })

    if (input.guard !== 'on') continue

    if (fired < GUARD_THRESHOLDS.length && attempt >= GUARD_THRESHOLDS[fired]) {
      const level = fired
      const kind = level === 0 ? '温和提醒：你在重复同一个调用' : `详细报告：连续 ${attempt} 次，含参数预览`
      push('repeat-tool-reminder', 'remind',
        `命中阈值 ${GUARD_THRESHOLDS[level]}：${kind}`,
        { attempt, reminded: true })
      push('模型上下文', 'receive', `模型看到提醒，自行决定是否换策略`, { attempt })
      fired += 1
    }
  }
  return steps
}

export function buildGuardLoopModel(input) {
  if (!Number.isInteger(input.attempts)) throw new TypeError('attempts 必须是整数')
  if (input.attempts < 1 || input.attempts > GUARD_THRESHOLDS[GUARD_THRESHOLDS.length - 1] + 1) {
    throw new RangeError(`attempts 必须在 1 到 ${GUARD_THRESHOLDS[GUARD_THRESHOLDS.length - 1] + 1} 之间`)
  }
  const guard = GUARD_MODES.find(item => item === input.guard)
  if (guard === undefined) throw new RangeError('未知守卫开关：' + String(input.guard))

  const normalized = { attempts: input.attempts, guard }
  const steps = buildSteps(normalized)
  const reminders = steps.filter(step => step.reminded === true)

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      attempts: normalized.attempts,
      guardOn: guard === 'on',
      reminderCount: reminders.length,
      executedCount: normalized.attempts,
      // 建议性插件不拦截任何调用——每次都执行了。
      blockedCount: 0,
    },
    canProve: Object.freeze([
      '阈值 [3, 5, 8] 逐级触发提醒，每次命中注入一条上下文消息',
      '提醒是建议性的：调用全部执行了（blockedCount 恒为 0）',
      '关闭守卫时没有任何提醒注入',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实模型看到提醒后是否换策略',
      '真实阈值的 Profile 级配置差异',
      '真实工具超时插件的协作顺序',
    ]),
  }
}

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

  const guardOn = model.input.guard === 'on'
  const expectedReminders = guardOn
    ? GUARD_THRESHOLDS.filter(t => t <= model.input.attempts).length
    : 0
  checks.push({
    id: 'REMINDER_ESCALATION',
    label: guardOn ? '提醒按阈值逐级触发' : '关闭守卫时无提醒',
    expected: `${expectedReminders} 条提醒`,
    actual: `${model.observations.reminderCount} 条`,
    pass: model.observations.reminderCount === expectedReminders,
  })

  checks.push({
    id: 'ADVISORY_ONLY',
    label: '提醒是建议性的：所有调用都执行了',
    expected: `${model.input.attempts} 次全部执行`,
    actual: `${model.observations.executedCount} 次执行，0 次拦截`,
    pass: model.observations.executedCount === model.input.attempts
      && model.observations.blockedCount === 0,
  })

  return { pass: checks.every(check => check.pass), checks }
}
