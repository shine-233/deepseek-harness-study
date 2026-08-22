import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  emptyState,
  markDone,
  mergeProgress,
  normalizeLessonId,
  parseProgress,
  recordQuiz,
  serializeProgress,
  summarize,
} from '../website/public/study-progress-core.js'

const LESSON = '/deepseek-harness-study/study/lessons/05-Session日志与恢复.html'

test('normalizeLessonId keeps only study lesson pages', () => {
  assert.equal(normalizeLessonId(LESSON), '05-Session日志与恢复')
  assert.equal(
    normalizeLessonId('/study/lessons/02-Cordis与插件树'),
    '02-Cordis与插件树',
    'cleanUrls 路径没有 .html 后缀',
  )
  assert.equal(normalizeLessonId('/deepseek-harness-study/study/'), null)
  assert.equal(normalizeLessonId('/deepseek-harness-study/'), null)
  assert.equal(normalizeLessonId('/en/study/lessons/00-start'), null, '英文站不挂中文组件')
  assert.equal(normalizeLessonId(''), null)
})

test('markDone then serialize then parse round-trips', () => {
  const state = markDone(emptyState(), '00-开始这里', '2026-08-22T10:00:00Z')
  const text = serializeProgress(state)
  const parsed = parseProgress(text)
  assert.equal(parsed.v, 1)
  assert.deepEqual(parsed.lessons['00-开始这里'], { done: true, ts: '2026-08-22T10:00:00Z' })
})

test('parseProgress rejects corrupt or foreign payloads instead of throwing', () => {
  for (const bad of ['not-json', '{"v":2}', '[]', '{"v":1,"lessons":{"x":{"done":"yes"}}}']) {
    assert.deepEqual(parseProgress(bad), emptyState(), bad)
  }
})

test('mergeProgress keeps the newer timestamp per entry', () => {
  const local = markDone(emptyState(), 'a', '2026-08-20T00:00:00Z')
  const imported = parseProgress(JSON.stringify({
    v: 1,
    lessons: {
      a: { done: true, ts: '2026-08-21T00:00:00Z' },
      b: { done: true, ts: '2026-08-19T00:00:00Z' },
    },
    quizzes: {},
  }))
  const merged = mergeProgress(local, imported)
  assert.equal(merged.lessons.a.ts, '2026-08-21T00:00:00Z', '导入的更新时间胜出')
  assert.equal(merged.lessons.b.ts, '2026-08-19T00:00:00Z', '本地独有的条目保留')
})

test('recordQuiz keeps the best score and rejects impossible scores', () => {
  let state = emptyState()
  state = recordQuiz(state, '00-开始这里', 2, 3, '2026-08-22T10:00:00Z')
  state = recordQuiz(state, '00-开始这里', 1, 3, '2026-08-22T11:00:00Z')
  assert.equal(state.quizzes['00-开始这里'].score, 2, '低分不能覆盖高分')
  state = recordQuiz(state, '00-开始这里', 4, 3, '2026-08-22T12:00:00Z')
  assert.equal(state.quizzes['00-开始这里'].score, 2, '越界成绩被拒绝')
})

test('summarize counts done lessons and perfect quizzes', () => {
  let state = emptyState()
  state = markDone(state, 'a', '2026-08-22T10:00:00Z')
  state = markDone(state, 'b', '2026-08-22T10:01:00Z')
  state = recordQuiz(state, 'a', 3, 3, '2026-08-22T10:02:00Z')
  state = recordQuiz(state, 'b', 1, 3, '2026-08-22T10:03:00Z')
  assert.deepEqual(summarize(state), { doneLessons: 2, quizLessons: 2, perfectQuizzes: 1 })
})
