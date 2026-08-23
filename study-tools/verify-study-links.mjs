#!/usr/bin/env node

/**
 * 检查手写学习材料中的官方源文件路径，避免教程把读者送到固定提交中不存在的文件。
 * 逐文件索引的链接由 verify-source-index.mjs 检查；这里补充 README、START-HERE 和 study/*.md。
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
// These are produced by this study repository, not paths in the fixed DSH
// commit. Keep them explicit so the verifier still catches a typo in every
// other official-looking `website/...` path.
const localStudyPathPrefixes = ['study', 'study-tools', 'study-examples', 'website/public/reading.css', 'website/.dist']
const sourceLikePattern = /(?:^|\/)[^/]+\.(?:ts|tsx|js|jsx|mjs|cjs|vue|svelte|py|c|cc|cpp|h|hh|hpp|rs|go|java|kt|kts|sh|bash|ps1|bat|cmd|sql|html|css|scss|md)$/i
const manualFiles = [
  'START-HERE.md',
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

function isLocalStudyPath(path) {
  return localStudyPathPrefixes.some(prefix => path === prefix || path.startsWith(`${prefix}/`))
}

function pathExists(path, kind = 'blob') {
  if (kind === 'tree') return treeSet.has(path) || tree.some(file => file.startsWith(`${path}/`))
  return treeSet.has(path)
}

/**
 * VitePress 会把标题文本转成 slug（空格变连字符、去掉标点、小写化），而
 * fallback-href 里两种写法都出现过。比较时只保留字母、数字和汉字，两边
 * 都忽略空白、连字符和标点，兼容 `#先记住一张图` 与 `#surface-和历史不是一回事`。
 */
function anchorKey(value) {
  let decoded = value
  try {
    decoded = decodeURIComponent(value)
  } catch {
    // 解析不了的编码保留原值比较；它只会导致锚点未命中，不会误报通过。
  }
  return decoded.replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase()
}

function collectHeadingsAndFallbacks(text) {
  const headings = new Set()
  const fallbackHrefs = []
  const strippedLines = []
  let inFence = false
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(?:```|~~~)/.test(line)) inFence = !inFence
    if (!inFence) strippedLines.push(line)
    const heading = !inFence && /^#{1,6}\s+(.+?)\s*#*\s*$/.exec(line)
    if (heading) headings.add(anchorKey(heading[1]))
  }
  const widgetPattern = /<LessonWidget\b([^>]*)>/g
  for (const match of strippedLines.join('\n').matchAll(widgetPattern)) {
    const href = /fallback-href\s*=\s*(?:"([^"]*)"|'([^']*)')/.exec(match[1])
    if (href) fallbackHrefs.push(href[1] ?? href[2])
  }
  return { headings, fallbackHrefs }
}

function check(path, file, source) {
  const normalized = path.replace(/[.,;:，。；：）)]+$/u, '').replace(/\/+$/u, '')
  if (isPlaceholder(normalized) || isLocalStudyPath(normalized) || seen.has(`${file}:${normalized}`)) return
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
  const { headings, fallbackHrefs } = collectHeadingsAndFallbacks(text)
  for (const raw of fallbackHrefs) {
    if (!raw.startsWith('#')) {
      errors.push(`${file}: LessonWidget fallback-href 只支持同页锚点，得到 ${raw}`)
      continue
    }
    if (!headings.has(anchorKey(raw.slice(1)))) {
      errors.push(`${file}: LessonWidget fallback-href 锚点没有命中本页标题：${raw}`)
    }
  }
}

console.log(`固定提交：${commit}`)
console.log(`手写材料：${manualFiles.length}`)
console.log(`路径错误：${errors.length}`)
for (const error of errors) console.log(`错误：${error}`)
if (errors.length > 0) process.exit(1)
