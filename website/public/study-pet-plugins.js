/**
 * 阿溟 2.0：把吉祥物的行为改造成 DSH 式插件，配一个可实时挂载/卸载的面板。
 *
 * 课程反复教「注册 → 效果 → 卸载即 dispose」（02 课 Cordis、11 课合规插件）。
 * 本模块让吉祥物本身成为这套架构的活模型：巡游、打盹、眼神跟随、拖拽四个
 * 行为各自是一个真正的插件——mount 注册监听与定时器，unmount 真实 dispose；
 * 面板里卸载「巡游」，阿溟立刻停下走回家。事件日志实时记录它收到的页面事件
 * （戳、判分、标记已读），对应 Session 日志的概念。
 *
 * 帧动画：mascot-sprite.js 的具名帧（待机/挥手/走路/开心/打盹）由本模块按
 * 行为切换，渲染约定与 study-companion.js 的 buildSpriteSvg 一致（眼睛格带
 * .dsh-comp-eye 类，眨眼 CSS 继续生效）。
 *
 * 与 study-companion.js 的关系：伴侣模块负责创建 #dsh-companion 与判分反应；
 * 本模块等它挂载后叠加行为层，不修改伴侣的文件。找不到宿主时静默退出。
 * 纯运行时模块（依赖真实 DOM 事件），导出注册表与日志纯函数供测试。
 */

import { MASCOT_FRAMES, MASCOT_PALETTE, MASCOT_GRID_W, buildMascotRects } from './mascot-sprite.js'

export const PET_PLUGINS = Object.freeze([
  Object.freeze({
    id: 'wander',
    name: '巡游',
    subscribes: '定时器 · 每 9–14 秒',
    effect: '沿页面底部慢慢走动，转身时翻转朝向',
  }),
  Object.freeze({
    id: 'eyetrack',
    name: '眼神跟随',
    subscribes: 'pointermove（整页）',
    effect: '瞳孔朝鼠标方向偏移一点',
  }),
  Object.freeze({
    id: 'nap',
    name: '打盹',
    subscribes: '定时器 · 无操作 45 秒',
    effect: '趴下打盹，冒出 zzZ；任何操作唤醒',
  }),
  Object.freeze({
    id: 'drag',
    name: '拖拽',
    subscribes: 'pointerdown / pointermove / pointerup',
    effect: '抓住阿溟拖到任意位置，位置记进 localStorage',
  }),
  Object.freeze({
    id: 'blinkoff',
    name: '眨眼',
    subscribes: '伴侣模块的 4.6 秒 CSS 循环',
    effect: '默认挂载；卸载后眼睛不再眨（dispose 视觉效果）',
  }),
])

/** 事件日志最多保留的条数（对应「Session 日志也有限」的直觉）。 */
export const LOG_LIMIT = 6

/**
 * 事件日志纯模型：push 新条目、超限丢最旧的。
 *
 * @param {string[]} log - 现有日志（最旧在前）。
 * @param {string} entry - 新条目。
 * @returns {string[]} 新日志数组。
 */
export function pushLog(log, entry) {
  return [...log, entry].slice(-LOG_LIMIT)
}

/**
 * 渲染一条日志条目文本；导出供测试断言措辞。
 *
 * @param {string} kind - 事件类型：poke | delight | done | mount | unmount。
 * @param {string} [detail]
 */
