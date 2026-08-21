#!/usr/bin/env node

/**
 * 报告课程散文里可机械检测的 AI 味特征密度。
 *
 * 这是特征密度报告，不是文风评分：它只统计能确定判定的模式，不判断句子好坏。
 * 权重按“经验层 ≥ 结构层 > 句式层 > 词汇层”排序——经验层（可替换的具体、
 * 两头堵的判断、作者不在场）无法由脚本判定，只能靠人读，所以本工具只覆盖后三层，
 * 通过不代表稿子有人味。
 *
 * 扫描前先屏蔽代码块、行内代码、链接目标、front matter 和表格分隔行；否则源码
 * 路径和标识符会被当成散文特征。密度按汉字数计算，不按行数。
 *
 * 用法：
 *   node study-tools/audit-ai-flavor.mjs             # 报告全部课程散文
 *   node study-tools/audit-ai-flavor.mjs --top 12    # 只看最密集的 12 个文件
 *   node study-tools/audit-ai-flavor.mjs <file>...   # 只看指定文件
 *
 * 退出码始终为 0：本工具报告线索，由人决定哪些要改。
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()

/** 把非散文片段换成等长空白，保持行号和偏移不变。 */
function maskNonProse(text) {
  const blank = match => ' '.repeat(match.length)
  return text
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, blank)
    .replace(/```[\s\S]*?```/g, blank)
    .replace(/^ {4,}\S[^\n]*/gm, blank)
    .replace(/`[^`\n]*`/g, blank)
    .replace(/<[^>\n]{1,200}>/g, blank)
    .replace(/\]\([^)\n]*\)/g, blank)
    .replace(/https?:\/\/\S+/g, blank)
    .replace(/^\s*\|[\s|:-]+\|\s*$/gm, blank)
}

function hanCount(text) {
  return (text.match(/[\u4e00-\u9fff]/g) ?? []).length
}

/**
 * 结构层：句长变异系数。
 * 变异系数低说明句子长度均匀，也就是清单里的“匀速感”。
 */
function sentenceLengthCv(text) {
  const lengths = text
    .split(/[。！？；\n]/)
    .map(sentence => hanCount(sentence))
    .filter(length => length >= 4)
  if (lengths.length < 8) return null
  const mean = lengths.reduce((sum, value) => sum + value, 0) / lengths.length
  if (mean === 0) return null
  const variance = lengths.reduce((sum, value) => sum + (value - mean) ** 2, 0) / lengths.length
  return { cv: Math.sqrt(variance) / mean, sentences: lengths.length, meanHan: mean }
}

/** 结构层：小节末尾的短句，也就是“金句锤”。 */
function sectionEndPunchlines(text) {
  const lines = text.split(/\r?\n/)
  const hits = []
  for (const [index, line] of lines.entries()) {
    if (!/^#{2,4}\s/.test(line)) continue
    for (let back = index - 1; back >= 0 && back >= index - 3; back -= 1) {
      const candidate = lines[back].trim()
      if (candidate === '') continue
      if (/^[#>|\-*\d]/.test(candidate)) break
      const han = hanCount(candidate)
      if (han > 0 && han <= 18) hits.push({ line: back + 1, text: candidate })
      break
    }
  }
  return hits
}

const PATTERNS = [
  // 句式层
  { id: 'negation-parallel', layer: '句式', label: '否定排比（不是X，是/而是Y）', weight: 3,
    regex: /(?:这)?不是[^。！？\n]{1,40}?[，,]\s*(?:而?是|就是)[^。！？\n]{1,40}/g },
  { id: 'copula-avoidance', layer: '句式', label: '系动词回避（充当着/扮演着/标志着/彰显了）', weight: 2,
    regex: /(充当着|扮演着|标志着|彰显了|发挥着[^。\n]{0,8}作用)/g },
  { id: 'dangling-analysis', layer: '句式', label: '句尾浮浅分析（体现了/凸显了/推动了）', weight: 2,
    regex: /[，,][^。！？\n]{0,30}(体现了|凸显了|推动了|反映了|折射出)[^。！？\n]{0,20}[。]/g },
  { id: 'em-dash', layer: '句式', label: '破折号', weight: 1, regex: /——/g, budget: 2 },
  // 只针对自造概念的套壳，不针对引用原文。清单要抓的是「深度工作」式反复使用的
  // 概念壳；引屏幕文字、工具输出或他人原话是引号的正当用途。判据是短、名词状、
  // 且在同一篇里重复出现——自造概念会被反复使用，一次性引用不会。
  { id: 'concept-quotes', layer: '句式', label: '引号给概念套壳（同篇重复的短概念）', weight: 2,
    collect: (prose) => {
      const counts = new Map()
      for (const match of prose.matchAll(/[“]([^”\n]{2,6})[”]/g)) {
        const term = match[1]
        if (/[，。！？；：、,.!?;:]/.test(term)) continue
        if (/(了|着|过|吗|呢)$/.test(term)) continue
        counts.set(term, (counts.get(term) ?? 0) + 1)
      }
      return [...counts.entries()]
        .filter(([, count]) => count >= 2)
        .flatMap(([term, count]) => Array.from({ length: count }, () => '“' + term + '”'))
    } },

  // 结构层
  { id: 'road-sign', layer: '结构', label: '导游路标（得从头讲/记住这个/后面细说/先说A）', weight: 3,
    regex: /(得从头讲|记住这[个句]|后面(会)?细说|先说[^。\n]{0,12}[，,]不然|把这两件事合起来看|接下来我们|下面我们来)/g },
  { id: 'narrator', layer: '结构', label: '解说员旁白（这条线很清楚/这个结论站得住/最有意思的是）', weight: 3,
    regex: /(这条线(很)?清楚|这个结论站得住|最有意思的(部分)?是|值得一提的是|这一点很关键)/g },
  { id: 'outlook-formula', layer: '结构', label: '挑战与展望公式', weight: 3,
    regex: /(仍面临[^。\n]{0,20}挑战|未来可期|仍有很长的路|前景广阔)/g },
  { id: 'ritual-hedge', layer: '结构', label: '段落化免责（仪式化 hedge）', weight: 2,
    regex: /(这一段是我的推测|先交代一下|需要说明的是[，,][^。\n]{0,40}后面(会)?验证)/g },

  // 词汇层
  { id: 'filler-connective', layer: '词汇', label: '衔接套话', weight: 1,
    regex: /(值得注意的是|需要指出的是|综上所述|总而言之|不难看出|由此可见|一言以蔽之)/g },
  { id: 'empty-buzzword', layer: '词汇', label: '空洞大词', weight: 2,
    regex: /(赋能|闭环|抓手|底层逻辑|深度剖析|旨在|生态化|全方位|多维度)/g },
  { id: 'universal-verb', layer: '词汇', label: '万能动词', weight: 1,
    regex: /(推进|打造|建构|构筑|夯实)/g },
  { id: 'marketing', layer: '词汇', label: '营销腔', weight: 2,
    regex: /(显著提升|极具价值|令人惊叹|大幅跃升|强力支撑)/g },
  { id: 'lede-cta', layer: '词汇', label: '导语与推销收尾', weight: 3,
    regex: /(今天我们来聊聊|还等什么|赶紧试试|快来体验)/g },
]

function auditText(text) {
  const prose = maskNonProse(text)
  const han = hanCount(prose)
  const findings = []
  for (const pattern of PATTERNS) {
    const matches = pattern.collect === undefined
      ? [...prose.matchAll(pattern.regex)].map(match => match[0])
      : pattern.collect(prose)
    const overBudget = pattern.budget === undefined ? matches.length : Math.max(0, matches.length - pattern.budget)
    if (matches.length === 0) continue
    findings.push({
      id: pattern.id,
      layer: pattern.layer,
      label: pattern.label,
      count: matches.length,
      counted: overBudget,
      weight: pattern.weight,
      budget: pattern.budget ?? null,
      samples: matches.slice(0, 3).map(match => String(match).trim().slice(0, 48)),
    })
  }
  const punchlines = sectionEndPunchlines(text)
  if (punchlines.length > 2) {
    findings.push({
      id: 'section-punchline',
      layer: '结构',
      label: '小节末尾短句（金句锤）',
      count: punchlines.length,
      counted: punchlines.length - 2,
      weight: 3,
      budget: 2,
      samples: punchlines.slice(0, 3).map(hit => 'L' + String(hit.line) + ' ' + hit.text.slice(0, 40)),
    })
  }
  const pacing = sentenceLengthCv(prose)
  if (pacing !== null && pacing.cv < 0.45) {
    findings.push({
      id: 'uniform-pacing',
      layer: '结构',
      label: '匀速感（句长变异系数偏低）',
      count: 1,
      counted: 1,
      weight: 2,
      budget: null,
      samples: ['cv=' + pacing.cv.toFixed(2) + '，' + String(pacing.sentences) + ' 句，均长 '
        + pacing.meanHan.toFixed(1) + ' 字'],
    })
  }
  const score = findings.reduce((sum, finding) => sum + finding.counted * finding.weight, 0)
  return { han, findings, score, density: han === 0 ? 0 : (score / han) * 1000 }
}

function collectFiles(explicit) {
  if (explicit.length > 0) return explicit
  const files = []
  for (const name of ['SITE-HOME.md', 'START-HERE.md', 'README.zh.md']) {
    if (existsSync(join(root, name))) files.push(name)
  }
  // research-notes holds private research input; it is scanned when present
  // because the same prose rules apply, but it is never published.
  for (const directory of ['study', 'research-notes']) {
    const absolute = join(root, directory)
    if (!existsSync(absolute)) continue
    for (const entry of readdirSync(absolute).sort()) {
      if (entry.endsWith('.md') && statSync(join(absolute, entry)).isFile()) files.push(directory + '/' + entry)
    }
  }
  return files
}

const argv = process.argv.slice(2)
let limit = Number.POSITIVE_INFINITY
const explicit = []
for (const [index, arg] of argv.entries()) {
  if (arg === '--top') {
    limit = Number(argv[index + 1])
    continue
  }
  if (argv[index - 1] === '--top') continue
  explicit.push(arg)
}

const files = collectFiles(explicit)
const reports = []
for (const file of files) {
  const absolute = join(root, file)
  if (!existsSync(absolute)) continue
  reports.push({ file: relative(root, absolute).split('\\').join('/'), ...auditText(readFileSync(absolute, 'utf8')) })
}

reports.sort((left, right) => right.density - left.density)
const shown = reports.slice(0, Number.isFinite(limit) ? limit : reports.length)

const totalHan = reports.reduce((sum, report) => sum + report.han, 0)
const totalScore = reports.reduce((sum, report) => sum + report.score, 0)
const byLayer = new Map()
for (const report of reports) {
  for (const finding of report.findings) {
    byLayer.set(finding.layer, (byLayer.get(finding.layer) ?? 0) + finding.counted)
  }
}

console.log('AI 味特征密度报告（句式层、结构层、词汇层；经验层需人读）')
console.log('扫描文件：' + String(reports.length) + '，散文汉字：' + String(totalHan)
  + '，加权命中：' + String(totalScore))
console.log('每千汉字加权命中：' + (totalHan === 0 ? '0' : ((totalScore / totalHan) * 1000).toFixed(2)))
console.log('按层：' + [...byLayer.entries()].map(([layer, count]) => layer + ' ' + String(count)).join('，'))
console.log('')

for (const report of shown) {
  if (report.findings.length === 0) continue
  console.log(report.file + '  每千字 ' + report.density.toFixed(2) + '（' + String(report.han) + ' 汉字）')
  for (const finding of report.findings.sort((left, right) => right.counted * right.weight - left.counted * left.weight)) {
    if (finding.counted === 0) continue
    const budget = finding.budget === null ? '' : '，预算 ' + String(finding.budget)
    console.log('  [' + finding.layer + '] ' + finding.label
      + '：命中 ' + String(finding.count) + budget + '，计入 ' + String(finding.counted))
    for (const sample of finding.samples) console.log('      ' + sample)
  }
  console.log('')
}

const clean = reports.filter(report => report.findings.every(finding => finding.counted === 0))
console.log('无计入命中的文件：' + String(clean.length) + ' / ' + String(reports.length))
console.log('')
console.log('这份报告只覆盖可机械判定的三层。经验层——可替换的具体、两头堵的判断、')
console.log('无代价的情绪、作者不在场——脚本判不了；本工具全绿不等于稿子有人味。')
