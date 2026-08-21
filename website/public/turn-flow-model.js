/**
 * 一次 Turn 的纯模型。
 *
 * 课程 04 要把一次请求按时间顺序串起来。本模型把一次 Turn 展开成有序步骤，并同时
 * 记两件事：哪些内容进入了模型请求（model-visible），哪些内容写进了 Session 日志
 * （logged）。仓库自己的规则是这两者必须一一对应：
 *
 *   凡是能到达模型请求的输入，都必须能从 Session 日志重建。
 *
 * 所以本页的 oracle 不是检查动画好不好看，而是逐条配对这两个集合。少写一条日志，
 * 配对就断，oracle 就失败——这正是那条规则在实现里被违反时的样子。
 *
 * 每个维度的含义：
 *   横轴 = 步骤序号（离散顺序，不是耗时）
 *   纵轴 = 参与方 lane：用户、上下文装配、模型、工具、Session 日志
 *   连线 = 同一份内容在“进入模型请求”和“写入日志”之间的对应关系
 *   颜色 = 只区分 model-visible、logged-only 和两者兼有三档，不编码参与方
 * 没有测量：真实 token 数、真实耗时、真实模型输出质量。
 */

const LANES = Object.freeze(['user', 'context', 'model', 'tool', 'session'])

export const TURN_LANES = LANES

/** 教学场景：一次带两个工具调用的 Turn，其中一个工具失败并被重试。 */
export const TURN_SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'two-tools',
    label: '两次工具调用，其中一次失败重试',
    description: '模型先读文件，再写摘要；写入第一次失败，重试后成功。',
  }),
  Object.freeze({
    id: 'no-tools',
    label: '不调用工具，直接回答',
    description: '模型只用已装配的上下文回答，Turn 里没有工具阶段。',
  }),
  Object.freeze({
    id: 'denied-tool',
    label: '工具被策略拒绝',
    description: '模型请求写入，策略拒绝；拒绝结果仍然要回到模型和日志。',
  }),
])

function step(index, lane, phase, detail, options = {}) {
  return {
    index,
    lane,
    phase,
    detail,
    // modelVisible 表示这一步的内容出现在某次模型请求里；logged 表示它写进了
    // Session 日志。payloadId 把同一份内容的两次出现绑在一起。
    modelVisible: options.modelVisible === true,
    logged: options.logged === true,
    payloadId: options.payloadId ?? null,
    ...(options.extra ?? {}),
  }
}

