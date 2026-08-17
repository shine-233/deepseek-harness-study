import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'
import { JSDOM } from 'jsdom'

const repositoryRoot = resolve(import.meta.dirname, '..')
const origin = 'https://dsh-study.invalid'

/**
 * The minimum HTML shell every published Chinese study page must keep.
 *
 * This is deliberately a small contract: it checks that a source was emitted
 * as a readable VitePress page with the shared reading layer, not that a
 * browser, screen reader, or human has understood the lesson.
 */
const REQUIRED_STUDY_HTML_SHELL = [
  { label: 'zh-CN html language', test: document => document.documentElement.lang === 'zh-CN' },
  { label: 'viewport meta', selector: 'meta[name="viewport"]' },
  { label: 'VitePress content root', selector: '#VPContent' },
  { label: 'document body', selector: '.vp-doc' },
  { label: 'reading.css', selector: 'link[href*="reading.css"]' },
]

function posixPath(path) {
  return path.split(sep).join('/')
}

function markdownFiles(directory, root = directory) {
  const files = []
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
    const absolute = resolve(directory, entry.name)
    if (entry.isDirectory()) files.push(...markdownFiles(absolute, root))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(posixPath(relative(root, absolute)))
  }
  return files
}

/**
 * Return every Markdown source that the Chinese study site promises to publish.
 * The English README files are aliases of the Chinese example pages and are
 * deliberately not counted as separate study pages.
 */
export function expectedStudySources(root = repositoryRoot) {
  return new Set([
    'START-HERE.md',
    ...markdownFiles(resolve(root, 'study'), root),
    'study-examples/README.zh.md',
    'study-examples/minimal-observer-plugin/README.zh.md',
  ])
}

function walkFiles(directory, root = directory) {
  const files = []
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
    const absolute = resolve(directory, entry.name)
    if (entry.isDirectory()) files.push(...walkFiles(absolute, root))
    else if (entry.isFile()) files.push(posixPath(relative(root, absolute)))
  }
  return files
}

function projectedPages(generatedRoot) {
  return walkFiles(generatedRoot)
    .filter(file => file.startsWith('study/') && file.endsWith('.md'))
    .map(file => {
      const content = readFileSync(resolve(generatedRoot, file), 'utf8')
      const editSource = content.match(/^editSource:\s*(.+)$/m)?.[1]
      let source
      if (editSource !== undefined) {
        try {
          source = JSON.parse(editSource)
        } catch {
          source = undefined
        }
      }
      return {
        file,
        route: file.replace(/\.md$/, '.html'),
        source,
      }
    })
}

function routeForHtml(file) {
  if (file === 'index.html') return '/'
  if (file.endsWith('/index.html')) return `/${file.slice(0, -'index.html'.length)}`
  return `/${file.slice(0, -'.html'.length)}`
}

function aliasesForRoute(route) {
  if (route === '/') return ['/', '/index', '/index.html']
  if (route.endsWith('/')) {
    const stem = route.slice(0, -1)
    return [route, stem, `${stem}/index`, `${stem}/index.html`]
  }
  return [route, `${route}.html`]
}

function builtRoutes(distRoot) {
  const routes = new Map()
  for (const file of walkFiles(distRoot).filter(file => file.endsWith('.html'))) {
    const route = routeForHtml(file)
    for (const alias of aliasesForRoute(route)) routes.set(alias, file)
  }
  return routes
}

function decodePath(path) {
  try {
    return decodeURIComponent(path)
  } catch {
    return path
  }
}

function normalizeBasePath(basePath = '/') {
  const value = String(basePath).trim()
  if (value === '' || value === '/') return '/'
  return `/${value.replace(/^\/+|\/+$/g, '')}/`
}

function stripBasePath(pathname, basePath) {
  if (basePath === '/') return pathname
  const withoutTrailingSlash = basePath.slice(0, -1)
  if (pathname === withoutTrailingSlash) return '/'
  if (!pathname.startsWith(basePath)) return undefined
  return `/${pathname.slice(basePath.length)}`
}

/**
 * Verify that every Chinese study source is projected and emitted, and that
 * every same-site study link from the emitted pages resolves to a built route.
 *
 * @param {{ repositoryRoot?: string, generatedRoot?: string, distRoot?: string, expectedSources?: Set<string>, basePath?: string }} [options]
 * @returns {{ expectedSources: number, projectedPages: number, builtStudyPages: number, missingSources: string[], unexpectedSources: string[], missingBuiltPages: string[], pagesWithoutHeadings: string[], pagesWithInvalidHtmlShell: { route: string, missing: string[] }[], checkedStudyLinks: number, brokenStudyLinks: { source: string, href: string, target: string }[] }}
 */
