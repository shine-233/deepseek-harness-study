# 源文件索引：packages/llm

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 101 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

条目按所属包分组：packages/llm/llm-deepseek（23 条）、packages/llm/llm-pi-ai（28 条）、packages/llm/llm-retry（11 条）、packages/llm/llm（26 条）、packages/llm/token-meter（13 条）。

## packages/llm/llm-deepseek

### [packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成大语言模型、DeepSeek能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“DeepSeekAdapter: fetch + SSE against a DeepSeek (OpenAI-compatible) chat-completions endpoint, emitting harness StreamChunks. The adapter is transport-only: connection facts arrive through a thunk resolved once per operation and the bearer token through a p...”；固定提交中扫描到的声明包括 `DeepSeekCatalogModel`、`DeepSeekConnectionOptions`、`DeepSeekAdapterOptions`、`DEFAULT_STREAM_IDLE_TIMEOUT_MS`、`DEFAULT_CONTEXT_WINDOW`；本地静态 import 图显示它直接依赖 11 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/identity/anonymous-user-id/src/index.ts)、[packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/index.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)、[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/identity/anonymous-user-id/src/index.ts` 和 `packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-deepseek/tests/adapter.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-deepseek/tests/adapter.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 666 行；扫描到的声明包括 `DeepSeekCatalogModel`、`DeepSeekConnectionOptions`、`DeepSeekAdapterOptions`、`DEFAULT_STREAM_IDLE_TIMEOUT_MS`、`DEFAULT_CONTEXT_WINDOW`、`DEFAULT_MAX_TOKENS`、`DEFAULT_MAX_REQUEST_FILES_BYTES`、`DEFAULT_MAX_INLINE_REQUEST_IMAGE_BYTES`；源码顶部原注释（英文，仅作回查线索）：DeepSeekAdapter: fetch + SSE against a DeepSeek (OpenAI-compatible) chat-completions endpoint, emitting harness StreamChunks. The adapter is transport-only: connection facts arrive through a thunk resolved once per operation and the bearer token through a p...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“DeepSeek Files API identifiers. @module dsh-llm-deepseek/file-id”；固定提交中扫描到的声明包括 `DeepSeekFileId`、`DeepSeekFileScope`；本地静态 import 图显示它直接依赖 1 个源文件，并被 8 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)、[packages/llm/llm-deepseek/src/file-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-store.ts)、[packages/llm/llm-deepseek/src/files-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/files-api.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/file-store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/file-store.spec.ts)、[packages/llm/llm-deepseek/tests/files-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/files-api.spec.ts)、[packages/llm/llm-deepseek/tests/upload-index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/upload-index.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/util/brand/src/index.ts` 和 `packages/llm/llm-deepseek/src/adapter.ts`、`packages/llm/llm-deepseek/src/file-store.ts`、`packages/llm/llm-deepseek/src/files-api.ts` 确认输入输出，最后对照 `packages/llm/llm-deepseek/tests/file-store.spec.ts`、`packages/llm/llm-deepseek/tests/files-api.spec.ts`、`packages/llm/llm-deepseek/tests/upload-index.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `DeepSeekFileId`、`DeepSeekFileScope`；源码顶部原注释（英文，仅作回查线索）：DeepSeek Files API identifiers. @module dsh-llm-deepseek/file-id。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/file-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-store.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护大语言模型、DeepSeek、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“DeepSeek Files API upload reuse, invalidation, and quota recovery. @module dsh-llm-deepseek/file-store”；固定提交中扫描到的声明包括 `MAX_CHAT_IMAGE_BYTES`、`DeepSeekFilePolicy`、`DeepSeekFileConnection`、`DeepSeekFileReference`、`DeepSeekFileStore`；本地静态 import 图显示它直接依赖 5 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)、[packages/llm/llm-deepseek/src/files-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/files-api.ts)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/file-store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/file-store.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/file-id.ts`、`packages/llm/llm-deepseek/src/files-api.ts` 和 `packages/llm/llm-deepseek/src/adapter.ts`、`packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-deepseek/tests/file-store.spec.ts` 理解状态变化，最后对照 `packages/llm/llm-deepseek/tests/file-store.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 331 行；扫描到的声明包括 `MAX_CHAT_IMAGE_BYTES`、`DeepSeekFilePolicy`、`DeepSeekFileConnection`、`DeepSeekFileReference`、`DeepSeekFileStore`、`abortReason`、`uploadFailure`、`waitForUpload`；源码顶部原注释（英文，仅作回查线索）：DeepSeek Files API upload reuse, invalidation, and quota recovery. @module dsh-llm-deepseek/file-store。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/files-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/files-api.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理大语言模型、DeepSeek、API 边界的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 文件级设计证据：源码顶部注释把它定位为“OpenAI-compatible DeepSeek Files API transport. @module dsh-llm-deepseek/files-api”；固定提交中扫描到的声明包括 `MIN_FILE_EXPIRY_SECONDS`、`MAX_FILE_EXPIRY_SECONDS`、`MAX_FILE_UPLOAD_BYTES`、`MAX_STORED_FILE_COUNT`、`MAX_STORED_FILE_BYTES`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-deepseek/src/file-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-store.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/files-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/files-api.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/file-id.ts`、`packages/llm/llm/src/index.ts` 和 `packages/llm/llm-deepseek/src/file-store.ts`、`packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-deepseek/tests/files-api.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-deepseek/tests/files-api.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 257 行；扫描到的声明包括 `MIN_FILE_EXPIRY_SECONDS`、`MAX_FILE_EXPIRY_SECONDS`、`MAX_FILE_UPLOAD_BYTES`、`MAX_STORED_FILE_COUNT`、`MAX_STORED_FILE_BYTES`、`DeepSeekFileObject`、`DeepSeekFilePage`、`DeepSeekFilesError`；源码顶部原注释（英文，仅作回查线索）：OpenAI-compatible DeepSeek Files API transport. @module dsh-llm-deepseek/files-api。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/index.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：DeepSeek 模型插件入口
- 这个文件有什么用：它把 DeepSeek provider 注册到 `ctx.llm`，在每次请求解析最新的 endpoint、凭据、模型目录和超时配置，并只在 retry policy 改变时原位替换注册；这样设置变化不会让进行中的流失去已经采用的连接事实。
- 为什么这样设计：DeepSeek provider 的可变连接事实和 Cordis 注册事实不是同一种状态；把每次请求的 endpoint、凭据和 catalog 解析，与 retry policy 的原位 replace 分开，既能让新设置进入下一次请求，又不会让路由在 dispose/re-register 的空窗期短暂消失。
- 文件级设计证据：源码顶部注释把它定位为“Register a DeepSeekAdapter for the deepseek-official provider route on ctx.llm, with connection facts resolved per request instead of frozen at load: the plugin layers its cordis.yml entry config under the optional llm-deepseek user-settings section (ctx.se...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`PUBLIC_BASE_URL`、`ResolvedDeepSeekOptions`；本地静态 import 图显示它直接依赖 15 个源文件，并被 16 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/identity/anonymous-user-id/src/index.ts)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)
- 对应测试：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/context/agent-instructions/tests/agent-instructions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/agent-instructions/tests/agent-instructions.e2e.ts)、[packages/core/agent-loop/tests/request-cache.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/tests/request-cache.e2e.ts)、[packages/llm/llm-deepseek/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.e2e.ts)、[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)、[packages/llm/llm-deepseek/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/dynamic-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)、[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/credentials/credentials/src/index.ts`、`packages/identity/anonymous-user-id/src/index.ts`、`packages/llm/llm-deepseek/src/adapter.ts` 和 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/harness.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts` 确认输入输出，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`packages/context/agent-instructions/tests/agent-instructions.e2e.ts`、`packages/core/agent-loop/tests/request-cache.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 467 行；扫描到的声明包括 `name`、`inject`、`Config`、`PUBLIC_BASE_URL`、`ResolvedDeepSeekOptions`、`resolveAdapterOptions`、`apply`、`resolveModels`；源码顶部原注释（英文，仅作回查线索）：Register a DeepSeekAdapter for the deepseek-official provider route on ctx.llm, with connection facts resolved per request instead of frozen at load: the plugin layers its cordis.yml entry config under the optional llm-deepseek user-settings section (ctx.se...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/invariant.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型、DeepSeek必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-llm-deepseek. @module @deepseek-ai/dsh-llm-deepseek/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-llm-deepseek. @module @deepseek-ai/dsh-llm-deepseek/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/serialize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/serialize.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：格式编解码
- 这个文件有什么用：它把 Harness 消息序列化为 DeepSeek chat-completions wire：合并用户文本、生成 assistant content/tool_calls、单独发送 tool result，并在 text-only 路由中明确拒绝图像块。
- 为什么这样设计：核心消息模型需要支持多种 provider，而 DeepSeek wire 对 tool call、reasoning passback 和图像有自己的限制；适配器在边界显式转换或拒绝，Agent 就不必分支处理供应商协议。
- 文件级设计证据：源码顶部注释把它定位为“Serialize harness messages into DeepSeek chat completions. Text-only requests retain string user content; the image path resolves durable attachments into ordered file-id or inline parts. Tool-result images follow their string-only tool messages in a separa...”；固定提交中扫描到的声明包括 `RequestDefaults`、`ImageRequestRepresentation`、`ImageSerializationOptions`、`ImageWireLocation`、`serializeMessages`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/serialize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/serialize.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/types.ts`、`packages/llm/llm/src/index.ts` 和 `packages/llm/llm-deepseek/src/adapter.ts`、`packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-deepseek/tests/serialize.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-deepseek/tests/serialize.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 425 行；扫描到的声明包括 `RequestDefaults`、`ImageRequestRepresentation`、`ImageSerializationOptions`、`ImageWireLocation`、`serializeMessages`、`serializeMessagesWithImages`、`serializeRequest`、`serializeRequestWithImages`；源码顶部原注释（英文，仅作回查线索）：Serialize harness messages into DeepSeek chat completions. Text-only requests retain string user content; the image path resolves durable attachments into ordered file-id or inline parts. Tool-result images follow their string-only tool messages in a separa...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/sse.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/sse.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：DeepSeek SSE 流解析器
- 这个文件有什么用：它把 SSE 字节流拆成事件数据，处理分块重组、UTF-8/CRLF/BOM、注释和 DONE 结束标记；流在结束前没有 DONE 时报告截断。
- 为什么这样设计：网络字节边界不等于 SSE 事件边界，UTF-8、CRLF、多行 data 和 DONE 还会跨 chunk 出现；独立 framing 解析器把这些协议细节挡在 DeepSeek 适配器之外，并能明确报告截断。
- 文件级设计证据：源码顶部注释把它定位为“Decode an SSE byte stream into event data payloads. Framing — chunk reassembly, UTF-8/CRLF/BOM handling, comment and non-data field skipping, multi-data: joining — is eventsource-parser's. Comments are reported only through an optional transport-activity ca...”；固定提交中扫描到的声明包括 `DONE`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)、[packages/llm/llm-deepseek/src/translate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/translate.ts)、[packages/llm/llm-deepseek/tests/sse.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/sse.spec.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/sse.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/sse.spec.ts)、[packages/llm/llm-deepseek/tests/translate.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/translate.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts` 和 `packages/llm/llm-deepseek/src/adapter.ts`、`packages/llm/llm-deepseek/src/translate.ts`、`packages/llm/llm-deepseek/tests/sse.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-deepseek/tests/sse.spec.ts`、`packages/llm/llm-deepseek/tests/translate.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `DONE`；源码顶部原注释（英文，仅作回查线索）：Decode an SSE byte stream into event data payloads. Framing — chunk reassembly, UTF-8/CRLF/BOM handling, comment and non-data field skipping, multi-data: joining — is eventsource-parser's. Comments are reported only through an optional transport-activity ca...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/translate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/translate.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：协议翻译
- 这个文件有什么用：它在两种大语言模型、DeepSeek、协议翻译表示之间做明确转换，让供应商、协议或错误格式差异停留在边界。
- 为什么这样设计：把两种表示的差异限制在翻译函数内，核心逻辑不必分支处理供应商字段；翻译规则也可以用成对输入输出单独测试。
- 文件级设计证据：源码顶部注释把它定位为“Translate DeepSeek SSE payloads with one stateful harness block per content, reasoning, or tool call index. An empty initial reasoning delta does not open a block. Finish reason and the latest usage are deferred until DONE, covering both finish-attached and...”；固定提交中扫描到的声明包括 `mapFinishReason`、`mapUsage`、`closeBlock`、`open`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm-deepseek/src/sse.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/sse.ts)、[packages/llm/llm-deepseek/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/translate.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/translate.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/llm/llm-deepseek/src/sse.ts`、`packages/llm/llm-deepseek/src/types.ts`、`packages/llm/llm/src/index.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 185 行；扫描到的声明包括 `mapFinishReason`、`mapUsage`、`closeBlock`、`open`；源码顶部原注释（英文，仅作回查线索）：Translate DeepSeek SSE payloads with one stateful harness block per content, reasoning, or tool call index. An empty initial reasoning delta does not open a block. Finish reason and the latest usage are deferred until DONE, covering both finish-attached and...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/types.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述大语言模型、DeepSeek中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“DeepSeek chat-completions wire format (OpenAI-compatible). Types only. Source of truth: the official API docs at ~/repos/deepsuite-docs/apps/docs/docs (api/create-chat-completion, guides/thinking_mode.mdx, guides/tool_calls.md), cross-checked against live s...”；固定提交中扫描到的声明包括 `WireRequest`、`WireSystemMessage`、`WireTextContentPart`、`WireFileContentPart`、`WireImageUrlContentPart`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm-deepseek/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/adapter.ts)、[packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/index.ts)、[packages/llm/llm-deepseek/src/serialize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/serialize.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)、[examples/headless-agent/tests/todo-write.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/todo-write.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md`、入口和消费者，再读当前契约，沿着 `packages/llm/llm-deepseek/src/adapter.ts`、`packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-deepseek/src/serialize.ts` 看它怎样约束运行时，最后对照 `examples/headless-agent/tests/code-mode.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`、`examples/headless-agent/tests/compaction.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 178 行；扫描到的声明包括 `WireRequest`、`WireSystemMessage`、`WireTextContentPart`、`WireFileContentPart`、`WireImageUrlContentPart`、`WireImageContentPart`、`WireUserContentPart`、`WireUserMessage`；源码顶部原注释（英文，仅作回查线索）：DeepSeek chat-completions wire format (OpenAI-compatible). Types only. Source of truth: the official API docs at ~/repos/deepsuite-docs/apps/docs/docs (api/create-chat-completion, guides/thinking_mode.mdx, guides/tool_calls.md), cross-checked against live s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/src/upload-index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/upload-index.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Durable DeepSeek attachment-to-file-id index. @module dsh-llm-deepseek/upload-index”；固定提交中扫描到的声明包括 `DeepSeekUploadRecord`、`UploadIndexCommit`、`deepSeekFileScope`、`DeepSeekUploadIndex`、`InvalidUploadIndexError`；本地静态 import 图显示它直接依赖 4 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)、[packages/util/atomic-write/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/atomic-write/src/index.ts)、[packages/llm/llm-deepseek/src/file-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-store.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/file-store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/file-store.spec.ts)、[packages/llm/llm-deepseek/tests/upload-index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/upload-index.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-deepseek/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/file-id.ts`、`packages/util/atomic-write/src/index.ts` 和 `packages/llm/llm-deepseek/src/file-store.ts`、`packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-deepseek/tests/file-store.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-deepseek/tests/file-store.spec.ts`、`packages/llm/llm-deepseek/tests/upload-index.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 225 行；扫描到的声明包括 `DeepSeekUploadRecord`、`UploadIndexCommit`、`deepSeekFileScope`、`DeepSeekUploadIndex`、`InvalidUploadIndexError`、`absent`、`parseRecord`、`parseIndex`；源码顶部原注释（英文，仅作回查线索）：Durable DeepSeek attachment-to-file-id index. @module dsh-llm-deepseek/upload-index。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.e2e.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek的具体场景，包括“serves a real request with the key held only by a credentials-local document”、“flash dynamically switches from off to low”、“pro + thinking disabled: plain generation without reasoning blocks”、“streams raw chunks in protocol order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“serves a real request with the key held only by a credentials-local document”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `E2eAttachmentStore`、`harness`、`ask`、`textOf`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/credentials/credentials-local/src/index.ts`、`packages/llm/llm-deepseek/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 313 行；扫描到的声明包括 `E2eAttachmentStore`、`harness`、`ask`、`textOf`；扫描到的测试主题包括 “serves a real request with the key held only by a credentials-local document”、“flash dynamically switches from off to low”、“pro + thinking disabled: plain generation without reasoning blocks”、“streams raw chunks in protocol order”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek的具体场景，包括“request image policy”、“DeepSeekAdapter against a mock server”、“streams a text generation end to end through the assembler”、“uploads a durable image once and sends only its Files API id to the vision model”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“request image policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`adapterOf`、`drain`、`requestImage`、`attachmentStoreOf`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/identity/anonymous-user-id/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)、[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/core/session/src/index.ts`、`packages/identity/anonymous-user-id/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 2059 行；扫描到的声明包括 `harness`、`adapterOf`、`drain`、`requestImage`、`attachmentStoreOf`、`fileStoreOf`、`fileReference`、`successfulSseResponse`；扫描到的测试主题包括 “request image policy”、“DeepSeekAdapter against a mock server”、“streams a text generation end to end through the assembler”、“uploads a durable image once and sends only its Files API id to the vision model”、“falls back to one all-base64 request when Files API resolution fails”、“reduces base64 fallback history from the configured high watermark to its half-size quantum”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试工具
- 这个文件有什么用：它为大语言模型、DeepSeek的测试提供组装、模拟或渲染辅助，让真正的测试用例可以把重点放在行为和断言上。
- 为什么这样设计：测试辅助代码集中准备环境和输入，最终断言留在具体测试用例里；这样辅助逻辑可复用，又不会把“准备了什么”误当成“验证通过了什么”。
- 文件级设计证据：源码顶部注释把它定位为“Test helper: drive ctx.llm.stream() through a BlockAssembler and return the assembled message + usage + finish reason. This exercises the same streaming path production uses (the loop), rather than a service-level one-shot convenience method.”；固定提交中扫描到的声明包括 `AssembledResult`、`assemble`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/llm/llm-deepseek/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.e2e.ts)、[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.e2e.ts)、[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)、[packages/llm/llm-deepseek/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/dynamic-config.spec.ts)、[packages/llm/llm-deepseek/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/loader-composition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/llm/llm-deepseek/tests/adapter.e2e.ts`、`packages/llm/llm-deepseek/tests/adapter.spec.ts`、`packages/llm/llm-deepseek/tests/dynamic-config.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `AssembledResult`、`assemble`；源码顶部原注释（英文，仅作回查线索）：Test helper: drive ctx.llm.stream() through a BlockAssembler and return the assembled message + usage + finish reason. This exercises the same streaming path production uses (the loop), rather than a service-level one-shot convenience method.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/dynamic-config.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek的具体场景，包括“request-level dynamic configuration”、“routes the next request with the freshly resolved base URL and credential”、“starts keyless and serves the next request once the key arrives”、“rejects a stored credential no header can carry, never echoing it in the failure”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“request-level dynamic configuration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StaticAttachmentStore`、`home`、`boot`、`prompt`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)、[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 293 行；扫描到的声明包括 `StaticAttachmentStore`、`home`、`boot`、`prompt`；扫描到的测试主题包括 “request-level dynamic configuration”、“routes the next request with the freshly resolved base URL and credential”、“starts keyless and serves the next request once the key arrives”、“rejects a stored credential no header can carry, never echoing it in the failure”、“advertises a live settings catalog without re-registration”、“applies changed request file limits to the next request”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/file-store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/file-store.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek、状态存储的具体场景，包括“DeepSeekFileStore”、“singleflights the first upload and reuses the durable mapping across store instances”、“keeps a shared upload alive while another waiter remains”、“aborts the shared upload after its only waiter cancels”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DeepSeekFileStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `requestUrl`、`uploadFetch`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)、[packages/llm/llm-deepseek/src/file-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/file-id.ts`、`packages/llm/llm-deepseek/src/file-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 496 行；扫描到的声明包括 `requestUrl`、`uploadFetch`；扫描到的测试主题包括 “DeepSeekFileStore”、“singleflights the first upload and reuses the durable mapping across store instances”、“keeps a shared upload alive while another waiter remains”、“aborts the shared upload after its only waiter cancels”、“normalizes a non-Error cancellation reason”、“starts a fresh upload while the cancelled transport is settling”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/files-api.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/files-api.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek、API 边界的具体场景，包括“DeepSeekFilesClient”、“uploads multipart bytes with the required purpose and explicit expiry”、“validates list, retrieve, and delete responses”、“refuses an upload response that omits the requested expiry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DeepSeekFilesClient”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `requestUrl`、`file`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)、[packages/llm/llm-deepseek/src/files-api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/files-api.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-deepseek/src/file-id.ts`、`packages/llm/llm-deepseek/src/files-api.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 260 行；扫描到的声明包括 `requestUrl`、`file`；扫描到的测试主题包括 “DeepSeekFilesClient”、“uploads multipart bytes with the required purpose and explicit expiry”、“validates list, retrieve, and delete responses”、“refuses an upload response that omits the requested expiry”、“retains quota error detail for the one cleanup retry policy”、“wraps transport failures but preserves an aborted request reason”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/loader-composition.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek的具体场景，包括“llm-deepseek real dynamic composition”、“boots from cordis.yml and routes the next request after external settings and credentia...”、“keeps a stored key writable and rotatable across a real restart”、“boots the same adapter on entry config alone, resolving the reference from the environment”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“llm-deepseek real dynamic composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Real-composition guard for the dynamic-configuration chain: LlmRuntime, settings-file, credentials-local, and llm-deepseek boot from a test-only cordis.yml through the actual Loader + Include path, external edits of settings.yaml and the credentials documen...”；固定提交中扫描到的声明包括 `loadComposition`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/identity/anonymous-user-id/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/identity/anonymous-user-id/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)、[packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/identity/anonymous-user-id/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 178 行；扫描到的声明包括 `loadComposition`；扫描到的测试主题包括 “llm-deepseek real dynamic composition”、“boots from cordis.yml and routes the next request after external settings and credential edits”、“keeps a stored key writable and rotatable across a real restart”、“boots the same adapter on entry config alone, resolving the reference from the environment”；源码顶部原注释（英文，仅作回查线索）：Real-composition guard for the dynamic-configuration chain: LlmRuntime, settings-file, credentials-local, and llm-deepseek boot from a test-only cordis.yml through the actual Loader + Include path, external edits of settings.yaml and the credentials documen...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/mock-server.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试服务器
- 这个文件有什么用：它为大语言模型、DeepSeek 提供受控的模拟网络或模型服务，记录请求并返回可重复的响应，让测试不依赖真实网络。
- 为什么这样设计：网络或模型依赖放进受控的模拟服务，测试才能重复触发成功、断开和错误响应；生产连接实现不必为了测试而改变行为。
- 文件级设计证据：固定提交中扫描到的声明包括 `Behavior`、`MockServer`、`closeMockServers`、`textEvents`、`mockServer`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)、[packages/llm/llm-deepseek/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/dynamic-config.spec.ts)、[packages/llm/llm-deepseek/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/loader-composition.spec.ts)
- 对应测试：[packages/llm/llm-deepseek/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/adapter.spec.ts)、[packages/llm/llm-deepseek/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/dynamic-config.spec.ts)、[packages/llm/llm-deepseek/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/loader-composition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/llm/llm-deepseek/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/assemble.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/llm/llm-deepseek/tests/adapter.spec.ts`、`packages/llm/llm-deepseek/tests/dynamic-config.spec.ts`、`packages/llm/llm-deepseek/tests/loader-composition.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `Behavior`、`MockServer`、`closeMockServers`、`textEvents`、`mockServer`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/serialize.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/serialize.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek、序列化的具体场景，包括“serializeMessages”、“maps user text to string content”、“maps system-role messages in history”、“passes reasoning_content back on tool-call-free turns”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“serializeMessages”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `request`、`imageRef`、`fileResolver`、`requestVersion`、`imageOptions`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/serialize.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/serialize.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/serialize.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 706 行；扫描到的声明包括 `request`、`imageRef`、`fileResolver`、`requestVersion`、`imageOptions`、`inlineImageOptions`；扫描到的测试主题包括 “serializeMessages”、“maps user text to string content”、“maps system-role messages in history”、“passes reasoning_content back on tool-call-free turns”、“passes reasoning_content back on tool-call turns (official passback rule)”、“serializes parallel tool calls in order”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/sse.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/sse.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek、SSE 流的具体场景，包括“parseSse”、“yields event payloads and the DONE sentinel”、“reports comments out of band without yielding them”、“stops yielding after DONE even when more data follows”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseSse”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `bytes`、`collect`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm-deepseek/src/sse.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/sse.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-deepseek/src/sse.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `bytes`、`collect`；扫描到的测试主题包括 “parseSse”、“yields event payloads and the DONE sentinel”、“reports comments out of band without yielding them”、“stops yielding after DONE even when more data follows”、“throws STREAM_CLOSED when the stream ends without DONE”、“throws STREAM_CLOSED for an empty stream”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/translate.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/translate.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek、协议翻译的具体场景，包括“translate: text”、“streams a text block and defers finish to DONE”、“assembles into the message BlockAssembler expects”、“translate: reasoning”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“translate: text”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `collect`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/llm/llm-deepseek/src/sse.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/sse.ts)、[packages/llm/llm-deepseek/src/translate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/translate.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-deepseek/src/sse.ts`、`packages/llm/llm-deepseek/src/translate.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 350 行；扫描到的声明包括 `collect`；扫描到的测试主题包括 “translate: text”、“streams a text block and defers finish to DONE”、“assembles into the message BlockAssembler expects”、“translate: reasoning”、“does NOT open a reasoning block for the empty first-chunk signature”、“streams reasoning then text as separate blocks”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-deepseek/tests/upload-index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/tests/upload-index.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、DeepSeek的具体场景，包括“DeepSeekUploadIndex”、“normalizes trailing endpoint slashes in the credential scope”、“isolates API-key namespaces and reuses only records above the refresh margin”、“keeps a reusable cross-process winner and removes only an exact generation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DeepSeekUploadIndex”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-deepseek/src/file-id.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/file-id.ts)、[packages/llm/llm-deepseek/src/upload-index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/upload-index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-deepseek/src/file-id.ts`、`packages/llm/llm-deepseek/src/upload-index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的测试主题包括 “DeepSeekUploadIndex”、“normalizes trailing endpoint slashes in the credential scope”、“isolates API-key namespaces and reuses only records above the refresh margin”、“keeps a reusable cross-process winner and removes only an exact generation”、“treats a corrupt upload cache as empty and repairs it on the next commit”、“rejects duplicate persisted mappings as a corrupt cache”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/llm/llm-pi-ai

### [packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成大语言模型能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Generic pi-ai-backed implementation of the Harness LLM seam. Each resolution produces one **immutable** snapshot — the profiles plus a Models collection holding the Provider each route built — and an operation captures a whole snapshot before its first awai...”；固定提交中扫描到的声明包括 `PiAiAdapterOptions`、`PiAiAuthInjection`、`PiAiAdapter`、`profileOptions`、`describableReasoningLevel`；本地静态 import 图显示它直接依赖 6 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/context.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/sdk-options.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/sdk-options.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm-pi-ai/src/context.ts` 和 `packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/src/login.ts`、`packages/llm/llm-pi-ai/tests/auth-double.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/sdk-options.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 412 行；扫描到的声明包括 `PiAiAdapterOptions`、`PiAiAuthInjection`、`PiAiAdapter`、`profileOptions`、`describableReasoningLevel`、`resolveReasoningLevel`、`reasoningInfo`、`requestHeaders`；源码顶部原注释（英文，仅作回查线索）：Generic pi-ai-backed implementation of the Harness LLM seam. Each resolution produces one **immutable** snapshot — the profiles plus a Models collection holding the Provider each route built — and an operation captures a whole snapshot before its first awai...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/auth.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/auth.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“The three adapters between pi-ai's auth model and the harness credential plane. Every pi-ai-specific concept stays on this side of them: the harness seams they consume — ctx.credentials records and ctx.authorization flows — name nothing from this library, s...”；固定提交中扫描到的声明包括 `RECORD_SCOPE`、`recordKeyFor`、`credentialStoreFrom`、`authContextFrom`、`toPiCredential`；本地静态 import 图显示它直接依赖 4 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/util/launch-environment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/launch-environment/src/index.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/auth.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth.spec.ts)、[packages/llm/llm-pi-ai/tests/login.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/login.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/credentials/credentials/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/util/launch-environment/src/index.ts` 和 `packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/src/login.ts`、`packages/llm/llm-pi-ai/tests/auth.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/auth.spec.ts`、`packages/llm/llm-pi-ai/tests/login.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 207 行；扫描到的声明包括 `RECORD_SCOPE`、`recordKeyFor`、`credentialStoreFrom`、`authContextFrom`、`toPiCredential`、`toRecord`、`writableStore`；源码顶部原注释（英文，仅作回查线索）：The three adapters between pi-ai's auth model and the harness credential plane. Every pi-ai-specific concept stays on this side of them: the harness seams they consume — ctx.credentials records and ctx.authorization flows — name nothing from this library, s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/catalog.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型目录物化器
- 这个文件有什么用：它把 pi-ai 已安装的 provider/model catalog 物化成 Harness 可使用的 route：继承默认模型能力，再叠加配置中的模型、上下文、输入模态和 reasoning/compat 规则，并在配置解析阶段拒绝不可服务的 route。
- 为什么这样设计：模型能力来自安装的 catalog 和用户 route 配置两处来源，必须在请求前合并并校验；把物化过程放在配置边界，可以把缺字段和不兼容模型变成清晰的启动错误。
- 文件级设计证据：源码顶部注释把它定位为“Materialization of one provider route's model catalog. The installed pi-ai catalog supplies defaults keyed by model id, and a profile's own model entries override them field by field, so a route naming a catalog provider stays configuration-free while a rou...”；固定提交中扫描到的声明包括 `PiAiModality`、`MODALITIES`、`THINKING_LEVELS`、`PiAiThinkingFormat`、`SUPPORTED_THINKING_FORMATS`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/src/discovery.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/discovery.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/config.spec.ts)、[packages/llm/llm-pi-ai/tests/context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/context.spec.ts)、[packages/llm/llm-pi-ai/tests/convert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/convert.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm-pi-ai/src/discovery.ts`、`packages/llm/llm-pi-ai/src/index.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/adapter.e2e.ts`、`packages/llm/llm-pi-ai/tests/adapter.spec.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 893 行；扫描到的声明包括 `PiAiModality`、`MODALITIES`、`THINKING_LEVELS`、`PiAiThinkingFormat`、`SUPPORTED_THINKING_FORMATS`、`PiAiMaxTokensField`、`MAX_TOKENS_FIELDS`、`PiAiCacheControlFormat`；源码顶部原注释（英文，仅作回查线索）：Materialization of one provider route's model catalog. The installed pi-ai catalog supplies defaults keyed by model id, and a profile's own model entries override them field by field, so a route naming a catalog provider stays configuration-free while a rou...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义大语言模型可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Configuration schema and provider-profile validation for the pi-ai adapter. Profiles are a dict keyed by provider route, so the composition base and a user-settings layer merge per provider and the route set is structural. A route key is not required to nam...”；固定提交中扫描到的声明包括 `DEFAULT_STREAM_IDLE_TIMEOUT_MS`、`DEFAULT_MAX_REQUEST_IMAGE_BYTES`、`DEFAULT_REQUEST_IMAGE_PIXEL_BUDGET`、`DEFAULT_REQUEST_IMAGE_MAX_BYTES`、`DEFAULT_CONTEXT_WINDOW`；本地静态 import 图显示它直接依赖 6 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/llm/llm-pi-ai/src/catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/catalog.ts)、[packages/llm/llm-pi-ai/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/provider.ts)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/config.spec.ts)、[packages/llm/llm-pi-ai/tests/sdk-options.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/sdk-options.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md`，再读本配置/脚本，沿着 `packages/llm/llm-pi-ai/src/adapter.ts`、`packages/llm/llm-pi-ai/src/context.ts`、`packages/llm/llm-pi-ai/src/index.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 465 行；扫描到的声明包括 `DEFAULT_STREAM_IDLE_TIMEOUT_MS`、`DEFAULT_MAX_REQUEST_IMAGE_BYTES`、`DEFAULT_REQUEST_IMAGE_PIXEL_BUDGET`、`DEFAULT_REQUEST_IMAGE_MAX_BYTES`、`DEFAULT_CONTEXT_WINDOW`、`DEFAULT_MAX_TOKENS`、`DEFAULT_INPUT`、`PiAiProviderProfile`；源码顶部原注释（英文，仅作回查线索）：Configuration schema and provider-profile validation for the pi-ai adapter. Profiles are a dict keyed by provider route, so the composition base and a user-settings layer merge per provider and the route set is structural. A route key is not required to nam...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/context.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：提示词与上下文
- 这个文件有什么用：它把大语言模型、上下文的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Harness request-history conversion into pi-ai's Context vocabulary. @module dsh-llm-pi-ai/context”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Harness request-history conversion into pi-ai's Context vocabulary. @module dsh-llm-pi-ai/context”；固定提交中扫描到的声明包括 `toPiContext`、`flattenText`、`toolResultText`、`assertSupportedImageRoles`、`userContent`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/src/replay.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/replay.ts)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/context.spec.ts)、[packages/llm/llm-pi-ai/tests/convert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/convert.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm-pi-ai/src/replay.ts` 和 `packages/llm/llm-pi-ai/src/adapter.ts`、`packages/llm/llm-pi-ai/tests/context.spec.ts`、`packages/llm/llm-pi-ai/tests/convert.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/context.spec.ts`、`packages/llm/llm-pi-ai/tests/convert.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 286 行；扫描到的声明包括 `toPiContext`、`flattenText`、`toolResultText`、`assertSupportedImageRoles`、`userContent`、`collectImageRefs`、`prepareRequestImages`、`toolsOf`；源码顶部原注释（英文，仅作回查线索）：Harness request-history conversion into pi-ai's Context vocabulary. @module dsh-llm-pi-ai/context。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/discovery.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/discovery.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Answering "which models can this provider serve?" for the configuration surface's "fetch available models" action. A route the installed pi-ai catalog ships is answered **from that catalog**, with no network call at all: pi-ai's registry is the authoritativ...”；固定提交中扫描到的声明包括 `discoverModels`、`capacity`、`label`、`listingUrl`、`readBounded`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/catalog.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm-pi-ai/tests/discovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/discovery.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/discovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/discovery.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm-pi-ai/src/catalog.ts`、`packages/llm/llm/src/index.ts` 和 `packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/tests/discovery.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/discovery.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 284 行；扫描到的声明包括 `discoverModels`、`capacity`、`label`、`listingUrl`、`readBounded`、`readListing`、`usableProbeKey`；源码顶部原注释（英文，仅作回查线索）：Answering "which models can this provider serve?" for the configuration surface's "fetch available models" action. A route the installed pi-ai catalog ships is answered **from that catalog**, with no network call at all: pi-ai's registry is the authoritativ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Generic pi-ai-backed LLM adapter plugin. One plugin instance owns a dict of provider routes; a route naming an installed pi-ai provider inherits that provider's endpoint, protocol, and model catalog as defaults, and a route pi-ai does not ship is declared o...”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`registrationFacts`、`directoryEntries`；本地静态 import 图显示它直接依赖 11 个源文件，并被 7 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)、[packages/llm/llm-pi-ai/src/auth.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/auth.ts)、[packages/llm/llm-pi-ai/src/catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/catalog.ts)、[packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/discovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/discovery.spec.ts)、[packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts)、[packages/llm/llm-pi-ai/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/loader-composition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md`、入口和消费者，再读当前契约，沿着 `packages/llm/llm-pi-ai/tests/adapter.e2e.ts`、`packages/llm/llm-pi-ai/tests/adapter.spec.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts` 看它怎样约束运行时，最后对照 `packages/llm/llm-pi-ai/tests/adapter.e2e.ts`、`packages/llm/llm-pi-ai/tests/adapter.spec.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 320 行；扫描到的声明包括 `name`、`inject`、`apply`、`registrationFacts`、`directoryEntries`；源码顶部原注释（英文，仅作回查线索）：Generic pi-ai-backed LLM adapter plugin. One plugin instance owns a dict of provider routes; a route naming an installed pi-ai provider inherits that provider's endpoint, protocol, and model catalog as defaults, and a route pi-ai does not ship is declared o...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/invariant.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-llm-pi-ai. @module @deepseek-ai/dsh-llm-pi-ai/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-llm-pi-ai. @module @deepseek-ai/dsh-llm-pi-ai/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/login.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/login.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Authorization flows for the pi-ai providers that ship a login. This is the whole of the translation between the harness's neutral notice/prompt vocabulary and pi-ai's AuthInteraction; nothing above it knows which library ran the conversation. @module dsh-ll...”；固定提交中扫描到的声明包括 `registerPiAiFlows`、`loginMethods`、`relay`、`restate`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/login.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/login.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/credentials/authorization/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/llm/llm-pi-ai/src/adapter.ts` 和 `packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/tests/login.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/login.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 161 行；扫描到的声明包括 `registerPiAiFlows`、`loginMethods`、`relay`、`restate`；源码顶部原注释（英文，仅作回查线索）：Authorization flows for the pi-ai providers that ship a login. This is the whole of the translation between the harness's neutral notice/prompt vocabulary and pi-ai's AuthInteraction; nothing above it knows which library ran the conversation. @module dsh-ll...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/provider.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供大语言模型的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Construction of the pi-ai Provider that one configured route registers into the adapter's Models collection. Two constructions, one decision: a route the installed catalog ships, whose profile does not override the wire protocol, **reuses that catalog provi...”；固定提交中扫描到的声明包括 `supportedProtocols`、`ProviderSpec`、`buildProvider`、`harnessApiKeyAuth`、`routeAuth`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/catalog.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/catalog.ts)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm-pi-ai/src/catalog.ts` 和 `packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/catalog.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 192 行；扫描到的声明包括 `supportedProtocols`、`ProviderSpec`、`buildProvider`、`harnessApiKeyAuth`、`routeAuth`、`reuseCatalogProvider`；源码顶部原注释（英文，仅作回查线索）：Construction of the pi-ai Provider that one configured route registers into the adapter's Models collection. Two constructions, one decision: a route the installed catalog ships, whose profile does not override the wire protocol, **reuses that catalog provi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/replay.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/replay.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Durable pi-ai replay metadata and assistant-history reconstruction. Harness content remains the durable source for text and tool calls. This module stores only the provider-native metadata needed to reconstruct a pi-ai assistant message on a later request. ...”；固定提交中扫描到的声明包括 `PiAiReplayBlock`、`PiAiReplayResponse`、`toPiReplayState`、`toPiAssistant`、`parseArguments`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-pi-ai/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/context.ts)、[packages/llm/llm-pi-ai/src/stream.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/stream.ts)、[packages/llm/llm-pi-ai/tests/context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/context.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/context.spec.ts)、[packages/llm/llm-pi-ai/tests/convert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/convert.spec.ts)、[packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts` 和 `packages/llm/llm-pi-ai/src/context.ts`、`packages/llm/llm-pi-ai/src/stream.ts`、`packages/llm/llm-pi-ai/tests/context.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/context.spec.ts`、`packages/llm/llm-pi-ai/tests/convert.spec.ts`、`packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 249 行；扫描到的声明包括 `PiAiReplayBlock`、`PiAiReplayResponse`、`toPiReplayState`、`toPiAssistant`、`parseArguments`、`emptyPiUsage`、`invalidReplay`、`readReplayState`；源码顶部原注释（英文，仅作回查线索）：Durable pi-ai replay metadata and assistant-history reconstruction. Harness content remains the durable source for text and tool calls. This module stores only the provider-native metadata needed to reconstruct a pi-ai assistant message on a later request. ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/src/stream.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/stream.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“pi-ai assistant event translation into the Harness streaming protocol. pi-ai tool-call arguments are parsed objects while the Harness keeps their raw JSON representation. pi-ai also reports failures as terminal stream events, which this module maps into Har...”；固定提交中扫描到的声明包括 `mapUsage`、`mapStopReason`、`classifyPiAiError`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/replay.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/replay.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)、[packages/llm/llm-pi-ai/tests/convert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/convert.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/convert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/convert.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-pi-ai/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm-pi-ai/src/replay.ts`、`packages/llm/llm/src/index.ts` 和 `packages/llm/llm-pi-ai/src/adapter.ts`、`packages/llm/llm-pi-ai/tests/convert.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-pi-ai/tests/convert.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 211 行；扫描到的声明包括 `mapUsage`、`mapStopReason`、`classifyPiAiError`；源码顶部原注释（英文，仅作回查线索）：pi-ai assistant event translation into the Harness streaming protocol. pi-ai tool-call arguments are parsed objects while the Harness keeps their raw JSON representation. pi-ai also reports failures as terminal stream events, which this module maps into Har...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“flash + reasoning off: plain text without reasoning blocks”、“pro + reasoning max: tool-call round trip”、“produces the same block structure as llm-deepseek for the same prompt”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“flash + reasoning off: plain text without reasoning blocks”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`ask`、`textOf`、`blockKinds`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-deepseek/src/index.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-deepseek/src/index.ts`、`packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 164 行；扫描到的声明包括 `harness`、`ask`、`textOf`、`blockKinds`；扫描到的测试主题包括 “flash + reasoning off: plain text without reasoning blocks”、“pro + reasoning max: tool-call round trip”、“produces the same block structure as llm-deepseek for the same prompt”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“PiAiAdapter provider routing”、“resolves a catalog model dynamically and uses a private endpoint”、“keeps prepared model metadata and dispatch on one profile snapshot”、“merges profile headers with Harness attribution winning”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“PiAiAdapter provider routing”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`adapterOf`、`LateAttachmentStore`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm-pi-ai/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1009 行；扫描到的声明包括 `harness`、`adapterOf`、`LateAttachmentStore`；扫描到的测试主题包括 “PiAiAdapter provider routing”、“resolves a catalog model dynamically and uses a private endpoint”、“keeps prepared model metadata and dispatch on one profile snapshot”、“merges profile headers with Harness attribution winning”、“forwards common stream options and profile reasoning”、“uses a dynamic request effort and reports unsupported efforts before network I/O”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试工具
- 这个文件有什么用：它为大语言模型的测试提供组装、模拟或渲染辅助，让真正的测试用例可以把重点放在行为和断言上。
- 为什么这样设计：测试辅助代码集中准备环境和输入，最终断言留在具体测试用例里；这样辅助逻辑可复用，又不会把“准备了什么”误当成“验证通过了什么”。
- 文件级设计证据：源码顶部注释把它定位为“Test helper: drive ctx.llm.stream() through a BlockAssembler and return the assembled message + usage + finish reason. This exercises the same streaming path production uses (the loop), rather than a service-level one-shot convenience method.”；固定提交中扫描到的声明包括 `AssembledResult`、`assemble`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/adapter.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.e2e.ts)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts)、[packages/llm/llm-pi-ai/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/loader-composition.spec.ts)、[packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/llm/llm-pi-ai/tests/adapter.e2e.ts`、`packages/llm/llm-pi-ai/tests/adapter.spec.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `AssembledResult`、`assemble`；源码顶部原注释（英文，仅作回查线索）：Test helper: drive ctx.llm.stream() through a BlockAssembler and return the assembled message + usage + finish reason. This exercises the same streaming path production uses (the loop), rather than a service-level one-shot convenience method.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“auth-double”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `memoryAuth`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/sdk-options.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/sdk-options.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/sdk-options.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/sdk-options.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/llm/llm-pi-ai/tests/adapter.spec.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts`、`packages/llm/llm-pi-ai/tests/sdk-options.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 39 行；扫描到的声明包括 `memoryAuth`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/auth.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“pi-ai credential store over harness records”、“reads nothing for a provider with no record”、“round-trips an api-key credential field by field”、“stores an api-key credential carrying neither a key nor env”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“pi-ai credential store over harness records”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stored`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)、[packages/llm/llm-pi-ai/src/auth.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/auth.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`、`packages/llm/llm-pi-ai/src/auth.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 172 行；扫描到的声明包括 `stored`；扫描到的测试主题包括 “pi-ai credential store over harness records”、“reads nothing for a provider with no record”、“round-trips an api-key credential field by field”、“stores an api-key credential carrying neither a key nor env”、“keeps an OAuth credential verbatim, refresh fields and all”、“shows the mutation the current credential and leaves it alone when declined”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“hand-declared providers”、“serves a route pi-ai has never heard of from its own declaration”、“lists and resolves the declared models rather than a catalog”、“offers no reasoning control it could not honour”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“hand-declared providers”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `home`、`bootWithSettings`、`gateway`、`harness`、`declared`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm-pi-ai/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/provider.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/src/provider.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1195 行；扫描到的声明包括 `home`、`bootWithSettings`、`gateway`、`harness`、`declared`、`modelOf`、`modelsOf`；扫描到的测试主题包括 “hand-declared providers”、“serves a route pi-ai has never heard of from its own declaration”、“lists and resolves the declared models rather than a catalog”、“offers no reasoning control it could not honour”、“joins the configurable-provider directory so a settings surface can reach it”、“sizes a model the catalog cannot describe from the route\u2019s own fallbacks”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/config.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“reasoning schema boundary”、“rejects a level pi-ai does not know at the write that produced it”、“keeps false distinguishable from an absent declaration”、“rejects a thinking format outside the offered set”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“reasoning schema boundary”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-pi-ai/src/config.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的测试主题包括 “reasoning schema boundary”、“rejects a level pi-ai does not know at the write that produced it”、“keeps false distinguishable from an absent declaration”、“rejects a thinking format outside the offered set”、“modality schema boundary”、“rejects a modality pi-ai does not know, at either level”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/context.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/context.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、上下文的具体场景，包括“pi-ai request context conversion”、“omits absent and empty request-level optional fields”、“converts complete text-only history and rejects nested images without storage”、“resolves user and tool-result images while preserving explicit fallbacks”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“pi-ai request context conversion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `requestImage`、`projectionStore`、`request`、`user`、`history`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-pi-ai/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/context.ts)、[packages/llm/llm-pi-ai/src/replay.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/replay.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-pi-ai/src/context.ts`、`packages/llm/llm-pi-ai/src/replay.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 414 行；扫描到的声明包括 `requestImage`、`projectionStore`、`request`、`user`、`history`；扫描到的测试主题包括 “pi-ai request context conversion”、“omits absent and empty request-level optional fields”、“converts complete text-only history and rejects nested images without storage”、“resolves user and tool-result images while preserving explicit fallbacks”、“recursively converts nested tool-result text and images”、“flattens nested text-only tool results and ignores other block types without storage”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/convert.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/convert.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“toPiContext”、“maps system prompt, user text, and tools”、“omits empty tools and absent system prompt”、“resolves durable image references into native pi-ai image content”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“toPiContext”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `usage`、`assistant`、`collect`、`requestVersion`、`attachmentStore`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-pi-ai/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/context.ts)、[packages/llm/llm-pi-ai/src/replay.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/replay.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-pi-ai/src/context.ts`、`packages/llm/llm-pi-ai/src/replay.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 908 行；扫描到的声明包括 `usage`、`assistant`、`collect`、`requestVersion`、`attachmentStore`、`expectDegraded`；扫描到的测试主题包括 “toPiContext”、“maps system prompt, user text, and tools”、“omits empty tools and absent system prompt”、“resolves durable image references into native pi-ai image content”、“flattens nested tool-result images into the enclosing result”、“rejects structured image history when no durable resolver is supplied”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/discovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/discovery.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“catalog-route model discovery”、“answers from the installed registry, with capacities and no network call”、“needs no endpoint for a route the catalog describes”、“says where a route the catalog does not describe must get its models”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“catalog-route model discovery”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `listingServer`、`harness`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/discovery.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/discovery.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-pi-ai/src/discovery.ts`、`packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 376 行；扫描到的声明包括 `listingServer`、`harness`；扫描到的测试主题包括 “catalog-route model discovery”、“answers from the installed registry, with capacities and no network call”、“needs no endpoint for a route the catalog describes”、“says where a route the catalog does not describe must get its models”、“draft-provider model discovery”、“reads an OpenAI-compatible listing and keeps the capacities it discloses”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“login flows in a real composition”、“offers a sign-in for a provider no route names, once the seam is mounted”、“mounts without the seam, and simply offers no sign-in”、“request-level dynamic profiles”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“login flows in a real composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `StubAdapter`、`home`、`boot`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/authorization/src/index.ts`、`packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `StubAdapter`、`home`、`boot`；扫描到的测试主题包括 “login flows in a real composition”、“offers a sign-in for a provider no route names, once the seam is mounted”、“mounts without the seam, and simply offers no sign-in”、“request-level dynamic profiles”、“mounts bare and dormant, then registers routes the moment settings supply providers”、“adds a provider route from settings and drops it when the user layer resets”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/loader-composition.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“llm-pi-ai real dormant composition”、“boots with zero routes and registers one the moment settings supply a profile”、“continues natively after max-token assembly drops a tool call, with pruned replay metadata”、“continues a legacy session whose stored replay state no longer matches its content”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“llm-pi-ai real dormant composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Real-composition guard for the dormant pi-ai posture: LlmRuntime, settings-file, credentials-local, and a bare llm-pi-ai row boot from a test-only cordis.yml through the actual Loader + Include path, an external edit of settings.yaml registers the route liv...”；固定提交中扫描到的声明包括 `loadComposition`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/credentials-local/src/index.ts`、`packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 244 行；扫描到的声明包括 `loadComposition`；扫描到的测试主题包括 “llm-pi-ai real dormant composition”、“boots with zero routes and registers one the moment settings supply a profile”、“continues natively after max-token assembly drops a tool call, with pruned replay metadata”、“continues a legacy session whose stored replay state no longer matches its content”；源码顶部原注释（英文，仅作回查线索）：Real-composition guard for the dormant pi-ai posture: LlmRuntime, settings-file, credentials-local, and a bare llm-pi-ai row boot from a test-only cordis.yml through the actual Loader + Include path, an external edit of settings.yaml registers the route liv...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/login.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/login.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“pi-ai login flows”、“offers one flow per installed provider, with the methods that provider ships”、“runs the pi-ai auth type the chosen method names”、“commits what the login produced, where the adapter reads it back”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“pi-ai login flows”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`surface`、`attempt`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/credentials/authorization/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/authorization/src/index.ts)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/credentials/credentials/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/credentials/authorization/src/index.ts`、`packages/credentials/credentials-local/src/index.ts`、`packages/credentials/credentials/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 198 行；扫描到的声明包括 `harness`、`surface`、`attempt`；扫描到的测试主题包括 “pi-ai login flows”、“offers one flow per installed provider, with the methods that provider ships”、“runs the pi-ai auth type the chosen method names”、“commits what the login produced, where the adapter reads it back”、“restates every pi-ai login event in the neutral vocabulary”、“restates every pi-ai prompt, carrying the per-prompt withdrawal signal”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/mock-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/mock-server.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试服务器
- 这个文件有什么用：它为大语言模型提供受控的模拟网络或模型服务，记录请求并返回可重复的响应，让测试不依赖真实网络。
- 为什么这样设计：网络或模型依赖放进受控的模拟服务，测试才能重复触发成功、断开和错误响应；生产连接实现不必为了测试而改变行为。
- 文件级设计证据：固定提交中扫描到的声明包括 `MockServer`、`closeMockServers`、`textEvents`、`mockServer`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts)
- 对应测试：[packages/llm/llm-pi-ai/tests/adapter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/adapter.spec.ts)、[packages/llm/llm-pi-ai/tests/catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/catalog.spec.ts)、[packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts)、[packages/llm/llm-pi-ai/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/loader-composition.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/llm/llm-pi-ai/tests/adapter.spec.ts`、`packages/llm/llm-pi-ai/tests/catalog.spec.ts`、`packages/llm/llm-pi-ai/tests/dynamic-config.spec.ts`，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `MockServer`、`closeMockServers`、`textEvents`、`mockServer`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/provider-apis.e2e.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“streams text with usage and native replay metadata”、“round-trips a tool call with provider-native replay metadata”、“sends a real image through the authenticated Anthropic visual path”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“streams text with usage and native replay metadata”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`E2eAttachmentStore`、`ask`、`textOf`、`expectFinish`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm-pi-ai/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/index.ts)、[packages/llm/llm-pi-ai/src/replay.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/replay.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/assemble.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/assemble.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm-pi-ai/src/index.ts`、`packages/llm/llm-pi-ai/src/replay.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 266 行；扫描到的声明包括 `harness`、`E2eAttachmentStore`、`ask`、`textOf`、`expectFinish`、`expectNativeReplay`；扫描到的测试主题包括 “streams text with usage and native replay metadata”、“round-trips a tool call with provider-native replay metadata”、“sends a real image through the authenticated Anthropic visual path”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-pi-ai/tests/sdk-options.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/sdk-options.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“pi-ai SDK retry boundary”、“pins one SDK attempt even when the installed provider currently defaults to zero retries”、“dispatches a hand-declared route to the endpoint and model its configuration describes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“pi-ai SDK retry boundary”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `gatewayAdapter`、`drain`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-pi-ai/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/README.md)、[packages/llm/llm-pi-ai/src/adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/adapter.ts)、[packages/llm/llm-pi-ai/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/src/config.ts)、[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/llm/llm-pi-ai/tests/auth-double.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-pi-ai/tests/auth-double.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm-pi-ai/src/adapter.ts`、`packages/llm/llm-pi-ai/src/config.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `gatewayAdapter`、`drain`；扫描到的测试主题包括 “pi-ai SDK retry boundary”、“pins one SDK attempt even when the installed provider currently defaults to zero retries”、“dispatches a hand-declared route to the endpoint and model its configuration describes”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/llm/llm-retry

### [packages/llm/llm-retry/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/brand.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：品牌类型
- 这个文件有什么用：它为大语言模型、品牌类型定义带语义的品牌类型，使编译器能阻止不同用途的标识符互相替换。
- 为什么这样设计：在编译期区分语义不同的标识符，能把一类容易被普通字符串掩盖的调用错误提前暴露，而不增加运行时序列化成本。
- 文件级设计证据：固定提交中扫描到的声明包括 `RetryId`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/llm/llm-retry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/index.ts)、[packages/llm/llm-retry/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm-retry/README.md`、入口和消费者，再读当前契约，沿着 `packages/llm/llm-retry/src/index.ts`、`packages/llm/llm-retry/src/types.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 13 行；扫描到的声明包括 `RetryId`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/src/history.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/history.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Durable request-route lookup for one open model step. @module @deepseek-ai/dsh-llm-retry/history”；固定提交中扫描到的声明包括 `providerForOpenStep`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm-retry/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/invariant.ts)、[packages/llm/llm-retry/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/invariant.spec.ts)
- 对应测试：[packages/llm/llm-retry/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-retry/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts` 和 `packages/llm/llm-retry/src/invariant.ts`、`packages/llm/llm-retry/tests/invariant.spec.ts` 确认输入输出，最后对照 `packages/llm/llm-retry/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `providerForOpenStep`；源码顶部原注释（英文，仅作回查线索）：Durable request-route lookup for one open model step. @module @deepseek-ai/dsh-llm-retry/history。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/index.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Provider-routed model-request retry policy on the agent loop's request recovery extension point. Each scheduled retry is durable before its cancellable wait. @module @deepseek-ai/dsh-llm-retry”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`RetryInternals`、`apply`；本地静态 import 图显示它直接依赖 7 个源文件，并被 8 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm-retry/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/brand.ts)、[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)
- 对应测试：[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/llm/llm-retry/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/invariant.spec.ts)、[packages/llm/llm-retry/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/loader-composition.spec.ts)、[packages/llm/llm-retry/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/persistence.spec.ts)、[packages/llm/llm-retry/tests/retry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/retry.spec.ts)、[packages/llm/llm-retry/tests/transport-recovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/transport-recovery.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-retry/README.md`、入口和消费者，再读当前契约，沿着 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/examples/agent-spine-demo/src/index.ts`、`packages/llm/llm-retry/src/invariant.ts` 看它怎样约束运行时，最后对照 `packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts`、`packages/llm/llm-retry/tests/invariant.spec.ts`、`packages/llm/llm-retry/tests/loader-composition.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 226 行；扫描到的声明包括 `name`、`inject`、`Config`、`RetryInternals`、`apply`、`validateConfig`、`settleDownstream`、`localDelay`；源码顶部原注释（英文，仅作回查线索）：Provider-routed model-request retry policy on the agent loop's request recovery extension point. Each scheduled retry is durable before its cancellable wait. @module @deepseek-ai/dsh-llm-retry。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/invariant.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned durable retry-event invariants. @module @deepseek-ai/dsh-llm-retry/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`validateFailure`、`validateRetry`；本地静态 import 图显示它直接依赖 7 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm-retry/src/history.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/history.ts)、[packages/llm/llm-retry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/index.ts)、[packages/llm/llm-retry/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/invariant.spec.ts)
- 对应测试：[packages/llm/llm-retry/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm-retry/src/history.ts`、`packages/llm/llm-retry/src/index.ts` 和 `packages/llm/llm-retry/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/llm/llm-retry/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 174 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateFailure`、`validateRetry`、`validateStarted`、`validateSession`；源码顶部原注释（英文，仅作回查线索）：Package-owned durable retry-event invariants. @module @deepseek-ai/dsh-llm-retry/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/types.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述大语言模型中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：固定提交中扫描到的声明包括 `LlmRetryEventData`、`LlmRetryStartedEventData`；本地静态 import 图显示它直接依赖 2 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/llm/llm-retry/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/brand.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/client/ui-conversation/src/client/conversation-nodes/assistant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/conversation-nodes/assistant.ts)
- 对应测试：[packages/llm/llm-retry/tests/retry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/retry.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm-retry/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/client/ui-conversation/src/client/conversation-nodes/assistant.ts`、`packages/client/ui-conversation/src/client/conversation-nodes/retry.ts` 看它怎样约束运行时，最后对照 `packages/llm/llm-retry/tests/retry.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `LlmRetryEventData`、`LlmRetryStartedEventData`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/invariant.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“llm-retry invariants”、“has no provider without the requested open step or a route marker”、“accepts successive bounded and unbounded records inside their open steps”、“validates the complete durable failure payload”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“llm-retry invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`openStep`、`appendRetryTurn`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm-retry/src/history.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/history.ts)、[packages/llm/llm-retry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm-retry/src/history.ts`、`packages/llm/llm-retry/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 335 行；扫描到的声明包括 `setup`、`openStep`、`appendRetryTurn`；扫描到的测试主题包括 “llm-retry invariants”、“has no provider without the requested open step or a route marker”、“accepts successive bounded and unbounded records inside their open steps”、“validates the complete durable failure payload”、“rejects records outside the currently open turn and step”、“accepts successive retries in one step and rejects skipped numbering”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/loader-composition.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“real Loader composition”、“loads provider-supplied policy and records recovery through the shipping loop”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TransientOnceAdapter`、`loadYaml`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 118 行；扫描到的声明包括 `TransientOnceAdapter`、`loadYaml`；扫描到的测试主题包括 “real Loader composition”、“loads provider-supplied policy and records recovery through the shipping loop”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/tests/persistence.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/persistence.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、持久化的具体场景，包括“round-trips the event losslessly without adding a model message”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“round-trips the event losslessly without adding a model message”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `backend`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm-retry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/src/index.ts)、[packages/session/session-persistence-jsonl/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-persistence-jsonl/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm-retry/src/index.ts`、`packages/session/session-persistence-jsonl/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 67 行；扫描到的声明包括 `backend`；扫描到的测试主题包括 “round-trips the event losslessly without adding a model message”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/tests/retry.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/retry.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“keeps the browser-safe retry payload identical to the session event”、“provider-routed retry policy”、“records the scheduled delay before retrying the request”、“retries an EMPTY_RESPONSE error finish under the default retryable codes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“keeps the browser-safe retry payload identical to the session event”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ScriptedAdapter`、`textResponse`、`emptyCompletion`、`harness`、`normalConfig`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1038 行；扫描到的声明包括 `ScriptedAdapter`、`textResponse`、`emptyCompletion`、`harness`、`normalConfig`、`alwaysConfig`、`waitForIdle`、`waitForRetry`；扫描到的测试主题包括 “keeps the browser-safe retry payload identical to the session event”、“provider-routed retry policy”、“records the scheduled delay before retrying the request”、“retries an EMPTY_RESPONSE error finish under the default retryable codes”、“leaves partial failed chunks on their step without committing a message or tool side effect”、“applies bounded exponential jitter and stops after the configured budget”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/tests/transport-recovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tests/transport-recovery.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“bounded retry through the real DeepSeek HTTP/SSE adapter”、“recovers from a true refused connection after the endpoint starts during backoff”、“retries a wire-valid content-less completion without committing an empty message”、“exposes a clean partial EOF as non-default-retryable STREAM_CLOSED”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“bounded retry through the real DeepSeek HTTP/SSE adapter”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `start`、`harness`、`waitForIdle`、`sendAndWait`、`finalAssistantText`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 245 行；扫描到的声明包括 `start`、`harness`、`waitForIdle`、`sendAndWait`、`finalAssistantText`、`unusedPort`；扫描到的测试主题包括 “bounded retry through the real DeepSeek HTTP/SSE adapter”、“recovers from a true refused connection after the endpoint starts during backoff”、“retries a wire-valid content-less completion without committing an empty message”、“exposes a clean partial EOF as non-default-retryable STREAM_CLOSED”、“turns a stalled body into TIMEOUT and succeeds on the next request”、“stops after the configured transport retry budget is exhausted”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm-retry/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/tsdown.config.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理大语言模型：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm-retry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm-retry/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/llm/llm-retry/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/llm/llm

### [packages/llm/llm/src/adapter-failure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/adapter-failure.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成大语言模型能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Normalization for values thrown by a final LLM adapter boundary. @module @deepseek-ai/dsh-llm/adapter-failure”；固定提交中扫描到的声明包括 `normalizeLlmFailure`、`thrownMessage`、`ownErrorCode`、`ownFailureSnapshot`、`failureSnapshot`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/error.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm/tests/adapter-failure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/adapter-failure.spec.ts)
- 对应测试：[packages/llm/llm/tests/adapter-failure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/adapter-failure.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/error.ts`、`packages/llm/llm/src/types.ts` 和 `packages/llm/llm/src/index.ts`、`packages/llm/llm/tests/adapter-failure.spec.ts` 确认输入输出，最后对照 `packages/llm/llm/tests/adapter-failure.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 104 行；扫描到的声明包括 `normalizeLlmFailure`、`thrownMessage`、`ownErrorCode`、`ownFailureSnapshot`、`failureSnapshot`、`errorMessage`、`harnessErrorCode`；源码顶部原注释（英文，仅作回查线索）：Normalization for values thrown by a final LLM adapter boundary. @module @deepseek-ai/dsh-llm/adapter-failure。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/api-key.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/api-key.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：API 边界
- 这个文件有什么用：它集中处理大语言模型、API 边界的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。
- 为什么这样设计：外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。
- 文件级设计证据：源码顶部注释把它定位为“The one definition of a well-formed provider API key, shared by every adapter that puts one in an HTTP header. @module @deepseek-ai/dsh-llm/api-key”；固定提交中扫描到的声明包括 `ApiKeyRejection`、`ApiKeyCheck`、`normalizeApiKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/llm/llm/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `ApiKeyRejection`、`ApiKeyCheck`、`normalizeApiKey`；源码顶部原注释（英文，仅作回查线索）：The one definition of a well-formed provider API key, shared by every adapter that puts one in an HTTP header. @module @deepseek-ai/dsh-llm/api-key。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/assembler.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：提示词与上下文
- 这个文件有什么用：它把大语言模型的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Incremental chunk-to-message assembler. This is the single canonical assembly algorithm used by the agent loop to build an assistant message from a chunk stream while logging the raw chunks for replay fidelity. @module @deepseek-ai/dsh-llm/assembler”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Incremental chunk-to-message assembler. This is the single canonical assembly algorithm used by the agent loop to build an assistant message from a chunk stream while logging the raw chunks for replay fidelity. @module @deepseek-ai/dsh-llm/assembler”；固定提交中扫描到的声明包括 `BlockAssembler`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)、[packages/llm/llm/src/never.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/never.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/brand.ts`、`packages/llm/llm/src/message.ts`、`packages/llm/llm/src/never.ts` 和 `packages/llm/llm/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 207 行；扫描到的声明包括 `BlockAssembler`；源码顶部原注释（英文，仅作回查线索）：Incremental chunk-to-message assembler. This is the single canonical assembly algorithm used by the agent loop to build an assistant message from a chunk stream while logging the raw chunks for replay fidelity. @module @deepseek-ai/dsh-llm/assembler。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/attribution.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/attribution.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Centralize the non-secret product identity every provider request sends as User-Agent, keeping adapters from drifting. See .agents/notes/implemented/architecture/2026-06-21-mandatory-app-attribution-headers.md. App-attribution vocabulary for provider reques...”；固定提交中扫描到的声明包括 `AppIdentity`、`APP_IDENTITY`、`userAgent`、`attributionHeaders`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/llm/llm/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `AppIdentity`、`APP_IDENTITY`、`userAgent`、`attributionHeaders`；源码顶部原注释（英文，仅作回查线索）：Centralize the non-secret product identity every provider request sends as User-Agent, keeping adapters from drifting. See .agents/notes/implemented/architecture/2026-06-21-mandatory-app-attribution-headers.md. App-attribution vocabulary for provider reques...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：品牌类型
- 这个文件有什么用：它为大语言模型、品牌类型定义带语义的品牌类型，使编译器能阻止不同用途的标识符互相替换。
- 为什么这样设计：在编译期区分语义不同的标识符，能把一类容易被普通字符串掩盖的调用错误提前暴露，而不增加运行时序列化成本。
- 文件级设计证据：源码顶部注释把它定位为“dsh-llm's owned branded ids: tool-call correlation and provider request diagnostics. The Branded<B> primitive itself lives in @deepseek-ai/dsh-brand (a zero-dependency type-only package) so every owner of a cross-boundary id can brand it without depending o...”；固定提交中扫描到的声明包括 `MessageId`、`CallId`、`ProviderRequestId`、`ReasoningEffortId`；本地静态 import 图显示它直接依赖 1 个源文件，并被 21 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/client/connection/src/client/api.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/api.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)
- 对应测试：[packages/feedback/message-feedback/tests/message-feedback.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/tests/message-feedback.spec.ts)、[packages/llm/llm/tests/call-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/call-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/feedback/message-feedback/tests/helpers.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/tests/helpers.ts)
- 阅读顺序：先读 `packages/llm/llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/connection/src/client/api.ts`、`packages/client/connection/src/client/fixture.ts`、`packages/client/runtime/src/client/sessions/conversation.ts` 看它怎样约束运行时，最后对照 `packages/feedback/message-feedback/tests/message-feedback.spec.ts`、`packages/llm/llm/tests/call-config.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `MessageId`、`CallId`、`ProviderRequestId`、`ReasoningEffortId`；源码顶部原注释（英文，仅作回查线索）：dsh-llm's owned branded ids: tool-call correlation and provider request diagnostics. The Branded<B> primitive itself lives in @deepseek-ai/dsh-brand (a zero-dependency type-only package) so every owner of a cross-boundary id can brand it without depending o...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/call-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/call-config.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义大语言模型可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Conversation call configuration and freeze utilities. Provider routing, model, reasoning effort, and sampling values are request-header state that can affect cache reuse; request waterfalls replace them and the loop logs changed snapshots instead of allowin...”；固定提交中扫描到的声明包括 `LlmCallConfig`、`LlmCallConfigAdapterDefaults`、`callConfigEquals`、`markAgentLoopRequest`、`isAgentLoopRequest`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)
- 对应测试：[packages/llm/llm/tests/call-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/call-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/llm/README.md`，再读本配置/脚本，沿着 `packages/llm/llm/src/index.ts`、`packages/llm/llm/src/message.ts`、`packages/llm/llm/tests/call-config.spec.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 117 行；扫描到的声明包括 `LlmCallConfig`、`LlmCallConfigAdapterDefaults`、`callConfigEquals`、`markAgentLoopRequest`、`isAgentLoopRequest`、`deepFreeze`；源码顶部原注释（英文，仅作回查线索）：Conversation call configuration and freeze utilities. Provider routing, model, reasoning effort, and sampling values are request-header state that can affect cache reuse; request waterfalls replace them and the loop logs changed snapshots instead of allowin...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/content.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/content.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：消息模型
- 这个文件有什么用：它定义大语言模型、内容的消息或内容块结构，使模型、日志、工具和界面使用同一份消息语义。
- 为什么这样设计：消息是模型、日志、工具和 UI 的共同语言，集中定义可以避免每一层都做一套不兼容的内容判断。
- 文件级设计证据：源码顶部注释把它定位为“Content-block structure helpers. @module @deepseek-ai/dsh-llm/content”；固定提交中扫描到的声明包括 `OFFLOADED_IMAGE_TEXT`、`textOnlyImageText`、`requestImageHandleText`、`contentHasImage`、`RequestImageOffloadPolicy`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/llm/llm/src/index.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `OFFLOADED_IMAGE_TEXT`、`textOnlyImageText`、`requestImageHandleText`、`contentHasImage`、`RequestImageOffloadPolicy`、`projectImagesForTextModel`、`offloadRequestImages`、`offloadRequestImagesWithPolicy`；源码顶部原注释（英文，仅作回查线索）：Content-block structure helpers. @module @deepseek-ai/dsh-llm/content。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/error.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Harness error base with a stable machine-routable code and chained cause. Package errors extend it so tool results and replay can retain failure class. @module @deepseek-ai/dsh-llm/error”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Harness error base with a stable machine-routable code and chained cause. Package errors extend it so tool results and replay can retain failure class. @module @deepseek-ai/dsh-llm/error”；固定提交中扫描到的声明包括 `HarnessError`、`CONTEXT_WINDOW_EXCEEDED_CODE`、`QUOTA_EXCEEDED_CODE`、`EMPTY_RESPONSE_CODE`、`INVALID_CREDENTIAL_CODE`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/adapter-failure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/adapter-failure.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm/src/retry-policy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/retry-policy.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/llm/llm/src/adapter-failure.ts`、`packages/llm/llm/src/index.ts`、`packages/llm/llm/src/retry-policy.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 163 行；扫描到的声明包括 `HarnessError`、`CONTEXT_WINDOW_EXCEEDED_CODE`、`QUOTA_EXCEEDED_CODE`、`EMPTY_RESPONSE_CODE`、`INVALID_CREDENTIAL_CODE`、`isContextWindowExceededError`、`isQuotaExceededError`、`errorChain`；源码顶部原注释（英文，仅作回查线索）：Harness error base with a stable machine-routable code and chained cause. Package errors extend it so tool results and replay can retain failure class. @module @deepseek-ai/dsh-llm/error。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“LLM service: adapter registry with a waterfall-interceptable streaming call API. Exports the LlmRuntime default, the abstract LlmAdapter for provider backends, and BlockAssembler for chunk assembly. @module @deepseek-ai/dsh-llm”；固定提交中扫描到的声明包括 `LlmErrorOptions`、`LlmError`、`assertUsableApiKey`、`PreparedLlmCall`、`PreparedAdapterCall`；本地静态 import 图显示它直接依赖 13 个源文件，并被 432 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/adapter-failure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/adapter-failure.ts)、[packages/llm/llm/src/api-key.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/api-key.ts)、[packages/llm/llm/src/assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/assembler.ts)、[apps/cli/tests/fixtures/dsh-badge/snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/fixtures/dsh-badge/snapshot.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/background-job-list.e2e.ts)、[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)、[apps/web/tests/complex-history.perf.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/complex-history.perf.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/chat-scroll-fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-fixture.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/llm/llm/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/fixtures/dsh-badge/snapshot.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts`、`apps/web/tests/chat-continuous-conversation.e2e.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1026 行；扫描到的声明包括 `LlmErrorOptions`、`LlmError`、`assertUsableApiKey`、`PreparedLlmCall`、`PreparedAdapterCall`、`AdapterRegistrationHandle`、`DirectoryRegistrationHandle`、`LlmRuntime`；源码顶部原注释（英文，仅作回查线索）：LLM service: adapter registry with a waterfall-interceptable streaming call API. Exports the LlmRuntime default, the abstract LlmAdapter for provider backends, and BlockAssembler for chunk assembly. @module @deepseek-ai/dsh-llm。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/invariant.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned LLM stream-protocol invariants. @module @deepseek-ai/dsh-llm/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`、`validateIndex`、`validateDelta`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/llm/llm/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/invariant.spec.ts)
- 对应测试：[packages/llm/llm/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/llm/llm/src/types.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/llm/llm/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/llm/llm/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 112 行；扫描到的声明包括 `name`、`inject`、`apply`、`validateIndex`、`validateDelta`；源码顶部原注释（英文，仅作回查线索）：Package-owned LLM stream-protocol invariants. @module @deepseek-ai/dsh-llm/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：消息模型
- 这个文件有什么用：它定义大语言模型、消息的消息或内容块结构，使模型、日志、工具和界面使用同一份消息语义。
- 为什么这样设计：消息是模型、日志、工具和 UI 的共同语言，集中定义可以避免每一层都做一套不兼容的内容判断。
- 文件级设计证据：源码顶部注释把它定位为“Message value types, identity, and immutable construction helpers.”；固定提交中扫描到的声明包括 `AssistantProvenance`、`ModelMessageSource`、`ToolMessageSource`、`ContextForm`、`ContextSnapshotSection`；本地静态 import 图显示它直接依赖 3 个源文件，并被 9 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)、[packages/llm/llm/src/call-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/call-config.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/connection/src/client/fixture.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/fixture.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/connection/src/client/fixture.ts`、`packages/client/runtime/src/client/sessions/assistant-timing.ts`、`packages/compaction/compaction/src/checkpoint.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 261 行；扫描到的声明包括 `AssistantProvenance`、`ModelMessageSource`、`ToolMessageSource`、`ContextForm`、`ContextSnapshotSection`、`ContextFormed`、`MessageSourceMap`、`CONTEXT_SUMMARY_MAX_CHARS`；源码顶部原注释（英文，仅作回查线索）：Message value types, identity, and immutable construction helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/never.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/never.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型服务实现
- 这个文件有什么用：这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。
- 为什么这样设计：统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。
- 文件级设计证据：源码顶部注释把它定位为“Exhaustiveness helper for closed core unions. Use assertNever at the default branch so a new variant fails compilation at every required handler. Do not use it for declaration-merged unions such as session events or content blocks: handle known variants and...”；固定提交中扫描到的声明包括 `assertNever`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/assembler.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/llm/llm/src/assembler.ts`、`packages/llm/llm/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `assertNever`；源码顶部原注释（英文，仅作回查线索）：Exhaustiveness helper for closed core unions. Use assertNever at the default branch so a new variant fails compilation at every required handler. Do not use it for declaration-merged unions such as session events or content blocks: handle known variants and...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/retry-policy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/retry-policy.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：策略与权限边界
- 这个文件有什么用：它集中判断大语言模型、策略是否允许以及需要哪种授权，让调用方不必各自复制权限规则。
- 为什么这样设计：权限判断集中后，所有调用路径可以共享同一条拒绝规则；策略变化也不会要求每个工具、路由和界面分别修补。
- 文件级设计证据：源码顶部注释把它定位为“Provider-owned request-retry policy configuration and resolution. Adapters expose one resolved policy per registered provider route; the optional dsh-llm-retry plugin executes it on the agent's failed-step extension point. @module @deepseek-ai/dsh-llm/retry...”；固定提交中扫描到的声明包括 `BackoffConfig`、`NormalRetryPolicyConfig`、`AlwaysRetryPolicyConfig`、`RetryPolicyConfig`、`ResolvedRetryBackoff`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/error.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/windows-shell.spec.ts)、[apps/web/stress-tests/reasoning-chunks.stress.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/stress-tests/reasoning-chunks.stress.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/llm/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/error.ts`、`packages/util/timeout/src/index.ts`、`vendor/schemastery/src/index.ts` 和 `packages/llm/llm/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/dsh-badge.snapshot.ts`、`apps/cli/tests/headless-shutdown.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 195 行；扫描到的声明包括 `BackoffConfig`、`NormalRetryPolicyConfig`、`AlwaysRetryPolicyConfig`、`RetryPolicyConfig`、`ResolvedRetryBackoff`、`ResolvedNormalRetryPolicy`、`ResolvedAlwaysRetryPolicy`、`ResolvedRetryPolicy`；源码顶部原注释（英文，仅作回查线索）：Provider-owned request-retry policy configuration and resolution. Adapters expose one resolved policy per registered provider route; the optional dsh-llm-retry plugin executes it on the agent's failed-step extension point. @module @deepseek-ai/dsh-llm/retry...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述大语言模型中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Canonical provider-neutral message and streaming vocabulary for the loop, session log, and plugins. Adapters alone translate provider wire messages; mapped interfaces make the content, source, and finish unions extensible.”；固定提交中扫描到的声明包括 `LlmFailure`、`TextBlock`、`ReasoningBlock`、`ImageBlock`、`ToolCallBlock`；本地静态 import 图显示它直接依赖 4 个源文件，并被 24 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/queue-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/queue-store.client.spec.ts)、[packages/llm/llm/tests/call-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/call-config.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/llm/llm/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/remotes/src/client/index.ts`、`packages/api/remotes/src/index.ts`、`packages/client/connection/src/client/api.ts` 看它怎样约束运行时，最后对照 `packages/client/runtime/tests/queue-store.client.spec.ts`、`packages/llm/llm/tests/call-config.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 377 行；扫描到的声明包括 `LlmFailure`、`TextBlock`、`ReasoningBlock`、`ImageBlock`、`ToolCallBlock`、`ToolResultBlock`、`ContentBlockMap`、`ContentBlockType`；源码顶部原注释（英文，仅作回查线索）：Canonical provider-neutral message and streaming vocabulary for the loop, session log, and plugins. Adapters alone translate provider wire messages; mapped interfaces make the content, source, and finish unions extensible.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/adapter-failure.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/adapter-failure.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“adapter failure normalization”、“contains hostile non-Error coercion”、“normalizes empty primitive throws and data descriptors without values”、“contains hostile Error property reflection”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“adapter failure normalization”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/adapter-failure.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/adapter-failure.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/adapter-failure.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的测试主题包括 “adapter failure normalization”、“contains hostile non-Error coercion”、“normalizes empty primitive throws and data descriptors without values”、“contains hostile Error property reflection”、“rejects malformed or accessor-backed failure snapshots”、“falls back when an Error message accessor throws”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/api-key.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/api-key.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、API 边界的具体场景，包括“normalizeApiKey”、“accepts a printable-ASCII key unchanged”、“trims surrounding whitespace before judging”、“accepts the printable-ASCII boundary characters”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“normalizeApiKey”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的测试主题包括 “normalizeApiKey”、“accepts a printable-ASCII key unchanged”、“trims surrounding whitespace before judging”、“accepts the printable-ASCII boundary characters”、“publishes a code distinct from a missing credential”、“assertUsableApiKey”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/assembler.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/assembler.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“BlockAssembler”、“assembles interleaved text, reasoning, and tool-call deltas”、“records the completed block from block-end”、“tolerates deltas without explicit block-start/end”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“BlockAssembler”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 264 行；扫描到的测试主题包括 “BlockAssembler”、“assembles interleaved text, reasoning, and tool-call deltas”、“records the completed block from block-end”、“tolerates deltas without explicit block-start/end”、“returns undefined usage when no usage chunk was received”、“reuses an existing partial when ensure() is called with a tracked index”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/attribution.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/attribution.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“APP_IDENTITY”、“sources the version from the package manifest, never a hand-copied constant”、“carries only static public product facts”、“userAgent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“APP_IDENTITY”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 51 行；扫描到的测试主题包括 “APP_IDENTITY”、“sources the version from the package manifest, never a hand-copied constant”、“carries only static public product facts”、“userAgent”、“renders product/version with the +url comment”、“renders a custom identity”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/call-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/call-config.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“callConfigEquals”、“compares every field, including the stop list element-wise”、“deepFreeze”、“freezes nested structure in place and returns the same reference”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“callConfigEquals”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“call-config unit tests: field-wise LlmCallConfig equality (the real-change detector behind logged changed headers) and the deepFreeze ownership helper the loop applies to every built request.”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/brand.ts)、[packages/llm/llm/src/call-config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/call-config.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/brand.ts`、`packages/llm/llm/src/call-config.ts`、`packages/llm/llm/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的测试主题包括 “callConfigEquals”、“compares every field, including the stop list element-wise”、“deepFreeze”、“freezes nested structure in place and returns the same reference”、“never freezes an AbortSignal: the live cancellation channel keeps working”、“passes primitives through and terminates on cycles”；源码顶部原注释（英文，仅作回查线索）：call-config unit tests: field-wise LlmCallConfig equality (the real-change detector behind logged changed headers) and the deepFreeze ownership helper the loop applies to every built request.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/content.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/content.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、内容的具体场景，包括“offloadRequestImages”、“preserves every image when no payload bound is configured”、“preserves the original request when its base64 payload fits exactly”、“keeps five 3 MiB images at 20 MiB and offloads the oldest after one more raw byte”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“offloadRequestImages”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `image`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 185 行；扫描到的声明包括 `image`；扫描到的测试主题包括 “offloadRequestImages”、“preserves every image when no payload bound is configured”、“preserves the original request when its base64 payload fits exactly”、“keeps five 3 MiB images at 20 MiB and offloads the oldest after one more raw byte”、“replaces the oldest nested occurrences without mutating durable messages”、“replaces a single image that cannot fit”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/invariant.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“LLM stream invariants”、“accepts a complete interleaved stream grammar”、“preserves provider exceptions without inventing a missing-finish failure”、“adapters-updated invariants”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LLM stream invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `setup`、`consume`、`NoopAdapter`、`BrokenLlm`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`、`packages/llm/llm/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `setup`、`consume`、`NoopAdapter`、`BrokenLlm`；扫描到的测试主题包括 “LLM stream invariants”、“accepts a complete interleaved stream grammar”、“preserves provider exceptions without inventing a missing-finish failure”、“adapters-updated invariants”、“accepts a coherent registry at every topology notification”、“skips the check when the service store has no llm entry”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/message.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/message.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、消息的具体场景，包括“message construction”、“assigns identity immediately and returns a detached deep-frozen message”、“freezes an existing identity without minting a replacement”、“fixes the assistant role and model source kind at creation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“message construction”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的测试主题包括 “message construction”、“assigns identity immediately and returns a detached deep-frozen message”、“freezes an existing identity without minting a replacement”、“fixes the assistant role and model source kind at creation”、“couples tool-result content and its cited call seq to one call identity”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/properties.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/properties.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“BlockAssembler properties”、“partials map size never exceeds the number of distinct indices seen”、“re-assembly is idempotent: blocks() is stable across repeated calls”、“blocks() never throws and yields only valid content-block tags”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“BlockAssembler properties”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Property-based tests for the BlockAssembler (the property-testing Agent Note). The assembler is protocol-shaped: arbitrary interleavings of block-start, deltas, block-end, usage, and finish — valid and malformed (duplicate indices, stragglers after block-en...”；固定提交中扫描到的声明包括 `feed`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `feed`；扫描到的测试主题包括 “BlockAssembler properties”、“partials map size never exceeds the number of distinct indices seen”、“re-assembly is idempotent: blocks() is stable across repeated calls”、“blocks() never throws and yields only valid content-block tags”、“finish reflects the last finish chunk, or defaults to stop when none arrives”；源码顶部原注释（英文，仅作回查线索）：Property-based tests for the BlockAssembler (the property-testing Agent Note). The assembler is protocol-shaped: arbitrary interleavings of block-start, deltas, block-end, usage, and finish — valid and malformed (duplicate indices, stragglers after block-en...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/retry-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/retry-policy.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、策略的具体场景，包括“provider retry policy”、“resolves immutable normal defaults”、“resolves and detaches a configured normal policy”、“resolves always mode with default backoff”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“provider retry policy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`、`packages/util/timeout/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的测试主题包括 “provider retry policy”、“resolves immutable normal defaults”、“resolves and detaches a configured normal policy”、“resolves always mode with default backoff”、“ignores normal-only fields retained after switching to always mode”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/service.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“LlmRuntime”、“recognizes structured and model-capacity context-window overflow details”、“does not mistake unrelated input validation for context-window overflow”、“distinguishes exhausted account quota from transient rate limiting”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LlmRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ScriptedAdapter`、`RecordingAdapter`、`ThrowingAdapter`、`CatalogAdapter`、`collect`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1333 行；扫描到的声明包括 `ScriptedAdapter`、`RecordingAdapter`、`ThrowingAdapter`、`CatalogAdapter`、`collect`；扫描到的测试主题包括 “LlmRuntime”、“recognizes structured and model-capacity context-window overflow details”、“does not mistake unrelated input validation for context-window overflow”、“distinguishes exhausted account quota from transient rate limiting”、“errorChain renders the full cause chain of a wrapped transport failure”、“errorChain renders AggregateError members (Happy Eyeballs multi-address failures)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/llm/tests/topology.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/tests/topology.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“llm/adapters-updated”、“fires at both adapter registration commit points with the registry already readable”、“contains a throwing listener without vetoing registration or starving later listeners”、“contains an ASYNC listener rejection instead of leaving it unhandled”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“llm/adapters-updated”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `NoopAdapter`、`setup`、`entry`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/llm/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/llm/llm/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 268 行；扫描到的声明包括 `NoopAdapter`、`setup`、`entry`；扫描到的测试主题包括 “llm/adapters-updated”、“fires at both adapter registration commit points with the registry already readable”、“contains a throwing listener without vetoing registration or starving later listeners”、“contains an ASYNC listener rejection instead of leaving it unhandled”、“replaces a route set in one event, never publishing an empty registry between the two”、“rethrows the first INVARIANT-coded listener failure after notifying the rest”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

## packages/llm/token-meter

### [packages/llm/token-meter/src/breakdown-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/breakdown-projection.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把大语言模型、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 文件级设计证据：源码顶部注释把它定位为“Pure fold for the heuristic context-composition projection: system prompt and tool schemas from the newest request envelope, conversation from the live surface. Prices with the same shared estimator as the meter service, so the three figures match measure()...”；固定提交中扫描到的声明包括 `contextBreakdownProjectionDefinition`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/token-meter/src/estimate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/estimate.ts)、[packages/llm/token-meter/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/projection.ts)、[packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)
- 对应测试：[packages/llm/token-meter/tests/context-breakdown-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/context-breakdown-projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/token-meter/src/estimate.ts`、`packages/llm/token-meter/src/projection.ts` 和 `packages/llm/token-meter/src/index.ts`、`packages/llm/token-meter/tests/context-breakdown-projection.spec.ts` 理解状态变化，最后对照 `packages/llm/token-meter/tests/context-breakdown-projection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 85 行；扫描到的声明包括 `contextBreakdownProjectionDefinition`；源码顶部原注释（英文，仅作回查线索）：Pure fold for the heuristic context-composition projection: system prompt and tool schemas from the newest request envelope, conversation from the live surface. Prices with the same shared estimator as the meter service, so the three figures match measure()...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/client.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成大语言模型、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Client-namespace projection of token-meter's browser-safe types. @module @deepseek-ai/dsh-token-meter/client”；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/llm/token-meter/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/projection.ts)、[packages/client/ui-conversation/src/client/chat/StatsLine.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/chat/StatsLine.tsx)、[packages/client/ui-conversation/src/client/skeleton/ContextMeter.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/skeleton/ContextMeter.tsx)、[packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx)
- 对应测试：[packages/llm/token-meter/tests/context-breakdown-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/context-breakdown-projection.spec.ts)、[packages/llm/token-meter/tests/token-usage-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/token-usage-projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/token-meter/README.md` 和入口，再读当前实现，沿着 `packages/llm/token-meter/src/projection.ts` 和 `packages/client/ui-conversation/src/client/chat/StatsLine.tsx`、`packages/client/ui-conversation/src/client/skeleton/ContextMeter.tsx`、`packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx` 确认输入输出，最后对照 `packages/llm/token-meter/tests/context-breakdown-projection.spec.ts`、`packages/llm/token-meter/tests/token-usage-projection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 7 行；源码顶部原注释（英文，仅作回查线索）：Client-namespace projection of token-meter's browser-safe types. @module @deepseek-ai/dsh-token-meter/client。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/estimate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/estimate.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模型 token 估算器
- 这个文件有什么用：它按固定启发式估算消息、系统提示词和工具 schema 的 token 占用，为上下文预算和 UI token meter 提供一致的计算入口。
- 为什么这样设计：token 估算不是供应商精确计费，但上下文预算和界面提示必须使用同一套近似规则；将启发式集中后，UI、压缩和请求前检查不会各算各的。
- 文件级设计证据：源码顶部注释把它定位为“Fixed-density heuristic token pricing shared by the meter service and the pure context-breakdown projection, so both surfaces price identical content to identical numbers. @module @deepseek-ai/dsh-token-meter/estimate”；固定提交中扫描到的声明包括 `ROLE_OVERHEAD`、`estimateContent`、`estimateMessage`、`estimateSystemTokens`、`estimateToolsTokens`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/token-meter/src/breakdown-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/breakdown-projection.ts)、[packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)
- 对应测试：[packages/llm/token-meter/tests/context-breakdown-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/context-breakdown-projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/llm/token-meter/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/llm/token-meter/src/breakdown-projection.ts`、`packages/llm/token-meter/src/index.ts`、`packages/llm/token-meter/src/surface-fold.ts` 确认输入输出，最后对照 `packages/llm/token-meter/tests/context-breakdown-projection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `ROLE_OVERHEAD`、`estimateContent`、`estimateMessage`、`estimateSystemTokens`、`estimateToolsTokens`、`estimateHeader`；源码顶部原注释（英文，仅作回查线索）：Fixed-density heuristic token pricing shared by the meter service and the pure context-breakdown projection, so both surfaces price identical content to identical numbers. @module @deepseek-ai/dsh-token-meter/estimate。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把大语言模型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Single replay-aware token-meter service for request and surface pressure. @module @deepseek-ai/dsh-token-meter”；固定提交中扫描到的声明包括 `TokenMeter`、`usageTokens`、`optionalHeaderEquals`、`validateConfigKeys`；本地静态 import 图显示它直接依赖 10 个源文件，并被 15 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/token-meter/src/breakdown-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/breakdown-projection.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/seeded-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/seeded-history.e2e.ts)、[packages/compaction/compaction-basic/tests/compaction-basic.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-basic.spec.ts)、[packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/compaction-loop-repro.spec.ts)、[packages/compaction/compaction-basic/tests/loader-composition.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/loader-composition.spec.ts)、[packages/compaction/compaction-basic/tests/manual-compaction.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction-basic/tests/manual-compaction.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/support.ts)
- 阅读顺序：先读 `packages/llm/token-meter/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/seeded-history.e2e.ts`、`examples/headless-agent/tests/harness.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/seeded-history.e2e.ts`、`packages/compaction/compaction-basic/tests/compaction-basic.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 313 行；扫描到的声明包括 `TokenMeter`、`usageTokens`、`optionalHeaderEquals`、`validateConfigKeys`；源码顶部原注释（英文，仅作回查线索）：Single replay-aware token-meter service for request and surface pressure. @module @deepseek-ai/dsh-token-meter。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/invariant.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查大语言模型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-token-meter. @module @deepseek-ai/dsh-token-meter/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-token-meter. @module @deepseek-ai/dsh-token-meter/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/projection.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把大语言模型、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 文件级设计证据：源码顶部注释把它定位为“Pure client-safe token-projection vocabulary. @module @deepseek-ai/dsh-token-meter/projection”；固定提交中扫描到的声明包括 `TokenUsageProjection`、`ContextPressureProjection`、`ContextBreakdownProjection`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/llm/token-meter/src/breakdown-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/breakdown-projection.ts)、[packages/llm/token-meter/src/client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/client.ts)、[packages/llm/token-meter/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/seeded-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/seeded-history.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/llm/token-meter/src/breakdown-projection.ts`、`packages/llm/token-meter/src/client.ts`、`packages/llm/token-meter/src/types.ts` 理解状态变化，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/seeded-history.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `TokenUsageProjection`、`ContextPressureProjection`、`ContextBreakdownProjection`；源码顶部原注释（英文，仅作回查线索）：Pure client-safe token-projection vocabulary. @module @deepseek-ai/dsh-token-meter/projection。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/surface-fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/surface-fold.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：可见表面投影
- 这个文件有什么用：它把大语言模型的原始事件折叠成模型或界面需要看到的有序内容，同时保留事件来源以便重放。
- 为什么这样设计：原始事件保留完整事实，投影单独计算模型或 UI 所需的视图；视图可以重算，日志仍能用于审计和回放。
- 文件级设计证据：源码顶部注释把它定位为“The measurement service's positional surface fold: the per-node priced surface measure() serves and compaction plans against. The projection units deliberately do NOT share this fold — their state must stay O(1) for the persisted checkpoint, so they ride su...”；固定提交中扫描到的声明包括 `SurfaceTokenFold`、`foldSurfaceTokens`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/token-meter/src/estimate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/estimate.ts)、[packages/llm/token-meter/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/types.ts)、[packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/seeded-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/seeded-history.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/token-meter/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/token-meter/src/estimate.ts`、`packages/llm/token-meter/src/types.ts` 和 `packages/llm/token-meter/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/seeded-history.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `SurfaceTokenFold`、`foldSurfaceTokens`；源码顶部原注释（英文，仅作回查线索）：The measurement service's positional surface fold: the per-node priced surface measure() serves and compaction plans against. The projection units deliberately do NOT share this fold — their state must stay O(1) for the persisted checkpoint, so they ride su...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/surface-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/surface-projection.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把大语言模型、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 文件级设计证据：源码顶部注释把它定位为“The O(1) surface-token fold shared by the token-meter projection units. A projection state must stay bounded — the persisted projection cache checkpoints every unit's whole state, so carrying the priced surface (one node per model-visible message) would gro...”；固定提交中扫描到的声明包括 `ShadowPriceClaim`、`SurfaceTokensFold`、`foldSurfaceProjection`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/token-meter/src/estimate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/estimate.ts)、[packages/llm/token-meter/src/breakdown-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/breakdown-projection.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/seeded-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/seeded-history.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/compaction/compaction/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/token-meter/src/estimate.ts` 和 `packages/llm/token-meter/src/breakdown-projection.ts`、`packages/llm/token-meter/src/usage-projection.ts` 理解状态变化，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/seeded-history.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 94 行；扫描到的声明包括 `ShadowPriceClaim`、`SurfaceTokensFold`、`foldSurfaceProjection`；源码顶部原注释（英文，仅作回查线索）：The O(1) surface-token fold shared by the token-meter projection units. A projection state must stay bounded — the persisted projection cache checkpoints every unit's whole state, so carrying the priced surface (one node per model-visible message) would gro...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/types.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述大语言模型中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public configuration and measurement vocabulary for replay token metering. @module @deepseek-ai/dsh-token-meter/types”；固定提交中扫描到的声明包括 `TokenMeterConfig`、`TokenMeasurementBaseline`、`TokenMeasurement`、`TokenSurfaceNode`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/token-meter/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/projection.ts)、[packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)、[packages/llm/token-meter/src/surface-fold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/surface-fold.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/seeded-history.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/seeded-history.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/compaction.e2e.ts)、[examples/headless-agent/tests/full-loop.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/full-loop.e2e.ts)、[examples/headless-agent/tests/resume.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/resume.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/llm/token-meter/README.md`、入口和消费者，再读当前契约，沿着 `packages/llm/token-meter/src/index.ts`、`packages/llm/token-meter/src/surface-fold.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/seeded-history.e2e.ts`、`examples/headless-agent/tests/coding-task.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `TokenMeterConfig`、`TokenMeasurementBaseline`、`TokenMeasurement`、`TokenSurfaceNode`；源码顶部原注释（英文，仅作回查线索）：Public configuration and measurement vocabulary for replay token metering. @module @deepseek-ai/dsh-token-meter/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/src/usage-projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/usage-projection.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：状态投影
- 这个文件有什么用：它把大语言模型、状态投影的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。
- 为什么这样设计：原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。
- 文件级设计证据：源码顶部注释把它定位为“Pure folds for durable provider-reported token usage and context occupancy.”；固定提交中扫描到的声明包括 `tokenUsageProjectionDefinition`、`contextPressureProjectionDefinition`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/token-meter/src/projection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/projection.ts)、[packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)
- 对应测试：[packages/llm/token-meter/tests/token-usage-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/token-usage-projection.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/llm/token-meter/src/projection.ts` 和 `packages/llm/token-meter/src/index.ts`、`packages/llm/token-meter/tests/token-usage-projection.spec.ts` 理解状态变化，最后对照 `packages/llm/token-meter/tests/token-usage-projection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 219 行；扫描到的声明包括 `tokenUsageProjectionDefinition`、`contextPressureProjectionDefinition`；源码顶部原注释（英文，仅作回查线索）：Pure folds for durable provider-reported token usage and context occupancy.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/tests/context-breakdown-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/context-breakdown-projection.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、上下文、状态投影的具体场景，包括“contextBreakdown session projection”、“serves zeros for an empty log”、“prices the newest envelope last-wins and pushes no change for a restated one”、“sums surface appends and skips an empty-content assistant message”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“contextBreakdown session projection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“contextBreakdown projection: heuristic system/tools/message composition, plus the shared estimator's pricing branches.”；固定提交中扫描到的声明包括 `harness`、`appendUser`、`appendSummaryMeter`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/compaction/compaction/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 311 行；扫描到的声明包括 `harness`、`appendUser`、`appendSummaryMeter`；扫描到的测试主题包括 “contextBreakdown session projection”、“serves zeros for an empty log”、“prices the newest envelope last-wins and pushes no change for a restated one”、“sums surface appends and skips an empty-content assistant message”、“shrinks the message figure when a metered replacement compacts the surface”、“keeps the message figure equal to the service result across appends and a compaction”；源码顶部原注释（英文，仅作回查线索）：contextBreakdown projection: heuristic system/tools/message composition, plus the shared estimator's pricing branches.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/tests/token-meter.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/token-meter.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型的具体场景，包括“TokenMeter configuration and registration”、“exposes an empty public configuration type”、“registers and unregisters ctx.tokenMeter with its plugin fiber”、“TokenMeter pricing”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TokenMeter configuration and registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `header`、`textMessage`、`appendHeader`、`appendUnchecked`、`appendSuccessfulCall`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/token-meter/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/llm/token-meter/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 699 行；扫描到的声明包括 `header`、`textMessage`、`appendHeader`、`appendUnchecked`、`appendSuccessfulCall`、`meter`、`expectSurfaceTotal`、`expectRepeatedFailure`；扫描到的测试主题包括 “TokenMeter configuration and registration”、“exposes an empty public configuration type”、“registers and unregisters ctx.tokenMeter with its plugin fiber”、“TokenMeter pricing”、“prices every built-in content shape and merge-extended blocks with one fixed heuristic”、“returns a detached deeply immutable empty measurement”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/llm/token-meter/tests/token-usage-projection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/tests/token-usage-projection.spec.ts)

- 所属层：packages/llm：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查大语言模型、状态投影的具体场景，包括“tokenUsage session projection”、“serves zero buckets for an empty log”、“does not count a usage chunk and identical final usage twice”、“replaces an earlier same-step chunk sample with the final usage”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tokenUsage session projection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`startStep`、`usageChunk`、`finalUsage`、`appendSummaryMeter`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/llm/token-meter/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/token-meter/README.md)、[packages/compaction/compaction/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/compaction/compaction/src/index.ts`、`packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 463 行；扫描到的声明包括 `harness`、`startStep`、`usageChunk`、`finalUsage`、`appendSummaryMeter`、`recordContext`、`appendUser`、`appendAssistant`；扫描到的测试主题包括 “tokenUsage session projection”、“serves zero buckets for an empty log”、“does not count a usage chunk and identical final usage twice”、“replaces an earlier same-step chunk sample with the final usage”、“accumulates disjoint buckets across steps without adding reasoning twice”、“retains a usage chunk when the request produces no final assistant message”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
