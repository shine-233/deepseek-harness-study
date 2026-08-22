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
6. **播放按钮（跟进批次）**：kit 新增纯函数 `nextPlayValue` 与薄 DOM 层 `bindAutoAdvance`，给 turn-flow、session-log、llm-stream、compaction 四页配上「播放/暂停」按钮：按各实验节奏扫完全程（turn-flow 700ms 便于读阶段说明，session-log 450ms 应对密集格，llm-stream 320ms 贴近流式体感，compaction 800ms 看柱形逐档变化），任何外部来源的输入（拖动或键盘步进——用自派发标记识别，不能用 isTrusted，因为重新派发的事件永远不可信）立即暂停，末帧自动停；减少动态效果时退化为一次点击走一帧。
7. **模板化生成题（跟进批次）**：`generatedQuestionsFor` 用实验页渲染所用的同一批模型函数出题——第 04 课三道（两个固定步骤的泳道、完整轨迹的模型请求数），第 05 课三道（两种场景的工具调用数、「序号有缺口」场景在哪里停下）。id 稳定（`gen-04-lane-5` 式），错题本解析因此可用；选项按稳定顺序排列，位置随机仍交给 `shuffleQuiz`。`allQuestionsFor` 在组合层拼接，不触碰钉死为每课 3 道的手写题库。
8. 9. **截图驱动的视觉打磨（跟进批次）**：用 Playwright 对首页和 turn-flow 做前后截图审计，发现首页四条不同底色的满宽提示块堆叠、实验页大标题把「必须」拆成两行、预测选项没有选中态反馈、按钮无悬停回应、指标表用了比例数字。全部用手写 CSS 在既有令牌上修：首页自定义块统一为一族表面加 3px 左重音线（warning 经 color-mix 保留暖色但降饱和），引用行改为品牌色左线；实验页 h1 用 text-wrap balance；预测选项加 ：has(input:checked) 品牌底、悬停轻移与 focus-visible 环；新增共享 --ease-out-soft 缓动；按钮悬停上浮 1px 带软阴影、按下回落；dd/td/th 启用 tabular-nums；滑块取品牌 accent-color。动效只用 transform/opacity 且在 prefers-reduced-motion 下全部关闭。

**第三处互链（跟进批次）**：research-debug 桥接页把说明文字里的四个出口状态名改成按钮，悬停即高亮流程带上的对应文字；tool-visibility 导语的 已注册 / 对模型可见 / 允许执行 改为可聚焦按钮，悬停或聚焦让对应指标卡闪现高亮（`.term-flash`，共享 shell 样式）。

## Alternatives considered

- 把错题塞进学习进度存储（升 v3）：拒绝——进度回答「做了什么」，错题本回答「该复习什么」，生命周期不同，分开存避免动 v2 契约做迁移。
- 带 ease 因子的 SM-2：拒绝——四档固定间隔一句话能讲清，测试也不用碰浮点。
- 不存种子的纯随机重排：对重练按钮接受（变体暂时不需要跨人复现）；API 按种子设计，留了门。
- 把滚动引导放进 iframe 里的实验页：拒绝——叙事属于课程正文，iframe 边界也会和 sticky 定位打架。

## Consequences

- 多一个 localStorage 键（`dsh-study-review-v1`）；除显式导出外不出本机，承诺与进度一致。
- 学习测试计数随跟进批次增到 286，首页数字条钉在 256 + 8（验证器强制同步）。
- `study-review.js` 与 `study-scrolly.js` 纳入无 DOM 导入门禁覆盖；模型逻辑全部留在 Node 可测模块里。
- 判分代码路径不变：变体就是普通的题目数组，以后加新题自动获得打乱能力。

## Verification

`node --test study-tools/*.test.mjs` 286/286（本功能累计新增 18：复习排程 9 含跨月边界、变体与按键 4、生成题 5）；`verify-lab-contrast` 78 组配色通过；完整 `pnpm run docs:build` 全绿，含 verify-doc-site-fragments（5,976 处引用）、verify-built-study-site、verify-study-publication（108 源 → 108 页 → 13,474 链接）、学习体验契约、首页指标（当时为 249，后续跟进中重新钉住）。

视觉批次之后：对比度门禁复过（78 组）、完整 docs:build 全绿、走查重跑 35/35，前后截图确认首页提示块已读作一族、turn-flow 标题断为两行均衡。原始走查记录（Playwright Chromium 对本地预览构建，同日完成）：35/35 通过——前两轮合计 28 项，本轮新增：播放按钮进入播放态并推进滑块；手动步进会暂停播放（这项检查抓到一个真 bug：暂停条件原来键在 isTrusted 上，而重新派发的事件永不为真；已改为自派发标记）；第 04/05 课自测各渲染 6 题（3 手写 + 3 生成）；tool-visibility 导语术语悬停闪现对应指标卡，移开后清除；桥接页出口状态名悬停高亮流程带文字。读屏的实际播报没有验证——验证到的是 ARIA 接线（`role="status"`、`aria-current`、`aria-label`）。

## Boundaries

真实浏览器走查已做一轮（见 Verification），但那是时点检查，不是自动化回归：读屏实际播报、其余实验页的窄屏、Pages 环境的伺服行为仍未走；第 33 课继续把这类工作列为长期未知。复习间隔是教学常数，不声称来自最优间隔研究的结论。