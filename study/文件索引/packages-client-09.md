# 源文件索引：packages/client（第 9/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 9 部分，覆盖：packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/ui-settings

### [packages/client/ui-settings/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/contract/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“Settings slot contract — the canonical home of every settings slot type, owned by the settings domain base rather than by the shell that renders them (ui-settings-general, which occupies sidebar.settings). The shell has zero copy of its own: ALL text (trigg...”；固定提交中扫描到的声明包括 `SettingsGeneralItemOwnerProps`、`SettingsPluginsTabOwnerProps`、`SettingsTriggerOwnerProps`、`SettingsHeaderOwnerProps`、`SettingsSectionOwnerProps`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings/src/client/index.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 135 行；扫描到的声明包括 `SettingsGeneralItemOwnerProps`、`SettingsPluginsTabOwnerProps`、`SettingsTriggerOwnerProps`、`SettingsHeaderOwnerProps`、`SettingsSectionOwnerProps`、`SettingsOnboardingOwnerProps`；源码顶部原注释（英文，仅作回查线索）：Settings slot contract — the canonical home of every settings slot type, owned by the settings domain base rather than by the shell that renders them (ui-settings-general, which occupies sidebar.settings). The shell has zero copy of its own: ALL text (trigg...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Settings domain base plugin, browser half. Provides ctx.settingsScope, the settings-namespace scope service every preference row binds its durable section through, and owns the one settings.describe reader in the browser: the describe mirror, whose invalida...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 8 个源文件，并被 28 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/api/remotes/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/types.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts)、[packages/client/ui-settings-general/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/apply.client.spec.ts)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/src/client/LanguageRow.tsx`、`packages/client/locale/src/client/index.ts`、`packages/client/locale/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/ui-agent-preset/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 69 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Settings domain base plugin, browser half. Provides ctx.settingsScope, the settings-namespace scope service every preference row binds its durable section through, and owns the one settings.describe reader in the browser: the describe mirror, whose invalida...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/client/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/schema.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义浏览器端、用户界面、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Synchronous schema introspection and immutable settings-draft edits.”；固定提交中扫描到的声明包括 `SchemaNode`、`SettingsSchemaService`、`cloneContainer`、`cloneSpine`；本地静态 import 图显示它直接依赖 2 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx)、[packages/client/ui-permission-presets/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/settings-store.client.spec.ts)
- 对应测试：[packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx)、[packages/client/ui-permission-presets/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/settings-store.client.spec.ts)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-store.client.spec.ts)、[packages/client/ui-settings/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/plugin.client.spec.ts)、[packages/client/ui-settings/tests/schema.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/schema.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings/README.md`，再读本配置/脚本，沿着 `packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx`、`packages/client/ui-permission-presets/tests/settings-store.client.spec.ts`、`packages/client/ui-settings-models/tests/settings-schema.client.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 158 行；扫描到的声明包括 `SchemaNode`、`SettingsSchemaService`、`cloneContainer`、`cloneSpine`；源码顶部原注释（英文，仅作回查线索）：Synchronous schema introspection and immutable settings-draft edits.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/client/settings-mirror.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/settings-mirror.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Client mirror of the Host settings document: the one settings.describe reader in the browser. Every settings consumer derives from this store — per-namespace scopes through SettingsScopeBinder.bind, cross-namespace surfaces through the binder's shared descr...”；固定提交中扫描到的声明包括 `SettingsDescribeView`、`SettingsMirrorSnapshot`、`SettingsDescribeFace`、`SettingsDescribeMirror`；本地静态 import 图显示它直接依赖 2 个源文件，并被 16 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/settings-store.client.spec.ts)、[packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx)
- 对应测试：[packages/client/ui-agent-preset/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/settings-store.client.spec.ts)、[packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx)、[packages/client/ui-permission-presets/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/settings-store.client.spec.ts)、[packages/client/ui-settings-general/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/components.client.spec.tsx)、[packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-document-store.client.spec.ts)、[packages/client/ui-settings-models/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-settings-models/tests/settings-schema.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/settings-schema.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/tests/settings-store.client.spec.ts`、`packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx`、`packages/client/ui-permission-presets/tests/settings-store.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/settings-store.client.spec.ts`、`packages/client/ui-permission-presets/tests/permission-presets-row.client.spec.tsx`、`packages/client/ui-permission-presets/tests/settings-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 213 行；扫描到的声明包括 `SettingsDescribeView`、`SettingsMirrorSnapshot`、`SettingsDescribeFace`、`SettingsDescribeMirror`；源码顶部原注释（英文，仅作回查线索）：Client mirror of the Host settings document: the one settings.describe reader in the browser. Every settings consumer derives from this store — per-namespace scopes through SettingsScopeBinder.bind, cross-namespace surfaces through the binder's shared descr...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/client/settings-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/settings-scope.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Host transport for the settings-namespace scope contract. The contract types live in dsh-client-runtime (the common dependency of every feature that owns a preference); this file owns the per-namespace derivation over the shared SettingsDescribeMirror and t...”；固定提交中扫描到的声明包括 `SettingsScopeController`、`SettingsScopeBinder`；本地静态 import 图显示它直接依赖 7 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/api/remotes/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/types.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)
- 对应测试：[packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx)、[packages/client/ui-settings-models/tests/welcome-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-models/tests/welcome-store.client.spec.ts)、[packages/client/ui-settings/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/plugin.client.spec.ts)、[packages/client/ui-settings/tests/settings-scope.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/settings-scope.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`、`packages/client/ui-settings-models/tests/welcome-store.client.spec.ts`、`packages/client/ui-settings/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-settings-models/tests/welcome-notice.client.spec.tsx`、`packages/client/ui-settings-models/tests/welcome-store.client.spec.ts`、`packages/client/ui-settings/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 293 行；扫描到的声明包括 `SettingsScopeController`、`SettingsScopeBinder`；源码顶部原注释（英文，仅作回查线索）：Host transport for the settings-namespace scope contract. The contract types live in dsh-client-runtime (the common dependency of every feature that owns a preference); this file owns the per-namespace derivation over the shared SettingsDescribeMirror and t...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-settings/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser implementation exported from ./client.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/client/ui-settings/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-settings/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-settings/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-settings/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser implementation exported from ./client.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings. @module @deepseek-ai/dsh-client-ui-settings/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-settings/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-settings/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-settings/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-settings/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-settings. @module @deepseek-ai/dsh-client-ui-settings/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/client/ui-settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/index.ts)、[packages/client/ui-settings/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings/src/index.ts`、`packages/client/ui-settings/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“settings domain base plugin”、“mounts the scope service under settingsScope and reads once eagerly”、“refreshes the mirror on document commits and connection resets, once each”、“fiber disposal retires the service and its invalidation subscriptions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“settings domain base plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The settings domain base plugin's own mounting behavior: it stands up ctx.settingsScope over one shared describe mirror, keeps that mirror fresh on settings-document and connection-reset invalidations, and retires both the service and the subscriptions with...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-settings/src/client/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/schema.ts)、[packages/client/ui-settings/src/client/settings-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/settings-scope.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings/src/client/index.ts`、`packages/client/ui-settings/src/client/schema.ts`、`packages/client/ui-settings/src/client/settings-scope.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “settings domain base plugin”、“mounts the scope service under settingsScope and reads once eagerly”、“refreshes the mirror on document commits and connection resets, once each”、“fiber disposal retires the service and its invalidation subscriptions”；源码顶部原注释（英文，仅作回查线索）：The settings domain base plugin's own mounting behavior: it stands up ctx.settingsScope over one shared describe mirror, keeps that mirror fresh on settings-document and connection-reset invalidations, and retires both the service and the subscriptions with...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/tests/schema.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/schema.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、数据 schema的具体场景，包括“SettingsSchemaService validation”、“rehydrates a serialized envelope into a working validator”、“stringifies non-Error validation throws”、“SettingsSchemaService path operations”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SettingsSchemaService validation”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/client/ui-settings/src/client/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/schema.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-settings/src/client/schema.ts`、`vendor/cordis/src/index.ts`、`vendor/schemastery/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的测试主题包括 “SettingsSchemaService validation”、“rehydrates a serialized envelope into a working validator”、“stringifies non-Error validation throws”、“SettingsSchemaService path operations”、“reads nested object and array paths”、“reports presence by key existence rather than value truthiness”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/tests/settings-mirror.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/settings-mirror.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“SettingsDescribeMirror”、“folds loads before the wire read into it, and mid-flight loads into one rerun”、“keeps the last good view when a later refresh fails, recording the failure”、“returns to idle after a first read that never succeeded, so ensure retries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SettingsDescribeMirror”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ok`、`rejected`、`view`、`described`、`deferred`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-settings/src/client/settings-mirror.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/settings-mirror.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-settings/src/client/settings-mirror.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 216 行；扫描到的声明包括 `ok`、`rejected`、`view`、`described`、`deferred`；扫描到的测试主题包括 “SettingsDescribeMirror”、“folds loads before the wire read into it, and mid-flight loads into one rerun”、“keeps the last good view when a later refresh fails, recording the failure”、“returns to idle after a first read that never succeeded, so ensure retries”、“treats ensure as a no-op once ready”、“memory persistence is terminally unavailable and never touches the wire”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/tests/settings-scope.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tests/settings-scope.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“SettingsScopeController”、“starts loading and derives a schema-valid section with revision and writability”、“keeps the last good value across invalid, rejected, and failed reads while tracking rev...”、“treats a schema envelope it cannot rehydrate as vouching for no section”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SettingsScopeController”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `ok`、`rejected`、`view`、`described`、`deferred`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings/src/client/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/schema.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings/src/client/schema.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 475 行；扫描到的声明包括 `ok`、`rejected`、`view`、`described`、`deferred`、`derivedScope`、`trackValues`；扫描到的测试主题包括 “SettingsScopeController”、“starts loading and derives a schema-valid section with revision and writability”、“keeps the last good value across invalid, rejected, and failed reads while tracking revisions”、“treats a schema envelope it cannot rehydrate as vouching for no section”、“reports an unexposed namespace as unavailable and recovers when it reappears”、“applies a custom decode override in place of the wire schema”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-settings/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-settings/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-settings/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-sidebar

### [packages/client/ui-sidebar/src/client/SidebarRoot.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `SidebarRoot` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `SidebarRoot` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Sidebar column (figma 133:7629): vertical stack, padding 12/6, sidebar fill + 1px right border painted by the layout column. Collapse is a slide + crossfade, not a morph: the content holds its frozen expanded layout (inline width set by the component) and f...”；固定提交中扫描到的声明包括 `whenever`；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.collapsed、.quietBars、.wide、.iconButton、.newSession；自定义属性 --dsh-sidebar-inline-padding、--dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-sidebar/src/client/SidebarRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-settings-general/tests/settings-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/settings-root.client.spec.tsx)、[packages/client/ui-settings-general/tests/shell.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings-general/tests/shell.client.spec.ts)、[packages/client/ui-sidebar/tests/apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/apply.client.spec.tsx)、[packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx)、[packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-sidebar/src/client/SidebarRoot.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-settings-general/tests/settings-root.client.spec.tsx`、`packages/client/ui-settings-general/tests/shell.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 339 行；扫描到的声明包括 `whenever`；样式结构包含选择器 .root、.collapsed、.quietBars、.wide、.iconButton、.newSession；自定义属性 --dsh-sidebar-inline-padding、--dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Sidebar column (figma 133:7629): vertical stack, padding 12/6, sidebar fill + 1px right border painted by the layout column. Collapse is a slide + crossfade, not a morph: the content holds its frozen expanded layout (inline width set by the component) and f...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/client/SidebarRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `SidebarRoot` 的界面组件或交互逻辑，并导出 `SidebarRoot`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Sidebar shell: column geometry only. Collapse is a slide plus crossfade: content freezes at its expanded width (inline style) and fades out in place while the sliding column (AppFrame grid tracks) clips it — nothing reflows mid-slide. At settle the wide-onl...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Sidebar shell: column geometry only. Collapse is a slide plus crossfade: content freezes at its expanded width (inline style) and fades out in place while the sliding column (AppFrame grid tracks) clips it — nothing reflows mid-slide. At settle the wide-onl...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Sidebar shell: column geometry only. Collapse is a slide plus crossfade: content freezes at its expanded width (inline style) and fades out in place while the sliding column (AppFrame grid tracks) clips it — nothing reflows mid-slide. At settle the wide-onl...”；固定提交中扫描到的声明包括 `SidebarRoot`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-sidebar/src/client/SidebarRoot.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.module.css)、[packages/client/ui-sidebar/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/contract/slots.ts)、[packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)
- 对应测试：[packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx)、[packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-sidebar/src/client/index.ts`、`packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx`、`packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx`、`packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 210 行；扫描到的声明包括 `SidebarRoot`；源码顶部原注释（英文，仅作回查线索）：Sidebar shell: column geometry only. Collapse is a slide plus crossfade: content freezes at its expanded width (inline style) and fades out in place while the sliding column (AppFrame grid tracks) clips it — nothing reflows mid-slide. At settle the wide-onl...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/contract/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“Sidebar slot contract: the registrant-side props composition for the layout-owned sidebar slot, plus the holes this shell declares. The shell owns column geometry (fold state machine, brand row, New Session); everything between the section header and the li...”；固定提交中扫描到的声明包括 `SidebarBrandMarkOwnerProps`、`SidebarBrandNameOwnerProps`、`SidebarSectionOwnerProps`、`SidebarSettingsOwnerProps`、`SidebarFooterActionOwnerProps`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-sidebar/src/client/SidebarRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.tsx)
- 对应测试：[packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx)、[packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-sidebar/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-sidebar/src/client/SidebarRoot.tsx`、`packages/client/ui-sidebar/src/client/index.ts`、`packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx`、`packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 118 行；扫描到的声明包括 `SidebarBrandMarkOwnerProps`、`SidebarBrandNameOwnerProps`、`SidebarSectionOwnerProps`、`SidebarSettingsOwnerProps`、`SidebarFooterActionOwnerProps`、`SidebarRootInjected`、`SidebarRootComponentProps`；源码顶部原注释（英文，仅作回查线索）：Sidebar slot contract: the registrant-side props composition for the layout-owned sidebar slot, plus the holes this shell declares. The shell owns column geometry (fold state machine, brand row, New Session); everything between the section header and the li...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Registers the sidebar shell into the layout-owned slot.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 5 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-sidebar/src/client/SidebarRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.tsx)、[packages/client/ui-brand-official/src/client/Brand.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/Brand.tsx)
- 对应测试：[packages/client/ui-sidebar/tests/apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/apply.client.spec.tsx)、[packages/client/ui-sidebar/tests/sidebar-snapshot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-snapshot.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-sidebar/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-brand-official/src/client/Brand.tsx`、`packages/client/ui-brand-official/src/client/index.ts`、`packages/client/ui-settings-general/src/client/shell-contract.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-sidebar/tests/apply.client.spec.tsx`、`packages/client/ui-sidebar/tests/sidebar-snapshot.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Registers the sidebar shell into the layout-owned slot.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“sidebar namespace dictionaries: shell controls (brand row, New Session, fold toggle).”；固定提交中扫描到的声明包括 `zh`、`SidebarKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)、[packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx)、[packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx)
- 对应测试：[packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx)、[packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-sidebar/src/client/index.ts`、`packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx`、`packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx`、`packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `zh`、`SidebarKey`、`en`；源码顶部原注释（英文，仅作回查线索）：sidebar namespace dictionaries: shell controls (brand row, New Session, fold toggle).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-sidebar/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-sidebar/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser-only sidebar plugin.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-sidebar/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-sidebar/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-sidebar/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-sidebar/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-sidebar/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser-only sidebar plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-sidebar. @module @deepseek-ai/dsh-client-ui-sidebar/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-sidebar/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-sidebar/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-sidebar/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-sidebar/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-sidebar. @module @deepseek-ai/dsh-client-ui-sidebar/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/apply.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-sidebar apply”、“declares only the services it uses”、“registers the shell and declares its child seats”、“fails when no live owner declared the sidebar slot”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-sidebar apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Sidebar shell slot registration and its plain runtime/layout callbacks.”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-sidebar/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “ui-sidebar apply”、“declares only the services it uses”、“registers the shell and declares its child seats”、“fails when no live owner declared the sidebar slot”、“removes the entry and child declaration on teardown”；源码顶部原注释（英文，仅作回查线索）：Sidebar shell slot registration and its plain runtime/layout callbacks.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-sidebar/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/index.ts)、[packages/client/ui-sidebar/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-sidebar/src/index.ts`、`packages/client/ui-sidebar/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/pointer-scrollbars.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“SidebarRoot pointer-revealed scrollbars”、“draws them only while the pointer is inside, and lingers on the way out”、“cancels a pending hide when the pointer comes back”、“hides when the pointer moves outside the column box without leaving its subtree”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SidebarRoot pointer-revealed scrollbars”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `mountColumn`、`movePointer`、`movePointerOverDocument`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-sidebar/src/client/SidebarRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.tsx)、[packages/client/ui-sidebar/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/contract/slots.ts)、[packages/client/ui-sidebar/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-sidebar/src/client/SidebarRoot.tsx`、`packages/client/ui-sidebar/src/client/contract/slots.ts`、`packages/client/ui-sidebar/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 157 行；扫描到的声明包括 `mountColumn`、`movePointer`、`movePointerOverDocument`；扫描到的测试主题包括 “SidebarRoot pointer-revealed scrollbars”、“draws them only while the pointer is inside, and lingers on the way out”、“cancels a pending hide when the pointer comes back”、“hides when the pointer moves outside the column box without leaving its subtree”、“does not restart the window when the pointer keeps moving outside”、“keeps them drawn while the pointer moves inside the column box”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/scrollbar-quiet-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/scrollbar-quiet-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“SidebarRoot.module.css quiet column”、“rebinds the ui-theme indirection pair to transparent”、“leaves the gutter reservation to the scrolling region”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SidebarRoot.module.css quiet column”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The quiet-column rule as CSS text: the state SidebarRoot toggles (pointer-scrollbars.spec.tsx) hides a scrollbar only through this rule, and ui-theme's gate checks the rebinding contract's shape without knowing which sheet states which half.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的测试主题包括 “SidebarRoot.module.css quiet column”、“rebinds the ui-theme indirection pair to transparent”、“leaves the gutter reservation to the scrolling region”；源码顶部原注释（英文，仅作回查线索）：The quiet-column rule as CSS text: the state SidebarRoot toggles (pointer-scrollbars.spec.tsx) hides a scrollbar only through this rule, and ui-theme's gate checks the rebinding contract's shape without knowing which sheet states which half.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-root.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、根目录的具体场景，包括“SidebarRoot shell”、“routes New Session (capsule + wordmark) and the column toggle”、“renders generic brand fallbacks when no package fills the slots”、“hands the region its wide flag and clamps expandSidebar to the collapsed state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SidebarRoot shell”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `mountShell`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/ui-sidebar/src/client/SidebarRoot.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/SidebarRoot.tsx)、[packages/client/ui-sidebar/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/contract/slots.ts)、[packages/client/ui-sidebar/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-sidebar/src/client/SidebarRoot.tsx`、`packages/client/ui-sidebar/src/client/contract/slots.ts`、`packages/client/ui-sidebar/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `mountShell`；扫描到的测试主题包括 “SidebarRoot shell”、“routes New Session (capsule + wordmark) and the column toggle”、“renders generic brand fallbacks when no package fills the slots”、“hands the region its wide flag and clamps expandSidebar to the collapsed state”、“keeps the region mounted through collapse and expands on its request”、“renders statically collapsed on a cold start (no crossfade classes)”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/sidebar-snapshot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-snapshot.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“sidebar shell snapshots”、“renders the expanded column in the default locale (zh, no setLocale)”、“renders the expanded column (wordmark, capsule, empty holes)”、“renders the collapsed rail after the crossfade settles, in place”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“sidebar shell snapshots”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/ui-sidebar/src/client/index.ts`、`packages/test-support/client-runtime/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “sidebar shell snapshots”、“renders the expanded column in the default locale (zh, no setLocale)”、“renders the expanded column (wordmark, capsule, empty holes)”、“renders the collapsed rail after the crossfade settles, in place”、“a locale switch refreshes mounted copy without re-registration”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tests/sidebar-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tests/sidebar-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“SidebarRoot.module.css”、“shares and cancels the wide shell trailing padding structurally”、“moves the four upper controls while the settings seat only fades”、“gives shell rail controls the same base anchor for their shared translation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SidebarRoot.module.css”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Sidebar shell style contracts shared with its slot-owned controls.”；固定提交中扫描到的声明包括 `declarations`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `declarations`；扫描到的测试主题包括 “SidebarRoot.module.css”、“shares and cancels the wide shell trailing padding structurally”、“moves the four upper controls while the settings seat only fades”、“gives shell rail controls the same base anchor for their shared translation”、“keeps the slotted brand row at the full artwork height”；源码顶部原注释（英文，仅作回查线索）：Sidebar shell style contracts shared with its slot-owned controls.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-sidebar/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-sidebar/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-sidebar/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-skill

### [packages/client/ui-skill/src/client/SkillRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `SkillRow` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `SkillRow` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Skill toolview: Bash-matched summary row plus a bounded instructions disclosure.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .card、.row、.leading、.chevron、.iconIdle、.chevronHover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/client/ui-skill/src/client/SkillRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-skill/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/browser-plugin.client.spec.ts)、[packages/client/ui-skill/tests/skill-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/skill-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-skill/src/client/SkillRow.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-skill/tests/browser-plugin.client.spec.ts`、`packages/client/ui-skill/tests/skill-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 212 行；样式结构包含选择器 .card、.row、.leading、.chevron、.iconIdle、.chevronHover；源码顶部原注释（英文，仅作回查线索）：Skill toolview: Bash-matched summary row plus a bounded instructions disclosure.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/src/client/SkillRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `SkillRow` 的界面组件或交互逻辑，并导出 `SkillRow`、`firstLine`、`skillName`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Skill toolview registrant: a domain-owned row over the keyed toolview hole. The compact accent row keeps loaded instructions scannable in the transcript; the exact durable tool output remains available in a bounded disclosure card.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Skill toolview registrant: a domain-owned row over the keyed toolview hole. The compact accent row keeps loaded instructions scannable in the transcript; the exact durable tool output remains available in a bounded disclosure card.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Skill toolview registrant: a domain-owned row over the keyed toolview hole. The compact accent row keeps loaded instructions scannable in the transcript; the exact durable tool output remains available in a bounded disclosure card.”；固定提交中扫描到的声明包括 `SkillRow`、`firstLine`、`skillName`、`resultText`、`skillRowModel`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-skill/src/client/SkillRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.module.css)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-skill/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/index.ts)
- 对应测试：[packages/client/ui-skill/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/browser-plugin.client.spec.ts)、[packages/client/ui-skill/tests/skill-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/skill-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-skill/src/client/index.ts`、`packages/client/ui-skill/tests/browser-plugin.client.spec.ts`、`packages/client/ui-skill/tests/skill-row.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-skill/tests/browser-plugin.client.spec.ts`、`packages/client/ui-skill/tests/skill-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的声明包括 `SkillRow`、`firstLine`、`skillName`、`resultText`、`skillRowModel`、`leadingFor`、`disclosureLeading`、`stateStatus`；源码顶部原注释（英文，仅作回查线索）：Skill toolview registrant: a domain-owned row over the keyed toolview hole. The compact accent row keeps loaded instructions scannable in the transcript; the exact durable tool output remains available in a bounded disclosure card.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Skill reference plugin, browser half: registers the '/' skill source — candidates from the skill.list RPC addressed by the per-call session projection's sessionId (sessions are always agent-backed; the host resolves cwd from the session header). A pick land...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-skill/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-skill/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-skill/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-skill/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-skill/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 191 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Skill reference plugin, browser half: registers the '/' skill source — candidates from the skill.list RPC addressed by the per-call session projection's sessionId (sessions are always agent-backed; the host resolves cwd from the session header). A pick land...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“skill namespace dictionaries for the dedicated tool row.”；固定提交中扫描到的声明包括 `NS`、`zh`、`SkillKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/client/ui-skill/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/index.ts)、[packages/client/ui-skill/tests/skill-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/skill-row.client.spec.tsx)
- 对应测试：[packages/client/ui-skill/tests/skill-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/skill-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-skill/src/client/index.ts`、`packages/client/ui-skill/tests/skill-row.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-skill/tests/skill-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `NS`、`zh`、`SkillKey`、`en`；源码顶部原注释（英文，仅作回查线索）：skill namespace dictionaries for the dedicated tool row.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-skill/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-skill/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Skill reference plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-skill/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Skill reference plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-skill. @module @deepseek-ai/dsh-client-ui-skill/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-skill. @module @deepseek-ai/dsh-client-ui-skill/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/browser-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“apply”、“declares the services it binds”、“registers the dedicated skill row and its locale dictionaries”、“registers the”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ui-skill browser half: source and keyed toolview registration + locale dictionaries + source duplicate-name proof + fiber-teardown removal (HMR safety) against the real InputTriggerService, then the source behavior contract driven directly on the captured s...”；固定提交中扫描到的声明包括 `providePresentation`、`bench`、`countingList`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)、[packages/client/ui-skill/src/client/SkillRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/index.ts`、`packages/client/ui-skill/src/client/SkillRow.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 382 行；扫描到的声明包括 `providePresentation`、`bench`、`countingList`；扫描到的测试主题包括 “apply”、“declares the services it binds”、“registers the dedicated skill row and its locale dictionaries”、“registers the”、“candidates: sessionId addressing”、“lists via {sessionId} and filters by startsWith(query)”；源码顶部原注释（英文，仅作回查线索）：ui-skill browser half: source and keyed toolview registration + locale dictionaries + source duplicate-name proof + fiber-teardown removal (HMR safety) against the real InputTriggerService, then the source behavior contract driven directly on the captured s...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/tests/skill-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/skill-row.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“SkillRow”、“renders a compact Bash-shaped summary and discloses the exact instructions”、“supports Enter and Space while ignoring unrelated keys”、“keeps a running call compact and announces its state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SkillRow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Dedicated skill tool row: replay-stable naming, lifecycle states, disclosure, keyboard operation, exact output, and the trajectory Inspect handoff.”；固定提交中扫描到的声明包括 `settled`、`running`、`props`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-skill/src/client/SkillRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-skill/src/client/SkillRow.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 153 行；扫描到的声明包括 `settled`、`running`、`props`；扫描到的测试主题包括 “SkillRow”、“renders a compact Bash-shaped summary and discloses the exact instructions”、“supports Enter and Space while ignoring unrelated keys”、“keeps a running call compact and announces its state”、“uses the first failure line in the summary and exposes the full error”、“renders stopped, structured, and structured-error durable outcomes”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Dedicated skill tool row: replay-stable naming, lifecycle states, disclosure, keyboard operation, exact output, and the trajectory Inspect handoff.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-skill/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-skill/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-skill/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-slots

### [packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、扩展槽位相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Slot registry pure core. Owners declare slot contracts by merging into SlotMap; one register call contributes a component AND (optionally) declares child slots, a store seat, and the registrant's business face. Zero runtime dependencies (React types only). ...”；固定提交中扫描到的声明包括 `SlotMap`、`LocaleNamespaceMap`、`Translate`、`CommonKeyOf`、`LocaleKeysOf`；本地静态 import 图显示它直接依赖 2 个源文件，并被 124 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/renderer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/renderer.ts)、[packages/client/ui-slots/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/store.ts)、[packages/client/locale/src/client/LanguageRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/LanguageRow.tsx)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/slots-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/slots-service.client.spec.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-conversation/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-conversation/tests/chat-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-apply.client.spec.tsx)、[packages/client/ui-conversation/tests/gate-branch-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/gate-branch-tails.client.spec.tsx)、[packages/client/ui-conversation/tests/queue-dock.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/queue-dock.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-snapshot-fixture.client.ts)
- 阅读顺序：先读 `packages/client/ui-slots/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/src/client/LanguageRow.tsx`、`packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/contract/sessions.ts` 看它怎样约束运行时，最后对照 `packages/client/runtime/tests/slots-service.client.spec.ts`、`packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-conversation/tests/assembly-surfaces.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 1192 行；扫描到的声明包括 `SlotMap`、`LocaleNamespaceMap`、`Translate`、`CommonKeyOf`、`LocaleKeysOf`、`TranslateNS`、`LocaleDictOf`、`PropsLocale`；源码顶部原注释（英文，仅作回查线索）：Slot registry pure core. Owners declare slot contracts by merging into SlotMap; one register call contributes a component AND (optionally) declares child slots, a store seat, and the registrant's business face. Zero runtime dependencies (React types only). ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、扩展槽位必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-slots. @module @deepseek-ai/dsh-client-ui-slots/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-slots/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-slots/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-slots/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-slots/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-slots. @module @deepseek-ai/dsh-client-ui-slots/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/src/renderer.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/renderer.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把浏览器端、用户界面、扩展槽位转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 文件级设计证据：源码顶部注释把它定位为“React-free contracts between the slot host and an installed renderer.”；固定提交中扫描到的声明包括 `LocaleFace`、`HostObservable`、`StoreInstanceLike`、`SessionMaybeProvideInfo`、`SessionProvideInfo`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-slots/src/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 207 行；扫描到的声明包括 `LocaleFace`、`HostObservable`、`StoreInstanceLike`、`SessionMaybeProvideInfo`、`SessionProvideInfo`、`RenderOpts`、`SlotRendererHost`、`SlotRenderer`；源码顶部原注释（英文，仅作回查线索）：React-free contracts between the slot host and an installed renderer.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、扩展槽位的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Framework-neutral store contracts for slot registrations and the runtime engine.”；固定提交中扫描到的声明包括 `SnapshotSelectorHook`、`MaybeSnapshotSelectorHook`、`ActionsDecl`、`BakedActions`、`StoreSpec`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/client/ui-slots/src/index.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `SnapshotSelectorHook`、`MaybeSnapshotSelectorHook`、`ActionsDecl`、`BakedActions`、`StoreSpec`、`StoreInstance`、`StoreHandle`、`StoreFactory`；源码顶部原注释（英文，仅作回查线索）：Framework-neutral store contracts for slot registrations and the runtime engine.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/tests/core.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tests/core.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、扩展槽位的具体场景，包括“a-priori root and declaration gate”、“seeds root as single/root at construction”、“throws on registering into an undeclared slot”、“root is single: a second frame registration throws”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“a-priori root and declaration gate”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SlotCore terminal-design behavior: the single register composition API — a-priori 'root', children declaration/authorization, load-time validation, one-axis lifecycle cascade, store scope pinning, subscription API.”；固定提交中扫描到的声明包括 `fakeHandle`、`mountFrame`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 386 行；扫描到的声明包括 `fakeHandle`、`mountFrame`；扫描到的测试主题包括 “a-priori root and declaration gate”、“seeds root as single/root at construction”、“throws on registering into an undeclared slot”、“root is single: a second frame registration throws”、“children declaration makes child slots registerable, with specs recorded”、“duplicate child declaration throws naming the first declarer”；源码顶部原注释（英文，仅作回查线索）：SlotCore terminal-design behavior: the single register composition API — a-priori 'root', children declaration/authorization, load-time validation, one-axis lifecycle cascade, store scope pinning, subscription API.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/tests/dynamic-keys.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tests/dynamic-keys.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、扩展槽位的具体场景，包括“dynamic-key escape hatch”、“specDynamic reads wide-typed specs for string keys; undefined while undeclared”、“spec() narrows by SlotMap key”、“records the parent-declared Slot inject on the runtime spec”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dynamic-key escape hatch”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Dynamic-key escape hatches and untouched-key behavior of the terminal core.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的测试主题包括 “dynamic-key escape hatch”、“specDynamic reads wide-typed specs for string keys; undefined while undeclared”、“spec() narrows by SlotMap key”、“records the parent-declared Slot inject on the runtime spec”、“entries/getVersion on an untouched key return the frozen empty array and 0”、“isLive is false for entries the core never held”；源码顶部原注释（英文，仅作回查线索）：Dynamic-key escape hatches and untouched-key behavior of the terminal core.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、扩展槽位的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-slots/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/tests/type-chain.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tests/type-chain.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、扩展槽位的具体场景，包括“terminal-design type chain”、“holds the positive chain and the compile-time negatives”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“terminal-design type chain”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Terminal-design compile-time samples: the four-share composed register constraint — children spec x SlotMap alignment, renderSlot key-set containment, store share matching, inject face completeness — plus the full positive chain. Bodies with @ts-expect-erro...”；固定提交中扫描到的声明包括 `createPanelStore`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 293 行；扫描到的声明包括 `createPanelStore`；扫描到的测试主题包括 “terminal-design type chain”、“holds the positive chain and the compile-time negatives”；源码顶部原注释（英文，仅作回查线索）：Terminal-design compile-time samples: the four-share composed register constraint — children spec x SlotMap alignment, renderSlot key-set containment, store share matching, inject face completeness — plus the full positive chain. Bodies with @ts-expect-erro...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-slots/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、扩展槽位：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-slots/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-slots/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-subagent

### [packages/client/ui-subagent/src/client/SubagentHeaderLineage.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentHeaderLineage.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `SubagentHeaderLineage` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `SubagentHeaderLineage` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.switcherRoot、.trigger、.switcherTrigger、.ancestorSwitcherTrigger、.switcherTitle；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)、[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 326 行；样式结构包含选择器 .root、.switcherRoot、.trigger、.switcherTrigger、.ancestorSwitcherTrigger、.switcherTitle；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `SubagentHeaderLineage` 的界面组件或交互逻辑，并导出 `SubagentCatalogInjected`、`SubagentHeaderLineageProps`、`SubagentHeaderLineage`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `SubagentCatalogInjected`、`SubagentHeaderLineageProps`、`SubagentHeaderLineage`、`diagnosticReason`、`treeItems`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `SubagentCatalogInjected`、`SubagentHeaderLineageProps`、`SubagentHeaderLineage`、`diagnosticReason`、`treeItems`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-subagent/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/index.ts)
- 对应测试：[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)、[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-subagent/src/client/index.ts`、`packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 853 行；扫描到的声明包括 `SubagentCatalogInjected`、`SubagentHeaderLineageProps`、`SubagentHeaderLineage`、`diagnosticReason`、`treeItems`、`formatTokens`、`tokenTotal`、`activityDuration`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `SubagentReadOnlyComposer` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `SubagentReadOnlyComposer` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .frame；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)、[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 20 行；样式结构包含选择器 .frame。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `SubagentReadOnlyComposer` 的界面组件或交互逻辑，并导出 `SubagentReadOnlyMatch`、`SubagentReadOnlyComposerProps`、`SubagentReadOnlyComposer`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `SubagentReadOnlyMatch`、`SubagentReadOnlyComposerProps`、`SubagentReadOnlyComposer`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `SubagentReadOnlyMatch`、`SubagentReadOnlyComposerProps`、`SubagentReadOnlyComposer`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.module.css)、[packages/client/ui-subagent/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/locales.ts)、[packages/client/ui-subagent/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/index.ts)
- 对应测试：[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)、[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-subagent/src/client/index.ts`、`packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`、`packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `SubagentReadOnlyMatch`、`SubagentReadOnlyComposerProps`、`SubagentReadOnlyComposer`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Web subagent catalog, navigation, and addressed-session composer owner.”；固定提交中扫描到的声明包括 `inject`、`apply`、`selectReadOnlySubagent`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-subagent/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-subagent/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `inject`、`apply`、`selectReadOnlySubagent`；源码顶部原注释（英文，仅作回查线索）：Web subagent catalog, navigation, and addressed-session composer owner.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、子 agent提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“subagent namespace dictionaries.”；固定提交中扫描到的声明包括 `NS`、`zh`、`en`、`SubagentKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx)、[packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx)、[packages/client/ui-subagent/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/index.ts)
- 对应测试：[packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx`、`packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx`、`packages/client/ui-subagent/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 83 行；扫描到的声明包括 `NS`、`zh`、`en`、`SubagentKey`；源码顶部原注释（英文，仅作回查线索）：subagent namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-subagent/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-subagent/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、子 agent相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Subagent reference plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-subagent/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Subagent reference plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、子 agent必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-subagent. @module @deepseek-ai/dsh-client-ui-subagent/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-subagent. @module @deepseek-ai/dsh-client-ui-subagent/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/browser-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、子 agent的具体场景，包括“apply”、“declares the services it binds”、“registers catalog actions and selects read-only subagent composers from session facts”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ui-subagent browser half: catalog actions and read-only composer routing.”；固定提交中扫描到的声明包括 `summary`、`sessionsWith`、`provideSlotFaces`、`fullBench`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `summary`、`sessionsWith`、`provideSlotFaces`、`fullBench`；扫描到的测试主题包括 “apply”、“declares the services it binds”、“registers catalog actions and selects read-only subagent composers from session facts”；源码顶部原注释（英文，仅作回查线索）：ui-subagent browser half: catalog actions and read-only composer routing.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tests/conversation-ui.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、子 agent的具体场景，包括“SubagentHeaderLineage”、“aggregates live descendant activity onto the closed trigger”、“does not aggregate subagents reached through an ordinary fork”、“renders healthy counts, stable rows, diagnostics, and catalog-addressed navigation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SubagentHeaderLineage”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `catalog`、`props`、`useSessions`、`summary`、`hoverCatalog`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx)、[packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-subagent/src/client/SubagentHeaderLineage.tsx`、`packages/client/ui-subagent/src/client/SubagentReadOnlyComposer.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 798 行；扫描到的声明包括 `catalog`、`props`、`useSessions`、`summary`、`hoverCatalog`；扫描到的测试主题包括 “SubagentHeaderLineage”、“aggregates live descendant activity onto the closed trigger”、“does not aggregate subagents reached through an ordinary fork”、“renders healthy counts, stable rows, diagnostics, and catalog-addressed navigation”、“selects singular count keys for one descendant”、“removes the disclosure column from branchless catalog levels”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-subagent/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、子 agent：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-subagent/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-subagent/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-subagent/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-theme

### [packages/client/ui-theme/src/boot-theme.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/boot-theme.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Theme bootstrap row for the browser's pre-plugin interval. Each index render embeds the current durable built-in preference; the browser resolves only system, then writes the same DOM fields ui-layout's ThemePresenter owns after the client plugin tree activ...”；固定提交中扫描到的声明包括 `bootThemeInjection`、`bootThemeScript`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/theme-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/theme-settings.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)、[packages/client/ui-theme/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/index.ts)、[packages/client/ui-theme/tests/boot-theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/boot-theme.client.spec.ts)
- 对应测试：[packages/client/ui-theme/tests/boot-theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/boot-theme.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/index.ts`、`packages/client/ui-theme/tests/boot-theme.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-theme/tests/boot-theme.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `bootThemeInjection`、`bootThemeScript`；源码顶部原注释（英文，仅作回查线索）：Theme bootstrap row for the browser's pre-plugin interval. Each index render embeds the current durable built-in preference; the browser resolves only system, then writes the same DOM fields ui-layout's ThemePresenter owns after the client plugin tree activ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/client/AppearanceRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AppearanceRow` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AppearanceRow` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Appearance row (figma 'Frame 2117131228': title + cube row, column gap 8, pad 16/0, hairline separator; the section column strips it when last).”；固定提交中扫描到的结构线索是：样式结构包含选择器 .group、.title、.cubeRow、.themeCube、.selected；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/AppearanceRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)、[packages/client/ui-theme/tests/theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/theme.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/AppearanceRow.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 57 行；样式结构包含选择器 .group、.title、.cubeRow、.themeCube、.selected；源码顶部原注释（英文，仅作回查线索）：Appearance row (figma 'Frame 2117131228': title + cube row, column gap 8, pad 16/0, hairline separator; the section column strips it when last).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/client/AppearanceRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AppearanceRow` 的界面组件或交互逻辑，并导出 `AppearanceRowInjected`、`AppearanceRowComponentProps`、`AppearanceRow`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Appearance preference row registered into the General section item slot (figma 501:30012 'Frame 2117131228'): title + three preference cubes. Registered by this package — the theme feature owns its own settings surface. Selection follows the persisted prefe...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Appearance preference row registered into the General section item slot (figma 501:30012 'Frame 2117131228'): title + three preference cubes. Registered by this package — the theme feature owns its own settings surface. Selection follows the persisted prefe...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Appearance preference row registered into the General section item slot (figma 501:30012 'Frame 2117131228'): title + three preference cubes. Registered by this package — the theme feature owns its own settings surface. Selection follows the persisted prefe...”；固定提交中扫描到的声明包括 `AppearanceRowInjected`、`AppearanceRowComponentProps`、`AppearanceRow`；本地静态 import 图显示它直接依赖 7 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/index.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`、`packages/client/ui-theme/tests/apply.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-theme/tests/appearance-row.client.spec.tsx`、`packages/client/ui-theme/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `AppearanceRowInjected`、`AppearanceRowComponentProps`、`AppearanceRow`；源码顶部原注释（英文，仅作回查线索）：Appearance preference row registered into the General section item slot (figma 501:30012 'Frame 2117131228'): title + three preference cubes. Registered by this package — the theme feature owns its own settings surface. Selection follows the persisted prefe...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser theme registry over the --dsw-* token stylesheets. The service owns the live theme preference (light/dark/system), resolves system through prefers-color-scheme, and publishes immutable snapshots; it never touches the DOM — ui-layout's presenter cons...”；固定提交中扫描到的声明包括 `SETTINGS_NS`、`ThemeTokens`、`ThemeTokenModes`、`ThemeTokenOverrides`、`ThemeDefinition`；本地静态 import 图显示它直接依赖 10 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)
- 对应测试：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)、[packages/client/ui-theme/tests/theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/theme.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-theme/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-layout/src/client/index.ts`、`packages/client/ui-layout/src/client/theme-presenter.ts`、`packages/client/ui-layout/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 416 行；扫描到的声明包括 `SETTINGS_NS`、`ThemeTokens`、`ThemeTokenModes`、`ThemeTokenOverrides`、`ThemeDefinition`、`ThemeSnapshot`、`ThemeTokenInspection`、`ThemeRuntime`；源码顶部原注释（英文，仅作回查线索）：Browser theme registry over the --dsw-* token stylesheets. The service owns the live theme preference (light/dark/system), resolves system through prefers-color-scheme, and publishes immutable snapshots; it never touches the DOM — ui-layout's presenter cons...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“settings.theme namespace dictionaries (the Appearance row's copy).”；固定提交中扫描到的声明包括 `zh`、`ThemeKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/AppearanceRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.tsx)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx)、[packages/client/ui-conversation/tests/image-labels.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/image-labels.client.spec.tsx)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/skeleton.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/skeleton.client.spec.tsx)、[packages/client/ui-conversation/tests/views-type-chain.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/views-type-chain.client.spec.tsx)、[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/AppearanceRow.tsx`、`packages/client/ui-theme/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx`、`packages/client/ui-conversation/tests/image-labels.client.spec.tsx`、`packages/client/ui-conversation/tests/input-bar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `zh`、`ThemeKey`、`en`；源码顶部原注释（英文，仅作回查线索）：settings.theme namespace dictionaries (the Appearance row's copy).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/settings-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Appearance row slot store: a mirror of the theme service snapshot. The plugin's apply-world change listener is the only writer; the row component reads via props.useStore.”；固定提交中扫描到的声明包括 `AppearanceRowState`、`createAppearanceRowStore`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-theme/src/theme-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/theme-settings.ts)、[packages/client/ui-theme/src/client/AppearanceRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.tsx)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-theme/src/theme-settings.ts` 和 `packages/client/ui-theme/src/client/AppearanceRow.tsx`、`packages/client/ui-theme/src/client/index.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-theme/tests/appearance-row.client.spec.tsx`、`packages/client/ui-theme/tests/apply.client.spec.ts`、`packages/client/ui-theme/tests/settings-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 37 行；扫描到的声明包括 `AppearanceRowState`、`createAppearanceRowStore`；源码顶部原注释（英文，仅作回查线索）：Appearance row slot store: a mirror of the theme service snapshot. The plugin's apply-world change listener is the only writer; the row component reads via props.useStore.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：固定提交中扫描到的声明包括 `installThemeStyles`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/styles/base.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/base.css)、[packages/client/ui-theme/src/styles/design-platform.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/design-platform.css)、[packages/client/ui-theme/src/styles/gradient-shadow-text.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/gradient-shadow-text.css)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：[packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/index.ts`、`packages/client/ui-theme/tests/client-styles.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-theme/tests/client-styles.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `installThemeStyles`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-theme/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-theme/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 11 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host registration for the browser theme preference and pre-plugin palette.”；固定提交中扫描到的声明包括 `apply`、`readPreference`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/boot-theme.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/boot-theme.ts)、[packages/client/ui-theme/src/theme-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/theme-settings.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)、[packages/client/ui-theme/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/host.client.spec.ts)
- 对应测试：[packages/client/ui-theme/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/host.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-theme/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-theme/tests/host.client.spec.ts`、`packages/client/ui-theme/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-theme/tests/host.client.spec.ts`、`packages/client/ui-theme/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `apply`、`readPreference`；源码顶部原注释（英文，仅作回查线索）：Host registration for the browser theme preference and pre-plugin palette.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-theme. @module @deepseek-ai/dsh-client-ui-theme/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-theme/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-theme/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-theme. @module @deepseek-ai/dsh-client-ui-theme/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/styles/base.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/base.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `base` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `base` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Base variables referenced by the token sheets and component CSS but defined upstream (deepsuite theme/global.css) — supplied here so the composite --dsw-font-* variables resolve and motion rides the upstream curve. Code font stack deliberately omits a bare ...”；固定提交中扫描到的结构线索是：样式结构包含自定义属性 --dsw-font-family、--ds-font-family-code、--ds-ease-in-out、--ds-transition-duration、--ds-transition-duration-fast、--ds-transition-duration-slow；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/styles.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 15 行；样式结构包含自定义属性 --dsw-font-family、--ds-font-family-code、--ds-ease-in-out、--ds-transition-duration、--ds-transition-duration-fast、--ds-transition-duration-slow；源码顶部原注释（英文，仅作回查线索）：Base variables referenced by the token sheets and component CSS but defined upstream (deepsuite theme/global.css) — supplied here so the composite --dsw-font-* variables resolve and motion rides the upstream curve. Code font stack deliberately omits a bare ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/styles/design-platform.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/design-platform.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `design-platform` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `design-platform` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Figma font-weight 510 (an SF Pro variable-font weight) always renders as font-weight: 500 in this UI — non-variable webfonts snap intermediate weights unpredictably across platforms.”；固定提交中扫描到的结构线索是：样式结构包含自定义属性 --dsw-static-amber-100、--dsw-static-amber-400、--dsw-static-amber-500、--dsw-static-amber-600、--dsw-static-amber-900、--dsw-static-blue-100；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/styles.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 338 行；样式结构包含自定义属性 --dsw-static-amber-100、--dsw-static-amber-400、--dsw-static-amber-500、--dsw-static-amber-600、--dsw-static-amber-900、--dsw-static-blue-100；源码顶部原注释（英文，仅作回查线索）：Figma font-weight 510 (an SF Pro variable-font weight) always renders as font-weight: 500 in this UI — non-variable webfonts snap intermediate weights unpredictably across platforms.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/styles/gradient-shadow-text.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/gradient-shadow-text.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `gradient-shadow-text` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `gradient-shadow-text` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含自定义属性 --dsw-linear-gradient-think、--dsw-linear-think-select、--dsw-shadow-lv1、--dsw-shadow-lv1-blur、--dsw-shadow-lv2、--dsw-shadow-lv3；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/styles.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 232 行；样式结构包含自定义属性 --dsw-linear-gradient-think、--dsw-linear-think-select、--dsw-shadow-lv1、--dsw-shadow-lv1-blur、--dsw-shadow-lv2、--dsw-shadow-lv3。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/styles/scrollbar.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/scrollbar.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `scrollbar` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `scrollbar` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Scrollbar skin: the sole consumer of the four --dsw-alias-scrollbar-* tokens. Without it every scrolling region renders the UA scrollbar, which ignores the theme — a light native bar over the dark palette. The rules sit on body, not html: design-platform.cs...”；固定提交中扫描到的结构线索是：样式结构包含自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover、--dsh-scrollbar-width；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/styles.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 90 行；样式结构包含自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover、--dsh-scrollbar-width；源码顶部原注释（英文，仅作回查线索）：Scrollbar skin: the sole consumer of the four --dsw-alias-scrollbar-* tokens. Without it every scrolling region renders the UA scrollbar, which ignores the theme — a light native bar over the dark palette. The rules sit on body, not html: design-platform.cs...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/styles/shiki.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/styles/shiki.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `shiki` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `shiki` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Syntax-highlight token palette: the values behind shiki's css-variables theme (--shiki-* custom properties emitted by the ui-primitives CodeBlock). Light values on :root, dark overrides on the body attribute — the same cascade as every other token sheet. Ba...”；固定提交中扫描到的结构线索是：样式结构包含自定义属性 --shiki-foreground、--shiki-background、--shiki-token-constant、--shiki-token-string、--shiki-token-comment、--shiki-token-keyword；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)、[packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)、[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)、[packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/client/styles.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts`、`packages/client/ui-theme/tests/appearance-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 31 行；样式结构包含自定义属性 --shiki-foreground、--shiki-background、--shiki-token-constant、--shiki-token-string、--shiki-token-comment、--shiki-token-keyword；源码顶部原注释（英文，仅作回查线索）：Syntax-highlight token palette: the values behind shiki's css-variables theme (--shiki-* custom properties emitted by the ui-primitives CodeBlock). Light values on :root, dark overrides on the body attribute — the same cascade as every other token sheet. Ba...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/src/theme-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/theme-settings.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Theme preferences stored in the Host user-settings document.”；固定提交中扫描到的声明包括 `THEME_PREFERENCES`、`THEME_SETTINGS_NAMESPACE`、`THEME_PREFERENCE_FIELD`、`ThemePreference`、`DEFAULT_PREFERENCE`；本地静态 import 图显示它直接依赖 1 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/schemastery/src/index.ts)、[packages/client/ui-theme/src/boot-theme.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/boot-theme.ts)、[packages/client/ui-theme/src/client/AppearanceRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.tsx)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：[packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)、[packages/client/ui-theme/tests/boot-theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/boot-theme.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-theme/src/boot-theme.ts`、`packages/client/ui-theme/src/client/AppearanceRow.tsx`、`packages/client/ui-theme/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-theme/tests/apply.client.spec.ts`、`packages/client/ui-theme/tests/boot-theme.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的声明包括 `THEME_PREFERENCES`、`THEME_SETTINGS_NAMESPACE`、`THEME_PREFERENCE_FIELD`、`ThemePreference`、`DEFAULT_PREFERENCE`、`ThemeSettings`、`ThemeSettingsSchema`、`isThemePreference`；源码顶部原注释（英文，仅作回查线索）：Theme preferences stored in the Host user-settings document.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/appearance-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/appearance-row.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“AppearanceRow”、“renders the title and three cubes with the preference cube selected”、“click drives setTheme; selection follows the store mirror, not the click echo”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AppearanceRow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `emptySessions`、`emptyWorkspaces`、`mount`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-theme/src/client/AppearanceRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/AppearanceRow.tsx)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-theme/src/client/AppearanceRow.tsx`、`packages/client/ui-theme/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `emptySessions`、`emptyWorkspaces`、`mount`；扫描到的测试主题包括 “AppearanceRow”、“renders the title and three cubes with the preference cube selected”、“click drives setTheme; selection follows the store mirror, not the click echo”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-theme apply”、“declares the slot and locale services”、“provides the service, registers localized copy, and registers the row (declaration befo...”、“projects service snapshots into the row store and routes face writes back”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-theme apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ui-theme apply wiring: service provision, settings dictionaries riding the locale service, declaration-aware Appearance row registration, snapshot projection into the row store, and HMR collapse recovery.”；固定提交中扫描到的声明包括 `deferred`、`bench`、`declareItems`、`faceOf`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 223 行；扫描到的声明包括 `deferred`、`bench`、`declareItems`、`faceOf`；扫描到的测试主题包括 “ui-theme apply”、“declares the slot and locale services”、“provides the service, registers localized copy, and registers the row (declaration before or after apply)”、“projects service snapshots into the row store and routes face writes back”、“loads Host settings at boot, refreshes its namespace, and keeps remote browsers process-local”、“activates before a slow settings refresh and converges when it settles”；源码顶部原注释（英文，仅作回查线索）：ui-theme apply wiring: service provision, settings dictionaries riding the locale service, declaration-aware Appearance row registration, snapshot projection into the row store, and HMR collapse recovery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/boot-theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/boot-theme.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、启动的具体场景，包括“theme bootstrap row”、“is a body script row, so it runs before the shell mount”、“lets durable light override a dark OS and clears stale dark state”、“defaults to system and falls back to light when matchMedia is unavailable”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“theme bootstrap row”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `mockSystemDark`、`executeBootstrap`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/boot-theme.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/boot-theme.ts)、[packages/client/ui-theme/src/theme-settings.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/theme-settings.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-theme/src/boot-theme.ts`、`packages/client/ui-theme/src/theme-settings.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的声明包括 `mockSystemDark`、`executeBootstrap`；扫描到的测试主题包括 “theme bootstrap row”、“is a body script row, so it runs before the shell mount”、“lets durable light override a dark OS and clears stale dark state”、“defaults to system and falls back to light when matchMedia is unavailable”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/client-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/client-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-theme client styles”、“mounts every global sheet in dependency order and removes them on dispose”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-theme client styles”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/styles.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/styles.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-theme/src/client/styles.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的测试主题包括 “ui-theme client styles”、“mounts every global sheet in dependency order and removes them on dispose”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/host.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/host.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、服务端宿主的具体场景，包括“ui-theme host”、“registers, validates, and disposes the durable theme namespace with its fiber”、“answers each collection with the current durable preference until disposal”、“uses the system preference without a settings provider”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-theme host”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `MemorySettings`、`collect`、`scriptText`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/index.ts)、[packages/host/webserver/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/webserver/src/index.ts)、[packages/settings/settings/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/settings/settings/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-theme/src/index.ts`、`packages/host/webserver/src/index.ts`、`packages/settings/settings/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `MemorySettings`、`collect`、`scriptText`；扫描到的测试主题包括 “ui-theme host”、“registers, validates, and disposes the durable theme namespace with its fiber”、“answers each collection with the current durable preference until disposal”、“uses the system preference without a settings provider”、“falls back to the schema default while the theme namespace holds no section”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”、“node-half waits for optional Host services”、“client apply provides ctx.theme over the slots/locale edges”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-theme/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 44 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”、“node-half waits for optional Host services”、“client apply provides ctx.theme over the slots/locale edges”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/scrollbar-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/scrollbar-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“design-platform.css scrollbar tokens”、“defines the same scrollbar token set in the light and the dark block”、“resolves every scrollbar token to a static scale value, not to another alias”、“scrollbar token consumers”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“design-platform.css scrollbar tokens”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Scrollbar stylesheet contract, asserted against the CSS text on disk: every --dsw-alias-scrollbar-* token design-platform.css defines has a consumer, scrollbar.css binds the base-surface pair through the rebindable indirection, the width variable mirrors th...”；固定提交中扫描到的声明包括 `parseRules`、`atRuleBlock`、`varReferences`、`packageStylesheets`、`tokensRendered`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 594 行；扫描到的声明包括 `parseRules`、`atRuleBlock`、`varReferences`、`packageStylesheets`、`tokensRendered`、`definedTokens`、`elevatedRungs`；扫描到的测试主题包括 “design-platform.css scrollbar tokens”、“defines the same scrollbar token set in the light and the dark block”、“resolves every scrollbar token to a static scale value, not to another alias”、“scrollbar token consumers”、“every defined scrollbar token is referenced by some package stylesheet”、“every referenced scrollbar token is defined in design-platform.css”；源码顶部原注释（英文，仅作回查线索）：Scrollbar stylesheet contract, asserted against the CSS text on disk: every --dsw-alias-scrollbar-* token design-platform.css defines has a consumer, scrollbar.css binds the base-surface pair through the rebindable indirection, the width variable mirrors th...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/settings-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、状态存储的具体场景，包括“createAppearanceRowStore”、“init shape: system preference with revision at -1”、“sync mirrors the preference and advances the revision”、“revision guard drops stale and duplicate writes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createAppearanceRowStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Appearance row store: snapshot-mirror action and the revision guard.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/settings-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-theme/src/client/settings-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的测试主题包括 “createAppearanceRowStore”、“init shape: system preference with revision at -1”、“sync mirrors the preference and advances the revision”、“revision guard drops stale and duplicate writes”；源码顶部原注释（英文，仅作回查线索）：Appearance row store: snapshot-mirror action and the revision guard.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tests/theme.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tests/theme.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ThemeRuntime”、“defaults to the system preference resolved against prefers-color-scheme”、“setTheme switches, writes through the scope, republishes, and keeps DOM untouched”、“adopts a published Host section without writing it back”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ThemeRuntime”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)、[packages/test-support/client-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/test-support/client-runtime/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-theme/src/client/index.ts`、`packages/test-support/client-runtime/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 250 行；扫描到的测试主题包括 “ThemeRuntime”、“defaults to the system preference resolved against prefers-color-scheme”、“setTheme switches, writes through the scope, republishes, and keeps DOM untouched”、“adopts a published Host section without writing it back”、“adopts a section already standing at construction”、“throws on unknown setTheme ids, duplicate registration, and the system id”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-theme/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-theme/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-theme/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

