import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  HOOK_BEHAVIORS,
  HOOK_VERDICTS,
  HOOK_LANES,
  buildHookFlowModel,
  evaluateHookFlowOracle,
} from '../website/public/hook-flow-model.js'

const BEHAVIORS = HOOK_BEHAVIORS.map(item => item)
const VERDICTS = HOOK_VERDICTS.map(item => item)

test('the same input produces byte-identical output', () => {
  const input = { behavior: 'return-direct', verdict: 'deny' }
  assert.equal(
    JSON.stringify(buildHookFlowModel(input)),
    JSON.stringify(buildHookFlowModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const behavior of BEHAVIORS) {
    for (const verdict of VERDICTS) {
      const model = buildHookFlowModel({ behavior, verdict })
      const result = evaluateHookFlowOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          behavior + ' verdict=' + verdict + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const behavior of BEHAVIORS) {
    for (const verdict of VERDICTS) {
      const model = buildHookFlowModel({ behavior, verdict })
      for (const step of model.steps) {
        assert.ok(HOOK_LANES.includes(step.lane), behavior + '/' + verdict + ': ' + step.lane)
      }
    }
  }
})

test('a direct return short-circuits: the fallback never executes and the policy writes the result', () => {
  for (const verdict of VERDICTS) {
    const model = buildHookFlowModel({ behavior: 'return-direct', verdict })
    const skipStep = model.steps.find(step => step.phase === 'skip')
    assert.ok(skipStep, '短路时间线必须包含被跳过的兜底步骤')
    assert.equal(skipStep.lane, '默认放行')
    assert.equal(model.observations.fallbackReached, false)
    assert.equal(model.observations.shortCircuited, true)
    assert.equal(model.observations.executedListeners, 2)
    assert.equal(model.observations.finalVerdict, verdict)
    assert.equal(model.observations.finalAuthor, '策略监听器')
  }
})

test('a delegating policy keeps the whole chain alive', () => {
  const denied = buildHookFlowModel({ behavior: 'call-next', verdict: 'deny' })
  assert.equal(denied.observations.fallbackReached, true)
  assert.equal(denied.observations.executedListeners, 3)
  assert.equal(denied.observations.finalVerdict, 'deny')
  // 拒绝是终端决定：兜底原样传递，作者仍是策略监听器。
  assert.equal(denied.observations.finalAuthor, '策略监听器')

  const allowed = buildHookFlowModel({ behavior: 'call-next', verdict: 'allow' })
  assert.equal(allowed.observations.fallbackReached, true)
  // 放行＝不拦截：链上没有现成结果，兜底写入默认放行并成为作者。
  assert.equal(allowed.observations.finalVerdict, 'allow')
  assert.equal(allowed.observations.finalAuthor, '默认放行')
})

test('the audit listener records exactly once and always delegates', () => {
  for (const behavior of BEHAVIORS) {
    for (const verdict of VERDICTS) {
      const auditSteps = buildHookFlowModel({ behavior, verdict })
        .steps.filter(step => step.listener === 'audit')
      assert.equal(auditSteps.length, 1)
      assert.equal(auditSteps[0].action, 'next()')
    }
  }
})

test('unknown behaviors or verdicts fail loud at the model boundary', () => {
  assert.throws(() => buildHookFlowModel({ behavior: 'nope', verdict: 'allow' }), RangeError)
  assert.throws(() => buildHookFlowModel({ behavior: 'call-next', verdict: 'maybe' }), RangeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('hook-flow-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  const script = readFileSync(new URL('hook-flow-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'short-circuit'/)
  for (const option of ['fallback-runs', 'short-circuit', 'no-result']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
