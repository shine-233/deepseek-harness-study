/**
 * 课程页「测试层次探照灯」：把 07 课的六层测试表变成可点选的模型。
 *
 * 课程正文放一个空容器 `<div class="dsh-testlayers" data-dsh-testlayers …>`，
 * 本模块把它变成左侧六层按钮、右侧详情卡的结构。数据与推导都是纯函数导出，
 * 在 Node 里单独测试；DOM 操作收在浏览器守卫里，与 study-companion.js 的
 * 架构契约一致。只在带容器的页面实际渲染，其余页面开销是一次扫描。
 *
 * 「回答什么」逐字来自 07 课的表格；「不回答什么」由表中其余各层的问题推导。
 * 两条边界警告（单元测试绿色 ≠ E2E/真实模型已验证、E2E 失败可能是环境问题）
 * 逐字来自课程原文，不在这里新增事实。
 */

export const TEST_LAYERS = Object.freeze([
  Object.freeze({
    id: 'unit',
    name: '单元测试',
    answers: '一个函数、类型转换或状态规则是否正确',
    notAnswers: ['包与服务的组合', '构建产物与进程流程', '真实网络与模型协议'],
  }),
  Object.freeze({
    id: 'integration',
    name: '包级集成测试',
    answers: '一个包和 Cordis／同组服务组合后是否正确',
    notAnswers: ['单个函数之外的真实构建产物', '真实供应商网络和模型协议'],
  }),
  Object.freeze({
    id: 'snapshot',
    name: '快照测试',
    answers: 'CLI、UI 或协议输出是否保持结构',
    notAnswers: ['输出之外的行为是否正确', '真实环境中的进程与浏览器流程'],
  }),
  Object.freeze({
    id: 'e2e',
    name: 'E2E 测试',
    answers: '构建产物、HTTP、进程或浏览器流程是否接得起来',
    notAnswers: ['真实供应商网络和模型协议是否可用', '失败时区分产品缺陷与环境问题'],
  }),
  Object.freeze({
    id: 'real-api',
    name: '真实 API 测试',
    answers: '真实供应商网络和模型协议是否可用',
    notAnswers: ['大量生成输入下的不变量', '没有 API key 时的任何等价结论'],
  }),
  Object.freeze({
    id: 'property',
    name: '属性测试',
    answers: '大量生成输入下，不变量是否仍成立',
    notAnswers: ['构建产物与浏览器流程', '真实供应商网络和模型协议'],
  }),
])

/** 课程原文的两条边界警告：id → 逐字引文。 */
export const LAYER_CAVEATS = Object.freeze({
  unit: '绿色的单元测试不能代表 E2E 或真实模型已经验证。',
  e2e: 'E2E 失败也可能是环境、密钥或端口问题。',
})

/**
 * 组装某一层的详情文案。
 *
 * @param {{ id: string }} layer - TEST_LAYERS 中的一个条目。
 * @returns {{ answers: string, notAnswers: string[], caveat: string | null }}
 */
export function buildLayerDetail(layer) {
  const found = TEST_LAYERS.find(item => item.id === layer.id)
  if (!found) throw new Error('未知测试层：' + String(layer.id))
  return {
    answers: found.answers,
    notAnswers: [...found.notAnswers],
    caveat: LAYER_CAVEATS[found.id] ?? null,
  }
}

