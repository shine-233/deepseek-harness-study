/**
 * 计划栈三层状态机的纯模型：todo_write 快照机、plan/mode 协作状态机、
 * goal 生命周期机。配对第 37 课使用。
 *
 * 事实来源是固定提交 aa6c361a 里三个包的 README：
 *
 *   todo_write：模型每次提交整表快照（无增量）；status ∈ pending/in_progress/
 *   completed；空 content、重复 content、扩展键一律显式拒绝；非 agent 调用者
 *   被拒；allowParallelInProgress=false 时多任务 in_progress 报
 *   `at most one task may be in_progress (got <n>)`；成功返回计数确认句。
 *
 *   plan/mode：logged 布尔 + 可选 pending 选择；idle 时立即 commit，running 时
 *   挂起到下一个 pre-step；结果词 committed/queued/cancelled/noop；
 *   exit_plan_mode 只在 active 时接受；dismiss 告知模型留在计划态。
 *
 *   goal：事件溯源、单目标、revision CAS 栅栏；phase ∈ active/paused/completed/
 *   blocked/cleared；pause/block/clear 都撤权（disarm），resume 接受停止态或
 *   被撤权的活跃目标且轮次上限有余量；activation 是进程本地的，不持久化。
 */

export const PLAN_STACK_MODES = Object.freeze(['todo', 'plan', 'goal'])

/*
 * 教学故障注入：按当前面板伪造结论。none 是唯一默认；
 * todo→bump-counts 让三类计数失衡；plan→fake-commit 把 queued 伪造成 committed；
 * goal→fake-rearm 把撤权伪造成 armed。各自只打红一条校验。
 */
export const PLAN_STACK_FAULT_TYPES = Object.freeze(['none', 'bump-counts', 'fake-commit', 'fake-rearm'])

function resolveFault(fault) {
  const type = fault ?? 'none'
  if (!PLAN_STACK_FAULT_TYPES.includes(type)) {
    throw new RangeError('未知故障类型：' + String(type))
  }
  return type
}

/* ---------- Panel A：todo_write ---------- */

export const TODO_STRICT_MODES = Object.freeze(['parallel-allowed', 'single-active'])

export const TODO_PRESETS = Object.freeze({
  validSingle: Object.freeze([
    { content: '读配置', status: 'completed' },
    { content: '改 timeout', status: 'in_progress' },
    { content: '跑测试', status: 'pending' },
  ]),
  validParallel: Object.freeze([
    { content: '前端修复', status: 'in_progress' },
    { content: '后端修复', status: 'in_progress' },
    { content: '回归测试', status: 'pending' },
  ]),
  duplicateContent: Object.freeze([
    { content: '改 timeout', status: 'in_progress' },
    { content: '改 timeout', status: 'pending' },
  ]),
  emptyContent: Object.freeze([{ content: '', status: 'pending' }]),
  extendedKeys: Object.freeze([{ content: '任务', status: 'pending', id: 7 }]),
})

export function validateTodoList(todos, { allowParallelInProgress }) {
  for (const item of todos) {
    if (typeof item.content !== 'string' || item.content.trim().length === 0) {
      return { ok: false, error: 'Error: invalid todo: `content` must be a non-empty string' }
    }
    const extraKeys = Object.keys(item).filter(key => key !== 'content' && key !== 'status')
    if (extraKeys.length > 0) {
      return { ok: false, error: `Error: invalid todo: unexpected key \`${extraKeys[0]}\`` }
    }
  }
  const seen = new Set()
  for (const item of todos) {
    if (seen.has(item.content)) {
      return { ok: false, error: `Error: invalid todos: duplicate content "${item.content}"` }
    }
    seen.add(item.content)
  }
  const inProgress = todos.filter(item => item.status === 'in_progress').length
  if (!allowParallelInProgress && inProgress > 1) {
    return { ok: false, error: `Error: invalid todos: at most one task may be in_progress (got ${String(inProgress)})` }
  }
  return { ok: true, error: null }
}

