/** VitePress configuration for the locally projected documentation site. */

import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { DefaultTheme, PageData } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { docsPages, landingLink, orderedPages, routeLink, sectionSpec, type DocsLocale, type DocsPage, type DocsSidebar } from '../docs.ts'
import { docsSourceFiles, projectDocs } from '../../scripts/project-doc-site.ts'

projectDocs()

function sidebar(locale: DocsLocale, collection: NonNullable<DocsPage['sidebar']>): DefaultTheme.SidebarItem[] {
  // `orderedPages` already sorts by section placement, so insertion order
  // carries the group order and each group keeps its pages in sequence.
  const groups = new Map<string, DocsPage[]>()
  for (const page of orderedPages(locale, collection)) {
    const entries = groups.get(page.section) ?? []
    entries.push(page)
    groups.set(page.section, entries)
  }
  return [...groups.entries()].map(([text, entries]) => {
    const { collapsed } = sectionSpec(locale, text)
    return {
      text,
      // A present `collapsed` is what makes the default theme render the
      // group as collapsible at all, so an open group must omit the key.
      ...(collapsed === undefined ? {} : { collapsed }),
      items: entries.map(page => ({ text: page.label, link: routeLink(page.route) })),
    }
  })
}

/** One module link shared between the navigation bar and the guide sidebar. */
interface GuideModuleLink {
  /** Label shown in the navigation bar and the guide sidebar. */
  label: string
  /** Sidebar collection the link opens. */
  collection: DocsSidebar
}

/**
 * Per-locale guide-module facts: the guide collection and the module links
 * appended to the guide sidebar.
 */
interface GuideModules {
  /** Guide sidebar collection for the locale. */
  guide: 'zh-guide' | 'en-guide'
  /** Development module link. */
  develop: GuideModuleLink
  /** Reference module link. */
  reference: GuideModuleLink
}

/**
 * Guide-module facts keyed by locale, giving every module label and collection
 * one home shared by the navigation bar and the guide sidebar.
 */
const guideModules = {
  root: {
    guide: 'zh-guide',
    develop: { label: '开发', collection: 'zh-develop' },
    reference: { label: '参考', collection: 'zh-reference' },
  },
  en: {
    guide: 'en-guide',
    develop: { label: 'Development', collection: 'en-develop' },
    reference: { label: 'Reference', collection: 'en-reference' },
  },
} satisfies Record<DocsLocale, GuideModules>

/**
 * Guide sidebar with direct links into the first development and reference pages.
 *
 * @param locale - Route tree whose guide sidebar is being built.
 * @returns Guide groups followed by top-level links to the other documentation modules.
 */
function guideSidebar(locale: DocsLocale): DefaultTheme.SidebarItem[] {
  const { guide, develop, reference } = guideModules[locale]
  return [
    ...sidebar(locale, guide),
    ...[develop, reference].map(({ label, collection }) => ({
      text: label,
      link: landingLink(locale, collection),
    })),
  ]
}

/**
 * Link to a canonical study page without duplicating its generated route.
 *
 * @param source - Repository-relative study Markdown source.
 * @returns The published site route for the source.
 * @throws When the source is not part of the Chinese study collection.
 */
function studyPageLink(source: string): string {
  const page = docsPages.find(candidate => candidate.locale === 'root' && candidate.source === source && candidate.sidebar === 'zh-study')
  if (page === undefined) throw new Error(`Study navigation source "${source}" is not published.`)
  return routeLink(page.route)
}

/**
 * Study sidebar with a short route card before the complete lesson and index
 * collections. The route card keeps first-time readers oriented without
 * changing the order or content of the canonical study pages.
 *
 * @returns Sidebar groups for the Chinese study route.
 */
function studySidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '阅读路线',
      collapsed: false,
      items: [
        { text: '从这里开始', link: landingLink('root', 'zh-study') },
        { text: '15 分钟任务单', link: studyPageLink('study/25-从首页到第一次产出的动手任务单.md') },
        { text: '工具与插件决策卡', link: studyPageLink('study/27-工具预算与插件责任决策卡.md') },
        { text: '学习工具箱', link: studyPageLink('study/31-学习工具箱.md') },
        { text: '先跑一个最小示例', link: studyPageLink('study-examples/minimal-observer-plugin/README.zh.md') },
        { text: '按目录查文件', link: studyPageLink('study/文件索引/README.md') },
      ],
    },
    ...sidebar('root', 'zh-study'),
  ]
}

