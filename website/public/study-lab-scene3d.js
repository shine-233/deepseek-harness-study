/**
 * 包依赖图的 3D 场景：手写投影，画在 canvas 上，没有第三方依赖。
 *
 * 为什么不用 Three.js：这一幕只需要柱体、线段和标签。Three.js 会带进场景图、材质、
 * 加载器和拾取，95% 用不到，而布局、数据映射、标签和 fallback 仍然要自己写——按仓库
 * 「依赖要真的删掉自有代码才值得引入」的规矩，它在这里不划算。CSP 是 `script-src 'self'`，
 * CDN 也不是选项。
 *
 * 这一幕的目标不是读数值。读数值看二维散点和表格，那两个都在同一页上，而且不需要
 * 先点开。3D 负责的是另一件事：一眼看到 49 个组的相对体量，并且记住这张图。
 * 遮挡和透视让 3D 读不准精确值，所以精确值永远由表格给。
 *
 * 三个维度的含义写在页面上，不写在这里就等于没有：
 *   柱高 = src 行数（对数刻度）
 *   环上角度 = 所属组；内环是行数最多的 12 组，外环是其余 37 组
 *   连线 = peerDependencies，线宽 = 被依赖次数
 */

const TAU = Math.PI * 2
const INNER_RING_GROUPS = 12

/** 透视投影：把世界坐标压到屏幕坐标，同时返回深度用于排序。 */
function project(point, camera, width, height) {
  const cosY = Math.cos(camera.yaw)
  const sinY = Math.sin(camera.yaw)
  const cosP = Math.cos(camera.pitch)
  const sinP = Math.sin(camera.pitch)

  // 绕 Y 轴转再绕 X 轴转，相机固定在 +Z 上看向原点。
  const x1 = point.x * cosY - point.z * sinY
  const z1 = point.x * sinY + point.z * cosY
  const y2 = point.y * cosP - z1 * sinP
  const z2 = point.y * sinP + z1 * cosP

  const depth = z2 + camera.distance
  if (depth <= 0.05) return null
  const scale = (camera.focal * Math.min(width, height)) / depth
  return {
    sx: width / 2 + x1 * scale,
    sy: height / 2 - y2 * scale,
    depth,
    scale,
  }
}

/**
 * 把包按组排成两个同心环。
 *
 * 组内按行数从多到少排，所以同一组里最大的包总在同一个方向上，转动时不会跳位。
 */
export function layoutRings(nodes, groups) {
  const byGroup = new Map()
  for (const node of nodes) {
    if (!byGroup.has(node.group)) byGroup.set(node.group, [])
    byGroup.get(node.group).push(node)
  }
  const ordered = [...byGroup.entries()]
    .map(([group, members]) => ({
      group,
      members: [...members].sort((a, b) => b.srcLines - a.srcLines),
      lines: members.reduce((sum, member) => sum + member.srcLines, 0),
    }))
    .sort((a, b) => b.lines - a.lines)

  const inner = ordered.slice(0, INNER_RING_GROUPS)
  const outer = ordered.slice(INNER_RING_GROUPS)
  const placed = []

  for (const [ringIndex, ring] of [inner, outer].entries()) {
    const radius = ringIndex === 0 ? 1.15 : 2.05
    const slots = ring.reduce((sum, entry) => sum + entry.members.length, 0)
    if (slots === 0) continue
    let slot = 0
    for (const entry of ring) {
      for (const member of entry.members) {
        const angle = (slot / slots) * TAU
        placed.push({
          node: member,
          group: entry.group,
          ring: ringIndex,
          angle,
          x: Math.cos(angle) * radius,
          z: Math.sin(angle) * radius,
        })
        slot += 1
      }
    }
  }
  return { placed, ringGroups: { inner: inner.map(e => e.group), outer: outer.map(e => e.group) } }
}

/** 行数跨 2.4 个数量级，线性刻度会把大多数柱子压成看不见的一层。 */
function heightFor(lines, maxLines) {
  const share = Math.log10(Math.max(1, lines)) / Math.log10(Math.max(10, maxLines))
  return 0.08 + share * 1.25
}

/**
 * 造一个 3D 场景控制器。
 *
 * @param canvas 目标 canvas；不传或拿不到 2d 上下文就返回 null，调用方保持二维视图。
 * @param model 含 nodes、edges 的模型对象。
 * @param options.reducedMotion 为 true 时不自动旋转。
 * @returns 控制器，含 render、setYaw、dispose；canvas 不可用时为 null。
 */
