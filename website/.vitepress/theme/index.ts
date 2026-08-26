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
import JournalHome from './JournalHome.vue'
import LessonWidget from './LessonWidget.vue'
import './lesson-widget.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LessonWidget', LessonWidget)
    // 手账首页组件：全局注册后，根目录 SITE-HOME.md（投影为 index.md）
    // 直接写 <JournalHome /> 即可渲染完整的鲸落手账首页。
    app.component('JournalHome', JournalHome)
    // 学习进度与自测题组件：客户端注入一次（构建期的 SSR 上下文跳过），
    // 模块内部用 MutationObserver 跟随 VitePress 的单页路由切换。
    // 用编译期替换的 BASE_URL 拼绝对路径——withBase 在部分构建里拿不到站点前缀，
    // 会把 src 解析成课程页目录下的相对路径（线上 404 的根因）。
    if (typeof window !== 'undefined') {
      // 根 tsconfig 不含 vite/client 类型，这里对 import.meta.env 做一次显式窄化。
      const env = (import.meta as unknown as { env?: { BASE_URL?: string } }).env
      const base = env?.BASE_URL ?? '/'
      // 公共页面（错题本等）运行时拼绝对链接用；先写值再注入脚本。
      ;(window as unknown as { __DSH_STUDY_BASE__?: string }).__DSH_STUDY_BASE__ = base
      const script = document.createElement('script')
      script.type = 'module'
      script.src = (base.endsWith('/') ? base : base + '/') + 'study-progress.js'
      document.head.append(script)
      // 滚动引导：只在带 data-scrolly 容器的课程页实际渲染，其余页面开销是一次扫描。
      const scrolly = document.createElement('script')
      scrolly.type = 'module'
      scrolly.src = (base.endsWith('/') ? base : base + '/') + 'study-scrolly.js'
      document.head.append(scrolly)
      // 吉祥物伴侣：只在 /study/lessons/ 课程页出现，响应判分与“标记已读”事件。
      const companion = document.createElement('script')
      companion.type = 'module'
      companion.src = (base.endsWith('/') ? base : base + '/') + 'study-companion.js'
      document.head.append(companion)
      // 阿溟的插件面板：等伴侣挂载后叠加行为插件（巡游/打盹/眼神跟随/拖拽），
      // 面板可实时卸载插件演示 dispose 语义。无伴侣的页面静默退出。
      const petPlugins = document.createElement('script')
      petPlugins.type = 'module'
      petPlugins.src = (base.endsWith('/') ? base : base + '/') + 'study-pet-plugins.js'
      document.head.append(petPlugins)
      // 测试层次模型：只在带 data-dsh-testlayers 容器的课程页实际渲染。
      const testLayers = document.createElement('script')
      testLayers.type = 'module'
      testLayers.src = (base.endsWith('/') ? base : base + '/') + 'study-testlayers.js'
      document.head.append(testLayers)
      // 目标路线选择器（20 课）与研究优先级看板（26 课）：同样按容器存在才渲染。
      const routes = document.createElement('script')
      routes.type = 'module'
      routes.src = (base.endsWith('/') ? base : base + '/') + 'study-routes.js'
      document.head.append(routes)
      const researchBoard = document.createElement('script')
      researchBoard.type = 'module'
      researchBoard.src = (base.endsWith('/') ? base : base + '/') + 'study-research-board.js'
      document.head.append(researchBoard)
      // 仓库地图探索器（01 课）与三种环境对比器（21 课）：同样按容器存在才渲染。
      const repomap = document.createElement('script')
      repomap.type = 'module'
      repomap.src = (base.endsWith('/') ? base : base + '/') + 'study-repomap.js'
      document.head.append(repomap)
      const envCompare = document.createElement('script')
      envCompare.type = 'module'
      envCompare.src = (base.endsWith('/') ? base : base + '/') + 'study-envcompare.js'
      document.head.append(envCompare)
      // 索引卡片字段注解器（08 课）：同样按容器存在才渲染。
      const indexCard = document.createElement('script')
      indexCard.type = 'module'
      indexCard.src = (base.endsWith('/') ? base : base + '/') + 'study-indexcard.js'
      document.head.append(indexCard)
      // 裁决矩阵（17 课）、迁移步进器（18 课）、抽查结果浏览器（24 课）、
      // 检查边界浏览器（29 课）：同样按容器存在才渲染。
      const verdict = document.createElement('script')
      verdict.type = 'module'
      verdict.src = (base.endsWith('/') ? base : base + '/') + 'study-verdict.js'
      document.head.append(verdict)
      const migration = document.createElement('script')
      migration.type = 'module'
      migration.src = (base.endsWith('/') ? base : base + '/') + 'study-migration.js'
      document.head.append(migration)
      const auditCards = document.createElement('script')
      auditCards.type = 'module'
      auditCards.src = (base.endsWith('/') ? base : base + '/') + 'study-auditcards.js'
      document.head.append(auditCards)
      const pipeline = document.createElement('script')
      pipeline.type = 'module'
      pipeline.src = (base.endsWith('/') ? base : base + '/') + 'study-pipeline.js'
      document.head.append(pipeline)
      // 全站滚动编排：标题/表格/引用块进入视口时按组错峰入场。
      // 无 JS、reduced-motion 时内容原样可见（隐藏态由脚本自己加）。
      const motion = document.createElement('script')
      motion.type = 'module'
      motion.src = (base.endsWith('/') ? base : base + '/') + 'study-motion.js'
      document.head.append(motion)
    }
  },
} satisfies Theme
