# LLM 与工具执行

模型调用通过统一的 LLM 服务产生流，再由 Agent Loop 和 Tools 把流中的工具请求变成可控执行。

## LLM 的三层

<LessonWidget
  id="llm-stream-lab"
  url="/llm-stream-lab.html"
  title="流式装配实验室"
  :height="1000"
  fallback-href="#llm-的三层"
>

不打开组件也能得到核心结论：chunk 按到达顺序进入装配器，某个 block 被 `block-end` 关闭之后再到的同序号增量会被直接忽略——同一段话不会在消息里出现两遍；而 `finish` 之后再出现的任何 chunk 属于流违规，校验层会报错而不是静默丢弃。逐步推进到达序列，可以看到正文逐块拼出、工具调用单独计数，而所有这些都与 provider 的网络行为无关。

</LessonWidget>

组件里的 chunk 文本是固定教学数据；它不能证明真实 provider 的乱序传输、token 计数或 DeepSeek 适配器的处理结果。

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

动态适配器还有一个准备阶段：`prepareCall` 把解析出的模型元数据和后续的流式入口绑定到同一个适配器代际，避免“准备时读到的能力”和“真正发起请求时的端点”来自两次可能不一致的读取。Agent Loop 拿到的是绑好的一对，不需要自己重查。
<LessonWidget
  id="prompt-assembly-lab"
  url="/prompt-assembly-lab.html"
  title="提示组装与缓存前缀经济学实验"
  :height="760"
  fallback-href="#一次流式请求"
>

不打开组件也能知道结论：system prompt 由前导、persona、策略上下文、工具表四类段按 order 排序拼成，空段直接丢弃，未列出工具只出现一次汇总标记。缓存前缀经济学只有一条规则——第一个发生变化段之前的字节照旧命中，其后全部重新计费，所以变化点越靠后浪费越少。组件里的段数、字节数和命中比例都是这组规则的确定性读数。

</LessonWidget>

## 工具 schema 为什么单独存在

模型只有看到工具名称、参数和说明，才知道可以调用什么。`packages/core/tools/src/schema.ts` 把作者友好的 schema DSL 编译成 JSON Schema，并在执行前再次验证。提示词里展示的 schema 和运行时实际接受的参数来自同一份定义，避免“模型以为可以传 A，执行却只接受 B”。

工具注册表里的全集，不等于当前 agent 发给模型的集合。官方系统提示词组装会收集每个 agent 可见的 schema；限制工具会移除该 agent 的整段 schema 成本，但不等于操作系统权限被隔离。工具数量、description、参数和枚举可能增加输入成本，真实延迟仍需按模型和 provider 实测。

如果你的问题是“普通模式是不是不该默认暴露所有工具”，先读[工具可见性与非侵入扩展](22-工具可见性与非侵入扩展.md)，再回来看下面的执行阶段。它会把“模型能提出什么”和“宿主允许什么”分开。

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

执行前后分阶段，是因为权限、重复调用提醒、超时和 presentation 需要不同的插入位置。工具函数本身只负责自己的能力，Registry 负责统一的保护措施。「审批或拒绝」一步的完整生命周期（没有应答者时怎样退化为拒绝）在[审批流实验](/approval-flow-lab.html)里可以逐步推；「重复调用提醒」的阈值拦截和执行账目在[循环卫生实验](/guard-loop-lab.html)里有可动手的时间线。

## 给模型看和给人看

工具结果有两个面：模型需要能继续推理的内容，用户界面需要能快速理解的卡片。`packages/core/tools/src/presentation.ts` 定义终端、diff、搜索、读取文件等中立视图，Web 和 CLI 可以各自渲染。一个工具不需要导入 React 才能告诉 UI“这是一个文件 diff”。

## 失败不能只写一行字符串

认证失败、限流、超时、被拒绝、参数错误、工具不存在和进程退出是不同问题。DSH 用结构化错误和 Session 事件保留区别，用户界面可以显示合适信息，重试策略也不会把“参数错”当成“网络抖了一下”。

## 相关源码和测试

- 核心：`packages/core/tools/src/index.ts`、`packages/core/tools/src/schema.ts`、`packages/core/tools/src/presentation.ts`。
- LLM：`packages/llm/llm/src/index.ts`、`assembler.ts`。
- DeepSeek：`packages/llm/llm-deepseek/src/adapter.ts`、`sse.ts`。
- 工具测试：`packages/core/tools/tests/tools.spec.ts`、`packages/core/tools/tests/schema.spec.ts`、`packages/core/tools/tests/execution-mode.spec.ts`、`packages/core/tools/tests/invariant.spec.ts`。
- LLM 测试：`packages/llm/llm/tests/assembler.spec.ts`、`packages/llm/llm/tests/service.spec.ts`、`packages/llm/llm/tests/adapter-failure.spec.ts`、`packages/llm/llm/tests/retry-policy.spec.ts`。
- DeepSeek 测试：`packages/llm/llm-deepseek/tests/adapter.spec.ts`、`packages/llm/llm-deepseek/tests/sse.spec.ts`、`packages/llm/llm-deepseek/tests/translate.spec.ts`、`packages/llm/llm-deepseek/tests/adapter.e2e.ts`。

没有 API key 时可以先读 mock server 和单元测试；这能验证协议转换和失败分支，但不能证明真实网络、真实模型质量或生产限流行为。
