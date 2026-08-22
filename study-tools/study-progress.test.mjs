import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  LAB_PAGE_IDS,
  emptyState,
  markDone,
  markLabDone,
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

test('normalizeLessonId maps known lab pages onto lab: ids', () => {
  for (const id of LAB_PAGE_IDS) {
    assert.equal(normalizeLessonId(`/${id}-lab.html`), `lab:${id}`)
    assert.equal(normalizeLessonId(`/deepseek-harness-study/${id}-lab`), `lab:${id}`, 'cleanUrls 路径')
  }
})

test('normalizeLessonId rejects labs outside the whitelist and keeps lessons first', () => {
  assert.equal(normalizeLessonId('/research-debug-bridge.html'), null, '桥接页是工作台，不进进度')
  assert.equal(normalizeLessonId('/unknown-topic-lab.html'), null, '名单外的 -lab 页面不算实验')
  assert.equal(normalizeLessonId('/en/tool-visibility-lab.html'), null, '英文站不挂中文组件')
  assert.equal(
    normalizeLessonId('/study/lessons/tool-visibility'),
    'tool-visibility',
    'lessons 路径优先于实验页名单',
  )
})

test('markDone then serialize then parse round-trips at v2 with fixed key order', () => {
  const state = markDone(emptyState(), '00-开始这里', '2026-08-22T10:00:00Z')
  const text = serializeProgress(state)
  const parsed = parseProgress(text)
  assert.equal(parsed.v, 2)
  assert.deepEqual(parsed.lessons['00-开始这里'], { done: true, ts: '2026-08-22T10:00:00Z' })
  assert.equal(
    serializeProgress(emptyState()),
    '{"v":2,"lessons":{},"quizzes":{},"labs":{}}',
    '键序固定：同样的状态永远得到同一串字节',
  )
})

test('parseProgress migrates v1 payloads into v2 with empty labs', () => {
  const v1 = JSON.stringify({
    v: 1,
    lessons: { a: { done: true, ts: '2026-08-01T00:00:00Z' } },
    quizzes: { a: { score: 2, total: 3, ts: '2026-08-01T00:01:00Z' } },
  })
  const parsed = parseProgress(v1)
  assert.equal(parsed.v, 2)
  assert.deepEqual(parsed.lessons.a, { done: true, ts: '2026-08-01T00:00:00Z' })
  assert.deepEqual(parsed.quizzes.a, { score: 2, total: 3, ts: '2026-08-01T00:01:00Z' })
  assert.deepEqual(parsed.labs, {}, 'v1 时代没有实验记录')
})

test('parseProgress rejects corrupt or foreign payloads instead of throwing', () => {
  for (const bad of ['not-json', '{"v":3}', '{"v":"2"}', '[]', '{"v":2,"lessons":{"x":{"done":"yes"}}}', '{"v":2,"labs":{"x":{"done":1}}}']) {
    assert.deepEqual(parseProgress(bad), emptyState(), bad)
  }
})

test('markLabDone records into the labs table and refreshes the timestamp', () => {
  let state = markLabDone(emptyState(), 'lab:turn-flow', '2026-08-22T10:00:00Z')
  state = markLabDone(state, 'lab:turn-flow', '2026-08-22T11:00:00Z')
  state = markLabDone(state, 'lab:compaction', '2026-08-22T12:00:00Z')
  assert.deepEqual(state.labs['lab:turn-flow'], { done: true, ts: '2026-08-22T11:00:00Z' })
  const parsed = parseProgress(serializeProgress(state))
  assert.deepEqual(parsed.labs['lab:compaction'], { done: true, ts: '2026-08-22T12:00:00Z' }, 'labs 表参与序列化往返')
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

test('merging a v1 import preserves local lab records', () => {
  const local = markLabDone(emptyState(), 'lab:session-log', '2026-08-22T09:00:00Z')
  const imported = parseProgress(JSON.stringify({
    v: 1,
    lessons: { a: { done: true, ts: '2026-08-01T00:00:00Z' } },
    quizzes: {},
  }))
  const merged = mergeProgress(local, imported)
  assert.deepEqual(merged.lessons.a, { done: true, ts: '2026-08-01T00:00:00Z' })
  assert.deepEqual(merged.labs['lab:session-log'], { done: true, ts: '2026-08-22T09:00:00Z' })
})

test('mergeProgress resolves lab conflicts by the newer timestamp', () => {
  const local = markLabDone(emptyState(), 'lab:turn-flow', '2026-08-20T00:00:00Z')
  const imported = parseProgress(serializeProgress(markLabDone(emptyState(), 'lab:turn-flow', '2026-08-21T00:00:00Z')))
  const merged = mergeProgress(local, imported)
  assert.equal(merged.labs['lab:turn-flow'].ts, '2026-08-21T00:00:00Z')
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
  assert.deepEqual(summarize(state), { doneLessons: 2, quizLessons: 2, perfectQuizzes: 1, doneLabs: 0 })
  state = markLabDone(state, 'lab:profile-loader', '2026-08-22T10:04:00Z')
  assert.equal(summarize(state).doneLabs, 1)
})
