/**
 * 定时提醒（dsh-schedule）的纯教学模型：持久状态只有会话事件日志里的
 * schedule/change 流，fold 逐条重放推出活动提醒。
 * 规则钉在上游 packages/schedule/schedule/src/domain.ts（aa6c361a）：
 * - SCHEDULE_CHANGE_VERSION = 1，操作只有 create | delete | dispatch
 * - MIN_EVERY_INTERVAL_SECONDS = 300：固定频率的硬下限
 * - 一次性（after/at）dispatch 后除名；every 的 dispatch 必须带 acceptedAt，
 *   只认「锚点对齐的最新一拍」（latest-only），错过队列不逐拍重放
 * - fork 按 seedLength 切日志：子会话不继承父会话的活动提醒，id 空间也是子会话本地的
 * 教学时钟固定在 2026-08-26T00:00:00Z：确定性优先，不读真实墙钟。
 */

export const SCHEDULE_SCENARIOS = Object.freeze([
  { id: 'one-shot', label: '一次性提醒：到点触发后除名' },
  { id: 'catch-up', label: '固定频率：睡过几拍只补最新一拍' },
  { id: 'fork', label: 'fork 边界：子会话不继承提醒' },
])

/** 教学时钟起点（epoch ms）：所有 T0+秒数 都相对它。 */
export const TEACHING_CLOCK_MS = Date.parse('2026-08-26T00:00:00.000Z')

/** 上游 domain.ts 的 MIN_EVERY_INTERVAL_SECONDS：固定频率提醒的创建下限。 */
export const MIN_EVERY_INTERVAL_SECONDS = 300

const CLOCK_CAP_SECONDS = 2400
const EVERY_CAP_SECONDS = 900

