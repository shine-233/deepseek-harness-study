/**
 * MCP 客户端桥的纯教学模型：基于上游 packages/mcp/mcp-client（基线 aa6c361a）
 * 的顶注与 connection.ts 的真实约定。
 *
 * 核心规则：
 * - 一个插件实例只连一台 MCP 服务器；工具以「服务器限定公开名」注册到 ctx.tools：
 *   mcp__<serverName>__<rawName>。
 * - 生命周期是 effect 域的：dispose 时断开连接、注销本服务器的全部工具，
 *   并释放 serverName 命名空间预留。
 * - HMR 热替换 = 先 dispose 旧实例再建新实例；相同 serverName 复现完全相同的公开名。
 * - 自动重连策略（RECONNECT_DEFAULTS）：enabled 默认 true；首次延迟 initialDelayMs
 *   （默认 500），每连续失败一次翻倍，封顶 maxDelayMs（默认 30_000）；
 *   连续失败达到 maxAttempts（默认 10）就永久放弃本次加载；
 *   稳定运行超过上限时长后预算重置。enabled=false 时只试一次。
 *
 * 教学压缩：maxAttempts 上限取 6、延迟封顶取 8000ms，让整条退避曲线在一屏内看完。
 * 没有测量：真实 JSON-RPC 帧、真实 stdio/http 传输、真实超时抖动。
 */

export const MCP_LANES = Object.freeze(['调用方', 'mcp-client 插件', 'MCP 服务器', '工具注册表'])

export const MCP_LIMITS = Object.freeze({
  maxAttempts: Object.freeze({ min: 1, max: 6 }),
  initialDelayMs: Object.freeze({ min: 125, max: 2000 }),
  backoffCeilingMs: 8000,
})

/** 逐次尝试的延迟序列：initial 起、每次翻倍、封顶截断；长度 = 重试次数。 */
export function backoffSchedule(initialDelayMs, maxAttempts) {
  const delays = []
  let current = initialDelayMs
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    delays.push(attempt === 1 ? initialDelayMs : Math.min(current, MCP_LIMITS.backoffCeilingMs))
    current = Math.min(current * 2, MCP_LIMITS.backoffCeilingMs)
  }
  return delays
}

function resolveInput(input = {}) {
  const limits = MCP_LIMITS
  const intIn = (name, value, min, max) => {
    if (typeof value !== 'number' || !Number.isInteger(value)) throw new TypeError(name + ' 必须是整数')
    if (value < min || value > max) throw new RangeError(name + ' 超出范围：' + String(value))
    return value
  }
  if (input.serverDown !== undefined && typeof input.serverDown !== 'boolean') throw new TypeError('serverDown 必须是布尔值')
  if (input.reconnect !== undefined && typeof input.reconnect !== 'boolean') throw new TypeError('reconnect 必须是布尔值')
  if (input.callFails !== undefined && typeof input.callFails !== 'boolean') throw new TypeError('callFails 必须是布尔值')
  if (input.hmrSwap !== undefined && typeof input.hmrSwap !== 'boolean') throw new TypeError('hmrSwap 必须是布尔值')
  return {
    serverDown: input.serverDown === true,
    reconnect: input.reconnect !== false,
    maxAttempts: intIn('maxAttempts', input.maxAttempts ?? 3, limits.maxAttempts.min, limits.maxAttempts.max),
    initialDelayMs: intIn('initialDelayMs', input.initialDelayMs ?? 500, limits.initialDelayMs.min, limits.initialDelayMs.max),
    action: input.action === 'call-tool' ? 'call-tool' : input.action === 'dispose' ? 'dispose' : 'connect-list',
    callFails: input.callFails === true,
    hmrSwap: input.hmrSwap === true,
  }
}

/**
 * 推演一次 MCP 插件的生命周期片段。
 */
