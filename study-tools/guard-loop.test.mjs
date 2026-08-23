import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  GUARD_LANES,
  GUARD_THRESHOLD,
  buildGuardLoopModel,
  evaluateGuardLoopOracle,
} from '../website/public/guard-loop-model.js'

test('the same input produces byte-identical output', () => {
  const input = { attempts: 4, guard: 'yes' }
  assert.equal(
    JSON.stringify(buildGuardLoopModel(input)),
    JSON.stringify(buildGuardLoopModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const attempts of [1, 2, 3, 4, 5]) {
    for (const guard of ['yes', 'no']) {
      const model = buildGuardLoopModel({ attempts, guard })
      const result = evaluateGuardLoopOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          'attempts=' + attempts + ' guard=' + guard + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  const model = buildGuardLoopModel({ attempts: 5, guard: 'yes' })
  for (const step of model.steps) {
    assert.ok(GUARD_LANES.includes(step.lane), step.lane)
  }
})

test('with the guard on, blocks start exactly at the threshold', () => {
  const model = buildGuardLoopModel({ attempts: 5, guard: 'yes' })
  const firstBlock = model.steps.find(step => step.blocked === true)
  assert.equal(firstBlock.attempt, GUARD_THRESHOLD)
  assert.equal(model.observations.executedCount, GUARD_THRESHOLD - 1)
  assert.equal(model.observations.blockedCount, 5 - (GUARD_THRESHOLD - 1))
})

test('with the guard off, everything executes and nothing is blocked', () => {
  const model = buildGuardLoopModel({ attempts: 5, guard: 'no' })
  assert.equal(model.observations.blockedCount, 0)
  assert.equal(model.observations.executedCount, 5)
})

test('the undo attempt appears at most once and never works', () => {
  for (const attempts of [3, 4, 5]) {
    const model = buildGuardLoopModel({ attempts, guard: 'yes' })
    const undos = model.steps.filter(step => step.phase === 'undo')
    assert.ok(undos.length <= 1, '撤销尝试至多一次')
    for (const undo of undos) {
      assert.equal(undo.undoWorked, false, '撤销必须无效——拒绝是单调的')
    }
  }
  // 没有拦截就没有撤销尝试。
  const clean = buildGuardLoopModel({ attempts: 2, guard: 'yes' })
  assert.equal(clean.steps.some(step => step.phase === 'undo'), false)
})

test('out-of-range attempts fail loud at the model boundary', () => {
  assert.throws(() => buildGuardLoopModel({ attempts: 0, guard: 'yes' }), RangeError)
  assert.throws(() => buildGuardLoopModel({ attempts: 99, guard: 'yes' }), RangeError)
  assert.throws(() => buildGuardLoopModel({ attempts: 'three', guard: 'yes' }), TypeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('guard-loop-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  const script = readFileSync(new URL('guard-loop-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'monotonic'/)
  for (const option of ['undo-works', 'monotonic', 'retry-passes']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
