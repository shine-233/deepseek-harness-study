# 源文件索引：packages/boot

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 13 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把启动相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared boot glue for the app bins (dsh, dsh-acp-demo): load the gitignored .env, install the fail-loud Loader guards, resolve the config path (snapshot-aware), load the optional user patch layers from the Harness home (~/.dsh), expose its path resolver to c...”；固定提交中扫描到的声明包括 `resolveConfigPath`、`loadEnv`、`loadLayeredEnv`、`UserPatchWatchOptions`、`watchUserPatches`；本地静态 import 图显示它直接依赖 9 个源文件，并被 27 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/profile.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/profile.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/util/home-paths/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/home-paths/src/index.ts)、[apps/cli/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/src/bin.ts)
- 对应测试：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[packages/boot/app-boot/tests/app-boot.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/app-boot.spec.ts)、[packages/boot/app-boot/tests/config-dump.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/config-dump.spec.ts)、[packages/boot/app-boot/tests/config-reload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/config-reload.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/boot/app-boot/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/src/bin.ts`、`apps/cli/src/dump-config.ts`、`apps/cli/src/plugin.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/cli/tests/windows-shell.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 829 行；扫描到的声明包括 `resolveConfigPath`、`loadEnv`、`loadLayeredEnv`、`UserPatchWatchOptions`、`watchUserPatches`、`loadOptionalPatches`、`loadOverlayPatches`、`ConfigDumpLayer`；源码顶部原注释（英文，仅作回查线索）：Shared boot glue for the app bins (dsh, dsh-acp-demo): load the gitignored .env, install the fail-loud Loader guards, resolve the config path (snapshot-aware), load the optional user patch layers from the Harness home (~/.dsh), expose its path resolver to c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/invariant.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查启动必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-app-boot. @module @deepseek-ai/dsh-app-boot/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-app-boot. @module @deepseek-ai/dsh-app-boot/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/src/profile.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/profile.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：Profile 配置解析
- 这个文件有什么用：这个文件解析或组合 Profile 清单、bundle 和 patch，让同一套能力可以按宿主选择不同启动配置。
- 为什么这样设计：Profile 只描述组合关系，具体插件实现留在 bundle 和包内；把 patch 层集中解析可以让宿主差异可见且可追踪。
- 文件级设计证据：源码顶部注释把它定位为“Profile discovery, initialization, and patch-layer composition for the dsh --profile launcher family. A profile is a directory under $DSH_HOME/profiles/<name> holding a package.json (out-of-tree plugin dependencies plus the profile manifest dsh.profile with...”；固定提交中扫描到的声明包括 `PROFILES_DIR`、`PROFILE_PATCH_FILENAME`、`DshBundleManifest`、`DshProfileManifest`、`DshManifestSection`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)、[packages/util/home-paths/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/home-paths/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/include/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/boot/app-boot/README.md`，再读本配置/脚本，沿着 `packages/boot/app-boot/src/index.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 420 行；扫描到的声明包括 `PROFILES_DIR`、`PROFILE_PATCH_FILENAME`、`DshBundleManifest`、`DshProfileManifest`、`DshManifestSection`、`ProfileManifest`、`ProfileLayer`、`Profile`；源码顶部原注释（英文，仅作回查线索）：Profile discovery, initialization, and patch-layer composition for the dsh --profile launcher family. A profile is a directory under $DSH_HOME/profiles/<name> holding a package.json (out-of-tree plugin dependencies plus the profile manifest dsh.profile with...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tests/app-boot.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/app-boot.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“resolveConfigPath”、“resolves relative to the given cwd outside replay mode”、“swaps a cordis.yml/.yaml basename for cordis.snapshot.yml in replay mode”、“leaves a non-cordis basename alone in replay mode and defaults cwd to the process cwd”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveConfigPath”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `clear`、`fakeProc`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 836 行；扫描到的声明包括 `clear`、`fakeProc`；扫描到的测试主题包括 “resolveConfigPath”、“resolves relative to the given cwd outside replay mode”、“swaps a cordis.yml/.yaml basename for cordis.snapshot.yml in replay mode”、“leaves a non-cordis basename alone in replay mode and defaults cwd to the process cwd”、“loadEnv”、“loads variables from .env in the given dir”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tests/config-dump.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/config-dump.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“renderConfigDump”、“composes overlay layers in order, prints !!js verbatim, and labels each section with it...”、“groups contiguous rows with the same origin and patches under one separator”、“composes all layers as one flattened patch list, exactly like boot()”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“renderConfigDump”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“renderConfigDump behavior: the offline composition must equal what boot() mounts (same parser, same patch algorithm), print !!js expressions verbatim, separate source-file runs with comment lines while staying one loadable YAML document, and report skipped ...”；固定提交中扫描到的声明包括 `writeBase`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/include/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`vendor/include/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 187 行；扫描到的声明包括 `writeBase`；扫描到的测试主题包括 “renderConfigDump”、“composes overlay layers in order, prints !!js verbatim, and labels each section with its source and patches”、“groups contiguous rows with the same origin and patches under one separator”、“composes all layers as one flattened patch list, exactly like boot()”、“reports a patch whose target row is absent through warn with its layer label and keeps composing”、“defaults its warn sink to one stderr line per skipped patch”；源码顶部原注释（英文，仅作回查线索）：renderConfigDump behavior: the offline composition must equal what boot() mounts (same parser, same patch algorithm), print !!js expressions verbatim, separate source-file runs with comment lines while staying one loadable YAML document, and report skipped ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tests/config-reload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/config-reload.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“include refresh with an invalid file”、“rejects while keeping the last good tree, then applies the next valid edit”、“loader entry replacement”、“imports a changed name before replacing the running plugin”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“include refresh with an invalid file”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Transactional config replacement through the booted Include and Loader tree. HMR contains rejected refreshes; direct callers receive the error after the previous generation has been retained or restored.”；固定提交中扫描到的声明包括 `bootTree`、`entryConfig`、`entryById`、`plugin`、`expectUpdateFailure`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/include/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`vendor/cordis/src/index.ts`、`vendor/include/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 431 行；扫描到的声明包括 `bootTree`、`entryConfig`、`entryById`、`plugin`、`expectUpdateFailure`；扫描到的测试主题包括 “include refresh with an invalid file”、“rejects while keeping the last good tree, then applies the next valid edit”、“loader entry replacement”、“imports a changed name before replacing the running plugin”、“retains the running plugin when the replacement cannot be imported”、“restores the previous plugin after replacement application fails”；源码顶部原注释（英文，仅作回查线索）：Transactional config replacement through the booted Include and Loader tree. HMR contains rejected refreshes; direct callers receive the error after the previous generation has been retained or restored.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tests/hmr-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/hmr-config.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“HMR exact config paths”、“observes module changes when its watch base is a filesystem alias”、“collapses filesystem aliases before registering an exact watch”、“observes add, change, and unlink outside its module roots”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“HMR exact config paths”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `bootHmr`、`eventually`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/hmr/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/loader/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `vendor/cordis/src/index.ts`、`vendor/hmr/src/index.ts`、`vendor/loader/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `bootHmr`、`eventually`；扫描到的测试主题包括 “HMR exact config paths”、“observes module changes when its watch base is a filesystem alias”、“collapses filesystem aliases before registering an exact watch”、“observes add, change, and unlink outside its module roots”、“observes creation when the config parent did not exist at registration”、“serializes refreshes and waits for them during disposal”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tests/profile.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/profile.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动、Profile的具体场景，包括“resolveProfileDir”、“joins the home and rejects traversal-shaped names”、“initProfile”、“creates manifest, user patch layer, and pnpm workspace once, never overwriting”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveProfileDir”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Profile machinery of dsh-app-boot: directory resolution and init, manifest round-trips, two-anchor bundle resolution, patch-layer loading, empty-root composition, and the installation module-fallback healing.”；固定提交中扫描到的声明包括 `stageInstallation`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 272 行；扫描到的声明包括 `stageInstallation`；扫描到的测试主题包括 “resolveProfileDir”、“joins the home and rejects traversal-shaped names”、“initProfile”、“creates manifest, user patch layer, and pnpm workspace once, never overwriting”、“manifest round-trip”、“writes and reads back, and fails loud on a broken manifest”；源码顶部原注释（英文，仅作回查线索）：Profile machinery of dsh-app-boot: directory resolution and init, manifest round-trips, two-anchor bundle resolution, patch-layer loading, empty-root composition, and the installation module-fallback healing.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tests/user-patches.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tests/user-patches.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“loadOptionalPatches”、“returns undefined when no user patch file exists”、“parses a patch list and preserves !!js expressions as loader expression nodes”、“fails loud on an unreadable file (a present user patch layer is never skipped)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“loadOptionalPatches”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“User patch-layer behavior of dsh-app-boot: the optional patch-list loader (a profile's cordis.patch.yml) and boot() applying the user layer over a real Loader tree, kept live through transactional HMR.”；固定提交中扫描到的声明包括 `eventually`、`writeTree`、`entryConfig`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/hmr/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`vendor/cordis/src/index.ts`、`vendor/hmr/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 422 行；扫描到的声明包括 `eventually`、`writeTree`、`entryConfig`；扫描到的测试主题包括 “loadOptionalPatches”、“returns undefined when no user patch file exists”、“parses a patch list and preserves !!js expressions as loader expression nodes”、“fails loud on an unreadable file (a present user patch layer is never skipped)”、“fails loud on unparsable YAML and on a !!js tag with no expression body”、“fails loud when the file is not a top-level array or an entry is not an object”；源码顶部原注释（英文，仅作回查线索）：User patch-layer behavior of dsh-app-boot: the optional patch-list loader (a profile's cordis.patch.yml) and boot() applying the user layer over a real Loader tree, kept live through transactional HMR.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/app-boot/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/tsdown.config.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理启动：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/app-boot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/boot/app-boot/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 19 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/src/index.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把启动相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“@deepseek-ai/dsh-cmdline — the command line a dsh launcher hands to the app it boots. The launcher parses only its own flags (--profile, --patch, the config dumps) and hands everything after them to the tree verbatim through the CmdlineArgs service, so an a...”；固定提交中扫描到的声明包括 `CmdlineArgs`、`AppExit`、`CmdlineHost`、`provideCmdline`、`internals`；本地静态 import 图显示它直接依赖 1 个源文件，并被 10 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/cmdline/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/src/profile-boot.ts)、[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)
- 对应测试：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[packages/boot/cmdline/tests/cmdline.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/tests/cmdline.spec.ts)、[packages/bundle/headless/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/headless/tests/startup.spec.ts)、[packages/bundle/web-app/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/web-app/tests/startup.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/boot/cmdline/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/src/profile-boot.ts`、`apps/cli/tests/built-bin.e2e.ts`、`apps/cli/tests/web-agent-presets.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/built-bin.e2e.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`packages/boot/cmdline/tests/cmdline.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 172 行；扫描到的声明包括 `CmdlineArgs`、`AppExit`、`CmdlineHost`、`provideCmdline`、`internals`、`parseCmdline`、`hasAction`、`configureExitAndOutput`；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-cmdline — the command line a dsh launcher hands to the app it boots. The launcher parses only its own flags (--profile, --patch, the config dumps) and hands everything after them to the tree verbatim through the CmdlineArgs service, so an a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/cmdline/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/src/invariant.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查启动必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-cmdline. @module @deepseek-ai/dsh-cmdline/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/cmdline/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-cmdline. @module @deepseek-ai/dsh-cmdline/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/boot/cmdline/tests/cmdline.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/tests/cmdline.spec.ts)

- 所属层：packages/boot：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“parseCmdline”、“lets a row read the flag value the app resolved”、“leaves a row on the value written beside the expression when no flag names one”、“recognizes the Loader object form of a provider-service injection”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseCmdline”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The launcher-to-app command line over a REAL Loader tree, mounted the way a profile boot mounts it: Loader holds each row until its injections are active, then resolves that row's config against its injection-ready context.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`demoCommand`、`bootFixture`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/boot/cmdline/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/cmdline/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/include/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/cmdline/src/index.ts`、`vendor/cordis/src/index.ts`、`vendor/include/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 232 行；扫描到的声明包括 `name`、`inject`、`apply`、`demoCommand`、`bootFixture`；扫描到的测试主题包括 “parseCmdline”、“lets a row read the flag value the app resolved”、“leaves a row on the value written beside the expression when no flag names one”、“recognizes the Loader object form of a provider-service injection”、“prints the app help, starts no reading row, and requests exit 0”、“rejects the invocation from the action without starting the app”；源码顶部原注释（英文，仅作回查线索）：The launcher-to-app command line over a REAL Loader tree, mounted the way a profile boot mounts it: Loader holds each row until its injections are active, then resolves that row's config against its injection-ready context.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
