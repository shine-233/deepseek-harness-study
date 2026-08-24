/**
 * 消息反馈（message-feedback）的纯教学模型：基于上游
 * packages/feedback/message-feedback/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 核心规则：
 * - 反馈绑定到「已定稿」的 assistant message（按消息 id），持久存储在 KV 表里。
 * - 生命周期绑定：只对定稿消息开放；重复反馈更新同一条记录而非追加。
 *
 * 教学模型不碰真实 KV 存储。
 */

export const FB_LANES = Object.freeze(['用户', 'feedback 缝', 'KV 存储'])

function resolveInput(input = {}) {
  if (input.action !== undefined && !['rate-up', 'rate-down', 'clear'].includes(input.action)) {
    throw new RangeError('未知动作：' + String(input.action))
  }
  if (input.finalized !== undefined && typeof input.finalized !== 'boolean') throw new TypeError('finalized 必须是布尔值')
  return {
    action: input.action ?? 'rate-up',
    finalized: input.finalized !== false,
  }
}

/** 推演一次反馈操作。 */
export function buildFeedbackModel(input = {}) {
  const resolved = resolveInput(input)
  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: FB_LANES[laneIdx], phase, detail, ...extra })
  }

  if (!resolved.finalized) {
    push(0, 'too-early', '消息尚未定稿：反馈通道不开放。')
    push(1, 'rejected', '生命周期绑定意味着只能评价「完成」的消息，不能评价流式中的半截回答。')
  } else {
    push(0, 'act', '用户对定稿消息执行 ' + resolved.action + '。')
    push(1, 'upsert', resolved.action === 'clear'
      ? '清除该消息的反馈记录。'
      : '按消息 id upsert：重复反馈更新同一条记录而不是追加一行。')
    push(2, 'persisted', '记录进入 KV 表，随会话持久化——重放后反馈仍在。')
  }

  const recorded = resolved.finalized && resolved.action !== 'clear'
  return {
    input: { ...resolved },
    lanes: FB_LANES,
    steps,
    observations: {
      recorded,
      forkShape: !resolved.finalized ? '未定稿不可评' : resolved.action === 'clear' ? '已清除' : '已记录',
    },
    canProve: [
      '反馈按消息 id upsert：重复操作是更新不是追加。',
      '只有定稿消息可以接收反馈。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 KvTable 的存储引擎或迁移行为。',
      '不能证明真实反馈如何参与遥测聚合。',
      '不能证明 Typert 远程服务的调用细节。',
      '不能用本页回答「反馈数据去了哪里」。',
    ],
  }
}

/** 独立校验。 */
export function evaluateFeedbackOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildFeedbackModel(model.input)
  add('FB_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const expectRecorded = model.input.finalized && model.input.action !== 'clear'
  add('FB_LIFECYCLE_BOUND', '只有定稿消息产生记录',
    o.recorded === expectRecorded,
    expectRecorded ? '有记录' : '无记录',
    o.recorded ? '有记录' : '无记录')

  return { pass: checks.every(c => c.pass), checks }
}
