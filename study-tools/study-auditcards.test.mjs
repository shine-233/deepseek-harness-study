import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-auditcards.js imports without a DOM', async () => {
  mod = await import('../website/public/study-auditcards.js')
  assert.equal(typeof mod.renderAuditCardHtml, 'function')
})

test('the model carries exactly the seven audited files of lesson 24, in table order', () => {
  assert.deepEqual(mod.AUDIT_CARDS.map(c => c.file), [
    'packages/core/tools/src/index.ts',
    'packages/core/tools/src/schema.ts',
    'packages/core/system-prompt/src/index.ts',
    'apps/cli/src/profile-boot.ts',
    'packages/hooks/hook-protocol/src/codec.ts',
    'packages/core/tools/src/types.ts',
    'packages/interaction/user-approval/src/index.ts',
  ])
})

test('every card fills all three audit columns substantively', () => {
  for (const card of mod.AUDIT_CARDS) {
    assert.ok(card.fact.length >= 20, `${card.file} 的事实栏过短`)
    assert.ok(card.correction.length >= 15, `${card.file} 的修正栏过短`)
    assert.ok(card.stillNeeded.length >= 15, `${card.file} 的仍需证据栏过短`)
  }
})

test('the approval card keeps the fail-closed direction the lesson stresses', () => {
  const approval = mod.AUDIT_CARDS.find(c => c.file.includes('user-approval'))
  assert.ok(approval.fact.includes('unavailable'))
  assert.ok(approval.fact.includes('而不是默认放行'))
})

test('renderAuditCardHtml escapes HTML-bearing text', () => {
  const html = mod.renderAuditCardHtml({ file: 'f', fact: 'a<b', correction: 'c>d', stillNeeded: 's"t' })
  assert.ok(html.includes('a&lt;b'))
  assert.ok(html.includes('c&gt;d'))
  assert.ok(html.includes('s&quot;t'))
})
