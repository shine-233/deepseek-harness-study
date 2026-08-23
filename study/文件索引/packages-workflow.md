# 源文件索引：packages/workflow

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 34 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/workflow/tool-ralph/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/src/index.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工作流、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Model-facing foreground Ralph loop over the workflow and subagent seams. A fixed script starts one fresh structured-output child per round, carrying only the immutable objective and the previous bounded handoff between them. @module @deepseek-ai/dsh-tool-ralph”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`normalizedText`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-ralph/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)
- 对应测试：[packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)、[packages/workflow/tool-ralph/tests/tool-ralph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/tool-ralph.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/workflow/tool-ralph/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/tool-ralph/tests/integration.spec.ts`、`packages/workflow/tool-ralph/tests/tool-ralph.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/workflow/tool-ralph/tests/integration.spec.ts`、`packages/workflow/tool-ralph/tests/tool-ralph.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 479 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`normalizedText`、`normalizedList`、`validateReport`、`resolveConfig`；源码顶部原注释（英文，仅作回查线索）：Model-facing foreground Ralph loop over the workflow and subagent seams. A fixed script starts one fresh structured-output child per round, carrying only the immutable objective and the previous bounded handoff between them. @module @deepseek-ai/dsh-tool-ralph。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-ralph/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/src/invariant.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工作流、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tool-ralph. @module @deepseek-ai/dsh-tool-ralph/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-ralph/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-ralph. @module @deepseek-ai/dsh-tool-ralph/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工具的具体场景，包括“dsh-tool-ralph over the real spawn and worker-thread stack”、“uses distinct empty-seed children, shared cwd, and only the prior bounded handoff”、“reports the failed round and last good handoff when a child fails”、“cancels the real worker and fresh child to quiescence”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-ralph over the real spawn and worker-thread stack”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mountRalph`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-ralph/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 271 行；扫描到的声明包括 `mountRalph`；扫描到的测试主题包括 “dsh-tool-ralph over the real spawn and worker-thread stack”、“uses distinct empty-seed children, shared cwd, and only the prior bounded handoff”、“reports the failed round and last good handoff when a child fails”、“cancels the real worker and fresh child to quiescence”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-ralph/tests/tool-ralph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/tool-ralph.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工具的具体场景，包括“dsh-tool-ralph”、“starts the fixed workflow through the configured fresh provider and renders completion”、“renders blocked and budget-limited terminal outcomes as bounded successful results”、“bounds the complete parent result and labels worker-reported completion”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-ralph”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StubEngine`、`StubProvider`、`setup`、`execute`、`settleCompleted`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-ralph/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 405 行；扫描到的声明包括 `StubEngine`、`StubProvider`、`setup`、`execute`、`settleCompleted`；扫描到的测试主题包括 “dsh-tool-ralph”、“starts the fixed workflow through the configured fresh provider and renders completion”、“renders blocked and budget-limited terminal outcomes as bounded successful results”、“bounds the complete parent result and labels worker-reported completion”、“honors a result limit shorter than the truncation marker”、“reports an ordinary child failure with the failed round and last durable handoff”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/index.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工作流、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“The model-facing workflow tool: run a JavaScript orchestration script that fans out subagents, and return the script's final value. It owns the model-facing schema and run lifecycle; script parsing, execution, caps, and cancellation live behind ctx.workflow...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`renderRecordingError`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)
- 对应测试：[packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/tool-workflow/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/tool-workflow/tests/tool-workflow.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/workflow/tool-workflow/tests/tool-workflow.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 335 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`renderRecordingError`、`createWorkflowRecorder`、`presentWorkflowCall`、`presentWorkflowResult`；源码顶部原注释（英文，仅作回查线索）：The model-facing workflow tool: run a JavaScript orchestration script that fans out subagents, and return the script's final value. It owns the model-facing schema and run lifecycle; script parsing, execution, caps, and cancellation live behind ctx.workflow...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-workflow/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/invariant.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工作流、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned durable workflow-record invariants. @module @deepseek-ai/dsh-tool-workflow/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`isWorkflowRecordEvent`、`stringId`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/workflow/tool-workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/types.ts)、[packages/workflow/tool-workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/invariant.spec.ts)
- 对应测试：[packages/workflow/tool-workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`packages/workflow/tool-workflow/src/types.ts` 和 `packages/workflow/tool-workflow/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/workflow/tool-workflow/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 167 行；扫描到的声明包括 `name`、`inject`、`apply`、`isWorkflowRecordEvent`、`stringId`、`memberSeq`、`recordOf`、`cloneTraceForEvent`；源码顶部原注释（英文，仅作回查线索）：Package-owned durable workflow-record invariants. @module @deepseek-ai/dsh-tool-workflow/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/types.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工作流、工具中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Browser-safe durable workflow-record events written by the model-facing workflow tool into its calling parent Session. @module @deepseek-ai/dsh-tool-workflow/types”；固定提交中扫描到的声明包括 `ToolWorkflowRunStartData`、`ToolWorkflowAgentStartData`、`ToolWorkflowAgentEndData`、`ToolWorkflowRunEndData`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/workflow/workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/types.ts)、[packages/client/ui-workflow-run/src/client/workflow-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/workflow-definition.ts)、[packages/workflow/tool-workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/index.ts)
- 对应测试：[packages/workflow/tool-workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/tool-workflow/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-workflow-run/src/client/workflow-definition.ts`、`packages/workflow/tool-workflow/src/index.ts`、`packages/workflow/tool-workflow/src/invariant.ts` 看它怎样约束运行时，最后对照 `packages/workflow/tool-workflow/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `ToolWorkflowRunStartData`、`ToolWorkflowAgentStartData`、`ToolWorkflowAgentEndData`、`ToolWorkflowRunEndData`；源码顶部原注释（英文，仅作回查线索）：Browser-safe durable workflow-record events written by the model-facing workflow tool into its calling parent Session. @module @deepseek-ai/dsh-tool-workflow/types。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/invariant.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工具的具体场景，包括“durable workflow-record invariants”、“accepts interleaved complete runs and an unfinished continuous prefix”、“rejects a malformed candidate before commit and keeps the fold reusable”、“validates existing cold history while allowing an unfinished prefix”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“durable workflow-record invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/workflow/tool-workflow/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`packages/workflow/tool-workflow/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 199 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “durable workflow-record invariants”、“accepts interleaved complete runs and an unfinished continuous prefix”、“rejects a malformed candidate before commit and keeps the fold reusable”、“validates existing cold history while allowing an unfinished prefix”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工具的具体场景，包括“dsh-tool-workflow”、“starts a run with the script/args/parent/signal and renders the completed value”、“records one top-level run and its members in the calling Session after cleanup”、“writes run-end only after run disposal reaches quiescence”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-workflow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StubEngine`、`setup`、`execute`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/tool-workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 447 行；扫描到的声明包括 `StubEngine`、`setup`、`execute`；扫描到的测试主题包括 “dsh-tool-workflow”、“starts a run with the script/args/parent/signal and renders the completed value”、“records one top-level run and its members in the calling Session after cleanup”、“writes run-end only after run disposal reaches quiescence”、“records zero-member and concurrent runs independently”、“does not record nested transport executions”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/host.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：工作流执行实现
- 这个文件有什么用：这个文件实现工作流 worker 的宿主、协议、realm 或运行时状态，隔离工作流执行和主进程。
- 为什么这样设计：worker、realm 和协议隔离工作流资源与主进程，取消或崩溃不会直接破坏宿主的插件树。
- 文件级设计证据：源码顶部注释把它定位为“Host side of one workflow run. The first worker result, unexpected death, or cancellation-grace expiry owns settlement and closes message admission. Pending starts share one abort signal; published children share idempotent cleanup, and quiescence waits for...”；固定提交中扫描到的声明包括 `workerSpawnEnv`、`WorkerRun`、`resolveWorkerSpawn`、`sleep`；本地静态 import 图显示它直接依赖 10 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/workflow/workflow-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/index.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/workflow/workflow-worker-thread/src/index.ts`、`packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts` 确认输入输出，最后对照 `packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 622 行；扫描到的声明包括 `workerSpawnEnv`、`WorkerRun`、`resolveWorkerSpawn`、`sleep`；源码顶部原注释（英文，仅作回查线索）：Host side of one workflow run. The first worker result, unexpected death, or cancellation-grace expiry owns settlement and closes message admission. Pending starts share one abort signal; published children share idempotent cleanup, and quiescence waits for...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/index.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工作流、工作线程相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Worker-thread workflow engine. Each run executes its model-written script in an escapable vm context on a fresh worker and bridges agent() calls to host subagents. The thread prevents synchronous script work from blocking the host and permits forced termina...”；固定提交中扫描到的声明包括 `Config`、`assertBodyParses`、`resolveSubagentProvider`、`resolveMaxTotalAgents`、`WorkerThreadWorkflowEngine`；本地静态 import 图显示它直接依赖 7 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/host.ts)、[packages/workflow/workflow-worker-thread/src/meta.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/meta.ts)、[packages/workflow/workflow-worker-thread/src/realm.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/realm.ts)、[packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)
- 对应测试：[packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)、[packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)、[packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts)、[packages/workflow/workflow-worker-thread/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/integration.spec.ts)、[packages/workflow/workflow-worker-thread/tests/source-worker.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/source-worker.compat.spec.ts)、[packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/tool-ralph/tests/integration.spec.ts`、`packages/workflow/tool-workflow/tests/tool-workflow.spec.ts`、`packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts` 看它怎样约束运行时，最后对照 `packages/workflow/tool-ralph/tests/integration.spec.ts`、`packages/workflow/tool-workflow/tests/tool-workflow.spec.ts`、`packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 205 行；扫描到的声明包括 `Config`、`assertBodyParses`、`resolveSubagentProvider`、`resolveMaxTotalAgents`、`WorkerThreadWorkflowEngine`；源码顶部原注释（英文，仅作回查线索）：Worker-thread workflow engine. Each run executes its model-written script in an escapable vm context on a fresh worker and bridges agent() calls to host subagents. The thread prevents synchronous script work from blocking the host and permits forced termina...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/invariant.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工作流、工作线程必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-workflow-worker-thread. @module @deepseek-ai/dsh-workflow-worker-thread/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-workflow-worker-thread. @module @deepseek-ai/dsh-workflow-worker-thread/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/meta.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/meta.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：工作流执行实现
- 这个文件有什么用：这个文件实现工作流 worker 的宿主、协议、realm 或运行时状态，隔离工作流执行和主进程。
- 为什么这样设计：worker、realm 和协议隔离工作流资源与主进程，取消或崩溃不会直接破坏宿主的插件树。
- 文件级设计证据：源码顶部注释把它定位为“Meta validation checks caller-provided DATA against the WorkflowMeta contract and rejects every violation by name. Meta arrives as schema-checked JSON data, never evaluated script text; evaluating it on the host could run getters outside the worker timeout ...”；固定提交中扫描到的声明包括 `validateMeta`、`validateMetaShape`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)、[packages/workflow/workflow-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/index.ts)、[packages/workflow/workflow-worker-thread/tests/meta.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/meta.spec.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/meta.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/meta.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md` 和入口，再读当前实现，沿着 `packages/workflow/workflow/src/index.ts` 和 `packages/workflow/workflow-worker-thread/src/index.ts`、`packages/workflow/workflow-worker-thread/tests/meta.spec.ts` 确认输入输出，最后对照 `packages/workflow/workflow-worker-thread/tests/meta.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `validateMeta`、`validateMetaShape`；源码顶部原注释（英文，仅作回查线索）：Meta validation checks caller-provided DATA against the WorkflowMeta contract and rejects every violation by name. Meta arrives as schema-checked JSON data, never evaluated script text; evaluating it on the host could run getters outside the worker timeout ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/protocol.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：协议边界
- 这个文件有什么用：它规定工作流、工作线程、协议两端交换的消息形状和生命周期，避免不同进程或线程各自解释协议。
- 为什么这样设计：协议独立于两端实现，消息版本、生命周期和失败语义才有单一的审查位置；进程或线程替换不会改变上层契约。
- 文件级设计证据：源码顶部注释把它定位为“The host⇄worker wire protocol: one string-valued enum of message tags per direction, a payload map giving each tag its parameters (the single source of truth), and the message unions derived from them. Payloads are plain JSON by construction for structured ...”；固定提交中扫描到的声明包括 `WorkerToHostType`、`WorkerToHostPayloads`、`HostToWorkerType`、`HostToWorkerPayloads`、`WorkerToHostMessage`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/types.ts)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)、[packages/workflow/workflow-worker-thread/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/host.ts)、[packages/workflow/workflow-worker-thread/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/session.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)、[packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/workflow-worker-thread/src/host.ts`、`packages/workflow/workflow-worker-thread/src/session.ts`、`packages/workflow/workflow-worker-thread/tests/session.spec.ts` 看它怎样约束运行时，最后对照 `packages/workflow/workflow-worker-thread/tests/session.spec.ts`、`packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `WorkerToHostType`、`WorkerToHostPayloads`、`HostToWorkerType`、`HostToWorkerPayloads`、`WorkerToHostMessage`、`HostToWorkerMessage`；源码顶部原注释（英文，仅作回查线索）：The host⇄worker wire protocol: one string-valued enum of message tags per direction, a payload map giving each tag its parameters (the single source of truth), and the message unions derived from them. Payloads are plain JSON by construction for structured ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/realm.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/realm.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：工作流执行实现
- 这个文件有什么用：这个文件实现工作流 worker 的宿主、协议、realm 或运行时状态，隔离工作流执行和主进程。
- 为什么这样设计：worker、realm 和协议隔离工作流资源与主进程，取消或崩溃不会直接破坏宿主的插件树。
- 文件级设计证据：源码顶部注释把它定位为“Materializes values leaving the script vm into plain JSON before they cross the worker boundary, and renders thrown script values without rejecting the run. The walk rejects values that JSON cannot preserve but trusts model-written workflow scripts: getters...”；固定提交中扫描到的声明包括 `MaterializeError`、`renderThrown`、`materializeFromRealm`、`hasPlainPrototype`、`materialize`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/host.ts)、[packages/workflow/workflow-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/index.ts)、[packages/workflow/workflow-worker-thread/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/runtime.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/realm.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/realm.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/workflow/workflow-worker-thread/src/host.ts`、`packages/workflow/workflow-worker-thread/src/index.ts`、`packages/workflow/workflow-worker-thread/src/runtime.ts` 确认输入输出，最后对照 `packages/workflow/workflow-worker-thread/tests/realm.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 151 行；扫描到的声明包括 `MaterializeError`、`renderThrown`、`materializeFromRealm`、`hasPlainPrototype`、`materialize`、`materializeArray`、`materializeObject`；源码顶部原注释（英文，仅作回查线索）：Materializes values leaving the script vm into plain JSON before they cross the worker boundary, and renders thrown script values without rejecting the run. The walk rejects values that JSON cannot preserve but trusts model-written workflow scripts: getters...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/runtime.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与工作流、工作线程、运行时的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Per-run worker-side vm hooks, child RPC, concurrency/caps, cancellation, and result serialization; it never touches Cordis. Script values leaving the realm are materialized as plain JSON before messaging. Values entering the trusted model-written realm are ...”；固定提交中扫描到的声明包括 `ExecutionObserver`、`WorkflowExecution`、`outputText`、`defaultLabel`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/workflow/workflow-worker-thread/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/host.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)、[packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)、[packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts)、[packages/workflow/workflow-worker-thread/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/integration.spec.ts)、[packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/workflow/workflow-worker-thread/src/host.ts`、`packages/workflow/workflow-worker-thread/src/session.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/workflow/tool-ralph/tests/integration.spec.ts`、`packages/workflow/tool-workflow/tests/tool-workflow.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 487 行；扫描到的声明包括 `ExecutionObserver`、`WorkflowExecution`、`outputText`、`defaultLabel`；源码顶部原注释（英文，仅作回查线索）：Per-run worker-side vm hooks, child RPC, concurrency/caps, cancellation, and result serialization; it never touches Cordis. Script values leaving the realm are materialized as plain JSON before messaging. Values entering the trusted model-written realm are ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/session.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护工作流、工作线程、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“The worker-side half of the engine: runWorkerSession wires one MessagePort to one WorkflowExecution — hook progress and child starts go out as messages, run control and child lifecycle come back in — and posts the run's terminal result exactly once. Keeping...”；固定提交中扫描到的声明包括 `requireParentPort`、`runWorkerSession`、`RpcChildHandle`、`ChildRpcBridge`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/workflow/workflow-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/protocol.ts)、[packages/workflow/workflow-worker-thread/src/realm.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/realm.ts)、[packages/workflow/workflow-worker-thread/src/worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/worker.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/llm/llm/src/index.ts`、`packages/workflow/workflow-worker-thread/src/protocol.ts`、`packages/workflow/workflow-worker-thread/src/realm.ts` 和 `packages/workflow/workflow-worker-thread/src/worker.ts`、`packages/workflow/workflow-worker-thread/tests/session.spec.ts` 理解状态变化，最后对照 `packages/workflow/workflow-worker-thread/tests/session.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `requireParentPort`、`runWorkerSession`、`RpcChildHandle`、`ChildRpcBridge`；源码顶部原注释（英文，仅作回查线索）：The worker-side half of the engine: runWorkerSession wires one MessagePort to one WorkflowExecution — hook progress and child starts go out as messages, run control and child lifecycle come back in — and posts the run's terminal result exactly once. Keeping...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/types.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工作流、工作线程中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Non-protocol wire vocabulary for the worker-thread engine: the workerData init payload and the child-port interfaces the worker-side runtime consumes. Host/worker messages are defined in ./protocol.ts; transported child requests and results are plain JSON f...”；固定提交中扫描到的声明包括 `WorkerLimits`、`WorkerInit`、`ChildStartRequest`、`ChildResult`、`ChildHandle`；本地静态 import 图显示它直接依赖 3 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)、[packages/workflow/workflow-worker-thread/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/host.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/workflow-worker-thread/src/host.ts`、`packages/workflow/workflow-worker-thread/src/index.ts`、`packages/workflow/workflow-worker-thread/src/protocol.ts` 看它怎样约束运行时，最后对照 `packages/workflow/workflow-worker-thread/tests/session.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 94 行；扫描到的声明包括 `WorkerLimits`、`WorkerInit`、`ChildStartRequest`、`ChildResult`、`ChildHandle`、`ChildPort`；源码顶部原注释（英文，仅作回查线索）：Non-protocol wire vocabulary for the worker-thread engine: the workerData init payload and the child-port interfaces the worker-side runtime consumes. Host/worker messages are defined in ./protocol.ts; transported child requests and results are plain JSON f...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/src/worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/worker.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把工作流、工作线程的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Single-statement worker entry that boots runWorkerSession on real parentPort. Logic remains in the session module for in-process MessageChannel coverage; importing this entry on the main thread exercises requireParentPort's failure path. @module @deepseek-a...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Single-statement worker entry that boots runWorkerSession on real parentPort. Logic remains in the session module for in-process MessageChannel coverage; importing this entry on the main thread exercises requireParentPort's failure path. @module @deepseek-a...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/session.ts)、[packages/workflow/workflow-worker-thread/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/types.ts)、[packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)
- 对应测试：[packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md` 和入口，再读当前实现，沿着 `packages/workflow/workflow-worker-thread/src/session.ts`、`packages/workflow/workflow-worker-thread/src/types.ts` 和 `packages/workflow/workflow-worker-thread/tests/session.spec.ts` 确认输入输出，最后对照 `packages/workflow/workflow-worker-thread/tests/session.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 14 行；源码顶部原注释（英文，仅作回查线索）：Single-statement worker entry that boots runWorkerSession on real parentPort. Logic remains in the session module for in-process MessageChannel coverage; importing this entry on the main thread exercises requireParentPort's failure path. @module @deepseek-a...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“the built engine spawns its built worker under plain node and completes a run”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the built engine spawns its built worker under plain node and completes a run”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent/src/index.ts)、[packages/workflow/workflow-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subagent/subagent/src/index.ts`、`packages/workflow/workflow-worker-thread/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的测试主题包括 “the built engine spawns its built worker under plain node and completes a run”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/integration.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“dsh-workflow-worker-thread over the real in-process stack”、“runs a two-stage workflow: a plain child, then a schema child through the structured ru...”、“a child that fails against its schema (nudges exhausted) reaches the script as null”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-workflow-worker-thread over the real in-process stack”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mountInvariants`、`setup`；本地静态 import 图显示它直接依赖 13 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的声明包括 `mountInvariants`、`setup`；扫描到的测试主题包括 “dsh-workflow-worker-thread over the real in-process stack”、“runs a two-stage workflow: a plain child, then a schema child through the structured runtime”、“a child that fails against its schema (nudges exhausted) reaches the script as null”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/meta.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/meta.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“validateMeta”、“accepts a minimal meta and returns a normalized copy (no aliasing of the input)”、“accepts the full shape and rebuilds phases entry by entry”、“rejects non-object values loud”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“validateMeta”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `expectInvalid`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/meta.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/meta.ts)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/workflow/workflow-worker-thread/src/meta.ts`、`packages/workflow/workflow/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `expectInvalid`；扫描到的测试主题包括 “validateMeta”、“accepts a minimal meta and returns a normalized copy (no aliasing of the input)”、“accepts the full shape and rebuilds phases entry by entry”、“rejects non-object values loud”、“rejects unknown fields by name (accepted-then-ignored is banned)”、“rejects missing or mistyped name/description/whenToUse”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/realm.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/realm.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“materializeFromRealm”、“copies realm objects/arrays/scalars into host plain data”、“accepts undefined ONLY at the root (a valueless script return)”、“invokes getters ordinarily — the getter RESULT is what crosses (trust premise)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“materializeFromRealm”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `inRealm`、`rejection`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/realm.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/realm.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/workflow/workflow-worker-thread/src/realm.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 145 行；扫描到的声明包括 `inRealm`、`rejection`；扫描到的测试主题包括 “materializeFromRealm”、“copies realm objects/arrays/scalars into host plain data”、“accepts undefined ONLY at the root (a valueless script return)”、“invokes getters ordinarily — the getter RESULT is what crosses (trust premise)”、“a getter that THROWS surfaces as a MaterializeError carrying the rendered failure”、“a”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/session.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程、会话的具体场景，包括“runWorkerSession over an in-process MessageChannel”、“runs a script end to end: ready/go handshake, phases, log, agents, result”、“agent({schema}) forwards the schema on the start request and returns the structured value”、“agent({provider}) forwards a provider without inventing a model”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runWorkerSession over an in-process MessageChannel”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `limits`、`init`、`fakeHost`、`text`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/workflow/workflow-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/protocol.ts)、[packages/workflow/workflow-worker-thread/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/session.ts)、[packages/workflow/workflow-worker-thread/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/workflow/workflow-worker-thread/src/protocol.ts`、`packages/workflow/workflow-worker-thread/src/session.ts`、`packages/workflow/workflow-worker-thread/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 511 行；扫描到的声明包括 `limits`、`init`、`fakeHost`、`text`；扫描到的测试主题包括 “runWorkerSession over an in-process MessageChannel”、“runs a script end to end: ready/go handshake, phases, log, agents, result”、“agent({schema}) forwards the schema on the start request and returns the structured value”、“agent({provider}) forwards a provider without inventing a model”、“a schema child completing WITHOUT a structured value resolves null with a failed outcome”、“a child settling non-completed resolves null (scripts filter), never throwing into the script”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/source-worker.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/source-worker.compat.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“runs the default config through the source worker”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runs the default config through the source worker”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless runtime smoke for the source-mode workflow worker. The Node compatibility matrix runs this WHOLE file, so renaming or removing its test cannot turn the runtime proof into a successful zero-match filter.”；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 46 行；扫描到的测试主题包括 “runs the default config through the source worker”；源码顶部原注释（英文，仅作回查线索）：Keyless runtime smoke for the source-mode workflow worker. The Node compatibility matrix runs this WHOLE file, so renaming or removing its test cannot turn the runtime proof into a successful zero-match filter.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.e2e.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“runs a two-phase script in a worker thread over real children, one through the structur...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runs a two-phase script in a worker thread over real children, one through the structur...”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `harness`；扫描到的测试主题包括 “runs a two-phase script in a worker thread over real children, one through the structured runtime”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流、工作线程的具体场景，包括“dsh-workflow-worker-thread”、“script execution over a real worker thread”、“runs a script end-to-end: agent() text results, phases, log, args, return value, events”、“agent({schema, model}) forwards outputSchema and agentOptions to the provider across th...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-workflow-worker-thread”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fakeParent`、`waitFor`、`StubProvider`、`text`、`setup`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1474 行；扫描到的声明包括 `fakeParent`、`waitFor`、`StubProvider`、`text`、`setup`、`scripted`、`run`；扫描到的测试主题包括 “dsh-workflow-worker-thread”、“script execution over a real worker thread”、“runs a script end-to-end: agent() text results, phases, log, args, return value, events”、“agent({schema, model}) forwards outputSchema and agentOptions to the provider across the thread”、“agent({provider}) forwards provider-only agentOptions across the thread”、“a start-request provider override selects every child without changing the engine default”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow-worker-thread/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tsdown.config.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理工作流、工作线程：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/workflow/workflow-worker-thread/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 29 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工作流相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition for the workflow capability seam. Service Providers execute orchestration scripts; observe-only lifecycle events never expose run control. @module @deepseek-ai/dsh-workflow”；固定提交中扫描到的声明包括 `WorkflowEventName`、`WorkflowErrorCode`、`WorkflowError`、`isFatalWorkflowError`、`renderListenerError`；本地静态 import 图显示它直接依赖 4 个源文件，并被 14 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/workflow/workflow/src/runtime-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/runtime-types.ts)、[packages/workflow/workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/types.ts)、[packages/workflow/tool-ralph/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/src/index.ts)
- 对应测试：[packages/workflow/tool-ralph/tests/tool-ralph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/tool-ralph.spec.ts)、[packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)、[packages/workflow/workflow-worker-thread/tests/meta.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/meta.spec.ts)、[packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts)、[packages/workflow/workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/tests/invariant.spec.ts)、[packages/workflow/workflow/tests/workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/tests/workflow.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/tool-ralph/src/index.ts`、`packages/workflow/tool-ralph/tests/tool-ralph.spec.ts`、`packages/workflow/tool-workflow/src/index.ts` 看它怎样约束运行时，最后对照 `packages/workflow/tool-ralph/tests/tool-ralph.spec.ts`、`packages/workflow/tool-workflow/tests/tool-workflow.spec.ts`、`packages/workflow/workflow-worker-thread/tests/meta.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 203 行；扫描到的声明包括 `WorkflowEventName`、`WorkflowErrorCode`、`WorkflowError`、`isFatalWorkflowError`、`renderListenerError`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the workflow capability seam. Service Providers execute orchestration scripts; observe-only lifecycle events never expose run control. @module @deepseek-ai/dsh-workflow。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/invariant.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工作流必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned workflow lifecycle invariants. @module @deepseek-ai/dsh-workflow/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`traceFor`、`validateAgentEnd`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/workflow/workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/workflow/workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/tests/invariant.spec.ts)
- 对应测试：[packages/workflow/workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`packages/workflow/workflow/src/types.ts`、`vendor/cordis/src/index.ts` 和 `packages/workflow/workflow/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/workflow/workflow/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 136 行；扫描到的声明包括 `name`、`inject`、`apply`、`traceFor`、`validateAgentEnd`、`validateWorkflowEnd`；源码顶部原注释（英文，仅作回查线索）：Package-owned workflow lifecycle invariants. @module @deepseek-ai/dsh-workflow/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow/src/runtime-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/runtime-types.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工作流、运行时中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Host-only workflow request and live-run handles. The browser-safe durable vocabulary remains in ./types so Client programs never import Agent or host Cordis context declarations. @module @deepseek-ai/dsh-workflow”；固定提交中扫描到的声明包括 `WorkflowStartRequest`、`WorkflowRun`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/workflow/workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/types.ts)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/workflow/tool-ralph/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/integration.spec.ts)、[packages/workflow/tool-ralph/tests/tool-ralph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-ralph/tests/tool-ralph.spec.ts)、[packages/workflow/tool-workflow/tests/tool-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/tool-workflow.spec.ts)、[packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/built-worker.e2e.ts)、[packages/workflow/workflow-worker-thread/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow-worker-thread/tests/integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/workflow/workflow/README.md`、入口和消费者，再读当前契约，沿着 `packages/workflow/workflow/src/index.ts` 看它怎样约束运行时，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/workflow/tool-ralph/tests/integration.spec.ts`、`packages/workflow/tool-ralph/tests/tool-ralph.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `WorkflowStartRequest`、`WorkflowRun`；源码顶部原注释（英文，仅作回查线索）：Host-only workflow request and live-run handles. The browser-safe durable vocabulary remains in ./types so Client programs never import Agent or host Cordis context declarations. @module @deepseek-ai/dsh-workflow。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/types.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述工作流中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Workflow seam vocabulary: the request/run/result types a workflow engine consumes and produces, plus the fields in the workflow  event payloads. Types only (plus the id-brand factory), per the package convention. @module @deepseek-ai/dsh-workflow/types”；固定提交中扫描到的声明包括 `WorkflowRunId`、`WorkflowPhase`、`WorkflowMeta`、`WorkflowStopReason`、`WorkflowResult`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/client/ui-workflow-run/src/client/workflow-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/workflow-definition.ts)、[packages/workflow/tool-workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/types.ts)
- 对应测试：[packages/workflow/tool-workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/workflow/workflow/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-workflow-run/src/client/workflow-definition.ts`、`packages/workflow/tool-workflow/src/types.ts`、`packages/workflow/tool-workflow/tests/invariant.spec.ts` 看它怎样约束运行时，最后对照 `packages/workflow/tool-workflow/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 131 行；扫描到的声明包括 `WorkflowRunId`、`WorkflowPhase`、`WorkflowMeta`、`WorkflowStopReason`、`WorkflowResult`、`WorkflowRunInfo`、`WorkflowAgentInfo`、`WorkflowAgentOutcome`；源码顶部原注释（英文，仅作回查线索）：Workflow seam vocabulary: the request/run/result types a workflow engine consumes and produces, plus the fields in the workflow  event payloads. Types only (plus the id-brand factory), per the package convention. @module @deepseek-ai/dsh-workflow/types。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/tests/invariant.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流的具体场景，包括“workflow invariants”、“accepts a complete workflow and child lifecycle”、“rejects invalid run identity and enclosure”、“rejects malformed and unpaired child lifecycles”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“workflow invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`packages/workflow/workflow/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “workflow invariants”、“accepts a complete workflow and child lifecycle”、“rejects invalid run identity and enclosure”、“rejects malformed and unpaired child lifecycles”、“rejects inconsistent terminal results”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/workflow/workflow/tests/workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/tests/workflow.spec.ts)

- 所属层：packages/workflow：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流的具体场景，包括“dsh-workflow (interface)”、“WorkflowRunId brands a string (identity at runtime)”、“WorkflowError carries code + fatal (default true) and reads as a HarnessError”、“isFatalWorkflowError: true only for a fatal WorkflowError”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-workflow (interface)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StubEngine`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/workflow/workflow/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/README.md)、[packages/workflow/workflow/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/workflow/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/workflow/workflow/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `StubEngine`；扫描到的测试主题包括 “dsh-workflow (interface)”、“WorkflowRunId brands a string (identity at runtime)”、“WorkflowError carries code + fatal (default true) and reads as a HarnessError”、“isFatalWorkflowError: true only for a fatal WorkflowError”、“registers as ctx.workflowEngine and unregisters when its fiber is disposed (HMR safety)”、“emitWorkflowEvent dispatches to every listener with the payload tuple”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