function ensureStyle(doc) {
  if (doc.getElementById('dsh-testlayers-style')) return
  const style = doc.createElement('style')
  style.id = 'dsh-testlayers-style'
  style.textContent = `
.dsh-testlayers{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:14px;margin:20px 0;}
.dsh-testlayers-stack,.vp-doc .dsh-testlayers-stack{display:grid;gap:6px;margin:0;padding:0;list-style:none;}
.dsh-testlayers-stack li{list-style:none;}
.dsh-testlayers-band{display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;border:1px solid var(--vp-c-divider);
  border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);font:inherit;text-align:left;cursor:pointer;}
.dsh-testlayers-band[aria-pressed="true"]{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft);box-shadow:inset 0 0 0 1px var(--vp-c-brand-1);}
.dsh-testlayers-band:hover{translate:0 -1px;}.dsh-testlayers-band:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px;}
.dsh-testlayers-band small{margin-left:auto;color:var(--vp-c-text-2);font-size:0.78rem;}
.dsh-testlayers-band[aria-pressed="true"] small{color:var(--vp-c-brand-1);}
.dsh-testlayers-detail{padding:16px 18px;border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);}
.dsh-testlayers-detail dt{margin:10px 0 2px;color:var(--vp-c-brand-1);font-size:0.76rem;font-weight:700;}
.dsh-testlayers-detail dt:first-child{margin-top:0;}
.dsh-testlayers-detail dd{margin:0;color:var(--vp-c-text-1);line-height:1.6;}
.dsh-testlayers-detail dd.caveat{color:var(--vp-c-text-2);}
.dsh-swap-in{animation:dsh-swap-spring 0.35s cubic-bezier(0.34,1.28,0.64,1) both;}
@keyframes dsh-swap-spring{from{opacity:0;transform:translateY(5px) scale(0.985)}to{opacity:1;transform:none}}
@media (max-width:719px){.dsh-testlayers{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.dsh-testlayers *{transition:none!important;animation:none!important;}}
`
  doc.head.append(style)
}

/**
 * 渲染详情卡的内部 HTML。独立导出便于 Node 测试断言转义与字段顺序。
 *
 * @param {{ name: string }} layer
 * @param {{ answers: string, notAnswers: string[], caveat: string | null }} detail
 */
export function renderLayerDetailHtml(layer, detail) {
  const esc = text => String(text)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const nots = detail.notAnswers.map(item => `<li>${esc(item)}</li>`).join('')
  const caveat = detail.caveat ? `<dt>课程原文边界</dt><dd class="caveat">${esc(detail.caveat)}</dd>` : ''
  return `<dt>${esc(layer.name)}回答什么</dt><dd>${esc(detail.answers)}</dd>` +
    `<dt>它不回答什么</dt><dd><ul>${nots}</ul></dd>${caveat}`
}

function initializeTestLayers(doc) {
  const mount = doc.querySelector('[data-dsh-testlayers]')
  if (!mount || mount.dataset.mounted === 'true') return
  mount.dataset.mounted = 'true'

  ensureStyle(doc)

  const selected = { id: TEST_LAYERS[0].id }

  const stack = doc.createElement('ul')
  stack.className = 'dsh-testlayers-stack'
  stack.setAttribute('role', 'group')
  stack.setAttribute('aria-label', '选择一个测试层')

  const detail = doc.createElement('dl')
  detail.className = 'dsh-testlayers-detail'
  detail.setAttribute('aria-live', 'polite')

  const buttons = []
  for (const layer of TEST_LAYERS) {
    const item = doc.createElement('li')
    const button = doc.createElement('button')
    button.type = 'button'
    button.className = 'dsh-testlayers-band'
    button.dataset.layerId = layer.id
    button.innerHTML = `<span>${layer.name}</span><small>回答 / 不回答</small>`
    button.addEventListener('click', () => {
      selected.id = layer.id
      paint()
    })
    item.append(button)
    stack.append(item)
    buttons.push(button)
  }

  function paint() {
    const layer = TEST_LAYERS.find(item => item.id === selected.id)
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.layerId === selected.id))
    }
    const detailData = buildLayerDetail(layer)
    // 每次绘制换新的内层元素，入场动画随选择变化重新播放。
    const wrap = doc.createElement('div')
    wrap.className = 'dsh-swap-in'
    wrap.innerHTML = renderLayerDetailHtml(layer, detailData)
    detail.replaceChildren(wrap)
  }

  mount.append(stack, detail)
  paint()
}

if (typeof document !== 'undefined') {
  const boot = () => initializeTestLayers(document)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true })
  else boot()
  // VitePress 单页路由：课程页切换后容器是新的，用去抖扫描跟随。
  let timer = null
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => initializeTestLayers(document), 150)
  }).observe(document.body, { childList: true, subtree: true })
}
