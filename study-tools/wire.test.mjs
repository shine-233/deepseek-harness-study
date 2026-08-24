import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildWireModel, evaluateWireOracle } from '../website/public/wire-model.js'

test('同一输入逐字节相同', () => {
  assert.equal(JSON.stringify(buildWireModel({ scriptId: 'error' })),
    JSON.stringify(buildWireModel({ scriptId: 'error' })))
})

test('干净对话：请求与回应两两配对，通知单向', () => {
  const model = buildWireModel({ scriptId: 'clean' })
  assert.equal(model.observations.requests, model.observations.responses)
  assert.equal(model.observations.notifications, 1)
  for (const check of evaluateWireOracle(model).checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('服务端错误走 response 通道，行传输不断', () => {
  const model = buildWireModel({ scriptId: 'error' })
  const err = model.steps.find(s => s.phase === 'error-response')
  assert.ok(err !== undefined && err.detail.includes('-32603'))
  assert.ok(model.steps.some(s => s.phase === 'note'))
})

test('乱序：initialize 之前业务请求被拒', () => {
  const model = buildWireModel({ scriptId: 'unordered' })
  assert.equal(model.observations.unorderedRejected, true)
  assert.ok(model.steps.some(s => s.phase === 'error-response'))
  for (const check of evaluateWireOracle(model).checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('未知脚本大声失败；坏 oracle 输入大声失败', () => {
  assert.throws(() => buildWireModel({ scriptId: 'nope' }), RangeError)
  assert.throws(() => evaluateWireOracle(null), TypeError)
})
