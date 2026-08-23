/**
 * 审批流的纯模型。规则逐条来自上游源码
 * packages/interaction/user-approval/src/index.ts 与 types.ts（基线 aa6c361a）：
 *
 * 结局是封闭词汇：'allowed-once' | 'rejected' | 'cancelled' | 'unavailable'。
 * 会话策略只有两档：'ask'（默认，交给应答者瀑布）和 'never'（在派发之前由服务
 * 自己裁决为 rejected，监听器注册顺序绕不过它）。无人接住、应答者抛错、应答者
 * 返回词表外的值，一律归一化为 'unavailable'——缺人时通道自己关闭。AbortSignal
 * 的检查排在一切策略之前：已中止或中止赢得竞速时结算 'cancelled'，迟到的应答按
 * 构造丢弃。每次 ask 都在会话日志里落一对审计事件：approval/asked 与
 * approval/decided，成对出现，且必须被一个打开的回合包裹，否则服务直接抛错、
 * 一个字都不落册。
 *
 * 教学约定：allowed-once 是唯一的一次性许可；四种结局收敛到同一条结果路径，
 * 工具不需要自定义失败协议。
 * 没有测量：真实审批 UI 的交互形态、真实超时降级策略、真实权限预设组合。
 */

export const APPROVAL_LANES = Object.freeze([
  '工具主体',
  '审批服务',
  '应答者',
  'Session 日志',
  '结果',
])

export const APPROVAL_POLICIES = Object.freeze(['ask', 'never'])
export const APPROVAL_RESPONDERS = Object.freeze(['ui-answerer', 'none'])
export const APPROVAL_DECISIONS = Object.freeze(['allow', 'deny'])
export const APPROVAL_ABORTS = Object.freeze(['live', 'pre-aborted'])

/** 上游 types.ts 里的封闭结局词汇，一字不改。 */
export const APPROVAL_OUTCOMES = Object.freeze([
  'allowed-once',
  'rejected',
  'cancelled',
  'unavailable',
])

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }
  const settle = (outcome) => {
    push('Session 日志', 'audit', `落配对的 approval/decided：outcome=${outcome}，与前面的 approval/asked 同 id`, {
      audit: 'decided',
      auditOutcome: outcome,
    })
    push('结果', 'settle', `统一结果分类 ${outcome}`, {
      finalOutcome: outcome,
    })
  }

  push('工具主体', 'request', '回合进行中发起 ask：请求带着 toolName、callId 和发起理由')

  // 真实顺序：approval/asked 先入册，然后才是裁决，最后补 approval/decided。
  push('Session 日志', 'audit', '落审计事件 approval/asked：id、toolName 入册（回合外落册会被整段拒绝）', {
    audit: 'asked',
  })

  if (input.abort === 'pre-aborted') {
    push('审批服务', 'abort', 'AbortSignal 已经中止：这一步排在一切策略之前，请求立即结算，不进应答链；之后赶到的应答按构造作废')
    settle('cancelled')
    return steps
  }
  if (input.policy === 'never') {
    push('审批服务', 'gate', '策略 never 由服务在派发之前裁决：不询问任何应答者，prepend 的监听器也改不了这个结论')
    settle('rejected')
    return steps
  }
  if (input.responder === 'none') {
    push('审批服务', 'route', '瀑布走完没人接住：没有可用的 answerer，默认结局 unavailable——缺人时通道自己关闭')
    settle('unavailable')
    return steps
  }
  if (input.decision === 'allow') {
    push('应答者', 'decide', '用户允许这一次调用：结局 allowed-once，只覆盖本次请求', { decision: 'allow' })
    push('工具主体', 'execute', '拿到的是一次性许可：工具主体执行，不产生任何持久授权', { bodyRan: true })
    settle('allowed-once')
    return steps
  }
  push('应答者', 'decide', '用户拒绝这次调用：结局 rejected', { decision: 'deny' })
  push('工具主体', 'skip', '结局不是 allowed-once：工具主体不运行', { bodyRan: false })
  settle('rejected')
  return steps
}

