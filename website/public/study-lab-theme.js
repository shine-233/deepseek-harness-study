/**
 * 主题切换：在「跟随系统」「浅色」「深色」之间切换。
 *
 * 页面默认跟随系统偏好，这是 study-tokens.css 里媒体查询那份深色板的职责。
 * 用户点一下才写入 `data-theme`，也就是显式覆盖；再点回「跟随系统」会把属性删掉，
 * 控制权交还给媒体查询。
 *
 * 选择存在 localStorage。这是本地存储，不是网络请求——页面的 `connect-src 'none'`
 * 依然成立，也没有记录任何阅读行为，只有一个三值的主题偏好。
 *
 * 首次绘制前生效要靠 HTML 里的一小段内联脚本先读 localStorage 写好属性；
 * 本模块只负责按钮的行为和状态。
 */

const STORAGE_KEY = 'dsh-study-theme'
const MODES = ['system', 'light', 'dark']
const LABELS = { system: '跟随系统', light: '浅色', dark: '深色' }
const ICONS = { system: 'gauge', light: 'sun', dark: 'moon' }

/** localStorage 在隐私模式或被策略禁用时会抛错，读不到就当「跟随系统」。 */
function storedMode() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return MODES.includes(value) ? value : 'system'
  } catch {
    // 存储不可用时不降级功能，只是记不住选择。
    return 'system'
  }
}

function persist(mode) {
  try {
    if (mode === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // 记不住就算了；当前这次切换已经生效。
  }
}

/** 只有显式选择才写属性；跟随系统时属性必须不存在，媒体查询才能接管。 */
function applyMode(mode) {
  const root = document.documentElement
  if (mode === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', mode)
}

/** 同步移动端浏览器 UI 的染色（地址栏 theme-color），与页面主题保持一致。 */
function syncThemeColor(mode) {
  const dark = resolved(mode) === 'dark'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta !== null) meta.setAttribute('content', dark ? '#0d1117' : '#fbf8f3')
}

function resolved(mode) {
  if (mode !== 'system') return mode
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * 把一个按钮接成主题切换器。
 *
 * @param button 目标按钮；缺失时直接返回，页面仍然跟随系统。
 * @param renderIcon 可选，(name) => SVGElement；不传就只显示文字。
 * @returns 当前模式的读取函数。
 */
export function installThemeToggle(button, renderIcon = null) {
  if (!(button instanceof HTMLElement)) return () => storedMode()

  let mode = storedMode()
  applyMode(mode)

  const label = document.createElement('span')
  label.className = 'theme-toggle-label'
  button.replaceChildren()
  if (typeof renderIcon === 'function') {
    const icon = renderIcon(ICONS[mode])
    if (icon !== null && icon !== undefined) button.append(icon)
  }
  button.append(label)

  const paint = () => {
    label.textContent = LABELS[mode]
    // aria-pressed 只有两态，所以它报告的是「是否覆盖了系统偏好」，
    // 三值状态由 aria-label 和可见文字承担。
    button.setAttribute('aria-pressed', String(mode !== 'system'))
    button.setAttribute('aria-label', '主题：' + LABELS[mode] + '（当前为' + (resolved(mode) === 'dark' ? '深色' : '浅色') + '），点击切换')
    button.dataset.mode = mode
    if (typeof renderIcon === 'function') {
      const old = button.querySelector('svg')
      const icon = renderIcon(ICONS[mode])
      if (old !== null && icon !== null && icon !== undefined) old.replaceWith(icon)
    }
  }

  button.addEventListener('click', (event) => {
    mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length]
    const apply = () => {
      applyMode(mode)
      persist(mode)
      paint()
      syncThemeColor(mode)
    }
    // 主题切换的圆形扩散（View Transitions，2026 广泛支持）：
    // 新主题快照以点击点为圆心 clip-path 揭示；双层降级——
    // 减少动态偏好或 API 缺失时直接切换，视觉与从前一致。
    const reduced = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof document.startViewTransition !== 'function') {
      apply()
      return
    }
    const root = document.documentElement
    if (event.detail > 0 && typeof event.clientX === 'number') {
      root.style.setProperty('--vt-x', `${event.clientX}px`)
      root.style.setProperty('--vt-y', `${event.clientY}px`)
    }
    document.startViewTransition(apply)
  })

  // 跟随系统时，系统切换要更新按钮上写的「当前为深色/浅色」。
  if (typeof window.matchMedia === 'function') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (mode === 'system') {
        paint()
        syncThemeColor(mode)
      }
    })
  }

  paint()
  syncThemeColor(mode)
  return () => mode
}
