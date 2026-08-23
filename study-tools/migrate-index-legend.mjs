#!/usr/bin/env node

/**
 * 一次性迁移：把逐文件索引页里每个条目重复的免责句提升为页首「图例」小节。
 *
 * 与 generate-source-index.mjs 的新输出等价：从每个条目删除四类逐条重复的
 * 免责句，并在生成声明行之后插入同一份图例。只处理包含生成声明的页面，
 * 跳过人工维护的 README.md；重复运行结果一致。不需要 --source-root。
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolveRepoRoot()
const indexDir = join(root, 'study', '文件索引')

const SENTENCE_AUTO_INDEX = '自动索引只提供定位线索，复杂行为需要回到源码和测试确认。'
const SENTENCE_DESIGN_EVIDENCE = '这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。'
const SENTENCE_CODE_EVIDENCE = ' 这些数字和声明用于定位，不替代源码阅读。'
const SENTENCE_FIXED_VERSION = '；如果当前条目与运行版本不同，应先重新生成索引再下结论。'

const LEGEND_LINES = [
  '## 图例',
  '',
  '本页所有条目共用以下说明：',
  '',
  `- ${SENTENCE_AUTO_INDEX}`,
  '- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。',
  '- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。',
]

const DECLARATION_PATTERN = /^本页由 .*?生成[，,]\s*共\s*\d+ 个代码或界面源文件。/

function resolveRepoRoot() {
  return join(fileURLToPath(new URL('.', import.meta.url)), '..')
}

function migratePage(name) {
  const full = join(indexDir, name)
  const original = readFileSync(full, 'utf8')
  const lines = original.replace(/\r?\n$/, '').split('\n')
  const declaredIndex = lines.findIndex(line => DECLARATION_PATTERN.test(line))
  if (declaredIndex === -1) return { changed: false }

  const counts = {
    阅读顺序免责句: 0,
    文件级设计证据免责句: 0,
    代码证据免责句: 0,
    固定版本免责句: 0,
  }
  const migrated = []
  const needLegend = !original.includes('\n## 图例\n')
  let insertAt = declaredIndex + 1
  if (lines[insertAt] !== undefined && lines[insertAt].trim() === '') insertAt += 1
  let inserted = false
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (needLegend && index === insertAt) {
      migrated.push(...LEGEND_LINES)
      migrated.push('')
      inserted = true
    }
    migrated.push(line)
    if (/^- 阅读顺序：/.test(line)) {
      if (line.includes(`；${SENTENCE_AUTO_INDEX}`)) {
        counts.阅读顺序免责句 += 1
        migrated[migrated.length - 1] = migrated.at(-1).replace(`；${SENTENCE_AUTO_INDEX}`, '。')
      } else if (line.includes(SENTENCE_AUTO_INDEX)) {
        counts.阅读顺序免责句 += 1
        migrated[migrated.length - 1] = migrated.at(-1).replaceAll(SENTENCE_AUTO_INDEX, '')
      }
      continue
    }
    if (/^- 文件级设计证据：/.test(line) && line.includes(SENTENCE_DESIGN_EVIDENCE)) {
      counts.文件级设计证据免责句 += 1
      migrated[migrated.length - 1] = migrated.at(-1).replaceAll(SENTENCE_DESIGN_EVIDENCE, '')
      continue
    }
    if (/^- 代码证据：/.test(line) && line.includes(SENTENCE_CODE_EVIDENCE)) {
      counts.代码证据免责句 += 1
      migrated[migrated.length - 1] = migrated.at(-1).replaceAll(SENTENCE_CODE_EVIDENCE, '')
      continue
    }
    if (/^- 固定版本：/.test(line) && line.includes(SENTENCE_FIXED_VERSION)) {
      counts.固定版本免责句 += 1
      migrated[migrated.length - 1] = migrated.at(-1).replace(SENTENCE_FIXED_VERSION, '。')
    }
  }

  const updated = `${migrated.join('\n')}\n`
  if (!inserted && Object.values(counts).every(count => count === 0)) return { changed: false }
  writeFileSync(full, updated, 'utf8')
  return { changed: true, inserted, ...counts }
}

const names = readdirSync(indexDir)
  .filter(file => file.endsWith('.md') && file !== 'README.md')
  .sort()
let changedPages = 0
let insertedPages = 0
const totals = {}
for (const name of names) {
  const result = migratePage(name)
  if (!result.changed) continue
  changedPages += 1
  if (result.inserted) insertedPages += 1
  for (const [key, count] of Object.entries(result)) {
    if (key === 'changed' || key === 'inserted') continue
    totals[key] = (totals[key] ?? 0) + count
  }
}
console.log(`检查页面：${names.length}`)
console.log(`改动页面：${changedPages}（新插入图例 ${insertedPages} 页）`)
for (const [key, count] of Object.entries(totals).sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`删除 ${key}：${count} 处`)
}
