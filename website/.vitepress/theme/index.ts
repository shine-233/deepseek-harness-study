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
  },
} satisfies Theme
