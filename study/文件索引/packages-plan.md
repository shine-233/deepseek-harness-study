# 源文件索引：packages/plan

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 8 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/plan/plan-mode/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/client.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Client-namespace projection of the plan domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — zero dupl...”；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/plan/plan-mode/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/types.ts)、[packages/client/ui-conversation/src/client/skeleton/InputBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/skeleton/InputBar.tsx)、[packages/client/ui-plan/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-plan/src/client/index.ts)、[packages/client/ui-plan/tests/plan-mode-control.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-plan/tests/plan-mode-control.client.spec.tsx)
- 对应测试：[packages/client/ui-plan/tests/plan-mode-control.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-plan/tests/plan-mode-control.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/plan/plan-mode/README.md` 和入口，再读当前实现，沿着 `packages/plan/plan-mode/src/types.ts` 和 `packages/client/ui-conversation/src/client/skeleton/InputBar.tsx`、`packages/client/ui-plan/src/client/index.ts`、`packages/client/ui-plan/tests/plan-mode-control.client.spec.tsx` 确认输入输出，最后对照 `packages/client/ui-plan/tests/plan-mode-control.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Client-namespace projection of the plan domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — zero dupl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/index.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/plan/plan-mode` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Plan mode is logged per-agent collaboration state: while active, a deployment-owned guidance section is included in each model request, and exit_plan_mode presents the completed plan for user review, while the /plan off command lets a user leave directly. S...”；固定提交中扫描到的声明包括 `EXIT_PLAN_MODE`、`PlanModeConfig`、`resolveConfig`、`foldPlanMode`、`PlanModeController`；本地静态 import 图显示它直接依赖 10 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)
- 对应测试：[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[packages/plan/plan-mode/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/integration.spec.ts)、[packages/plan/plan-mode/tests/plan-mode.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/plan-mode.spec.ts)、[packages/plan/plan-mode/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/plan/plan-mode/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/plan-control-row.e2e.ts`、`packages/plan/plan-mode/tests/integration.spec.ts`、`packages/plan/plan-mode/tests/plan-mode.spec.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/plan-control-row.e2e.ts`、`packages/plan/plan-mode/tests/integration.spec.ts`、`packages/plan/plan-mode/tests/plan-mode.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 514 行；扫描到的声明包括 `EXIT_PLAN_MODE`、`PlanModeConfig`、`resolveConfig`、`foldPlanMode`、`PlanModeController`、`firstHeading`、`hasOpenTurn`、`planModeAtLastHeader`；源码顶部原注释（英文，仅作回查线索）：Plan mode is logged per-agent collaboration state: while active, a deployment-owned guidance section is included in each model request, and exit_plan_mode presents the completed plan for user review, while the /plan off command lets a user leave directly. S...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/invariant.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/plan/plan-mode` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned durable plan-mode invariants. @module @deepseek-ai/dsh-plan-mode/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`validateEvent`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/plan/plan-mode/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/invariant.spec.ts)
- 对应测试：[packages/plan/plan-mode/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/plan/plan-mode/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/plan/plan-mode/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateEvent`；源码顶部原注释（英文，仅作回查线索）：Package-owned durable plan-mode invariants. @module @deepseek-ai/dsh-plan-mode/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/types.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 `packages/plan/plan-mode` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Pure types of the plan domain: the ONE home of the plan projection-key declaration, free of this package's host-side value imports (cordis service, dsh-tools, dsh-agent). Two namespace projections serve it — ./types for host consumers, ./client for client a...”；固定提交中扫描到的声明包括 `PlanProjection`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/plan/plan-mode/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/client.ts)、[packages/plan/plan-mode/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/plan-control-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/plan-control-row.e2e.ts)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/input-matrix.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-matrix.client.spec.tsx)、[packages/client/ui-conversation/tests/input-scenarios.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-scenarios.client.spec.tsx)、[packages/client/ui-conversation/tests/skeleton.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/skeleton.client.spec.tsx)、[packages/client/ui-plan/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-plan/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/plan/plan-mode/README.md`、入口和消费者，再读当前契约，沿着 `packages/plan/plan-mode/src/client.ts`、`packages/plan/plan-mode/src/index.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/plan-control-row.e2e.ts`、`packages/client/ui-conversation/tests/input-bar.client.spec.tsx`、`packages/client/ui-conversation/tests/input-matrix.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `PlanProjection`；源码顶部原注释（英文，仅作回查线索）：Pure types of the plan domain: the ONE home of the plan projection-key declaration, free of this package's host-side value imports (cordis service, dsh-tools, dsh-agent). Two namespace projections serve it — ./types for host consumers, ./client for client a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/integration.spec.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“integration”写出可重复运行的断言，覆盖的场景包括“plan mode through the agent loop”、“a pre-turn set() makes the FIRST header plan-shaped, and a non-shell call is guidance-c...”、“a user flip between turns lands at the boundary: one notice and a changed header with s...”、“a mode flip at error settlement waits until the step after a same-step retry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“plan mode through the agent loop”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`findEvent`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 180 行；扫描到的声明包括 `harness`、`waitForIdle`、`findEvent`；扫描到的测试主题包括 “plan mode through the agent loop”、“a pre-turn set() makes the FIRST header plan-shaped, and a non-shell call is guidance-constrained only”、“a user flip between turns lands at the boundary: one notice and a changed header with stable tool schemas”、“a mode flip at error settlement waits until the step after a same-step retry”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/invariant.spec.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“invariant”写出可重复运行的断言，覆盖的场景包括“plan-mode stream invariants”、“accepts either boolean state”、“accepts standalone plan state between turns (the idle immediate commit)”、“ignores unrelated dispatches and session events”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“plan-mode stream invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`event`、`emitTurnStart`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/plan/plan-mode/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/plan/plan-mode/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `setup`、`event`、`emitTurnStart`；扫描到的测试主题包括 “plan-mode stream invariants”、“accepts either boolean state”、“accepts standalone plan state between turns (the idle immediate commit)”、“ignores unrelated dispatches and session events”、“rejects invalid existing state on late registration”、“replays enclosed existing plan state through its closing boundary”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/tests/plan-mode.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/plan-mode.spec.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“plan-mode”写出可重复运行的断言，覆盖的场景包括“resolveConfig”、“requires string, non-empty plan instructions”、“returns a detached plan config”、“rejects fields outside the plan policy config”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveConfig”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `agentWithSession`、`assembleFor`、`setup`、`boundary`、`openTurn`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/code-runtime/code-runtime/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/code-runtime/code-runtime/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1119 行；扫描到的声明包括 `agentWithSession`、`assembleFor`、`setup`、`boundary`、`openTurn`、`closeTurn`、`header`、`noticeTexts`；扫描到的测试主题包括 “resolveConfig”、“requires string, non-empty plan instructions”、“returns a detached plan config”、“rejects fields outside the plan policy config”、“foldPlanMode”、“folds an empty log to inactive and takes the last plan/mode otherwise”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/plan/plan-mode/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/tests/projection.spec.ts)

- 所属层：packages/plan：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查状态投影的具体场景，包括“plan projection unit”、“serves inactive/not-pending for the empty log”、“a logged /plan selection reads pending until plan/mode records it”、“drops a plan selection when its command settles with an error”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“plan projection unit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The plan projection unit (session-projection RFC's complete example): a event fold over the session log. command/run records named plan with recorded input set the candidate target (off → false, anything else → true); command/done keeps successful candidate...”；固定提交中扫描到的声明包括 `harness`、`runPlanCommand`、`settlePlanCommand`、`commitPlanMode`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/plan/plan-mode/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/plan/plan-mode/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 153 行；扫描到的声明包括 `harness`、`runPlanCommand`、`settlePlanCommand`、`commitPlanMode`；扫描到的测试主题包括 “plan projection unit”、“serves inactive/not-pending for the empty log”、“a logged /plan selection reads pending until plan/mode records it”、“drops a plan selection when its command settles with an error”、“folds”、“a /plan message-argument selection targets plan mode”；源码顶部原注释（英文，仅作回查线索）：The plan projection unit (session-projection RFC's complete example): a event fold over the session log. command/run records named plan with recorded input set the candidate target (off → false, anything else → true); command/done keeps successful candidate...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
