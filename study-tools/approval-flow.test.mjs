import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  APPROVAL_LANES,
  APPROVAL_OUTCOMES,
  buildApprovalFlowModel,
  evaluateApprovalFlowOracle,
} from '../website/public/approval-flow-model.js'

const GRID = {
  policy: ['ask', 'never'],
  responder: ['ui-answerer', 'none'],
  decision: ['allow', 'deny'],
  abort: ['live', 'pre-aborted'],
}

function* inputs() {
  for (const policy of GRID.policy)
    for (const responder of GRID.responder)
      for (const decision of GRID.decision)
        for (const abort of GRID.abort) yield { policy, responder, decision, abort }
}

test('the same input produces byte-identical output', () => {
  const input = { policy: 'ask', responder: 'ui-answerer', decision: 'allow', abort: 'live' }
  assert.equal(
    JSON.stringify(buildApprovalFlowModel(input)),
    JSON.stringify(buildApprovalFlowModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const input of inputs()) {
    const model = buildApprovalFlowModel(input)
    const result = evaluateApprovalFlowOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true,
        JSON.stringify(input) + ' failed ' + check.id + ': ' + check.actual)
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const input of inputs()) {
    const model = buildApprovalFlowModel(input)
    for (const step of model.steps) {
      assert.ok(APPROVAL_LANES.includes(step.lane), JSON.stringify(input) + ': ' + step.lane)
    }
  }
})

test('final outcomes always use the upstream closed vocabulary', () => {
  for (const input of inputs()) {
    const model = buildApprovalFlowModel(input)
    assert.ok(APPROVAL_OUTCOMES.includes(model.observations.finalOutcome),
      JSON.stringify(input) + ': ' + model.observations.finalOutcome)
  }
})

test('every ask logs exactly one asked/decided pair and decided carries the final outcome', () => {
  for (const input of inputs()) {
    const model = buildApprovalFlowModel(input)
    const asked = model.steps.filter(step => step.audit === 'asked')
    const decided = model.steps.filter(step => step.audit === 'decided')
    assert.equal(asked.length, 1, JSON.stringify(input))
    assert.equal(decided.length, 1, JSON.stringify(input))
    assert.ok(decided[0].index > asked[0].index, JSON.stringify(input))
    assert.equal(decided[0].auditOutcome, model.observations.finalOutcome, JSON.stringify(input))
    assert.equal(model.observations.auditPairComplete, true, JSON.stringify(input))
  }
})

test('never decides rejected before dispatch: no answerer lane, no execution, even with a UI answerer', () => {
  const model = buildApprovalFlowModel({
    policy: 'never', responder: 'ui-answerer', decision: 'allow', abort: 'live',
  })
  assert.equal(model.observations.finalOutcome, 'rejected')
  assert.equal(model.observations.responderLaneUsed, false)
  assert.equal(model.observations.toolBodyRan, false)
})

test('a missing answerer settles unavailable and the body never runs', () => {
  const model = buildApprovalFlowModel({
    policy: 'ask', responder: 'none', decision: 'allow', abort: 'live',
  })
  assert.equal(model.observations.finalOutcome, 'unavailable')
  assert.equal(model.observations.toolBodyRan, false)
  assert.equal(model.observations.responderLaneUsed, false)
})

test('a pre-aborted request settles cancelled without consulting anyone', () => {
  const model = buildApprovalFlowModel({
    policy: 'ask', responder: 'ui-answerer', decision: 'allow', abort: 'pre-aborted',
  })
  assert.equal(model.observations.finalOutcome, 'cancelled')
  assert.equal(model.observations.responderLaneUsed, false)
  assert.equal(model.observations.toolBodyRan, false)
})

test('an allow runs the body exactly once as allowed-once; a deny never runs it', () => {
  const allowed = buildApprovalFlowModel({
    policy: 'ask', responder: 'ui-answerer', decision: 'allow', abort: 'live',
  })
  assert.equal(allowed.steps.filter(step => step.bodyRan === true).length, 1)
  assert.equal(allowed.observations.finalOutcome, 'allowed-once')

  const denied = buildApprovalFlowModel({
    policy: 'ask', responder: 'ui-answerer', decision: 'deny', abort: 'live',
  })
  assert.equal(denied.steps.filter(step => step.bodyRan === true).length, 0)
  assert.equal(denied.observations.finalOutcome, 'rejected')
})

test('unknown policies, responders, decisions or aborts fail loud at the model boundary', () => {
  const base = { policy: 'ask', responder: 'none', decision: 'allow', abort: 'live' }
  assert.throws(() => buildApprovalFlowModel({ ...base, policy: 'sometimes' }), RangeError)
  assert.throws(() => buildApprovalFlowModel({ ...base, responder: 'ghost' }), RangeError)
  assert.throws(() => buildApprovalFlowModel({ ...base, responder: 'ui-answerer', decision: 'maybe' }), RangeError)
  assert.throws(() => buildApprovalFlowModel({ ...base, abort: 'later' }), RangeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('approval-flow-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  for (const id of ['policy', 'responder', 'decision', 'abort']) {
    assert.ok(html.includes(`id="${id}"`), 'missing control: ' + id)
  }
  const script = readFileSync(new URL('approval-flow-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'fail-closed'/)
  for (const option of ['runs-anyway', 'fail-closed', 'hangs']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
