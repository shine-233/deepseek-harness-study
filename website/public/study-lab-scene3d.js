/**
 * 包依赖图的 3D 场景：手写投影，画在 canvas 上，没有第三方依赖。
 *
 * 为什么不用 Three.js：这一幕只需要柱体、线段和标签。Three.js 会带进场景图、材质、
 * 加载器和拾取，95% 用不到，而布局、数据映射、标签和 fallback 仍然要自己写——按仓库
 * 「依赖要真的删掉自有代码才值得引入」的规矩，它在这里不划算。CSP 是 `script-src 'self'`，
 * CDN 也不是选项。
 *
 * 这一幕的目标不是读数值。读数值看二维散点和表格，那两个都在同一页上，而且不需要
 * 先点开。3D 负责的是另一件事：一眼看到 50 个组的相对体量，并且记住这张图。
 * 遮挡和透视让 3D 读不准精确值，所以精确值永远由表格给。
 *
 * 三个维度的含义写在页面上，不写在这里就等于没有：
 *   柱高 = src 行数（对数刻度）
 *   环上角度 = 所属组；内环是行数最多的 12 组，外环是其余 37 组
 *   连线 = peerDependencies，线宽 = 被依赖次数
 */

const TAU = Math.PI * 2
const INNER_RING_GROUPS = 12
/** 角速度低于该值（弧度/帧）视为滑行结束。 */
const INERTIA_STOP = 1e-4
/** 每帧（16.7ms）保留的速度比例；越接近 1 滑得越远。 */
const INERTIA_DECAY_DEFAULT = 0.9

