import assert from 'node:assert/strict'
import { test } from 'node:test'
import { PRESET_CATALOGS, buildPresetModel, evaluatePresetOracle } from '../website/public/preset-model.js'

test('同一输入逐字节相同', () => {
  assert.equal(JSON.stringify(buildPresetModel({ agents: 3 })), JSON.stringify(buildPresetModel({ agents: 3 })))
})

test('N 个 agent 加入后实例数仍是 1，能力清单一致', () => {
  for (const agents of [1, 2, 3]) {
    const model = buildPresetModel({ agents })
    assert.equal(model.observations.instanceCopies, 1)
    assert.equal(model.steps.filter(s => s.phase === 'bind-scope').length, agents)
    for (const check of evaluatePresetOracle(model).checks) {
      assert.equal(check.pass, true, `agents=${agents} 的 ${check.id}: ${check.actual}`)
    }
  }
})

test('重复装载同名预设被拒', () => {
  const model = buildPresetModel({ duplicateMount: true })
  assert.ok(model.steps.some(s => s.phase === 'duplicate-rejected'))
})

test('两个预设目录都可用；坏输入大声失败', () => {
  for (const p of PRESET_CATALOGS) {
    const model = buildPresetModel({ presetId: p.id, agents: 1 })
    assert.deepEqual(model.observations.presetTools, [...p.tools])
    for (const check of evaluatePresetOracle(model).checks) assert.equal(check.pass, true)
  }
  assert.throws(() => buildPresetModel({ agents: 0 }), RangeError)
  assert.throws(() => buildPresetModel({ presetId: 'nope' }), RangeError)
  assert.throws(() => buildPresetModel({ duplicateMount: 'yes' }), TypeError)
})
