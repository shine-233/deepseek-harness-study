/**
 * 包依赖图实验页的渲染层。
 *
 * 模型在 package-graph-model.js；本文件只把返回值画出来，不推导数字。数据从
 * 同源的 study fixture 取，所以页面 CSP 允许 connect-src 'self'——这是本页与
 * 其他实验页的唯一差别，也是它需要一次 fetch 的原因。
 *
 * 三张数值视图（散点、柱、表）共享同一份 model.nodes 并互相联动：指针停在任
 * 何一个包上，三处同时高亮。散点和柱按包 id 键控复用 DOM 元素，参数变化时对
 * 几何属性做一次短补间，让「筛选怎样改变视图」留下轨迹，而不是整图闪变。
 */

import { icon } from './study-lab-icons.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import graphFixture from './package-graph.json' with { type: 'json' }
import { installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  BAR_VIEW_MAX_NODES,
  buildPackageGraphModel,
  evaluatePackageGraphOracle,
} from './package-graph-model.js'
import { installThemeToggle } from './study-lab-theme.js'
import { createPackageScene } from './study-lab-scene3d.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import {
  installDeclaredIcons,
  makeFeedback,
  prefersReducedMotion,
  renderBoundary,
  renderOracle,
  svgElement,
  writeText,
} from './study-lab-kit.js'

const FIXTURE_URL = './package-graph.json'

/** 以 10 为底的对数刻度：行数跨三个数量级，线性刻度会把大半个包挤成一团。 */
function logScale(value) {
  return Math.log10(Math.max(1, value))
}

/**
 * 图宽跟随容器，所以 viewBox 宽度等于 CSS 宽度，缩放恒为 1。
 * 固定 viewBox 只有两种结局：窄屏横向滚动，或者等比缩小到文字读不出来。
 * 下限 760 是保证坐标轴标签不互相压住的最小宽度；到不了就只能滚动。
 */
function plotWidth(target) {
  const available = Math.floor(target.clientWidth - 28)
  if (!Number.isFinite(available) || available <= 0) return 1080
  return Math.max(760, available)
}

/* ------------------------------------------------------------------ *
 * 键控补间
 * ------------------------------------------------------------------ */

/** 进行中的补间帧按元素记账；元素被复用或移除时用它打断旧动画。 */
const pendingGlides = new WeakMap()

/**
 * 把元素的若干数值属性从当前值平滑过渡到目标值。
 *
 * 时长读 token 层的 --dur-enter，与进场动画共用同一份运动词汇；
 * reduced-motion 下直接落位。补间只动几何，不承载任何数值语义——
 * 每个点的精确数值始终由表格逐行给出。
 */
function glide(el, props) {
  const previousFrame = pendingGlides.get(el)
  if (previousFrame !== undefined) cancelAnimationFrame(previousFrame)
  const applyTarget = () => {
    for (const [key, value] of Object.entries(props)) el.setAttribute(key, String(value))
  }
  const durationMs = prefersReducedMotion() ? 0 : motionDurationMs('--dur-enter', 200)
  if (durationMs <= 0) {
    applyTarget()
    return
  }
  const from = {}
  for (const key of Object.keys(props)) {
    const current = Number(el.getAttribute(key))
    from[key] = Number.isFinite(current) ? current : props[key]
  }
  const start = performance.now()
  const frame = (now) => {
    const t = Math.min(1, (now - start) / durationMs)
    const eased = 1 - (1 - t) ** 3
    for (const [key, target] of Object.entries(props)) {
      el.setAttribute(key, String(from[key] + (target - from[key]) * eased))
    }
    if (t < 1) {
      pendingGlides.set(el, requestAnimationFrame(frame))
    } else {
      pendingGlides.delete(el)
    }
  }
  pendingGlides.set(el, requestAnimationFrame(frame))
}

function cancelGlide(el) {
  const frame = pendingGlides.get(el)
  if (frame !== undefined) {
    cancelAnimationFrame(frame)
    pendingGlides.delete(el)
  }
}

function motionDurationMs(tokenName, fallbackMs) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim()
  const value = Number.parseFloat(raw)
  if (!Number.isFinite(value) || value < 0) return fallbackMs
  return raw.endsWith('ms') ? value : value * 1000
}

/* ------------------------------------------------------------------ *
 * 自绘数值提示
 * ------------------------------------------------------------------ */

/**
 * 原生 `<title>` 延迟约一秒出现且触屏基本不可用；这里跟随指针即时显示。
 * 提示只是快捷路径：同一份数字在表格里逐行给出（读屏用户走那条路，
 * 所以提示容器 aria-hidden）。position: fixed 加视口内钳制，贴边不溢出。
 */
function createTooltip() {
  const tip = document.createElement('div')
  tip.className = 'plot-tooltip'
  tip.setAttribute('aria-hidden', 'true')
  tip.hidden = true
  document.body.append(tip)
  const place = (x, y) => {
    const pad = 14
    const box = tip.getBoundingClientRect()
    let left = x + pad
    let top = y + pad
    if (left + box.width > window.innerWidth - 8) left = x - box.width - pad / 2
    if (top + box.height > window.innerHeight - 8) top = y - box.height - pad / 2
    tip.style.left = `${Math.max(8, left)}px`
    tip.style.top = `${Math.max(8, top)}px`
  }
  return {
    show(text, x, y) {
      tip.textContent = text
      tip.hidden = false
      place(x, y)
    },
    move(x, y) {
      if (!tip.hidden) place(x, y)
    },
    hide() {
      tip.hidden = true
    },
  }
}

/* ------------------------------------------------------------------ *
 * 表格排序
 * ------------------------------------------------------------------ */

