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
  const sourceIndex = JSON.parse(read('study/source-index-manifest.json'))

  for (const marker of [
    'text: 第一次来，按这里走',
    'text: 不想选，照着做',
    'text: 想动手写插件',
    'link: /study/',
    'link: /study/lessons/25-从首页到第一次产出的动手任务单',
    'link: /study/lessons/28-最小插件示例与学习检查',
    'study/32-源码学习项目的渐进式设计.md',
    'dsh-learning-map',
    'dsh-status-strip',
    'data-study-pages="110"',
    'data-index-files="2756"',
    'data-learning-tests="',
    'data-example-tests="8"',
    'data-structural-errors="0"',
    'href="./study/lessons/00-开始这里"',
    'href="./study/lessons/01-仓库地图"',
    'href="./study/lessons/25-从首页到第一次产出的动手任务单"',
    'href="./study/examples/minimal-observer"',
  ]) {
    if (!home.includes(marker)) errors.push(`首页缺少首屏入口标记：${marker}`)
  }

  const status = home.match(/<div class="dsh-status-strip"[^>]*data-study-pages="(\d+)"[^>]*data-index-files="(\d+)"[^>]*data-learning-tests="(\d+)"[^>]*data-example-tests="(\d+)"[^>]*data-structural-errors="(\d+)"/)
  if (status === null) {
    errors.push('首页状态条缺少可核对的 data 数字')
  } else {
    const [, studyPages, indexFiles, learningTests, exampleTests, structuralErrors] = status
    const expectedPages = expectedStudySources(root).size
    if (Number(studyPages) !== expectedPages) errors.push(`首页学习页面数字 ${studyPages} 与清单预期 ${expectedPages} 不一致`)
    if (Number(indexFiles) !== Number(sourceIndex.sourceFileCount)) errors.push(`首页索引数字 ${indexFiles} 与清单预期 ${sourceIndex.sourceFileCount} 不一致`)
    const homeMetrics = inspectStudyHomeMetrics(root)
    for (const error of homeMetrics.errors) errors.push(`首页状态数字门禁：${error}`)
    if (Number(exampleTests) !== 8) errors.push(`首页示例测试数字 ${exampleTests} 与当前门禁约定 8 不一致`)
    if (Number(structuralErrors) !== 0) errors.push(`首页结构错误数字 ${structuralErrors} 不是 0`)
  }

  if (home.includes('点源码学习')) errors.push('首页仍包含已废弃的“点源码学习”按钮文案')
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
