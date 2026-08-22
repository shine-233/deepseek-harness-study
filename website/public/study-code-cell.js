/**
 * 可运行 JS 代码格。
 *
 * 教材里 `js-run` 围栏块会被本模块替换成「编辑器 + 运行 + 输出」三件套：
 * 用户代码在 sandbox="allow-scripts"（不带 allow-same-origin）的 iframe 里执行，
 * 沙箱是透明源，碰不到主页面、localStorage 或 Cookie；主页面也不做任何 eval。
 * 输出经 postMessage 回传，行数封顶；死循环只会占住沙箱自身（cannotProve 已声明），
 * 不影响正文阅读。无网络请求：runner 是内联 srcdoc，不是外部服务。
 */

/** 把用户代码包进 runner 文档：控制台重定向、错误捕获都在沙箱内部完成。 */
export function buildRunnerDocument(userCode) {
  const safe = String(userCode).replace(/<\/script/gi, '<\\/script')
  return [
    '<!doctype html><meta charset="utf-8">',
    '<style>html,body{margin:0;padding:0;background:transparent}</style>',
    '<script>',
    'const send = (type, payload) => parent.postMessage({ source: "dsh-code-cell", type, payload }, "*")',
    'const fmt = (v) => { try { return typeof v === "string" ? v : JSON.stringify(v) ?? String(v) } catch { return String(v) } }',
    'for (const level of ["log", "info", "warn", "error"]) {',
    '  const original = console[level].bind(console)',
    '  console[level] = (...args) => { original(...args); send("log", { level, text: args.map(fmt).join(" ") }) }',
    '}',
    'addEventListener("error", (e) => send("error", { text: e.message + "（第 " + e.lineno + " 行）" }))',
    'addEventListener("unhandledrejection", (e) => send("error", { text: "未处理的 Promise 拒绝：" + fmt(e.reason) }))',
    'send("ready", {})',
    'try {',
    safe,
    '} catch (e) { send("error", { text: (e && e.message) ? e.message : String(e) }) }',
    '<\/script>',
  ].join('\n')
}

const MAX_OUTPUT_LINES = 200

/** 扫描容器里的 js-run 围栏块并替换为可运行单元格；幂等。 */
export function mountCodeCells(container) {
  if (!(container instanceof Element)) return 0
  let mounted = 0
  // VitePress/Shiki 把语言类放在外层 div 上：div.language-js-run > (copy/lang + pre)。
  for (const block of container.querySelectorAll('div[class*="language-js-run"]')) {
    if (block.dataset.dshCell === 'mounted') continue
    const source = (block.querySelector('pre') ?? block).textContent ?? ''
    replaceWithCell(block, source)
    mounted += 1
  }
  return mounted
}

function replaceWithCell(pre, source) {
  pre.dataset.dshCell = 'mounted'

  const cell = document.createElement('div')
  cell.className = 'dsh-code-cell'

  const label = document.createElement('p')
  label.className = 'dsh-code-cell-label'
  label.textContent = '可运行示例 · JavaScript（在隔离沙箱里执行，无网络）'

  const editor = document.createElement('textarea')
  editor.className = 'dsh-code-cell-editor'
  editor.value = source
  editor.rows = Math.min(20, Math.max(4, source.split('\n').length + 1))
  editor.setAttribute('aria-label', '可编辑的 JavaScript 示例代码')
  editor.spellcheck = false

  const actions = document.createElement('div')
  actions.className = 'dsh-code-cell-actions'
  const runButton = document.createElement('button')
  runButton.type = 'button'
  runButton.textContent = '▶ 运行'
  runButton.className = 'button button-primary'
  const resetButton = document.createElement('button')
  resetButton.type = 'button'
  resetButton.textContent = '还原示例'
  actions.append(runButton, resetButton)

  const output = document.createElement('pre')
  output.className = 'dsh-code-cell-output'
  output.hidden = true
  output.setAttribute('aria-live', 'polite')

  cell.append(label, editor, actions, output)
  pre.replaceWith(cell)

  let frame = null
  const closeFrame = () => { frame?.remove(); frame = null }

  runButton.addEventListener('click', () => {
    closeFrame()
    output.replaceChildren()
    output.hidden = false
    let lines = 0
    let ready = false
    const pending = []

    frame = document.createElement('iframe')
    frame.className = 'dsh-code-cell-frame'
    // 只给脚本执行权：不给同源，沙箱读不到本页存储与 Cookie。
    frame.setAttribute('sandbox', 'allow-scripts')
    frame.style.display = 'none'
    frame.srcdoc = buildRunnerDocument(editor.value)

    const onMessage = (event) => {
      if (frame === null || event.source !== frame.contentWindow) return
      const data = event.data ?? {}
      if (data.source !== 'dsh-code-cell') return
      if (data.type === 'ready') {
        ready = true
        for (const item of pending.splice(0)) appendLine(output, item, () => lines++)
        return
      }
      if (!ready) { pending.push(data); return }
      appendLine(output, data, () => lines++)
      if (lines >= MAX_OUTPUT_LINES) {
        appendLine(output, { type: 'log', payload: { level: 'warn', text: `输出超过 ${MAX_OUTPUT_LINES} 行，已截断。` } }, () => lines++)
        closeFrame()
      }
    }
    addEventListener('message', onMessage)
    document.body.append(frame)
  })

  resetButton.addEventListener('click', () => {
    editor.value = source
    closeFrame()
    output.replaceChildren()
    output.hidden = true
  })
}

function appendLine(output, data, countLine) {
  if (countLine() >= MAX_OUTPUT_LINES) return
  const line = document.createElement('div')
  line.textContent = ('[' + (data.payload?.level ?? 'log') + '] ') + (data.payload?.text ?? '')
  if (data.type === 'error' || data.payload?.level === 'error') line.classList.add('is-error')
  output.append(line)
}

if (typeof document !== 'undefined') {
  // 与进度组件同一套时序：等 Vue 完成 hydration 再挂载，避免水合不匹配。
  let timer = 0
  const observer = new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const docRoot = document.querySelector('.vp-doc')
      if (docRoot !== null) mountCodeCells(docRoot)
    }, 120)
  })
  const startWhenSettled = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const docRoot = document.querySelector('.vp-doc')
      if (docRoot !== null) mountCodeCells(docRoot)
      observer.observe(document.body, { childList: true, subtree: true })
    }))
  }
  if (document.readyState === 'complete') startWhenSettled()
  else addEventListener('load', startWhenSettled, { once: true })
}
