import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildAttachmentModel, evaluateAttachmentOracle } from '../website/public/attachment-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { imageBytes: 900, maxBytes: 1200, requestAllowed: true }
  assert.equal(JSON.stringify(buildAttachmentModel(input)), JSON.stringify(buildAttachmentModel(input)))
  for (const imageBytes of [100, 800, 3000, 5000]) {
    for (const maxBytes of [200, 1200, 4000]) {
      const model = buildAttachmentModel({ imageBytes, maxBytes })
      for (const check of evaluateAttachmentOracle(model).checks) {
        assert.equal(check.pass, true, `img=${imageBytes} cap=${maxBytes} 的 ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('超限拒收零引用；未超限存储并按策略取回', () => {
  const rejected = buildAttachmentModel({ imageBytes: 4000, maxBytes: 1200 })
  assert.equal(rejected.observations.stored, false)
  assert.ok(rejected.steps.some(s => s.phase === 'limit-rejected'))

  const ok = buildAttachmentModel({ imageBytes: 800, maxBytes: 1200, requestAllowed: true })
  assert.equal(ok.observations.requestOutcome, '取回成功')

  const denied = buildAttachmentModel({ imageBytes: 800, maxBytes: 1200, requestAllowed: false })
  assert.equal(denied.observations.requestOutcome, '策略拒绝')
})

test('坏输入大声失败', () => {
  assert.throws(() => buildAttachmentModel({ imageBytes: 99 }), RangeError)
  assert.throws(() => buildAttachmentModel({ maxBytes: 'x' }), TypeError)
})
