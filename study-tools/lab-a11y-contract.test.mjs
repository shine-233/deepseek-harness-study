/**
 * 实验页的无障碍与运行契约。
 *
 * 这些是能在 Node 里确定性检查的部分：viewport、语言、reduced-motion 依赖闭包、
 * canvas 的替代数据、原生键盘控件和桥接页的显式文件边界。真实浏览器的走查
 * （焦点顺序、屏幕阅读器、窄屏溢出）仍是单独的 unknown，见 lesson 33 与 HANDOFF。
 */

import { strict as assert } from 'node:assert'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)

function labPages() {
  return readdirSync(PUBLIC_DIR).filter(name => name.endsWith('.html')).sort()
}

function pageSource(file) {
  return readFileSync(new URL(file, PUBLIC_DIR), 'utf8')
}

test('every lab page declares a mobile viewport and Chinese language', () => {
  for (const file of labPages()) {
    const html = pageSource(file)
    assert.match(html, /<meta[^>]+name="viewport"[^>]+content="width=device-width/, `${file} 缺少 viewport`)
    assert.match(html, /<html[^>]*lang="zh-CN"/, `${file} 缺少 lang 声明`)
  }
})

test('every lab page pulls in a stylesheet that honours prefers-reduced-motion', () => {
  const honoured = new Set(
    readdirSync(PUBLIC_DIR)
      .filter(name => name.endsWith('.css'))
      .filter(name => readFileSync(new URL(name, PUBLIC_DIR), 'utf8').includes('prefers-reduced-motion')),
  )
  assert.ok(honoured.size > 0, '没有任何样式表处理 prefers-reduced-motion')

  for (const file of labPages()) {
    const html = pageSource(file)
    const linkedStylesheets = [...html.matchAll(/href="\.\/([^"]+\.css)"/g)].map(match => match[1])
    assert.ok(linkedStylesheets.length > 0, `${file} 没有链接任何样式表`)
    const covered = linkedStylesheets.some(name => honoured.has(name))
    assert.ok(covered, `${file} 链接的样式表都不处理 prefers-reduced-motion：${linkedStylesheets.join(', ')}`)
  }
})

test('every canvas carries an accessible name and the page keeps a data table', () => {
  for (const file of labPages()) {
    const html = pageSource(file)
    const canvases = [...html.matchAll(/<canvas\b[^>]*>/g)]
    for (const canvas of canvases) {
      assert.match(canvas[0], /aria-label=/, `${file} 的 canvas 缺少 aria-label`)
    }
    if (canvases.length > 0) {
      assert.ok(html.includes('<table'), `${file} 有 canvas 但没有表格回退`)
    }
  }
})

test('lab pages stay keyboard-operable through native controls only', () => {
  for (const file of labPages()) {
    const html = pageSource(file)
    const nativeControls = ['<button', '<select', '<input', '<a href'].some(marker => html.includes(marker))
    assert.ok(nativeControls, `${file} 没有任何原生可聚焦控件`)
    assert.doesNotMatch(html, /tabindex="[1-9]/, `${file} 使用了正 tabindex，会打乱焦点顺序`)
  }
})

test('the research-debug bridge keeps its explicit-file-only boundary', () => {
  const html = pageSource('research-debug-bridge.html')
  assert.match(html, /type="file"/, '桥接页必须用文件选择控件接收证据')
  const script = readFileSync(new URL('research-debug-bridge.js', PUBLIC_DIR), 'utf8')
  for (const forbidden of ['fetch(', 'XMLHttpRequest', 'new WebSocket', 'localStorage', 'sessionStorage', 'indexedDB']) {
    assert.ok(!script.includes(forbidden), `桥接脚本出现了 ${forbidden}`)
  }
})
