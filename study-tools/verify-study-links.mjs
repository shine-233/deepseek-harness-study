#!/usr/bin/env node

/**
 * 检查手写学习材料中的官方源文件路径，避免教程把读者送到固定提交中不存在的文件。
 * 逐文件索引的链接由 verify-source-index.mjs 检查；这里补充 README 和 study/*.md。
 */

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const manifestPath = join(root, 'study', 'source-index-manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const commit = manifest.commit
const tree = execFileSync('git', ['ls-tree', '-r', '--name-only', commit], {
  cwd: root,
  encoding: 'utf8',
})
  .split(/\r?\n/)
  .map(value => value.trim())
  .filter(Boolean)
const treeSet = new Set(tree)
const sourcePrefixes = ['.agents/', '.github/', 'apps/', 'examples/', 'native/', 'packages/', 'python/', 'scripts/', 'vendor/', 'website/']
const sourceLikePattern = /(?:^|\/)[^/]+\.(?:ts|tsx|js|jsx|mjs|cjs|vue|svelte|py|c|cc|cpp|h|hh|hpp|rs|go|java|kt|kts|sh|bash|ps1|bat|cmd|sql|html|css|scss|md)$/i
const manualFiles = [
  'README.md',
  'README.zh.md',
  'UPSTREAM.md',
  ...readdirSync(join(root, 'study'))
    .filter(file => file.endsWith('.md'))
    .map(file => join('study', file)),
]
const errors = []
const seen = new Set()

function isPlaceholder(path) {
  return /<[^>]+>|\.\.\.|[\s*{}]/.test(path)
}

function pathExists(path, kind = 'blob') {
  if (kind === 'tree') return treeSet.has(path) || tree.some(file => file.startsWith(`${path}/`))
  return treeSet.has(path)
}

function check(path, file, source) {
  const normalized = path.replace(/[.,;:，。；：）)]+$/u, '').replace(/\/+$/u, '')
  if (isPlaceholder(normalized) || seen.has(`${file}:${normalized}`)) return
  seen.add(`${file}:${normalized}`)
  if (!pathExists(normalized, 'blob') && !pathExists(normalized, 'tree')) {
    errors.push(`${file}: 固定提交中不存在路径 ${normalized}（${source}）`)
  }
}

for (const file of manualFiles) {
  if (!existsSync(join(root, file))) continue
  const text = readFileSync(join(root, file), 'utf8')
  for (const match of text.matchAll(/`([^`\r\n]+)`/g)) {
    const value = match[1]
    const isExplicitSourcePath = sourcePrefixes.some(prefix => value.startsWith(prefix))
    const isAmbiguousSourcePath = value.includes('/') && sourceLikePattern.test(value) && !value.startsWith('src/')
    if (isExplicitSourcePath || isAmbiguousSourcePath) check(value, file, '行内代码路径')
  }
  const linkPattern = new RegExp(
    `https://github\\.com/deepseek-ai/deepseek-harness/(blob|tree)/${commit}/([^)#?\\s]+)`,
    'g',
  )
  for (const match of text.matchAll(linkPattern)) {
    const path = decodeURIComponent(match[2])
    if (!pathExists(path, match[1])) errors.push(`${file}: 固定提交链接指向不存在路径 ${path}（官方 ${match[1]} 链接）`)
  }
}

console.log(`固定提交：${commit}`)
console.log(`手写材料：${manualFiles.length}`)
console.log(`路径错误：${errors.length}`)
for (const error of errors) console.log(`错误：${error}`)
if (errors.length > 0) process.exit(1)
