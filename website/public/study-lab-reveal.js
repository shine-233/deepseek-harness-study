/**
 * 图表进场动画：元素滚进视口时从 0 长到目标值。
 *
 * 纯装饰，不编码任何数值。动画结束后图与不做动画时完全一致，所以关掉它不损失
 * 任何信息——`prefers-reduced-motion` 下 token 层已把四档时长归零，这里再直接
 * 跳到终态，连一次重排都不做。
 *
 * 时长和曲线取自 study-tokens.css 的 --dur-enter / --ease，不在这里写数字；
 * 各处各写一个 transition 是整站手感散的原因。
 */

const REVEAL_CLASS = 'is-revealed'
const PENDING_CLASS = 'awaits-reveal'

/** 错峰总时长上限，与 revealMarks 里的 600 / marks.length 对应。 */
const MAX_STAGGER_MS = 600

/**
 * 读 --dur-enter，用于决定何时可以安全清掉行内的错峰延迟。
 *
 * 时长的唯一归属是 study-tokens.css；这里只读，不复制数字。读不到就按 0 处理——
 * 那种情况下没有过渡，也就没有需要等待的动画。
 */
function enterDurationMs() {
  if (typeof getComputedStyle !== 'function') return 0
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--dur-enter').trim()
  if (raw === '') return 0
  const value = Number.parseFloat(raw)
  if (!Number.isFinite(value)) return 0
  return raw.endsWith('ms') ? value : value * 1000
}

function reducedMotion() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 给一棵 SVG 里的标记排进场顺序。
 *
 * @param root 包含标记的元素；它的子孙里带 data-reveal 的会被逐个放行。
 * @param stagger 相邻标记之间的间隔毫秒；错峰总时长不超过 MAX_STAGGER_MS，标记再多也不会拖长。
 */
export function revealMarks(root, stagger = 6) {
  const marks = [...root.querySelectorAll('[data-reveal]')]
  if (marks.length === 0) return
  if (reducedMotion()) {
    for (const mark of marks) mark.classList.add(REVEAL_CLASS)
    return
  }
  const step = Math.min(stagger, MAX_STAGGER_MS / marks.length)
  for (const [index, mark] of marks.entries()) {
    mark.classList.add(PENDING_CLASS)
    // 用 delay 而不是逐个 setTimeout：整批只交一次给合成器。
    mark.style.transitionDelay = String(Math.round(index * step)) + 'ms'
  }

  // 起始态是 opacity 0，所以放行这一步绝不能只挂在 requestAnimationFrame 上：
  // 后台标签页、被节流的合成器、或不合成画面的嵌入环境里 rAF 可能一直不触发，
  // 那样整张图会停在全透明——看起来就是一张空白的图。定时器兜底保证一定放行，
  // 两条路径都做成幂等的。
  let released = false
  const release = () => {
    if (released) return
    released = true
    for (const mark of marks) {
      mark.classList.remove(PENDING_CLASS)
      mark.classList.add(REVEAL_CLASS)
    }
    // 错峰只属于这一次进场。这些标记随后每次交互都会改类（时间轴推进会切
    // is-past/is-current/is-future），行内 delay 留着的话，最后一个标记的状态更新
    // 会比第一个晚将近 --dur-enter 的时间，一次点击看起来像是分批响应的。
    // 等这一轮过渡跑完再清，清除本身不会打断进场。
    setTimeout(() => {
      for (const mark of marks) mark.style.transitionDelay = ''
    }, MAX_STAGGER_MS + enterDurationMs())
  }
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(release)
  setTimeout(release, 60)
}

/**
 * 元素首次进入视口时调用一次 onEnter，然后停止观察。
 *
 * 没有 IntersectionObserver 时立即调用——降级是「直接显示」，不是「永不显示」。
 */
export function onFirstVisible(element, onEnter) {
  if (typeof IntersectionObserver !== 'function') {
    onEnter()
    return
  }
  let entered = false
  const enterOnce = () => {
    if (entered) return
    entered = true
    observer.disconnect()
    onEnter()
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) enterOnce()
    }
  }, { threshold: 0.12 })
  observer.observe(element)
  // 兜底：观察器在某些嵌入环境里不回调，2 秒后无论如何显示出来。
  // 迟到的动画比永远看不见的图好。
  setTimeout(enterOnce, 2000)
}

/**
 * 把一个图容器接上「滚进视口才播进场」。
 * 重复调用是幂等的：已经放行过的容器不再观察。
 */
export function revealOnScroll(container, stagger) {
  if (container === null || container === undefined) return
  if (container.dataset.revealBound === 'true') {
    revealMarks(container, stagger)
    return
  }
  container.dataset.revealBound = 'true'
  onFirstVisible(container, () => revealMarks(container, stagger))
}
