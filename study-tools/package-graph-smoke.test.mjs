/**
 * 包依赖图实验页的 jsdom 冒烟测试。
 *
 * lab 契约测试只读源码文本；这里把页面真正初始化一遍：元素查询、事件接线、
 * fixture 载入、键控渲染、排序、联动高亮和缩放按钮都要走通。失败路径单独
 * 验证——fixture 读不到时必须留下明确的错误说明，而不是静默空白。
 *
 * 浏览器专属能力（布局、getScreenCTM、真实指针命中）仍属 unknown，
 * 由 lesson 33 的浏览器走查覆盖；本测试钉住的是「逻辑在无头环境也成立」。
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(new URL('../package.json', import.meta.url))
const { JSDOM } = require('jsdom')

const LAB_URL = new URL('../website/public/package-graph-lab.js', import.meta.url)
const LAB_HTML = readFileSync(new URL('../website/public/package-graph-lab.html', import.meta.url), 'utf8')
const FIXTURE = JSON.parse(readFileSync(new URL('../website/public/package-graph.json', import.meta.url), 'utf8'))

/** 实验页在 import 时就读全局 DOM 对象；Node 的 globalThis 上原本没有它们。 */
function installDom() {
  const dom = new JSDOM(LAB_HTML, { url: 'https://study.test/deepseek-harness-study/package-graph-lab.html' })
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
    location: dom.window.location,
    history: dom.window.history,
    getComputedStyle: dom.window.getComputedStyle.bind(dom.window),
    requestAnimationFrame: callback => setTimeout(() => callback(performance.now()), 0),
    cancelAnimationFrame: id => clearTimeout(id),
    DOMPoint: dom.window.DOMPoint,
    Event: dom.window.Event,
    MouseEvent: dom.window.MouseEvent,
    Element: dom.window.Element,
    HTMLElement: dom.window.HTMLElement,
    SVGElement: dom.window.SVGElement,
  })
  if (typeof globalThis.CSS?.escape !== 'function') {
    // 冒烟用不到完整转义规则；包目录名不含引号和反斜杠，这两个替换足够安全。
    globalThis.CSS = { escape: value => String(value).replace(/["\\]/g, '\\$&') }
  }
  return dom
}

async function waitFor(predicate, timeoutMs = 1500) {
  const start = Date.now()
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) throw new Error('waitFor 超时')
    await new Promise(resolve => setTimeout(resolve, 10))
  }
}

test('package-graph lab initializes, renders the real fixture, and its controls work', async () => {
  // ---- 失败路径：fixture 读不到要给明确错误，而不是静默空白。 ----
  installDom()
  globalThis.fetch = async () => ({ ok: false, status: 404 })
  await import(LAB_URL.href + '?case=fail')
  await waitFor(() => document.querySelector('#graph-feedback')?.textContent.includes('读不到'))
  assert.match(
    document.querySelector('#graph-feedback').textContent,
    /读不到 package-graph\.json/,
    'fixture 失败必须留下可行动的错误说明',
  )

  // ---- 成功路径：真实 fixture 全量渲染。 ----
  installDom()
  globalThis.fetch = async () => ({ ok: true, json: async () => FIXTURE })
  await import(LAB_URL.href + '?case=ok')
  await waitFor(() => document.querySelectorAll('#graph-table-body tr').length > 0)

  const packages = FIXTURE.totals.packages
  assert.equal(document.querySelectorAll('#graph-table-body tr').length, packages, '表格行数等于包总数')
  assert.equal(document.querySelector('#metric-oracle').textContent.trim(), '通过', 'oracle 必须全绿')

  const circles = [...document.querySelectorAll('#scatter-plot circle.point')]
  assert.equal(circles.length, packages, '散点数量等于包总数')
  assert.ok(circles.every(circle => typeof circle.dataset.tip === 'string' && circle.dataset.tip.includes('行')),
    '每个点都带自绘提示的数据')

  // ---- 排序三态循环：降序 -> 升序 -> 模型顺序。 ----
  const sortButtons = [...document.querySelectorAll('#graph-table-head button.sort-key')]
  const linesButton = sortButtons.find(button => button.dataset.key === 'srcLines')
  const linesTh = linesButton.closest('th')
  const byLinesDesc = [...FIXTURE.nodes].sort((a, b) => b.srcLines - a.srcLines)
  linesButton.click()
  assert.equal(linesTh.getAttribute('aria-sort'), 'descending')
  assert.equal(document.querySelector('#graph-table-body tr').dataset.id, byLinesDesc[0].id)
  linesButton.click()
  assert.equal(linesTh.getAttribute('aria-sort'), 'ascending')
  assert.equal(document.querySelector('#graph-table-body tr').dataset.id, byLinesDesc.at(-1).id)
  linesButton.click()
  assert.equal(linesTh.getAttribute('aria-sort'), 'none', '第三次点击回到模型顺序')
  assert.equal(document.querySelectorAll('#graph-table-body tr').length, packages)

  // ---- 联动高亮：散点悬停点亮表格行，离开后熄灭。 ----
  const probeCircle = circles.find(circle => circle.getAttribute('data-reveal') === undefined)
    ?? circles[0]
  const probeId = probeCircle.getAttribute('data-id')
  probeCircle.dispatchEvent(new Event('pointerover', { bubbles: true }))
  assert.ok(probeCircle.classList.contains('is-linked'), '散点自身高亮')
  assert.ok(
    document.querySelector(`#graph-table-body tr[data-id="${probeId}"]`).classList.contains('is-linked'),
    '表格对应行同时高亮',
  )
  document.querySelector('#scatter-plot').dispatchEvent(new Event('pointerleave', { bubbles: false }))
  assert.ok(!probeCircle.classList.contains('is-linked'), '离开后熄灭')

  // ---- 缩放按钮改 viewBox，重置恢复全貌。 ----
  const scatterSvg = document.querySelector('#scatter-plot svg')
  const fittedViewBox = scatterSvg.getAttribute('viewBox')
  document.querySelector('#plot-zoom-in').click()
  assert.notEqual(scatterSvg.getAttribute('viewBox'), fittedViewBox, '放大改变 viewBox')
  document.querySelector('#plot-zoom-reset').click()
  assert.equal(scatterSvg.getAttribute('viewBox'), fittedViewBox, '重置回到全貌')

  // ---- 筛到小组后柱视图出现，且行数与选项标注一致。 ----
  // 选项按包数降序排列，第一个是最大组；柱视图在超过 24 个包时按契约拒绝渲染，
  // 所以这里必须挑最小的组。
  const groupSelect = document.querySelector('#group')
  const groupOptions = [...groupSelect.options]
    .filter(option => option.value !== 'all')
    .map(option => ({ option, size: Number(option.textContent.match(/（(\d+) 包）/)[1]) }))
  const smallest = groupOptions.reduce((a, b) => (a.size <= b.size ? a : b))
  groupSelect.value = smallest.option.value
  groupSelect.dispatchEvent(new Event('change', { bubbles: true }))
  await waitFor(() => document.querySelectorAll('#bar-plot rect.bar').length > 0)
  assert.equal(document.querySelectorAll('#bar-plot rect.bar').length, smallest.size)
})
