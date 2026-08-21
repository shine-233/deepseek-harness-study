/**
 * 包依赖图实验页的渲染层。
 *
 * 模型在 package-graph-model.js；本文件只把返回值画出来，不推导数字。数据从
 * 同源的 study fixture 取，所以页面 CSP 允许 connect-src 'self'——这是本页与
 * 其他实验页的唯一差别，也是它需要一次 fetch 的原因。
 */

import { icon, prefixIcon } from './study-lab-icons.js'
import { revealOnScroll } from './study-lab-reveal.js'
import {
  BAR_VIEW_MAX_NODES,
  buildPackageGraphModel,
  evaluatePackageGraphOracle,
} from './package-graph-model.js'

import { installThemeToggle } from './study-lab-theme.js'

const FIXTURE_URL = './package-graph.json'
const SVG_NS = 'http://www.w3.org/2000/svg'

function writeText(target, value) {
  target.textContent = String(value)
}

function svgElement(name, attributes = {}, textValue = null) {
  const element = document.createElementNS(SVG_NS, name)
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value))
  if (textValue !== null) writeText(element, textValue)
  return element
}

function replaceList(target, values, emptyMessage) {
  target.replaceChildren()
  for (const value of values.length === 0 ? [emptyMessage] : values) {
    const item = document.createElement('li')
    writeText(item, value)
    target.append(item)
  }
}

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

function renderScatter(model, target, note) {
  const width = plotWidth(target)
  const height = 460
  const left = 76
  const right = 34
  const top = 30
  const bottom = 62
  target.replaceChildren()

  if (model.nodes.length === 0) {
    writeText(note, '当前筛选没有包。')
    return
  }

  const maxLines = Math.max(...model.nodes.map(node => node.srcLines), 10)
  const maxDegree = Math.max(...model.nodes.map(node => node.dependedOnBy), 1)
  const xFor = lines => left + (logScale(lines) / logScale(maxLines)) * (width - left - right)
  const yFor = degree => height - bottom - (degree / maxDegree) * (height - top - bottom)

  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
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

  for (const power of [1, 2, 3, 4]) {
    const value = 10 ** power
    if (value > maxLines * 1.4) continue
    const x = xFor(value)
    svg.append(
      svgElement('line', { x1: x, y1: top, x2: x, y2: height - bottom, class: 'grid' }),
      svgElement('text', { x, y: height - bottom + 20, class: 'axis', 'text-anchor': 'middle' },
        value >= 1000 ? String(value / 1000) + 'k' : String(value)),
    )
  }
  const degreeStep = Math.max(1, Math.ceil(maxDegree / 5))
  for (let degree = 0; degree <= maxDegree; degree += degreeStep) {
    const y = yFor(degree)
    svg.append(
      svgElement('line', { x1: left, y1: y, x2: width - right, y2: y, class: 'grid' }),
      svgElement('text', { x: left - 12, y: y + 4, class: 'axis', 'text-anchor': 'end' }, String(degree)),
    )
  }
  svg.append(
    svgElement('text', { x: (left + width - right) / 2, y: height - 16, class: 'axis-title', 'text-anchor': 'middle' },
      'src 行数（对数刻度）'),
    svgElement('text', {
      x: 18, y: (top + height - bottom) / 2, class: 'axis-title', 'text-anchor': 'middle',
      transform: 'rotate(-90 18 ' + String((top + height - bottom) / 2) + ')',
    }, '被依赖次数'),
  )

  // 只给角上的包直接标名字：最大、最被依赖，以及“大而少被依赖”“小而多被依赖”
  // 两个反例。每个点都标名字会糊成一片。
  // 第三维用面积编码，不用第三个空间轴：可旋转的 3D 散点有遮挡、透视让位置失真、
  // 没有共享基线，读数比二维差。面积按平方根映射，因为人眼比较的是面积而不是半径。
  const maxOut = Math.max(...model.nodes.map(node => node.dependsOnWithinView ?? 0), 1)
  const radiusFor = (node) => {
    const share = (node.dependsOnWithinView ?? 0) / maxOut
    return 4 + Math.sqrt(share) * 7
  }

  const labelled = new Set()
  const byLines = [...model.nodes].sort((a, b) => b.srcLines - a.srcLines)
  const byDegree = [...model.nodes].sort((a, b) => b.dependedOnBy - a.dependedOnBy)
  for (const node of [byLines[0], byDegree[0]]) if (node !== undefined) labelled.add(node.id)
  const bigLowDegree = byLines.find(node => node.dependedOnBy <= maxDegree * 0.05)
  const smallHighDegree = byDegree.find(node => node.srcLines <= maxLines * 0.1)
  for (const node of [bigLowDegree, smallHighDegree]) if (node !== undefined) labelled.add(node.id)

  for (const node of model.nodes) {
    const x = xFor(node.srcLines)
    const y = yFor(node.dependedOnBy)
    const isHub = model.observations.hubs.includes(node.id)
    const point = svgElement('circle', {
      cx: x, cy: y, r: radiusFor(node).toFixed(2),
      class: 'point' + (isHub ? ' is-hub' : ''),
      'data-id': node.id,
      'data-reveal': '',
    })
    point.append(svgElement('title', {},
      node.id + '：' + String(node.srcLines) + ' 行，被 ' + String(node.dependedOnBy)
      + ' 个包依赖，本视图内依赖了 ' + String(node.dependsOnWithinView ?? 0) + ' 个包'))
    svg.append(point)
    if (labelled.has(node.id)) {
      const toLeft = x > width * 0.72
      const anchorX = toLeft ? x - 13 : x + 13
      const labelX = toLeft ? x - 34 : x + 34
      // A ring plus a leader line makes the annotated point findable among 219
      // dots; the label alone reads as one more piece of axis furniture.
      svg.append(
        svgElement('circle', { cx: x, cy: y, r: (radiusFor(node) + 5).toFixed(2), class: 'point-ring' }),
        svgElement('line', { x1: anchorX, y1: y, x2: labelX, y2: y, class: 'point-leader' }),
        svgElement('text', {
          x: labelX + (toLeft ? -4 : 4), y: y + 4, class: 'point-label',
          'text-anchor': toLeft ? 'end' : 'start',
        }, node.id),
      )
    }
  }

  target.append(svg)
  revealOnScroll(target)

  const biggest = model.observations.biggest
  const most = model.observations.mostDepended
  writeText(note, biggest === null || most === null
    ? ''
    : '本视图里最大的包是 ' + biggest.id + '（' + String(biggest.srcLines) + ' 行，被依赖 '
      + String(biggest.dependedOnBy) + '），最被依赖的是 ' + most.id + '（'
      + String(most.srcLines) + ' 行，被依赖 ' + String(most.dependedOnBy)
      + '）。两者是否是同一个包，就是这张图要回答的问题。')
}

