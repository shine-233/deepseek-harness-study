# Agent Note: 无 provider 的工具可见性 A/B 基准

Status: implemented

[English](2026-08-16-tool-visibility-offline-benchmark.md) | 中文

## Problem

工具可见性学习切片已经有离线快照检查器和 A/B 不变量检查器，但还没有测量快照解析、可见集合差异计算或 visible 列表序列化的本地工作量。无 provider 的实验也必须明确说明：这些测量不能作为模型延迟证据。

## Decision

`study-tools/benchmark-tool-visibility-ab.mjs` 接受两份通过校验的快照 JSON 文本，使用可配置的预热次数和迭代次数运行可重复的本地基准。它分别测量两个快照的 `JSON.parse`、成对 visible 工具名集合差异，以及两个 visible 列表的 `JSON.stringify`。报告同时给出 Node.js/平台上下文、墙上时钟观测、确定性的 UTF-8 字节/数量指标、集合变化，以及 `providerCalls: 0` / `apiKeyRequired: false` 证据。

基准复用现有 A/B 比较规则：fixed 条件或共同可见工具 presentation 不同、共同 schema 不同、或者 visible 集合没有变化时，直接拒绝该对输入。`study-tools/benchmark-tool-visibility-ab.md` 说明命令、字段读法、复跑方法和证据边界。单元测试注入时钟，因此正确性不依赖耗时阈值。

## Alternatives considered

**调用真实 provider 并记录响应延迟。** 这会变成另一种实验，需要凭据、网络和服务端控制，超出本切片的无 provider 范围。以后如果做真实实验，应另行记录 provider token、排队、首 token、总延迟、质量和成本字段。

**只报告 schema 字节数和粗略 token 数。** 这样结果确定性更高，也能作为请求大小代理，但无法观察快照解析、集合比较和序列化成本。因此已实现的基准也测量这三个本地操作。

**在单元测试中加入耗时阈值。** 这会让正确性依赖机器负载、JIT 和垃圾回收。测试只校验报告结构和确定性指标；耗时是报告证据，不是通过/失败门禁。

## Consequences

学习仓库现在有一个不需要 key、离线可运行的性能切片，可以用固定夹具复跑并跨环境比较。相同 JSON 输入的字节和数量指标稳定，但墙上时钟耗时必须作为本机观测解读。该基准不能证明 provider token 数、模型延迟、工具执行时间、任务质量或成本，中文说明已在命令旁明确这些限制。