function clampInt(value, lo, hi, fallback) {
  const parsed = Number.isInteger(value) ? value : Number.parseInt(String(value), 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(hi, Math.max(lo, parsed))
}

/** 把相对秒数格式化成 T0+Ns 教学记号；真实 ISO 只在边界卡里出现。 */
function tick(seconds) {
  return `T0+${String(seconds)}s`
}

/**
 * 教学版 fold：与 domain.ts foldScheduleEvents 同一套迁移，日志在 fork 帧处
 * 切换所有权（等价于上游按 seedLength 只重放后缀）。
 * @param {Array<{change?: {op: string, id?: string, record?: {id: string, kind: string, everySeconds?: number, dueSec?: number}, acceptedSec?: number}}>} frames
 * @returns {{ active: Map<string, {id: string, kind: string, dueSec: number, everySeconds?: number}>, inheritedCount: number }}
 */
export function foldFrames(frames) {
  const active = new Map()
  for (const frame of frames) {
    const change = frame?.change
    if (change === undefined) continue
    if (change.op === 'fork') {
      active.clear()
      continue
    }
    if (change.op === 'create') {
      active.set(change.record.id, { ...change.record })
      continue
    }
    if (change.op === 'dispatch') {
      const record = active.get(change.id)
      if (record === undefined) continue
      if (record.kind === 'every') {
        record.dueSec = change.nextSec
      } else {
        active.delete(change.id)
      }
    }
  }
  return { active, inheritedCount: 0 }
}

/**
 * @param {{ scenario?: string, clockSeconds?: number, everySeconds?: number }} input
 */
export function buildScheduleModel(input = {}) {
  const scenario = SCHEDULE_SCENARIOS.some(item => item.id === input.scenario) ? input.scenario : 'catch-up'
  const clock = clampInt(input.clockSeconds, 0, CLOCK_CAP_SECONDS, 900)
  const every = clampInt(input.everySeconds, MIN_EVERY_INTERVAL_SECONDS, EVERY_CAP_SECONDS, MIN_EVERY_INTERVAL_SECONDS)

  const frames = []
  const push = (kind, label, detail, change, ruler) => {
    frames.push({ tick: frames.length, kind, label, detail, change, ...(ruler === undefined ? {} : { ruler }) })
  }
  const createFrame = (id, record, label, detail) =>
    push('create', label, detail, { op: 'create', record: { id, kind: record.kind, dueSec: record.dueSec, ...(record.everySeconds === undefined ? {} : { everySeconds: record.everySeconds }) } })

  if (scenario === 'one-shot') {
    createFrame('schedule-1', { kind: 'after', dueSec: 600 }, '创建 schedule-1（一次性 · 600 秒后）',
      'after 形态按创建时刻加延迟算出 scheduledAt，必须严格在未来；持久保存只有这一条事件。')
    if (clock >= 600) {
      push('dispatch', `触发 schedule-1（醒来于 ${tick(clock)}）`,
        '一次性提醒 dispatch 后立即除名：活动集合回到空，这就是「触发过」在日志里的唯一形态。',
        { op: 'dispatch', id: 'schedule-1', acceptedSec: clock })
    }
  }

  if (scenario === 'catch-up') {
    createFrame('schedule-1', { kind: 'every', dueSec: every, everySeconds: every }, `创建 schedule-1（固定频率 · 每 ${String(every)} 秒）`,
      `scheduledAt 是创建时刻加一个间隔（${tick(every)}），这个锚点对齐决定之后每一拍的落点；间隔下限 ${String(MIN_EVERY_INTERVAL_SECONDS)} 秒。`)
    if (clock >= every) {
      const steps = Math.floor((clock - every) / every)
      const occurrence = every + steps * every
      const next = occurrence + every
      push('dispatch', `醒来于 ${tick(clock)}，只补 ${tick(occurrence)} 这一拍`,
        `睡过 ${String(steps)} 拍也不逐拍重放：dispatch 带 acceptedAt，锚点对齐算出最新应答拍，错过队列直接跳过。`,
        { op: 'dispatch', id: 'schedule-1', acceptedSec: clock, nextSec: next },
        { anchorSec: every, acceptedSec: clock, occurrenceSec: occurrence, nextSec: next, missed: steps })
    }
  }

  if (scenario === 'fork') {
    createFrame('schedule-1', { kind: 'after', dueSec: 300 }, '父会话创建 schedule-1（一次性 · 300 秒后）',
      '父会话日志里的普通 create 事件。')
    createFrame('schedule-2', { kind: 'every', dueSec: 600, everySeconds: 600 }, '父会话创建 schedule-2（固定频率 · 每 600 秒）',
      '到此为止父会话有两条活动提醒。')
    push('fork', 'fork：子会话从 seedLength=2 起步',
      '子会话只重放自己拥有的后缀：两条活动提醒全部留在父会话，id 计数也从零开始。',
      { op: 'fork' })
    createFrame('schedule-1', { kind: 'after', dueSec: 120 }, '子会话创建 schedule-1（一次性 · 120 秒后）',
      'id 又叫 schedule-1——它和父会话那条互不相干：fold 只看自己拥有的日志段，id 空间是会话本地的。')
    if (clock >= 120) {
      push('dispatch', `子会话触发 schedule-1（醒来于 ${tick(clock)}）`,
        '触发、除名都发生在子会话段内；父会话的两条提醒不受任何影响。',
        { op: 'dispatch', id: 'schedule-1', acceptedSec: clock })
    }
  }

  const forkIndex = frames.findIndex(frame => frame.change?.op === 'fork')
  const parentFold = forkIndex === -1 ? null : foldFrames(frames.slice(0, forkIndex))
  const childFold = forkIndex === -1 ? null : foldFrames(frames.slice(forkIndex))
  // fork 场景没有「整份日志的最终 fold」：父子各自拥有自己的段，
  // activeCount 汇报父段（两条提醒不受子会话影响），子段单独给出。
  const finalFold = forkIndex === -1 ? foldFrames(frames) : parentFold
  const dispatchFrames = frames.filter(frame => frame.kind === 'dispatch')
  const catchupFrame = frames.find(frame => frame.ruler !== undefined)
  const afterForkFold = forkIndex === -1 ? undefined : foldFrames(frames.slice(0, forkIndex + 1))

  return {
    input: { scenario, clockSeconds: clock, everySeconds: every },
    frames,
    observations: {
      activeCount: finalFold.active.size,
      childActiveCount: childFold === null ? null : childFold.active.size,
      dispatchCount: dispatchFrames.length,
      fired: dispatchFrames.map(frame => frame.change.id),
      missedCount: catchupFrame?.ruler?.missed ?? null,
      nextSec: catchupFrame?.ruler?.nextSec ?? null,
      inheritedCount: afterForkFold === undefined ? null : afterForkFold.active.size,
    },
    canProve: [
      '持久状态只有 schedule/change 事件流：create/delete/dispatch 三种操作逐条重放推出活动提醒，重启即重放。',
      '固定频率错过不补发：dispatch 带 acceptedAt，只认锚点对齐的最新一拍，并把下一拍写回记录。',
      '一次性提醒 dispatch 后即除名；固定频率下限 300 秒（MIN_EVERY_INTERVAL_SECONDS）在创建时强制。',
      'fork 按 seedLength 切日志：子会话不继承任何活动提醒，id 空间也是会话本地的。',
    ],
    cannotProve: [
      '不启动真实定时器，也不读真实墙钟：教学时钟固定在 2026-08-26T00:00Z，一切时序都是帧里的常量。',
      '空闲维护期认领、followup 入队、[SCHEDULE REMINDER] 注入防御框架是运行时路径，不在帧里。',
      'at 形态的本地日历与时区解析、delete 操作、跨重启的持久恢复未建模（见第 37 课正文）。',
      '真实的错过补偿策略需要运行证据才能下结论，本实验不提供。',
    ],
  }
}

/** 独立校验：不看渲染层，直接对帧里的变更重算硬规则。 */
export function evaluateScheduleOracle(model) {
  const checks = []
  const segments = [[]]
  for (const frame of model.frames) {
    if (frame.change?.op === 'fork') segments.push([])
    else segments[segments.length - 1].push(frame)
  }
  for (const [index, segment] of segments.entries()) {
    const creates = segment.filter(frame => frame.change?.op === 'create')
    const ids = creates.map(frame => frame.change.record.id)
    checks.push({
      id: `SCHEDULE_IDS_UNIQUE#${String(index)}`,
      pass: new Set(ids).size === ids.length,
      label: index === 0 ? '同一段日志内 id 不重复' : '子会话段内 id 不重复（与父段无关）',
    })
  }
  const everyCreates = model.frames
    .filter(frame => frame.change?.op === 'create' && frame.change.record.kind === 'every')
  checks.push({
    id: 'SCHEDULE_EVERY_FLOOR',
    pass: everyCreates.every(frame => frame.change.record.everySeconds >= MIN_EVERY_INTERVAL_SECONDS),
    label: `固定频率间隔不低于 ${String(MIN_EVERY_INTERVAL_SECONDS)} 秒`,
  })
  const active = new Map()
  let dispatchTargetsActive = true
  const oneShotDispatchCounts = new Map()
  for (const [index, segment] of segments.entries()) {
    if (index > 0) active.clear()
    for (const frame of segment) {
      const change = frame.change
      if (change === undefined) continue
      if (change.op === 'create') {
        active.set(change.record.id, { ...change.record })
        continue
      }
      if (change.op !== 'dispatch') continue
      const record = active.get(change.id)
      if (record === undefined) {
        dispatchTargetsActive = false
        continue
      }
      if (record.kind === 'every') {
        active.set(change.id, { ...record, dueSec: change.nextSec })
        continue
      }
      active.delete(change.id)
      const key = `${String(index)}/${change.id}`
      oneShotDispatchCounts.set(key, (oneShotDispatchCounts.get(key) ?? 0) + 1)
    }
  }
  checks.push({ id: 'SCHEDULE_DISPATCH_TARGETS_ACTIVE', pass: dispatchTargetsActive, label: 'dispatch 只指向当时活动的提醒' })
  checks.push({
    id: 'SCHEDULE_ONESHOT_REMOVES',
    pass: [...oneShotDispatchCounts.values()].every(count => count === 1),
    label: '一次性提醒至多触发一次（除名后不可再触发）',
  })
  const catchup = model.frames.find(frame => frame.ruler !== undefined)
  if (catchup !== undefined) {
    const ruler = catchup.ruler
    const interval = model.input.everySeconds
    const aligned = ruler.anchorSec + Math.floor((ruler.acceptedSec - ruler.anchorSec) / interval) * interval
    checks.push({
      id: 'SCHEDULE_CATCHUP_LATEST',
      pass: aligned === ruler.occurrenceSec && ruler.occurrenceSec <= ruler.acceptedSec
        && ruler.acceptedSec < ruler.occurrenceSec + interval,
      label: '补发的正是锚点对齐的最新一拍',
    })
  }
  const fork = model.frames.find(frame => frame.change?.op === 'fork')
  if (fork !== undefined) {
    const childFold = foldFrames(model.frames.slice(0, model.frames.indexOf(fork) + 1))
    checks.push({
      id: 'SCHEDULE_FORK_INHERITS_NOTHING',
      pass: childFold.active.size === 0,
      label: 'fork 时刻子会话的活动提醒为零',
    })
  }
  return { pass: checks.every(check => check.pass), checks }
}