function renderBars(model, target, note) {
  target.replaceChildren()
  if (!model.barViewAvailable) {
    writeText(note, '当前视图有 ' + String(model.nodes.length) + ' 个包，超过 '
      + String(BAR_VIEW_MAX_NODES) + ' 个就不画柱视图；请先按组筛选，或直接读下面的表格。')
    return
  }

  const nodes = model.nodes
  const width = Math.max(plotWidth(target), 96 + nodes.length * 96)
  const height = 380
  const left = 64
  const bottom = 96
  const top = 26
  const maxLines = Math.max(...nodes.map(node => node.srcLines), 10)
  const maxDegree = Math.max(...nodes.map(node => node.dependedOnBy), 1)
  const slot = (width - left - 32) / nodes.length
  const barWidth = Math.min(58, slot * 0.62)
  const xFor = index => left + slot * index + (slot - barWidth) / 2
  const heightFor = lines => (lines / maxLines) * (height - top - bottom)

  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
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
    x1: left, y1: height - bottom, x2: width - 20, y2: height - bottom, class: 'baseline',
  }))

  for (const [index, node] of nodes.entries()) {
    const barHeight = Math.max(2, heightFor(node.srcLines))
    const x = xFor(index)
    const y = height - bottom - barHeight
    // 边框粗细承载入度：1px 表示零入度，最粗 6px 表示本视图里最高的入度。
    const stroke = 1 + (node.dependedOnBy / maxDegree) * 5
    const bar = svgElement('rect', {
      x, y, width: barWidth, height: barHeight, rx: 4,
      class: 'bar' + (model.observations.hubs.includes(node.id) ? ' is-hub' : ''),
      'stroke-width': stroke.toFixed(2),
      'data-id': node.id,
      'data-reveal': '',
    })
    bar.append(svgElement('title', {},
      node.id + '：' + String(node.srcLines) + ' 行，被 ' + String(node.dependedOnBy) + ' 个包依赖'))
    svg.append(
      bar,
      svgElement('text', { x: x + barWidth / 2, y: y - 8, class: 'bar-value', 'text-anchor': 'middle' },
        String(node.srcLines)),
      svgElement('text', {
        x: x + barWidth / 2, y: height - bottom + 16, class: 'bar-label', 'text-anchor': 'end',
        transform: 'rotate(-38 ' + String(x + barWidth / 2) + ' ' + String(height - bottom + 16) + ')',
      }, node.directory),
      svgElement('text', { x: x + barWidth / 2, y: height - 18, class: 'bar-degree', 'text-anchor': 'middle' },
        '←' + String(node.dependedOnBy)),
    )
  }

  target.append(svg)
  revealOnScroll(target)
  writeText(note, '柱底下的 ←n 是被依赖次数，也就是边框粗细对应的数字；组内边 '
    + String(model.observations.edgesWithinView) + ' 条，其余依赖指向组外。')
}

