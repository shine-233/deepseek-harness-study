import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SPILL_LANES,
  planPreviewBudget,
  buildSpillModel,
  evaluateSpillOracle,
} from '../website/public/spill-model.js'

test('同一输入产生逐字节相同的推演', () => {
  const input = { resultBytes: 1200, maxInlineBytes: 500, isReadTool: false, hasBackend: true, plainText: true }
  assert.equal(JSON.stringify(buildSpillModel(input)), JSON.stringify(buildSpillModel(input)))
})

test('超过 cap 触发转储：完整文本逐字保留，替换不超预算', () => {
  const model = buildSpillModel({ resultBytes: 1500, maxInlineBytes: 400 })
  assert.equal(model.observations.spilled, true)
  assert.equal(model.observations.savedFullBytes, 1500)
  assert.ok(model.observations.replacementBytes <= 400,
    '替换后 ' + model.observations.replacementBytes + ' 字节必须 ≤ cap 400')
  const verdict = evaluateSpillOracle(model)
  for (const check of verdict.checks) assert.equal(check.pass, true, check.id + ': ' + check.actual)
})

test('未超限、非文本、read 豁免与尽力而为都不转储', () => {
  const within = buildSpillModel({ resultBytes: 300, maxInlineBytes: 600 })
  assert.equal(within.observations.spilled, false)

  const nonText = buildSpillModel({ resultBytes: 3000, maxInlineBytes: 600, plainText: false })
  assert.equal(nonText.observations.spilled, false)
  assert.ok(nonText.steps.some(step => step.phase === 'non-text-pass'))

  const read = buildSpillModel({ resultBytes: 3000, maxInlineBytes: 600, isReadTool: true })
  assert.equal(read.observations.spilled, false)
  assert.equal(read.observations.loopPrevented, true)
  assert.ok(read.steps.some(step => step.phase === 'read-exempt'))

  const noBackend = buildSpillModel({ resultBytes: 3000, maxInlineBytes: 600, hasBackend: false })
  assert.equal(noBackend.observations.spilled, false)
  assert.equal(noBackend.observations.bestEffortFallback, true)
  assert.equal(noBackend.observations.replacementBytes, 3000, '放行时原样，不缩水')
})

test('未配置 maxInlineBytes 是真 no-op：没有策略步骤', () => {
  const model = buildSpillModel({ configured: false, resultBytes: 3000 })
  assert.equal(model.steps.some(step => step.phase === 'not-registered'), true)
  assert.equal(model.observations.spilled, false)
  const check = evaluateSpillOracle(model).checks.find(c => c.id === 'SP_UNSET_NOOP')
  assert.equal(check.pass, true)
})

test('预算规划器把提示行成本计在 cap 内', () => {
  const budget = planPreviewBudget(1000, 500, 120)
  assert.equal(budget.headBytes + budget.tailBytes + budget.noticeBytes <= 500, true)
  // 极小预算连省略号都放不下：返回 null 而不是给出负数
  assert.equal(planPreviewBudget(100, 1, 120), null)
})

test('每一条规则在全输入网格上都成立', () => {
  for (const resultBytes of [0, 250, 700, 2000, 4000]) {
    for (const maxInlineBytes of [100, 350, 800, 1500]) {
      for (const isReadTool of [false, true]) {
        for (const hasBackend of [false, true]) {
          const model = buildSpillModel({ resultBytes, maxInlineBytes, isReadTool, hasBackend })
          const verdict = evaluateSpillOracle(model)
          for (const check of verdict.checks) {
            assert.equal(check.pass, true,
              `bytes=${resultBytes} cap=${maxInlineBytes} read=${isReadTool} backend=${hasBackend} 的 ${check.id} 失败：${check.actual}`)
          }
        }
      }
    }
  }
})

test('每一步都落在已声明的 lane 上；坏输入大声失败', () => {
  for (const entry of buildSpillModel({}).steps) assert.ok(SPILL_LANES.includes(entry.lane))
  assert.throws(() => buildSpillModel({ resultBytes: -1 }), RangeError)
  assert.throws(() => buildSpillModel({ maxInlineBytes: 'x' }), TypeError)
  assert.throws(() => evaluateSpillOracle(null), TypeError)
})
