/**
 * 课程页「仓库地图探索器」：把 01 课的顶层目录表和依赖 mermaid 变成可点选的模型。
 *
 * 课程正文放一个空容器 `<div class="dsh-repomap" data-dsh-repomap …>`，本模块把它
 * 变成左侧目录按钮、右侧说明卡与依赖链条图的结构。目录数据逐字来自 01 课表格；
 * 依赖链复刻课程 mermaid 的五步主链（apps→boot→bundle→packages→core/impl）与
 * vendor 虚线。纯函数导出供 Node 测试，DOM 操作收在浏览器守卫里。
 */

export const TOP_DIRS = Object.freeze([
  Object.freeze({
    dir: 'vendor/', inChain: true,
    plain: '固定放进仓库、由 DSH 自己维护的第三方基础库副本',
    focus: '先读 vendor/README.md 的 Manifest 和 Local modifications；它们有 DSH 的重命名、构建配置和部分行为修改，不要把第三方设计或 DSH 修改混为一谈',
  }),
  Object.freeze({
    dir: 'packages/', inChain: true,
    plain: 'DSH 的主要功能包',
    focus: '看包 README、入口、Service Definition、Provider、Consumer 和测试',
  }),
  Object.freeze({
    dir: 'apps/', inChain: true,
    plain: '可以启动的 CLI 和 Web 应用',
    focus: '看它怎样把参数、环境和包组装起来',
  }),
  Object.freeze({
    dir: 'examples/', inChain: false,
    plain: '适合运行和学习的示例',
    focus: '看最小组合和真实启动方式',
  }),
  Object.freeze({
    dir: 'docs/', inChain: false,
    plain: '官方架构、开发、用户和子系统文档',
    focus: '这里是上游文档的权威解释，不是本仓库新增的逐文件索引',
  }),
  Object.freeze({
    dir: 'scripts/', inChain: false,
    plain: '构建、生成、检查和发布脚本',
    focus: '看哪些规则由机器重复验证',
  }),
  Object.freeze({
    dir: 'native/', inChain: false,
    plain: '操作系统、沙箱和原生能力',
    focus: '看跨平台边界以及失败时怎样回退',
  }),
  Object.freeze({
    dir: 'python/', inChain: false,
    plain: 'Python SDK 和运行支持',
    focus: '看进程外调用与 Python 世界如何接入',
  }),
  Object.freeze({
    dir: 'website/', inChain: false,
    plain: '文档网站相关代码',
    focus: '看文档怎样被发布，不要和 agent 运行时混在一起',
  }),
  Object.freeze({
    dir: '.agents/', inChain: false,
    plain: '给 agent 和贡献者的规则、技能、笔记',
    focus: '它指导如何修改仓库，但不是产品运行入口',
  }),
])

/** 依赖链节点：复刻 01 课 mermaid 的主链顺序；vendor 是虚线基础。 */
export const CHAIN_NODES = Object.freeze([
  Object.freeze({ id: 'apps', label: 'apps/ 启动入口' }),
  Object.freeze({ id: 'boot', label: 'boot 装配 Profile' }),
  Object.freeze({ id: 'bundle', label: 'bundle/ 组合层' }),
  Object.freeze({ id: 'packages', label: 'packages/ 功能包' }),
  Object.freeze({ id: 'core-impl', label: 'core 接口 · 具体实现' }),
])
const CHAIN_DIRS = Object.freeze({ apps: 'apps/', packages: 'packages/', vendor: 'vendor/' })

/**
 * 一个目录是否位于运行时依赖主链上。
 *
 * @param {{ dir: string, inChain: boolean }} entry
 */
