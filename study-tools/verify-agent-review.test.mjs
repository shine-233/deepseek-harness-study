import assert from 'node:assert/strict'
import test from 'node:test'
import { inspectAgentReview, REVIEW_CONTRACT } from './verify-agent-review.mjs'

test('agent-review guidance is wired into the repository without an external model', () => {
  const report = inspectAgentReview()
  assert.deepEqual(report.errors, [])
  assert.equal(report.checked, REVIEW_CONTRACT.length)
})

test('the contract names evidence and responsibility instead of promising automatic approval', () => {
  const guide = REVIEW_CONTRACT.find(contract => contract.file === '.github/AGENT_REVIEW.md')
  assert.ok(guide)
  assert.ok(guide.markers.includes('固定源码'))
  assert.ok(guide.markers.includes('人工'))
  assert.ok(!guide.markers.includes('自动合并'))
})
