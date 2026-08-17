# Agent Note: 脱敏的 ToolRuntime 调试快照

Status: implemented

[English](2026-08-16-tool-runtime-debug-snapshot.md) | 中文

## Problem

宿主需要证据来区分：工具是在某一层注册、在限制前已知、对作用域运行时可解析，还是实际投影给面向模型的宿主。现有公开方法要么返回可执行定义，要么返回完整 schema，因此既不适合作为安全诊断载荷，也不会把限制原因和 schema 字节成本放在同一份结果里。

## Decision

`ToolRuntime.debugSnapshot(scope?)` 返回深度冻结、可 JSON 序列化的快照，只包含精确层的 `registered` 名称、限制前的 `known` 名称、运行时有效的 `visible` 名称、`hiddenByRestriction`、有效呈现方式，以及实际面向模型的 wire projection（线投影）中每个 schema 的紧凑 JSON UTF-8 字节数。快照排除作用域身份、execute／presenter 回调、参数、凭据和用户内容。

快照保持运行时解析和模型呈现的分离。Code Mode 下，`visible` 可以包含 SDK 可到达的工具，而 `visibleSchemas` 只包含直接暴露的 `run_code` schema；`hiddenByRestriction` 只包含被 allow／deny 筛选器移除的继承名称，不包含作用域本地注册。字节数是确定性的序列化大小指标，不是 provider token 数，也不是完整提示词大小。

## Alternatives considered

**直接暴露 `ToolDefinition` 或 `schemas()`。** 这样会让诊断调用方持有可执行回调或完整 schema 内容，也无法区分某个名称是被限制还是仅仅不属于所选呈现方式。快照改为把名称和成本投影到独立的脱敏值中。

**增加新的 system-prompt 或 agent-loop 事件。** 这会把改动扩大为传输或编排契约，而且仍然不会让 registry 事实天然适合任意宿主诊断。该 API 复用现有作用域视图和线投影，不改变两个消费者。

**只返回一个 visible 列表和一个总字节数。** 这样会隐藏 Code Mode 的 SDK 可达工具与直接模型 schema 的区别，也会让作用域本地注册无法与继承名称区分。新增的少量字段保留这些既有语义，同时不返回 schema 正文。

## Consequences

宿主可以记录稳定且受隐私边界约束的作用域筛选与呈现变化解释，并在不导入私有 registry 状态的情况下比较 schema 大小差异。该 API 不能证明 provider token 数、提示词监听器替换结果、OS 权限、执行许可或工具成功；这些仍需单独观测。没有修改生成 catalog、system-prompt 源码或 agent-loop 源码。