export function chainMember(entry) {
  const found = TOP_DIRS.find(item => item.dir === entry.dir)
  if (!found) throw new Error('未知目录：' + String(entry.dir))
  return found.inChain
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-repomap-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-repomap-style'
  style.textContent = `
.dsh-repomap{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-repomap-side{display:grid;gap:10px;align-content:start;}
.dsh-repomap-dirs,.vp-doc .dsh-repomap-dirs{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;}
.dsh-repomap-dirs li{list-style:none;}
.dsh-repomap-dir{padding:6px 11px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);
  color:var(--vp-c-text-1);font:inherit;font-size:0.86rem;font-family:var(--vp-font-family-mono);cursor:pointer;}
.dsh-repomap-dir[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);font-weight:600;}
.dsh-repomap-dir:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-repomap-chain{border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);padding:8px 10px;}
.dsh-repomap-chain svg{display:block;width:100%;height:auto;}
.dsh-repomap-chain .node{fill:var(--vp-c-bg);stroke:var(--vp-c-divider);}
.dsh-repomap-chain .node.hot{stroke:var(--vp-c-brand-1);stroke-width:2;}
.dsh-repomap-chain text{fill:var(--vp-c-text-1);font-size:11px;}
.dsh-repomap-chain .edge{stroke:var(--vp-c-text-2);stroke-width:1.4;fill:none;marker-end:url(#dsh-repomap-arrow);}
.dsh-repomap-chain .edge.dashed{stroke-dasharray:4 3;}
.dsh-repomap-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-repomap-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-repomap-detail dt:first-child{margin-top:0;}
.dsh-repomap-detail dd{margin:0;line-height:1.65;}
.dsh-swap-in{animation:dsh-fade-rise 180ms ease;}
@keyframes dsh-fade-rise{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-repomap{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-repomap *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

/**
 * 渲染详情卡内部 HTML；导出供 Node 测试断言转义与字段。
 *
 * @param {{ dir: string, plain: string, focus: string, inChain: boolean }} entry
 */
export function renderDirDetailHtml(entry) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const chain = entry.inChain
    ? '在运行时依赖主链上'
    : '不在运行时依赖主链上（支持、文档或辅助层）'
  return `<dt>用简单的话说</dt><dd>${esc(entry.plain)}</dd>` +
    `<dt>读它时关注什么</dt><dd>${esc(entry.focus)}</dd>` +
    `<dt>与依赖链的关系</dt><dd>${esc(chain)}</dd>`
}

/** 依赖链条 SVG；选中目录时对应节点高亮（boot/bundle 归入 packages/ 展示层）。 */
function renderChainSvg(doc, selectedDir) {
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 460 108')
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', '依赖链：apps 到 boot 到 bundle 到 packages，vendor 以虚线为基础供给')
  const hotId = Object.entries(CHAIN_DIRS).find(([, dir]) => dir === selectedDir)?.[0]
    ?? (selectedDir === 'packages/' ? 'packages' : null)
  const node = (id, x, y, w, label) => {
    const g = doc.createElementNS('http://www.w3.org/2000/svg', 'g')
    const rect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', String(x)); rect.setAttribute('y', String(y))
    rect.setAttribute('width', String(w)); rect.setAttribute('height', '30')
    rect.setAttribute('rx', '6')
    rect.setAttribute('class', 'node' + (id === hotId ? ' hot' : ''))
    const text = doc.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', String(x + w / 2)); text.setAttribute('y', String(y + 19))
    text.setAttribute('text-anchor', 'middle')
    text.textContent = label
    g.append(rect, text)
    return g
  }
  const defs = doc.createElementNS('http://www.w3.org/2000/svg', 'defs')
  const marker = doc.createElementNS('http://www.w3.org/2000/svg', 'marker')
  marker.setAttribute('id', 'dsh-repomap-arrow')
  marker.setAttribute('markerWidth', '7'); marker.setAttribute('markerHeight', '7')
  marker.setAttribute('refX', '6'); marker.setAttribute('refY', '3')
  marker.setAttribute('orient', 'auto')
  const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', 'M0,0 L7,3 L0,6 Z')
  path.setAttribute('fill', 'var(--vp-c-text-2)')
  marker.append(path); defs.append(marker)
  svg.append(defs)
  svg.append(node('apps', 6, 12, 74, 'apps/'))
  svg.append(node('boot', 108, 12, 74, 'boot'))
  svg.append(node('bundle', 210, 12, 84, 'bundle/'))
  svg.append(node('packages', 322, 12, 92, 'packages/'))
  svg.append(node('core-impl', 322, 68, 92, 'core · impl'))
  svg.append(node('vendor', 6, 62, 74, 'vendor/'))
  const edge = (x1, y1, x2, y2, dashed = false) => {
    const p = doc.createElementNS('http://www.w3.org/2000/svg', 'path')
    p.setAttribute('d', `M${x1},${y1} L${x2},${y2}`)
    p.setAttribute('class', 'edge' + (dashed ? ' dashed' : ''))
    return p
  }
  svg.append(edge(80, 27, 106, 27))
  svg.append(edge(182, 27, 208, 27))
  svg.append(edge(294, 27, 320, 27))
  svg.append(edge(368, 44, 368, 66))
  svg.append(edge(80, 72, 320, 36, true))
  const vendorLabel = doc.createElementNS('http://www.w3.org/2000/svg', 'text')
  vendorLabel.setAttribute('x', '88'); vendorLabel.setAttribute('y', '82')
  vendorLabel.textContent = '虚线：被所有层引用'
  svg.append(vendorLabel)
  return svg
}

function initializeRepomap(doc) {
  const mount = doc.querySelector('[data-dsh-repomap]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'

  ensureStyle(doc)

  const state = { dir: TOP_DIRS[0].dir }

  const dirs = doc.createElement('ul')
  dirs.className = 'dsh-repomap-dirs'
  dirs.setAttribute('role', 'group')
  dirs.setAttribute('aria-label', '选择一个顶层目录')

  const chain = doc.createElement('div')
  chain.className = 'dsh-repomap-chain'

  const detail = doc.createElement('dl')
  detail.className = 'dsh-repomap-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const entry of TOP_DIRS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-repomap-dir'
    button.dataset.dir = entry.dir
    button.textContent = entry.dir
    button.addEventListener('click', () => {
      state.dir = entry.dir
      paint()
    })
    item.append(button)
    dirs.append(item)
    buttons.push(button)
  }

  function paint() {
    const entry = TOP_DIRS.find(item => item.dir === state.dir)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.dir === state.dir))
    }
    chain.replaceChildren(renderChainSvg(doc, entry.dir))
    // 每次绘制换新的内层元素，入场动画随选择变化重新播放。
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderDirDetailHtml(entry)
    detail.replaceChildren(wrap)
  }

  const side = doc.createElement('div')
  side.className = 'dsh-repomap-side'
  side.append(dirs, chain)
  mount.append(side, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeRepomap(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeRepomap(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
