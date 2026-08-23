import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  GUARD_THRESHOLDS,
  buildGuardLoopModel,
  evaluateGuardLoopOracle,
} from '../website/public/guard-loop-model.js'

test('deterministic', () => {
  const a = JSON.stringify(buildGuardLoopModel({ attempts: 5, guard: 'on' }))
  assert.equal(a, JSON.stringify(buildGuardLoopModel({ attempts: 5, guard: 'on' })))
})

test('oracle passes across full grid', () => {
  for (const attempts of [1,2,3,4,5,6,7,8,9]) {
    for (const guard of ['on','off']) {
      const r = evaluateGuardLoopOracle(buildGuardLoopModel({ attempts, guard }))
      for (const c of r.checks) assert.equal(c.pass, true, `${attempts}/${guard}: ${c.id}`)
    }
  }
})

test('advisory: all calls execute regardless of reminders', () => {
  const m = buildGuardLoopModel({ attempts: 8, guard: 'on' })
  assert.equal(m.observations.executedCount, 8)
  assert.equal(m.observations.blockedCount, 0)
  assert.ok(m.observations.reminderCount > 0)
})

test('off means zero reminders', () => {
  const m = buildGuardLoopModel({ attempts: 8, guard: 'off' })
  assert.equal(m.observations.reminderCount, 0)
})

test('escalation matches upstream thresholds [3,5,8]', () => {
  const m = buildGuardLoopModel({ attempts: 9, guard: 'on' })
  const levels = m.steps.filter(s => s.reminded).map(s => s.detail)
  assert.ok(levels.some(l => l.includes('3')))
  assert.ok(levels.some(l => l.includes('5')))
  assert.ok(levels.some(l => l.includes('8')))
})

test('throws on invalid input', () => {
  assert.throws(() => buildGuardLoopModel({ attempts: 0, guard: 'on' }), RangeError)
  assert.throws(() => buildGuardLoopModel({ attempts: 1, guard: 'maybe' }), RangeError)
})
