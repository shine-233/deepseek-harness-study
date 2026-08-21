# 源文件索引：packages/goal

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 26 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/goal/command-goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/src/index.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把目标相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Human-facing /goal command over the persisted same-session goal domain. @module @deepseek-ai/dsh-command-goal”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`assertNever`、`parseGoalCommand`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/command-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/README.md)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/commands/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/goal/command-goal/tests/command-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/tests/command-goal.spec.ts)
- 对应测试：[packages/goal/command-goal/tests/command-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/tests/command-goal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/goal/command-goal/README.md`、入口和消费者，再读当前契约，沿着 `packages/goal/command-goal/tests/command-goal.spec.ts` 看它怎样约束运行时，最后对照 `packages/goal/command-goal/tests/command-goal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 196 行；扫描到的声明包括 `name`、`inject`、`apply`、`assertNever`、`parseGoalCommand`、`phaseLabel`、`commandHint`、`renderGoal`；源码顶部原注释（英文，仅作回查线索）：Human-facing /goal command over the persisted same-session goal domain. @module @deepseek-ai/dsh-command-goal。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/command-goal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/src/invariant.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查目标必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-command-goal. @module @deepseek-ai/dsh-command-goal/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/command-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-command-goal. @module @deepseek-ai/dsh-command-goal/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/command-goal/tests/command-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/tests/command-goal.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标的具体场景，包括“@deepseek-ai/dsh-command-goal registration”、“registers one global command with Loader-safe exports and disposes it”、“/goal human command”、“shows an empty status without mutating the session”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“@deepseek-ai/dsh-command-goal registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stubAgent`、`harness`、`domainEvents`、`run`、`ref`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/command-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/command-goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/goal/command-goal/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 331 行；扫描到的声明包括 `stubAgent`、`harness`、`domainEvents`、`run`、`ref`、`provideStore`、`runWithImages`；扫描到的测试主题包括 “@deepseek-ai/dsh-command-goal registration”、“registers one global command with Loader-safe exports and disposes it”、“/goal human command”、“shows an empty status without mutating the session”、“creates a trimmed objective and refuses silent replacement of unfinished work”、“treats only exact control words as controls”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal-round-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/index.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把目标相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Same-session goal-round driver over public agent, session, and goal services. @module @deepseek-ai/dsh-goal-round-driver”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`isGoalRoundSource`、`sameRound`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal-round-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal-round-driver/src/prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/prompt.ts)、[packages/examples/agent-spine-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/src/index.ts)
- 对应测试：[packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts)、[packages/goal/goal-round-driver/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/goal/goal-round-driver/README.md`、入口和消费者，再读当前契约，沿着 `packages/examples/agent-spine-demo/src/index.ts`、`packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts`、`packages/goal/goal-round-driver/tests/invariant.spec.ts` 看它怎样约束运行时，最后对照 `packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts`、`packages/goal/goal-round-driver/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 445 行；扫描到的声明包括 `name`、`inject`、`apply`、`isGoalRoundSource`、`sameRound`、`sameQueued`、`goalRef`、`renderThrown`；源码顶部原注释（英文，仅作回查线索）：Same-session goal-round driver over public agent, session, and goal services. @module @deepseek-ai/dsh-goal-round-driver。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal-round-driver/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/invariant.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查目标必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned goal-round prompt invariants. @module @deepseek-ai/dsh-goal-round-driver/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`foldChecked`、`goalView`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal-round-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal-round-driver/src/prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/prompt.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)、[packages/goal/goal-round-driver/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/invariant.spec.ts)
- 对应测试：[packages/goal/goal-round-driver/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/goal/goal-round-driver/src/prompt.ts`、`packages/goal/goal/src/index.ts` 和 `packages/goal/goal-round-driver/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/goal/goal-round-driver/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `name`、`inject`、`apply`、`foldChecked`、`goalView`、`validateEvent`；源码顶部原注释（英文，仅作回查线索）：Package-owned goal-round prompt invariants. @module @deepseek-ai/dsh-goal-round-driver/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal-round-driver/src/prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/prompt.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：提示词与上下文
- 这个文件有什么用：它把目标、提示词的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model-visible continuation prompt for one same-session goal round.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Model-visible continuation prompt for one same-session goal round.”；固定提交中扫描到的声明包括 `renderGoalRoundPrompt`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal-round-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/README.md)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/goal/goal-round-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/index.ts)、[packages/goal/goal-round-driver/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/invariant.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts)、[packages/goal/goal-round-driver/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/invariant.spec.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/plugin-apply.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/goal/goal-round-driver/README.md` 和入口，再读当前实现，沿着 `packages/goal/goal/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/goal/goal-round-driver/src/index.ts`、`packages/goal/goal-round-driver/src/invariant.ts` 确认输入输出，最后对照 `packages/examples/acp-demo/tests/acp-agent.spec.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts`、`packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `renderGoalRoundPrompt`；源码顶部原注释（英文，仅作回查线索）：Model-visible continuation prompt for one same-session goal round.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标的具体场景，包括“goal-round outcome policy”、“renders the objective, round budget, authority boundary, and completion protocol”、“quotes multiline or tag-like objective text as one unambiguous data value”、“same-session goal driving”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal-round outcome policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ScriptedAdapter`、`textResponse`、`maxTokensResponse`、`requestText`、`harness`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal-round-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1047 行；扫描到的声明包括 `ScriptedAdapter`、`textResponse`、`maxTokensResponse`、`requestText`、`harness`、`onInboxMessage`、`onClaimedMessage`、`waitForGoal`；扫描到的测试主题包括 “goal-round outcome policy”、“renders the objective, round budget, authority boundary, and completion protocol”、“quotes multiline or tag-like objective text as one unambiguous data value”、“same-session goal driving”、“admits exact numbered rounds until the durable round cap”、“never adopts activation from an already-live driver and waits for explicit resume”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal-round-driver/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/invariant.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标的具体场景，包括“goal-round-driver prompt invariants”、“reconstructs existing rounds and accepts the next canonical prompt”、“rejects a continuation whose content differs from the package renderer”、“rejects a goal round without a reconstructable active goal”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal-round-driver prompt invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `view`、`appendChange`、`appendRound`、`mount`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal-round-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal-round-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/index.ts)、[packages/goal/goal-round-driver/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/goal/goal-round-driver/src/index.ts`、`packages/goal/goal-round-driver/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `view`、`appendChange`、`appendRound`、`mount`；扫描到的测试主题包括 “goal-round-driver prompt invariants”、“reconstructs existing rounds and accepts the next canonical prompt”、“rejects a continuation whose content differs from the package renderer”、“rejects a goal round without a reconstructable active goal”、“attributes an invalid durable prefix during late loading”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal-round-driver/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tsdown.config.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理目标：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal-round-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/goal/goal-round-driver/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/client.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成目标、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Client-namespace projection of the goal domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — zero dupl...”；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/goal/goal/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/types.ts)、[packages/client/ui-conversation/src/client/skeleton/InputBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/skeleton/InputBar.tsx)、[packages/client/ui-goal/src/client/GoalBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.tsx)、[packages/client/ui-goal/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/index.ts)
- 对应测试：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-goal/tests/goalbar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goalbar.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/goal/goal/README.md` 和入口，再读当前实现，沿着 `packages/goal/goal/src/types.ts` 和 `packages/client/ui-conversation/src/client/skeleton/InputBar.tsx`、`packages/client/ui-goal/src/client/GoalBar.tsx`、`packages/client/ui-goal/src/client/index.ts` 确认输入输出，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goalbar.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Client-namespace projection of the goal domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — zero dupl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/domain.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：领域模型
- 这个文件有什么用：它表达目标、领域模型的领域状态、创建方式和约束，让存储与界面层依赖稳定语义。
- 为什么这样设计：领域规则放在模型层，存储、协议和 UI 只做转换；同一语义可以被不同入口复用，也更容易用纯数据测试。
- 文件级设计证据：源码顶部注释把它定位为“Host-side vocabulary of the goal domain: live views, durable change payloads, message attribution, replay folds, and the scoped goal/changed event. Kept separate from ./types.ts (the pure client-safe outlet) because these declarations pull dsh-agent, dsh-ll...”；固定提交中扫描到的声明包括 `GoalOperation`、`GoalSnapshotChangeMeta`、`GoalClearChangeMeta`、`GoalChangeMeta`、`GoalMessageSource`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/goal/goal/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/types.ts)、[packages/goal/goal/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/fold.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)、[examples/acp-agent/tests/goal.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/goal.snapshot.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`、`packages/goal/goal/src/types.ts` 和 `packages/goal/goal/src/fold.ts`、`packages/goal/goal/src/index.ts`、`packages/goal/goal/src/runtime.ts` 理解状态变化，最后对照 `apps/web/tests/goal-multi-turn-actions.e2e.ts`、`examples/acp-agent/tests/goal.snapshot.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 116 行；扫描到的声明包括 `GoalOperation`、`GoalSnapshotChangeMeta`、`GoalClearChangeMeta`、`GoalChangeMeta`、`GoalMessageSource`、`FoldedGoal`、`GoalChanged`、`GoalErrorCode`；源码顶部原注释（英文，仅作回查线索）：Host-side vocabulary of the goal domain: live views, durable change payloads, message attribution, replay folds, and the scoped goal/changed event. Kept separate from ./types.ts (the pure client-safe outlet) because these declarations pull dsh-agent, dsh-ll...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/fold.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：目标状态实现
- 这个文件有什么用：这个文件维护目标的领域状态、折叠或收束规则，让 Agent 可以把工作结果与目标进度关联起来。
- 为什么这样设计：目标状态与 Agent 执行分开，折叠和收束规则可以被界面、日志和工作流共同观察。
- 文件级设计证据：源码顶部注释把它定位为“Pure replay fold and strict decoder for durable goal changes.”；固定提交中扫描到的声明包括 `GoalFoldState`、`emptyGoalFoldState`、`decodeGoalChange`、`goalChangeRef`、`applyGoalChange`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/domain.ts)、[packages/goal/goal/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/runtime.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)、[examples/acp-agent/tests/goal.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/goal.snapshot.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/goal/goal/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/goal/goal/src/domain.ts`、`packages/goal/goal/src/runtime.ts` 和 `packages/goal/goal/src/index.ts`、`packages/goal/goal/src/invariant.ts` 确认输入输出，最后对照 `apps/web/tests/goal-multi-turn-actions.e2e.ts`、`examples/acp-agent/tests/goal.snapshot.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 349 行；扫描到的声明包括 `GoalFoldState`、`emptyGoalFoldState`、`decodeGoalChange`、`goalChangeRef`、`applyGoalChange`、`applyGoalEvent`、`foldGoal`、`isRecord`；源码顶部原注释（英文，仅作回查线索）：Pure replay fold and strict decoder for durable goal changes.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把目标相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Same-session goal domain: event-sourced state, compare-and-set mutations, and process-local continuation activation. @module @deepseek-ai/dsh-goal”；固定提交中扫描到的声明包括 `applyGoalProjection`、`Config`、`ResolvedConfig`、`GoalService`、`resolveMaxGoalRounds`；本地静态 import 图显示它直接依赖 10 个源文件，并被 21 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/domain.ts)、[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)
- 对应测试：[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)、[examples/acp-agent/tests/goal.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/goal.snapshot.ts)、[packages/goal/command-goal/tests/command-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/command-goal/tests/command-goal.spec.ts)、[packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/goal-round-driver.spec.ts)、[packages/goal/goal-round-driver/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal-round-driver/tests/invariant.spec.ts)、[packages/goal/goal/tests/goal.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/goal.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/goal/goal/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/goal-multi-turn-actions.e2e.ts`、`examples/acp-agent/tests/goal.snapshot.ts`、`examples/headless-agent/tests/fixtures/goal-domain/seed-goal.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/goal-multi-turn-actions.e2e.ts`、`examples/acp-agent/tests/goal.snapshot.ts`、`packages/goal/command-goal/tests/command-goal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 592 行；扫描到的声明包括 `applyGoalProjection`、`Config`、`ResolvedConfig`、`GoalService`、`resolveMaxGoalRounds`、`resolveObjective`、`resolveCreateGoal`、`resolveBlockReason`；源码顶部原注释（英文，仅作回查线索）：Same-session goal domain: event-sourced state, compare-and-set mutations, and process-local continuation activation. @module @deepseek-ai/dsh-goal。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/invariant.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查目标必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned durable goal-stream invariants. @module @deepseek-ai/dsh-goal/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`cloneState`、`applyChecked`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/fold.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/goal/goal/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/invariant.spec.ts)
- 对应测试：[packages/goal/goal/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/goal/goal/src/fold.ts`、`packages/runtime-diagnostics/invariants/src/index.ts` 和 `packages/goal/goal/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/goal/goal/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 79 行；扫描到的声明包括 `name`、`inject`、`apply`、`cloneState`、`applyChecked`；源码顶部原注释（英文，仅作回查线索）：Package-owned durable goal-stream invariants. @module @deepseek-ai/dsh-goal/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/runtime.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与目标、运行时的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Runtime constructors and protocol constants for the goal domain.”；固定提交中扫描到的声明包括 `GOAL_CHANGE_VERSION`、`GoalId`、`GoalError`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/goal/goal/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/domain.ts)、[packages/goal/goal/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/goal/goal/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/fold.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)、[examples/acp-agent/tests/goal.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/goal.snapshot.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/goal/goal/README.md` 和入口，再读当前实现，沿着 `packages/goal/goal/src/domain.ts`、`packages/goal/goal/src/types.ts`、`packages/llm/llm/src/index.ts` 和 `packages/goal/goal/src/fold.ts`、`packages/goal/goal/src/index.ts` 确认输入输出，最后对照 `apps/web/tests/goal-multi-turn-actions.e2e.ts`、`examples/acp-agent/tests/goal.snapshot.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `GOAL_CHANGE_VERSION`、`GoalId`、`GoalError`；源码顶部原注释（英文，仅作回查线索）：Runtime constructors and protocol constants for the goal domain.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/types.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述目标中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Pure types of the goal domain: the ONE home of the goal projection-key declaration plus the durable payload vocabulary it carries, free of this package's host-side imports (cordis events, dsh-agent, dsh-llm, the service). Two namespace projections serve it ...”；固定提交中扫描到的声明包括 `GoalId`、`GoalRef`、`CreateGoalRequest`、`CreateGoalResult`、`EditGoalRequest`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/goal/goal/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/client.ts)、[packages/goal/goal/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/domain.ts)、[packages/goal/goal/src/fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/fold.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)、[examples/acp-agent/tests/goal.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/goal.snapshot.ts)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/input-matrix.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-matrix.client.spec.tsx)、[packages/client/ui-conversation/tests/input-scenarios.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-scenarios.client.spec.tsx)、[packages/client/ui-conversation/tests/skeleton.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/skeleton.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/goal/goal/README.md`、入口和消费者，再读当前契约，沿着 `packages/goal/goal/src/client.ts`、`packages/goal/goal/src/domain.ts`、`packages/goal/goal/src/fold.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/goal-multi-turn-actions.e2e.ts`、`examples/acp-agent/tests/goal.snapshot.ts`、`packages/client/ui-conversation/tests/input-bar.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `GoalId`、`GoalRef`、`CreateGoalRequest`、`CreateGoalResult`、`EditGoalRequest`、`GoalPhase`、`GoalBlockReason`、`GoalSnapshot`；源码顶部原注释（英文，仅作回查线索）：Pure types of the goal domain: the ONE home of the goal projection-key declaration plus the durable payload vocabulary it carries, free of this package's host-side imports (cordis events, dsh-agent, dsh-llm, the service). Two namespace projections serve it ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/tests/goal.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/goal.e2e.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标的具体场景，包括“goal domain through a real cordis.yml and headless process”、“persists the Loader-mounted snapshot without starting a goal round”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal domain through a real cordis.yml and headless process”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `jsonlFiles`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/goal/goal/src/index.ts`、`packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `jsonlFiles`；扫描到的测试主题包括 “goal domain through a real cordis.yml and headless process”、“persists the Loader-mounted snapshot without starting a goal round”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/tests/goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/goal.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标的具体场景，包括“GoalService creation and replay”、“applies the configured default and writes one durable goal change”、“uses 256 rounds by default and validates create input inside create”、“also resolves the default when constructed directly without Cordis config normalization”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“GoalService creation and replay”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `nextTurn`、`appendInjection`、`stubAgentForSession`、`stubAgent`、`harness`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/goal/goal/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 796 行；扫描到的声明包括 `nextTurn`、`appendInjection`、`stubAgentForSession`、`stubAgent`、`harness`、`appendRound`、`snapshotChange`、`appendChange`；扫描到的测试主题包括 “GoalService creation and replay”、“applies the configured default and writes one durable goal change”、“uses 256 rounds by default and validates create input inside create”、“also resolves the default when constructed directly without Cordis config normalization”、“rejects invalid direct configuration”、“restores a seeded goal and rounds with activation disarmed”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/invariant.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标的具体场景，包括“goal stream invariants”、“accepts canonical goal snapshots and sequential admitted rounds”、“rejects a malformed goal change before committing it and keeps the fold reusable”、“reconstructs an existing durable goal before checking later rounds”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal stream invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)、[packages/goal/goal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/goal/goal/src/index.ts`、`packages/goal/goal/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “goal stream invariants”、“accepts canonical goal snapshots and sequential admitted rounds”、“rejects a malformed goal change before committing it and keeps the fold reusable”、“reconstructs an existing durable goal before checking later rounds”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/projection.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标、状态投影的具体场景，包括“goal projection unit”、“serves null before the first create”、“serves the whole current goal after create and tracks mutations last-wins”、“returns to null after a clear tombstone”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal projection unit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The goal projection unit: mounting GoalService beside the registry serves the current whole goal on the history tail page with a consistent asOfSeq; before the first create the value is null; a clear tombstone returns it to null; a composition without the g...”；固定提交中扫描到的声明包括 `liveAgent`、`harness`、`seedMessage`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/goal/goal/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 203 行；扫描到的声明包括 `liveAgent`、`harness`、`seedMessage`；扫描到的测试主题包括 “goal projection unit”、“serves null before the first create”、“serves the whole current goal after create and tracks mutations last-wins”、“returns to null after a clear tombstone”、“does not let inbox changes revive a cleared goal”、“ignores non-goal and malformed goal-shaped events fail-soft (same reference)”；源码顶部原注释（英文，仅作回查线索）：The goal projection unit: mounting GoalService beside the registry serves the current whole goal on the history tail page with a consistent asOfSeq; before the first create the value is null; a clear tombstone returns it to null; a composition without the g...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/goal/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tsdown.config.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理目标：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/goal/goal/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/tool-goal/src/authority.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/src/authority.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：策略与权限边界
- 这个文件有什么用：它集中判断目标、工具、授权是否允许以及需要哪种授权，让调用方不必各自复制权限规则。
- 为什么这样设计：权限判断集中后，所有调用路径可以共享同一条拒绝规则；策略变化也不会要求每个工具、路由和界面分别修补。
- 文件级设计证据：源码顶部注释把它定位为“Execution-time authority checks for the model-facing goal tools.”；固定提交中扫描到的声明包括 `GoalToolExecution`、`GoalToolAuthority`、`goalToolExecution`、`requireDirectHuman`、`completionAuthority`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/tool-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/goal/tool-goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/goal/tool-goal/tests/tool-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/tests/tool-goal.spec.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/plugin-apply.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/goal/tool-goal/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts` 和 `packages/goal/tool-goal/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `GoalToolExecution`、`GoalToolAuthority`、`goalToolExecution`、`requireDirectHuman`、`completionAuthority`、`reject`、`openTurn`、`hasDirectHumanInput`；源码顶部原注释（英文，仅作回查线索）：Execution-time authority checks for the model-facing goal tools.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/tool-goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/src/index.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把目标、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Model-facing get_goal, create_goal, and update_goal tools over the persisted same-session goal domain. @module @deepseek-ai/dsh-tool-goal”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`guidance`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/tool-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/src/index.ts)、[packages/examples/agent-spine-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/src/index.ts)
- 对应测试：[packages/goal/tool-goal/tests/tool-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/tests/tool-goal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/goal/tool-goal/README.md`、入口和消费者，再读当前契约，沿着 `packages/examples/agent-spine-demo/src/index.ts`、`packages/goal/tool-goal/tests/tool-goal.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/goal/tool-goal/tests/tool-goal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 338 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`guidance`、`resolveConfig`、`hasText`、`hasRoundCap`；源码顶部原注释（英文，仅作回查线索）：Model-facing get_goal, create_goal, and update_goal tools over the persisted same-session goal domain. @module @deepseek-ai/dsh-tool-goal。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/tool-goal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/src/invariant.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查目标、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tool-goal. @module @deepseek-ai/dsh-tool-goal/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/tool-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-goal. @module @deepseek-ai/dsh-tool-goal/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/tool-goal/src/wrapup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/src/wrapup.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供目标、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model-visible wrap-up instruction for a terminal autonomous goal update.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Model-visible wrap-up instruction for a terminal autonomous goal update.”；固定提交中扫描到的声明包括 `renderWrapupContext`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/tool-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/goal/tool-goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/goal/tool-goal/tests/tool-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/tests/tool-goal.spec.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/plugin-apply.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/goal/tool-goal/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts` 和 `packages/goal/tool-goal/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `renderWrapupContext`；源码顶部原注释（英文，仅作回查线索）：Model-visible wrap-up instruction for a terminal autonomous goal update.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/goal/tool-goal/tests/tool-goal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/tests/tool-goal.spec.ts)

- 所属层：packages/goal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查目标、工具的具体场景，包括“goal tool registration and presentation”、“registers three exclusive tools plus configured guidance and disposes all contributions”、“uses args-only generic render intent and soft-fails malformed replay args”、“has the Loader-safe namespace export shape”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal tool registration and presentation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stubAgent`、`openTurn`、`closeTurn`、`harness`、`execute`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/goal/tool-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/tool-goal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 612 行；扫描到的声明包括 `stubAgent`、`openTurn`、`closeTurn`、`harness`、`execute`、`resultJson`、`resultGoal`；扫描到的测试主题包括 “goal tool registration and presentation”、“registers three exclusive tools plus configured guidance and disposes all contributions”、“uses args-only generic render intent and soft-fails malformed replay args”、“has the Loader-safe namespace export shape”、“fails invalid direct config before registering anything”、“resolves the direct-apply default before registration”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
