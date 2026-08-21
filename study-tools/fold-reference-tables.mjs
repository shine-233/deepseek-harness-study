#!/usr/bin/env node

/**
 * 把课程里的长参考表格包进 `<details>`，并报告哪些没有包。
 *
 * 折叠的对象只有一类：读者查而不读的长表格——术语对照、目录清单、命令参考、
 * 对比矩阵。它们撑长了页面，却很少被顺序读完。
 *
 * 不折叠图表的文字替代表格。那些表格是无脚本和屏幕阅读器场景下唯一能读到证据的
 * 地方，折起来会把「直接可读」变成「需要先交互」。判据是表格前文出现「文字替代」
 * 「完整表格」「逐行给出」这类说明。
 *
 * 用 `<details>` 而不是脚本折叠：它是原生元素，关掉 JS 仍然能展开，浏览器的页内
 * 查找也能穿透进折叠内容。
 *
 * 阈值 12 行含表头和分隔行，也就是 10 行数据。
 *
 * 用法：
 *   node study-tools/fold-reference-tables.mjs --check   # 只报告，不改文件
 *   node study-tools/fold-reference-tables.mjs --apply   # 就地包裹
 *
 * 退出码：--check 下有未包裹的候选为 1，否则 0；--apply 始终 0。
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
/*
 * 阈值来自表格长度分布：课程里 84 张表有 56 张不足 8 行，长表是少数。
 * 10 行数据约 400px 高，正是表格开始把上下文推出视口的点——再低会折掉本来一眼
 * 能看完的短表，再高就只剩 6 张，不值得为它加一层交互。
 */
const MIN_ROWS = 12
const FALLBACK_HINTS = ['文字替代', 'fallback', '同一份数据', '完整表格', '逐行给出', '不依赖看图']

const mode = process.argv.includes('--apply') ? 'apply' : 'check'

function studyFiles() {
  const directory = join(root, 'study')
  if (!existsSync(directory)) return []
  return readdirSync(directory).sort().filter(name => name.endsWith('.md')).map(name => join('study', name))
}

/** 表格前最近的小标题，用来给 summary 一个说得出口的名字。 */
function nearestHeading(before) {
  const headings = [...before.matchAll(/^#{2,4} (.+)$/gm)]
  return headings.length === 0 ? null : headings[headings.length - 1][1].trim()
}

/**
 * 找出一个文件里所有够长的表格。
 *
 * @returns 每项含起止偏移、行数、是否已在 details 内、是否是证据 fallback。
 */
function findTables(text) {
  const found = []
  for (const match of text.matchAll(/(?:^\|.*\|[ \t]*$\n?)+/gm)) {
    const block = match[0].replace(/\n$/, '')
    const rows = block.split('\n').length
    if (rows < MIN_ROWS) continue
    const before = text.slice(Math.max(0, match.index - 400), match.index)
    found.push({
      start: match.index,
      end: match.index + match[0].length,
      rows,
      heading: nearestHeading(before),
      isFallback: FALLBACK_HINTS.some(hint => before.includes(hint)),
      alreadyFolded: /<details[^>]*>\s*(?:<summary>[^<]*<\/summary>)?\s*$/.test(before.trimEnd() + '\n'),
    })
  }
  return found
}

function summaryFor(table) {
  const name = table.heading === null ? '这张表' : table.heading
  return '展开' + name + '（' + String(table.rows - 2) + ' 行）'
}

let pending = 0
let folded = 0
const report = []

for (const file of studyFiles()) {
  const path = join(root, file)
  let text = readFileSync(path, 'utf8')
  const tables = findTables(text)
  const targets = tables.filter(table => !table.isFallback && !table.alreadyFolded)
  const skipped = tables.filter(table => table.isFallback)

  if (targets.length === 0 && skipped.length === 0) continue
  report.push({ file, targets: targets.length, skipped: skipped.length, rows: targets.map(t => t.rows) })
  pending += targets.length

  if (mode !== 'apply' || targets.length === 0) continue

  // Rewrite from the end so earlier offsets stay valid.
  for (const table of [...targets].reverse()) {
    const block = text.slice(table.start, table.end).replace(/\n+$/, '')
    const wrapped = '<details class="reference-table">\n<summary>' + summaryFor(table) + '</summary>\n\n'
      + block + '\n\n</details>\n'
    text = text.slice(0, table.start) + wrapped + text.slice(table.end)
    folded += 1
  }
  writeFileSync(path, text, 'utf8')
}

console.log('长参考表格折叠' + (mode === 'apply' ? '（已写入）' : '（仅报告）'))
console.log('阈值：至少 ' + String(MIN_ROWS) + ' 行（含表头和分隔行）')
console.log('')
for (const entry of report) {
  console.log('  ' + entry.file)
  console.log('      待包裹 ' + String(entry.targets) + ' 个'
    + (entry.skipped > 0 ? '，跳过 ' + String(entry.skipped) + ' 个证据 fallback' : '')
    + (entry.rows.length > 0 ? '，行数 ' + entry.rows.join('/') : ''))
}
console.log('')
if (mode === 'apply') {
  console.log('已包裹：' + String(folded) + ' 个')
} else {
  console.log('未包裹的候选：' + String(pending) + ' 个')
  if (pending > 0) {
    console.log('运行 node study-tools/fold-reference-tables.mjs --apply 就地包裹。')
    process.exit(1)
  }
}
