# 源文件索引：packages/sdk

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 21 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/sdk/client/src/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/api.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理浏览器端、API 边界的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/sdk/client/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/client.ts)、[packages/sdk/client/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/types.ts)、[packages/sdk/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/index.ts)
- 对应测试：[packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/sdk/client` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/sdk/client/src/client.ts`、`packages/sdk/client/src/types.ts` 和 `packages/sdk/client/src/index.ts`、`packages/sdk/client/tests/sdk-client.spec.ts` 确认输入输出，最后对照 `packages/sdk/client/tests/sdk-client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 246 行；扫描到的声明包括 `DeepSeekHarness`、`RunOptions`、`HarnessSession`、`normalizeInput`、`finalResponse`、`validatedSessionEvent`、`isInboxReceipt`；源码顶部原注释（英文，仅作回查线索）：High-level run API over HarnessClient: DeepSeekHarness owns one runtime subprocess across many sessions; HarnessSession.run sends a prompt and settles when the whole agent next becomes idle. Mirrors the Python SDK's DeepSeekHarness/Session pair. @module @de...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/client.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/sdk/client/src/dispose.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/dispose.ts)、[packages/sdk/client/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/types.ts)、[packages/sdk/client/src/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/api.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/jsonrpc-agent/tests/sdk.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/tests/sdk.snapshot.ts)、[packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)、[packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/sdk/client` 的 README 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts`、`packages/sdk/client/src/dispose.ts`、`packages/sdk/client/src/types.ts` 和 `packages/sdk/client/src/api.ts`、`packages/sdk/client/src/index.ts` 确认输入输出，最后对照 `examples/jsonrpc-agent/tests/sdk.snapshot.ts`、`packages/sdk/client/tests/sdk-client.spec.ts`、`packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 473 行；扫描到的声明包括 `TransportClosedError`、`RequestTimeoutError`、`SdkProtocolError`、`NotificationSubscription`、`HarnessClient`、`isRecord`、`NotificationSubscriptionImpl`、`errorMessage`；源码顶部原注释（英文，仅作回查线索）：Low-level JSON-RPC client for a DeepSeek Harness SDK runtime subprocess. HarnessClient owns the child process: it spawns the runtime, speaks the @deepseek-ai/dsh-sdk-protocol wire over the child's stdio, fans server notifications out to subscriptions, and t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/src/dispose.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/dispose.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：SDK 生命周期实现
- 这个文件有什么用：这个文件把 SDK 调用、资源释放或运行时连接封装成外部调用者可使用的接口。
- 为什么这样设计：SDK 将外部调用者看到的生命周期封装起来，资源释放和 runtime 连接不泄漏到使用方。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/sdk/client/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/client.ts)、[packages/sdk/client/tests/dispose.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/dispose.spec.ts)
- 对应测试：[packages/sdk/client/tests/dispose.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/dispose.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/sdk/client` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/sdk/client/src/client.ts`、`packages/sdk/client/tests/dispose.spec.ts` 确认输入输出，最后对照 `packages/sdk/client/tests/dispose.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的声明包括 `disposeRuntimeProcess`、`exitsWithin`、`forceTerminateWithin`；源码顶部原注释（英文，仅作回查线索）：Private teardown ladder for the runtime subprocess: stdin EOF (cooperative quiesce), then SIGTERM, then SIGKILL, resolving only after the process has actually exited. The SDK client runs OUTSIDE any harness context, so it cannot ride the dsh-subprocess serv...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/index.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/sdk/client/src/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/api.ts)、[packages/sdk/client/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/client.ts)、[packages/sdk/client/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/types.ts)、[examples/jsonrpc-agent/tests/sdk.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/tests/sdk.snapshot.ts)
- 对应测试：[examples/jsonrpc-agent/tests/sdk.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/tests/sdk.snapshot.ts)、[packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/sdk/client` 的入口和消费者，再读当前契约，沿着 `examples/jsonrpc-agent/tests/sdk.snapshot.ts`、`packages/sdk/client/tests/sdk-client.spec.ts`、`packages/subagent/subagent-dsh-sdk/src/run.ts` 看它怎样约束运行时，最后对照 `examples/jsonrpc-agent/tests/sdk.snapshot.ts`、`packages/sdk/client/tests/sdk-client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行；源码顶部原注释（英文，仅作回查线索）：TypeScript client SDK for the DeepSeek Harness runtime: spawn the dsh-jsonrpc-agent runtime as a subprocess and drive agent turns over stdio JSON-RPC. DeepSeekHarness is the high-level run API; HarnessClient is the lower-level protocol client. A pure librar...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/invariant.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-sdk-client. @module @deepseek-ai/dsh-sdk-client/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/types.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述浏览器端中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/sdk/client/src/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/api.ts)、[packages/sdk/client/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/client.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/jsonrpc-agent/tests/sdk.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/tests/sdk.snapshot.ts)、[packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)、[packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/sdk/client` 的入口和消费者，再读当前契约，沿着 `packages/sdk/client/src/api.ts`、`packages/sdk/client/src/client.ts`、`packages/sdk/client/src/index.ts` 看它怎样约束运行时，最后对照 `examples/jsonrpc-agent/tests/sdk.snapshot.ts`、`packages/sdk/client/tests/sdk-client.spec.ts`、`packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `HarnessNotification`、`NotificationFilter`、`HarnessClientOptions`、`DeepSeekHarnessOptions`、`RunResult`；源码顶部原注释（英文，仅作回查线索）：Types for the TypeScript SDK client: launch options, notification shapes, and owned activity results. @module @deepseek-ai/dsh-sdk-client/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/tests/dispose.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/dispose.spec.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“disposeRuntimeProcess”、“returns immediately for an already-exited child (no EOF, no signals)”、“returns immediately for a child already dead by signal”、“tier 1: a cooperative child quiesces on stdin EOF — no signal is ever sent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“disposeRuntimeProcess”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/sdk/client/src/dispose.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/dispose.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/sdk/client/src/dispose.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 231 行；扫描到的声明包括 `FakeChild`、`asChild`；扫描到的测试主题包括 “disposeRuntimeProcess”、“returns immediately for an already-exited child (no EOF, no signals)”、“returns immediately for a child already dead by signal”、“tier 1: a cooperative child quiesces on stdin EOF — no signal is ever sent”、“recognizes a child that exits synchronously on stdin EOF”、“tier 2: a child that ignores EOF but honors SIGTERM dies on the middle rung”；源码顶部原注释（英文，仅作回查线索）：Deterministic ladder coverage against a scriptable fake child: each escalation tier's timing is driven exactly (the client suite exercises the same ladder against real subprocesses end to end).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/tests/fake-runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/fake-runtime.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“fake-runtime”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 234 行；扫描到的声明包括 `write`、`notify`、`event`、`assistantText`、`runTurn`、`sessionIdOf`；源码顶部原注释（英文，仅作回查线索）：Scripted stand-in for the DeepSeek Harness SDK runtime, driven entirely by env vars — no model, no network, no harness imports. Speaks the runtime's newline-delimited JSON-RPC protocol on stdio: answers initialize, session/prompt (streaming scripted session...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“DeepSeekHarness”、“ignores notifications that precede the submitted message receipt”、“runs a turn end to end and reuses the runtime across sessions”、“keeps events root-scoped while streaming notifications for the session tree”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DeepSeekHarness”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/README.md)、[packages/sdk/client/src/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/api.ts)、[packages/sdk/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/sdk/client/src/api.ts`、`packages/sdk/client/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 527 行；扫描到的声明包括 `fakeLaunch`、`harnessWith`、`tempDir`；扫描到的测试主题包括 “DeepSeekHarness”、“ignores notifications that precede the submitted message receipt”、“runs a turn end to end and reuses the runtime across sessions”、“keeps events root-scoped while streaming notifications for the session tree”、“sends the configured cwd/provider/model/maxTokens in the handshake exactly once”、“resolves a relative launch cwd to an absolute workspace before the handshake”；源码顶部原注释（英文，仅作回查线索）：SDK client against a real scripted runtime subprocess (tests/fake-runtime.ts, protocol-only — the only faked boundary is the model-owning runtime itself). Covers the turn loop, notification routing and session-tree scoping, error surfaces, timeouts, and the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/index.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把协议相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sdk/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/README.md)、[packages/sdk/protocol/src/transport.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/transport.ts)、[packages/sdk/protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/types.ts)、[packages/sdk/client/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/client.ts)、[packages/sdk/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/index.ts)
- 对应测试：[packages/sdk/protocol/tests/transport.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/tests/transport.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/sdk/protocol` 的入口和消费者，再读当前契约，沿着 `packages/sdk/client/src/client.ts`、`packages/sdk/client/src/index.ts`、`packages/sdk/protocol/tests/transport.spec.ts` 看它怎样约束运行时，最后对照 `packages/sdk/protocol/tests/transport.spec.ts`、`packages/sdk/server/tests/server.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；源码顶部原注释（英文，仅作回查线索）：Shared wire protocol for the DeepSeek Harness SDK runtime: the newline-delimited JSON-RPC stdio transport plus the named request, result, and notification types both wire ends speak. The runtime server plugin (@deepseek-ai/dsh-sdk-jsonrpc-server) serves thi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/protocol/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/invariant.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查协议必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sdk/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-sdk-protocol. @module @deepseek-ai/dsh-sdk-protocol/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/protocol/src/transport.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/transport.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成协议能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/sdk/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/README.md)、[packages/sdk/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/jsonrpc-agent/tests/sdk.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/tests/sdk.snapshot.ts)、[packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)、[packages/sdk/protocol/tests/transport.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/tests/transport.spec.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-apply.spec.ts)、[packages/sdk/server/tests/plugin-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-shape.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/sdk/protocol` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/sdk/protocol/src/index.ts` 确认输入输出，最后对照 `examples/jsonrpc-agent/tests/sdk.snapshot.ts`、`packages/sdk/client/tests/sdk-client.spec.ts`、`packages/sdk/protocol/tests/transport.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 279 行；扫描到的声明包括 `JsonRpcResponseError`、`JsonRpcTransportPeer`、`JsonRpcLineTransport`、`objectParams`、`abortError`；源码顶部原注释（英文，仅作回查线索）：Newline-delimited JSON-RPC 2.0 over byte streams. Frames with id and method are requests, id alone is a response, and method alone is a notification. Malformed lines are ignored; handler failures become error frames. @module @deepseek-ai/dsh-sdk-protocol/tr...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/types.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述协议中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/sdk/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/sdk/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/jsonrpc-agent/tests/sdk.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/tests/sdk.snapshot.ts)、[packages/sdk/client/tests/sdk-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/tests/sdk-client.spec.ts)、[packages/sdk/protocol/tests/transport.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/tests/transport.spec.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-apply.spec.ts)、[packages/sdk/server/tests/plugin-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-shape.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/sdk/protocol` 的入口和消费者，再读当前契约，沿着 `packages/sdk/protocol/src/index.ts` 看它怎样约束运行时，最后对照 `examples/jsonrpc-agent/tests/sdk.snapshot.ts`、`packages/sdk/client/tests/sdk-client.spec.ts`、`packages/sdk/protocol/tests/transport.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `InitializeParams`、`InitializeResult`、`SessionPromptParams`、`SessionPromptResult`、`SdkRunStatus`、`SessionEventNotification`、`SessionStatusNotification`、`SubagentStartedNotification`；源码顶部原注释（英文，仅作回查线索）：Named wire types for the DeepSeek Harness SDK runtime protocol: the three request/result pairs and the four server-to-client notification payloads exchanged over the newline-delimited JSON-RPC stdio transport. The server plugin (@deepseek-ai/dsh-sdk-jsonrpc...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/protocol/tests/transport.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/tests/transport.spec.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查协议的具体场景，包括“JsonRpcLineTransport”、“supports bidirectional requests and notifications over newline-delimited JSON-RPC”、“reports JSON-RPC request errors from the remote peer with their wire code”、“rejects immediately on a pre-aborted signal without registering pending state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“JsonRpcLineTransport”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/README.md)、[packages/sdk/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/sdk/protocol/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `transportPair`；扫描到的测试主题包括 “JsonRpcLineTransport”、“supports bidirectional requests and notifications over newline-delimited JSON-RPC”、“reports JSON-RPC request errors from the remote peer with their wire code”、“rejects immediately on a pre-aborted signal without registering pending state”、“abandons a pending request on abort, stringifying a non-Error reason”、“preserves structured error data from an error response frame”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/index.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/sdk/server` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)、[packages/sdk/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/index.ts)、[packages/sdk/server/src/server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/server.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-apply.spec.ts)
- 对应测试：[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-apply.spec.ts)、[packages/sdk/server/tests/plugin-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-shape.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/sdk/server` 的入口和消费者，再读当前契约，沿着 `packages/sdk/server/tests/plugin-apply.spec.ts`、`packages/sdk/server/tests/plugin-shape.spec.ts`、`packages/sdk/server/tests/server.spec.ts` 看它怎样约束运行时，最后对照 `packages/sdk/server/tests/plugin-apply.spec.ts`、`packages/sdk/server/tests/plugin-shape.spec.ts`、`packages/sdk/server/tests/server.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `name`、`inject`、`JsonRpcConfig`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：SDK-facing JSON-RPC plugin over stdio. An external cordis.yml decides whether to load it; see the single-executable Agent Note and package README. Stdout is reserved for protocol frames, so the tree must not load a stdout logger. This plugin answers shutdow...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/invariant.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/sdk/server` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-sdk-jsonrpc-server. @module @deepseek-ai/dsh-sdk-jsonrpc-server/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/src/server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/server.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：网络或路由层
- 这个文件有什么用：它把外部请求接到 `packages/sdk/server` 包里的 `src/server.ts` 的内部服务，并处理协议边界；这样 Web、命令行和业务逻辑不会混在同一个函数里。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“JSON-RPC methods and notifications for out-of-process harness SDKs. The surrounding context owns plugins, persistence, and configured adapters. @module @deepseek-ai/dsh-sdk-jsonrpc-server/server”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/sdk/server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-apply.spec.ts)、[packages/sdk/server/tests/plugin-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-shape.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/sdk/server` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts` 和 `packages/sdk/server/src/index.ts` 确认输入输出，最后对照 `packages/sdk/server/tests/plugin-apply.spec.ts`、`packages/sdk/server/tests/plugin-shape.spec.ts`、`packages/sdk/server/tests/server.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 240 行；扫描到的声明包括 `HarnessSdkJsonRpcServerOptions`、`HarnessSdkJsonRpcServer`、`subagentParentOf`、`successStatus`；源码顶部原注释（英文，仅作回查线索）：JSON-RPC methods and notifications for out-of-process harness SDKs. The surrounding context owns plugins, persistence, and configured adapters. @module @deepseek-ai/dsh-sdk-jsonrpc-server/server。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/tests/built-scope-carrier.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/built-scope-carrier.e2e.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/sdk/server` 包里的 `tests/built-scope-carrier.e2e.ts` 的具体场景，包括“preserves parent-scoped completion after child disposal”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“preserves parent-scoped completion after child disposal”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的测试主题包括 “preserves parent-scoped completion after child disposal”；源码顶部原注释（英文，仅作回查线索）：Built-artifact guard for the scope carrier shared by dsh-subagent and dsh-sdk-jsonrpc-server. The carrier registry is module-local, so both bundles must externalize dsh-scope; source-mode tests cannot expose an accidentally inlined second registry. This tes...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-apply.spec.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/sdk/server` 包里的 `tests/plugin-apply.spec.ts` 的具体场景，包括“dsh-sdk-jsonrpc-server plugin apply”、“serves initialize over the injected stdio pair”、“drives a session/prompt turn end-to-end and forwards session notifications as output fr...”、“answers shutdown before exiting 0 exactly once, even against a racing second shutdown”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-sdk-jsonrpc-server plugin apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)、[packages/examples/agent-spine-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/src/index.ts)、[packages/sdk/server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/index.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence-jsonl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/examples/agent-spine-demo/src/index.ts`、`packages/sdk/server/src/index.ts`、`packages/session/session-persistence-jsonl/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 305 行；扫描到的声明包括 `waitFor`、`settle`、`mountPlugin`、`mockCompletionServer`；扫描到的测试主题包括 “dsh-sdk-jsonrpc-server plugin apply”、“serves initialize over the injected stdio pair”、“drives a session/prompt turn end-to-end and forwards session notifications as output frames”、“answers shutdown before exiting 0 exactly once, even against a racing second shutdown”、“still disposes and exits once when the flush callback fails”、“stops serving on a bare fiber dispose (HMR-style unload) without calling exit”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/tests/plugin-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/plugin-shape.spec.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/sdk/server` 包里的 `tests/plugin-shape.spec.ts` 的具体场景，包括“dsh-sdk-jsonrpc-server plugin export shape”、“has the namespace-plugin export shape (no stray default) so the Loader keeps name/injec...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-sdk-jsonrpc-server plugin export shape”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)、[packages/sdk/server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/sdk/server/src/index.ts`、`vendor/loader/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的测试主题包括 “dsh-sdk-jsonrpc-server plugin export shape”、“has the namespace-plugin export shape (no stray default) so the Loader keeps name/inject/Config/apply”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/tests/server.spec.ts)

- 所属层：packages/sdk：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/sdk/server` 包里的 `tests/server.spec.ts` 的具体场景，包括“HarnessSdkJsonRpcServer”、“creates a harness agent and calls the configured OpenAI-compatible endpoint”、“queues overlapping prompts for one session without blocking other sessions”、“rejects a prompt for a session whose agent was disposed outside the server”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“HarnessSdkJsonRpcServer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sdk/server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/server/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/examples/agent-spine-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/examples/agent-spine-demo/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 968 行；扫描到的声明包括 `FakeTransport`、`mockCompletionServer`、`makeHarness`、`settleSubagent`；扫描到的测试主题包括 “HarnessSdkJsonRpcServer”、“creates a harness agent and calls the configured OpenAI-compatible endpoint”、“queues overlapping prompts for one session without blocking other sessions”、“rejects a prompt for a session whose agent was disposed outside the server”、“forwards whole-agent status without attributing a turn outcome”、“notifies the host when a child session is created with parent lineage”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
