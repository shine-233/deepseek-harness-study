# 源文件索引：packages/fs

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 57 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/fs/fs-local/src/fsio.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/fsio.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：文件系统实现
- 这个文件有什么用：这个文件实现文件系统读取、写入、搜索或安全边界的一部分，并让工具层通过统一文件接口使用它。
- 为什么这样设计：文件系统实现与工具意图分开，路径安全、平台差异和底层 I/O 可以独立替换和测试。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/fs/fs-local/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/win32.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/index.ts)、[packages/fs/fs-local/tests/fsio.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/fsio.spec.ts)
- 对应测试：[packages/fs/fs-local/tests/fsio.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/fsio.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/fs-local` 的 README 和入口，再读当前实现，沿着 `packages/fs/fs-local/src/win32.ts`、`packages/fs/fs/src/index.ts` 和 `packages/fs/fs-local/src/index.ts`、`packages/fs/fs-local/tests/fsio.spec.ts` 确认输入输出，最后对照 `packages/fs/fs-local/tests/fsio.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 781 行；扫描到的声明包括 `FsIoInternals`、`LocalTarget`、`PathInfo`、`PathLinkInfo`、`LocalDirEntry`、`resolveLocalTarget`、`probe`、`probeNoFollow`；源码顶部原注释（英文，仅作回查线索）：Cordis-free local filesystem mechanics. This provider layer returns validated UTF-8 text, streams large files, and rejects binary data; line windows belong to dsh-tool-fs. Writes stage an exclusive owner-only file in a private sibling directory and atomical...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/fs/fs-local/src/fsio.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/fsio.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)
- 对应测试：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/fs/fs-local/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/filesystem.spec.ts)、[packages/fs/tool-fs/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/fs/fs-local` 的入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 265 行；扫描到的声明包括 `Config`、`LocalFileSystem`；源码顶部原注释（英文，仅作回查线索）：Host-filesystem implementation of ctx.fs. Realpath-derived target identity makes aliases share stale guards, and writes through a symlink update its target without replacing the link. @module @deepseek-ai/dsh-fs-local。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-fs-local. @module @deepseek-ai/dsh-fs-local/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-local/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/win32.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：文件系统实现
- 这个文件有什么用：这个文件实现文件系统读取、写入、搜索或安全边界的一部分，并让工具层通过统一文件接口使用它。
- 为什么这样设计：文件系统实现与工具意图分开，路径安全、平台差异和底层 I/O 可以独立替换和测试。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/fs/fs-local/src/fsio.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/fsio.ts)、[packages/fs/fs-local/tests/fsio.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/fsio.spec.ts)、[packages/fs/fs-local/tests/win32.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/win32.spec.ts)
- 对应测试：[packages/fs/fs-local/tests/fsio.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/fsio.spec.ts)、[packages/fs/fs-local/tests/win32.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/win32.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/fs-local` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/fs/fs-local/src/fsio.ts`、`packages/fs/fs-local/tests/fsio.spec.ts`、`packages/fs/fs-local/tests/win32.spec.ts` 确认输入输出，最后对照 `packages/fs/fs-local/tests/fsio.spec.ts`、`packages/fs/fs-local/tests/win32.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `readFileDaclWin32`、`copyFileDaclWin32`、`replaceFileWin32`、`win32`、`errnoCode`、`win32Error`；源码顶部原注释（英文，仅作回查线索）：Windows security-descriptor helpers for atomic local-file replacement. Koffi loads lazily so non-Windows processes never open Win32 libraries. @module @deepseek-ai/dsh-fs-local/win32。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-local/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/filesystem.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统的具体场景，包括“registration”、“registers LocalFileSystem as ctx.fs with a default cwd”、“rejects non-positive, fractional, unsafe, or unallocatable diff-basis limits”、“resolve”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/fs/fs/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 781 行；扫描到的声明包括 `lockCount`、`versionOf`、`remountWithDiffLimit`；扫描到的测试主题包括 “registration”、“registers LocalFileSystem as ctx.fs with a default cwd”、“rejects non-positive, fractional, unsafe, or unallocatable diff-basis limits”、“resolve”、“resolves a relative path against opts.cwd, not config.cwd”、“ignores opts.cwd for an ABSOLUTE path”；源码顶部原注释（英文，仅作回查线索）：Tests for the local backend through the ctx.fs Service Definition: stat, whole- file/streamed text reads, atomic guarded writes (createIfAbsent / replaceIfVersion), version-guarded literal edits, concurrency races, symlink identity, and HMR/disposal. Read W...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-local/tests/fsio.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/fsio.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统的具体场景，包括“resolveLocalTarget”、“resolves a relative path from cwd and realpaths it”、“uses the realpathed parent + basename when the file does not exist (stable across create)”、“two paths to the same file via a symlink share one targetKey”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveLocalTarget”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/fs/fs-local/src/fsio.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/fsio.ts)、[packages/fs/fs-local/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/win32.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/fsio.ts`、`packages/fs/fs-local/src/win32.ts`、`packages/fs/fs/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 929 行；扫描到的声明包括 `collect`、`daclAcePolicy`；扫描到的测试主题包括 “resolveLocalTarget”、“resolves a relative path from cwd and realpaths it”、“uses the realpathed parent + basename when the file does not exist (stable across create)”、“two paths to the same file via a symlink share one targetKey”、“realpaths the nearest existing ancestor when intermediate dirs are missing”、“keeps the key stable across create when an ancestor is a symlink”；源码顶部原注释（英文，仅作回查线索）：Cordis-free tests for the raw local-filesystem I/O: path resolution, probe, whole-file/streamed text reads, binary/UTF-8 rejection, atomic-write temp safety, literal edit matching, and line-ending handling. Line WINDOWING is policy and lives in dsh-fs-obser...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-local/tests/win32.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/win32.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统的具体场景，包括“Windows file-security helpers”、“reads and installs a protected DACL before replacing the destination”、“maps descriptor-size probe failures to Node-style codes”、“surfaces a descriptor read failure after the size probe”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Windows file-security helpers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/README.md)、[packages/fs/fs-local/src/win32.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/win32.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/win32.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 146 行；扫描到的声明包括 `importWithNative`、`successfulNative`；扫描到的测试主题包括 “Windows file-security helpers”、“reads and installs a protected DACL before replacing the destination”、“maps descriptor-size probe failures to Node-style codes”、“surfaces a descriptor read failure after the size probe”、“surfaces DACL installation and replacement failures”；源码顶部原注释（英文，仅作回查线索）：Host-independent binding tests for the Win32 DACL and replacement helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-observation-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统、策略相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/fs-observation-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/README.md)、[packages/fs/fs-observation-policy/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/types.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/fs/fs-observation-policy/tests/policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/tests/policy.spec.ts)、[packages/fs/tool-fs/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/integration.spec.ts)、[packages/fs/tool-fs/tests/read-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-image.spec.ts)、[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)、[packages/fs/tool-str-replace-editor/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/fs-observation-policy` 的入口和消费者，再读当前契约，沿着 `packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`、`packages/fs/fs-observation-policy/tests/policy.spec.ts`、`packages/fs/tool-fs/tests/harness.ts` 看它怎样约束运行时，最后对照 `packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`、`packages/fs/fs-observation-policy/tests/policy.spec.ts`、`packages/fs/tool-fs/tests/integration.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `name`、`apply`、`ObservedStateGate`；源码顶部原注释（英文，仅作回查线索）：Event-only filesystem observation policy; it registers no service. A weak owner/target map records every authoritative presence/absence observation, single-slot intent listeners derive guards from that state, and the provider performs the atomic freshness/n...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-observation-policy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统、策略必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/fs-observation-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-fs-observation-policy. @module @deepseek-ai/dsh-fs-observation-policy/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-observation-policy/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/types.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述文件系统、策略中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/fs/fs-observation-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/README.md)、[packages/fs/fs-observation-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/fs/fs-observation-policy/tests/policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/tests/policy.spec.ts)、[packages/fs/tool-fs/tests/fs-tools.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/fs-tools.e2e.ts)、[packages/fs/tool-fs/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/integration.spec.ts)、[packages/fs/tool-fs/tests/read-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-image.spec.ts)、[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/fs-observation-policy` 的入口和消费者，再读当前契约，沿着 `packages/fs/fs-observation-policy/src/index.ts` 看它怎样约束运行时，最后对照 `packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`、`packages/fs/fs-observation-policy/tests/policy.spec.ts`、`packages/fs/tool-fs/tests/fs-tools.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `FsObservationActor`；源码顶部原注释（英文，仅作回查线索）：Vocabulary for the fs-observation-policy plugin: the minimal execution-context fields used to derive an observed-state owner by narrowing the opaque object actor the fs  events carry. The provider vocabulary (FsTarget, FsVersion, write/edit request types) i...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-observation-policy/tests/policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/tests/policy.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、策略的具体场景，包括“registration / disposal”、“registers no service API (it is a plugin, not ctx.fsPolicy)”、“mounts with no inject (reads no services)”、“write-intent decision”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“registration / disposal”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs-observation-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/README.md)、[packages/fs/fs-observation-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-observation-policy/src/index.ts`、`packages/fs/fs/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 236 行；扫描到的声明包括 `target`、`writeIntent`、`editIntent`、`setup`；扫描到的测试主题包括 “registration / disposal”、“registers no service API (it is a plugin, not ctx.fsPolicy)”、“mounts with no inject (reads no services)”、“write-intent decision”、“an unobserved target decides createIfAbsent”、“a no-owner actor decides createIfAbsent”；源码顶部原注释（英文，仅作回查线索）：Event-level policy tests; no filesystem provider is needed because the plugin performs no I/O.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-sandbox/src/containment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/containment.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：文件系统实现
- 这个文件有什么用：这个文件实现文件系统读取、写入、搜索或安全边界的一部分，并让工具层通过统一文件接口使用它。
- 为什么这样设计：文件系统实现与工具意图分开，路径安全、平台差异和底层 I/O 可以独立替换和测试。
- 直接协作者：[packages/fs/fs-sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/README.md)、[packages/fs/fs-sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/index.ts)、[packages/fs/fs-sandbox/tests/containment.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/containment.spec.ts)
- 对应测试：[packages/fs/fs-sandbox/tests/containment.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/containment.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/fs-sandbox` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/fs/fs-sandbox/src/index.ts`、`packages/fs/fs-sandbox/tests/containment.spec.ts` 确认输入输出，最后对照 `packages/fs/fs-sandbox/tests/containment.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `isPathUnder`、`isMissing`、`comparablePath`、`isLexicallyUnder`、`statIfPresent`、`sameIdentity`；源码顶部原注释（英文，仅作回查线索）：Path-containment mechanics for the filesystem sandbox. Canonical spellings take the fast lexical path; filesystem identity supplies the conservative fallback for alias-equivalent roots such as Windows 8.3 names and casing. @module @deepseek-ai/dsh-fs-sandbo...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统、沙箱相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/fs-sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/index.ts)、[packages/fs/fs-sandbox/src/containment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/containment.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts)、[packages/fs/tool-str-replace-editor/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/tests/tools.spec.ts)、[packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/fs/fs-sandbox` 的入口和消费者，再读当前契约，沿着 `packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`、`packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts`、`packages/fs/tool-str-replace-editor/tests/tools.spec.ts` 看它怎样约束运行时，最后对照 `packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`、`packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts`、`packages/fs/tool-str-replace-editor/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 151 行；扫描到的声明包括 `Config`、`SandboxedFileSystem`；源码顶部原注释（英文，仅作回查线索）：SandboxedFileSystem: the sandbox-enforcing implementation of the @deepseek-ai/dsh-fs Service Definition. It extends LocalFileSystem so all text-storage mechanics — resolve, stat, read/stream, list, the atomic write and the read-match-write edit critical sec...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-sandbox/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统、沙箱必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/fs-sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-fs-sandbox. @module @deepseek-ai/dsh-fs-sandbox/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-sandbox/tests/containment.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/containment.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、沙箱的具体场景，包括“filesystem sandbox containment”、“accepts equal paths, descendants, and a filesystem-root boundary”、“uses case-insensitive lexical comparison for Windows-style containment”、“recognizes an alias-equivalent root by filesystem identity for a missing target”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“filesystem sandbox containment”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs-sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/README.md)、[packages/fs/fs-sandbox/src/containment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/containment.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-sandbox/src/containment.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的测试主题包括 “filesystem sandbox containment”、“accepts equal paths, descendants, and a filesystem-root boundary”、“uses case-insensitive lexical comparison for Windows-style containment”、“recognizes an alias-equivalent root by filesystem identity for a missing target”、“denies unrelated and missing roots”、“treats a regular-file path segment as a missing target, not containment”；源码顶部原注释（英文，仅作回查线索）：Containment tests for lexical canonical paths and filesystem-identity aliases.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、沙箱的具体场景，包括“the capability fact”、“reports the deployment default mode (what the tool layer advertises against)”、“read-only”、“denies write, leaving no file on disk”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the capability fact”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs-sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/README.md)、[packages/fs/fs-sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-sandbox/src/index.ts`、`packages/fs/fs/src/index.ts`、`packages/sandbox/sandbox-policy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 236 行；扫描到的声明包括 `boot`、`target`；扫描到的测试主题包括 “the capability fact”、“reports the deployment default mode (what the tool layer advertises against)”、“read-only”、“denies write, leaving no file on disk”、“denies edit of an existing file (the content is unchanged)”、“allows reads (every mode permits reading)”；源码顶部原注释（英文，仅作回查线索）：Tests for the sandbox-enforcing filesystem backend: the per-call policy fence on write/edit (read-only denies, workspace-write contains, danger-full-access passes through), reads always passing through, the capability fact, and the containment matrix — .. t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/README.md)、[packages/fs/fs/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/types.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/context/agent-instructions/src/files.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/src/files.ts)
- 对应测试：[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/e2b/fs-e2b/tests/filesystem.spec.ts)、[packages/fs/fs-local/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/filesystem.spec.ts)、[packages/fs/fs-local/tests/fsio.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/tests/fsio.spec.ts)、[packages/fs/fs-observation-policy/tests/policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/tests/policy.spec.ts)、[packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/fs/fs` 的入口和消费者，再读当前契约，沿着 `packages/context/agent-instructions/src/files.ts`、`packages/context/agent-instructions/src/state.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/agent-instructions/tests/agent-instructions.spec.ts`、`packages/e2b/fs-e2b/tests/filesystem.spec.ts`、`packages/fs/fs-local/tests/filesystem.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 252 行；源码顶部原注释（英文，仅作回查线索）：Filesystem Service Definition for one execution world. Backends own stable target identity, process paths and file URIs, containment, text reads, decoding, binary rejection, and atomic mutations. Read windows and observed-state policy stay in consumer and p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/README.md)、[packages/fs/fs/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/types.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/fs/fs/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/tests/invariant.spec.ts)
- 对应测试：[packages/fs/fs/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/fs/fs/src/types.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/fs/fs/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/fs/fs/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateTarget`；源码顶部原注释（英文，仅作回查线索）：Package-owned filesystem event-data invariants. @module @deepseek-ai/dsh-fs/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/types.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述文件系统中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/fs/fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/fs/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/invariant.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/workspace-context-resume.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/workspace-context-resume.snapshot.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/e2b/fs-e2b/tests/filesystem.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/e2b/fs-e2b/tests/filesystem.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/fs` 的入口和消费者，再读当前契约，沿着 `packages/fs/fs/src/index.ts`、`packages/fs/fs/src/invariant.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/workspace-context-resume.snapshot.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 203 行；扫描到的声明包括 `FsTargetKey`、`FsVersion`、`FsObservation`、`FsTarget`、`FsInfo`、`FsPathInfo`、`FsDirEntry`、`FsWriteIntent`；源码顶部原注释（英文，仅作回查线索）：Vocabulary for the filesystem Service Definition (ctx.fs): the opaque target/version identities, the metadata stat returns, the write-intent and outcome shapes, the literal-edit request/outcome, and the typed error taxonomy. @module @deepseek-ai/dsh-fs/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/tests/invariant.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统的具体场景，包括“filesystem invariants”、“accepts decision and observation events with usable identities”、“rejects empty target and version identities”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“filesystem invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/README.md)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/fs/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs/src/index.ts`、`packages/fs/fs/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “filesystem invariants”、“accepts decision and observation events with usable identities”、“rejects empty target and version identities”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/fs/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/tests/service.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统的具体场景，包括“FileSystem provider seam”、“registers as ctx.fs and serves the primitives”、“throws when a second implementation is loaded (duplicate service)”、“removes the service when the providing fiber is disposed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“FileSystem provider seam”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/README.md)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 184 行；扫描到的声明包括 `FakeFileSystem`；扫描到的测试主题包括 “FileSystem provider seam”、“registers as ctx.fs and serves the primitives”、“throws when a second implementation is loaded (duplicate service)”、“removes the service when the providing fiber is disposed”、“streamText yields the same text readText returns”、“readBytes returns raw content and enforces the byte cap with FS_TOO_LARGE”；源码顶部原注释（英文，仅作回查线索）：Tests for the filesystem Service Definition: registration, duplicate-service behavior, disposal, and the branded id factories. The provider primitives and policy live in dsh-fs-local and dsh-fs-observation-policy; this seam owns only the abstract service co...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/direct-call.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/direct-call.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared top-level-call post-policy selection for search result spill. @module dsh-tool-fs-search/direct-call”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/fs/tool-fs-search/src/glob.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/glob.ts)、[packages/fs/tool-fs-search/src/grep.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/grep.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/integration.spec.ts)、[packages/fs/tool-fs-search/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/load-path.spec.ts)、[packages/fs/tool-fs-search/tests/rg-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/rg-path.spec.ts)、[packages/fs/tool-fs-search/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs-search` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/fs/tool-fs-search/src/glob.ts`、`packages/fs/tool-fs-search/src/grep.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/fs/tool-fs-search/tests/integration.spec.ts`、`packages/fs/tool-fs-search/tests/load-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `acceptedDirectCallValue`；源码顶部原注释（英文，仅作回查线索）：Shared top-level-call post-policy selection for search result spill. @module dsh-tool-fs-search/direct-call。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/glob.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/glob.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The model-facing glob tool: discover files whose paths match a glob pattern, sorted by modification time. Execution spawns the packaged ripgrep binary (@vscode/ripgrep) directly through the subprocess seam with a plain argv vector — this module owns the mod...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/direct-call.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/direct-call.ts)、[packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/integration.spec.ts)、[packages/fs/tool-fs-search/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/load-path.spec.ts)、[packages/fs/tool-fs-search/tests/rg-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/rg-path.spec.ts)、[packages/fs/tool-fs-search/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs-search` 的 README 和入口，再读当前实现，沿着 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/tool-fs-search/src/direct-call.ts` 和 `packages/fs/tool-fs-search/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/fs/tool-fs-search/tests/integration.spec.ts`、`packages/fs/tool-fs-search/tests/load-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 374 行；扫描到的声明包括 `GLOB_MAX_RESULTS`、`GLOB_VCS_EXCLUDES`、`GlobToolCaps`、`GlobInput`、`parseGlobArgs`、`buildGlobCommand`、`GlobSample`、`sampleAcrossTopLevel`；源码顶部原注释（英文，仅作回查线索）：The model-facing glob tool: discover files whose paths match a glob pattern, sorted by modification time. Execution spawns the packaged ripgrep binary (@vscode/ripgrep) directly through the subprocess seam with a plain argv vector — this module owns the mod...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/grep.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/grep.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The model-facing grep tool: search file contents with a ripgrep regular expression. Execution spawns the packaged ripgrep binary (@vscode/ripgrep) directly through the subprocess seam with a plain argv vector using a fixed line-oriented rg --json command so...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/direct-call.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/direct-call.ts)、[packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/integration.spec.ts)、[packages/fs/tool-fs-search/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/load-path.spec.ts)、[packages/fs/tool-fs-search/tests/rg-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/rg-path.spec.ts)、[packages/fs/tool-fs-search/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs-search` 的 README 和入口，再读当前实现，沿着 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/tool-fs-search/src/direct-call.ts` 和 `packages/fs/tool-fs-search/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/fs/tool-fs-search/tests/integration.spec.ts`、`packages/fs/tool-fs-search/tests/load-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 365 行；扫描到的声明包括 `GREP_MAX_MATCHES`、`GREP_MAX_LINE_BYTES`、`GrepToolCaps`、`GrepInput`、`parseGrepArgs`、`buildGrepCommand`、`parseGrepMatches`、`formatGrepMatches`；源码顶部原注释（英文，仅作回查线索）：The model-facing grep tool: search file contents with a ripgrep regular expression. Execution spawns the packaged ripgrep binary (@vscode/ripgrep) directly through the subprocess seam with a plain argv vector using a fixed line-oriented rg --json command so...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/fs/tool-fs-search/src/glob.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/glob.ts)、[packages/fs/tool-fs-search/src/grep.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/grep.ts)、[packages/fs/tool-fs-search/src/search-core.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/search-core.ts)、[packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/integration.spec.ts)
- 对应测试：[packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/integration.spec.ts)、[packages/fs/tool-fs-search/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/load-path.spec.ts)、[packages/fs/tool-fs-search/tests/rg-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/rg-path.spec.ts)、[packages/fs/tool-fs-search/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-fs-search` 的入口和消费者，再读当前契约，沿着 `packages/fs/tool-fs-search/tests/integration.spec.ts`、`packages/fs/tool-fs-search/tests/load-path.spec.ts`、`packages/fs/tool-fs-search/tests/rg-path.spec.ts` 看它怎样约束运行时，最后对照 `packages/fs/tool-fs-search/tests/integration.spec.ts`、`packages/fs/tool-fs-search/tests/load-path.spec.ts`、`packages/fs/tool-fs-search/tests/rg-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`assertPositiveInteger`；源码顶部原注释（英文，仅作回查线索）：The model-facing filesystem discovery tool suite (glob, grep) over the packaged ripgrep binary (@vscode/ripgrep). This single plugin registers both tools; the binary ships inside the npm dependency, so no system rg install and no shell layer is involved. ##...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-fs-search. @module @deepseek-ai/dsh-tool-fs-search/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/presentation.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把文件系统、工具、呈现转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/search-core.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/search-core.ts)、[packages/util/output-retention/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/output-retention/src/index.ts)、[packages/fs/tool-fs-search/src/glob.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/glob.ts)
- 对应测试：[packages/fs/tool-fs-search/tests/presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/presentation.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/fs/tool-fs-search/src/glob.ts`、`packages/fs/tool-fs-search/src/grep.ts`、`packages/fs/tool-fs-search/tests/presentation.spec.ts` 确认状态如何进入 UI，最后对照 `packages/fs/tool-fs-search/tests/presentation.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 205 行；扫描到的声明包括 `SearchMeta`、`groupMatchesByFile`、`grepSearchMeta`、`globSearchMeta`、`searchViewFromMeta`、`metaBytes`、`capMetaBytes`、`isSearchLineMatch`；源码顶部原注释（英文，仅作回查线索）：Result-time search-card presentation for grep and glob. Both tools land on one card: 'search' render intent (SearchResultView) with two shape-discriminated variants: grep projects its matches grouped by file (SearchMatchesResultView), glob projects a flat p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/ripgrep.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/ripgrep.d.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Minimal type surface for the @vscode/ripgrep package: an ESM module that resolves the platform ripgrep binary (@vscode/ripgrep-<platform>-<arch> optional dependency) and exports its absolute path as the named export rgPath (no bundled type declarations). @m...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs-search` 的入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的声明包括 `rgPath`；源码顶部原注释（英文，仅作回查线索）：Minimal type surface for the @vscode/ripgrep package: an ESM module that resolves the platform ripgrep binary (@vscode/ripgrep-<platform>-<arch> optional dependency) and exports its absolute path as the named export rgPath (no bundled type declarations). @m...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/src/search-core.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/search-core.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared execution plumbing for the glob / grep search tools: the package-owned SEARCH_* error vocabulary, one spawn helper that runs the PACKAGED ripgrep binary (@vscode/ripgrep) with a plain argv vector and returns complete raw stdout, the best-effort forma...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/spill/spill/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/spill/spill/src/index.ts)、[packages/fs/tool-fs-search/src/glob.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/glob.ts)
- 对应测试：[packages/fs/tool-fs-search/tests/presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/presentation.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-fs-search` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/spill/spill/src/index.ts` 和 `packages/fs/tool-fs-search/src/glob.ts`、`packages/fs/tool-fs-search/src/grep.ts`、`packages/fs/tool-fs-search/src/index.ts` 确认输入输出，最后对照 `packages/fs/tool-fs-search/tests/presentation.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 401 行；扫描到的声明包括 `RAW_OUTPUT_MAX_BYTES`、`SEARCH_TIMEOUT_MS`、`SEARCH_STDERR_MAX_BYTES`、`SEARCH_GRACE_MS`、`SEARCH_META_MAX_BYTES`、`SearchErrorCode`、`SearchError`、`RipgrepRun`；源码顶部原注释（英文，仅作回查线索）：Shared execution plumbing for the glob / grep search tools: the package-owned SEARCH_* error vocabulary, one spawn helper that runs the PACKAGED ripgrep binary (@vscode/ripgrep) with a plain argv vector and returns complete raw stdout, the best-effort forma...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/integration.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“search tools over the real subprocess service + the packaged rg”、“glob”、“discovers files by pattern, sorted by modification time, hidden included, .git excluded”、“scopes to a directory search root (path arg)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“search tools over the real subprocess service + the packaged rg”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/tool-fs-search/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 200 行；扫描到的声明包括 `call`、`text`；扫描到的测试主题包括 “search tools over the real subprocess service + the packaged rg”、“glob”、“discovers files by pattern, sorted by modification time, hidden included, .git excluded”、“scopes to a directory search root (path arg)”、“reports zero discoveries as No files found”、“excludes VCS internals even when the search root IS the VCS directory”；源码顶部原注释（英文，仅作回查线索）：Integration tests: the REAL local subprocess service plus the PACKAGED ripgrep binary (@vscode/ripgrep), exercised through ctx.tools.execute(). These verify the WORLD — actual files on disk are discovered and grepped, hostile patterns stay inert (they are p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/load-path.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具、路径的具体场景，包括“dsh-tool-fs-search real-load-path guard”、“has no default export and keeps name/inject/Config through unwrapExports”、“boots over ctx.subprocess through the unwrapped module without an inject error”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-fs-search real-load-path guard”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/tool-fs-search/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 51 行；扫描到的测试主题包括 “dsh-tool-fs-search real-load-path guard”、“has no default export and keeps name/inject/Config through unwrapExports”、“boots over ctx.subprocess through the unwrapped module without an inject error”；源码顶部原注释（英文，仅作回查线索）：Real-load-path guard for @deepseek-ai/dsh-tool-fs-search. tool-fs-search is a NAMESPACE plugin with inject — so a stray export default apply would make the cordis Loader's unwrapExports (exports.default ?? exports) collapse the module to the bare apply func...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/tests/presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/presentation.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具、呈现的具体场景，包括“groupMatchesByFile”、“groups matches by first-seen file order, keeping line/lineNumber only”、“returns an empty list for no matches”、“grepSearchMeta”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“groupMatchesByFile”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/fs/tool-fs-search/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/presentation.ts)、[packages/fs/tool-fs-search/src/search-core.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/search-core.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/fs/tool-fs-search/src/presentation.ts`、`packages/fs/tool-fs-search/src/search-core.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的测试主题包括 “groupMatchesByFile”、“groups matches by first-seen file order, keeping line/lineNumber only”、“returns an empty list for no matches”、“grepSearchMeta”、“projects grouped matches with total and a false truncation flag within the cap”、“reports the pre-cap total and truncation from the shared retention pass”；源码顶部原注释（英文，仅作回查线索）：Unit tests for the search-card presentation layer (src/presentation.ts): the canonical value → presentationMeta projections (grepSearchMeta, globSearchMeta, groupMatchesByFile) and the defensive meta → view narrowing (searchViewFromMeta). These pin the by-f...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/tests/rg-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/rg-path.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具、路径的具体场景，包括“lazy packaged-ripgrep resolution”、“fails the first search call with SEARCH_FAILED instead of failing module load”、“keeps failing every subsequent call (the resolution is memoized)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“lazy packaged-ripgrep resolution”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/tools/src/index.ts`、`packages/fs/tool-fs-search/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 37 行；扫描到的测试主题包括 “lazy packaged-ripgrep resolution”、“fails the first search call with SEARCH_FAILED instead of failing module load”、“keeps failing every subsequent call (the resolution is memoized)”；源码顶部原注释（英文，仅作回查线索）：Failure-path tests for the lazy packaged-ripgrep resolution. The success path (the real @vscode/ripgrep module) is exercised throughout tools.spec.ts; here the module is mocked to throw at evaluation, proving a missing or corrupt platform package (--omit=op...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs-search/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/tests/tools.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“registration”、“registers glob and grep unconditionally with their prompt sections”、“stays pending until ctx.subprocess exists (inject)”、“unregisters everything on fiber disposal (HMR safety)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs-search/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs-search/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs-search/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/tool-fs-search/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1209 行；扫描到的声明包括 `runResult`、`FakeReader`、`FakeHandle`、`FakeSubprocess`、`FakeSpill`、`setup`、`call`、`text`；扫描到的测试主题包括 “registration”、“registers glob and grep unconditionally with their prompt sections”、“stays pending until ctx.subprocess exists (inject)”、“unregisters everything on fiber disposal (HMR safety)”、“attaches the configured timeoutMs to both tool definitions”、“defaults the timeout budget to 30 seconds”；源码顶部原注释（英文，仅作回查线索）：Consumer-surface tests for the search tools over a FAKE subprocess service and a FAKE spill backend, exercised through ctx.tools.execute() so nothing bypasses the tool registry. The fake service makes every seam outcome scriptable — spawn failure, truncated...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/diff.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/diff.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Result-time contextual diff presentation for write and edit. Storage returns before/after text; this model-facing layer derives one three-line-context card per applied hunk. @module @deepseek-ai/dsh-tool-fs/src/diff”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/tool-fs/src/edit.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/edit.ts)、[packages/fs/tool-fs/src/write.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/write.ts)、[packages/fs/tool-fs/tests/diff.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/diff.spec.ts)
- 对应测试：[packages/fs/tool-fs/tests/diff.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/diff.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts` 和 `packages/fs/tool-fs/src/edit.ts`、`packages/fs/tool-fs/src/write.ts`、`packages/fs/tool-fs/tests/diff.spec.ts` 确认输入输出，最后对照 `packages/fs/tool-fs/tests/diff.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 79 行；扫描到的声明包括 `DIFF_CONTEXT`、`FsDiffMeta`、`computeHunkDiffs`、`diffsFromMeta`、`isFileDiff`；源码顶部原注释（英文，仅作回查线索）：Result-time contextual diff presentation for write and edit. Storage returns before/after text; this model-facing layer derives one three-line-context card per applied hunk. @module @deepseek-ai/dsh-tool-fs/src/diff。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/edit.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/edit.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model-facing literal edit, unique-match by default. It obtains an optional guard from the single intent slot, calls ctx.fs.editText without a separate stat, then records the observed version; no policy means an unconditional atomic edit. @module @deepseek-a...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs/src/index.ts` 和 `packages/fs/tool-fs/src/index.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 168 行；扫描到的声明包括 `parseEditArgs`、`formatEditOutput`、`applyEditTool`；源码顶部原注释（英文，仅作回查线索）：Model-facing literal edit, unique-match by default. It obtains an optional guard from the single intent slot, calls ctx.fs.editText without a separate stat, then records the observed version; no policy means an unconditional atomic edit. @module @deepseek-a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/error.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model-facing remediation for guarded-mutation failures. The provider's FS_STALE_VERSION and FS_NOT_OBSERVED messages state the condition but not the only correct recovery (re-read / read the file), so this package appends the remedy at the model boundary; p...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/edit.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/edit.ts)、[packages/fs/tool-fs/src/write.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/write.ts)、[packages/fs/tool-fs/tests/error.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/error.spec.ts)
- 对应测试：[packages/fs/tool-fs/tests/error.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/error.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/fs/fs/src/index.ts` 和 `packages/fs/tool-fs/src/edit.ts`、`packages/fs/tool-fs/src/write.ts`、`packages/fs/tool-fs/tests/error.spec.ts` 确认输入输出，最后对照 `packages/fs/tool-fs/tests/error.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `remediateFsError`；源码顶部原注释（英文，仅作回查线索）：Model-facing remediation for guarded-mutation failures. The provider's FS_STALE_VERSION and FS_NOT_OBSERVED messages state the condition but not the only correct recovery (re-read / read the file), so this package appends the remedy at the model boundary; p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/fs/tool-fs/src/edit.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/edit.ts)、[packages/fs/tool-fs/src/read-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-image.ts)、[packages/fs/tool-fs/src/read-render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-render.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)
- 对应测试：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/fs/tool-fs/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/fs/tool-fs` 的入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 79 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`assertPositiveInteger`；源码顶部原注释（英文，仅作回查线索）：Model-facing read, read_image, write, and edit tools over ctx.fs. This package owns schemas, validation, read windows, formatting, and observation events, never a concrete provider. An optional event policy supplies mutation guards; without one the tools us...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-fs. @module @deepseek-ai/dsh-tool-fs/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/read-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-image.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The model-facing read_image tool: reads a PNG/JPEG/WebP/GIF file, durably commits its bytes through the attachment service (the same lifecycle as a user-uploaded image), and returns an image block so the image enters model context from the next request onwa...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/index.ts)
- 对应测试：[packages/fs/tool-fs/tests/read-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-image.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs/src/index.ts` 和 `packages/fs/tool-fs/src/index.ts`、`packages/fs/tool-fs/tests/read-image.spec.ts` 确认输入输出，最后对照 `packages/fs/tool-fs/tests/read-image.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 231 行；扫描到的声明包括 `ImageReadValue`、`imageMediaTypeForPath`、`assertImageCapableRoute`、`imageRefFromValue`、`formatImageReadOutput`、`applyReadImageTool`、`imageReadContent`；源码顶部原注释（英文，仅作回查线索）：The model-facing read_image tool: reads a PNG/JPEG/WebP/GIF file, durably commits its bytes through the attachment service (the same lifecycle as a user-uploaded image), and returns an image block so the image enters model context from the next request onwa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/read-render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-render.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把文件系统、工具、渲染转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/index.ts)、[packages/fs/tool-fs/src/read.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read.ts)、[packages/fs/tool-fs/tests/read-render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-render.spec.ts)
- 对应测试：[packages/fs/tool-fs/tests/read-render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-render.spec.ts)、[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/fs/tool-fs/src/index.ts`、`packages/fs/tool-fs/src/read.ts`、`packages/fs/tool-fs/tests/read-render.spec.ts` 确认状态如何进入 UI，最后对照 `packages/fs/tool-fs/tests/read-render.spec.ts`、`packages/fs/tool-fs/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 272 行；扫描到的声明包括 `READ_MAX_LINE_LENGTH`、`READ_MAX_BYTES`、`ReadWindow`、`FileTextLine`、`WindowResult`、`FileReadOutcome`、`buildWindow`、`formatReadOutput`；源码顶部原注释（英文，仅作回查线索）：Pure read presentation: turn provider-decoded text into a bounded, line-numbered window and model-facing envelope. Chunk scanning caps the current line, so even one newline-free giant line cannot grow memory without bound. @module @deepseek-ai/dsh-tool-fs/r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/read-target.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-target.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared path resolution and regular-file validation for model-facing read tools. @module @deepseek-ai/dsh-tool-fs/src/read-target”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/session-cwd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/session-cwd.ts)、[packages/fs/tool-fs/src/read-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-image.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts`、`packages/fs/fs/src/index.ts`、`packages/fs/tool-fs/src/session-cwd.ts` 和 `packages/fs/tool-fs/src/read-image.ts`、`packages/fs/tool-fs/src/read.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `resolveRegularReadTarget`；源码顶部原注释（英文，仅作回查线索）：Shared path resolution and regular-file validation for model-facing read tools. @module @deepseek-ai/dsh-tool-fs/src/read-target。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/read.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model-facing UTF-8 read. It performs one provider stat for type, routing, and observed version, streams large or size-unknown files, renders a bounded window, then emits the observation. @module @deepseek-ai/dsh-tool-fs/src/read”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/index.ts)
- 对应测试：[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs/src/index.ts` 和 `packages/fs/tool-fs/src/index.ts`、`packages/fs/tool-fs/tests/tools.spec.ts` 确认输入输出，最后对照 `packages/fs/tool-fs/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 209 行；扫描到的声明包括 `READ_LIMIT`、`STREAM_MIN_SIZE`、`ReadToolCaps`、`parseReadArgs`、`applyReadTool`、`parsePositiveInteger`；源码顶部原注释（英文，仅作回查线索）：Model-facing UTF-8 read. It performs one provider stat for type, routing, and observed version, streams large or size-unknown files, renders a bounded window, then emits the observation. @module @deepseek-ai/dsh-tool-fs/src/read。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/sandbox.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/sandbox.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具、沙箱的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The sandbox-escalation API shared by the write and edit tools: the per-call policy resolution, the advertised escalation fields, and the denial-marker mapping — all delegating the vocabulary and the fail-closed approval sequence to @deepseek-ai/dsh-sandbox ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/index.ts)、[packages/fs/tool-fs/src/edit.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/edit.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts`、`packages/fs/fs/src/index.ts`、`packages/sandbox/sandbox-policy/src/index.ts` 和 `packages/fs/tool-fs/src/edit.ts`、`packages/fs/tool-fs/src/index.ts`、`packages/fs/tool-fs/src/write.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 131 行；扫描到的声明包括 `FsEscalationArgs`、`EscalationSchemaFields`、`FsSandboxController`；源码顶部原注释（英文，仅作回查线索）：The sandbox-escalation API shared by the write and edit tools: the per-call policy resolution, the advertised escalation fields, and the denial-marker mapping — all delegating the vocabulary and the fail-closed approval sequence to @deepseek-ai/dsh-sandbox ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/session-cwd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/session-cwd.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护文件系统、工具、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)、[packages/fs/tool-fs/src/edit.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/edit.ts)、[packages/fs/tool-fs/src/read-target.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-target.ts)
- 对应测试：[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/tools/src/index.ts`、`packages/sandbox/sandbox/src/index.ts` 和 `packages/fs/tool-fs/src/edit.ts`、`packages/fs/tool-fs/src/read-target.ts`、`packages/fs/tool-fs/src/write.ts` 理解状态变化，最后对照 `packages/fs/tool-fs/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 46 行；扫描到的声明包括 `sessionCwd`、`sessionResolveOptions`；源码顶部原注释（英文，仅作回查线索）：Derive the working directory a filesystem tool resolves relative paths against: the calling agent's per-session workspace (exec.agent.session.header.cwd), so each session's read/write/edit act on ITS workspace, not the server's launch dir — mirroring how ds...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/src/write.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/write.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供文件系统、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model-facing full-file write. It obtains an optional intent from the single policy slot, calls ctx.fs.writeText without a stat, then records the resulting version; no policy means an unconditional atomic create-or-overwrite. @module @deepseek-ai/dsh-tool-fs...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/agent-instructions/tests/agent-instructions.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/fs/tool-fs` 的 README 和入口，再读当前实现，沿着 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs/src/index.ts` 和 `packages/fs/tool-fs/src/index.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 150 行；扫描到的声明包括 `parseWriteArgs`、`formatWriteOutput`、`applyWriteTool`；源码顶部原注释（英文，仅作回查线索）：Model-facing full-file write. It obtains an optional intent from the single policy slot, calls ctx.fs.writeText without a stat, then records the resulting version; no policy means an unconditional atomic create-or-overwrite. @module @deepseek-ai/dsh-tool-fs...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/diff.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/diff.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“computeHunkDiffs”、“a single-line change yields one hunk with ±context lines on both sides”、“a scattered replace_all yields one FileDiff PER hunk (matching per-site editor blocks)”、“identical before/after (a no-op) yields no hunks”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“computeHunkDiffs”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/fs/tool-fs/src/diff.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/diff.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/fs/tool-fs/src/diff.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 113 行；扫描到的测试主题包括 “computeHunkDiffs”、“a single-line change yields one hunk with ±context lines on both sides”、“a scattered replace_all yields one FileDiff PER hunk (matching per-site editor blocks)”、“identical before/after (a no-op) yields no hunks”、“a pure insertion into empty content reports oldText null (nothing to diff against)”、“a pure deletion of the whole file reports newText empty”；源码顶部原注释（英文，仅作回查线索）：Unit tests for the result-time contextual-diff computation (src/diff.ts): the pure before/after → FileDiff[] hunk builder and the defensive meta narrowing. These pin the exact hunk reconstruction (context lines, multi-hunk replaceAll, pure insertion/deletio...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/error.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/error.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“remediateFsError”、“appends the re-read remedy to FS_STALE_VERSION, preserving the code and chaining the cause”、“appends the read remedy to FS_NOT_OBSERVED”、“leaves other FsError codes untouched”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“remediateFsError”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/fs/tool-fs/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/error.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs/src/index.ts`、`packages/fs/tool-fs/src/error.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的测试主题包括 “remediateFsError”、“appends the re-read remedy to FS_STALE_VERSION, preserving the code and chaining the cause”、“appends the read remedy to FS_NOT_OBSERVED”、“leaves other FsError codes untouched”、“leaves non-FsError values untouched”；源码顶部原注释（英文，仅作回查线索）：Unit tests for the model-facing error remediation: the remedy appended to guarded-mutation failures, code preservation, and passthrough behavior.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/fs-tools.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/fs-tools.e2e.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“creates, reads, then edits a file — verified on disk”、“resolves a relative path against the per-session cwd (factory meta.cwd)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“creates, reads, then edits a file — verified on disk”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/fs/tool-fs/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/harness.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/fs/tool-fs/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 78 行；扫描到的测试主题包括 “creates, reads, then edits a file — verified on disk”、“resolves a relative path against the per-session cwd (factory meta.cwd)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/harness.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“harness”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/index.ts)、[packages/fs/tool-fs/tests/fs-tools.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/fs-tools.e2e.ts)
- 对应测试：[packages/fs/tool-fs/tests/fs-tools.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/fs-tools.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/fs/tool-fs/tests/fs-tools.e2e.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `fsHarness`、`waitForIdle`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/integration.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“default deployment (with dsh-fs-observation-policy)”、“write → disk”、“creates a file with exactly the requested bytes”、“rejects overwriting an existing file without reading it first”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“default deployment (with dsh-fs-observation-policy)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-local/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs-local/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 515 行；扫描到的声明包括 `call`、`text`；扫描到的测试主题包括 “default deployment (with dsh-fs-observation-policy)”、“write → disk”、“creates a file with exactly the requested bytes”、“rejects overwriting an existing file without reading it first”、“allows overwriting after a read”、“rejects a full overwrite when the file changed since the read (stale)”；源码顶部原注释（英文，仅作回查线索）：End-to-end tool-registry tests against the real local backend. The policy deployment verifies observed-state and guarded mutation; the bare deployment proves unconditional tools have no policy-service dependency. Assertions read files back byte-for-byte rat...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/read-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-image.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“imageMediaTypeForPath”、“maps the four extensions case-insensitively and rejects everything else”、“imageRefFromValue”、“re-brands with and without the optional display name”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“imageMediaTypeForPath”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment-local/src/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/index.ts`、`packages/attachment/attachment/src/index.ts`、`packages/code-runtime/code-runtime/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 499 行；扫描到的声明包括 `CatalogAdapter`、`FakeRuntime`、`setup`、`agentOn`、`call`、`readImage`、`text`、`JpegOnlyStore`；扫描到的测试主题包括 “imageMediaTypeForPath”、“maps the four extensions case-insensitively and rejects everything else”、“imageRefFromValue”、“re-brands with and without the optional display name”、“read_image happy path”、“commits the bytes durably and renders the envelope beside an image block”；源码顶部原注释（英文，仅作回查线索）：The read_image tool over the REAL local filesystem and attachment store: extension routing, the strict image-modality gate (every refusal arm), durable commit + image-block rendering, attachment admission failures, and the regression that read keeps its tex...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/read-render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/read-render.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具、渲染的具体场景，包括“buildWindow”、“numbers lines and reports total for a whole-file read”、“applies offset/limit”、“strips CRLF”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“buildWindow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/fs/tool-fs/src/read-render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/src/read-render.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/tool-fs/src/read-render.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 218 行；扫描到的测试主题包括 “buildWindow”、“numbers lines and reports total for a whole-file read”、“applies offset/limit”、“strips CRLF”、“truncates an over-long line”、“caps output bytes and reports truncatedByBytes”；源码顶部原注释（英文，仅作回查线索）：Cordis-free tests for the line-windowing module: offset/limit windows, byte caps, per-line truncation, CRLF stripping, offset-past-EOF rejection, and the capped line buffer for newline-free giant lines — all over an async-iterable of decoded text chunks (so...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“session cwd resolution”、“retains ordinary spelling but resolves the cwd before parent traversal”、“registration”、“registers read, write, and edit”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session cwd resolution”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-fs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs-observation-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-observation-policy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs-observation-policy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 929 行；扫描到的声明包括 `FakeFs`、`setup`、`call`、`text`、`setupWith`、`SandboxingFakeFs`、`setupConfining`、`escalationAgent`；扫描到的测试主题包括 “session cwd resolution”、“retains ordinary spelling but resolves the cwd before parent traversal”、“registration”、“registers read, write, and edit”、“declares read parallel-safe while write/edit remain exclusive”、“registers prompt sections for each tool”；源码顶部原注释（英文，仅作回查线索）：Consumer API tests over a fake provider and the real policy collaborator: schemas, validation, formatting, typed errors, intent dispatch, and observation-driven authorization.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-str-replace-editor/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/src/index.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把文件系统、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/fs/tool-str-replace-editor/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/index.ts)、[packages/fs/tool-str-replace-editor/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/tests/tools.spec.ts)
- 对应测试：[packages/fs/tool-str-replace-editor/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/fs/tool-str-replace-editor` 的入口和消费者，再读当前契约，沿着 `packages/fs/tool-str-replace-editor/tests/tools.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/fs/tool-str-replace-editor/tests/tools.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 523 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`maybeTruncate`、`codepointCompare`、`matchOffsets`、`lineNumbersAt`；源码顶部原注释（英文，仅作回查线索）：Model-facing str_replace_editor over the Harness filesystem seam. @module @deepseek-ai/dsh-tool-str-replace-editor。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-str-replace-editor/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/src/invariant.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查文件系统、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/fs/tool-str-replace-editor/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-str-replace-editor. @module @deepseek-ai/dsh-tool-str-replace-editor/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/fs/tool-str-replace-editor/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/tests/tools.spec.ts)

- 所属层：packages/fs：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查文件系统、工具的具体场景，包括“tool-str-replace-editor”、“registers the standalone schema and configurable description”、“creates, views, replaces, and inserts with the canonical model-facing output”、“a failed view records absence so create can recover after external deletion”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-str-replace-editor”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/fs/tool-str-replace-editor/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 579 行；扫描到的声明包括 `agent`、`text`、`call`、`setup`；扫描到的测试主题包括 “tool-str-replace-editor”、“registers the standalone schema and configurable description”、“creates, views, replaces, and inserts with the canonical model-facing output”、“a failed view records absence so create can recover after external deletion”、“writes replacement text literally”、“lists visible entries to depth two and clips at the configured view limit”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
