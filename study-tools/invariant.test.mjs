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
