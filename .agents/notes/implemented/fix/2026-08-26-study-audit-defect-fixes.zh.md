# Agent Note: 全站审计发现的缺陷与修复

Status: implemented

[English](2026-08-26-study-audit-defect-fixes.md) | 中文

## Problem

一次全仓库审计（38 页课程正文、56 个实验室、共享引擎、对照 `aa6c361a`
上游抽查）证实了四个缺陷：

1. `study/22` 存在被物理截断的句子：沙箱实验室导流被插进"证"和"据"之间。
2. `README.md` 第 89 行链接文本写 `[29/34]`，实际只链到 34 课；29 是质量
   检查课而非 Debug 协作（36 课）。`README.zh.md` 则完全丢了 36 的链接。
3. `createTraceLadderSim` 在加载 900 毫秒后自动重放并调用 `opts.onReplayed`，
   而所有 `replayRungs` 消费方都把它接到 `api.engage()`。外壳写明的契约——
   "读者完成一次真实交互之前下一级保持折叠"——因此对所有接入实验室失效。
4. 上下文实验让读者预测同目录去重行为，但教学文件系统里不存在重复候选对，
   场景永远无法发生；`observations.deduplicated` 是常量 `0`，而 `canProve`
   却声称这条规则。

## Decision

- 修复 22 课句子，导流独立成段。
- 两份 README 把 Debug 协作（36）与作者判断（34）分别链接。
- `study-lab-trace-ladder.js` 只统计读者亲手触发的重放；加载预览与
  reduced-motion 首渲染照常有动画，但不再回调 `onReplayed`，阶梯只能通过
  真实交互解锁。
- `context-model.js` 新增 `sameDirDuplicate` 输入，把一对字节相同的
  `AGENTS.md`/`CLAUDE.md` 叠加到 `packages/app`；发现函数改返回
  `{ chain, duplicatesSkipped }`，观测值统计真实丢弃数，oracle 新增
  `DEDUP_APPLIED`——隐藏已生效去重的投影会被判失败。实验页用复选框开启
  场景，并在反馈里报告丢弃数。

## Alternatives considered

- 彻底移除自动重放：门禁同样诚实，但牺牲所有静态首屏的动感；只拦回调以
  更小代价满足契约。
- 把重复对硬编码进基础文件系统：改变全部既有场景的发现链，破坏全局优先
  叙事；按输入叠加的 overlay 不动默认行为。

## Consequences

- 阶梯推进现在真正需要交互：只滚动不操作的读者停在第一级，直到按下重放或
  切换轨迹（或使用显式的「展开全部」逃逸门）。
- `discoverInstructionChain` 返回结构变更；唯一调用方在 `context-model.js`
  内部，`study-tools/context.test.mjs` 覆盖已生效、尚未到达与被篡改三种情形。
