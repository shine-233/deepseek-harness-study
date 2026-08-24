import assert from 'node:assert/strict'
import { test } from 'node:test'
import { QUERY_LOG, buildQueryModel, evaluateQueryOracle } from '../website/public/query-model.js'

test('同一查询逐字节相同；全网格过校验', () => {
  const input = { kindFilter: 'tool/call', searchText: 'login', window: [0, 11] }
  assert.equal(JSON.stringify(buildQueryModel(input)), JSON.stringify(buildQueryModel(input)))
  for (const kind of ['all', 'user/message', 'tool/call', 'tool/result']) {
    for (const win of [[0, 5], [3, 11]]) {
      const model = buildQueryModel({ kindFilter: kind, searchText: '', window: win })
      for (const check of evaluateQueryOracle(model).checks) {
        assert.equal(check.pass, true, `kind=${kind} win=${win} 的 ${check.id}`)
      }
    }
  }
})

test('搜索大小写不敏感且为子串匹配', () => {
  const model = buildQueryModel({ searchText: 'LOGIN' })
  assert.ok(model.observations.matchCount >= 1)
  assert.ok(model.observations.matchedSeqs.every(seq => QUERY_LOG[seq].text.toLowerCase().includes('login')))
})

test('窗口闭区间：边界事件包含在内；过滤后可以为空', () => {
  assert.equal(buildQueryModel({ window: [4, 4] }).observations.matchCount, 1)
  const none = buildQueryModel({ kindFilter: 'all', searchText: 'zzz-不存在' })
  assert.equal(none.observations.matchCount, 0)
})

test('种类过滤逐条成立', () => {
  const model = buildQueryModel({ kindFilter: 'user/message' })
  assert.ok(model.observations.matchedSeqs.length >= 1)
  for (const check of evaluateQueryOracle(model).checks) assert.equal(check.pass, true)
})

test('坏输入大声失败', () => {
  assert.throws(() => buildQueryModel({ kindFilter: 'nope' }), RangeError)
  assert.throws(() => buildQueryModel({ searchText: 42 }), TypeError)
  assert.throws(() => buildQueryModel({ window: [5, 2] }), RangeError)
})
