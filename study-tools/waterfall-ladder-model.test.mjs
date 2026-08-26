import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildWaterfallTrace,
  evaluateWaterfall,
  TRANSFORMS,
} from '../website/public/waterfall-ladder-model.js'

test('compose：值按 A×2 → B+10 → C 原样 一路传递，链尾收束', () => {
  const trace = buildWaterfallTrace({ scenario: 'compose', initialValue: 1 })
  assert.deepEqual(trace.steps.map(step => step.phase), [
    'dispatch', 'run', 'delegate', 'run', 'delegate', 'run',
  ])
  const runs = trace.steps.filter(step => step.phase === 'run')
  assert.deepEqual(runs.map(step => [step.valueIn, step.valueOut]), [[1, 2], [2, 12], [12, 12]])
  assert.equal(trace.result.value, 12)
  assert.deepEqual([...trace.result.skipped], [])
  assert.equal(trace.result.verdict, 'chain-end')
})

test('single 与 order 只走注册过的监听器', () => {
  const single = buildWaterfallTrace({ scenario: 'single' })
  assert.equal(single.chain.length, 1)
  assert.equal(single.result.visited.length, 2)
  assert.equal(single.result.value, 2)

  const order = buildWaterfallTrace({ scenario: 'order' })
  assert.equal(order.result.value, 12)
  assert.equal(order.steps.filter(step => step.phase === 'delegate').length, 1)
})

test('shortcircuit：B 不委托时 C 收不到，结果停在 B 的返回值', () => {
  const trace = buildWaterfallTrace({ scenario: 'shortcircuit', bDelegates: false })
  const short = trace.steps.at(-1)
  assert.equal(short.phase, 'short-circuit')
  assert.equal(short.at, 'B')
  assert.deepEqual([...short.skipped], ['C'])
  assert.deepEqual([...trace.result.visited], ['ctx', 'A', 'B'])
  assert.equal(trace.result.verdict, 'short-circuit')

  const delegated = buildWaterfallTrace({ scenario: 'shortcircuit', bDelegates: true })
  assert.equal(delegated.result.bShortCircuits, false)
  assert.equal(delegated.result.verdict, 'chain-end')
  assert.equal(delegated.result.skipped.length, 0)
})

test('roles：策略官拒绝即短路，记录员全程委托', () => {
  const policy = buildWaterfallTrace({ scenario: 'roles', role: 'policy' })
  assert.equal(policy.result.verdict, 'deny')
  assert.equal(policy.result.role, 'policy')

  const annotator = buildWaterfallTrace({ scenario: 'roles', role: 'annotator' })
  assert.equal(annotator.result.verdict, 'chain-end')
  assert.equal(annotator.result.bShortCircuits, false)
})

test('initialValue 决定整条链的数值；未知场景大声失败', () => {
  const trace = buildWaterfallTrace({ scenario: 'compose', initialValue: 5 })
  assert.equal(trace.result.value, 20)
  assert.throws(() => buildWaterfallTrace({ scenario: 'nope' }), /未知场景/)
})

test('轨迹结构自洽：dispatch 指向首监听器，run 数与 visited 一致', () => {
  for (const scenario of ['single', 'order', 'compose', 'shortcircuit', 'roles']) {
    for (const bDelegates of [true, false]) {
      for (const role of ['annotator', 'policy']) {
        const trace = buildWaterfallTrace({ scenario, bDelegates, role })
        assert.equal(trace.steps[0].phase, 'dispatch')
        assert.equal(trace.steps[0].to, trace.chain[0])
        const runs = trace.steps.filter(step => step.phase === 'run')
        assert.equal(runs.length, trace.result.visited.length - 1)
      }
    }
  }
})

test('evaluateWaterfall 对五种合法结局全部放行', () => {
  const cases = [
    buildWaterfallTrace({ scenario: 'single' }),
    buildWaterfallTrace({ scenario: 'order' }),
    buildWaterfallTrace({ scenario: 'compose', initialValue: 7 }),
    buildWaterfallTrace({ scenario: 'shortcircuit', bDelegates: false }),
    buildWaterfallTrace({ scenario: 'roles', role: 'policy' }),
    buildWaterfallTrace({ scenario: 'roles', role: 'annotator' }),
  ]
  for (const trace of cases) {
    const verdict = evaluateWaterfall(trace)
    assert.equal(verdict.ok, true, JSON.stringify(verdict.checks.filter(c => !c.pass)))
    assert.equal(verdict.checks.length, 4)
  }
})

test('变换表与教学设定一致', () => {
  assert.equal(TRANSFORMS.A.apply(3), 6)
  assert.equal(TRANSFORMS.B.apply(3), 13)
  assert.equal(TRANSFORMS.C.apply(3), 3)
})
