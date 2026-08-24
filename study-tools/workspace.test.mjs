import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildWorkspaceModel, evaluateWorkspaceOracle } from '../website/public/workspace-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { duplicate: true, moveInvalid: true, attachSession: true }
  assert.equal(JSON.stringify(buildWorkspaceModel(input)), JSON.stringify(buildWorkspaceModel(input)))
  for (const dup of [false, true]) {
    for (const inv of [false, true]) {
      for (const att of [false, true]) {
        const model = buildWorkspaceModel({ duplicate: dup, moveInvalid: inv, attachSession: att })
        for (const check of evaluateWorkspaceOracle(model).checks) {
          assert.equal(check.pass, true, `dup=${dup} inv=${inv} att=${att} 的 ${check.id}: ${check.actual}`)
        }
      }
    }
  }
})

test('重复注册去重返回同一条记录；非法移动零副作用', () => {
  assert.equal(buildWorkspaceModel({ duplicate: true }).observations.recordCount, 1)
  assert.ok(buildWorkspaceModel({ moveInvalid: true }).steps.some(s => s.phase === 'move-rejected'))
})

test('坏输入大声失败', () => {
  assert.throws(() => buildWorkspaceModel({ duplicate: 'yes' }), TypeError)
  assert.throws(() => buildWorkspaceModel({ attachSession: 1 }), TypeError)
  assert.throws(() => evaluateWorkspaceOracle({ steps: null }), TypeError)
})
