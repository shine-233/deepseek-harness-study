import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildSubprocessModel, evaluateSubprocessOracle } from '../website/public/subprocess-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { outputBytes: 1500, maxBytes: 400, spillEnabled: true, spillCapBytes: 3000, stdinMode: 'data' }
  assert.equal(JSON.stringify(buildSubprocessModel(input)), JSON.stringify(buildSubprocessModel(input)))
  for (const out of [0, 199, 200, 400, 4000]) {
    for (const cap of [50, 500, 2000]) {
      for (const spill of [false, true]) {
        for (const stdin of ['ignore', 'pipe', 'data']) {
          const model = buildSubprocessModel({ outputBytes: out, maxBytes: cap, spillEnabled: spill, stdinMode: stdin })
          for (const check of evaluateSubprocessOracle(model).checks) {
            assert.equal(check.pass, true, `out=${out} cap=${cap} spill=${spill} ${check.id}: ${check.actual}`)
          }
        }
      }
    }
  }
})

test('溢出保留 TAIL：kept+dropped 守恒且 truncated 如实', () => {
  const model = buildSubprocessModel({ outputBytes: 1000, maxBytes: 300 })
  assert.equal(model.observations.truncated, true)
  assert.equal(model.observations.keptBytes, 300)
  assert.equal(model.observations.droppedBytes, 700)
})

test('spill 三态：未启用/完整可恢复/超限丢弃', () => {
  assert.equal(buildSubprocessModel({ outputBytes: 1000, maxBytes: 300, spillEnabled: false })
    .steps.some(s => s.phase === 'no-spill'), true)
  assert.equal(buildSubprocessModel({ outputBytes: 1000, maxBytes: 300, spillCapBytes: 2000 })
    .steps.some(s => s.phase === 'spill-saved'), true)
  assert.equal(buildSubprocessModel({ outputBytes: 1000, maxBytes: 300, spillCapBytes: 500 })
    .steps.some(s => s.phase === 'spill-discarded'), true)
})

test('DSH_ 前缀注入存在；坏输入大声失败', () => {
  assert.ok(buildSubprocessModel({}).steps.some(s => s.envPrefixed === true))
  assert.throws(() => buildSubprocessModel({ outputBytes: -1 }), RangeError)
  assert.throws(() => buildSubprocessModel({ stdinMode: 'tee' }), RangeError)
})
