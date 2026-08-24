import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-pipeline.js imports without a DOM', async () => {
  mod = await import('../website/public/study-pipeline.js')
  assert.equal(typeof mod.renderCheckHtml, 'function')
})

test('the model carries all sixteen checks of lesson 29, in table order', () => {
  assert.equal(mod.CI_CHECKS.length, 16)
  assert.equal(mod.CI_CHECKS[0].name, '最小插件 test')
  assert.equal(mod.CI_CHECKS[15].name, 'Agent 审阅')
})

test('every check names its location, what green supports, and what it cannot support', () => {
  for (const check of mod.CI_CHECKS) {
    assert.ok(check.where.length >= 8, `${check.name} 缺运行位置`)
    assert.ok(check.supports.length >= 10, `${check.name} 的能支持栏过短`)
    assert.ok(check.notSupported.length >= 10, `${check.name} 的不能支持栏过短`)
  }
})

test('the flagship boundary sentences survive verbatim', () => {
  const build = mod.CI_CHECKS.find(c => c.name === 'pnpm run build')
  assert.ok(build.notSupported.includes('真实 DSH 已启动'))
  const index = mod.CI_CHECKS.find(c => c.name === '源文件索引检查')
  assert.ok(index.supports.includes('2,973'))
  assert.ok(index.notSupported.includes('逐行人工阅读'))
})

test('renderCheckHtml escapes HTML-bearing text', () => {
  const html = mod.renderCheckHtml({ name: 'n', where: 'w<i>', supports: 's&x', notSupported: 'n"y' })
  assert.ok(html.includes('w&lt;i&gt;'))
  assert.ok(html.includes('s&amp;x'))
  assert.ok(html.includes('n&quot;y'))
})
