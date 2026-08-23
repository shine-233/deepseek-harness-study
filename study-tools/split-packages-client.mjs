#!/usr/bin/env node

/**
 * 把 study/文件索引/packages-client.md 按体量拆成多个分页。
 *
 * 背景：packages/client 覆盖 923 个源文件，单体 Markdown 约 3.4MB，
 * 渲染成单页后加载与滚动成本都过高。本脚本把它切成若干个不超过
 * SIZE_BUDGET 的分页（packages-client-01.md 起），原文件改写为总览
 * 目录页。条目正文逐字保留，不增删句子。
 *
 * 用法：node study-tools/split-packages-client.mjs
 * 幂等性：总览已带拆分标记时拒绝重复执行；重新生成单体后需重跑本脚本。
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repositoryRoot = resolve(import.meta.dirname, '..')
const clientPage = resolve(repositoryRoot, 'study/文件索引/packages-client.md')
const SIZE_BUDGET = 400 * 1024
const MARKER = '<!-- split-overview:study-tools/split-packages-client.mjs -->'

const raw = readFileSync(clientPage, 'utf8')
if (raw.includes(MARKER)) {
  console.error('split-packages-client: packages-client.md 已是总览页，先重新生成单体再运行本脚本。')
  process.exitCode = 1
  process.exit()
}

const lines = raw.split(/\r?\n/)
if (lines.at(-1) === '') lines.pop()

const sectionStarts = []
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('## ') && lines[i] !== '## 图例') sectionStarts.push(i)
}
if (sectionStarts.length < 3) {
  console.error(`split-packages-client: 只找到 ${sectionStarts.length} 个分组标题，结构与预期不符。`)
  process.exitCode = 1
  process.exit()
}

const headerLines = lines.slice(0, sectionStarts[0])
const sections = sectionStarts.map((start, index) => {
  const end = index + 1 < sectionStarts.length ? sectionStarts[index + 1] : lines.length
  return { title: lines[start].slice(3).trim(), lines: lines.slice(start, end) }
})

function countEntries(sectionLines) {
  return sectionLines.filter(line => line.startsWith('### [')).length
}

const totalEntries = sections.reduce((sum, s) => sum + countEntries(s.lines), 0)
const headerEntries = (raw.match(/^### \[/gm) ?? []).length
if (totalEntries !== headerEntries) {
  console.error(`split-packages-client: 条目数对不上（分组求和 ${totalEntries} ≠ 全文 ${headerEntries}）。`)
  process.exitCode = 1
  process.exit()
}

const parts = []
for (const section of sections) {
  const last = parts.at(-1)
  const size = Buffer.byteLength(section.lines.join('\n'), 'utf8')
  if (last && last.bytes + size <= SIZE_BUDGET) {
    last.sections.push(section)
    last.bytes += size
    last.entries += countEntries(section.lines)
  } else {
    parts.push({ sections: [section], bytes: size, entries: countEntries(section.lines) })
  }
}

const legendLines = []
{
  const legendStart = headerLines.indexOf('## 图例')
  if (legendStart !== -1) legendLines.push(...headerLines.slice(legendStart))
}

const commitLine = headerLines.find(line => line.includes('generate-source-index.mjs')) ?? ''
const fixedCommit = 'aa6c361a972c8369148dea7380bb5c21c24e07ec'

function toPageText(lines) {
  while (lines.length > 0 && lines.at(-1) === '') lines.pop()
  return `${lines.join('\n')}\n`
}

const written = []
parts.forEach((part, index) => {
  const number = String(index + 1).padStart(2, '0')
  const name = `packages-client-${number}.md`
  const groupSummary = part.sections
    .map(s => `${s.title}（${countEntries(s.lines)} 条）`)
    .join('、')
  const head = [
    `# 源文件索引：packages/client（第 ${index + 1}/${parts.length} 部分）`,
    '',
    commitLine,
    '',
    `本页是 [packages-client.md](./packages-client.md) 总览的第 ${index + 1} 部分，覆盖：${groupSummary}。`,
    '',
  ]
  const body = [...head, ...legendLines, '', ...part.sections.flatMap(s => s.lines)]
  writeFileSync(resolve(repositoryRoot, 'study/文件索引', name), toPageText(body), 'utf8')
  written.push({ name, entries: part.entries, groups: part.sections.map(s => s.title) })
})

const directoryRows = [
  '| 分页 | 覆盖组 | 条目 |',
  '| --- | --- | --- |',
  ...written.map(part =>
    `| [${part.name.replace('.md', '')}](./${part.name}) | ${part.groups.join('、')} | ${part.entries} |`,
  ),
  `| 合计 | ${sections.length} 组 | ${totalEntries} |`,
]

const overviewIntroIndex = headerLines.findIndex(line => line.startsWith('本页由'))
const overviewGroupingIndex = headerLines.findIndex(line => line.startsWith('条目按所属包分组'))
const overviewHead = overviewGroupingIndex !== -1
  ? [
      ...headerLines.slice(0, overviewIntroIndex),
      `${commitLine.replace('每个标题对应一个真实路径', `全部条目分布在下方 ${parts.length} 个分页里，每个标题对应一个真实路径`)}`,
      ...headerLines.slice(overviewIntroIndex + 2, overviewGroupingIndex),
      MARKER,
      '',
      '## 分页目录',
      '',
      ...directoryRows,
    ]
  : null
if (!overviewHead || !commitLine.includes(fixedCommit)) {
  console.error('split-packages-client: 头部结构与预期不符，未写入总览。')
  process.exitCode = 1
  process.exit()
}

writeFileSync(clientPage, toPageText([...overviewHead]), 'utf8')

console.log(`split-packages-client: 923 条拆为 ${parts.length} 页，合计条目 ${written.reduce((s, p) => s + p.entries, 0)}。`)
for (const part of written) console.log(`  ${part.name}: ${part.entries} 条`)
