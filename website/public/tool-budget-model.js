/**
 * 工具预算收窄的纯模型。
 *
 * 收窄层级逐层对应第 22、27 课拆开的三层集合与一条呈现线，每层一个真实机制：
 *
 *   ① 已注册         ctx.tools.register()：插件装配把工具登记进运行时注册表
 *   ② restrict 后可见 agent 作用域 restrict()：被排除的工具从该作用域的 get()／
 *                     分发查找与 native schema 组装里一起消失（22 课「当前 agent
 *                     可解析」那一层的判定）
 *   ③ 有原生呈现     presentAs(native)＋最终组装：拿到原生 schema 才随请求发出；
 *                     其余走 Code Mode（run_code＋SDK），仍然可解析、没有删除
 *   ④ 宿主能力放行   文件／网络／子进程策略与沙箱先拒越权类别——可见性管不到这里
 *   ⑤ 审批后可执行   审批策略 ask＝每次调用先问人；never＝不问，按宿主能力直接放行
 *
 * 教学约定：插件名、工具类别和风险分级都由本模块定义，不代表任何真实部署的配置。
 * 把课程语义落成确定性计数用了两条固定规则：原生名额按可解析清单的固定顺序发放；
 * ask 策略下「写文件／网络抓取」停在待批准，「删除路径／跑子进程」由宿主能力直接拒绝。
 * 模型是纯函数：同样的输入永远给同样的输出，页面只渲染返回值。
 */

/** 七种合成工具类别；tier 决定它在第④⑤层会遇到什么。顺序就是跨插件轮转的固定周期。 */
const KIND_CATALOG = Object.freeze([
  Object.freeze({ id: 'read-file', label: '读文件', tier: 'task' }),
  Object.freeze({ id: 'search', label: '搜索', tier: 'task' }),
  Object.freeze({ id: 'write-file', label: '写文件', tier: 'approval' }),
  Object.freeze({ id: 'fetch-web', label: '网络抓取', tier: 'approval' }),
  Object.freeze({ id: 'status', label: '查看状态', tier: 'task' }),
  Object.freeze({ id: 'run-shell', label: '跑子进程', tier: 'capability' }),
  Object.freeze({ id: 'delete-path', label: '删除路径', tier: 'capability' }),
])

/** 任务真正需要的三个能力项：restrict='narrow' 时每类只保留最先出现的那一个。 */
export const TASK_KIND_IDS = Object.freeze(['read-file', 'search', 'status'])

export const RESTRICT_OPTIONS = Object.freeze(['all', 'narrow'])
export const APPROVAL_OPTIONS = Object.freeze(['ask', 'never'])

export const LIMITS = Object.freeze({
  plugins: Object.freeze([2, 12]),
  toolsPerPlugin: Object.freeze([1, 6]),
  nativePresenters: Object.freeze([0, 72]),
})

/** 五层漏斗的静态描述：id、序号、层名与机制短名。渲染层与 oracle 都从这里取名。 */
export const BUDGET_LAYERS = Object.freeze([
  Object.freeze({ id: 'registered', no: '①', title: '已注册', mechanism: 'ctx.tools.register()' }),
  Object.freeze({ id: 'visible', no: '②', title: 'restrict 后模型可见', mechanism: 'agent 作用域 restrict()' }),
  Object.freeze({ id: 'native', no: '③', title: '有原生呈现', mechanism: 'presentAs(native)＋最终组装' }),
  Object.freeze({ id: 'capable', no: '④', title: '宿主能力放行', mechanism: '文件／网络／子进程策略、沙箱' }),
  Object.freeze({ id: 'approved', no: '⑤', title: '审批后可执行', mechanism: '审批策略 ask／never' }),
])

function resolveInput(input = {}) {
  const plugins = input.plugins ?? 6
  const toolsPerPlugin = input.toolsPerPlugin ?? 3
  const restrict = input.restrict ?? 'narrow'
  const nativePresenters = input.nativePresenters ?? 3
  const approval = input.approval ?? 'ask'
  if (!Number.isInteger(plugins) || plugins < LIMITS.plugins[0] || plugins > LIMITS.plugins[1]) {
    throw new RangeError('plugins 超出范围：' + String(plugins))
  }
  if (!Number.isInteger(toolsPerPlugin) || toolsPerPlugin < LIMITS.toolsPerPlugin[0] || toolsPerPlugin > LIMITS.toolsPerPlugin[1]) {
    throw new RangeError('toolsPerPlugin 超出范围：' + String(toolsPerPlugin))
  }
  if (!Number.isInteger(nativePresenters) || nativePresenters < LIMITS.nativePresenters[0] || nativePresenters > LIMITS.nativePresenters[1]) {
    throw new RangeError('nativePresenters 超出范围：' + String(nativePresenters))
  }
  if (!RESTRICT_OPTIONS.includes(restrict)) throw new RangeError('未知 restrict：' + String(restrict))
  if (!APPROVAL_OPTIONS.includes(approval)) throw new RangeError('未知 approval：' + String(approval))
  return { plugins, toolsPerPlugin, restrict, nativePresenters, approval }
}

