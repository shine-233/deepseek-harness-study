/**
 * 课程页「目标路线选择器」：把 20 课「先按目标选择路线」的 12 行表变成可点选的模型。
 *
 * 课程正文放一个空容器 `<div class="dsh-routes" data-dsh-routes …>`，本模块把它
 * 变成左侧目标按钮、右侧路线链与证据卡的结构。数据逐字来自 20 课的表格；
 * 纯函数导出供 Node 测试，DOM 操作收在浏览器守卫里，与 study-testlayers.js
 * 的架构契约一致。只在带容器的页面实际渲染，其余页面开销是一次扫描。
 *
 * 路线里的两位数字跳转到对应课程页；「study/文件索引/README.md」跳转到索引
 * 导航；「对应索引页」没有唯一目标，保留为提示文本，不造链接。
 */

export const ROUTES = Object.freeze([
  Object.freeze({
    goal: '第一次理解 DSH',
    hops: ['00', '01', '02', '03'],
    evidence: '能说清插件、服务、事件、Profile、Bundle、Session、Agent 和 Turn 的关系',
  }),
  Object.freeze({
    goal: '追一个具体文件',
    hops: ['08', 'study/文件索引/README.md', '对应索引页'],
    evidence: '找到该文件的用途、设计证据、直接协作者、测试线索和固定版本源码链接',
  }),
  Object.freeze({
    goal: '理解一次请求',
    hops: ['03', '04', '05', '06', '07'],
    evidence: '能沿输入、模型请求、工具调用、Session 事件和宿主退出顺序追踪一次 Turn',
  }),
  Object.freeze({
    goal: '写普通插件',
    hops: ['10', '11', '13', '19'],
    evidence: '选到公开扩展点，并拥有最小 Context、Loader、构建和卸载证据',
  }),
  Object.freeze({
    goal: '判断插件责任和工具预算',
    hops: ['27', '22', '23', '10', '11'],
    evidence: '能先判断工具可见性和扩展层级，再决定是否写插件或维护 fork',
  }),
  Object.freeze({
    goal: '控制工具上下文',
    hops: ['22', '13', '19'],
    evidence: '能把工具注册、模型可见和执行权限分层，并知道真实性能仍需基准',
  }),
  Object.freeze({
    goal: '接入外部 Hook',
    hops: ['10', '14', '19'],
    evidence: '能区分协议解析、bridge 映射、typed Decision、外部命令权限和 dispose',
  }),
  Object.freeze({
    goal: '发布 Bundle',
    hops: ['12', '15', '19'],
    evidence: '能说明 manifest、patch、Profile、Loader、版本范围、安装脚本和失败恢复',
  }),
  Object.freeze({
    goal: '审核社区项目',
    hops: ['10', '12', '15', '19'],
    evidence: '能把官方事实、项目自述、静态检查和已运行测试分开记录',
  }),
  Object.freeze({
    goal: '第一次照着做',
    hops: ['16', '00', '08'],
    evidence: '完成一张文件卡片、一张 Turn 图和一次静态插件检查',
  }),
  Object.freeze({
    goal: '判断教材是否够用',
    hops: ['17', '08', '对应索引页'],
    evidence: '知道哪些内容已覆盖，哪些仍需源码或运行实验证明',
  }),
  Object.freeze({
    goal: '更新上游版本',
    hops: ['18', '20', '08'],
    evidence: '能保留旧快照、重新生成索引并复核高风险专题',
  }),
])

/** 两位数字 → 课程页 slug（与 study/ 目录的文件名一致）。 */
export const LESSON_SLUGS = Object.freeze({
  '00': '开始这里', '01': '仓库地图', '02': 'Cordis与插件树', '03': '核心文件精读',
  '04': 'Agent与Turn流程', '05': 'Session日志与恢复', '06': 'LLM与工具执行',
  '07': 'HostClient示例测试发布', '08': '逐文件索引怎么读', '09': '业界案例与写法',
  '10': '社区生态与扩展边界', '11': '如何写一个合规插件', '12': 'GitHub生态检索与插件实战核验',
  '13': '官方工具插件完整契约', '14': '官方HookBridge与兼容层', '15': 'BundleProfileLoader与发布安装',
  '16': '学习工作簿与首个实验', '17': '完成度审计与证据矩阵', '18': '维护更新与版本迁移',
  '19': '插件测试卸载与版本证据', '20': '学习仓库实际使用手册', '21': 'GitHub网页与Codespaces学习路线',
  '22': '工具可见性与非侵入扩展', '23': '工具可见集合观测与性能实验', '24': '高风险索引人工抽查',
  '25': '从首页到第一次产出的动手任务单', '26': '后续研究路线', '27': '工具预算与插件责任决策卡',
  '28': '最小插件示例与学习检查', '29': '学习仓库的质量检查与审阅', '30': '安全告警与网页发布维护',
  '31': '学习工具箱', '32': '源码学习项目的渐进式设计', '33': '确定性可视化实验协议与Code-Mode权限管线',
  '34': '作者的判断与理由', '35': '最小插件工作台', '36': '研究与-Debug-协作', '37': '计划栈',
})

