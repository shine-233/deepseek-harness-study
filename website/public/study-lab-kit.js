/**
 * 四个学习实验页共用的渲染工具。
 *
 * 只放渲染辅助：SVG 构造、文本写入、列表替换、oracle 列表和证据边界的渲染。
 * 这里不含任何模型逻辑——每个实验的模型、observations 和 oracle 都在自己的
 * `*-model.js` 里，是纯函数，可以在 Node 下单独测试。
 */

import { prefixIcon } from './study-lab-icons.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

/** 进行中的数字补间链：元素 → rAF 句柄，用于新目标到来时取消旧链。 */
const TWEEN_FRAMES = new WeakMap()

/** 一律用 textContent 赋值：导入的字符串永远当文本，不当标记。 */
export function bindRowJump(tableBody, slider) {
  if (tableBody === null || slider === null) return
  tableBody.addEventListener('click', (event) => {
    const row = event.target instanceof Element ? event.target.closest('tr[data-key]') : null
    if (row === null) return
    const key = Number(row.dataset.key)
    if (!Number.isInteger(key)) return
    slider.value = String(key)
    slider.dispatchEvent(new (slider?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
}
export function pulseSignal(element, className) {
  if (element === null) return
  element.classList.remove(className)
  if (typeof element.getBBox === 'function') element.getBBox()
  if (typeof requestAnimationFrame !== 'function') {
    element.classList.add(className)
    return
  }
  requestAnimationFrame(() => element.classList.add(className))
}
export function writeText(target, value) {
  target.textContent = String(value)
}

/**
 * 数字滚动读数：把元素的数值从当前值过渡到目标值。
 *
 * Mathigon 式的「参数一动、数字跟着走」读数反馈；只在数值真的变化时动画，
 * reduced-motion 下直接落位，非数字目标退化为 writeText。
 *
 * @param target - 读数元素（dd / output / span 均可）。
 * @param value - 目标数值。
 * @param options - digits 小数位（默认 0）；duration 总时长毫秒（默认 360）。
 */
export function animateNumber(target, value, { digits = 0, duration = 360 } = {}) {
  const next = Number(value)
  if (!Number.isFinite(next)) {
    writeText(target, String(value))
    return
  }
  const current = parseFloat(target.textContent)
  const from = Number.isFinite(current) ? current : 0
  const text = n => n.toFixed(digits)
  const frame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : null
  // 同一元素上一次补间还没走完就来了新目标：取消旧链，避免两条链互相覆写。
  const pendingFrame = TWEEN_FRAMES.get(target)
  if (pendingFrame !== undefined && typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(pendingFrame)
  }
  TWEEN_FRAMES.delete(target)
  if (frame === null || prefersReducedMotion() || duration <= 0 || from === next) {
    writeText(target, text(next))
    return
  }
  const start = performance.now()
  const tick = now => {
    const progress = Math.min(1, (now - start) / duration)
    const eased = 1 - (1 - progress) ** 3
    writeText(target, text(from + (next - from) * eased))
    if (progress < 1) TWEEN_FRAMES.set(target, frame(tick))
    else TWEEN_FRAMES.delete(target)
  }
  TWEEN_FRAMES.set(target, frame(tick))
}

export function svgElement(name, attributes = {}, textValue = null) {
  const element = document.createElementNS(SVG_NS, name)
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value))
  if (textValue !== null) writeText(element, textValue)
  return element
}

export function replaceList(target, values, emptyMessage) {
  target.replaceChildren()
  for (const value of values.length === 0 ? [emptyMessage] : values) {
    const item = document.createElement('li')
    writeText(item, value)
    target.append(item)
  }
}

/** 独立校验的每一条都给出期望值和实测值，页面不替它总结成一个颜色。 */
export function renderOracle(verdict, list, badge) {
  if (badge !== null && badge !== undefined) {
    // 判定同时写进 dataset.pass，配色和图标读的是那一个布尔量，不是这段文字。
    writeText(badge, verdict.pass ? '通过' : '未通过')
    badge.dataset.pass = String(verdict.pass)
  }
  list.replaceChildren()
  for (const check of verdict.checks) {
    const item = document.createElement('li')
    item.dataset.pass = String(check.pass)
    const title = document.createElement('strong')
    const detail = document.createElement('span')
    writeText(title, (check.pass ? '通过 · ' : '未通过 · ') + check.label)
    writeText(detail, '期望：' + check.expected + '；实测：' + check.actual)
    prefixIcon(title, check.pass ? 'check' : 'cross')
    item.append(title, detail)
    list.append(item)
  }
}

export function renderBoundary(model, canProveList, cannotProveList) {
  replaceList(canProveList, model.canProve, '没有 canProve 声明。')
  replaceList(cannotProveList, model.cannotProve, '没有 cannotProve 声明。')
  for (const [list, name] of [[canProveList, 'check'], [cannotProveList, 'cross']]) {
    const heading = list.closest('div, section')?.querySelector('h3')
    if (heading !== null && heading !== undefined) prefixIcon(heading, name)
  }
}

/** 表格是每个实验的完整文字替代，所以行的顺序必须和图里一致。 */
export function renderRows(tableBody, rows) {
  tableBody.replaceChildren()
  for (const row of rows) {
    const tr = document.createElement('tr')
    if (row.key !== undefined) tr.dataset.key = String(row.key)
    if (row.state !== undefined) tr.dataset.state = String(row.state)
    for (const value of row.cells) {
      const cell = document.createElement('td')
      writeText(cell, value)
      tr.append(cell)
    }
    tableBody.append(tr)
  }
}

export function makeFeedback(element) {
  return (message, tone = 'neutral') => {
    element.dataset.tone = tone
    writeText(element, message)
  }
}

/**
 * 页面用到的所有元素必须齐全才开始渲染；缺一个就整体不渲染，而不是渲染出半张图。
 *
 * @returns 全部存在返回 true。
 */
export function requireElements(elements) {
  return Object.values(elements).every(value => value instanceof HTMLElement)
}

/** 减少动态效果时关掉自动推进，逐帧控件保持可用。 */
export function prefersReducedMotion() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 计算时间轴滑块对一个按键的下一个值；返回 null 表示这个键不由滑块处理。
 * 纯函数，在 Node 里单独测试；DOM 接线在 bindRangeKeys。
 */
export function nextRangeValue(key, value, min, max, step = 1) {
  const size = Math.max(Number(step) || 1, 0)
  const actions = { ArrowLeft: value - size, ArrowRight: value + size, Home: min, End: max }
  const next = actions[key]
  if (next === undefined || !Number.isFinite(next)) return null
  return Math.min(max, Math.max(min, next))
}

/**
 * 焦点不在任何表单控件上时，用 ← / → 逐步、Home / End 直达首末，
 * 驱动实验页的主时间轴滑块；滑块自己持有焦点时交给浏览器原生行为，
 * 不做二次步进。修改通过 input 事件提交，各页面现有的重建接线照常运行。
 * DOM 类型只在浏览器里求值：本模块会被 Node 的无 DOM 门禁导入。
 */
export function bindRangeKeys(slider) {
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    const target = event.target
    if (target instanceof HTMLInputElement
      || target instanceof HTMLSelectElement
      || target instanceof HTMLTextAreaElement
      || target instanceof HTMLButtonElement) return
    if (typeof target === 'object' && target !== null && target.isContentEditable === true) return
    if (document.activeElement === slider) return
    const next = nextRangeValue(event.key, Number(slider.value), Number(slider.min), Number(slider.max), Number(slider.step))
    if (next === null) return
    event.preventDefault()
    slider.value = String(next)
    slider.dispatchEvent(new (slider?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  })
}

/**
 * 播放的下一步取值；已在末帧返回 null。纯函数，Node 里单独测试。
 */
export function nextPlayValue(value, min, max, step = 1) {
  const cap = Number(max)
  if (!Number.isFinite(cap) || !(Number(value) < cap)) return null
  const size = Math.max(Number(step) || 1, 1)
  return Math.min(cap, Number(value) + size)
}

/**
 * 图形即控制器：在时间线图上按下并横向拖动，播放头跟随最近的步骤圆点。
 *
 * 监听绑在图容器上（容器常驻、SVG 每次重建），所以重绘不丢事件。最近点按
 * 客户端坐标的水平距离判定；容器宽度为零（无头环境、隐藏面板）时直接忽略。
 * 可达性由旁边的滑杆承担：这里只是多一条路，不替代键盘与读屏路径。
 *
 * @param plot - 包含带 data-step 圆点的图容器元素。
 * @param slider - 联动的步进滑杆；赋值后派发 input 交给既有同步逻辑。
 */
export function bindPlotScrub(plot, slider) {
  if (!plot || !slider) return
  let active = false
  const nearestStep = clientX => {
    const marks = plot.querySelectorAll('[data-step]')
    if (marks.length === 0) return null
    const bounds = plot.getBoundingClientRect()
    if (bounds.width === 0) return null
    let best = null
    let bestDistance = Number.POSITIVE_INFINITY
    for (const mark of marks) {
      const box = mark.getBoundingClientRect()
      const distance = Math.abs(box.left + box.width / 2 - clientX)
      if (distance < bestDistance) {
        bestDistance = distance
        best = Number(mark.getAttribute('data-step'))
      }
    }
    return best
  }
  const apply = index => {
    if (index === null) return
    if (index < Number(slider.min) || index > Number(slider.max)) return
    slider.value = String(index)
    slider.dispatchEvent(new (slider?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  plot.addEventListener('pointerdown', event => {
    active = true
    try {
      plot.setPointerCapture(event.pointerId)
    } catch {
      // 某些合成事件的 pointerId 无法捕获；拖动仍在本元素内工作。
    }
    apply(nearestStep(event.clientX))
  })
  plot.addEventListener('pointermove', event => {
    if (active) apply(nearestStep(event.clientX))
  })
  plot.addEventListener('pointerup', () => { active = false })
  plot.addEventListener('pointercancel', () => { active = false })
}

/**
 * 读数拖柄的纯数学：横向像素位移换算成滑杆步数并夹紧到量程。
 * 纯函数，在 Node 里单独测试；DOM 接线在 installNumberScrub。
 */
export function nextScrubValue(current, deltaPixels, { min, max, step = 1, pxPerStep = 6 } = {}) {
  const lo = Number(min)
  const hi = Number(max)
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return current
  const numericStep = Number(step) > 0 ? Number(step) : 1
  const pixelsPerStep = Number(pxPerStep) > 0 ? Number(pxPerStep) : 6
  const steps = Math.round(deltaPixels / pixelsPerStep)
  if (steps === 0) return Number(current)
  return Math.min(hi, Math.max(lo, Number(current) + steps * numericStep))
}

/**
 * 把一个数值读数变成 redblobgames 式的可拖对象：按住左右拖，等价于拨动它旁边的滑杆。
 * 键盘路径不在这里——原生滑杆已有完整键盘支持；本函数只补鼠标/触控的精确操纵，
 * 所以读数保持 <output> 本来的语义，不加 role/tabindex 去制造重复的焦点停靠。
 * 派发的是普通 input 事件：bindAutoAdvance 会把它当作用户操作并暂停连播，符合直觉。
 */
export function installNumberScrub(target, slider) {
  if (!target || !slider) return
  let active = false
  let startX = 0
  let startValue = 0
  const apply = value => {
    if (String(value) === slider.value) return
    slider.value = String(value)
    slider.dispatchEvent(new (slider?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  target.classList.add('lab-scrub-number')
  target.addEventListener('pointerdown', event => {
    if (event.button !== undefined && event.button !== 0) return
    active = true
    startX = event.clientX
    startValue = Number(slider.value)
    try {
      target.setPointerCapture(event.pointerId)
    } catch {
      // 某些合成事件的 pointerId 无法捕获；拖动仍在本元素内工作。
    }
    event.preventDefault()
  })
  target.addEventListener('pointermove', event => {
    if (!active) return
    apply(nextScrubValue(startValue, event.clientX - startX, {
      min: slider.min,
      max: slider.max,
      step: slider.step,
    }))
  })
  target.addEventListener('pointerup', () => { active = false })
  target.addEventListener('pointercancel', () => { active = false })
}

/** 本页所有活跃连播的停机回调；总闸冻结动效时逐一调用。 */
const AUTO_ADVANCE_STOPPERS = new Set()

/**
 * 给时间轴滑块配一个播放按钮：点击在末帧之外连续逐帧推进，再点暂停；
 * 到末帧自动停；用户手动拖动（可信 input 事件）立即暂停。
 * 减少动态效果时不做连续推进，一次点击只走一帧，帧控件保持可用。
 *
 * @param options.stepMs 每帧间隔；按实验节奏给值——读阶段说明的页面慢些，
 *   模拟流式到达的页面快些。不给则用 650ms 的通用值。
 */
export function bindAutoAdvance(playButton, slider, { stepMs = 650, speedSelect = null } = {}) {
  if (playButton.dataset.wired === 'true') return
  playButton.dataset.wired = 'true'
  let timer = 0
  let speed = 1
  const effectiveMs = () => Math.max(Math.round(stepMs / speed), 120)
  const setPlaying = playing => {
    playButton.setAttribute('aria-pressed', String(playing))
    writeText(playButton, playing ? '暂停' : '播放')
  }
  const stop = () => {
    if (timer !== 0) { clearInterval(timer); timer = 0 }
    setPlaying(false)
  }
  const start = () => {
    if (timer !== 0) clearInterval(timer)
    timer = setInterval(() => { if (!stepOnce()) stop() }, effectiveMs())
  }
  // 总闸（installMotionPauseToggle）冻结全页动效时，连播也一并停。
  AUTO_ADVANCE_STOPPERS.add(stop)
  const atEnd = () => !(Number(slider.value) < Number(slider.max))
  // 自己派发的 input 不算用户操作；其余来源（拖动、键盘步进、其它模块）都暂停。
  let selfDispatch = false
  const dispatchInput = () => {
    selfDispatch = true
    slider.dispatchEvent(new (slider?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
    selfDispatch = false
  }
  const stepOnce = () => {
    const next = nextPlayValue(slider.value, slider.min, slider.max, slider.step)
    if (next === null) { stop(); return false }
    slider.value = String(next)
    dispatchInput()
    return true
  }
  playButton.addEventListener('click', () => {
    if (timer !== 0) { stop(); return }
    const endsNow = atEnd()
    if (prefersReducedMotion()) {
      if (endsNow) { slider.value = String(slider.min ?? 0); dispatchInput() }
      stepOnce()
      setPlaying(false)
      return
    }
    if (endsNow) { slider.value = String(slider.min ?? 0); dispatchInput() }
    setPlaying(true)
    start()
  })
  if (speedSelect !== null) {
    speedSelect.addEventListener('change', () => {
      const parsed = Number(speedSelect.value)
      speed = Number.isFinite(parsed) && parsed > 0 ? parsed : 1
      // 播放中换档：立即按新速度重启节拍；暂停中只记住档位。
      if (timer !== 0) start()
    })
  }
  slider.addEventListener('input', () => {
    if (!selfDispatch && timer !== 0) stop()
  })
}

/** 动画总闸偏好的存储键；study-theme-boot.js 在首帧前读同一个键提前冻结。 */
const MOTION_PAUSE_KEY = 'dsh-study-motion'

/**
 * 「暂停动画」总闸：data-motion 置 paused 后，CSS 冻结全部关键帧动画、把过渡时长
 * 归零（见 study-tokens.css），同时停掉本页所有 bindAutoAdvance 连播。
 * 偏好写入 localStorage，后续页面由 study-theme-boot.js 在首次绘制前恢复，
 * 避免先动一帧再停下的闪烁。按钮不存在或已接线时安静返回。
 */
export function installMotionPauseToggle(button = null) {
  const target = button ?? (typeof document === 'undefined' ? null : document.getElementById('motion-toggle'))
  if (target === null || typeof target.addEventListener !== 'function') return
  if (target.dataset.wiredMotion === 'true') return
  target.dataset.wiredMotion = 'true'
  const pausedNow = () => document.documentElement.getAttribute('data-motion') === 'paused'
  const render = () => {
    target.setAttribute('aria-pressed', String(pausedNow()))
    writeText(target, pausedNow() ? '恢复动画' : '暂停动画')
  }
  target.addEventListener('click', () => {
    const nextPaused = !pausedNow()
    if (nextPaused) {
      document.documentElement.setAttribute('data-motion', 'paused')
      // 连播定时器不受 CSS 冻结影响，必须显式停掉；恢复播放由读者再点一次。
      for (const stop of AUTO_ADVANCE_STOPPERS) stop()
    } else {
      document.documentElement.removeAttribute('data-motion')
    }
    try {
      localStorage.setItem(MOTION_PAUSE_KEY, nextPaused ? 'paused' : 'running')
    } catch {
      // 隐私模式拒绝存储时只作用于当前页，切换本身照常工作。
    }
    render()
  })
  render()
}

/*
 * 每个 lab 页都有 #motion-toggle 按钮，而每页脚本都会导入本模块——
 * 在这里统一接线，省去三十个页面各写一遍。无 DOM 的 Node 测试环境跳过。
 */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  const wireWhenReady = () => { installMotionPauseToggle(document.getElementById('motion-toggle')) }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireWhenReady, { once: true })
  } else {
    wireWhenReady()
  }
}

/**
 * 给带 `data-icon` 的元素装上图标。
 *
 * 由标记声明用哪个图标，而不是由脚本按类名猜；这样加一个小节不用改脚本，
 * 而且未知的图标名会安静地保持纯文字，不会渲染出一个空框。
 */
export function installDeclaredIcons(scope = document) {
  for (const target of scope.querySelectorAll('[data-icon]')) {
    prefixIcon(target, target.dataset.icon, Number(target.dataset.iconSize ?? 16))
  }
}

/**
 * 在页面顶部安装滚动进度条。
 *
 * 进度映射由 CSS 的 scroll() 时间轴驱动（见 study-lab-shell.css 的
 * @supports 块）：浏览器支持就显示，不支持或无滚动时保持不可见的零宽条。
 * 纯展示元素，aria-hidden，不参与交互与存储。
 */
export function installScrollProgress() {
  if (document.getElementById('dsh-scroll-progress') !== null) return
  const bar = document.createElement('div')
  bar.id = 'dsh-scroll-progress'
  bar.setAttribute('aria-hidden', 'true')
  document.body.append(bar)
}

/**
 * 「恢复默认输入」：清掉地址栏 #state=，把表单控件拉回 HTML 里写的默认值，再用
 * onReset 让调用方重建一次。重建过程可能把默认值重新写回地址栏，所以收尾时再清一次；
 * file:// 等环境拒绝 replaceState 时保持安静，表单本身照常复位。
 */
export function installInputReset(button, form, { onReset } = {}) {
  // 不用 instanceof：无 DOM 的测试环境没有 HTMLButtonElement 构造器，鸭子类型检查两边都成立。
  if (button === null || button === undefined || typeof button.addEventListener !== 'function') return
  if (form === null || form === undefined || typeof form.reset !== 'function') return
  const clearStateFromUrl = () => {
    try {
      history.replaceState(null, '', location.pathname + location.search)
    } catch {
      // replaceState 在 file:// 下可能被拒；这只影响地址栏整洁度，不影响重置。
    }
  }
  button.addEventListener('click', () => {
    clearStateFromUrl()
    form.reset()
    if (onReset) onReset()
    clearStateFromUrl()
  })
}
/*
 * 卡片聚光（Linear 式微交互的纸面译版）：
 * 指针划过 .card 时把相对坐标写进 --mx/--my，CSS 用 radial-gradient
 * 画一团暖光跟随。事件委托挂在 document 上，全部实验室页一处生效；
 * pointermove 用 requestAnimationFrame 合帧：每帧最多读一次布局、
 * 写一次属性，避免高频移动下的强制同步布局（INP 输入延迟来源）。
 * 无 DOM 的导入环境（纯 Node 测试）不安装。
 */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  let spotlightFrame = 0
  let spotlightEvent = null
  const applySpotlight = () => {
    spotlightFrame = 0
    const event = spotlightEvent
    spotlightEvent = null
    if (event === null || !(event.target instanceof Element)) return
    const card = event.target.closest('.card')
    if (card === null) return
    const box = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${Math.round(event.clientX - box.left)}px`)
    card.style.setProperty('--my', `${Math.round(event.clientY - box.top)}px`)
  }
  document.addEventListener('pointermove', (event) => {
    spotlightEvent = event
    if (spotlightFrame === 0 && typeof requestAnimationFrame === 'function') {
      spotlightFrame = requestAnimationFrame(applySpotlight)
    }
  }, { passive: true })
}
/*
 * 磁吸按钮（Apple/Linear 式微交互）：
 * 指针进入按钮周边半径时，按钮向指针平移距离的 24%（半径线性衰减）；
 * 离开半径即卸掉 translate，由 --ease-spring 弹簧回位。
 * 只在「悬停且细指针」的设备上安装；页面没有按钮时完全不装监听器。
 * pointermove 同样按帧合并：先批量读全部按钮的 rect，再统一写入——
 * 读写分离消灭逐事件 × 逐按钮的强制同步布局（INP 的头号来源）。
 */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function'
  && typeof window.matchMedia === 'function'
  && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && document.querySelector('.button') !== null) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let magnetFrame = 0
  let magnetEvent = null
  const applyMagnet = () => {
    magnetFrame = 0
    const event = magnetEvent
    magnetEvent = null
    if (event === null || reducedMotion.matches) return
    // 读阶段：一次循环拿齐全部 rect；写阶段：一次循环落 translate。
    const boxes = []
    for (const button of document.querySelectorAll('.button')) {
      boxes.push([button, button.getBoundingClientRect()])
    }
    for (const [button, box] of boxes) {
      const dx = event.clientX - (box.left + box.width / 2)
      const dy = event.clientY - (box.top + box.height / 2)
      const distance = Math.hypot(dx, dy)
      const radius = Math.max(box.width, box.height) / 2 + 42
      if (distance < radius) {
        const pull = (1 - distance / radius) * 0.24
        button.style.translate = (dx * pull).toFixed(1) + 'px ' + (dy * pull).toFixed(1) + 'px'
      } else if (button.style.translate !== '') {
        button.style.removeProperty('translate')
      }
    }
  }
  document.addEventListener('pointermove', (event) => {
    magnetEvent = event
    if (magnetFrame === 0 && typeof requestAnimationFrame === 'function') {
      magnetFrame = requestAnimationFrame(applyMagnet)
    }
  }, { passive: true })
}
/*
 * Metric 补间（TF Playground 式实时反馈）：
 * 观察 .metric-grid dd 的文本变化，旧值和新值都可解析为数字时用
 * animateNumber 滚动补间；否则直接写入。自举一次，全部实验室页生效。
 *
 * 实现注记：textContent 赋值产生的是 childList 记录，其 oldValue 恒为 null，
 * 所以旧值由本模块自己用 WeakMap 记账——此前依赖 mutation.oldValue 的版本
 * 两个分支（滚动、闪光）从未触发过。
 */
if (typeof document !== 'undefined' && typeof MutationObserver === 'function') {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const parseNum = text => {
    const cleaned = text.replace(/,/g, '').trim()
    if (/^-?\d+(\.\d+)?$/.test(cleaned)) return parseFloat(cleaned)
    return null
  }
  const lastValues = new WeakMap()
  const metricObserver = new MutationObserver(mutationList => {
    const touched = new Set()
    for (const mutation of mutationList) {
      const node = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement
      const dd = node?.closest('.metric-grid dd')
      if (dd !== null && dd !== undefined) touched.add(dd)
    }
    for (const target of touched) {
      const oldRaw = (lastValues.get(target) ?? '').trim()
      lastValues.set(target, target.textContent ?? '')
      const newRaw = target.textContent?.trim() ?? ''
      if (target.dataset.tweening === 'true') continue
      // 数值变化：数字滚动 + 背景闪光
      const oldNum = parseNum(oldRaw)
      const newNum = parseNum(newRaw)
      if (oldNum !== null && newNum !== null && !reducedMotion.matches && oldNum !== newNum) {
        target.dataset.tweening = 'true'
        animateNumber(target, newNum, { duration: 360 })
        setTimeout(() => { delete target.dataset.tweening }, 400)
      }
      // 非数值文本变化：背景闪光（人性化——让读者注意到值变了）
      if (oldRaw !== newRaw && oldRaw !== '' && newRaw !== '') {
        target.classList.remove('metric-flash')
        void target.offsetWidth // 强制重排以重启动画
        target.classList.add('metric-flash')
      }
    }
  })
  let metricsObserved = false
  const observeMetrics = () => {
    if (metricsObserved) return
    metricsObserved = true
    for (const dd of document.querySelectorAll('.metric-grid dd')) {
      lastValues.set(dd, dd.textContent ?? '')
      metricObserver.observe(dd, { characterData: true, childList: true, subtree: true })
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { observeMetrics() }, { once: true })
  } else {
    observeMetrics()
  }
}

/*
 * 返回顶部浮动按钮：滚动超过两屏后淡入，点击平滑回顶。
 * IntersectionObserver 哨兵放在 body 开头——滚过哨兵即显示按钮。
 * 无 DOM 的导入环境不安装。
 */
if (typeof document !== 'undefined' && typeof IntersectionObserver === 'function') {
  const sentinel = document.createElement('div')
  sentinel.setAttribute('aria-hidden', 'true')
  // 逐属性赋值走 CSSOM，不触发 style-src 'self' 对内联样式的拦截；cssText 会。
  sentinel.style.position = 'absolute'
  sentinel.style.top = '0'
  sentinel.style.height = (window.innerHeight * 2) + 'px'
  sentinel.style.width = '1px'
  sentinel.style.pointerEvents = 'none'
  const btn = document.createElement('a')
  btn.href = '#'
  btn.className = 'back-to-top'
  btn.textContent = '↑'
  btn.setAttribute('aria-label', '返回顶部')
  btn.addEventListener('click', event => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  const observer = new IntersectionObserver(([entry]) => {
    btn.classList.toggle('is-visible', !entry.isIntersecting)
  })
  const mount = () => {
    document.body.prepend(sentinel)
    document.body.append(btn)
    observer.observe(sentinel)
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true })
  } else {
    mount()
  }
}
