import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  AGENT_SCOPES,
  EXECUTION_POLICIES,
  TOOL_BUNDLES,
  buildToolVisibilityModel,
  evaluateToolVisibilityOracle,
} from '../website/public/tool-visibility-model.js'

const SCOPES = AGENT_SCOPES.map(scope => scope.id)
const POLICIES = EXECUTION_POLICIES.map(policy => policy.id)

test('the same input produces byte-identical output', () => {
  const input = { scope: 'editor', policy: 'ask-high-risk' }
  assert.equal(
    JSON.stringify(buildToolVisibilityModel(input)),
    JSON.stringify(buildToolVisibilityModel(input)),
  )
})

test('the three levels nest for every scope and policy combination', () => {
  for (const scope of SCOPES) {
    for (const policy of POLICIES) {
      const model = buildToolVisibilityModel({ scope, policy })
      const verdict = evaluateToolVisibilityOracle(model)
      for (const check of verdict.checks) {
        assert.equal(check.pass, true,
          scope + '/' + policy + ' failed ' + check.id + ': ' + check.actual)
      }
      const { registered, modelVisible, executionAllowed } = model.observations
      assert.ok(executionAllowed <= modelVisible)
      assert.ok(modelVisible <= registered)
    }
  }
})

test('an unloaded bundle stops its tools before they are registered', () => {
  const withShell = buildToolVisibilityModel({ scope: 'full', policy: 'allow-all' })
  const withoutShell = buildToolVisibilityModel({
    bundles: TOOL_BUNDLES.filter(bundle => bundle !== 'shell'),
    scope: 'full',
    policy: 'allow-all',
  })
  const shellTools = withShell.tools.filter(tool => tool.bundle === 'shell')
  assert.ok(shellTools.length > 0)
  assert.equal(withoutShell.observations.registered, withShell.observations.registered - shellTools.length)
  for (const tool of withoutShell.tools.filter(tool => tool.bundle === 'shell')) {
    assert.equal(tool.registered, false)
    assert.equal(tool.reachedLevel, 0)
    assert.ok(tool.blockedBy.includes('shell'))
  }
})

test('the scope narrows visibility without touching registration', () => {
  const full = buildToolVisibilityModel({ scope: 'full', policy: 'allow-all' })
  const reader = buildToolVisibilityModel({ scope: 'reader', policy: 'allow-all' })
  assert.equal(reader.observations.registered, full.observations.registered)
  assert.ok(reader.observations.modelVisible < full.observations.modelVisible)
  for (const tool of reader.tools.filter(candidate => candidate.reachedLevel === 1)) {
    assert.ok(tool.blockedBy.startsWith('agent 作用域'))
  }
})

test('the policy narrows execution without touching visibility', () => {
  const open = buildToolVisibilityModel({ scope: 'full', policy: 'allow-all' })
  const strict = buildToolVisibilityModel({ scope: 'full', policy: 'read-only' })
  assert.equal(strict.observations.modelVisible, open.observations.modelVisible)
  assert.ok(strict.observations.executionAllowed < open.observations.executionAllowed)
  for (const tool of strict.tools.filter(candidate => candidate.reachedLevel === 2)) {
    assert.ok(tool.blockedBy.startsWith('执行策略'))
  }
})

test('the visible-but-not-allowed gap is what the page claims it is', () => {
  const model = buildToolVisibilityModel({ scope: 'full', policy: 'read-only' })
  const gap = model.observations.visibleButNotAllowed
  assert.ok(gap.length > 0, 'this combination has to produce the gap the lesson is about')
  for (const name of gap) {
    const tool = model.tools.find(candidate => candidate.name === name)
    assert.equal(tool.modelVisible, true)
    assert.equal(tool.executionAllowed, false)
  }
  assert.equal(gap.length, model.observations.modelVisible - model.observations.executionAllowed)
})

test('the four destinations partition the catalog exactly once', () => {
  for (const scope of SCOPES) {
    for (const policy of POLICIES) {
      const model = buildToolVisibilityModel({ scope, policy })
      const { blockedByBundle, blockedByScope, blockedByPolicy, executionAllowed, catalog } = model.observations
      assert.equal(blockedByBundle + blockedByScope + blockedByPolicy + executionAllowed, catalog)
    }
  }
})

