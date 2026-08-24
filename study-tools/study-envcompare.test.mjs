import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-envcompare.js imports without a DOM', async () => {
  try {
    mod = await import('../website/public/study-envcompare.js')
  } catch (error) {
    throw new Error(`study-envcompare.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof mod.renderEnvDetailHtml, 'function')
})

test('the model carries exactly the three environments of lesson 21', () => {
  assert.deepEqual(mod.ENVIRONMENTS.map(env => env.name), [
    'GitHub 仓库网页', 'github.dev', 'GitHub Codespaces',
  ])
})

test('every environment fills the four table fields plus can/cannot lists', () => {
  for (const env of mod.ENVIRONMENTS) {
    assert.ok(env.best.length >= 8, `${env.name} 的 best 过短`)
    assert.ok(env.terminal.length >= 3, `${env.name} 的 terminal 过短`)
    assert.ok(env.download.length >= 3, `${env.name} 的 download 过短`)
    assert.ok(env.cost.length >= 8, `${env.name} 的 cost 过短`)
    assert.ok(env.can.length >= 1 && env.cannot.length >= 1, `${env.name} 缺能/不能清单`)
  }
})

test('capability rows only claim what the lesson text states', () => {
  // 网页一列不允许 ✓：课程没有为网页声称这些能力。
  for (const row of mod.CAPABILITY_ROWS) {
    assert.equal(row.values.web, '—', `${row.capability} 不应给网页标 ✓`)
  }
  // 终端一行：dev ✗、codespaces ✓（课程原句）。
  const terminal = mod.CAPABILITY_ROWS.find(row => row.capability === '终端')
  assert.equal(terminal.values.dev, '✗')
  assert.equal(terminal.values.codespaces, '✓')
  for (const row of mod.CAPABILITY_ROWS) {
    for (const value of Object.values(row.values)) {
      assert.ok(['✓', '✗', '—'].includes(value), `${row.capability} 出现非法记号 ${value}`)
    }
  }
})

test('renderEnvDetailHtml escapes HTML-bearing text and renders both lists', () => {
  const html = mod.renderEnvDetailHtml({
    name: 'n', best: 'b<i>', terminal: 't', download: 'd', cost: 'c&c',
    can: ['x<y'], cannot: ['z'],
  })
  assert.ok(html.includes('b&lt;i&gt;'))
  assert.ok(html.includes('c&amp;c'))
  assert.ok(html.includes('x&lt;y'))
  assert.ok(html.includes('原文说它能做'))
  assert.ok(html.includes('原文说它不能做'))
})
