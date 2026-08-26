/**
 * 定时提醒与动态工作流的纯模型（schedule + workflow 编排面）。
 *
 * 事实来源是固定提交 aa6c361a 里 docs/subsystems/schedule.md、
 * docs/subsystems/workflow.md 及对应 src/types.ts：
 *
 *   schedule：v1 支持 after（延迟一次性）/ at（绝对时刻一次性）/ every
 *   （固定间隔，≥300 秒，创建锚点对齐）。会话冷或忙错过多个目标时，一条
 *   Every 只投递其最新一次到期并直接推进到决策时间后的下一个锚点——不枚举、
 *   不重放错过的区间。一次性优先；无一次性到期时，全部逾期的 Every 以同一
 *   决策时间组成单批。派发 = 同步入队后续回合，best-effort at-least-once。
 *
 *   workflow：meta 在脚本体执行前按数据校验、失败大声报错；agent() 调用以
 *   seq 精确配对 start/end，任何停止路径恰好一次（引擎终止路径由引擎合成
 *   outcome='cancelled'）；parallel()/pipeline() 对 fatal WorkflowError 重抛，
 *   对子任务失败映射为 null；result 永不 reject，取消在有界宽限内强制结算；
 *   workflow/end 刻意不带结果值。
 *
 * 教学约定：触发器参数与会话状态是教学常量；步序号代替时间戳。
 */

export const ORCH_MODES = Object.freeze(['schedule', 'workflow'])

export const SCHEDULE_KINDS = Object.freeze(['after', 'at', 'every'])
export const SESSION_STATES = Object.freeze(['live-idle', 'busy', 'cold-reopen'])

/** 教学提醒：every 的锚点间隔按 10 分钟演示（上游下限是 300 秒）。 */
const EVERY_INTERVAL_TICKS = 3

export function buildScheduleModel(input = {}) {
  const kind = SCHEDULE_KINDS.find(item => item === input.kind)
  if (kind === undefined) throw new RangeError('未知触发器：' + String(input.kind))
  const sessionState = SESSION_STATES.find(item => item === input.sessionState)
  if (sessionState === undefined) throw new RangeError('未知会话状态：' + String(input.sessionState))
  const fault = resolveFault(input.fault)

  const steps = []
  const push = (op, detail, extras = {}) =>
    steps.push({ index: steps.length, op, detail, ...extras })

  const label = kind === 'after'
    ? 'after：90 秒后提醒我提交代码'
    : kind === 'at'
      ? 'at：2026-09-01T09:00:00Z 站会提醒'
      : 'every：每 10 分钟检查一次构建'

  push('schedule_create', `创建 ${kind} 记录，目标规范化为四位年份 RFC 3339 UTC：${label}`,
    { kind: 'create', change: 'create' })
  push('append schedule/change(v1)', '唯一持久权威：create 把完整记录写进 Session 流',
    { kind: 'change', change: 'create' })

  if (sessionState === 'cold-reopen') {
    push('会话关闭', '冷会话不做任何工作；没有外部通知通道',
      { kind: 'cold' })
  }

  if (kind === 'every') {
    const missed = sessionState === 'busy' ? 2 : sessionState === 'cold-reopen' ? 3 : 0
    if (missed > 0) {
      push(`${String(missed)} 个锚点在忙/冷期间滑过`, '固定速率不补票：错过的区间不枚举、不持久化、不重放',
        { kind: 'overdue', skippedAnchors: missed })
    }
    push('维护相位', missed > 0
      ? '等待 Agent 完全空闲并认领维护相位；逾期的 Every 记录各自贡献一次，同一批使用相同决策时间'
      : '计时器到点且 Agent 空闲：仍要先认领维护相位、重折叠状态再采样决策时间',
      { kind: 'maintenance', decisionTime: missed > 0 })
    push('派发：queue(followup())', '最新一次到期进入普通后续回合；内容经普通对话记录可见',
      { kind: 'dispatch', oneShotTerminal: false, skippedAnchors: missed })
    push('append dispatch(every, acceptedAt)', `记录不终结：直接推进到决策时间后第一个创建锚点对齐的目标`,
      { kind: 'change', change: 'dispatch-every', stillActive: true })
  } else {
    if (sessionState === 'busy') {
      push('目标滑过，记录转为 overdue', '回合正在运行：定时器不打断当前回合，也绝不 steer()',
        { kind: 'overdue', skippedAnchors: 0 })
      push('等待 Agent 完全空闲并认领维护相位', '一次性到期优先于任何逾期 Every 批次',
        { kind: 'maintenance', decisionTime: false })
    } else if (sessionState === 'cold-reopen') {
      push('重新打开会话', '重建计时器并把过去的目标标为 overdue',
        { kind: 'overdue', skippedAnchors: 0 })
      push('维护相位', '一次性到期优先进场', { kind: 'maintenance', decisionTime: false })
    } else {
      push('计时器到点', '会话存活且空闲：维护相位立即认领', { kind: 'maintenance', decisionTime: false })
    }
    push('派发：queue(followup())', '同步入队成功才追加 dispatch；入队失败则不记录、提醒保持激活',
      { kind: 'dispatch', oneShotTerminal: true, skippedAnchors: 0 })
    push('append dispatch(one-shot)', '一次性派发即终局：id-only 转换，记录退役',
      { kind: 'change', change: 'dispatch-oneshot', stillActive: false })
  }

  const dispatchStep = steps.find(step => step.kind === 'dispatch')
  const everyActive = kind === 'every'
  const model = {
    mode: 'schedule',
    input: { kind, sessionState, fault },
    label,
    steps,
    observations: {
      dispatchCount: dispatchStep === undefined ? 0 : 1,
      skippedAnchors: kind === 'every'
        ? (sessionState === 'busy' ? 2 : sessionState === 'cold-reopen' ? 3 : 0)
        : 0,
      recordStillActive: everyActive,
      oneShotPriorityApplied: false,
    },
    canProve: Object.freeze([
      'schedule/change v1 是唯一持久权威；fold 拒绝未知版本、多余字段与对非激活记录的转换。',
      'Every 追投只取最新一次到期并直接推进锚点——不枚举错过的区间。',
      '派发只是同步入队后续回合；at-least-once 而非 exactly-once。',
      '交付边界是 session-local：冷会话没有外部通知通道。',
    ]),
    cannotProve: Object.freeze([
      '真实计时器的唤醒时机与漂移。',
      'Cron 或日历表达式——协议里不存在。',
      '模型回合是否真的回答成功；派发不等于已读。',
    ]),
  }
  /*
   * 教学故障：账本把滑过的锚点谎报成零——「不补票」被伪造成了已补票。
   * 时间线里的 overdue 步骤原样保留，所以矛盾肉眼可见：CATCHUP_LATEST_ONLY 抓住它。
   */
  if (fault === 'replay-missed') model.observations.skippedAnchors = 0
  return model
}

