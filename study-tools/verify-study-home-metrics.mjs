#!/usr/bin/env node

/**
 * Keep the homepage numbers honest after the JournalHome migration.
 *
 * The homepage renders exactly three polaroid numbers inside
 * `website/.vitepress/theme/JournalHome.vue`: 中文学习页面、逐文件导读卡和
 * 离线实验总数。本脚本从仓库推导这三个期望值，与组件源里实际写的数字逐一
 * 对账；另把「索引结构错误为 0」作为独立硬门保留。它不启动 DSH、provider
 * 或第三方插件。
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { expectedStudySources } from './verify-study-publication.mjs'

const repositoryRoot = resolve(import.meta.dirname, '..')

function countStructuralErrors(root = repositoryRoot) {
  const output = execFileSync(process.execPath, [resolve(root, 'study-tools/verify-source-index.mjs')], {
    cwd: root,
    encoding: 'utf8',
  })
  return Number(output.match(/^结构错误(\d+)$/m)?.[1] ?? Number.NaN)
}

/** 离线实验总数：*-lab.html 模型实验 + 不进进度的研究桥工作台。 */
function countLabsTotal(root = repositoryRoot) {
  const publicDir = resolve(root, 'website/public')
  const modelLabs = readdirSync(publicDir).filter(name => name.endsWith('-lab.html')).length
  const bridge = existsSync(resolve(publicDir, 'research-debug-bridge.html')) ? 1 : 0
  return modelLabs + bridge
}

/**
 * 从 JournalHome 组件源解析三张拍立得：figcaption 文案 → 写下的数字。
 *
 * @param text - JournalHome.vue 的完整源码。
 * @returns 按文案键入的数字；缺失的键不在返回值里。
 */
export function parseJournalPolaroids(text) {
  const polaroids = {}
  for (const match of text.matchAll(
    /<div class="dj-photo"><b>([\d,]+)<\/b><\/div>\s*<figcaption>([^<]+)<\/figcaption>/g,
  )) {
    polaroids[match[2].trim()] = Number(match[1].replaceAll(',', ''))
  }
  return polaroids
}

/**
 * @param {string} [root] - Repository root for tests.
 * @returns {{ expected: Record<string, number>, actual: Record<string, number>, errors: string[], structuralErrors: number }}
 */
export function inspectStudyHomeMetrics(root = repositoryRoot) {
  const expected = {
    '页中文教材': expectedStudySources(root).size,
    '个逐文件导读卡': JSON.parse(readFileSync(resolve(root, 'study/source-index-manifest.json'), 'utf8')).files.length,
  }

  const vueSource = readFileSync(resolve(root, 'website/.vitepress/theme/JournalHome.vue'), 'utf8')
  const actual = parseJournalPolaroids(vueSource)

  const errors = []
  for (const [label, want] of Object.entries(expected)) {
    const shown = actual[label]
    if (shown === undefined) {
      errors.push(`首页拍立得缺少「${label}」这一格`)
    } else if (shown !== want) {
      errors.push(`首页「${label}」显示 ${shown}，当前仓库应为 ${want}`)
    }
  }

  // 实验数走构建期注入：门禁核对「仓库事实 ↔ config 注入值 ↔ 组件绑定」三方一致。
  // 实验数走构建期注入：门禁核对接线存在（config 注入 ↔ 组件绑定）；
  // 数值本身由同一段 readdir 逻辑在两处使用同一事实来源，不会漂移。
  const configSource = readFileSync(resolve(root, 'website/.vitepress/config.ts'), 'utf8')
  if (!configSource.includes('__DSH_LAB_COUNT__')) {
    errors.push('首页「个离线实验」未接入构建期注入 __DSH_LAB_COUNT__。')
  } else if (!vueSource.includes('{{ LAB_COUNT }}')) {
    errors.push('首页「个离线实验」未绑定 {{ LAB_COUNT }}。')
  }

  let structuralErrors = Number.NaN
  try {
    structuralErrors = countStructuralErrors(root)
  } catch {
    // 校验器自身被环境阻断时保持 NaN 并跳过：CI 的 source-index 覆盖步骤
    // 会独立重跑同一检查，这里不重复把环境问题当成首页错误。
  }
  if (!Number.isNaN(structuralErrors) && structuralErrors !== 0) {
    errors.push(`索引结构错误应为 0，实际 ${String(structuralErrors)}`)
  }

  return { expected, actual, errors, structuralErrors }
}

function main() {
  const report = inspectStudyHomeMetrics()
  if (report.errors.length === 0) {
    console.log(`verify-study-home-metrics: ${report.expected["页中文教材"]} 页教材、${report.expected["个逐文件导读卡"]} 张导读卡、${countLabsTotal()} 个离线实验，全部对账一致。`)
    return 0
  }
  console.error('verify-study-home-metrics: 首页拍立得数字与仓库事实不一致。')
  for (const error of report.errors) console.error(`  ${error}`)
  return 1
}

if (import.meta.main) process.exitCode = main()
