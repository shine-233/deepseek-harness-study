import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  INVARIANT_FILTERS,
  INVARIANT_OUTCOMES,
  INVARIANT_PACKAGES,
  buildInvariantModel,
  evaluateInvariantOracle,
} from '../website/public/invariant-model.js'

test('the same input produces byte-identical output', () => {
  const input = { packageName: '@deepseek-ai/dsh-jobs', filter: 'unfiltered', outcome: 'violation' }
  assert.equal(
    JSON.stringify(buildInvariantModel(input)),
    JSON.stringify(buildInvariantModel(input)),
  )
})

test('every package × filter × outcome combo passes every oracle check', () => {
  assert.equal(INVARIANT_PACKAGES.length * INVARIANT_FILTERS.length * INVARIANT_OUTCOMES.length, 30)
  for (const packageName of INVARIANT_PACKAGES) {
    for (const filter of INVARIANT_FILTERS) {
      for (const outcome of INVARIANT_OUTCOMES) {
        const model = buildInvariantModel({ packageName, filter, outcome })
        const result = evaluateInvariantOracle(model)
        for (const check of result.checks) {
          assert.equal(check.pass, true, `${packageName}/${filter}/${outcome} failed ${check.id}: ${check.actual}`)
        }
      }
    }
  }
})

test('the package name is reserved in every combination, first step always', () => {
  for (const filter of INVARIANT_FILTERS) {
    for (const outcome of INVARIANT_OUTCOMES) {
      const model = buildInvariantModel({ packageName: '@deepseek-ai/dsh-jobs', filter, outcome })
      assert.equal(model.steps[0].kind, 'reserve', `${filter}/${outcome}`)
      assert.equal(model.observations.reserved, true, `${filter}/${outcome}`)
    }
  }
})

test('filtered combos never start a child fiber; selected combos always do', () => {
  for (const filter of INVARIANT_FILTERS) {
    for (const outcome of INVARIANT_OUTCOMES) {
      const model = buildInvariantModel({ packageName: '@deepseek-ai/dsh-jobs', filter, outcome })
      const childSteps = model.steps.filter(step => step.kind === 'child-start').length
      assert.equal(childSteps > 0, model.observations.selected, `${filter}/${outcome}`)
    }
  }
})

test('violations attribute the error to the registering package', () => {
  for (const packageName of INVARIANT_PACKAGES) {
    const model = buildInvariantModel({ packageName, filter: 'unfiltered', outcome: 'violation' })
    assert.equal(model.observations.error?.packageName, packageName)
    assert.equal(model.observations.error?.code, 'INVARIANT')
  }
})

test('unknown inputs are rejected loudly', () => {
  assert.throws(() => buildInvariantModel({ packageName: 'nope', filter: 'unfiltered', outcome: 'pass' }), RangeError)
  assert.throws(() => buildInvariantModel({ packageName: '@deepseek-ai/dsh-jobs', filter: 'nope', outcome: 'pass' }), RangeError)
  assert.throws(() => buildInvariantModel({ packageName: '@deepseek-ai/dsh-jobs', filter: 'disabled', outcome: 'nope' }), RangeError)
})

test('the swallow-violation fault is caught by FAIL_ATTRIBUTES_PACKAGE alone', () => {
  const input = { packageName: '@deepseek-ai/dsh-jobs', filter: 'unfiltered', outcome: 'violation', fault: 'swallow-violation' }
  const model = buildInvariantModel(input)
  assert.equal(model.observations.error, null, 'the swallowed error must disappear from the page view')
  const result = evaluateInvariantOracle(model)
  assert.equal(result.pass, false, 'the swallowed violation must fail the oracle')
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['FAIL_ATTRIBUTES_PACKAGE'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the swallow-violation fault is ineffective when checks never ran', () => {
  for (const filter of ['allowlist-miss', 'blocklist-hit', 'disabled']) {
    const model = buildInvariantModel({ packageName: '@deepseek-ai/dsh-jobs', filter, outcome: 'violation', fault: 'swallow-violation' })
    assert.equal(evaluateInvariantOracle(model).pass, true, filter + ': nothing ran, nothing to swallow')
  }
  for (const outcome of ['pass', 'startup-error']) {
    const model = buildInvariantModel({ packageName: '@deepseek-ai/dsh-invariants', filter: 'unfiltered', outcome, fault: 'swallow-violation' })
    if (outcome === 'pass') {
      assert.equal(evaluateInvariantOracle(model).pass, true, 'a passing check has no violation to swallow')
    }
  }
})

test('an unknown fault type fails loud at the model boundary', () => {
  assert.throws(() => buildInvariantModel({ packageName: '@deepseek-ai/dsh-jobs', filter: 'unfiltered', outcome: 'violation', fault: 'no-such-fault' }))
})
