/**
 * Session fork 与崩溃修复的纯模型。
 *
 * 课程 05 的三条规则：fork 时子 Session 继承父日志前缀并记录 parent、seed
 * length 和边界；进程崩溃时，恢复阶段根据「哪条事实没有闭合」补出对应的
 * interrupted 状态——不等于假装成功；恢复先取回 header 和 event seed。
 * 本模型把四种崩溃形态（完整、工具中间、流式中途、Turn 未开步）与 fork 开关
 * 组合成同一格式的确定性时间线。
 *
 * 教学约定：「结果缺失的工具」修复后记为 unknown；「流式中断」补一条带
 * interrupted 标记的 assistant/message；「领取输入后未开 Step」补写
 * interrupted 的 turn/end。任何时间线都不允许出现「意图有、结果缺、却标记
 * 成功」的幽灵成功。
 * 教学故障：fault='fake-result-ok' 把 crash-mid-tool 的 unknown 修复替换成
 * 一条伪造的「结果 ok」——幽灵成功的标准造法，由 REPAIR_HONESTY 抓住。
 * 没有测量：真实 SQLite/JSONL 后端、真实进程崩溃时机、真实 provider 行为。
 */

export const FORK_LANES = Object.freeze(['父 Session', '恢复阶段', '子 Session'])

export const FORK_CRASH_MODES = Object.freeze(['complete', 'crash-mid-tool', 'crash-mid-stream', 'crash-open-turn'])
export const FORK_FORK_MODES = Object.freeze(['no-fork', 'fork'])

/** 教学故障注入：伪造一条「结果 ok」把崩溃掩盖成成功。none 是唯一默认。 */
export const FORK_FAULT_TYPES = Object.freeze(['none', 'fake-result-ok'])

/** 每种崩溃形态在崩溃前留下的前缀长度与需要的修复类型。 */
const CRASH_SHAPES = Object.freeze({
  'complete': Object.freeze({ prefix: 3, repairKind: null }),
  'crash-mid-tool': Object.freeze({ prefix: 2, repairKind: 'unknown' }),
  'crash-mid-stream': Object.freeze({ prefix: 3, repairKind: 'interrupted-message' }),
  'crash-open-turn': Object.freeze({ prefix: 2, repairKind: 'open-turn' }),
})

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  push('父 Session', 'start', '回合开始：事件按序写入父日志')

  const shape = CRASH_SHAPES[input.crash]
  let prefixLength = shape.prefix

  if (input.crash === 'complete') {
    push('父 Session', 'intent', '工具意图入册：read_file（结果未定）')
    push('父 Session', 'result', '工具结果落册：ok')
  } else if (input.crash === 'crash-mid-tool') {
    push('父 Session', 'intent', '工具意图入册：read_file（结果未定）')
    // 崩溃点：intent 之后、result 之前。崩溃本身不是一条可回放的事件，
    // 它表现为「这条 result 永远不会出现」。
    push('父 Session', 'crash', '进程崩溃：这条工具的结果永远不会到来')
  } else if (input.crash === 'crash-mid-stream') {
    push('父 Session', 'message', 'user/message 写入日志：本轮输入已入册')
    push('父 Session', 'chunk', 'assistant/chunk 到达一半：模型还在输出')
    push('父 Session', 'crash', '进程崩溃：流式回复再也没有后续片段')
  } else {
    push('父 Session', 'message', 'user/message 写入日志：本轮输入已入册')
    push('父 Session', 'crash', '进程崩溃：模型请求还没发出，Turn 尚无任何 Step')
  }

  if (input.fork === 'fork') {
    push('子 Session', 'inherit', `继承父日志前缀：parent 已记录、seed length=${prefixLength}、边界已记录`, {
      inherited: prefixLength,
    })
  }

  if (input.crash === 'crash-mid-tool') {
    push('恢复阶段', 'repair', '恢复阶段补出 interrupted：该工具结果记为 unknown，不假装成功', {
      repairedAsUnknown: true,
    })
  } else if (input.crash === 'crash-mid-stream') {
    push('恢复阶段', 'repair', '恢复阶段补出 assistant/message（interrupted: true）：半截回答诚实入册', {
      repairedAsInterruptedMessage: true,
    })
  } else if (input.crash === 'crash-open-turn') {
    push('恢复阶段', 'repair', '恢复阶段补写 turn/end（reason=interrupted）：这个 Turn 没有任何 Step', {
      repairedAsOpenTurn: true,
    })
  }

  const closingLane = input.fork === 'fork' ? '子 Session' : '父 Session'
  push(closingLane, 'close', input.fork === 'fork'
    ? '子工作开始：之后的事件属于子 Session'
    : (input.crash === 'complete' ? '回合正常闭合' : '回合以 interrupted 收束'))
  return steps
}

/*
 * 教学故障注入：把 crash-mid-tool 的 unknown 修复替换成一条伪造的
 * 「结果 ok」落册。其余步骤一律不变，这样 oracle 变红时只有一个原因：
 * 恢复阶段的诚实修复被吞掉，换成了假装成功。
 */
