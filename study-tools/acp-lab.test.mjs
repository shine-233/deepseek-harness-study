/**
 * ACP 桥实验室的纯模型契约。
 *
 * 序列规则钉在上游 packages/acp/acp/src（固定提交 aa6c361a）：准入期取消零通知、
 * cancelRequested 优先于自然结局、error 结局不走 stopReason 词表。这些断言让
 * 页面文案与模型共享的事实无法悄悄漂移。
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildAcpModel, evaluateAcpOracle, ACP_CANCEL_POINTS, ACP_ENDINGS, STOP_REASON_RULES } from '../website/public/acp-lab-model.js'

test('每个输入组合都能构建且独立校验通过', () => {
  for (const cancelAt of ACP_CANCEL_POINTS.map(point => point.id)) {
    for (const ending of ACP_ENDINGS.map(item => item.id)) {
      for (const chunks of [1, 4, 8]) {
        const model = buildAcpModel({ chunks, cancelAt, ending })
        const verdict = evaluateAcpOracle(model)
        assert.equal(verdict.pass, true, `${cancelAt}/${ending}/${String(chunks)} 校验失败：${JSON.stringify(verdict.checks.filter(check => !check.pass))}`)
        model.frames.forEach((frame, index) => { assert.equal(frame.tick, index, '帧序号必须连续') })
      }
    }
  }
})

test('准入期取消：零通知、不入队、线上只有请求与 cancelled 回应', () => {
  const model = buildAcpModel({ chunks: 6, cancelAt: 'admission', ending: 'completed' })
  assert.equal(model.observations.notifications, 0)
  assert.equal(model.observations.messageQueued, false)
  assert.equal(model.observations.stopReason, 'cancelled')
  assert.ok(!model.frames.some(frame => frame.lane === 'inbox' || frame.lane === 'claim'))
})

test('已入队与流式中取消都因 cancelRequested 优先而报告 cancelled', () => {
  for (const cancelAt of ['queued', 'claimed']) {
    const model = buildAcpModel({ chunks: 3, cancelAt, ending: 'completed' })
    assert.equal(model.observations.messageQueued, true)
    assert.equal(model.observations.stopReason, 'cancelled')
  }
})

test('无取消时结局映射与源码规则表逐条一致', () => {
  for (const rule of STOP_REASON_RULES) {
    const model = buildAcpModel({ chunks: 2, cancelAt: 'off', ending: rule.ending })
    assert.equal(model.observations.stopReason, rule.stopReason, rule.ending)
    assert.equal(model.observations.notifications, 2, `${rule.ending} 的通知不应被结局影响`)
  }
})

test('max-tokens 与 aborted 在 prompt 级都是 end_turn，interrupted 才是 cancelled', () => {
  const byId = Object.fromEntries(STOP_REASON_RULES.map(rule => [rule.ending, rule.stopReason]))
  assert.equal(byId['max-tokens'], 'end_turn')
  assert.equal(byId.aborted, 'end_turn')
  assert.equal(byId.interrupted, 'cancelled')
})

test('error 结局拒绝 prompt 而不给出 stopReason', () => {
  const model = buildAcpModel({ chunks: 2, cancelAt: 'off', ending: 'error' })
  assert.equal(model.observations.errored, true)
  assert.match(model.observations.stopReason, /错误回应/)
  assert.ok(model.frames.at(-1)?.label.includes('错误'))
})

test('内容块数被夹到 1..8，通知数随之变化', () => {
  assert.equal(buildAcpModel({ chunks: 0 }).input.chunks, 1)
  assert.equal(buildAcpModel({ chunks: 99 }).input.chunks, 8)
  const low = buildAcpModel({ chunks: 1, cancelAt: 'off', ending: 'completed' })
  const high = buildAcpModel({ chunks: 8, cancelAt: 'off', ending: 'completed' })
  assert.equal(low.observations.notifications, 1)
  assert.equal(high.observations.notifications, 8)
  assert.ok(high.frames.length > low.frames.length)
})
