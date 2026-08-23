/**
 * subagent 委派的纯模型。规则逐条来自上游源码（基线 aa6c361a）：
 *
 * - packages/subagent/tool-subagent/src/index.ts：maxDepth 默认是 3
 *   （`z.natural().max(...).default(3)`），也可以设成 'provider-managed'
 *   把递归预算交给声明了 depthLimit 能力的 provider。
 * - packages/subagent/subagent/src/child-agent.ts：子深度 = 父深度 + 1；
 *   超过上限时抛 SubagentDepthError，错误文案是
 *   `subagent depth ${attemptedDepth} exceeds maxDepth ${maxDepth}`，
 *   子 Session 根本不会被创建。
 * - packages/subagent/subagent/src/depth.ts：深度记在 Session header 里，
 *   生效值取 max(header 记录, 运行时选项) 且只增不减——恢复出来的子代理带着
 *   新鲜 options，从零重数会让它冒充顶层。
 * - packages/subagent/subagent/src/child-agent.ts：子 Session 以
 *   origin: 'subagent' 创建，header 落 delegation_depth；被委派的孩子把审批
 *   策略钉在 'never'——委托出去的工作不允许再向用户弹审批。
 * - packages/subagent/tool-subagent/src/index.ts：数字上限要求 provider 声明
 *   depthLimit 能力，service 层 start() 的逐请求拒绝报 UNSUPPORTED_CAPABILITY，
 *   tool 插件挂载期的检查失败则抛普通 Error；把预算交给 provider 时配置
 *   'provider-managed'。
 *
 * 教学约定：被拒绝的委派不产生任何子工作；启动的子工作恰好回报一次，
 * 成功摘要与失败原因都是完整结算；父子工作严格分泳道。
 * 没有测量：真实 worker/子进程调度、真实工具过滤矩阵、真实并发委派时序。
 */

export const DELEGATE_LANES = Object.freeze(['父 Agent', '委派边界', '子 Agent', '回报'])

/** 上游 tool-subagent 配置里的默认递归上限。 */
export const DELEGATE_DEFAULT_MAX_DEPTH = 3
export const DELEGATE_OUTCOMES = Object.freeze(['report', 'fail'])
export const DELEGATE_PARENT_DEPTHS = Object.freeze([0, 1, 2, 3])

/**
 * 上游 delegationDepthOf 的教学镜像：header 记录权威且单调，
 * 运行时选项只能加深、不能变浅。
 */
export function effectiveDelegationDepth(headerDepth, runtimeDepth) {
  return Math.max(headerDepth ?? 0, runtimeDepth ?? 0)
}

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  const childDepth = input.parentDepth + 1
  push('父 Agent', 'delegate', `发起委派：当前代理深度 ${input.parentDepth}，子深度将是 ${childDepth}`)

  if (childDepth > DELEGATE_DEFAULT_MAX_DEPTH) {
    push('委派边界', 'reject', `SubagentDepthError：subagent depth ${childDepth} exceeds maxDepth ${DELEGATE_DEFAULT_MAX_DEPTH}`, {
      childRan: false,
      rejected: true,
    })
    push('父 Agent', 'settle', '收到拒绝结算：本轮不产生任何子工作', { reportKind: null })
    return steps
  }

  push('委派边界', 'accept', `深度检查通过：${childDepth} ≤ maxDepth ${DELEGATE_DEFAULT_MAX_DEPTH}`, {
    childRan: true,
    rejected: false,
  })
  push('子 Agent', 'create', `创建子 Session：origin='subagent'，header 落 delegation_depth=${childDepth}；审批策略被钉在 'never'——委派链上不再向用户弹审批`)
  push('子 Agent', 'run', `子代理以 delegation_depth=${childDepth} 运行：恢复时取 max(header, 运行时值)，深度只增不减`)

  if (input.outcome === 'report') {
    push('回报', 'settle', '子回报完成摘要：结果作为一条消息进入父对话', { reportKind: 'report' })
  } else {
    push('回报', 'settle', '子回报失败与原因：失败也是一次完整的结算', { reportKind: 'fail' })
  }
  return steps
}