/** 表头的每一列都能排；kind 决定比较器和第一次点击的方向。 */
const TABLE_COLUMNS = [
  { key: 'id', label: '包目录', kind: 'text' },
  { key: 'group', label: '组', kind: 'text' },
  { key: 'npmName', label: 'npm 名', kind: 'text' },
  { key: 'srcLines', label: 'src 行', kind: 'number' },
  { key: 'srcFiles', label: 'src 文件', kind: 'number' },
  { key: 'dependedOnBy', label: '被依赖（全仓库）', kind: 'number' },
  { key: 'degreeWithinView', label: '被依赖（视图内）', kind: 'number' },
  { key: 'dependsOnWithinView', label: '依赖别人（视图内）', kind: 'number' },
]

/**
 * 三态循环：数值列先降序（第一需求通常是「谁最大」），文本列先升序；
 * 第三次点击回到模型顺序——排序是阅读辅助，不能悄悄替换图的默认叙事。
 */
function nextTableSort(column, current) {
  if (current === null || current.key !== column.key) {
    return { key: column.key, dir: column.kind === 'number' ? 'desc' : 'asc' }
  }
  if (column.kind === 'number') {
    return current.dir === 'desc' ? { key: column.key, dir: 'asc' } : null
  }
  return current.dir === 'asc' ? { key: column.key, dir: 'desc' } : null
}

function sortNodesForTable(nodes, sort) {
  if (sort === null) return nodes
  const column = TABLE_COLUMNS.find(candidate => candidate.key === sort.key)
  const direction = sort.dir === 'asc' ? 1 : -1
  return [...nodes].sort((left, right) => {
    const a = left[column.key]
    const b = right[column.key]
    const emptyA = a === null || a === undefined
    const emptyB = b === null || b === undefined
    // npm 名允许为空：空值恒排在末尾，与方向无关，方便一眼看到「没有发布」的包。
    if (emptyA || emptyB) return emptyA && emptyB ? 0 : emptyA ? 1 : -1
    const compared = column.kind === 'number'
      ? a - b
      : String(a).localeCompare(String(b), 'zh-Hans-CN')
    return compared * direction
  })
}

function renderTableBody(model, tableBody, caption, sort) {
  tableBody.replaceChildren()
  for (const node of sortNodesForTable(model.nodes, sort)) {
    const row = document.createElement('tr')
    row.dataset.id = node.id
    for (const value of [
      node.id, node.group, node.npmName ?? '—',
      String(node.srcLines), String(node.srcFiles),
      String(node.dependedOnBy), String(node.degreeWithinView),
      String(node.dependsOnWithinView ?? 0),
    ]) {
      const cell = document.createElement('td')
      writeText(cell, value)
      row.append(cell)
    }
    tableBody.append(row)
  }
  let text = '当前视图的全部包，共 ' + String(model.nodes.length) + ' 行（固定提交 '
    + model.commit.slice(0, 10) + '）'
  if (sort !== null) {
    const column = TABLE_COLUMNS.find(candidate => candidate.key === sort.key)
    text += ' · 当前按 ' + column.label + (sort.dir === 'asc' ? '升序' : '降序')
  }
  writeText(caption, text)
}

/* ------------------------------------------------------------------ *
 * 跨视图联动高亮
 * ------------------------------------------------------------------ */

function createLinker(scatterBox, barBox, tableBody) {
  let activeId = null
  const marksOf = (id) => {
    const escaped = CSS.escape(id)
    return [
      scatterBox.querySelector(`circle[data-id="${escaped}"]`),
      barBox.querySelector(`rect[data-id="${escaped}"]`),
      tableBody.querySelector(`tr[data-id="${escaped}"]`),
    ]
  }
  return {
    show(id) {
      if (id === activeId) return
      this.clear()
      activeId = id
      for (const el of marksOf(id)) el?.classList.add('is-linked')
      const row = tableBody.querySelector(`tr[data-id="${CSS.escape(id)}"]`)
      const scroller = row?.closest('.table-scroll')
      if (row !== null && scroller !== null) {
        const outer = scroller.getBoundingClientRect()
        const inner = row.getBoundingClientRect()
        // 只调容器自己的 scrollTop，不抢页面滚动；行已在可视区时不打扰。
        if (inner.top < outer.top + 8 || inner.bottom > outer.bottom - 8) {
          scroller.scrollTop += inner.top - outer.top - (outer.height - inner.height) / 2
        }
      }
    },
    clear() {
      if (activeId === null) return
      for (const el of marksOf(activeId)) el?.classList.remove('is-linked')
      activeId = null
    },
  }
}

/* ------------------------------------------------------------------ *
 * 散点图
 * ------------------------------------------------------------------ */

const SCATTER_HEIGHT = 460
/** 缩放下限是全图、上限 8 倍；再放大只会看到空坐标网格。 */
const SCATTER_MAX_MAGNIFY = 8

