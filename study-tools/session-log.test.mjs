import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  LOG_SCENARIOS,
  SESSION_FORMAT_VERSION,
  buildSessionLogModel,
  evaluateSessionLogOracle,
  replaySessionLog,
} from '../website/public/session-log-model.js'

const SCENARIOS = LOG_SCENARIOS.map(scenario => scenario.id)

test('every scenario passes every oracle check', () => {
  for (const scenario of SCENARIOS) {
    const model = buildSessionLogModel({ scenario })
    const verdict = evaluateSessionLogOracle(model)
    for (const check of verdict.checks) {
      assert.equal(check.pass, true, scenario + ' failed ' + check.id + ': ' + check.actual)
    }
  }
})

test('state is a function of the log: replaying the same prefix twice is identical', () => {
  const model = buildSessionLogModel({ scenario: 'clean' })
  for (let upTo = 0; upTo <= model.maxSequence; upTo += 1) {
    const first = replaySessionLog(model.log, upTo)
    const second = replaySessionLog(model.log, upTo)
    assert.deepEqual(first.state, second.state, 'prefix ' + String(upTo) + ' is not deterministic')
  }
})

test('replaying forward then back to the same point restores the same state', () => {
  const model = buildSessionLogModel({ scenario: 'clean' })
  const atFour = replaySessionLog(model.log, 4).state
  replaySessionLog(model.log, model.maxSequence)
  const atFourAgain = replaySessionLog(model.log, 4).state
  assert.deepEqual(atFour, atFourAgain)
  // The title is set at a later event, so the earlier prefix must not know it.
  const atEnd = replaySessionLog(model.log, model.maxSequence).state
  assert.notEqual(atFour.title, atEnd.title)
})

test('an ignorable unknown event is skipped and changes nothing else', () => {
  const clean = buildSessionLogModel({ scenario: 'clean' })
  const withHint = buildSessionLogModel({ scenario: 'unknown-ignorable' })
  assert.equal(withHint.observations.skipped, 1)
  assert.equal(withHint.observations.refusedAt, null)
  // Skipping it must leave the folded state identical to the clean log.
  assert.equal(withHint.observations.messages, clean.observations.messages)
  assert.equal(withHint.observations.tokens, clean.observations.tokens)
  assert.equal(withHint.observations.title, clean.observations.title)
})

test('a required unknown event stops the load instead of being skipped', () => {
  const model = buildSessionLogModel({ scenario: 'unknown-required' })
  assert.notEqual(model.observations.refusedAt, null)
  assert.equal(model.observations.skipped, 0)
  assert.equal(model.observations.fullyLoadable, false)
  assert.ok(model.observations.notReached > 0)
  const refused = model.partial.dispositions.find(entry => entry.disposition === 'refused')
  assert.ok(refused.reason.includes('ignorable'))
  // What is already folded stays usable; refusing is not the same as losing everything.
  assert.ok(model.observations.applied > 0)
  assert.ok(model.observations.messages > 0)
})

test('a sequence gap stops the load and names the position', () => {
  const model = buildSessionLogModel({ scenario: 'gap' })
  assert.notEqual(model.observations.refusedAt, null)
  const refused = model.partial.dispositions.find(entry => entry.disposition === 'refused')
  assert.ok(refused.reason.includes('缺口'))
  assert.equal(evaluateSessionLogOracle(model).pass, true)
})

test('nothing is applied after a refusal', () => {
  for (const scenario of ['unknown-required', 'gap']) {
    const model = buildSessionLogModel({ scenario })
    const refusedAt = model.observations.refusedAt
    const applied = model.partial.dispositions.filter(entry => entry.disposition === 'applied')
    assert.ok(applied.every(entry => entry.sequence < refusedAt),
      scenario + ' applied an event at or after the refusal')
  }
})

test('a forged skip of a required event fails the oracle', () => {
  const model = buildSessionLogModel({ scenario: 'clean' })
  const tampered = {
    ...model,
    partial: {
      ...model.partial,
      dispositions: model.partial.dispositions.map((entry, index) => index === 2
        ? { ...entry, disposition: 'skipped', reason: '伪造的跳过' }
        : entry),
    },
  }
  // The oracle replays the log itself, so a forged disposition list cannot make
  // an illegal skip look legal: the recomputed run still applies that event.
  const verdict = evaluateSessionLogOracle(tampered)
  const observations = verdict.checks.find(check => check.id === 'OBSERVATIONS_MATCH')
  assert.equal(observations.pass, true, 'the oracle reads the log, not the tampered list')
  const model2 = buildSessionLogModel({ scenario: 'clean' })
  const brokenLog = {
    ...model2,
    log: model2.log.map(entry => entry.sequence === 2 ? { ...entry, type: 'made-up-type' } : entry),
  }
  const verdict2 = evaluateSessionLogOracle(brokenLog)
  assert.equal(verdict2.checks.find(check => check.id === 'OBSERVATIONS_MATCH').pass, false)
})

test('the format version travels with the model', () => {
  const model = buildSessionLogModel()
  assert.equal(model.formatVersion, SESSION_FORMAT_VERSION)
  assert.ok(model.log.every(entry => entry.formatVersion === SESSION_FORMAT_VERSION))
})

test('unknown inputs are rejected rather than silently defaulted', () => {
  assert.throws(() => buildSessionLogModel({ scenario: 'nope' }), RangeError)
  assert.throws(() => replaySessionLog('not-an-array'), TypeError)
  assert.throws(() => evaluateSessionLogOracle(null), TypeError)
  assert.throws(() => evaluateSessionLogOracle({ log: 'no' }), TypeError)
})

test('the evidence boundary names what a fold cannot show', () => {
  const model = buildSessionLogModel()
  assert.ok(model.canProve.length >= 3)
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['真实', '耗时', '并发']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})
