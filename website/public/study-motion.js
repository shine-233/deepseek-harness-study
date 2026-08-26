/**
 * 全站滚动编排引擎（自研微引擎，零依赖）。
 *
 * 借鉴 GSAP ScrollTrigger 的「进入视口 → 编排入场」语法，但只保留本站需要的
 * 子集：标题/表格/引用块按组错峰淡入上移。设计约束：
 * - 无 JS 时内容完全可见：初始隐藏态由 JS 加类，不写在 CSS 里。
 * - prefers-reduced-motion：整层静默，一个字节都不动。
 * - 跟随 VitePress 单页路由：MutationObserver 监听正文替换后重扫。
 */

const STYLE_ID = 'dsh-motion-style'

const CSS = `
[data-m] {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity var(--dur-slow, 420ms) var(--ease, ease),
    transform var(--dur-slow, 420ms) var(--ease, ease);
  transition-delay: calc(var(--motion-i, 0) * 70ms);
}
[data-m].m-in {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  [data-m] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
`

const SELECTOR = '.vp-doc h2, .vp-doc h3, .vp-doc blockquote, .vp-doc table'
const GROUP = 4

function ensureStyle(doc) {
  if (doc.getElementById(STYLE_ID)) return
  const link = doc.createElement('style')
  link.id = STYLE_ID
  link.textContent = CSS
  doc.head.append(link)
}

function scan(root) {
  const targets = root.querySelectorAll(SELECTOR)
  let index = 0
  for (const node of targets) {
    if (node.dataset.m !== undefined || node.closest('[data-m-off]')) continue
    node.dataset.m = ''
    // 同级连续元素共享一组错峰序号；翻页后从头计。
    node.style.setProperty('--motion-i', String(index % GROUP))
    index += 1
  }
  return targets
}

function observeAll(targets, observer) {
  for (const node of targets) {
    if (node.dataset.mBound === '1') continue
    node.dataset.mBound = '1'
    observer.observe(node)
  }
}

function install(doc) {
  if (!doc.body || doc.documentElement.dataset.motionInstalled === '1') return
  doc.documentElement.dataset.motionInstalled = '1'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ensureStyle(doc)
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('m-in')
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -8% 0px' })

  observeAll(scan(doc.body), observer)

  // 单页路由切换：正文容器被整体替换后重扫新内容。
  const watch = new MutationObserver(() => {
  observeAll(scan(doc.body), observer)

  // 打印/导出 PDF 时全量显形：没滚到的章节不能印成空白。
  window.addEventListener('beforeprint', () => {
    for (const node of doc.querySelectorAll('[data-m]')) node.classList.add('m-in')
  })
  })
  const main = doc.querySelector('.vp-doc')?.parentElement ?? doc.body
  watch.observe(main, { childList: true, subtree: true })
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => install(document))
  } else {
    install(document)
  }
}