export function formatLogEntry(kind, detail = '') {
  const esc = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  const map = {
    poke: '收到戳一戳（click）',
    delight: '收到判分事件（dsh-study-delight）',
    done: '收到标记已读事件',
    mount: '挂载插件：' + detail,
    unmount: '卸载插件：' + detail + '，监听已 dispose',
  }
  const text = map[kind] ?? kind
  return esc(text)
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-petplugins-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-petplugins-style'
  style.textContent = [
    '#dsh-companion{transition:translate 1.6s ease;}',
    '#dsh-companion.dsh-pp-nap svg{transform:rotate(14deg) translateY(3px);}',
    '#dsh-companion.dsh-pp-nap .dsh-comp-eye{animation:none!important;}',
    '.dsh-pp-zzz{position:absolute;top:-16px;right:-4px;font-size:0.72rem;color:var(--vp-c-text-2);animation:dsh-pp-float 2.4s ease-in-out infinite;}',
    '@keyframes dsh-pp-float{0%,100%{transform:translateY(0);opacity:.7}50%{transform:translateY(-5px);opacity:1}}',
    '.dsh-pp-chip{position:absolute;top:-30px;right:0;padding:2px 9px;border:1px solid var(--vp-c-divider);border-radius:999px;',
      'background:var(--vp-c-bg-soft);color:var(--vp-c-text-2);font:inherit;font-size:0.7rem;cursor:pointer;}',
    '.dsh-pp-chip:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}',
    '.dsh-pp-panel{position:absolute;bottom:calc(100% + 8px);right:0;width:265px;max-height:70vh;overflow:auto;',
      'padding:12px 13px;border:1px solid var(--vp-c-divider);border-radius:10px;background:var(--vp-c-bg);',
      'box-shadow:0 10px 30px rgba(0,0,0,.14);text-align:left;z-index:30;}',
    '.dsh-pp-panel h4{margin:0 0 2px;font-size:0.8rem;color:var(--vp-c-text-1);}',
    '.dsh-pp-panel .dsh-pp-sub{margin:0 0 8px;font-size:0.68rem;color:var(--vp-c-text-2);line-height:1.5;}',
    '.dsh-pp-row{display:flex;align-items:center;gap:8px;padding:6px 0;border-top:1px solid var(--vp-c-divider);}',
    '.dsh-pp-row:first-of-type{border-top:0;}',
    '.dsh-pp-row b{font-size:0.78rem;color:var(--vp-c-text-1);flex:none;}',
    '.dsh-pp-row small{color:var(--vp-c-text-2);font-size:0.68rem;line-height:1.4;flex:1;}',
    '.dsh-pp-toggle{flex:none;position:relative;width:30px;height:16px;border-radius:999px;border:1px solid var(--vp-c-divider);',
      'background:var(--vp-c-bg-soft);cursor:pointer;padding:0;}',
    '.dsh-pp-toggle::after{content:"";position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:50%;',
      'background:var(--vp-c-text-2);transition:translate 120ms ease;}',
    '.dsh-pp-toggle[aria-pressed="true"]{background:var(--vp-c-brand-soft);border-color:var(--vp-c-brand-1);}',
    '.dsh-pp-toggle[aria-pressed="true"]::after{translate:14px 0;background:var(--vp-c-brand-1);}',
    '.dsh-pp-toggle:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}',
    '.dsh-pp-log{margin:8px 0 0;padding:8px 9px;border:1px dashed var(--vp-c-divider);border-radius:8px;',
      'font-family:var(--vp-font-family-mono);font-size:0.66rem;color:var(--vp-c-text-2);line-height:1.6;}',
    '.dsh-pp-log div{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.dsh-pp-log div:first-child{color:var(--vp-c-brand-1);}',
    '.dsh-pp-foot{margin:8px 0 0;font-size:0.66rem;color:var(--vp-c-text-2);line-height:1.5;}',
    '.dsh-pp-freeze-eyes .dsh-comp-eye{animation:none!important;}',
    '@media (prefers-reduced-motion:reduce){.dsh-pp-zzz{animation:none;}#dsh-companion{transition:none;}}',
  ].join('\n')
  doc.head.append(style)
}

/**
 * 创建宠物运行时：每个插件给出 mount/unmount，环境句柄全部可注入，
 * 便于在不依赖真实 DOM 的测试里断言 dispose 行为。
 *
 * @param {Record<string, (api: { root: HTMLElement, log: (kind: string, detail?: string) => void }) => () => void>} factories
 *   id → mount 工厂；工厂返回卸载函数（dispose）。
 * @param {{ root: HTMLElement, log: (kind: string, detail?: string) => void }} host
 */
