/**
 * 实验页共用的内联 SVG 图标。
 *
 * 替换原来写在 CSS `content` 里的 `✓` / `✕` 文字字形。字形当图标有三个实际问题：
 * 跨平台字重和基线不一致；部分系统会落到 emoji 字体渲染成彩色，那会覆盖语义配色；
 * 写在 `content` 里是否被朗读因实现而异。
 *
 * 图标一律 `aria-hidden`，语义由旁边的文字标签承担——图标只加快扫读，不携带信息。
 * 去掉全部图标后页面信息量不变，这是本模块的设计前提。
 *
 * 全部用 `currentColor` 描边，所以配色跟随所在容器，不引入第二套颜色。
 */

const VIEW_BOX = '0 0 24 24'

/** 描边路径，24×24 网格。填充只用在小尺寸下需要实心才认得出的地方。 */
const PATHS = {
  check: ['M4.5 12.6 9.4 17.5 19.5 6.9'],
  cross: ['M6.2 6.2 17.8 17.8', 'M17.8 6.2 6.2 17.8'],
  beaker: ['M8.4 3.5h7.2', 'M9.6 3.5v6.1L5.6 18a2 2 0 0 0 1.8 2.9h9.2A2 2 0 0 0 18.4 18l-4-8.4V3.5', 'M7 14.5h10'],
  timeline: ['M3.5 6.5h9', 'M3.5 12h17', 'M3.5 17.5h13', 'M15.5 6.5h5'],
  table: ['M3.5 4.5h17v15h-17z', 'M3.5 9.5h17', 'M9.5 9.5v10', 'M15 9.5v10'],
  shield: ['M12 3.2 20 6v6.3c0 4.3-3.2 7-8 8.5-4.8-1.5-8-4.2-8-8.5V6z'],
  alert: ['M12 3.6 21.4 20H2.6z', 'M12 9.4v4.6', 'M12 16.8v.2'],
  fileDown: ['M6 3.5h7l5 5v12H6z', 'M13 3.5v5h5', 'M12 11.4v5.4', 'M9.4 14.2 12 16.8l2.6-2.6'],
  fileUp: ['M6 3.5h7l5 5v12H6z', 'M13 3.5v5h5', 'M12 16.8v-5.4', 'M9.4 14 12 11.4l2.6 2.6'],
  cube: ['M12 3 20.5 7.6v8.8L12 21l-8.5-4.6V7.6z', 'M3.5 7.6 12 12.2l8.5-4.6', 'M12 12.2V21'],
  layers: ['M12 3.4 21 8l-9 4.6L3 8z', 'M3 12.6 12 17.2l9-4.6', 'M3 17.2 12 21.8l9-4.6'],
  lock: ['M6.6 10.6h10.8v9.8H6.6z', 'M9 10.6V7.8a3 3 0 0 1 6 0v2.8', 'M12 14.4v2.4'],
  route: ['M6 20V9.4a3.4 3.4 0 0 1 3.4-3.4h5.2', 'M12.2 3.2 15.4 6l-3.2 2.8', 'M6 20h12'],
  gauge: ['M3.8 17.4a9 9 0 1 1 16.4 0', 'M12 17.4 16.2 9.8'],
}

/** 需要实心才能在 16px 下认出来的图标。 */
const FILLED = new Set(['shield'])

export const ICON_NAMES = Object.keys(PATHS)

/**
 * 造一个内联图标元素。
 *
 * @param name PATHS 里的键；未知名字返回 null，让调用方保持纯文字。
 * @param size 边长，单位 px。
 * @returns 可直接插入的 SVG 元素，或 null。
 */
export function icon(name, size = 16) {
  const paths = PATHS[name]
  if (paths === undefined) return null
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', VIEW_BOX)
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.75')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
  svg.classList.add('icon', 'icon-' + name)
  for (const definition of paths) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', definition)
    if (FILLED.has(name)) {
      path.setAttribute('fill', 'currentColor')
      path.setAttribute('fill-opacity', '0.16')
    }
    svg.append(path)
  }
  return svg
}

/**
 * 把图标放在元素最前面，图标后留一个间距容器。
 * 已经有图标的元素不重复插入，所以重渲染是幂等的。
 */
export function prefixIcon(target, name, size = 16) {
  if (target === null || target.querySelector(':scope > svg.icon') !== null) return
  const svg = icon(name, size)
  if (svg === null) return
  target.prepend(svg)
  target.classList.add('has-icon')
}
