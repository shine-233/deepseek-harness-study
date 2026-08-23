# 源文件索引：packages/test-support

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 47 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/test-support/acp-snapshot（10 条）、packages/test-support/agent-loop-testkit（3 条）、packages/test-support/client-runtime（14 条）、packages/test-support/llm-mock-server（8 条）、packages/test-support/llm-replay（3 条）、packages/test-support/loader-smoke（9 条）。

## packages/test-support/acp-snapshot

### [packages/test-support/acp-snapshot/src/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/harness.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“harness”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Shared subprocess harness for ACP snapshot suites. A library module driven by the suite factory in ./suite.ts (and directly by harness-level specs); each example's *.snapshot.ts names its own agent-under-test paths. It boots the REAL agent bin subprocess vi...”；固定提交中扫描到的声明包括 `InputStep`、`InputScript`、`PermissionAnswer`、`HarvestedLog`、`RunResult`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/acp-snapshot/src/launcher.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/launcher.ts)、[packages/test-support/acp-snapshot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/index.ts)、[packages/test-support/acp-snapshot/src/suite.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/suite.ts)、[packages/test-support/acp-snapshot/tests/harness.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/harness.spec.ts)
- 对应测试：[packages/test-support/acp-snapshot/tests/harness.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/harness.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/test-support/acp-snapshot/tests/harness.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 784 行；扫描到的声明包括 `InputStep`、`InputScript`、`PermissionAnswer`、`HarvestedLog`、`RunResult`、`RunOptions`、`snapshotSpillRoot`、`runScenario`；源码顶部原注释（英文，仅作回查线索）：Shared subprocess harness for ACP snapshot suites. A library module driven by the suite factory in ./suite.ts (and directly by harness-level specs); each example's *.snapshot.ts names its own agent-under-test paths. It boots the REAL agent bin subprocess vi...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/index.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/test-support/acp-snapshot` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“ACP snapshot suite kit — the shared machinery behind the keyless snapshot tier (pnpm run test:snapshot). Four layers, composable per example: the shared subprocess/client launcher (launchAcpTestAgent), the scripted scenario harness (runScenario), the pure e...”；本地静态 import 图显示它直接依赖 4 个源文件，并被 14 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/acp-snapshot/src/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/harness.ts)、[packages/test-support/acp-snapshot/src/launcher.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/launcher.ts)、[packages/test-support/acp-snapshot/src/normalize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/normalize.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)
- 对应测试：[examples/acp-agent/tests/acp.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/acp.e2e.ts)、[examples/acp-agent/tests/acp.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/acp.snapshot.ts)、[examples/acp-agent/tests/escalation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/escalation.e2e.ts)、[examples/acp-agent/tests/goal.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/goal.snapshot.ts)、[examples/acp-agent/tests/hooks.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/hooks.e2e.ts)、[examples/headless-agent/tests/headless.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/headless.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[examples/acp-agent/tests/cleanup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/cleanup.ts)
- 阅读顺序：先读 `packages/test-support/acp-snapshot/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/scaffold.ts`、`examples/acp-agent/tests/acp.e2e.ts`、`examples/acp-agent/tests/acp.snapshot.ts` 看它怎样约束运行时，最后对照 `examples/acp-agent/tests/acp.e2e.ts`、`examples/acp-agent/tests/acp.snapshot.ts`、`examples/acp-agent/tests/escalation.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 55 行；源码顶部原注释（英文，仅作回查线索）：ACP snapshot suite kit — the shared machinery behind the keyless snapshot tier (pnpm run test:snapshot). Four layers, composable per example: the shared subprocess/client launcher (launchAcpTestAgent), the scripted scenario harness (runScenario), the pure e...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/invariant.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/test-support/acp-snapshot` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-acp-snapshot. @module @deepseek-ai/dsh-acp-snapshot/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-acp-snapshot. @module @deepseek-ai/dsh-acp-snapshot/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/src/launcher.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/launcher.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“launcher”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Shared launcher for ACP tests that drive an agent subprocess over JSON-RPC stdio. It owns source-or-built launch resolution, workspace environment, stdout tee, SDK client, update collection, permission fallback, and process shutdown so e2e and snapshot suit...”；固定提交中扫描到的声明包括 `AgentUnderTest`、`AcpTestLaunchOptions`、`LaunchedAcpTestAgent`、`launchAcpTestAgent`、`waitForExit`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)、[packages/test-support/acp-snapshot/src/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/harness.ts)、[packages/test-support/acp-snapshot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/index.ts)、[packages/test-support/acp-snapshot/tests/harness.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/harness.spec.ts)
- 对应测试：[packages/test-support/acp-snapshot/tests/harness.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/harness.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/test-support/acp-snapshot/tests/harness.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 300 行；扫描到的声明包括 `AgentUnderTest`、`AcpTestLaunchOptions`、`LaunchedAcpTestAgent`、`launchAcpTestAgent`、`waitForExit`、`exitMarkerWithinGrace`、`isRunning`；源码顶部原注释（英文，仅作回查线索）：Shared launcher for ACP tests that drive an agent subprocess over JSON-RPC stdio. It owns source-or-built launch resolution, workspace environment, stdout tee, SDK client, update collection, permission fallback, and process shutdown so e2e and snapshot suit...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/src/normalize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/normalize.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“normalize”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Pure ACP transcript and session-log normalizers. They scrub session ids, run cwd, RPC ids, timestamps and hook duration while preserving event payloads. Request-header scrubbers stay composable so one scenario per header class can pin prompt and tool-schema...”；固定提交中扫描到的声明包括 `extractSnapshotSpillPaths`、`NormalizeContext`、`CwdPathMode`、`NormalizeOptions`、`tokenizeSessionFixtureCwd`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/acp-snapshot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/index.ts)、[packages/test-support/acp-snapshot/src/suite.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/suite.ts)、[packages/test-support/acp-snapshot/tests/normalize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/normalize.spec.ts)
- 对应测试：[packages/test-support/acp-snapshot/tests/normalize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/normalize.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/test-support/acp-snapshot/tests/normalize.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 449 行；扫描到的声明包括 `extractSnapshotSpillPaths`、`NormalizeContext`、`CwdPathMode`、`NormalizeOptions`、`tokenizeSessionFixtureCwd`、`normalizeStdout`、`normalizeSessionLog`、`normalizeSessionSnapshot`；源码顶部原注释（英文，仅作回查线索）：Pure ACP transcript and session-log normalizers. They scrub session ids, run cwd, RPC ids, timestamps and hook duration while preserving event payloads. Request-header scrubbers stay composable so one scenario per header class can pin prompt and tool-schema...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/src/suite.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/suite.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“suite”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Keyless-by-default ACP snapshot suite factory. Each scenario drives the real subprocess and compares normalized stdout; comparable session fixtures are both replay input and expected output. Record mode refreshes reproducible model scenarios from the live A...”；固定提交中扫描到的声明包括 `Scenario`、`scenarioSkipped`、`stdoutExpectedVariants`、`SnapshotSuiteOptions`、`SharedSnapshotClaim`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/core/session/src/surface.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/surface.ts)、[packages/test-support/acp-snapshot/src/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/harness.ts)、[packages/test-support/acp-snapshot/src/normalize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/normalize.ts)、[packages/test-support/acp-snapshot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/index.ts)
- 对应测试：[packages/test-support/acp-snapshot/tests/suite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/suite.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/test-support/acp-snapshot/tests/suite.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 1600 行；扫描到的声明包括 `Scenario`、`scenarioSkipped`、`stdoutExpectedVariants`、`SnapshotSuiteOptions`、`SharedSnapshotClaim`、`NamedSnapshotContent`、`claimSharedSnapshot`、`assertUniqueSnapshotContents`；扫描到的测试主题包括 “snapshot fixtures”、“every scenario directory is registered (no orphans)”、“every registered scenario has its required fixture files”、“exactly one scenario pins the request-header content of each header class”、“every pinning fixture composes one tokenized header sequence with its referenced sidecars”、“stores each distinct prompt and tool-schema snapshot once”；源码顶部原注释（英文，仅作回查线索）：Keyless-by-default ACP snapshot suite factory. Each scenario drives the real subprocess and compares normalized stdout; comparable session fixtures are both replay input and expected output. Record mode refreshes reproducible model scenarios from the live A...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/tests/fixtures/fake-acp-agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/fixtures/fake-acp-agent.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为智能体提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Scripted fake ACP agent bin for dsh-acp-snapshot's unit specs. Speaks newline-delimited JSON-RPC on stdio like the real dsh-acp-agent bin, but every behavior — how prompts settle, whether session/new rejects, which session logs get persisted, what filesyste...”；固定提交中扫描到的声明包括 `send`、`respond`、`respondError`、`chunk`、`instantiate`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 283 行；扫描到的声明包括 `send`、`respond`、`respondError`、`chunk`、`instantiate`、`persistParkedTurnStart`、`clearParkedTurnStart`、`handlePrompt`；源码顶部原注释（英文，仅作回查线索）：Scripted fake ACP agent bin for dsh-acp-snapshot's unit specs. Speaks newline-delimited JSON-RPC on stdio like the real dsh-acp-agent bin, but every behavior — how prompts settle, whether session/new rejects, which session logs get persisted, what filesyste...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/tests/harness.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/harness.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“harness”写出可重复运行的断言，覆盖的场景包括“keeps scenario-owned snapshot spill root length stable across platforms”、“runScenario”、“surfaces an asynchronous child spawn failure through startup and close”、“centralizes ACP boot, captures, updates, fail-closed permissions, and shutdown”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“keeps scenario-owned snapshot spill root length stable across platforms”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `scenario`、`environmentEcho`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/acp-snapshot/src/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/harness.ts)、[packages/test-support/acp-snapshot/src/launcher.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/launcher.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/acp-snapshot/src/harness.ts`、`packages/test-support/acp-snapshot/src/launcher.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1230 行；扫描到的声明包括 `scenario`、`environmentEcho`；扫描到的测试主题包括 “keeps scenario-owned snapshot spill root length stable across platforms”、“runScenario”、“surfaces an asynchronous child spawn failure through startup and close”、“centralizes ACP boot, captures, updates, fail-closed permissions, and shutdown”、“waits for inherited stdio and buffered ACP parsing after the parent exits”、“rejects promptly when fallback termination is refused”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/tests/normalize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/normalize.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查规范化的具体场景，包括“normalizeStdout”、“rewrites JSON-RPC ids to a stable first-seen sequence”、“scrubs the cwd and session id anywhere they appear”、“scrubs cwd at file URI and chained-punctuation boundaries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“normalizeStdout”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/acp-snapshot/src/normalize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/normalize.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/acp-snapshot/src/normalize.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 711 行；扫描到的测试主题包括 “normalizeStdout”、“rewrites JSON-RPC ids to a stable first-seen sequence”、“scrubs the cwd and session id anywhere they appear”、“scrubs cwd at file URI and chained-punctuation boundaries”、“scrubs every filesystem spelling of the cwd longest-first”、“canonicalizes only cwd-rooted path separators”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/acp-snapshot/tests/suite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/tests/suite.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“suite”写出可重复运行的断言，覆盖的场景包括“defineAcpSnapshotSuite: replay mode”、“defineAcpSnapshotSuite: record mode”、“defineAcpSnapshotSuite: refresh mode”、“defineAcpSnapshotSuite: refresh write-back”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“defineAcpSnapshotSuite: replay mode”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stabilize`、`staleRefreshFixtures`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/acp-snapshot/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/README.md)、[packages/test-support/acp-snapshot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/index.ts)、[packages/test-support/acp-snapshot/src/suite.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/acp-snapshot/src/suite.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/acp-snapshot/src/index.ts`、`packages/test-support/acp-snapshot/src/suite.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1339 行；扫描到的声明包括 `stabilize`、`staleRefreshFixtures`；扫描到的测试主题包括 “defineAcpSnapshotSuite: replay mode”、“defineAcpSnapshotSuite: record mode”、“defineAcpSnapshotSuite: refresh mode”、“defineAcpSnapshotSuite: refresh write-back”、“rewrites stdout and comparable logs from a replay-mode child run”、“defineAcpSnapshotSuite: record inventory write-back”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/test-support/agent-loop-testkit

### [packages/test-support/agent-loop-testkit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/src/index.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared mounting for the services required before tests load the concrete agent loop. The caller retains ownership of the context, loop, adapters, optional plugins, and teardown. @module @deepseek-ai/dsh-agent-loop-testkit”；固定提交中扫描到的声明包括 `AgentLoopTestDependenciesOptions`、`mountAgentLoopTestDependencies`；本地静态 import 图显示它直接依赖 6 个源文件，并被 39 个源文件直接引用。
- 直接协作者：[packages/test-support/agent-loop-testkit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[examples/headless-agent/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/harness.ts)
- 对应测试：[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/compaction/compaction-basic/tests/manual-compaction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/manual-compaction.spec.ts)、[packages/context/time-context/tests/time-context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/time-context/tests/time-context.spec.ts)、[packages/experimental/agent-team/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/persistence.spec.ts)、[packages/experimental/agent-team/tests/team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/agent-team/tests/team.spec.ts)、[packages/experimental/tool-agent-team/tests/tool-team.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/experimental/tool-agent-team/tests/tool-team.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先读 `packages/test-support/agent-loop-testkit/README.md`、入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/harness.ts`、`packages/acp/acp/tests/harness.ts`、`packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts` 看它怎样约束运行时，最后对照 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/compaction/compaction-basic/tests/manual-compaction.spec.ts`、`packages/context/time-context/tests/time-context.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 46 行；扫描到的声明包括 `AgentLoopTestDependenciesOptions`、`mountAgentLoopTestDependencies`；源码顶部原注释（英文，仅作回查线索）：Shared mounting for the services required before tests load the concrete agent loop. The caller retains ownership of the context, loop, adapters, optional plugins, and teardown. @module @deepseek-ai/dsh-agent-loop-testkit。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/agent-loop-testkit/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/src/invariant.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-agent-loop-testkit. @module @deepseek-ai/dsh-agent-loop-testkit/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/agent-loop-testkit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-agent-loop-testkit. @module @deepseek-ai/dsh-agent-loop-testkit/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/agent-loop-testkit/tests/agent-loop-testkit.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/tests/agent-loop-testkit.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“dsh-agent-loop-testkit”、“mounts a configurable prerequisite spine that can activate AgentLoop”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-agent-loop-testkit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/agent-loop-testkit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/test-support/agent-loop-testkit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/agent-loop-testkit/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/test-support/agent-loop-testkit/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的测试主题包括 “dsh-agent-loop-testkit”、“mounts a configurable prerequisite spine that can activate AgentLoop”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/test-support/client-runtime

### [packages/test-support/client-runtime/src/fixtures.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/fixtures.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“fixtures”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Session/workspace fixture shapes and snapshot defaults for the test runtime.”；固定提交中扫描到的声明包括 `SessionBehaviorOverrides`、`Stabilizer`、`SessionFixture`、`conversationSnapshot`、`workspaceListState`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)、[packages/test-support/client-runtime/src/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/sessions.ts)、[packages/test-support/client-runtime/src/workspaces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/workspaces.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `SessionBehaviorOverrides`、`Stabilizer`、`SessionFixture`、`conversationSnapshot`、`workspaceListState`；源码顶部原注释（英文，仅作回查线索）：Session/workspace fixture shapes and snapshot defaults for the test runtime.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、运行时相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“jsdom slot test runtime: a real small runtime — Cordis Context, the runtime SlotRegistry, and the UI renderer — assembled around test-owned session/workspace doubles, so feature specs exercise declaration, registration, scope, store, inject, rendering, upda...”；固定提交中扫描到的声明包括 `bindSnapshotSelector`、`createSlotRenderer`、`SlotView`、`FeatureHandle`、`TestRoot`；本地静态 import 图显示它直接依赖 14 个源文件，并被 89 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-renderer/src/client/bind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/bind.ts)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/test-support/client-runtime/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 405 行；扫描到的声明包括 `bindSnapshotSelector`、`createSlotRenderer`、`SlotView`、`FeatureHandle`、`TestRoot`、`SlotTestRuntime`、`OwnerPropsCell`；源码顶部原注释（英文，仅作回查线索）：jsdom slot test runtime: a real small runtime — Cordis Context, the runtime SlotRegistry, and the UI renderer — assembled around test-owned session/workspace doubles, so feature specs exercise declaration, registration, scope, store, inject, rendering, upda...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/invariant.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、运行时必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-test-runtime. @module @deepseek-ai/dsh-client-test-runtime/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/test-support/client-runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/invariant.client.spec.ts)
- 对应测试：[packages/test-support/client-runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/test-support/client-runtime/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/test-support/client-runtime/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-test-runtime. @module @deepseek-ai/dsh-client-test-runtime/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/locale-env.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/locale-env.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、运行时、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Browser-language pin for specs that assert localized copy. A fresh LocaleRuntime with no stored preference opens in the language navigator asks for, and jsdom reports the runner's own (en-US) — so a spec asserting the product's Chinese copy states the brows...”；固定提交中扫描到的声明包括 `usePinnedBrowserLanguages`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/test-support/client-runtime/src/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `usePinnedBrowserLanguages`；源码顶部原注释（英文，仅作回查线索）：Browser-language pin for specs that assert localized copy. A fresh LocaleRuntime with no stored preference opens in the language navigator asks for, and jsdom reports the runner's own (en-US) — so a spec asserting the product's Chinese copy states the brows...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/remote.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/remote.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“remote”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test-owned Remote face: $on subscriptions driven by the internal forwarded-event plumbing.”；固定提交中扫描到的声明包括 `TestRemote`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)、[packages/test-support/client-runtime/tests/remote.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/remote.client.spec.ts)
- 对应测试：[packages/test-support/client-runtime/tests/remote.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/remote.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/test-support/client-runtime/tests/remote.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的声明包括 `TestRemote`；源码顶部原注释（英文，仅作回查线索）：Test-owned Remote face: $on subscriptions driven by the internal forwarded-event plumbing.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/sessions.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Test-owned sessions face: the SlotRegistry host contract over declarative fixtures.”；固定提交中扫描到的声明包括 `FixtureSession`、`TestSessionBinding`、`TestSessions`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-slots/src/index.ts` 和 `packages/test-support/client-runtime/src/index.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 526 行；扫描到的声明包括 `FixtureSession`、`TestSessionBinding`、`TestSessions`；源码顶部原注释（英文，仅作回查线索）：Test-owned sessions face: the SlotRegistry host contract over declarative fixtures.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/settings-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/settings-scope.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“settings-scope”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test double for the client settings-scope seam.”；固定提交中扫描到的声明包括 `StubSettingsScope`、`stubSettingsScope`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)、[packages/test-support/client-runtime/tests/runtime.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/runtime.client.spec.tsx)
- 对应测试：[packages/test-support/client-runtime/tests/runtime.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/runtime.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/test-support/client-runtime/tests/runtime.client.spec.tsx`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `StubSettingsScope`、`stubSettingsScope`；源码顶部原注释（英文，仅作回查线索）：Test double for the client settings-scope seam.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/snapshot.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“snapshot”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“DOM snapshot hygiene: a vitest snapshot serializer that keeps .snap files structural. Two normalizations, both on a clone (the live DOM is untouched, so class/tag queries keep working): - CSS-module scoped class names (_frame_334d2d, this repo's _local_hash...”；固定提交中扫描到的声明包括 `domSnapshotSerializer`、`registerDomSnapshotSerializer`、`normalizeClassValue`、`fingerprint`、`svgsOf`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `domSnapshotSerializer`、`registerDomSnapshotSerializer`、`normalizeClassValue`、`fingerprint`、`svgsOf`、`needsNormalization`；源码顶部原注释（英文，仅作回查线索）：DOM snapshot hygiene: a vitest snapshot serializer that keeps .snap files structural. Two normalizations, both on a clone (the live DOM is untouched, so class/tag queries keep working): - CSS-module scoped class names (_frame_334d2d, this repo's _local_hash...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/translate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/translate.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：协议翻译
- 这个文件有什么用：它在两种浏览器端、运行时、协议翻译表示之间做明确转换，让供应商、协议或错误格式差异停留在边界。
- 为什么这样设计：把两种表示的差异限制在翻译函数内，核心逻辑不必分支处理供应商字段；翻译规则也可以用成对输入输出单独测试。
- 文件级设计证据：源码顶部注释把它定位为“Test double of the locale lookup chain: a translate stub over plain dictionaries, mirroring LocaleRuntime's resolution order (first dictionary that owns the key wins, then the key itself stays visible) and its {name} template interpolation. Specs stub the f...”；固定提交中扫描到的声明包括 `makeTranslate`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/test-support/client-runtime/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `makeTranslate`；源码顶部原注释（英文，仅作回查线索）：Test double of the locale lookup chain: a translate stub over plain dictionaries, mirroring LocaleRuntime's resolution order (first dictionary that owns the key wins, then the key itself stays visible) and its {name} template interpolation. Specs stub the f...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/src/workspaces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/workspaces.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“workspaces”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test-owned workspaces face: the renderer standard-kit observable plus recorded actions.”；固定提交中扫描到的声明包括 `TestWorkspaces`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/test-support/client-runtime/src/fixtures.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/fixtures.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 215 行；扫描到的声明包括 `TestWorkspaces`；源码顶部原注释（英文，仅作回查线索）：Test-owned workspaces face: the renderer standard-kit observable plus recorded actions.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/invariant.client.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/test-support/client-runtime/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/invariant.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/runtime-diagnostics/invariants/src/index.ts`、`packages/test-support/client-runtime/src/invariant.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/tests/remote.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/remote.client.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、远程调用的具体场景，包括“TestRemote”、“delivers a forwarded event to its subscribers and stops after disposal”、“drops a forwarded event nobody subscribed to”、“refuses $mount, which needs the real Client Remote service”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TestRemote”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“TestRemote's own contract: subscription and disposal, dispatch driven by the internal plumbing event, the silent drop for an unsubscribed name, and the $mount refusal that sends a spec to the real Client Remote service.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/test-support/client-runtime/src/remote.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/remote.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/client-runtime/src/remote.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 43 行；扫描到的测试主题包括 “TestRemote”、“delivers a forwarded event to its subscribers and stops after disposal”、“drops a forwarded event nobody subscribed to”、“refuses $mount, which needs the real Client Remote service”；源码顶部原注释（英文，仅作回查线索）：TestRemote's own contract: subscription and disposal, dispatch driven by the internal plumbing event, the silent drop for an unsubscribed name, and the $mount refusal that sends a spec to the real Client Remote service.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/tests/runtime.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tests/runtime.client.spec.tsx)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“root declaration and rendering”、“renders declared slots through the real renderer: fallback, then a live registration, t...”、“fails loud when rendering with no root declaration (production boot-order check)”、“sessions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“root declaration and rendering”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `Frame`、`runtimeWithFrame`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-slots/src/index.ts`、`packages/test-support/client-runtime/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 672 行；扫描到的声明包括 `Frame`、`runtimeWithFrame`；扫描到的测试主题包括 “root declaration and rendering”、“renders declared slots through the real renderer: fallback, then a live registration, then unload”、“fails loud when rendering with no root declaration (production boot-order check)”、“sessions”、“drives SessionProvider: empty state, current session, switch, live snapshot updates”、“add with current:false keeps the selection; unknown ids fail loud on the mutators”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/client-runtime/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/tsdown.config.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、运行时：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/client-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/test-support/client-runtime/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/test-support/llm-mock-server

### [packages/test-support/llm-mock-server/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/bin.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：程序入口
- 这个文件有什么用：它接收启动参数并把程序交给 `packages/test-support/llm-mock-server` 中的应用入口；入口保持薄，可以让同一套业务逻辑被不同宿主复用。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Standalone process wrapper for the scriptable mock LLM server. @module @deepseek-ai/dsh-llm-mock-server/src/bin”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Standalone process wrapper for the scriptable mock LLM server. @module @deepseek-ai/dsh-llm-mock-server/src/bin”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[packages/test-support/llm-mock-server/src/cli.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/cli.ts)、[packages/test-support/llm-mock-server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/test-support/llm-mock-server/README.md` 和组合清单，再读当前入口，沿着它交给的应用或所在包的入口或服务继续，最后对照启动、配置和 E2E 测试。
- 代码证据：固定提交归档实际读取结果：约 50 行；源码顶部原注释（英文，仅作回查线索）：Standalone process wrapper for the scriptable mock LLM server. @module @deepseek-ai/dsh-llm-mock-server/src/bin。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/src/cli.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/cli.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：程序入口
- 这个文件有什么用：它接收启动参数并把程序交给 `packages/test-support/llm-mock-server` 中的应用入口；入口保持薄，可以让同一套业务逻辑被不同宿主复用。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Dependency-free CLI parsing for the standalone mock LLM server. @module @deepseek-ai/dsh-llm-mock-server/cli”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Dependency-free CLI parsing for the standalone mock LLM server. @module @deepseek-ai/dsh-llm-mock-server/cli”；固定提交中扫描到的声明包括 `CONNECTION_REFUSED_BEHAVIOR`、`MockLlmCliConfig`、`MockLlmCliParseResult`、`MOCK_LLM_CLI_USAGE`、`parseMockLlmCliArgs`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[packages/test-support/llm-mock-server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/index.ts)、[packages/test-support/llm-mock-server/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/bin.ts)、[packages/test-support/llm-mock-server/tests/cli.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/cli.spec.ts)
- 对应测试：[packages/test-support/llm-mock-server/tests/cli.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/cli.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/test-support/llm-mock-server/README.md` 和组合清单，再读当前入口，沿着它交给的应用或 `packages/test-support/llm-mock-server/src/bin.ts`、`packages/test-support/llm-mock-server/tests/cli.spec.ts` 继续，最后对照启动、配置和 E2E 测试。
- 代码证据：固定提交归档实际读取结果：约 213 行；扫描到的声明包括 `CONNECTION_REFUSED_BEHAVIOR`、`MockLlmCliConfig`、`MockLlmCliParseResult`、`MOCK_LLM_CLI_USAGE`、`parseMockLlmCliArgs`、`numberValue`、`boundedIntegerValue`、`parseSequence`；源码顶部原注释（英文，仅作回查线索）：Dependency-free CLI parsing for the standalone mock LLM server. @module @deepseek-ai/dsh-llm-mock-server/cli。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/index.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Scriptable OpenAI-compatible HTTP/SSE server for transport, protocol, and semantic-empty LLM recovery tests. Each accepted chat-completions request consumes one behavior; the server never retries or interprets harness policy. @module @deepseek-ai/dsh-llm-mo...”；固定提交中扫描到的声明包括 `MOCK_LLM_BEHAVIORS`、`MockLlmBehavior`、`ConcreteMockLlmBehavior`、`MockLlmRandomWeights`、`DEFAULT_MOCK_LLM_RANDOM_WEIGHTS`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/built-bin.e2e.ts)、[packages/llm/llm-retry/tests/transport-recovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/transport-recovery.spec.ts)、[packages/test-support/llm-mock-server/src/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/bin.ts)
- 对应测试：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/built-bin.e2e.ts)、[packages/llm/llm-retry/tests/transport-recovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/transport-recovery.spec.ts)、[packages/test-support/llm-mock-server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/server.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/test-support/llm-mock-server/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/built-bin.e2e.ts`、`packages/llm/llm-retry/tests/transport-recovery.spec.ts`、`packages/test-support/llm-mock-server/src/bin.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/built-bin.e2e.ts`、`packages/llm/llm-retry/tests/transport-recovery.spec.ts`、`packages/test-support/llm-mock-server/tests/server.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 738 行；扫描到的声明包括 `MOCK_LLM_BEHAVIORS`、`MockLlmBehavior`、`ConcreteMockLlmBehavior`、`MockLlmRandomWeights`、`DEFAULT_MOCK_LLM_RANDOM_WEIGHTS`、`MAX_MOCK_LLM_TIMER_DELAY_MS`、`MockLlmRequestOutcome`、`MockLlmServerEvent`；源码顶部原注释（英文，仅作回查线索）：Scriptable OpenAI-compatible HTTP/SSE server for transport, protocol, and semantic-empty LLM recovery tests. Each accepted chat-completions request consumes one behavior; the server never retries or interprets harness policy. @module @deepseek-ai/dsh-llm-mo...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/invariant.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-llm-mock-server. @module @deepseek-ai/dsh-llm-mock-server/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/test-support/llm-mock-server/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/invariant.spec.ts)
- 对应测试：[packages/test-support/llm-mock-server/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/test-support/llm-mock-server/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/test-support/llm-mock-server/tests/invariant.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-llm-mock-server. @module @deepseek-ai/dsh-llm-mock-server/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/tests/cli.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/cli.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“mock LLM server CLI parser”、“returns help without requiring a sequence”、“parses every request and listener option”、“uses standalone defaults for an ordinary sequence”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mock LLM server CLI parser”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[packages/test-support/llm-mock-server/src/cli.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/cli.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/llm-mock-server/src/cli.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的测试主题包括 “mock LLM server CLI parser”、“returns help without requiring a sequence”、“parses every request and listener option”、“uses standalone defaults for an ordinary sequence”、“uses the default unavailable interval”、“parses a reproducible weighted random profile”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/invariant.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“mock LLM server invariant companion”、“registers its explained empty runtime invariant”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mock LLM server invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[packages/test-support/llm-mock-server/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/invariant.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/runtime-diagnostics/invariants/src/index.ts`、`packages/test-support/llm-mock-server/src/invariant.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的测试主题包括 “mock LLM server invariant companion”、“registers its explained empty runtime invariant”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/tests/server.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tests/server.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“mock LLM server wire behaviors”、“streams a complete text response and captures the request”、“supports root paths and intentionally ignores telemetry observer failures”、“holds a stalled stream until the client aborts and server close remains idempotent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mock LLM server wire behaviors”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `start`、`chat`、`rawChat`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)、[packages/test-support/llm-mock-server/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/llm-mock-server/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 359 行；扫描到的声明包括 `start`、`chat`、`rawChat`；扫描到的测试主题包括 “mock LLM server wire behaviors”、“streams a complete text response and captures the request”、“supports root paths and intentionally ignores telemetry observer failures”、“holds a stalled stream until the client aborts and server close remains idempotent”、“preserves UTF-8 code points split across request chunks”、“formats an IPv6 listener as a valid base URL”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-mock-server/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/tsdown.config.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理大语言模型：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-mock-server/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-mock-server/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/test-support/llm-mock-server/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 13 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/test-support/llm-replay

### [packages/test-support/llm-replay/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/src/index.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Keyless snapshot-test LLM replay. It derives one model-call script per recorded session from assistant/chunk events and explicitly marked local compaction calls, then binds fresh live sessions to parent/child scripts by first-call order. Throw and hang case...”；固定提交中扫描到的声明包括 `ReplayEntry`、`ReplayModelConfig`、`ReplayProviderConfig`、`ReplayConfig`、`ReplayHandle`；本地静态 import 图显示它直接依赖 4 个源文件，并被 17 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-replay/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)
- 对应测试：[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)、[apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/complex-history.perf.ts)、[apps/web/tests/goal-multi-turn-actions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/goal-multi-turn-actions.e2e.ts)、[apps/web/tests/live-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/live-interactions.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/test-support/llm-replay/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/chat-continuous-conversation.e2e.ts`、`apps/web/tests/chat-long-interactions.e2e.ts`、`apps/web/tests/chat-scroll-contract.e2e.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/chat-continuous-conversation.e2e.ts`、`apps/web/tests/chat-long-interactions.e2e.ts`、`apps/web/tests/chat-scroll-contract.e2e.ts`。
- 代码证据：固定提交归档实际读取结果：约 859 行；扫描到的声明包括 `ReplayEntry`、`ReplayModelConfig`、`ReplayProviderConfig`、`ReplayConfig`、`ReplayHandle`、`SessionScript`、`parseSessionLog`、`parseSessionHeader`；源码顶部原注释（英文，仅作回查线索）：Keyless snapshot-test LLM replay. It derives one model-call script per recorded session from assistant/chunk events and explicitly marked local compaction calls, then binds fresh live sessions to parent/child scripts by first-call order. Throw and hang case...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-replay/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/src/invariant.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-llm-replay. @module @deepseek-ai/dsh-llm-replay/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-replay/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-llm-replay. @module @deepseek-ai/dsh-llm-replay/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/llm-replay/tests/llm-replay.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/tests/llm-replay.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“parseSessionLog”、“skips the header line and parses each event”、“ignores blank lines”、“rejects non-object body rows with their source line”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseSessionLog”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `sessionJsonl`、`chunkEvent`、`writeSession`、`drain`、`writeLog`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/llm-replay/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/llm-replay/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/compaction/compaction/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1246 行；扫描到的声明包括 `sessionJsonl`、`chunkEvent`、`writeSession`、`drain`、`writeLog`、`scriptedCall`、`streamScripted`、`FallthroughAdapter`；扫描到的测试主题包括 “parseSessionLog”、“skips the header line and parses each event”、“ignores blank lines”、“rejects non-object body rows with their source line”、“expands a packed chunk row into its events (a fixture recorded with packChunks on)”、“synthesizes omitted ordinary and packed snapshot envelopes”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/test-support/loader-smoke

### [packages/test-support/loader-smoke/src/agent-turn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/agent-turn.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与智能体的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Test-only direct-agent turn driver shared by assembled Loader fixtures. @module @deepseek-ai/dsh-loader-smoke/agent-turn”；固定提交中扫描到的声明包括 `FixtureTurnResult`、`FixtureTurnOptions`、`runFixtureTurn`、`addUsage`、`assistantText`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：[packages/test-support/loader-smoke/tests/agent-turn.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/agent-turn.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/test-support/loader-smoke/README.md` 和入口，再读当前实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/test-support/loader-smoke/src/index.ts`、`packages/test-support/loader-smoke/tests/agent-turn.spec.ts` 确认输入输出，最后对照 `packages/test-support/loader-smoke/tests/agent-turn.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `FixtureTurnResult`、`FixtureTurnOptions`、`runFixtureTurn`、`addUsage`、`assistantText`、`onlyRootAgent`；源码顶部原注释（英文，仅作回查线索）：Test-only direct-agent turn driver shared by assembled Loader fixtures. @module @deepseek-ai/dsh-loader-smoke/agent-turn。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/test-support/loader-smoke` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Shared subprocess harness for keyless example smokes that boot a real cordis.yml through an app bin and Cordis Loader. It also owns the mode-aware launch resolver every example subprocess harness shares (resolveExampleLaunch): booting an example bin from Ty...”；固定提交中扫描到的声明包括 `LOADER_SMOKE_TEST_TIMEOUT_MS`、`ExampleMode`、`EXAMPLE_MODE_ENV`、`resolveExampleMode`、`ExampleLaunchOptions`；本地静态 import 图显示它直接依赖 1 个源文件，并被 30 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)、[packages/test-support/loader-smoke/src/agent-turn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/agent-turn.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[examples/acp-agent/tests/fixtures/subagent/subagent-acp/driver.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/acp-agent/tests/fixtures/subagent/subagent-acp/driver.ts)
- 对应测试：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[examples/headless-agent/tests/headless.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/headless.snapshot.ts)、[examples/headless-agent/tests/keyless-smoke.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/keyless-smoke.e2e.ts)、[examples/headless-agent/tests/real-model.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/real-model.e2e.ts)、[examples/headless-agent/tests/semantic-checkpoint.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/semantic-checkpoint.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/test-support/loader-smoke/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`examples/acp-agent/tests/fixtures/subagent/subagent-acp/driver.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`examples/headless-agent/tests/headless.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 212 行；扫描到的声明包括 `LOADER_SMOKE_TEST_TIMEOUT_MS`、`ExampleMode`、`EXAMPLE_MODE_ENV`、`resolveExampleMode`、`ExampleLaunchOptions`、`ExampleLaunch`、`resolveExampleLaunch`、`LoaderSmokeOptions`；源码顶部原注释（英文，仅作回查线索）：Shared subprocess harness for keyless example smokes that boot a real cordis.yml through an app bin and Cordis Loader. It also owns the mode-aware launch resolver every example subprocess harness shares (resolveExampleLaunch): booting an example bin from Ty...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/invariant.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/test-support/loader-smoke` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-loader-smoke. @module @deepseek-ai/dsh-loader-smoke/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-loader-smoke. @module @deepseek-ai/dsh-loader-smoke/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/tests/agent-turn.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/agent-turn.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“runFixtureTurn”、“observes only the owned interval and returns its final text and deduplicated usage”、“omits usage when the interval records none”、“always removes its listener when the turn fails”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runFixtureTurn”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `turnHarness`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/test-support/loader-smoke/src/agent-turn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/agent-turn.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/test-support/loader-smoke/src/agent-turn.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `turnHarness`；扫描到的测试主题包括 “runFixtureTurn”、“observes only the owned interval and returns its final text and deduplicated usage”、“omits usage when the interval records none”、“always removes its listener when the turn fails”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/tests/example-launch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/example-launch.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查示例的具体场景，包括“resolveExampleMode”、“defaults absent/empty/src to src”、“accepts lib”、“throws on any other value”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveExampleMode”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的测试主题包括 “resolveExampleMode”、“defaults absent/empty/src to src”、“accepts lib”、“throws on any other value”、“reads the environment when no argument is given”、“resolveExampleLaunch”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/tests/fixtures/fail.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/fixtures/fail.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为同包测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Non-zero subprocess fixture for the Loader-smoke harness.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 4 行；源码顶部原注释（英文，仅作回查线索）：Non-zero subprocess fixture for the Loader-smoke harness.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/tests/fixtures/hang.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/fixtures/hang.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为同包测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Deadline subprocess fixture for the Loader-smoke harness.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 4 行；源码顶部原注释（英文，仅作回查线索）：Deadline subprocess fixture for the Loader-smoke harness.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/tests/fixtures/success.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/fixtures/success.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为同包测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Successful subprocess fixture for the Loader-smoke harness.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 17 行；源码顶部原注释（英文，仅作回查线索）：Successful subprocess fixture for the Loader-smoke harness.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/test-support/loader-smoke/tests/loader-smoke.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/tests/loader-smoke.spec.ts)

- 所属层：packages/test-support：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“loader-smoke”写出可重复运行的断言，覆盖的场景包括“runLoaderSmoke”、“isolates the process, closes stdin, captures output, and removes the cwd”、“passes an arbitrary bin argv and inspects world state before cleanup”、“rejects a non-zero exit with captured diagnostics”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runLoaderSmoke”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/test-support/loader-smoke/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/README.md)、[packages/test-support/loader-smoke/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/loader-smoke/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/test-support/loader-smoke/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 117 行；扫描到的测试主题包括 “runLoaderSmoke”、“isolates the process, closes stdin, captures output, and removes the cwd”、“passes an arbitrary bin argv and inspects world state before cleanup”、“rejects a non-zero exit with captured diagnostics”、“accepts a declared expected failure exit and rejects any other outcome”、“kills a process at its deadline and reports captured output”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