function buildTools(resolved) {
  const letters = 'abcdefghijkl'
  const tools = []
  for (let p = 0; p < resolved.plugins; p += 1) {
    const plugin = 'plugin-' + letters[p]
    for (let t = 0; t < resolved.toolsPerPlugin; t += 1) {
      const kind = KIND_CATALOG[(p * resolved.toolsPerPlugin + t) % KIND_CATALOG.length]
      tools.push({ name: plugin + '/' + kind.id, plugin, kindId: kind.id, kindLabel: kind.label, tier: kind.tier })
    }
  }
  return tools
}

function judge(tools, resolved) {
  // ② restrict：narrow 时每个任务类别只保留扫描到的第一个；all 时全部通过。
  const keptByRestrict = new Set()
  if (resolved.restrict === 'narrow') {
    for (const kindId of TASK_KIND_IDS) {
      const first = tools.find(tool => tool.kindId === kindId)
      if (first !== undefined) keptByRestrict.add(first.name)
    }
  }

  // ③ 原生呈现名额：按可解析清单的固定顺序发给前 N 个，其余改走 Code Mode。
  const visibleList = tools.filter(tool => resolved.restrict === 'all' || keptByRestrict.has(tool.name))
  const nativeNames = new Set(visibleList.slice(0, resolved.nativePresenters).map(tool => tool.name))

  for (const tool of tools) {
    const visible = resolved.restrict === 'all' || keptByRestrict.has(tool.name)
    const native = visible && nativeNames.has(tool.name)
    const capable = native && tool.tier !== 'capability'
    const approved = capable && (resolved.approval === 'never' || tool.tier !== 'approval')
    if (!visible) {
      tool.stopLayer = 2
      tool.stopLabel = '② 作用域 restrict'
      tool.reason = 'agent 作用域 restrict() 把它排除：本作用域的 get()／分发当它是未知工具，native 组装同样不含它'
    } else if (!native) {
      tool.stopLayer = 3
      tool.stopLabel = '③ 呈现层（转 Code Mode）'
      tool.reason = '没拿到原生呈现名额：改走 Code Mode（run_code＋SDK），仍然可解析、没有删除'
    } else if (!capable) {
      tool.stopLayer = 4
      tool.stopLabel = '④ 宿主能力'
      tool.reason = tool.kindId === 'delete-path'
        ? '宿主能力拒绝：删除路径超出本 Profile 的文件策略'
        : '宿主能力拒绝：子进程不在本 Profile 的能力清单里'
    } else if (!approved) {
      tool.stopLayer = 5
      tool.stopLabel = '⑤ 审批'
      tool.reason = tool.kindId === 'write-file'
        ? '审批策略为 ask：写文件要先过人工批准，本轮停在待批准'
        : '审批策略为 ask：网络访问要先过人工批准，本轮停在待批准'
    } else {
      tool.stopLayer = null
      tool.stopLabel = '全链路放行'
      tool.reason = '通过全部五层：可见、有原生 schema、宿主能力允许、审批放行'
    }
    tool.visible = visible
    tool.native = native
    tool.capable = capable
    tool.approved = approved
  }
}

function countLayer(tools, flag) {
  return tools.filter(tool => tool[flag]).length
}

/**
 * 算出五层漏斗。
 *
 * 每个工具只被判定一次，记下它止步的层级和原因；图、读数和表格读的是同一份判定，
 * 不会出现图里到达了而表里没到达。层级含义见文件头注释。
 */
export function buildToolBudgetModel(input = {}) {
  const resolved = resolveInput(input)
  const tools = buildTools(resolved)
  judge(tools, resolved)

  const counts = {
    registered: tools.length,
    visible: countLayer(tools, 'visible'),
    native: countLayer(tools, 'native'),
    capable: countLayer(tools, 'capable'),
    approved: countLayer(tools, 'approved'),
  }
  const blocked = {
    restrict: counts.registered - counts.visible,
    presentation: counts.visible - counts.native,
    capability: counts.native - counts.capable,
    approval: counts.capable - counts.approved,
  }

  return {
    input: resolved,
    tools,
    layers: BUDGET_LAYERS.map(layer => ({ ...layer, count: counts[layer.id] })),
    counts,
    blocked,
    observations: {
      registered: counts.registered,
      visible: counts.visible,
      native: counts.native,
      capable: counts.capable,
      approved: counts.approved,
      blocked,
    },
    canProve: Object.freeze([
      '五层计数全部从输入算出：注册数＝插件数×每插件工具数，往后逐层只减不增。',
      '挡下名单可以逐工具点名：谁被 restrict 排除、谁没拿到原生名额、谁停在宿主能力或审批，表格一行一个。',
      '「已注册但模型看不见」和「看得见但执行不了」是两笔账：把 restrict 放开、审批收紧，两个数字当场分离。',
      'restrict=narrow 时可见集至多 3 个：任务三类别各留最先出现的一个，这是预算收窄后的形状。',
    ]),
    cannotProve: Object.freeze([
      '真实 token 数、缓存命中或延迟变化——那要靠第 23 课在固定 provider 上做 A/B 实测。',
      '模型看到 schema 之后会不会调用、调得对不对；教学模型里没有模型行为。',
      '你的部署里哪类工具越权、哪类要审批：风险分级是本组件的教学设定，拿不到任何真实 Profile 的背书。',
    ]),
  }
}

