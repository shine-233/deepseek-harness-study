/**
 * 四个学习实验页共用的渲染工具。
 *
 * 只放渲染辅助：SVG 构造、文本写入、列表替换、oracle 列表和证据边界的渲染。
 * 这里不含任何模型逻辑——每个实验的模型、observations 和 oracle 都在自己的
 * `*-model.js` 里，是纯函数，可以在 Node 下单独测试。
 */

import { prefixIcon } from './study-lab-icons.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

/** 一律用 textContent 赋值：导入的字符串永远当文本，不当标记。 */
export function writeText(target, value) {
  target.textContent = String(value)
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
    slider.dispatchEvent(new Event('input', { bubbles: true }))
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
 * 给时间轴滑块配一个播放按钮：点击在末帧之外连续逐帧推进，再点暂停；
 * 到末帧自动停；用户手动拖动（可信 input 事件）立即暂停。
 * 减少动态效果时不做连续推进，一次点击只走一帧，帧控件保持可用。
 *
 * @param options.stepMs 每帧间隔；按实验节奏给值——读阶段说明的页面慢些，
 *   模拟流式到达的页面快些。不给则用 650ms 的通用值。
 */
export function bindAutoAdvance(playButton, slider, { stepMs = 650 } = {}) {
  let timer = 0
  const setPlaying = playing => {
    playButton.setAttribute('aria-pressed', String(playing))
    writeText(playButton, playing ? '暂停' : '播放')
  }
  const stop = () => {
    if (timer !== 0) { clearInterval(timer); timer = 0 }
    setPlaying(false)
  }
  const atEnd = () => !(Number(slider.value) < Number(slider.max))
  // 自己派发的 input 不算用户操作；其余来源（拖动、键盘步进、其它模块）都暂停。
  let selfDispatch = false
  const dispatchInput = () => {
    selfDispatch = true
    slider.dispatchEvent(new Event('input', { bubbles: true }))
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
    timer = setInterval(() => { if (!stepOnce()) stop() }, Math.max(stepMs, 120))
  })
  slider.addEventListener('input', () => {
    if (!selfDispatch && timer !== 0) stop()
  })
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