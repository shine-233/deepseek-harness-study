# 源文件索引：packages/examples

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 18 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/examples/acp-demo/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/src/bin.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：程序入口
- 这个文件有什么用：它接收启动参数并把程序交给 `packages/examples/acp-demo` 中的应用入口；入口保持薄，可以让同一套业务逻辑被不同宿主复用。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Boot an ACP stdio server from cordis.yml; usage is dsh-acp-demo --config path, defaulting to ./cordis.yml. Shared env loading, Loader guards, snapshot config selection, and settled-tree boot live in dsh-app-boot. Replay skips .env and selects sibling cordis...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Boot an ACP stdio server from cordis.yml; usage is dsh-acp-demo --config path, defaulting to ./cordis.yml. Shared env loading, Loader guards, snapshot config selection, and settled-tree boot live in dsh-app-boot. Replay skips .env and selects sibling cordis...”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)
- 对应测试：[packages/examples/acp-demo/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/built-bin.e2e.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先读 `packages/examples/acp-demo/README.md` 和组合清单，再读当前入口，沿着它交给的应用或所在包的入口或服务继续，最后对照启动、配置和 E2E 测试。
- 代码证据：固定提交归档实际读取结果：约 35 行；源码顶部原注释（英文，仅作回查线索）：Boot an ACP stdio server from cordis.yml; usage is dsh-acp-demo --config path, defaulting to ./cordis.yml. Shared env loading, Loader guards, snapshot config selection, and settled-tree boot live in dsh-app-boot. Replay skips .env and selects sibling cordis...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/acp-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/src/index.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把示例相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“The ACP automation server app: the default agent spine (@deepseek-ai/dsh-agent-spine-demo), JSONL session persistence, and the @deepseek-ai/dsh-acp bridge. The app owns those plugins through one ordered lifecycle so ACP sessions quiesce before persistence d...”；固定提交中扫描到的声明包括 `name`、`Config`、`apply`；本地静态 import 图显示它直接依赖 9 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)、[packages/acp/acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/index.ts)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)
- 对应测试：[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/examples/acp-demo/README.md`、入口和消费者，再读当前契约，沿着 `packages/examples/acp-demo/tests/acp-agent.spec.ts` 看它怎样约束运行时，最后对照 `packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 141 行；扫描到的声明包括 `name`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：The ACP automation server app: the default agent spine (@deepseek-ai/dsh-agent-spine-demo), JSONL session persistence, and the @deepseek-ai/dsh-acp bridge. The app owns those plugins through one ordered lifecycle so ACP sessions quiesce before persistence d...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/acp-demo/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/src/invariant.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查示例必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-acp-demo. @module @deepseek-ai/dsh-acp-demo/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-acp-demo. @module @deepseek-ai/dsh-acp-demo/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例、智能体的具体场景，包括“dsh-acp-demo composition”、“brings up the spine + persistence + the ACP bridge”、“can explicitly omit the persisted-goal stack”、“defaults the persistence root when omitted”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-acp-demo composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mount`、`isolatedSkillsConfig`、`composePrefix`、`withIsolatedSkillHomes`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 277 行；扫描到的声明包括 `mount`、`isolatedSkillsConfig`、`composePrefix`、`withIsolatedSkillHomes`；扫描到的测试主题包括 “dsh-acp-demo composition”、“brings up the spine + persistence + the ACP bridge”、“can explicitly omit the persisted-goal stack”、“defaults the persistence root when omitted”、“forwards explicit project-instruction controls to the bundled spine”、“uses default skill config when apply is called directly without skills”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/acp-demo/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/built-bin.e2e.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例的具体场景，包括“boots the published bin, completes a turn, and writes default Zstandard persistence”、“fails LOUD (non-zero exit + stderr) on a config whose directory does not exist”、“fails LOUD (non-zero exit + stderr) on a missing config file in a real directory”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“boots the published bin, completes a turn, and writes default Zstandard persistence”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `pkgName`、`link`、`makeConsumer`、`runBinExpectingExit`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 231 行；扫描到的声明包括 `pkgName`、`link`、`makeConsumer`、`runBinExpectingExit`；扫描到的测试主题包括 “boots the published bin, completes a turn, and writes default Zstandard persistence”、“fails LOUD (non-zero exit + stderr) on a config whose directory does not exist”、“fails LOUD (non-zero exit + stderr) on a missing config file in a real directory”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/acp-demo/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/load-path.e2e.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例、路径的具体场景，包括“dsh-acp-demo real-load-path smoke (bin + Loader, keyless)”、“boots via its bin and exposes only fresh text sessions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-acp-demo real-load-path smoke (bin + Loader, keyless)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `boot`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `boot`；扫描到的测试主题包括 “dsh-acp-demo real-load-path smoke (bin + Loader, keyless)”、“boots via its bin and exposes only fresh text sessions”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/acp-demo/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tsdown.config.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理示例：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/acp-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/examples/acp-demo/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 19 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/agent-spine-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/src/index.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把示例、智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Default executor-less, UI-less agent spine. It bundles the common services, background-job registry and controls, optional persisted goals, concrete loop, local skill and agent-instructions providers, and model-facing shell/skill consumers; deployments stil...”；固定提交中扫描到的声明包括 `name`、`SkillConfig`、`GoalConfig`、`Config`、`SkillConfigSchema`；本地静态 import 图显示它直接依赖 28 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/examples/agent-spine-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/README.md)、[packages/context/agent-instructions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/src/index.ts)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/invariant.ts)、[packages/examples/acp-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/src/index.ts)
- 对应测试：[packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sdk/server/tests/plugin-apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/plugin-apply.spec.ts)、[packages/sdk/server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/sdk/server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/examples/agent-spine-demo/README.md`、入口和消费者，再读当前契约，沿着 `packages/examples/acp-demo/src/index.ts`、`packages/examples/agent-spine-demo/tests/agent-core.spec.ts`、`packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts` 看它怎样约束运行时，最后对照 `packages/examples/agent-spine-demo/tests/agent-core.spec.ts`、`packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts`、`packages/sdk/server/tests/plugin-apply.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 265 行；扫描到的声明包括 `name`、`SkillConfig`、`GoalConfig`、`Config`、`SkillConfigSchema`、`SessionTitleConfigSchema`、`ToolBashConfigSchema`、`JobsConfigSchema`；源码顶部原注释（英文，仅作回查线索）：Default executor-less, UI-less agent spine. It bundles the common services, background-job registry and controls, optional persisted goals, concrete loop, local skill and agent-instructions providers, and model-facing shell/skill consumers; deployments stil...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/agent-spine-demo/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/src/invariant.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查示例、智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-agent-spine-demo. @module @deepseek-ai/dsh-agent-spine-demo/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/agent-spine-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-agent-spine-demo. @module @deepseek-ai/dsh-agent-spine-demo/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/agent-spine-demo/tests/agent-core.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/agent-core.spec.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例、智能体的具体场景，包括“dsh-agent-spine-demo bundle”、“brings up the full default spine”、“forwards configurable fallback title limits to the bundled service”、“opts into the configured persisted-goal domain, tools, and same-session driver”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-agent-spine-demo bundle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `composePrefix`、`mount`、`withIsolatedSkillHomes`、`waitForIdle`、`messageText`；本地静态 import 图显示它直接依赖 16 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/agent-spine-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/README.md)、[packages/core/agent-loop/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/invariant.ts)、[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/invariant.ts`、`packages/core/agent/src/index.ts`、`packages/core/agent/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 841 行；扫描到的声明包括 `composePrefix`、`mount`、`withIsolatedSkillHomes`、`waitForIdle`、`messageText`、`TransientOnceAdapter`；扫描到的测试主题包括 “dsh-agent-spine-demo bundle”、“brings up the full default spine”、“forwards configurable fallback title limits to the bundled service”、“opts into the configured persisted-goal domain, tools, and same-session driver”、“accepts an explicit false goal composition without mounting it”、“mounts package companions and forwards invariant selection config”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例、智能体的具体场景，包括“gen-config-catalog classification”、“classifies an apply plugin with a config parameter and extracts the paste”、“classifies a default service class, reading its constructor and static inject”、“classifies an abstract default class as a seam”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“gen-config-catalog classification”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Negative-path tests for the config catalog generator (scripts/gen-config-catalog.ts).”；固定提交中扫描到的声明包括 `Config`、`inject`、`apply`、`Fix`、`Mode`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/agent-spine-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/README.md)、[scripts/gen-config-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-config-catalog.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `scripts/gen-config-catalog.ts`、`vendor/cordis/src/index.ts`、`vendor/schemastery/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 468 行；扫描到的声明包括 `Config`、`inject`、`apply`、`Fix`、`Mode`、`Caps`、`Leaf`、`writePkg`；扫描到的测试主题包括 “gen-config-catalog classification”、“classifies an apply plugin with a config parameter and extracts the paste”、“classifies a default service class, reading its constructor and static inject”、“classifies an abstract default class as a seam”、“classifies a plugin whose apply takes no config as no-config”、“classifies a module with neither default export nor apply as a library”；源码顶部原注释（英文，仅作回查线索）：Negative-path tests for the config catalog generator (scripts/gen-config-catalog.ts).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例、智能体、沙箱的具体场景，包括“one-context multi-project sandbox”、“confines concurrent filesystem writes to each calling session workspace”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“one-context multi-project sandbox”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `projectDir`、`expectMissing`、`resultText`、`agents`；本地静态 import 图显示它直接依赖 14 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/agent-spine-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/native/landlock-run/packages/entry/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `native/landlock-run/packages/entry/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `projectDir`、`expectMissing`、`resultText`、`agents`；扫描到的测试主题包括 “one-context multi-project sandbox”、“confines concurrent filesystem writes to each calling session workspace”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/jsonrpc-demo/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/bin.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：程序入口
- 这个文件有什么用：它接收启动参数并把程序交给 `packages/examples/jsonrpc-demo` 中的应用入口；入口保持薄，可以让同一套业务逻辑被不同宿主复用。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Generic JSON-RPC agent bin. External configurations own their bare plugin packages; the packaged runtime uses packaged-bin.ts instead. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/bin”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Generic JSON-RPC agent bin. External configurations own their bare plugin packages; the packaged runtime uses packaged-bin.ts instead. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/bin”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/jsonrpc-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/README.md)、[packages/examples/jsonrpc-demo/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/runner.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/examples/jsonrpc-demo/README.md` 和组合清单，再读当前入口，沿着它交给的应用或所在包的入口或服务继续，最后对照启动、配置和 E2E 测试。
- 代码证据：固定提交归档实际读取结果：约 11 行；源码顶部原注释（英文，仅作回查线索）：Generic JSON-RPC agent bin. External configurations own their bare plugin packages; the packaged runtime uses packaged-bin.ts instead. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/bin。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/jsonrpc-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/index.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把示例相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Bin-only app package: its generic and packaged entries discover an external cordis.yml and own process exit. This module exports no composition plugin; the config chooses whether to load the @deepseek-ai/dsh-sdk-jsonrpc-server serving plugin. @module @deeps...”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/jsonrpc-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/examples/jsonrpc-demo/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Bin-only app package: its generic and packaged entries discover an external cordis.yml and own process exit. This module exports no composition plugin; the config chooses whether to load the @deepseek-ai/dsh-sdk-jsonrpc-server serving plugin. @module @deeps...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/jsonrpc-demo/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/invariant.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查示例必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-sdk-jsonrpc-demo. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/jsonrpc-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-sdk-jsonrpc-demo. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/jsonrpc-demo/src/packaged-bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/packaged-bin.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：打包 JSON-RPC 示例入口
- 这个文件有什么用：它把 JSON-RPC 示例连接到打包后的 CLI 可执行入口，用于验证发布产物仍能被外部进程启动和调用。
- 为什么这样设计：示例如果只 import 源代码，无法证明发布后的可执行入口仍然可用；单独保留打包进程入口，让 JSON-RPC 示例覆盖真实产物和外部进程边界。
- 文件级设计证据：源码顶部注释把它定位为“Closed-runtime JSON-RPC agent bin. Bare plugins resolve from the installed runtime closure while relative plugins remain configuration-relative. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/packaged-bin”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/jsonrpc-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/README.md)、[packages/examples/jsonrpc-demo/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/runner.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/examples/jsonrpc-demo/README.md` 和入口，再读当前实现，沿着 `packages/examples/jsonrpc-demo/src/runner.ts` 和所在包的入口或服务确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 12 行；源码顶部原注释（英文，仅作回查线索）：Closed-runtime JSON-RPC agent bin. Bare plugins resolve from the installed runtime closure while relative plugins remain configuration-relative. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/packaged-bin。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/jsonrpc-demo/src/runner.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/runner.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：运行驱动
- 这个文件有什么用：它推进示例、运行驱动的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。
- 为什么这样设计：运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。
- 文件级设计证据：源码顶部注释把它定位为“Shared process lifecycle for the generic and closed-runtime JSON-RPC bins. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/runner”；固定提交中扫描到的声明包括 `runJsonrpcAgent`、`disposeAndExit`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/examples/jsonrpc-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)、[packages/examples/jsonrpc-demo/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/bin.ts)、[packages/examples/jsonrpc-demo/src/packaged-bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/src/packaged-bin.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/examples/jsonrpc-demo/README.md` 和入口，再读当前实现，沿着 `packages/boot/app-boot/src/index.ts` 和 `packages/examples/jsonrpc-demo/src/bin.ts`、`packages/examples/jsonrpc-demo/src/packaged-bin.ts` 确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 55 行；扫描到的声明包括 `runJsonrpcAgent`、`disposeAndExit`；源码顶部原注释（英文，仅作回查线索）：Shared process lifecycle for the generic and closed-runtime JSON-RPC bins. @module @deepseek-ai/dsh-sdk-jsonrpc-demo/runner。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/examples/jsonrpc-demo/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/tsdown.config.ts)

- 所属层：packages/examples：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理示例：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/examples/jsonrpc-demo/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/jsonrpc-demo/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/examples/jsonrpc-demo/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 21 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
