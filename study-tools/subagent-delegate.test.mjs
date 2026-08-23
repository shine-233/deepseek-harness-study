import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  DELEGATE_LANES,
  buildSubagentDelegateModel,
  evaluateSubagentDelegateOracle,
} from '../website/public/subagent-delegate-model.js'

test('the same input produces byte-identical output', () => {
  const input = { depth: 'within-limit', outcome: 'report' }
  assert.equal(
    JSON.stringify(buildSubagentDelegateModel(input)),
    JSON.stringify(buildSubagentDelegateModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const depth of ['within-limit', 'beyond-limit']) {
    for (const outcome of ['report', 'fail']) {
      const model = buildSubagentDelegateModel({ depth, outcome })
      const result = evaluateSubagentDelegateOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          depth + '/' + outcome + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const depth of ['within-limit', 'beyond-limit']) {
    const model = buildSubagentDelegateModel({ depth, outcome: 'fail' })
    for (const step of model.steps) {
      assert.ok(DELEGATE_LANES.includes(step.lane), depth + ': ' + step.lane)
    }
  }
})

test('a beyond-limit delegation is rejected at the boundary and spawns nothing', () => {
  const model = buildSubagentDelegateModel({ depth: 'beyond-limit', outcome: 'report' })
  assert.equal(model.observations.childRan, false)
  assert.equal(model.observations.depthAccepted, false)
  assert.equal(model.observations.reportKind, null)
  assert.ok(!model.steps.some(step => step.lane === '子 Agent'), '子泳道必须为空')
})

test('a within-limit delegation runs on its own lane and settles exactly once', () => {
  for (const outcome of ['report', 'fail']) {
    const model = buildSubagentDelegateModel({ depth: 'within-limit', outcome })
    assert.equal(model.observations.childRan, true)
    assert.equal(model.observations.reportKind, outcome)
    const settles = model.steps.filter(step => step.phase === 'settle')
    assert.equal(settles.length, 1, outcome + ': 回报必须恰好一次')
    // 泳道隔离：子的执行步骤绝不落回父泳道。
    assert.ok(!model.steps.some(step =>
      step.lane === '父 Agent' && (step.phase === 'run' || step.phase === 'report')))
  }
})

test('unknown depth modes or outcomes fail loud at the model boundary', () => {
  assert.throws(() => buildSubagentDelegateModel({ depth: 'infinite', outcome: 'report' }), RangeError)
  assert.throws(() => buildSubagentDelegateModel({ depth: 'within-limit', outcome: 'vanish' }), RangeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('subagent-delegate-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  const script = readFileSync(new URL('subagent-delegate-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'rejected-at-boundary'/)
  for (const option of ['spawns-anyway', 'rejected-at-boundary', 'spawns-silent']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