export function inspectStudyPublication(options = {}) {
  const root = options.repositoryRoot ?? repositoryRoot
  const generatedRoot = options.generatedRoot ?? resolve(root, 'website/.generated')
  const distRoot = options.distRoot ?? resolve(root, 'website/.dist')
  const expected = options.expectedSources ?? expectedStudySources(root)
  const basePath = normalizeBasePath(options.basePath ?? process.env.DOCS_BASE ?? '/')
  const projected = projectedPages(generatedRoot)
  const projectedSources = new Set(projected.map(page => page.source).filter(source => typeof source === 'string'))
  const missingSources = [...expected].filter(source => !projectedSources.has(source)).sort()
  const unexpectedSources = [...projectedSources].filter(source => !expected.has(source)).sort()

  const routes = builtRoutes(distRoot)
  const missingBuiltPages = projected
    .filter(page => !existsSync(resolve(distRoot, page.route)))
    .map(page => page.route)
    .sort()
  const pagesWithoutHeadings = []
  const pagesWithInvalidHtmlShell = []
  const brokenStudyLinks = []
  let builtStudyPages = 0
  let checkedStudyLinks = 0

  for (const page of projected) {
    const htmlPath = resolve(distRoot, page.route)
    if (!existsSync(htmlPath)) continue
    builtStudyPages++
    const document = new JSDOM(readFileSync(htmlPath, 'utf8')).window.document
    const heading = document.querySelector('h1')
    if (heading === null || heading.textContent?.trim() === '') pagesWithoutHeadings.push(page.route)
    const missingShell = REQUIRED_STUDY_HTML_SHELL.flatMap((requirement) => {
      const present = 'test' in requirement
        ? requirement.test(document)
        : document.querySelector(requirement.selector) !== null
      return present ? [] : [requirement.label]
    })
    if (missingShell.length > 0) pagesWithInvalidHtmlShell.push({ route: page.route, missing: missingShell })
    const pageRoute = routeForHtml(page.route)
    for (const anchor of document.querySelectorAll('a[href]')) {
      const href = anchor.getAttribute('href')
      if (href === null || href.startsWith('#') || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue
      let target
      try {
        target = new URL(href, `${origin}${pageRoute}`)
      } catch {
        target = undefined
      }
      if (target === undefined || target.origin !== origin) continue
      const pathname = decodePath(target.pathname)
      const routePath = stripBasePath(pathname, basePath)
      if (routePath === undefined || (routePath !== '/study' && !routePath.startsWith('/study/'))) continue
      checkedStudyLinks++
      if (!routes.has(routePath)) brokenStudyLinks.push({ source: page.route, href, target: routePath })
    }
  }

  return {
    expectedSources: expected.size,
    projectedPages: projected.length,
    builtStudyPages,
    missingSources,
    unexpectedSources,
    missingBuiltPages,
    pagesWithoutHeadings,
    pagesWithInvalidHtmlShell,
    checkedStudyLinks,
    brokenStudyLinks,
  }
}

function main() {
  const report = inspectStudyPublication()
  const failures = report.missingSources.length + report.unexpectedSources.length
    + report.missingBuiltPages.length + report.pagesWithoutHeadings.length + report.brokenStudyLinks.length
    + report.pagesWithInvalidHtmlShell.length
  if (failures === 0) {
    console.log(`verify-study-publication: ${report.expectedSources} sources -> ${report.projectedPages} projected pages -> ${report.builtStudyPages} built pages; ${report.checkedStudyLinks} study links resolve.`)
    return 0
  }

  console.error(`verify-study-publication: ${failures} publication defect(s).`)
  for (const source of report.missingSources) console.error(`  missing projected source: ${source}`)
  for (const source of report.unexpectedSources) console.error(`  unexpected projected source: ${source}`)
  for (const route of report.missingBuiltPages) console.error(`  missing built page: ${route}`)
  for (const route of report.pagesWithoutHeadings) console.error(`  built page has no H1: ${route}`)
  for (const page of report.pagesWithInvalidHtmlShell) console.error(`  invalid study HTML shell: ${page.route} -> ${page.missing.join(', ')}`)
  for (const link of report.brokenStudyLinks) console.error(`  broken study link: ${link.source} -> ${link.href} (${link.target})`)
  return 1
}

if (import.meta.main) process.exitCode = main()
