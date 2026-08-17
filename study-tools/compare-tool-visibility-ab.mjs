#!/usr/bin/env node

/**
 * Preflight two host-exported tool visibility snapshots for an A/B study.
 *
 * The interface is deliberately two files and one JSON report: callers do not
 * need to know the host's private registry, and the implementation checks the
 * invariants that make a visibility comparison interpretable. It does not
 * call a provider or measure model latency.
 */

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Compare two neutral snapshots while allowing only the visible set and
 * execution outcomes to vary.
 *
 * @param {unknown} a - Snapshot for the first variant.
 * @param {unknown} b - Snapshot for the second variant.
 * @returns {Record<string, unknown>} A machine-readable comparison report.
 */
export function compareSnapshots(a, b) {
  const left = normalizeSnapshot(a, 'A')
  const right = normalizeSnapshot(b, 'B')
  const errors = []
  const warnings = []

  if (left.profile !== right.profile) errors.push('A/B 的 profile 不一致')
  if (left.agent !== right.agent) errors.push('A/B 的 agent 不一致')
  if (stableJson(left.registered) !== stableJson(right.registered)) {
    errors.push('A/B 的 registered 集合或注册元数据不一致')
  }
  if (stableJson(left.fixed) !== stableJson(right.fixed)) {
    errors.push('A/B 的 fixed 实验条件不一致')
  }

  const leftNames = left.visible.map(tool => tool.name)
  const rightNames = right.visible.map(tool => tool.name)
  const leftSet = new Set(leftNames)
  const rightSet = new Set(rightNames)
  const commonNames = leftNames.filter(name => rightSet.has(name))
  const addedVisible = rightNames.filter(name => !leftSet.has(name))
  const removedVisible = leftNames.filter(name => !rightSet.has(name))

  if (addedVisible.length === 0 && removedVisible.length === 0) {
    errors.push('A/B 的 visible 集合没有变化')
  }
  if (stableJson(commonNames) !== stableJson(rightNames.filter(name => leftSet.has(name)))) {
    errors.push('A/B 共同可见工具的顺序发生变化')
  }

  const leftByName = new Map(left.visible.map(tool => [tool.name, tool]))
  const rightByName = new Map(right.visible.map(tool => [tool.name, tool]))
  const changedShared = commonNames.filter(name => stableJson(leftByName.get(name)) !== stableJson(rightByName.get(name)))
  if (changedShared.length > 0) {
    errors.push(`共同可见工具的 presentation 或 schema 发生变化：${changedShared.join(', ')}`)
  }

  if (stableJson(left.execution) !== stableJson(right.execution)) {
    warnings.push('execution 结果不同；这可以是模型行为结果，但不能把它当成只改变可见集合后的性能差异')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    fixed: {
      profile: left.profile,
      agent: left.agent,
      registeredCount: left.registered.length,
      registeredNames: left.registered.map(tool => tool.name),
      experimentConditions: left.fixed,
    },
    variants: {
      A: variantReport(left, leftNames),
      B: variantReport(right, rightNames),
    },
    change: {
      addedVisible,
      removedVisible,
      commonVisible: commonNames,
    },
    evidenceBoundary: [
      '这个报告只证明两个脱敏快照的结构条件是否适合比较。',
      '它不提供 provider input tokens、cached tokens、首 token 延迟、总延迟或任务质量。',
      'execution 不同是结果或策略观察，不能单独归因于 visible 集合。',
    ],
  }
}

function normalizeSnapshot(value, label) {
  if (!isRecord(value)) throw new Error(`${label} 快照根对象必须是 JSON 对象`)
  const registered = records(value.registered, `${label}.registered`)
  const visible = records(value.visible, `${label}.visible`)
  const execution = records(value.execution, `${label}.execution`)
  const profile = requiredString(value.profile, `${label}.profile`)
  const agent = requiredString(value.agent, `${label}.agent`)
  const fixed = isRecord(value.fixed) ? value.fixed : {}
  ensureUniqueNames(registered, `${label}.registered`)
  ensureUniqueNames(visible, `${label}.visible`)
  const registeredNames = new Set(registered.map(tool => tool.name))
  const unregistered = visible.map(tool => tool.name).filter(name => !registeredNames.has(name))
  if (unregistered.length > 0) {
    throw new Error(`${label}.visible 包含未注册工具：${unregistered.join(', ')}`)
  }
  return { profile, agent, registered, visible, execution, fixed }
}

function variantReport(snapshot, names) {
  const schemaBytes = snapshot.visible.reduce((total, tool) => (
    'schema' in tool ? total + Buffer.byteLength(JSON.stringify(tool.schema), 'utf8') : total
  ), 0)
  return {
    visibleCount: snapshot.visible.length,
    visibleNames: names,
    schemaUtf8Bytes: schemaBytes,
    roughTokensBytesDiv4: Math.ceil(schemaBytes / 4),
    executionDecisionCount: snapshot.execution.length,
  }
}

function records(value, field) {
  if (!Array.isArray(value)) throw new Error(`${field} 必须是数组`)
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`${field}[${index}] 必须是对象`)
    if (typeof item.name !== 'string' || item.name.length === 0) {
      throw new Error(`${field}[${index}].name 必须是非空字符串`)
    }
    return item
  })
}

function ensureUniqueNames(items, field) {
  const seen = new Set()
  const duplicates = new Set()
  for (const item of items) {
    if (seen.has(item.name)) duplicates.add(item.name)
    seen.add(item.name)
  }
  if (duplicates.size > 0) throw new Error(`${field} 有重复工具名：${[...duplicates].sort().join(', ')}`)
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requiredString(value, field) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`${field} 必须是非空字符串`)
  }
  return value
}

function stableJson(value) {
  return JSON.stringify(value, (_key, nested) => {
    if (!isRecord(nested)) return nested
    return Object.fromEntries(Object.entries(nested).sort(([left], [right]) => left.localeCompare(right)))
  })
}

async function main() {
  const [aPath, bPath] = process.argv.slice(2)
  if (aPath === undefined || bPath === undefined) {
    console.error('用法：node study-tools/compare-tool-visibility-ab.mjs <A.json> <B.json>')
    process.exitCode = 2
    return
  }
  try {
    const [a, b] = await Promise.all([
      readFile(aPath, 'utf8').then(JSON.parse),
      readFile(bPath, 'utf8').then(JSON.parse),
    ])
    const report = compareSnapshots(a, b)
    console.log(JSON.stringify(report, null, 2))
    if (!report.valid) process.exitCode = 1
  } catch (error) {
    console.error(`读取或比较快照失败：${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 2
  }
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1])) await main()
