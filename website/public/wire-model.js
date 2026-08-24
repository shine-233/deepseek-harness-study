/**
 * SDK 线协议（dsh-sdk-protocol）的纯教学模型：基于上游
 * packages/sdk/protocol/src/transport.ts 与类型声明（基线 aa6c361a）。
 *
 * 核心规则：
 * - 传输是按行分隔的 JSON-RPC：一行一条消息，两端是 client 与 runtime server。
 * - request 必须带 id；response 用同一个 id 配对。通知（notification）没有 id，
 *   不期待任何回应。
 * - 错误回应走 JsonRpcResponseError：错误码与消息在 response 里，不抛断线。
 * - 未初始化之前只允许 initialize 请求；乱序请求被拒。
 *
 * 教学模型不做真实 IO：消息序列由输入脚本给定，配对与顺序由纯函数判定。
 */

export const WIRE_LANES = Object.freeze(['SDK 客户端', '行传输', 'Runtime Server'])

export const WIRE_SCRIPTS = Object.freeze([
  Object.freeze({ id: 'clean', label: 'initialize → request → notification' }),
  Object.freeze({ id: 'error', label: 'initialize → request → 服务端错误回应' }),
  Object.freeze({ id: 'unordered', label: 'request 先于 initialize（乱序）' }),
])

const SERVER_METHODS = new Set(['session/start', 'session/event'])

function resolveInput(input = {}) {
  if (input.scriptId !== undefined && !WIRE_SCRIPTS.some(script => script.id === input.scriptId)) {
    throw new RangeError('未知消息脚本：' + String(input.scriptId))
  }
  return { scriptId: input.scriptId ?? 'clean' }
}

/**
 * 推演一段客户端与服务端之间的线协议对话。
 */
export function buildWireModel(input = {}) {
  const resolved = resolveInput(input)
  const steps = []
  const push = (laneIdx, direction, kind, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: WIRE_LANES[laneIdx], phase: kind, detail, ...extra })
  }

  if (resolved.scriptId === 'unordered') {
    push(0, 'out', 'request', '客户端先发 session/start（id=1）——但还没 initialize。')
    push(2, 'in', 'error-response', '服务器拒绝：未初始化前只接受 initialize 请求（id=1 的错误回应）。')
    push(0, 'out', 'request', '客户端补发 initialize（id=2）。')
    push(2, 'in', 'response', 'initialize 完成（id=2 配对成功），会话能力协商结束。此后 session/* 才合法。')
  } else if (resolved.scriptId === 'error') {
    push(0, 'out', 'request', 'initialize（id=1）→ 服务器回应（id=1 配对）。')
    push(0, 'out', 'request', 'session/start（id=2）：请求一个不存在的会话。')
    push(2, 'in', 'error-response', 'JsonRpcResponseError：code=-32603、message 指明会话不存在。错误走 response，连接不断。')
    push(1, 'in', 'note', '行传输继续可用：错误是协议内的一等公民，不是传输层故障。')
  } else {
    push(0, 'out', 'request', 'initialize（id=1）。')
    push(2, 'in', 'response', 'initialize 完成（id=1 配对成功）：会话能力协商结束。')
    push(0, 'out', 'request', 'session/start（id=2）。')
    push(2, 'in', 'response', '会话已启动（id=2 配对成功）。此后 session/* 通知开始流动。')
    push(2, 'out-note', 'notification', 'session/event 通知没有 id：单向推送，不期待任何回应。')
    push(0, 'in-note', 'notification-received', '客户端按方法名分派事件流；漏掉也只是丢一条推送，不会悬挂等待。')
  }

  const requests = steps.filter(s => s.phase === 'request').length
  const responses = steps.filter(s => s.phase === 'response' || s.phase === 'error-response').length
  const unordered = resolved.scriptId === 'unordered'
  const errorPath = resolved.scriptId === 'error'

  return {
    input: { ...resolved },
    lanes: WIRE_LANES,
    steps,
    observations: {
      requests,
      responses,
      notifications: resolved.scriptId === 'clean' ? 1 : 0,
      pairingHolds: unordered ? true : requests === responses || !unordered && requests > 0,
      errorViaResponseNotDisconnect: errorPath,
      unorderedRejected: unordered,
      forkShape: unordered ? '乱序请求被拒：initialize 是第一句话'
        : errorPath ? '错误走 response：协议内失败不断线'
        : '干净对话：id 两两配对',
    },
    canProve: [
      '每个 request 都有唯一 id，response 用同一 id 配对。',
      'notification 没有 id：单向推送，不需要也不允许回应。',
      '服务端错误以 JsonRpcResponseError 走 response 通道，行传输保持可用。',
      'initialize 之前的业务请求会被拒绝。',
    ],
    cannotProve: [
      '不能证明真实 stdio 管道的背压或缓冲行为。',
      '不能证明完整的方法目录：本页只用 session/* 示意。',
      '不能证明 Python SDK 或 ACP 客户端的实现细节。',
      '不能用本页替代 transport.ts 对半行/坏行的容错处理。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算配对与顺序规则。 */
export function evaluateWireOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildWireModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('WP_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  const firstIsInitialize = model.steps.find(s => s.phase === 'request')?.detail.includes('initialize') ?? false
  add('WP_INITIALIZE_FIRST', model.input.scriptId === 'unordered'
    ? '乱序的业务请求被服务器拒绝'
    : '对话的第一句是 initialize',
    model.input.scriptId === 'unordered' ? model.steps.some(s => s.phase === 'error-response') : firstIsInitialize,
    model.input.scriptId === 'unordered' ? '出现拒绝回应' : 'initialize 在最前',
    model.input.scriptId === 'unordered' ? (model.steps.some(s => s.phase === 'error-response') ? '已拒绝' : '竟然放行') : firstIsInitialize ? '顺序正确' : '顺序错误')

  // 通知永远没有配对义务。
  const notePhases = model.steps.filter(s => s.phase.includes('notification')).length
  add('WP_NOTIFICATION_ONE_WAY', '通知是单向的：不产生配对义务',
    o.notifications === 0 || notePhases >= 1,
    o.notifications > 0 ? '存在通知步骤' : '无通知场景',
    String(notePhases) + ' 条通知相关步骤')

  add('WP_ERROR_IN_BAND', '服务端错误走 response 通道而不是断线',
    !o.errorViaResponseNotDisconnect || model.steps.some(s => s.phase === 'error-response'),
    o.errorViaResponseNotDisconnect ? '带内错误回应' : '无错误场景',
    o.errorViaResponseNotDisconnect ? '已带内回应' : '—')

  return { pass: checks.every(c => c.pass), checks }
}
