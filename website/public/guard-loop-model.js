/**
 * 循环卫生 guard 的纯模型。
 *
 * 课程 13/22 的规则：循环卫生 guard 监测同一工具调用的重复发出，在阈值处于
 * 主体执行前拒绝；guard 的拒绝是单调的——后置结算不能撤销它。本模型把同一
 * 调用被连续发出 N 次的过程摆成时间线：第几次被拦、拦截前后各执行了几次、
 * 撤销尝试为什么无效。
 *
 * 教学约定：阈值固定为 3（前两次放行给正常重试留空间，第三次起视为循环）；
 * 「单调」的含义是拒绝一旦发生，后续任何阶段都不能把它改写为已执行。
 * 没有测量：真实阈值配置、真实超时插件、真实模型的重试意图。
 */

export const GUARD_LANES = Object.freeze(['Agent 循环', '循环卫生 guard', '工具主体', '后置结算'])

export const GUARD_MODES = Object.freeze(['yes', 'no'])
export const GUARD_THRESHOLD = 3

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  let undoNoted = false
  for (let attempt = 1; attempt <= input.attempts; attempt += 1) {
    push('Agent 循环', 'issue', `第 ${attempt} 次发出同一调用`)
    const blockedByGuard = input.guard === 'yes' && attempt >= GUARD_THRESHOLD
    if (blockedByGuard) {
      push('循环卫生 guard', 'block', `达到阈值 ${GUARD_THRESHOLD}：拒绝这次重复调用`, {
        attempt, blocked: true,
      })
      if (!undoNoted) {
        push('后置结算', 'undo', '尝试撤销这次拒绝：无效——guard 的拒绝是单调的', {
          attempt, undoWorked: false,
        })
        undoNoted = true
      }
    } else {
      push('工具主体', 'execute', `执行（第 ${attempt} 次重复）`, { attempt, executed: true })
    }
  }
  return steps
}

export function buildGuardLoopModel(input) {
  if (!Number.isInteger(input.attempts)) throw new TypeError('重复次数必须是整数')
  if (input.attempts < 1 || input.attempts > GUARD_THRESHOLD + 2) {
    throw new RangeError(`重复次数必须在 1 到 ${GUARD_THRESHOLD + 2} 之间`)
  }
  const guard = GUARD_MODES.find(item => item === input.guard)
  if (guard === undefined) throw new RangeError('未知守卫开关：' + String(input.guard))

  const normalized = { attempts: input.attempts, guard }
  const steps = buildSteps(normalized)
  const blockedSteps = steps.filter(step => step.blocked === true)
  const executedSteps = steps.filter(step => step.executed === true)

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      attempts: normalized.attempts,
      threshold: GUARD_THRESHOLD,
      guardOn: guard === 'yes',
      executedCount: executedSteps.length,
      blockedCount: blockedSteps.length,
      // 撤销尝试只在第一次拦截后出现一次，且永远不成功。
      undoAttempted: steps.some(step => step.phase === 'undo'),
      undoSucceeded: false,
    },
    canProve: Object.freeze([
      `开启守卫时，从第 ${GUARD_THRESHOLD} 次起每次重复都在主体执行前被拒绝`,
      '被拒绝的调用不计入执行账目：执行数 + 拦截数恒等于发出数',
      '后置结算对拦截的撤销永远无效——单调是这条链的结构性质',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实阈值的配置来源与按 Profile 的差异',
      '真实工具超时插件与循环卫生插件的协作顺序',
      '真实模型为何重试以及重试是否合理',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再核对阈值规则、
 * 执行账目和撤销的单调性。
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

  const guardOn = model.input.guard === 'yes'
  const firstBlocked = model.steps.find(step => step.blocked === true)
  checks.push({
    id: 'THRESHOLD_RULE',
    label: guardOn
      ? `开启守卫时，拦截恰好从第 ${GUARD_THRESHOLD} 次开始`
      : '关闭守卫时没有任何拦截',
    expected: guardOn ? `首次拦截在第 ${GUARD_THRESHOLD} 步附近` : '0 次拦截',
    actual: guardOn
      ? (firstBlocked ? `首次拦截发生在第 ${firstBlocked.attempt} 次尝试` : '没有拦截')
      : `${model.observations.blockedCount} 次拦截`,
    pass: guardOn
      ? model.observations.blockedCount === Math.max(0, model.input.attempts - (GUARD_THRESHOLD - 1))
        && (firstBlocked === undefined || firstBlocked.attempt === GUARD_THRESHOLD)
      : model.observations.blockedCount === 0,
  })

  const total = model.observations.attempts
  const accounted = model.observations.executedCount + model.observations.blockedCount
  checks.push({
    id: 'EXECUTION_ACCOUNT',
    label: '执行数 + 拦截数恒等于发出的次数',
    expected: `${total} 次`,
    actual: `${model.observations.executedCount} 执行 + ${model.observations.blockedCount} 拦截`,
    pass: accounted === total,
  })

  const undos = model.steps.filter(step => step.phase === 'undo')
  const undoOk = undos.every(step => step.undoWorked === false)
  checks.push({
    id: 'MONOTONIC_UNDO',
    label: '撤销尝试至多出现一次且从不生效',
    expected: undos.length > 0 ? '1 次撤销尝试，全部无效' : '无撤销尝试',
    actual: `${undos.length} 次撤销尝试，生效=${model.observations.undoSucceeded}`,
    pass: undos.length <= 1 && undoOk && model.observations.undoSucceeded === false,
  })

  return { pass: checks.every(check => check.pass), checks }
}
