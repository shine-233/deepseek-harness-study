import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  MCP_LANES,
  backoffSchedule,
  buildMcpModel,
  evaluateMcpOracle,
} from '../website/public/mcp-model.js'

test('同一输入产生逐字节相同的推演', () => {
  const input = { serverDown: true, reconnect: true, maxAttempts: 4, initialDelayMs: 500, action: 'call-tool' }
  assert.equal(JSON.stringify(buildMcpModel(input)), JSON.stringify(buildMcpModel(input)))
})

test('退避序列首值取初值，其后翻倍并封顶', () => {
  assert.deepEqual(backoffSchedule(500, 4), [500, 1000, 2000, 4000])
  assert.deepEqual(backoffSchedule(500, 6), [500, 1000, 2000, 4000, 8000, 8000])
  assert.deepEqual(backoffSchedule(125, 3), [125, 250, 500])
})

test('服务器在线：两个限定名工具注册可见', () => {
  const model = buildMcpModel({})
  assert.equal(model.observations.connected, true)
  assert.deepEqual(model.observations.visibleTools,
    ['mcp__fs-tools__read_file', 'mcp__fs-tools__write_file'])
  for (const check of evaluateMcpOracle(model).checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('服务器离线：失败次数恰好等于重连预算，退避逐次翻倍', () => {
  const model = buildMcpModel({ serverDown: true, maxAttempts: 3, initialDelayMs: 250 })
  assert.equal(model.observations.gaveUpAfter, 3)
  assert.equal(model.observations.connected, false)
  const delays = model.steps.filter(s => s.phase === 'retry').map(s => s.delayMs)
  assert.deepEqual(delays, [250, 500, 1000])
  for (const check of evaluateMcpOracle(model).checks) {
    assert.equal(check.pass, true, check.id + ': ' + check.actual)
  }
})

test('reconnect=false 只试一次就放弃', () => {
  const model = buildMcpModel({ serverDown: true, reconnect: false })
  assert.equal(model.observations.gaveUpAfter, 1)
  const check = evaluateMcpOracle(model).checks.find(c => c.id === 'MC_GIVE_UP_BUDGET')
  assert.equal(check.pass, true)
})

test('dispose 与 HMR 都释放命名空间；同名热替换公开名稳定', () => {
  const disposed = buildMcpModel({ action: 'dispose' })
  assert.equal(disposed.observations.namespaceReleased, true)
  assert.equal(disposed.observations.visibleTools.length, 0)

  const hmr = buildMcpModel({ hmrSwap: true })
  assert.equal(hmr.steps.some(s => s.phase === 'names-stable'), true)
  assert.equal(hmr.observations.namespaceReleased, true)

  for (const model of [disposed, hmr]) {
    for (const check of evaluateMcpOracle(model).checks) {
      assert.equal(check.pass, true, check.id + ': ' + check.actual)
    }
  }
})

test('远端 isError 照常结算，不触发重试也不吞掉', () => {
  const model = buildMcpModel({ action: 'call-tool', callFails: true })
  assert.ok(model.steps.some(s => s.phase === 'remote-error'))
  assert.ok(model.steps.some(s => s.phase === 'error-settles'))
  assert.equal(model.observations.remoteErrorSettledNormally, true)
})

test('未连接时调用在派发前被拒', () => {
  const model = buildMcpModel({ serverDown: true, action: 'call-tool' })
  assert.ok(model.steps.some(s => s.phase === 'call-unavailable'))
})

test('全输入网格通过全部校验；坏输入大声失败', () => {
  for (const serverDown of [false, true]) {
    for (const reconnect of [false, true]) {
      for (const maxAttempts of [1, 3, 6]) {
        for (const action of ['connect-list', 'call-tool', 'dispose']) {
          const model = buildMcpModel({ serverDown, reconnect, maxAttempts, action })
          for (const check of evaluateMcpOracle(model).checks) {
            assert.equal(check.pass, true,
              `down=${serverDown} rc=${reconnect} n=${maxAttempts} ${action} 的 ${check.id} 失败：${check.actual}`)
          }
        }
      }
    }
  }
  for (const entry of buildMcpModel({}).steps) assert.ok(MCP_LANES.includes(entry.lane))
  assert.throws(() => buildMcpModel({ maxAttempts: 7 }), RangeError)
  assert.throws(() => buildMcpModel({ reconnect: 'yes' }), TypeError)
  assert.throws(() => evaluateMcpOracle(null), TypeError)
})
