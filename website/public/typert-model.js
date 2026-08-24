/**
 * Typert 三件套的纯教学模型：基于上游 packages/typert（基线 aa6c361a）
 * 的 generator/src/model.ts、registry/src/service.ts 与 loader/src/index.ts。
 *
 * 面板一「类型图」（generator）：analyzer 从 TS 源抽出编译器无关的模型——
 * 每个 face 一张 TypeGraph（declarations + nodes），节点带图局部 id，
 * childTypeNodeIds 给出直接子边；renderer/emitter 只消费这张图。
 *
 * 面板二「注册表」（registry）：两阶段提交。prepare 先校验端点与
 * invocation id 的唯一性，任何冲突在变更前抛错（零残留）；commit 把
 * descriptor 绑到 owner；withdraw 只移除该 owner 自己的条目并释放
 * 端点与 id，随后发 changes 事件。
 *
 * Loader 集成（本页不展开）：挂载的插件包导出 ./typert 时自动注册
 * host face 清单，卸载时撤销；按 entry 名增量扫描，判定结果缓存到重启。
 */

export const TYPERT_LANES = Object.freeze(['贡献方', '注册表', '变更流'])
export const TYPERT_FACES = Object.freeze(['host', 'client'])

/* ------------------------------------------------------------------ */
/* 面板一：类型图构建与渲染                                             */
/* ------------------------------------------------------------------ */

export const GRAPH_SHAPES = Object.freeze(['flat', 'nested', 'with-ref'])

function resolveGraphInput(input = {}) {
  if (!GRAPH_SHAPES.includes(input.shape)) throw new RangeError('未知图形态：' + String(input.shape))
  const face = input.face ?? 'host'
  if (!TYPERT_FACES.includes(face)) throw new RangeError('未知 face：' + String(face))
  return { shape: input.shape, face }
}

/**
 * 构建一张小型 TypeGraph：
 * - flat：对象根 + 两个关键字子节点
 * - nested：对象根 + 嵌套对象 + 两个孙节点
 * - with-ref：根含一个引用节点，指向共享声明
 *
 * 节点 id 由「形态前缀 + 局部序号」确定性派生，不使用跨调用共享的计数器——
 * 否则两次相同输入会因调用顺序得到不同 id，确定性承诺就是空话。
 */
export function buildTypertGraphModel(input = {}) {
  const resolved = resolveGraphInput(input)
  const { shape, face } = resolved

  const nodes = []
  let seq = 0
  const nextNodeId = prefix => `${prefix}-node-${String(++seq).padStart(3, '0')}`
  const addNode = node => {
    nodes.push(node)
    return node.id
  }
  const obj = (id, label, children) => ({ id, kind: 'object', label, children })
  const kw = (id, name) => ({ id, kind: 'keyword', name })
  const ref = (id, declarationId) => ({ id, kind: 'ref', declarationId })

  let rootId
  if (shape === 'flat') {
    const a = addNode(kw(nextNodeId('kw'), 'string'))
    const b = addNode(kw(nextNodeId('kw'), 'number'))
    rootId = addNode(obj(nextNodeId('obj'), 'Config', [a, b]))
  } else if (shape === 'nested') {
    const g1 = addNode(kw(nextNodeId('kw'), 'string'))
    const g2 = addNode(kw(nextNodeId('kw'), 'boolean'))
    const inner = addNode(obj(nextNodeId('obj'), 'Inner', [g1, g2]))
    rootId = addNode(obj(nextNodeId('obj'), 'Outer', [inner]))
  } else {
    const declId = 'decl-shared-token'
    const r = addNode(ref(nextNodeId('ref'), declId))
    rootId = addNode(obj(nextNodeId('obj'), 'Session', [r]))
  }

  // 直接子边由每个节点的 children 显式给出；渲染按深度优先展开，
  // 父节点在全部子节点之后完成——所以整段文本是最后一个元素。
  const byId = new Map(nodes.map(node => [node.id, node]))
  const rendered = []
  const walk = id => {
    const node = byId.get(id)
    if (node.kind === 'keyword') rendered.push(`${node.label ?? node.name}`)
    else if (node.kind === 'ref') rendered.push(`→ ${node.declarationId}`)
    else {
      const inner = node.children.map(childId => walk(childId)).join(', ')
      rendered.push('{ ' + inner + ' }')
    }
    return node.label ?? node.name ?? node.declarationId
  }
  walk(rootId)

  return {
    input: { ...resolved },
    face,
    rootId,
    nodes,
    renderedText: rendered.at(-1),
    observations: {
      face,
      shape,
      nodeCount: nodes.length,
      edgeCount: nodes.reduce((sum, n) => sum + (n.children?.length ?? 0), 0),
      maxDepth: graphDepth(nodes, rootId),
      forkShape: shape,
    },
    canProve: [
      '图局部 id 的子边只指向同图内已存在的节点。',
      '嵌套与引用都能用同一套节点种类表达；渲染顺序确定。',
      'face 只影响产物去向（host/client 聚合），不影响图结构。',
      '同一输入重建出完全相同的图（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 TypeScript checker 对复杂类型的解析结果。',
      '不能证明真实 JSDoc 抽取或 SourceLocation 的列号。',
      '不能证明真实 emitter 的产物字节布局。',
      '不能用本页替代 workspace 级增量分析调度。',
    ],
  }
}

