/**
 * 零跳步概念阶梯（Ciechanowski 式教学序列）的共享原语。
 *
 * 一个阶梯是一串台阶：每级台阶只讲一个概念，配一个可以真实交互的微模拟，
 * 台阶之间的散文不超过四句。下一级在读者与当前模拟发生一次真实交互之前保持
 * 折叠——概念链条不允许跳步，急躁的读者可以用「展开全部」自行跳级，这是
 * 逃逸门而不是默认路径。
 *
 * 契约：
 * - `rungs[i].build(host, api)` 在该级首次展开时调用一次，返回 sim 对象；
 *   `api.engage()` 表示读者完成了本级的必要交互，解锁下一级；
 *   `api.everyFrame(fn)` 申请逐帧回调，返回停帧函数；台阶滚出视口时暂停，
 *   回到视口自动恢复；`api.reducedMotion` 为 true 时模拟应直接呈现终态。
 * - sim 可选实现 `dispose()`，在 `destroy()` 时统一调用。
 */

import { prefersReducedMotion, writeText } from './study-lab-kit.js'

const LADDER_STORE_PREFIX = 'dsh-ladder:'

/**
 * 阶梯样式表按需注入一次：所有接入阶梯的实验室共用这份 .ladder-* 规则，
 * 页面外壳不必各自 <link>；CSP style-src 'self' 放行同源样式表。
 */
function ensureLadderStyles(doc = document) {
  if (doc.getElementById('dsh-ladder-styles') !== null) return
  const link = doc.createElement('link')
  link.id = 'dsh-ladder-styles'
  link.rel = 'stylesheet'
  link.href = './study-lab-ladder.css'
  doc.head.append(link)
}

