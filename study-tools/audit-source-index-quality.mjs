#!/usr/bin/env node

/**
 * 对逐文件中文索引做第二层质量审计。
 *
 * verify-source-index.mjs 负责“有没有条目、链接是否指向固定提交、字段是否存在”。
 * 本脚本进一步检查每个条目的字段是否自洽，并统计“为什么这样设计”是否大量复用同一
 * 个完全相同的句子。同一文件角色复用稳定模板属于统计信息，不直接算质量提示；只有
 * 字段、证据边界或测试关系自相矛盾时才报告错误或提示。它仍然不是人工代码审查：发现
 * 复用只能说明需要抽查，不能单凭统计认定某个设计理由错误。
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const manifest = JSON.parse(readFileSync(join(root, 'study', 'source-index-manifest.json'), 'utf8'))
const indexDir = join(root, 'study', '文件索引')
const expected = new Set(manifest.files)
const entries = []
const errors = []
const warnings = []
const infos = []

const headingPattern = /^### \[([^\]]+)\]\((https:\/\/github\.com\/deepseek-ai\/deepseek-harness\/blob\/([^/]+)\/([^\)]+))\)$/gm
const requiredLabels = [
  '所属层',
  '文件角色',
  '这个文件有什么用',
  '为什么这样设计',
  '文件级设计证据',
  '直接协作者',
  '对应测试',
  '测试关联依据',
  '阅读顺序',
  '代码证据',
  '固定版本',
]

function valueOf(block, label) {
  return block.match(new RegExp(`^- ${label}：(.*)$`, 'm'))?.[1]?.trim() ?? ''
}

function addError(message) {
  errors.push(message)
}

function addWarning(message) {
  warnings.push(message)
}

function addInfo(message) {
  infos.push(message)
}

function isChinese(value) {
  return /[\u3400-\u9fff]/.test(value)
}

function isIndirectTestLine(value) {
  return value.includes('间接测试线索') || value.includes('传递引用')
}

function isNoDirectTestLine(value) {
  return value.includes('没有确认到直接测试') || value.includes('没有发现直接使用')
}

function designFingerprint(value) {
  return value
    .replace(/`[^`]+`/g, '`路径`')
    .replace(/“[^”]+”/g, '“主题”')
    .replace(/\d+/g, 'N')
}

function parseIndexPages() {
  if (!existsSync(indexDir)) {
    addError(`索引目录不存在：${indexDir}`)
    return
  }

  for (const name of readdirSync(indexDir).filter(file => file.endsWith('.md')).sort()) {
    const full = join(indexDir, name)
    const text = readFileSync(full, 'utf8')
    for (const match of text.matchAll(headingPattern)) {
      const path = match[1]
      const commit = match[3]
      const blockStart = match.index + match[0].length
      const nextHeading = text.indexOf('\n### ', blockStart)
      const block = text.slice(blockStart, nextHeading === -1 ? text.length : nextHeading)
      const fields = Object.fromEntries(requiredLabels.map(label => [label, valueOf(block, label)]))
      entries.push({ name, path, commit, block, fields })
    }
  }
}

function auditStructure() {
  const byPath = new Map()
  for (const entry of entries) {
    if (!byPath.has(entry.path)) byPath.set(entry.path, [])
    byPath.get(entry.path).push(entry)
    if (entry.commit !== manifest.commit) {
      addError(`${entry.name}: ${entry.path} 的链接提交 ${entry.commit} 不等于 ${manifest.commit}`)
    }
    for (const label of requiredLabels) {
      if (!entry.fields[label]) addError(`${entry.name}: ${entry.path} 缺少或为空字段“${label}”`)
    }
    if (!isChinese(entry.fields['这个文件有什么用'])) {
      addError(`${entry.name}: ${entry.path} 的用途字段没有中文解释`)
    }
    if (!isChinese(entry.fields['为什么这样设计'])) {
      addError(`${entry.name}: ${entry.path} 的设计字段没有中文解释`)
    }

    const purpose = entry.fields['这个文件有什么用']
    const design = entry.fields['为什么这样设计']
    const designEvidence = entry.fields['文件级设计证据']
    const tests = entry.fields['对应测试']
    const basis = entry.fields['测试关联依据']
    const evidence = entry.fields['代码证据']
    const role = entry.fields['文件角色']

    if (purpose.length < 18) addWarning(`${entry.name}: ${entry.path} 的用途说明过短（${purpose.length} 字）`)
    if (design.length < 24) addWarning(`${entry.name}: ${entry.path} 的设计说明过短（${design.length} 字）`)
    if ((!designEvidence.includes('文件级定位证据') && !designEvidence.includes('证据不可用')) || !designEvidence.includes('不替代人工源码阅读')) {
      addError(`${entry.name}: ${entry.path} 的文件级设计证据缺少静态证据边界提醒`)
    }
    if (designFingerprint(design) === design && /把“[^”]+”作为独立边界/.test(design)) {
      addError(`${entry.name}: ${entry.path} 使用旧的统一独立边界设计模板`)
    }
    if (/^先看所在层的说明，再看包 README 和入口，然后读本文件/.test(entry.fields['阅读顺序'])) {
      addError(`${entry.name}: ${entry.path} 使用旧的统一阅读顺序模板`)
    }
    if (!evidence.includes('不替代源码阅读')) {
      addError(`${entry.name}: ${entry.path} 缺少“代码证据不替代源码阅读”的边界提醒`)
    }

    const isTest = role === '测试用例'
    if (isTest && !tests.includes('本文件本身就是测试用例')) {
      addError(`${entry.name}: ${entry.path} 标为测试用例，但没有把本文件标成自身测试`)
    }
    if (isTest && !basis.includes('本文件本身就是测试用例')) {
      addError(`${entry.name}: ${entry.path} 标为测试用例，但测试依据没有说明“本文件本身就是测试用例”`)
    }
    if (isIndirectTestLine(tests) && !basis.includes('传递引用')) {
      addError(`${entry.name}: ${entry.path} 的测试条目标为间接线索，但依据没有写传递引用`)
    }
    if (basis.includes('传递引用') && !isIndirectTestLine(tests)) {
      addError(`${entry.name}: ${entry.path} 的测试依据写了传递引用，但对应测试行没有标出间接线索`)
    }
    if (isNoDirectTestLine(tests) && /直接导入了这个源文件|直接引用/.test(basis)) {
      addError(`${entry.name}: ${entry.path} 测试行否认直接测试，但依据声称存在直接引用`)
    }
  }

  for (const path of expected) {
    const matches = byPath.get(path) ?? []
    if (matches.length === 0) addError(`清单中的源文件没有索引条目：${path}`)
    if (matches.length > 1) addError(`源文件重复出现在多个条目：${path} -> ${matches.map(item => item.name).join(', ')}`)
  }
  for (const [path, matches] of byPath) {
    if (!expected.has(path)) addError(`索引出现清单外路径：${path} -> ${matches.map(item => item.name).join(', ')}`)
  }
  if (entries.length !== expected.size) {
    addError(`解析出的标题数 ${entries.length} 不等于清单源文件数 ${expected.size}`)
  }
}

function auditQualityStats() {
  const designCounts = new Map()
  const exactDesigns = new Set()
  const roleStats = new Map()
  const extensionStats = new Map()
  for (const entry of entries) {
    const design = entry.fields['为什么这样设计']
    const role = entry.fields['文件角色'] || '未标注'
    const extension = entry.path.includes('.') ? entry.path.slice(entry.path.lastIndexOf('.')).toLowerCase() : '(无扩展名)'
    const fingerprint = designFingerprint(design)
    exactDesigns.add(design)
    designCounts.set(fingerprint, (designCounts.get(fingerprint) ?? 0) + 1)
    if (!roleStats.has(role)) roleStats.set(role, { total: 0, designs: new Map(), short: 0 })
    const roleValue = roleStats.get(role)
    roleValue.total += 1
    roleValue.designs.set(fingerprint, (roleValue.designs.get(fingerprint) ?? 0) + 1)
    if (design.length < 24) roleValue.short += 1
    if (!extensionStats.has(extension)) extensionStats.set(extension, 0)
    extensionStats.set(extension, extensionStats.get(extension) + 1)
  }

  const repeated = [...designCounts.entries()]
    .filter(([, count]) => count >= 10)
    .sort((a, b) => b[1] - a[1])
  for (const [fingerprint, count] of repeated.slice(0, 20)) {
    const sample = entries.find(entry => designFingerprint(entry.fields['为什么这样设计']) === fingerprint)
    addInfo(`设计理由复用统计 ${count} 次；样例 ${sample?.path ?? '未知'}：${fingerprint}`)
  }

  const roleRows = [...roleStats.entries()]
    .map(([role, stats]) => {
      const largest = Math.max(0, ...stats.designs.values())
      return { role, total: stats.total, unique: stats.designs.size, largest, short: stats.short }
    })
    .sort((a, b) => b.total - a.total)
  for (const row of roleRows) {
    const ratio = row.total > 0 ? row.largest / row.total : 0
    if (row.total >= 12 && ratio >= 0.85) {
      addInfo(`角色“${row.role}”中最大设计理由模板占 ${row.largest}/${row.total}（${Math.round(ratio * 100)}%）；需要人工抽查是否仍有文件级证据`)
    }
  }

  console.log(`解析标题：${entries.length}`)
  console.log(`清单路径：${expected.size}`)
  console.log(`文件级设计证据：${entries.filter(entry => entry.fields['文件级设计证据']).length}/${entries.length}`)
  console.log(`设计理由实际句子唯一数：${exactDesigns.size}`)
  console.log(`设计理由唯一指纹：${designCounts.size}`)
  console.log(`角色数量：${roleStats.size}`)
  console.log(`扩展名数量：${extensionStats.size}`)
  console.log(`角色统计（前 20）：${roleRows.slice(0, 20).map(row => `${row.role}=${row.total}条/${row.unique}种设计`).join('；')}`)
  console.log(`扩展名统计：${[...extensionStats.entries()].sort((a, b) => b[1] - a[1]).map(([extension, count]) => `${extension}=${count}`).join('；')}`)
}

parseIndexPages()
auditStructure()
auditQualityStats()

console.log(`质量审计错误：${errors.length}`)
console.log(`质量审计提示：${warnings.length}`)
console.log(`质量审计统计：${infos.length}`)
for (const message of errors) console.log(`错误：${message}`)
for (const message of warnings.slice(0, 80)) console.log(`提示：${message}`)
if (warnings.length > 80) console.log(`提示：其余 ${warnings.length - 80} 条省略`)
for (const message of infos.slice(0, 80)) console.log(`统计：${message}`)
if (infos.length > 80) console.log(`统计：其余 ${infos.length - 80} 条省略`)
if (errors.length > 0) process.exit(1)
