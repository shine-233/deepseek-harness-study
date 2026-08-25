import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-progress-view.js imports without a DOM', async () => {
  mod = await import('../website/public/study-progress-view.js')
  assert.equal(typeof mod.parseSitemapLessons, 'function')
  assert.equal(typeof mod.lessonRow, 'function')
  assert.equal(typeof mod.labRow, 'function')
})

const SAMPLE_XML = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://shine-233.github.io/deepseek-harness-study/develop/basic/config</loc></url>
  <url><loc>https://shine-233.github.io/deepseek-harness-study/study/lessons/01-%E4%BB%93%E5%BA%93%E5%9C%B0%E5%9B%BE</loc></url>
  <url><loc>https://shine-233.github.io/deepseek-harness-study/study/lessons/00-%E5%BC%80%E5%A7%8B%E8%BF%99%E9%87%8C</loc></url>
  <url><loc>https://shine-233.github.io/deepseek-harness-study/study/lessons/00-%E5%BC%80%E5%A7%8B%E8%BF%99%E9%87%8C</loc></url>
  <url><loc>https://shine-233.github.io/deepseek-harness-study/study/files/README</loc></url>
</urlset>`

test('parseSitemapLessons extracts only lesson URLs, decodes ids, sorts by number, dedupes', () => {
  const lessons = mod.parseSitemapLessons(SAMPLE_XML)
  assert.deepEqual(lessons.map(l => l.id), ['00-开始这里', '01-仓库地图'])
  assert.ok(lessons[0].href.includes('/study/lessons/00-'))
  // 非课程 URL（develop、files）不进名单
  assert.ok(!lessons.some(l => l.id.includes('config')))
})

test('parseSitemapLessons tolerates empty and malformed input', () => {
  assert.deepEqual(mod.parseSitemapLessons(''), [])
  assert.deepEqual(mod.parseSitemapLessons(null), [])
  assert.deepEqual(mod.parseSitemapLessons('<loc>no-urls-here</loc>'), [])
})

test('lessonRow reflects done and quiz state', () => {
  const state = {
    lessons: { '00-开始这里': { done: true, ts: 't' } },
    quizzes: { '00-开始这里': { score: 3, total: 3, ts: 't' } },
    labs: {},
  }
  const done = mod.lessonRow({ id: '00-开始这里', href: 'x' }, state)
  assert.equal(done.done, true)
  assert.equal(done.quiz, '3/3')
  assert.equal(done.perfect, true)
  const untouched = mod.lessonRow({ id: '01-仓库地图', href: 'x' }, state)
  assert.equal(untouched.done, false)
  assert.equal(untouched.quiz, null)
})

test('labRow keys into the lab: prefixed table', () => {
  const state = { labs: { 'lab:turn-flow': { done: true, ts: 't' } } }
  assert.equal(mod.labRow('turn-flow', state).done, true)
  assert.equal(mod.labRow('package-graph', state).done, false)
  assert.ok(mod.labRow('turn-flow', state).href.endsWith('turn-flow-lab.html'))
})