export function createConceptLadder(root, options = {}) {
  ensureLadderStyles(root.ownerDocument ?? document)
  const rungs = options.rungs ?? []
  const storageKey = typeof options.storageKey === 'string' ? LADDER_STORE_PREFIX + options.storageKey : null
  const reducedMotion = prefersReducedMotion()
  const sims = new Array(rungs.length).fill(null)
  const frameStops = new Array(rungs.length).fill(null)
  const observers = []
  let unlocked = readUnlocked()
  let destroyed = false

  const list = document.createElement('ol')
  list.className = 'ladder'
  root.replaceChildren(list)
  const sections = rungs.map((rung, index) => buildRung(rung, index))

  const skipAll = document.createElement('button')
  skipAll.type = 'button'
  skipAll.className = 'button button-quiet ladder-skip'
  writeSkipLabel()
  skipAll.addEventListener('click', () => {
    if (unlocked >= rungs.length - 1) {
      unlocked = 0
      for (let i = 1; i < rungs.length; i += 1) collapse(i)
    } else {
      while (unlocked < rungs.length - 1) open(unlocked + 1, { focus: false })
    }
    writeUnlocked()
    writeSkipLabel()
  })
  root.prepend(skipAll)

  syncStates()

  function readUnlocked() {
    if (storageKey === null) return 0
    try {
      const saved = Number(sessionStorage.getItem(storageKey))
      return Number.isInteger(saved) && saved >= 0 && saved < rungs.length ? saved : 0
    } catch {
      return 0
    }
  }

  function writeUnlocked() {
    if (storageKey === null) return
    try { sessionStorage.setItem(storageKey, String(unlocked)) } catch { /* 存不进去就只在内存里。 */ }
  }

  function writeSkipLabel() {
    writeText(skipAll, unlocked >= rungs.length - 1 ? '收起后面的台阶' : '展开全部台阶')
    skipAll.hidden = rungs.length < 2
  }

  function buildRung(rung, index) {
    const li = document.createElement('li')
    li.className = 'ladder-rung'
    li.dataset.rung = String(index)

    const head = document.createElement('div')
    head.className = 'ladder-rung-head'
    const no = document.createElement('span')
    no.className = 'ladder-step-no'
    no.setAttribute('aria-hidden', 'true')
    writeText(no, String(index + 1))
    const title = document.createElement('h3')
    title.className = 'ladder-title'
    writeText(title, rung.title)
    head.append(no, title)
    li.append(head)

    const body = document.createElement('div')
    body.className = 'ladder-rung-body'
    if (typeof rung.text === 'string' && rung.text.length > 0) {
      const p = document.createElement('p')
      p.className = 'ladder-text'
      writeText(p, rung.text)
      body.append(p)
    }
    const host = document.createElement('div')
    host.className = 'ladder-sim'
    body.append(host)
    li.append(body)

    if (index > 0) {
      head.addEventListener('click', () => {
        if (index <= unlocked) return
        pulse(head)
      })
    }
    list.append(li)
    return { li, body, host, head }
  }

  function pulse(element) {
    element.classList.remove('ladder-pulse')
    void element.offsetWidth
    element.classList.add('ladder-pulse')
  }

  function open(index, { focus = true } = {}) {
    if (destroyed || index <= unlocked) return
    unlocked = index
    writeUnlocked()
    writeSkipLabel()
    const section = sections[index]
    mount(index)
    section.li.dataset.state = 'open'
    if (reducedMotion !== true) pulse(section.li)
    syncStates()
    // Node 冒烟垫片可能没有 scrollIntoView；滚动只是聚焦增强，缺了就跳过。
    if (focus && typeof section.head.scrollIntoView === 'function') {
      section.head.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  function collapse(index) {
    const section = sections[index]
    stopFrames(index)
    section.li.dataset.state = 'locked'
    section.body.hidden = true
  }

  function mount(index) {
    if (sims[index] !== null || destroyed) return
    const section = sections[index]
    const api = {
      reducedMotion,
      engage: () => {
        if (destroyed) return
        sections[index].li.dataset.state = 'done'
        if (index + 1 < rungs.length && index + 1 > unlocked) open(index + 1)
        else syncStates()
      },
      everyFrame: fn => startFrames(index, fn),
    }
    sims[index] = rungs[index].build(section.host, api) ?? {}
    if (typeof sims[index].dispose !== 'function') sims[index].dispose = () => {}
  }

  function startFrames(index, fn) {
    stopFrames(index)
    if (destroyed || typeof fn !== 'function') return () => {}
    // 无 requestAnimationFrame 的环境（Node 冒烟垫片）：同步跑一帧后不再循环。
    if (typeof requestAnimationFrame !== 'function') { fn(0); return () => {} }
    let raf = 0
    let visible = true
    const tick = now => {
      if (!visible || destroyed) { raf = 0; return }
      fn(now)
      raf = requestAnimationFrame(tick)
    }
    frameStops[index] = () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      raf = 0
    }
    raf = requestAnimationFrame(tick)
    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting)
        if (visible && raf === 0 && !destroyed) raf = requestAnimationFrame(tick)
      }, { threshold: 0.05 })
      observer.observe(sections[index].host)
      observers.push(observer)
    }
    return () => { frameStops[index]?.(); frameStops[index] = null }
  }

  function stopFrames(index) {
    frameStops[index]?.()
    frameStops[index] = null
  }

  function syncStates() {
    sections.forEach((section, index) => {
      section.li.dataset.state = index === 0 || index <= unlocked ? (index < unlocked || isDone(index) ? 'done' : 'open') : 'locked'
      section.body.hidden = index > unlocked
      if (index <= unlocked) mount(index)
    })
  }

  function isDone(index) {
    return index === 0 ? unlocked > 0 : false
  }

  return {
    get unlocked() { return unlocked },
    goto: index => open(Math.max(1, Math.min(rungs.length - 1, index))),
    revealAll() { while (unlocked < rungs.length - 1) open(unlocked + 1, { focus: false }) },
    destroy() {
      destroyed = true
      for (const stop of frameStops) stop?.()
      for (const observer of observers) observer.disconnect()
      for (const sim of sims) sim?.dispose?.()
      observers.length = 0
      root.replaceChildren()
    },
  }
}