const inertiaDecayPerFrame = value => typeof value === 'number' && value > 0 && value < 1
  ? value
  : INERTIA_DECAY_DEFAULT

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
 * @param options.inertiaDecay 惯性滑行每帧（16.7ms）保留的速度比例，0-1 开区间；越大滑得越远。
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
  const HOME_VIEW = { yaw: 0.6, pitch: 0.42, distance: 5.4 }
  let showEdges = false
  let raf = 0
  let spinning = false
  let cssRatio = 1
  let focusedGroup = null
  let resumeSpinOnFocusEnd = false
  let focusRaf = 0
  const flowParticles = []
  let flowRaf = 0
  let lastFrameTime = 0
  // 惯性滑行（tldraw/excalidraw 手感）：拖放后的速度按帧衰减，直到低于阈值。
  // 衰减比例走 options.inertiaDecay，调用方按场景内容密度调手感。
  let inertiaRaf = 0
  let inertiaLast = 0
  let inertiaVYaw = 0
  let inertiaVPitch = 0
  const decayPerFrame = inertiaDecayPerFrame(options.inertiaDecay)
  // 离屏挂起：场景滚出视口时停掉自转与惯性，回到视口再恢复自转。
  let sceneVisible = true
  let suspendSpinOnHide = false
  let inertiaSuspended = false
  let visibilityObserver = null

  function stopInertia() {
    if (inertiaRaf !== 0) cancelAnimationFrame(inertiaRaf)
    inertiaRaf = 0
    inertiaLast = 0
    inertiaVYaw = 0
    inertiaVPitch = 0
    inertiaSuspended = false
    syncFlowLoop()
  }

  /**
   * 流粒子循环的单一仲裁点：只在「边开着、允许动效、场景可见、且没有别的
   * 帧驱动源（自转/惯性/聚焦动画）」时才自己跑帧；任何状态变化后调一次即可。
   */
  function syncFlowLoop() {
    const need = showEdges && options.reducedMotion !== true && sceneVisible
      && !spinning && inertiaRaf === 0 && focusRaf === 0
    if (need && flowRaf === 0) {
      lastFrameTime = 0
      flowRaf = requestAnimationFrame(flowTick)
    } else if (!need && flowRaf !== 0) {
      cancelAnimationFrame(flowRaf)
      flowRaf = 0
      lastFrameTime = 0
    }
  }

  function flowTick() {
    if (!showEdges || spinning || inertiaRaf !== 0 || focusRaf !== 0 || !sceneVisible) {
      flowRaf = 0
      lastFrameTime = 0
      return
    }
    render()
    flowRaf = requestAnimationFrame(flowTick)
  }

  /** fling 与离屏恢复共用的滑行帧：推进、衰减、渲染、停判全在这一处。 */
  function runInertiaTick(now) {
    if (!sceneVisible) { inertiaSuspended = true; inertiaRaf = 0; return }
    if (inertiaLast === 0) inertiaLast = now
    const dt = Math.min(64, now - inertiaLast)
    inertiaLast = now
    syncFlowLoop()
    camera.yaw = (camera.yaw + inertiaVYaw * dt / 16.7 + TAU) % TAU
    camera.pitch = Math.max(0.05, Math.min(1.35, camera.pitch + inertiaVPitch * dt / 16.7))
    const decay = Math.pow(decayPerFrame, dt / 16.7)
    inertiaVYaw *= decay
    inertiaVPitch *= decay
    render()
    if (Math.abs(inertiaVYaw) < INERTIA_STOP && Math.abs(inertiaVPitch) < INERTIA_STOP) { stopInertia(); return }
    inertiaRaf = requestAnimationFrame(runInertiaTick)
  }

  function fling(vYaw, vPitch) {
    if (options.reducedMotion === true || !sceneVisible) return
    stopInertia()
    inertiaVYaw = vYaw
    inertiaVPitch = vPitch
    if (Math.abs(inertiaVYaw) < INERTIA_STOP && Math.abs(inertiaVPitch) < INERTIA_STOP) return
    inertiaLast = 0
    inertiaRaf = requestAnimationFrame(runInertiaTick)
  }

  if (typeof IntersectionObserver === 'function') {
    visibilityObserver = new IntersectionObserver((entries) => {
      sceneVisible = entries.some(entry => entry.isIntersecting)
      if (!sceneVisible) {
        if (spinning) { spinning = false; cancelAnimationFrame(raf); raf = 0; suspendSpinOnHide = true }
        syncFlowLoop()
        if (inertiaRaf !== 0) { cancelAnimationFrame(inertiaRaf); inertiaRaf = 0; inertiaSuspended = true }
        return
      }
      syncFlowLoop()
      if (suspendSpinOnHide && !spinning && focusedGroup === null) {
        suspendSpinOnHide = false
        spinning = true
        raf = requestAnimationFrame(step)
      }
      if (inertiaSuspended) {
        inertiaSuspended = false
        if (Math.abs(inertiaVYaw) >= INERTIA_STOP || Math.abs(inertiaVPitch) >= INERTIA_STOP) {
          inertiaLast = 0
          inertiaRaf = requestAnimationFrame(runInertiaTick)
        }
      }
    })
    visibilityObserver.observe(canvas)
  }

  /** 热点锚定的分组：按组内 src 总行数取前五，其余组交给图例和表格。 */
  const hotspotGroups = (() => {
    const totals = new Map()
    for (const entry of placed) {
      const current = totals.get(entry.group) ?? { group: entry.group, count: 0, lines: 0 }
      current.count += 1
      current.lines += entry.node.srcLines
      totals.set(entry.group, current)
    }
    return [...totals.values()].sort((a, b) => b.lines - a.lines).slice(0, 5)
  })()

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
    // 1124 条边一起画是视觉泥浆，所以只画最重的那些，并把条数报给调用方。
    const ranked = [...(model.edges ?? [])]
      .map(edge => ({ edge, weight: positions.has(edge.to) ? (positions.get(edge.to).node.dependedOnBy ?? 0) : 0 }))
      .sort((left, right) => right.weight - left.weight)
      .slice(0, 120)
    context.strokeStyle = palette.edge
    const flowPairs = []
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
      if (flowPairs.length < 48) flowPairs.push([a.sx, a.sy, b.sx, b.sy])
    }
    context.globalAlpha = 1
    return flowPairs
  }

  /**
   * 方向流粒子（vasturiano directional-particles 模式）：在最重的边上各放一粒，
   * 沿依赖方向匀速前进。时间用墙钟差分推进——render 可能被自转、聚焦动画和
   * 常驻流循环多个驱动源调用，按 dt 走保证速度一致；reduced-motion 下完全不画。
   */
  function drawFlow(pairs, width, height, palette) {
    if (options.reducedMotion === true || pairs.length === 0) return
    const now = performance.now()
    let dt = lastFrameTime === 0 ? 16 : now - lastFrameTime
    lastFrameTime = now
    if (dt > 50) dt = 50
    const radius = Math.max(1.4, Math.min(width, height) / 620)
    for (let i = 0; i < pairs.length; i += 1) {
      if (flowParticles.length <= i) flowParticles.push({ t: Math.random() })
      const dot = flowParticles[i]
      dot.t = (dot.t + dt / 1400) % 1
      const [ax, ay, bx, by] = pairs[i]
      const x = ax + (bx - ax) * dot.t
      const y = ay + (by - ay) * dot.t
      context.globalAlpha = Math.sin(Math.PI * dot.t) * 0.85
      context.fillStyle = palette.edge
      context.beginPath()
      context.arc(x, y, radius, 0, TAU)
      context.fill()
    }
    context.globalAlpha = 1
  }

  function render() {
    const width = canvas.width
    const height = canvas.height
    const palette = styles()
    context.clearRect(0, 0, width, height)
    drawGround(width, height, palette)
    const flowPairs = showEdges ? drawEdges(width, height, palette) : []
    drawFlow(flowPairs, width, height, palette)

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

    // 热点锚定：把前五组的柱顶均值投影回 CSS 像素，交给页面上的 DOM 标签。
    if (typeof options.onFrame === 'function') {
      const byGroup = new Map()
      for (const bar of bars) {
        const current = byGroup.get(bar.entry.group) ?? { sumX: 0, sumY: 0, n: 0 }
        current.sumX += bar.top.sx
        current.sumY += bar.top.sy
        current.n += 1
        byGroup.set(bar.entry.group, current)
      }
      const anchors = []
      for (const spot of hotspotGroups) {
        const summed = byGroup.get(spot.group)
        if (summed === undefined) continue
        anchors.push({
          group: spot.group,
          count: spot.count,
          lines: spot.lines,
          x: summed.sumX / summed.n / cssRatio,
          y: summed.sumY / summed.n / cssRatio,
        })
      }
      options.onFrame(anchors)
    }

    return bars.length
  }

  function resize() {
    const ratio = Math.min(2, window.devicePixelRatio || 1)
    const box = canvas.getBoundingClientRect()
    canvas.width = Math.max(320, Math.round(box.width * ratio))
    canvas.height = Math.max(240, Math.round(box.height * ratio))
    cssRatio = box.width > 0 ? canvas.width / box.width : 1
    render()
  }

  function step() {
    camera.yaw = (camera.yaw + 0.0035) % TAU
    render()
    if (spinning) raf = requestAnimationFrame(step)
  }

  /** 组的世界角：对组内柱子的角度做圆周均值，跨 0/2π 边界不会跳变。 */
  function groupAngle(group) {
    let sumX = 0
    let sumZ = 0
    for (const entry of placed) {
      if (entry.group !== group) continue
      sumX += Math.cos(entry.angle)
      sumZ += Math.sin(entry.angle)
    }
    return Math.atan2(sumZ, sumX)
  }

  function cancelFocusAnimation() {
    if (focusRaf !== 0) cancelAnimationFrame(focusRaf)
    focusRaf = 0
    stopInertia()
  }

  /**
   * 镜头飞到正对该组的视角（vasturiano click-to-focus 模式）。
   * yaw 取最短路径，距离收近一档；自动旋转在聚焦期间暂停，
   * reduced-motion 下直接跳到目标不播动画。
   */
  function animateCameraTo(target, onDone) {
    cancelFocusAnimation()
    const from = { yaw: camera.yaw, pitch: camera.pitch, distance: camera.distance }
    let deltaYaw = ((target.yaw - from.yaw + Math.PI) % TAU + TAU) % TAU - Math.PI
    if (options.reducedMotion === true) {
      camera.yaw = target.yaw
      camera.pitch = target.pitch
      camera.distance = target.distance
      render()
      if (typeof onDone === 'function') onDone()
      return
    }
    const duration = 650
    let start = 0
    const tick = (now) => {
      if (start === 0) start = now
      const t = Math.min(1, (now - start) / duration)
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      camera.yaw = from.yaw + deltaYaw * ease
      camera.pitch = from.pitch + (target.pitch - from.pitch) * ease
      camera.distance = from.distance + (target.distance - from.distance) * ease
      render()
      if (t < 1) focusRaf = requestAnimationFrame(tick)
      else { focusRaf = 0; syncFlowLoop(); if (typeof onDone === 'function') onDone() }
    }
    focusRaf = requestAnimationFrame(tick)
  }

  return {
    render,
    resize,
    layout: { placed, ringGroups, innerRingGroups: INNER_RING_GROUPS },
    get camera() { return { ...camera } },
    get focusedGroup() { return focusedGroup },
    focusGroup(group) {
      const entries = placed.some(entry => entry.group === group)
      if (!entries) return false
      if (spinning) {
        spinning = false
        cancelAnimationFrame(raf)
        raf = 0
        resumeSpinOnFocusEnd = options.reducedMotion !== true
      }
      focusedGroup = group
      syncFlowLoop()
      animateCameraTo({
        yaw: (Math.PI / 2 - groupAngle(group) + TAU) % TAU,
        pitch: 0.55,
        distance: 3.6,
      })
      return true
    },
    focusReset() {
      focusedGroup = null
      const resume = resumeSpinOnFocusEnd && !spinning
      resumeSpinOnFocusEnd = false
      syncFlowLoop()
      animateCameraTo(HOME_VIEW, () => {
        if (resume) this.startSpin()
        else syncFlowLoop()
      })
    },
    setYaw(value) { camera.yaw = value; render() },
    setPitch(value) { camera.pitch = Math.max(0.05, Math.min(1.35, value)); render() },
    nudge(dYaw, dPitch) {
      camera.yaw = (camera.yaw + dYaw + TAU) % TAU
      camera.pitch = Math.max(0.05, Math.min(1.35, camera.pitch + dPitch))
      render()
    },
    setEdges(value) { showEdges = Boolean(value); render(); syncFlowLoop() },
    get edgesVisible() { return showEdges },
    /** 自动旋转只在用户没要求减少动态效果时才可用。 */
    startSpin() {
      if (options.reducedMotion === true || spinning) return
      stopInertia()
      spinning = true
      raf = requestAnimationFrame(step)
      syncFlowLoop()
    },
    stopSpin() {
      spinning = false
      if (raf !== 0) cancelAnimationFrame(raf)
      raf = 0
      syncFlowLoop()
    },
    get spinning() { return spinning },
    /** 拖放后的惯性滑行；reduced-motion 与离屏状态下不启动。 */
    fling(vYaw, vPitch) { fling(vYaw, vPitch) },
    stopInertia() { stopInertia() },
    dispose() {
      this.stopSpin()
      if (flowRaf !== 0) cancelAnimationFrame(flowRaf)
      flowRaf = 0
      cancelFocusAnimation()
      if (visibilityObserver !== null) visibilityObserver.disconnect()
    },
  }
}
