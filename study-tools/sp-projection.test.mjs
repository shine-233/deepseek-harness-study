import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  PROJECTION_KEYS,
  SESSION_EVENTS,
  buildProjectionModel,
  evaluateProjectionOracle,
  projectSession,
} from '../website/public/session-projection-model.js'

test('deterministic replay', () => {
  for (const upto of [0, 3, 7]) {
    const a = buildProjectionModel({ upto })
    assert.equal(JSON.stringify(a), JSON.stringify(a))
  }
})

test('all positions pass oracle', () => {
  for (let upto = 0; upto < SESSION_EVENTS.length; upto++) {
    const r = evaluateProjectionOracle(buildProjectionModel({ upto }))
    for (const c of r.checks) assert.ok(c.pass, `upto=${upto} ${c.id}: ${c.actual}`)
  }
})

test('range check', () => {
  assert.throws(() => projectSession(-1))
  assert.throws(() => projectSession(SESSION_EVENTS.length + 1))
})

test('todo snapshot replacement', () => {
  const s1 = projectSession(1).states.todos
  assert.equal(s1.items.length, 2, `after first write: ${s1.items.length}`)
  const s2 = projectSession(6).states.todos
  assert.equal(s2.items.length, 3, `after second write: ${s2.items.length}`)
})

test('plan mode toggling', () => {
  assert.equal(projectSession(2).states.planMode.active, true)
  assert.equal(projectSession(7).states.planMode.active, false)
})

test('goal revision monotonic', () => {
  const full = buildProjectionModel({ upto: SESSION_EVENTS.length })
  assert.equal(full.states.goal.revision, 2)
  assert.equal(full.states.goal.phase, 'completed')
})

test('unrelated events are no-ops', () => {
  const proj = projectSession(4)
  for (const step of proj.trace.filter(s => ['assistant/chunk','tool/result'].includes(s.kind))) {
    for (const key of PROJECTION_KEYS) assert.equal(step.changes[key], false)
  }
})
