# 源文件索引：packages/client（第 10/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 10 部分，覆盖：packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/ui-tool

### [packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `apply` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Register the Tool call tree, details renderer, and built-in atomic views.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 13 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-tool/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/index.ts)
- 对应测试：[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/index.ts`、`packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Register the Tool call tree, details renderer, and built-in atomic views.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、工具定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“Tool UI slot declarations and their composed component props.”；固定提交中扫描到的声明包括 `ToolCallOwnerProps`、`ToolCallViewProps`、`ToolHostDescriptionInjected`、`ToolTreeProps`、`ToolDetailsProps`；本地静态 import 图显示它直接依赖 5 个源文件，并被 13 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-tool/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/index.ts)
- 对应测试：[packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx)、[packages/client/ui-tool/tests/toolview-type-chain.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-type-chain.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-tool/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-tool/src/client/index.ts`、`packages/client/ui-tool/src/client/tool/ToolCallTree.tsx`、`packages/client/ui-tool/src/client/tool/ToolDetails.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx`、`packages/client/ui-tool/tests/toolview-type-chain.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的声明包括 `ToolCallOwnerProps`、`ToolCallViewProps`、`ToolHostDescriptionInjected`、`ToolTreeProps`、`ToolDetailsProps`；源码顶部原注释（英文，仅作回查线索）：Tool UI slot declarations and their composed component props.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser Tool plugin: whole-call composition and keyed atomic Tool views.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-skill/src/client/SkillRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/src/client/SkillRow.tsx)、[packages/client/ui-tool/tests/toolview-slot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-slot.client.spec.tsx)
- 对应测试：[packages/client/ui-tool/tests/toolview-slot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-slot.client.spec.tsx)、[packages/client/ui-tool/tests/web-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/web-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读 `packages/client/ui-tool/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-skill/src/client/SkillRow.tsx`、`packages/client/ui-tool/tests/toolview-slot.client.spec.tsx`、`packages/client/ui-tool/tests/web-card.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-tool/tests/toolview-slot.client.spec.tsx`、`packages/client/ui-tool/tests/web-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 5 行；源码顶部原注释（英文，仅作回查线索）：Browser Tool plugin: whole-call composition and keyed atomic Tool views.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/locale.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/locale.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、工具提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Locale namespace supplied by the conversation owner to Tool renderers.”；固定提交中扫描到的声明包括 `CONVERSATION_NS`；本地静态 import 图显示它直接依赖 0 个源文件，并被 9 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)、[packages/client/ui-tool/src/client/tool/toolviews/ask-question-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/ask-question-row.tsx)、[packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx)
- 对应测试：[packages/client/ui-tool/tests/todo-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/todo-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/src/client/tool/toolviews/ask-question-row.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/todo-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 2 行；扫描到的声明包括 `CONVERSATION_NS`；源码顶部原注释（英文，仅作回查线索）：Locale namespace supplied by the conversation owner to Tool renderers.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/ToolCallTree.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolCallTree.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ToolCallTree` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ToolCallTree` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .callRow、.subCalls；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/tool/ToolCallTree.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolCallTree.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)、[packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx)、[packages/client/ui-tool/tests/toolview-slot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-slot.client.spec.tsx)、[packages/client/ui-tool/tests/web-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/web-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolCallTree.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx`、`packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 12 行；样式结构包含选择器 .callRow、.subCalls。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/ToolCallTree.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolCallTree.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `ToolCallTree` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Root/subcall Tool composition with one keyed atomic dispatch path.”；固定提交中扫描到的声明包括 `ToolCallTree`、`callName`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/tool/ToolCallTree.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolCallTree.module.css)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 112 行；扫描到的声明包括 `ToolCallTree`、`callName`；源码顶部原注释（英文，仅作回查线索）：Root/subcall Tool composition with one keyed atomic dispatch path.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/ToolDetails.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ToolDetails` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ToolDetails` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .description、.cardBody、.recovery、.code、.read、.web；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)、[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)、[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)、[packages/client/ui-tool/tests/search-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/search-card.client.spec.tsx)、[packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx`、`packages/client/ui-tool/tests/diff-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 46 行；样式结构包含选择器 .description、.cardBody、.recovery、.code、.read、.web。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `ToolDetails` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Card-aware output body for the selected Tool call in details.”；固定提交中扫描到的声明包括 `ToolDetails`；本地静态 import 图显示它直接依赖 9 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.module.css)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-skill/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/browser-plugin.client.spec.ts)、[packages/client/ui-skill/tests/skill-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-skill/tests/skill-row.client.spec.tsx)、[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)、[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)、[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/tool-details-render.client.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-skill/tests/browser-plugin.client.spec.ts`、`packages/client/ui-skill/tests/skill-row.client.spec.tsx`、`packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `ToolDetails`；源码顶部原注释（英文，仅作回查线索）：Card-aware output body for the selected Tool call in details.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/components/ToolRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ToolRow` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ToolRow` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Tool summary row (figma 122:9479): 24px single line — 16 leading gap6 title 14/24 gap8 2x2 dot gap8 summary FILL truncate.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.row、.leading、.title、.sep、.chevron；自定义属性 --dsl-code-block-content-font、--dsl-terminal-font、--dsl-terminal-line-height、--dsl-terminal-output-max-height；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/tool/components/ToolRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-tool/tests/ask-question-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/ask-question-row.client.spec.tsx)、[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)、[packages/client/ui-tool/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/coverage-tails.client.spec.tsx)、[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)、[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/components/ToolRow.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/ask-question-row.client.spec.tsx`、`packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 308 行；样式结构包含选择器 .root、.row、.leading、.title、.sep、.chevron；自定义属性 --dsl-code-block-content-font、--dsl-terminal-font、--dsl-terminal-line-height、--dsl-terminal-output-max-height；源码顶部原注释（英文，仅作回查线索）：Tool summary row (figma 122:9479): 24px single line — 16 leading gap6 title 14/24 gap8 2x2 dot gap8 summary FILL truncate.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/components/ToolRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `ToolRow` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“ToolRow: the single-line tool summary row (figma component set 122:9479) — 16px leading slot (state dot / tool icon, chevron on hover or expanded) + title + separator dot + FILL-truncated summary, drawn through the shared DisclosureRow chrome with the whole...”；固定提交中扫描到的声明包括 `ToolRowProps`、`ToolRow`、`leadingFor`、`stateStatus`；本地静态 import 图显示它直接依赖 8 个源文件，并被 9 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/tool/components/ToolRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.module.css)、[packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx)
- 对应测试：[packages/client/ui-tool/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/coverage-tails.client.spec.tsx)、[packages/client/ui-tool/tests/tool-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/ask-question-row.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/file-mutation-row.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/coverage-tails.client.spec.tsx`、`packages/client/ui-tool/tests/tool-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `ToolRowProps`、`ToolRow`、`leadingFor`、`stateStatus`；源码顶部原注释（英文，仅作回查线索）：ToolRow: the single-line tool summary row (figma component set 122:9479) — 16px leading slot (state dot / tool icon, chevron on hover or expanded) + title + separator dot + FILL-truncated summary, drawn through the shared DisclosureRow chrome with the whole...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/models/diff-card-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/diff-card-model.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `diff-card-model` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure derivation of the diff-card props from a frozen call slice: the card:'diff' render intent the write/edit tools declare arrives on the snapshot as callView/resultView, and this is the one place that turns that pair into what DiffBlock draws. Both conver...”；固定提交中扫描到的声明包括 `CHAT_DIFF_MAX_LINES`、`DiffCardModel`、`diffCardModel`、`narrowDiffs`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-tool/src/client/tool/models/tool-call-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/tool-call-model.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)、[packages/client/ui-tool/src/client/tool/components/ToolRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.tsx)
- 对应测试：[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx`、`packages/client/ui-tool/src/client/tool/components/ToolRow.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/diff-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的声明包括 `CHAT_DIFF_MAX_LINES`、`DiffCardModel`、`diffCardModel`、`narrowDiffs`；源码顶部原注释（英文，仅作回查线索）：Pure derivation of the diff-card props from a frozen call slice: the card:'diff' render intent the write/edit tools declare arrives on the snapshot as callView/resultView, and this is the one place that turns that pair into what DiffBlock draws. Both conver...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/models/read-card-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/read-card-model.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `read-card-model` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure derivation of the read-card props from a frozen call slice: the card:'read' render intent the read tool declares arrives on the snapshot as the settled result node's resultView, and this is the one place that turns it into what ReadBlock draws. Both co...”；固定提交中扫描到的声明包括 `CHAT_READ_MAX_LINES`、`ReadCardModel`、`readCardModel`；本地静态 import 图显示它直接依赖 3 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-tool/src/client/tool/models/tool-call-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/tool-call-model.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)
- 对应测试：[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx`、`packages/client/ui-tool/src/client/tool/components/ToolRow.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/read-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 78 行；扫描到的声明包括 `CHAT_READ_MAX_LINES`、`ReadCardModel`、`readCardModel`；源码顶部原注释（英文，仅作回查线索）：Pure derivation of the read-card props from a frozen call slice: the card:'read' render intent the read tool declares arrives on the snapshot as the settled result node's resultView, and this is the one place that turns it into what ReadBlock draws. Both co...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/models/search-card-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/search-card-model.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `search-card-model` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure derivation of the search-card props from a frozen call slice: the card:'search' render intent the grep and glob tools declare arrives on the snapshot as resultView, and this is the one place that turns it into what SearchBlock draws. Both conversation ...”；固定提交中扫描到的声明包括 `CHAT_SEARCH_MAX_LINES`、`SearchCardModel`、`searchCardModel`、`isValidFiles`、`flattenContent`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-tool/src/client/tool/models/tool-call-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/tool-call-model.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)、[packages/client/ui-tool/src/client/tool/components/ToolRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.tsx)
- 对应测试：[packages/client/ui-tool/tests/search-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/search-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx`、`packages/client/ui-tool/src/client/tool/components/ToolRow.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/search-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 160 行；扫描到的声明包括 `CHAT_SEARCH_MAX_LINES`、`SearchCardModel`、`searchCardModel`、`isValidFiles`、`flattenContent`；源码顶部原注释（英文，仅作回查线索）：Pure derivation of the search-card props from a frozen call slice: the card:'search' render intent the grep and glob tools declare arrives on the snapshot as resultView, and this is the one place that turns it into what SearchBlock draws. Both conversation ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/models/terminal-card-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/terminal-card-model.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的持久终端（`terminal-card-model`） 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure derivation of the terminal-card props from a frozen call slice: the card:'terminal' render intent the shell tools declare arrives on the snapshot as callView/resultView, and this is the one place that turns that pair into what TerminalBlock draws. Both...”；固定提交中扫描到的声明包括 `terminalBlockLabels`、`TerminalCardModel`、`terminalFailed`、`terminalCardModel`、`resolveTerminalCwd`；本地静态 import 图显示它直接依赖 4 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)
- 对应测试：[packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx`、`packages/client/ui-tool/src/client/tool/components/ToolRow.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/terminal-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 219 行；扫描到的声明包括 `terminalBlockLabels`、`TerminalCardModel`、`terminalFailed`、`terminalCardModel`、`resolveTerminalCwd`、`normalizeSegments`、`collapse`；源码顶部原注释（英文，仅作回查线索）：Pure derivation of the terminal-card props from a frozen call slice: the card:'terminal' render intent the shell tools declare arrives on the snapshot as callView/resultView, and this is the one place that turns that pair into what TerminalBlock draws. Both...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/models/tool-call-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/tool-call-model.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的工具（`tool-call-model`） 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure row-model derivation for tool summary rows: variant classification, one-line summary, expanded-body text, and flattened result output from the frozen call slice. Input material comes from the call ARGUMENTS; output and error material from the settled r...”；固定提交中扫描到的声明包括 `ToolRowVariant`、`ToolRowState`、`VARIANT_TITLES`、`classifyTool`、`ToolRowModel`；本地静态 import 图显示它直接依赖 1 个源文件，并被 16 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)、[packages/client/ui-tool/src/client/tool/components/ToolRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.tsx)、[packages/client/ui-tool/src/client/tool/models/diff-card-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/diff-card-model.ts)
- 对应测试：[packages/client/ui-tool/tests/tool-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx`、`packages/client/ui-tool/src/client/tool/components/ToolRow.tsx`、`packages/client/ui-tool/src/client/tool/models/diff-card-model.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/tool-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 248 行；扫描到的声明包括 `ToolRowVariant`、`ToolRowState`、`VARIANT_TITLES`、`classifyTool`、`ToolRowModel`、`resultText`、`relativizeToCwd`、`toolRowModel`；源码顶部原注释（英文，仅作回查线索）：Pure row-model derivation for tool summary rows: variant classification, one-line summary, expanded-body text, and flattened result output from the frozen call slice. Input material comes from the call ARGUMENTS; output and error material from the settled r...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/models/web-card-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/web-card-model.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 Web 界面（`web-card-model`） 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure derivation of the web-card props from a frozen call slice: the card:'web' render intent the web_search/web_fetch tools declare at result time arrives on the snapshot as resultView, and this is the one place that turns it into what WebBlock draws. Both ...”；固定提交中扫描到的声明包括 `webCardModel`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-tool/src/client/tool/models/tool-call-model.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/models/tool-call-model.ts)、[packages/client/ui-tool/src/client/tool/ToolDetails.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolDetails.tsx)、[packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx)
- 对应测试：[packages/client/ui-tool/tests/web-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/web-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolDetails.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx`、`packages/client/ui-tool/src/client/tool/toolviews/web-row.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/web-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `webCardModel`；源码顶部原注释（英文，仅作回查线索）：Pure derivation of the web-card props from a frozen call slice: the card:'web' render intent the web_search/web_fetch tools declare at result time arrives on the snapshot as resultView, and this is the one place that turns it into what WebBlock draws. Both ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/GenericToolCard.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `GenericToolCard` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“GenericToolCard: the default tool row — classifies the tool into a visual variant and renders the summary row. Supplied by the Tool call tree as the keyed atomic-view slot's render-site fallback (an unregistered tool name lands here); registrants may also c...”；固定提交中扫描到的声明包括 `GenericToolCardProps`、`GenericToolCard`；本地静态 import 图显示它直接依赖 9 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/tool/components/ToolRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/components/ToolRow.tsx)、[packages/client/ui-tool/src/client/tool/ToolCallTree.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/ToolCallTree.tsx)
- 对应测试：[packages/client/ui-tool/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/coverage-tails.client.spec.tsx)、[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)、[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)、[packages/client/ui-tool/tests/search-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/search-card.client.spec.tsx)、[packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)、[packages/client/ui-tool/tests/tool-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/ToolCallTree.tsx`、`packages/client/ui-tool/tests/coverage-tails.client.spec.tsx`、`packages/client/ui-tool/tests/diff-card.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/coverage-tails.client.spec.tsx`、`packages/client/ui-tool/tests/diff-card.client.spec.tsx`、`packages/client/ui-tool/tests/read-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `GenericToolCardProps`、`GenericToolCard`；源码顶部原注释（英文，仅作回查线索）：GenericToolCard: the default tool row — classifies the tool into a visual variant and renders the summary row. Supplied by the Tool call tree as the keyed atomic-view slot's render-site fallback (an unregistered tool name lands here); registrants may also c...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/ask-question-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/ask-question-row.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `ask-question-row` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“ask_user_question toolview: question-flavored summary row replacing the generic "Tool call" card, registered into the keyed 'tool.call.toolview' hole like todo-row. The row composes ToolRow (chrome, running sweep, whole-row expand) and swaps in the interact...”；固定提交中扫描到的声明包括 `AskQuestionRow`、`askQuestionToolview`、`isAnswer`、`answeredSummary`；本地静态 import 图显示它直接依赖 7 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/ask-question-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/ask-question-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/ask-question-row.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/ask-question-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 101 行；扫描到的声明包括 `AskQuestionRow`、`askQuestionToolview`、`isAnswer`、`answeredSummary`；源码顶部原注释（英文，仅作回查线索）：ask_user_question toolview: question-flavored summary row replacing the generic "Tool call" card, registered into the keyed 'tool.call.toolview' hole like todo-row. The row composes ToolRow (chrome, running sweep, whole-row expand) and swaps in the interact...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/bash-sample.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/bash-sample.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `bash-sample` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `bash-sample` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Bash toolview: same geometry/tokens as ToolRow (figma Bash · description), plus the expand-gated terminal card under the summary line.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .card、.terminal、.ioCard、.ioSection、.ioLabel、.ioDivider；自定义属性 --dsl-terminal-font、--dsl-terminal-line-height、--dsl-terminal-output-max-height；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)、[packages/client/ui-tool/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/coverage-tails.client.spec.tsx)、[packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)、[packages/client/ui-tool/tests/toolview-slot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-slot.client.spec.tsx)、[packages/client/ui-tool/tests/web-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/web-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx`、`packages/client/ui-tool/tests/coverage-tails.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 239 行；样式结构包含选择器 .card、.terminal、.ioCard、.ioSection、.ioLabel、.ioDivider；自定义属性 --dsl-terminal-font、--dsl-terminal-line-height、--dsl-terminal-output-max-height；源码顶部原注释（英文，仅作回查线索）：Bash toolview: same geometry/tokens as ToolRow (figma Bash · description), plus the expand-gated terminal card under the summary line.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/bash-sample.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `bash-sample` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Bash toolview registrant: third-party posture over the keyed toolview hole (ctx.slots.register + ToolRowProps only — never imports the chat domain). Product chrome matches ToolRow / Think (figma: Bash · {description}). A bash call normally declares the term...”；固定提交中扫描到的声明包括 `BashRow`、`bashToolviewSample`、`leadingFor`、`stateStatus`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/coverage-tails.client.spec.tsx)、[packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/coverage-tails.client.spec.tsx`、`packages/client/ui-tool/tests/terminal-card.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/coverage-tails.client.spec.tsx`、`packages/client/ui-tool/tests/terminal-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `BashRow`、`bashToolviewSample`、`leadingFor`、`stateStatus`；源码顶部原注释（英文，仅作回查线索）：Bash toolview registrant: third-party posture over the keyed toolview hole (ctx.slots.register + ToolRowProps only — never imports the chat domain). Product chrome matches ToolRow / Think (figma: Bash · {description}). A bash call normally declares the term...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/file-mutation-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/file-mutation-row.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `file-mutation-row` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“File-mutation toolview registrant: the keyed toolview hole for the edit and write tools. The row composes the shared ToolRow (chrome, running sweep, whole-row expand) and feeds it the applied diff as ToolRow's diff card material, so the change renders throu...”；固定提交中扫描到的声明包括 `FileMutationRow`、`fileMutationToolview`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/diff-card.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/diff-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 73 行；扫描到的声明包括 `FileMutationRow`、`fileMutationToolview`；源码顶部原注释（英文，仅作回查线索）：File-mutation toolview registrant: the keyed toolview hole for the edit and write tools. The row composes the shared ToolRow (chrome, running sweep, whole-row expand) and feeds it the applied diff as ToolRow's diff card material, so the change renders throu...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/plan-summary.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/plan-summary.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `plan-summary` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Pure plan derivation for the todo_write row's one-line summary. Several items may be in_progress at once — parallel work runs concurrent tasks, so a summary built from one active item would silently drop the rest. The plan strip header derives its own count...”；固定提交中扫描到的声明包括 `PlanItemLike`、`PlanSummary`、`planSummary`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-tool/src/client/tool/toolviews/todo-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/todo-row.tsx)、[packages/client/ui-tool/tests/todo-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/todo-row.client.spec.tsx)
- 对应测试：[packages/client/ui-tool/tests/todo-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/todo-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/tool/toolviews/todo-row.tsx`、`packages/client/ui-tool/tests/todo-row.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/todo-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的声明包括 `PlanItemLike`、`PlanSummary`、`planSummary`；源码顶部原注释（英文，仅作回查线索）：Pure plan derivation for the todo_write row's one-line summary. Several items may be in_progress at once — parallel work runs concurrent tasks, so a summary built from one active item would silently drop the rest. The plan strip header derives its own count...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/read-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/read-row.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `read-row` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Read toolview registrant: the keyed toolview hole for the read tool. The row composes the shared ToolRow (chrome, running sweep, whole-row expand) and feeds it the file's line-numbered, syntax-highlighted content as ToolRow's read card material, so it rende...”；固定提交中扫描到的声明包括 `ReadRow`、`readToolview`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/read-card.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/read-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `ReadRow`、`readToolview`；源码顶部原注释（英文，仅作回查线索）：Read toolview registrant: the keyed toolview hole for the read tool. The row composes the shared ToolRow (chrome, running sweep, whole-row expand) and feeds it the file's line-numbered, syntax-highlighted content as ToolRow's read card material, so it rende...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/search-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/search-row.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `search-row` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Search toolview registrant: the keyed toolview hole for the grep and glob tools. One SearchRow component registered under both, since both declare the same card: 'search' render intent and render as one visual object; the derived model's kind decides the ca...”；固定提交中扫描到的声明包括 `SearchRow`、`searchToolview`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/search-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/search-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/search-card.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/search-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `SearchRow`、`searchToolview`；源码顶部原注释（英文，仅作回查线索）：Search toolview registrant: the keyed toolview hole for the grep and glob tools. One SearchRow component registered under both, since both declare the same card: 'search' render intent and render as one visual object; the derived model's kind decides the ca...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/todo-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/todo-row.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `todo-row` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“todo_write toolview: plan-flavored summary row replacing the generic "Tool call" card, registered into the keyed 'tool.call.toolview' hole like the bash sample (a product registration, not a sample). The row composes ToolRow (chrome, running sweep, whole-ro...”；固定提交中扫描到的声明包括 `TodoRow`、`todoToolview`、`isItem`、`summarize`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/todo-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/todo-row.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/todo-row.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/todo-row.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 98 行；扫描到的声明包括 `TodoRow`、`todoToolview`、`isItem`、`summarize`；源码顶部原注释（英文，仅作回查线索）：todo_write toolview: plan-flavored summary row replacing the generic "Tool call" card, registered into the keyed 'tool.call.toolview' hole like the bash sample (a product registration, not a sample). The row composes ToolRow (chrome, running sweep, whole-ro...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/client/tool/toolviews/web-row.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/tool/toolviews/web-row.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 Web 界面（`web-row`） 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：源码顶部注释把它定位为“Web toolview registrant: the keyed toolview hole for the web_search and web_fetch tools. Registered under BOTH, since both declare the one web render intent and render through the one WebBlock family; the row discriminates on the toolName only to pick its i...”；固定提交中扫描到的声明包括 `WebRow`、`webToolview`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)、[packages/client/ui-tool/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/apply.ts)
- 对应测试：[packages/client/ui-tool/tests/web-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/web-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-tool/src/client/apply.ts`、`packages/client/ui-tool/tests/web-card.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-tool/tests/web-card.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `WebRow`、`webToolview`；源码顶部原注释（英文，仅作回查线索）：Web toolview registrant: the keyed toolview hole for the web_search and web_fetch tools. Registered under BOTH, since both declare the one web render intent and render through the one WebBlock family; the row discriminates on the toolName only to pick its i...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具呈现模型
- 这个文件有什么用：它为工具结果准备可展示的 `css-modules.d` 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。
- 为什么这样设计：工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着所在包的入口或服务确认状态如何进入 UI，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser-only Tool UI plugin.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-tool/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser-only Tool UI plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-tool. @module @deepseek-ai/dsh-client-ui-tool/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-tool. @module @deepseek-ai/dsh-client-ui-tool/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/ask-question-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/ask-question-row.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“AskQuestionRow”、“running call reads waiting (args-independent: the composer takeover shows the questions)”、“settled result counts answered entries (selected choices or custom text)”、“skipped questions (no selection, no custom) stay out of the answered count”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AskQuestionRow”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `rowProps`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 139 行；扫描到的声明包括 `rowProps`；扫描到的测试主题包括 “AskQuestionRow”、“running call reads waiting (args-independent: the composer takeover shows the questions)”、“settled result counts answered entries (selected choices or custom text)”、“skipped questions (no selection, no custom) stay out of the answered count”、“user cancellation names the verdict instead of the generic failed shape”、“a turn abort while pending reads interrupted with stopped semantics”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“todo_write assembly (product registrations, no outlet twins)”、“reaches the keyed toolview row and the dock plan strip, and the strip follows projectio...”、“terminal card assembly”、“both the keyed bash row and the fallback row reach the terminal card through the whole-...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“todo_write assembly (product registrations, no outlet twins)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `ResizeObserverStub`、`AppRoot`、`bench`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 159 行；扫描到的声明包括 `ResizeObserverStub`、`AppRoot`、`bench`；扫描到的测试主题包括 “todo_write assembly (product registrations, no outlet twins)”、“reaches the keyed toolview row and the dock plan strip, and the strip follows projection retirement”、“terminal card assembly”、“both the keyed bash row and the fallback row reach the terminal card through the whole-row expand”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“run_code sub-calls through the real chat machinery”、“renders the code-variant parent row with the description summary and nested sub-rows”、“renders Cordis sub-calls with lifecycle titles over the generic variants”、“expanding the code row reveals the program body verbatim (shiki-tokenized)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“run_code sub-calls through the real chat machinery”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Code Mode sub-call acceptance on the REAL machinery stack (same bench as chat-toolview-slot.spec): a run_code result renders the 'code' variant row (description summary, program body), its logged sub-dispatches render as always-vis...”；固定提交中扫描到的声明包括 `ResizeObserverStub`、`snapshotWith`、`AppRoot`、`bench`、`mountApp`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 326 行；扫描到的声明包括 `ResizeObserverStub`、`snapshotWith`、`AppRoot`、`bench`、`mountApp`；扫描到的测试主题包括 “run_code sub-calls through the real chat machinery”、“renders the code-variant parent row with the description summary and nested sub-rows”、“renders Cordis sub-calls with lifecycle titles over the generic variants”、“expanding the code row reveals the program body verbatim (shiki-tokenized)”、“an isError sub-call renders the error state dot exactly like a failed native row”、“a file sub-row click opens the host path; bash sub-rows do not open details”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Code Mode sub-call acceptance on the REAL machinery stack (same bench as chat-toolview-slot.spec): a run_code result renders the 'code' variant row (description summary, program body), its logged sub-dispatches render as always-vis...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/coverage-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/coverage-tails.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“Tool presentation tails”、“ToolRow stopped state renders the warning dot in the leading slot”、“a settled others-variant row renders the sparkle icon in the leading slot”、“BashRow summarizes the description without a row click target”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Tool presentation tails”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Tool presentation branch tails not reached by the main acceptance specs.”；固定提交中扫描到的声明包括 `listStore`、`bashProps`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 116 行；扫描到的声明包括 `listStore`、`bashProps`；扫描到的测试主题包括 “Tool presentation tails”、“ToolRow stopped state renders the warning dot in the leading slot”、“a settled others-variant row renders the sparkle icon in the leading slot”、“BashRow summarizes the description without a row click target”、“BashRow carries data-state for running and StateDots for error/stopped”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Tool presentation branch tails not reached by the main acceptance specs.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“diffCardModel”、“derives a running card from the call view alone”、“derives a settled card from the result view, which replaces the call-time diff”、“renders a settled diff even when the window dropped the call head”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“diffCardModel”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The diff render intent on the web side: the pure diffCardModel derivation over callView/resultView, and both conversation render sites that consume it — the chat tool row's expanded body (GenericToolCard / FileMutationRow) and the ...”；固定提交中扫描到的声明包括 `mount`、`snapshot`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 390 行；扫描到的声明包括 `mount`、`snapshot`；扫描到的测试主题包括 “diffCardModel”、“derives a running card from the call view alone”、“derives a settled card from the result view, which replaces the call-time diff”、“renders a settled diff even when the window dropped the call head”、“returns null for every non-diff call: no views, generic views, unknown cards”、“falls back to null for a malformed diff payload off the wire”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The diff render intent on the web side: the pure diffCardModel derivation over callView/resultView, and both conversation render sites that consume it — the chat tool row's expanded body (GenericToolCard / FileMutationRow) and the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“readCardModel”、“derives the card from a settled read result view”、“copies the lines into the primitive shape rather than aliasing the frozen slice”、“takes the result view\”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“readCardModel”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The read render intent on the web side: the pure readCardModel derivation over the settled result view, and both conversation render sites that consume it — the chat tool row (the keyed ReadRow and the GenericToolCard fallback, eac...”；固定提交中扫描到的声明包括 `contentTexts`、`mount`、`snapshot`；本地静态 import 图显示它直接依赖 13 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 364 行；扫描到的声明包括 `contentTexts`、`mount`、`snapshot`；扫描到的测试主题包括 “readCardModel”、“derives the card from a settled read result view”、“copies the lines into the primitive shape rather than aliasing the frozen slice”、“takes the result view\”、“relativizes a workspace-rooted path label, and leaves others as authored”、“abbreviates a leftover POSIX home path label”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The read render intent on the web side: the pure readCardModel derivation over the settled result view, and both conversation render sites that consume it — the chat tool row (the keyed ReadRow and the GenericToolCard fallback, eac...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/search-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/search-card.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“searchCardModel”、“derives a matches card from the grep result view”、“derives a paths card from the glob result view, carrying the truncation signal”、“carries the result view\”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“searchCardModel”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The search render intent on the web side: the pure searchCardModel derivation over resultView, and the conversation render sites that consume it — the chat tool row (GenericToolCard's fallback body and SearchRow, both composing the...”；固定提交中扫描到的声明包括 `searchKindOf`、`searchRows`、`mount`、`snapshot`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 463 行；扫描到的声明包括 `searchKindOf`、`searchRows`、`mount`、`snapshot`；扫描到的测试主题包括 “searchCardModel”、“derives a matches card from the grep result view”、“derives a paths card from the glob result view, carrying the truncation signal”、“carries the result view\”、“returns null for every non-search call: running, no views, generic, terminal, unknown cards”、“returns null for a card:search view whose shape this version does not compile”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The search render intent on the web side: the pure searchCardModel derivation over resultView, and the conversation render sites that consume it — the chat tool row (GenericToolCard's fallback body and SearchRow, both composing the...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“terminalCardModel”、“derives a running card from the call view alone”、“derives a settled card from both sides, carrying the exit status”、“flags a failing exit as terminalFailed; clean exits and running cards are not”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“terminalCardModel”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The terminal render intent on the web side: the pure terminalCardModel derivation over callView/resultView, and both conversation render sites that consume it — the chat tool row's expanded body (GenericToolCard / BashRow) and the ...”；固定提交中扫描到的声明包括 `runStateOf`、`mount`、`snapshot`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 691 行；扫描到的声明包括 `runStateOf`、`mount`、`snapshot`；扫描到的测试主题包括 “terminalCardModel”、“derives a running card from the call view alone”、“derives a settled card from both sides, carrying the exit status”、“flags a failing exit as terminalFailed; clean exits and running cards are not”、“takes the result view\”、“resolves the cwd against the session workspace the way the bridge must”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The terminal render intent on the web side: the pure terminalCardModel derivation over callView/resultView, and both conversation render sites that consume it — the chat tool row's expanded body (GenericToolCard / BashRow) and the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/todo-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/todo-row.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“planSummary”、“counts done/total and names the single active item with no extra count”、“reports the extra active count separately when several items are in progress”、“has no hint when nothing is in progress”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“planSummary”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `rowProps`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 158 行；扫描到的声明包括 `rowProps`；扫描到的测试主题包括 “planSummary”、“counts done/total and names the single active item with no extra count”、“reports the extra active count separately when several items are in progress”、“has no hint when nothing is in progress”、“has no hint when the first active item carries no usable content”、“is empty-safe”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-call-tree.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“ToolCallTree”、“owns the root marker, generic fallback, and selected state for a window-truncated call”、“recursively renders a selected leaf without selecting its ancestors”、“abbreviates a POSIX home path in the generic tool summary”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ToolCallTree”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `props`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `props`；扫描到的测试主题包括 “ToolCallTree”、“owns the root marker, generic fallback, and selected state for a window-truncated call”、“recursively renders a selected leaf without selecting its ancestors”、“abbreviates a POSIX home path in the generic tool summary”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“tool-details-render.client”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test adapter for the production conversation.details.tool registration.”；固定提交中扫描到的声明包括 `SessionProviderStub`、`toolChatSnapshot`、`renderToolDetails`；本地静态 import 图显示它直接依赖 5 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/contract/slots.ts)、[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)
- 对应测试：[packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx)、[packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx)、[packages/client/ui-tool/tests/diff-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/diff-card.client.spec.tsx)、[packages/client/ui-tool/tests/read-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/read-card.client.spec.tsx)、[packages/client/ui-tool/tests/search-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/search-card.client.spec.tsx)、[packages/client/ui-tool/tests/terminal-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/terminal-card.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/ui-tool/tests/assembly-surfaces.client.spec.tsx`、`packages/client/ui-tool/tests/chat-code-subcalls.client.spec.tsx`、`packages/client/ui-tool/tests/diff-card.client.spec.tsx`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 73 行；扫描到的声明包括 `SessionProviderStub`、`toolChatSnapshot`、`renderToolDetails`；源码顶部原注释（英文，仅作回查线索）：Test adapter for the production conversation.details.tool registration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/tool-row-styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-row-styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“ToolRow.module.css summary line”、“keeps the summary suffix on one line and unshrunk”、“leaves the truncation to the summary text alone”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ToolRow.module.css summary line”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The one-line contract of the ToolRow summary line as CSS text. jsdom has no layout, so the rendering specs (chat-tool-row.spec.tsx) can pin which spans exist but not whether a narrow row still fits on one line; these read the declarations the layout depends...”；固定提交中扫描到的声明包括 `declarations`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `declarations`；扫描到的测试主题包括 “ToolRow.module.css summary line”、“keeps the summary suffix on one line and unshrunk”、“leaves the truncation to the summary text alone”；源码顶部原注释（英文，仅作回查线索）：The one-line contract of the ToolRow summary line as CSS text. jsdom has no layout, so the rendering specs (chat-tool-row.spec.tsx) can pin which spans exist but not whether a narrow row still fits on one line; these read the declarations the layout depends...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/tool-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-row.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“tool-call-model”、“classifies known tools and falls back to others”、“names each cordis verb instead of leaving it a bare tool call”、“leaves cordis_define to its own keyed toolview”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-call-model”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 468 行；扫描到的测试主题包括 “tool-call-model”、“classifies known tools and falls back to others”、“names each cordis verb instead of leaving it a bare tool call”、“leaves cordis_define to its own keyed toolview”、“has dropped the v2 mount verbs that no longer exist”、“gives the pwsh shell row the bash family treatment with its own title”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/toolview-slot.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-slot.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“keyed toolview hole through the real machinery”、“dispatches registered rows by entryKey and unregistered tools to the GenericToolCard fa...”、“renders top-level Cordis calls with lifecycle titles over the generic variants”、“file-path clicks travel owner openFile → chat inject → workspaces.openPath”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“keyed toolview hole through the real machinery”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The Tool presentation package's acceptance chain on the REAL machinery stack: SlotTestRuntime (cordis Context + SlotRegistry ledger + the ui-renderer renderer) + ui-conversation and ui-tool apply — no outlet twins. Proves the keyed...”；固定提交中扫描到的声明包括 `ResizeObserverStub`、`AppRoot`、`bench`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 249 行；扫描到的声明包括 `ResizeObserverStub`、`AppRoot`、`bench`；扫描到的测试主题包括 “keyed toolview hole through the real machinery”、“dispatches registered rows by entryKey and unregistered tools to the GenericToolCard fallback”、“renders top-level Cordis calls with lifecycle titles over the generic variants”、“file-path clicks travel owner openFile → chat inject → workspaces.openPath”、“bash summary clicks do not open details or host paths”、“a live keyed registration takes over its tool row and unload reverts to the fallback”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The Tool presentation package's acceptance chain on the REAL machinery stack: SlotTestRuntime (cordis Context + SlotRegistry ledger + the ui-renderer renderer) + ui-conversation and ui-tool apply — no outlet twins. Proves the keyed...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/toolview-type-chain.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/toolview-type-chain.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“toolview type negatives (compile-time; body never runs)”、“holds the negative samples as expect-error sites”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“toolview type negatives (compile-time; body never runs)”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The Tool-owned keyed-slot type chain: registration shape and composed atomic-view props. Generic slot-system duals live in ui-slots tests.”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-tool/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/src/client/contract/slots.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-tool/src/client/contract/slots.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的测试主题包括 “toolview type negatives (compile-time; body never runs)”、“holds the negative samples as expect-error sites”；源码顶部原注释（英文，仅作回查线索）：The Tool-owned keyed-slot type chain: registration shape and composed atomic-view props. Generic slot-system duals live in ui-slots tests.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tests/web-card.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/web-card.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工具的具体场景，包括“webCardModel”、“derives a search card from the result view, projecting every source field”、“carries the search truncation flag and an absent answer”、“derives a fetch card from the result view”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“webCardModel”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The web render intent on the web side: the pure webCardModel derivation over resultView, and the conversation render sites that consume it — the keyed WebRow (registered under both web_search and web_fetch), the GenericToolCard ren...”；固定提交中扫描到的声明包括 `mount`、`snapshot`；本地静态 import 图显示它直接依赖 15 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/ui-tool/tests/tool-details-render.client.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tests/tool-details-render.client.tsx)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 313 行；扫描到的声明包括 `mount`、`snapshot`；扫描到的测试主题包括 “webCardModel”、“derives a search card from the result view, projecting every source field”、“carries the search truncation flag and an absent answer”、“derives a fetch card from the result view”、“returns null for a running call, since the web card is result-only”、“returns null for a settled call whose result view is not a web card”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The web render intent on the web side: the pure webCardModel derivation over resultView, and the conversation render sites that consume it — the keyed WebRow (registered under both web_search and web_fetch), the GenericToolCard ren...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-tool/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、工具：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-tool/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-tool/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-tool/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-trajectory

