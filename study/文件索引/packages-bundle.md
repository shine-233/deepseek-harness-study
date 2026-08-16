# 源文件索引：packages/bundle

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 14 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/bundle/base/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/src/index.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Bundle 组合相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/bundle/base/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/bundle/base` 的入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 9 行；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-base — the shared dsh core as a profile bundle. The package's substance is cordis.patch.yml, declared by the dsh.bundle.patch manifest field and resolved by the profile composer through that field; this module carries no runtime API. @modul...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/base/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/src/invariant.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Bundle 组合必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/bundle/base/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-base. @module @deepseek-ai/dsh-base/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/base/tests/base.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/tests/base.spec.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Bundle 组合的具体场景，包括“dsh-base bundle”、“declares a parseable patch list through the dsh.bundle.patch manifest field”、“gates each shell stack by platform with a symmetric disabled expression”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-base bundle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/bundle/base/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/README.md)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `vendor/include/src/index.ts`、`vendor/loader/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的测试主题包括 “dsh-base bundle”、“declares a parseable patch list through the dsh.bundle.patch manifest field”、“gates each shell stack by platform with a symmetric disabled expression”；源码顶部原注释（英文，仅作回查线索）：The bundle's substance is its patch file: the dsh.bundle.patch manifest field must name a real, parseable patch list.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/headless/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/src/index.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Bundle 组合相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/bundle/headless/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[packages/core/agent-default-model/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-default-model/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/bundle/headless/tests/headless.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/headless.spec.ts)
- 对应测试：[packages/bundle/headless/tests/headless.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/headless.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/bundle/headless` 的入口和消费者，再读当前契约，沿着 `packages/bundle/headless/tests/headless.spec.ts` 看它怎样约束运行时，最后对照 `packages/bundle/headless/tests/headless.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 150 行；扫描到的声明包括 `name`、`inject`、`Config`、`internals`、`apply`、`summarize`、`fail`、`run`；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-headless — one-shot direct Agent driver. The bundle patch rides over dsh-base without Host, HTTP, or browser plugins; this runner creates one Agent through the core registry, drives the task to quiescence, flushes its Session, prints the fi...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/headless/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/src/invariant.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Bundle 组合必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/bundle/headless/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-headless. @module @deepseek-ai/dsh-headless/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/headless/src/startup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/src/startup.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：启动服务
- 这个文件有什么用：这个文件提供应用或 Bundle 启动阶段的一项服务，把环境检查、启动顺序和可关闭资源接到正式生命周期。
- 为什么这样设计：启动阶段的检查和资源注册集中在生命周期边界，正式运行、测试和关闭流程就能复用同一套顺序。
- 直接协作者：[packages/bundle/headless/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/bundle/headless/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/startup.spec.ts)
- 对应测试：[packages/bundle/headless/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/startup.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/bundle/headless` 的 README 和组合清单，再读当前入口，沿着它交给的应用或 `packages/bundle/headless/tests/startup.spec.ts` 继续，最后对照启动、配置和 E2E 测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `name`、`inject`、`HEADLESS_STARTUP_SERVICE`、`HeadlessStartupValues`、`apply`、`headlessCommand`；源码顶部原注释（英文，仅作回查线索）：The one-shot app's command-line provider: it parses the task positional and --help, then publishes HEADLESS_STARTUP_SERVICE. The runner is an ordinary consumer whose lazy config waits for that service. @module @deepseek-ai/dsh-headless/startup。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/headless/tests/headless.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/headless.spec.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Bundle 组合的具体场景，包括“headless runner”、“aggregates the final text across the complete idle-to-idle interval and flushes before ...”、“waits for asynchronously appended events instead of racing Agent idleness”、“exits 1 when the final turn does not complete”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“headless runner”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/bundle/headless/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/README.md)、[packages/bundle/headless/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/src/index.ts)、[packages/core/agent-default-model/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-default-model/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/bundle/headless/src/index.ts`、`packages/core/agent-default-model/src/index.ts`、`packages/core/agent/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 252 行；扫描到的声明包括 `appendTurn`、`bench`；扫描到的测试主题包括 “headless runner”、“aggregates the final text across the complete idle-to-idle interval and flushes before exit”、“waits for asynchronously appended events instead of racing Agent idleness”、“exits 1 when the final turn does not complete”、“prints the durable model failure when the final turn ends in error”、“exits 1 when the owned interval contains no turn”；源码顶部原注释（英文，仅作回查线索）：Direct one-shot Agent driving, durable aggregation, flushing, and exit mapping.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/headless/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/startup.spec.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Bundle 组合、启动的具体场景，包括“headless command-line provider”、“joins the task positional into the runner config”、“prints its own help and leaves the runner pending”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“headless command-line provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/bundle/headless/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[packages/bundle/headless/src/startup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/src/startup.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/cmdline/src/index.ts`、`packages/bundle/headless/src/startup.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 106 行；扫描到的声明包括 `name`、`inject`、`apply`、`bootStartup`；扫描到的测试主题包括 “headless command-line provider”、“joins the task positional into the runner config”、“prints its own help and leaves the runner pending”；源码顶部原注释（英文，仅作回查线索）：The one-shot app's ordinary command-line provider over a real Loader tree: the task becomes injected runner config, while help and usage errors leave the consumer pending.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/web-app/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/index.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 Bundle 组合、Web 界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/bundle/web-app/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/README.md)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/host/frontend-static/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/frontend-static/src/index.ts)、[packages/bundle/web-app/tests/trusted-hosts.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/trusted-hosts.spec.ts)
- 对应测试：[packages/bundle/web-app/tests/trusted-hosts.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/trusted-hosts.spec.ts)、[packages/bundle/web-app/tests/web-app.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/web-app.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/bundle/web-app` 的入口和消费者，再读当前契约，沿着 `packages/bundle/web-app/tests/trusted-hosts.spec.ts`、`packages/bundle/web-app/tests/web-app.spec.ts` 看它怎样约束运行时，最后对照 `packages/bundle/web-app/tests/trusted-hosts.spec.ts`、`packages/bundle/web-app/tests/web-app.spec.ts`。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 185 行；扫描到的声明包括 `name`、`inject`、`Config`、`WebRuntimeValues`、`resolveLanTrust`、`internals`、`apply`、`webSurfacePrompt`；源码顶部原注释（英文，仅作回查线索）：@deepseek-ai/dsh-web-app — the browser-surface bundle's runtime glue plugin plus the bundle patch (cordis.patch.yml, declared by the dsh.bundle.patch manifest field). The plugin owns the browser-surface glue: it resolves the built frontend dist (workspace k...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/web-app/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/invariant.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 Bundle 组合、Web 界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/bundle/web-app/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-web-app. @module @deepseek-ai/dsh-web-app/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/web-app/src/startup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/startup.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：启动服务
- 这个文件有什么用：这个文件提供应用或 Bundle 启动阶段的一项服务，把环境检查、启动顺序和可关闭资源接到正式生命周期。
- 为什么这样设计：启动阶段的检查和资源注册集中在生命周期边界，正式运行、测试和关闭流程就能复用同一套顺序。
- 直接协作者：[packages/bundle/web-app/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/bundle/web-app/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/startup.spec.ts)
- 对应测试：[packages/bundle/web-app/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/startup.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/bundle/web-app` 的 README 和组合清单，再读当前入口，沿着它交给的应用或 `packages/bundle/web-app/tests/startup.spec.ts` 继续，最后对照启动、配置和 E2E 测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `name`、`inject`、`WEB_STARTUP_SERVICE`、`WebStartupValues`、`apply`、`webCommand`；源码顶部原注释（英文，仅作回查线索）：The web app's command-line provider: it parses the dsh --profile web flag family (--host, --port, --trusted-host) and its --help text, then provides the immutable values as WEB_STARTUP_SERVICE. Ordinary rows inject that service before reading it from lazy c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/web-app/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/startup.spec.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Bundle 组合、Web 界面、启动的具体场景，包括“web command-line provider”、“publishes each flag and releases direct service expressions”、“leaves deployment values to each consumer when flags omit them”、“prints its own help and leaves the consumer pending”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web command-line provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/bundle/web-app/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/README.md)、[packages/boot/cmdline/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/src/index.ts)、[packages/bundle/web-app/src/startup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/startup.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/boot/cmdline/src/index.ts`、`packages/bundle/web-app/src/startup.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 139 行；扫描到的声明包括 `apply`、`name`、`inject`、`bootProvider`；扫描到的测试主题包括 “web command-line provider”、“publishes each flag and releases direct service expressions”、“leaves deployment values to each consumer when flags omit them”、“prints its own help and leaves the consumer pending”、“rejects a non-numeric port before the consumer activates”、“rejects the intentionally unsupported all-interfaces host before the consumer activates”；源码顶部原注释（英文，仅作回查线索）：The Web command-line provider over a real Loader tree: its ordinary service releases a consumer whose config reads ctx.webStartup directly.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/web-app/tests/trusted-hosts.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/trusted-hosts.spec.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Bundle 组合、Web 界面的具体场景，包括“resolveLanTrust”、“samples non-internal IPv4 addresses once for an all-interfaces bind: trust and display ...”、“derives nothing for a loopback bind — extras alone stand, no LAN URL to print”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolveLanTrust”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/bundle/web-app/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/README.md)、[packages/bundle/web-app/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/bundle/web-app/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的测试主题包括 “resolveLanTrust”、“samples non-internal IPv4 addresses once for an all-interfaces bind: trust and display share them”、“derives nothing for a loopback bind — extras alone stand, no LAN URL to print”；源码顶部原注释（英文，仅作回查线索）：Single-sample LAN-trust resolution for the /api browser-trust fence (resolveLanTrust).。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/bundle/web-app/tests/web-app.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/tests/web-app.spec.ts)

- 所属层：packages/bundle：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Bundle 组合、Web 界面的具体场景，包括“web-app runtime glue”、“mounts dist serving, prompt section, bash variables, and prints the URL with the LAN sn...”、“stays quiet with printUrl off”、“skips the surface context when disabled (the one-shot layer): no prompt section, no bas...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web-app runtime glue”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/bundle/web-app/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/README.md)、[packages/bundle/web-app/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/web-app/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/webserver/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/bundle/web-app/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/host/webserver/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 231 行；扫描到的声明包括 `stageDist`、`fakeHttpServer`、`provideLoader`；扫描到的测试主题包括 “web-app runtime glue”、“mounts dist serving, prompt section, bash variables, and prints the URL with the LAN snapshot”、“stays quiet with printUrl off”、“skips the surface context when disabled (the one-shot layer): no prompt section, no bash variables”、“prints the loopback-only URL line when no LAN snapshot exists”、“defers the URL line until Loader settlement and drops it on failure or teardown”；源码顶部原注释（英文，仅作回查线索）：Web runtime glue behavior: dist resolution through the bundle's own hook, the frontend-static child claiming the fallback seat, the web-surface prompt section and bash runtime variables, and URL-line printing with the runtime's bind-dependent LAN snapshot.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
