/**
 * 课程页「检查边界浏览器」：把 29 课「每一种检查到底证明什么」16 行表变成可点选的模型。
 *
 * 数据逐字来自 29 课表格的四栏；纯函数导出供 Node 测试，DOM 收浏览器守卫。
 * 每项检查显示：运行位置、通过时能支持的结论、通过时仍不能支持的结论——
 * 后者正是全课核心「CI 绿不等于 DSH 运行」的逐项落地。
 */

export const CI_CHECKS = Object.freeze([
  Object.freeze({ name: '最小插件 test', where: '示例目录或 GitHub Actions', supports: '预览限长、非文本块被忽略、观察器不改写测试夹具', notSupported: '真实 DSH 已加载 Bundle，或 Fiber 已完成卸载' }),
  Object.freeze({ name: '最小插件 lint', where: '示例目录或 GitHub Actions', supports: '提交的 JavaScript 符合该示例启用的 correctness/suspicious 规则，且能通过 Node 语法检查', notSupported: '所有 DSH 版本、所有平台或安全策略都兼容' }),
  Object.freeze({ name: 'pnpm run build', where: 'GitHub Actions 或完整本地 checkout', supports: '官方固定源码的 TypeScript 库和 Web 构建入口能完成本次编译、打包', notSupported: '真实 DSH 已启动、provider 已响应、模型质量或插件已安装' }),
  Object.freeze({ name: 'pnpm test', where: 'GitHub Actions 或本地完整 checkout', supports: 'DSH 仓库当前 Vitest 单元测试通过', notSupported: '真实 provider、模型质量、第三方插件安装或所有操作系统行为' }),
  Object.freeze({ name: 'pnpm lint', where: 'GitHub Actions 或本地完整 checkout', supports: 'DSH 仓库当前静态规则通过', notSupported: '运行时安全、真实模型行为或跨版本兼容' }),
  Object.freeze({ name: 'A/B 比较器单元测试', where: '仓库根目录或 GitHub Actions', supports: '比较器能接受合法差异，并拒绝改变固定条件或共同 schema 的输入', notSupported: '提交中的教学快照没有漂移，或 provider 性能存在差异' }),
  Object.freeze({ name: '提交快照 A/B 比较', where: '仓库根目录或 GitHub Actions', supports: '版本库中的两份教学快照确实满足 A/B 结构条件', notSupported: 'provider token、缓存、延迟、成本、任务质量的真实差异' }),
  Object.freeze({ name: '手写学习路径检查', where: '仓库根目录或 GitHub Actions', supports: 'README、入口课文和专题课文中的官方源码路径仍存在于固定提交', notSupported: '这些路径对应的实现仍然正确，或读者已经真正读懂了它们' }),
  Object.freeze({ name: '源文件索引检查', where: '仓库根目录或 GitHub Actions', supports: '固定提交中的 2,973 个纳入范围源文件都有索引条目，提交号和必填字段一致', notSupported: '自动条目已经替代逐行人工阅读，或设计理由对每个文件都完全准确' }),
  Object.freeze({ name: '学习入口检查', where: '仓库根目录或 GitHub Actions', supports: '首屏按钮、START-HERE 第一轮、最小示例课程和 Pages manifest 的关键映射仍存在', notSupported: '浏览器真实点击、页面视觉效果、读者是否理解或 DSH 是否运行' }),
  Object.freeze({ name: '学习体验契约', where: '仓库根目录或 GitHub Actions', supports: '关键入口同时保留「现在做什么」「应该看到什么」或「没有证明什么」等新手所需说明', notSupported: '读者一定理解了内容、页面一定适合所有设备或真实 DSH 已运行' }),
  Object.freeze({ name: '索引质量审计', where: '仓库根目录或 GitHub Actions', supports: '发现结构错误、字段自洽问题和设计理由模板复用提示，便于安排人工抽查', notSupported: '44 条模板提示自动变成错误，或 2,973 个文件已经人工逐行读完' }),
  Object.freeze({ name: 'doc-sync 与 Pages 构建', where: '完整仓库 checkout 的 GitHub Actions', supports: '文档门禁、站点投影和 VitePress 构建在该提交可通过', notSupported: '页面已被人读懂、DSH 已运行或社区插件安全' }),
  Object.freeze({ name: 'study:agent-review', where: 'GitHub Actions 或本地完整 checkout', supports: 'Agent 审阅指南、PR 模板和工作流之间的确定性接线没有漂移', notSupported: 'Agent 已经审阅某个 PR、审阅意见正确，或自动批准合并' }),
  Object.freeze({ name: 'git diff --check', where: 'GitHub Actions', supports: '给定提交比较范围内的差异没有 Git 能识别的空白错误', notSupported: 'Markdown 结论准确，或测试覆盖充足' }),
  Object.freeze({ name: 'Agent 审阅', where: 'PR 描述、评论或人工工具', supports: '有人按证据、侵入性和未验证项的清单审阅过', notSupported: '模型输出一定正确、安全、无偏差，或可以自动批准合并' }),
])

