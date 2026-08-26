/**
 * 工具可见性三层集合的纯模型。
 *
 * 课程 22 和 23 要分清三件常被混成一件的事：工具被注册、工具对模型可见、工具被允许
 * 执行。这三者是嵌套关系，不是同义词：
 *
 *   已注册 ⊇ 模型可见 ⊇ 允许执行
 *
 * 每个维度的含义：
 *   容器的嵌套层级 = 工具到达的最内层（这就是数据结构本身，不是装饰）
 *   容器内的分组   = 工具来自哪个 Bundle
 *   计数条的长度   = 该层的工具数
 *   颜色           = 只区分“到达这一层”和“在这一层被挡住”两档，不编码 Bundle
 *
 * 这是教学模型：Bundle 名、工具名和策略都由本模块定义，不是任何真实部署的配置。
 * 模型是纯函数：同样的输入永远给同样的输出，页面只渲染返回值。
 * 教学故障：fault='ghost-allow' 把一个被作用域挡住的工具偷偷放进允许执行集合，
 * 页面读数全部自洽——抓住它的只有嵌套关系本身（ALLOWED_SUBSET_VISIBLE）。
 */

/** 教学用的 Bundle 与工具清单。名字是虚构的，用来演示三层收窄，不是真实注册表。 */
const TOOL_CATALOG = Object.freeze([
  Object.freeze({ name: 'read_file', bundle: 'core-fs', access: 'read', risk: 'low' }),
  Object.freeze({ name: 'search_workspace', bundle: 'core-fs', access: 'read', risk: 'low' }),
  Object.freeze({ name: 'write_file', bundle: 'core-fs', access: 'write', risk: 'high' }),
  Object.freeze({ name: 'delete_path', bundle: 'core-fs', access: 'write', risk: 'high' }),
  Object.freeze({ name: 'run_shell', bundle: 'shell', access: 'execute', risk: 'high' }),
  Object.freeze({ name: 'kill_process', bundle: 'shell', access: 'execute', risk: 'high' }),
  Object.freeze({ name: 'web_search', bundle: 'web', access: 'network', risk: 'medium' }),
  Object.freeze({ name: 'web_fetch', bundle: 'web', access: 'network', risk: 'medium' }),
  Object.freeze({ name: 'session_history', bundle: 'session', access: 'read', risk: 'low' }),
  Object.freeze({ name: 'session_fork', bundle: 'session', access: 'write', risk: 'medium' }),
  Object.freeze({ name: 'todo_write', bundle: 'todo', access: 'write', risk: 'low' }),
  Object.freeze({ name: 'plan_mode', bundle: 'todo', access: 'read', risk: 'low' }),
])

export const TOOL_BUNDLES = Object.freeze([...new Set(TOOL_CATALOG.map(tool => tool.bundle))])

/** agent 作用域：决定哪些已注册工具进入这一轮的模型可见集合。 */
export const AGENT_SCOPES = Object.freeze([
  Object.freeze({
    id: 'reader',
    label: '只读研究 agent',
    description: '只让 read 和 network 工具对模型可见；write 和 execute 即使已注册也不出现在工具清单里。',
    admits: access => access === 'read' || access === 'network',
  }),
  Object.freeze({
    id: 'editor',
    label: '编辑 agent',
    description: 'read、network 和 write 对模型可见；execute 不可见。',
    admits: access => access !== 'execute',
  }),
  Object.freeze({
    id: 'full',
    label: '全部可见',
    description: '所有已注册工具都对模型可见；收窄完全交给执行策略。',
    admits: () => true,
  }),
])

/** 执行策略：决定哪些模型可见工具真的允许执行。 */
export const EXECUTION_POLICIES = Object.freeze([
  Object.freeze({
    id: 'ask-high-risk',
    label: '高风险需批准',
    description: 'low 和 medium 直接允许；high 停在待批准，不进入执行。',
    allows: risk => risk !== 'high',
  }),
  Object.freeze({
    id: 'read-only',
    label: '只允许读',
    description: '只有 read 允许执行；其他一律拒绝，即使模型能看见它们。',
    allows: (risk, access) => access === 'read',
  }),
  Object.freeze({
    id: 'allow-all',
    label: '全部允许',
    description: '模型可见的都允许执行；这一档用来看清“可见”和“允许”本来是两层。',
    allows: () => true,
  }),
])