/**
 * Navigation-bar items for the modules the guide sidebar links into, reading
 * their labels and collections from the shared per-locale record.
 *
 * @param locale - Route tree the navigation items belong to.
 * @returns The module items for the locale's navigation bar.
 */
function moduleNav(locale: DocsLocale): DefaultTheme.NavItem[] {
  const { develop, reference } = guideModules[locale]
  const routePrefix = locale === 'root' ? '' : '/en'
  return [
    { text: develop.label, link: landingLink(locale, develop.collection), activeMatch: `^${routePrefix}/develop/` },
    { text: reference.label, link: landingLink(locale, reference.collection), activeMatch: `^${routePrefix}/reference/` },
  ]
}

/** The small Vite watcher surface used by the documentation projector. */
interface CanonicalDocsServer {
  watcher: {
    add(paths: string[]): void
    on(event: 'change', listener: (changed: string) => void): void
  }
}

function watchCanonicalDocs(server: CanonicalDocsServer): void {
  const sources = docsSourceFiles()
  server.watcher.add(sources)
  server.watcher.on('change', (changed) => {
    if (!sources.includes(changed)) return
    projectDocs()
  })
}

function escapeVueInterpolation(html: string): string {
  return html.replaceAll('{{', '&#123;&#123;').replaceAll('}}', '&#125;&#125;')
}

const STUDY_REPOSITORY_URL = 'https://github.com/shine-233/deepseek-harness-study'
const STUDY_ISSUES_URL = `${STUDY_REPOSITORY_URL}/issues/new/choose`

const sharedTheme: Pick<DefaultTheme.Config, 'search' | 'socialLinks' | 'editLink'> = {
  search: {
    provider: 'local',
    options: {
      locales: {
        root: {
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '清除搜索',
              backButtonTitle: '关闭搜索',
              noResultsText: '未找到相关结果',
              footer: {
                selectText: '选择',
                selectKeyAriaLabel: '回车键',
                navigateText: '切换',
                navigateUpKeyAriaLabel: '上方向键',
                navigateDownKeyAriaLabel: '下方向键',
                closeText: '关闭',
                closeKeyAriaLabel: 'Esc 键',
              },
            },
          },
        },
      },
    },
  },
  socialLinks: [
    { icon: 'github', link: STUDY_REPOSITORY_URL },
  ],
  editLink: {
    pattern: ({ frontmatter }: PageData) => {
      const data: unknown = frontmatter
      const editSource: unknown = typeof data === 'object' && data !== null ? Reflect.get(data, 'editSource') : undefined
      if (typeof editSource !== 'string') throw new Error('Projected documentation page has no editSource frontmatter.')
      const repository = editSource === 'START-HERE.md'
        || editSource.startsWith('study/')
        || editSource.startsWith('study-examples/')
        ? 'https://github.com/shine-233/deepseek-harness-study'
        : 'https://github.com/deepseek-ai/deepseek-harness'
      return `${repository}/edit/master/${editSource}`
    },
    text: '在 GitHub 上编辑此页',
  },
}

/** Site base path, carrying the leading and trailing slashes VitePress requires. */
const base = process.env.DOCS_BASE ?? '/'

/**
 * The DeepSeek wordmark, inlined so its `currentColor` fills follow the active
 * theme. An `<img>` would freeze the mark at the colors the file declares.
 */
const wordmark = readFileSync(resolve(import.meta.dirname, '../public/wordmark.svg'), 'utf8')
  .trim()
  .replace('<svg ', '<svg class="dsh-wordmark" ')

