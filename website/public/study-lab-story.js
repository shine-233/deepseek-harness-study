/**
 * 实验室的叙事节拍导航（scrollytelling-lite）：
 *
 * 自动收集主内容区各卡片的标题作为「节拍」，在首屏下方渲染一条可点击的
 * 节拍带；滚动时 IntersectionObserver 高亮当前节拍，点击平滑滚到对应卡片。
 * 这是 Distill/r2d3 式滚动叙事的轻量版：不改版式、不加依赖，只给长页面
 * 一个「读到哪一拍」的持续可见位置感。
 *
 * 无障碍：节拍是按钮（可 Tab、Enter 触发）；高亮写 aria-current；
 * prefers-reduced-motion 下点击改为瞬时跳转，不做平滑滚动。
 */

export function installStoryRail() {
  if (typeof document === 'undefined') return
  const main = document.querySelector('main.lab-shell')
  if (main === null) return

  const cards = [...main.querySelectorAll(':scope > section.card')]
  if (cards.length < 3) return

  const sections = []
  cards.forEach((section, index) => {
    if (!section.id) section.id = 'story-beat-' + String(index + 1)
    const heading = section.querySelector('.section-heading h2')
      ?? section.querySelector('h2')
      ?? section.querySelector('caption')
    const title = (heading?.textContent ?? section.getAttribute('aria-label') ?? '').trim()
    if (title.length === 0) return
    sections.push({ id: section.id, title: title.replace(/^#+\s*/, ''), section })
  })
  if (sections.length < 3) return

  const rail = document.createElement('nav')
  rail.className = 'story-rail'
  rail.setAttribute('aria-label', '本页节拍')
  const buttons = new Map()
  sections.forEach((beat, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'story-beat'
    const num = document.createElement('span')
    num.className = 'story-beat-num'
    num.textContent = String(index + 1)
    const label = document.createElement('span')
    label.textContent = beat.title
    button.append(num, label)
    button.addEventListener('click', () => {
      beat.section.scrollIntoView({
        behavior: typeof window.matchMedia === 'function'
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    rail.append(button)
    buttons.set(beat.id, button)
  })

  const hero = main.querySelector('.hero-panel')
  if (hero === null) { main.prepend(rail); } else { hero.after(rail) }

  // 无 IntersectionObserver 的环境（Node 冒烟垫片）跳过高亮，导航按钮仍可用。
  if (typeof IntersectionObserver !== 'function') return

  const observer = new IntersectionObserver(entriesList => {
    for (const entry of entriesList) {
      if (!entry.isIntersecting) continue
      for (const [id, button] of buttons) {
        const active = id === entry.target.id
        button.classList.toggle('is-active', active)
        if (active) button.setAttribute('aria-current', 'step')
        else button.removeAttribute('aria-current')
      }
    }
  }, { rootMargin: '-25% 0px -60% 0px' })

  for (const beat of sections) observer.observe(beat.section)
}
