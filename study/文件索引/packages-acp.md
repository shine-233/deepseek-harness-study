# 源文件索引：packages/acp

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 13 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/acp/acp/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/codec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：格式编解码
- 这个文件有什么用：它把 Harness 的 turn 结束原因、prompt 内容和不支持的 ACP prompt block 转成 automation-only ACP wire 能接受的值；它是生命周期到协议的纯翻译层，不负责 Session 磁盘恢复。
- 为什么这样设计：ACP 对外只接受自己的 stop reason 和 prompt 内容 vocabulary；把 Harness lifecycle 到 ACP wire 的转换集中在纯函数中，宿主可以替换协议适配而不污染 Session 和 Agent 领域逻辑。
- 文件级设计证据：源码顶部注释把它定位为“Pure translation between the harness lifecycle and the automation-only ACP wire. @module @deepseek-ai/dsh-acp/codec”；固定提交中扫描到的声明包括 `turnEndToStopReason`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/acp/acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/index.ts)、[packages/acp/acp/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/codec.spec.ts)
- 对应测试：[packages/acp/acp/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/codec.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/acp/acp/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts` 和 `packages/acp/acp/src/index.ts`、`packages/acp/acp/tests/codec.spec.ts` 确认输入输出，最后对照 `packages/acp/acp/tests/codec.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `turnEndToStopReason`；源码顶部原注释（英文，仅作回查线索）：Pure translation between the harness lifecycle and the automation-only ACP wire. @module @deepseek-ai/dsh-acp/codec。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/src/content.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/content.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：消息模型
- 这个文件有什么用：它定义内容的消息或内容块结构，使模型、日志、工具和界面使用同一份消息语义。
- 为什么这样设计：消息是模型、日志、工具和 UI 的共同语言，集中定义可以避免每一层都做一套不兼容的内容判断。
- 文件级设计证据：源码顶部注释把它定位为“ACP wire-content admission and projection owned by the ACP adapter. @module”；固定提交中扫描到的声明包括 `AcpContentFailureKind`、`AcpContentError`、`supportsAcpImagePrompts`、`admitAcpPrompt`、`assistantBlockToAcp`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/acp/acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/index.ts)
- 对应测试：[packages/acp/acp/tests/content.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/content.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/acp/acp/README.md`、入口和消费者，再读当前契约，沿着 `packages/acp/acp/src/index.ts`、`packages/acp/acp/tests/content.spec.ts` 看它怎样约束运行时，最后对照 `packages/acp/acp/tests/content.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 238 行；扫描到的声明包括 `AcpContentFailureKind`、`AcpContentError`、`supportsAcpImagePrompts`、`admitAcpPrompt`、`assistantBlockToAcp`、`imageMediaType`、`decodeImage`、`assertImageRoute`；源码顶部原注释（英文，仅作回查线索）：ACP wire-content admission and projection owned by the ACP adapter. @module。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/index.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/acp/acp` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Automation-only Agent Client Protocol server over JSON-RPC stdio. The bridge exposes fresh harness sessions to trusted programmatic clients. It carries prompt text/images, committed assistant text/images, cancellation, and one-shot permission decisions; pre...”；固定提交中扫描到的声明包括 `name`、`inject`、`AcpConfig`、`Config`、`apply`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/codec.ts)、[packages/acp/acp/src/content.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/content.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/acp/acp/tests/approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/approval.spec.ts)、[packages/acp/acp/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/bridge.spec.ts)、[packages/acp/acp/tests/dispose.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/dispose.spec.ts)、[packages/acp/acp/tests/edges.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/edges.spec.ts)、[packages/acp/acp/tests/multi-session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/multi-session.spec.ts)、[packages/acp/acp/tests/turns.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/turns.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/acp/acp/README.md`、入口和消费者，再读当前契约，沿着 `packages/acp/acp/tests/harness.ts`、`packages/examples/acp-demo/src/index.ts` 看它怎样约束运行时，最后对照 `packages/acp/acp/tests/approval.spec.ts`、`packages/acp/acp/tests/bridge.spec.ts`、`packages/acp/acp/tests/dispose.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 545 行；扫描到的声明包括 `name`、`inject`、`AcpConfig`、`Config`、`apply`、`invalidParams`、`internalError`、`agentOptions`；源码顶部原注释（英文，仅作回查线索）：Automation-only Agent Client Protocol server over JSON-RPC stdio. The bridge exposes fresh harness sessions to trusted programmatic clients. It carries prompt text/images, committed assistant text/images, cancellation, and one-shot permission decisions; pre...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/invariant.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/acp/acp` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-acp. @module @deepseek-ai/dsh-acp/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-acp. @module @deepseek-ai/dsh-acp/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/approval.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“approval”写出可重复运行的断言，覆盖的场景包括“ACP machine permission policy”、“maps the two advertised one-shot choices”、“maps cancellation and unknown choices without granting access”、“fails closed when the client errors the permission request”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP machine permission policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ownedRequest`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/interaction/user-approval/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 78 行；扫描到的声明包括 `ownedRequest`；扫描到的测试主题包括 “ACP machine permission policy”、“maps the two advertised one-shot choices”、“maps cancellation and unknown choices without granting access”、“fails closed when the client errors the permission request”、“delegates a same-id foreign agent”、“delegates requests that have no protocol tool-call identity”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/bridge.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“bridge”写出可重复运行的断言，覆盖的场景包括“automation-only ACP bridge”、“advertises only fresh text sessions”、“advertises image prompts only with an exact capable route and attachment store”、“negotiates an unsupported version and accepts the required no-op authentication call”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“automation-only ACP bridge”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 227 行；扫描到的测试主题包括 “automation-only ACP bridge”、“advertises only fresh text sessions”、“advertises image prompts only with an exact capable route and attachment store”、“negotiates an unsupported version and accepts the required no-op authentication call”、“creates a session, emits one committed answer, and settles the prompt”、“leaves absent agent targets for request listeners to supply”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/codec.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查编解码的具体场景，包括“ACP codec”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP codec”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/codec.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/acp/acp/src/codec.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 16 行；扫描到的测试主题包括 “ACP codec”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/content.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/content.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查内容的具体场景，包括“ACP rich content codec”、“advertises image input only when every deployment prerequisite is explicit”、“validates every rich wire block before any image write”、“requires the advertised capability, store, and exact image-capable route”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP rich content codec”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `admissionFixture`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/src/content.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/content.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/acp/acp/src/content.ts`、`packages/attachment/attachment/src/index.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 236 行；扫描到的声明包括 `admissionFixture`；扫描到的测试主题包括 “ACP rich content codec”、“advertises image input only when every deployment prerequisite is explicit”、“validates every rich wire block before any image write”、“requires the advertised capability, store, and exact image-capable route”、“classifies image-policy failures separately from durable write failures”、“honors cancellation on both sides of the durable image write”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/dispose.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/dispose.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“dispose”写出可重复运行的断言，覆盖的场景包括“ACP connection ownership”、“disposal cancels a running prompt and awaits agent teardown”、“disposal drains asynchronous assistant image delivery before releasing sessions”、“drains continuable subagents before disposing its own sessions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP connection ownership”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 249 行；扫描到的测试主题包括 “ACP connection ownership”、“disposal cancels a running prompt and awaits agent teardown”、“disposal drains asynchronous assistant image delivery before releasing sessions”、“drains continuable subagents before disposing its own sessions”、“cancels its own prompt before awaiting the descendant drain”、“reports a failed continuable drain and still disposes its sessions”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/edges.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/edges.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“edges”写出可重复运行的断言，覆盖的场景包括“ACP automation output boundary”、“does not emit tool, terminal, plan, title, or reasoning presentation updates”、“ignores events from agents the bridge does not own”、“delivers output from a bridge-owned session driven by another in-process producer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP automation output boundary”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `toolCallResponse`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 114 行；扫描到的声明包括 `toolCallResponse`；扫描到的测试主题包括 “ACP automation output boundary”、“does not emit tool, terminal, plan, title, or reasoning presentation updates”、“ignores events from agents the bridge does not own”、“delivers output from a bridge-owned session driven by another in-process producer”、“contains output conversion failure outside an ACP prompt”、“settles the prompt normally when the client rejects update notifications”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“harness”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“In-memory ACP transport fixture over the real agent factory and loop.”；固定提交中扫描到的声明包括 `textResponse`、`maxTokensResponse`、`errorResponse`、`CapturedUpdate`、`BridgeHarness`；本地静态 import 图显示它直接依赖 6 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/acp/acp/tests/approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/approval.spec.ts)
- 对应测试：[packages/acp/acp/tests/approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/approval.spec.ts)、[packages/acp/acp/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/bridge.spec.ts)、[packages/acp/acp/tests/dispose.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/dispose.spec.ts)、[packages/acp/acp/tests/edges.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/edges.spec.ts)、[packages/acp/acp/tests/multi-session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/multi-session.spec.ts)、[packages/acp/acp/tests/turns.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/turns.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/acp/acp/tests/approval.spec.ts`、`packages/acp/acp/tests/bridge.spec.ts`、`packages/acp/acp/tests/dispose.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `textResponse`、`maxTokensResponse`、`errorResponse`、`CapturedUpdate`、`BridgeHarness`、`makeBridgeHarness`、`MockAdapter`、`MemoryAttachmentStore`；源码顶部原注释（英文，仅作回查线索）：In-memory ACP transport fixture over the real agent factory and loop.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/multi-session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/multi-session.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“ACP multi-session isolation”、“demultiplexes concurrent answers by session id”、“cancels one session without affecting another”、“enforces one in-flight prompt independently for each session”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP multi-session isolation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `messageTextFor`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `messageTextFor`；扫描到的测试主题包括 “ACP multi-session isolation”、“demultiplexes concurrent answers by session id”、“cancels one session without affecting another”、“enforces one in-flight prompt independently for each session”、“drains every live session on bridge disposal”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/acp/acp/tests/turns.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/turns.spec.ts)

- 所属层：packages/acp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“turns”写出可重复运行的断言，覆盖的场景包括“ACP prompt lifecycle”、“maps a max-token turn to end_turn without losing its committed text”、“delivers a committed assistant image as verified ACP base64”、“preserves committed text/image/text order on the ACP wire”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP prompt lifecycle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `newSession`、`messageText`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/acp/acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/README.md)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 530 行；扫描到的声明包括 `newSession`、`messageText`；扫描到的测试主题包括 “ACP prompt lifecycle”、“maps a max-token turn to end_turn without losing its committed text”、“delivers a committed assistant image as verified ACP base64”、“preserves committed text/image/text order on the ACP wire”、“does not settle a prompt before ordered output delivery drains”、“fails prompt delivery when a committed image attachment is missing”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
