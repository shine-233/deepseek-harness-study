/**
 * Session 投影折叠的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/session/session-projection/src/index.ts：
 * 每个域注册一个 ProjectionDefinition（init + apply + 可选 wire.view），框架
 * 在每条已提交事件上驱动 apply。整值事件规则：状态携带事件必须携带完整变更后
 * 状态，不是增量。不关心某条事件的单元返回同一个引用（Object.is）→ 下游零开销。
 *
 * 本模型模拟四个投影单元（todos / planMode / goal / schedule）独立折叠同一条
 * 事件流。教学约定：事件是固定常量；没有真实持久化缓存或变更通知。
 */

export const PROJECTION_KEYS = Object.freeze(['todos', 'planMode', 'goal', 'schedule'])

/** 教学事件流：混合了四种投影各自关心的和不关心的事件。 */
export const SESSION_EVENTS = Object.freeze([
  Object.freeze({ seq: 1, kind: 'todo/write', payload: { todos: [{ content: '读配置', status: 'completed' }, { content: '改 timeout', status: 'in_progress' }] } }),
  Object.freeze({ seq: 2, kind: 'plan/mode', payload: { active: true } }),
  Object.freeze({ seq: 3, kind: 'assistant/chunk', payload: { text: '…' } }),
  Object.freeze({ seq: 4, kind: 'goal/change', payload: { phase: 'active', revision: 1, objective: '修复超时配置' } }),
  Object.freeze({ seq: 5, kind: 'tool/result', payload: { tool: 'read_file' } }),
  Object.freeze({ seq: 6, kind: 'todo/write', payload: { todos: [{ content: '读配置', status: 'completed' }, { content: '改 timeout', status: 'completed' }, { content: '跑测试', status: 'pending' }] } }),
  Object.freeze({ seq: 7, kind: 'plan/mode', payload: { active: false } }),
  Object.freeze({ seq: 8, kind: 'goal/change', payload: { phase: 'completed', revision: 2, objective: '修复超时配置' } }),
])

/**
 * 四个投影单元的纯 apply 函数。每个函数只处理自己关心的事件类型，
 * 其余返回原引用（Object.is 零开销规则）。
 */
function foldTodos(state, event) {
  if (event.kind !== 'todo/write') return state
  const todos = event.payload.todos.map(item => ({ ...item }))
  return {
    pending: todos.filter(t => t.status === 'pending').length,
    inProgress: todos.filter(t => t.status === 'in_progress').length,
    completed: todos.filter(t => t.status === 'completed').length,
    items: todos,
    _changed: true,
  }
}

function foldPlanMode(state, event) {
  if (event.kind !== 'plan/mode') return state
  return { active: event.payload.active, _changed: true }
}

function foldGoal(state, event) {
  if (event.kind !== 'goal/change') return state
  return {
    phase: event.payload.phase ?? state.phase,
    revision: event.payload.revision ?? state.revision,
    objective: event.payload.objective ?? state.objective,
    _changed: true,
  }
}

function foldSchedule(state, event) {
  // schedule/change 不在教学事件流里，但保留单元以演示「不关心的事件返回原引用」。
  if (event.kind !== 'schedule/change') return state
  return { ...state, _changed: true }
}

const FOLDERS = { todos: foldTodos, planMode: foldPlanMode, goal: foldGoal, schedule: foldSchedule }

const INITIAL_STATES = Object.freeze({
  todos: Object.freeze({ pending: 0, inProgress: 0, completed: 0, items: [], _changed: false }),
  planMode: Object.freeze({ active: false, _changed: false }),
  goal: Object.freeze({ phase: null, revision: 0, objective: null, _changed: false }),
  schedule: Object.freeze({ nextTarget: null, _changed: false }),
})

/** 折叠事件流前 upto 条，返回每个投影键的状态和每步变化标记。 */
export function projectSession(upto) {
  if (!Number.isInteger(upto)) throw new TypeError('upto 必须是整数')
  const max = SESSION_EVENTS.length
  if (upto < 0 || upto > max) throw new RangeError(`upto 必须落在 [0, ${String(max)}]`)

  const states = {}
  for (const key of PROJECTION_KEYS) {
    states[key] = { ...INITIAL_STATES[key] }
  }

  const trace = []
  for (const event of SESSION_EVENTS) {
    if (event.seq > upto) break
    const stepChanges = {}
    for (const key of PROJECTION_KEYS) {
      const before = states[key]
      const after = FOLDERS[key](before, event)
      const changed = after !== before
      states[key] = after
      stepChanges[key] = changed
    }
    trace.push({ seq: event.seq, kind: event.kind, changes: stepChanges })
  }

  return { upto, states, trace }
}

