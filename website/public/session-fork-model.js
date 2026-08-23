/**
 * Session fork 与崩溃修复的纯模型。
 *
 * 课程 05 的三条规则：fork 时子 Session 继承父日志前缀并记录 parent、seed
 * length 和边界；进程在工具中间崩溃时，恢复阶段根据未闭合事实补出
 * interrupted 状态——不等于假装工具成功；恢复先取回 header 和 event seed。
 * 本模型把「完整一轮」「崩溃后仅恢复」「崩溃后恢复再 fork」三种路径摆成同一
 * 格式的确定性时间线。
 *
 * 教学约定：「结果缺失的工具」修复后记为 unknown，任何时间线都不允许出现
 * 「意图有、结果缺、却标记成功」的幽灵成功。
 * 没有测量：真实 SQLite/JSONL 后端、真实进程崩溃时机、真实 provider 行为。
 */

export const FORK_LANES = Object.freeze(['父 Session', '恢复阶段', '子 Session'])

export const FORK_CRASH_MODES = Object.freeze(['complete', 'crash-mid-tool'])
export const FORK_FORK_MODES = Object.freeze(['no-fork', 'fork'])

/** 组装一条确定性的教学时间线。所有文本和状态都来自固定常量与输入枚举。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  push('父 Session', 'start', '回合开始：事件按序写入父日志')
  push('父 Session', 'intent', '工具意图入册：read_file（结果未定）')

  const crashed = input.crash === 'crash-mid-tool'

  let prefixLength
  if (!crashed) {
    push('父 Session', 'result', '工具结果落册：ok')
    prefixLength = 3
  } else {
    // 崩溃点：intent 之后、result 之前。崩溃本身不是一条可回放的事件，
    // 它表现为「这条 result 永远不会出现」。
    push('父 Session', 'crash', '进程崩溃：这条工具的结果永远不会到来')
    prefixLength = 2
  }

  if (input.fork === 'fork') {
    push('子 Session', 'inherit', `继承父日志前缀：parent 已记录、seed length=${prefixLength}、边界已记录`, {
      inherited: prefixLength,
    })
  }

  if (crashed) {
    push('恢复阶段', 'repair', '补出 interrupted：该工具结果记为 unknown，不假装成功', {
      repairedAsUnknown: true,
    })
  }

  const closingLane = input.fork === 'fork' ? '子 Session' : '父 Session'
  push(closingLane, 'close', crashed
    ? (input.fork === 'fork' ? '子工作开始：之后的事件属于子 Session' : '回合以 interrupted 收束')
    : (input.fork === 'fork' ? '子工作开始：之后的事件属于子 Session' : '回合正常闭合'))
  return steps
}

export function buildSessionForkModel(input) {
  const crash = FORK_CRASH_MODES.find(item => item === input.crash)
  if (crash === undefined) throw new RangeError('未知崩溃模式：' + String(input.crash))
  const fork = FORK_FORK_MODES.find(item => item === input.fork)
  if (fork === undefined) throw new RangeError('未知 fork 模式：' + String(input.fork))

  const normalized = { crash, fork }
  const steps = buildSteps(normalized)
  const repairSteps = steps.filter(step => step.phase === 'repair')
  const inheritStep = steps.find(step => step.phase === 'inherit')

  return {
    input: { ...normalized },
    steps,
    observations: {
      steps: steps.length,
      interruptedRepaired: repairSteps.length === 1,
      eventsInherited: typeof inheritStep?.inherited === 'number' ? inheritStep.inherited : null,
      closingLane: steps[steps.length - 1].lane,
      // 幽灵成功的定义：存在 intent，却没有对应的 result 或 unknown 标记。
      ghostSuccess: false,
    },
    canProve: Object.freeze([
      'fork 时子 Session 的第一步是继承父前缀，parent、seed length 和边界都被记录',
      '崩溃后恢复阶段恰好补出一条 interrupted，工具结果记为 unknown',
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

  const crashed = model.input.crash === 'crash-mid-tool'
  const repairSteps = model.steps.filter(step =>
    step.phase === 'repair' && step.repairedAsUnknown === true)
  checks.push({
    id: 'REPAIR_HONESTY',
    label: '崩溃后恰有一条 interrupted 修复，结果记为 unknown',
    expected: crashed ? '恰好 1 条 unknown 修复' : '0 条（没有崩溃需要修复）',
    actual: `实际 ${repairSteps.length} 条`,
    pass: crashed ? repairSteps.length === 1 : repairSteps.length === 0,
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
    const expectedPrefix = crashed ? 2 : 3
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
