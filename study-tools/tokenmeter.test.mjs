import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildMeterModel, evaluateMeterOracle } from '../website/public/tokenmeter-model.js'

test('同一日志前缀重放出同一读数', () => {
  const input = { existingChars: 3200, newChars: 800, measuredBaseline: true, windowTokens: 8000 }
  assert.equal(JSON.stringify(buildMeterModel(input)), JSON.stringify(buildMeterModel(input)))
})

test('两种基线口径给出同一个总数，归属不同', () => {
  for (const input of [
    { existingChars: 0, newChars: 1600, windowTokens: 4000 },
    { existingChars: 1200, newChars: 400, windowTokens: 4000 },
    { existingChars: 20000, newChars: 0, windowTokens: 8000 },
  ]) {
    const measured = buildMeterModel({ ...input, measuredBaseline: true })
    const estimated = buildMeterModel({ ...input, measuredBaseline: false })
    assert.equal(measured.observations.totalTokens, estimated.observations.totalTokens,
      '两口径必须殊途同归')
    assert.equal(measured.observations.baselineKind, 'measured')
    assert.equal(estimated.observations.baselineKind, 'estimated')
    for (const model of [measured, estimated]) {
      for (const check of evaluateMeterOracle(model).checks) {
        assert.equal(check.pass, true, check.id + ': ' + check.actual)
      }
    }
  }
})

test('压力跨过 80% 时给出高压形态；计量器只报数不截断', () => {
  const high = buildMeterModel({ existingChars: 15000, newChars: 5000, windowTokens: 2000 })
  assert.equal(high.observations.overThreshold, true)
  const pressureStep = high.steps.find(s => s.phase === 'pressure')
  assert.ok(pressureStep.detail.includes('compaction'))
})

test('压力数学对得上窗口；坏输入大声失败', () => {
  const model = buildMeterModel({ existingChars: 1000, newChars: 500, windowTokens: 16000 })
  assert.equal(model.observations.pressurePct,
    Math.min(100, Math.round((model.observations.totalTokens / 16000) * 100)))
  assert.throws(() => buildMeterModel({ existingChars: -1 }), RangeError)
  assert.throws(() => buildMeterModel({ newChars: 99999 }), RangeError)
  assert.throws(() => buildMeterModel({ windowTokens: 999999 }), RangeError)
  assert.throws(() => buildMeterModel({ measuredBaseline: 'yes' }), TypeError)
})
