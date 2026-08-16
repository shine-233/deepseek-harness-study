# Session 日志与恢复

可以把 Session 想成一本只追加、不随意擦除的工作日记。它记录的不只是最后答案，还记录用户消息、模型流片段、完整 assistant message、工具调用、工具结果、请求头、todo 和 Turn／Step 边界。

## 为什么不只保存最后一段文本

如果只保存最后文本，下面这些问题都很难回答：模型为什么会看到某段内容？工具调用的原始参数是什么？回答是流式产生到哪一步时崩溃的？会话 fork 从哪一个事件开始？UI 怎样在刷新后还原工具卡片？

追加式事件日志把这些问题变成投影问题：原始事件是事实，模型历史、UI 卡片、transcript、统计和持久化都是从事实推导出的不同视图。

## 重要事件

| 事件 | 作用 |
|---|---|
| `turn/start`、`turn/end` | 标出一轮工作的边界和结束原因 |
| `step/start`、`step/end` | 标出一次模型请求及其工具处理的边界 |
| `user/message` | 记录直接输入或模型可见的注入上下文 |
| `assistant/chunk` | 保留流式输出，便于回放和 UI 保真 |
| `assistant/message` | 保存一个 Step 最终组装出的 assistant 消息 |
| `tool/call` | 保存模型原样产生的工具名、调用 id 和参数字符串 |
| `tool/result` | 保存模型可见结果以及工具私有的展示元数据 |
| `request/header` | 保存本次请求使用的模型配置、系统提示词和工具 schema |
| `request/context` | 保存提供方、模型和上下文容量等路由信息 |

## “模型可见即已记录”

这是 DSH 设计中的关键规则：任何会影响模型请求的内容都必须能从 Session 日志重建。动态运行时上下文因此会生成来源明确的 `user/message`；工具结果不会只停留在内存；请求头会在配置改变时追加新的快照。

它避免了一个很难查的错误：程序重启后模型历史看起来一样，但缺少某个隐式注入，导致模型行为悄悄变化。日志不是为了让文件变大，而是为了让“这次请求为什么这样”可以解释。

## Surface 和历史不是一回事

原始日志可能有很多 assistant chunk，也可能有 compaction replacement。`surface` 是按规则折叠后真正进入模型历史的有序节点；日志仍保留原始事实，surface 只是一个可重算的视图。`sourceEventSeqs` 记录一个节点引用了哪些原始事件，这样替换、回放和调试不会失去来源。

## 恢复、fork 和修复

- **恢复**：持久化层先取回 header 和 event seed，再由 `packages/core/session/src/index.ts` 的恢复入口和 `packages/session/session-persistence/src/preparations.ts` 协调准备；`packages/core/session/src/preparation.ts` 只持有尚未公开的 Session 并负责 provider 资源释放。
- **fork**：子 Session 可以继承父日志的前缀，并记录 parent、seed length 和边界，之后的事件属于子工作。
- **修复**：如果进程在工具或 Turn 中间崩溃，恢复阶段可以根据日志中的未闭合事实补出 interrupted 状态；这不等于假装工具成功。
- **版本**：`SESSION_FORMAT_VERSION` 保护磁盘格式。读取器不能因为“能解析 JSON”就默默忽略会影响重建的字段。

## 相关源码和测试

推荐顺序是 `packages/core/session/src/types.ts`、`packages/core/session/src/index.ts`、`packages/core/session/src/preparation.ts`、`packages/core/session/src/surface.ts`，然后读：

- `packages/core/session/tests/session.spec.ts`
- `packages/core/session/tests/invariant.spec.ts`
- `packages/core/session/tests/fork.spec.ts`
- `packages/core/session/tests/surface.spec.ts`
- `packages/core/session/tests/repair.spec.ts`
- `packages/core/session/tests/request-header.spec.ts`
- `packages/session/session-persistence/tests/` 下的通用 contract、coordinator 和 persistence orchestration 测试
- `packages/session/session-persistence-jsonl/tests/` 下的 JSONL、Windows 和 zstd 测试
- `packages/session/session-persistence-sqlite/tests/` 下的 SQLite 后端测试

注意：索引和这些文档只说明固定提交的结构。是否真的能从某个磁盘文件恢复，还要运行对应 persistence 测试或做实际恢复实验。
