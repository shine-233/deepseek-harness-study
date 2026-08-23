# 源文件索引：packages/credentials

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 20 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/credentials/authorization` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition for the authorization capability seam (ctx.authorization): obtaining a credential nobody can supply from configuration alone, because getting it requires a conversation with the human — open this page, paste that code, pick an account. Th...”；固定提交中扫描到的声明包括 `AuthorizationError`、`AuthorizationDeclinedError`、`AuthorizationSession`、`AuthorizationFlow`、`AuthorizationInteraction`；本地静态 import 图显示它直接依赖 4 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/credentials/authorization/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/README.md)、[packages/credentials/authorization/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/types.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)
- 对应测试：[packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)、[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)、[packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts)、[packages/llm/llm-pi-ai/tests/login.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/login.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)、[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先读 `packages/credentials/authorization/README.md`、入口和消费者，再读当前契约，沿着 `packages/credentials/authorization/tests/authorization.spec.ts`、`packages/credentials/authorization/tests/invariant.spec.ts`、`packages/llm/llm-pi-ai/src/login.ts` 看它怎样约束运行时，最后对照 `packages/credentials/authorization/tests/authorization.spec.ts`、`packages/credentials/authorization/tests/invariant.spec.ts`、`packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 437 行；扫描到的声明包括 `AuthorizationError`、`AuthorizationDeclinedError`、`AuthorizationSession`、`AuthorizationFlow`、`AuthorizationInteraction`、`AuthorizationRequest`、`AuthorizationService`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the authorization capability seam (ctx.authorization): obtaining a credential nobody can supply from configuration alone, because getting it requires a conversation with the human — open this page, paste that code, pick an account. Th...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/authorization/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/invariant.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/credentials/authorization` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-authorization. @module @deepseek-ai/dsh-authorization/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/credentials/authorization/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)
- 对应测试：[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/credentials/authorization/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/credentials/authorization/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-authorization. @module @deepseek-ai/dsh-authorization/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/authorization/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/types.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 `packages/credentials/authorization` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Wire-safe authorization types, free of cordis/service imports so browser type chains (apiproxy api → client) can consume them without loading this package's Context augmentation. @module @deepseek-ai/dsh-authorization/types”；固定提交中扫描到的声明包括 `AuthorizationMethod`、`AuthorizationNotice`、`AuthorizationPromptOption`、`AuthorizationPrompt`、`AuthorizationStatus`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/credentials/authorization/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/README.md)、[packages/credentials/credentials/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/types.ts)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)、[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)、[packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/discovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/discovery.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/credentials/authorization/README.md`、入口和消费者，再读当前契约，沿着 `packages/credentials/authorization/src/index.ts` 看它怎样约束运行时，最后对照 `packages/credentials/authorization/tests/authorization.spec.ts`、`packages/credentials/authorization/tests/invariant.spec.ts`、`packages/llm/llm-pi-ai/tests/adapter.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `AuthorizationMethod`、`AuthorizationNotice`、`AuthorizationPromptOption`、`AuthorizationPrompt`、`AuthorizationStatus`、`AuthorizationSettlement`、`AuthorizationOutcome`、`AuthorizationEntry`；源码顶部原注释（英文，仅作回查线索）：Wire-safe authorization types, free of cordis/service imports so browser type chains (apiproxy api → client) can consume them without loading this package's Context augmentation. @module @deepseek-ai/dsh-authorization/types。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“authorization”写出可重复运行的断言，覆盖的场景包括“AuthorizationService registry”、“lists a registered flow and drops it when the registration is disposed”、“refuses a second flow for the same key”、“withdraws an attempt still running when its flow leaves”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AuthorizationService registry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`surface`、`committingFlow`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/authorization/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/README.md)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)、[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/authorization/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 465 行；扫描到的声明包括 `harness`、`surface`、`committingFlow`；扫描到的测试主题包括 “AuthorizationService registry”、“lists a registered flow and drops it when the registration is disposed”、“refuses a second flow for the same key”、“withdraws an attempt still running when its flow leaves”、“AuthorizationService.begin”、“runs the flow, confirms the committed record, and reports the settlement”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“invariant”写出可重复运行的断言，覆盖的场景包括“authorization invariant companion”、“accepts an attempt that released its key before settling”、“fails a settlement that left its key in flight”、“fails a settlement emitted without a live service”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“authorization invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/authorization/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/README.md)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)、[packages/credentials/authorization/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/invariant.ts)、[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/authorization/src/index.ts`、`packages/credentials/authorization/src/invariant.ts`、`packages/credentials/credentials/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的测试主题包括 “authorization invariant companion”、“accepts an attempt that released its key before settling”、“fails a settlement that left its key in flight”、“fails a settlement emitted without a live service”、“accepts a settlement whose flow left during its own attempt”、“reserves the package name against duplicate registration”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“memory”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `MemoryCredentials`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/credentials/authorization/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)、[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)
- 对应测试：[packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)、[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/credentials/authorization/tests/authorization.spec.ts`、`packages/credentials/authorization/tests/invariant.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `MemoryCredentials`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/credentials/credentials-local` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“File-backed credentials provider over $DSH_HOME/.credentials.yaml, layered against the environment by how much each layer is trusted: text inherited process environment (read-only, wins) > $DSH_HOME/.credentials.yaml (provider-managed, writable) > <invocati...”；固定提交中扫描到的声明包括 `CREDENTIALS_FILENAME`、`Config`、`resolveSpec`、`DOCUMENT_VERSION`、`CredentialsDocument`；本地静态 import 图显示它直接依赖 6 个源文件，并被 14 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/util/atomic-write/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/atomic-write/src/index.ts)、[packages/util/home-paths/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/home-paths/src/index.ts)、[packages/credentials/credentials-local/tests/drain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/drain.spec.ts)
- 对应测试：[packages/credentials/credentials-local/tests/drain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/drain.spec.ts)、[packages/credentials/credentials-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/local.spec.ts)、[packages/credentials/credentials-local/tests/migration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/migration.spec.ts)、[packages/credentials/credentials-local/tests/records.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/records.spec.ts)、[packages/credentials/credentials-local/tests/review-fixes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/review-fixes.spec.ts)、[packages/credentials/credentials-local/tests/watcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/watcher.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/credentials/credentials-local/README.md`、入口和消费者，再读当前契约，沿着 `packages/credentials/credentials-local/tests/drain.spec.ts`、`packages/credentials/credentials-local/tests/local.spec.ts`、`packages/credentials/credentials-local/tests/migration.spec.ts` 看它怎样约束运行时，最后对照 `packages/credentials/credentials-local/tests/drain.spec.ts`、`packages/credentials/credentials-local/tests/local.spec.ts`、`packages/credentials/credentials-local/tests/migration.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 935 行；扫描到的声明包括 `CREDENTIALS_FILENAME`、`Config`、`resolveSpec`、`DOCUMENT_VERSION`、`CredentialsDocument`、`parseCredentialsDocument`、`renderFlatLayoutMigration`、`LocalCredentialProvider`；源码顶部原注释（英文，仅作回查线索）：File-backed credentials provider over $DSH_HOME/.credentials.yaml, layered against the environment by how much each layer is trusted: text inherited process environment (read-only, wins) > $DSH_HOME/.credentials.yaml (provider-managed, writable) > <invocati...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/invariant.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/credentials/credentials-local` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-credentials-local. @module @deepseek-ai/dsh-credentials-local/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-credentials-local. @module @deepseek-ai/dsh-credentials-local/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/tests/drain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/drain.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“drain”写出可重复运行的断言，覆盖的场景包括“write-drain teardown”、“lets the in-flight write land and fails the queued one after disposal”、“fails a queued record write after disposal on the same terms”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“write-drain teardown”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setGate`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/util/atomic-write/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/atomic-write/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/util/atomic-write/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `setGate`；扫描到的测试主题包括 “write-drain teardown”、“lets the in-flight write land and fails the queued one after disposal”、“fails a queued record write after disposal on the same terms”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/local.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“local”写出可重复运行的断言，覆盖的场景包括“resolveSpec”、“defaults to .credentials.yaml under the harness home with watching on”、“lets an explicit path win over the home”、“layering and reads”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveSpec”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`、`updates`、`bootLayered`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/util/launch-environment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/launch-environment/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/util/launch-environment/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 466 行；扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`、`updates`、`bootLayered`；扫描到的测试主题包括 “resolveSpec”、“defaults to .credentials.yaml under the harness home with watching on”、“lets an explicit path win over the home”、“layering and reads”、“treats an absent file as an empty writable store”、“serves file entries alongside comments and quoted values”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/tests/migration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/migration.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“migration”写出可重复运行的断言，覆盖的场景包括“flat-layout boot migration”、“upgrades the flat document in place, byte for byte, and serves its keys”、“a second boot reads the migrated document without touching it”、“yields to a concurrent migrator under the writer lock”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“flat-layout boot migration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“One-shot boot upgrade of the pre-release flat layout: a key stored by an earlier build must survive the versioned-document change without a hand edit, byte for byte, while everything the recognizer cannot prove flat keeps the loud rejection local.spec exerc...”；固定提交中扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/util/atomic-write/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/atomic-write/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/util/atomic-write/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`；扫描到的测试主题包括 “flat-layout boot migration”、“upgrades the flat document in place, byte for byte, and serves its keys”、“a second boot reads the migrated document without touching it”、“yields to a concurrent migrator under the writer lock”、“leaves an empty flow mapping alone”、“leaves a comment-only document alone”；源码顶部原注释（英文，仅作回查线索）：One-shot boot upgrade of the pre-release flat layout: a key stored by an earlier build must survive the versioned-document change without a hand edit, byte for byte, while everything the recognizer cannot prove flat keeps the loud rejection local.spec exerc...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/tests/records.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/records.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“records”写出可重复运行的断言，覆盖的场景包括“credential keys”、“rejects a segment that is not a lowercase hyphenated identifier”、“stays disjoint from the reference grammar”、“reads back the owning plugin, which is what makes an orphan recognizable”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“credential keys”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The record half of the seam: the store keeps an owner's payload verbatim, presence rather than content answers "configured", and every write goes through one serialized read-modify-write so a rotating credential cannot be lost between processes.”；固定提交中扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`、`put`、`recordUpdates`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 349 行；扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`、`put`、`recordUpdates`；扫描到的测试主题包括 “credential keys”、“rejects a segment that is not a lowercase hyphenated identifier”、“stays disjoint from the reference grammar”、“reads back the owning plugin, which is what makes an orphan recognizable”、“admits a stored key and refuses one that is not two segments”、“record storage”；源码顶部原注释（英文，仅作回查线索）：The record half of the seam: the store keeps an owner's payload verbatim, presence rather than content answers "configured", and every write goes through one serialized read-modify-write so a rotating credential cannot be lost between processes.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/tests/review-fixes.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/review-fixes.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“review-fixes”写出可重复运行的断言，覆盖的场景包括“read-modify-write”、“folds an unobserved external edit into a write instead of overwriting it”、“keeps both refs when two providers write the same document concurrently”、“creates the credentials directory owner-only”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“read-modify-write”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Third-review behaviors: read-modify-write under the writer lock (external edits survive an API write), the contained credentials/reference-updated fan-out (a broken observer never fails a committed write), and the YAML document editor's isolation between en...”；固定提交中扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 183 行；扫描到的声明包括 `writeCredentials`、`tempDir`、`boot`；扫描到的测试主题包括 “read-modify-write”、“folds an unobserved external edit into a write instead of overwriting it”、“keeps both refs when two providers write the same document concurrently”、“creates the credentials directory owner-only”、“holds every writer of the document to the record-mutation lock wait”、“contained update fan-out”；源码顶部原注释（英文，仅作回查线索）：Third-review behaviors: read-modify-write under the writer lock (external edits survive an API write), the contained credentials/reference-updated fan-out (a broken observer never fails a committed write), and the YAML document editor's isolation between en...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials-local/tests/watcher.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/watcher.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“watcher”写出可重复运行的断言，覆盖的场景包括“watcher pipeline”、“clamps the write-settle poll interval for a zero debounce”、“survives a watcher error and keeps publishing later edits”、“keeps the last good snapshot when the file turns unreadable at runtime”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“watcher pipeline”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writeCredentials`、`FakeWatcher`、`fakeInstances`、`tempDir`、`boot`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 272 行；扫描到的声明包括 `writeCredentials`、`FakeWatcher`、`fakeInstances`、`tempDir`、`boot`；扫描到的测试主题包括 “watcher pipeline”、“clamps the write-settle poll interval for a zero debounce”、“survives a watcher error and keeps publishing later edits”、“keeps the last good snapshot when the file turns unreadable at runtime”、“keeps the last good snapshot when the read fails after its permission check”、“keeps the reload queue alive after an invariant violation escapes the fan-out”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/credentials/credentials` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition for the credential-reference capability seam (ctx.credentials). Settings and composition files carry *references* to secrets — environment-variable names — while providers own the actual values and their storage. Consumers resolve a refer...”；固定提交中扫描到的声明包括 `credentialRef`、`isCredentialRefName`、`isCredentialKeySegment`、`credentialKey`、`parseCredentialKey`；本地静态 import 图显示它直接依赖 2 个源文件，并被 30 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/README.md)、[packages/credentials/credentials/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/web-search-round.e2e.ts)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)
- 对应测试：[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/web-search-round.e2e.ts)、[packages/credentials/authorization/tests/authorization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/authorization.spec.ts)、[packages/credentials/authorization/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/invariant.spec.ts)、[packages/credentials/credentials-local/tests/drain.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/drain.spec.ts)、[packages/credentials/credentials-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/local.spec.ts)、[packages/credentials/credentials-local/tests/migration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/tests/migration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)、[packages/credentials/authorization/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/tests/memory.ts)
- 阅读顺序：先读 `packages/credentials/credentials/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/web-search-round.e2e.ts`、`packages/credentials/authorization/src/index.ts`、`packages/credentials/authorization/tests/authorization.spec.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/web-search-round.e2e.ts`、`packages/credentials/authorization/tests/authorization.spec.ts`、`packages/credentials/authorization/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 323 行；扫描到的声明包括 `credentialRef`、`isCredentialRefName`、`isCredentialKeySegment`、`credentialKey`、`parseCredentialKey`、`credentialKeyScope`、`credentialKeyId`、`ResolvedCredential`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the credential-reference capability seam (ctx.credentials). Settings and composition files carry *references* to secrets — environment-variable names — while providers own the actual values and their storage. Consumers resolve a refer...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/invariant.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/credentials/credentials` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-credentials. @module @deepseek-ai/dsh-credentials/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/credentials/credentials/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/invariant.spec.ts)
- 对应测试：[packages/credentials/credentials/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/credentials/credentials/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/memory.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/credentials/credentials/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/credentials/credentials/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-credentials. @module @deepseek-ai/dsh-credentials/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/types.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 `packages/credentials/credentials` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Client-safe type surface of the credential seam: the two key brands, the stored-record union, and the seam's Cordis event declarations. Types only — no runtime code, and nothing here reaches a Host-only symbol, so a Client compilation face reads exactly the...”；固定提交中扫描到的声明包括 `CredentialRef`、`CredentialKey`、`ApiKeyRecord`、`GrantRecord`、`CredentialRecord`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/index.ts)、[packages/credentials/authorization/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/web-search-round.e2e.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/credentials/credentials/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/remotes/src/client/index.ts`、`packages/api/remotes/src/index.ts`、`packages/credentials/authorization/src/types.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/web-search-round.e2e.ts`、`examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `CredentialRef`、`CredentialKey`、`ApiKeyRecord`、`GrantRecord`、`CredentialRecord`；源码顶部原注释（英文，仅作回查线索）：Client-safe type surface of the credential seam: the two key brands, the stored-record union, and the seam's Cordis event declarations. Types only — no runtime code, and nothing here reaches a Host-only symbol, so a Client compilation face reads exactly the...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials/tests/credentials.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/credentials.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“credentials”写出可重复运行的断言，覆盖的场景包括“credentialRef”、“brands POSIX shell identifiers”、“rejects every other shape”、“isCredentialKeySegment”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“credentialRef”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `boot`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/credentials/credentials/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/memory.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/credentials/credentials/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/memory.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `boot`；扫描到的测试主题包括 “credentialRef”、“brands POSIX shell identifiers”、“rejects every other shape”、“isCredentialKeySegment”、“answers whether credentialKey would accept the segment”、“the credentials seam through the memory provider”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/invariant.spec.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“invariant”写出可重复运行的断言，覆盖的场景包括“credentials invariant companion”、“accepts a committed change emitted by a live service”、“fails an update event emitted without a live service”、“reserves the package name against duplicate registration”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“credentials invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/credentials/credentials/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/invariant.ts)、[packages/credentials/credentials/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/memory.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/credentials/credentials/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/memory.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials/src/index.ts`、`packages/credentials/credentials/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 37 行；扫描到的测试主题包括 “credentials invariant companion”、“accepts a committed change emitted by a live service”、“fails an update event emitted without a live service”、“reserves the package name against duplicate registration”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/credentials/credentials/tests/memory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/memory.ts)

- 所属层：packages/credentials：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“memory”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `MemoryCredentials`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/credentials/credentials/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/credentials/credentials/tests/credentials.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/credentials.spec.ts)、[packages/credentials/credentials/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/invariant.spec.ts)
- 对应测试：[packages/credentials/credentials/tests/credentials.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/credentials.spec.ts)、[packages/credentials/credentials/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/credentials/credentials/tests/credentials.spec.ts`、`packages/credentials/credentials/tests/invariant.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `MemoryCredentials`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
