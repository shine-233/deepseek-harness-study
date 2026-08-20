/**
 * 包依赖图的纯模型。
 *
 * 数据来自 study/fixtures/package-graph.json，由 study-tools/generate-package-graph.mjs
 * 从固定上游提交生成。本模块不推导新事实：它只筛选、排序、聚合，并用一个独立的
 * oracle 重新核对 fixture 自己记录的总数。
 *
 * 每个维度的含义（按 widget 运行时契约要求逐个声明）：
 *   散点横轴 = 该包 src/**\/*.ts 的总行数
 *   散点纵轴 = 被同仓库其他包的 peerDependencies 指向的次数（入度）
 *   柱视图柱高 = 同上的行数
 *   柱视图柱宽 = 同上的入度
 *   横向位置 = 组内按行数排序后的次序，只是布局，不承载数值
 *   颜色 = 只区分“被依赖多”与“被依赖少”两档状态，不编码组；49 个组无法用色相安全区分
 * 没有测量：运行时调用次数、打包体积、导入频率、真实启动顺序。
 */

/** 入度达到这个比例即视为枢纽；用于两档状态色和 oracle 的一致性检查。 */
export const HUB_SHARE = 0.1

/** 柱视图能诚实承载的最大节点数；超过就只给散点和表格。 */
export const BAR_VIEW_MAX_NODES = 24

function assertFixture(fixture) {
  if (typeof fixture !== 'object' || fixture === null) throw new TypeError('fixture must be an object')
  for (const key of ['commit', 'nodes', 'edges', 'totals', 'groups']) {
    if (!(key in fixture)) throw new TypeError('fixture is missing ' + key)
  }
  if (!Array.isArray(fixture.nodes) || !Array.isArray(fixture.edges)) {
    throw new TypeError('fixture nodes and edges must be arrays')
  }
}

/**
 * 独立核对：不读页面上任何已渲染的值，只从 nodes 和 edges 重算，再和 fixture
 * 自己记录的 totals 比对。fixture 被改动过就会失败。
 */
export function evaluatePackageGraphOracle(fixture) {
  assertFixture(fixture)
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const ids = new Set(fixture.nodes.map(node => node.id))
  add('PACKAGE_COUNT', '节点数与记录的总数一致',
    fixture.nodes.length === fixture.totals.packages,
    String(fixture.totals.packages), String(fixture.nodes.length))
  add('UNIQUE_IDS', '每个包目录只出现一次',
    ids.size === fixture.nodes.length,
    String(fixture.nodes.length) + ' 个唯一 id', String(ids.size))
  add('EDGE_COUNT', '边数与记录的总数一致',
    fixture.edges.length === fixture.totals.edges,
    String(fixture.totals.edges), String(fixture.edges.length))

  const dangling = fixture.edges.filter(edge => !ids.has(edge.from) || !ids.has(edge.to))
  add('EDGES_RESOLVE', '每条边两端都是图内的包',
    dangling.length === 0, '0 条悬空边', String(dangling.length) + ' 条悬空边')

  const selfLoops = fixture.edges.filter(edge => edge.from === edge.to)
  add('NO_SELF_EDGE', '没有包依赖自己',
    selfLoops.length === 0, '0 条自环', String(selfLoops.length) + ' 条自环')

  const recomputed = new Map()
  for (const edge of fixture.edges) recomputed.set(edge.to, (recomputed.get(edge.to) ?? 0) + 1)
  const wrongDegree = fixture.nodes.filter(node => (recomputed.get(node.id) ?? 0) !== node.dependedOnBy)
  add('IN_DEGREE_MATCHES', '每个包记录的入度等于从边重算的入度',
    wrongDegree.length === 0, '0 个不一致',
    wrongDegree.length === 0 ? '0 个不一致' : wrongDegree.slice(0, 3).map(node => node.id).join('、'))

  const lines = fixture.nodes.reduce((sum, node) => sum + node.srcLines, 0)
  add('LINE_TOTAL_MATCHES', '行数之和与记录的总数一致',
    lines === fixture.totals.srcLines, String(fixture.totals.srcLines), String(lines))

  const groups = new Set(fixture.nodes.map(node => node.group))
  add('GROUP_COUNT', '组数与记录的总数一致',
    groups.size === fixture.totals.groups, String(fixture.totals.groups), String(groups.size))

  return { pass: checks.every(check => check.pass), checks }
}

