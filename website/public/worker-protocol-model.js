/**
 * 工作流 worker-thread 协议的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/workflow/workflow-worker-thread/
 * src/protocol.ts 与 README.md：
 *
 *   Host⇄Worker 是双向闭合协议。Worker→Host 八个标签（Ready/Phase/Log/
 *   AgentStart/AgentEnd/ChildStart/ChildDispose/Result），Host→Worker 七个
 *   （Go/Cancel/ChildStarted/ChildStartError/ChildSettled/ChildFailed/
 *   ChildDisposed）。Ready/Go 握手防止启动取消竞态；每个 ChildStart 恰好一个
 *   回复；Cancel 后 hooks 开始抛、脚本在下一个 await 死亡；
 *   worker.terminate() 是真正的最终停止。
 *
 * 教学约定：脚本内容是教学常量；时间戳用步序号代替。
 * 没有真实 worker 线程或子代理进程。
 */

export const WORKER_TO_HOST = Object.freeze([
  'Ready', 'Phase', 'Log', 'AgentStart', 'AgentEnd', 'ChildStart', 'ChildDispose', 'Result',
])
export const HOST_TO_WORKER = Object.freeze([
  'Go', 'Cancel', 'ChildStarted', 'ChildStartError', 'ChildSettled', 'ChildFailed', 'ChildDisposed',
])

export const PROTOCOL_SCENARIOS = Object.freeze(['normal', 'cancel-mid-flight', 'child-start-error'])
export const PROTOCOL_DIRECTIONS = Object.freeze(['host→worker', 'worker→host'])

/**
 * 组装一条确定性的双向消息流。
 *
 * 每条消息记录方向、标签、载荷摘要和配对键（如果有 RPC 关联）。
 */
function buildMessages(scenario) {
  const msgs = []
  let callId = 0

  const push = (dir, tag, detail, extras = {}) => {
    msgs.push({ index: msgs.length, dir, tag, detail, ...extras })
  }

  // 握手：Ready → Go，防止启动取消竞态。
  push('worker→host', 'Ready', 'worker 就绪并等待 Go——启动门防止取消信号竞态')

  if (scenario === 'cancel-mid-flight') {
    push('host→worker', 'Go', '释放启动门')
    push('worker→host', 'Phase', 'phase("调研")')
    push('host→worker', 'Cancel', 'cancel("用户中断")——hooks 开始抛出，脚本死在下一个 await')

    // 取消后不再有 AgentStart 或 Result。
    push('worker→host', 'Result', 'result 落定为 { stopReason: "cancelled" }——有界宽限内的强制结算')
    return msgs
  }

  push('host→worker', 'Go', '释放启动门')
  push('worker→host', 'Phase', 'phase("调研")')
  push('worker→host', 'Log', 'log("开始搜索相关文件…")')

  // 第一个 agent() 调用：ChildStart RPC。
  callId += 1
  push('worker→host', 'ChildStart', `callId=${String(callId)}：请求宿主启动子代理（prompt + options）`,
    { rpcId: String(callId), rpcKind: 'child-start' })

  if (scenario === 'child-start-error') {
    push('host→worker', 'ChildStartError', `callId=${String(callId)}：provider 启动失败——不产生子生命周期事件`,
      { rpcId: String(callId), rpcKind: 'child-start-error' })
    push('worker→host', 'AgentEnd', `seq=1 结束：outcome='cancelled'（合成端）`,
      { kind: 'agent-end' })
    push('worker→host', 'Result', 'result 落定为 { stopReason: "error", error: "child start failed" }',
      { kind: 'result' })
    return msgs
  }

  push('host→worker', 'ChildStarted', `callId=${String(callId)}：子代理已启动（childId 已分配）`,
    { rpcId: String(callId), rpcKind: 'child-started' })
  push('worker→host', 'AgentStart', 'seq=1 子代理开始',
    { kind: 'agent-start' })

  if (scenario === 'normal') {
    push('host→worker', 'ChildSettled', `callId=${String(callId)}：子代理完成（JSON 投影）`,
      { rpcId: String(callId), rpcKind: 'child-settled' })
    push('worker→host', 'AgentEnd', 'seq=1 子代理结束（正常）',
      { kind: 'agent-end' })
    push('worker→host', 'ChildDispose', `callId=${String(callId)}：请求处置已结束的子代理`,
      { rpcId: String(callId), rpcKind: 'child-dispose' })
    push('host→worker', 'ChildDisposed', `callId=${String(callId)}：处置完成`,
      { rpcId: String(callId), rpcKind: 'child-disposed' })

    push('worker→host', 'Phase', 'phase("实现")')
    push('worker→host', 'Log', 'log("开始编写修复代码…")')

    // 第二个子代理调用。
    callId += 1
    push('worker→host', 'ChildStart', `callId=${String(callId)}：第二个子代理`,
      { rpcId: String(callId), rpcKind: 'child-start' })
    push('host→worker', 'ChildStarted', `callId=${String(callId)}：子代理已启动`,
      { rpcId: String(callId), rpcKind: 'child-started' })
    push('worker→host', 'AgentStart', 'seq=2 子代理开始', { kind: 'agent-start' })
    push('host→worker', 'ChildSettled', `callId=${String(callId)}：子代理完成`,
      { rpcId: String(callId), rpcKind: 'child-settled' })
    push('worker→host', 'AgentEnd', 'seq=2 子代理结束', { kind: 'agent-end' })
    push('worker→host', 'ChildDispose', `callId=${String(callId)}`,
      { rpcId: String(callId), rpcKind: 'child-dispose' })
    push('host→worker', 'ChildDisposed', `callId=${String(callId)}：处置完成`,
      { rpcId: String(callId), rpcKind: 'child-disposed' })

    push('worker→host', 'Result', 'result 落定为 { stopReason: "completed", value: … }',
      { kind: 'result' })
  } else {
    // cancel-mid-flight 不走这里。
    push('host→worker', 'ChildSettled', `callId=${String(callId)}：子代理失败`,
      { rpcId: String(callId), rpcKind: 'child-settled' })
    push('worker→host', 'AgentEnd', 'seq=1 子代理结束（失败→null）', { kind: 'agent-end' })
    push('worker→host', 'Result', 'result 落定：{ stopReason: "completed", value 含 null }',
      { kind: 'result' })
  }

  return msgs
}