export const WORKFLOW_ENDINGS = Object.freeze(['completed', 'error', 'cancelled'])
export const WORKFLOW_SHAPES = Object.freeze(['sequential-2', 'parallel-3-one-fails'])

/** 教学故障注入：按模式各一个。schedule→账本谎报补投；workflow→吞掉一条配对端。 */
export const ORCH_FAULT_TYPES = Object.freeze(['none', 'replay-missed', 'drop-agent-end'])

function resolveFault(fault) {
  const type = fault ?? 'none'
  if (!ORCH_FAULT_TYPES.includes(type)) {
    throw new RangeError('未知故障类型：' + String(type))
  }
  return type
}

export function buildWorkflowModel(input = {}) {
  const ending = WORKFLOW_ENDINGS.find(item => item === input.ending)
  if (ending === undefined) throw new RangeError('未知结局：' + String(input.ending))
  const shape = WORKFLOW_SHAPES.find(item => item === input.shape)
  if (shape === undefined) throw new RangeError('未知形状：' + String(input.shape))
  const fault = resolveFault(input.fault)

  const steps = []
  const push = (op, detail, extras = {}) => steps.push({ index: steps.length, op, detail, ...extras })

  push('start(request)', 'meta 先按数据校验（name/description 必填），失败会在任何脚本执行前大声报错；parent 必填，每个子代理都归它',
    { kind: 'start' })
  push("emit workflow/start", '观察者拿到 id+meta 快照，拿不到 cancel/dispose 句柄',
    { kind: 'event', event: 'workflow/start' })
  push("phase('调研')", 'phase() 只匹配 meta.phases 标题做进度展示，不构成执行结构',
    { kind: 'event', event: 'workflow/phase' })

  const children = []
  const addChild = (seq, phaseTitle, fails) => {
    push(`emit workflow/agent-start(seq=${String(seq)})`, `${shape.startsWith('parallel') ? '并发槽位里的' : ''}子调用 ${String(seq)} 开始`,
      { kind: 'event', event: 'workflow/agent-start', seq })
    let outcome
    if (fails) outcome = 'child-failed'
    else if (ending === 'cancelled') outcome = 'cancelled'
    else outcome = 'ok'
    children.push({ seq, outcome, phaseTitle })
    const synthesized = ending === 'cancelled'
    push(`emit workflow/agent-end(seq=${String(seq)})`,
      synthesized
        ? '取消路径上引擎合成 outcome=\'cancelled\'——任何停止路径都恰好配对一次'
        : fails ? '子运行非完成停止：combinator 把这一项映射为 null'
          : '正常结束，与 start 按 seq 配对',
      { kind: 'event', event: 'workflow/agent-end', seq, synthesized, outcome })
  }

  if (shape === 'sequential-2') {
    addChild(1, '调研', false)
    if (ending === 'error') {
      push('脚本抛出 fatal WorkflowError', "未知选项这类误用带 fatal:true：combinator 重抛而不是映射成 null——错误必须大声杀死脚本",
        { kind: 'fatal' })
      addChild(2, '实现', false)
    } else {
      addChild(2, '实现', false)
    }
  } else {
    addChild(1, '调研', false)
    addChild(2, '调研', true)
    if (ending === 'error') {
      push('脚本抛出 fatal WorkflowError', 'fatal 重抛优先于并行项的 null 映射',
        { kind: 'fatal' })
    }
    addChild(3, '汇总', false)
  }

  if (ending === 'cancelled') {
    push('cancel() 后的有界宽限', '脚本本身不肯停也要结算：引擎强制 settled 为 cancelled，随后终止 worker',
      { kind: 'grace' })
  }

  const stopReason = ending === 'cancelled' ? 'cancelled' : ending === 'error' ? 'error' : 'completed'
  const failedChildren = children.filter(child => child.outcome === 'child-failed').length
  push(`result 落定：${stopReason}`, 'result 永不 reject；非 completed 用 error 字段携带失败，消费者映射为 isError 结果',
    { kind: 'settle', stopReason, value: stopReason === 'completed' ? '{ summary }' : null })
  push("emit workflow/end（不含 value）", '观察结局的监听者拿不到调用方结果的别名；每个监听者各收克隆，抛错被吞掉不传染',
    { kind: 'event', event: 'workflow/end', omitsValue: true })
  push('dispose() 达成静默', 'dispose = 取消（如需）+ 有界结算 + 子任务静默；绝不悬挂在卡死的脚本上',
    { kind: 'dispose' })

  const starts = steps.filter(step => step.event === 'workflow/agent-start').length
  const ends = steps.filter(step => step.event === 'workflow/agent-end').length
  const synthesizedEnds = steps.filter(step => step.synthesized === true).length
  const nullMapped = failedChildren > 0 && ending !== 'error'

  const model = {
    mode: 'workflow',
    input: { ending, shape, fault },
    steps,
    observations: {
      agentStarts: starts,
      agentEnds: ends,
      synthesizedEnds,
      nullMappedChildren: nullMapped ? failedChildren : 0,
      stopReason,
      endOmitsValue: true,
    },
    canProve: Object.freeze([
      'meta 是纯 JSON 数据并在脚本体之前校验——引擎不会为了读 meta 而求值任何脚本文本。',
      'agent-start/agent-end 按 seq 精确配对，取消路径上的缺失端由引擎合成。',
      'fatal WorkflowError 从 combinator 重抛；逐项 null 只留给子运行失败。',
      'WorkflowResult 永不 reject；workflow/end 刻意省略 value。',
    ]),
    cannotProve: Object.freeze([
      'worker_threads 的真实隔离强度——它不是安全边界。',
      'subagentProvider 与 maxTotalAgents 的部署取值。',
      'UI Conversation Node 的折叠渲染细节。',
    ]),
  }
  /*
   * 教学故障：吞掉最后一条 workflow/agent-end——start/end 按 seq 配对是观察者的
   * 生命线。取消路径不生效（那里靠合成端记账，吞掉会同时弄脏两处校验）。
   */
  if (fault === 'drop-agent-end' && ending !== 'cancelled') {
    for (let position = model.steps.length - 1; position >= 0; position -= 1) {
      if (model.steps[position].event === 'workflow/agent-end') {
        model.steps.splice(position, 1)
        model.steps.forEach((step, index) => { step.index = index })
        model.observations.agentEnds -= 1
        break
      }
    }
  }
  return model
}

