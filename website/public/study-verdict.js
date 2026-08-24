/**
 * 课程页「够用裁决矩阵」：把 17 课「按用途判断够不够」的 7 行表变成可点选的模型。
 *
 * 数据逐字来自 17 课表格；裁决等级（enough/qualified/insufficient）由表格原文
 * 前缀推导并在 Node 测试中钉死。纯函数导出，DOM 收浏览器守卫，容器门控渲染。
 */

export const VERDICTS = Object.freeze([
  Object.freeze({ goal: '第一次理解 DSH 的架构', verdict: '够用', level: 'enough', needs: '按 00—07 完成工作簿，不要从索引首页硬读' }),
  Object.freeze({ goal: '定位任意纳入范围的源文件', verdict: '够用', level: 'enough', needs: '从 文件索引/README 搜索，再回固定源码' }),
  Object.freeze({ goal: '设计一个普通第三方插件', verdict: '够用作设计教材', level: 'qualified', needs: '用目标版本的 Loader/构建环境做实际组合和卸载测试' }),
  Object.freeze({ goal: '设计默认工具集合和 agent 可见性', verdict: '够用作分层设计教材', level: 'qualified', needs: '用真实模型做「全部可见/按作用域限制」的 token、延迟和质量对照' }),
  Object.freeze({ goal: '审核社区项目是否冒用官方身份', verdict: '够用作审计框架', level: 'qualified', needs: '对具体仓库重新核对当前 commit、安装脚本和运行证据' }),
  Object.freeze({ goal: '证明一个插件可以生产部署', verdict: '不够，也不是本仓库单独能证明的', level: 'insufficient', needs: '需要产品自己的安全、平台、E2E、发布和回滚门禁' }),
  Object.freeze({ goal: '声称自己完整理解全部源码', verdict: '不够', level: 'insufficient', needs: '需要按模块继续人工精读，不能把卡片数量当理解深度' }),
])

/**
 * 由表格原文前缀推导裁决等级；未知前缀抛错，防止表格改写后等级悄悄漂移。
 *
 * @param {string} verdict
 * @returns {'enough' | 'qualified' | 'insufficient'}
 */
export function verdictLevel(verdict) {
  if (verdict === '够用') return 'enough'
  if (verdict.startsWith('够用作')) return 'qualified'
  if (verdict.startsWith('不够')) return 'insufficient'
  throw new Error('未知裁决原文：' + verdict)
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-verdict-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-verdict-style'
  style.textContent = `
.dsh-verdict{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-verdict-goals{display:grid;gap:6px;align-content:start;margin:0;padding:0;list-style:none;}
.dsh-verdict-goal{display:flex;align-items:center;gap:8px;width:100%;padding:8px 12px;border:1px solid var(--vp-c-divider);
  border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;text-align:left;cursor:pointer;
  transition:border-color 120ms ease,background-color 120ms ease;}
.dsh-verdict-goal[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);}
.dsh-verdict-goal:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-verdict-badge{flex:none;font-size:0.72rem;font-weight:700;border-radius:4px;padding:1px 6px;}
.dsh-verdict-badge.enough{color:var(--vp-c-brand-1);border:1px solid var(--vp-c-brand-1);}
.dsh-verdict-badge.qualified{color:#ad641e;border:1px solid #ad641e;}
.dsh-verdict-badge.insufficient{color:var(--vp-c-danger-1,#c94f3d);border:1px solid var(--vp-c-danger-1,#c94f3d);}
.dsh-verdict-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-verdict-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-verdict-detail dt:first-child{margin-top:0;}
.dsh-verdict-detail dd{margin:0;line-height:1.65;}
.dsh-swap-in{animation:dsh-fade-rise 180ms ease;}
@keyframes dsh-fade-rise{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-verdict{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-verdict *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

/**
 * 渲染详情卡内部 HTML；导出供 Node 测试断言转义与等级标记。
 *
 * @param {{ goal: string, verdict: string, level: string, needs: string }} entry
 */
export function renderVerdictDetailHtml(entry) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const label = { enough: '当前是否够用', qualified: '有条件的够用', insufficient: '不够' }[entry.level] ?? '裁决'
  return `<dt>裁决（${esc(label)}）</dt><dd>${esc(entry.verdict)}</dd>` +
    `<dt>还需要什么</dt><dd>${esc(entry.needs)}</dd>`
}

function initializeVerdict(doc) {
  const mount = doc.querySelector('[data-dsh-verdict]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'
  ensureStyle(doc)

  const state = { goal: VERDICTS[0].goal }

  const goals = doc.createElement('ul')
  goals.className = 'dsh-verdict-goals'
  goals.setAttribute('role', 'group')
  goals.setAttribute('aria-label', '选择一个用途，看当前材料的裁决')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-verdict-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const entry of VERDICTS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-verdict-goal'
    button.dataset.goal = entry.goal
    button.innerHTML = `<span class="dsh-verdict-badge ${verdictLevel(entry.verdict)}">${entry.level === 'insufficient' ? '不够' : entry.level === 'qualified' ? '有条件' : '够用'}</span><span>${entry.goal}</span>`
    button.addEventListener('click', () => {
      state.goal = entry.goal
      paint()
    })
    item.append(button)
    goals.append(item)
    buttons.push(button)
  }

  function paint() {
    const entry = VERDICTS.find(item => item.goal === state.goal)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.goal === state.goal))
    }
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderVerdictDetailHtml(entry)
    detail.replaceChildren(wrap)
  }

  mount.append(goals, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeVerdict(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeVerdict(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