export function buildProtocolModel(input = {}) {
  const scenario = PROTOCOL_SCENARIOS.find(item => item === input.scenario)
  if (scenario === undefined) throw new RangeError('未知场景：' + String(input.scenario))
  const messages = buildMessages(scenario)

  const childStarts = messages.filter(msg => msg.tag === 'ChildStart')
  const childReplies = messages.filter(msg =>
    msg.tag === 'ChildStarted' || msg.tag === 'ChildStartError')
  const resultMsgs = messages.filter(msg => msg.tag === 'Result')

  return {
    mode: 'protocol',
    input: { scenario },
    messages,
    observations: {
      total: messages.length,
      childStarts: childStarts.length,
      childReplies: childReplies.length,
      results: resultMsgs.length,
      handshakePresent: messages.some(msg => msg.tag === 'Ready')
        && messages.some(msg => msg.tag === 'Go'),
    },
    canProve: Object.freeze([
      'Ready/Go 握手保证脚本不会在启动信号竞态中意外执行。',
      '每个 ChildStart 恰好有一个回复（ChildStarted 或 ChildStartError）。',
      'Cancel 后 hooks 开始抛出，脚本死在下一个 await——有界宽限内强制结算。',
      'worker.terminate() 给 disposal 一个真实的最终停止点。',
    ]),
    cannotProve: Object.freeze([
      '真实 worker_threads 的结构化克隆开销。',
      'node:vm 的 API 塑形行为——它不是安全边界。',
      '真实 provider 启动延迟或超时数值。',
    ]),
  }
}

export function evaluateProtocolOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildProtocolModel(model.input)
  add('PROTOCOL_DETERMINISTIC', '同一场景重建同一条消息流',
    JSON.stringify(rebuilt.messages) === JSON.stringify(model.messages),
    '两次一致', JSON.stringify(rebuilt.messages) === JSON.stringify(model.messages) ? '一致' : '不一致')

  const readyIdx = model.messages.findIndex(msg => msg.tag === 'Ready')
  const goIdx = model.messages.findIndex(msg => msg.tag === 'Go')
  add('HANDSHAKE_ORDER', 'Ready 必须先于 Go——启动门的语义',
    readyIdx !== -1 && goIdx !== -1 && readyIdx < goIdx,
    'Ready < Go', readyIdx < goIdx ? '顺序正确' : '顺序错误')

  const starts = model.messages.filter(msg => msg.tag === 'ChildStart')
  const replies = model.messages.filter(msg =>
    msg.tag === 'ChildStarted' || msg.tag === 'ChildStartError')
  add('CHILD_RPC_PAIRED', '每个 ChildStart 恰好有一个回复',
    starts.length === replies.length,
    `${String(starts.length)} 对 ${String(starts.length)}`,
    `${String(replies.length)} 对 ${String(starts.length)}`)

  const results = model.messages.filter(msg => msg.tag === 'Result')
  add('SINGLE_RESULT', '恰好一条终局 Result 消息',
    results.length === 1, '恰 1 条', `${String(results.length)} 条`)

  const lastIsResult = model.messages[model.messages.length - 1]?.tag === 'Result'
  add('RESULT_TERMINAL', 'Result 是消息流的最后一条',
    lastIsResult, 'Result 收尾', lastIsResult ? '收尾' : '不在末尾')

  return { pass: checks.every(check => check.pass), checks }
}
