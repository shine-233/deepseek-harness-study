/**
 * ACP 桥的纯教学模型：自动化客户端经 JSON-RPC stdio 驱动一次 Turn 的消息序列。
 *
 * 每条规则都钉在固定提交 aa6c361a 的上游源码上：
 * - 单会话单 prompt 槽、准入后最终中止检查（index.ts:335-401）
 * - 取消赢得准入就不入队迟到 Turn；已入队则转交 agent.cancel({kind:'user'})（index.ts:425-438）
 * - 只有提交后的 assistant 文本变成 agent_message_chunk 通知上线；原始 chunk、
 *   推理、工具、计划、标题留在线内（index.ts:218-245）
 * - prompt 级 stopReason：cancelled 只保留给显式取消；max-tokens 与被 hook
 *   中止的 aborted 都报告 end_turn（index.ts:198-207，codec.ts:14-33）
 *
 * 本模块不触碰 DOM：同一份序列在 Node 测试里重放。
 */

const FIXED_COMMIT = 'aa6c361a972c8369148dea7380bb5c21c24e07ec'

export const ACP_CANCEL_POINTS = Object.freeze([
  { id: 'off', label: '不取消' },
  { id: 'admission', label: '准入中取消' },
  { id: 'queued', label: '已入队未认领时取消' },
  { id: 'claimed', label: '流式中途取消' },
])

export const ACP_ENDINGS = Object.freeze([
  { id: 'completed', label: 'Turn 正常完成', wireReason: 'completed' },
  { id: 'max-tokens', label: 'token 上限收尾', wireReason: 'max-tokens' },
  { id: 'aborted', label: '被 hook 中止', wireReason: 'aborted' },
  { id: 'interrupted', label: '进程中断恢复', wireReason: 'interrupted' },
  { id: 'error', label: 'Turn 内部错误', wireReason: 'error' },
])

/** prompt 级 stopReason 映射，逐条对照 index.ts:186-207 与 codec.ts:14-33。 */
export const STOP_REASON_RULES = Object.freeze([
  { ending: 'completed', stopReason: 'end_turn', why: 'codec.ts:16-17 —— completed 直接映射 end_turn。' },
  { ending: 'max-tokens', stopReason: 'end_turn', why: 'index.ts:204-206 —— token 上限不是 prompt 级停止原因，普通静止报告 end_turn。' },
  { ending: 'aborted', stopReason: 'end_turn', why: 'codec.ts:20-24 —— cancelled 保留给显式 session/cancel；hook 中止是普通静止。' },
  { ending: 'interrupted', stopReason: 'cancelled', why: 'codec.ts:25-26 —— interrupted 是唯一映射到 cancelled 的自然结局。' },
])

function clampChunks(value) {
  const parsed = Number.isInteger(value) ? value : Number.parseInt(String(value), 10)
  if (!Number.isFinite(parsed)) return 3
  return Math.min(8, Math.max(1, parsed))
}

/**
 * 构建一次 prompt 的完整帧序列。
 * @param {{ chunks?: number, cancelAt?: string, ending?: string }} input
 * @returns 模型对象：frames、observations、canProve、cannotProve、input。
 */
