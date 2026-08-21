import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  COMPACTION_SCENARIOS,
  buildCompactionModel,
  evaluateCompactionOracle,
} from '../website/public/compaction-model.js'

const SCENARIOS = COMPACTION_SCENARIOS.map(scenario => scenario.id)

test('the same input produces byte-identical output', () => {
  assert.equal(
    JSON.stringify(buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })),
    JSON.stringify(buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })),
  )
})

test('every scenario passes every oracle check at every keep-recent position', () => {
  for (const scenario of SCENARIOS) {
    const totalTurns = buildCompactionModel({ scenario, keepRecent: 0 }).turns.length
    for (let keepRecent = 0; keepRecent <= totalTurns; keepRecent += 1) {
      const verdict = evaluateCompactionOracle(
        buildCompactionModel({ scenario, keepRecent }),
      )
      for (const check of verdict.checks) {
        assert.equal(check.pass, true,
          scenario + ' keep=' + String(keepRecent) + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('compaction never changes the raw event count', () => {
  for (const scenario of SCENARIOS) {
    const baseline = buildCompactionModel({ scenario, keepRecent: 0 })
    for (let keepRecent = 0; keepRecent <= baseline.turns.length; keepRecent += 1) {
      const model = buildCompactionModel({ scenario, keepRecent })
      assert.equal(model.observations.eventCount, baseline.observations.eventCount,
        scenario + ': compaction must not delete events')
    }
  }
})

test('the summary cites exactly the replaced events and nothing kept', () => {
  const model = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 3 })
  assert.ok(model.summary !== null)
  const cited = new Set(model.summary.sourceEventSeqs)
  const replacedTurns = model.turns.slice(0, model.turns.length - 3)
  const expected = replacedTurns.flatMap(turn => turn.events.map(entry => entry.sequence))
  for (const sequence of expected) {
    assert.ok(cited.has(sequence), 'summary must cite #' + String(sequence))
  }
  // 多引一条保留轮的事件，就是把没替换的内容也声称成来源。
  const keptFirst = model.turns[model.turns.length - 3].events[0].sequence
  assert.equal(cited.has(keptFirst), false)
})

test('recent turns survive verbatim while old nodes disappear', () => {
  const model = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })
  const labels = model.surfaceNodes.map(node => node.turn)
  for (const turn of model.turns.slice(-2)) {
    assert.ok(labels.includes(turn.label), turn.label + ' must stay on the surface')
  }
  assert.ok(!labels.includes(model.turns[0].label), 'the oldest turn must be replaced')
})

test('keeping every turn means no replacement and no summary cost', () => {
  const model = buildCompactionModel({ scenario: 'many-chunks', keepRecent: 99 })
  assert.equal(model.summary, null)
  assert.equal(model.observations.savedRatio, 0)
  assert.equal(model.observations.tokensAfter, model.observations.tokensBefore)
})

test('chunk folding collapses chunk runs into one message node per turn', () => {
  const model = buildCompactionModel({ scenario: 'many-chunks', keepRecent: 99 })
  const folded = model.surfaceNodes.filter(node => node.label.startsWith('折叠 '))
  assert.equal(folded.length, model.turns.length)
  for (const node of folded) {
    assert.equal(node.sourceEventSeqs.length, 6, '5 chunks + 1 message event')
    assert.deepEqual(node.sourceEventSeqs, node.sourceEventSeqs.map(Number).sort((a, b) => a - b),
      'cited sequences must stay in log order')
  }
})

test('the recent-heavy shape cannot be compressed much', () => {
  const model = buildCompactionModel({ scenario: 'recent-heavy', keepRecent: 1 })
  assert.ok(model.observations.savedRatio < 15,
    'saved ' + String(model.observations.savedRatio) + '% but the big payload is in the last turn')
})

test('dropping a cited sequence is what breaks the rule, and the oracle says so', () => {
  const model = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })
  const tampered = {
    ...model,
    summary: { ...model.summary, sourceEventSeqs: model.summary.sourceEventSeqs.slice(4) },
  }
  const verdict = evaluateCompactionOracle(tampered)
  assert.equal(verdict.pass, false)
  const check = verdict.checks.find(candidate => candidate.id === 'SUMMARY_CITES_SOURCES')
  assert.equal(check.pass, false)
})

test('a summary that cites a kept event fails the coverage check', () => {
  const model = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })
  const keptSequence = model.turns[model.turns.length - 1].events[0].sequence
  const tampered = {
    ...model,
    summary: {
      ...model.summary,
      sourceEventSeqs: [...model.summary.sourceEventSeqs, keptSequence],
    },
  }
  const check = evaluateCompactionOracle(tampered).checks
    .find(candidate => candidate.id === 'SUMMARY_CITES_SOURCES')
  assert.equal(check.pass, false)
})

test('tampering with the token totals fails the recount check', () => {
  const model = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })
  const tampered = {
    ...model,
    observations: { ...model.observations, tokensAfter: model.observations.tokensAfter - 50 },
  }
  const check = evaluateCompactionOracle(tampered).checks
    .find(candidate => candidate.id === 'NO_DOUBLE_COUNT')
  assert.equal(check.pass, false)
})

test('an unknown scenario or bad keep-recent is rejected rather than defaulted', () => {
  assert.throws(() => buildCompactionModel({ scenario: 'nope', keepRecent: 1 }), RangeError)
  assert.throws(() => buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 'x' }), TypeError)
  assert.throws(() => buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 1.5 }), TypeError)
  assert.throws(() => buildCompactionModel({ scenario: 'twelve-turns', keepRecent: -1 }), RangeError)
})

test('the evidence boundary names what a folding diagram cannot show', () => {
  const model = buildCompactionModel({ scenario: 'twelve-turns', keepRecent: 2 })
  assert.ok(model.canProve.length >= 3)
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['token', 'provider', '模型']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})

test('the compaction lab page wires the state module and its copy control', () => {
  const html = readFileSync(fileURLToPath(new URL('../website/public/compaction-lab.html', import.meta.url)), 'utf8')
  assert.ok(html.includes('id="copy-state-link"'))
  assert.ok(html.includes('Content-Security-Policy'), 'lab pages ship their own CSP')
  const script = readFileSync(fileURLToPath(new URL('../website/public/compaction-lab.js', import.meta.url)), 'utf8')
  for (const marker of ['readStateFromHash', 'writeStateToHash', 'COMPACTION_STATE_SCHEMA']) {
    assert.ok(script.includes(marker), 'compaction-lab.js must reference ' + marker)
  }
})