function buildSteps(scenario) {
  const steps = []
  let index = 0
  const push = (lane, phase, detail, options) => {
    steps.push(step(index, lane, phase, detail, options))
    index += 1
  }

  push('user', 'user-message', '用户提出任务',
    { modelVisible: true, logged: true, payloadId: 'p-user-message' })
  push('context', 'system-prompt', '装配 system prompt 与工具清单',
    { modelVisible: true, logged: true, payloadId: 'p-system-prompt' })
  push('context', 'history', '取回本 Session 之前的事件投影',
    { modelVisible: true, logged: true, payloadId: 'p-history' })
  push('model', 'request', '第一次模型请求：携带上面三份输入', {})

  if (scenario === 'no-tools') {
    push('model', 'response', '模型直接给出回答', {})
    push('session', 'assistant-message', '回答写入 Session 日志',
      { modelVisible: false, logged: true, payloadId: 'p-answer' })
    push('session', 'turn-end', 'Turn 结束，事件可用于下一轮投影', {})
    return steps
  }

  push('model', 'tool-call', '模型请求调用 read_file', {})
  push('session', 'tool-call-logged', 'read_file 的调用参数写入日志',
    { modelVisible: false, logged: true, payloadId: 'p-call-read' })
  push('tool', 'tool-run', 'read_file 执行并返回内容', {})
  push('session', 'tool-result-logged', 'read_file 的结果写入日志',
    { modelVisible: false, logged: true, payloadId: 'p-result-read' })
  push('model', 'request', '第二次模型请求：把工具结果带回模型',
    { modelVisible: true, logged: false, payloadId: 'p-result-read' })

  if (scenario === 'denied-tool') {
    push('model', 'tool-call', '模型请求调用 write_summary', {})
    push('session', 'tool-call-logged', 'write_summary 的调用参数写入日志',
      { modelVisible: false, logged: true, payloadId: 'p-call-write' })
    push('tool', 'policy-denied', '策略拒绝写入，工具主体没有执行',
      { extra: { denied: true } })
    push('session', 'tool-result-logged', '拒绝结果写入日志',
      { modelVisible: false, logged: true, payloadId: 'p-result-write' })
    push('model', 'request', '第三次模型请求：把拒绝结果带回模型',
      { modelVisible: true, logged: false, payloadId: 'p-result-write' })
  } else {
    push('model', 'tool-call', '模型请求调用 write_summary', {})
    push('session', 'tool-call-logged', 'write_summary 的调用参数写入日志',
      { modelVisible: false, logged: true, payloadId: 'p-call-write' })
    push('tool', 'tool-failed', 'write_summary 第一次失败', { extra: { failed: true } })
    push('session', 'tool-result-logged', '失败结果写入日志',
      { modelVisible: false, logged: true, payloadId: 'p-result-write-1' })
    push('model', 'request', '第三次模型请求：把失败结果带回模型',
      { modelVisible: true, logged: false, payloadId: 'p-result-write-1' })
    push('tool', 'tool-run', 'write_summary 重试并成功', { extra: { retry: true } })
    push('session', 'tool-result-logged', '重试结果写入日志',
      { modelVisible: false, logged: true, payloadId: 'p-result-write-2' })
    push('model', 'request', '第四次模型请求：把重试结果带回模型',
      { modelVisible: true, logged: false, payloadId: 'p-result-write-2' })
  }

  push('model', 'response', '模型给出最终回答', {})
  push('session', 'assistant-message', '回答写入 Session 日志',
    { modelVisible: false, logged: true, payloadId: 'p-answer' })
  push('session', 'turn-end', 'Turn 结束，事件可用于下一轮投影', {})
  return steps
}

function resolveInput(input = {}) {
  const scenario = input.scenario ?? 'two-tools'
  if (!TURN_SCENARIOS.some(candidate => candidate.id === scenario)) {
    throw new RangeError('unknown scenario: ' + String(scenario))
  }
  const upTo = input.upTo ?? Number.POSITIVE_INFINITY
  if (typeof upTo !== 'number' || Number.isNaN(upTo)) {
    throw new TypeError('upTo must be a number')
  }
  return { scenario, upTo }
}

/**
 * 展开一次 Turn。
 *
 * @param input - `scenario` 为 TURN_SCENARIOS 里的 id。
 */