/**
 * 独立核对五层账目。
 *
 * oracle 不读页面已渲染的内容，只从 tools 数组和输入重算：嵌套单调、每层差值等于
 * 止步在该层的工具数、原生名额守恒、narrow 形状、同输入重建一致、读数对账。
 * 篡改任何一层都会失败。
 */
export function evaluateToolBudgetOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.tools)) throw new TypeError('model.tools must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const byLayer = stop => model.tools.filter(tool => tool.stopLayer === stop).length
  const passedBeyond = boundary => model.tools.filter(tool => tool.stopLayer === null || tool.stopLayer > boundary).length

  add('REGISTERED_IS_PRODUCT', '注册数等于插件数×每插件工具数',
    model.counts.registered === model.input.plugins * model.input.toolsPerPlugin,
    `${model.input.plugins}×${model.input.toolsPerPlugin}=${model.input.plugins * model.input.toolsPerPlugin}`,
    String(model.counts.registered))

  const visible = passedBeyond(2)
  const native = passedBeyond(3)
  const capable = passedBeyond(4)
  const approved = passedBeyond(5)
  add('NESTING_MONOTONIC', '五层数量单调不增',
    approved <= capable && capable <= native && native <= visible && visible <= model.counts.registered,
    'approved ≤ capable ≤ native ≤ visible ≤ registered',
    `${approved} ≤ ${capable} ≤ ${native} ≤ ${visible} ≤ ${model.counts.registered}`)

  const partition = {
    restrict: model.counts.registered - visible,
    presentation: visible - native,
    capability: native - capable,
    approval: capable - approved,
  }
  const partitionOk = byLayer(2) === partition.restrict
    && byLayer(3) === partition.presentation
    && byLayer(4) === partition.capability
    && byLayer(5) === partition.approval
  add('LAYER_DIFF_EQUALS_BLOCKED', '守恒校验：每层差值＝止步在该层的工具数',
    partitionOk,
    `2层:${partition.restrict} 3层:${partition.presentation} 4层:${partition.capability} 5层:${partition.approval}`,
    `2层:${byLayer(2)} 3层:${byLayer(3)} 4层:${byLayer(4)} 5层:${byLayer(5)}`)

  add('NATIVE_SLOTS_CONSERVED', '原生名额守恒：呈现数＝min(可见数, 名额)',
    model.counts.native === Math.min(visible, model.input.nativePresenters),
    `min(${visible}, ${model.input.nativePresenters})`,
    String(model.counts.native))

  if (model.input.restrict === 'narrow') {
    const visibleKinds = model.tools.filter(tool => tool.visible).map(tool => tool.kindId)
    const shapeOk = visibleKinds.length <= TASK_KIND_IDS.length
      && visibleKinds.every(kindId => TASK_KIND_IDS.includes(kindId))
      && new Set(visibleKinds).size === visibleKinds.length
    add('NARROW_KEEP_TASK_TRIO', 'narrow 形状：任务三类别各至多 1 个',
      shapeOk, `⊆ [${TASK_KIND_IDS.join('、')}] 且不重复`,
      `[${visibleKinds.join('、') || '空'}]`)
  } else {
    add('ALL_SCOPE_PASSES_EVERYTHING', 'all 作用域下可见集等于注册全集',
      visible === model.counts.registered,
      String(model.counts.registered), String(visible))
  }

  const rebuilt = buildToolBudgetModel(model.input)
  add('REBUILD_DETERMINISTIC', '同一输入重建同一份判定',
    JSON.stringify(rebuilt.tools) === JSON.stringify(model.tools),
    '两次一致', JSON.stringify(rebuilt.tools) === JSON.stringify(model.tools) ? '一致' : '不一致')

  add('OBSERVATIONS_MATCH', '观测读数与重算的五层计数一致',
    model.counts.registered === rebuilt.counts.registered
    && model.counts.visible === visible
    && model.counts.native === native
    && model.counts.capable === capable
    && model.counts.approved === approved,
    `${visible}/${native}/${capable}/${approved}`,
    `${model.counts.visible}/${model.counts.native}/${model.counts.capable}/${model.counts.approved}`)

  return { pass: checks.every(check => check.pass), checks }
}
