/**
 * 练习变体与键盘步进的纯函数契约。
 *
 * 覆盖：种子随机数同种子同序列、变体打乱后答案仍指向同一文本、
 * 题干解释出处原样保留、不同种子（大概率）给出不同排列、
 * 滑块按键的取值边界。
 */

import { strict as assert } from 'node:assert'
import test from 'node:test'

import { mulberry32, QUIZ_BANK, shuffleQuiz } from '../website/public/study-quiz.js'
import { nextRangeValue } from '../website/public/study-lab-kit.js'

test('mulberry32 同一种子永远得到同一个序列', () => {
  const a = mulberry32(42)
  const b = mulberry32(42)
  for (let i = 0; i < 8; i += 1) assert.equal(a(), b())
  const c = mulberry32(43)
  assert.notEqual(a(), c())
})

const QUESTIONS = QUIZ_BANK['00-开始这里']

test('变体打乱题目与选项，但正确答案始终指向同一份文本', () => {
  for (const seed of [0, 1, 7, 123456789, 0x7fffffff]) {
    const variant = shuffleQuiz(QUESTIONS, seed)
    assert.equal(variant.length, QUESTIONS.length)
    for (const question of variant) {
      const original = QUESTIONS.find(candidate => candidate.id === question.id)
      assert.deepEqual(question.options[question.answer], original.options[original.answer])
      assert.equal(question.explain, original.explain)
      assert.equal(question.source, original.source)
      assert.equal(question.q, original.q)
    }
    // 判分函数不需要知道变体的存在：用原答案判分必须全对。
    const answers = Object.fromEntries(variant.map(question => [question.id, question.answer]))
    const verdict = gradeShim(variant, answers)
    assert.equal(verdict.score, verdict.total)
  }
})

/** 与页面层 gradeAnswers 相同逻辑的本地影子，避免循环依赖页面模块。 */
function gradeShim(questions, answers) {
  return {
    score: questions.filter(question => answers[question.id] === question.answer).length,
    total: questions.length,
  }
}

test('足够多的种子里总能找到与原始顺序不同的排列', () => {
  const identity = JSON.stringify(QUESTIONS.map(question => [question.id, ...question.options]))
  const variants = Array.from({ length: 32 }, (_, seed) => JSON.stringify(
    shuffleQuiz(QUESTIONS, seed + 1).map(question => [question.id, ...question.options]),
  ))
  assert.ok(variants.some(text => text !== identity), '32 个种子里没有一个改变顺序')
})

test('滑块按键：←→按步长走、Home/End 到边界、越界被夹住、未知键返回 null', () => {
  assert.equal(nextRangeValue('ArrowLeft', 4, 0, 20, 1), 3)
  assert.equal(nextRangeValue('ArrowRight', 4, 0, 20, 2), 6)
  assert.equal(nextRangeValue('Home', 9, 0, 9, 1), 0)
  assert.equal(nextRangeValue('End', 0, 0, 9, 1), 9)
  assert.equal(nextRangeValue('ArrowLeft', 1, 0, 9, 3), 0)
  assert.equal(nextRangeValue('ArrowRight', 8, 0, 9, 3), 9)
  assert.equal(nextRangeValue('PageDown', 4, 0, 9, 1), null)
})
