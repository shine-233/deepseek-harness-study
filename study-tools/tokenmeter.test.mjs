import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildMeterModel, evaluateMeterOracle, buildStreamFrames,
  estimateBlocks, estimateSystemTokens, METER_ESTIMATE_CONSTANTS } from '../website/public/tokenmeter-model.js'

test('同一日志前缀重放出同一读数', () => {
  const input = { existingChars: 3200, newChars: 800, measuredBaseline: true, windowTokens: 8000 }
  assert.equal(JSON.stringify(buildMeterModel(input)), JSON.stringify(buildMeterModel(input)))
})

test('两种基线口径给出同一个总数，归属不同', () => {
  for (const input of [
    { existingChars: 0, newChars: 1600, windowTokens: 4000 },
    { existingChars: 1200, newChars: 400, windowTokens: 4000 },
    { existingChars: 20000, newChars: 0, windowTokens: 8000 },
  ]) {
    const measured = buildMeterModel({ ...input, measuredBaseline: true })
    const estimated = buildMeterModel({ ...input, measuredBaseline: false })
    assert.equal(measured.observations.totalTokens, estimated.observations.totalTokens,
      '两口径必须殊途同归')
    assert.equal(measured.observations.baselineKind, 'measured')
    assert.equal(estimated.observations.baselineKind, 'estimated')
    for (const model of [measured, estimated]) {
      for (const check of evaluateMeterOracle(model).checks) {
        assert.equal(check.pass, true, check.id + ': ' + check.actual)
      }
    }
  }
})

test('压力跨过 80% 时给出高压形态；计量器只报数不截断', () => {
  const high = buildMeterModel({ existingChars: 15000, newChars: 5000, windowTokens: 2000 })
  assert.equal(high.observations.overThreshold, true)
  const pressureStep = high.steps.find(s => s.phase === 'pressure')
  assert.ok(pressureStep.detail.includes('compaction'))
})

test('压力数学对得上窗口；坏输入大声失败', () => {
  const model = buildMeterModel({ existingChars: 1000, newChars: 500, windowTokens: 16000 })
  assert.equal(model.observations.pressurePct,
    Math.min(100, Math.round((model.observations.totalTokens / 16000) * 100)))
  assert.throws(() => buildMeterModel({ existingChars: -1 }), RangeError)
  assert.throws(() => buildMeterModel({ newChars: 99999 }), RangeError)
  assert.throws(() => buildMeterModel({ windowTokens: 999999 }), RangeError)
  assert.throws(() => buildMeterModel({ measuredBaseline: 'yes' }), TypeError)
})

test('结构化定价与上游 estimate.ts 的公式逐条一致', () => {
  assert.equal(METER_ESTIMATE_CONSTANTS.CHARS_PER_TOKEN, 4)
  assert.equal(METER_ESTIMATE_CONSTANTS.BLOCK_OVERHEAD, 4)
  assert.equal(METER_ESTIMATE_CONSTANTS.ROLE_OVERHEAD, 4)
  // 文本块：⌈字符/4⌉ + 块开销
  const text = estimateBlocks([{ kind: 'text', label: 't', textChars: 9 }])
  assert.equal(text.tokens, Math.ceil(9 / 4) + 4)
  // 工具调用：名与参数分开计价再加块开销
  const call = estimateBlocks([{ kind: 'tool-call', label: 'c', nameChars: 9, argsChars: 120 }])
  assert.equal(call.tokens, Math.ceil(9 / 4) + Math.ceil(120 / 4) + 4)
  // 工具结果：递归进入子内容再加块开销
  const result = estimateBlocks([{ kind: 'tool-result', label: 'r', children: [{ kind: 'text', label: 'inner', textChars: 200 }] }])
  assert.equal(result.tokens, Math.ceil(200 / 4) + 4 + 4)
  // 系统提示词带角色开销
  assert.equal(estimateSystemTokens(120), Math.ceil(120 / 4) + 4)
  // 未知块类型大声失败
  assert.throws(() => estimateBlocks([{ kind: 'mystery', label: 'x' }]), TypeError)
})

test('工具对抬高总数；账本逐行可加总', () => {
  const plain = buildMeterModel({ existingChars: 800, newChars: 400, windowTokens: 4000 })
  const withTool = buildMeterModel({ existingChars: 800, newChars: 400, windowTokens: 4000, withToolPair: true })
  assert.ok(withTool.observations.totalTokens > plain.observations.totalTokens)
  const sum = withTool.breakdown.rows.reduce((total, row) => total + row.tokens, 0) + withTool.breakdown.headerTokens
  assert.equal(sum, withTool.breakdown.totalTokens, '账本行加总必须等于总读数')
})

test('流式帧逐拍上涨，最后一拍完成口径判定且总数不变', () => {
  for (const measuredBaseline of [true, false]) {
    const { frames, finalTotal } = buildStreamFrames({ existingChars: 1600, newChars: 960, measuredBaseline, windowTokens: 4000 })
    assert.ok(frames.length >= 2)
    for (let i = 1; i < frames.length; i += 1) {
      assert.ok(frames[i].totalTokens >= frames[i - 1].totalTokens, '读数不许回退')
      assert.equal(frames[i].tick, i)
    }
    assert.equal(frames.at(-1).totalTokens, finalTotal)
    assert.equal(frames.at(-1).baselineKind, measuredBaseline ? 'measured' : 'estimated')
    if (measuredBaseline) assert.ok(frames.at(-1).label.includes('usage'))
    else assert.ok(frames.at(-1).label.includes('无 usage'))
    // 与静态模型殊途同归
    assert.equal(finalTotal, buildMeterModel({ existingChars: 1600, newChars: 960, measuredBaseline, windowTokens: 4000 }).observations.totalTokens)
  }
})