test('a forged allowed flag fails the subset check instead of rendering as allowed', () => {
  const model = buildToolVisibilityModel({ scope: 'reader', policy: 'read-only' })
  const hidden = model.tools.find(tool => !tool.modelVisible)
  assert.ok(hidden !== undefined)
  const tampered = {
    ...model,
    tools: model.tools.map(tool => tool.name === hidden.name
      ? { ...tool, executionAllowed: true }
      : tool),
  }
  const verdict = evaluateToolVisibilityOracle(tampered)
  assert.equal(verdict.pass, false)
  const check = verdict.checks.find(candidate => candidate.id === 'ALLOWED_SUBSET_VISIBLE')
  assert.equal(check.pass, false)
  assert.ok(check.actual.includes(hidden.name))
})

test('a level that disagrees with its flags fails the oracle', () => {
  const model = buildToolVisibilityModel({ scope: 'editor', policy: 'ask-high-risk' })
  const tampered = {
    ...model,
    tools: model.tools.map((tool, index) => index === 0 ? { ...tool, reachedLevel: 3 } : tool),
  }
  const verdict = evaluateToolVisibilityOracle(tampered)
  const check = verdict.checks.find(candidate => candidate.id === 'LEVEL_MATCHES_FLAGS')
  assert.equal(check.pass, model.tools[0].reachedLevel === 3)
  if (model.tools[0].reachedLevel !== 3) assert.equal(verdict.pass, false)
})

test('unknown inputs are rejected rather than silently defaulted', () => {
  assert.throws(() => buildToolVisibilityModel({ scope: 'nope' }), RangeError)
  assert.throws(() => buildToolVisibilityModel({ policy: 'nope' }), RangeError)
  assert.throws(() => buildToolVisibilityModel({ bundles: ['nope'] }), RangeError)
  assert.throws(() => buildToolVisibilityModel({ bundles: 'core-fs' }), TypeError)
  assert.throws(() => evaluateToolVisibilityOracle(null), TypeError)
  assert.throws(() => evaluateToolVisibilityOracle({ tools: 'no' }), TypeError)
})

test('loading nothing leaves every level empty and still nests', () => {
  const model = buildToolVisibilityModel({ bundles: [], scope: 'full', policy: 'allow-all' })
  assert.equal(model.observations.registered, 0)
  assert.equal(model.observations.modelVisible, 0)
  assert.equal(model.observations.executionAllowed, 0)
  assert.equal(model.observations.blockedByBundle, model.observations.catalog)
  assert.equal(evaluateToolVisibilityOracle(model).pass, true)
})

test('the evidence boundary names what a set diagram cannot show', () => {
  const model = buildToolVisibilityModel()
  assert.ok(model.canProve.length >= 3)
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['真实', '模型', '审批']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})

test('the ghost-allow fault is caught by ALLOWED_SUBSET_VISIBLE alone', () => {
  const model = buildToolVisibilityModel({ scope: 'reader', policy: 'read-only', fault: 'ghost-allow' })
  const ghost = model.observations.ghostAllowed
  assert.equal(typeof ghost, 'string', 'a scope-blocked tool must be forged into the allowed set')
  const result = evaluateToolVisibilityOracle(model)
  assert.equal(result.pass, false, 'a tool allowed outside the visible set must fail the oracle')
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['ALLOWED_SUBSET_VISIBLE'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
  const forged = model.tools.find(tool => tool.name === ghost)
  assert.equal(forged.modelVisible, false, 'the ghost stays invisible to the model')
  assert.equal(forged.executionAllowed, true, 'the ghost is allowed to execute')
})

test('the ghost-allow fault is ineffective when the scope blocks nothing', () => {
  const model = buildToolVisibilityModel({ scope: 'full', policy: 'read-only', fault: 'ghost-allow' })
  assert.equal(model.observations.ghostAllowed, undefined)
  assert.equal(evaluateToolVisibilityOracle(model).pass, true)
})

test('an unknown fault type fails loud at the model boundary', () => {
  assert.throws(() => buildToolVisibilityModel({ scope: 'reader', policy: 'read-only', fault: 'no-such-fault' }))
})
