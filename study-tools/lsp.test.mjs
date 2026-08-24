import assert from 'node:assert/strict'
import { test } from 'node:test'
import { LSP_OPS, buildLspModel, evaluateLspOracle } from '../website/public/lsp-model.js'

test('同一输入逐字节相同', () => {
  const input = { conflict: true, invalidExt: false, queryExt: 'py', queryOp: 'hover' }
  assert.equal(JSON.stringify(buildLspModel(input)), JSON.stringify(buildLspModel(input)))
})

test('正常双 provider：按扩展名路由与顺序无关', () => {
  for (const ext of ['ts', 'py']) {
    const model = buildLspModel({ queryExt: ext })
    assert.ok(model.observations.routedTo !== null && model.observations.routedTo !== undefined)
    for (const check of evaluateLspOracle(model).checks) {
      assert.equal(check.pass, true, check.id + ': ' + check.actual)
    }
  }
})

test('冲突注册整体失败，先到者不受影响', () => {
  const model = buildLspModel({ conflict: true })
  assert.ok(model.steps.some(s => s.phase === 'conflict-rejected'))
  assert.ok(model.steps.some(s => s.phase === 'reserved-ts'), '先到的 .ts 预留仍在')
  const check = evaluateLspOracle(model).checks.find(c => c.id === 'LS_ATOMIC_REGISTRATION')
  assert.equal(check.pass, true)
})

test('非法扩展名零残留；路由无路可走时如实报告', () => {
  const model = buildLspModel({ invalidExt: true, queryExt: 'ts' })
  assert.ok(!model.steps.some(s => s.phase === 'reserved-ts'))
  assert.equal(model.observations.routedTo, null)
  assert.ok(model.steps.at(-1).detail.includes('没有 provider'))
})

test('只暴露四个操作；未知输入大声失败', () => {
  assert.deepEqual([...LSP_OPS].sort(), ['findReferences', 'goToDefinition', 'goToImplementation', 'hover'])
  assert.throws(() => buildLspModel({ queryExt: 'rs' }), RangeError)
  assert.throws(() => buildLspModel({ conflict: 'yes' }), TypeError)
})
