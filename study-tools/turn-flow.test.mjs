import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  TURN_LANES,
  TURN_SCENARIOS,
  buildTurnModel,
  evaluateTurnOracle,
} from '../website/public/turn-flow-model.js'

const SCENARIOS = TURN_SCENARIOS.map(scenario => scenario.id)

test('the same scenario produces byte-identical output', () => {
  assert.equal(
    JSON.stringify(buildTurnModel({ scenario: 'two-tools' })),
    JSON.stringify(buildTurnModel({ scenario: 'two-tools' })),
  )
})

test('every scenario passes every oracle check', () => {
  for (const scenario of SCENARIOS) {
    const model = buildTurnModel({ scenario })
    const verdict = evaluateTurnOracle(model)
    for (const check of verdict.checks) {
      assert.equal(check.pass, true, scenario + ' failed ' + check.id + ': ' + check.actual)
    }
  }
})

test('everything that reaches a model request is reconstructable from the log', () => {
  for (const scenario of SCENARIOS) {
    const model = buildTurnModel({ scenario })
    assert.deepEqual(model.observations.unreconstructable, [])
    for (const pair of model.pairs) {
      assert.equal(pair.reconstructable, true, scenario + ': ' + pair.payloadId)
      assert.ok(pair.visibleAt.length > 0)
      assert.ok(pair.loggedAt.length > 0)
    }
  }
})

test('a tool result is logged before it goes back to the model', () => {
  const model = buildTurnModel({ scenario: 'two-tools' })
  const resultPairs = model.pairs.filter(pair => pair.payloadId.startsWith('p-result-'))
  assert.ok(resultPairs.length >= 2)
  for (const pair of resultPairs) {
    assert.ok(Math.min(...pair.loggedAt) < Math.min(...pair.visibleAt),
      pair.payloadId + ' must be logged before it becomes model-visible')
  }
})

test('one turn carries more than one model request once a tool is involved', () => {
  const withTools = buildTurnModel({ scenario: 'two-tools' })
  const withoutTools = buildTurnModel({ scenario: 'no-tools' })
  assert.equal(withoutTools.observations.modelRequests, 1)
  assert.ok(withTools.observations.modelRequests > 1)
  // Each tool result that returns to the model adds a request.
  assert.equal(
    withTools.observations.modelRequests,
    1 + withTools.pairs.filter(pair => pair.payloadId.startsWith('p-result-')).length,
  )
})

test('a denied tool call still produces a logged result and no body run', () => {
  const model = buildTurnModel({ scenario: 'denied-tool' })
  assert.equal(model.observations.toolDenials, 1)
  const denied = model.steps.find(entry => entry.denied === true)
  assert.ok(denied !== undefined)
  const afterDenial = model.steps.filter(entry => entry.index > denied.index)
  assert.ok(afterDenial.some(entry => entry.phase === 'tool-result-logged'),
    'a denial still settles into a logged result')
  assert.equal(
    afterDenial.filter(entry => entry.phase === 'tool-run' && entry.retry !== true).length,
    0,
    'a denial must not be followed by a plain body run',
  )
})

test('a failed tool call is logged and retried rather than skipped', () => {
  const model = buildTurnModel({ scenario: 'two-tools' })
  assert.equal(model.observations.toolFailures, 1)
  const failed = model.steps.find(entry => entry.failed === true)
  const retry = model.steps.find(entry => entry.retry === true)
  assert.ok(failed !== undefined && retry !== undefined)
  assert.ok(retry.index > failed.index)
  const failureLogged = model.steps.some(entry => entry.phase === 'tool-result-logged'
    && entry.index > failed.index && entry.index < retry.index)
  assert.equal(failureLogged, true, 'the failure has to be logged before the retry')
})

test('the no-tools scenario has no tool lane steps at all', () => {
  const model = buildTurnModel({ scenario: 'no-tools' })
  assert.equal(model.observations.toolRuns, 0)
  assert.equal(model.steps.filter(entry => entry.lane === 'tool').length, 0)
  assert.equal(evaluateTurnOracle(model).pass, true)
})

test('dropping a log event is what breaks the rule, and the oracle says so', () => {
  const model = buildTurnModel({ scenario: 'two-tools' })
  const target = model.pairs.find(pair => pair.payloadId.startsWith('p-result-'))
  assert.ok(target !== undefined)
  const tampered = {
    ...model,
    steps: model.steps.map(entry => entry.payloadId === target.payloadId && entry.logged
      ? { ...entry, logged: false }
      : entry),
  }
  const verdict = evaluateTurnOracle(tampered)
  assert.equal(verdict.pass, false)
  const check = verdict.checks.find(candidate => candidate.id === 'MODEL_VISIBLE_IS_LOGGED')
  assert.equal(check.pass, false)
  assert.ok(check.actual.includes(target.payloadId))
})

test('reordering the steps fails the ordering check', () => {
  const model = buildTurnModel({ scenario: 'two-tools' })
  const tampered = { ...model, steps: [...model.steps].reverse() }
  const verdict = evaluateTurnOracle(tampered)
  assert.equal(verdict.checks.find(check => check.id === 'STEPS_ORDERED').pass, false)
  assert.equal(verdict.pass, false)
})

test('every step lands on a declared lane', () => {
  for (const scenario of SCENARIOS) {
    for (const entry of buildTurnModel({ scenario }).steps) {
      assert.ok(TURN_LANES.includes(entry.lane), scenario + ': ' + entry.lane)
    }
  }
})

test('an unknown scenario is rejected rather than silently defaulted', () => {
  assert.throws(() => buildTurnModel({ scenario: 'nope' }), RangeError)
  assert.throws(() => evaluateTurnOracle(null), TypeError)
  assert.throws(() => evaluateTurnOracle({ steps: 'no' }), TypeError)
})

test('the evidence boundary names what a step trace cannot show', () => {
  const model = buildTurnModel()
  assert.ok(model.canProve.length >= 3)
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['token', '耗时', '真实']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})
