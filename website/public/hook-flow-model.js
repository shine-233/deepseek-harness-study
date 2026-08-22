/**
 * Hook 瀑布短路的纯模型。
 *
 * 课程 14 的核心规则来自仓库自己的不变式：瀑布监听器必须调用 next() 把控制权
 * 交还给链条；不调用 next() 而直接返回，链条就在这一环短路，后面的监听器不会
 * 执行。本模型把这条规则摆成一条固定的教学时间线：三个监听器按声明顺序各站一条
 * lane，「默认放行」的兜底规则是——链上还没有结果时写入放行，已有结果则原样传递。
 *
 * 教学约定（不是 Cordis 的全部语义）：
 *   策略监听器的「放行」就是不拦截——委托时不携带决定，结果由兜底写出；
 *   它的「拒绝」是终端决定——无论通过 next(deny) 委托还是直接 return，
 *   最终结果都由策略监听器写出。
 * 没有测量：真实 Fiber/Effect 调度、真实协议超时、真实审批界面。
 */

export const HOOK_LANES = Object.freeze(['调用方', '审计监听器', '策略监听器', '默认放行'])

export const HOOK_BEHAVIORS = Object.freeze(['call-next', 'return-direct'])
export const HOOK_VERDICTS = Object.freeze(['allow', 'deny'])

/** 兜底监听器的固定规则：没有现成结果时写入的唯一决定。 */
const FALLBACK_VERDICT = 'allow'

/** 组装一条确定性的教学时间线。所有文本和数字都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  const delegates = input.behavior === 'call-next'
  const verdictLabel = input.verdict === 'deny' ? '拒绝' : '放行'

  push('调用方', 'dispatch', '派发 tools/pre-execute（瀑布事件）')
  push('审计监听器', 'observe', '记录收到的事件', { action: 'next()', listener: 'audit' })

  if (delegates) {
    if (input.verdict === 'deny') {
      push('策略监听器', 'decide', '裁决：拒绝', { action: 'next(deny)', listener: 'policy' })
      push('默认放行', 'passthrough', '链上已有决定，原样传递', {
        action: 'next(deny)', listener: 'fallback',
      })
    } else {
      push('策略监听器', 'decide', '裁决：放行＝不拦截，不带决定', { action: 'next()', listener: 'policy' })
      push('默认放行', 'decide', '链上还没有结果，写入默认放行', {
        action: `next(${FALLBACK_VERDICT})`, listener: 'fallback',
      })
    }
  } else {
    push('策略监听器', 'decide', `裁决：${verdictLabel}，但直接返回、未调用 next()`, {
      action: `return(${input.verdict})`, listener: 'policy',
    })
    push('默认放行', 'skip', '被短路跳过：前面的监听器没有调用 next()', { listener: 'fallback' })
  }

  const shortCircuited = !delegates
  const finalAuthor = shortCircuited || input.verdict === 'deny' ? '策略监听器' : '默认放行'
  push('调用方', 'final', `最终结果：${input.verdict}（由${finalAuthor}写出）`, {
    verdict: input.verdict,
    finalAuthor,
  })
  return steps
}

export function buildHookFlowModel(input) {
  const behavior = HOOK_BEHAVIORS.find(item => item === input.behavior)
  if (behavior === undefined) throw new RangeError('未知行为：' + String(input.behavior))
  const verdict = HOOK_VERDICTS.find(item => item === input.verdict)
  if (verdict === undefined) throw new RangeError('未知裁决：' + String(input.verdict))

  const normalized = { behavior, verdict }
  const steps = buildSteps(normalized)
  const fallbackStep = steps.find(step => step.listener === 'fallback')
  const finalStep = steps.find(step => step.phase === 'final')
  // 进入＝真实执行；被短路跳过的兜底不计入。
  const executedListeners = steps.filter(step =>
    typeof step.listener === 'string' && step.phase !== 'skip').length

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      executedListeners,
      fallbackReached: fallbackStep.phase !== 'skip',
      shortCircuited: behavior === 'return-direct',
      finalVerdict: finalStep.verdict,
      finalAuthor: finalStep.finalAuthor,
    },
    canProve: Object.freeze([
      '直接 return 时默认放行不会执行，最终结果就是策略监听器的返回值',
      'call-next 时三个监听器按声明顺序各执行一次，结果沿链条传递',
      '审计监听器在任何模式下都恰好记录一次（它总是调用 next）',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 Cordis 运行时的 Fiber 与 Effect 调度细节',
      '真实 Hook Bridge 的协议字段映射、超时或退出码行为',
      '真实宿主里审批界面与人的交互',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再逐条核对短路规则、委托顺序和
 * 审计账目。任何一条失败都说明短路规则被破坏，而不是画面不好看。
 */
export function evaluateHookFlowOracle(model) {
  const checks = []

  const rebuilt = buildHookFlowModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'HOOK_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建的步骤完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })

  // 本实验的核心不变式：只有显式 return 才短路；只要调用了 next，兜底必然执行。
  const shortCircuited = model.observations.shortCircuited
  const fallbackReached = model.observations.fallbackReached
  checks.push({
    id: 'SHORT_CIRCUIT_RULE',
    label: '短路当且仅当策略监听器直接 return；短路时兜底不再执行',
    expected: shortCircuited ? '短路，兜底未执行' : '未短路，兜底已执行',
    actual: shortCircuited
      ? (fallbackReached ? '短路了但兜底仍执行' : '短路，兜底未执行')
      : (fallbackReached ? '未短路，兜底已执行' : '没短路却丢了兜底'),
    pass: shortCircuited !== fallbackReached,
  })

  const listenerLanes = ['审计监听器', '策略监听器', '默认放行']
  const enteredLanes = []
  for (const step of model.steps) {
    if (typeof step.listener !== 'string') continue
    if (step.phase === 'skip') continue
    const lane = listenerLanes.find(name => name === step.lane)
    if (lane !== undefined && enteredLanes[enteredLanes.length - 1] !== lane) {
      enteredLanes.push(lane)
    }
  }
  const expectedOrder = shortCircuited ? listenerLanes.slice(0, 2) : listenerLanes
  checks.push({
    id: 'DELEGATE_ORDER',
    label: '执行到的监听器严格按声明顺序各进入一次',
    expected: expectedOrder.join(' → '),
    actual: enteredLanes.join(' → ') || '（无人执行）',
    pass: enteredLanes.join('→') === expectedOrder.join('→'),
  })

  const auditSteps = model.steps.filter(step => step.listener === 'audit')
  const auditDelegates = auditSteps.every(step => step.action === 'next()')
  checks.push({
    id: 'AUDIT_ONCE',
    label: '审计监听器恰好记录一次，并且总是委托',
    expected: '1 条记录，动作 next()',
    actual: `${auditSteps.length} 条记录，动作 ${auditSteps.map(step => step.action).join('、') || '无'}`,
    pass: auditSteps.length === 1 && auditDelegates,
  })

  const finalStep = model.steps.find(step => step.phase === 'final')
  checks.push({
    id: 'FINAL_AUTHOR',
    label: '最终结果的作者与短路状态一致',
    expected: shortCircuited ? '策略监听器' : (model.input.verdict === 'deny' ? '策略监听器' : '默认放行'),
    actual: finalStep.finalAuthor,
    pass: finalStep.finalAuthor === (shortCircuited || model.input.verdict === 'deny'
      ? '策略监听器'
      : '默认放行'),
  })

  return { pass: checks.every(check => check.pass), checks }
}