/** 教学故障注入：把一个被作用域挡住的工具偷偷放进允许集合。none 是唯一默认。 */
export const VISIBILITY_FAULT_TYPES = Object.freeze(['none', 'ghost-allow'])

function resolveInput(input = {}) {
  const bundles = input.bundles ?? [...TOOL_BUNDLES]
  const scope = input.scope ?? 'reader'
  const policy = input.policy ?? 'ask-high-risk'
  if (!Array.isArray(bundles)) throw new TypeError('bundles must be an array')
  for (const bundle of bundles) {
    if (!TOOL_BUNDLES.includes(bundle)) throw new RangeError('unknown bundle: ' + String(bundle))
  }
  if (!AGENT_SCOPES.some(candidate => candidate.id === scope)) {
    throw new RangeError('unknown scope: ' + String(scope))
  }
  if (!EXECUTION_POLICIES.some(candidate => candidate.id === policy)) {
    throw new RangeError('unknown policy: ' + String(policy))
  }
  return { bundles: [...new Set(bundles)].sort(), scope, policy }
}

/*
 * 教学故障注入：挑一个被 agent 作用域挡住的工具，把它的执行放行标记成 true，
 * 并同步修好层级与被挡原因、观测计数——页面看起来完全自洽，唯一的破绽是
 * 嵌套关系本身：一个模型看不见的工具出现在了允许执行集合里。
 */
function applyVisibilityFault(model, fault) {
  if (fault !== 'ghost-allow') return model
  const target = model.tools.find(tool => tool.reachedLevel === 1)
  if (target === undefined) return model
  target.executionAllowed = true
  target.reachedLevel = 3
  target.blockedBy = null
  model.levels[2].members.push(target)
  model.observations.executionAllowed += 1
  model.observations.blockedByScope -= 1
  model.observations.ghostAllowed = target.name
  return model
}

/**
 * 算出三层集合。
 *
 * 每个工具只被判定一次，然后记下它到达的最内层和被挡住的原因；这样表格和图读的是
 * 同一份判定，不会出现图里到达了而表里没到达。
 */
export function buildToolVisibilityModel(input = {}) {
  const resolved = resolveInput(input)
  const faultRaw = input.fault ?? 'none'
  if (!VISIBILITY_FAULT_TYPES.includes(faultRaw)) {
    throw new RangeError('unknown fault: ' + String(faultRaw))
  }
  const scope = AGENT_SCOPES.find(candidate => candidate.id === resolved.scope)
  const policy = EXECUTION_POLICIES.find(candidate => candidate.id === resolved.policy)

  const tools = TOOL_CATALOG.map((tool) => {
    const registered = resolved.bundles.includes(tool.bundle)
    const modelVisible = registered && scope.admits(tool.access)
    const executionAllowed = modelVisible && policy.allows(tool.risk, tool.access)
    const reachedLevel = executionAllowed ? 3 : modelVisible ? 2 : registered ? 1 : 0
    const blockedBy = executionAllowed
      ? null
      : modelVisible
        ? '执行策略：' + policy.label
        : registered
          ? 'agent 作用域：' + scope.label
          : 'Bundle 未加载：' + tool.bundle
    return { ...tool, registered, modelVisible, executionAllowed, reachedLevel, blockedBy }
  })

  const levels = [
    { id: 'registered', label: '已注册', members: tools.filter(tool => tool.registered) },
    { id: 'model-visible', label: '模型可见', members: tools.filter(tool => tool.modelVisible) },
    { id: 'execution-allowed', label: '允许执行', members: tools.filter(tool => tool.executionAllowed) },
  ]

  const model = {
    input: { ...resolved, fault: faultRaw },
    scope: { id: scope.id, label: scope.label, description: scope.description },
    policy: { id: policy.id, label: policy.label, description: policy.description },
    tools,
    levels,
    observations: {
      catalog: tools.length,
      registered: levels[0].members.length,
      modelVisible: levels[1].members.length,
      executionAllowed: levels[2].members.length,
      blockedByBundle: tools.filter(tool => tool.reachedLevel === 0).length,
      blockedByScope: tools.filter(tool => tool.reachedLevel === 1).length,
      blockedByPolicy: tools.filter(tool => tool.reachedLevel === 2).length,
      // 模型看得见却不允许执行的工具：这一格是本页最想让读者注意的地方。
      visibleButNotAllowed: tools
        .filter(tool => tool.modelVisible && !tool.executionAllowed)
        .map(tool => tool.name),
    },
    canProve: [
      '在这个教学模型里，三层是严格嵌套的：允许执行的工具一定模型可见，模型可见的一定已注册。',
      '三层各自被不同的东西收窄：Bundle 决定注册，agent 作用域决定可见，执行策略决定允许。',
      '“模型看得见”和“允许执行”可以不一致：换到全部可见加只允许读，就能造出一批可见但不允许的工具。',
      '收窄只会让集合变小：换作用域或策略都不会让某个工具从不可见变成可见而跳过注册。',
    ],
    cannotProve: [
      '不能证明真实 DSH 部署的 Bundle 名、工具名、风险分级或策略与这里相同。',
      '不能证明真实模型在看到某个工具后会不会调用它；本页只描述它是否出现在清单里。',
      '不能证明审批界面、审批人行为或审批延迟；策略在这里是一个纯函数。',
      '不能用本页替代固定提交的工具契约源码、权限插件实现或真实运行日志。',
    ],
  }
  return applyVisibilityFault(model, faultRaw)
}