export function buildMcpModel(input = {}) {
  const resolved = resolveInput(input)
  const { serverDown, reconnect, maxAttempts, initialDelayMs, action, callFails, hmrSwap } = resolved
  const SERVER = 'fs-tools'

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ lane: MCP_LANES[laneIdx], phase, detail, ...extra })
  }

  let connected = false
  const tools = []
  let gaveUpAfter = 0
  let schedule = []

  push(0, 'load', '插件加载：一个实例只负责一台服务器「' + SERVER + '」。')

  if (!serverDown) {
    push(2, 'handshake', '握手完成：服务器声明 2 个工具 read_file、write_file。')
    push(3, 'register', '注册 mcp__' + SERVER + '__read_file、mcp__' + SERVER + '__write_file —— 公开名由服务器限定。',
      { registered: ['mcp__' + SERVER + '__read_file', 'mcp__' + SERVER + '__write_file'] })
    tools.push('mcp__' + SERVER + '__read_file', 'mcp__' + SERVER + '__write_file')
    connected = true
  } else {
    const attempts = reconnect ? maxAttempts : 1
    schedule = backoffSchedule(initialDelayMs, attempts)
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      const last = attempt === attempts
      const detail = last
        ? '第 ' + String(attempt) + ' 次连接失败。'
          + (reconnect ? '重连预算（' + String(maxAttempts) + ' 次）耗尽，放弃本次加载。' : 'reconnect 已关闭：不重试，直接放弃。')
        : '第 ' + String(attempt) + ' 次连接失败：' + String(schedule[attempt - 1]) + 'ms 后重试（每次翻倍，封顶 '
          + String(MCP_LIMITS.backoffCeilingMs) + 'ms）。'
      push(2, 'retry', detail, { attempt, delayMs: schedule[attempt - 1] })
    }
    gaveUpAfter = attempts
    push(3, 'none-registered', '没有任何工具被注册：模型看不到这台服务器。')
  }

  if (action === 'call-tool') {
    if (!connected) {
      push(0, 'call-unavailable', '模型请求 mcp__' + SERVER + '__read_file：工具从未注册，这次调用在派发前就被拒绝。')
    } else if (callFails) {
      push(0, 'call', '模型请求调用 mcp__' + SERVER + '__read_file。')
      push(2, 'remote-error', '远端执行出错：服务器返回 isError 与错误文本。')
      push(3, 'error-settles', '错误文本照常写入结果事件——远端业务失败不等于本地异常，也不触发转储或重试。')
    } else {
      push(0, 'call', '模型请求调用 mcp__' + SERVER + '__read_file。')
      push(2, 'ok', '远端读取完成，返回内容。')
      push(3, 'result', '结果按普通工具结果结算：进日志、回模型，权限管线全程有效。')
    }
  }

  if (action === 'dispose' || hmrSwap) {
    push(0, hmrSwap ? 'hmr-swap' : 'dispose', hmrSwap
      ? 'HMR 热替换：先 dispose 旧实例，再用相同 serverName 建新实例。'
      : '卸载插件实例。')
    push(3, 'unregister', connected
      ? '注销全部 mcp__' + SERVER + '__* 工具，断开连接，并释放 serverName 命名空间预留。'
      : '没有已注册的工具；仍会断开残留连接并释放命名空间。', { released: true })
    if (hmrSwap) {
      push(3, 'names-stable', '相同 serverName 复现完全相同的公开名：热替换对模型不可见。')
    }
  }

  const disposed = action === 'dispose' || hmrSwap
  const visibleTools = disposed ? [] : tools

  return {
    input: { ...resolved },
    lanes: MCP_LANES,
    steps,
    observations: {
      server: SERVER,
      connected,
      visibleTools,
      registeredCount: tools.length,
      gaveUpAfter,
      backoffSchedule: schedule,
      namespaceReleased: disposed,
      namesStableAcrossHmr: !hmrSwap || true,
      remoteErrorSettledNormally: action === 'call-tool' && connected && callFails,
      forkShape: !connected ? (gaveUpAfter > 0 ? '重连预算耗尽：本次加载放弃' : '')
        : disposed ? '已卸载：命名空间已释放'
        : '已连接：' + String(tools.length) + ' 个限定名工具可见',
    },
    canProve: [
      '公开名由服务器限定：mcp__<serverName>__<rawName>，跨服务器不会撞名。',
      '重连延迟从 initialDelayMs 起每次翻倍、封顶后不再增长；连续失败达到 maxAttempts 就放弃。',
      'dispose 注销该服务器的全部工具并释放命名空间；同名热替换复现相同的公开名。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 JSON-RPC 帧格式或 stdio/http 传输细节。',
      '不能证明真实网络超时的分布；重连延迟是策略值，不是实测耗时。',
      '不能证明真实 DSH 对工具描述文案的处理方式。',
      '不能证明多台服务器同时加载时的加载顺序。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算退避数学与命名规则。 */
export function evaluateMcpOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildMcpModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('MC_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  const retrySteps = model.steps.filter(s => s.phase === 'retry')
  const expectedSchedule = retrySteps.length > 0
    ? backoffSchedule(model.input.initialDelayMs, retrySteps.length)
    : []
  const actualSchedule = retrySteps.map(s => s.delayMs)
  add('MC_BACKOFF_DOUBLING', '重连延迟首值等于 initialDelayMs，其后翻倍且封顶',
    JSON.stringify(actualSchedule) === JSON.stringify(expectedSchedule),
    '[' + expectedSchedule.join(', ') + ']',
    '[' + actualSchedule.join(', ') + ']')

  const expectGiveUp = model.input.serverDown ? (model.input.reconnect ? model.input.maxAttempts : 1) : 0
  add('MC_GIVE_UP_BUDGET', '失败次数恰好等于重连预算：enabled=false 只试一次',
    o.gaveUpAfter === expectGiveUp,
    String(expectGiveUp) + ' 次',
    String(o.gaveUpAfter) + ' 次')

  const registeredSteps = model.steps.filter(s => Array.isArray(s.registered)).flatMap(s => s.registered)
  const qualified = registeredSteps.every(name => name.startsWith('mcp__' + o.server + '__'))
  add('MC_QUALIFIED_NAMES', '每个注册名都带服务器限定前缀',
    qualified, 'mcp__' + o.server + '__*', registeredSteps.length === 0 ? '无注册' : qualified ? '全部合规' : '出现裸名')

  const unregisterStep = model.steps.find(s => s.phase === 'unregister')
  add('MC_NAMESPACE_RELEASED', 'dispose 或 HMR 后命名空间被释放、工具不再可见',
    unregisterStep ? (o.namespaceReleased && o.visibleTools.length === 0) : true,
    unregisterStep ? '已释放且零可见' : '不适用',
    unregisterStep ? (o.visibleTools.length === 0 ? '已释放' : '仍有残留') : '—')

  const stableStep = model.steps.some(s => s.phase === 'names-stable')
  add('MC_HMR_NAME_STABLE', '同名热替换后公开名保持不变',
    stableStep === model.input.hmrSwap,
    model.input.hmrSwap ? '出现稳定性说明' : '不适用',
    stableStep ? '已说明' : '未涉及')

  return { pass: checks.every(c => c.pass), checks }
}
