# 最小插件工作台

[English](README.md) | 中文

这个目录是学习仓库的离线插件实验台。它把 `src/minimal-plugin.ts` 编译成 `dist/minimal-plugin.js`，再用真实的 Cordis `Context` 和 Loader 加载这个构建产物，最后通过 Loader 移除 entry 并断言服务与定时器都完成清理。

它不是可发布的 npm 包，也不启动 DSH Web/CLI、不调用真实模型、不访问网络。需要先在仓库根目录执行 `pnpm install`；第一次运行前执行：

```sh
pnpm --dir study-tools/minimal-plugin-workbench run build
pnpm --dir study-tools/minimal-plugin-workbench run verify
```

`verify` 的输出是机器可读 JSON，至少包含 `result: "PASS"`、构建入口、Loader entry、服务状态、卸载后的剩余 entry 数量，以及模型/网络请求计数。`dist/` 是临时构建输出，不应提交。

配套学习课是 [`study/35-最小插件工作台.md`](../../study/35-最小插件工作台.md)。
