# 源文件索引：packages/client（第 5/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 5 部分，覆盖：packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/ui-deliverables

### [packages/client/ui-deliverables/src/client/ProducedFiles.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/ProducedFiles.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ProducedFiles` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ProducedFiles` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Turn-tail produced-files summary: one measured chip lane plus an optional native-folder action below it.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.label、.row、.file、.showFolder、.more；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/ui-deliverables/src/client/ProducedFiles.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/ProducedFiles.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-deliverables/src/client/ProducedFiles.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 105 行；样式结构包含选择器 .root、.label、.row、.file、.showFolder、.more；源码顶部原注释（英文，仅作回查线索）：Turn-tail produced-files summary: one measured chip lane plus an optional native-folder action below it.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/client/ProducedFiles.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/ProducedFiles.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ProducedFiles` 的界面组件或交互逻辑，并导出 `fitProducedFiles`、`ProducedFilesInjected`、`ProducedFilesProps`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：ProducedFiles: the produced-file row a finished turn ends with. The paths come pre-matched by the turn-tail chain from the mutation tools' follow-along locations, never from the closing prose. Clicking one goes through the same openFile the tool rows use — ...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“ProducedFiles: the produced-file row a finished turn ends with. The paths come pre-matched by the turn-tail chain from the mutation tools' follow-along locations, never from the closing prose. Clicking one goes through the same openFile the tool rows use — ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“ProducedFiles: the produced-file row a finished turn ends with. The paths come pre-matched by the turn-tail chain from the mutation tools' follow-along locations, never from the closing prose. Clicking one goes through the same openFile the tool rows use — ...”；固定提交中扫描到的声明包括 `fitProducedFiles`、`ProducedFilesInjected`、`ProducedFilesProps`、`ProducedFiles`、`moreLabel`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-deliverables/src/client/ProducedFiles.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/ProducedFiles.module.css)、[packages/client/ui-deliverables/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/index.ts)
- 对应测试：[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-deliverables/src/client/index.ts`、`packages/client/ui-deliverables/tests/produced-files.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `fitProducedFiles`、`ProducedFilesInjected`、`ProducedFilesProps`、`ProducedFiles`、`moreLabel`；源码顶部原注释（英文，仅作回查线索）：ProducedFiles: the produced-file row a finished turn ends with. The paths come pre-matched by the turn-tail chain from the mutation tools' follow-along locations, never from the closing prose. Clicking one goes through the same openFile the tool rows use — ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Deliverables plugin, browser half: registers the produced-files row into the chat view's turn-tail chain, and provides the chatFileMentions service that links inline-code mentions of produced files in the closing prose. All policy lives here — the derivatio...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 7 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 对应测试：[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-deliverables/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Deliverables plugin, browser half: registers the produced-files row into the chat view's turn-tail chain, and provides the chatFileMentions service that links inline-code mentions of produced files in the closing prose. All policy lives here — the derivatio...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“deliverables namespace dictionaries.”；固定提交中扫描到的声明包括 `NS`、`zh`、`en`、`DeliverablesKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/ui-deliverables/src/client/ProducedFiles.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/ProducedFiles.tsx)、[packages/client/ui-deliverables/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/index.ts)、[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 对应测试：[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-deliverables/src/client/ProducedFiles.tsx`、`packages/client/ui-deliverables/src/client/index.ts`、`packages/client/ui-deliverables/tests/produced-files.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `NS`、`zh`、`en`、`DeliverablesKey`；源码顶部原注释（英文，仅作回查线索）：deliverables namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/client/turn-deliverables.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/turn-deliverables.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与浏览器端、用户界面的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Turn-scoped produced-file Definition and readers. Client-only and model-free: the vocabulary is the mutation tools' own follow-along locations, never the closing prose.”；固定提交中扫描到的声明包括 `DeliverablesTurnData`、`producedForClosing`、`selectProducedFiles`、`deliverablesDefinition`、`basename`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-deliverables/src/client/ProducedFiles.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/client/ProducedFiles.tsx)
- 对应测试：[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-deliverables/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`、`packages/client/ui-primitives/src/index.ts` 和 `packages/client/ui-deliverables/src/client/ProducedFiles.tsx`、`packages/client/ui-deliverables/src/client/index.ts`、`packages/client/ui-deliverables/tests/produced-files.client.spec.tsx` 确认输入输出，最后对照 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 181 行；扫描到的声明包括 `DeliverablesTurnData`、`producedForClosing`、`selectProducedFiles`、`deliverablesDefinition`、`basename`、`producedFileMentions`、`producedPaths`、`onlyPathWithBasename`；源码顶部原注释（英文，仅作回查线索）：Turn-scoped produced-file Definition and readers. Client-only and model-free: the vocabulary is the mutation tools' own follow-along locations, never the closing prose.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-deliverables/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-deliverables/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Deliverables plugin, node half. Registers the response-format guidance that lets the browser half recognize final-response file references. The browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-deliverables/tests/prompt.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/prompt.client.spec.ts)
- 对应测试：[packages/client/ui-deliverables/tests/prompt.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/prompt.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-deliverables/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-deliverables/tests/prompt.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-deliverables/tests/prompt.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 28 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Deliverables plugin, node half. Registers the response-format guidance that lets the browser half recognize final-response file references. The browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-deliverables. @module @deepseek-ai/dsh-client-ui-deliverables/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 对应测试：[packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-deliverables/tests/produced-files.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-deliverables. @module @deepseek-ai/dsh-client-ui-deliverables/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/tests/produced-files.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/produced-files.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“produced-file Turn data”、“deduplicates paths in first-seen order and stops at the closing Assistant seq”、“folds successful diff and generic-edit calls while ignoring reads, failures, and missin...”、“ignores calls without mutation locations, orphan results, and replacement results”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“produced-file Turn data”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `TestTurnDataStore`、`tailOwner`、`TestEventDefinitions`、`TestViewDefinitions`、`at`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 500 行；扫描到的声明包括 `TestTurnDataStore`、`tailOwner`、`TestEventDefinitions`、`TestViewDefinitions`、`at`、`matched`、`call`、`result`；扫描到的测试主题包括 “produced-file Turn data”、“deduplicates paths in first-seen order and stops at the closing Assistant seq”、“folds successful diff and generic-edit calls while ignoring reads, failures, and missing locations”、“ignores calls without mutation locations, orphan results, and replacement results”、“rejects an invalid start match and preserves state for an unrelated update”、“replays a tail page once prepend supplies its missing Turn start”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/tests/prompt.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tests/prompt.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、提示词的具体场景，包括“ui-deliverables node plugin”、“registers final-response file-reference guidance only while mounted”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-deliverables node plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Node-half coverage for the model guidance paired with Web file references.”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/ui-deliverables/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-deliverables/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的测试主题包括 “ui-deliverables node plugin”、“registers final-response file-reference guidance only while mounted”；源码顶部原注释（英文，仅作回查线索）：Node-half coverage for the model guidance paired with Web file references.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-deliverables/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-deliverables/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-deliverables/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-deliverables/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-directory-picker-browse

### [packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `DirectoryBrowser` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `DirectoryBrowser` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Directory-browser dialog (figma 813-23126 family). The shared Modal renders headless here — mask, card, Escape only — and this module owns the figma frame: 680×500 card (viewport-clamped; upsized from the figma 600×420), header (title + crumbs, l3 separator...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .dialog、.editorScope、.header、.title、.crumbBar、.crumbEditZone；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)、[packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`、`packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 428 行；样式结构包含选择器 .dialog、.editorScope、.header、.title、.crumbBar、.crumbEditZone；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Directory-browser dialog (figma 813-23126 family). The shared Modal renders headless here — mask, card, Escape only — and this module owns the figma frame: 680×500 card (viewport-clamped; upsized from the figma 600×420), header (title + crumbs, l3 separator...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `DirectoryBrowser` 的界面组件或交互逻辑，并导出 `DirectoryBrowserProps`、`DirectoryBrowser`、`failureText`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The in-app workspace-directory browser (figma Harness 813-23126 family): a 680×500 dialog (clamped to short/narrow viewports — the Miller row scrolls sideways, the columns scroll down) whose header carries the title, the selection-path breadcrumb, and a cli...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The in-app workspace-directory browser (figma Harness 813-23126 family): a 680×500 dialog (clamped to short/narrow viewports — the Miller row scrolls sideways, the columns scroll down) whose header carries the title, the selection-path breadcrumb, and a cli...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The in-app workspace-directory browser (figma Harness 813-23126 family): a 680×500 dialog (clamped to short/narrow viewports — the Miller row scrolls sideways, the columns scroll down) whose header carries the title, the selection-path breadcrumb, and a cli...”；固定提交中扫描到的声明包括 `DirectoryBrowserProps`、`DirectoryBrowser`、`failureText`、`displayCrumbs`、`separatorOf`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.module.css)、[packages/client/ui-directory-picker-browse/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/flow.ts)
- 对应测试：[packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-directory-picker-browse/src/client/flow.ts`、`packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 1042 行；扫描到的声明包括 `DirectoryBrowserProps`、`DirectoryBrowser`、`failureText`、`displayCrumbs`、`separatorOf`、`levelDirectory`、`draftDirectory`、`readDraft`；扫描到的测试主题包括 “..”；源码顶部原注释（英文，仅作回查线索）：The in-app workspace-directory browser (figma Harness 813-23126 family): a 680×500 dialog (clamped to short/narrow viewports — the Miller row scrolls sideways, the columns scroll down) whose header carries the title, the selection-path breadcrumb, and a cli...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/flow.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“The browse picking occupant (package-internal; the ./client surface exposes only the Loader exports). Same-package tests exercise it directly through this module.”；固定提交中扫描到的声明包括 `BrowseFlowInjected`、`BrowseDirectoryFlow`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx)、[packages/client/ui-directory-picker-browse/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/index.ts)
- 对应测试：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-directory-picker-browse/src/client/index.ts`、`packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 43 行；扫描到的声明包括 `BrowseFlowInjected`、`BrowseDirectoryFlow`；源码顶部原注释（英文，仅作回查线索）：The browse picking occupant (package-internal; the ./client surface exposes only the Loader exports). Same-package tests exercise it directly through this module.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser half of the browse directory-picker backend: fills ui-workspace's two directory-flow holes with the in-app Select Workspace Directory dialog (figma Harness 813-23126 family), driving the node half's host.listDirectory/host.createDirectory primitives...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-browse/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/flow.ts)、[packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)、[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)
- 对应测试：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-directory-picker-browse/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 92 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser half of the browse directory-picker backend: fills ui-workspace's two directory-flow holes with the in-app Select Workspace Directory dialog (figma Harness 813-23126 family), driving the node half's host.listDirectory/host.createDirectory primitives...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-directory-picker-browse/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-directory-picker-browse/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Directory-picker browsing surface, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration. The listing...”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)
- 对应测试：[packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-directory-picker-browse/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 10 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Directory-picker browsing surface, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration. The listing...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、目录必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-directory-picker-browse. @module @deepseek-ai/dsh-client-ui-directory-picker-browse/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-directory-picker-browse. @module @deepseek-ai/dsh-client-ui-directory-picker-browse/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/client-flow.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目录的具体场景，包括“directory-picker-browse client half”、“declares the services it drives”、“fills both directory-flow holes for declarations before or after apply, and leaves with...”、“rolls back the outer injection when the second hole is already occupied”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“directory-picker-browse client half”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`、`owner`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-browse/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/flow.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-directory-picker-browse/src/client/flow.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 232 行；扫描到的声明包括 `bench`、`owner`；扫描到的测试主题包括 “directory-picker-browse client half”、“declares the services it drives”、“fills both directory-flow holes for declarations before or after apply, and leaves with its fiber”、“rolls back the outer injection when the second hole is already occupied”、“rolls back wholesale and reports loudly when a rival injection wins declaration activation”、“rolls back the zh dictionary when a rival already owns the namespace en slot”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tests/directory-browser.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目录的具体场景，包括“DirectoryBrowser”、“renders nothing and launches no listing while initially closed”、“opens at the Host home as one wide column, hides hidden entries, and roots the crumbs a...”、“shows hidden entries when the toggle is on and hides them again on close”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“DirectoryBrowser”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `listingFor`、`mount`、`columns`、`rowButton`、`manualLister`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-directory-picker-browse/src/client/DirectoryBrowser.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1752 行；扫描到的声明包括 `listingFor`、`mount`、`columns`、`rowButton`、`manualLister`；扫描到的测试主题包括 “DirectoryBrowser”、“renders nothing and launches no listing while initially closed”、“opens at the Host home as one wide column, hides hidden entries, and roots the crumbs at Home”、“shows hidden entries when the toggle is on and hides them again on close”、“selects a row into the two-pane view: children preview right, crumbs follow the selection”、“advances one level when a right-column row is picked”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-browse/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、目录：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-browse/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-browse/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-directory-picker-browse/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-directory-picker-native

### [packages/client/ui-directory-picker-native/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/client/flow.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“The native picking occupant (package-internal; the ./client surface exposes only the Loader exports). Same-package tests exercise it directly through this module.”；固定提交中扫描到的声明包括 `NativeFlowInjected`、`NativeDirectoryFlow`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/README.md)、[packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)、[packages/client/ui-directory-picker-native/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/client/index.ts)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)
- 对应测试：[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-directory-picker-native/src/client/index.ts`、`packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `NativeFlowInjected`、`NativeDirectoryFlow`；源码顶部原注释（英文，仅作回查线索）：The native picking occupant (package-internal; the ./client surface exposes only the Loader exports). Same-package tests exercise it directly through this module.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-native/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser half of the native directory-picker backend: fills ui-workspace's two directory-flow holes with a renderless occupant that answers each open by driving host.pickDirectory (the node half's OS chooser) and reporting the one outcome — picked path, canc...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-native/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/client/flow.ts)、[packages/client/ui-workspace/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-workspace/src/client/index.ts)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)
- 对应测试：[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-directory-picker-native/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser half of the native directory-picker backend: fills ui-workspace's two directory-flow holes with a renderless occupant that answers each open by driving host.pickDirectory (the node half's OS chooser) and reporting the one outcome — picked path, canc...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-native/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、目录相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Native directory-picker surface, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration. The OS choose...”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/README.md)、[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)
- 对应测试：[packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-directory-picker-native/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 10 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Native directory-picker surface, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration. The OS choose...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-native/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、目录必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-directory-picker-native. @module @deepseek-ai/dsh-client-ui-directory-picker-native/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-directory-picker-native. @module @deepseek-ai/dsh-client-ui-directory-picker-native/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tests/client-flow.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目录的具体场景，包括“directory-picker-native client half”、“declares the services it drives”、“fills both directory-flow holes for declarations before or after apply, and leaves with...”、“fails loudly instead of deduplicating a duplicate package row”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“directory-picker-native client half”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`、`owner`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-directory-picker-native/src/client/flow.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/client/flow.ts)、[packages/client/ui-directory-picker-native/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-directory-picker-native/src/client/flow.ts`、`packages/client/ui-directory-picker-native/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 236 行；扫描到的声明包括 `bench`、`owner`；扫描到的测试主题包括 “directory-picker-native client half”、“declares the services it drives”、“fills both directory-flow holes for declarations before or after apply, and leaves with its fiber”、“fails loudly instead of deduplicating a duplicate package row”、“rolls back wholesale and reports loudly when a rival injection wins declaration activation”、“rolls back the outer injection when the second hole is already occupied”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-directory-picker-native/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、目录：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-directory-picker-native/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-directory-picker-native/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-directory-picker-native/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-goal

### [packages/client/ui-goal/src/client/GoalBar.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `GoalBar` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `GoalBar` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“GoalBar: the second standalone card in the composer context stack (Figma 1236:32276). Its dock column (card cap minus four insets) matches Todo and the Queue panel.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .dock、.bar、.goalGlyph、.label、.objective、.error；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/ui-goal/src/client/GoalBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-goal/tests/goalbar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goalbar.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-goal/src/client/GoalBar.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goalbar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 127 行；样式结构包含选择器 .dock、.bar、.goalGlyph、.label、.objective、.error；源码顶部原注释（英文，仅作回查线索）：GoalBar: the second standalone card in the composer context stack (Figma 1236:32276). Its dock column (card cap minus four insets) matches Todo and the Queue panel.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/GoalBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `GoalBar` 的界面组件或交互逻辑，并导出 `GoalBarProps`、`GoalBar`、`GoalDockProps`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：GoalBar: the goal indicator docked above the message composer (input dock strip). A present goal shows a goal glyph, a phase label, the truncated objective, and icon actions — resume when paused, edit (inline form in the same strip), and clear. Goal creatio...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“GoalBar: the goal indicator docked above the message composer (input dock strip). A present goal shows a goal glyph, a phase label, the truncated objective, and icon actions — resume when paused, edit (inline form in the same strip), and clear. Goal creatio...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“GoalBar: the goal indicator docked above the message composer (input dock strip). A present goal shows a goal glyph, a phase label, the truncated objective, and icon actions — resume when paused, edit (inline form in the same strip), and clear. Goal creatio...”；固定提交中扫描到的声明包括 `GoalBarProps`、`GoalBar`、`GoalDockProps`、`GoalDock`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/ui-goal/src/client/GoalBar.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.module.css)、[packages/client/ui-goal/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/locales.ts)、[packages/client/ui-goal/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/slots.ts)、[packages/client/ui-goal/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/index.ts)
- 对应测试：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-goal/tests/goalbar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goalbar.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-goal/src/client/index.ts`、`packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goalbar.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goalbar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 187 行；扫描到的声明包括 `GoalBarProps`、`GoalBar`、`GoalDockProps`、`GoalDock`；源码顶部原注释（英文，仅作回查线索）：GoalBar: the goal indicator docked above the message composer (input dock strip). A present goal shows a goal glyph, a phase label, the truncated objective, and icon actions — resume when paused, edit (inline form in the same strip), and clear. Goal creatio...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/GoalCommandInputView.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalCommandInputView.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `GoalCommandInputView` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `GoalCommandInputView` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .row、.stack、.bubble；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/ui-goal/src/client/GoalCommandInputView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalCommandInputView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-goal/tests/goal-command-input.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goal-command-input.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-goal/src/client/GoalCommandInputView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goal-command-input.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 25 行；样式结构包含选择器 .row、.stack、.bubble。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/GoalCommandInputView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalCommandInputView.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `GoalCommandInputView` 的界面组件或交互逻辑，并导出 `GoalCommandInputView`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `GoalCommandInputView`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `GoalCommandInputView`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/ui-goal/src/client/GoalCommandInputView.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalCommandInputView.module.css)、[packages/client/ui-goal/src/client/goal-command-input.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/goal-command-input.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-goal/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/index.ts)
- 对应测试：[packages/client/ui-goal/tests/goal-command-input.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goal-command-input.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-goal/src/client/index.ts`、`packages/client/ui-goal/tests/goal-command-input.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-goal/tests/goal-command-input.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `GoalCommandInputView`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/goal-command-input.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/goal-command-input.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：固定提交中扫描到的声明包括 `GoalCommandInputData`、`goalCommandText`、`goalCommandInputDefinition`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/interaction/commands/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/commands/src/brand.ts)、[packages/client/ui-goal/src/client/GoalCommandInputView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalCommandInputView.tsx)
- 对应测试：[packages/client/ui-goal/tests/goal-command-input.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goal-command-input.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-goal/src/client/GoalCommandInputView.tsx`、`packages/client/ui-goal/src/client/index.ts`、`packages/client/ui-goal/tests/goal-command-input.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-goal/tests/goal-command-input.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 71 行；扫描到的声明包括 `GoalCommandInputData`、`goalCommandText`、`goalCommandInputDefinition`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、目标相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Goal surface plugin, browser half: the GoalBar entry in the conversation.input.dock strip. Projection-mode surface — the live goal arrives through useProjection('goal') (seeded by the history tail page, updated by session/projection frames), so this plugin ...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 10 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-goal/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 100 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Goal surface plugin, browser half: the GoalBar entry in the conversation.input.dock strip. Projection-mode surface — the live goal arrives through useProjection('goal') (seeded by the history tail page, updated by session/projection frames), so this plugin ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、目标提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“goal namespace dictionaries.”；固定提交中扫描到的声明包括 `zh`、`GoalKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/ui-goal/src/client/GoalBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.tsx)、[packages/client/ui-goal/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/index.ts)、[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-goal/tests/goal-command-input.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goal-command-input.client.spec.tsx)、[packages/client/ui-goal/tests/goalbar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goalbar.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-goal/src/client/GoalBar.tsx`、`packages/client/ui-goal/src/client/index.ts`、`packages/client/ui-goal/tests/browser-plugin.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goal-command-input.client.spec.tsx`、`packages/client/ui-goal/tests/goalbar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 34 行；扫描到的声明包括 `zh`、`GoalKey`、`en`；源码顶部原注释（英文，仅作回查线索）：goal namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、目标定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“GoalBar's injected face. The target 'conversation.input.dock' slot is declared (children table) and typed by ui-conversation; this package only contributes the entry, so no SlotMap merge lives here. The live goal value is NOT part of this face — it arrives ...”；固定提交中扫描到的声明包括 `GoalActionResult`、`GoalBarActions`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[packages/client/ui-goal/src/client/GoalBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.tsx)、[packages/client/ui-goal/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/index.ts)、[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-goal/tests/goalbar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goalbar.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-goal/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-goal/src/client/GoalBar.tsx`、`packages/client/ui-goal/src/client/index.ts`、`packages/client/ui-goal/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-goal/tests/goalbar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `GoalActionResult`、`GoalBarActions`；源码顶部原注释（英文，仅作回查线索）：GoalBar's injected face. The target 'conversation.input.dock' slot is declared (children table) and typed by ui-conversation; this package only contributes the entry, so no SlotMap merge lives here. The live goal value is NOT part of this face — it arrives ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-goal/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-goal/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、目标相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Goal surface plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-goal/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Goal surface plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、目标必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-goal. @module @deepseek-ai/dsh-client-ui-goal/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-goal. @module @deepseek-ai/dsh-client-ui-goal/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目标的具体场景，包括“ui-goal browser plugin”、“registers the GoalBar dock, command input Definition, and keyed Chat renderer”、“verbs read the CAS ref from the current projected value at call time”、“verbs read a remounted Remote namespace at action time”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-goal browser plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `makeProjection`、`bench`、`answer`、`RemoteService`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/conversation/event-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/event-registry.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/conversation/event-registry.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 242 行；扫描到的声明包括 `makeProjection`、`bench`、`answer`、`RemoteService`；扫描到的测试主题包括 “ui-goal browser plugin”、“registers the GoalBar dock, command input Definition, and keyed Chat renderer”、“verbs read the CAS ref from the current projected value at call time”、“verbs read a remounted Remote namespace at action time”、“rejects every verb once the Remote namespace is gone”、“a null or absent projection short-circuits every verb without touching the wire”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/tests/goal-command-input.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goal-command-input.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目标的具体场景，包括“goal command input projection”、“builds a separate input Node before the generic command result and restores it on replay”、“ignores other commands and preserves internal multiline arguments”、“keeps the Definition total across required interface and window fallback paths”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“goal command input projection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`entry`、`snapshot`、`node`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/conversation-nodes/chat-snapshot-builder.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/conversation-nodes/chat-snapshot-builder.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/conversation-nodes/chat-snapshot-builder.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 134 行；扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`entry`、`snapshot`、`node`；扫描到的测试主题包括 “goal command input projection”、“builds a separate input Node before the generic command result and restores it on replay”、“ignores other commands and preserves internal multiline arguments”、“keeps the Definition total across required interface and window fallback paths”、“renders the user-style command bubble without ordinary message actions”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/tests/goalbar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/goalbar.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、目标的具体场景，包括“GoalBar”、“renders nothing while loading, absent, or when the goal is complete”、“active goal: goal glyph,”、“single-flights rapid clear clicks and hides the committed goal before its projection ca...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“GoalBar”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom GoalBar behavior: the docked strip above the composer — phase labels, inline edit form, and resume/clear icon actions — driven purely through props, no wire. Loading, absent, and complete goals render nothing.”；固定提交中扫描到的声明包括 `makeGoal`、`makeActions`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/ui-goal/src/client/GoalBar.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/GoalBar.tsx)、[packages/client/ui-goal/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/ui-goal/src/client/GoalBar.tsx`、`packages/client/ui-goal/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 207 行；扫描到的声明包括 `makeGoal`、`makeActions`；扫描到的测试主题包括 “GoalBar”、“renders nothing while loading, absent, or when the goal is complete”、“active goal: goal glyph,”、“single-flights rapid clear clicks and hides the committed goal before its projection catches up”、“edit swaps the strip for a prefilled form; Enter saves, empty stays disabled”、“Esc cancels the edit without calling onEdit”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom GoalBar behavior: the docked strip above the composer — phase labels, inline edit form, and resume/clear icon actions — driven purely through props, no wire. Loading, absent, and complete goals render nothing.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-goal/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、目标：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-goal/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-goal/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-input-trigger

### [packages/client/ui-input-trigger/src/client/MenuView.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `MenuView` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `MenuView` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Trigger candidate menu (figma SLASH 39:26572 MenuDropdown): menu surface, r12, hairline border, shadow-lv3, 4px inset padding; anchored to the composer top edge, left-aligned with the input text. Cells follow .Menu_cell (min-h 40, r10, pad 10/8, gap 8, 14/2...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .menu、.viewport、.item、.active、.sectionTitle、.itemIcon；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/client/MenuView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/input-machine.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-machine.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-input-trigger/src/client/MenuView.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/popup-view.client.spec.tsx`、`packages/client/ui-commands/tests/popup.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 122 行；样式结构包含选择器 .menu、.viewport、.item、.active、.sectionTitle、.itemIcon；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Trigger candidate menu (figma SLASH 39:26572 MenuDropdown): menu surface, r12, hairline border, shadow-lv3, 4px inset padding; anchored to the composer top edge, left-aligned with the input text. Cells follow .Menu_cell (min-h 40, r10, pad 10/8, gap 8, 14/2...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/MenuView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `MenuView` 的界面组件或交互逻辑，并导出 `MenuViewProps`、`MenuView`、`optionId`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Trigger candidate menu: renders the InputTriggerService menu store into the conversation.input.overlay anchor. Closed state renders null (the overlay slot stays mounted); groups render in roster order under localized title rows, pending groups as a loading ...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Trigger candidate menu: renders the InputTriggerService menu store into the conversation.input.overlay anchor. Closed state renders null (the overlay slot stays mounted); groups render in roster order under localized title rows, pending groups as a loading ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Trigger candidate menu: renders the InputTriggerService menu store into the conversation.input.overlay anchor. Closed state renders null (the overlay slot stays mounted); groups render in roster order under localized title rows, pending groups as a loading ...”；固定提交中扫描到的声明包括 `MenuViewProps`、`MenuView`、`optionId`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/client/MenuView.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.module.css)、[packages/client/ui-input-trigger/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/locales.ts)、[packages/client/ui-input-trigger/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/slots.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)
- 对应测试：[packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-input-trigger/src/client/index.ts`、`packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 122 行；扫描到的声明包括 `MenuViewProps`、`MenuView`、`optionId`；源码顶部原注释（英文，仅作回查线索）：Trigger candidate menu: renders the InputTriggerService menu store into the conversation.input.overlay anchor. Closed state renders null (the overlay slot stays mounted); groups render in roster order under localized title rows, pending groups as a loading ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/contract.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：共享测试契约
- 这个文件有什么用：它为浏览器端、用户界面定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。
- 为什么这样设计：多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。
- 文件级设计证据：源码顶部注释把它定位为“Frozen service contract of the slash pipeline. Types only. The InputTriggerService implementation publishes this face as ctx.inputTriggers; sources see registerSource alone, the conversation wiring layer resolves its per-session controller through sessionOf.”；固定提交中扫描到的声明包括 `InputTriggerServiceContract`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)、[packages/client/ui-input-trigger/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/types.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/controller.ts`、`packages/client/ui-input-trigger/src/types.ts` 和 `packages/client/ui-input-trigger/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/service.ts` 确认输入输出，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-commands/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `InputTriggerServiceContract`；源码顶部原注释（英文，仅作回查线索）：Frozen service contract of the slash pipeline. Types only. The InputTriggerService implementation publishes this face as ctx.inputTriggers; sources see registerSource alone, the conversation wiring layer resolves its per-session controller through sessionOf.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：交互控制器
- 这个文件有什么用：它把浏览器端、用户界面、控制器的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。
- 为什么这样设计：把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。
- 文件级设计证据：源码顶部注释把它定位为“InputTriggerController: the per-session half of the trigger pipeline. Owns every piece of mutable interaction state — the authoritative trigger hit (span included; it outlives menu close for space adjudication), the menu store, and the candidate-fetch lifec...”；固定提交中扫描到的声明包括 `SourceRoster`、`InputTriggerControllerDeps`、`InputTriggerController`；本地静态 import 图显示它直接依赖 5 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/core/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/contract.ts)、[packages/client/ui-input-trigger/src/core/detect.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/detect.ts)、[packages/client/ui-input-trigger/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/contract.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/core/contract.ts`、`packages/client/ui-input-trigger/src/core/detect.ts` 和 `packages/client/ui-input-trigger/src/client/contract.ts`、`packages/client/ui-input-trigger/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/service.ts` 确认输入输出，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-commands/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 410 行；扫描到的声明包括 `SourceRoster`、`InputTriggerControllerDeps`、`InputTriggerController`；源码顶部原注释（英文，仅作回查线索）：InputTriggerController: the per-session half of the trigger pipeline. Owns every piece of mutable interaction state — the authoritative trigger hit (span included; it outlives menu close for space adjudication), the menu store, and the candidate-fetch lifec...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Slash trigger plugin, browser half: the InputTriggerService (ctx.inputTriggers) owning trigger detection, the candidate menu, and the pick pipeline; MenuView self-registers into the conversation.input.overlay slot. Frozen pipeline contract in ./contract.ts;...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 10 个源文件，并被 24 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/MenuView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.tsx)、[packages/client/ui-commands/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/contract.ts)
- 对应测试：[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/input-machine.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-machine.client.spec.ts)、[packages/client/ui-conversation/tests/input-matrix.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-matrix.client.spec.tsx)、[packages/client/ui-conversation/tests/input-reference-submit.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-reference-submit.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-commands/src/client/contract.ts`、`packages/client/ui-commands/src/client/popup.ts`、`packages/client/ui-commands/src/client/service.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-commands/tests/browser-plugin.client.spec.ts`、`packages/client/ui-commands/tests/service.client.spec.ts`、`packages/client/ui-conversation/tests/input-bar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Slash trigger plugin, browser half: the InputTriggerService (ctx.inputTriggers) owning trigger detection, the candidate menu, and the pick pipeline; MenuView self-registers into the conversation.input.overlay slot. Frozen pipeline contract in ./contract.ts;...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“slash.menu namespace dictionaries: group titles keyed by source name (the lookup chain returns the key itself, so an unknown source shows its raw name), the pending row, and the listbox aria label.”；固定提交中扫描到的声明包括 `zh`、`MenuKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/client/MenuView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.tsx)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)、[packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx)
- 对应测试：[packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-input-trigger/src/client/MenuView.tsx`、`packages/client/ui-input-trigger/src/client/index.ts`、`packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `zh`、`MenuKey`、`en`；源码顶部原注释（英文，仅作回查线索）：slash.menu namespace dictionaries: group titles keyed by source name (the lookup chain returns the key itself, so an unknown source shows its raw name), the pending row, and the listbox aria label.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/service.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、用户界面的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“InputTriggerService (ctx.inputTriggers): the root half of the trigger pipeline — the stateless source registry plus the per-session controller map. Every piece of mutable interaction state (hit, menu, fetch) lives on the InputTriggerController; the service ...”；固定提交中扫描到的声明包括 `InputTriggerService`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/contract.ts)、[packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/contract.ts`、`packages/client/ui-input-trigger/src/client/controller.ts` 和 `packages/client/ui-input-trigger/src/client/index.ts` 确认输入输出，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-commands/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 107 行；扫描到的声明包括 `InputTriggerService`；源码顶部原注释（英文，仅作回查线索）：InputTriggerService (ctx.inputTriggers): the root half of the trigger pipeline — the stateless source registry plus the per-session controller map. Every piece of mutable interaction state (hit, menu, fetch) lives on the InputTriggerController; the service ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“Overlay-slot contract surface of the slash plugin. The 'conversation.input.overlay' slot is OWNED by the ui-conversation composer entry (declaring is claiming: anchor, children declaration, lifecycle), but the SlotMap type merge lives here: the owner packag...”；固定提交中扫描到的声明包括 `MenuViewInjected`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/core/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/contract.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-input-trigger/src/client/MenuView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx)、[packages/client/ui-attachment/tests/message-image.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-attachment/tests/message-image.client.spec.tsx)、[packages/client/ui-commands/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/browser-plugin.client.spec.ts)、[packages/client/ui-commands/tests/popup-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup-view.client.spec.tsx)、[packages/client/ui-commands/tests/popup.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/popup.client.spec.ts)、[packages/client/ui-commands/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-input-trigger/src/client/MenuView.tsx`、`packages/client/ui-input-trigger/src/client/index.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-attachment/tests/composer-attachments.client.spec.tsx`、`packages/client/ui-attachment/tests/message-image.client.spec.tsx`、`packages/client/ui-commands/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `MenuViewInjected`；源码顶部原注释（英文，仅作回查线索）：Overlay-slot contract surface of the slash plugin. The 'conversation.input.overlay' slot is OWNED by the ui-conversation composer entry (declaring is claiming: anchor, children declaration, lifecycle), but the SlotMap type merge lives here: the owner packag...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/core/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/contract.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：共享测试契约
- 这个文件有什么用：它为浏览器端、用户界面定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。
- 为什么这样设计：多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。
- 文件级设计证据：源码顶部注释把它定位为“Frozen pure-core contract: trigger detection and menu reduction, zero React / DOM / cordis. Types only — implementations live in sibling modules annotated with these aliases; the service shell wires them to ctx.”；固定提交中扫描到的声明包括 `TriggerHit`、`DetectTrigger`、`MenuState`、`MenuEvent`、`MenuReduce`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/types.ts)、[packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/slots.ts)
- 对应测试：[packages/client/ui-input-trigger/tests/core-menu.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-menu.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md` 和入口，再读当前实现，沿着 `packages/client/ui-input-trigger/src/types.ts` 和 `packages/client/ui-input-trigger/src/client/controller.ts`、`packages/client/ui-input-trigger/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/slots.ts` 确认输入输出，最后对照 `packages/client/ui-input-trigger/tests/core-menu.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `TriggerHit`、`DetectTrigger`、`MenuState`、`MenuEvent`、`MenuReduce`、`ExactMatch`；源码顶部原注释（英文，仅作回查线索）：Frozen pure-core contract: trigger detection and menu reduction, zero React / DOM / cordis. Types only — implementations live in sibling modules annotated with these aliases; the service shell wires them to ctx.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/core/detect.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/detect.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Trigger detection pure core. Scans backward from the caret for a live trigger char under the guard tier and applies the word-boundary rules. Zero React / DOM / cordis.”；固定提交中扫描到的声明包括 `detectTrigger`、`boundaryOk`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/core/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/contract.ts)、[packages/client/ui-input-trigger/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/types.ts)、[packages/context/file-reference/src/grammar.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/file-reference/src/grammar.ts)、[packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)
- 对应测试：[packages/client/ui-input-trigger/tests/core-detect.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-detect.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-input-trigger/src/client/controller.ts`、`packages/client/ui-input-trigger/tests/core-detect.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-input-trigger/tests/core-detect.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `detectTrigger`、`boundaryOk`；源码顶部原注释（英文，仅作回查线索）：Trigger detection pure core. Scans backward from the caret for a live trigger char under the guard tier and applies the word-boundary rules. Zero React / DOM / cordis.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/core/menu.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/menu.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Menu reduction pure core. One group per source; generation-gated settlement; empty ready groups auto-close. Zero React / DOM / cordis. Stale or no-op events return the same state reference so store subscribers skip re-renders. Roster protocol: the frozen hi...”；固定提交中扫描到的声明包括 `MENU_CLOSED`、`seedGroups`、`menuReduce`、`exactMatch`、`firstHighlight`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/core/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/contract.ts)、[packages/client/ui-input-trigger/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/types.ts)、[packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)、[packages/client/ui-input-trigger/tests/core-menu.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-menu.client.spec.ts)
- 对应测试：[packages/client/ui-input-trigger/tests/core-menu.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-menu.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-input-trigger/src/client/controller.ts`、`packages/client/ui-input-trigger/tests/core-menu.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-input-trigger/tests/core-menu.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 152 行；扫描到的声明包括 `MENU_CLOSED`、`seedGroups`、`menuReduce`、`exactMatch`、`firstHighlight`、`validHighlight`、`positions`；源码顶部原注释（英文，仅作回查线索）：Menu reduction pure core. One group per source; generation-gated settlement; empty ready groups auto-close. Zero React / DOM / cordis. Stale or no-op events return the same state reference so store subscribers skip re-renders. Roster protocol: the frozen hi...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-input-trigger/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Slash trigger plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Slash trigger plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-input-trigger. @module @deepseek-ai/dsh-client-ui-input-trigger/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-input-trigger. @module @deepseek-ai/dsh-client-ui-input-trigger/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/types.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述浏览器端、用户界面中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Frozen cross-package contract for the input trigger pipeline. Types only — no runtime code. Sources (ui-commands / ui-skill / ui-reference) and the conversation input layer import from here; changes require main-thread arbitration. Providers receive a Clien...”；固定提交中扫描到的声明包括 `ClientSessionContext`、`TriggerChar`、`TriggerPosition`、`PickVia`、`InputTriggerCandidate`；本地静态 import 图显示它直接依赖 1 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/contract.ts)、[packages/client/ui-input-trigger/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/controller.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)
- 对应测试：[packages/client/ui-input-trigger/tests/core-detect.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-detect.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-input-trigger/src/client/contract.ts`、`packages/client/ui-input-trigger/src/client/controller.ts`、`packages/client/ui-input-trigger/src/client/index.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-input-trigger/tests/core-detect.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `ClientSessionContext`、`TriggerChar`、`TriggerPosition`、`PickVia`、`InputTriggerCandidate`、`TokenSpan`、`SubmitImageAttachment`、`CommandClaim`；源码顶部原注释（英文，仅作回查线索）：Frozen cross-package contract for the input trigger pipeline. Types only — no runtime code. Sources (ui-commands / ui-skill / ui-reference) and the conversation input layer import from here; changes require main-thread arbitration. Providers receive a Clien...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“apply”、“declares the sessions and locale dependencies (scope tree + localized menu copy)”、“registers the bilingual menu dictionaries (group titles by source name + the pending row)”、“mounts ctx.inputTriggers once sessions is up, before any conversation service exists”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“apply wiring on a real cordis Context + SlotRegistry: InputTriggerService mounts as ctx.inputTriggers once its sessions dependency is up; the MenuView overlay registration follows the slot declaration, resolves the per-session controller from the slot's ses...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “apply”、“declares the sessions and locale dependencies (scope tree + localized menu copy)”、“registers the bilingual menu dictionaries (group titles by source name + the pending row)”、“mounts ctx.inputTriggers once sessions is up, before any conversation service exists”、“registers MenuView into the overlay and resolves the per-session controller by slot sessionId”、“fiber teardown removes the overlay entry”；源码顶部原注释（英文，仅作回查线索）：apply wiring on a real cordis Context + SlotRegistry: InputTriggerService mounts as ctx.inputTriggers once its sessions dependency is up; the MenuView overlay registration follows the slot declaration, resolves the per-session controller from the slot's ses...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/tests/core-detect.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-detect.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“detectTrigger word boundaries”、“triggers at start of draft”、“triggers after whitespace, newline, and punctuation”、“does not trigger after a word character”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“detectTrigger word boundaries”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“detectTrigger word-boundary, position, guard-tier, and span behavior. URL rule pinned here: '/' is dead when its predecessor is another '/' (second slash of '//') or a ':' itself preceded by a non-whitespace char (scheme separator) — this is the concrete ru...”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/core/detect.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/detect.ts)、[packages/client/ui-input-trigger/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-input-trigger/src/core/detect.ts`、`packages/client/ui-input-trigger/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 126 行；扫描到的测试主题包括 “detectTrigger word boundaries”、“triggers at start of draft”、“triggers after whitespace, newline, and punctuation”、“does not trigger after a word character”、“does not trigger on URL slashes”、“still triggers when a colon is not a scheme separator”；源码顶部原注释（英文，仅作回查线索）：detectTrigger word-boundary, position, guard-tier, and span behavior. URL rule pinned here: '/' is dead when its predecessor is another '/' (second slash of '//') or a ':' itself preceded by a non-whitespace char (scheme separator) — this is the concrete ru...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/tests/core-menu.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/core-menu.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“menuReduce hit”、“opens a new generation with all groups pending”、“re-hit resets ready groups to pending under a bumped generation”、“preserves a hidden group title through re-hit and settlement”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“menuReduce hit”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“menuReduce generation gating, auto-close, silent group removal, cyclic highlight movement, stale/no-op reference identity; exactMatch lookup.”；固定提交中扫描到的声明包括 `open`、`ready`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/ui-input-trigger/src/core/contract.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/contract.ts)、[packages/client/ui-input-trigger/src/core/menu.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/core/menu.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-input-trigger/src/core/contract.ts`、`packages/client/ui-input-trigger/src/core/menu.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 224 行；扫描到的声明包括 `open`、`ready`；扫描到的测试主题包括 “menuReduce hit”、“opens a new generation with all groups pending”、“re-hit resets ready groups to pending under a bumped generation”、“preserves a hidden group title through re-hit and settlement”、“null hit closes; closing an already-closed state is a no-op reference”、“menuReduce source-settled”；源码顶部原注释（英文，仅作回查线索）：menuReduce generation gating, auto-close, silent group removal, cyclic highlight movement, stale/no-op reference identity; exactMatch lookup.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/menu-view.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“MenuView”、“renders null while closed and appears when the store opens”、“renders ready groups as option rows and pending groups as loading rows”、“keeps an opted-out source title hidden while its candidates are pending”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“MenuView”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `openState`、`mount`、`titles`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/MenuView.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/MenuView.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/MenuView.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 234 行；扫描到的声明包括 `openState`、`mount`、`titles`；扫描到的测试主题包括 “MenuView”、“renders null while closed and appears when the store opens”、“renders ready groups as option rows and pending groups as loading rows”、“keeps an opted-out source title hidden while its candidates are pending”、“titles each group with the localized source name, raw name for unknown sources, none for empty ready groups”、“renders contiguous candidate sections once without changing option indexes”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tests/service.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“registerSource”、“throws on a duplicate (trigger, name); same name across triggers is fine”、“disposal frees the name and drops the live menu group in every session controller”、“a source registered after controller birth warms in every live controller”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“registerSource”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Slash pipeline spec over the split architecture. InputTriggerService keeps only the source roster (duplicate throw, disposal dropping live menu groups in every session controller) and per-session controller resolution; all interaction — track → menu store, ...”；固定提交中扫描到的声明包括 `deferredSource`、`readySource`、`controllerBench`、`serviceBench`、`pickBench`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-input-trigger/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/src/client/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-input-trigger/src/client/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 873 行；扫描到的声明包括 `deferredSource`、`readySource`、`controllerBench`、`serviceBench`、`pickBench`、`lexSource`、`menuBench`、`spaceSource`；扫描到的测试主题包括 “registerSource”、“throws on a duplicate (trigger, name); same name across triggers is fine”、“disposal frees the name and drops the live menu group in every session controller”、“a source registered after controller birth warms in every live controller”、“HMR shape: dispose of the registering fiber removes the source”、“sessionOf”；源码顶部原注释（英文，仅作回查线索）：Slash pipeline spec over the split architecture. InputTriggerService keeps only the source roster (duplicate throw, disposal dropping live menu groups in every session controller) and per-session controller resolution; all interaction — track → menu store, ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-input-trigger/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-input-trigger/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-input-trigger/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-input-trigger/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-jobs

### [packages/client/ui-jobs/src/client/JobListAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `JobListAction` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `JobListAction` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.trigger、.triggerOpen、.triggerDot、.count、.menu；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/ui-jobs/src/client/JobListAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)、[packages/client/ui-jobs/tests/job-list-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/job-list-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-jobs/src/client/JobListAction.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts`、`packages/client/ui-jobs/tests/job-list-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 125 行；样式结构包含选择器 .root、.trigger、.triggerOpen、.triggerDot、.count、.menu；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/src/client/JobListAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `JobListAction` 的界面组件或交互逻辑，并导出 `JobListActionProps`、`JobListAction`、`isLive`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `JobListActionProps`、`JobListAction`、`isLive`、`assertNever`、`dotState`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `JobListActionProps`、`JobListAction`、`isLive`、`assertNever`、`dotState`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-jobs/src/client/JobListAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.module.css)、[packages/client/ui-jobs/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/index.ts)
- 对应测试：[packages/client/ui-jobs/tests/job-list-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/job-list-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-jobs/src/client/index.ts`、`packages/client/ui-jobs/tests/job-list-action.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-jobs/tests/job-list-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 183 行；扫描到的声明包括 `JobListActionProps`、`JobListAction`、`isLive`、`assertNever`、`dotState`、`statusLabel`、`formatDuration`、`ordered`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、后台任务相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Background-job plugin, browser half: contributes one session-header action that renders this session's ctx.jobs records. The data arrives entirely through the jobsBySession list mirror, so the plugin issues no RPC and holds no state of its own beyond popove...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-jobs/src/client/JobListAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.tsx)、[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-jobs/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 40 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Background-job plugin, browser half: contributes one session-header action that renders this session's ctx.jobs records. The data arrives entirely through the jobsBySession list mirror, so the plugin issues no RPC and holds no state of its own beyond popove...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、后台任务提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“job namespace dictionaries.”；固定提交中扫描到的声明包括 `NS`、`zh`、`en`、`JobKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/ui-jobs/src/client/JobListAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.tsx)、[packages/client/ui-jobs/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/index.ts)、[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)、[packages/client/ui-jobs/tests/job-list-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/job-list-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-jobs/src/client/JobListAction.tsx`、`packages/client/ui-jobs/src/client/index.ts`、`packages/client/ui-jobs/tests/browser-plugin.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts`、`packages/client/ui-jobs/tests/job-list-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `NS`、`zh`、`en`、`JobKey`；源码顶部原注释（英文，仅作回查线索）：job namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-jobs/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-jobs/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、后台任务相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Background-job list plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dshClient declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-jobs/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Background-job list plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dshClient declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、后台任务必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-jobs. @module @deepseek-ai/dsh-client-ui-jobs/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-jobs/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-jobs. @module @deepseek-ai/dsh-client-ui-jobs/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/browser-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、后台任务的具体场景，包括“ui-job browser half”、“declares the services it binds”、“registers the header action, and fiber teardown removes it (HMR safety)”、“registers both dictionaries under its own namespace and releases them with the fiber”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-job browser half”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ui-job plugin halves: the browser entry's dictionary and header-slot registrations against the real SlotRegistry (with fiber teardown proving removal — HMR safety), the inert node entry, and the invariant companion's ownership reservation.”；固定提交中扫描到的声明包括 `headerEntryIds`、`bench`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-jobs/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-jobs/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 99 行；扫描到的声明包括 `headerEntryIds`、`bench`；扫描到的测试主题包括 “ui-job browser half”、“declares the services it binds”、“registers the header action, and fiber teardown removes it (HMR safety)”、“registers both dictionaries under its own namespace and releases them with the fiber”、“keeps the English dictionary key-identical to the Chinese source of truth”、“ui-job node half”；源码顶部原注释（英文，仅作回查线索）：ui-job plugin halves: the browser entry's dictionary and header-slot registrations against the real SlotRegistry (with fiber teardown proving removal — HMR safety), the inert node entry, and the invariant companion's ownership reservation.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/tests/job-list-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tests/job-list-action.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、后台任务的具体场景，包括“JobListAction visibility”、“renders nothing while the session has no jobs”、“counts only live jobs, and falls back to the total when none are live”、“closes and unmounts when the last job disappears while the list is open”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“JobListAction visibility”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `job`、`props`、`useSessions`、`rowCells`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-jobs/src/client/JobListAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/JobListAction.tsx)、[packages/client/ui-jobs/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-jobs/src/client/JobListAction.tsx`、`packages/client/ui-jobs/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 239 行；扫描到的声明包括 `job`、`props`、`useSessions`、`rowCells`；扫描到的测试主题包括 “JobListAction visibility”、“renders nothing while the session has no jobs”、“counts only live jobs, and falls back to the total when none are live”、“closes and unmounts when the last job disappears while the list is open”、“JobListAction rows”、“orders live jobs by start, then settled jobs newest-first”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-jobs/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、后台任务：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-jobs/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-jobs/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-jobs/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-layout

### [packages/client/ui-layout/src/client/AppFrame.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AppFrame` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AppFrame` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .frame、.sidebarCol、.centerCol、.detailsCol、.handle、.overlayLayer；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/AppFrame.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx)、[packages/client/ui-conversation/tests/image-labels.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/image-labels.client.spec.tsx)、[packages/client/ui-conversation/tests/input-bar.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/input-bar.client.spec.tsx)、[packages/client/ui-conversation/tests/skeleton.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/skeleton.client.spec.tsx)、[packages/client/ui-conversation/tests/views-type-chain.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/tests/views-type-chain.client.spec.tsx)、[packages/client/ui-layout/tests/app-frame.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/app-frame.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-layout/src/client/AppFrame.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-conversation/tests/chat-branch-tails.client.spec.tsx`、`packages/client/ui-conversation/tests/image-labels.client.spec.tsx`、`packages/client/ui-conversation/tests/input-bar.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 119 行；样式结构包含选择器 .frame、.sidebarCol、.centerCol、.detailsCol、.handle、.overlayLayer。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/client/AppFrame.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AppFrame` 的界面组件或交互逻辑，并导出 `AppFrameProps`、`AppFrame`、`CenterColumn`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Three-column shell frame, registered into the built-in 'root' slot (the web shell renders only 'root'). Owns the grid tracks (sidebar | center | details), the drag handles (pointer capture + rAF throttle), the concession chain (columns.ts), and the child-sl...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Three-column shell frame, registered into the built-in 'root' slot (the web shell renders only 'root'). Owns the grid tracks (sidebar | center | details), the drag handles (pointer capture + rAF throttle), the concession chain (columns.ts), and the child-sl...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Three-column shell frame, registered into the built-in 'root' slot (the web shell renders only 'root'). Owns the grid tracks (sidebar | center | details), the drag handles (pointer capture + rAF throttle), the concession chain (columns.ts), and the child-sl...”；固定提交中扫描到的声明包括 `AppFrameProps`、`AppFrame`、`CenterColumn`、`DetailsColumn`、`DragHandle`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/AppFrame.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.module.css)、[packages/client/ui-layout/src/client/columns.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/columns.ts)、[packages/client/ui-layout/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/stores.ts)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)
- 对应测试：[packages/client/ui-layout/tests/app-frame.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/app-frame.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-layout/src/client/index.ts`、`packages/client/ui-layout/tests/app-frame.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/app-frame.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `AppFrameProps`、`AppFrame`、`CenterColumn`、`DetailsColumn`、`DragHandle`；源码顶部原注释（英文，仅作回查线索）：Three-column shell frame, registered into the built-in 'root' slot (the web shell renders only 'root'). Owns the grid tracks (sidebar | center | details), the drag handles (pointer capture + rAF throttle), the concession chain (columns.ts), and the child-sl...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/client/columns.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/columns.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Pure concession-chain column solver for the three-column AppFrame. Chain order is fixed by contract: keep center >= CENTER_MIN by shrinking details, then auto-closing it (derived zero width — preferred width preferences are never rewritten, so widening the ...”；固定提交中扫描到的声明包括 `Columns`、`CENTER_MIN`、`SIDEBAR_MIN`、`SIDEBAR_MAX`、`SIDEBAR_DEFAULT`；本地静态 import 图显示它直接依赖 0 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/AppFrame.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.tsx)、[packages/client/ui-layout/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/stores.ts)、[packages/client/ui-layout/tests/app-frame.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/app-frame.client.spec.tsx)
- 对应测试：[packages/client/ui-layout/tests/app-frame.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/app-frame.client.spec.tsx)、[packages/client/ui-layout/tests/columns.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/columns.client.spec.ts)、[packages/client/ui-layout/tests/layout-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/layout-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-layout/src/client/AppFrame.tsx`、`packages/client/ui-layout/src/client/stores.ts`、`packages/client/ui-layout/tests/app-frame.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/app-frame.client.spec.tsx`、`packages/client/ui-layout/tests/columns.client.spec.ts`、`packages/client/ui-layout/tests/layout-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `Columns`、`CENTER_MIN`、`SIDEBAR_MIN`、`SIDEBAR_MAX`、`SIDEBAR_DEFAULT`、`SIDEBAR_COLLAPSED`、`SIDEBAR_AUTO_COLLAPSE`、`DETAILS_MIN`；源码顶部原注释（英文，仅作回查线索）：Pure concession-chain column solver for the three-column AppFrame. Chain order is fixed by contract: keep center >= CENTER_MIN by shrinking details, then auto-closing it (derived zero width — preferred width preferences are never rewritten, so widening the ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Layout plugin, browser half: one register() call contributes AppFrame into the runtime's built-in 'root' slot and, in the same breath, declares the four child slots (declaration = exclusive render authority), seats the layout store (panel geometry), and wir...”；固定提交中扫描到的声明包括 `SidebarOwnerProps`、`ConvOwnerProps`、`DetailsOwnerProps`、`inject`、`apply`；本地静态 import 图显示它直接依赖 6 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-layout/src/client/AppFrame.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.tsx)、[packages/client/ui-layout/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/service.ts)、[packages/client/ui-conversation/src/client/apply.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/apply.ts)
- 对应测试：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-layout/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-conversation/src/client/apply.ts`、`packages/client/ui-conversation/src/client/contract/slots.ts`、`packages/client/ui-layout/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `SidebarOwnerProps`、`ConvOwnerProps`、`DetailsOwnerProps`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Layout plugin, browser half: one register() call contributes AppFrame into the runtime's built-in 'root' slot and, in the same breath, declares the four child slots (declaration = exclusive render authority), seats the layout store (panel geometry), and wir...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/service.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、用户界面的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“LayoutController: the cross-plugin panel-action face behind ctx.layout. Panel geometry itself lives in the root entry's layout store (stores.ts); the current-session selection lives with the runtime sessions service, and the per-session active view dissolve...”；固定提交中扫描到的声明包括 `PanelActions`、`ILayout`、`LayoutController`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/stores.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)、[packages/client/ui-layout/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/service.client.spec.ts)
- 对应测试：[packages/client/ui-layout/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-layout/README.md` 和入口，再读当前实现，沿着 `packages/client/ui-layout/src/client/stores.ts`、`packages/client/ui-slots/src/index.ts` 和 `packages/client/ui-layout/src/client/index.ts`、`packages/client/ui-layout/tests/service.client.spec.ts` 确认输入输出，最后对照 `packages/client/ui-layout/tests/service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 69 行；扫描到的声明包括 `PanelActions`、`ILayout`、`LayoutController`；源码顶部原注释（英文，仅作回查线索）：LayoutController: the cross-plugin panel-action face behind ctx.layout. Panel geometry itself lives in the root entry's layout store (stores.ts); the current-session selection lives with the runtime sessions service, and the per-session active view dissolve...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/stores.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“The root entry's transient layout store: panel geometry as plain widths in px (0 = closed). Module level exports the factory only — a module-level handle would pin the store's identity in the module cache (a de-facto singleton surviving plugin reloads). reg...”；固定提交中扫描到的声明包括 `createLayoutStore`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-layout/src/client/columns.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/columns.ts)、[packages/client/ui-layout/src/client/AppFrame.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.tsx)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)
- 对应测试：[packages/client/ui-layout/tests/app-frame.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/app-frame.client.spec.tsx)、[packages/client/ui-layout/tests/layout-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/layout-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-layout/src/client/columns.ts` 和 `packages/client/ui-layout/src/client/AppFrame.tsx`、`packages/client/ui-layout/src/client/index.ts`、`packages/client/ui-layout/src/client/service.ts` 理解状态变化，最后对照 `packages/client/ui-layout/tests/app-frame.client.spec.tsx`、`packages/client/ui-layout/tests/layout-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `createLayoutStore`；源码顶部原注释（英文，仅作回查线索）：The root entry's transient layout store: panel geometry as plain widths in px (0 = closed). Module level exports the factory only — a module-level handle would pin the store's identity in the module cache (a de-facto singleton surviving plugin reloads). reg...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/client/theme-presenter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/theme-presenter.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面交互逻辑
- 这个文件有什么用：这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。
- 为什么这样设计：把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。
- 文件级设计证据：源码顶部注释把它定位为“Global theme DOM applier: projects the resolved ThemeSnapshot onto the document — html { color-scheme } for native UA chrome (scrollbars, form controls), bodydata-ds-dark-theme for the token palette, the active theme's alias-token overrides as inline CSS va...”；固定提交中扫描到的声明包括 `DARK_ATTRIBUTE`、`ThemePresenter`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)、[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)
- 对应测试：[packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-layout/src/client/index.ts`、`packages/client/ui-layout/tests/theme-presenter.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/ui-layout/tests/theme-presenter.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `DARK_ATTRIBUTE`、`ThemePresenter`；源码顶部原注释（英文，仅作回查线索）：Global theme DOM applier: projects the resolved ThemeSnapshot onto the document — html { color-scheme } for native UA chrome (scrollbars, form controls), bodydata-ds-dark-theme for the token palette, the active theme's alias-token overrides as inline CSS va...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-layout/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-layout/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser-only layout plugin.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-layout/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-layout/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser-only layout plugin.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-layout. @module @deepseek-ai/dsh-client-ui-layout/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-layout/tests/apply.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-layout/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-layout. @module @deepseek-ai/dsh-client-ui-layout/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tests/app-frame.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/app-frame.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“AppFrame”、“renders three tracks from store state”、“renders the session pair with empty owner shares (sessionId is framework-standard)”、“keeps the conversation slot mounted while no session is current”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AppFrame”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `ResizeObserverStub`、`hookOf`、`mountFrame`、`tracks`、`drag`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-layout/src/client/AppFrame.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/AppFrame.tsx)、[packages/client/ui-layout/src/client/columns.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/columns.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-layout/src/client/AppFrame.tsx`、`packages/client/ui-layout/src/client/columns.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 398 行；扫描到的声明包括 `ResizeObserverStub`、`hookOf`、`mountFrame`、`tracks`、`drag`；扫描到的测试主题包括 “AppFrame”、“renders three tracks from store state”、“renders the session pair with empty owner shares (sessionId is framework-standard)”、“keeps the conversation slot mounted while no session is current”、“renders both column occupants before baselines settle (no loading gate)”、“ignores unselected states and closes only when the Session id changes”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-layout client apply”、“declares its service dependencies”、“provides ctx.layout and registers AppFrame into root with the three child declarations”、“injects no business face and attaches the layout actions”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-layout client apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom Client apply wiring under the terminal register form: ctx.layout provided, ONE register() call declares the three child slots + seats the store factory + wires the panel actions through the inject hook; teardown cascades (service u...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-layout/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-layout/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 125 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “ui-layout client apply”、“declares its service dependencies”、“provides ctx.layout and registers AppFrame into root with the three child declarations”、“injects no business face and attaches the layout actions”、“theme presenter applies the initial snapshot, follows theme/change, and unwinds on dispose”、“teardown unwinds the service, the root registration, and the child declarations”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom Client apply wiring under the terminal register form: ctx.layout provided, ONE register() call declares the three child slots + seats the store factory + wires the panel actions through the inject hook; teardown cascades (service u...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tests/columns.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/columns.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“clampWidth”、“clamps into the range and rounds”、“computeColumns”、“step 1: everything fits at preferred widths”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“clampWidth”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/columns.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/columns.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-layout/src/client/columns.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 95 行；扫描到的测试主题包括 “clampWidth”、“clamps into the range and rounds”、“computeColumns”、“step 1: everything fits at preferred widths”、“closed sidebar keeps its compact rail while closed details contribute zero width”、“preferences beyond the clamp range are clamped before solving”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tests/layout-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/layout-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、状态存储的具体场景，包括“createLayoutStore”、“initializes the sidebar at its default width, details closed, wide viewport assumed”、“each create() is an independent instance (factory is not a singleton)”、“setSidebar/setDetails clamp into the contract ranges”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createLayoutStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/columns.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/columns.ts)、[packages/client/ui-layout/src/client/stores.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/stores.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-layout/src/client/columns.ts`、`packages/client/ui-layout/src/client/stores.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的测试主题包括 “createLayoutStore”、“initializes the sidebar at its default width, details closed, wide viewport assumed”、“each create() is an independent instance (factory is not a singleton)”、“setSidebar/setDetails clamp into the contract ranges”、“toggleSidebar flips closed <-> contract default (drag width forgotten)”、“narrow toggleSidebar flips only the re-expand override; the width preference survives”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tests/service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/service.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“LayoutController”、“forwards the three panel actions to the attached set”、“fails loud before the root entry wired its actions”、“re-attach overwrites the stale action set (entry re-register)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“LayoutController”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“LayoutController behavior: the cross-plugin panel-action face. Geometry lives in the entry store (layout-store.spec.ts) — here we assert the delegation contract: attachPanels wiring, the three actions forwarding, the unwired fail-loud, and re-attach overwri...”；固定提交中扫描到的声明包括 `fakePanels`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/service.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-layout/src/client/service.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 58 行；扫描到的声明包括 `fakePanels`；扫描到的测试主题包括 “LayoutController”、“forwards the three panel actions to the attached set”、“fails loud before the root entry wired its actions”、“re-attach overwrites the stale action set (entry re-register)”；源码顶部原注释（英文，仅作回查线索）：LayoutController behavior: the cross-plugin panel-action face. Geometry lives in the entry store (layout-store.spec.ts) — here we assert the delegation contract: attachPanels wiring, the three actions forwarding, the unwired fail-loud, and re-attach overwri...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tests/theme-presenter.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tests/theme-presenter.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ThemePresenter”、“light scheme sets root color-scheme and leaves the dark attribute absent”、“dark scheme sets root color-scheme, the attribute, and metadata; switching to light upd...”、“applies tokens as inline variables and clears the previous set on theme change”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ThemePresenter”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom ThemePresenter behavior account: root color-scheme and the palette attribute follow active.colorScheme only, token variables replace the previous apply's set, theme-color metadata follows the rendered body background, and dispose r...”；固定提交中扫描到的声明包括 `snapshot`、`clearThemePresentation`、`themeColorMeta`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/ui-layout/src/client/theme-presenter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/src/client/theme-presenter.ts)、[packages/client/ui-theme/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-theme/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-layout/src/client/theme-presenter.ts`、`packages/client/ui-theme/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `snapshot`、`clearThemePresentation`、`themeColorMeta`；扫描到的测试主题包括 “ThemePresenter”、“light scheme sets root color-scheme and leaves the dark attribute absent”、“dark scheme sets root color-scheme, the attribute, and metadata; switching to light updates one node”、“applies tokens as inline variables and clears the previous set on theme change”、“dispose removes color-scheme, the attribute, and every applied variable, sparing foreign inline styles”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom ThemePresenter behavior account: root color-scheme and the palette attribute follow active.colorScheme only, token variables replace the previous apply's set, theme-color metadata follows the rendered body background, and dispose r...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-layout/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-layout/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-layout/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-layout/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-message-feedback

### [packages/client/ui-message-feedback/src/client/MessageFeedbackActions.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/MessageFeedbackActions.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `MessageFeedbackActions` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `MessageFeedbackActions` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Per-message feedback controls. The rating buttons mirror the shared message IconActions chrome so the strip reads as one row. The note editor is a popover portaled to document.body and fixed from the note trigger's rect, so it neither competes with the row ...”；固定提交中扫描到的结构线索是：样式结构包含选择器 .action、.noteOpen、.notePanel、.noteInput、.noteActions、.noteSave；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)、[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx`、`packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 144 行；样式结构包含选择器 .action、.noteOpen、.notePanel、.noteInput、.noteActions、.noteSave；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；源码顶部原注释（英文，仅作回查线索）：Per-message feedback controls. The rating buttons mirror the shared message IconActions chrome so the strip reads as one row. The note editor is a popover portaled to document.body and fixed from the note trigger's rect, so it neither competes with the row ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `MessageFeedbackActions` 的界面组件或交互逻辑，并导出 `MessageFeedbackActions`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Per-message feedback controls: a Like/Dislike pair plus an optional note. The buttons render inside the assistant message's IconActions row, so they reuse that row's chrome and sit between copy and branch. The note editor is a popover (portaled to document....。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Per-message feedback controls: a Like/Dislike pair plus an optional note. The buttons render inside the assistant message's IconActions row, so they reuse that row's chrome and sit between copy and branch. The note editor is a popover (portaled to document....”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Per-message feedback controls: a Like/Dislike pair plus an optional note. The buttons render inside the assistant message's IconActions row, so they reuse that row's chrome and sit between copy and branch. The note editor is a popover (portaled to document....”；固定提交中扫描到的声明包括 `MessageFeedbackActions`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/ui-message-feedback/src/client/MessageFeedbackActions.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/MessageFeedbackActions.module.css)、[packages/client/ui-message-feedback/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/slots.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-message-feedback/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/index.ts)
- 对应测试：[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-message-feedback/src/client/index.ts`、`packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 324 行；扫描到的声明包括 `MessageFeedbackActions`；源码顶部原注释（英文，仅作回查线索）：Per-message feedback controls: a Like/Dislike pair plus an optional note. The buttons render inside the assistant message's IconActions row, so they reuse that row's chrome and sit between copy and branch. The note editor is a popover (portaled to document....。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/controller.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：交互控制器
- 这个文件有什么用：它把浏览器端、用户界面、消息的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。
- 为什么这样设计：把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。
- 文件级设计证据：源码顶部注释把它定位为“Browser-local object layer over one Session's durable message-feedback sidecar. The Host owns per-item compare-and-set: every mutation carries the version this controller last observed, and a version-conflict reply carries the authoritative item, so a lost ...”；固定提交中扫描到的声明包括 `MessageFeedbackRemote`、`MessageFeedbackStatus`、`MessageFeedbackView`、`MessageFeedbackActionResult`、`MessageFeedbackController`；本地静态 import 图显示它直接依赖 4 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/feedback/message-feedback/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/src/types.ts)、[packages/client/ui-message-feedback/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/index.ts)
- 对应测试：[packages/client/ui-message-feedback/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/controller.client.spec.ts)、[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-message-feedback/README.md` 和入口，再读当前实现，沿着 `packages/client/connection/src/client/index.ts`、`packages/client/ui-slots/src/index.ts`、`packages/feedback/message-feedback/src/types.ts` 和 `packages/client/ui-message-feedback/src/client/index.ts`、`packages/client/ui-message-feedback/src/client/slots.ts`、`packages/client/ui-message-feedback/tests/controller.client.spec.ts` 确认输入输出，最后对照 `packages/client/ui-message-feedback/tests/controller.client.spec.ts`、`packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 377 行；扫描到的声明包括 `MessageFeedbackRemote`、`MessageFeedbackStatus`、`MessageFeedbackView`、`MessageFeedbackActionResult`、`MessageFeedbackController`、`describe`、`fail`、`carrierFailure`；源码顶部原注释（英文，仅作回查线索）：Browser-local object layer over one Session's durable message-feedback sidecar. The Host owns per-item compare-and-set: every mutation carries the version this controller last observed, and a version-conflict reply carries the authoritative item, so a lost ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、消息相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Message feedback plugin, browser half: the Like/Dislike entry in the conversation.chat.assistant-actions strip. One MessageFeedbackController per Session backs every message control in that Session, so a single list read seeds the whole transcript. Mutation...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 8 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-message-feedback/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Message feedback plugin, browser half: the Like/Dislike entry in the conversation.chat.assistant-actions strip. One MessageFeedbackController per Session backs every message control in that Session, so a single list read seeds the whole transcript. Mutation...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、消息提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“feedback namespace dictionaries.”；固定提交中扫描到的声明包括 `zh`、`MessageFeedbackKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/ui-message-feedback/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/index.ts)、[packages/client/ui-message-feedback/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/slots.ts)、[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 对应测试：[packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-message-feedback/src/client/index.ts`、`packages/client/ui-message-feedback/src/client/slots.ts`、`packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 45 行；扫描到的声明包括 `zh`、`MessageFeedbackKey`、`en`；源码顶部原注释（英文，仅作回查线索）：feedback namespace dictionaries.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、消息定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“The feedback entry's injected face. The target 'conversation.chat.assistant-actions' slot is declared and typed by ui-conversation; this package only contributes the entry, so no SlotMap merge lives here. Live per-message state arrives through the feedback ...”；固定提交中扫描到的声明包括 `MessageFeedbackInjected`、`MessageFeedbackActionProps`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)、[packages/client/ui-message-feedback/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/controller.ts)、[packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx)
- 对应测试：[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-message-feedback/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx`、`packages/client/ui-message-feedback/src/client/index.ts`、`packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `MessageFeedbackInjected`、`MessageFeedbackActionProps`；源码顶部原注释（英文，仅作回查线索）：The feedback entry's injected face. The target 'conversation.chat.assistant-actions' slot is declared and typed by ui-conversation; this package only contributes the entry, so no SlotMap merge lives here. Live per-message state arrives through the feedback ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-message-feedback/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-message-feedback/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、消息相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Message feedback surface plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)
- 对应测试：[packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-message-feedback/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Message feedback surface plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、消息必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-message-feedback. @module @deepseek-ai/dsh-client-ui-message-feedback/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-message-feedback. @module @deepseek-ai/dsh-client-ui-message-feedback/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/browser-plugin.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、消息的具体场景，包括“ui-message-feedback browser plugin”、“registers the feedback entry with the documented id, order, and locale”、“exposes the feedback hook plus the ensure/rate/clear verbs”、“shares one controller across every message in the same Session”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-message-feedback browser plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`、`RemoteService`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/index.ts`、`packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 214 行；扫描到的声明包括 `bench`、`RemoteService`；扫描到的测试主题包括 “ui-message-feedback browser plugin”、“registers the feedback entry with the documented id, order, and locale”、“exposes the feedback hook plus the ensure/rate/clear verbs”、“shares one controller across every message in the same Session”、“keeps separate Sessions on separate controllers”、“routes rate and clear to the Remote with the addressed message”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/controller.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、消息的具体场景，包括“MessageFeedbackController”、“seeds the view from one list read and keys items by message id”、“collapses concurrent loads onto one in-flight read”、“sends ifVersion null for a first rating and the observed version afterwards”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“MessageFeedbackController”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“MessageFeedbackController: the browser-local object layer over one Session's message-feedback sidecar. These specs pin the per-item compare-and-set contract — every mutation sends the version last observed, a conflict reconciles from the authoritative item ...”；固定提交中扫描到的声明包括 `item`、`fakeRemote`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/ui-message-feedback/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/controller.ts)、[packages/feedback/message-feedback/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/feedback/message-feedback/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/index.ts`、`packages/client/ui-message-feedback/src/client/controller.ts`、`packages/feedback/message-feedback/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 674 行；扫描到的声明包括 `item`、`fakeRemote`；扫描到的测试主题包括 “MessageFeedbackController”、“seeds the view from one list read and keys items by message id”、“collapses concurrent loads onto one in-flight read”、“sends ifVersion null for a first rating and the observed version afterwards”、“forwards an optional note and omits the field when absent”、“reconciles a version conflict from the authoritative item without refetching”；源码顶部原注释（英文，仅作回查线索）：MessageFeedbackController: the browser-local object layer over one Session's message-feedback sidecar. These specs pin the per-item compare-and-set contract — every mutation sends the version last observed, a conflict reconciles from the authoritative item ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/message-feedback-actions.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、消息的具体场景，包括“MessageFeedbackActions”、“renders both rating buttons unpressed with no recorded feedback”、“marks the recorded rating pressed and offers to retract it”、“reads the Session feedback on first interaction, once”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“MessageFeedbackActions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `item`、`mount`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/connection/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/ui-message-feedback/src/client/MessageFeedbackActions.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 739 行；扫描到的声明包括 `item`、`mount`；扫描到的测试主题包括 “MessageFeedbackActions”、“renders both rating buttons unpressed with no recorded feedback”、“marks the recorded rating pressed and offers to retract it”、“reads the Session feedback on first interaction, once”、“does not read the Session feedback on mount”、“rates a message that has no feedback yet”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/tests/styles.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tests/styles.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、消息的具体场景，包括“MessageFeedbackActions theme styles”、“names only theme variables the token sheet defines”、“never falls back to a literal colour”、“keeps the note editor out of the row as a fixed portal, not a flex item”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“MessageFeedbackActions theme styles”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Feedback controls stylesheet contract, asserted against the CSS text on disk. A --dsw-* name the theme never declares fails silently, and for this sheet it failed loudly in the product: border, background, and the primary button's fill and label each named ...”；固定提交中扫描到的声明包括 `block`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `block`；扫描到的测试主题包括 “MessageFeedbackActions theme styles”、“names only theme variables the token sheet defines”、“never falls back to a literal colour”、“keeps the note editor out of the row as a fixed portal, not a flex item”、“closes every block, so no rule is swallowed by the one above it”；源码顶部原注释（英文，仅作回查线索）：Feedback controls stylesheet contract, asserted against the CSS text on disk. A --dsw-* name the theme never declares fails silently, and for this sheet it failed loudly in the product: border, background, and the primary button's fill and label each named ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-message-feedback/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、消息：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-message-feedback/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-message-feedback/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-message-feedback/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-model-selection

### [packages/client/ui-model-selection/src/client/ModelSelect.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/ModelSelect.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `ModelSelect` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `ModelSelect` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .root、.trigger、.triggerLabel、.triggerEffort、.chevron、.chevronOpen；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/client/ui-model-selection/src/client/ModelSelect.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/ModelSelect.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)、[packages/client/ui-model-selection/tests/model-select.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/model-select.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-model-selection/src/client/ModelSelect.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`、`packages/client/ui-model-selection/tests/model-select.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 270 行；样式结构包含选择器 .root、.trigger、.triggerLabel、.triggerEffort、.chevron、.chevronOpen；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/client/ModelSelect.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/ModelSelect.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `ModelSelect` 的界面组件或交互逻辑，并导出 `ModelSelect`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：ModelSelect: the composer's named model seat (conversation.input.model). Two-level selection per figma 496:26454's MenuDropdown: the root menu is the Model / Effort row pair (label + current value + a right chevron), each drilling into its own list — the pr...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“ModelSelect: the composer's named model seat (conversation.input.model). Two-level selection per figma 496:26454's MenuDropdown: the root menu is the Model / Effort row pair (label + current value + a right chevron), each drilling into its own list — the pr...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“ModelSelect: the composer's named model seat (conversation.input.model). Two-level selection per figma 496:26454's MenuDropdown: the root menu is the Model / Effort row pair (label + current value + a right chevron), each drilling into its own list — the pr...”；固定提交中扫描到的声明包括 `ModelSelect`；本地静态 import 图显示它直接依赖 5 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-model-selection/src/client/ModelSelect.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/ModelSelect.module.css)、[packages/client/ui-model-selection/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/slots.ts)、[packages/client/ui-model-selection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/index.ts)
- 对应测试：[packages/client/ui-model-selection/tests/model-select.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/model-select.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-model-selection/src/client/index.ts`、`packages/client/ui-model-selection/tests/model-select.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-model-selection/tests/model-select.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 375 行；扫描到的声明包括 `ModelSelect`；源码顶部原注释（英文，仅作回查线索）：ModelSelect: the composer's named model seat (conversation.input.model). Two-level selection per figma 496:26454's MenuDropdown: the root menu is the Model / Effort row pair (label + current value + a right chevron), each drilling into its own list — the pr...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/client/directory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/directory.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：路径边界
- 这个文件有什么用：它负责浏览器端、用户界面、目录的解析、规范化和安全约束，统一处理不同平台的路径差异与越界检查。
- 为什么这样设计：路径是跨平台且涉及安全的输入，集中规范化和越界判断可以避免不同调用方产生不一致的文件目标。
- 文件级设计证据：源码顶部注释把它定位为“Per-session model directory: the ONE state both selection entries share. The /model popup and the composer-seat selector load through the same controller and submit through the same selectModel call, so the host stays the single fact source and the store is...”；固定提交中扫描到的声明包括 `ModelDirectoryState`、`ModelDirectory`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-model-selection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/index.ts)、[packages/client/ui-model-selection/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/service.ts)
- 对应测试：[packages/client/ui-model-selection/tests/model-select.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/model-select.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md` 和入口，再读当前实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts` 和 `packages/client/ui-model-selection/src/client/index.ts`、`packages/client/ui-model-selection/src/client/service.ts`、`packages/client/ui-model-selection/src/client/slots.ts` 确认输入输出，最后对照 `packages/client/ui-model-selection/tests/model-select.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 154 行；扫描到的声明包括 `ModelDirectoryState`、`ModelDirectory`；源码顶部原注释（英文，仅作回查线索）：Per-session model directory: the ONE state both selection entries share. The /model popup and the composer-seat selector load through the same controller and submit through the same selectModel call, so the host stays the single fact source and the store is...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Model selection plugin, browser half — TWO entries over ONE per-session directory owned by ModelDirectoryResolver (ctx.modelDirectories). The /model popupSelect contribution and the composer's named conversation.input.model seat both load the session's prov...”；固定提交中扫描到的声明包括 `inject`、`apply`、`rowId`、`optionsOf`、`selectionOf`；本地静态 import 图显示它直接依赖 11 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)
- 对应测试：[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 176 行；扫描到的声明包括 `inject`、`apply`、`rowId`、`optionsOf`、`selectionOf`；源码顶部原注释（英文，仅作回查线索）：Model selection plugin, browser half — TWO entries over ONE per-session directory owned by ModelDirectoryResolver (ctx.modelDirectories). The /model popupSelect contribution and the composer's named conversation.input.model seat both load the session's prov...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、本地化提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“model namespace dictionaries. trigger.selectAria reads identically to trigger.fallback today and is still a separate key: the visible fallback label and the accessible name of an unset trigger are free to diverge per locale, and folding it into trigger.aria...”；固定提交中扫描到的声明包括 `zh`、`ModelKey`、`en`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/client/ui-model-selection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/index.ts)、[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)、[packages/client/ui-model-selection/tests/model-select.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/model-select.client.spec.tsx)
- 对应测试：[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)、[packages/client/ui-model-selection/tests/model-select.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/model-select.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-model-selection/src/client/index.ts`、`packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`、`packages/client/ui-model-selection/tests/model-select.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`、`packages/client/ui-model-selection/tests/model-select.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `zh`、`ModelKey`、`en`；源码顶部原注释（英文，仅作回查线索）：model namespace dictionaries. trigger.selectAria reads identically to trigger.fallback today and is still a separate key: the visible fallback label and the accessible name of an unset trigger are free to diverge per locale, and folding it into trigger.aria...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/client/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/service.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、用户界面的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“ModelDirectoryResolver (ctx.modelDirectories): the root owner of per-session ModelDirectory instances. Both selection entries (the /model popup and the composer model seat) resolve their session's directory through this service, which is what makes the dual...”；固定提交中扫描到的声明包括 `ModelDirectoryResolver`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-model-selection/src/client/directory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/directory.ts)、[packages/client/ui-model-selection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md` 和入口，再读当前实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-model-selection/src/client/directory.ts` 和 `packages/client/ui-model-selection/src/client/index.ts` 确认输入输出，最后对照 `packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 110 行；扫描到的声明包括 `ModelDirectoryResolver`；源码顶部原注释（英文，仅作回查线索）：ModelDirectoryResolver (ctx.modelDirectories): the root owner of per-session ModelDirectory instances. Both selection entries (the /model popup and the composer model seat) resolve their session's directory through this service, which is what makes the dual...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、用户界面、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“ModelSelect's injected face. The target 'conversation.input.model' seat is declared (children table) and typed by ui-conversation's composer-bar entry; this package only contributes the single occupant, so no SlotMap merge lives here.”；固定提交中扫描到的声明包括 `ModelSelectInjected`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-model-selection/src/client/directory.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/directory.ts)、[packages/client/ui-model-selection/src/client/ModelSelect.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/client/ModelSelect.tsx)
- 对应测试：[packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-model-selection/src/client/ModelSelect.tsx`、`packages/client/ui-model-selection/src/client/index.ts`、`packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的声明包括 `ModelSelectInjected`；源码顶部原注释（英文，仅作回查线索）：ModelSelect's injected face. The target 'conversation.input.model' seat is declared (children table) and typed by ui-conversation's composer-bar entry; this package only contributes the single occupant, so no SlotMap merge lives here.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-model-selection/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Model selection plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Model selection plugin, node half. Pure UI plugin: the empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships via exports"./client", discovered through the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-model-selection. @module @deepseek-ai/dsh-client-ui-model-selection/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-model-selection. @module @deepseek-ai/dsh-client-ui-model-selection/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/browser-plugin.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ui-model-selection dual entry”、“registers the /model contribution and the composer model seat”、“popup options mark the host current active with the provider group in the detail”、“a seat selection is the current the popup marks active next — one shared state”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-model-selection dual entry”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“ui-model-selection browser half on a real cordis Context with fake command/slots/ connection faces and real session scopes: the plugin mounts ModelDirectoryResolver as models, the /model contribution and the conversation.input.model seat both register, and ...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 328 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “ui-model-selection dual entry”、“registers the /model contribution and the composer model seat”、“popup options mark the host current active with the provider group in the detail”、“a seat selection is the current the popup marks active next — one shared state”、“a popup selection lands on the seat store — the reverse direction of the same state”、“both entries share one directory instance per session, isolated across sessions”；源码顶部原注释（英文，仅作回查线索）：ui-model-selection browser half on a real cordis Context with fake command/slots/ connection faces and real session scopes: the plugin mounts ModelDirectoryResolver as models, the /model contribution and the conversation.input.model seat both register, and ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/tests/model-select.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tests/model-select.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面的具体场景，包括“ModelSelect reasoning effort”、“renders adapter metadata and submits the effort as part of the session selection”、“offers provider default only when the adapter does not configure a model default”、“prompts for a selection when the current model is no longer advertised”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ModelSelect reasoning effort”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `state`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/locales/zh.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/locales/zh.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/locale/src/locales/zh.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 184 行；扫描到的声明包括 `state`；扫描到的测试主题包括 “ModelSelect reasoning effort”、“renders adapter metadata and submits the effort as part of the session selection”、“offers provider default only when the adapter does not configure a model default”、“prompts for a selection when the current model is no longer advertised”、“announces a rejected selection as a transient toast and keeps the in-menu strip for loads”、“renders no Agent-bound control for an addressed subagent session”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-model-selection/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-model-selection/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-model-selection/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-model-selection/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

