import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildIdentityModel, evaluateIdentityOracle } from '../website/public/identity-model.js'

test('同一输入逐字节相同；全网格过校验', () => {
  const input = { home: 'home-a', fileExists: true, sameProcess: true }
  assert.equal(JSON.stringify(buildIdentityModel(input)), JSON.stringify(buildIdentityModel(input)))
  for (const home of ['home-a', 'home-b']) {
    for (const fileExists of [false, true]) {
      for (const sameProcess of [false, true]) {
        const model = buildIdentityModel({ home, fileExists, sameProcess })
        for (const check of evaluateIdentityOracle(model).checks) {
          assert.equal(check.pass, true, `${home} f=${fileExists} p=${sameProcess} 的 ${check.id}: ${check.actual}`)
        }
      }
    }
  }
})

test('文件存在：沿用既有身份，同进程走记忆不再碰磁盘', () => {
  const fresh = buildIdentityModel({ fileExists: true, sameProcess: false })
  const memo = buildIdentityModel({ fileExists: true, sameProcess: true })
  assert.ok(fresh.steps.some(s => s.phase === 'disk-read'))
  assert.ok(memo.steps.some(s => s.phase === 'memo-hit'))
})

test('删除文件 + 新进程 = 铸造全新身份', () => {
  const model = buildIdentityModel({ fileExists: false, sameProcess: false })
  assert.ok(model.steps.some(s => s.phase === 'fresh-identity'))
  assert.equal(model.observations.forkShape, '文件缺失：铸造全新身份')
})

test('运行中删除不影响本进程（记忆命中）', () => {
  const model = buildIdentityModel({ fileExists: false, sameProcess: true })
  assert.ok(model.steps.some(s => s.phase === 'memo-hit'))
  assert.ok(!model.steps.some(s => s.phase === 'fresh-identity'))
})

test('id 不含机器指纹；坏输入大声失败', () => {
  const model = buildIdentityModel({ home: 'home-a' })
  assert.ok(!model.observations.id.includes('home-a'))
  assert.throws(() => buildIdentityModel({ home: 'nope' }), RangeError)
  assert.throws(() => buildIdentityModel({ fileExists: 'yes' }), TypeError)
})
