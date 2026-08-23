# Agent Note：课程页吉祥物伴侣响应判分与进度事件

Status: implemented

[English](2026-08-23-mascot-companion.md) | 中文

## Problem

像素吉祥物「阿溟」、集章卡和全部趣味时刻都只在首页。学习者真正停留的课程页除了题目文字没有任何反馈：做完自测、标记已读都没有可见的庆祝，阅读体验和首页宣传的进度玩法完全脱节。

## Decision

新增注入式模块 `website/public/study-companion.js`，沿用 `study-progress.js` 的架构：纯数据与渲染函数导出供 Node 测试，DOM 操作收在浏览器守卫里，路由跟随用去抖 MutationObserver。

- 精灵复用首页的像素网格与调色板（22×21 字符贪婪合并成 SVG rect，眼睛格打标以驱动 CSS 眨眼循环）。`JournalHome.vue` 暂保留私有副本——该文件正被并行工作流改动，两份合并到单一模块留作后续事项。
- 精灵只出现在 `/study/lessons/` 路由。待机时眨眼，庆祝时跳跃，气泡台词分三类：点击戳它有彩蛋句、测验满分给表扬、其余成绩给鼓励；标记已读则提示回首页集章。
- 触发契约：`study-progress.js` 在判分与标记已读时分发 `dsh-study-delight` CustomEvent（`{kind:'quiz', score, total}` 与 `{kind:'done', lessonId}`），伴侣在 `document` 上监听，两侧可独立演化。
- `prefers-reduced-motion` 下停用眨眼与跳跃动画，气泡退化为普通状态区域；打印样式里整个组件隐藏。

## Alternatives considered

**通过包装 VitePress Layout 组件挂载。** 否决：包装默认 Layout 有破坏应用根节点 CSS 假设的风险，且 Vue 组件无法被现有的 Node 实验门禁单测；注入脚本模式已有测试基建和 SPA 路由处理。

**立刻让 JournalHome 与伴侣共享同一份精灵模块。** 暂缓：JournalHome 正处于并行工作流中，五十行数据重复比在别人文件里制造合并冲突便宜；后续应把 Vue 侧迁移到共享模块。

## Consequences

学习者在全部 37 个课程页获得一致的小奖励回路：答好自测阿溟会庆祝，标记已读会收到集章提示。功能只新增一个全站脚本标签，零布局改动，另有四个 Node 测试覆盖导入安全、网格完整性、调色板覆盖与台词池卫生。