/**
 * Styles the default theme does not provide, carried inline because the site
 * runs the stock theme with no theme directory of its own.
 *
 * The navigation-bar lockup pairs with `siteTitle`. The scrollbar rules replace
 * the sidebar's platform bar, which reserves 15px of a 265px column and draws a
 * track the rest of the navigation has no border for; `scrollbarScript` supplies
 * the marker that reveals the thumb. Chrome drops `::-webkit-scrollbar` once
 * `scrollbar-width` is set to anything but `auto`, so the standard properties
 * stay behind a query only Firefox answers.
 */
const siteStyle = `
:root {
  --vp-c-brand-1: #3157c8;
  --vp-c-brand-2: #466fe0;
  --vp-c-brand-3: #dfe7ff;
  --vp-c-brand-soft: rgba(49, 87, 200, 0.14);
  --dsh-card-shadow: 0 12px 34px rgba(38, 34, 26, 0.08);
  /*
   * Three warm surfaces instead of white over neutral grey. The lab pages carry
   * the same values, so an embedded lab and the lesson around it sit on one
   * background rather than two slightly different whites.
   */
  --vp-c-bg: #faf8f4;
  --vp-c-bg-alt: #f2efe6;
  --vp-c-bg-soft: #f4f1ea;
  --vp-c-bg-elv: #ffffff;
}
.dark {
  --vp-c-brand-1: #91aaff;
  --vp-c-brand-2: #7895ff;
  --vp-c-brand-3: #202b55;
  --vp-c-brand-soft: rgba(145, 170, 255, 0.18);
  --dsh-card-shadow: 0 14px 38px rgba(0, 0, 0, 0.22);
  --vp-c-bg: #17171a;
  --vp-c-bg-alt: #131316;
  --vp-c-bg-soft: #202127;
  --vp-c-bg-elv: #1b1b1f;
}
.VPNavBar {
  background: color-mix(in srgb, var(--vp-c-bg) 88%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--vp-c-divider);
}
.VPHome .VPHero .name {
  letter-spacing: 0;
}
.VPHome .VPHero .tagline {
  max-width: 760px;
}
.VPHome .VPFeature {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  box-shadow: var(--dsh-card-shadow);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
.VPHome .VPFeature:hover {
  border-color: var(--vp-c-brand-soft);
  transform: translateY(-3px);
  box-shadow: 0 18px 42px rgba(37, 58, 112, 0.14);
}
.vp-doc h2 {
  letter-spacing: 0;
}
.vp-doc blockquote {
  border-left-width: 4px;
  border-radius: 0 8px 8px 0;
  background: var(--vp-c-brand-soft);
}
.vp-doc table {
  display: block;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--vp-c-divider);
}
.vp-doc th {
  background: var(--vp-c-bg-soft);
}
.vp-doc pre {
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 10px 26px rgba(37, 58, 112, 0.08);
}
.dsh-lockup { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.dsh-wordmark { display: block; height: 22px; width: auto; color: var(--vp-c-text-1); }
.dsh-tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 999px;
  padding: 1px 9px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  color: var(--vp-c-brand-1);
}

.VPSidebar::-webkit-scrollbar { width: 6px; }
.VPSidebar::-webkit-scrollbar-track { background: transparent; }
.VPSidebar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s;
}
.VPSidebar[data-scrolling]::-webkit-scrollbar-thumb { background-color: var(--vp-c-text-3); }
@supports not selector(::-webkit-scrollbar) {
  .VPSidebar { scrollbar-width: thin; scrollbar-color: transparent transparent; }
  .VPSidebar[data-scrolling] { scrollbar-color: var(--vp-c-text-3) transparent; }
}
`

/**
 * Update a tiny, non-interactive reading marker while the reader moves through
 * a long lesson or the generated file index. It deliberately stores only a
 * percentage on the document root; no reading history or page content leaves
 * the browser.
 */
