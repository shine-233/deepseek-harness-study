# 源文件索引：packages/core

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 109 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/core/agent-default-model/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Default model selection for an Agent without a session-specific selection. @module @deepseek-ai/dsh-agent-default-model”；固定提交中扫描到的声明包括 `AGENT_DEFAULT_MODEL_SETTINGS_NAMESPACE`、`AgentDefaultModelSettings`、`AGENT_DEFAULT_MODEL_SETTINGS_SCHEMA`、`Config`、`AgentDefaultModelConfig`；本地静态 import 图显示它直接依赖 5 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-default-model/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)、[packages/bundle/headless/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/headless/src/index.ts)
- 对应测试：[packages/bundle/headless/tests/headless.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/headless/tests/headless.spec.ts)、[packages/core/agent-default-model/tests/agent-default-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/tests/agent-default-model.spec.ts)、[packages/host/apiproxy/tests/api-proxy-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/core/agent-default-model/README.md`、入口和消费者，再读当前契约，沿着 `packages/bundle/headless/src/index.ts`、`packages/bundle/headless/tests/headless.spec.ts`、`packages/core/agent-default-model/tests/agent-default-model.spec.ts` 看它怎样约束运行时，最后对照 `packages/bundle/headless/tests/headless.spec.ts`、`packages/core/agent-default-model/tests/agent-default-model.spec.ts`、`packages/host/apiproxy/tests/api-proxy-config.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `AGENT_DEFAULT_MODEL_SETTINGS_NAMESPACE`、`AgentDefaultModelSettings`、`AGENT_DEFAULT_MODEL_SETTINGS_SCHEMA`、`Config`、`AgentDefaultModelConfig`、`selection`；源码顶部原注释（英文，仅作回查线索）：Default model selection for an Agent without a session-specific selection. @module @deepseek-ai/dsh-agent-default-model。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-default-model/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for the default Agent model selection. The service owns no independent event relationship: settings registration already validates every mutable value before currentSelection() can observe it. The empty installer keeps that...”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-default-model/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the default Agent model selection. The service owns no independent event relationship: settings registration already validates every mutable value before currentSelection() can observe it. The empty installer keeps that...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-default-model/tests/agent-default-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/tests/agent-default-model.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“AgentDefaultModelConfig”、“resolves the user layer over the composition entry”、“clears a stored effort when the saved selection has none”、“layers a hand-written partial section over the entry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AgentDefaultModelConfig”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Default Agent model settings layered over a real settings provider.”；固定提交中扫描到的声明包括 `MemorySettings`、`boot`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-default-model/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/README.md)、[packages/core/agent-default-model/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-default-model/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/settings/settings/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `MemorySettings`、`boot`；扫描到的测试主题包括 “AgentDefaultModelConfig”、“resolves the user layer over the composition entry”、“clears a stored effort when the saved selection has none”、“layers a hand-written partial section over the entry”、“falls back to the composition entry when the settings provider detaches”、“keeps the composition entry when no settings provider is mounted”；源码顶部原注释（英文，仅作回查线索）：Default Agent model settings layered over a real settings provider.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-default-model/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/tsdown.config.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它把默认模型包拆成 `index.js` 和 `invariant.js` 两个入口：正常能力与运行时不变量可以分别被依赖，避免只想检查配置的调用者加载完整实现。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-default-model/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-default-model/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/core/agent-default-model/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/agent.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与智能体的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Default Agent driver over queued turns and step-boundary input. Every request is derived from the session log. @module dsh-agent-loop/agent”；固定提交中扫描到的声明包括 `ReactLoopAgent`、`requestProposal`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/runtime-context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/runtime-context.ts)、[packages/core/agent-loop/src/tool-calls.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/tool-calls.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)
- 对应测试：[packages/core/agent-loop/tests/contract-regressions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/contract-regressions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/core/agent-loop/README.md` 和入口，再读当前实现，沿着 `packages/core/agent-loop/src/runtime-context.ts`、`packages/core/agent-loop/src/tool-calls.ts`、`packages/core/agent/src/index.ts` 和 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/tests/contract-regressions.spec.ts` 确认输入输出，最后对照 `packages/core/agent-loop/tests/contract-regressions.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 515 行；扫描到的声明包括 `ReactLoopAgent`、`requestProposal`；源码顶部原注释（英文，仅作回查线索）：Default Agent driver over queued turns and step-boundary input. Every request is derived from the session log. @module dsh-agent-loop/agent。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/src/constants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/constants.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：常量与默认值
- 这个文件有什么用：它集中放置智能体使用的名称、默认值或限制，避免不同模块悄悄使用不同的数字和字符串。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared agent-loop scheduler defaults. @module dsh-agent-loop/constants”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Shared agent-loop scheduler defaults. @module dsh-agent-loop/constants”；固定提交中扫描到的声明包括 `DEFAULT_MAX_PARALLEL_TOOL_CALLS`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)、[examples/headless-agent/tests/todo-write.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/todo-write.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent-loop/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/core/agent-loop/src/index.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`、`examples/headless-agent/tests/compaction.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 6 行；扫描到的声明包括 `DEFAULT_MAX_PARALLEL_TOOL_CALLS`；源码顶部原注释（英文，仅作回查线索）：Shared agent-loop scheduler defaults. @module dsh-agent-loop/constants。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Concrete agent-loop plugin: creates scoped ReactLoopAgents, publishes them through the agent/session registries, and owns their ordered teardown. @module @deepseek-ai/dsh-agent-loop”；固定提交中扫描到的声明包括 `LauncherAgentIdentity`、`ConfiguredAgentIdentities`、`CONFIGURED_AGENT_IDENTITIES_KEY`、`AGENT_LOOP_SETTINGS_NAMESPACE`、`AgentLoopSettings`；本地静态 import 图显示它直接依赖 11 个源文件，并被 69 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/agent.ts)、[packages/core/agent-loop/src/constants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/constants.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[examples/acp-agent/tests/fixtures/subagent-report-fence.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/fixtures/subagent-report-fence.ts)
- 对应测试：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/compaction/compaction-basic/tests/manual-compaction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/manual-compaction.spec.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/context/time-context/tests/time-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/core/agent-loop/README.md`、入口和消费者，再读当前契约，沿着 `examples/acp-agent/tests/fixtures/subagent-report-fence.ts`、`examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/fixtures/subagent-settlement-fence.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 713 行；扫描到的声明包括 `LauncherAgentIdentity`、`ConfiguredAgentIdentities`、`CONFIGURED_AGENT_IDENTITIES_KEY`、`AGENT_LOOP_SETTINGS_NAMESPACE`、`AgentLoopSettings`、`AGENT_LOOP_SETTINGS_SCHEMA`、`Config`、`AgentLoop`；源码顶部原注释（英文，仅作回查线索）：Concrete agent-loop plugin: creates scoped ReactLoopAgents, publishes them through the agent/session registries, and owns their ordered teardown. @module @deepseek-ai/dsh-agent-loop。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned request-reconstruction invariant for loop-built LLM calls. @module @deepseek-ai/dsh-agent-loop/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 4 个源文件，并被 12 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)
- 对应测试：[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/compaction/compaction-basic/tests/manual-compaction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/manual-compaction.spec.ts)、[packages/core/agent-loop/tests/contract-regressions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/contract-regressions.spec.ts)、[packages/core/agent-loop/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/invariant.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts` 和 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/core/agent-loop/tests/contract-regressions.spec.ts` 理解状态变化，最后对照 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/core/agent-loop/tests/contract-regressions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned request-reconstruction invariant for loop-built LLM calls. @module @deepseek-ai/dsh-agent-loop/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/src/runtime-context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/runtime-context.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时上下文投影
- 这个文件有什么用：它实现 RuntimeContextProjection，把动态运行时上下文投影成可以保留到会话历史里的消息；运行时对象不直接写入日志，持久化的是这份稳定投影。
- 为什么这样设计：动态上下文可能包含当前运行时对象，不能直接写进可恢复日志；先投影成稳定消息，Session 才能在重启后重建同样的模型输入，而运行时实现仍可变化。
- 文件级设计证据：源码顶部注释把它定位为“Durable projection state for dynamic runtime context. @module @deepseek-ai/dsh-agent-loop/runtime-context”；固定提交中扫描到的声明包括 `RuntimeContextProjection`、`isOwned`、`textOf`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/agent.ts)
- 对应测试：[packages/core/agent-loop/tests/runtime-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/runtime-context.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/core/agent-loop/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/core/agent-loop/src/agent.ts`、`packages/core/agent-loop/tests/runtime-context.spec.ts` 确认输入输出，最后对照 `packages/core/agent-loop/tests/runtime-context.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `RuntimeContextProjection`、`isOwned`、`textOf`；源码顶部原注释（英文，仅作回查线索）：Durable projection state for dynamic runtime context. @module @deepseek-ai/dsh-agent-loop/runtime-context。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/src/tool-calls.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/tool-calls.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：工具调用调度器
- 这个文件有什么用：它调度一轮中的工具调用，处理并发、独占调用屏障、取消、结果顺序和持久化事件；它是工具调用编排器，不是某一个具体工具。
- 为什么这样设计：工具调用同时有并发、独占屏障、取消、顺序和持久化几个不变量；让一个调度器拥有这些决策，比让每个工具或 Agent 回调各自解释更不容易产生竞态。
- 文件级设计证据：源码顶部注释把它定位为“Schedules one assistant step's tool calls. Exclusive calls form barriers; parallel calls use a bounded rolling pool and are reclassified before start. Dispatch may overlap, while policy, results, and result context remain model-ordered. Abort or an internal...”；固定提交中扫描到的声明包括 `executeToolCalls`、`parseArguments`、`runGroup`、`appendSkippedToolCall`、`appendToolCall`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/agent.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)、[examples/headless-agent/tests/todo-write.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/todo-write.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent-loop/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/core/agent-loop/src/agent.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`、`examples/headless-agent/tests/compaction.e2e.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 289 行；扫描到的声明包括 `executeToolCalls`、`parseArguments`、`runGroup`、`appendSkippedToolCall`、`appendToolCall`、`appendToolResult`；源码顶部原注释（英文，仅作回查线索）：Schedules one assistant step's tool calls. Exclusive calls form barriers; parallel calls use a bounded rolling pool and are reclassified before start. Dispatch may overlap, while policy, results, and result context remain model-ordered. Abort or an internal...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/agent-initiator.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/agent-initiator.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“AgentLoop initiator scope”、“keeps overlapping driver continuations bound to their exact Agents”、“keeps initiator identity minimal while one explicit signal spans each turn seam”、“keeps child setup under the parent boundary and restores the parent while the child dri...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AgentLoop initiator scope”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`send`、`OverlapAdapter`、`TestCapabilityTransport`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 403 行；扫描到的声明包括 `harness`、`waitForIdle`、`send`、`OverlapAdapter`、`TestCapabilityTransport`、`ReloadAdapter`；扫描到的测试主题包括 “AgentLoop initiator scope”、“keeps overlapping driver continuations bound to their exact Agents”、“keeps initiator identity minimal while one explicit signal spans each turn seam”、“keeps child setup under the parent boundary and restores the parent while the child driver remains active”、“keeps agentless direct tools ambient-free and builds trusted transport headers internally”、“drains the old driver before disabling ALS during agent-service restart”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/agent.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“Agent”、“idle inject() durably stages context without opening a turn”、“inject() preserves an explicitly empty plugin source”、“emits exact inserted, claimed, and discarded inbox messages”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Agent”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`send`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 167 行；扫描到的声明包括 `harness`、`send`；扫描到的测试主题包括 “Agent”、“idle inject() durably stages context without opening a turn”、“inject() preserves an explicitly empty plugin source”、“emits exact inserted, claimed, and discarded inbox messages”、“idle inject() rejects invalid input before enqueue”、“steer() while idle becomes a woken prompt turn”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/cancel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/cancel.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“Agent.cancel()”、“cancel() on an idle agent with nothing queued is a no-op; the next prompt runs (F2 leak...”、“cancel({ keepInbox: true }) does not restore work already claimed by a waking send”、“cancel({ keepInbox: true }) parks queued work after an active turn aborts”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Agent.cancel()”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `driverDone`、`harness`、`send`、`waitForIdle`、`userTexts`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 995 行；扫描到的声明包括 `driverDone`、`harness`、`send`、`waitForIdle`、`userTexts`；扫描到的测试主题包括 “Agent.cancel()”、“cancel() on an idle agent with nothing queued is a no-op; the next prompt runs (F2 leak guard)”、“cancel({ keepInbox: true }) does not restore work already claimed by a waking send”、“cancel({ keepInbox: true }) parks queued work after an active turn aborts”、“cancel({ keepInbox: true }) latches a waking send landing in the abort-to-idle window”、“cancel() without keepInbox clears a latched wake alongside the inbox”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/config-session-id.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/config-session-id.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、会话的具体场景，包括“config-driven session id”、“applies launcher identities by configured id without changing unmatched entries”、“rejects an empty exact id before publishing an agent”、“accepts one exact fresh id and rejects it alongside a resume id”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“config-driven session id”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `waitForIdle`、`makeCoreContext`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 489 行；扫描到的声明包括 `waitForIdle`、`makeCoreContext`；扫描到的测试主题包括 “config-driven session id”、“applies launcher identities by configured id without changing unmatched entries”、“rejects an empty exact id before publishing an agent”、“accepts one exact fresh id and rejects it alongside a resume id”、“rejects duplicate exact ids before asynchronous configured startup”、“restores a materialized exact id across an AgentLoop-only reload”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/contract-regressions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/contract-regressions.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“assistant replay provider and model fields”、“records adapter replay state with the assembled assistant content”、“abort during tool execution ends the turn”、“parks context finalized after a tool-step abort until another wakeup”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“assistant replay provider and model fields”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mountInvariants`、`driverDone`、`harness`、`waitForIdle`、`send`；本地静态 import 图显示它直接依赖 13 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/agent.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/agent.ts`、`packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1339 行；扫描到的声明包括 `mountInvariants`、`driverDone`、`harness`、`waitForIdle`、`send`、`inboxText`、`balancedHarness`、`boundaryCounts`；扫描到的测试主题包括 “assistant replay provider and model fields”、“records adapter replay state with the assembled assistant content”、“abort during tool execution ends the turn”、“parks context finalized after a tool-step abort until another wakeup”、“records post-tool context when a later call aborts the batch”、“closes an empty admitted batch as a turn without a step”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/coverage-edges.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/coverage-edges.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“tool JSON parse”、“passes through non-JSON arguments string without crashing”、“uses empty object when tool-call arguments are empty string”、“thrown-value propagation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool JSON parse”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `driverDone`、`harness`、`waitForIdle`、`send`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 530 行；扫描到的声明包括 `driverDone`、`harness`、`waitForIdle`、`send`；扫描到的测试主题包括 “tool JSON parse”、“passes through non-JSON arguments string without crashing”、“uses empty object when tool-call arguments are empty string”、“thrown-value propagation”、“preserves non-Error throws from pre-commit dispatch validation”、“preserves non-Error throws from the agent/request waterfall”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/interception.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/interception.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent/pre-step”、“enter (default via next) records the user/message unchanged”、“reports the request coordinates for initial and tool-continuation prompts”、“publishes frozen input without replacing its identity”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent/pre-step”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`send`、`events`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 814 行；扫描到的声明包括 `harness`、`waitForIdle`、`send`、`events`；扫描到的测试主题包括 “agent/pre-step”、“enter (default via next) records the user/message unchanged”、“reports the request coordinates for initial and tool-continuation prompts”、“publishes frozen input without replacing its identity”、“enter with content rewrites the prompt before it is recorded”、“enter with additional messages records separately sourced context in the turn”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/invariant.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“request-reconstruction invariant”、“accepts a frozen request equal to the boundary derivation and folded header”、“includes context appended inside the open step before dispatch”、“requires the messages to equal the boundary derivation exactly (no unlogged prefix)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“request-reconstruction invariant”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`dispatch`、`loopRequest`、`requestSetup`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/invariant.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/invariant.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `setup`、`dispatch`、`loopRequest`、`requestSetup`；扫描到的测试主题包括 “request-reconstruction invariant”、“accepts a frozen request equal to the boundary derivation and folded header”、“includes context appended inside the open step before dispatch”、“requires the messages to equal the boundary derivation exactly (no unlogged prefix)”、“rejects message and header divergence”、“rejects loop requests with no boundary or header”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/loop.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/loop.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent loop”、“seeds a valid AgentOptions.maxTokens into the first model request”、“cancels queued wakeup work together with an active maintenance task”、“replays a wake latched behind maintenance at convergence”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent loop”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `driverDone`、`harness`、`waitForIdle`、`send`、`userTexts`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1496 行；扫描到的声明包括 `driverDone`、`harness`、`waitForIdle`、`send`、`userTexts`；扫描到的测试主题包括 “agent loop”、“seeds a valid AgentOptions.maxTokens into the first model request”、“cancels queued wakeup work together with an active maintenance task”、“replays a wake latched behind maintenance at convergence”、“suppresses the replay when a latched maintenance wake is removed”、“runs a simple turn: queued message → model → idle, with ordered events”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“mock-adapter”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `textResponse`、`maxTokensResponse`、`toolCallResponse`、`HangAfter`、`MockAdapter`；本地静态 import 图显示它直接依赖 1 个源文件，并被 43 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/agent-loop/tests/agent-initiator.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/agent-initiator.spec.ts)、[packages/core/agent-loop/tests/agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/agent.spec.ts)
- 对应测试：[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/agent-loop/tests/agent-initiator.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/agent-initiator.spec.ts)、[packages/core/agent-loop/tests/agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/agent.spec.ts)、[packages/core/agent-loop/tests/cancel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/cancel.spec.ts)、[packages/core/agent-loop/tests/config-session-id.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/config-session-id.spec.ts)、[packages/core/agent-loop/tests/contract-regressions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/contract-regressions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/context/agent-instructions/tests/agent-instructions.spec.ts`、`packages/core/agent-loop/tests/agent-initiator.spec.ts`、`packages/core/agent-loop/tests/agent.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `textResponse`、`maxTokensResponse`、`toolCallResponse`、`HangAfter`、`MockAdapter`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/properties.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/properties.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent loop scheduling properties”、“a synchronous burst gives every message its own strictly increasing turn”、“sequential sends each get their own turn with increasing numbers”、“mixed settled and same-tick sends preserve one turn per message”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent loop scheduling properties”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Property-based tests for the agent loop's inbox/turn scheduling (the property-testing Agent Note). Deterministic by construction: schedules are driven through the agent/status settle signal (no wall-clock sleeps), so a flake is a finding, not timing noise. ...”；固定提交中扫描到的声明包括 `EchoAdapter`、`harness`、`nextIdle`、`recordStatus`、`userMessageTexts`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 192 行；扫描到的声明包括 `EchoAdapter`、`harness`、`nextIdle`、`recordStatus`、`userMessageTexts`、`turnNumbers`、`turnEndNumbers`、`userMessageCountsByTurn`；扫描到的测试主题包括 “agent loop scheduling properties”、“a synchronous burst gives every message its own strictly increasing turn”、“sequential sends each get their own turn with increasing numbers”、“mixed settled and same-tick sends preserve one turn per message”；源码顶部原注释（英文，仅作回查线索）：Property-based tests for the agent loop's inbox/turn scheduling (the property-testing Agent Note). Deterministic by construction: schedules are driven through the agent/status settle signal (no wall-clock sleeps), so a flake is a finding, not timing noise. ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/request-cache.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/request-cache.e2e.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“every request after the first hits the provider prefix cache”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“every request after the first hits the provider prefix cache”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `loopHarness`、`waitForIdle`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `loopHarness`、`waitForIdle`；扫描到的测试主题包括 “every request after the first hits the provider prefix cache”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/request-error.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/request-error.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent/request-error”、“does not offer middleware failures to request recovery”、“lets each failed request return a retry action before its turn closes”、“lets cancellation win over a retry action”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent/request-error”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`fail`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `harness`、`fail`；扫描到的测试主题包括 “agent/request-error”、“does not offer middleware failures to request recovery”、“lets each failed request return a retry action before its turn closes”、“lets cancellation win over a retry action”、“does not retry when the recovery listener fails before returning its action”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/request-reconstruction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/request-reconstruction.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“request stability across the loop”、“each step request within a turn append-extends the previous, frozen end to end”、“a later turn append-extends the previous turn (one conversation, one log)”、“logs adapter defaults, supports per-turn effort changes, and restores the effective value”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“request stability across the loop”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Loop-level reconstructability: every request the loop sends is a pure function of the session log — messages derive at the step/start boundary and the header is the latest request/header snapshot. Each request extends its predecessor unless a logged compact...”；固定提交中扫描到的声明包括 `harness`、`harnessRoutes`、`waitForIdle`、`send`、`expectPrefixExtension`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 706 行；扫描到的声明包括 `harness`、`harnessRoutes`、`waitForIdle`、`send`、`expectPrefixExtension`、`registerEcho`、`capacityAdapter`；扫描到的测试主题包括 “request stability across the loop”、“each step request within a turn append-extends the previous, frozen end to end”、“a later turn append-extends the previous turn (one conversation, one log)”、“logs adapter defaults, supports per-turn effort changes, and restores the effective value”、“logs an adapter-owned maxTokens default before dispatch”、“rematerializes the selected adapter maxTokens default after a provider switch”；源码顶部原注释（英文，仅作回查线索）：Loop-level reconstructability: every request the loop sends is a pure function of the session log — messages derive at the step/start boundary and the header is the latest request/header snapshot. Each request extends its predecessor unless a logged compact...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/resume.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/resume.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“the session-persistence Agent Note: AgentLoop factory create/resume”、“resumes a pre-react-loop session including pre-identity message events”、“normalizes a non-Error resume publication failure for rollback and rethrows it”、“createAgent uses the caller-supplied sessionId (not ${id}-session)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the session-persistence Agent Note: AgentLoop factory create/resume”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `persistentHarness`、`mountPersistentHarness`、`persistSession`、`preparationFromSnapshot`、`waitForIdle`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 944 行；扫描到的声明包括 `persistentHarness`、`mountPersistentHarness`、`persistSession`、`preparationFromSnapshot`、`waitForIdle`、`promptly`、`throwUnknown`；扫描到的测试主题包括 “the session-persistence Agent Note: AgentLoop factory create/resume”、“resumes a pre-react-loop session including pre-identity message events”、“normalizes a non-Error resume publication failure for rollback and rethrows it”、“createAgent uses the caller-supplied sessionId (not ${id}-session)”、“createAgent rejects a duplicate identity without orphaning a session”、“resume cannot crash-repair a turn owned by a live agent”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/runtime-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/runtime-context.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、运行时、上下文的具体场景，包括“RuntimeContextProjection”、“restores the latest visible owned snapshot and ignores other sessions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“RuntimeContextProjection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `contextMessage`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/runtime-context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/runtime-context.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/runtime-context.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `contextMessage`；扫描到的测试主题包括 “RuntimeContextProjection”、“restores the latest visible owned snapshot and ignores other sessions”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/scope-lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/scope-lifecycle.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent scope lifecycle”、“rejects an already-aborted creation signal before publishing either object”、“joins cleanup when an abort lands reentrantly during scope preparation”、“normalizes non-Error create failures for rollback while rethrowing the original value”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent scope lifecycle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harnessWithLoop`、`harness`、`waitForIdle`、`throwUnknown`、`disposeCurrentLifecycle`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1093 行；扫描到的声明包括 `harnessWithLoop`、`harness`、`waitForIdle`、`throwUnknown`、`disposeCurrentLifecycle`、`ExoticData`；扫描到的测试主题包括 “agent scope lifecycle”、“rejects an already-aborted creation signal before publishing either object”、“joins cleanup when an abort lands reentrantly during scope preparation”、“normalizes non-Error create failures for rollback while rethrowing the original value”、“wires agent.ctx: tagged with the agent, DX field set, ctx.agent safe elsewhere”、“records agents created through an agent context as non-root runtime children”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/settings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/settings.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent-loop settings section”、“layers the stored parallel cap over the composition entry”、“refuses a non-positive cap at the write”、“never offers the composed agents array to the settings document”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent-loop settings section”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The agent-loop settings section layered over the composition entry.”；固定提交中扫描到的声明包括 `MemorySettings`、`boot`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的声明包括 `MemorySettings`、`boot`；扫描到的测试主题包括 “agent-loop settings section”、“layers the stored parallel cap over the composition entry”、“refuses a non-positive cap at the write”、“never offers the composed agents array to the settings document”、“keeps serving the composed agents array to its own consumers”、“falls back to the composition entry when the settings provider detaches”；源码顶部原注释（英文，仅作回查线索）：The agent-loop settings section layered over the composition entry.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/tool-calls.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/tool-calls.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、工具的具体场景，包括“tool-call scheduler: grouping and barriers”、“runs parallel-safe siblings concurrently (all start before any completes)”、“an exclusive call between two parallel-safe calls forms a barrier (3 groups)”、“reclassifies pending calls after an exclusive barrier replaces their tool”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-call scheduler: grouping and barriers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Exercises scheduler ordering and cancellation with deterministic gated tools. ACP expected outputs own transcript-facing coverage.”；固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`events`、`multiCall`、`gatedTool`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/code-runtime/code-runtime/src/index.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/code-runtime/code-runtime/src/index.ts`、`packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 762 行；扫描到的声明包括 `harness`、`waitForIdle`、`events`、`multiCall`、`gatedTool`、`gatedParallelTool`、`gatedExclusiveTool`、`until`；扫描到的测试主题包括 “tool-call scheduler: grouping and barriers”、“runs parallel-safe siblings concurrently (all start before any completes)”、“an exclusive call between two parallel-safe calls forms a barrier (3 groups)”、“reclassifies pending calls after an exclusive barrier replaces their tool”、“stops replenishing when a result observer makes the next call exclusive”、“tool-call scheduler: model-order results despite out-of-order settlement”；源码顶部原注释（英文，仅作回查线索）：Exercises scheduler ordering and cancellation with deterministic gated tools. ACP expected outputs own transcript-facing coverage.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tests/tool-order.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/tool-order.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、工具的具体场景，包括“loop-level canonical tool order”、“logs the request/header with tools in canonical order, not registration order”、“produces the same header order for any registration order”、“honors a configured toolOrder in the logged header and the dispatched request”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“loop-level canonical tool order”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`registerNamed`、`runTurn`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 110 行；扫描到的声明包括 `harness`、`waitForIdle`、`registerNamed`、`runTurn`；扫描到的测试主题包括 “loop-level canonical tool order”、“logs the request/header with tools in canonical order, not registration order”、“produces the same header order for any registration order”、“honors a configured toolOrder in the logged header and the dispatched request”、“closes a no-step turn when toolOrder names an unregistered tool”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-loop/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tsdown.config.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理智能体：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-loop/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/core/agent-loop/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-tool-presentation/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体、工具、呈现相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent-plane presentation selector: the row an agent preset carries to say which form of its tools the model sees. The tool registry itself stays on the host plane — the agent loop's scheduler, the API proxy's presenters, and every tool plugin are all its co...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-tool-presentation/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts)
- 对应测试：[packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/core/agent-tool-presentation/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts` 看它怎样约束运行时，最后对照 `packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：Agent-plane presentation selector: the row an agent preset carries to say which form of its tools the model sees. The tool registry itself stays on the host plane — the agent loop's scheduler, the API proxy's presenters, and every tool plugin are all its co...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-tool-presentation/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体、工具、呈现必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-agent-tool-presentation. @module @deepseek-ai/dsh-agent-tool-presentation/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-tool-presentation/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-agent-tool-presentation. @module @deepseek-ai/dsh-agent-tool-presentation/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、工具、呈现的具体场景，包括“the tool-presentation row”、“declares the services it uses without holding a code runtime hostage”、“gives its own agent Code Mode and leaves the rest native”、“presents both forms when asked for both”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the tool-presentation row”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The row an agent preset carries to pick its tool presentation. What it owes its caller: the choice reaches THIS agent and no other, it unwinds with the agent, and a code mode composed against a deployment with no code runtime stops at mount — where a preset...”；固定提交中扫描到的声明包括 `StubRuntime`、`host`、`mount`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent-tool-presentation/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/code-runtime/code-runtime/src/index.ts)、[packages/core/agent-tool-presentation/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/code-runtime/code-runtime/src/index.ts`、`packages/core/agent-tool-presentation/src/index.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `StubRuntime`、`host`、`mount`；扫描到的测试主题包括 “the tool-presentation row”、“declares the services it uses without holding a code runtime hostage”、“gives its own agent Code Mode and leaves the rest native”、“presents both forms when asked for both”、“restores the deployment default when the agent unloads”、“waits for a code runtime the deployment does not compose”；源码顶部原注释（英文，仅作回查线索）：The row an agent preset carries to pick its tool presentation. What it owes its caller: the choice reaches THIS agent and no other, it unwinds with the agent, and a code mode composed against a deployment with no code runtime stops at mount — where a preset...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/consumed-work.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/consumed-work.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：Agent 状态实现
- 这个文件有什么用：它从 Agent 的 Turn 结束和 durable inbox 变更中判断哪些输入真正被消费、哪些输入被取消而未运行，避免只看 `turn/end` 就把无操作或被丢弃的工作算错。
- 为什么这样设计：“已消费”不能只从 Turn 是否结束推断，因为被取消的 inbox 输入可能从未打开 Step；把 work accounting 单独投影出来，恢复和统计就能区分完成、失败和未运行。
- 文件级设计证据：源码顶部注释把它定位为“How one agent log accounts for the work it consumed. The turn and step vocabulary alone cannot answer this. A turn that stops before its first step leaves a turn/end shaped exactly like the balanced no-op turns a rejection or an empty claim produces, so rea...”；固定提交中扫描到的声明包括 `ConsumedWork`、`foldConsumedWork`、`accountsForClaim`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts` 和 `packages/core/agent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `ConsumedWork`、`foldConsumedWork`、`accountsForClaim`；源码顶部原注释（英文，仅作回查线索）：How one agent log accounts for the work it consumed. The turn and step vocabulary alone cannot answer this. A turn that stops before its first step leaves a turn/end shaped exactly like the balanced no-op turns a rejection or an empty claim produces, so rea...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/dispatch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/dispatch.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：Agent 状态实现
- 这个文件有什么用：它定义带 Agent scope 的事件分发和 prompt assembly 辅助，让事件 payload 中的 agent 与当前作用域绑定，避免错误的 Agent 交叉消费事件。
- 为什么这样设计：Agent 事件同时需要 payload 中的 agent 和 `this` 上的 scope carrier；把两者绑定成一个 dispatcher，可以在类型层和运行时共同阻止跨 Agent 分发。
- 文件级设计证据：源码顶部注释把它定位为“Agent-scoped dispatch and prompt assembly helpers. The fused dispatcher agentEvents couples the agent subject to its scope carrier, so the scope key and the payload's agent cannot diverge; repeat dispatchers (the loop driver) build it once in the agent's co...”；固定提交中扫描到的声明包括 `AgentSubjectEvent`、`AgentEventDispatch`、`agentCarrier`、`agentEvents`、`emitAgentEvent`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/runtime-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/runtime-types.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/runtime-types.ts`、`packages/core/scope/src/index.ts`、`packages/core/system-prompt/src/index.ts` 和 `packages/core/agent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `AgentSubjectEvent`、`AgentEventDispatch`、`agentCarrier`、`agentEvents`、`emitAgentEvent`、`assembleContextFor`；源码顶部原注释（英文，仅作回查线索）：Agent-scoped dispatch and prompt assembly helpers. The fused dispatcher agentEvents couples the agent subject to its scope carrier, so the scope key and the payload's agent cannot diverge; repeat dispatchers (the loop driver) build it once in the agent's co...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/inbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/inbox.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：队列状态
- 这个文件有什么用：它从 Session 日志增量重建 Agent 的 `next-turn`、`next-step` 输入队列，并在插入、丢弃和领取时发出 live 通知；队列因此既可恢复又可被运行时观察。
- 为什么这样设计：inbox 是会影响下一次请求的 durable 状态，不是普通内存队列；独立的 replay projection 让日志恢复、live notification 和队列操作共享同一套顺序规则。
- 文件级设计证据：源码顶部注释把它定位为“Incremental projection of durable agent inbox events. @module @deepseek-ai/dsh-agent/inbox”；固定提交中扫描到的声明包括 `InboxNotifications`、`Inbox`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/types.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/agent/src/types.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/core/agent/src/index.ts`、`packages/core/agent/src/runtime-types.ts` 理解状态变化，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 220 行；扫描到的声明包括 `InboxNotifications`、`Inbox`；源码顶部原注释（英文，仅作回查线索）：Incremental projection of durable agent inbox events. @module @deepseek-ai/dsh-agent/inbox。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent service: live registry, factory delegation, and process-local initiator scope. Concrete creation and driving belong to the loop. @module @deepseek-ai/dsh-agent”；固定提交中扫描到的声明包括 `AgentSetupCommit`、`AgentSetup`、`CreateAgentOptions`、`ResumeAgentOptions`、`AgentHandle`；本地静态 import 图显示它直接依赖 10 个源文件，并被 252 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/consumed-work.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/consumed-work.ts)、[packages/core/agent/src/dispatch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/dispatch.ts)、[packages/core/agent/src/inbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/inbox.ts)、[apps/cli/tests/fixtures/dsh-badge/snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/fixtures/dsh-badge/snapshot.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/background-job-list.e2e.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/subagent-conversation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/core/agent/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/fixtures/dsh-badge/snapshot.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 706 行；扫描到的声明包括 `AgentSetupCommit`、`AgentSetup`、`CreateAgentOptions`、`ResumeAgentOptions`、`AgentHandle`、`AgentFactory`、`AgentRegistry`；源码顶部原注释（英文，仅作回查线索）：Agent service: live registry, factory delegation, and process-local initiator scope. Concrete creation and driving belong to the loop. @module @deepseek-ai/dsh-agent。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned agent lifecycle invariants. @module @deepseek-ai/dsh-agent/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 12 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)
- 对应测试：[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/compaction/compaction-basic/tests/manual-compaction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/manual-compaction.spec.ts)、[packages/core/agent-loop/tests/contract-regressions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/contract-regressions.spec.ts)、[packages/core/agent/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/invariant.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/agent/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/core/agent-loop/tests/contract-regressions.spec.ts` 理解状态变化，最后对照 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/core/agent-loop/tests/contract-regressions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned agent lifecycle invariants. @module @deepseek-ai/dsh-agent/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/model-selection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/model-selection.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模型选择与请求路由
- 这个文件有什么用：它定义 Agent 的 provider、model 和 reasoning 选择，并把选择同步到 Prompt Assembly 与请求路由；切换发生在明确边界，当前请求仍使用已经解析出的选择。
- 为什么这样设计：模型选择既影响 prompt assembly 又影响请求路由，且一轮执行中不能因为配置热更新而前后不一致；在 Agent 边界解析并传播选择，可以固定一次请求的语义。
- 文件级设计证据：源码顶部注释把它定位为“Agent-scoped model selection shared by runtime entry points. @module @deepseek-ai/dsh-agent/model-selection”；固定提交中扫描到的声明包括 `ModelSelection`、`ModelSelectionRef`、`installModelSelection`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/core/agent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `ModelSelection`、`ModelSelectionRef`、`installModelSelection`；源码顶部原注释（英文，仅作回查线索）：Agent-scoped model selection shared by runtime entry points. @module @deepseek-ai/dsh-agent/model-selection。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/runtime-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/runtime-types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述智能体、运行时中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public agent types and live-runtime events. Durable transcript facts and turn/step boundaries remain @deepseek-ai/dsh-session events. @module @deepseek-ai/dsh-agent”；固定提交中扫描到的声明包括 `AgentOptions`、`CancelOptions`、`AgentStatus`、`PreStepDecision`、`RequestErrorAction`；本地静态 import 图显示它直接依赖 7 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/inbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/inbox.ts)、[packages/core/agent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/types.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/agent/src/dispatch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/dispatch.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/agent/src/dispatch.ts`、`packages/core/agent/src/index.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 292 行；扫描到的声明包括 `AgentOptions`、`CancelOptions`、`AgentStatus`、`PreStepDecision`、`RequestErrorAction`、`SessionStartSource`、`Agent`；源码顶部原注释（英文，仅作回查线索）：Public agent types and live-runtime events. Durable transcript facts and turn/step boundaries remain @deepseek-ai/dsh-session events. @module @deepseek-ai/dsh-agent。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述智能体中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Durable agent session-event vocabulary shared with type-only consumers. @module @deepseek-ai/dsh-agent/types”；固定提交中扫描到的声明包括 `InboxTarget`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/runtime/src/client/sessions/steering-history.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/steering-history.ts)、[packages/client/ui-conversation/src/client/conversation-nodes/inbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/conversation-nodes/inbox.ts)、[packages/client/ui-trajectory/src/client/trajectory-message-definitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-message-definitions.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/agent/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/src/client/sessions/steering-history.ts`、`packages/client/ui-conversation/src/client/conversation-nodes/inbox.ts`、`packages/client/ui-trajectory/src/client/trajectory-message-definitions.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `InboxTarget`；源码顶部原注释（英文，仅作回查线索）：Durable agent session-event vocabulary shared with type-only consumers. @module @deepseek-ai/dsh-agent/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tests/agent-initiator.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/agent-initiator.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“AgentRegistry initiator scope”、“reports an absent initiator and requires an active boundary”、“preserves exact synchronous and Promise return identities across await”、“tracks a branded Promise without calling its overridable then property”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AgentRegistry initiator scope”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `agent`、`harness`、`promptly`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 265 行；扫描到的声明包括 `agent`、`harness`、`promptly`；扫描到的测试主题包括 “AgentRegistry initiator scope”、“reports an absent initiator and requires an active boundary”、“preserves exact synchronous and Promise return identities across await”、“tracks a branded Promise without calling its overridable then property”、“preserves a settled branded Promise when its species blocks observer construction”、“isolates overlapping initiators”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tests/agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/agent.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“Inbox”、“rejects an invalid durable splice during reconstruction”、“replaces a pending message by identity across both lists”、“normalizes splice coordinates, rejects duplicate identities, and reports missing removals”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Inbox”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stubAgent`、`stubFactory`、`TracedFactory`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 438 行；扫描到的声明包括 `stubAgent`、`stubFactory`、`TracedFactory`；扫描到的测试主题包括 “Inbox”、“rejects an invalid durable splice during reconstruction”、“replaces a pending message by identity across both lists”、“normalizes splice coordinates, rejects duplicate identities, and reports missing removals”、“clears both pending lists as durable cancellations”、“AgentRegistry”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tests/consumed-work.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/consumed-work.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“foldConsumedWork”、“reports nothing for a log that consumed no work”、“reports the latest turn that entered a model step”、“reports a turn that claimed its input and then failed before any step”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“foldConsumedWork”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `message`、`accept`、`claim`、`cancelPending`、`steppedTurn`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `message`、`accept`、`claim`、`cancelPending`、`steppedTurn`；扫描到的测试主题包括 “foldConsumedWork”、“reports nothing for a log that consumed no work”、“reports the latest turn that entered a model step”、“reports a turn that claimed its input and then failed before any step”、“reports a turn that claimed its input and was then stopped before any step”、“ignores a turn stopped, failed, or rejected without taking any input”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/invariant.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent status invariants”、“accepts lifecycle transitions between idle and running”、“rejects a no-op transition”、“tracks agents independently”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent status invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`mockAgent`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/agent/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/invariant.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/agent/src/invariant.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `setup`、`mockAgent`；扫描到的测试主题包括 “agent status invariants”、“accepts lifecycle transitions between idle and running”、“rejects a no-op transition”、“tracks agents independently”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tests/model-selection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/model-selection.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“installModelSelection()”、“snapshots prompt variables and request routing together, then disposes both listeners”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“installModelSelection()”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的测试主题包括 “installModelSelection()”、“snapshots prompt variables and request routing together, then disposes both listeners”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/verify-export-jsdoc.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“verify-export-jsdoc functions and consts”、“limits packages without src/* exports to declarations reachable from package entrypoints”、“accepts a fully documented API”、“flags an exported function with no JSDoc at all”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“verify-export-jsdoc functions and consts”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Negative-path tests for the exported-API JSDoc gate (scripts/verify-export-jsdoc.ts).”；固定提交中扫描到的声明包括 `publicFn`、`hiddenFn`、`bump`、`poke`、`RETRIES`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)、[scripts/verify-export-jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-export-jsdoc.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-export-jsdoc.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 561 行；扫描到的声明包括 `publicFn`、`hiddenFn`、`bump`、`poke`、`RETRIES`、`halve`、`good`、`bad`；扫描到的测试主题包括 “verify-export-jsdoc functions and consts”、“limits packages without src/* exports to declarations reachable from package entrypoints”、“accepts a fully documented API”、“flags an exported function with no JSDoc at all”、“flags a missing @param and a missing @returns”、“flags an unannotated (inferred) return type”；源码顶部原注释（英文，仅作回查线索）：Negative-path tests for the exported-API JSDoc gate (scripts/verify-export-jsdoc.ts).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/agent/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tsdown.config.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理智能体：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/agent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/core/agent/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/core/scope` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Scoped-context primitive: mint a Cordis context that tags registrations with an opaque identity and build routing-only event carriers for that identity. @module @deepseek-ai/dsh-scope”；固定提交中扫描到的声明包括 `ScopeKey`、`Scoped`、`ScopeParentBinding`、`bindScopeParent`、`scopeParentOf`；本地静态 import 图显示它直接依赖 2 个源文件，并被 50 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/scope/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/store.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/agent.ts)、[packages/core/agent-loop/tests/scope-lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/scope-lifecycle.spec.ts)
- 对应测试：[packages/core/agent-loop/tests/scope-lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/scope-lifecycle.spec.ts)、[packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts)、[packages/core/agent/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/invariant.spec.ts)、[packages/core/scope/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/invariant.spec.ts)、[packages/core/scope/tests/scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/scope.spec.ts)、[packages/core/scope/tests/store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/store.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/core/scope/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/agent-loop/src/agent.ts`、`packages/core/agent-loop/tests/scope-lifecycle.spec.ts`、`packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts` 看它怎样约束运行时，最后对照 `packages/core/agent-loop/tests/scope-lifecycle.spec.ts`、`packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts`、`packages/core/agent/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 204 行；扫描到的声明包括 `ScopeKey`、`Scoped`、`ScopeParentBinding`、`bindScopeParent`、`scopeParentOf`、`scopeChainOf`、`Scope`、`CreateScopeOptions`；源码顶部原注释（英文，仅作回查线索）：Scoped-context primitive: mint a Cordis context that tags registrations with an opaque identity and build routing-only event carriers for that identity. @module @deepseek-ai/dsh-scope。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/core/scope` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned scoped-dispatch invariants. @module @deepseek-ai/dsh-scope/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/scope/src/scoped-events.generated.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/scoped-events.generated.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/core/scope/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/invariant.spec.ts)
- 对应测试：[packages/core/scope/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/invariant.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/scope/src/index.ts`、`packages/core/scope/src/scoped-events.generated.ts`、`packages/runtime-diagnostics/invariants/src/index.ts` 和 `packages/core/scope/tests/invariant.spec.ts`、`packages/examples/agent-spine-demo/src/index.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts` 理解状态变化，最后对照 `packages/core/scope/tests/invariant.spec.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned scoped-dispatch invariants. @module @deepseek-ai/dsh-scope/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/src/scoped-events.generated.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/scoped-events.generated.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：生成的事件作用域路由表
- 这个文件有什么用：它是根据事件定义生成的作用域解析表：把事件名映射到对应的 scope subject；生成结果不应手改，源定义变化后应重新运行 scoped-events 生成命令。
- 为什么这样设计：事件到 scope subject 的映射是定义文件的派生结果，手写会在新增事件时悄悄漂移；生成表让源定义成为唯一事实，运行时只消费稳定的查找结果。
- 文件级设计证据：源码顶部注释把它定位为“Generated scoped-event routing-subject resolvers for dsh-scope invariants. Do not edit by hand; run pnpm run gen-scoped-events. @module @deepseek-ai/dsh-scope/scoped-events.generated”；固定提交中扫描到的声明包括 `scopedSubjectResolverFor`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/scope/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/invariant.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/scope/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/invariant.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/plugin-apply.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/scope/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/core/scope/src/invariant.ts` 确认输入输出，最后对照 `packages/core/scope/tests/invariant.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `scopedSubjectResolverFor`；源码顶部原注释（英文，仅作回查线索）：Generated scoped-event routing-subject resolvers for dsh-scope invariants. Do not edit by hand; run pnpm run gen-scoped-events. @module @deepseek-ai/dsh-scope/scoped-events.generated。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/store.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared insertion-ordered storage and effect ownership for scope-aware registries. @module @deepseek-ai/dsh-scope”；固定提交中扫描到的声明包括 `ScopeLayer`、`NamedEntries`、`AnonymousEntries`、`ScopedLayers`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/scope/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/core/scope/src/index.ts` 理解状态变化，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/cli/tests/windows-shell.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 267 行；扫描到的声明包括 `ScopeLayer`、`NamedEntries`、`AnonymousEntries`、`ScopedLayers`；源码顶部原注释（英文，仅作回查线索）：Shared insertion-ordered storage and effect ownership for scope-aware registries. @module @deepseek-ai/dsh-scope。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/invariant.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/core/scope` 包里的 `tests/invariant.spec.ts` 的具体场景，包括“scoped-dispatch invariants”、“ignores ordinary events and rejects a scoped dispatch without a carrier”、“checks every generated subject resolver against the carrier key”、“requires carriers for generated presence-only scoped events without comparing a payload...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“scoped-dispatch invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`emit`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/scope/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`、`packages/core/scope/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `setup`、`emit`；扫描到的测试主题包括 “scoped-dispatch invariants”、“ignores ordinary events and rejects a scoped dispatch without a carrier”、“checks every generated subject resolver against the carrier key”、“requires carriers for generated presence-only scoped events without comparing a payload subject”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/tests/scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/scope.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/core/scope` 包里的 `tests/scope.spec.ts` 的具体场景，包括“createScope”、“tags contexts and derived contexts, with the nearest tag winning”、“is usable synchronously before the backing fiber activates”、“shares quiescence across repeat and raw-disposer-first calls”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createScope”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mintScope`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 222 行；扫描到的声明包括 `mintScope`；扫描到的测试主题包括 “createScope”、“tags contexts and derived contexts, with the nearest tag winning”、“is usable synchronously before the backing fiber activates”、“shares quiescence across repeat and raw-disposer-first calls”、“exposes the exact raw disposer for ordered composite teardown”、“scopeTarget”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/tests/store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tests/store.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查状态存储的具体场景，包括“NamedEntries”、“owns duplicate diagnostics, lookup, insertion order, live iteration, and exact idempote...”、“starts a fresh iterator generation after the table drains”、“AnonymousEntries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“NamedEntries”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestLayer`、`mintScope`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 289 行；扫描到的声明包括 `TestLayer`、`mintScope`；扫描到的测试主题包括 “NamedEntries”、“owns duplicate diagnostics, lookup, insertion order, live iteration, and exact idempotent undo”、“starts a fresh iterator generation after the table drains”、“AnonymousEntries”、“owns equal values independently with live insertion-ordered iteration and idempotent undo”、“ScopedLayers”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/scope/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/tsdown.config.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理 `packages/core/scope` 包里的 `tsdown.config.ts` ：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/scope/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/core/scope/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/chunk-rows.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/chunk-rows.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：会话分页行构建器
- 这个文件有什么用：它把会话事件整理成可以分页和渲染的行；分页行是面向读取的结构，不等于原始事件数组，因此历史折叠、边界和游标规则集中在这里。
- 为什么这样设计：原始 Session 事件适合追加和回放，界面分页需要另一种行结构；把读取侧的折叠、游标和渲染边界单独投影，既不破坏事实日志，也能优化历史读取。
- 文件级设计证据：源码顶部注释把它定位为“Lossless storage packing for assistant/chunk delta runs. Providers stream token-sized deltas, so a log stores hundreds of near-identical event lines whose JSON envelopes dwarf their payloads (~56× measured on a real DeepSeek session). This module packs each...”；固定提交中扫描到的声明包括 `ChunkRow`、`StorageRecord`、`packChunkRuns`、`decodeStorageRecord`、`isRecord`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/session/README.md`，再读本配置/脚本，沿着 `packages/core/session/src/index.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 346 行；扫描到的声明包括 `ChunkRow`、`StorageRecord`、`packChunkRuns`、`decodeStorageRecord`、`isRecord`、`hasExactKeys`、`classify`、`toolCallOf`；源码顶部原注释（英文，仅作回查线索）：Lossless storage packing for assistant/chunk delta runs. Providers stream token-sized deltas, so a log stores hundreds of near-identical event lines whose JSON envelopes dwarf their payloads (~56× measured on a real DeepSeek session). This module packs each...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Event-sourced session service: append-only session log, in-memory store, and the derived LLM message history. Persistence is a plugin concern (subscribe to session/event, drain on session/flush). @module @deepseek-ai/dsh-session”；固定提交中扫描到的声明包括 `adoptSessionEvent`、`snapshotSessionEvent`、`Session`、`SessionForkSource`、`SessionForkErrorCode`；本地静态 import 图显示它直接依赖 12 个源文件，并被 490 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/session/src/chunk-rows.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/chunk-rows.ts)、[packages/core/session/src/json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/json.ts)、[apps/cli/tests/fixtures/dsh-badge/snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/fixtures/dsh-badge/snapshot.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/approval-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/approval-composer.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/background-job-list.e2e.ts)、[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/core/session/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/fixtures/dsh-badge/snapshot.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/approval-composer.e2e.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1157 行；扫描到的声明包括 `adoptSessionEvent`、`snapshotSessionEvent`、`Session`、`SessionForkSource`、`SessionForkErrorCode`、`SessionForkError`、`SessionStore`、`validateSessionHeader`；源码顶部原注释（英文，仅作回查线索）：Event-sourced session service: append-only session log, in-memory store, and the derived LLM message history. Persistence is a plugin concern (subscribe to session/event, drain on session/flush). @module @deepseek-ai/dsh-session。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned relational invariants for the session event log. Load this companion beside @deepseek-ai/dsh-invariants to enable the checks. @module @deepseek-ai/dsh-session/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`requireOpenStep`、`validateEvent`；本地静态 import 图显示它直接依赖 5 个源文件，并被 13 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/session/src/repair.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/repair.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)
- 对应测试：[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/compaction/compaction-basic/tests/manual-compaction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/manual-compaction.spec.ts)、[packages/compaction/compaction-tool-result-pruner/tests/tool-result-pruner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-tool-result-pruner/tests/tool-result-pruner.spec.ts)、[packages/core/agent-loop/tests/contract-regressions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/contract-regressions.spec.ts)、[packages/core/session/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/invariant.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/core/session/src/repair.ts`、`packages/llm/llm/src/index.ts` 和 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/compaction/compaction-tool-result-pruner/tests/tool-result-pruner.spec.ts` 理解状态变化，最后对照 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/compaction/compaction-tool-result-pruner/tests/tool-result-pruner.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 250 行；扫描到的声明包括 `name`、`inject`、`apply`、`requireOpenStep`、`validateEvent`、`applyTransition`；源码顶部原注释（英文，仅作回查线索）：Package-owned relational invariants for the session event log. Load this companion beside @deepseek-ai/dsh-invariants to enable the checks. @module @deepseek-ai/dsh-session/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/json.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：JSON 边界
- 这个文件有什么用：它检查或转换会话的可安全序列化 JSON 数据，阻止不可重放的对象穿过协议和持久化边界。
- 为什么这样设计：协议和日志只接受可重放的 JSON 数据，把检查放在边界可以阻止函数、循环对象或带原型对象混入持久化事实。
- 文件级设计证据：源码顶部注释把它定位为“Lossless-JSON validation and detached snapshots for durable session data. @module @deepseek-ai/dsh-session/json”；固定提交中扫描到的声明包括 `JsonValue`、`snapshotJsonValue`、`isJsonValue`、`hasIntrinsicConstructor`、`isIntrinsicObjectPrototype`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/session/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/session/src/index.ts`、`packages/core/session/src/types.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 190 行；扫描到的声明包括 `JsonValue`、`snapshotJsonValue`、`isJsonValue`、`hasIntrinsicConstructor`、`isIntrinsicObjectPrototype`、`hasPlainArrayPrototype`、`hasPlainObjectPrototype`、`enumerableStringKeys`；源码顶部原注释（英文，仅作回查线索）：Lossless-JSON validation and detached snapshots for durable session data. @module @deepseek-ai/dsh-session/json。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/known-event-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/known-event-types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述会话、事件中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“GENERATED by scripts/gen-persistence-catalog.ts — do not edit by hand; run pnpm run gen-persistence-catalog to regenerate (verified fresh by pnpm run verify-persistence-catalog, part of doc-sync). @module @deepseek-ai/dsh-session/known-event-types”；固定提交中扫描到的声明包括 `KNOWN_SESSION_EVENT_TYPES`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/session/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/session/src/index.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `KNOWN_SESSION_EVENT_TYPES`；源码顶部原注释（英文，仅作回查线索）：GENERATED by scripts/gen-persistence-catalog.ts — do not edit by hand; run pnpm run gen-persistence-catalog to regenerate (verified fresh by pnpm run verify-persistence-catalog, part of doc-sync). @module @deepseek-ai/dsh-session/known-event-types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/preparation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/preparation.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：会话发布前生命周期
- 这个文件有什么用：它管理尚未发布的 Session 及其 provider-owned 状态，提供可释放且幂等的准备生命周期；prepare 不等于 publish，发布后旧的 provider 回调必须变成安全的 no-op。
- 为什么这样设计：Session 发布前可能暂时持有 provider-owned 资源，并且释放可能被重复触发；将 prepare、publish、release 的状态机集中在这里，可以把“尚不可见”和“已可恢复”区分清楚。
- 文件级设计证据：源码顶部注释把它定位为“Ownership of one unpublished Session before registry publication. @module @deepseek-ai/dsh-session/preparation”；固定提交中扫描到的声明包括 `SessionPreparationOptions`、`SessionPreparation`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts` 和 `packages/core/session/src/index.ts` 理解状态变化，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `SessionPreparationOptions`、`SessionPreparation`；源码顶部原注释（英文，仅作回查线索）：Ownership of one unpublished Session before registry publication. @module @deepseek-ai/dsh-session/preparation。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/repair.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/repair.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：故障修复
- 这个文件有什么用：它处理会话发生中断或不完整时的修复路径，保留不能确定的事实而不把失败伪装成成功。
- 为什么这样设计：修复逻辑和正常写入分开，正常路径不会被大量恢复分支打断；恢复代码还能明确哪些事实可靠、哪些事实只能标记为未知。
- 文件级设计证据：源码顶部注释把它定位为“Crash-recovery repair for an interrupted session log. It preserves a fully written final turn and supplies the missing tool, step, and turn boundaries needed to resume with a provider-valid transcript. @module @deepseek-ai/dsh-session/repair”；固定提交中扫描到的声明包括 `TOOL_NOT_STARTED`、`TOOL_OUTCOME_UNKNOWN`、`interruptedTurnClosers`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/session/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/invariant.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/types.ts`、`packages/llm/llm/src/index.ts` 和 `packages/core/session/src/index.ts`、`packages/core/session/src/invariant.ts` 理解状态变化，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `TOOL_NOT_STARTED`、`TOOL_OUTCOME_UNKNOWN`、`interruptedTurnClosers`；源码顶部原注释（英文，仅作回查线索）：Crash-recovery repair for an interrupted session log. It preserves a fully written final turn and supplies the missing tool, step, and turn boundaries needed to resume with a provider-valid transcript. @module @deepseek-ai/dsh-session/repair。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/request-header.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/request-header.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：请求配置持久化锚点
- 这个文件有什么用：它定义请求配置变化的持久化 header，给每次请求选择和后续恢复提供锚点；它是会话日志解释请求上下文的一部分。
- 为什么这样设计：请求模型、工具或配置发生变化时，恢复逻辑必须知道当时采用了什么选择；把配置变化写成 Session 可识别的 header，能让持久化事实解释请求，而不是依赖当前环境猜测。
- 文件级设计证据：源码顶部注释把它定位为“Request-header reconstruction utilities over full request/header session events. Anyone holding a session log reconstructs the EpochHeader any request was built under by taking the latest canonical snapshot; the loop uses the same equality helper to avoid l...”；固定提交中扫描到的声明包括 `canonicalHeader`、`headerEquals`、`foldRequestHeader`、`sameSchema`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/types.ts`、`packages/llm/llm/src/index.ts` 和 `packages/core/session/src/index.ts` 理解状态变化，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 71 行；扫描到的声明包括 `canonicalHeader`、`headerEquals`、`foldRequestHeader`、`sameSchema`；源码顶部原注释（英文，仅作回查线索）：Request-header reconstruction utilities over full request/header session events. Anyone holding a session log reconstructs the EpochHeader any request was built under by taking the latest canonical snapshot; the loop uses the same equality helper to avoid l...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/surface.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/surface.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：可见表面投影
- 这个文件有什么用：它把会话的原始事件折叠成模型或界面需要看到的有序内容，同时保留事件来源以便重放。
- 为什么这样设计：原始事件保留完整事实，投影单独计算模型或 UI 所需的视图；视图可以重算，日志仍能用于审计和回放。
- 文件级设计证据：源码顶部注释把它定位为“Surface layer on top of the session event log: an ordered view of events that produce LLM messages. The append-only log remains the source of truth. Browser-safe: web clients consume this subpath export, so it must stay free of node: imports (they break the...”；固定提交中扫描到的声明包括 `isSurfaceEligibleType`、`isSurfaceEvent`、`isAppendSurfaceEvent`、`isReplacementSurfaceEvent`、`deriveEventMessage`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：[packages/core/session/tests/surface.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/surface.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/core/session/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/llm/llm/src/index.ts` 和 `packages/client/connection/src/client/fixture.ts`、`packages/client/runtime/src/client/index.ts`、`packages/core/session/src/index.ts` 确认输入输出，最后对照 `packages/core/session/tests/surface.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 460 行；扫描到的声明包括 `isSurfaceEligibleType`、`isSurfaceEvent`、`isAppendSurfaceEvent`、`isReplacementSurfaceEvent`、`deriveEventMessage`、`SurfaceFoldReplacement`、`SurfaceFoldResult`、`SessionSurface`；源码顶部原注释（英文，仅作回查线索）：Surface layer on top of the session event log: an ordered view of events that produce LLM messages. The append-only log remains the source of truth. Browser-safe: web clients consume this subpath export, so it must stay free of node: imports (they break the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述会话中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：固定提交中扫描到的声明包括 `SessionId`、`SESSION_FORMAT_VERSION`、`SessionHeader`、`CreateSessionOptions`、`RestoredSessionOptions`；本地静态 import 图显示它直接依赖 3 个源文件，并被 52 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/json.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[apps/web/tests/goal-command-presentation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-command-presentation.e2e.ts)
- 对应测试：[apps/web/tests/goal-command-presentation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-command-presentation.e2e.ts)、[apps/web/tests/question-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/question-composer.e2e.ts)、[packages/client/runtime/tests/conversation-assembler.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-assembler.client.spec.ts)、[packages/client/runtime/tests/queue-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/queue-store.client.spec.ts)、[packages/client/runtime/tests/session.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/session.client.spec.ts)、[packages/client/runtime/tests/tool-call-tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/tool-call-tree.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)、[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/core/session/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/goal-command-presentation.e2e.ts`、`apps/web/tests/question-composer.e2e.ts`、`packages/api/remotes/src/client/index.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/goal-command-presentation.e2e.ts`、`apps/web/tests/question-composer.e2e.ts`、`packages/client/runtime/tests/conversation-assembler.client.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 440 行；扫描到的声明包括 `SessionId`、`SESSION_FORMAT_VERSION`、`SessionHeader`、`CreateSessionOptions`、`RestoredSessionOptions`、`PrepareSessionOptions`、`AgentCancelCause`、`TurnEndCancelCause`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/chunk-rows.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/chunk-rows.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、分块的具体场景，包括“packChunkRuns”、“packs a text-delta run into one text-chunks row and round-trips it”、“packs reasoning and tool-call runs under their own tags”、“packs a name-less tool-call run and round-trips field absence”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“packChunkRuns”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Chunk-row codec tests: pack/expand round-trip losslessness (example-based and property-based), run-boundary rules, whitelist fall-through, and decoder validation failures.”；固定提交中扫描到的声明包括 `chunkEvent`、`deltaRun`、`decodeAll`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 236 行；扫描到的声明包括 `chunkEvent`、`deltaRun`、`decodeAll`；扫描到的测试主题包括 “packChunkRuns”、“packs a text-delta run into one text-chunks row and round-trips it”、“packs reasoning and tool-call runs under their own tags”、“packs a name-less tool-call run and round-trips field absence”、“leaves runs shorter than three events verbatim”、“leaves non-delta chunks and non-chunk events verbatim between runs”；源码顶部原注释（英文，仅作回查线索）：Chunk-row codec tests: pack/expand round-trip losslessness (example-based and property-based), run-boundary rules, whitelist fall-through, and decoder validation failures.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/derived-cache.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/derived-cache.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“derived-message cache”、“stays deep-equal to a from-scratch replay derivation as the log grows”、“rebuilds on a surface replace and still matches scratch”、“returns a fresh array per call: later appends never grow a held snapshot”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“derived-message cache”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `userText`、`scratch`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `userText`、`scratch`；扫描到的测试主题包括 “derived-message cache”、“stays deep-equal to a from-scratch replay derivation as the log grows”、“rebuilds on a surface replace and still matches scratch”、“returns a fresh array per call: later appends never grow a held snapshot”、“Session.deriveEventMessage — the per-event projection”、“projects one appended event exactly as the full derivation projects its node”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/fork.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“SessionStore.fork”、“forks an empty live session as an empty child with lineage metadata”、“forks the latest completed boundary by default into detached frozen seed events”、“includes stable log-only events appended after a closed turn”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionStore.fork”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`appendClosedTurn`、`appendOpenTurn`、`firstUserMessage`、`lastSeq`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 319 行；扫描到的声明包括 `setup`、`appendClosedTurn`、`appendOpenTurn`、`firstUserMessage`、`lastSeq`、`inherited`；扫描到的测试主题包括 “SessionStore.fork”、“forks an empty live session as an empty child with lineage metadata”、“forks the latest completed boundary by default into detached frozen seed events”、“includes stable log-only events appended after a closed turn”、“forks from an earlier turn boundary even when the source currently has an open tail”、“accepts every turn/end reason as an explicit fork boundary”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/gen-persistence-catalog.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“gen-persistence-catalog collectLogEvents”、“extracts a documented member of the owning top-level interface”、“hard-errors on a top-level interface outside the owning package”、“hard-errors on a non-exported top-level interface even in the owning package”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“gen-persistence-catalog collectLogEvents”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Negative-path tests for the persistence log catalog generator (scripts/gen-persistence-catalog.ts).”；固定提交中扫描到的声明包括 `SessionEventType`、`SurfaceEventType`、`SurfaceOp`、`SessionEvent`、`fixtureRoot`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-persistence-catalog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-persistence-catalog.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 287 行；扫描到的声明包括 `SessionEventType`、`SurfaceEventType`、`SurfaceOp`、`SessionEvent`、`fixtureRoot`；扫描到的测试主题包括 “gen-persistence-catalog collectLogEvents”、“extracts a documented member of the owning top-level interface”、“hard-errors on a top-level interface outside the owning package”、“hard-errors on a non-exported top-level interface even in the owning package”、“hard-errors when the owning interface is exported from two files”、“hard-errors on an extends clause (inherited keys would escape the catalog)”；源码顶部原注释（英文，仅作回查线索）：Negative-path tests for the persistence log catalog generator (scripts/gen-persistence-catalog.ts).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/invariant.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“session-log invariants”、“keeps registration global when the companion is mounted under a scope”、“accepts a well-formed turn, step, and tool sequence”、“does not advance committed trace state when a later dispatch listener vetoes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-log invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/session/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/session/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 433 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “session-log invariants”、“keeps registration global when the companion is mounted under a scope”、“accepts a well-formed turn, step, and tool sequence”、“does not advance committed trace state when a later dispatch listener vetoes”、“applies the committed transition after another postcommit observer throws”、“rejects non-monotonic event sequence numbers”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/json.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“snapshotJsonValue”、“copies the complete JSON scalar vocabulary and rejects unsupported scalars”、“recursively detaches dense arrays and plain or null-prototype objects”、“accepts intrinsic plain containers from another JavaScript realm”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“snapshotJsonValue”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `objectWithForgedIntrinsicPrototype`、`Exotic`、`ExoticObject`、`ExoticArray`、`Box`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 249 行；扫描到的声明包括 `objectWithForgedIntrinsicPrototype`、`Exotic`、`ExoticObject`、`ExoticArray`、`Box`、`List`；扫描到的测试主题包括 “snapshotJsonValue”、“copies the complete JSON scalar vocabulary and rejects unsupported scalars”、“recursively detaches dense arrays and plain or null-prototype objects”、“accepts intrinsic plain containers from another JavaScript realm”、“reads each object value and array slot once while materializing”、“accepts deeply nested valid JSON without using the JavaScript call stack”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/properties.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/properties.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“Session properties”、“deriveMessages is deterministic (same log → identical derivation)”、“seq is strictly monotonic and zero-based contiguous”、“replay-from-seed reproduces the derivation identically”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Session properties”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Property-based tests for the Session event log (the property-testing Agent Note). Generates arbitrary event logs and asserts the derivation invariants the agent loop and replay depend on: deriveMessages is deterministic and replay-from-seed reproduces it; s...”；固定提交中扫描到的声明包括 `build`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的声明包括 `build`；扫描到的测试主题包括 “Session properties”、“deriveMessages is deterministic (same log → identical derivation)”、“seq is strictly monotonic and zero-based contiguous”、“replay-from-seed reproduces the derivation identically”、“replaying a log that already ends in end-seed adds no further marker”、“non-message events never affect derived history (any interleaving)”；源码顶部原注释（英文，仅作回查线索）：Property-based tests for the Session event log (the property-testing Agent Note). Generates arbitrary event logs and asserts the derivation invariants the agent loop and replay depend on: deriveMessages is deterministic and replay-from-seed reproduces it; s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/repair.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/repair.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“interruptedTurnClosers”、“returns nothing for a balanced log (ends on turn/end)”、“returns nothing for an empty log”、“closes an open turn with no open step (turn/end {interrupted} only)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“interruptedTurnClosers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 275 行；扫描到的测试主题包括 “interruptedTurnClosers”、“returns nothing for a balanced log (ends on turn/end)”、“returns nothing for an empty log”、“closes an open turn with no open step (turn/end {interrupted} only)”、“closes an open step before the turn (step/end then turn/end)”、“marks an assistant tool request with no recorded call as not started”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/request-header.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/request-header.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“canonicalHeader”、“normalizes empty optional fields to absence and preserves populated fields”、“headerEquals”、“compares every canonical field and preserves tool order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“canonicalHeader”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Request-header canonicalization, equality, snapshot folding, and format rejection.”；固定提交中扫描到的声明包括 `tool`、`seedWith`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 173 行；扫描到的声明包括 `tool`、`seedWith`；扫描到的测试主题包括 “canonicalHeader”、“normalizes empty optional fields to absence and preserves populated fields”、“headerEquals”、“compares every canonical field and preserves tool order”、“treats absent and empty tool arrays as equivalent canonical absence”、“foldRequestHeader”；源码顶部原注释（英文，仅作回查线索）：Request-header canonicalization, equality, snapshot folding, and format rejection.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/scoped.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/scoped.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“session dispatch carriers”、“a session entered through a scoped context dispatches its events in that scope”、“a bare session dispatches subject-less: scoped listeners never hear it”、“reuses the captured owner carrier for the paired disposal notification”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session dispatch carriers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mount`、`mintScope`、`keyOf`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 198 行；扫描到的声明包括 `mount`、`mintScope`、`keyOf`；扫描到的测试主题包括 “session dispatch carriers”、“a session entered through a scoped context dispatches its events in that scope”、“a bare session dispatches subject-less: scoped listeners never hear it”、“reuses the captured owner carrier for the paired disposal notification”、“sessions.flush()”、“allows an ordinary flush with no listeners”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/session.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“Session”、“exposes one stable readonly surface view”、“derives message history from the event log”、“accepts and round-trips a max-tokens turn/end reason”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Session”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ReplaceOp`、`SeedEvent`、`ExoticHeader`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1730 行；扫描到的声明包括 `ReplaceOp`、`SeedEvent`、`ExoticHeader`；扫描到的测试主题包括 “Session”、“exposes one stable readonly surface view”、“derives message history from the event log”、“accepts and round-trips a max-tokens turn/end reason”、“round-trips an aborted turn with its cancellation cause”、“renders injected-context and user messages as plain user content”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/surface.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/surface.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“foldSurface source-event references”、“accepts absent or valid source-event references and complete replacement coverage”、“rejects source-event references on a non-surface event”、“accepts an explicit empty source-event list on an assistant message”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“foldSurface source-event references”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `surfaceSession`、`provenanceEvent`、`toolResultEvent`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/session/src/surface.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/surface.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/core/session/src/surface.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 966 行；扫描到的声明包括 `surfaceSession`、`provenanceEvent`、`toolResultEvent`；扫描到的测试主题包括 “foldSurface source-event references”、“accepts absent or valid source-event references and complete replacement coverage”、“rejects source-event references on a non-surface event”、“accepts an explicit empty source-event list on an assistant message”、“foldSurface tool-result rewrites”、“rejects a replacement spanning multiple current nodes”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tests/typert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/typert.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“Session Typert provider”、“contributes live Session lookup in either service load order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Session Typert provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/typert/registry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/typert/registry/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的测试主题包括 “Session Typert provider”、“contributes live Session lookup in either service load order”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/session/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tsdown.config.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理会话：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/session/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/core/session/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把提示词相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Registry for ordered system sections, dynamic context, tool schemas, and prompt variables. @module @deepseek-ai/dsh-system-prompt”；固定提交中扫描到的声明包括 `AssembleContext`、`PromptSection`、`PromptContext`、`AssembledSection`、`AssembledContext`；本地静态 import 图显示它直接依赖 4 个源文件，并被 138 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/system-prompt/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)
- 对应测试：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/boot/app-boot/tests/app-boot.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/app-boot.spec.ts)、[packages/bundle/web-app/tests/web-app.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/web-app/tests/web-app.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)
- 阅读顺序：先读 `packages/core/system-prompt/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/web/tests/minimal-preset.snapshot.ts`、`apps/web/tests/shipped-composition.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/web/tests/minimal-preset.snapshot.ts`、`apps/web/tests/shipped-composition.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 545 行；扫描到的声明包括 `AssembleContext`、`PromptSection`、`PromptContext`、`AssembledSection`、`AssembledContext`、`ToolProviderResult`、`PromptAssembly`、`PERSONA_SECTION`；源码顶部原注释（英文，仅作回查线索）：Registry for ordered system sections, dynamic context, tool schemas, and prompt variables. @module @deepseek-ai/dsh-system-prompt。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/system-prompt/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查提示词必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned prompt-assembly invariants. @module @deepseek-ai/dsh-system-prompt/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`validateAssembly`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/system-prompt/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/core/system-prompt/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/tests/invariant.spec.ts)
- 对应测试：[packages/core/system-prompt/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/system-prompt/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/core/system-prompt/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/core/system-prompt/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateAssembly`；源码顶部原注释（英文，仅作回查线索）：Package-owned prompt-assembly invariants. @module @deepseek-ai/dsh-system-prompt/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/system-prompt/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/tests/invariant.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查提示词的具体场景，包括“system-prompt invariants”、“accepts a well-formed authoritative assembly”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“system-prompt invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`assemble`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/system-prompt/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/system-prompt/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/system-prompt/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `setup`、`assemble`；扫描到的测试主题包括 “system-prompt invariants”、“accepts a well-formed authoritative assembly”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/system-prompt/tests/scoped.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/tests/scoped.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查提示词的具体场景，包括“scoped sections”、“a scoped persona shadows deployment:persona for that scope only (either order)”、“scoped-only sections join that scope alone; disposal removes them”、“duplicate names throw per layer, naming agent.ctx for the global case”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“scoped sections”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mount`、`mintScope`、`scopeKeyOf`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/system-prompt/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 226 行；扫描到的声明包括 `mount`、`mintScope`、`scopeKeyOf`；扫描到的测试主题包括 “scoped sections”、“a scoped persona shadows deployment:persona for that scope only (either order)”、“scoped-only sections join that scope alone; disposal removes them”、“duplicate names throw per layer, naming agent.ctx for the global case”、“shadows a global section before evaluating either text provider”、“scoped variables”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/system-prompt/tests/system-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/tests/system-prompt.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查提示词的具体场景，包括“SystemPrompt”、“built-in sections”、“registers the harness identity and the configured deployment persona”、“renders no persona section for a persona-less deployment (empty default)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SystemPrompt”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `contributed`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/system-prompt/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 582 行；扫描到的声明包括 `contributed`；扫描到的测试主题包括 “SystemPrompt”、“built-in sections”、“registers the harness identity and the configured deployment persona”、“renders no persona section for a persona-less deployment (empty default)”、“can omit the harness identity for a deployment that owns the complete persona”、“can suppress runtime context without evaluating providers or accepting waterfall additions”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/system-prompt/tests/tool-order.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/tests/tool-order.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查提示词、工具的具体场景，包括“SystemPrompt tool order”、“exports the rest entry as”、“assembles tools in lexicographic name order when no toolOrder is configured”、“assembles the same order regardless of provider registration order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SystemPrompt tool order”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `tool`、`mount`、`names`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/system-prompt/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `tool`、`mount`、`names`；扫描到的测试主题包括 “SystemPrompt tool order”、“exports the rest entry as”、“assembles tools in lexicographic name order when no toolOrder is configured”、“assembles the same order regardless of provider registration order”、“applies a configured toolOrder: listed positions, rest at the rest entry lexicographically”、“rejects the assembly when toolOrder names a tool that is not registered (misconfiguration blocks work)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/code-mode.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/code-mode.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Code Mode run_code transport. Programs call the registry's agent-visible tools through nested executions scheduled under the native concurrency contract; each sub-dispatch is logged for reconstruction, while only the outer curated result enters model histor...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Code Mode run_code transport. Programs call the registry's agent-visible tools through nested executions scheduled under the native concurrency contract; each sub-dispatch is logged for reconstruction, while only the outer curated result enters model histor...”；固定提交中扫描到的声明包括 `RUN_CODE_NAME`、`SDK_SECTION_ORDER`、`CodeSdkLanguage`、`CodeRunFailedError`、`RunCodeBridgeOptions`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/code-runtime/code-runtime/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/tools/README.md` 和入口，再读当前实现，沿着 `packages/code-runtime/code-runtime/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts` 和 `packages/core/tools/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 681 行；扫描到的声明包括 `RUN_CODE_NAME`、`SDK_SECTION_ORDER`、`CodeSdkLanguage`、`CodeRunFailedError`、`RunCodeBridgeOptions`、`createRunCodeTool`、`resolveFlavor`、`jsonNormalizeArgs`；源码顶部原注释（英文，仅作回查线索）：Code Mode run_code transport. Programs call the registry's agent-visible tools through nested executions scheduled under the native concurrency contract; each sub-dispatch is logged for reconstruction, while only the outer curated result enters model histor...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Tool registry, model presentation modes, and pre/guard/around/post/result execution pipeline. @module @deepseek-ai/dsh-tools”；固定提交中扫描到的声明包括 `ToolOutputDefinition`、`ToolDefinition`、`ToolResult`、`ToolExecutionToken`、`ToolExecutionInput`；本地静态 import 图显示它直接依赖 17 个源文件，并被 191 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/code-runtime/code-runtime/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[apps/cli/tests/fixtures/dsh-badge/snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/fixtures/dsh-badge/snapshot.ts)
- 对应测试：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/acp/acp/tests/edges.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/edges.spec.ts)、[packages/client/ui-user-questions/tests/node-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/node-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先读 `packages/core/tools/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/fixtures/dsh-badge/snapshot.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/shipped-composition.e2e.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1946 行；扫描到的声明包括 `ToolOutputDefinition`、`ToolDefinition`、`ToolResult`、`ToolExecutionToken`、`ToolExecutionInput`、`ToolExecutionMode`、`CodeDispatchLog`、`ToolExecution`；源码顶部原注释（英文，仅作回查线索）：Tool registry, model presentation modes, and pre/guard/around/post/result execution pipeline. @module @deepseek-ai/dsh-tools。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/invariant.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned tool-pipeline invariants. @module @deepseek-ai/dsh-tools/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`validateResult`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/core/tools/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/invariant.spec.ts)
- 对应测试：[packages/core/tools/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts` 和 `packages/core/tools/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/core/tools/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateResult`；源码顶部原注释（英文，仅作回查线索）：Package-owned tool-pipeline invariants. @module @deepseek-ai/dsh-tools/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/json-schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/json-schema.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：JSON Schema 子集验证器
- 这个文件有什么用：它验证 DSH 支持的 JSON Schema 子集、关键字组合和 object-root 约束；工具参数在执行前先通过这道边界，运行时就不必各自解释一套不完整的 schema。
- 为什么这样设计：工具参数的 schema 需要在执行前统一判断支持范围和 object-root 约束；把不完整或不安全的形状挡在边界处，工具实现就不用各自维护一套互不兼容的验证规则。
- 文件级设计证据：源码顶部注释把它定位为“Enforced JSON Schema subset shared by tool outputs, generated Code Mode types, subagents, and workflows. The subset accepts any JSON root, an annotation-only schema for unconstrained JSON, one scalar type, object properties/required/boolean additionalProper...”；固定提交中扫描到的声明包括 `JsonSchemaScalar`、`JsonSchemaType`、`JsonSchemaNode`、`ObjectJsonSchema`、`JsonSchemaError`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/py-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/py-types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/tools/README.md`，再读本配置/脚本，沿着 `packages/core/tools/src/index.ts`、`packages/core/tools/src/py-types.ts`、`packages/core/tools/src/schema.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 656 行；扫描到的声明包括 `JsonSchemaScalar`、`JsonSchemaType`、`JsonSchemaNode`、`ObjectJsonSchema`、`JsonSchemaError`、`isPlainJsonRecord`、`isJsonSchemaRecord`、`isPlainJsonArray`；源码顶部原注释（英文，仅作回查线索）：Enforced JSON Schema subset shared by tool outputs, generated Code Mode types, subagents, and workflows. The subset accepts any JSON root, an annotation-only schema for unconstrained JSON, one scalar type, object properties/required/boolean additionalProper...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/presentation.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：工具呈现契约
- 这个文件有什么用：它定义工具调用和工具结果怎样呈现，包括文件位置、差异、终端、搜索和 Web 结果等类型；它描述可见结果，不负责真正执行工具。
- 为什么这样设计：工具给模型的结果和给人的界面卡片不是同一种表示；定义 provider-neutral 的呈现意图，CLI、Web 和其他宿主可以各自渲染，而执行层不依赖某个 UI。
- 文件级设计证据：源码顶部注释把它定位为“Tool render-intent vocabulary: the provider-neutral types a tool declares via ToolDefinition.presentCall/ToolDefinition.presentResult to say how one of its calls renders in a UI (an editor's tool-call card, a CLI log line). @module @deepseek-ai/dsh-tools/sr...”；固定提交中扫描到的声明包括 `ToolCallKind`、`FileLocation`、`FileDiff`、`ToolCallView`、`GenericCallView`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/connection/src/client/api.ts`、`packages/core/tools/src/index.ts`、`packages/core/tools/src/schema.ts` 确认状态如何进入 UI，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 389 行；扫描到的声明包括 `ToolCallKind`、`FileLocation`、`FileDiff`、`ToolCallView`、`GenericCallView`、`TerminalCallView`、`DiffCallView`、`ReadFileLine`；源码顶部原注释（英文，仅作回查线索）：Tool render-intent vocabulary: the provider-neutral types a tool declares via ToolDefinition.presentCall/ToolDefinition.presentResult to say how one of its calls renders in a UI (an editor's tool-call card, a CLI log line). @module @deepseek-ai/dsh-tools/sr...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/py-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/py-types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工具中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Code Mode codegen — Python flavor. The pure projection from registered tool schemas to the Python SDK text the model programs against under runtime.language === 'python'. Sibling of ./ts-types.ts | ts-types.ts; the two files are two projections of the same ...”；固定提交中扫描到的声明包括 `jsonSchemaToPy`、`renderToolsSdkPy`、`isBareIdentifier`、`pad`、`describe`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/json-schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/json-schema.ts)、[packages/core/tools/src/ts-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/ts-types.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/tests/py-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/py-types.spec.ts)
- 对应测试：[packages/core/tools/tests/py-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/py-types.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/core/tools/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/tools/src/index.ts`、`packages/core/tools/tests/py-types.spec.ts` 看它怎样约束运行时，最后对照 `packages/core/tools/tests/py-types.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 818 行；扫描到的声明包括 `jsonSchemaToPy`、`renderToolsSdkPy`、`isBareIdentifier`、`pad`、`describe`、`docLines`、`camelCase`、`capClassNameBase`；源码顶部原注释（英文，仅作回查线索）：Code Mode codegen — Python flavor. The pure projection from registered tool schemas to the Python SDK text the model programs against under runtime.language === 'python'. Sibling of ./ts-types.ts | ts-types.ts; the two files are two projections of the same ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/schema.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义工具、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Unified JSON-value schema DSL, inference, compilation, and typed tool helper. @module dsh-tools/schema”；固定提交中扫描到的声明包括 `ValueSchemaAnnotations`、`StringValueSchemaSpec`、`NumberValueSchemaSpec`、`IntegerValueSchemaSpec`、`BooleanValueSchemaSpec`；本地静态 import 图显示它直接依赖 5 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/json-schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/json-schema.ts)、[packages/core/tools/src/code-mode.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/code-mode.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/tools/README.md`，再读本配置/脚本，沿着 `packages/core/tools/src/code-mode.ts`、`packages/core/tools/src/index.ts`、`packages/core/tools/src/testing.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 617 行；扫描到的声明包括 `ValueSchemaAnnotations`、`StringValueSchemaSpec`、`NumberValueSchemaSpec`、`IntegerValueSchemaSpec`、`BooleanValueSchemaSpec`、`NullValueSchemaSpec`、`ArrayValueSchemaSpec`、`ObjectValueSchemaSpec`；源码顶部原注释（英文，仅作回查线索）：Unified JSON-value schema DSL, inference, compilation, and typed tool helper. @module dsh-tools/schema。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/testing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/testing.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：工具测试夹具工厂
- 这个文件有什么用：它提供 canonical tool-definition 测试夹具工厂，让各个工具测试使用一致的定义和参数材料；这些对象服务于测试，不是默认产品工具。
- 为什么这样设计：工具测试需要稳定的定义、参数 schema 和结果材料，但这些材料不应注册成生产工具；独立的 canonical fixture 工厂复用测试输入，又保持产品组合与测试准备分离。
- 文件级设计证据：源码顶部注释把它定位为“Canonical tool-definition fixtures for repository tests. @module dsh-tools/testing”；固定提交中扫描到的声明包括 `ContentToolFixtureOptions`、`defineContentToolFixture`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/tools/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/core/tools/src/schema.ts` 和 `packages/core/tools/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `ContentToolFixtureOptions`、`defineContentToolFixture`；源码顶部原注释（英文，仅作回查线索）：Canonical tool-definition fixtures for repository tests. @module dsh-tools/testing。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/ts-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/ts-types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工具中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Code Mode codegen: the pure projection from registered tool schemas to the TypeScript SDK text the model programs against (the tools:sdk prompt section). Sibling of json-schema.ts — schemas() (native function calling) and this module (the generated declare ...”；固定提交中扫描到的声明包括 `ToolSdkSchema`、`jsonSchemaToTs`、`renderToolsSdk`、`renderKey`、`pad`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/json-schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/json-schema.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/py-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/py-types.ts)
- 对应测试：[packages/core/tools/tests/py-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/py-types.spec.ts)、[packages/core/tools/tests/ts-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/ts-types.spec.ts)、[packages/terminal/tool-terminal/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/core/tools/README.md`、入口和消费者，再读当前契约，沿着 `packages/core/tools/src/index.ts`、`packages/core/tools/src/py-types.ts`、`packages/core/tools/tests/py-types.spec.ts` 看它怎样约束运行时，最后对照 `packages/core/tools/tests/py-types.spec.ts`、`packages/core/tools/tests/ts-types.spec.ts`、`packages/terminal/tool-terminal/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 293 行；扫描到的声明包括 `ToolSdkSchema`、`jsonSchemaToTs`、`renderToolsSdk`、`renderKey`、`pad`、`docLines`、`renderScalar`、`renderConstrainedScalar`；源码顶部原注释（英文，仅作回查线索）：Code Mode codegen: the pure projection from registered tool schemas to the TypeScript SDK text the model programs against (the tools:sdk prompt section). Sibling of json-schema.ts — schemas() (native function calling) and this module (the generated declare ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/types.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工具中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Durable Tool event vocabulary shared with type-only consumers. @module @deepseek-ai/dsh-tools/types”；固定提交中扫描到的声明包括 `CodeDispatchStartEventData`、`CodeDispatchEventData`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/runtime/src/client/sessions/tool-call-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/tool-call-tree.ts)、[packages/client/ui-conversation/src/client/conversation-nodes/tool.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/conversation-nodes/tool.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/shipped-composition.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/core/tools/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/src/client/sessions/tool-call-tree.ts`、`packages/client/ui-conversation/src/client/conversation-nodes/tool.ts`、`packages/client/ui-trajectory/src/client/trajectory-tool-definition.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `CodeDispatchStartEventData`、`CodeDispatchEventData`；源码顶部原注释（英文，仅作回查线索）：Durable Tool event vocabulary shared with type-only consumers. @module @deepseek-ai/dsh-tools/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/code-mode.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/code-mode.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“mode-aware wire contribution”、“mode”、“projects deeply nested output schemas into the Code Mode SDK without structured-clone r...”、“never exposes run_code to programs, even under mode”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mode-aware wire contribution”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `FakeRuntime`、`setup`、`mintAgentScope`、`registerEcho`、`fakeAgent`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/code-runtime/code-runtime/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/code-runtime/code-runtime/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1864 行；扫描到的声明包括 `FakeRuntime`、`setup`、`mintAgentScope`、`registerEcho`、`fakeAgent`、`runCode`、`registerGated`；扫描到的测试主题包括 “mode-aware wire contribution”、“mode”、“projects deeply nested output schemas into the Code Mode SDK without structured-clone recursion”、“never exposes run_code to programs, even under mode”、“renders byte-identical SDK text across consecutive assemblies of an unchanged tool set”、“rejects every assembly when a non-native mode has no code runtime”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/execution-mode.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/execution-mode.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“ToolRuntime.executionMode”、“returns parallel only for an explicit true classifier”、“defaults to exclusive for a tool with no isConcurrencySafe declaration”、“returns exclusive for an unknown tool”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ToolRuntime.executionMode”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Covers fail-closed per-call classification and model-schema isolation.”；固定提交中扫描到的声明包括 `setup`、`exec`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 141 行；扫描到的声明包括 `setup`、`exec`；扫描到的测试主题包括 “ToolRuntime.executionMode”、“returns parallel only for an explicit true classifier”、“defaults to exclusive for a tool with no isConcurrencySafe declaration”、“returns exclusive for an unknown tool”、“returns exclusive when the classifier returns false for these args”、“classifies invalid defineContentToolFixture arguments as exclusive without throwing”；源码顶部原注释（英文，仅作回查线索）：Covers fail-closed per-call classification and model-schema isolation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/execution-signal-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/execution-signal-types.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“tool execution signal types”、“requires an exact AbortSignal at every readonly tool view”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool execution signal types”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `inputAndExecutionContracts`、`observerContracts`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `inputAndExecutionContracts`、`observerContracts`；扫描到的测试主题包括 “tool execution signal types”、“requires an exact AbortSignal at every readonly tool view”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“gen-tool-catalog collectToolCatalog”、“boots every shipped tool package and harvests its model-facing schemas”、“resolves a runtime-spread enum to its literal members (the payoff over AST)”、“attributes each harvested tool with its registering plugin source”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“gen-tool-catalog collectToolCatalog”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Guarantee tests for the tool-schema catalog generator (scripts/gen-tool-catalog.ts).”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[scripts/gen-tool-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-tool-catalog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-tool-catalog.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 151 行；扫描到的测试主题包括 “gen-tool-catalog collectToolCatalog”、“boots every shipped tool package and harvests its model-facing schemas”、“resolves a runtime-spread enum to its literal members (the payoff over AST)”、“attributes each harvested tool with its registering plugin source”、“harvests search tools without depending on the generator process PATH”、“records the shipped”；源码顶部原注释（英文，仅作回查线索）：Guarantee tests for the tool-schema catalog generator (scripts/gen-tool-catalog.ts).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/invariant.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“tool-pipeline invariants”、“accepts dispatch and denial stage orders with frozen results”、“rejects repeated and out-of-order pipeline stages”、“rejects mutable or anonymous final snapshots”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-pipeline invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`emitResult`、`stage`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 239 行；扫描到的声明包括 `setup`、`emitResult`、`stage`；扫描到的测试主题包括 “tool-pipeline invariants”、“accepts dispatch and denial stage orders with frozen results”、“rejects repeated and out-of-order pipeline stages”、“rejects mutable or anonymous final snapshots”、“requires code-dispatch records to be turn-enclosed”、“does not commit a rejected dispatch edge into the root index”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/json-schema.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/json-schema.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具、数据 schema的具体场景，包括“the enforced raw JSON Schema subset”、“accepts every JSON root and every supported node”、“retains an object-root guard only at consumers that need it”、“rejects non-schema nodes, unknown types, and type arrays”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the enforced raw JSON Schema subset”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `asserted`、`assertedObject`、`violationsOf`、`recordWithForgedIntrinsicPrototype`、`ExoticBranches`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 455 行；扫描到的声明包括 `asserted`、`assertedObject`、`violationsOf`、`recordWithForgedIntrinsicPrototype`、`ExoticBranches`；扫描到的测试主题包括 “the enforced raw JSON Schema subset”、“accepts every JSON root and every supported node”、“retains an object-root guard only at consumers that need it”、“rejects non-schema nodes, unknown types, and type arrays”、“enforces oneOf vocabulary and its minimum branch count”、“rejects unknown and misplaced keywords without accepted-then-ignored behavior”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/properties.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/properties.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“schema DSL properties”、“JSON Schema”、“conversion is total (never throws) for any spec”、“validateArgs is total (never throws) for any spec and any input”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“schema DSL properties”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Property-based tests for the tool-schema DSL (the property-testing Agent Note), including the property-testing ↔ runtime-validation composition: generated args that satisfy a ParameterSchemaSpec must pass validateArgs, and targeted corruptions must be rejec...”；固定提交中扫描到的声明包括 `asValueSchema`、`leafPropArb`、`propArb`、`specArb`、`valueForProp`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 175 行；扫描到的声明包括 `asValueSchema`、`leafPropArb`、`propArb`、`specArb`、`valueForProp`、`validArgsForSpec`、`requiredKeys`；扫描到的测试主题包括 “schema DSL properties”、“JSON Schema”、“conversion is total (never throws) for any spec”、“validateArgs is total (never throws) for any spec and any input”、“the property-testing ↔ runtime-validation composition: args satisfying the spec pass validateArgs”、“the property-testing ↔ runtime-validation composition: dropping a required key is always rejected”；源码顶部原注释（英文，仅作回查线索）：Property-based tests for the tool-schema DSL (the property-testing Agent Note), including the property-testing ↔ runtime-validation composition: generated args that satisfy a ParameterSchemaSpec must pass validateArgs, and targeted corruptions must be rejec...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/py-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/py-types.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“jsonSchemaToPy”、“maps the defineTool DSL subset”、“is total: unsupported or hostile constructs degrade to Any, never throw”、“leans on JSON.stringify to keep a Literal parseable”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“jsonSchemaToPy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/py-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/py-types.ts)、[packages/core/tools/src/ts-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/ts-types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/tools/src/index.ts`、`packages/core/tools/src/py-types.ts`、`packages/core/tools/src/ts-types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1172 行；扫描到的测试主题包括 “jsonSchemaToPy”、“maps the defineTool DSL subset”、“is total: unsupported or hostile constructs degrade to Any, never throw”、“leans on JSON.stringify to keep a Literal parseable”、“passes NEL and the line/paragraph separators through raw, which CPython does not treat as line terminators”、“emits exact digits for a beyond-safe-range integer literal”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/schema.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/schema.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具、数据 schema的具体场景，包括“the unified author schema DSL”、“compiles every value root and the author-only json node”、“keeps the implicit parameter root open while preserving explicit object openness”、“rejects runtime-forged author forms rather than compiling them lossily”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the unified author schema DSL”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 205 行；扫描到的测试主题包括 “the unified author schema DSL”、“compiles every value root and the author-only json node”、“keeps the implicit parameter root open while preserving explicit object openness”、“rejects runtime-forged author forms rather than compiling them lossily”、“rejects cyclic author schemas”、“compiles deeply nested author unions without using the JavaScript call stack”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/scoped.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/scoped.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“scoped tool registration”、“keeps final-result observers synchronous”、“files a scoped tool in its layer: visible/executable for that scope only”、“scoped shadows global on a name conflict, in either registration order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“scoped tool registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mount`、`mintAgentScope`、`tool`、`run`、`mintChild`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 719 行；扫描到的声明包括 `mount`、`mintAgentScope`、`tool`、`run`、`mintChild`；扫描到的测试主题包括 “scoped tool registration”、“keeps final-result observers synchronous”、“files a scoped tool in its layer: visible/executable for that scope only”、“scoped shadows global on a name conflict, in either registration order”、“rejects a duplicate name within one layer, naming agent.ctx for the global case”、“disposing the scope unwinds its registrations and leaves no residue”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/tools.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“ToolRuntime”、“registers tools, exposes schemas, and feeds the system-prompt assembly”、“schemas() drops host callbacks — they must never reach the model”、“schemas() excludes timeoutMs — the budget must never reach the model”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ToolRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`fakeAgent`、`approvalSetup`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 2785 行；扫描到的声明包括 `setup`、`fakeAgent`、`approvalSetup`；扫描到的测试主题包括 “ToolRuntime”、“registers tools, exposes schemas, and feeds the system-prompt assembly”、“schemas() drops host callbacks — they must never reach the model”、“schemas() excludes timeoutMs — the budget must never reach the model”、“executes a tool and returns its content”、“projects presentation metadata from the canonical value”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/core/tools/tests/ts-types.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/ts-types.spec.ts)

- 所属层：packages/core：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“jsonSchemaToTs”、“maps every unified schema construct”、“renders objects with required/optional keys, nested shapes, and per-property docs”、“is total: unsupported or hostile constructs degrade to unknown, never throw”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“jsonSchemaToTs”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/core/tools/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/core/tools/src/ts-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/ts-types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/tools/src/index.ts`、`packages/core/tools/src/ts-types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的测试主题包括 “jsonSchemaToTs”、“maps every unified schema construct”、“renders objects with required/optional keys, nested shapes, and per-property docs”、“is total: unsupported or hostile constructs degrade to unknown, never throw”、“escapes a comment-closer inside a description so the generated JSDoc cannot end early”、“renders deeply nested unions without using the JavaScript call stack”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