export function buildProjectionModel(input = {}) {
  const upto = input.upto ?? SESSION_EVENTS.length
  const projection = projectSession(upto)

  const summary = {}
  for (const key of PROJECTION_KEYS) {
    const state = projection.states[key]
    switch (key) {
      case 'todos':
        summary.todos = `${String(state.pending)} pending / ${String(state.inProgress)} in_progress / ${String(state.completed)} completed`
        break
      case 'planMode':
        summary.planMode = state.active ? '计划模式激活' : '计划模式关闭'
        break
      case 'goal':
        summary.goal = state.phase === null ? '无目标' : `${state.objective} (${state.phase} r${String(state.revision)})`
        break
      case 'schedule':
        summary.schedule = '无到期提醒'
        break
    }
  }

  return {
    mode: 'projection',
    input: { upto },
    events: SESSION_EVENTS,
    ...projection,
    summary,
    observations: {
      eventsProcessed: upto + 1,
      totalEvents: SESSION_EVENTS.length,
      changedKeysAtEnd: PROJECTION_KEYS.filter(key => projection.states[key]._changed),
    },
    canProve: Object.freeze([
      '四个投影单元独立折叠同一条事件流，互不干扰。',
      '不关心的事件返回同一个状态引用——下游零开销。',
      '每次 todo/write 替换整表：旧列表被完整丢弃。',
      '重放位置相同则投影结果完全一致（确定性）。',
    ]),
    cannotProve: Object.freeze([
      '真实持久化缓存的水位管理。',
      '真实变更通知的分发时序。',
      'fork 后 seedLength 裁剪的行为。',
    ]),
  }
}

export function evaluateProjectionOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildProjectionModel(model.input)
  add('PROJECTION_DETERMINISTIC', '同一重放位置得到同一组投影',
    JSON.stringify(rebuilt.states) === JSON.stringify(model.states),
    '两次一致', JSON.stringify(rebuilt.states) === JSON.stringify(model.states) ? '一致' : '不一致')

  const todoEvents = model.events.filter(e => e.seq <= model.input.upto && e.kind === 'todo/write')
  const lastTodo = todoEvents[todoEvents.length - 1]
  const todoState = model.states.todos
  const expectedCount = lastTodo ? lastTodo.payload.todos.length : 0
  add('TODO_WHOLESALE', 'todos 投影反映最后一次 todo/write 的完整快照',
    todoState.items.length === expectedCount,
    `${String(expectedCount)} 条`, `${String(todoState.items.length)} 条`)

  const planEvents = model.events.filter(e => e.seq <= model.input.upto && e.kind === 'plan/mode')
  const lastPlan = planEvents[planEvents.length - 1]
  add('PLAN_LAST_WRITE_WINS', 'plan/mode 投影反映最后一次写入',
    todoEvents.length === 0 || model.states.planMode.active === (lastPlan?.payload?.active ?? false),
    String(lastPlan?.payload?.active ?? false), String(model.states.planMode.active))

  const goalEvents = model.events.filter(e => e.seq <= model.input.upto && e.kind === 'goal/change')
  const lastGoal = goalEvents[goalEvents.length - 1]
  add('GOAL_REVISION_TRACKS', 'goal revision 反映最后一次 goal/change',
    model.states.goal.revision === (lastGoal?.payload?.revision ?? 0),
    String(lastGoal?.payload?.revision ?? 0), String(model.states.goal.revision))

  const unrelatedProcessed = model.trace.filter(step =>
    step.seq <= model.input.upto && ['assistant/chunk', 'tool/result'].includes(step.kind))
  const noSpuriousChanges = unrelatedProcessed.every(step =>
    !step.changes.todos && !step.changes.planMode && !step.changes.goal)
  add('UNRELATED_NO_OP', '无关事件不改变任何投影状态',
    noSpuriousChanges, '零副作用', noSpuriousChanges ? '零副作用' : '有副作用')

  return { pass: checks.every(check => check.pass), checks }
}