const readingProgressScript = `
(() => {
  const start = () => {
    let frame = 0
    let refreshTimer
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      const ratio = distance <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / distance))
      const percent = (ratio * 100).toFixed(2) + '%'
      document.documentElement.style.setProperty('--dsh-reading-progress', percent)
      document.documentElement.dataset.dshReading = ratio >= 0.98 ? 'complete' : ratio > 0.02 ? 'started' : 'new'
    }
    const schedule = () => {
      if (frame !== 0) return
      frame = requestAnimationFrame(update)
    }
    const refreshAfterRouteChange = () => {
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(schedule, 80)
    }
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    addEventListener('hashchange', schedule)
    addEventListener('load', schedule)
    addEventListener('popstate', refreshAfterRouteChange)
    new MutationObserver(refreshAfterRouteChange).observe(document.body, { childList: true, subtree: true })
    schedule()
  }

  if (document.body === null) {
    addEventListener('DOMContentLoaded', start, { once: true })
  } else {
    start()
  }
})()
`

/**
* Mark the sidebar while it scrolls, so its scrollbar rests invisible.
 *
 * A sized `::-webkit-scrollbar` opts the element out of the platform's
 * self-hiding overlay bar, leaving one painted at all times; nothing in CSS
 * reports that an element is scrolling. The listener captures instead of
 * bubbling because scroll events do not bubble, and marks a `data-` attribute
 * rather than a class because Vue rewrites `class` wholesale when it patches
 * the element.
 */
const scrollbarScript = `
(() => {
  let idle
  addEventListener('scroll', (event) => {
    const target = event.target
    if (!(target instanceof Element) || !target.classList.contains('VPSidebar')) return
    target.dataset.scrolling = ''
    clearTimeout(idle)
    idle = setTimeout(() => delete target.dataset.scrolling, 800)
  }, true)
})()
`

/**
 * Navigation-bar title: the DeepSeek wordmark and the release-stage tag.
 * VitePress renders `siteTitle` as HTML.
 *
 * @param previewTag - Localized release-stage label.
 * @returns Markup placed beside the navigation-bar home link.
 */
function siteTitle(previewTag: string): string {
  return `<span class="dsh-lockup">${wordmark}<span class="dsh-tag">${previewTag}</span></span>`
}

