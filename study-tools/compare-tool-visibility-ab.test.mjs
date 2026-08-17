import test from 'node:test'
import assert from 'node:assert/strict'
import { compareSnapshots } from './compare-tool-visibility-ab.mjs'
import { benchmarkSnapshots } from './benchmark-tool-visibility-ab.mjs'

const registered = [
  { name: 'read_file', source: 'example', version: '1.0.0' },
  { name: 'search_text', source: 'example', version: '1.0.0' },
]
const readFile = {
  name: 'read_file',
  presentation: 'native',
  schema: { type: 'object', properties: { path: { type: 'string' } } },
}

test('accepts a comparison that only removes a visible tool', () => {
  const report = compareSnapshots(
    { profile: 'audit', agent: 'default', fixed: { taskId: 'one' }, registered, visible: [readFile, { name: 'search_text', schema: {} }], execution: [] },
    { profile: 'audit', agent: 'default', fixed: { taskId: 'one' }, registered, visible: [readFile], execution: [] },
  )
  assert.equal(report.valid, true)
  assert.deepEqual(report.change, { addedVisible: [], removedVisible: ['search_text'], commonVisible: ['read_file'] })
})

test('rejects a comparison that changes a fixed condition', () => {
  const report = compareSnapshots(
    { profile: 'normal', agent: 'default', fixed: { taskId: 'one' }, registered, visible: [readFile], execution: [] },
    { profile: 'audit', agent: 'default', fixed: { taskId: 'one' }, registered, visible: [readFile, { name: 'search_text', schema: {} }], execution: [] },
  )
  assert.equal(report.valid, false)
  assert.match(report.errors.join('\n'), /profile/)
})

test('rejects a comparison that changes a shared schema', () => {
  const report = compareSnapshots(
    { profile: 'audit', agent: 'default', fixed: {}, registered, visible: [readFile], execution: [] },
    { profile: 'audit', agent: 'default', fixed: {}, registered, visible: [{ ...readFile, schema: { type: 'string' } }, { name: 'search_text', schema: {} }], execution: [] },
  )
  assert.equal(report.valid, false)
  assert.match(report.errors.join('\n'), /schema/)
})

test('rejects snapshots without an explicit profile and agent', () => {
  assert.throws(
    () => compareSnapshots(
      { fixed: {}, registered, visible: [readFile], execution: [] },
      { fixed: {}, registered, visible: [readFile, { name: 'search_text', schema: {} }], execution: [] },
    ),
    /A\.profile 必须是非空字符串/,
  )
})

test('reports offline parse, collection-diff, and serialization costs', () => {
  const snapshotA = {
    profile: 'audit',
    agent: 'default',
    fixed: { taskId: 'one' },
    registered,
    visible: [readFile, { name: 'search_text', schema: {} }],
    execution: [],
  }
  const snapshotB = {
    ...snapshotA,
    visible: [readFile],
  }
  let ticks = 0n
  const report = benchmarkSnapshots(JSON.stringify(snapshotA), JSON.stringify(snapshotB), {
    iterations: 3,
    warmup: 1,
    clock: () => {
      ticks += 1_000n
      return ticks
    },
  })

  assert.deepEqual(report.config, { iterations: 3, warmup: 1 })
  assert.equal(report.input.A.visibleToolCount, 2)
  assert.equal(report.input.B.visibleToolCount, 1)
  assert.equal(report.proxyIndicators.visibleToolCountDelta, -1)
  assert.equal(report.proxyIndicators.removedVisibleCount, 1)
  assert.equal(report.operations.snapshotParsing.A.iterations, 3)
  assert.equal(report.operations.collectionDiff.iterations, 3)
  assert.equal(report.operations.serialization.B.iterations, 3)
  assert.equal(report.evidence.providerCalls, 0)
  assert.match(report.evidence.modelLatency, /不能推导/)

  const repeated = benchmarkSnapshots(JSON.stringify(snapshotA), JSON.stringify(snapshotB), {
    iterations: 3,
    warmup: 1,
    clock: () => 0n,
  })
  assert.deepEqual(repeated.input, report.input)
  assert.deepEqual(repeated.proxyIndicators, report.proxyIndicators)
})

test('rejects an A/B pair that does not satisfy comparison invariants', () => {
  const snapshot = {
    profile: 'audit',
    agent: 'default',
    fixed: {},
    registered,
    visible: [readFile],
    execution: [],
  }

  assert.throws(
    () => benchmarkSnapshots(JSON.stringify(snapshot), JSON.stringify(snapshot), { iterations: 1, warmup: 0 }),
    /visible 集合没有变化/,
  )
})