function createScatterPlot(container, note, tooltip) {
  let svg = null
  let chromeLayer = null
  let pointsLayer = null
  let labelsLayer = null
  let width = 0
  let revealed = false
  /** id -> circle 元素，跨渲染复用；键是包目录名。 */
  const livePoints = new Map()
  /** 当前 viewBox；null 表示未放大，整图可见。 */
  let view = null

  function ensureSvg(nextWidth) {
    if (svg !== null && nextWidth === width) return
    for (const circle of livePoints.values()) cancelGlide(circle)
    livePoints.clear()
    width = nextWidth
    revealed = false
    svg = svgElement('svg', {
      viewBox: `0 0 ${width} ${SCATTER_HEIGHT}`,
      role: 'img',
      'aria-labelledby': 'scatter-svg-title scatter-svg-desc',
    })
    svg.append(
      svgElement('title', { id: 'scatter-svg-title' }, '包体量与被依赖次数的散点图'),
      svgElement('desc', { id: 'scatter-svg-desc' },
        '横轴是 src 行数，按对数刻度；纵轴是同仓库内被 peerDependencies 指向的次数；'
        + '点的面积是这个包在当前视图里依赖了多少个别的包。'
        + '完整数值在本页最后的表格里逐行给出。'),
    )
    chromeLayer = svgElement('g')
    pointsLayer = svgElement('g')
    labelsLayer = svgElement('g')
    svg.append(chromeLayer, pointsLayer, labelsLayer)
    container.replaceChildren(svg)
    resetZoom()
  }

  function discardSvg() {
    for (const circle of livePoints.values()) cancelGlide(circle)
    livePoints.clear()
    container.replaceChildren()
    svg = null
    chromeLayer = null
    pointsLayer = null
    labelsLayer = null
    view = null
  }

  function applyZoom() {
    if (svg === null || view === null) return
    svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`)
    svg.classList.add('is-magnified')
  }

  function resetZoom() {
    view = null
    if (svg !== null) {
      svg.setAttribute('viewBox', `0 0 ${width} ${SCATTER_HEIGHT}`)
      svg.classList.remove('is-magnified')
    }
  }

  function zoomAt(factor, centerX, centerY) {
    if (svg === null) return
    const current = view ?? { x: 0, y: 0, w: width, h: SCATTER_HEIGHT }
    const minW = width / SCATTER_MAX_MAGNIFY
    const nextW = Math.min(width, Math.max(minW, current.w * factor))
    const k = nextW / current.w
    const nextH = current.h * k
    let x = centerX - (centerX - current.x) * k
    let y = centerY - (centerY - current.y) * k
    x = Math.min(Math.max(x, 0), width - nextW)
    y = Math.min(Math.max(y, 0), SCATTER_HEIGHT - nextH)
    if (nextW >= width - 0.01) {
      resetZoom()
      return
    }
    view = { x, y, w: nextW, h: nextH }
    applyZoom()
  }

  function panBy(dxUnits, dyUnits) {
    if (view === null) return
    view.x = Math.min(Math.max(view.x - dxUnits, 0), width - view.w)
    view.y = Math.min(Math.max(view.y - dyUnits, 0), SCATTER_HEIGHT - view.h)
    applyZoom()
  }

  function clientToSvg(clientX, clientY) {
    const matrix = svg?.getScreenCTM()
    if (matrix === null || matrix === undefined) return null
    return new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse())
  }

  function bindInteractions(zoomInButton, zoomOutButton, resetButton) {
    container.addEventListener('wheel', (event) => {
      if (svg === null) return
      // 带修饰键的滚轮不劫持：Ctrl/Cmd 交给浏览器整页缩放，Shift/Alt 交给原生横向滚动。
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      event.preventDefault()
      const point = clientToSvg(event.clientX, event.clientY)
      if (point === null) return
      zoomAt(Math.exp(event.deltaY * 0.002), point.x, point.y)
    }, { passive: false })

    // 拖拽平移只给鼠标和笔：触屏的单指手势留给页面滚动，缩放走按钮。
    let panLast = null
    container.addEventListener('pointerdown', (event) => {
      if (panLast !== null || view === null) return
      if (event.pointerType === 'touch' || event.button !== 0) return
      if (!(event.target instanceof Element) || !event.target.closest('svg')) return
      panLast = { id: event.pointerId, x: event.clientX, y: event.clientY }
      container.setPointerCapture(event.pointerId)
      svg?.classList.add('is-panning')
    })
    container.addEventListener('pointermove', (event) => {
      if (panLast === null || panLast.id !== event.pointerId || view === null) return
      const rect = svg?.getBoundingClientRect()
      if (rect === null || rect === undefined || rect.width === 0) return
      const scale = view.w / rect.width
      panBy((event.clientX - panLast.x) * scale, (event.clientY - panLast.y) * scale)
      panLast.x = event.clientX
      panLast.y = event.clientY
    })
    const endPan = (event) => {
      if (panLast === null || panLast.id !== event.pointerId) return
      panLast = null
      svg?.classList.remove('is-panning')
    }
    container.addEventListener('pointerup', endPan)
    container.addEventListener('pointercancel', endPan)

    // 按钮是缩放的键盘与触屏等价物：只有滚轮可用的图对这两类用户等于关门。
    zoomInButton?.addEventListener('click', () => zoomAt(1 / 1.35, width / 2, SCATTER_HEIGHT / 2))
    zoomOutButton?.addEventListener('click', () => zoomAt(1.35, width / 2, SCATTER_HEIGHT / 2))
    resetButton?.addEventListener('click', () => resetZoom())
  }

  function render(model) {
    if (model.nodes.length === 0) {
      discardSvg()
      writeText(note, '当前筛选没有包。')
      return
    }
    ensureSvg(plotWidth(container))

    const left = 76
    const right = 34
    const top = 30
    const bottom = 62
    const maxLines = Math.max(...model.nodes.map(node => node.srcLines), 10)
    const maxDegree = Math.max(...model.nodes.map(node => node.dependedOnBy), 1)
    const maxOut = Math.max(...model.nodes.map(node => node.dependsOnWithinView ?? 0), 1)
    const xFor = lines => left + (logScale(lines) / logScale(maxLines)) * (width - left - right)
    const yFor = degree => SCATTER_HEIGHT - bottom - (degree / maxDegree) * (SCATTER_HEIGHT - top - bottom)
    const radiusFor = node => 4 + Math.sqrt((node.dependsOnWithinView ?? 0) / maxOut) * 7

    chromeLayer.replaceChildren()
    for (const power of [1, 2, 3, 4]) {
      const value = 10 ** power
      if (value > maxLines * 1.4) continue
      const x = xFor(value)
      chromeLayer.append(
        svgElement('line', { x1: x, y1: top, x2: x, y2: SCATTER_HEIGHT - bottom, class: 'grid' }),
        svgElement('text', { x, y: SCATTER_HEIGHT - bottom + 20, class: 'axis', 'text-anchor': 'middle' },
          value >= 1000 ? String(value / 1000) + 'k' : String(value)),
      )
    }
    const degreeStep = Math.max(1, Math.ceil(maxDegree / 5))
    for (let degree = 0; degree <= maxDegree; degree += degreeStep) {
      const y = yFor(degree)
      chromeLayer.append(
        svgElement('line', { x1: left, y1: y, x2: width - right, y2: y, class: 'grid' }),
        svgElement('text', { x: left - 12, y: y + 4, class: 'axis', 'text-anchor': 'end' }, String(degree)),
      )
    }
    chromeLayer.append(
      svgElement('text', { x: (left + width - right) / 2, y: SCATTER_HEIGHT - 16, class: 'axis-title', 'text-anchor': 'middle' },
        'src 行数（对数刻度）'),
      svgElement('text', {
        x: 18, y: (top + SCATTER_HEIGHT - bottom) / 2, class: 'axis-title', 'text-anchor': 'middle',
        transform: `rotate(-90 18 ${String((top + SCATTER_HEIGHT - bottom) / 2)})`,
      }, '被依赖次数'),
    )

    // 只给角上的包直接标名字：最大、最被依赖，以及「大而少被依赖」「小而多被依赖」
    // 两个反例。每个点都标名字会糊成一片。
    const labelled = new Set()
    const byLines = [...model.nodes].sort((a, b) => b.srcLines - a.srcLines)
    const byDegree = [...model.nodes].sort((a, b) => b.dependedOnBy - a.dependedOnBy)
    for (const node of [byLines[0], byDegree[0]]) if (node !== undefined) labelled.add(node.id)
    const bigLowDegree = byLines.find(node => node.dependedOnBy <= maxDegree * 0.05)
    const smallHighDegree = byDegree.find(node => node.srcLines <= maxLines * 0.1)
    for (const node of [bigLowDegree, smallHighDegree]) if (node !== undefined) labelled.add(node.id)

    // 第三维用面积编码，不用第三个空间轴：可旋转的 3D 散点有遮挡、透视让位置失真、
    // 没有共享基线，读数比二维差。面积按平方根映射，因为人眼比较的是面积而不是半径。
    const seen = new Set()
    for (const node of model.nodes) {
      seen.add(node.id)
      const props = {
        cx: xFor(node.srcLines).toFixed(2),
        cy: yFor(node.dependedOnBy).toFixed(2),
        r: radiusFor(node).toFixed(2),
      }
      let circle = livePoints.get(node.id)
      const hubClass = 'point' + (model.observations.hubs.includes(node.id) ? ' is-hub' : '')
      if (circle === undefined) {
        const attributes = { class: hubClass, 'data-id': node.id }
        if (!revealed) attributes['data-reveal'] = ''
        circle = svgElement('circle', attributes)
        for (const [key, value] of Object.entries(props)) circle.setAttribute(key, value)
        circle.dataset.tip = node.id + '：' + String(node.srcLines) + ' 行，被 '
          + String(node.dependedOnBy) + ' 个包依赖，本视图内依赖了 '
          + String(node.dependsOnWithinView ?? 0) + ' 个包'
        livePoints.set(node.id, circle)
        if (revealed) circle.classList.add('is-entering')
      } else {
        circle.setAttribute('class', hubClass)
        glide(circle, props)
      }
      pointsLayer.append(circle)
    }
    for (const [id, circle] of livePoints) {
      if (!seen.has(id)) {
        cancelGlide(circle)
        circle.remove()
        livePoints.delete(id)
      }
    }

    labelsLayer.replaceChildren()
    for (const node of model.nodes) {
      if (!labelled.has(node.id)) continue
      const x = xFor(node.srcLines)
      const y = yFor(node.dependedOnBy)
      const toLeft = x > width * 0.72
      const anchorX = toLeft ? x - 13 : x + 13
      const labelX = toLeft ? x - 34 : x + 34
      // A ring plus a leader line makes the annotated point findable among 219
      // dots; the label alone reads as one more piece of axis furniture.
      labelsLayer.append(
        svgElement('circle', { cx: x, cy: y, r: (radiusFor(node) + 5).toFixed(2), class: 'point-ring' }),
        svgElement('line', { x1: anchorX, y1: y, x2: labelX, y2: y, class: 'point-leader' }),
        svgElement('text', {
          x: labelX + (toLeft ? -4 : 4), y: y + 4, class: 'point-label',
          'text-anchor': toLeft ? 'end' : 'start',
        }, node.id),
      )
    }

    if (!revealed) {
      revealed = true
      revealOnScroll(container)
    }
    // 筛选会改变两个轴的数据范围，旧的缩放窗口在新坐标系下指错位置，
    // 所以每次重渲染都回到全貌；要细看就再滚轮/按钮放大。
    resetZoom()

    const biggest = model.observations.biggest
    const most = model.observations.mostDepended
    writeText(note, biggest === null || most === null
      ? ''
      : '本视图里最大的包是 ' + biggest.id + '（' + String(biggest.srcLines) + ' 行，被依赖 '
        + String(biggest.dependedOnBy) + '），最被依赖的是 ' + most.id + '（'
        + String(most.srcLines) + ' 行，被依赖 ' + String(most.dependedOnBy)
        + '）。两者是否是同一个包，就是这张图要回答的问题。')
  }

  return { render, bindInteractions }
}

/* ------------------------------------------------------------------ *
 * 柱视图
 * ------------------------------------------------------------------ */

/** id -> rect 元素，跨渲染复用；键是包目录名。 */
const liveBars = new Map()
let barsRevealed = false

function renderBars(model, target, note) {
  for (const rect of liveBars.values()) cancelGlide(rect)
  liveBars.clear()
  target.replaceChildren()

  if (!model.barViewAvailable) {
    writeText(note, '当前视图有 ' + String(model.nodes.length) + ' 个包，超过 '
      + String(BAR_VIEW_MAX_NODES) + ' 个就不画柱视图；请先按组筛选，或直接读下面的表格。')
    barsRevealed = false
    return
  }

  const nodes = model.nodes
  const width = Math.max(plotWidth(target), 96 + nodes.length * 96)
  const height = 380
  const left = 64
  const bottomBar = 96
  const top = 26
  const maxLines = Math.max(...nodes.map(node => node.srcLines), 10)
  const maxDegree = Math.max(...nodes.map(node => node.dependedOnBy), 1)
  const slot = (width - left - 32) / nodes.length
  const barWidth = Math.min(58, slot * 0.62)
  const heightFor = lines => (lines / maxLines) * (height - top - bottomBar)

  const svg = svgElement('svg', {
    viewBox: `0 0 ${width} ${height}`,
    role: 'img',
    'aria-labelledby': 'bar-svg-title bar-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'bar-svg-title' }, '组内每个包的 src 行数与被依赖次数'),
    svgElement('desc', { id: 'bar-svg-desc' },
      '柱高是 src 行数，柱的边框粗细是被依赖次数，横向位置只是排序后的次序。'
      + '同一组数字在本页最后的表格里逐行给出。'),
  )
  svg.append(svgElement('line', {
    x1: left, y1: height - bottomBar, x2: width - 20, y2: height - bottomBar, class: 'baseline',
  }))
  target.append(svg)

  const seen = new Set()
  for (const [index, node] of nodes.entries()) {
    seen.add(node.id)
    const props = {
      x: (left + slot * index + (slot - barWidth) / 2).toFixed(2),
      y: (height - bottomBar - Math.max(2, heightFor(node.srcLines))).toFixed(2),
      height: Math.max(2, heightFor(node.srcLines)).toFixed(2),
      'stroke-width': (1 + (node.dependedOnBy / maxDegree) * 5).toFixed(2),
    }
    let bar = liveBars.get(node.id)
    const hubClass = 'bar' + (model.observations.hubs.includes(node.id) ? ' is-hub' : '')
    if (bar === undefined) {
      const attributes = { class: hubClass, 'data-id': node.id, rx: 4 }
      if (!barsRevealed) attributes['data-reveal'] = ''
      bar = svgElement('rect', attributes)
      bar.dataset.tip = node.id + '：' + String(node.srcLines) + ' 行，被 '
        + String(node.dependedOnBy) + ' 个包依赖'
      liveBars.set(node.id, bar)
      if (barsRevealed) bar.classList.add('is-entering')
    } else {
      bar.setAttribute('class', hubClass)
      glide(bar, props)
    }
    bar.setAttribute('width', String(barWidth))
    svg.append(bar)

    const x = Number(props.x)
    const barHeight = Number(props.height)
    const y = height - bottomBar - barHeight
    // 边框粗细承载入度：1px 表示零入度，最粗 6px 表示本视图里最高的入度。
    svg.append(
      svgElement('text', { x: x + barWidth / 2, y: y - 8, class: 'bar-value', 'text-anchor': 'middle' },
        String(node.srcLines)),
      svgElement('text', {
        x: x + barWidth / 2, y: height - bottomBar + 16, class: 'bar-label', 'text-anchor': 'end',
        transform: `rotate(-38 ${x + barWidth / 2} ${height - bottomBar + 16})`,
      }, node.directory),
      svgElement('text', { x: x + barWidth / 2, y: height - 18, class: 'bar-degree', 'text-anchor': 'middle' },
        '←' + String(node.dependedOnBy)),
    )
  }
  for (const [id, bar] of liveBars) {
    if (!seen.has(id)) bar.remove()
  }

  if (!barsRevealed) {
    barsRevealed = true
    revealOnScroll(target)
  }
  writeText(note, '柱底下的 ←n 是被依赖次数，也就是边框粗细对应的数字；组内边 '
    + String(model.observations.edgesWithinView) + ' 条，其余依赖指向组外。')
}

/* ------------------------------------------------------------------ *
 * 装配
 * ------------------------------------------------------------------ */

async function initializePage() {
  const form = document.querySelector('#graph-form')
  const groupInput = document.querySelector('#group')
  const sortInput = document.querySelector('#sort')
  const minLinesInput = document.querySelector('#min-lines')
  const minLinesOutput = document.querySelector('#min-lines-output')
  // 拖动时先更新读数，不等重建：读数是控件的一部分，不是模型输出。
  minLinesInput?.addEventListener('input', () => {
    if (minLinesOutput !== null) minLinesOutput.textContent = minLinesInput.value
  })
  const feedback = document.querySelector('#graph-feedback')
  const scatterBox = document.querySelector('#scatter-plot')
  const scatterNote = document.querySelector('#scatter-note')
  const barBox = document.querySelector('#bar-plot')
  const barNote = document.querySelector('#bar-note')
  const tableHead = document.querySelector('#graph-table-head')
  const tableBody = document.querySelector('#graph-table-body')
  const tableCaption = document.querySelector('#table-caption')
  const oracleList = document.querySelector('#oracle-list')
  const canProveList = document.querySelector('#can-prove-list')
  const cannotProveList = document.querySelector('#cannot-prove-list')
  const provenance = document.querySelector('#footer-provenance')
  const zoomInButton = document.querySelector('#plot-zoom-in')
  const zoomOutButton = document.querySelector('#plot-zoom-out')
  const zoomResetButton = document.querySelector('#plot-zoom-reset')
  const metrics = {
    packages: document.querySelector('#metric-packages'),
    edges: document.querySelector('#metric-edges'),
    lines: document.querySelector('#metric-lines'),
    leaves: document.querySelector('#metric-leaves'),
    oracle: document.querySelector('#metric-oracle'),
  }
  const required = [
    form, groupInput, sortInput, feedback, scatterBox, scatterNote, barBox, barNote,
    tableHead, tableBody, tableCaption, oracleList, canProveList, cannotProveList, provenance,
    ...Object.values(metrics),
  ]
  if (required.some(value => !(value instanceof HTMLElement))) return

  const setFeedback = makeFeedback(feedback)
  const tooltip = createTooltip()
  const scatter = createScatterPlot(scatterBox, scatterNote, tooltip)
  const linker = createLinker(scatterBox, barBox, tableBody)
  scatter.bindInteractions(zoomInButton, zoomOutButton, zoomResetButton)

  // 悬停联动：任何一处标记进入，三处同时高亮；提示跟随指针。
  for (const plotBox of [scatterBox, barBox]) {
    plotBox.addEventListener('pointerover', (event) => {
      const mark = event.target instanceof Element ? event.target.closest('[data-id]') : null
      if (mark === null) return
      linker.show(mark.getAttribute('data-id'))
      tooltip.show(mark.dataset.tip ?? '', event.clientX, event.clientY)
    })
    plotBox.addEventListener('pointermove', (event) => {
      tooltip.move(event.clientX, event.clientY)
    })
    plotBox.addEventListener('pointerleave', () => {
      linker.clear()
      tooltip.hide()
    })
    // 滚动图表或页面时提示还钉在旧位置就是错的，直接收掉。
    plotBox.addEventListener('scroll', () => tooltip.hide(), { passive: true })
  }
  window.addEventListener('scroll', () => tooltip.hide(), { passive: true })
  tableBody.addEventListener('mouseover', (event) => {
    const row = event.target instanceof Element ? event.target.closest('tr[data-id]') : null
    if (row !== null) linker.show(row.dataset.id)
  })
  tableBody.addEventListener('mouseleave', () => linker.clear())

  // 正文术语联动：说明文字里的包名（data-graph-id）悬停或聚焦时，
  // 三处视图高亮同一个包；离开就恢复。键盘可达：术语本身是按钮。
  const termLeave = () => linker.clear()
  for (const term of document.querySelectorAll('[data-graph-id]')) {
    term.addEventListener('pointerover', () => linker.show(term.getAttribute('data-graph-id')))
    term.addEventListener('pointerleave', termLeave)
    term.addEventListener('focus', () => linker.show(term.getAttribute('data-graph-id')))
    term.addEventListener('blur', termLeave)
    term.addEventListener('click', () => {
      linker.show(term.getAttribute('data-graph-id'))
      tableBody.querySelector('tr[data-id="' + CSS.escape(term.getAttribute('data-graph-id') ?? '') + '"]')
        ?.scrollIntoView({ block: 'nearest' })
    })
  }

  // 排序状态只在表头循环，不进 URL hash：它是阅读辅助，不是实验输入。
  // lastModel 在 fixture 载入前是 null，此时点排序直接忽略。
  let tableSort = null
  let lastModel = null
  const sortButtons = [...tableHead.querySelectorAll('button.sort-key')]
  for (const button of sortButtons) {
    button.addEventListener('click', () => {
      const column = TABLE_COLUMNS.find(candidate => candidate.key === button.dataset.key)
      if (column === undefined || lastModel === null) return
      tableSort = nextTableSort(column, tableSort)
      for (const th of tableHead.querySelectorAll('th')) {
        const key = th.querySelector('button.sort-key')?.dataset.key
        th.setAttribute('aria-sort',
          tableSort !== null && tableSort.key === key
            ? (tableSort.dir === 'asc' ? 'ascending' : 'descending')
            : 'none')
      }
      if (lastModel !== null) renderTableBody(lastModel, tableBody, tableCaption, tableSort)
    })
  }

  let fixture = null
  // fixture 是同源静态文件，通常瞬间到达；慢网或冷缓存时先声明状态，控件区不留空白。
  setFeedback('正在读取固定提交快照…')
  try {
    const response = await fetch(FIXTURE_URL)
    if (!response.ok) throw new Error('fixture 返回 HTTP ' + String(response.status))
    fixture = await response.json()
  } catch (error) {
    setFeedback('读不到 package-graph.json，本页的图和表都无法生成：'
      + (error instanceof Error ? error.message : '未知错误') + '。页面结论不依赖本页渲染成功。', 'error')
    return
  }

  const verdict = evaluatePackageGraphOracle(fixture)
  renderOracle(verdict, oracleList, metrics.oracle)

  // 3D 场景用全量模型，不跟随「按组筛选」：它要回答的是 50 个组的相对体量，
  // 筛到一个组以后这句话就不成立了。数值视图（散点、柱、表格）才跟随筛选。
  installScene(buildPackageGraphModel(fixture, { group: 'all', sort: 'lines' }))

  groupInput.replaceChildren()
  const all = document.createElement('option')
  all.value = 'all'
  writeText(all, '全部 ' + String(fixture.totals.packages) + ' 个包')
  groupInput.append(all)
  const counts = new Map()
  for (const node of fixture.nodes) counts.set(node.group, (counts.get(node.group) ?? 0) + 1)
  for (const group of [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b))) {
    const option = document.createElement('option')
    option.value = group
    writeText(option, group + '（' + String(counts.get(group)) + ' 包）')
    groupInput.append(option)
  }
  // 打开页面第一眼就该是全貌；core 只有 2 个可见点，剩下是空白。
  groupInput.value = 'all'

  // 状态链接的输入契约：group 的取值集合由 fixture 动态生成，sort 是页面静态枚举；
  // 组名在恢复时对照当前选项校验，fixture 变化后旧链接安全回退到全貌。
  const GROUP_STATE_SCHEMA = {
    group: { enum: [...groupInput.options].map(option => option.value) },
    sort: { enum: [...sortInput.options].map(option => option.value) },
    minLines: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
  }
  const restored = readStateFromHash(location.hash, GROUP_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    groupInput.value = restored.value.group
    sortInput.value = restored.value.sort
    if (minLinesInput !== null) minLinesInput.value = String(restored.value.minLines)
    if (minLinesOutput !== null) minLinesOutput.textContent = minLinesInput.value
  }

  writeText(provenance, '固定提交 ' + fixture.commit.slice(0, 10) + ' · 纯函数模型 · 独立 oracle · 完整表格替代')

  const rebuild = () => {
    try {
      const model = buildPackageGraphModel(fixture, {
        group: groupInput.value,
        sort: sortInput.value,
        minLines: Number(minLinesInput?.value ?? 0),
      })
      lastModel = model
      scatter.render(model)
      renderBars(model, barBox, barNote)
      renderTableBody(model, tableBody, tableCaption, tableSort)
      renderBoundary(model, canProveList, cannotProveList)
      writeText(metrics.packages, String(model.observations.packages))
      writeText(metrics.edges, String(model.observations.edgesWithinView))
      writeText(metrics.lines, model.observations.srcLines.toLocaleString('en-US'))
      writeText(metrics.leaves, String(model.observations.leaves))
      setFeedback('已从固定提交读数重建视图：' + String(model.observations.packages)
        + ' 个包，视图内 ' + String(model.observations.edgesWithinView) + ' 条依赖边。', 'success')
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '视图输入无效。', 'error')
    }
  }

  // 状态进 URL hash；replaceState 被拒（file:// 等）时页面行为不变。
  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        group: groupInput.value,
        sort: sortInput.value,
        minLines: Number(minLinesInput?.value ?? 0),
      }, GROUP_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    rebuild()
  })
  groupInput.addEventListener('change', rebuild)
  sortInput.addEventListener('change', rebuild)
  minLinesInput?.addEventListener('input', rebuild)
  const resetInputs = document.querySelector('#reset-inputs')
  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  installInputReset(resetInputs, form, { onReset: rebuild })
  const copyLink = document.querySelector('#copy-state-link')
  copyLink?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可，状态就在 #state= 后面。', 'error')
    }
  })
  rebuild()
}

if (typeof document !== 'undefined') {
  void initializePage()
  installDeclaredIcons()
  installScrollProgress()
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 依赖图不是时间线：把「枢纽排名 / 分组规模」枚举成轨迹，数字取自模型节点。
    const hubTrace = () => {
      const model = buildPackageGraphModel(graphFixture, { group: 'all', sort: 'lines' })
      return [...model.nodes]
        .sort((a, b) => b.dependedOnBy - a.dependedOnBy)
        .slice(0, 6)
        .map((node, index) => ({
          lane: '依赖图', phase: 'hub', index,
          detail: `${node.id}：被 ${String(node.dependedOnBy)} 个包依赖，自身 ${String(node.srcLines)} 行。`,
        }))
    }
    const groupTrace = () => {
      const model = buildPackageGraphModel(graphFixture, { group: 'all', sort: 'lines' })
      const byGroup = new Map()
      for (const node of model.nodes) {
        byGroup.set(node.group, (byGroup.get(node.group) ?? 0) + 1)
      }
      return [...byGroup.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([group, count], index) => ({
          lane: '分组规模', phase: 'group', index,
          detail: `${group} 组：${String(count)} 个包进入本视图。`,
        }))
    }
    createConceptLadder(ladderRoot, {
      storageKey: 'package-graph-ladder',
      rungs: replayRungs([
        {
          title: '被依赖最多的包就是枢纽',
          text: 'client/runtime 一类枢纽包被几十个包依赖：它们是「一切之上」的地基。改动枢纽的代价由整个扇出承担。',
          traces: [{ id: 'hubs', label: '枢纽 top6', steps: hubTrace() }],
        },
        {
          title: '分组规模：一眼看出重灾区',
          text: '按 group 聚合后，包数量最多的小组一目了然。视图上限之内装得下的才是当前分析的范围。',
          traces: [{ id: 'groups', label: '分组 top6', steps: groupTrace(), focusPhases: ['group'] }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'unchanged',
      hint: '排序只改变阅读顺序；散点的两个坐标都直接来自固定提交的读数。',
    explain: {
      unchanged: '排序是阅读顺序，不是数据变换。散点的两个坐标都直接来自固定提交的读数。',
      rescaled: '坐标轴由数据范围决定，换排序不改变数据范围。',
      reordered: '散点没有「顺序」这个维度可以重排，位置完全由两个数值决定。',
      filtered: '筛选是上面那个「按组筛选」，和排序是两件事。',
    },
  })
}

/**
 * 3D 场景按需启动。
 *
 * 不在页面加载时就渲染：连续渲染耗电，而这一幕不是读数值必需的——散点图和表格
 * 已经承载了全部数值，且都不需要先交互。启动状态不写 localStorage，所以刷新回到
 * 默认的「不启动」。
 */
function installScene(model) {
  const launch = document.getElementById('scene-launch')
  const stage = document.getElementById('scene-stage')
  const canvas = document.getElementById('scene-canvas')
  const note = document.getElementById('scene-note')
  const edges = document.getElementById('scene-edges')
  const spin = document.getElementById('scene-spin')
  const stop = document.getElementById('scene-stop')
  const hotspotLayer = document.getElementById('scene-hotspots')
  const hotspotNote = document.getElementById('scene-hotspot-note')
  if (launch === null || stage === null || canvas === null) return

  // model-viewer 式的锚定标签：DOM 按钮钉在分组柱顶的三维投影上，
  // 每帧跟随旋转平移；点击或聚焦给出该组的规模说明。
  const describeGroup = spot => {
    writeText(hotspotNote, `${spot.group} 分组：${spot.count} 个包、合计 ${spot.lines} 行 src。`
      + ' 柱高就是行数；精确数字看上方表格，3D 只负责形状与透视。')
  }

  const positionHotspots = anchors => {
    if (hotspotLayer === null) return
    for (const button of hotspotLayer.querySelectorAll('button[data-group]')) {
      const anchor = anchors.find(item => item.group === button.dataset.group)
      if (anchor === undefined) {
        button.hidden = true
        continue
      }
      button.hidden = false
      button.style.left = `${Math.round(anchor.x)}px`
      button.style.top = `${Math.round(anchor.y)}px`
    }
  }

  const reducedMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let scene = null

  const describe = () => {
    if (scene === null || note === null) return
    const { innerRingGroups } = scene.layout
    writeText(note, '内环 ' + String(innerRingGroups) + ' 组，外环其余组，共 '
      + String(model.nodes.length) + ' 根柱。柱高是对数刻度的 src 行数，'
      + (scene.edgesVisible ? '正在画最重的 120 条依赖边。' : '依赖边未画。')
      + ' 精确数值在本页最后的表格里，3D 有遮挡和透视，读不准数值。')
  }

  launch.addEventListener('click', () => {
    if (scene === null) {
      scene = createPackageScene(canvas, model, {
        reducedMotion,
        onFrame: positionHotspots,
        // 双环 50 个组密度高，衰减略慢于默认值，甩动后多滑一小段再停。
        inertiaDecay: 0.92,
      })
      if (scene === null) {
        // canvas 不可用时手动二维地图和表格仍然完整可用
        writeText(launch, '浏览器不支持 canvas，三维图和表格仍然可用')
        launch.disabled = true
        return
      }
      if (hotspotLayer !== null) {
        const totals = new Map()
        for (const node of model.nodes) {
          const current = totals.get(node.group) ?? { group: node.group, count: 0, lines: 0 }
          current.count += 1
          current.lines += node.srcLines
          totals.set(node.group, current)
        }
        for (const spot of [...totals.values()].sort((a, b) => b.lines - a.lines).slice(0, 5)) {
          const button = document.createElement('button')
          button.type = 'button'
          button.className = 'dsh3d-hotspot'
          button.dataset.group = spot.group
          button.hidden = true
          button.textContent = `${spot.group} · ${spot.count}`
          button.setAttribute('aria-label',
            `聚焦 ${spot.group} 分组：${spot.count} 个包，合计 ${spot.lines} 行源码`)
          button.setAttribute('aria-pressed', 'false')
          button.addEventListener('click', () => {
            if (scene === null) return
            // 再点一次已聚焦的热点 = 回到全景；镜头飞行由场景层负责。
            if (scene.focusedGroup === spot.group) {
              scene.focusReset()
              writeText(hotspotNote, '已回到全景视角。再点任意热点可重新聚焦。')
              button.setAttribute('aria-pressed', 'false')
              return
            }
            scene.focusGroup(spot.group)
            describeGroup(spot)
            for (const other of hotspotLayer.querySelectorAll('button[data-group][aria-pressed="true"]')) {
              other.setAttribute('aria-pressed', 'false')
            }
            button.setAttribute('aria-pressed', 'true')
          })
          button.addEventListener('focus', () => describeGroup(spot))
          hotspotLayer.append(button)
        }
      }
    }
    stage.hidden = false
    launch.hidden = true
    scene.resize()
    describe()
    canvas.focus()
  })

  stop?.addEventListener('click', () => {
    scene?.stopSpin()
    stage.hidden = true
    launch.hidden = false
    if (spin !== null) spin.setAttribute('aria-pressed', 'false')
    launch.focus()
  })

  edges?.addEventListener('change', () => {
    scene?.setEdges(edges.checked)
    describe()
  })

  spin?.addEventListener('click', () => {
    if (scene === null) return
    if (scene.spinning) {
      scene.stopSpin()
      spin.setAttribute('aria-pressed', 'false')
      return
    }
    if (reducedMotion) {
      // 尊重系统偏好：不自动旋转，但手动控制仍然可用。
      writeText(spin, '系统已要求减少动态效果')
      spin.disabled = true
      return
    }
    scene.startSpin()
    spin.setAttribute('aria-pressed', 'true')
  })

  // 拖动旋转。指针事件同时覆盖鼠标、触摸和笔；松手带惯性滑行（tldraw 手感）。
  let dragging = false
  let lastX = 0
  let lastY = 0
  let lastDx = 0
  let lastDy = 0
  canvas.addEventListener('pointerdown', (event) => {
    dragging = true
    lastX = event.clientX
    lastY = event.clientY
    lastDx = 0
    lastDy = 0
    scene?.stopInertia()
    canvas.setPointerCapture(event.pointerId)
  })
  canvas.addEventListener('pointermove', (event) => {
    if (!dragging || scene === null) return
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY
    scene.nudge(dx * 0.006, -dy * 0.005)
    lastDx = dx
    lastDy = dy
    lastX = event.clientX
    lastY = event.clientY
  })
  for (const type of ['pointerup', 'pointercancel']) {
    canvas.addEventListener(type, () => {
      if (dragging && type === 'pointerup' && scene !== null && (lastDx !== 0 || lastDy !== 0)) {
        // 最近一次位移近似出手速度；系数略低于 1 防止甩过头。
        scene.fling(lastDx * 0.006 * 0.8, -lastDy * 0.005 * 0.8)
      }
      dragging = false
      lastDx = 0
      lastDy = 0
    })
  }

  // 键盘等价操作：只能拖动的 3D 场景对键盘用户等于不存在。
  // 方向键转视角，+ / - 缩放，与滚轮、双击复位共同构成完整的相机词汇。
  canvas.addEventListener('keydown', (event) => {
    if (scene === null) return
    const step = event.shiftKey ? 0.24 : 0.08
    const moves = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0],
      ArrowUp: [0, step], ArrowDown: [0, -step],
    }
    const move = moves[event.key]
    if (move !== undefined) {
      event.preventDefault()
      scene.nudge(move[0], move[1])
      return
    }
    const zoom = { '+': 1 / 1.12, '=': 1 / 1.12, '-': 1.12, _: 1.12 }[event.key]
    if (zoom !== undefined) {
      event.preventDefault()
      scene.zoomBy(zoom)
    }
  })
  // 滚轮缩放（3d-force-graph 同款词汇）：指数步进保证远近手感一致；
  // preventDefault 阻止页面跟随滚动，passive 必须显式关掉。
  canvas.addEventListener('wheel', (event) => {
    if (scene === null) return
    event.preventDefault()
    scene.zoomBy(Math.exp(event.deltaY * 0.0012))
  }, { passive: false })
  // 双击回到默认视角；单击留给组聚焦，不冲突。
  canvas.addEventListener('dblclick', () => { scene?.resetView() })

  window.addEventListener('resize', () => { if (!stage.hidden) scene?.resize() })
}
