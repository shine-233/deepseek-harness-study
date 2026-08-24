import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  JOBS_ENDINGS,
  JOBS_SCRIPTS,
  buildJobsModel,
  evaluateJobsOracle,
} from '../website/public/jobs-model.js'

test('the same input produces byte-identical output', () => {
  const input = { script: 'killer', ending: 'late-completed' }
  assert.equal(
    JSON.stringify(buildJobsModel(input)),
    JSON.stringify(buildJobsModel(input)),
  )
})

test('every script × ending combo passes every oracle check', () => {
  assert.equal(JOBS_SCRIPTS.length * JOBS_ENDINGS.length, 9)
  for (const script of JOBS_SCRIPTS) {
    for (const ending of JOBS_ENDINGS) {
      const model = buildJobsModel({ script, ending })
      const result = evaluateJobsOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true, `${script}/${ending} failed ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('exactly one settlement exists on every timeline', () => {
  for (const script of JOBS_SCRIPTS) {
    for (const ending of JOBS_ENDINGS) {
      const model = buildJobsModel({ script, ending })
      const settles = model.steps.filter(step => step.kind === 'settle')
      assert.equal(settles.length, 1, `${script}/${ending}`)
    }
  }
})

test('kill returns requested then already-finished in the killer script', () => {
  const model = buildJobsModel({ script: 'killer', ending: 'completed' })
  const kills = model.steps.filter(step => step.op.includes('kill'))
  assert.equal(kills[0].result, 'requested')
  assert.equal(kills[1].result, 'already-finished')
})

test('a late resolved(completed) never overrides the recorded terminal', () => {
  const killed = buildJobsModel({ script: 'killer', ending: 'late-completed' })
  assert.equal(killed.observations.terminalStatus, 'killed')
  assert.equal(killed.observations.lateOutcomeIgnored, true)

  const tornDown = buildJobsModel({ script: 'teardown', ending: 'late-completed' })
  assert.equal(tornDown.observations.terminalStatus, 'killed')
})

test('done rejection becomes failed without hanging the record', () => {
  for (const script of JOBS_SCRIPTS) {
    if (script !== 'reader') continue
    const model = buildJobsModel({ script, ending: 'failed' })
    assert.equal(model.observations.terminalStatus, 'failed')
  }
})

test('teardown delivers zero notices because it claims reported', () => {
  for (const ending of JOBS_ENDINGS) {
    const model = buildJobsModel({ script: 'teardown', ending })
    assert.equal(model.observations.noticesDelivered, 0, `teardown/${ending}`)
  }
  const reader = buildJobsModel({ script: 'reader', ending: 'completed' })
  assert.equal(reader.observations.noticesDelivered, 1)
})
