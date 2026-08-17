import assert from 'node:assert/strict'
import test from 'node:test'
import { inspectStudyHomeMetrics, parseHomeMetrics } from './verify-study-home-metrics.mjs'

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
