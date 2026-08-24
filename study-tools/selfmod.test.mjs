import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SELFMOD_LANES,
  buildSelfModModel,
  evaluateSelfModOracle,
} from '../website/public/selfmod-model.js'

test('同一输入产生逐字节相同的推演', () => {
  const input = { actionId: 'full-lifecycle', guardDenies: true }
  assert.equal(JSON.stringify(buildSelfModModel(input)), JSON.stringify(buildSelfModModel(input)))
})

test('完整生命周期：schema 先增长后收缩，定义被遗忘', () => {
  const model = buildSelfModModel({ actionId: 'full-lifecycle' })
  const grewIndex = model.steps.findIndex(s => s.phase === 'schema-grows')
  const shrunkIndex = model.steps.findIndex(s => s.phase === 'schema-shrinks')
  assert.ok(grewIndex !== -1 && shrunkIndex > grewIndex, '先增长、后收缩')
  assert.ok(model.steps.some(s => s.phase === 'forgotten'))
  assert.equal(model.observations.finalToolVisible, false)
  for (const check of evaluateSelfModOracle(model).checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('run-only 保持动态工具可见', () => {
  const model = buildSelfModModel({ actionId: 'run-only' })
  assert.equal(model.observations.finalToolVisible, true)
  assert.ok(model.steps.some(s => s.phase === 'schema-grows'))
  assert.ok(!model.steps.some(s => s.phase === 'schema-shrinks'))
})

test('坏 yml fail loud：Fiber 从未激活，schema 不变', () => {
  const model = buildSelfModModel({ actionId: 'broken-yml' })
  assert.equal(model.observations.fiberActivated, false)
  assert.equal(model.observations.failLoud, true)
  assert.ok(!model.steps.some(s => s.phase === 'schema-grows'))
  const check = evaluateSelfModOracle(model).checks.find(c => c.id === 'SM_FAIL_LOUD')
  assert.equal(check.pass, true)
})

test('guard 拒绝动态调用：可见不等于允许执行', () => {
  const model = buildSelfModModel({ actionId: 'run-only', guardDenies: true })
  const denied = model.steps.find(s => s.phase === 'guard-denied')
  assert.ok(denied !== undefined)
  const growsIndex = model.steps.findIndex(s => s.phase === 'schema-grows')
  assert.ok(denied.index > growsIndex, '拒绝发生在能力已可见之后')
  assert.equal(evaluateSelfModOracle(model).checks.find(c => c.id === 'SM_GUARD_STILL_APPLIES').pass, true)
})

test('三种动作序列在全网格上通过全部校验', () => {
  for (const actionId of ['full-lifecycle', 'run-only', 'broken-yml']) {
    for (const guardDenies of [false, true]) {
      const model = buildSelfModModel({ actionId, guardDenies })
      for (const check of evaluateSelfModOracle(model).checks) {
        assert.equal(check.pass, true,
          `${actionId} guard=${guardDenies} 的 ${check.id} 失败：${check.actual}`)
      }
    }
  }
})

test('每一步都落在已声明的 lane 上；未知动作大声失败', () => {
  for (const entry of buildSelfModModel({}).steps) assert.ok(SELFMOD_LANES.includes(entry.lane))
  assert.throws(() => buildSelfModModel({ actionId: 'nope' }), RangeError)
  assert.throws(() => buildSelfModModel({ guardDenies: 'yes' }), TypeError)
  assert.throws(() => evaluateSelfModOracle({ steps: 0 }), TypeError)
})
