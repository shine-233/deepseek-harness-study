import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildGoalModel, evaluateGoalOracle, GOAL_PATTERNS } from '../website/public/goal-loop-model.js'

test('每个输入组合构建成功且独立校验通过', () => {
  for (const pattern of GOAL_PATTERNS.map(item => item.id)) {
    for (const rounds of [1, 3, 8]) {
      for (const handoffBudget of [40, 120, 400]) {
        const model = buildGoalModel({ rounds, handoffBudget, pattern })
        assert.equal(evaluateGoalOracle(model).pass, true, `${pattern}/${String(rounds)}/${String(handoffBudget)}`)
        model.frames.forEach((frame, index) => assert.equal(frame.tick, index))
      }
    }
  }
})

test('continue 才传棒；complete/blocked 终止循环', () => {
  const converged = buildGoalModel({ rounds: 5, pattern: 'fail-then-pass' })
  assert.equal(converged.observations.finalStatus, 'complete')
  assert.equal(converged.observations.usedRounds, 2)
  const blocked = buildGoalModel({ rounds: 4, pattern: 'always-blocked' })
  assert.equal(blocked.observations.finalStatus, 'blocked')
  const first = buildGoalModel({ rounds: 6, pattern: 'pass-first' })
  assert.equal(first.observations.usedRounds, 1)
})

test('预算耗尽是自己的出口，不冒充完成', () => {
  const model = buildGoalModel({ rounds: 2, pattern: 'always-blocked' })
  assert.equal(model.observations.finalStatus, 'blocked')
  const exhausted = buildGoalModel({ rounds: 1, handoffBudget: 400, pattern: 'fail-then-pass' })
  // 一轮 continue 后没有轮次可用了
  assert.equal(exhausted.observations.usedRounds, 1)
  assert.ok(exhausted.frames.at(-1).label.includes('耗尽') || exhausted.frames.at(-1).label.includes('终止'))
})

test('交接摘要按预算截断：低预算下 carry 行可见截断', () => {
  const tight = buildGoalModel({ rounds: 3, handoffBudget: 40, pattern: 'fail-then-pass' })
  const carries = tight.frames.filter(frame => frame.kind === 'carry')
  assert.ok(carries.length >= 1)
  for (const frame of carries) assert.ok(frame.handoffChars <= 40)
})