export function evaluateOrchestrationOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  if (model.mode === 'schedule') {
    const rebuiltS = buildScheduleModel(model.input)
    add('SCHEDULE_DETERMINISTIC', '同一输入重建同一份派发时间线',
      JSON.stringify(rebuiltS.steps) === JSON.stringify(model.steps),
      '两次一致', JSON.stringify(rebuiltS.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

    const dispatches = model.steps.filter(step => step.kind === 'dispatch')
    add('DISPATCH_IS_QUEUED', '派发恰好一次且同步入队',
      dispatches.length === 1, '恰 1 次', String(dispatches.length))

    const expectedSkipped = model.input.kind === 'every'
      ? (model.input.sessionState === 'busy' ? 2 : model.input.sessionState === 'cold-reopen' ? 3 : 0)
      : 0
    add('CATCHUP_LATEST_ONLY', 'Every 错过的锚点被跳过而不是逐个补投',
      model.observations.skippedAnchors === expectedSkipped,
      String(expectedSkipped) + ' 个被跳过', String(model.observations.skippedAnchors) + ' 个被跳过')

    const everyStillActive = model.input.kind === 'every'
    add('ONESHOT_TERMINATES_EVERY_ADVANCES', '一次性派发即终局；Every 推进后保持激活',
      model.observations.recordStillActive === everyStillActive,
      everyStillActive ? '记录仍激活' : '记录退役',
      model.observations.recordStillActive ? '记录仍激活' : '记录退役')

    const maintenanceCount = model.steps.filter(step => step.kind === 'maintenance').length
    add('MAINTENANCE_BEFORE_DELIVERY', '派发前必须先经过维护相位',
      maintenanceCount >= 1 && model.steps.findIndex(step => step.kind === 'maintenance') < model.steps.findIndex(step => step.kind === 'dispatch'),
      '先维护后派发', maintenanceCount >= 1 ? '顺序正确' : '缺少维护相位')

    return { pass: checks.every(check => check.pass), checks }
  }

  const rebuiltW = buildWorkflowModel(model.input)
  add('WORKFLOW_DETERMINISTIC', '同一输入重建同一条运行时间线',
    JSON.stringify(rebuiltW.steps) === JSON.stringify(model.steps),
    '两次一致', JSON.stringify(rebuiltW.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const starts = model.steps.filter(step => step.event === 'workflow/agent-start')
  const ends = model.steps.filter(step => step.event === 'workflow/agent-end')
  const pairedBySeq = starts.every((start) => {
    const matches = ends.filter(end => end.seq === start.seq)
    return matches.length === 1 && matches[0].index > start.index
  }) && starts.length === ends.length
  add('AGENT_PAIRING', '每个 agent 调用按 seq 恰好一对 start/end',
    pairedBySeq,
    '完全配对',
    pairedBySeq ? '完全配对' : `${String(starts.length)} 对 ${String(ends.length)}`)

  const settleStep = model.steps.find(step => step.kind === 'settle')
  const validReasons = ['completed', 'cancelled', 'error']
  add('RESULT_NEVER_REJECTS', '结算落在封闭的三个 stopReason 里',
    settleStep !== undefined && validReasons.includes(settleStep.stopReason),
    validReasons.join('/'), String(settleStep?.stopReason))

  if (model.input.ending === 'cancelled') {
    const graceIndex = model.steps.findIndex(step => step.kind === 'grace')
    const synth = ends.some(end => end.synthesized === true)
    add('BOUNDED_GRACE_SYNTHESIS', '取消路径有宽限强结算，且缺失的 agent-end 由引擎合成',
      graceIndex !== -1 && (synth || model.input.shape === 'sequential-2'),
      '宽限 + 合成端', graceIndex !== -1 ? '宽限在场' : '缺宽限')
  }

  if (model.input.ending === 'error') {
    const fatal = model.steps.some(step => step.kind === 'fatal')
    add('FATAL_RETHROWS', '脚本误用走 fatal 重抛，不溶解成普通子失败',
      fatal, '存在 fatal 步骤', fatal ? '存在' : '缺失')
  }

  const endEvent = model.steps.find(step => step.event === 'workflow/end')
  add('END_OMITS_VALUE', 'workflow/end 不携带结果值',
    endEvent?.omitsValue === true, 'value 缺席', endEvent?.omitsValue === true ? 'value 缺席' : '泄漏了 value')

  return { pass: checks.every(check => check.pass), checks }
}
