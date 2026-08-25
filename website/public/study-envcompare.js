/**
 * 课程页「三种环境对比器」：把 21 课的三种学习方式表变成可切换的模型。
 *
 * 课程正文放一个空容器 `<div class="dsh-envcompare" data-dsh-envcompare …>`，
 * 本模块把它变成三个环境标签、能力矩阵与四栏详情卡。数据逐字来自 21 课的
 * 表格与「能做／不能做」原文；纯函数导出供 Node 测试，DOM 收在浏览器守卫里。
 */

export const ENVIRONMENTS = Object.freeze([
  Object.freeze({
    id: 'web',
    name: 'GitHub 仓库网页',
    best: '阅读 README、导读、索引、源码和固定版本链接',
    terminal: '不提供',
    download: '不需要',
    cost: '直接打开网页即可',
    can: ['GitHub 直接渲染 Markdown，导读中的相对链接可以继续点击'],
    cannot: ['不能替你运行 TypeScript、验证索引', '不能证明一个插件真的能装载或卸载'],
  }),
  Object.freeze({
    id: 'dev',
    name: 'github.dev',
    best: '浏览文件、全文搜索、语法高亮、少量编辑和提交笔记',
    terminal: '不提供终端，不能 build、run 或 debug',
    download: '不需要完整 clone；未提交内容保存在浏览器本地存储',
    cost: '对 GitHub.com 用户免费，需要登录；要经常提交',
    can: ['按文件名和符号搜索', '打开多个文件对照阅读', '查看语法高亮', '修改自己的 Markdown 学习笔记', '通过 Source Control 提交变更'],
    cannot: ['没有集成终端', '不能安装 pnpm 依赖', '不能运行 node study-tools/... 脚本', '不能构建 DSH 或启动 Web 服务', '不能进行真实 API、插件加载或调试实验'],
  }),
  Object.freeze({
    id: 'codespaces',
    name: 'GitHub Codespaces',
    best: '运行文档检查、逐行试验、构建或调试',
    terminal: '提供云端终端和计算环境',
    download: '不需要下载到自己的电脑；仓库会在云端环境中准备',
    cost: '个人账户有每月免费额度，超额使用可能计费；创建前先看账单和 spending limit',
    can: ['云端终端里运行学习仓库自己的检查命令', '从分支或固定 commit 创建环境', '浏览器连接云端 VS Code 界面'],
    cannot: ['检查命令不证明官方 DSH 已构建、真实模型请求或完整 E2E', '学习只需要阅读时，不建议为了打开 README 创建 Codespace'],
  }),
])

/**
 * 能力矩阵行：每格取值只来自 21 课原文（✓ 有明说，— 原文未声称）。
 */
export const CAPABILITY_ROWS = Object.freeze([
  Object.freeze({ capability: '终端', values: Object.freeze({ web: '—', dev: '✗', codespaces: '✓' }) }),
  Object.freeze({ capability: '构建 / 运行', values: Object.freeze({ web: '—', dev: '✗', codespaces: '✓' }) }),
  Object.freeze({ capability: '调试', values: Object.freeze({ web: '—', dev: '✗', codespaces: '✓' }) }),
  Object.freeze({ capability: '全文搜索与多文件对照', values: Object.freeze({ web: '—', dev: '✓', codespaces: '✓' }) }),
  Object.freeze({ capability: '提交笔记到 Git', values: Object.freeze({ web: '—', dev: '✓', codespaces: '✓' }) }),
])

/**
 * 渲染详情卡内部 HTML；导出供 Node 测试断言转义与清单。
 *
 * @param {{ name: string, best: string, terminal: string, download: string, cost: string, can: string[], cannot: string[] }} env
 */
