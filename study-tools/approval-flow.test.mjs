import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  APPROVAL_LANES,
  buildApprovalFlowModel,
  evaluateApprovalFlowOracle,
} from '../website/public/approval-flow-model.js'

test('the same input produces byte-identical output', () => {
  const input = { responder: 'ui-answerer', decision: 'allow' }
  assert.equal(
    JSON.stringify(buildApprovalFlowModel(input)),
    JSON.stringify(buildApprovalFlowModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const responder of ['ui-answerer', 'none']) {
    for (const decision of ['allow', 'deny']) {
      const model = buildApprovalFlowModel({ responder, decision })
      const result = evaluateApprovalFlowOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          responder + '/' + decision + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const responder of ['ui-answerer', 'none']) {
    const model = buildApprovalFlowModel({ responder, decision: 'deny' })
    for (const step of model.steps) {
      assert.ok(APPROVAL_LANES.includes(step.lane), responder + ': ' + step.lane)
    }
  }
})

test('a missing responder fails closed: no body run, no answerer lane, dedicated outcome', () => {
  const model = buildApprovalFlowModel({ responder: 'none', decision: 'allow' })
  assert.equal(model.observations.toolBodyRan, false)
  assert.equal(model.observations.responderLaneUsed, false)
  assert.equal(model.observations.finalOutcome, 'fail-closed-deny')
  assert.ok(model.steps.some(step => step.detail.includes('退化为拒绝')))
})

test('an allow runs the body exactly once; a deny never runs it', () => {
  const allowed = buildApprovalFlowModel({ responder: 'ui-answerer', decision: 'allow' })
  assert.equal(allowed.steps.filter(step => step.bodyRan === true).length, 1)

  const denied = buildApprovalFlowModel({ responder: 'ui-answerer', decision: 'deny' })
  assert.equal(denied.steps.filter(step => step.bodyRan === true).length, 0)
  assert.equal(denied.observations.finalOutcome, 'deny')
})

test('unknown responders or decisions fail loud at the model boundary', () => {
  assert.throws(() => buildApprovalFlowModel({ responder: 'ghost', decision: 'allow' }), RangeError)
  assert.throws(() => buildApprovalFlowModel({ responder: 'none', decision: 'maybe' }), RangeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('approval-flow-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  const script = readFileSync(new URL('approval-flow-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'fail-closed'/)
  for (const option of ['runs-anyway', 'fail-closed', 'hangs']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
