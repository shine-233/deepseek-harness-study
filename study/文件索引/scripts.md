# 源文件索引：scripts

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 147 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/agent-note-tree.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 智能体；文件顶部注释把它定位为“Shared structural source of truth for the Agent Note tree. Lifecycle and class sets are closed under .agents/notes/README.md; importing this module is pure.”。固定提交中扫描到的公开或顶层声明包括 `agentNoteRoot`、`AGENT_NOTE_CLASSES`、`AgentNote`、`walkAgentNoteTree`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.ts)、[scripts/verify-agent-note-classification.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-agent-note-classification.ts)、[scripts/verify-agent-note-format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-agent-note-format.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 83 行；扫描到的声明包括 `agentNoteRoot`、`AGENT_NOTE_CLASSES`、`AgentNote`、`walkAgentNoteTree`；文件顶部注释线索：Shared structural source of truth for the Agent Note tree. Lifecycle and class sets are closed under .agents/notes/README.md; importing this module is pure.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 智能体 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `fixture`；扫描到的测试主题包括 “archived Agent Notes”、“recognizes archived paths with POSIX and Windows separators”、“accepts one complete implemented triplet with matching archive metadata”、“rejects incomplete triplets and invalid archive headers”、“extends the manifest without permitting a sealed change or removal”、“rejects replacing manifest seals alongside changed archive content”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 智能体；文件顶部注释把它定位为“Pure archive-format, triplet, and immutable-manifest helpers.”。固定提交中扫描到的公开或顶层声明包括 `ArchiveManifest`、`gitBlobHash`、`parseArchiveManifest`、`renderArchiveManifest`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/agent-note-tree.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/verify-archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-archived-agent-notes.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 190 行；扫描到的声明包括 `ArchiveManifest`、`gitBlobHash`、`parseArchiveManifest`、`renderArchiveManifest`、`validateArchiveManifestExtension`、`validateArchiveArtifacts`、`extendArchiveManifest`、`archiveContentHash`；文件顶部注释线索：Pure archive-format, triplet, and immutable-manifest helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/attribute-chunk-bytes.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/attribute-chunk-bytes.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `attribute-chunk-bytes.mjs`；文件顶部注释把它定位为“Attribute a built chunk's minified bytes to source npm packages / workspace dirs via its sourcemap (zero-dependency VLQ decoder). The dist-audit companion of the shell chunk-layout decision (.agents/notes/implemented/architecture/2026-08-06-web-shell-dist-c...”。固定提交中扫描到的公开或顶层声明包括 `bucketOf`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `bucketOf`；文件顶部注释线索：Attribute a built chunk's minified bytes to source npm packages / workspace dirs via its sourcemap (zero-dependency VLQ decoder). The dist-audit companion of the shell chunk-layout decision (.agents/notes/implemented/architecture/2026-08-06-web-shell-dist-c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build-exe-for-python-sdk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/build-exe-for-python-sdk.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Python SDK 运行时构建器
- 这个文件有什么用：它构建 Python SDK 使用的 Node 单文件运行时，处理平台、架构、SEA/pkg、开发 carrier 和输出布局。
- 为什么这样设计：把“Python SDK 运行时构建器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 527 行；扫描到的声明包括 `isPlatform`、`isArch`、`Target`、`BuildCli`、`pnpmBin`、`formatCommand`、`SingleExeBuild`、`main`；文件顶部注释线索：Build the SDK runtime executables and Python node carrier. The fixed @yao-pkg/pkg --sea route, deploy flags, and artifact layout are owned by .agents/notes/implemented/architecture/2026-07-10-single-file-executable-sdk-runtime-distribution.md. The staged cl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/build-python-release.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/build-python-release.py)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Python SDK 发布构建器
- 这个文件有什么用：它构建 SDK wheel/runtime wheel，并验证平台 tag、runtime payload 和 PEP 440 版本。
- 为什么这样设计：把“Python SDK 发布构建器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 270 行；扫描到的声明包括 `load_platforms`、`runtime_suffixes`、`main`、`repository_version`、`pep440_version`、`validate_release_tag`、`copy_package`、`rewrite_version`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `change-scope.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/change-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 241 行；扫描到的声明包括 `git`、`gitBytes`、`write`、`fixture`、`commit`、`invoke`、`jsonReport`、`repositoryState`；扫描到的测试主题包括 “change-scope”、“uses an explicit base on a fresh branch without a same-name remote and after its first push”、“reports an exact head above a non-master stacked base while dirty paths remain worktree-local”、“keeps committed, staged, unstaged, and untracked paths independent and does not mutate state”、“rejects missing, ambiguous, and non-commit refs”、“renders deterministic versioned JSON”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/change-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `change-scope.ts`；文件顶部注释把它定位为“Report the explicit committed and worktree scope of a repository change.”。固定提交中扫描到的公开或顶层声明包括 `renderChangeScope`、`executeGit`、`executeGitBytes`、`decodeGitText`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 对应测试：[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 248 行；扫描到的声明包括 `renderChangeScope`、`executeGit`、`executeGitBytes`、`decodeGitText`、`failureDetail`、`requireGit`、`requireGitBytes`、`parseOptions`；文件顶部注释线索：Report the explicit committed and worktree scope of a repository change.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-expected-filenames.sh](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/check-expected-filenames.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `check-expected-filenames.sh`；把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-macos-deployment-target.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/check-macos-deployment-target.py)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `check-macos-deployment-target.py`；固定提交中扫描到的公开或顶层声明包括 `parse_version`、`claimed_version`、`parse_otool_deployment_target`、`deployment_target`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `parse_version`、`claimed_version`、`parse_otool_deployment_target`、`deployment_target`、`ensure_compatible`、`validate_deployment_targets`、`main`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-vendor-manifest.sh](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/check-vendor-manifest.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Vendor 清单一致性检查器
- 这个文件有什么用：它检查 staged vendor 源码变化是否同步更新 vendor/README.md，避免来源、版本和许可证记录过期。
- 为什么这样设计：把“Vendor 清单一致性检查器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/check-workspace-constraints.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `check-workspace-constraints.ts`；文件顶部注释把它定位为“Workspace package invariant checks for package-manager-independent quality gates. Run: tsx scripts/check-workspace-constraints.ts.”。固定提交中扫描到的公开或顶层声明包括 `readJson`、`packageDirs`、`workspaceManifests`、`sameStringList`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/project-reference-faces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-reference-faces.ts)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 420 行；扫描到的声明包括 `readJson`、`packageDirs`、`workspaceManifests`、`sameStringList`、`expectedDshPackageFiles`、`hasExportPair`、`exportDefault`、`usesEmittedTreeDefaults`；文件顶部注释线索：Workspace package invariant checks for package-manager-independent quality gates. Run: tsx scripts/check-workspace-constraints.ts.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `ci-workflow.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 433 行；扫描到的声明包括 `loadWorkflow`、`workflowEvent`、`workflowJob`、`isRecord`；扫描到的测试主题包括 “CI workflow”、“isolates every pnpm action setup destination per runner”、“keeps a required Wine Windows job, a non-blocking native Windows job with failover, and a master-only standby”、“exempts push from cancellation, so one master merge does not cancel the running drill”、“keeps supported LSP source under native Windows coverage”、“requires one release-shaped Python runtime target on every pull request”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/clean.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/clean.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `clean.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/clean.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/clean.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `fixture`、`write`、`addProject`；扫描到的测试主题包括 “RepositoryCleaner”、“derives live build outputs from project references and removes safe stale package residue”、“does not delete any target when a manifest-less package contains an unknown file”、“removes the native Landlock entry output and solution build info”、“refuses project outputs reached through a symlink outside the repository”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/clean.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/clean.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：构建产物安全清理器
- 这个文件有什么用：它根据 project-reference 图计算可删除构建产物，拒绝未知残留、跨仓库路径和危险 symlink。
- 为什么这样设计：把“构建产物安全清理器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ts-project.ts)、[scripts/clean.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/clean.spec.ts)
- 对应测试：[scripts/clean.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/clean.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 189 行；扫描到的声明包括 `RepositoryCleaner`、`isMissing`、`exists`、`childDirectories`、`repositoryPath`、`parseConfig`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-bundle-css.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/client-bundle-css.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 浏览器端、Bundle 组合 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/tsdown.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `cssPlugin`；扫描到的测试主题包括 “client bundle CSS Modules”、“registers the source stylesheet as a watch dependency”；文件顶部注释线索：CSS Modules enter client bundles through virtual modules, so the loader must explicitly register the underlying stylesheet as a watch dependency.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-bundle-purity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/client-bundle-purity.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 浏览器端、Bundle 组合 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/tsdown.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 173 行；扫描到的声明包括 `clientConfigs`、`clientSourceMapPath`、`purityResolveId`、`cssModulePlugin`；扫描到的测试主题包括 “client bundle build faces”、“watches source in development and consumes emitted JavaScript in the Client build”、“client bundle purity gate”、“leaves platform table entries and non-scoped specifiers alone”、“rejects retired table entries (web-react/store left the 8-entry seed)”、“lets inline-safe wire layers inline”；文件顶部注释线索：Pins shared client-bundle preset rules: the module-edge purity gate and the physical watch dependencies hidden behind virtual CSS Modules.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/client-tsconfig.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/client-tsconfig.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 浏览器端 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `clientCssDeclarations`；扫描到的测试主题包括 “client TypeScript aggregate”、“loads package CSS declarations without relying on workspace-link realpaths”；文件顶部注释线索：Regression coverage for source declarations owned by the client test aggregate.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-config-files.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-config-files.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Cordis 插件框架、配置 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-config-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-config-files.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的测试主题包括 “cordisConfigFiles”、“finds Loader YAML without treating translation records as configs”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-config-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-config-files.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架、配置；文件顶部注释把它定位为“Cordis Loader configuration file discovery.”。固定提交中扫描到的公开或顶层声明包括 `cordisConfigFiles`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-config-files.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-config-files.spec.ts)、[scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-cordis-config.ts)
- 对应测试：[scripts/cordis-config-files.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-config-files.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的声明包括 `cordisConfigFiles`；文件顶部注释线索：Cordis Loader configuration file discovery.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Cordis 插件框架 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的测试主题包括 “Cordis core API generation”、“renders the five detailed pages from pinned vendor declarations”、“rejects a public core class without source JSDoc”；文件顶部注释线索：Tests for the generated Cordis core API reference.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架、API 边界；文件顶部注释把它定位为“Generate detailed Cordis core API pages from pinned vendor declarations.”。固定提交中扫描到的公开或顶层声明包括 `CordisCoreApiPage`、`CORDIS_CORE_API_PAGES`、`renderCordisCoreApiPage`、`renderCordisCoreApiPages`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-walk.ts)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/jsdoc.ts)、[scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.spec.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)
- 对应测试：[scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 433 行；扫描到的声明包括 `CordisCoreApiPage`、`CORDIS_CORE_API_PAGES`、`renderCordisCoreApiPage`、`renderCordisCoreApiPages`、`load`、`sourceJsDoc`、`signatureOf`、`headingParams`；文件顶部注释线索：Generate detailed Cordis core API pages from pinned vendor declarations.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-walk.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架；文件顶部注释把它定位为“AST helpers shared by the Cordis generators: locate the Cordis module merge in a source file and enumerate the interface Context keys it declares. The vendored core API projector consumes the merge body; the per-subsystem region generator's exhaustiveness b...”。固定提交中扫描到的公开或顶层声明包括 `contextMergeFiles`、`cordisModuleBody`、`contextKeyMap`、`eventNameList`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-partition.spec.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)
- 对应测试：[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-partition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `contextMergeFiles`、`cordisModuleBody`、`contextKeyMap`、`eventNameList`、`cordisModuleBodies`；文件顶部注释线索：AST helpers shared by the Cordis generators: locate the Cordis module merge in a source file and enumerate the interface Context keys it declares. The vendored core API projector consumes the merge body; the per-subsystem region generator's exhaustiveness b...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-exempt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-exempt.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `coverage-exempt.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/coverage-exempt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-exempt.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `excludeMatches`、`filterMatches`；扫描到的测试主题包括 “coverage-exempt roster”、“entries never overlap, so no suite is double-run or double-excluded”；文件顶部注释线索：Mechanical guard for the coverage-exempt roster: each entry's positional filter and exclude glob must select the same non-empty file set out of the repository's spec inventory, so a renamed suite cannot silently fall out of the uninstrumented gate while its...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-exempt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-exempt.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `coverage-exempt.ts`；文件顶部注释把它定位为“Heavy suites the coverage aggregate runs uninstrumented in a parallel gate. Membership rule: a suite qualifies only when every coverage-measured file it executes in-process (coverage.include spans package src trees; typert generator src is threshold-exclude...”。固定提交中扫描到的公开或顶层声明包括 `CoverageExemptSuite`、`COVERAGE_EXEMPT_ENV`、`coverageExemptHeavySuites`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/coverage-exempt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-exempt.spec.ts)、[scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-gates.ts)、[vitest.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vitest.config.ts)
- 对应测试：[scripts/coverage-exempt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-exempt.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `CoverageExemptSuite`、`COVERAGE_EXEMPT_ENV`、`coverageExemptHeavySuites`；文件顶部注释线索：Heavy suites the coverage aggregate runs uninstrumented in a parallel gate. Membership rule: a suite qualifies only when every coverage-measured file it executes in-process (coverage.include spans package src trees; typert generator src is threshold-exclude...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/coverage-uncovered-locations.cjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-uncovered-locations.cjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `coverage-uncovered-locations.cjs`；固定提交中扫描到的公开或顶层声明包括 `pos`、`usable`、`endSuffix`、`UncoveredLocationsReport`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `pos`、`usable`、`endSuffix`、`UncoveredLocationsReport`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/demo-code-mode.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/demo-code-mode.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `demo-code-mode.mjs`；文件顶部注释把它定位为“Boot the ACP Code Mode overlay. Requires a DeepSeek API key.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行；文件顶部注释线索：Boot the ACP Code Mode overlay. Requires a DeepSeek API key.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/demo-cordis.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/demo-cordis.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架；文件顶部注释把它定位为“Boot the self-referential Cordis tools under Web or ACP, defaulting to Web. This is a repository demo wrapper, not a product CLI feature.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；文件顶部注释线索：Boot the self-referential Cordis tools under Web or ACP, defaulting to Web. This is a repository demo wrapper, not a product CLI feature.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/dev-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/dev-web.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `dev-web.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/dev-web.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/dev-web.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的测试主题包括 “discovers dsh.client packages with sibling roles”、“rebuilds a client-plugin bundle after its source changes”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/dev-web.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/dev-web.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Web 界面；文件顶部注释把它定位为“Watch-build for client-plugin HMR: runs every dsh.client plugin package through the tsdown JS API in watch mode. Reload signaling is not this script's business — the host webserver stat-polls the bundles it serves and broadcasts rebuilt frames itself (dsh w...”。固定提交中扫描到的公开或顶层声明包括 `discoverPluginDirs`、`watchClientPlugins`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/dev-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/dev-web.spec.ts)
- 对应测试：[scripts/dev-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/dev-web.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 114 行；扫描到的声明包括 `discoverPluginDirs`、`watchClientPlugins`；文件顶部注释线索：Watch-build for client-plugin HMR: runs every dsh.client plugin package through the tsdown JS API in watch mode. Reload signaling is not this script's business — the host webserver stat-polls the bundles it serves and broadcasts rebuilt frames itself (dsh w...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `doc-typecheck-paths.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/doc-typecheck-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行；扫描到的测试主题包括 “builtDeclarationPath”、“maps package source directories and exact entry files to built declarations”、“rejects aliases without a supported source target”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/doc-typecheck-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `doc-typecheck-paths.ts`；文件顶部注释把它定位为“Map one workspace source alias target to its declaration-build target.”。固定提交中扫描到的公开或顶层声明包括 `builtDeclarationPath`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.spec.ts)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck.ts)
- 对应测试：[scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `builtDeclarationPath`；文件顶部注释线索：Map one workspace source alias target to its declaration-build target.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `doc-typecheck.ts`；文件顶部注释把它定位为“Typecheck Markdown ts fences against the workspace API. ignore-check fences are reported as opt-outs; generated catalog fragments and source-equivalence blocks are skipped here because their owning gates verify them. Byte-identical .zh.md copies reuse their...”。固定提交中扫描到的公开或顶层声明包括 `extractBlocks`、`builtTypeCompilerOptions`、`compileBlocksAgainstBuiltTypes`、`formatDiagnostics`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/doc-typecheck-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.ts)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)、[scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.ts)
- 对应测试：[scripts/doc-typecheck-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck-paths.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 252 行；扫描到的声明包括 `extractBlocks`、`builtTypeCompilerOptions`、`compileBlocksAgainstBuiltTypes`、`formatDiagnostics`、`workspaceReferences`、`tempTsconfig`、`compileBlocksStandalone`、`remapBlockPaths`；文件顶部注释线索：Typecheck Markdown ts fences against the workspace API. ignore-check fences are reported as opt-outs; generated catalog fragments and source-equivalence blocks are skipped here because their owning gates verify them. Byte-identical .zh.md copies reuse their...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 浏览器端 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-client-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.ts)、[scripts/slot-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/slot-walk.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 214 行；扫描到的声明包括 `declaration`、`registration`；扫描到的测试主题包括 “client slot contract validation”、“accepts a documented slot whose owner props resolve”、“rejects a slot with no registrant-facing prose, naming the writing template”、“rejects owner props no exported declaration provides”、“rejects the same key declared twice, because a merge would hide one contract”、“rejects a registration into an undeclared slot as a scan blind spot”；文件顶部注释线索：The client slot catalog's judgement, proven on hand-built inputs: the contract checks that must reject an unteachable slot, and the projection facts a registrant depends on (who occupies a seat, what replacing it costs, which owner has to be mounted). Run a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-client-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 浏览器端；文件顶部注释把它定位为“Generate the model-facing client slot catalog consumed by cordis_inspect what:"client". A dynamic package's browser half can only contribute UI through ctx.slots.register, and every fact it needs to do that safely — which keys exist, what each register call...”。固定提交中扫描到的公开或顶层声明包括 `SlotEntry`、`collectSlotEntries`、`oversizedSlotReports`、`validateSlotContracts`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/slot-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/slot-walk.ts)、[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.spec.ts)
- 对应测试：[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 558 行；扫描到的声明包括 `SlotEntry`、`collectSlotEntries`、`oversizedSlotReports`、`validateSlotContracts`、`resolveSlotEntries`、`renderClientCatalog`、`main`、`entryLines`；文件顶部注释线索：Generate the model-facing client slot catalog consumed by cordis_inspect what:"client". A dynamic package's browser half can only contribute UI through ctx.slots.register, and every fact it needs to do that safely — which keys exist, what each register call...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-config-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 配置；文件顶部注释把它定位为“Generate docs/config-catalog.md from package entry points, config types, JSDoc, and static Schemastery schemas. Every package must classify, referenced types must resolve without collisions, and every enumerable schema path must exist on the declared config...”。固定提交中扫描到的公开或顶层声明包括 `CatalogEntry`、`collectConfigCatalog`、`render`、`report`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/jsdoc.ts)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 880 行；扫描到的声明包括 `CatalogEntry`、`collectConfigCatalog`、`render`、`report`、`loadFile`、`findTypeDecl`、`resolveTypeName`、`collectTypeNames`；文件顶部注释线索：Generate docs/config-catalog.md from package entry points, config types, JSDoc, and static Schemastery schemas. Every package must classify, referenced types must resolve without collisions, and every enumerable schema path must exist on the declared config...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-api.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架、API 边界；文件顶部注释把它定位为“Compatibility entry point for the unified Typert-backed Cordis catalog projection. The generated API module retains this command in its banner, while all extraction, validation, and rendering live in one implementation.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 9 行；文件顶部注释线索：Compatibility entry point for the unified Typert-backed Cordis catalog projection. The generated API module retains this command in its banner, while all extraction, validation, and rendering live in one implementation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-partition.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Cordis 插件框架 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-walk.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 211 行；扫描到的声明包括 `baseline`；扫描到的测试主题包括 “walkPartitionProblems”、“accepts a partition where every declared key and event is rendered or exempted”、“rejects a declared event that is neither rendered nor exempted, naming its file”、“rejects an event exemption whose event the projection renders”、“rejects rendered surface the independent scan cannot see, naming the scan as the defect”、“rejects an event exemption no Events merge declares”；文件顶部注释线索：Acceptance-path coverage for the cordis-surface partition backstops (walkPartitionProblems + the AST scan helpers): a declared Context key or Events member the rendering projection cannot see must carry a named walk exemption, an exemption must stay live in...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-record.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Cordis 插件框架 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 144 行；扫描到的声明包括 `page`、`setup`；扫描到的测试主题包括 “maybeRecordPair”、“re-records a region-confined write over a consistent record”、“refuses when the pair was already out of sync before the run”、“refuses a malformed record even when its hashes are current”、“refuses a record with extra entries”、“refuses a record with a duplicated expected key”；文件顶部注释线索：Negative-path coverage for the guarded pair auto-record (maybeRecordPair): the safety property is that regeneration re-records a pair's .i18n.yaml ONLY for a region-confined write over a well-formed, previously-consistent record — every other state is left ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架；文件顶部注释把它定位为“Generate the per-subsystem Cordis service/event reference regions from the Typert catalog projection. Every harness ctx.<key> service and event scope maps to exactly one docs/subsystems/ page through the curated tables below; the generator injects each page...”。固定提交中扫描到的公开或顶层声明包括 `SERVICE_PAGE`、`SERVICE_WALK_EXEMPTIONS`、`EVENT_SCOPE_PAGE`、`EVENT_WALK_EXEMPTIONS`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/generator/src/index.ts)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.ts)、[scripts/cordis-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-walk.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/generator/tests/cordis-catalog.spec.ts)
- 对应测试：[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/generator/tests/cordis-catalog.spec.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-partition.spec.ts)、[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-record.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 953 行；扫描到的声明包括 `SERVICE_PAGE`、`SERVICE_WALK_EXEMPTIONS`、`EVENT_SCOPE_PAGE`、`EVENT_WALK_EXEMPTIONS`、`LINK_MAP`、`FOUNDATION_TYPE_NAMES`、`TYPE_LINK_EXEMPTIONS`、`CORDIS_CATALOG_POLICY`；文件顶部注释线索：Generate the per-subsystem Cordis service/event reference regions from the Typert catalog projection. Every harness ctx.<key> service and event scope maps to exactly one docs/subsystems/ page through the curated tables below; the generator injects each page...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-cordis-inspect-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-inspect-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 Cordis 插件框架；文件顶部注释把它定位为“Generate model-visible Host/Client Service and Event inspect catalogs.”。固定提交中扫描到的公开或顶层声明包括 `methodName`、`clientModel`、`main`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/generator/src/index.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `methodName`、`clientModel`、`main`；文件顶部注释线索：Generate model-visible Host/Client Service and Event inspect catalogs.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `gen-doc-graphs.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.ts)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ts-project.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `dispatchersOf`；扫描到的测试主题包括 “event relation call-site indexing”、“recovers a proven-local helper through the single-file fast path”、“recovers an alias-escaped helper through the global fallback”、“rejects the locality proof for global script files”；文件顶部注释线索：Tests for the event-relation collector's demand-driven call-site indexing: the single-file fast path and the global fallback must recover the same helper-parameter event names, including shapes that defeat the locality proof (alias escapes and global script...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `gen-doc-graphs.ts`；文件顶部注释把它定位为“Generate the relationship layer above the module, Cordis, and tool catalogs. Enumerable facts come from source; hybrid graphs add manifests for policy the source cannot infer, while curated graphs explain flow and ownership. --check verifies the generated set.”。固定提交中扫描到的公开或顶层声明包括 `PackageSource`、`EventRelationCollector`、`collectPackageSources`、`generatedHeader`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/generator/src/index.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)、[scripts/package-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-graph.ts)、[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.spec.ts)
- 对应测试：[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1461 行；扫描到的声明包括 `PackageSource`、`EventRelationCollector`、`collectPackageSources`、`generatedHeader`、`maintenanceFooter`、`graphIndexLink`、`linkFromDoc`、`mermaidCode`；文件顶部注释线索：Generate the relationship layer above the module, Cordis, and tool catalogs. Enumerable facts come from source; hybrid graphs add manifests for policy the source cannot infer, while curated graphs explain flow and ownership. --check verifies the generated set.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-module-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-module-graph.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `gen-module-graph.ts`；文件顶部注释把它定位为“Generate docs/module-graph.md from in-repo peerDependencies, the canonical runtime edges. The deterministic output groups packages by directory and renders both Mermaid and a dependency table; --check verifies freshness.”。固定提交中扫描到的公开或顶层声明包括 `packageLink`、`render`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/package-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-graph.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 119 行；扫描到的声明包括 `packageLink`、`render`；文件顶部注释线索：Generate docs/module-graph.md from in-repo peerDependencies, the canonical runtime edges. The deterministic output groups packages by directory and renders both Mermaid and a dependency table; --check verifies freshness.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-persistence-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 持久化；文件顶部注释把它定位为“Generate docs/persistence-catalog.md from every SessionEventMap merge and the owning event-envelope types. This is the durable-record vocabulary, not the live Cordis bus. Event declarations must be unique, explicitly typed, documented, inheritance-free, and...”。固定提交中扫描到的公开或顶层声明包括 `LogEventEntry`、`AnnotatedLogEventEntry`、`EventEnvelopeTypeEntry`、`collectLogEvents`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/jsdoc.ts)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.ts)、[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/tests/gen-persistence-catalog.spec.ts)
- 对应测试：[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/tests/gen-persistence-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 467 行；扫描到的声明包括 `LogEventEntry`、`AnnotatedLogEventEntry`、`EventEnvelopeTypeEntry`、`collectLogEvents`、`collectEventEnvelopeTypes`、`collectSurfaceEventTypes`、`annotateSurface`、`render`；文件顶部注释线索：Generate docs/persistence-catalog.md from every SessionEventMap merge and the owning event-envelope types. This is the durable-record vocabulary, not the live Cordis bus. Event declarations must be unique, explicitly typed, documented, inheritance-free, and...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-scoped-events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-scoped-events.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 事件；文件顶部注释把它定位为“Generate dsh-scope's invariant resolver map from the repository TypeScript Program. A scoped event declares this: Scoped<Base>. Real scopeTarget(base, key) calls establish the routing-key type for that base. The generator searches every event payload parame...”。固定提交中扫描到的公开或顶层声明包括 `renderScopedEvents`、`ScopedEventGenerator`、`isCordisModuleInterface`、`isThisParameter`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/jsdoc.ts)、[scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ts-project.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 399 行；扫描到的声明包括 `renderScopedEvents`、`ScopedEventGenerator`、`isCordisModuleInterface`、`isThisParameter`、`parseScopeTag`、`hasNonPublicDeclaration`、`dedupeCandidates`、`quote`；文件顶部注释线索：Generate dsh-scope's invariant resolver map from the repository TypeScript Program. A scoped event declares this: Scoped<Base>. Real scopeTarget(base, key) calls establish the routing-key type for that base. The generator searches every event payload parame...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-third-party-notices.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-third-party-notices.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `gen-third-party-notices.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-third-party-notices.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-third-party-notices.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 345 行；扫描到的声明包括 `workspace`；扫描到的测试主题包括 “THIRD_PARTY_NOTICES.md”、“matches what the generator produces from the current manifests”、“tierExternalDeps”、“tiers by declaring area, not by the declaring section name”、“keeps a package runtime when any shipping area declares it, and excludes workspace links”、“virtualManifest”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-third-party-notices.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-third-party-notices.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：第三方许可证声明生成器
- 这个文件有什么用：它从 npm、Python metadata、vendor manifest 和 SPDX 信息生成发布所需的第三方声明。
- 为什么这样设计：把“第三方许可证声明生成器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-third-party-notices.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-third-party-notices.spec.ts)
- 对应测试：[scripts/gen-third-party-notices.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-third-party-notices.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 775 行；扫描到的声明包括 `CLAUDE_AGENT_SDK_PACKAGE`、`isOwnerAuthorizedRuntime`、`Manifest`、`manifestPatterns`、`ClaudePlatformPayload`、`ClaudeDistribution`、`claudeDistributionFromManifest`、`virtualManifest`；文件顶部注释线索：Generate THIRD_PARTY_NOTICES.md from the workspace manifests: every external dependency named by a workspace package.json, the vendored-package manifest in vendor/README.md, the Python pyproject.toml files, and the pnpm patch list. License and repository me...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-tool-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-tool-catalog.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：工具能力
- 这个文件有什么用：它提供 工具 的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)
- 对应测试：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 759 行；扫描到的声明包括 `ToolPackage`、`ToolCatalog`、`assertManifestComplete`、`assertToolsHarvested`、`collectToolCatalog`、`render`、`CatalogAttachmentStore`、`registerCatalogSubagentProvider`；文件顶部注释线索：Generate docs/tool-catalog.md from schemas collected by booting each tool plugin. Runtime registration is the source of truth for computed schemas; the manifest is checked against every on-disk tool-* package. --check verifies the committed artifact. Ration...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/gen-translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-translation-brief.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `gen-translation-brief.ts`；文件顶部注释把它定位为“Print the minimal-update briefing for out-of-sync translation pairs: pnpm run gen-translation-brief --apply pair paths.... With no arguments it discovers every out-of-sync pair; with arguments (any file of a pair) it briefs exactly those pairs and fails lou...”。固定提交中扫描到的公开或顶层声明包括 `isExcluded`、`parseMeta`、`git`、`blobText`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)
- 对应测试：[scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 302 行；扫描到的声明包括 `isExcluded`、`parseMeta`、`git`、`blobText`、`diffTexts`、`loadPair`、`bundlesFor`、`planScope`；文件顶部注释线索：Print the minimal-update briefing for out-of-sync translation pairs: pnpm run gen-translation-brief --apply pair paths.... With no arguments it discovers every out-of-sync pair; with arguments (any file of a pair) it briefs exactly those pairs and fails lou...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/install-lefthook.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/install-lefthook.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：扩展钩子
- 这个文件有什么用：它负责 `scripts` 包里的 `install-lefthook.mjs`；固定提交中扫描到的公开或顶层声明包括 `errorCode`、`commandFailure`、`capture`、`git`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/install-lefthook.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 845 行；扫描到的声明包括 `errorCode`、`commandFailure`、`capture`、`git`、`nulValues`、`stripGitLineTerminator`、`directFileConfigValues`、`parseFileConfigEntries`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/install-lefthook.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `install-lefthook.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-fixture-cleanup.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 871 行；扫描到的声明包括 `commandResult`、`gitResult`、`git`、`write`、`fakeLefthookSource`、`installFakeLefthook`、`installPairingProbeFixture`、`createFixture`；扫描到的测试主题包括 “worktree-local Lefthook installer”、“skips hook installation when ${label} marks an automated job”、“isolates main and linked worktrees without changing legacy common hooks”、“replaces the owned hook path Git copies into a newly added worktree”、“serializes concurrent installs and keeps repeated output stable”、“waits for a concurrent installer to finish publishing its lock record”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/jsdoc.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `jsdoc.ts`；文件顶部注释把它定位为“Shared JSDoc parsing and completeness checks for the Cordis, persistence, and config catalogs and the exported-API gate.”。固定提交中扫描到的公开或顶层声明包括 `pointer`、`rawJsDoc`、`Mode`、`parseJsDoc`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-core-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.ts)、[scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-config-catalog.ts)、[scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-persistence-catalog.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/tests/verify-export-jsdoc.spec.ts)、[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/tests/gen-persistence-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/generator/tests/cordis-catalog.spec.ts)、[scripts/cordis-core-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-core-api.spec.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-partition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `pointer`、`rawJsDoc`、`Mode`、`parseJsDoc`、`parseTags`、`checkParams`、`checkReturns`、`reportViolations`；文件顶部注释线索：Shared JSDoc parsing and completeness checks for the Cordis, persistence, and config catalogs and the exported-API gate.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/lint-rule-fingerprint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/lint-rule-fingerprint.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `lint-rule-fingerprint.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `isRecord`、`isUnknownArray`、`severity`、`normalizedRules`、`mergedRules`；扫描到的测试主题包括 “Oxlint repository rule fingerprint”、“pins every override field”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `markdown.ts`；文件顶部注释把它定位为“Shared Markdown parsing and depth-first traversal for documentation gates.”。固定提交中扫描到的公开或顶层声明包括 `MarkdownProseLine`、`MarkdownHeadingLine`、`MarkdownFence`、`parseMarkdown`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck.ts)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.ts)、[scripts/verify-md-wrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-wrap.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/session/tests/gen-persistence-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/tests/gen-persistence-catalog.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)、[scripts/verify-md-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `MarkdownProseLine`、`MarkdownHeadingLine`、`MarkdownFence`、`parseMarkdown`、`visitMarkdown`、`markdownFences`、`markdownHeadingLines`、`markdownProseLines`；文件顶部注释线索：Shared Markdown parsing and depth-first traversal for documentation gates.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/merge-translation-pairing-driver.sh](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/merge-translation-pairing-driver.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `merge-translation-pairing-driver.sh`；把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/merge-translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/merge-translation-pairing.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `merge-translation-pairing.ts`；文件顶部注释把它定位为“Git merge-driver and explicit conflict-resolver entrypoint for pairing records.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.ts)
- 对应测试：[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 51 行；文件顶部注释线索：Git merge-driver and explicit conflict-resolver entrypoint for pairing records.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/migrate-packed-session-fixtures.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/migrate-packed-session-fixtures.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Temporary branch-convergence command for canonical packed session fixtures. @see ../.agents/notes/proposed/process/2026-07-26-remove-packed-session-fixture-migrator.md”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；文件顶部注释线索：Temporary branch-convergence command for canonical packed session fixtures. @see ../.agents/notes/proposed/process/2026-07-26-remove-packed-session-fixture-migrator.md。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/oxlint-contract.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/oxlint-contract.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `oxlint-contract.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 376 行；扫描到的声明包括 `secondProbe`、`hasValue`、`longProbe`、`isRecord`、`isUnknownArray`、`runRepositoryOxlint`、`runOxlint`、`normalizedOutput`；扫描到的测试主题包括 “Oxlint executable contract”、“discovers the owning TypeScript project for every file class”、“runs JavaScript compatibility and nursery rules”、“keeps the complete stylistic contract in Oxlint”、“checks preserved TypeGraph syntax without type-aware analysis”、“keeps repository lint workflows Oxlint-only”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/package-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-graph.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `package-graph.ts`；文件顶部注释把它定位为“Shared workspace-package graph discovery and Mermaid identifier helpers for the generated module graph and relationship-diagram generators. Each caller supplies its own group ordering because the documents use different visual priorities; manifest parsing a...”。固定提交中扫描到的公开或顶层声明包括 `PackageGraphNode`、`collectPackageGraph`、`graphNodeId`、`escapeMermaidLabel`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.ts)、[scripts/gen-module-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-module-graph.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `PackageGraphNode`、`collectPackageGraph`、`graphNodeId`、`escapeMermaidLabel`、`topoSort`、`comparePackages`；文件顶部注释线索：Shared workspace-package graph discovery and Mermaid identifier helpers for the generated module graph and relationship-diagram generators. Each caller supplies its own group ordering because the documents use different visual priorities; manifest parsing a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `package-invariants.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `name`、`inject`、`apply`、`handwrittenInvariant`、`fixture`；扫描到的测试主题包括 “package invariant gate”、“accepts a hand-owned checking companion with publication metadata”、“accepts an invariant reference owned by a package-local leaf project”、“rejects missing publication metadata and build output”、“rejects foreign, duplicate, and unresolved registrations”、“rejects generated markers and reporter-free executable installers”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `package-invariants.ts`；文件顶部注释把它定位为“Package-invariant companion discovery and structural checks. The runtime registry stays product-independent; this gate makes ownership exhaustive across packages without centralizing package checks.”。固定提交中扫描到的公开或顶层声明包括 `PackageInvariantOwner`、`PackageInvariantViolation`、`packageInvariantOwners`、`collectPackageInvariantViolations`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.spec.ts)、[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.spec.ts)、[scripts/verify-package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-package-invariants.ts)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.spec.ts)、[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 362 行；扫描到的声明包括 `PackageInvariantOwner`、`PackageInvariantViolation`、`packageInvariantOwners`、`collectPackageInvariantViolations`、`formatPackageInvariantViolation`、`readManifest`、`addViolation`、`checkManifest`；文件顶部注释线索：Package-invariant companion discovery and structural checks. The runtime registry stays product-independent; this gate makes ownership exhaustive across packages without centralizing package checks.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/paired-markdown-derivatives.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `paired-markdown-derivatives.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的测试主题包括 “partitionPairedMarkdownDerivatives”、“treats a complete byte-identical Chinese sequence as derivative”、“keeps reordered, changed, partial, and orphan Chinese sequences primary”、“requires the fence kind to match as well as the body”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `paired-markdown-derivatives.ts`；文件顶部注释把它定位为“Separate byte-identical Chinese Markdown code blocks from the primary checks performed on their unsuffixed English siblings. The bilingual pairing gate owns cross-language identity; source-oriented gates consume one copy.”。固定提交中扫描到的公开或顶层声明包括 `MarkdownDerivativePartition`、`partitionPairedMarkdownDerivatives`、`unsuffixedSibling`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck.ts)、[scripts/paired-markdown-derivatives.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.spec.ts)、[scripts/verify-type-equiv.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-type-equiv.ts)
- 对应测试：[scripts/paired-markdown-derivatives.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `MarkdownDerivativePartition`、`partitionPairedMarkdownDerivatives`、`unsuffixedSibling`；文件顶部注释线索：Separate byte-identical Chinese Markdown code blocks from the primary checks performed on their unsuffixed English siblings. The bilingual pairing gate owns cross-language identity; source-oriented gates consume one copy.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/prepare-ci-bubblewrap.sh](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/prepare-ci-bubblewrap.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `prepare-ci-bubblewrap.sh`；把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `project-doc-site.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.ts)、[website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/docs.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 494 行；扫描到的声明包括 `unexpectedWebsiteMarkdown`、`fixture`；扫描到的测试主题包括 “website source layout”、“rejects Markdown outside the subtree instructions”、“contains no tracked or unignored documentation copies”、“publishableImage”、“accepts a regular file inside the repository”、“refuses a target whose real path escapes the repository”；文件顶部注释线索：Tests for the documentation website projection adapter.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：文档网站投影器
- 这个文件有什么用：它把 canonical Markdown 投影成 VitePress 文档树，并重写链接、图片和 frontmatter。
- 为什么这样设计：把“文档网站投影器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/docs.ts)、[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.spec.ts)、[website/.vitepress/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/.vitepress/config.ts)
- 对应测试：[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 460 行；扫描到的声明包括 `RewriteMarkdownOptions`、`rewriteMarkdown`、`addProjectionFrontmatter`、`projectedPageContent`、`publishableImage`、`docsSourceFiles`、`projectDocs`、`repoPath`；文件顶部注释线索：Build-time projection from canonical repository Markdown into VitePress. The generated tree is disposable: sources stay in their owning docs/ tier, while this adapter rewrites cross-source links for the public site.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-reference-faces.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-reference-faces.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `project-reference-faces.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/project-reference-faces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-reference-faces.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `writeJson`、`workspaceFixture`；扫描到的测试主题包括 “Project Reference compiler faces”、“allows neutral projects in either graph and matching split leaves”、“rejects the opposite leaf and the solution root of a split project”、“uses the referencing project face throughout the reachable graph”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/project-reference-faces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-reference-faces.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `project-reference-faces.ts`；文件顶部注释把它定位为“Validate compiler-face isolation across workspace Project Reference graphs.”。固定提交中扫描到的公开或顶层声明包括 `collectProjectReferenceFaceViolations`、`splitProjectRoots`、`projectConfig`、`projectReferences`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/check-workspace-constraints.ts)、[scripts/project-reference-faces.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-reference-faces.spec.ts)
- 对应测试：[scripts/project-reference-faces.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-reference-faces.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `collectProjectReferenceFaceViolations`、`splitProjectRoots`、`projectConfig`、`projectReferences`、`projectFace`、`localExtendsConfig`、`referenceConfigPath`、`containingSplitRoot`；文件顶部注释线索：Validate compiler-face isolation across workspace Project Reference graphs.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publication-payload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `publication-payload.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `validateFixtureTarball`；扫描到的测试主题包括 “publication payload policy”、“rejects source members in packed tarballs”、“rejects source maps in packed tarballs”、“accepts a clean packed tarball”、“recognizes only the canonical Host-for-Client export pair”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `publication-payload.ts`；文件顶部注释把它定位为“Publication payload policy shared by static manifests and packed tarballs.”。固定提交中扫描到的公开或顶层声明包括 `hasTypertRemoteNavigation`、`isForbiddenPublicationFile`、`validateTarballPayload`、`payloadPath`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/check-workspace-constraints.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/check-workspace-constraints.ts)、[scripts/publication-payload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.spec.ts)、[scripts/publish-npm-baseline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publish-npm-baseline.ts)
- 对应测试：[scripts/publication-payload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `hasTypertRemoteNavigation`、`isForbiddenPublicationFile`、`validateTarballPayload`、`payloadPath`；文件顶部注释线索：Publication payload policy shared by static manifests and packed tarballs.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publint-all.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publint-all.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `publint-all.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 67 行；扫描到的声明包括 `fixture`、`run`；扫描到的测试主题包括 “publint package runner”、“lints recursively declared files from an in-memory publication view”、“rejects an export that exists in the workspace but is not published”、“rejects a public export whose built file is missing”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publint-all.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publint-all.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `publint-all.ts`；文件顶部注释把它定位为“Run publint over the exact manifest-declared publication view of every package.”。固定提交中扫描到的公开或顶层声明包括 `workspacePackages`、`publintConcurrency`、`publicationFiles`、`addPath`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/publint-all.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publint-all.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 163 行；扫描到的声明包括 `workspacePackages`、`publintConcurrency`、`publicationFiles`、`addPath`、`runPublint`、`runAll`、`printResult`；文件顶部注释线索：Run publint over the exact manifest-declared publication view of every package.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/publish-npm-baseline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publish-npm-baseline.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `publish-npm-baseline.ts`；文件顶部注释把它定位为“Build, publish, and verify one commit-addressed npm workspace baseline.”。固定提交中扫描到的公开或顶层声明包括 `BaselinePackPlan`、`CommandRunner`、`DetachedWorktree`、`WorkspacePackageSet`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1083 行；扫描到的声明包括 `BaselinePackPlan`、`CommandRunner`、`DetachedWorktree`、`WorkspacePackageSet`、`ReleaseBundle`、`InstalledBundleSmoke`、`BaselinePackager`、`RegistryPublication`；扫描到的测试主题包括 “${result.stdout}\n${result.stderr}”；文件顶部注释线索：Build, publish, and verify one commit-addressed npm workspace baseline.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/bump.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `release/bump.ts`；文件顶部注释把它定位为“Bump one release family's version and commit it, so the published version is readable from the repository rather than derived inside CI (rationale). The dsh family shares one version across its members and the workspace root: major, minor, patch, or an expl...”。固定提交中扫描到的公开或顶层声明包括 `compareVersions`、`nextVendorVersion`、`reachesPayload`、`releaseNumbers`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)、[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 368 行；扫描到的声明包括 `compareVersions`、`nextVendorVersion`、`reachesPayload`、`releaseNumbers`、`compareReleaseNumbers`、`prereleaseOf`、`nextSharedVersion`、`lastTaggedVersion`；文件顶部注释线索：Bump one release family's version and commit it, so the published version is readable from the repository rather than derived inside CI (rationale). The dsh family shares one version across its members and the workspace root: major, minor, patch, or an expl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `release/families.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/bump.ts)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `member`；扫描到的测试主题包括 “release families”、“names one tag for the whole dsh family and one per vendored package”、“rejects a family whose members disagree on the shared version”、“accepts independent vendored versions and rejects an unpublishable one”、“publishes a dependency before its consumer, and orders ties by name”、“reports a runtime dependency cycle instead of emitting an arbitrary order”；文件顶部注释线索：Release family discovery, publish order, tag naming, and the bump judgements.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `release/families.ts`；文件顶部注释把它定位为“The three independent publish sequences this repository releases from (packages/ + apps/, vendor/, and native/) and the two this module owns: dsh and vendor. Each family carries its own version baseline, tag naming, and publish set, so releasing one never r...”。固定提交中扫描到的公开或顶层声明包括 `ReleaseMember`、`InstalledEntry`、`releaseFamily`、`tarballName`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/publication-payload.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/publication-payload.ts)、[scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/bump.ts)、[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)、[scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/pack.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 308 行；扫描到的声明包括 `ReleaseMember`、`InstalledEntry`、`releaseFamily`、`tarballName`、`readManifest`、`requireString`、`DshFamily`、`VendorFamily`；文件顶部注释线索：The three independent publish sequences this repository releases from (packages/ + apps/, vendor/, and native/) and the two this module owns: dsh and vendor. Each family carries its own version baseline, tag naming, and publish set, so releasing one never r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/pack.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `release/pack.ts`；文件顶部注释把它定位为“Pack one release family's whole publish set into a single directory, in publish order, and record that order for the publish step. The pack step is the release boundary: it runs without credentials, produces every tarball from one commit, and hands the publ...”。固定提交中扫描到的公开或顶层声明包括 `packMember`、`main`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)、[scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/tarball.ts)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.spec.ts)、[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)、[scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-built-package-invariants.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的声明包括 `packMember`、`main`；文件顶部注释线索：Pack one release family's whole publish set into a single directory, in publish order, and record that order for the publish step. The pack step is the release boundary: it runs without credentials, produces every tarball from one commit, and hands the publ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布命令执行器
- 这个文件有什么用：它提供 attempt、capture、run 和 isEntry 等发布命令执行辅助，统一输出、失败和重试边界。
- 为什么这样设计：把“发布命令执行器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/bump.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/bump.ts)、[scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/pack.ts)、[scripts/release/publish.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/publish.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `RunOptions`、`CommandResult`、`attempt`、`capture`、`run`、`isEntry`；文件顶部注释线索：Process helpers shared by the release scripts: the release steps drive git, pnpm, npm, and tar, and each needs one of three failure behaviours.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/publish.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/publish.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布状态协调器
- 这个文件有什么用：它处理 registry 状态、完整性 hash、幂等发布和 transient error。
- 为什么这样设计：把“发布状态协调器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)、[scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/tarball.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 169 行；扫描到的声明包括 `isTransientFailure`、`integrityOf`、`registryState`、`publishTarball`、`main`；文件顶部注释线索：Publish one packed release family from the tarballs the pack step produced. Publication is decided per package against the registry, never from a list of "what this release includes": a version the registry lacks is published, a version whose published tarb...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/tarball.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `release/tarball.ts`；文件顶部注释把它定位为“Reading packed npm tarballs and the order file that accompanies them. The release steps after pack treat a directory of tarballs as the unit of work, so they read what a tarball declares rather than what the checkout currently says.”。固定提交中扫描到的公开或顶层声明包括 `PUBLISH_ORDER_FILE`、`PackedIdentity`、`tarballFiles`、`packedIdentity`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)、[scripts/release/pack.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/pack.ts)、[scripts/release/publish.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/publish.ts)、[scripts/release/verify-packed-install.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/verify-packed-install.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `PUBLISH_ORDER_FILE`、`PackedIdentity`、`tarballFiles`、`packedIdentity`、`readPublishOrder`；文件顶部注释线索：Reading packed npm tarballs and the order file that accompanies them. The release steps after pack treat a directory of tarballs as the unit of work, so they read what a tarball declares rather than what the checkout currently says.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/verify-packed-install.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/verify-packed-install.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `release/verify-packed-install.ts`；文件顶部注释把它定位为“Install packed tarballs into a throwaway consumer outside the repository and drive the installed executable with plain Node. Every tarball the installed tree needs comes from --from, so the only registry traffic is for external dependencies. That matters be...”。固定提交中扫描到的公开或顶层声明包括 `consumerEnvironment`、`packedDependencies`、`main`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)、[scripts/release/tarball.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/tarball.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 121 行；扫描到的声明包括 `consumerEnvironment`、`packedDependencies`、`main`；文件顶部注释线索：Install packed tarballs into a throwaway consumer outside the repository and drive the installed executable with plain Node. Every tarball the installed tree needs comes from --from, so the only registry traffic is for external dependencies. That matters be...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/release/verify.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/verify.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：发布资格验证器
- 这个文件有什么用：它检查 release family、版本基线、tag 和 publishability gate。
- 为什么这样设计：把“发布资格验证器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/release/families.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.ts)、[scripts/release/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/process.ts)
- 对应测试：[scripts/release/families.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/release/families.spec.ts)、[scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-built-package-invariants.spec.ts)、[scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-config-source-ownership.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `verifyPublishable`、`verifyTag`、`main`；文件顶部注释线索：Verify a release family's version baseline, and — when publishing — that the run comes from the family's tag and its members are publishable. Publication happens only from GitHub Actions, so the tag and publishability checks are gates on the workflow, not a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `repo-files.ts`；文件顶部注释把它定位为“Shared repository file discovery and line-oriented reference scanning.”。固定提交中扫描到的公开或顶层声明包括 `RepoFile`、`ReferenceViolation`、`isArchivedAgentNotePath`、`uniqueRepoFiles`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/doc-typecheck.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/doc-typecheck.ts)、[scripts/verify-doc-refs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-refs.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `RepoFile`、`ReferenceViolation`、`isArchivedAgentNotePath`、`uniqueRepoFiles`、`findReferenceViolations`；文件顶部注释线索：Shared repository file discovery and line-oriented reference scanning.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/rescope-vendor.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/rescope-vendor.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `rescope-vendor.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/rescope-vendor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/rescope-vendor.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的测试主题包括 “exactEditState”、“classifies an insertion by its target form, so a duplicate is invalid”、“classifies a deletion by its source form, and requires its remainder to survive”、“requires a replacement to leave no source form and the exact target count”；文件顶部注释线索：Acceptance-path coverage for the rescope codemod's exact-edit classifier: a duplicated insertion — what a non-idempotent apply produces — must be rejected rather than applied again.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/rescope-vendor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/rescope-vendor.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `rescope-vendor.ts`；文件顶部注释把它定位为“Rescope the vendored Cordis packages into the @deepseek-ai scope, and undo that rescope with --reverse. Every harness package declares cordis as a peer dependency, so publication carries this framework layer too; publishing it under the upstream names would...”。固定提交中扫描到的公开或顶层声明包括 `ExactEditState`、`exactEditState`、`excluded`、`escapeRegExp`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[scripts/rescope-vendor.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/rescope-vendor.spec.ts)
- 对应测试：[scripts/rescope-vendor.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/rescope-vendor.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 690 行；扫描到的声明包括 `ExactEditState`、`exactEditState`、`excluded`、`escapeRegExp`、`patterns`、`skipped`、`rewriteLine`、`rewrite`；文件顶部注释线索：Rescope the vendored Cordis packages into the @deepseek-ai scope, and undo that rescope with --reverse. Every harness package declares cordis as a peer dependency, so publication carries this framework layer too; publishing it under the upstream names would...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-gates.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-gates.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `run-gates.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-gates.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `gate`、`resultFor`、`withPnpmEntrypoint`、`withEnv`；扫描到的测试主题包括 “gate graph validation”、“keeps the public repository link policy in the documentation gate”、“keeps native Windows coverage blocking while portability inventory remains observational”、“rejects an invalid worker count before starting a child”、“skips dependents after their prerequisite fails”、“Oxlint gate”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-gates.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-gates.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：质量门禁调度器
- 这个文件有什么用：它按模式、并发度和依赖图调度质量门禁，处理跳过规则并汇总结果。
- 为什么这样设计：把“质量门禁调度器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/coverage-exempt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/coverage-exempt.ts)、[scripts/run-gates.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-gates.spec.ts)
- 对应测试：[scripts/run-gates.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-gates.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 890 行；扫描到的声明包括 `Mode`、`Gate`、`GateResult`、`defaultConcurrency`、`gatesForMode`、`runGates`、`runGate`、`formatGateResultReason`；文件顶部注释线索：Run local and CI quality gates with bounded in-process scheduling. Package scripts own public aggregate names; this runner owns their validated dependency graphs, scheduler environment, and process diagnostics. @see ../.agents/notes/implemented/process/2026...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-oxlint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-oxlint.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `run-oxlint.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/run-oxlint.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-oxlint.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的测试主题包括 “Oxlint invocation”、“preserves the ordinary default invocation”、“bounds both worker pools from one setting”、“rejects a competing direct worker bound”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/run-oxlint.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-oxlint.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `run-oxlint.ts`；固定提交中扫描到的公开或顶层声明包括 `OxlintInvocation`、`resolveOxlintInvocation`、`isFixInvocation`、`completeFrom`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/run-oxlint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-oxlint.spec.ts)
- 对应测试：[scripts/run-oxlint.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/run-oxlint.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的声明包括 `OxlintInvocation`、`resolveOxlintInvocation`、`isFixInvocation`、`completeFrom`、`main`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/session-fixture-layout.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.snapshot.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试夹具
- 这个文件有什么用：它为 会话 的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行；扫描到的测试主题包括 “keeps every session-format JSONL fixture in canonical packed layout”；文件顶部注释线索：Repository-wide canonical-layout check for committed session fixtures.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/session-fixture-layout.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `chunkRun`、`unpackedFixture`、`decodedBody`；扫描到的测试主题包括 “canonicalSessionFixture”、“preserves the header line and packs an unpacked event run losslessly”、“ignores JSONL whose first record is not a session header”、“is idempotent for an already packed fixture”、“fails loud on malformed records after a session header”、“labels malformed packed rows with the fixture path and line”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/session-fixture-layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Canonical packed-row layout helpers for repository session fixtures.”。固定提交中扫描到的公开或顶层声明包括 `SessionFixtureLayout`、`canonicalSessionFixture`、`inspectSessionFixtureLayouts`、`recordLines`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[scripts/migrate-packed-session-fixtures.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/migrate-packed-session-fixtures.ts)、[scripts/session-fixture-layout.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.snapshot.ts)、[scripts/session-fixture-layout.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.spec.ts)
- 对应测试：[scripts/session-fixture-layout.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.snapshot.ts)、[scripts/session-fixture-layout.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/session-fixture-layout.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `SessionFixtureLayout`、`canonicalSessionFixture`、`inspectSessionFixtureLayouts`、`recordLines`、`parseRecord`、`isSessionHeader`、`decodeBody`、`renderFixture`；文件顶部注释线索：Canonical packed-row layout helpers for repository session fixtures.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/slot-walk.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/slot-walk.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `slot-walk.ts`；文件顶部注释把它定位为“AST helpers for the client slot surface: the SlotMap declaration merges that type every slot, and the slots.register call sites that say who already occupies one. Both readings are lexical (no type-checker program): the client catalog generator consumes the...”。固定提交中扫描到的公开或顶层声明包括 `SlotDeclaration`、`SlotRegistration`、`TypeDeclaration`、`ScannedFile`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.spec.ts)、[scripts/gen-client-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.ts)
- 对应测试：[scripts/gen-client-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-client-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 429 行；扫描到的声明包括 `SlotDeclaration`、`SlotRegistration`、`TypeDeclaration`、`ScannedFile`、`scanSlotFiles`、`indexExportedTypes`、`slotDeclarations`、`slotRegistrations`；文件顶部注释线索：AST helpers for the client slot surface: the SlotMap declaration merges that type every slot, and the slots.register call sites that say who already occupies one. Both readings are lexical (no type-checker program): the client catalog generator consumes the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/smoke-python-runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/smoke-python-runtime.py)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：智能体运行时
- 这个文件有什么用：它参与 Python 支持、运行时 的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 970 行；扫描到的声明包括 `MockModelHandler`、`do_POST`、`log_message`、`completion_chunks`、`minimal_tool_followup`、`advanced_tool_followup`、`text_chunks`、`tool_call_chunks`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-fixture-cleanup.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `test-fixture-cleanup.ts`；文件顶部注释把它定位为“Junction-safe fixture cleanup for Windows. Test fixtures junction the REAL scripts/, node_modules, and tsx package directories so installer probes resolve through them; Windows recursive deletion — both Node's rmSync and Git's worktree remove — follows MOUN...”。固定提交中扫描到的公开或顶层声明包括 `unlinkFixtureLinks`、`removeFixtureSafely`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/install-lefthook.spec.ts)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)
- 对应测试：[scripts/install-lefthook.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/install-lefthook.spec.ts)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `unlinkFixtureLinks`、`removeFixtureSafely`；文件顶部注释线索：Junction-safe fixture cleanup for Windows. Test fixtures junction the REAL scripts/, node_modules, and tsx package directories so installer probes resolve through them; Windows recursive deletion — both Node's rmSync and Git's worktree remove — follows MOUN...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `test-invariants.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.ts)、[scripts/test-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 419 行；扫描到的声明包括 `TestInvariantProbe`、`deferred`、`requiredConfig`、`invalidConfigApply`、`rejectionOf`、`expectRequiredConfigValidation`、`withFakeCompanions`、`withDelayedFirstCompanion`；扫描到的测试主题包括 “global test invariant host”、“uses one exhaustive topology to reserve every package name with enabled checks”、“mounts the owning package companion while leaving non-package roots service-only”、“loads and executes every source companion through the real Loader setup”、“recognizes focused invariant suites without a package inventory”、“preserves config validation failures without starting the rejected plugin”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/test-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `test-invariants.ts`；文件顶部注释把它定位为“Vitest-wide invariant host. Ordinary Cordis roots receive the invariant service with global enablement plus the current test package's companion. One topology test mounts every companion; focused invariant tests own their service topology explicitly.”。固定提交中扫描到的公开或顶层声明包括 `TestInvariantCompanion`、`TEST_INVARIANT_READY_SERVICE`、`testInvariantCompanions`、`usesManualInvariantTree`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.spec.ts)
- 对应测试：[scripts/test-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-invariants.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 273 行；扫描到的声明包括 `TestInvariantCompanion`、`TEST_INVARIANT_READY_SERVICE`、`testInvariantCompanions`、`usesManualInvariantTree`、`testInvariantCompanionPaths`、`TestAttachmentStore`、`startInvariantHost`、`hasBarrierOwner`；文件顶部注释线索：Vitest-wide invariant host. Ordinary Cordis roots receive the invariant service with global enablement plus the current test package's companion. One topology test mounts every companion; focused invariant tests own their service topology explicitly.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `translation-brief.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 283 行；扫描到的测试主题包括 “markdown spans”、“lists units with container-scoped kinds in document order”、“lists heading sections with a preamble span and heading labels”、“labels units by their node type”、“aligns sections by depth only, so translated heading text still maps”、“aligns span lists only on equal non-empty kind sequences”；文件顶部注释线索：Regression tests for the minimal-update briefing assembly.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `translation-brief.ts`；文件顶部注释把它定位为“Pure assembly of the minimal-update briefing for one out-of-sync translation pair: the authored side's changes since the last confirmed state at the narrowest safely mapped granularity (code-fence-only splice, changed Markdown units, heading sections, whole...”。固定提交中扫描到的公开或顶层声明包括 `MarkdownSpan`、`markdownUnits`、`sectionSpans`、`spansAligned`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)、[scripts/gen-translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-translation-brief.ts)、[scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.spec.ts)
- 对应测试：[scripts/translation-brief.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-brief.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 512 行；扫描到的声明包括 `MarkdownSpan`、`markdownUnits`、`sectionSpans`、`spansAligned`、`changedSpanIndices`、`computeMechanicalUpdate`、`TerminologyRow`、`parseTerminologyRows`；文件顶部注释线索：Pure assembly of the minimal-update briefing for one out-of-sync translation pair: the authored side's changes since the last confirmed state at the narrowest safely mapped granularity (code-fence-only splice, changed Markdown units, heading sections, whole...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-git.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `translation-pairing-git.ts`；文件顶部注释把它定位为“Git-blob operations owned by the bilingual pairing workflow.”。固定提交中扫描到的公开或顶层声明包括 `GIT_COMMAND_MAX_BUFFER`、`gitBlobHash`、`runGit`、`GitIndexBlob`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)
- 对应测试：[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 96 行；扫描到的声明包括 `GIT_COMMAND_MAX_BUFFER`、`gitBlobHash`、`runGit`、`GitIndexBlob`、`readGitIndexBlob`、`storeGitBlob`；文件顶部注释线索：Git-blob operations owned by the bilingual pairing workflow.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `translation-pairing-merge.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/test-fixture-cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/test-fixture-cleanup.ts)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 576 行；扫描到的声明包括 `git`、`write`、`shellQuote`、`installFixtureRuntime`、`startMergeWithFakeNode`、`createFixture`、`record`、`commitPair`；扫描到的测试主题包括 “translation pairing merge composition”、“rejects a pairing-record path outside the repository”、“merges the owner blobs named by three valid records”、“merges a generated source without an English language switcher”、“rejects an authored source without an English language switcher”、“rejects generated Chinese content without its English backlink”；文件顶部注释线索：Integration coverage for automatic and explicit pairing-record conflict resolution.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `translation-pairing-merge.ts`；文件顶部注释把它定位为“Fail-closed composition of bilingual pairing records during Git merges.”。固定提交中扫描到的公开或顶层声明包括 `TranslationPairingMergeResult`、`mergeTranslationPairingRecords`、`resolveTranslationPairingConflicts`、`readGitBlob`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-record.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)、[scripts/merge-translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/merge-translation-pairing.ts)
- 对应测试：[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 342 行；扫描到的声明包括 `TranslationPairingMergeResult`、`mergeTranslationPairingRecords`、`resolveTranslationPairingConflicts`、`readGitBlob`、`readMergeDefault`、`assertDefaultTextMerge`、`runTextMerge`、`mergeBlobTriplet`；文件顶部注释线索：Fail-closed composition of bilingual pairing records during Git merges.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-record.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `translation-pairing-record.ts`；文件顶部注释把它定位为“Canonical paths, parsing, and rendering for bilingual pairing records.”。固定提交中扫描到的公开或顶层声明包括 `TranslationPairPaths`、`TranslationPairingRecord`、`translationPairPaths`、`translationPairPathsFromMeta`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing-merge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)
- 对应测试：[scripts/translation-pairing-merge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-merge.spec.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的声明包括 `TranslationPairPaths`、`TranslationPairingRecord`、`translationPairPaths`、`translationPairPathsFromMeta`、`parseTranslationPairingRecord`、`renderTranslationPairingRecord`；文件顶部注释线索：Canonical paths, parsing, and rendering for bilingual pairing records.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `translation-pairing.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-record.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 366 行；扫描到的声明包括 `signature`、`gitSupportsObjectFormat`；扫描到的测试主题包括 “translation pairing snapshots”、“stores exact uncommitted bytes for later recovery by object ID”、“fails before a sidecar can reference an unavailable object”、“fails clearly when Git cannot be started”、“reads staged bytes independently of the working tree”、“translation pairing manifest”；文件顶部注释线索：Regression tests for bilingual snapshots, corpus scope, and structure.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：文档翻译配对检查器
- 这个文件有什么用：它维护中英文文档三件套、生成区域和 Git blob hash，防止翻译文件与源文件漂移。
- 为什么这样设计：把“文档翻译配对检查器”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-record.spec.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog.ts)、[scripts/gen-translation-brief.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-translation-brief.ts)
- 对应测试：[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-cordis-catalog-record.spec.ts)、[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 414 行；扫描到的声明包括 `partitionGeneratedRegions`、`blobHash`、`parsePairMeta`、`renderPairMeta`、`TranslationPairingManifest`、`TRANSLATION_SCOPE_GLOB_EXCLUDES`、`isTranslationScopeFile`、`parseTranslationPairingManifest`；文件顶部注释线索：Pure parsing and structural helpers for the bilingual-document pairing gate. Kept separate from the CLI so corpus discovery and signature behavior can be regression-tested without reading or mutating the repository tree. Also the one home of the generated-r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-prompt.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.snapshot.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试夹具
- 这个文件有什么用：它为 `scripts` 包里的 `translation-prompt.snapshot.ts` 的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的测试主题包括 “translation prompt runnable snapshot”、“assembles the reviewed examples and consumes a recorded new-pair response”；文件顶部注释线索：Runnable keyless snapshot for the assembled translation request and consumed response.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `translation-prompt.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 230 行；扫描到的测试主题包括 “translation prompt rendering”、“renders both directions with every placeholder resolved”、“contains every embedded example”、“states the selected v7 safeguards”、“rejects a template with unknown or missing placeholders”、“rejects unmatched placeholder delimiters”；文件顶部注释线索：Unit tests for the prompt-v7 content and unchanged three-section protocol.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：提示词与上下文
- 这个文件有什么用：它把 提示词 的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.spec.ts)、[scripts/verify-translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-translation-prompt.ts)
- 对应测试：[scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 259 行；扫描到的声明包括 `TRANSLATION_PROMPT_PLACEHOLDERS`、`TranslationPromptInput`、`TranslationExample`、`TranslationRequestInput`、`TranslationRequest`、`TranslationResponse`、`documentedTranslationPromptPlaceholders`、`renderTranslationPrompt`；文件顶部注释线索：Executable renderer and response parser for the committed documentation-translation prompt contract (prompt-v4). The v4 contract: three placeholders (source_lang, target_lang, terminology), whole-document translation, and a three-section response (<translat...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/ts-project.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ts-project.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `ts-project.ts`；文件顶部注释把它定位为“Shared TypeScript Program construction for repository gates that need real cross-file symbols and types instead of isolated syntax trees.”。固定提交中扫描到的公开或顶层声明包括 `repositoryConfigHost`、`TypeScriptProject`、`loadProjectGraph`、`parseConfig`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/clean.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/clean.ts)、[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.spec.ts)、[scripts/gen-doc-graphs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.ts)
- 对应测试：[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-doc-graphs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 118 行；扫描到的声明包括 `repositoryConfigHost`、`TypeScriptProject`、`loadProjectGraph`、`parseConfig`、`semanticCompilerOptions`；文件顶部注释线索：Shared TypeScript Program construction for repository gates that need real cross-file symbols and types instead of isolated syntax trees.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-agent-note-classification.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-agent-note-classification.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 智能体；文件顶部注释把它定位为“Enforce Agent Note lifecycle/class paths and dated filenames. Structural rules are shared with agent-note-tree.ts; the closed classification rules live in .agents/notes/README.md.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/agent-note-tree.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；文件顶部注释线索：Enforce Agent Note lifecycle/class paths and dated filenames. Structural rules are shared with agent-note-tree.ts; the closed classification rules live in .agents/notes/README.md.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-agent-note-format.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-agent-note-format.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 智能体；文件顶部注释把它定位为“Enforce Agent Note headers, lifecycle-specific sections, alternatives, and retired marker rules. Classification and filenames belong to the sibling tree gate; translation structure belongs to the pairing gate. Exact format and grandfathering rules live in ....”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/agent-note-tree.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 94 行；文件顶部注释线索：Enforce Agent Note headers, lifecycle-specific sections, alternatives, and retired marker rules. Classification and filenames belong to the sibling tree gate; translation structure belongs to the pairing gate. Exact format and grandfathering rules live in ....。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-archived-agent-notes.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 智能体；文件顶部注释把它定位为“Verify and append-seal the frozen Agent Note archive.”。固定提交中扫描到的公开或顶层声明包括 `runGit`、`readBaselineManifest`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/agent-note-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/agent-note-tree.ts)、[scripts/archived-agent-notes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `runGit`、`readBaselineManifest`；文件顶部注释线索：Verify and append-seal the frozen Agent Note archive.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-built-package-invariants.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-built-package-invariants.mjs)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-built-package-invariants.mjs`；文件顶部注释把它定位为“Verify every compiled companion through its staged package self-reference under plain Node.”。固定提交中扫描到的公开或顶层声明包括 `copyDeclaredLibFiles`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.spec.ts)、[scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-built-package-invariants.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `copyDeclaredLibFiles`；文件顶部注释线索：Verify every compiled companion through its staged package self-reference under plain Node.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-built-package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-built-package-invariants.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `verify-built-package-invariants.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的声明包括 `fixture`、`verify`；扫描到的测试主题包括 “built package invariant verifier”、“loads the staged compiled self-reference through plain Node and Loader normalization”、“rejects a default export and a broken invariant export map”、“rejects an invariant bundle that needs an unstaged runtime chunk”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-client-domain-graph.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-client-domain-graph.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 浏览器端；文件顶部注释把它定位为“Enforce intra-package domain layering inside packages/client \/src/client/. verify-module-graph covers package-level edges; this gate covers the directory level: domain directories may import contract/ and never each other, and only the assembly point (appl...”。固定提交中扫描到的公开或顶层声明包括 `listSources`、`domainOf`、`checkPackage`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `listSources`、`domainOf`、`checkPackage`；文件顶部注释线索：Enforce intra-package domain layering inside packages/client \/src/client/. verify-module-graph covers package-level edges; this gate covers the directory level: domain directories may import contract/ and never each other, and only the assembly point (appl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-config-source-ownership.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 配置 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-config-source-ownership.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-config-source-ownership.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的测试主题包括 “configuration source ownership gate”、“rejects inline endpoints in shipped bundle patches”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-config-source-ownership.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-config-source-ownership.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 配置；文件顶部注释把它定位为“Gate for forbidden credential or endpoint environment inlines in shipped Cordis configuration. @module scripts/verify-config-source-ownership”。固定提交中扫描到的公开或顶层声明包括 `collectConfigSourceOwnershipViolations`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-config-source-ownership.spec.ts)
- 对应测试：[scripts/verify-config-source-ownership.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-config-source-ownership.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 56 行；扫描到的声明包括 `collectConfigSourceOwnershipViolations`；文件顶部注释线索：Gate for forbidden credential or endpoint environment inlines in shipped Cordis configuration. @module scripts/verify-config-source-ownership。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-cordis-config.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Cordis 插件框架 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-cordis-config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 39 行；扫描到的测试主题包括 “verify-cordis-config metadata expressions”、“accepts a disabled !!js expression”、“rejects an expression in a static metadata field”、“rejects an expression nested below disabled (only the field itself interpolates)”、“rejects a disabled expression that does not parse (the loader would fail the boot)”；文件顶部注释线索：The verify-cordis-config metadata contract: disabled is the one entry metadata field whose !!js expression the Loader interpolates; every other metadata field must stay static, and a disabled expression must parse.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-cordis-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-cordis-config.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义 Cordis 插件框架、配置 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/cordis-config-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/cordis-config-files.ts)、[scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-cordis-config.spec.ts)
- 对应测试：[scripts/verify-cordis-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-cordis-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 497 行；扫描到的声明包括 `metadataExpressionErrors`、`validateClientHalvesDeclared`、`validatePresetPlaneSeparation`、`loadEntries`、`rowIds`、`validateEntry`、`recordPlugin`、`validateExampleResolution`；文件顶部注释线索：Validate Cordis Loader entry metadata and package resolution. The Loader interpolates a plugin entry's config (after declared injections activate, against that plugin context) and the entry disabled field (at every mount decision, against the loader context...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-budgets.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-budgets.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-doc-budgets.ts`；文件顶部注释把它定位为“Enforce wc -w-style ceilings from scripts/doc-budgets.manifest.json. Missing files and invalid ceilings fail; --list reports current usage. Only listed standing docs are budgeted. Ceilings ratchet down with at least 5% headroom; raising one requires the jus...”。固定提交中扫描到的公开或顶层声明包括 `countWords`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `countWords`；文件顶部注释线索：Enforce wc -w-style ceilings from scripts/doc-budgets.manifest.json. Missing files and invalid ceilings fail; --list reports current usage. Only listed standing docs are budgeted. Ceilings ratchet down with at least 5% headroom; raising one requires the jus...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-refs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-refs.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-doc-refs.ts`；文件顶部注释把它定位为“Verify root-relative documentation paths in repo-authored TypeScript. The textual scan covers docs .md and .agents/notes .md, requires the extension, checks matching string literals too, and excludes built declarations and vendored source.”。固定提交中扫描到的公开或顶层声明包括 `findViolations`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `findViolations`；文件顶部注释线索：Verify root-relative documentation paths in repo-authored TypeScript. The textual scan covers docs .md and .agents/notes .md, requires the extension, checks matching string literals too, and excludes built declarations and vendored source.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-site-fragments.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-site-fragments.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `verify-doc-site-fragments.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-doc-site-fragments.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-site-fragments.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `fixture`；扫描到的测试主题包括 “inspectSiteFragments”、“rejects a directory with no built pages”、“resolves clean, encoded, and same-page routes”、“rejects ambiguous built routes”、“rejects malformed fragment hrefs”、“reports missing ids and missing built routes”；文件顶部注释线索：Tests for built-site fragment validation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-doc-site-fragments.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-site-fragments.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-doc-site-fragments.ts`；文件顶部注释把它定位为“Verify fragment links against the HTML emitted by VitePress. Markdown and VitePress use different heading-slug algorithms, so source-link validation alone cannot prove that a published fragment exists. This runs as part of docs:build and can also run direct...”。固定提交中扫描到的公开或顶层声明包括 `BrokenSiteFragment`、`SiteFragmentReport`、`inspectSiteFragments`、`posixPath`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-doc-site-fragments.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-site-fragments.spec.ts)
- 对应测试：[scripts/verify-doc-site-fragments.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-doc-site-fragments.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 157 行；扫描到的声明包括 `BrokenSiteFragment`、`SiteFragmentReport`、`inspectSiteFragments`、`posixPath`、`routeFor`、`aliasesFor`、`decodedFragment`、`main`；文件顶部注释线索：Verify fragment links against the HTML emitted by VitePress. Markdown and VitePress use different heading-slug algorithms, so source-link validation alone cannot prove that a published fragment exists. This runs as part of docs:build and can also run direct...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-dsh-package-licenses.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-dsh-package-licenses.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `verify-dsh-package-licenses.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-dsh-package-licenses.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-dsh-package-licenses.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 59 行；扫描到的声明包括 `writeManifest`、`createWorkspace`；扫描到的测试主题包括 “DSH package license gate”、“checks root, unhyphenated CLI, and dsh-prefixed package names while ignoring other families”、“rejects a missing license declaration”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-dsh-package-licenses.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-dsh-package-licenses.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-dsh-package-licenses.ts`；文件顶部注释把它定位为“Enforce the MIT license declaration for repository-owned DSH npm packages. @module scripts/verify-dsh-package-licenses”。固定提交中扫描到的公开或顶层声明包括 `DshPackageLicenseReport`、`inspectDshPackageLicenses`、`readManifest`、`isStringArray`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-dsh-package-licenses.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-dsh-package-licenses.spec.ts)
- 对应测试：[scripts/verify-dsh-package-licenses.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-dsh-package-licenses.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `DshPackageLicenseReport`、`inspectDshPackageLicenses`、`readManifest`、`isStringArray`、`workspaceManifestPaths`、`printable`；文件顶部注释线索：Enforce the MIT license declaration for repository-owned DSH npm packages. @module scripts/verify-dsh-package-licenses。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-export-jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-export-jsdoc.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-export-jsdoc.ts`；文件顶部注释把它定位为“Enforce JSDoc on every non-vendored package export. Functions and public class methods require parameter and non-void return documentation; exported declarations require description prose. Inline callable types, overload signatures, namespace members, and p...”。固定提交中扫描到的公开或顶层声明包括 `collectExportJsdocViolations`、`isExported`、`isNonPublic`、`isStatic`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/jsdoc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/jsdoc.ts)、[packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/tests/verify-export-jsdoc.spec.ts)
- 对应测试：[packages/core/agent/tests/verify-export-jsdoc.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/tests/verify-export-jsdoc.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 617 行；扫描到的声明包括 `collectExportJsdocViolations`、`isExported`、`isNonPublic`、`isStatic`、`thisReceiver`、`unwrapExpression`、`callableAnnotation`、`heritageExemption`；文件顶部注释线索：Enforce JSDoc on every non-vendored package export. Functions and public class methods require parameter and non-void return documentation; exported declarations require description prose. Inline callable types, overload signatures, namespace members, and p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-md-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `verify-md-links.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `layout`、`violationsIn`；扫描到的测试主题包括 “documentAnchors”、“slugs rendered heading text, suffixes repeats, and reads explicit <a id> anchors”、“keeps underscores the way GitHub does”、“slugs a heading containing a link from its rendered text”、“bumps repeat suffixes past occupied slugs, matching GitHub”、“ignores <a id> inside code fences, inline code, and HTML comments”；文件顶部注释线索：Acceptance-path coverage for fragment validation in verify-md-links: a #fragment onto a Markdown target — same-file anchors included — must name a real heading slug or explicit <a id>, while non-Markdown fragments and external targets stay out of scope.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-md-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-md-links.ts`；文件顶部注释把它定位为“Verify that relative Markdown links, images, and definitions resolve — the target file must exist AND a #fragment onto a Markdown target (including a same-file #anchor) must name a real heading slug or explicit <a id>. URL and root-absolute targets are excl...”。固定提交中扫描到的公开或顶层声明包括 `githubSlug`、`documentAnchors`、`anchorCache`、`findViolations`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)、[scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-config-catalog.ts)、[scripts/gen-persistence-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/gen-persistence-catalog.ts)
- 对应测试：[scripts/verify-md-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-links.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 216 行；扫描到的声明包括 `githubSlug`、`documentAnchors`、`anchorCache`、`findViolations`、`isExternal`、`pathPart`、`fragmentPart`；文件顶部注释线索：Verify that relative Markdown links, images, and definitions resolve — the target file must exist AND a #fragment onto a Markdown target (including a same-file #anchor) must name a real heading slug or explicit <a id>. URL and root-absolute targets are excl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-md-wrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-md-wrap.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-md-wrap.ts`；文件顶部注释把它定位为“Reject Markdown prose paragraphs spanning multiple physical lines. The GFM AST distinguishes paragraphs—including those in lists and blockquotes—from multiline structural nodes. The checker never rewrites; symlinked instruction files are deduped. VitePress ...”。固定提交中扫描到的公开或顶层声明包括 `maskVitePressStructure`、`findViolations`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 85 行；扫描到的声明包括 `maskVitePressStructure`、`findViolations`；文件顶部注释线索：Reject Markdown prose paragraphs spanning multiple physical lines. The GFM AST distinguishes paragraphs—including those in lists and blockquotes—from multiline structural nodes. The checker never rewrites; symlinked instruction files are deduped. VitePress ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-mermaid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-mermaid.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-mermaid.ts`；文件顶部注释把它定位为“Parse every repo-authored Mermaid fence with Mermaid itself, catching syntax that link and fence checks cannot. Scope intentionally matches the Markdown link gate, including standing docs, package/example docs, and agent skills. Run with tsx scripts/verify-...”。固定提交中扫描到的公开或顶层声明包括 `extractMermaidBlocks`、`formatError`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `extractMermaidBlocks`、`formatError`；文件顶部注释线索：Parse every repo-authored Mermaid fence with Mermaid itself, catching syntax that link and fence checks cannot. Scope intentionally matches the Markdown link gate, including standing docs, package/example docs, and agent skills. Run with tsx scripts/verify-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-node-next-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-node-next-types.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：类型契约
- 这个文件有什么用：它描述 `scripts` 包里的 `verify-node-next-types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 164 行；扫描到的声明包括 `readPackage`、`workspacePackages`、`relativeSpecifiersMissingExtensions`、`publicSpecifiers`、`linkPackage`；文件顶部注释线索：Verify that built package declarations are consumable by a standard external TypeScript ESM project using NodeNext resolution. Run after pnpm run build has emitted declaration files under package lib/types directories.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-package-invariants.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-package-invariants.ts`；文件顶部注释把它定位为“Verify package-owned invariant source and publication rules.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/package-invariants.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.ts)
- 对应测试：[scripts/package-invariants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/package-invariants.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；文件顶部注释线索：Verify package-owned invariant source and publication rules.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-paths.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-package-paths.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-package-paths.ts`；文件顶部注释把它定位为“Find stale root-relative packages/... references in repo-authored prose and TypeScript. A missing path is reported only when it names a real package leaf outside its own explaining group directory; globs, placeholders, hypothetical packages, and unbuilt lib...”。固定提交中扫描到的公开或顶层声明包括 `realPackageNames`、`isDriftedPackageReference`、`findViolations`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `realPackageNames`、`isDriftedPackageReference`、`findViolations`；文件顶部注释线索：Find stale root-relative packages/... references in repo-authored prose and TypeScript. A missing path is reported only when it names a real package leaf outside its own explaining group directory; globs, placeholders, hypothetical packages, and unbuilt lib...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-readme-limitations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-package-readme-limitations.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-package-readme-limitations.ts`；文件顶部注释把它定位为“Doc-sync gate for the canonical package-README limitations section. It scans package manifests, rejects missing or variant sections, and requires one top-level bullet; audited packages in NO_LIMITATIONS must omit it. See the limitations Agent Note.”。固定提交中扫描到的公开或顶层声明包括 `isLimitationsLike`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `isLimitationsLike`；文件顶部注释线索：Doc-sync gate for the canonical package-README limitations section. It scans package manifests, rejects missing or variant sections, and requires one top-level bullet; audited packages in NO_LIMITATIONS must omit it. See the limitations Agent Note.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-package-readme-model-experience.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-package-readme-model-experience.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-package-readme-model-experience.ts`；文件顶部注释把它定位为“Doc-sync gate for package README Model Experience sections. It validates audited package classifications, model/token/KV-cache fields, package-owned text blocks, generated-catalog links, and final-section order. See the Model Experience Agent Note.”。固定提交中扫描到的公开或顶层声明包括 `validateNestedVerbatim`、`headingFragment`、`isDirectSystemPromptEntry`、`toolCatalogLinkFragments`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 553 行；扫描到的声明包括 `validateNestedVerbatim`、`headingFragment`、`isDirectSystemPromptEntry`、`toolCatalogLinkFragments`；文件顶部注释线索：Doc-sync gate for package README Model Experience sections. It validates audited package classifications, model/token/KV-cache fields, package-owned text blocks, generated-catalog links, and final-section order. See the Model Experience Agent Note.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-public-repository-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-public-repository-links.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `verify-public-repository-links.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-public-repository-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-public-repository-links.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的测试主题包括 “repository link policy”、“rejects encoded and case-varied references to the unavailable repository”、“preserves frozen archived Agent Notes”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-public-repository-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-public-repository-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-public-repository-links.ts`；文件顶部注释把它定位为“Reject tracked files that reference an unavailable legacy repository.”。固定提交中扫描到的公开或顶层声明包括 `UnavailableRepositoryReference`、`findUnavailableRepositoryReferences`、`canonicalReferenceText`、`trackedFiles`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-public-repository-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-public-repository-links.spec.ts)
- 对应测试：[scripts/verify-public-repository-links.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-public-repository-links.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 90 行；扫描到的声明包括 `UnavailableRepositoryReference`、`findUnavailableRepositoryReferences`、`canonicalReferenceText`、`trackedFiles`、`scanRepository`；文件顶部注释线索：Reject tracked files that reference an unavailable legacy repository.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-runtime-closure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-runtime-closure.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 运行时；文件顶部注释把它定位为“Verify that the executable deploy manifest supplies every required workspace peer in its dependency graph. With auto peer installation disabled, a missing root peer can otherwise fail only when Cordis loads the packaged plugin.”。固定提交中扫描到的公开或顶层声明包括 `loadWorkspacePackages`、`loadManifest`、`formatChain`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的声明包括 `loadWorkspacePackages`、`loadManifest`、`formatChain`；文件顶部注释线索：Verify that the executable deploy manifest supplies every required workspace peer in its dependency graph. With auto peer installation disabled, a missing root peer can otherwise fail only when Cordis loads the packaged plugin.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-skill-invocation-metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-skill-invocation-metadata.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `verify-skill-invocation-metadata.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-skill-invocation-metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-skill-invocation-metadata.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `fixtureRoot`、`writeSkill`；扫描到的测试主题包括 “cross-product skill invocation metadata gate”、“accepts aligned default and manual-only policies”、“rejects either direction of a manual-only policy mismatch”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-skill-invocation-metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-skill-invocation-metadata.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-skill-invocation-metadata.ts`；文件顶部注释把它定位为“Keep Claude Code and Codex invocation metadata aligned for repository skills. @module scripts/verify-skill-invocation-metadata”。固定提交中扫描到的公开或顶层声明包括 `collectSkillInvocationMetadataViolations`、`asRecord`、`parseSkillFrontmatter`、`skillDirectories`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/verify-skill-invocation-metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-skill-invocation-metadata.spec.ts)
- 对应测试：[scripts/verify-skill-invocation-metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-skill-invocation-metadata.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的声明包括 `collectSkillInvocationMetadataViolations`、`asRecord`、`parseSkillFrontmatter`、`skillDirectories`；文件顶部注释线索：Keep Claude Code and Codex invocation metadata aligned for repository skills. @module scripts/verify-skill-invocation-metadata。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-translation-pairing.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-translation-pairing.ts`；文件顶部注释把它定位为“Enforce complete English/Chinese pairs, matching structure, and recorded git blob hashes for every in-scope document. The manifest contains only explicit exclusions, which may have neither a counterpart nor a sidecar. --list reports state; --write <pairs......”。固定提交中扫描到的公开或顶层声明包括 `readRepositoryFile`、`repositoryFileExists`、`isExcluded`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-pairing-git.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-git.ts)、[scripts/translation-pairing-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing-record.ts)、[scripts/translation-pairing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.ts)
- 对应测试：[scripts/translation-pairing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-pairing.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 299 行；扫描到的声明包括 `readRepositoryFile`、`repositoryFileExists`、`isExcluded`；文件顶部注释线索：Enforce complete English/Chinese pairs, matching structure, and recorded git blob hashes for every in-scope document. The manifest contains only explicit exclusions, which may have neither a counterpart nor a sidecar. --list reports state; --write <pairs......。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-translation-prompt.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：提示词与上下文
- 这个文件有什么用：它把 提示词 的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/translation-prompt.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.ts)
- 对应测试：[scripts/translation-prompt.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.snapshot.ts)、[scripts/translation-prompt.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/translation-prompt.spec.ts)、[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的声明包括 `read`；文件顶部注释线索：Verify that the committed translation prompt renders and parses as documented.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-type-equiv.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-type-equiv.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-type-equiv.ts`；文件顶部注释把它定位为“Verify every ts type-equiv and ts public-api block against the source symbol named by the manifest. Ordinary entries preserve the complete declaration; public-api entries preserve a class's body-stripped public declaration. Blocks and entries have a one-to-...”。固定提交中扫描到的公开或顶层声明包括 `normalizeStructure`、`normalizeJSDoc`、`stripExport`、`blockSymbol`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/markdown.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/markdown.ts)、[scripts/paired-markdown-derivatives.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/paired-markdown-derivatives.ts)、[scripts/repo-files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/repo-files.ts)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 306 行；扫描到的声明包括 `normalizeStructure`、`normalizeJSDoc`、`stripExport`、`blockSymbol`、`extractEquivBlocks`、`sourceDeclaration`、`sourceJSDoc`、`isPublicMember`；文件顶部注释线索：Verify every ts type-equiv and ts public-api block against the source symbol named by the manifest. Ordinary entries preserve the complete declaration; public-api entries preserve a class's body-stripped public declaration. Blocks and entries have a one-to-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/verify-vendored-links.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/verify-vendored-links.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 `scripts` 包里的 `verify-vendored-links.ts`；文件顶部注释把它定位为“Verify that pnpm-lock.yaml resolves every vendored package name to its workspace link: — never a registry copy. linkWorkspacePackages: true (pnpm-workspace.yaml) makes matching upstream semver ranges resolve to the pinned vendored sources; a registry copy o...”。固定提交中扫描到的公开或顶层声明包括 `vendoredNames`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `vendoredNames`；文件顶部注释线索：Verify that pnpm-lock.yaml resolves every vendored package name to its workspace link: — never a registry copy. linkWorkspacePackages: true (pnpm-workspace.yaml) makes matching upstream semver ranges resolve to the pinned vendored sources; a registry copy o...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/vitest-environment.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/vitest-environment.compat.spec.ts)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 `scripts` 包里的 `vitest-environment.compat.spec.ts` 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的测试主题包括 “Vitest jsdom compatibility”、“provides isolated browser storage instead of Node process storage”；文件顶部注释线索：@vitest-environment jsdom。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [scripts/wine-windows-gates.sh](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/wine-windows-gates.sh)

- 所属层：构建、生成、检查和发布自动化
- 文件角色：Wine Windows 兼容门禁
- 这个文件有什么用：它在 Wine/Windows 环境运行兼容性门禁，捕获与 Linux 原生运行不同的发布风险。
- 为什么这样设计：把“Wine Windows 兼容门禁”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)
- 对应测试：[scripts/archived-agent-notes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/archived-agent-notes.spec.ts)、[scripts/change-scope.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/change-scope.spec.ts)、[scripts/ci-workflow.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/ci-workflow.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 282 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