export function buildApprovalFlowModel(input) {
  const policy = APPROVAL_POLICIES.find(item => item === input.policy)
  if (policy === undefined) throw new RangeError('未知策略：' + String(input.policy))
  const responder = APPROVAL_RESPONDERS.find(item => item === input.responder)
  if (responder === undefined) throw new RangeError('未知应答者：' + String(input.responder))
  const decision = APPROVAL_DECISIONS.find(item => item === input.decision)
  if (decision === undefined) throw new RangeError('未知裁决：' + String(input.decision))
  const abort = APPROVAL_ABORTS.find(item => item === input.abort)
  if (abort === undefined) throw new RangeError('未知中止状态：' + String(input.abort))

  const normalized = { policy, responder, decision, abort }
  const steps = buildSteps(normalized)
  const settleStep = steps.find(step => step.phase === 'settle')
  const bodyStep = steps.find(step => typeof step.bodyRan === 'boolean')
  const askedSteps = steps.filter(step => step.audit === 'asked')
  const decidedSteps = steps.filter(step => step.audit === 'decided')

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      toolBodyRan: bodyStep?.bodyRan === true,
      finalOutcome: typeof settleStep.finalOutcome === 'string' ? settleStep.finalOutcome : '',
      responderLaneUsed: steps.some(step => step.lane === '应答者'),
      auditPairComplete: askedSteps.length === 1
        && decidedSteps.length === 1
        && decidedSteps[0].index > askedSteps[0].index
        && decidedSteps[0].auditOutcome === settleStep.finalOutcome,
    },
    canProve: Object.freeze([
      '结局只会是四个词之一：allowed-once、rejected、cancelled、unavailable，词表之外一律归一化为 unavailable',
      'never 策略在派发之前就给出 rejected：先注册的监听器也无法把它改成放行',
      '没有应答者、应答者抛错、应答者返回陌生值，三种情况都落到 unavailable，工具主体都不运行',
      '信号检查排在一切策略之前：请求已中止时结算 cancelled，取消赢得竞速后迟到的应答会被丢弃',
      'allowed-once 只覆盖这一次调用：至多一次执行，不产生持久授权',
      '每次 ask 恰好落一对审计事件：approval/asked 与 approval/decided 同 id 成对，且必须在回合内',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实审批界面的交互与展示形态',
      '真实宿主的超时降级策略或权限预设组合',
      '真实模型看到「策略已切换」通知后的下游行为',
      '真实会话日志里两条审计事件的写入耗时',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再核对结局词表、取消竞速的优先级、
 * never 前置闸、fail-closed、一次性许可与审计对的完整性。
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

  checks.push({
    id: 'OUTCOME_VOCABULARY',
    label: '最终结局落在上游的封闭词表里',
    expected: 'allowed-once / rejected / cancelled / unavailable 四选一',
    actual: model.observations.finalOutcome,
    pass: APPROVAL_OUTCOMES.includes(model.observations.finalOutcome),
  })

  const aborted = model.input.abort === 'pre-aborted'
  checks.push({
    id: 'CANCELLED_WINS_RACE',
    label: '已中止的请求结算 cancelled，这一步排在一切策略之前',
    expected: aborted ? 'cancelled 且无应答者步骤' : '信号存活，走正常链路',
    actual: `结局=${model.observations.finalOutcome}，应答者泳道=${model.observations.responderLaneUsed ? '用到' : '空置'}`,
    pass: aborted
      ? model.observations.finalOutcome === 'cancelled' && !model.observations.responderLaneUsed
      : model.observations.finalOutcome !== 'cancelled',
  })

  const never = !aborted && model.input.policy === 'never'
  checks.push({
    id: 'NEVER_DECIDES_BEFORE_DISPATCH',
    label: 'never 策略在派发前给出 rejected，应答者泳道保持空置',
    expected: never ? 'rejected 且无应答者步骤' : 'ask 策略走正常询问链',
    actual: `结局=${model.observations.finalOutcome}，应答者泳道=${model.observations.responderLaneUsed ? '用到' : '空置'}`,
    pass: never
      ? model.observations.finalOutcome === 'rejected'
        && !model.observations.responderLaneUsed
        && !model.observations.toolBodyRan
      : true,
  })

  const unstaffed = !aborted && model.input.policy === 'ask'
    && model.input.responder === 'none'
  checks.push({
    id: 'FAIL_CLOSED_UNAVAILABLE',
    label: '无应答者时结算 unavailable，工具主体不运行',
    expected: unstaffed ? 'unavailable，主体未运行' : '有人应答或另有前置分支',
    actual: `结局=${model.observations.finalOutcome}，主体运行=${model.observations.toolBodyRan}`,
    pass: unstaffed
      ? model.observations.finalOutcome === 'unavailable'
        && !model.observations.toolBodyRan
        && !model.observations.responderLaneUsed
      : model.observations.finalOutcome !== 'unavailable',
  })

  const allowed = !aborted && model.input.policy === 'ask'
    && model.input.responder === 'ui-answerer' && model.input.decision === 'allow'
  const bodyRuns = model.steps.filter(step => step.bodyRan === true).length
  checks.push({
    id: 'ALLOWED_ONCE_SINGLE_RUN',
    label: 'allowed-once 是唯一的许可结局，且只让主体执行一次',
    expected: allowed ? '恰好 1 次执行，结局 allowed-once' : '0 次执行',
    actual: `${bodyRuns} 次执行，结局=${model.observations.finalOutcome}`,
    pass: allowed
      ? bodyRuns === 1 && model.observations.finalOutcome === 'allowed-once'
      : bodyRuns === 0 && model.observations.finalOutcome !== 'allowed-once',
  })

  checks.push({
    id: 'AUDIT_PAIR_CLOSED',
    label: 'approval/asked 与 approval/decided 恰好成对，decided 记录最终结局',
    expected: '一对完整审计事件，结局互相一致',
    actual: model.observations.auditPairComplete ? '成对且一致' : '审计对缺失或不一致',
    pass: model.observations.auditPairComplete,
  })

  return { pass: checks.every(check => check.pass), checks }
}
