/**
 * 后台任务生命周期的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 docs/subsystems/jobs.md 与
 * packages/jobs/jobs/src/types.ts：
 *
 *   JobStatus = 'running' | 'stopping' | 'completed' | 'killed' | 'failed'；
 *   id 形如 `<kind>-N`；kill 对存活任务返回 'requested'、其余返回
 *   'already-finished' 并把记录标成 stopping + reported；结算先到先得——
 *   一条终局记录、一轮通知，迟到的 producer 结果被忽略；done 拒绝时记录转
 *   failed；teardown 取消同样认领 reported，因为所有者销毁后不再有读者，
 *   完成通知不该再为它打开模型回合。
 *
 * 教学约定：三个剧本（读者流、杀手流、拆除流）× 三种结局是固定教学常量；
 * 时间戳用离散步序号代替。没有真实子进程或真实注册表。
 */

export const JOBS_SCRIPTS = Object.freeze(['reader', 'killer', 'teardown'])
export const JOBS_ENDINGS = Object.freeze(['completed', 'failed', 'late-completed'])

const JOB_ID = 'bash-1'

/**
 * 组装一条确定性的操作时间线。每步记录：操作、状态迁移、reported 变化、
 * 是否发出完成通知，以及给独立校验用的结构化标记。
 */
function buildSteps(script, ending) {
  const steps = []
  const push = (op, statusBefore, statusAfter, detail, extras = {}) => {
    steps.push({
      index: steps.length,
      op,
      statusBefore,
      statusAfter,
      reported: extras.reported ?? false,
      notice: extras.notice ?? null,
      ...extras,
    })
  }

  push('ctx.jobs.start({ kind: \'bash\' })', null, 'running',
    `注册并原子登记：id=${JOB_ID}（preflight 之后才调用 run，之后注册不可能失败）`,
    { kind: 'start', jobId: JOB_ID })

  if (script === 'reader') {
    const lateCompleted = ending === 'late-completed'
    push('read()', 'running', 'running',
      '流式读取：返回自上次消费以来的增量；读游标前移但不改变 reported',
      { kind: 'read', delta: 'building… 40%' })

    if (ending === 'failed') {
      push('producer 的 done 被拒绝', 'running', 'failed',
        'done 不允许 reject：运行时把拒绝转换成 failed 记录（detail=producer threw）',
        { kind: 'settle', terminal: 'failed', detail: 'producer threw', reportedClaim: true })
    } else {
      push('producer 结算 done', 'running', 'completed',
        '生产者释放资源后 done 才落定；detail=\'exit code: 0\'',
        { kind: 'settle', terminal: 'completed', detail: 'exit code: 0', reportedClaim: false })
    }

    push('read()（终局读）', 'failed', 'failed',
      '终局输出幂等可重读；这次终局读把 reported 置真',
      { kind: 'read-final', reportedClaim: true })

    push('onJobDone 通知', 'failed', 'failed',
      '完成通知最后送达：此时记录已提交、其他观察者都已见过结算',
      { kind: 'notice', reportedClaim: true })
    void lateCompleted
    return steps
  }

  if (script === 'killer') {
    push('kill(\'user asked\')', 'running', 'stopping',
      '取消请求转发给 producer.cancel，记录立刻转为 stopping 并认领 reported',
      { kind: 'kill', result: 'requested', reportedClaim: true })

    if (ending === 'failed') {
      push('drain：producer 的 done 被拒绝', 'stopping', 'failed',
        '取消路径上 done 拒绝同样转 failed；工作是否真的停止不由这条记录声称',
        { kind: 'settle', terminal: 'failed', detail: 'cancelled then threw', reportedClaim: false })
    } else {
      push('producer 结算 done', 'stopping', 'killed',
        `取消后的结算固定为 killed（detail='signal: SIGTERM'）`,
        { kind: 'settle', terminal: 'killed', detail: 'signal: SIGTERM', reportedClaim: false })
      if (ending === 'late-completed') {
        push('迟到的 resolved(completed)', 'killed', 'killed',
          '先到先得：终局已记录为 killed，迟到的 completed 整体被忽略',
          { kind: 'late-outcome', ignored: true })
      }
    }

    push('第二次 kill', 'killed', 'killed',
      "对已结算任务 kill 返回 'already-finished'",
      { kind: 'kill', result: 'already-finished' })

    push('完成通知检查', 'killed', 'killed',
      'reported 已被 kill 认领：完成通知被抑制，不再为它开模型回合',
      { kind: 'notice', suppressed: true })
    return steps
  }

  // teardown：所有者销毁触发取消与排空。
  push('owner dispose', 'running', 'stopping',
    '所有者销毁会取消在活任务并等待合规的 producer 排空',
    { kind: 'teardown-cancel', reportedClaim: true })

  if (ending === 'failed') {
    push('drain 时 teardown cancel 抛错', 'stopping', 'failed',
      '抛错的 teardown 取消只强制失败注册表记录，不声称工作已经停止',
      { kind: 'settle', terminal: 'failed', detail: 'force-failed record', reportedClaim: true })
  } else {
    push('drain 完成', 'stopping', 'killed',
      `排空后记录落为 killed（detail='owner disposed'）；teardown 已认领 reported`,
      { kind: 'settle', terminal: 'killed', detail: 'owner disposed', reportedClaim: false })
    if (ending === 'late-completed') {
      push('迟到的 resolved(completed)', 'killed', 'killed',
        '先到先得：拆除场景下这条迟到结果同样被忽略',
        { kind: 'late-outcome', ignored: true })
    }
  }

  push('完成通知检查', 'killed', 'killed',
    '没有读者存在：teardown 认领 reported，通知为零',
    { kind: 'notice', suppressed: true })
  return steps
}