/**
 * 按组筛选并算出这一次视图的观测值。
 *
 * @param fixture - package-graph.json 的内容。
 * @param options - `group` 为 'all' 或某个组名；`sort` 为 'lines' 或 'degree'。
 */
export function buildPackageGraphModel(fixture, options = {}) {
  assertFixture(fixture)
  const group = options.group ?? 'all'
  const sort = options.sort === 'degree' ? 'degree' : 'lines'
  if (group !== 'all' && !fixture.groups.includes(group)) {
    throw new RangeError('unknown group: ' + String(group))
  }

  const nodes = fixture.nodes
    .filter(node => group === 'all' || node.group === group)
    .map(node => ({ ...node }))
  const visible = new Set(nodes.map(node => node.id))
  const edges = fixture.edges.filter(edge => visible.has(edge.from) && visible.has(edge.to))

  // 组内入度：只数落在当前视图里的边，和全仓库入度分开报，避免把筛选后的数字
  // 说成全仓库结论。
  const withinDegree = new Map()
  for (const edge of edges) withinDegree.set(edge.to, (withinDegree.get(edge.to) ?? 0) + 1)
  for (const node of nodes) node.degreeWithinView = withinDegree.get(node.id) ?? 0

  nodes.sort((left, right) => sort === 'degree'
    ? right.dependedOnBy - left.dependedOnBy || left.id.localeCompare(right.id)
    : right.srcLines - left.srcLines || left.id.localeCompare(right.id))

  const hubThreshold = Math.max(1, Math.round(fixture.totals.packages * HUB_SHARE))
  const lines = nodes.reduce((sum, node) => sum + node.srcLines, 0)
  const leaves = nodes.filter(node => node.dependedOnBy === 0)
  const hubs = nodes.filter(node => node.dependedOnBy >= hubThreshold)

  // 体量与被依赖程度可以完全脱钩，这是本页要让读者看见的关系。取两个极端各一个。
  const biggest = nodes.length === 0 ? null : [...nodes].sort((a, b) => b.srcLines - a.srcLines)[0]
  const mostDepended = nodes.length === 0 ? null : [...nodes].sort((a, b) => b.dependedOnBy - a.dependedOnBy)[0]

  return {
    commit: fixture.commit,
    meaning: fixture.meaning,
    input: { group, sort },
    nodes,
    edges,
    barViewAvailable: nodes.length > 0 && nodes.length <= BAR_VIEW_MAX_NODES,
    observations: {
      packages: nodes.length,
      edgesWithinView: edges.length,
      srcLines: lines,
      srcFiles: nodes.reduce((sum, node) => sum + node.srcFiles, 0),
      hubThreshold,
      hubs: hubs.map(node => node.id),
      leaves: leaves.length,
      biggest: biggest === null ? null : { id: biggest.id, srcLines: biggest.srcLines, dependedOnBy: biggest.dependedOnBy },
      mostDepended: mostDepended === null
        ? null
        : { id: mostDepended.id, srcLines: mostDepended.srcLines, dependedOnBy: mostDepended.dependedOnBy },
    },
    canProve: [
      '在固定提交 ' + fixture.commit.slice(0, 10) + ' 里，每个包的 src 行数、src 文件数和 peerDependencies 都可以按目录复算。',
      '包的体量和被依赖次数可以完全脱钩：最被依赖的包不一定大，最大的包不一定被依赖。',
      '组的大小很不均匀，所以“按组浏览”和“按体量浏览”会给出不同的阅读顺序。',
    ],
    cannotProve: [
      '不能证明运行时真的调用过这些依赖，也不能证明调用频率与边的粗细相关。',
      '不能证明打包体积、启动耗时或内存占用与 src 行数相关。',
      '不能把 peerDependencies 当成完整依赖关系：dependencies、动态 import 和 cordis.yml 装配没有画进来。',
      '不能用本页替代固定提交的源码阅读、测试或真实运行证据。',
    ],
  }
}
