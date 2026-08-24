/**
 * 课程页「研究优先级看板」：把 26 课「优先级与验收条件」的 10 行表变成可筛选的看板。
 *
 * 课程正文放一个空容器 `<div class="dsh-research" data-dsh-research …>`，本模块
 * 把它变成 P0/P1/P2 筛选、研究项按钮和详情卡。数据逐字来自 26 课的表格；
 * 纯函数导出供 Node 测试，DOM 操作收在浏览器守卫里，与 study-testlayers.js
 * 的架构契约一致。只在带容器的页面实际渲染，其余页面开销是一次扫描。
 */

export const RESEARCH_ITEMS = Object.freeze([
  Object.freeze({
    priority: 'P0',
    name: '宿主导出工具可见集合',
    why: '没有真实的注册、可见和执行快照，就无法知道实验测的到底是哪一组工具',
    who: '宿主维护者或明确标注的 patched fork',
    evidence: '版本、Profile、agent、四个观测时点、脱敏规则、失败处理和回滚说明',
  }),
  Object.freeze({
    priority: 'P0',
    name: '工具可见性 A/B 性能实验',
    why: '验证「工具 schema 变多可能增加输入成本或选择负担」在指定模型和 provider 上的实际幅度',
    who: 'API、固定模型、隔离 Profile 和可重复任务',
    evidence: '成对实验、provider token、缓存字段、首 token/总延迟、工具错误、盲评质量和成本；没有字段就写未提供',
  }),
  Object.freeze({
    priority: 'P1',
    name: '分批人工抽查高风险索引',
    why: '缩短自动卡片与实际源码之间的距离，同时不假装 2,973 个文件都逐行读过',
    who: '能阅读固定 commit 的维护者',
    evidence: '每批文件的源码事实、测试事实、修正记录和仍未验证项；模板复用只作提示，不作错误',
  }),
  Object.freeze({
    priority: 'P1',
    name: '社区插件、Hook bridge 和注入器复核',
    why: '生态名称相似，公开 Bundle、兼容层、fork 和运行时注入的风险不同',
    who: '固定 commit、隔离 Profile、可回滚环境',
    evidence: '项目自述、manifest、安装脚本、权限、网络、子进程、版本绑定、安装/卸载日志和身份声明',
  }),
  Object.freeze({
    priority: 'P1',
    name: '最小示例插件工作台',
    why: '让读者从「看懂公开扩展点」走到「注册一个工具并正确卸载」',
    who: '一个不需要真实模型的最小 Bundle 示例',
    evidence: '目录、manifest、公开 API、schema、测试、卸载结果和清理说明',
  }),
  Object.freeze({
    priority: 'P1',
    name: '教材质量 CI 与审阅记录',
    why: '防止链接、双语记录、示例行为和 Pages 构建悄悄回归，同时不把自动化或 Agent 意见夸大成运行证明',
    who: 'GitHub Actions、维护者审阅和明确的证据分层',
    evidence: '示例 test/lint、A/B 结构预检、文档门禁、Pages 构建、PR 证据表和人工判断；真实 DSH、模型和安全结论仍需各自证据',
  }),
  Object.freeze({
    priority: 'P2',
    name: 'Pages 移动端与长索引体验',
    why: '内容已经能在网页发布，但窄屏、超长索引和搜索仍值得真实浏览器抽查',
    who: '浏览器截图和固定 viewport',
    evidence: '首页、学习入口、长索引、表格和深色模式在窄屏无横向溢出，关键链接可点击',
  }),
  Object.freeze({
    priority: 'P2',
    name: 'GitHub 仓库治理',
    why: '降低误删或强制推送风险，但不是 Pages 上线的前置条件',
    who: '仓库管理员权限',
    evidence: '当前 master 已禁止 force push、禁止删除；暂未强制 PR 或 Actions 检查，以保持 Pages 的 push 发布路径；以后可按协作规模再评估',
  }),
  Object.freeze({
    priority: 'P2',
    name: '依赖告警分类',
    why: 'GitHub 页面显示的依赖告警需要按生产依赖、开发依赖、可达路径和修复兼容性分类',
    who: '锁文件、审计命令和发布判断',
    evidence: '原始告警、受影响包、可利用路径、升级范围、测试结果和未修复理由；不能直接批量 audit fix',
  }),
  Object.freeze({
    priority: 'P2',
    name: 'Actions 运行时维护',
    why: 'Node.js 20 弃用提示属于 CI 维护问题，不等于 DSH 运行时失败',
    who: '工作流权限和 Actions 版本',
    evidence: '具体 action、Node 运行时、升级后的构建结果和告警变化；不以改版本号代替验证',
  }),
])

export const PRIORITY_ORDER = Object.freeze(['P0', 'P1', 'P2'])

