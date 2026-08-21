# 源文件索引：scripts

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 170 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/agent-note-tree.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Agent Note 目录真值
- 这个文件有什么用：它定义 Agent Note 的根目录、生命周期和分类集合，并提供纯的目录遍历结果；其他 Agent Note 门禁都从这份结构真值读取规则。
- 为什么这样设计：Agent Note 的 lifecycle 和 class 是一个封闭集合，目录遍历又必须被多个 gate 复用；把它作为纯结构真值，其他检查器就不会各自维护一套稍有差异的分类规则。
- 文件级设计证据：源码顶部注释把它定位为“Shared structural source of truth for the Agent Note tree. Lifecycle and class sets are closed under .agents/notes/README.md; importing this module is pure.”；固定提交中扫描到的声明包括 `agentNoteRoot`、`AGENT_NOTE_CLASSES`、`AgentNote`、`walkAgentNoteTree`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.ts)、[scripts/verify-agent-note-classification.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-agent-note-classification.ts)、[scripts/verify-agent-note-format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-agent-note-format.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 83 行；扫描到的声明包括 `agentNoteRoot`、`AGENT_NOTE_CLASSES`、`AgentNote`、`walkAgentNoteTree`；源码顶部原注释（英文，仅作回查线索）：Shared structural source of truth for the Agent Note tree. Lifecycle and class sets are closed under .agents/notes/README.md; importing this module is pure.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“archived Agent Notes”、“recognizes archived paths with POSIX and Windows separators”、“accepts one complete implemented triplet with matching archive metadata”、“rejects incomplete triplets and invalid archive headers”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“archived Agent Notes”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fixture`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/archived-agent-notes.ts`、`scripts/repo-files.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `fixture`；扫描到的测试主题包括 “archived Agent Notes”、“recognizes archived paths with POSIX and Windows separators”、“accepts one complete implemented triplet with matching archive metadata”、“rejects incomplete triplets and invalid archive headers”、“extends the manifest without permitting a sealed change or removal”、“rejects replacing manifest seals alongside changed archive content”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Agent Note 归档助手
- 这个文件有什么用：它读取和写入不可变的 Agent Note archive manifest，集中处理归档格式与历史记录，而不是运行时 Agent 状态。
- 为什么这样设计：归档记录一旦发布就应保持不可变，新增归档只能扩展 manifest 不能改写旧 seal；单独的 helper 把历史 provenance 和当前目录检查分开。
- 文件级设计证据：源码顶部注释把它定位为“Pure archive-format, triplet, and immutable-manifest helpers.”；固定提交中扫描到的声明包括 `ArchiveManifest`、`gitBlobHash`、`parseArchiveManifest`、`renderArchiveManifest`、`validateArchiveManifestExtension`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/agent-note-tree.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)、[scripts/verify-archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-archived-agent-notes.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/agent-note-tree.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 190 行；扫描到的声明包括 `ArchiveManifest`、`gitBlobHash`、`parseArchiveManifest`、`renderArchiveManifest`、`validateArchiveManifestExtension`、`validateArchiveArtifacts`、`extendArchiveManifest`、`archiveContentHash`；源码顶部原注释（英文，仅作回查线索）：Pure archive-format, triplet, and immutable-manifest helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/attribute-chunk-bytes.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/attribute-chunk-bytes.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行分块相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Attribute a built chunk's minified bytes to source npm packages / workspace dirs via its sourcemap (zero-dependency VLQ decoder). The dist-audit companion of the shell chunk-layout decision (.agents/notes/implemented/architecture/2026-08-06-web-shell-dist-c...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Attribute a built chunk's minified bytes to source npm packages / workspace dirs via its sourcemap (zero-dependency VLQ decoder). The dist-audit companion of the shell chunk-layout decision (.agents/notes/implemented/architecture/2026-08-06-web-shell-dist-c...”；固定提交中扫描到的声明包括 `bucketOf`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `bucketOf`；源码顶部原注释（英文，仅作回查线索）：Attribute a built chunk's minified bytes to source npm packages / workspace dirs via its sourcemap (zero-dependency VLQ decoder). The dist-audit companion of the shell chunk-layout decision (.agents/notes/implemented/architecture/2026-08-06-web-shell-dist-c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build-exe-for-python-sdk-native-pty.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持、原生边界的具体场景，包括“resolveLinuxNodePtyAddon”、“prefers the manylinux build produced by the release workflow”、“uses the target prebuild after an ordinary beta install”、“reports both expected locations when no addon is installed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveLinuxNodePtyAddon”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `temporaryPackage`、`createAddon`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/build-exe-for-python-sdk-native-pty.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/build-exe-for-python-sdk-native-pty.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `temporaryPackage`、`createAddon`；扫描到的测试主题包括 “resolveLinuxNodePtyAddon”、“prefers the manylinux build produced by the release workflow”、“uses the target prebuild after an ordinary beta install”、“reports both expected locations when no addon is installed”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build-exe-for-python-sdk-native-pty.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Python 支持、原生边界相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Resolve the native node-pty input used by the Python SDK runtime builder.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Resolve the native node-pty input used by the Python SDK runtime builder.”；固定提交中扫描到的声明包括 `resolveLinuxNodePtyAddon`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/build-exe-for-python-sdk-native-pty.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.spec.ts)、[scripts/build-exe-for-python-sdk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk.ts)
- 对应测试：[scripts/build-exe-for-python-sdk-native-pty.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `resolveLinuxNodePtyAddon`；源码顶部原注释（英文，仅作回查线索）：Resolve the native node-pty input used by the Python SDK runtime builder.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build-exe-for-python-sdk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Python SDK 运行时构建器
- 这个文件有什么用：它构建 Python SDK 使用的 Node 单文件运行时，处理平台、架构、SEA/pkg、开发 carrier 和输出布局。
- 为什么这样设计：Python SDK 的 runtime 需要跨平台、可启动且布局稳定的单文件载体；把 SEA/pkg、开发 carrier 和输出目录规则集中在构建器中，发布脚本就不会各自拼装不同产物。
- 文件级设计证据：源码顶部注释把它定位为“Build the SDK runtime executables and Python node carrier. The fixed @yao-pkg/pkg --sea route, deploy flags, and artifact layout are owned by .agents/notes/implemented/architecture/2026-07-10-single-file-executable-sdk-runtime-distribution.md. The staged cl...”；固定提交中扫描到的声明包括 `isPlatform`、`isArch`、`Target`、`BuildCli`、`pnpmBin`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/build-exe-for-python-sdk-native-pty.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.ts)
- 对应测试：[scripts/build-exe-for-python-sdk-native-pty.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 561 行；扫描到的声明包括 `isPlatform`、`isArch`、`Target`、`BuildCli`、`pnpmBin`、`formatCommand`、`SingleExeBuild`、`main`；源码顶部原注释（英文，仅作回查线索）：Build the SDK runtime executables and Python node carrier. The fixed @yao-pkg/pkg --sea route, deploy flags, and artifact layout are owned by .agents/notes/implemented/architecture/2026-07-10-single-file-executable-sdk-runtime-distribution.md. The staged cl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build-python-release.py](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-python-release.py)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Python SDK 发布构建器
- 这个文件有什么用：它构建 SDK wheel/runtime wheel，并验证平台 tag、runtime payload 和 PEP 440 版本。
- 为什么这样设计：wheel 发布同时涉及版本格式、平台 tag 和 runtime payload，任何一项不一致都会产生“能安装但不能运行”的包；单独的发布构建器把这些检查放在同一条流水线。
- 文件级设计证据：固定提交中扫描到的声明包括 `load_platforms`、`runtime_suffixes`、`main`、`repository_version`、`pep440_version`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 271 行；扫描到的声明包括 `load_platforms`、`runtime_suffixes`、`main`、`repository_version`、`pep440_version`、`validate_release_tag`、`copy_package`、`rewrite_version`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `build.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Run the complete repository build and bind its client artifacts to their public environment.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Run the complete repository build and bind its client artifacts to their public environment.”；固定提交中扫描到的声明包括 `runScript`、`main`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)、[scripts/pnpm-invocation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.ts)
- 对应测试：[scripts/build-exe-for-python-sdk-native-pty.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build-exe-for-python-sdk-native-pty.spec.ts)、[scripts/client-build-environment.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.client.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/client-build-environment.ts`、`scripts/pnpm-invocation.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `runScript`、`main`；源码顶部原注释（英文，仅作回查线索）：Run the complete repository build and bind its client artifacts to their public environment.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/change-scope.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `change-scope.spec.ts` 的具体场景，包括“change-scope”、“uses an explicit base on a fresh branch without a same-name remote and after its first ...”、“reports an exact head above a non-master stacked base while dirty paths remain worktree...”、“keeps committed, staged, unstaged, and untracked paths independent and does not mutate ...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“change-scope”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `git`、`gitBytes`、`write`、`fixture`、`commit`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/change-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/change-scope.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/change-scope.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 241 行；扫描到的声明包括 `git`、`gitBytes`、`write`、`fixture`、`commit`、`invoke`、`jsonReport`、`repositoryState`；扫描到的测试主题包括 “change-scope”、“uses an explicit base on a fresh branch without a same-name remote and after its first push”、“reports an exact head above a non-master stacked base while dirty paths remain worktree-local”、“keeps committed, staged, unstaged, and untracked paths independent and does not mutate state”、“rejects missing, ambiguous, and non-commit refs”、“renders deterministic versioned JSON”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/change-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/change-scope.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `change-scope.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Report the explicit committed and worktree scope of a repository change.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Report the explicit committed and worktree scope of a repository change.”；固定提交中扫描到的声明包括 `renderChangeScope`、`executeGit`、`executeGitBytes`、`decodeGitText`、`failureDetail`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/change-scope.spec.ts)
- 对应测试：[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/change-scope.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 248 行；扫描到的声明包括 `renderChangeScope`、`executeGit`、`executeGitBytes`、`decodeGitText`、`failureDetail`、`requireGit`、`requireGitBytes`、`parseOptions`；源码顶部原注释（英文，仅作回查线索）：Report the explicit committed and worktree scope of a repository change.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-expected-filenames.sh](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-expected-filenames.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `check-expected-filenames.sh` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交没有扫描到顶部注释或顶层声明，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-macos-deployment-target.py](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-macos-deployment-target.py)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `check-macos-deployment-target.py` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交中扫描到的声明包括 `parse_version`、`claimed_version`、`parse_otool_deployment_target`、`deployment_target`、`ensure_compatible`，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：固定提交中扫描到的声明包括 `parse_version`、`claimed_version`、`parse_otool_deployment_target`、`deployment_target`、`ensure_compatible`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `parse_version`、`claimed_version`、`parse_otool_deployment_target`、`deployment_target`、`ensure_compatible`、`validate_deployment_targets`、`main`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-vendor-manifest.sh](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-vendor-manifest.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Vendor 清单一致性检查器
- 这个文件有什么用：它检查 staged vendor 源码变化是否同步更新 vendor/README.md，避免来源、版本和许可证记录过期。
- 为什么这样设计：vendor 源码变更会影响许可证和来源声明，且很容易被普通代码审查漏掉；在 staged diff 上做清单门禁，能把第三方 provenance 变成发布前的强制约束。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-workspace-constraints.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `check-workspace-constraints.spec.ts` 的具体场景，包括“experimental workspace constraints”、“requires the experimental package-name prefix”、“requires private manifests without publication metadata”、“allows development and experimental consumers but rejects the Python release runtime”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“experimental workspace constraints”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Experimental-package publication and dependency constraints.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/check-workspace-constraints.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的测试主题包括 “experimental workspace constraints”、“requires the experimental package-name prefix”、“requires private manifests without publication metadata”、“allows development and experimental consumers but rejects the Python release runtime”；源码顶部原注释（英文，仅作回查线索）：Experimental-package publication and dependency constraints.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `check-workspace-constraints.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Workspace package invariant checks for package-manager-independent quality gates. Run: tsx scripts/check-workspace-constraints.ts.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Workspace package invariant checks for package-manager-independent quality gates. Run: tsx scripts/check-workspace-constraints.ts.”；固定提交中扫描到的声明包括 `PackageManifest`、`WorkspaceManifest`、`checkExperimentalManifest`、`checkExperimentalDependencyIsolation`、`main`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/project-reference-faces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-reference-faces.ts)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.ts)、[scripts/check-workspace-constraints.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.spec.ts)
- 对应测试：[scripts/check-workspace-constraints.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/project-reference-faces.ts`、`scripts/publication-payload.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 490 行；扫描到的声明包括 `PackageManifest`、`WorkspaceManifest`、`checkExperimentalManifest`、`checkExperimentalDependencyIsolation`、`main`、`readJson`、`packageDirs`、`workspaceManifests`；源码顶部原注释（英文，仅作回查线索）：Workspace package invariant checks for package-manager-independent quality gates. Run: tsx scripts/check-workspace-constraints.ts.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ci-workflow.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工作流的具体场景，包括“CI workflow”、“isolates every pnpm action setup destination per runner”、“keeps a required Wine Windows job, a non-blocking native Windows job with failover, and...”、“exempts push from cancellation in ci-master, so one master merge does not cancel the ru...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“CI workflow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `loadWorkflow`、`workflowEvent`、`workflowJob`、`isRecord`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 564 行；扫描到的声明包括 `loadWorkflow`、`workflowEvent`、`workflowJob`、`isRecord`；扫描到的测试主题包括 “CI workflow”、“isolates every pnpm action setup destination per runner”、“keeps a required Wine Windows job, a non-blocking native Windows job with failover, and a master-only standby”、“exempts push from cancellation in ci-master, so one master merge does not cancel the running drill”、“keeps supported LSP source under native Windows coverage”、“requires one release-shaped Python runtime target on every pull request”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/clean.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/clean.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `clean.spec.ts` 的具体场景，包括“RepositoryCleaner”、“derives live build outputs from project references and removes safe stale package residue”、“does not delete any target when a manifest-less package contains an unknown file”、“removes the native Landlock entry output and solution build info”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“RepositoryCleaner”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fixture`、`write`、`addProject`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/clean.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/clean.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/clean.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `fixture`、`write`、`addProject`；扫描到的测试主题包括 “RepositoryCleaner”、“derives live build outputs from project references and removes safe stale package residue”、“does not delete any target when a manifest-less package contains an unknown file”、“removes the native Landlock entry output and solution build info”、“refuses project outputs reached through a symlink outside the repository”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/clean.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/clean.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：构建产物安全清理器
- 这个文件有什么用：它根据 project-reference 图计算可删除构建产物，拒绝未知残留、跨仓库路径和危险 symlink。
- 为什么这样设计：清理构建产物具有破坏性，必须根据 project-reference 图和明确的 allow-list 删除；把 symlink、跨仓库路径和未知残留检查集中起来，避免“clean”误伤源码或别的项目。
- 文件级设计证据：固定提交中扫描到的声明包括 `RepositoryCleaner`、`isMissing`、`exists`、`childDirectories`、`repositoryPath`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)、[scripts/clean.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/clean.spec.ts)
- 对应测试：[scripts/clean.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/clean.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/ts-project.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 191 行；扫描到的声明包括 `RepositoryCleaner`、`isMissing`、`exists`、`childDirectories`、`repositoryPath`、`parseConfig`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-build-environment.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.client.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“client build environment”、“requires an exact public environment for a named artifact profile”、“inherits public values by default and isolates an explicit official profile”、“defines only public client values over a non-enumerable fallback”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“client build environment”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `write`、`buildFixture`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)、[scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/tsdown.client.ts`、`scripts/client-build-environment.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `write`、`buildFixture`；扫描到的测试主题包括 “client build environment”、“requires an exact public environment for a named artifact profile”、“inherits public values by default and isolates an explicit official profile”、“defines only public client values over a non-enumerable fallback”、“feeds the same build-process value to dynamic tsdown bundles and the Vite shell”、“binds the recorded environment to a complete set of client artifacts”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行浏览器端相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交中扫描到的声明包括 `CLIENT_BUILD_PROFILE_SELECTOR`、`CLIENT_BUILD_RECORD_PATH`、`ClientBuildEnvironment`、`repositoryCommitHash`、`officialClientBuildEnvironment`，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：固定提交中扫描到的声明包括 `CLIENT_BUILD_PROFILE_SELECTOR`、`CLIENT_BUILD_RECORD_PATH`、`ClientBuildEnvironment`、`repositoryCommitHash`、`officialClientBuildEnvironment`；本地静态 import 图显示它直接依赖 0 个源文件，并被 8 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)、[apps/web/vite.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/vite.config.ts)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/hmr-live.e2e.ts)、[scripts/client-build-environment.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.client.spec.ts)、[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 311 行；扫描到的声明包括 `CLIENT_BUILD_PROFILE_SELECTOR`、`CLIENT_BUILD_RECORD_PATH`、`ClientBuildEnvironment`、`repositoryCommitHash`、`officialClientBuildEnvironment`、`ClientBuildRecord`、`resolveClientBuildEnvironment`、`clientBuildProcessEnvironment`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-bundle-css.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-bundle-css.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、Bundle 组合的具体场景，包括“client bundle CSS Modules”、“registers the source stylesheet as a watch dependency”、“client bundle global CSS”、“compiles a side-effect stylesheet into a watched style injector”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“client bundle CSS Modules”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Stylesheets enter client bundles through virtual modules, so the loader must register their physical files as watch dependencies.”；固定提交中扫描到的声明包括 `cssPlugin`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/tsdown.client.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `cssPlugin`；扫描到的测试主题包括 “client bundle CSS Modules”、“registers the source stylesheet as a watch dependency”、“client bundle global CSS”、“compiles a side-effect stylesheet into a watched style injector”、“compiles inline stylesheets as watched text without a module side effect”；源码顶部原注释（英文，仅作回查线索）：Stylesheets enter client bundles through virtual modules, so the loader must register their physical files as watch dependencies.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-bundle-purity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-bundle-purity.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、Bundle 组合的具体场景，包括“client bundle build faces”、“watches source in development and consumes emitted JavaScript in the Client build”、“client bundle purity gate”、“leaves default externals and non-scoped specifiers alone”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“client bundle build faces”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Pins shared client-bundle preset rules: the module-edge purity gate and the physical watch dependencies hidden behind virtual CSS Modules.”；固定提交中扫描到的声明包括 `clientConfigs`、`clientSourceMapPath`、`purityResolveId`、`cssModulePlugin`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/tsdown.client.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 209 行；扫描到的声明包括 `clientConfigs`、`clientSourceMapPath`、`purityResolveId`、`cssModulePlugin`；扫描到的测试主题包括 “client bundle build faces”、“watches source in development and consumes emitted JavaScript in the Client build”、“client bundle purity gate”、“leaves default externals and non-scoped specifiers alone”、“rejects the retired web-react platform package”、“lets inline-safe wire layers inline”；源码顶部原注释（英文，仅作回查线索）：Pins shared client-bundle preset rules: the module-edge purity gate and the physical watch dependencies hidden behind virtual CSS Modules.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-tsconfig.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-tsconfig.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“client TypeScript aggregate”、“loads package CSS declarations without relying on workspace-link realpaths”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“client TypeScript aggregate”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Regression coverage for source declarations owned by the client test aggregate.”；固定提交中扫描到的声明包括 `clientCssDeclarations`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `clientCssDeclarations`；扫描到的测试主题包括 “client TypeScript aggregate”、“loads package CSS declarations without relying on workspace-link realpaths”；源码顶部原注释（英文，仅作回查线索）：Regression coverage for source declarations owned by the client test aggregate.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-config-files.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-config-files.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架的具体场景，包括“cordisConfigFiles”、“finds Loader YAML without treating translation records as configs”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“cordisConfigFiles”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-config-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-config-files.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/cordis-config-files.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的测试主题包括 “cordisConfigFiles”、“finds Loader YAML without treating translation records as configs”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-config-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-config-files.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Cordis Loader configuration file discovery.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Cordis Loader configuration file discovery.”；固定提交中扫描到的声明包括 `cordisConfigFiles`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-config-files.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-config-files.spec.ts)、[scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.ts)
- 对应测试：[scripts/cordis-config-files.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-config-files.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的声明包括 `cordisConfigFiles`；源码顶部原注释（英文，仅作回查线索）：Cordis Loader configuration file discovery.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架、API 边界的具体场景，包括“Cordis core API generation”、“renders the five detailed pages from pinned vendor declarations”、“rejects a public core class without source JSDoc”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Cordis core API generation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Tests for the generated Cordis core API reference.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/cordis-core-api.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的测试主题包括 “Cordis core API generation”、“renders the five detailed pages from pinned vendor declarations”、“rejects a public core class without source JSDoc”；源码顶部原注释（英文，仅作回查线索）：Tests for the generated Cordis core API reference.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架、API 边界相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate detailed Cordis core API pages from pinned vendor declarations.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate detailed Cordis core API pages from pinned vendor declarations.”；固定提交中扫描到的声明包括 `CordisCoreApiPage`、`CORDIS_CORE_API_PAGES`、`renderCordisCoreApiPage`、`renderCordisCoreApiPages`、`load`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-walk.ts)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/jsdoc.ts)、[scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.spec.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：[scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/cordis-walk.ts`、`scripts/jsdoc.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 433 行；扫描到的声明包括 `CordisCoreApiPage`、`CORDIS_CORE_API_PAGES`、`renderCordisCoreApiPage`、`renderCordisCoreApiPages`、`load`、`sourceJsDoc`、`signatureOf`、`headingParams`；源码顶部原注释（英文，仅作回查线索）：Generate detailed Cordis core API pages from pinned vendor declarations.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-walk.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“AST helpers shared by the Cordis generators: locate the Cordis module merge in a source file and enumerate the interface Context keys it declares. The vendored core API projector consumes the merge body; the per-subsystem region generator's exhaustiveness b...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“AST helpers shared by the Cordis generators: locate the Cordis module merge in a source file and enumerate the interface Context keys it declares. The vendored core API projector consumes the merge body; the per-subsystem region generator's exhaustiveness b...”；固定提交中扫描到的声明包括 `contextMergeFiles`、`cordisModuleBody`、`contextKeyMap`、`eventNameList`、`cordisModuleBodies`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `contextMergeFiles`、`cordisModuleBody`、`contextKeyMap`、`eventNameList`、`cordisModuleBodies`；源码顶部原注释（英文，仅作回查线索）：AST helpers shared by the Cordis generators: locate the Cordis module merge in a source file and enumerate the interface Context keys it declares. The vendored core API projector consumes the merge body; the per-subsystem region generator's exhaustiveness b...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-yaml.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-yaml.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Cordis YAML parsing and Loader-entry classification shared by repository checks. @module scripts/cordis-yaml”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Cordis YAML parsing and Loader-entry classification shared by repository checks. @module scripts/cordis-yaml”；固定提交中扫描到的声明包括 `JsExpr`、`loadCordisYaml`、`isJsExpr`、`isCordisGroupEntry`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.ts)、[scripts/verify-runtime-closure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.spec.ts)、[scripts/verify-runtime-closure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `JsExpr`、`loadCordisYaml`、`isJsExpr`、`isCordisGroupEntry`；源码顶部原注释（英文，仅作回查线索）：Cordis YAML parsing and Loader-entry classification shared by repository checks. @module scripts/cordis-yaml。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-exempt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-exempt.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `coverage-exempt.spec.ts` 的具体场景，包括“coverage-exempt roster”、“entries never overlap, so no suite is double-run or double-excluded”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“coverage-exempt roster”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Mechanical guard for the coverage-exempt roster: each entry's positional filter and exclude glob must select the same non-empty file set out of the repository's spec inventory, so a renamed suite cannot silently fall out of the uninstrumented gate while its...”；固定提交中扫描到的声明包括 `excludeMatches`、`filterMatches`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/coverage-exempt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-exempt.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/coverage-exempt.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `excludeMatches`、`filterMatches`；扫描到的测试主题包括 “coverage-exempt roster”、“entries never overlap, so no suite is double-run or double-excluded”；源码顶部原注释（英文，仅作回查线索）：Mechanical guard for the coverage-exempt roster: each entry's positional filter and exclude glob must select the same non-empty file set out of the repository's spec inventory, so a renamed suite cannot silently fall out of the uninstrumented gate while its...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-exempt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-exempt.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `coverage-exempt.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Heavy suites the coverage aggregate runs uninstrumented in a parallel gate. Membership rule: a suite qualifies only when every coverage-measured file it executes in-process (coverage.include spans package src trees; typert generator src is threshold-exclude...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Heavy suites the coverage aggregate runs uninstrumented in a parallel gate. Membership rule: a suite qualifies only when every coverage-measured file it executes in-process (coverage.include spans package src trees; typert generator src is threshold-exclude...”；固定提交中扫描到的声明包括 `CoverageExemptSuite`、`COVERAGE_EXEMPT_ENV`、`coverageExemptHeavySuites`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/coverage-exempt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-exempt.spec.ts)、[scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.ts)、[vitest.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vitest.config.ts)
- 对应测试：[scripts/coverage-exempt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-exempt.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `CoverageExemptSuite`、`COVERAGE_EXEMPT_ENV`、`coverageExemptHeavySuites`；源码顶部原注释（英文，仅作回查线索）：Heavy suites the coverage aggregate runs uninstrumented in a parallel gate. Membership rule: a suite qualifies only when every coverage-measured file it executes in-process (coverage.include spans package src trees; typert generator src is threshold-exclude...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-partitions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `coverage-partitions.spec.ts` 的具体场景，包括“coverage partition count”、“coverage partition timeout”、“applies one configured timeout to tests and polling”、“keeps Vitest defaults when the timeout is absent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“coverage partition count”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writeBlob`、`temporaryRoot`、`successfulCommandRecorder`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/coverage-partitions.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 257 行；扫描到的声明包括 `writeBlob`、`temporaryRoot`、`successfulCommandRecorder`；扫描到的测试主题包括 “coverage partition count”、“coverage partition timeout”、“applies one configured timeout to tests and polling”、“keeps Vitest defaults when the timeout is absent”、“rejects invalid timeout input”、“coverage forwarded arguments”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `coverage-partitions.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Coordinate single-worker Vitest coverage partitions and one merged report.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Coordinate single-worker Vitest coverage partitions and one merged report.”；固定提交中扫描到的声明包括 `COVERAGE_PARTITIONS_ENV`、`COVERAGE_PARTITION_MODE_ENV`、`COVERAGE_TEST_TIMEOUT_ENV`、`CoverageCommand`、`CoverageCommandResult`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/pnpm-invocation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.ts)、[scripts/coverage-partitions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.spec.ts)、[scripts/run-coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-coverage-partitions.ts)、[scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.ts)
- 对应测试：[scripts/coverage-partitions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/pnpm-invocation.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 272 行；扫描到的声明包括 `COVERAGE_PARTITIONS_ENV`、`COVERAGE_PARTITION_MODE_ENV`、`COVERAGE_TEST_TIMEOUT_ENV`、`CoverageCommand`、`CoverageCommandResult`、`CoverageCommandRunner`、`CoveragePartitionCoordinatorOptions`、`parseCoveragePartitionCount`；源码顶部原注释（英文，仅作回查线索）：Coordinate single-worker Vitest coverage partitions and one merged report.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-uncovered-locations.cjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-uncovered-locations.cjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `coverage-uncovered-locations.cjs` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交中扫描到的声明包括 `pos`、`usable`、`endSuffix`、`UncoveredLocationsReport`，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：固定提交中扫描到的声明包括 `pos`、`usable`、`endSuffix`、`UncoveredLocationsReport`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `pos`、`usable`、`endSuffix`、`UncoveredLocationsReport`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/demo-code-mode.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/demo-code-mode.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `demo-code-mode.mjs` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Boot the ACP Code Mode overlay. Requires a DeepSeek API key.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Boot the ACP Code Mode overlay. Requires a DeepSeek API key.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行；源码顶部原注释（英文，仅作回查线索）：Boot the ACP Code Mode overlay. Requires a DeepSeek API key.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/demo-cordis.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/demo-cordis.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Boot the self-referential Cordis tools under Web or ACP, defaulting to Web. This is a repository demo wrapper, not a product CLI feature.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Boot the self-referential Cordis tools under Web or ACP, defaulting to Web. This is a repository demo wrapper, not a product CLI feature.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；源码顶部原注释（英文，仅作回查线索）：Boot the self-referential Cordis tools under Web or ACP, defaulting to Web. This is a repository demo wrapper, not a product CLI feature.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/dev-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/dev-web.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Web 界面的具体场景，包括“discovers dsh.client packages with sibling roles”、“discovers client-preset packages the shell links, excluding loader-delivered and test i...”、“rebuilds a client-plugin bundle after its source changes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“discovers dsh.client packages with sibling roles”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/dev-web.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/dev-web.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/dev-web.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的测试主题包括 “discovers dsh.client packages with sibling roles”、“discovers client-preset packages the shell links, excluding loader-delivered and test infrastructure”、“rebuilds a client-plugin bundle after its source changes”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/dev-web.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/dev-web.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Web 界面相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Watch-build for the web dev loop: rebuilds every artifact the browser reads from a source edit. Reload signaling is not this script's business — the host webserver stat-polls the bundles it serves and broadcasts rebuilt frames itself (dsh web), so any proce...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Watch-build for the web dev loop: rebuilds every artifact the browser reads from a source edit. Reload signaling is not this script's business — the host webserver stat-polls the bundles it serves and broadcasts rebuilt frames itself (dsh web), so any proce...”；固定提交中扫描到的声明包括 `discoverPluginDirs`、`discoverLibraryDirs`、`watchClientPlugins`、`spawnStage`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/dev-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/dev-web.spec.ts)
- 对应测试：[scripts/dev-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/dev-web.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 238 行；扫描到的声明包括 `discoverPluginDirs`、`discoverLibraryDirs`、`watchClientPlugins`、`spawnStage`；源码顶部原注释（英文，仅作回查线索）：Watch-build for the web dev loop: rebuilds every artifact the browser reads from a source edit. Reload signaling is not this script's business — the host webserver stat-polls the bundles it serves and broadcasts rebuilt frames itself (dsh web), so any proce...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查路径的具体场景，包括“builtDeclarationPath”、“maps package source directories and exact entry files to built declarations”、“rejects aliases without a supported source target”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“builtDeclarationPath”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/doc-typecheck-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/doc-typecheck-paths.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行；扫描到的测试主题包括 “builtDeclarationPath”、“maps package source directories and exact entry files to built declarations”、“rejects aliases without a supported source target”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/doc-typecheck-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行路径相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Map one workspace source alias target to its declaration-build target.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Map one workspace source alias target to its declaration-build target.”；固定提交中扫描到的声明包括 `builtDeclarationPath`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.spec.ts)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck.ts)
- 对应测试：[scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `builtDeclarationPath`；源码顶部原注释（英文，仅作回查线索）：Map one workspace source alias target to its declaration-build target.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `doc-typecheck.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Typecheck Markdown ts fences against the workspace API. ignore-check fences are reported as opt-outs; generated catalog fragments and source-equivalence blocks are skipped here because their owning gates verify them. Byte-identical .zh.md copies reuse their...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Typecheck Markdown ts fences against the workspace API. ignore-check fences are reported as opt-outs; generated catalog fragments and source-equivalence blocks are skipped here because their owning gates verify them. Byte-identical .zh.md copies reuse their...”；固定提交中扫描到的声明包括 `extractBlocks`、`builtTypeCompilerOptions`、`compileBlocksAgainstBuiltTypes`、`formatDiagnostics`、`workspaceReferences`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/doc-typecheck-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.ts)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)、[scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.ts)
- 对应测试：[scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck-paths.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/doc-typecheck-paths.ts`、`scripts/markdown.ts`、`scripts/paired-markdown-derivatives.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 252 行；扫描到的声明包括 `extractBlocks`、`builtTypeCompilerOptions`、`compileBlocksAgainstBuiltTypes`、`formatDiagnostics`、`workspaceReferences`、`tempTsconfig`、`compileBlocksStandalone`、`remapBlockPaths`；源码顶部原注释（英文，仅作回查线索）：Typecheck Markdown ts fences against the workspace API. ignore-check fences are reported as opt-outs; generated catalog fragments and source-equivalence blocks are skipped here because their owning gates verify them. Byte-identical .zh.md copies reuse their...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“client slot contract validation”、“accepts a documented slot whose owner props resolve”、“rejects a slot with no registrant-facing prose, naming the writing template”、“rejects owner props no exported declaration provides”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“client slot contract validation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The client slot catalog's judgement, proven on hand-built inputs: the contract checks that must reject an unteachable slot, and the projection facts a registrant depends on (who occupies a seat, what replacing it costs, which owner has to be mounted). Run a...”；固定提交中扫描到的声明包括 `declaration`、`registration`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-client-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.ts)、[scripts/slot-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/slot-walk.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-client-catalog.ts`、`scripts/slot-walk.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 214 行；扫描到的声明包括 `declaration`、`registration`；扫描到的测试主题包括 “client slot contract validation”、“accepts a documented slot whose owner props resolve”、“rejects a slot with no registrant-facing prose, naming the writing template”、“rejects owner props no exported declaration provides”、“rejects the same key declared twice, because a merge would hide one contract”、“rejects a registration into an undeclared slot as a scan blind spot”；源码顶部原注释（英文，仅作回查线索）：The client slot catalog's judgement, proven on hand-built inputs: the contract checks that must reject an unteachable slot, and the projection facts a registrant depends on (who occupies a seat, what replacing it costs, which owner has to be mounted). Run a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-client-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行浏览器端相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate the model-facing client slot catalog consumed by cordis_inspect what:"client". A dynamic package's browser half can only contribute UI through ctx.slots.register, and every fact it needs to do that safely — which keys exist, what each register call...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate the model-facing client slot catalog consumed by cordis_inspect what:"client". A dynamic package's browser half can only contribute UI through ctx.slots.register, and every fact it needs to do that safely — which keys exist, what each register call...”；固定提交中扫描到的声明包括 `SlotEntry`、`collectSlotEntries`、`oversizedSlotReports`、`validateSlotContracts`、`resolveSlotEntries`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/slot-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/slot-walk.ts)、[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.spec.ts)
- 对应测试：[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/slot-walk.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 558 行；扫描到的声明包括 `SlotEntry`、`collectSlotEntries`、`oversizedSlotReports`、`validateSlotContracts`、`resolveSlotEntries`、`renderClientCatalog`、`main`、`entryLines`；源码顶部原注释（英文，仅作回查线索）：Generate the model-facing client slot catalog consumed by cordis_inspect what:"client". A dynamic package's browser half can only contribute UI through ctx.slots.register, and every fact it needs to do that safely — which keys exist, what each register call...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-config-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `gen-config-catalog.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate docs/config-catalog.md from package entry points, config types, JSDoc, and static Schemastery schemas. Every package must classify, referenced types must resolve without collisions, and every enumerable schema path must exist on the declared config...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate docs/config-catalog.md from package entry points, config types, JSDoc, and static Schemastery schemas. Every package must classify, referenced types must resolve without collisions, and every enumerable schema path must exist on the declared config...”；固定提交中扫描到的声明包括 `CatalogEntry`、`collectConfigCatalog`、`render`、`report`、`loadFile`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/jsdoc.ts)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-links.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/gen-cordis-catalog.ts`、`scripts/jsdoc.ts`、`scripts/verify-md-links.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 880 行；扫描到的声明包括 `CatalogEntry`、`collectConfigCatalog`、`render`、`report`、`loadFile`、`findTypeDecl`、`resolveTypeName`、`collectTypeNames`；源码顶部原注释（英文，仅作回查线索）：Generate docs/config-catalog.md from package entry points, config types, JSDoc, and static Schemastery schemas. Every package must classify, referenced types must resolve without collisions, and every enumerable schema path must exist on the declared config...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-api.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Cordis API 兼容入口
- 这个文件有什么用：它是统一 Typert-backed Cordis catalog 生成器的兼容命令入口；真正的提取、校验和渲染由相邻 catalog 实现完成。
- 为什么这样设计：旧命令名仍可能被 CI、文档或贡献者使用，但实现已统一到 Typert catalog；保留一个薄兼容入口，既不复制生成逻辑，也不让旧调用方式突然失效。
- 文件级设计证据：源码顶部注释把它定位为“Compatibility entry point for the unified Typert-backed Cordis catalog projection. The generated API module retains this command in its banner, while all extraction, validation, and rendering live in one implementation.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/gen-cordis-catalog.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 9 行；源码顶部原注释（英文，仅作回查线索）：Compatibility entry point for the unified Typert-backed Cordis catalog projection. The generated API module retains this command in its banner, while all extraction, validation, and rendering live in one implementation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架的具体场景，包括“walkPartitionProblems”、“accepts a partition where every declared key and event is rendered or exempted”、“rejects a declared event that is neither rendered nor exempted, naming its file”、“rejects an event exemption whose event the projection renders”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“walkPartitionProblems”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Acceptance-path coverage for the cordis-surface partition backstops (walkPartitionProblems + the AST scan helpers): a declared Context key or Events member the rendering projection cannot see must carry a named walk exemption, an exemption must stay live in...”；固定提交中扫描到的声明包括 `baseline`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-walk.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/cordis-walk.ts`、`scripts/gen-cordis-catalog.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 211 行；扫描到的声明包括 `baseline`；扫描到的测试主题包括 “walkPartitionProblems”、“accepts a partition where every declared key and event is rendered or exempted”、“rejects a declared event that is neither rendered nor exempted, naming its file”、“rejects an event exemption whose event the projection renders”、“rejects rendered surface the independent scan cannot see, naming the scan as the defect”、“rejects an event exemption no Events merge declares”；源码顶部原注释（英文，仅作回查线索）：Acceptance-path coverage for the cordis-surface partition backstops (walkPartitionProblems + the AST scan helpers): a declared Context key or Events member the rendering projection cannot see must carry a named walk exemption, an exemption must stay live in...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-record.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架的具体场景，包括“maybeRecordPair”、“re-records a region-confined write over a consistent record”、“refuses when the pair was already out of sync before the run”、“refuses a malformed record even when its hashes are current”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“maybeRecordPair”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Negative-path coverage for the guarded pair auto-record (maybeRecordPair): the safety property is that regeneration re-records a pair's .i18n.yaml ONLY for a region-confined write over a well-formed, previously-consistent record — every other state is left ...”；固定提交中扫描到的声明包括 `page`、`setup`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-cordis-catalog.ts`、`scripts/translation-pairing.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 175 行；扫描到的声明包括 `page`、`setup`；扫描到的测试主题包括 “maybeRecordPair”、“re-records a region-confined write over a consistent record”、“refuses when the pair was already out of sync before the run”、“refuses a malformed record even when its hashes are current”、“refuses a record with extra entries”、“refuses a record with a duplicated expected key”；源码顶部原注释（英文，仅作回查线索）：Negative-path coverage for the guarded pair auto-record (maybeRecordPair): the safety property is that regeneration re-records a pair's .i18n.yaml ONLY for a region-confined write over a well-formed, previously-consistent record — every other state is left ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate the per-subsystem Cordis service/event reference regions from the Typert catalog projection. Every harness ctx.<key> service and event scope maps to exactly one docs/subsystems/ page through the curated tables below; the generator injects each page...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate the per-subsystem Cordis service/event reference regions from the Typert catalog projection. Every harness ctx.<key> service and event scope maps to exactly one docs/subsystems/ page through the curated tables below; the generator injects each page...”；固定提交中扫描到的声明包括 `SERVICE_PAGE`、`SERVICE_WALK_EXEMPTIONS`、`EVENT_SCOPE_PAGE`、`EVENT_WALK_EXEMPTIONS`、`LINK_MAP`；本地静态 import 图显示它直接依赖 5 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.ts)、[scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-walk.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)
- 对应测试：[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)、[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-record.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/typert/generator/src/index.ts`、`scripts/cordis-core-api.ts`、`scripts/cordis-walk.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1014 行；扫描到的声明包括 `SERVICE_PAGE`、`SERVICE_WALK_EXEMPTIONS`、`EVENT_SCOPE_PAGE`、`EVENT_WALK_EXEMPTIONS`、`LINK_MAP`、`FOUNDATION_TYPE_NAMES`、`TYPE_LINK_EXEMPTIONS`、`CORDIS_CATALOG_POLICY`；源码顶部原注释（英文，仅作回查线索）：Generate the per-subsystem Cordis service/event reference regions from the Typert catalog projection. Every harness ctx.<key> service and event scope maps to exactly one docs/subsystems/ page through the curated tables below; the generator injects each page...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-inspect-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-inspect-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate model-visible Host/Client Service and Event inspect catalogs.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate model-visible Host/Client Service and Event inspect catalogs.”；固定提交中扫描到的声明包括 `methodName`、`clientModel`、`main`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/typert/generator/src/index.ts`、`scripts/gen-cordis-catalog.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `methodName`、`clientModel`、`main`；源码顶部原注释（英文，仅作回查线索）：Generate model-visible Host/Client Service and Event inspect catalogs.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `gen-doc-graphs.spec.ts` 的具体场景，包括“event relation call-site indexing”、“recovers a proven-local helper through the single-file fast path”、“recovers an alias-escaped helper through the global fallback”、“rejects the locality proof for global script files”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“event relation call-site indexing”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Tests for the event-relation collector's demand-driven call-site indexing: the single-file fast path and the global fallback must recover the same helper-parameter event names, including shapes that defeat the locality proof (alias escapes and global script...”；固定提交中扫描到的声明包括 `dispatchersOf`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.ts)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-doc-graphs.ts`、`scripts/ts-project.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `dispatchersOf`；扫描到的测试主题包括 “event relation call-site indexing”、“recovers a proven-local helper through the single-file fast path”、“recovers an alias-escaped helper through the global fallback”、“rejects the locality proof for global script files”；源码顶部原注释（英文，仅作回查线索）：Tests for the event-relation collector's demand-driven call-site indexing: the single-file fast path and the global fallback must recover the same helper-parameter event names, including shapes that defeat the locality proof (alias escapes and global script...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `gen-doc-graphs.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate the relationship layer above the module, Cordis, and tool catalogs. Enumerable facts come from source; hybrid graphs add manifests for policy the source cannot infer, while curated graphs explain flow and ownership. --check verifies the generated set.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate the relationship layer above the module, Cordis, and tool catalogs. Enumerable facts come from source; hybrid graphs add manifests for policy the source cannot infer, while curated graphs explain flow and ownership. --check verifies the generated set.”；固定提交中扫描到的声明包括 `PackageSource`、`EventRelationCollector`、`collectPackageSources`、`generatedHeader`、`maintenanceFooter`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)、[scripts/package-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-graph.ts)、[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)
- 对应测试：[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/typert/generator/src/index.ts`、`scripts/gen-cordis-catalog.ts`、`scripts/package-graph.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1487 行；扫描到的声明包括 `PackageSource`、`EventRelationCollector`、`collectPackageSources`、`generatedHeader`、`maintenanceFooter`、`graphIndexLink`、`linkFromDoc`、`mermaidCode`；源码顶部原注释（英文，仅作回查线索）：Generate the relationship layer above the module, Cordis, and tool catalogs. Enumerable facts come from source; hybrid graphs add manifests for policy the source cannot infer, while curated graphs explain flow and ownership. --check verifies the generated set.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-module-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-module-graph.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `gen-module-graph.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate docs/module-graph.md from in-repo peerDependencies, the canonical runtime edges. The deterministic output groups packages by directory and renders both Mermaid and a dependency table; --check verifies freshness.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate docs/module-graph.md from in-repo peerDependencies, the canonical runtime edges. The deterministic output groups packages by directory and renders both Mermaid and a dependency table; --check verifies freshness.”；固定提交中扫描到的声明包括 `packageLink`、`render`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/package-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-graph.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/package-graph.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 119 行；扫描到的声明包括 `packageLink`、`render`；源码顶部原注释（英文，仅作回查线索）：Generate docs/module-graph.md from in-repo peerDependencies, the canonical runtime edges. The deterministic output groups packages by directory and renders both Mermaid and a dependency table; --check verifies freshness.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-persistence-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行持久化相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate docs/persistence-catalog.md from every SessionEventMap merge and the owning event-envelope types. This is the durable-record vocabulary, not the live Cordis bus. Event declarations must be unique, explicitly typed, documented, inheritance-free, and...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate docs/persistence-catalog.md from every SessionEventMap merge and the owning event-envelope types. This is the durable-record vocabulary, not the live Cordis bus. Event declarations must be unique, explicitly typed, documented, inheritance-free, and...”；固定提交中扫描到的声明包括 `LogEventEntry`、`AnnotatedLogEventEntry`、`EventEnvelopeTypeEntry`、`collectLogEvents`、`collectEventEnvelopeTypes`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/jsdoc.ts)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-links.ts)、[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/gen-persistence-catalog.spec.ts)
- 对应测试：[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/gen-persistence-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/jsdoc.ts`、`scripts/verify-md-links.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 472 行；扫描到的声明包括 `LogEventEntry`、`AnnotatedLogEventEntry`、`EventEnvelopeTypeEntry`、`collectLogEvents`、`collectEventEnvelopeTypes`、`collectSurfaceEventTypes`、`annotateSurface`、`render`；源码顶部原注释（英文，仅作回查线索）：Generate docs/persistence-catalog.md from every SessionEventMap merge and the owning event-envelope types. This is the durable-record vocabulary, not the live Cordis bus. Event declarations must be unique, explicitly typed, documented, inheritance-free, and...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-scoped-events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-scoped-events.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行事件相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Generate dsh-scope's invariant resolver map from the repository TypeScript Program. A scoped event declares this: Scoped<Base>. Real scopeTarget(base, key) calls establish the routing-key type for that base. The generator searches every event payload parame...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Generate dsh-scope's invariant resolver map from the repository TypeScript Program. A scoped event declares this: Scoped<Base>. Real scopeTarget(base, key) calls establish the routing-key type for that base. The generator searches every event payload parame...”；固定提交中扫描到的声明包括 `renderScopedEvents`、`ScopedEventGenerator`、`isCordisModuleInterface`、`isThisParameter`、`parseScopeTag`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/jsdoc.ts)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/jsdoc.ts`、`scripts/ts-project.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 399 行；扫描到的声明包括 `renderScopedEvents`、`ScopedEventGenerator`、`isCordisModuleInterface`、`isThisParameter`、`parseScopeTag`、`hasNonPublicDeclaration`、`dedupeCandidates`、`quote`；源码顶部原注释（英文，仅作回查线索）：Generate dsh-scope's invariant resolver map from the repository TypeScript Program. A scoped event declares this: Scoped<Base>. Real scopeTarget(base, key) calls establish the routing-key type for that base. The generator searches every event payload parame...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-third-party-notices.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-third-party-notices.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `gen-third-party-notices.spec.ts` 的具体场景，包括“THIRD_PARTY_NOTICES.md”、“matches what the generator produces from the current manifests”、“tierExternalDeps”、“tiers by declaring area, not by the declaring section name”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“THIRD_PARTY_NOTICES.md”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `workspace`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-third-party-notices.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-third-party-notices.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-third-party-notices.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 345 行；扫描到的声明包括 `workspace`；扫描到的测试主题包括 “THIRD_PARTY_NOTICES.md”、“matches what the generator produces from the current manifests”、“tierExternalDeps”、“tiers by declaring area, not by the declaring section name”、“keeps a package runtime when any shipping area declares it, and excludes workspace links”、“virtualManifest”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-third-party-notices.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-third-party-notices.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：第三方许可证声明生成器
- 这个文件有什么用：它从 npm、Python metadata、vendor manifest 和 SPDX 信息生成发布所需的第三方声明。
- 为什么这样设计：发布声明需要合并 npm、Python、vendor 和 SPDX 多种元数据；生成器把来源转换成可重复的 notices，避免人工复制遗漏许可证或版本。
- 文件级设计证据：源码顶部注释把它定位为“Generate THIRD_PARTY_NOTICES.md from the workspace manifests: every external dependency named by a workspace package.json, the vendored-package manifest in vendor/README.md, the Python pyproject.toml files, and the pnpm patch list. License and repository me...”；固定提交中扫描到的声明包括 `CLAUDE_AGENT_SDK_PACKAGE`、`isOwnerAuthorizedRuntime`、`Manifest`、`manifestPatterns`、`ClaudePlatformPayload`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-third-party-notices.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-third-party-notices.spec.ts)
- 对应测试：[scripts/gen-third-party-notices.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-third-party-notices.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 774 行；扫描到的声明包括 `CLAUDE_AGENT_SDK_PACKAGE`、`isOwnerAuthorizedRuntime`、`Manifest`、`manifestPatterns`、`ClaudePlatformPayload`、`ClaudeDistribution`、`claudeDistributionFromManifest`、`virtualManifest`；源码顶部原注释（英文，仅作回查线索）：Generate THIRD_PARTY_NOTICES.md from the workspace manifests: every external dependency named by a workspace package.json, the vendored-package manifest in vendor/README.md, the Python pyproject.toml files, and the pnpm patch list. License and repository me...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-tool-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-tool-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：工具 schema 文档生成器
- 这个文件有什么用：它启动各工具插件收集运行时计算出的 schema，生成 `docs/tool-catalog.md`，并检查清单是否覆盖磁盘上的 `tool-*` 包。
- 为什么这样设计：工具 schema 可能由插件启动时计算出来，静态读取源码并不能代表运行时结果；生成器从真实注册流程收集 schema，再与磁盘包 manifest 对照，文档才不会漏掉动态能力。
- 文件级设计证据：源码顶部注释把它定位为“Generate docs/tool-catalog.md from schemas collected by booting each tool plugin. Runtime registration is the source of truth for computed schemas; the manifest is checked against every on-disk tool-* package. --check verifies the committed artifact. Ration...”；固定提交中扫描到的声明包括 `ToolPackage`、`ToolCatalog`、`assertManifestComplete`、`assertToolsHarvested`、`collectToolCatalog`；本地静态 import 图显示它直接依赖 56 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/scope/src/index.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)
- 对应测试：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/attachment/attachment/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 814 行；扫描到的声明包括 `ToolPackage`、`ToolCatalog`、`assertManifestComplete`、`assertToolsHarvested`、`collectToolCatalog`、`render`、`CatalogAttachmentStore`、`registerCatalogSubagentProvider`；源码顶部原注释（英文，仅作回查线索）：Generate docs/tool-catalog.md from schemas collected by booting each tool plugin. Runtime registration is the source of truth for computed schemas; the manifest is checked against every on-disk tool-* package. --check verifies the committed artifact. Ration...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-translation-brief.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `gen-translation-brief.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Print the minimal-update briefing for out-of-sync translation pairs: pnpm run gen-translation-brief --apply pair paths.... With no arguments it discovers every out-of-sync pair; with arguments (any file of a pair) it briefs exactly those pairs and fails lou...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Print the minimal-update briefing for out-of-sync translation pairs: pnpm run gen-translation-brief --apply pair paths.... With no arguments it discovers every out-of-sync pair; with arguments (any file of a pair) it briefs exactly those pairs and fails lou...”；固定提交中扫描到的声明包括 `isExcluded`、`parseMeta`、`git`、`blobText`、`diffTexts`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.ts)
- 对应测试：[scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-brief.ts`、`scripts/translation-pairing.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 316 行；扫描到的声明包括 `isExcluded`、`parseMeta`、`git`、`blobText`、`diffTexts`、`loadPair`、`bundlesFor`、`planScope`；源码顶部原注释（英文，仅作回查线索）：Print the minimal-update briefing for out-of-sync translation pairs: pnpm run gen-translation-brief --apply pair paths.... With no arguments it discovers every out-of-sync pair; with arguments (any file of a pair) it briefs exactly those pairs and fails lou...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/install-lefthook.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/install-lefthook.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `install-lefthook.mjs` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交中扫描到的声明包括 `errorCode`、`commandFailure`、`capture`、`git`、`nulValues`，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：固定提交中扫描到的声明包括 `errorCode`、`commandFailure`、`capture`、`git`、`nulValues`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：[scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/install-lefthook.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 845 行；扫描到的声明包括 `errorCode`、`commandFailure`、`capture`、`git`、`nulValues`、`stripGitLineTerminator`、`directFileConfigValues`、`parseFileConfigEntries`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/install-lefthook.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `install-lefthook.spec.ts` 的具体场景，包括“worktree-local Lefthook installer”、“skips hook installation when ${label} marks an automated job”、“isolates main and linked worktrees without changing legacy common hooks”、“replaces the owned hook path Git copies into a newly added worktree”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“worktree-local Lefthook installer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `commandResult`、`gitResult`、`git`、`write`、`fakeLefthookSource`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-fixture-cleanup.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/test-fixture-cleanup.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 876 行；扫描到的声明包括 `commandResult`、`gitResult`、`git`、`write`、`fakeLefthookSource`、`installFakeLefthook`、`installPairingProbeFixture`、`createFixture`；扫描到的测试主题包括 “worktree-local Lefthook installer”、“skips hook installation when ${label} marks an automated job”、“isolates main and linked worktrees without changing legacy common hooks”、“replaces the owned hook path Git copies into a newly added worktree”、“serializes concurrent installs and keeps repeated output stable”、“waits for a concurrent installer to finish publishing its lock record”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/jsdoc.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `jsdoc.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Shared JSDoc parsing and completeness checks for the Cordis, persistence, and config catalogs and the exported-API gate.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Shared JSDoc parsing and completeness checks for the Cordis, persistence, and config catalogs and the exported-API gate.”；固定提交中扫描到的声明包括 `pointer`、`rawJsDoc`、`Mode`、`parseJsDoc`、`parseTags`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.ts)、[scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-config-catalog.ts)、[scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-persistence-catalog.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/verify-export-jsdoc.spec.ts)、[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/gen-persistence-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)、[scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-core-api.spec.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `pointer`、`rawJsDoc`、`Mode`、`parseJsDoc`、`parseTags`、`checkParams`、`checkReturns`、`reportViolations`；源码顶部原注释（英文，仅作回查线索）：Shared JSDoc parsing and completeness checks for the Cordis, persistence, and config catalogs and the exported-API gate.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/lint-rule-fingerprint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/lint-rule-fingerprint.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `lint-rule-fingerprint.spec.ts` 的具体场景，包括“Oxlint repository rule fingerprint”、“pins every override field”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Oxlint repository rule fingerprint”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `isRecord`、`isUnknownArray`、`severity`、`normalizedRules`、`mergedRules`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `isRecord`、`isUnknownArray`、`severity`、`normalizedRules`、`mergedRules`；扫描到的测试主题包括 “Oxlint repository rule fingerprint”、“pins every override field”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/locale-dictionary-parity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/locale-dictionary-parity.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查本地化的具体场景，包括“shipped locale dictionaries”、“declares the same keys in zh and en, so the single fallback locale always resolves”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“shipped locale dictionaries”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Gate for the invariant FALLBACK_LOCALE rests on: every shipped dictionary declares the same keys in zh and en. The locale runtime resolves a key through the active locale, then through the single fallback locale (en), then surfaces the key itself. With symm...”；固定提交中扫描到的声明包括 `relative`、`sourceFiles`、`directories`、`readEntries`、`walk`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 308 行；扫描到的声明包括 `relative`、`sourceFiles`、`directories`、`readEntries`、`walk`、`dictionariesIn`、`keysOf`、`unwrap`；扫描到的测试主题包括 “shipped locale dictionaries”、“declares the same keys in zh and en, so the single fallback locale always resolves”；源码顶部原注释（英文，仅作回查线索）：Gate for the invariant FALLBACK_LOCALE rests on: every shipped dictionary declares the same keys in zh and en. The locale runtime resolves a key through the active locale, then through the single fallback locale (en), then surfaces the key itself. With symm...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `markdown.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Shared Markdown parsing and depth-first traversal for documentation gates.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Shared Markdown parsing and depth-first traversal for documentation gates.”；固定提交中扫描到的声明包括 `MarkdownProseLine`、`MarkdownHeadingLine`、`MarkdownFence`、`parseMarkdown`、`visitMarkdown`；本地静态 import 图显示它直接依赖 0 个源文件，并被 8 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck.ts)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.ts)、[scripts/translation-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/tests/gen-persistence-catalog.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)、[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-record.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 271 行；扫描到的声明包括 `MarkdownProseLine`、`MarkdownHeadingLine`、`MarkdownFence`、`parseMarkdown`、`visitMarkdown`、`MarkdownDestinationNode`、`MarkdownDestination`、`isExternalOrAbsoluteMarkdownUrl`；源码顶部原注释（英文，仅作回查线索）：Shared Markdown parsing and depth-first traversal for documentation gates.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/merge-translation-pairing-driver.sh](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/merge-translation-pairing-driver.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `merge-translation-pairing-driver.sh` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交没有扫描到顶部注释或顶层声明，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/merge-translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/merge-translation-pairing.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `merge-translation-pairing.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Git merge-driver and explicit conflict-resolver entrypoint for pairing records.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Git merge-driver and explicit conflict-resolver entrypoint for pairing records.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.ts)
- 对应测试：[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-pairing-merge.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；源码顶部原注释（英文，仅作回查线索）：Git merge-driver and explicit conflict-resolver entrypoint for pairing records.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/migrate-packed-session-fixtures.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/migrate-packed-session-fixtures.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行会话相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Temporary branch-convergence command for canonical projected session fixtures. @see ../.agents/notes/proposed/process/2026-07-26-remove-packed-session-fixture-migrator.md”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Temporary branch-convergence command for canonical projected session fixtures. @see ../.agents/notes/proposed/process/2026-07-26-remove-packed-session-fixture-migrator.md”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/session-fixture-layout.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；源码顶部原注释（英文，仅作回查线索）：Temporary branch-convergence command for canonical projected session fixtures. @see ../.agents/notes/proposed/process/2026-07-26-remove-packed-session-fixture-migrator.md。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/oxlint-contract.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/oxlint-contract.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `oxlint-contract.spec.ts` 的具体场景，包括“Oxlint executable contract”、“discovers the owning TypeScript project for every file class”、“runs JavaScript compatibility and nursery rules”、“keeps the complete stylistic contract in Oxlint”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Oxlint executable contract”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `secondProbe`、`hasValue`、`longProbe`、`isRecord`、`isUnknownArray`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 376 行；扫描到的声明包括 `secondProbe`、`hasValue`、`longProbe`、`isRecord`、`isUnknownArray`、`runRepositoryOxlint`、`runOxlint`、`normalizedOutput`；扫描到的测试主题包括 “Oxlint executable contract”、“discovers the owning TypeScript project for every file class”、“runs JavaScript compatibility and nursery rules”、“keeps the complete stylistic contract in Oxlint”、“checks preserved TypeGraph syntax without type-aware analysis”、“keeps repository lint workflows Oxlint-only”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/package-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-graph.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `package-graph.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Shared workspace-package graph discovery and Mermaid identifier helpers for the generated module graph and relationship-diagram generators. Each caller supplies its own group ordering because the documents use different visual priorities; manifest parsing a...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Shared workspace-package graph discovery and Mermaid identifier helpers for the generated module graph and relationship-diagram generators. Each caller supplies its own group ordering because the documents use different visual priorities; manifest parsing a...”；固定提交中扫描到的声明包括 `PackageGraphNode`、`collectPackageGraph`、`graphNodeId`、`escapeMermaidLabel`、`topoSort`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.ts)、[scripts/gen-module-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-module-graph.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `PackageGraphNode`、`collectPackageGraph`、`graphNodeId`、`escapeMermaidLabel`、`topoSort`、`comparePackages`；源码顶部原注释（英文，仅作回查线索）：Shared workspace-package graph discovery and Mermaid identifier helpers for the generated module graph and relationship-diagram generators. Each caller supplies its own group ordering because the documents use different visual priorities; manifest parsing a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `package-invariants.spec.ts` 的具体场景，包括“package invariant gate”、“accepts a hand-owned checking companion with publication metadata”、“accepts an invariant reference owned by a package-local leaf project”、“rejects missing publication metadata and build output”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“package invariant gate”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`handwrittenInvariant`、`fixture`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/package-invariants.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `name`、`inject`、`apply`、`handwrittenInvariant`、`fixture`；扫描到的测试主题包括 “package invariant gate”、“accepts a hand-owned checking companion with publication metadata”、“accepts an invariant reference owned by a package-local leaf project”、“rejects missing publication metadata and build output”、“rejects foreign, duplicate, and unresolved registrations”、“rejects generated markers and reporter-free executable installers”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `package-invariants.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Package-invariant companion discovery and structural checks. The runtime registry stays product-independent; this gate makes ownership exhaustive across packages without centralizing package checks.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Package-invariant companion discovery and structural checks. The runtime registry stays product-independent; this gate makes ownership exhaustive across packages without centralizing package checks.”；固定提交中扫描到的声明包括 `PackageInvariantOwner`、`PackageInvariantViolation`、`packageInvariantOwners`、`collectPackageInvariantViolations`、`formatPackageInvariantViolation`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.spec.ts)、[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.spec.ts)、[scripts/verify-package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-package-invariants.ts)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.spec.ts)、[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 362 行；扫描到的声明包括 `PackageInvariantOwner`、`PackageInvariantViolation`、`packageInvariantOwners`、`collectPackageInvariantViolations`、`formatPackageInvariantViolation`、`readManifest`、`addViolation`、`checkManifest`；源码顶部原注释（英文，仅作回查线索）：Package-invariant companion discovery and structural checks. The runtime registry stays product-independent; this gate makes ownership exhaustive across packages without centralizing package checks.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/paired-markdown-derivatives.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `paired-markdown-derivatives.spec.ts` 的具体场景，包括“partitionPairedMarkdownDerivatives”、“treats a complete byte-identical Chinese sequence as derivative”、“keeps reordered, changed, partial, and orphan Chinese sequences primary”、“requires the fence kind to match as well as the body”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“partitionPairedMarkdownDerivatives”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/paired-markdown-derivatives.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的测试主题包括 “partitionPairedMarkdownDerivatives”、“treats a complete byte-identical Chinese sequence as derivative”、“keeps reordered, changed, partial, and orphan Chinese sequences primary”、“requires the fence kind to match as well as the body”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `paired-markdown-derivatives.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Separate byte-identical Chinese Markdown code blocks from the primary checks performed on their unsuffixed English siblings. The bilingual pairing gate owns cross-language identity; source-oriented gates consume one copy.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Separate byte-identical Chinese Markdown code blocks from the primary checks performed on their unsuffixed English siblings. The bilingual pairing gate owns cross-language identity; source-oriented gates consume one copy.”；固定提交中扫描到的声明包括 `MarkdownDerivativePartition`、`partitionPairedMarkdownDerivatives`、`unsuffixedSibling`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck.ts)、[scripts/paired-markdown-derivatives.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.spec.ts)、[scripts/verify-type-equiv.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-type-equiv.ts)
- 对应测试：[scripts/paired-markdown-derivatives.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `MarkdownDerivativePartition`、`partitionPairedMarkdownDerivatives`、`unsuffixedSibling`；源码顶部原注释（英文，仅作回查线索）：Separate byte-identical Chinese Markdown code blocks from the primary checks performed on their unsuffixed English siblings. The bilingual pairing gate owns cross-language identity; source-oriented gates consume one copy.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/pnpm-invocation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `pnpm-invocation.spec.ts` 的具体场景，包括“pnpm invocation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“pnpm invocation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/pnpm-invocation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/pnpm-invocation.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的测试主题包括 “pnpm invocation”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/pnpm-invocation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `pnpm-invocation.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Resolve shell-free child-process invocations for the pnpm process that launched a package script.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Resolve shell-free child-process invocations for the pnpm process that launched a package script.”；固定提交中扫描到的声明包括 `pnpmInvocation`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/build.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/build.ts)、[scripts/coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.ts)、[scripts/pnpm-invocation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.spec.ts)
- 对应测试：[scripts/pnpm-invocation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `pnpmInvocation`；源码顶部原注释（英文，仅作回查线索）：Resolve shell-free child-process invocations for the pnpm process that launched a package script.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/prepare-ci-bubblewrap.sh](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/prepare-ci-bubblewrap.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `prepare-ci-bubblewrap.sh` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交没有扫描到顶部注释或顶层声明，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `project-doc-site.spec.ts` 的具体场景，包括“website source layout”、“rejects Markdown outside the subtree instructions”、“contains no tracked or unignored documentation copies”、“publishableImage”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“website source layout”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Tests for the documentation website projection adapter.”；固定提交中扫描到的声明包括 `unexpectedWebsiteMarkdown`、`fixture`、`mirrorDir`、`relativeTargets`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.ts)、[website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/website/docs.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/project-doc-site.ts`、`website/docs.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 768 行；扫描到的声明包括 `unexpectedWebsiteMarkdown`、`fixture`、`mirrorDir`、`relativeTargets`；扫描到的测试主题包括 “website source layout”、“rejects Markdown outside the subtree instructions”、“contains no tracked or unignored documentation copies”、“publishableImage”、“accepts a regular file inside the repository”、“refuses a target whose real path escapes the repository”；源码顶部原注释（英文，仅作回查线索）：Tests for the documentation website projection adapter.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：文档网站投影器
- 这个文件有什么用：它把 canonical Markdown 投影成 VitePress 文档树，并重写链接、图片和 frontmatter。
- 为什么这样设计：网站是 canonical Markdown 的投影，不应反过来成为文档真源；单独的投影器集中处理链接、图片和 frontmatter，网站结构调整不会修改作者维护的原文。
- 文件级设计证据：源码顶部注释把它定位为“Build-time projection from canonical repository Markdown into VitePress. The generated tree is disposable: sources stay in their owning docs/ tier, while this adapter rewrites cross-source links for the public site. The same projection also emits a raw-Mark...”；固定提交中扫描到的声明包括 `resolveRepositoryRef`、`RewriteMarkdownOptions`、`rewriteMarkdown`、`addProjectionFrontmatter`、`projectedPageContent`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)、[website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/website/docs.ts)、[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.spec.ts)、[scripts/verify-doc-site-fragments.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-site-fragments.ts)
- 对应测试：[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts`、`website/docs.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 575 行；扫描到的声明包括 `resolveRepositoryRef`、`RewriteMarkdownOptions`、`rewriteMarkdown`、`addProjectionFrontmatter`、`projectedPageContent`、`publishableImage`、`docsSourceFiles`、`ProjectionContext`；源码顶部原注释（英文，仅作回查线索）：Build-time projection from canonical repository Markdown into VitePress. The generated tree is disposable: sources stay in their owning docs/ tier, while this adapter rewrites cross-source links for the public site. The same projection also emits a raw-Mark...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-reference-faces.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-reference-faces.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `project-reference-faces.spec.ts` 的具体场景，包括“Project Reference compiler faces”、“allows neutral projects in either graph and matching split leaves”、“rejects the opposite leaf and the solution root of a split project”、“uses the referencing project face throughout the reachable graph”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Project Reference compiler faces”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writeJson`、`workspaceFixture`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/project-reference-faces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-reference-faces.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/project-reference-faces.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `writeJson`、`workspaceFixture`；扫描到的测试主题包括 “Project Reference compiler faces”、“allows neutral projects in either graph and matching split leaves”、“rejects the opposite leaf and the solution root of a split project”、“uses the referencing project face throughout the reachable graph”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-reference-faces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-reference-faces.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `project-reference-faces.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Validate compiler-face isolation across workspace Project Reference graphs.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Validate compiler-face isolation across workspace Project Reference graphs.”；固定提交中扫描到的声明包括 `collectProjectReferenceFaceViolations`、`splitProjectRoots`、`projectConfig`、`projectReferences`、`projectFace`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.ts)、[scripts/project-reference-faces.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-reference-faces.spec.ts)
- 对应测试：[scripts/project-reference-faces.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-reference-faces.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `collectProjectReferenceFaceViolations`、`splitProjectRoots`、`projectConfig`、`projectReferences`、`projectFace`、`localExtendsConfig`、`referenceConfigPath`、`containingSplitRoot`；源码顶部原注释（英文，仅作回查线索）：Validate compiler-face isolation across workspace Project Reference graphs.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publication-payload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `publication-payload.spec.ts` 的具体场景，包括“publication payload policy”、“rejects source members in packed tarballs”、“rejects source maps in packed tarballs”、“accepts a clean packed tarball”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“publication payload policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `validateFixtureTarball`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/publication-payload.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `validateFixtureTarball`；扫描到的测试主题包括 “publication payload policy”、“rejects source members in packed tarballs”、“rejects source maps in packed tarballs”、“accepts a clean packed tarball”、“recognizes only the canonical Host-for-Client export pair”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `publication-payload.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Publication payload policy shared by static manifests and packed tarballs.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Publication payload policy shared by static manifests and packed tarballs.”；固定提交中扫描到的声明包括 `hasTypertRemoteNavigation`、`isForbiddenPublicationFile`、`validateTarballPayload`、`payloadPath`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/check-workspace-constraints.ts)、[scripts/publication-payload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.spec.ts)、[scripts/publish-npm-baseline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publish-npm-baseline.ts)
- 对应测试：[scripts/publication-payload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `hasTypertRemoteNavigation`、`isForbiddenPublicationFile`、`validateTarballPayload`、`payloadPath`；源码顶部原注释（英文，仅作回查线索）：Publication payload policy shared by static manifests and packed tarballs.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publint-all.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publint-all.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `publint-all.spec.ts` 的具体场景，包括“publint package runner”、“lints recursively declared files from an in-memory publication view”、“rejects an export that exists in the workspace but is not published”、“rejects a public export whose built file is missing”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“publint package runner”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fixture`、`run`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `fixture`、`run`；扫描到的测试主题包括 “publint package runner”、“lints recursively declared files from an in-memory publication view”、“rejects an export that exists in the workspace but is not published”、“rejects a public export whose built file is missing”、“accepts published relative JavaScript and CSS targets”、“rejects unpublished relative JavaScript and CSS targets”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publint-all.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publint-all.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `publint-all.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Run publint over the exact manifest-declared publication view of every package.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Run publint over the exact manifest-declared publication view of every package.”；固定提交中扫描到的声明包括 `workspacePackages`、`publintConcurrency`、`publicationFiles`、`addPath`、`publicationClosureViolations`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：[scripts/publint-all.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publint-all.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `workspacePackages`、`publintConcurrency`、`publicationFiles`、`addPath`、`publicationClosureViolations`、`resolutionCandidates`、`relativeImports`、`runPublint`；源码顶部原注释（英文，仅作回查线索）：Run publint over the exact manifest-declared publication view of every package.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publish-npm-baseline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publish-npm-baseline.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `publish-npm-baseline.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Build, publish, and verify one commit-addressed npm workspace baseline.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Build, publish, and verify one commit-addressed npm workspace baseline.”；固定提交中扫描到的声明包括 `BaselinePackPlan`、`CommandRunner`、`DetachedWorktree`、`WorkspacePackageSet`、`ReleaseBundle`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/publication-payload.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1083 行；扫描到的声明包括 `BaselinePackPlan`、`CommandRunner`、`DetachedWorktree`、`WorkspacePackageSet`、`ReleaseBundle`、`InstalledBundleSmoke`、`BaselinePackager`、`RegistryPublication`；扫描到的测试主题包括 “${result.stdout}\n${result.stderr}”；源码顶部原注释（英文，仅作回查线索）：Build, publish, and verify one commit-addressed npm workspace baseline.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/bump.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `release/bump.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Bump one release family's version and commit it, so the published version is readable from the repository rather than derived inside CI (rationale). The dsh family shares one version across its publishable members, private package manifests, and the workspa...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Bump one release family's version and commit it, so the published version is readable from the repository rather than derived inside CI (rationale). The dsh family shares one version across its publishable members, private package manifests, and the workspa...”；固定提交中扫描到的声明包括 `compareVersions`、`nextVendorVersion`、`reachesPayload`、`planShared`、`releaseNumbers`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)、[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/release/families.ts`、`scripts/release/process.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 419 行；扫描到的声明包括 `compareVersions`、`nextVendorVersion`、`reachesPayload`、`planShared`、`releaseNumbers`、`compareReleaseNumbers`、`prereleaseOf`、`nextSharedVersion`；源码顶部原注释（英文，仅作回查线索）：Bump one release family's version and commit it, so the published version is readable from the repository rather than derived inside CI (rationale). The dsh family shares one version across its publishable members, private package manifests, and the workspa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `release/families.spec.ts` 的具体场景，包括“release families”、“excludes private experimental packages from the dsh release”、“bumps private dsh packages without adding release tags”、“names one tag for the whole dsh family and one per vendored package”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“release families”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Release family discovery, publish order, tag naming, and the bump judgements.”；固定提交中扫描到的声明包括 `member`、`write`、`buildFixture`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)、[scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/bump.ts)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/client-build-environment.ts`、`scripts/release/bump.ts`、`scripts/release/families.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 329 行；扫描到的声明包括 `member`、`write`、`buildFixture`；扫描到的测试主题包括 “release families”、“excludes private experimental packages from the dsh release”、“bumps private dsh packages without adding release tags”、“names one tag for the whole dsh family and one per vendored package”、“rejects a family whose members disagree on the shared version”、“accepts independent vendored versions and rejects an unpublishable one”；源码顶部原注释（英文，仅作回查线索）：Release family discovery, publish order, tag naming, and the bump judgements.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `release/families.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“The three independent publish sequences this repository releases from (packages/ + apps/, vendor/, and native/) and the two this module owns: dsh and vendor. Each family carries its own version baseline, tag naming, and publish set, so releasing one never r...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“The three independent publish sequences this repository releases from (packages/ + apps/, vendor/, and native/) and the two this module owns: dsh and vendor. Each family carries its own version baseline, tag naming, and publish set, so releasing one never r...”；固定提交中扫描到的声明包括 `PublishPlan`、`ReleaseMember`、`InstalledEntry`、`releaseFamily`、`tarballName`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/publication-payload.ts)、[scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/bump.ts)、[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/client-build-environment.ts`、`scripts/publication-payload.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 436 行；扫描到的声明包括 `PublishPlan`、`ReleaseMember`、`InstalledEntry`、`releaseFamily`、`tarballName`、`readManifest`、`requireString`、`DshFamily`；源码顶部原注释（英文，仅作回查线索）：The three independent publish sequences this repository releases from (packages/ + apps/, vendor/, and native/) and the two this module owns: dsh and vendor. Each family carries its own version baseline, tag naming, and publish set, so releasing one never r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/pack.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `release/pack.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Pack one release family's whole publish set into a single directory, in publish order, and record that order for the publish step. The pack step is the release boundary: it runs without credentials, produces every tarball from one commit, and hands the publ...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Pack one release family's whole publish set into a single directory, in publish order, and record that order for the publish step. The pack step is the release boundary: it runs without credentials, produces every tarball from one commit, and hands the publ...”；固定提交中扫描到的声明包括 `packMember`、`main`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)、[scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/tarball.ts)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.spec.ts)、[scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-built-package-invariants.spec.ts)、[scripts/verify-client-packages.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/release/families.ts`、`scripts/release/process.ts`、`scripts/release/tarball.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `packMember`、`main`；源码顶部原注释（英文，仅作回查线索）：Pack one release family's whole publish set into a single directory, in publish order, and record that order for the publish step. The pack step is the release boundary: it runs without credentials, produces every tarball from one commit, and hands the publ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布命令执行器
- 这个文件有什么用：它提供 attempt、capture、run 和 isEntry 等发布命令执行辅助，统一输出、失败和重试边界。
- 为什么这样设计：发布命令执行需要统一捕获 stdout/stderr、退出码、重试和入口判断；将进程边界集中后，具体 release 步骤可以复用相同的失败语义。
- 文件级设计证据：源码顶部注释把它定位为“Process helpers shared by the release scripts: the release steps drive git, pnpm, npm, and tar, and each needs one of three failure behaviours.”；固定提交中扫描到的声明包括 `RunOptions`、`CommandResult`、`attempt`、`attemptEchoed`、`capture`；本地静态 import 图显示它直接依赖 0 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/bump.ts)、[scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/pack.ts)、[scripts/release/publish.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/publish.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 116 行；扫描到的声明包括 `RunOptions`、`CommandResult`、`attempt`、`attemptEchoed`、`capture`、`run`、`isEntry`；源码顶部原注释（英文，仅作回查线索）：Process helpers shared by the release scripts: the release steps drive git, pnpm, npm, and tar, and each needs one of three failure behaviours.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/publish.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/publish.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布状态协调器
- 这个文件有什么用：它处理 registry 状态、完整性 hash、幂等发布和 transient error。
- 为什么这样设计：registry 发布可能重试、重复执行或遇到暂时错误，状态和完整性 hash 必须先被记录；集中协调发布状态可以把幂等性写成明确规则。
- 文件级设计证据：源码顶部注释把它定位为“Publish one packed release family from the tarballs the pack step produced. Publication is decided per package against the registry, never from a list of "what this release includes": a version the registry lacks is published, a version whose published tarb...”；固定提交中扫描到的声明包括 `isTransientFailure`、`integrityOf`、`registryState`、`publishTarball`、`main`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)、[scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/tarball.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/release/families.ts`、`scripts/release/process.ts`、`scripts/release/tarball.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 178 行；扫描到的声明包括 `isTransientFailure`、`integrityOf`、`registryState`、`publishTarball`、`main`；源码顶部原注释（英文，仅作回查线索）：Publish one packed release family from the tarballs the pack step produced. Publication is decided per package against the registry, never from a list of "what this release includes": a version the registry lacks is published, a version whose published tarb...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/tarball.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `release/tarball.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Reading packed npm tarballs and the order file that accompanies them. The release steps after pack treat a directory of tarballs as the unit of work, so they read what a tarball declares rather than what the checkout currently says.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Reading packed npm tarballs and the order file that accompanies them. The release steps after pack treat a directory of tarballs as the unit of work, so they read what a tarball declares rather than what the checkout currently says.”；固定提交中扫描到的声明包括 `PUBLISH_ORDER_FILE`、`PackedIdentity`、`tarballFiles`、`packedIdentity`、`readPublishOrder`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)、[scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/pack.ts)、[scripts/release/publish.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/publish.ts)、[scripts/release/verify-packed-install.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/verify-packed-install.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/release/process.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `PUBLISH_ORDER_FILE`、`PackedIdentity`、`tarballFiles`、`packedIdentity`、`readPublishOrder`；源码顶部原注释（英文，仅作回查线索）：Reading packed npm tarballs and the order file that accompanies them. The release steps after pack treat a directory of tarballs as the unit of work, so they read what a tarball declares rather than what the checkout currently says.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/verify-packed-install.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/verify-packed-install.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `release/verify-packed-install.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Install packed tarballs into a throwaway consumer outside the repository and drive the installed executable with plain Node. Every tarball the installed tree needs comes from --from, so the only registry traffic is for external dependencies. That matters be...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Install packed tarballs into a throwaway consumer outside the repository and drive the installed executable with plain Node. Every tarball the installed tree needs comes from --from, so the only registry traffic is for external dependencies. That matters be...”；固定提交中扫描到的声明包括 `consumerEnvironment`、`packedDependencies`、`main`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)、[scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/tarball.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/release/families.ts`、`scripts/release/process.ts`、`scripts/release/tarball.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 121 行；扫描到的声明包括 `consumerEnvironment`、`packedDependencies`、`main`；源码顶部原注释（英文，仅作回查线索）：Install packed tarballs into a throwaway consumer outside the repository and drive the installed executable with plain Node. Every tarball the installed tree needs comes from --from, so the only registry traffic is for external dependencies. That matters be...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/verify.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/verify.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布资格验证器
- 这个文件有什么用：它检查 release family、版本基线、tag 和 publishability gate。
- 为什么这样设计：发布前要同时检查 release family、版本基线、tag 和 publishability；独立资格验证器让“可以发布”成为有证据的门禁，而不是某个命令碰巧成功。
- 文件级设计证据：源码顶部注释把它定位为“Verify a release family's version baseline, and — when publishing — that the run comes from the family's tag and its members are publishable. Publication happens only from GitHub Actions, so the tag and publishability checks are gates on the workflow, not a...”；固定提交中扫描到的声明包括 `reportPublishOrder`、`verifyPublishable`、`verifyTag`、`main`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/release/process.ts)
- 对应测试：[scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-built-package-invariants.spec.ts)、[scripts/verify-client-domain-graph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-domain-graph.spec.ts)、[scripts/verify-client-packages.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 110 行；扫描到的声明包括 `reportPublishOrder`、`verifyPublishable`、`verifyTag`、`main`；源码顶部原注释（英文，仅作回查线索）：Verify a release family's version baseline, and — when publishing — that the run comes from the family's tag and its members are publishable. Publication happens only from GitHub Actions, so the tag and publishability checks are gates on the workflow, not a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `repo-files.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Shared repository file discovery and line-oriented reference scanning.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Shared repository file discovery and line-oriented reference scanning.”；固定提交中扫描到的声明包括 `RepoFile`、`ReferenceViolation`、`isArchivedAgentNotePath`、`uniqueRepoFiles`、`findReferenceViolations`；本地静态 import 图显示它直接依赖 0 个源文件，并被 8 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/doc-typecheck.ts)、[scripts/verify-doc-refs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-refs.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `RepoFile`、`ReferenceViolation`、`isArchivedAgentNotePath`、`uniqueRepoFiles`、`findReferenceViolations`；源码顶部原注释（英文，仅作回查线索）：Shared repository file discovery and line-oriented reference scanning.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/rescope-vendor.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/rescope-vendor.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `rescope-vendor.spec.ts` 的具体场景，包括“exactEditState”、“classifies an insertion by its target form, so a duplicate is invalid”、“classifies a deletion by its source form, and requires its remainder to survive”、“requires a replacement to leave no source form and the exact target count”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“exactEditState”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Acceptance-path coverage for the rescope codemod's exact-edit classifier: a duplicated insertion — what a non-idempotent apply produces — must be rejected rather than applied again.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/rescope-vendor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/rescope-vendor.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/rescope-vendor.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的测试主题包括 “exactEditState”、“classifies an insertion by its target form, so a duplicate is invalid”、“classifies a deletion by its source form, and requires its remainder to survive”、“requires a replacement to leave no source form and the exact target count”；源码顶部原注释（英文，仅作回查线索）：Acceptance-path coverage for the rescope codemod's exact-edit classifier: a duplicated insertion — what a non-idempotent apply produces — must be rejected rather than applied again.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/rescope-vendor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/rescope-vendor.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `rescope-vendor.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Rescope the vendored Cordis packages into the @deepseek-ai scope, and undo that rescope with --reverse. Every harness package declares cordis as a peer dependency, so publication carries this framework layer too; publishing it under the upstream names would...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Rescope the vendored Cordis packages into the @deepseek-ai scope, and undo that rescope with --reverse. Every harness package declares cordis as a peer dependency, so publication carries this framework layer too; publishing it under the upstream names would...”；固定提交中扫描到的声明包括 `ExactEditState`、`exactEditState`、`excluded`、`escapeRegExp`、`patterns`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[scripts/rescope-vendor.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/rescope-vendor.spec.ts)
- 对应测试：[scripts/rescope-vendor.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/rescope-vendor.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `vendor/cordis/src/index.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 719 行；扫描到的声明包括 `ExactEditState`、`exactEditState`、`excluded`、`escapeRegExp`、`patterns`、`skipped`、`rewriteLine`、`rewrite`；源码顶部原注释（英文，仅作回查线索）：Rescope the vendored Cordis packages into the @deepseek-ai scope, and undo that rescope with --reverse. Every harness package declares cordis as a peer dependency, so publication carries this framework layer too; publishing it under the upstream names would...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-coverage-partitions.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行运行驱动相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“CLI entry for partitioned Vitest coverage.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“CLI entry for partitioned Vitest coverage.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.ts)
- 对应测试：[scripts/coverage-partitions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/coverage-partitions.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；源码顶部原注释（英文，仅作回查线索）：CLI entry for partitioned Vitest coverage.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-gates.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查运行驱动的具体场景，包括“gate graph validation”、“keeps the public repository link policy in the documentation gate”、“keeps the hygiene aggregate aligned with the package script checks”、“schedules the longest documentation leaves before short checks”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“gate graph validation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `gate`、`resultFor`、`withPnpmEntrypoint`、`withEnv`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/run-gates.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 456 行；扫描到的声明包括 `gate`、`resultFor`、`withPnpmEntrypoint`、`withEnv`；扫描到的测试主题包括 “gate graph validation”、“keeps the public repository link policy in the documentation gate”、“keeps the hygiene aggregate aligned with the package script checks”、“schedules the longest documentation leaves before short checks”、“launches a native pnpm entrypoint directly”、“keeps native Windows coverage blocking while retaining the observational inventory”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：质量门禁调度器
- 这个文件有什么用：它按模式、并发度和依赖图调度质量门禁，处理跳过规则并汇总结果。
- 为什么这样设计：质量门禁有依赖、并发、模式和跳过规则，分散到 shell 命令会让结果难以解释；调度器集中收集状态并保留 gate 关系，才能区分真正通过与被跳过。
- 文件级设计证据：源码顶部注释把它定位为“Run local and CI quality gates with bounded in-process scheduling. Package scripts own public aggregate names; this runner owns their validated dependency graphs, scheduler environment, and process diagnostics. @see ../.agents/notes/implemented/process/2026...”；固定提交中扫描到的声明包括 `Mode`、`Gate`、`GateResult`、`defaultConcurrency`、`gatesForMode`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)、[scripts/coverage-exempt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-exempt.ts)、[scripts/coverage-partitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/coverage-partitions.ts)、[scripts/run-gates.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.spec.ts)
- 对应测试：[scripts/run-gates.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-gates.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着 `scripts/run-gates.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 968 行；扫描到的声明包括 `Mode`、`Gate`、`GateResult`、`defaultConcurrency`、`gatesForMode`、`runGates`、`runGate`、`formatGateResultReason`；源码顶部原注释（英文，仅作回查线索）：Run local and CI quality gates with bounded in-process scheduling. Package scripts own public aggregate names; this runner owns their validated dependency graphs, scheduler environment, and process diagnostics. @see ../.agents/notes/implemented/process/2026...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-oxlint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-oxlint.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查运行驱动的具体场景，包括“Oxlint invocation”、“preserves the ordinary default invocation”、“bounds both worker pools from one setting”、“uses location-preserving diagnostics in CI”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Oxlint invocation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/run-oxlint.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-oxlint.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/run-oxlint.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的测试主题包括 “Oxlint invocation”、“preserves the ordinary default invocation”、“bounds both worker pools from one setting”、“uses location-preserving diagnostics in CI”、“preserves an explicitly selected CI formatter”、“rejects a competing direct worker bound”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-oxlint.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-oxlint.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行运行驱动相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交中扫描到的声明包括 `OxlintInvocation`、`resolveOxlintInvocation`、`isFixInvocation`、`hasOutputFormat`、`completeFrom`，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：固定提交中扫描到的声明包括 `OxlintInvocation`、`resolveOxlintInvocation`、`isFixInvocation`、`hasOutputFormat`、`completeFrom`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/run-oxlint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-oxlint.spec.ts)
- 对应测试：[scripts/run-oxlint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-oxlint.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `OxlintInvocation`、`resolveOxlintInvocation`、`isFixInvocation`、`hasOutputFormat`、`completeFrom`、`main`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-web-snapshots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/run-web-snapshots.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行运行驱动、Web 界面相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Run serial browser owners before one bounded snapshot pool.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Run serial browser owners before one bounded snapshot pool.”；固定提交中扫描到的声明包括 `run`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/pnpm-invocation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/pnpm-invocation.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/pnpm-invocation.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 44 行；扫描到的声明包括 `run`；源码顶部原注释（英文，仅作回查线索）：Run serial browser owners before one bounded snapshot pool.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/session-fixture-layout.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.snapshot.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“keeps every session-format JSONL fixture projected into canonical packed layout”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“keeps every session-format JSONL fixture projected into canonical packed layout”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Repository-wide canonical-layout check for committed session snapshots.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/session-fixture-layout.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行；扫描到的测试主题包括 “keeps every session-format JSONL fixture projected into canonical packed layout”；源码顶部原注释（英文，仅作回查线索）：Repository-wide canonical-layout check for committed session snapshots.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/session-fixture-layout.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话的具体场景，包括“canonicalSessionFixture”、“preserves the header line and packs an unpacked event run losslessly”、“ignores JSONL whose first record is not a session header”、“is idempotent for an already packed fixture”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“canonicalSessionFixture”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `chunkRun`、`unpackedFixture`、`decodedBody`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/test-support/llm-replay/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/src/index.ts)、[scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts`、`scripts/session-fixture-layout.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `chunkRun`、`unpackedFixture`、`decodedBody`；扫描到的测试主题包括 “canonicalSessionFixture”、“preserves the header line and packs an unpacked event run losslessly”、“ignores JSONL whose first record is not a session header”、“is idempotent for an already packed fixture”、“is idempotent for an already projected fixture”、“fails loud on malformed records after a session header”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行会话相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Canonical packed-row and envelope projection helpers for repository session fixtures.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Canonical packed-row and envelope projection helpers for repository session fixtures.”；固定提交中扫描到的声明包括 `SessionFixtureLayout`、`canonicalSessionFixture`、`inspectSessionFixtureLayouts`、`isSessionHeader`、`renderFixture`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/test-support/llm-replay/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/src/index.ts)、[scripts/migrate-packed-session-fixtures.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/migrate-packed-session-fixtures.ts)、[scripts/session-fixture-layout.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.snapshot.ts)
- 对应测试：[scripts/session-fixture-layout.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.snapshot.ts)、[scripts/session-fixture-layout.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/session-fixture-layout.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/core/session/src/index.ts`、`packages/test-support/llm-replay/src/index.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 116 行；扫描到的声明包括 `SessionFixtureLayout`、`canonicalSessionFixture`、`inspectSessionFixtureLayouts`、`isSessionHeader`、`renderFixture`、`withoutEnvelope`、`discoverJsonlFiles`；源码顶部原注释（英文，仅作回查线索）：Canonical packed-row and envelope projection helpers for repository session fixtures.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/slot-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/slot-walk.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行扩展槽位相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“AST helpers for the client slot surface: the SlotMap declaration merges that type every slot, and the slots.register call sites that say who already occupies one. Both readings are lexical (no type-checker program): the client catalog generator consumes the...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“AST helpers for the client slot surface: the SlotMap declaration merges that type every slot, and the slots.register call sites that say who already occupies one. Both readings are lexical (no type-checker program): the client catalog generator consumes the...”；固定提交中扫描到的声明包括 `SlotDeclaration`、`SlotRegistration`、`TypeDeclaration`、`ScannedFile`、`scanSlotFiles`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.spec.ts)、[scripts/gen-client-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.ts)
- 对应测试：[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-client-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 429 行；扫描到的声明包括 `SlotDeclaration`、`SlotRegistration`、`TypeDeclaration`、`ScannedFile`、`scanSlotFiles`、`indexExportedTypes`、`slotDeclarations`、`slotRegistrations`；源码顶部原注释（英文，仅作回查线索）：AST helpers for the client slot surface: the SlotMap declaration merges that type every slot, and the slots.register call sites that say who already occupies one. Both readings are lexical (no type-checker program): the client catalog generator consumes the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/smoke-python-runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/smoke-python-runtime.py)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Python SDK 运行 Smoke Test
- 这个文件有什么用：它在无密钥条件下启动 Python SDK runtime，执行完整 turn 和 snapshot smoke，检查子进程、JSON-RPC、Session 事件和最终回答链路。
- 为什么这样设计：Python SDK 的完整 turn 既涉及子进程又涉及 JSON-RPC 和 Session snapshot，不能只用单元测试模拟；keyless smoke 保留真实 runtime carrier 边界，同时用固定响应避免依赖 API key。
- 文件级设计证据：固定提交中扫描到的声明包括 `send`、`mcp_cordis`、`MockModelHandler`、`do_POST`、`log_message`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/python/sdk/src/deepseek_harness/__init__.py)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `python/sdk/src/deepseek_harness/__init__.py` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1340 行；扫描到的声明包括 `send`、`mcp_cordis`、`MockModelHandler`、`do_POST`、`log_message`、`completion_chunks`、`mcp_tool_followup`、`fs_search_tool_followup`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-fixture-cleanup.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `test-fixture-cleanup.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Junction-safe fixture cleanup for Windows. Test fixtures junction the REAL scripts/, node_modules, and tsx package directories so installer probes resolve through them; Windows recursive deletion — both Node's rmSync and Git's worktree remove — follows MOUN...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Junction-safe fixture cleanup for Windows. Test fixtures junction the REAL scripts/, node_modules, and tsx package directories so installer probes resolve through them; Windows recursive deletion — both Node's rmSync and Git's worktree remove — follows MOUN...”；固定提交中扫描到的声明包括 `unlinkFixtureLinks`、`removeFixtureSafely`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/install-lefthook.spec.ts)、[scripts/translation-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.spec.ts)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)
- 对应测试：[scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/install-lefthook.spec.ts)、[scripts/translation-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.spec.ts)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `unlinkFixtureLinks`、`removeFixtureSafely`；源码顶部原注释（英文，仅作回查线索）：Junction-safe fixture cleanup for Windows. Test fixtures junction the REAL scripts/, node_modules, and tsx package directories so installer probes resolve through them; Windows recursive deletion — both Node's rmSync and Git's worktree remove — follows MOUN...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `test-invariants.spec.ts` 的具体场景，包括“global test invariant host”、“uses one exhaustive topology to reserve every package name with enabled checks”、“mounts the owning package companion while leaving non-package roots service-only”、“loads and executes every source companion through the real Loader setup”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“global test invariant host”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestInvariantProbe`、`deferred`、`requiredConfig`、`invalidConfigApply`、`rejectionOf`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.ts)、[scripts/test-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/runtime-diagnostics/invariants/src/index.ts`、`scripts/package-invariants.ts`、`scripts/test-invariants.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 419 行；扫描到的声明包括 `TestInvariantProbe`、`deferred`、`requiredConfig`、`invalidConfigApply`、`rejectionOf`、`expectRequiredConfigValidation`、`withFakeCompanions`、`withDelayedFirstCompanion`；扫描到的测试主题包括 “global test invariant host”、“uses one exhaustive topology to reserve every package name with enabled checks”、“mounts the owning package companion while leaving non-package roots service-only”、“loads and executes every source companion through the real Loader setup”、“recognizes focused invariant suites without a package inventory”、“preserves config validation failures without starting the rejected plugin”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/test-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `test-invariants.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Vitest-wide invariant host. Ordinary Cordis roots receive the invariant service with global enablement plus the current test package's companion. One topology test mounts every companion; focused invariant tests own their service topology explicitly.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Vitest-wide invariant host. Ordinary Cordis roots receive the invariant service with global enablement plus the current test package's companion. One topology test mounts every companion; focused invariant tests own their service topology explicitly.”；固定提交中扫描到的声明包括 `TestInvariantCompanion`、`TEST_INVARIANT_READY_SERVICE`、`testInvariantCompanions`、`usesManualInvariantTree`、`testInvariantCompanionPaths`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.spec.ts)
- 对应测试：[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-invariants.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/attachment/attachment/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 274 行；扫描到的声明包括 `TestInvariantCompanion`、`TEST_INVARIANT_READY_SERVICE`、`testInvariantCompanions`、`usesManualInvariantTree`、`testInvariantCompanionPaths`、`TestAttachmentStore`、`startInvariantHost`、`hasBarrierOwner`；源码顶部原注释（英文，仅作回查线索）：Vitest-wide invariant host. Ordinary Cordis roots receive the invariant service with global enablement plus the current test package's companion. One topology test mounts every companion; focused invariant tests own their service topology explicitly.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `translation-brief.spec.ts` 的具体场景，包括“markdown spans”、“lists units with container-scoped kinds in document order”、“lists heading sections with a preamble span and heading labels”、“labels units by their node type”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“markdown spans”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Regression tests for the minimal-update briefing assembly.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/translation-brief.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 287 行；扫描到的测试主题包括 “markdown spans”、“lists units with container-scoped kinds in document order”、“lists heading sections with a preamble span and heading labels”、“labels units by their node type”、“aligns sections by depth only, so translated heading text still maps”、“aligns span lists only on equal non-empty kind sequences”；源码顶部原注释（英文，仅作回查线索）：Regression tests for the minimal-update briefing assembly.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `translation-brief.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Pure assembly of the minimal-update briefing for one out-of-sync translation pair: the authored side's changes since the last confirmed state at the narrowest safely mapped granularity (code-fence-only splice, changed Markdown units, heading sections, whole...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Pure assembly of the minimal-update briefing for one out-of-sync translation pair: the authored side's changes since the last confirmed state at the narrowest safely mapped granularity (code-fence-only splice, changed Markdown units, heading sections, whole...”；固定提交中扫描到的声明包括 `MarkdownSpan`、`markdownUnits`、`sectionSpans`、`spansAligned`、`changedSpanIndices`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.ts)、[scripts/gen-translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-translation-brief.ts)、[scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.spec.ts)
- 对应测试：[scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-brief.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-pairing.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 512 行；扫描到的声明包括 `MarkdownSpan`、`markdownUnits`、`sectionSpans`、`spansAligned`、`changedSpanIndices`、`computeMechanicalUpdate`、`TerminologyRow`、`parseTerminologyRows`；源码顶部原注释（英文，仅作回查线索）：Pure assembly of the minimal-update briefing for one out-of-sync translation pair: the authored side's changes since the last confirmed state at the narrowest safely mapped granularity (code-fence-only splice, changed Markdown units, heading sections, whole...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `translation-links.spec.ts` 的具体场景，包括“translation link locale validation”、“rejects a Chinese link to the English sibling with an exact diagnostic”、“rewrites an encoded exact filename without changing its query or fragment suffix”、“encodes each exact path segment with only RFC 3986 unreserved characters”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“translation link locale validation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Regression coverage for locale-aware bilingual Markdown links.”；固定提交中扫描到的声明包括 `fixture`、`linkContext`、`expectUnchangedLinkInput`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-fixture-cleanup.ts)、[scripts/translation-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/test-fixture-cleanup.ts`、`scripts/translation-links.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 253 行；扫描到的声明包括 `fixture`、`linkContext`、`expectUnchangedLinkInput`；扫描到的测试主题包括 “translation link locale validation”、“rejects a Chinese link to the English sibling with an exact diagnostic”、“rewrites an encoded exact filename without changing its query or fragment suffix”、“encodes each exact path segment with only RFC 3986 unreserved characters”、“accepts the target-locale sibling and an out-of-scope target with its own sibling”、“does not fall back when an active target is missing its locale sibling”；源码顶部原注释（英文，仅作回查线索）：Regression coverage for locale-aware bilingual Markdown links.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `translation-links.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Locale-aware resolution and byte-preserving rewrites for bilingual Markdown links.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Locale-aware resolution and byte-preserving rewrites for bilingual Markdown links.”；固定提交中扫描到的声明包括 `TranslationLinkContext`、`TranslationLinkLocaleViolation`、`TranslationLinkRewriteResult`、`languageSwitcherLinkOffset`、`hasLanguageSwitcher`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)、[scripts/translation-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.spec.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.ts)
- 对应测试：[scripts/translation-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 328 行；扫描到的声明包括 `TranslationLinkContext`、`TranslationLinkLocaleViolation`、`TranslationLinkRewriteResult`、`languageSwitcherLinkOffset`、`hasLanguageSwitcher`、`translationLinkLocaleViolations`、`rewriteTranslationLinkLocales`、`normalizeTranslationMarkdownLinks`；源码顶部原注释（英文，仅作回查线索）：Locale-aware resolution and byte-preserving rewrites for bilingual Markdown links.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-git.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `translation-pairing-git.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Git-blob operations owned by the bilingual pairing workflow.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Git-blob operations owned by the bilingual pairing workflow.”；固定提交中扫描到的声明包括 `GIT_COMMAND_MAX_BUFFER`、`gitBlobHash`、`runGit`、`GitIndexBlob`、`gitIndexPaths`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 对应测试：[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `GIT_COMMAND_MAX_BUFFER`、`gitBlobHash`、`runGit`、`GitIndexBlob`、`gitIndexPaths`、`gitMergeInputPaths`、`readGitIndexBlob`、`storeGitBlob`；源码顶部原注释（英文，仅作回查线索）：Git-blob operations owned by the bilingual pairing workflow.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `translation-pairing-merge.spec.ts` 的具体场景，包括“translation pairing merge composition”、“rejects a pairing-record path outside the repository”、“rejects a pairing record excluded from the active corpus”、“merges the owner blobs named by three valid records”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“translation pairing merge composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Integration coverage for automatic and explicit pairing-record conflict resolution.”；固定提交中扫描到的声明包括 `mergeTranslationPairingRecords`、`resolveTranslationPairingConflicts`、`git`、`write`、`shellQuote`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/test-fixture-cleanup.ts)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/test-fixture-cleanup.ts`、`scripts/translation-pairing-git.ts`、`scripts/translation-pairing-merge.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 696 行；扫描到的声明包括 `mergeTranslationPairingRecords`、`resolveTranslationPairingConflicts`、`git`、`write`、`shellQuote`、`installFixtureRuntime`、`startMergeWithFakeNode`、`createFixture`；扫描到的测试主题包括 “translation pairing merge composition”、“rejects a pairing-record path outside the repository”、“rejects a pairing record excluded from the active corpus”、“merges the owner blobs named by three valid records”、“accepts locale-specific paths to the same paired document”、“rejects a clean merge whose Chinese link uses the English sibling”；源码顶部原注释（英文，仅作回查线索）：Integration coverage for automatic and explicit pairing-record conflict resolution.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `translation-pairing-merge.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Fail-closed composition of bilingual pairing records during Git merges.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Fail-closed composition of bilingual pairing records during Git merges.”；固定提交中扫描到的声明包括 `TranslationPairingMergeResult`、`mergeTranslationPairingRecords`、`repositoryTranslationPairSource`、`resolveTranslationPairingConflicts`、`readGitBlob`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.ts)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-record.ts)、[scripts/merge-translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/merge-translation-pairing.ts)
- 对应测试：[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-links.ts`、`scripts/translation-pairing-git.ts`、`scripts/translation-pairing-record.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 408 行；扫描到的声明包括 `TranslationPairingMergeResult`、`mergeTranslationPairingRecords`、`repositoryTranslationPairSource`、`resolveTranslationPairingConflicts`、`readGitBlob`、`readMergeDefault`、`assertDefaultTextMerge`、`runTextMerge`；源码顶部原注释（英文，仅作回查线索）：Fail-closed composition of bilingual pairing records during Git merges.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-record.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `translation-pairing-record.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Canonical paths, parsing, and rendering for bilingual pairing records.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Canonical paths, parsing, and rendering for bilingual pairing records.”；固定提交中扫描到的声明包括 `TranslationPairPaths`、`TranslationPairingRecord`、`translationPairPaths`、`translationPairPathsFromMeta`、`parseTranslationPairingRecord`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 对应测试：[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的声明包括 `TranslationPairPaths`、`TranslationPairingRecord`、`translationPairPaths`、`translationPairPathsFromMeta`、`parseTranslationPairingRecord`、`renderTranslationPairingRecord`；源码顶部原注释（英文，仅作回查线索）：Canonical paths, parsing, and rendering for bilingual pairing records.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `translation-pairing.spec.ts` 的具体场景，包括“translation pairing snapshots”、“stores exact uncommitted bytes for later recovery by object ID”、“fails before a sidecar can reference an unavailable object”、“fails clearly when Git cannot be started”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“translation pairing snapshots”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Regression tests for bilingual snapshots, corpus scope, and structure.”；固定提交中扫描到的声明包括 `signature`、`fixtureSignature`、`gitSupportsObjectFormat`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-record.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/translation-pairing-git.ts`、`scripts/translation-pairing-record.ts`、`scripts/translation-pairing.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 526 行；扫描到的声明包括 `signature`、`fixtureSignature`、`gitSupportsObjectFormat`；扫描到的测试主题包括 “translation pairing snapshots”、“stores exact uncommitted bytes for later recovery by object ID”、“fails before a sidecar can reference an unavailable object”、“fails clearly when Git cannot be started”、“reads staged bytes independently of the working tree”、“lists exact index files without treating a directory prefix as one entry”；源码顶部原注释（英文，仅作回查线索）：Regression tests for bilingual snapshots, corpus scope, and structure.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：文档翻译配对检查器
- 这个文件有什么用：它维护中英文文档三件套、生成区域和 Git blob hash，防止翻译文件与源文件漂移。
- 为什么这样设计：中文、英文和国际化清单必须知道彼此对应的源文件及 Git blob；用配对检查和 hash 维护关系，可以在翻译落后时给出确定诊断，而不是靠人工记忆。
- 文件级设计证据：源码顶部注释把它定位为“Pure parsing and structural helpers for the bilingual-document pairing gate. Kept separate from the CLI so corpus discovery and signature behavior can be regression-tested without reading or mutating the repository tree. Also the one home of the generated-r...”；固定提交中扫描到的声明包括 `partitionGeneratedRegions`、`blobHash`、`parsePairMeta`、`renderPairMeta`、`TranslationPairingManifest`；本地静态 import 图显示它直接依赖 1 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.ts)、[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-record.spec.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)、[scripts/gen-translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-translation-brief.ts)
- 对应测试：[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-record.spec.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-links.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 444 行；扫描到的声明包括 `partitionGeneratedRegions`、`blobHash`、`parsePairMeta`、`renderPairMeta`、`TranslationPairingManifest`、`TRANSLATION_SCOPE_GLOB_EXCLUDES`、`isTranslationScopeFile`、`parseTranslationPairingManifest`；源码顶部原注释（英文，仅作回查线索）：Pure parsing and structural helpers for the bilingual-document pairing gate. Kept separate from the CLI so corpus discovery and signature behavior can be regression-tested without reading or mutating the repository tree. Also the one home of the generated-r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-prompt.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.snapshot.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查提示词的具体场景，包括“translation prompt runnable snapshot”、“assembles the reviewed examples and consumes a recorded new-pair response”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“translation prompt runnable snapshot”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Runnable keyless snapshot for the assembled translation request and consumed response.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的测试主题包括 “translation prompt runnable snapshot”、“assembles the reviewed examples and consumes a recorded new-pair response”；源码顶部原注释（英文，仅作回查线索）：Runnable keyless snapshot for the assembled translation request and consumed response.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查提示词的具体场景，包括“translation prompt rendering”、“renders both directions with every placeholder resolved”、“contains every embedded example”、“states the selected v7 safeguards”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“translation prompt rendering”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Unit tests for the prompt-v7 content and unchanged three-section protocol.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/translation-prompt.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 234 行；扫描到的测试主题包括 “translation prompt rendering”、“renders both directions with every placeholder resolved”、“contains every embedded example”、“states the selected v7 safeguards”、“rejects a template with unknown or missing placeholders”、“rejects unmatched placeholder delimiters”；源码顶部原注释（英文，仅作回查线索）：Unit tests for the prompt-v7 content and unchanged three-section protocol.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行提示词相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Executable renderer and response parser for the committed documentation-translation prompt contract (prompt-v4). The v4 contract: three placeholders (source_lang, target_lang, terminology), whole-document translation, and a three-section response (<translat...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Executable renderer and response parser for the committed documentation-translation prompt contract (prompt-v4). The v4 contract: three placeholders (source_lang, target_lang, terminology), whole-document translation, and a three-section response (<translat...”；固定提交中扫描到的声明包括 `TRANSLATION_PROMPT_PLACEHOLDERS`、`TranslationPromptInput`、`TranslationExample`、`TranslationRequestInput`、`TranslationRequest`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.spec.ts)、[scripts/verify-translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-translation-prompt.ts)
- 对应测试：[scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 259 行；扫描到的声明包括 `TRANSLATION_PROMPT_PLACEHOLDERS`、`TranslationPromptInput`、`TranslationExample`、`TranslationRequestInput`、`TranslationRequest`、`TranslationResponse`、`documentedTranslationPromptPlaceholders`、`renderTranslationPrompt`；源码顶部原注释（英文，仅作回查线索）：Executable renderer and response parser for the committed documentation-translation prompt contract (prompt-v4). The v4 contract: three placeholders (source_lang, target_lang, terminology), whole-document translation, and a three-section response (<translat...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `ts-project.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Shared TypeScript Program construction for repository gates that need real cross-file symbols and types instead of isolated syntax trees.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Shared TypeScript Program construction for repository gates that need real cross-file symbols and types instead of isolated syntax trees.”；固定提交中扫描到的声明包括 `CompilerFace`、`repositoryConfigHost`、`TypeScriptProject`、`loadProjectGraph`、`parseConfig`；本地静态 import 图显示它直接依赖 0 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/clean.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/clean.ts)、[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)、[scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.ts)
- 对应测试：[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)、[scripts/verify-optional-dependency-imports.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-optional-dependency-imports.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `CompilerFace`、`repositoryConfigHost`、`TypeScriptProject`、`loadProjectGraph`、`parseConfig`、`semanticCompilerOptions`；源码顶部原注释（英文，仅作回查线索）：Shared TypeScript Program construction for repository gates that need real cross-file symbols and types instead of isolated syntax trees.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/types/client-build-environment/index.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/types/client-build-environment/index.d.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行浏览器端相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Build-time values that bundlers replace before client code reaches a browser.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Build-time values that bundlers replace before client code reaches a browser.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 7 行；源码顶部原注释（英文，仅作回查线索）：Build-time values that bundlers replace before client code reaches a browser.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-agent-note-classification.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-agent-note-classification.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Agent Note 分类门禁
- 这个文件有什么用：它检查 Agent Note 是否放在允许的 lifecycle/class 目录、文件名是否带日期，并阻止旧的 RFC 路径重新出现。
- 为什么这样设计：分类 gate 只负责生命周期、class、日期文件名和旧路径禁用；把它与 Markdown 格式 gate 分开，错误可以明确指向“放错目录”而不是笼统地说格式失败。
- 文件级设计证据：源码顶部注释把它定位为“Enforce Agent Note lifecycle/class paths and dated filenames. Structural rules are shared with agent-note-tree.ts; the closed classification rules live in .agents/notes/README.md.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/agent-note-tree.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；源码顶部原注释（英文，仅作回查线索）：Enforce Agent Note lifecycle/class paths and dated filenames. Structural rules are shared with agent-note-tree.ts; the closed classification rules live in .agents/notes/README.md.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-agent-note-format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-agent-note-format.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Agent Note 格式门禁
- 这个文件有什么用：它检查 Agent Note 的标题、生命周期段落、替代方案和 retired 标记；目录分类由 sibling tree gate 负责，翻译结构由 pairing gate 负责。
- 为什么这样设计：Agent Note 的格式规则与目录分类、翻译配对是不同不变量；分成独立 gate 后，格式迁移可以单独设置 grandfather 规则，目录和翻译门禁也不会互相吞掉错误。
- 文件级设计证据：源码顶部注释把它定位为“Enforce Agent Note headers, lifecycle-specific sections, alternatives, and retired marker rules. Classification and filenames belong to the sibling tree gate; translation structure belongs to the pairing gate. Exact format and grandfathering rules live in ....”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/agent-note-tree.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 94 行；源码顶部原注释（英文，仅作回查线索）：Enforce Agent Note headers, lifecycle-specific sections, alternatives, and retired marker rules. Classification and filenames belong to the sibling tree gate; translation structure belongs to the pairing gate. Exact format and grandfathering rules live in ....。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-archived-agent-notes.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Agent Note 归档门禁
- 这个文件有什么用：它验证已归档 Agent Note 的 manifest、内容摘要和不可变关系，并在需要时追加新的归档记录。
- 为什么这样设计：归档校验需要同时比较内容摘要、manifest seal 和目录中的三件套；独立门禁可以在不可变历史被替换时拒绝发布，而不影响普通 Agent Note 编辑。
- 文件级设计证据：源码顶部注释把它定位为“Verify and append-seal the frozen Agent Note archive.”；固定提交中扫描到的声明包括 `runGit`、`readBaselineManifest`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/agent-note-tree.ts)、[scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `runGit`、`readBaselineManifest`；源码顶部原注释（英文，仅作回查线索）：Verify and append-seal the frozen Agent Note archive.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-built-package-invariants.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-built-package-invariants.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：构建包不变量门禁
- 这个文件有什么用：它通过 staged package self-reference 在普通 Node 中验证编译后的 companion 包，确认发布产物的入口和互相依赖没有断裂。
- 为什么这样设计：编译产物可能在源码 workspace 中看似可用，却在自引用 package 环境中缺入口或缺 companion；把 staged package 当普通 Node 消费者验证，才能检查真正的发布边界。
- 文件级设计证据：源码顶部注释把它定位为“Verify every compiled companion through its staged package self-reference under plain Node.”；固定提交中扫描到的声明包括 `copyDeclaredLibFiles`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.spec.ts)、[scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-built-package-invariants.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `copyDeclaredLibFiles`；源码顶部原注释（英文，仅作回查线索）：Verify every compiled companion through its staged package self-reference under plain Node.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-built-package-invariants.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-built-package-invariants.spec.ts` 的具体场景，包括“built package invariant verifier”、“loads the staged compiled self-reference through plain Node and Loader normalization”、“rejects a default export and a broken invariant export map”、“rejects an invariant bundle that needs an unstaged runtime chunk”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“built package invariant verifier”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fixture`、`verify`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的声明包括 `fixture`、`verify`；扫描到的测试主题包括 “built package invariant verifier”、“loads the staged compiled self-reference through plain Node and Loader normalization”、“rejects a default export and a broken invariant export map”、“rejects an invariant bundle that needs an unstaged runtime chunk”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-client-domain-graph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-domain-graph.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、领域模型的具体场景，包括“client domain import resolution”、“preserves imports that leave src/client from a top-level file”、“normalizes imports between domains inside src/client”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“client domain import resolution”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-client-domain-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-domain-graph.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-client-domain-graph.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的测试主题包括 “client domain import resolution”、“preserves imports that leave src/client from a top-level file”、“normalizes imports between domains inside src/client”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-client-domain-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-domain-graph.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行浏览器端、领域模型相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Enforce intra-package domain layering inside packages/client \/src/client/. verify-module-graph covers package-level edges; this gate covers the directory level: domain directories may import contract/ and never each other, and only the assembly point (appl...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Enforce intra-package domain layering inside packages/client \/src/client/. verify-module-graph covers package-level edges; this gate covers the directory level: domain directories may import contract/ and never each other, and only the assembly point (appl...”；固定提交中扫描到的声明包括 `resolveClientImport`、`listSources`、`domainOf`、`checkPackage`、`main`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-client-domain-graph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-domain-graph.spec.ts)
- 对应测试：[scripts/verify-client-domain-graph.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-domain-graph.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `resolveClientImport`、`listSources`、`domainOf`、`checkPackage`、`main`；源码顶部原注释（英文，仅作回查线索）：Enforce intra-package domain layering inside packages/client \/src/client/. verify-module-graph covers package-level edges; this gate covers the directory level: domain directories may import contract/ and never each other, and only the assembly point (appl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-client-packages.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“source package uses”、“counts type imports, module augmentations, dynamic imports, and JSX”、“package modes”、“accepts one dynamic package and one statically linked package”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“source package uses”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Tests for client package modes, dependency sections, and module requests.”；固定提交中扫描到的声明包括 `declaration`、`pkg`、`facts`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-client-packages.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-client-packages.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 402 行；扫描到的声明包括 `declaration`、`pkg`、`facts`；扫描到的测试主题包括 “source package uses”、“counts type imports, module augmentations, dynamic imports, and JSX”、“package modes”、“accepts one dynamic package and one statically linked package”、“rejects a package with both modes or neither mode”、“requires seeded workspace packages to use staticLinked and preloads to name dynamic rows”；源码顶部原注释（英文，仅作回查线索）：Tests for client package modes, dependency sections, and module requests.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-client-packages.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行浏览器端相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify client package modes, npm dependency sections, and the synchronous browser module-request graph.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify client package modes, npm dependency sections, and the synchronous browser module-request graph.”；固定提交中扫描到的声明包括 `ClientDeclaration`、`ClientPackage`、`ClientPackageFacts`、`ClientDeclarations`、`collectSourcePackageUses`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)、[scripts/verify-client-packages.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.spec.ts)
- 对应测试：[scripts/verify-client-packages.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-client-packages.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/ts-project.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 914 行；扫描到的声明包括 `ClientDeclaration`、`ClientPackage`、`ClientPackageFacts`、`ClientDeclarations`、`collectSourcePackageUses`、`collectRuntimeSourcePackageUses`、`readClientDeclarations`、`collectClientPackageViolations`；源码顶部原注释（英文，仅作回查线索）：Verify client package modes, npm dependency sections, and the synchronous browser module-request graph.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-config-source-ownership.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-config-source-ownership.spec.ts` 的具体场景，包括“configuration source ownership gate”、“rejects inline endpoints in shipped bundle patches”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“configuration source ownership gate”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-config-source-ownership.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-config-source-ownership.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-config-source-ownership.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的测试主题包括 “configuration source ownership gate”、“rejects inline endpoints in shipped bundle patches”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-config-source-ownership.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-config-source-ownership.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-config-source-ownership.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Gate for forbidden credential or endpoint environment inlines in shipped Cordis configuration. @module scripts/verify-config-source-ownership”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Gate for forbidden credential or endpoint environment inlines in shipped Cordis configuration. @module scripts/verify-config-source-ownership”；固定提交中扫描到的声明包括 `collectConfigSourceOwnershipViolations`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-config-source-ownership.spec.ts)
- 对应测试：[scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-config-source-ownership.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `collectConfigSourceOwnershipViolations`；源码顶部原注释（英文，仅作回查线索）：Gate for forbidden credential or endpoint environment inlines in shipped Cordis configuration. @module scripts/verify-config-source-ownership。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架的具体场景，包括“verify-cordis-config metadata expressions”、“accepts a disabled !!js expression”、“rejects an expression in a static metadata field”、“rejects an expression nested below disabled (only the field itself interpolates)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“verify-cordis-config metadata expressions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The verify-cordis-config metadata contract: disabled is the one entry metadata field whose !!js expression the Loader interpolates; every other metadata field must stay static, and a disabled expression must parse.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-cordis-config.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的测试主题包括 “verify-cordis-config metadata expressions”、“accepts a disabled !!js expression”、“rejects an expression in a static metadata field”、“rejects an expression nested below disabled (only the field itself interpolates)”、“rejects a disabled expression that does not parse (the loader would fail the boot)”、“workspace Bundle discovery and product dependency closures”；源码顶部原注释（英文，仅作回查线索）：The verify-cordis-config metadata contract: disabled is the one entry metadata field whose !!js expression the Loader interpolates; every other metadata field must stay static, and a disabled expression must parse.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 Cordis 插件框架相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Validate Cordis Loader entry metadata and package resolution. The Loader interpolates a plugin entry's config (after declared injections activate, against that plugin context) and the entry disabled field (at every mount decision, against the loader context...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Validate Cordis Loader entry metadata and package resolution. The Loader interpolates a plugin entry's config (after declared injections activate, against that plugin context) and the entry disabled field (at every mount decision, against the loader context...”；固定提交中扫描到的声明包括 `PackageManifest`、`PluginReference`、`bundleManifestPaths`、`bundlePluginDependencyErrors`、`metadataExpressionErrors`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-config-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-config-files.ts)、[scripts/cordis-yaml.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-yaml.ts)、[scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.spec.ts)
- 对应测试：[scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-cordis-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/cordis-config-files.ts`、`scripts/cordis-yaml.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 514 行；扫描到的声明包括 `PackageManifest`、`PluginReference`、`bundleManifestPaths`、`bundlePluginDependencyErrors`、`metadataExpressionErrors`、`validateClientHalvesDeclared`、`validatePresetPlaneSeparation`、`loadEntries`；源码顶部原注释（英文，仅作回查线索）：Validate Cordis Loader entry metadata and package resolution. The Loader interpolates a plugin entry's config (after declared injections activate, against that plugin context) and the entry disabled field (at every mount decision, against the loader context...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-budgets.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-budgets.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-doc-budgets.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Enforce wc -w-style ceilings from scripts/doc-budgets.manifest.json. Missing files and invalid ceilings fail; --list reports current usage. Only listed standing docs are budgeted. Ceilings ratchet down with at least 5% headroom; raising one requires the jus...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Enforce wc -w-style ceilings from scripts/doc-budgets.manifest.json. Missing files and invalid ceilings fail; --list reports current usage. Only listed standing docs are budgeted. Ceilings ratchet down with at least 5% headroom; raising one requires the jus...”；固定提交中扫描到的声明包括 `countWords`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `countWords`；源码顶部原注释（英文，仅作回查线索）：Enforce wc -w-style ceilings from scripts/doc-budgets.manifest.json. Missing files and invalid ceilings fail; --list reports current usage. Only listed standing docs are budgeted. Ceilings ratchet down with at least 5% headroom; raising one requires the jus...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-refs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-refs.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-doc-refs.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify root-relative documentation paths in repo-authored TypeScript. The textual scan covers docs .md and .agents/notes .md, requires the extension, checks matching string literals too, and excludes built declarations and vendored source.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify root-relative documentation paths in repo-authored TypeScript. The textual scan covers docs .md and .agents/notes .md, requires the extension, checks matching string literals too, and excludes built declarations and vendored source.”；固定提交中扫描到的声明包括 `findViolations`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/repo-files.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `findViolations`；源码顶部原注释（英文，仅作回查线索）：Verify root-relative documentation paths in repo-authored TypeScript. The textual scan covers docs .md and .agents/notes .md, requires the extension, checks matching string literals too, and excludes built declarations and vendored source.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-site-fragments.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-site-fragments.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-doc-site-fragments.spec.ts` 的具体场景，包括“inspectSiteFragments”、“rejects a directory with no built pages”、“resolves clean, encoded, and same-page routes”、“rejects ambiguous built routes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“inspectSiteFragments”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Tests for built-site fragment validation.”；固定提交中扫描到的声明包括 `fixture`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-doc-site-fragments.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-site-fragments.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-doc-site-fragments.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的声明包括 `fixture`；扫描到的测试主题包括 “inspectSiteFragments”、“rejects a directory with no built pages”、“resolves clean, encoded, and same-page routes”、“rejects ambiguous built routes”、“rejects malformed fragment hrefs”、“reports missing ids and missing built routes”；源码顶部原注释（英文，仅作回查线索）：Tests for built-site fragment validation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-site-fragments.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-site-fragments.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-doc-site-fragments.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify fragment links against the HTML emitted by VitePress, and that the build carries the raw-Markdown twin of every route plus llms.txt. Markdown and VitePress use different heading-slug algorithms, so source-link validation alone cannot prove that a pub...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify fragment links against the HTML emitted by VitePress, and that the build carries the raw-Markdown twin of every route plus llms.txt. Markdown and VitePress use different heading-slug algorithms, so source-link validation alone cannot prove that a pub...”；固定提交中扫描到的声明包括 `BrokenSiteFragment`、`SiteFragmentReport`、`inspectSiteFragments`、`missingSiteFiles`、`posixPath`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.ts)、[scripts/verify-doc-site-fragments.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-site-fragments.spec.ts)
- 对应测试：[scripts/verify-doc-site-fragments.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-doc-site-fragments.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/project-doc-site.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `BrokenSiteFragment`、`SiteFragmentReport`、`inspectSiteFragments`、`missingSiteFiles`、`posixPath`、`routeFor`、`aliasesFor`、`decodedFragment`；源码顶部原注释（英文，仅作回查线索）：Verify fragment links against the HTML emitted by VitePress, and that the build carries the raw-Markdown twin of every route plus llms.txt. Markdown and VitePress use different heading-slug algorithms, so source-link validation alone cannot prove that a pub...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-dsh-package-licenses.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-dsh-package-licenses.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-dsh-package-licenses.spec.ts` 的具体场景，包括“DSH package license gate”、“checks root, unhyphenated CLI, and dsh-prefixed package names while ignoring other fami...”、“rejects a missing license declaration”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DSH package license gate”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writeManifest`、`createWorkspace`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-dsh-package-licenses.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-dsh-package-licenses.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-dsh-package-licenses.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 59 行；扫描到的声明包括 `writeManifest`、`createWorkspace`；扫描到的测试主题包括 “DSH package license gate”、“checks root, unhyphenated CLI, and dsh-prefixed package names while ignoring other families”、“rejects a missing license declaration”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-dsh-package-licenses.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-dsh-package-licenses.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-dsh-package-licenses.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Enforce the MIT license declaration for repository-owned DSH npm packages. @module scripts/verify-dsh-package-licenses”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Enforce the MIT license declaration for repository-owned DSH npm packages. @module scripts/verify-dsh-package-licenses”；固定提交中扫描到的声明包括 `DshPackageLicenseReport`、`inspectDshPackageLicenses`、`readManifest`、`isStringArray`、`workspaceManifestPaths`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-dsh-package-licenses.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-dsh-package-licenses.spec.ts)
- 对应测试：[scripts/verify-dsh-package-licenses.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-dsh-package-licenses.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `DshPackageLicenseReport`、`inspectDshPackageLicenses`、`readManifest`、`isStringArray`、`workspaceManifestPaths`、`printable`；源码顶部原注释（英文，仅作回查线索）：Enforce the MIT license declaration for repository-owned DSH npm packages. @module scripts/verify-dsh-package-licenses。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-export-jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-export-jsdoc.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-export-jsdoc.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Enforce JSDoc on every non-vendored package export. Functions and public class methods require parameter and non-void return documentation; exported declarations require description prose. Inline callable types, overload signatures, namespace members, and p...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Enforce JSDoc on every non-vendored package export. Functions and public class methods require parameter and non-void return documentation; exported declarations require description prose. Inline callable types, overload signatures, namespace members, and p...”；固定提交中扫描到的声明包括 `collectExportJsdocViolations`、`isExported`、`isNonPublic`、`isStatic`、`thisReceiver`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/jsdoc.ts)、[packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/verify-export-jsdoc.spec.ts)
- 对应测试：[packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/verify-export-jsdoc.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/jsdoc.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 617 行；扫描到的声明包括 `collectExportJsdocViolations`、`isExported`、`isNonPublic`、`isStatic`、`thisReceiver`、`unwrapExpression`、`callableAnnotation`、`heritageExemption`；源码顶部原注释（英文，仅作回查线索）：Enforce JSDoc on every non-vendored package export. Functions and public class methods require parameter and non-void return documentation; exported declarations require description prose. Inline callable types, overload signatures, namespace members, and p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-md-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-links.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-md-links.spec.ts` 的具体场景，包括“documentAnchors”、“slugs rendered heading text, suffixes repeats, and reads explicit <a id> anchors”、“keeps underscores the way GitHub does”、“slugs a heading containing a link from its rendered text”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“documentAnchors”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Acceptance-path coverage for fragment validation in verify-md-links: a #fragment onto a Markdown target — same-file anchors included — must name a real heading slug or explicit <a id>, while non-Markdown fragments and external targets stay out of scope.”；固定提交中扫描到的声明包括 `layout`、`violationsIn`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-links.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-md-links.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `layout`、`violationsIn`；扫描到的测试主题包括 “documentAnchors”、“slugs rendered heading text, suffixes repeats, and reads explicit <a id> anchors”、“keeps underscores the way GitHub does”、“slugs a heading containing a link from its rendered text”、“bumps repeat suffixes past occupied slugs, matching GitHub”、“ignores <a id> inside code fences, inline code, and HTML comments”；源码顶部原注释（英文，仅作回查线索）：Acceptance-path coverage for fragment validation in verify-md-links: a #fragment onto a Markdown target — same-file anchors included — must name a real heading slug or explicit <a id>, while non-Markdown fragments and external targets stay out of scope.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-md-links.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify that relative Markdown links, images, and definitions resolve — the target file must exist AND a #fragment onto a Markdown target (including a same-file #anchor) must name a real heading slug or explicit <a id>. URL and root-absolute targets are excl...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify that relative Markdown links, images, and definitions resolve — the target file must exist AND a #fragment onto a Markdown target (including a same-file #anchor) must name a real heading slug or explicit <a id>. URL and root-absolute targets are excl...”；固定提交中扫描到的声明包括 `githubSlug`、`documentAnchors`、`anchorCache`、`findViolations`、`isExternal`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)、[scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-config-catalog.ts)、[scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-persistence-catalog.ts)
- 对应测试：[scripts/verify-md-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-links.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts`、`scripts/repo-files.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 216 行；扫描到的声明包括 `githubSlug`、`documentAnchors`、`anchorCache`、`findViolations`、`isExternal`、`pathPart`、`fragmentPart`；源码顶部原注释（英文，仅作回查线索）：Verify that relative Markdown links, images, and definitions resolve — the target file must exist AND a #fragment onto a Markdown target (including a same-file #anchor) must name a real heading slug or explicit <a id>. URL and root-absolute targets are excl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-md-wrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-md-wrap.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-md-wrap.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Reject Markdown prose paragraphs spanning multiple physical lines. The GFM AST distinguishes paragraphs—including those in lists and blockquotes—from multiline structural nodes. The checker never rewrites; symlinked instruction files are deduped. VitePress ...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Reject Markdown prose paragraphs spanning multiple physical lines. The GFM AST distinguishes paragraphs—including those in lists and blockquotes—from multiline structural nodes. The checker never rewrites; symlinked instruction files are deduped. VitePress ...”；固定提交中扫描到的声明包括 `maskVitePressStructure`、`findViolations`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts`、`scripts/repo-files.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 85 行；扫描到的声明包括 `maskVitePressStructure`、`findViolations`；源码顶部原注释（英文，仅作回查线索）：Reject Markdown prose paragraphs spanning multiple physical lines. The GFM AST distinguishes paragraphs—including those in lists and blockquotes—from multiline structural nodes. The checker never rewrites; symlinked instruction files are deduped. VitePress ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-mermaid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-mermaid.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-mermaid.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Parse every repo-authored Mermaid fence with Mermaid itself, catching syntax that link and fence checks cannot. Scope intentionally matches the Markdown link gate, including standing docs, package/example docs, and agent skills. Run with tsx scripts/verify-...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Parse every repo-authored Mermaid fence with Mermaid itself, catching syntax that link and fence checks cannot. Scope intentionally matches the Markdown link gate, including standing docs, package/example docs, and agent skills. Run with tsx scripts/verify-...”；固定提交中扫描到的声明包括 `extractMermaidBlocks`、`formatError`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/repo-files.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `extractMermaidBlocks`、`formatError`；源码顶部原注释（英文，仅作回查线索）：Parse every repo-authored Mermaid fence with Mermaid itself, catching syntax that link and fence checks cannot. Scope intentionally matches the Markdown link gate, including standing docs, package/example docs, and agent skills. Run with tsx scripts/verify-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-node-next-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-node-next-types.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-node-next-types.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify that built package declarations are consumable by a standard external TypeScript ESM project using NodeNext resolution. Run after pnpm run build has emitted declaration files under package lib/types directories.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify that built package declarations are consumable by a standard external TypeScript ESM project using NodeNext resolution. Run after pnpm run build has emitted declaration files under package lib/types directories.”；固定提交中扫描到的声明包括 `readPackage`、`workspacePackages`、`relativeSpecifiersMissingExtensions`、`publicSpecifiers`、`linkPackage`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 164 行；扫描到的声明包括 `readPackage`、`workspacePackages`、`relativeSpecifiersMissingExtensions`、`publicSpecifiers`、`linkPackage`；源码顶部原注释（英文，仅作回查线索）：Verify that built package declarations are consumable by a standard external TypeScript ESM project using NodeNext resolution. Run after pnpm run build has emitted declaration files under package lib/types directories.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-optional-dependency-imports.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-optional-dependency-imports.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-optional-dependency-imports.spec.ts` 的具体场景，包括“optional dependency loads”、“reports every form the compiler keeps, and nothing else”、“names the package, the declaration that made it optional, and the way out”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“optional dependency loads”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Tests for the optional-dependency load gate: which import and re-export forms survive emit, and therefore load a package the installed tree may not carry. The expectations here match what tsc emits with verbatimModuleSyntax off: import type, import {}, an i...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)、[scripts/verify-optional-dependency-imports.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-optional-dependency-imports.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/ts-project.ts`、`scripts/verify-optional-dependency-imports.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的测试主题包括 “optional dependency loads”、“reports every form the compiler keeps, and nothing else”、“names the package, the declaration that made it optional, and the way out”；源码顶部原注释（英文，仅作回查线索）：Tests for the optional-dependency load gate: which import and re-export forms survive emit, and therefore load a package the installed tree may not carry. The expectations here match what tsc emits with verbatimModuleSyntax off: import type, import {}, an i...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-optional-dependency-imports.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-optional-dependency-imports.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-optional-dependency-imports.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Reject a static value import of an optional dependency. A dependency declared in optionalDependencies, or as a peer carrying peerDependenciesMeta.<name>.optional, may be absent from an installed tree — that absence is what "optional" promises a consumer. A ...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Reject a static value import of an optional dependency. A dependency declared in optionalDependencies, or as a peer carrying peerDependenciesMeta.<name>.optional, may be absent from an installed tree — that absence is what "optional" promises a consumer. A ...”；固定提交中扫描到的声明包括 `collectOptionalImportViolations`、`packageOf`、`record`、`optionalDependencies`、`optionalFor`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/ts-project.ts)、[scripts/verify-optional-dependency-imports.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-optional-dependency-imports.spec.ts)
- 对应测试：[scripts/verify-optional-dependency-imports.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-optional-dependency-imports.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/ts-project.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 214 行；扫描到的声明包括 `collectOptionalImportViolations`、`packageOf`、`record`、`optionalDependencies`、`optionalFor`、`bindsValue`、`importLoadsModule`、`exportLoadsModule`；源码顶部原注释（英文，仅作回查线索）：Reject a static value import of an optional dependency. A dependency declared in optionalDependencies, or as a peer carrying peerDependenciesMeta.<name>.optional, may be absent from an installed tree — that absence is what "optional" promises a consumer. A ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-package-invariants.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-package-invariants.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify package-owned invariant source and publication rules.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify package-owned invariant source and publication rules.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.ts)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/package-invariants.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/package-invariants.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；源码顶部原注释（英文，仅作回查线索）：Verify package-owned invariant source and publication rules.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-package-paths.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行路径相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Find stale root-relative packages/... references in repo-authored prose and TypeScript. A missing path is reported only when it names a real package leaf outside its own explaining group directory; globs, placeholders, hypothetical packages, and unbuilt lib...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Find stale root-relative packages/... references in repo-authored prose and TypeScript. A missing path is reported only when it names a real package leaf outside its own explaining group directory; globs, placeholders, hypothetical packages, and unbuilt lib...”；固定提交中扫描到的声明包括 `realPackageNames`、`isDriftedPackageReference`、`findViolations`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/repo-files.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `realPackageNames`、`isDriftedPackageReference`、`findViolations`；源码顶部原注释（英文，仅作回查线索）：Find stale root-relative packages/... references in repo-authored prose and TypeScript. A missing path is reported only when it names a real package leaf outside its own explaining group directory; globs, placeholders, hypothetical packages, and unbuilt lib...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-readme-limitations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-package-readme-limitations.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-package-readme-limitations.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Doc-sync gate for the canonical package-README limitations section. It scans package manifests, rejects missing or variant sections, and requires one top-level bullet; audited packages in NO_LIMITATIONS must omit it. See the limitations Agent Note.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Doc-sync gate for the canonical package-README limitations section. It scans package manifests, rejects missing or variant sections, and requires one top-level bullet; audited packages in NO_LIMITATIONS must omit it. See the limitations Agent Note.”；固定提交中扫描到的声明包括 `isLimitationsLike`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `isLimitationsLike`；源码顶部原注释（英文，仅作回查线索）：Doc-sync gate for the canonical package-README limitations section. It scans package manifests, rejects missing or variant sections, and requires one top-level bullet; audited packages in NO_LIMITATIONS must omit it. See the limitations Agent Note.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-readme-model-experience.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-package-readme-model-experience.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-package-readme-model-experience.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Doc-sync gate for package README Model Experience sections. It validates audited package classifications, model/token/KV-cache fields, package-owned text blocks, generated-catalog links, and final-section order. See the Model Experience Agent Note.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Doc-sync gate for package README Model Experience sections. It validates audited package classifications, model/token/KV-cache fields, package-owned text blocks, generated-catalog links, and final-section order. See the Model Experience Agent Note.”；固定提交中扫描到的声明包括 `validateNestedVerbatim`、`headingFragment`、`isDirectSystemPromptEntry`、`toolCatalogLinkFragments`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 557 行；扫描到的声明包括 `validateNestedVerbatim`、`headingFragment`、`isDirectSystemPromptEntry`、`toolCatalogLinkFragments`；源码顶部原注释（英文，仅作回查线索）：Doc-sync gate for package README Model Experience sections. It validates audited package classifications, model/token/KV-cache fields, package-owned text blocks, generated-catalog links, and final-section order. See the Model Experience Agent Note.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-public-repository-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-public-repository-links.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-public-repository-links.spec.ts` 的具体场景，包括“repository link policy”、“rejects encoded and case-varied references to the unavailable repository”、“preserves frozen archived Agent Notes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“repository link policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-public-repository-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-public-repository-links.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-public-repository-links.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的测试主题包括 “repository link policy”、“rejects encoded and case-varied references to the unavailable repository”、“preserves frozen archived Agent Notes”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-public-repository-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-public-repository-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-public-repository-links.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Reject tracked files that reference an unavailable legacy repository.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Reject tracked files that reference an unavailable legacy repository.”；固定提交中扫描到的声明包括 `UnavailableRepositoryReference`、`findUnavailableRepositoryReferences`、`canonicalReferenceText`、`trackedFiles`、`scanRepository`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-public-repository-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-public-repository-links.spec.ts)
- 对应测试：[scripts/verify-public-repository-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-public-repository-links.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 90 行；扫描到的声明包括 `UnavailableRepositoryReference`、`findUnavailableRepositoryReferences`、`canonicalReferenceText`、`trackedFiles`、`scanRepository`；源码顶部原注释（英文，仅作回查线索）：Reject tracked files that reference an unavailable legacy repository.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-runtime-closure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查运行时的具体场景，包括“verifyRuntimeClosure”、“requires only plugins active for a Linux or macOS target”、“treats an unsupported disabled expression as active on every target”、“does not interpret an ordinary plugin array config as nested Loader entries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“verifyRuntimeClosure”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fixture`、`workspace`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-runtime-closure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-runtime-closure.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 165 行；扫描到的声明包括 `fixture`、`workspace`；扫描到的测试主题包括 “verifyRuntimeClosure”、“requires only plugins active for a Linux or macOS target”、“treats an unsupported disabled expression as active on every target”、“does not interpret an ordinary plugin array config as nested Loader entries”、“requires preset plugins to be linked from the workspace”、“fails when no shipped preset is discovered”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-runtime-closure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布运行时依赖门禁
- 这个文件有什么用：它检查可部署 executable manifest 是否包含 workspace peer 的完整依赖图，避免缺包只在 Cordis 加载发布产物时才暴露。
- 为什么这样设计：发布包关闭自动 peer 安装后，缺失依赖可能延迟到 Cordis 加载插件才出现；在构建阶段遍历 executable manifest 的依赖闭包，把部署失败提前变成可诊断 gate。
- 文件级设计证据：源码顶部注释把它定位为“Verify that the executable deploy manifest supplies every plugin referenced by a shipped agent preset and every required workspace peer in its dependency graph. With auto peer installation disabled, either omission can otherwise fail only when Cordis loads ...”；固定提交中扫描到的声明包括 `RuntimeClosureResult`、`verifyRuntimeClosure`、`missingPresetPlugins`、`activeBarePluginPackages`、`disabledOnPlatform`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/cordis-yaml.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/cordis-yaml.ts)、[scripts/verify-runtime-closure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.spec.ts)
- 对应测试：[scripts/verify-runtime-closure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-runtime-closure.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着 `scripts/verify-runtime-closure.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 232 行；扫描到的声明包括 `RuntimeClosureResult`、`verifyRuntimeClosure`、`missingPresetPlugins`、`activeBarePluginPackages`、`disabledOnPlatform`、`processPlatformForTarget`、`barePackageName`、`isRecord`；源码顶部原注释（英文，仅作回查线索）：Verify that the executable deploy manifest supplies every plugin referenced by a shipped agent preset and every required workspace peer in its dependency graph. With auto peer installation disabled, either omission can otherwise fail only when Cordis loads ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-skill-invocation-metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-skill-invocation-metadata.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `verify-skill-invocation-metadata.spec.ts` 的具体场景，包括“cross-product skill invocation metadata gate”、“accepts aligned default and manual-only policies”、“rejects either direction of a manual-only policy mismatch”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“cross-product skill invocation metadata gate”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fixtureRoot`、`writeSkill`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-skill-invocation-metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-skill-invocation-metadata.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/verify-skill-invocation-metadata.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `fixtureRoot`、`writeSkill`；扫描到的测试主题包括 “cross-product skill invocation metadata gate”、“accepts aligned default and manual-only policies”、“rejects either direction of a manual-only policy mismatch”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-skill-invocation-metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-skill-invocation-metadata.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-skill-invocation-metadata.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Keep Claude Code and Codex invocation metadata aligned for repository skills. @module scripts/verify-skill-invocation-metadata”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Keep Claude Code and Codex invocation metadata aligned for repository skills. @module scripts/verify-skill-invocation-metadata”；固定提交中扫描到的声明包括 `collectSkillInvocationMetadataViolations`、`asRecord`、`parseSkillFrontmatter`、`skillDirectories`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/verify-skill-invocation-metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-skill-invocation-metadata.spec.ts)
- 对应测试：[scripts/verify-skill-invocation-metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-skill-invocation-metadata.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的声明包括 `collectSkillInvocationMetadataViolations`、`asRecord`、`parseSkillFrontmatter`、`skillDirectories`；源码顶部原注释（英文，仅作回查线索）：Keep Claude Code and Codex invocation metadata aligned for repository skills. @module scripts/verify-skill-invocation-metadata。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-translation-pairing.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-translation-pairing.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Enforce complete English/Chinese pairs, matching structure, and recorded git blob hashes for every in-scope document. The manifest contains only explicit exclusions, which may have neither a counterpart nor a sidecar. --list reports state; --write <pairs......”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Enforce complete English/Chinese pairs, matching structure, and recorded git blob hashes for every in-scope document. The manifest contains only explicit exclusions, which may have neither a counterpart nor a sidecar. --list reports state; --write <pairs......”；固定提交中扫描到的声明包括 `readRepositoryFile`、`repositoryFileExists`、`isExcluded`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-links.ts)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing-record.ts)
- 对应测试：[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-pairing.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-links.ts`、`scripts/translation-pairing-git.ts`、`scripts/translation-pairing-record.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 357 行；扫描到的声明包括 `readRepositoryFile`、`repositoryFileExists`、`isExcluded`；源码顶部原注释（英文，仅作回查线索）：Enforce complete English/Chinese pairs, matching structure, and recorded git blob hashes for every in-scope document. The manifest contains only explicit exclusions, which may have neither a counterpart nor a sidecar. --list reports state; --write <pairs......。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-translation-prompt.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行提示词相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify that the committed translation prompt renders and parses as documented.”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify that the committed translation prompt renders and parses as documented.”；固定提交中扫描到的声明包括 `read`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.ts)
- 对应测试：[scripts/translation-prompt.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.snapshot.ts)、[scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/translation-prompt.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/translation-prompt.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的声明包括 `read`；源码顶部原注释（英文，仅作回查线索）：Verify that the committed translation prompt renders and parses as documented.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-type-equiv.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-type-equiv.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-type-equiv.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify every ts type-equiv and ts public-api block against the source symbol named by the manifest. Ordinary entries preserve the complete declaration; public-api entries preserve a class's body-stripped public declaration. Blocks and entries have a one-to-...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify every ts type-equiv and ts public-api block against the source symbol named by the manifest. Ordinary entries preserve the complete declaration; public-api entries preserve a class's body-stripped public declaration. Blocks and entries have a one-to-...”；固定提交中扫描到的声明包括 `normalizeStructure`、`normalizeJSDoc`、`stripExport`、`blockSymbol`、`extractEquivBlocks`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/markdown.ts)、[scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/paired-markdown-derivatives.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/repo-files.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `scripts/markdown.ts`、`scripts/paired-markdown-derivatives.ts`、`scripts/repo-files.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 306 行；扫描到的声明包括 `normalizeStructure`、`normalizeJSDoc`、`stripExport`、`blockSymbol`、`extractEquivBlocks`、`sourceDeclaration`、`sourceJSDoc`、`isPublicMember`；源码顶部原注释（英文，仅作回查线索）：Verify every ts type-equiv and ts public-api block against the source symbol named by the manifest. Ordinary entries preserve the complete declaration; public-api entries preserve a class's body-stripped public declaration. Blocks and entries have a one-to-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-vendored-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/verify-vendored-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：仓库自动化脚本
- 这个文件有什么用：它执行 `scripts` 包里的 `verify-vendored-links.ts` 相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；固定提交的顶部注释把它定位为“Verify that pnpm-lock.yaml resolves every vendored package name to its workspace link: — never a registry copy. linkWorkspacePackages: true (pnpm-workspace.yaml) makes matching upstream semver ranges resolve to the pinned vendored sources; a registry copy o...”，具体命令和输入输出仍应回到源码确认。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 文件级设计证据：源码顶部注释把它定位为“Verify that pnpm-lock.yaml resolves every vendored package name to its workspace link: — never a registry copy. linkWorkspacePackages: true (pnpm-workspace.yaml) makes matching upstream semver ranges resolve to the pinned vendored sources; a registry copy o...”；固定提交中扫描到的声明包括 `vendoredNames`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `vendoredNames`；源码顶部原注释（英文，仅作回查线索）：Verify that pnpm-lock.yaml resolves every vendored package name to its workspace link: — never a registry copy. linkWorkspacePackages: true (pnpm-workspace.yaml) makes matching upstream semver ranges resolve to the pinned vendored sources; a registry copy o...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/vitest-environment.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/vitest-environment.compat.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `scripts` 包里的 `vitest-environment.compat.spec.ts` 的具体场景，包括“Vitest jsdom compatibility”、“provides isolated browser storage instead of Node process storage”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Vitest jsdom compatibility”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的测试主题包括 “Vitest jsdom compatibility”、“provides isolated browser storage instead of Node process storage”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/wine-windows-gates.sh](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/wine-windows-gates.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Wine Windows 兼容门禁
- 这个文件有什么用：它在 Wine/Windows 环境运行兼容性门禁，捕获与 Linux 原生运行不同的发布风险。
- 为什么这样设计：Linux 通过不能代表 Wine/Windows 的 launcher、路径和包行为也正确；把目标平台差异放进专门门禁，能在发布前暴露跨平台风险而不污染普通测试。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 282 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
