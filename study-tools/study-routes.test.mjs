import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-routes.js imports without a DOM', async () => {
  try {
    mod = await import('../website/public/study-routes.js')
  } catch (error) {
    throw new Error(`study-routes.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof mod.buildRouteHops, 'function')
  assert.equal(typeof mod.renderRouteDetailHtml, 'function')
})

test('the model carries exactly the twelve goals of lesson 20, in table order', () => {
  assert.deepEqual(mod.ROUTES.map(route => route.goal), [
    '第一次理解 DSH', '追一个具体文件', '理解一次请求', '写普通插件',
    '判断插件责任和工具预算', '控制工具上下文', '接入外部 Hook', '发布 Bundle',
    '审核社区项目', '第一次照着做', '判断教材是否够用', '更新上游版本',
  ])
})

test('every route has hops and a non-empty evidence sentence', () => {
  for (const route of mod.ROUTES) {
    assert.ok(route.hops.length >= 2, `${route.goal} 的路线过短`)
    assert.ok(route.evidence.length >= 10, `${route.goal} 的证据描述过短`)
  }
})

test('numeric hops resolve to lesson slugs and build lesson URLs', () => {
  const hops = mod.buildRouteHops({ goal: '第一次理解 DSH' })
  assert.deepEqual(hops.map(hop => hop.label), ['00', '01', '02', '03'])
  assert.ok(hops[0].href.includes('/study/lessons/00-'))
  assert.ok(hops.every(hop => hop.href !== null))
})

test('the file-index hop links to the index nav and 对应索引页 stays linkless', () => {
  const hops = mod.buildRouteHops({ goal: '追一个具体文件' })
  assert.equal(hops[1].label, 'study/文件索引/README.md')
  assert.ok(hops[1].href.endsWith('/study/files/README'))
  assert.equal(hops[2].label, '对应索引页')
  assert.equal(hops[2].href, null)
})

test('buildRouteHops throws for unknown goals', () => {
  assert.throws(() => mod.buildRouteHops({ goal: '不存在' }), /未知路线/)
})

test('renderRouteDetailHtml escapes HTML-bearing text and keeps linkless hops disabled', () => {
  const html = mod.renderRouteDetailHtml(
    { goal: 'g', evidence: 'e<vi"l' },
    [{ label: '<b>' , href: '/x' }, { label: '对应索引页', href: null }],
  )
  assert.ok(!html.includes('<b>'))
  assert.ok(html.includes('&lt;b&gt;'))
  assert.ok(html.includes('e&lt;vi&quot;l'))
  assert.ok(html.includes('aria-disabled="true"'))
})
