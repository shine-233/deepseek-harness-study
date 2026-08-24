/**
 * 持久终端会话（TerminalSessionService）的纯教学模型：基于上游
 * packages/terminal/terminal（基线 aa6c361a）README 与类型声明里的真实约定。
 *
 * 核心规则：
 * - 会话按所有者（同一个活跃 Agent）划界：同一会话里的多次发送共享
 *   cwd、环境变量等 PTY 状态；新会话从全新状态开始。
 * - 一个会话同时最多接受一个活跃发送：上一次还没结算，第二次发送直接失败；
 *   读取与信号操作只观察，不占用发送位。
 * - `kill()` 与 dispose 等后端捕获的整棵进程树完全停稳后才返回；
 *   清理失败以拒绝收场，绝不声称「已经完全停稳」。
 * - `waitReason`（等待原因）与 `sessionStatus`（顶层 PTY 进程状态）互相独立：
 *   顶层 shell 还活着不代表你要等的那条命令没退出。
 *
 * 教学模型不启动真实 PTY：命令输出用给定脚本的事实表模拟，
 * 「状态是否延续」是模型里显式记账的布尔量，不是猜的。
 */

export const TERM_LANES = Object.freeze(['调用方', '终端缝', 'PTY 会话', '进程树'])

export const TERM_SCRIPTS = Object.freeze([
  Object.freeze({
    id: 'cwd',
    label: 'cd /tmp → pwd',
    description: '换目录后再问一次当前位置：状态延续时第二次 pwd 在 /tmp，新会话则在家目录。',
    facts: Object.freeze([
      Object.freeze({ send: 'cd /tmp', output: '（无输出，提示符移动）', carriesState: true }),
      Object.freeze({ send: 'pwd', output: '/tmp', carriesState: true }),
    ]),
  }),
  Object.freeze({
    id: 'env',
    label: 'export A=1 → echo $A',
    description: '设置环境变量后再读一次：同一会话读到 1，新会话读到空。',
    facts: Object.freeze([
      Object.freeze({ send: 'export A=1', output: '（无输出）', carriesState: true }),
      Object.freeze({ send: 'echo $A', output: '1', carriesState: true }),
    ]),
  }),
])

function resolveInput(input = {}) {
  if (input.scriptId !== undefined && !TERM_SCRIPTS.some(script => script.id === input.scriptId)) {
    throw new RangeError('未知命令脚本：' + String(input.scriptId))
  }
  if (input.freshEach !== undefined && typeof input.freshEach !== 'boolean') throw new TypeError('freshEach 必须是布尔值')
  if (input.concurrentSend !== undefined && typeof input.concurrentSend !== 'boolean') throw new TypeError('concurrentSend 必须是布尔值')
  if (input.killAfter !== undefined && typeof input.killAfter !== 'boolean') throw new TypeError('killAfter 必须是布尔值')
  return {
    scriptId: input.scriptId ?? 'cwd',
    freshEach: input.freshEach === true,
    concurrentSend: input.concurrentSend === true,
    killAfter: input.killAfter === true,
  }
}

/**
 * 推演一条命令脚本的会话之旅。freshEach = false 时两次发送共用同一会话，
 * 状态延续；freshEach = true 时每次发送都开新会话，状态归零。
 */
