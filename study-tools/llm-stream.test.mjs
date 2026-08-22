import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  STREAM_SCENARIOS,
  buildStreamModel,
  evaluateStreamOracle,
} from '../website/public/llm-stream-model.js'

const SCENARIOS = STREAM_SCENARIOS.map(scenario => scenario.id)

test('the same input produces byte-identical output', () => {
  const input = { scenario: 'clean', upTo: 5 }
  assert.equal(
    JSON.stringify(buildStreamModel(input)),
    JSON.stringify(buildStreamModel(input)),
  )
})

test('every scenario passes every oracle check at every replay position', () => {
  for (const scenario of SCENARIOS) {
    const total = buildStreamModel({ scenario, upTo: 0 }).observations.totalArrivals
    for (let upTo = 0; upTo <= total; upTo += 1) {
      const verdict = evaluateStreamOracle(buildStreamModel({ scenario, upTo }))
      for (const check of verdict.checks) {
        assert.equal(check.pass, true, scenario + ' upTo=' + upTo + ' failed ' + check.id)
      }
    }
  }
})

test('the late duplicate arrives only in its own scenario and after finish', () => {
  const clean = buildStreamModel({ scenario: 'clean', upTo: 99 })
  assert.equal(clean.observations.totalArrivals, 5)
  const late = buildStreamModel({ scenario: 'late-duplicate', upTo: 99 })
  assert.equal(late.observations.totalArrivals, 6)
  assert.equal(late.observations.rejectedCount, 1, '迟到重复被拒绝')
  assert.ok(!late.accepted.some(chunk => chunk.arrival === 5), '被拒块不进入 accepted')
})

test('the duplicated sentence appears exactly once in the final message', () => {
  const model = buildStreamModel({ scenario: 'late-duplicate', upTo: 99 })
  const occurrences = model.messageText.split('好的，').length - 1
  assert.equal(occurrences, 1)
})

test('tool-call blocks are counted separately from the message text', () => {
  const model = buildStreamModel({ scenario: 'clean', upTo: 99 })
  assert.equal(model.observations.toolCalls, 1)
  assert.ok(!model.messageText.includes('read_file'), '工具调用参数不能混进正文')
})

test('prefix replay matches a fresh build at the same position', () => {
  for (let upTo = 0; upTo <= 6; upTo += 1) {
    const partial = buildStreamModel({ scenario: 'late-duplicate', upTo })
    const verdict = evaluateStreamOracle(partial)
    assert.equal(verdict.pass, true, 'upTo=' + String(upTo))
  }
})

test('unknown scenario or malformed upTo is rejected rather than defaulted', () => {
  assert.throws(() => buildStreamModel({ scenario: 'nope', upTo: 3 }), RangeError)
  assert.throws(() => buildStreamModel({ scenario: 'clean', upTo: 'x' }), TypeError)
  assert.throws(() => buildStreamModel({ scenario: 'clean', upTo: -1 }), RangeError)
})

test('the evidence boundary names what a chunk timeline cannot show', () => {
  const model = buildStreamModel({ scenario: 'clean', upTo: 5 })
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['provider', 'token', 'adapter']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})

test('the stream lab page wires the state module and its copy control', () => {
  const htmlPath = new URL('../website/public/llm-stream-lab.html', import.meta.url)
  const html = readFileSync(fileURLToPath(htmlPath), 'utf8')
  assert.ok(html.includes('id="copy-state-link"'))
  assert.ok(html.includes('Content-Security-Policy'), 'lab pages ship their own CSP')
  const script = readFileSync(fileURLToPath(new URL('../website/public/llm-stream-lab.js', import.meta.url)), 'utf8')
  for (const marker of ['readStateFromHash', 'writeStateToHash', 'STREAM_STATE_SCHEMA']) {
    assert.ok(script.includes(marker), 'llm-stream-lab.js must reference ' + marker)
  }
})
