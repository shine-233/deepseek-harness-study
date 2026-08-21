# 源文件索引：packages/hooks

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 35 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/hooks/hook-protocol/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/codec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：格式编解码
- 这个文件有什么用：它解析 hook 进程的退出码、stdout 和 stderr，把结构化 JSON 或纯文本统一映射成 HookOutput；退出码 2 表示阻断，其他非零退出表示非阻断错误。
- 为什么这样设计：Hook 是独立进程，退出码、结构化 stdout、纯文本 stdout 和 stderr 都可能表达结果；统一 codec 后，桥接层只处理已经规范化的 HookOutput，不必各自解释进程细节。
- 文件级设计证据：源码顶部注释把它定位为“Decode hook process outcomes for both dialects. Exit 0 may carry structured JSON or plain stdout; exit 2 blocks with stderr as the reason; every other exit is a non-blocking error. Bridges decide which recognized fields apply. @module @deepseek-ai/dsh-hook-...”；固定提交中扫描到的声明包括 `parseHookOutput`、`str`、`bool`、`obj`、`topLevelDecisionOf`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)、[packages/hooks/hook-protocol/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/runner.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md` 和入口，再读当前实现，沿着 `packages/hooks/hook-protocol/src/types.ts` 和 `packages/hooks/hook-protocol/src/index.ts`、`packages/hooks/hook-protocol/src/runner.ts` 确认输入输出，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `parseHookOutput`、`str`、`bool`、`obj`、`topLevelDecisionOf`、`permissionDecisionOf`、`applyStructured`；源码顶部原注释（英文，仅作回查线索）：Decode hook process outcomes for both dialects. Exit 0 may carry structured JSON or plain stdout; exit 2 blocks with stderr as the reason; every other exit is a non-blocking error. Bridges decide which recognized fields apply. @module @deepseek-ai/dsh-hook-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/detached.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/detached.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：钩子协议实现
- 这个文件有什么用：这个文件实现钩子匹配、合并、分发或生命周期的一部分，让外部自动化可以接入而不复制主流程。
- 为什么这样设计：钩子协议独立于具体宿主，匹配和合并规则可以被多个入口复用，外部自动化也不必复制主流程。
- 文件级设计证据：源码顶部注释把它定位为“Quiescence tracking for emit-shaped hook runs that no extension point awaits. Bridges track the run plus its continuation, pass the tracker signal into execution, and drain on disposal so no process or late callback outlives the fiber. @module @deepseek-ai/...”；固定提交中扫描到的声明包括 `DetachedRuns`、`createDetachedRuns`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/hooks/hook-protocol/src/index.ts` 确认输入输出，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `DetachedRuns`、`createDetachedRuns`；源码顶部原注释（英文，仅作回查线索）：Quiescence tracking for emit-shaped hook runs that no extension point awaits. Bridges track the run plus its continuation, pass the tracker signal into execution, and drain on disposal so no process or late callback outlives the fiber. @module @deepseek-ai/...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/events.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出钩子、协议、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：源码顶部注释把它定位为“Append helpers for durable, log-only hook events. They carry no surface intent and must remain turn-enclosed and invoked/result paired. Mid-turn hook points satisfy that boundary; SessionStart records injected context instead and does not append hook  outsi...”；固定提交中扫描到的声明包括 `HookInvocation`、`HookResultRecord`、`DEFAULT_STDERR_SUMMARY_MAX_CHARS`、`summarizeStderr`、`appendHookInvoked`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md`、入口和消费者，再读当前契约，沿着 `packages/hooks/hook-protocol/src/index.ts` 看它怎样约束运行时，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `HookInvocation`、`HookResultRecord`、`DEFAULT_STDERR_SUMMARY_MAX_CHARS`、`summarizeStderr`、`appendHookInvoked`、`appendHookResult`；源码顶部原注释（英文，仅作回查线索）：Append helpers for durable, log-only hook events. They carry no surface intent and must remain turn-enclosed and invoked/result paired. Mid-turn hook points satisfy that boundary; SessionStart records injected context instead and does not append hook  outsi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把钩子、协议相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared, non-plugin hook protocol library: matching, command execution and decoding, restrictive outcome merging, durable event helpers, and detached run quiescence. Claude Code and Codex bridges own their distinct payloads, environment rules, matcher mode, ...”；本地静态 import 图显示它直接依赖 7 个源文件，并被 10 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/codec.ts)、[packages/hooks/hook-protocol/src/detached.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/detached.ts)、[packages/hooks/hook-protocol/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/events.ts)、[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)
- 对应测试：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md`、入口和消费者，再读当前契约，沿着 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts` 看它怎样约束运行时，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；源码顶部原注释（英文，仅作回查线索）：Shared, non-plugin hook protocol library: matching, command execution and decoding, restrictive outcome merging, durable event helpers, and detached run quiescence. Claude Code and Codex bridges own their distinct payloads, environment rules, matcher mode, ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/invariant.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查钩子、协议必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned hook invocation/result stream invariants. @module @deepseek-ai/dsh-hook-protocol/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`hookKey`、`validateHookEvent`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/hooks/hook-protocol/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/invariant.spec.ts)
- 对应测试：[packages/hooks/hook-protocol/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/hooks/hook-protocol/src/types.ts`、`packages/runtime-diagnostics/invariants/src/index.ts` 和 `packages/hooks/hook-protocol/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/hooks/hook-protocol/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 121 行；扫描到的声明包括 `name`、`inject`、`apply`、`hookKey`、`validateHookEvent`、`applyHookTransition`；源码顶部原注释（英文，仅作回查线索）：Package-owned hook invocation/result stream invariants. @module @deepseek-ai/dsh-hook-protocol/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/matcher.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/matcher.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：钩子协议实现
- 这个文件有什么用：这个文件实现钩子匹配、合并、分发或生命周期的一部分，让外部自动化可以接入而不复制主流程。
- 为什么这样设计：钩子协议独立于具体宿主，匹配和合并规则可以被多个入口复用，外部自动化也不必复制主流程。
- 文件级设计证据：源码顶部注释把它定位为“Matcher shared by both hook dialects. Claude treats alphanumeric/underscore/ pipe patterns as literal alternatives and other patterns as regex; Codex treats every non-empty pattern as an unanchored regex. Missing, empty, and * match all. Runtime matching co...”；固定提交中扫描到的声明包括 `matcherDiagnostic`、`matchesMatcher`、`isMatchAll`、`compileRegex`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md` 和入口，再读当前实现，沿着 `packages/hooks/hook-protocol/src/types.ts` 和 `packages/hooks/hook-protocol/src/index.ts` 确认输入输出，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `matcherDiagnostic`、`matchesMatcher`、`isMatchAll`、`compileRegex`；源码顶部原注释（英文，仅作回查线索）：Matcher shared by both hook dialects. Claude treats alphanumeric/underscore/ pipe patterns as literal alternatives and other patterns as regex; Codex treats every non-empty pattern as an unanchored regex. Missing, empty, and * match all. Runtime matching co...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/merge.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：钩子协议实现
- 这个文件有什么用：这个文件实现钩子匹配、合并、分发或生命周期的一部分，让外部自动化可以接入而不复制主流程。
- 为什么这样设计：钩子协议独立于具体宿主，匹配和合并规则可以被多个入口复用，外部自动化也不必复制主流程。
- 文件级设计证据：源码顶部注释把它定位为“Merge matched hooks into one most-restrictive outcome. Permission precedence is deny > ask > allow; the first continue:false stop is sticky; reasons for the winning rank are joined; and context and system messages accumulate in hook order. @module @deepseek...”；固定提交中扫描到的声明包括 `MergedDecision`、`MergedHookOutcome`、`mergeHookOutputs`、`rank`、`decisionForRank`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md` 和入口，再读当前实现，沿着 `packages/hooks/hook-protocol/src/types.ts` 和 `packages/hooks/hook-protocol/src/index.ts` 确认输入输出，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `MergedDecision`、`MergedHookOutcome`、`mergeHookOutputs`、`rank`、`decisionForRank`；源码顶部原注释（英文，仅作回查线索）：Merge matched hooks into one most-restrictive outcome. Permission precedence is deny > ask > allow; the first continue:false stop is sticky; reasons for the winning rank are joined; and context and system messages accumulate in hook order. @module @deepseek...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/runner.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进钩子、协议、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 文件级设计证据：源码顶部注释把它定位为“Execute command hooks through ctx.shell, using its credential scrub, process-group cancellation, and timeout machinery. The bridge supplies the trusted stdin payload and dialect environment, then this module decodes the captured outcome. @module @deepseek-a...”；固定提交中扫描到的声明包括 `DEFAULT_HOOK_TIMEOUT_MS`、`RunHookOptions`、`RunHookResult`、`runHook`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/codec.ts)、[packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)、[packages/shell/shell/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/shell/src/index.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)、[packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md` 和入口，再读当前实现，沿着 `packages/hooks/hook-protocol/src/codec.ts`、`packages/hooks/hook-protocol/src/types.ts`、`packages/shell/shell/src/index.ts` 和 `packages/hooks/hook-protocol/src/index.ts` 确认输入输出，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的声明包括 `DEFAULT_HOOK_TIMEOUT_MS`、`RunHookOptions`、`RunHookResult`、`runHook`；源码顶部原注释（英文，仅作回查线索）：Execute command hooks through ctx.shell, using its credential scrub, process-group cancellation, and timeout machinery. The bridge supplies the trusted stdin payload and dialect environment, then this module decodes the captured outcome. @module @deepseek-a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/types.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述钩子、协议中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Dialect-neutral vocabulary and log-only events shared by the Claude Code and Codex hook bridges. Payload construction, matching differences, environment, and extension-point-specific decision mapping remain owned by each bridge. @module @deepseek-ai/dsh-hoo...”；固定提交中扫描到的声明包括 `HookDialect`、`CommandHook`、`MatcherGroup`、`MatcherMode`、`HookOutput`；本地静态 import 图显示它直接依赖 0 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/codec.ts)、[packages/hooks/hook-protocol/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/events.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)、[packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)、[packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)、[packages/hooks/hook-protocol/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/invariant.spec.ts)、[packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)、[packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/hooks/hook-protocol/README.md`、入口和消费者，再读当前契约，沿着 `packages/hooks/hook-protocol/src/codec.ts`、`packages/hooks/hook-protocol/src/events.ts`、`packages/hooks/hook-protocol/src/index.ts` 看它怎样约束运行时，最后对照 `packages/hooks/hook-protocol/tests/codec.spec.ts`、`packages/hooks/hook-protocol/tests/detached.spec.ts`、`packages/hooks/hook-protocol/tests/events.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `HookDialect`、`CommandHook`、`MatcherGroup`、`MatcherMode`、`HookOutput`；扫描到的测试主题包括 “claude”；源码顶部原注释（英文，仅作回查线索）：Dialect-neutral vocabulary and log-only events shared by the Claude Code and Codex hook bridges. Payload construction, matching differences, environment, and extension-point-specific decision mapping remain owned by each bridge. @module @deepseek-ai/dsh-hoo...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/codec.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/codec.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议、编解码的具体场景，包括“parseHookOutput — exit code semantics”、“exit 0 with no stdout is a neutral success”、“exit 2 is a blocking error: stderr becomes the block decision + reason”、“exit 2 with empty stderr still blocks, with no reason”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseHookOutput — exit code semantics”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hook-protocol/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 193 行；扫描到的测试主题包括 “parseHookOutput — exit code semantics”、“exit 0 with no stdout is a neutral success”、“exit 2 is a blocking error: stderr becomes the block decision + reason”、“exit 2 with empty stderr still blocks, with no reason”、“other non-zero exit is a non-blocking error (no decision, stderr recorded)”、“undefined exit (could not run) carries no decision”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/detached.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/detached.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议的具体场景，包括“createDetachedRuns”、“starts with an unfired signal; drain fires it (so still-running hook processes get killed)”、“drain with nothing tracked resolves immediately”、“drain waits for a tracked run to settle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createDetachedRuns”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `deferred`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hook-protocol/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `deferred`；扫描到的测试主题包括 “createDetachedRuns”、“starts with an unfired signal; drain fires it (so still-running hook processes get killed)”、“drain with nothing tracked resolves immediately”、“drain waits for a tracked run to settle”、“drain waits for a run tracked WHILE a prior wave was settling”、“a rejected tracked run is absorbed by the settlement bookkeeping (drain still resolves)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/events.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/events.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议、事件的具体场景，包括“hook/* session events”、“appendHookInvoked records a log-only hook/invoked (with matcher when present)”、“omits matcher when absent (match-all hook)”、“appendHookResult derives decision/exitCode/stderrSummary from the output”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hook/* session events”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `output`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/hooks/hook-protocol/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `output`；扫描到的测试主题包括 “hook/* session events”、“appendHookInvoked records a log-only hook/invoked (with matcher when present)”、“omits matcher when absent (match-all hook)”、“appendHookResult derives decision/exitCode/stderrSummary from the output”、“the decision falls back to stop on continue:false, else pass”、“stderrSummary is trimmed and truncated to 500 characters with an ellipsis”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/invariant.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议的具体场景，包括“hook-protocol invariants”、“pairs serial and repeated handler invocations”、“rebuilds pending hook invocations from an existing session”、“adopts a bare session first observed through publication”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hook-protocol invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`startTurn`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/hooks/hook-protocol/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/hooks/hook-protocol/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 118 行；扫描到的声明包括 `setup`、`startTurn`；扫描到的测试主题包括 “hook-protocol invariants”、“pairs serial and repeated handler invocations”、“rebuilds pending hook invocations from an existing session”、“adopts a bare session first observed through publication”、“rejects hook events outside or for a different open turn”、“rejects an unenclosed hook event when replaying an existing session”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/matcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/matcher.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议的具体场景，包括“matchesMatcher — match-all sentinels (both dialects)”、“${mode}: absent / empty /”、“matchesMatcher — claude dialect (literal-or-regex)”、“a pure word-char pattern is a LITERAL exact match (not substring)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“matchesMatcher — match-all sentinels (both dialects)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hook-protocol/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的测试主题包括 “matchesMatcher — match-all sentinels (both dialects)”、“${mode}: absent / empty /”、“matchesMatcher — claude dialect (literal-or-regex)”、“a pure word-char pattern is a LITERAL exact match (not substring)”、“a pipe pattern is literal ALTERNATION (exact match any alternative)”、“a non-word pattern falls through to regex (unanchored)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/merge.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议的具体场景，包括“mergeHookOutputs — permission precedence deny > ask > allow”、“empty list yields a neutral outcome”、“a single allow yields allow”、“deny beats ask beats allow regardless of order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mergeHookOutputs — permission precedence deny > ask > allow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `out`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hook-protocol/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `out`；扫描到的测试主题包括 “mergeHookOutputs — permission precedence deny > ask > allow”、“empty list yields a neutral outcome”、“a single allow yields allow”、“deny beats ask beats allow regardless of order”、“no decision anywhere yields none”、“mergeHookOutputs — reasons, stop, context, systemMessages accumulate”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hook-protocol/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/tests/runner.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子、协议、运行驱动的具体场景，包括“runHook — payload + env + stdin plumbing”、“requires an explicit caller-owned abort signal”、“serializes the payload to stdin (with trailing newline when requested)”、“omits the trailing newline when trailingNewline is false (Codex)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runHook — payload + env + stdin plumbing”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `recordingBash`、`result`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hook-protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)、[packages/shell/shell/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/shell/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hook-protocol/src/index.ts`、`packages/shell/shell/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `recordingBash`、`result`；扫描到的测试主题包括 “runHook — payload + env + stdin plumbing”、“requires an explicit caller-owned abort signal”、“serializes the payload to stdin (with trailing newline when requested)”、“omits the trailing newline when trailingNewline is false (Codex)”、“threads env and cwd into the request”、“a per-hook timeoutSec (seconds) overrides the default (ms)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/src/config.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义钩子可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Parse Claude Code's event-to-matcher-group hook format into shared MatcherGroups. Only command hooks run; other hook types are returned as skipped so the bridge can warn. Plugin-root and project-directory substitutions are applied to commands at parse time....”；固定提交中扫描到的声明包括 `ClaudeCodeHookConfig`、`SkippedHook`、`ParsedClaudeConfig`、`SubstitutionVars`、`substituteCommand`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)、[packages/hooks/hooks-claude-code/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/src/index.ts)、[packages/hooks/hooks-claude-code/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/config.spec.ts)
- 对应测试：[packages/hooks/hooks-claude-code/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/hooks/hooks-claude-code/README.md`，再读本配置/脚本，沿着 `packages/hooks/hooks-claude-code/src/index.ts`、`packages/hooks/hooks-claude-code/tests/config.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `ClaudeCodeHookConfig`、`SkippedHook`、`ParsedClaudeConfig`、`SubstitutionVars`、`substituteCommand`、`parseClaudeCodeConfig`、`asObject`；源码顶部原注释（英文，仅作回查线索）：Parse Claude Code's event-to-matcher-group hook format into shared MatcherGroups. Only command hooks run; other hook types are returned as skipped so the bridge can warn. Plugin-root and project-directory substitutions are applied to commands at parse time....。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/src/index.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把钩子相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Bridge for unmodified Claude Code command hooks on harness interception extension points. It supports SessionStart, prompt/tool pre/post, Stop, and subagent start/stop. It owns Claude payloads, environment, substitution, and decision mapping; shared executi...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`nextHandlerId`；本地静态 import 图显示它直接依赖 10 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 对应测试：[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/hooks/hooks-claude-code/README.md`、入口和消费者，再读当前契约，沿着 `packages/hooks/hooks-claude-code/tests/bridge.spec.ts`、`packages/hooks/hooks-claude-code/tests/coverage-cases.ts` 看它怎样约束运行时，最后对照 `packages/hooks/hooks-claude-code/tests/bridge.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 361 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`nextHandlerId`、`assertPositiveInteger`、`runPoint`、`contextFrom`；源码顶部原注释（英文，仅作回查线索）：Bridge for unmodified Claude Code command hooks on harness interception extension points. It supports SessionStart, prompt/tool pre/post, Stop, and subagent start/stop. It owns Claude payloads, environment, substitution, and decision mapping; shared executi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/src/invariant.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查钩子必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-hooks-claude-code. @module @deepseek-ai/dsh-hooks-claude-code/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-hooks-claude-code. @module @deepseek-ai/dsh-hooks-claude-code/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子的具体场景，包括“hooks-claude-code bridge — UserPromptSubmit”、“a UserPromptSubmit hook that exits 2 closes a blocked turn without a step”、“a UserPromptSubmit hook printing additionalContext injects it for the model”、“hooks-claude-code bridge — PreToolUse”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hooks-claude-code bridge — UserPromptSubmit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `subagentCarrier`、`writeConfig`、`harness`、`harnessWithFiber`、`waitForIdle`；本地静态 import 图显示它直接依赖 14 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 446 行；扫描到的声明包括 `subagentCarrier`、`writeConfig`、`harness`、`harnessWithFiber`、`waitForIdle`、`events`、`waitFor`；扫描到的测试主题包括 “hooks-claude-code bridge — UserPromptSubmit”、“a UserPromptSubmit hook that exits 2 closes a blocked turn without a step”、“a UserPromptSubmit hook printing additionalContext injects it for the model”、“hooks-claude-code bridge — PreToolUse”、“a matching PreToolUse hook that exits 2 denies the tool (isError result), tool never runs”、“a PreToolUse hook whose matcher does NOT match leaves the tool alone”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/config.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子的具体场景，包括“substituteCommand”、“replaces CLAUDE_PLUGIN_ROOT and CLAUDE_PROJECT_DIR (all occurrences)”、“leaves the command untouched when no vars are supplied”、“parseClaudeCodeConfig”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“substituteCommand”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/hooks/hooks-claude-code/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/src/config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hooks-claude-code/src/config.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的测试主题包括 “substituteCommand”、“replaces CLAUDE_PLUGIN_ROOT and CLAUDE_PROJECT_DIR (all occurrences)”、“leaves the command untouched when no vars are supplied”、“parseClaudeCodeConfig”、“parses a bare event map and a settings-style { hooks: … } wrapper identically”、“carries timeout → timeoutSec and substitutes the command”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“coverage-cases”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `CoverageGroup`、`defineCoverageCases`、`subagentCarrier`、`dir`、`sh`；本地静态 import 图显示它直接依赖 14 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts)
- 对应测试：[packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts)、[packages/hooks/hooks-claude-code/tests/coverage-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-context.spec.ts)、[packages/hooks/hooks-claude-code/tests/coverage-edge-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-edge-paths.spec.ts)、[packages/hooks/hooks-claude-code/tests/coverage-stop.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-stop.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts`、`packages/hooks/hooks-claude-code/tests/coverage-context.spec.ts`、`packages/hooks/hooks-claude-code/tests/coverage-edge-paths.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 760 行；扫描到的声明包括 `CoverageGroup`、`defineCoverageCases`、`subagentCarrier`、`dir`、`sh`、`hooks`、`harness`、`waitForIdle`；扫描到的测试主题包括 “hooks-claude-code coverage — config option arms + substitution + skip warning”、“uses the persistence locator for transcript_path and an empty string without one”、“honors pluginRoot + projectDir substitution and warns on a skipped non-command hook”、“warns and honors updatedInput as a no-op (input rewrite deferred)”、“hooks-claude-code coverage — empty/no-op outcomes and no-agent paths”、“a clean exit-0 hook with no output is a no-op (contextFrom empty → next())”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-config.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-config”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-config` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-claude-code/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/coverage-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-context.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-context”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-context` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-claude-code/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/coverage-edge-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-edge-paths.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-edge-paths”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-edge-paths` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-claude-code/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-claude-code/tests/coverage-stop.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-stop.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-stop”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-stop` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/README.md)、[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-claude-code/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-claude-code/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/src/config.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义钩子可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Parse Codex's five-event hook subset into shared MatcherGroups. Only synchronous command hooks run; other types and async: true commands are recorded as skipped. Codex performs no command substitution. @module @deepseek-ai/dsh-hooks-codex/config”；固定提交中扫描到的声明包括 `CODEX_EVENTS`、`CodexHookConfig`、`SkippedHook`、`ParsedCodexConfig`、`parseCodexConfig`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/hooks/hook-protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hook-protocol/src/index.ts)、[packages/hooks/hooks-codex/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/src/index.ts)、[packages/hooks/hooks-codex/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/config.spec.ts)
- 对应测试：[packages/hooks/hooks-codex/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/hooks/hooks-codex/README.md`，再读本配置/脚本，沿着 `packages/hooks/hooks-codex/src/index.ts`、`packages/hooks/hooks-codex/tests/config.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `CODEX_EVENTS`、`CodexHookConfig`、`SkippedHook`、`ParsedCodexConfig`、`parseCodexConfig`、`asObject`；源码顶部原注释（英文，仅作回查线索）：Parse Codex's five-event hook subset into shared MatcherGroups. Only synchronous command hooks run; other types and async: true commands are recorded as skipped. Codex performs no command substitution. @module @deepseek-ai/dsh-hooks-codex/config。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/src/index.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把钩子相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Bridge for unmodified Codex command hooks on harness interception points. It supports five points (SessionStart, prompt/tool pre/post, Stop), regex-only matchers, snake_case payloads without a trailing newline, no hook environment or command substitution, a...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`nextHandlerId`；本地静态 import 图显示它直接依赖 9 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/hooks/hooks-codex/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/bridge.spec.ts)
- 对应测试：[packages/hooks/hooks-codex/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/hooks/hooks-codex/README.md`、入口和消费者，再读当前契约，沿着 `packages/hooks/hooks-codex/tests/bridge.spec.ts`、`packages/hooks/hooks-codex/tests/coverage-cases.ts` 看它怎样约束运行时，最后对照 `packages/hooks/hooks-codex/tests/bridge.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 329 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`nextHandlerId`、`assertPositiveInteger`、`runPoint`、`contextFrom`；源码顶部原注释（英文，仅作回查线索）：Bridge for unmodified Codex command hooks on harness interception points. It supports five points (SessionStart, prompt/tool pre/post, Stop), regex-only matchers, snake_case payloads without a trailing newline, no hook environment or command substitution, a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/src/invariant.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查钩子必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-hooks-codex. @module @deepseek-ai/dsh-hooks-codex/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-hooks-codex. @module @deepseek-ai/dsh-hooks-codex/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/bridge.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子的具体场景，包括“hooks-codex bridge”、“a PreToolUse hook (exit 2) denies a tool the regex matcher matches as a substring”、“a Stop hook (exit 2) forces the turn to continue with the reason as steering”、“turn cancellation aborts and reaps a running UserPromptSubmit hook before idle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hooks-codex bridge”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `configDir`、`script`、`writeHooks`、`harness`、`waitForIdle`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 238 行；扫描到的声明包括 `configDir`、`script`、`writeHooks`、`harness`、`waitForIdle`、`events`、`waitFor`；扫描到的测试主题包括 “hooks-codex bridge”、“a PreToolUse hook (exit 2) denies a tool the regex matcher matches as a substring”、“a Stop hook (exit 2) forces the turn to continue with the reason as steering”、“turn cancellation aborts and reaps a running UserPromptSubmit hook before idle”、“only the five bridge-supported Codex events are honored — a SubagentStop entry is ignored”、“a missing config registers no hooks and does not crash”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/config.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查钩子的具体场景，包括“parseCodexConfig”、“honors only the five bridge-supported Codex events, dropping the rest”、“accepts both timeout and the timeoutSec alias, no substitution”、“skips non-command and async:true hooks (recorded)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseCodexConfig”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/hooks/hooks-codex/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/src/config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/hooks/hooks-codex/src/config.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的测试主题包括 “parseCodexConfig”、“honors only the five bridge-supported Codex events, dropping the rest”、“accepts both timeout and the timeoutSec alias, no substitution”、“skips non-command and async:true hooks (recorded)”、“parses the { hooks: … } wrapper and the bare map identically”、“drops malformed entries and a non-object top level without throwing”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“coverage-cases”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `CoverageGroup`、`defineCoverageCases`、`dir`、`sh`、`hooks`；本地静态 import 图显示它直接依赖 12 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts)
- 对应测试：[packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts)、[packages/hooks/hooks-codex/tests/coverage-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-prompt.spec.ts)、[packages/hooks/hooks-codex/tests/coverage-result-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-result-shape.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts`、`packages/hooks/hooks-codex/tests/coverage-prompt.spec.ts`、`packages/hooks/hooks-codex/tests/coverage-result-shape.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 642 行；扫描到的声明包括 `CoverageGroup`、`defineCoverageCases`、`dir`、`sh`、`hooks`、`harness`、`waitForIdle`、`events`；扫描到的测试主题包括 “hooks-codex coverage — prompt decision mapping”、“uses the persistence locator for transcript_path and null without one”、“UserPromptSubmit block (exit 2) closes a blocked turn without a step”、“UserPromptSubmit additionalContext is injected; a no-op hook proceeds”、“a context-only UserPromptSubmit hook DELEGATES so a later listener can still block”、“preserves separate bridge and downstream prompt contexts with framing and metadata”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-post-tool.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-post-tool”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-post-tool` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-codex/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/tests/coverage-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-prompt.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-prompt”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-prompt` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-codex/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/hooks/hooks-codex/tests/coverage-result-shape.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-result-shape.spec.ts)

- 所属层：packages/hooks：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“coverage-result-shape”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。
- 为什么这样设计：把测试文件 `coverage-result-shape` 写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/hooks/hooks-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/README.md)、[packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/hooks/hooks-codex/tests/coverage-cases.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-codex/tests/coverage-cases.ts)
- 阅读顺序：先看它直接使用的测试支持 `packages/hooks/hooks-codex/tests/coverage-cases.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
