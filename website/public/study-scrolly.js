/**
 * 课程页的滚动引导（scrollytelling）。
 *
 * 课程正文里放一个空容器 `<div data-scrolly="场景名">`，本模块把它变成左图右文
 * 的滚动叙事：左侧是随滚动推进的粘性舞台，右侧卡片逐段激活。场景以数据驱动方式
 * 注册在 SCENARIOS 表里；本文件自带 turn-flow 场景（数据来自 turn-flow-model，
 * 与实验页同一份纯函数），其余场景定义在 study-scrolly-beats.js，与各自的实验页
 * 共用同一批模型模块。
 *
 * 边界与实验页一致：坐标轴都是离散步骤或事件序号，不是时间；没有真实 token、
 * 耗时或模型输出。不写存储、不联网；reduced-motion 下不做过渡动画。
 */

import { TURN_LANES, buildTurnModel } from './turn-flow-model.js'
import { COMPACTION_SCROLLY, CORDIS_SCROLLY, ECO_DOMAINS_SCROLLY, SESSION_LOG_SCROLLY } from './study-scrolly-beats.js'

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
.dsh-scrolly-figure { margin: 0 0 8px; font-size: 12.5px; line-height: 1.6; color: var(--vp-c-text-2); }
.dsh-scrolly-rows { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
.dsh-scrolly-row { display: flex; flex-wrap: wrap; gap: 2px 10px; align-items: baseline;
  padding: 5px 9px; border: 1px solid var(--vp-c-divider); border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 8px; background: var(--vp-c-bg); font-size: 12.5px; line-height: 1.55; }
.dsh-scrolly-row.is-skipped { border-left-style: dashed; border-left-color: var(--vp-c-text-2); }
.dsh-scrolly-row.is-refused, .dsh-scrolly-row.is-fail { border-left-color: var(--vp-c-danger-1); }
.dsh-scrolly-row.is-not-reached { opacity: .45; border-left-color: var(--vp-c-divider); }
.dsh-scrolly-row.is-focus { border-color: var(--vp-c-brand-1); }
.dsh-row-seq { color: var(--vp-c-text-3); font-variant-numeric: tabular-nums; }
.dsh-row-type { font-weight: 600; }
.dsh-row-detail { color: var(--vp-c-text-2); overflow-wrap: anywhere; }
.dsh-row-tag { margin-left: auto; padding-left: 12px; font-size: 11px; color: var(--vp-c-text-3); white-space: nowrap; }
.dsh-scrolly-readout { margin: 10px 0 0; font-size: 12px; line-height: 1.65; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.dsh-comp-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin: 0; padding: 0; list-style: none; }
.dsh-comp-cell { padding: 7px 6px; border: 1px dashed var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); text-align: center; }
.dsh-comp-cell strong { display: block; font-size: 12px; }
.dsh-comp-cell small { font-size: 11px; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.dsh-comp-strip { display: flex; gap: 6px; margin: 0; padding: 0; list-style: none; }
.dsh-comp-node { min-width: 0; flex-basis: 0; overflow: hidden; padding: 7px 8px;
  border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); }
.dsh-comp-node strong { display: block; font-size: 12px; white-space: nowrap; }
.dsh-comp-node small { font-size: 11px; color: var(--vp-c-text-2); white-space: nowrap; font-variant-numeric: tabular-nums; }
.dsh-comp-node.is-summary { border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 52%, var(--vp-c-bg)); }
.dsh-comp-node.is-focus { border-color: var(--vp-c-brand-1); }
@media (max-width: 768px) {
  .dsh-scrolly { grid-template-columns: 1fr; } .dsh-scrolly-stage { position: static; }
  .dsh-comp-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .dsh-comp-strip { flex-direction: column; } .dsh-comp-node { flex-basis: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-scrolly-beat { transition: none; }
}
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

const SCENARIOS = {
  'turn-flow': {
    beats: BEATS,
    buildStage(stage) {
      const model = buildTurnModel({ scenario: 'two-tools' })
      const figureLabel = document.createElement('p')
      figureLabel.className = 'dsh-scrolly-figure'
      figureLabel.textContent = '横轴是步骤序号，不是时间。蓝点＝进模型且记日志，灰点＝只记日志，红点＝只进模型；蓝线是同一份载荷的配对。'
      const svg = document.createElementNS(NS, 'svg')
      svg.setAttribute('role', 'img')
      svg.setAttribute('aria-label', 'Turn 步骤轨迹图：五条参与方泳道上的有序步骤')
      stage.append(figureLabel, svg)
      return index => renderStage(svg, model, BEATS[index].upTo)
    },
  },
  'session-log': SESSION_LOG_SCROLLY,
  'compaction': COMPACTION_SCROLLY,
  'cordis-map': CORDIS_SCROLLY,
  'eco-domains': ECO_DOMAINS_SCROLLY,
}

function buildContainer(container, scene) {
  const stage = document.createElement('div')
  stage.className = 'dsh-scrolly-stage'
  const beats = document.createElement('ul')
  beats.className = 'dsh-scrolly-beats'
  const render = scene.buildStage(stage)
  container.replaceChildren(stage, beats)

  const buttons = []
  let currentIndex = -1
  const activate = index => {
    const beat = scene.beats[index]
    if (beat === undefined || index === currentIndex) return
    currentIndex = index
    render(index)
    for (const [buttonIndex, button] of buttons.entries()) {
      button.setAttribute('aria-current', buttonIndex === index ? 'true' : 'false')
    }
  }

  scene.beats.forEach((beat, index) => {
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
    for (const container of document.querySelectorAll('[data-scrolly]')) {
      if (container.dataset.scrollyReady === 'true') continue
      const scene = SCENARIOS[container.dataset.scrolly]
      if (scene === undefined) continue
      container.dataset.scrollyReady = 'true'
      buildContainer(container, scene)
    }
  }
  mount()
  // VitePress 单页路由切换后正文整体替换，重新扫描一遍容器。
  new MutationObserver(() => mount()).observe(document.body, { childList: true, subtree: true })
}
