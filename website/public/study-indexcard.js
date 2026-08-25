/**
 * 课程页「索引卡片字段注解器」：把 08 课的 12 个字段说明变成可点选的卡片模型。
 *
 * 课程正文放一个空容器 `<div class="dsh-indexcard" data-dsh-indexcard …>`，本模块
 * 把它变成左侧字段按钮（必填/可选标记）、右侧逐字定义卡的结构。数据逐字来自
 * 08 课「每条记录的字段」一节；纯函数导出供 Node 测试，DOM 收在浏览器守卫里。
 * 详情卡每次绘制都换新的内层元素，让入场动画随选择变化重新播放。
 */

export const INDEX_FIELDS = Object.freeze([
  Object.freeze({ field: '所属层', required: true, definition: '它属于 packages、apps、vendor 或其他哪一层。' }),
  Object.freeze({ field: '文件角色', required: true, definition: '入口、类型契约、适配器、运行时、工具、测试等。角色根据路径和文件名生成，用来帮助第一次定位。' }),
  Object.freeze({ field: '这个文件有什么用', required: true, definition: '用不依赖具体代码细节的语言回答「它解决哪个问题」。' }),
  Object.freeze({ field: '为什么这样设计', required: true, definition: '解释拆成单独文件的常见工程原因，例如替换、测试、生命周期和边界。' }),
  Object.freeze({ field: '文件级设计证据', required: true, definition: '把当前固定提交中能定位到的顶部注释、声明、HTML/CSS/SQL 结构和静态 import 关系列出来，防止「为什么这样设计」只剩角色套话；它是静态定位证据，不是完整语义证明。' }),
  Object.freeze({ field: '直接协作者', required: true, definition: '优先列同包 README、同目录文件和同包测试，帮助你沿依赖方向继续读。' }),
  Object.freeze({ field: '对应测试', required: true, definition: '优先依据固定提交中的本地静态 import、包入口和模块别名关系寻找测试，区分「直接引用」和「经过入口或中间模块的间接线索」；只有没有这些证据时，才使用同包同名等保守线索。没有找到直接关联，不等于运行时没有测试覆盖。' }),
  Object.freeze({ field: '测试关联依据', required: true, definition: '说明「对应测试」的来源是直接 import、间接线索还是保守推断，让测试列可以被核查。' }),
  Object.freeze({ field: '阅读顺序', required: true, definition: '根据文件角色给出路线；入口、契约、状态/持久化、测试、配置和普通实现的下一跳不同，不把所有文件当成同一种代码。' }),
  Object.freeze({ field: '代码证据', required: true, definition: '记录固定提交归档扫描到的行数、声明和源码顶部注释；这些是定位线索，不等于完整语义证明。' }),
  Object.freeze({ field: '固定版本', required: true, definition: '把源码链接固定到同一个官方 commit，切换版本后必须重新生成索引。' }),
  Object.freeze({ field: '测试支持', required: false, definition: '可选字段；当对应测试依赖共享的测试支持文件时列出它们，没有就不出现。' }),
])

/**
 * 渲染详情卡内部 HTML；导出供 Node 测试断言转义、必填标记与清单。
 *
 * @param {{ field: string, required: boolean, definition: string }} field
 */
export function renderFieldDetailHtml(field) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const badge = field.required ? '必填' : '可选'
  return `<dt>这张卡片上的字段</dt><dd>${esc(field.field)}（${badge}）</dd>` +
    `<dt>它承载什么</dt><dd>${esc(field.definition)}</dd>`
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-indexcard-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-indexcard-style'
  style.textContent = `
.dsh-indexcard{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-indexcard-fields,.vp-doc .dsh-indexcard-fields{display:flex;flex-wrap:wrap;gap:6px;align-content:start;margin:0;padding:0;list-style:none;}
.dsh-indexcard-fields li{list-style:none;}
.dsh-indexcard-field{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border:1px solid var(--vp-c-divider);
  border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;font-size:0.86rem;cursor:pointer;
  transition:translate 120ms cubic-bezier(0.34,1.28,0.64,1),border-color 120ms ease,background-color 120ms ease;}
.dsh-indexcard-field[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);color:var(--vp-c-brand-1);font-weight:600;}
.dsh-indexcard-field:hover{translate:0 -1px;}.dsh-indexcard-field:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-indexcard-field i{font-style:normal;font-size:0.68rem;color:var(--vp-c-text-2);border:1px solid var(--vp-c-divider);
  border-radius:4px;padding:0 4px;}
.dsh-indexcard-field[aria-pressed="true"] i{color:var(--vp-c-brand-1);border-color:var(--vp-c-brand-1);}
.dsh-indexcard-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-indexcard-detail dt{margin:10px 0 3px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-indexcard-detail dt:first-child{margin-top:0;}
.dsh-indexcard-detail dd{margin:0;line-height:1.65;}
.dsh-swap-in{animation:dsh-swap-spring 0.35s cubic-bezier(0.34,1.28,0.64,1) both;}
@keyframes dsh-swap-spring{from{opacity:0;transform:translateY(5px) scale(0.985)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-indexcard{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-indexcard *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

function initializeIndexCard(doc) {
  const mount = doc.querySelector('[data-dsh-indexcard]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'

  ensureStyle(doc)

  const state = { field: INDEX_FIELDS[0].field }

  const fields = doc.createElement('ul')
  fields.className = 'dsh-indexcard-fields'
  fields.setAttribute('role', 'group')
  fields.setAttribute('aria-label', '选择一个索引卡片字段')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-indexcard-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const entry of INDEX_FIELDS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-indexcard-field'
    button.dataset.field = entry.field
    button.innerHTML = `<span>${entry.field}</span><i>${entry.required ? '必填' : '可选'}</i>`
    button.addEventListener('click', () => {
      state.field = entry.field
      paint()
    })
    item.append(button)
    fields.append(item)
    buttons.push(button)
  }

  function paint() {
    const entry = INDEX_FIELDS.find(item => item.field === state.field)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.field === state.field))
    }
    // 每次绘制换新的内层元素，入场动画随选择变化重新播放。
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderFieldDetailHtml(entry)
    detail.replaceChildren(wrap)
  }

  mount.append(fields, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeIndexCard(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeIndexCard(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
