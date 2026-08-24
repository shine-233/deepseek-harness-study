import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CKPT_POINTS, buildCheckpointModel, evaluateCheckpointOracle } from '../website/public/checkpoint-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { checkpointsEnabled: true, crashAt: 3 }
  assert.equal(JSON.stringify(buildCheckpointModel(input)), JSON.stringify(buildCheckpointModel(input)))
  for (const enabled of [false, true]) {
    for (const crashAt of [0, 1, 2, 3, 4, 5, 6]) {
      const model = buildCheckpointModel({ checkpointsEnabled: enabled, crashAt })
      for (const check of evaluateCheckpointOracle(model).checks) {
        assert.equal(check.pass, true, `enabled=${enabled} crash=${crashAt} 的 ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('已到达的语义时刻各有检查点；崩溃截断时间线', () => {
  const model = buildCheckpointModel({ crashAt: 5 })
  assert.equal(model.steps.filter(s => s.phase === 'checkpoint').length, 3)
  const idx = model.steps.findIndex(s => s.phase === 'crash')
  assert.equal(model.steps.length - 1, idx)
  assert.ok(!model.steps.some(s => s.phase === 'turn-end'), 'turn-end 不该在崩溃后出现')
})

test('未启用时零检查点：崩溃即从零开始', () => {
  const model = buildCheckpointModel({ checkpointsEnabled: false, crashAt: 4 })
  assert.equal(model.steps.filter(s => s.phase === 'checkpoint').length, 0)
  assert.equal(model.observations.lastDurableTick, 0)
  assert.equal(model.observations.forkShape, '无检查点：崩溃即从零开始')
})

test('同拍内检查点先于动作：在拍 1 崩溃也留住了请求前缀', () => {
  const model = buildCheckpointModel({ crashAt: 1 })
  const cp = model.steps.find(s => s.phase === 'checkpoint')
  const crash = model.steps.find(s => s.phase === 'crash')
  assert.ok(cp !== undefined && crash !== undefined && cp.index < crash.index)
  assert.equal(model.observations.lastDurableTick, 1)
})
