# 源文件索引：packages/subagent

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 90 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/subagent/subagent-acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)、[packages/subagent/subagent-acp/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/run.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/timeout/src/index.ts)、[packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts)
- 对应测试：[packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts)、[packages/subagent/subagent-acp/tests/subagent-acp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/subagent-acp.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-acp` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts`、`packages/subagent/subagent-acp/tests/subagent-acp.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts`、`packages/subagent/subagent-acp/tests/subagent-acp.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 189 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`assertPositiveFinite`、`isDirectory`、`assertUsableCwd`、`resolveCwd`；源码顶部原注释（英文，仅作回查线索）：Out-of-process ACP subagent backend. Each child has its own process, session, model, and tools, so it shares no Cordis context and advertises no parent-enforced start capabilities; the ONE thing it reads off request.parent is the session's workspace cwd (se...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-acp/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-acp. @module @deepseek-ai/dsh-subagent-acp/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-acp/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/run.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进子 agent、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/subagent/subagent-acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/index.ts)
- 对应测试：[packages/subagent/subagent-acp/tests/subagent-acp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/subagent-acp.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-acp` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/subagent/subagent/src/index.ts` 和 `packages/subagent/subagent-acp/src/index.ts`、`packages/subagent/subagent-acp/tests/subagent-acp.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-acp/tests/subagent-acp.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 368 行；扫描到的声明包括 `PermissionPolicy`、`AcpRunSpec`、`DEFAULT_DISPOSE_EOF_GRACE_MS`、`DEFAULT_DISPOSE_GRACE_MS`、`disposeAcpChild`、`acpStopReason`、`acpContentText`、`toAcpPrompt`；源码顶部原注释（英文，仅作回查线索）：Fresh-process ACP subagent client. Drives one child session and owns cancellation and quiescent disposal. TODO(acp-subagent-replay): add snapshot-tier coverage with a separate replay fixture and sessions root inside each child process. Current keyless cover...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-acp/tests/loader-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/loader-composition.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“ACP subagent cwd inheritance through a real cordis.yml”、“runs the child in the parent session workspace and announces it as the ACP session cwd”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ACP subagent cwd inheritance through a real cordis.yml”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 73 行；扫描到的声明包括 `jsonlFiles`；扫描到的测试主题包括 “ACP subagent cwd inheritance through a real cordis.yml”、“runs the child in the parent session workspace and announces it as the ACP session cwd”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-acp/tests/mock-acp-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/mock-acp-server.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“mock-acp-server”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 252 行；扫描到的声明包括 `makeAgent`；源码顶部原注释（英文，仅作回查线索）：A minimal mock ACP AGENT, run as a subprocess, for the keyless dsh-subagent-acp tests. It speaks the agent side of ACP over stdio and is fully scripted by environment variables — no model, no network: - MOCK_TEXT — the assistant text it streams as one agent...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/subagent-acp.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“drives the real acp-agent example process to answer a prompt”、“drives the child to do real file work via its own bash tool”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“drives the real acp-agent example process to answer a prompt”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-acp/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 112 行；扫描到的测试主题包括 “drives the real acp-agent example process to answer a prompt”、“drives the child to do real file work via its own bash tool”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-acp/tests/subagent-acp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/tests/subagent-acp.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“acpStopReason”、“maps each ACP stop reason to the harness vocabulary”、“treats an unknown terminal reason as an error”、“acpContentText / toAcpPrompt”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“acpStopReason”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-acp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/index.ts)、[packages/subagent/subagent-acp/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-acp/src/run.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-acp/src/index.ts`、`packages/subagent/subagent-acp/src/run.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 889 行；扫描到的声明包括 `request`、`setup`、`text`、`waitForFile`；扫描到的测试主题包括 “acpStopReason”、“maps each ACP stop reason to the harness vocabulary”、“treats an unknown terminal reason as an error”、“acpContentText / toAcpPrompt”、“extracts text from a text content block, empty for non-text”、“keeps text prompt blocks and drops non-text ones”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/subagent/subagent-claude-code/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/run.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/timeout/src/index.ts)、[packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts)
- 对应测试：[packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts)、[packages/subagent/subagent-claude-code/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-product.spec.ts)、[packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/subagent/subagent-claude-code/tests/messages-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/messages-fixture.ts)
- 阅读顺序：先读 `packages/subagent/subagent-claude-code` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts`、`packages/subagent/subagent-claude-code/tests/real-product.spec.ts`、`packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts`、`packages/subagent/subagent-claude-code/tests/real-product.spec.ts`、`packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 113 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`ClaudeCodeProvider`；源码顶部原注释（英文，仅作回查线索）：Fixed Claude Code one-shot subagent provider. Every accepted run invokes the official Agent SDK in the delegating Session's workspace and places the SDK-spawned real CLI under the shared subprocess owner. @module @deepseek-ai/dsh-subagent-claude-code。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)
- 对应测试：[packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts` 理解状态变化，最后对照 `packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-claude-code. @module @deepseek-ai/dsh-subagent-claude-code/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/process.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把子 agent的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Projection from the shared managed-process handle to the official Claude Agent SDK's custom-spawn process interface. @module @deepseek-ai/dsh-subagent-claude-code/process”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subprocess/subprocess/src/index.ts)、[packages/subagent/subagent-claude-code/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/run.ts)、[packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)
- 对应测试：[packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-claude-code` 的 README 和入口，再读当前实现，沿着 `packages/subprocess/subprocess/src/index.ts` 和 `packages/subagent/subagent-claude-code/src/run.ts`、`packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 170 行；扫描到的声明包括 `sdkEnvironmentOverlay`、`claudeSpawnSpec`、`ManagedClaudeCodeProcess`、`thrown`；源码顶部原注释（英文，仅作回查线索）：Projection from the shared managed-process handle to the official Claude Agent SDK's custom-spawn process interface. @module @deepseek-ai/dsh-subagent-claude-code/process。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/run.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进子 agent、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent-claude-code/src/process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/process.ts)、[packages/subagent/subagent-claude-code/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/index.ts)
- 对应测试：[packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-claude-code` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/subagent/subagent-claude-code/src/process.ts` 和 `packages/subagent/subagent-claude-code/src/index.ts`、`packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 290 行；扫描到的声明包括 `DEFAULT_DISPOSE_GRACE_MS`、`ClaudeCodeRunSpec`、`textTask`、`successfulResult`、`consumeClaudeQuery`、`disposeClaudeCodeChild`、`claudeQueryOptions`、`startClaudeCodeRun`；源码顶部原注释（英文，仅作回查线索）：One-shot Claude Code lifecycle: invoke the official Agent SDK, place its real CLI process under the shared subprocess owner, map only strict SDK success to completion, and dispose to whole-tree quiescence. @module @deepseek-ai/dsh-subagent-claude-code/run。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/tests/loader-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/loader-composition.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“product-provider public Loader composition”、“loads both opt-in packages and foreground tools without starting either product”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“product-provider public Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的测试主题包括 “product-provider public Loader composition”、“loads both opt-in packages and foreground tools without starting either product”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/tests/messages-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/messages-fixture.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“messages-fixture”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/subagent/subagent-claude-code/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-product.spec.ts)
- 对应测试：[packages/subagent/subagent-claude-code/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-product.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/subagent/subagent-claude-code/tests/real-product.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 150 行；扫描到的声明包括 `MessagesBehavior`、`MessagesFixture`、`startMessagesFixture`、`event`、`complete`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-deepseek.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、DeepSeek的具体场景，包括“returns one unique nonce through the production provider and real SDK/CLI”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“returns one unique nonce through the production provider and real SDK/CLI”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-claude-code/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-claude-code/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 161 行；扫描到的声明包括 `deepSeekBaseUrl`、`expectQuiescent`；扫描到的测试主题包括 “returns one unique nonce through the production provider and real SDK/CLI”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/real-product.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“real Claude Agent SDK 0.3.220 and its distributed Claude Code 2.1.220 fixture”、“inherits host settings and sends the exact task and fake key to local Messages”、“maps a real CLI process failure to error”、“settles cancellation and leaves the real SDK-spawned CLI tree quiescent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real Claude Agent SDK 0.3.220 and its distributed Claude Code 2.1.220 fixture”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-claude-code/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/src/index.ts)、[packages/subagent/subagent-claude-code/tests/messages-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/messages-fixture.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/subagent/subagent-claude-code/tests/messages-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/messages-fixture.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-claude-code/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 314 行；扫描到的声明包括 `realHarness`、`expectQuiescent`、`startRequest`；扫描到的测试主题包括 “real Claude Agent SDK 0.3.220 and its distributed Claude Code 2.1.220 fixture”、“inherits host settings and sends the exact task and fake key to local Messages”、“maps a real CLI process failure to error”、“settles cancellation and leaves the real SDK-spawned CLI tree quiescent”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“task admission and package contracts”、“preserves text sequences and rejects empty, blank, and non-text tasks”、“registers one fixed descriptor, validates config, and unregisters on HMR”、“starts through the registered provider with its resolved config and diagnostics”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“task admission and package contracts”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-claude-code/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-claude-code/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 916 行；扫描到的声明包括 `request`、`nextTask`、`fakeChild`、`success`、`failure`、`queryFrom`、`waitingQuery`、`sdkSpawnOptions`；扫描到的测试主题包括 “task admission and package contracts”、“preserves text sequences and rejects empty, blank, and non-text tasks”、“registers one fixed descriptor, validates config, and unregisters on HMR”、“starts through the registered provider with its resolved config and diagnostics”、“keeps the Loader namespace shape and package-owned empty invariant”、“official spawn projection”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/subagent/subagent-codex/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/run.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/timeout/src/index.ts)、[packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts)
- 对应测试：[packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts)、[packages/subagent/subagent-codex/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-product.spec.ts)、[packages/subagent/subagent-codex/tests/subagent-codex.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/subagent-codex.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts)、[packages/subagent/subagent-codex/tests/responses-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/responses-fixture.ts)
- 阅读顺序：先读 `packages/subagent/subagent-codex` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts`、`packages/subagent/subagent-codex/tests/real-product.spec.ts`、`packages/subagent/subagent-codex/tests/subagent-codex.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts`、`packages/subagent/subagent-codex/tests/real-product.spec.ts`、`packages/subagent/subagent-codex/tests/subagent-codex.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`CodexProvider`；源码顶部原注释（英文，仅作回查线索）：Fixed Codex one-shot subagent provider. Every accepted run starts a fresh official codex app-server --stdio process in the delegating Session's workspace and publishes only after an ephemeral thread exists. @module @deepseek-ai/dsh-subagent-codex。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/subagent-codex/tests/subagent-codex.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/subagent-codex.spec.ts)
- 对应测试：[packages/subagent/subagent-codex/tests/subagent-codex.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/subagent-codex.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/subagent/subagent-codex/tests/subagent-codex.spec.ts` 理解状态变化，最后对照 `packages/subagent/subagent-codex/tests/subagent-codex.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-codex. @module @deepseek-ai/dsh-subagent-codex/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/run.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进子 agent、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent-codex/src/wire.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/wire.ts)、[packages/subagent/subagent-codex/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/index.ts)
- 对应测试：[packages/subagent/subagent-codex/tests/subagent-codex.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/subagent-codex.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-codex` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/subagent/subagent-codex/src/wire.ts` 和 `packages/subagent/subagent-codex/src/index.ts`、`packages/subagent/subagent-codex/tests/subagent-codex.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-codex/tests/subagent-codex.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 200 行；扫描到的声明包括 `DEFAULT_DISPOSE_GRACE_MS`、`codexAppServerArgv`、`CodexRunSpec`、`textTask`、`disposeCodexChild`、`startCodexRun`、`thrown`；源码顶部原注释（英文，仅作回查线索）：One-shot Codex child lifecycle: spawn the real app-server through the subprocess seam, publish only after initialization and ephemeral thread creation, flatten post-publication failures, and dispose to whole-tree quiescence. @module @deepseek-ai/dsh-subagen...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/src/wire.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/wire.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/sdk/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/protocol/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/subagent/subagent-codex/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/run.ts)
- 对应测试：[packages/subagent/subagent-codex/tests/subagent-codex.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/subagent-codex.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-codex` 的 README 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts`、`packages/sdk/protocol/src/index.ts`、`packages/subagent/subagent/src/index.ts` 和 `packages/subagent/subagent-codex/src/run.ts`、`packages/subagent/subagent-codex/tests/subagent-codex.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-codex/tests/subagent-codex.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 374 行；扫描到的声明包括 `CodexAppServerWire`、`object`、`string`、`unattendedDecision`、`isContextWindowExceeded`、`thrown`、`abortError`、`raceAbort`；源码顶部原注释（英文，仅作回查线索）：Minimal Codex app-server 0.147.0 protocol adapter. The shared JSON-RPC transport owns framing and request correlation; this module owns only the product methods, current thread/turn association, unattended approval responses, and terminal-answer selection. ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“deepseek-responses-bridge”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/subagent/subagent-codex/tests/responses-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/responses-fixture.ts)、[packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts)
- 对应测试：[packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 190 行；扫描到的声明包括 `DeepSeekResponsesBridge`、`startDeepSeekResponsesBridge`、`readRequest`、`responseInputTexts`、`taskText`、`deepSeekBaseUrl`、`completeWithDeepSeek`、`closeServer`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/tests/loader-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/loader-composition.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“Codex provider public Loader composition”、“loads the opt-in package and foreground tool without starting Codex”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Codex provider public Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的测试主题包括 “Codex provider public Loader composition”、“loads the opt-in package and foreground tool without starting Codex”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-deepseek.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、DeepSeek的具体场景，包括“returns one unique nonce through the production provider and real Codex”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“returns one unique nonce through the production provider and real Codex”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-codex/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/index.ts)、[packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-codex/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 141 行；扫描到的声明包括 `expectQuiescent`；扫描到的测试主题包括 “returns one unique nonce through the production provider and real Codex”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-product.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“real @openai/codex 0.147.0 product”、“passes the exact task and fake authentication to local Responses and returns exact text”、“cancels a real app-server command approval without executing the command”、“settles cancellation locally and leaves the real app-server tree quiescent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real @openai/codex 0.147.0 product”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-codex/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/src/index.ts)、[packages/subagent/subagent-codex/tests/responses-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/responses-fixture.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/subagent/subagent-codex/tests/responses-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/responses-fixture.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-codex/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 242 行；扫描到的声明包括 `realHarness`、`expectQuiescent`、`responseInputTexts`；扫描到的测试主题包括 “real @openai/codex 0.147.0 product”、“passes the exact task and fake authentication to local Responses and returns exact text”、“cancels a real app-server command approval without executing the command”、“settles cancellation locally and leaves the real app-server tree quiescent”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/tests/responses-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/responses-fixture.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“responses-fixture”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/deepseek-responses-bridge.ts)、[packages/subagent/subagent-codex/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-product.spec.ts)
- 对应测试：[packages/subagent/subagent-codex/tests/real-product.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/real-product.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/subagent/subagent-codex/tests/real-product.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 322 行；扫描到的声明包括 `ResponsesBehavior`、`ResponsesFixture`、`completeResponsesEvents`、`startResponsesFixture`、`responseObject`、`functionCallEvents`、`readRequest`、`closeServer`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-codex/tests/subagent-codex.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/tests/subagent-codex.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“task admission and package contracts”、“resolves the fixed app-server command through the Windows npm shim boundary”、“accepts one or more text blocks and rejects empty or non-text tasks”、“registers one fixed descriptor, validates config, and unregisters on HMR”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“task admission and package contracts”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-codex/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-codex/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1120 行；扫描到的声明包括 `request`、`nextTask`、`ProtocolPeer`、`fakeChild`、`runSpec`、`initializeWire`、`publishRun`、`agentMessage`；扫描到的测试主题包括 “task admission and package contracts”、“resolves the fixed app-server command through the Windows npm shim boundary”、“accepts one or more text blocks and rejects empty or non-text tasks”、“registers one fixed descriptor, validates config, and unregisters on HMR”、“requires a parent session cwd without suggesting unsupported config”、“keeps the namespace export shape and package-owned empty invariant”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-dsh-sdk/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-dsh-sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/README.md)、[packages/subagent/subagent-dsh-sdk/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/run.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts)
- 对应测试：[packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-dsh-sdk` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 138 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`SdkSubagentProvider`；源码顶部原注释（英文，仅作回查线索）：Out-of-process SDK subagent backend. Each child is a complete DeepSeek Harness runtime in its own process — own cordis.yml-decided composition, session, model route, and tools — driven over stdio JSON-RPC through the TypeScript SDK client, so it shares no C...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-dsh-sdk/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-dsh-sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-dsh-sdk. @module @deepseek-ai/dsh-subagent-dsh-sdk/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-dsh-sdk/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/run.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进子 agent、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 直接协作者：[packages/subagent/subagent-dsh-sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/sdk/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sdk/client/src/index.ts)、[packages/subagent/subagent-dsh-sdk/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/index.ts)
- 对应测试：[packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent-dsh-sdk` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/sdk/client/src/index.ts` 和 `packages/subagent/subagent-dsh-sdk/src/index.ts`、`packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 206 行；扫描到的声明包括 `SdkRunSpec`、`DEFAULT_DISPOSE_EOF_GRACE_MS`、`DEFAULT_DISPOSE_GRACE_MS`、`DEFAULT_SHUTDOWN_TIMEOUT_MS`、`sdkStopReason`、`startSdkRun`、`toError`；源码顶部原注释（英文，仅作回查线索）：Fresh-process SDK subagent client. Drives one child DeepSeek Harness runtime over stdio JSON-RPC through @deepseek-ai/dsh-sdk-client and owns cancellation and quiescent disposal. Structure mirrors the ACP backend (@deepseek-ai/dsh-subagent-acp): publish aft...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-dsh-sdk/tests/loader-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/loader-composition.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“SDK subagent cwd inheritance through a real cordis.yml”、“runs the child runtime in the parent session workspace”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SDK subagent cwd inheritance through a real cordis.yml”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-dsh-sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `jsonlFiles`、`sessionEvents`；扫描到的测试主题包括 “SDK subagent cwd inheritance through a real cordis.yml”、“runs the child runtime in the parent session workspace”；源码顶部原注释（英文，仅作回查线索）：Keyless REAL-composition coverage for parent-session cwd inheritance across the SDK wire: a test-only cordis.yml boots the headless app through the Loader with the SDK backend's cwd omitted, a scripted model delegates once, and the child — a COMPLETE second...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/tests/subagent-dsh-sdk.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“sdkStopReason”、“maps each child turn-end reason to the harness vocabulary”、“treats an absent or unknown reason as an error”、“dsh-subagent-dsh-sdk provider”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“sdkStopReason”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-dsh-sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent-dsh-sdk/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/index.ts)、[packages/subagent/subagent-dsh-sdk/src/run.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-dsh-sdk/src/run.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/subagent/subagent-dsh-sdk/src/index.ts`、`packages/subagent/subagent-dsh-sdk/src/run.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 482 行；扫描到的声明包括 `request`、`setup`、`text`、`waitForFile`；扫描到的测试主题包括 “sdkStopReason”、“maps each child turn-end reason to the harness vocabulary”、“treats an absent or unknown reason as an error”、“dsh-subagent-dsh-sdk provider”、“runs a child turn end to end with a parent-unique run id”、“initializes the child with the configured provider/model/maxTokens and the parent cwd”；源码顶部原注释（英文，仅作回查线索）：Keyless integration tests for the SDK subagent backend. Each spawns a REAL subprocess — the SDK client package's scripted fake runtime — and drives it through the REAL backend over real stdio JSON-RPC, so the handshake, the turn round-trip, stop-reason mapp...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-fork-in-process/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-fork-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/subagent/subagent-in-process-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/src/index.ts)、[packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)
- 对应测试：[packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)、[packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts)、[packages/subagent/subagent/tests/continuation-inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation-inheritance.spec.ts)、[packages/subagent/subagent/tests/continuation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation.spec.ts)、[packages/subagent/subagent/tests/list-children.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/list-children.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/storage/storage-domain/tests/helpers/memory-backend.ts)
- 阅读顺序：先读 `packages/subagent/subagent-fork-in-process` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts`、`packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts`、`packages/subagent/subagent/tests/continuation-inheritance.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts`、`packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts`、`packages/subagent/subagent/tests/continuation-inheritance.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 94 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`completedTurnPrefix`、`ForkInProcessProvider`；源码顶部原注释（英文，仅作回查线索）：The in-process FORK subagent backend: registers a SubagentProvider on ctx.subagents that runs each child as a child Agent SEEDED with a prefix of the parent's session log — so the child inherits the parent's conversation context instead of starting fresh. T...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-fork-in-process/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-fork-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-fork-in-process. @module @deepseek-ai/dsh-subagent-fork-in-process/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“multi-subagent coexistence (spawn + fork on one context)”、“both providers register and coexist”、“the same parent drives a spawn child AND a fork child, then keeps working”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“multi-subagent coexistence (spawn + fork on one context)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-fork-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `mountInvariants`、`start`、`setup`、`text`；扫描到的测试主题包括 “multi-subagent coexistence (spawn + fork on one context)”、“both providers register and coexist”、“the same parent drives a spawn child AND a fork child, then keeps working”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“dsh-subagent-fork-in-process”、“emits subagent/start only after the seeded child is published”、“forks an UNSEEDED (fresh) child when the parent has no completed turn”、“seeds every completed parent turn through the last turn/end”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-subagent-fork-in-process”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-fork-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 252 行；扫描到的声明包括 `mountInvariants`、`start`、`setup`、`text`；扫描到的测试主题包括 “dsh-subagent-fork-in-process”、“emits subagent/start only after the seeded child is published”、“forks an UNSEEDED (fresh) child when the parent has no completed turn”、“seeds every completed parent turn through the last turn/end”、“seeds the child with the parent\”、“produces an invariant-CLEAN seed: forking mid-turn excludes the open turn”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent-fork-in-process/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/src/index.ts)
- 对应测试：[packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts)、[packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts)、[packages/subagent/subagent-in-process-driver/tests/preset-inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/preset-inheritance.spec.ts)、[packages/subagent/subagent-in-process-driver/tests/structured.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/structured.spec.ts)、[packages/subagent/subagent-in-process-driver/tests/subagent-in-process-driver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/subagent-in-process-driver.spec.ts)、[packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/subagent/subagent-in-process-driver` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-fork-in-process/src/index.ts`、`packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts`、`packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-fork-in-process/tests/subagent-fork-in-process.spec.ts`、`packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts`、`packages/subagent/subagent-in-process-driver/tests/preset-inheritance.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 233 行；扫描到的声明包括 `InProcessRunOptions`、`startInProcessRun`、`toStopReason`、`prePublicationAbort`、`attachDescriptorAppend`、`drivePublishedRun`、`readResult`；源码顶部原注释（英文，仅作回查线索）：Shared driver for in-process ONE-SHOT subagent providers. The agent factory's creation transaction owns unpublished setup and rollback; after publication the returned AgentHandle is the one quiescent lifecycle owner held by the provider's caller. Continuabl...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-in-process-driver. @module @deepseek-ai/dsh-subagent-in-process-driver/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/src/structured.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/src/structured.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/subagent-in-process-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/src/index.ts)
- 对应测试：[packages/subagent/subagent-in-process-driver/tests/structured.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/structured.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/subagent/subagent-in-process-driver` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/subagent/subagent-in-process-driver/src/index.ts`、`packages/subagent/subagent-in-process-driver/tests/structured.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent-in-process-driver/tests/structured.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `STRUCTURED_OUTPUT_TOOL`、`STRUCTURED_OUTPUT_INSTRUCTION`、`StructuredAttachment`、`attachStructuredRuntime`；源码顶部原注释（英文，仅作回查线索）：Child-scoped structured-output tool, prompt instruction, terminal guard, and authoritative result capture for in-process subagents. Each child registers its real schema on its own scope, so concurrent runs do not interact and disposal leaves no global resid...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/tests/fixtures/plugins/preset-tool.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/fixtures/plugins/preset-tool.js)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为子 agent、工具的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：A preset row standing in for the agent-plane tool rows a real preset mounts. Import-free on purpose — the Loader resolves entry modules through Node's ESM resolver, which cannot see this workspace's TypeScript sources.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/inheritance.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“in-process policy inheritance”、“records the parent sandbox override and the approval pin before publishing a spawn child”、“places inherited events after a fork prefix so fresh policy wins stale seed state”、“captures policy at delegation before asynchronous child creation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“in-process policy inheritance”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 255 行；扫描到的声明包括 `setupWalled`、`spawnRequest`、`toolResultTexts`；扫描到的测试主题包括 “in-process policy inheritance”、“records the parent sandbox override and the approval pin before publishing a spawn child”、“places inherited events after a fork prefix so fresh policy wins stale seed state”、“captures policy at delegation before asynchronous child creation”、“leaves an unswitched sandbox on the deployment default while still pinning approval”、“rejects a child escalation deterministically even when an answerer would allow it”；源码顶部原注释（英文，仅作回查线索）：Delegation policy through child session events appended before publication: the parent's sandbox override plus the pinned approval/policy: never.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/tests/preset-inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/preset-inheritance.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“a child agent composed in-process”、“reaches the model with its parent\”、“carries its parent\”、“records the composition it ran under on the child header”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“a child agent composed in-process”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 135 行；扫描到的声明包括 `setupPresetHost`、`spawnRequest`；扫描到的测试主题包括 “a child agent composed in-process”、“reaches the model with its parent\”、“carries its parent\”、“records the composition it ran under on the child header”、“honours a tool filter over the preset tools it inherited”、“follows a parent that switched preset while blank”；源码顶部原注释（英文，仅作回查线索）：Composition inheritance: a child runs on the preset its parent runs on. With every model-facing row on the agent plane, the tool registry's global layer is empty, so a child that joins no preset reaches the model with no tools at all. These assert the model...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/tests/structured.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/structured.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“in-process structured output”、“captures a valid structured_output call and surfaces result.structured”、“stops the turn after a successful capture — no extra model step is spent”、“denies tool calls that FOLLOW the capture in the same response — terminal means terminal”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“in-process structured output”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 757 行；扫描到的声明包括 `mountInvariants`、`setup`、`structuredRequest`、`toolNames`；扫描到的测试主题包括 “in-process structured output”、“captures a valid structured_output call and surfaces result.structured”、“stops the turn after a successful capture — no extra model step is spent”、“denies tool calls that FOLLOW the capture in the same response — terminal means terminal”、“a later prepended pre-execute listener cannot resurrect dispatch after capture”、“leaves tool calls that PRECEDE the capture in the same response untouched”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-in-process-driver/tests/subagent-in-process-driver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/tests/subagent-in-process-driver.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“startInProcessRun”、“returns only after publication, drives a fresh child, and disposes it”、“uses explicit child model selectors when the parent has none and preserves its cwd”、“reports a prompt a pre-step rejection discarded as refusal, not completion”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“startInProcessRun”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-in-process-driver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 381 行；扫描到的声明包括 `mountInvariants`、`setup`、`request`、`text`；扫描到的测试主题包括 “startInProcessRun”、“returns only after publication, drives a fresh child, and disposes it”、“uses explicit child model selectors when the parent has none and preserves its cwd”、“reports a prompt a pre-step rejection discarded as refusal, not completion”、“does not add a final durability checkpoint to a foreground run”、“keeps published run and handle disposal failures on separate channels”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-spawn-in-process/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent-spawn-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/README.md)、[packages/subagent/subagent-in-process-driver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-in-process-driver/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)
- 对应测试：[packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts)、[packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts)、[packages/subagent/subagent/tests/continuation-inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation-inheritance.spec.ts)、[packages/subagent/subagent/tests/continuation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation.spec.ts)、[packages/subagent/subagent/tests/list-children.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/list-children.spec.ts)、[packages/subagent/tool-subagent-control/tests/list-agents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/list-agents.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/storage/storage-domain/tests/helpers/memory-backend.ts)、[packages/subagent/tool-subagent-control/tests/park-parent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/park-parent.ts)
- 阅读顺序：先读 `packages/subagent/subagent-spawn-in-process` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts`、`packages/subagent/subagent-spawn-in-process/tests/harness.ts`、`packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts` 看它怎样约束运行时，最后对照 `packages/subagent/subagent-fork-in-process/tests/multi-subagent.spec.ts`、`packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts`、`packages/subagent/subagent/tests/continuation-inheritance.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`SpawnInProcessProvider`；源码顶部原注释（英文，仅作回查线索）：The in-process SPAWN subagent backend: registers a SubagentProvider on ctx.subagents that runs each child as a fresh child Agent on the same cordis context (its own session, own system prompt, zero parent context). The cheapest transport, reusing the agent ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-spawn-in-process/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent-spawn-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-subagent-spawn-in-process. @module @deepseek-ai/dsh-subagent-spawn-in-process/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-spawn-in-process/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/harness.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“harness”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/subagent-spawn-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm-deepseek/src/index.ts)、[packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts)
- 对应测试：[packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `spawnHarness`、`waitForIdle`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/spawn-in-process.e2e.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“a parent delegates to a child that writes a file on disk”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“a parent delegates to a child that writes a file on disk”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-spawn-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent-spawn-in-process/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/harness.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/subagent/subagent-spawn-in-process/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/harness.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的测试主题包括 “a parent delegates to a child that writes a file on disk”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/subagent-spawn-in-process.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“dsh-subagent-spawn-in-process”、“runs a fresh child to completion and returns its final assistant output”、“emits subagent/start only after the fresh child is published”、“gives the child its OWN session (not the parent\”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-subagent-spawn-in-process”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent-spawn-in-process/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 496 行；扫描到的声明包括 `mountInvariants`、`setup`、`text`、`start`、`disposeChildLifecycle`；扫描到的测试主题包括 “dsh-subagent-spawn-in-process”、“runs a fresh child to completion and returns its final assistant output”、“emits subagent/start only after the fresh child is published”、“gives the child its OWN session (not the parent\”、“a fresh child does NOT inherit the parent conversation (its log starts empty before the prompt)”、“disposes the child to quiescence (agent removed from the registry)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/activation-setup-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/activation-setup-registry.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供子 agent的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/error.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)
- 对应测试：[packages/subagent/subagent/tests/activation-setup-registry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/activation-setup-registry.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/subagent/subagent/src/error.ts` 和 `packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts`、`packages/subagent/subagent/tests/activation-setup-registry.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent/tests/activation-setup-registry.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 185 行；扫描到的声明包括 `ContinuableSetupContribution`、`SubagentActivationSetupRegistry`、`isRemoved`；源码顶部原注释（英文，仅作回查线索）：Internal registry of deployment capabilities composed into every continuable child's unpublished creation context. A contribution grants a child-scoped capability without teaching the continuation manager which capabilities exist. The manager owns residency...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/assistant-output.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/assistant-output.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/subagent/subagent/src/lifecycle.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/lifecycle.ts)
- 对应测试：[packages/subagent/subagent/tests/assistant-output.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/assistant-output.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/subagent/subagent/src/index.ts`、`packages/subagent/subagent/src/lifecycle.ts`、`packages/subagent/subagent/tests/assistant-output.spec.ts` 确认输入输出，最后对照 `packages/subagent/subagent/tests/assistant-output.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `AssistantOutputFold`、`finalAssistantOutput`；源码顶部原注释（英文，仅作回查线索）：Canonical selection of a child's final assistant output. Backend run results and subagent/end.lastAssistantMessage apply the same rule: select the last non-empty assistant message. An empty-content message records usage only when the loop appends it after a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/child-agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/child-agent.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与子 agent、智能体的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts` 和 `packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 237 行；扫描到的声明包括 `SubagentDepthError`、`resolveChildDepth`、`resolveChildAgentOptions`、`childSessionMeta`、`ChildComposition`、`SUBAGENT_DELEGATION_CONTEXT`、`applyChildComposition`、`DelegatedPolicyOverrides`；源码顶部原注释（英文，仅作回查线索）：Shared in-process child composition: the delegation-depth budget, the durable session metadata, the resolved child AgentOptions, the delegated policy seed, and the scoped setup a child agent needs. Both the one-shot provider driver and the continuation mana...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/client.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成子 agent、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/subagent/subagent/src/projection-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/projection-types.ts)、[packages/client/ui-subagent/src/client/SubagentCatalogAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-subagent/src/client/SubagentCatalogAction.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)、[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/subagent/subagent/src/projection-types.ts` 和 `packages/client/ui-subagent/src/client/SubagentCatalogAction.tsx` 确认输入输出，最后对照 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 7 行；源码顶部原注释（英文，仅作回查线索）：Browser-safe subagent projection vocabulary. @module @deepseek-ai/dsh-subagent/client。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts` 和 `packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1483 行；扫描到的声明包括 `CoordinatorMessageSource`、`SubagentReportMessageSource`、`SubagentSettledMessageSource`、`SubagentReportDelivery`、`SubagentReportOptions`、`ContinuableStartSpec`、`ContinuableStart`、`SubagentInterruptAuthority`；源码顶部原注释（英文，仅作回查线索）：Internal continuable-subagent manager: stable child ids, descriptor persistence, activation admission, the live ownership graph, cold resume, child-first disposal, and settlement delivery to the parent, behind ctx.subagents. A continuable child has one dura...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/depth.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/depth.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/subagent/subagent/src/child-agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/child-agent.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts` 和 `packages/subagent/subagent/src/child-agent.ts`、`packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 51 行；扫描到的声明包括 `delegationDepthOf`、`assertSubagentMaxDepth`；源码顶部原注释（英文，仅作回查线索）：Delegation-depth accounting: the recursion budget a parent passes to its children. Kept apart from the service so composition helpers can read it without importing the registry. @module @deepseek-ai/dsh-subagent/depth。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/descriptor-seed.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/descriptor-seed.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/subagent/subagent/src/descriptor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/descriptor.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/subagent/subagent/src/descriptor.ts` 和 `packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `seedDescriptorTurn`；源码顶部原注释（英文，仅作回查线索）：Seeding of a continuable child's durable descriptor event: the model-hidden record of the child's declared composition before its first request, so a later cold resume can reconstruct it from its own log. @module @deepseek-ai/dsh-subagent/descriptor-seed。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/descriptor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/descriptor.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)、[packages/subagent/subagent/src/descriptor-seed.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/descriptor-seed.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts` 和 `packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/descriptor-seed.ts`、`packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 314 行；扫描到的声明包括 `SUBAGENT_DESCRIPTOR_VERSION`、`OneShotSubagentDescriptorData`、`ContinuableSubagentDescriptorData`、`SubagentDescriptorData`、`OneShotSubagentDescriptorInput`、`ContinuableSubagentDescriptorInput`、`SubagentDescriptorInput`、`snapshotSubagentDescriptor`；源码顶部原注释（英文，仅作回查线索）：The durable subagent-child descriptor: the versioned, model-hidden subagent/descriptor session event that identifies every session-backed subagent and records whether it is one-shot or continuable. Continuable descriptors additionally preserve the declared ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/error.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Typed failures shared by subagent service and provider operations. @module @deepseek-ai/dsh-subagent”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/activation-setup-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/activation-setup-registry.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts` 和 `packages/subagent/subagent/src/activation-setup-registry.ts`、`packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 15 行；扫描到的声明包括 `SubagentError`；源码顶部原注释（英文，仅作回查线索）：Typed failures shared by subagent service and provider operations. @module @deepseek-ai/dsh-subagent。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)、[packages/host/apiproxy/tests/api-proxy-subagents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-subagents.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/subagent/subagent` 的入口和消费者，再读当前契约，沿着 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 499 行；扫描到的声明包括 `SubagentRuntime`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the subagent capability seam (ctx.subagents): a named-provider registry plus a capability-validating asynchronous start API. Providers establish a child before returning its run, so fulfillment is the single publication and ownership-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/subagent/subagent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/subagent/tests/continuation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation.spec.ts)
- 对应测试：[packages/subagent/subagent/tests/continuation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation.spec.ts)、[packages/subagent/subagent/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`packages/subagent/subagent/src/types.ts`、`vendor/cordis/src/index.ts` 和 `packages/subagent/subagent/tests/continuation.spec.ts`、`packages/subagent/subagent/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/subagent/subagent/tests/continuation.spec.ts`、`packages/subagent/subagent/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateRunEnd`；源码顶部原注释（英文，仅作回查线索）：Package-owned subagent registry and lifecycle invariants. @module @deepseek-ai/dsh-subagent/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/lifecycle.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/lifecycle.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 269 行；扫描到的声明包括 `ActivationTerminal`、`ActivationObserver`、`LifecycleEmitter`、`createLifecycleEmitter`、`observeRun`、`createActivationObserver`、`epochStopReason`、`renderThrown`；源码顶部原注释（英文，仅作回查线索）：Lifecycle-edge publication for both subagent shapes: the contained emitter, the one-shot run observer, and the continuable Activation observer. The public payload contracts (SubagentRunInfo, SubagentRunEndInfo) live in ./types.ts with the rest of the seam's...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/list-children.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/list-children.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：子 agent 实现
- 这个文件有什么用：这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。
- 为什么这样设计：子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence/src/index.ts)、[packages/session/session-projection-cache/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-projection-cache/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/session/session-persistence/src/index.ts`、`packages/session/session-projection-cache/src/index.ts` 和 `packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 452 行；扫描到的声明包括 `SubagentListEntry`、`SubagentDescendantListEntry`、`listChildren`、`listDescendants`、`prepareListing`、`resolveCandidateRows`、`descendantCandidates`、`compareCorpusRecords`；源码顶部原注释（英文，仅作回查线索）：Read-only enumeration of durable subagent children and descendant trees straight from the live session store and optional session persistence — no query service. Candidates come from one live-preferred corpus; each child's mode/label is the registered subag...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/out-of-process.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/out-of-process.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把子 agent的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Provider-side vocabulary for OUT-OF-PROCESS subagent backends — the pieces that enforce this seam's own contracts around a child in another process: the no-capabilities advertisement, timing-bound validation, child working-directory resolution (config overr...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/types.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts`、`packages/subagent/subagent/src/types.ts` 和 `packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 215 行；扫描到的声明包括 `NO_START_CAPABILITIES`、`assertPositiveFinite`、`assertUsableCwd`、`validateConfiguredCwd`、`resolveChildCwd`、`RunResultSettlement`、`settleRunResult`、`SubprocessRunHandleParts`；源码顶部原注释（英文，仅作回查线索）：Provider-side vocabulary for OUT-OF-PROCESS subagent backends — the pieces that enforce this seam's own contracts around a child in another process: the no-capabilities advertisement, timing-bound validation, child working-directory resolution (config overr...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/projection-types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/projection-types.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把子 agent、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/subagent/subagent/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/client.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/subagent/subagent/src/list-children.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/list-children.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)、[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/subagent/subagent/src/client.ts`、`packages/subagent/subagent/src/index.ts`、`packages/subagent/subagent/src/list-children.ts` 理解状态变化，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `SubagentTimingProjection`、`SubagentIdentityProjection`；源码顶部原注释（英文，仅作回查线索）：Pure client-safe subagent projection vocabulary. @module @deepseek-ai/dsh-subagent/projection-types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/projection.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把子 agent、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-projection/src/index.ts)、[packages/subagent/subagent/src/descriptor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/descriptor.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：[packages/subagent/subagent/tests/timing-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/timing-projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session/session-projection/src/index.ts`、`packages/subagent/subagent/src/descriptor.ts` 和 `packages/subagent/subagent/src/index.ts`、`packages/subagent/subagent/tests/timing-projection.spec.ts` 理解状态变化，最后对照 `packages/subagent/subagent/tests/timing-projection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `subagentTimingProjectionDefinition`、`subagentIdentityProjectionDefinition`、`descriptorIdentity`；源码顶部原注释（英文，仅作回查线索）：Pure session projections for subagent identity (mode/label) and active-turn duration. @module @deepseek-ai/dsh-subagent/projection。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/run-settlement.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/run-settlement.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进子 agent、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/jobs/jobs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/jobs/jobs/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/types.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的 README 和入口，再读当前实现，沿着 `packages/jobs/jobs/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/subagent/subagent/src/types.ts` 和 `packages/subagent/subagent/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `settleRun`、`finalText`、`runOutcome`；源码顶部原注释（英文，仅作回查线索）：Settlement of one ONE-SHOT subagent run into a background-Task outcome. Only the one-shot background path uses Jobs; continuable children have no Task, no per-message result, and no Task cancellation. @module @deepseek-ai/dsh-subagent/run-settlement。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/types.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述子 agent中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/subagent/subagent/src/continuation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/continuation.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/hooks/hooks-claude-code/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/hooks/hooks-claude-code/tests/bridge.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/subagent/subagent` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent/src/continuation.ts`、`packages/subagent/subagent/src/index.ts`、`packages/subagent/subagent/src/invariant.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/sidebar-subagent-activity.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 324 行；扫描到的声明包括 `SubagentRunId`、`SubagentRunInfo`、`SubagentRunEndInfo`、`SubagentCapabilities`、`SubagentStartRequest`、`ResolvedSubagentStartRequest`、`ContinuableCreateRequest`、`ContinuableCreateSpec`；源码顶部原注释（英文，仅作回查线索）：The seam's consumer-facing contracts: request, result, and capability types for SubagentProvider, plus the subagent/start and subagent/end payloads that plugins and hosts observe. Internal control interfaces belong with their implementation — the lifecycle ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/activation-setup-registry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/activation-setup-registry.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“SubagentActivationSetupRegistry”、“installs contributions in registration order and commits them”、“makes repeated removal and converging ownership idempotent”、“makes the opposite ownership convergence idempotent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SubagentActivationSetupRegistry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/subagent/subagent/src/activation-setup-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/activation-setup-registry.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/subagent/subagent/src/activation-setup-registry.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 163 行；扫描到的声明包括 `childContext`；扫描到的测试主题包括 “SubagentActivationSetupRegistry”、“installs contributions in registration order and commits them”、“makes repeated removal and converging ownership idempotent”、“makes the opposite ownership convergence idempotent”、“skips a contribution removed before a child is applied”、“invalidates a provisioning batch revoked before commit”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/assistant-output.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/assistant-output.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“finalAssistantOutput”、“selects the last non-empty message past a later empty usage-only message”、“prefers a non-empty message over text streamed before and after it”、“treats textless assistant content as a non-empty message”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“finalAssistantOutput”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/assistant-output.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/assistant-output.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/subagent/subagent/src/assistant-output.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `message`、`textDelta`、`reasoningDelta`、`toolResult`；扫描到的测试主题包括 “finalAssistantOutput”、“selects the last non-empty message past a later empty usage-only message”、“prefers a non-empty message over text streamed before and after it”、“treats textless assistant content as a non-empty message”、“falls back to text deltas without including reasoning or tool-result content”、“returns undefined when the child produced neither messages nor text”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/continuation-inheritance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation-inheritance.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“continuable policy inheritance”、“seeds the parent sandbox override and pins approval to never”、“captures policy at delegation before asynchronous child creation”、“leaves an unswitched sandbox on the deployment default while still pinning approval”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“continuable policy inheritance”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 231 行；扫描到的声明包括 `setup`、`startSpec`、`waitNoActivation`、`policyEvents`；扫描到的测试主题包括 “continuable policy inheritance”、“seeds the parent sandbox override and pins approval to never”、“captures policy at delegation before asynchronous child creation”、“leaves an unswitched sandbox on the deployment default while still pinning approval”、“pins approval after the fork prefix of an unswitched fork child”、“lets a later child-side switch win over the delegation snapshot”；源码顶部原注释（英文，仅作回查线索）：Continuable-child delegation policy: a fresh continuable start seeds the parent's explicit sandbox override and the pinned approval/policy: never onto the child's own log as source: 'delegation' events, and a cold resume replays that persisted snapshot inst...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/continuation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/continuation.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“SubagentRuntime.startContinuable”、“returns both identities at inbox acceptance, without waiting for the turn or the log”、“rejects without ids when the provider has no prepareContinuable capability”、“rejects synchronously when persistence is not configured”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SubagentRuntime.startContinuable”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 2523 行；扫描到的声明包括 `GatedAdapter`、`setupWith`、`setup`、`startSpec`、`message`、`hasUserText`、`userTexts`、`followup`；扫描到的测试主题包括 “SubagentRuntime.startContinuable”、“returns both identities at inbox acceptance, without waiting for the turn or the log”、“rejects without ids when the provider has no prepareContinuable capability”、“rejects synchronously when persistence is not configured”、“publishes the reserved child id and appends the pre-turn descriptor”、“rolls the child back completely when the caller signal aborts before acceptance”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/invariant.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“subagent invariants”、“accepts provider and run lifecycle pairs”、“rejects malformed provider transitions”、“rejects malformed and unpaired run transitions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“subagent invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `setup`、`emitRun`；扫描到的测试主题包括 “subagent invariants”、“accepts provider and run lifecycle pairs”、“rejects malformed provider transitions”、“rejects malformed and unpaired run transitions”、“accepts the recorded provider name after registration ends”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/list-children.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/list-children.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“SubagentRuntime.listChildren”、“lists live children without persistence, query services, or the continuation runtime”、“fails loud when the projection registry is not mounted, even with no children”、“fails loud when the session store is not mounted”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SubagentRuntime.listChildren”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/storage/storage-domain/tests/helpers/memory-backend.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1214 行；扫描到的声明包括 `setup`、`startChild`、`authorChild`、`childEvents`、`descriptorPayload`；扫描到的测试主题包括 “SubagentRuntime.listChildren”、“lists live children without persistence, query services, or the continuation runtime”、“fails loud when the projection registry is not mounted, even with no children”、“fails loud when the session store is not mounted”、“lists a persisted continuable child as inactive with its durable label”、“lists one-shot and continuable children under the same parent”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/out-of-process.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/out-of-process.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“NO_START_CAPABILITIES”、“advertises nothing and is frozen (shared by every out-of-process backend)”、“assertPositiveFinite”、“accepts positive finite bounds and rejects zero, negatives, and NaN”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“NO_START_CAPABILITIES”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 185 行；扫描到的测试主题包括 “NO_START_CAPABILITIES”、“advertises nothing and is frozen (shared by every out-of-process backend)”、“assertPositiveFinite”、“accepts positive finite bounds and rejects zero, negatives, and NaN”、“child cwd resolution”、“accepts an absolute enterable directory and rejects relative or missing paths”；源码顶部原注释（英文，仅作回查线索）：Unit coverage for the seam's out-of-process provider vocabulary: cwd resolution against the real filesystem, and the settlement/handle helpers under their never-reject and idempotence contracts.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/run-settlement.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/run-settlement.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、运行驱动的具体场景，包括“outcome mapping helpers”、“settleRun disposes the run before reporting, on both result paths”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“outcome mapping helpers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的测试主题包括 “outcome mapping helpers”、“settleRun disposes the run before reporting, on both result paths”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/service.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent的具体场景，包括“SubagentRuntime”、“registers, lists, looks up, starts, and removes providers”、“rolls registration back when provider-added throws”、“rejects duplicate and absent provider names with typed errors”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SubagentRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 495 行；扫描到的声明包括 `fakeParent`、`baseRequest`、`StubProvider`、`service`；扫描到的测试主题包括 “SubagentRuntime”、“registers, lists, looks up, starts, and removes providers”、“rolls registration back when provider-added throws”、“rejects duplicate and absent provider names with typed errors”、“resolves the one-shot descriptor and exposes no provider continuation operations”、“does not expose manager teardown and treats a scoped drain as a no-op when no manager was bound”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/subagent/tests/timing-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/tests/timing-projection.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、状态投影的具体场景，包括“subagent timing projection”、“registers with the optional session projection registry”、“resets inherited seed timing at the child descriptor and sums later completed turns”、“exposes an open turn start and never subtracts time for reversed boundaries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“subagent timing projection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session/session-projection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-projection/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session/session-projection/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `event`、`fold`；扫描到的测试主题包括 “subagent timing projection”、“registers with the optional session projection registry”、“resets inherited seed timing at the child descriptor and sums later completed turns”、“exposes an open turn start and never subtracts time for reversed boundaries”、“ignores completed pre-descriptor turns and unrelated events”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-control/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/tool-subagent-control/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts)
- 对应测试：[packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts)、[packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/subagent/tool-subagent-control/tests/park-parent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/park-parent.ts)
- 阅读顺序：先读 `packages/subagent/tool-subagent-control` 的入口和消费者，再读当前契约，沿着 `packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts`、`packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts`、`packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 120 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：The globally named send_message and interrupt_agent tools: thin model-facing adapters over ctx.subagents.followup() and ctx.subagents.interrupt(). They perform no lifecycle routing of their own — residency, cold resume, and interrupt authorization belong to...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-control/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/tool-subagent-control/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-subagent-control. @module @deepseek-ai/dsh-tool-subagent-control/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-control/src/list-agents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/src/list-agents.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供子 agent、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The globally named list_agents tool: a thin model-facing adapter over the continuable projection of ctx.subagents.listChildren() and, for the descendants scope, ctx.subagents.listDescendants(). It stays separately loadable from the root send_message plugin ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/subagent/tool-subagent-control/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/subagent/tool-subagent-control/tests/list-agents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/list-agents.spec.ts)
- 对应测试：[packages/subagent/tool-subagent-control/tests/list-agents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/list-agents.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/subagent/tool-subagent-control/tests/park-parent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/park-parent.ts)
- 阅读顺序：先读 `packages/subagent/tool-subagent-control` 的 README 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts` 和 `packages/subagent/tool-subagent-control/tests/list-agents.spec.ts`、`scripts/gen-tool-catalog.ts` 确认输入输出，最后对照 `packages/subagent/tool-subagent-control/tests/list-agents.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 192 行；扫描到的声明包括 `name`、`inject`、`apply`、`resolveListAgentsRequest`、`statusOf`、`project`；源码顶部原注释（英文，仅作回查线索）：The globally named list_agents tool: a thin model-facing adapter over the continuable projection of ctx.subagents.listChildren() and, for the descendants scope, ctx.subagents.listDescendants(). It stays separately loadable from the root send_message plugin ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-control/tests/list-agents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/list-agents.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、工具的具体场景，包括“dsh-tool-subagent-control/list-agents”、“registers list_agents once, globally, with only the optional scope parameter”、“renders the empty result as (no subagents)”、“renders children and diagnostics in array order with registry-derived statuses”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-subagent-control/list-agents”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/tool-subagent-control/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/subagent/tool-subagent-control/tests/park-parent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/park-parent.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 357 行；扫描到的声明包括 `GatedAdapter`、`setupWith`、`setup`、`text`、`callTool`、`waitNoActivation`；扫描到的测试主题包括 “dsh-tool-subagent-control/list-agents”、“registers list_agents once, globally, with only the optional scope parameter”、“renders the empty result as (no subagents)”、“renders children and diagnostics in array order with registry-derived statuses”、“resolves omitted scope to children and forwards the tool cancellation signal”、“lists a real settled continuable child and omits a real one-shot sibling”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-control/tests/park-parent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/park-parent.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“park-parent”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/tool-subagent-control/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/subagent/tool-subagent-control/tests/list-agents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/list-agents.spec.ts)、[packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts)
- 对应测试：[packages/subagent/tool-subagent-control/tests/list-agents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/list-agents.spec.ts)、[packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/subagent/tool-subagent-control/tests/list-agents.spec.ts`、`packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `parkParent`；源码顶部原注释（英文，仅作回查线索）：Shared suite helper: keep this package's stand-in parent out of a scripted model corpus. @module park-parent。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/tool-subagent-control.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、工具的具体场景，包括“dsh-tool-subagent-control”、“registers send_message once, globally, with the two required parameters”、“cold-resumes a settled child and reports the queued next turn”、“queues behind an open turn instead of joining it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-subagent-control”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/tool-subagent-control/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/subagent/tool-subagent-control/tests/park-parent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-control/tests/park-parent.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 390 行；扫描到的声明包括 `GatedAdapter`、`setupWith`、`setup`、`text`、`callTool`、`waitNoActivation`；扫描到的测试主题包括 “dsh-tool-subagent-control”、“registers send_message once, globally, with the two required parameters”、“cold-resumes a settled child and reports the queued next turn”、“queues behind an open turn instead of joining it”、“reports a delivery failure as an errored, not-delivered result”、“rejects a caller that is not the child\”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-report/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/tool-subagent-report/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts)
- 对应测试：[packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/subagent/tool-subagent-report` 的入口和消费者，再读当前契约，沿着 `packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `name`、`inject`、`Config`、`installReportTool`、`apply`；源码顶部原注释（英文，仅作回查线索）：The child-scoped report tool and its usage guidance, installed into every continuable in-process child's unpublished context. Roots, one-shot children, remote providers, and agentless executions never see the registration. @module @deepseek-ai/dsh-tool-suba...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-report/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/tool-subagent-report/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-subagent-report. @module @deepseek-ai/dsh-tool-subagent-report/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/tests/tool-subagent-report.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、工具的具体场景，包括“dsh-tool-subagent-report”、“registers report only in continuable child scopes”、“adds no implicit capability when the package is absent”、“does not imply parent controls and survives a global-tool allow-list”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-subagent-report”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/tool-subagent-report/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent-report/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 559 行；扫描到的声明包括 `HeldAdapter`、`setup`、`startChild`、`callReport`、`registerReportConflict`、`reports`、`renderedText`、`sectionNames`；扫描到的测试主题包括 “dsh-tool-subagent-report”、“registers report only in continuable child scopes”、“adds no implicit capability when the package is absent”、“does not imply parent controls and survives a global-tool allow-list”、“delivers quiet reports with stable message and sender identities without waking”、“queues wakeup reports as one later parent turn”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/src/index.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把子 agent、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/subagent/tool-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/subagent/subagent-spawn-in-process/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent-spawn-in-process/tests/harness.ts)
- 对应测试：[packages/subagent/tool-subagent/tests/tool-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/tool-subagent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/subagent/tool-subagent/tests/scripted-provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.ts)
- 阅读顺序：先读 `packages/subagent/tool-subagent` 的入口和消费者，再读当前契约，沿着 `packages/subagent/subagent-spawn-in-process/tests/harness.ts`、`packages/subagent/tool-subagent/tests/tool-subagent.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/subagent/tool-subagent/tests/tool-subagent.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 467 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`outputValueText`、`settleStart`、`stopReasonError`、`withPartialText`；源码顶部原注释（英文，仅作回查线索）：Model-facing delegation through one configured ctx.subagents provider. Provider lifecycle controls tool registration and context-sensitive schema wording. Foreground calls always dispose the run after collection. Background policy is selected by this plugin...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/src/invariant.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查子 agent、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/subagent/tool-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-subagent. @module @deepseek-ai/dsh-tool-subagent/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent/tests/scripted-provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、工具的具体场景，包括“scripted subagent provider fixture”、“registers through the real service and returns the scripted reply”、“registers under a configurable name”、“returns configured and default structured results”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“scripted subagent provider fixture”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/tool-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/subagent/tool-subagent/tests/scripted-provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/subagent/subagent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `fakeParent`、`baseRequest`、`mount`；扫描到的测试主题包括 “scripted subagent provider fixture”、“registers through the real service and returns the scripted reply”、“registers under a configurable name”、“returns configured and default structured results”、“omits structured output when no schema is requested”、“honors configured and cancellation stop reasons”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent/tests/scripted-provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“scripted-provider”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/subagent/tool-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/subagent/subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/subagent/src/index.ts)、[packages/subagent/tool-subagent/tests/scripted-provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.spec.ts)
- 对应测试：[packages/subagent/tool-subagent/tests/scripted-provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.spec.ts)、[packages/subagent/tool-subagent/tests/tool-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/tool-subagent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/subagent/tool-subagent/tests/scripted-provider.spec.ts`、`packages/subagent/tool-subagent/tests/tool-subagent.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `Config`、`mountScriptedProvider`、`ScriptedSubagentProvider`；源码顶部原注释（英文，仅作回查线索）：Package-local scripted child boundary for deterministic tool-subagent tests.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/subagent/tool-subagent/tests/tool-subagent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/tool-subagent.spec.ts)

- 所属层：packages/subagent：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查子 agent、工具的具体场景，包括“dsh-tool-subagent”、“rejects continuable background policy when the provider cannot prepare continuable chil...”、“registers a”、“exposes description + prompt + run_in_background to the model (no provider/type parameter)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-subagent”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/subagent/tool-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/subagent/tool-subagent/tests/scripted-provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subagent/tool-subagent/tests/scripted-provider.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1277 行；扫描到的声明包括 `fakeAgent`、`setup`、`callSubagent`、`text`、`ownerAgent`、`backgroundSetup`、`continuableSetup`、`captureSetup`；扫描到的测试主题包括 “dsh-tool-subagent”、“rejects continuable background policy when the provider cannot prepare continuable children”、“registers a”、“exposes description + prompt + run_in_background to the model (no provider/type parameter)”、“omits run_in_background entirely when the instance disables it (schema and capability never disagree)”、“refuses a forced run_in_background at execution time when the instance disables it”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
