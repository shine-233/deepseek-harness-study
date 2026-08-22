import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { normalizeLessonId } from '../website/public/study-progress-core.js'
import { QUIZ_BANK, QUIZ_LESSONS, gradeAnswers } from '../website/public/study-quiz.js'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

/** GitHub 式锚点：小写化、去掉标点（中文保留原字符）、空白换连字符。 */
function githubAnchor(headingText) {
  return headingText
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-')
}

/** 收集一份 Markdown 里全部标题的锚点；标题里的代码 span 和链接先还原成纯文本。 */
function collectHeadingAnchors(markdown) {
  const anchors = new Set()
  for (const line of markdown.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line)
    if (!match) continue
    const text = match[2]
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    anchors.add(githubAnchor(text))
  }
  return anchors
}

test('QUIZ_LESSONS covers the six main-chain lessons in course order', () => {
  assert.deepEqual([...QUIZ_LESSONS], [
    '00-开始这里',
    '01-仓库地图',
    '02-Cordis与插件树',
    '03-核心文件精读',
    '04-Agent与Turn流程',
    '05-Session日志与恢复',
  ])
  assert.equal(QUIZ_LESSONS.length, 6)
  assert.deepEqual(Object.keys(QUIZ_BANK).sort(), [...QUIZ_LESSONS].sort())
})

test('lesson ids equal the names normalizeLessonId parses from study lesson pages', () => {
  for (const lesson of QUIZ_LESSONS) {
    assert.equal(normalizeLessonId(`/study/lessons/${encodeURIComponent(lesson)}.html`), lesson)
  }
})

test('every quiz lesson has exactly three questions with exactly one correct option', () => {
  for (const lesson of QUIZ_LESSONS) {
    const questions = QUIZ_BANK[lesson]
    assert.ok(Array.isArray(questions) && questions.length === 3, lesson + ' 恰好 3 题')
    for (const question of questions) {
      assert.equal(question.options.length, 3, question.id + ' 恰好 3 个选项')
      assert.equal(new Set(question.options).size, question.options.length, question.id + ' 选项不得重复')
      assert.ok(
        Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length,
        question.id + ' 答案下标越界',
      )
      assert.equal(question.explain.length > 10, true, question.id + ' 必须带解释')
      assert.equal(question.source.length > 5, true, question.id + ' 必须标注出处')
    }
  }
})

test('every question source resolves to a real file, and md anchors hit real headings', async () => {
  for (const lesson of QUIZ_LESSONS) {
    for (const question of QUIZ_BANK[lesson]) {
      const hashIndex = question.source.indexOf('#')
      const rawPath = hashIndex === -1 ? question.source : question.source.slice(0, hashIndex)
      const relativePath = rawPath.trim().split(/\s+/)[0]
      const absolutePath = join(repoRoot, relativePath)
      assert.ok(existsSync(absolutePath), question.id + ' 的出处文件不存在：' + relativePath)
      if (hashIndex === -1 || !relativePath.endsWith('.md')) continue
      const markdown = await readFile(absolutePath, 'utf8')
      const anchor = question.source.slice(hashIndex + 1)
      assert.ok(
        collectHeadingAnchors(markdown).has(anchor),
        question.id + ' 的锚点 #' + anchor + ' 在 ' + relativePath + ' 中找不到',
      )
    }
  }
})

test('gradeAnswers scores perfect, partial, and empty submissions', () => {
  const questions = QUIZ_BANK['00-开始这里']
  const allCorrect = Object.fromEntries(questions.map(q => [q.id, q.answer]))
  assert.deepEqual(
    (({ score, total }) => ({ score, total }))(gradeAnswers(questions, allCorrect)),
    { score: 3, total: 3 },
  )

  const noneChosen = Object.fromEntries(questions.map(q => [q.id, null]))
  assert.equal(gradeAnswers(questions, noneChosen).score, 0)

  const oneWrong = { ...allCorrect, q2: (questions[1].answer + 1) % questions[1].options.length }
  const verdict = gradeAnswers(questions, oneWrong)
  assert.equal(verdict.score, 2)
  assert.equal(verdict.results.find(r => r.id === 'q2').pass, false)
})

test('every reported result maps back to a real question id', () => {
  const questions = QUIZ_BANK['01-仓库地图']
  const verdict = gradeAnswers(questions, {})
  assert.deepEqual(verdict.results.map(r => r.id), questions.map(q => q.id))
})
