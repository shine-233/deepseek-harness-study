import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-testlayers.js imports without a DOM', async () => {
  try {
    mod = await import('../website/public/study-testlayers.js')
  } catch (error) {
    throw new Error(`study-testlayers.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof mod.buildLayerDetail, 'function')
  assert.equal(typeof mod.renderLayerDetailHtml, 'function')
})

test('the model carries exactly the six layers of lesson 07, in table order', () => {
  assert.deepEqual(mod.TEST_LAYERS.map(layer => layer.name), [
    '单元测试', '包级集成测试', '快照测试', 'E2E 测试', '真实 API 测试', '属性测试',
  ])
})

test('every layer answers with the table sentence and names what it does not answer', () => {
  for (const layer of mod.TEST_LAYERS) {
    assert.ok(layer.answers.length >= 8, `${layer.id} 的 answers 过短`)
    assert.ok(layer.notAnswers.length >= 1, `${layer.id} 缺少不回答项`)
    for (const item of layer.notAnswers) {
      assert.ok(typeof item === 'string' && item.length >= 4, `${layer.id} 的不回答项过短`)
    }
  }
})

test('「不回答」never repeats the layer\'s own answer scope', () => {
  for (const layer of mod.TEST_LAYERS) {
    for (const item of layer.notAnswers) {
      assert.notEqual(item, layer.answers)
    }
  }
})

test('caveats quote the lesson verbatim and only where the lesson states them', () => {
  assert.equal(mod.LAYER_CAVEATS.unit, '绿色的单元测试不能代表 E2E 或真实模型已经验证。')
  assert.equal(mod.LAYER_CAVEATS.e2e, 'E2E 失败也可能是环境、密钥或端口问题。')
  assert.equal(Object.keys(mod.LAYER_CAVEATS).length, 2)
})

test('buildLayerDetail returns copies and rejects unknown ids', () => {
  const detail = mod.buildLayerDetail({ id: 'unit' })
  detail.notAnswers.push('污染')
  assert.notEqual(mod.buildLayerDetail({ id: 'unit' }).notAnswers.length, detail.notAnswers.length)
  assert.throws(() => mod.buildLayerDetail({ id: 'nope' }), /未知测试层/)
})

test('renderLayerDetailHtml escapes HTML-bearing text', () => {
  const html = mod.renderLayerDetailHtml(
    { name: '<img>' },
    { answers: 'a<b', notAnswers: ['x"y'], caveat: null },
  )
  assert.ok(!html.includes('<img>'))
  assert.ok(html.includes('&lt;img&gt;'))
  assert.ok(html.includes('a&lt;b'))
  assert.ok(html.includes('x&quot;y'))
  assert.ok(!html.includes('课程原文边界'))
})

test('renderLayerDetailHtml includes the caveat block only when present', () => {
  const withCaveat = mod.renderLayerDetailHtml({ name: '单元测试' }, mod.buildLayerDetail({ id: 'unit' }))
  assert.ok(withCaveat.includes('课程原文边界'))
  assert.ok(withCaveat.includes('绿色的单元测试不能代表'))
})
