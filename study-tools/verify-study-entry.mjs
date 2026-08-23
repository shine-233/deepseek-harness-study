#!/usr/bin/env node

/**
 * Check the small, public learning route without starting DSH or VitePress.
 * This is a source/manifest smoke check, not proof that a browser can render
 * every clean URL or that a reader understood the material.
 */

import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { expectedStudySources } from './verify-study-publication.mjs'
import { inspectStudyHomeMetrics } from './verify-study-home-metrics.mjs'

export const criticalStudySources = [
  'SITE-HOME.md',
  'START-HERE.md',
  'study/00-开始这里.md',
  'study/01-仓库地图.md',
  'study/25-从首页到第一次产出的动手任务单.md',
  'study/27-工具预算与插件责任决策卡.md',
  'study/28-最小插件示例与学习检查.md',
  'study/29-学习仓库的质量检查与审阅.md',
  'study/31-学习工具箱.md',
  'study/32-源码学习项目的渐进式设计.md',
  'study-tools/quick-check.mjs',
  'study-tools/verify-agent-review.mjs',
  'study/文件索引/README.md',
  'study/source-index-manifest.json',
  'study-examples/README.zh.md',
  'study-examples/minimal-observer-plugin/README.zh.md',
  'study-examples/minimal-observer-plugin/demo.mjs',
]

const criticalRoutes = [
  "route: 'study/examples/index.md'",
  "route: 'study/examples/minimal-observer.md'",
  "study/files/${studyIndexRouteFilename(source)}",
]

/** Return the source and manifest errors in the first-time-reader route. */
export function verifyStudyEntry(root = resolve(import.meta.dirname, '..')) {
  const errors = []
  const read = source => readFileSync(join(root, source), 'utf8')

  for (const source of criticalStudySources) {
    if (!existsSync(join(root, source))) errors.push(`缺少学习入口源文件：${source}`)
  }

  if (errors.length > 0) return errors

  const home = read('SITE-HOME.md')
  const start = read('START-HERE.md')
  const lesson = read('study/28-最小插件示例与学习检查.md')
  const quality = read('study/29-学习仓库的质量检查与审阅.md')
  const toolbox = read('study/31-学习工具箱.md')
  const manifest = read('website/docs.ts')
  const journal = read('website/.vitepress/theme/JournalHome.vue')

  // 首页只承载组件挂载；首屏文案、实验芯片和拍立得数字都住在
  // JournalHome.vue 里，各自的契约分开锁定。
  for (const marker of ['<JournalHome />']) {
    if (!home.includes(marker)) errors.push(`首页缺少首屏入口标记：${marker}`)
  }
  if (home.includes('点源码学习')) errors.push('首页仍包含已废弃的“点源码学习”按钮文案')

  for (const marker of [
    '课程、实验、索引',
    'dj-lab-chip',
    '个逐文件导读卡',
    '个离线实验',
    'research-debug-bridge.html',
    'doc-fact-error',
  ]) {
    if (!journal.includes(marker)) errors.push(`JournalHome 缺少首屏入口标记：${marker}`)
  }
  if (journal.includes('点源码学习')) errors.push('JournalHome 仍包含已废弃的“点源码学习”按钮文案')

  const homeMetrics = inspectStudyHomeMetrics(root)
  for (const error of homeMetrics.errors) errors.push(`首页状态数字门禁：${error}`)

  for (const marker of [
    'study/00-开始这里.md',
    'study/01-仓库地图.md',
    'study/文件索引/README.md',
    'pnpm run study:quick-check',
  ]) {
    if (!start.includes(marker)) errors.push(`START-HERE 缺少第一轮路径：${marker}`)
  }

  for (const marker of ['study:quick-check', '--example', '--deep', '--site']) {
    if (!toolbox.includes(marker)) errors.push(`学习工具箱缺少快速入口说明：${marker}`)
  }

  for (const marker of [
    '../study-examples/README.zh.md',
    '../study-examples/minimal-observer-plugin/README.zh.md',
    'run demo',
    'Fiber',
    '真实 DSH',
  ]) {
    if (!lesson.includes(marker)) errors.push(`最小示例课程缺少边界说明：${marker}`)
  }

  for (const marker of [
    'study-tools/verify-study-entry.mjs',
    'study-tools/verify-study-publication.mjs',
    'study-tools/verify-agent-review.mjs',
    'study:quick-check',
    'Agent 审阅',
    'Pages 工作流',
  ]) {
    if (!quality.includes(marker)) errors.push(`质量课程缺少检查说明：${marker}`)
  }

  for (const marker of [
    "source: { root: 'SITE-HOME.md'",
    "source === 'START-HERE.md'",
    "source: 'study-examples/README.zh.md'",
    "sourceAliases: ['study-examples/README.md']",
    ...criticalRoutes,
  ]) {
    if (!manifest.includes(marker)) errors.push(`Pages manifest 缺少入口映射：${marker}`)
  }

  return errors
}

const invoked = process.argv[1] === undefined ? '' : resolve(process.argv[1])
if (invoked === resolve(import.meta.dirname, 'verify-study-entry.mjs')) {
  const errors = verifyStudyEntry()
  console.log(`学习入口检查：${errors.length === 0 ? '通过' : '失败'}`)
  for (const error of errors) console.log(`错误：${error}`)
  if (errors.length > 0) process.exit(1)
}
