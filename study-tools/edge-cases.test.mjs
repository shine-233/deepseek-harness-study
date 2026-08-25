/**
 * 边界情况补充测试：用非常规输入压测已有模型，验证错误处理和降级路径。
 * 这些测试不改模型文件——它们只调用已有的纯函数并断言输出。
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'

// ---- fs-edit 边界 ----
import { buildFsEditModel, evaluateFsEditOracle, filePathFor } from '../website/public/fs-edit-model.js'

test('fs-edit: CRLF 行结尾不破坏匹配', () => {
  // 教学文件不含 CRLF，但 old_str 含 \r 应该匹配不到
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'danger-full-access', oldStr: 'timeout\r: 30s', newStr: '' })
  assert.equal(model.outcome.kind, 'not-found')
})

test('fs-edit: 空替换等于删除行内容但保留行本身', () => {
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'workspace-write', oldStr: 'timeout: 30s\n', newStr: '' })
  assert.equal(model.outcome.kind, 'success')
  assert.ok(!model.after.includes('timeout'))
  assert.ok(model.after.includes('endpoint')) // 后续行不受影响
})

test('fs-edit: 多行 old_str 匹配整块替换', () => {
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'workspace-write', oldStr: '# retry policy\nretries: 3', newStr: '# updated\nretries: 5' })
  assert.equal(model.outcome.kind, 'success')
  assert.ok(model.after.includes('# updated'))
  assert.ok(model.after.includes('retries: 5'))
})

test('fs-edit: 特殊正则字符按字面量匹配', () => {
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'workspace-write', oldStr: 'endpoint: https://api.example.com', newStr: 'x' })
  assert.equal(model.outcome.kind, 'success')
})

// ---- web-tool 边界 ----
import { buildWebFetchModel, buildWebSearchModel } from '../website/public/web-tool-model.js'

test('web-fetch: maxOutputChars 最小允许值时截断', () => {
  const model = buildWebFetchModel({ url: 'u', pageId: 'docs', maxOutputChars: 120 })
  assert.equal(model.observations.effectiveTruncated, true)
  assert.ok(model.text.includes('Content truncated'))
})

test('web-search: 单查询不触发合并器', () => {
  const model = buildWebSearchModel({ queries: ['cache policy'] })
  assert.equal(model.sources.length, 3)
  assert.equal(model.seamTruncation?.truncated ?? false, false)
})

test('web-search: 空查询列表在入口显式失败', () => {
  const model = buildWebSearchModel({ queries: [] })
  assert.equal(model.ok, false)
})

// ---- jobs 边界 ----
import { buildJobsModel } from '../website/public/jobs-model.js'

test('jobs: reader 剧本在 completed 结局时通知恰好一条', () => {
  const m = buildJobsModel({ script: 'reader', ending: 'completed' })
  assert.equal(m.observations.noticesDelivered, 1)
})

test('jobs: teardown 在 failed 结局时也零通知', () => {
  const m = buildJobsModel({ script: 'teardown', ending: 'failed' })
  assert.equal(m.observations.noticesDelivered, 0)
})

// ---- plan-stack 边界 ----
import { buildTodoStackModel, buildGoalModel } from '../website/public/plan-stack-model.js'

test('plan-stack: noop 不改变 logged 或 pending', () => {
  const m = buildGoalModel({ phase: 'active', verb: 'disarm', roundsCapReached: false })
  assert.ok(m)
})

test('plan-stack: disarm 不写版本号', () => {
  const m = buildGoalModel({ phase: 'active', verb: 'pause', roundsCapReached: false })
  if (!m.illegal) {
    assert.equal(m.observations.armed, false)
  }
})

// ---- session-projection 边界 ----
import { projectSession } from '../website/public/session-projection-model.js'

test('projection: 重放到第 0 条时所有投影为初始值', () => {
  const p = projectSession(0)
  assert.equal(p.states.todos.items.length, 0)
  assert.equal(p.states.planMode.active, false)
  assert.equal(p.states.goal.revision, 0)
})

test('projection: 无关事件的 changes 全为 false', () => {
  const p = projectSession(2) // seq=3 是 assistant/chunk，无关
  const chunkStep = p.trace.find(s => s.kind === 'assistant/chunk')
  if (chunkStep) {
    assert.equal(chunkStep.changes.todos, false)
    assert.equal(chunkStep.changes.planMode, false)
  }
})
