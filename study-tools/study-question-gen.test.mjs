/**
 * 数据驱动生成题的契约。
 *
 * 生成题与实验页共用同一批模型函数：答案必须能从模型输出重新推导，
 * id 必须稳定（复习解析依赖它），组合层 allQuestionsFor 不改动手写题库。
 */

import { strict as assert } from 'node:assert'
import test from 'node:test'

import { buildTurnModel } from '../website/public/turn-flow-model.js'
import { buildSessionLogModel } from '../website/public/session-log-model.js'
import {
  allQuestionsFor,
  generatedQuestionsFor,
  gradeAnswers,
  QUIZ_BANK,
  shuffleQuiz,
} from '../website/public/study-quiz.js'

const TURN_LABELS = { user: '用户', context: '上下文装配', model: '模型', tool: '工具', session: 'Session 日志' }

test('生成题只落在接了模型的课程上，其余课程为空', () => {
  for (const lesson of Object.keys(QUIZ_BANK)) {
    const count = generatedQuestionsFor(lesson).length
    if (lesson === '04-Agent与Turn流程' || lesson === '05-Session日志与恢复') {
      assert.ok(count > 0, lesson + ' 应有生成题')
    } else {
      assert.equal(count, 0, lesson + ' 不应有生成题')
    }
  }
})

test('生成题的答案能从模型输出独立推导，id 稳定，选项无重复', () => {
  const steps = buildTurnModel({ scenario: 'two-tools' }).steps
  const questions = generatedQuestionsFor('04-Agent与Turn流程')
  const ids = new Set()
  for (const question of questions) {
    assert.ok(!ids.has(question.id), 'id 重复：' + question.id)
    ids.add(question.id)
    assert.ok(new Set(question.options).size === question.options.length, question.id + ' 选项重复')
    const match = /第 (\d+) 步/.exec(question.q)
    assert.notEqual(match, null, question.id + ' 题干缺少步号')
    const step = steps[Number(match[1])]
    assert.equal(question.options[question.answer], TURN_LABELS[step.lane],
      question.id + ' 正确选项必须等于模型里该步的泳道')
  }
})

test('Session 读数题的数值来自重放输出，干扰项不吞掉正确项', () => {
  for (const question of generatedQuestionsFor('05-Session日志与恢复')) {
    const scenarioId = question.id.replace('gen-05-tools-', '')
    const truth = buildSessionLogModel({ scenario: scenarioId }).observations.toolCalls
    assert.ok(question.options.includes(String(truth) + ' 次'), question.id + ' 缺少真实读数')
    assert.equal(question.options[question.answer], String(truth) + ' 次')
  }
})

test('allQuestionsFor 是手写题库加生成题；手写题库本体不动', () => {
  const combined = allQuestionsFor('04-Agent与Turn流程')
  assert.equal(combined.length, QUIZ_BANK['04-Agent与Turn流程'].length + 2)
  assert.deepEqual(allQuestionsFor('01-仓库地图'), [...QUIZ_BANK['01-仓库地图']])
  assert.equal(allQuestionsFor('不存在'), undefined)
})

test('判分与打乱对组合数组照常工作', () => {
  const combined = allQuestionsFor('05-Session日志与恢复')
  const answers = Object.fromEntries(combined.map(question => [question.id, question.answer]))
  assert.equal(gradeAnswers(combined, answers).score, combined.length)
  for (const seed of [1, 99, 20260822]) {
    const variant = shuffleQuiz(combined, seed)
    assert.equal(variant.length, combined.length)
    for (const question of variant) {
      const original = combined.find(candidate => candidate.id === question.id)
      assert.equal(question.options[question.answer], original.options[original.answer])
    }
  }
})
