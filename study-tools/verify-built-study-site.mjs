import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repositoryRoot = resolve(import.meta.dirname, '..')

/**
 * The small set of published pages that make up the first-time reader route.
 * These are deliberately content markers rather than snapshots: a visual
 * redesign may change generated markup while the learning contract remains.
 */
export const REQUIRED_PUBLISHED_PAGES = [
  {
    file: 'index.html',
    label: 'Pages 首页',
    markers: [
      '第一次来，按这里走',
      '不想选，照着做',
      '想动手写插件',
      '第一轮的默认答案',
      '卡住时不用猜',
      'dsh-stuck-card',
      '工具箱',
      'dsh-route-grid',
      'dsh-home-contract',
      'dsh-home-learning-results',
      'dsh-proof-strip',
      'dsh-proof-item',
      'dsh-status-strip',
      'data-study-pages="104"',
      'data-index-files="2756"',
      'data-learning-tests="27"',
      'data-example-tests="8"',
      'data-structural-errors="0"',
      'dsh-learning-map',
      'dsh-reading-progress',
      '我第一次来',
      '照着 15 分钟任务单走',
      '先跑最小示例',
      'reading.css',
    ],
  },
  {
    file: 'study/index.html',
    label: 'START-HERE 学习入口',
    markers: ['第一课：从零开始读 DSH', '5 分钟', '15 分钟动手任务单', 'dsh-command-card'],
  },
  {
    file: 'study/examples/index.html',
    label: '学习示例目录',
    markers: ['最小观察插件', '确定性检查'],
  },
  {
    file: 'study/examples/minimal-observer.html',
    label: '最小观察插件页面',
    // Shiki splits highlighted command tokens into several spans, so the
    // marker intentionally checks stable content rather than raw HTML layout.
    markers: ['tools/result', 'pnpm', '未证明'],
  },
  {
    file: 'study/lessons/28-最小插件示例与学习检查.html',
    label: '最小插件课程',
    markers: ['study-examples/minimal-observer-plugin', '真实 DSH', 'dsh-proof-grid'],
  },
  {
    file: 'study/lessons/31-学习工具箱.html',
    label: '学习工具箱',
    markers: ['不启动 DSH', 'verify-study-entry.mjs', '真实 ToolRuntime'],
  },
]

/** Assets that make the reading layer visible on the published site. */
export const REQUIRED_PUBLISHED_ASSETS = ['reading.css', 'favicon.svg']

/**
 * @typedef {{ file: string, label: string, markers: string[] }} PublishedPageContract
 * @typedef {{ checked: number, missingFiles: string[], missingMarkers: { file: string, marker: string }[], missingAssets: string[] }} PublishedSiteReport
 */

/**
 * Verify the built artifact for the beginner route.
 *
 * @param {string} distRoot - VitePress output directory.
 * @param {PublishedPageContract[]} [pages] - Injectable contract for tests.
 * @returns {PublishedSiteReport}
 */
export function inspectBuiltStudySite(distRoot, pages = REQUIRED_PUBLISHED_PAGES) {
  const missingFiles = []
  const missingMarkers = []
  const missingAssets = REQUIRED_PUBLISHED_ASSETS.filter(asset => !existsSync(resolve(distRoot, asset)))
  let checked = 0

  for (const page of pages) {
    const path = resolve(distRoot, page.file)
    if (!existsSync(path)) {
      missingFiles.push(page.file)
      continue
    }

    const html = readFileSync(path, 'utf8')
    checked++
    for (const marker of page.markers) {
      if (!html.includes(marker)) missingMarkers.push({ file: page.file, marker })
    }
  }

  return { checked, missingFiles, missingMarkers, missingAssets }
}

function main() {
  const distRoot = resolve(repositoryRoot, 'website/.dist')
  const report = inspectBuiltStudySite(distRoot)
  if (report.missingFiles.length === 0 && report.missingMarkers.length === 0 && report.missingAssets.length === 0) {
    console.log(`verify-built-study-site: ${report.checked} beginner-route pages and reading assets are present.`)
    return 0
  }

  console.error('verify-built-study-site: the published beginner route is incomplete.')
  for (const asset of report.missingAssets) console.error(`  missing asset: ${asset}`)
  for (const file of report.missingFiles) console.error(`  missing page: ${file}`)
  for (const item of report.missingMarkers) console.error(`  missing marker: ${item.file} -> ${JSON.stringify(item.marker)}`)
  return 1
}

if (import.meta.main) process.exitCode = main()
