#!/usr/bin/env node

/**
 * Run a provider-free A/B benchmark over two exported tool-visibility snapshots.
 *
 * The measured operations are local JSON parsing, visible-name collection
 * difference, and visible-list JSON serialization. The report also contains
 * deterministic byte/count indicators so two runs can be compared without
 * treating wall-clock timing as a correctness result.
 */

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { compareSnapshots } from './compare-tool-visibility-ab.mjs'

export const DEFAULT_ITERATIONS = 1_000
export const DEFAULT_WARMUP = 100

/**
 * Benchmark two already-exported snapshots without starting DSH or calling a
 * provider.
 *
 * @param {string} aJson - UTF-8 JSON text for variant A.
 * @param {string} bJson - UTF-8 JSON text for variant B.
 * @param {{iterations?: number, warmup?: number, clock?: () => bigint}} [options] - Run and clock options.
 * @returns {Record<string, unknown>} A report containing local timings, deterministic proxies, and evidence limits.
 */
export function benchmarkSnapshots(aJson, bJson, options = {}) {
  if (typeof aJson !== 'string' || typeof bJson !== 'string') {
    throw new TypeError('A/B 快照输入必须是 JSON 字符串')
  }

  const iterations = positiveInteger(options.iterations ?? DEFAULT_ITERATIONS, 'iterations')
  const warmup = nonNegativeInteger(options.warmup ?? DEFAULT_WARMUP, 'warmup')
  const clock = options.clock ?? (() => process.hrtime.bigint())
  if (typeof clock !== 'function') throw new TypeError('clock 必须是返回 bigint 的函数')

  const a = parseSnapshot(aJson, 'A')
  const b = parseSnapshot(bJson, 'B')
  const comparison = compareSnapshots(a, b)
  if (!comparison.valid) {
    throw new Error(`A/B 快照不能作为基准：${comparison.errors.join('；')}`)
  }

  const input = {
    A: inputReport(a, aJson),
    B: inputReport(b, bJson),
  }
  const operations = {
    snapshotParsing: {
      A: measure(() => JSON.parse(aJson), iterations, warmup, clock),
      B: measure(() => JSON.parse(bJson), iterations, warmup, clock),
    },
    collectionDiff: measure(() => diffVisibleNames(a, b), iterations, warmup, clock),
    serialization: {
      A: measure(() => JSON.stringify(a.visible), iterations, warmup, clock),
      B: measure(() => JSON.stringify(b.visible), iterations, warmup, clock),
    },
  }

  return {
    benchmark: 'offline-tool-visibility-ab',
    config: { iterations, warmup },
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    },
    input,
    proxyIndicators: {
      visibleToolCountDelta: input.B.visibleToolCount - input.A.visibleToolCount,
      visibleJsonUtf8BytesDelta: input.B.visibleJsonUtf8Bytes - input.A.visibleJsonUtf8Bytes,
      visibleSchemaUtf8BytesDelta: input.B.visibleSchemaUtf8Bytes - input.A.visibleSchemaUtf8Bytes,
      addedVisibleCount: comparison.change.addedVisible.length,
      removedVisibleCount: comparison.change.removedVisible.length,
      commonVisibleCount: comparison.change.commonVisible.length,
      addedVisible: comparison.change.addedVisible,
      removedVisible: comparison.change.removedVisible,
      commonVisible: comparison.change.commonVisible,
      roughVisibleTokensBytesDiv4: {
        A: Math.ceil(input.A.visibleJsonUtf8Bytes / 4),
        B: Math.ceil(input.B.visibleJsonUtf8Bytes / 4),
      },
    },
    operations,
    evidence: {
      providerCalls: 0,
      apiKeyRequired: false,
      modelLatency: '本基准不调用 provider/API；本地解析、集合差异和序列化耗时不能推导真实模型延迟。',
      limitations: [
        'wall-clock timing 会受 Node.js 版本、操作系统、CPU 负载、JIT 和垃圾回收影响；它是本机观测，不是性能门禁。',
        'UTF-8 字节数和 bytes/4 只是请求可见工具部分的代理指标，不是 provider tokenizer 的真实 token 数。',
        '快照不包含 provider 排队、网络、模型首 token、总延迟、工具执行时间或任务质量。',
      ],
    },
  }
}

