import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { QUIZ_BANK, QUIZ_LESSONS } from '../website/public/study-quiz.js'

const repositoryRoot = resolve(import.meta.dirname, '..')

test('every quiz lesson slug resolves to a real course markdown file', () => {
  assert.ok(QUIZ_LESSONS.length >= 30, `应有 30+ 门课有自测题，实际 ${QUIZ_LESSONS.length}`)
  const missing = QUIZ_LESSONS.filter(lesson =>
    !existsSync(resolve(repositoryRoot, 'study', lesson + '.md')))
  assert.deepEqual(missing, [], '这些课名没有对应的课程文件')
})

test('every question in the merged bank is structurally valid', () => {
  let counted = 0
  for (const lesson of QUIZ_LESSONS) {
    const questions = QUIZ_BANK[lesson]
    assert.ok(Array.isArray(questions) && questions.length >= 3, lesson + ' 至少 3 题')
    const seenIds = new Set()
    for (const question of questions) {
      counted += 1
      assert.equal(typeof question.q, 'string', lesson + ' 题干缺失')
      assert.ok(Array.isArray(question.options) && question.options.length === 3,
        lesson + '/' + question.id + ' 必须恰好 3 个选项')
      assert.ok(question.answer >= 0 && question.answer <= 2,
        lesson + '/' + question.id + ' 答案下标越界')
      assert.ok(!seenIds.has(question.id), lesson + ' 题目 id 重复：' + question.id)
      seenIds.add(question.id)
      assert.ok(String(question.explain).length > 10, lesson + '/' + question.id + ' 解释太短')
      assert.match(String(question.source), /^study\/.+\.md#/, lesson + '/' + question.id + ' 出处格式不对')
    }
  }
  console.log(`merged quiz bank: ${QUIZ_LESSONS.length} lessons / ${counted} questions`)
})
