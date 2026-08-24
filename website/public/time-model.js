/**
 * 时间上下文（time-context）的纯教学模型：基于上游
 * packages/context/time-context/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 核心规则：
 * - 选择性加入（opt-in）：符合条件的步骤才把时间读数追加进请求历史。
 * - 读数带来源归因：是哪只钟、什么时区、何时读取——模型可以核对而非盲信。
 * - 读数作为 durable 的用户消息进入历史：重放时原样回来。
 *
 * 教学模型不读真实时钟：「偏移分钟数」与「时区」是输入旋钮。
 */

export const TIME_LANES = Object.freeze(['Agent', 'time-context', '请求历史'])

export const TIME_ZONES = Object.freeze(['Asia/Shanghai', 'UTC', 'America/New_York'])

function resolveInput(input = {}) {
  if (input.optIn !== undefined && typeof input.optIn !== 'boolean') throw new TypeError('optIn 必须是布尔值')
  if (input.timezone !== undefined && !TIME_ZONES.includes(input.timezone)) {
    throw new RangeError('未知时区：' + String(input.timezone))
  }
  const clockDriftMinutes = input.clockDriftMinutes ?? 0
  if (typeof clockDriftMinutes !== 'number' || !Number.isInteger(clockDriftMinutes)
    || clockDriftMinutes < -720 || clockDriftMinutes > 720) {
    throw new RangeError('clockDriftMinutes 必须是 -720..720 的整数')
  }
  return {
    optIn: input.optIn !== false,
    timezone: input.timezone ?? 'UTC',
    clockDriftMinutes,
    turns: input.turns === 2 ? 2 : 1,
  }
}

/** 确定性的「钟面读数」：由输入派生，保证可重放。 */
function clockReading(turn, timezone, drift) {
  const baseHour = (9 + turn * 2 + Math.floor(drift / 60) + 24) % 24
  const minute = ((turn * 17 + drift) % 60 + 60) % 60
  const hh = String(baseHour).padStart(2, '0')
  const mm = String(minute).padStart(2, '0')
  return `${hh}:${mm} (${timezone})`
}

/**
 * 推演一或两轮对话里的时间上下文注入。
 */
export function buildTimeModel(input = {}) {
  const resolved = resolveInput(input)
  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: TIME_LANES[laneIdx], phase, detail, ...extra })
  }

  const readings = []
  for (let turn = 0; turn < resolved.turns; turn += 1) {
    push(0, 'pre-step', '第 ' + String(turn + 1) + ' 轮 pre-step 决策点。')
    if (!resolved.optIn) {
      push(1, 'skipped', '未选择加入：本轮不注入任何时间读数，历史保持原样。')
      continue
    }
    const reading = clockReading(turn, resolved.timezone, resolved.clockDriftMinutes)
    readings.push({ turn: turn + 1, reading })
    push(1, 'inject', '追加时间读数到请求历史：本地时间 ' + reading
      + '，来源标注为宿主时钟。', { turn: turn + 1 })
    if (resolved.clockDriftMinutes !== 0 && turn === 0) {
      push(1, 'drift-attributed', '时钟与标准源偏差 ' + String(resolved.clockDriftMinutes)
        + ' 分钟——读数自带来源归因，模型可以核对而不是盲信。',
        { turn: turn + 1 })
    }
    push(2, 'logged-durable', '读数作为 durable 用户消息入册：重放会话时它原样回来。',
      { turn: turn + 1 })
  }

  return {
    input: { ...resolved },
    lanes: TIME_LANES,
    steps,
    observations: {
      optIn: resolved.optIn,
      timezone: resolved.timezone,
      clockDriftMinutes: resolved.clockDriftMinutes,
      injectedCount: readings.length,
      readings,
      forkShape: !resolved.optIn ? '未加入：历史里没有时间'
        : resolved.turns === 2 ? '两轮注入：可对比时间流逝'
        : '单轮注入',
    },
    canProve: [
      '时间读数只在选择性加入后出现；未加入的轮次历史完全不变。',
      '每条读数都带来源与时区归因，可以被模型核对。',
      '读数以 durable 用户消息形式入册：重放时原样回来。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实系统时钟的准确度或 NTP 校时行为。',
      '不能证明真实 IANA 时区数据库的全部边界情况。',
      '不能证明真实浏览器端时钟来源的推导细节。',
      '不能用本页回答「模型对时间的理解是否正确」。',
    ],
  }
}

/** 独立校验。 */
export function evaluateTimeOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildTimeModel(model.input)
  add('TC_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const injects = model.steps.filter(s => s.phase === 'inject').length
  add('TC_OPT_IN_ONLY', '注入次数跟随选择加入开关与轮数',
    injects === (o.optIn ? o.readings.length : 0)
    && (o.optIn ? injects === model.input.turns : true),
    o.optIn ? String(model.input.turns) + ' 次注入' : '0 次注入',
    String(injects) + ' 次')

  const allAttributed = model.steps.filter(s => s.phase === 'inject')
    .every(s => s.detail.includes('来源标注'))
  add('TC_SOURCE_ATTRIBUTED', '每条读数都带来源与时区归因',
    !o.optIn || allAttributed,
    o.optIn ? '全部带归因' : '不适用',
    allAttributed ? '全部带归因' : '有缺失')

  const durableLogged = model.steps.some(s => s.phase === 'logged-durable') || !o.optIn
  add('TC_DURABLE_IN_HISTORY', '读数以 durable 形式进入历史',
    durableLogged,
    o.optIn ? '存在 durable 步骤' : '不适用',
    durableLogged ? '已入册' : '缺失')

  return { pass: checks.every(c => c.pass), checks }
}
