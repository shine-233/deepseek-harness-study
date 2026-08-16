# 源文件索引：packages/host

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 101 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理服务端宿主、API 边界的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/host/apiproxy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/index.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-config.spec.ts)、[packages/host/apiproxy/tests/api-proxy-models.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-models.spec.ts)、[packages/host/apiproxy/tests/api-proxy-question.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-question.spec.ts)、[packages/host/apiproxy/tests/api-proxy-subagents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-subagents.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/api/remotes/src/index.ts`、`packages/attachment/attachment/src/index.ts`、`packages/core/agent/src/index.ts` 和 `packages/host/apiproxy/src/index.ts`、`packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts`、`packages/host/apiproxy/tests/api-proxy-approval.spec.ts` 确认输入输出，最后对照 `packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts`、`packages/host/apiproxy/tests/api-proxy-approval.spec.ts`、`packages/host/apiproxy/tests/api-proxy-config.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3744 行；扫描到的声明包括 `DEFAULT_COLD_BLANK_PROBE_MAX_BYTES`、`assertJsonArgs`、`ApiProxyDefaults`、`createApiProxy`、`decodeBase64`、`durablePromptContent`、`imageBlockIn`、`imageInEvent`；源码顶部原注释（英文，仅作回查线索）：Host-side ApiProxy implementation. Signature discipline: unary takes the narrow RpcRequest<P> and echoes request.rpcId on the RpcResponse<T>.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、智能体可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/agent-presets.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的声明包括 `agentPresetEntrySchema`、`agentPresetListRequestSchema`、`agentPresetListValueSchema`、`agentPresetSelectRequestSchema`、`agentPresetSelectValueSchema`、`agentPresetReadRequestSchema`、`agentPresetReadValueSchema`、`agentPresetCopyRequestSchema`；源码顶部原注释（英文，仅作回查线索）：agent-presets domain zod schemas (names derived from map keys: agentPresetListRequestSchema / agentPresetListValueSchema).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/agent-presets.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与服务端宿主、API 边界、智能体的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/rpc.ts` 和 `packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 116 行；扫描到的声明包括 `AgentPresetEntry`、`AgentPresetsApi`；源码顶部原注释（英文，仅作回查线索）：agent-presets domain contract: the roster a browser offers when starting a session, plus the authoring calls behind it. list is ordinary: it carries ids and trust, and every preset picker needs it. The authoring calls are privileged and loopback-pinned — a ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/approvals.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/approvals.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/src/api/events.schema.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `approvalRequestIdSchema`、`approvalResponsePayloadSchema`；源码顶部原注释（英文，仅作回查线索）：approvals domain zod schemas (respond is a client-response; the payload schema serves the /api/respond endpoint's second parse after routing via the pending table). ApprovalRequestId brand cast point: one.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/approvals.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/interaction/user-approval/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/interaction/user-approval/src/types.ts)、[packages/host/apiproxy/src/api/approvals.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.schema.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/interaction/user-approval/src/types.ts` 和 `packages/host/apiproxy/src/api/approvals.schema.ts`、`packages/host/apiproxy/src/api/index.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `ApprovalResponsePayload`；源码顶部原注释（英文，仅作回查线索）：approvals domain contract. The approval requested frame is a server-request (stable rpcId); the answer is a client-response echoing that rpcId (not a unary method, not in RpcMethodMap, mints no new id), carried on POST /api/respond with an RpcReceipt carrie...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/credentials.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/credentials.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)、[packages/host/apiproxy/tests/api-proxy-jobs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-jobs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `credentialRefNameSchema`、`credentialViewSchema`、`credentialsDescribeRequestSchema`、`credentialsDescribeValueSchema`、`credentialsSetRequestSchema`、`credentialsSetValueSchema`、`credentialsUnsetRequestSchema`、`credentialsUnsetValueSchema`；源码顶部原注释（英文，仅作回查线索）：credentials domain zod schemas (names derived from map keys: credentialsDescribeRequestSchema / credentialsDescribeValueSchema / …). The reference-name pattern mirrors the seam's credentialRef guard so an invalid name fails as bad-request before reaching th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/credentials.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/credentials.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.schema.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/rpc.ts` 和 `packages/host/apiproxy/src/api/credentials.schema.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 44 行；扫描到的声明包括 `CredentialView`、`CredentialsApi`；源码顶部原注释（英文，仅作回查线索）：credentials domain contract: the web face of the credential-reference seam (ctx.credentials). Reads are structurally value-free — a credential view carries configured/source/writable and has no slot for the value — and the value crosses the wire in exactly ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/downloads.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/downloads.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/downloads.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/downloads.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)、[packages/host/apiproxy/src/fetch/handler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/handler.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)、[packages/host/apiproxy/tests/api-proxy-jobs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-jobs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/handler.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `sessionLogQuerySchema`；源码顶部原注释（英文，仅作回查线索）：downloads domain zod schemas. The download surface has no wire envelope: the request arrives as query parameters (all strings), so its request schema parses the raw query-parameter object into the method's exact request shape. SessionId brand cast point: se...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/downloads.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/downloads.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/downloads.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/downloads.schema.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts` 和 `packages/host/apiproxy/src/api/downloads.schema.ts`、`packages/host/apiproxy/src/api/index.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `DownloadsApi`；源码顶部原注释（英文，仅作回查线索）：downloads domain contract: host-only download surfaces — the GET-download channel family, the mirror of the SSE-stream events domain. No wire envelope: the carrier's GET routes answer these directly, and the browser IApiClient never exposes them.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、事件可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/approvals.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.schema.ts)、[packages/host/apiproxy/src/api/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.ts)、[packages/host/apiproxy/src/api/jobs.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/jobs.schema.ts)、[packages/client/connection/src/client/web-api-client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/client/web-api-client.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/client/connection/src/client/web-api-client.ts`、`packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `askUserQuestionItemSchema`、`muxFrameSchema`、`hostFrameSchema`；源码顶部原注释（英文，仅作回查线索）：events domain zod schemas: MuxFrame / HostFrame unions (discriminatedUnion('type')). A frame is the payload slot of the ServerRequest full form; the SessionEvent inside a session/event frame reuses sessions.schema's strict-envelope + wide-data passthrough b...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出服务端宿主、API 边界、事件可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/core/tools/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/presentation.ts)、[packages/host/apiproxy/src/api/jobs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/jobs.ts)、[packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.schema.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的入口和消费者，再读当前契约，沿着 `packages/host/apiproxy/src/api/events.schema.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/sessions.schema.ts` 看它怎样约束运行时，最后对照 `packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 155 行；扫描到的声明包括 `ToolEventView`、`QueuedInboxItem`、`EventsApi`、`MuxFrame`、`HostFrame`；源码顶部原注释（英文，仅作回查线索）：events domain contract: signatures and frame unions for the two logical streams. Four-quadrant: streams yield the narrow form RpcRequest<Frame> (server-request view) — rpcId must be exposed to the business layer, because responses to answerable frames (appr...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/goals.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/goals.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)、[packages/host/apiproxy/src/fetch/handler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/handler.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 79 行；扫描到的声明包括 `goalRefSchema`、`goalCreateRequestSchema`、`goalCreateValueSchema`、`goalEditRequestSchema`、`goalEditValueSchema`、`goalPauseRequestSchema`、`goalPauseValueSchema`、`goalResumeRequestSchema`；源码顶部原注释（英文，仅作回查线索）：goals domain zod schemas. Mutation-only shapes: every value schema is a { ref } acknowledgement (clear: { cleared }) — the current goal state travels exclusively on the 'goal' session projection.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/goals.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/goals.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/rpc.ts`、`packages/util/brand/src/index.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `GoalId`、`GoalRef`、`GoalsApi`；源码顶部原注释（英文，仅作回查线索）：goals domain contract. Method signatures are the source of truth: unary methods take the RpcRequest<P> narrow form and the impl echoes rpcId. Mutations only: the read side is the 'goal' session projection (history tail-page projections block + session/proje...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/host.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/host.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/host.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `hostDescribeRequestSchema`、`hostDescribeValueSchema`、`hostPickDirectoryRequestSchema`、`hostPickDirectoryValueSchema`、`directoryEntrySchema`、`hostListDirectoryRequestSchema`、`hostListDirectoryValueSchema`、`hostCreateDirectoryRequestSchema`；源码顶部原注释（英文，仅作回查线索）：host domain zod schemas (names derived from map keys).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/host.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/host.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/host.schema.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/rpc.ts` 和 `packages/host/apiproxy/src/api/host.schema.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 96 行；扫描到的声明包括 `DirectoryEntry`、`DirectoryListing`、`HostApi`；源码顶部原注释（英文，仅作回查线索）：host domain contract. No protocol version: client and host ship together; introduce protocolVersion only when an independently released client appears.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主、API 边界相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/agent-presets.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.ts)、[packages/host/apiproxy/src/api/approvals.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.ts)、[packages/host/apiproxy/src/api/credentials.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.ts)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/client/api.ts)
- 对应测试：[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/client/connection/tests/websocket-downlink.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/websocket-downlink.host.spec.ts)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/host/apiproxy` 的入口和消费者，再读当前契约，沿着 `packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/fixture.ts`、`packages/client/connection/src/client/rpc.ts` 看它怎样约束运行时，最后对照 `packages/client/connection/tests/node-half.host.spec.ts`、`packages/client/connection/tests/websocket-downlink.host.spec.ts`、`packages/client/runtime/tests/client-apply.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `ApiProxy`；源码顶部原注释（英文，仅作回查线索）：apiproxy contract-layer barrel. api/ has zero Node dependencies and is importable from the browser; the TS interfaces are the authoritative contract, while HTTP, WebSocket, and in-process SSE are merely physical channels (four-quadrant message model).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/jobs.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/jobs.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、后台任务可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/jobs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/jobs.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/jobs/jobs/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/jobs/jobs/src/brand.ts)、[packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/ui-conversation/tests/chat-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-conversation/tests/chat-view.client.spec.tsx)、[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-message-feedback/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-message-feedback/tests/controller.client.spec.ts)、[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/api/events.schema.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `taskIdSchema`、`taskViewSchema`；源码顶部原注释（英文，仅作回查线索）：tasks domain zod schemas: the branded job id and the wire view carried by session/jobs frames.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/jobs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/jobs.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/jobs/jobs/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/jobs/jobs/src/brand.ts)、[packages/host/apiproxy/src/api/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/jobs.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/jobs.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/jobs/jobs/src/brand.ts` 和 `packages/host/apiproxy/src/api/events.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/jobs.schema.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的声明包括 `JobView`；源码顶部原注释（英文，仅作回查线索）：Browser-safe background-job domain contract. The registry's live records never cross the wire; a view is the subset a human list needs, minted fresh per push.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/llm.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/llm.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、大语言模型可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/llm.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/llm.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)、[packages/host/apiproxy/tests/api-proxy-jobs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-jobs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `configurableProviderViewSchema`、`llmProvidersRequestSchema`、`llmProvidersValueSchema`、`llmModelsRequestSchema`、`llmModelsValueSchema`、`discoveredModelViewSchema`、`llmDiscoverModelsRequestSchema`、`llmDiscoverModelsValueSchema`；源码顶部原注释（英文，仅作回查线索）：llm domain zod schemas (names derived from map keys: llmProvidersRequestSchema / llmProvidersValueSchema / llmModelsRequestSchema / llmModelsValueSchema).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/llm.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/llm.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/llm.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/llm.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/rpc.ts`、`packages/host/apiproxy/src/api/sessions.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/llm.schema.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `ConfigurableProviderView`、`LlmApi`、`DiscoveredModelView`；源码顶部原注释（英文，仅作回查线索）：llm domain contract: host-scoped provider topology for configuration surfaces. llm.providers merges the configurable-provider directory (which providers CAN be configured, and where their settings live) with the live route registry; llm.models is the sessio...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/questions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/questions.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/questions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/questions.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `askUserQuestionAnswerSchema`、`questionResponsePayloadSchema`；源码顶部原注释（英文，仅作回查线索）：questions domain zod schemas (respond is a client-response; the payload schema serves the /api/respond endpoint's second parse after routing via the pending table). The question identifier is the echoed rpcId; the payload carries no resource id.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/questions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/questions.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/interaction/user-questions/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/interaction/user-questions/src/types.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/questions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/questions.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/interaction/user-questions/src/types.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/questions.schema.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 19 行；扫描到的声明包括 `QuestionResponsePayload`；源码顶部原注释（英文，仅作回查线索）：questions domain contract. The question requested frame is a server-request whose rpcId is the question's stable logical id (minted when the host accepts ask(); core user-questions has no request-level id); the answer is a client-response echoing that rpcId...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责服务端宿主、API 边界、RPC的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/agent-presets.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.ts)、[packages/host/apiproxy/src/api/credentials.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.ts)、[packages/host/apiproxy/src/api/goals.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/goals.ts)、[packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/agent-presets.ts`、`packages/host/apiproxy/src/api/credentials.ts`、`packages/host/apiproxy/src/api/goals.ts` 和 `packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/credentials.schema.ts`、`packages/host/apiproxy/src/api/host.schema.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `RpcMethodMap`、`RequestPayload`、`ResponseValue`；源码顶部原注释（英文，仅作回查线索）：RPC method registry and signature-derived generics. The map registers only client-request methods (respond is a client-response, so it is absent); map keys are the wire path segments (POST /api/session.list).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责服务端宿主、API 边界、RPC的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/client/connection/src/client/web-api-client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/client/web-api-client.ts)、[packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)、[packages/host/apiproxy/src/api/approvals.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.schema.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/rpc.ts` 和 `packages/client/connection/src/client/web-api-client.ts`、`packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/approvals.schema.ts` 确认输入输出，最后对照 `packages/host/apiproxy/tests/rpc-schemas.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `Wire`、`rpcIdSchema`、`rpcErrorSchema`、`rpcResultSchema`、`clientRequestSchema`、`serverResponseSchema`、`serverRequestSchema`、`clientResponseSchema`；源码顶部原注释（英文，仅作回查线索）：Message-layer zod schemas: the four wire full forms + error body + carrier receipt. The payload slot is unknown in the full-form schemas — business payloads get a second parse dispatched by method (two-level parse discipline). Brand cast point: rpcIdSchema,...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责服务端宿主、API 边界、RPC的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/brand.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-config.spec.ts)、[packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/llm/llm/src/brand.ts`、`packages/util/brand/src/index.ts` 和 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/src/api/agent-presets.ts`、`packages/host/apiproxy/src/api/credentials.ts` 确认输入输出，最后对照 `packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts`、`packages/host/apiproxy/tests/api-proxy-approval.spec.ts`、`packages/host/apiproxy/tests/api-proxy-blank.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 193 行；扫描到的声明包括 `RpcId`、`RpcErrorDetailsMap`、`RpcErrorCode`、`RpcError`、`RpcResult`、`transportError`、`RpcRequest`、`RpcResponse`；源码顶部原注释（英文，仅作回查线索）：Four-quadrant RPC message model. Channels and messages are decoupled: HTTP, WebSocket, and in-process SSE are physical carriers, while logical messages are channel-independent and form a four-member discriminated union. api/ contract layer: zero Node depend...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/session-search.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/session-search.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护服务端宿主、API 边界、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/sessions.schema.ts` 理解状态变化，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `SESSION_SEARCH_RESULT_LIMIT`、`SESSION_SEARCH_SNIPPET_MAX_CODE_POINTS`、`truncateUnicodeCodePoints`；源码顶部原注释（英文，仅作回查线索）：Maximum number of sessions returned by one sidebar search.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护服务端宿主、API 边界、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/events.ts` 和 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/approvals.schema.ts` 理解状态变化，最后对照 `packages/host/apiproxy/tests/rpc-schemas.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 353 行；扫描到的声明包括 `sessionIdSchema`、`messageIdSchema`、`workspaceIdSchema`、`sessionEventSchema`、`sessionSummarySchema`、`sessionListRequestSchema`、`sessionListValueSchema`、`sessionSearchRequestSchema`；源码顶部原注释（英文，仅作回查线索）：sessions domain zod schemas (names derived from map keys: sessionListRequestSchema / sessionListValueSchema). SessionEvent passthrough = strict envelope (type/seq/time) + wide data: the merge-extensible event API keeps an unknown-type branch at the union le...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护服务端宿主、API 边界、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/events.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/llm.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 理解状态变化，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 373 行；扫描到的声明包括 `SessionListMetadata`、`HistoryEntry`、`SessionProjectionsBlock`、`PromptContentPart`、`ModelSelection`、`ModelReasoningEffort`、`ModelReasoning`、`ModelCatalogModel`；源码顶部原注释（英文，仅作回查线索）：sessions domain contract. Method signatures are the source of truth: unary methods take the RpcRequest<P> narrow form and the impl echoes rpcId; everything else references RequestPayload<'session.*'> / ResponseValue<'session.*'>.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/settings.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/settings.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/api/settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/settings.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)、[packages/host/apiproxy/tests/api-proxy-jobs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-jobs.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `settingsSecretViewSchema`、`settingsNamespaceViewSchema`、`settingsDescribeRequestSchema`、`settingsDescribeValueSchema`、`settingsOpenDocumentRequestSchema`、`settingsOpenDocumentValueSchema`、`settingsUpdateRequestSchema`、`settingsUpdateValueSchema`；源码顶部原注释（英文，仅作回查线索）：settings domain zod schemas (names derived from map keys: settingsDescribeRequestSchema / settingsDescribeValueSchema / settingsUpdate* / settingsReplace*).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/settings.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/settings.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/settings.schema.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/rpc.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts`、`packages/host/apiproxy/src/api/settings.schema.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的声明包括 `SettingsSecretView`、`SettingsNamespaceView`、`SettingsPathOpView`、`SettingsApi`；源码顶部原注释（英文，仅作回查线索）：settings domain contract: the web face of the user-settings seam (ctx.settings). Every payload that leaves this domain is redacted by the seam (describe({ redactSecrets: true }) semantics): role('secret') fields never ride a response in any layer, and the s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/skills.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/skills.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `skillEntrySchema`、`skillListRequestSchema`、`skillListValueSchema`；源码顶部原注释（英文，仅作回查线索）：skills domain zod schemas (names derived from map keys: skillListRequestSchema / skillListValueSchema).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/skills.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/skills.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/rpc.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts`、`packages/host/apiproxy/src/api/skills.schema.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `SkillEntry`、`SkillsApi`；源码顶部原注释（英文，仅作回查线索）：skills domain contract: read-only skill catalog lookup addressed by session. The session's header cwd resolves to the canonical project root host-side — the client never submits a raw path, and skill lookup never creates or resumes an Agent.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/subagents.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/subagents.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts`、`packages/host/apiproxy/tests/rpc-schemas.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 90 行；扫描到的声明包括 `subagentListEntrySchema`、`subagentListRequestSchema`、`subagentListValueSchema`、`subagentHistoryRequestSchema`、`subagentHistoryValueSchema`、`subagentPromptRequestSchema`、`subagentInterruptRequestSchema`、`subagentInterruptValueSchema`；源码顶部原注释（英文，仅作回查线索）：Zod schemas for the browser-safe subagent domain.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/subagents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/subagents.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/api/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/rpc.ts`、`packages/host/apiproxy/src/api/sessions.ts` 和 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts`、`packages/host/apiproxy/src/api/subagents.schema.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 120 行；扫描到的声明包括 `SubagentListEntry`、`SubagentPromptReceipt`、`SubagentInterruptReceipt`、`SubagentAddress`、`SubagentCatalog`、`SubagentsApi`；源码顶部原注释（英文，仅作回查线索）：Browser-safe subagent domain contract. Persisted transcript reads never activate an Agent, while continuable prompts route through the exact live direct parent into the child's Agent inbox.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/workspace.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/workspace.schema.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义服务端宿主、API 边界、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/rpc-map.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc-map.ts)、[packages/host/apiproxy/src/api/rpc.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.schema.ts)、[packages/host/apiproxy/src/api/sessions.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/sessions.schema.ts)、[packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.schema.ts)
- 对应测试：[packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 或发布说明，再读本配置/脚本，沿着 `packages/host/apiproxy/src/api/events.schema.ts`、`packages/host/apiproxy/src/fetch/client.ts`、`packages/host/apiproxy/src/fetch/handler.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `workspaceViewSchema`、`workspaceListRequestSchema`、`workspaceListValueSchema`、`workspaceCreateRequestSchema`、`workspaceCreateValueSchema`、`workspaceRenameRequestSchema`、`workspaceRenameValueSchema`、`workspaceDeleteRequestSchema`；源码顶部原注释（英文，仅作回查线索）：workspace domain zod schemas (names derived from map keys). The WorkspaceId brand cast lives in sessions.schema (see the note there) and is re-exported here as the domain-local name.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/api/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/workspace.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：宿主 API 资源处理
- 这个文件有什么用：这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。
- 为什么这样设计：每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/host/apiproxy/src/api/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.client.spec.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/api-helpers.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/api-helpers.client.spec.ts)、[packages/client/connection/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/client-apply.client.spec.ts)、[packages/client/connection/tests/connection.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/connection.client.spec.ts)、[packages/client/connection/tests/fixture-commands.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/fixture-commands.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/core/session/src/types.ts`、`packages/host/apiproxy/src/api/rpc.ts`、`packages/util/brand/src/index.ts` 和 `packages/host/apiproxy/src/api/events.ts`、`packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc-map.ts` 确认输入输出，最后对照 `packages/api/gateway/tests/gateway.client.spec.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/api-helpers.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 109 行；扫描到的声明包括 `WorkspaceId`、`WorkspaceView`、`WorkspaceApi`；源码顶部原注释（英文，仅作回查线索）：workspace domain contract. Wire projection of the host-side workspace entity (@deepseek-ai/dsh-workspace): a stable id over a directory path, a display title, and the ordered session account. Method signatures are the source of truth, same as the sessions d...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成服务端宿主、请求获取、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)、[packages/host/apiproxy/src/api/credentials.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.schema.ts)、[packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.schema.ts)、[packages/host/apiproxy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/index.ts)
- 对应测试：[packages/host/apiproxy/tests/fetch-carrier.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/fetch-carrier.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/credentials.schema.ts`、`packages/host/apiproxy/src/api/events.schema.ts` 和 `packages/host/apiproxy/src/index.ts`、`packages/host/apiproxy/tests/fetch-carrier.spec.ts` 确认输入输出，最后对照 `packages/host/apiproxy/tests/fetch-carrier.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 549 行；扫描到的声明包括 `IApiClient`、`InProcessApiClient`、`abortError`；源码顶部原注释（英文，仅作回查线索）：Client side of the fetch carrier. AbstractApiClient holds every protocol invariant: rpcId minting, four-quadrant envelope wrap/unwrap, zod parsing, in-process SSE frame decoding, and the payload-direct IApiClient domain methods (business code never mints). ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/fetch/handler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/handler.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：API Fetch 处理器
- 这个文件有什么用：它把 API proxy 的资源定义转换成 Fetch handler，统一处理方法匹配、单请求调用、完整响应和错误响应。
- 为什么这样设计：资源定义与 Fetch 协议之间需要一次统一转换，方法匹配、单请求调用、完整响应和错误响应不能由每个资源重复实现；集中处理使 API proxy 的行为保持一致。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)、[packages/host/apiproxy/src/api/credentials.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/credentials.schema.ts)、[packages/host/apiproxy/src/api/downloads.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/downloads.schema.ts)、[packages/host/apiproxy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/index.ts)
- 对应测试：[packages/host/apiproxy/tests/fetch-carrier.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/fetch-carrier.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/credentials.schema.ts`、`packages/host/apiproxy/src/api/downloads.schema.ts` 和 `packages/host/apiproxy/src/index.ts`、`packages/host/apiproxy/tests/fetch-carrier.spec.ts` 确认输入输出，最后对照 `packages/host/apiproxy/tests/fetch-carrier.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 320 行；扫描到的声明包括 `toFetchHandler`、`methodFor`、`errorResponse`、`fullResponse`、`handleUnary`、`fullFrame`、`sseResponse`；源码顶部原注释（英文，仅作回查线索）：Server side of the fetch carrier: maps an ApiProxy onto a pure WHATWG Request->Response function. Two-level parse: full form (type/rpcId/method + path==method) -> payload dispatched per method. HTTP status expresses only the carrier (404 unknown path / 415 ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent-default-model/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-default-model/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/client/connection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/src/index.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)、[packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)、[packages/host/apiproxy/tests/api-proxy-jobs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-jobs.spec.ts)、[packages/host/apiproxy/tests/api-proxy-projections.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-projections.spec.ts)、[packages/host/apiproxy/tests/api-proxy-rename.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-rename.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的入口和消费者，再读当前契约，沿着 `packages/client/connection/src/index.ts`、`packages/host/apiproxy/tests/api-proxy-blank.spec.ts`、`packages/host/apiproxy/tests/api-proxy-cold.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/apiproxy/tests/api-proxy-blank.spec.ts`、`packages/host/apiproxy/tests/api-proxy-cold.spec.ts`、`packages/host/apiproxy/tests/api-proxy-fork.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `Config`、`ApiProxyService`；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-host-apiproxy — the API gateway every client shape shares: the ApiProxy contract (api/: types + zod schemas, browser-safe), the fetch carrier pair (fetch/: toFetchHandler on the host side, AbstractApiClient + platform subclasses on the clie...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-host-apiproxy. @module @deepseek-ai/dsh-host-apiproxy/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/native-path-opener.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/native-path-opener.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：路径边界
- 这个文件有什么用：它负责服务端宿主、原生边界、路径的解析、规范化和安全约束，统一处理不同平台的路径差异与越界检查。
- 为什么这样设计：路径是跨平台且涉及安全的输入，集中规范化和越界判断可以避免不同调用方产生不一致的文件目标。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/util/native-command/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/native-command/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)、[packages/host/apiproxy/tests/native-path-opener.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/native-path-opener.spec.ts)
- 对应测试：[packages/host/apiproxy/tests/native-path-opener.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/native-path-opener.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/apiproxy` 的 README 和入口，再读当前实现，沿着 `packages/util/native-command/src/index.ts` 和 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/tests/native-path-opener.spec.ts` 确认输入输出，最后对照 `packages/host/apiproxy/tests/native-path-opener.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `PathOpenerRunner`、`PathOpenerInternals`、`canOpenNativePath`、`openNativePath`、`openNativeTextFile`、`macBundleForHttps`、`openInBrowser`、`powershellLiteral`；源码顶部原注释（英文，仅作回查线索）：Cross-platform native path and text-document openers used by the local GUI carrier. The default intent prefers the default browser for documents it renders when the platform can name one, then falls back to the default application. WSL translates every path...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/src/session-export.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/session-export.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护服务端宿主、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)、[packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/core/session/src/index.ts`、`packages/session-query/session-query/src/index.ts` 和 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/src/index.ts` 理解状态变化，最后对照 `packages/api/gateway/tests/gateway.host.spec.ts`、`packages/client/connection/tests/node-half.host.spec.ts`、`packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 457 行；扫描到的声明包括 `SessionLogCompressionLevel`、`DEFAULT_SESSION_LOG_COMPRESSION_LEVEL`、`SessionLogExportDeps`、`SessionLogExportReady`、`sessionLogExportDeps`、`flushLiveSessionLog`、`SessionLogZipEntry`、`sessionLogZipFilename`；源码顶部原注释（英文，仅作回查线索）：Host-side session-log download: streams one ZIP archive whose files are the sessions' stored artifact text verbatim plus every referenced media object. The root artifact sits under its original base name (session.jsonl); each subagent descendant under subag...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界、智能体的具体场景，包括“session.create with an agent preset”、“records the resolved preset on the session header”、“records the default when the caller names none”、“rejects an unknown preset and names the ones that exist”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session.create with an agent preset”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/goal/goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/goal/goal/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/goal/goal/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 730 行；扫描到的声明包括 `request`、`stubAgent`、`roster`、`harness`；扫描到的测试主题包括 “session.create with an agent preset”、“records the resolved preset on the session header”、“records the default when the caller names none”、“rejects an unknown preset and names the ones that exist”、“refuses to adopt a live session under a different preset”、“adopts a live session under the preset it SWITCHED to”；源码顶部原注释（英文，仅作回查线索）：A session's agent preset is fixed at creation. The gateway records the resolved id on the header and refuses to adopt the identity under a different one, because the session's history was produced under that preset's tools: rebuilding it differently would r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“approval pending registry”、“round-trips ask → requested frame → respond → outcome + resolved broadcast”、“replays a still-pending requested frame (same rpcId) on a later mux open”、“rejects malformed and mismatched answers as bad-response, unknown ids as not-pending”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“approval pending registry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 330 行；扫描到的声明包括 `harness`、`agentOf`、`openMux`、`requestedOf`、`waitForCount`、`answer`；扫描到的测试主题包括 “approval pending registry”、“round-trips ask → requested frame → respond → outcome + resolved broadcast”、“replays a still-pending requested frame (same rpcId) on a later mux open”、“rejects malformed and mismatched answers as bad-response, unknown ids as not-pending”、“withdraws the question on the ask signal: cancelled outcome, resolved broadcast, late answer not-pending”、“an ask whose signal aborted before dispatch settles cancelled without publishing”；源码顶部原注释（英文，仅作回查线索）：Approval pending registry over the proxy: an ask through ctx.approval becomes an answerable approval/requested mux frame (stable rpcId, replayed verbatim on a later mux open), respond routes by the echoed rpcId and validates the audit correlation, and the a...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“summary blank = conversation not started”、“standalone events (command lifecycle, plan/mode, title) keep the session blank”、“the first turn clears blank”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“summary blank = conversation not started”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 85 行；扫描到的声明包括 `request`、`harness`、`appendStandalone`、`listBlank`；扫描到的测试主题包括 “summary blank = conversation not started”、“standalone events (command lifecycle, plan/mode, title) keep the session blank”、“the first turn clears blank”；源码顶部原注释（英文，仅作回查线索）：The summary blank bit means "conversation not started" (no turn has run), not "log empty": standalone plugin events — command lifecycle records, plan/mode, permission knob events, session titles — never flip it, so running /plan or /goal on a fresh session ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-cold.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-cold.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“sessions.list cold merge”、“verifies only small possibly-blank artifacts and treats every unavailable probe as visible”、“can disable bounded blank probes without hiding cold Sessions”、“replaces a probed cold row with the live Session that attached during the read”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“sessions.list cold merge”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api/rpc.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 801 行；扫描到的声明包括 `request`、`header`；扫描到的测试主题包括 “sessions.list cold merge”、“verifies only small possibly-blank artifacts and treats every unavailable probe as visible”、“can disable bounded blank probes without hiding cold Sessions”、“replaces a probed cold row with the live Session that attached during the read”、“attached updatedAt tracks human prompts”、“ignores pickup and non-prompt work after the latest human message”；源码顶部原注释（英文，仅作回查线索）：Cold-session and degenerate-composition paths of the host ApiProxy: metadata-only listing, Agent-free history reads, subagent ownership isolation, and prompt failure mapping.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-config.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“settings domain”、“reports an actionable error when no settings provider is mounted”、“describes layered redacted namespaces with their secret slots”、“opens the provider-resolved document without accepting a browser path”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“settings domain”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent-default-model/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-default-model/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-default-model/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 779 行；扫描到的声明包括 `request`、`expectOk`、`expectErr`、`MemorySettings`、`MemoryCredentials`、`CatalogAdapter`、`BrokenCatalogAdapter`、`harness`；扫描到的测试主题包括 “settings domain”、“reports an actionable error when no settings provider is mounted”、“describes layered redacted namespaces with their secret slots”、“opens the provider-resolved document without accepting a browser path”、“refuses to open settings when the provider has no local document”、“does not prepare or open a settings document after cancellation”；源码顶部原注释（英文，仅作回查线索）：Settings/credentials/llm RPC domains and their host-stream frames over createApiProxy: layered redacted describe, write-path rejection mapping, value-free credential views, the directory/live-route merge, and the three invalidation frames (settings/credenti...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-fork.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-fork.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“sessions.fork”、“cuts at the anchored completed turn and records lineage and cwd”、“attaches a subagent fork to its nearest workspace-owning ancestor”、“forks a persisted subagent without resuming its Agent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“sessions.fork”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 289 行；扫描到的声明包括 `request`、`composed`、`liveAgent`；扫描到的测试主题包括 “sessions.fork”、“cuts at the anchored completed turn and records lineage and cwd”、“attaches a subagent fork to its nearest workspace-owning ancestor”、“forks a persisted subagent without resuming its Agent”、“uses the last completed turn only for omitted and past-end anchors”、“cuts through an aborted turn: stopped is closed, not open”；源码顶部原注释（英文，仅作回查线索）：Session-fork boundaries, lineage, and inherited model routing.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-jobs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-jobs.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界、后台任务的具体场景，包括“session/jobs subscription baseline”、“is omitted for a session with no tasks — absence is the empty set”、“carries the live set for a session that already has tasks when the stream opens”、“session/jobs change pushes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session/jobs subscription baseline”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 263 行；扫描到的声明包括 `producer`、`harness`、`collect`；扫描到的测试主题包括 “session/jobs subscription baseline”、“is omitted for a session with no tasks — absence is the empty set”、“carries the live set for a session that already has tasks when the stream opens”、“session/jobs change pushes”、“pushes the owner\”、“drops ownerSession, reported, and outputLimitBytes from the wire view”；源码顶部原注释（英文，仅作回查线索）：Background-task carrier paths of the host ApiProxy: the subscription baseline is sent only for a session that has tasks, every registry change pushes that owner's whole set, an unowned change fans out to every subscribed session, the projection drops the th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-models.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-models.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“Web session model selection”、“validates an ordered image batch before persisting any member”、“refuses a text-only selection while durable or pending image content remains visible”、“authorizes attachment bytes only when the session event stream references the id”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Web session model selection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 500 行；扫描到的声明包括 `request`、`CatalogAdapter`、`harness`、`expectValue`、`registerTextOnly`；扫描到的测试主题包括 “Web session model selection”、“validates an ordered image batch before persisting any member”、“refuses a text-only selection while durable or pending image content remains visible”、“authorizes attachment bytes only when the session event stream references the id”、“groups successful providers and leaves an unlisted current selection out of the catalog”、“accepts an advisory-unlisted model, rejects an unavailable provider, and switches only after the next assembly”；源码顶部原注释（英文，仅作回查线索）：Web session model-directory and selection behavior: dynamic provider grouping, provider-local catalog failures, logged-selection restoration without stale catalog injection, advisory pass-through models, and the prompt-assembly boundary for a running select...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-projections.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-projections.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“session.history projections block”、“serves the unit value on the tail page with asOfSeq = last event seq”、“publishes the attachments imageLimits as a constant unit while both seams are composed”、“leaves the imageLimits key absent while no attachment service is composed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session.history projections block”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 344 行；扫描到的声明包括 `request`、`harness`、`seedMessages`、`collect`；扫描到的测试主题包括 “session.history projections block”、“serves the unit value on the tail page with asOfSeq = last event seq”、“publishes the attachments imageLimits as a constant unit while both seams are composed”、“leaves the imageLimits key absent while no attachment service is composed”、“never carries the block on loadOlder pages (beforeSeq present)”、“serves no block when the composition has no projection registry”；源码顶部原注释（英文，仅作回查线索）：Projection carrier paths of the host ApiProxy: the history tail page's projections block reads the registry's watermark snapshot (asOfSeq = last event seq, one consistent cut); loadOlder pages never carry the block; a composition without the registry serves...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-question.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-question.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“question response validation”、“accepts selected options with custom text for multi-select questions”、“keeps selected options and custom text mutually exclusive for single-select questions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“question response validation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api-proxy.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 120 行；扫描到的声明包括 `harness`、`agent`、`openMux`、`answer`；扫描到的测试主题包括 “question response validation”、“accepts selected options with custom text for multi-select questions”、“keeps selected options and custom text mutually exclusive for single-select questions”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-rename.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-rename.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“sessions.rename”、“accepts through the composed title service: normalized user-source event, echoed seq”、“maps only an empty-normalizing title to title-invalid, with a presentable message”、“maps a non-validation rename failure (stale session object) to internal, not title-invalid”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“sessions.rename”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api/rpc.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `request`、`composed`、`liveAgent`；扫描到的测试主题包括 “sessions.rename”、“accepts through the composed title service: normalized user-source event, echoed seq”、“maps only an empty-normalizing title to title-invalid, with a presentable message”、“maps a non-validation rename failure (stale session object) to internal, not title-invalid”、“answers internal when the composition mounts no session-title service”；源码顶部原注释（英文，仅作回查线索）：sessions.rename delegation through the composed SessionTitleService. The agent factory is a structural stub whose createAgent forwards seed/meta into the real SessionStore, and whose resume never runs (every source here is already attached). Cold-session re...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-search.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-search.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“session.search”、“searches only list-visible ids and current conversation-message events”、“returns an empty page without invoking the index when no session is visible”、“rejects snippets whose recorded provider violates the Host filters”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session.search”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 880 行；扫描到的声明包括 `request`、`header`、`hit`、`baseContext`；扫描到的测试主题包括 “session.search”、“searches only list-visible ids and current conversation-message events”、“returns an empty page without invoking the index when no session is visible”、“rejects snippets whose recorded provider violates the Host filters”、“pages the globally ranked stream until the 20-item Host boundary is known”、“learns a provider maxLimit of 10 and collects the 20-item result plus lookahead”；源码顶部原注释（英文，仅作回查线索）：Host session.search projection: list-equivalent visibility, fixed message filters and result bound, cancellation mapping, and unavailable/failure behavior.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-subagents.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-subagents.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“subagent gateway”、“lists the complete catalog and reports exact live-parent availability”、“derives catalog activity from the live child Agent rather than Session residency”、“reads a healthy direct child without looking up or activating any Agent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“subagent gateway”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/src/api/rpc.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 408 行；扫描到的声明包括 `request`、`bench`；扫描到的测试主题包括 “subagent gateway”、“lists the complete catalog and reports exact live-parent availability”、“derives catalog activity from the live child Agent rather than Session residency”、“reads a healthy direct child without looking up or activating any Agent”、“serves a live child from the in-memory snapshot and the watermark projections”、“serves the page without projections when a hostile unit breaks the fold”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-view.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-view.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“mux live view computation”、“attaches the three standard card views, omits view without a presenter, soft-falls on t...”、“serves history entries with call/result views, backscan pairing, and soft-falls”、“counts only append-origin messages toward maxMessages and keeps each compaction summary...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mux live view computation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 335 行；扫描到的声明包括 `tool`、`appendUserText`、`appendAssistantText`、`appendExtension`、`harness`、`collect`；扫描到的测试主题包括 “mux live view computation”、“attaches the three standard card views, omits view without a presenter, soft-falls on throw”、“serves history entries with call/result views, backscan pairing, and soft-falls”、“counts only append-origin messages toward maxMessages and keeps each compaction summary with its replacement”、“drops a disposed session from the live open-call table (result after dispose gets no view)”、“pairs a result after turn/end via the in-memory backscan fallback”；源码顶部原注释（英文，仅作回查线索）：Tool-card view computation over the mux live path: three standard card types arrive on the frame, a presenterless tool ships no view field, a call-only presenter keeps raw result content out of the view payload, and a throwing presenter soft-falls to no vie...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/api-proxy-workspace.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-workspace.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、API 边界的具体场景，包括“host.pickDirectory”、“returns a selected path or explicit cancellation from the native capability”、“propagates abort into the native capability as a cancelled RPC error”、“folds a non-abort native-chooser failure into an internal error”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“host.pickDirectory”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/storage/storage-domain/tests/helpers/memory-backend.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/api/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 570 行；扫描到的声明包括 `request`、`expectOk`、`nextHostFrame`、`stubAgent`、`harness`、`stageDir`；扫描到的测试主题包括 “host.pickDirectory”、“returns a selected path or explicit cancellation from the native capability”、“propagates abort into the native capability as a cancelled RPC error”、“folds a non-abort native-chooser failure into an internal error”、“refuses the native RPC under a browse composition”、“host.listDirectory / host.createDirectory”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/client-handler.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/client-handler.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、浏览器端的具体场景，包括“unary round trip”、“carries payload out and value back through the full wire form”、“round-trips a trimmed session search query and its bounded result metadata”、“rejects an overlong session-search snippet at the client value boundary”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“unary round trip”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/host/apiproxy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 815 行；扫描到的声明包括 `ok`、`scriptedApi`、`client`、`recorderInto`、`Probe`；扫描到的测试主题包括 “unary round trip”、“carries payload out and value back through the full wire form”、“round-trips a trimmed session search query and its bounded result metadata”、“rejects an overlong session-search snippet at the client value boundary”、“routes session fork with its optional cut anchor through the wire”、“routes workspace rename, delete, and ordering through the wire”；源码顶部原注释（英文，仅作回查线索）：Wire-protocol coverage over the isomorphic point: InProcessApiClient → toFetchHandler(scripted impl) runs the real envelope wrap/unwrap, zod two-level parse, rpcId discipline, and SSE framing with no network and no browser. Each case scripts its own minimal...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/fetch-carrier.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/fetch-carrier.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、请求获取的具体场景，包括“unary round trip (handler ⇄ client, no network)”、“carries a success result and echoes the minted rpcId”、“carries the tail-page projections block through the wire schema (Zod must not strip it)”、“carries a business error as 200 + error result”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“unary round trip (handler ⇄ client, no network)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/index.ts)、[packages/host/apiproxy/src/api/rpc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/rpc.ts)、[packages/host/apiproxy/src/fetch/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/fetch/client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/apiproxy/src/api/index.ts`、`packages/host/apiproxy/src/api/rpc.ts`、`packages/host/apiproxy/src/fetch/client.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 805 行；扫描到的声明包括 `fakeApi`、`client`、`collect`、`Probe`；扫描到的测试主题包括 “unary round trip (handler ⇄ client, no network)”、“carries a success result and echoes the minted rpcId”、“carries the tail-page projections block through the wire schema (Zod must not strip it)”、“carries a business error as 200 + error result”、“covers create/prompt/updateQueue/cancel/describe passthrough”、“round-trips every agent-preset method, authoring included”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/native-path-opener.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/native-path-opener.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、原生边界、路径的具体场景，包括“native path opener”、“opens with macOS open(1)”、“bypasses macOS file associations for text documents”、“uses the Linux desktop association for text documents”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“native path opener”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/native-path-opener.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/native-path-opener.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/apiproxy/src/native-path-opener.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 321 行；扫描到的测试主题包括 “native path opener”、“opens with macOS open(1)”、“bypasses macOS file associations for text documents”、“uses the Linux desktop association for text documents”、“rejects an empty WSL path translation before invoking Windows”、“does not invoke Windows when the request aborts during WSL path translation”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/rpc-schemas.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/rpc-schemas.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、RPC的具体场景，包括“RpcId”、“brands a raw string at zero runtime cost”、“transportError”、“folds Error and non-Error throws into the internal error branch”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“RpcId”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/host/apiproxy/src/api/agent-presets.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/agent-presets.schema.ts)、[packages/host/apiproxy/src/api/approvals.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/approvals.schema.ts)、[packages/host/apiproxy/src/api/events.schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api/events.schema.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/apiproxy/src/api/agent-presets.schema.ts`、`packages/host/apiproxy/src/api/approvals.schema.ts`、`packages/host/apiproxy/src/api/events.schema.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 570 行；扫描到的测试主题包括 “RpcId”、“brands a raw string at zero runtime cost”、“transportError”、“folds Error and non-Error throws into the internal error branch”、“rpcErrorSchema”、“accepts every code branch with its required details”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/apiproxy/tests/session-export.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/session-export.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、会话的具体场景，包括“session export compression config”、“defaults to level 6 and rejects values outside the integer 0-9 range”、“cold blank probe config”、“accepts a per-Session byte bound including zero and rejects invalid bounds”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session export compression config”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/apiproxy/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/host/apiproxy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/core/session/src/index.ts`、`packages/host/apiproxy/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 723 行；扫描到的声明包括 `header`、`artifact`、`node`、`storedImage`、`imageEventLine`、`buildApi`、`responseBytes`；扫描到的测试主题包括 “session export compression config”、“defaults to level 6 and rejects values outside the integer 0-9 range”、“cold blank probe config”、“accepts a per-Session byte bound including zero and rejects invalid bounds”、“session.export download endpoint”、“streams a ZIP with the root artifact verbatim under its original filename”；源码顶部原注释（英文，仅作回查线索）：session.export host path: the GET download endpoint streams a ZIP whose files are the stored artifacts verbatim (root + optional descendants), and the degenerate compositions fail loudly (missing services → 500, missing root → 404, missing descendant → erro...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-auto/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/directory-picker-auto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/README.md)、[packages/host/directory-picker-auto/src/probe.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/probe.ts)、[packages/host/directory-picker-auto/src/resolve.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/resolve.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)、[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)
- 对应测试：[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-auto` 的入口和消费者，再读当前契约，沿着 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `name`、`inject`、`BACKEND_PACKAGES`、`SURFACE_PACKAGES`、`apply`；源码顶部原注释（英文，仅作回查线索）：Adaptive chooser of the directory-picker seam: resolves the host's situation once at boot (bind host, SSH launch, display session, Linux chooser binary) and mounts the matching interaction — native or browse — as real Loader entries in the in-memory root tr...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-auto/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主、目录必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/directory-picker-auto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the adaptive directory-picker chooser. @module @deepseek-ai/dsh-host-directory-picker-auto/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-auto/src/probe.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/probe.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-auto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/README.md)、[packages/host/directory-picker-auto/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/index.ts)、[packages/host/directory-picker-auto/tests/resolve.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/resolve.spec.ts)
- 对应测试：[packages/host/directory-picker-auto/tests/resolve.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/resolve.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-auto` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/host/directory-picker-auto/src/index.ts`、`packages/host/directory-picker-auto/tests/resolve.spec.ts` 确认输入输出，最后对照 `packages/host/directory-picker-auto/tests/resolve.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 44 行；扫描到的声明包括 `canExecute`、`hasLinuxChooserBinary`；源码顶部原注释（英文，仅作回查线索）：PATH probe for the native backend's Linux chooser binaries: one boot-time sampled fact for the resolver, so an attended Linux host without zenity/kdialog keeps the working browse interaction instead of a backend whose every pick fails. @module @deepseek-ai/...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-auto/src/resolve.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/resolve.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-auto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/README.md)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)、[packages/host/directory-picker-auto/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/index.ts)、[packages/host/directory-picker-auto/tests/resolve.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/resolve.spec.ts)
- 对应测试：[packages/host/directory-picker-auto/tests/resolve.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/resolve.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-auto` 的 README 和入口，再读当前实现，沿着 `packages/host/webserver/src/index.ts` 和 `packages/host/directory-picker-auto/src/index.ts`、`packages/host/directory-picker-auto/tests/resolve.spec.ts` 确认输入输出，最后对照 `packages/host/directory-picker-auto/tests/resolve.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `DirectoryPickerBackendKind`、`DirectoryPickerEnv`、`DirectoryPickerHostFacts`、`resolveDirectoryPickerBackend`；源码顶部原注释（英文，仅作回查线索）：Boot-time backend resolution for the adaptive directory-picker composition: one pure decision from sampled host facts to a concrete backend kind. The caller samples exactly once per boot, so the mounted capability stays stable for the service lifetime as th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录的具体场景，包括“real Loader composition”、“mounts the native backend for an attended loopback host and unmounts it on disposal”、“mounts the browse backend under an SSH launch”、“mounts the browse backend for an all-interfaces bind even on an attended host”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-auto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/README.md)、[packages/host/directory-picker-auto/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/index.ts)、[packages/host/directory-picker-browse/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/src/index.ts)、[packages/host/directory-picker-native/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-auto/src/index.ts`、`packages/host/directory-picker-browse/src/index.ts`、`packages/host/directory-picker-native/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 263 行；扫描到的声明包括 `surfaceModule`、`loadComposition`、`entryNames`、`stubAttendedHost`；扫描到的测试主题包括 “real Loader composition”、“mounts the native backend for an attended loopback host and unmounts it on disposal”、“mounts the browse backend under an SSH launch”、“mounts the browse backend for an all-interfaces bind even on an attended host”、“unmounts the backend when the surface entry fails to load”、“tolerates the mounted entry being removed by the tree before the chooser unloads”；源码顶部原注释（英文，仅作回查线索）：REAL-composition coverage: a test-only cordis.yml booted through the vendored Loader mounts the webserver row plus the adaptive chooser, and the assertions observe the durable outcome — which backend and surface entries the chooser mounted into the Loader s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-auto/tests/resolve.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/resolve.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、解析的具体场景，包括“resolveDirectoryPickerBackend”、“resolves native for a loopback bind on a display platform”、“resolves browse for an all-interfaces bind regardless of other signals”、“resolves browse under an SSH launch (either env marker)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveDirectoryPickerBackend”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-auto/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/README.md)、[packages/host/directory-picker-auto/src/probe.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/probe.ts)、[packages/host/directory-picker-auto/src/resolve.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/src/resolve.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-auto/src/probe.ts`、`packages/host/directory-picker-auto/src/resolve.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的测试主题包括 “resolveDirectoryPickerBackend”、“resolves native for a loopback bind on a display platform”、“resolves browse for an all-interfaces bind regardless of other signals”、“resolves browse under an SSH launch (either env marker)”、“requires a display session and a chooser binary on linux”、“resolves browse on platforms the native backend cannot serve, display or not”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-browse/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/README.md)、[packages/host/directory-picker/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)、[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)
- 对应测试：[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)、[packages/host/directory-picker-browse/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/tests/service.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-browse` 的入口和消费者，再读当前契约，沿着 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts`、`packages/host/directory-picker-browse/tests/service.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts`、`packages/host/directory-picker-browse/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 324 行；扫描到的声明包括 `fullyQualified`、`ListingCandidate`、`boundedInsert`、`raceAbort`、`Config`、`BrowseDirectoryPicker`、`ancestryCrumbs`、`asError`；源码顶部原注释（英文，仅作回查线索）：Browse backend of the directory-picker seam: registers ctx.directoryPicker with the browse capability — one-level directory listing and child-directory creation over the host filesystem via Node's stdlib (which already carries the per-OS adaptation). Nothin...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-browse/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主、目录必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the browse directory-picker backend. @module @deepseek-ai/dsh-host-directory-picker-browse/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-browse/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/tests/service.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录的具体场景，包括“BrowseDirectoryPicker”、“lists directories only, flags hidden rows, follows symlinks, skips broken links, sorts ...”、“cuts a level at maxEntries keeping the name-sorted head, and flags the cut”、“stops the scan with the caller: an aborted signal rejects with its own reason”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“BrowseDirectoryPicker”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/README.md)、[packages/host/directory-picker-browse/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/src/index.ts)、[packages/host/directory-picker/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-browse/src/index.ts`、`packages/host/directory-picker/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 231 行；扫描到的测试主题包括 “BrowseDirectoryPicker”、“lists directories only, flags hidden rows, follows symlinks, skips broken links, sorts by name”、“cuts a level at maxEntries keeping the name-sorted head, and flags the cut”、“stops the scan with the caller: an aborted signal rejects with its own reason”、“raceAbort follows the operation until the signal wins, and swallows the abandoned settlement”、“boundedInsert keeps the window name-sorted and bounded, reporting evictions”；源码顶部原注释（英文，仅作回查线索）：Behavior of the browse backend over a real temporary directory tree.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-browse/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/tsdown.config.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理服务端宿主、目录：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/host/directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/host/directory-picker-browse` 的 README 或发布说明，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 15 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主、目录、原生边界相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/native-picker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/native-picker.ts)、[packages/host/directory-picker/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/src/index.ts)、[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)、[packages/host/directory-picker-native/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/service.spec.ts)
- 对应测试：[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)、[packages/host/directory-picker-native/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/service.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的入口和消费者，再读当前契约，沿着 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts`、`packages/host/directory-picker-native/tests/service.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts`、`packages/host/directory-picker-native/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `NativeDirectoryPicker`；源码顶部原注释（英文，仅作回查线索）：Native backend of the directory-picker seam: registers ctx.directoryPicker with the native capability, opening one native OS chooser on the host display per pick (macOS osascript, Linux Zenity with a KDialog fallback; Windows opens the modern IFileOpenDialo...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主、目录、原生边界必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the native directory-picker backend. @module @deepseek-ai/dsh-host-directory-picker-native/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/native-picker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/native-picker.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog.ts)、[packages/util/native-command/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/native-command/src/index.ts)、[packages/host/directory-picker-native/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/index.ts)、[packages/host/directory-picker-native/tests/native-picker.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/native-picker.spec.ts)
- 对应测试：[packages/host/directory-picker-native/tests/native-picker.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/native-picker.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 和入口，再读当前实现，沿着 `packages/host/directory-picker-native/src/win32-dialog.ts`、`packages/util/native-command/src/index.ts` 和 `packages/host/directory-picker-native/src/index.ts`、`packages/host/directory-picker-native/tests/native-picker.spec.ts` 确认输入输出，最后对照 `packages/host/directory-picker-native/tests/native-picker.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `DirectoryPickerRunner`、`DirectoryPickerInternals`、`pickNativeDirectory`、`outputPath`、`errorCode`、`errorStderr`、`isMissingCommand`、`rethrowIfAborted`；源码顶部原注释（英文，仅作回查线索）：Cross-platform native single-directory chooser behind the native backend's capability.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/win32-dialog-bindings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-bindings.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-logic.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-logic.ts)、[packages/host/directory-picker-native/src/win32-dialog-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-host.ts)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)、[packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts)
- 对应测试：[packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 和入口，再读当前实现，沿着 `packages/host/directory-picker-native/src/win32-dialog-logic.ts` 和 `packages/host/directory-picker-native/src/win32-dialog-host.ts`、`packages/host/directory-picker-native/src/win32-dialog-worker.ts`、`packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts` 确认输入输出，最后对照 `packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 195 行；扫描到的声明包括 `loadWin32DialogBindings`、`closeThreadWindows`、`readUtf16`、`guidBytes`；源码顶部原注释（英文，仅作回查线索）：koffi-backed Win32 bindings for the folder dialog: the COM vtable calls behind Win32DialogBindings plus the cross-thread window closer the driver uses to service aborts. The module loads on every platform; koffi itself is imported lazily inside each functio...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/win32-dialog-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-host.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-bindings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-bindings.ts)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)、[packages/host/directory-picker-native/src/win32-dialog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)、[packages/host/directory-picker-native/tests/native-picker.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/native-picker.spec.ts)、[packages/host/directory-picker-native/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/service.spec.ts)、[packages/host/directory-picker-native/tests/win32-dialog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 和入口，再读当前实现，沿着 `packages/host/directory-picker-native/src/win32-dialog-bindings.ts`、`packages/host/directory-picker-native/src/win32-dialog-worker.ts` 和 `packages/host/directory-picker-native/src/win32-dialog.ts` 确认输入输出，最后对照 `packages/host/directory-picker-auto/tests/loader-composition.spec.ts`、`packages/host/directory-picker-native/tests/native-picker.spec.ts`、`packages/host/directory-picker-native/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `spawnDialogWorker`；源码顶部原注释（英文，仅作回查线索）：Real-process half of the Win32 dialog driver: spawn the dialog child process (source or built plane) and close a dialog thread's windows. The module itself loads everywhere (the import chain from native-picker.ts is static); what stays win32-only is koffi, ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/win32-dialog-logic.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-logic.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-bindings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-bindings.ts)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)、[packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts)
- 对应测试：[packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts)、[packages/host/directory-picker-native/tests/win32-dialog-logic.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-logic.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/host/directory-picker-native/src/win32-dialog-bindings.ts`、`packages/host/directory-picker-native/src/win32-dialog-worker.ts`、`packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts` 确认输入输出，最后对照 `packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts`、`packages/host/directory-picker-native/tests/win32-dialog-logic.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `HRESULT_CANCELLED`、`FOS_PICKFOLDERS`、`FOS_FORCEFILESYSTEM`、`FOS_NOCHANGEDIR`、`Win32FolderDialog`、`Win32DialogBindings`、`runFolderDialog`、`check`；源码顶部原注释（英文，仅作回查线索）：Pure sequencing of the Win32 IFileOpenDialog folder-picker COM conversation over injectable platform bindings, so every outcome path (selection, cancellation, HRESULT failure, cleanup ordering) is testable on any platform. The koffi-backed bindings live in ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把服务端宿主、目录、原生边界的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Child-process entry for the Win32 folder dialog: blocks THIS process inside the modal Show so the host event loop stays live, reporting over the IPC channel. Spawned as a child process (not a worker thread) so the dialog is the process's first window and Wi...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-bindings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-bindings.ts)、[packages/host/directory-picker-native/src/win32-dialog-logic.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-logic.ts)、[packages/host/directory-picker-native/src/win32-dialog-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-host.ts)、[packages/host/directory-picker-native/src/win32-dialog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog.ts)
- 对应测试：[packages/host/directory-picker-native/tests/built-worker.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/built-worker.e2e.ts)、[packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts)、[packages/host/directory-picker-native/tests/win32-dialog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 和入口，再读当前实现，沿着 `packages/host/directory-picker-native/src/win32-dialog-bindings.ts`、`packages/host/directory-picker-native/src/win32-dialog-logic.ts` 和 `packages/host/directory-picker-native/src/win32-dialog-host.ts`、`packages/host/directory-picker-native/src/win32-dialog.ts`、`packages/host/directory-picker-native/tests/built-worker.e2e.ts` 确认输入输出，最后对照 `packages/host/directory-picker-native/tests/built-worker.e2e.ts`、`packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts`、`packages/host/directory-picker-native/tests/win32-dialog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `Win32DialogWorkerData`、`Win32DialogWorkerMessage`；源码顶部原注释（英文，仅作回查线索）：Child-process entry for the Win32 folder dialog: blocks THIS process inside the modal Show so the host event loop stays live, reporting over the IPC channel. Spawned as a child process (not a worker thread) so the dialog is the process's first window and Wi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/src/win32-dialog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：目录选择宿主适配
- 这个文件有什么用：这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。
- 为什么这样设计：自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-host.ts)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)、[packages/host/directory-picker-native/src/native-picker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/native-picker.ts)、[packages/host/directory-picker-native/tests/win32-dialog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog.spec.ts)
- 对应测试：[packages/host/directory-picker-native/tests/win32-dialog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 和入口，再读当前实现，沿着 `packages/host/directory-picker-native/src/win32-dialog-host.ts`、`packages/host/directory-picker-native/src/win32-dialog-worker.ts` 和 `packages/host/directory-picker-native/src/native-picker.ts`、`packages/host/directory-picker-native/tests/win32-dialog.spec.ts` 确认输入输出，最后对照 `packages/host/directory-picker-native/tests/win32-dialog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 159 行；扫描到的声明包括 `Win32DialogWorkerLike`、`Win32DialogInternals`、`DIALOG_TITLE`、`pickWin32Directory`、`assertNever`；源码顶部原注释（英文，仅作回查线索）：Main-thread driver for the Win32 folder dialog: spawns the dialog child process (which blocks inside the modal Show), maps its message protocol onto a promise, and services aborts by posting WM_CLOSE to the dialog thread's windows until the child reports ba...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tests/built-worker.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/built-worker.e2e.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、原生边界的具体场景，包括“loads under plain node and reports the native-surface failure”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“loads under plain node and reports the native-surface failure”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-native/src/win32-dialog-worker.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的测试主题包括 “loads under plain node and reports the native-surface failure”；源码顶部原注释（英文，仅作回查线索）：Keyless built-artifact guard (the dsh-workflow-worker-thread built-worker shape): plain node runs lib/worker.cjs and the bundle reaches its real koffi requires. POSIX hosts prove the load path end to end through the deterministic ole32 rejection; win32 skip...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tests/native-picker.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/native-picker.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、原生边界的具体场景，包括“native directory picker”、“uses the macOS folder chooser and maps user cancellation to null”、“uses the Win32 dialog and never spawns a command when it answers”、“surfaces the Win32 dialog failure with no fallback”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“native directory picker”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/native-picker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/native-picker.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-native/src/native-picker.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `failure`；扫描到的测试主题包括 “native directory picker”、“uses the macOS folder chooser and maps user cancellation to null”、“uses the Win32 dialog and never spawns a command when it answers”、“surfaces the Win32 dialog failure with no fallback”、“wires the real Win32 dialog as the default tier”、“does not fall back when the caller aborted the dialog”；源码顶部原注释（英文，仅作回查线索）：Native picker tier selection and the execFile adapter: the Win32 dialog primary (failures surface as-is, no fallback tier), the abort rule, and the POSIX command tiers (osascript, Zenity → KDialog).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/service.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、原生边界的具体场景，包括“NativeDirectoryPicker”、“registers ctx.directoryPicker with a stable native capability and leaves with its fiber”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“NativeDirectoryPicker”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-native/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的测试主题包括 “NativeDirectoryPicker”、“registers ctx.directoryPicker with a stable native capability and leaves with its fiber”；源码顶部原注释（英文，仅作回查线索）：Registration/capability behavior of the native backend (the seam's cordis half).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-bindings.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、原生边界的具体场景，包括“loadWin32DialogBindings over the fake COM world”、“drives the full selection conversation with memory hygiene”、“maps dismissal and the S_FALSE CoInitializeEx”、“cascades DPI contexts to the first the host accepts”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“loadWin32DialogBindings over the fake COM world”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-bindings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-bindings.ts)、[packages/host/directory-picker-native/src/win32-dialog-logic.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-logic.ts)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-native/src/win32-dialog-bindings.ts`、`packages/host/directory-picker-native/src/win32-dialog-logic.ts`、`packages/host/directory-picker-native/src/win32-dialog-worker.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 354 行；扫描到的声明包括 `comWorld`、`installFakeKoffi`、`loadBindingsModule`；扫描到的测试主题包括 “loadWin32DialogBindings over the fake COM world”、“drives the full selection conversation with memory hygiene”、“maps dismissal and the S_FALSE CoInitializeEx”、“cascades DPI contexts to the first the host accepts”、“keeps the tier when no DPI context is accepted or the symbol is absent”、“surfaces creation and extraction failures as HRESULT errors”；源码顶部原注释（英文，仅作回查线索）：The koffi-backed bindings against a mocked koffi module (the same technique as dsh-session-persistence-jsonl's win32 suite): a small in-memory COM world stands in for ole32/user32/kernel32, keeping the vtable dispatch, result extraction, memory hygiene, and...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tests/win32-dialog-logic.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog-logic.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、原生边界的具体场景，包括“runFolderDialog”、“sequences DPI, STA, options, title, show, result extraction, and apartment teardown”、“maps the cancelled HRESULT to null and still releases the dialog and apartment”、“accepts the S_FALSE re-entry HRESULT from CoInitializeEx”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runFolderDialog”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-logic.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-logic.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-native/src/win32-dialog-logic.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `world`；扫描到的测试主题包括 “runFolderDialog”、“sequences DPI, STA, options, title, show, result extraction, and apartment teardown”、“maps the cancelled HRESULT to null and still releases the dialog and apartment”、“accepts the S_FALSE re-entry HRESULT from CoInitializeEx”、“throws on a failing CoInitializeEx without creating a dialog or uninitializing”；源码顶部原注释（英文，仅作回查线索）：The COM conversation's sequencing against fake bindings: outcome mapping (selection / cancellation / HRESULT failures at every step) and the release-on-every-path guarantee, all platform-independent.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tests/win32-dialog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tests/win32-dialog.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录、原生边界的具体场景，包括“pickWin32Directory”、“resolves the selected path and the cancellation null”、“rejects on a reported dialog failure, a worker crash, and a silent exit”、“settles once: a late exit after the result is inert”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“pickWin32Directory”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)、[packages/host/directory-picker-native/src/win32-dialog-worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog-worker.ts)、[packages/host/directory-picker-native/src/win32-dialog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/src/win32-dialog.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker-native/src/win32-dialog-worker.ts`、`packages/host/directory-picker-native/src/win32-dialog.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 163 行；扫描到的声明包括 `FakeWorker`、`harness`；扫描到的测试主题包括 “pickWin32Directory”、“resolves the selected path and the cancellation null”、“rejects on a reported dialog failure, a worker crash, and a silent exit”、“settles once: a late exit after the result is inert”、“throws immediately on an already-aborted signal without spawning”、“services an abort by closing the dialog thread windows until the worker reports”；源码顶部原注释（英文，仅作回查线索）：Driver tests: the child-process message protocol mapped onto the promise, the WM_CLOSE abort service (including the show-race retry and the kill last resort) against fakes, plus the real spawn plumbing — POSIX hosts prove the default path rejects cleanly (k...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker-native/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/tsdown.config.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理服务端宿主、目录、原生边界：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/host/directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-native/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/host/directory-picker-native` 的 README 或发布说明，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/directory-picker/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)、[packages/host/apiproxy/tests/api-proxy-workspace.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-workspace.spec.ts)、[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-workspace.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-workspace.spec.ts)、[packages/host/directory-picker-auto/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-auto/tests/loader-composition.spec.ts)、[packages/host/directory-picker-browse/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker-browse/tests/service.spec.ts)、[packages/host/directory-picker/tests/seam.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/tests/seam.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/storage/storage-domain/tests/helpers/memory-backend.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/storage/storage-domain/tests/helpers/memory-backend.ts)
- 阅读顺序：先读 `packages/host/directory-picker` 的入口和消费者，再读当前契约，沿着 `packages/host/apiproxy/src/api-proxy.ts`、`packages/host/apiproxy/tests/api-proxy-workspace.spec.ts`、`packages/host/directory-picker-auto/tests/loader-composition.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/apiproxy/tests/api-proxy-workspace.spec.ts`、`packages/host/directory-picker-auto/tests/loader-composition.spec.ts`、`packages/host/directory-picker-browse/tests/service.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 143 行；扫描到的声明包括 `DirectoryPickerNativeCapability`、`DirectoryEntry`、`DirectoryListing`、`DirectoryPickerBrowseCapability`、`DirectoryPickerCapabilities`、`DirectoryPickerCapability`、`DirectoryPickerErrorCode`、`DirectoryPickerError`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the ctx.directoryPicker capability seam: how the web-GUI host lets an operator select a workspace directory. Backends differ in interaction shape, not just mechanism, so the service exposes a discriminated capability instead of one me...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主、目录必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/directory-picker/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the directory-picker seam. @module @deepseek-ai/dsh-host-directory-picker/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/directory-picker/tests/seam.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/tests/seam.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主、目录的具体场景，包括“DirectoryPicker seam”、“registers a subclass as ctx.directoryPicker and leaves with its fiber”、“carries the business code and subject path on DirectoryPickerError”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DirectoryPicker seam”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/directory-picker/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/README.md)、[packages/host/directory-picker/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/directory-picker/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/directory-picker/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `StubPicker`；扫描到的测试主题包括 “DirectoryPicker seam”、“registers a subclass as ctx.directoryPicker and leaves with its fiber”、“carries the business code and subject path on DirectoryPickerError”；源码顶部原注释（英文，仅作回查线索）：Contract behavior the seam itself owns: registration identity and typed failures.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/frontend-static/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/frontend-static/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/README.md)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)、[packages/bundle/web-app/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/index.ts)
- 对应测试：[packages/host/frontend-static/tests/frontend-static.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/tests/frontend-static.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/frontend-static` 的入口和消费者，再读当前契约，沿着 `packages/bundle/web-app/src/index.ts`、`packages/host/frontend-static/tests/frontend-static.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/frontend-static/tests/frontend-static.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 110 行；扫描到的声明包括 `name`、`inject`、`Config`、`serveStatic`、`apply`；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-host-frontend-static — SPA dist server over the webserver fallback seat: serves the built frontend directory with the semantics the Web shell locked at step1 — traversal outside the dist root is 403, any miss falls back to index.html with H...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/frontend-static/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/frontend-static/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-host-frontend-static. @module @deepseek-ai/dsh-host-frontend-static/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/frontend-static/tests/frontend-static.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/tests/frontend-static.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主的具体场景，包括“real Loader composition”、“serves the dist with SPA fallback, taps, traversal rejection, and method gating”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/frontend-static/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/README.md)、[packages/host/frontend-static/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/frontend-static/src/index.ts`、`packages/host/webserver/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `loadComposition`、`request`；扫描到的测试主题包括 “real Loader composition”、“serves the dist with SPA fallback, taps, traversal rejection, and method gating”；源码顶部原注释（英文，仅作回查线索）：REAL-composition coverage: a test-only cordis.yml booted through the vendored Loader mounts the webserver and frontend-static rows, and every assertion observes the served HTTP surface — asset serving, MIME fallback, SPA index fallback with index taps, trav...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/plugin-inventory/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/README.md)、[packages/host/plugin-inventory/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/types.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/protocol/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/host/plugin-inventory/tests/inventory.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/tests/inventory.spec.ts)
- 对应测试：[packages/host/plugin-inventory/tests/inventory.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/tests/inventory.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/plugin-inventory` 的入口和消费者，再读当前契约，沿着 `packages/host/plugin-inventory/tests/inventory.spec.ts` 看它怎样约束运行时，最后对照 `packages/host/plugin-inventory/tests/inventory.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `PluginInventoryGateway`、`pluginEntryId`；源码顶部原注释（英文，仅作回查线索）：Read-only projection of the current Cordis Loader plugin entries.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/plugin-inventory/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/host/plugin-inventory/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/tests/invariant.spec.ts)
- 对应测试：[packages/host/plugin-inventory/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/host/plugin-inventory/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/host/plugin-inventory/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion. @module @deepseek-ai/dsh-host-plugin-inventory/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/plugin-inventory/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/types.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述服务端宿主中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/host/plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/client/index.ts)、[packages/host/plugin-inventory/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/tests/settings-store.client.spec.ts)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/tests/client-apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/host/plugin-inventory` 的入口和消费者，再读当前契约，沿着 `packages/api/remotes/src/client/index.ts`、`packages/host/plugin-inventory/src/index.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`、`packages/client/locale/tests/language-row.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `PluginEntryId`、`PluginFiberPhase`、`PluginInventoryEntry`、`PluginInventorySnapshot`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/plugin-inventory/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/tests/invariant.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主的具体场景，包括“plugin-inventory invariant companion”、“registers the package-owned empty installer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“plugin-inventory invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/README.md)、[packages/host/plugin-inventory/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/plugin-inventory/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行；扫描到的测试主题包括 “plugin-inventory invariant companion”、“registers the package-owned empty installer”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/plugin-inventory/tests/inventory.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/tests/inventory.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主的具体场景，包括“PluginInventoryGateway”、“publishes one direct list method under the pluginInventory namespace”、“projects current non-group Loader entries without a second cache”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“PluginInventoryGateway”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/README.md)、[packages/host/plugin-inventory/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/plugin-inventory/src/index.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/typert/protocol/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/plugin-inventory/src/index.ts`、`packages/typert/protocol/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `harness`；扫描到的测试主题包括 “PluginInventoryGateway”、“publishes one direct list method under the pluginInventory namespace”、“projects current non-group Loader entries without a second cache”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把服务端宿主相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/host/webserver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)
- 对应测试：[packages/api/gateway/tests/gateway.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/gateway/tests/gateway.host.spec.ts)、[packages/bundle/web-app/tests/web-app.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/web-app.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/connection/tests/node-half.host.spec.ts)、[packages/client/hmr/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/hmr/tests/node-half.client.spec.ts)、[packages/client/modules/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/modules/tests/node-half.client.spec.ts)、[packages/client/ui-theme/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-theme/tests/host.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/host/webserver` 的入口和消费者，再读当前契约，沿着 `apps/web/tests/scaffold.ts`、`packages/api/gateway/tests/gateway.host.spec.ts`、`packages/bundle/web-app/src/index.ts` 看它怎样约束运行时，最后对照 `packages/api/gateway/tests/gateway.host.spec.ts`、`packages/bundle/web-app/tests/web-app.spec.ts`、`packages/client/connection/tests/node-half.host.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 266 行；扫描到的声明包括 `WebRouteKind`、`WebRoute`、`WebUpgradeRoute`、`Config`、`WebServer`；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-host-webserver — Web route-registration plugin: a node:http server plus the webServer service (HTTP and upgrade route registries, index transform taps, and the single fallback seat for everything no route claims). Knows no harness concepts ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/webserver/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/invariant.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查服务端宿主必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/host/webserver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 59 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-host-webserver. @module @deepseek-ai/dsh-host-webserver/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/host/webserver/tests/webserver.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/tests/webserver.spec.ts)

- 所属层：packages/host：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主的具体场景，包括“real Loader composition”、“serves registered routes, index taps, and the fallback-seat semantics”、“fails the fiber when the port is already taken (fail-loud at activation)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/host/webserver/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/README.md)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/host/webserver/src/index.ts`、`vendor/cordis/src/index.ts`、`vendor/include/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 226 行；扫描到的声明包括 `loadComposition`、`request`、`upgrade`；扫描到的测试主题包括 “real Loader composition”、“serves registered routes, index taps, and the fallback-seat semantics”、“fails the fiber when the port is already taken (fail-loud at activation)”；源码顶部原注释（英文，仅作回查线索）：REAL-composition coverage: a test-only cordis.yml booted through the vendored Loader mounts the webserver row, and every assertion observes the user-visible HTTP surface of the running server (routing precedence, index taps, fallback-seat semantics, per-req...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
