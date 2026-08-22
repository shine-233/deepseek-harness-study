/**
 * Documentation-site theme.
 *
 * Extends the default VitePress theme rather than replacing it, so the sidebar,
 * locale routing, outline, search and the light/dark appearance switch keep
 * working and keep their accessibility behaviour. This file adds only what the
 * default theme has no answer for: embedding a lesson widget inside a lesson.
 */

import type { Theme } from 'vitepress'
import { withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LessonWidget from './LessonWidget.vue'
import './lesson-widget.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LessonWidget', LessonWidget)
    // 学习进度与自测题组件：客户端注入一次（构建期的 SSR 上下文跳过），
    // 模块内部用 MutationObserver 跟随 VitePress 的单页路由切换。
    // withBase 是官方的 base 解析方式，替代早期从 favicon 反推站点根的做法。
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = withBase('study-progress.js')
      document.head.append(script)
    }
  },
} satisfies Theme