export function buildTerminalModel(input = {}) {
  const resolved = resolveInput(input)
  const script = TERM_SCRIPTS.find(candidate => candidate.id === resolved.scriptId)
  const steps = []
  let index = 0
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ lane: TERM_LANES[laneIdx], phase, detail, ...extra })
    index += 1
  }

  push(0, 'spawn', '请求一个终端会话：后端注册稳定 type，返回尚未发布的会话。')
  for (const [i, fact] of script.facts.entries()) {
    const sid = 'term-' + String(resolved.freshEach ? i : 0)
    push(0, 'send', '第 ' + String(i + 1) + ' 次发送：' + fact.send)
    push(1, 'route', resolved.freshEach && i > 0
      ? '每次发送都开新会话：这是第 ' + String(i + 1) + ' 个会话 ' + sid + '。'
      : '路由到同一个会话 ' + sid + '：所有者范围内的持久 PTY。')
    push(2, 'state', resolved.freshEach
      ? '全新会话：cwd、环境变量全部回到初始值。'
      : '沿用上一条命令留下的状态（cwd、env）。', { carried: !resolved.freshEach })
    push(2, 'output', '输出：' + fact.output + (resolved.freshEach ? '——状态没有延续。' : ''))
    if (resolved.concurrentSend && i === 0) {
      push(0, 'second-send-rejected', '第一个发送还没结算就发起第二个：本会话拒绝并发发送，读取和信号不受影响。')
      push(1, 'reject-note', '拒绝的是发送位，不是会话本身；第一条命令照常结算。')
    }
  }

  if (resolved.killAfter) {
    push(3, 'kill', 'kill() 发出：等待后端捕获的整棵进程树完全停稳。')
    push(3, 'settled', '进程树已停稳，清理完成，调用才返回。清理失败会以拒绝收场，绝不声称成功。')
  } else {
    push(3, 'alive', '顶层 PTY 进程仍在运行；waitReason 只描述当前等待的那条命令。')
  }

  const sessionCount = resolved.freshEach ? script.facts.length : 1
  const stateCarried = !resolved.freshEach

  return {
    input: { ...resolved },
    script: { id: script.id, label: script.label, description: script.description },
    lanes: TERM_LANES,
    steps,
    observations: {
      sends: script.facts.length,
      sessionCount,
      stateCarried,
      secondSendRejected: resolved.concurrentSend,
      treeSettledBeforeReturn: resolved.killAfter,
      waitReasonIndependent: true,
      forkShape: resolved.freshEach ? '一次性会话：每条命令都是新世界'
        : '持久会话：状态跨发送延续',
    },
    canProve: [
      '同一会话内的后续发送沿用之前的 cwd 与环境变量；每个新会话都从初始状态开始。',
      '一个会话最多一个活跃发送：并发的第二次发送被拒绝，第一条命令照常结算。',
      'kill 与 dispose 等到整棵进程树停稳后才结算，清理失败以拒绝收场。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 node-pty 的行为或真实 shell 的输出格式。',
      '不能证明真实沙箱策略：本页不含 sandboxPolicy。',
      '不能证明真实 dispose 生命周期的回滚顺序与失败路径细节。',
      '不能证明真实 DSH 给模型的工具 schema 或提示词文案。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算每一条规则。 */
export function evaluateTerminalOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildTerminalModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('TM_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  const routePhases = model.steps.filter(s => s.phase === 'route')
  const distinctSessions = new Set(routePhases.map(step => (step.detail.match(/term-\d+/) ?? ['term-?'])[0])).size
  add('TM_SESSION_SCOPE', '会话数量跟随模式：持久共会话，一次性各开各的',
    distinctSessions === o.sessionCount,
    String(o.sessionCount) + ' 个会话',
    String(distinctSessions) + ' 个')

  const carriedMarks = model.steps.filter(s => s.phase === 'state').map(s => s.carried === true)
  add('TM_STATE_ACCOUNTING', '状态延续在每一步都有显式记账',
    carriedMarks.length === o.sends
    && carriedMarks.every(carried => carried === o.stateCarried),
    o.stateCarried ? '每一步都延续' : '每一次都不延续',
    carriedMarks.filter(Boolean).length + '/' + carriedMarks.length + ' 步延续')

  const rejected = model.steps.some(s => s.phase === 'second-send-rejected')
  add('TM_SINGLE_SEND', '并发第二次发送被拒，第一次照常结算',
    rejected === o.secondSendRejected,
    o.secondSendRejected ? '出现拒绝步骤' : '无并发场景',
    rejected ? '已拒绝' : '未出现')

  const settled = model.steps.some(s => s.phase === 'settled')
  add('TM_TREE_SETTLED', 'kill 之后先停稳整棵进程树再返回',
    settled === o.treeSettledBeforeReturn,
    o.treeSettledBeforeReturn ? '先停稳再结算' : '不适用（未 kill）',
    settled ? '已停稳' : '进程保持运行')

  return { pass: checks.every(c => c.pass), checks }
}