export default withMermaid({
  title: 'DSH 社区源码学习与生态导读',
  description: '面向 DSH 社区的非官方中文源码学习、插件实践与生态研究材料',
  base,
  sitemap: {
    hostname: 'https://shine-233.github.io/deepseek-harness-study',
    // VitePress 1.6 的 sitemap 条目不含 base 路径（项目页站点会全部 404），
    // 在这里把 base 补回到每个 URL 前面。
    transformItems: items => items.map(item => ({
      ...item,
      url: '/deepseek-harness-study/' + item.url.replace(/^\//, ''),
    })),
  },
  // 索引导航页一屏排着几十个大 chunk 链接。VitePress 1.6 的视口预取默认开启
  // （router.prefetchLinks 缺省为 true），会在无点击时后台拉取约 4MB 的索引页
  // chunk。关掉它：页间切换改为点击时加载，静态站点单页 100–500KB，CDN 首字
  // 节很快；省下的是不确定流量下的一次性多 MB 后台下载。
  router: {
    prefetchLinks: false,
  },
  head: [
    // VitePress leaves head hrefs untouched, so the base belongs here explicitly.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['link', { rel: 'stylesheet', href: `${base}reading.css` }],
    ['meta', { name: 'theme-color', content: '#3157c8' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'DSH 社区源码学习｜非官方中文导读' }],
    ['meta', { property: 'og:description', content: '面向 DSH 社区的非官方源码学习和生态研究材料：从首页分流到固定版本源文件，按步骤理解插件、工具和运行边界。' }],
    ['meta', { property: 'og:url', content: 'https://shine-233.github.io/deepseek-harness-study/' }],
    ['meta', { property: 'og:image', content: 'https://shine-233.github.io/deepseek-harness-study/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'DSH 社区源码学习｜非官方中文导读' }],
    ['meta', { name: 'twitter:description', content: '面向 DSH 社区的非官方源码学习材料：38 课 · 35 个离线实验 · 2,973 张逐文件索引卡。' }],
    ['meta', { name: 'twitter:image', content: 'https://shine-233.github.io/deepseek-harness-study/og-image.png' }],
    ['style', {}, siteStyle],
    ['script', {}, readingProgressScript],
    ['script', {}, scrollbarScript],
  ],
  cleanUrls: true,
  srcDir: '.generated',
  cacheDir: '.cache',
  outDir: '.dist',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        siteTitle: siteTitle('社区导读'),
        nav: [
          { text: '开始学习', link: landingLink('root', 'zh-study'), activeMatch: '^/study/(?:$|lessons/)' },
          { text: '最小示例', link: studyPageLink('study-examples/minimal-observer-plugin/README.zh.md'), activeMatch: '^/study/examples' },
          { text: '工具箱', link: studyPageLink('study/31-学习工具箱.md'), activeMatch: '^/study/lessons/31-' },
          { text: '逐文件索引', link: studyPageLink('study/文件索引/README.md'), activeMatch: '^/study/files' },
          { text: '入门', link: landingLink('root', guideModules.root.guide), activeMatch: '^/guide/' },
          ...moduleNav('root'),
        ],
        sidebar: {
          '/study/': studySidebar(),
          '/guide/': guideSidebar('root'),
          '/develop/': sidebar('root', 'zh-develop'),
          '/reference/': sidebar('root', 'zh-reference'),
        },
        outline: { label: '本页目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后核对' },
        footer: {
          message: `非官方学习仓库 · 发现文档问题？<a href="${STUDY_ISSUES_URL}">在 GitHub 提交反馈</a>。`,
          copyright: 'DSH Study · MIT License',
        },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        skipToContentLabel: '跳至内容',
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        siteTitle: siteTitle('Preview'),
        nav: [
          { text: '源码学习（中文）', link: landingLink('root', 'zh-study'), activeMatch: '^/study/' },
          { text: 'Guide', link: landingLink('en', guideModules.en.guide), activeMatch: '^/en/guide/' },
          ...moduleNav('en'),
        ],
        sidebar: {
          '/en/guide/': guideSidebar('en'),
          '/en/develop/': sidebar('en', 'en-develop'),
          '/en/reference/': sidebar('en', 'en-reference'),
        },
        editLink: {
          pattern: ({ frontmatter }: PageData) => {
            const data: unknown = frontmatter
            const editSource: unknown = typeof data === 'object' && data !== null ? Reflect.get(data, 'editSource') : undefined
            if (typeof editSource !== 'string') throw new Error('Projected documentation page has no editSource frontmatter.')
            const repository = editSource === 'START-HERE.md'
              || editSource.startsWith('study/')
              || editSource.startsWith('study-examples/')
              ? 'https://github.com/shine-233/deepseek-harness-study'
              : 'https://github.com/deepseek-ai/deepseek-harness'
            return `${repository}/edit/master/${editSource}`
          },
          text: 'Edit this page on GitHub',
        },
        outline: { label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last checked' },
        footer: {
          message: `Unofficial study repository · Found a documentation issue? <a href="${STUDY_ISSUES_URL}">Report it on GitHub</a>.`,
          copyright: 'DSH Study · MIT License',
        },
      },
    },
  },
  vite: {
    define: {
      // 首页拍立得的实验数：构建期计算，单一事实来源（门禁会与仓库事实对账）。
      __DSH_LAB_COUNT__: JSON.stringify(readdirSync(resolve(import.meta.dirname, '../public')).filter(name => name.endsWith('-lab.html')).length),
    },
    // `srcDir` puts the Vite root inside the disposable generated tree, whose
    // own `public/` no tracked asset can live in.
    publicDir: resolve(import.meta.dirname, '../public'),
    plugins: [
      {
        name: 'deepseek-harness-doc-projector',
        configureServer: watchCanonicalDocs,
      },
    ],
  },
  markdown: {
    config(md) {
      const renderText = md.renderer.rules.text
      const renderCode = md.renderer.rules.code_inline
      if (renderText === undefined || renderCode === undefined) {
        throw new Error('VitePress Markdown renderer is missing its text or inline-code rule.')
      }
      md.renderer.rules.text = (...args) => escapeVueInterpolation(renderText(...args))
      md.renderer.rules.code_inline = (...args) => escapeVueInterpolation(renderCode(...args))
    },
  },
  mermaid: {},
  themeConfig: sharedTheme,
})