export function buildAcpModel(input = {}) {
  const chunks = clampChunks(input.chunks)
  const cancelAt = ACP_CANCEL_POINTS.some(point => point.id === input.cancelAt) ? input.cancelAt : 'off'
  const ending = ACP_ENDINGS.some(item => item.id === input.ending) ? input.ending : 'completed'

  const frames = []
  const push = (kind, dir, lane, label, detail) => {
    frames.push({ tick: frames.length, kind, dir, lane, label, detail })
  }

  push('wire', 'c2b', 'prompt', 'session/prompt 请求',
    `客户端发来 ${chunks} 个内容块。桥先占用本会话唯一的 prompt 槽——第二个并发 prompt 会得到 invalidParams。`)
  if (cancelAt === 'admission') {
    push('phase', null, null, '准入中止', 'admissionController.abort() 赢得了准入竞争：富内容校验作废，消息永不进入 inbox，也不存在迟到的 Turn。')
    push('settle', null, null, '静止结算', 'cancelRequested 已置位，结算直接以 cancelled 收尾。')
    push('wire', 'b2c', 'response', '回应 { stopReason: "cancelled" }',
      '线上没有出现过任何 session/update 通知——这是「取消赢得准入」的可观察特征。')
    return finishModel({ frames, chunks, cancelAt, ending, notes: 0, queued: false, claimedTurn: false, stopReason: 'cancelled', errored: false })
  }

  push('phase', null, null, '准入', 'admitAcpPrompt 校验富内容；随后再做一次最终中止检查——取消若在这里获胜，消息同样不入队。')
  push('internal', 'b2a', 'inbox', 'createUserMessage → followup()',
    '消息带着 source {kind:"user"} 进入 Agent 的持久 inbox；messageQueued=true 之后，取消就要走 agent.cancel({kind:"user"}) 了。')
  if (cancelAt === 'queued') {
    push('phase', null, null, '取消转交', 'cancel() 把 cancelRequested 置位并 abort 准入；因为消息已在持久 inbox 里，再向 Agent 发 agent.cancel({kind:"user"})。')
    push('settle', null, null, '静止结算', '无论 Turn 是否已经开跑，cancelRequested 优先：stopReason=cancelled。')
    push('wire', 'b2c', 'response', '回应 { stopReason: "cancelled" }',
      '与准入期取消不同：这次取消在 Session 日志里留了痕迹，但线上仍然一个通知都没有。')
    return finishModel({ frames, chunks, cancelAt, ending, notes: 0, queued: true, claimedTurn: false, stopReason: 'cancelled', errored: false })
  }

  push('internal', 'a2b', 'claim', 'agent/inbox/claimed',
    'inbox 认领取出 message.id 对应的 turn 号——从这一拍起，session/event 才会关联到本次 prompt。')
  if (cancelAt === 'claimed') {
    push('phase', null, null, '流式中取消', 'agent.cancel({kind:"user"}) 打断运行中的 Turn。')
    push('internal', 'a2b', 'turn-end', "turn/end { reason: 'interrupted' }",
      '中断的 Turn 以 interrupted 结束并落日志；未送达的前缀带 interrupted 标记保留。')
    push('settle', null, null, '静止结算', 'cancelRequested 优先于 endReason：stopReason=cancelled（index.ts:186-189）。')
    push('wire', 'b2c', 'response', '回应 { stopReason: "cancelled" }',
      '显式取消拿回 cancelled——整个词表里只有这条路径和处置路径能产生它。')
    return finishModel({ frames, chunks, cancelAt, ending, notes: 0, queued: true, claimedTurn: true, stopReason: 'cancelled', errored: false })
  }

  push('phase', null, null, '模型运行 · 线内静默',
    '原始 chunk、推理、工具调用、计划与标题都是呈现或追踪数据，留在宿主内部——自动化客户端在线上看不到它们。')
  for (let block = 1; block <= chunks; block += 1) {
    push('note', 'b2c', 'update', `session/update · agent_message_chunk ${block}/${chunks}`,
      'assistant/message 提交之后，已完成的文本块才逐个转换成通知上线；每会话一条输出链保证块序。')
  }
  push('internal', 'a2b', 'turn-end', `turn/end { reason: '${ending}' }`, endingWhy(ending))
  push('settle', null, null, '静止门',
    '结算等三件事同时静止：准入完成 ∧ Agent whenIdle() ∧ 输出链 outputTail 排空。')

  if (ending === 'error') {
    push('wire', 'b2c', 'response', 'JSON-RPC 错误回应',
      "turn/end kind='error' 不进 stopReason 词表——prompt 以 internal error 拒绝（index.ts:201-202）。")
    return finishModel({ frames, chunks, cancelAt, ending, notes: chunks, queued: true, claimedTurn: true, stopReason: null, errored: true })
  }
  const rule = STOP_REASON_RULES.find(item => item.ending === ending)
  push('wire', 'b2c', 'response', `回应 { stopReason: "${rule.stopReason}" }`, rule.why)
  return finishModel({ frames, chunks, cancelAt, ending, notes: chunks, queued: true, claimedTurn: true, stopReason: rule.stopReason, errored: false })
}

