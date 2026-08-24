import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  NODE_ENDINGS,
  NODE_SHAPES,
  buildWorkflowNodeModel,
  evaluateWorkflowNodeOracle,
} from '../website/public/workflow-node-model.js'

test('the same input produces byte-identical output', () => {
  const input = { ending: 'completed', shape: 'parallel-3-one-fails', truncated: false }
  assert.equal(
    JSON.stringify(buildWorkflowNodeModel(input)),
    JSON.stringify(buildWorkflowNodeModel(input)),
  )
})

const GRID = []
for (const ending of NODE_ENDINGS) {
  for (const shape of NODE_SHAPES) {
    for (const truncated of [false, true]) {
      GRID.push({ ending, shape, truncated })
    }
  }
}

test('every combo passes every oracle check across the grid', () => {
  assert.equal(GRID.length, 12)
  for (const input of GRID) {
    const model = buildWorkflowNodeModel(input)
    const result = evaluateWorkflowNodeOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true,
        `${input.ending}/${input.shape}/cut=${input.truncated} failed ${check.id}: ${check.actual}`)
    }
  }
})

test('phase groups come only from started members and keep exact strings', () => {
  const parallel = buildWorkflowNodeModel({
    ending: 'completed',
    shape: 'parallel-3-one-fails',
    truncated: false,
  })
  // 显式空串相位成组，标题就是空字符串本身。
  const titles = parallel.node.phases.map(group => group.title)
  assert.deepEqual(titles, ['调研', ''])
  assert.equal(parallel.node.phases[1].exactPhase, '')
  assert.equal(parallel.observations.emptyVsOmittedSplit, false)

  const sequential = buildWorkflowNodeModel({
    ending: 'completed',
    shape: 'sequential-2',
    truncated: false,
  })
  // 省略 phase 的成员单独成组，与任何显式字符串（包括空串）都不同组。
  const seqTitles = sequential.node.phases.map(group => group.title)
  assert.deepEqual(seqTitles, ['调研', '(省略)'])
  const omittedGroup = sequential.node.phases.find(group => group.title === '(省略)')
  assert.equal(omittedGroup.exactPhase, undefined)
})

test('truncated logs stay a legal prefix and present interrupted without changing the tool card', () => {
  for (const ending of NODE_ENDINGS) {
    const model = buildWorkflowNodeModel({ ending, shape: 'sequential-2', truncated: true })
    assert.equal(model.observations.hasRunEnd, false)
    assert.equal(model.node.status, 'interrupted')
    assert.equal(model.node.toolCardUnchanged, true)
  }
})

test('complete logs end with run-end and pair every member exactly once', () => {
  for (const ending of NODE_ENDINGS) {
    for (const shape of NODE_SHAPES) {
      const model = buildWorkflowNodeModel({ ending, shape, truncated: false })
      const last = model.records[model.records.length - 1]
      assert.equal(last.event, 'tool-workflow/run-end', `${ending}/${shape}`)
      assert.equal(last.stopReason, model.executionSummary.stopReason)
      const memberStarts = model.records.filter(record => record.event === 'tool-workflow/member-start').length
      const memberEnds = model.records.filter(record => record.event === 'tool-workflow/member-end').length
      assert.equal(memberStarts, memberEnds, `${ending}/${shape}`)
    }
  }
})

test('disclosure initial state opens non-completed levels and closes completed ones', () => {
  const failedChild = buildWorkflowNodeModel({
    ending: 'completed',
    shape: 'parallel-3-one-fails',
    truncated: false,
  })
  // 运行完成：外层关闭；但含失败成员的「调研」相位打开。
  assert.equal(failedChild.node.initialOpen, false)
  const researchGroup = failedChild.node.phases.find(group => group.title === '调研')
  assert.equal(researchGroup.initialOpen, true)

  const cancelled = buildWorkflowNodeModel({
    ending: 'cancelled',
    shape: 'sequential-2',
    truncated: false,
  })
  assert.equal(cancelled.node.initialOpen, true)
})