function graphDepth(nodes, rootId) {
  const byId = new Map(nodes.map(n => [n.id, n]))
  const depth = id => {
    const node = byId.get(id)
    if (!node?.children?.length) return 1
    return 1 + Math.max(...node.children.map(depth))
  }
  return depth(rootId)
}

/** 独立校验：边完整性、无环、确定性。 */
export function evaluateTypertGraphOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.nodes)) throw new TypeError('model.nodes must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildTypertGraphModel(model.input)
  add('TG_DETERMINISTIC', '同一输入重建出完全相同的图',
    JSON.stringify(rebuilt.nodes) === JSON.stringify(model.nodes),
    '两次构建完全一致',
    JSON.stringify(rebuilt.nodes) === JSON.stringify(model.nodes) ? '一致' : '不一致')

  const ids = new Set(model.nodes.map(n => n.id))
  const dangling = model.nodes
    .flatMap(n => n.children ?? [])
    .filter(childId => !ids.has(childId))
  add('TG_EDGES_RESOLVE', '每条子边都指向图内已存在的节点',
    dangling.length === 0, '0 条悬空边', String(dangling.length) + ' 条悬空边')

  // 无环判定用三色 DFS：inPath 上的重复访问才是环；
  // 已完成的节点再次遇到只是共享子结构（DAG），不是环。
  const byId = new Map(model.nodes.map(n => [n.id, n]))
  const inPath = new Set()
  const finished = new Set()
  let cyclic = false
  const dfs = id => {
    if (finished.has(id)) return
    if (inPath.has(id)) { cyclic = true; return }
    inPath.add(id)
    for (const child of byId.get(id)?.children ?? []) dfs(child)
    inPath.delete(id)
    finished.add(id)
  }
  for (const node of model.nodes) if (!finished.has(node.id)) dfs(node.id)
  add('TG_ACYCLIC', '图结构无环', !cyclic, '无环', cyclic ? '发现环' : '无环')

  return { pass: checks.every(c => c.pass), checks }
}

/* ------------------------------------------------------------------ */
/* 面板二：注册表两阶段提交                                             */
/* ------------------------------------------------------------------ */

export const REGISTRY_SCENARIOS = Object.freeze(['clean', 'endpoint-dup', 'id-dup'])

function resolveRegistryInput(input = {}) {
  const scenario = input.scenario ?? 'clean'
  if (!REGISTRY_SCENARIOS.includes(scenario)) {
    throw new RangeError('未知注册场景：' + String(scenario))
  }
  if (input.withdrawOwner !== undefined && typeof input.withdrawOwner !== 'boolean') {
    throw new TypeError('withdrawOwner 必须是布尔值')
  }
  return {
    scenario,
    withdrawOwner: input.withdrawOwner === true,
  }
}

/**
 * 推演两个贡献方的注册、冲突与撤销。
 * 每个贡献方一条 invocation：owner-a 的端点固定 ep-a/id-a；
 * owner-b 在 clean 时用 ep-b/id-b，在冲突场景复用 a 的端点或 id。
 */
