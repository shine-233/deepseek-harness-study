import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  BINDING_CANDIDATES,
  CODE_RUN_SCENARIOS,
  buildCodeRunModel,
  evaluateCodeRunOracle,
} from '../website/public/code-run-model.js'

test('the same input produces byte-identical output', () => {
  const input = { scenario: 'timeout', binding: 'tools' }
  assert.equal(
    JSON.stringify(buildCodeRunModel(input)),
    JSON.stringify(buildCodeRunModel(input)),
  )
})

test('every scenario × binding combo passes every oracle check', () => {
  assert.equal(CODE_RUN_SCENARIOS.length * BINDING_CANDIDATES.length, 42)
  for (const scenario of CODE_RUN_SCENARIOS) {
    for (const binding of BINDING_CANDIDATES) {
      const model = buildCodeRunModel({ scenario, binding })
      const result = evaluateCodeRunOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true, `${scenario}/${binding} failed ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('run() resolves on every failed timeline and never rejects', () => {
  for (const scenario of CODE_RUN_SCENARIOS) {
    const model = buildCodeRunModel({ scenario, binding: 'tools' })
    assert.equal(model.observations.resolvedWithoutReject, true, scenario)
    if (scenario !== 'success') {
      assert.equal(model.result.error?.kind, scenario, scenario)
      assert.equal(model.result.value, null, scenario)
    } else {
      assert.equal(model.result.error, null)
      assert.deepEqual(model.result.value, { ok: true })
    }
  }
})

test('invalid bindings block assembly before any run step exists', () => {
  for (const binding of ['$tools', 'console', '__dsh_main__', 'for']) {
    const model = buildCodeRunModel({ scenario: 'exception', binding })
    assert.equal(model.result.blockedBeforeRun, true, binding)
    assert.equal(model.steps.length, 1, binding)
    assert.equal(model.steps[0].pass, false, binding)
    assert.equal(model.observations.logCount, 0, binding)
  }
})

test('valid bindings pass all three checks and run every scenario', () => {
  for (const binding of ['tools', 'app_data']) {
    for (const scenario of CODE_RUN_SCENARIOS) {
      const model = buildCodeRunModel({ scenario, binding })
      assert.equal(model.bindingCheck.ok, true, `${scenario}/${binding}`)
      assert.ok(model.steps.some(step => step.kind === 'run'), `${scenario}/${binding}`)
    }
  }
})

test('unknown inputs are rejected loudly', () => {
  assert.throws(() => buildCodeRunModel({ scenario: 'nope', binding: 'tools' }), RangeError)
  assert.throws(() => buildCodeRunModel({ scenario: 'abort', binding: 'window' }), RangeError)
})
