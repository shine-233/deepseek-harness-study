/**
 * 课程页「抽查结果浏览器」：把 24 课七文件抽查表变成可点选的审计卡。
 *
 * 数据逐字来自 24 课「抽查结果」表的三栏；纯函数导出供 Node 测试，
 * DOM 收浏览器守卫，容器门控渲染。
 */

export const AUDIT_CARDS = Object.freeze([
  Object.freeze({
    file: 'packages/core/tools/src/index.ts',
    fact: '统一暴露工具注册、模型呈现模式、schema 提供和执行流水线；声明了 tools/pre-execute、tools/execute、tools/post-execute、tools/code-dispatch-log、tools/result、tools/change 等事件',
    correction: '当前「模块入口」判断方向正确，但不能只把它写成普通 barrel；它还承载注册、呈现和完整执行边界',
    stillNeeded: '真实运行时的注册集合、可见集合和执行事件快照；没有证明所有注册工具都自动进请求',
  }),
  Object.freeze({
    file: 'packages/core/tools/src/schema.ts',
    fact: '提供统一 JSON 值 schema、编译、类型推断和工具参数校验；defineTool 把 schema、执行、输出和可选呈现能力组合起来',
    correction: '当前卡片可以作为入口，但读者要补问「参数校验」和「执行权限」是不是同一件事；答案是否定的',
    stillNeeded: '目标 Profile 中实际加载了哪些工具，以及真实调用时的策略、审批和沙箱结果',
  }),
  Object.freeze({
    file: 'packages/core/system-prompt/src/index.ts',
    fact: '工具 provider 返回模型可见 schemas 和限制前 knownNames；toolOrder 负责确定顺序；assemble() 按调用上下文组装提示词和工具',
    correction: '「提示词组装」判断正确；工具 schema 是组装的一部分，但不应把静态代码写成 provider token 或 KV cache 实测',
    stillNeeded: '固定模型和 provider 的 input token、缓存 token、首 token 延迟与质量数据',
  }),
  Object.freeze({
    file: 'apps/cli/src/profile-boot.ts',
    fact: '按 Bundle、Profile patch、home patch、--patch overlay 组合树；存在 agent-presets 时还会条件性注入 shipped preset 的 system overlay，随后追加 telemetry patch；启动后监视用户 patch，并通过 shutdown/dispose 清理',
    correction: '当前卡片的 patch／Profile 边界基本正确，但不能把用户可配置层级当成完整的实际 overlay 清单；它是判断「组合层扩展」和「源码 patch」区别的高风险入口',
    stillNeeded: '在隔离 Profile 中实际启动、修改 patch、重载和退出的日志；不能仅凭函数存在声称 HMR 在每个平台都可用',
  }),
  Object.freeze({
    file: 'packages/hooks/hook-protocol/src/codec.ts',
    fact: 'exit 0 可解析结构化 JSON 或保留普通 stdout；exit 2 表示阻断并取 stderr；其他非零退出是非阻断错误；只有调用者传入 expectedEventName 时，事件名缺失或不匹配才会丢弃事件专属字段',
    correction: '当前卡片具体且准确；但协议 codec 只负责解码，哪些字段适用于 Claude 或 Codex 由 bridge 决定；省略 expectedEventName 会关闭这项校验',
    stillNeeded: '具体 bridge 的命令、超时、权限、安装和卸载证据；codec 通过测试不等于外部 Hook 已安装',
  }),
  Object.freeze({
    file: 'packages/core/tools/src/types.ts',
    fact: '定义 native、code、both 三种呈现方式；事件数据记录 Code Mode 子调用的开始与结束。调试快照类型是学习仓库工作树的本地新增，不在固定提交内',
    correction: '「类型契约」方向正确，但不能把快照字段当成权限清单；字节数也不是 provider 的真实 token 数',
    stillNeeded: '真实宿主导出的快照、provider 请求字段和执行策略结果；类型定义本身不证明字段已经被生产入口使用',
  }),
  Object.freeze({
    file: 'packages/interaction/user-approval/src/index.ts',
    fact: '审批服务支持 ask 和 never 两种会话策略；审批提问与决定会写入 Session 日志；没有可用回答者时走 unavailable，而不是默认放行',
    correction: '「模块入口」太笼统；它还规定了审批的失败方向和可回放状态，不能写成「有一个权限按钮」',
    stillNeeded: '具体宿主是否装配回答者、用户界面怎样显示、真实工具调用是否走到审批，以及不同 Profile 的默认策略',
  }),
])

/**
 * 渲染审计卡内部 HTML；导出供 Node 测试断言转义与三栏顺序。
 *
 * @param {{ file: string, fact: string, correction: string, stillNeeded: string }} card
 */
export function renderAuditCardHtml(card) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  return '<dt>源码中确认到的事实</dt><dd>' + esc(card.fact) + '</dd>' +
    '<dt>索引解释是否需要修正</dt><dd>' + esc(card.correction) + '</dd>' +
    '<dt>仍然需要什么证据</dt><dd>' + esc(card.stillNeeded) + '</dd>'
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-auditcards-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-auditcards-style'
  style.textContent = [
    '.dsh-auditcards{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}',
    '.dsh-auditcards-files,.vp-doc .dsh-auditcards-files{display:grid;gap:6px;align-content:start;margin:0;padding:0;list-style:none;}',
    '.dsh-auditcards-files li{list-style:none;}',
    '.dsh-auditcards-file{width:100%;padding:8px 11px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;font-size:0.78rem;font-family:var(--vp-font-family-mono);text-align:left;cursor:pointer;transition:border-color 120ms ease,background-color 120ms ease;}',
    '.dsh-auditcards-file[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);}',
    '.dsh-auditcards-file:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}',
    '.dsh-auditcards-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}',
    '.dsh-auditcards-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}',
    '.dsh-auditcards-detail dt:first-child{margin-top:0;}',
    '.dsh-auditcards-detail dd{margin:0;line-height:1.65;}',
    '.dsh-swap-in{animation:dsh-fade-rise 180ms ease;}',
    '@keyframes dsh-fade-rise{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}',
    '@media (max-width:719px){.dsh-auditcards{grid-template-columns:1fr;}}',
    '@media (prefers-reduced-motion:reduce){.dsh-auditcards *{transition:none!important;animation:none!important;}}',
  ].join('\n')
  doc.head.append(style)
}

function initializeAuditCards(doc) {
  const mount = doc.querySelector('[data-dsh-auditcards]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'
  ensureStyle(doc)

  const state = { file: AUDIT_CARDS[0].file }

  const files = doc.createElement('ul')
  files.className = 'dsh-auditcards-files'
  files.setAttribute('role', 'group')
  files.setAttribute('aria-label', '选择一个被抽查的源文件')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-auditcards-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const card of AUDIT_CARDS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-auditcards-file'
    button.dataset.file = card.file
    button.textContent = card.file
    button.addEventListener('click', () => {
      state.file = card.file
      paint()
    })
    item.append(button)
    files.append(item)
    buttons.push(button)
  }

  function paint() {
    const card = AUDIT_CARDS.find(item => item.file === state.file)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.file === state.file))
    }
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderAuditCardHtml(card)
    detail.replaceChildren(wrap)
  }

  mount.append(files, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeAuditCards(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeAuditCards(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
