import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SCHEDULE_KINDS,
  SESSION_STATES,
  WORKFLOW_ENDINGS,
  WORKFLOW_SHAPES,
  buildScheduleModel,
  buildWorkflowModel,
  evaluateOrchestrationOracle,
} from '../website/public/orchestration-model.js'

test('the same input produces byte-identical output on both faces', () => {
  for (const model of [
    buildScheduleModel({ kind: 'every', sessionState: 'cold-reopen' }),
    buildWorkflowModel({ ending: 'cancelled', shape: 'parallel-3-one-fails' }),
  ]) {
    assert.equal(JSON.stringify(model), JSON.stringify(model))
  }
})

test('every schedule combo passes every oracle check', () => {
  for (const kind of SCHEDULE_KINDS) {
    for (const sessionState of SESSION_STATES) {
      const model = buildScheduleModel({ kind, sessionState })
      const result = evaluateOrchestrationOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true, `${kind}/${sessionState} failed ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('every workflow combo passes every oracle check', () => {
  for (const ending of WORKFLOW_ENDINGS) {
    for (const shape of WORKFLOW_SHAPES) {
      const model = buildWorkflowModel({ ending, shape })
      const result = evaluateOrchestrationOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true, `${ending}/${shape} failed ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('cold every-record skips missed anchors and delivers only the latest', () => {
  const model = buildScheduleModel({ kind: 'every', sessionState: 'cold-reopen' })
  assert.equal(model.observations.skippedAnchors, 3)
  assert.equal(model.observations.dispatchCount, 1)
  const advance = model.steps.find(step => step.change === 'dispatch-every')
  assert.ok(advance, 'every dispatch must advance the record')
  assert.equal(model.observations.recordStillActive, true)
})

test('one-shot dispatch is terminal; live-idle still claims maintenance first', () => {
  for (const kind of ['after', 'at']) {
    const model = buildScheduleModel({ kind, sessionState: 'live-idle' })
    assert.equal(model.observations.recordStillActive, false)
    assert.ok(model.steps.some(step => step.kind === 'maintenance'))
  }
})

test('agent starts and ends pair by seq exactly once per stop path', () => {
  for (const ending of WORKFLOW_ENDINGS) {
    const model = buildWorkflowModel({ ending, shape: 'parallel-3-one-fails' })
    const starts = model.steps.filter(step => step.event === 'workflow/agent-start')
    const ends = model.steps.filter(step => step.event === 'workflow/agent-end')
    assert.equal(starts.length, ends.length, ending)
    for (const start of starts) {
      assert.equal(ends.filter(end => end.seq === start.seq).length, 1, `${ending}/seq=${start.seq}`)
    }
  }
})

test('cancelled runs settle through a bounded grace with synthesized endings', () => {
  const model = buildWorkflowModel({ ending: 'cancelled', shape: 'parallel-3-one-fails' })
  assert.ok(model.steps.some(step => step.kind === 'grace'))
  assert.equal(model.steps.filter(step => step.synthesized === true).length, 3)
  assert.equal(model.observations.stopReason, 'cancelled')
})

test('script errors rethrow fatal instead of mapping to null', () => {
  const model = buildWorkflowModel({ ending: 'error', shape: 'parallel-3-one-fails' })
  assert.ok(model.steps.some(step => step.kind === 'fatal'))
  assert.equal(model.observations.stopReason, 'error')
})

test('the replay-missed fault is caught by CATCHUP_LATEST_ONLY alone', () => {
  const model = buildScheduleModel({ kind: 'every', sessionState: 'cold-reopen', fault: 'replay-missed' })
  assert.equal(model.observations.skippedAnchors, 0, 'the ledger must lie about the skipped anchors')
  assert.ok(model.steps.some(step => step.kind === 'overdue'), 'the timeline still shows what really happened')
  const result = evaluateOrchestrationOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['CATCHUP_LATEST_ONLY'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the replay-missed fault is ineffective when no anchors were missed', () => {
  const model = buildScheduleModel({ kind: 'after', sessionState: 'live-idle', fault: 'replay-missed' })
  assert.equal(evaluateOrchestrationOracle(model).pass, true)
})

test('the drop-agent-end fault is caught by AGENT_PAIRING alone', () => {
  const model = buildWorkflowModel({ ending: 'completed', shape: 'parallel-3-one-fails', fault: 'drop-agent-end' })
  assert.equal(model.observations.agentEnds, model.observations.agentStarts - 1)
  const result = evaluateOrchestrationOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['AGENT_PAIRING'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the drop-agent-end fault is ineffective on the cancelled path', () => {
  const model = buildWorkflowModel({ ending: 'cancelled', shape: 'sequential-2', fault: 'drop-agent-end' })
  assert.equal(evaluateOrchestrationOracle(model).pass, true,
    'synthesized ends are load-bearing; the fault must not fire there')
})

test('unknown fault types fail loud at the model boundary', () => {
  assert.throws(() => buildScheduleModel({ kind: 'after', sessionState: 'busy', fault: 'no-such-fault' }))
  assert.throws(() => buildWorkflowModel({ ending: 'error', shape: 'sequential-2', fault: 'no-such-fault' }))
})
