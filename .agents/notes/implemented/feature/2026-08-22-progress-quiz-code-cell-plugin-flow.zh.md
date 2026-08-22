# Agent Note：学习进度、判分自测、可运行代码格与插件事件流实验室

状态：已实现

[English](2026-08-22-progress-quiz-code-cell-plugin-flow.md) | 中文

## 问题

对照自身基准，课程有四个缺口：学习进度随页面消亡（实验输入只活在 URL hash 里）、00–02 课没有可判分的自测、教学片段只能跳去终端执行、第 11 课的订阅/拒绝/卸载语义只有散文没有实验。

## 决定

四块内容，各自沿用既有实验室契约：

1. **进度（`study-progress-core.js` + `study-progress.js`，v2）。** 右下角小组件标记/撤销"本课已读"；状态只存 `localStorage` 键 `dsh-study-progress-v1`，读写都防御隐私模式失败，并带 JSON 导出/导入以便跨设备搬运。研究桥接页保持显式无存储承诺——进度不是用户输入数据。实验页也计入进度（`labs` 表、`markLabDone`）。模块自带 DOM 守卫，`lab-modules-import-without-dom` 门禁可以在 Node 里导入它。
2. **自测题（`study-quiz.js`）。** 每个试点课（00/01/02）三道标注出处的题；客户端即时判分；答错显示解释并链回对应小节。每课最好成绩写入进度。
3. **可运行代码格（`study-code-cell.js`）。** 标记为 `js-run` 的围栏块变成「编辑器 + 运行 + 输出」三件套。用户代码在 sandbox="allow-scripts"（无同源）的内联 srcdoc iframe 里执行——宿主页面不做 eval，不用外部服务，没有网络请求。输出经 postMessage 回传并封顶 200 行；沙箱是透明源，碰不到页面存储。
4. **插件事件流实验室（`plugin-flow-model.js` + 页面三件套）。** 把最小观察插件画成一条跨工具/事件总线/观察插件/Session 日志四条 lane 的有序时间线，带场景（正常/策略拒绝/中途卸载）、订阅开关、预览长度、预测题门控、独立校验（`FLOW_DETERMINISTIC`、`LOG_COMPLETE`、`PREVIEW_RULE`、`EFFECTS_CLEAN`、`UNLOAD_SEMANTICS`）、完整文字表和 hash 状态链接。与同一段观察逻辑的 `js-run` 走查一起接入第 11 课。

注入方式从探测 favicon 的内联脚本迁到官方扩展点：`theme/index.ts` 用 `withBase` 加载模块。

## 备选方案

- 用 `new Function` 在页面内直接编辑执行：否决——实验室页面的 CSP 有意严格（`unsafe-eval` 是安全退步），且宿主页面的 eval 让用户代码能碰到页面存储。
- WebContainers 或远程 Playground 类运行时：否决——外部服务、网络依赖和授权成本，与离线、无后端的立场冲突。
- 流程实验室的步进滑杆：暂缓——compaction 实验室同样没有；前缀截断会重复 turn-flow 的 oracle 语义，却不增加新的教学点。

## 后果

- 进度状态现在存放在 localStorage；START-HERE 的隐私披露覆盖了它，跨设备改用导出/导入。
- 以后每个公开模块都必须把 DOM 访问放进环境守卫；import 门禁会替我们盯着这件事。
- 自测题成为新的维护面：新增试点课时需要配带出处的题目，否则题库会悄悄停在三个课。
- 第 11 课现在带两个交互嵌入加三段代码围栏，是全站最重的教学页；下一轮浏览器 QA 要盯构建体积和移动端布局。

## 验证

`node --test study-tools/*.test.mjs` 全绿（plugin-flow 新增 12 例，含篡改与全网格覆盖）；修复 import 门禁抓到的顶层 DOM 访问后，`study:quick-check -- --example --runtime` 通过；`docs:build` 通过，首页指标重新同步（227 + 8）。

## 边界

自测只覆盖试点课；代码格运行 JavaScript，不是 TypeScript 也不是 DSH 本体；模拟器是教学模型，不是真实 Loader 轨迹。