export function buildTurnModel(input = {}) {
  const resolved = resolveInput(input)
  const scenario = TURN_SCENARIOS.find(candidate => candidate.id === resolved.scenario)
  const allSteps = buildSteps(resolved.scenario)

  /*
   * 推进到第 upTo 步为止。
   *
   * 配对只在这个前缀里算。如果拿全部步骤算配对再只显示前缀，推进到一半时会显示
   * 一份内容「已经能从日志重建」，而那条日志事件其实还没发生——那是把结论提前给
   * 出来了，也就毁掉了这一页要教的东西：可重建性是逐步建立的，不是一开始就成立。
   */
  const lastIndex = allSteps.length - 1
  const upTo = Number.isFinite(resolved.upTo)
    ? Math.max(0, Math.min(Math.trunc(resolved.upTo), lastIndex))
    : lastIndex
  const steps = allSteps.filter(entry => entry.index <= upTo)

  const modelVisible = steps.filter(entry => entry.modelVisible && entry.payloadId !== null)
  const logged = steps.filter(entry => entry.logged && entry.payloadId !== null)
  const loggedIds = new Set(logged.map(entry => entry.payloadId))

  // 整个 Turn 里最终会被记录的 payload。用来区分「还没记」和「永远不会记」。
  const loggedEverIds = new Set(
    allSteps.filter(entry => entry.logged && entry.payloadId !== null).map(entry => entry.payloadId),
  )

  /*
   * 一份内容可能同一步既进请求又写日志，也可能先写日志再进请求。配对看的是
   * payloadId 是否在两个集合里都出现过，不看它出现在第几步。
   *
   * `status` 区分三档，因为推进到中途时「日志事件还在后面」和「整个 Turn 都没有
   * 日志事件」不是一回事，前者是正常中间态。不过在当前三个场景里日志总是与请求
   * 同步或早于请求（见 turn-flow.test.mjs 的顺序断言），所以 `pending` 不会出现；
   * 它留在这里是为了让新场景一旦打破这个顺序，页面显示的是「还没记」而不是「违反」。
   */
  const pairs = [...new Set(modelVisible.map(entry => entry.payloadId))].map(payloadId => {
    const reconstructable = loggedIds.has(payloadId)
    return {
      payloadId,
      visibleAt: modelVisible.filter(entry => entry.payloadId === payloadId).map(entry => entry.index),
      loggedAt: logged.filter(entry => entry.payloadId === payloadId).map(entry => entry.index),
      reconstructable,
      status: reconstructable ? 'logged' : loggedEverIds.has(payloadId) ? 'pending' : 'orphan',
    }
  })

  const requests = steps.filter(entry => entry.phase === 'request')

  return {
    input: { scenario: resolved.scenario, upTo },
    scenario: { id: scenario.id, label: scenario.label, description: scenario.description },
    lanes: LANES,
    steps,
    totalSteps: allSteps.length,
    pairs,
    observations: {
      steps: steps.length,
      totalSteps: allSteps.length,
      modelRequests: requests.length,
      toolRuns: steps.filter(entry => entry.phase === 'tool-run').length,
      toolFailures: steps.filter(entry => entry.failed === true).length,
      toolDenials: steps.filter(entry => entry.denied === true).length,
      loggedEvents: logged.length,
      modelVisiblePayloads: pairs.length,
      unreconstructable: pairs.filter(pair => !pair.reconstructable).map(pair => pair.payloadId),
      lastStep: steps.at(-1).phase,
    },
    canProve: [
      '在这个教学模型里，每一份进入模型请求的内容都有对应的 Session 日志事件，所以下一轮投影可以重建它。',
      '一次 Turn 里可以有多次模型请求：每拿到一个工具结果，都要把它带回模型才能继续。',
      '工具失败和策略拒绝都不会跳过日志：它们照样产生结果事件，再回到模型。',
      '“工具主体没有执行”和“这一步没有结果”是两件事：拒绝路径没有 tool-run，但仍有结果事件。',
    ],
    cannotProve: [
      '不能证明真实 DSH 的步骤划分、事件字段或阶段名称与这里相同。',
      '不能证明真实 token 数、真实耗时或模型回答质量；横轴是步骤序号，不是时间。',
      '不能证明真实部署里的重试次数、退避策略或失败原因分布。',
      '不能用本页替代 Session 日志格式的源码、投影实现或真实 Turn 的回放。',
    ],
  }
}

/**
 * 独立核对“进入模型请求的内容都能从日志重建”。
 *
 * oracle 只读 steps 数组，自己重算两个集合再配对；页面渲染的内容一概不读。
 */
