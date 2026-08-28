/**
 * 会话检查点策略（session-checkpoint-policy）的纯教学模型：基于上游
 * packages/session/session-checkpoint-policy/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 三个语义持久化时刻：
 * - 模型请求：adapter 派发之前，把已记录的请求前缀落为 durable；
 *   检查点拒绝会阻止 adapter 派发。
 * - 顶层工具派发：工具主体执行之前，把已记录的调用落为 durable。
 * - 下一个请求边界：把已完成的 agent 步骤结算为 durable。
 *
 * 教学模型不写真实存储：崩溃位置是一个旋钮，恢复视图由纯函数推演。
 */

export const CKPT_LANES = Object.freeze(['Turn 时间线', '检查点策略', '持久层'])

export const CKPT_POINTS = Object.freeze([
  Object.freeze({ id: 'model-request', label: '模型请求前' }),
  Object.freeze({ id: 'tool-dispatch', label: '顶层工具派发前' }),
  Object.freeze({ id: 'step-boundary', label: '下一请求边界（步骤完成）' }),
])

/** 教学故障注入：夸大崩溃后可恢复的范围。none 是唯一默认。 */
export const CKPT_FAULT_TYPES = Object.freeze(['none', 'overclaim-recovery'])

function resolveFault(fault) {
  const type = fault ?? 'none'
  if (!CKPT_FAULT_TYPES.includes(type)) {
    throw new RangeError('未知故障类型：' + String(type))
  }
  return type
}

function resolveInput(input = {}) {
  if (typeof input.crashAt !== 'number' || !Number.isInteger(input.crashAt) || input.crashAt < 0 || input.crashAt > 6) {
    throw new RangeError('crashAt 必须是 0..6 的整数')
  }
  if (input.checkpointsEnabled !== undefined && typeof input.checkpointsEnabled !== 'boolean') {
    throw new TypeError('checkpointsEnabled 必须是布尔值')
  }
  return {
    checkpointsEnabled: input.checkpointsEnabled !== false,
    crashAt: input.crashAt ?? 3,
  }
}

/**
 * 推演一次带检查点的 Turn，以及崩溃后能恢复什么。
 */
