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
  '- 文件级设计证据：',
  '- 直接协作者：',
  '- 对应测试：',
  '- 测试关联依据：',
  '- 阅读顺序：',
  '- 代码证据：',
  '- 固定版本：',
]

if (!existsSync(indexDir)) errors.push(`索引目录不存在：${indexDir}`)
if (!Array.isArray(manifest.files)) errors.push('清单 files 不是数组')
if (Array.isArray(manifest.files) && manifest.files.length !== expected.size) {
  errors.push(`清单 files 原始长度 ${manifest.files.length} 与去重后长度 ${expected.size} 不同，存在重复路径`)
}
if (manifest.upstreamRepository !== 'https://github.com/deepseek-ai/deepseek-harness') {
  errors.push(`清单 upstreamRepository 不正确：${manifest.upstreamRepository}`)
}

for (const name of readdirSync(indexDir).filter(file => file.endsWith('.md')).sort()) {
  const full = join(indexDir, name)
  const text = readFileSync(full, 'utf8')
  const headingPattern = /^### \[([^\]]+)\]\((https:\/\/github\.com\/deepseek-ai\/deepseek-harness\/blob\/([^/]+)\/([^\)]+))\)$/gm
  const matches = [...text.matchAll(headingPattern)]
  const headingLikeCount = text.split(/\r?\n/).filter(line => line.startsWith('### [')).length
  if (headingLikeCount !== matches.length) errors.push(`${name}: 有 ${headingLikeCount - matches.length} 个无法解析的源文件标题`)
  const declared = text.match(/^本页由 .*?生成[，,]\s*共\s*(\d+) 个代码或界面源文件。$/m)?.[1]
  if (declared !== undefined && Number(declared) !== matches.length) {
    errors.push(`${name}: 页头声明 ${declared} 个源文件，但实际解析 ${matches.length} 个`)
  }
  for (const match of matches) {
    const path = match[1]
    const linkedPath = match[4]
    const commit = match[3]
    if (path !== linkedPath) {
      errors.push(`${name}: 标题路径 ${path} 与固定 URL 路径 ${linkedPath} 不一致`)
    }
    const blockStart = match.index + match[0].length
    const nextHeading = text.indexOf('\n### ', blockStart)
    const block = text.slice(blockStart, nextHeading === -1 ? text.length : nextHeading)
    if (!seen.has(path)) seen.set(path, [])
    seen.get(path).push(name)
    if (commit !== manifest.commit) errors.push(`${name}: ${path} 的链接提交 ${commit} 不等于清单提交 ${manifest.commit}`)
    for (const label of required) {
      if (!block.includes(label)) {
        errors.push(`${name}: ${path} 缺少字段 ${label}`)
        continue
      }
      const value = block.match(new RegExp(`^${label}(.*)$`, 'm'))?.[1]?.trim() ?? ''
      if (!value || value === '：') errors.push(`${name}: ${path} 字段 ${label} 为空`)
    }
    const purpose = block.match(/^- 这个文件有什么用：(.*)$/m)?.[1]?.trim() ?? ''
    const design = block.match(/^- 为什么这样设计：(.*)$/m)?.[1]?.trim() ?? ''
    const role = block.match(/^- 文件角色：(.*)$/m)?.[1]?.trim() ?? ''
    const readingOrder = block.match(/^- 阅读顺序：(.*)$/m)?.[1]?.trim() ?? ''
    if (!/[\u3400-\u9fff]/.test(purpose)) errors.push(`${name}: ${path} 的用途说明没有中文解释`)
    if (!/[\u3400-\u9fff]/.test(design)) errors.push(`${name}: ${path} 的设计说明没有中文解释`)
    if (purpose.includes('这个文件承担所在目录的一项功能')) {
      errors.push(`${name}: ${path} 仍使用旧的空泛用途模板`)
    }
    if (/一个功能实现文件|承担一项相对集中的职责/.test(purpose)) {
      errors.push(`${name}: ${path} 的用途说明仍是“功能实现文件”泛化模板`)
    }
    if (/定义 .* 的配置、输入形状或工具链规则/.test(purpose)) {
      errors.push(`${name}: ${path} 的配置用途说明是循环表述`)
    }
    if (/具体行为仍应结合直接协作者和测试阅读/.test(purpose)) {
      errors.push(`${name}: ${path} 的用途说明没有先给出中文功能摘要`)
    }
    if (/^它负责 .*；(?:文件顶部注释把它定位为|固定提交中扫描到的)/.test(purpose)) {
      errors.push(`${name}: ${path} 的用途说明只是在转述证据，没有给出中文功能摘要`)
    }
    if (/^把“[^”]+”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。$/.test(design)) {
      errors.push(`${name}: ${path} 的设计说明仍使用统一独立边界模板`)
    }
    if (/^先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试/.test(readingOrder)) {
      errors.push(`${name}: ${path} 的阅读顺序仍使用统一路线模板`)
    }
    if (role === '测试用例' && /(?:直接验证|自动化测试直接验证) .*成功、失败或边界行为/.test(purpose)) {
      errors.push(`${name}: ${path} 的测试用途说明是自我重复的模板`)
    }
    if (/[㐀-鿿] +[㐀-鿿]/.test(purpose)) {
      errors.push(`${name}: ${path} 的中文用途存在多余粒子空格`)
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
const sourceExtensions = new Set((manifest.sourceExtensions ?? []).map(value => String(value).toLowerCase()))
const candidates = tree.filter(path => {
  const dot = path.lastIndexOf('.')
  return dot >= 0 && sourceExtensions.has(path.slice(dot).toLowerCase())
})
if (manifest.sourceFileCount !== candidates.length) {
  errors.push(`清单 sourceFileCount ${manifest.sourceFileCount} 不等于按 sourceExtensions 重算的候选数 ${candidates.length}`)
}
const candidateSet = new Set(candidates)
for (const path of candidateSet) if (!expected.has(path)) errors.push(`固定提交候选源文件未进入清单：${path}`)
for (const path of expected) if (!candidateSet.has(path)) errors.push(`清单路径不是 sourceExtensions 候选源文件：${path}`)
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
if (manifest.sourceRootVerification?.status === 'verified') {
  if (manifest.sourceRootVerification.method !== 'git-blob') {
    errors.push(`清单源码校验方法不是 git-blob：${manifest.sourceRootVerification.method}`)
  }
  if (manifest.sourceRootVerification.fileCount !== expected.size) {
    errors.push(`清单源码校验数 ${manifest.sourceRootVerification.fileCount} 不等于源文件数 ${expected.size}`)
  }
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
