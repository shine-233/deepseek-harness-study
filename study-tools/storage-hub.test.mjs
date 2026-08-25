import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  STORAGE_BACKENDS,
  STORAGE_SCENARIOS,
  STORAGE_UNIT_NAMES,
  buildStorageModel,
  evaluateStorageOracle,
} from '../website/public/storage-hub-model.js'

test('the same input produces byte-identical output', () => {
  const input = { backend: 'sqlite', scenario: 'version-mismatch', unitName: 'todos_v2' }
  assert.equal(
    JSON.stringify(buildStorageModel(input)),
    JSON.stringify(buildStorageModel(input)),
  )
})

test('every combo passes every oracle check', () => {
  assert.equal(STORAGE_BACKENDS.length * STORAGE_SCENARIOS.length * STORAGE_UNIT_NAMES.length, 36)
  for (const backend of STORAGE_BACKENDS) {
    for (const scenario of STORAGE_SCENARIOS) {
      for (const unitName of STORAGE_UNIT_NAMES) {
        const model = buildStorageModel({ backend, scenario, unitName })
        const result = evaluateStorageOracle(model)
        for (const check of result.checks) {
          assert.equal(check.pass, true, `${backend}/${scenario}/${unitName} failed ${check.id}: ${check.actual}`)
        }
      }
    }
  }
})

test('facet-less backends fail at resolution before any open step', () => {
  for (const scenario of STORAGE_SCENARIOS) {
    const model = buildStorageModel({ backend: 'nofacet', scenario, unitName: 'todos_v2' })
    assert.equal(model.observations.errorCode, 'facet-missing', scenario)
    assert.equal(model.steps.length, 2, scenario)
    assert.equal(model.steps[1].pass, false, scenario)
    assert.ok(!model.steps.some(step => step.kind === 'open'), scenario)
  }
})

test('invalid unit names are rejected before open with no error-code drift', () => {
  for (const backend of ['json', 'sqlite']) {
    for (const scenario of STORAGE_SCENARIOS) {
      const model = buildStorageModel({ backend, scenario, unitName: 'Todos-V2' })
      assert.equal(model.observations.errorCode, 'invalid-unit-name', `${backend}/${scenario}`)
      assert.ok(!model.steps.some(step => step.kind === 'open'), `${backend}/${scenario}`)
    }
  }
})

test('error codes use the exact upstream vocabulary', () => {
  const expectations = {
    'version-mismatch': 'version-mismatch',
    'malformed-medium': 'malformed-medium',
    'double-open': 'already-open',
    'closed-unit': 'closed',
  }
  for (const [scenario, code] of Object.entries(expectations)) {
    const model = buildStorageModel({ backend: 'json', scenario, unitName: 'todos_v2' })
    assert.equal(model.observations.errorCode, code, scenario)
    const step = model.steps.find(item => item.kind === 'error')
    assert.equal(step.code, code, scenario)
  }
})

test('happy path and missing-key-delete end with an opened unit and durable writes', () => {
  for (const scenario of ['happy-path', 'missing-key-delete']) {
    const model = buildStorageModel({ backend: 'sqlite', scenario, unitName: 'todos_v2' })
    assert.equal(model.observations.openedUnit, 'todos_v2', scenario)
    assert.equal(model.observations.durableOnceResolved, true, scenario)
    assert.ok(model.steps.some(step => step.kind === 'reopen'), scenario)
  }
  const idempotent = buildStorageModel({ backend: 'json', scenario: 'missing-key-delete', unitName: 'todos_v2' })
  assert.equal(idempotent.observations.deleteIdempotent, true)
})

test('unknown inputs are rejected loudly', () => {
  assert.throws(() => buildStorageModel({ backend: 'redis', scenario: 'happy-path', unitName: 'todos_v2' }), RangeError)
  assert.throws(() => buildStorageModel({ backend: 'json', scenario: 'nope', unitName: 'todos_v2' }), RangeError)
  assert.throws(() => buildStorageModel({ backend: 'json', scenario: 'happy-path', unitName: 'nope' }), RangeError)
})