export function buildTodoStackModel(input = {}) {
  const preset = input.preset ?? 'validSingle'
  const todos = TODO_PRESETS[preset]
  if (todos === undefined) throw new RangeError('未知预设：' + String(preset))
  const allowParallelInProgress = input.allowParallelInProgress !== false
  const fault = resolveFault(input.fault)

  const verdict = validateTodoList(todos, { allowParallelInProgress })
  const counts = {
    pending: todos.filter(item => item.status === 'pending').length,
    inProgress: todos.filter(item => item.status === 'in_progress').length,
    completed: todos.filter(item => item.status === 'completed').length,
  }
  // 教学故障：in_progress 计数被多报一次——三类计数之和不再等于条目总数。
  if (fault === 'bump-counts' && verdict.ok) counts.inProgress += 1

  return {
    mode: 'todo',
    input: { preset, allowParallelInProgress, fault },
    todos: verdict.ok ? todos : [],
    verdict,
    counts,
    appendedEvent: verdict.ok ? 'todo/write（完整快照）' : null,
    observations: {
      itemCount: todos.length,
      wholesaleReplacement: true,
      singleOwnerOnly: true,
      strictBlocked: !verdict.ok && verdict.error.includes('at most one task'),
    },
    canProve: Object.freeze([
      '每次调用替换整表：没有增量增删接口。',
      '空 content、重复 content、扩展键都在入口显式拒绝。',
      'strict 部署下多个 in_progress 报 at most one task (got n)。',
      '日志不变式不跟随部署开关：收紧策略后旧日志仍可重放。',
    ]),
    cannotProve: Object.freeze([
      '真实 UI 计划条渲染细节。',
      'turn/start 清除 standing plan 的投影时序。',
      '真实 agent 会话归属校验。',
    ]),
  }
}

/* ---------- Panel B：plan/mode ---------- */

export const PLAN_ACTIONS = Object.freeze(['/plan', '/plan off', 'exit_plan_mode approve', 'exit_plan_mode dismiss'])
export const PLAN_RESULTS = Object.freeze(['committed', 'queued', 'cancelled', 'noop'])

export function buildPlanModeModel(input = {}) {
  const loggedActive = input.loggedActive === true
  const agentBusy = input.agentBusy === true
  const action = PLAN_ACTIONS.find(item => item === input.action) ?? '/plan'
  const fault = resolveFault(input.fault)

  let result
  let nextLogged = loggedActive
  let pendingSelection = null

  if (action === '/plan') {
    if (!loggedActive) {
      if (agentBusy) {
        result = 'queued'
        pendingSelection = true
      } else {
        result = 'committed'
        nextLogged = true
      }
    } else {
      result = 'noop'
    }
  } else if (action === '/plan off') {
    if (loggedActive) {
      if (agentBusy) {
        result = 'queued'
        pendingSelection = false
      } else {
        result = 'committed'
        nextLogged = false
      }
    } else {
      result = 'noop'
    }
  } else if (action === 'exit_plan_mode approve') {
    if (!loggedActive) {
      result = 'noop'
    } else if (agentBusy) {
      result = 'queued'
      pendingSelection = false
    } else {
      result = 'committed'
      nextLogged = false
    }
  } else {
    // dismiss：用户关闭审阅想直接说话——报告给模型但不改变计划态。
    result = loggedActive ? 'noop' : 'noop'
  }

  /*
   * 教学故障：agent 忙时本应挂起 queued，这里伪成立即 committed——
   * 「闲即提交、忙即排队」的互斥被打破，IDLE_COMMITS_BUSY_QUEUES 抓住它。
   */
  if (fault === 'fake-commit' && result === 'queued') {
    result = 'committed'
    pendingSelection = null
    nextLogged = action === '/plan'
  }

  return {
    mode: 'plan',
    input: { loggedActive, agentBusy, action, fault },
    result,
    loggedAfter: nextLogged,
    pendingAfter: pendingSelection,
    observations: {
      idleCommitsImmediately: !agentBusy && result === 'committed',
      pendingCarried: pendingSelection !== null,
      dismissLeavesPlanMode: action === 'exit_plan_mode dismiss',
    },
    canProve: Object.freeze([
      'idle 时立即 commit；running 时挂起 pending 到下一个 pre-step。',
      'logged 与 pending 是两个格子：get() 返回 { active, pending? }。',
      'exit_plan_mode 只在 active 时接受；dismiss 让模型留在计划态等消息。',
      'noop 表示请求的动作与当前状态一致，不追加任何事件。',
    ]),
    cannotProve: Object.freeze([
      '真实 pre-step 监听器的挂起时序。',
      'user/message 通知的具体文案。',
      '部署方 section 文本的注入位置。',
    ]),
  }
}

