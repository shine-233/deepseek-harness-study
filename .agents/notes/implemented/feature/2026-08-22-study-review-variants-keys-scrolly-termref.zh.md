# Agent Note: 错题本、题目变体、实验键盘、滚动引导与正文图联动

Status: implemented

[English](2026-08-22-study-review-variants-keys-scrolly-termref.md) | 中文

## Problem

对照顶级交互教学站点（Distill.pub、VisuAlgo、ncase.me、MIT 6.824、Pudding.cool）的模式调研，本站实验体系还剩五个具体缺口：

1. 只有一个实验页（code-mode-evidence）响应方向键；其余时间轴类实验只能用指针拖。
2. 自测判分只记总分，忘了哪道题答错；没有回到错题的路径。
3. 每次做题的题目和选项顺序都一样，位置记忆可以冒充真实记忆。
4. 包依赖图只在自己内部联动，正文没法指向某个包。
5. 第 04 课嵌了 turn-flow 组件，但没有随滚动讲解同一条轨迹的引导。

## Decision

1. **共享键盘步进**：`study-lab-kit.js` 新增纯函数 `nextRangeValue` 和薄 DOM 层 `bindRangeKeys`，接入 turn-flow、session-log、llm-stream、compaction 四页的主滑块。焦点在表单控件上时浏览器原生行为不变；否则 ←/→ 逐步、Home/End 直达首末，改动通过既有 `input` 接线提交。各页滑块提示写明按键。
2. **错题本**：新纯函数模块 `study-review-core.js`，每道错题一条记录（`lessonId|qid`、streak、作答时刻、到期日），存 `dsh-study-review-v1`。答错明天再见；之后每答对一次间隔按 1→3→7→16 天拉长。独立页 `study-review.html` 渲染到期队列，逐题「记住了 / 还没记住」，带课文出处回链和 JSON 导入导出。进度小挂件给出入口和实时计数。
3. **种子随机变体**：`study-quiz.js` 新增纯函数 `mulberry32` + `shuffleQuiz`，打乱题目顺序和选项顺序，正确答案下标跟着自己的文本走。判分后出现「再练一轮」按钮，换一颗新种子重排。
4. **滚动引导**：`study-scrolly.js`（与进度加载器同样由主题注入）把第 04 课里的空容器 `<div data-scrolly="turn-flow">` 变成左图右文：粘性轨迹图画泳道、圆点和载荷配对线，数据与实验页共用同一个 `buildTurnModel`。六段解说都是原生按钮；IntersectionObserver 驱动推进，点击可跳。
5. **正文↔图联动**：包依赖图说明文字新增三个 `<button data-graph-id>` 术语（core/agent、llm/llm、skill/skill）；悬停或聚焦经既有 linker 在散点、柱视图和表格三处同时高亮同一包，点击滚动到对应表行。

## Alternatives considered

- 把错题塞进学习进度存储（升 v3）：拒绝——进度回答「做了什么」，错题本回答「该复习什么」，生命周期不同，分开存避免动 v2 契约做迁移。
- 带 ease 因子的 SM-2：拒绝——四档固定间隔一句话能讲清，测试也不用碰浮点。
- 不存种子的纯随机重排：对重练按钮接受（变体暂时不需要跨人复现）；API 按种子设计，留了门。
- 把滚动引导放进 iframe 里的实验页：拒绝——叙事属于课程正文，iframe 边界也会和 sticky 定位打架。

## Consequences

- 多一个 localStorage 键（`dsh-study-review-v1`）；除显式导出外不出本机，承诺与进度一致。
- `data-learning-tests` 从 237 变 249，首页数字条在同一次改动里更新（验证器钉住这个值）。
- `study-review.js` 与 `study-scrolly.js` 纳入无 DOM 导入门禁覆盖；模型逻辑全部留在 Node 可测模块里。
- 判分代码路径不变：变体就是普通的题目数组，以后加新题自动获得打乱能力。

## Verification

`node --test study-tools/*.test.mjs` 278/278（新增 12：复习排程 8、变体与按键 4）；`verify-lab-contrast` 78 组配色通过；完整 `pnpm run docs:build` 全绿，含 verify-doc-site-fragments（5,976 处引用）、verify-built-study-site、verify-study-publication（108 源 → 108 页 → 13,474 链接）、学习体验契约、首页指标（249）。

## Boundaries

新界面还没做真实浏览器走查（粘性图的焦点顺序、窄屏下滚动引导的堆叠、读屏对段落切换的播报）；第 33 课仍把这类项列为未知。复习间隔是教学常数，不声称来自最优间隔研究的结论。
