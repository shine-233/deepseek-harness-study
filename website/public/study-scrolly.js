/**
 * 课程页的滚动引导（scrollytelling）。
 *
 * 课程正文里放一个空容器 `<div data-scrolly="turn-flow">`，本模块把它变成
 * 左图右文的滚动叙事：左侧是 Turn 轨迹图（数据来自 turn-flow-model 的纯函数，
 * 与实验页同一份），右侧六张卡片随滚动逐段推进轨迹的可见范围。
 *
 * 边界与实验页一致：横轴是步骤序号，不是时间；没有真实 token、耗时或模型输出。
 * 不写存储、不联网；reduced-motion 下不做过渡动画。
 */

import { TURN_LANES, buildTurnModel } from './turn-flow-model.js'

const LANE_LABELS = Object.freeze({
  user: '用户',
  context: '上下文装配',
  model: '模型',
  tool: '工具',
  session: 'Session 日志',
})

const STYLE = `
.dsh-scrolly { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 4fr); gap: 20px; margin: 24px 0; }
.dsh-scrolly-stage { position: sticky; top: calc(var(--vp-nav-height, 64px) + 16px); align-self: start;
  border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 12px; background: var(--vp-c-bg-soft); }
.dsh-scrolly-stage svg { display: block; width: 100%; height: auto; }
.dsh-scrolly-beats { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.dsh-scrolly-beat { border: 1px solid var(--vp-c-divider); border-left: 3px solid var(--vp-c-divider);
  border-radius: 10px; padding: 12px 16px; background: var(--vp-c-bg); cursor: pointer; text-align: left;
  font: inherit; color: inherit; opacity: .55; transition: opacity .25s ease, border-color .25s ease; }
.dsh-scrolly-beat[aria-current="true"] { opacity: 1; border-left-color: var(--vp-c-brand-1); }
.dsh-scrolly-beat h4 { margin: 0 0 6px; font-size: 15px; border: none; padding: 0; }
.dsh-scrolly-beat p { margin: 0; font-size: 13.5px; line-height: 1.65; color: var(--vp-c-text-2); }
@media (max-width: 768px) { .dsh-scrolly { grid-template-columns: 1fr; } .dsh-scrolly-stage { position: static; } }
@media (prefers-reduced-motion: reduce) { .dsh-scrolly-beat { transition: none; } }
`

const BEATS = [
  { upTo: 3, title: '三份输入进入第一次请求',
    text: '用户输入、system prompt 与历史投影各占一步。它们既写入日志，又出现在模型请求里——图上每个这样的点都会被一条配对线连起来。' },
  { upTo: 5, title: '第一次工具调用之前，先落日志',
    text: '模型请求调用 read_file。注意顺序：调用参数先写入 Session 日志，然后工具才执行。' },
  { upTo: 8, title: '结果带回模型',
    text: 'read_file 执行完毕，结果写入日志；第二次模型请求把这份结果带回给模型。同一份载荷在横轴上出现两次，连线就是它的一致性凭证。' },
  { upTo: 13, title: '失败也是事实',
    text: 'write_summary 第一次执行失败。失败结果同样写入日志、同样被带回模型——这里不会假装工具成功了。' },
  { upTo: 16, title: '重试成功',
    text: '重试拿到新结果，以新的载荷身份写入日志并回到模型。失败与成功两份事实都留在轨迹上，谁也没有覆盖谁。' },
  { upTo: 19, title: 'Turn 收尾',
    text: '模型给出最终回答，回答写入日志，Turn 关闭。回头看整条轨迹：凡进入模型请求的内容，都能在日志一侧找到自己的出处。' },
]

const NS = 'http://www.w3.org/2000/svg'

function svgElement(name, attributes) {
  const element = document.createElementNS(NS, name)
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value))
  return element
}

function dotClassFor(entry) {
  if (entry.modelVisible && entry.logged) return 'both'
  return entry.modelVisible ? 'visible-only' : 'logged-only'
}

