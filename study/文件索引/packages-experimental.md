# 源文件索引：packages/experimental

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 22 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/experimental/agent-team/src/activity.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/activity.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`activity`组织实现；固定提交中可见的公开或顶层声明包括 `TeamActivity`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`activity`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 2 个本地依赖和 1 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“One-shot Team change waiters independent of durable state projection.”；固定提交中扫描到的声明包括 `TeamActivity`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/types.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/experimental/agent-team/src/error.ts`、`packages/experimental/agent-team/src/types.ts` 和 `packages/experimental/agent-team/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `TeamActivity`；源码顶部原注释（英文，仅作回查线索）：One-shot Team change waiters independent of durable state projection.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Typed Agent Teams failures.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Typed Agent Teams failures.”；固定提交中扫描到的声明包括 `TeamError`、`errorMessage`；本地静态 import 图显示它直接依赖 1 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/experimental/agent-team/src/activity.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/activity.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)、[packages/experimental/agent-team/src/lifecycle.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/lifecycle.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts` 和 `packages/experimental/agent-team/src/activity.ts`、`packages/experimental/agent-team/src/index.ts`、`packages/experimental/agent-team/src/lifecycle.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `TeamError`、`errorMessage`；源码顶部原注释（英文，仅作回查线索）：Typed Agent Teams failures.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/fold.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`fold`组织实现；固定提交中可见的公开或顶层声明包括 `TeamFoldState`、`emptyTeamFoldState`、`TeamEventType`、`TeamSessionEvent`、`isTeamEvent`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`fold`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 4 个本地依赖和 6 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Strict replay fold for Agent Teams log-only events.”；固定提交中扫描到的声明包括 `TeamFoldState`、`emptyTeamFoldState`、`TeamEventType`、`TeamSessionEvent`、`isTeamEvent`；本地静态 import 图显示它直接依赖 4 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/task-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/task-graph.ts)、[packages/experimental/agent-team/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/types.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)
- 对应测试：[packages/experimental/agent-team/tests/fold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/fold.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/task-graph.ts`、`packages/experimental/agent-team/src/types.ts` 和 `packages/experimental/agent-team/src/index.ts`、`packages/experimental/agent-team/src/invariant.ts`、`packages/experimental/agent-team/src/journal.ts` 确认输入输出，最后对照 `packages/experimental/agent-team/tests/fold.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 291 行；扫描到的声明包括 `TeamFoldState`、`emptyTeamFoldState`、`TeamEventType`、`TeamSessionEvent`、`isTeamEvent`、`applyTeamEvent`、`foldTeam`、`parsePersisted`；源码顶部原注释（英文，仅作回查线索）：Strict replay fold for Agent Teams log-only events.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent Teams service façade over roster, mailbox, task, and runtime lifecycle owners.”；固定提交中扫描到的声明包括 `TeamService`、`positiveLimit`；本地静态 import 图显示它直接依赖 13 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/experimental/agent-team/src/activity.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/activity.ts)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)
- 对应测试：[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/experimental/agent-team/README.md`、入口和消费者，再读当前契约，沿着 `packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`、`packages/experimental/tool-agent-team/src/index.ts` 看它怎样约束运行时，最后对照 `packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`、`packages/experimental/tool-agent-team/tests/tool-team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 261 行；扫描到的声明包括 `TeamService`、`positiveLimit`；源码顶部原注释（英文，仅作回查线索）：Agent Teams service façade over roster, mailbox, task, and runtime lifecycle owners.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/invariant.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned relational checks for Agent Teams durable records.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/fold.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/experimental/agent-team/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/invariant.spec.ts)
- 对应测试：[packages/experimental/agent-team/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/fold.ts`、`packages/runtime-diagnostics/invariants/src/index.ts` 和 `packages/experimental/agent-team/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/experimental/agent-team/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned relational checks for Agent Teams durable records.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/journal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/journal.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`journal`组织实现；固定提交中可见的公开或顶层声明包括 `TeamJournal`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`journal`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 4 个本地依赖和 4 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Serialized Team transactions over the exact live Lead Session log.”；固定提交中扫描到的声明包括 `TeamJournal`；本地静态 import 图显示它直接依赖 4 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/fold.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/fold.ts` 和 `packages/experimental/agent-team/src/index.ts`、`packages/experimental/agent-team/src/mailbox.ts`、`packages/experimental/agent-team/src/roster.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 71 行；扫描到的声明包括 `TeamJournal`；源码顶部原注释（英文，仅作回查线索）：Serialized Team transactions over the exact live Lead Session log.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/lifecycle.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/lifecycle.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`lifecycle`组织实现；固定提交中可见的公开或顶层声明包括 `TeamRuntimeLifecycle`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`lifecycle`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 1 个本地依赖和 4 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Shared admission cutoff and bounded settlement for the Team runtime.”；固定提交中扫描到的声明包括 `TeamRuntimeLifecycle`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)、[packages/experimental/agent-team/src/mailbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/mailbox.ts)、[packages/experimental/agent-team/src/roster.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/roster.ts)
- 对应测试：[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/experimental/agent-team/src/error.ts` 和 `packages/experimental/agent-team/src/index.ts`、`packages/experimental/agent-team/src/mailbox.ts`、`packages/experimental/agent-team/src/roster.ts` 确认输入输出，最后对照 `packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `TeamRuntimeLifecycle`；源码顶部原注释（英文，仅作回查线索）：Shared admission cutoff and bounded settlement for the Team runtime.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/mailbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/mailbox.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`mailbox`组织实现；固定提交中可见的公开或顶层声明包括 `TeamMailbox`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`mailbox`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 10 个本地依赖和 1 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Durable Team mailbox admission, target-local dispatch, acknowledgement, and recovery.”；固定提交中扫描到的声明包括 `TeamMailbox`；本地静态 import 图显示它直接依赖 10 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/error.ts` 和 `packages/experimental/agent-team/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 338 行；扫描到的声明包括 `TeamMailbox`；源码顶部原注释（英文，仅作回查线索）：Durable Team mailbox admission, target-local dispatch, acknowledgement, and recovery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/roster.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/roster.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`roster`组织实现；固定提交中可见的公开或顶层声明包括 `TeamMembership`、`resolveActiveMember`、`TeamRoster`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`roster`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 12 个本地依赖和 3 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Team membership, continuable-child provisioning, and roster-owned teardown.”；固定提交中扫描到的声明包括 `TeamMembership`、`resolveActiveMember`、`TeamRoster`；本地静态 import 图显示它直接依赖 12 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/error.ts` 和 `packages/experimental/agent-team/src/index.ts`、`packages/experimental/agent-team/src/mailbox.ts`、`packages/experimental/agent-team/src/task-board.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 485 行；扫描到的声明包括 `TeamMembership`、`resolveActiveMember`、`TeamRoster`；源码顶部原注释（英文，仅作回查线索）：Team membership, continuable-child provisioning, and roster-owned teardown.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/session-message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/session-message.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护智能体、会话、消息的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Durable Session-message acceptance checks shared by provisioning and mailbox recovery.”；固定提交中扫描到的声明包括 `messageAccepted`、`pendingInboxMessages`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/experimental/agent-team/src/mailbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/mailbox.ts)、[packages/experimental/agent-team/src/roster.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/roster.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/experimental/agent-team/src/mailbox.ts`、`packages/experimental/agent-team/src/roster.ts` 理解状态变化，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `messageAccepted`、`pendingInboxMessages`；源码顶部原注释（英文，仅作回查线索）：Durable Session-message acceptance checks shared by provisioning and mailbox recovery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/task-board.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/task-board.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`task-board`组织实现；固定提交中可见的公开或顶层声明包括 `TeamTaskBoard`、`scopesOverlap`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`task-board`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 8 个本地依赖和 1 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Shared Team task DAG commands and runtime-enriched views.”；固定提交中扫描到的声明包括 `TeamTaskBoard`、`scopesOverlap`；本地静态 import 图显示它直接依赖 8 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/fold.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/experimental/agent-team/src/error.ts`、`packages/experimental/agent-team/src/fold.ts` 和 `packages/experimental/agent-team/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 297 行；扫描到的声明包括 `TeamTaskBoard`、`scopesOverlap`；源码顶部原注释（英文，仅作回查线索）：Shared Team task DAG commands and runtime-enriched views.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/task-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/task-graph.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`task-graph`组织实现；固定提交中可见的公开或顶层声明包括 `TeamTaskGraphViolation`、`TeamTaskGraphError`、`assertTaskGraphCandidate`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`task-graph`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 1 个本地依赖和 2 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Complete dependency validation for current Team task snapshots.”；固定提交中扫描到的声明包括 `TeamTaskGraphViolation`、`TeamTaskGraphError`、`assertTaskGraphCandidate`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/experimental/agent-team/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/types.ts)、[packages/experimental/agent-team/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/fold.ts)、[packages/experimental/agent-team/src/task-board.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/task-board.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/fold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/fold.spec.ts)、[packages/experimental/agent-team/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/invariant.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/experimental/agent-team/src/types.ts` 和 `packages/experimental/agent-team/src/fold.ts`、`packages/experimental/agent-team/src/task-board.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/fold.spec.ts`、`packages/experimental/agent-team/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 69 行；扫描到的声明包括 `TeamTaskGraphViolation`、`TeamTaskGraphError`、`assertTaskGraphCandidate`；源码顶部原注释（英文，仅作回查线索）：Complete dependency validation for current Team task snapshots.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/types.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述智能体中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public Agent Teams identities, durable records, and service request values.”；固定提交中扫描到的声明包括 `TeamId`、`TeamTaskId`、`TeamMessageId`、`TeamMemberPhase`、`TeamMemberSnapshot`；本地静态 import 图显示它直接依赖 3 个源文件，并被 9 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/experimental/agent-team/src/activity.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/activity.ts)
- 对应测试：[packages/experimental/agent-team/tests/fold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/fold.spec.ts)、[packages/experimental/agent-team/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md`、入口和消费者，再读当前契约，沿着 `packages/experimental/agent-team/src/activity.ts`、`packages/experimental/agent-team/src/fold.ts`、`packages/experimental/agent-team/src/index.ts` 看它怎样约束运行时，最后对照 `packages/experimental/agent-team/tests/fold.spec.ts`、`packages/experimental/agent-team/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 219 行；扫描到的声明包括 `TeamId`、`TeamTaskId`、`TeamMessageId`、`TeamMemberPhase`、`TeamMemberSnapshot`、`TeamMemberView`、`TeamTaskStatus`、`TeamTaskSnapshot`；源码顶部原注释（英文，仅作回查线索）：Public Agent Teams identities, durable records, and service request values.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/src/validation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/validation.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/experimental/agent-team`，围绕`validation`组织实现；固定提交中可见的公开或顶层声明包括 `requiredText`、`writeScope`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`validation`单独放在 `packages/experimental/agent-team`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 1 个本地依赖和 2 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Input normalization shared by Team roster and task commands.”；固定提交中扫描到的声明包括 `requiredText`、`writeScope`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/experimental/agent-team/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/error.ts)、[packages/experimental/agent-team/src/roster.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/roster.ts)、[packages/experimental/agent-team/src/task-board.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/task-board.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md` 和入口，再读当前实现，沿着 `packages/experimental/agent-team/src/error.ts` 和 `packages/experimental/agent-team/src/roster.ts`、`packages/experimental/agent-team/src/task-board.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/experimental/agent-team/tests/team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `requiredText`、`writeScope`；源码顶部原注释（英文，仅作回查线索）：Input normalization shared by Team roster and task commands.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/tests/fold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/fold.spec.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“Agent Teams fold”、“folds current-team records and ignores inherited records”、“enforces teammate identity and lifecycle”、“enforces task revision continuity”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Agent Teams fold”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `event`、`pending`、`isEmptyFold`、`member`、`task`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/fold.ts)、[packages/experimental/agent-team/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/fold.ts`、`packages/experimental/agent-team/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 325 行；扫描到的声明包括 `event`、`pending`、`isEmptyFold`、`member`、`task`、`message`；扫描到的测试主题包括 “Agent Teams fold”、“folds current-team records and ignores inherited records”、“enforces teammate identity and lifecycle”、“enforces task revision continuity”、“rejects every invalid persisted task dependency relation”、“leaves numeric allocation unchanged for a branded nonstandard task id”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/invariant.spec.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“Agent Teams stream invariant”、“accepts provisioning and rejects a terminal member as the first edge”、“rejects an invalid task dependency before publication”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Agent Teams stream invariant”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/experimental/agent-team/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/invariant.ts)、[packages/experimental/agent-team/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/experimental/agent-team/src/invariant.ts`、`packages/experimental/agent-team/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “Agent Teams stream invariant”、“accepts provisioning and rejects a terminal member as the first edge”、“rejects an invalid task dependency before publication”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、持久化的具体场景，包括“${backend.name} Agent Teams recovery”、“reconciles a persisted child to active and a missing child to durable failed”、“reconciles a provisioning child whose initial prompt is durably pending”、“replays queued-minus-delivered mail in FIFO order without waking for quiet mail”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“${backend.name} Agent Teams recovery”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `durable`、`disposeContext`、`stack`、`provisioning`、`persistedChild`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 485 行；扫描到的声明包括 `durable`、`disposeContext`、`stack`、`provisioning`、`persistedChild`；扫描到的测试主题包括 “${backend.name} Agent Teams recovery”、“reconciles a persisted child to active and a missing child to durable failed”、“reconciles a provisioning child whose initial prompt is durably pending”、“replays queued-minus-delivered mail in FIFO order without waking for quiet mail”、“acknowledges target-recorded mail after restart without delivering it twice”、“acknowledges durably pending target mail without cold-resume duplication”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“Team identity and provisioning”、“rejects deployment limits that are not positive safe integers”、“supports direct-constructor defaults and recovers roots that already exist”、“creates fresh and fork teammates with immutable names and bounded roster size”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Team identity and provisioning”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `durable`、`setup`、`content`、`teamInternals`、`spawn`；本地静态 import 图显示它直接依赖 13 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1692 行；扫描到的声明包括 `durable`、`setup`、`content`、`teamInternals`、`spawn`、`waitNoAgent`、`waitRunning`；扫描到的测试主题包括 “Team identity and provisioning”、“rejects deployment limits that are not positive safe integers”、“supports direct-constructor defaults and recovers roots that already exist”、“creates fresh and fork teammates with immutable names and bounded roster size”、“flushes the accepted child prompt before committing the active roster edge”、“checkpoints live and detached inbox receipts and aborts an unresolved checkpoint”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/agent-team/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tsdown.config.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理智能体：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/experimental/agent-team/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 25 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/tool-agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/src/index.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工具、智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Scoped model-facing tools for the opt-in Agent Teams runtime.”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`jsonOutput`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/experimental/tool-agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/experimental/agent-team/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/src/index.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 对应测试：[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/experimental/tool-agent-team/README.md`、入口和消费者，再读当前契约，沿着 `packages/experimental/tool-agent-team/tests/tool-team.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/experimental/tool-agent-team/tests/tool-team.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 418 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`jsonOutput`、`callingAgent`、`install`；源码顶部原注释（英文，仅作回查线索）：Scoped model-facing tools for the opt-in Agent Teams runtime.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/tool-agent-team/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/src/invariant.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工具、智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for the Team tool adapter.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/tool-agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the Team tool adapter.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)

- 所属层：packages/experimental：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具、智能体的具体场景，包括“dsh-tool-team”、“installs the complete scoped schema and shared-checkout policy for roots and teammates”、“returns actionable no-progress output and renders structured wait cancellation”、“adapts roster, mailbox, wait, and task CAS operations to canonical JSON”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-team”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`execute`、`text`、`spawnedChildId`、`assembly`；本地静态 import 图显示它直接依赖 17 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/experimental/tool-agent-team/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 442 行；扫描到的声明包括 `setup`、`execute`、`text`、`spawnedChildId`、`assembly`、`waitRunning`、`waitNoAgent`；扫描到的测试主题包括 “dsh-tool-team”、“installs the complete scoped schema and shared-checkout policy for roots and teammates”、“returns actionable no-progress output and renders structured wait cancellation”、“adapts roster, mailbox, wait, and task CAS operations to canonical JSON”、“adapts optional task filters, mutations, pagination, and default waiting”、“removes and reinstalls every scoped registration across plugin HMR without stopping the child”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