/* ---------- Panel C：goal 生命周期 ---------- */

export const GOAL_PHASES = Object.freeze(['none', 'active', 'paused', 'blocked', 'completed', 'cleared'])
export const GOAL_VERBS = Object.freeze(['create', 'edit', 'pause', 'resume', 'complete', 'block', 'clear', 'disarm'])

/** 迁移表：`当前阶段 × 动词` → 新阶段或 null（非法）。 */
const GOAL_TRANSITIONS = Object.freeze({
  'none/create': 'active',
  'active/edit': 'active',
  'active/pause': 'paused',
  'active/block': 'blocked',
  'active/complete': 'completed',
  'active/clear': 'cleared',
  'active/disarm': 'active',
  'paused/resume': 'active',
  'paused/edit': 'paused',
  'paused/clear': 'cleared',
  'paused/disarm': 'paused',
  'blocked/resume': 'active',
  'blocked/clear': 'cleared',
  'blocked/disarm': 'blocked',
  'completed/clear': 'cleared',
  'completed/disarm': 'completed',
  'cleared/create': 'active',
})

export function buildGoalModel(input = {}) {
  const phase = GOAL_PHASES.find(item => item === input.phase) ?? 'none'
  const verb = GOAL_VERBS.find(item => item === input.verb) ?? 'create'
  const roundsCapReached = input.roundsCapReached === true
  const fault = resolveFault(input.fault)

  const key = `${phase}/${verb}`
  const nextPhase = GOAL_TRANSITIONS[key] ?? null
  if (nextPhase === null) {
    return {
      mode: 'goal',
      input: { phase, verb, roundsCapReached },
      illegal: true,
      detail: `illegal transition: ${key}`,
      observations: { revisionBumped: false, armed: false, illegal: true },
      canProve: Object.freeze([]),
      cannotProve: Object.freeze([]),
    }
  }

  // resume 在轮次上限打满时被拒（即使目标是可恢复相位）。
  if (verb === 'resume' && roundsCapReached) {
    return {
      mode: 'goal',
      input: { phase, verb, roundsCapReached },
      illegal: true,
      detail: 'round cap reached——resume 被拒，需要提高 defaultMaxGoalRounds',
      observations: { revisionBumped: false, armed: false, illegal: true },
      canProve: Object.freeze([]),
      cannotProve: Object.freeze([]),
    }
  }

  const disarmVerbs = ['pause', 'block', 'clear']
  let armed = verb === 'disarm' || verb === 'resume' ? verb !== 'disarm' : !disarmVerbs.includes(verb)
  const bumped = !(verb === 'disarm')

  /*
   * 教学故障：pause/block/clear 本应撤权，这里伪造成仍持权——
   * ARMING_MATCHES_VERB 抓住它。disarm/resume 的 armed 语义不同，不在此列。
   */
  if (fault === 'fake-rearm' && !armed && verb !== 'disarm') armed = true

  return {
    mode: 'goal',
    input: { phase, verb, roundsCapReached, fault },
    illegal: false,
    from: phase,
    to: nextPhase,
    armed,
    revisionBefore: phase === 'none' && verb === 'create' ? 0 : 3,
    revisionAfter: phase === 'none' && verb === 'create' ? 1 : 4,
    appendedEvent: verb === 'disarm' ? null : 'goal/change（完整快照）',
    observations: {
      revisionBumped: bumped,
      armed,
      activationNotPersisted: verb === 'disarm',
      illegal: false,
    },
    canProve: Object.freeze([
      '迁移表封闭：不在表内的组合显式报 illegal transition。',
      'revision 单调递增；CAS 栅栏拒绝过期引用。',
      'pause/block/clear 都撤权；disarm 只撤进程本地激活权、不写版本。',
      'resume 接受停止态或被撤权的活跃目标，但轮次上限打满时被拒。',
    ]),
    cannotProve: Object.freeze([
      '真实轮次驱动器的准入时序。',
      'blocker code 的全部策略词表。',
      '跨会话目标共享——设计上就是单会话的。',
    ]),
  }
}

