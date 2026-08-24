import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-repomap.js imports without a DOM', async () => {
  try {
    mod = await import('../website/public/study-repomap.js')
  } catch (error) {
    throw new Error(`study-repomap.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof mod.chainMember, 'function')
  assert.equal(typeof mod.renderDirDetailHtml, 'function')
})

test('the model carries exactly the ten top-level directories of lesson 01, in table order', () => {
  assert.deepEqual(mod.TOP_DIRS.map(entry => entry.dir), [
    'vendor/', 'packages/', 'apps/', 'examples/', 'docs/',
    'scripts/', 'native/', 'python/', 'website/', '.agents/',
  ])
})

test('chain membership matches the mermaid: vendor, packages, apps in; the rest out', () => {
  assert.deepEqual(
    mod.TOP_DIRS.filter(entry => mod.chainMember(entry)).map(entry => entry.dir),
    ['vendor/', 'packages/', 'apps/'],
  )
  assert.throws(() => mod.chainMember({ dir: 'nope/' }), /未知目录/)
})

test('every directory explains itself in plain words and names a reading focus', () => {
  for (const entry of mod.TOP_DIRS) {
    assert.ok(entry.plain.length >= 6, `${entry.dir} 的说明过短`)
    assert.ok(entry.focus.length >= 10, `${entry.dir} 的关注点过短`)
  }
})

test('renderDirDetailHtml escapes HTML and states the chain relationship honestly', () => {
  const inChain = mod.renderDirDetailHtml(mod.TOP_DIRS[1])
  assert.ok(inChain.includes('在运行时依赖主链上'))
  const outChain = mod.renderDirDetailHtml(mod.TOP_DIRS[3])
  assert.ok(outChain.includes('不在运行时依赖主链上'))
  const hostile = mod.renderDirDetailHtml({ dir: 'x/', plain: 'p<i>', focus: 'f>b', inChain: false })
  assert.ok(!hostile.includes('<i>'))
  assert.ok(hostile.includes('p&lt;i&gt;'))
})
