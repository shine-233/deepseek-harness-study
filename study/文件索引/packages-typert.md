# 源文件索引：packages/typert

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 44 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/typert/generator（29 条）、packages/typert/loader（3 条）、packages/typert/protocol（5 条）、packages/typert/registry（7 条）。

## packages/typert/generator

### [packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型代码生成实现
- 这个文件有什么用：这个文件把类型模型、Cordis catalog 或 schema 生成成可消费的代码和元数据，保持生成结果与源模型一致。
- 为什么这样设计：类型模型是源事实，生成器负责把它投影成代码和 catalog；生成层独立后可以单测输出稳定性而不影响运行时 loader。
- 文件级设计证据：源码顶部注释把它定位为“TypeScript project analyzer for the compiler-independent Typert model. Programs, symbols, and syntax nodes remain extraction-only implementation details; callers receive only the model declared in ./model.ts. @module @deepseek-ai/dsh-typert-generator/analyzer”；固定提交中扫描到的声明包括 `TypertAnalysisError`、`AnalysisMode`、`WorkspaceAnalyzerOptions`、`DiscoveredTypertPackage`、`ParsedConfig`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)、[packages/typert/generator/src/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/workspace.ts)
- 对应测试：[packages/typert/generator/tests/remote-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/remote-model.spec.ts)、[packages/typert/generator/tests/tools-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tools-catalog.spec.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先读 `packages/typert/generator/README.md` 和入口，再读当前实现，沿着 `packages/typert/generator/src/model.ts` 和 `packages/typert/generator/src/cordis-catalog.ts`、`packages/typert/generator/src/index.ts`、`packages/typert/generator/src/workspace.ts` 确认输入输出，最后对照 `packages/typert/generator/tests/remote-model.spec.ts`、`packages/typert/generator/tests/tools-catalog.spec.ts`、`packages/typert/generator/tests/type-model.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 3113 行；扫描到的声明包括 `TypertAnalysisError`、`AnalysisMode`、`WorkspaceAnalyzerOptions`、`DiscoveredTypertPackage`、`ParsedConfig`、`PackageRegistration`、`WorkspaceCaches`、`WorkspaceAnalyzer`；源码顶部原注释（英文，仅作回查线索）：TypeScript project analyzer for the compiler-independent Typert model. Programs, symbols, and syntax nodes remain extraction-only implementation details; callers receive only the model declared in ./model.ts. @module @deepseek-ai/dsh-typert-generator/analyzer。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型代码生成实现
- 这个文件有什么用：这个文件把类型模型、Cordis catalog 或 schema 生成成可消费的代码和元数据，保持生成结果与源模型一致。
- 为什么这样设计：类型模型是源事实，生成器负责把它投影成代码和 catalog；生成层独立后可以单测输出稳定性而不影响运行时 loader。
- 文件级设计证据：源码顶部注释把它定位为“Cordis catalog-specific projection over the compiler-independent Typert model. This module owns Cordis validation and text projection mechanics; callers supply repository-specific type classifications and inherited data. @module @deepseek-ai/dsh-typert-gene...”；固定提交中扫描到的声明包括 `EventEntry`、`ServiceMethodEntry`、`ServiceEntry`、`InheritedEntry`、`CordisCatalogPolicy`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/renderer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/renderer.ts)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)
- 对应测试：[packages/typert/generator/tests/cordis-catalog-contract.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog-contract.spec.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/typert/generator/README.md` 和入口，再读当前实现，沿着 `packages/typert/generator/src/analyzer.ts`、`packages/typert/generator/src/model.ts`、`packages/typert/generator/src/renderer.ts` 和 `packages/typert/generator/src/index.ts`、`packages/typert/generator/tests/cordis-catalog-contract.spec.ts`、`packages/typert/generator/tests/cordis-catalog.spec.ts` 确认输入输出，最后对照 `packages/typert/generator/tests/cordis-catalog-contract.spec.ts`、`packages/typert/generator/tests/cordis-catalog.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 1065 行；扫描到的声明包括 `EventEntry`、`ServiceMethodEntry`、`ServiceEntry`、`InheritedEntry`、`CordisCatalogPolicy`、`CordisCatalogModel`、`CordisCatalogProjector`、`projectCordisCatalog`；源码顶部原注释（英文，仅作回查线索）：Cordis catalog-specific projection over the compiler-independent Typert model. This module owns Cordis validation and text projection mechanics; callers supply repository-specific type classifications and inherited data. @module @deepseek-ai/dsh-typert-gene...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型代码生成实现
- 这个文件有什么用：这个文件把类型模型、Cordis catalog 或 schema 生成成可消费的代码和元数据，保持生成结果与源模型一致。
- 为什么这样设计：类型模型是源事实，生成器负责把它投影成代码和 catalog；生成层独立后可以单测输出稳定性而不影响运行时 loader。
- 文件级设计证据：源码顶部注释把它定位为“Model-driven Typert artifact emitter. It consumes only FaceModel and TypeGraph data; TypeScript compiler nodes are not part of this boundary. @module @deepseek-ai/dsh-typert-generator/emitter”；固定提交中扫描到的声明包括 `TypertEmitError`、`ModelEmitResult`、`RemoteModelEmitResult`、`FaceModelEmitter`、`remoteDeclarationSource`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/renderer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/renderer.ts)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)、[packages/typert/generator/src/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/workspace.ts)
- 对应测试：[packages/typert/generator/tests/schema-emitter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/schema-emitter.spec.ts)、[packages/typert/generator/tests/tools-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tools-catalog.spec.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先读 `packages/typert/generator/README.md` 和入口，再读当前实现，沿着 `packages/typert/generator/src/model.ts`、`packages/typert/generator/src/renderer.ts` 和 `packages/typert/generator/src/index.ts`、`packages/typert/generator/src/workspace.ts`、`packages/typert/generator/tests/schema-emitter.spec.ts` 确认输入输出，最后对照 `packages/typert/generator/tests/schema-emitter.spec.ts`、`packages/typert/generator/tests/tools-catalog.spec.ts`、`packages/typert/generator/tests/type-model.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 934 行；扫描到的声明包括 `TypertEmitError`、`ModelEmitResult`、`RemoteModelEmitResult`、`FaceModelEmitter`、`remoteDeclarationSource`、`uniqueNamespaces`、`remoteNamespaceInterface`、`SchemaEmitter`；源码顶部原注释（英文，仅作回查线索）：Model-driven Typert artifact emitter. It consumes only FaceModel and TypeGraph data; TypeScript compiler nodes are not part of this boundary. @module @deepseek-ai/dsh-typert-generator/emitter。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/typert/generator` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Public API of the Typert analyzer, compiler-independent model, and model-driven artifact emitters. Build wiring lives in the ./tsdown subpath. @module @deepseek-ai/dsh-typert-generator”；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)、[packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)、[scripts/gen-cordis-catalog-partition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-partition.spec.ts)、[scripts/gen-cordis-catalog-record.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog-record.spec.ts)、[scripts/gen-doc-graphs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-doc-graphs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/typert/generator/README.md`、入口和消费者，再读当前契约，沿着 `scripts/gen-cordis-catalog.ts`、`scripts/gen-cordis-inspect-catalog.ts`、`scripts/gen-doc-graphs.ts` 看它怎样约束运行时，最后对照 `packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts`、`packages/typert/generator/tests/cordis-catalog.spec.ts`、`scripts/gen-cordis-catalog-partition.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 16 行；源码顶部原注释（英文，仅作回查线索）：Public API of the Typert analyzer, compiler-independent model, and model-driven artifact emitters. Build wiring lives in the ./tsdown subpath. @module @deepseek-ai/dsh-typert-generator。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/invariant.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/typert/generator` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-typert-generator. @module @deepseek-ai/dsh-typert-generator/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-typert-generator. @module @deepseek-ai/dsh-typert-generator/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型代码生成实现
- 这个文件有什么用：这个文件把类型模型、Cordis catalog 或 schema 生成成可消费的代码和元数据，保持生成结果与源模型一致。
- 为什么这样设计：类型模型是源事实，生成器负责把它投影成代码和 catalog；生成层独立后可以单测输出稳定性而不影响运行时 loader。
- 文件级设计证据：源码顶部注释把它定位为“Compiler-independent Typert analysis model. TypeScript nodes and checker objects are extraction inputs only; emitters consume this graph. @module @deepseek-ai/dsh-typert-generator/model”；固定提交中扫描到的声明包括 `TypertFace`、`TypeNodeId`、`SymbolId`、`KeywordTypeName`、`TypeOperatorName`；本地静态 import 图显示它直接依赖 0 个源文件，并被 11 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)
- 对应测试：[packages/typert/generator/tests/remote-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/remote-model.spec.ts)、[packages/typert/generator/tests/renderer.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/renderer.spec.ts)、[packages/typert/generator/tests/schema-emitter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/schema-emitter.spec.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先读 `packages/typert/generator/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/typert/generator/src/analyzer.ts`、`packages/typert/generator/src/cordis-catalog.ts`、`packages/typert/generator/src/emitter.ts` 确认输入输出，最后对照 `packages/typert/generator/tests/remote-model.spec.ts`、`packages/typert/generator/tests/renderer.spec.ts`、`packages/typert/generator/tests/schema-emitter.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 437 行；扫描到的声明包括 `TypertFace`、`TypeNodeId`、`SymbolId`、`KeywordTypeName`、`TypeOperatorName`、`SourceLocation`、`ExportModel`、`JsDocTagModel`；源码顶部原注释（英文，仅作回查线索）：Compiler-independent Typert analysis model. TypeScript nodes and checker objects are extraction inputs only; emitters consume this graph. @module @deepseek-ai/dsh-typert-generator/model。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/renderer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/renderer.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把渲染器转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 文件级设计证据：源码顶部注释把它定位为“Rendering and traversal over the compiler-independent TypeGraph. Emitters use this module instead of reaching back into TypeScript AST nodes. @module @deepseek-ai/dsh-typert-generator/renderer”；固定提交中扫描到的声明包括 `TypeGraphRenderError`、`TypeGraphRenderer`、`nodeSignatures`、`needsArrayParentheses`、`renderPropertyName`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)
- 对应测试：[packages/typert/generator/tests/renderer.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/renderer.spec.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/typert/generator/src/cordis-catalog.ts`、`packages/typert/generator/src/emitter.ts`、`packages/typert/generator/src/index.ts` 确认状态如何进入 UI，最后对照 `packages/typert/generator/tests/renderer.spec.ts`、`packages/typert/generator/tests/type-model.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 365 行；扫描到的声明包括 `TypeGraphRenderError`、`TypeGraphRenderer`、`nodeSignatures`、`needsArrayParentheses`、`renderPropertyName`、`quote`、`escapeTemplate`、`assertNever`；源码顶部原注释（英文，仅作回查线索）：Rendering and traversal over the compiler-independent TypeGraph. Emitters use this module instead of reaching back into TypeScript AST nodes. @module @deepseek-ai/dsh-typert-generator/renderer。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/tsdown-plugin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/tsdown-plugin.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：扩展钩子
- 这个文件有什么用：这个文件在既有流程的指定位置接入额外行为。钩子让新功能不必复制整个主流程，同时保留卸载和组合能力。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：源码顶部注释把它定位为“Optional tsdown (rolldown) plugin face of the typert generator. It lowers standard decorators in TypeScript dependencies before bundling, then emits model-driven face artifacts at the package output root. Packages without a Typert or Remote export are skipp...”；固定提交中扫描到的声明包括 `TypertPluginOptions`、`typertPlugin`、`emitWorkspace`、`emitArtifacts`、`readManifest`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/workspace.ts)、[packages/typert/generator/tests/tsdown-plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tsdown-plugin.spec.ts)
- 对应测试：[packages/typert/generator/tests/tsdown-plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tsdown-plugin.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/typert/generator/README.md` 和入口，再读当前实现，沿着 `packages/typert/generator/src/model.ts`、`packages/typert/generator/src/workspace.ts` 和 `packages/typert/generator/tests/tsdown-plugin.spec.ts` 确认输入输出，最后对照 `packages/typert/generator/tests/tsdown-plugin.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 157 行；扫描到的声明包括 `TypertPluginOptions`、`typertPlugin`、`emitWorkspace`、`emitArtifacts`、`readManifest`、`hasTypertExport`、`packageRoot`、`workspaceRoot`；源码顶部原注释（英文，仅作回查线索）：Optional tsdown (rolldown) plugin face of the typert generator. It lowers standard decorators in TypeScript dependencies before bundling, then emits model-driven face artifacts at the package output root. Packages without a Typert or Remote export are skipp...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/src/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/workspace.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型代码生成实现
- 这个文件有什么用：这个文件把类型模型、Cordis catalog 或 schema 生成成可消费的代码和元数据，保持生成结果与源模型一致。
- 为什么这样设计：类型模型是源事实，生成器负责把它投影成代码和 catalog；生成层独立后可以单测输出稳定性而不影响运行时 loader。
- 文件级设计证据：源码顶部注释把它定位为“Workspace-level discovery and model-driven Typert generation. @module @deepseek-ai/dsh-typert-generator/workspace”；固定提交中扫描到的声明包括 `WorkspaceEmitResult`、`WorkspaceTypertGenerator`、`sameExport`；本地静态 import 图显示它直接依赖 3 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/index.ts)
- 对应测试：[packages/typert/generator/tests/remote-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/remote-model.spec.ts)、[packages/typert/generator/tests/tsdown-plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tsdown-plugin.spec.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先读 `packages/typert/generator/README.md` 和入口，再读当前实现，沿着 `packages/typert/generator/src/analyzer.ts`、`packages/typert/generator/src/emitter.ts`、`packages/typert/generator/src/model.ts` 和 `packages/typert/generator/src/index.ts`、`packages/typert/generator/src/tsdown-plugin.ts`、`packages/typert/generator/tests/remote-model.spec.ts` 确认输入输出，最后对照 `packages/typert/generator/tests/remote-model.spec.ts`、`packages/typert/generator/tests/tsdown-plugin.spec.ts`、`packages/typert/generator/tests/type-model.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `WorkspaceEmitResult`、`WorkspaceTypertGenerator`、`sameExport`；源码顶部原注释（英文，仅作回查线索）：Workspace-level discovery and model-driven Typert generation. @module @deepseek-ai/dsh-typert-generator/workspace。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/.generated-model-O7FJNT/host.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/.generated-model-O7FJNT/host.mjs)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“host”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Generated by @deepseek-ai/dsh-typert-generator from FaceModel — do not edit.”；固定提交中扫描到的声明包括 `Payload`、`TYPERT`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 310 行；扫描到的声明包括 `Payload`、`TYPERT`；扫描到的测试主题包括 “Runtime-validating data root.”；源码顶部原注释（英文，仅作回查线索）：Generated by @deepseek-ai/dsh-typert-generator from FaceModel — do not edit.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/.generated-model-qwn8sk/host.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/.generated-model-qwn8sk/host.mjs)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“host”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Generated by @deepseek-ai/dsh-typert-generator from FaceModel — do not edit.”；固定提交中扫描到的声明包括 `Payload`、`TYPERT`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 310 行；扫描到的声明包括 `Payload`、`TYPERT`；扫描到的测试主题包括 “Runtime-validating data root.”；源码顶部原注释（英文，仅作回查线索）：Generated by @deepseek-ai/dsh-typert-generator from FaceModel — do not edit.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/cordis-catalog-contract.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog-contract.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架的具体场景，包括“extracts a well-formed event with its @mode and JSDoc”、“classifies a trailing-next signature as a waterfall”、“accepts a parallel (awaited, no next) event by trusting the tag”、“accepts linked, foundation, generic-parameter, and explicitly exempt signature types”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“extracts a well-formed event with its @mode and JSDoc”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Model-extraction and negative-path contracts for the Cordis catalog generator (scripts/gen-cordis-catalog.ts).”；固定提交中扫描到的声明包括 `FixService`、`collectEvents`、`collectServices`、`renderEvents`、`renderServices`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/cordis-catalog.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 343 行；扫描到的声明包括 `FixService`、`collectEvents`、`collectServices`、`renderEvents`、`renderServices`、`writeProject`、`fixtureRoot`、`serviceFixtureRoot`；扫描到的测试主题包括 “extracts a well-formed event with its @mode and JSDoc”、“classifies a trailing-next signature as a waterfall”、“accepts a parallel (awaited, no next) event by trusting the tag”、“accepts linked, foundation, generic-parameter, and explicitly exempt signature types”、“aggregates every unclassified signature type with its source and remediation”、“hard-errors when an event is missing its @mode tag”；源码顶部原注释（英文，仅作回查线索）：Model-extraction and negative-path contracts for the Cordis catalog generator (scripts/gen-cordis-catalog.ts).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/cordis-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/cordis-catalog.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Cordis 插件框架的具体场景，包括“Typert-backed Cordis catalog”、“omits subsystem source lines while preserving inherited Cordis source lines”、“reproduces every committed catalog artifact byte for byte”、“resolves each key to the declaration a caller meets, and drops keys no plugin provides”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Typert-backed Cordis catalog”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/cordis-catalog.ts)、[scripts/gen-cordis-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/gen-cordis-catalog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/cordis-catalog.ts`、`scripts/gen-cordis-catalog.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的测试主题包括 “Typert-backed Cordis catalog”、“omits subsystem source lines while preserving inherited Cordis source lines”、“reproduces every committed catalog artifact byte for byte”、“resolves each key to the declaration a caller meets, and drops keys no plugin provides”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为远程调用、领域模型提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `Agent`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/types.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 19 行；扫描到的声明包括 `Agent`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/types.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为远程调用、领域模型提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Stable Agent identity crossing the Remote boundary.”；固定提交中扫描到的声明包括 `AgentId`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 2 行；扫描到的声明包括 `AgentId`；源码顶部原注释（英文，仅作回查线索）：Stable Agent identity crossing the Remote boundary.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为远程调用提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `GoalService`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/domain/src/index.ts)、[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `GoalService`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为远程调用提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Input accepted by Goal creation.”；固定提交中扫描到的声明包括 `CreateGoalRequest`、`CreateGoalResult`、`RenameGoalRequest`、`RenameGoalResult`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/index.ts)、[packages/typert/generator/tests/remote-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/remote-model.spec.ts)
- 对应测试：[packages/typert/generator/tests/remote-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/remote-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/typert/generator/tests/remote-model.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `CreateGoalRequest`、`CreateGoalResult`、`RenameGoalRequest`、`RenameGoalResult`；源码顶部原注释（英文，仅作回查线索）：Input accepted by Goal creation.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/remote-model/typert-protocol.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/typert-protocol.d.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为远程调用、协议提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `TypertLookup`、`TypertContext`、`TypertLookupMap`、`TypertContextMap`、`TypertRemoteMap`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `TypertLookup`、`TypertContext`、`TypertLookupMap`、`TypertContextMap`、`TypertRemoteMap`、`TypertRemoteScopeMap`、`RemoteFailure`、`RemoteResult`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/type-model/cordis.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/cordis.d.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为 Cordis 插件框架提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `Service`、`Context`、`Events`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 7 行；扫描到的声明包括 `Service`、`Context`、`Events`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/type-model/packages/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/client/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为浏览器端提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `ClientAgent`、`ClientView`、`ClientBridge`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 39 行；扫描到的声明包括 `ClientAgent`、`ClientView`、`ClientBridge`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为服务端宿主提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `Agent`、`DemoService`、`AliasedService`、`DefaultOnlyService`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/client/src/index.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 对应测试：[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/typert/generator/tests/type-model.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 143 行；扫描到的声明包括 `Agent`、`DemoService`、`AliasedService`、`DefaultOnlyService`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为服务端宿主提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Generic source form retained before conditional evaluation.”；固定提交中扫描到的声明包括 `Box`、`Present`、`Flags`、`Entity`、`AgentPhase`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 对应测试：[packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/typert/generator/tests/type-model.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `Box`、`Present`、`Flags`、`Entity`、`AgentPhase`、`Payload`、`Callable`、`Variance`；源码顶部原注释（英文，仅作回查线索）：Generic source form retained before conditional evaluation.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/fixtures/type-model/packages/write/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/write/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为同包测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `WritableService`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的声明包括 `WritableService`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/remote-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/remote-model.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查远程调用的具体场景，包括“Remote model generation”、“discovers a Remote-only package and emits strict direct and Context descriptors”、“projects authored optionality and absence onto consumers and codecs”、“evaluates declaration-merged mapped and conditional boundaries for codecs without widen...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Remote model generation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `Json`、`GenericRemoteMap`、`GenericRequest`、`GenericResult`、`Box`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/workspace.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/remote-model/packages/remote/src/types.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/analyzer.ts`、`packages/typert/generator/src/model.ts`、`packages/typert/generator/src/workspace.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 765 行；扫描到的声明包括 `Json`、`GenericRemoteMap`、`GenericRequest`、`GenericResult`、`Box`、`BoxPayload`、`RemainingSchema`、`ClientMarker`；扫描到的测试主题包括 “Remote model generation”、“discovers a Remote-only package and emits strict direct and Context descriptors”、“projects authored optionality and absence onto consumers and codecs”、“evaluates declaration-merged mapped and conditional boundaries for codecs without widening consumer types”、“imports public type arguments nested under a named generic boundary”、“quotes aliased methods in generated namespace interfaces”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/renderer.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/renderer.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查渲染器的具体场景，包括“TypeGraphRenderer defensive and optional shapes”、“enumerates direct child edges for every type node kind”、“renders optional source shapes and traverses every optional closure edge”、“fails loudly for every broken graph edge and impossible discriminant”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TypeGraphRenderer defensive and optional shapes”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `keyword`、`property`、`declaration`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)、[packages/typert/generator/src/renderer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/renderer.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/model.ts`、`packages/typert/generator/src/renderer.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 198 行；扫描到的声明包括 `keyword`、`property`、`declaration`；扫描到的测试主题包括 “TypeGraphRenderer defensive and optional shapes”、“enumerates direct child edges for every type node kind”、“renders optional source shapes and traverses every optional closure edge”、“fails loudly for every broken graph edge and impossible discriminant”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/schema-emitter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/schema-emitter.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查数据 schema的具体场景，包括“SchemaEmitter supported projection matrix”、“supports recursive declarations and inherited object shapes”、“instantiates generic aliases, nested references, defaults, and recursive declarations”、“erases unique-symbol nominal members without naming a branding utility”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SchemaEmitter supported projection matrix”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `keywordCase`、`keyword`、`signature`、`property`、`signatureMember`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/emitter.ts`、`packages/typert/generator/src/model.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 940 行；扫描到的声明包括 `keywordCase`、`keyword`、`signature`、`property`、`signatureMember`、`indexMember`、`declaration`、`emit`；扫描到的测试主题包括 “SchemaEmitter supported projection matrix”、“supports recursive declarations and inherited object shapes”、“instantiates generic aliases, nested references, defaults, and recursive declarations”、“erases unique-symbol nominal members without naming a branding utility”、“classifies every TypeNode kind and executes every supported kind”、“SchemaEmitter unsupported projection matrix”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/tools-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tools-catalog.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“model-driven dsh-tools generation”、“round-trips the complete service and event structure through the runtime registry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“model-driven dsh-tools generation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/extensions/tool-cordis/src/api-catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/extensions/tool-cordis/src/api-catalog.ts)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/extensions/tool-cordis/src/api-catalog.ts`、`packages/typert/generator/src/analyzer.ts`、`packages/typert/generator/src/emitter.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的测试主题包括 “model-driven dsh-tools generation”、“round-trips the complete service and event structure through the runtime registry”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/tsdown-plugin.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tsdown-plugin.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“tsdown-plugin”写出可重复运行的断言，覆盖的场景包括“typertPlugin”、“lowers standard decorators in TypeScript source dependencies”、“skips outputs that do not identify a Typert contributor”、“writes every generated face beside a nested package bundle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“typertPlugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `workspace`、`packageOutput`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/tsdown-plugin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/tsdown-plugin.ts)、[packages/typert/generator/src/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/workspace.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/tsdown-plugin.ts`、`packages/typert/generator/src/workspace.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 225 行；扫描到的声明包括 `workspace`、`packageOutput`；扫描到的测试主题包括 “typertPlugin”、“lowers standard decorators in TypeScript source dependencies”、“skips outputs that do not identify a Typert contributor”、“writes every generated face beside a nested package bundle”、“generates a package opted in only through its Remote export”、“removes stale Remote artifacts from a Host package without Remote output”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/generator/tests/type-model.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/type-model.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“type-model”写出可重复运行的断言，覆盖的场景包括“WorkspaceAnalyzer”、“builds independent face models with an explicit cross-face type graph”、“merges bounded package programs into the same face model”、“discovers an explicitly keyed service implementation without a Context merge”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WorkspaceAnalyzer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `normalizedPath`、`distinct`、`formatDiagnostic`、`printType`、`canonicalType`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/generator/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/README.md)、[packages/typert/generator/src/analyzer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/analyzer.ts)、[packages/typert/generator/src/emitter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/emitter.ts)、[packages/typert/generator/src/model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/src/model.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/index.ts)、[packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/fixtures/type-model/packages/host/src/models.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/generator/src/analyzer.ts`、`packages/typert/generator/src/emitter.ts`、`packages/typert/generator/src/model.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1431 行；扫描到的声明包括 `normalizedPath`、`distinct`、`formatDiagnostic`、`printType`、`canonicalType`、`copyFixture`、`configureDualRuntimeClient`、`addSameFacePackage`；扫描到的测试主题包括 “WorkspaceAnalyzer”、“builds independent face models with an explicit cross-face type graph”、“merges bounded package programs into the same face model”、“discovers an explicitly keyed service implementation without a Context merge”、“prefers an explicitly keyed implementation over its protocol Context merge”、“rejects an explicit service implementation without one valid key”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/typert/loader

### [packages/typert/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/typert/loader` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Typert Loader integration: automatic registration for mounted plugin packages. When a loader entry mounts, this plugin resolves the entry's package.json; a package exporting ./typert has its host face imported and its TYPERT manifest registered into ctx.typ...”；固定提交中扫描到的声明包括 `TYPERT_HOST_EXPORT`、`name`、`inject`、`Config`、`validateTypertManifest`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/typert/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/README.md)、[packages/typert/registry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/index.ts)、[packages/typert/registry/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/typert/loader/tests/loader.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/tests/loader.spec.ts)
- 对应测试：[packages/typert/loader/tests/loader.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/tests/loader.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/typert/loader/README.md`、入口和消费者，再读当前契约，沿着 `packages/typert/loader/tests/loader.spec.ts` 看它怎样约束运行时，最后对照 `packages/typert/loader/tests/loader.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 442 行；扫描到的声明包括 `TYPERT_HOST_EXPORT`、`name`、`inject`、`Config`、`validateTypertManifest`、`apply`、`typertExportOf`、`requireObject`；源码顶部原注释（英文，仅作回查线索）：Typert Loader integration: automatic registration for mounted plugin packages. When a loader entry mounts, this plugin resolves the entry's package.json; a package exporting ./typert has its host face imported and its TYPERT manifest registered into ctx.typ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/loader/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/src/invariant.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/typert/loader` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-typert-loader. @module @deepseek-ai/dsh-typert-loader/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-typert-loader. @module @deepseek-ai/dsh-typert-loader/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/loader/tests/loader.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/tests/loader.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“loader”写出可重复运行的断言，覆盖的场景包括“typert loader”、“registers an explicit package without a Loader entry and withdraws it with the loader”、“registers a strict invocation into the local registry and withdraws it with the loader”、“fails loud when an explicit package is absent or has no Typert export”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“typert loader”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `writePackage`、`typertSource`、`invocationTypertSource`、`boot`、`linkZod`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/README.md)、[packages/typert/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/src/index.ts)、[packages/typert/registry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/loader/src/index.ts`、`packages/typert/registry/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 693 行；扫描到的声明包括 `writePackage`、`typertSource`、`invocationTypertSource`、`boot`、`linkZod`、`mountTypertLoader`、`strictCodec`、`strictInvocation`；扫描到的测试主题包括 “typert loader”、“registers an explicit package without a Loader entry and withdraws it with the loader”、“registers a strict invocation into the local registry and withdraws it with the loader”、“fails loud when an explicit package is absent or has no Typert export”、“auto-registers a mounted package exporting ./typert and withdraws it on unmount”、“follows entries mounted after activation”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/typert/protocol

### [packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把协议相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Remote decorators and explicit Gateway bindings backed only by private module state. Strict reflection remains a Typert compiler responsibility. @module @deepseek-ai/dsh-typert-protocol”；固定提交中扫描到的声明包括 `isTypertRemoteSegment`、`TypertLookupFailure`、`TypertGatewayBindingOptions`、`TypertGatewayBinding`、`RemoteInvocationMarker`；本地静态 import 图显示它直接依赖 2 个源文件，并被 36 个源文件直接引用。
- 直接协作者：[packages/typert/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/README.md)、[packages/typert/protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/api/gateway/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/src/client/index.ts)、[packages/api/gateway/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/src/index.ts)
- 对应测试：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/tests/agent-lookup.spec.ts)、[packages/feedback/message-feedback/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/tests/loader-composition.spec.ts)、[packages/feedback/message-feedback/tests/message-feedback.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/tests/message-feedback.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/feedback/message-feedback/tests/helpers.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/tests/helpers.ts)
- 阅读顺序：先读 `packages/typert/protocol/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/gateway/src/client/index.ts`、`packages/api/gateway/src/index.ts`、`packages/api/gateway/tests/gateway.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/api/remotes/tests/agent-lookup.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 280 行；扫描到的声明包括 `isTypertRemoteSegment`、`TypertLookupFailure`、`TypertGatewayBindingOptions`、`TypertGatewayBinding`、`RemoteInvocationMarker`、`RemoteMethodMarker`、`bindTypertRemote`、`Remote`；源码顶部原注释（英文，仅作回查线索）：Remote decorators and explicit Gateway bindings backed only by private module state. Strict reflection remains a Typert compiler responsibility. @module @deepseek-ai/dsh-typert-protocol。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/protocol/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/invariant.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查协议必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-typert-protocol. @module @deepseek-ai/dsh-typert-protocol/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-typert-protocol. @module @deepseek-ai/dsh-typert-protocol/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/protocol/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/types.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述协议中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Compiler-independent Typert protocol shared by business packages, generated Remote artifacts, the Host Gateway, and Client API implementations. @module @deepseek-ai/dsh-typert-protocol/types”；固定提交中扫描到的声明包括 `TypertLookup`、`TypertLookupHost`、`TypertLookupWire`、`TypertContext`、`TypertContextWire`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/typert/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-authoring.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/agent-preset-selection.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/typert/protocol/README.md`、入口和消费者，再读当前契约，沿着 `packages/typert/protocol/src/index.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/stress-tests/reasoning-chunks.stress.ts`。
- 代码证据：固定提交归档实际读取结果：约 491 行；扫描到的声明包括 `TypertLookup`、`TypertLookupHost`、`TypertLookupWire`、`TypertContext`、`TypertContextWire`、`TypertLookupMap`、`TypertContextMap`、`TypertRemoteMap`；源码顶部原注释（英文，仅作回查线索）：Compiler-independent Typert protocol shared by business packages, generated Remote artifacts, the Host Gateway, and Client API implementations. @module @deepseek-ai/dsh-typert-protocol/types。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/protocol/tests/fixtures/source-launch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/tests/fixtures/source-launch.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为协议提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `Goals`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `Goals`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/protocol/tests/protocol.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/tests/protocol.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查协议的具体场景，包括“typert-protocol Remote declarations”、“binds a TypertRemoteService name and executes decorators through the Vitest source tran...”、“executes standard decorator syntax through the TSX source launcher”、“keeps decorator markers in private module state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“typert-protocol Remote declarations”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `Goals`、`NamespacedGoals`、`Service`、`methodContext`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/protocol/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/protocol/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 266 行；扫描到的声明包括 `Goals`、`NamespacedGoals`、`Service`、`methodContext`；扫描到的测试主题包括 “typert-protocol Remote declarations”、“binds a TypertRemoteService name and executes decorators through the Vitest source transform”、“executes standard decorator syntax through the TSX source launcher”、“keeps decorator markers in private module state”、“keeps markers idempotent across instances and returns detached snapshots”、“supports explicit export names without exposing marker storage”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/typert/registry

### [packages/typert/registry/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/client/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser face of the shared Typert runtime registry.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/typert/registry/src/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/service.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/typert/registry/tests/typert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/tests/typert.spec.ts)
- 对应测试：[packages/typert/registry/tests/typert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/tests/typert.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/typert/registry/README.md`、入口和消费者，再读当前契约，沿着 `packages/typert/registry/tests/typert.spec.ts` 看它怎样约束运行时，最后对照 `packages/typert/registry/tests/typert.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 15 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser face of the shared Typert runtime registry.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/registry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/index.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/typert/registry` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host entry for the shared Typert runtime registry.”；本地静态 import 图显示它直接依赖 3 个源文件，并被 13 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[packages/typert/registry/src/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/service.ts)、[packages/typert/registry/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/types.ts)、[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)
- 对应测试：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/tests/agent-lookup.spec.ts)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/wire-events.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/wire-events.client.spec.ts)、[packages/core/agent/tests/agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/agent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/typert/registry/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/api/remotes/src/agent-lookup.ts` 看它怎样约束运行时，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/api/remotes/tests/agent-lookup.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 27 行；源码顶部原注释（英文，仅作回查线索）：Host entry for the shared Typert runtime registry.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/registry/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/invariant.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/typert/registry` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-typert-registry. @module @deepseek-ai/dsh-typert-registry/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-typert-registry. @module @deepseek-ai/dsh-typert-registry/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/registry/src/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/service.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供 `packages/typert/registry` 包里的 `src/service.ts` 的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Runtime registry for generated Typert reflection, Remote invocations, and dependency-inverted lookup/Context providers. It performs no TypeScript analysis or schema generation. @module @deepseek-ai/dsh-typert-registry”；固定提交中扫描到的声明包括 `typertKey`、`typertPackageKey`、`typertEndpoint`、`TypertRegistry`、`ChangeSource`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[packages/typert/registry/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/typert/registry/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/tests/agent-lookup.spec.ts)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/wire-events.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/wire-events.client.spec.ts)、[packages/core/agent/tests/agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/tests/agent.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/typert/registry/README.md` 和入口，再读当前实现，沿着 `packages/typert/protocol/src/index.ts`、`packages/typert/registry/src/types.ts`、`vendor/cordis/src/index.ts` 和 `packages/typert/registry/src/client/index.ts`、`packages/typert/registry/src/index.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/api/remotes/tests/agent-lookup.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 721 行；扫描到的声明包括 `typertKey`、`typertPackageKey`、`typertEndpoint`、`TypertRegistry`、`ChangeSource`、`DescriptorStore`、`RemoteStore`、`LookupStore`；源码顶部原注释（英文，仅作回查线索）：Runtime registry for generated Typert reflection, Remote invocations, and dependency-inverted lookup/Context providers. It performs no TypeScript analysis or schema generation. @module @deepseek-ai/dsh-typert-registry。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/registry/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/types.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 `packages/typert/registry` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Pure generated-artifact and runtime-registry types. The registry stores Zod schemas separately from generated package reflection metadata. @module @deepseek-ai/dsh-typert-registry/types”；固定提交中扫描到的声明包括 `TypertFace`、`TypertDocTag`、`TypertDocumentation`、`TypertMemberModel`、`TypertTypeModel`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[packages/typert/generator/tests/tools-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tools-catalog.spec.ts)、[packages/typert/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/loader/src/index.ts)、[packages/typert/registry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/index.ts)
- 对应测试：[packages/typert/generator/tests/tools-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/generator/tests/tools-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/typert/registry/README.md`、入口和消费者，再读当前契约，沿着 `packages/typert/generator/tests/tools-catalog.spec.ts`、`packages/typert/loader/src/index.ts`、`packages/typert/registry/src/index.ts` 看它怎样约束运行时，最后对照 `packages/typert/generator/tests/tools-catalog.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `TypertFace`、`TypertDocTag`、`TypertDocumentation`、`TypertMemberModel`、`TypertTypeModel`、`TypertServiceModel`、`TypertEventModel`、`TypertObjectModel`；源码顶部原注释（英文，仅作回查线索）：Pure generated-artifact and runtime-registry types. The registry stores Zod schemas separately from generated package reflection metadata. @module @deepseek-ai/dsh-typert-registry/types。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/registry/tests/typert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/tests/typert.spec.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“typert”写出可重复运行的断言，覆盖的场景包括“TypertRegistry”、“registers and queries generated schemas separately from package reflection”、“withdraws schemas and package metadata through the exact contribution disposer”、“follows the registering plugin fiber lifecycle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TypertRegistry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `makeCtx`、`toolsContribution`、`invocation`、`scopedInvocation`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[packages/typert/registry/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/client/index.ts)、[packages/typert/registry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/typert/protocol/src/index.ts`、`packages/typert/registry/src/client/index.ts`、`packages/typert/registry/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 585 行；扫描到的声明包括 `makeCtx`、`toolsContribution`、`invocation`、`scopedInvocation`；扫描到的测试主题包括 “TypertRegistry”、“registers and queries generated schemas separately from package reflection”、“withdraws schemas and package metadata through the exact contribution disposer”、“follows the registering plugin fiber lifecycle”、“rejects duplicate package faces and schema keys before committing”、“rejects malformed contribution identities and filters both registry views”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/typert/registry/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/tsdown.config.ts)

- 所属层：packages/typert：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理 `packages/typert/registry` 包里的 `tsdown.config.ts` ：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/typert/registry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/registry/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/typert/registry/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
