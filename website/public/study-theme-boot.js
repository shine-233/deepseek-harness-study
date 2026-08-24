/**
 * 首次绘制前套用已保存的主题选择。
 *
 * 这个文件必须在 `<head>` 里同步加载，而且要排在样式表之前那一刻之后、body 之前：
 * 晚一步就会先按系统偏好画一帧，再跳到用户选的主题，也就是一次可见的闪烁。
 *
 * 页面 CSP 是 `script-src 'self'`，禁止内联脚本，所以这段不能写进 HTML——为了避免
 * 一次闪烁去放开 `unsafe-inline` 不值得，这些页面的离线和同源承诺比闪烁重要。
 *
 * 只读一个三值偏好，不写任何东西；按钮的行为在 study-lab-theme.js。
 */

(() => {
  const KEY = 'dsh-study-theme'
  try {
    const mode = localStorage.getItem(KEY)
    // 只有显式选择才写属性；没存过就让 study-tokens.css 的媒体查询接管。
    if (mode === 'light' || mode === 'dark') {
      document.documentElement.setAttribute('data-theme', mode)
    }
  } catch {
    // 隐私模式或策略禁用存储时读不到，页面跟随系统偏好，功能不受影响。
  }
  // 动画总闸同理：上一页按了「暂停动画」，这一页首帧就保持静止，
  // 否则会先播一段再停。键名与 study-lab-kit.js 的 MOTION_PAUSE_KEY 一致。
  try {
    if (localStorage.getItem('dsh-study-motion') === 'paused') {
      document.documentElement.setAttribute('data-motion', 'paused')
    }
  } catch {
    // 读不到偏好就正常播放，与未做过选择的页面行为一致。
  }
})()
