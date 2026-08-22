import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  PLUGIN_LANES,
  PLUGIN_SCENARIOS,
  buildPluginFlowModel,
  evaluatePluginFlowOracle,
} from '../website/public/plugin-flow-model.js'

const SCENARIOS = PLUGIN_SCENARIOS.map(scenario => scenario.id)

test('the same input produces byte-identical output', () => {
  const input = { scenario: 'normal', subscribed: true, maxLength: 20 }
  assert.equal(
    JSON.stringify(buildPluginFlowModel(input)),
    JSON.stringify(buildPluginFlowModel(input)),
  )
})

test('every scenario passes every oracle check across the whole input grid', () => {
  for (const scenario of SCENARIOS) {
    for (const subscribed of [true, false]) {
      for (const maxLength of [0, 5, 20, 60]) {
        const model = buildPluginFlowModel({ scenario, subscribed, maxLength })
        const verdict = evaluatePluginFlowOracle(model)
        for (const check of verdict.checks) {
          assert.equal(check.pass, true,
            scenario + ' sub=' + subscribed + ' len=' + maxLength
            + ' failed ' + check.id + ': ' + check.actual)
        }
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const scenario of SCENARIOS) {
    for (const step of buildPluginFlowModel({ scenario, subscribed: true, maxLength: 10 }).steps) {
      assert.ok(PLUGIN_LANES.includes(step.lane), scenario + ': ' + step.lane)
    }
  }
})

test('a denied run never executes the body but still logs the result', () => {
  const model = buildPluginFlowModel({ scenario: 'denied', subscribed: true, maxLength: 20 })
  assert.ok(model.steps.some(step => step.detail.includes('拦截')), '策略拦截要出现在步骤里')
  assert.ok(model.steps.some(step => step.phase === 'log' && step.detail.includes('tool/result')),
    '拒绝结果仍写入日志')
  assert.equal(evaluatePluginFlowOracle(model).pass, true)
})

test('an unsubscribed plugin produces no preview in any scenario', () => {
  for (const scenario of SCENARIOS) {
    const model = buildPluginFlowModel({ scenario, subscribed: false, maxLength: 30 })
    assert.equal(model.observations.previewsWritten, 0)
    const check = evaluatePluginFlowOracle(model).checks.find(c => c.id === 'PREVIEW_RULE')
    assert.equal(check.pass, true)
  }
})

test('maxLength zero still writes an empty-string preview record', () => {
  const model = buildPluginFlowModel({ scenario: 'normal', subscribed: true, maxLength: 0 })
  assert.equal(model.observations.previewsWritten, 1)
  assert.equal(model.previews[0].text, '')
})

test('unloading mid-flow stops previews but not logs', () => {
  const model = buildPluginFlowModel({ scenario: 'unload-midway', subscribed: true, maxLength: 12 })
  assert.equal(model.observations.previewsWritten, 1, '只有第一轮写预览')
  assert.equal(model.observations.broadcasts, 2, '第二次广播照常发生')
  assert.ok(model.observations.loggedEvents >= 3, '两次调用的日志都由宿主写入')
  const check = evaluatePluginFlowOracle(model).checks.find(c => c.id === 'UNLOAD_SEMANTICS')
  assert.equal(check.pass, true)
})

test('tampering with the effect ledger fails the cleanup check', () => {
  const model = buildPluginFlowModel({ scenario: 'normal', subscribed: true, maxLength: 10 })
  const tampered = {
    ...model,
    observations: { ...model.observations, effectsActiveAtEnd: 1 },
  }
  const check = evaluatePluginFlowOracle(tampered).checks.find(c => c.id === 'EFFECTS_CLEAN')
  assert.equal(check.pass, false)
})

test('tampering with a preview text fails the slice rule', () => {
  const model = buildPluginFlowModel({ scenario: 'normal', subscribed: true, maxLength: 8 })
  const tampered = {
    ...model,
    previews: [{ stepIndex: model.previews[0].stepIndex, text: '被篡改的预览' }],
  }
  const check = evaluatePluginFlowOracle(tampered).checks.find(c => c.id === 'PREVIEW_RULE')
  assert.equal(check.pass, false)
})

test('unknown scenario or malformed input is rejected rather than defaulted', () => {
  assert.throws(() => buildPluginFlowModel({ scenario: 'nope', subscribed: true, maxLength: 5 }), RangeError)
  assert.throws(() => buildPluginFlowModel({ scenario: 'normal', subscribed: 'yes', maxLength: 5 }), TypeError)
  assert.throws(() => buildPluginFlowModel({ scenario: 'normal', subscribed: true, maxLength: 1.5 }), TypeError)
  assert.throws(() => buildPluginFlowModel({ scenario: 'normal', subscribed: true, maxLength: 99 }), RangeError)
})

test('the evidence boundary names what a step timeline cannot show', () => {
  const model = buildPluginFlowModel({ scenario: 'normal', subscribed: true, maxLength: 10 })
  assert.ok(model.canProve.length >= 3)
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['Loader', '审批', '性能']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})

test('the flow lab page wires the state module and its copy control', () => {
  const htmlPath = new URL('../website/public/plugin-flow-lab.html', import.meta.url)
  const html = readFileSync(fileURLToPath(htmlPath), 'utf8')
  assert.ok(html.includes('id="copy-state-link"'))
  assert.ok(html.includes('Content-Security-Policy'), 'lab pages ship their own CSP')
  const script = readFileSync(fileURLToPath(new URL('../website/public/plugin-flow-lab.js', import.meta.url)), 'utf8')
  for (const marker of ['readStateFromHash', 'writeStateToHash', 'FLOW_STATE_SCHEMA']) {
    assert.ok(script.includes(marker), 'plugin-flow-lab.js must reference ' + marker)
  }
})