function renderTable(model, tableBody, caption) {
  tableBody.replaceChildren()
  for (const node of model.nodes) {
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
  writeText(caption, '当前视图的全部包，共 ' + String(model.nodes.length) + ' 行（固定提交 '
    + model.commit.slice(0, 10) + '）')
}

function renderOracle(verdict, list, badge) {
  writeText(badge, verdict.pass ? 'PASS' : 'FAIL')
  badge.dataset.pass = String(verdict.pass)
  list.replaceChildren()
  for (const check of verdict.checks) {
    const item = document.createElement('li')
    item.dataset.pass = String(check.pass)
    const title = document.createElement('strong')
    const detail = document.createElement('span')
    writeText(title, (check.pass ? 'PASS · ' : 'FAIL · ') + check.label)
    writeText(detail, 'expected: ' + check.expected + '；actual: ' + check.actual)
    prefixIcon(title, check.pass ? 'check' : 'cross')
    item.append(title, detail)
    list.append(item)
  }
}

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
  const scatter = document.querySelector('#scatter-plot')
  const scatterNote = document.querySelector('#scatter-note')
  const bars = document.querySelector('#bar-plot')
  const barNote = document.querySelector('#bar-note')
  const tableBody = document.querySelector('#graph-table-body')
  const tableCaption = document.querySelector('#table-caption')
  const oracleList = document.querySelector('#oracle-list')
  const canProveList = document.querySelector('#can-prove-list')
  const cannotProveList = document.querySelector('#cannot-prove-list')
  const provenance = document.querySelector('#footer-provenance')
  const metrics = {
    packages: document.querySelector('#metric-packages'),
    edges: document.querySelector('#metric-edges'),
    lines: document.querySelector('#metric-lines'),
    leaves: document.querySelector('#metric-leaves'),
    oracle: document.querySelector('#metric-oracle'),
  }
  const required = [
    form, groupInput, sortInput, feedback, scatter, scatterNote, bars, barNote,
    tableBody, tableCaption, oracleList, canProveList, cannotProveList, provenance,
    ...Object.values(metrics),
  ]
  if (required.some(value => !(value instanceof HTMLElement))) return

  const setFeedback = (message, tone = 'neutral') => {
    feedback.dataset.tone = tone
    writeText(feedback, message)
  }

  let fixture = null
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

  groupInput.replaceChildren()
  const all = document.createElement('option')
  all.value = 'all'
  writeText(all, '全部 ' + String(fixture.totals.packages) + ' 个包')
  groupInput.append(all)
  const counts = new Map()
  for (const node of fixture.nodes) counts.set(node.group, (counts.get(node.group) ?? 0) + 1)
  for (const group of [...counts.keys()].sort((left, right) => counts.get(right) - counts.get(left) || left.localeCompare(right))) {
    const option = document.createElement('option')
    option.value = group
    writeText(option, group + '（' + String(counts.get(group)) + ' 包）')
    groupInput.append(option)
  }
  // 打开页面第一眼就该是全貌；core 只有 2 个可见点，剩下是空白。
  groupInput.value = 'all'

  writeText(provenance, '固定提交 ' + fixture.commit.slice(0, 10) + ' · 纯函数模型 · 独立 oracle · 完整表格替代')

  const rebuild = () => {
    try {
      const model = buildPackageGraphModel(fixture, {
        group: groupInput.value,
        sort: sortInput.value,
        minLines: Number(minLinesInput?.value ?? 0),
      })
      renderScatter(model, scatter, scatterNote)
      renderBars(model, bars, barNote)
      renderTable(model, tableBody, tableCaption)
      replaceList(canProveList, model.canProve, '没有 canProve 声明。')
      replaceList(cannotProveList, model.cannotProve, '没有 cannotProve 声明。')
      for (const [list, iconName] of [[canProveList, 'check'], [cannotProveList, 'cross']]) {
        const heading = list.closest('div, section')?.querySelector('h3')
        if (heading !== null && heading !== undefined) prefixIcon(heading, iconName)
      }
      writeText(metrics.packages, String(model.observations.packages))
      writeText(metrics.edges, String(model.observations.edgesWithinView))
      writeText(metrics.lines, model.observations.srcLines.toLocaleString('en-US'))
      writeText(metrics.leaves, String(model.observations.leaves))
      setFeedback('已从固定提交读数重建视图：' + String(model.observations.packages)
        + ' 个包，视图内 ' + String(model.observations.edgesWithinView) + ' 条依赖边。', 'success')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '视图输入无效。', 'error')
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    rebuild()
  })
  groupInput.addEventListener('change', rebuild)
  sortInput.addEventListener('change', rebuild)
  rebuild()
}

if (typeof document !== 'undefined') {
  void initializePage()
  installDeclaredIcons()
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))
}
