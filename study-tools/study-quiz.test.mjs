import assert from 'node:assert/strict'
import { test } from 'node:test'
import { QUIZ_BANK, QUIZ_LESSONS, gradeAnswers } from '../website/public/study-quiz.js'

test('every quiz lesson has questions with exactly one correct option', () => {
  assert.ok(QUIZ_LESSONS.length >= 3, '试点至少覆盖前三课')
  for (const lesson of QUIZ_LESSONS) {
    const questions = QUIZ_BANK[lesson]
    assert.ok(Array.isArray(questions) && questions.length >= 3, lesson + ' 至少 3 题')
    for (const question of questions) {
      assert.equal(question.answer < question.options.length, true, question.id + ' 答案下标越界')
      assert.equal(question.explain.length > 10, true, question.id + ' 必须带解释')
      assert.equal(question.source.length > 5, true, question.id + ' 必须标注出处')
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
