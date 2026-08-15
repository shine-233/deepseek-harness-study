#!/usr/bin/env node

/**
 * 检查逐文件索引是否真的覆盖了固定提交中的每个代码或界面源文件。
 * 这是路径和结构检查，不把它当成语义审查；语义审查仍需要读源码和测试。
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const manifestPath = join(root, 'study', 'source-index-manifest.json')
const indexDir = join(root, 'study', '文件索引')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const expected = new Set(manifest.files)
const seen = new Map()
const errors = []
const warnings = []
const required = [
  '- 所属层：',
  '- 文件角色：',
  '- 这个文件有什么用：',
  '- 为什么这样设计：',
  '- 直接协作者：',
  '- 对应测试：',
  '- 测试关联依据：',
  '- 阅读顺序：',
  '- 代码证据：',
  '- 固定版本：',
]

if (!existsSync(indexDir)) errors.push(`索引目录不存在：${indexDir}`)

for (const name of readdirSync(indexDir).filter(file => file.endsWith('.md')).sort()) {
  const full = join(indexDir, name)
  const text = readFileSync(full, 'utf8')
  const headingPattern = /^### \[([^\]]+)\]\((https:\/\/github\.com\/deepseek-ai\/deepseek-harness\/blob\/([^/]+)\/([^\)]+))\)$/gm
  const matches = [...text.matchAll(headingPattern)]
  for (const match of matches) {
    const path = match[1]
    const commit = match[3]
    const blockStart = match.index + match[0].length
    const nextHeading = text.indexOf('\n### ', blockStart)
    const block = text.slice(blockStart, nextHeading === -1 ? text.length : nextHeading)
    if (!seen.has(path)) seen.set(path, [])
    seen.get(path).push(name)
    if (commit !== manifest.commit) errors.push(`${name}: ${path} 的链接提交 ${commit} 不等于清单提交 ${manifest.commit}`)
    for (const label of required) {
      if (!block.includes(label)) errors.push(`${name}: ${path} 缺少字段 ${label}`)
    }
    if (block.includes('自动索引') && !block.includes('复杂行为需要回到源码和测试确认')) {
      warnings.push(`${name}: ${path} 没有明显的自动索引边界提醒`)
    }
  }
}

for (const path of expected) {
  const pages = seen.get(path) ?? []
  if (pages.length === 0) errors.push(`清单中的源文件没有索引条目：${path}`)
  if (pages.length > 1) errors.push(`源文件重复出现在多个索引页：${path} -> ${pages.join(', ')}`)
}
for (const [path, pages] of seen) {
  if (!expected.has(path)) errors.push(`索引出现了不在固定提交清单中的路径：${path} -> ${pages.join(', ')}`)
}

const tree = execFileSync('git', ['ls-tree', '-r', '--name-only', manifest.commit], { cwd: root, encoding: 'utf8' })
  .split(/\r?\n/)
  .map(value => value.trim().replace(/^\/+/, ''))
  .filter(Boolean)
const treeSet = new Set(tree)
for (const path of expected) if (!treeSet.has(path)) errors.push(`清单路径不在 Git tree 中：${path}`)

for (const name of readdirSync(indexDir).filter(file => file.endsWith('.md')).sort()) {
  const text = readFileSync(join(indexDir, name), 'utf8')
  const linkPattern = /\]\(https:\/\/github\.com\/deepseek-ai\/deepseek-harness\/blob\/([^/]+)\/([^\)]+)\)/g
  for (const match of text.matchAll(linkPattern)) {
    const commit = match[1]
    const path = match[2]
    if (commit !== manifest.commit) errors.push(`${name}: 链接 ${path} 的提交 ${commit} 不等于清单提交 ${manifest.commit}`)
    if (!treeSet.has(path)) errors.push(`${name}: 链接指向的路径不在固定提交 Git tree 中：${path}`)
  }
}
if (manifest.sourceReadFileCount !== undefined && manifest.sourceReadFileCount !== expected.size) {
  errors.push(`清单源码读取数 ${manifest.sourceReadFileCount} 不等于源文件数 ${expected.size}`)
}
if (manifest.staticImportEdgeCount !== undefined && manifest.staticImportEdgeCount < 0) {
  errors.push(`清单本地静态 import 边数非法：${manifest.staticImportEdgeCount}`)
}

console.log(`固定提交：${manifest.commit}`)
console.log(`清单源文件：${expected.size}`)
console.log(`索引条目：${seen.size}`)
console.log(`结构错误：${errors.length}`)
console.log(`提示：${warnings.length}`)
for (const message of errors) console.log(`错误：${message}`)
for (const message of warnings.slice(0, 20)) console.log(`提示：${message}`)
if (warnings.length > 20) console.log(`提示：其余 ${warnings.length - 20} 条省略`)
if (errors.length > 0) process.exit(1)
