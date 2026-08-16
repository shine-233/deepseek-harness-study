# 源文件索引：packages/mcp

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 11 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/mcp/mcp-client/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/connection.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：连接与传输边界
- 这个文件有什么用：它负责 MCP 连接、浏览器端、连接的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。
- 为什么这样设计：连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/mcp/mcp-client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/index.ts)、[packages/mcp/mcp-client/src/tools.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/tools.ts)、[packages/mcp/mcp-client/src/transport.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/transport.ts)、[packages/mcp/mcp-client/tests/reconnect.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/reconnect.spec.ts)
- 对应测试：[packages/mcp/mcp-client/tests/reconnect.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/reconnect.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/mcp/mcp-client` 的 README 和入口，再读当前实现，沿着 `packages/mcp/mcp-client/src/index.ts`、`packages/mcp/mcp-client/src/tools.ts`、`packages/mcp/mcp-client/src/transport.ts` 和 `packages/mcp/mcp-client/src/index.ts`、`packages/mcp/mcp-client/tests/reconnect.spec.ts` 确认输入输出，最后对照 `packages/mcp/mcp-client/tests/reconnect.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 351 行；扫描到的声明包括 `ReconnectConfig`、`RECONNECT_DEFAULTS`、`ResolvedReconnectPolicy`、`resolveReconnectPolicy`、`ConnectionOutcome`、`ConnectionHandle`、`startConnection`、`enqueueSync`；源码顶部原注释（英文，仅作回查线索）：Connection supervisor: owns the MCP client/transport generations for one plugin instance, keeps the harness tool registry in sync with the live generation, and — when the connection drops — restarts the configured server with bounded exponential backoff. On...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/index.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 MCP 连接、浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/mcp/mcp-client/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/connection.ts)、[packages/mcp/mcp-client/src/tools.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/tools.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)
- 对应测试：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[packages/mcp/mcp-client/tests/apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/apply.spec.ts)、[packages/mcp/mcp-client/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/load-path.spec.ts)、[packages/mcp/mcp-client/tests/mcp-client.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.e2e.ts)、[packages/mcp/mcp-client/tests/mcp-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.spec.ts)、[packages/mcp/mcp-client/tests/reconnect.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/reconnect.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/mcp/mcp-client` 的入口和消费者，再读当前契约，沿着 `apps/cli/tests/memory-mcp-configs.spec.ts`、`packages/mcp/mcp-client/src/connection.ts`、`packages/mcp/mcp-client/src/transport.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`packages/mcp/mcp-client/tests/apply.spec.ts`、`packages/mcp/mcp-client/tests/load-path.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `name`、`inject`、`StdioConfig`、`StreamableHttpConfig`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：MCP client bridge plugin: connects to an external MCP server and registers its tools on ctx.tools under server-qualified public names (mcp__<serverName>__<rawName>). Each plugin instance connects to one MCP server; load multiple instances in cordis.yml for ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/invariant.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 MCP 连接、浏览器端必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-mcp-client. @module @deepseek-ai/dsh-mcp-client/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/src/tools.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/tools.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/mcp/mcp-client`，围绕工具（`tools`）组织实现；固定提交中可见的公开或顶层声明包括 `ToolBridgeOptions`、`ToolDisposers`、`McpResult`、`publicToolName`、`syncTools`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把工具（`tools`）单独放在 `packages/mcp/mcp-client`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 2 个本地依赖和 4 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/mcp/mcp-client/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/connection.ts)、[packages/mcp/mcp-client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/index.ts)
- 对应测试：[packages/mcp/mcp-client/tests/mcp-client.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.e2e.ts)、[packages/mcp/mcp-client/tests/mcp-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/mcp/mcp-client` 的 README 和入口，再读当前实现，沿着 `packages/core/tools/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/mcp/mcp-client/src/connection.ts`、`packages/mcp/mcp-client/src/index.ts`、`packages/mcp/mcp-client/tests/mcp-client.e2e.ts` 确认输入输出，最后对照 `packages/mcp/mcp-client/tests/mcp-client.e2e.ts`、`packages/mcp/mcp-client/tests/mcp-client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 317 行；扫描到的声明包括 `ToolBridgeOptions`、`ToolDisposers`、`McpResult`、`publicToolName`、`syncTools`、`listToolsUncached`、`callToolUncached`、`supportedOutputSchema`；源码顶部原注释（英文，仅作回查线索）：Tool bridge: discovers MCP tools, registers them on the harness ToolRuntime under deterministic server-qualified public names, and handles re-sync when the server's tool list changes. Naming contract (see the mcp-client Agent Note "Naming invariants"): ever...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/src/transport.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/transport.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：外部能力适配层
- 这个文件有什么用：它把外部协议转换成 MCP 连接、浏览器端能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/mcp/mcp-client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/index.ts)、[packages/subprocess/subprocess/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/subprocess/subprocess/src/index.ts)、[packages/mcp/mcp-client/src/connection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/connection.ts)、[packages/mcp/mcp-client/tests/mcp-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.spec.ts)
- 对应测试：[packages/mcp/mcp-client/tests/mcp-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/mcp/mcp-client` 的 README 和入口，再读当前实现，沿着 `packages/mcp/mcp-client/src/index.ts`、`packages/subprocess/subprocess/src/index.ts` 和 `packages/mcp/mcp-client/src/connection.ts`、`packages/mcp/mcp-client/tests/mcp-client.spec.ts` 确认输入输出，最后对照 `packages/mcp/mcp-client/tests/mcp-client.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 50 行；扫描到的声明包括 `createTransport`、`buildChildEnv`；源码顶部原注释（英文，仅作回查线索）：Transport factory: creates the appropriate MCP transport based on the plugin's resolved config. Stdio spawns a child process (with credential scrubbing); Streamable HTTP connects to a URL. @module。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/tests/apply.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/apply.spec.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 MCP 连接、浏览器端的具体场景，包括“mcp-client plugin module exports”、“exports name, inject, and Config”、“Config schema rejects a missing serverName”、“Config schema rejects an invalid serverName”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“mcp-client plugin module exports”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/mcp/mcp-client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/mcp/mcp-client/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 403 行；扫描到的声明包括 `MockClient`、`mountRegistry`、`sleep`；扫描到的测试主题包括 “mcp-client plugin module exports”、“exports name, inject, and Config”、“Config schema rejects a missing serverName”、“Config schema rejects an invalid serverName”、“Config schema accepts a valid serverName”、“Config schema materializes reconnect defaults and merges partial overrides”；源码顶部原注释（英文，仅作回查线索）：Tests for the mcp-client plugin's apply lifecycle entry point. Isolated file so vi.mock of the MCP SDK doesn't pollute other test suites.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/tests/fixture-server.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/fixture-server.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“fixture-server”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的测试主题包括 “First number”、“Second number”、“Name to greet”；源码顶部原注释（英文，仅作回查线索）：Minimal MCP server over stdio for e2e testing of the dsh-mcp-client plugin. Registers controlled tools with predictable behavior for asserting edge cases. Run: node fixture-server.ts。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/load-path.spec.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 MCP 连接、浏览器端、路径的具体场景，包括“dsh-mcp-client real-load-path guard”、“has no default export and keeps name/inject/Config through unwrapExports”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-mcp-client real-load-path guard”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/mcp/mcp-client/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/mcp/mcp-client/src/index.ts`、`vendor/loader/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的测试主题包括 “dsh-mcp-client real-load-path guard”、“has no default export and keeps name/inject/Config through unwrapExports”；源码顶部原注释（英文，仅作回查线索）：Real-load-path guard for @deepseek-ai/dsh-mcp-client. mcp-client is a NAMESPACE plugin with inject — so a stray export default apply would make the cordis Loader's unwrapExports (exports.default ?? exports) collapse the module to the bare apply function, DR...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/tests/mcp-client.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.e2e.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 MCP 连接、浏览器端的具体场景，包括“fixture server — controlled scenarios”、“discovers all fixture tools under the server namespace”、“normalizes the dotted tool name with a deterministic hash suffix”、“executes the dotted tool via its normalized public name”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“fixture server — controlled scenarios”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 523 行；扫描到的声明包括 `mountRegistry`、`sleep`、`textOf`、`nextCallId`、`crashConfig`、`handleMcpRequest`；扫描到的测试主题包括 “fixture server — controlled scenarios”、“discovers all fixture tools under the server namespace”、“normalizes the dotted tool name with a deterministic hash suffix”、“executes the dotted tool via its normalized public name”、“executes add(2, 3) →”、“executes greet(”；源码顶部原注释（英文，仅作回查线索）：End-to-end tests for dsh-mcp-client. Exercises the REAL MCP protocol against: 1. A self-written fixture server over stdio (controlled edge cases) 2. @modelcontextprotocol/server-everything (official integration test server) 3. @modelcontextprotocol/server-f...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/tests/mcp-client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/mcp-client.spec.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 MCP 连接、浏览器端的具体场景，包括“publicToolName”、“joins clean names verbatim”、“replaces invalid characters and appends an identity hash”、“truncates over-long names and appends an identity hash”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“publicToolName”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 841 行；扫描到的声明包括 `createMockClient`、`mountRegistry`；扫描到的测试主题包括 “publicToolName”、“joins clean names verbatim”、“replaces invalid characters and appends an identity hash”、“truncates over-long names and appends an identity hash”、“is deterministic and collision-free for distinct identities”、“syncTools”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/mcp/mcp-client/tests/reconnect.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/tests/reconnect.spec.ts)

- 所属层：packages/mcp：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 MCP 连接、浏览器端的具体场景，包括“reconnect supervisor”、“reconnects after a transport close, re-syncs tools through the new generation, and serv...”、“stops at the failure cap, unregisters the tools, and reports final failure”、“gives up behind an in-flight re-sync and removes the generation it publishes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“reconnect supervisor”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/mcp/mcp-client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/mcp/mcp-client/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 521 行；扫描到的声明包括 `MockClient`、`mountRegistry`、`sleep`、`captureLogs`、`stdioConfig`、`listing`、`nextCallId`；扫描到的测试主题包括 “reconnect supervisor”、“reconnects after a transport close, re-syncs tools through the new generation, and serves calls”、“stops at the failure cap, unregisters the tools, and reports final failure”、“gives up behind an in-flight re-sync and removes the generation it publishes”、“does not start a replacement until a failed generation reports that it closed”、“stops reconnecting when a failed generation never reports that it closed”；源码顶部原注释（英文，仅作回查线索）：Tests for the mcp-client connection supervisor: crash-driven reconnection with bounded backoff, generation-safe tool re-registration, the failure cap, the stability-window budget reset, and disposal stopping reconnection. Isolated file so vi.mock of the MCP...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
