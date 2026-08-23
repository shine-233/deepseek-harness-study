# 源文件索引：packages/context

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 41 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

条目按所属包分组：packages/context/agent-instructions（9 条）、packages/context/file-reference-local（6 条）、packages/context/file-reference（6 条）、packages/context/session-reference（8 条）、packages/context/time-context（9 条）、packages/context/tmux-context（3 条）。

## packages/context/agent-instructions

### [packages/context/agent-instructions/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/config.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义上下文、智能体可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Configuration normalization for workspace instruction discovery and rendering. @module @deepseek-ai/dsh-agent-instructions/config”；固定提交中扫描到的声明包括 `Config`、`ResolvedDiscoveryConfig`、`ResolvedConfig`、`workspaceBaselineIdentity`、`resolveConfig`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/util/home-paths/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/home-paths/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/files.ts)
- 对应测试：[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/context/agent-instructions/README.md`，再读本配置/脚本，沿着 `examples/headless-agent/tests/workspace-context-resume.snapshot.ts`、`packages/context/agent-instructions/src/files.ts`、`packages/context/agent-instructions/src/index.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `Config`、`ResolvedDiscoveryConfig`、`ResolvedConfig`、`workspaceBaselineIdentity`、`resolveConfig`、`resolveDiscoveryConfig`、`resolveInstructionFileCandidates`；源码顶部原注释（英文，仅作回查线索）：Configuration normalization for workspace instruction discovery and rendering. @module @deepseek-ai/dsh-agent-instructions/config。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/src/digest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/digest.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“Content identity for workspace instruction duplicate suppression. @module @deepseek-ai/dsh-agent-instructions/digest”；固定提交中扫描到的声明包括 `instructionContentSha1`、`trimmedInstructionDigest`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/files.ts)、[packages/context/agent-instructions/src/state.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/state.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/context/agent-instructions/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/context/agent-instructions/src/files.ts`、`packages/context/agent-instructions/src/state.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/workspace-context-resume.snapshot.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `instructionContentSha1`、`trimmedInstructionDigest`；源码顶部原注释（英文，仅作回查线索）：Content identity for workspace instruction duplicate suppression. @module @deepseek-ai/dsh-agent-instructions/digest。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/files.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“Instruction-file discovery and bounded, abort-aware provider reads. @module @deepseek-ai/dsh-agent-instructions/files”；固定提交中扫描到的声明包括 `InstructionFile`、`LoadedInstructionFile`、`ProbedInstructionFile`、`RenderedInstructionSet`、`ScopeInstructionProbe`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/config.ts)、[packages/context/agent-instructions/src/digest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/digest.ts)、[packages/context/agent-instructions/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/render.ts)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/context/agent-instructions/README.md` 和入口，再读当前实现，沿着 `packages/context/agent-instructions/src/config.ts`、`packages/context/agent-instructions/src/digest.ts`、`packages/context/agent-instructions/src/render.ts` 和 `packages/context/agent-instructions/src/index.ts`、`packages/context/agent-instructions/src/render.ts`、`packages/context/agent-instructions/src/state.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/workspace-context-resume.snapshot.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 521 行；扫描到的声明包括 `InstructionFile`、`LoadedInstructionFile`、`ProbedInstructionFile`、`RenderedInstructionSet`、`ScopeInstructionProbe`、`findProjectRoot`、`ancestorChain`、`descendantDirsBetween`；源码顶部原注释（英文，仅作回查线索）：Instruction-file discovery and bounded, abort-aware provider reads. @module @deepseek-ai/dsh-agent-instructions/files。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把上下文、智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Workspace instruction loader for AGENTS.md-compatible files. Baseline instructions enter durable context before the first request; successful fs tool touches project nested, changed, and removed instructions into the inbox. Plugin lifecycle reads use the op...”；固定提交中扫描到的声明包括 `apply`、`visibleBaselineSource`、`isWorkspaceContext`、`sameContextPayload`、`filePathFromExecution`；本地静态 import 图显示它直接依赖 9 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/config.ts)、[packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/files.ts)、[packages/context/agent-instructions/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/render.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)
- 对应测试：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/context/agent-instructions/README.md`、入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/workspace-context-resume.snapshot.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/workspace-context-resume.snapshot.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 367 行；扫描到的声明包括 `apply`、`visibleBaselineSource`、`isWorkspaceContext`、`sameContextPayload`、`filePathFromExecution`；源码顶部原注释（英文，仅作回查线索）：Workspace instruction loader for AGENTS.md-compatible files. Baseline instructions enter durable context before the first request; successful fs tool touches project nested, changed, and removed instructions into the inbox. Plugin lifecycle reads use the op...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/invariant.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查上下文、智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-agent-instructions. @module @deepseek-ai/dsh-agent-instructions/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-agent-instructions. @module @deepseek-ai/dsh-agent-instructions/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/render.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把上下文、智能体、渲染转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 文件级设计证据：源码顶部注释把它定位为“Model-facing workspace instruction rendering within an explicit byte budget. @module @deepseek-ai/dsh-agent-instructions/render”；固定提交中扫描到的声明包括 `TruncatedInstruction`、`RenderedWorkspaceContext`、`AgentInstructionChange`、`ChangeRenderItem`、`USER_GLOBAL_DIRECTORY`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/files.ts)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)、[packages/context/agent-instructions/src/state.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/state.ts)
- 对应测试：[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/context/agent-instructions/src/files.ts`、`packages/context/agent-instructions/src/index.ts`、`packages/context/agent-instructions/src/state.ts` 确认状态如何进入 UI，最后对照 `packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 361 行；扫描到的声明包括 `TruncatedInstruction`、`RenderedWorkspaceContext`、`AgentInstructionChange`、`ChangeRenderItem`、`USER_GLOBAL_DIRECTORY`、`USER_GLOBAL_FILE`、`scopeForDisplayPath`、`candidateScopeKey`；源码顶部原注释（英文，仅作回查线索）：Model-facing workspace instruction rendering within an explicit byte budget. @module @deepseek-ai/dsh-agent-instructions/render。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/src/state.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/state.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“Session-visible workspace instruction state and dynamic reconciliation. @module @deepseek-ai/dsh-agent-instructions/state”；固定提交中扫描到的声明包括 `name`、`AgentInstructionSource`、`InstructionVersionState`、`InstructionVersionCache`、`InstructionVersionUpdate`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/config.ts)、[packages/context/agent-instructions/src/digest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/digest.ts)、[packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/files.ts)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)
- 对应测试：[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/context/agent-instructions/README.md` 和入口，再读当前实现，沿着 `packages/context/agent-instructions/src/config.ts`、`packages/context/agent-instructions/src/digest.ts`、`packages/context/agent-instructions/src/files.ts` 和 `packages/context/agent-instructions/src/index.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts` 确认输入输出，最后对照 `packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 433 行；扫描到的声明包括 `name`、`AgentInstructionSource`、`InstructionVersionState`、`InstructionVersionCache`、`InstructionVersionUpdate`、`ReconciledInstructionContext`、`workspaceContextMessage`、`baselineInstructionState`；源码顶部原注释（英文，仅作回查线索）：Session-visible workspace instruction state and dynamic reconciliation. @module @deepseek-ai/dsh-agent-instructions/state。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文、智能体的具体场景，包括“obeys a probe instruction loaded from the workspace”、“loads a nested AGENTS.md after the real read tool touches a descendant file”、“appends changed baseline instructions after a real file-tool touch without rewriting th...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“obeys a probe instruction loaded from the workspace”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`finalText`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)、[packages/context/agent-instructions/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/render.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/agent-instructions/src/index.ts`、`packages/context/agent-instructions/src/render.ts`、`packages/core/agent-loop/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `harness`、`waitForIdle`、`finalText`；扫描到的测试主题包括 “obeys a probe instruction loaded from the workspace”、“loads a nested AGENTS.md after the real read tool touches a descendant file”、“appends changed baseline instructions after a real file-tool touch without rewriting the frozen prefix”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文、智能体的具体场景，包括“workspace context instruction discovery”、“treats ENOTDIR while probing a host candidate as confirmed absence”、“loads user-global first, then every root-to-cwd candidate in precedence order”、“loads a same-directory local overlay in addition to the base file by default”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“workspace context instruction discovery”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `tempRepo`、`write`、`RecordingFileSystem`、`BlockingReadFileSystem`、`mountWorkspaceContext`；本地静态 import 图显示它直接依赖 16 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/agent-instructions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/README.md)、[packages/context/agent-instructions/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/config.ts)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)、[packages/context/agent-instructions/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/render.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/context/agent-instructions/src/config.ts`、`packages/context/agent-instructions/src/index.ts`、`packages/context/agent-instructions/src/render.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 4649 行；扫描到的声明包括 `tempRepo`、`write`、`RecordingFileSystem`、`BlockingReadFileSystem`、`mountWorkspaceContext`、`mountFileToolsAndWorkspaceContext`、`stubAgent`、`stubToolExecution`；扫描到的测试主题包括 “workspace context instruction discovery”、“treats ENOTDIR while probing a host candidate as confirmed absence”、“loads user-global first, then every root-to-cwd candidate in precedence order”、“loads a same-directory local overlay in addition to the base file by default”、“loads no local overlay when localInstructionFileCandidates is empty”、“treats a .git file as a project root marker and does not search above it”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/context/file-reference-local

### [packages/context/file-reference-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/index.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把上下文相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Local-filesystem implementation of ctx.fileReferences. @module @deepseek-ai/dsh-file-reference-local”；固定提交中扫描到的声明包括 `Config`、`LocalFileReferenceService`、`validateConfig`；本地静态 import 图显示它直接依赖 8 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/README.md)、[packages/context/file-reference-local/src/search.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/search.ts)、[packages/context/file-reference/src/grammar.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/grammar.ts)、[packages/context/file-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/index.ts)、[packages/context/file-reference-local/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/service.spec.ts)
- 对应测试：[packages/context/file-reference-local/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/service.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/file-reference-local/README.md`、入口和消费者，再读当前契约，沿着 `packages/context/file-reference-local/tests/service.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/file-reference-local/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `Config`、`LocalFileReferenceService`、`validateConfig`；源码顶部原注释（英文，仅作回查线索）：Local-filesystem implementation of ctx.fileReferences. @module @deepseek-ai/dsh-file-reference-local。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/invariant.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查上下文必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-file-reference-local. @module @deepseek-ai/dsh-file-reference-local/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/context/file-reference-local/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/invariant.spec.ts)
- 对应测试：[packages/context/file-reference-local/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/context/file-reference-local/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/context/file-reference-local/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-file-reference-local. @module @deepseek-ai/dsh-file-reference-local/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference-local/src/search.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/search.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“Host-workspace discovery for @file completion. The index contains paths only: selected values remain ordinary prompt text and file contents stay behind the model-facing read tool. @module @deepseek-ai/dsh-file-reference-local/search”；固定提交中扫描到的声明包括 `DEFAULT_FILE_SEARCH_MAX_RESULTS`、`DEFAULT_FILE_SEARCH_MAX_ENTRIES`、`DEFAULT_FILE_SEARCH_EXCLUDED_DIRECTORIES`、`FileSearchConfig`、`WorkspaceFileSearch`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/README.md)、[packages/context/file-reference/src/grammar.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/grammar.ts)、[packages/context/file-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/index.ts)、[packages/context/file-reference-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/index.ts)、[packages/context/file-reference-local/tests/search.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/search.spec.ts)
- 对应测试：[packages/context/file-reference-local/tests/search.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/search.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/file-reference-local/README.md` 和入口，再读当前实现，沿着 `packages/context/file-reference/src/grammar.ts`、`packages/context/file-reference/src/index.ts` 和 `packages/context/file-reference-local/src/index.ts`、`packages/context/file-reference-local/tests/search.spec.ts` 确认输入输出，最后对照 `packages/context/file-reference-local/tests/search.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 294 行；扫描到的声明包括 `DEFAULT_FILE_SEARCH_MAX_RESULTS`、`DEFAULT_FILE_SEARCH_MAX_ENTRIES`、`DEFAULT_FILE_SEARCH_EXCLUDED_DIRECTORIES`、`FileSearchConfig`、`WorkspaceFileSearch`、`resolveDisplayDirectory`、`readDirectory`、`visibleForGlobalQuery`；源码顶部原注释（英文，仅作回查线索）：Host-workspace discovery for @file completion. The index contains paths only: selected values remain ordinary prompt text and file contents stay behind the model-facing read tool. @module @deepseek-ai/dsh-file-reference-local/search。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference-local/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/invariant.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“invariant companion”、“registers the provider cache ownership under its package name”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/README.md)、[packages/context/file-reference-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/file-reference-local/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers the provider cache ownership under its package name”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference-local/tests/search.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/search.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“file-reference grammar”、“recognizes boundary and quoted mentions without treating emails as references”、“formats files, directories, quotes, and rejects unsafe editor values”、“WorkspaceFileSearch”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“file-reference grammar”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `workspace`、`search`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/README.md)、[packages/context/file-reference-local/src/search.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/search.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/file-reference-local/src/search.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 199 行；扫描到的声明包括 `workspace`、`search`；扫描到的测试主题包括 “file-reference grammar”、“recognizes boundary and quoted mentions without treating emails as references”、“formats files, directories, quotes, and rejects unsafe editor values”、“WorkspaceFileSearch”、“lists live directory levels, descends, quotes spaces, and filters hidden/excluded entries”、“does not traverse directory symlinks during direct completion”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference-local/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/service.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“LocalFileReferenceService”、“serves the addressed workspace and installs read-tool guidance for existing agents”、“invalidates cached searches after tool results and disposes them with the agent”、“installs guidance for agents announced after the service and validates deployment tunables”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LocalFileReferenceService”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`stubAgent`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/README.md)、[packages/context/file-reference-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/index.ts)、[packages/context/file-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/file-reference-local/src/index.ts`、`packages/context/file-reference/src/index.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 162 行；扫描到的声明包括 `harness`、`stubAgent`；扫描到的测试主题包括 “LocalFileReferenceService”、“serves the addressed workspace and installs read-tool guidance for existing agents”、“invalidates cached searches after tool results and disposes them with the agent”、“installs guidance for agents announced after the service and validates deployment tunables”、“deduplicates lifecycle announcements and falls back to the process cwd”、“logs rejected prompt cleanup without failing service teardown”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/context/file-reference

### [packages/context/file-reference/src/grammar.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/grammar.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“Browser-safe @file token grammar shared by terminal and web clients. @module @deepseek-ai/dsh-file-reference/grammar”；固定提交中扫描到的声明包括 `ActiveAtToken`、`activeAtToken`、`formatFileMention`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/README.md)、[packages/context/file-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/types.ts)、[packages/client/ui-input-trigger/src/core/detect.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/detect.ts)、[packages/client/ui-reference/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-reference/src/client/index.ts)、[packages/context/file-reference-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/input-machine.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-machine.client.spec.ts)、[packages/client/ui-conversation/tests/input-matrix.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-matrix.client.spec.tsx)、[packages/client/ui-conversation/tests/input-reference-submit.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-reference-submit.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/context/file-reference/README.md` 和入口，再读当前实现，沿着 `packages/context/file-reference/src/types.ts` 和 `packages/client/ui-input-trigger/src/core/detect.ts`、`packages/client/ui-reference/src/client/index.ts`、`packages/context/file-reference-local/src/index.ts` 确认输入输出，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/service.client.spec.ts`、`packages/client/ui-conversation/tests/input-bar.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `ActiveAtToken`、`activeAtToken`、`formatFileMention`；源码顶部原注释（英文，仅作回查线索）：Browser-safe @file token grammar shared by terminal and web clients. @module @deepseek-ai/dsh-file-reference/grammar。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/index.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把上下文相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“File-reference discovery seam shared by host-backed user interfaces. @module @deepseek-ai/dsh-file-reference”；固定提交中扫描到的声明包括 `FILE_REFERENCE_PROMPT`；本地静态 import 图显示它直接依赖 5 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/README.md)、[packages/context/file-reference/src/grammar.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/grammar.ts)、[packages/context/file-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/types.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/context/file-reference-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/src/index.ts)
- 对应测试：[packages/context/file-reference-local/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference-local/tests/service.spec.ts)、[packages/context/file-reference/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/tests/service.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/file-reference/README.md`、入口和消费者，再读当前契约，沿着 `packages/context/file-reference-local/src/index.ts`、`packages/context/file-reference-local/src/search.ts`、`packages/context/file-reference-local/tests/service.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/file-reference-local/tests/service.spec.ts`、`packages/context/file-reference/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `FILE_REFERENCE_PROMPT`；源码顶部原注释（英文，仅作回查线索）：File-reference discovery seam shared by host-backed user interfaces. @module @deepseek-ai/dsh-file-reference。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/invariant.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查上下文必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-file-reference. @module @deepseek-ai/dsh-file-reference/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/context/file-reference/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/tests/invariant.spec.ts)
- 对应测试：[packages/context/file-reference/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/context/file-reference/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/context/file-reference/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-file-reference. @module @deepseek-ai/dsh-file-reference/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/types.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述上下文中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public file-reference discovery records. This module contains types only so generated Remote clients can consume it without Host runtime code. @module @deepseek-ai/dsh-file-reference/types”；固定提交中扫描到的声明包括 `FileReferenceCandidate`；本地静态 import 图显示它直接依赖 0 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-reference/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-reference/src/client/index.ts)、[packages/client/ui-reference/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-reference/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-reference/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-reference/tests/browser-plugin.client.spec.ts)、[packages/context/file-reference/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/tests/service.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/file-reference/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-reference/src/client/index.ts`、`packages/client/ui-reference/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-reference/tests/browser-plugin.client.spec.ts`、`packages/context/file-reference/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 13 行；扫描到的声明包括 `FileReferenceCandidate`；源码顶部原注释（英文，仅作回查线索）：Public file-reference discovery records. This module contains types only so generated Remote clients can consume it without Host runtime code. @module @deepseek-ai/dsh-file-reference/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/tests/invariant.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“invariant companion”、“registers the stateless seam under its package name”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/README.md)、[packages/context/file-reference/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/file-reference/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers the stateless seam under its package name”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/file-reference/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/tests/service.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“FileReferenceService”、“serves the Remote face through the abstract discovery member”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“FileReferenceService”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The Remote face delegates to the provider's discovery contract unchanged.”；固定提交中扫描到的声明包括 `StubProvider`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/file-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/README.md)、[packages/context/file-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/index.ts)、[packages/context/file-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/types.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/file-reference/src/index.ts`、`packages/context/file-reference/src/types.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `StubProvider`；扫描到的测试主题包括 “FileReferenceService”、“serves the Remote face through the abstract discovery member”；源码顶部原注释（英文，仅作回查线索）：The Remote face delegates to the provider's discovery contract unchanged.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/context/session-reference

### [packages/context/session-reference/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/config.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义上下文、会话可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Configuration and stable diagnostics for session references.”；固定提交中扫描到的声明包括 `MAX_REFERENCES`、`DEFAULT_CANDIDATE_LIMIT`、`DEFAULT_MAX_REFERENCE_BYTES`、`Config`、`SessionReferenceErrorCode`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)、[packages/context/session-reference/src/uri.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/uri.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/context/session-reference/README.md`，再读本配置/脚本，沿着 `packages/context/session-reference/src/index.ts`、`packages/context/session-reference/src/uri.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `MAX_REFERENCES`、`DEFAULT_CANDIDATE_LIMIT`、`DEFAULT_MAX_REFERENCE_BYTES`、`Config`、`SessionReferenceErrorCode`、`SessionReferenceError`；源码顶部原注释（英文，仅作回查线索）：Configuration and stable diagnostics for session references.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把上下文、会话相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Cross-session snapshot preparation. Hosts adapt mentions into structured references; this service owns exact reads, projection, budgets, and durable context. @module @deepseek-ai/dsh-session-reference”；固定提交中扫描到的声明包括 `SessionReferenceResolver`、`normalizeReferences`、`renderPrompt`、`candidateRank`、`assertNotCancelled`；本地静态 import 图显示它直接依赖 12 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/context/session-reference/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/config.ts)、[packages/context/session-reference/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/projection.ts)、[packages/context/session-reference/src/serialization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/serialization.ts)、[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 对应测试：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/session-reference/README.md`、入口和消费者，再读当前契约，沿着 `packages/context/session-reference/tests/session-reference.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 372 行；扫描到的声明包括 `SessionReferenceResolver`、`normalizeReferences`、`renderPrompt`、`candidateRank`、`assertNotCancelled`、`settleWithCancellation`、`cancelled`；源码顶部原注释（英文，仅作回查线索）：Cross-session snapshot preparation. Hosts adapt mentions into structured references; this service owns exact reads, projection, budgets, and durable context. @module @deepseek-ai/dsh-session-reference。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/invariant.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查上下文、会话必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-reference. @module @deepseek-ai/dsh-session-reference/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-reference. @module @deepseek-ai/dsh-session-reference/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/projection.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把上下文、会话、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 文件级设计证据：源码顶部注释把它定位为“Current-surface projection and byte-bounded rendering.”；固定提交中扫描到的声明包括 `ReferencedSessionData`、`ReferenceRetentionStats`、`retainReferencedSession`、`projectSessionConversation`、`textContent`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/context/session-reference/src/serialization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/serialization.ts)、[packages/context/session-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/types.ts)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/compaction/compaction/src/index.ts`、`packages/context/session-reference/src/serialization.ts`、`packages/context/session-reference/src/types.ts` 和 `packages/context/session-reference/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 172 行；扫描到的声明包括 `ReferencedSessionData`、`ReferenceRetentionStats`、`retainReferencedSession`、`projectSessionConversation`、`textContent`、`truncateWithNotice`；源码顶部原注释（英文，仅作回查线索）：Current-surface projection and byte-bounded rendering.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/src/serialization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/serialization.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：格式编解码
- 这个文件有什么用：它把 model-visible reference envelope 序列化为 JSON，并把字面量 `<` 转成 `\u003c`；解析后的数据不变，但模型可见内容不会直接拼出 XML-like opening tag。
- 为什么这样设计：model-visible 引用可能被放进 XML-like prompt 环境，必须防止数据本身闭合或开启标签；转义 `<` 且保持 JSON parse 结果不变，能把安全约束放在唯一序列化边界。
- 文件级设计证据：源码顶部注释把它定位为“Tag-safe JSON serialization for the model-visible reference envelope.”；固定提交中扫描到的声明包括 `stringifyTagSafeJson`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)、[packages/context/session-reference/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/projection.ts)、[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 对应测试：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/session-reference/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/context/session-reference/src/index.ts`、`packages/context/session-reference/src/projection.ts`、`packages/context/session-reference/tests/session-reference.spec.ts` 确认输入输出，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的声明包括 `stringifyTagSafeJson`；源码顶部原注释（英文，仅作回查线索）：Tag-safe JSON serialization for the model-visible reference envelope.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/types.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述上下文、会话中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public session-reference request, candidate, and preparation records. Imports stay on type-only subpaths so generated Remote clients can consume this module without Host runtime code. @module @deepseek-ai/dsh-session-reference/types”；固定提交中扫描到的声明包括 `SessionReferenceSource`、`SessionReferenceInput`、`SessionReferenceCandidate`、`SessionReferenceMentionCandidate`、`PreparedReferencedMessage`；本地静态 import 图显示它直接依赖 3 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[apps/web/tests/reference-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/reference-composer.e2e.ts)
- 对应测试：[apps/web/tests/reference-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/reference-composer.e2e.ts)、[packages/client/ui-reference/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-reference/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/context/session-reference/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/reference-composer.e2e.ts`、`packages/api/remotes/src/client/index.ts`、`packages/client/ui-reference/src/client/index.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/reference-composer.e2e.ts`、`packages/client/ui-reference/tests/browser-plugin.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 78 行；扫描到的声明包括 `SessionReferenceSource`、`SessionReferenceInput`、`SessionReferenceCandidate`、`SessionReferenceMentionCandidate`、`PreparedReferencedMessage`、`ReferencedConversationItem`；源码顶部原注释（英文，仅作回查线索）：Public session-reference request, candidate, and preparation records. Imports stay on type-only subpaths so generated Remote clients can consume this module without Host runtime code. @module @deepseek-ai/dsh-session-reference/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/src/uri.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/uri.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“Canonical session URI and inline mention encoding.”；固定提交中扫描到的声明包括 `SESSION_REFERENCE_SCHEME`、`encodeSessionReferenceUri`、`decodeSessionReferenceUri`、`formatSessionReferenceMention`、`ParsedSessionReferenceText`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/context/session-reference/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/config.ts)、[packages/context/session-reference/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/types.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/context/session-reference/README.md` 和入口，再读当前实现，沿着 `packages/context/session-reference/src/config.ts`、`packages/context/session-reference/src/types.ts`、`packages/core/session/src/index.ts` 和 `packages/context/session-reference/src/index.ts` 确认输入输出，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `SESSION_REFERENCE_SCHEME`、`encodeSessionReferenceUri`、`decodeSessionReferenceUri`、`formatSessionReferenceMention`、`ParsedSessionReferenceText`、`parseSessionReferenceText`、`escapeLabel`、`unescapeLabel`；源码顶部原注释（英文，仅作回查线索）：Canonical session URI and inline mention encoding.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文、会话的具体场景，包括“session reference URI and inline mentions”、“round-trips arbitrary session ids and replaces mentions with readable labels”、“rejects malformed explicit references and base64url-shaped bare candidates”、“session reference discovery and preparation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session reference URI and inline mentions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestSessionQueryEngine`、`harness`、`fakeAgent`、`expectCode`、`checkpointSource`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/session-reference/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)、[packages/context/session-reference/src/serialization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/serialization.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/compaction/compaction/src/index.ts`、`packages/context/session-reference/src/index.ts`、`packages/context/session-reference/src/serialization.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 760 行；扫描到的声明包括 `TestSessionQueryEngine`、`harness`、`fakeAgent`、`expectCode`、`checkpointSource`、`appendConversation`、`promptData`；扫描到的测试主题包括 “session reference URI and inline mentions”、“round-trips arbitrary session ids and replaces mentions with readable labels”、“rejects malformed explicit references and base64url-shaped bare candidates”、“session reference discovery and preparation”、“matches candidate metadata and titles before ranking by cwd”、“serves the Remote face with the configured limit and canonical mentions”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/context/time-context

### [packages/context/time-context/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/index.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把上下文相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Opt-in request clock context. Eligible steps add durable, source-attributed time readings to the request history. @module @deepseek-ai/dsh-time-context”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`formatDuration`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/context/time-context/src/request-zone.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/request-zone.ts)、[packages/context/time-context/src/timestamp.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/timestamp.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/context/time-context/tests/time-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.spec.ts)
- 对应测试：[packages/context/time-context/tests/time-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/time-context/README.md`、入口和消费者，再读当前契约，沿着 `packages/context/time-context/tests/time-context.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/time-context/tests/time-context.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 209 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`formatDuration`、`precedingMessageTime`、`precedingStepContextTime`、`latestInjectionTime`；源码顶部原注释（英文，仅作回查线索）：Opt-in request clock context. Eligible steps add durable, source-attributed time readings to the request history. @module @deepseek-ai/dsh-time-context。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/invariant.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查上下文必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned durable clock-context invariants. @module @deepseek-ai/dsh-time-context/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`preparationPosition`、`requestMessages`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/context/time-context/src/request-zone.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/request-zone.ts)、[packages/context/time-context/src/timestamp.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/timestamp.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/context/time-context/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/invariant.spec.ts)
- 对应测试：[packages/context/time-context/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/context/time-context/src/request-zone.ts`、`packages/context/time-context/src/timestamp.ts`、`packages/core/session/src/index.ts` 和 `packages/context/time-context/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/context/time-context/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 193 行；扫描到的声明包括 `name`、`inject`、`apply`、`preparationPosition`、`requestMessages`、`validateReading`、`validateSession`；源码顶部原注释（英文，仅作回查线索）：Package-owned durable clock-context invariants. @module @deepseek-ai/dsh-time-context/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/src/request-zone.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/request-zone.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与上下文的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Browser-zone derivation and model-facing policy text for one open request turn.”；固定提交中扫描到的声明包括 `BrowserTimeZoneContext`、`deriveBrowserTimeZoneContext`、`renderBrowserTimeZoneContext`、`browserTimeZone`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/context/time-context/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/index.ts)、[packages/context/time-context/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/invariant.ts)、[packages/context/time-context/tests/request-zone.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/request-zone.spec.ts)
- 对应测试：[packages/context/time-context/tests/request-zone.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/request-zone.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/time-context/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts` 和 `packages/context/time-context/src/index.ts`、`packages/context/time-context/src/invariant.ts`、`packages/context/time-context/tests/request-zone.spec.ts` 确认输入输出，最后对照 `packages/context/time-context/tests/request-zone.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `BrowserTimeZoneContext`、`deriveBrowserTimeZoneContext`、`renderBrowserTimeZoneContext`、`browserTimeZone`；源码顶部原注释（英文，仅作回查线索）：Browser-zone derivation and model-facing policy text for one open request turn.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/src/timestamp.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/timestamp.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：上下文来源实现
- 这个文件有什么用：这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。
- 为什么这样设计：每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。
- 文件级设计证据：源码顶部注释把它定位为“ISO-shaped time-context timestamp formatting shared by production and replay validation.”；固定提交中扫描到的声明包括 `createTimestampFormatter`、`formatTimestamp`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/context/time-context/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/index.ts)、[packages/context/time-context/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/invariant.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/time-context/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/invariant.spec.ts)、[packages/context/time-context/tests/time-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/context/time-context/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/context/time-context/src/index.ts`、`packages/context/time-context/src/invariant.ts` 确认输入输出，最后对照 `packages/context/time-context/tests/invariant.spec.ts`、`packages/context/time-context/tests/time-context.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 37 行；扫描到的声明包括 `createTimestampFormatter`、`formatTimestamp`；源码顶部原注释（英文，仅作回查线索）：ISO-shaped time-context timestamp formatting shared by production and replay validation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/invariant.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“time-context invariants”、“accepts a reading whose turn, step, baseline, and timestamp agree”、“accepts a reading durably appended after a long process pause”、“requires browser-zone policy and timestamp to match current-turn request provenance”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“time-context invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`event`、`reading`、`preparing`、`appendReading`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/context/time-context/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/invariant.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/time-context/src/invariant.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 353 行；扫描到的声明包括 `setup`、`event`、`reading`、`preparing`、`appendReading`；扫描到的测试主题包括 “time-context invariants”、“accepts a reading whose turn, step, baseline, and timestamp agree”、“accepts a reading durably appended after a long process pause”、“requires browser-zone policy and timestamp to match current-turn request provenance”、“reports browser-zone timestamp formatter failures as invariant violations”、“rejects invalid browser provenance loaded across the durable boundary”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/tests/request-zone.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/request-zone.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“browser request-zone context”、“derives missing, unique, and sorted mixed zones from user-rpc messages only”、“validates every browser zone before classifying a mixed turn”、“renders one explicit model policy for every context”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“browser request-zone context”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `browserMessage`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/context/time-context/src/request-zone.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/request-zone.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/time-context/src/request-zone.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `browserMessage`；扫描到的测试主题包括 “browser request-zone context”、“derives missing, unique, and sorted mixed zones from user-rpc messages only”、“validates every browser zone before classifying a mixed turn”、“renders one explicit model policy for every context”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/tests/time-context.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.e2e.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“time-context through a real headless cordis.yml”、“uses the process zone and persists one ordered context event per request”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“time-context through a real headless cordis.yml”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `jsonlFiles`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `jsonlFiles`；扫描到的测试主题包括 “time-context through a real headless cordis.yml”、“uses the process zone and persists one ordered context event per request”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/tests/time-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“durable step context”、“records turn, step, zoned time, and the preceding model-visible message baseline”、“reports an unavailable first-step baseline when no model-visible message precedes it”、“formats in one browser zone and falls back when steering supplies mixed zones”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“durable step context”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mount`、`sessionAgent`、`openMessageTurn`、`contextTexts`、`fire`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)、[packages/context/time-context/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/src/index.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/time-context/src/index.ts`、`packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 501 行；扫描到的声明包括 `mount`、`sessionAgent`、`openMessageTurn`、`contextTexts`、`fire`、`textResponse`、`toolCallResponse`、`ScriptedAdapter`；扫描到的测试主题包括 “durable step context”、“records turn, step, zoned time, and the preceding model-visible message baseline”、“reports an unavailable first-step baseline when no model-visible message precedes it”、“formats in one browser zone and falls back when steering supplies mixed zones”、“reports an unavailable later-step baseline at the matching turn boundary”、“reports an unavailable later-step baseline when event lookup is exhausted”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/time-context/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tsdown.config.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理上下文：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/time-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/context/time-context/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/context/tmux-context

### [packages/context/tmux-context/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/src/index.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把上下文相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Opt-in request-preparation tmux-location context. Eligible step attempts append durable, source-attributed context naming the tmux session, window, and pane this agent process runs in, plus the window's pane-tree layout. The plugin pulls state once per turn...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`queryTmuxLocation`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/tmux-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/shell/shell/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/shell/src/index.ts)、[packages/context/tmux-context/tests/tmux-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/tests/tmux-context.spec.ts)
- 对应测试：[packages/context/tmux-context/tests/tmux-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/tests/tmux-context.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/context/tmux-context/README.md`、入口和消费者，再读当前契约，沿着 `packages/context/tmux-context/tests/tmux-context.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/tmux-context/tests/tmux-context.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 247 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`queryTmuxLocation`、`renderState`、`renderReading`、`latestInjectedState`；源码顶部原注释（英文，仅作回查线索）：Opt-in request-preparation tmux-location context. Eligible step attempts append durable, source-attributed context naming the tmux session, window, and pane this agent process runs in, plus the window's pane-tree layout. The plugin pulls state once per turn...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/tmux-context/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/src/invariant.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查上下文必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tmux-context. @module @deepseek-ai/dsh-tmux-context/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/tmux-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tmux-context. @module @deepseek-ai/dsh-tmux-context/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/context/tmux-context/tests/tmux-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/tests/tmux-context.spec.ts)

- 所属层：packages/context：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查上下文的具体场景，包括“tmux-context injection”、“injects the tmux location on the first step of a turn”、“queries the pane this process runs in and matches its controlling tty”、“does not run on later steps of a turn”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tmux-context injection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `tmuxLine`、`runResult`、`FakeBash`、`mount`、`sessionAgent`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/context/tmux-context/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/README.md)、[packages/context/tmux-context/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/tmux-context/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/context/tmux-context/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 413 行；扫描到的声明包括 `tmuxLine`、`runResult`、`FakeBash`、`mount`、`sessionAgent`、`openMessageTurn`、`contextTexts`、`fire`；扫描到的测试主题包括 “tmux-context injection”、“injects the tmux location on the first step of a turn”、“queries the pane this process runs in and matches its controlling tty”、“does not run on later steps of a turn”、“re-injects a new turn only when tmux state changed”、“honors a positive refresh interval between injections”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