export function evaluateTurnOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const ordered = model.steps.every((entry, position) => entry.index === position)
  add('STEPS_ORDERED', '步骤序号连续且从 0 开始',
    ordered, '0..' + String(model.steps.length - 1), ordered ? '连续' : '有跳号或重复')

  const badLane = model.steps.filter(entry => !LANES.includes(entry.lane))
  add('LANES_KNOWN', '每一步都落在已声明的 lane 上',
    badLane.length === 0, '0 个未知 lane',
    badLane.map(entry => entry.lane).join('、') || '0 个未知 lane')

  /*
   * 可重建性从 steps 重算，不读 model.pairs。
   *
   * oracle 的作用是独立核对，所以它不能复用被检查对象已经算好的结论——否则篡改
   * steps 里的一条日志事件时，pairs 仍然是旧的，校验就查不出来。
   *
   * 中途停下时，一份内容进了请求而它的日志事件还在后面，那是正常的中间态；
   * 判断依据是这一份内容在完整 Turn 里到底有没有日志事件，由 pairs 的 status
   * 提供那个「完整 Turn」视角，但它只用来豁免 pending，不用来决定 orphan。
   */
  const loggedIds = new Set(model.steps.filter(entry => entry.logged && entry.payloadId !== null)
    .map(entry => entry.payloadId))
  const visibleIds = [...new Set(model.steps
    .filter(entry => entry.modelVisible && entry.payloadId !== null)
    .map(entry => entry.payloadId))]
  const pendingIds = new Set(model.pairs.filter(pair => pair.status === 'pending').map(pair => pair.payloadId))

  const missing = visibleIds.filter(payloadId => !loggedIds.has(payloadId))
  const orphan = missing.filter(payloadId => !pendingIds.has(payloadId))
  const pending = missing.filter(payloadId => pendingIds.has(payloadId))
  const pendingNote = pending.length === 0 ? '' : '，另有 ' + String(pending.length) + ' 份日志事件还在后面'
  add('MODEL_VISIBLE_IS_LOGGED', '进入模型请求的每一份内容都有日志事件',
    orphan.length === 0, '0 份无法重建',
    (orphan.join('、') || '0 份无法重建') + pendingNote)

  /*
   * 三条与「Turn 走到哪」有关的检查只在相关步骤已经出现时才判定。中途停下时，
   * 「还没发生第一次模型请求」「调用了但结果还没到」「还没出现 turn-end」都是正常的，
   * 判成失败会让读者以为不变量本来就不成立。
   */
  const atEnd = model.observations.steps === model.observations.totalSteps

  const firstRequest = model.steps.findIndex(entry => entry.phase === 'request')
  const inputsBefore = model.steps
    .slice(0, firstRequest === -1 ? 0 : firstRequest)
    .filter(entry => entry.modelVisible).length
  add('INPUTS_PRECEDE_REQUEST', '第一次模型请求之前已经装配好输入',
    firstRequest === -1 || (firstRequest > 0 && inputsBefore > 0),
    firstRequest === -1 ? '第一次请求出现后才判定' : '请求前至少 1 份输入',
    firstRequest === -1
      ? '尚未推进到第一次模型请求'
      : String(inputsBefore) + ' 份输入，请求在第 ' + String(firstRequest) + ' 步')

  const results = model.steps.filter(entry => entry.phase === 'tool-result-logged')
  const calls = model.steps.filter(entry => entry.phase === 'tool-call-logged')
  add('EVERY_CALL_HAS_RESULT', '每次被记录的工具调用都有一个结果事件',
    !atEnd || results.length >= calls.length,
    atEnd ? '结果数 ≥ 调用数' : '推进到末尾后才判定',
    String(results.length) + ' ≥ ' + String(calls.length) + (atEnd ? '' : '（尚未推进到末尾）'))

  const denied = model.steps.filter(entry => entry.denied === true)
  const deniedRan = denied.length > 0 && model.steps.some(entry => entry.phase === 'tool-run'
    && entry.index > denied[0].index && entry.lane === 'tool' && entry.retry !== true)
  add('DENIED_HAS_NO_BODY', '被拒绝的调用没有对应的工具主体执行',
    denied.length === 0 || !deniedRan,
    denied.length === 0 ? '本场景没有拒绝' : '拒绝后无主体',
    denied.length === 0 ? '本场景没有拒绝' : (deniedRan ? '拒绝后仍执行了主体' : '拒绝后无主体'))

  add('TURN_ENDS_LAST', 'Turn 以结束事件收尾',
    !atEnd || model.steps.at(-1)?.phase === 'turn-end',
    atEnd ? 'turn-end' : '推进到末尾后才判定',
    String(model.steps.at(-1)?.phase) + (atEnd ? '' : '（尚未推进到末尾）'))

  const counted = model.observations
  add('OBSERVATIONS_MATCH', '观测读数与重算一致',
    counted.steps === model.steps.length
    && counted.loggedEvents === model.steps.filter(entry => entry.logged && entry.payloadId !== null).length,
    String(model.steps.length) + ' 步',
    String(counted.steps) + ' 步')

  return { pass: checks.every(check => check.pass), checks }
}