/** 非课程跳转的固定链接（相对站点根）。 */
const SPECIAL_HOPS = Object.freeze({
  'study/文件索引/README.md': 'study/files/README',
})

function siteBase(doc) {
  const base = doc.defaultView?.__DSH_STUDY_BASE__ ?? '/'
  return base.endsWith('/') ? base : base + '/'
}

/**
 * 把一条路线展开成跳转序列；数字是课程链接，特殊条目按 SPECIAL_HOPS，
 * 其余是没有唯一目标的提示文本（href 为 null）。
 *
 * @param {{ hops: string[] }} route
 * @param {Document} [doc]
 * @returns {{ label: string, href: string | null }[]}
 */
export function buildRouteHops(route, doc = undefined) {
  const found = ROUTES.find(item => item.goal === route.goal && item.hops === route.hops)
    ?? ROUTES.find(item => item.goal === route.goal)
  if (!found) throw new Error('未知路线：' + String(route.goal))
  const base = doc ? siteBase(doc) : '/'
  return found.hops.map(hop => {
    if (/^\d{2}$/.test(hop)) {
      const slug = LESSON_SLUGS[hop]
      if (!slug) throw new Error('缺少课程 slug：' + hop)
      return { label: hop, href: base + 'study/lessons/' + encodeURIComponent(hop + '-' + slug) }
    }
    if (hop in SPECIAL_HOPS) return { label: hop, href: base + SPECIAL_HOPS[hop] }
    return { label: hop, href: null }
  })
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-routes-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-routes-style'
  style.textContent = `
.dsh-routes{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-routes-goals,.vp-doc .dsh-routes-goals{display:flex;flex-wrap:wrap;gap:6px;align-content:start;margin:0;padding:0;list-style:none;}
.dsh-routes-goals li{list-style:none;}
.dsh-routes-goal{padding:7px 12px;border:1px solid var(--vp-c-divider);border-radius:999px;background:var(--vp-c-bg-soft);
  color:var(--vp-c-text-1);font:inherit;font-size:0.88rem;cursor:pointer;}
.dsh-routes-goal[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);font-weight:600;}
.dsh-routes-goal:hover{translate:0 -1px;}.dsh-routes-goal:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-routes-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-routes-detail dt{margin:10px 0 4px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-routes-detail dt:first-child{margin-top:0;}
.dsh-routes-detail dd{margin:0;line-height:1.65;}
.dsh-routes-hops{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0;padding:0;list-style:none;}
.dsh-routes-hops li{display:flex;align-items:center;gap:6px;}
.dsh-routes-hops li+li::before{content:'→';color:var(--vp-c-text-2);}
.dsh-routes-hop{display:inline-block;padding:3px 10px;border:1px solid var(--vp-c-divider);border-radius:6px;background:var(--vp-c-bg);
  color:var(--vp-c-text-1);text-decoration:none;}
.dsh-routes-hop:hover{border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1);}
.dsh-routes-hop[aria-disabled="true"]{cursor:default;color:var(--vp-c-text-2);}
.dsh-routes-hop:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-swap-in{animation:dsh-swap-spring 0.35s cubic-bezier(0.34,1.28,0.64,1) both;}
@keyframes dsh-swap-spring{from{opacity:0;transform:translateY(5px) scale(0.985)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-routes{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-routes *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

/**
 * 渲染详情卡内部 HTML；导出供 Node 测试断言转义与结构。
 *
 * @param {{ goal: string, evidence: string }} route
 * @param {{ label: string, href: string | null }[]} hops
 */
export function renderRouteDetailHtml(route, hops) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const hopHtml = hops.map(hop => {
    const label = esc(hop.label)
    return hop.href
      ? `<li><a class="dsh-routes-hop" href="${esc(hop.href)}">${label}</a></li>`
      : `<li><span class="dsh-routes-hop" aria-disabled="true">${label}</span></li>`
  }).join('')
  return `<dt>这条路线</dt><dd><ul class="dsh-routes-hops">${hopHtml}</ul></dd>` +
    `<dt>走完应得到的证据</dt><dd>${esc(route.evidence)}</dd>`
}

function initializeRoutes(doc) {
  const mount = doc.querySelector('[data-dsh-routes]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'

  ensureStyle(doc)

  const selected = { goal: ROUTES[0].goal }

  const goals = doc.createElement('ul')
  goals.className = 'dsh-routes-goals'
  goals.setAttribute('role', 'group')
  goals.setAttribute('aria-label', '选择你的目标')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-routes-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const route of ROUTES) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-routes-goal'
    button.dataset.goal = route.goal
    button.textContent = route.goal
    button.addEventListener('click', () => {
      selected.goal = route.goal
      paint()
    })
    item.append(button)
    goals.append(item)
    buttons.push(button)
  }

  function paint() {
    const route = ROUTES.find(item => item.goal === selected.goal)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.goal === selected.goal))
    }
    // 每次绘制换新的内层元素，入场动画随选择变化重新播放。
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderRouteDetailHtml(route, buildRouteHops(route, doc))
    detail.replaceChildren(wrap)
  }

  mount.append(goals, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeRoutes(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeRoutes(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
