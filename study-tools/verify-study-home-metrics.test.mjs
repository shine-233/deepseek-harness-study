import assert from 'node:assert/strict'
import test from 'node:test'
import { inspectStudyHomeMetrics, parseHomeMetrics, parseRenderedMetrics } from './verify-study-home-metrics.mjs'

test('homepage metrics match the current deterministic repository facts', () => {
  const report = inspectStudyHomeMetrics()
  assert.deepEqual(report.errors, [])
  assert.equal(report.actual['structural-errors'], 0)
})

test('homepage metric parser accepts comma-separated counts', () => {
  assert.deepEqual(parseHomeMetrics(`
    <div data-study-pages="103" data-index-files="2,756" data-learning-tests="20" data-example-tests="8" data-structural-errors="0"></div>
  `), {
    'study-pages': 103,
    'index-files': 2756,
    'learning-tests': 20,
    'example-tests': 8,
    'structural-errors': 0,
  })
})

test('rendered metric parser reads the numbers a reader sees', () => {
  const rendered = parseRenderedMetrics(`
<div class="dsh-status-strip" data-study-pages="106">
  <div class="dsh-status-metric">
    <strong>106</strong>
    <span>中文学习页面</span>
  </div>
  <div class="dsh-status-metric">
    <strong>2,756</strong>
    <span>逐文件索引</span>
  </div>
  <div class="dsh-status-metric">
    <strong>126 + 8</strong>
    <span>学习工具 / 示例测试</span>
  </div>
</div>
  `)
  assert.deepEqual(rendered.get('中文学习页面'), [106])
  // A comma is presentation, not a second number.
  assert.deepEqual(rendered.get('逐文件索引'), [2756])
  // One cell adds two separate counts, so both parts are checked.
  assert.deepEqual(rendered.get('学习工具 / 示例测试'), [126, 8])
})

test('the rendered numbers are checked, not only the data attributes', () => {
  // The defect this guards: the strip shipped data-learning-tests="110" above a
  // rendered "27 + 8", and the gate passed because it only read the attribute.
  const { errors } = inspectStudyHomeMetrics()
  assert.deepEqual(errors, [], 'the live homepage must agree with itself')

  const rendered = parseRenderedMetrics(`
<div class="dsh-status-strip" data-learning-tests="126">
  <div class="dsh-status-metric">
    <strong>27 + 8</strong>
    <span>学习工具 / 示例测试</span>
  </div>
</div>
  `)
  assert.deepEqual(rendered.get('学习工具 / 示例测试'), [27, 8], 'a stale rendered value stays readable to the gate')
})
