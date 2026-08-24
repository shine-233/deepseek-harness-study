import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  TERM_LANES,
  buildTerminalModel,
  evaluateTerminalOracle,
} from '../website/public/terminal-model.js'

test('同一输入产生逐字节相同的推演', () => {
  const input = { scriptId: 'env', freshEach: false, concurrentSend: true, killAfter: true }
  assert.equal(JSON.stringify(buildTerminalModel(input)), JSON.stringify(buildTerminalModel(input)))
})

test('持久会话跨发送延续状态；一次性模式每次归零', () => {
  const persistent = buildTerminalModel({ scriptId: 'cwd', freshEach: false })
  assert.equal(persistent.observations.sessionCount, 1)
  assert.equal(persistent.observations.stateCarried, true)

  const fresh = buildTerminalModel({ scriptId: 'cwd', freshEach: true })
  assert.equal(fresh.observations.sessionCount, 2)
  assert.equal(fresh.observations.stateCarried, false)

  for (const model of [persistent, fresh]) {
    const verdict = evaluateTerminalOracle(model)
    for (const check of verdict.checks) assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('并发第二次发送被拒，第一条命令照常结算', () => {
  const model = buildTerminalModel({ concurrentSend: true })
  const rejected = model.steps.find(step => step.phase === 'second-send-rejected')
  assert.ok(rejected !== undefined)
  const firstSettled = model.steps.some(step => step.phase === 'output')
  assert.equal(firstSettled, true)
  assert.equal(evaluateTerminalOracle(model).checks.find(c => c.id === 'TM_SINGLE_SEND').pass, true)
})

test('kill 等进程树停稳后才返回', () => {
  const model = buildTerminalModel({ killAfter: true })
  const killIndex = model.steps.findIndex(step => step.phase === 'kill')
  const settledIndex = model.steps.findIndex(step => step.phase === 'settled')
  assert.ok(killIndex !== -1 && settledIndex > killIndex)
  assert.equal(evaluateTerminalOracle(model).checks.find(c => c.id === 'TM_TREE_SETTLED').pass, true)

  const noKill = buildTerminalModel({})
  assert.equal(noKill.steps.some(step => step.phase === 'settled'), false)
})

test('两个脚本的事实表都通过全部校验', () => {
  for (const scriptId of ['cwd', 'env']) {
    for (const freshEach of [false, true]) {
      const model = buildTerminalModel({ scriptId, freshEach, concurrentSend: true, killAfter: true })
      for (const check of evaluateTerminalOracle(model).checks) {
        assert.equal(check.pass, true, scriptId + ' fresh=' + freshEach + ' 的 ' + check.id + ' 失败：' + check.actual)
      }
    }
  }
})

test('每一步都落在已声明的 lane 上；未知脚本大声失败', () => {
  for (const entry of buildTerminalModel({}).steps) assert.ok(TERM_LANES.includes(entry.lane))
  assert.throws(() => buildTerminalModel({ scriptId: 'nope' }), RangeError)
  assert.throws(() => buildTerminalModel({ freshEach: 'yes' }), TypeError)
  assert.throws(() => evaluateTerminalOracle({ steps: 1 }), TypeError)
})
