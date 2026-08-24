# Agent Note：reading.css 死规则清理与首页全出血溢出裁剪

Status: implemented

[English](2026-08-24-reading-css-dead-rules-and-mobile-overflow.md) | 中文

## Problem

`reading.css` 里还留着首页从卡片网格换成手账后删掉的区块规则：`dsh-home-contract`、`dsh-home-learning-*`、`dsh-route-*`、`dsh-status-*`、`dsh-stuck-*`、`dsh-proof-item/strip`、`dsh-learning-map/step`、`dsh-no-prereq-*`、`dsh-overview-kicker/summary`、`dsh-feedback-*`——36 个类族、627 行，任何活选择器都到不了它们。HANDOFF 把这项清理登记为待办。另外，手账首页的 `.dj-page` 用负内边距做全出血纸纹，375px 视口下盒子右缘超出 16px，文档出现横向滚动。

## Decision

用按块结构处理的脚本删掉选择器里引用了任一死 `dsh-*` 类的规则，包括 `@media` 内的规则和混合选择器组里的死成员。自定义属性（`--dsh-reading-*`、`--dsh-font-*`）保留：活规则仍在消费。被删规则附带的注释随规则一起删。文件从 1,593 行降到 966 行。

横向滚动由 `reading.css` 里的 `.VPPage { overflow-x: clip }` 解决，不改 `.dj-page` 的边距：`clip`（不同于 `hidden`）不创建滚动容器、不破坏 sticky 定位，而且一条规则覆盖页面容器内现在和将来的所有全出血区块。

## Alternatives considered

**手工删 36 个类族。** 否决：找到它们的审计在下次首页改版后还会再跑，带结构自检（注释配对、花括号平衡、损坏即还原）的可重复脚本比再手工过一遍便宜。

**在 `body` 上加 `overflow-x: hidden`。** 否决：把 `body` 变成滚动容器可能破坏 VitePress 的 sticky 侧栏；`clip` 加在更窄的 `.VPPage` 容器上两个问题都没有。

**把 `.dj-page` 边距改成 `50vw` 全出血惯用法。** 否决：为只存在于移动端的症状改动桌面端布局计算，而 `50vw` 的滚动条宽度副作用恰好落在要修的窄视口上。

## Consequences

样式表不再描述已删除的 UI，下次读首页代码的人不用反向排查哪些类还存在。清理可以用同一份死类清单重复执行；结构自检不可省——第一轮脚本弄坏了两处注释（一个未闭合的 `/*` 吞掉了其后全部规则，课程页目标卡网格因此消失），自检现在失败即还原输入文件。验证以重建为准：首页截图差 0.05%（吉祥物眨眼帧差），课程页 0.00%；28 个 doc-sync 门禁与 407 个 study-tools 测试全绿；首页、课程、实验室、索引页的移动端横向溢出为 0px。
