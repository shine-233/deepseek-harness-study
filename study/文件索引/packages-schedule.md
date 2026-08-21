# 源文件索引：packages/schedule

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 16 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：领域模型
- 这个文件有什么用：它表达定时任务、领域模型的领域状态、创建方式和约束，让存储与界面层依赖稳定语义。
- 为什么这样设计：领域规则放在模型层，存储、协议和 UI 只做转换；同一语义可以被不同入口复用，也更容易用纯数据测试。
- 文件级设计证据：源码顶部注释把它定位为“Strict Schedule decoding, replay, time validation, and framing. @module @deepseek-ai/dsh-schedule”；固定提交中扫描到的声明包括 `SCHEDULE_CHANGE_VERSION`、`MIN_EVERY_INTERVAL_SECONDS`、`ScheduleLogError`、`ScheduleInputError`、`FoldedSchedules`；本地静态 import 图显示它直接依赖 2 个源文件，并被 9 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/schedule/schedule/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/types.ts)、[packages/schedule/schedule/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/index.ts)、[packages/schedule/schedule/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/invariant.ts)
- 对应测试：[packages/schedule/schedule/tests/domain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/domain.spec.ts)、[packages/schedule/schedule/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/invariant.spec.ts)、[packages/schedule/schedule/tests/jsonl-restart.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/jsonl-restart.spec.ts)、[packages/schedule/schedule/tests/recurrence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/recurrence.spec.ts)、[packages/schedule/schedule/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/runtime.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/schedule/schedule/src/types.ts` 和 `packages/schedule/schedule/src/index.ts`、`packages/schedule/schedule/src/invariant.ts`、`packages/schedule/schedule/src/runtime.ts` 理解状态变化，最后对照 `packages/schedule/schedule/tests/domain.spec.ts`、`packages/schedule/schedule/tests/invariant.spec.ts`、`packages/schedule/schedule/tests/jsonl-restart.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 807 行；扫描到的声明包括 `SCHEDULE_CHANGE_VERSION`、`MIN_EVERY_INTERVAL_SECONDS`、`ScheduleLogError`、`ScheduleInputError`、`FoldedSchedules`、`EveryOccurrence`、`ScheduleId`、`canonicalizeTimeZone`；源码顶部原注释（英文，仅作回查线索）：Strict Schedule decoding, replay, time validation, and framing. @module @deepseek-ai/dsh-schedule。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/index.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把定时任务相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent-scoped durable one-shot and fixed-rate reminders over the session event log. @module @deepseek-ai/dsh-schedule”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 7 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)、[packages/schedule/schedule/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/runtime.ts)、[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)
- 对应测试：[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[packages/schedule/schedule/tests/jsonl-restart.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/jsonl-restart.spec.ts)、[packages/schedule/schedule/tests/plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/plugin.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/schedule/schedule/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/schedule-after.e2e.ts`、`packages/schedule/schedule/tests/jsonl-restart.spec.ts`、`packages/schedule/schedule/tests/plugin.spec.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/schedule-after.e2e.ts`、`packages/schedule/schedule/tests/jsonl-restart.spec.ts`、`packages/schedule/schedule/tests/plugin.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Agent-scoped durable one-shot and fixed-rate reminders over the session event log. @module @deepseek-ai/dsh-schedule。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/invariant.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查定时任务必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned strict Schedule stream invariant. @module @deepseek-ai/dsh-schedule/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`validate`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)、[packages/schedule/schedule/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/invariant.spec.ts)
- 对应测试：[packages/schedule/schedule/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`packages/schedule/schedule/src/domain.ts` 和 `packages/schedule/schedule/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/schedule/schedule/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `name`、`inject`、`apply`、`validate`；源码顶部原注释（英文，仅作回查线索）：Package-owned strict Schedule stream invariant. @module @deepseek-ai/dsh-schedule/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/persistence.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/persistence.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：持久化边界
- 这个文件有什么用：它负责定时任务、持久化在内存和磁盘格式之间的转换，把写入、读取、校验和崩溃恢复集中到可替换的边界。
- 为什么这样设计：存储格式和业务对象分开，未来可以替换 JSONL、SQLite 或其他后端而不重写 Session 的核心语义。
- 文件级设计证据：源码顶部注释把它定位为“Schedule-owned use of the shared session durability barrier.”；固定提交中扫描到的声明包括 `SchedulePersistenceError`、`flushSchedulePersistence`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/schedule/schedule/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/runtime.ts)、[packages/schedule/schedule/src/tools.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/tools.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/schedule-after.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/schedule/schedule/tests/jsonl-restart.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/jsonl-restart.spec.ts)、[packages/schedule/schedule/tests/plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/plugin.spec.ts)、[packages/schedule/schedule/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/runtime.spec.ts)、[packages/schedule/schedule/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/schedule/schedule/src/runtime.ts`、`packages/schedule/schedule/src/tools.ts` 理解状态变化，最后对照 `apps/web/tests/schedule-after.e2e.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/schedule/schedule/tests/jsonl-restart.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `SchedulePersistenceError`、`flushSchedulePersistence`；源码顶部原注释（英文，仅作回查线索）：Schedule-owned use of the shared session durability barrier.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/runtime.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与定时任务、运行时的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Disposable live timer projection for one exact root agent. @module @deepseek-ai/dsh-schedule”；固定提交中扫描到的声明包括 `MAX_TIMER_DELAY_MS`、`ScheduleRuntime`、`dueDecision`、`renderThrown`；本地静态 import 图显示它直接依赖 7 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)、[packages/schedule/schedule/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/index.ts)
- 对应测试：[packages/schedule/schedule/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/runtime.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/schedule/schedule/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/schedule/schedule/src/domain.ts` 和 `packages/schedule/schedule/src/index.ts`、`packages/schedule/schedule/tests/runtime.spec.ts` 确认输入输出，最后对照 `packages/schedule/schedule/tests/runtime.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 324 行；扫描到的声明包括 `MAX_TIMER_DELAY_MS`、`ScheduleRuntime`、`dueDecision`、`renderThrown`；源码顶部原注释（英文，仅作回查线索）：Disposable live timer projection for one exact root agent. @module @deepseek-ai/dsh-schedule。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/tools.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/tools.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：调度实现
- 这个文件有什么用：这个文件实现定时任务或事务调度的一项状态转换，集中处理时间、提交和收束边界。
- 为什么这样设计：调度事务的状态转换集中管理，时间触发和提交失败不会被每个调用者分别解释。
- 文件级设计证据：源码顶部注释把它定位为“Agent-scoped Schedule management tools over the durable session fold. @module @deepseek-ai/dsh-schedule”；固定提交中扫描到的声明包括 `registerScheduleTools`、`basicErrorSchema`、`renderValue`、`present`、`internalError`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/schedule/schedule/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/index.ts)
- 对应测试：[packages/schedule/schedule/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/schedule/schedule/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/schedule/schedule/src/index.ts`、`packages/schedule/schedule/tests/tools.spec.ts` 确认输入输出，最后对照 `packages/schedule/schedule/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 467 行；扫描到的声明包括 `registerScheduleTools`、`basicErrorSchema`、`renderValue`、`present`、`internalError`、`cancellationPlaceholder`、`runCancellableScheduleTransaction`、`corruptLogError`；源码顶部原注释（英文，仅作回查线索）：Agent-scoped Schedule management tools over the durable session fold. @module @deepseek-ai/dsh-schedule。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/transaction.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/transaction.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：调度实现
- 这个文件有什么用：这个文件实现定时任务或事务调度的一项状态转换，集中处理时间、提交和收束边界。
- 为什么这样设计：调度事务的状态转换集中管理，时间触发和提交失败不会被每个调用者分别解释。
- 文件级设计证据：源码顶部注释把它定位为“Agent-scoped serialization for Schedule reads and durable mutations.”；固定提交中扫描到的声明包括 `runScheduleTransaction`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/schedule/schedule/src/runtime.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/runtime.ts)、[packages/schedule/schedule/src/tools.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/tools.ts)、[packages/schedule/schedule/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/tools.spec.ts)
- 对应测试：[packages/schedule/schedule/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/schedule/schedule/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts` 和 `packages/schedule/schedule/src/runtime.ts`、`packages/schedule/schedule/src/tools.ts`、`packages/schedule/schedule/tests/tools.spec.ts` 确认输入输出，最后对照 `packages/schedule/schedule/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `runScheduleTransaction`；源码顶部原注释（英文，仅作回查线索）：Agent-scoped serialization for Schedule reads and durable mutations.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/types.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述定时任务中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Durable and model-facing Schedule value types. @module @deepseek-ai/dsh-schedule”；固定提交中扫描到的声明包括 `ScheduleId`、`AfterScheduleRecord`、`AtScheduleRecord`、`EveryScheduleRecord`、`LocalAtInput`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)、[packages/schedule/schedule/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/index.ts)
- 对应测试：[packages/schedule/schedule/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/schedule/schedule/README.md`、入口和消费者，再读当前契约，沿着 `packages/schedule/schedule/src/domain.ts`、`packages/schedule/schedule/src/index.ts`、`packages/schedule/schedule/src/runtime.ts` 看它怎样约束运行时，最后对照 `packages/schedule/schedule/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 221 行；扫描到的声明包括 `ScheduleId`、`AfterScheduleRecord`、`AtScheduleRecord`、`EveryScheduleRecord`、`LocalAtInput`、`AtInput`、`OneShotScheduleRecord`、`ScheduleRecord`；源码顶部原注释（英文，仅作回查线索）：Durable and model-facing Schedule value types. @module @deepseek-ai/dsh-schedule。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/domain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/domain.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务、领域模型的具体场景，包括“version-1 Schedule decoding and folding”、“decodes and freezes each exact v1 operation”、“folds active records in create order and rejects invalid transitions”、“folds only the fork-owned suffix and validates its boundary”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“version-1 Schedule decoding and folding”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `scheduleEvent`、`createData`、`atCreateData`、`everyCreateData`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/schedule/schedule/src/domain.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 478 行；扫描到的声明包括 `scheduleEvent`、`createData`、`atCreateData`、`everyCreateData`；扫描到的测试主题包括 “version-1 Schedule decoding and folding”、“decodes and freezes each exact v1 operation”、“folds active records in create order and rejects invalid transitions”、“folds only the fork-owned suffix and validates its boundary”、“allocates a readable id without reusing ended or colliding ids”、“after record and model framing”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/invariant.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务的具体场景，包括“Schedule package invariant”、“accepts valid candidates and rejects invalid transitions before append”、“requires a decision time for Every dispatch and advances the live stream”、“rejects a malformed existing owned stream during companion setup”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Schedule package invariant”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `event`、`create`、`createEvery`、`harness`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`packages/schedule/schedule/src/domain.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 124 行；扫描到的声明包括 `event`、`create`、`createEvery`、`harness`；扫描到的测试主题包括 “Schedule package invariant”、“accepts valid candidates and rejects invalid transitions before append”、“requires a decision time for Every dispatch and advances the live stream”、“rejects a malformed existing owned stream during companion setup”、“rejects a malformed seeded session created after companion setup”、“ignores inherited Schedule events before a fork seed boundary”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/jsonl-restart.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/jsonl-restart.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务的具体场景，包括“Schedule production JSONL restart”、“resumes one overdue reminder exactly once across fresh runtime mounts”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Schedule production JSONL restart”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Production JSONL restart evidence through the real Agent resume lifecycle.”；固定提交中扫描到的声明包括 `RecordingAdapter`、`mountPersistence`、`mountRuntime`、`disposeContext`、`waitForDispatch`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 138 行；扫描到的声明包括 `RecordingAdapter`、`mountPersistence`、`mountRuntime`、`disposeContext`、`waitForDispatch`、`settleCurrentTasks`；扫描到的测试主题包括 “Schedule production JSONL restart”、“resumes one overdue reminder exactly once across fresh runtime mounts”；源码顶部原注释（英文，仅作回查线索）：Production JSONL restart evidence through the real Agent resume lifecycle.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/plugin.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务的具体场景，包括“Schedule plugin composition”、“has the Loader-safe function-plugin export shape”、“installs only on future root agents and unwinds on plugin disposal”、“does not checkpoint unrelated idle sessions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Schedule plugin composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `PersistenceProbe`、`harness`、`settle`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `PersistenceProbe`、`harness`、`settle`；扫描到的测试主题包括 “Schedule plugin composition”、“has the Loader-safe function-plugin export shape”、“installs only on future root agents and unwinds on plugin disposal”、“does not checkpoint unrelated idle sessions”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/recurrence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/recurrence.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务的具体场景，包括“fixed-rate recurrence properties”、“keeps latest-only runtime calculation and durable folding on the creation anchor”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“fixed-rate recurrence properties”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `event`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/schedule/schedule/src/domain.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/src/domain.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/schedule/schedule/src/domain.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `event`；扫描到的测试主题包括 “fixed-rate recurrence properties”、“keeps latest-only runtime calculation and durable folding on the creation anchor”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/runtime.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务、运行时的具体场景，包括“Schedule timer and admission runtime”、“segments waits beyond the Node timer limit and rechecks the wall clock”、“does not fire early after a wall-clock rollback”、“treats a forward jump as overdue and dispatches once”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Schedule timer and admission runtime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`appendAfter`、`appendEvery`、`settle`、`runtimeFor`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 798 行；扫描到的声明包括 `harness`、`appendAfter`、`appendEvery`、`settle`、`runtimeFor`；扫描到的测试主题包括 “Schedule timer and admission runtime”、“segments waits beyond the Node timer limit and rechecks the wall clock”、“does not fire early after a wall-clock rollback”、“treats a forward jump as overdue and dispatches once”、“keeps an overdue record active until whenIdle permits maintenance”、“orders preflight, maintenance, framing followup, dispatch, release, and barrier”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tests/tools.spec.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查定时任务、工具的具体场景，包括“Schedule tool protocol”、“registers three exclusive generic tools and disposes them together”、“rolls back earlier tool registrations when a later name conflicts”、“rejects shape-known invalid create input before persistence”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Schedule tool protocol”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stubAgent`、`harness`、`execute`、`value`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 573 行；扫描到的声明包括 `stubAgent`、`harness`、`execute`、`value`；扫描到的测试主题包括 “Schedule tool protocol”、“registers three exclusive generic tools and disposes them together”、“rolls back earlier tool registrations when a later name conflicts”、“rejects shape-known invalid create input before persistence”、“creates, lists, marks overdue, deletes, and never reuses an id”、“rejects an empty or padded delete id before persistence”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/schedule/schedule/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/tsdown.config.ts)

- 所属层：packages/schedule：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理定时任务：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/schedule/schedule/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/schedule/schedule/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/schedule/schedule/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
