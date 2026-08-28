import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  buildScheduleModel,
  evaluateScheduleOracle,
  SCHEDULE_SCENARIOS,
  MIN_EVERY_INTERVAL_SECONDS,
} from '../website/public/schedule-lab-model.js'

test('每个输入组合构建成功且独立校验通过', () => {
  for (const scenario of SCHEDULE_SCENARIOS.map(item => item.id)) {
    for (const clockSeconds of [0, 90, 300, 900, 2400]) {
      for (const everySeconds of [300, 600, 900]) {
        const model = buildScheduleModel({ scenario, clockSeconds, everySeconds })
        assert.equal(evaluateScheduleOracle(model).pass, true, `${scenario}/${String(clockSeconds)}/${String(everySeconds)}`)
        model.frames.forEach((frame, index) => assert.equal(frame.tick, index))
      }
    }
  }
})

test('固定频率睡过几拍只补锚点对齐的最新一拍', () => {
  const model = buildScheduleModel({ scenario: 'catch-up', clockSeconds: 1050, everySeconds: 300 })
  const dispatch = model.frames.find(frame => frame.kind === 'dispatch')
  assert.ok(dispatch, '醒来时应有 dispatch 帧')
  const ruler = dispatch.ruler
  assert.equal(ruler.anchorSec, 300)
  assert.equal(ruler.occurrenceSec, 900)
  assert.equal(ruler.nextSec, 1200)
  assert.equal(ruler.missed, 2)
  assert.equal(model.observations.missedCount, 2)
  assert.ok(ruler.occurrenceSec <= ruler.acceptedSec && ruler.acceptedSec < ruler.nextSec)
})

test('一次性提醒触发后除名，未到点则保持活动', () => {
  const fired = buildScheduleModel({ scenario: 'one-shot', clockSeconds: 600 })
  assert.equal(fired.observations.dispatchCount, 1)
  assert.equal(fired.observations.activeCount, 0)
  const pending = buildScheduleModel({ scenario: 'one-shot', clockSeconds: 599 })
  assert.equal(pending.observations.dispatchCount, 0)
  assert.equal(pending.observations.activeCount, 1)
})

test('fork 不继承父会话提醒，id 空间是子会话本地的', () => {
  const model = buildScheduleModel({ scenario: 'fork', clockSeconds: 120 })
  assert.equal(model.observations.inheritedCount, 0)
  const creates = model.frames.filter(frame => frame.change?.op === 'create').map(frame => frame.change.record.id)
  assert.ok(creates.includes('schedule-1'))
  assert.equal(creates.filter(id => id === 'schedule-1').length, 2, '父子两段各自分配 schedule-1')
  assert.equal(model.observations.activeCount, 2, '父段两条提醒不受子会话触发影响')
  assert.equal(model.observations.childActiveCount, 0, '子段一次性提醒触发后除名')
})

test('固定频率下限钉在上游的 300 秒，输入再小也被夹住', () => {
  assert.equal(MIN_EVERY_INTERVAL_SECONDS, 300)
  const model = buildScheduleModel({ scenario: 'catch-up', everySeconds: 1, clockSeconds: 900 })
  const create = model.frames.find(frame => frame.change?.op === 'create')
  assert.ok(create.change.record.everySeconds >= 300)
})
