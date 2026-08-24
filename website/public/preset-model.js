/**
 * Agent 预设（agent-presets）的纯教学模型：基于上游
 * packages/preset/agent-presets/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 核心规则：
 * - 每个预设的 cordis.yml 以「常驻挂载」方式装载一次，而不是每个会话一份：
 *   插件实例、工具注册、prompt 分区、投影单元都只存在一份，
 *   会话维度由插件内部自行区分（这些插件早于预设而写，为共享世界设计）。
 * - agent 通过把作用域键挂到挂载的作用域下来「加入」预设
 *   （bindScopeParent）：挂载的注册对该 agent 的视图可见，
 *   挂载的监听器也能收到该 agent 的事件。
 * - 没有 agent 的宿主读取（冷 transcript 读）按 preset id 解析同一批常驻注册。
 *
 * 教学模型不加载真实 yml：预设内容用给定的能力清单表示。
 */

export const PRESET_LANES = Object.freeze(['Agent', '作用域树', '常驻挂载', '能力视图'])

export const PRESET_CATALOGS = Object.freeze([
  Object.freeze({ id: 'research', label: 'research（检索 + 引用）', tools: ['web_search', 'cite'] }),
  Object.freeze({ id: 'writer', label: 'writer（长文 + 校对）', tools: ['draft', 'proofread'] }),
])

function resolveInput(input = {}) {
  const agents = input.agents ?? 2
  if (typeof agents !== 'number' || !Number.isInteger(agents) || agents < 1 || agents > 3) {
    throw new RangeError('agents 必须是 1..3 的整数')
  }
  if (input.presetId !== undefined && !PRESET_CATALOGS.some(p => p.id === input.presetId)) {
    throw new RangeError('未知预设：' + String(input.presetId))
  }
  if (input.duplicateMount !== undefined && typeof input.duplicateMount !== 'boolean') {
    throw new TypeError('duplicateMount 必须是布尔值')
  }
  return {
    agents,
    presetId: input.presetId ?? 'research',
    duplicateMount: input.duplicateMount === true,
  }
}

/**
 * 推演一次预设挂载与多个 agent 的加入。
 */
export function buildPresetModel(input = {}) {
  const resolved = resolveInput(input)
  const catalog = PRESET_CATALOGS.find(p => p.id === resolved.presetId)

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: PRESET_LANES[laneIdx], phase, detail, ...extra })
  }

  push(1, 'mount-once', '预设 ' + catalog.id + ' 的 cordis.yml 装载为常驻挂载：整个运行时只有这一份。')
  if (resolved.duplicateMount) {
    push(1, 'duplicate-rejected', '再次装载同名预设被拒：一个预设就是一份组合，不是每会话一份副本。')
  }
  for (let i = 1; i <= resolved.agents; i += 1) {
    push(0, 'join', 'agent-' + String(i) + ' 声明使用预设 ' + catalog.id + '。')
    push(1, 'bind-scope', 'agent-' + String(i) + ' 的作用域键挂到挂载的作用域下——加入，而非复制。',
      { agent: 'agent-' + String(i) })
    push(2, 'shared-instance', '同一份插件实例同时服务所有加入者；会话差异由插件内部按键区分。',
      { agent: 'agent-' + String(i) })
    push(3, 'capabilities-visible', 'agent-' + String(i) + ' 的工具视图里出现 '
      + catalog.tools.join('、') + ' —— 来自常驻挂载，不是本地注册。',
      { agent: 'agent-' + String(i), tools: [...catalog.tools] })
  }

  return {
    input: { ...resolved },
    lanes: PRESET_LANES,
    steps,
    observations: {
      presetId: catalog.id,
      presetTools: [...catalog.tools],
      agents: resolved.agents,
      mountCount: resolved.duplicateMount ? '1（第二次被拒）' : '1',
      instanceCopies: 1,
      coldReadResolvesSame: true,
      forkShape: resolved.agents + ' 个 agent 共享 1 份常驻挂载',
    },
    canProve: [
      '预设按名字装载一次；N 个 agent 加入后实例数仍然是 1。',
      '加入通过作用域父子关系实现：挂载的注册可见、监听器可达。',
      '没有 agent 的冷读也按 preset id 解析到同一批注册。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 cordis.yml 的完整语法与校验器行为。',
      '不能证明插件内部会话键的真实格式。',
      '不能证明真实 bindScopeParent 的实现机制。',
      '不能用本页替代多预设并存时的隔离语义。',
    ],
  }
}

/** 独立校验。 */
export function evaluatePresetOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildPresetModel(model.input)
  add('PR_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const mountSteps = model.steps.filter(s => s.phase === 'mount-once').length
  add('PR_MOUNT_ONCE', '预设挂载恰好发生一次',
    mountSteps === 1 && o.mountCount.startsWith('1'),
    '恰好 1 次', String(mountSteps) + ' 次')

  const joins = model.steps.filter(s => s.phase === 'bind-scope').length
  add('PR_JOIN_NOT_COPY', '每个 agent 都是加入而不是复制',
    joins === o.agents,
    String(o.agents) + ' 次加入',
    String(joins) + ' 次')

  const capViews = model.steps.filter(s => Array.isArray(s.tools))
  const allMatch = capViews.every(v => JSON.stringify(v.tools) === JSON.stringify(o.presetTools))
  add('PR_SHARED_CAPABILITIES', '所有加入者看到同一份预设能力清单',
    capViews.length === o.agents && allMatch,
    String(o.agents) + ' × [' + o.presetTools.join(', ') + ']',
    capViews.length + ' 个视图，一致=' + String(allMatch))

  return { pass: checks.every(c => c.pass), checks }
}