export function buildSubagentDelegateModel(input) {
  if (!Number.isInteger(input.parentDepth)) throw new TypeError('parentDepth 必须是整数')
  if (!DELEGATE_PARENT_DEPTHS.includes(input.parentDepth)) {
    throw new RangeError('未知父深度：' + String(input.parentDepth))
  }
  const outcome = DELEGATE_OUTCOMES.find(item => item === input.outcome)
  if (outcome === undefined) throw new RangeError('未知结局：' + String(input.outcome))

  const normalized = { parentDepth: input.parentDepth, outcome }
  const steps = buildSteps(normalized)
  const boundaryStep = steps.find(step => step.rejected !== undefined)

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      parentDepth: normalized.parentDepth,
      childDepth: normalized.parentDepth + 1,
      maxDepth: DELEGATE_DEFAULT_MAX_DEPTH,
      depthAccepted: boundaryStep.rejected === false,
      rejected: boundaryStep.rejected === true,
      childRan: steps.some(step => step.lane === '子 Agent'),
      reportKind: typeof steps[steps.length - 1].reportKind === 'string'
        ? steps[steps.length - 1].reportKind
        : null,
    },
    canProve: Object.freeze([
      '默认递归上限是 3：来自上游 tool-subagent 配置的 default(3)，不是页面拍脑袋定的数',
      '子深度恒为父深度加一；超过上限就抛 SubagentDepthError，原文是 subagent depth N exceeds maxDepth M',
      '被拒的委派不创建子 Session：子泳道完全为空',
      '深度记在 Session header 上并单调取最大：恢复出的子代理不能靠新鲜 options 把自己算回顶层',
      '子 Session 以 origin=\'subagent\' 创建，且审批策略被钉在 \'never\'：委派链上不再向用户弹审批',
      "数字 maxDepth 要求 provider 声明 depthLimit 能力：service 层 start() 逐请求拒绝时报 UNSUPPORTED_CAPABILITY，tool 插件挂载期检查失败则抛普通 Error；'provider-managed' 才是把预算交给 provider",
      '启动的子工作恰好回报一次，成功摘要与失败原因都算完整结算',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 worker 与子进程 provider 的调度细节',
      "'provider-managed' 模式下 provider 自己的递归记账与超时行为",
      '真实的按 persona 工具过滤矩阵',
      '真实并发委派的交错时序与结算顺序',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再核对深度算术、拒绝规则、
 * header 单调性、泳道隔离和回报账目。
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

  const arithmeticOk = model.observations.childDepth === model.observations.parentDepth + 1
  checks.push({
    id: 'DEPTH_ARITHMETIC',
    label: '子深度恰好是父深度加一',
    expected: `${model.observations.parentDepth} + 1`,
    actual: String(model.observations.childDepth),
    pass: arithmeticOk && model.steps.some(step => step.detail.includes(`子深度将是 ${model.observations.childDepth}`)),
  })

  const shouldReject = model.observations.childDepth > model.observations.maxDepth
  checks.push({
    id: 'REJECTION_RULE',
    label: '超过上限才拒绝，且拒绝时子泳道为空',
    expected: shouldReject ? `depth ${model.observations.childDepth} > ${model.observations.maxDepth}：拒绝` : '未超限：放行',
    actual: model.observations.rejected ? '边界拒绝' : '边界放行',
    pass: shouldReject === model.observations.rejected
      && (!shouldReject || !model.observations.childRan),
  })

  const monotoneCases = [
    [2, undefined, 2],
    [undefined, 1, 1],
    [1, 2, 2],
    [0, 0, 0],
  ]
  // 第三列是手工算出的期望值，不经过被测函数——否则校验就是同义反复。
  const monotoneBad = monotoneCases.filter(([header, runtime, expected]) =>
    effectiveDelegationDepth(header, runtime) !== expected)
  checks.push({
    id: 'MONOTONE_HEADER',
    label: '生效深度取 max(header, 运行时)：恢复不能把深度变浅',
    expected: '4 组用例全部单调',
    actual: monotoneBad.length === 0 ? '4 组全部单调' : `${monotoneBad.length} 组异常`,
    pass: monotoneBad.length === 0,
  })

  const childSteps = model.steps.filter(step => step.lane === '子 Agent')
  const parentRunSteps = model.steps.filter(step =>
    step.lane === '父 Agent' && (step.phase === 'run' || step.phase === 'report'))
  checks.push({
    id: 'LANE_ISOLATION',
    label: '子的执行只出现在自己的泳道',
    expected: '父泳道上没有子的执行步骤',
    actual: parentRunSteps.length === 0 ? '符合' : `父泳道出现 ${parentRunSteps.length} 步子工作`,
    pass: parentRunSteps.length === 0 && (childSteps.length > 0 || shouldReject),
  })

  if (!shouldReject) {
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
