import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import {
  GUARD_THRESHOLDS,
  buildGuardLoopModel,
  buildKeySandboxModel,
  detailedReminderText,
  evaluateGuardLoopOracle,
  gentleReminderText,
  parseCanonicalArguments,
} from '../website/public/guard-loop-model.js'

const RESET_MODES = ['none', 'user-interjection', 'key-reorder', 'value-change']

test('deterministic across the whole input grid', () => {
  for (const resetMode of RESET_MODES) {
    for (const attempts of [1, 4, 8, 12]) {
      for (const guard of ['on', 'off']) {
        const a = JSON.stringify(buildGuardLoopModel({ attempts, guard, resetMode }))
        assert.equal(a, JSON.stringify(buildGuardLoopModel({ attempts, guard, resetMode })))
      }
    }
  }
})

test('oracle passes across full grid', () => {
  for (const resetMode of RESET_MODES) {
    for (let attempts = 1; attempts <= 12; attempts += 1) {
      for (const guard of ['on', 'off']) {
        const r = evaluateGuardLoopOracle(buildGuardLoopModel({ attempts, guard, resetMode }))
        for (const c of r.checks) {
          assert.equal(c.pass, true, `${attempts}/${guard}/${resetMode}: ${c.id}: ${c.actual}`)
        }
      }
    }
  }
})

test('advisory: all calls execute regardless of reminders', () => {
  const m = buildGuardLoopModel({ attempts: 12, guard: 'on', resetMode: 'none' })
  assert.equal(m.observations.executedCount, 12)
  assert.equal(m.observations.blockedCount, 0)
  assert.ok(m.observations.reminderCount > 0)
})

test('off means zero reminders and zero chain events', () => {
  const m = buildGuardLoopModel({ attempts: 12, guard: 'off', resetMode: 'user-interjection' })
  assert.equal(m.observations.reminderCount, 0)
  assert.equal(m.observations.chainResets, 0)
  assert.equal(m.steps.filter(s => s.phase === 'interject').length, 0)
})

test('escalation matches upstream thresholds [3,5,8] with gentle first tier', () => {
  const m = buildGuardLoopModel({ attempts: 9, guard: 'on', resetMode: 'none' })
  const tiers = m.observations.remindersAt.map(item => item.count)
  assert.deepEqual(tiers, [3, 5, 8])
  assert.equal(m.observations.gentleCount, 1)
  assert.equal(m.observations.detailedCount, 2)
})

test('user interjection before attempt 6 restarts the chain: gentle fires again at count 3', () => {
  const m = buildGuardLoopModel({ attempts: 10, guard: 'on', resetMode: 'user-interjection' })
  assert.equal(m.observations.chainResets, 1)
  // 第一段：3、5；插话后第二段从第 6 次重新数：3 落在第 8 次，5 落在第 10 次。
  assert.deepEqual(m.observations.remindersAt.map(item => item.attempt), [3, 5, 8, 10])
  assert.equal(m.observations.gentleCount, 2)
})

test('a pure key reorder does NOT reset the chain (canonicalization)', () => {
  const plain = buildGuardLoopModel({ attempts: 8, guard: 'on', resetMode: 'none' })
  const reordered = buildGuardLoopModel({ attempts: 8, guard: 'on', resetMode: 'key-reorder' })
  assert.deepEqual(reordered.observations.remindersAt, plain.observations.remindersAt)
  assert.equal(reordered.observations.chainResets, 0)
})

test('a value change DOES reset the chain', () => {
  const m = buildGuardLoopModel({ attempts: 8, guard: 'on', resetMode: 'value-change' })
  assert.equal(m.observations.chainResets, 1)
  assert.equal(m.observations.remindersAt.filter(item => item.attempt >= 6 && item.tier === 'gentle').length, 1)
})

test('reminder texts mirror the upstream wording shape', () => {
  assert.ok(gentleReminderText().includes('repeating the exact same tool call'))
  const detailed = detailedReminderText(5, '{"path":"notes.md"}')
  assert.ok(detailed.includes('- tool: read_file'))
  assert.ok(detailed.includes('- consecutive_calls: 5'))
  assert.ok(detailed.includes('- arguments: {"path":"notes.md"}'))
})

test('the detailed preview truncates at the upstream 500-char cap with the verbatim marker', () => {
  const long = 'a'.repeat(600)
  const text = detailedReminderText(5, long)
  assert.ok(text.includes('- arguments: ' + 'a'.repeat(500) + '… (+100 more chars)'))
  assert.ok(!text.includes('a'.repeat(501)))
  assert.equal(detailedReminderText(5, 'a'.repeat(500)), detailedReminderText(5, 'a'.repeat(500), 500))
  assert.ok(!detailedReminderText(5, 'short').includes('more chars'))
})