export function buildJobsModel(input = {}) {
  const script = JOBS_SCRIPTS.find(item => item === input.script)
  if (script === undefined) throw new RangeError('未知剧本：' + String(input.script))
  const ending = JOBS_ENDINGS.find(item => item === input.ending)
  if (ending === undefined) throw new RangeError('未知结局：' + String(input.ending))

  const normalized = { script, ending }
  const steps = buildSteps(script, ending)
  const terminalStep = steps.find(step => step.kind === 'settle')
  const notices = steps.filter(step => step.kind === 'notice')
  const noticeDelivered = notices.some(step => step.suppressed !== true)

  return {
    input: normalized,
    steps,
    jobId: JOB_ID,
    observations: {
      steps: steps.length,
      terminalStatus: terminalStep?.terminal ?? null,
      reportedAtEnd: steps[steps.length - 1].reported || steps.some(step => step.reportedClaim && step.kind === 'kill'),
      noticesDelivered: noticeDelivered ? 1 : 0,
      lateOutcomeIgnored: steps.some(step => step.kind === 'late-outcome'),
    },
    canProve: Object.freeze([
      'kill 对存活任务返回 requested 并认领 reported；对已结算任务返回 already-finished。',
      '结算先到先得：迟到的 producer 结果不会改写已记录的终局。',
      'done 拒绝被运行时转换为 failed 记录，而不是让等待方悬挂。',
      'reported 被认领后完成通知被抑制；teardown 场景因此零通知。',
    ]),
    cannotProve: Object.freeze([
      '真实 LocalJobRegistry 的并发上限（默认每所有者 10 个 running+stopping）。',
      '真实进程取消、信号传递或排空耗时。',
      'workflow worker-thread provider 的调度细节；本页只覆盖 ctx.jobs 的生命周期契约。',
    ]),
  }
}

export function evaluateJobsOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildJobsModel(model.input)
  add('JOBS_DETERMINISTIC', '同一输入重建同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const settles = model.steps.filter(step => step.kind === 'settle')
  add('FIRST_SETTLEMENT_WINS', '恰好一次终局结算；迟到的结果不产生第二条',
    settles.length === 1 && !settles[0].ignored,
    '恰 1 条结算', `${String(settles.length)} 条`)

  const expectedTerminal = model.input.script !== 'reader' && model.input.ending === 'failed'
    ? 'failed'
    : model.input.script === 'reader'
      ? (model.input.ending === 'failed' ? 'failed' : 'completed')
      : 'killed'
  add('TERMINAL_STATUS_MATCHES', '终局状态与剧本和结局的组合一致',
    settles[0]?.terminal === expectedTerminal,
    expectedTerminal, String(settles[0]?.terminal))

  const killCalls = model.steps.filter(step => step.op.includes('kill'))
  if (model.input.script === 'killer') {
    add('KILL_RETURNS', "两次 kill 分别返回 requested 与 already-finished",
      killCalls[0]?.result === 'requested' && killCalls[1]?.result === 'already-finished',
      'requested → already-finished',
      `${String(killCalls[0]?.result)} → ${String(killCalls[1]?.result)}`)
  }

  const notices = model.steps.filter(step => step.kind === 'notice')
  const delivered = notices.filter(step => step.suppressed !== true).length
  const shouldDeliver = model.input.script === 'reader'
  add('REPORTED_SUPPRESSES_NOTICE', 'reported 已认领时通知被抑制；读者流恰好一条',
    delivered === (shouldDeliver ? 1 : 0),
    shouldDeliver ? '1 条通知' : '0 条通知', `${String(delivered)} 条`)

  const teardownClaimed = model.steps.some(step =>
    step.kind === 'teardown-cancel' && step.reportedClaim === true)
  if (model.input.script === 'teardown') {
    add('TEARDOWN_CLAIMS_REPORTED', '拆除场景零通知：reported 由 teardown 认领',
      teardownClaimed && delivered === 0, '认领且 0 通知', delivered === 0 ? '认领且 0 通知' : `${String(delivered)} 条通知`)
  }

  return { pass: checks.every(check => check.pass), checks }
}
