# 源文件索引：packages/client（第 11/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 11 部分，覆盖：packages/client/ui-workspace（23 条）、packages/client/web（14 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/ui-workspace

### [packages/client/ui-workspace/src/client/WorkspaceBrowser.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `WorkspaceBrowser` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `WorkspaceBrowser` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Workspace browsing region (fills the sidebar shell's hole): section header, search capsule, and the scrolling session list. Wide/rail variants ride the shell's fold state through the wide owner prop — rail state renders only the two 36x36 icon controls.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.rail、.iconButton、.sectionHeader、.sectionLabel、.sectionLabelHidden；自定义属性 --dsh-session-list-edge-inset、--dsh-session-list-scrollbar-width、--dsh-session-list-scrollbar-offset；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)、[packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)、[packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`、`packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`、`packages/client/ui-workspace/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 506 行；样式结构包含选择器 .root、.rail、.iconButton、.sectionHeader、.sectionLabel、.sectionLabelHidden；自定义属性 --dsh-session-list-edge-inset、--dsh-session-list-scrollbar-width、--dsh-session-list-scrollbar-offset；源码顶部原注释（英文，仅作回查线索）：Workspace browsing region (fills the sidebar shell's hole): section header, search capsule, and the scrolling session list. Wide/rail variants ride the shell's fold state through the wide owner prop — rail state renders only the two 36x36 icon controls.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `WorkspaceBrowser` 的界面组件或交互逻辑，并导出 `WorkspaceBrowser`、`sanitizeSearchQuery`、`toggled`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The workspace/session browsing region filling the sidebar shell's sidebar.workspaces hole: section header (title + view options + add workspace), search, the grouped tree or flat list, and the workspace dialogs. Wide state renders the full browser; rail sta...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The workspace/session browsing region filling the sidebar shell's sidebar.workspaces hole: section header (title + view options + add workspace), search, the grouped tree or flat list, and the workspace dialogs. Wide state renders the full browser; rail sta...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The workspace/session browsing region filling the sidebar shell's sidebar.workspaces hole: section header (title + view options + add workspace), search, the grouped tree or flat list, and the workspace dialogs. Wide state renders the full browser; rail sta...”；固定提交中扫描到的声明包括 `WorkspaceBrowser`、`sanitizeSearchQuery`、`toggled`、`useNativeDragAcceptance`、`reconciledSessionOrder`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.module.css)、[packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)
- 对应测试：[packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/index.ts`、`packages/client/ui-workspace/tests/apply.client.spec.ts`、`packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workspace/tests/apply.client.spec.ts`、`packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 1298 行；扫描到的声明包括 `WorkspaceBrowser`、`sanitizeSearchQuery`、`toggled`、`useNativeDragAcceptance`、`reconciledSessionOrder`、`compareSessionRecency`、`nextSessionOrderAccount`、`ViewOptionsMenu`；源码顶部原注释（英文，仅作回查线索）：The workspace/session browsing region filling the sidebar shell's sidebar.workspaces hole: section header (title + view options + add workspace), search, the grouped tree or flat list, and the workspace dialogs. Wide state renders the full browser; rail sta...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/WorkspacePicker.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspacePicker.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `WorkspacePicker` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `WorkspacePicker` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“The adoption error dialog's footer and message styles; the dialog itself is the shared Modal (same figma dialog family as the browser's own dialogs).”；固定提交中扫描到的结构线索是：样式结构包含选择器 .modalAction、.modalError、.menuStatus；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/ui-workspace/src/client/WorkspacePicker.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspacePicker.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)、[packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)、[packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/WorkspacePicker.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`、`packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`、`packages/client/ui-workspace/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 20 行；样式结构包含选择器 .modalAction、.modalError、.menuStatus；源码顶部原注释（英文，仅作回查线索）：The adoption error dialog's footer and message styles; the dialog itself is the shared Modal (same figma dialog family as the browser's own dialogs).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/WorkspacePicker.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspacePicker.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `WorkspacePicker` 的界面组件或交互逻辑，并导出 `WorkspacePickFlowProps`、`WorkspacePickFlow`、`WorkspacePicker`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Workspace pick/add flow. WorkspacePickFlow is the reusable core (menu + path error dialog) consumed directly by WorkspaceBrowser (same package) and wrapped by WorkspacePicker for the conversation empty-state slot registration. Directory picking itself lives...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Workspace pick/add flow. WorkspacePickFlow is the reusable core (menu + path error dialog) consumed directly by WorkspaceBrowser (same package) and wrapped by WorkspacePicker for the conversation empty-state slot registration. Directory picking itself lives...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Workspace pick/add flow. WorkspacePickFlow is the reusable core (menu + path error dialog) consumed directly by WorkspaceBrowser (same package) and wrapped by WorkspacePicker for the conversation empty-state slot registration. Directory picking itself lives...”；固定提交中扫描到的声明包括 `WorkspacePickFlowProps`、`WorkspacePickFlow`、`WorkspacePicker`；本地静态 import 图显示它直接依赖 5 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)
- 对应测试：[packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)、[packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`、`packages/client/ui-workspace/src/client/index.ts`、`packages/client/ui-workspace/tests/apply.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-workspace/tests/apply.client.spec.ts`、`packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 251 行；扫描到的声明包括 `WorkspacePickFlowProps`、`WorkspacePickFlow`、`WorkspacePicker`；源码顶部原注释（英文，仅作回查线索）：Workspace pick/add flow. WorkspacePickFlow is the reusable core (menu + path error dialog) consumed directly by WorkspaceBrowser (same package) and wrapped by WorkspacePicker for the conversation empty-state slot registration. Directory picking itself lives...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/contract/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“ui-workspace contracts. Two registrations share this package: - WorkspaceBrowser fills the sidebar shell's sidebar.workspaces hole — the whole browsing region (section header, search, grouped/flat session list, workspace dialogs). It registers this package'...”；固定提交中扫描到的声明包括 `DirectoryFlowOwnerProps`、`DirectoryFlowSlotName`、`DirectoryPickingInjected`、`DirectoryPickingHooks`、`WorkspaceBrowserInjected`；本地静态 import 图显示它直接依赖 6 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)
- 对应测试：[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-workspace/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`、`packages/client/ui-workspace/src/client/WorkspacePicker.tsx`、`packages/client/ui-workspace/src/client/index.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx`、`packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 171 行；扫描到的声明包括 `DirectoryFlowOwnerProps`、`DirectoryFlowSlotName`、`DirectoryPickingInjected`、`DirectoryPickingHooks`、`WorkspaceBrowserInjected`、`WorkspaceBrowserProps`、`WorkspacePickerInjected`、`WorkspacePickerProps`；源码顶部原注释（英文，仅作回查线索）：ui-workspace contracts. Two registrations share this package: - WorkspaceBrowser fills the sidebar shell's sidebar.workspaces hole — the whole browsing region (section header, search, grouped/flat session list, workspace dialogs). It registers this package'...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Workspace plugin, browser half. Two registrations: WorkspaceBrowser fills the sidebar shell's sidebar.workspaces hole (the whole browsing region), and WorkspacePicker fills the conversation hero's picker hole (conversation.hero.workspace — both hero forms)....”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 9 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-browse/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/flow.ts)
- 对应测试：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)、[packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)、[packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-workspace/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-directory-picker-browse/src/client/flow.ts`、`packages/client/ui-directory-picker-browse/src/client/index.ts`、`packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`、`packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`、`packages/client/ui-workspace/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Workspace plugin, browser half. Two registrations: WorkspaceBrowser fills the sidebar shell's sidebar.workspaces hole (the whole browsing region), and WorkspacePicker fills the conversation hero's picker hole (conversation.hero.workspace — both hero forms)....。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“workspace namespace dictionaries: the browsing region (section header, search, tree rows, dialogs) and the pick/add flow. Runtime failure messages (wire error strings) pass through untranslated by policy.”；固定提交中扫描到的声明包括 `zh`、`WorkspaceKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)、[packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)
- 对应测试：[packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/index.ts`、`packages/client/ui-workspace/tests/rows.client.spec.tsx`、`packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workspace/tests/rows.client.spec.tsx`、`packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx`、`packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 140 行；扫描到的声明包括 `zh`、`WorkspaceKey`、`en`；源码顶部原注释（英文，仅作回查线索）：workspace namespace dictionaries: the browsing region (section header, search, tree rows, dialogs) and the pick/add flow. Runtime failure messages (wire error strings) pass through untranslated by policy.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/rows/Rows.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/rows/Rows.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `Rows` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `Rows` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Tree rows: project 34px, session 32px, radius 8, indent step 22px (16px slot + 6px gap). Hover swaps are pure CSS: project folder -> chevron + action buttons; session time -> ellipsis button.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .projectRow、.sessionRow、.selected、.searchResultRow、.searchResultHeading、.searchResultTitle；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/ui-workspace/src/client/rows/Rows.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/rows/Rows.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)、[packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)、[packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx)、[packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/rows/Rows.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`、`packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`、`packages/client/ui-workspace/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 356 行；样式结构包含选择器 .projectRow、.sessionRow、.selected、.searchResultRow、.searchResultHeading、.searchResultTitle；源码顶部原注释（英文，仅作回查线索）：Tree rows: project 34px, session 32px, radius 8, indent step 22px (16px slot + 6px gap). Hover swaps are pure CSS: project folder -> chevron + action buttons; session time -> ellipsis button.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/rows/Rows.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/rows/Rows.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `Rows` 的界面组件或交互逻辑，并导出 `RowDragProps`、`ProjectRowItem`、`SearchResultItem`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Workspace browser tree row components (figma Cell set 14:3080): pure presentational — all data and callbacks arrive via props. Hover swaps (folder->chevron, time->ellipsis, action buttons) are CSS-only. Row ... menus are visual-only except workspace Rename/...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Workspace browser tree row components (figma Cell set 14:3080): pure presentational — all data and callbacks arrive via props. Hover swaps (folder->chevron, time->ellipsis, action buttons) are CSS-only. Row ... menus are visual-only except workspace Rename/...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Workspace browser tree row components (figma Cell set 14:3080): pure presentational — all data and callbacks arrive via props. Hover swaps (folder->chevron, time->ellipsis, action buttons) are CSS-only. Row ... menus are visual-only except workspace Rename/...”；固定提交中扫描到的声明包括 `RowDragProps`、`ProjectRowItem`、`SearchResultItem`、`SessionNodeItem`、`displayTitle`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-workspace/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/contract/slots.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)
- 对应测试：[packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`、`packages/client/ui-workspace/tests/rows.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workspace/tests/rows.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 484 行；扫描到的声明包括 `RowDragProps`、`ProjectRowItem`、`SearchResultItem`、`SessionNodeItem`、`displayTitle`、`timeLabel`、`hoverTimeLabel`、`createdLabel`；源码顶部原注释（英文，仅作回查线索）：Workspace browser tree row components (figma Cell set 14:3080): pure presentational — all data and callbacks arrive via props. Hover swaps (folder->chevron, time->ellipsis, action buttons) are CSS-only. Row ... menus are visual-only except workspace Rename/...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/stores.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“The workspace browser's viewing store: the session-list grouping mode, persisted across reloads. Module level exports the factory only (a module-level handle would pin the store identity across plugin reloads); register() receives the factory and the browse...”；固定提交中扫描到的声明包括 `FLAT_SESSION_ORDER_KEY`、`SessionGroupBy`、`SessionOrderBy`、`createWorkspaceViewStore`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)、[packages/client/ui-workspace/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/contract/slots.ts)、[packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)
- 对应测试：[packages/client/ui-workspace/tests/tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/tree.client.spec.ts)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts` 和 `packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`、`packages/client/ui-workspace/src/client/contract/slots.ts`、`packages/client/ui-workspace/src/client/index.ts` 理解状态变化，最后对照 `packages/client/ui-workspace/tests/tree.client.spec.ts`、`packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `FLAT_SESSION_ORDER_KEY`、`SessionGroupBy`、`SessionOrderBy`、`createWorkspaceViewStore`；源码顶部原注释（英文，仅作回查线索）：The workspace browser's viewing store: the session-list grouping mode, persisted across reloads. Module level exports the factory only (a module-level handle would pin the store identity across plugin reloads); register() receives the factory and the browse...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/client/tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/tree.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Derives the workspace browser tree from Host Workspace order and membership. Unassigned Sessions trail under Ungrouped; only the selected blank Session remains visible.”；固定提交中扫描到的声明包括 `UNGROUPED_KEY`、`UNGROUPED_LABEL`、`SessionNode`、`SessionOrderBy`、`GroupNode`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)、[packages/client/ui-workspace/src/client/rows/Rows.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/rows/Rows.tsx)、[packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)
- 对应测试：[packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)、[packages/client/ui-workspace/tests/tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/tree.client.spec.ts)、[packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`、`packages/client/ui-workspace/src/client/rows/Rows.tsx`、`packages/client/ui-workspace/tests/rows.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workspace/tests/rows.client.spec.tsx`、`packages/client/ui-workspace/tests/tree.client.spec.ts`、`packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 413 行；扫描到的声明包括 `UNGROUPED_KEY`、`UNGROUPED_LABEL`、`SessionNode`、`SessionOrderBy`、`GroupNode`、`SearchResultNode`、`SearchResultSet`、`TreeView`；源码顶部原注释（英文，仅作回查线索）：Derives the workspace browser tree from Host Workspace order and membership. Unassigned Sessions trail under Ungrouped; only the selected blank Session remains visible.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-workspace/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-workspace/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Workspace picker plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader (load and lifecycle follow the host; the browser half ships via exports"./client", discovered through the package.json dsh.clien...”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/ui-workspace/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-workspace/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-workspace/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-workspace/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-workspace/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Workspace picker plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader (load and lifecycle follow the host; the browser half ships via exports"./client", discovered through the package.json dsh.clien...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-workspace. @module @deepseek-ai/dsh-client-ui-workspace/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-workspace/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-workspace/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-workspace/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-workspace/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-workspace. @module @deepseek-ai/dsh-client-ui-workspace/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-workspace apply”、“declares the services it drives”、“registers browser and pickers for declarations arriving before or after apply”、“routes browser actions and picker creation to the services”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-workspace apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `bench`、`declare`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 169 行；扫描到的声明包括 `bench`、`declare`；扫描到的测试主题包括 “ui-workspace apply”、“declares the services it drives”、“registers browser and pickers for declarations arriving before or after apply”、“routes browser actions and picker creation to the services”、“declares the two directory-flow holes and reports their occupancy per surface”、“rejects the browser search callback on a runtime business error”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/browser-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/browser-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“WorkspaceBrowser.module.css list”、“is the scrolling region”、“counts the themed scrollbar inside the shell trailing inset”、“reserves the scrollbar whether or not the list overflows”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WorkspaceBrowser.module.css list”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“WorkspaceBrowser spacing contract, asserted against the CSS text on disk: row fills share the shell's trailing inset, the stable scrollbar counts inside it, and flat, grouped, and search views keep their intended rhythm.”；固定提交中扫描到的声明包括 `declarationsFrom`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 116 行；扫描到的声明包括 `declarationsFrom`；扫描到的测试主题包括 “WorkspaceBrowser.module.css list”、“is the scrolling region”、“counts the themed scrollbar inside the shell trailing inset”、“reserves the scrollbar whether or not the list overflows”、“keeps 2px between rows and 4px between workspace groups”、“draws drag targets as a leading chevron joined to the insertion line”；源码顶部原注释（英文，仅作回查线索）：WorkspaceBrowser spacing contract, asserted against the CSS text on disk: row fills share the shell's trailing inset, the stable scrollbar counts inside it, and flat, grouped, and search views keep their intended rhythm.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/ui-workspace/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/index.ts)、[packages/client/ui-workspace/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-workspace/src/index.ts`、`packages/client/ui-workspace/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”、“node-half apply is a no-op host placeholder”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rename-assembly.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“session rename through the assembled browser”、“renames via the row menu: binding.session.rename fires, the dialog closes, the row re-l...”、“a rejected rename keeps the dialog open with the error surfaced”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session rename through the assembled browser”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `createRuntime`、`SidebarFrame`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-slots/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 136 行；扫描到的声明包括 `createRuntime`、`SidebarFrame`；扫描到的测试主题包括 “session rename through the assembled browser”、“renames via the row menu: binding.session.rename fires, the dialog closes, the row re-labels from the list”、“a rejected rename keeps the dialog open with the error surfaced”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/rows.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/rows.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“workspace browser rows”、“omits only an empty leading status slot in the hierarchy-free flat list”、“renders a selected content-search row and opens only its session”、“renders an active Workspace and keeps its create action separate from toggling”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“workspace browser rows”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `stubRect`、`dragProps`、`installClipboard`、`fireDrag`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-workspace/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 571 行；扫描到的声明包括 `stubRect`、`dragProps`、`installClipboard`、`fireDrag`；扫描到的测试主题包括 “workspace browser rows”、“omits only an empty leading status slot in the hierarchy-free flat list”、“renders a selected content-search row and opens only its session”、“renders an active Workspace and keeps its create action separate from toggling”、“renders and opens a selected running Session row”、“shows the green done dot only on a finished, unviewed session (live activity wins the slot)”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/tree.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“deriveGroups”、“keeps Host Workspace and sessionIds order without Client recency sorting”、“projects pending-interaction state into grouped and flat rows”、“puts only real unaccounted Sessions in the trailing Ungrouped group”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“deriveGroups”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/stores.ts)、[packages/client/ui-workspace/src/client/tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/tree.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-workspace/src/client/stores.ts`、`packages/client/ui-workspace/src/client/tree.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 450 行；扫描到的测试主题包括 “deriveGroups”、“keeps Host Workspace and sessionIds order without Client recency sorting”、“projects pending-interaction state into grouped and flat rows”、“puts only real unaccounted Sessions in the trailing Ungrouped group”、“applies stored Ungrouped order and appends new loose Sessions by recency”、“shows only the current blank session in its Workspace count and tree”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-browser.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“WorkspaceBrowser”、“workspace hover card shows a POSIX home descendant as ~”、“prunes deleted Workspace view state only after the Workspace baseline is ready”、“renders the grouped tree by default and switches to the flat list via Group by”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WorkspaceBrowser”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `hook`、`fireDrag`、`dragData`、`mount`、`rerender`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1244 行；扫描到的声明包括 `hook`、`fireDrag`、`dragData`、`mount`、`rerender`；扫描到的测试主题包括 “WorkspaceBrowser”、“workspace hover card shows a POSIX home descendant as ~”、“prunes deleted Workspace view state only after the Workspace baseline is ready”、“renders the grouped tree by default and switches to the flat list via Group by”、“persists flat-list drag order locally and applies Last updated within that account”、“expands a group on click and opens a session row”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tests/workspace-picker.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“WorkspacePicker”、“lists same-title Workspaces separately and forwards the selected id”、“opens the composed directory flow, adopts its picked path, and selects the returned Wor...”、“raises the flow straight from the anchor gesture when adding is the only entry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WorkspacePicker”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `workspace`、`hook`、`anchor`、`flowProbe`、`occupancySource`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workspace/src/client/WorkspacePicker.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/WorkspacePicker.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-workspace/src/client/WorkspacePicker.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `workspace`、`hook`、`anchor`、`flowProbe`、`occupancySource`、`mount`、`chooseAdd`；扫描到的测试主题包括 “WorkspacePicker”、“lists same-title Workspaces separately and forwards the selected id”、“opens the composed directory flow, adopts its picked path, and selects the returned Workspace”、“raises the flow straight from the anchor gesture when adding is the only entry”、“treats flow cancellation as a silent no-op”、“reports a non-Error adoption failure in the folder-error surface”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workspace/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workspace/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-workspace/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/web

### [packages/client/web/src/base.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/base.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `base` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `base` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Shell-owned mount defaults. Theme tokens arrive with the ui-theme client plugin before the loader roster activates.”；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/web/src/boot.ts` 确认状态如何进入 UI，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/command-image-envelope.snapshot.ts`、`apps/web/tests/home-path-tilde.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 41 行；源码顶部原注释（英文，仅作回查线索）：Shell-owned mount defaults. Theme tokens arrive with the ui-theme client plugin before the loader roster activates.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/boot-page.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot-page.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义启动（`boot-page`） 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把启动（`boot-page`） 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“The framework-free boot page cannot depend on theme delivery succeeding.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .boot、.card、.wordmark、.hint、.spinner、.failed；自定义属性 --dsh-boot-bg、--dsh-boot-label-primary、--dsh-boot-label-secondary、--dsh-boot-label-tertiary、--dsh-boot-border、--dsh-boot-brand；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/web/src/boot-page.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot-page.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/web/tests/boot-page.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot-page.client.spec.ts)、[packages/client/web/tests/boot.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/web/src/boot-page.ts` 确认状态如何进入 UI，最后对照 `packages/client/web/tests/boot-page.client.spec.ts`、`packages/client/web/tests/boot.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 104 行；样式结构包含选择器 .boot、.card、.wordmark、.hint、.spinner、.failed；自定义属性 --dsh-boot-bg、--dsh-boot-label-primary、--dsh-boot-label-secondary、--dsh-boot-label-tertiary、--dsh-boot-border、--dsh-boot-brand；源码顶部原注释（英文，仅作回查线索）：The framework-free boot page cannot depend on theme delivery succeeding.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/boot-page.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot-page.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Web 宿主运行时
- 这个文件有什么用：这个文件负责 Web 宿主的启动、平台能力或加载状态，把浏览器环境接到客户端插件组合。
- 为什么这样设计：浏览器专属对象和加载时序集中在 Web 宿主，CLI、测试和服务端可以继续复用不依赖 DOM 的运行时。
- 文件级设计证据：源码顶部注释把它定位为“Framework-free boot page and failure report. It remains available when a client plugin fails because React arrives only with the UI renderer. @module @deepseek-ai/dsh-client-web/src/boot-page”；固定提交中扫描到的声明包括 `BootPage`、`div`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/web/src/boot-page.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot-page.module.css)、[packages/client/web/src/loader-status.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/loader-status.ts)、[packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)、[packages/client/web/tests/boot-page.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot-page.client.spec.ts)
- 对应测试：[packages/client/web/tests/boot-page.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot-page.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/web/src/boot.ts`、`packages/client/web/tests/boot-page.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/web/tests/boot-page.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的声明包括 `BootPage`、`div`；源码顶部原注释（英文，仅作回查线索）：Framework-free boot page and failure report. It remains available when a client plugin fails because React arrives only with the UI renderer. @module @deepseek-ai/dsh-client-web/src/boot-page。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Web 宿主运行时
- 这个文件有什么用：这个文件负责 Web 宿主的启动、平台能力或加载状态，把浏览器环境接到客户端插件组合。
- 为什么这样设计：浏览器专属对象和加载时序集中在 Web 宿主，CLI、测试和服务端可以继续复用不依赖 DOM 的运行时。
- 文件级设计证据：源码顶部注释把它定位为“Web boot kernel. It owns only the module system, Cordis loader, and a framework-free boot page. The dynamic UI renderer receives the mount point after every client entry activates. @module @deepseek-ai/dsh-client-web/src/boot”；固定提交中扫描到的声明包括 `BootSeams`、`AppWebEntry`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)、[packages/client/ui-renderer/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-renderer/src/client/index.ts)、[packages/client/web/src/base.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/base.css)、[packages/client/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/index.ts)
- 对应测试：[packages/client/web/tests/boot.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/web/src/index.ts`、`packages/client/web/tests/boot.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/web/tests/boot.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 159 行；扫描到的声明包括 `BootSeams`、`AppWebEntry`；源码顶部原注释（英文，仅作回查线索）：Web boot kernel. It owns only the module system, Cordis loader, and a framework-free boot page. The dynamic UI renderer receives the mount point after every client entry activates. @module @deepseek-ai/dsh-client-web/src/boot。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/web/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/web/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、Web 界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Web shell library entry. The shell's product is AppWebEntry — apps/web's Vite entry runs it against #root. The boot page and fiber-state projection remain internal; the static module table and its platform words form the package's build-time contract. @modu...”；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)、[packages/client/web/src/platform.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/platform.ts)、[packages/client/web/src/seed.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/seed.ts)、[apps/web/src/main.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/src/main.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/web/README.md`、入口和消费者，再读当前契约，沿着 `apps/web/src/main.ts`、`apps/web/tests/assembled-boot.ts` 看它怎样约束运行时，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/command-image-envelope.snapshot.ts`、`apps/web/tests/home-path-tilde.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 11 行；源码顶部原注释（英文，仅作回查线索）：Web shell library entry. The shell's product is AppWebEntry — apps/web's Vite entry runs it against #root. The boot page and fiber-state projection remain internal; the static module table and its platform words form the package's build-time contract. @modu...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、Web 界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-web. @module @deepseek-ai/dsh-client-web/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-web. @module @deepseek-ai/dsh-client-web/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/loader-status.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/loader-status.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Web 宿主运行时
- 这个文件有什么用：这个文件负责 Web 宿主的启动、平台能力或加载状态，把浏览器环境接到客户端插件组合。
- 为什么这样设计：浏览器专属对象和加载时序集中在 Web 宿主，CLI、测试和服务端可以继续复用不依赖 DOM 的运行时。
- 文件级设计证据：源码顶部注释把它定位为“Fiber-state projection vocabulary for the framework-free boot page. The boot chain subscribes to internal/status and projects the owning loader entry's current state. @module @deepseek-ai/dsh-client-web/src/loader-status”；固定提交中扫描到的声明包括 `FIBER_STATE`、`LoaderEntryState`、`STATE_LABELS`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/web/src/boot-page.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot-page.ts)、[packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/web/src/boot-page.ts`、`packages/client/web/src/boot.ts` 确认状态如何进入 UI，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/command-image-envelope.snapshot.ts`、`apps/web/tests/home-path-tilde.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `FIBER_STATE`、`LoaderEntryState`、`STATE_LABELS`；源码顶部原注释（英文，仅作回查线索）：Fiber-state projection vocabulary for the framework-free boot page. The boot chain subscribes to internal/status and projects the owning loader entry's current state. @module @deepseek-ai/dsh-client-web/src/loader-status。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/platform.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/platform.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Web 宿主运行时
- 这个文件有什么用：这个文件负责 Web 宿主的启动、平台能力或加载状态，把浏览器环境接到客户端插件组合。
- 为什么这样设计：浏览器专属对象和加载时序集中在 Web 宿主，CLI、测试和服务端可以继续复用不依赖 DOM 的运行时。
- 文件级设计证据：源码顶部注释把它定位为“Shared browser platform modules. Seeding, bundling externals, and Vite aliases consume this list so their module identities cannot drift. @module @deepseek-ai/dsh-client-web/src/platform”；固定提交中扫描到的声明包括 `PLATFORM_MODULES`、`PRELOADED_CLIENT_EXTERNALS`、`PlatformModule`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)、[packages/client/web/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/index.ts)、[packages/client/web/src/seed.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/seed.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/tsdown.client.ts`、`packages/client/web/src/index.ts`、`packages/client/web/src/seed.ts` 确认状态如何进入 UI，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/command-image-envelope.snapshot.ts`、`apps/web/tests/home-path-tilde.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `PLATFORM_MODULES`、`PRELOADED_CLIENT_EXTERNALS`、`PlatformModule`；源码顶部原注释（英文，仅作回查线索）：Shared browser platform modules. Seeding, bundling externals, and Vite aliases consume this list so their module identities cannot drift. @module @deepseek-ai/dsh-client-web/src/platform。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/src/seed.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/seed.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Web 宿主运行时
- 这个文件有什么用：这个文件负责 Web 宿主的启动、平台能力或加载状态，把浏览器环境接到客户端插件组合。
- 为什么这样设计：浏览器专属对象和加载时序集中在 Web 宿主，CLI、测试和服务端可以继续复用不依赖 DOM 的运行时。
- 文件级设计证据：源码顶部注释把它定位为“Platform-singleton module-table. These are the ONLY entities the shell shares into the frozen module table — fetch bundles resolve their externals against exactly this set through the loader's require. Keys come from the platform constant module (./platform...”；固定提交中扫描到的声明包括 `getStaticModules`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/web/src/platform.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/platform.ts)、[packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/web/tests/built-boot.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/built-boot.snapshot.ts)、[apps/web/tests/command-image-envelope.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/command-image-envelope.snapshot.ts)、[apps/web/tests/home-path-tilde.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/home-path-tilde.snapshot.ts)、[apps/web/tests/image-display.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/image-display.snapshot.ts)、[apps/web/tests/max-tokens-notice.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/max-tokens-notice.snapshot.ts)、[apps/web/tests/search-card.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/search-card.snapshot.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/web/src/boot.ts`、`packages/client/web/src/index.ts` 确认状态如何进入 UI，最后对照 `apps/web/tests/built-boot.snapshot.ts`、`apps/web/tests/command-image-envelope.snapshot.ts`、`apps/web/tests/home-path-tilde.snapshot.ts`。
- 代码证据：固定提交归档实际读取结果：约 35 行；扫描到的声明包括 `getStaticModules`；源码顶部原注释（英文，仅作回查线索）：Platform-singleton module-table. These are the ONLY entities the shell shares into the frozen module table — fetch bundles resolve their externals against exactly this set through the loader's require. Keys come from the platform constant module (./platform...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/tests/base-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/base-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、Web 界面的具体场景，包括“web shell base.css”、“leaves theme styles to the dynamic ui-theme client entry”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“web shell base.css”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Shell base styles stay independent from the dynamically loaded theme bundle.”；固定提交中扫描到的声明包括 `importOrder`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `importOrder`；扫描到的测试主题包括 “web shell base.css”、“leaves theme styles to the dynamic ui-theme client entry”；源码顶部原注释（英文，仅作回查线索）：Shell base styles stay independent from the dynamically loaded theme bundle.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/tests/boot-page.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot-page.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、Web 界面、启动的具体场景，包括“BootPage”、“draws the loading skeleton before any plugin state arrives”、“keeps loading while entries are active or loading”、“lists failed entries”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“BootPage”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `mount`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/web/src/boot-page.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot-page.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/web/src/boot-page.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的声明包括 `mount`；扫描到的测试主题包括 “BootPage”、“draws the loading skeleton before any plugin state arrives”、“keeps loading while entries are active or loading”、“lists failed entries”、“shows the complete sweep report”、“detaches on disposal”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/tests/boot.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tests/boot.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、Web 界面、启动的具体场景，包括“bootstrap failure rendering”、“renders a missing bootstrap facade”、“renders a create failure owned by the facade”、“renders a malformed boot manifest”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“bootstrap failure rendering”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `installFacade`、`expectBootFailure`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/modules/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/index.ts)、[packages/client/web/src/boot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/boot.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/modules/src/client/index.ts`、`packages/client/web/src/boot.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 135 行；扫描到的声明包括 `installFacade`、`expectBootFailure`；扫描到的测试主题包括 “bootstrap failure rendering”、“renders a missing bootstrap facade”、“renders a create failure owned by the facade”、“renders a malformed boot manifest”、“renders a module-system construction failure”、“plugin activation”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/web/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、Web 界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/web/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/web/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
