/**
 * 四个学习实验页共用的渲染工具。
 *
 * 只放渲染辅助：SVG 构造、文本写入、列表替换、oracle 列表和证据边界的渲染。
 * 这里不含任何模型逻辑——每个实验的模型、observations 和 oracle 都在自己的
 * `*-model.js` 里，是纯函数，可以在 Node 下单独测试。
 */

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

/** oracle 每一条都给出 expected 和 actual，页面不替它总结成一个颜色。 */
export function renderOracle(verdict, list, badge) {
  if (badge !== null && badge !== undefined) {
    writeText(badge, verdict.pass ? 'PASS' : 'FAIL')
    badge.dataset.pass = String(verdict.pass)
  }
  list.replaceChildren()
  for (const check of verdict.checks) {
    const item = document.createElement('li')
    item.dataset.pass = String(check.pass)
    const title = document.createElement('strong')
    const detail = document.createElement('span')
    writeText(title, (check.pass ? 'PASS · ' : 'FAIL · ') + check.label)
    writeText(detail, 'expected: ' + check.expected + '；actual: ' + check.actual)
    item.append(title, detail)
    list.append(item)
  }
}

export function renderBoundary(model, canProveList, cannotProveList) {
  replaceList(canProveList, model.canProve, '没有 canProve 声明。')
  replaceList(cannotProveList, model.cannotProve, '没有 cannotProve 声明。')
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
