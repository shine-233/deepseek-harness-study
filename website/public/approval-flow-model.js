/**
 * 审批流的纯模型。
 *
 * 课程 13 的规则：ask 是 DSH 的审批路径；没有可用 approval service 或 answerer
 * 时，询问必须退化为拒绝（fail closed）；审批通过也只代表这一次 typed tool
 * decision 被允许。本模型把一次 ask 的完整生命周期摆成固定教学时间线：
 * 工具主体 → 审批服务 → 应答者 → 回到工具主体 → 统一结果分类。
 *
 * 教学约定：拒绝、失败和无应答者都收敛到同一条统一结果路径，工具不会自定义
 * 一套私有失败协议；allow 是一次性的，不产生任何持久授权。
 * 没有测量：真实审批 UI 的交互、真实超时降级策略、真实权限预设。
 */

export const APPROVAL_LANES = Object.freeze(['工具主体', '审批服务', '应答者', '结果'])

export const APPROVAL_RESPONDERS = Object.freeze(['ui-answerer', 'none'])
export const APPROVAL_DECISIONS = Object.freeze(['allow', 'deny'])

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  push('工具主体', 'request', '执行前发起 ask：本次调用需要批准')

  if (input.responder === 'ui-answerer') {
    push('审批服务', 'route', '转发给已注册的应答者')
    if (input.decision === 'allow') {
      push('应答者', 'decide', '用户允许这一次调用', { decision: 'allow' })
      push('工具主体', 'execute', '工具主体执行一次（allow 仅覆盖这一次）', { bodyRan: true })
    } else {
      push('应答者', 'decide', '用户拒绝这一次调用', { decision: 'deny' })
      push('工具主体', 'skip', '拒绝或审批失败时，工具主体不会运行', { bodyRan: false })
    }
    push('结果', 'settle', '收敛为统一的错误结果分类或成功结果')
  } else {
    push('审批服务', 'route', '没有可用 approval service 或 answerer', { responderPresent: false })
    push('结果', 'settle', '询问退化为拒绝：工具主体不运行（fail closed）', {
      bodyRan: false,
      finalOutcome: 'fail-closed-deny',
    })
    return steps
  }
  return steps
}

export function buildApprovalFlowModel(input) {
  const responder = APPROVAL_RESPONDERS.find(item => item === input.responder)
  if (responder === undefined) throw new RangeError('未知应答者：' + String(input.responder))
  const decision = APPROVAL_DECISIONS.find(item => item === input.decision)
  if (decision === undefined) throw new RangeError('未知裁决：' + String(input.decision))

  const normalized = { responder, decision }
  const steps = buildSteps(normalized)
  const finalStep = steps.find(step => step.phase === 'settle')
  const bodyStep = steps.find(step => typeof step.bodyRan === 'boolean')

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      toolBodyRan: bodyStep?.bodyRan === true,
      finalOutcome: finalStep.finalOutcome ?? normalized.decision,
      // 应答者缺席时路由层自己给出结论，不应答者泳道保持空置。
      responderLaneUsed: steps.some(step => step.lane === '应答者'),
    },
    canProve: Object.freeze([
      '没有可用 approval service 或 answerer 时，询问退化为拒绝且工具主体不运行',
      'allow 只覆盖这一次调用：工具主体至多执行一次，不产生持久授权',
      '拒绝、审批失败与无应答者都收敛到统一的结果分类，而不是工具私有的失败协议',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实审批界面的交互与展示形态',
      '真实宿主的超时降级策略或权限预设组合',
      '真实模型对审批结果的下游行为',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再核对 fail-closed 规则、
 * allow 的一次性语义、拒绝不执行和确定性。
 */
export function evaluateApprovalFlowOracle(model) {
  const checks = []

  const rebuilt = buildApprovalFlowModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'APPROVAL_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建的步骤完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })

  const failClosed = model.input.responder === 'none'
  checks.push({
    id: 'FAIL_CLOSED',
    label: '无应答者时询问退化为拒绝，工具主体不运行',
    expected: failClosed ? '退化拒绝，主体未运行' : '有应答者，走正常裁决',
    actual: `主体运行=${model.observations.toolBodyRan}，结局=${model.observations.finalOutcome}`,
    pass: failClosed
      ? (!model.observations.toolBodyRan && !model.observations.responderLaneUsed
        && model.observations.finalOutcome === 'fail-closed-deny')
      : model.observations.responderLaneUsed,
  })

  const bodyRuns = model.steps.filter(step => step.bodyRan === true).length
  checks.push({
    id: 'SINGLE_USE_ALLOW',
    label: 'allow 至多让工具主体执行一次',
    expected: model.input.responder === 'ui-answerer' && model.input.decision === 'allow'
      ? '恰好 1 次执行'
      : '0 次执行',
    actual: `实际 ${bodyRuns} 次`,
    pass: (model.input.responder === 'ui-answerer' && model.input.decision === 'allow')
      ? bodyRuns === 1
      : bodyRuns === 0,
  })

  const deniedWithoutRun = !(model.input.decision === 'deny' || model.input.responder === 'none')
    || !model.observations.toolBodyRan
  checks.push({
    id: 'DENY_NO_EXECUTION',
    label: '拒绝（或缺席退化的拒绝）意味着工具主体不运行',
    expected: '拒绝场景下主体运行次数为 0',
    actual: deniedWithoutRun ? '符合' : '拒绝却出现了执行',
    pass: deniedWithoutRun,
  })

  return { pass: checks.every(check => check.pass), checks }
}
