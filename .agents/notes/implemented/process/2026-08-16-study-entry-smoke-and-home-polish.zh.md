# Agent Note: 学习入口 smoke 检查与首页优先呈现

Status: implemented

[English](2026-08-16-study-entry-smoke-and-home-polish.md) | 中文

## Problem

学习网站已经有需要的路由内容，但第一屏暴露的选择比第一次阅读真正需要的更多。仓库也有 manifest 和投影测试，却没有一个小检查明确点名完整的第一次路径：首页、START-HERE、基础课、示例 README 以及 Pages alias。

## Decision

学习首页保留三个第一屏动作：开始引导路线、照着完成 15 分钟任务，或打开需要终端的示例。文件搜索、Codespaces、社区研究和质量检查留在下一层路线表与侧栏，不和第一次点击竞争。默认 VitePress 主题增加克制的呈现层，用于 hero 层次、功能卡片、焦点状态、移动布局和减少动画偏好。

`study-tools/verify-study-entry.mjs` 检查这条短路径所需的源文件、文案标记和发布 manifest。它不会启动 DSH、运行 VitePress、点击浏览器，也不能声称读者已经理解课程。它的单元测试加入现有的离线学习工具测试层，study-quality 工作流把脚本作为独立的确定性步骤运行。

## Alternatives considered

**把所有目的地都保留为首屏按钮。** 否决，因为第一次阅读应该一次只做一个选择；完整目的地列表仍在下一层可见。

**把 manifest 测试当成浏览器 smoke test。** 否决，因为源 manifest 能证明路由意图，不能证明 clean URL 服务、视觉布局、响应式行为或读者理解。

**新增一个服务端或客户端应用后端。** 否决，因为这个仓库发布的是静态 VitePress 产物；有价值的“后端式”接缝是源文件到站点的投影器及其确定性检查，而不是再加一个运行时服务。

## Consequences

首页的第一次决策更少，视觉层次更清楚。短路径缺少源文件或映射时，无需凭据或 DSH 进程即可快速失败。浏览器渲染和可访问性仍需要构建后站点或真实浏览器检查，而且这个检查有意不能证明 DSH 运行时行为。