export function buildTypertRegistryModel(input = {}) {
  const resolved = resolveRegistryInput(input)
  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: TYPERT_LANES[laneIdx], phase, detail, ...extra })
  }

  const entries = []
  const changes = []
  const tryRegister = (owner, endpoint, id) => {
    push(0, 'register', `${owner} 请求注册 ${endpoint}（invocation id ${id}）。`, { owner, endpoint, id })
    const dupEndpoint = entries.some(entry => entry.endpoint === endpoint)
    const dupId = entries.some(entry => entry.id === id)
    if (dupEndpoint || dupId) {
      push(1, 'prepare-rejected', dupEndpoint
        ? `prepare 发现端点冲突：${endpoint} 已被占用——变更前整体抛错，零残留。`
        : `prepare 发现 invocation id 冲突：${id} 已被占用——变更前整体抛错，零残留。`)
      push(2, 'no-change', '注册表条目数不变；changes 流保持安静。')
      return false
    }
    entries.push({ owner, endpoint, id })
    push(2, 'committed', `commit：${endpoint} 绑定到 ${owner}。`, { committed: true })
    return true
  }

  tryRegister('owner-a', 'ep-a', 'id-a')
  const bEndpoint = resolved.scenario === 'endpoint-dup' ? 'ep-a' : 'ep-b'
  const bId = resolved.scenario === 'id-dup' ? 'id-a' : 'id-b'
  const bOk = tryRegister('owner-b', bEndpoint, bId)

  if (resolved.withdrawOwner) {
    push(0, 'withdraw', 'owner-a 触发 effect 清理：撤销自己的注册。')
    const before = entries.length
    for (const entry of [...entries]) {
      if (entry.owner !== 'owner-a') continue
      entries.splice(entries.indexOf(entry), 1)
      changes.push({ removed: entry.endpoint })
    }
    push(2, 'withdrawn', `撤销 ${before - entries.length} 条；owner-b 的注册不受影响。`,
      { remaining: entries.length })
  }

  return {
    input: { ...resolved },
    lanes: TYPERT_LANES,
    steps,
    observations: {
      bRegistered: bOk,
      entryCount: entries.length,
      changeEvents: changes.length,
      remainingEndpoints: entries.map(e => e.endpoint),
      zeroResidueOnConflict: resolved.scenario !== 'clean' ? !bOk && entries.every(e => e.owner === 'owner-a') : true,
      forkShape: resolved.scenario === 'clean' ? '双方各占一个端点'
        : resolved.scenario === 'endpoint-dup' ? '端点冲突：后来者零残留失败'
        : 'id 冲突：跨端点也不允许重号',
    },
    canProve: [
      'prepare 先全量校验端点与 invocation id，任何冲突在变更前抛错（零残留）。',
      'withdraw 只移除该 owner 自己的条目，同时释放端点与 id 并发 changes 事件。',
      '端点唯一性跨 invocation id 生效：不同端点也不允许重号。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 zod schema 的 wire 格式细节。',
      '不能证明真实 TypertRemoteService 的远程调用行为。',
      '不能证明 loader 增量扫描的微任务时序。',
      '不能用本页替代 typertEndpoint 的真实键格式。',
    ],
  }
}

/** 独立校验。 */
export function evaluateTypertRegistryOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildTypertRegistryModel(model.input)
  add('TR_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const conflicts = ['endpoint-dup', 'id-dup']
  const expectZero = conflicts.includes(model.input.scenario)
  add('TR_ZERO_RESIDUE', '冲突注册零残留：先到的条目毫发无损',
    !expectZero || (o.zeroResidueOnConflict && o.remainingEndpoints.includes('ep-a')),
    expectZero ? '仅 owner-a 存活' : '不适用',
    '[' + o.remainingEndpoints.join(', ') + ']')

  const withdrawn = model.steps.some(s => s.phase === 'withdrawn')
  add('TR_WITHDRAW_OWN_ONLY', '撤销只影响自己的条目',
    !model.input.withdrawOwner || (withdrawn && (model.input.scenario === 'clean'
      ? o.remainingEndpoints.includes('ep-b')
      : true)),
    model.input.withdrawOwner ? 'owner-a 消失、其余保留' : '不适用',
    '[' + o.remainingEndpoints.join(', ') + ']')

  return { pass: checks.every(c => c.pass), checks }
}
