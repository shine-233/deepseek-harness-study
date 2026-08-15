# 源文件索引：packages/sandbox

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 50 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 沙箱 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sandbox/sandbox-local/tests/acl-grants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/acl-grants.spec.ts)、[packages/sandbox/sandbox-local/tests/bwrap.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/bwrap.e2e.ts)、[packages/sandbox/sandbox-local/tests/landlock.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/landlock.e2e.ts)、[packages/sandbox/sandbox-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/local.spec.ts)、[packages/sandbox/sandbox-local/tests/packed-install.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/packed-install.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 567 行；扫描到的声明包括 `Config`、`SandboxInternals`、`LocalSandboxProvider`、`defaultProbeBwrap`、`defaultProbeSeatbelt`、`defaultProbeWindowsAcl`、`assertPositiveFinite`；文件顶部注释线索：Local sandbox backend. It selects the platform runner chain (Linux bwrap then Landlock; macOS Seatbelt; Windows the ACL restricted-token runner), functionally probes competing candidates once, and reports each wrap's enforcement and stderr classification fa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/invariant.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 沙箱 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-sandbox-local. @module @deepseek-ai/dsh-sandbox-local/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/src/profiles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/profiles.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Internal platform-profile builders for the local sandbox provider. @module @deepseek-ai/dsh-sandbox-local/profiles”。固定提交中扫描到的公开或顶层声明包括 `bwrapProfileArgs`、`landlockProfileArgs`、`seatbeltProfileArgs`、`sbplString`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Internal platform-profile builders for the local sandbox provider. @module @deepseek-ai/dsh-sandbox-local/profiles”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sandbox/sandbox-local/tests/bwrap.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/bwrap.e2e.ts)、[packages/sandbox/sandbox-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/local.spec.ts)、[packages/sandbox/sandbox-local/tests/seatbelt.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/seatbelt.e2e.ts)、[packages/shell/bash-sandbox/tests/bwrap.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/shell/bash-sandbox/tests/bwrap.e2e.ts)、[packages/shell/bash-sandbox/tests/seatbelt.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/shell/bash-sandbox/tests/seatbelt.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `bwrapProfileArgs`、`landlockProfileArgs`、`seatbeltProfileArgs`、`sbplString`；文件顶部注释线索：Internal platform-profile builders for the local sandbox provider. @module @deepseek-ai/dsh-sandbox-local/profiles。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/tests/acl-grants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/acl-grants.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 339 行；扫描到的声明包括 `MockAclWriteGrant`、`setup`、`workspaceRoot`、`flag`；扫描到的测试主题包括 “windows-acl write grants (LocalSandboxProvider)”、“workspace-write materializes one standing workspace grant and one private temp capability, then reuses both”、“read-only materializes no capability; upgrade creates them and downgrade leaves them reusable”、“a fresh provider gives a resumed session a new temp path and SID, so crash residue cannot collide”、“forks and workspace changes receive distinct temp capabilities while each workspace grant is reused”、“workspace grant failure disposes its SID, aggregates cleanup failure, and never creates a temp directory”；文件顶部注释线索：windows-acl grant ownership through the real LocalSandboxProvider: one standing capability per workspace plus one random, distinct, revocable temp capability per live session/workspace pair. The Win32 grant surface is mocked; native access checks live in sa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/tests/bwrap.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/bwrap.e2e.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[packages/sandbox/sandbox-local/src/profiles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/profiles.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `tempDir`、`provider`、`runConfined`；扫描到的测试主题包括 “the passing probe selects the bwrap rung naturally — first in the ladder, full enforcement, EROFS dialect”、“read-only denies a write — the file must NOT exist, and the kernel speaks the advertised dialect”、“read-only keeps the tree readable/executable and the fresh /dev/null writable”、“workspace-write lands a write inside the workspace root and still denies one beside it”、“workspace-write mounts an EPHEMERAL /tmp: the write succeeds inside, the host /tmp stays untouched”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/tests/landlock.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/landlock.e2e.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的声明包括 `tempDir`、`provider`、`runConfined`；扫描到的测试主题包括 “read-only denies a write — the file must NOT exist, the wrap reports the probed enforcement”、“read-only keeps the tree readable/executable and /dev/null writable”、“read-only denies a write beneath the host /dev (the /dev/shm tmpfs must stay untouched)”、“workspace-write lands a write inside the workspace root and still denies one beside it”、“workspace-write grants the host /tmp (the documented Landlock-profile difference)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/local.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[packages/sandbox/sandbox-local/src/profiles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/profiles.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 453 行；扫描到的声明包括 `setup`、`absentRunnerEntry`、`fakeLauncher`、`fakeSeatbeltExec`；扫描到的测试主题包括 “profile dialects”、“bwrap read-only: whole tree read-only with fresh /dev and /proc, no writable mounts”、“bwrap workspace-write: adds an ephemeral /tmp and rebinds the workspace root”、“landlock read-only: readable tree plus a writable /dev/null, nothing else”、“landlock workspace-write: adds the host /tmp and the workspace root”、“seatbelt read-only: allow-default with every file write denied except the /dev/null literal”；文件顶部注释线索：LocalSandboxProvider tests. No real runner is assumed to exist on the test host: runnerCommand injects deterministic runner argvs, and internals injects probe verdicts plus fake Landlock launcher / sandbox-exec scripts, so profile dialects, ladder selection...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/tests/packed-install.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/packed-install.e2e.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 193 行；扫描到的测试主题包括 “installs this checkout\”、“the installed provider resolves the launcher INSIDE the consumer node_modules platform package”、“confines through the installed launcher (enforcing kernel) or fails closed (non-enforcing) — never unconfined”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-local/tests/seatbelt.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/seatbelt.e2e.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/README.md)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[packages/sandbox/sandbox-local/src/profiles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/profiles.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 112 行；扫描到的声明包括 `tempDir`、`provider`、`runConfined`；扫描到的测试主题包括 “read-only denies a write — the file must NOT exist, and the kernel speaks the advertised dialect”、“read-only keeps the tree readable/executable and /dev/null writable”、“read-only grants no temp area: a write under the user temp dir is denied too”、“workspace-write lands a write inside the workspace root and still denies one beside it”、“workspace-write grants /tmp and the user temp dir (the documented Seatbelt-profile temp areas)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/index.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 沙箱 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sandbox/sandbox-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)
- 对应测试：[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[packages/e2b/e2b/tests/composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/e2b/e2b/tests/composition.e2e.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts)、[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)、[packages/fs/tool-str-replace-editor/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-str-replace-editor/tests/tools.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 154 行；扫描到的声明包括 `Config`、`SandboxPolicyRequest`、`SandboxPolicyService`、`resolveWorkspaceRoot`、`renderPolicyContext`；文件顶部注释线索：The sandbox POLICY home (ctx.sandboxPolicy): the single owner of the deployment's sandbox fallbacks plus per-session resolution: the file-effect SandboxMode, the workspace-write root, and the override kit (the sandbox/mode event, its fold, and its write pat...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-policy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/invariant.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 沙箱 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sandbox/sandbox-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/sandbox/sandbox-policy/src/session-mode.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/session-mode.ts)、[packages/sandbox/sandbox-policy/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/tests/invariant.spec.ts)
- 对应测试：[packages/sandbox/sandbox-policy/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateEvent`；文件顶部注释线索：Package-owned session-event invariants for sandbox policy. @module @deepseek-ai/dsh-sandbox-policy/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-policy/src/session-mode.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/session-mode.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱、会话；文件顶部注释把它定位为“Per-session sandbox-mode override: the session log as the store. A runtime switch (a UI policy control or test scenario) is recorded as one sandbox/mode event on the session it applies to; effective = fold(events) ?? the deployment default, so an override s...”。固定提交中扫描到的公开或顶层声明包括 `SANDBOX_MODES`、`effectiveSandboxMode`、`setSandboxMode`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Per-session sandbox-mode override: the session log as the store. A runtime switch (a UI policy control or test scenario) is recorded as one sandbox/mode event on the session it applies to; effective = fold(events) ?? the deployment default, so an override s...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)、[packages/sandbox/sandbox-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/index.ts)、[packages/sandbox/sandbox-policy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/invariant.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 71 行；扫描到的声明包括 `SANDBOX_MODES`、`effectiveSandboxMode`、`setSandboxMode`；文件顶部注释线索：Per-session sandbox-mode override: the session log as the store. A runtime switch (a UI policy control or test scenario) is recorded as one sandbox/mode event on the session it applies to; effective = fold(events) ?? the deployment default, so an override s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-policy/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/tests/invariant.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/sandbox/sandbox-policy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `setup`、`modeEvent`；扫描到的测试主题包括 “sandbox-policy invariants”、“ignores unrelated event streams”、“rejects and attributes an unknown durable sandbox mode”、“rejects an unknown mode already present on late registration”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-policy/tests/policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/tests/policy.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 230 行；扫描到的声明包括 `mounted`、`session`、`agentFor`、`policyContext`、`promptMounted`；扫描到的测试主题包括 “SandboxPolicyService”、“defaults to read-only under the process cwd”、“carries a configured mode and resolves the workspace root absolute”、“resolves the deployment policy for an agentless call”、“resolves each session mode and cwd together without changing the fallback”、“lets an approved mode outrank the session mode while retaining its root”；文件顶部注释线索：Tests for the sandbox-policy home: the deployment default (mode + workspaceRoot) the service exposes, and the per-session sandbox/mode override kit (fold + write path) every enforcing capability reads.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-policy/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/tsdown.config.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它定义 沙箱 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/sandbox/sandbox-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-policy/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“ACL editing helpers: grant/revoke a capability SID on a directory via SetEntriesInAclW + SetNamedSecurityInfoW (the same calls the POC uses, with the failure handling the POC lacks). Every API call is checked and every failure is reported with the API name,...”。固定提交中扫描到的公开或顶层声明包括 `buildExplicitAccess`、`lockFilePath`、`withPathLock`、`grantWrite`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“ACL editing helpers: grant/revoke a capability SID on a directory via SetEntriesInAclW + SetNamedSecurityInfoW (the same calls the POC uses, with the failure handling the POC lacks). Every API call is checked and every failure is reported with the API name,...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/win32-abi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/win32-abi.ts)、[packages/sandbox/sandbox-windows-acl/src/grant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/grant.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 271 行；扫描到的声明包括 `buildExplicitAccess`、`lockFilePath`、`withPathLock`、`grantWrite`、`revokeWrite`、`readCurrentDacl`、`mergeAndApply`、`hasExactGrant`；文件顶部注释线索：ACL editing helpers: grant/revoke a capability SID on a directory via SetEntriesInAclW + SetNamedSecurityInfoW (the same calls the POC uses, with the failure handling the POC lacks). Every API call is checked and every failure is reported with the API name,...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：错误模型
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Fail-closed Win32 error type. Every backend API failure raises this with the API name and the exact Win32 code; the original POC silently ignored every failed call and would run children UNRESTRICTED (fail-open) — that is the failure mode this class exists ...”。固定提交中扫描到的公开或顶层声明包括 `Win32Error`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Fail-closed Win32 error type. Every backend API failure raises this with the API name and the exact Win32 code; the original POC silently ignored every failed call and would run children UNRESTRICTED (fail-open) — that is the failure mode this class exists ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)、[packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `Win32Error`；文件顶部注释线索：Fail-closed Win32 error type. Every backend API failure raises this with the API name and the exact Win32 code; the original POC silently ignored every failed call and would run children UNRESTRICTED (fail-open) — that is the failure mode this class exists ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Lazy koffi bindings for the Win32 ACL-sandbox backend. Koffi loads lazily so non-Windows processes never open Win32 libraries. Every function signature below was verified against the MinGW Windows headers on this machine (winnt.h / accctrl.h / aclapi.h / se...”。固定提交中扫描到的公开或顶层声明包括 `NativePtr`、`isNullPtr`、`isInvalidHandle`、`StartupInfoInput`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Lazy koffi bindings for the Win32 ACL-sandbox backend. Koffi loads lazily so non-Windows processes never open Win32 libraries. Every function signature below was verified against the MinGW Windows headers on this machine (winnt.h / accctrl.h / aclapi.h / se...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/win32-abi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/win32-abi.ts)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/grant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/grant.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/grant-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/grant-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 512 行；扫描到的声明包括 `NativePtr`、`isNullPtr`、`isInvalidHandle`、`StartupInfoInput`、`ProcessInfoOutput`、`Win32Bindings`、`STARTUPINFOW`、`PROCESS_INFORMATION`；文件顶部注释线索：Lazy koffi bindings for the Win32 ACL-sandbox backend. Koffi loads lazily so non-Windows processes never open Win32 libraries. Every function signature below was verified against the MinGW Windows headers on this machine (winnt.h / accctrl.h / aclapi.h / se...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/grant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/grant.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Server-side write-grant materialization. The sandbox seam holds one standing workspace grant per workspace and one revocable temp grant per live session/workspace pair. Workspace identities survive by deterministic derivation and their standing ACE; temp id...”。固定提交中扫描到的公开或顶层声明包括 `AclWriteGrant`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Server-side write-grant materialization. The sandbox seam holds one standing workspace grant per workspace and one revocable temp grant per live session/workspace pair. Workspace identities survive by deterministic derivation and their standing ACE; temp id...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sandbox/sandbox-local/tests/acl-grants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/acl-grants.spec.ts)、[packages/sandbox/sandbox-local/tests/bwrap.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/bwrap.e2e.ts)、[packages/sandbox/sandbox-local/tests/landlock.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/landlock.e2e.ts)、[packages/sandbox/sandbox-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/local.spec.ts)、[packages/sandbox/sandbox-local/tests/packed-install.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/packed-install.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `AclWriteGrant`；文件顶部注释线索：Server-side write-grant materialization. The sandbox seam holds one standing workspace grant per workspace and one revocable temp grant per live session/workspace pair. Workspace identities survive by deterministic derivation and their standing ACE; temp id...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 沙箱 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/grant-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/grant-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/grant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/grant.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/probe.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/probe.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/runner.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 434 行；扫描到的声明包括 `AclSandboxOptions`、`AclSandboxSpawnOptions`、`AclSandboxChildResult`、`AclSandboxChild`、`AclSandbox`、`freeSidBestEffort`；文件顶部注释线索：Windows ACL write-restriction sandbox backend for the DeepSeek Harness sandbox seam. Mirrors the mechanism of github.com/huoyaoyuan/ windows-acl-restrict-poc @ 10e4dfb (the fixed revision): a WRITE_RESTRICTED token whose restricting SIDs include distinct wo...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/invariant.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 沙箱 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-sandbox-windows-acl. @module @deepseek-ai/dsh-sandbox-windows-acl/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/path-boundary.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/path-boundary.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Canonical directory-boundary checks for the Windows ACL workspace and private-temp capabilities. @module @deepseek-ai/dsh-sandbox-windows-acl/path-boundary”。固定提交中扫描到的公开或顶层声明包括 `assertTempRootOutsideWorkspace`、`assertPrivateTempDisjoint`、`containsDirectory`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Canonical directory-boundary checks for the Windows ACL workspace and private-temp capabilities. @module @deepseek-ai/dsh-sandbox-windows-acl/path-boundary”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)、[packages/sandbox/sandbox-windows-acl/tests/path-boundary.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/path-boundary.spec.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/path-boundary.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/path-boundary.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `assertTempRootOutsideWorkspace`、`assertPrivateTempDisjoint`、`containsDirectory`；文件顶部注释线索：Canonical directory-boundary checks for the Windows ACL workspace and private-temp capabilities. @module @deepseek-ai/dsh-sandbox-windows-acl/path-boundary。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/runner.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“The windows-acl confinement runner: the argv-prefix wrapper the sandbox seam spawns in place of the caller's command. It creates the WRITE_RESTRICTED token with the workspace write-SID allowlist, spawns the wrapped argv under it with the CALLER'S stdio inhe...”。固定提交中扫描到的公开或顶层声明包括 `RunnerFailure`、`fail`、`parseArgs`、`requireDirectory`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The windows-acl confinement runner: the argv-prefix wrapper the sandbox seam spawns in place of the caller's command. It creates the WRITE_RESTRICTED token with the workspace write-SID allowlist, spawns the wrapped argv under it with the CALLER'S stdio inhe...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)、[packages/sandbox/sandbox-windows-acl/src/workspace-sid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/workspace-sid.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/runner.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 226 行；扫描到的声明包括 `RunnerFailure`、`fail`、`parseArgs`、`requireDirectory`、`main`；文件顶部注释线索：The windows-acl confinement runner: the argv-prefix wrapper the sandbox seam spawns in place of the caller's command. It creates the WRITE_RESTRICTED token with the workspace write-SID allowlist, spawns the wrapped argv under it with the CALLER'S stdio inhe...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/spawn.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Restricted-process spawning: anonymous pipes for stdio, STARTUPINFOW with STARTF_USESTDHANDLES, CreateProcessAsUserW under the restricted token, then asynchronous pipe draining and exit waiting. Console isolation (CREATE_NO_WINDOW / CREATE_NEW_CONSOLE) is i...”。固定提交中扫描到的公开或顶层声明包括 `quoteArg`、`buildCommandLine`、`SpawnedNative`、`spawnSandboxed`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Restricted-process spawning: anonymous pipes for stdio, STARTUPINFOW with STARTF_USESTDHANDLES, CreateProcessAsUserW under the restricted token, then asynchronous pipe draining and exit waiting. Console isolation (CREATE_NO_WINDOW / CREATE_NEW_CONSOLE) is i...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/win32-abi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/win32-abi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)、[packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/quote.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/quote.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 357 行；扫描到的声明包括 `quoteArg`、`buildCommandLine`、`SpawnedNative`、`spawnSandboxed`、`drainPipe`、`waitForExit`、`SpawnedInherited`、`spawnSandboxedInherited`；文件顶部注释线索：Restricted-process spawning: anonymous pipes for stdio, STARTUPINFOW with STARTF_USESTDHANDLES, CreateProcessAsUserW under the restricted token, then asynchronous pipe draining and exit waiting. Console isolation (CREATE_NO_WINDOW / CREATE_NEW_CONSOLE) is i...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/token.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/token.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Restricted-token construction: open the current process token, extract its logon SID, build the well-known SIDs, and call CreateRestrictedToken with the POC's restricting-SID allowlist. Every API call is checked; any failure throws with the API name and the...”。固定提交中扫描到的公开或顶层声明包括 `openCurrentProcessToken`、`findLogonSid`、`makeWellKnownSid`、`setTokenDefaultDaclGrant`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Restricted-token construction: open the current process token, extract its logon SID, build the well-known SIDs, and call CreateRestrictedToken with the POC's restricting-SID allowlist. Every API call is checked; any failure throws with the API name and the...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/win32-abi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/win32-abi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 222 行；扫描到的声明包括 `openCurrentProcessToken`、`findLogonSid`、`makeWellKnownSid`、`setTokenDefaultDaclGrant`、`RestrictingSidSet`、`createRestrictedToken`、`buildRestrictingSids`；文件顶部注释线索：Restricted-token construction: open the current process token, extract its logon SID, build the well-known SIDs, and call CreateRestrictedToken with the POC's restricting-SID allowlist. Every API call is checked; any failure throws with the API name and the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/win32-abi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/win32-abi.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“Windows ABI constants for the ACL-sandbox backend. Every value was verified against the actual MinGW Windows headers on this machine (C:\Strawberry\c\x86_64-w64-mingw32\include\) and cross-checked at runtime by verify/abi-probe.cpp (same numbers; static_ass...”。固定提交中扫描到的公开或顶层声明包括 `TOKEN_ASSIGN_PRIMARY`、`TOKEN_DUPLICATE`、`TOKEN_QUERY`、`TOKEN_ADJUST_DEFAULT`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Windows ABI constants for the ACL-sandbox backend. Every value was verified against the actual MinGW Windows headers on this machine (C:\Strawberry\c\x86_64-w64-mingw32\include\) and cross-checked at runtime by verify/abi-probe.cpp (same numbers; static_ass...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts)、[packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 258 行；扫描到的声明包括 `TOKEN_ASSIGN_PRIMARY`、`TOKEN_DUPLICATE`、`TOKEN_QUERY`、`TOKEN_ADJUST_DEFAULT`、`SE_GROUP_LOGON_ID`、`STANDARD_RIGHTS_WRITE`、`FILE_GENERIC_WRITE`、`DELETE`；文件顶部注释线索：Windows ABI constants for the ACL-sandbox backend. Every value was verified against the actual MinGW Windows headers on this machine (C:\Strawberry\c\x86_64-w64-mingw32\include\) and cross-checked at runtime by verify/abi-probe.cpp (same numbers; static_ass...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/src/workspace-sid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/workspace-sid.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“The per-workspace write identity: a deterministic S-1-4-x-y SID derived from the canonical workspace path, whose ACEs form that workspace's write allowlist. Every confined execution of the same workspace — across sessions, server restarts, and calls — carri...”。固定提交中扫描到的公开或顶层声明包括 `workspaceWriteSid`、`tempWriteSid`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The per-workspace write identity: a deterministic S-1-4-x-y SID derived from the canonical workspace path, whose ACEs form that workspace's write allowlist. Every confined execution of the same workspace — across sessions, server restarts, and calls — carri...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)、[packages/sandbox/sandbox-windows-acl/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/runner.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sandbox/sandbox-local/tests/acl-grants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/acl-grants.spec.ts)、[packages/sandbox/sandbox-local/tests/bwrap.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/bwrap.e2e.ts)、[packages/sandbox/sandbox-local/tests/landlock.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/landlock.e2e.ts)、[packages/sandbox/sandbox-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/local.spec.ts)、[packages/sandbox/sandbox-local/tests/packed-install.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/packed-install.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `workspaceWriteSid`、`tempWriteSid`；文件顶部注释线索：The per-workspace write identity: a deterministic S-1-4-x-y SID derived from the canonical workspace path, whose ACEs form that workspace's write allowlist. Every confined execution of the same workspace — across sessions, server restarts, and calls — carri...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl-failure-paths.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 456 行；扫描到的声明包括 `aclApi`、`craftSid`、`craftAclWithGrant`；扫描到的测试主题包括 “withPathLock failure paths”、“fails closed when CreateFileW returns an invalid handle”、“closes the handle and reports when LockFileEx fails”、“closes the handle and reports when UnlockFileEx fails”、“reports a failed CloseHandle after a successful action”、“mergeAndApply failure paths”；文件顶部注释线索：ACL failure-path tests with stub binding tables (the failure-paths.spec.ts pattern): every checked Win32 call in the lock, read-merge-write, and grant-skip sequence has a failing counterpart, and each failure closes the handles it created before throwing. T...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/acl.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/acl.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/acl.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 318 行；扫描到的声明包括 `sidFromString`、`sidString`、`readDirectAces`、`scratch`；扫描到的测试主题包括 “grantWrite merges into the current DACL: an explicit Users ACE survives grant+revoke”、“grantWrite is idempotent: a second grant over the standing exact ACE skips the SetNamedSecurityInfoW apply (no eager full-tree re-propagation)”、“interleaved sandbox instances: A.init → B.init → A.dispose → B.dispose leaves BOTH standing workspace ACEs (the per-workspace reuse cache)”、“dispose revokes the revocable temp ACE and keeps the standing workspace ACE (self-managed flow)”、“rejects an overlapping private temp directory before applying either capability”、“workspace-write without a write SID fails at construction; the token layer guards the same contract”；文件顶部注释线索：ACL edit tests: the read-merge-write grant keeps pre-existing explicit ACEs, interleaved sandbox instances do not clobber each other, the per-path lock primitive is deterministic, and the grant mask carries DELETE + FILE_DELETE_CHILD (never WRITE_DAC/WRITE_...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/failure-paths.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/spawn.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 454 行；扫描到的声明包括 `pipeFailureApi`、`resumeFailureApi`、`pipeOkApi`、`inheritedApi`；扫描到的测试主题包括 “spawn failure paths close their handles”、“spawnSandboxed closes all six pipe handles before throwing when CreateProcessAsUserW fails”、“spawnSandboxedInherited closes thread, process, and kill-on-close job before throwing when ResumeThread fails”、“spawnSandboxedInherited TERMINATES the suspended child before closing handles when AssignProcessToJobObject fails”、“getTempPath buffer defense”、“throws a clear error instead of decoding a buffer GetTempPathW never wrote”；文件顶部注释线索：Failure-path unit tests with minimal stub binding tables: the spawn helpers must close every handle they created before throwing, and getTempPath must refuse to decode a buffer GetTempPathW never wrote. Pure stubs — no real Win32 calls, so these run on ever...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/ffi.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/win32-abi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/win32-abi.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `formatApi`、`craftSid`；扫描到的测试主题包括 “errorText”、“decodes the formatted UTF-16 message and trims it”、“returns an empty string when FormatMessageW formats nothing”、“getTempPath”、“decodes the NUL-terminated temp path GetTempPathW wrote”、“reports the Win32 failure when GetTempPathW writes nothing”；文件顶部注释线索：FFI helper tests with stub binding tables (the failure-paths.spec.ts pattern): error formatting and temp-path decoding defenses, the last-error throwers' detail fallback, pointer decode NULL handling, and the bounded SID comparison's early exits. Pure stubs...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/grant-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/grant-failure-paths.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `grantThenFailApi`；扫描到的测试主题包括 “AclWriteGrant failure paths”、“create fails closed: a SID parse failure throws before anything is granted”、“create fails closed: a null SID pointer is rejected”、“dispose aggregates a failing revocation into an AggregateError (best-effort cleanup)”、“dispose aggregates a failing SID free into an AggregateError”；文件顶部注释线索：AclWriteGrant failure-path tests with stub binding tables (the failure-paths.spec.ts pattern): create fails closed on SID-parse failure, dispose aggregates revocation and SID-free failures into an AggregateError. Pure stubs — no real Win32 calls, so these r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/grant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/grant.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `icaclsText`、`scratch`；扫描到的测试主题包括 “create parses the SID fail-closed: a malformed SID throws before anything is granted”、“add materializes the ACE (idempotently) and reports grant order; dispose revokes revocable paths and keeps standing paths standing”、“two grants with different SIDs coexist and revoke independently”；文件顶部注释线索：AclWriteGrant tests: the server-side grant materialization — SID parsing fail-closed, ACE add/dispose round-trip against the REAL directory DACL (observed through icacls, the operator's own tool), the recorded path order, and the standing/revocable lifecycl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/index-failure-paths.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 448 行；扫描到的声明包括 `scratch`、`happyStubs`；扫描到的测试主题包括 “AclSandbox constructor validation”、“rejects a writable directory that does not exist”、“resolves relative writable directories to absolute paths”、“rejects temp authority under read-only”、“rejects a temp SID when temp writes are disabled”、“AclSandbox init”；文件顶部注释线索：AclSandbox orchestration failure-path tests: the win32 resolver is mocked to hand each test a stub binding table, so every checked Win32 call in init/spawn/dispose has a failing counterpart without opening real token or ACL handles. Constructor validation, ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/path-boundary.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/path-boundary.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/path-boundary.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/path-boundary.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `scratch`；扫描到的测试主题包括 “Windows ACL temp path boundary”、“rejects a temp root equal to or below the workspace”、“accepts a temp parent above the workspace because a fresh child is a sibling”、“requires an actual private temp directory to be disjoint in either direction”；文件顶部注释线索：Canonical path-overlap checks that keep workspace and temp capabilities separate.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/probe.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/probe.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 110 行；扫描到的声明包括 `pwshAvailable`；扫描到的测试主题包括 “allows writes only in granted directories and denies the escape write”、“fails closed when the write SID cannot be parsed (no unrestricted fallback)”、“failed init clears provisional temp state before a retry”；文件顶部注释线索：End-to-end probe of the ACL write-restriction sandbox, using the same probes as the POC verification harness: the confined child must be able to write into the granted target and temp directories, must be DENIED writing anywhere else, and (documented bounda...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/provider-chain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/provider-chain.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “windows-acl win32 chain (LocalSandboxProvider)”、“agentless workspace-write: runner argv prefix, temp root, mode flag, partial enforcement, ACL denial dialect”、“read-only: same runner and contract, read-only mode flag”；文件顶部注释线索：The win32 chain's argv contract, denial dialect, and runner-failure rules, exercised through the REAL LocalSandboxProvider.confine() with an injected platform and runner argv prefix. Platform-independent assertions: they run in every CI lane (Windows includ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/quote.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/quote.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/spawn.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的测试主题包括 “quoteArg”、“parses quoteArg+join back to the exact original argv”；文件顶部注释线索：quoteArg unit tests plus a round-trip through the REAL CommandLineToArgvW parser (shell32.dll, shellapi.h line ~867: LPWSTR *CommandLineToArgvW(LPCWSTR lpCmdLine, int *pNumArgs)) on win32. CommandLineToArgvW applies the documented backslash rule (2n backsla...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/runner.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/runner.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)、[packages/shell/pwsh-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/shell/pwsh-local/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 461 行；扫描到的声明包括 `pwshAvailable`、`runRunner`；扫描到的测试主题包括 “workspace-write: the confined child writes granted directories only”、“read-only: no write-SID grants — workspace/temp writes denied, reads and $null redirection fine, CIM unavailable”、“workspace-write: Remove-Item and Rename-Item succeed in the granted workspace (DELETE + FILE_DELETE_CHILD)”、“paired SIDs: the runner trusts caller-owned private-temp grants and materializes nothing itself”、“temp capabilities isolate sibling sessions that share one workspace SID”、“agentless workspace-write creates a fresh private temp per call and removes it on exit”；文件顶部注释线索：End-to-end runner tests: spawn the REAL runner entry through tsx (exactly the argv shape dsh-sandbox-local's confine() builds), with piped stdio inherited through the runner into the confined child — the same chain a production confined execution walks.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/token-failure-paths.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/errors.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/errors.ts)、[packages/sandbox/sandbox-windows-acl/src/ffi.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/ffi.ts)、[packages/sandbox/sandbox-windows-acl/src/token.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/token.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 436 行；扫描到的声明包括 `logonApi`、`daclApi`；扫描到的测试主题包括 “openCurrentProcessToken failure paths”、“reports when OpenProcess yields no handle”、“closes the process handle and reports when OpenProcessToken fails”、“reports a failed CloseHandle of the process handle”、“rejects a NULL token handle after a successful OpenProcessToken”、“findLogonSid failure paths”；文件顶部注释线索：Restricted-token failure-path tests with stub binding tables (the failure-paths.spec.ts pattern): every checked Win32 call in the token pipeline — open, logon-SID scan, well-known SID creation, default-DACL merge, restricted-token creation — has a failing c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tests/workspace-sid.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/workspace-sid.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)、[packages/sandbox/sandbox-windows-acl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 43 行；扫描到的测试主题包括 “workspaceWriteSid”、“derives a stable capability-shaped SID per workspace path”、“derives distinct identities for distinct workspaces”、“is byte-sensitive: the canonical path is the caller\”、“tempWriteSid”、“derives a stable domain-separated SID per private temp path”；文件顶部注释线索：workspaceWriteSid tests: the per-workspace write identity is deterministic (the same canonical path always derives the same SID — the property the cross-session grant reuse rests on), capability-shaped, distinct across workspaces, and byte-sensitive (the ca...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tsdown.config.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它定义 沙箱 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox-windows-acl/verify/abi-probe.cpp](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/verify/abi-probe.cpp)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“ABI probe: prints sizeof/offsetof/enum values from the actual MinGW Windows headers on this machine. These numbers are the source of truth for the koffi FFI definitions in the Node.js port.”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“ABI probe: prints sizeof/offsetof/enum values from the actual MinGW Windows headers on this machine. These numbers are the source of truth for the koffi FFI definitions in the Node.js port.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox-windows-acl/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/README.md)
- 对应测试：[packages/sandbox/sandbox-windows-acl/tests/probe.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-windows-acl/tests/probe.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 195 行；文件顶部注释线索：ABI probe: prints sizeof/offsetof/enum values from the actual MinGW Windows headers on this machine. These numbers are the source of truth for the koffi FFI definitions in the Node.js port.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/src/escalation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/escalation.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“The escalation vocabulary and choreography shared by every sandbox-enforcing tool family (@deepseek-ai/dsh-tool-bash, @deepseek-ai/dsh-tool-fs): the strictly-wider ladder, the argument-pairing validation, the model-facing denial/hint markers, and approveEsc...”。固定提交中扫描到的公开或顶层声明包括 `WIDER_MODES`、`ESCALATION_TARGETS`、`validateEscalationArgs`、`sandboxDenialMarker`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The escalation vocabulary and choreography shared by every sandbox-enforcing tool family (@deepseek-ai/dsh-tool-bash, @deepseek-ai/dsh-tool-fs): the strictly-wider ladder, the argument-pairing validation, the model-facing denial/hint markers, and approveEsc...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/permission-policy-context.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/permission-policy-context.e2e.ts)、[apps/web/tests/pwsh-terminal.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/pwsh-terminal.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 189 行；扫描到的声明包括 `WIDER_MODES`、`ESCALATION_TARGETS`、`validateEscalationArgs`、`sandboxDenialMarker`、`escalationHintMarker`、`EscalationOutcome`、`EscalationApprover`、`EscalationApproval`；文件顶部注释线索：The escalation vocabulary and choreography shared by every sandbox-enforcing tool family (@deepseek-ai/dsh-tool-bash, @deepseek-ai/dsh-tool-fs): the strictly-wider ladder, the argument-pairing validation, the model-facing denial/hint markers, and approveEsc...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 沙箱 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/sandbox/sandbox/src/escalation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/escalation.ts)、[apps/web/tests/permission-policy-context.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/permission-policy-context.e2e.ts)
- 对应测试：[apps/web/tests/permission-policy-context.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/permission-policy-context.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/fs-sandbox/tests/fs-sandbox.spec.ts)、[packages/fs/tool-fs/tests/tools.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/fs/tool-fs/tests/tools.spec.ts)、[packages/interaction/permission-presets/tests/permission-presets.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/interaction/permission-presets/tests/permission-presets.spec.ts)、[packages/sandbox/sandbox-local/tests/acl-grants.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/acl-grants.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 178 行；扫描到的声明包括 `SandboxMode`、`ConfinedSandboxMode`、`SandboxExecutionPolicy`、`SandboxEnforcement`、`SandboxPolicy`、`RunnerFailureRule`、`ConfinedArgv`、`SANDBOX_UNAVAILABLE`；文件顶部注释线索：Service Definition for the same-world process-confinement capability seam: wrap exact subprocess argv under a host-path file policy. Containers, microVMs, and remote execution replace the surrounding capability seam instead; this service shares the host ker...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/invariant.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 沙箱 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-sandbox. @module @deepseek-ai/dsh-sandbox/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/src/roots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/roots.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 沙箱；文件顶部注释把它定位为“The writable-root derivation shared by every enforcement dialect that expresses a mode as a canonical allow-list: workspace-write means "the workspace root plus the platform temp areas", and this module is that meaning's one home. The Seatbelt profile (@dee...”。固定提交中扫描到的公开或顶层声明包括 `canonicalPath`、`writableRoots`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The writable-root derivation shared by every enforcement dialect that expresses a mode as a canonical allow-list: workspace-write means "the workspace root plus the platform temp areas", and this module is that meaning's one home. The Seatbelt profile (@dee...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/permission-policy-context.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/permission-policy-context.e2e.ts)、[apps/web/tests/pwsh-terminal.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/pwsh-terminal.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `canonicalPath`、`writableRoots`；文件顶部注释线索：The writable-root derivation shared by every enforcement dialect that expresses a mode as a canonical allow-list: workspace-write means "the workspace root plus the platform temp areas", and this module is that meaning's one home. The Seatbelt profile (@dee...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/tests/escalation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/tests/escalation.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 111 行；扫描到的测试主题包括 “the strictly-wider ladder”、“read-only escalates to either wider mode; workspace-write only to full access”、“the target enum is the closed set every session could escalate TO (read-only is the floor)”、“validateEscalationArgs”、“accepts neither field, or both with a non-empty justification”、“rejects one field without the other, and a blank justification”；文件顶部注释线索：Tests for the shared escalation vocabulary and choreography: the strictly- wider ladder, the argument-pairing validation, the model-facing markers, and approveEscalation's ordered fail-closed sequence. Both enforcing tool families (dsh-tool-bash, dsh-tool-f...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/tests/roots.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/tests/roots.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 39 行；扫描到的测试主题包括 “canonicalPath”、“resolves symlinks (an existing path realpaths)”、“returns the spelling as-is when the path cannot be resolved (conservative — matches nothing until it exists)”、“writableRoots”、“read-only grants nothing”、“workspace-write grants the workspace root plus the platform temp areas, canonical and deduplicated”；文件顶部注释线索：Tests for the writable-root derivation: the mode's meaning as a canonical allow-list. Pinned here so the fs fence and the Seatbelt profile — both deriving from writableRoots — cannot drift.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/sandbox/sandbox/tests/vocabulary.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/tests/vocabulary.spec.ts)

- 所属层：packages/sandbox：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 沙箱 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/sandbox/sandbox/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/README.md)、[packages/sandbox/sandbox/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的测试主题包括 “SandboxUnavailableError”、“carries the structured { name, code } identity consumers key on”、“names the refused mode and the operator escape hatches in its message”、“carries the runner detail when the failure is discovered at execution time”；文件顶部注释线索：Vocabulary-contract tests for the sandbox seam: the fail-closed error's structured identity is what tool results and consumers key on, so its shape is pinned here, next to the vocabulary that owns it. Provider behavior is each implementation's suite (dsh-sa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
