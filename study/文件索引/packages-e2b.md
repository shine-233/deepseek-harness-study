# 源文件索引：packages/e2b

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 16 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/e2b/e2b` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared ownership of one E2B sandbox. Capability adapters await the same SDK handle, so filesystem and process operations inhabit one remote Linux world. @module @deepseek-ai/dsh-e2b”；固定提交中扫描到的声明包括 `quoteE2BShellArg`、`e2bControlEnvs`、`Config`、`E2BRuntime`；本地静态 import 图显示它直接依赖 2 个源文件，并被 11 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/e2b/e2b/tests/e2b.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/e2b.spec.ts)
- 对应测试：[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/e2b/e2b/tests/e2b.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/e2b.spec.ts)、[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/tests/filesystem.spec.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)、[packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/e2b/e2b/README.md`、入口和消费者，再读当前契约，沿着 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/e2b/e2b/tests/e2b.spec.ts`、`packages/e2b/fs-e2b/src/index.ts` 看它怎样约束运行时，最后对照 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/e2b/e2b/tests/e2b.spec.ts`、`packages/e2b/fs-e2b/tests/filesystem.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 182 行；扫描到的声明包括 `quoteE2BShellArg`、`e2bControlEnvs`、`Config`、`E2BRuntime`；源码顶部原注释（英文，仅作回查线索）：Shared ownership of one E2B sandbox. Capability adapters await the same SDK handle, so filesystem and process operations inhabit one remote Linux world. @module @deepseek-ai/dsh-e2b。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/e2b/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/invariant.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/e2b/e2b` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-e2b. @module @deepseek-ai/dsh-e2b/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/e2b/e2b/tests/e2b.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/e2b.spec.ts)
- 对应测试：[packages/e2b/e2b/tests/e2b.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/e2b.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/e2b/e2b/tests/e2b.spec.ts` 理解状态变化，最后对照 `packages/e2b/e2b/tests/e2b.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-e2b. @module @deepseek-ai/dsh-e2b/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/e2b/e2b` 包里的 `tests/composition.e2e.ts` 的具体场景，包括“scrubs credentials before actual E2B command and PTY login shells”、“runs FS, Bash, PTY, and LSP in one sandbox and deletes it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“scrubs credentials before actual E2B command and PTY login shells”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/e2b/e2b/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 184 行；扫描到的测试主题包括 “scrubs credentials before actual E2B command and PTY login shells”、“runs FS, Bash, PTY, and LSP in one sandbox and deletes it”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/e2b/tests/e2b.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/e2b.spec.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/e2b/e2b` 包里的 `tests/e2b.spec.ts` 的具体场景，包括“E2BRuntime”、“gives each SDK login shell a fresh non-overridable control home”、“creates one protected shared sandbox and kills it on default disposal”、“rejects handle acquisition when disposal starts during setup”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“E2BRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `FakeSandbox`、`fakeSandbox`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/e2b/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/e2b/e2b/src/index.ts`、`packages/e2b/e2b/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 247 行；扫描到的声明包括 `FakeSandbox`、`fakeSandbox`；扫描到的测试主题包括 “E2BRuntime”、“gives each SDK login shell a fresh non-overridable control home”、“creates one protected shared sandbox and kills it on default disposal”、“rejects handle acquisition when disposal starts during setup”、“reads the key from the environment and honors the configured cwd and lifetime”、“accepts a missing sandbox when disposal itself requests deletion”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/fs-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/src/index.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“E2B provider for the filesystem capability seam. Paths, contents, and atomic staging files remain inside the shared remote sandbox. @module @deepseek-ai/dsh-fs-e2b”；固定提交中扫描到的声明包括 `E2BFileSystem`、`assertNotAborted`、`normalizeLineEndings`、`detectsCrlf`、`restoreLineEndings`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/fs-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs/src/index.ts)、[examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts)、[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/tests/filesystem.spec.ts)
- 对应测试：[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/tests/filesystem.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/e2b/fs-e2b/README.md`、入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts`、`packages/e2b/fs-e2b/tests/filesystem.spec.ts` 看它怎样约束运行时，最后对照 `packages/e2b/fs-e2b/tests/filesystem.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 582 行；扫描到的声明包括 `E2BFileSystem`、`assertNotAborted`、`normalizeLineEndings`、`detectsCrlf`、`restoreLineEndings`、`decodeText`、`decodeCanonicalPath`、`signalOpts`；源码顶部原注释（英文，仅作回查线索）：E2B provider for the filesystem capability seam. Paths, contents, and atomic staging files remain inside the shared remote sandbox. @module @deepseek-ai/dsh-fs-e2b。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/fs-e2b/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/src/invariant.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-fs-e2b. @module @deepseek-ai/dsh-fs-e2b/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/fs-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/tests/filesystem.spec.ts)
- 对应测试：[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/tests/filesystem.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/e2b/fs-e2b/tests/filesystem.spec.ts` 理解状态变化，最后对照 `packages/e2b/fs-e2b/tests/filesystem.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-fs-e2b. @module @deepseek-ai/dsh-fs-e2b/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/tests/filesystem.spec.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统的具体场景，包括“E2BFileSystem identity, metadata, and reads”、“resolves remote paths, reports symlinks, and lists direct children in stable order”、“projects canonical process paths, file URLs, and containment”、“preserves newline and multibyte canonical paths through strict ASCII framing”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“E2BFileSystem identity, metadata, and reads”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `bytes`、`commandError`、`FakeRemote`、`setup`、`expectCode`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/fs-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/fs-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/src/index.ts)、[packages/e2b/fs-e2b/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/fs-e2b/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/e2b/e2b/src/index.ts`、`packages/e2b/fs-e2b/src/index.ts`、`packages/e2b/fs-e2b/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 806 行；扫描到的声明包括 `bytes`、`commandError`、`FakeRemote`、`setup`、`expectCode`；扫描到的测试主题包括 “E2BFileSystem identity, metadata, and reads”、“resolves remote paths, reports symlinks, and lists direct children in stable order”、“projects canonical process paths, file URLs, and containment”、“preserves newline and multibyte canonical paths through strict ASCII framing”、“reads whole and streamed UTF-8 across chunk boundaries”、“streams an empty file even though the pinned SDK returns a non-stream value”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/environment.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：远程执行适配
- 这个文件有什么用：这个文件把 E2B 或远程执行环境适配成 Harness 的子进程、终端和输出接口。
- 为什么这样设计：远程执行与本地执行共享上层契约，E2B 差异集中在适配包内，失败和清理规则才不会散落到工具调用者。
- 文件级设计证据：源码顶部注释把它定位为“Shared remote-environment scrubbing for E2B process and terminal launchers.”；固定提交中扫描到的声明包括 `readRemoteEnvironment`、`scrubRemoteEnvironment`、`bootstrapEnvironment`、`serializeRemoteEnvironment`、`remoteEnvironmentEntries`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/e2b/subprocess-e2b/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/process.ts)、[packages/e2b/subprocess-e2b/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/terminal.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)、[packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/e2b/subprocess-e2b/README.md` 和入口，再读当前实现，沿着 `packages/e2b/e2b/src/index.ts`、`packages/subprocess/subprocess/src/index.ts` 和 `packages/e2b/subprocess-e2b/src/process.ts`、`packages/e2b/subprocess-e2b/src/terminal.ts` 确认输入输出，最后对照 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`、`packages/e2b/subprocess-e2b/tests/terminal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `readRemoteEnvironment`、`scrubRemoteEnvironment`、`bootstrapEnvironment`、`serializeRemoteEnvironment`、`remoteEnvironmentEntries`；源码顶部原注释（英文，仅作回查线索）：Shared remote-environment scrubbing for E2B process and terminal launchers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/index.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子进程相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“E2B Service Provider for the subprocess capability seam. Each handle starts through the shared sandbox and retains command output/status paths in that remote world. @module @deepseek-ai/dsh-subprocess-e2b”；固定提交中扫描到的声明包括 `Config`、`E2BSubprocessRuntime`、`requireRepresentableGrace`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/process.ts)、[packages/e2b/subprocess-e2b/src/remote.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/remote.ts)、[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)
- 对应测试：[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)、[packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/e2b/subprocess-e2b/README.md`、入口和消费者，再读当前契约，沿着 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`、`packages/e2b/subprocess-e2b/tests/terminal.spec.ts` 看它怎样约束运行时，最后对照 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`、`packages/e2b/subprocess-e2b/tests/terminal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 208 行；扫描到的声明包括 `Config`、`E2BSubprocessRuntime`、`requireRepresentableGrace`；源码顶部原注释（英文，仅作回查线索）：E2B Service Provider for the subprocess capability seam. Each handle starts through the shared sandbox and retains command output/status paths in that remote world. @module @deepseek-ai/dsh-subprocess-e2b。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/invariant.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子进程必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-subprocess-e2b. @module @deepseek-ai/dsh-subprocess-e2b/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)
- 对应测试：[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/e2b/subprocess-e2b/tests/subprocess.spec.ts` 理解状态变化，最后对照 `packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subprocess-e2b. @module @deepseek-ai/dsh-subprocess-e2b/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/output.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/output.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：远程执行适配
- 这个文件有什么用：这个文件把 E2B 或远程执行环境适配成 Harness 的子进程、终端和输出接口。
- 为什么这样设计：远程执行与本地执行共享上层契约，E2B 差异集中在适配包内，失败和清理规则才不会散落到工具调用者。
- 文件级设计证据：源码顶部注释把它定位为“Bounded host-side projection of a complete output file retained in E2B.”；固定提交中扫描到的声明包括 `E2B_OUTPUT_COMPLETE_FRAME`、`E2BBase64Decoder`、`E2BOutputReader`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/e2b/subprocess-e2b/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/process.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)
- 对应测试：[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/e2b/subprocess-e2b/README.md` 和入口，再读当前实现，沿着 `packages/subprocess/subprocess/src/index.ts` 和 `packages/e2b/subprocess-e2b/src/process.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts` 确认输入输出，最后对照 `packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 131 行；扫描到的声明包括 `E2B_OUTPUT_COMPLETE_FRAME`、`E2BBase64Decoder`、`E2BOutputReader`；源码顶部原注释（英文，仅作回查线索）：Bounded host-side projection of a complete output file retained in E2B.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/process.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把子进程的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“One asynchronously-started E2B command projected onto the subprocess seam.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“One asynchronously-started E2B command projected onto the subprocess seam.”；固定提交中扫描到的声明包括 `E2BSubprocessHandle`、`isCollect`、`hasSpill`、`isValidProcessId`、`DeferredStdin`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/environment.ts)、[packages/e2b/subprocess-e2b/src/output.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/output.ts)、[packages/e2b/subprocess-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/index.ts)
- 对应测试：[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/e2b/subprocess-e2b/README.md` 和入口，再读当前实现，沿着 `packages/e2b/e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/environment.ts`、`packages/e2b/subprocess-e2b/src/output.ts` 和 `packages/e2b/subprocess-e2b/src/index.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts` 确认输入输出，最后对照 `packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 698 行；扫描到的声明包括 `E2BSubprocessHandle`、`isCollect`、`hasSpill`、`isValidProcessId`、`DeferredStdin`、`withinMs`、`commandText`、`waitWithSignal`；源码顶部原注释（英文，仅作回查线索）：One asynchronously-started E2B command projected onto the subprocess seam.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/remote.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/remote.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：远程执行适配
- 这个文件有什么用：这个文件把 E2B 或远程执行环境适配成 Harness 的子进程、终端和输出接口。
- 为什么这样设计：远程执行与本地执行共享上层契约，E2B 差异集中在适配包内，失败和清理规则才不会散落到工具调用者。
- 文件级设计证据：源码顶部注释把它定位为“Shared remote-control helpers for the E2B subprocess adapter: SDK option shaping, poll ticks, and the one tolerant process-group signal used by both the ordinary-process and terminal teardown ladders.”；固定提交中扫描到的声明包括 `asError`、`signalOpts`、`commandOpts`、`delay`、`waitTick`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/process.ts)、[packages/e2b/subprocess-e2b/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/terminal.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)、[packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/e2b/subprocess-e2b/README.md` 和入口，再读当前实现，沿着 `packages/e2b/e2b/src/index.ts` 和 `packages/e2b/subprocess-e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/process.ts`、`packages/e2b/subprocess-e2b/src/terminal.ts` 确认输入输出，最后对照 `packages/e2b/e2b/tests/composition.e2e.ts`、`packages/e2b/subprocess-e2b/tests/subprocess.spec.ts`、`packages/e2b/subprocess-e2b/tests/terminal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的声明包括 `asError`、`signalOpts`、`commandOpts`、`delay`、`waitTick`、`signalRemoteGroups`；源码顶部原注释（英文，仅作回查线索）：Shared remote-control helpers for the E2B subprocess adapter: SDK option shaping, poll ticks, and the one tolerant process-group signal used by both the ordinary-process and terminal teardown ladders.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/terminal.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：远程执行适配
- 这个文件有什么用：这个文件把 E2B 或远程执行环境适配成 Harness 的子进程、终端和输出接口。
- 为什么这样设计：远程执行与本地执行共享上层契约，E2B 差异集中在适配包内，失败和清理规则才不会散落到工具调用者。
- 文件级设计证据：源码顶部注释把它定位为“E2B PTY allocation and process-session ownership for the subprocess seam.”；固定提交中扫描到的声明包括 `E2BTerminalHandle`、`spawnE2BTerminal`、`BootstrapOutputFilter`、`waitForBootstrapOutput`、`parsePositiveId`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/environment.ts)、[packages/e2b/subprocess-e2b/src/remote.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/remote.ts)、[packages/e2b/subprocess-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/index.ts)
- 对应测试：[packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/e2b/subprocess-e2b/README.md` 和入口，再读当前实现，沿着 `packages/e2b/e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/environment.ts`、`packages/e2b/subprocess-e2b/src/remote.ts` 和 `packages/e2b/subprocess-e2b/src/index.ts`、`packages/e2b/subprocess-e2b/tests/terminal.spec.ts` 确认输入输出，最后对照 `packages/e2b/subprocess-e2b/tests/terminal.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 567 行；扫描到的声明包括 `E2BTerminalHandle`、`spawnE2BTerminal`、`BootstrapOutputFilter`、`waitForBootstrapOutput`、`parsePositiveId`、`serializeValues`、`terminalSessionId`、`sessionProcessGroups`；源码顶部原注释（英文，仅作回查线索）：E2B PTY allocation and process-session ownership for the subprocess seam.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/tests/subprocess.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/subprocess.spec.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程的具体场景，包括“E2BOutputReader”、“decodes base64 across arbitrary callback boundaries and rejects malformed framing”、“keeps a byte-exact tail with independent whole-stream cursors”、“drops whole head chunks and withholds absent or over-cap spills”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“E2BOutputReader”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `commandError`、`FakeCommandHandle`、`FakeSandbox`、`spec`、`runtime`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/e2b/e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1792 行；扫描到的声明包括 `commandError`、`FakeCommandHandle`、`FakeSandbox`、`spec`、`runtime`、`flush`、`testHandle`、`service`；扫描到的测试主题包括 “E2BOutputReader”、“decodes base64 across arbitrary callback boundaries and rejects malformed framing”、“keeps a byte-exact tail with independent whole-stream cursors”、“drops whole head chunks and withholds absent or over-cap spills”、“E2BSubprocessHandle”、“starts asynchronously, keeps secrets out of the command, and supports deferred piped stdin/output”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/e2b/subprocess-e2b/tests/terminal.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/tests/terminal.spec.ts)