function parseSnapshot(json, label) {
  try {
    return JSON.parse(json)
  } catch (error) {
    throw new Error(`${label} 快照不是有效 JSON：${error instanceof Error ? error.message : String(error)}`)
  }
}

function inputReport(snapshot, json) {
  const visibleJson = JSON.stringify(snapshot.visible)
  const visibleSchemaUtf8Bytes = snapshot.visible.reduce((total, tool) => (
    'schema' in tool ? total + Buffer.byteLength(JSON.stringify(tool.schema), 'utf8') : total
  ), 0)
  const visibleJsonUtf8Bytes = Buffer.byteLength(visibleJson, 'utf8')
  return {
    snapshotJsonUtf8Bytes: Buffer.byteLength(json, 'utf8'),
    visibleToolCount: snapshot.visible.length,
    visibleJsonUtf8Bytes,
    visibleSchemaUtf8Bytes,
  }
}

function diffVisibleNames(a, b) {
  const aNames = a.visible.map(tool => tool.name)
  const bNames = b.visible.map(tool => tool.name)
  const aSet = new Set(aNames)
  const bSet = new Set(bNames)
  return {
    addedVisible: bNames.filter(name => !aSet.has(name)),
    removedVisible: aNames.filter(name => !bSet.has(name)),
    commonVisible: aNames.filter(name => bSet.has(name)),
  }
}

function measure(action, iterations, warmup, clock) {
  let lastValue
  for (let index = 0; index < warmup; index += 1) lastValue = action()
  const started = readClock(clock)
  for (let index = 0; index < iterations; index += 1) lastValue = action()
  const elapsedNanoseconds = readClock(clock) - started
  if (elapsedNanoseconds < 0n) throw new Error('clock 返回了倒退的时间')
  void lastValue
  const totalNanoseconds = Number(elapsedNanoseconds)
  return {
    iterations,
    warmup,
    totalNanoseconds,
    totalMilliseconds: totalNanoseconds / 1_000_000,
    nanosecondsPerIteration: totalNanoseconds / iterations,
  }
}

function readClock(clock) {
  const value = clock()
  if (typeof value !== 'bigint') throw new TypeError('clock 必须返回 bigint')
  return value
}

function positiveInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${field} 必须是大于 0 的安全整数`)
  }
  return value
}

function nonNegativeInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${field} 必须是非负安全整数`)
  }
  return value
}

function parseCliArgs(args) {
  const paths = []
  const options = {}
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === '--help' || argument === '-h') return { help: true }
    if (argument === '--iterations' || argument === '--warmup') {
      const value = args[index + 1]
      if (value === undefined) throw new Error(`${argument} 缺少数值`)
      options[argument.slice(2)] = Number(value)
      index += 1
    } else if (argument.startsWith('--iterations=') || argument.startsWith('--warmup=')) {
      const separator = argument.indexOf('=')
      options[argument.slice(2, separator)] = Number(argument.slice(separator + 1))
    } else if (argument.startsWith('-')) {
      throw new Error(`未知参数：${argument}`)
    } else {
      paths.push(argument)
    }
  }
  if (paths.length !== 2) throw new Error('需要两个快照路径：<A.json> <B.json>')
  return { paths, options }
}

function printUsage() {
  console.error('用法：node study-tools/benchmark-tool-visibility-ab.mjs <A.json> <B.json> [--iterations N] [--warmup N]')
}

async function main() {
  try {
    const parsed = parseCliArgs(process.argv.slice(2))
    if (parsed.help === true) {
      printUsage()
      return
    }
    const [aPath, bPath] = parsed.paths
    const [aJson, bJson] = await Promise.all([
      readFile(aPath, 'utf8'),
      readFile(bPath, 'utf8'),
    ])
    console.log(JSON.stringify(benchmarkSnapshots(aJson, bJson, parsed.options), null, 2))
  } catch (error) {
    printUsage()
    console.error(`读取或基准失败：${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 2
  }
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1])) await main()
