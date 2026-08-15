# LLM 与工具执行

模型在 DSH 里不是一个被核心代码写死的 HTTP 客户端。它通过统一的 LLM 服务产生流，再由 Agent Loop 和 Tools 把流中的工具请求变成可控执行。

## LLM 的三层

1. `packages/llm/llm/src/index.ts` 定义统一的消息、错误、调用配置、模型注册和 `LlmAdapter`。
2. `packages/llm/llm/src/assembler.ts` 把增量 `StreamChunk` 组装成完整内容块和 assistant message。
3. `packages/llm/llm-deepseek/src/adapter.ts` 与 `sse.ts` 负责 DeepSeek 的 HTTP 和 SSE 细节。

这样分层后，Agent Loop 不需要知道 HTTP 状态码，DeepSeek 适配器也不需要知道 Session 如何保存事件。测试可以用 mock adapter 代替真实网络。

## 一次流式请求

```text
Agent 准备完整请求
  -> ctx.llm 的 llm/stream waterfall
  -> 已注册的 LlmAdapter
  -> HTTP response body
  -> SSE framing
  -> JSON payload 翻译成 StreamChunk
  -> BlockAssembler
  -> assistant/chunk + assistant/message
```

SSE 的 `[DONE]` 不是普通文本，它告诉适配器流正常结束。EOF 前没有 `[DONE]` 是截断，应该变成错误；否则程序可能把半个工具调用当成完整调用。

## 工具 schema 为什么单独存在

模型只有看到工具名称、参数和说明，才知道可以调用什么。`tools/src/schema.ts` 把作者友好的 schema DSL 编译成 JSON Schema，并在执行前再次验证。提示词里展示的 schema 和运行时实际接受的参数来自同一份定义，避免“模型以为可以传 A，执行却只接受 B”。

## 工具执行的阶段

```text
找到可见工具
  -> 准备参数和取消信号
  -> tools/pre-execute
  -> 审批或拒绝
  -> tools/execute
  -> tools/post-execute
  -> 规范化成功或失败结果
  -> tools/result
```

执行前后分阶段，是因为权限、重复调用提醒、超时和 presentation 需要不同的插入位置。工具函数本身只负责自己的能力，Registry 负责统一的保护措施。

## 给模型看和给人看

工具结果有两个面：模型需要能继续推理的内容，用户界面需要能快速理解的卡片。`presentation.ts` 定义终端、diff、搜索、读取文件等中立视图，Web 和 CLI 可以各自渲染。一个工具不需要导入 React 才能告诉 UI“这是一个文件 diff”。

## 失败不能只写一行字符串

认证失败、限流、超时、被拒绝、参数错误、工具不存在和进程退出是不同问题。DSH 用结构化错误和 Session 事件保留区别，用户界面可以显示合适信息，重试策略也不会把“参数错”当成“网络抖了一下”。

## 相关源码和测试

- 核心：`packages/core/tools/src/index.ts`、`schema.ts`、`presentation.ts`。
- LLM：`packages/llm/llm/src/index.ts`、`assembler.ts`。
- DeepSeek：`packages/llm/llm-deepseek/src/adapter.ts`、`sse.ts`。
- 工具测试：`tools.spec.ts`、`schema.spec.ts`、`execution-mode.spec.ts`、`invariant.spec.ts`。
- LLM 测试：`assembler.spec.ts`、`service.spec.ts`、`adapter-failure.spec.ts`、`retry-policy.spec.ts`。
- DeepSeek 测试：`adapter.spec.ts`、`sse.spec.ts`、`translate.spec.ts`、`adapter.e2e.ts`。

没有 API key 时可以先读 mock server 和单元测试；这能验证协议转换和失败分支，但不能证明真实网络、真实模型质量或生产限流行为。