export function createPetRuntime(factories, host) {
  const disposers = new Map()
  return {
    mounted: id => disposers.has(id),
    mount(id) {
      const factory = factories[id]
      if (!factory) throw new Error('未知插件：' + id)
      if (disposers.has(id)) return
      disposers.set(id, factory({ root: host.root, log: host.log }))
      host.log('mount', id)
    },
    unmount(id) {
      const dispose = disposers.get(id)
      if (!dispose) return
      disposers.delete(id)
      dispose()
      host.log('unmount', id)
    },
    disposeAll() {
      for (const id of [...disposers.keys()]) this.unmount(id)
    },
  }
}

function initializePetPlugins(doc) {
  const root = doc.getElementById('dsh-companion')
  if (!root || root.dataset.petplugins === 'true') return
  const svg = root.querySelector('svg')
  if (!svg) return
  root.dataset.petplugins = 'true'
  ensureStyle(doc)

  const reducedMotion = doc.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches
  const homeX = { value: null }

  // ---- 帧切换：按名字重绘精灵（渲染约定与伴侣的 buildSpriteSvg 一致） ----
  let baseFrame = 'idle'
  let tempTimer = null
  const setFrame = name => {
    const rects = buildMascotRects(MASCOT_FRAMES[name] ?? MASCOT_FRAMES.idle)
    const fresh = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
    fresh.setAttribute('viewBox', `0 0 ${MASCOT_GRID_W} ${MASCOT_FRAMES[name].length}`)
    fresh.setAttribute('role', 'img')
    fresh.setAttribute('aria-label', '像素吉祥物阿溟')
    for (const rect of rects) {
      const node = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
      node.setAttribute('x', String(rect.x))
      node.setAttribute('y', String(rect.y))
      node.setAttribute('width', String(rect.w))
      node.setAttribute('height', '1')
      node.setAttribute('fill', rect.fill)
      if (rect.eye) node.setAttribute('class', 'dsh-comp-eye')
      fresh.append(node)
    }
    svg.replaceChildren(...fresh.children)
    svg.setAttribute('viewBox', fresh.getAttribute('viewBox'))
  }
  /** 临时帧播完回到基础帧；reduced-motion 或重复触发时直接落定。 */
  const playTemp = (name, ms) => {
    if (reducedMotion) return
    clearTimeout(tempTimer)
    setFrame(name)
    tempTimer = setTimeout(() => setFrame(baseFrame), ms)
  }
  const setBase = name => {
    baseFrame = name
    clearTimeout(tempTimer)
    setFrame(name)
  }

  const logEntries = []
  const logEl = doc.createElement('div')
  logEl.className = 'dsh-pp-log'
  const renderLog = () => {
    logEl.replaceChildren(...logEntries.map(entry => {
      const line = doc.createElement('div')
      line.textContent = entry
      return line
    }))
  }
  const log = (kind, detail) => {
    logEntries.push(formatLogEntry(kind, detail))
    while (logEntries.length > LOG_LIMIT) logEntries.shift()
    renderLog()
  }

  // ---- 巡游：沿底部缓慢平移，走路帧与待机帧交替，转身翻转；拖拽期间让路 ----
  const shared = { dragging: false, pauseUntil: 0 }
  let wanderTimer = null
  let walkSwap = null
  let facing = 1
  const mountWander = api => {
    if (reducedMotion) return () => {}
    const step = () => {
      if (baseFrame === 'nap' || shared.dragging || Date.now() < shared.pauseUntil) {
        wanderTimer = setTimeout(step, 4000)
        return
      }
      setBase('walk')
      walkSwap = setTimeout(() => { if (baseFrame === 'walk') setFrame('idle') }, 700)
      api.root.style.translate = `${facing * (40 + Math.round(Math.random() * 90))}px 0`
      api.root.style.transform = facing === -1 ? 'scaleX(-1)' : ''
      facing = -facing
      wanderTimer = setTimeout(step, 9000 + Math.random() * 5000)
    }
    wanderTimer = setTimeout(step, 6000)
    return () => {
      clearTimeout(wanderTimer)
      clearTimeout(walkSwap)
      api.root.style.translate = ''
      api.root.style.transform = ''
      setBase('idle')
    }
  }

  // ---- 眼神跟随：pointermove 平移瞳孔（每次现查节点，换帧后仍有效） ----
  let eyeHandler = null
  const mountEyeTrack = api => {
    eyeHandler = event => {
      const eyes = api.root.querySelectorAll('.dsh-comp-eye')
      if (eyes.length === 0) return
      const rect = api.root.getBoundingClientRect()
      const dx = Math.max(-1.4, Math.min(1.4, (event.clientX - rect.left) / 60))
      const dy = Math.max(-1, Math.min(1, (event.clientY - rect.top) / 60))
      eyes.forEach(eye => { eye.style.translate = `${dx.toFixed(2)}px ${dy.toFixed(2)}px` })
    }
    doc.addEventListener('pointermove', eyeHandler)
    return () => {
      doc.removeEventListener('pointermove', eyeHandler)
      api.root.querySelectorAll('.dsh-comp-eye').forEach(eye => { eye.style.translate = '' })
    }
  }

  // ---- 打盹：45 秒无操作趴下（切打盹帧） ----
  let napTimer = null
  let zzz = null
  const wake = () => {
    if (baseFrame === 'nap') setBase('idle')
    root.classList.remove('dsh-pp-nap')
    if (zzz) { zzz.remove(); zzz = null }
    armNap()
  }
  const armNap = () => {
    clearTimeout(napTimer)
    napTimer = setTimeout(() => {
      setBase('nap')
      root.classList.add('dsh-pp-nap')
      zzz = doc.createElement('span')
      zzz.className = 'dsh-pp-zzz'
      zzz.textContent = 'zzZ'
      root.append(zzz)
    }, 45000)
  }
  const mountNap = api => {
    if (reducedMotion) return () => {}
    doc.addEventListener('pointerdown', wake, true)
    doc.addEventListener('keydown', wake, true)
    armNap()
    return () => {
      clearTimeout(napTimer)
      doc.removeEventListener('pointerdown', wake, true)
      doc.removeEventListener('keydown', wake, true)
      if (baseFrame === 'nap') setBase('idle')
      api.root.classList.remove('dsh-pp-nap')
      if (zzz) { zzz.remove(); zzz = null }
    }
  }

  // ---- 拖拽：pointer 拖动 + localStorage 持久化；拖拽期间巡游暂停 ----
  const mountDrag = api => {
    let startX = 0, startY = 0, baseX = 0, baseY = 0, dragging = false
    const saved = doc.defaultView.localStorage.getItem('dsh-pet-offset')
    if (saved) {
      try {
        const pos = JSON.parse(saved)
        api.root.style.translate = `${pos.x}px ${pos.y}px`
      } catch { /* 坏数据当作没存过 */ }
    }
    const down = event => {
      if (!event.composedPath().includes(api.root)) return
      dragging = true
      shared.dragging = true
      startX = event.clientX; startY = event.clientY
      const current = getComputedStyle(api.root).translate.split(' ')
      baseX = parseFloat(current[0]) || 0
      baseY = parseFloat(current[1]) || 0
    }
    const move = event => {
      if (!dragging) return
      api.root.style.translate = `${baseX + event.clientX - startX}px ${baseY + event.clientY - startY}px`
    }
    const up = event => {
      if (!dragging) return
      dragging = false
      shared.dragging = false
      // 放下手后给一段安定期，巡游不会立刻把阿溟拽离你放的位置。
      shared.pauseUntil = Date.now() + 12000
      doc.defaultView.localStorage.setItem('dsh-pet-offset',
        JSON.stringify({ x: baseX + event.clientX - startX, y: baseY + event.clientY - startY }))
    }
    doc.addEventListener('pointerdown', down)
    doc.addEventListener('pointermove', move)
    doc.addEventListener('pointerup', up)
    return () => {
      doc.removeEventListener('pointerdown', down)
      doc.removeEventListener('pointermove', move)
      doc.removeEventListener('pointerup', up)
      api.root.style.translate = ''
      doc.defaultView.localStorage.removeItem('dsh-pet-offset')
    }
  }

  // ---- 眨眼：伴侣模块的 CSS 循环；卸载插件 = 冻结眨眼（dispose 视觉效果） ----
  const mountBlink = api => {
    api.root.classList.remove('dsh-pp-freeze-eyes')
    return () => {
      api.root.classList.add('dsh-pp-freeze-eyes')
    }
  }

  const FACTORIES = {
    wander: mountWander,
    eyetrack: mountEyeTrack,
    nap: mountNap,
    drag: mountDrag,
    blinkoff: mountBlink,
  }

  const runtime = createPetRuntime(FACTORIES, { root, log })

  // ---- 面板 UI ----
  const chip = doc.createElement('button')
  chip.type = 'button'
  chip.className = 'dsh-pp-chip'
  chip.textContent = '插件'
  chip.setAttribute('aria-expanded', 'false')

  const panel = doc.createElement('div')
  panel.className = 'dsh-pp-panel'
  panel.hidden = true
  const title = doc.createElement('h4')
  title.textContent = '阿溟的插件面板'
  const sub = doc.createElement('p')
  sub.className = 'dsh-pp-sub'
  sub.textContent = '阿溟的每个行为都是一个插件：挂载时注册监听，卸载时真实 dispose。关掉「巡游」看它停下——这就是第 02 课讲的卸载语义。'
  panel.append(title, sub)

  const toggles = []
  for (const plugin of PET_PLUGINS) {
    const row = doc.createElement('div')
    row.className = 'dsh-pp-row'
    const name = doc.createElement('b')
    name.textContent = plugin.name
    const desc = doc.createElement('small')
    desc.textContent = plugin.effect + ' · 订阅：' + plugin.subscribes
    const toggle = doc.createElement('button')
    toggle.type = 'button'
    toggle.className = 'dsh-pp-toggle'
    toggle.dataset.plugin = plugin.id
    toggle.setAttribute('aria-pressed', 'true')
    toggle.setAttribute('aria-label', '挂载或卸载插件：' + plugin.name)
    toggle.addEventListener('click', () => {
      if (runtime.mounted(plugin.id)) {
        runtime.unmount(plugin.id)
        toggle.setAttribute('aria-pressed', 'false')
      } else {
        runtime.mount(plugin.id)
        toggle.setAttribute('aria-pressed', 'true')
      }
    })
    row.append(name, desc, toggle)
    panel.append(row)
    toggles.push(toggle)
  }
  panel.append(logEl)
  const foot = doc.createElement('p')
  foot.className = 'dsh-pp-foot'
  foot.textContent = '这套面板本身就是 DSH 插件架构的活模型：注册 → 效果 → 卸载即 dispose。事件日志对应第 05 课的 Session 日志。'
  panel.append(foot)

  chip.addEventListener('click', () => {
    const open = panel.hidden
    panel.hidden = !open
    chip.setAttribute('aria-expanded', String(open))
  })
  doc.addEventListener('click', event => {
    if (!panel.hidden && !panel.contains(event.target) && event.target !== chip) {
      panel.hidden = true
      chip.setAttribute('aria-expanded', 'false')
    }
  })

  root.append(chip, panel)

  // 默认全部挂载（眨眼插件默认挂载 = 保持伴侣的 CSS 循环可见）。
  for (const plugin of PET_PLUGINS) runtime.mount(plugin.id)

  // 事件日志：戳一戳与判分事件；同时播放对应帧（挥手 / 开心）。
  root.addEventListener('click', () => {
    log('poke')
    if (baseFrame !== 'nap') playTemp('wave', 900)
  })
  doc.addEventListener('dsh-study-delight', event => {
    const kind = event.detail?.kind ?? 'delight'
    log(kind === 'done' ? 'done' : 'delight')
    if (kind !== 'done' && baseFrame !== 'nap') playTemp('happy', 1400)
  })
}

if (typeof document !== 'undefined') {
  const boot = () => initializePetPlugins(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializePetPlugins(document), 200)
  }).observe(document.body, { childList: true, subtree: true })
}
