import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  decodeState,
  encodeState,
  readStateFromHash,
  writeStateToHash,
} from '../website/public/study-lab-state.js'

const SCHEMA = {
  scenario: { enum: ['two-tools', 'denied-tool', 'failed-tool'] },
  upTo: { integerRange: [0, 100] },
}

test('encode then decode restores the same values', () => {
  const state = { scenario: 'two-tools', upTo: 7 }
  const decoded = decodeState(encodeState(state, SCHEMA), SCHEMA)
  assert.equal(decoded.ok, true)
  assert.deepEqual(decoded.value, state)
})

test('encoding is byte-stable regardless of key insertion order', () => {
  const first = encodeState({ scenario: 'two-tools', upTo: 3 }, SCHEMA)
  const second = encodeState({ upTo: 3, scenario: 'two-tools' }, SCHEMA)
  assert.equal(first, second)
})

test('encoding drops fields the schema does not declare', () => {
  const decoded = decodeState(encodeState({ scenario: 'two-tools', upTo: 1, injected: '<script>' }, SCHEMA), SCHEMA)
  assert.equal(decoded.ok, true)
  assert.deepEqual(decoded.value, { scenario: 'two-tools', upTo: 1 })
})

test('decode rejects malformed payloads without throwing', () => {
  for (const bad of ['%', 'not-json', '%7B%7D', encodeURIComponent('[1,2]'), encodeURIComponent('"str"')]) {
    const decoded = decodeState(bad, SCHEMA)
    assert.equal(decoded.ok, false, bad)
    assert.equal(typeof decoded.error, 'string')
  }
})

test('decode rejects unknown, missing, and out-of-contract fields', () => {
  const cases = [
    { scenario: 'unknown-scenario', upTo: 1 },
    { upTo: 1 },
    { scenario: 'two-tools' },
    { scenario: 'two-tools', upTo: 1.5 },
    { scenario: 'two-tools', upTo: -1 },
    { scenario: 'two-tools', upTo: 101 },
    { scenario: 'two-tools', upTo: '3' },
  ]
  for (const value of cases) {
    const encoded = encodeURIComponent(JSON.stringify(value))
    assert.equal(decodeState(encoded, SCHEMA).ok, false, JSON.stringify(value))
  }
})

test('readStateFromHash returns null when no state segment exists', () => {
  assert.equal(readStateFromHash('', SCHEMA), null)
  assert.equal(readStateFromHash('#', SCHEMA), null)
  assert.equal(readStateFromHash('#先记住一张图', SCHEMA), null)
})

test('readStateFromHash decodes a present segment and reports corruption', () => {
  const good = '#state=' + encodeState({ scenario: 'denied-tool', upTo: 4 }, SCHEMA)
  assert.deepEqual(readStateFromHash(good, SCHEMA).value, { scenario: 'denied-tool', upTo: 4 })

  const corrupt = readStateFromHash('#state=%25%25not-a-payload', SCHEMA)
  assert.equal(corrupt.ok, false)
})

test('writeStateToHash preserves unrelated segments and replaces an old state', () => {
  const withAnchor = writeStateToHash('#section-a&state=old', { scenario: 'two-tools', upTo: 2 }, SCHEMA)
  assert.ok(withAnchor.startsWith('#section-a&state='))
  assert.equal(readStateFromHash(withAnchor, SCHEMA).value.upTo, 2)

  const replaced = writeStateToHash(withAnchor, { scenario: 'failed-tool', upTo: 9 }, SCHEMA)
  assert.ok(replaced.includes('section-a'))
  assert.equal(readStateFromHash(replaced, SCHEMA).value.scenario, 'failed-tool')
  assert.equal(replaced.match(/state=/g).length, 1)
})

test('a written hash round-trips through readStateFromHash unchanged', () => {
  const hash = writeStateToHash('', { scenario: 'two-tools', upTo: 12 }, SCHEMA)
  const restored = readStateFromHash(hash, SCHEMA)
  assert.equal(restored.ok, true)
  assert.deepEqual(restored.value, { scenario: 'two-tools', upTo: 12 })
})

test('the turn lab page wires the state module and its copy control', () => {
  const html = readFileSync(fileURLToPath(new URL('../website/public/turn-flow-lab.html', import.meta.url)), 'utf8')
  assert.ok(html.includes('id="copy-state-link"'))
  const script = readFileSync(fileURLToPath(new URL('../website/public/turn-flow-lab.js', import.meta.url)), 'utf8')
  for (const marker of ['readStateFromHash', 'writeStateToHash', 'TURN_STATE_SCHEMA']) {
    assert.ok(script.includes(marker), 'turn-flow-lab.js must reference ' + marker)
  }
})
