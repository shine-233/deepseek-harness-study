import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const repositoryRoot = resolve(import.meta.dirname, '..')

/*
 * 首页由 JournalHome 组件在客户端挂载（集章进度依赖 localStorage），SSR 输出
 * 只有挂载壳与阅读层资产；拍立得数字的对账由 verify-study-home-metrics 在
 * 组件源上完成。这里只要求任何渲染路径都必须存在的阅读层标记。
 */

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
      'dsh-reading-progress',
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
  {
    file: 'study-labs.html',
    label: '实验室总览',
    markers: [
      '十五个能上手拆的实验',
      'lab-card-grid',
      'data-lab="turn-flow"',
      'data-lab="hook-flow"',
      'data-lab="approval-flow"',
      'data-lab="session-fork"',
      'data-lab="research-debug-bridge"',
      'study/lessons/04-Agent与Turn流程.html',
      '按目的筛选实验',
    ],
  },
]

/** Assets that make the reading layer visible on the published site. */
export const REQUIRED_PUBLISHED_ASSETS = [
  'reading.css',
  'favicon.svg',
  'llms.txt',
  'study-progress.js',
  'study-scrolly.js',
  'study-scrolly-beats.js',
  'study-companion.js',
]

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

/**
 * Collect the lesson links the standalone lab pages ship in website/public.
 *
 * GitHub Pages serves case-sensitively, so `05-session日志与恢复.html` is a
 * different (missing) file from the built `05-Session日志与恢复.html`. These
 * links shipped broken for exactly that reason; this inventory exists so a
 * gate can compare them against the real build output instead of trusting
 * that a route looks right.
 *
 * @param {string} publicDir - The lab pages directory.
 * @returns {{ file: string, link: string }[]} One entry per href occurrence.
 */
export function collectLabLessonLinks(publicDir) {
  const links = []
  for (const name of readdirSync(publicDir).filter(name => name.endsWith('.html'))) {
    const source = readFileSync(resolve(publicDir, name), 'utf8')
    for (const match of source.matchAll(/href="\.?\/?(study\/lessons\/[^"#?]+)"/g)) {
      links.push({ file: name, link: match[1] })
    }
  }
  return links
}

/**
 * Check collected lab links against the exact filenames in the build output.
 *
 * A directory listing comparison is deliberate: `existsSync` would pass on
 * Windows and macOS case-insensitive filesystems and only fail on CI, which
 * is precisely how the wrong-case links shipped unnoticed. Reading the built
 * directory and comparing strings keeps the gate honest on every OS.
 *
 * @param {string} distRoot - VitePress output directory.
 * @param {{ file: string, link: string }[]} [links] - Injectable link inventory.
 * @returns {{ file: string, link: string }[]} Links with no exact-case target.
 */
export function inspectLabLessonLinks(distRoot, links = collectLabLessonLinks(resolve(repositoryRoot, 'website', 'public'))) {
  const lessons = new Set(readdirSync(resolve(distRoot, 'study', 'lessons')))
  return links.filter(entry => !lessons.has(entry.link.replaceAll('\\', '/').split('/').pop()))
}

function main() {
  const distRoot = resolve(repositoryRoot, 'website/.dist')
  const report = inspectBuiltStudySite(distRoot)
  const brokenLinks = inspectLabLessonLinks(distRoot)
  if (report.missingFiles.length === 0 && report.missingMarkers.length === 0 && report.missingAssets.length === 0 && brokenLinks.length === 0) {
    console.log(`verify-built-study-site: ${report.checked} beginner-route pages, reading assets, and every lab-page lesson link are present.`)
    return 0
  }

  console.error('verify-built-study-site: the published beginner route is incomplete.')
  for (const asset of report.missingAssets) console.error(`  missing asset: ${asset}`)
  for (const file of report.missingFiles) console.error(`  missing page: ${file}`)
  for (const item of report.missingMarkers) console.error(`  missing marker: ${item.file} -> ${JSON.stringify(item.marker)}`)
  for (const item of brokenLinks) console.error(`  broken lab link: ${item.file} -> ${item.link}（构建产物里没有这个文件名，注意大小写）`)
  return 1
}

if (import.meta.main) process.exitCode = main()
