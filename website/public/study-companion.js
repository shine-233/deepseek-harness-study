/**
 * 课程页吉祥物伴侣「阿溟」：像素画精灵 + 台词气泡。
 *
 * 精灵数据与矩形构建的唯一来源是 `./mascot-sprite.js`（首页 JournalHome.vue
 * 打包的是同一份文件）；本模块只保留台词池和 DOM 渲染。所有 DOM 操作都在
 * 文件尾部的浏览器守卫里（与 study-progress.js 同一约定，无 DOM 导入门禁会
 * 检查这一点）。触发源：study-progress.js 在判分与"标记本课已读"时分发的
 * dsh-study-delight 事件；点击精灵本身也会随机说一句台词。
 */

import {
  MASCOT_GRID_W,
  MASCOT_PALETTE,
  MASCOT_SPRITE,
  buildMascotRects,
} from './mascot-sprite.js'

export { MASCOT_GRID_W, MASCOT_PALETTE, MASCOT_SPRITE, buildMascotRects }

/** 台词池：戳精灵、判分、标记已读各一组；句子要短，且只谈这页正在发生的事。 */
export const COMPANION_LINES = Object.freeze({
  poke: Object.freeze([
    '戳什么，我在数这一轮 Turn 有几个 Step。',
    '鲸鳍不是装饰，是平衡片——插件也一样，各管一层。',
    '今天也把工具乖乖收进作用域里了。',
    '已注册、可解析、执行允许……你又分清了一遍，很好。',
    '集章卡在首页，读完一课就去盖一枚。',
  ]),
  quizPerfect: Object.freeze([
    '满分！这个结论配得上它的证据。',
    '全对。出处链接我都替你记着呢。',
  ]),
  quizMixed: Object.freeze([
    '错几题没关系，解释和出处就写在每题下面。',
    '回去看一眼那一节，再练一轮就是了。',
  ]),
  done: Object.freeze([
    '这课收进你的进度里了，证据链又长了一格。',
    '已读标记落袋。下一跳想好去哪了吗？',
  ]),
  stuck: Object.freeze([
    '连错{misses}道？先看「{src}」。',
    '别硬猜，线索在「{src}」里。',
  ]),
})

/* ---------- 浏览器侧：精灵挂载、台词气泡与事件响应 ---------- */

const COMPANION_ID = 'dsh-companion'
const STYLE_ID = 'dsh-companion-style'

/** 课程页与示例页出现；首页、逐文件索引和实验室总览都不打扰。 */
function companionShouldShow() {
  const path = location.pathname
  return path.includes('/study/') && !path.includes('/files/') && !path.endsWith('/study/')
}

function pickLine(pool) {
  return pool[Math.floor(Math.random() * pool.length)]
}