/**
 * 渲染检查详情内部 HTML；导出供 Node 测试断言转义与四栏顺序。
 *
 * @param {{ name: string, where: string, supports: string, notSupported: string }} check
 */
export function renderCheckHtml(check) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  return '<dt>运行位置</dt><dd>' + esc(check.where) + '</dd>' +
    '<dt>通过时能支持的结论</dt><dd>' + esc(check.supports) + '</dd>' +
    '<dt>通过时仍不能支持的结论</dt><dd>' + esc(check.notSupported) + '</dd>'
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-pipeline-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-pipeline-style'
  style.textContent = [
    '.dsh-pipeline{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}',
    '.dsh-pipeline-checks,.vp-doc .dsh-pipeline-checks{display:grid;gap:6px;align-content:start;margin:0;padding:0;list-style:none;}',
    '.dsh-pipeline-checks li{list-style:none;}',
    '.dsh-pipeline-check{width:100%;padding:8px 12px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;font-size:0.86rem;text-align:left;cursor:pointer;transition:border-color 120ms ease,background-color 120ms ease;}',
    '.dsh-pipeline-check[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);font-weight:600;}',
    '.dsh-pipeline-check:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}',
    '.dsh-pipeline-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}',
    '.dsh-pipeline-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}',
    '.dsh-pipeline-detail dt:first-child{margin-top:0;}',
    '.dsh-pipeline-detail dd{margin:0;line-height:1.65;}',
    '.dsh-swap-in{animation:dsh-fade-rise 180ms ease;}',
    '@keyframes dsh-fade-rise{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}',
    '@media (max-width:719px){.dsh-pipeline{grid-template-columns:1fr;}}',
    '@media (prefers-reduced-motion:reduce){.dsh-pipeline *{transition:none!important;animation:none!important;}}',
  ].join('\n')
  doc.head.append(style)
}

function initializePipeline(doc) {
  const mount = doc.querySelector('[data-dsh-pipeline]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'
  ensureStyle(doc)

  const state = { name: CI_CHECKS[0].name }

  const checks = doc.createElement('ul')
  checks.className = 'dsh-pipeline-checks'
  checks.setAttribute('role', 'group')
  checks.setAttribute('aria-label', '选择一项检查，看它通过时能支持和不能支持的结论')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-pipeline-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const check of CI_CHECKS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-pipeline-check'
    button.dataset.name = check.name
    button.textContent = check.name
    button.addEventListener('click', () => {
      state.name = check.name
      paint()
    })
    item.append(button)
    checks.append(item)
    buttons.push(button)
  }

  function paint() {
    const check = CI_CHECKS.find(item => item.name === state.name)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.name === state.name))
    }
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderCheckHtml(check)
    detail.replaceChildren(wrap)
  }

  mount.append(checks, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializePipeline(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializePipeline(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
