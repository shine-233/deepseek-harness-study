/**
 * Documentation-site theme.
 *
 * Extends the default VitePress theme rather than replacing it, so the sidebar,
 * locale routing, outline, search and the light/dark appearance switch keep
 * working and keep their accessibility behaviour. This file adds only what the
 * default theme has no answer for: embedding a lesson widget inside a lesson.
 */

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LessonWidget from './LessonWidget.vue'
import './lesson-widget.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LessonWidget', LessonWidget)
    // 学习进度与自测题组件：客户端注入一次（构建期的 SSR 上下文跳过），
    // 模块内部用 MutationObserver 跟随 VitePress 的单页路由切换。
    // 用编译期替换的 BASE_URL 拼绝对路径——withBase 在部分构建里拿不到站点前缀，
    // 会把 src 解析成课程页目录下的相对路径（线上 404 的根因）。
    if (typeof window !== 'undefined') {
      // 根 tsconfig 不含 vite/client 类型，这里对 import.meta.env 做一次显式窄化。
      const env = (import.meta as unknown as { env?: { BASE_URL?: string } }).env
      const base = env?.BASE_URL ?? '/'
      const script = document.createElement('script')
      script.type = 'module'
      script.src = (base.endsWith('/') ? base : base + '/') + 'study-progress.js'
      document.head.append(script)
    }
  },
} satisfies Theme
