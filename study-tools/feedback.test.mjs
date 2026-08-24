import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildFeedbackModel, evaluateFeedbackOracle } from '../website/public/feedback-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { action: 'rate-up', finalized: true }
  assert.equal(JSON.stringify(buildFeedbackModel(input)), JSON.stringify(buildFeedbackModel(input)))
  for (const action of ['rate-up', 'rate-down', 'clear']) {
    for (const finalized of [false, true]) {
      const model = buildFeedbackModel({ action, finalized })
      for (const check of evaluateFeedbackOracle(model).checks) {
        assert.equal(check.pass, true, `action=${action} fin=${finalized} 的 ${check.id}`)
      }
    }
  }
})

test('未定稿消息不可评价；clear 不产生记录', () => {
  assert.equal(buildFeedbackModel({ finalized: false }).observations.recorded, false)
  assert.equal(buildFeedbackModel({ action: 'clear' }).observations.recorded, false)
})

test('upsert 语义出现在说明里；坏输入大声失败', () => {
  assert.ok(buildFeedbackModel({}).steps.some(s => s.phase === 'upsert'))
  assert.throws(() => buildFeedbackModel({ action: 'meh' }), RangeError)
  assert.throws(() => buildFeedbackModel({ finalized: 'yes' }), TypeError)
})
