# 源文件索引：vendor

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 35 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [vendor/cordis/bin.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/bin.js)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis Loader 薄入口
- 这个文件有什么用：它以当前工作目录为 baseUrl 创建 Context，加载 Cordis Loader，安装 include 插件并读取当前目录的 cordis.yml；它不负责解析应用启动参数。
- 为什么这样设计：Cordis loader 入口需要用当前目录建立根上下文并读取 cordis.yml，但不能把应用 CLI 参数混进框架层；保持这个薄入口，框架加载和应用启动各自拥有清晰责任。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和所在包的入口或服务确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis 上下文
- 这个文件有什么用：它定义 Cordis 插件共享的 Context，让服务、事件、注册表和插件生命周期可以在同一个作用范围内协作。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/events.ts)、[vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)、[vendor/cordis/src/logger.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/logger.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/events.ts`、`vendor/cordis/src/fiber.ts`、`vendor/cordis/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 146 行；扫描到的声明包括 `Context`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/events.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis 事件派发核心
- 这个文件有什么用：它实现事件监听器注册、上下文过滤和 emit、parallel、serial、bail、waterfall 五种派发模式，并随 fiber 生命周期清理监听器。
- 为什么这样设计：事件分发有 broadcast、串行、短路和 waterfall 等不同顺序语义，且监听器属于插件 fiber；集中实现这些模式并绑定清理，插件之间才能共享一致的协作和卸载规则。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)、[vendor/cordis/src/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/utils.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/context.ts`、`vendor/cordis/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 352 行；扫描到的声明包括 `isBailed`、`Parameters`、`ReturnType`、`ThisType`、`DispatchMode`、`Context`、`EventOptions`、`Hook`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis 插件生命周期核心
- 这个文件有什么用：它管理插件依赖等待、配置校验、Effect 注册、反向清理、失败状态和卸载过程，是 Cordis 插件树的生命周期骨架。
- 为什么这样设计：插件安装产生的监听器、服务和子插件都必须可撤销，异步失败还要能回滚；fiber 作为生命周期所有者统一等待、记录和反向清理，避免效果脱离插件树残留。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/reflect.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/reflect.ts)、[vendor/cordis/src/registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/registry.ts)、[vendor/cordis/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/events.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/context.ts`、`vendor/cordis/src/events.ts`、`vendor/cordis/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 754 行；扫描到的声明包括 `Context`、`ValidationError`、`resolveConfig`、`Disposable`、`Effect`、`EffectMeta`、`enum`、`CordisError`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 Cordis 插件框架相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/events.ts)、[vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)
- 对应测试：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/hmr-live.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/hmr-live.e2e.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[examples/headless-agent/tests/coding-task.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/coding-task.e2e.ts)、[examples/headless-agent/tests/compaction.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/compaction.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/support.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/support.ts)、[examples/headless-agent/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/harness.ts)
- 阅读顺序：先读 `vendor/cordis` 的入口和消费者，再读当前契约，沿着 `apps/cli/src/profile-boot.ts`、`apps/cli/tests/fixtures/dsh-badge/snapshot.ts`、`apps/cli/tests/fixtures/never-dispose.mjs` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/hmr-live.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 14 行；源码顶部原注释（英文，仅作回查线索）：Core context type and root context implementation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/logger.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/logger.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)、[vendor/cordis/src/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/utils.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/context.ts`、`vendor/cordis/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 270 行；扫描到的声明包括 `LoggerType`、`LoggerMethod`、`Formatter`、`enum`、`Message`、`Exporter`、`defaultFormatters`、`LoggerOptions`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/reflect.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/reflect.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis 服务反射与代理
- 这个文件有什么用：它实现 ctx.get、ctx.set、ctx.provide、ctx.accessor、ctx.mixin 和代理上下文的服务解析。
- 为什么这样设计：服务访问需要同时支持查找、提供、代理和上下文扩展，调用者不应知道服务实例存在哪里；反射层集中这些访问方式，插件可以替换实现而不改变消费方。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)、[vendor/cordis/src/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/utils.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/context.ts`、`vendor/cordis/src/fiber.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 418 行；扫描到的声明包括 `Property`、`Service`、`Accessor`、`Impl`、`ReflectService`、`enhanceError`、`isSpecialProperty`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/registry.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis 插件注册表
- 这个文件有什么用：它定义插件形状、依赖声明、Inject 装饰器、插件 runtime 和依赖解析。
- 为什么这样设计：插件声明、依赖解析和 runtime 实例是不同概念，混在业务代码中会让依赖顺序不可见；注册表把定义与解析集中起来，为 loader 和测试提供同一份插件图。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/fiber.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/fiber.ts)、[vendor/cordis/src/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/utils.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/context.ts`、`vendor/cordis/src/fiber.ts`、`vendor/cordis/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 337 行；扫描到的声明包括 `Inject`、`InjectKey`、`resolve`、`Plugin`、`Base`、`Transform`、`Function`、`Constructor`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/service.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：Cordis 服务生命周期
- 这个文件有什么用：它注册服务实例，并在所属 fiber 销毁时自动移除，保证服务不会脱离插件作用域残留。
- 为什么这样设计：服务的所有权属于注册它的 fiber，fiber 销毁时服务也必须撤销；把注册和自动移除放在服务层，可以防止插件卸载后仍留下可访问的旧实例。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/utils.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cordis/src/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/utils.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：共享小工具
- 这个文件有什么用：这个文件放一个跨模块复用的小能力。把它单独放置可以减少重复，但它不应偷偷承担业务流程。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cordis/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)、[vendor/cordis/src/events.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/events.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/dsh-badge.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/dsh-badge.snapshot.ts)、[apps/cli/tests/headless-shutdown.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/headless-shutdown.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cordis/src/context.ts`、`vendor/cordis/src/events.ts`、`vendor/cordis/src/fiber.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 287 行；扫描到的声明包括 `DisposableList`、`Tracker`、`symbols`、`isConstructor`、`joinPrototype`、`isObject`、`getPropertyDescriptor`、`getTraceable`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cosmokit/src/array.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/array.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cosmokit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/README.md)、[vendor/cosmokit/src/misc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/misc.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cosmokit/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `contain`、`intersection`、`difference`、`union`、`deduplicate`、`remove`、`makeArray`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/cosmokit` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cosmokit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/README.md)、[vendor/cosmokit/src/array.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/array.ts)、[vendor/cosmokit/src/misc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/misc.ts)、[vendor/cosmokit/src/string.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/string.ts)、[vendor/cordis/src/context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/context.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/built-bin.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/built-bin.e2e.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/cosmokit` 的入口和消费者，再读当前契约，沿着 `vendor/cordis/src/context.ts`、`vendor/cordis/src/events.ts`、`vendor/cordis/src/fiber.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/built-bin.e2e.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/telemetry-switch.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 10 行；源码顶部原注释（英文，仅作回查线索）：Array set and normalization helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cosmokit/src/misc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/misc.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cosmokit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/README.md)、[vendor/cosmokit/src/array.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/array.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/cosmokit/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cosmokit/src/array.ts`、`vendor/cosmokit/src/index.ts`、`vendor/cosmokit/src/types.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 78 行；扫描到的声明包括 `Dict`、`Get`、`Extract`、`MaybeArray`、`Promisify`、`Awaitable`、`Intersect`、`noop`；源码顶部原注释（英文，仅作回查线索）：String/symbol keyed dictionary type.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cosmokit/src/string.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/string.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cosmokit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/README.md)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cosmokit/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 113 行；扫描到的声明包括 `capitalize`、`uncapitalize`、`camelCase`、`paramCase`、`snakeCase`、`camelize`、`hyphenate`、`Upper`；源码顶部原注释（英文，仅作回查线索）：Uppercase the first character of a string.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cosmokit/src/time.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/time.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cosmokit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/README.md)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/cosmokit/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `millisecond`、`second`、`minute`、`hour`、`day`、`week`、`setTimezoneOffset`、`getTimezoneOffset`；源码顶部原注释（英文，仅作回查线索）：Time constants plus parsing and formatting helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/cosmokit/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/types.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：类型契约
- 这个文件有什么用：它描述 `vendor/cosmokit` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/cosmokit/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/README.md)、[vendor/cosmokit/src/misc.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/misc.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/cosmokit` 的入口和消费者，再读当前契约，沿着 `vendor/cosmokit/src/index.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/telemetry-switch.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `is`、`Source`、`isSource`、`fromSource`、`toBase64`、`fromBase64`、`toHex`、`fromHex`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/group/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/group/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/group` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/group/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/group/README.md)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/group` 的入口和消费者，再读当前契约，沿着 `apps/web/tests/scaffold.ts`、`packages/boot/app-boot/src/index.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/telemetry-switch.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/hmr/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/hmr/src/error.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/hmr/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/hmr/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/hmr/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的声明包括 `handleError`、`isBuildFailure`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/hmr/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/hmr/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/hmr` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/hmr/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/hmr/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/hmr/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/hmr/src/error.ts)、[packages/boot/app-boot/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/src/index.ts)
- 对应测试：[packages/boot/app-boot/tests/hmr-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/hmr-config.spec.ts)、[packages/boot/app-boot/tests/user-patches.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/user-patches.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `vendor/hmr` 的入口和消费者，再读当前契约，沿着 `packages/boot/app-boot/src/index.ts`、`packages/boot/app-boot/tests/hmr-config.spec.ts`、`packages/boot/app-boot/tests/user-patches.spec.ts` 看它怎样约束运行时，最后对照 `packages/boot/app-boot/tests/hmr-config.spec.ts`、`packages/boot/app-boot/tests/user-patches.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 576 行；扫描到的声明包括 `Config`、`loadDependencies`、`traverse`、`findWatchRoot`、`Hmr`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/include` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/include/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)、[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)
- 对应测试：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[packages/boot/app-boot/tests/config-dump.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/config-dump.spec.ts)、[packages/boot/app-boot/tests/config-reload.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/config-reload.spec.ts)、[packages/boot/app-boot/tests/user-patches.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/user-patches.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `vendor/include` 的入口和消费者，再读当前契约，沿着 `apps/cli/src/profile-boot.ts`、`apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/cli/tests/windows-shell.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 377 行；扫描到的声明包括 `entryListSchema`、`applyEntryPatches`、`PatchOptions`、`Config`、`Include`、`retryableWriteError`、`ConfigFileError`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/config/entry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/entry.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/loader/src/config/group.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/group.ts)、[vendor/loader/src/config/isolate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/isolate.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/loader/src/config/group.ts`、`vendor/loader/src/config/isolate.ts`、`vendor/loader/src/config/tree.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 303 行；扫描到的声明包括 `EntryOptions`、`Entry`、`updateError`、`takeEntries`、`sortKeys`、`replaceKeys`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/config/group.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/group.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/loader/src/config/entry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/entry.ts)、[vendor/loader/src/config/tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/tree.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/loader/src/config/entry.ts`、`vendor/loader/src/config/tree.ts`、`vendor/loader/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 129 行；扫描到的声明包括 `EntryGroup`、`Group`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/config/isolate.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/isolate.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/loader/src/config/entry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/entry.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/loader/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 173 行；扫描到的声明包括 `LocalRealm`、`GlobalRealm`、`isolate`、`swap`、`access`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/config/tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/tree.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/loader/src/config/entry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/entry.ts)、[vendor/loader/src/config/group.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/group.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/loader/src/config/entry.ts`、`vendor/loader/src/config/group.ts`、`vendor/loader/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 166 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/config/utils.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/utils.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：共享小工具
- 这个文件有什么用：这个文件放一个跨模块复用的小能力。把它单独放置可以减少重复，但它不应偷偷承担业务流程。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/loader/src/config/entry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/entry.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/loader/src/config/entry.ts`、`vendor/loader/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `evaluate`、`interpolate`、`isJsExpr`、`JsExpr`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/loader` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/loader/src/config/entry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/config/entry.ts)、[apps/cli/src/profile-boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/src/profile-boot.ts)
- 对应测试：[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[packages/boot/app-boot/tests/hmr-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/hmr-config.spec.ts)、[packages/boot/app-boot/tests/user-patches.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/user-patches.spec.ts)、[packages/boot/cmdline/tests/cmdline.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/cmdline/tests/cmdline.spec.ts)、[packages/bundle/base/tests/base.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/base/tests/base.spec.ts)、[packages/bundle/headless/tests/startup.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/tests/startup.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `vendor/loader` 的入口和消费者，再读当前契约，沿着 `apps/cli/src/profile-boot.ts`、`apps/cli/tests/windows-shell.spec.ts`、`apps/web/tests/scaffold.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/windows-shell.spec.ts`、`packages/boot/app-boot/tests/hmr-config.spec.ts`、`packages/boot/app-boot/tests/user-patches.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 202 行；扫描到的声明包括 `Config`、`Intercept`、`Loader`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/src/internal.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/internal.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/loader/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/telemetry-switch.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/telemetry-switch.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/cli/tests/windows-shell.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/windows-shell.spec.ts)、[apps/web/tests/access-confirmation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/access-confirmation.e2e.ts)、[apps/web/tests/agent-preset-authoring.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-authoring.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/loader/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `ModuleFormat`、`ModuleSource`、`ResolveResult`、`LoadResult`、`ModuleWrap`、`ModuleJob`、`ModuleLoaderV1`、`ModuleRequest`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/loader/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/tsdown.config.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理 `vendor/loader` 包里的 `tsdown.config.ts` ：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/loader/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/loader/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/loader` 的 README 或发布说明，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/logger-console/src/browser.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/src/browser.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/logger-console/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/logger-console/src/shared.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/src/shared.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和所在包的入口或服务确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行；扫描到的声明包括 `ConsoleExporter`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/logger-console/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/logger-console` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/logger-console/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/logger-console/src/shared.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/src/shared.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/logger-console` 的入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `ConsoleExporter`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/logger-console/src/shared.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/src/shared.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：第三方实现
- 这个文件有什么用：这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/logger-console/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)、[vendor/logger-console/src/browser.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/src/browser.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/README.md` 和上游 Manifest，再读当前边界，沿 wrapper 和 `vendor/logger-console/src/browser.ts`、`vendor/logger-console/src/index.ts` 确认平台影响，最后对照原生或兼容性测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `ColorSupportLevel`、`LabelStyle`、`Config`、`ConsoleExporter`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/logger-console/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/tsdown.config.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理 `vendor/logger-console` 包里的 `tsdown.config.ts` ：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/logger-console/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/logger-console/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/logger-console` 的 README 或发布说明，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 24 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/schemastery` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/schemastery/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/README.md)、[vendor/cosmokit/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cosmokit/src/index.ts)、[packages/acp/acp/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/acp/acp/src/index.ts)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/attachment/attachment-local/src/index.ts)、[packages/bundle/headless/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/bundle/headless/src/index.ts)
- 对应测试：[packages/client/schema-form/tests/model.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/schema-form/tests/model.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)、[packages/client/ui-settings/tests/settings-scope.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-settings/tests/settings-scope.client.spec.ts)、[packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/gen-config-catalog.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `vendor/schemastery` 的入口和消费者，再读当前契约，沿着 `packages/acp/acp/src/index.ts`、`packages/attachment/attachment-local/src/index.ts`、`packages/bundle/headless/src/index.ts` 看它怎样约束运行时，最后对照 `packages/client/schema-form/tests/model.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 902 行；扫描到的声明包括 `From`、`TypeS`、`TypeT`、`Resolve`、`IntersectS`、`IntersectT`、`Static`、`Meta`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/schemastery/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/tsdown.config.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理 `vendor/schemastery` 包里的 `tsdown.config.ts` ：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/schemastery/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `vendor/schemastery` 的 README 或发布说明，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [vendor/timer/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/timer/src/index.ts)

- 所属层：第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照
- 文件角色：模块入口
- 这个文件有什么用：它把 `vendor/timer` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。
- 直接协作者：[vendor/timer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/timer/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/boot/app-boot/tests/hmr-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/hmr-config.spec.ts)、[packages/boot/app-boot/tests/user-patches.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/user-patches.spec.ts)、[packages/examples/agent-spine-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/src/index.ts)
- 对应测试：[packages/boot/app-boot/tests/hmr-config.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/hmr-config.spec.ts)、[packages/boot/app-boot/tests/user-patches.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/boot/app-boot/tests/user-patches.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `vendor/timer` 的入口和消费者，再读当前契约，沿着 `packages/boot/app-boot/tests/hmr-config.spec.ts`、`packages/boot/app-boot/tests/user-patches.spec.ts`、`packages/examples/agent-spine-demo/src/index.ts` 看它怎样约束运行时，最后对照 `packages/boot/app-boot/tests/hmr-config.spec.ts`、`packages/boot/app-boot/tests/user-patches.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 147 行；扫描到的声明包括 `TimerService`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
