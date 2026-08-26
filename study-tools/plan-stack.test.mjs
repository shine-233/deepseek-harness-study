import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  buildGoalModel,
  buildPlanModeModel,
  buildTodoStackModel,
  evaluatePlanStackOracle,
} from '../website/public/plan-stack-model.js'

test('the bump-counts fault is caught by COUNTS_MATCH_ITEMS alone', () => {
  const model = buildTodoStackModel({ preset: 'validSingle', allowParallelInProgress: true, fault: 'bump-counts' })
  assert.equal(model.verdict.ok, true)
  const sum = model.counts.pending + model.counts.inProgress + model.counts.completed
  assert.notEqual(sum, model.todos.length, 'the forged count must break the ledger')
  const result = evaluatePlanStackOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['COUNTS_MATCH_ITEMS'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the fake-commit fault is caught by IDLE_COMMITS_BUSY_QUEUES alone', () => {
  const model = buildPlanModeModel({ loggedActive: false, agentBusy: true, action: '/plan', fault: 'fake-commit' })
  assert.equal(model.result, 'committed', 'the queued suspension must be forged into a commit')
  const result = evaluatePlanStackOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['IDLE_COMMITS_BUSY_QUEUES'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the fake-rearm fault is caught by ARMING_MATCHES_VERB alone', () => {
  const model = buildGoalModel({ phase: 'active', verb: 'pause', roundsCapReached: false, fault: 'fake-rearm' })
  assert.equal(model.armed, true, 'the disarmed goal must be forged back to armed')
  const result = evaluatePlanStackOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['ARMING_MATCHES_VERB'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('each fault is ineffective outside its precondition and unknown types fail loud', () => {
  assert.equal(evaluatePlanStackOracle(buildTodoStackModel({ preset: 'duplicateContent', fault: 'bump-counts' })).pass, true,
    'a rejected preset has no trusted counts to tamper with')
  assert.equal(evaluatePlanStackOracle(buildPlanModeModel({ loggedActive: false, agentBusy: false, action: '/plan', fault: 'fake-commit' })).pass, true,
    'idle commits are honest; nothing queued to forge')
  assert.equal(evaluatePlanStackOracle(buildGoalModel({ phase: 'active', verb: 'edit', fault: 'fake-rearm' })).pass, true,
    'non-disarming verbs keep arming honestly')
  assert.throws(() => buildTodoStackModel({ preset: 'validSingle', fault: 'no-such-fault' }))
  assert.throws(() => buildPlanModeModel({ fault: 'no-such-fault' }))
  assert.throws(() => buildGoalModel({ phase: 'active', verb: 'pause', fault: 'no-such-fault' }))
})
