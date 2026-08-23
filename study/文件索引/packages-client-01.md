# 源文件索引：packages/client（第 1/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 1 部分，覆盖：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/connection

### [packages/client/connection/src/api-path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-path.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Web 传输路径契约
- 这个文件有什么用：它集中定义 Web 传输共用的 `/api` 前缀，以及浏览器 mux/host WebSocket 的两个固定路径；服务端注册路由和浏览器连接端因此不会各自拼出不同字符串。
- 为什么这样设计：API 前缀和两个 WebSocket 路径是浏览器与宿主共同遵守的协议常量；集中定义并让两端复用，能防止字符串漂移造成“服务已启动但客户端连错地址”。
- 文件级设计证据：源码顶部注释把它定位为“The /api URL prefix — single source for both halves of the web transport. The node half registers this prefix on the web server; both halves share the event paths below for the browser WebSocket downlinks.”；固定提交中扫描到的声明包括 `API_PATH`、`MUX_EVENTS_PATH`、`HOST_EVENTS_PATH`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/web-api-client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/web-api-client.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)、[packages/client/connection/src/rpc-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/rpc-host.ts)
- 对应测试：[packages/client/connection/tests/websocket-downlink.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/websocket-downlink.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/client/connection/src/client/web-api-client.ts`、`packages/client/connection/src/index.ts`、`packages/client/connection/src/rpc-host.ts` 确认输入输出，最后对照 `packages/client/connection/tests/websocket-downlink.host.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的声明包括 `API_PATH`、`MUX_EVENTS_PATH`、`HOST_EVENTS_PATH`；源码顶部原注释（英文，仅作回查线索）：The /api URL prefix — single source for both halves of the web transport. The node half registers this prefix on the web server; both halves share the event paths below for the browser WebSocket downlinks.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/api-request-trust.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-request-trust.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理浏览器端、连接、API 边界的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 文件级设计证据：源码顶部注释把它定位为“Browser-trust fence for every /api request. Defends the two confused-deputy paths a browser opens against a local HTTP API — DNS rebinding (Host names the attacker's domain while the socket reaches this server) and cross-site requests fired from a malicious...”；固定提交中扫描到的声明包括 `assertTrustedAuthority`、`isTrustedApiRequest`、`header`、`parseAuthority`、`canonicalAuthority`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/loopback-hostname.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/loopback-hostname.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)、[packages/client/connection/src/rpc-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/rpc-host.ts)、[packages/client/connection/tests/api-request-trust.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/api-request-trust.host.spec.ts)
- 对应测试：[packages/client/connection/tests/api-request-trust.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/api-request-trust.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/loopback-hostname.ts` 和 `packages/client/connection/src/index.ts`、`packages/client/connection/src/rpc-host.ts`、`packages/client/connection/tests/api-request-trust.host.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/api-request-trust.host.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `assertTrustedAuthority`、`isTrustedApiRequest`、`header`、`parseAuthority`、`canonicalAuthority`、`isTrustedAuthority`；源码顶部原注释（英文，仅作回查线索）：Browser-trust fence for every /api request. Defends the two confused-deputy paths a browser opens against a local HTTP API — DNS rebinding (Host names the attacker's domain while the socket reaches this server) and cross-site requests fired from a malicious...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理浏览器端、连接、API 边界的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 文件级设计证据：源码顶部注释把它定位为“Central contract re-export point: every contract import inside web-runtime goes through this single file. Types and runtime protocol helpers/bounds come from the apiproxy api/ layer (zero Node deps, browser-safe); AbstractApiClient is the client boundary. N...”；固定提交中扫描到的声明包括 `HostDescription`、`resultOf`；本地静态 import 图显示它直接依赖 5 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/core/tools/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/presentation.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api/index.ts)、[packages/client/connection/src/client/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/connection.ts)
- 对应测试：[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture-commands.client.spec.ts)、[packages/client/connection/tests/fixture.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/connection/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/core/tools/src/presentation.ts`、`packages/host/apiproxy/src/api/index.ts` 和 `packages/client/connection/src/client/connection.ts`、`packages/client/connection/src/client/fixture.ts`、`packages/client/connection/src/client/index.ts` 确认输入输出，最后对照 `packages/client/connection/tests/api-helpers.client.spec.ts`、`packages/client/connection/tests/client-apply.client.spec.ts`、`packages/client/connection/tests/connection.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `HostDescription`、`resultOf`；源码顶部原注释（英文，仅作回查线索）：Central contract re-export point: every contract import inside web-runtime goes through this single file. Types and runtime protocol helpers/bounds come from the apiproxy api/ layer (zero Node deps, browser-safe); AbstractApiClient is the client boundary. N...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/connection.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责浏览器端、连接的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConnectionConfig`、`ConnectionState`、`ConnectionSinks`、`ConnectionController`、`sleep`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/connection.client.spec.ts)
- 对应测试：[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/connection.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/connection/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/client/api.ts` 和 `packages/client/connection/src/client/index.ts`、`packages/client/connection/tests/connection.client.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/connection.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `ConnectionConfig`、`ConnectionState`、`ConnectionSinks`、`ConnectionController`、`sleep`、`done`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：浏览器连接测试夹具
- 这个文件有什么用：它在没有真实服务器时模拟完整的客户端 API、历史会话、流式回复、审批和工具卡片数据；fixture 自己实现 fake carrier，并沿真实 RPC/Session 形状生成可重复的 UI 开发与测试场景。
- 为什么这样设计：UI 开发需要完整的 RPC、Session、流式回复和审批形状，但不应每次都启动真实服务；fake carrier 复用真实协议结构，既能模拟复杂状态，又不会把测试简化成错误的裸对象。
- 文件级设计证据：源码顶部注释把它定位为“FixtureApi: standalone UI development without a server. Real contract shape: unary takes RpcRequest<P> and returns RpcResponse<T> (echoing the rpcId); streams yield RpcRequest<frame> (the fixture IS the fake server, so it mints frame rpcIds); root respond t...”；固定提交中扫描到的声明包括 `FixtureOptions`、`createFixtureApi`、`FixtureWorld`、`createFixtureFaces`、`FixtureApiClient`；本地静态 import 图显示它直接依赖 12 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/random-uuid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/random-uuid.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)
- 对应测试：[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture-commands.client.spec.ts)、[packages/client/connection/tests/fixture.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/random-uuid.ts` 和 `packages/client/connection/src/client/index.ts`、`packages/client/connection/tests/client-apply.client.spec.ts`、`packages/client/connection/tests/fixture-commands.client.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/client-apply.client.spec.ts`、`packages/client/connection/tests/fixture-commands.client.spec.ts`、`packages/client/connection/tests/fixture.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 3286 行；扫描到的声明包括 `FixtureOptions`、`createFixtureApi`、`FixtureWorld`、`createFixtureFaces`、`FixtureApiClient`、`rpcRequest`、`text`、`userMessage`；源码顶部原注释（英文，仅作回查线索）：FixtureApi: standalone UI development without a server. Real contract shape: unary takes RpcRequest<P> and returns RpcResponse<T> (echoing the rpcId); streams yield RpcRequest<frame> (the fixture IS the fake server, so it mints frame rpcIds); root respond t...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、连接相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser wire client. The plugin selects fixture or HTTP transport, provides the shared API client, and lets the runtime object layer start the stream controller with its sinks.”；固定提交中扫描到的声明包括 `HostDescriptionSource`、`inject`、`ClientTransportHooks`、`ConnectionHandle`、`apply`；本地静态 import 图显示它直接依赖 8 个源文件，并被 35 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/connection.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)、[packages/api/gateway/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/src/client/index.ts)
- 对应测试：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/ui-conversation/tests/chat-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-view.client.spec.tsx)、[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-message-feedback/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/controller.client.spec.ts)、[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts)
- 阅读顺序：先读 `packages/client/connection/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/gateway/src/client/index.ts`、`packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/remotes/src/client/index.ts` 看它怎样约束运行时，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/client/connection/tests/client-apply.client.spec.ts`、`packages/client/ui-conversation/tests/chat-view.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 170 行；扫描到的声明包括 `HostDescriptionSource`、`inject`、`ClientTransportHooks`、`ConnectionHandle`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser wire client. The plugin selects fixture or HTTP transport, provides the shared API client, and lets the runtime object layer start the stream controller with its sinks.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/random-uuid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/random-uuid.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：RPC 标识符生成器
- 这个文件有什么用：它生成浏览器连接层使用的随机 UUID，给 RPC 请求提供不会与其他请求冲突的关联 ID。
- 为什么这样设计：RPC 关联 ID 属于传输层，不应由各个界面组件自行生成或复用业务 ID；集中生成随机 UUID 可以保证并发请求的响应匹配不依赖 UI 生命周期。
- 文件级设计证据：源码顶部注释把它定位为“Browser-safe UUID generation for client-side wire correlation.”；固定提交中扫描到的声明包括 `randomUuid`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)、[packages/client/connection/src/client/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/rpc.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture-commands.client.spec.ts)、[packages/client/connection/tests/fixture.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture.client.spec.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/connection/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和相关类型、协议或实现确认输入输出，最后对照同目录的门禁或发布测试。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的声明包括 `randomUuid`；源码顶部原注释（英文，仅作回查线索）：Browser-safe UUID generation for client-side wire correlation.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/rpc.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责浏览器端、连接、RPC的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 文件级设计证据：源码顶部注释把它定位为“Browser caller for generic Connection unary RPC channels.”；固定提交中扫描到的声明包括 `RpcFetch`、`createWebConnectionRpc`、`resolveBase`、`assertTarget`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/random-uuid.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/random-uuid.ts)、[packages/client/connection/src/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/rpc.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/client/random-uuid.ts`、`packages/client/connection/src/rpc.ts`、`packages/host/apiproxy/src/api/index.ts` 和 `packages/client/connection/src/client/index.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/client/connection/tests/client-apply.client.spec.ts`、`packages/client/locale/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `RpcFetch`、`createWebConnectionRpc`、`resolveBase`、`assertTarget`；源码顶部原注释（英文，仅作回查线索）：Browser caller for generic Connection unary RPC channels.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/client/web-api-client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/web-api-client.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理浏览器端、连接、Web 界面的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 文件级设计证据：源码顶部注释把它定位为“Browser API carrier: HTTP upstream plus one WebSocket per downstream event stream.”；固定提交中扫描到的声明包括 `WebApiClient`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/api-path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-path.ts)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api/events.schema.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)
- 对应测试：[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/api-path.ts`、`packages/client/connection/src/client/api.ts`、`packages/host/apiproxy/src/api/events.schema.ts` 和 `packages/client/connection/src/client/index.ts`、`packages/client/connection/tests/client-apply.client.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/client-apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `WebApiClient`；源码顶部原注释（英文，仅作回查线索）：Browser API carrier: HTTP upstream plus one WebSocket per downstream event stream.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/http-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/http-bridge.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：网络或路由层
- 这个文件有什么用：它把外部请求接到浏览器端、连接的内部服务，并处理协议边界；这样 Web、命令行和业务逻辑不会混在同一个函数里。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“node:http ↔ WHATWG fetch bridge for the /api transport (host side of the web carrier; the fetch-shaped handler itself is transport-agnostic).”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“node:http ↔ WHATWG fetch bridge for the /api transport (host side of the web carrier; the fetch-shaped handler itself is transport-agnostic).”；固定提交中扫描到的声明包括 `DEFAULT_MAX_REQUEST_BODY_BYTES`、`FetchHandler`、`bridge`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)、[packages/client/connection/src/rpc-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/rpc-host.ts)、[packages/client/connection/tests/http-bridge.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/http-bridge.host.spec.ts)
- 对应测试：[packages/client/connection/tests/http-bridge.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/http-bridge.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/node-half.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/client/connection/src/index.ts`、`packages/client/connection/src/rpc-host.ts`、`packages/client/connection/tests/http-bridge.host.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/http-bridge.host.spec.ts`、`packages/client/connection/tests/node-half.host.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的声明包括 `DEFAULT_MAX_REQUEST_BODY_BYTES`、`FetchHandler`、`bridge`；源码顶部原注释（英文，仅作回查线索）：node:http ↔ WHATWG fetch bridge for the /api transport (host side of the web carrier; the fetch-shaped handler itself is transport-agnostic).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、连接相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host HTTP bridge for browser-client RPC.”；固定提交中扫描到的声明包括 `name`、`inject`、`ConnectionConfig`、`Config`、`apply`；本地静态 import 图显示它直接依赖 11 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/connection/src/api-path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-path.ts)、[packages/client/connection/src/api-request-trust.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-request-trust.ts)、[packages/api/gateway/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/src/index.ts)
- 对应测试：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/node-half.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/gateway/src/index.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/node-half.host.spec.ts` 看它怎样约束运行时，最后对照 `packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/node-half.host.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 196 行；扫描到的声明包括 `name`、`inject`、`ConnectionConfig`、`Config`、`apply`、`assertImageBodyCapacity`；源码顶部原注释（英文，仅作回查线索）：Host HTTP bridge for browser-client RPC.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、连接必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-connection. @module @deepseek-ai/dsh-client-connection/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-connection. @module @deepseek-ai/dsh-client-connection/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/loopback-hostname.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/loopback-hostname.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Loopback 主机判断器
- 这个文件有什么用：它判断一个主机名是否指向本机回环地址，用于决定连接是否可以按本地宿主的安全规则处理。
- 为什么这样设计：回环主机判断会影响本地连接的安全和宿主选择，别名、IPv4/IPv6 和浏览器输入也需要统一解释；把判断收束在一个函数中，调用者不会各自放宽边界。
- 文件级设计证据：源码顶部注释把它定位为“Browser-safe, zero-dependency loopback classification shared by the /api Host fence and the package's ctx.connection state. The predicate stays package-internal; client plugins consume the derived state through Cordis.”；固定提交中扫描到的声明包括 `isLoopbackHostname`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/api-request-trust.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-request-trust.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/connection/tests/loopback-hostname.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/loopback-hostname.client.spec.ts)
- 对应测试：[packages/client/connection/tests/loopback-hostname.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/loopback-hostname.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/client/connection/src/api-request-trust.ts`、`packages/client/connection/src/client/index.ts`、`packages/client/connection/tests/loopback-hostname.client.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/loopback-hostname.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的声明包括 `isLoopbackHostname`；源码顶部原注释（英文，仅作回查线索）：Browser-safe, zero-dependency loopback classification shared by the /api Host fence and the package's ctx.connection state. The predicate stays package-internal; client plugins consume the derived state through Cordis.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/rpc-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/rpc-host.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责浏览器端、连接、RPC的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 文件级设计证据：源码顶部注释把它定位为“Host registry and HTTP adapter for generic Connection RPC channels.”；固定提交中扫描到的声明包括 `HostConnectionService`、`rpcFetchHandler`、`invalidEnvelopeResponse`、`endpointFromPath`、`errorResponse`；本地静态 import 图显示它直接依赖 7 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/api-path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-path.ts)、[packages/client/connection/src/api-request-trust.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-request-trust.ts)、[packages/client/connection/src/http-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/http-bridge.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/node-half.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/api-path.ts`、`packages/client/connection/src/api-request-trust.ts`、`packages/client/connection/src/http-bridge.ts` 和 `packages/client/connection/src/index.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/node-half.host.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 224 行；扫描到的声明包括 `HostConnectionService`、`rpcFetchHandler`、`invalidEnvelopeResponse`、`endpointFromPath`、`errorResponse`、`fullResponse`、`assertChannel`；源码顶部原注释（英文，仅作回查线索）：Host registry and HTTP adapter for generic Connection RPC channels.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/rpc.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责浏览器端、连接、RPC的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 文件级设计证据：源码顶部注释把它定位为“Generic unary RPC contracts shared by the Host and Client Connection halves.”；固定提交中扫描到的声明包括 `ConnectionRpcAuthority`、`ConnectionRpcHandlerOptions`、`ConnectionRpcHandler`、`ConnectionRpcEndpointMatcher`、`HostConnectionRpc`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api/index.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/connection/src/client/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/rpc.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture-commands.client.spec.ts)、[packages/client/connection/tests/fixture.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture.client.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/node-half.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/index.ts` 和 `packages/client/connection/src/client/fixture.ts`、`packages/client/connection/src/client/index.ts`、`packages/client/connection/src/client/rpc.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/client-apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `ConnectionRpcAuthority`、`ConnectionRpcHandlerOptions`、`ConnectionRpcHandler`、`ConnectionRpcEndpointMatcher`、`HostConnectionRpc`、`HostConnectionHandle`、`ClientConnectionRpc`；源码顶部原注释（英文，仅作回查线索）：Generic unary RPC contracts shared by the Host and Client Connection halves.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/src/websocket-downlink.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/websocket-downlink.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责浏览器端、连接、WebSocket的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 文件级设计证据：源码顶部注释把它定位为“Host-side WebSocket carrier for the two server-to-browser event streams.”；固定提交中扫描到的声明包括 `WebSocketDownlinks`、`rejectWebSocketUpgrade`、`serverRequest`、`send`、`failureFrame`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api/index.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)、[packages/client/connection/tests/websocket-downlink.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/websocket-downlink.host.spec.ts)
- 对应测试：[packages/client/connection/tests/websocket-downlink.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/websocket-downlink.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/connection/README.md` 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/index.ts` 和 `packages/client/connection/src/index.ts`、`packages/client/connection/tests/websocket-downlink.host.spec.ts` 确认输入输出，最后对照 `packages/client/connection/tests/websocket-downlink.host.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 153 行；扫描到的声明包括 `WebSocketDownlinks`、`rejectWebSocketUpgrade`、`serverRequest`、`send`、`failureFrame`；源码顶部原注释（英文，仅作回查线索）：Host-side WebSocket carrier for the two server-to-browser event streams.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/api-helpers.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接、API 边界的具体场景，包括“transportError”、“folds an Error to internal keeping the message, and stringifies non-Errors”、“resultOf”、“unwraps the result slot”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“transportError”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Contract-layer helpers: transport-error folding and response unwrapping. (The assistant block classifier half of the legacy spec lives in runtime/tests — the classifier moved there.)”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/api.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的测试主题包括 “transportError”、“folds an Error to internal keeping the message, and stringifies non-Errors”、“resultOf”、“unwraps the result slot”；源码顶部原注释（英文，仅作回查线索）：Contract-layer helpers: transport-error folding and response unwrapping. (The assistant block classifier half of the legacy spec lives in runtime/tests — the classifier moved there.)。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/api-request-trust.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/api-request-trust.host.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接、API 边界的具体场景，包括“isTrustedApiRequest”、“holds markerless requests to the same Host fence — a plain-HTTP browser read carries no...”、“accepts loopback Hosts in every spelling, with and without ports, for browser requests”、“refuses a rebound Host: the attacker domain names the socket it did not expect”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“isTrustedApiRequest”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Behavior of the /api browser-trust fence (rebinding + cross-site defense).”；固定提交中扫描到的声明包括 `request`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/api-request-trust.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-request-trust.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/api-request-trust.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 108 行；扫描到的声明包括 `request`；扫描到的测试主题包括 “isTrustedApiRequest”、“holds markerless requests to the same Host fence — a plain-HTTP browser read carries no markers”、“accepts loopback Hosts in every spelling, with and without ports, for browser requests”、“refuses a rebound Host: the attacker domain names the socket it did not expect”、“accepts a declared public authority: exact on host:port entries, any port on port-less entries”、“matches Host, Origin, and trusted entries through WHATWG normalization (case, default port)”；源码顶部原注释（英文，仅作回查线索）：Behavior of the /api browser-trust fence (rebinding + cross-site defense).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/client-apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接的具体场景，包括“connection client apply”、“mounts ctx.connection with the real client when no ?fixture switch is present”、“selects the fixture client under ?fixture (and with no location at all stays real)”、“reports non-loopback page authority through the connection handle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“connection client apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Connection plugin browser-half apply: ctx.connection handle mounting, mode selection off the page URL, and the single-consumer stream-loop ownership.”；固定提交中扫描到的声明包括 `FakeWebSocket`、`mount`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/fixture.ts`、`packages/client/connection/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 398 行；扫描到的声明包括 `FakeWebSocket`、`mount`；扫描到的测试主题包括 “connection client apply”、“mounts ctx.connection with the real client when no ?fixture switch is present”、“selects the fixture client under ?fixture (and with no location at all stays real)”、“reports non-loopback page authority through the connection handle”、“start() hands out one loop, rejects a second consumer, and stop() aborts the streams”、“does not announce a generation synchronously stopped by a description subscriber”；源码顶部原注释（英文，仅作回查线索）：Connection plugin browser-half apply: ctx.connection handle mounting, mode selection off the page URL, and the single-consumer stream-loop ownership.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/connection.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接的具体场景，包括“connection lifecycle”、“announces connected after describe + both streams open, then pumps frames to sinks”、“reconnects with a fresh generation when a stream fails, and stop() ends the loop”、“treats describe failure as generation failure and retries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“connection lifecycle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ConnectionController: stream pumping into sinks, the strict readiness handshake (describe + both streams' onOpen, timeout-guarded), generation abort on loss, backoff reconnection, state transitions, and sink-exception isolation. Real (short) timers — the ti...”；固定提交中扫描到的声明包括 `subscribedFrame`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/connection.ts)、[packages/client/connection/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fake-api.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/connection/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/connection.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 322 行；扫描到的声明包括 `subscribedFrame`；扫描到的测试主题包括 “connection lifecycle”、“announces connected after describe + both streams open, then pumps frames to sinks”、“reconnects with a fresh generation when a stream fails, and stop() ends the loop”、“treats describe failure as generation failure and retries”、“treats a host.describe business error as generation failure”、“converges stream/error frames into reconnect instead of dispatching them”；源码顶部原注释（英文，仅作回查线索）：ConnectionController: stream pumping into sinks, the strict readiness handshake (describe + both streams' onOpen, timeout-guarded), generation abort on loss, backoff reconnection, state transitions, and sink-exception isolation. Real (short) timers — the ti...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fake-api.client.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“fake-api.client”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test-local programmable IApiClient fake (NOT the fixture: fixture is a demo data source on a real clock; behavior tests need per-case responses and deferred-controlled timing). Streams are hand pumps: pushMux/pushHost.”；固定提交中扫描到的声明包括 `Deferred`、`deferred`、`ok`、`FakeApiClient`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/connection.client.spec.ts)
- 对应测试：[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/connection.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/connection/tests/connection.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 314 行；扫描到的声明包括 `Deferred`、`deferred`、`ok`、`FakeApiClient`；源码顶部原注释（英文，仅作回查线索）：Test-local programmable IApiClient fake (NOT the fixture: fixture is a demo data source on a real clock; behavior tests need per-case responses and deferred-controlled timing). Streams are hand pumps: pushMux/pushHost.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture-commands.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接的具体场景，包括“createFixtureApi commands/skills”、“serves the addressed session catalog”、“rejects a catalog request for an unknown session”、“executes a known command line: pure admission plus a mux-broadcast lifecycle pair”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createFixtureApi commands/skills”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Fixture commands/skills domains: session-addressed catalogs, execute parse/dispatch and its logged lifecycle pair, skill.list session resolution, and the FixtureApiClient dispatch rows. Commands answer on the Remote face and skills on the legacy API face, s...”；固定提交中扫描到的声明包括 `callRemote`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/fixture.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `callRemote`；扫描到的测试主题包括 “createFixtureApi commands/skills”、“serves the addressed session catalog”、“rejects a catalog request for an unknown session”、“executes a known command line: pure admission plus a mux-broadcast lifecycle pair”、“addresses execute to the session; an unknown session errs”、“refuses an image-carrying execute for a non-declaring command with a logged error pair”；源码顶部原注释（英文，仅作回查线索）：Fixture commands/skills domains: session-addressed catalogs, execute parse/dispatch and its logged lifecycle pair, skill.list session resolution, and the FixtureApiClient dispatch rows. Commands answer on the Remote face and skills on the legacy API face, s...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/fixture.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/fixture.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接的具体场景，包括“createFixtureApi”、“serves the session list sorted by updatedAt desc and echoes rpcIds on every unary”、“searches current message text with literal unicode61-style token phrases”、“pages history backwards on message-boundary cuts with seq-contiguous stitching”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createFixtureApi”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Fixture impl semantics: the demo data source must honor the same contract shapes as the real host (paging boundaries, rpcId echo, replay lifecycle, baseline replay, timing hooks) — this is the vitest-side drift detector for the hand-written fixture/host par...”；固定提交中扫描到的声明包括 `collect`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/fixture.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1157 行；扫描到的声明包括 `collect`；扫描到的测试主题包括 “createFixtureApi”、“serves the session list sorted by updatedAt desc and echoes rpcIds on every unary”、“searches current message text with literal unicode61-style token phrases”、“pages history backwards on message-boundary cuts with seq-contiguous stitching”、“serves grouped models and keeps a selection for later history and fixture requests”、“serves configured DeepSeek readiness and keeps credential values write-only”；源码顶部原注释（英文，仅作回查线索）：Fixture impl semantics: the demo data source must honor the same contract shapes as the real host (paging boundaries, rpcId echo, replay lifecycle, baseline replay, timing hooks) — this is the vitest-side drift detector for the hand-written fixture/host par...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/http-bridge.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/http-bridge.host.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接、服务端宿主的具体场景，包括“HTTP bridge abort”、“destroys a declared-oversize request instead of draining it”、“aborts a pending native picker request when the browser disconnects”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“HTTP bridge abort”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/http-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/http-bridge.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/http-bridge.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的测试主题包括 “HTTP bridge abort”、“destroys a declared-oversize request instead of draining it”、“aborts a pending native picker request when the browser disconnects”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/loopback-hostname.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/loopback-hostname.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接的具体场景，包括“isLoopbackHostname”、“accepts localhost, IPv6 loopback, and the whole IPv4 127/8 block”、“refuses malformed and non-loopback hostnames”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“isLoopbackHostname”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Shared loopback-hostname semantics for the Host fence and browser UI.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/loopback-hostname.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/loopback-hostname.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/loopback-hostname.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的测试主题包括 “isLoopbackHostname”、“accepts localhost, IPv6 loopback, and the whole IPv4 127/8 block”、“refuses malformed and non-loopback hostnames”；源码顶部原注释（英文，仅作回查线索）：Shared loopback-hostname semantics for the Host fence and browser UI.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/node-half.host.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接、服务端宿主的具体场景，包括“connection node half”、“reserves enough default carrier capacity for the 200 MiB image batch”、“fails loud when the carrier cap cannot hold the configured image batch”、“fails the load on a trustedHosts entry that is not a bare authority”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“connection node half”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Node half: registers the /api prefix route bridging to the api gateway.”；固定提交中扫描到的声明包括 `fakeHttpServer`、`fakeRequest`、`fakePost`、`fakeRawPost`、`fakeResponse`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/connection/src/http-bridge.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/http-bridge.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/client/connection/src/http-bridge.ts`、`packages/client/connection/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 501 行；扫描到的声明包括 `fakeHttpServer`、`fakeRequest`、`fakePost`、`fakeRawPost`、`fakeResponse`、`mounted`、`serve`、`call`；扫描到的测试主题包括 “connection node half”、“reserves enough default carrier capacity for the 200 MiB image batch”、“fails loud when the carrier cap cannot hold the configured image batch”、“fails the load on a trustedHosts entry that is not a bare authority”、“registers one HTTP route plus one upgrade route per downlink and removes all three with the fiber”、“requires WebSocket upgrade for network GETs to either event path”；源码顶部原注释（英文，仅作回查线索）：Node half: registers the /api prefix route bridging to the api gateway.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tests/websocket-downlink.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/websocket-downlink.host.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、连接、WebSocket的具体场景，包括“WebSocket downlinks”、“carries mux and host over independent downstream sockets and cancels each source on close”、“rejects client messages because upstream remains HTTP”、“sends stream/error before closing when a source fails”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WebSocket downlinks”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `untilAbort`、`api`、`serve`、`read`、`acceptedSocket`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/connection/src/api-path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/api-path.ts)、[packages/client/connection/src/websocket-downlink.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/websocket-downlink.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/src/api/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/api-path.ts`、`packages/client/connection/src/websocket-downlink.ts`、`packages/host/apiproxy/src/api/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 308 行；扫描到的声明包括 `untilAbort`、`api`、`serve`、`read`、`acceptedSocket`；扫描到的测试主题包括 “WebSocket downlinks”、“carries mux and host over independent downstream sockets and cancels each source on close”、“rejects client messages because upstream remains HTTP”、“sends stream/error before closing when a source fails”、“aborts the source when an accepted socket reports a transport error”、“drops a source frame that races after the client has closed”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/connection/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、连接：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/connection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/connection/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/hmr

### [packages/client/hmr/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“client-hmr, browser half: hot-reload driver for client plugin entries. Listens on the host's system SSE channel (GET /plugins/events); on a rebuilt frame it reloads the entry's bundle and swaps the cordis fiber in place. Every graph entry is a plugin bundle...”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`findEntry`、`removeOwnedStyles`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/README.md)、[packages/client/hmr/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/events.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/loader/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/hmr/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `name`、`inject`、`apply`、`findEntry`、`removeOwnedStyles`、`reload`；源码顶部原注释（英文，仅作回查线索）：client-hmr, browser half: hot-reload driver for client plugin entries. Listens on the host's system SSE channel (GET /plugins/events); on a rebuilt frame it reloads the entry's bundle and swaps the cordis fiber in place. Every graph entry is a plugin bundle...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/hmr/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/events.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出浏览器端、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：源码顶部注释把它定位为“Wire protocol of the /plugins/events dev SSE channel — single source for both halves of this package. Frames still cross a wire boundary: the browser half validates them at its JSON parse point; sharing the type keeps the two ends from drifting, not from pa...”；固定提交中扫描到的声明包括 `PluginsEventFrame`、`EVENTS_ENDPOINT`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/README.md)、[packages/client/modules/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/index.ts)、[packages/client/hmr/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/client/index.ts)、[packages/client/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/hmr/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/tests/node-half.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/hmr/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/hmr/src/client/index.ts`、`packages/client/hmr/src/index.ts` 看它怎样约束运行时，最后对照 `packages/client/hmr/tests/node-half.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 16 行；扫描到的声明包括 `PluginsEventFrame`、`EVENTS_ENDPOINT`；源码顶部原注释（英文，仅作回查线索）：Wire protocol of the /plugins/events dev SSE channel — single source for both halves of this package. Frames still cross a wire boundary: the browser half validates them at its JSON parse point; sharing the type keeps the two ends from drifting, not from pa...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“HMR plugin, node half: the host end of the dev reload chain. One interval stat-polls every graph row's client bundle (polling by design: network mounts deliver no inotify events), reports content changes through clientModuleHost.rebuilt(id), and serves the ...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`sseData`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/README.md)、[packages/client/hmr/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/events.ts)、[packages/client/modules/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)、[packages/client/hmr/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/tests/node-half.client.spec.ts)
- 对应测试：[packages/client/hmr/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/tests/node-half.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/hmr/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/hmr/tests/node-half.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/hmr/tests/node-half.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 191 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`、`sseData`；源码顶部原注释（英文，仅作回查线索）：HMR plugin, node half: the host end of the dev reload chain. One interval stat-polls every graph row's client bundle (polling by design: network mounts deliver no inotify events), reports content changes through clientModuleHost.rebuilt(id), and serves the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/hmr/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-hmr. @module @deepseek-ai/dsh-client-hmr/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`statWatchers`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 59 行；扫描到的声明包括 `name`、`inject`、`apply`、`statWatchers`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-hmr. @module @deepseek-ai/dsh-client-hmr/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/hmr/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/tests/node-half.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“hmr node half”、“watches graph bundles, reports stat changes, and unwatches on dispose”、“follows graph changes: rows added after activation get watched”、“rehashes after baseline capture so a construction-window write cannot become the baseline”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hmr node half”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Node half of the HMR plugin: bundle watches follow the graph, stat changes report through clientModuleHost.rebuilt, and everything dies with the fiber.”；固定提交中扫描到的声明包括 `fakeClientModuleHost`、`fakeHttpServer`、`mount`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/README.md)、[packages/client/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/src/index.ts)、[packages/client/modules/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/hmr/src/index.ts`、`packages/client/modules/src/index.ts`、`packages/host/webserver/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 204 行；扫描到的声明包括 `fakeClientModuleHost`、`fakeHttpServer`、`mount`；扫描到的测试主题包括 “hmr node half”、“watches graph bundles, reports stat changes, and unwatches on dispose”、“follows graph changes: rows added after activation get watched”、“rehashes after baseline capture so a construction-window write cannot become the baseline”、“marks a vanished bundle dirty so identical metadata still re-hashes after it reappears”、“retains a dirty baseline when the immediate re-hash races a rename”；源码顶部原注释（英文，仅作回查线索）：Node half of the HMR plugin: bundle watches follow the graph, stat changes report through clientModuleHost.rebuilt, and everything dies with the fiber.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/hmr/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/hmr/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/locale

### [packages/client/locale/src/client/LanguageRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `LanguageRow` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `LanguageRow` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Language row (figma 'Setting-Cell': gap 8, pad 16/0, hairline separator; the section column removes the separator on its last child).”；固定提交中扫描到的结构线索是：样式结构包含选择器 .row、.rowText、.title、.selector、.chevron；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/locale/src/client/LanguageRow.tsx` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 51 行；样式结构包含选择器 .row、.rowText、.title、.selector、.chevron；源码顶部原注释（英文，仅作回查线索）：Language row (figma 'Setting-Cell': gap 8, pad 16/0, hairline separator; the section column removes the separator on its last child).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：设置语言选择行
- 这个文件有什么用：它把语言偏好注册到 General 设置区的 item slot，显示当前语言并打开选择菜单；选择后通过标准 locale seat 写回 active locale。
- 为什么这样设计：语言设置既要读 locale store，又要通过 slot 接收标准写入动作；把它做成自己的设置行，locale 包可以拥有菜单和文案，而 General 设置区只负责提供插槽。
- 文件级设计证据：源码顶部注释把它定位为“Language preference row registered into the General section item slot (figma 501:30011 'Setting-Cell'): title + selector pill opening the locale menu. Registered by this package — the locale feature owns its own settings surface.”；固定提交中扫描到的声明包括 `LanguageRowInjected`、`LanguageRowComponentProps`、`LanguageRow`；本地静态 import 图显示它直接依赖 5 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/LanguageRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.module.css)、[packages/client/locale/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/settings-store.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/locale/README.md` 和入口，再读当前实现，沿着 `packages/client/locale/src/client/LanguageRow.module.css`、`packages/client/locale/src/client/settings-store.ts`、`packages/client/ui-primitives/src/index.ts` 和 `packages/client/locale/src/client/index.ts`、`packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/language-row.client.spec.tsx` 确认输入输出，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/language-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 67 行；扫描到的声明包括 `LanguageRowInjected`、`LanguageRowComponentProps`、`LanguageRow`；源码顶部原注释（英文，仅作回查线索）：Language preference row registered into the General section item slot (figma 501:30011 'Setting-Cell'): title + selector pill opening the locale menu. Registered by this package — the locale feature owns its own settings surface.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、本地化相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser-side locale registry. Bound translation functions retain stable identity for injected consumers. The plugin also registers the Language preference row into the settings General section — the locale feature owns its own settings surface.”；固定提交中扫描到的声明包括 `LocaleDict`、`LocaleDefinition`、`LocaleSnapshot`、`FALLBACK_LOCALE`、`COMMON_NS`；本地静态 import 图显示它直接依赖 9 个源文件，并被 70 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)、[packages/client/locale/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/settings-store.ts)、[packages/client/locale/src/locale-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locale-settings.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/locale/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 434 行；扫描到的声明包括 `LocaleDict`、`LocaleDefinition`、`LocaleSnapshot`、`FALLBACK_LOCALE`、`COMMON_NS`、`SETTINGS_NS`、`LocaleRuntime`、`inject`；源码顶部原注释（英文，仅作回查线索）：Browser-side locale registry. Bound translation functions retain stable identity for injected consumers. The plugin also registers the Language preference row into the settings General section — the locale feature owns its own settings surface.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/settings-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、本地化、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Language row slot store: a mirror of the locale service snapshot. The plugin's apply-world change listener is the only writer; the row component reads via props.useStore.”；固定提交中扫描到的声明包括 `LanguageOptionRow`、`LanguageRowState`、`createLanguageRowStore`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts` 和 `packages/client/locale/src/client/LanguageRow.tsx`、`packages/client/locale/src/client/index.ts`、`packages/client/locale/tests/apply.client.spec.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/language-row.client.spec.tsx`、`packages/client/locale/tests/settings-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 47 行；扫描到的声明包括 `LanguageOptionRow`、`LanguageRowState`、`createLanguageRowStore`；源码顶部原注释（英文，仅作回查线索）：Language row slot store: a mirror of the locale service snapshot. The plugin's apply-world change listener is the only writer; the row component reads via props.useStore.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/locale/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/locale/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、本地化相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host registration for the browser locale preference.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/locale-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locale-settings.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/locale/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/host.client.spec.ts)
- 对应测试：[packages/client/locale/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/host.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/locale/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/tests/host.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/host.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host registration for the browser locale preference.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、本地化必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-locale. @module @deepseek-ai/dsh-client-locale/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/locale/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-locale. @module @deepseek-ai/dsh-client-locale/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/locale-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locale-settings.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Locale preference stored in the Host user-settings document.”；固定提交中扫描到的声明包括 `LOCALE_SETTINGS_NAMESPACE`、`LOCALE_PREFERENCE_FIELD`、`LOCALE_IDS`、`LocaleId`、`LocaleSettings`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/locale/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/index.ts)、[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/locale/src/client/index.ts`、`packages/client/locale/src/index.ts`、`packages/client/locale/tests/apply.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `LOCALE_SETTINGS_NAMESPACE`、`LOCALE_PREFERENCE_FIELD`、`LOCALE_IDS`、`LocaleId`、`LocaleSettings`、`LocaleSettingsSchema`；源码顶部原注释（英文，仅作回查线索）：Locale preference stored in the Host user-settings document.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/locales/en.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/en.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：固定提交中扫描到的声明包括 `en`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/locale/src/locales/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/index.ts)、[packages/client/ui-conversation/tests/chat-stats.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-stats.client.spec.tsx)、[packages/client/ui-conversation/tests/skeleton.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/skeleton.client.spec.tsx)
- 对应测试：[packages/client/ui-conversation/tests/chat-stats.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-stats.client.spec.tsx)、[packages/client/ui-conversation/tests/skeleton.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/skeleton.client.spec.tsx)、[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/locale/src/locales/index.ts`、`packages/client/ui-conversation/tests/chat-stats.client.spec.tsx`、`packages/client/ui-conversation/tests/skeleton.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-conversation/tests/chat-stats.client.spec.tsx`、`packages/client/ui-conversation/tests/skeleton.client.spec.tsx`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `en`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/locales/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、本地化相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“The common-namespace dictionary pair. zh is the source of truth for the key set (Chinese-first repo convention); en is checked complete against it — a missing or extra en key is a compile error.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/locales/en.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/en.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/ui-conversation/tests/context-meter.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/context-meter.client.spec.tsx)
- 对应测试：[packages/client/ui-conversation/tests/context-meter.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/context-meter.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/locale/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/src/client/index.ts`、`packages/client/ui-conversation/tests/context-meter.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-conversation/tests/context-meter.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 8 行；源码顶部原注释（英文，仅作回查线索）：The common-namespace dictionary pair. zh is the source of truth for the key set (Chinese-first repo convention); en is checked complete against it — a missing or extra en key is a compile error.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/locales/settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/settings.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“settings.locale namespace dictionaries (the Language row's copy).”；固定提交中扫描到的声明包括 `zh`、`SettingsLocaleKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/locale/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的声明包括 `zh`、`SettingsLocaleKey`、`en`；源码顶部原注释（英文，仅作回查线索）：settings.locale namespace dictionaries (the Language row's copy).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“zh base dictionary for the common namespace: cross-feature standard words.”；固定提交中扫描到的声明包括 `zh`、`CommonKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 39 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/locales/en.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/en.ts)、[packages/client/locale/src/locales/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/index.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)
- 对应测试：[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx)、[packages/client/ui-conversation/tests/chat-stats.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-stats.client.spec.tsx)、[packages/client/ui-conversation/tests/chat-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-view.client.spec.tsx)、[packages/client/ui-conversation/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/coverage-tails.client.spec.tsx)、[packages/client/ui-conversation/tests/gate-branch-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/gate-branch-tails.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/locale/src/locales/en.ts`、`packages/client/locale/src/locales/index.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-commands/tests/popup-view.client.spec.tsx`、`packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx`、`packages/client/ui-conversation/tests/chat-stats.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `zh`、`CommonKey`；源码顶部原注释（英文，仅作回查线索）：zh base dictionary for the common namespace: cross-feature standard words.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化的具体场景，包括“locale apply”、“declares the slot service”、“provides the service with base + settings dictionaries and registers the row (declarati...”、“projects service snapshots into the row store and routes face writes back”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“locale apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“locale apply wiring: service + dictionaries provision, declaration-aware Language row registration, snapshot projection into the row store, and recovery after an HMR collapse of the declaring entry.”；固定提交中扫描到的声明包括 `bench`、`declareItems`、`faceOf`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/locale/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/settings-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/LanguageRow.tsx`、`packages/client/locale/src/client/index.ts`、`packages/client/locale/src/client/settings-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 188 行；扫描到的声明包括 `bench`、`declareItems`、`faceOf`；扫描到的测试主题包括 “locale apply”、“declares the slot service”、“provides the service with base + settings dictionaries and registers the row (declaration before or after apply)”、“projects service snapshots into the row store and routes face writes back”、“loads and refreshes the explicit Host preference after nonblocking activation”、“recovers after an HMR collapse of the declaring entry (stale disposer must not block)”；源码顶部原注释（英文，仅作回查线索）：locale apply wiring: service + dictionaries provision, declaration-aware Language row registration, snapshot projection into the row store, and recovery after an HMR collapse of the declaring entry.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化的具体场景，包括“document language”、“states the resolved locale at activation, not the value the markup shipped”、“follows a locale switch in both directions with BCP 47 tags”、“follows an explicit Host preference that overrides browser detection”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“document language”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/locale/src/locale-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locale-settings.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/locale/src/locale-settings.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 94 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “document language”、“states the resolved locale at activation, not the value the markup shipped”、“follows a locale switch in both directions with BCP 47 tags”、“follows an explicit Host preference that overrides browser detection”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/host.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化、服务端宿主的具体场景，包括“locale host”、“registers an optional explicit locale preference with the Host settings lifecycle”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“locale host”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `MemorySettings`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/index.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/index.ts`、`packages/settings/settings/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `MemorySettings`；扫描到的测试主题包括 “locale host”、“registers an optional explicit locale preference with the Host settings lifecycle”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”、“node-half apply tolerates a Host without settings”、“client apply provides ctx.locale seeded with the zh/en common namespace”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/locale/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/index.ts)、[packages/client/locale/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/locale/src/index.ts`、`packages/client/locale/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”、“node-half apply tolerates a Host without settings”、“client apply provides ctx.locale seeded with the zh/en common namespace”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化的具体场景，包括“LanguageRow”、“shows the title and the active locale label on the selector pill”、“opens the menu, selects a locale, and closes”、“closes on outside pointerdown without selecting”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LanguageRow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `emptySessions`、`emptyWorkspaces`、`mount`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)、[packages/client/locale/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/settings-store.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/LanguageRow.tsx`、`packages/client/locale/src/client/settings-store.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `emptySessions`、`emptyWorkspaces`、`mount`；扫描到的测试主题包括 “LanguageRow”、“shows the title and the active locale label on the selector pill”、“opens the menu, selects a locale, and closes”、“closes on outside pointerdown without selecting”、“follows store changes; an unknown active id falls back to the id itself”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化的具体场景，包括“LocaleRuntime”、“translates through the active-locale -> en -> key chain”、“falls through to the common vocabulary after the namespace misses (production keys)”、“interpolates {name} params and leaves unknown placeholders intact”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LocaleRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/test-support/client-runtime/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 282 行；扫描到的测试主题包括 “LocaleRuntime”、“translates through the active-locale -> en -> key chain”、“falls through to the common vocabulary after the namespace misses (production keys)”、“interpolates {name} params and leaves unknown placeholders intact”、“bind returns a stable per-namespace function identity”、“rejects duplicate (ns, locale) and disposer only removes its own dict”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、本地化、状态存储的具体场景，包括“createLanguageRowStore”、“init shape: empty mirror with revision at -1”、“sync mirrors the snapshot and advances the revision”、“revision guard drops stale and duplicate writes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createLanguageRowStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Language row store: snapshot-mirror action and the revision guard.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/locale/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/settings-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/settings-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的测试主题包括 “createLanguageRowStore”、“init shape: empty mirror with revision at -1”、“sync mirrors the snapshot and advances the revision”、“revision guard drops stale and duplicate writes”；源码顶部原注释（英文，仅作回查线索）：Language row store: snapshot-mirror action and the revision guard.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/locale/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、本地化：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/locale/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/locale/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/modules

### [packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser half (the standard ./client export): the module-system class and wire contract, plus the enrollment plugin face. The module system itself is built by the shell kernel BEFORE cordis exists (the bootstrap exception — the mechanism that loads plugins c...”；固定提交中扫描到的声明包括 `createClientModuleSystem`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/modules/src/client/manifest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/manifest.ts)、[packages/client/modules/src/client/system.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/system.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/assembled-boot.ts)
- 对应测试：[packages/client/modules/tests/loader.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/tests/loader.client.spec.ts)、[packages/client/modules/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/tests/node-half.client.spec.ts)、[packages/client/web/tests/boot.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot.client.spec.ts)、[packages/extensions/cordis-client-runner/tests/runner.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/extensions/cordis-client-runner/tests/runner.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/modules/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/assembled-boot.ts`、`packages/client/modules/tests/loader.client.spec.ts`、`packages/client/modules/tests/node-half.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/modules/tests/loader.client.spec.ts`、`packages/client/modules/tests/node-half.client.spec.ts`、`packages/client/web/tests/boot.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `createClientModuleSystem`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser half (the standard ./client export): the module-system class and wire contract, plus the enrollment plugin face. The module system itself is built by the shell kernel BEFORE cordis exists (the bootstrap exception — the mechanism that loads plugins c...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/src/client/manifest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/manifest.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义浏览器端可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Client module system: the browser peer of Node's internal ESM loader, built as a lazy CJS table. The vendored cordis Loader consumes this object through its internal contract (the only call site is EntryTree.import → internal.import), which keeps entry gove...”；固定提交中扫描到的声明包括 `WebBootEntry`、`WebBootGraph`、`BootModuleRow`、`BootPluginRow`、`BootManifest`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/modules/src/client/system.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/system.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)、[packages/client/modules/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/modules/README.md`，再读本配置/脚本，沿着 `packages/client/modules/src/client/index.ts`、`packages/client/modules/src/client/system.ts`、`packages/client/modules/src/index.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 306 行；扫描到的声明包括 `WebBootEntry`、`WebBootGraph`、`BootModuleRow`、`BootPluginRow`、`BootManifest`、`optionalStringArray`、`stripClientSuffix`、`parseBootManifest`；源码顶部原注释（英文，仅作回查线索）：Client module system: the browser peer of Node's internal ESM loader, built as a lazy CJS table. The vendored cordis Loader consumes this object through its internal contract (the only call site is EntryTree.import → internal.import), which keeps entry gove...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/src/client/system.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/system.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端模块系统
- 这个文件有什么用：它定义客户端模块系统如何注册、获取和组合模块，让 Web 入口可以按模块边界装配运行时能力。
- 为什么这样设计：客户端模块需要按宿主组合、注册和查找，而不是让 Web 入口直接知道所有功能包；模块系统提供稳定装配面，功能增删不会把依赖列表散落到界面代码。
- 文件级设计证据：源码顶部注释把它定位为“ClientModuleSystem — the implementation behind the ClientModuleLoader contract. The conceptual contract (lazy CJS model, resolution branch order) is documented on the public interfaces in ./manifest.ts; this file owns the state tables and the load/materiali...”；固定提交中扫描到的声明包括 `ClientModuleSystem`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/modules/src/client/manifest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/manifest.ts)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/modules/src/client/index.ts`、`packages/client/modules/src/client/manifest.ts` 确认状态如何进入 UI，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/command-image-envelope.snapshot.ts`、`apps/web/tests/home-path-tilde.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 220 行；扫描到的声明包括 `ClientModuleSystem`；源码顶部原注释（英文，仅作回查线索）：ClientModuleSystem — the implementation behind the ClientModuleLoader contract. The conceptual contract (lazy CJS model, resolution branch order) is documented on the public interfaces in ./manifest.ts; this file owns the state tables and the load/materiali...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Node half of the client module system (dsh.client dual-face package): scans the host Loader's entries for packages declaring dsh.client, composes the window.__DSH_BOOT__ entry graph (wire single source: WebBootEntry in ./client/manifest.ts) in module-graph ...”；固定提交中扫描到的声明包括 `orderByModuleGraph`、`bootInjections`、`ClientModuleRegistry`、`MissingClientBundleError`、`ClientPackageCompositionError`；本地静态 import 图显示它直接依赖 4 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/modules/src/client/manifest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/manifest.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[apps/web/tests/assembled-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/assembled-boot.ts)
- 对应测试：[packages/client/hmr/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/hmr/tests/node-half.client.spec.ts)、[packages/client/modules/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/tests/node-half.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/modules/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/assembled-boot.ts`、`packages/client/hmr/src/events.ts`、`packages/client/hmr/src/index.ts` 看它怎样约束运行时，最后对照 `packages/client/hmr/tests/node-half.client.spec.ts`、`packages/client/modules/tests/node-half.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 568 行；扫描到的声明包括 `orderByModuleGraph`、`bootInjections`、`ClientModuleRegistry`、`MissingClientBundleError`、`ClientPackageCompositionError`、`parseDshClient`、`clientExportOf`、`shortHash`；源码顶部原注释（英文，仅作回查线索）：Node half of the client module system (dsh.client dual-face package): scans the host Loader's entries for packages declaring dsh.client, composes the window.__DSH_BOOT__ entry graph (wire single source: WebBootEntry in ./client/manifest.ts) in module-graph ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-modules. @module @deepseek-ai/dsh-client-modules/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-modules. @module @deepseek-ai/dsh-client-modules/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/tests/loader.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/tests/loader.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“Cordis plugin face”、“rejects activation before the HTML facade creates the module system”、“lazy CJS arrival”、“drains registrations queued by parser-blocking preload scripts into the same live facade”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Cordis plugin face”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `registrationTarget`、`bench`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/modules/src/client/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 414 行；扫描到的声明包括 `registrationTarget`、`bench`；扫描到的测试主题包括 “Cordis plugin face”、“rejects activation before the HTML facade creates the module system”、“lazy CJS arrival”、“drains registrations queued by parser-blocking preload scripts into the same live facade”、“prefetch loads and registers but does not run the factory”、“import materializes once and memoizes the exports”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/tests/node-half.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端的具体场景，包括“HTML bootstrap facade”、“precedes blocking preloads and the boot graph, then becomes the live registration target”、“rejects a page that did not preload the modules bundle”、“rejects a bootstrap bundle with a runtime external”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“HTML bootstrap facade”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Node-half composition diagnostics for package metadata and built client bundles.”；固定提交中扫描到的声明包括 `writePackage`、`writeBuiltPackage`、`constructWithRoute`、`construct`、`injectedFacade`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)、[packages/client/modules/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/modules/src/client/index.ts`、`packages/client/modules/src/index.ts`、`packages/host/webserver/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 339 行；扫描到的声明包括 `writePackage`、`writeBuiltPackage`、`constructWithRoute`、`construct`、`injectedFacade`；扫描到的测试主题包括 “HTML bootstrap facade”、“precedes blocking preloads and the boot graph, then becomes the live registration target”、“rejects a page that did not preload the modules bundle”、“rejects a bootstrap bundle with a runtime external”、“client bundle activation”、“allows sibling dsh roles”；源码顶部原注释（英文，仅作回查线索）：Node-half composition diagnostics for package metadata and built client bundles.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/modules/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/modules/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/modules/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

