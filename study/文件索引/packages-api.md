# 源文件索引：packages/api

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 16 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/api/gateway/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/client/index.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 API 边界、网关、浏览器端 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/client/index.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/protocol/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)
- 对应测试：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/extensions/cordis-client-runner/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/extensions/cordis-client-runner/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 588 行；扫描到的声明包括 `ClientRemote`、`inject`、`apply`、`ClientRemoteService`、`RemoteNamespaceService`、`remoteServiceKey`、`endpointOf`、`mountActive`；文件顶部注释线索：Client projection of generated Typert Remote descriptors. Contributions install traced remote.<namespace> services; no JavaScript Proxy participates in method lookup, invocation, or type exposure.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/gateway/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/index.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 API 边界、网关 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/api/gateway/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/types.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/index.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/protocol/src/index.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)
- 对应测试：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 685 行；扫描到的声明包括 `TypertGatewayError`、`TypertGatewayService`、`RemoteInvocationCancelled`、`rpcFailure`、`endpointOf`、`validateBinding`、`readBinding`、`originalOf`；文件顶部注释线索：Live Typert Remote dispatch over Cordis Services and registered providers. Transport, request correlation, and response envelopes belong to Connection. @module @deepseek-ai/dsh-api-gateway。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/gateway/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/invariant.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 API 边界、网关 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-api-gateway. @module @deepseek-ai/dsh-api-gateway/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/gateway/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/types.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 API 边界、网关 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/api/gateway/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `InvokeRemoteRequest`、`TypertGatewayErrorCode`、`TypertGateway`；文件顶部注释线索：Carrier-independent Typert Gateway request, service, and error contracts. @module @deepseek-ai/dsh-api-gateway/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 API 边界、网关 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/api/gateway/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/client/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/client/index.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/protocol/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 829 行；扫描到的声明包括 `remoteEventContracts`、`directDescriptor`、`contextDescriptor`、`maybeDescriptor`、`bench`、`benchFiber`；扫描到的测试主题包括 “Client Typert API”、“mounts concrete direct methods, validates both boundaries, and withdraws retained handles”、“encodes declared undefined as an omitted argument and distinguishes it from null results”、“projects one direct lookup descriptor onto an Agent-scoped alias”、“uses the caller Context identity for scoped namespace methods”、“rejects weak descriptors and namespace collisions before registration”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 API 边界、网关 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/api/gateway/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/index.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1389 行；扫描到的声明包括 `GoalService`、`FakeConnectionService`、`fakeHttpServer`、`serveRoute`、`FirstSharedService`、`SecondSharedService`、`DefaultParameterService`、`DestructuredParameterService`；扫描到的测试主题包括 “TypertGatewayService”、“invokes a strict direct method with schema decoding and a live lookup”、“resolves strict Remote Scope identity without adding a business argument”、“derives SRC direct lookup and JSON parameters from marker and parameter names”、“does not downgrade an observed SRC lookup after its provider unloads”、“derives SRC Remote Scope identity and preserves the scoped Proxy receiver”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/gateway/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tsdown.config.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它定义 API 边界、网关 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/api/gateway/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/src/agent-lookup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/agent-lookup.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 API 边界、智能体；文件顶部注释把它定位为“Host BFF policy for resolving Remote Agent and Session identities.”。固定提交中扫描到的公开或顶层声明包括 `ApiRemoteLookupError`、`ApiRemoteAgentResult`、`ApiRemoteAgentOptions`、`ApiRemoteSessionNotFound`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Host BFF policy for resolving Remote Agent and Session identities.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session/session-persistence/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence/src/index.ts)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/agent-lookup.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 211 行；扫描到的声明包括 `ApiRemoteLookupError`、`ApiRemoteAgentResult`、`ApiRemoteAgentOptions`、`ApiRemoteSessionNotFound`、`ApiRemoteSubagentSessionOwnership`、`hasApiRemoteSubagentOwner`、`apiRemoteSubagentOwnershipError`、`inspectApiRemoteSession`；文件顶部注释线索：Host BFF policy for resolving Remote Agent and Session identities.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/client/index.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 API 边界、浏览器端 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/api/gateway/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/src/client/index.ts)、[packages/api/remotes/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/types.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/agents/scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/agents/scope.ts)
- 对应测试：[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/conversation-registry.client.spec.ts)、[packages/client/runtime/tests/conversation.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/conversation.client.spec.ts)、[packages/client/runtime/tests/lineage.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/lineage.client.spec.ts)、[packages/client/runtime/tests/manager.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/manager.client.spec.ts)、[packages/client/runtime/tests/partial.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/partial.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的声明包括 `inject`、`apply`；文件顶部注释线索：Platform-neutral assembly of generated Host Remote contributions.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 API 边界 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/api/remotes/src/agent-lookup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/agent-lookup.ts)、[packages/api/remotes/src/remote-events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/remote-events.ts)、[packages/api/remotes/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/types.ts)、[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/agent-lookup.spec.ts)
- 对应测试：[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/agent-lookup.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 44 行；扫描到的声明包括 `apply`；文件顶部注释线索：Host BFF entry and Loader shell for the Remote contribution assembly.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/invariant.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 API 边界 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-api-remotes.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/src/remote-events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/remote-events.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 API 边界、远程调用、事件；文件顶部注释把它定位为“The one home of this application's forwarded-Host-event allowlist. Both compiler faces list this file, so the Host forwarding loop and the consumer ctx.remote.$on key face read one declaration instead of two copies that could drift; ./types.ts derives the t...”。固定提交中扫描到的公开或顶层声明包括 `API_REMOTE_FORWARDED_EVENTS`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The one home of this application's forwarded-Host-event allowlist. Both compiler faces list this file, so the Host forwarding loop and the consumer ctx.remote.$on key face read one declaration instead of two copies that could drift; ./types.ts derives the t...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)、[packages/api/remotes/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/agent-lookup.spec.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-assembler.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/conversation-assembler.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `API_REMOTE_FORWARDED_EVENTS`；文件顶部注释线索：The one home of this application's forwarded-Host-event allowlist. Both compiler faces list this file, so the Host forwarding loop and the consumer ctx.remote.$on key face read one declaration instead of two copies that could drift; ./types.ts derives the t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/types.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 API 边界 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/api/remotes/src/remote-events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/remote-events.ts)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/client/index.ts)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)、[packages/client/ui-settings/src/client/settings-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-settings/src/client/settings-scope.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/agent-lookup.spec.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 19 行；扫描到的声明包括 `ApiRemoteForwardedEvent`；文件顶部注释线索：Type face of the forwarded-Host-event allowlist: the consumer key projection and the selection seat it fills. The allowlist VALUE lives in ./remote-events.ts, keeping this module type-only per the package convention; both compiler faces list both files, so ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/tests/agent-lookup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/agent-lookup.spec.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 API 边界、智能体 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 154 行；扫描到的声明包括 `header`、`createContext`、`provideSession`、`stubAgent`；扫描到的测试主题包括 “API Remote Agent resolver races”、“maps an inspected session without a cwd to session-not-found”、“resumes through a concurrently attached ordinary Session without optional defaults”、“rejects a subagent Session published after durable inspection”、“reclassifies failed resumes after a live or attached subagent wins publication”、“uses the shared cold-resume policy for the Agent Host Context”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tests/built-lib.e2e.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 API 边界 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 226 行；扫描到的声明包括 `runPlainNode`；扫描到的测试主题包括 “runs root and Agent-scoped calls through generated bundles and real HTTP”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/api/remotes/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/tsdown.config.ts)

- 所属层：packages/api：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它定义 API 边界 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/api/remotes/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 7 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
