# 源文件索引：packages/terminal

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 20 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/terminal/terminal-bash/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/config.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义持久终端可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Validated configuration for the local PTY backend.”；固定提交中扫描到的声明包括 `ShellDialect`、`Config`、`ResolvedConfig`、`DEFAULT_BASH_SHELL`、`DEFAULT_BASH_ARGS`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/shell/pwsh-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/pwsh-local/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/terminal/terminal-bash/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/index.ts)、[packages/terminal/terminal-bash/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/session.ts)
- 对应测试：[packages/terminal/terminal-bash/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/config.spec.ts)、[packages/terminal/terminal-bash/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/index.spec.ts)、[packages/terminal/terminal-bash/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/terminal/terminal-bash/README.md`，再读本配置/脚本，沿着 `packages/terminal/terminal-bash/src/index.ts`、`packages/terminal/terminal-bash/src/session.ts`、`packages/terminal/terminal-bash/tests/config.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的声明包括 `ShellDialect`、`Config`、`ResolvedConfig`、`DEFAULT_BASH_SHELL`、`DEFAULT_BASH_ARGS`、`DEFAULT_PWSH_ARGS`、`resolveConfig`、`validateConfig`；源码顶部原注释（英文，仅作回查线索）：Validated configuration for the local PTY backend.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/index.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把持久终端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Persistent shell PTY backend over the subprocess terminal primitive, shared sandbox policy, bounded output, and provider-owned session cleanup. @module @deepseek-ai/dsh-terminal-bash”；固定提交中扫描到的声明包括 `name`、`inject`、`PWSH_PROMPT_SETUP`、`BashTerminalBackend`、`apply`；本地静态 import 图显示它直接依赖 11 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sandbox/sandbox-policy/src/index.ts)、[examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts)
- 对应测试：[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts)、[packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts)、[packages/terminal/terminal-bash/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/index.spec.ts)、[packages/terminal/terminal-bash/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/local.spec.ts)、[packages/terminal/tool-terminal/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/loader-composition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/terminal/terminal-bash/README.md`、入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts`、`packages/e2b/e2b/tests/composition.e2e.ts`、`packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts` 看它怎样约束运行时，最后对照 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts`、`packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 211 行；扫描到的声明包括 `name`、`inject`、`PWSH_PROMPT_SETUP`、`BashTerminalBackend`、`apply`、`ensureSandboxModeFence`、`childEnvironment`、`spawnArgv`；源码顶部原注释（英文，仅作回查线索）：Persistent shell PTY backend over the subprocess terminal primitive, shared sandbox policy, bounded output, and provider-owned session cleanup. @module @deepseek-ai/dsh-terminal-bash。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/invariant.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查持久终端必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-terminal-bash. @module @deepseek-ai/dsh-terminal-bash/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-terminal-bash. @module @deepseek-ai/dsh-terminal-bash/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/src/sanitize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/sanitize.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：终端会话实现
- 这个文件有什么用：这个文件管理持久终端的命令、输出、取消或清理边界，让工具调用可以复用终端状态。
- 为什么这样设计：持久终端封装状态和清理，多个工具调用可以复用同一会话而不直接依赖操作系统终端 API。
- 文件级设计证据：源码顶部注释把它定位为“Streaming terminal-control sanitizer for the line-oriented first release.”；固定提交中扫描到的声明包括 `PROMPT_MARKER_PREFIX`、`CONTROLLED_PROMPT`、`SanitizedChunk`、`TerminalSanitizer`、`normalizeTerminalText`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/terminal/terminal-bash/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/index.ts)、[packages/terminal/terminal-bash/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/session.ts)、[packages/terminal/terminal-bash/tests/sanitize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/sanitize.spec.ts)
- 对应测试：[packages/terminal/terminal-bash/tests/sanitize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/sanitize.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/terminal/terminal-bash/src/index.ts`、`packages/terminal/terminal-bash/src/session.ts`、`packages/terminal/terminal-bash/tests/sanitize.spec.ts` 理解状态变化，最后对照 `packages/terminal/terminal-bash/tests/sanitize.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 188 行；扫描到的声明包括 `PROMPT_MARKER_PREFIX`、`CONTROLLED_PROMPT`、`SanitizedChunk`、`TerminalSanitizer`、`normalizeTerminalText`；源码顶部原注释（英文，仅作回查线索）：Streaming terminal-control sanitizer for the line-oriented first release.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/session.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护持久终端、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Persistent PTY session over the subprocess seam's terminal primitive.”；固定提交中扫描到的声明包括 `LocalPtySession`、`utf8Tail`、`BoundedTextBuffer`、`LocalSendOperation`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/terminal/terminal-bash/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/config.ts)、[packages/terminal/terminal-bash/src/sanitize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/sanitize.ts)、[packages/terminal/terminal-bash/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/index.ts)
- 对应测试：[packages/terminal/terminal-bash/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/index.spec.ts)、[packages/terminal/terminal-bash/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/subprocess/subprocess/src/index.ts`、`packages/terminal/terminal-bash/src/config.ts`、`packages/terminal/terminal-bash/src/sanitize.ts` 和 `packages/terminal/terminal-bash/src/index.ts`、`packages/terminal/terminal-bash/tests/index.spec.ts`、`packages/terminal/terminal-bash/tests/session.spec.ts` 理解状态变化，最后对照 `packages/terminal/terminal-bash/tests/index.spec.ts`、`packages/terminal/terminal-bash/tests/session.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 565 行；扫描到的声明包括 `LocalPtySession`、`utf8Tail`、`BoundedTextBuffer`、`LocalSendOperation`；源码顶部原注释（英文，仅作回查线索）：Persistent PTY session over the subprocess seam's terminal primitive.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/config.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端的具体场景，包括“terminal-bash config”、“accepts resolved positive bounds”、“rejects empty names, invalid numbers, and a read cap above retention”、“rejects a handoff grace shorter than one readiness poll”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“terminal-bash config”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `config`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/terminal/terminal-bash/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/terminal/terminal-bash/src/config.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `config`；扫描到的测试主题包括 “terminal-bash config”、“accepts resolved positive bounds”、“rejects empty names, invalid numbers, and a read cap above retention”、“rejects a handoff grace shorter than one readiness poll”、“terminal-bash dialect resolution”、“defaults bash argv to the interactive profile-free form”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/index.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端的具体场景，包括“BashTerminalBackend startup rollback”、“rejects pre-aborted setup and empty sandbox argv”、“closes failed startup and aggregates cleanup failure”、“starts startup rollback when cancellation wins a stalled initialization”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“BashTerminalBackend startup rollback”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `EmptySandbox`、`RecordingSandbox`、`config`、`agent`、`terminalHandle`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sandbox/sandbox-policy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/sandbox/sandbox-policy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 592 行；扫描到的声明包括 `EmptySandbox`、`RecordingSandbox`、`config`、`agent`、`terminalHandle`、`StubSubprocessRuntime`、`spec`、`stubLocalSession`；扫描到的测试主题包括 “BashTerminalBackend startup rollback”、“rejects pre-aborted setup and empty sandbox argv”、“closes failed startup and aggregates cleanup failure”、“starts startup rollback when cancellation wins a stalled initialization”、“wraps confined argv, scrubs the environment, and returns initialized sessions”、“resolves session mode and root together before wrapping the shell”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/local.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端的具体场景，包括“persists cwd and environment across sends, scrubs secrets, and closes”、“restores the controlled prompt after an in-shell PS1 override”、“wraps the exact shell argv under confined policy and unregisters on reload”、“signals a foreground command and kills a TERM-ignoring background descendant”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“persists cwd and environment across sends, scrubs secrets, and closes”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `PassthroughSandbox`、`stubAgent`、`harness`、`waitForOutput`、`expectReadyForNextSend`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sandbox/sandbox-policy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/sandbox/sandbox-policy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 344 行；扫描到的声明包括 `PassthroughSandbox`、`stubAgent`、`harness`、`waitForOutput`、`expectReadyForNextSend`、`processIsRunning`；扫描到的测试主题包括 “persists cwd and environment across sends, scrubs secrets, and closes”、“restores the controlled prompt after an in-shell PS1 override”、“wraps the exact shell argv under confined policy and unregisters on reload”、“signals a foreground command and kills a TERM-ignoring background descendant”、“quiesces a disowned same-session descendant after the shell exits naturally”、“cancels a slow-starting raw-mode foreground process with a real SIGINT”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/tests/sanitize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/sanitize.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端的具体场景，包括“TerminalSanitizer”、“removes split CSI and owned OSC prompt markers”、“drops unrelated OSC, short escapes, BEL, and incomplete trailing escape”、“normalizes CRLF and standalone carriage returns”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TerminalSanitizer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/terminal/terminal-bash/src/sanitize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/sanitize.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/terminal/terminal-bash/src/sanitize.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的测试主题包括 “TerminalSanitizer”、“removes split CSI and owned OSC prompt markers”、“drops unrelated OSC, short escapes, BEL, and incomplete trailing escape”、“normalizes CRLF and standalone carriage returns”、“carries a trailing carriage return across data chunks and flushes standalone CR”、“reports printable prompt text that follows a marker in a later chunk”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal-bash/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/session.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端、会话的具体场景，包括“LocalPtySession readiness and output”、“lets queued terminal output run before the first post-write readiness poll”、“discards prompt readiness observed during asynchronous pre-write inspection”、“captures prompt MOTD, writes submit explicitly, and settles exact stdin waits”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LocalPtySession readiness and output”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `FakeInspector`、`FakeTerminal`、`makeSession`、`config`、`initialize`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal-bash/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/README.md)、[packages/subprocess/subprocess-local/src/process-inspector.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/process-inspector.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/terminal/terminal-bash/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/src/config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/process-inspector.ts`、`packages/subprocess/subprocess/src/index.ts`、`packages/terminal/terminal-bash/src/config.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1295 行；扫描到的声明包括 `FakeInspector`、`FakeTerminal`、`makeSession`、`config`、`initialize`；扫描到的测试主题包括 “LocalPtySession readiness and output”、“lets queued terminal output run before the first post-write readiness poll”、“discards prompt readiness observed during asynchronous pre-write inspection”、“captures prompt MOTD, writes submit explicitly, and settles exact stdin waits”、“does not reuse a pre-write stdin wait as post-write readiness”、“tracks a pre-write wait exit before exact probing begins”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/index.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把持久终端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Owner-scoped persistent PTY registry. Backends own terminal mechanics while this service owns ids, publication, authorization, and awaited cleanup. @module @deepseek-ai/dsh-terminal”；固定提交中扫描到的声明包括 `TerminalSessionId`、`TerminalErrorCode`、`TerminalError`、`TerminalSessionService`；本地静态 import 图显示它直接依赖 3 个源文件，并被 18 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/terminal/terminal/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)
- 对应测试：[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts)、[packages/shell/tool-bash-persistent/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-bash-persistent/tests/tools.spec.ts)、[packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts)、[packages/shell/tool-pwsh-persistent/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-pwsh-persistent/tests/tools.spec.ts)、[packages/terminal/terminal-bash/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal-bash/tests/index.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/terminal/terminal/README.md`、入口和消费者，再读当前契约，沿着 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/shell/tool-bash-persistent/src/index.ts`、`packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts` 看它怎样约束运行时，最后对照 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts`、`packages/shell/tool-bash-persistent/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 476 行；扫描到的声明包括 `TerminalSessionId`、`TerminalErrorCode`、`TerminalError`、`TerminalSessionService`；源码顶部原注释（英文，仅作回查线索）：Owner-scoped persistent PTY registry. Backends own terminal mechanics while this service owns ids, publication, authorization, and awaited cleanup. @module @deepseek-ai/dsh-terminal。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/invariant.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查持久终端必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-terminal. @module @deepseek-ai/dsh-terminal/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-terminal. @module @deepseek-ai/dsh-terminal/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/types.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述持久终端中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Types shared by PTY backends, the owner-scoped registry, and tool consumers. Runtime service code lives in ./index.ts. @module @deepseek-ai/dsh-terminal/types”；固定提交中扫描到的声明包括 `TerminalSessionIdValue`、`TerminalBackendCleanupError`、`TerminalWaitReason`、`TerminalSignal`、`TerminalSessionStatus`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/terminal/terminal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts)、[packages/shell/tool-bash-persistent/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-bash-persistent/tests/tools.spec.ts)、[packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-pwsh-persistent/tests/loader-composition.spec.ts)、[packages/shell/tool-pwsh-persistent/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/shell/tool-pwsh-persistent/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/terminal/terminal/README.md`、入口和消费者，再读当前契约，沿着 `packages/terminal/terminal/src/index.ts` 看它怎样约束运行时，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/e2b/e2b/tests/composition.e2e.ts`、`packages/shell/tool-bash-persistent/tests/loader-composition.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 177 行；扫描到的声明包括 `TerminalSessionIdValue`、`TerminalBackendCleanupError`、`TerminalWaitReason`、`TerminalSignal`、`TerminalSessionStatus`、`TerminalSpawnRequest`、`TerminalBackendSpawnSpec`、`TerminalSendRequest`；源码顶部原注释（英文，仅作回查线索）：Types shared by PTY backends, the owner-scoped registry, and tool consumers. Runtime service code lives in ./index.ts. @module @deepseek-ai/dsh-terminal/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/terminal/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/tests/service.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端的具体场景，包括“TerminalSessionService backend registry”、“preserves the id brand and disposes exact backend contributions”、“rejects empty backend types”、“TerminalSessionService ownership and lifecycle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TerminalSessionService backend registry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stubAgent`、`disposeAgentScope`、`StubSession`、`backend`、`harness`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/terminal/terminal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/terminal/terminal/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 603 行；扫描到的声明包括 `stubAgent`、`disposeAgentScope`、`StubSession`、`backend`、`harness`、`disposeTerminalSessionService`；扫描到的测试主题包括 “TerminalSessionService backend registry”、“preserves the id brand and disposes exact backend contributions”、“rejects empty backend types”、“TerminalSessionService ownership and lifecycle”、“publishes only after spawn and fences every operation to the exact owner”、“rejects unknown backends, non-live owners, duplicate names, and active sends”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/tool-terminal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/src/index.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把持久终端、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Six model-facing persistent terminal tools. Owner identity comes from the exact tool execution Agent; generic ctx.jobs owns background ids and collection. @module @deepseek-ai/dsh-tool-terminal”；固定提交中扫描到的声明包括 `name`、`inject`、`DEFAULT_MAX_RESULT_BYTES`、`MIN_MAX_RESULT_BYTES`、`Config`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/tool-terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/jobs/jobs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/jobs/jobs/src/index.ts)、[packages/terminal/tool-terminal/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/loader-composition.spec.ts)
- 对应测试：[packages/terminal/tool-terminal/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/loader-composition.spec.ts)、[packages/terminal/tool-terminal/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/terminal/tool-terminal/README.md`、入口和消费者，再读当前契约，沿着 `packages/terminal/tool-terminal/tests/loader-composition.spec.ts`、`packages/terminal/tool-terminal/tests/tools.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/terminal/tool-terminal/tests/loader-composition.spec.ts`、`packages/terminal/tool-terminal/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 399 行；扫描到的声明包括 `name`、`inject`、`DEFAULT_MAX_RESULT_BYTES`、`MIN_MAX_RESULT_BYTES`、`Config`、`apply`、`requireAgent`、`sessionId`；源码顶部原注释（英文，仅作回查线索）：Six model-facing persistent terminal tools. Owner identity comes from the exact tool execution Agent; generic ctx.jobs owns background ids and collection. @module @deepseek-ai/dsh-tool-terminal。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/tool-terminal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/src/invariant.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：不变量伴随插件
- 这个文件有什么用：它是终端工具包的 Cordis companion：声明需要 `invariants` 服务并注册一个空安装器，明确记录这个包不拥有可检查的运行时不变量，PTY 生命周期和后台任务关系仍由组合它的服务负责。
- 为什么这样设计：不拥有运行时不变量的包也需要明确的 companion 入口，否则自动化工具会把“没有 companion”误读为遗漏；空 installer 把责任边界写进插件树，同时让真正拥有 PTY 和后台任务关系的服务保留唯一维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tool-terminal. @module @deepseek-ai/dsh-tool-terminal/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/tool-terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-terminal. @module @deepseek-ai/dsh-tool-terminal/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/tool-terminal/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/src/render.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把持久终端、工具、渲染转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 文件级设计证据：源码顶部注释把它定位为“Model and UI rendering for persistent terminal tool results.”；固定提交中扫描到的声明包括 `boundTerminalText`、`renderSpawn`、`renderSend`、`renderSendRead`、`renderRead`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/tool-terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/README.md)、[packages/util/output-retention/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/output-retention/src/index.ts)、[packages/terminal/tool-terminal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/src/index.ts)、[packages/terminal/tool-terminal/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/render.spec.ts)
- 对应测试：[packages/terminal/tool-terminal/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/render.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/terminal/tool-terminal/src/index.ts`、`packages/terminal/tool-terminal/tests/render.spec.ts` 确认状态如何进入 UI，最后对照 `packages/terminal/tool-terminal/tests/render.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 177 行；扫描到的声明包括 `boundTerminalText`、`renderSpawn`、`renderSend`、`renderSendRead`、`renderRead`、`renderList`、`byteLength`、`retain`；源码顶部原注释（英文，仅作回查线索）：Model and UI rendering for persistent terminal tool results.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/tool-terminal/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/loader-composition.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端、工具的具体场景，包括“boots cordis.yml and preserves shell state across real tool calls”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“boots cordis.yml and preserves shell state across real tool calls”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `PassthroughSandbox`、`agent`、`resultText`；本地静态 import 图显示它直接依赖 14 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/tool-terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `PassthroughSandbox`、`agent`、`resultText`；扫描到的测试主题包括 “boots cordis.yml and preserves shell state across real tool calls”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/tool-terminal/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/render.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端、工具、渲染的具体场景，包括“tool-terminal rendering”、“renders spawn with and without names or MOTD”、“renders running, exited, empty, and truncated sends”、“renders history and every list status shape”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-terminal rendering”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/tool-terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/README.md)、[packages/terminal/terminal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/terminal/src/index.ts)、[packages/terminal/tool-terminal/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/src/render.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/terminal/terminal/src/index.ts`、`packages/terminal/tool-terminal/src/render.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 73 行；扫描到的测试主题包括 “tool-terminal rendering”、“renders spawn with and without names or MOTD”、“renders running, exited, empty, and truncated sends”、“renders history and every list status shape”、“bounds complete UTF-8 results while retaining terminal metadata when it fits”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/terminal/tool-terminal/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/tests/tools.spec.ts)

- 所属层：packages/terminal：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查持久终端、工具的具体场景，包括“tool-terminal foreground API”、“registers exactly six schemas and drives the full owner-scoped lifecycle”、“projects every terminal DTO into the generated Code Mode output map”、“fails without an initiating agent and rejects background before writing”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-terminal foreground API”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fakeAgent`、`StubSession`、`stubBackend`、`setup`、`setupBase`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/terminal/tool-terminal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/terminal/tool-terminal/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 495 行；扫描到的声明包括 `fakeAgent`、`StubSession`、`stubBackend`、`setup`、`setupBase`、`call`、`callWithSignal`、`text`；扫描到的测试主题包括 “tool-terminal foreground API”、“registers exactly six schemas and drives the full owner-scoped lifecycle”、“projects every terminal DTO into the generated Code Mode output map”、“fails without an initiating agent and rejects background before writing”、“validates required values and forwards optional spawn/read arguments”、“declares terminal presentation only for foreground sends”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