export function buildCheckpointModel(input = {}) {
  const resolved = resolveInput(input)
  const enabled = resolved.checkpointsEnabled

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: CKPT_LANES[laneIdx], phase, detail, ...extra })
  }

  // 六拍时间线：请求1 → 工具 → （边界）→ 请求2 → 回答。
  const beats = [
    { at: 1, laneIdx: 2, phase: 'request-issued', detail: '第 1 次模型请求发出。' },
    { at: 2, laneIdx: 2, phase: 'tool-dispatched', detail: '顶层工具开始执行。' },
    { at: 4, laneIdx: 2, phase: 'request-2', detail: '第 2 次模型请求发出。' },
    { at: 5, laneIdx: 2, phase: 'answer', detail: '最终回答产生。' },
    { at: 6, laneIdx: 2, phase: 'turn-end', detail: 'Turn 结束。' },
  ]
  const checkpoints = [
    { at: 1, point: 'model-request', detail: '检查点：请求前缀已 durable——崩溃也能原样重放这次请求。' },
    { at: 2, point: 'tool-dispatch', detail: '检查点：已记录的调用 durable——工具主体执行前留痕。' },
    { at: 4, point: 'step-boundary', detail: '检查点：完成的步骤在下一个请求边界结算 durable。' },
  ]

  // 每一拍的顺序：先落本拍的检查点（检查点先于动作），再判断崩溃，最后执行动作。
  let checkpointIndex = 0
  let lastDurableTick = 0
  if (resolved.crashAt === 0) {
    push(2, 'crash', '进程在第一个语义时刻之前就崩溃了：什么都没来得及持久化。', {})
    return {
      input: { ...resolved },
      lanes: CKPT_LANES,
      steps,
      observations: {
        checkpointsEnabled: enabled,
        crashAt: resolved.crashAt,
        lastDurableTick: 0,
        recoverableCount: 0,
        replayableFromLog: false,
        forkShape: '崩溃太早：尚无可恢复内容',
      },
      canProve: ['崩溃发生在任何检查点之前：没有可重放的内容。'],
      cannotProve: [
        '不能证明真实存储层的写入延迟或 fsync 语义。',
        '不能证明真实检查点拒绝的错误码表。',
        '不能证明真实重放与续跑的策略差异。',
        '不能用本页替代 session-persistence 的物理实现。',
      ],
    }
  }
  for (let tick = 1; tick <= 6; tick += 1) {
    while (checkpointIndex < checkpoints.length && checkpoints[checkpointIndex].at === tick) {
      const cp = checkpoints[checkpointIndex]
      if (enabled) {
        push(1, 'checkpoint', cp.detail + '（' + CKPT_POINTS.find(p => p.id === cp.point).label + '）',
          { point: cp.point, durableFrom: tick })
        lastDurableTick = tick
      }
      checkpointIndex += 1
    }
    if (resolved.crashAt === tick) {
      push(2, 'crash', '进程在这里崩溃。', {})
      break
    }
    const beat = beats.find(b => b.at === tick)
    if (beat) push(beat.laneIdx, beat.phase, beat.detail)
  }

  const recoverableBeats = beats.filter(b => b.at <= lastDurableTick)

  const model = {
    input: { ...resolved },
    lanes: CKPT_LANES,
    steps,
    observations: {
      checkpointsEnabled: enabled,
      crashAt: resolved.crashAt,
      lastDurableTick,
      recoverableCount: recoverableBeats.length,
      replayableFromLog: lastDurableTick >= 1,
      forkShape: !enabled ? '无检查点：崩溃即从零开始'
        : lastDurableTick === 0 ? '崩溃太早：尚无可恢复内容'
        : '可恢复到第 ' + String(lastDurableTick) + ' 拍之后',
    },
    canProve: [
      '三个检查点分别钉住请求前缀、已记录的工具调用和已完成步骤。',
      '检查点拒绝会阻止 adapter 派发——不会出现没落盘就发出的请求。',
      '崩溃后能恢复的恰是最后一个已通过检查点之前的全部内容。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实存储层的写入延迟或 fsync 语义。',
      '不能证明真实检查点拒绝的错误码表。',
      '不能证明真实重放与续跑的策略差异。',
      '不能用本页替代 session-persistence 的物理实现。',
    ],
  }
  /*
   * 教学故障：把可恢复范围夸大到 durable 界之外——「能恢复的恰是最后一个
   * 已通过检查点之前的全部内容」被违反。CK_RECOVERY_HONEST 抓住它。
   * 最后 durable 拍为 0 时无可夸大，注入不生效。
   */
  if (resolveFault(input.fault) === 'overclaim-recovery' && model.observations.lastDurableTick > 0) {
    model.observations.recoverableCount = lastDurableTick + 2
    model.observations.forkShape = '【教学故障】声称可恢复到第 '
      + String(lastDurableTick + 2) + ' 拍之后——超出了 durable 边界'
  }
  return model
}

/** 独立校验。 */
export function evaluateCheckpointOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildCheckpointModel(model.input)
  add('CK_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const crashStep = model.steps.find(s => s.phase === 'crash')
  const postCrash = crashStep ? model.steps.filter(s => s.index > crashStep.index).length : 0
  add('CK_CRASH_STOPS_TIMELINE', '崩溃之后的拍子不再发生',
    postCrash === 0,
    '崩溃后 0 步', String(postCrash) + ' 步')

  // 检查点先于同拍动作：已到达的语义时刻各落一个检查点（启用时）。
  const expectedCps = model.input.checkpointsEnabled
    ? [1, 2, 4].filter(t => t <= model.input.crashAt).length
    : 0
  const cps = model.steps.filter(s => s.phase === 'checkpoint').length
  add('CK_MOMENTS_REACHED', '已到达的语义时刻各有且仅有一个检查点',
    cps === expectedCps,
    String(expectedCps) + ' 个',
    String(cps) + ' 个')

  add('CK_RECOVERY_HONEST', '可恢复数量与最后 durable 拍一致',
    o.recoverableCount <= o.lastDurableTick,
    '≤ 第 ' + String(o.lastDurableTick) + ' 拍',
    String(o.recoverableCount) + ' 拍')

  return { pass: checks.every(c => c.pass), checks }
}
