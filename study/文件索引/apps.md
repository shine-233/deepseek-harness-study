# 源文件索引：apps

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 107 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [apps/cli/src/args.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/args.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：CLI 参数与 patch 解析
- 这个文件有什么用：它解析 Commander 参数、Profile 选择、patch overlay，并把未知剩余参数原样交给插件命令。
- 为什么这样设计：CLI 只拥有 profile、patch 和诊断参数，其余参数必须原样交给已启动的插件树；把这条所有权边界单独解析，才能避免 CLI 抢走插件自己的选项。
- 文件级设计证据：源码顶部注释把它定位为“Commander adapter for the dsh command line. The launcher parses only what it owns — which profile to boot, which extra patch overlays to apply, and the config dumps — and hands **everything after its own flags** to the booted tree verbatim, where injected a...”；固定提交中扫描到的声明包括 `DshInvocation`、`parseDshArgs`、`resolveBoot`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/bin.ts)、[apps/cli/tests/args.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/args.spec.ts)
- 对应测试：[apps/cli/tests/args.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/args.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `apps/cli/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `apps/cli/src/bin.ts`、`apps/cli/tests/args.spec.ts` 确认输入输出，最后对照 `apps/cli/tests/args.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 191 行；扫描到的声明包括 `DshInvocation`、`parseDshArgs`、`resolveBoot`；源码顶部原注释（英文，仅作回查线索）：Commander adapter for the dsh command line. The launcher parses only what it owns — which profile to boot, which extra patch overlays to apply, and the config dumps — and hands **everything after its own flags** to the booted tree verbatim, where injected a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/bin.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：程序入口
- 这个文件有什么用：它接收启动参数并把程序交给 `apps/cli` 中的应用入口；入口保持薄，可以让同一套业务逻辑被不同宿主复用。
- 为什么这样设计：应用层负责把用户输入、运行环境和底层包接起来；它不应该重新实现核心能力，所以部署方式可以变化而核心逻辑不必复制。
- 文件级设计证据：源码顶部注释把它定位为“dsh — command-line entry. Dynamic imports per mode keep unrelated modes out of each dispatch path; the adapter prints and exits for --help/--version/a parse error, so only a valid mode reaches the switch. @module @deepseek-ai/dsh/bin”；固定提交中扫描到的声明包括 `readVersion`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/args.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/args.ts)、[apps/cli/src/dump-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/dump-config.ts)、[apps/cli/src/plugin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/plugin.ts)
- 对应测试：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `apps/cli/README.md` 和组合清单，再读当前入口，沿着它交给的应用或所在包的入口或服务继续，最后对照启动、配置和 E2E 测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `readVersion`；源码顶部原注释（英文，仅作回查线索）：dsh — command-line entry. Dynamic imports per mode keep unrelated modes out of each dispatch path; the adapter prints and exits for --help/--version/a parse error, so only a valid mode reaches the switch. @module @deepseek-ai/dsh/bin。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/src/dump-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/dump-config.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：配置组合与诊断命令
- 这个文件有什么用：它组合 Profile、overlay 和补丁层，并把最终配置或诊断信息输出给 CLI；把“配置如何合成”集中在 dump 命令里，用户才能看见实际生效的结果而不是某一份原始 YAML。
- 为什么这样设计：配置诊断需要解析 patch 层却不能启动应用或执行 `!!js`；单独的 dump 路径让用户看到安全、可复现的最终配置，也避免诊断命令产生运行时副作用。
- 文件级设计证据：源码顶部注释把它定位为“Config-dump entry for dsh --profile <name> --dump-config: compose the profile's patch layers through the include plugin's patch algorithm without booting or evaluating !!js, with one source layer per bundle, the profile's own patch file, and each --patch ov...”；固定提交中扫描到的声明包括 `runDumpConfig`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[apps/cli/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/bin.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `apps/cli/README.md` 和入口，再读当前实现，沿着 `apps/cli/src/profile-boot.ts`、`packages/boot/app-boot/src/index.ts` 和 `apps/cli/src/bin.ts` 确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `runDumpConfig`；源码顶部原注释（英文，仅作回查线索）：Config-dump entry for dsh --profile <name> --dump-config: compose the profile's patch layers through the include plugin's patch algorithm without booting or evaluating !!js, with one source layer per bundle, the profile's own patch file, and each --patch ov...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/src/plugin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/plugin.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：Profile 插件依赖管理
- 这个文件有什么用：它转发插件管理命令，并根据已安装依赖重新整理 Profile 的 bundle 层；插件命令因此只负责依赖和组合关系，不把插件业务逻辑塞进 CLI 主启动流程。
- 为什么这样设计：插件安装是外部包管理状态与 Profile bundle 列表之间的同步问题；把转发和 reconcile 集中在这里，启动流程只读取已经整理好的组合，不必重新猜测安装状态。
- 文件级设计证据：源码顶部注释把它定位为“dsh plugin --profile <name> <args...> — profile plugin management as a thin pnpm forwarder: initialize the profile on first use, run pnpm <args...> in the profile directory, then reconcile the dsh.profile.bundles layer list against the installed state (a de...”；固定提交中扫描到的声明包括 `runPlugin`、`exportsPatch`、`reconcilePlugins`、`anchorPathSpec`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[apps/cli/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/bin.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `apps/cli/README.md` 和入口，再读当前实现，沿着 `apps/cli/src/profile-boot.ts`、`packages/boot/app-boot/src/index.ts` 和 `apps/cli/src/bin.ts` 确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 158 行；扫描到的声明包括 `runPlugin`、`exportsPatch`、`reconcilePlugins`、`anchorPathSpec`；源码顶部原注释（英文，仅作回查线索）：dsh plugin --profile <name> <args...> — profile plugin management as a thin pnpm forwarder: initialize the profile on first use, run pnpm <args...> in the profile directory, then reconcile the dsh.profile.bundles layer list against the installed state (a de...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/src/process-shutdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/process-shutdown.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：CLI 优雅退出协调器
- 这个文件有什么用：它协调 graceful dispose、超时强退、重复信号升级和测试替身，保证 CLI 退出时插件资源有机会清理。
- 为什么这样设计：CLI 进程可能持有连接、监听器和子进程，退出不能只调用一次无界的 dispose；把信号升级、有限等待和强退顺序集中起来，既给插件清理机会，也避免进程永远挂住。
- 文件级设计证据：源码顶部注释把它定位为“Bounded, escalating process shutdown for the long-lived CLI surfaces.”；固定提交中扫描到的声明包括 `PROCESS_SHUTDOWN_TIMEOUT_MS`、`ProcessShutdown`、`createProcessShutdown`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)、[apps/cli/tests/process-shutdown.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/process-shutdown.spec.ts)
- 对应测试：[apps/cli/tests/process-shutdown.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/process-shutdown.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `apps/cli/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `apps/cli/src/profile-boot.ts`、`apps/cli/tests/process-shutdown.spec.ts` 确认输入输出，最后对照 `apps/cli/tests/process-shutdown.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `PROCESS_SHUTDOWN_TIMEOUT_MS`、`ProcessShutdown`、`createProcessShutdown`；源码顶部原注释（英文，仅作回查线索）：Bounded, escalating process shutdown for the long-lived CLI surfaces.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：CLI Profile 启动编排
- 这个文件有什么用：它按顺序装配 Profile、bundle patch、用户 patch 和 telemetry patch，并把失败和关闭交给 CLI 的生命周期边界。
- 为什么这样设计：Profile 的 bundle、profile patch、命令行 patch 和 telemetry patch 有明确覆盖顺序；集中编排并绑定关闭流程，才能让不同 CLI 模式得到相同的配置语义和资源生命周期。
- 文件级设计证据：源码顶部注释把它定位为“Shared profile boot for every dsh surface: resolve the profile, stack its patch layers (bundle layers in dsh.profile.bundles order, the profile's own cordis.patch.yml, --patch overlays, the telemetry switch), mount the tree over the profile's empty root con...”；固定提交中扫描到的声明包括 `homePatchPath`、`INSTALL_ANCHOR`、`PROFILE_ROOT_FILENAME`、`resolveTelemetryPatch`、`prepareProfile`；本地静态 import 图显示它直接依赖 8 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/process-shutdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/process-shutdown.ts)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[apps/cli/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/bin.ts)
- 对应测试：[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `apps/cli/README.md` 和入口，再读当前实现，沿着 `apps/cli/src/process-shutdown.ts`、`packages/boot/app-boot/src/index.ts`、`packages/boot/cmdline/src/index.ts` 和 `apps/cli/src/bin.ts`、`apps/cli/src/dump-config.ts`、`apps/cli/src/plugin.ts` 确认输入输出，最后对照 `apps/cli/tests/telemetry-switch.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 300 行；扫描到的声明包括 `homePatchPath`、`INSTALL_ANCHOR`、`PROFILE_ROOT_FILENAME`、`resolveTelemetryPatch`、`prepareProfile`、`RunProfileOptions`、`runProfile`、`allPatches`；源码顶部原注释（英文，仅作回查线索）：Shared profile boot for every dsh surface: resolve the profile, stack its patch layers (bundle layers in dsh.profile.bundles order, the profile's own cordis.patch.yml, --patch overlays, the telemetry switch), mount the tree over the profile's empty root con...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/args.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/args.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/args.spec.ts` 的具体场景，包括“parseDshArgs”、“routes profile boots and the web alias, handing the rest to the app”、“ends the launcher flags at the first token it does not own”、“routes the plugin pnpm forwarder”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseDshArgs”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `exitCode`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/args.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/args.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `apps/cli/src/args.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的声明包括 `exitCode`；扫描到的测试主题包括 “parseDshArgs”、“routes profile boots and the web alias, handing the rest to the app”、“ends the launcher flags at the first token it does not own”、“routes the plugin pnpm forwarder”、“routes profile and web config dumps”、“rejects missing profile, removed flags, and contradictory inputs”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/built-bin.e2e.ts` 的具体场景，包括“requires --profile and rejects removed commands”、“routes help and usage errors without activating startup-dependent rows”、“runs the headless profile through its app-owned task positional”、“does not load a project environment for --version”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“requires --profile and rejects removed commands”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `runBuiltBin`、`waitForFile`、`createProfileLifecycleFixture`、`startProfileLifecycle`、`requestProfileShutdown`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[packages/test-support/llm-mock-server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/llm-mock-server/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/cmdline/src/index.ts`、`packages/test-support/llm-mock-server/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 763 行；扫描到的声明包括 `runBuiltBin`、`waitForFile`、`createProfileLifecycleFixture`、`startProfileLifecycle`、`requestProfileShutdown`、`createEnvironmentProbeProfile`、`createStartupFixture`、`startStartupProfile`；扫描到的测试主题包括 “requires --profile and rejects removed commands”、“routes help and usage errors without activating startup-dependent rows”、“runs the headless profile through its app-owned task positional”、“does not load a project environment for --version”、“fails loud on a nonexistent profile with the plugin-command hint”、“uses the launching endpoint and managed credential through the published entry”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/dsh-badge.snapshot.ts` 的具体场景，包括“dsh badge assembled snapshot”、“advertises and loads the opt-in bundled skill through the shipped app”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh badge assembled snapshot”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的测试主题包括 “dsh badge assembled snapshot”、“advertises and loads the opt-in bundled skill through the shipped app”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/fixtures/dsh-badge/snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/fixtures/dsh-badge/snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试夹具
- 这个文件有什么用：它为 `apps/cli` 包里的 `tests/fixtures/dsh-badge/snapshot.ts` 的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 56 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/fixtures/never-dispose.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/fixtures/never-dispose.mjs)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试夹具
- 这个文件有什么用：它为 `apps/cli` 包里的 `tests/fixtures/never-dispose.mjs` 的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test-only Cordis plugin whose disposer announces entry and never settles.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 19 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Test-only Cordis plugin whose disposer announces entry and never settles.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/headless-shutdown.e2e.ts` 的具体场景，包括“lets a second Ctrl+C force exit while the first signal is draining”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“lets a second Ctrl+C force exit while the first signal is draining”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `runHeadlessPtySmoke`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 131 行；扫描到的声明包括 `runHeadlessPtySmoke`；扫描到的测试主题包括 “lets a second Ctrl+C force exit while the first signal is draining”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/lazy-search-startup.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/lazy-search-startup.compat.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查启动的具体场景，包括“boots and disposes the shipped composition with full-text search off by default”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“boots and disposes the shipped composition with full-text search off by default”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Node 22 startup-output smoke for the shipped Web CLI composition. Only the dedicated Node compatibility gate opts this test in after building both artifacts; ordinary Vitest inventory deterministically skips it. The child runs built artifacts under plain No...”；固定提交中扫描到的声明包括 `runBuiltWeb`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 127 行；扫描到的声明包括 `runBuiltWeb`；扫描到的测试主题包括 “boots and disposes the shipped composition with full-text search off by default”；源码顶部原注释（英文，仅作回查线索）：Node 22 startup-output smoke for the shipped Web CLI composition. Only the dedicated Node compatibility gate opts this test in after building both artifacts; ordinary Vitest inventory deterministically skips it. The child runs built artifacts under plain No...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 MCP 连接的具体场景，包括“third-party memory MCP example overlays”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“third-party memory MCP example overlays”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The third-party memory examples stay config-only. This suite parses every checked-in overlay, verifies its package pin, transport, and secret handling, then replaces only the upstream endpoint with the package-owned keyless MCP fixture and proves the real C...”；固定提交中扫描到的声明包括 `insertedRow`、`waitForTool`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `insertedRow`、`waitForTool`；扫描到的测试主题包括 “third-party memory MCP example overlays”；源码顶部原注释（英文，仅作回查线索）：The third-party memory examples stay config-only. This suite parses every checked-in overlay, verifies its package pin, transport, and secret handling, then replaces only the upstream endpoint with the package-owned keyless MCP fixture and proves the real C...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/process-shutdown.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/process-shutdown.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/process-shutdown.spec.ts` 的具体场景，包括“process shutdown”、“completes naturally after disposal resolves and forces exit when it rejects”、“uses process.exitCode for default normal completion”、“forces exit when graceful disposal reaches its bound”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“process shutdown”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `deferred`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/process-shutdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/process-shutdown.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `apps/cli/src/process-shutdown.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 179 行；扫描到的声明包括 `deferred`；扫描到的测试主题包括 “process shutdown”、“completes naturally after disposal resolves and forces exit when it rejects”、“uses process.exitCode for default normal completion”、“forces exit when graceful disposal reaches its bound”、“honors a caller-supplied grace period”、“lets Ctrl+C force a normal shutdown already stuck in disposal”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/source-launch.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/source-launch.compat.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/source-launch.compat.spec.ts` 的具体场景，包括“dsh SOURCE launcher (node --import tsx/esm)”、“launches the source CLI without building”、“boots the source entry and requires a profile”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh SOURCE launcher (node --import tsx/esm)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的测试主题包括 “dsh SOURCE launcher (node --import tsx/esm)”、“launches the source CLI without building”、“boots the source entry and requires a profile”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `apps/cli` 包里的 `tests/telemetry-switch.spec.ts` 的具体场景，包括“resolveTelemetryPatch”、“preserves the configured telemetry mode when the hard-disable switch is unset or empty”、“disables on ANY non-empty value, including falsy-looking ones”、“is trivially satisfied by a composition without the telemetry row”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveTelemetryPatch”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `apps/cli/src/profile-boot.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的测试主题包括 “resolveTelemetryPatch”、“preserves the configured telemetry mode when the hard-disable switch is unset or empty”、“disables on ANY non-empty value, including falsy-looking ones”、“is trivially satisfied by a composition without the telemetry row”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、智能体的具体场景，包括“the shipped Web composition”、“leaves the global tool layer empty”、“keeps the token meter and its context-meter projections on the host plane”、“supplies both shipped presets, and only those, from the system root”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the shipped Web composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `bootWeb`、`enablePresetTool`；本地静态 import 图显示它直接依赖 15 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[packages/compaction/compaction-basic/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/compaction/compaction-basic/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`packages/boot/cmdline/src/index.ts`、`packages/compaction/compaction-basic/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 829 行；扫描到的声明包括 `bootWeb`、`enablePresetTool`；扫描到的测试主题包括 “the shipped Web composition”、“leaves the global tool layer empty”、“keeps the token meter and its context-meter projections on the host plane”、“supplies both shipped presets, and only those, from the system root”、“composes the full agent from”、“composes the exact RL prompt and two tools from”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Shell 命令的具体场景，包括“the shipped shell composition (real bundle layers)”、“composes the confined pwsh roster on win32 and the bash roster on POSIX from the same rows”、“base-only profiles carry both stacks with the same platform gating”、“shipped agent presets gate both shell tools by platform”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the shipped shell composition (real bundle layers)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The shipped shell composition: the base bundle gates both shell stacks by platform on its own rows (disabled: !!js process.platform), so exactly one shell stack mounts per host and no separate platform layer exists — the launcher applies nothing beyond the ...”；固定提交中扫描到的声明包括 `disabledOn`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/app-boot/src/index.ts`、`vendor/include/src/index.ts`、`vendor/loader/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `disabledOn`；扫描到的测试主题包括 “the shipped shell composition (real bundle layers)”、“composes the confined pwsh roster on win32 and the bash roster on POSIX from the same rows”、“base-only profiles carry both stacks with the same platform gating”、“shipped agent presets gate both shell tools by platform”、“minimal mounts no shell tool row at all (its shell is the PTY stack)”；源码顶部原注释（英文，仅作回查线索）：The shipped shell composition: the base bundle gates both shell stacks by platform on its own rows (disabled: !!js process.platform), so exactly one shell stack mounts per host and no separate platform layer exists — the launcher applies nothing beyond the ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/cli/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tsdown.config.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：CLI 构建配置
- 这个文件有什么用：它定义 CLI 的 Node/ESM 构建边界，入口指向 `lib/types/bin.js`，并关闭不需要的 declaration 输出；构建产物因此从真正的命令入口开始，而不是把开发源文件路径暴露给用户。
- 为什么这样设计：CLI 的开发入口、Node/ESM 产物和用户实际执行的文件必须是同一个构建契约；单独声明入口与产物边界，发布时就不会把源码路径或无关 declaration 暴露给终端用户。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/cli/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `apps/cli/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和所在包的入口或服务确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 18 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/index.html](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/index.html)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：HTML 页面壳
- 这个文件有什么用：它是浏览器页面壳：提供 `#root`、manifest、favicon 和 `/src/main.ts` 的入口；真正的 Web 应用由 TypeScript 启动，HTML 只承担浏览器必须先拥有的静态容器。
- 为什么这样设计：浏览器在加载 JavaScript 之前只认识静态页面契约；把 `#root`、manifest、favicon 和启动模块留在 HTML，Web 应用可以替换 TypeScript 组合而不改变浏览器宿主的最低要求。
- 文件级设计证据：固定提交中扫描到的结构线索是：HTML 结构包含 id #root；脚本 /src/main.ts；链接资源 /manifest.webmanifest、/favicon.svg；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和组合清单，再读当前入口，沿着它交给的应用或所在包的入口或服务继续，最后对照启动、配置和 E2E 测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 14 行；HTML 结构包含 id #root；脚本 /src/main.ts；链接资源 /manifest.webmanifest、/favicon.svg。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/src/main.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/src/main.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：Web 启动入口
- 这个文件有什么用：它完成 Web 启动的三步：找到 `#root`，缺失时报告页面契约错误，再创建并运行 AppWebEntry；启动入口保持短小，具体组合放在应用对象和 Profile 层。
- 为什么这样设计：页面根节点检查和 AppWebEntry 创建是 Web 启动的唯一宿主责任；入口保持薄并尽早报告缺失的 `#root`，可以把 HTML 错误与应用组合错误区分开。
- 文件级设计证据：源码顶部注释把它定位为“Web application entry: thin bootstrap over the shell library. Everything — loader holding, module-table seeding, AppRoot gate, plugin assembly — lives in @deepseek-ai/dsh-client-web; this file only finds the mount point.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/client/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/web/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和组合清单，再读当前入口，沿着它交给的应用或所在包的入口或服务继续，最后对照启动、配置和 E2E 测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Web application entry: thin bootstrap over the shell library. Everything — loader holding, module-table seeding, AppRoot gate, plugin assembly — lives in @deepseek-ai/dsh-client-web; this file only finds the mount point.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/src/node-module-stub.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/src/node-module-stub.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：浏览器兼容桩
- 这个文件有什么用：它给浏览器构建提供故意失败的 `node:module` 桩；浏览器代码一旦误走到只能在 Node 中工作的动态模块路径，会尽早得到明确错误，而不是出现难诊断的空对象。
- 为什么这样设计：浏览器构建不能真正提供 Node 的动态模块能力，因此用显式失败桩取代假实现；这样错误会在错误路径第一次被执行时暴露，而不是以静默缺功能的方式传播到界面。
- 文件级设计证据：源码顶部注释把它定位为“Browser stand-in for node:module. createRequire is unreachable in the configured loader path and fails loud if that assumption changes.”；固定提交中扫描到的声明包括 `createRequire`、`LoadHookContext`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和所在包的入口或服务确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的声明包括 `createRequire`、`LoadHookContext`；源码顶部原注释（英文，仅作回查线索）：Browser stand-in for node:module. createRequire is unreachable in the configured loader path and fails loud if that assumption changes.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/stress-tests/reasoning-chunks.stress.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：浏览器压力测试
- 这个文件有什么用：它用 100,000 个 reasoning chunk 压测浏览器事件处理和交互延迟，验证大量增量内容不会让界面更新退化成不可用的长任务。
- 为什么这样设计：增量 reasoning 的性能风险来自事件数量和主线程调度，不应与普通功能测试混在一起；独立压力场景可以固定输入规模、测量延迟，并避免把性能假设藏在业务断言里。
- 文件级设计证据：源码顶部注释把它定位为“Opt-in browser stress reproduction for reasoning-stream renderer stalls. The fixture emits 100,000 individual chunks through the normal async carrier; the test measures event-loop and scheduled-interaction delay while the assembled React surface keeps a col...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 153 行；扫描到的测试主题包括 “keeps the browser responsive while rendering 100,000 reasoning chunks”；源码顶部原注释（英文，仅作回查线索）：Opt-in browser stress reproduction for reasoning-stream renderer stalls. The fixture emits 100,000 individual chunks through the normal async carrier; the test measures event-loop and scheduled-interaction delay while the assembled React surface keeps a col...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: Full access confirmation”、“requires acknowledgement before the composer picker can enable Full access”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Full access confirmation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: every visible permission picker gates Full access behind the same locale-aware, in-page risk confirmation. Zero model calls: the scenario boots the shipped Web composition and exercises the real permission projection, client command path, ...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的测试主题包括 “web e2e: Full access confirmation”、“requires acknowledgement before the composer picker can enable Full access”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: every visible permission picker gates Full access behind the same locale-aware, in-page risk confirmation. Zero model calls: the scenario boots the shipped Web composition and exercises the real permission projection, client command path, ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、智能体的具体场景，包括“web e2e: agent-preset authoring is a host-side copy”、“offers the roster with copy as the only way to create”、“views a shipped composition read-only instead of editing it”、“copies 极简模式 whole under a new id and lands in its files”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: agent-preset authoring is a host-side copy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the agent-preset settings section as copy-only authoring. The browser never edits composition text — a shipped preset opens in a read-only viewer, the copy dialog collects an id and an optional display name, and the host copies the whole d...”；固定提交中扫描到的声明包括 `settingsDialog`、`withPresetRoot`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 280 行；扫描到的声明包括 `settingsDialog`、`withPresetRoot`；扫描到的测试主题包括 “web e2e: agent-preset authoring is a host-side copy”、“offers the roster with copy as the only way to create”、“views a shipped composition read-only instead of editing it”、“copies 极简模式 whole under a new id and lands in its files”、“deletes the copy after confirmation and reclaims the roster”、“marks damaged presets broken and clears a ghost through delete”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the agent-preset settings section as copy-only authoring. The browser never edits composition text — a shipped preset opens in a read-only viewer, the copy dialog collects an id and an optional display name, and the host copies the whole d...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、智能体的具体场景，包括“web e2e: agent-preset selection”、“offers the chip on the new-session screen, beside the workspace picker”、“names every preset and what it is for”、“applies the staged pick to the blank session, and the host honors it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: agent-preset selection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: agent-preset selection. The roster's roots is an assembly fact the CLI entry resolves and patches in, so every other lane boots with an empty roster and no preset surface at all; this is the one lane that mounts the SHIPPED presets and put...”；固定提交中扫描到的声明包括 `seedWorkspaceSkill`、`seedLog`、`seedSubagent`、`livePreset`、`menuOptions`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 296 行；扫描到的声明包括 `seedWorkspaceSkill`、`seedLog`、`seedSubagent`、`livePreset`、`menuOptions`；扫描到的测试主题包括 “web e2e: agent-preset selection”、“offers the chip on the new-session screen, beside the workspace picker”、“names every preset and what it is for”、“applies the staged pick to the blank session, and the host honors it”、“re-reads the slash catalog through the composition the switch installed”、“labels a resumed session with the preset it was created under”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: agent-preset selection. The roster's roots is an assembly fact the CLI entry resolves and patches in, so every other lane boots with an empty roster and no preset surface at all; this is the one lane that mounts the SHIPPED presets and put...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/approval-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/approval-composer.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: approval takeover keeps its actions reachable”、“caps the long command, answers through the panel, and runs the escalated command”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: approval takeover keeps its actions reachable”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the composer-takeover approval panel under a long command. The shipped composition confines bash through the sandbox policy and routes its escalation through the approval seam, so a read-only session asked to write a file produces a REAL p...”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/interaction/user-approval/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 182 行；扫描到的测试主题包括 “web e2e: approval takeover keeps its actions reachable”、“caps the long command, answers through the panel, and runs the escalated command”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the composer-takeover approval panel under a long command. The shipped composition confines bash through the sandbox policy and routes its escalation through the approval seam, so a read-only session asked to write a file produces a REAL p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试启动脚手架
- 这个文件有什么用：它是 Web 测试共用的 jsdom 启动脚手架，负责装配插件、模拟浏览器环境和清理状态；测试场景只描述行为，不必重复启动整棵插件树。
- 为什么这样设计：Web 测试需要真实的插件组合和可控的浏览器环境；共享启动脚手架把装配和清理固定下来，场景测试才能只改变一个行为变量并避免各自启动出不同的应用。
- 文件级设计证据：源码顶部注释把它定位为“Shared scaffolding for the assembled-jsdom snapshots: the real built workspace lib/client.js artifacts booted through AppWebEntry's ModuleLoader path (loadBundle) against the keyless FixtureApiClient transport. Every file that mounts this graph needs the sa...”；固定提交中扫描到的声明包括 `installAssembledBootEnv`、`mountAssembledApp`、`hasClass`、`REFRESHING_GOLDEN`、`ResizeObserverStub`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/modules/src/client/index.ts)、[packages/client/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/web/src/index.ts)、[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/image-display.snapshot.ts)
- 对应测试：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/search-card.snapshot.ts)、[apps/web/tests/todo-row.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/todo-row.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先读 `apps/web/tests/README.md` 和入口，再读当前实现，沿着 `packages/client/modules/src/client/index.ts`、`packages/client/web/src/index.ts` 和 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/image-display.snapshot.ts`、`apps/web/tests/max-tokens-notice.snapshot.ts` 确认输入输出，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/image-display.snapshot.ts`、`apps/web/tests/max-tokens-notice.snapshot.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 153 行；扫描到的声明包括 `installAssembledBootEnv`、`mountAssembledApp`、`hasClass`、`REFRESHING_GOLDEN`、`ResizeObserverStub`；源码顶部原注释（英文，仅作回查线索）：Shared scaffolding for the assembled-jsdom snapshots: the real built workspace lib/client.js artifacts booted through AppWebEntry's ModuleLoader path (loadBundle) against the keyless FixtureApiClient transport. Every file that mounts this graph needs the sa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/background-job-list.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“shows a running background job in the session header without a refresh”、“flips the open list to the cancelled outcome when the registry settles it”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“shows a running background job in the session header without a refresh”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the session-header background-job list over the real host. No model call is involved — a genuine run_in_background bash call registers with ctx.jobs, and the assertion chain is the whole delivery path: registry change feed → api-proxy sess...”；固定提交中扫描到的声明包括 `liveAgent`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/jobs/jobs/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `liveAgent`；扫描到的测试主题包括 “shows a running background job in the session header without a refresh”、“flips the open list to the cancelled outcome when the registry settles it”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the session-header background-job list over the real host. No model call is involved — a genuine run_in_background bash call registers with ctx.jobs, and the assertion chain is the whole delivery path: registry change feed → api-proxy sess...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/bash-abort-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/bash-abort-row.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“expands the aborted row to its command and full error”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“expands the aborted row to its command and full error”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: a cancelled Bash call can settle without terminal-card material. Borrow the real cancellation fixture and prove the keyed Bash row still exposes the recorded command and full error without any model call.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的测试主题包括 “expands the aborted row to its command and full error”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: a cancelled Bash call can settle without terminal-card material. Borrow the real cancellation fixture and prove the keyed Bash row still exposes the recorded command and full error without any model call.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/built-boot.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、启动的具体场景，包括“boots the built plugin graph and renders a fixture session end to end”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“boots the built plugin graph and renders a fixture session end to end”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The built-bundle boot smoke: the assembled-jsdom test that owns the boot graph itself. Other files share the same scaffolding (assembled-boot.ts) to reach a surface only the built bundles expose; this one asserts that the graph ass...”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/assembled-boot.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的测试主题包括 “boots the built plugin graph and renders a fixture session end to end”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The built-bundle boot smoke: the assembled-jsdom test that owns the boot graph itself. Other files share the same scaffolding (assembled-boot.ts) to reach a surface only the built bundles expose; this one asserts that the graph ass...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-continuous-conversation.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、对话的具体场景，包括“web e2e: continuous conversation grown through the composer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: continuous conversation grown through the composer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e contract for a conversation grown through the real composer rather than pre-seeded history. Twelve deterministic replay turns exercise repeated send/settle/render cycles, including two real bash executions and one long, multi-chunk final turn. Asser...”；固定提交中扫描到的声明包括 `suffix`、`longFinalPrompt`、`turnSpec`、`textStream`、`toolStream`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 341 行；扫描到的声明包括 `suffix`、`longFinalPrompt`、`turnSpec`、`textStream`、`toolStream`、`replayScript`、`userText`、`assistantText`；扫描到的测试主题包括 “web e2e: continuous conversation grown through the composer”；源码顶部原注释（英文，仅作回查线索）：Web e2e contract for a conversation grown through the real composer rather than pre-seeded history. Twelve deterministic replay turns exercise repeated send/settle/render cycles, including two real bash executions and one long, multi-chunk final turn. Asser...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-long-interactions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: long Chat interaction contract”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: long Chat interaction contract”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Long-history Chat behavior contract that stays valid under a virtualized renderer: wheel input only navigates to the semantic target; assertions pin content identity and interaction routing rather than scroll geometry or mounted row counts.”；固定提交中扫描到的声明包括 `continuationChunks`、`replayEntry`、`carries`、`textContent`、`nextPaint`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 295 行；扫描到的声明包括 `continuationChunks`、`replayEntry`、`carries`、`textContent`、`nextPaint`、`openSeed`、`wheelUntilMounted`、`requiredEvent`；扫描到的测试主题包括 “web e2e: long Chat interaction contract”；源码顶部原注释（英文，仅作回查线索）：Long-history Chat behavior contract that stays valid under a virtualized renderer: wheel input only navigates to the semantic target; assertions pin content identity and interaction routing rather than scroll geometry or mounted row counts.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-contract.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: long Chat scroll contract”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: long Chat scroll contract”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Browser geometry contracts for a long Chat transcript. These scenarios are deliberately virtualizer-neutral: they assert semantic-row position, bottom ownership, interaction state, and the real outer scroll host rather than DOM cardinality or implementation...”；固定提交中扫描到的声明包括 `textStream`、`toolStream`、`replayEntry`、`launchScrollWorld`、`closeScrollWorld`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 843 行；扫描到的声明包括 `textStream`、`toolStream`、`replayEntry`、`launchScrollWorld`、`closeScrollWorld`、`withScrollWorld`、`nextPaint`、`scrollGeometry`；扫描到的测试主题包括 “web e2e: long Chat scroll contract”；源码顶部原注释（英文，仅作回查线索）：Browser geometry contracts for a long Chat transcript. These scenarios are deliberately virtualizer-neutral: they assert semantic-row position, bottom ownership, interaction state, and the real outer scroll host rather than DOM cardinality or implementation...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：会话日志测试夹具
- 这个文件有什么用：它通过 Session 生成可重复的长会话 JSONL，供滚动、历史分页和虚拟列表测试使用；固定日志让性能和布局回归不会依赖真实用户数据。
- 为什么这样设计：滚动和虚拟列表回归依赖事件顺序、消息长度和分页边界；用 Session 生成固定 JSONL，比复制一堆 UI 假对象更接近真实读取侧，同时仍然不依赖用户数据。
- 文件级设计证据：源码顶部注释把它定位为“Synthetic long-chat history for browser behavior contracts. The fixture is generated through Session so pagination exercises the same event shapes as persisted conversations, while unique markers identify semantic rows without depending on CSS-module names ...”；固定提交中扫描到的声明包括 `ChatScrollFixtureOptions`、`ChatScrollFixture`、`createChatScrollFixture`、`text`、`suffix`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-title/src/index.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-long-interactions.e2e.ts)
- 对应测试：[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-contract.e2e.ts)、[apps/web/tests/composer-tab-geometry.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/composer-tab-geometry.e2e.ts)、[apps/web/tests/trajectory-virtualization.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/trajectory-virtualization.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts` 和 `apps/web/tests/chat-long-interactions.e2e.ts`、`apps/web/tests/chat-scroll-contract.e2e.ts`、`apps/web/tests/composer-tab-geometry.e2e.ts` 理解状态变化，最后对照 `apps/web/tests/chat-long-interactions.e2e.ts`、`apps/web/tests/chat-scroll-contract.e2e.ts`、`apps/web/tests/composer-tab-geometry.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 234 行；扫描到的声明包括 `ChatScrollFixtureOptions`、`ChatScrollFixture`、`createChatScrollFixture`、`text`、`suffix`、`markerHelpers`、`appendRequestHeader`、`appendAssistant`；源码顶部原注释（英文，仅作回查线索）：Synthetic long-chat history for browser behavior contracts. The fixture is generated through Session so pagination exercises the same event shapes as persisted conversations, while unique markers identify semantic rows without depending on CSS-module names ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/code-mode-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/code-mode-round.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: Code Mode round renders nested sub-calls”、“drives the recorded prompt to a settled turn (all modes)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Code Mode round renders nested sub-calls”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: a Code Mode round trip. The scaffold boots the SAME shipped tree with the tools row patched to mode: code (the run_code-only wire), a real chromium sends a prompt engineered to elicit one run_code program with several sub-calls, and the UI...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 141 行；扫描到的测试主题包括 “web e2e: Code Mode round renders nested sub-calls”、“drives the recorded prompt to a settled turn (all modes)”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: a Code Mode round trip. The scaffold boots the SAME shipped tree with the tools row patched to mode: code (the run_code-only wire), a real chromium sends a prompt engineered to elicit one run_code program with several sub-calls, and the UI...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/cold-blank-session.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/cold-blank-session.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、会话的具体场景，包括“web e2e: cold blank Session visibility”、“keeps the verified cold blank Session out of the sidebar”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: cold blank Session visibility”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Cold Session list visibility through the shipped compressed JSONL backend.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的测试主题包括 “web e2e: cold blank Session visibility”、“keeps the verified cold blank Session out of the sidebar”；源码顶部原注释（英文，仅作回查线索）：Cold Session list visibility through the shipped compressed JSONL backend.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/complex-history.perf.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：浏览器性能基准
- 这个文件有什么用：它是一个需要显式运行的浏览器性能基准，构造高基数 workspace、history 和 trajectory 场景并报告测量结果；它没有严格的耗时断言，因此不能被当成性能门禁。
- 为什么这样设计：浏览器速度会受到机器和宿主影响，不能把一次耗时读数当成跨机器的正确性断言；把高基数数据构造、结构性断言和观测报告放在 opt-in 基准中，既能发现退化，也不会把环境噪声误报成产品失败。
- 文件级设计证据：源码顶部注释把它定位为“Opt-in browser benchmark for high-cardinality workspace and history rendering. It reports measurements without timing assertions because host speed is not a correctness contract; structural assertions keep the number of workspaces and history entries from s...”；固定提交中扫描到的声明包括 `text`、`appendTitle`、`appendRequestHeader`、`appendAssistant`、`appendToolStep`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1431 行；扫描到的声明包括 `text`、`appendTitle`、`appendRequestHeader`、`appendAssistant`、`appendToolStep`、`fencedCode`、`fixtureLog`、`smallSidebarFixture`；扫描到的测试主题包括 “manual web performance: complex workspace and history”、“reports workspace, history, and trajectory cardinality costs”、“reports default 24-turn history plus eight continued turns”、“reports fully expanded 500-turn history plus eight continued turns”、“reports one hundred generated turns and the next user-message paint”；源码顶部原注释（英文，仅作回查线索）：Opt-in browser benchmark for high-cardinality workspace and history rendering. It reports measurements without timing assertions because host speed is not a correctness contract; structural assertions keep the number of workspaces and history entries from s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/composer-draft-scroll.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/composer-draft-scroll.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: composer draft scrolling”、“caps the draft box and keeps both text layers at the start”、“lays out all three text layers at one wrap width”、“the glyphs cannot lag the caret: one task moves both”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: composer draft scrolling”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: a composer draft longer than the 14-line cap scrolls its GLYPHS AND ITS CARET AS ONE. The composer paints its text in two stacked layers (see packages/client/ui-conversation/src/client/skeleton/InputBar.module.css): the <textarea> carries ...”；固定提交中扫描到的声明包括 `measureComposer`、`renderGeometry`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 477 行；扫描到的声明包括 `measureComposer`、`renderGeometry`；扫描到的测试主题包括 “web e2e: composer draft scrolling”、“caps the draft box and keeps both text layers at the start”、“lays out all three text layers at one wrap width”、“the glyphs cannot lag the caret: one task moves both”、“a wheel gesture over a long draft moves the words, not only the caret”、“typing at the end of a scrolled draft brings the caret back into view”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: a composer draft longer than the 14-line cap scrolls its GLYPHS AND ITS CARET AS ONE. The composer paints its text in two stacked layers (see packages/client/ui-conversation/src/client/skeleton/InputBar.module.css): the <textarea> carries ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/composer-tab-geometry.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/composer-tab-geometry.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: input card position across view tabs”、“reserves the gutter in Chat and lets Trajectory own its width”、“holds the input card in place when the tab changes”、“holds the input card in place at a viewport where it shrinks with the column”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: input card position across view tabs”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the input card holds one horizontal position across the Chat and Trajectory tabs. The composer seat is the same node in both tabs, but it measures itself against a different edge in each (see packages/client/ui-conversation/src/client/skel...”；固定提交中扫描到的声明包括 `setMeasuredViewport`、`measureTab`、`showTab`、`compareTabs`、`compareTabsWithoutCompensation`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/chat-scroll-fixture.ts`、`apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 433 行；扫描到的声明包括 `setMeasuredViewport`、`measureTab`、`showTab`、`compareTabs`、`compareTabsWithoutCompensation`、`openSeededSession`、`renderGeometry`；扫描到的测试主题包括 “web e2e: input card position across view tabs”、“reserves the gutter in Chat and lets Trajectory own its width”、“holds the input card in place when the tab changes”、“holds the input card in place at a viewport where it shrinks with the column”、“moves the card again once the seat compensation is removed in the page”、“matches the committed tab geometry golden”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the input card holds one horizontal position across the Chat and Trajectory tabs. The composer seat is the same node in both tabs, but it measures itself against a different edge in each (see packages/client/ui-conversation/src/client/skel...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/conversation-column-overflow.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/conversation-column-overflow.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、对话的具体场景，包括“web e2e: the conversation column scrolls on one axis”、“never scrolls horizontally, at any width the glow bleeds past”、“scrolls horizontally again once the axis is opened back up (control)”、“matches the committed column-overflow golden”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: the conversation column scrolls on one axis”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the conversation column scrolls on one axis only, as the browser actually lays it out. The hazard: a horizontal scrollbar appears under the whole center column once the window (or the sidebar drag) narrows it — the hero's decorative backdr...”；固定提交中扫描到的声明包括 `measureColumn`、`wheelHorizontally`、`horizontalScrollLimit`、`renderGeometry`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 344 行；扫描到的声明包括 `measureColumn`、`wheelHorizontally`、`horizontalScrollLimit`、`renderGeometry`；扫描到的测试主题包括 “web e2e: the conversation column scrolls on one axis”、“never scrolls horizontally, at any width the glow bleeds past”、“scrolls horizontally again once the axis is opened back up (control)”、“matches the committed column-overflow golden”、“commits exactly the fixtures it reads”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the conversation column scrolls on one axis only, as the browser actually lays it out. The hazard: a horizontal scrollbar appears under the whole center column once the window (or the sidebar drag) narrows it — the hero's decorative backdr...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/cordis-tool-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/cordis-tool-round.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、Cordis 插件框架、工具的具体场景，包括“web e2e: Cordis tools use their owned cards”、“drives the recorded Cordis lifecycle to a settled turn (all modes)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Cordis tools use their owned cards”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario for the opt-in Cordis tools. Record mode drives a real model through inspect, define, run, and stop; replay pins the same shipped Web composition, durable calls, Cordis-owned rows, the define card's own source view, and conversation accessi...”；固定提交中扫描到的声明包括 `assertCompleteCordisLifecycle`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 174 行；扫描到的声明包括 `assertCompleteCordisLifecycle`；扫描到的测试主题包括 “web e2e: Cordis tools use their owned cards”、“drives the recorded Cordis lifecycle to a settled turn (all modes)”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario for the opt-in Cordis tools. Record mode drives a real model through inspect, define, run, and stop; replay pins the same shipped Web composition, durable calls, Cordis-owned rows, the define card's own source view, and conversation accessi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/declared-reasoning.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/declared-reasoning.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“offers exactly the declared levels and records the picked one”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“offers exactly the declared levels and records the picked one”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: a hand-declared model's reasoningEfforts reaches the composer's effort pane — the levels a settings profile declares are exactly what the picker offers, and picking one records it with the Agent default. Zero model calls: declaring, descri...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/settings/settings/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/settings/settings/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的测试主题包括 “offers exactly the declared levels and records the picked one”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: a hand-declared model's reasoningEfforts reaches the composer's effort pane — the levels a settings profile declares are exactly what the picker offers, and picking one records it with the Agent default. Zero model calls: declaring, descri...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/default-model.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/default-model.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: the composer model switch is the default for later sessions”、“writes the switched model as the default and leaves a logged session alone”、“goes inert when the route the default names stops being served”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: the composer model switch is the default for later sessions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: switching models in the composer is how this deployment's default is chosen. The gesture writes the shared agent-default-model settings section, a session created afterwards starts from it, and a session that already logged a route keeps d...”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/settings/settings/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 167 行；扫描到的测试主题包括 “web e2e: the composer model switch is the default for later sessions”、“writes the switched model as the default and leaves a logged session alone”、“goes inert when the route the default names stops being served”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: switching models in the composer is how this deployment's default is chosen. The gesture writes the shared agent-default-model settings section, a session created afterwards starts from it, and a session that already logged a route keeps d...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/details-session-lifecycle.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/details-session-lifecycle.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、会话的具体场景，包括“starts and reloads closed, then stays closed across Session ownership changes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“starts and reloads closed, then stays closed across Session ownership changes”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless browser regression for the details column's default visibility and Session ownership. The shipped composition starts closed after selection and reload, retains an explicitly opened width through unselected states, and closes it only when a different...”；固定提交中扫描到的声明包括 `detailsTrack`、`sidebarTrack`、`appFrame`、`handleSnapshot`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 152 行；扫描到的声明包括 `detailsTrack`、`sidebarTrack`、`appFrame`、`handleSnapshot`；扫描到的测试主题包括 “starts and reloads closed, then stays closed across Session ownership changes”；源码顶部原注释（英文，仅作回查线索）：Keyless browser regression for the details column's default visibility and Session ownership. The shipped composition starts closed after selection and reload, retains an explicitly opened width through unselected states, and closes it only when a different...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/feedback-command.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/feedback-command.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: /feedback command acknowledgement”、“drives the recorded prompt to a settled turn (all modes)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: /feedback command acknowledgement”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless assembled-browser coverage for the /feedback command over the shipped Web bundles and the real host wire. The command plane settles without a model turn: the host appends the log-only command/run + feedback/record + command/done lifecycle, and the t...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的测试主题包括 “web e2e: /feedback command acknowledgement”、“drives the recorded prompt to a settled turn (all modes)”；源码顶部原注释（英文，仅作回查线索）：Keyless assembled-browser coverage for the /feedback command over the shipped Web bundles and the real host wire. The command plane settles without a model turn: the host appends the log-only command/run + feedback/record + command/done lifecycle, and the t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/goal-bar.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/goal-bar.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、目标的具体场景，包括“web e2e: goal bar clear convergence”、“renders one active goal and clears it without exposing a stale error”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: goal bar clear convergence”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless assembled-browser coverage for the goal bar over the shipped Web bundles and FixtureApiClient wire. The command creates a real projected goal in the fixture session; the golden pins the active strip, while the clear gesture proves the acknowledged t...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 71 行；扫描到的测试主题包括 “web e2e: goal bar clear convergence”、“renders one active goal and clears it without exposing a stale error”；源码顶部原注释（英文，仅作回查线索）：Keyless assembled-browser coverage for the goal bar over the shipped Web bundles and FixtureApiClient wire. The command creates a real projected goal in the fixture session; the golden pins the active strip, while the clear gesture proves the acknowledged t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/goal-command-presentation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/goal-command-presentation.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、目标、呈现的具体场景，包括“web e2e: /goal human transcript presentation”、“shows the bare input and result from a fresh session without a model turn”、“reloads the same bubble and result from the persisted command lifecycle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: /goal human transcript presentation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e: /goal opts its command input into the human transcript while the command remains log-only. The shipped composition runs with no model adapter, so an accidental turn fails loud in addition to the event-level assertions.”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/types.ts`、`packages/interaction/commands/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的测试主题包括 “web e2e: /goal human transcript presentation”、“shows the bare input and result from a fresh session without a model turn”、“reloads the same bubble and result from the persisted command lifecycle”；源码顶部原注释（英文，仅作回查线索）：Web e2e: /goal opts its command input into the human transcript while the command remains log-only. The shipped composition runs with no model adapter, so an accidental turn fails loud in addition to the event-level assertions.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/goal-multi-turn-actions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、目标的具体场景，包括“web e2e: Goal keeps one assistant action row per completed turn”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Goal keeps one assistant action row per completed turn”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless replay of a real two-round Goal run. Each autonomous round ends as its own turn, so the first answer must keep its IconActions when Goal opens round two and the final answer must own a second, distinct action row.”；固定提交中扫描到的声明包括 `seedPackageInventory`、`whenTurnsSettled`、`goalRounds`、`createdObjectives`、`launch`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/goal/goal/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 168 行；扫描到的声明包括 `seedPackageInventory`、`whenTurnsSettled`、`goalRounds`、`createdObjectives`、`launch`、`runGoal`；扫描到的测试主题包括 “web e2e: Goal keeps one assistant action row per completed turn”；源码顶部原注释（英文，仅作回查线索）：Keyless replay of a real two-round Goal run. Each autonomous round ends as its own turn, so the first answer must keep its IconActions when Goal opens round two and the final answer must own a second, distinct action row.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/hmr-live.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“hot-reloads a real client-plugin source edit without refreshing the page”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hot-reloads a real client-plugin source edit without refreshing the page”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Published dsh web + pnpm dev:web → browser HMR, with no page reload.”；固定提交中扫描到的声明包括 `spawnSpec`、`waitForOutput`、`stopTree`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/subprocess/subprocess-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subprocess/subprocess-local/src/index.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subprocess/subprocess/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/subprocess/subprocess-local/src/index.ts`、`packages/subprocess/subprocess/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `spawnSpec`、`waitForOutput`、`stopTree`；扫描到的测试主题包括 “hot-reloads a real client-plugin source edit without refreshing the page”；源码顶部原注释（英文，仅作回查线索）：Published dsh web + pnpm dev:web → browser HMR, with no page reload.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/image-display.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“renders the history image pair through the authorized attachment route and opens the li...”、“accepts pasted images into the composer rail in order and removes them”、“accepts a whole-page drop under the limits-labeled overlay and refuses an over-limit ba...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“renders the history image pair through the authorized attachment route and opens the li...”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Multimodal image surfaces over the BUILT client graph (the code-mode-fixture idiom: real bundles via AppWebEntry, keyless FixtureApiClient transport). Opens the fixture history session whose turn 73 carries an image in BOTH a user ...”；固定提交中扫描到的声明包括 `openFixtureSession`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/assembled-boot.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 197 行；扫描到的声明包括 `openFixtureSession`；扫描到的测试主题包括 “renders the history image pair through the authorized attachment route and opens the lightbox”、“accepts pasted images into the composer rail in order and removes them”、“accepts a whole-page drop under the limits-labeled overlay and refuses an over-limit batch at intake”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Multimodal image surfaces over the BUILT client graph (the code-mode-fixture idiom: real bundles via AppWebEntry, keyless FixtureApiClient transport). Opens the fixture history session whose turn 73 carries an image in BOTH a user ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/lifecycle-chrome.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/lifecycle-chrome.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: lifecycle & chrome (workspace flow / reload / dark mode)”、“sends the first prompt from the empty-state hero (all modes)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: lifecycle & chrome (workspace flow / reload / dark mode)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenarios: lifecycle & chrome — the workspace-aware first-send flow over the real wire, reload recovery, and the dark-mode token cascade. One tiny recorded turn (text-only) drives the whole spec: the empty-state hero materializes a real Workspace + ...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 277 行；扫描到的测试主题包括 “web e2e: lifecycle & chrome (workspace flow / reload / dark mode)”、“sends the first prompt from the empty-state hero (all modes)”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenarios: lifecycle & chrome — the workspace-aware first-send flow over the real wire, reload recovery, and the dark-mode token cascade. One tiny recorded turn (text-only) drives the whole spec: the empty-state hero materializes a real Workspace + ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/live-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/live-interactions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: live-turn interactions (cancel / error / retry)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: live-turn interactions (cancel / error / retry)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenarios: live-turn interactions — cancellation, error surfacing, and transient-retry recovery, all through the real composition and wire. The model adapter is dsh-llm-replay with override sidecars: hang (+ a readyFile marker) makes mid-stream canc...”；固定提交中扫描到的声明包括 `turnEndReasons`、`launch`、`sendPrompt`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 247 行；扫描到的声明包括 `turnEndReasons`、`launch`、`sendPrompt`；扫描到的测试主题包括 “web e2e: live-turn interactions (cancel / error / retry)”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenarios: live-turn interactions — cancellation, error surfacing, and transient-retry recovery, all through the real composition and wire. The model adapter is dsh-llm-replay with override sidecars: hang (+ a readyFile marker) makes mid-stream canc...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/markdown-cjk-strong.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/markdown-cjk-strong.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: CJK-adjacent Markdown strong emphasis”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: CJK-adjacent Markdown strong emphasis”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `markdownFixture`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `markdownFixture`；扫描到的测试主题包括 “web e2e: CJK-adjacent Markdown strong emphasis”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/markdown-images.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/markdown-images.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: remote Markdown image rendering”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: remote Markdown image rendering”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: absolute HTTP(S) Markdown images. A validated session assembled through the Session API is seeded cold into the real web composition, then a separate image origin proves that the browser receives a real network image while local-path Markd...”；固定提交中扫描到的声明包括 `startImageOrigin`、`stopServer`、`markdownImageFixture`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 210 行；扫描到的声明包括 `startImageOrigin`、`stopServer`、`markdownImageFixture`；扫描到的测试主题包括 “web e2e: remote Markdown image rendering”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: absolute HTTP(S) Markdown images. A validated session assembled through the Session API is seeded cold into the real web composition, then a separate image origin proves that the browser receives a real network image while local-path Markd...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/markdown-inline-code-links.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/markdown-inline-code-links.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: Markdown inline-code links”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Markdown inline-code links”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `markdownFixture`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `markdownFixture`；扫描到的测试主题包括 “web e2e: Markdown inline-code links”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/math-rendering.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/math-rendering.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: settled Markdown math rendering”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: settled Markdown math rendering”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mathFixture`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `mathFixture`；扫描到的测试主题包括 “web e2e: settled Markdown math rendering”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/max-tokens-notice.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“assembled max-tokens turn-end notice”、“renders the localized truncation notice after the cut-off answer instead of ending sile...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“assembled max-tokens turn-end notice”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Assembled max-tokens snapshot: boots the real built packages/client /lib/ client.js bundles through AppWebEntry's ModuleLoader path against the keyless FixtureApiClient transport, opens the fixture session, and pins the surface its...”；固定提交中扫描到的声明包括 `noticeShape`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/assembled-boot.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 56 行；扫描到的声明包括 `noticeShape`；扫描到的测试主题包括 “assembled max-tokens turn-end notice”、“renders the localized truncation notice after the cut-off answer instead of ending silently”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Assembled max-tokens snapshot: boots the real built packages/client /lib/ client.js bundles through AppWebEntry's ModuleLoader path against the keyless FixtureApiClient transport, opens the fixture session, and pins the surface its...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/message-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/message-actions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、消息的具体场景，包括“web e2e: message IconActions and clocks on settled history”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: message IconActions and clocks on settled history”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: message IconActions + clocks. Cold-seeds a deterministic completed-turn-tail fork case (zero model calls) and pins the settled conversation aria after the footers are focus-revealed — the surface package jsdom tests cannot substitute for (...”；固定提交中扫描到的声明包括 `completedTailFixture`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 199 行；扫描到的声明包括 `completedTailFixture`；扫描到的测试主题包括 “web e2e: message IconActions and clocks on settled history”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: message IconActions + clocks. Cold-seeds a deterministic completed-turn-tail fork case (zero model calls) and pins the settled conversation aria after the footers are focus-revealed — the surface package jsdom tests cannot substitute for (...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/message-feedback-protocol.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/message-feedback-protocol.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、消息、协议的具体场景，包括“message feedback Host Remote protocol”、“snapshots strict list, put, conflict, and delete calls through the shipped Web Host”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“message feedback Host Remote protocol”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `isRecord`、`createdVersion`、`normalizeProtocol`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `isRecord`、`createdVersion`、`normalizeProtocol`；扫描到的测试主题包括 “message feedback Host Remote protocol”、“snapshots strict list, put, conflict, and delete calls through the shipped Web Host”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/message-feedback.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/message-feedback.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、消息的具体场景，包括“web e2e: durable per-message feedback”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: durable per-message feedback”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless browser regression for durable per-message feedback. Cold-seeds a settled two-turn transcript (zero model calls), rates one assistant message, attaches a note, proves both survive a full page reload from the Host's message-feedback sidecar, then ret...”；固定提交中扫描到的声明包括 `openSeededSession`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 121 行；扫描到的声明包括 `openSeededSession`；扫描到的测试主题包括 “web e2e: durable per-message feedback”；源码顶部原注释（英文，仅作回查线索）：Keyless browser regression for durable per-message feedback. Cold-seeds a settled two-turn transcript (zero model calls), rates one assistant message, attaches a note, proves both survive a full page reload from the Host's message-feedback sidecar, then ret...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/minimal-preset.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“minimal agent preset”、“sends the exact RL prompt and schemas, then executes the persistent shell and editor”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“minimal agent preset”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的测试主题包括 “minimal agent preset”、“sends the exact RL prompt and schemas, then executes the persistent shell and editor”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/models-settings.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/models-settings.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: Models settings page configures a dormant provider”、“opens the add card over the dormant directory vocabulary”、“refuses a key no HTTP header can carry before anything is written”、“saves a blank key as a reference-free provider-native profile”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Models settings page configures a dormant provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the Models settings page end to end through the real wire — the add card offers the dormant pi-ai catalog, a blank key saves a reference-free profile for provider-native auth, and typing an API key later stores it write-only under the deri...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 286 行；扫描到的测试主题包括 “web e2e: Models settings page configures a dormant provider”、“opens the add card over the dormant directory vocabulary”、“refuses a key no HTTP header can carry before anything is written”、“saves a blank key as a reference-free provider-native profile”、“describes reference-free deletion without claiming a credential exists”、“stores the key under the derived reference and keeps the route live”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the Models settings page end to end through the real wire — the add card offers the dormant pi-ai catalog, a blank key saves a reference-free profile for provider-native auth, and typing an API key later stores it write-only under the deri...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/navigation-panes.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/navigation-panes.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: navigation & panes over a rich seeded session”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: navigation & panes over a rich seeded session”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenarios: navigation & panes — the Trajectory view and timing overview, its local details inspector, and sidebar search, all over ONE rich two-turn seeded fixture rendered purely from the log (the seeded-history pattern: zero model calls in replay,...”；固定提交中扫描到的声明包括 `baselineResponse`、`assertBaselineSucceeded`、`ensureSeedOpen`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 513 行；扫描到的声明包括 `baselineResponse`、`assertBaselineSucceeded`、`ensureSeedOpen`；扫描到的测试主题包括 “web e2e: navigation & panes over a rich seeded session”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenarios: navigation & panes — the Trajectory view and timing overview, its local details inspector, and sidebar search, all over ONE rich two-turn seeded fixture rendered purely from the log (the seeded-history pattern: zero model calls in replay,...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/onboarding-deepseek-config.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/onboarding-deepseek-config.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、DeepSeek的具体场景，包括“stores a key write-only and observes configured state without restarting”、“never paints the takeover chrome on a configured reload, even with the settings join he...”、“configures arbitrary DeepSeek models and prompts after the selected model is removed”、“keeps the fixture inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“stores a key write-only and observes configured state without restarting”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless browser e2e: the shipped DeepSeek adapter stays mounted while its credential is absent, both ordered steps share the shipped modal chrome, and the inline key write lands in an isolated harness home without a reload or model call.”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/settings/settings/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/settings/settings/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 250 行；扫描到的测试主题包括 “stores a key write-only and observes configured state without restarting”、“never paints the takeover chrome on a configured reload, even with the settings join held open”、“configures arbitrary DeepSeek models and prompts after the selected model is removed”、“keeps the fixture inventory closed”；源码顶部原注释（英文，仅作回查线索）：Keyless browser e2e: the shipped DeepSeek adapter stays mounted while its credential is absent, both ordered steps share the shipped modal chrome, and the inline key write lands in an isolated harness home without a reload or model call.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/onboarding-usable-provider.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/onboarding-usable-provider.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“closes the setup card without discarding the add card beside it”、“stops prompting for DeepSeek once the other provider can serve requests”、“keeps the fixture inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“closes the setup card without discarding the add card beside it”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless browser e2e: a user who configures some OTHER provider is not asked for the official DeepSeek key again, and the first-run setup card is a card they can close. The shipped DeepSeek adapter stays mounted without a credential throughout, so the only t...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的测试主题包括 “closes the setup card without discarding the add card beside it”、“stops prompting for DeepSeek once the other provider can serve requests”、“keeps the fixture inventory closed”；源码顶部原注释（英文，仅作回查线索）：Keyless browser e2e: a user who configures some OTHER provider is not asked for the official DeepSeek key again, and the first-run setup card is a card they can close. The shipped DeepSeek adapter stays mounted without a credential throughout, so the only t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/permission-policy-context.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/permission-policy-context.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、策略、上下文的具体场景，包括“web e2e: current sandbox policy reaches the model before tools”、“switches read-only, danger-full-access, and workspace-write through the real GUI comman...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: current sandbox policy reaches the model before tools”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web acceptance for current sandbox-policy context. A real Chromium drives the shipped /permission command through all three presets; record mode uses the real provider, while replay keeps the same provider-authored behavior keyless. Assertions read the exac...”；固定提交中扫描到的声明包括 `requestSystems`、`runtimeContexts`、`assistantTexts`、`callArgs`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/sandbox/sandbox/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的声明包括 `requestSystems`、`runtimeContexts`、`assistantTexts`、`callArgs`；扫描到的测试主题包括 “web e2e: current sandbox policy reaches the model before tools”、“switches read-only, danger-full-access, and workspace-write through the real GUI command path”；源码顶部原注释（英文，仅作回查线索）：Web acceptance for current sandbox-policy context. A real Chromium drives the shipped /permission command through all three presets; record mode uses the real provider, while replay keeps the same provider-authored behavior keyless. Assertions read the exac...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/plan-review.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/plan-review.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: plan review takeover round trip”、“reviews the plan on a decision card and approves through it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: plan review takeover round trip”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the plan-review takeover. The shipped composition mounts plan mode and its client seat, so /plan <task> enters plan mode for real and the recorded turn ends on exit_plan_mode blocking against the live userInteraction seam. The composer is ...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的测试主题包括 “web e2e: plan review takeover round trip”、“reviews the plan on a decision card and approves through it”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the plan-review takeover. The shipped composition mounts plan mode and its client seat, so /plan <task> enters plan mode for real and the recorded turn ends on exit_plan_mode blocking against the live userInteraction seam. The composer is ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/plugin-config.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/plugin-config.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: plugin configuration section”、“shows one card per exposed host-plane namespace”、“stages an edit and writes it only when saved”、“drops a staged edit on discard without touching the document”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: plugin configuration section”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the configurable tab in Plugins settings — the cards a deployment's exposed host-plane namespaces produce, one field edited through the real wire down to $DSH_HOME/settings.yaml, and the override badge and reset that layering produces. Zer...”；固定提交中扫描到的声明包括 `openPlugins`、`settingsDocument`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 179 行；扫描到的声明包括 `openPlugins`、`settingsDocument`；扫描到的测试主题包括 “web e2e: plugin configuration section”、“shows one card per exposed host-plane namespace”、“stages an edit and writes it only when saved”、“drops a staged edit on discard without touching the document”、“refuses to save a draft that is not a number”、“clears the field back to the composed default on reset”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the configurable tab in Plugins settings — the cards a deployment's exposed host-plane namespaces produce, one field edited through the real wire down to $DSH_HOME/settings.yaml, and the override badge and reset that layering produces. Zer...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/produced-file-mentions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/produced-file-mentions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: inline-code mentions of produced files”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: inline-code mentions of produced files”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: inline-code file mentions in the closing prose. Cold-seeds a built write turn (zero model calls) whose closing message names the written file three ways: by unique basename (links), ambiguously (stays inert), and as a file the turn never t...”；固定提交中扫描到的声明包括 `text`、`mentionFixture`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 162 行；扫描到的声明包括 `text`、`mentionFixture`；扫描到的测试主题包括 “web e2e: inline-code mentions of produced files”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: inline-code file mentions in the closing prose. Cold-seeds a built write turn (zero model calls) whose closing message names the written file three ways: by unique basename (links), ambiguously (stays inert), and as a file the turn never t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/produced-files.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/produced-files.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: a finished turn ends with the files it produced”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: a finished turn ends with the files it produced”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the single-line produced-files summary a finished turn ends with. Cold-seeds ten writes (zero model calls), then verifies the real assembled lane keeps a precise +N and a capability-gated folder handoff. The folder request is intercepted s...”；固定提交中扫描到的声明包括 `producedFixture`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session/session-title/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 180 行；扫描到的声明包括 `producedFixture`；扫描到的测试主题包括 “web e2e: a finished turn ends with the files it produced”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the single-line produced-files summary a finished turn ends with. Cold-seeds ten writes (zero model calls), then verifies the real assembled lane keeps a precise +N and a capability-gated folder handoff. The folder request is intercepted s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/pwa-manifest.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/pwa-manifest.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“ships install metadata with the built web application”、“ships a favicon that switches to a light mark under dark color scheme”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ships install metadata with the built web application”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的测试主题包括 “ships install metadata with the built web application”、“ships a favicon that switches to a light mark under dark color scheme”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/pwsh-terminal.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/pwsh-terminal.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、持久终端的具体场景，包括“renders the seeded pwsh call as a terminal card with the parsed exit pill”、“guards the lane fixture inventory”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“renders the seeded pwsh call as a terminal card with the parsed exit pill”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless browser regression for pwsh UI parity with bash: a seeded session whose pwsh call/result is presented by the REAL tool-pwsh on replay (the api-proxy recomputes presentation views from logged args/result content) must render with the same terminal ca...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/shell/pwsh-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/shell/pwsh-local/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/shell/pwsh-local/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的测试主题包括 “renders the seeded pwsh call as a terminal card with the parsed exit pill”、“guards the lane fixture inventory”；源码顶部原注释（英文，仅作回查线索）：Keyless browser regression for pwsh UI parity with bash: a seeded session whose pwsh call/result is presented by the REAL tool-pwsh on replay (the api-proxy recomputes presentation views from logged args/result content) must render with the same terminal ca...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/question-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/question-composer.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: resident question composer round trip”、“asks through the composer, answers, and completes with the answer logged”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: resident question composer round trip”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the resident question composer. The shipped composition already exposes ask_user_question (the ui-user-questions row's node half mounts the tool), so a recorded turn where the model asks blocks mid-turn on the real userInteraction seam: th...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 184 行；扫描到的测试主题包括 “web e2e: resident question composer round trip”、“asks through the composer, answers, and completes with the answer logged”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the resident question composer. The shipped composition already exposes ask_user_question (the ui-user-questions row's node half mounts the tool), so a recorded turn where the model asks blocks mid-turn on the real userInteraction seam: th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/queue-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/queue-actions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、队列的具体场景，包括“web e2e: queue row actions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: queue row actions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless browser coverage for pending queue actions through the shipped Web composition and real HTTP/SSE wire. Replay overrides park consecutive turns so the page can edit and remove exact occurrences, then stop the active turn while proving the preserved Q...”；固定提交中扫描到的声明包括 `turnEndReasons`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 273 行；扫描到的声明包括 `turnEndReasons`；扫描到的测试主题包括 “web e2e: queue row actions”；源码顶部原注释（英文，仅作回查线索）：Keyless browser coverage for pending queue actions through the shipped Web composition and real HTTP/SSE wire. Replay overrides park consecutive turns so the page can edit and remove exact occurrences, then stop the active turn while proving the preserved Q...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/remote-welcome.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/remote-welcome.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、远程调用的具体场景，包括“advances process-locally and presents the notice again after reload”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“advances process-locally and presents the notice again after reload”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Trusted non-loopback Web access cannot call the loopback-only settings API; the notice therefore advances for this browser process and returns on reload.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的测试主题包括 “advances process-locally and presents the notice again after reload”；源码顶部原注释（英文，仅作回查线索）：Trusted non-loopback Web access cannot call the loopback-only settings API; the notice therefore advances for this browser process and returns on reload.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/replay-round-trip.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/replay-round-trip.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: fresh round trip through the real assembly”、“drives the recorded prompt to a settled turn (all modes)”、“records the Web surface, source checkout, and session cwd in the request header”、“exposes the assembled Web URL to the real bash tool”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: fresh round trip through the real assembly”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: fresh round trip. A real chromium types a prompt into the real composer; the wire, apiproxy, agent loop, and the REAL bash tool (echo in the temp workspace) all run; the model adapter is dsh-llm-replay (keyless) or the live adapter (record...”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的测试主题包括 “web e2e: fresh round trip through the real assembly”、“drives the recorded prompt to a settled turn (all modes)”、“records the Web surface, source checkout, and session cwd in the request header”、“exposes the assembled Web URL to the real bash tool”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: fresh round trip. A real chromium types a prompt into the real composer; the wire, apiproxy, agent loop, and the REAL bash tool (echo in the temp workspace) all run; the model adapter is dsh-llm-replay (keyless) or the live adapter (record...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/scaffold-hermetic.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold-hermetic.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“isolates replay skill discovery from every ambient host root”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“isolates replay skill discovery from every ambient host root”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writeSkill`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/preset/agent-presets/src/index.ts`、`packages/skill/skill/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `writeSkill`；扫描到的测试主题包括 “isolates replay skill discovery from every ambient host root”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：浏览器 E2E 测试基础设施
- 这个文件有什么用：它提供浏览器 E2E 的共同基础设施：真实 Web 组合、replay、临时目录、端口分配和清理；场景测试可以把注意力放在用户行为与断言上。
- 为什么这样设计：E2E 测试同时占用插件树、端口、临时目录和 replay 状态；把这些资源的获取与释放集中处理，才能保证测试之间隔离，并在失败时保留可诊断证据。
- 文件级设计证据：源码顶部注释把它定位为“Shared scaffold for the keyless browser e2e lane (Agent Note: .agents/notes/implemented/testing/2026-07-24-web-gui-browser-e2e-lane.md). Boots the REAL web composition — the dsh-base and dsh-web-app bundle patches over the empty profile root through the ven...”；固定提交中扫描到的声明包括 `WELCOME_NOTICE_SETTINGS_NAMESPACE`、`WELCOME_NOTICE_ACK_FIELD`、`WELCOME_NOTICE_VERSION`、`WELCOME_NOTICE_COPY`、`WebSnapshotMode`；本地静态 import 图显示它直接依赖 17 个源文件，并被 69 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 对应测试：[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/approval-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/approval-composer.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/background-job-list.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先读 `apps/web/tests/README.md` 和入口，再读当前实现，沿着 `apps/web/tests/support.ts`、`packages/boot/app-boot/src/index.ts`、`packages/boot/cmdline/src/index.ts` 和 `apps/web/stress-tests/reasoning-chunks.stress.ts`、`apps/web/tests/access-confirmation.e2e.ts`、`apps/web/tests/agent-preset-authoring.e2e.ts` 确认输入输出，最后对照 `apps/web/stress-tests/reasoning-chunks.stress.ts`、`apps/web/tests/access-confirmation.e2e.ts`、`apps/web/tests/agent-preset-authoring.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 907 行；扫描到的声明包括 `WELCOME_NOTICE_SETTINGS_NAMESPACE`、`WELCOME_NOTICE_ACK_FIELD`、`WELCOME_NOTICE_VERSION`、`WELCOME_NOTICE_COPY`、`WebSnapshotMode`、`webSnapshotMode`、`WebScaffold`、`LaunchOptions`；源码顶部原注释（英文，仅作回查线索）：Shared scaffold for the keyless browser e2e lane (Agent Note: .agents/notes/implemented/testing/2026-07-24-web-gui-browser-e2e-lane.md). Boots the REAL web composition — the dsh-base and dsh-web-app bundle patches over the empty profile root through the ven...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/schedule-after.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/schedule-after.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、定时任务的具体场景，包括“renders After as an ordinary assistant follow-up”、“batches one latest occurrence per overdue Every record into an ordinary follow-up”、“uses request-local browser context to create an explicit local At reminder”、“keeps the fixture inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“renders After as an ordinary assistant follow-up”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless assembled-Web evidence for conversational Schedule delivery.”；固定提交中扫描到的声明包括 `textResponse`、`ReminderAdapter`、`EveryReminderAdapter`、`localAt`、`BrowserZoneAtAdapter`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 545 行；扫描到的声明包括 `textResponse`、`ReminderAdapter`、`EveryReminderAdapter`、`localAt`、`BrowserZoneAtAdapter`、`assistantText`、`requestText`、`expectReminderFraming`；扫描到的测试主题包括 “renders After as an ordinary assistant follow-up”、“batches one latest occurrence per overdue Every record into an ordinary follow-up”、“uses request-local browser context to create an explicit local At reminder”、“keeps the fixture inventory closed”；源码顶部原注释（英文，仅作回查线索）：Keyless assembled-Web evidence for conversational Schedule delivery.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/search-card.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“assembled search card”、“renders the grep card, its truncation summary, and its capped head/tail slice from the ...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“assembled search card”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Assembled search-card snapshot: boots the real built workspace client bundles through AppWebEntry's ModuleLoader path against the keyless FixtureApiClient transport (no API key, no model round), opens the fixture session, and pins ...”；固定提交中扫描到的声明包括 `cardShape`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/assembled-boot.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的声明包括 `cardShape`；扫描到的测试主题包括 “assembled search card”、“renders the grep card, its truncation summary, and its capped head/tail slice from the built bundles”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Assembled search-card snapshot: boots the real built workspace client bundles through AppWebEntry's ModuleLoader path against the keyless FixtureApiClient transport (no API key, no model round), opens the fixture session, and pins ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/seeded-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/seeded-history.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、历史记录的具体场景，包括“web e2e: seeded history renders through cold resume”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: seeded history renders through cold resume”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: seeded history. A recorded session seeded cold through the REAL persistence API renders purely from the log — the surface nothing else covers: sidebar cold listing, the implicit resume/attach inside the history RPC, history-page tool views...”；固定提交中扫描到的声明包括 `withCompaction`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/llm/token-meter/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 510 行；扫描到的声明包括 `withCompaction`；扫描到的测试主题包括 “web e2e: seeded history renders through cold resume”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: seeded history. A recorded session seeded cold through the REAL persistence API renders purely from the log — the surface nothing else covers: sidebar cold listing, the implicit resume/attach inside the history RPC, history-page tool views...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/settings-chrome.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/settings-chrome.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: settings modal and General preferences”、“opens the settings dialog, switches sections, and closes by every path”、“stores Permission as the default for future sessions without changing an existing session”、“uses the persisted dark preference while plugins are still loading”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: settings modal and General preferences”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenarios: the settings surface — the modal shell (trigger, nav, section switching, both close paths), the Appearance preference row (the real theme gesture — click 深色 and the whole cascade runs: ThemeRuntime preference -> Host settings -> theme/cha...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 485 行；扫描到的测试主题包括 “web e2e: settings modal and General preferences”、“opens the settings dialog, switches sections, and closes by every path”、“stores Permission as the default for future sessions without changing an existing session”、“uses the persisted dark preference while plugins are still loading”、“flips the theme through the Appearance cubes and persists across reload and a distinct port”、“persists the busy-state Enter behavior across reload and a distinct port”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenarios: the settings surface — the modal shell (trigger, nav, section switching, both close paths), the Appearance preference row (the real theme gesture — click 深色 and the whole cascade runs: ThemeRuntime preference -> Host settings -> theme/cha...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“assembles the shipped Web catalog, file-reference guidance, and confined access default”、“lets a preset producer reach the background-job registry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“assembles the shipped Web catalog, file-reference guidance, and confined access default”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Boots the shipped Web composition over the built dist this lane already uses and asserts what that composition produces: the model-visible tool catalog and file-reference guidance plus the sandbox/approval knobs it ships with. No browser and no model call —...”；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 188 行；扫描到的测试主题包括 “assembles the shipped Web catalog, file-reference guidance, and confined access default”、“lets a preset producer reach the background-job registry”；源码顶部原注释（英文，仅作回查线索）：Boots the shipped Web composition over the built dist this lane already uses and asserts what that composition produces: the model-visible tool catalog and file-reference guidance plus the sandbox/approval knobs it ships with. No browser and no model call —...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/sidebar-scrollbar.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-scrollbar.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: sidebar session list scrollbar (reserved gutter / themed thumb)”、“reserves a scrollbar gutter on the overflowing session list”、“draws no thumb until the pointer is over the column, and lingers on the way out”、“keeps the row background inset when overflow disappears”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: sidebar session list scrollbar (reserved gutter / themed thumb)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the sidebar session list's scrollbar as the browser actually lays it out — the observable half of the themed scrollbars (packages/client/ui-theme/src/styles/scrollbar.css plus the scrollbar-gutter: stable reservation on WorkspaceBrowser's ...”；固定提交中扫描到的声明包括 `measureList`、`measureRowInset`、`measurePalette`、`renderGeometry`、`resolveThumb`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 542 行；扫描到的声明包括 `measureList`、`measureRowInset`、`measurePalette`、`renderGeometry`、`resolveThumb`、`pointAt`、`expandSeededSessions`；扫描到的测试主题包括 “web e2e: sidebar session list scrollbar (reserved gutter / themed thumb)”、“reserves a scrollbar gutter on the overflowing session list”、“draws no thumb until the pointer is over the column, and lingers on the way out”、“keeps the row background inset when overflow disappears”、“renders the themed thumb through the WebKit path in both palettes”、“matches the committed scrollbar geometry golden in both palettes”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the sidebar session list's scrollbar as the browser actually lays it out — the observable half of the themed scrollbars (packages/client/ui-theme/src/styles/scrollbar.css plus the scrollbar-gutter: stable reservation on WorkspaceBrowser's ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、子 agent的具体场景，包括“web e2e: sidebar subagent activity”、“pins a running descendant on its visible idle owner row”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: sidebar subagent activity”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StagedAdapter`、`waitForRunningChild`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `StagedAdapter`、`waitForRunningChild`；扫描到的测试主题包括 “web e2e: sidebar subagent activity”、“pins a running descendant on its visible idle owner row”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/skill-invocation-policy.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/skill-invocation-policy.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、策略的具体场景，包括“web e2e: skill invocation policy through the real host”、“renders every user-invocable skill and marks the user-only entry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: skill invocation policy through the real host”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the real host serves every user-invocable skill to the browser slash source — user-only (disable-model-invocation) entries appear with their marker while user-disabled quadrants stay hidden. A real chromium connects a fresh workspace seede...”；固定提交中扫描到的声明包括 `seedSkills`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 118 行；扫描到的声明包括 `seedSkills`；扫描到的测试主题包括 “web e2e: skill invocation policy through the real host”、“renders every user-invocable skill and marks the user-only entry”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the real host serves every user-invocable skill to the browser slash source — user-only (disable-model-invocation) entries appear with their marker while user-disabled quadrants stay hidden. A real chromium connects a fresh workspace seede...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/skill-tool-row.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/skill-tool-row.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、工具的具体场景，包括“expands the loaded skill to its exact recorded instructions”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“expands the loaded skill to its exact recorded instructions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the real skill-load recording, seeded cold through the persistence seam, renders through ui-skill's keyed toolview without a model call. The disclosure proves replay-stable naming and exact durable output.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的测试主题包括 “expands the loaded skill to its exact recorded instructions”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the real skill-load recording, seeded cold through the persistence seam, renders through ui-skill's keyed toolview without a model call. The disclosure proves replay-stable naming and exact durable output.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/skill-user-invoke.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/skill-user-invoke.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“claims /name args into a gesture bubble, an injection row, and a replayed answer”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“claims /name args into a gesture bubble, an injection row, and a replayed answer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: a user invokes a disable-model-invocation skill through the composer (issue #1470). The entered /name args line claims into skill.invoke: the real host forwards the gesture as an ordinary user prompt, injects the rendered body as instructi...”；固定提交中扫描到的声明包括 `seedUserOnlySkill`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/test-support/llm-replay/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/llm-replay/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 150 行；扫描到的声明包括 `seedUserOnlySkill`；扫描到的测试主题包括 “claims /name args into a gesture bubble, an injection row, and a replayed answer”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: a user invokes a disable-model-invocation skill through the composer (issue #1470). The entered /name args line claims into skill.invoke: the real host forwards the gesture as an ordinary user prompt, injects the rendered body as instructi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/smoke-real.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/smoke-real.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“dsh web keyless CLI smoke”、“listens on 127.0.0.1 by default”、“routes web runtime context and workspace instructions through the real CLI request”、“retries a partial transport failure through the shipped Web composition”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh web keyless CLI smoke”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Real-host smoke: spawn dsh web with a real key, walk the full flow list in a real chromium, screenshot every screen into .artifacts/ for the figma comparison pass. Self-skips without DEEPSEEK_API_KEY (repo e2e convention); vitest.web.config.ts loads the rep...”；固定提交中扫描到的声明包括 `waitForReadyLine`、`rpc`、`isRecord`、`providerTitle`、`hasAssistantMarker`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 655 行；扫描到的声明包括 `waitForReadyLine`、`rpc`、`isRecord`、`providerTitle`、`hasAssistantMarker`、`history`、`waitForProviderTitle`、`waitForAssistantMarker`；扫描到的测试主题包括 “dsh web keyless CLI smoke”、“listens on 127.0.0.1 by default”、“routes web runtime context and workspace instructions through the real CLI request”、“retries a partial transport failure through the shipped Web composition”、“DSH_TOOLS_MODE=code collapses the provider wire tools to run_code with the SDK prompt section”、“cold start: loading page settles into the three-column frame”；源码顶部原注释（英文，仅作回查线索）：Real-host smoke: spawn dsh web with a real key, walk the full flow list in a real chromium, screenshot every screen into .artifacts/ for the figma comparison pass. Self-skips without DEEPSEEK_API_KEY (repo e2e convention); vitest.web.config.ts loads the rep...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/startup-auto-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/startup-auto-selection.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、启动的具体场景，包括“web e2e: startup auto-selection”、“keeps the resident Hero and composer nodes when the first Workspace session appears”、“keeps the hero and the composer on screen while the auto-selected blank session opens”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: startup auto-selection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: startup auto-selection keeps the hero on screen. A page load with a workspace already registered runs WorkspaceRuntime.startInitialSelection: it connects the most recent workspace and opens its blank session. openState flips to loading the...”；固定提交中扫描到的声明包括 `recordedPhases`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 168 行；扫描到的声明包括 `recordedPhases`；扫描到的测试主题包括 “web e2e: startup auto-selection”、“keeps the resident Hero and composer nodes when the first Workspace session appears”、“keeps the hero and the composer on screen while the auto-selected blank session opens”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: startup auto-selection keeps the hero on screen. A page load with a workspace already registered runs WorkspaceRuntime.startInitialSelection: it connects the most recent workspace and opens its blank session. openState flips to loading the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/stats-paged-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/stats-paged-history.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、历史记录的具体场景，包括“web e2e: whole-session stats survive history paging”、“renders full-session counts on the partial tail page and keeps them across load-older”、“matches the paged-stats aria golden”、“issued zero model calls and stayed clean”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: whole-session stats survive history paging”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: full-session stats over paged history. A deterministic 28-turn log (56 surface messages — more than one 50-message history page) seeded cold through the REAL persistence API must render whole-log turn/step counts from the sessionStats proj...”；固定提交中扫描到的声明包括 `buildSeed`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/scaffold.ts`、`apps/web/tests/support.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 136 行；扫描到的声明包括 `buildSeed`；扫描到的测试主题包括 “web e2e: whole-session stats survive history paging”、“renders full-session counts on the partial tail page and keeps them across load-older”、“matches the paged-stats aria golden”、“issued zero model calls and stayed clean”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: full-session stats over paged history. A deterministic 28-turn log (56 surface messages — more than one 50-message history page) seeded cold through the REAL persistence API must render whole-log turn/step counts from the sessionStats proj...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/steering.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/steering.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: mid-turn steering lands durably and visibly”、“strictly steers one queued row; the interjection is logged, rendered, and obeyed”、“web e2e: composer shortcut steers directly”、“web e2e: composer shortcut follows the swapped busy behavior”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: mid-turn steering lands durably and visibly”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenarios for both steering entry points: QueueDock strictly transfers one queued occurrence, while the complementary composer gestures choose Queue or Steer. The question tool supplies a deterministic pending- steering snapshot before the step can ...”；固定提交中扫描到的声明包括 `assistantText`、`claimedMessages`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 392 行；扫描到的声明包括 `assistantText`、`claimedMessages`；扫描到的测试主题包括 “web e2e: mid-turn steering lands durably and visibly”、“strictly steers one queued row; the interjection is logged, rendered, and obeyed”、“web e2e: composer shortcut steers directly”、“web e2e: composer shortcut follows the swapped busy behavior”、“web e2e: empty-draft Cmd+Enter steers the whole queue”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenarios for both steering entry points: QueueDock strictly transfers one queued occurrence, while the complementary composer gestures choose Queue or Steer. The question tool supplies a deterministic pending- steering snapshot before the step can ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、子 agent、对话的具体场景，包括“web e2e: persisted subagent conversation and human continuation”、“keeps known descendants reachable across a stale empty catalog response”、“expands a persisted grandchild progressively without activating either level”、“opens the completed child from persistence without activating it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: persisted subagent conversation and human continuation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `childFixture`、`waitForAgentToSettle`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 509 行；扫描到的声明包括 `childFixture`、`waitForAgentToSettle`；扫描到的测试主题包括 “web e2e: persisted subagent conversation and human continuation”、“keeps known descendants reachable across a stale empty catalog response”、“expands a persisted grandchild progressively without activating either level”、“opens the completed child from persistence without activating it”、“continues through FIFO follow-up admission and receives the child mux events”、“matches the settled addressed-conversation aria golden and stays clean”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/subagent-interrupt-ui.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-interrupt-ui.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、子 agent、用户界面的具体场景，包括“interrupts the live child through the parent-offline composer”、“interrupts through subagent.interrupt, parks the follow-up, and resumes it FIFO”、“keeps its snapshot inventory closed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“interrupts the live child through the parent-offline composer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: the composer's independent Stop interrupts a running continuable child. The child holds its model turn open through a replay hang entry; the browser proves Send and Stop coexist, the parent-offline disabled-Send-with-Stop composer, the sub...”；固定提交中扫描到的声明包括 `waitFor`、`waitForAbortedTurn`、`textCompletion`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 319 行；扫描到的声明包括 `waitFor`、`waitForAbortedTurn`、`textCompletion`；扫描到的测试主题包括 “interrupts the live child through the parent-offline composer”、“interrupts through subagent.interrupt, parks the follow-up, and resumes it FIFO”、“keeps its snapshot inventory closed”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: the composer's independent Stop interrupts a running continuable child. The child holds its model turn open through a replay hang entry; the browser proves Send and Stop coexist, the parent-offline disabled-Send-with-Stop composer, the sub...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/subagent-interrupt.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-interrupt.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、子 agent的具体场景，包括“parks a queued follow-up on interrupt and resumes it FIFO on a waking send”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parks a queued follow-up on interrupt and resumes it FIFO on a waking send”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario (browserless): the subagent.interrupt RPC against the real composition. A live continuable child holds its model turn open through a replay hang entry; plain HTTP queues a follow-up, interrupts the turn, and proves from the real session sta...”；固定提交中扫描到的声明包括 `rpc`、`waitFor`、`textCompletion`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `rpc`、`waitFor`、`textCompletion`；扫描到的测试主题包括 “parks a queued follow-up on interrupt and resumes it FIFO on a waking send”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario (browserless): the subagent.interrupt RPC against the real composition. A live continuable child holds its model turn open through a replay hang entry; plain HTTP queues a follow-up, interrupts the turn, and proves from the real session sta...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试辅助工具
- 这个文件有什么用：它提供浏览器页面、端口、构建产物和失败截图等测试工具，统一 E2E 测试的启动、等待和诊断方式。
- 为什么这样设计：浏览器测试的等待、端口、产物定位和失败截图属于环境能力而不是业务断言；集中封装能减少每个场景的样板，也让失败诊断方式保持一致。
- 文件级设计证据：源码顶部注释把它定位为“Shared plumbing for the web smoke tests (dist location, free port, failure shots).”；固定提交中扫描到的声明包括 `DIST_INDEX`、`REPO_ROOT`、`ZH_BROWSER_LOCALE`、`newEnglishPage`、`requireDist`；本地静态 import 图显示它直接依赖 0 个源文件，并被 67 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 对应测试：[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/approval-composer.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/approval-composer.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/background-job-list.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先读 `apps/web/tests/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `apps/web/stress-tests/reasoning-chunks.stress.ts`、`apps/web/tests/access-confirmation.e2e.ts`、`apps/web/tests/agent-preset-authoring.e2e.ts` 确认输入输出，最后对照 `apps/web/stress-tests/reasoning-chunks.stress.ts`、`apps/web/tests/access-confirmation.e2e.ts`、`apps/web/tests/agent-preset-authoring.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 135 行；扫描到的声明包括 `DIST_INDEX`、`REPO_ROOT`、`ZH_BROWSER_LOCALE`、`newEnglishPage`、`requireDist`、`probeFreePort`、`connectFreshWorkspace`、`connectFreshWorkspaceZh`；源码顶部原注释（英文，仅作回查线索）：Shared plumbing for the web smoke tests (dist location, free port, failure shots).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/support/listen-probe.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support/listen-probe.mjs)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：监听行为测试探针
- 这个文件有什么用：它给 Server.prototype.listen 加测试探针，用来确认某个流程是否真的启动监听；这是观察测试行为的工具，不是 Web 服务实现。
- 为什么这样设计：测试基础设施必须能证明服务真的调用了 `listen`，否则一个只渲染页面的假流程也可能被当成网络测试通过；探针只观察调用，不改变服务实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先读 `apps/web/tests/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和所在包的入口或服务确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 9 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/todo-row.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/todo-row.snapshot.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“assembled todo surfaces”、“renders the parallel plan as a row summary, a separate active count, and the dock plan ...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“assembled todo surfaces”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Assembled todo snapshot: boots the real built packages/client /lib/ client.js bundles through AppWebEntry's ModuleLoader path against the keyless FixtureApiClient transport, opens the fixture session, and pins the two surfaces the ...”；固定提交中扫描到的声明包括 `todoShape`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/assembled-boot.ts)
- 阅读顺序：先看它直接使用的测试支持 `apps/web/tests/assembled-boot.ts`，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 71 行；扫描到的声明包括 `todoShape`；扫描到的测试主题包括 “assembled todo surfaces”、“renders the parallel plan as a row summary, a separate active count, and the dock plan strip”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Assembled todo snapshot: boots the real built packages/client /lib/ client.js bundles through AppWebEntry's ModuleLoader path against the keyless FixtureApiClient transport, opens the fixture session, and pins the two surfaces the ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/trajectory-virtualization.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/trajectory-virtualization.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: Trajectory virtualization over tail-paged history”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: Trajectory virtualization over tail-paged history”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Browser contract for the tail-paged, virtualized Trajectory ledger. The scenario proves that semantic row identity survives an older-page prepend, DOM mounting stays bounded, and every scroll range remains reachable.”；固定提交中扫描到的声明包括 `openSeed`、`openTrajectory`、`logicalRows`、`mountedRows`、`geometry`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 346 行；扫描到的声明包括 `openSeed`、`openTrajectory`、`logicalRows`、`mountedRows`、`geometry`、`nextPaint`、`scrollToRatio`、`firstVisibleRow`；扫描到的测试主题包括 “web e2e: Trajectory virtualization over tail-paged history”；源码顶部原注释（英文，仅作回查线索）：Browser contract for the tail-paged, virtualized Trajectory ledger. The scenario proves that semantic row identity survives an older-page prepend, DOM mounting stays bounded, and every scroll range remains reachable.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/turn-tail-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/turn-tail-actions.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: assistant IconActions wait for the turn to end”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: assistant IconActions wait for the turn to end”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario: assistant IconActions belong to the settled answer, so they arrive with turn/end and not before. The recorded turn narrates in plain text before its tool call, which is the event order that would show the footer beside mid-turn narration f...”；固定提交中扫描到的声明包括 `launch`、`sendPrompt`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 152 行；扫描到的声明包括 `launch`、`sendPrompt`；扫描到的测试主题包括 “web e2e: assistant IconActions wait for the turn to end”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario: assistant IconActions belong to the settled answer, so they arrive with turn/end and not before. The recorded turn narrates in plain text before its tool call, which is the event order that would show the footer beside mid-turn narration f...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/vite-entry.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/vite-entry.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“Web development entry”、“rejects the package dev alias with the full-host correction”、“rejects the standalone Vite server with the full-host correction”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Web development entry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Bare Vite must fail before it can present a bootless shell as a working GUI.”；固定提交中扫描到的声明包括 `freePort`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `freePort`；扫描到的测试主题包括 “Web development entry”、“rejects the package dev alias with the full-host correction”、“rejects the standalone Vite server with the full-host correction”；源码顶部原注释（英文，仅作回查线索）：Bare Vite must fail before it can present a bootless shell as a working GUI.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/web-search-round.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: shipped default web search”、“drives the recorded search to a settled turn (all modes)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: shipped default web search”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenario for the shipped default search composition. A real browser drives web_search; the model stream is replayed while the real DeepSeek provider calls a deterministic local Anthropic-compatible endpoint through the real credentials service.”；固定提交中扫描到的声明包括 `resultUrl`、`resultTitle`、`resultSnippet`、`resultPageAge`、`startSearchServer`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/web/tool-web/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 298 行；扫描到的声明包括 `resultUrl`、`resultTitle`、`resultSnippet`、`resultPageAge`、`startSearchServer`；扫描到的测试主题包括 “web e2e: shipped default web search”、“drives the recorded search to a settled turn (all modes)”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenario for the shipped default search composition. A real browser drives web_search; the model stream is replayed while the real DeepSeek provider calls a deterministic local Anthropic-compatible endpoint through the real credentials service.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/workflow-run.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/workflow-run.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面、工作流、运行驱动的具体场景，包括“shows the live member, opens its local child, then retains the settled record beside th...”、“rebuilds the terminal record from history after reload”、“stays clean and owns only its one golden”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“shows the live member, opens its local child, then retains the settled record beside th...”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless shipped-Web acceptance for the durable workflow Conversation Node. Reuses the existing recorded workflow parent/child model fixtures; the real workflow tool, worker, subagent provider, Session log, browser plugin graph, and navigation all execute du...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 191 行；扫描到的测试主题包括 “shows the live member, opens its local child, then retains the settled record beside the tool row”、“rebuilds the terminal record from history after reload”、“stays clean and owns only its one golden”；源码顶部原注释（英文，仅作回查线索）：Keyless shipped-Web acceptance for the durable workflow Conversation Node. Reuses the existing recorded workflow parent/child model fixtures; the real workflow tool, worker, subagent provider, Session log, browser plugin graph, and navigation all execute du...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/tests/workspace-management.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/workspace-management.e2e.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“web e2e: workspace management (create / rename / flat view / hover affordances)”、“adds two workspaces through the dialog, each on a folder it created”、“renames a workspace over the wire with a duplicate-name pre-check”、“deletes only the Workspace registration and keeps its current Session, folder, and log”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web e2e: workspace management (create / rename / flat view / hover affordances)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web e2e scenarios: workspace management — adding a workspace through the composed directory dialog (its own New folder affordance is the product's one creation route), the dialog's path editor walking the panes with the typed draft, same-basename directory ...”；固定提交中扫描到的声明包括 `browseTo`、`addNewFolderWorkspace`、`adoptDirectory`、`clickHoverAction`、`seededSessionRow`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[apps/web/tests/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 626 行；扫描到的声明包括 `browseTo`、`addNewFolderWorkspace`、`adoptDirectory`、`clickHoverAction`、`seededSessionRow`；扫描到的测试主题包括 “web e2e: workspace management (create / rename / flat view / hover affordances)”、“adds two workspaces through the dialog, each on a folder it created”、“renames a workspace over the wire with a duplicate-name pre-check”、“deletes only the Workspace registration and keeps its current Session, folder, and log”、“reuses a deleted title for a different new directory without any transient error surface”、“switches to the flat”；源码顶部原注释（英文，仅作回查线索）：Web e2e scenarios: workspace management — adding a workspace through the composed directory dialog (its own New folder affordance is the product's one creation route), the dialog's path editor walking the panes with the typed draft, same-basename directory ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [apps/web/vite.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/vite.config.ts)

- 所属层：可直接运行的 CLI 或 Web 应用
- 文件角色：构建或测试配置
- 这个文件有什么用：它约束浏览器构建边界，禁止 standalone serve，安排 vendor chunk，并把 boot grammar 等资源纳入构建；Web 开发服务器不能绕过 Harness 正式的启动组合。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：固定提交中扫描到的声明包括 `rejectStandaloneServe`、`npmPackageOf`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `rejectStandaloneServe`、`npmPackageOf`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
