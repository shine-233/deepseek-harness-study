import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'

const source = () => readFileSync(
  new URL('../website/public/study-progress.js', import.meta.url), 'utf8')

test('bug regression: the SPA observer only re-initializes when the pathname changes', () => {
  const src = source()
  // 守卫必须在移除/重建之前短路：自己的重建、伴侣与宠物面板的 DOM 更新
  // 都是 childList 变更，没有 pathname 比较就会自触发，自测题无限堆积
  // （实测 30 秒堆出 67 份）。
  assert.match(src, /if \(location\.pathname === initializedPath\) return/)
  assert.match(src, /document\.getElementById\(WIDGET_ID\)\?\.\s*remove\(\)/)
  // initializedPath 必须在首初始化后落定，否则首次自变更就会重入。
  assert.match(src, /initializedPath = location\.pathname/)
})

test('bug regression: non-lesson routes still remove the pill', () => {
  const src = source()
  // 守卫 return 之前先移除 pill：从课程页导航到实验室时 pill 不能残留。
  const guardIdx = src.indexOf('if (location.pathname === initializedPath) return')
  const removeIdx = src.indexOf("document.getElementById(WIDGET_ID)?.remove()", guardIdx)
  assert.ok(removeIdx > guardIdx, 'remove 必须发生在 pathname 守卫之后')
})