function ensureStyle(doc) {
  if (doc.getElementById(STYLE_ID) !== null) return
  const style = doc.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
#dsh-companion { position: fixed; right: 16px; bottom: 78px; z-index: 24; display: none; }
#dsh-companion.is-on { display: block; }
#dsh-companion .dsh-comp-btn { display: block; border: 0; background: transparent; padding: 4px; cursor: pointer; }
#dsh-companion svg { display: block; width: 68px; height: auto; filter: drop-shadow(0 3px 6px rgba(38,34,26,.18)); }
#dsh-companion .dsh-comp-eye { transform-box: fill-box; transform-origin: center; animation: dsh-blink 4.6s infinite; }
@keyframes dsh-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(.12); } }
#dsh-companion.is-cheer svg { animation: dsh-hop .62s ease-in-out 2; }
@keyframes dsh-hop { 0%,100% { transform: translateY(0); } 35% { transform: translateY(-7px); } 65% { transform: translateY(-2px); } }
#dsh-companion .dsh-comp-bubble {
  position: absolute; right: 0; bottom: calc(100% + 10px); width: max-content; max-width: 216px;
  padding: 8px 11px; border: 1px solid var(--vp-c-brand-soft, #dfe7ff); border-radius: 10px;
  background: var(--vp-c-bg-elv, #fffdf7); color: var(--vp-c-text-1, #2a2a2e);
  font-size: 12px; line-height: 1.55; box-shadow: 0 6px 18px rgba(38,34,26,.12);
  opacity: 0; translate: 0 4px; transition: opacity .22s ease, translate .22s ease; pointer-events: none;
}
#dsh-companion .dsh-comp-bubble.is-open { opacity: 1; translate: 0 0; }
@media (max-width: 640px) { #dsh-companion svg { width: 54px; } }
@media (prefers-reduced-motion: reduce) {
  #dsh-companion .dsh-comp-eye { animation: none; }
  #dsh-companion.is-cheer svg { animation: none; }
}
@media print { #dsh-companion { display: none !important; } }
`
  doc.head.append(style)
}

function buildSpriteSvg(doc, rects) {
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', `0 0 ${MASCOT_GRID_W} ${MASCOT_SPRITE.length}`)
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', '像素画吉祥物阿溟')
  for (const rect of rects) {
    const node = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
    node.setAttribute('x', String(rect.x))
    node.setAttribute('y', String(rect.y))
    node.setAttribute('width', String(rect.w))
    node.setAttribute('height', '1')
    node.setAttribute('fill', rect.fill)
    if (rect.eye) node.setAttribute('class', 'dsh-comp-eye')
    svg.append(node)
  }
  return svg
}

let bubbleTimer = 0

/** 把题目出处（study/NN-标题.md#锚点）缩成气泡里读得懂的「NN · 锚点」。 */
function shortSource(source) {
  const withoutDir = String(source).replace(/^study\//, '')
  const [file, anchor] = withoutDir.split('#')
  const number = file.match(/^(\d+)/)
  if (anchor !== undefined && number !== null) return `${number[1]} · ${anchor}`
  if (anchor !== undefined) return anchor
  return file
}

function stuckLine(template, detail) {
  return template
    .replaceAll('{misses}', String(detail.misses ?? 2))
    .replaceAll('{src}', shortSource(typeof detail.source === 'string' ? detail.source : ''))
}

function say(root, text, reducedMotion) {
  const bubble = root.querySelector('.dsh-comp-bubble')
  if (bubble === null) return
  bubble.textContent = text
  bubble.classList.add('is-open')
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => bubble.classList.remove('is-open'), reducedMotion ? 6000 : 4200)
}

function cheer(root, reducedMotion) {
  if (reducedMotion) return
  root.classList.add('is-cheer')
  setTimeout(() => root.classList.remove('is-cheer'), 1400)
}

function initializeCompanion(doc) {
  ensureStyle(doc)
  const root = doc.createElement('div')
  root.id = COMPANION_ID
  const button = doc.createElement('button')
  button.type = 'button'
  button.className = 'dsh-comp-btn'
  button.setAttribute('aria-label', '戳一下吉祥物阿溟')
  button.append(buildSpriteSvg(doc, buildMascotRects()))
  const bubble = doc.createElement('div')
  bubble.className = 'dsh-comp-bubble'
  bubble.setAttribute('role', 'status')
  root.append(bubble, button)
  doc.body.append(root)

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  button.addEventListener('click', () => say(root, pickLine(COMPANION_LINES.poke), reducedMotion))

  document.addEventListener('dsh-study-delight', (event) => {
    const detail = event.detail ?? {}
    if (detail.kind === 'quiz') {
      if (detail.score === detail.total) {
        say(root, pickLine(COMPANION_LINES.quizPerfect), reducedMotion)
        cheer(root, reducedMotion)
      } else {
        say(root, pickLine(COMPANION_LINES.quizMixed), reducedMotion)
      }
    } else if (detail.kind === 'done') {
      say(root, pickLine(COMPANION_LINES.done), reducedMotion)
      cheer(root, reducedMotion)
    } else if (detail.kind === 'stuck') {
      say(root, stuckLine(pickLine(COMPANION_LINES.stuck), detail), reducedMotion)
    }
  })

  // VitePress 单页路由：跟 study-progress 同一套去抖观察，路径不对就藏起来。
  let timer = 0
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      root.classList.toggle('is-on', companionShouldShow())
    }, 160)
  }).observe(document.body, { childList: true, subtree: true })

  requestAnimationFrame(() => root.classList.toggle('is-on', companionShouldShow()))
}

if (typeof document !== 'undefined') {
  const start = () => initializeCompanion(document)
  if (document.readyState === 'complete') start()
  else addEventListener('load', start, { once: true })
}