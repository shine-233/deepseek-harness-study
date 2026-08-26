# Agent Note：tokenmeter 升级——结构化计价与流式时间线

Status: implemented

[English](2026-08-26-tokenmeter-streaming.md) | 中文

## 问题

全套实验室审计把 tokenmeter 判为最弱一档：带壳计算器。它的估算器只有平面 `⌈字符/4⌉`，既低估了它声称在教的上游启发式（`packages/llm/token-meter/src/estimate.ts` 按块定价、含结构开销、工具调用名与参数分开、工具结果递归、header 加角色框架），也没有时间维度——页面没有任何东西会动，连播放都无从谈起。

## 决策

保留全部既有契约（模型 API、校验检查、预测门、页面 id），然后补上缺失的两个维度：

- **结构化计价，移植而非发明。** `estimateBlocks` 逐条对照上游 `estimate.ts`：文本 `⌈字符/4⌉ + 块开销(4)`；工具调用名与参数分开计价再加开销；工具结果递归进入子内容；系统 header 经 `estimateSystemTokens` 加角色开销(4)。常量导出（`METER_ESTIMATE_CONSTANTS`）并由测试钉住。新增可选输入 `withToolPair`，向新表面加入一对 read_file 调用与结果，让账本同时展示三种块类型。
- **块级账本上页**：每个内容块一行，含公式与读数；行加总加 header 恰等于总读数（测试钉住）。
- **流式时间线**（`buildStreamFrames`）：chunk 逐拍到达（拍数由 newChars 推导，1–12），每一帧都用真模型函数重放读数，最后一拍是判定时刻——usage 落地完成归属切换，或整段留在估算。总读数单调不减；末帧总数与静态模型一致。
- **视图**：压力条宽度改为 rAF 缓动（reduced-motion 直落终点）；步进行（`bindAutoAdvance`，0.5–4× 速度）驱动时间线，日志行点击跳拍；填充条走 CSS 过渡。

开发过程中新的「行加总等于总数」测试抓到一个真实账目 bug：我的第一版把表面增量写成 `全部 − 基线`，导致实测路径的总数丢了 header。修正为显式归属形式：实测基线 = header + 已有表面、增量 = 仅新表面；估算基线 = header、增量 = 全部表面。两条路径都落在 header + 全部表面上，页面教的「双口径总数恒等」保持成立。

注册：`STEPPER_LABS` 增加 `['tokenmeter','tmk']`。课程正文未动——06 课对这只计量器的描述本来就对，这次变强的是它的证明。

## 考虑过的替代方案

浏览器里塞真 tokenizer 词表——否决：DeepSeek 分词数据不在固定树里，用 OpenAI 词表伪造 provider 数字会违反本页自己写的 cannotProve 清单。诚实的升级是把结构做忠实、让时间可见。重写页面外壳——否决：hero/门控/证据布局通过了全部标签与 A11y 门禁，本次只增节。

## 后果

study-tools 套件 847 → 854 条全绿；发布门禁报告 120 构建页 / 16,406 链接 / 首页指标对账 57 个实验室。按审计的分类学，这个实验室从 STATE-DISPLAY 向 SIMULATION 移动了一格：参数现在产生随时间演化的帧序列，而不是一次性的重算。