export function createPackageScene(canvas, model, options = {}) {
  if (!(canvas instanceof HTMLCanvasElement)) return null
  const context = canvas.getContext('2d')
  if (context === null) return null

  const { placed, ringGroups } = layoutRings(model.nodes, model.groups ?? [])
  const maxLines = Math.max(...model.nodes.map(node => node.srcLines), 10)
  const positions = new Map(placed.map(entry => [entry.node.id, entry]))
  const maxDegree = Math.max(...model.nodes.map(node => node.dependedOnBy ?? 0), 1)

  const camera = { yaw: 0.6, pitch: 0.42, distance: 5.4, focal: 1.05 }
  let showEdges = false
  let raf = 0
  let spinning = false

  const styles = () => {
    const root = getComputedStyle(canvas)
    return {
      bar: root.getPropertyValue('--brand').trim() || '#3157c8',
      barOuter: root.getPropertyValue('--brand-bright').trim() || '#466fe0',
      edge: root.getPropertyValue('--signal').trim() || '#d46b3e',
      grid: root.getPropertyValue('--line-strong').trim() || 'rgba(60,60,67,0.28)',
      ink: root.getPropertyValue('--ink').trim() || '#1f2228',
    }
  }

  function drawGround(width, height, palette) {
    context.strokeStyle = palette.grid
    context.lineWidth = 1
    for (const radius of [1.15, 2.05]) {
      context.beginPath()
      let started = false
      for (let step = 0; step <= 72; step += 1) {
        const angle = (step / 72) * TAU
        const point = project({ x: Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius },
          camera, width, height)
        if (point === null) { started = false; continue }
        if (started) context.lineTo(point.sx, point.sy)
        else { context.moveTo(point.sx, point.sy); started = true }
      }
      context.stroke()
    }
  }

  function drawEdges(width, height, palette) {
    // 1089 条边一起画是视觉泥浆，所以只画最重的那些，并把条数报给调用方。
    const ranked = [...(model.edges ?? [])]
      .map(edge => ({ edge, weight: positions.has(edge.to) ? (positions.get(edge.to).node.dependedOnBy ?? 0) : 0 }))
      .sort((left, right) => right.weight - left.weight)
      .slice(0, 120)
    context.strokeStyle = palette.edge
    for (const { edge, weight } of ranked) {
      const from = positions.get(edge.from)
      const to = positions.get(edge.to)
      if (from === undefined || to === undefined) continue
      const a = project({ x: from.x, y: heightFor(from.node.srcLines, maxLines) * 0.5, z: from.z }, camera, width, height)
      const b = project({ x: to.x, y: heightFor(to.node.srcLines, maxLines) * 0.5, z: to.z }, camera, width, height)
      if (a === null || b === null) continue
      context.globalAlpha = 0.16 + (weight / maxDegree) * 0.34
      context.lineWidth = 0.6 + (weight / maxDegree) * 2.4
      context.beginPath()
      context.moveTo(a.sx, a.sy)
      context.lineTo(b.sx, b.sy)
      context.stroke()
    }
    context.globalAlpha = 1
    return ranked.length
  }

  function render() {
    const width = canvas.width
    const height = canvas.height
    const palette = styles()
    context.clearRect(0, 0, width, height)
    drawGround(width, height, palette)
    if (showEdges) drawEdges(width, height, palette)

    // 远的先画：canvas 没有深度缓冲，画家算法是唯一的遮挡来源。
    const bars = placed
      .map((entry) => {
        const barHeight = heightFor(entry.node.srcLines, maxLines)
        const base = project({ x: entry.x, y: 0, z: entry.z }, camera, width, height)
        const top = project({ x: entry.x, y: barHeight, z: entry.z }, camera, width, height)
        return base === null || top === null ? null : { entry, base, top }
      })
      .filter(Boolean)
      .sort((left, right) => right.base.depth - left.base.depth)

    for (const bar of bars) {
      const thickness = Math.max(1.5, bar.base.scale * 0.045)
      context.strokeStyle = bar.entry.ring === 0 ? palette.bar : palette.barOuter
      context.globalAlpha = bar.entry.ring === 0 ? 0.95 : 0.66
      context.lineWidth = thickness
      context.lineCap = 'round'
      context.beginPath()
      context.moveTo(bar.base.sx, bar.base.sy)
      context.lineTo(bar.top.sx, bar.top.sy)
      context.stroke()
    }
    context.globalAlpha = 1
    return bars.length
  }

  function resize() {
    const ratio = Math.min(2, window.devicePixelRatio || 1)
    const box = canvas.getBoundingClientRect()
    canvas.width = Math.max(320, Math.round(box.width * ratio))
    canvas.height = Math.max(240, Math.round(box.height * ratio))
    render()
  }

  function step() {
    camera.yaw = (camera.yaw + 0.0035) % TAU
    render()
    if (spinning) raf = requestAnimationFrame(step)
  }

  return {
    render,
    resize,
    layout: { placed, ringGroups, innerRingGroups: INNER_RING_GROUPS },
    get camera() { return { ...camera } },
    setYaw(value) { camera.yaw = value; render() },
    setPitch(value) { camera.pitch = Math.max(0.05, Math.min(1.35, value)); render() },
    nudge(dYaw, dPitch) {
      camera.yaw = (camera.yaw + dYaw + TAU) % TAU
      camera.pitch = Math.max(0.05, Math.min(1.35, camera.pitch + dPitch))
      render()
    },
    setEdges(value) { showEdges = Boolean(value); render() },
    get edgesVisible() { return showEdges },
    /** 自动旋转只在用户没要求减少动态效果时才可用。 */
    startSpin() {
      if (options.reducedMotion === true || spinning) return
      spinning = true
      raf = requestAnimationFrame(step)
    },
    stopSpin() {
      spinning = false
      if (raf !== 0) cancelAnimationFrame(raf)
      raf = 0
    },
    get spinning() { return spinning },
    dispose() { this.stopSpin() },
  }
}
