# 源文件索引：packages/client（第 3/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 3 部分，覆盖：packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/ui-attachment

### [packages/client/ui-attachment/src/AttachmentRail.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AttachmentRail` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AttachmentRail` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Thumbnail geometry mirrors DeepSeek Chat's composer rail: 64px cards with a 16px radius, remove control fully inside the card, arrows overlaid at the edges instead of a scrollbar.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.rail、.item、.thumbnail、.remove、.arrow；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/AttachmentRail.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx)、[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/AttachmentRail.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx`、`packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 118 行；样式结构包含选择器 .root、.rail、.item、.thumbnail、.remove、.arrow；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Thumbnail geometry mirrors DeepSeek Chat's composer rail: 64px cards with a 16px radius, remove control fully inside the card, arrows overlaid at the edges instead of a scrollbar.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/AttachmentRail.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AttachmentRail` 的界面组件或交互逻辑，并导出 `AttachmentRailItem`、`AttachmentRailLabels`、`AttachmentRail`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Draft-attachment thumbnail rail: scrollbar-less horizontal overflow paged by edge arrows, hover-revealed per-item remove, single-click open.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Draft-attachment thumbnail rail: scrollbar-less horizontal overflow paged by edge arrows, hover-revealed per-item remove, single-click open.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Draft-attachment thumbnail rail: scrollbar-less horizontal overflow paged by edge arrows, hover-revealed per-item remove, single-click open.”；固定提交中扫描到的声明包括 `AttachmentRailItem`、`AttachmentRailLabels`、`AttachmentRail`、`pageBehavior`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/AttachmentRail.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.module.css)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)、[packages/client/ui-attachment/src/client/labels.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/labels.ts)
- 对应测试：[packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/ComposerAttachments.tsx`、`packages/client/ui-attachment/src/client/labels.ts`、`packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 200 行；扫描到的声明包括 `AttachmentRailItem`、`AttachmentRailLabels`、`AttachmentRail`、`pageBehavior`；源码顶部原注释（英文，仅作回查线索）：Draft-attachment thumbnail rail: scrollbar-less horizontal overflow paged by edge arrows, hover-revealed per-item remove, single-click open.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/DropOverlay.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `DropOverlay` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `DropOverlay` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Full-viewport drop invitation (DeepSeek Chat DragMask). pointer-events: none — the layer is decoration; drag events must keep hitting the page so the owner's enter/leave count stays balanced. The frosted sheet color is the theme's drop-mask alias (dark over...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .mask、.wrap、.illustration、.title、.desc；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/DropOverlay.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/DropOverlay.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 54 行；样式结构包含选择器 .mask、.wrap、.illustration、.title、.desc；源码顶部原注释（英文，仅作回查线索）：Full-viewport drop invitation (DeepSeek Chat DragMask). pointer-events: none — the layer is decoration; drag events must keep hitting the page so the owner's enter/leave count stays balanced. The frosted sheet color is the theme's drop-mask alias (dark over...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/DropOverlay.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `DropOverlay` 的界面组件或交互逻辑，并导出 `DropOverlayLabels`、`DropOverlay`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `DropOverlayLabels`、`DropOverlay`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `DropOverlayLabels`、`DropOverlay`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/DropOverlay.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.module.css)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)、[packages/client/ui-attachment/src/client/labels.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/labels.ts)、[packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx)
- 对应测试：[packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/ComposerAttachments.tsx`、`packages/client/ui-attachment/src/client/labels.ts`、`packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `DropOverlayLabels`、`DropOverlay`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/ImageLightbox.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ImageLightbox` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ImageLightbox` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .backdrop、.mask、.image、.close；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/ImageLightbox.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/ImageLightbox.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 44 行；样式结构包含选择器 .backdrop、.mask、.image、.close。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/ImageLightbox.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ImageLightbox` 的界面组件或交互逻辑，并导出 `ImageLightboxLabels`、`ImageLightbox`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `ImageLightboxLabels`、`ImageLightbox`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `ImageLightboxLabels`、`ImageLightbox`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/ImageLightbox.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.module.css)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-attachment/src/MessageImage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.tsx)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)
- 对应测试：[packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/MessageImage.tsx`、`packages/client/ui-attachment/src/client/ComposerAttachments.tsx`、`packages/client/ui-attachment/src/client/labels.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `ImageLightboxLabels`、`ImageLightbox`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/MessageImage.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `MessageImage` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `MessageImage` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .gallery、.frame、.loading、.error；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/MessageImage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/MessageImage.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 69 行；样式结构包含选择器 .gallery、.frame、.loading、.error。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/MessageImage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `MessageImage` 的界面组件或交互逻辑，并导出 `ImageLoader`、`MessageImageLabels`、`MessageImage`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `ImageLoader`、`MessageImageLabels`、`MessageImage`、`ImageGallery`、`singleFit`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `ImageLoader`、`MessageImageLabels`、`MessageImage`、`ImageGallery`、`singleFit`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/ui-attachment/src/ImageLightbox.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.tsx)、[packages/client/ui-attachment/src/MessageImage.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.module.css)、[packages/client/ui-attachment/src/client/MessageImages.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/MessageImages.tsx)
- 对应测试：[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/MessageImages.tsx`、`packages/client/ui-attachment/src/client/labels.ts`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/message-image.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 120 行；扫描到的声明包括 `ImageLoader`、`MessageImageLabels`、`MessageImage`、`ImageGallery`、`singleFit`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/client/ComposerAttachments.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ComposerAttachments` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ComposerAttachments` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .rail；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/ComposerAttachments.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；样式结构包含选择器 .rail。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ComposerAttachments` 的界面组件或交互逻辑，并导出 `ComposerAttachments`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `ComposerAttachments`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `ComposerAttachments`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/AttachmentRail.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.tsx)、[packages/client/ui-attachment/src/DropOverlay.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.tsx)、[packages/client/ui-attachment/src/ImageLightbox.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.tsx)、[packages/client/ui-attachment/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/index.ts)
- 对应测试：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/index.ts`、`packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 117 行；扫描到的声明包括 `ComposerAttachments`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/client/MessageImages.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/MessageImages.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `MessageImages` 的界面组件或交互逻辑，并导出 `MessageImages`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `MessageImages`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `MessageImages`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/MessageImage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.tsx)、[packages/client/ui-attachment/src/client/labels.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/labels.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-attachment/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/index.ts)
- 对应测试：[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/index.ts`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 8 行；扫描到的声明包括 `MessageImages`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser attachment plugin: fills conversation's composer and message-image slots.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)、[packages/client/ui-attachment/src/client/MessageImages.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/MessageImages.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 对应测试：[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-attachment/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-attachment/tests/plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser attachment plugin: fills conversation's composer and message-image slots.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/client/labels.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/labels.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：固定提交中扫描到的声明包括 `lightboxLabels`、`messageImageLabels`、`dropOverlayLabels`、`attachmentRailLabels`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/AttachmentRail.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.tsx)、[packages/client/ui-attachment/src/DropOverlay.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.tsx)、[packages/client/ui-attachment/src/ImageLightbox.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.tsx)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-attachment/src/client/ComposerAttachments.tsx`、`packages/client/ui-attachment/src/client/MessageImages.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 63 行；扫描到的声明包括 `lightboxLabels`、`messageImageLabels`、`dropOverlayLabels`、`attachmentRailLabels`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-attachment/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-attachment/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host half of the browser-only attachment presentation plugin.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 对应测试：[packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-attachment/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-attachment/tests/plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-attachment/tests/plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host half of the browser-only attachment presentation plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-attachment. @module @deepseek-ai/dsh-client-ui-attachment/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-attachment/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-attachment/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-attachment/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-attachment/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-attachment. @module @deepseek-ai/dsh-client-ui-attachment/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/attachment-rail.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“AttachmentRail”、“renders thumbnails in order and routes open and remove clicks”、“shows edge arrows from scroll geometry and pages a viewport at a time”、“shows both arrows mid-scroll and recomputes when the rail itself resizes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AttachmentRail”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom AttachmentRail behavior in the jsdom lane: item rendering and callbacks, arrow paging over stubbed scroll geometry (jsdom lays nothing out), the exclusive vertical-wheel pan, and the new-item end reveal.”；固定提交中扫描到的声明包括 `item`、`stubGeometry`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/AttachmentRail.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/AttachmentRail.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-attachment/src/AttachmentRail.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 182 行；扫描到的声明包括 `item`、`stubGeometry`；扫描到的测试主题包括 “AttachmentRail”、“renders thumbnails in order and routes open and remove clicks”、“shows edge arrows from scroll geometry and pages a viewport at a time”、“shows both arrows mid-scroll and recomputes when the rail itself resizes”、“keeps scrolling available when ResizeObserver is unavailable”、“pans horizontally on a vertical wheel, consuming the event, with clamped normalized travel”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom AttachmentRail behavior in the jsdom lane: item rendering and callbacks, arrow paging over stubbed scroll geometry (jsdom lays nothing out), the exclusive vertical-wheel pan, and the new-item end reveal.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ComposerAttachments”、“accepts file drops anywhere on the document and keeps non-file drags native”、“tracks nested file drags and clears an aborted drag”、“shows a blocked drop without forwarding its files”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ComposerAttachments”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `attachment`、`props`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-attachment/src/client/ComposerAttachments.tsx`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `attachment`、`props`；扫描到的测试主题包括 “ComposerAttachments”、“accepts file drops anywhere on the document and keeps non-file drags native”、“tracks nested file drags and clears an aborted drag”、“shows a blocked drop without forwarding its files”、“routes rail removal and closes previews on Escape or attachment removal”、“labels an unnamed attachment and its original-image preview”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/drop-overlay.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“DropOverlay”、“portals the invitation with its title and limits desc to the body”、“omits the desc line when none is resolved”、“drops the desc and switches the illustration while disabled”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DropOverlay”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/DropOverlay.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/DropOverlay.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-attachment/src/DropOverlay.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 38 行；扫描到的测试主题包括 “DropOverlay”、“portals the invitation with its title and limits desc to the body”、“omits the desc line when none is resolved”、“drops the desc and switches the illustration while disabled”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/image-lightbox.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ImageLightbox”、“focuses its close control, closes by button and Escape, and restores focus”、“tolerates a focus owner it cannot restore (no active element at mount)”、“closes on a mask press but not on a press over the image”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ImageLightbox”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/ImageLightbox.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/ImageLightbox.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-attachment/src/ImageLightbox.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 51 行；扫描到的测试主题包括 “ImageLightbox”、“focuses its close control, closes by button and Escape, and restores focus”、“tolerates a focus owner it cannot restore (no active element at mount)”、“closes on a mask press but not on a press over the image”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“invariant companion”、“registers under the package name with an empty installer”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/ui-attachment/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-attachment/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的测试主题包括 “invariant companion”、“registers under the package name with an empty installer”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、消息的具体场景，包括“MessageImage”、“loads a session-authorized URL, bounds the thumbnail, and clicks into the original”、“ignores a click while the thumbnail is still loading”、“falls back to the image label for an unnamed attachment”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“MessageImage”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/ui-attachment/src/MessageImage.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/MessageImage.tsx)、[packages/client/ui-attachment/src/client/MessageImages.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/MessageImages.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/client/ui-attachment/src/MessageImage.tsx`、`packages/client/ui-attachment/src/client/MessageImages.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 213 行；扫描到的测试主题包括 “MessageImage”、“loads a session-authorized URL, bounds the thumbnail, and clicks into the original”、“ignores a click while the thumbnail is still loading”、“falls back to the image label for an unnamed attachment”、“surfaces a retry control when durable bytes cannot be read, including a failed retry”、“clamps extreme aspect ratios and anchors the crop toward the informative edge”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tests/plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“attachment plugin”、“keeps the host half empty”、“registers both entries and removes them with the plugin fiber”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“attachment plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-attachment/src/client/ComposerAttachments.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/ComposerAttachments.tsx)、[packages/client/ui-attachment/src/client/MessageImages.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/src/client/MessageImages.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-attachment/src/client/ComposerAttachments.tsx`、`packages/client/ui-attachment/src/client/MessageImages.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 46 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “attachment plugin”、“keeps the host half empty”、“registers both entries and removes them with the plugin fiber”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-attachment/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-attachment/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-brand-official

### [packages/client/ui-brand-official/src/client/Brand.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/Brand.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：品牌类型
- 这个文件有什么用：它为浏览器端、用户界面、品牌类型定义带语义的品牌类型，使编译器能阻止不同用途的标识符互相替换。
- 为什么这样设计：在编译期区分语义不同的标识符，能把一类容易被普通字符串掩盖的调用错误提前暴露，而不增加运行时序列化成本。
- 文件级设计证据：固定提交中扫描到的声明包括 `OfficialBrandMark`、`OfficialBrandName`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-sidebar/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-sidebar/src/client/index.ts)、[packages/client/ui-brand-official/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/index.ts)
- 对应测试：[packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-brand-official/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-brand-official/src/client/index.ts`、`packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `OfficialBrandMark`、`OfficialBrandName`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-brand-official/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、品牌类型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Official DeepSeek Harness occupants for the generic browser-brand slots.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-brand-official/src/client/Brand.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/Brand.tsx)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-brand-official/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Official DeepSeek Harness occupants for the generic browser-brand slots.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-brand-official/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、品牌类型相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Official browser-brand plugin, node half. The empty apply gives Loader a host-side row while the browser half ships through exports"./client".”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/client/ui-brand-official/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-brand-official/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-brand-official/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-brand-official/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-brand-official/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 7 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Official browser-brand plugin, node half. The empty apply gives Loader a host-side row while the browser half ships through exports"./client".。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-brand-official/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、品牌类型必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-brand-official. @module @deepseek-ai/dsh-client-ui-brand-official/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-brand-official/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-brand-official/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-brand-official/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-brand-official/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-brand-official. @module @deepseek-ai/dsh-client-ui-brand-official/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/browser-plugin.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、品牌类型的具体场景，包括“official browser-brand plugin”、“declares only the slot service it uses”、“leaves every slot empty outside the official build profile”、“fills declarations before or after apply and removes every occupant on teardown”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“official browser-brand plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-brand-official/src/client/Brand.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/Brand.tsx)、[packages/client/ui-brand-official/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-brand-official/src/client/Brand.tsx`、`packages/client/ui-brand-official/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 79 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “official browser-brand plugin”、“declares only the slot service it uses”、“leaves every slot empty outside the official build profile”、“fills declarations before or after apply and removes every occupant on teardown”、“renders the official name independently from both requested mark sizes”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-brand-official/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、品牌类型的具体场景，包括“official brand invariant companion”、“reserves package ownership with an empty installer”、“keeps the node half as an inert Loader seat”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“official brand invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/client/ui-brand-official/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/index.ts)、[packages/client/ui-brand-official/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-brand-official/src/index.ts`、`packages/client/ui-brand-official/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 18 行；扫描到的测试主题包括 “official brand invariant companion”、“reserves package ownership with an empty installer”、“keeps the node half as an inert Loader seat”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-brand-official/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、品牌类型：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-brand-official/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-brand-official/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-brand-official/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-commands

### [packages/client/ui-commands/src/client/PopupSelectView.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `PopupSelectView` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `PopupSelectView` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Official popupSelect shell card: menu-surface tokens (same family as ui-primitives Menu.module.css — figma MenuDropdown r12 / hairline / shadow-lv3), anchored by the conversation.input.overlay slot.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .card、.viewport、.row、.rowActive、.label、.detail；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/ui-commands/src/client/PopupSelectView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)、[packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts)、[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-commands/src/client/PopupSelectView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx`、`packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 118 行；样式结构包含选择器 .card、.viewport、.row、.rowActive、.label、.detail；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Official popupSelect shell card: menu-surface tokens (same family as ui-primitives Menu.module.css — figma MenuDropdown r12 / hairline / shadow-lv3), anchored by the conversation.input.overlay slot.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/PopupSelectView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `PopupSelectView` 的界面组件或交互逻辑，并导出 `PopupSelectInjected`、`PopupSelectViewProps`、`PopupSelectView`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Official popupSelect shell: renders one session's PopupSelectController store into the conversation.input.overlay anchor. Unlike the slash menu (combobox — textarea keeps focus), this shell HOLDS focus while open: the inner search input takes focus, plain t...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Official popupSelect shell: renders one session's PopupSelectController store into the conversation.input.overlay anchor. Unlike the slash menu (combobox — textarea keeps focus), this shell HOLDS focus while open: the inner search input takes focus, plain t...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Official popupSelect shell: renders one session's PopupSelectController store into the conversation.input.overlay anchor. Unlike the slash menu (combobox — textarea keeps focus), this shell HOLDS focus while open: the inner search input takes focus, plain t...”；固定提交中扫描到的声明包括 `PopupSelectInjected`、`PopupSelectViewProps`、`PopupSelectView`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/ui-commands/src/client/PopupSelectView.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.module.css)、[packages/client/ui-commands/src/client/popup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/popup.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)
- 对应测试：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-commands/src/client/index.ts`、`packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `PopupSelectInjected`、`PopupSelectViewProps`、`PopupSelectView`；源码顶部原注释（英文，仅作回查线索）：Official popupSelect shell: renders one session's PopupSelectController store into the conversation.input.overlay anchor. Unlike the slash menu (combobox — textarea keeps focus), this shell HOLDS focus while open: the inner search input takes focus, plain t...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/contract.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：共享测试契约
- 这个文件有什么用：它为浏览器端、用户界面定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。
- 为什么这样设计：多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。
- 文件级设计证据：源码顶部注释把它定位为“Frozen contract of the client command surface. Types only. The CommandUiRuntime (ctx.commandUi) implements this face; business packages consume register alone.”；固定提交中扫描到的声明包括 `SelectConfirmation`、`SelectOption`、`CommandUiSpec`、`CommandContribution`、`CommandDecoration`；本地静态 import 图显示它直接依赖 2 个源文件，并被 7 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)、[packages/client/ui-commands/src/client/popup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/popup.ts)
- 对应测试：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-commands/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/index.ts` 和 `packages/client/ui-commands/src/client/index.ts`、`packages/client/ui-commands/src/client/popup.ts`、`packages/client/ui-commands/src/client/service.ts` 确认输入输出，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx`、`packages/client/ui-commands/tests/popup.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `SelectConfirmation`、`SelectOption`、`CommandUiSpec`、`CommandContribution`、`CommandDecoration`、`CommandUiContract`；源码顶部原注释（英文，仅作回查线索）：Frozen contract of the client command surface. Types only. The CommandUiRuntime (ctx.commandUi) implements this face; business packages consume register alone.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/directory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/directory.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：路径边界
- 这个文件有什么用：它负责浏览器端、用户界面、目录的解析、规范化和安全约束，统一处理不同平台的路径差异与越界检查。
- 为什么这样设计：路径是跨平台且涉及安全的输入，集中规范化和越界判断可以避免不同调用方产生不一致的文件目标。
- 文件级设计证据：源码顶部注释把它定位为“Command-directory cache keyed by session: one entry per served catalog — every session is agent-backed, so command.list({sessionId}) is the only request fields. Each entry keeps the single-flight / soft-hard invalidation / epoch-guard behavior of the origin...”；固定提交中扫描到的声明包括 `DirectoryStatus`、`FetchCommands`、`CommandDirectory`、`Entry`、`settled`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/interaction/commands/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/commands/src/types.ts)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)、[packages/client/ui-commands/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/service.ts)
- 对应测试：[packages/client/ui-commands/tests/directory.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/directory.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-commands/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/interaction/commands/src/types.ts` 和 `packages/client/ui-commands/src/client/index.ts`、`packages/client/ui-commands/src/client/service.ts`、`packages/client/ui-commands/tests/directory.client.spec.ts` 确认输入输出，最后对照 `packages/client/ui-commands/tests/directory.client.spec.ts`、`packages/client/ui-commands/tests/service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 172 行；扫描到的声明包括 `DirectoryStatus`、`FetchCommands`、`CommandDirectory`、`Entry`、`settled`、`notifyWaiters`、`abortReason`；源码顶部原注释（英文，仅作回查线索）：Command-directory cache keyed by session: one entry per served catalog — every session is agent-backed, so command.list({sessionId}) is the only request fields. Each entry keeps the single-flight / soft-hard invalidation / epoch-guard behavior of the origin...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Command UI plugin, browser half: CommandUiRuntime (ctx.commandUi) owning the capability-keyed directory cache, the '/' command source, the client contribution registry, and the per-session popupSelect controllers; the popupSelect shell self-registers into c...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 9 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/PopupSelectView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.tsx)、[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)、[packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-commands/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-model-selection/src/client/index.ts`、`packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`、`packages/client/ui-permission-presets/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 73 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Command UI plugin, browser half: CommandUiRuntime (ctx.commandUi) owning the capability-keyed directory cache, the '/' command source, the client contribution registry, and the per-session popupSelect controllers; the popupSelect shell self-registers into c...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“command namespace dictionaries (the popupSelect shell's copy).”；固定提交中扫描到的声明包括 `zh`、`CommandKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)
- 对应测试：[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-commands/src/client/index.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-commands/tests/popup-view.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `zh`、`CommandKey`、`en`；源码顶部原注释（英文，仅作回查线索）：command namespace dictionaries (the popupSelect shell's copy).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/popup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/popup.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Headless popupSelect shell state: one controller per client session, owned by CommandUiRuntime's per-session map and torn down by the session scope disposer. The shell is a transient layer (never in the input state machine): it loads options once, filters t...”；固定提交中扫描到的声明包括 `TokenSegment`、`PopupSpec`、`PopupSelectDeps`、`PopupState`、`filterOptions`；本地静态 import 图显示它直接依赖 3 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/contract.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)、[packages/client/ui-commands/src/client/PopupSelectView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.tsx)
- 对应测试：[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-commands/src/client/PopupSelectView.tsx`、`packages/client/ui-commands/src/client/index.ts`、`packages/client/ui-commands/src/client/service.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-commands/tests/popup-view.client.spec.tsx`、`packages/client/ui-commands/tests/popup.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 292 行；扫描到的声明包括 `TokenSegment`、`PopupSpec`、`PopupSelectDeps`、`PopupState`、`filterOptions`、`PopupSelectController`、`errorText`；源码顶部原注释（英文，仅作回查线索）：Headless popupSelect shell state: one controller per client session, owned by CommandUiRuntime's per-session map and torn down by the session scope disposer. The shell is a transient layer (never in the input state machine): it loads options once, filters t...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/service.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、用户界面的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“CommandUiRuntime (ctx.commandUi): the '/' command source over the session-keyed directory, the client-contribution registry, and the per-session popupSelect controllers. Candidate synthesis merges the host catalog with contributions by availability, then fu...”；固定提交中扫描到的声明包括 `CommandUiRuntime`、`submittedCommandName`、`boundaryBonus`、`fuzzyScore`、`fuzzyCandidates`；本地静态 import 图显示它直接依赖 9 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)
- 对应测试：[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-commands/README.md` 和入口，再读当前实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts` 和 `packages/client/ui-commands/src/client/index.ts`、`packages/client/ui-commands/tests/service.client.spec.ts` 确认输入输出，最后对照 `packages/client/ui-commands/tests/service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 489 行；扫描到的声明包括 `CommandUiRuntime`、`submittedCommandName`、`boundaryBonus`、`fuzzyScore`、`fuzzyCandidates`；源码顶部原注释（英文，仅作回查线索）：CommandUiRuntime (ctx.commandUi): the '/' command source over the session-keyed directory, the client-contribution registry, and the per-session popupSelect controllers. Candidate synthesis merges the host catalog with contributions by availability, then fu...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-commands/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-commands/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Command UI plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration. The host command registry i...”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-commands/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 10 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Command UI plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration. The host command registry i...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-commands. @module @deepseek-ai/dsh-client-ui-commands/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-commands. @module @deepseek-ai/dsh-client-ui-commands/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“apply”、“declares the services it binds”、“mounts ctx.commandUi, registers the source and the overlay entry, and folds up on disposal”、“the overlay inject resolves the per-session popup controller by sessionId and fails lou...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ui-commands browser half on a real cordis Context with fake slash/slots faces and real session scopes: the plugin body mounts CommandUiRuntime as command, the popupSelect shell registers into conversation.input.overlay through slot declaration injection wit...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/PopupSelectView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-commands/src/client/PopupSelectView.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “apply”、“declares the services it binds”、“mounts ctx.commandUi, registers the source and the overlay entry, and folds up on disposal”、“the overlay inject resolves the per-session popup controller by sessionId and fails loud on an unknown id”；源码顶部原注释（英文，仅作回查线索）：ui-commands browser half on a real cordis Context with fake slash/slots faces and real session scopes: the plugin body mounts CommandUiRuntime as command, the popupSelect shell registers into conversation.input.overlay through slot declaration injection wit...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/tests/directory.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/directory.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目录的具体场景，包括“status and resolve (per key)”、“starts cold and resolves nothing”、“serves exact-name lookups once ready, undefined for unknown names”、“drops the snapshot and records failure on a failed pull”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“status and resolve (per key)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“CommandDirectory unit tests over the session-key axis: per-key status transitions and epoch guard, key isolation across sessions, soft invalidation (invalidateAll), the reconnect hard reset (resetConnected: every entry drops its snapshot and prewarms), the ...”；固定提交中扫描到的声明包括 `deferred`、`bench`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-commands/src/client/directory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/directory.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-commands/src/client/directory.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 293 行；扫描到的声明包括 `deferred`、`bench`；扫描到的测试主题包括 “status and resolve (per key)”、“starts cold and resolves nothing”、“serves exact-name lookups once ready, undefined for unknown names”、“drops the snapshot and records failure on a failed pull”、“keys are isolated: one session catalog landing leaves another cold”、“epoch guard (per key)”；源码顶部原注释（英文，仅作回查线索）：CommandDirectory unit tests over the session-key axis: per-key status transitions and epoch guard, key isolation across sessions, soft invalidation (invalidateAll), the reconnect hard reset (resetConnected: every entry drops its snapshot and prewarms), the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“PopupSelectView”、“renders null while closed, opens with focus in the search input”、“typing filters rows locally and rebases the highlight”、“ArrowUp/Down move the filtered highlight; ArrowLeft/Right are left to the native caret”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“PopupSelectView”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `spec`、`mountOpen`、`rowLabels`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/ui-commands/src/client/PopupSelectView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/PopupSelectView.tsx)、[packages/client/ui-commands/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/contract.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/ui-commands/src/client/PopupSelectView.tsx`、`packages/client/ui-commands/src/client/contract.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 254 行；扫描到的声明包括 `spec`、`mountOpen`、`rowLabels`；扫描到的测试主题包括 “PopupSelectView”、“renders null while closed, opens with focus in the search input”、“typing filters rows locally and rebases the highlight”、“ArrowUp/Down move the filtered highlight; ArrowLeft/Right are left to the native caret”、“scrolls the highlighted row into view when the highlight moves”、“caps the card height at the design maximum when the composer sits low enough”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“filterOptions”、“matches case-insensitively over label and detail; blank keeps all”、“open and options load”、“publishes pending immediately, ready when options land”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“filterOptions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“PopupSelectController behavior: one options load per open with local search filtering, filtered highlight movement, single-flight select with open-time context, consume-on-success (CAS miss benign), failure-keeps-open retry semantics for both options and on...”；固定提交中扫描到的声明包括 `spec`、`makeDeps`、`readyPopup`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/ui-commands/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/contract.ts)、[packages/client/ui-commands/src/client/popup.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/popup.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-commands/src/client/contract.ts`、`packages/client/ui-commands/src/client/popup.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 399 行；扫描到的声明包括 `spec`、`makeDeps`、`readyPopup`；扫描到的测试主题包括 “filterOptions”、“matches case-insensitively over label and detail; blank keeps all”、“open and options load”、“publishes pending immediately, ready when options land”、“loads options exactly once: search filters locally without re-querying the provider”、“a reopen aborts the old load and drops its late arrival”；源码顶部原注释（英文，仅作回查线索）：PopupSelectController behavior: one options load per open with local search filtering, filtered highlight movement, single-flight select with open-time context, consume-on-success (CAS miss benign), failure-keeps-open retry semantics for both options and on...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“registration”、“registers the”、“the warm hook prewarms the session key: one pull per session, no duplicate over pending”、“candidates”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“CommandUiRuntime tests on a real cordis Context with fake slash/connection faces and real session scopes (createScope): session-keyed candidate synthesis (host catalog by sessionId + contributions by availability, collision fail-loud), the dispatch decision...”；固定提交中扫描到的声明包括 `carried`、`bench`、`menuPick`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/contract.ts)、[packages/client/ui-commands/src/client/directory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/directory.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-commands/src/client/contract.ts`、`packages/client/ui-commands/src/client/directory.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 822 行；扫描到的声明包括 `carried`、`bench`、`menuPick`；扫描到的测试主题包括 “registration”、“registers the”、“the warm hook prewarms the session key: one pull per session, no duplicate over pending”、“candidates”、“does not fetch Agent-bound commands for an addressed child”、“pulls the session catalog; fuzzy filter and hint mapping apply”；源码顶部原注释（英文，仅作回查线索）：CommandUiRuntime tests on a real cordis Context with fake slash/connection faces and real session scopes (createScope): session-keyed candidate synthesis (host catalog by sessionId + contributions by availability, collision fail-loud), the dispatch decision...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-commands/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-commands/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-commands/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

