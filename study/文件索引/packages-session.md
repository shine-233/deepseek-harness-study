# 源文件索引：packages/session

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 144 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/session/session-checkpoint-policy（5 条）、packages/session/session-persistence-jsonl（11 条）、packages/session/session-persistence-sqlite（70 条）、packages/session/session-persistence（11 条）、packages/session/session-projection-cache（4 条）、packages/session/session-projection（4 条）、packages/session/session-stats（7 条）、packages/session/session-telemetry-otel（4 条）、packages/session/session-telemetry（5 条）、packages/session/session-title-all-prompts-llm（3 条）、packages/session/session-title-first-prompt-llm（5 条）、packages/session/session-title-llm（3 条）、packages/session/session-title（12 条）。

## packages/session/session-checkpoint-policy

### [packages/session/session-checkpoint-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、策略相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Semantic durability checkpoints for model requests, top-level tool dispatch, and completed agent steps. @module @deepseek-ai/dsh-session-checkpoint-policy”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`afterCheckpoint`、`abortedBeforeDispatchResult`；本地静态 import 图显示它直接依赖 6 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/session/session-checkpoint-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[examples/headless-agent/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/harness.ts)
- 对应测试：[packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-checkpoint-policy/README.md`、入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/harness.ts`、`packages/examples/acp-demo/src/index.ts`、`packages/session/session-checkpoint-policy/tests/fixtures/crash-child.ts` 看它怎样约束运行时，最后对照 `packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 83 行；扫描到的声明包括 `name`、`inject`、`apply`、`afterCheckpoint`、`abortedBeforeDispatchResult`；源码顶部原注释（英文，仅作回查线索）：Semantic durability checkpoints for model requests, top-level tool dispatch, and completed agent steps. @module @deepseek-ai/dsh-session-checkpoint-policy。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-checkpoint-policy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、策略必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-checkpoint-policy. @module @deepseek-ai/dsh-session-checkpoint-policy/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-checkpoint-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-checkpoint-policy. @module @deepseek-ai/dsh-session-checkpoint-policy/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-checkpoint-policy/tests/crash-recovery.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/tests/crash-recovery.e2e.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、策略的具体场景，包括“persists the complete request before model dispatch”、“persists tool intent before a side effect and repairs its missing result as unknown”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“persists the complete request before model dispatch”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `waitForMarker`、`crashAt`、`load`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-checkpoint-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence-jsonl/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 111 行；扫描到的声明包括 `waitForMarker`、`crashAt`、`load`；扫描到的测试主题包括 “persists the complete request before model dispatch”、“persists tool intent before a side effect and repairs its missing result as unknown”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-checkpoint-policy/tests/fixtures/crash-child.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/tests/fixtures/crash-child.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为会话、策略提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `waitForCrash`、`CrashAdapter`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-checkpoint-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的声明包括 `waitForCrash`、`CrashAdapter`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、策略的具体场景，包括“session-checkpoint-policy request boundary”、“awaits the live session checkpoint before constructing the downstream model stream”、“delegates a request without a live session without checkpointing”、“delegates an already-detached session id without checkpointing”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-checkpoint-policy request boundary”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestPersistence`、`RecordingAdapter`、`setup`、`drain`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-checkpoint-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 270 行；扫描到的声明包括 `TestPersistence`、`RecordingAdapter`、`setup`、`drain`；扫描到的测试主题包括 “session-checkpoint-policy request boundary”、“awaits the live session checkpoint before constructing the downstream model stream”、“delegates a request without a live session without checkpointing”、“delegates an already-detached session id without checkpointing”、“does not dispatch the adapter when the checkpoint rejects”、“session-checkpoint-policy tool and step boundaries”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-persistence-jsonl

### [packages/session/session-persistence-jsonl/src/format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/format.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：JSONL 磁盘格式
- 这个文件有什么用：它定义 JSONL 会话文件的物理格式：安全编码路径片段、项目和会话目录、首行 header、事件记录以及截断日志的修复偏移；文件格式规则集中在这里，读写流程才能共享同一套版本和安全边界。
- 为什么这样设计：JSONL 是会话恢复和审计依赖的长期格式，路径编码、header、事件记录和截断修复必须由同一规则解释；格式层独立后，Session 领域代码不必承担磁盘细节。
- 文件级设计证据：源码顶部注释把它定位为“On-disk format helpers for the JSONL session-persistence backend: path sanitization (a SessionId is an unvalidated branded string, so it MUST be encoded before use in a path — no traversal, no collision), the per-project/session directory layout, header-lin...”；固定提交中扫描到的声明包括 `JsonlCompression`、`logSuffix`、`HeaderLine`、`toHeaderLine`、`fromHeaderLine`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)、[packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)
- 对应测试：[packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读 `packages/session/session-persistence-jsonl/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/session/session-persistence/src/index.ts` 和 `packages/session/session-persistence-jsonl/src/index.ts`、`packages/session/session-persistence-jsonl/tests/jsonl.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts` 确认输入输出，最后对照 `packages/session/session-persistence-jsonl/tests/jsonl.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 413 行；扫描到的声明包括 `JsonlCompression`、`logSuffix`、`HeaderLine`、`toHeaderLine`、`fromHeaderLine`、`encodeSegment`、`projectKey`、`projectDir`；源码顶部原注释（英文，仅作回查线索）：On-disk format helpers for the JSONL session-persistence backend: path sanitization (a SessionId is an unvalidated branded string, so it MUST be encoded before use in a path — no traversal, no collision), the per-project/session directory layout, header-lin...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、持久化相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“JSONL durable session-persistence backend. It stores a header and contiguous events in one append-only file per session, and delegates orchestration to PersistenceCoordinator. Its side-effect-free locator returns the absolute per-session log target before m...”；固定提交中扫描到的声明包括 `JsonlCompressionSchema`、`Config`、`JsonlSessionPersistence`、`assertZstdHeaderFrame`、`fileRevision`；本地静态 import 图显示它直接依赖 7 个源文件，并被 36 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-jsonl/src/format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/format.ts)、[packages/session/session-persistence-jsonl/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/win32.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)
- 对应测试：[examples/headless-agent/tests/semantic-checkpoint.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/semantic-checkpoint.snapshot.ts)、[examples/headless-agent/tests/session-format-guard.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/session-format-guard.snapshot.ts)、[examples/headless-agent/tests/subagent-diagnostic.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/subagent-diagnostic.snapshot.ts)、[examples/headless-agent/tests/subagent-inheritance.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/subagent-inheritance.snapshot.ts)、[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/core/agent-loop/tests/config-session-id.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/config-session-id.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/session/session-persistence-jsonl/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/scaffold.ts`、`examples/headless-agent/tests/harness.ts`、`examples/headless-agent/tests/semantic-checkpoint.snapshot.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/semantic-checkpoint.snapshot.ts`、`examples/headless-agent/tests/session-format-guard.snapshot.ts`、`examples/headless-agent/tests/subagent-diagnostic.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 967 行；扫描到的声明包括 `JsonlCompressionSchema`、`Config`、`JsonlSessionPersistence`、`assertZstdHeaderFrame`、`fileRevision`、`isENOENT`；源码顶部原注释（英文，仅作回查线索）：JSONL durable session-persistence backend. It stores a header and contiguous events in one append-only file per session, and delegates orchestration to PersistenceCoordinator. Its side-effect-free locator returns the absolute per-session log target before m...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、持久化必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-persistence-jsonl. @module @deepseek-ai/dsh-session-persistence-jsonl/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-persistence-jsonl. @module @deepseek-ai/dsh-session-persistence-jsonl/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/win32.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Windows durable namespace helpers for the JSONL backend. POSIX publishes a newly-created log by creating a directory entry and then fsyncing the parent directory. Windows does not expose that parent-directory fsync contract through Node, so the Windows path...”；固定提交中扫描到的声明包括 `publishNewFileWin32`、`ensureDurableDirectoryWin32`、`win32`、`errnoCode`、`win32Error`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)、[packages/session/session-persistence-jsonl/tests/win32.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/win32.spec.ts)
- 对应测试：[packages/session/session-persistence-jsonl/tests/win32.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/win32.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/session/session-persistence-jsonl/src/index.ts`、`packages/session/session-persistence-jsonl/tests/win32.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence-jsonl/tests/win32.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 155 行；扫描到的声明包括 `publishNewFileWin32`、`ensureDurableDirectoryWin32`、`win32`、`errnoCode`、`win32Error`、`isENOENT`、`isEEXIST`、`assertDirectory`；源码顶部原注释（英文，仅作回查线索）：Windows durable namespace helpers for the JSONL backend. POSIX publishes a newly-created log by creating a directory entry and then fsyncing the parent directory. Windows does not expose that parent-directory fsync contract through Node, so the Windows path...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Node-private synchronous Zstandard frame decoder optimization. @module dsh-session-persistence-jsonl/zstd-private-decoder”；固定提交中扫描到的声明包括 `NodePrivateZstdFrameDecoder`、`privateZstdStream`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/session/session-persistence-jsonl/src/zstd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd.ts)、[packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)
- 对应测试：[packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/session/session-persistence-jsonl/src/zstd.ts` 和 `packages/session/session-persistence-jsonl/src/zstd.ts`、`packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 178 行；扫描到的声明包括 `NodePrivateZstdFrameDecoder`、`privateZstdStream`；源码顶部原注释（英文，仅作回查线索）：Node-private synchronous Zstandard frame decoder optimization. @module dsh-session-persistence-jsonl/zstd-private-decoder。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Public-API synchronous Zstandard frame decoder fallback. @module dsh-session-persistence-jsonl/zstd-public-decoder”；固定提交中扫描到的声明包括 `PublicZstdFrameDecoder`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/session/session-persistence-jsonl/src/zstd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd.ts)、[packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)
- 对应测试：[packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/session/session-persistence-jsonl/src/zstd.ts` 和 `packages/session/session-persistence-jsonl/src/zstd.ts`、`packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `PublicZstdFrameDecoder`；源码顶部原注释（英文，仅作回查线索）：Public-API synchronous Zstandard frame decoder fallback. @module dsh-session-persistence-jsonl/zstd-public-decoder。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/src/zstd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Zstandard frame primitives for the JSONL persistence backend. The backend owns a concatenated-frame container so it can append and recover batches without exposing compression mechanics through the persistence seam. @module dsh-session-persistence-jsonl/zstd”；固定提交中扫描到的声明包括 `ZstdFrameRange`、`ZstdFrameScan`、`scanZstdFrames`、`compressZstdFrame`、`decompressZstdFrame`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts)、[packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts)、[examples/headless-agent/tests/headless.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/headless.snapshot.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)
- 对应测试：[examples/headless-agent/tests/headless.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/headless.snapshot.ts)、[packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts`、`packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts` 和 `examples/headless-agent/tests/headless.snapshot.ts`、`packages/session/session-persistence-jsonl/src/index.ts`、`packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts` 理解状态变化，最后对照 `examples/headless-agent/tests/headless.snapshot.ts`、`packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `ZstdFrameRange`、`ZstdFrameScan`、`scanZstdFrames`、`compressZstdFrame`、`decompressZstdFrame`、`ZstdFrameDecoder`、`createZstdFrameDecoder`、`decompressZstdPrefix`；源码顶部原注释（英文，仅作回查线索）：Zstandard frame primitives for the JSONL persistence backend. The backend owns a concatenated-frame container so it can append and recover batches without exposing compression mechanics through the persistence seam. @module dsh-session-persistence-jsonl/zstd。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“JsonlSessionPersistence: format helpers”、“encodeSegment neutralizes traversal, separators, and absolute paths”、“encodeSegment is injective over UTF-16, incl. lone surrogates”、“encodeSegment rejects an empty id”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“JsonlSessionPersistence: format helpers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mutableHeader`、`rewriteHeader`、`expectFlushError`、`expectFlushCode`、`freshRoot`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence-jsonl/src/format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/format.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-persistence-jsonl/src/format.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1621 行；扫描到的声明包括 `mutableHeader`、`rewriteHeader`、`expectFlushError`、`expectFlushCode`、`freshRoot`、`rawLogPath`、`appendClosedTurn`、`walk`；扫描到的测试主题包括 “JsonlSessionPersistence: format helpers”、“encodeSegment neutralizes traversal, separators, and absolute paths”、“encodeSegment is injective over UTF-16, incl. lone surrogates”、“encodeSegment rejects an empty id”、“projectKey normalizes project paths into bounded readable names”、“resolves a relative custom root before locating a session”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/tests/win32.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/win32.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“Windows durable namespace helpers”、“keeps drive-root probes native while namespacing descendants”、“publishes a new file with write-through MoveFileExW semantics”、“maps Win32 publish failures to Node-style errno codes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Windows durable namespace helpers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Unit tests for the Windows durable namespace helper with a mocked kernel32 binding. The real JSONL suite exercises the helper on native Windows; these tests keep the Win32 error mapping and race handling covered on every host.”；固定提交中扫描到的声明包括 `stripNamespace`、`tempRoot`、`importWithMove`、`importWithError`、`importWithFilesystemMove`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/session/session-persistence-jsonl/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/win32.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/session/session-persistence-jsonl/src/win32.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 210 行；扫描到的声明包括 `stripNamespace`、`tempRoot`、`importWithMove`、`importWithError`、`importWithFilesystemMove`；扫描到的测试主题包括 “Windows durable namespace helpers”、“keeps drive-root probes native while namespacing descendants”、“publishes a new file with write-through MoveFileExW semantics”、“maps Win32 publish failures to Node-style errno codes”、“creates missing directories through staging siblings and tolerates an already-created race”、“keeps staging names valid for a maximum-length target component”；源码顶部原注释（英文，仅作回查线索）：Unit tests for the Windows durable namespace helper with a mocked kernel32 binding. The real JSONL suite exercises the helper on native Windows; these tests keep the Win32 error mapping and race handling covered on every host.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.compat.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“JSONL Zstandard compatibility”、“round-trips concatenated checksummed frames through the built-in Node API”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“JSONL Zstandard compatibility”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts)、[packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts)、[packages/session/session-persistence-jsonl/src/zstd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/zstd.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/session/session-persistence-jsonl/src/zstd-private-decoder.ts`、`packages/session/session-persistence-jsonl/src/zstd-public-decoder.ts`、`packages/session/session-persistence-jsonl/src/zstd.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 39 行；扫描到的测试主题包括 “JSONL Zstandard compatibility”、“round-trips concatenated checksummed frames through the built-in Node API”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“Zstandard frame structure”、“scans concatenated checksummed frames and honors a frame limit”、“keeps the public and Node-private synchronous decoders interchangeable”、“falls back to the public decoder when the private Node contract is unavailable”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Zstandard frame structure”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `freshRoot`、`mount`、`decodeCompleteFrames`、`tornFrame`、`deterministicNoise`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-jsonl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-jsonl/src/format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/format.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence-jsonl/src/format.ts`、`packages/session/session-persistence-jsonl/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 750 行；扫描到的声明包括 `freshRoot`、`mount`、`decodeCompleteFrames`、`tornFrame`、`deterministicNoise`、`emptyStructuralFrame`；扫描到的测试主题包括 “Zstandard frame structure”、“scans concatenated checksummed frames and honors a frame limit”、“keeps the public and Node-private synchronous decoders interchangeable”、“falls back to the public decoder when the private Node contract is unavailable”、“enforces decoder lifecycle and checksum errors through both implementations”、“assembles private-decoder output at and beyond its reusable chunk boundary”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-persistence-sqlite

### [packages/session/session-persistence-sqlite/resources/sql/begin-immediate.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/begin-immediate.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/begin.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/begin.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/commit.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/commit.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/delete-events-from.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/delete-events-from.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出会话、持久化、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 DELETE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 2 行；SQL 中扫描到 DELETE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/foreign-keys-on.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/foreign-keys-on.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/insert-event.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/insert-event.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出会话、持久化、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 INSERT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 INSERT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/insert-persistence-state.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/insert-persistence-state.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：持久化边界
- 这个文件有什么用：它负责会话、持久化在内存和磁盘格式之间的转换，把写入、读取、校验和崩溃恢复集中到可替换的边界。
- 为什么这样设计：存储格式和业务对象分开，未来可以替换 JSONL、SQLite 或其他后端而不重写 Session 的核心语义。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 INSERT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 2 行；SQL 中扫描到 INSERT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/journal-mode-delete.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/journal-mode-delete.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 DELETE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行；SQL 中扫描到 DELETE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/journal-mode-persist.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/journal-mode-persist.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/journal-mode-truncate.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/journal-mode-truncate.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/journal-mode-wal.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/journal-mode-wal.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/mmap-off.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/mmap-off.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/rollback.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/rollback.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/schema.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/schema.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、持久化、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 CREATE、DELETE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；SQL 中扫描到 CREATE、DELETE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-application-id.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-application-id.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-events-from.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-events-from.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出会话、持久化、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-events.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-events.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出会话、持久化、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-mmap-size.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-mmap-size.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-packed-predecessors.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-packed-predecessors.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 6 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-schema-objects.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-schema-objects.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、持久化、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 4 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-session.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-session.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护会话、持久化的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-sessions.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-sessions.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护会话、持久化的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-store-id.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-store-id.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护会话、持久化、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-synchronous.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-synchronous.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-tail-events.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-tail-events.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出会话、持久化、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 5 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-trusted-schema.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-trusted-schema.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、持久化、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-user-object-count.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-user-object-count.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/select-user-version.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/select-user-version.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/set-application-id.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/set-application-id.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/set-user-version-17.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/set-user-version-17.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/synchronous-full.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/synchronous-full.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：数据库脚本
- 这个文件有什么用：它定义会话、持久化使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。
- 为什么这样设计：它位于 packages/session/session-persistence-sqlite/resources/sql的数据库脚本层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/trusted-schema-off.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/trusted-schema-off.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、持久化、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/update-session-revision.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/update-session-revision.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护会话、持久化的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 UPDATE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 UPDATE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/resources/sql/upsert-session.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/resources/sql/upsert-session.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护会话、持久化的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 INSERT、UPDATE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 13 行；SQL 中扫描到 INSERT、UPDATE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/codec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：格式编解码
- 这个文件有什么用：它把会话、持久化、编解码在内存与外部表示之间转换，并在协议或磁盘边界检查数据；具体格式语义以源码顶部说明和对应测试为准。
- 为什么这样设计：序列化格式是持久化或传输的长期契约，单独封装能集中处理版本、截断、非法输入和兼容性，而不让领域代码承担字节细节。
- 文件级设计证据：源码顶部注释把它定位为“Schema-17 physical chunk-row codec. This package owns the durable tags, validation, and row-size limits independently from other persistence formats. @module @deepseek-ai/dsh-session-persistence-sqlite/codec”；固定提交中扫描到的声明包括 `ChunkRow`、`StorageRecord`、`MIN_PACKED_ROW_MEMBERS`、`MAX_PACKED_ROW_MEMBERS`、`MAX_PACKED_DATA_BYTES`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence-sqlite/src/compression.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/compression.ts)、[packages/session/session-persistence-sqlite/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/store.ts)
- 对应测试：[packages/session/session-persistence-sqlite/tests/compression.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/compression.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/session/session-persistence-sqlite/src/compression.ts`、`packages/session/session-persistence-sqlite/src/store.ts`、`packages/session/session-persistence-sqlite/tests/compression.spec.ts` 确认输入输出，最后对照 `packages/session/session-persistence-sqlite/tests/compression.spec.ts`、`packages/session/session-persistence-sqlite/tests/sqlite.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 343 行；扫描到的声明包括 `ChunkRow`、`StorageRecord`、`MIN_PACKED_ROW_MEMBERS`、`MAX_PACKED_ROW_MEMBERS`、`MAX_PACKED_DATA_BYTES`、`packChunkRuns`、`decodeStorageRecord`、`decodeSerializedChunkRow`；源码顶部原注释（英文，仅作回查线索）：Schema-17 physical chunk-row codec. This package owns the durable tags, validation, and row-size limits independently from other persistence formats. @module @deepseek-ai/dsh-session-persistence-sqlite/codec。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/compression.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/compression.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Fixed physical-record compression for SQLite. Schema-owned functions encode logical events and decode tagged rows before persistence consumers observe them. @module @deepseek-ai/dsh-session-persistence-sqlite/compression”；固定提交中扫描到的声明包括 `BoundRecord`、`ZSTD_DATA_THRESHOLD_BYTES`、`decodeRow`、`bindRecord`、`scanRows`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-sqlite/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/codec.ts)、[packages/session/session-persistence-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/schema.ts)、[packages/session/session-persistence-sqlite/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/store.ts)
- 对应测试：[packages/session/session-persistence-sqlite/tests/compression-unprofitable.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/compression-unprofitable.spec.ts)、[packages/session/session-persistence-sqlite/tests/compression.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/compression.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session/session-persistence-sqlite/src/codec.ts`、`packages/session/session-persistence-sqlite/src/schema.ts` 和 `packages/session/session-persistence-sqlite/src/store.ts`、`packages/session/session-persistence-sqlite/tests/compression-unprofitable.spec.ts`、`packages/session/session-persistence-sqlite/tests/compression.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence-sqlite/tests/compression-unprofitable.spec.ts`、`packages/session/session-persistence-sqlite/tests/compression.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 276 行；扫描到的声明包括 `BoundRecord`、`ZSTD_DATA_THRESHOLD_BYTES`、`decodeRow`、`bindRecord`、`scanRows`、`isChunkTag`、`encodeData`、`decodeData`；源码顶部原注释（英文，仅作回查线索）：Fixed physical-record compression for SQLite. Schema-owned functions encode logical events and decode tagged rows before persistence consumers observe them. @module @deepseek-ai/dsh-session-persistence-sqlite/compression。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、持久化相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Opt-in SQLite persistence provider. Logical sessions remain unchanged; the physical backend packs eligible chunk runs into schema-17 rows. @module @deepseek-ai/dsh-session-persistence-sqlite”；固定提交中扫描到的声明包括 `DEFAULT_BUSY_TIMEOUT_MS`、`MAX_BUSY_TIMEOUT_MS`、`Config`、`SqliteSessionPersistence`；本地静态 import 图显示它直接依赖 6 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/schema.ts)、[packages/session/session-persistence-sqlite/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/store.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)
- 对应测试：[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/llm/llm-retry/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/persistence.spec.ts)、[packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session/session-persistence-sqlite/tests/differential.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/differential.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`、入口和消费者，再读当前契约，沿着 `packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/llm/llm-retry/tests/persistence.spec.ts`、`packages/session-query/session-query-sqlite/tests/load-path.e2e.ts` 看它怎样约束运行时，最后对照 `packages/experimental/agent-team/tests/persistence.spec.ts`、`packages/llm/llm-retry/tests/persistence.spec.ts`、`packages/session-query/session-query-sqlite/tests/load-path.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `DEFAULT_BUSY_TIMEOUT_MS`、`MAX_BUSY_TIMEOUT_MS`、`Config`、`SqliteSessionPersistence`；源码顶部原注释（英文，仅作回查线索）：Opt-in SQLite persistence provider. Logical sessions remain unchanged; the physical backend packs eligible chunk runs into schema-17 rows. @module @deepseek-ai/dsh-session-persistence-sqlite。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、持久化必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-persistence-sqlite. @module @deepseek-ai/dsh-session-persistence-sqlite/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-persistence-sqlite. @module @deepseek-ai/dsh-session-persistence-sqlite/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/schema.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、持久化、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“SQLite schema ownership and durable-row validation. @module @deepseek-ai/dsh-session-persistence-sqlite/schema”；固定提交中扫描到的声明包括 `SCHEMA_VERSION`、`SESSION_PERSISTENCE_SQLITE_APPLICATION_ID`、`SessionRow`、`EventRow`、`JournalMode`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-sqlite/src/sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/sql.ts)、[packages/session/session-persistence-sqlite/src/compression.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/compression.ts)、[packages/session/session-persistence-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/index.ts)
- 对应测试：[packages/session/session-persistence-sqlite/tests/compression.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/compression.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读 `packages/session/session-persistence-sqlite/README.md`，再读本配置/脚本，沿着 `packages/session/session-persistence-sqlite/src/compression.ts`、`packages/session/session-persistence-sqlite/src/index.ts`、`packages/session/session-persistence-sqlite/src/store.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 424 行；扫描到的声明包括 `SCHEMA_VERSION`、`SESSION_PERSISTENCE_SQLITE_APPLICATION_ID`、`SessionRow`、`EventRow`、`JournalMode`、`openDatabase`、`validateSchemaForMutation`、`decodeSessionRow`；源码顶部原注释（英文，仅作回查线索）：SQLite schema ownership and durable-row validation. @module @deepseek-ai/dsh-session-persistence-sqlite/schema。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/sql.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Closed, package-owned SQL resource loading for SQLite. @module @deepseek-ai/dsh-session-persistence-sqlite/sql”；固定提交中扫描到的声明包括 `SqlResourceName`、`sql`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/session/session-persistence-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/schema.ts)、[packages/session/session-persistence-sqlite/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/store.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 对应测试：[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/session/session-persistence-sqlite/src/schema.ts`、`packages/session/session-persistence-sqlite/src/store.ts`、`packages/session/session-persistence-sqlite/tests/sqlite.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence-sqlite/tests/sqlite.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `SqlResourceName`、`sql`；源码顶部原注释（英文，仅作回查线索）：Closed, package-owned SQL resource loading for SQLite. @module @deepseek-ai/dsh-session-persistence-sqlite/sql。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/store.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护会话、持久化、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“SQLite storage primitives: transactional append-batch packing, physical reads, schema validation, revisions, repair, and lifecycle closure. @module @deepseek-ai/dsh-session-persistence-sqlite/store”；固定提交中扫描到的声明包括 `SqliteStoreOptions`、`SqliteStore`、`sqliteRevision`、`createDatabaseFile`、`validateParentDirectory`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-sqlite/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/codec.ts)、[packages/session/session-persistence-sqlite/src/compression.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/compression.ts)、[packages/session/session-persistence-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/index.ts)
- 对应测试：[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session/session-persistence-sqlite/src/codec.ts`、`packages/session/session-persistence-sqlite/src/compression.ts` 和 `packages/session/session-persistence-sqlite/src/index.ts`、`packages/session/session-persistence-sqlite/tests/sqlite.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence-sqlite/tests/sqlite.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 470 行；扫描到的声明包括 `SqliteStoreOptions`、`SqliteStore`、`sqliteRevision`、`createDatabaseFile`、`validateParentDirectory`、`validateDatabaseFile`、`validateDatabaseFileIfPresent`、`loadNodeSqlite`；源码顶部原注释（英文，仅作回查线索）：SQLite storage primitives: transactional append-batch packing, physical reads, schema validation, revisions, repair, and lifecycle closure. @module @deepseek-ai/dsh-session-persistence-sqlite/store。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/built-package.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/built-package.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“loads packaged SQL resources from the published entry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“loads packaged SQL resources from the published entry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的测试主题包括 “loads packaged SQL resources from the published entry”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/compression-unprofitable.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/compression-unprofitable.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SQLite compression fallback”、“keeps large data as text when its Zstandard frame is not smaller”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SQLite compression fallback”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-sqlite/src/compression.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/compression.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence-sqlite/src/compression.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的测试主题包括 “SQLite compression fallback”、“keeps large data as text when its Zstandard frame is not smaller”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/compression.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/compression.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SQLite compression”、“stores a 100-member run in one row and restores every logical event”、“partitions long and large runs within schema-owned row limits”、“packs every owned kind and preserves optional tool-call names”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SQLite compression”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `chunk`、`event`、`row`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence-sqlite/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/codec.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-persistence-sqlite/src/codec.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 357 行；扫描到的声明包括 `chunk`、`event`、`row`；扫描到的测试主题包括 “SQLite compression”、“stores a 100-member run in one row and restores every logical event”、“partitions long and large runs within schema-owned row limits”、“packs every owned kind and preserves optional tool-call names”、“keeps every off-format delta scalar and splits incompatible runs”、“decodes the schema-17 row vocabulary without another package codec”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/differential.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/differential.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SQLite cross-backend differential behavior”、“preserves ignorable logical events whose names match physical storage tags”、“matches JSONL/Zstandard for every packed kind, scalar fallback, suffix, partition, and ...”、“matches JSONL/Zstandard across randomized logical logs and append partitions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SQLite cross-backend differential behavior”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `freshDirectory`、`mount`、`closedChunkLog`、`packingMatrixLog`、`storageTagCollisionLog`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-persistence-jsonl/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 273 行；扫描到的声明包括 `freshDirectory`、`mount`、`closedChunkLog`、`packingMatrixLog`、`storageTagCollisionLog`、`batches`、`verifyBackend`；扫描到的测试主题包括 “SQLite cross-backend differential behavior”、“preserves ignorable logical events whose names match physical storage tags”、“matches JSONL/Zstandard for every packed kind, scalar fallback, suffix, partition, and reopen”、“matches JSONL/Zstandard across randomized logical logs and append partitions”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/add-unexpected-column.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/add-unexpected-column.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“add-unexpected-column”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 ALTER 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行；SQL 中扫描到 ALTER 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/count-events.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/count-events.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“count-events”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 2 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/count-ignorable-events.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/count-ignorable-events.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“count-ignorable-events”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/count-packed-events.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/count-packed-events.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“count-packed-events”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/count-physical-types.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/count-physical-types.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“count-physical-types”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 6 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/create-loose-schema.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/create-loose-schema.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“create-loose-schema”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 CREATE、INSERT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 14 行；SQL 中扫描到 CREATE、INSERT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/create-unrelated-table.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/create-unrelated-table.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“create-unrelated-table”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 CREATE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行；SQL 中扫描到 CREATE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/delete-persistence-state.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/delete-persistence-state.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“delete-persistence-state”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 DELETE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行；SQL 中扫描到 DELETE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/delete-session-events.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/delete-session-events.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“delete-session-events”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 DELETE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 2 行；SQL 中扫描到 DELETE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/empty-store-id.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/empty-store-id.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“empty-store-id”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 UPDATE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 UPDATE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/insert-corrupt-event.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/insert-corrupt-event.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“insert-corrupt-event”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 INSERT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 2 行；SQL 中扫描到 INSERT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/measure-write-traffic.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/measure-write-traffic.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“measure-write-traffic”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/replace-events-with-nonstrict-table.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/replace-events-with-nonstrict-table.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“replace-events-with-nonstrict-table”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 ALTER、CREATE、DELETE、DROP 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 14 行；SQL 中扫描到 ALTER、CREATE、DELETE、DROP 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/select-event-rowids.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/select-event-rowids.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“select-event-rowids”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/select-event-rows.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/select-event-rows.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“select-event-rows”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 4 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/select-last-event.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/select-last-event.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“select-last-event”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 SELECT 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 5 行；SQL 中扫描到 SELECT 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/select-user-version.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/select-user-version.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“select-user-version”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/set-application-id-12345.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/set-application-id-12345.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“set-application-id-12345”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/set-user-version-15.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/set-user-version-15.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“set-user-version-15”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/set-user-version-16.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/set-user-version-16.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“set-user-version-16”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/set-user-version-17.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/set-user-version-17.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“set-user-version-17”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/resources/sql/update-invalid-session-metadata.sql](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/resources/sql/update-invalid-session-metadata.sql)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“update-invalid-session-metadata”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的结构线索是：SQL 中扫描到 UPDATE 语句；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 3 行；SQL 中扫描到 UPDATE 语句。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/sql-resource-boundary.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sql-resource-boundary.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SQLite SQL resource boundary”、“keeps statements and query assembly out of TypeScript files”、“keeps resource text static instead of interpolated”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SQLite SQL resource boundary”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `filesUnder`、`sqlLiteralText`、`isOwnedSqlSource`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `filesUnder`、`sqlLiteralText`、`isOwnedSqlSource`；扫描到的测试主题包括 “SQLite SQL resource boundary”、“keeps statements and query assembly out of TypeScript files”、“keeps resource text static instead of interpolated”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SessionPersistenceSqlite physical packing”、“loads from cordis.yml and packs through the assembled service”、“packs each append once without rewriting earlier rows and seeks inside packed rows”、“includes a packed predecessor when an overlapping scalar tail hides it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionPersistenceSqlite physical packing”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `freshDbPath`、`backendFailure`、`errorMessage`、`databaseWithJournalFailure`、`chunk`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence-sqlite/src/codec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/codec.ts)、[packages/session/session-persistence-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence-sqlite/src/codec.ts`、`packages/session/session-persistence-sqlite/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 833 行；扫描到的声明包括 `freshDbPath`、`backendFailure`、`errorMessage`、`databaseWithJournalFailure`、`chunk`、`chunkLog`、`measureWriteTraffic`；扫描到的测试主题包括 “SessionPersistenceSqlite physical packing”、“loads from cordis.yml and packs through the assembled service”、“packs each append once without rewriting earlier rows and seeks inside packed rows”、“includes a packed predecessor when an overlapping scalar tail hides it”、“waits for a competing process within the configured busy timeout”、“rejects an older SQLite physical schema”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“test-sql”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test-only loader for fixed SQLite fixtures.”；固定提交中扫描到的声明包括 `TestSqlName`、`testSql`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/README.md)、[packages/session/session-persistence-sqlite/tests/differential.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/differential.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 对应测试：[packages/session/session-persistence-sqlite/tests/differential.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/differential.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/session/session-persistence-sqlite/tests/differential.spec.ts`、`packages/session/session-persistence-sqlite/tests/sqlite.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `TestSqlName`、`testSql`；源码顶部原注释（英文，仅作回查线索）：Test-only loader for fixed SQLite fixtures.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-persistence

### [packages/session/session-persistence/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/coordinator.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Shared buffering, serialization, adoption, repair, and disposal orchestration for first-party backends. Third-party backends may implement the public persistence seam directly. @module @deepseek-ai/dsh-session-persistence/coordinator”；固定提交中扫描到的声明包括 `DEFAULT_PREPARED_SESSION_CACHE_SIZE`、`DEFAULT_WRITE_BATCH_MAX_DELAY_MS`、`MAX_WRITE_BATCH_DELAY_MS`、`SessionPersistenceCorruptionError`、`SessionFormatUnsupportedError`；本地静态 import 图显示它直接依赖 7 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)、[packages/session/session-persistence/src/preparations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/preparations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-authoring.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/approval-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/approval-composer.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session/session-persistence/src/index.ts`、`packages/session/session-persistence/src/preparations.ts` 和 `packages/session/session-persistence/src/index.ts` 理解状态变化，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/stress-tests/reasoning-chunks.stress.ts`、`apps/web/tests/access-confirmation.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 1362 行；扫描到的声明包括 `DEFAULT_PREPARED_SESSION_CACHE_SIZE`、`DEFAULT_WRITE_BATCH_MAX_DELAY_MS`、`MAX_WRITE_BATCH_DELAY_MS`、`SessionPersistenceCorruptionError`、`SessionFormatUnsupportedError`、`sessionFormatVersionRefusal`、`PersistenceCoordinatorOptions`、`StoredPrefix`；源码顶部原注释（英文，仅作回查线索）：Shared buffering, serialization, adoption, repair, and disposal orchestration for first-party backends. Third-party backends may implement the public persistence seam directly. @module @deepseek-ai/dsh-session-persistence/coordinator。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、持久化相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Durable session-persistence Service Definition (ctx.sessionPersistence). Backends store SessionEvents as the event-sourced log and carry non-replayable SessionHeader metadata separately. @module @deepseek-ai/dsh-session-persistence”；固定提交中扫描到的声明包括 `SessionPersistenceSnapshot`、`SessionInspection`、`SessionRawArtifact`、`SessionLocation`；本地静态 import 图显示它直接依赖 4 个源文件，并被 32 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/coordinator.ts)、[packages/session/session-persistence/src/revision.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/revision.ts)、[packages/api/remotes/src/agent-lookup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/agent-lookup.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/session-export.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/session-export.spec.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/session-query.spec.ts)、[packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/tracing.spec.ts)、[packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-checkpoint-policy/tests/session-checkpoint-policy.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先读 `packages/session/session-persistence/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/remotes/src/agent-lookup.ts`、`packages/core/agent-loop/src/index.ts`、`packages/experimental/agent-team/src/index.ts` 看它怎样约束运行时，最后对照 `packages/host/apiproxy/tests/api-proxy-cold.spec.ts`、`packages/host/apiproxy/tests/session-export.spec.ts`、`packages/session-query/session-query-sqlite/tests/sqlite.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `SessionPersistenceSnapshot`、`SessionInspection`、`SessionRawArtifact`、`SessionLocation`；源码顶部原注释（英文，仅作回查线索）：Durable session-persistence Service Definition (ctx.sessionPersistence). Backends store SessionEvents as the event-sourced log and carry non-replayable SessionHeader metadata separately. @module @deepseek-ai/dsh-session-persistence。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、持久化必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-persistence. @module @deepseek-ai/dsh-session-persistence/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-persistence. @module @deepseek-ai/dsh-session-persistence/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/src/preparations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/preparations.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Bounded sharing and exclusive reservation of unpublished Sessions. @module @deepseek-ai/dsh-session-persistence/preparations”；固定提交中扫描到的声明包括 `SessionPreparationReservation`、`SessionPreparations`、`observeQueuedAbort`、`rejectObservation`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/coordinator.ts)、[packages/session/session-persistence/tests/preparations.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/preparations.spec.ts)
- 对应测试：[packages/session/session-persistence/tests/preparations.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/preparations.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts` 和 `packages/session/session-persistence/src/coordinator.ts`、`packages/session/session-persistence/tests/preparations.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence/tests/preparations.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 348 行；扫描到的声明包括 `SessionPreparationReservation`、`SessionPreparations`、`observeQueuedAbort`、`rejectObservation`；源码顶部原注释（英文，仅作回查线索）：Bounded sharing and exclusive reservation of unpublished Sessions. @module @deepseek-ai/dsh-session-persistence/preparations。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/src/revision.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/revision.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Opaque revision identity for lightweight persistence observations.”；固定提交中扫描到的声明包括 `SessionPersistenceRevision`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/session/session-persistence/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/coordinator.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-authoring.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/approval-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/approval-composer.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/util/brand/src/index.ts` 和 `packages/session/session-persistence/src/coordinator.ts`、`packages/session/session-persistence/src/index.ts` 理解状态变化，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/stress-tests/reasoning-chunks.stress.ts`、`apps/web/tests/access-confirmation.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的声明包括 `SessionPersistenceRevision`；源码顶部原注释（英文，仅作回查线索）：Opaque revision identity for lightweight persistence observations.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/src/write-behind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/write-behind.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Bounded per-session write batching for the shared persistence coordinator. @module @deepseek-ai/dsh-session-persistence/write-behind”；固定提交中扫描到的声明包括 `SessionWriteBehindOptions`、`SessionWriteBehind`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/coordinator.ts)、[packages/session/session-persistence/tests/write-behind.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/write-behind.spec.ts)
- 对应测试：[packages/session/session-persistence/tests/write-behind.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/write-behind.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts` 和 `packages/session/session-persistence/src/coordinator.ts`、`packages/session/session-persistence/tests/write-behind.spec.ts` 理解状态变化，最后对照 `packages/session/session-persistence/tests/write-behind.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 159 行；扫描到的声明包括 `SessionWriteBehindOptions`、`SessionWriteBehind`；源码顶部原注释（英文，仅作回查线索）：Bounded per-session write batching for the shared persistence coordinator. @module @deepseek-ai/dsh-session-persistence/write-behind。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：共享测试契约
- 这个文件有什么用：它为会话、持久化定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。
- 为什么这样设计：多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。
- 文件级设计证据：源码顶部注释把它定位为“Reusable contract test for any SessionPersistence backend. A backend package imports runPersistenceContract and calls it with a factory that yields a fresh, empty backend (and a teardown), so every backend is held to the same append-only / contiguous-seq / ...”；固定提交中扫描到的声明包括 `ContractBackend`、`meta`、`oneTurnLog`、`appendLog`、`runPersistenceContract`；本地静态 import 图显示它直接依赖 3 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)、[packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)
- 对应测试：[packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)、[packages/session/session-persistence-sqlite/tests/differential.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/differential.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)、[packages/session/session-persistence/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/persistence.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先读 `packages/session/session-persistence/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-persistence/src/index.ts` 和 `packages/session/session-persistence-jsonl/tests/jsonl.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`、`packages/session/session-persistence-sqlite/tests/differential.spec.ts` 确认输入输出，最后对照 `packages/session/session-persistence-jsonl/tests/jsonl.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`、`packages/session/session-persistence-sqlite/tests/differential.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 432 行；扫描到的声明包括 `ContractBackend`、`meta`、`oneTurnLog`、`appendLog`、`runPersistenceContract`；扫描到的测试主题包括 “SessionPersistence contract: ${name}”、“round-trips a session: create + append → load returns identical meta and byte-identical events”、“rejects a fractional creation timestamp without reserving its session id”、“crash recovery: load preserves an interrupted (unclosed) turn and closes it with turn/end {interrupted}”、“crash recovery: an unstarted assistant tool request gets a retryable synthetic result”、“crash recovery: a recorded tool call with no result tells the model to assess retry risk”；源码顶部原注释（英文，仅作回查线索）：Reusable contract test for any SessionPersistence backend. A backend package imports runPersistenceContract and calls it with a factory that yields a fresh, empty backend (and a teardown), so every backend is held to the same append-only / contiguous-seq / ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：共享测试契约
- 这个文件有什么用：它为会话、持久化定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。
- 为什么这样设计：多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。
- 文件级设计证据：固定提交中扫描到的声明包括 `CoordinatorFixture`、`runCoordinatorContract`、`send`、`legacyMessageLog`、`preReactLoopLog`；本地静态 import 图显示它直接依赖 5 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)
- 对应测试：[packages/session/session-persistence-jsonl/tests/jsonl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/jsonl.spec.ts)、[packages/session/session-persistence-jsonl/tests/zstd.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/tests/zstd.spec.ts)、[packages/session/session-persistence-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/sqlite.spec.ts)、[packages/session/session-persistence/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/persistence.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/session/session-persistence-sqlite/tests/test-sql.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-sqlite/tests/test-sql.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)
- 阅读顺序：先读 `packages/session/session-persistence/README.md` 和入口，再读当前实现，沿着 `packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/session/session-persistence-jsonl/tests/jsonl.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`、`packages/session/session-persistence-sqlite/tests/sqlite.spec.ts` 确认输入输出，最后对照 `packages/session/session-persistence-jsonl/tests/jsonl.spec.ts`、`packages/session/session-persistence-jsonl/tests/zstd.spec.ts`、`packages/session/session-persistence-sqlite/tests/sqlite.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 1482 行；扫描到的声明包括 `CoordinatorFixture`、`runCoordinatorContract`、`send`、`legacyMessageLog`、`preReactLoopLog`、`liveSessionInFiber`、`freshCtx`；扫描到的测试主题包括 “PersistenceCoordinator orchestration: ${name}”、“persists a live session driven through the store, surviving reload”、“rejects crash-repair load while a live session owns the persisted prefix”、“rechecks live ownership after a cold load enters the per-id chain”、“does not load an unmaterialized empty live session”、“round-trips the seed boundary (seedLength) through persistence”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/persistence.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“the inherited readRaw default”、“rejects unsupported reads distinctly from absence and honors an aborted signal”、“PersistenceCoordinator seed ownership”、“retains the immutable session seed without cloning it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the inherited readRaw default”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `memoryRevision`、`legacyHeaderDelta`、`legacyModeSet`、`legacyFallbackHeader`、`MemoryPersistence`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)、[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session/session-persistence/tests/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/contract.ts)、[packages/session/session-persistence/tests/coordinator-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/coordinator-contract.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1962 行；扫描到的声明包括 `memoryRevision`、`legacyHeaderDelta`、`legacyModeSet`、`legacyFallbackHeader`、`MemoryPersistence`、`ControlledBackend`；扫描到的测试主题包括 “the inherited readRaw default”、“rejects unsupported reads distinctly from absence and honors an aborted signal”、“PersistenceCoordinator seed ownership”、“retains the immutable session seed without cloning it”、“PersistenceCoordinator bounded writes”、“cancels the batching deadline when live initialization rejects”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/tests/preparations.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/preparations.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SessionPreparations inspection”、“shares in-flight and ready sources, then invalidates them”、“keeps a shared load alive when its first observer cancels”、“evicts completed loads whose observers cancelled before readiness”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionPreparations inspection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Unit coverage for unpublished Session preparation ownership and sharing.”；固定提交中扫描到的声明包括 `prepared`、`committed`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/preparations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/preparations.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence/src/preparations.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 360 行；扫描到的声明包括 `prepared`、`committed`；扫描到的测试主题包括 “SessionPreparations inspection”、“shares in-flight and ready sources, then invalidates them”、“keeps a shared load alive when its first observer cancels”、“evicts completed loads whose observers cancelled before readiness”、“removes failed and invalidated in-flight loads without changing their observers”、“removes a load that throws before returning its promise”；源码顶部原注释（英文，仅作回查线索）：Unit coverage for unpublished Session preparation ownership and sharing.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-persistence/tests/write-behind.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/tests/write-behind.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“SessionWriteBehind”、“uses one fixed window from the first queued event and owns its copy”、“coalesces twenty events admitted ten milliseconds apart into one 200 ms batch”、“makes concurrent flushes one immediate barrier that drains admitted tails”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionWriteBehind”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `event`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-persistence/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/write-behind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/write-behind.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-persistence/src/write-behind.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 275 行；扫描到的声明包括 `event`；扫描到的测试主题包括 “SessionWriteBehind”、“uses one fixed window from the first queued event and owns its copy”、“coalesces twenty events admitted ten milliseconds apart into one 200 ms batch”、“makes concurrent flushes one immediate barrier that drains admitted tails”、“starts a new window for work admitted after an already-quiescent barrier”、“starts an over-budget tail immediately after the active write”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-projection-cache

### [packages/session/session-projection-cache/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、状态投影相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Persisted projection cache (ctx.sessionProjectionCache): durable checkpoints of every client-visible or explicitly persisted projection unit's state, one record per session on the domain data form (session_projcache domain — the shipped json backend lands i...”；固定提交中扫描到的声明包括 `Config`、`SessionProjectionCache`、`identityOf`、`identityMatches`；本地静态 import 图显示它直接依赖 7 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/session/session-projection-cache/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence/src/index.ts)、[packages/session/session-projection-cache/src/spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/src/spec.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：[packages/session/session-projection-cache/tests/cache.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/tests/cache.spec.ts)、[packages/subagent/subagent/tests/list-children.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent/tests/list-children.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/storage/storage-domain/tests/helpers/memory-backend.ts)
- 阅读顺序：先读 `packages/session/session-projection-cache/README.md`、入口和消费者，再读当前契约，沿着 `packages/host/apiproxy/src/api-proxy.ts`、`packages/session/session-projection-cache/tests/cache.spec.ts`、`packages/subagent/subagent/src/list-children.ts` 看它怎样约束运行时，最后对照 `packages/session/session-projection-cache/tests/cache.spec.ts`、`packages/subagent/subagent/tests/list-children.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 299 行；扫描到的声明包括 `Config`、`SessionProjectionCache`、`identityOf`、`identityMatches`；源码顶部原注释（英文，仅作回查线索）：Persisted projection cache (ctx.sessionProjectionCache): durable checkpoints of every client-visible or explicitly persisted projection unit's state, one record per session on the domain data form (session_projcache domain — the shipped json backend lands i...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-projection-cache/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、状态投影必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-projection-cache. @module @deepseek-ai/dsh-session-projection-cache/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-projection-cache/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-projection-cache. @module @deepseek-ai/dsh-session-projection-cache/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-projection-cache/src/spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/src/spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“The session-projcache domain declaration: one sessions table keyed by SessionId, each record the full projection checkpoint for one session (key → {ver, seq, val} rows). The spec object is the single source of the domain's identity, version, and record sche...”；固定提交中扫描到的声明包括 `checkpointRow`、`checkpointIdentity`、`CheckpointIdentity`、`checkpointRecord`、`CheckpointRecord`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-projection-cache/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/storage/storage-domain/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/storage/storage-domain/src/index.ts)、[packages/session/session-projection-cache/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/subagent-conversation.e2e.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/storage/storage-domain/src/index.ts` 和 `packages/session/session-projection-cache/src/index.ts` 理解状态变化，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `checkpointRow`、`checkpointIdentity`、`CheckpointIdentity`、`checkpointRecord`、`CheckpointRecord`、`projectionCacheDomainSpec`；源码顶部原注释（英文，仅作回查线索）：The session-projcache domain declaration: one sessions table keyed by SessionId, each record the full projection checkpoint for one session (key → {ver, seq, val} rows). The spec object is the single source of the domain's identity, version, and record sche...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-projection-cache/tests/cache.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/tests/cache.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、状态投影的具体场景，包括“SessionProjectionCache write policy”、“writes a durable checkpoint at turn/end (mandatory point)”、“writes at session disposal (detach, the live-to-cold moment)”、“flushes when the in-turn event count reaches the configured threshold”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionProjectionCache write policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SessionProjectionCache behavior: mandatory-point writes (turn/end, detach), count/interval throttling between them, fail-soft durability (a failed write logs and stays stale, never throws into the event path), and the cold-read ladder (cached row + readFrom...”；固定提交中扫描到的声明包括 `fakePersistence`、`harness`、`storedRecord`、`storedRows`、`seedRow`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-projection-cache/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-projection-cache/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection-cache/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/storage/storage-domain/tests/helpers/memory-backend.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-projection-cache/src/index.ts`、`packages/session/session-projection/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 406 行；扫描到的声明包括 `fakePersistence`、`harness`、`storedRecord`、`storedRows`、`seedRow`；扫描到的测试主题包括 “SessionProjectionCache write policy”、“writes a durable checkpoint at turn/end (mandatory point)”、“writes at session disposal (detach, the live-to-cold moment)”、“flushes when the in-turn event count reaches the configured threshold”、“flushes on the configured interval when the count threshold is not reached”、“write() on a never-dirty session checkpoints directly and rejects a non-JSON unit state”；源码顶部原注释（英文，仅作回查线索）：SessionProjectionCache behavior: mandatory-point writes (turn/end, detach), count/interval throttling between them, fail-soft durability (a failed write logs and stays stale, never throws into the event path), and the cold-read ladder (cached row + readFrom...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-projection

### [packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、状态投影相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition and drive registry for the session-projection capability seam: the merge-extensible state and client-view type tables, the ProjectionDefinition state-driven computation unit contract, and the ctx.sessionProjections registry that DRIVES ev...”；固定提交中扫描到的声明包括 `ProjectionDefinition`、`ProjectionChangeListener`、`ProjectionSnapshot`、`ProjectionCheckpointRow`、`ProjectionCheckpoint`；本地静态 import 图显示它直接依赖 3 个源文件，并被 32 个源文件直接引用。
- 直接协作者：[packages/session/session-projection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-projection/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[packages/goal/goal/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/goal/goal/tests/projection.spec.ts)、[packages/host/apiproxy/tests/api-proxy-projections.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-projections.spec.ts)、[packages/interaction/permission-presets/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/permission-presets/tests/projection.spec.ts)、[packages/llm/token-meter/tests/context-breakdown-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/context-breakdown-projection.spec.ts)、[packages/llm/token-meter/tests/token-meter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/token-meter.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-projection/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/web-agent-presets.e2e.ts`、`packages/goal/goal/src/index.ts`、`packages/goal/goal/tests/projection.spec.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`packages/goal/goal/tests/projection.spec.ts`、`packages/host/apiproxy/tests/api-proxy-projections.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 497 行；扫描到的声明包括 `ProjectionDefinition`、`ProjectionChangeListener`、`ProjectionSnapshot`、`ProjectionCheckpointRow`、`ProjectionCheckpoint`、`SessionProjectionRegistry`；源码顶部原注释（英文，仅作回查线索）：Service Definition and drive registry for the session-projection capability seam: the merge-extensible state and client-view type tables, the ProjectionDefinition state-driven computation unit contract, and the ctx.sessionProjections registry that DRIVES ev...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-projection/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、状态投影必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-projection. @module @deepseek-ai/dsh-session-projection/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-projection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-projection. @module @deepseek-ai/dsh-session-projection/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-projection/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/types.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述会话、状态投影中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Pure-type outlet of the session-projection Service Definition: the one projection type table, importable from client aggregates without dragging the host-side cordis Context merges of the package root (dsh-agent → dsh-session). Domain packages may declare-m...”；固定提交中扫描到的声明包括 `SessionProjectionMap`、`SessionProjectionStateMap`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/session/session-projection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/README.md)、[packages/client/runtime/src/client/sessions/lineage.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/lineage.ts)、[packages/client/runtime/src/client/sessions/projection-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/projection-store.ts)、[packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)、[apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/complex-history.perf.ts)、[apps/web/tests/composer-tab-geometry.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/composer-tab-geometry.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session/session-projection/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/src/client/sessions/lineage.ts`、`packages/client/runtime/src/client/sessions/projection-store.ts`、`packages/client/runtime/src/client/sessions/service.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/chat-long-interactions.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的声明包括 `SessionProjectionMap`、`SessionProjectionStateMap`；源码顶部原注释（英文，仅作回查线索）：Pure-type outlet of the session-projection Service Definition: the one projection type table, importable from client aggregates without dragging the host-side cordis Context merges of the package root (dsh-agent → dsh-session). Domain packages may declare-m...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-projection/tests/registry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/tests/registry.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、状态投影的具体场景，包括“SessionProjectionRegistry drive”、“drives a registered unit over committed events and snapshots the current value”、“builds the cell lazily from the full log for a unit registered after events flowed”、“serves init-derived state and asOfSeq -1 for an empty log”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionProjectionRegistry drive”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SessionProjectionRegistry unit drive: eager apply on committed events with lazy cell build (registration after events, session after registration), the Object.is no-change gate (same reference ⇒ zero change-feed work), snapshot consistency (asOfSeq = last e...”；固定提交中扫描到的声明包括 `harness`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-projection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-projection/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 420 行；扫描到的声明包括 `harness`；扫描到的测试主题包括 “SessionProjectionRegistry drive”、“drives a registered unit over committed events and snapshots the current value”、“builds the cell lazily from the full log for a unit registered after events flowed”、“serves init-derived state and asOfSeq -1 for an empty log”、“notifies onChanged with the validated view and the causing seq, and skips same-reference applies”、“drives independently per session (cells are per-session watermarks)”；源码顶部原注释（英文，仅作回查线索）：SessionProjectionRegistry unit drive: eager apply on committed events with lazy cell build (registration after events, session after registration), the Object.is no-change gate (same reference ⇒ zero change-feed work), snapshot consistency (asOfSeq = last e...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-stats

### [packages/session/session-stats/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/client.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成会话、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Client-namespace projection of the session-stats domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — ...”；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/session/session-stats/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/types.ts)、[packages/client/ui-conversation/src/client/chat/StatsLine.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/chat/StatsLine.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-conversation/tests/apply-inject.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/apply-inject.client.spec.tsx)、[packages/client/ui-conversation/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-conversation/tests/chat-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-apply.client.spec.tsx)、[packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session/session-stats/README.md` 和入口，再读当前实现，沿着 `packages/session/session-stats/src/types.ts` 和 `packages/client/ui-conversation/src/client/chat/StatsLine.tsx` 确认输入输出，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-conversation/tests/apply-inject.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Client-namespace projection of the session-stats domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-stats/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Function plugin registering the sessionStats projection unit: whole-log turn/step counts and LLM/tool/first-token/decode wall times served through the session-projection seam (registry snapshot, change feed, and every projection carrier), so clients render ...”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/session/session-stats/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/projection.ts)、[packages/session/session-stats/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/session/session-stats/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/loader-composition.spec.ts)
- 对应测试：[packages/session/session-stats/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/loader-composition.spec.ts)、[packages/session/session-stats/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-stats/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-stats/tests/loader-composition.spec.ts`、`packages/session/session-stats/tests/projection.spec.ts` 看它怎样约束运行时，最后对照 `packages/session/session-stats/tests/loader-composition.spec.ts`、`packages/session/session-stats/tests/projection.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Function plugin registering the sessionStats projection unit: whole-log turn/step counts and LLM/tool/first-token/decode wall times served through the session-projection seam (registry snapshot, change feed, and every projection carrier), so clients render ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-stats/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-stats. @module @deepseek-ai/dsh-session-stats/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-stats. @module @deepseek-ai/dsh-session-stats/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-stats/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/projection.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把会话、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 文件级设计证据：源码顶部注释把它定位为“The sessionStats projection unit: a pure fold of step boundaries, stream chunks, tool pairs, and assembled assistant messages into whole-log counts and wall times. step/end — not assistant/message — is the counted step event because it is the step lifecycle...”；固定提交中扫描到的声明包括 `sessionStatsProjectionDefinition`、`usageOutputTokens`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)、[packages/session/session-stats/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/index.ts)、[packages/session/session-stats/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/projection.spec.ts)
- 对应测试：[packages/session/session-stats/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/llm/llm/src/message.ts`、`packages/session/session-projection/src/index.ts` 和 `packages/session/session-stats/src/index.ts`、`packages/session/session-stats/tests/projection.spec.ts` 理解状态变化，最后对照 `packages/session/session-stats/tests/projection.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 209 行；扫描到的声明包括 `sessionStatsProjectionDefinition`、`usageOutputTokens`；源码顶部原注释（英文，仅作回查线索）：The sessionStats projection unit: a pure fold of step boundaries, stream chunks, tool pairs, and assembled assistant messages into whole-log counts and wall times. step/end — not assistant/message — is the counted step event because it is the step lifecycle...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-stats/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/types.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述会话中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Pure types of the session-stats domain: the ONE home of the sessionStats projection-key declaration, free of this package's host-side value imports (cordis context, zod, the llm chunk predicate). Two namespace projections serve it — ./types for host consume...”；固定提交中扫描到的声明包括 `SessionStatsProjection`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/session/session-stats/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/client.ts)、[packages/session/session-stats/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/index.ts)、[packages/session/session-stats/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/projection.spec.ts)
- 对应测试：[packages/session/session-stats/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-stats/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-stats/src/client.ts`、`packages/session/session-stats/src/index.ts`、`packages/session/session-stats/tests/projection.spec.ts` 看它怎样约束运行时，最后对照 `packages/session/session-stats/tests/projection.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 46 行；扫描到的声明包括 `SessionStatsProjection`；源码顶部原注释（英文，仅作回查线索）：Pure types of the session-stats domain: the ONE home of the sessionStats projection-key declaration, free of this package's host-side value imports (cordis context, zod, the llm chunk predicate). Two namespace projections serve it — ./types for host consume...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-stats/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/loader-composition.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“real Loader composition”、“loads the shipped session-stats YAML shape and serves whole-log counts”、“keeps the function-plugin namespace free of a default export”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“REAL-composition proof: the shipped YAML shape (session + projection registry + session-stats) boots through the vendored Loader, the function plugin's namespace survives (no default export), and a full logged turn serves {turns: 1, steps: 1} through the co...”；固定提交中扫描到的声明包括 `loadYaml`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)、[packages/session/session-stats/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-projection/src/index.ts`、`packages/session/session-stats/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `loadYaml`；扫描到的测试主题包括 “real Loader composition”、“loads the shipped session-stats YAML shape and serves whole-log counts”、“keeps the function-plugin namespace free of a default export”；源码顶部原注释（英文，仅作回查线索）：REAL-composition proof: the shipped YAML shape (session + projection registry + session-stats) boots through the vendored Loader, the function plugin's namespace survives (no default export), and a full logged turn serves {turns: 1, steps: 1} through the co...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-stats/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/tests/projection.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、状态投影的具体场景，包括“sessionStats projection unit (registry drive)”、“serves zero figures on the empty log”、“counts distinct turns and closed steps and notifies the change feed with the causing seq”、“does not count a rejected or empty turn that closes with no step”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“sessionStats projection unit (registry drive)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The sessionStats projection unit: mounting the plugin beside the projection registry serves whole-log counts and wall times folded from step boundaries, chunks, tool pairs, and assembled messages; compositions without the registry are unaffected; unmounting...”；固定提交中扫描到的声明包括 `harness`、`closeStep`、`appendEmptyAssistantMessage`、`totals`、`at`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-stats/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-stats/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-projection/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 292 行；扫描到的声明包括 `harness`、`closeStep`、`appendEmptyAssistantMessage`、`totals`、`at`、`fold`；扫描到的测试主题包括 “sessionStats projection unit (registry drive)”、“serves zero figures on the empty log”、“counts distinct turns and closed steps and notifies the change feed with the causing seq”、“does not count a rejected or empty turn that closes with no step”、“counts a cancelled step that closed without an assistant message”、“adds no extra step for a max-tokens usage-host assistant message”；源码顶部原注释（英文，仅作回查线索）：The sessionStats projection unit: mounting the plugin beside the projection registry serves whole-log counts and wall times folded from step boundaries, chunks, tool pairs, and assembled messages; compositions without the registry are unaffected; unmounting...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-telemetry-otel

### [packages/session/session-telemetry-otel/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“OpenTelemetry Service Provider for the DeepSeek Harness telemetry capability. Composes the OTel JS SDK as-is — a LoggerProvider with a BatchLogRecordProcessor and an OTLP/HTTP log exporter — and maps each record handed over by the capture coordinator onto l...”；固定提交中扫描到的声明包括 `SessionTelemetryMode`、`DEFAULT_TELEMETRY_MODE`、`Config`、`DEFAULT_SHUTDOWN_TIMEOUT_MILLIS`、`OpenTelemetrySessionBackend`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry-otel/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/README.md)、[packages/feedback/command-feedback/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/src/index.ts)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/identity/anonymous-user-id/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-telemetry-otel/tests/otel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/tests/otel.spec.ts)
- 对应测试：[packages/session/session-telemetry-otel/tests/otel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/tests/otel.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-telemetry-otel/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-telemetry-otel/tests/otel.spec.ts` 看它怎样约束运行时，最后对照 `packages/session/session-telemetry-otel/tests/otel.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 301 行；扫描到的声明包括 `SessionTelemetryMode`、`DEFAULT_TELEMETRY_MODE`、`Config`、`DEFAULT_SHUTDOWN_TIMEOUT_MILLIS`、`OpenTelemetrySessionBackend`、`resolveMode`、`assertNever`、`sharingStatusFor`；源码顶部原注释（英文，仅作回查线索）：OpenTelemetry Service Provider for the DeepSeek Harness telemetry capability. Composes the OTel JS SDK as-is — a LoggerProvider with a BatchLogRecordProcessor and an OTLP/HTTP log exporter — and maps each record handed over by the capture coordinator onto l...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry-otel/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-telemetry-otel. @module @deepseek-ai/dsh-session-telemetry-otel/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry-otel/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-telemetry-otel. @module @deepseek-ai/dsh-session-telemetry-otel/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry-otel/tests/loader-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/tests/loader-composition.e2e.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“session-telemetry-otel through a real headless cordis.yml”、“exports redacted ledger records to the collector while the canonical log keeps the secret”、“exports only prefixes ending in feedback under feedback-only mode”、“keeps disabled feedback local and prints the stable warning”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-telemetry-otel through a real headless cordis.yml”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“REAL-composition tier: boot the examples-owned telemetry Loader fixture as a subprocess (per testing policy, through the same app/boot path a deployment uses), run one mocked-model turn with a real bash round trip, and assert against what the mock OTLP coll...”；固定提交中扫描到的声明包括 `jsonlFiles`、`readFixtureOutput`、`allRecords`、`eventTypes`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry-otel/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 154 行；扫描到的声明包括 `jsonlFiles`、`readFixtureOutput`、`allRecords`、`eventTypes`；扫描到的测试主题包括 “session-telemetry-otel through a real headless cordis.yml”、“exports redacted ledger records to the collector while the canonical log keeps the secret”、“exports only prefixes ending in feedback under feedback-only mode”、“keeps disabled feedback local and prints the stable warning”；源码顶部原注释（英文，仅作回查线索）：REAL-composition tier: boot the examples-owned telemetry Loader fixture as a subprocess (per testing policy, through the same app/boot path a deployment uses), run one mocked-model turn with a real bash round trip, and assert against what the mock OTLP coll...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry-otel/tests/otel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/tests/otel.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“OpenTelemetrySessionBackend wire”、“ships session records and the ops shutdown marker through the real SDK pipeline”、“drains records enqueued after a timer export began: dispose during an in-flight batch”、“bounds the SDK forceFlush wait when an in-flight transport never settles”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“OpenTelemetrySessionBackend wire”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“OTel backend unit tier: wire assertions against a scripted node:http mock collector through the SDK's REAL pipeline (BatchLogRecordProcessor → OTLP/HTTP JSON), config fail-loud cases, and the real-Loader-path guard for the default-exported Service class.”；固定提交中扫描到的声明包括 `mockCollector`、`boot`、`allRecords`、`eventTypes`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry-otel/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/feedback/command-feedback/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/src/index.ts)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/identity/anonymous-user-id/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/feedback/command-feedback/src/index.ts`、`packages/identity/anonymous-user-id/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 514 行；扫描到的声明包括 `mockCollector`、`boot`、`allRecords`、`eventTypes`；扫描到的测试主题包括 “OpenTelemetrySessionBackend wire”、“ships session records and the ops shutdown marker through the real SDK pipeline”、“drains records enqueued after a timer export began: dispose during an in-flight batch”、“bounds the SDK forceFlush wait when an in-flight transport never settles”、“passes exporter options beyond url and headers through to the SDK exporter”、“maps warn severity from record policy and leaves the seam flush hint unimplemented”；源码顶部原注释（英文，仅作回查线索）：OTel backend unit tier: wire assertions against a scripted node:http mock collector through the SDK's REAL pipeline (BatchLogRecordProcessor → OTLP/HTTP JSON), config fail-loud cases, and the real-Loader-path guard for the default-exported Service class.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-telemetry

### [packages/session/session-telemetry/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/src/coordinator.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Capture coordinator for the telemetry capability. Live capture subscribes to the session firehose plus the one live-bus relay (agent/error). Both capture paths apply the fixed chunk projection, build logical records, and run each through the session-telemet...”；固定提交中扫描到的声明包括 `SessionTelemetryCapture`、`SessionTelemetryCoordinator`、`shutdownRecord`、`severityOf`、`errorDetail`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-telemetry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/feedback/command-feedback/tests/command-feedback.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/tests/command-feedback.spec.ts)、[packages/feedback/command-feedback/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/tests/loader-composition.spec.ts)、[packages/session/session-telemetry-otel/tests/otel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry-otel/tests/otel.spec.ts)、[packages/session/session-telemetry/tests/redact.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/tests/redact.spec.ts)、[packages/session/session-telemetry/tests/telemetry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/tests/telemetry.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/session/session-telemetry/src/index.ts` 和 `packages/session/session-telemetry/src/index.ts` 理解状态变化，最后对照 `packages/feedback/command-feedback/tests/command-feedback.spec.ts`、`packages/feedback/command-feedback/tests/loader-composition.spec.ts`、`packages/session/session-telemetry-otel/tests/otel.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 319 行；扫描到的声明包括 `SessionTelemetryCapture`、`SessionTelemetryCoordinator`、`shutdownRecord`、`severityOf`、`errorDetail`、`identityOf`；源码顶部原注释（英文，仅作回查线索）：Capture coordinator for the telemetry capability. Live capture subscribes to the session firehose plus the one live-bus relay (agent/error). Both capture paths apply the fixed chunk projection, build logical records, and run each through the session-telemet...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“SessionTelemetryBackend Service Definition for the DeepSeek Harness. This package owns the CAPTURE side of session-event reporting — which records exist (the chunk projection), what they carry (the logical record), when they are captured (adoption, the per-...”；固定提交中扫描到的声明包括 `SessionTelemetrySeverity`、`SessionTelemetryRecord`、`SessionTelemetrySink`、`SessionTelemetrySharingStatus`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/README.md)、[packages/session/session-telemetry/src/coordinator.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/src/coordinator.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/feedback/command-feedback/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/src/index.ts)、[packages/feedback/command-feedback/tests/command-feedback.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/tests/command-feedback.spec.ts)
- 对应测试：[packages/feedback/command-feedback/tests/command-feedback.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/command-feedback/tests/command-feedback.spec.ts)、[packages/session/session-telemetry/tests/redact.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/tests/redact.spec.ts)、[packages/session/session-telemetry/tests/telemetry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/tests/telemetry.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-telemetry/README.md`、入口和消费者，再读当前契约，沿着 `packages/feedback/command-feedback/src/index.ts`、`packages/feedback/command-feedback/tests/command-feedback.spec.ts`、`packages/session/session-telemetry-otel/src/index.ts` 看它怎样约束运行时，最后对照 `packages/feedback/command-feedback/tests/command-feedback.spec.ts`、`packages/session/session-telemetry/tests/redact.spec.ts`、`packages/session/session-telemetry/tests/telemetry.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 178 行；扫描到的声明包括 `SessionTelemetrySeverity`、`SessionTelemetryRecord`、`SessionTelemetrySink`、`SessionTelemetrySharingStatus`；源码顶部原注释（英文，仅作回查线索）：SessionTelemetryBackend Service Definition for the DeepSeek Harness. This package owns the CAPTURE side of session-event reporting — which records exist (the chunk projection), what they carry (the logical record), when they are captured (adoption, the per-...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-telemetry. @module @deepseek-ai/dsh-session-telemetry/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-telemetry. @module @deepseek-ai/dsh-session-telemetry/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry/tests/redact.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/tests/redact.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“session-telemetry/record waterfall”、“passes records through unchanged when no listener is mounted”、“applies a mounted rule to every outbound record, ops records included”、“keeps the canonical log untouched by a mounted rule”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-telemetry/record waterfall”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `CollectingBackend`、`setup`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-telemetry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-telemetry/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `CollectingBackend`、`setup`；扫描到的测试主题包括 “session-telemetry/record waterfall”、“passes records through unchanged when no listener is mounted”、“applies a mounted rule to every outbound record, ops records included”、“keeps the canonical log untouched by a mounted rule”、“stacks listeners outermost-first around next()”、“a listener that skips next() replaces everything beneath it”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-telemetry/tests/telemetry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/tests/telemetry.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“SessionTelemetryCoordinator capture”、“hands every appended event over with envelope identity and cloned body”、“stamps header facts on every record when present”、“maps outcome flags to severity, unknown types falling through as info”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionTelemetryCoordinator capture”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `FakeBackend`、`setup`、`liveSession`、`appendTurn`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-telemetry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-telemetry/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 552 行；扫描到的声明包括 `FakeBackend`、`setup`、`liveSession`、`appendTurn`；扫描到的测试主题包括 “SessionTelemetryCoordinator capture”、“hands every appended event over with envelope identity and cloned body”、“stamps header facts on every record when present”、“maps outcome flags to severity, unknown types falling through as info”、“passes unknown merged event types through unchanged”、“ships only the first chunk of each (turn, step), per session”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-title-all-prompts-llm

### [packages/session/session-title-all-prompts-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“All-human-messages model provider for ctx.sessionTitle.”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-title-all-prompts-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/README.md)、[packages/session/session-title-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/session/session-title-all-prompts-llm/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/tests/provider.spec.ts)
- 对应测试：[packages/session/session-title-all-prompts-llm/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/tests/provider.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-title-all-prompts-llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-title-all-prompts-llm/tests/provider.spec.ts` 看它怎样约束运行时，最后对照 `packages/session/session-title-all-prompts-llm/tests/provider.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：All-human-messages model provider for ctx.sessionTitle.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-all-prompts-llm/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-title-all-prompts-llm. @module @deepseek-ai/dsh-session-title-all-prompts-llm/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-all-prompts-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-title-all-prompts-llm. @module @deepseek-ai/dsh-session-title-all-prompts-llm/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-all-prompts-llm/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/tests/provider.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、大语言模型的具体场景，包括“all-messages LLM title provider”、“includes seeded history and the latest prompt while inheriting the logged request route”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“all-messages LLM title provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `RecordingAdapter`、`settle`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-all-prompts-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title-all-prompts-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title-all-prompts-llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 73 行；扫描到的声明包括 `RecordingAdapter`、`settle`；扫描到的测试主题包括 “all-messages LLM title provider”、“includes seeded history and the latest prompt while inheriting the logged request route”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-title-first-prompt-llm

### [packages/session/session-title-first-prompt-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、提示词、大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“First-human-message model provider for ctx.sessionTitle.”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-title-first-prompt-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/README.md)、[packages/session/session-title-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts)
- 对应测试：[packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts)、[packages/session/session-title-first-prompt-llm/tests/provider.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/provider.e2e.ts)、[packages/session/session-title-first-prompt-llm/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/provider.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-title-first-prompt-llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts`、`packages/session/session-title-first-prompt-llm/tests/provider.e2e.ts`、`packages/session/session-title-first-prompt-llm/tests/provider.spec.ts` 看它怎样约束运行时，最后对照 `packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts`、`packages/session/session-title-first-prompt-llm/tests/provider.e2e.ts`、`packages/session/session-title-first-prompt-llm/tests/provider.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：First-human-message model provider for ctx.sessionTitle.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-first-prompt-llm/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、提示词、大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-title-first-prompt-llm. @module @deepseek-ai/dsh-session-title-first-prompt-llm/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-first-prompt-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-title-first-prompt-llm. @module @deepseek-ai/dsh-session-title-first-prompt-llm/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/loader-composition.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、提示词、大语言模型的具体场景，包括“session-title Loader composition”、“loads the service and one model provider with required deployment policy”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-title Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `LoaderAdapter`、`loadComposition`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-first-prompt-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title-first-prompt-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title-first-prompt-llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 119 行；扫描到的声明包括 `LoaderAdapter`、`loadComposition`；扫描到的测试主题包括 “session-title Loader composition”、“loads the service and one model provider with required deployment policy”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-first-prompt-llm/tests/provider.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/provider.e2e.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、提示词、大语言模型的具体场景，包括“replaces the fallback with a short model title”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“replaces the fallback with a short model title”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-first-prompt-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 59 行；扫描到的测试主题包括 “replaces the fallback with a short model title”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-first-prompt-llm/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/tests/provider.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、提示词、大语言模型的具体场景，包括“first-prompt LLM title provider”、“rejects an impossible empty provider request at its own boundary”、“always selects only the first eligible human message, including explicit refresh”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“first-prompt LLM title provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `RecordingAdapter`、`settle`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-first-prompt-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title-first-prompt-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-first-prompt-llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title-first-prompt-llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `RecordingAdapter`、`settle`；扫描到的测试主题包括 “first-prompt LLM title provider”、“rejects an impossible empty provider request at its own boundary”、“always selects only the first eligible human message, including explicit refresh”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-title-llm

### [packages/session/session-title-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared route, framing, timeout, assembly, and validation policy for model-backed session-title providers. @module @deepseek-ai/dsh-session-title-llm”；固定提交中扫描到的声明包括 `SessionTitleLlmRequestEventData`、`SESSION_TITLE_TIMEOUT_CODE`、`SessionTitleLlmConfig`、`ResolvedSessionTitleLlmConfig`、`SessionTitleLlmConfigFields`；本地静态 import 图显示它直接依赖 5 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session/session-title-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)、[packages/session/session-title-all-prompts-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-all-prompts-llm/src/index.ts)
- 对应测试：[packages/session/session-title-llm/tests/llm.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/tests/llm.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session/session-title-llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-title-all-prompts-llm/src/index.ts`、`packages/session/session-title-first-prompt-llm/src/index.ts`、`packages/session/session-title-llm/tests/llm.spec.ts` 看它怎样约束运行时，最后对照 `packages/session/session-title-llm/tests/llm.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 294 行；扫描到的声明包括 `SessionTitleLlmRequestEventData`、`SESSION_TITLE_TIMEOUT_CODE`、`SessionTitleLlmConfig`、`ResolvedSessionTitleLlmConfig`、`SessionTitleLlmConfigFields`、`SessionTitleLlmConfigSchema`、`resolveSessionTitleLlmConfig`、`SessionTitleLlmMessageSelector`；源码顶部原注释（英文，仅作回查线索）：Shared route, framing, timeout, assembly, and validation policy for model-backed session-title providers. @module @deepseek-ai/dsh-session-title-llm。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-llm/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-title-llm. @module @deepseek-ai/dsh-session-title-llm/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-title-llm. @module @deepseek-ai/dsh-session-title-llm/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title-llm/tests/llm.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/tests/llm.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、大语言模型的具体场景，包括“generateSessionTitleWithLlm”、“uses the exact logged route, language targets, full framed input, and output token cap”、“uses paired explicit overrides and bounds the final framed input before model dispatch”、“requires every deployment limit and a complete optional route pair”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“generateSessionTitleWithLlm”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `RecordingAdapter`、`CooperativeAdapter`、`DelayedSuccessAdapter`、`request`、`requestWithoutRoute`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title-llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title-llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title-llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title-llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 365 行；扫描到的声明包括 `RecordingAdapter`、`CooperativeAdapter`、`DelayedSuccessAdapter`、`request`、`requestWithoutRoute`、`withScript`；扫描到的测试主题包括 “generateSessionTitleWithLlm”、“uses the exact logged route, language targets, full framed input, and output token cap”、“uses paired explicit overrides and bounds the final framed input before model dispatch”、“requires every deployment limit and a complete optional route pair”、“rejects an absent route, empty selection, and pre-aborted caller before model dispatch”、“rejects tool-call blocks and a successful response with no text”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session/session-title

### [packages/session/session-title/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/client.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成会话、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Client-namespace projection of the title domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — zero dup...”；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/session/session-title/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/types.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session/session-title/README.md` 和入口，再读当前实现，沿着 `packages/session/session-title/src/types.ts` 和 `packages/client/runtime/src/client/sessions/manager.ts` 确认输入输出，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Client-namespace projection of the title domain: a pure re-export of the package's types outlet. Client code imports ONLY the client namespace (repo discipline), so ./client projects the same single-source content ./types serves to host consumers — zero dup...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Log-backed session title service, deterministic fallback, and provider contract. @module @deepseek-ai/dsh-session-title”；固定提交中扫描到的声明包括 `SessionTitleProviderId`、`SessionTitleModelProvenance`、`SessionTitleSource`、`SessionTitleEventData`、`SessionTitleSnapshot`；本地静态 import 图显示它直接依赖 8 个源文件，并被 28 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)、[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-fixture.ts)
- 对应测试：[apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/complex-history.perf.ts)、[apps/web/tests/markdown-cjk-strong.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-cjk-strong.e2e.ts)、[apps/web/tests/markdown-images.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-images.e2e.ts)、[apps/web/tests/markdown-inline-code-links.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-inline-code-links.e2e.ts)、[apps/web/tests/markdown-wide-table.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-wide-table.e2e.ts)、[apps/web/tests/math-rendering.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/math-rendering.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/session/session-title/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/chat-scroll-fixture.ts`、`apps/web/tests/complex-history.perf.ts`、`apps/web/tests/markdown-cjk-strong.e2e.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/complex-history.perf.ts`、`apps/web/tests/markdown-cjk-strong.e2e.ts`、`apps/web/tests/markdown-images.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 793 行；扫描到的声明包括 `SessionTitleProviderId`、`SessionTitleModelProvenance`、`SessionTitleSource`、`SessionTitleEventData`、`SessionTitleSnapshot`、`Config`、`SessionTitleInvalidError`、`SessionTitleUserMessage`；源码顶部原注释（英文，仅作回查线索）：Log-backed session title service, deterministic fallback, and provider contract. @module @deepseek-ai/dsh-session-title。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/invariant.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-title. @module @deepseek-ai/dsh-session-title/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/session/session-title/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/invariant.spec.ts)
- 对应测试：[packages/session/session-title/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/session/session-title/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/session/session-title/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-title. @module @deepseek-ai/dsh-session-title/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/src/normalize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/normalize.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：会话持久化实现
- 这个文件有什么用：这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。
- 为什么这样设计：Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。
- 文件级设计证据：源码顶部注释把它定位为“Title text normalization and UTF-8-safe truncation.”；固定提交中扫描到的声明包括 `truncateTitleUtf8`、`normalizeSessionTitle`、`fallbackSessionTitle`、`assertPositiveInteger`、`cleanTitleText`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)、[apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/complex-history.perf.ts)、[apps/web/tests/composer-tab-geometry.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/composer-tab-geometry.e2e.ts)、[apps/web/tests/markdown-cjk-strong.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-cjk-strong.e2e.ts)、[apps/web/tests/markdown-images.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-images.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/session/session-title/src/index.ts` 理解状态变化，最后对照 `apps/web/tests/chat-long-interactions.e2e.ts`、`apps/web/tests/chat-scroll-contract.e2e.ts`、`apps/web/tests/complex-history.perf.ts`。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `truncateTitleUtf8`、`normalizeSessionTitle`、`fallbackSessionTitle`、`assertPositiveInteger`、`cleanTitleText`；源码顶部原注释（英文，仅作回查线索）：Title text normalization and UTF-8-safe truncation.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/types.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述会话中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Pure types of the title domain: the ONE home of the title projection-key declaration, free of this package's host-side value imports (cordis service, schemastery, the llm seam). Two namespace projections serve it — ./types for host consumers, ./client/types...”；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/session/session-title/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/client.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)、[apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/complex-history.perf.ts)、[apps/web/tests/composer-tab-geometry.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/composer-tab-geometry.e2e.ts)、[apps/web/tests/markdown-cjk-strong.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-cjk-strong.e2e.ts)、[apps/web/tests/markdown-images.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/markdown-images.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session/session-title/README.md`、入口和消费者，再读当前契约，沿着 `packages/session/session-title/src/client.ts`、`packages/session/session-title/src/index.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/chat-long-interactions.e2e.ts`、`apps/web/tests/chat-scroll-contract.e2e.ts`、`apps/web/tests/complex-history.perf.ts`。
- 代码证据：固定提交归档实际读取结果：约 27 行；源码顶部原注释（英文，仅作回查线索）：Pure types of the title domain: the ONE home of the title projection-key declaration, free of this package's host-side value imports (cordis service, schemastery, the llm seam). Two namespace projections serve it — ./types for host consumers, ./client/types...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/invariant.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“session-title source invariant”、“accepts cited automatic titles and citation-free user renames”、“rejects a citation-free automatic title and a user rename that cites messages”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-title source invariant”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Title-source invariant: messageSeqs is empty iff source.kind is user. — the durable relationship every appended session/title event must keep.”；固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/session/session-title/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`packages/session/session-title/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 44 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “session-title source invariant”、“accepts cited automatic titles and citation-free user renames”、“rejects a citation-free automatic title and a user rename that cites messages”；源码顶部原注释（英文，仅作回查线索）：Title-source invariant: messageSeqs is empty iff source.kind is user. — the durable relationship every appended session/title event must keep.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/persistence.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、持久化的具体场景，包括“session title persistence round trips”、“round-trips through a remounted JSONL backend”、“round-trips through a remounted SQLite backend”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session title persistence round trips”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `appendPersistedTitle`、`expectPersistedTitle`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-persistence-jsonl/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 90 行；扫描到的声明包括 `appendPersistedTitle`、`expectPersistedTitle`；扫描到的测试主题包括 “session title persistence round trips”、“round-trips through a remounted JSONL backend”、“round-trips through a remounted SQLite backend”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/projection.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、状态投影的具体场景，包括“title projection unit”、“serves null before the first title event”、“serves the latest title last-wins and notifies the change feed with the causing seq”、“folds titles already in the log when the service mounts late (lazy cell build)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“title projection unit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The title projection unit: mounting the title service beside the projection registry serves the current normalized title (last-wins over session/title events, the same events foldSessionTitle consumes) — null before the first title — through the registry sn...”；固定提交中扫描到的声明包括 `harness`、`appendTitle`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-projection/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `harness`、`appendTitle`；扫描到的测试主题包括 “title projection unit”、“serves null before the first title event”、“serves the latest title last-wins and notifies the change feed with the causing seq”、“folds titles already in the log when the service mounts late (lazy cell build)”、“has no title key without the title service, and drops it when the service unloads (HMR safety)”；源码顶部原注释（英文，仅作回查线索）：The title projection unit: mounting the title service beside the projection registry serves the current normalized title (last-wins over session/title events, the same events foldSessionTitle consumes) — null before the first title — through the registry sn...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/provider.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“SessionTitleService Provider lifecycle”、“inherits title events across forks, skips first-prompt retitling, and lets all-messages...”、“runs a first-prompt provider once after the routed request and retries only through ref...”、“rejects a second provider and drains stale work when the winner is disposed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionTitleService Provider lifecycle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `deferred`、`settle`、`appendHumanPrompt`、`appendRoute`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 374 行；扫描到的声明包括 `deferred`、`settle`、`appendHumanPrompt`、`appendRoute`；扫描到的测试主题包括 “SessionTitleService Provider lifecycle”、“inherits title events across forks, skips first-prompt retitling, and lets all-messages update later”、“runs a first-prompt provider once after the routed request and retries only through refresh”、“rejects a second provider and drains stale work when the winner is disposed”、“supersedes an older all-messages revision and cannot commit an ignored abort”、“runs an all-messages revision when the next main request reuses its logged header”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/rename.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/rename.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“SessionTitleService.rename”、“appends a normalized user-source title”、“rejects titles that normalize to empty and dead sessions”、“pins the title: later user messages schedule no automatic revision; refresh unpins”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionTitleService.rename”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SessionTitleService.rename: user-source acceptance, normalization/rejection boundaries, and the pin (a user-sourced latest title schedules no automatic revision; explicit refresh stays the unpin).”；固定提交中扫描到的声明包括 `settle`、`appendHumanPrompt`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `settle`、`appendHumanPrompt`；扫描到的测试主题包括 “SessionTitleService.rename”、“appends a normalized user-source title”、“rejects titles that normalize to empty and dead sessions”、“pins the title: later user messages schedule no automatic revision; refresh unpins”、“fallback-only refresh also unpins: the user title yields to a re-derived fallback”、“supersedes in-flight automatic generation: a late provider result cannot override the user title”；源码顶部原注释（英文，仅作回查线索）：SessionTitleService.rename: user-source acceptance, normalization/rejection boundaries, and the pin (a user-sourced latest title schedules no automatic revision; explicit refresh stays the unpin).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/service-contracts.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/service-contracts.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“SessionTitleService configuration and refresh boundaries”、“requires explicit positive limits with a fallback cap no larger than the accepted-title...”、“returns no title for empty input with or without a provider, and rejects detached or pr...”、“passes an absent route and caller cancellation into explicit generation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionTitleService configuration and refresh boundaries”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `deferred`、`settle`、`setup`、`startSession`、`appendPrompt`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 452 行；扫描到的声明包括 `deferred`、`settle`、`setup`、`startSession`、`appendPrompt`；扫描到的测试主题包括 “SessionTitleService configuration and refresh boundaries”、“requires explicit positive limits with a fallback cap no larger than the accepted-title cap”、“returns no title for empty input with or without a provider, and rejects detached or pre-aborted refreshes”、“passes an absent route and caller cancellation into explicit generation”、“propagates explicit cancellation and session disposal to active work”、“shares one fallback across concurrent refreshes”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session/session-title/tests/session-title.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/tests/session-title.spec.ts)

- 所属层：packages/session：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“session title normalization”、“removes terminal controls, collapses whitespace, and applies word and UTF-8 byte caps”、“rejects non-positive and fractional public limits”、“SessionTitleService”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session title normalization”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `settleTitles`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session/session-title/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的声明包括 `settleTitles`；扫描到的测试主题包括 “session title normalization”、“removes terminal controls, collapses whitespace, and applies word and UTF-8 byte caps”、“rejects non-positive and fractional public limits”、“SessionTitleService”、“logs and folds an immediate fallback after the first eligible human text message”、“derives a fallback title from the direct prompt instead of injected context”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
