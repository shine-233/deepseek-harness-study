import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  TRAJECTORY_EVENTS,
  buildTrajectoryModel,
  evaluateTrajectoryOracle,
  projectTrajectory,
} from '../website/public/trajectory-model.js'

test('the same replay position produces byte-identical cards', () => {
  assert.equal(
    JSON.stringify(buildTrajectoryModel({ upto: 8 })),
    JSON.stringify(buildTrajectoryModel({ upto: 8 })),
  )
})

for (let upto = -1; upto <= TRAJECTORY_EVENTS.length; upto += 1) {
  const inRange = upto >= 0 && upto <= TRAJECTORY_EVENTS.length - 1
  test(`replay bound ${upto} is ${inRange ? 'accepted' : 'rejected'}`, () => {
    if (!inRange) {
      assert.throws(() => projectTrajectory(upto))
      return
    }
    const model = buildTrajectoryModel({ upto })
    const result = evaluateTrajectoryOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true, `upto=${upto} failed ${check.id}: ${check.actual}`)
    }
  })
}

test('tool cards follow the presentation contract', () => {
  const full = buildTrajectoryModel({ upto: TRAJECTORY_EVENTS.length - 1 })
  const byTool = Object.fromEntries(full.cards.filter(card => card.type === 'tool').map(card => [card.tool, card]))
  assert.equal(byTool.read_file.pendingCard, 'generic')
  assert.equal(byTool.read_file.resultCard, 'read')
  assert.equal(byTool.str_replace_editor.pendingCard, 'diff')
  assert.equal(byTool.bash.pendingCard, 'terminal')
  assert.equal(byTool.grep.pendingCard, 'generic')
  assert.equal(byTool.grep.resultCard, 'search')
})

test('grep stays generic while pending and settles into search', () => {
  const mid = buildTrajectoryModel({ upto: 11 })
  const grep = mid.cards.find(card => card.type === 'tool' && card.tool === 'grep')
  assert.ok(grep)
  assert.equal(grep.state, 'pending')
  assert.equal(grep.pendingCard, 'generic')

  const settled = buildTrajectoryModel({ upto: 12 }).cards.find(card => card.type === 'tool' && card.tool === 'grep')
  assert.equal(settled.state, 'settled')
  assert.equal(settled.resultCard, 'search')
})

test('assistant blocks finalize only at assistant/message events', () => {
  const beforeFinal = buildTrajectoryModel({ upto: 13 }).observations
  assert.equal(beforeFinal.finalizedAssistantBlocks, 3)

  const early = projectTrajectory(1)
  const draftsOnly = early.cards.every(card => card.type !== 'assistant')
  assert.ok(draftsOnly)
})
