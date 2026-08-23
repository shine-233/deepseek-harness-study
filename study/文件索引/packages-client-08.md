# 源文件索引：packages/client（第 8/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 8 部分，覆盖：packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/ui-renderer

### [packages/client/ui-renderer/src/client/DocumentTitle.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/DocumentTitle.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `DocumentTitle` 的界面组件或交互逻辑，并导出 `DocumentTitleProps`、`DocumentTitle`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `DocumentTitleProps`、`DocumentTitle`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `DocumentTitleProps`、`DocumentTitle`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/app.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/app.tsx)、[packages/client/ui-renderer/tests/document-title.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/document-title.client.spec.tsx)
- 对应测试：[packages/client/ui-renderer/tests/document-title.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/document-title.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-renderer/src/client/app.tsx`、`packages/client/ui-renderer/tests/document-title.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-renderer/tests/document-title.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的声明包括 `DocumentTitleProps`、`DocumentTitle`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/client/app.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/app.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `app` 的界面组件或交互逻辑，并导出 `AssemblyDeps`、`buildRenderApp`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Real-UI assembly closure. The whole layout tree hangs from the built-in root slot, which is the only ctx-level slot render in the application.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Real-UI assembly closure. The whole layout tree hangs from the built-in root slot, which is the only ctx-level slot render in the application.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Real-UI assembly closure. The whole layout tree hangs from the built-in root slot, which is the only ctx-level slot render in the application.”；固定提交中扫描到的声明包括 `AssemblyDeps`、`buildRenderApp`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-renderer/src/client/DocumentTitle.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/DocumentTitle.tsx)、[packages/client/ui-renderer/src/client/bind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/bind.ts)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)
- 对应测试：[packages/client/ui-renderer/tests/app.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/app.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/tests/app.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-renderer/tests/app.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `AssemblyDeps`、`buildRenderApp`；源码顶部原注释（英文，仅作回查线索）：Real-UI assembly closure. The whole layout tree hangs from the built-in root slot, which is the only ctx-level slot render in the application.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/client/bind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/bind.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“uSES bridge: turns any bare observable snapshot source into a typed selector hook. Client-side-rendered only, so no server snapshot is wired. This is the ONE hook constructor in the client stack — engines and hosts traffic in bare sources; binding happens o...”；固定提交中扫描到的声明包括 `bindSnapshotSelector`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-renderer/src/client/app.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/app.tsx)、[packages/client/ui-renderer/src/client/session-provider.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/session-provider.tsx)、[packages/client/ui-renderer/tests/bind.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/bind.client.spec.tsx)
- 对应测试：[packages/client/ui-renderer/tests/bind.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/bind.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-renderer/src/client/app.tsx`、`packages/client/ui-renderer/src/client/session-provider.tsx`、`packages/client/ui-renderer/tests/bind.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-renderer/tests/bind.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的声明包括 `bindSnapshotSelector`；源码顶部原注释（英文，仅作回查线索）：uSES bridge: turns any bare observable snapshot source into a typed selector hook. Client-side-rendered only, so no server snapshot is wired. This is the ONE hook constructor in the client stack — engines and hosts traffic in bare sources; binding happens o...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、渲染器相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser UI renderer. It installs the slot renderer after its Cordis dependencies activate and exposes the mount operation used by the web boot kernel after the complete client roster settles.”；固定提交中扫描到的声明包括 `UseSession`、`UiRendererService`、`inject`、`apply`、`BootHandoff`；本地静态 import 图显示它直接依赖 5 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/app.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/app.tsx)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)、[packages/client/ui-renderer/src/client/session-provider.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/session-provider.tsx)、[packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx)
- 对应测试：[packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx)、[packages/client/ui-renderer/tests/session-provider.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/session-provider.client.spec.tsx)、[packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx)、[packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx)、[packages/client/ui-renderer/tests/use-projection.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/use-projection.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-renderer/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx`、`packages/client/ui-renderer/tests/session-provider.client.spec.tsx`、`packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx`、`packages/client/ui-renderer/tests/session-provider.client.spec.tsx`、`packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `UseSession`、`UiRendererService`、`inject`、`apply`、`BootHandoff`、`mountApp`；源码顶部原注释（英文，仅作回查线索）：Browser UI renderer. It installs the slot renderer after its Cordis dependencies activate and exposes the mount operation used by the web boot kernel after the complete client roster settles.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、渲染器定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“React renderer for declarative slots. Per-entry bindings enforce child authorization, and entry boundaries contain registrant failures.”；固定提交中扫描到的声明包括 `createSlotRenderer`、`boundRenderSlot`、`boundRenderSlotChain`、`runInject`、`bindInjectHooks`；本地静态 import 图显示它直接依赖 2 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/session-provider.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/session-provider.tsx)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx)
- 对应测试：[packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx)、[packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx)、[packages/client/ui-renderer/tests/session-provider.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/session-provider.client.spec.tsx)、[packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx)、[packages/client/ui-renderer/tests/use-projection.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/use-projection.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-renderer/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx`、`packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx`、`packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx`、`packages/client/ui-renderer/tests/session-provider.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 909 行；扫描到的声明包括 `createSlotRenderer`、`boundRenderSlot`、`boundRenderSlotChain`、`runInject`、`bindInjectHooks`、`cachedSlotInject`、`bindSlotHookFactories`、`cachedRootInject`；源码顶部原注释（英文，仅作回查线索）：React renderer for declarative slots. Per-entry bindings enforce child authorization, and entry boundaries contain registrant failures.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/client/session-provider.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/session-provider.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、用户界面、渲染器的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Internal React bindings for the renderer host and active session provide bundle.”；固定提交中扫描到的声明包括 `SlotAssemblyError`、`HostContext`、`useHost`、`useSessionMaybeProvideInfo`、`useSessionProvideInfo`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/bind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/bind.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)
- 对应测试：[packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx)、[packages/client/ui-renderer/tests/session-provider.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/session-provider.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/ui-renderer/src/client/bind.ts`、`packages/client/ui-slots/src/index.ts` 和 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/src/client/scoped-slots.tsx`、`packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx`、`packages/client/ui-renderer/tests/session-provider.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `SlotAssemblyError`、`HostContext`、`useHost`、`useSessionMaybeProvideInfo`、`useSessionProvideInfo`、`observableHook`、`maybeObservableHook`、`projectionHook`；源码顶部原注释（英文，仅作回查线索）：Internal React bindings for the renderer host and active session provide bundle.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/client/use-sync-external-store.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/use-sync-external-store.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、渲染器的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Local typings for use-sync-external-store 1.2.0: the package ships no types and the DefinitelyTyped package is unavailable offline. Mirrors the shim's with-selector build (the only entry this package consumes).”；固定提交中扫描到的声明包括 `useSyncExternalStoreWithSelector`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的声明包括 `useSyncExternalStoreWithSelector`；源码顶部原注释（英文，仅作回查线索）：Local typings for use-sync-external-store 1.2.0: the package ships no types and the DefinitelyTyped package is unavailable offline. Mirrors the shim's with-selector build (the only entry this package consumes).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、渲染器相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser-only UI renderer.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx)
- 对应测试：[packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-renderer/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser-only UI renderer.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、渲染器必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-renderer. @module @deepseek-ai/dsh-client-ui-renderer/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-renderer. @module @deepseek-ai/dsh-client-ui-renderer/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/app.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/app.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“buildRenderApp”、“fails loud when the sessions service is unavailable”、“renders the root slot tree”、“projects the selected durable session title”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“buildRenderApp”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-renderer/src/client/app.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/app.tsx)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-renderer/src/client/app.tsx`、`packages/test-support/client-runtime/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “buildRenderApp”、“fails loud when the sessions service is unavailable”、“renders the root slot tree”、“projects the selected durable session title”、“falls back when the selected id has no list row”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/bind.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/bind.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“bindSnapshotSelector”、“re-renders on selected change and bails out when the slice is equal”、“supports custom equality for object slices”、“does not resubscribe across re-renders of the same component”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“bindSnapshotSelector”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `makeSource`、`Harness`、`MethodSource`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/bind.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/bind.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/bind.ts`、`packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `makeSource`、`Harness`、`MethodSource`；扫描到的测试主题包括 “bindSnapshotSelector”、“re-renders on selected change and bails out when the slice is equal”、“supports custom equality for object slices”、“does not resubscribe across re-renders of the same component”、“is StrictMode-safe and cleans up subscriptions on unmount”、“binds method-style sources without losing this”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/document-title.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/document-title.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“DocumentTitle”、“projects a durable title and restores the product title”、“uses the generic title when the build provides no title”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DocumentTitle”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/DocumentTitle.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/DocumentTitle.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/DocumentTitle.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的测试主题包括 “DocumentTitle”、“projects a durable title and restores the product title”、“uses the generic title when the build provides no title”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots-real-core.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“createSlotRenderer over the real SlotCore”、“renders registrations live through real microtask batching: register, dispose back to f...”、“coalesces same-tick mutations into one notification (uSES pairing stays consistent)”、“passes owner props through and keeps sibling entries() references stable across mutations”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createSlotRenderer over the real SlotCore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `hostOver`、`mountFrame`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/scoped-slots.tsx`、`packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `hostOver`、`mountFrame`；扫描到的测试主题包括 “createSlotRenderer over the real SlotCore”、“renders registrations live through real microtask batching: register, dispose back to fallback”、“coalesces same-tick mutations into one notification (uSES pairing stays consistent)”、“passes owner props through and keeps sibling entries() references stable across mutations”、“feeds stale bindings from the real ledger: a disposed registration throws off isLive”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/scoped-slots.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“root outlet”、“renders the root registration and fails loud when root is unregistered (boot order)”、“passes renderRoot owner props into the root component”、“child outlets and the renderSlot binding”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“root outlet”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `miniStore`、`observable`、`makeHost`、`mountRoot`、`mountChainRoot`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)、[packages/client/ui-renderer/src/client/session-provider.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/session-provider.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/src/client/scoped-slots.tsx`、`packages/client/ui-renderer/src/client/session-provider.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1032 行；扫描到的声明包括 `miniStore`、`observable`、`makeHost`、`mountRoot`、`mountChainRoot`、`fallbackProbe`、`mountMaybeCounter`；扫描到的测试主题包括 “root outlet”、“renders the root registration and fails loud when root is unregistered (boot order)”、“passes renderRoot owner props into the root component”、“child outlets and the renderSlot binding”、“renders declared single slots live: fallback when empty, register, dispose back”、“renders an undeclared key as empty (declaring entry unloaded = natural blank, not a crash)”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/session-provider.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/session-provider.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“SessionProvider”、“renders empty without a current session, switches to the body on select, falls back on ...”、“renders null empty state when the empty prop is omitted”、“remounts the body on session switch (key semantics) but not on unrelated re-renders”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionProvider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `observable`、`makeHost`、`Body`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)、[packages/client/ui-renderer/src/client/session-provider.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/session-provider.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/src/client/scoped-slots.tsx`、`packages/client/ui-renderer/src/client/session-provider.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 196 行；扫描到的声明包括 `observable`、`makeHost`、`Body`；扫描到的测试主题包括 “SessionProvider”、“renders empty without a current session, switches to the body on select, falls back on an unresolvable id”、“renders null empty state when the empty prop is omitted”、“remounts the body on session switch (key semantics) but not on unrelated re-renders”、“delivers the resolved cell to session slots under it (observable behavior, not context internals)”、“republishes a mounted session entry when its provide bundle changes under the same id”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/stale-authorization.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“stale authorization”、“a live binding renders; the same closure throws after its entry is disposed”、“stale check precedes the ownership check: a dead binding throws stale even for undeclar...”、“HMR reload (same key, new entry) mints a fresh binding; the old one stays dead”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“stale authorization”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `makeHost`、`mountCapturing`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/src/client/scoped-slots.tsx`、`packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 141 行；扫描到的声明包括 `makeHost`、`mountCapturing`；扫描到的测试主题包括 “stale authorization”、“a live binding renders; the same closure throws after its entry is disposed”、“stale check precedes the ownership check: a dead binding throws stale even for undeclared keys”、“HMR reload (same key, new entry) mints a fresh binding; the old one stays dead”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/ui-renderer.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“UI renderer plugin”、“provides no host-side behavior”、“installs the renderer and mounts the assembled application”、“hydrates the boot page before switching to the assembled application”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“UI renderer plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`、`container`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 90 行；扫描到的声明包括 `bench`、`container`；扫描到的测试主题包括 “UI renderer plugin”、“provides no host-side behavior”、“installs the renderer and mounts the assembled application”、“hydrates the boot page before switching to the assembled application”、“returns an unmount disposer”、“retracts the service and renderer with its fiber”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tests/use-projection.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tests/use-projection.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、渲染器的具体场景，包括“useProjection standard-kit delivery”、“reads the projected value through the kit, undefined for unresolved keys, and follows l...”、“runs the selector overload over the whole value (and over undefined when absent)”、“treats a bundle without the projections face as all-absent (capability absence)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“useProjection standard-kit delivery”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `observable`、`makeHost`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/ui-renderer/src/client/scoped-slots.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/scoped-slots.tsx)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-renderer/src/client/index.ts`、`packages/client/ui-renderer/src/client/scoped-slots.tsx`、`packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `observable`、`makeHost`；扫描到的测试主题包括 “useProjection standard-kit delivery”、“reads the projected value through the kit, undefined for unresolved keys, and follows live changes”、“runs the selector overload over the whole value (and over undefined when absent)”、“treats a bundle without the projections face as all-absent (capability absence)”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-renderer/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、渲染器：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-renderer/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-renderer/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-settings-general

