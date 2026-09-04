# Agent Note：wordmark 以外部 symbol sprite 发布

Status: implemented

[English](2026-08-26-wordmark-symbol-sprite.md) | 中文

## 问题

`siteTitle` 内嵌了完整的 10KB wordmark 标记。VitePress 会把 `themeConfig` 序列化进每个构建页的 payload，同一段路径数据因此每页重复约十次——全站 859 份副本、约 8MB 冗余，还不算导航栏渲染的那一份。

## 决策

`website/public/wordmark.svg` 改为 `<symbol id="dsh-mark">` sprite，`siteTitle` 只嵌一个约 130 字节的存根：`<svg class="dsh-wordmark" viewBox="0 0 143 23" aria-hidden="true"><use href="…/wordmark.svg#dsh-mark"/></svg>`。外部引用保住了 `currentColor`——symbol 的填充解析到使用方文档，暗色与亮色主题依旧无需 JavaScript 即可重绘标志。

## 否决的替代方案

- **用 `<img src>` 引 sprite**——虽然少一行代码，但会把标志冻结为文件声明的填充色，破坏暗色模式重绘。
- **继续把标记内联在 `siteTitle` 中**——这正是造成重复的现状（全站 859 份副本、约 8MB 冗余）。

## 后果

每页 payload 减重约 20KB；导航栏渲染不变、仍然零 JS。sprite 是每次访问站点多一个可缓存的请求。今后修改 wordmark 必须保留 `<symbol id="dsh-mark">` 包裹——`config.ts` 按这个 id 引用，删掉它所有导航栏会一起变空白。

## 测试

Playwright 验收（5 断言）：导航栏 svg 按设计尺寸渲染（137×22）、存根携带 `#dsh-mark` 引用、暗色模式重绘（`rgb(60,60,67)` → `rgb(223,223,214)`）、sprite 资源可达且含目标 symbol、课程页 payload 中 wordmark 实例恰为一。构建保持五绿。
