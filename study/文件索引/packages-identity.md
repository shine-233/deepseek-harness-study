# 源文件索引：packages/identity

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 4 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/src/index.ts)

- 所属层：packages/identity：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把身份相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/identity/anonymous-user-id/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/util/home-paths/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/home-paths/src/index.ts)、[packages/feedback/command-feedback/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/feedback/command-feedback/src/index.ts)、[packages/feedback/command-feedback/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/feedback/command-feedback/tests/loader-composition.spec.ts)
- 对应测试：[packages/feedback/command-feedback/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/feedback/command-feedback/tests/loader-composition.spec.ts)、[packages/identity/anonymous-user-id/tests/anonymous-user-id.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/tests/anonymous-user-id.spec.ts)、[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm-deepseek/tests/adapter.spec.ts)、[packages/llm/llm-deepseek/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm-deepseek/tests/loader-composition.spec.ts)、[packages/session/session-telemetry-otel/tests/otel.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-telemetry-otel/tests/otel.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm-deepseek/tests/assemble.ts)、[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先读 `packages/identity/anonymous-user-id` 的入口和消费者，再读当前契约，沿着 `packages/feedback/command-feedback/src/index.ts`、`packages/feedback/command-feedback/tests/loader-composition.spec.ts`、`packages/identity/anonymous-user-id/tests/anonymous-user-id.spec.ts` 看它怎样约束运行时，最后对照 `packages/feedback/command-feedback/tests/loader-composition.spec.ts`、`packages/identity/anonymous-user-id/tests/anonymous-user-id.spec.ts`、`packages/llm/llm-deepseek/tests/adapter.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `AnonymousUserId`、`ANONYMOUS_USER_ID_FILE_NAME`、`AnonymousUserIdOptions`、`getOrCreateAnonymousUserId`、`readPersistedId`；源码顶部原注释（英文，仅作回查线索）：Per-harness-home anonymous user id shared by telemetry and feedback. The id is a random UUID persisted as a bare line in .anonymous-user-id inside the harness home resolved by resolveDshHome ($DSH_HOME > ~/.dsh), and never derived from the hostname, network...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/identity/anonymous-user-id/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/src/invariant.ts)

- 所属层：packages/identity：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查身份必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/identity/anonymous-user-id/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/identity/anonymous-user-id/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/tests/invariant.spec.ts)
- 对应测试：[packages/identity/anonymous-user-id/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/identity/anonymous-user-id/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/identity/anonymous-user-id/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-anonymous-user-id. @module @deepseek-ai/dsh-anonymous-user-id/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/identity/anonymous-user-id/tests/anonymous-user-id.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/tests/anonymous-user-id.spec.ts)

- 所属层：packages/identity：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查身份的具体场景，包括“getOrCreateAnonymousUserId”、“creates, persists, and returns a bare UUID line on first use”、“creates the home directory when missing”、“returns the persisted id on subsequent calls, tolerating surrounding whitespace”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“getOrCreateAnonymousUserId”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/identity/anonymous-user-id/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/README.md)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/identity/anonymous-user-id/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `tempHome`；扫描到的测试主题包括 “getOrCreateAnonymousUserId”、“creates, persists, and returns a bare UUID line on first use”、“creates the home directory when missing”、“returns the persisted id on subsequent calls, tolerating surrounding whitespace”、“overwrites a corrupt file with a fresh id”、“adopts a concurrent winner: exclusive create loses to an id written after the initial read”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/identity/anonymous-user-id/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/tests/invariant.spec.ts)

- 所属层：packages/identity：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查身份的具体场景，包括“invariant companion”、“registers the package ownership with an empty installer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/identity/anonymous-user-id/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/README.md)、[packages/identity/anonymous-user-id/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/identity/anonymous-user-id/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/identity/anonymous-user-id/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers the package ownership with an empty installer”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
