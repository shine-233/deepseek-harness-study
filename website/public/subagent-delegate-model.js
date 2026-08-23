/**
 * subagent 委派的纯模型。
 *
 * 教学规则来自仓库结构：委派经过一条边界检查（深度上限来自
 * persona-tool-filter-and-depth 的设计），通过后子 Agent 在自己的 Session 里
 * 执行并恰好回报一次，父 Agent 继续主对话；被拒绝的委派不产生任何子工作。
 * 子与父的工作严格分泳道——隔离是这条链的意义。
 *
 * 没有测量：真实子进程/worker 调度、真实工具过滤矩阵、真实并发委派时序。
 */

export const DELEGATE_LANES = Object.freeze(['父 Agent', '委派边界', '子 Agent', '回报'])

export const DELEGATE_DEPTH_MODES = Object.freeze(['within-limit', 'beyond-limit'])
export const DELEGATE_OUTCOMES = Object.freeze(['report', 'fail'])

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  push('父 Agent', 'delegate', '发起委派：任务说明 + 工具过滤随行')

  if (input.depth === 'beyond-limit') {
    push('委派边界', 'reject', '深度达到上限：委派在边界处被拒', { childRan: false })
    push('父 Agent', 'settle', '收到拒绝：本轮不产生任何子工作')
    return steps
  }

  push('委派边界', 'accept', '深度检查通过：当前深度低于上限', { childRan: true })
  push('子 Agent', 'run', '子 Session 执行任务步骤（与父的工作分泳道）')

  if (input.outcome === 'report') {
    push('回报', 'settle', '子回报完成摘要：结果作为一条消息进入父对话', { reportKind: 'report' })
  } else {
    push('回报', 'settle', '子回报失败与原因：失败也是一次完整的结算', { reportKind: 'fail' })
  }
  return steps
}

export function buildSubagentDelegateModel(input) {
  const depth = DELEGATE_DEPTH_MODES.find(item => item === input.depth)
  if (depth === undefined) throw new RangeError('未知深度模式：' + String(input.depth))
  const outcome = DELEGATE_OUTCOMES.find(item => item === input.outcome)
  if (outcome === undefined) throw new RangeError('未知结局：' + String(input.outcome))

  const normalized = { depth, outcome }
  const steps = buildSteps(normalized)
  const childSteps = steps.filter(step => step.lane === '子 Agent')
  const settleStep = steps.find(step => step.phase === 'settle')

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      childRan: childSteps.length > 0,
      depthAccepted: input.depth === 'within-limit',
      reportKind: typeof settleStep.reportKind === 'string' ? settleStep.reportKind : null,
    },
    canProve: Object.freeze([
      '超出深度上限的委派在边界处被拒，子 Session 完全不启动',
      '通过的委派里，子的执行步骤只出现在自己的泳道，绝不落回父泳道',
      '启动的子工作恰好回报一次：成功摘要或失败原因都是完整结算',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实子进程与 worker 线程的调度细节',
      '真实的按 persona 工具过滤矩阵',
      '真实并发委派的交错时序与结算顺序',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再核对深度限制、
 * 泳道隔离和回报账目。
 */
export function evaluateSubagentDelegateOracle(model) {
  const checks = []

  const rebuilt = buildSubagentDelegateModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'DELEGATE_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建的步骤完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })

  const beyondLimit = model.input.depth === 'beyond-limit'
  checks.push({
    id: 'DEPTH_LIMIT_ENFORCED',
    label: '超限委派在边界处被拒，子 Session 不启动',
    expected: beyondLimit ? '边界拒绝，无子步骤' : '边界放行，有子步骤',
    actual: model.observations.childRan ? '子已启动' : '子未启动',
    pass: beyondLimit !== model.observations.childRan,
  })

  const childSteps = model.steps.filter(step => step.lane === '子 Agent')
  const parentSteps = model.steps.filter(step =>
    step.lane === '父 Agent' && (step.phase === 'run' || step.phase === 'report'))
  checks.push({
    id: 'LANE_ISOLATION',
    label: '子的执行与回报只出现在自己的泳道',
    expected: '父泳道上没有子的执行步骤',
    actual: parentSteps.length === 0 ? '符合' : `父泳道出现 ${parentSteps.length} 步子工作`,
    pass: parentSteps.length === 0 && (childSteps.length > 0 || beyondLimit),
  })

  if (!beyondLimit) {
    const settles = model.steps.filter(step => step.phase === 'settle' && step.lane === '回报')
    checks.push({
      id: 'REPORT_SETTLES',
      label: '启动的子工作恰好回报一次，成功与失败都算结算',
      expected: '恰好 1 条回报',
      actual: `实际 ${settles.length} 条（${model.observations.reportKind}）`,
      pass: settles.length === 1,
    })
  }

  return { pass: checks.every(check => check.pass), checks }
}
