/**
 * 错题本排程的纯函数契约。
 *
 * 覆盖：坏输入回退空状态、序列化字节稳定、答错进本子明天再见、
 * 连续答对按 1/3/7/16 天拉长、没错过的题答对不产生条目、
 * 合并取较新、到期过滤按天比较。
 */

import { strict as assert } from 'node:assert'
import test from 'node:test'

import {
  dueItems,
  emptyReview,
  mergeReview,
  parseReview,
  recordAttempt,
  REVIEW_INTERVALS,
  serializeReview,
  upcomingCount,
} from '../website/public/study-review-core.js'

test('坏输入一律回退到空状态', () => {
  for (const bad of [null, '', 'not json', '[]', '{"v":99}', '{"v":1,"items":{"a|q1":{"lessonId":"a"}}}']) {
    assert.deepEqual(parseReview(bad), emptyReview(), '输入：' + String(bad))
  }
})

test('键与条目内部字段不一致的条目被丢弃，防止键被手工改坏后指向错位', () => {
  const text = JSON.stringify({
    v: 1,
    items: {
      'a|q1': { lessonId: 'b', qid: 'q9', streak: 0, ts: '2026-01-01T00:00:00Z', due: '2026-01-02' },
    },
  })
  assert.deepEqual(parseReview(text), emptyReview())
})

test('同样的状态永远得到同一串字节，且键序固定', () => {
  const a = recordAttempt(emptyReview(), '00-开始这里', 'q2', false, '2026-08-22T03:00:00Z')
  const b = recordAttempt(recordAttempt(emptyReview(), '01-仓库地图', 'q1', false, '2026-08-21T03:00:00Z'), '00-开始这里', 'q2', false, '2026-08-22T03:00:00Z')
  assert.equal(serializeReview(b), serializeReview(mergeReview(a, b)))
})

test('答错进入本子，明天到期，streak 归零；再错一次刷新作答时刻但不叠加惩罚', () => {
  const once = recordAttempt(emptyReview(), '00-开始这里', 'q2', false, '2026-08-22T10:00:00Z')
  assert.equal(once.items['00-开始这里|q2'].due, '2026-08-23')
  assert.equal(once.items['00-开始这里|q2'].streak, 0)
  const twice = recordAttempt(once, '00-开始这里', 'q2', false, '2026-08-22T11:00:00Z')
  assert.equal(twice.items['00-开始这里|q2'].due, '2026-08-23')
  assert.equal(twice.items['00-开始这里|q2'].streak, 0)
  assert.equal(twice.items['00-开始这里|q2'].ts, '2026-08-22T11:00:00Z')
})

test('连续答对按 1/3/7/16 拉长间隔，之后停在 16', () => {
  assert.deepEqual([...REVIEW_INTERVALS], [1, 3, 7, 16])
  let state = recordAttempt(emptyReview(), '01-仓库地图', 'q3', false, '2026-08-01T00:00:00Z')
  const days = []
  let previousDue = state.items['01-仓库地图|q3'].due
  for (let round = 0; round < 5; round += 1) {
    state = recordAttempt(state, '01-仓库地图', 'q3', true, previousDue + 'T09:00:00Z')
    const item = state.items['01-仓库地图|q3']
    days.push(Math.round((Date.parse(item.due + 'T00:00:00Z') - Date.parse(previousDue + 'T00:00:00Z')) / 86400000))
    previousDue = item.due
  }
  assert.deepEqual(days, [1, 3, 7, 16, 16])
  assert.equal(state.items['01-仓库地图|q3'].streak, 5)
})

test('从没错过答对不产生条目', () => {
  const state = recordAttempt(emptyReview(), '02-Cordis与插件树', 'q1', true, '2026-08-22T00:00:00Z')
  assert.deepEqual(state, emptyReview())
})

test('到期过滤按天比较：今天与过去到期都算到期，未来不算', () => {
  let state = recordAttempt(emptyReview(), '03-核心文件精读', 'q1', false, '2026-08-20T00:00:00Z')
  state = recordAttempt(state, '04-Agent与Turn流程', 'q1', false, '2026-08-21T00:00:00Z')
  state = recordAttempt(state, '05-Session日志与恢复', 'q1', false, '2026-08-30T00:00:00Z')
  const due = dueItems(state, '2026-08-22T08:00:00Z')
  assert.deepEqual(due.map(item => item.lessonId), ['03-核心文件精读', '04-Agent与Turn流程'])
  assert.equal(upcomingCount(state, '2026-08-22T08:00:00Z'), 1)
})

test('到期日跨月按 UTC 日历推进，不受时分秒影响', () => {
  const state = recordAttempt(emptyReview(), '01-仓库地图', 'q2', false, '2026-01-31T23:30:00Z')
  assert.equal(state.items['01-仓库地图|q2'].due, '2026-02-01')
  const passed = recordAttempt(state, '01-仓库地图', 'q2', true, '2026-02-01T00:10:00Z')
  assert.equal(passed.items['01-仓库地图|q2'].due, '2026-02-02')
})

test('合并同一条目取较新的 ts', () => {
  const local = recordAttempt(emptyReview(), '01-仓库地图', 'q1', false, '2026-08-20T00:00:00Z')
  const importedBase = recordAttempt(emptyReview(), '01-仓库地图', 'q1', false, '2026-08-19T00:00:00Z')
  const imported = recordAttempt(importedBase, '01-仓库地图', 'q1', true, '2026-08-25T00:00:00Z')
  assert.equal(mergeReview(local, imported).items['01-仓库地图|q1'].streak, 1)
  assert.equal(mergeReview(imported, local).items['01-仓库地图|q1'].streak, 1)
})
