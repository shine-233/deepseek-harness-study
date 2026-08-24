/**
 * 课程页「迁移步进器」：把 18 课「版本迁移的安全顺序」六步变成可步进的模型。
 *
 * 数据逐字来自 18 课的六个小节；纯函数导出供 Node 测试，DOM 收浏览器守卫。
 * 步进支持上一/下一按钮与步骤点直接跳转；reduced-motion 下动画停用。
 */

export const MIGRATION_STEPS = Object.freeze([
  Object.freeze({
    title: '先记录新基线',
    body: '确认新的官方仓库、完整 commit SHA、标签或版本号和获取时间。不要只写 master，也不要把一个短 SHA 当作唯一来源。',
  }),
  Object.freeze({
    title: '下载到独立临时目录',
    body: '按 20 课的固定提交下载方式，把完整上游源码放在学习仓库之外；sparse-checkout 只能支持路径导航。最后一条 rev-parse 命令必须与 $commit 完全一致，若不一致就停止，不要生成新索引。',
  }),
  Object.freeze({
    title: '在生成前保留旧版本',
    body: '先提交或打 tag 保存当前学习仓库。生成新索引前，记录当前 UPSTREAM.md、清单数量、索引页数量和质量审计输出；这样新旧差异才可解释。',
  }),
  Object.freeze({
    title: '重新生成并检查差异',
    body: '把 --commit 和 --source-root 指向同一个新基线。生成后先查看 git diff --stat 与 --name-only，确认没有混入临时源码或 node_modules；再依次运行 verify-source-index、audit-source-index-quality、verify-study-links 和 git diff --check。验证器通过只是第一道门。',
  }),
  Object.freeze({
    title: '重新人工核对高风险专题',
    body: '至少重新阅读：工具契约、Hook Bridge、Bundle/Profile/Loader、插件测试卸载、社区生态和所有安装命令。它们对版本最敏感，不能只依靠生成器重写。',
  }),
  Object.freeze({
    title: '更新边界说明并清理临时目录',
    body: '同步修改 UPSTREAM.md、根 README、固定版本链接和实验命令。确认质量审计错误和模板复用统计的变化有解释，再按明确路径核对临时目录，研究完成后清理下载物。',
  }),
])

/**
 * 渲染步骤详情内部 HTML；导出供 Node 测试断言转义与序号。
 *
 * @param {{ title: string, body: string }} step
 * @param {number} index - 从 1 开始的步骤序号。
 */
export function renderStepHtml(step, index) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  if (!Number.isInteger(index) || index < 1) throw new Error('步骤序号必须从 1 开始')
  return `<dt>第 ${index} 步</dt><dd><strong>${esc(step.title)}</strong></dd>` +
    `<dt>这一步做什么</dt><dd>${esc(step.body)}</dd>`
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-migration-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-migration-style'
  style.textContent = `
.dsh-migration{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-migration-steps{display:grid;gap:6px;align-content:start;margin:0;padding:0;list-style:none;}
.dsh-migration-step{display:flex;align-items:center;gap:9px;width:100%;padding:8px 12px;border:1px solid var(--vp-c-divider);
  border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;text-align:left;cursor:pointer;
  transition:border-color 120ms ease,background-color 120ms ease;}
.dsh-migration-step[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);}
.dsh-migration-step:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-migration-step b{flex:none;display:inline-flex;width:22px;height:22px;align-items:center;justify-content:center;
  border:1px solid var(--vp-c-brand-1);border-radius:50%;color:var(--vp-c-brand-1);font-size:0.72rem;}
.dsh-migration-nav{display:flex;gap:8px;}
.dsh-migration-nav button{padding:6px 14px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);
  color:var(--vp-c-text-1);font:inherit;cursor:pointer;}
.dsh-migration-nav button:disabled{opacity:0.45;cursor:default;}
.dsh-migration-nav button:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-migration-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-migration-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-migration-detail dt:first-child{margin-top:0;}
.dsh-migration-detail dd{margin:0;line-height:1.65;}
.dsh-swap-in{animation:dsh-fade-rise 180ms ease;}
@keyframes dsh-fade-rise{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-migration{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-migration *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

function initializeMigration(doc) {
  const mount = doc.querySelector('[data-dsh-migration]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'
  ensureStyle(doc)

  const state = { index: 0 }

  const steps = doc.createElement('ul')
  steps.className = 'dsh-migration-steps'
  steps.setAttribute('role', 'group')
  steps.setAttribute('aria-label', '版本迁移的六个步骤')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-migration-detail'
  detail.setAttribute('aria-live', 'polite')

  const nav = doc.createElement('div')
  nav.className = 'dsh-migration-nav'
  const prev = doc.createElement('button')
  prev.type = 'button'
  prev.textContent = '← 上一步'
  const next = doc.createElement('button')
  next.type = 'button'
  next.textContent = '下一步 →'
  prev.addEventListener('click', () => { state.index = Math.max(0, state.index - 1); paint() })
  next.addEventListener('click', () => { state.index = Math.min(MIGRATION_STEPS.length - 1, state.index + 1); paint() })
  nav.append(prev, next)

  const buttons = []
  MIGRATION_STEPS.forEach((step, i) => {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-migration-step'
    button.dataset.index = String(i)
    button.innerHTML = `<b>${i + 1}</b><span>${step.title}</span>`
    button.addEventListener('click', () => { state.index = i; paint() })
    item.append(button)
    steps.append(item)
    buttons.push(button)
  })

  function paint() {
    const step = MIGRATION_STEPS[state.index]
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(Number(button.dataset.index) === state.index))
    }
    prev.disabled = state.index === 0
    next.disabled = state.index === MIGRATION_STEPS.length - 1
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderStepHtml(step, state.index + 1)
    detail.replaceChildren(wrap)
  }

  const side = doc.createElement('div')
  side.className = 'dsh-migration-side'
  side.style.display = 'grid'
  side.style.gap = '10px'
  side.style.alignContent = 'start'
  side.append(steps, nav)
  mount.append(side, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeMigration(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeMigration(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
