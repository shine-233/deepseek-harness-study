# Agent Note: 离线最小插件生命周期工作台

Status: implemented

[English](2026-08-17-minimal-plugin-workbench.md) | 中文

## 问题

学习路线已经解释插件生命周期和卸载证据，但没有一条很小、可运行的路径把构建后的插件产物交给真实 Loader，再证明清理已经完成。静态代码片段不能证明 Loader 能导入产物、激活 Fiber 或移除它提供的服务。

## 决策

仓库新增 `study-tools/minimal-plugin-workbench`。它把 TypeScript 源码编译成被忽略的 `dist/minimal-plugin.js`，再创建真实 Cordis `Context`，安装真实 `@deepseek-ai/cordis-plugin-loader`，为构建产物创建 Loader entry，读取插件通过 `ctx.provide()` 注册的服务，观察心跳 effect，移除 entry，并断言服务消失、entry 树为空、卸载后的心跳保持停止。

这个工作台是离线学习工具，不是发布包。它不发起模型请求、网络请求、Host/Web 启动、凭据读取或真实热更新。配套中文课程记录了证据边界，并链接实现文件供继续阅读。

## 曾考虑的替代方案

**静态输出或伪造注册表**：否决。它不会执行 Cordis Fiber 所有权、Loader 模块导入、服务注册或 disposer 顺序。

**完整 DSH Host/Web 组合**：第一项练习不采用。它会在学习者获得最小生命周期证据之前引入模型、端口、浏览器和平台条件；课程明确把这些列为独立的未验证范围。

**单独发布 npm 包**：否决。这个工作台是固定版本的教学夹具，生成的 `dist/` 有意只在本地存在；发布和消费者安装证据应由真正的扩展项目承担。

## 后果

学习者无需 API key 或网络即可重现构建 → Loader 注册 → 卸载闭环。smoke 断言真实可观察的运行时关系，而不是相信一行成功文本。这个练习不认证 DSH Profile、Bundle、Web/CLI Host、真实模型、第三方安装或跨平台行为。

## 验证

`pnpm --dir study-tools/minimal-plugin-workbench run build` 编译插件并写入确定性的产物摘要。`pnpm --dir study-tools/minimal-plugin-workbench run verify` 通过 Loader 加载产物，并通过服务激活、心跳增长、服务进入 disposed、服务消失、剩余 entry 为零以及卸载后心跳稳定等断言。
