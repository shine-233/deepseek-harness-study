# 源文件索引：packages/web

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 38 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/web/tool-web/src/fetch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/fetch.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 Web 界面、工具；文件顶部注释把它定位为“The model-facing web_fetch tool. This module owns its schema, validation, and presentation; ctx.web owns retrieval. Timeout is deployment policy, not a model argument: config becomes ToolDefinition.timeoutMs, timeout policy enforces it, and this tool forwar...”。固定提交中扫描到的公开或顶层声明包括 `parseFetchArgs`、`formatFetchOutput`、`presentFetchCall`、`WebFetchMeta`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The model-facing web_fetch tool. This module owns its schema, validation, and presentation; ctx.web owns retrieval. Timeout is deployment policy, not a model argument: config becomes ToolDefinition.timeoutMs, timeout policy enforces it, and this tool forwar...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/web/tool-web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/web-search-round.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/load-path.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/tool-web/tests/tool-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/tool-web.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 495 行；扫描到的声明包括 `parseFetchArgs`、`formatFetchOutput`、`presentFetchCall`、`WebFetchMeta`、`fetchMetaFromValue`、`fetchMetaFromResult`、`presentFetchResult`、`applyWebFetchTool`；文件顶部注释线索：The model-facing web_fetch tool. This module owns its schema, validation, and presentation; ctx.web owns retrieval. Timeout is deployment policy, not a model argument: config becomes ToolDefinition.timeoutMs, timeout policy enforces it, and this tool forwar...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/index.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Web 界面、工具 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/web/tool-web/src/fetch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/fetch.ts)、[packages/web/tool-web/src/search.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/search.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/web-search-round.e2e.ts)
- 对应测试：[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/web-search-round.e2e.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/load-path.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/tool-web/tests/tool-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/tool-web.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `name`、`inject`、`DEFAULT_WEB_TOOL_TIMEOUT_MS`、`DEFAULT_FETCH_MAX_OUTPUT_CHARS`、`Config`、`apply`、`assertPositiveInteger`；文件顶部注释线索：Model-facing web_search and web_fetch tools over ctx.web. This package owns schemas, validation, prompt guidance, limits, and presentation, never concrete providers. Enablement controls tool registration; an enabled tool remains visible when its provider is...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/invariant.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Web 界面、工具 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-tool-web. @module @deepseek-ai/dsh-tool-web/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/src/search.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/search.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 Web 界面、工具；文件顶部注释把它定位为“The model-facing web_search tool: discover current information on the web. Execution goes through ctx.web — this module owns only the model-facing schema, argument validation, the result-count bound, and result formatting, never provider selection or networ...”。固定提交中扫描到的公开或顶层声明包括 `WEB_SEARCH_MAX_RESULTS`、`parseSearchArgs`、`formatSearchOutput`、`presentSearchCall`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The model-facing web_search tool: discover current information on the web. Execution goes through ctx.web — this module owns only the model-facing schema, argument validation, the result-count bound, and result formatting, never provider selection or networ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/tool-web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/web-search-round.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/load-path.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/tool-web/tests/tool-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/tool-web.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 274 行；扫描到的声明包括 `WEB_SEARCH_MAX_RESULTS`、`parseSearchArgs`、`formatSearchOutput`、`presentSearchCall`、`WebSearchMeta`、`searchMetaFromValue`、`searchMetaFromResult`、`presentSearchResult`；文件顶部注释线索：The model-facing web_search tool: discover current information on the web. Execution goes through ctx.web — this module owns only the model-facing schema, argument validation, the result-count bound, and result formatting, never provider selection or networ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/src/turndown-plugin-gfm.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/turndown-plugin-gfm.d.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 Web 界面、工具；文件顶部注释把它定位为“Ambient module declaration for @joplin/turndown-plugin-gfm, which ships no types and has no DefinitelyTyped package. Only the composite gfm plugin is declared; the package's individual plugins (tables, strikethrough, …) stay undeclared until something impor...”。固定提交中扫描到的公开或顶层声明包括 `gfm`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Ambient module declaration for @joplin/turndown-plugin-gfm, which ships no types and has no DefinitelyTyped package. Only the composite gfm plugin is declared; the package's individual plugins (tables, strikethrough, …) stay undeclared until something impor...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的声明包括 `gfm`；文件顶部注释线索：Ambient module declaration for @joplin/turndown-plugin-gfm, which ships no types and has no DefinitelyTyped package. Only the composite gfm plugin is declared; the package's individual plugins (tables, strikethrough, …) stay undeclared until something impor...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、工具 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/guard/timeout-policy/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/guard/timeout-policy/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 177 行；扫描到的声明包括 `call`；扫描到的测试主题包括 “web_fetch integration over the real backend”、“fetches an html page and renders it to markdown”、“reports a 404 as a result, not an error”、“surfaces WEB_INVALID_URL as a structured tool error”、“surfaces a blocked cross-origin redirect as WEB_REDIRECT_BLOCKED”、“web_search integration over the real Exa provider”；文件顶部注释线索：Integration: the real fetch backend (dsh-web-fetch-http) + a real search provider (dsh-web-search-exa) + the real seam (dsh-web) + the model tool (dsh-tool-web) + the tool-call timeout policy (dsh-tool-call-timeout-policy), exercised through ctx.tools.execu...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/load-path.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、工具 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/web/tool-web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的测试主题包括 “dsh-tool-web real-load-path guard”、“has no default export and keeps name/inject/Config through unwrapExports”、“boots over ctx.web through the unwrapped module without an inject error”；文件顶部注释线索：Real Loader-path guard for an injected namespace plugin. A default export would make unwrapExports collapse the namespace and drop inject, causing access to ctx.web to fail. Hand-built mounting bypasses that path, so this test unwraps through the real Loade...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、工具 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的声明包括 `fetchCall`；扫描到的测试主题包括 “web_fetch spill showcase”、“spills a large formatted result and returns a preview + spill locator”；文件顶部注释线索：Showcase integration: the real web_fetch tool + the real spill stack (dsh-spill-local backend + dsh-spill-policy), exercised through ctx.tools.execute(). Proves the Agent Note's default local-backend path — a large formatted fetch result is automatically re...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/tool-web/tests/tool-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/tool-web.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、工具 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/tool-web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 747 行；扫描到的声明包括 `searchProvider`、`mountTools`、`toolResult`；扫描到的测试主题包括 “search formatting”、“renders content, sources with titles/hostnames, snippets, and a citation reminder”、“reports no results when there is neither content nor sources”、“renders content alone when there are no sources”、“notes truncation”、“validates the query”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-fetch-http/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/index.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Web 界面 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/web/web-fetch-http/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/README.md)、[packages/web/web-fetch-http/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/provider.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)
- 对应测试：[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/web-fetch-http/tests/fetch-http.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/tests/fetch-http.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `DEFAULT_USER_AGENT`、`name`、`inject`、`Config`、`apply`、`assertPositiveFinite`、`assertTimeoutMs`、`assertNonNegativeInteger`；文件顶部注释线索：@deepseek-ai/dsh-web-fetch-http: registers an anonymous public HTTP(S) WebFetchProvider with ctx.web. A function/namespace plugin (NOT a default-export service): it registers INTO the seam's fetch registry, like the search providers register into the search...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-fetch-http/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/invariant.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Web 界面 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/web/web-fetch-http/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-web-fetch-http. @module @deepseek-ai/dsh-web-fetch-http/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-fetch-http/src/policy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/policy.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 Web 界面；文件顶部注释把它定位为“URL validation and content-type classification for the local HTTP(S) fetch provider — the pure, network-free half. The provider's fetch() composes these with transport (redirect following, byte caps, decoding). @module @deepseek-ai/dsh-web-fetch-http/policy”。固定提交中扫描到的公开或顶层声明包括 `FetchableKind`、`validateFetchUrl`、`isSameOrigin`、`classifyContentType`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“URL validation and content-type classification for the local HTTP(S) fetch provider — the pure, network-free half. The provider's fetch() composes these with transport (redirect following, byte caps, decoding). @module @deepseek-ai/dsh-web-fetch-http/policy”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/web/web-fetch-http/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/README.md)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/web-fetch-http/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/provider.ts)、[packages/web/web-fetch-http/tests/fetch-http.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/tests/fetch-http.spec.ts)
- 对应测试：[packages/web/web-fetch-http/tests/fetch-http.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/tests/fetch-http.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `FetchableKind`、`validateFetchUrl`、`isSameOrigin`、`classifyContentType`、`parseCharset`、`decoderForCharset`；文件顶部注释线索：URL validation and content-type classification for the local HTTP(S) fetch provider — the pure, network-free half. The provider's fetch() composes these with transport (redirect following, byte caps, decoding). @module @deepseek-ai/dsh-web-fetch-http/policy。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-fetch-http/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/provider.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供 Web 界面 的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/web/web-fetch-http/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/README.md)、[packages/util/timeout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/timeout/src/index.ts)、[packages/web/web-fetch-http/src/policy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/policy.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/web-fetch-http/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/web-fetch-http/tests/fetch-http.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/tests/fetch-http.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 240 行；扫描到的声明包括 `HttpFetchLimits`、`LOCAL_FETCH_PROVIDER_ID`、`HttpFetchProvider`、`isRedirectStatus`、`resolveRedirect`、`translateAbortOrNetwork`；文件顶部注释线索：Safe HTTP(S) retrieval for ctx.web: validates URLs, follows only same-origin redirects, enforces time and size limits, classifies and decodes text, and leaves presentation to @deepseek-ai/dsh-tool-web. Requests carry no browser cookies or ambient credential...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-fetch-http/tests/fetch-http.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/tests/fetch-http.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-fetch-http/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/README.md)、[packages/web/web-fetch-http/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/index.ts)、[packages/web/web-fetch-http/src/policy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/src/policy.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 429 行；扫描到的声明包括 `provider`、`fakeResponse`；扫描到的测试主题包括 “policy helpers”、“validates scheme, credentials, and length”、“classifies content types”、“compares origins”、“parses the charset parameter”、“builds a decoder for a charset and defaults to UTF-8”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/index.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Web 界面、DeepSeek 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/credentials/credentials/src/index.ts)、[packages/web/web-search-deepseek/tests/deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.e2e.ts)
- 对应测试：[packages/web/web-search-deepseek/tests/deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.e2e.ts)、[packages/web/web-search-deepseek/tests/deepseek.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.spec.ts)、[packages/web/web-search-deepseek/tests/redirect.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/redirect.spec.ts)、[packages/web/web-search-deepseek/tests/settings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/settings.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 138 行；扫描到的声明包括 `name`、`inject`、`Config`、`WEB_SEARCH_DEEPSEEK_SETTINGS_NAMESPACE`、`apply`、`resolveOptions`；文件顶部注释线索：Register a DeepSeek-backed provider in ctx.web. It calls the Anthropic-compatible Messages API with native web_search_20250305. The provider reuses DEEPSEEK_API_KEY but not DEEPSEEK_BASE_URL, because search and chat-completions use different bases. @module ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/invariant.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Web 界面、DeepSeek 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-web-search-deepseek. @module @deepseek-ai/dsh-web-search-deepseek/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/provider.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供 Web 界面、DeepSeek 的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/credentials/credentials/src/index.ts)、[packages/web/web-search-deepseek/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/types.ts)、[packages/web/web-search-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/index.ts)
- 对应测试：[packages/web/web-search-deepseek/tests/deepseek.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 347 行；扫描到的声明包括 `DEEPSEEK_PROVIDER_ID`、`DEEPSEEK_DEFAULT_BASE_URL`、`DEEPSEEK_DEFAULT_MODEL`、`DEEPSEEK_DEFAULT_API_VERSION`、`DEEPSEEK_DEFAULT_MAX_TOKENS`、`DEEPSEEK_DEFAULT_MAX_USES`、`DeepSeekSearchLlmRequest`、`DeepSeekSearchProviderOptions`；文件顶部注释线索：DeepSeek search through an Anthropic-compatible Messages model call with the native web_search_20250305 server tool. Each search costs a model turn, but returns structured result blocks; absence of those blocks is an error rather than a prose-scraping fallb...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/types.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 Web 界面、DeepSeek 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/web/web-search-deepseek/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/provider.ts)、[packages/web/web-search-deepseek/tests/deepseek.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.spec.ts)
- 对应测试：[packages/web/web-search-deepseek/tests/deepseek.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `WebSearchResultItem`、`WebSearchToolResultBlock`、`CitationLocation`、`TextBlock`、`ContentBlock`、`AnthropicResponse`、`AnthropicError`；文件顶部注释线索：Provider-private wire types for DeepSeek's Anthropic-compatible Messages API. Citeable result items and citation excerpts arrive in separate blocks; the provider joins them by URL. These types do not create a dependency on ctx.llm. @module @deepseek-ai/dsh-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/tests/deepseek.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.e2e.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、DeepSeek 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/web/web-search-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 39 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/tests/deepseek.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、DeepSeek 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/credentials/credentials-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/credentials/credentials-local/src/index.ts)、[packages/credentials/credentials/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/credentials/credentials/src/index.ts)、[packages/web/web-search-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 534 行；扫描到的声明包括 `jsonResponse`、`searchResponse`；扫描到的测试主题包括 “citationSnippets”、“maps url → cited_text from text blocks, first occurrence wins”、“ignores citations missing url or cited_text”、“mapAnthropicResponse”、“joins result items to citation snippets and maps page_age to publishedAt”、“dedupes repeated urls across result blocks (first wins)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/tests/redirect.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/redirect.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、DeepSeek 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/web/web-search-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `captureRequest`、`listen`、`close`、`asError`；扫描到的测试主题包括 “DeepSeekSearchProvider redirect policy”、“shows default 307 following forwards the custom credential and POST body”；文件顶部注释线索：Real HTTP coverage proves whether native fetch contacts a cross-origin Location; mocked request-init assertions alone cannot observe that boundary.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-deepseek/tests/settings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/settings.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面、DeepSeek 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-deepseek/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/README.md)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/settings/settings/src/index.ts)、[packages/web/web-search-deepseek/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/src/index.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 124 行；扫描到的声明包括 `MemorySettings`、`jsonResponse`、`boot`、`searchOnce`；扫描到的测试主题包括 “web-search-deepseek settings section”、“serves a stored endpoint to the next search without re-registering the provider”、“keeps the literal key out of every described layer”、“falls back to the composition entry when the settings provider detaches”、“releases the namespace when the plugin unloads”；文件顶部注释线索：The web-search-deepseek settings section layered over the composition entry.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-exa/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/index.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Web 界面 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/web/web-search-exa/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/README.md)、[packages/util/launch-environment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/launch-environment/src/index.ts)、[packages/web/web-search-exa/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/provider.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)
- 对应测试：[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/web-search-exa/tests/exa.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.e2e.ts)、[packages/web/web-search-exa/tests/exa.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`；文件顶部注释线索：@deepseek-ai/dsh-web-search-exa: registers an Exa-backed WebSearchProvider with ctx.web. A function/namespace plugin (NOT a default-export service): a search provider does not own the ctx.web key — it registers INTO the seam's provider registry, exactly as ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-exa/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/invariant.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Web 界面 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/web/web-search-exa/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-web-search-exa. @module @deepseek-ai/dsh-web-search-exa/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-exa/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/provider.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供 Web 界面 的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/web/web-search-exa/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/README.md)、[packages/web/web-search-exa/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/types.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/web-search-exa/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/index.ts)、[packages/web/web-search-exa/tests/exa.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.spec.ts)
- 对应测试：[packages/web/web-search-exa/tests/exa.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 165 行；扫描到的声明包括 `EXA_PROVIDER_ID`、`EXA_DEFAULT_BASE_URL`、`EXA_DEFAULT_SEARCH_TYPE`、`EXA_DEFAULT_HIGHLIGHTS_PER_RESULT`、`ExaSearchProviderOptions`、`mapExaResult`、`mapExaResponse`、`ExaSearchProvider`；文件顶部注释线索：ExaSearchProvider: a WebSearchProvider backed by the Exa search API (POST /search with highlight contents). It maps the first non-blank highlight to snippet, maps publishedDate to publishedAt, drops entries without a snippet, and omits content because Exa r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-exa/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/types.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 Web 界面 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/web/web-search-exa/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/README.md)、[packages/web/web-search-exa/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/provider.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/web-search-exa/tests/exa.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.e2e.ts)、[packages/web/web-search-exa/tests/exa.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `ExaSearchRequest`、`ExaResult`、`ExaSearchResponse`、`ExaError`；文件顶部注释线索：Wire types for the Exa search API (POST https://api.exa.ai/search). Types only — no runtime code. Exa returns a flat results[]; each entry carries a URL, optional title, optional publishedDate, and (when highlights are requested) a highlights[] array of sal...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-exa/tests/exa.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.e2e.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-exa/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/README.md)、[packages/web/web-search-exa/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的测试主题包括 “returns sources for a live query”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-exa/tests/exa.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/tests/exa.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-exa/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/README.md)、[packages/web/web-search-exa/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/index.ts)、[packages/web/web-search-exa/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-exa/src/provider.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 261 行；扫描到的声明包括 `jsonResponse`；扫描到的测试主题包括 “Exa result mapping”、“maps a full result entry”、“drops a result with no usable highlight”、“omits null/empty optional fields rather than emitting them”、“maps a response to a result with no content and filtered sources”、“tolerates a missing results array”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-perplexity/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/index.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Web 界面 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/web/web-search-perplexity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/README.md)、[packages/util/launch-environment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/launch-environment/src/index.ts)、[packages/web/web-search-perplexity/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/provider.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/web-search-perplexity/tests/perplexity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.e2e.ts)
- 对应测试：[packages/web/web-search-perplexity/tests/perplexity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.e2e.ts)、[packages/web/web-search-perplexity/tests/perplexity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`；文件顶部注释线索：@deepseek-ai/dsh-web-search-perplexity: registers a Perplexity-backed WebSearchProvider with ctx.web. A function/namespace plugin (NOT a default-export service): it registers INTO the seam's provider registry, like @deepseek-ai/dsh-llm-deepseek registers an...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-perplexity/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/invariant.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Web 界面 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/web/web-search-perplexity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-web-search-perplexity. @module @deepseek-ai/dsh-web-search-perplexity/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-perplexity/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/provider.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供 Web 界面 的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 直接协作者：[packages/web/web-search-perplexity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/README.md)、[packages/web/web-search-perplexity/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/types.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[packages/web/web-search-perplexity/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/index.ts)、[packages/web/web-search-perplexity/tests/perplexity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.spec.ts)
- 对应测试：[packages/web/web-search-perplexity/tests/perplexity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 167 行；扫描到的声明包括 `PERPLEXITY_PROVIDER_ID`、`PERPLEXITY_DEFAULT_BASE_URL`、`PERPLEXITY_DEFAULT_MODEL`、`PERPLEXITY_DEFAULT_MAX_TOKENS`、`PerplexityRecency`、`PerplexitySearchProviderOptions`、`mapPerplexityResult`、`mapPerplexityResponse`；文件顶部注释线索：Perplexity search over its OpenAI-compatible chat-completions endpoint. The generated answer becomes content; sources prefer structured search_results[] and fall back to URL-only citations[]. The wire format and native fetch client are provider-private and ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-perplexity/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/types.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 Web 界面 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/web/web-search-perplexity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/README.md)、[packages/web/web-search-perplexity/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/provider.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/web/web-search-perplexity/tests/perplexity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.e2e.ts)、[packages/web/web-search-perplexity/tests/perplexity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `PerplexityRequest`、`PerplexitySearchResult`、`PerplexityResponse`、`PerplexityError`；文件顶部注释线索：Wire types for the Perplexity search API (POST https://api.perplexity.ai/chat/completions, an OpenAI-compatible chat shape). Results prefer structured search_results and fall back to URL-only citations; the provider-private wire shape does not depend on ctx...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-perplexity/tests/perplexity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.e2e.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-perplexity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/README.md)、[packages/web/web-search-perplexity/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的测试主题包括 “returns a generated answer and sources for a live query”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web-search-perplexity/tests/perplexity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/tests/perplexity.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web-search-perplexity/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/README.md)、[packages/web/web-search-perplexity/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/index.ts)、[packages/web/web-search-perplexity/src/provider.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-perplexity/src/provider.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `jsonResponse`；扫描到的测试主题包括 “Perplexity response mapping”、“maps the answer and prefers structured search_results”、“falls back to URL-only citations when search_results is absent”、“omits content when the answer is empty or missing”、“omits null/empty optional source fields”、“yields no sources when neither search_results nor citations are present”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Web 界面 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/web/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/README.md)、[packages/web/web/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)、[packages/web/tool-web/src/fetch.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/src/fetch.ts)
- 对应测试：[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/load-path.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/tool-web/tests/tool-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/tool-web.spec.ts)、[packages/web/web-fetch-http/tests/fetch-http.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-fetch-http/tests/fetch-http.spec.ts)、[packages/web/web-search-deepseek/tests/deepseek.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web-search-deepseek/tests/deepseek.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `WebRuntimeConfig`、`WebRuntime`、`resolveProvider`、`capSources`；文件顶部注释线索：Service Definition for the web access capability seam (ctx.web): registries and provider-selecting execution for search and fetch. Duplicate ids are rejected. At execution time, a configured provider must exist and be usable; without one, exactly one usable...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/invariant.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Web 界面 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/web/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-web. @module @deepseek-ai/dsh-web/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/types.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 Web 界面 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/web/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/web-search-round.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/web-search-round.e2e.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/web/tool-web/tests/integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/integration.spec.ts)、[packages/web/tool-web/tests/load-path.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/load-path.spec.ts)、[packages/web/tool-web/tests/spill.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/spill.spec.ts)、[packages/web/tool-web/tests/tool-web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/tool-web/tests/tool-web.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `WebSearchRequest`、`WebSearchResult`、`WebSearchSource`、`WebFetchRequest`、`WebFetchResult`、`WebFetchBody`、`WebSearchProvider`、`WebFetchProvider`；文件顶部注释线索：Vocabulary for the web capability seam (ctx.web). Search and fetch deliberately share one seam so provider selection, cancellation, errors, and product configuration have one owner, while retaining separate request and result types. @module @deepseek-ai/dsh...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/web/web/tests/web.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/tests/web.spec.ts)

- 所属层：packages/web：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 Web 界面 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/web/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/README.md)、[packages/web/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/web/web/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 215 行；扫描到的声明包括 `makeSearchProvider`、`makeFetchProvider`、`searchResult`、`fetchResult`、`mountWeb`；扫描到的测试主题包括 “WebRuntime registration”、“registers a search provider and unregisters it via the returned disposer”、“throws WEB_DUPLICATE_PROVIDER on a duplicate search id”、“keeps search and fetch id namespaces independent”、“disposes provider registrations when the contributing fiber is disposed (HMR safety)”、“WebRuntime execution resolution”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