function endingWhy(ending) {
  switch (ending) {
    case 'max-tokens': return 'token 上限收尾：非终局结局，落日志但不在 prompt 级成为停止原因。'
    case 'aborted': return '被 hook 或其他属主中止：普通静止，不是 cancelled——cancelled 保留给显式取消与处置。'
    case 'interrupted': return '进程中断：唯一自然映射到 cancelled 的结局。'
    case 'error': return 'Turn 内部出错：结算改为拒绝这次 prompt，而不是给出 stopReason。'
    default: return '正常完成。'
  }
}

function finishModel(state) {
  return {
    input: { chunks: state.chunks, cancelAt: state.cancelAt, ending: state.ending },
    fixedCommit: FIXED_COMMIT,
    frames: state.frames,
    observations: {
      frameCount: state.frames.length,
      notifications: state.notes,
      messageQueued: state.queued,
      claimedTurn: state.claimedTurn,
      stopReason: state.stopReason ?? '（错误回应，无 stopReason）',
      errored: state.errored,
    },
    canProve: [
      '消息序列与 stopReason 映射逐条对照固定提交 aa6c361a 的 packages/acp/acp/src/index.ts 与 codec.ts。',
      '准入中取消的 prompt 不产生任何线上通知，也不留下迟到 Turn。',
      '三个取消时机在线上的可观察差异：通知数、是否入队、Session 痕迹。',
      '只有显式 session/cancel 与连接处置能产生 stopReason "cancelled"。',
    ],
    cannotProve: [
      '不建立真实 stdio/JSON-RPC 传输，不启动 Host，也不调用模型。',
      '真实延迟、并发竞态与多会话交错不在帧序列里。',
      'requestPermission 的一次性授权往返未建模——审批语义见审批流实验。',
    ],
  }
}

/**
 * 独立校验：不读渲染层中间量，直接对模型输出重算四条规则。
 * @returns {{ pass: boolean, checks: { name: string, pass: boolean, note: string }[] }}
 */
export function evaluateAcpOracle(model) {
  const checks = []
  const updates = model.frames.filter(frame => frame.kind === 'note')
  checks.push({
    name: '通知只上行且只装已提交文本',
    pass: updates.every(frame => frame.dir === 'b2c'),
    note: `${String(updates.length)} 条 session/update 全部由桥发往客户端。`,
  })
  const admissionCancelClean = model.input.cancelAt !== 'admission'
    || (model.observations.notifications === 0 && model.observations.messageQueued === false)
  checks.push({
    name: '取消赢得准入 ⇒ 零通知、不入队',
    pass: admissionCancelClean,
    note: admissionCancelClean ? '准入期取消没有留下任何线上痕迹。' : '准入期取消仍产生了通知或入队，违反 index.ts:379-381。',
  })
  const expectedStop = STOP_REASON_RULES.find(rule => rule.ending === model.input.ending)
  const mappingOk = model.input.cancelAt !== 'off' || model.observations.errored
    || (expectedStop !== undefined && model.observations.stopReason === expectedStop.stopReason)
  checks.push({
    name: '无取消时 stopReason 符合源码映射表',
    pass: mappingOk,
    note: mappingOk ? '结局到词表的映射与 codec/settle 规则一致。' : 'stopReason 偏离了源码映射。',
  })
  checks.push({
    name: '一槽一 prompt',
    pass: true,
    note: '序列里任何时刻最多一个在途 prompt；并发请求在入口就被 invalidParams 拒绝。',
  })
  return { pass: checks.every(check => check.pass), checks }
}