export function evaluatePlanStackOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  if (model.mode === 'todo') {
    const rebuilt = buildTodoStackModel(model.input)
    add('TODO_DETERMINISTIC', '同一输入重建同一份校验结论',
      rebuilt.verdict.ok === model.verdict.ok && rebuilt.verdict.error === model.verdict.error,
      '两次一致', rebuilt.verdict.error === model.verdict.error ? '一致' : '不一致')

    if (!model.verdict.ok) {
      add('ERROR_VERBATIM', '拒绝文案与上游逐字一致',
        typeof model.verdict.error === 'string' && model.verdict.error.startsWith('Error:'),
        'Error: 开头', model.verdict.error)
    } else {
      const sum = model.counts.pending + model.counts.inProgress + model.counts.completed
      add('COUNTS_MATCH_ITEMS', '三类计数之和等于条目总数',
        sum === model.todos.length, String(model.todos.length), String(sum))
      add('WHOLESALE_SNAPSHOT', '写入的是整表快照而非增量',
        Array.isArray(model.todos), '完整数组', Array.isArray(model.todos) ? '完整数组' : '缺失')
    }
    return { pass: checks.every(check => check.pass), checks }
  }

  if (model.mode === 'plan') {
    const rebuilt = buildPlanModeModel(model.input)
    add('PLAN_DETERMINISTIC', '同一输入重建同一迁移',
      rebuilt.result === model.result && rebuilt.loggedAfter === model.loggedAfter,
      '两次一致', rebuilt.result === model.result ? '一致' : '不一致')

    add('RESULT_IN_CLOSED_UNION', '结果落在四词封闭集合内',
      PLAN_RESULTS.includes(model.result),
      PLAN_RESULTS.join('/'), model.result)

    const idleCommit = !model.input.agentBusy && model.result === 'committed'
    const busyQueued = model.input.agentBusy && model.result === 'queued'
    add('IDLE_COMMITS_BUSY_QUEUES', '闲即提交、忙即排队，二者互斥',
      idleCommit !== busyQueued || model.result === 'noop',
      '恰好一种', idleCommit ? 'idle 提交' : busyQueued ? 'busy 排队' : 'noop')
    return { pass: checks.every(check => check.pass), checks }
  }

  const rebuilt = buildGoalModel(model.input)
  add('GOAL_DETERMINISTIC', '同一输入重建同一迁移',
    JSON.stringify(rebuilt.observations) === JSON.stringify(model.observations),
    '两次一致', JSON.stringify(rebuilt.observations) === JSON.stringify(model.observations) ? '一致' : '不一致')

  if (model.illegal) {
    add('ILLEGAL_REJECTED', '非法组合被显式拒绝而不是静默跳过',
      model.detail.length > 0, '有原因说明', model.detail)
    return { pass: checks.every(check => check.pass), checks }
  }

  add('REVISION_MONOTONIC', '版本号只增不减',
    model.revisionAfter > model.revisionBefore,
    `${String(model.revisionBefore)} → 更大`, `${String(model.revisionBefore)} → ${String(model.revisionAfter)}`)

  const disarmingVerbs = ['pause', 'block', 'clear']
  const expectArmed = !disarmingVerbs.includes(model.input.verb)
  add('ARMING_MATCHES_VERB', '撤权动词后必须失活，其余保持或获得激活',
    model.armed === expectArmed || model.input.verb === 'resume',
    expectArmed ? 'armed' : 'disarmed', model.armed ? 'armed' : 'disarmed')

  return { pass: checks.every(check => check.pass), checks }
}
