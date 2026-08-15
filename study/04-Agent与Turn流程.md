# Agent 与 Turn 流程

这一页只讲一件事：用户发出一句话后，DSH 怎样把它变成模型请求、工具执行和最终结果。官方架构里的 `Turn` 是一轮工作，`Step` 是这一轮中的一次模型请求加上它发出的工具调用。

## 一次最完整的流程

```text
turn/start
  领取下一步输入和一条排队消息
  组装提示词片段和工具 schema
  agent/pre-step
    拒绝 -> 直接关闭 Turn
    接受 -> step/start
  记录进入模型的 user/message
  从 Session 日志推导模型历史
  agent/request
    -> llm/stream
    -> assistant/chunk 许多次
    -> assistant/message
  如果有 tool-call
    -> tool/call
    -> tools/pre-execute
    -> tools/execute
    -> tools/post-execute
    -> tool/result
  step/end
  还有工具结果要处理或有下一步输入 -> 再开一个 Step
  没有欠账 -> agent/turn-stopping
turn/end
```

这张图中只有一部分是直接函数调用。很多箭头是 Cordis 事件，因此插件可以在中间观察、修改、拒绝或提供能力。要判断某件事的先后顺序，应以事件定义和测试为准。

## 为什么要分 Turn 和 Step

一个用户目标可能需要模型先读文件，再调用工具，再根据工具结果继续回答。把每一次模型请求叫 Step，可以明确一次请求的开始和结束；把一整段连续工作叫 Turn，可以知道何时应该把“这次工作”视为结束。

这样拆开还有三个好处：

- Session 可以记录一个 Turn 没有 Step 就被拒绝或取消的情况。
- 工具执行的结果可以让同一个 Turn 进入下一个 Step，而不是伪装成新的用户请求。
- 取消和错误可以分别关闭当前 Step、当前 Turn 或整个 Agent 工厂。

## 输入不是直接塞进 prompt

Agent 有 inbox。直接用户消息、注入的运行时上下文和 goal continuation 都要经过领取和事件记录。`next-turn` 的消息会唤醒下一轮，`next-step` 的消息要等当前工作继续时被领取。队列的修改会进入 `agent/inbox/spliced`，所以恢复和调试时不会只看到一个神秘的内存数组。

## `agent/pre-step` 为什么重要

这是模型真正看到输入之前的最后一个可扩展点。插件可以在这里加入工作区指令、时间、技能或目标上下文，也可以因为权限、状态或策略拒绝本次输入。首次领取被拒绝时，DSH 仍然记录一个没有 Step 的 Turn 结束，这让日志能解释“为什么用户发了话却没有模型请求”。

## 工具调用怎样回来

模型流里出现 tool-call block 时，Agent Loop 不直接执行函数，而是把它交给 Tools 服务。Tools 会重新检查工具是否可见、参数是否是可接受的 JSON、是否需要审批、是否允许并发，然后发布执行和结果事件。结果回到 Session 后，下一次 prompt 由日志推导，而不是由 Agent 私自拼一段隐藏文本。

## 取消和失败

取消有来源：用户、父 agent、hook 或 dispose。工具可能在真正启动前被取消，也可能已经启动后被取消；这两种结果需要区分。LLM 的认证、限流、网络和流截断也会变成结构化 `LlmFailure`，最终由 Turn 记录原因。

## 推荐阅读和验证

先读[核心文件精读](03-核心文件精读.md)里的 `agent-loop/src/agent.ts`、`tool-calls.ts` 和 `runtime-context.ts`，再读官方[架构中的 Turn flow](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md#turn-flow)。测试从这些开始：

- `packages/core/agent-loop/tests/loop.spec.ts`
- `packages/core/agent-loop/tests/tool-order.spec.ts`
- `packages/core/agent-loop/tests/cancel.spec.ts`
- `packages/core/agent-loop/tests/request-reconstruction.spec.ts`
- `packages/core/agent-loop/tests/request-error.spec.ts`
- `packages/core/agent-loop/tests/resume.spec.ts`

## 一个适合初学者的调试问题

当你发现“模型没有按预期继续”时，按这个顺序问：输入是否进入 inbox？是否被 `agent/pre-step` 拒绝？是否写入 `user/message`？LLM 是否产生了 finish？tool-call 是否通过了 Tools 的准备和审批？tool/result 是否写回 Session？下一次请求是否从日志重建？这个顺序比一上来猜某个 UI 组件更容易找到真正的断点。
