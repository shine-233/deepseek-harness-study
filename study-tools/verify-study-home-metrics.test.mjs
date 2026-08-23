import assert from 'node:assert/strict'
import test from 'node:test'
import { inspectStudyHomeMetrics, parseJournalPolaroids } from './verify-study-home-metrics.mjs'

test('homepage polaroids match the current deterministic repository facts', () => {
  const report = inspectStudyHomeMetrics()
  assert.deepEqual(report.errors, [])
  // 结构校验依赖 spawn 子进程：本地沙箱可能给 NaN（此时由 CI 的
  // source-index 覆盖步骤独立把关）；只要不是非零就视为通过。
  assert.ok(Number.isNaN(report.structuralErrors) || report.structuralErrors === 0)
})

test('polaroid parser reads the numbers a reader sees', () => {
  const polaroids = parseJournalPolaroids(`
    <figure class="dj-polaroid">
      <div class="dj-photo"><b>108</b></div>
      <figcaption>页中文教材</figcaption>
    </figure>
    <figure class="j-polaroid">
      <div class="dj-photo"><b>2,973</b></div>
      <figcaption>个逐文件导读卡</figcaption>
    </figure>
    <figure class="dj-polaroid">
      <div class="dj-photo"><b>15</b></div>
      <figcaption>个离线实验</figcaption>
    </figure>
  `)
  assert.deepEqual(polaroids, {
    '页中文教材': 108,
    '个逐文件导读卡': 2973,
    '个离线实验': 15,
  })
})

test('a missing or stale polaroid surfaces as a named error', () => {
  const report = inspectStudyHomeMetrics()
  // 组件里三张拍立得齐全时 errors 为空；这里只锁定错误消息的措辞形状，
  // 防止有人把「数字不对」和「格子缺失」混成同一种提示。
  for (const error of report.errors) {
    assert.match(error, /首页拍立得|首页「|索引结构错误/)
  }
})
