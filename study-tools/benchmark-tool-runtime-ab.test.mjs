import assert from 'node:assert/strict'
import test from 'node:test'

import { parseCliArgs, runRuntimeAbBenchmark } from './benchmark-tool-runtime-ab.mjs'

test('命令行入口会忽略 pnpm 转发的分隔符', () => {
  assert.deepEqual(parseCliArgs(['--', '--iterations', '20', '--warmup=5']), {
    options: { iterations: 20, warmup: 5 },
  })
})

test('真实 ToolRuntime A/B：同一注册集合下只用 scoped restrict 改变可见与组装集合', async () => {
  const report = await runRuntimeAbBenchmark({ iterations: 3, warmup: 1 })

  assert.equal(report.benchmark, 'tool-runtime-assembly-ab')
  assert.equal(report.evidence.providerCalls, 0)
  assert.equal(report.evidence.modelCalls, 0)
  assert.equal(report.evidence.dshProcessStarted, false)
  assert.equal(report.comparison.valid, true)
  assert.equal(report.variants.A.visibleToolCount, 24)
  assert.equal(report.variants.B.visibleToolCount, 3)
  assert.equal(report.variants.A.assembly.toolCount, 24)
  assert.equal(report.variants.B.assembly.toolCount, 3)
  assert.ok(report.variants.A.schemaUtf8Bytes > report.variants.B.schemaUtf8Bytes)
  assert.ok(report.variants.A.assembly.toolWireUtf8Bytes > report.variants.B.assembly.toolWireUtf8Bytes)
})