/**
 * 独立核对嵌套关系。
 *
 * oracle 不读页面上任何已渲染的内容，只从 tools 数组重算三层集合，检查嵌套、单调、
 * 以及“每个没到达的工具都记了原因”。篡改任一层都会失败。
 */
export function evaluateToolVisibilityOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.tools)) throw new TypeError('model.tools must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const registered = new Set(model.tools.filter(tool => tool.registered).map(tool => tool.name))
  const visible = new Set(model.tools.filter(tool => tool.modelVisible).map(tool => tool.name))
  const allowed = new Set(model.tools.filter(tool => tool.executionAllowed).map(tool => tool.name))

  const visibleOutside = [...visible].filter(name => !registered.has(name))
  add('VISIBLE_SUBSET_REGISTERED', '模型可见的工具都在已注册集合里',
    visibleOutside.length === 0, '0 个越界', visibleOutside.join('、') || '0 个越界')

  const allowedOutside = [...allowed].filter(name => !visible.has(name))
  add('ALLOWED_SUBSET_VISIBLE', '允许执行的工具都在模型可见集合里',
    allowedOutside.length === 0, '0 个越界', allowedOutside.join('、') || '0 个越界')

  add('COUNTS_MONOTONIC', '三层的数量单调不增',
    allowed.size <= visible.size && visible.size <= registered.size,
    'allowed ≤ visible ≤ registered',
    String(allowed.size) + ' ≤ ' + String(visible.size) + ' ≤ ' + String(registered.size))

  const missingReason = model.tools.filter(tool => !tool.executionAllowed && tool.blockedBy === null)
  add('BLOCKED_HAS_REASON', '每个没到达执行的工具都记了被谁挡住',
    missingReason.length === 0, '0 个缺原因',
    missingReason.map(tool => tool.name).join('、') || '0 个缺原因')

  const wrongLevel = model.tools.filter((tool) => {
    const expected = tool.executionAllowed ? 3 : tool.modelVisible ? 2 : tool.registered ? 1 : 0
    return tool.reachedLevel !== expected
  })
  add('LEVEL_MATCHES_FLAGS', '记录的层级与三个布尔标记一致',
    wrongLevel.length === 0, '0 个不一致',
    wrongLevel.map(tool => tool.name).join('、') || '0 个不一致')

  const counted = model.observations
  add('OBSERVATIONS_MATCH', '观测读数与重算的集合一致',
    counted.registered === registered.size
    && counted.modelVisible === visible.size
    && counted.executionAllowed === allowed.size,
    String(registered.size) + '/' + String(visible.size) + '/' + String(allowed.size),
    String(counted.registered) + '/' + String(counted.modelVisible) + '/' + String(counted.executionAllowed))

  const partition = counted.blockedByBundle + counted.blockedByScope + counted.blockedByPolicy + allowed.size
  add('PARTITION_COVERS_CATALOG', '四种去向之和等于清单里的工具总数',
    partition === model.tools.length, String(model.tools.length), String(partition))

  return { pass: checks.every(check => check.pass), checks }
}