### [packages/client/ui-trajectory/src/client/TrajectoryCell.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryCell.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryCell` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryCell` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Trajectory step cell — 38px row: index · kind tag · text · optional message metrics · elapsed time.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.selected、.index、.tagSlot、.tag、.tagSystem；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryCell.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryCell.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/cell.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/cell.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryCell.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/cell.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 138 行；样式结构包含选择器 .root、.selected、.index、.tagSlot、.tag、.tagSystem；源码顶部原注释（英文，仅作回查线索）：Trajectory step cell — 38px row: index · kind tag · text · optional message metrics · elapsed time.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryCell.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryCell.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryCell` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Legacy standalone trajectory cell retained for direct consumers and specs.”；固定提交中扫描到的声明包括 `TrajectoryCell`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryCell.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryCell.module.css)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)、[packages/client/ui-trajectory/tests/cell.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/cell.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/cell.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/cell.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/tests/cell.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/cell.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `TrajectoryCell`；源码顶部原注释（英文，仅作回查线索）：Legacy standalone trajectory cell retained for direct consumers and specs.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryGroupHeader` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryGroupHeader` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Message / Step group title row inside a turn body.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.title、.description；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 27 行；样式结构包含选择器 .root、.title、.description；源码顶部原注释（英文，仅作回查线索）：Message / Step group title row inside a turn body.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryGroupHeader` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“TrajectoryGroupHeader: "Message" or "Step N" row with optional description.”；固定提交中扫描到的声明包括 `TrajectoryGroupHeaderProps`、`TrajectoryGroupHeader`；本地静态 import 图显示它直接依赖 1 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.module.css)、[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/tests/layout.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `TrajectoryGroupHeaderProps`、`TrajectoryGroupHeader`；源码顶部原注释（英文，仅作回查线索）：TrajectoryGroupHeader: "Message" or "Step N" row with optional description.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTable.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryTable` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryTable` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .split、.tablePane、.historyLoading、.historyLoadingBar、.historyLoadingSpinner、.historyLoadButton；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover、--trajectory-turn-accent、--request-boundary-base-left、--json-tree-property、--json-tree-string；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/table.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/table.client.spec.tsx)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTable.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/table.client.spec.tsx`、`packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 1799 行；样式结构包含选择器 .split、.tablePane、.historyLoading、.historyLoadingBar、.historyLoadingSpinner、.historyLoadButton；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover、--trajectory-turn-accent、--request-boundary-base-left、--json-tree-property、--json-tree-string。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryTable` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Turn-aware trajectory event ledger with a local record inspector.”；固定提交中扫描到的声明包括 `TrajectoryTableProps`、`TrajectoryRequestNumber`、`TrajectoryUsage`、`TrajectoryTable`、`ToolWrenchIcon`；本地静态 import 图显示它直接依赖 7 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryTable.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.module.css)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/table.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/table.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryView.tsx`、`packages/client/ui-trajectory/tests/table.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/table.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 3074 行；扫描到的声明包括 `TrajectoryTableProps`、`TrajectoryRequestNumber`、`TrajectoryUsage`、`TrajectoryTable`、`ToolWrenchIcon`、`InformationIcon`、`CompactedIcon`、`useStableVirtualRowStructure`；源码顶部原注释（英文，仅作回查线索）：Turn-aware trajectory event ledger with a local record inspector.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTimeline.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryTimeline` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryTimeline` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.plot、.labels、.track、.earlierHistory、.empty；自定义属性 --trajectory-assistant-decoding-color、--trajectory-assistant-ttft-color；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 327 行；样式结构包含选择器 .root、.plot、.labels、.track、.earlierHistory、.empty；自定义属性 --trajectory-assistant-decoding-color、--trajectory-assistant-ttft-color。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryTimeline` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Chrome-Network-style overview timeline for focusing the trajectory ledger.”；固定提交中扫描到的声明包括 `TrajectoryTimelineProps`、`TrajectoryTimeline`、`assistantTimingDetail`、`timelineRecordDetail`、`timelineKindLabel`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryTimeline.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.module.css)、[packages/client/ui-trajectory/src/client/layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/layout.ts)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryView.tsx`、`packages/client/ui-trajectory/tests/views.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 730 行；扫描到的声明包括 `TrajectoryTimelineProps`、`TrajectoryTimeline`、`assistantTimingDetail`、`timelineRecordDetail`、`timelineKindLabel`、`formatRecordedTime`、`timelineTooltipLabel`、`orderedRange`；源码顶部原注释（英文，仅作回查线索）：Chrome-Network-style overview timeline for focusing the trajectory ledger.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryToolbar.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryToolbar.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryToolbar` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryToolbar` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.inner、.actions、.toggle、.toggleIcon、.control；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 214 行；样式结构包含选择器 .root、.inner、.actions、.toggle、.toggleIcon、.control。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryToolbar` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Trajectory toolbar: timeline and ledger fold controls.”；固定提交中扫描到的声明包括 `TrajectoryToolbarProps`、`TrajectoryToolbar`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryToolbar.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryToolbar.module.css)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 128 行；扫描到的声明包括 `TrajectoryToolbarProps`、`TrajectoryToolbar`；源码顶部原注释（英文，仅作回查线索）：Trajectory toolbar: timeline and ledger fold controls.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTurn.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurn.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryTurn` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryTurn` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“One turn block: sticky header + padded body with 10px item gap.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.body；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 16 行；样式结构包含选择器 .root、.body；源码顶部原注释（英文，仅作回查线索）：One turn block: sticky header + padded body with 10px item gap.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryTurn` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“TrajectoryTurn: sticky Turn header plus the padded Message/Step body.”；固定提交中扫描到的声明包括 `TrajectoryTurnProps`、`TrajectoryTurn`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTurn.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurn.module.css)、[packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx)、[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/tests/layout.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `TrajectoryTurnProps`、`TrajectoryTurn`；源码顶部原注释（英文，仅作回查线索）：TrajectoryTurn: sticky Turn header plus the padded Message/Step body.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `TrajectoryTurnHeader` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `TrajectoryTurnHeader` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Sticky turn bar: full-bleed ghost-active fill across the panel; title + metric labels sit in a centered 880 content lane (4×71 + 3×12 = 320).”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.inner、.title、.columns、.column；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 48 行；样式结构包含选择器 .root、.inner、.title、.columns、.column；源码顶部原注释（英文，仅作回查线索）：Sticky turn bar: full-bleed ghost-active fill across the panel; title + metric labels sit in a centered 880 content lane (4×71 + 3×12 = 320).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryTurnHeader` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“TrajectoryTurnHeader: sticky per-turn bar with Input/Output/Think/Time labels.”；固定提交中扫描到的声明包括 `TrajectoryTurnHeaderProps`、`TrajectoryTurnHeader`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurnHeader.module.css)、[packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx)、[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx`、`packages/client/ui-trajectory/tests/layout.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `TrajectoryTurnHeaderProps`、`TrajectoryTurnHeader`；源码顶部原注释（英文，仅作回查线索）：TrajectoryTurnHeader: sticky per-turn bar with Input/Output/Think/Time labels.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `TrajectoryView` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Trajectory view: compact summary over a turn-aware event ledger.”；固定提交中扫描到的声明包括 `TrajectoryViewInjected`、`TrajectoryView`、`lastCellIndex`、`timelineBlock`、`partialStructureSignature`；本地静态 import 图显示它直接依赖 12 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/views.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 506 行；扫描到的声明包括 `TrajectoryViewInjected`、`TrajectoryView`、`lastCellIndex`、`timelineBlock`、`partialStructureSignature`、`requestUsage`、`addUsage`；源码顶部原注释（英文，仅作回查线索）：Trajectory view: compact summary over a turn-aware event ledger.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/duration-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/duration-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：固定提交中扫描到的声明包括 `createTrajectoryDurationStore`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts` 和 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/views.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 13 行；扫描到的声明包括 `createTrajectoryDurationStore`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser trajectory plugin contributing one entry to the conversation view slot without defining a service.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 13 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-trajectory/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-trajectory/tests/views.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser trajectory plugin contributing one entry to the conversation view slot without defining a service.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/layout.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `layout` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Trajectory list fold: expand assistant blocks, attach usage to Message, own-duration times, in-flight partial/runningCalls, and group descriptions.”；固定提交中扫描到的声明包括 `TrajectoryGroupModel`、`TrajectoryTurnModel`、`TrajectoryLayoutInput`、`deriveTrajectoryLayout`、`appendTrajectoryPartialLayout`；本地静态 import 图显示它直接依赖 2 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)、[packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)、[packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)、[packages/client/ui-trajectory/tests/table.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/table.client.spec.tsx)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTable.tsx`、`packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx`、`packages/client/ui-trajectory/src/client/TrajectoryView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/layout.client.spec.tsx`、`packages/client/ui-trajectory/tests/table.client.spec.tsx`、`packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 1126 行；扫描到的声明包括 `TrajectoryGroupModel`、`TrajectoryTurnModel`、`TrajectoryLayoutInput`、`deriveTrajectoryLayout`、`appendTrajectoryPartialLayout`、`layoutEntryOrder`、`inputCellDetail`、`attachToolSchema`；源码顶部原注释（英文，仅作回查线索）：Trajectory list fold: expand assistant blocks, attach usage to Message, own-duration times, in-flight partial/runningCalls, and group descriptions.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“trajectory namespace dictionaries (view tab label + toolbar strings).”；固定提交中扫描到的声明包括 `NS`、`TrajectoryKey`、`zh`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryToolbar.tsx`、`packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/views.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `NS`、`TrajectoryKey`、`zh`、`en`；源码顶部原注释（英文，仅作回查线索）：trajectory namespace dictionaries (view tab label + toolbar strings).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/timeline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/timeline.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现时间线（`timeline`） 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Operation-sequence and recorded-time projections for the trajectory overview.”；固定提交中扫描到的声明包括 `TrajectoryTimelineMode`、`TrajectoryTimeRange`、`TrajectoryTimelineSpan`、`TrajectoryTimelineTurnBoundary`、`TrajectoryTimelineModel`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/layout.ts)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)、[packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx`、`packages/client/ui-trajectory/src/client/TrajectoryView.tsx`、`packages/client/ui-trajectory/tests/views.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 200 行；扫描到的声明包括 `TrajectoryTimelineMode`、`TrajectoryTimeRange`、`TrajectoryTimelineSpan`、`TrajectoryTimelineTurnBoundary`、`TrajectoryTimelineModel`、`formatTimelineOffset`、`deriveTrajectoryTimeline`、`trajectoryTimelineFocusIndexes`；源码顶部原注释（英文，仅作回查线索）：Operation-sequence and recorded-time projections for the trajectory overview.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-assistant-definition` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `registerTrajectoryAssistantDefinition`、`initialState`、`compactBlocks`、`hasVisibleContent`、`hasInterruptionEvidence`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 407 行；扫描到的声明包括 `registerTrajectoryAssistantDefinition`、`initialState`、`compactBlocks`、`hasVisibleContent`、`hasInterruptionEvidence`、`addUsage`、`updateChunk`、`closedBoundary`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-compaction-definition` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `registerTrajectoryCompactionDefinitions`、`checkpointId`、`eventCompactionId`、`requestFromState`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)、[packages/compaction/compaction/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/compaction/compaction/src/types.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 143 行；扫描到的声明包括 `registerTrajectoryCompactionDefinitions`、`checkpointId`、`eventCompactionId`、`requestFromState`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-contract.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-contract` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `TrajectoryRequestHeaderState`、`TrajectoryContribution`、`TrajectoryConversationViewNode`、`TrajectorySnapshot`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)、[packages/client/ui-trajectory/src/client/trajectory-request-header-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-request-header-definition.ts)、[packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)、[packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/trajectory-definition-common.ts`、`packages/client/ui-trajectory/src/client/trajectory-request-header-definition.ts`、`packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`、`packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts`、`packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 75 行；扫描到的声明包括 `TrajectoryRequestHeaderState`、`TrajectoryContribution`、`TrajectoryConversationViewNode`、`TrajectorySnapshot`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-definition-common` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `trajectoryNode`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-contract.ts)、[packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts)、[packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts`、`packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts`、`packages/client/ui-trajectory/src/client/trajectory-message-definitions.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`、`packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `trajectoryNode`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-message-definitions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-message-definitions.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：消息模型
- 这个文件有什么用：它定义浏览器端、用户界面、消息的消息或内容块结构，使模型、日志、工具和界面使用同一份消息语义。
- 为什么这样设计：消息是模型、日志、工具和 UI 的共同语言，集中定义可以避免每一层都做一套不兼容的内容判断。
- 文件级设计证据：固定提交中扫描到的声明包括 `registerTrajectoryMessageDefinitions`、`applySplice`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)、[packages/core/agent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/types.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-trajectory/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的声明包括 `registerTrajectoryMessageDefinitions`、`applySplice`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-preview.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-preview.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-preview` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Bounded Markdown-to-text projection shared by trajectory consumers.”；固定提交中扫描到的声明包括 `trajectoryPreviewText`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)、[packages/client/ui-trajectory/src/client/trajectory-search-index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-search-index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/table.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/table.client.spec.tsx)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTable.tsx`、`packages/client/ui-trajectory/src/client/trajectory-search-index.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/table.client.spec.tsx`、`packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `trajectoryPreviewText`；源码顶部原注释（英文，仅作回查线索）：Bounded Markdown-to-text projection shared by trajectory consumers.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-record` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Shared trajectory record data and formatting contracts.”；固定提交中扫描到的声明包括 `TrajectoryCellKind`、`AssistantMetricDetail`、`TrajectorySourceBlock`、`TrajectoryCellProps`、`trajectoryRecordId`；本地静态 import 图显示它直接依赖 1 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryCell.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryCell.tsx)、[packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)、[packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/cell.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/cell.client.spec.tsx)、[packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryCell.tsx`、`packages/client/ui-trajectory/src/client/TrajectoryTable.tsx`、`packages/client/ui-trajectory/src/client/TrajectoryTimeline.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/cell.client.spec.tsx`、`packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `TrajectoryCellKind`、`AssistantMetricDetail`、`TrajectorySourceBlock`、`TrajectoryCellProps`、`trajectoryRecordId`、`formatDurationMillis`、`formatElapsedSeconds`；源码顶部原注释（英文，仅作回查线索）：Shared trajectory record data and formatting contracts.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-request-header-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-request-header-definition.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-request-header-definition` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `registerTrajectoryRequestHeaderDefinition`、`requestPrompt`、`promptChange`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-contract.ts)、[packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的声明包括 `registerTrajectoryRequestHeaderDefinition`、`requestPrompt`、`promptChange`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-search-index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-search-index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-search-index` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Incremental full-text index for the trajectory ledger.”；固定提交中扫描到的声明包括 `TrajectorySearchIndex`、`searchableJson`、`sameSources`、`markdownPreview`、`resultPreview`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/layout.ts)、[packages/client/ui-trajectory/src/client/trajectory-preview.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-preview.ts)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 133 行；扫描到的声明包括 `TrajectorySearchIndex`、`searchableJson`、`sameSources`、`markdownPreview`、`resultPreview`、`recordSources`；源码顶部原注释（英文，仅作回查线索）：Incremental full-text index for the trajectory ledger.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-snapshot-builder` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `EMPTY_TRAJECTORY_SNAPSHOT`、`TrajectorySnapshotBuilder`、`trajectoryViewDefinition`、`registerTrajectoryConversationView`、`stepKey`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-contract.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)、[packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryView.tsx`、`packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`、`packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 284 行；扫描到的声明包括 `EMPTY_TRAJECTORY_SNAPSHOT`、`TrajectorySnapshotBuilder`、`trajectoryViewDefinition`、`registerTrajectoryConversationView`、`stepKey`、`headerStepKey`、`headerFor`、`applyHeader`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-tool-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-tool-definition.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现工具（`trajectory-tool-definition`） 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：固定提交中扫描到的声明包括 `registerTrajectoryToolDefinition`、`rootCall`、`rootResult`、`locationTurn`、`locationStep`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-definition-common.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-definition-common.ts)、[packages/core/tools/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/types.ts)、[packages/client/ui-trajectory/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/index.ts)
- 对应测试：[packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/index.ts`、`packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 273 行；扫描到的声明包括 `registerTrajectoryToolDefinition`、`rootCall`、`rootResult`、`locationTurn`、`locationStep`、`childCall`、`childResult`、`acceptsEdge`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/trajectory-virtual-rows.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-virtual-rows.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `trajectory-virtual-rows` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：源码顶部注释把它定位为“Pure projection from trajectory records to measurable virtual ledger rows.”；固定提交中扫描到的声明包括 `VirtualizableTrajectoryRecord`、`TrajectoryVirtualRowEntry`、`TrajectoryVirtualRow`、`trajectoryVirtualRecordKey`、`groupTrajectoryVirtualRows`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)、[packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)、[packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts)
- 对应测试：[packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryTable.tsx`、`packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 83 行；扫描到的声明包括 `VirtualizableTrajectoryRecord`、`TrajectoryVirtualRowEntry`、`TrajectoryVirtualRow`、`trajectoryVirtualRecordKey`、`groupTrajectoryVirtualRows`；源码顶部原注释（英文，仅作回查线索）：Pure projection from trajectory records to measurable virtual ledger rows.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/client/views.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/views.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `views` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `views` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Full-bleed, fixed-height host for the trajectory ledger.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.ledger；自定义属性 --dsh-trajectory-toolbar-height、--dsh-trajectory-bottom-clearance；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-trajectory/src/client/TrajectoryView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 28 行；样式结构包含选择器 .root、.ledger；自定义属性 --dsh-trajectory-toolbar-height、--dsh-trajectory-bottom-clearance；源码顶部原注释（英文，仅作回查线索）：Full-bleed, fixed-height host for the trajectory ledger.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：轨迹界面逻辑
- 这个文件有什么用：它实现 `css-modules.d` 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。
- 为什么这样设计：轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着所在包的入口或服务确认状态如何进入 UI，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser-only trajectory plugin.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 对应测试：[packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-trajectory/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-trajectory/tests/views.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-trajectory/tests/views.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser-only trajectory plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-trajectory. @module @deepseek-ai/dsh-client-ui-trajectory/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-trajectory. @module @deepseek-ai/dsh-client-ui-trajectory/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/cell.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/cell.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“formatDurationMillis”、“formats exact millisecond labels with thousands separators”、“formatElapsedSeconds”、“formats known durations and uses an em dash when absent”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“formatDurationMillis”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryCell.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryCell.tsx)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-trajectory/src/client/TrajectoryCell.tsx`、`packages/client/ui-trajectory/src/client/trajectory-record.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的测试主题包括 “formatDurationMillis”、“formats exact millisecond labels with thousands separators”、“formatElapsedSeconds”、“formats known durations and uses an em dash when absent”、“TrajectoryCell”、“renders index, kind tag, text, and time for a Tool row”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/client-bundle.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/client-bundle.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、Bundle 组合的具体场景，包括“tsdown client artifact”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tsdown client artifact”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `readBundle`、`loadArtifact`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-primitives/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 111 行；扫描到的声明包括 `readBundle`、`loadArtifact`；扫描到的测试主题包括 “tsdown client artifact”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/conversation-definitions.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、对话的具体场景，包括“Trajectory conversation Definitions”、“assembles streaming usage, preserves retry facts, and materializes interruption”、“classifies a cancellation-finalized prefix as an interrupted request result”、“keeps parallel interrupted roots and nests Code Dispatch results”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Trajectory conversation Definitions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`at`、`assembler`、`snapshot`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts)、[packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-trajectory/src/client/trajectory-assistant-definition.ts`、`packages/client/ui-trajectory/src/client/trajectory-compaction-definition.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 319 行；扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`at`、`assembler`、`snapshot`、`assistantMessage`；扫描到的测试主题包括 “Trajectory conversation Definitions”、“assembles streaming usage, preserves retry facts, and materializes interruption”、“classifies a cancellation-finalized prefix as an interrupted request result”、“keeps parallel interrupted roots and nests Code Dispatch results”、“assembles compaction lifecycle, checkpoint replacement, and orphan interruption”、“classifies claimed inbox input as steering and consumes one inherited prompt change”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/layout.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/layout.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“TrajectoryTurnHeader”、“renders Turn N and the four metric column labels”、“TrajectoryGroupHeader”、“renders title and optional description”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TrajectoryTurnHeader”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx)、[packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-trajectory/src/client/TrajectoryGroupHeader.tsx`、`packages/client/ui-trajectory/src/client/TrajectoryTurn.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 552 行；扫描到的测试主题包括 “TrajectoryTurnHeader”、“renders Turn N and the four metric column labels”、“TrajectoryGroupHeader”、“renders title and optional description”、“omits the description node when absent”、“TrajectoryTurn”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/snapshot-builder.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“TrajectorySnapshotBuilder”、“inherits one request header across requests without repeating its prompt change”、“indexes exact step headers and the active tool schema without backward scans”、“applies session boundaries and turn errors with linear request indexes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TrajectorySnapshotBuilder”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `assistantRequest`、`contribution`、`stepLocation`、`compactionRequest`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-trajectory/src/client/trajectory-contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-contract.ts)、[packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-trajectory/src/client/trajectory-contract.ts`、`packages/client/ui-trajectory/src/client/trajectory-snapshot-builder.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 237 行；扫描到的声明包括 `assistantRequest`、`contribution`、`stepLocation`、`compactionRequest`；扫描到的测试主题包括 “TrajectorySnapshotBuilder”、“inherits one request header across requests without repeating its prompt change”、“indexes exact step headers and the active tool schema without backward scans”、“applies session boundaries and turn errors with linear request indexes”、“keeps cached contribution order across content updates and structural inserts”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/table.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/table.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“TrajectoryTable”、“shows a muted placeholder for an assistant response containing only tool calls”、“shows assistant timing facts after keyboard selection”、“shows a tool record Duration as exact milliseconds”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“TrajectoryTable”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/TrajectoryTable.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/TrajectoryTable.tsx)、[packages/client/ui-trajectory/src/client/layout.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/layout.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-trajectory/src/client/TrajectoryTable.tsx`、`packages/client/ui-trajectory/src/client/layout.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 874 行；扫描到的测试主题包括 “TrajectoryTable”、“shows a muted placeholder for an assistant response containing only tool calls”、“shows assistant timing facts after keyboard selection”、“shows a tool record Duration as exact milliseconds”、“breaks output tokens into labeled reasoning and content rows”、“marks Summary scroll regions for interaction-only scrollbar thumbs”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/views.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/views.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“plugin registration”、“registers trajectory after chat on the ring”、“fiber disposal removes the tab and leaves chat standing”、“shares one browser-wide duration preference across session injections”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“plugin registration”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `historySnapshot`、`standaloneHistory`、`standaloneDuration`、`fakeSession`、`emptySessions`；本地静态 import 图显示它直接依赖 18 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1208 行；扫描到的声明包括 `historySnapshot`、`standaloneHistory`、`standaloneDuration`、`fakeSession`、`emptySessions`、`emptyWorkspaces`、`standaloneProps`、`bench`；扫描到的测试主题包括 “plugin registration”、“registers trajectory after chat on the ring”、“fiber disposal removes the tab and leaves chat standing”、“shares one browser-wide duration preference across session injections”、“reports whether loading older history changed the Trajectory snapshot”、“tab switching in ConversationRoot”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tests/virtual-rows.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“trajectory virtual rows”、“groups zero-height request boundaries with the following content row”、“retains terminal request-boundary clearance as a measurable row”、“uses the rendered collapsed-summary height”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“trajectory virtual rows”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Measurable virtual-row grouping and durable identity contracts.”；固定提交中扫描到的声明包括 `record`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/ui-trajectory/src/client/trajectory-record.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-record.ts)、[packages/client/ui-trajectory/src/client/trajectory-virtual-rows.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/src/client/trajectory-virtual-rows.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-trajectory/src/client/trajectory-record.ts`、`packages/client/ui-trajectory/src/client/trajectory-virtual-rows.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的声明包括 `record`；扫描到的测试主题包括 “trajectory virtual rows”、“groups zero-height request boundaries with the following content row”、“retains terminal request-boundary clearance as a measurable row”、“uses the rendered collapsed-summary height”、“keeps an existing row key stable when older history is prepended”、“keeps the content key when a request boundary joins its row”；源码顶部原注释（英文，仅作回查线索）：Measurable virtual-row grouping and durable identity contracts.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-trajectory/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-trajectory/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-trajectory/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-trajectory/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-user-questions

### [packages/client/ui-user-questions/src/client/PlanReviewPanel.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/PlanReviewPanel.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `PlanReviewPanel` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `PlanReviewPanel` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Plan-review takeover: the waiting-approval card language (amber strip on a floating capsule, right-aligned actions) applied to a reviewed plan. Kept as its own module rather than shared with ui-conversation's ApprovalPanel: the two takeovers agree on tokens...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .frame、.card、.strip、.dot、.body、.footer；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)、[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 123 行；样式结构包含选择器 .frame、.card、.strip、.dot、.body、.footer；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Plan-review takeover: the waiting-approval card language (amber strip on a floating capsule, right-aligned actions) applied to a reviewed plan. Kept as its own module rather than shared with ui-conversation's ApprovalPanel: the two takeovers agree on tokens...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `PlanReviewPanel` 的界面组件或交互逻辑，并导出 `PlanReviewPanelProps`、`PlanReviewPanel`、`tooltip`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：PlanReviewPanel: the composer takeover for a question carrying the plan-review presentation intent. A plan under review is one decision over one body of markdown, so it takes the waiting-approval card shape — tinted strip, content, right-aligned action row ...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“PlanReviewPanel: the composer takeover for a question carrying the plan-review presentation intent. A plan under review is one decision over one body of markdown, so it takes the waiting-approval card shape — tinted strip, content, right-aligned action row ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“PlanReviewPanel: the composer takeover for a question carrying the plan-review presentation intent. A plan under review is one decision over one body of markdown, so it takes the waiting-approval card shape — tinted strip, content, right-aligned action row ...”；固定提交中扫描到的声明包括 `PlanReviewPanelProps`、`PlanReviewPanel`、`tooltip`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-user-questions/src/client/PlanReviewPanel.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/PlanReviewPanel.module.css)、[packages/client/ui-user-questions/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/contract/slots.ts)、[packages/client/ui-user-questions/src/client/QuestionComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/QuestionComposer.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)、[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-user-questions/src/client/QuestionComposer.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `PlanReviewPanelProps`、`PlanReviewPanel`、`tooltip`；源码顶部原注释（英文，仅作回查线索）：PlanReviewPanel: the composer takeover for a question carrying the plan-review presentation intent. A plan under review is one decision over one body of markdown, so it takes the waiting-approval card shape — tinted strip, content, right-aligned action row ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/client/QuestionComposer.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/QuestionComposer.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `QuestionComposer` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `QuestionComposer` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“The takeover seats where the input card sits, centered on the InputBar axis at the shared content width (input card - 32): sides = clearance + 16px so the relation also holds on narrow viewports.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .frame、.card、.cardMinimized、.header、.headerActions、.headingBlock；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover、--dsh-answer-field-padding；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-user-questions/src/client/QuestionComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/QuestionComposer.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)、[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-user-questions/src/client/QuestionComposer.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 458 行；样式结构包含选择器 .frame、.card、.cardMinimized、.header、.headerActions、.headingBlock；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover、--dsh-answer-field-padding；源码顶部原注释（英文，仅作回查线索）：The takeover seats where the input card sits, centered on the InputBar axis at the shared content width (input card - 32): sides = clearance + 16px so the relation also holds on narrow viewports.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/client/QuestionComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/QuestionComposer.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `QuestionComposer` 的界面组件或交互逻辑，并导出 `parseRecommendedLabel`、`QuestionComposer`、`isComposing`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `parseRecommendedLabel`、`QuestionComposer`、`isComposing`、`AnswerField`、`QuestionFlow`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `parseRecommendedLabel`、`QuestionComposer`、`isComposing`、`AnswerField`、`QuestionFlow`；本地静态 import 图显示它直接依赖 4 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx)、[packages/client/ui-user-questions/src/client/QuestionComposer.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/QuestionComposer.module.css)、[packages/client/ui-user-questions/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/index.ts)
- 对应测试：[packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)、[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-user-questions/src/client/index.ts`、`packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 417 行；扫描到的声明包括 `parseRecommendedLabel`、`QuestionComposer`、`isComposing`、`AnswerField`、`QuestionFlow`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/client/contract/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/contract/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“Question-composer slot contract: the registrant-side props composition for the conversation-owned conversation.composer slot, plus the question domain face over the runtime's carrier object. The carrier (PendingWait) owns envelope transport only; the questi...”；固定提交中扫描到的声明包括 `QuestionWait`、`QuestionAnswer`、`PlanReview`、`planReviewOf`、`PendingQuestion`；本地静态 import 图显示它直接依赖 4 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx)
- 对应测试：[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-user-questions/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-user-questions/src/client/PlanReviewPanel.tsx`、`packages/client/ui-user-questions/src/client/QuestionComposer.tsx`、`packages/client/ui-user-questions/src/client/index.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 143 行；扫描到的声明包括 `QuestionWait`、`QuestionAnswer`、`PlanReview`、`planReviewOf`、`PendingQuestion`、`QuestionComposerProps`；源码顶部原注释（英文，仅作回查线索）：Question-composer slot contract: the registrant-side props composition for the conversation-owned conversation.composer slot, plus the question domain face over the runtime's carrier object. The carrier (PendingWait) owns envelope transport only; the questi...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Web question plugin, browser half: QuestionComposer registered as a selector-routed entry of the conversation-declared composer chain, plus the question dictionaries. The selector narrows the owner's currency to the question carrier (matched prop), and the ...”；固定提交中扫描到的声明包括 `inject`、`apply`、`selectQuestion`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-user-questions/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 60 行；扫描到的声明包括 `inject`、`apply`、`selectQuestion`；源码顶部原注释（英文，仅作回查线索）：Web question plugin, browser half: QuestionComposer registered as a selector-routed entry of the conversation-declared composer chain, plus the question dictionaries. The selector narrows the owner's currency to the question carrier (matched prop), and the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“question namespace dictionaries.”；固定提交中扫描到的声明包括 `zh`、`QuestionKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-user-questions/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/index.ts)、[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 对应测试：[packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)、[packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-user-questions/src/client/index.ts`、`packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx`、`packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `zh`、`QuestionKey`、`en`；源码顶部原注释（英文，仅作回查线索）：question namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-user-questions/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-user-questions/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Web question plugin, node half. Deliberately empty. Mounting ask_user_question here put it in the tools registry's GLOBAL layer, so every agent saw it no matter which preset composed it — a two-tool benchmark preset actually presented three, and a locally a...”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-user-questions/tests/node-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/node-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-user-questions/tests/node-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/node-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-user-questions/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-user-questions/tests/node-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-user-questions/tests/node-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Web question plugin, node half. Deliberately empty. Mounting ask_user_question here put it in the tools registry's GLOBAL layer, so every agent saw it no matter which preset composed it — a two-tool benchmark preset actually presented three, and a locally a...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-user-questions. @module @deepseek-ai/dsh-client-ui-user-questions/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-user-questions. @module @deepseek-ai/dsh-client-ui-user-questions/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/browser-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“apply”、“declares the services it binds”、“waits until a live entry declares the composer slot”、“registers the question entry: routing selector, no inject face”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“apply wiring on a real cordis Context + SlotRegistry: QuestionComposer registered as the question entry of the conversation-declared composer slot with ZERO business face (data and verbs ride the dispatched carrier), declaration-aware activation, and fiber-...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-user-questions/src/client/QuestionComposer.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/client/QuestionComposer.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-user-questions/src/client/QuestionComposer.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “apply”、“declares the services it binds”、“waits until a live entry declares the composer slot”、“registers the question entry: routing selector, no inject face”、“teardown unregisters the slot entry”；源码顶部原注释（英文，仅作回查线索）：apply wiring on a real cordis Context + SlotRegistry: QuestionComposer registered as the question entry of the conversation-declared composer slot with ZERO business face (data and verbs ride the dispatched carrier), declaration-aware activation, and fiber-...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/tests/node-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/node-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-user-questions node plugin”、“mounts no model-facing tool”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-user-questions node plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/ui-user-questions/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-user-questions/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/core/tools/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的测试主题包括 “ui-user-questions node plugin”、“mounts no model-facing tool”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/plan-review-panel.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“planReviewOf”、“narrows a plan-review request to its decision, options included”、“leaves the decline absent when the asker offered approve alone”、“declines an empty batch, which the generic flow reports as such”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“planReviewOf”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom The plan-review takeover, driven through the composer entry that routes to it: a request carrying the intent must reach the decision card and answer with the asker's own option labels, and a request that does not (or cannot) must k...”；固定提交中扫描到的声明包括 `wait`、`decidedEnvelope`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/locales/en.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/en.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/connection/src/client/index.ts`、`packages/client/locale/src/locales/en.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 229 行；扫描到的声明包括 `wait`、`decidedEnvelope`；扫描到的测试主题包括 “planReviewOf”、“narrows a plan-review request to its decision, options included”、“leaves the decline absent when the asker offered approve alone”、“declines an empty batch, which the generic flow reports as such”、“PlanReviewPanel”、“renders the plan under a review strip, with none of the quiz affordances”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom The plan-review takeover, driven through the composer entry that routes to it: a request carrying the intent must reach the decision card and answer with the asker's own option labels, and a request that does not (or cannot) must k...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tests/user-questions-composer.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“QuestionComposer”、“collects single, custom, and multi-select answers before one batch submit”、“renders plan detail through the shared assistant Markdown primitive”、“skips individual questions without discarding earlier answers”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“QuestionComposer”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `wait`、`answeredEnvelope`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/locales/en.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/en.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/connection/src/client/index.ts`、`packages/client/locale/src/locales/en.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 394 行；扫描到的声明包括 `wait`、`answeredEnvelope`；扫描到的测试主题包括 “QuestionComposer”、“collects single, custom, and multi-select answers before one batch submit”、“renders plan detail through the shared assistant Markdown primitive”、“skips individual questions without discarding earlier answers”、“keeps IME Enter inside the custom input until composition finishes”、“shows the inline custom input, reports missing answers, and supports pager navigation”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-user-questions/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-user-questions/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-user-questions/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-user-questions/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-workflow-run

### [packages/client/ui-workflow-run/src/client/WorkflowRunPanel.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/WorkflowRunPanel.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `WorkflowRunPanel` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `WorkflowRunPanel` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.runHeader、.runLeading、.runTitle、.runSummary、.statusTail；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 254 行；样式结构包含选择器 .root、.runHeader、.runLeading、.runTitle、.runSummary、.statusTail。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `WorkflowRunPanel` 的界面组件或交互逻辑，并导出 `WorkflowRunInjected`、`WorkflowRunPanelProps`、`WorkflowRunPanel`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `WorkflowRunInjected`、`WorkflowRunPanelProps`、`WorkflowRunPanel`、`dotState`、`readablePhase`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `WorkflowRunInjected`、`WorkflowRunPanelProps`、`WorkflowRunPanel`、`dotState`、`readablePhase`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-workflow-run/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/index.ts)
- 对应测试：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workflow-run/src/client/index.ts`、`packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 467 行；扫描到的声明包括 `WorkflowRunInjected`、`WorkflowRunPanelProps`、`WorkflowRunPanel`、`dotState`、`readablePhase`、`readableMember`、`statusCount`、`memberCount`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、工作流相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser plugin for durable workflow-run Conversation Nodes.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 对应测试：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-workflow-run/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser plugin for durable workflow-run Conversation Nodes.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、工作流提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“workflowRun namespace dictionaries.”；固定提交中扫描到的声明包括 `NS`、`zh`、`en`、`WorkflowRunKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx)、[packages/client/ui-workflow-run/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/index.ts)、[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 对应测试：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx`、`packages/client/ui-workflow-run/src/client/index.ts`、`packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 51 行；扫描到的声明包括 `NS`、`zh`、`en`、`WorkflowRunKey`；源码顶部原注释（英文，仅作回查线索）：workflowRun namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/client/workflow-definition.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/workflow-definition.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：固定提交中扫描到的声明包括 `WorkflowRunStatus`、`WorkflowRunMemberData`、`WorkflowRunPhaseData`、`WorkflowRunChatData`、`workflowPhaseKey`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/workflow/tool-workflow/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/workflow/tool-workflow/src/types.ts)、[packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx)
- 对应测试：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx`、`packages/client/ui-workflow-run/src/client/index.ts`、`packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 193 行；扫描到的声明包括 `WorkflowRunStatus`、`WorkflowRunMemberData`、`WorkflowRunPhaseData`、`WorkflowRunChatData`、`workflowPhaseKey`、`workflowRunDefinition`、`statusFromStopReason`、`statusFromOutcome`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-workflow-run/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-workflow-run/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、工作流相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Durable workflow-run UI plugin, node half.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 对应测试：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-workflow-run/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Durable workflow-run UI plugin, node half.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、工作流必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for the workflow-run UI plugin.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 对应测试：[packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for the workflow-run UI plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tests/workflow-run.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、工作流的具体场景，包括“workflow-run Conversation Definition”、“groups exact phase identities in first-member order and preserves terminal members”、“keeps an update-only tail pending until prepend supplies the unique start”、“produces the same final data through live append as complete replay”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“workflow-run Conversation Definition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`at`、`matched`、`assembler`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-workflow-run/src/client/WorkflowRunPanel.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 885 行；扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`at`、`matched`、`assembler`、`workflowData`、`completeEvents`、`node`；扫描到的测试主题包括 “workflow-run Conversation Definition”、“groups exact phase identities in first-member order and preserves terminal members”、“keeps an update-only tail pending until prepend supplies the unique start”、“produces the same final data through live append as complete replay”、“shows missing terminal facts as interrupted only after the owning Location closes”、“retains a zero-member run as its own completed node”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-workflow-run/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、工作流：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-workflow-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workflow-run/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-workflow-run/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