function resolveFault(fault) {
  const type = fault ?? 'none'
  if (!FORK_FAULT_TYPES.includes(type)) {
    throw new RangeError('未知故障类型：' + String(type))
  }
  return type
}

function applyForkFault(steps, fault) {
  if (fault !== 'fake-result-ok') return steps
  // 只伪造工具结果的修复：流式中断和未开步的修复不是「结果」，没有可伪造的 ok。
  const repairIndex = steps.findIndex(step => step.repairedAsUnknown === true)
  if (repairIndex === -1) return steps
  steps.splice(repairIndex, 1, {
    index: repairIndex,
    lane: '恢复阶段',
    phase: 'result',
    detail: '工具结果落册：ok（这条结果是伪造的——崩溃之后它从未真正到达）',
  })
  return steps
}

export function buildSessionForkModel(input) {
  const crash = FORK_CRASH_MODES.find(item => item === input.crash)
  if (crash === undefined) throw new RangeError('未知崩溃模式：' + String(input.crash))
  const fork = FORK_FORK_MODES.find(item => item === input.fork)
  if (fork === undefined) throw new RangeError('未知 fork 模式：' + String(input.fork))
  const fault = resolveFault(input.fault)

  const normalized = { crash, fork, fault }
  const steps = applyForkFault(buildSteps(normalized), fault)
  const repairSteps = steps.filter(step => step.phase === 'repair')
  const inheritStep = steps.find(step => step.phase === 'inherit')

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      interruptedRepaired: repairSteps.length === 1,
      repairKind: repairSteps.length === 1 ? CRASH_SHAPES[crash].repairKind : null,
      eventsInherited: typeof inheritStep?.inherited === 'number' ? inheritStep.inherited : null,
      closingLane: steps[steps.length - 1].lane,
      // 幽灵成功的定义：存在 intent，却没有对应的 result 或 unknown 标记。
      ghostSuccess: false,
    },
    canProve: Object.freeze([
      'fork 时子 Session 的第一步是继承父前缀，parent、seed length 和边界都被记录',
      '崩溃后恢复阶段恰好补出一条修复，类型与未闭合的事实一致',
      '任何时间线都不出现「意图有、结果缺、却标记成功」的幽灵成功',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 JSONL/SQLite 后端的字节布局与截断修复算法',
      '真实进程崩溃的确切时机与信号传递',
      '真实 provider 在恢复后的续跑行为',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重推一遍时间线，再核对前缀继承规则、
 * 修复诚实度和幽灵成功禁令。
 */
export function evaluateSessionForkOracle(model) {
  const checks = []

  const rebuilt = buildSessionForkModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'FORK_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建的步骤完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })

  const crashed = model.input.crash !== 'complete'
  const expectedKind = CRASH_SHAPES[model.input.crash].repairKind
  const repairSteps = model.steps.filter(step => step.phase === 'repair')
  const kindOf = step => step.repairedAsUnknown === true ? 'unknown'
    : step.repairedAsInterruptedMessage === true ? 'interrupted-message'
      : step.repairedAsOpenTurn === true ? 'open-turn' : 'other'
  const kindsOk = crashed
    ? repairSteps.length === 1 && kindOf(repairSteps[0]) === expectedKind
    : repairSteps.length === 0
  const kindLabel = { 'unknown': 'unknown 结果', 'interrupted-message': 'interrupted 的 assistant/message', 'open-turn': 'interrupted 的 turn/end', [null]: '—' }
  checks.push({
    id: 'REPAIR_HONESTY',
    label: '崩溃后恰有一条修复，且类型与未闭合事实一致',
    expected: crashed ? `恰好 1 条${kindLabel[expectedKind]}修复` : '0 条（没有崩溃需要修复）',
    actual: repairSteps.length === 0 ? '实际 0 条' : `实际 ${String(repairSteps.length)} 条（${kindOf(repairSteps[0])}）`,
    pass: kindsOk,
  })

  let ghost = false
  for (const step of model.steps) {
    if (step.phase !== 'intent') continue
    const laterResult = model.steps.some(later =>
      later.index > step.index && (later.phase === 'result' || later.repairedAsUnknown === true))
    if (!laterResult) ghost = true
  }
  checks.push({
    id: 'NO_GHOST_SUCCESS',
    label: '每个工具意图都有落册结果或 unknown 标记跟随',
    expected: '无幽灵成功',
    actual: ghost ? '存在没有去向的 intent' : '无幽灵成功',
    pass: !ghost,
  })

  const inherited = model.observations.eventsInherited
  if (model.input.fork === 'fork') {
    const expectedPrefix = CRASH_SHAPES[model.input.crash].prefix
    checks.push({
      id: 'FORK_PREFIX_RULE',
      label: 'fork 时子 Session 记录 parent、seed length 和边界',
      expected: `继承前缀长度 ${expectedPrefix}`,
      actual: inherited === null ? '没有继承步骤' : `继承前缀长度 ${inherited}`,
      pass: inherited === expectedPrefix,
    })
  }

  return { pass: checks.every(check => check.pass), checks }
}
