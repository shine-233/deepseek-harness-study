import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  TURN_LANES,
  TURN_SANDBOX_LIMITS,
  buildTurnSandboxModel,
  evaluateTurnSandboxOracle,
} from '../website/public/turn-flow-model.js'

test('同一组旋钮位置产生逐字节相同的轨迹', () => {
  const input = { messageWords: 30, toolCalls: 3, failAtCall: 2, rejected: false, abortAtStep: 9 }
  assert.equal(
    JSON.stringify(buildTurnSandboxModel(input)),
    JSON.stringify(buildTurnSandboxModel(input)),
  )
})

test('旋钮的每一种组合都通过全部校验（含中止位扫过每个前缀）', () => {
  for (const toolCalls of [0, 1, 2, 3, 4]) {
    for (const failAtCall of [0, 1, 2]) {
      if (failAtCall > toolCalls) continue
      for (const rejected of [false, true]) {
        const full = buildTurnSandboxModel({ messageWords: 20, toolCalls, failAtCall, rejected })
        const end = rejected ? 1 : full.totalSteps - 1
        for (let abortAtStep = 0; abortAtStep <= end; abortAtStep += 1) {
          const model = buildTurnSandboxModel({ messageWords: 20, toolCalls, failAtCall, rejected, abortAtStep })
          const verdict = evaluateTurnSandboxOracle(model)
          for (const check of verdict.checks) {
            assert.equal(check.pass, true,
              `tools=${toolCalls} fail=${failAtCall} rejected=${rejected} abort=${abortAtStep} 的 ${check.id} 失败：${check.actual}`)
          }
        }
      }
    }
  }
})

test('首次领取被拒时，整条轨迹只剩一条结束事件', () => {
  const model = buildTurnSandboxModel({ toolCalls: 4, failAtCall: 4, rejected: true })
  assert.equal(model.steps.length, 1)
  assert.equal(model.steps[0].lane, 'session')
  assert.equal(model.observations.modelRequests, 0)
  assert.equal(model.pairs.length, 0)
  assert.equal(model.observations.forkShape, '零 Step 的被拒 Turn')
  const check = evaluateTurnSandboxOracle(model).checks.find(c => c.id === 'SB_REJECTED_ZERO_STEP')
  assert.equal(check.pass, true)
})

test('没有被拒时不存在零步轨迹，且请求次数随工具结果增长', () => {
  const none = buildTurnSandboxModel({ toolCalls: 0 })
  assert.equal(none.observations.modelRequests, 1)
  assert.equal(none.observations.toolRuns, 0)

  const one = buildTurnSandboxModel({ toolCalls: 2 })
  assert.equal(one.observations.modelRequests, 3)
  assert.ok(one.observations.modelRequests > 1, '带工具的 Turn 不止一次请求')

  // 每个正常调用带回一个结果：请求数 = 1 + 工具数。
  assert.equal(
    one.observations.modelRequests,
    1 + one.pairs.filter(pair => pair.payloadId.startsWith('p-result-')).length,
  )
})

test('失败旋钮让指定调用先失败再重试，失败结果先入日志', () => {
  const model = buildTurnSandboxModel({ toolCalls: 3, failAtCall: 2 })
  assert.equal(model.observations.toolFailures, 1)
  assert.equal(model.observations.retries, 1)
  const failed = model.steps.find(entry => entry.failed === true)
  const retry = model.steps.find(entry => entry.retry === true)
  assert.ok(failed !== undefined && retry !== undefined && retry.index > failed.index)
  const failureLogged = model.steps.some(entry =>
    entry.phase === 'tool-result-logged' && entry.index > failed.index && entry.index < retry.index)
  assert.equal(failureLogged, true, '失败必须先写入日志才允许重试')
  // 带一次失败的调用比正常调用多带回一个结果：请求数 = 1 + 工具数 + 1。
  assert.equal(model.observations.modelRequests, 5)
})

test('中止把序列截断并追加 blocked 收尾；被拒时不允许中止形态', () => {
  const full = buildTurnSandboxModel({ toolCalls: 2 })
  const cut = buildTurnSandboxModel({ toolCalls: 2, abortAtStep: 6 })
  assert.equal(cut.steps.length, 7)
  assert.equal(cut.aborted, true)
  assert.equal(cut.steps.at(-1).phase, 'turn-abort')
  // 截断的前缀与完整序列逐位相同，不是重新生成。
  for (const [index, entry] of cut.steps.slice(0, 6).entries()) {
    assert.deepEqual(entry, full.steps[index])
  }
  assert.equal(buildTurnSandboxModel({ toolCalls: 2, rejected: true }).aborted, false)
})

test('消息长度改变观测读数，但不冒充 token', () => {
  const short = buildTurnSandboxModel({ messageWords: 4 })
  const long = buildTurnSandboxModel({ messageWords: 60 })
  assert.equal(short.observations.messageWords, 4)
  assert.equal(long.observations.messageWords, 60)
  assert.equal(short.steps.length, long.steps.length, '词数不改变步骤结构')
  const boundary = buildTurnSandboxModel().cannotProve.join('\n')
  for (const absent of ['token', '耗时']) {
    assert.ok(boundary.includes(absent), 'cannotProve 必须提到 ' + absent)
  }
})

test('越界或类型错误的输入大声失败，而不是悄悄归一化', () => {
  assert.throws(() => buildTurnSandboxModel({ messageWords: 3 }), RangeError)
  assert.throws(() => buildTurnSandboxModel({ messageWords: 61 }), RangeError)
  assert.throws(() => buildTurnSandboxModel({ toolCalls: 5 }), RangeError)
  assert.throws(() => buildTurnSandboxModel({ toolCalls: 2, failAtCall: 3 }), RangeError)
  assert.throws(() => buildTurnSandboxModel({ toolCalls: 'x' }), TypeError)
  assert.throws(() => buildTurnSandboxModel({ rejected: 'yes' }), TypeError)
  assert.throws(() => evaluateTurnSandboxOracle(null), TypeError)
  assert.throws(() => evaluateTurnSandboxOracle({ steps: 'no' }), TypeError)
})

test('每一步都落在已声明的 lane 上，范围声明本身自洽', () => {
  for (const entry of buildTurnSandboxModel({ toolCalls: 4, failAtCall: 4 }).steps) {
    assert.ok(TURN_LANES.includes(entry.lane))
  }
  assert.ok(TURN_SANDBOX_LIMITS.messageWords.max >= TURN_SANDBOX_LIMITS.messageWords.min)
  assert.ok(TURN_SANDBOX_LIMITS.toolCalls.max >= TURN_SANDBOX_LIMITS.toolCalls.min)
})
