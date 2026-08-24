import assert from 'node:assert/strict'
import { test } from 'node:test'
import { TIME_ZONES, buildTimeModel, evaluateTimeOracle } from '../website/public/time-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { optIn: true, timezone: 'UTC', clockDriftMinutes: 30, turns: 2 }
  assert.equal(JSON.stringify(buildTimeModel(input)), JSON.stringify(buildTimeModel(input)))
  for (const optIn of [false, true]) {
    for (const turns of [1, 2]) {
      for (const drift of [-60, 0, 90]) {
        const model = buildTimeModel({ optIn, turns, clockDriftMinutes: drift })
        for (const check of evaluateTimeOracle(model).checks) {
          assert.equal(check.pass, true, `optIn=${optIn} t=${turns} d=${drift} 的 ${check.id}: ${check.actual}`)
        }
      }
    }
  }
})

test('选择加入时每轮注入一条带归因的读数', () => {
  const model = buildTimeModel({ turns: 2 })
  const injects = model.steps.filter(s => s.phase === 'inject')
  assert.equal(injects.length, 2)
  assert.ok(injects.every(s => s.detail.includes('来源标注')))
  assert.ok(injects.every(s => s.detail.includes('UTC')))
})

test('未加入时历史完全不变', () => {
  const model = buildTimeModel({ optIn: false, turns: 2 })
  assert.equal(model.steps.filter(s => s.phase === 'inject').length, 0)
  assert.equal(model.observations.forkShape, '未加入：历史里没有时间')
})

test('读数是 durable 的：重放原样回来', () => {
  const model = buildTimeModel({})
  assert.ok(model.steps.some(s => s.phase === 'logged-durable'))
})

test('全部时区可用；漂移被归因；坏输入大声失败', () => {
  for (const tz of TIME_ZONES) {
    const model = buildTimeModel({ timezone: tz, clockDriftMinutes: -15 })
    assert.ok(model.steps.some(s => s.detail.includes(tz)))
  }
  const drifted = buildTimeModel({ clockDriftMinutes: 120 })
  assert.ok(drifted.steps.some(s => s.phase === 'drift-attributed'))
  assert.throws(() => buildTimeModel({ clockDriftMinutes: 9999 }), RangeError)
  assert.throws(() => buildTimeModel({ optIn: 'yes' }), TypeError)
})
