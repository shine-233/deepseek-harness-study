import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  DELEGATE_DEFAULT_MAX_DEPTH,
  DELEGATE_LANES,
  buildSubagentDelegateModel,
  effectiveDelegationDepth,
  evaluateSubagentDelegateOracle,
} from '../website/public/subagent-delegate-model.js'

test('the same input produces byte-identical output', () => {
  const input = { parentDepth: 0, outcome: 'report' }
  assert.equal(
    JSON.stringify(buildSubagentDelegateModel(input)),
    JSON.stringify(buildSubagentDelegateModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const parentDepth of [0, 1, 2, 3]) {
    for (const outcome of ['report', 'fail']) {
      const model = buildSubagentDelegateModel({ parentDepth, outcome })
      const result = evaluateSubagentDelegateOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          parentDepth + '/' + outcome + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const parentDepth of [0, 1, 2, 3]) {
    const model = buildSubagentDelegateModel({ parentDepth, outcome: 'fail' })
    for (const step of model.steps) {
      assert.ok(DELEGATE_LANES.includes(step.lane), parentDepth + ': ' + step.lane)
    }
  }
})

test('the default cap is the upstream default(3)', () => {
  assert.equal(DELEGATE_DEFAULT_MAX_DEPTH, 3)
})

test('child depth is always parent depth plus one', () => {
  for (const parentDepth of [0, 1, 2, 3]) {
    const model = buildSubagentDelegateModel({ parentDepth, outcome: 'report' })
    assert.equal(model.observations.childDepth, parentDepth + 1)
    assert.ok(model.steps.some(step => step.detail.includes(`子深度将是 ${parentDepth + 1}`)))
  }
})

test('a delegation beyond maxDepth is rejected with the verbatim error and spawns nothing', () => {
  const model = buildSubagentDelegateModel({ parentDepth: 3, outcome: 'report' })
  assert.equal(model.observations.childRan, false)
  assert.equal(model.observations.rejected, true)
  assert.equal(model.observations.reportKind, null)
  assert.ok(!model.steps.some(step => step.lane === '子 Agent'), '子泳道必须为空')
  const boundary = model.steps.find(step => step.phase === 'reject')
  assert.match(boundary.detail, /subagent depth 4 exceeds maxDepth 3/)
})

test('a within-limit delegation runs on its own lane and settles exactly once', () => {
  for (const outcome of ['report', 'fail']) {
    for (const parentDepth of [0, 1, 2]) {
      const model = buildSubagentDelegateModel({ parentDepth, outcome })
      assert.equal(model.observations.childRan, true)
      assert.equal(model.observations.reportKind, outcome)
      const settles = model.steps.filter(step => step.phase === 'settle' && step.lane === '回报')
      assert.equal(settles.length, 1, `${parentDepth}/${outcome}: 回报必须恰好一次`)
      assert.ok(!model.steps.some(step =>
        step.lane === '�?Agent' && (step.phase === 'run' || step.phase === 'report')))
    }
  }
})

test('an accepted delegation creates a subagent-origin session pinned to the never policy', () => {
  const model = buildSubagentDelegateModel({ parentDepth: 0, outcome: 'report' })
  const create = model.steps.find(step => step.phase === 'create')
  assert.ok(create, 'accepted path must carry a child-session create step')
  assert.match(create.detail, /origin='subagent'/)
  assert.match(create.detail, /delegation_depth=1/)
  assert.match(create.detail, /'never'/)
  assert.ok(!model.steps.some(step => step.lane === '子 Agent' && step.phase !== 'create' && step.phase !== 'run'),
    'child lane carries only create and run')
})

test('the rejected path never mentions the child session or the pinned policy', () => {
  const model = buildSubagentDelegateModel({ parentDepth: 3, outcome: 'fail' })
  assert.ok(!model.steps.some(step => step.phase === 'create'))
})

test('effective depth takes the max of header and runtime options (monotone resume)', () => {
  assert.equal(effectiveDelegationDepth(undefined, undefined), 0)
  assert.equal(effectiveDelegationDepth(undefined, 1), 1)
  assert.equal(effectiveDelegationDepth(2, undefined), 2)
  assert.equal(effectiveDelegationDepth(1, 2), 2)
  assert.equal(effectiveDelegationDepth(3, 1), 3)
})

test('unknown depths or outcomes fail loud at the model boundary', () => {
  assert.throws(() => buildSubagentDelegateModel({ parentDepth: -1, outcome: 'report' }), RangeError)
  assert.throws(() => buildSubagentDelegateModel({ parentDepth: 9, outcome: 'report' }), RangeError)
  assert.throws(() => buildSubagentDelegateModel({ parentDepth: 0.5, outcome: 'report' }), TypeError)
  assert.throws(() => buildSubagentDelegateModel({ parentDepth: 0, outcome: 'vanish' }), RangeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('subagent-delegate-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  const script = readFileSync(new URL('subagent-delegate-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'rejected-at-boundary'/)
  for (const option of ['spawns-anyway', 'rejected-at-boundary', 'spawns-silent']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
