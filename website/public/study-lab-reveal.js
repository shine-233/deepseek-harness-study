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

function reducedMotion() {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 给一棵 SVG 里的标记排进场顺序。
 *
 * @param root 包含标记的元素；它的子孙里带 data-reveal 的会被逐个放行。
 * @param stagger 相邻标记之间的间隔毫秒；总时长上限 600ms，标记再多也不会拖长。
 */
export function revealMarks(root, stagger = 6) {
  const marks = [...root.querySelectorAll('[data-reveal]')]
  if (marks.length === 0) return
  if (reducedMotion()) {
    for (const mark of marks) mark.classList.add(REVEAL_CLASS)
    return
  }
  const step = Math.min(stagger, 600 / marks.length)
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