/** 渲染轨迹到指定步：范围内的点全亮，配对线只在两端都可见时画出。 */
function renderStage(svg, model, upTo) {
  const width = 520
  const rowHeight = 52
  const height = 40 + TURN_LANES.length * rowHeight
  const padX = 96
  const padRight = 24
  const maxIndex = model.steps.length - 1
  const xFor = index => padX + (index * (width - padX - padRight)) / Math.max(maxIndex, 1)
  const yFor = lane => 28 + TURN_LANES.indexOf(lane) * rowHeight

  svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height)
  svg.replaceChildren()

  for (const lane of TURN_LANES) {
    const label = svgElement('text', { x: 10, y: yFor(lane) + 4, class: 'lane-label' })
    label.textContent = LANE_LABELS[lane] ?? lane
    svg.append(label)
    const rule = svgElement('line', {
      x1: padX - 14, x2: width - padRight + 8, y1: yFor(lane), y2: yFor(lane),
      class: 'lane-rule',
    })
    svg.append(rule)
  }

  const visible = model.steps.filter(step => step.index <= upTo)
  const byPayload = new Map()
  for (const step of visible) {
    if (step.payloadId === null) continue
    const list = byPayload.get(step.payloadId) ?? []
    list.push(step)
    byPayload.set(step.payloadId, list)
  }
  for (const occurrences of byPayload.values()) {
    for (let i = 0; i + 1 < occurrences.length; i += 1) {
      const a = occurrences[i]
      const b = occurrences[i + 1]
      svg.append(svgElement('line', {
        x1: xFor(a.index), y1: yFor(a.lane), x2: xFor(b.index), y2: yFor(b.lane),
        class: 'pair-line',
      }))
    }
  }

  for (const step of visible) {
    svg.append(svgElement('circle', {
      cx: xFor(step.index), cy: yFor(step.lane), r: 6,
      class: 'dot ' + dotClassFor(step),
    }))
    const tag = svgElement('text', {
      x: xFor(step.index), y: yFor(step.lane) - 11, class: 'dot-index', 'text-anchor': 'middle',
    })
    tag.textContent = String(step.index)
    svg.append(tag)
  }
}

const STAGE_STYLE = `
.dsh-scrolly-stage .lane-label { font-size: 12px; fill: var(--vp-c-text-2); }
.dsh-scrolly-stage .lane-rule { stroke: var(--vp-c-divider); stroke-dasharray: 2 4; }
.dsh-scrolly-stage .pair-line { stroke: var(--vp-c-brand-1); stroke-opacity: .55; stroke-width: 1.5; }
.dsh-scrolly-stage .dot.both { fill: var(--vp-c-brand-1); }
.dsh-scrolly-stage .dot.logged-only { fill: var(--vp-c-text-3); }
.dsh-scrolly-stage .dot.visible-only { fill: var(--vp-c-danger-1); }
.dsh-scrolly-stage .dot-index { font-size: 9px; fill: var(--vp-c-text-3); }
`

let stageStyleInstalled = false

function installStyles() {
  if (stageStyleInstalled) return
  stageStyleInstalled = true
  const style = document.createElement('style')
  style.textContent = STYLE + STAGE_STYLE
  document.head.append(style)
}

function buildContainer(container) {
  const model = buildTurnModel({ scenario: 'two-tools' })

  const stage = document.createElement('div')
  stage.className = 'dsh-scrolly-stage'
  const figureLabel = document.createElement('p')
  figureLabel.style.cssText = 'margin:0 0 8px;font-size:12.5px;color:var(--vp-c-text-2)'
  figureLabel.textContent = '横轴是步骤序号，不是时间。蓝点＝进模型且记日志，灰点＝只记日志，红点＝只进模型；蓝线是同一份载荷的配对。'
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', 'Turn 步骤轨迹图：五条参与方泳道上的有序步骤')
  stage.append(figureLabel, svg)

  const beats = document.createElement('ul')
  beats.className = 'dsh-scrolly-beats'

  container.replaceChildren(stage, beats)

  const buttons = []
  let currentUpTo = -1
  const activate = index => {
    const beat = BEATS[index]
    if (beat === undefined || beat.upTo === currentUpTo) return
    currentUpTo = beat.upTo
    renderStage(svg, model, beat.upTo)
    for (const [buttonIndex, button] of buttons.entries()) {
      button.setAttribute('aria-current', buttonIndex === index ? 'true' : 'false')
    }
  }

  BEATS.forEach((beat, index) => {
    const item = document.createElement('li')
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'dsh-scrolly-beat'
    const heading = document.createElement('h4')
    heading.textContent = '第 ' + String(index + 1) + ' 段 · ' + beat.title
    const body = document.createElement('p')
    body.textContent = beat.text
    button.append(heading, body)
    button.addEventListener('click', () => activate(index))
    item.append(button)
    beats.append(item)
    buttons.push(button)
  })

  if (typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const index = buttons.indexOf(entry.target)
        if (index >= 0) activate(index)
      }
    }, { rootMargin: '-35% 0px -45% 0px' })
    for (const button of buttons) observer.observe(button)
  } else {
    activate(0)
  }
  activate(0)
}

if (typeof document !== 'undefined') {
  installStyles()
  const mount = () => {
    for (const container of document.querySelectorAll('[data-scrolly="turn-flow"]')) {
      if (container.dataset.scrollyReady === 'true') continue
      container.dataset.scrollyReady = 'true'
      buildContainer(container)
    }
  }
  mount()
  // VitePress 单页路由切换后正文整体替换，重新扫描一遍容器。
  new MutationObserver(() => mount()).observe(document.body, { childList: true, subtree: true })
}
