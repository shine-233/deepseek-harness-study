import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  TYPERT_FACES,
  buildTypertGraphModel,
  buildTypertRegistryModel,
  evaluateTypertGraphOracle,
  evaluateTypertRegistryOracle,
} from '../website/public/typert-model.js'

/* ---- 面板一：类型图 ---- */

test('同一输入重建出逐字节相同的图', () => {
  const input = { shape: 'nested', face: 'host' }
  assert.equal(JSON.stringify(buildTypertGraphModel(input)), JSON.stringify(buildTypertGraphModel(input)))
})

test('全网格：三种形态 × 两个 face 都通过全部校验', () => {
  for (const shape of ['flat', 'nested', 'with-ref']) {
    for (const face of TYPERT_FACES) {
      const model = buildTypertGraphModel({ shape, face })
      for (const check of evaluateTypertGraphOracle(model).checks) {
        assert.equal(check.pass, true, `shape=${shape} face=${face} 的 ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('嵌套深度与边数随形态变化且自洽', () => {
  const flat = buildTypertGraphModel({ shape: 'flat' })
  const nested = buildTypertGraphModel({ shape: 'nested' })
  assert.equal(flat.observations.maxDepth, 2)
  assert.equal(nested.observations.maxDepth, 3)
  // 边数 = 子节点总数（每个 children 数组长度之和）
  const edgeCount = flat.nodes.reduce((sum, n) => sum + (n.children?.length ?? 0), 0)
  assert.equal(flat.observations.edgeCount, edgeCount)
})

test('引用形态：声明被引用恰好一次，渲染文本指向它', () => {
  const model = buildTypertGraphModel({ shape: 'with-ref' })
  const refs = model.nodes.filter(n => n.kind === 'ref')
  assert.equal(refs.length, 1)
  assert.ok(model.renderedText.includes('decl-shared-token'))
})

test('坏输入大声失败；oracle 拒绝非对象', () => {
  assert.throws(() => buildTypertGraphModel({ shape: 'nope' }), RangeError)
  assert.throws(() => buildTypertGraphModel({ face: 42 }), RangeError)
  assert.throws(() => evaluateTypertGraphOracle(null), TypeError)
  assert.throws(() => evaluateTypertGraphOracle({ nodes: 'x' }), TypeError)
})

/* ---- 面板二：注册表 ---- */

test('注册表同一输入逐字节相同', () => {
  const input = { scenario: 'endpoint-dup', withdrawOwner: true }
  assert.equal(JSON.stringify(buildTypertRegistryModel(input)), JSON.stringify(buildTypertRegistryModel(input)))
})

test('干净场景双方各占一个端点；撤销只影响自己', () => {
  const model = buildTypertRegistryModel({ scenario: 'clean', withdrawOwner: true })
  assert.equal(model.observations.entryCount, 1, '撤销后只剩 owner-b')
  assert.ok(model.observations.remainingEndpoints.includes('ep-b'))
  for (const check of evaluateTypertRegistryOracle(model).checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
  // 默认不撤销：双方条目共存。
  const both = buildTypertRegistryModel({ scenario: 'clean' })
  assert.equal(both.observations.remainingEndpoints.length, 2)
})

test('端点冲突与 id 冲突都零残留失败', () => {
  for (const scenario of ['endpoint-dup', 'id-dup']) {
    const model = buildTypertRegistryModel({ scenario, withdrawOwner: false })
    assert.equal(model.observations.bRegistered, false)
    assert.ok(model.steps.some(s => s.phase === 'prepare-rejected'))
    assert.ok(model.steps.some(s => s.phase === 'no-change'))
    assert.equal(model.observations.remainingEndpoints.filter(ep => ep.startsWith('ep-a')).length, 1,
      'owner-a 的注册毫发无损')
    const check = evaluateTypertRegistryOracle(model).checks.find(c => c.id === 'TR_ZERO_RESIDUE')
    assert.equal(check.pass, true)
  }
})

test('未知场景大声失败；oracle 拒绝非对象', () => {
  assert.throws(() => buildTypertRegistryModel({ scenario: 'chaos' }), RangeError)
  assert.throws(() => buildTypertRegistryModel({ withdrawOwner: 'yes' }), TypeError)
  assert.throws(() => evaluateTypertRegistryOracle(undefined), TypeError)
})