/**
 * 按优先级筛选研究项。
 *
 * @param {'全部' | 'P0' | 'P1' | 'P2'} filter
 * @returns {ReadonlyArray<{ priority: string, name: string, why: string, who: string, evidence: string }>}
 */
export function filterItems(filter) {
  if (filter === '全部') return RESEARCH_ITEMS
  if (!PRIORITY_ORDER.includes(filter)) throw new Error('未知筛选：' + String(filter))
  return RESEARCH_ITEMS.filter(item => item.priority === filter)
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-research-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-research-style'
  style.textContent = `
.dsh-research{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-research-side{display:grid;gap:10px;align-content:start;}
.dsh-research-filters{display:flex;gap:6px;flex-wrap:wrap;}
.dsh-research-filter{padding:5px 12px;border:1px solid var(--vp-c-divider);border-radius:999px;background:var(--vp-c-bg-soft);
  color:var(--vp-c-text-1);font:inherit;font-size:0.84rem;cursor:pointer;}
.dsh-research-filter[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);font-weight:600;}
.dsh-research-filter:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-research-items,.vp-doc .dsh-research-items{display:grid;gap:6px;margin:0;padding:0;list-style:none;}
.dsh-research-items li{list-style:none;}
.dsh-research-item{display:flex;align-items:baseline;gap:9px;width:100%;padding:9px 12px;border:1px solid var(--vp-c-divider);
  border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;text-align:left;cursor:pointer;}
.dsh-research-item[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);box-shadow:inset 0 0 0 1px var(--vp-c-brand-1);}
.dsh-research-item:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-research-item b{flex:none;font-size:0.78rem;color:var(--vp-c-brand-1);}
.dsh-research-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-research-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-research-detail dt:first-child{margin-top:0;}
.dsh-research-detail dd{margin:0;line-height:1.65;}
.dsh-swap-in{animation:dsh-fade-rise 180ms ease;}
@keyframes dsh-fade-rise{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-research{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-research *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

/**
 * 渲染详情卡内部 HTML；导出供 Node 测试断言转义与结构。
 *
 * @param {{ priority: string, name: string, why: string, who: string, evidence: string }} item
 */
export function renderItemDetailHtml(item) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  return `<dt>为什么值得做</dt><dd>${esc(item.why)}</dd>` +
    `<dt>需要谁或什么</dt><dd>${esc(item.who)}</dd>` +
    `<dt>完成时必须留下的证据</dt><dd>${esc(item.evidence)}</dd>`
}

function initializeResearchBoard(doc) {
  const mount = doc.querySelector('[data-dsh-research]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'

  ensureStyle(doc)

  const state = { filter: '全部', name: RESEARCH_ITEMS[0].name }

  const filters = doc.createElement('div')
  filters.className = 'dsh-research-filters'
  filters.setAttribute('role', 'group')
  filters.setAttribute('aria-label', '按优先级筛选')

  const items = doc.createElement('ul')
  items.className = 'dsh-research-items'
  items.setAttribute('role', 'group')
  items.setAttribute('aria-label', '选择一个研究项')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-research-detail'
  detail.setAttribute('aria-live', 'polite')

  const filterButtons = []
  for (const option of ['全部', ...PRIORITY_ORDER]) {
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-research-filter'
    button.dataset.filter = option
    button.textContent = option
    button.addEventListener('click', () => {
      state.filter = option
      paintItems()
    })
    filters.append(button)
    filterButtons.push(button)
  }

  const itemButtons = []

  function paintItems() {
    for (const button of filterButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter))
    }
    const visible = filterItems(state.filter)
    for (const button of itemButtons) {
      const item = RESEARCH_ITEMS.find(entry => entry.name === button.dataset.name)
      button.parentElement.style.display = visible.includes(item) ? '' : 'none'
    }
    const current = visible.find(item => item.name === state.name) ?? visible[0]
    state.name = current.name
    paintDetail(current)
  }

  function paintDetail(item) {
    for (const button of itemButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.name === item.name))
    }
    // 每次绘制换新的内层元素，入场动画随选择变化重新播放。
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderItemDetailHtml(item)
    detail.replaceChildren(wrap)
  }

  for (const item of RESEARCH_ITEMS) {
    const li = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-research-item'
    button.dataset.name = item.name
    button.innerHTML = `<b>${item.priority}</b><span>${item.name}</span>`
    button.addEventListener('click', () => {
      state.name = item.name
      paintDetail(item)
    })
    li.append(button)
    items.append(li)
    itemButtons.push(button)
  }

  const side = doc.createElement('div')
  side.className = 'dsh-research-side'
  side.append(filters, items)
  mount.append(side, detail)
  paintItems()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeResearchBoard(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeResearchBoard(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
