# Agent Note：ACP 桥实验室——自动化线协议的三线时序模拟器

Status: implemented

[English](2026-08-26-acp-bridge-lab.md) | 中文

## 问题

对照固定上游提交的覆盖审计显示：`packages/acp` 包组一直没有自己的专属实验室，尽管它拥有全套 harness 里最反直觉的线协议契约——prompt 级 stopReason 词表比 Turn 级更窄（`max-tokens` 和被 hook 中止的 `aborted` 都报告 `end_turn`；`cancelled` 保留给显式 `session/cancel` 与连接处置）、取消有三个可观察结果各不相同的时机窗口、且只有提交后的助手文本会到达客户端。

## 决策

按仓库既有契约新建独立的模型/视图/页面三件套，逐行钉在上游 `packages/acp/acp/src/index.ts` 与 `codec.ts`（`aa6c361a`）上：

- **纯模型**（`acp-lab-model.js`，无 DOM）：为一次 prompt 构建跨三条生命线（自动化客户端 / ACP 桥 / DSH Agent）的逐帧序列。输入：内容块数（夹到 1–8）、取消时机（`off`/`admission`/`queued`/`claimed`）、Turn 结局（`completed`/`max-tokens`/`aborted`/`interrupted`/`error`）。每帧携带方向、标签和点名源码规则的说明句。
- **真机制而非剧本**：准入中止意味着消息永不入队、零通知；已入队后取消转交 `agent.cancel({kind:'user'})` 但结算时仍是 `cancelRequested` 优先；流式中断表面是 `turn/end interrupted`、线上仍结算 `cancelled`。error 结局拒绝整个 prompt 而不是给出 stopReason。
- **独立校验**从帧直接重算四条规则（通知只上行、准入期取消零痕迹、映射表一致、单 prompt 槽），不读任何视图状态。
- **视图**渲染 SVG 时序图：当前帧箭头带虚线流动动画；步进滑杆由共享的 `bindAutoAdvance` 引擎驱动（含速度档）；消息日志行带 `data-index` 委托点击跳帧；图上可拖拽定位；状态写 URL hash；stopReason 速查表与模型共用同一份规则数组渲染。
- **预测门**：「token 上限收尾，session/prompt 回应什么？」两个错误选项恰好是两种最常见的误读（Turn 级词表直通；没跑完一律算取消）。

注册：`LAB_PAGE_IDS` 增加 `'acp'`（进度记录），`STEPPER_LABS` 增加 `['acp','acp']`（播放接线门禁），07 课在 ACP 示例旁挂出链接。

## 考虑过的替代方案

搭车并行的零跳步阶梯原语（`study-lab-ladder.js`）——暂缓：那是另一 session 的未提交模块，耦合移动中的 API 两边都可能碎。等它落地后再评估。
把 `requestPermission` 授权往返也建进来——归审批流实验的范围；本页保持单概念（一次 prompt 的生命周期）。

## 后果

首页指标对账的实验数来到 56。新增 `acp-lab.test.mjs` 钉住七条模型契约（全组合校验通过、准入期取消零痕迹、cancelRequested 优先、逐结局映射一致、错误拒绝、块数夹取）。全套：847 条 study-tools 测试通过；发布门禁报告 120 构建页、16,406 条链接解析；新页面的中文标签、A11y、预测门、播放接线四道契约全绿。