- 所属层：packages/e2b：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子进程、持久终端的具体场景，包括“E2B terminal allocation”、“hides bootstrap-shell bytes and preserves requested-shell bytes across the output boundary”、“inherits only safe ambient values and limits the allocation signal to setup”、“publishes the PTY handle before honoring allocation cancellation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“E2B terminal allocation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `commandError`、`FakeTerminalCommandHandle`、`FakeTerminalSandbox`、`runtime`、`spec`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/e2b/subprocess-e2b/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/README.md)、[packages/e2b/e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/index.ts)、[packages/e2b/subprocess-e2b/src/terminal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/e2b/subprocess-e2b/src/terminal.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/e2b/e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/index.ts`、`packages/e2b/subprocess-e2b/src/terminal.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 942 行；扫描到的声明包括 `commandError`、`FakeTerminalCommandHandle`、`FakeTerminalSandbox`、`runtime`、`spec`、`holdRequestUntilAbort`、`testSpawn`、`service`；扫描到的测试主题包括 “E2B terminal allocation”、“hides bootstrap-shell bytes and preserves requested-shell bytes across the output boundary”、“inherits only safe ambient values and limits the allocation signal to setup”、“publishes the PTY handle before honoring allocation cancellation”、“rejects malformed environment and argv values before PTY allocation”、“cleans malformed handles, bootstrap failures, and readiness failures”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