export function renderEnvDetailHtml(env) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const list = items => `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`
  return `<dt>最适合做什么</dt><dd>${esc(env.best)}</dd>` +
    `<dt>终端、构建和运行</dt><dd>${esc(env.terminal)}</dd>` +
    `<dt>是否需要把仓库下载到本机</dt><dd>${esc(env.download)}</dd>` +
    `<dt>费用与注意事项</dt><dd>${esc(env.cost)}</dd>` +
    `<dt>原文说它能做</dt><dd>${list(env.can)}</dd>` +
    `<dt>原文说它不能做</dt><dd>${list(env.cannot)}</dd>`
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-envcompare-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-envcompare-style'
  style.textContent = `
.dsh-envcompare{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-envcompare-side{display:grid;gap:10px;align-content:start;}
.dsh-envcompare-tabs,.vp-doc .dsh-envcompare-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0;padding:0;list-style:none;}
.dsh-envcompare-tabs li{list-style:none;}
.dsh-envcompare-tab{padding:7px 12px;border:1px solid var(--vp-c-divider);border-radius:999px;background:var(--vp-c-bg-soft);
  color:var(--vp-c-text-1);font:inherit;font-size:0.86rem;cursor:pointer;}
.dsh-envcompare-tab[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);font-weight:600;}
.dsh-envcompare-tab:hover{translate:0 -1px;}.dsh-envcompare-tab:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-envcompare-matrix{border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);padding:10px 12px;font-size:0.85rem;overflow-x:auto;}
.dsh-envcompare-matrix table{border-collapse:collapse;width:100%;min-width:320px;}
.dsh-envcompare-matrix th,.dsh-envcompare-matrix td{border-bottom:1px solid var(--vp-c-divider);padding:5px 6px;text-align:left;font-weight:400;}
.dsh-envcompare-matrix th{color:var(--vp-c-text-2);font-size:0.76rem;}
.dsh-envcompare-matrix td.yes{color:var(--vp-c-brand-1);font-weight:700;}
.dsh-envcompare-matrix td.no{color:var(--vp-c-text-2);}
.dsh-envcompare-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-envcompare-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-envcompare-detail dt:first-child{margin-top:0;}
.dsh-envcompare-detail dd{margin:0;line-height:1.6;}
.dsh-envcompare-detail dd ul{margin:2px 0 0;padding-left:18px;}
.dsh-swap-in{animation:dsh-swap-spring 0.35s cubic-bezier(0.34,1.28,0.64,1) both;}
@keyframes dsh-swap-spring{from{opacity:0;transform:translateY(5px) scale(0.985)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-envcompare{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-envcompare *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

function initializeEnvCompare(doc) {
  const mount = doc.querySelector('[data-dsh-envcompare]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'

  ensureStyle(doc)

  const state = { id: ENVIRONMENTS[0].id }

  const tabs = doc.createElement('ul')
  tabs.className = 'dsh-envcompare-tabs'
  tabs.setAttribute('role', 'group')
  tabs.setAttribute('aria-label', '选择一种学习环境')

  const matrix = doc.createElement('div')
  matrix.className = 'dsh-envcompare-matrix'

  const detail = doc.createElement('dl')
  detail.className = 'dsh-envcompare-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const env of ENVIRONMENTS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-envcompare-tab'
    button.dataset.env = env.id
    button.textContent = env.name
    button.addEventListener('click', () => {
      state.id = env.id
      paint()
    })
    item.append(button)
    tabs.append(item)
    buttons.push(button)
  }

  function paintMatrix() {
    const head = '<tr><th>能力</th><th>网页</th><th>github.dev</th><th>Codespaces</th></tr>'
    const rows = CAPABILITY_ROWS.map(row =>
      `<tr><td>${row.capability}</td>` +
      ['web', 'dev', 'codespaces'].map(key => {
        const value = row.values[key]
        const cls = value === '✓' ? 'yes' : value === '✗' ? 'no' : ''
        return `<td class="${cls}">${value}</td>`
      }).join('') + '</tr>'
    ).join('')
    matrix.innerHTML = `<table>${head}${rows}</table>`
  }

  function paint() {
    const env = ENVIRONMENTS.find(item => item.id === state.id)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.env === state.id))
    }
    // 每次绘制换新的内层元素，入场动画随选择变化重新播放。
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderEnvDetailHtml(env)
    detail.replaceChildren(wrap)
  }

  const side = doc.createElement('div')
  side.className = 'dsh-envcompare-side'
  side.append(tabs, matrix)
  mount.append(side, detail)
  paintMatrix()
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeEnvCompare(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeEnvCompare(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
