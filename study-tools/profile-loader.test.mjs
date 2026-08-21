import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  BUNDLE_NAMES,
  OVERLAY_SOURCES,
  PROFILE_KEYS,
  buildProfileModel,
  evaluateProfileOracle,
  resolveProfile,
} from '../website/public/profile-loader-model.js'

const DEFAULT_ORDER = ['base', 'web-tools', 'shell-tools', 'observability', 'strict-limits']

test('the default profile passes every oracle check', () => {
  const model = buildProfileModel()
  const verdict = evaluateProfileOracle(model)
  for (const check of verdict.checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('resolving the same input twice produces the same config', () => {
  const input = { order: DEFAULT_ORDER, overlay: 'cli' }
  assert.deepEqual(resolveProfile(input).config, resolveProfile(input).config)
})

test('order changes the result, which is the whole point of the lesson', () => {
  const strictLast = buildProfileModel({ order: DEFAULT_ORDER })
  const strictFirst = buildProfileModel({
    order: ['strict-limits', 'base', 'web-tools', 'shell-tools', 'observability'],
  })
  assert.notEqual(strictLast.config.maxTurns, strictFirst.config.maxTurns)
  // Same bundles, same count of applied steps — only the order differs.
  assert.deepEqual([...strictLast.input.order].sort(), [...strictFirst.input.order].sort())
  assert.equal(strictLast.observations.appliedSteps, strictFirst.observations.appliedSteps)
  assert.equal(evaluateProfileOracle(strictFirst).pass, true)
})

test('the last writer of a key is the one that decides its value', () => {
  const model = buildProfileModel({ order: DEFAULT_ORDER })
  for (const key of PROFILE_KEYS) {
    const writers = model.steps.filter(step => step.applied && step.wrote.includes(key))
    if (writers.length === 0) {
      assert.equal(Object.hasOwn(model.config, key), false, key + ' has a value with no writer')
      continue
    }
    const last = writers.at(-1)
    assert.ok(last.finalFor.includes(key), key + ': last writer is not marked final')
    for (const earlier of writers.slice(0, -1)) {
      assert.ok(earlier.overriddenFor.includes(key), key + ': earlier writer not marked overridden')
    }
  }
})

test('an overlay applies after every bundle patch', () => {
  for (const overlay of OVERLAY_SOURCES.filter(candidate => candidate.id !== 'none')) {
    const model = buildProfileModel({ order: DEFAULT_ORDER, overlay: overlay.id })
    const overlaySteps = model.steps.filter(step => step.kind === 'overlay')
    assert.equal(overlaySteps.length, 1)
    assert.equal(overlaySteps[0].index, model.steps.length - 1)
    for (const [key, value] of Object.entries(overlay.patch)) {
      assert.equal(model.config[key], value, overlay.id + ' failed to win on ' + key)
    }
    assert.equal(evaluateProfileOracle(model).pass, true)
  }
})

test('a patch needing a plugin nobody provides fails loud at that step', () => {
  const model = buildProfileModel({ order: ['base', 'broken-ref', 'web-tools'] })
  assert.notEqual(model.failure, null)
  assert.equal(model.failure.stepIndex, 1)
  assert.equal(model.failure.source, 'broken-ref')
  assert.ok(model.failure.reason.includes('nonexistent-plugin'))
  // Nothing after the failure is applied, and the failing step records why.
  assert.equal(model.observations.appliedSteps, 1)
  const failed = model.steps.find(step => !step.applied)
  assert.ok(failed.reason !== null)
  assert.equal(evaluateProfileOracle(model).pass, true)
})

test('a failure leaves the keys written before it, and nothing later', () => {
  const model = buildProfileModel({ order: ['base', 'broken-ref', 'web-tools', 'strict-limits'] })
  assert.equal(model.config.maxTurns, 8, 'base wrote maxTurns before the failure')
  assert.equal(Object.hasOwn(model.config, 'tools.web'), false, 'web-tools never ran')
  assert.ok(model.observations.unsetKeys.includes('tools.web'))
})

test('a forged applied flag after a failure fails the oracle', () => {
  const model = buildProfileModel({ order: ['base', 'broken-ref', 'web-tools'] })
  const tampered = {
    ...model,
    steps: [
      ...model.steps,
      { index: model.steps.length, kind: 'bundle', source: 'web-tools', label: '伪造的步骤', wrote: ['tools.web'], applied: true, reason: null, finalFor: ['tools.web'], overriddenFor: [] },
    ],
  }
  const verdict = evaluateProfileOracle(tampered)
  assert.equal(verdict.pass, false)
  assert.equal(verdict.checks.find(check => check.id === 'FAILURE_STOPS_RESOLUTION').pass, false)
})

test('every declared bundle name resolves', () => {
  for (const name of BUNDLE_NAMES) {
    const model = buildProfileModel({ order: [name] })
    assert.equal(model.input.order.length, 1)
    assert.ok(model.steps.length >= 1)
  }
})

test('unknown inputs are rejected rather than silently defaulted', () => {
  assert.throws(() => buildProfileModel({ order: ['nope'] }), RangeError)
  assert.throws(() => buildProfileModel({ overlay: 'nope' }), RangeError)
  assert.throws(() => buildProfileModel({ order: 'base' }), TypeError)
  assert.throws(() => evaluateProfileOracle(null), TypeError)
  assert.throws(() => evaluateProfileOracle({ steps: 'no' }), TypeError)
})

test('the evidence boundary names what a resolution table cannot show', () => {
  const model = buildProfileModel()
  assert.ok(model.canProve.length >= 3)
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['真实', '耗时', '副作用']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})
