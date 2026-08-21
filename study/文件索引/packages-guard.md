# 源文件索引：packages/guard

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 6 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/guard/repeat-tool-reminder/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/src/index.ts)

- 所属层：packages/guard：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把权限保护、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Advisory per-agent repeat-call detector. It enriches post-execute decisions with logged model context without vetoing or rewriting calls. Configuration and chain semantics live in the package README; rationale lives in the repeat-tool-reminder Agent Note. @...”；固定提交中扫描到的声明包括 `name`、`Config`、`apply`、`detailedReminder`、`sortJsonValue`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/guard/repeat-tool-reminder/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts)
- 对应测试：[packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/guard/repeat-tool-reminder/README.md`、入口和消费者，再读当前契约，沿着 `packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts` 看它怎样约束运行时，最后对照 `packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 233 行；扫描到的声明包括 `name`、`Config`、`apply`、`detailedReminder`、`sortJsonValue`、`canonicalize`、`wildcardToRegExp`、`previewArguments`；源码顶部原注释（英文，仅作回查线索）：Advisory per-agent repeat-call detector. It enriches post-execute decisions with logged model context without vetoing or rewriting calls. Configuration and chain semantics live in the package README; rationale lives in the repeat-tool-reminder Agent Note. @...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/guard/repeat-tool-reminder/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/src/invariant.ts)

- 所属层：packages/guard：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查权限保护、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-repeat-tool-reminder. @module @deepseek-ai/dsh-repeat-tool-reminder/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/guard/repeat-tool-reminder/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-repeat-tool-reminder. @module @deepseek-ai/dsh-repeat-tool-reminder/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/tests/repeat-tool-reminder.spec.ts)

- 所属层：packages/guard：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查权限保护、工具的具体场景，包括“threshold escalation”、“reminds gently at the first default threshold (3) and in detail at the second (5)”、“keys the gentle text to thresholds[0], not the literal 3”、“chain semantics”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“threshold escalation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`waitForIdle`、`reminders`、`spine`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/guard/repeat-tool-reminder/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/repeat-tool-reminder/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 403 行；扫描到的声明包括 `harness`、`waitForIdle`、`reminders`、`spine`；扫描到的测试主题包括 “threshold escalation”、“reminds gently at the first default threshold (3) and in detail at the second (5)”、“keys the gentle text to thresholds[0], not the literal 3”、“chain semantics”、“caps the detailed reminder arguments at argumentsPreviewChars (detection still keys on the full string)”、“a different tracked call resets the chain”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/guard/timeout-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/src/index.ts)

- 所属层：packages/guard：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把权限保护、策略相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Cooperative tool-call timeout enforcer. A tool declares timeoutMs and promises to honor exec.signal; this wrapper arms that deadline and maps its own expiry to TOOL_TIMEOUT without racing or abandoning the tool promise. FIXME: settle the intended @deepseek-...”；固定提交中扫描到的声明包括 `TOOL_TIMEOUT`、`name`、`inject`、`apply`、`toolTimeoutResult`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/guard/timeout-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/guard/timeout-policy/tests/timeout-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/tests/timeout-policy.spec.ts)
- 对应测试：[packages/guard/timeout-policy/tests/timeout-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/tests/timeout-policy.spec.ts)、[packages/lsp/tool-lsp/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/web/tool-web/tests/integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/guard/timeout-policy/README.md`、入口和消费者，再读当前契约，沿着 `packages/guard/timeout-policy/tests/timeout-policy.spec.ts`、`packages/lsp/tool-lsp/tests/integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts` 看它怎样约束运行时，最后对照 `packages/guard/timeout-policy/tests/timeout-policy.spec.ts`、`packages/lsp/tool-lsp/tests/integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `TOOL_TIMEOUT`、`name`、`inject`、`apply`、`toolTimeoutResult`；源码顶部原注释（英文，仅作回查线索）：Cooperative tool-call timeout enforcer. A tool declares timeoutMs and promises to honor exec.signal; this wrapper arms that deadline and maps its own expiry to TOOL_TIMEOUT without racing or abandoning the tool promise. FIXME: settle the intended @deepseek-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/guard/timeout-policy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/src/invariant.ts)

- 所属层：packages/guard：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查权限保护、策略必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tool-call-timeout-policy. @module @deepseek-ai/dsh-tool-call-timeout-policy/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/guard/timeout-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-call-timeout-policy. @module @deepseek-ai/dsh-tool-call-timeout-policy/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/guard/timeout-policy/tests/timeout-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/tests/timeout-policy.spec.ts)

- 所属层：packages/guard：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查权限保护、策略的具体场景，包括“timeout-policy delegation (unconfigured / fast)”、“delegates a tool with NO declared budget unchanged and does not touch exec.signal”、“a tool with a budget that returns fast keeps its own result (no timeout)”、“a budgeted tool receives the DERIVED deadline signal (not the caller signal) during dis...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“timeout-policy delegation (unconfigured / fast)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Unit + real-load-path coverage for @deepseek-ai/dsh-tool-call-timeout-policy. The timeout-wins cases drive the deadline under fake timers (deterministic — no wall-clock race) and use a COOPERATIVE tool that settles only when its exec.signal aborts, mirrorin...”；固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/guard/timeout-policy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/guard/timeout-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/guard/timeout-policy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/guard/timeout-policy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 244 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “timeout-policy delegation (unconfigured / fast)”、“delegates a tool with NO declared budget unchanged and does not touch exec.signal”、“a tool with a budget that returns fast keeps its own result (no timeout)”、“a budgeted tool receives the DERIVED deadline signal (not the caller signal) during dispatch”、“timeout-policy signal restoration”、“restores the caller signal for post-execute after wrapping”；源码顶部原注释（英文，仅作回查线索）：Unit + real-load-path coverage for @deepseek-ai/dsh-tool-call-timeout-policy. The timeout-wins cases drive the deadline under fake timers (deterministic — no wall-clock race) and use a COOPERATIVE tool that settles only when its exec.signal aborts, mirrorin...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
