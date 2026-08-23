# 源文件索引：packages/lsp

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 32 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/lsp/lsp-stdio/src/abort.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/abort.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：LSP 传输实现
- 这个文件有什么用：这个文件处理 LSP stdio 连接的 framing、实例、消息或退出边界，把编辑器协议接到 Harness 工具能力。
- 为什么这样设计：LSP framing 和连接生命周期集中在传输层，工具逻辑只消费完整消息，不必处理半包、EOF 和进程退出。
- 文件级设计证据：源码顶部注释把它定位为“Shared cancellation helpers for the local LSP provider's host-I/O, queue, and protocol phases. @module @deepseek-ai/dsh-lsp-stdio/abort”；固定提交中扫描到的声明包括 `abortError`、`throwIfAborted`、`abortable`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)、[packages/lsp/lsp-stdio/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/host.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp-stdio/src/instance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/instance.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md` 和入口，再读当前实现，沿着 `packages/util/timeout/src/index.ts` 和 `packages/lsp/lsp-stdio/src/host.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp-stdio/src/instance.ts` 确认输入输出，最后对照 `packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/framing.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `abortError`、`throwIfAborted`、`abortable`；源码顶部原注释（英文，仅作回查线索）：Shared cancellation helpers for the local LSP provider's host-I/O, queue, and protocol phases. @module @deepseek-ai/dsh-lsp-stdio/abort。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/connection.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责连接的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 文件级设计证据：源码顶部注释把它定位为“A JSON-RPC endpoint over one language server spawned through the subprocess capability. Owns id correlation, outbound requests/notifications, and inbound server→client requests: it answers workspace/configuration from static config, and rejects workspace/ap...”；固定提交中扫描到的声明包括 `ConnectionSpec`、`ConnectionWriter`、`ConnectionSpawner`、`LspConnection`、`asError`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/framing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/framing.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp-stdio/src/instance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/instance.ts)
- 对应测试：[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md` 和入口，再读当前实现，沿着 `packages/lsp/lsp-stdio/src/framing.ts`、`packages/subprocess/subprocess/src/index.ts` 和 `packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp-stdio/src/instance.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts` 确认输入输出，最后对照 `packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/instance.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 329 行；扫描到的声明包括 `ConnectionSpec`、`ConnectionWriter`、`ConnectionSpawner`、`LspConnection`、`asError`；源码顶部原注释（英文，仅作回查线索）：A JSON-RPC endpoint over one language server spawned through the subprocess capability. Owns id correlation, outbound requests/notifications, and inbound server→client requests: it answers workspace/configuration from static config, and rejects workspace/ap...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/framing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/framing.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：LSP 传输实现
- 这个文件有什么用：这个文件处理 LSP stdio 连接的 framing、实例、消息或退出边界，把编辑器协议接到 Harness 工具能力。
- 为什么这样设计：LSP framing 和连接生命周期集中在传输层，工具逻辑只消费完整消息，不必处理半包、EOF 和进程退出。
- 文件级设计证据：源码顶部注释把它定位为“LSP base-protocol framing: Content-Length-delimited JSON-RPC over a byte stream. The encoder produces one framed buffer; the decoder buffers incoming bytes and yields complete message bodies, bounding the header and total message size so a hostile or broken...”；固定提交中扫描到的声明包括 `encodeMessage`、`MessageDecoder`、`parseContentLength`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/connection.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/lsp/lsp-stdio/src/connection.ts`、`packages/lsp/lsp-stdio/src/index.ts` 确认输入输出，最后对照 `packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/framing.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `encodeMessage`、`MessageDecoder`、`parseContentLength`；源码顶部原注释（英文，仅作回查线索）：LSP base-protocol framing: Content-Length-delimited JSON-RPC over a byte stream. The encoder produces one framed buffer; the decoder buffers incoming bytes and yields complete message bodies, bounding the header and total message size so a hostile or broken...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/host.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：LSP 传输实现
- 这个文件有什么用：这个文件处理 LSP stdio 连接的 framing、实例、消息或退出边界，把编辑器协议接到 Harness 工具能力。
- 为什么这样设计：LSP framing 和连接生命周期集中在传输层，工具逻辑只消费完整消息，不必处理半包、EOF 和进程退出。
- 文件级设计证据：源码顶部注释把它定位为“Filesystem-seam source access for the generic stdio LSP provider.”；固定提交中扫描到的声明包括 `HostWorkspace`、`HostSource`、`canonicalizeWorkspace`、`readHostSource`、`messageOf`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs/src/index.ts)、[packages/lsp/lsp-stdio/src/abort.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/abort.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp-stdio/src/instance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/instance.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md` 和入口，再读当前实现，沿着 `packages/fs/fs/src/index.ts`、`packages/lsp/lsp-stdio/src/abort.ts` 和 `packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp-stdio/src/instance.ts` 确认输入输出，最后对照 `packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/framing.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 124 行；扫描到的声明包括 `HostWorkspace`、`HostSource`、`canonicalizeWorkspace`、`readHostSource`、`messageOf`；源码顶部原注释（英文，仅作回查线索）：Filesystem-seam source access for the generic stdio LSP provider.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/lsp/lsp-stdio` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Generic stdio language-server backend for ctx.lsp. One plugin instance configures a named table of server commands and registers one isolated provider for each entry. Every provider lazily single-flights one server process per canonical workspace target, se...”；固定提交中扫描到的声明包括 `name`、`inject`、`LspLocalServerConfig`、`Config`、`apply`；本地静态 import 图显示它直接依赖 10 个源文件，并被 11 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/abort.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/abort.ts)、[packages/lsp/lsp-stdio/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/connection.ts)、[packages/lsp/lsp-stdio/src/framing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/framing.ts)、[examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts)
- 对应测试：[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md`、入口和消费者，再读当前契约，沿着 `examples/headless-agent/tests/fixtures/e2b/e2b/bin.ts`、`packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts` 看它怎样约束运行时，最后对照 `packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts`、`packages/lsp/lsp-stdio/tests/framing.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 369 行；扫描到的声明包括 `name`、`inject`、`LspLocalServerConfig`、`Config`、`apply`、`throwTeardownFailures`、`validateServerConfig`、`assertTimer`；源码顶部原注释（英文，仅作回查线索）：Generic stdio language-server backend for ctx.lsp. One plugin instance configures a named table of server commands and registers one isolated provider for each entry. Every provider lazily single-flights one server process per canonical workspace target, se...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/instance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/instance.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：LSP 传输实现
- 这个文件有什么用：这个文件处理 LSP stdio 连接的 framing、实例、消息或退出边界，把编辑器协议接到 Harness 工具能力。
- 为什么这样设计：LSP framing 和连接生命周期集中在传输层，工具逻辑只消费完整消息，不必处理半包、EOF 和进程退出。
- 文件级设计证据：源码顶部注释把它定位为“One language-server instance: a connection plus the initialize handshake, the serialized abortable query queue, the transient didOpen→request→didClose lifecycle, and bounded teardown. One instance owns one (provider id, canonical workspace) process. Queries...”；固定提交中扫描到的声明包括 `InstanceSpec`、`LspInstance`、`markSettled`；本地静态 import 图显示它直接依赖 7 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/abort.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/abort.ts)、[packages/lsp/lsp-stdio/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/connection.ts)、[packages/lsp/lsp-stdio/src/host.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/host.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)
- 对应测试：[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md` 和入口，再读当前实现，沿着 `packages/lsp/lsp-stdio/src/abort.ts`、`packages/lsp/lsp-stdio/src/connection.ts`、`packages/lsp/lsp-stdio/src/host.ts` 和 `packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp-stdio/tests/instance.spec.ts` 确认输入输出，最后对照 `packages/lsp/lsp-stdio/tests/instance.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 347 行；扫描到的声明包括 `InstanceSpec`、`LspInstance`、`markSettled`；源码顶部原注释（英文，仅作回查线索）：One language-server instance: a connection plus the initialize handshake, the serialized abortable query queue, the transient didOpen→request→didClose lifecycle, and bounded teardown. One instance owns one (provider id, canonical workspace) process. Queries...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/invariant.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/lsp/lsp-stdio` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-lsp-stdio. @module @deepseek-ai/dsh-lsp-stdio/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-lsp-stdio. @module @deepseek-ai/dsh-lsp-stdio/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/protocol.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：协议边界
- 这个文件有什么用：它规定协议两端交换的消息形状和生命周期，避免不同进程或线程各自解释协议。
- 为什么这样设计：协议独立于两端实现，消息版本、生命周期和失败语义才有单一的审查位置；进程或线程替换不会改变上层契约。
- 文件级设计证据：源码顶部注释把它定位为“The subset of LSP wire types this generic host reads and writes: initialize capabilities, the four request results (Location, LocationLink, Hover), and the textDocumentSync shapes used to decide transient-open support. Types only. Fields absent from a real ...”；固定提交中扫描到的声明包括 `WirePosition`、`WireRange`、`WireLocation`、`WireLocationLink`、`WireMarkupContent`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/instance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/instance.ts)、[packages/lsp/lsp-stdio/src/translate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/translate.ts)、[packages/lsp/lsp-stdio/tests/translate.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/translate.spec.ts)
- 对应测试：[packages/lsp/lsp-stdio/tests/translate.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/translate.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md`、入口和消费者，再读当前契约，沿着 `packages/lsp/lsp-stdio/src/instance.ts`、`packages/lsp/lsp-stdio/src/translate.ts`、`packages/lsp/lsp-stdio/tests/translate.spec.ts` 看它怎样约束运行时，最后对照 `packages/lsp/lsp-stdio/tests/translate.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的声明包括 `WirePosition`、`WireRange`、`WireLocation`、`WireLocationLink`、`WireMarkupContent`、`WireMarkedStringObject`、`WireMarkedString`、`WireHover`；源码顶部原注释（英文，仅作回查线索）：The subset of LSP wire types this generic host reads and writes: initialize capabilities, the four request results (Location, LocationLink, Hover), and the textDocumentSync shapes used to decide transient-open support. Types only. Fields absent from a real ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/src/translate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/translate.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：协议翻译
- 这个文件有什么用：它在两种协议翻译表示之间做明确转换，让供应商、协议或错误格式差异停留在边界。
- 为什么这样设计：把两种表示的差异限制在翻译函数内，核心逻辑不必分支处理供应商字段；翻译规则也可以用成对输入输出单独测试。
- 文件级设计证据：源码顶部注释把它定位为“Pure protocol translation for the local host: what the server's capabilities allow, and how its Location/LocationLink/Hover payloads normalize into the seam's closed result unions. No I/O or process state — every function here is a pure transform, which the...”；固定提交中扫描到的声明包括 `requestMethod`、`supportsOperation`、`supportsTransientOpen`、`negotiatePositionEncoding`、`normalizeLocations`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/lsp/lsp-stdio/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/protocol.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/lsp/lsp-stdio/README.md` 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 `packages/llm/llm/src/index.ts`、`packages/lsp/lsp-stdio/src/protocol.ts`、`packages/lsp/lsp/src/index.ts` 确认输入输出，最后对照同目录的门禁或发布测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 235 行；扫描到的声明包括 `requestMethod`、`supportsOperation`、`supportsTransientOpen`、`negotiatePositionEncoding`、`normalizeLocations`、`normalizeHover`、`capabilityValue`、`supportsCapability`；源码顶部原注释（英文，仅作回查线索）：Pure protocol translation for the local host: what the server's capabilities allow, and how its Location/LocationLink/Hover payloads normalize into the seam's closed result unions. No I/O or process state — every function here is a pure transform, which the...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“built-lib”写出可重复运行的断言，覆盖的场景包括“runs a query through lib/index.js and disposes cleanly, framing over the base protocol”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runs a query through lib/index.js and disposes cleanly, framing over the base protocol”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的测试主题包括 “runs a query through lib/index.js and disposes cleanly, framing over the base protocol”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查连接的具体场景，包括“LspConnection”、“completes an initialize request/response round-trip and exposes a pid”、“forwards explicit DSH_* env entries to the child”、“rejects a request when the server replies with an error”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LspConnection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `connect`、`connectScript`、`waitFor`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/connection.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/subprocess/subprocess-local/src/spawn.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/subprocess/subprocess-local/src/spawn.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/lsp/lsp-stdio/src/connection.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/subprocess/subprocess-local/src/spawn.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 261 行；扫描到的声明包括 `connect`、`connectScript`、`waitFor`；扫描到的测试主题包括 “LspConnection”、“completes an initialize request/response round-trip and exposes a pid”、“forwards explicit DSH_* env entries to the child”、“rejects a request when the server replies with an error”、“treats terminating an already-closed child as a teardown race”、“answers a server workspace/configuration request from static config”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/fixture-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/fixture-server.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“fixture-server”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“A scriptable fake LSP server over stdio for lsp-stdio tests. It speaks the real Content-Length-framed base protocol so it exercises the client's framing, initialize handshake, transient open/close, request mapping, and teardown — without a real language ser...”；固定提交中扫描到的声明包括 `resultFor`、`envJson`、`handle`、`markExit`、`emitServerRequest`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 207 行；扫描到的声明包括 `resultFor`、`envJson`、`handle`、`markExit`、`emitServerRequest`、`send`；源码顶部原注释（英文，仅作回查线索）：A scriptable fake LSP server over stdio for lsp-stdio tests. It speaks the real Content-Length-framed base protocol so it exercises the client's framing, initialize handshake, transient open/close, request mapping, and teardown — without a real language ser...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“framing”写出可重复运行的断言，覆盖的场景包括“encodeMessage”、“prefixes a Content-Length header with the utf-8 byte length”、“MessageDecoder”、“decodes a single framed message”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“encodeMessage”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `frame`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/lsp/lsp-stdio/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `frame`；扫描到的测试主题包括 “encodeMessage”、“prefixes a Content-Length header with the utf-8 byte length”、“MessageDecoder”、“decodes a single framed message”、“decodes multiple messages arriving in one chunk”、“reassembles a message split across chunks”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查服务端宿主的具体场景，包括“canonicalizeWorkspace”、“returns the realpath of a directory”、“resolves a symlinked workspace to its target so aliases share identity”、“rejects a missing workspace”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“canonicalizeWorkspace”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `workspace`、`readSource`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/timeout/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/util/timeout/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 184 行；扫描到的声明包括 `workspace`、`readSource`；扫描到的测试主题包括 “canonicalizeWorkspace”、“returns the realpath of a directory”、“resolves a symlinked workspace to its target so aliases share identity”、“rejects a missing workspace”、“wraps a provider failure while resolving the workspace”、“rejects a non-directory workspace”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“instance”写出可重复运行的断言，覆盖的场景包括“LspInstance server-request handling”、“answers workspace/configuration with the static config per item”、“accepts a lifecycle client/registerCapability request”、“rejects a workspace/applyEdit request but keeps serving”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LspInstance server-request handling”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `makeInstance`、`query`、`run`、`scriptInstance`、`processAlive`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)、[packages/lsp/lsp-stdio/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/connection.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/lsp/lsp-stdio/src/connection.ts`、`packages/lsp/lsp-stdio/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 398 行；扫描到的声明包括 `makeInstance`、`query`、`run`、`scriptInstance`、`processAlive`、`waitForProcessExit`、`failingWriter`、`waitForFile`；扫描到的测试主题包括 “LspInstance server-request handling”、“answers workspace/configuration with the static config per item”、“accepts a lifecycle client/registerCapability request”、“rejects a workspace/applyEdit request but keeps serving”、“rejects an unknown server request but keeps serving”、“LspInstance query and abort”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“lifecycle”写出可重复运行的断言，覆盖的场景包括“lsp-stdio end to end over a fake server”、“routes different extensions to independent configured servers”、“resolves definition to normalized locations”、“maps a LocationLink for implementation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“lsp-stdio end to end over a fake server”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fakeServer`、`mount`、`query`、`locationJson`、`markerLines`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 495 行；扫描到的声明包括 `fakeServer`、`mount`、`query`、`locationJson`、`markerLines`、`waitFor`、`rejectWhenAborted`；扫描到的测试主题包括 “lsp-stdio end to end over a fake server”、“routes different extensions to independent configured servers”、“resolves definition to normalized locations”、“maps a LocationLink for implementation”、“returns references (server includes the declaration)”、“normalizes a hover MarkupContent”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/provider.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“provider”写出可重复运行的断言，覆盖的场景包括“lsp-stdio provider resolution”、“resolves a bare command on the child PATH and registers the provider”、“skips empty PATH segments and fails when the command is absent”、“rejects a query after the provider is disposed”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“lsp-stdio provider resolution”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `query`、`config`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 291 行；扫描到的声明包括 `query`、`config`；扫描到的测试主题包括 “lsp-stdio provider resolution”、“resolves a bare command on the child PATH and registers the provider”、“skips empty PATH segments and fails when the command is absent”、“rejects a query after the provider is disposed”、“rejects a nonpositive teardown budget at load”、“rejects a nonpositive byte cap at load”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/translate.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/translate.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查协议翻译的具体场景，包括“requestMethod”、“maps each operation to its textDocument request”、“supportsOperation”、“reads the provider slot for each operation (boolean and options forms)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“requestMethod”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp-stdio/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/protocol.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp-stdio/src/protocol.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 173 行；扫描到的测试主题包括 “requestMethod”、“maps each operation to its textDocument request”、“supportsOperation”、“reads the provider slot for each operation (boolean and options forms)”、“supportsTransientOpen”、“accepts legacy Full and Incremental enums, rejects None and absent”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp-stdio/tests/typescript-server.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/typescript-server.e2e.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“typescript-server”写出可重复运行的断言，覆盖的场景包括“real typescript-language-server”、“resolves the definition of a call site to its declaration”、“finds references to a symbol including its declaration”、“resolves implementations of an interface”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“real typescript-language-server”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Keyless real-server e2e: drives the real typescript-language-server through the full ctx.lsp → dsh-lsp-stdio stack over the base protocol, exercising all four operations. No API key needed — the server is a local dev dependency. This establishes one compati...”；固定提交中扫描到的声明包括 `at`、`locations`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp-stdio/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/README.md)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/fs/fs-local/src/index.ts`、`packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 118 行；扫描到的声明包括 `at`、`locations`；扫描到的测试主题包括 “real typescript-language-server”、“resolves the definition of a call site to its declaration”、“finds references to a symbol including its declaration”、“resolves implementations of an interface”、“returns hover information for a typed symbol”；源码顶部原注释（英文，仅作回查线索）：Keyless real-server e2e: drives the real typescript-language-server through the full ctx.lsp → dsh-lsp-stdio stack over the base protocol, exercising all four operations. No API key needed — the server is a local dev dependency. This establishes one compati...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/brand.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：品牌类型
- 这个文件有什么用：它为品牌类型定义带语义的品牌类型，使编译器能阻止不同用途的标识符互相替换。
- 为什么这样设计：在编译期区分语义不同的标识符，能把一类容易被普通字符串掩盖的调用错误提前暴露，而不增加运行时序列化成本。
- 文件级设计证据：源码顶部注释把它定位为“dsh-lsp's owned branded id: LspProviderId, the opaque identity a provider reserves on ctx.lsp. The Branded<B> primitive lives in @deepseek-ai/dsh-brand; keeping the type and its factory together here lets index.ts re-export both under one name. @module @dee...”；固定提交中扫描到的声明包括 `LspProviderId`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)、[packages/lsp/lsp/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/lsp/lsp/README.md`、入口和消费者，再读当前契约，沿着 `packages/lsp/lsp/src/index.ts`、`packages/lsp/lsp/src/types.ts` 看它怎样约束运行时，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 21 行；扫描到的声明包括 `LspProviderId`；源码顶部原注释（英文，仅作回查线索）：dsh-lsp's owned branded id: LspProviderId, the opaque identity a provider reserves on ctx.lsp. The Branded<B> primitive lives in @deepseek-ai/dsh-brand; keeping the type and its factory together here lets index.ts re-export both under one name. @module @dee...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/lsp/lsp` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition for the LSP capability seam (ctx.lsp): a language-server provider registry and per-query, order-independent selection over normalized goToDefinition/findReferences/goToImplementation/ hover queries. A provider reserves a branded id and an...”；固定提交中扫描到的声明包括 `LspError`、`finalExtension`、`Lsp`、`normalizeExtension`；本地静态 import 图显示它直接依赖 4 个源文件，并被 15 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/lsp/lsp/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/brand.ts)、[packages/lsp/lsp/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/types.ts)、[packages/lsp/lsp-stdio/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/src/index.ts)
- 对应测试：[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)、[packages/lsp/lsp-stdio/tests/lifecycle.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/lifecycle.spec.ts)、[packages/lsp/lsp-stdio/tests/provider.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/provider.spec.ts)、[packages/lsp/lsp-stdio/tests/typescript-server.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/typescript-server.e2e.ts)、[packages/lsp/lsp/tests/lsp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/tests/lsp.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/lsp/lsp/README.md`、入口和消费者，再读当前契约，沿着 `packages/lsp/lsp-stdio/src/index.ts`、`packages/lsp/lsp-stdio/src/instance.ts`、`packages/lsp/lsp-stdio/src/translate.ts` 看它怎样约束运行时，最后对照 `packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/instance.spec.ts`、`packages/lsp/lsp-stdio/tests/lifecycle.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 158 行；扫描到的声明包括 `LspError`、`finalExtension`、`Lsp`、`normalizeExtension`；源码顶部原注释（英文，仅作回查线索）：Service Definition for the LSP capability seam (ctx.lsp): a language-server provider registry and per-query, order-independent selection over normalized goToDefinition/findReferences/goToImplementation/ hover queries. A provider reserves a branded id and an...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/invariant.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/lsp/lsp` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-lsp. @module @deepseek-ai/dsh-lsp/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-lsp. @module @deepseek-ai/dsh-lsp/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/types.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 `packages/lsp/lsp` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“LSP seam vocabulary: the normalized request, provider, and result contracts. Types only — the LspError taxonomy and the LspProviderId brand factory are runtime and live in index.ts. Positions and ranges are zero-based UTF-16, matching the protocol; the mode...”；固定提交中扫描到的声明包括 `LspOperation`、`LspPosition`、`LspRange`、`LspQueryRequest`、`LspProviderQuery`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/README.md)、[packages/lsp/lsp/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/brand.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/lsp/lsp-stdio/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/built-lib.e2e.ts)、[packages/lsp/lsp-stdio/tests/connection.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/connection.spec.ts)、[packages/lsp/lsp-stdio/tests/framing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/framing.spec.ts)、[packages/lsp/lsp-stdio/tests/host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/host.spec.ts)、[packages/lsp/lsp-stdio/tests/instance.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp-stdio/tests/instance.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/lsp/lsp/README.md`、入口和消费者，再读当前契约，沿着 `packages/lsp/lsp/src/index.ts` 看它怎样约束运行时，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/lsp/lsp-stdio/tests/built-lib.e2e.ts`、`packages/lsp/lsp-stdio/tests/connection.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `LspOperation`、`LspPosition`、`LspRange`、`LspQueryRequest`、`LspProviderQuery`、`LspLocation`、`LspHover`、`LspQueryResult`；源码顶部原注释（英文，仅作回查线索）：LSP seam vocabulary: the normalized request, provider, and result contracts. Types only — the LspError taxonomy and the LspProviderId brand factory are runtime and live in index.ts. Positions and ranges are zero-based UTF-16, matching the protocol; the mode...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/lsp/tests/lsp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/tests/lsp.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它围绕“lsp”写出可重复运行的断言，覆盖的场景包括“finalExtension”、“lowercases and keeps only the final extension”、“returns empty for no extension or a leading-dot dotfile”、“Lsp registration”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“finalExtension”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `makeProvider`、`mountLsp`、`query`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/README.md)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/lsp/lsp/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 187 行；扫描到的声明包括 `makeProvider`、`mountLsp`、`query`；扫描到的测试主题包括 “finalExtension”、“lowercases and keeps only the final extension”、“returns empty for no extension or a leading-dot dotfile”、“Lsp registration”、“registers a provider and routes a query to it, then releases on dispose”、“normalizes extension keys to lowercase leading-dot and derives the language id”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/index.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Model-facing lsp tool over ctx.lsp. One read-only tool with four operations (goToDefinition/findReferences/goToImplementation/hover); it converts one-based UTF-16 cursor coordinates to the seam's zero-based positions, requires the session workspace with no ...”；固定提交中扫描到的声明包括 `name`、`inject`、`DEFAULT_LSP_TOOL_TIMEOUT_MS`、`LSP_PROMPT_TEXT`、`Config`；本地静态 import 图显示它直接依赖 9 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/lsp/tool-lsp/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/integration.spec.ts)
- 对应测试：[packages/lsp/tool-lsp/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/integration.spec.ts)、[packages/lsp/tool-lsp/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/load-path.spec.ts)、[packages/lsp/tool-lsp/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/render.spec.ts)、[packages/lsp/tool-lsp/tests/tool-lsp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/tool-lsp.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/lsp/tool-lsp/README.md`、入口和消费者，再读当前契约，沿着 `packages/lsp/tool-lsp/tests/integration.spec.ts`、`packages/lsp/tool-lsp/tests/load-path.spec.ts`、`packages/lsp/tool-lsp/tests/render.spec.ts` 看它怎样约束运行时，最后对照 `packages/lsp/tool-lsp/tests/integration.spec.ts`、`packages/lsp/tool-lsp/tests/load-path.spec.ts`、`packages/lsp/tool-lsp/tests/render.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `name`、`inject`、`DEFAULT_LSP_TOOL_TIMEOUT_MS`、`LSP_PROMPT_TEXT`、`Config`、`apply`、`assertPositiveInteger`、`assertTimer`；源码顶部原注释（英文，仅作回查线索）：Model-facing lsp tool over ctx.lsp. One read-only tool with four operations (goToDefinition/findReferences/goToImplementation/hover); it converts one-based UTF-16 cursor coordinates to the seam's zero-based positions, requires the session workspace with no ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/invariant.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tool-lsp. @module @deepseek-ai/dsh-tool-lsp/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-lsp. @module @deepseek-ai/dsh-tool-lsp/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/src/render.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/render.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把工具、渲染转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 文件级设计证据：源码顶部注释把它定位为“Pure formatting and coordinate conversion for the lsp tool: one-based↔zero-based UTF-16 cursor conversion, workspace-grouped location rendering with file:-URI resolution, complete-result capping, and UI presentation. No I/O — a UI may call the presenter on ...”；固定提交中扫描到的声明包括 `LSP_OPERATIONS`、`DEFAULT_MAX_LOCATIONS`、`DEFAULT_MAX_RESULT_CHARS`、`LspToolInput`、`LspToolArgs`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)、[packages/lsp/tool-lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/lsp/tool-lsp/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/integration.spec.ts)、[packages/lsp/tool-lsp/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/load-path.spec.ts)、[packages/lsp/tool-lsp/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/render.spec.ts)、[packages/lsp/tool-lsp/tests/tool-lsp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/tool-lsp.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/lsp/tool-lsp/src/index.ts` 确认状态如何进入 UI，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/lsp/tool-lsp/tests/integration.spec.ts`、`packages/lsp/tool-lsp/tests/load-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 191 行；扫描到的声明包括 `LSP_OPERATIONS`、`DEFAULT_MAX_LOCATIONS`、`DEFAULT_MAX_RESULT_CHARS`、`LspToolInput`、`LspToolArgs`、`parseLspArgs`、`formatLocations`、`formatHover`；源码顶部原注释（英文，仅作回查线索）：Pure formatting and coordinate conversion for the lsp tool: one-based↔zero-based UTF-16 cursor conversion, workspace-grouped location rendering with file:-URI resolution, complete-result capping, and UI presentation. No I/O — a UI may call the presenter on ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/src/session-cwd.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/session-cwd.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护工具、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Derive the workspace root an lsp call resolves against: the calling agent's per-session workspace (exec.agent.session.header.cwd), mirroring how the filesystem tools resolve paths. Unlike those tools, LSP has NO provider fallback — a missing cwd fails the c...”；固定提交中扫描到的声明包括 `sessionCwd`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/lsp/tool-lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/lsp/tool-lsp/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/integration.spec.ts)、[packages/lsp/tool-lsp/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/load-path.spec.ts)、[packages/lsp/tool-lsp/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/render.spec.ts)、[packages/lsp/tool-lsp/tests/tool-lsp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/tool-lsp.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/tools/src/index.ts` 和 `packages/lsp/tool-lsp/src/index.ts` 理解状态变化，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/lsp/tool-lsp/tests/integration.spec.ts`、`packages/lsp/tool-lsp/tests/load-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 19 行；扫描到的声明包括 `sessionCwd`；源码顶部原注释（英文，仅作回查线索）：Derive the workspace root an lsp call resolves against: the calling agent's per-session workspace (exec.agent.session.header.cwd), mirroring how the filesystem tools resolve paths. Unlike those tools, LSP has NO provider fallback — a missing cwd fails the c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/integration.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“tool-lsp integration”、“round-trips a definition query through the real provider and renders a location”、“enforces the TOOL_TIMEOUT budget when the server hangs”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-lsp integration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `serverScript`、`mount`、`call`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/fs/fs-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/fs-local/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/fs/fs-local/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `serverScript`、`mount`、`call`；扫描到的测试主题包括 “tool-lsp integration”、“round-trips a definition query through the real provider and renders a location”、“enforces the TOOL_TIMEOUT budget when the server hangs”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/load-path.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具、路径的具体场景，包括“dsh-tool-lsp Loader export-shape guard”、“has no default export and keeps name/inject/Config through unwrapExports”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-tool-lsp Loader export-shape guard”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Loader export-shape guard for @deepseek-ai/dsh-tool-lsp. It is a NAMESPACE plugin with inject, so a stray export default apply would make the Loader's unwrapExports collapse the module to the bare apply, dropping inject (postmortem 0001). This verifies the ...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/lsp/tool-lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/loader/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/lsp/tool-lsp/src/index.ts`、`vendor/loader/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的测试主题包括 “dsh-tool-lsp Loader export-shape guard”、“has no default export and keeps name/inject/Config through unwrapExports”；源码顶部原注释（英文，仅作回查线索）：Loader export-shape guard for @deepseek-ai/dsh-tool-lsp. It is a NAMESPACE plugin with inject, so a stray export default apply would make the Loader's unwrapExports collapse the module to the bare apply, dropping inject (postmortem 0001). This verifies the ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/tests/render.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/render.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具、渲染的具体场景，包括“parseLspArgs”、“accepts the four operations and converts one-based to zero-based”、“rejects an unknown operation”、“rejects a blank file_path”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“parseLspArgs”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `loc`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)、[packages/lsp/tool-lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/lsp/lsp/src/index.ts`、`packages/lsp/tool-lsp/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 172 行；扫描到的声明包括 `loc`；扫描到的测试主题包括 “parseLspArgs”、“accepts the four operations and converts one-based to zero-based”、“rejects an unknown operation”、“rejects a blank file_path”、“rejects non-positive or non-integer coordinates”、“renderUri”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/lsp/tool-lsp/tests/tool-lsp.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/tests/tool-lsp.spec.ts)

- 所属层：packages/lsp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查工具的具体场景，包括“tool-lsp registration”、“registers the lsp tool and its prompt section”、“attaches the default timeout budget to the tool definition”、“honors a configured timeout override”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-lsp registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `stubProvider`、`mount`、`call`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/lsp/tool-lsp/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/tool-lsp/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/lsp/lsp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/lsp/lsp/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/lsp/lsp/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 238 行；扫描到的声明包括 `stubProvider`、`mount`、`call`；扫描到的测试主题包括 “tool-lsp registration”、“registers the lsp tool and its prompt section”、“attaches the default timeout budget to the tool definition”、“honors a configured timeout override”、“exposes exactly the four operations in the schema enum”、“has no default export (namespace plugin shape)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
