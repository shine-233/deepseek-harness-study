#!/usr/bin/env node

/**
 * Inspect a host-exported tool visibility snapshot without starting DSH.
 *
 * This deliberately accepts a small neutral JSON shape rather than importing
 * DSH internals. It is a teaching and audit aid, not a runtime observer.
 */

import { readFile } from 'node:fs/promises'

const inputPath = process.argv[2]

if (inputPath === undefined) {
  console.error('用法：node study-tools/inspect-tool-visibility.mjs <snapshot.json>')
  process.exitCode = 2
} else {
  try {
    const snapshot = JSON.parse(await readFile(inputPath, 'utf8'))
    console.log(JSON.stringify(inspectSnapshot(snapshot), null, 2))
  } catch (error) {
    console.error(`读取或检查快照失败：${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}

function inspectSnapshot(snapshot) {
  if (!isRecord(snapshot)) throw new Error('快照根对象必须是 JSON 对象')

  const registered = arrayOfRecords(snapshot.registered, 'registered')
  const visible = arrayOfRecords(snapshot.visible, 'visible')
  const execution = arrayOfRecords(snapshot.execution, 'execution')
  const registeredNames = namesFrom(registered, 'registered')
  const visibleNames = namesFrom(visible, 'visible')
  const executionNames = namesFrom(execution, 'execution')
  const registeredSet = new Set(registeredNames)
  const visibleSet = new Set(visibleNames)
  const schemaBytes = visible.reduce((total, tool) => {
    if (!('schema' in tool)) return total
    return total + Buffer.byteLength(JSON.stringify(tool.schema), 'utf8')
  }, 0)
  const decisions = {
    allowed: execution.filter(item => item.allowed === true).length,
    denied: execution.filter(item => item.allowed === false).length,
    unknown: execution.filter(item => item.allowed !== true && item.allowed !== false).length,
  }

  return {
    profile: stringOr(snapshot.profile, '未声明'),
    agent: stringOr(snapshot.agent, '未声明'),
    counts: {
      registered: registered.length,
      visible: visible.length,
      executionDecisions: execution.length,
    },
    registeredButNotVisible: [...registeredSet].filter(name => !visibleSet.has(name)).sort(),
    visibleButNotRegistered: [...visibleSet].filter(name => !registeredSet.has(name)).sort(),
    duplicateNames: {
      registered: duplicateNames(registeredNames),
      visible: duplicateNames(visibleNames),
      execution: duplicateNames(executionNames),
    },
    schemaCostHeuristic: {
      visibleSchemaUtf8Bytes: schemaBytes,
      roughTokensBytesDiv4: Math.ceil(schemaBytes / 4),
      warning: '仅按 UTF-8 字节数除以 4 粗略估计，不是 provider tokenizer 的 token 数，也未包含完整请求开销。',
    },
    execution: decisions,
    limitations: [
      '本工具只读取离线 JSON，不启动 DSH、不连接模型，也不修改注册表。',
      '快照只能说明导出时的集合和决策，不能证明真实模型看见了什么或工具身体成功运行。',
      '请勿把完整 prompt、用户内容、参数值、凭据或敏感绝对路径放入快照。',
    ],
  }
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function arrayOfRecords(value, field) {
  if (!Array.isArray(value)) throw new Error(`${field} 必须是数组`)
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`${field}[${index}] 必须是对象`)
    return item
  })
}

function namesFrom(items, field) {
  return items.map((item, index) => {
    if (typeof item.name !== 'string' || item.name.length === 0) {
      throw new Error(`${field}[${index}].name 必须是非空字符串`)
    }
    return item.name
  })
}

function duplicateNames(names) {
  const seen = new Set()
  const duplicates = new Set()
  for (const name of names) {
    if (seen.has(name)) duplicates.add(name)
    seen.add(name)
  }
  return [...duplicates].sort()
}

function stringOr(value, fallback) {
  return typeof value === 'string' && value.length > 0 ? value : fallback
}
