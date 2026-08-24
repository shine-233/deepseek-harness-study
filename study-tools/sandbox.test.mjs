import assert from 'node:assert/strict'
import { test } from 'node:test'
import { SANDBOX_MODES, buildSandboxModel, evaluateSandboxOracle, decideOperation } from '../website/public/sandbox-model.js'

test('同一输入逐字节相同', () => {
  const input = { mode: 'workspace-write', op: 'write-temp', sessionOverride: true }
  assert.equal(JSON.stringify(buildSandboxModel(input)), JSON.stringify(buildSandboxModel(input)))
})

test('三模式 × 四操作真值表逐格成立', () => {
  const expect = {
    'read-only': { read: 'allowed', 'write-in-workspace': 'denied', 'write-temp': 'denied', 'write-outside': 'denied' },
    'workspace-write': { read: 'allowed', 'write-in-workspace': 'allowed', 'write-temp': 'allowed', 'write-outside': 'denied' },
    'danger-full-access': { read: 'allowed', 'write-in-workspace': 'allowed', 'write-temp': 'allowed', 'write-outside': 'allowed' },
  }
  for (const mode of SANDBOX_MODES) {
    for (const op of ['read', 'write-in-workspace', 'write-temp', 'write-outside']) {
      const model = buildSandboxModel({ mode, op })
      assert.equal(model.observations.verdict, expect[mode][op],
        `${mode} × ${op}: ${model.observations.verdict} ≠ ${expect[mode][op]}`)
    }
  }
})

test('会话覆盖事件入册后重放可重建策略；拒绝带升级指引', () => {
  const overridden = buildSandboxModel({ sessionOverride: true })
  assert.ok(overridden.steps.some(s => s.phase === 'override-event'))
  assert.ok(overridden.observations.policyInHistory)

  const denied = buildSandboxModel({ mode: 'read-only', op: 'write-in-workspace' })
  const guidance = denied.steps.find(s => s.phase === 'denial-guidance')
  assert.ok(guidance !== undefined && guidance.detail.includes('升级指引'))
})

test('坏输入大声失败', () => {
  assert.throws(() => buildSandboxModel({ mode: 'paranoid' }), RangeError)
  assert.throws(() => buildSandboxModel({ op: 42 }), RangeError)
  assert.throws(() => buildSandboxModel({ sessionOverride: 'yes' }), TypeError)
})