test('throws on invalid input', () => {
  assert.throws(() => buildGuardLoopModel({ attempts: 0, guard: 'on', resetMode: 'none' }), RangeError)
  assert.throws(() => buildGuardLoopModel({ attempts: 13, guard: 'on', resetMode: 'none' }), RangeError)
  assert.throws(() => buildGuardLoopModel({ attempts: 1, guard: 'maybe', resetMode: 'none' }), RangeError)
  assert.throws(() => buildGuardLoopModel({ attempts: 1, guard: 'on', resetMode: 'teleport' }), RangeError)
})

test('the sandbox canonicalizes deep key order exactly like the upstream chain key', () => {
  const reorder = parseCanonicalArguments('{"opts":{"b":2,"a":1},"path":"n.md"}')
  const sorted = parseCanonicalArguments('{"path":"n.md","opts":{"a":1,"b":2}}')
  assert.ok(reorder.ok && sorted.ok)
  assert.equal(reorder.canonical, sorted.canonical)
})

test('the sandbox rejects non-objects and broken JSON with readable errors', () => {
  assert.equal(parseCanonicalArguments('[1,2]').ok, false)
  assert.equal(parseCanonicalArguments('42').ok, false)
  assert.equal(parseCanonicalArguments('null').ok, false)
  assert.equal(parseCanonicalArguments('{"path":').ok, false)
  assert.match(parseCanonicalArguments('{"path":').error, /JSON/)
})

test('the sandbox verdict separates key-reorder from value-change deterministically', () => {
  const same = buildKeySandboxModel('{"a":1,"b":2}', '{"b":2,"a":1}')
  assert.equal(same.verdict, 'same-key')
  assert.equal(same.sameKey, true)
  const changed = buildKeySandboxModel('{"a":1}', '{"a":2}')
  assert.equal(changed.verdict, 'new-key')
  const invalid = buildKeySandboxModel('nope', '{"a":1}')
  assert.equal(invalid.verdict, 'invalid')
  for (const model of [same, changed, invalid]) {
    assert.equal(
      JSON.stringify(buildKeySandboxModel(model.input.argsA, model.input.argsB)),
      JSON.stringify(model),
    )
  }
})

test('the sandbox firing plan puts gentle at the first threshold only', () => {
  const model = buildKeySandboxModel('{"a":1}', '{"a":1}')
  assert.deepEqual(model.chainPlan, [
    { count: 3, tier: 'gentle' },
    { count: 5, tier: 'detailed' },
    { count: 8, tier: 'detailed' },
  ])
  assert.equal(GUARD_THRESHOLDS[0], 3)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('guard-loop-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  for (const id of ['gl-sandbox-a', 'gl-sandbox-b', 'gl-sandbox-canonical-a', 'gl-sandbox-canonical-b', 'gl-sandbox-verdict', 'gl-sandbox-meter']) {
    assert.ok(html.includes(`id="${id}"`), 'missing sandbox id: ' + id)
  }
  const script = readFileSync(new URL('guard-loop-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'advisory'/)
  assert.match(script, /buildKeySandboxModel/)
})

test('the overreach-block fault is caught by ADVISORY_ONLY alone', () => {
  const model = buildGuardLoopModel({ attempts: 12, guard: 'on', resetMode: 'none', fault: 'overreach-block' })
  assert.equal(model.observations.blockedCount, 1, 'the forged block must show in the ledger')
  assert.equal(model.observations.executedCount, 11)
  const result = evaluateGuardLoopOracle(model)
  assert.equal(result.pass, false, 'an advisory plugin blocking a call must fail the oracle')
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['ADVISORY_ONLY'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the overreach-block fault is ineffective when off-guard or on a threshold attempt', () => {
  for (const input of [
    { attempts: 12, guard: 'off', resetMode: 'none' },
    { attempts: 5, guard: 'on', resetMode: 'none' },
    { attempts: 8, guard: 'on', resetMode: 'user-interjection' },
  ]) {
    const model = buildGuardLoopModel({ ...input, fault: 'overreach-block' })
    assert.equal(evaluateGuardLoopOracle(model).pass, true,
      JSON.stringify(input) + ': nothing to forge here')
  }
})

test('an unknown fault type fails loud at the model boundary', () => {
  assert.throws(() => buildGuardLoopModel({ attempts: 4, guard: 'on', resetMode: 'none', fault: 'no-such-fault' }))
})