### [packages/client/ui-settings-general/src/client/GeneralSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/GeneralSection.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `GeneralSection` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `GeneralSection` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Feature-contributed rows own their chrome and separators; the section strips the trailing separator wherever the column ends.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .section；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/GeneralSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/GeneralSection.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/GeneralSection.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 12 行；样式结构包含选择器 .section；源码顶部原注释（英文，仅作回查线索）：Feature-contributed rows own their chrome and separators; the section strips the trailing separator wherever the column ends.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/GeneralSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/GeneralSection.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `GeneralSection` 的界面组件或交互逻辑，并导出 `GeneralSectionComponentProps`、`GeneralSection`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The General section: one column rendering feature-owned item contributions.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The General section: one column rendering feature-owned item contributions.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The General section: one column rendering feature-owned item contributions.”；固定提交中扫描到的声明包括 `GeneralSectionComponentProps`、`GeneralSection`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/GeneralSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/GeneralSection.module.css)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)、[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `GeneralSectionComponentProps`、`GeneralSection`；源码顶部原注释（英文，仅作回查线索）：The General section: one column rendering feature-owned item contributions.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/SettingsDocumentAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsDocumentAction.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `SettingsDocumentAction` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `SettingsDocumentAction` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .action、.error；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 16 行；样式结构包含选择器 .action、.error。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `SettingsDocumentAction` 的界面组件或交互逻辑，并导出 `SettingsDocumentActionInjected`、`SettingsDocumentActionProps`、`SettingsDocumentAction`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Optional settings-header action for opening a file-backed Host document.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Optional settings-header action for opening a file-backed Host document.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Optional settings-header action for opening a file-backed Host document.”；固定提交中扫描到的声明包括 `SettingsDocumentActionInjected`、`SettingsDocumentActionProps`、`SettingsDocumentAction`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-general/src/client/SettingsDocumentAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsDocumentAction.module.css)、[packages/client/ui-settings-general/src/client/settings-document-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/settings-document-store.ts)、[packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 51 行；扫描到的声明包括 `SettingsDocumentActionInjected`、`SettingsDocumentActionProps`、`SettingsDocumentAction`；源码顶部原注释（英文，仅作回查线索）：Optional settings-header action for opening a file-backed Host document.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/SettingsRoot.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `SettingsRoot` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `SettingsRoot` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Settings shell (figma 501:29904 mask context / 501:29947 panel): sidebar foot trigger row + centered 1080x700 modal panel. The trigger uses the sidebar foot's 42px row / 36px rail circle rhythm; the panel is a two-column layout — 188px nav rail + content co...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .trigger、.rail、.triggerLabel、.overlay、.mask、.panel；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/SettingsRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/settings-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-root.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/SettingsRoot.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/settings-root.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 226 行；样式结构包含选择器 .trigger、.rail、.triggerLabel、.overlay、.mask、.panel；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Settings shell (figma 501:29904 mask context / 501:29947 panel): sidebar foot trigger row + centered 1080x700 modal panel. The trigger uses the sidebar foot's 42px row / 36px rail circle rhythm; the panel is a two-column layout — 188px nav rail + content co...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/SettingsRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `SettingsRoot` 的界面组件或交互逻辑，并导出 `SettingsRoot`、`navIcon`、`SettingsPanel`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Settings shell root: the sidebar-foot trigger row plus the centered modal panel (figma 501:29947, 1080x700) with the section nav rail. The shell is a pure composition face — every piece of text (trigger label, panel title, close label, sections) arrives fro...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Settings shell root: the sidebar-foot trigger row plus the centered modal panel (figma 501:29947, 1080x700) with the section nav rail. The shell is a pure composition face — every piece of text (trigger label, panel title, close label, sections) arrives fro...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Settings shell root: the sidebar-foot trigger row plus the centered modal panel (figma 501:29947, 1080x700) with the section nav rail. The shell is a pure composition face — every piece of text (trigger label, panel title, close label, sections) arrives fro...”；固定提交中扫描到的声明包括 `SettingsRoot`、`navIcon`、`SettingsPanel`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-general/src/client/SettingsRoot.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.module.css)、[packages/client/ui-settings-general/src/client/shell-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/shell-contract.ts)、[packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-general/tests/settings-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-root.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/settings-root.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/settings-root.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 172 行；扫描到的声明包括 `SettingsRoot`、`navIcon`、`SettingsPanel`；源码顶部原注释（英文，仅作回查线索）：Settings shell root: the sidebar-foot trigger row plus the centered modal panel (figma 501:29947, 1080x700) with the section nav rail. The shell is a pure composition face — every piece of text (trigger label, panel title, close label, sections) arrives fro...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/chrome.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/chrome.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `chrome` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `chrome` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Trigger row label (the shell's button provides layout/colors; the label only guards against overflow during the sidebar collapse crossfade).”；固定提交中扫描到的结构线索是：样式结构包含选择器 .triggerLabel；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/chrome.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/chrome.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/chrome.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 7 行；样式结构包含选择器 .triggerLabel；源码顶部原注释（英文，仅作回查线索）：Trigger row label (the shell's button provides layout/colors; the label only guards against overflow during the sidebar collapse crossfade).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/chrome.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/chrome.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `chrome` 的界面组件或交互逻辑，并导出 `TriggerContentProps`、`HeaderContentProps`、`TriggerContent`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Shell chrome content registered into the shell's trigger/header seats: the trigger row icon + label (figma sidebar foot) and the panel title text. The shell renders the surrounding chrome (button, nav heading row) and reads each entry's label option for ari...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shell chrome content registered into the shell's trigger/header seats: the trigger row icon + label (figma sidebar foot) and the panel title text. The shell renders the surrounding chrome (button, nav heading row) and reads each entry's label option for ari...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Shell chrome content registered into the shell's trigger/header seats: the trigger row icon + label (figma sidebar foot) and the panel title text. The shell renders the surrounding chrome (button, nav heading row) and reads each entry's label option for ari...”；固定提交中扫描到的声明包括 `TriggerContentProps`、`HeaderContentProps`、`TriggerContent`、`HeaderContent`、`CloseLabelProps`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-general/src/client/chrome.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/chrome.module.css)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 50 行；扫描到的声明包括 `TriggerContentProps`、`HeaderContentProps`、`TriggerContent`、`HeaderContent`、`CloseLabelProps`、`CloseLabel`；源码顶部原注释（英文，仅作回查线索）：Shell chrome content registered into the shell's trigger/header seats: the trigger row icon + label (figma sidebar foot) and the panel title text. The shell renders the surrounding chrome (button, nav heading row) and reads each entry's label option for ari...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Settings shell and ownerless-copy plugin, browser half: renders the sidebar.settings occupant — panel chrome, section navigation, and the onboarding stage — and registers everything on the Settings pages that belongs to no single feature: the trigger/header...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 12 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-general/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/shell.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-general/tests/apply.client.spec.ts`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 177 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Settings shell and ownerless-copy plugin, browser half: renders the sidebar.settings occupant — panel chrome, section navigation, and the onboarding stage — and registers everything on the Settings pages that belongs to no single feature: the trigger/header...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Shell chrome and General-nav dictionaries; feature rows own their copy.”；固定提交中扫描到的声明包括 `zh`、`SettingsKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)
- 对应测试：[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的声明包括 `zh`、`SettingsKey`、`en`；源码顶部原注释（英文，仅作回查线索）：Shell chrome and General-nav dictionaries; feature rows own their copy.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/settings-document-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/settings-document-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“State owner for the optional local settings-document action.”；固定提交中扫描到的声明包括 `SettingsDocumentState`、`SettingsDocumentStore`、`messageOf`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx)
- 对应测试：[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)、[packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings/src/client/index.ts` 和 `packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx`、`packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/components.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-settings-general/tests/components.client.spec.tsx`、`packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `SettingsDocumentState`、`SettingsDocumentStore`、`messageOf`；源码顶部原注释（英文，仅作回查线索）：State owner for the optional local settings-document action.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/client/shell-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/shell-contract.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Settings shell contract — the types of the sidebar.settings occupant this package renders. They live here rather than in ui-settings because they reference the sidebar's own slot type: ui-settings is the settings domain's base layer and must not depend on a...”；固定提交中扫描到的声明包括 `SettingsSectionRow`、`SettingsOnboardingStep`、`SettingsRootInjected`、`SettingsRootComponentProps`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-settings-general/src/client/SettingsRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.tsx)
- 对应测试：[packages/client/ui-settings-general/tests/settings-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-root.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-general/src/client/SettingsRoot.tsx`、`packages/client/ui-settings-general/src/client/index.ts`、`packages/client/ui-settings-general/tests/settings-root.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-general/tests/settings-root.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 59 行；扫描到的声明包括 `SettingsSectionRow`、`SettingsOnboardingStep`、`SettingsRootInjected`、`SettingsRootComponentProps`；源码顶部原注释（英文，仅作回查线索）：Settings shell contract — the types of the sidebar.settings occupant this package renders. They live here rather than in ui-settings because they reference the sidebar's own slot type: ui-settings is the settings domain's base layer and must not depend on a...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-settings-general/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-general/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser implementation exported from ./client.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/client/ui-settings-general/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/host.client.spec.ts)
- 对应测试：[packages/client/ui-settings-general/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/host.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-general/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-general/tests/host.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-general/tests/host.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser implementation exported from ./client.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings-general. @module @deepseek-ai/dsh-client-ui-settings-general/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-settings-general/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-general/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-settings-general/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-settings-general/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings-general. @module @deepseek-ai/dsh-client-ui-settings-general/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-settings-general apply”、“declares the services it uses”、“fills all five seats for declarations before or after apply”、“registers the zh/en settings dictionaries and frees the seats on teardown”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings-general apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Ownerless-copy registrations: the five seats, dictionaries, thunked labels, and HMR recovery.”；固定提交中扫描到的声明包括 `bench`、`declare`、`generalEntry`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-general/src/client/GeneralSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/GeneralSection.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-general/src/client/GeneralSection.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 214 行；扫描到的声明包括 `bench`、`declare`、`generalEntry`；扫描到的测试主题包括 “ui-settings-general apply”、“declares the services it uses”、“fills all five seats for declarations before or after apply”、“registers the zh/en settings dictionaries and frees the seats on teardown”、“the nav label thunk follows the active locale without re-registration”、“reads availability from the shared mirror and follows its reconnect refresh”；源码顶部原注释（英文，仅作回查线索）：Ownerless-copy registrations: the five seats, dictionaries, thunked labels, and HMR recovery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“chrome content”、“TriggerContent renders the icon with the label in the wide column”、“TriggerContent drops the label in the rail state”、“HeaderContent and CloseLabel render their translated text”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“chrome content”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `derivedDocumentStore`、`mount`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/GeneralSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/GeneralSection.tsx)、[packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx)、[packages/client/ui-settings-general/src/client/chrome.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/chrome.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-general/src/client/GeneralSection.tsx`、`packages/client/ui-settings-general/src/client/SettingsDocumentAction.tsx`、`packages/client/ui-settings-general/src/client/chrome.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `derivedDocumentStore`、`mount`；扫描到的测试主题包括 “chrome content”、“TriggerContent renders the icon with the label in the wide column”、“TriggerContent drops the label in the rail state”、“HeaderContent and CloseLabel render their translated text”、“GeneralSection”、“renders the item slot as the section body”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/host.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、服务端宿主的具体场景，包括“ui-settings-general host”、“registers and disposes the durable onboarding namespace with its fiber”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings-general host”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `MemorySettings`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/index.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-general/src/index.ts`、`packages/settings/settings/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `MemorySettings`；扫描到的测试主题包括 “ui-settings-general host”、“registers and disposes the durable onboarding namespace with its fiber”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-general/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、状态存储的具体场景，包括“SettingsDocumentStore”、“loads provider metadata and asks the settings domain to open its document”、“marks absent or failed metadata unavailable without opening anything”、“collapses concurrent open gestures and recovers after a failure”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SettingsDocumentStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `derivedDocumentStore`、`response`、`opened`、`describeFailed`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-general/src/client/settings-document-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/settings-document-store.ts)、[packages/client/ui-settings/src/client/settings-mirror.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/settings-mirror.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-general/src/client/settings-document-store.ts`、`packages/client/ui-settings/src/client/settings-mirror.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `derivedDocumentStore`、`response`、`opened`、`describeFailed`；扫描到的测试主题包括 “SettingsDocumentStore”、“loads provider metadata and asks the settings domain to open its document”、“marks absent or failed metadata unavailable without opening anything”、“collapses concurrent open gestures and recovers after a failure”、“reports non-Error native failures and recovers availability via a mirror refresh”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/settings-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-root.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、根目录的具体场景，包括“SettingsRoot trigger”、“renders the trigger seat content as the accessible name (no aria-label of its own)”、“hands the rail state to the trigger seat”、“SettingsPanel chrome seats”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SettingsRoot trigger”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `mount`、`openPanel`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/ui-settings-general/src/client/SettingsRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.tsx)、[packages/client/ui-settings-general/src/client/shell-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/shell-contract.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-general/src/client/SettingsRoot.tsx`、`packages/client/ui-settings-general/src/client/shell-contract.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 269 行；扫描到的声明包括 `mount`、`openPanel`；扫描到的测试主题包括 “SettingsRoot trigger”、“renders the trigger seat content as the accessible name (no aria-label of its own)”、“hands the rail state to the trigger seat”、“SettingsPanel chrome seats”、“names the dialog via aria-labelledby pointing at the header seat node”、“names the close button through the visually-hidden close seat text”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、Shell 命令的具体场景，包括“ui-settings apply”、“declares only the slot registry (a pure composition face, no locale)”、“registers the shell and declares every child slot, before or after the declaration”、“projects the section ledger into ordered nav rows with option defaults”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Settings shell registration: slot declaration injection, the ledger projections, and HMR recovery.”；固定提交中扫描到的声明包括 `bench`、`declare`、`injectedOf`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-general/src/client/SettingsRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/SettingsRoot.tsx)、[packages/client/ui-settings-general/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-general/src/client/SettingsRoot.tsx`、`packages/client/ui-settings-general/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 157 行；扫描到的声明包括 `bench`、`declare`、`injectedOf`；扫描到的测试主题包括 “ui-settings apply”、“declares only the slot registry (a pure composition face, no locale)”、“registers the shell and declares every child slot, before or after the declaration”、“projects the section ledger into ordered nav rows with option defaults”、“projects onboarding entries into stable coordinator order”、“re-registers after an HMR collapse re-declares the slot (stale disposer must not block)”；源码顶部原注释（英文，仅作回查线索）：Settings shell registration: slot declaration injection, the ledger projections, and HMR recovery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-general/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-general/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-general/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-settings-models

### [packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `CustomProviderCard` 的界面组件或交互逻辑，并导出 `CustomProviderCardProps`、`CustomProviderCard`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The card that declares a provider pi-ai does not ship — an OpenAI-compatible gateway, a self-hosted server, or a provider newer than the installed catalog. This is a create, not an edit, which is why it is its own card rather than the provider editor with e...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The card that declares a provider pi-ai does not ship — an OpenAI-compatible gateway, a self-hosted server, or a provider newer than the installed catalog. This is a create, not an edit, which is why it is its own card rather than the provider editor with e...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The card that declares a provider pi-ai does not ship — an OpenAI-compatible gateway, a self-hosted server, or a provider newer than the installed catalog. This is a create, not an edit, which is why it is its own card rather than the provider editor with e...”；固定提交中扫描到的声明包括 `CustomProviderCardProps`、`CustomProviderCard`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)、[packages/client/ui-settings-models/src/client/EditorFooter.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/EditorFooter.tsx)、[packages/client/ui-settings-models/src/client/ModelsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/ModelsSection.tsx`、`packages/client/ui-settings-models/tests/provider-form.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/provider-form.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 296 行；扫描到的声明包括 `CustomProviderCardProps`、`CustomProviderCard`；源码顶部原注释（英文，仅作回查线索）：The card that declares a provider pi-ai does not ship — an OpenAI-compatible gateway, a self-hosted server, or a provider newer than the installed catalog. This is a create, not an edit, which is why it is its own card rather than the provider editor with e...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `DeepSeekModelsEditor` 的界面组件或交互逻辑，并导出 `DeepSeekModelDraft`、`parseCapacity`、`formatCapacity`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Curated editor for the direct DeepSeek adapter's advisory model catalog. The settings layer replaces models as one array, so the parent supplies the effective inherited rows until the first edit materializes a user override; reset removes that override inst...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Curated editor for the direct DeepSeek adapter's advisory model catalog. The settings layer replaces models as one array, so the parent supplies the effective inherited rows until the first edit materializes a user override; reset removes that override inst...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Curated editor for the direct DeepSeek adapter's advisory model catalog. The settings layer replaces models as one array, so the parent supplies the effective inherited rows until the first edit materializes a user override; reset removes that override inst...”；固定提交中扫描到的声明包括 `DeepSeekModelDraft`、`parseCapacity`、`formatCapacity`、`DeepSeekModelsValidationFailure`、`modelDrafts`；本地静态 import 图显示它直接依赖 3 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-models/src/client/ModelsSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.module.css)、[packages/client/ui-settings-models/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/locales.ts)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/ModelListEditor.tsx`、`packages/client/ui-settings-models/src/client/ProviderEditor.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/provider-form.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 364 行；扫描到的声明包括 `DeepSeekModelDraft`、`parseCapacity`、`formatCapacity`、`DeepSeekModelsValidationFailure`、`modelDrafts`、`validateDeepSeekModels`、`DeepSeekModelsEditorProps`、`DeepSeekModelsEditor`；源码顶部原注释（英文，仅作回查线索）：Curated editor for the direct DeepSeek adapter's advisory model catalog. The settings layer replaces models as one array, so the parent supplies the effective inherited rows until the first edit materializes a user override; reset removes that override inst...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `DeepSeekOnboardingDialog` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `DeepSeekOnboardingDialog` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .description、.editor；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 16 行；样式结构包含选择器 .description、.editor。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `DeepSeekOnboardingDialog` 的界面组件或交互逻辑，并导出 `DeepSeekOnboardingInjected`、`DeepSeekOnboardingDialogProps`、`DeepSeekOnboardingDialog`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Official-DeepSeek first-run step. Readiness comes from the same provider/settings/credential join as the Models page: any provider the user can already talk to ends the step, and only a user with none is offered the official DeepSeek route. The step reuses ...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Official-DeepSeek first-run step. Readiness comes from the same provider/settings/credential join as the Models page: any provider the user can already talk to ends the step, and only a user with none is offered the official DeepSeek route. The step reuses ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Official-DeepSeek first-run step. Readiness comes from the same provider/settings/credential join as the Models page: any provider the user can already talk to ends the step, and only a user with none is offered the official DeepSeek route. The step reuses ...”；固定提交中扫描到的声明包括 `DeepSeekOnboardingInjected`、`DeepSeekOnboardingDialogProps`、`DeepSeekOnboardingDialog`、`assertNever`；本地静态 import 图显示它直接依赖 9 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.module.css)、[packages/client/ui-settings-models/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/index.ts`、`packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 124 行；扫描到的声明包括 `DeepSeekOnboardingInjected`、`DeepSeekOnboardingDialogProps`、`DeepSeekOnboardingDialog`、`assertNever`；源码顶部原注释（英文，仅作回查线索）：Official-DeepSeek first-run step. Readiness comes from the same provider/settings/credential join as the Models page: any provider the user can already talk to ends the step, and only a user with none is offered the official DeepSeek route. The step reuses ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/EditorFooter.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/EditorFooter.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `EditorFooter` 的界面组件或交互逻辑，并导出 `EditorFooterProps`、`EditorFooter`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The action row every provider card ends with: dismiss on the left, commit on the right. The two cards commit different things — one creates a route, one edits an existing profile — but the row itself carries no such knowledge. It renders what it is handed, ...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The action row every provider card ends with: dismiss on the left, commit on the right. The two cards commit different things — one creates a route, one edits an existing profile — but the row itself carries no such knowledge. It renders what it is handed, ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The action row every provider card ends with: dismiss on the left, commit on the right. The two cards commit different things — one creates a route, one edits an existing profile — but the row itself carries no such knowledge. It renders what it is handed, ...”；固定提交中扫描到的声明包括 `EditorFooterProps`、`EditorFooter`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/ModelsSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.module.css)、[packages/client/ui-settings-models/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/locales.ts)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)、[packages/client/ui-settings-models/src/client/ProviderEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ProviderEditor.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/ProviderEditor.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 67 行；扫描到的声明包括 `EditorFooterProps`、`EditorFooter`；源码顶部原注释（英文，仅作回查线索）：The action row every provider card ends with: dismiss on the left, commit on the right. The two cards commit different things — one creates a route, one edits an existing profile — but the row itself carries no such knowledge. It renders what it is handed, ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/ModelListEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelListEditor.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ModelListEditor` 的界面组件或交互逻辑，并导出 `ModelDraft`、`ProbeTarget`、`ModelListEditorProps`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The model list of one pi-ai provider profile, plus the action that asks the provider what it serves. The list is the profile's models array as the card holds it: an empty list means "serve this route's built-in catalog", and any entry replaces that catalog,...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The model list of one pi-ai provider profile, plus the action that asks the provider what it serves. The list is the profile's models array as the card holds it: an empty list means "serve this route's built-in catalog", and any entry replaces that catalog,...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The model list of one pi-ai provider profile, plus the action that asks the provider what it serves. The list is the profile's models array as the card holds it: an empty list means "serve this route's built-in catalog", and any entry replaces that catalog,...”；固定提交中扫描到的声明包括 `ModelDraft`、`ProbeTarget`、`ModelListEditorProps`、`ModelListEditor`、`textOf`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/ProviderEditor.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 485 行；扫描到的声明包括 `ModelDraft`、`ProbeTarget`、`ModelListEditorProps`、`ModelListEditor`、`textOf`、`numberOf`、`IconChevron`、`IconTrash`；源码顶部原注释（英文，仅作回查线索）：The model list of one pi-ai provider profile, plus the action that asks the provider what it serves. The list is the profile's models array as the card holds it: an empty list means "serve this route's built-in catalog", and any entry replaces that catalog,...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/ModelsSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ModelsSection` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ModelsSection` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Models settings section, in the settings-panel design language: 14/22 body, 12/18 caption, capsule controls (h36 r18; h28 r14 where a row is dense), 32px fields, and border-l2 hairlines — the vocabulary GeneralSection and the Button/Input primitives already...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .section、.title、.intro、.notice、.savedNotice、.rows；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)、[packages/client/ui-settings-models/src/client/EditorFooter.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/EditorFooter.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx`、`packages/client/ui-settings-models/src/client/EditorFooter.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 681 行；样式结构包含选择器 .section、.title、.intro、.notice、.savedNotice、.rows；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Models settings section, in the settings-panel design language: 14/22 body, 12/18 caption, capsule controls (h36 r18; h28 r14 where a row is dense), 32px fields, and border-l2 hairlines — the vocabulary GeneralSection and the Button/Input primitives already...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/ModelsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ModelsSection` 的界面组件或交互逻辑，并导出 `ModelsSectionInjected`、`ModelsSectionProps`、`ProviderIdentity`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Models settings section: the provider rows joined from the configurable directory, settings namespaces, and credential states, with one editor card at a time. Rows expose only confirmed API-key state through accessible solid configured or missing dots. A wh...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Models settings section: the provider rows joined from the configurable directory, settings namespaces, and credential states, with one editor card at a time. Rows expose only confirmed API-key state through accessible solid configured or missing dots. A wh...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Models settings section: the provider rows joined from the configurable directory, settings namespaces, and credential states, with one editor card at a time. Rows expose only confirmed API-key state through accessible solid configured or missing dots. A wh...”；固定提交中扫描到的声明包括 `ModelsSectionInjected`、`ModelsSectionProps`、`ProviderIdentity`、`removeProviderProfile`、`needsSetup`；本地静态 import 图显示它直接依赖 9 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)、[packages/client/ui-settings-models/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/index.ts`、`packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 538 行；扫描到的声明包括 `ModelsSectionInjected`、`ModelsSectionProps`、`ProviderIdentity`、`removeProviderProfile`、`needsSetup`、`providerTargetLabel`、`providerCopy`、`ModelsSection`；源码顶部原注释（英文，仅作回查线索）：Models settings section: the provider rows joined from the configurable directory, settings namespaces, and credential states, with one editor card at a time. Rows expose only confirmed API-key state through accessible solid configured or missing dots. A wh...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/OnboardingModal.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/OnboardingModal.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `OnboardingModal` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `OnboardingModal` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .dialog、.content、.title、.body；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/OnboardingModal.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/OnboardingModal.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/OnboardingModal.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 32 行；样式结构包含选择器 .dialog、.content、.title、.body。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/OnboardingModal.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/OnboardingModal.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `OnboardingModal` 的界面组件或交互逻辑，并导出 `OnboardingModal`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Shared modal chrome for every step registered by this onboarding plugin.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared modal chrome for every step registered by this onboarding plugin.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Shared modal chrome for every step registered by this onboarding plugin.”；固定提交中扫描到的声明包括 `OnboardingModal`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-models/src/client/OnboardingModal.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/OnboardingModal.module.css)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)、[packages/client/ui-settings-models/src/client/WelcomeNotice.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/WelcomeNotice.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx`、`packages/client/ui-settings-models/src/client/WelcomeNotice.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `OnboardingModal`；源码顶部原注释（英文，仅作回查线索）：Shared modal chrome for every step registered by this onboarding plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/ProviderEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ProviderEditor.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ProviderEditor` 的界面组件或交互逻辑，并导出 `ProviderEditorProps`、`pathOps`、`ProviderEditor`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：One provider's editor card, hand-written per adapter family: the primary field is a single write-only **API key** input (the page never asks for an environment-variable name — a typed key stores through credentials.set under the profile's reference, derivin...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“One provider's editor card, hand-written per adapter family: the primary field is a single write-only **API key** input (the page never asks for an environment-variable name — a typed key stores through credentials.set under the profile's reference, derivin...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“One provider's editor card, hand-written per adapter family: the primary field is a single write-only **API key** input (the page never asks for an environment-variable name — a typed key stores through credentials.set under the profile's reference, derivin...”；固定提交中扫描到的声明包括 `ProviderEditorProps`、`pathOps`、`ProviderEditor`、`draftAt`、`layoutOf`；本地静态 import 图显示它直接依赖 9 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)、[packages/client/ui-settings-models/src/client/EditorFooter.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/EditorFooter.tsx)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx`、`packages/client/ui-settings-models/src/client/ModelsSection.tsx`、`packages/client/ui-settings-models/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 519 行；扫描到的声明包括 `ProviderEditorProps`、`pathOps`、`ProviderEditor`、`draftAt`、`layoutOf`、`refFor`；源码顶部原注释（英文，仅作回查线索）：One provider's editor card, hand-written per adapter family: the primary field is a single write-only **API key** input (the page never asks for an environment-variable name — a typed key stores through credentials.set under the profile's reference, derivin...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/WelcomeNotice.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/WelcomeNotice.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `WelcomeNotice` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `WelcomeNotice` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .copy、.error、.actions、.primary；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/WelcomeNotice.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/WelcomeNotice.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/WelcomeNotice.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 36 行；样式结构包含选择器 .copy、.error、.actions、.primary。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/WelcomeNotice.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/WelcomeNotice.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `WelcomeNotice` 的界面组件或交互逻辑，并导出 `WelcomeNoticeInjected`、`WelcomeNoticeProps`、`WelcomeNotice`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Product-wide, versioned internal-testing notice.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Product-wide, versioned internal-testing notice.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Product-wide, versioned internal-testing notice.”；固定提交中扫描到的声明包括 `WelcomeNoticeInjected`、`WelcomeNoticeProps`、`WelcomeNotice`；本地静态 import 图显示它直接依赖 7 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-models/src/client/OnboardingModal.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/OnboardingModal.tsx)、[packages/client/ui-settings-models/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/index.ts`、`packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `WelcomeNoticeInjected`、`WelcomeNoticeProps`、`WelcomeNotice`；源码顶部原注释（英文，仅作回查线索）：Product-wide, versioned internal-testing notice.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/apiKey.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/apiKey.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Browser-side judgement of a typed API key. @module @deepseek-ai/dsh-client-ui-settings-models/apiKey”；固定提交中扫描到的声明包括 `ApiKeyFailureKey`、`apiKeyFailure`、`isQuoted`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)、[packages/client/ui-settings-models/src/client/ProviderEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ProviderEditor.tsx)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/ProviderEditor.tsx`、`packages/client/ui-settings-models/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `ApiKeyFailureKey`、`apiKeyFailure`、`isQuoted`；源码顶部原注释（英文，仅作回查线索）：Browser-side judgement of a typed API key. @module @deepseek-ai/dsh-client-ui-settings-models/apiKey。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Models settings and product-onboarding plugin, browser half. It registers the Models page plus the ordered internal-testing and official-DeepSeek onboarding dialogs, whose UI shares this package's modal wrapper. The Host settings and credential contracts st...”；固定提交中扫描到的声明包括 `refreshIfLoaded`、`inject`、`apply`；本地静态 import 图显示它直接依赖 12 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-models/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-models/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `refreshIfLoaded`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Models settings and product-onboarding plugin, browser half. It registers the Models page plus the ordered internal-testing and official-DeepSeek onboarding dialogs, whose UI shares this package's modal wrapper. The Host settings and credential contracts st...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Copy dictionaries for the Models settings section.”；固定提交中扫描到的声明包括 `en`、`ModelsKey`、`zh`；本地静态 import 图显示它直接依赖 1 个源文件，并被 13 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/onboarding-copy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/onboarding-copy.ts)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx`、`packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`、`packages/client/ui-settings-models/tests/provider-form.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 204 行；扫描到的声明包括 `en`、`ModelsKey`、`zh`；源码顶部原注释（英文，仅作回查线索）：Copy dictionaries for the Models settings section.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/schema-operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/schema-operations.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义浏览器端、用户界面、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：固定提交中扫描到的声明包括 `SettingsSchemaOperations`、`createSettingsSchemaOperations`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)、[packages/client/ui-settings-models/src/client/ModelsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.tsx)、[packages/client/ui-settings-models/src/client/ProviderEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ProviderEditor.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)、[packages/client/ui-settings-models/tests/readiness.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/readiness.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-models/README.md`，再读本配置/脚本，沿着 `packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx`、`packages/client/ui-settings-models/src/client/ModelsSection.tsx`、`packages/client/ui-settings-models/src/client/ProviderEditor.tsx` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `SettingsSchemaOperations`、`createSettingsSchemaOperations`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Models settings page store: one snapshot joining the configurable-provider directory (llm.providers), the settings namespaces (shared settings mirror), and the referenced credentials (credentials.describe). The host stays the single fact source — every muta...”；固定提交中扫描到的声明包括 `ProviderRow`、`ModelsSettingsState`、`messageOf`、`deriveKeyRef`、`protocolChoices`；本地静态 import 图显示它直接依赖 4 个源文件，并被 12 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-models/src/client/schema-operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/schema-operations.ts)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)、[packages/client/ui-settings-models/tests/readiness.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/readiness.client.spec.ts)、[packages/client/ui-settings-models/tests/store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-models/src/client/schema-operations.ts` 和 `packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx`、`packages/client/ui-settings-models/src/client/ModelListEditor.tsx` 理解状态变化，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 296 行；扫描到的声明包括 `ProviderRow`、`ModelsSettingsState`、`messageOf`、`deriveKeyRef`、`protocolChoices`、`ModelsSettingsStore`、`providerUsable`、`OnboardingReadiness`；源码顶部原注释（英文，仅作回查线索）：Models settings page store: one snapshot joining the configurable-provider directory (llm.providers), the settings namespaces (shared settings mirror), and the referenced credentials (credentials.describe). The host stays the single fact source — every muta...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/client/welcome-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/welcome-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Welcome-notice state derived from the welcome settings scope. The scope is the transport: a loopback browser follows the durable Host section, while a remote browser's memory-mode scope never answers and the acknowledgement stays process-local here.”；固定提交中扫描到的声明包括 `WelcomeNoticeState`、`WelcomeSection`、`decodeWelcomeSection`、`WelcomeNoticeStore`、`assertNever`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-models/src/onboarding-copy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/onboarding-copy.ts)、[packages/client/ui-settings-models/src/client/WelcomeNotice.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/WelcomeNotice.tsx)、[packages/client/ui-settings-models/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-models/src/onboarding-copy.ts` 和 `packages/client/ui-settings-models/src/client/WelcomeNotice.tsx`、`packages/client/ui-settings-models/src/client/index.ts`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`、`packages/client/ui-settings-models/tests/welcome-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `WelcomeNoticeState`、`WelcomeSection`、`decodeWelcomeSection`、`WelcomeNoticeStore`、`assertNever`；源码顶部原注释（英文，仅作回查线索）：Welcome-notice state derived from the welcome settings scope. The scope is the transport: a loopback browser follows the durable Host section, while a remote browser's memory-mode scope never answers and the acknowledgement stays process-local here.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-settings-models/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-models/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser implementation exported from ./client.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/scaffold.ts)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-models/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/tests/scaffold.ts`、`packages/client/ui-settings-models/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-models/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser implementation exported from ./client.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings-models. @module @deepseek-ai/dsh-client-ui-settings-models/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-settings-models/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-settings-models/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings-models. @module @deepseek-ai/dsh-client-ui-settings-models/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/src/onboarding-copy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/onboarding-copy.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Durable settings namespace for product-wide GUI onboarding facts.”；固定提交中扫描到的声明包括 `WELCOME_NOTICE_SETTINGS_NAMESPACE`、`WELCOME_NOTICE_ACK_FIELD`、`WELCOME_NOTICE_VERSION`、`WELCOME_NOTICE_COPY`；本地静态 import 图显示它直接依赖 0 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/index.ts)、[packages/client/ui-settings-models/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/locales.ts)、[packages/client/ui-settings-models/src/client/welcome-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/welcome-store.ts)
- 对应测试：[packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/src/client/index.ts`、`packages/client/ui-settings-models/src/client/locales.ts`、`packages/client/ui-settings-models/src/client/welcome-store.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/apply.client.spec.ts`、`packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`、`packages/client/ui-settings-models/tests/welcome-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `WELCOME_NOTICE_SETTINGS_NAMESPACE`、`WELCOME_NOTICE_ACK_FIELD`、`WELCOME_NOTICE_VERSION`、`WELCOME_NOTICE_COPY`；源码顶部原注释（英文，仅作回查线索）：Durable settings namespace for product-wide GUI onboarding facts.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-settings-models apply”、“declares the services it uses”、“registers the models nav entry for declarations before or after apply”、“the label thunk follows the active locale without re-registration”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings-models apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Models section registration: slot declaration injection, the locale-following label thunk, and HMR recovery.”；固定提交中扫描到的声明包括 `bench`、`declare`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 305 行；扫描到的声明包括 `bench`、`declare`；扫描到的测试主题包括 “ui-settings-models apply”、“declares the services it uses”、“registers the models nav entry for declarations before or after apply”、“the label thunk follows the active locale without re-registration”、“locale change while the slot is undeclared stays a no-op”、“re-registers after an HMR collapse re-declares the slot (stale disposer must not block)”；源码顶部原注释（英文，仅作回查线索）：Models section registration: slot declaration injection, the locale-following label thunk, and HMR recovery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ModelsSection”、“renders nothing before the slot injects its dependencies”、“renders the unkeyed whole-section provider as an open setup card in the first-run posture”、“leaves the unkeyed provider a plain row once another provider is usable”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ModelsSection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `expandRow`、`capacityInputs`、`wireNamespaces`、`ok`、`fail`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)、[packages/client/ui-settings-models/src/client/ModelsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx`、`packages/client/ui-settings-models/src/client/ModelsSection.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1406 行；扫描到的声明包括 `expandRow`、`capacityInputs`、`wireNamespaces`、`ok`、`fail`、`scriptedFace`、`mountFace`、`mountSection`；扫描到的测试主题包括 “ModelsSection”、“renders nothing before the slot injects its dependencies”、“renders the unkeyed whole-section provider as an open setup card in the first-run posture”、“leaves the unkeyed provider a plain row once another provider is usable”、“marks only a confirmed missing reference and leaves native or unavailable state unmarked”、“turns the setup card into a row once the credential reports configured”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”、“renders null until the shell injects the section dependencies”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/ModelsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/ModelsSection.tsx)、[packages/client/ui-settings-models/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/index.ts)、[packages/client/ui-settings-models/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/invariant.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-models/src/client/ModelsSection.tsx`、`packages/client/ui-settings-models/src/index.ts`、`packages/client/ui-settings-models/src/invariant.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”、“renders null until the shell injects the section dependencies”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“DeepSeekOnboardingDialog”、“renders when the shell root is absent”、“loads a credential-only modal, inerts the product, and focuses the key”、“cannot be dismissed implicitly and restores the previous inert state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DeepSeekOnboardingDialog”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `ok`、`fail`、`deepSeekNamespace`、`harness`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx)、[packages/client/ui-settings-models/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx`、`packages/client/ui-settings-models/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 270 行；扫描到的声明包括 `ok`、`fail`、`deepSeekNamespace`、`harness`；扫描到的测试主题包括 “DeepSeekOnboardingDialog”、“renders when the shell root is absent”、“loads a credential-only modal, inerts the product, and focuses the key”、“cannot be dismissed implicitly and restores the previous inert state”、“requires a non-blank key before Save and continue is available”、“keeps the modal open and reports rejected and failed credential writes”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“protocolChoices”、“reads the protocols out of the namespace schema and nothing else”、“model list editing”、“adds, edits, and removes rows without storing emptied optional fields”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“protocolChoices”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `ok`、`fail`、`piAiNamespace`、`scriptedFace`、`firstProbe`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/CustomProviderCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/CustomProviderCard.tsx)、[packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-models/src/client/CustomProviderCard.tsx`、`packages/client/ui-settings-models/src/client/DeepSeekModelsEditor.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1406 行；扫描到的声明包括 `ok`、`fail`、`piAiNamespace`、`scriptedFace`、`firstProbe`、`firstMutate`、`mountSection`、`openEditor`；扫描到的测试主题包括 “protocolChoices”、“reads the protocols out of the namespace schema and nothing else”、“model list editing”、“adds, edits, and removes rows without storing emptied optional fields”、“names a duplicate model id in the edit flow too”、“reads K and M suffixes and keeps the text the user typed”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/readiness.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/readiness.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“providerUsable”、“requires a registered route and a stored key for every named reference”、“treats a reference-free registered route as provider-native authentication”、“onboardingReadiness”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“providerUsable”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Pure first-run readiness projection over the shared Models join.”；固定提交中扫描到的声明包括 `row`、`otherRow`、`state`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-models/src/client/store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `row`、`otherRow`、`state`；扫描到的测试主题包括 “providerUsable”、“requires a registered route and a stored key for every named reference”、“treats a reference-free registered route as provider-native authentication”、“onboardingReadiness”、“waits for the first join and skips onboarding when the adapter directory entry is absent”、“reports a missing writable effective credential”；源码顶部原注释（英文，仅作回查线索）：Pure first-run readiness projection over the shared Models join.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“settings-schema.client”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `settingsSchema`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/schema-operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/schema-operations.ts)、[packages/client/ui-settings/src/client/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/schema.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)、[packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx)、[packages/client/ui-settings-models/tests/provider-form.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/provider-form.client.spec.tsx)、[packages/client/ui-settings-models/tests/store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/ui-settings-models/tests/components.client.spec.tsx`、`packages/client/ui-settings-models/tests/onboarding-dialog.client.spec.tsx`、`packages/client/ui-settings-models/tests/provider-form.client.spec.tsx`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 6 行；扫描到的声明包括 `settingsSchema`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、状态存储的具体场景，包括“ModelsSettingsStore”、“joins rows with configured, removable, and credential state”、“degrades the credential badge, not the page, when the credential domain fails”、“settles a credential transport rejection without leaving the store loading”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ModelsSettingsStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Page-store join: directory × namespaces × credentials, with last-good rows on failure.”；固定提交中扫描到的声明包括 `ok`、`fail`、`api`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/store.ts)、[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-models/src/client/store.ts`、`packages/client/ui-settings/src/client/settings-mirror.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 299 行；扫描到的声明包括 `ok`、`fail`、`api`；扫描到的测试主题包括 “ModelsSettingsStore”、“joins rows with configured, removable, and credential state”、“degrades the credential badge, not the page, when the credential domain fails”、“settles a credential transport rejection without leaving the store loading”、“stringifies a non-Error credential transport rejection”、“surfaces a directory failure and keeps the last good rows”；源码顶部原注释（英文，仅作回查线索）：Page-store join: directory × namespaces × credentials, with last-good rows on failure.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ModelsSection theme styles”、“names only theme variables the token sheet defines”、“closes every block, so no rule is swallowed by the one above it”、“separates the row card from the editor it expands into”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ModelsSection theme styles”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Models section stylesheet contract, asserted against the CSS text on disk. The section paints in both themes, and a --dsw-* name the theme does not declare fails silently: the browser takes the var() fallback, so the sheet still renders and only the dark th...”；固定提交中扫描到的声明包括 `block`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `block`；扫描到的测试主题包括 “ModelsSection theme styles”、“names only theme variables the token sheet defines”、“closes every block, so no rule is swallowed by the one above it”、“separates the row card from the editor it expands into”、“gives every dropdown the shared chevron instead of the OS arrow”、“never falls back to a literal colour”；源码顶部原注释（英文，仅作回查线索）：Models section stylesheet contract, asserted against the CSS text on disk. The section paints in both themes, and a --dsw-* name the theme does not declare fails silently: the browser takes the var() fallback, so the sheet still renders and only the dark th...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“WelcomeNotice”、“uses the exact owner copy in both GUI locales”、“renders one blocking modal action and focuses the title”、“completes only after the acknowledgement write commits”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WelcomeNotice”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `response`、`welcomeView`、`mount`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/ui-settings-models/src/client/WelcomeNotice.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/WelcomeNotice.tsx)、[packages/client/ui-settings-models/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/locales.ts)、[packages/client/ui-settings-models/src/client/welcome-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/welcome-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-models/src/client/WelcomeNotice.tsx`、`packages/client/ui-settings-models/src/client/locales.ts`、`packages/client/ui-settings-models/src/client/welcome-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 158 行；扫描到的声明包括 `response`、`welcomeView`、`mount`；扫描到的测试主题包括 “WelcomeNotice”、“uses the exact owner copy in both GUI locales”、“renders one blocking modal action and focuses the title”、“completes only after the acknowledgement write commits”、“skips itself when this exact version was already acknowledged”、“keeps the sole action disabled while saving and reports a refused write”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tests/welcome-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、状态存储的具体场景，包括“WelcomeNoticeStore”、“acknowledges in memory without calling loopback-only settings APIs”、“acknowledges only the exact current copy version”、“persists the owner version through one revision-fenced mutation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WelcomeNoticeStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ok`、`namespace`、`acknowledgedNamespace`、`buildWelcome`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings-models/src/client/welcome-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/client/welcome-store.ts)、[packages/client/ui-settings-models/src/onboarding-copy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/src/onboarding-copy.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings-models/src/client/welcome-store.ts`、`packages/client/ui-settings-models/src/onboarding-copy.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 170 行；扫描到的声明包括 `ok`、`namespace`、`acknowledgedNamespace`、`buildWelcome`；扫描到的测试主题包括 “WelcomeNoticeStore”、“acknowledges in memory without calling loopback-only settings APIs”、“acknowledges only the exact current copy version”、“persists the owner version through one revision-fenced mutation”、“keeps the notice pending while the settings read has not answered”、“reports a failed or refused persistence attempt after its recovery read”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-models/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-models/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-models/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-settings-plugin-inventory

### [packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `PluginInventorySettingsTab` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `PluginInventorySettingsTab` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .section、.status、.failure、.catalog、.search、.catalogHeading；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 279 行；样式结构包含选择器 .section、.status、.failure、.catalog、.search、.catalogHeading。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `PluginInventorySettingsTab` 的界面组件或交互逻辑，并导出 `PluginInventorySettingsTabInjected`、`PluginInventorySettingsTabProps`、`PluginInventorySettingsTab`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `PluginInventorySettingsTabInjected`、`PluginInventorySettingsTabProps`、`PluginInventorySettingsTab`、`phaseLabel`、`moduleShortName`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `PluginInventorySettingsTabInjected`、`PluginInventorySettingsTabProps`、`PluginInventorySettingsTab`、`phaseLabel`、`moduleShortName`；本地静态 import 图显示它直接依赖 5 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.module.css)、[packages/client/ui-settings-plugin-inventory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugin-inventory/src/client/index.ts`、`packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 197 行；扫描到的声明包括 `PluginInventorySettingsTabInjected`、`PluginInventorySettingsTabProps`、`PluginInventorySettingsTab`、`phaseLabel`、`moduleShortName`、`matches`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Read-only Host plugin inventory registered into Web Settings.”；固定提交中扫描到的声明包括 `NS`、`inject`、`apply`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx)、[packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugin-inventory/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 47 行；扫描到的声明包括 `NS`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Read-only Host plugin inventory registered into Web Settings.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Copy dictionaries for the plugin inventory Settings section.”；固定提交中扫描到的声明包括 `zh`、`PluginInventoryLocaleKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx)、[packages/client/ui-settings-plugin-inventory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/index.ts)、[packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx)
- 对应测试：[packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx`、`packages/client/ui-settings-plugin-inventory/src/client/index.ts`、`packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `zh`、`PluginInventoryLocaleKey`、`en`；源码顶部原注释（英文，仅作回查线索）：Copy dictionaries for the plugin inventory Settings section.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-settings-plugin-inventory/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-plugin-inventory/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the inventory-tab browser implementation exported from ./client.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugin-inventory/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the inventory-tab browser implementation exported from ./client.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion. @module @deepseek-ai/dsh-client-ui-settings-plugin-inventory/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion. @module @deepseek-ai/dsh-client-ui-settings-plugin-inventory/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/browser-plugin.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-settings-plugin-inventory browser plugin”、“declares only the services used by the Settings Remote contribution”、“registers a localized tab without reading the Remote eagerly”、“follows locale and recovers across late declaration and declarer reload”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings-plugin-inventory browser plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`、`RemoteService`、`declare`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `bench`、`RemoteService`、`declare`；扫描到的测试主题包括 “ui-settings-plugin-inventory browser plugin”、“declares only the services used by the Settings Remote contribution”、“registers a localized tab without reading the Remote eagerly”、“follows locale and recovers across late declaration and declarer reload”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“PluginInventorySettingsTab”、“renders runtime status only for enabled plugins”、“filters by module name or Loader entry id”、“shows a generic failure and retries into the empty state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“PluginInventorySettingsTab”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `props`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx)、[packages/client/ui-settings-plugin-inventory/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-plugin-inventory/src/client/PluginInventorySettingsTab.tsx`、`packages/client/ui-settings-plugin-inventory/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 127 行；扫描到的声明包括 `props`；扫描到的测试主题包括 “PluginInventorySettingsTab”、“renders runtime status only for enabled plugins”、“filters by module name or Loader entry id”、“shows a generic failure and retries into the empty state”、“contains a synchronous Remote failure and ignores a result after unmount”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-settings-plugin-inventory invariant companion”、“registers the empty installer and keeps the node half inert”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings-plugin-inventory invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/ui-settings-plugin-inventory/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/index.ts)、[packages/client/ui-settings-plugin-inventory/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-plugin-inventory/src/index.ts`、`packages/client/ui-settings-plugin-inventory/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 15 行；扫描到的测试主题包括 “ui-settings-plugin-inventory invariant companion”、“registers the empty installer and keeps the node half inert”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugin-inventory/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugin-inventory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugin-inventory/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-plugin-inventory/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-settings-plugins

### [packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AgentLoopCard` 的界面组件或交互逻辑，并导出 `AgentLoopCardProps`、`AgentLoopCard`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The agent loop's card: how many tool calls one step may run at once.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The agent loop's card: how many tool calls one step may run at once.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The agent loop's card: how many tool calls one step may run at once.”；固定提交中扫描到的声明包括 `AgentLoopCardProps`、`AgentLoopCard`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)、[packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts)、[packages/client/ui-settings-plugins/src/client/fields.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.tsx)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 47 行；扫描到的声明包括 `AgentLoopCardProps`、`AgentLoopCard`；源码顶部原注释（英文，仅作回查线索）：The agent loop's card: how many tool calls one step may run at once.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/BashCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/BashCard.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `BashCard` 的界面组件或交互逻辑，并导出 `BashCardProps`、`BashCard`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The shell plugin's card: the limits every command the agent runs is bound by.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The shell plugin's card: the limits every command the agent runs is bound by.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The shell plugin's card: the limits every command the agent runs is bound by.”；固定提交中扫描到的声明包括 `BashCardProps`、`BashCard`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)、[packages/client/ui-settings-plugins/src/client/bash-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/bash-card-controller.ts)、[packages/client/ui-settings-plugins/src/client/fields.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.tsx)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的声明包括 `BashCardProps`、`BashCard`；源码顶部原注释（英文，仅作回查线索）：The shell plugin's card: the limits every command the agent runs is bound by.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ConfigurablePluginsTab` 的界面组件或交互逻辑，并导出 `ConfigurablePluginsTabProps`、`ConfigurablePluginsTab`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Configurable Host plugins contributed to the shared Plugins section. The tab enumerates settings namespaces but never interprets one — a card arrives through settings.plugin.item keyed by the namespace it edits, so a plugin that ships a browser half owns it...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Configurable Host plugins contributed to the shared Plugins section. The tab enumerates settings namespaces but never interprets one — a card arrives through settings.plugin.item keyed by the namespace it edits, so a plugin that ships a browser half owns it...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Configurable Host plugins contributed to the shared Plugins section. The tab enumerates settings namespaces but never interprets one — a card arrives through settings.plugin.item keyed by the namespace it edits, so a plugin that ships a browser half owns it...”；固定提交中扫描到的声明包括 `ConfigurablePluginsTabProps`、`ConfigurablePluginsTab`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.module.css)、[packages/client/ui-settings-plugins/src/client/slot-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/slot-contract.ts)、[packages/client/ui-settings-plugins/src/client/tab-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/tab-store.ts)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 43 行；扫描到的声明包括 `ConfigurablePluginsTabProps`、`ConfigurablePluginsTab`；源码顶部原注释（英文，仅作回查线索）：Configurable Host plugins contributed to the shared Plugins section. The tab enumerates settings namespaces but never interprets one — a card arrives through settings.plugin.item keyed by the namespace it edits, so a plugin that ships a browser half owns it...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/PluginCard.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `PluginCard` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `PluginCard` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Plugin card: a header that names the plugin, disclosing its controls in place.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .card、.cardOpen、.header、.headText、.name、.description；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)、[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/PluginCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 157 行；样式结构包含选择器 .card、.cardOpen、.header、.headText、.name、.description；源码顶部原注释（英文，仅作回查线索）：Plugin card: a header that names the plugin, disclosing its controls in place.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `PluginCard` 的界面组件或交互逻辑，并导出 `PluginCardProps`、`PluginCard`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：One plugin's card: a header naming the plugin and what its settings govern, disclosing that plugin's controls in place, with the save that writes them. The header is its own button rather than a shared disclosure row because a card stacks its name over its ...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“One plugin's card: a header naming the plugin and what its settings govern, disclosing that plugin's controls in place, with the save that writes them. The header is its own button rather than a shared disclosure row because a card stacks its name over its ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“One plugin's card: a header naming the plugin and what its settings govern, disclosing that plugin's controls in place, with the save that writes them. The header is its own button rather than a shared disclosure row because a card stacks its name over its ...”；固定提交中扫描到的声明包括 `PluginCardProps`、`PluginCard`；本地静态 import 图显示它直接依赖 4 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings-plugins/src/client/PluginCard.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.module.css)、[packages/client/ui-settings-plugins/src/client/card-form.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/card-form.ts)、[packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)、[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx`、`packages/client/ui-settings-plugins/src/client/BashCard.tsx`、`packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `PluginCardProps`、`PluginCard`；源码顶部原注释（英文，仅作回查线索）：One plugin's card: a header naming the plugin and what its settings govern, disclosing that plugin's controls in place, with the save that writes them. The header is its own button rather than a shared disclosure row because a card stacks its name over its ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `PluginsSettingsSection` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `PluginsSettingsSection` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Plugins section: compact tabs plus the configurable plugin card list.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .section、.heading、.intro、.tabs、.tab、.panel；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx)、[packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)、[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx`、`packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 85 行；样式结构包含选择器 .section、.heading、.intro、.tabs、.tab、.panel；源码顶部原注释（英文，仅作回查线索）：Plugins section: compact tabs plus the configurable plugin card list.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `PluginsSettingsSection` 的界面组件或交互逻辑，并导出 `PluginsSettingsTabEntry`、`PluginsSettingsSectionInjected`、`PluginsSettingsSectionProps`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Plugins settings section: localized tabs around feature-owned pages.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Plugins settings section: localized tabs around feature-owned pages.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Plugins settings section: localized tabs around feature-owned pages.”；固定提交中扫描到的声明包括 `PluginsSettingsTabEntry`、`PluginsSettingsSectionInjected`、`PluginsSettingsSectionProps`、`PluginsSettingsSection`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.module.css)、[packages/client/ui-settings-plugins/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/locales.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `PluginsSettingsTabEntry`、`PluginsSettingsSectionInjected`、`PluginsSettingsSectionProps`、`PluginsSettingsSection`；源码顶部原注释（英文，仅作回查线索）：Plugins settings section: localized tabs around feature-owned pages.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `WebSearchCard` 的界面组件或交互逻辑，并导出 `WebSearchCardProps`、`WebSearchCard`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The web-search provider's card: its endpoint, its per-request search budget, and the key — which is written through the credentials domain, never into the settings section, so the literal never rides a response.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The web-search provider's card: its endpoint, its per-request search budget, and the key — which is written through the credentials domain, never into the settings section, so the literal never rides a response.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The web-search provider's card: its endpoint, its per-request search budget, and the key — which is written through the credentials domain, never into the settings section, so the literal never rides a response.”；固定提交中扫描到的声明包括 `WebSearchCardProps`、`WebSearchCard`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)、[packages/client/ui-settings-plugins/src/client/fields.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.tsx)、[packages/client/ui-settings-plugins/src/client/slot-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/slot-contract.ts)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 78 行；扫描到的声明包括 `WebSearchCardProps`、`WebSearchCard`；源码顶部原注释（英文，仅作回查线索）：The web-search provider's card: its endpoint, its per-request search budget, and the key — which is written through the credentials domain, never into the settings section, so the literal never rides a response.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：交互控制器
- 这个文件有什么用：它把浏览器端、用户界面、智能体的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。
- 为什么这样设计：把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。
- 文件级设计证据：源码顶部注释把它定位为“The agent-loop card's staged form over the agent-loop settings namespace.”；固定提交中扫描到的声明包括 `AGENT_LOOP_NS`、`AgentLoopSettings`、`AgentLoopCardState`、`AgentLoopCardFace`、`AgentLoopCardController`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugins/src/client/card-form.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/card-form.ts)、[packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)、[packages/client/ui-settings-plugins/tests/stores.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/stores.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-plugins/src/client/card-form.ts` 和 `packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx`、`packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认输入输出，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`、`packages/client/ui-settings-plugins/tests/stores.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的声明包括 `AGENT_LOOP_NS`、`AgentLoopSettings`、`AgentLoopCardState`、`AgentLoopCardFace`、`AgentLoopCardController`；源码顶部原注释（英文，仅作回查线索）：The agent-loop card's staged form over the agent-loop settings namespace.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/bash-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/bash-card-controller.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：交互控制器
- 这个文件有什么用：它把浏览器端、用户界面、控制器的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。
- 为什么这样设计：把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。
- 文件级设计证据：源码顶部注释把它定位为“The shell card's staged form over the bash settings namespace.”；固定提交中扫描到的声明包括 `SHELL_NS`、`BashSettings`、`BashCardState`、`BashCardFace`、`BashCardController`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugins/src/client/card-form.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/card-form.ts)、[packages/client/ui-settings-plugins/src/client/BashCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/BashCard.tsx)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)、[packages/client/ui-settings-plugins/tests/stores.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/stores.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-plugins/src/client/card-form.ts` 和 `packages/client/ui-settings-plugins/src/client/BashCard.tsx`、`packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认输入输出，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`、`packages/client/ui-settings-plugins/tests/stores.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `SHELL_NS`、`BashSettings`、`BashCardState`、`BashCardFace`、`BashCardController`；源码顶部原注释（英文，仅作回查线索）：The shell card's staged form over the bash settings namespace.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/card-form.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/card-form.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Shared form model behind every plugin card. A card stages what the user types and writes it only when they save. Each settings write is a durable, revision-fenced document mutation, so a control that committed as it settled turned one edit into a write the ...”；固定提交中扫描到的声明包括 `FieldWrite`、`CardFieldSpec`、`CardSecretSpec`、`CardFieldState`、`CardShell`；本地静态 import 图显示它直接依赖 1 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)、[packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts)、[packages/client/ui-settings-plugins/src/client/bash-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/bash-card-controller.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)、[packages/client/ui-settings-plugins/tests/stores.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/stores.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/PluginCard.tsx`、`packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts`、`packages/client/ui-settings-plugins/src/client/bash-card-controller.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`、`packages/client/ui-settings-plugins/tests/stores.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 351 行；扫描到的声明包括 `FieldWrite`、`CardFieldSpec`、`CardSecretSpec`、`CardFieldState`、`CardShell`、`CardActions`、`numberField`、`textField`；源码顶部原注释（英文，仅作回查线索）：Shared form model behind every plugin card. A card stages what the user types and writes it only when they save. Each settings write is a durable, revision-fenced document mutation, so a control that committed as it settled turned one edit into a write the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/fields.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `fields` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `fields` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Plugin configuration fields: label, control, override badge, and hint.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .field、.head、.label、.badges、.badge、.badgeMuted；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/fields.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)、[packages/client/ui-settings-plugins/tests/fields.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/fields.client.spec.tsx)、[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/fields.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts`、`packages/client/ui-settings-plugins/tests/fields.client.spec.tsx`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 113 行；样式结构包含选择器 .field、.head、.label、.badges、.badge、.badgeMuted；源码顶部原注释（英文，仅作回查线索）：Plugin configuration fields: label, control, override badge, and hint.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/fields.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `fields` 的界面组件或交互逻辑，并导出 `FieldProps`、`ValueField`、`SecretField`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Hand-written controls for the plugin configuration forms. Each renders one field's label, its staged text, whether saving would leave an override, and — when one stands — the reset that stages a clear back to the composition layer. Nothing here writes: a co...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Hand-written controls for the plugin configuration forms. Each renders one field's label, its staged text, whether saving would leave an override, and — when one stands — the reset that stages a clear back to the composition layer. Nothing here writes: a co...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Hand-written controls for the plugin configuration forms. Each renders one field's label, its staged text, whether saving would leave an override, and — when one stands — the reset that stages a clear back to the composition layer. Nothing here writes: a co...”；固定提交中扫描到的声明包括 `FieldProps`、`ValueField`、`SecretField`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/fields.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.module.css)、[packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx)、[packages/client/ui-settings-plugins/src/client/BashCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/BashCard.tsx)、[packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx)
- 对应测试：[packages/client/ui-settings-plugins/tests/fields.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/fields.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx`、`packages/client/ui-settings-plugins/src/client/BashCard.tsx`、`packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/fields.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 123 行；扫描到的声明包括 `FieldProps`、`ValueField`、`SecretField`；源码顶部原注释（英文，仅作回查线索）：Hand-written controls for the plugin configuration forms. Each renders one field's label, its staged text, whether saving would leave an override, and — when one stands — the reset that stages a clear back to the composition layer. Nothing here writes: a co...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Plugins settings surface, browser half — one section whose feature-owned tabs include configurable Host plugin cards and read-only inventory. The section declares settings.plugins.tab; its own configurable tab then declares settings.plugin.item and renders ...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 20 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 166 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Plugins settings surface, browser half — one section whose feature-owned tabs include configurable Host plugin cards and read-only inventory. The section declares settings.plugins.tab; its own configurable tab then declares settings.plugin.item and renders ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Locale bundles for the plugin configuration section and its plugin cards.”；固定提交中扫描到的声明包括 `PluginsSettingsLocaleKey`、`en`、`zh`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/PluginCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginCard.tsx)、[packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-plugins/src/client/PluginCard.tsx`、`packages/client/ui-settings-plugins/src/client/PluginsSettingsSection.tsx`、`packages/client/ui-settings-plugins/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `PluginsSettingsLocaleKey`、`en`、`zh`；源码顶部原注释（英文，仅作回查线索）：Locale bundles for the plugin configuration section and its plugin cards.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/slot-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/slot-contract.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“The settings.plugin.item slot type — one plugin's card inside the configurable-plugins tab, keyed by the settings namespace the card edits. Options: key (the namespace). A card draws its own internals; the tab only decides which namespaces to dispatch and s...”；固定提交中扫描到的声明包括 `SettingsPluginItemOwnerProps`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx)、[packages/client/ui-settings-plugins/src/client/BashCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/BashCard.tsx)、[packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)、[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx`、`packages/client/ui-settings-plugins/src/client/BashCard.tsx`、`packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-plugins/tests/apply.client.spec.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `SettingsPluginItemOwnerProps`；源码顶部原注释（英文，仅作回查线索）：The settings.plugin.item slot type — one plugin's card inside the configurable-plugins tab, keyed by the settings namespace the card edits. Options: key (the namespace). A card draws its own internals; the tab only decides which namespaces to dispatch and s...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/tab-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/tab-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“The configurable-plugins tab's card list. The tab dispatches its slot by settings namespace, so what it renders is the intersection of two ledgers: the namespaces the Host serves and the cards registered into settings.plugin.item. A served namespace no card...”；固定提交中扫描到的声明包括 `ConfigurablePluginsTabState`、`ConfigurablePluginsTabFace`、`ConfigurablePluginsTabController`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)、[packages/client/ui-settings-plugins/tests/stores.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/stores.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings/src/client/index.ts`、`packages/client/ui-slots/src/index.ts` 和 `packages/client/ui-settings-plugins/src/client/ConfigurablePluginsTab.tsx`、`packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`、`packages/client/ui-settings-plugins/tests/stores.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 102 行；扫描到的声明包括 `ConfigurablePluginsTabState`、`ConfigurablePluginsTabFace`、`ConfigurablePluginsTabController`；源码顶部原注释（英文，仅作回查线索）：The configurable-plugins tab's card list. The tab dispatches its slot by settings namespace, so what it renders is the intersection of two ledgers: the namespaces the Host serves and the cards registered into settings.plugin.item. A served namespace no card...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/client/web-search-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/web-search-card-controller.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：交互控制器
- 这个文件有什么用：它把浏览器端、用户界面、Web 界面的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。
- 为什么这样设计：把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。
- 文件级设计证据：源码顶部注释把它定位为“The web-search card's staged form over the web-search-deepseek settings namespace. The key is the one control that does not live in the section: its literal never rides a response, so the card learns only whether one is configured and writes it through the ...”；固定提交中扫描到的声明包括 `WEB_SEARCH_NS`、`WebSearchSettings`、`WebSearchCardState`、`WebSearchCardFace`、`WebSearchCardController`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugins/src/client/card-form.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/card-form.ts)、[packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx)
- 对应测试：[packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)、[packages/client/ui-settings-plugins/tests/stores.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/stores.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-plugins/src/client/card-form.ts` 和 `packages/client/ui-settings-plugins/src/client/WebSearchCard.tsx`、`packages/client/ui-settings-plugins/src/client/index.ts`、`packages/client/ui-settings-plugins/tests/section.client.spec.tsx` 确认输入输出，最后对照 `packages/client/ui-settings-plugins/tests/section.client.spec.tsx`、`packages/client/ui-settings-plugins/tests/stores.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 192 行；扫描到的声明包括 `WEB_SEARCH_NS`、`WebSearchSettings`、`WebSearchCardState`、`WebSearchCardFace`、`WebSearchCardController`、`refOf`；源码顶部原注释（英文，仅作回查线索）：The web-search card's staged form over the web-search-deepseek settings namespace. The key is the one control that does not live in the section: its literal never rides a response, so the card learns only whether one is configured and writes it through the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-settings-plugins/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Plugins settings surface, node half. The empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half owns the section and its configurable tab through exports"./client", discovered from the package.json dsh.client declaration....”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings-plugins/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings-plugins/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 11 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Plugins settings surface, node half. The empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half owns the section and its configurable tab through exports"./client", discovered from the package.json dsh.client declaration....。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings-plugins. @module @deepseek-ai/dsh-client-ui-settings-plugins/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-settings-plugins/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings-plugins/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-settings-plugins/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-settings-plugins/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings-plugins. @module @deepseek-ai/dsh-client-ui-settings-plugins/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-settings-plugins apply”、“declares the services it uses”、“registers one Plugins section and declares the tab and card slots”、“injects a live tab projection, the card directory, and one business face per card”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-settings-plugins apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“What the browser half registers, and that it all leaves with the fiber.”；固定提交中扫描到的声明包括 `bench`、`declareRoot`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugins/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-plugins/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 223 行；扫描到的声明包括 `bench`、`declareRoot`；扫描到的测试主题包括 “ui-settings-plugins apply”、“declares the services it uses”、“registers one Plugins section and declares the tab and card slots”、“injects a live tab projection, the card directory, and one business face per card”、“keys each card it ships on the settings namespace that card edits”、“dispatches the served namespaces its cards claim, and no others”；源码顶部原注释（英文，仅作回查线索）：What the browser half registers, and that it all leaves with the fiber.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/tests/fields.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/fields.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ValueField”、“stages every keystroke without writing”、“renders the staged text it is given rather than a draft of its own”、“offers the reset only while an override would stand”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ValueField”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/fields.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/fields.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-plugins/src/client/fields.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的测试主题包括 “ValueField”、“stages every keystroke without writing”、“renders the staged text it is given rather than a draft of its own”、“offers the reset only while an override would stand”、“replaces the hint with the reason an invalid draft cannot be saved”、“hints a numeric keypad and renders a placeholder when asked”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“reserves package ownership with an empty installer”、“has an empty node half”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The package's node half: an empty host body and an explained empty invariant companion.”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/index.ts)、[packages/client/ui-settings-plugins/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-plugins/src/index.ts`、`packages/client/ui-settings-plugins/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的测试主题包括 “invariant companion”、“reserves package ownership with an empty installer”、“has an empty node half”；源码顶部原注释（英文，仅作回查线索）：The package's node half: an empty host body and an explained empty invariant companion.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/section.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“PluginsSettingsSection”、“says so when no plugin contributed a tab”、“defaults to the first ordered tab and mounts another only after selection”、“leads with its own heading and intro”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“PluginsSettingsSection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `field`、`cardActions`、`renderSection`、`renderConfigurable`、`renderBash`；本地静态 import 图显示它直接依赖 13 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx)、[packages/client/ui-settings-plugins/src/client/BashCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/BashCard.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings-plugins/src/client/AgentLoopCard.tsx`、`packages/client/ui-settings-plugins/src/client/BashCard.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 419 行；扫描到的声明包括 `field`、`cardActions`、`renderSection`、`renderConfigurable`、`renderBash`、`renderWebSearch`；扫描到的测试主题包括 “PluginsSettingsSection”、“says so when no plugin contributed a tab”、“defaults to the first ordered tab and mounts another only after selection”、“leads with its own heading and intro”、“moves focus and selection with standard horizontal tab keys”、“ConfigurablePluginsTab”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/tests/stores.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tests/stores.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、状态存储的具体场景，包括“CardForm”、“shows the effective value and stays clean until something is staged”、“marks a field the user layer carries as overridden”、“writes nothing until the form is saved”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“CardForm”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The staged card form: what a draft shows before it is written, which wire call a save reaches, and what happens to drafts the Host did not accept.”；固定提交中扫描到的声明包括 `acceptWrites`、`credentialsApi`、`form`、`settingsApi`、`ledger`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts)、[packages/client/ui-settings-plugins/src/client/bash-card-controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/bash-card-controller.ts)、[packages/client/ui-settings-plugins/src/client/card-form.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/src/client/card-form.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings-plugins/src/client/agent-loop-card-controller.ts`、`packages/client/ui-settings-plugins/src/client/bash-card-controller.ts`、`packages/client/ui-settings-plugins/src/client/card-form.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 687 行；扫描到的声明包括 `acceptWrites`、`credentialsApi`、`form`、`settingsApi`、`ledger`；扫描到的测试主题包括 “CardForm”、“shows the effective value and stays clean until something is staged”、“marks a field the user layer carries as overridden”、“writes nothing until the form is saved”、“drops a draft that settles back on the value already shown”、“refuses to save while a draft is not a value the field accepts”；源码顶部原注释（英文，仅作回查线索）：The staged card form: what a draft shows before it is written, which wire call a save reaches, and what happens to drafts the Host did not accept.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings-plugins/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings-plugins/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-plugins/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings-plugins/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

