# Agent Note：进度总览页——四本账一页对齐

Status: implemented

[English](2026-08-25-progress-overview-page.md) | 中文

## Problem

进度散在四处从不见面：pill 数已读课、实验室总览数亲手做过的实验、自测成绩挂在每课、错题本管复习队列。没有任何一页能回答「我整体学到哪了」——集章卡只覆盖六个精选课，其余全是没有名字的数字。

## Decision

`progress.html` 按 study-review.html 范式做成独立页。课程名单在运行时从 `./sitemap.xml` 推导——与构建生成的是同一份事实来源，新课文自动进名单（实验室总览标题硬编码数字两次过期的教训不再重演）。实验室 id 来自 study-progress-core.js 的 `LAB_PAGE_IDS`。纯函数（`parseSitemapLessons`、`lessonRow`、`labRow`）导出并在 Node 测试（5 条：URL 解码、数字排序、去重、坏输入容忍、状态映射）。页面自己的 CSP 把 `connect-src` 从 'none' 放宽到 'self'——唯一新增是同源 sitemap 读取，其余保持实验室级严格边界。

## Alternatives considered

**像集章卡一样硬编码课程名单。** 否决：集章卡六条目写完一周就过期了；sitemap 推导的名单自我维护，file:// 预览下 fetch 失败时还有「只列本机标记过的课」的兜底并明示。

**做进 VitePress 当站点页面。** 否决：页面要读 localStorage 和 sitemap，SSG 里都别扭；独立页范式（study-review.html）已经把外壳、主题引导和 CSP 都解决了。

**同时做模拟考。** 否决：跨章节组卷要动 quiz bank 的组合逻辑，那是另一条工作线的属地；本轮先补缺失的阅读侧。

## Consequences

读者现在能在一页看到全部 38 课、53 个实验室、每课自测成绩和错题到期数：已读行划线加 ✓，自测成绩以品牌色徽标挂在课名后。页面诚实地降级：拿不到 sitemap 时只列本机标记过的课并明示。已构建站点实测：38 行课程、53 行实验室、标记过的课显示 ✓ 与 2/3 徽标、移动端横向溢出 0px、零页面错误、五条视图模型测试通过。
