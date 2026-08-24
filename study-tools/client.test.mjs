import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  CLIENT_MODES,
  QUESTION_INTENTS,
  buildConversationFoldModel,
  buildToolCardModel,
  buildUserQuestionsModel,
  evaluateClientOracle,
} from '../website/public/client-model.js'

test('the same input produces byte-identical output on all three faces', () => {
  for (const model of [
    buildToolCardModel({ tool: 'bash', fails: false, interrupted: false }),
    buildConversationFoldModel({ summaryInWindow: true, injectionHasProducer: true }),
    buildUserQuestionsModel({ intent: 'plan-review', questionCount: 1, binaryChoice: true, hasApproveLabel: true, planInDetail: true }),
  ]) {
    assert.equal(JSON.stringify(model), JSON.stringify(model))
  }
})

test('tool-card grid: states stay in the closed vocabulary and unknown names fall back', () => {
  for (const tool of ['read_file', 'grep', 'bash', 'str_replace_editor', 'mystery_tool']) {
    for (const fails of [false, true]) {
      for (const interrupted of [false, true]) {
        if (fails && interrupted) continue
        const model = buildToolCardModel({ tool, fails, interrupted })
        const result = evaluateClientOracle(model)
        for (const check of result.checks) {
          assert.equal(check.pass, true, `${tool}/${fails}/${interrupted} failed ${check.id}: ${check.actual}`)
        }
      }
    }
  }
})

test('conversation fold: compaction expandability follows the summary window', () => {
  const withSummary = buildConversationFoldModel({ summaryInWindow: true, injectionHasProducer: true })
  const without = buildConversationFoldModel({ summaryInWindow: false, injectionHasProducer: false })
  assert.equal(withSummary.nodes.find(n => n.type === 'compaction-row').expandable, true)
  assert.equal(without.nodes.find(n => n.type === 'compaction-row').expandable, false)
  assert.match(without.nodes.find(n => n.type === 'compaction-row').title, /不可展开/)
})

test('plan-review claims only when five conditions hold', () => {
  const full = buildUserQuestionsModel({ intent: 'plan-review', questionCount: 1, binaryChoice: true, hasApproveLabel: true, planInDetail: true })
  assert.equal(full.observations.claimsPlanReview, true)
  assert.deepEqual(full.actions, ['Chat about it', 'Refuse', 'Approve'])

  const batch = buildUserQuestionsModel({ intent: 'plan-review', questionCount: 2, binaryChoice: true, hasApproveLabel: true, planInDetail: true })
  assert.equal(batch.observations.claimsPlanReview, false)

  const noLabel = buildUserQuestionsModel({ intent: 'plan-review', questionCount: 1, binaryChoice: true, hasApproveLabel: false, planInDetail: true })
  assert.equal(noLabel.observations.claimsPlanReview, false)
})

test('skip and close shapes match the wire contract', () => {
  const model = buildUserQuestionsModel(BASE_QUESTION)
  assert.equal(model.observations.skipShape, '{ selected: [] }')
  assert.equal(model.observations.closeRejects, 'ASK_CANCELLED')
  assert.equal(model.observations.multiKeepsDraftWithCustom, true)
  assert.equal(CLIENT_MODES.length, 3)
  assert.equal(QUESTION_INTENTS.length, 2)
})

const BASE_QUESTION = { intent: 'none', questionCount: 1, binaryChoice: true, hasApproveLabel: true, planInDetail: true }
