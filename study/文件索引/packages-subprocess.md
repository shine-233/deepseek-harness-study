# 源文件索引：packages/subprocess

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 19 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/subprocess/subprocess-local/scripts/ensure-spawn-helper.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/scripts/ensure-spawn-helper.mjs)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行子进程相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Restore the executable bit stripped from node-pty's prebuilt helper.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Restore the executable bit stripped from node-pty's prebuilt helper.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Restore the executable bit stripped from node-pty's prebuilt helper.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)
- 对应测试：[packages/subprocess/subprocess-local/tests/spawn.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/spawn.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `packages/subprocess/subprocess-local/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行；源码顶部原注释（英文，仅作回查线索）：Restore the executable bit stripped from node-pty's prebuilt helper.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/index.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子进程相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Local Service Provider for the subprocess capability seam. Each spawn is a detached process tree with the spec's per-stream stdio dispositions. Normal disposal terminates and joins live trees; Node's synchronous exit phase force-stops any trees the service ...”；固定提交中扫描到的声明包括 `LocalSubprocessRuntime`、`environmentValue`；本地静态 import 图显示它直接依赖 5 个源文件，并被 46 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)、[packages/subprocess/subprocess-local/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/terminal.ts)、[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)
- 对应测试：[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/tool-fs-search/tests/integration.spec.ts)、[packages/fs/tool-fs-search/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/tool-fs-search/tests/load-path.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/subprocess/subprocess-local/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/hmr-live.e2e.ts`、`examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/harness.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/hmr-live.e2e.ts`、`examples/headless-agent/tests/code-mode.e2e.ts`、`packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 195 行；扫描到的声明包括 `LocalSubprocessRuntime`、`environmentValue`；源码顶部原注释（英文，仅作回查线索）：Local Service Provider for the subprocess capability seam. Each spawn is a detached process tree with the spec's per-stream stdio dispositions. Normal disposal terminates and joins live trees; Node's synchronous exit phase force-stops any trees the service ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/invariant.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子进程必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-subprocess-local. @module @deepseek-ai/dsh-subprocess-local/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subprocess-local. @module @deepseek-ai/dsh-subprocess-local/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把子进程的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Platform process-table inspection for terminal readiness, signals, and teardown.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Platform process-table inspection for terminal readiness, signals, and teardown.”；固定提交中扫描到的声明包括 `ProcessIdentity`、`ProcessInspector`、`ProcessInspectorInternals`、`parseProcStat`、`linuxProcessGroupHasLiveMembers`；本地静态 import 图显示它直接依赖 2 个源文件，并被 9 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/windows-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/windows-inspector.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/index.ts)、[packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)
- 对应测试：[packages/subprocess/subprocess-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/local.spec.ts)、[packages/subprocess/subprocess-local/tests/process-exit.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-exit.spec.ts)、[packages/subprocess/subprocess-local/tests/process-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-inspector.spec.ts)、[packages/subprocess/subprocess-local/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/terminal.spec.ts)、[packages/terminal/terminal-bash/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subprocess/subprocess-local/README.md` 和入口，再读当前实现，沿着 `packages/subprocess/subprocess-local/src/windows-inspector.ts`、`packages/subprocess/subprocess/src/index.ts` 和 `packages/subprocess/subprocess-local/src/index.ts`、`packages/subprocess/subprocess-local/src/spawn.ts`、`packages/subprocess/subprocess-local/src/terminal.ts` 确认输入输出，最后对照 `packages/subprocess/subprocess-local/tests/local.spec.ts`、`packages/subprocess/subprocess-local/tests/process-exit.spec.ts`、`packages/subprocess/subprocess-local/tests/process-inspector.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 376 行；扫描到的声明包括 `ProcessIdentity`、`ProcessInspector`、`ProcessInspectorInternals`、`parseProcStat`、`linuxProcessGroupHasLiveMembers`、`createProcessInspector`、`readLinuxStat`、`numericEntries`；源码顶部原注释（英文，仅作回查线索）：Platform process-table inspection for terminal readiness, signals, and teardown.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：子进程执行实现
- 这个文件有什么用：这个文件把本地子进程的启动、终端、输出或退出状态接到统一执行接口。
- 为什么这样设计：进程启动和退出规则集中，工具调用者只处理统一的输出、信号和错误结果，便于替换本地执行后端。
- 文件级设计证据：源码顶部注释把它定位为“Process plumbing for the local subprocess service: detached process-tree spawn with per-stream stdio dispositions, tail-keep collection with spill files, tree-scoped signalling (POSIX groups; Windows taskkill), and the SIGTERM→SIGKILL escalation. This layer...”；固定提交中扫描到的声明包括 `childEnv`、`SpawnInternals`、`LocalSubprocessHandle`、`OutputCollector`、`killGroup`；本地静态 import 图显示它直接依赖 3 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)
- 对应测试：[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/subagent/subagent-acp/tests/subagent-acp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subagent/subagent-acp/tests/subagent-acp.spec.ts)、[packages/subprocess/subprocess-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/local.spec.ts)、[packages/subprocess/subprocess-local/tests/process-exit.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-exit.spec.ts)、[packages/subprocess/subprocess-local/tests/spawn.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/spawn.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subprocess/subprocess-local/README.md` 和入口，再读当前实现，沿着 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess/src/index.ts`、`packages/util/timeout/src/index.ts` 和 `packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/instance.spec.ts`、`packages/subagent/subagent-acp/tests/subagent-acp.spec.ts` 确认输入输出，最后对照 `packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/instance.spec.ts`、`packages/subagent/subagent-acp/tests/subagent-acp.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 543 行；扫描到的声明包括 `childEnv`、`SpawnInternals`、`LocalSubprocessHandle`、`OutputCollector`、`killGroup`、`taskkillProcessTree`、`spawnSubprocess`、`sleepTick`；源码顶部原注释（英文，仅作回查线索）：Process plumbing for the local subprocess service: detached process-tree spawn with per-stream stdio dispositions, tail-keep collection with spill files, tree-scoped signalling (POSIX groups; Windows taskkill), and the SIGTERM→SIGKILL escalation. This layer...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/terminal.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：子进程执行实现
- 这个文件有什么用：这个文件把本地子进程的启动、终端、输出或退出状态接到统一执行接口。
- 为什么这样设计：进程启动和退出规则集中，工具调用者只处理统一的输出、信号和错误结果，便于替换本地执行后端。
- 文件级设计证据：源码顶部注释把它定位为“Local node-pty terminal-process implementation for the subprocess seam.”；固定提交中扫描到的声明包括 `LocalTerminalHandle`、`delay`、`signalName`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/index.ts)、[packages/subprocess/subprocess-local/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/terminal.spec.ts)
- 对应测试：[packages/subprocess/subprocess-local/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/terminal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subprocess/subprocess-local/README.md` 和入口，再读当前实现，沿着 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess/src/index.ts` 和 `packages/subprocess/subprocess-local/src/index.ts`、`packages/subprocess/subprocess-local/tests/terminal.spec.ts` 确认输入输出，最后对照 `packages/subprocess/subprocess-local/tests/terminal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 323 行；扫描到的声明包括 `LocalTerminalHandle`、`delay`、`signalName`；源码顶部原注释（英文，仅作回查线索）：Local node-pty terminal-process implementation for the subprocess seam.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/src/windows-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/windows-inspector.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：子进程执行实现
- 这个文件有什么用：这个文件把本地子进程的启动、终端、输出或退出状态接到统一执行接口。
- 为什么这样设计：进程启动和退出规则集中，工具调用者只处理统一的输出、信号和错误结果，便于替换本地执行后端。
- 文件级设计证据：源码顶部注释把它定位为“Windows process-table operations for terminal readiness, signalling, and teardown: Toolhelp32 snapshot enumeration with GetProcessTimes creation-time identity and process-handle wait-state liveness, the shell pid as a pseudo process group (Windows has no PO...”；固定提交中扫描到的声明包括 `ProcessEntry`、`WindowsProcessState`、`WindowsProcessInspectorInternals`、`windowsProcessTree`、`WindowsProcessInspector`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/subprocess/subprocess-local/tests/process-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-inspector.spec.ts)、[packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts)
- 对应测试：[packages/subprocess/subprocess-local/tests/process-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-inspector.spec.ts)、[packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subprocess/subprocess-local/README.md` 和入口，再读当前实现，沿着 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess/src/index.ts` 和 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess-local/tests/process-inspector.spec.ts`、`packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts` 确认输入输出，最后对照 `packages/subprocess/subprocess-local/tests/process-inspector.spec.ts`、`packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 325 行；扫描到的声明包括 `ProcessEntry`、`WindowsProcessState`、`WindowsProcessInspectorInternals`、`windowsProcessTree`、`WindowsProcessInspector`、`createWindowsProcessInspector`、`NativePtr`、`isInvalidHandle`；源码顶部原注释（英文，仅作回查线索）：Windows process-table operations for terminal readiness, signalling, and teardown: Toolhelp32 snapshot enumeration with GetProcessTimes creation-time identity and process-handle wait-state liveness, the shell pid as a pseudo process group (Windows has no PO...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/fixtures/managed-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/fixtures/managed-tree.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为子进程提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 18 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/fixtures/process-exit-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/fixtures/process-exit-host.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为子进程、服务端宿主提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `waitForFile`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `waitForFile`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/local.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“LocalSubprocessRuntime”、“places the host-exit finalizer before listeners that predate the service”、“keeps the host-exit finalizer active until normal disposal reaches quiescence”、“contains each host-exit termination failure and continues with the other targets”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LocalSubprocessRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `spec`、`SecondManager`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/index.ts)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/index.ts`、`packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess-local/src/spawn.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 446 行；扫描到的声明包括 `spec`、`SecondManager`；扫描到的测试主题包括 “LocalSubprocessRuntime”、“places the host-exit finalizer before listeners that predate the service”、“keeps the host-exit finalizer active until normal disposal reaches quiescence”、“contains each host-exit termination failure and continues with the other targets”、“resolves absolute and PATH executables and honors lookup cancellation”、“builds Windows executable candidates with case-insensitive overrides”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/process-exit.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-exit.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“synchronous cleanup on host exit”、“preserves normal terminate-and-join disposal and removes the exit listener”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“synchronous cleanup on host exit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `processExists`、`readTree`、`captureIdentities`、`waitForGone`、`cleanupTree`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess-local/src/spawn.ts`、`packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的声明包括 `processExists`、`readTree`、`captureIdentities`、`waitForGone`、`cleanupTree`、`runScenario`；扫描到的测试主题包括 “synchronous cleanup on host exit”、“preserves normal terminate-and-join disposal and removes the exit listener”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/process-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/process-inspector.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“Linux process inspector”、“treats zombie-only process groups as quiescent and fails closed when unobservable”、“parses stat safely, captures only the rooted process tree, and signals identities”、“detects read, select, poll, and epoll waits across non-leader threads”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Linux process inspector”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stat`、`syscall`、`fakeInternals`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess-local/src/windows-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/windows-inspector.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess-local/src/windows-inspector.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 250 行；扫描到的声明包括 `stat`、`syscall`、`fakeInternals`；扫描到的测试主题包括 “Linux process inspector”、“treats zombie-only process groups as quiescent and fails closed when unobservable”、“parses stat safely, captures only the rooted process tree, and signals identities”、“detects read, select, poll, and epoll waits across non-leader threads”、“fails closed on unsupported, malformed, unreadable, or non-stdin waits”、“contains unreadable syscall, memory, and fdinfo boundaries”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/spawn.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/spawn.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“spawnSubprocess”、“captures stdout on success”、“captures stderr separately”、“captures both streams”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“spawnSubprocess”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `shellArgv`、`spec`、`waitGone`、`waitForStdout`、`finish`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/index.ts)、[packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/index.ts`、`packages/subprocess/subprocess-local/src/spawn.ts`、`packages/subprocess/subprocess/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1112 行；扫描到的声明包括 `shellArgv`、`spec`、`waitGone`、`waitForStdout`、`finish`、`waitForPidFile`；扫描到的测试主题包括 “spawnSubprocess”、“captures stdout on success”、“captures stderr separately”、“captures both streams”、“reports non-zero exit codes”、“passes the ambient TERM through untouched (terminal policy is the caller\”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/terminal.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程、持久终端的具体场景，包括“LocalTerminalHandle”、“force-kills descendants around the shell during synchronous host exit”、“uses captured identities and contains shell races when final inspection fails”、“uses node-pty only when the shell start identity was unavailable”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LocalTerminalHandle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `FakePty`、`FakeInspector`、`makeHandle`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess-local/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/terminal.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess-local/src/terminal.ts`、`packages/subprocess/subprocess/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 511 行；扫描到的声明包括 `FakePty`、`FakeInspector`、`makeHandle`；扫描到的测试主题包括 “LocalTerminalHandle”、“force-kills descendants around the shell during synchronous host exit”、“uses captured identities and contains shell races when final inspection fails”、“uses node-pty only when the shell start identity was unavailable”、“does not signal a recycled terminal root before its delayed exit callback”、“bridges terminal bytes, foreground control, and signalled exit facts”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/tests/windows-inspector.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“windowsProcessTree”、“walks a table children-first with readable identities only”、“returns an empty walk for an absent root”、“terminates on a parent cycle instead of recursing forever”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“windowsProcessTree”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fakeInternals`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/README.md)、[packages/subprocess/subprocess-local/src/windows-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/windows-inspector.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/windows-inspector.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 148 行；扫描到的声明包括 `fakeInternals`；扫描到的测试主题包括 “windowsProcessTree”、“walks a table children-first with readable identities only”、“returns an empty walk for an absent root”、“terminates on a parent cycle instead of recursing forever”、“WindowsProcessInspector (injected internals)”、“exposes the shell pid as the pseudo foreground group and never proves stdin waits”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子进程相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition for the subprocess capability seam (ctx.subprocess): execution-world executable lookup, fully specified managed process trees with raw or collected stdio, and one terminal-process primitive. Command defaulting, shell semantics, deadlines,...”；固定提交中扫描到的声明包括 `SENSITIVE_ENV_PATTERN`、`scrubbedParentEnv`；本地静态 import 图显示它直接依赖 2 个源文件，并被 45 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/README.md)、[packages/subprocess/subprocess/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)、[packages/bundle/web-app/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/web-app/src/index.ts)
- 对应测试：[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)、[packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)、[packages/fs/tool-fs-search/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/tool-fs-search/tests/tools.spec.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/subprocess/subprocess/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/hmr-live.e2e.ts`、`packages/bundle/web-app/src/index.ts`、`packages/e2b/subprocess-e2b/src/environment.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/hmr-live.e2e.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`、`packages/e2b/subprocess-e2b/tests/terminal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `SENSITIVE_ENV_PATTERN`、`scrubbedParentEnv`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the subprocess capability seam (ctx.subprocess): execution-world executable lookup, fully specified managed process trees with raw or collected stdio, and one terminal-process primitive. Command defaulting, shell semantics, deadlines,...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/invariant.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子进程必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for the subprocess seam. @module @deepseek-ai/dsh-subprocess/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the subprocess seam. @module @deepseek-ai/dsh-subprocess/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/types.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述子进程中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Vocabulary for the subprocess Service Definition: fully-specified spawn requests with Node-shaped per-stream stdio modes, bounded collected output with spill recovery, raw piped streams, and tree-scoped termination. Command defaulting, shell semantics, prot...”；固定提交中扫描到的声明包括 `DSH_ENV_PREFIX`、`DshEnvironmentKey`、`DshEnvironment`、`CollectedOutput`、`SubprocessStdinMode`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/README.md)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)、[apps/web/tests/pwsh-terminal.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/pwsh-terminal.e2e.ts)、[examples/acp-agent/tests/acp.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/acp.snapshot.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subprocess/subprocess/README.md`、入口和消费者，再读当前契约，沿着 `packages/subprocess/subprocess/src/index.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/hmr-live.e2e.ts`、`apps/web/tests/pwsh-terminal.e2e.ts`、`examples/acp-agent/tests/acp.snapshot.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 264 行；扫描到的声明包括 `DSH_ENV_PREFIX`、`DshEnvironmentKey`、`DshEnvironment`、`CollectedOutput`、`SubprocessStdinMode`、`SubprocessCollect`、`SubprocessOutputMode`、`SubprocessStdio`；源码顶部原注释（英文，仅作回查线索）：Vocabulary for the subprocess Service Definition: fully-specified spawn requests with Node-shaped per-stream stdio modes, bounded collected output with spill recovery, raw piped streams, and tree-scoped termination. Command defaulting, shell semantics, prot...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subprocess/subprocess/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/tests/service.spec.ts)

- 所属层：packages/subprocess：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“SubprocessRuntime seam”、“a concrete subclass registers as ctx.subprocess and serves the abstract API”、“loading a second implementation throws (one subprocess service per context — cordis sta...”、“scrubbedParentEnv drops credential-shaped and DSH_ names (case-insensitively) but keeps...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SubprocessRuntime seam”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StubSubprocessRuntime`、`SecondService`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/subprocess/subprocess/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/README.md)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `StubSubprocessRuntime`、`SecondService`；扫描到的测试主题包括 “SubprocessRuntime seam”、“a concrete subclass registers as ctx.subprocess and serves the abstract API”、“loading a second implementation throws (one subprocess service per context — cordis standard)”、“scrubbedParentEnv drops credential-shaped and DSH_ names (case-insensitively) but keeps PATH”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
