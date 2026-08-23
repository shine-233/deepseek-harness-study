# 源文件索引：packages/session-query

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 48 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/session-query/session-log-export（17 条）、packages/session-query/session-query-sqlite（7 条）、packages/session-query/session-query（15 条）、packages/session-query/tool-session-query（9 条）。

## packages/session-query/session-log-export

### [packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/Dialog.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `Dialog` 的界面组件或交互逻辑，并导出 `SessionLogDownloadDialogInjected`、`SessionLogDownloadDialogProps`、`SessionLogDownloadDialog`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `SessionLogDownloadDialogInjected`、`SessionLogDownloadDialogProps`、`SessionLogDownloadDialog`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `SessionLogDownloadDialogInjected`、`SessionLogDownloadDialogProps`、`SessionLogDownloadDialog`；本地静态 import 图显示它直接依赖 5 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/HeaderAction.tsx)
- 对应测试：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)、[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/session-query/session-log-export/src/client/HeaderAction.tsx`、`packages/session-query/session-log-export/src/client/index.ts`、`packages/session-query/session-log-export/tests/client-apply.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/session-query/session-log-export/tests/client-apply.client.spec.tsx`、`packages/session-query/session-log-export/tests/dialog.client.spec.tsx`、`packages/session-query/session-log-export/tests/header-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `SessionLogDownloadDialogInjected`、`SessionLogDownloadDialogProps`、`SessionLogDownloadDialog`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/client/HeaderAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/HeaderAction.module.css)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `HeaderAction` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `HeaderAction` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .sessionLogButton；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/HeaderAction.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/session-query/session-log-export/src/client/HeaderAction.tsx` 确认状态如何进入 UI，最后对照 `packages/session-query/session-log-export/tests/client-apply.client.spec.tsx`、`packages/session-query/session-log-export/tests/header-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 36 行；样式结构包含选择器 .sessionLogButton。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/HeaderAction.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `HeaderAction` 的界面组件或交互逻辑，并导出 `SessionLogDownloadHeaderAction`，把输入、局部状态和用户操作组织成可渲染的 UI 单元。
- 为什么这样设计：固定提交中扫描到的声明包括 `SessionLogDownloadHeaderAction`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 文件级设计证据：固定提交中扫描到的声明包括 `SessionLogDownloadHeaderAction`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/HeaderAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/HeaderAction.module.css)、[packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/index.ts)
- 对应测试：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/session-query/session-log-export/src/client/index.ts`、`packages/session-query/session-log-export/tests/client-apply.client.spec.tsx`、`packages/session-query/session-log-export/tests/header-action.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/session-query/session-log-export/tests/client-apply.client.spec.tsx`、`packages/session-query/session-log-export/tests/header-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `SessionLogDownloadHeaderAction`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/controller.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：交互控制器
- 这个文件有什么用：它把会话、查询、浏览器端的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。
- 为什么这样设计：把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。
- 文件级设计证据：源码顶部注释把它定位为“Browser download state shared by the Session Header button and /export.”；固定提交中扫描到的声明包括 `SessionLogDownloadStatus`、`SessionLogDownloadEntry`、`SessionLogDownloadState`、`sessionLogZipFilename`、`downloadUrl`；本地静态 import 图显示它直接依赖 1 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/index.ts)、[packages/session-query/session-log-export/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/controller.client.spec.ts)
- 对应测试：[packages/session-query/session-log-export/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/controller.client.spec.ts)、[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session-query/session-log-export/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts` 和 `packages/session-query/session-log-export/src/client/Dialog.tsx`、`packages/session-query/session-log-export/src/client/index.ts`、`packages/session-query/session-log-export/tests/controller.client.spec.ts` 确认输入输出，最后对照 `packages/session-query/session-log-export/tests/controller.client.spec.ts`、`packages/session-query/session-log-export/tests/dialog.client.spec.tsx`、`packages/session-query/session-log-export/tests/header-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `SessionLogDownloadStatus`、`SessionLogDownloadEntry`、`SessionLogDownloadState`、`sessionLogZipFilename`、`downloadUrl`、`SessionLogDownloadController`、`hostBase`、`messageOf`；源码顶部原注释（英文，仅作回查线索）：Browser download state shared by the Session Header button and /export.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、查询、浏览器端相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser plugin owning Session export download state and its shared modal.”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 8 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-commands/src/client/index.ts)、[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)
- 对应测试：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session-query/session-log-export/README.md`、入口和消费者，再读当前契约，沿着 `packages/session-query/session-log-export/tests/client-apply.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/session-query/session-log-export/tests/client-apply.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser plugin owning Session export download state and its shared modal.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/locales.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为会话、查询、浏览器端提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Locale namespace owned by Session export browser feedback.”；固定提交中扫描到的声明包括 `NS`、`zh`、`en`、`SessionLogDownloadKey`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/index.ts)、[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)
- 对应测试：[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/session-query/session-log-export/src/client/Dialog.tsx`、`packages/session-query/session-log-export/src/client/index.ts`、`packages/session-query/session-log-export/tests/dialog.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/session-query/session-log-export/tests/dialog.client.spec.tsx`、`packages/session-query/session-log-export/tests/header-action.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `NS`、`zh`、`en`、`SessionLogDownloadKey`；源码顶部原注释（英文，仅作回查线索）：Locale namespace owned by Session export browser feedback.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/css-modules.d.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/session-query/session-log-export/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session-query/session-log-export/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 6 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、查询相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Web Session-log download command over the host endpoint owned by ApiProxy.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/commands/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/session-query/session-log-export/tests/command.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/command.client.spec.ts)、[packages/session-query/session-log-export/tests/loader-composition.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/loader-composition.client.spec.ts)
- 对应测试：[packages/session-query/session-log-export/tests/command.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/command.client.spec.ts)、[packages/session-query/session-log-export/tests/loader-composition.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/loader-composition.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session-query/session-log-export/README.md`、入口和消费者，再读当前契约，沿着 `packages/session-query/session-log-export/tests/command.client.spec.ts`、`packages/session-query/session-log-export/tests/loader-composition.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/session-query/session-log-export/tests/command.client.spec.ts`、`packages/session-query/session-log-export/tests/loader-composition.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Web Session-log download command over the host endpoint owned by ApiProxy.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、查询必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package invariant companion for @deepseek-ai/dsh-session-log-export.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/session-query/session-log-export/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/invariant.client.spec.ts)
- 对应测试：[packages/session-query/session-log-export/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/session-query/session-log-export/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/session-query/session-log-export/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package invariant companion for @deepseek-ai/dsh-session-log-export.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、浏览器端的具体场景，包括“session-log-download browser plugin”、“provides one controller and removes its Header contribution on disposal”、“downloads only for an export execution acknowledged by this browser client”、“re-registers after the declaring Header slot collapses and returns”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-log-download browser plugin”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `declare`、`bench`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-conversation/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `declare`、`bench`；扫描到的测试主题包括 “session-log-download browser plugin”、“provides one controller and removes its Header contribution on disposal”、“downloads only for an export execution acknowledged by this browser client”、“re-registers after the declaring Header slot collapses and returns”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/command.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/command.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、浏览器端的具体场景，包括“/export Web download command”、“registers one pathless command and removes it with the plugin fiber”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“/export Web download command”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/commands/src/index.ts)、[packages/session-query/session-log-export/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/interaction/commands/src/index.ts`、`packages/session-query/session-log-export/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的测试主题包括 “/export Web download command”、“registers one pathless command and removes it with the plugin fiber”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/controller.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、控制器的具体场景，包括“SessionLogDownloadController”、“downloads the host ZIP and publishes one shared success state”、“collapses concurrent gestures and preserves a dismissed dialog”、“publishes HTTP and transport failures without leaking rejections”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionLogDownloadController”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/controller.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/session-query/session-log-export/src/client/controller.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 146 行；扫描到的测试主题包括 “SessionLogDownloadController”、“downloads the host ZIP and publishes one shared success state”、“collapses concurrent gestures and preserves a dismissed dialog”、“publishes HTTP and transport failures without leaking rejections”、“aborts active fetches on disposal and rejects later requests”、“uses the null-origin fallback and default browser operations”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、浏览器端的具体场景，包括“SessionLogDownloadDialog”、“shows a controller failure and closes it without reading Session history”、“renders the in-flight state and the settled browser download state”、“uses fallback copy when a failure has no detail”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SessionLogDownloadDialog”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bench`、`useSessionLogDownload`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/controller.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/session-query/session-log-export/src/client/Dialog.tsx`、`packages/session-query/session-log-export/src/client/controller.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `bench`、`useSessionLogDownload`；扫描到的测试主题包括 “SessionLogDownloadDialog”、“shows a controller failure and closes it without reading Session history”、“renders the in-flight state and the settled browser download state”、“uses fallback copy when a failure has no detail”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、浏览器端的具体场景，包括“Session export Header action”、“renders the 111×32 text capsule and downloads through the shared controller”、“disables the capsule while either entry path downloads this Session”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Session export Header action”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `bindSessionExport`、`bench`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/client/HeaderAction.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/session-query/session-log-export/src/client/Dialog.tsx`、`packages/session-query/session-log-export/src/client/HeaderAction.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `bindSessionExport`、`bench`；扫描到的测试主题包括 “Session export Header action”、“renders the 111×32 text capsule and downloads through the shared controller”、“disables the capsule while either entry path downloads this Session”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/invariant.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、浏览器端的具体场景，包括“@deepseek-ai/dsh-session-log-export/invariant”、“registers the package-owned empty companion”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“@deepseek-ai/dsh-session-log-export/invariant”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/session-query/session-log-export/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/src/invariant.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/session-query/session-log-export/src/invariant.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 16 行；扫描到的测试主题包括 “@deepseek-ai/dsh-session-log-export/invariant”、“registers the package-owned empty companion”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tests/loader-composition.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tests/loader-composition.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、浏览器端的具体场景，包括“session-log-download real Loader composition”、“discovers and executes /export through the assembled command plane”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-log-download real Loader composition”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/interaction/commands/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/interaction/commands/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的测试主题包括 “session-log-download real Loader composition”、“discovers and executes /export through the assembled command plane”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-log-export/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/tsdown.config.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理会话、查询：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-log-export/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/session-query/session-log-export/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session-query/session-query-sqlite

### [packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、查询相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Concrete session-query service with SQLite FTS5 over the live-preferred corpus. @module @deepseek-ai/dsh-session-query-sqlite”；固定提交中扫描到的声明包括 `SESSION_QUERY_SQLITE_PATH_KEY`、`SESSION_QUERY_SQLITE_DEFAULT_LIMIT`、`SESSION_QUERY_SQLITE_MAX_LIMIT`、`SESSION_QUERY_SQLITE_SNIPPET_CHARS`、`OpenAt`；本地静态 import 图显示它直接依赖 7 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query-sqlite/src/query.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/query.ts)、[packages/session-query/session-query-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/schema.ts)、[packages/examples/acp-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/src/index.ts)
- 对应测试：[packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session-query/session-query-sqlite/README.md`、入口和消费者，再读当前契约，沿着 `packages/examples/acp-demo/src/index.ts`、`packages/session-query/session-query-sqlite/tests/load-path.e2e.ts`、`packages/session-query/session-query-sqlite/tests/sqlite.spec.ts` 看它怎样约束运行时，最后对照 `packages/session-query/session-query-sqlite/tests/load-path.e2e.ts`、`packages/session-query/session-query-sqlite/tests/sqlite.spec.ts`、`packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 1103 行；扫描到的声明包括 `SESSION_QUERY_SQLITE_PATH_KEY`、`SESSION_QUERY_SQLITE_DEFAULT_LIMIT`、`SESSION_QUERY_SQLITE_MAX_LIMIT`、`SESSION_QUERY_SQLITE_SNIPPET_CHARS`、`OpenAt`、`Config`、`SqliteSessionQueryEngine`、`headerBindings`；源码顶部原注释（英文，仅作回查线索）：Concrete session-query service with SQLite FTS5 over the live-preferred corpus. @module @deepseek-ai/dsh-session-query-sqlite。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query-sqlite/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、查询必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-query-sqlite. @module @deepseek-ai/dsh-session-query-sqlite/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-query-sqlite. @module @deepseek-ai/dsh-session-query-sqlite/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query-sqlite/src/query.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/query.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：查询实现
- 这个文件有什么用：它把会话、查询的筛选、排序、游标或读取逻辑组织成可复用查询，调用方不必直接操作底层记录。
- 为什么这样设计：查询与原始存储分开，调用方只依赖筛选和游标语义；底层换成另一种索引或数据库时，上层不必重写。
- 文件级设计证据：源码顶部注释把它定位为“Request normalization, parameterized predicates, and result presentation.”；固定提交中扫描到的声明包括 `FTS_HIGHLIGHT_START`、`FTS_HIGHLIGHT_END`、`SQLITE_MAX_PAGE_LIMIT`、`SQLITE_PORTABLE_VARIABLE_LIMIT`、`SQLITE_FTS5_OUTER_PREDICATE_LIMIT`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/index.ts)、[packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/query.spec.ts)
- 对应测试：[packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/session-query/session-query/src/index.ts` 和 `packages/session-query/session-query-sqlite/src/index.ts`、`packages/session-query/session-query-sqlite/tests/query.spec.ts` 理解状态变化，最后对照 `packages/session-query/session-query-sqlite/tests/query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 477 行；扫描到的声明包括 `FTS_HIGHLIGHT_START`、`FTS_HIGHLIGHT_END`、`SQLITE_MAX_PAGE_LIMIT`、`SQLITE_PORTABLE_VARIABLE_LIMIT`、`SQLITE_FTS5_OUTER_PREDICATE_LIMIT`、`assertPortableBindingCount`、`assertFts5OuterPredicateCount`、`QueryLimits`；源码顶部原注释（英文，仅作回查线索）：Request normalization, parameterized predicates, and result presentation.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/schema.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、查询、数据 schema可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“SQLite schema for the disposable session full-text read model.”；固定提交中扫描到的声明包括 `SESSION_QUERY_SQLITE_SCHEMA_VERSION`、`SESSION_QUERY_SQLITE_APPLICATION_ID`、`JournalMode`、`openSearchDatabase`、`createDatabaseFile`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/session-query-sqlite/README.md`，再读本配置/脚本，沿着 `packages/session-query/session-query-sqlite/src/index.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 173 行；扫描到的声明包括 `SESSION_QUERY_SQLITE_SCHEMA_VERSION`、`SESSION_QUERY_SQLITE_APPLICATION_ID`、`JournalMode`、`openSearchDatabase`、`createDatabaseFile`、`listUserTables`、`assertDerivedUserTables`、`resetDerivedSchema`；源码顶部原注释（英文，仅作回查线索）：SQLite schema for the disposable session full-text read model.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、路径的具体场景，包括“dsh-session-query-sqlite real Loader path”、“unwraps, mounts, and searches the real persistence backend”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“dsh-session-query-sqlite real Loader path”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `temporaryPath`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session-query/session-query-sqlite/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `temporaryPath`；扫描到的测试主题包括 “dsh-session-query-sqlite real Loader path”、“unwraps, mounts, and searches the real persistence backend”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/query.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询的具体场景，包括“SQLite search request normalization”、“normalizes both scopes, defaults arrays and limits, and preserves cursors”、“rejects non-text, blank, non-integer, non-positive, and oversized requests”、“materializes owned filter values during normalization”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SQLite search request normalization”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `expectCode`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query-sqlite/src/query.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/query.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/session-query/session-query-sqlite/src/query.ts`、`packages/session-query/session-query/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 262 行；扫描到的声明包括 `expectCode`；扫描到的测试主题包括 “SQLite search request normalization”、“normalizes both scopes, defaults arrays and limits, and preserves cursors”、“rejects non-text, blank, non-integer, non-positive, and oversized requests”、“materializes owned filter values during normalization”、“SQLite search predicate compilation”、“compiles all logical-session clauses including empty and nullable values”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询的具体场景，包括“SQLite session search”、“defaults and validates opening policy and persisted inspection concurrency through its ...”、“mounts and disposes first-search mode without opening its database”、“refuses search in never mode while inherited reads and traces keep working”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“SQLite session search”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `temporaryPath`、`header`、`messageEvents`、`expectCode`、`replaceCursorOffset`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session-query/session-query-sqlite/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1819 行；扫描到的声明包括 `temporaryPath`、`header`、`messageEvents`、`expectCode`、`replaceCursorOffset`、`TestPersistence`、`liveContext`；扫描到的测试主题包括 “SQLite session search”、“defaults and validates opening policy and persisted inspection concurrency through its Cordis config”、“mounts and disposes first-search mode without opening its database”、“refuses search in never mode while inherited reads and traces keep working”、“opens once on the first search and reuses readiness for later searches”、“shares one readiness promise across concurrent first searches”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session-query/session-query

### [packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义会话、查询可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public configuration and typed failures for the combined session-query service.”；固定提交中扫描到的声明包括 `SESSION_QUERY_READ_WINDOW_MAX`、`SESSION_QUERY_DEFAULT_PERSISTED_INSPECT_CONCURRENCY`、`Config`、`SessionQueryErrorCode`、`SessionQueryError`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/corpus.ts)、[packages/session-query/session-query/src/documents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/documents.ts)、[packages/session-query/session-query/src/filters.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/filters.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/session-query/README.md`，再读本配置/脚本，沿着 `packages/session-query/session-query/src/corpus.ts`、`packages/session-query/session-query/src/documents.ts`、`packages/session-query/session-query/src/filters.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `SESSION_QUERY_READ_WINDOW_MAX`、`SESSION_QUERY_DEFAULT_PERSISTED_INSPECT_CONCURRENCY`、`Config`、`SessionQueryErrorCode`、`SessionQueryError`；源码顶部原注释（英文，仅作回查线索）：Public configuration and typed failures for the combined session-query service.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/corpus.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“Live/persisted logical-corpus resolution for session-query.”；固定提交中扫描到的声明包括 `LogicalSession`、`LogicalSessionSource`、`LogicalProjectionResult`、`SessionCorpus`、`projectSource`；本地静态 import 图显示它直接依赖 6 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/sources.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/sources.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session-query/session-query/src/config.ts`、`packages/session-query/session-query/src/sources.ts` 和 `packages/session-query/session-query/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 309 行；扫描到的声明包括 `LogicalSession`、`LogicalSessionSource`、`LogicalProjectionResult`、`SessionCorpus`、`projectSource`、`sourceLive`、`orderedResults`、`listPersisted`；源码顶部原注释（英文，仅作回查线索）：Live/persisted logical-corpus resolution for session-query.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/cursor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/cursor.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“Opaque cursor identity for session-search pagination.”；固定提交中扫描到的声明包括 `SessionSearchCursor`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)、[packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/util/brand/src/index.ts` 和 `packages/session-query/session-query/src/index.ts`、`packages/session-query/session-query/src/types.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 15 行；扫描到的声明包括 `SessionSearchCursor`；源码顶部原注释（英文，仅作回查线索）：Opaque cursor identity for session-search pagination.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/documents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/documents.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“Shared event metadata and semantic-document projection.”；固定提交中扫描到的声明包括 `buildSessionEventRecords`、`buildSessionEventSearchDocuments`、`classifySurface`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/extraction.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/extraction.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session-query/session-query/src/config.ts`、`packages/session-query/session-query/src/extraction.ts` 和 `packages/session-query/session-query/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `buildSessionEventRecords`、`buildSessionEventSearchDocuments`、`classifySurface`；源码顶部原注释（英文，仅作回查线索）：Shared event metadata and semantic-document projection.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/extraction.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/extraction.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“First-party semantic text extraction for session-query consumers.”；固定提交中扫描到的声明包括 `extractSessionEventText`、`turnEndText`、`contentText`、`blockText`、`joinText`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/documents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/documents.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts` 和 `packages/session-query/session-query/src/documents.ts`、`packages/session-query/session-query/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `extractSessionEventText`、`turnEndText`、`contentText`、`blockText`、`joinText`；源码顶部原注释（英文，仅作回查线索）：First-party semantic text extraction for session-query consumers.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/filters.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/filters.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“Pure provider-independent predicates for logical sessions and event text.”；固定提交中扫描到的声明包括 `filterSessionResults`、`filterSessionEventDocuments`、`materializeSessionResultFilters`、`materializeSessionEventResultFilters`、`compileSessionTextFilter`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/types.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/session-query/session-query/src/config.ts`、`packages/session-query/session-query/src/types.ts` 和 `packages/session-query/session-query/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `filterSessionResults`、`filterSessionEventDocuments`、`materializeSessionResultFilters`、`materializeSessionEventResultFilters`、`compileSessionTextFilter`、`sessionPredicate`、`eventPredicate`、`copyStrings`；源码顶部原注释（英文，仅作回查线索）：Pure provider-independent predicates for logical sessions and event text.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、查询相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Service Definition for combined session-history reads, traces, filters, and full-text search. @module @deepseek-ai/dsh-session-query”；本地静态 import 图显示它直接依赖 12 个源文件，并被 21 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/corpus.ts)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/src/index.ts)
- 对应测试：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/host/apiproxy/tests/api-proxy-search.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-search.spec.ts)、[packages/host/apiproxy/tests/session-export.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/session-export.spec.ts)、[packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/query.spec.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/search-helpers.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先读 `packages/session-query/session-query/README.md`、入口和消费者，再读当前契约，沿着 `packages/context/session-reference/src/index.ts`、`packages/context/session-reference/src/projection.ts`、`packages/context/session-reference/tests/session-reference.spec.ts` 看它怎样约束运行时，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/host/apiproxy/tests/api-proxy-search.spec.ts`、`packages/host/apiproxy/tests/session-export.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 359 行；源码顶部原注释（英文，仅作回查线索）：Service Definition for combined session-history reads, traces, filters, and full-text search. @module @deepseek-ai/dsh-session-query。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、查询必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-session-query. @module @deepseek-ai/dsh-session-query/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-session-query. @module @deepseek-ai/dsh-session-query/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/sources.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/sources.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“Shared immutable-header checks for logical session source observers.”；固定提交中扫描到的声明包括 `assertSessionHeadersCompatible`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/corpus.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session-query/session-query/src/config.ts` 和 `packages/session-query/session-query/src/corpus.ts`、`packages/session-query/session-query/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `assertSessionHeadersCompatible`；源码顶部原注释（英文，仅作回查线索）：Shared immutable-header checks for logical session source observers.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/tracing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/tracing.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：会话查询实现
- 这个文件有什么用：这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。
- 为什么这样设计：查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。
- 文件级设计证据：源码顶部注释把它定位为“One-shot session-lineage and event-relationship tracing helpers.”；固定提交中扫描到的声明包括 `eventRecords`、`currentSurfaceEvents`、`traceEvent`、`traceSession`、`analyzeEventLog`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/types.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts`、`packages/session-query/session-query/src/config.ts`、`packages/session-query/session-query/src/types.ts` 和 `packages/session-query/session-query/src/index.ts` 理解状态变化，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 248 行；扫描到的声明包括 `eventRecords`、`currentSurfaceEvents`、`traceEvent`、`traceSession`、`analyzeEventLog`、`eventSources`、`buildDescendants`、`cloneRecord`；源码顶部原注释（英文，仅作回查线索）：One-shot session-lineage and event-relationship tracing helpers.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/types.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述会话、查询中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Public records for exact reads and relationship traces over the live-preferred logical session corpus. @module @deepseek-ai/dsh-session-query/types”；固定提交中扫描到的声明包括 `SessionEventSurface`、`SessionRecord`、`SessionSurfaceSnapshot`、`SessionLogSnapshot`、`SessionEventRecord`；本地静态 import 图显示它直接依赖 3 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/cursor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/cursor.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-title/src/index.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/corpus.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/session-query/README.md`、入口和消费者，再读当前契约，沿着 `packages/session-query/session-query/src/corpus.ts`、`packages/session-query/session-query/src/documents.ts`、`packages/session-query/session-query/src/filters.ts` 看它怎样约束运行时，最后对照 `packages/context/session-reference/tests/session-reference.spec.ts`、`packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/examples/acp-demo/tests/acp-agent.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 279 行；扫描到的声明包括 `SessionEventSurface`、`SessionRecord`、`SessionSurfaceSnapshot`、`SessionLogSnapshot`、`SessionEventRecord`、`SessionLineageNode`、`SessionLineageTrace`、`SessionEventTraceRequest`；源码顶部原注释（英文，仅作回查线索）：Public records for exact reads and relationship traces over the live-preferred logical session corpus. @module @deepseek-ai/dsh-session-query/types。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/search-helpers.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询的具体场景，包括“session-query semantic extraction”、“extracts first-party message, tool, todo, and failure detail”、“extracts meaningful turn outcomes and skips structural or unknown events”、“session-query document and filter helpers”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session-query semantic extraction”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `header`、`expectCode`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session-query/session-query/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 300 行；扫描到的声明包括 `header`、`expectCode`；扫描到的测试主题包括 “session-query semantic extraction”、“extracts first-party message, tool, todo, and failure detail”、“extracts meaningful turn outcomes and skips structural or unknown events”、“session-query document and filter helpers”、“classifies every event and omits non-semantic documents”、“applies every session clause with OR values and validates closed values”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/session-query.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询的具体场景，包括“preserves an exact pre-abort reason without entering persistence”、“forwards in-flight cancellation and waits for persistence cleanup before rejecting”、“preserves cancellation after a persistence implementation ignores the signal”、“forwards in-flight list cancellation and waits for cleanup before rejecting”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“preserves an exact pre-abort reason without entering persistence”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `header`、`eventLog`、`TestPersistence`、`liveContext`、`expectCode`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session-query/session-query/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1222 行；扫描到的声明包括 `header`、`eventLog`、`TestPersistence`、`liveContext`、`expectCode`、`rejectUnknown`；扫描到的测试主题包括 “preserves an exact pre-abort reason without entering persistence”、“forwards in-flight cancellation and waits for persistence cleanup before rejecting”、“preserves cancellation after a persistence implementation ignores the signal”、“forwards in-flight list cancellation and waits for cleanup before rejecting”、“waits for an ignoring backend to return before preserving the abort reason”、“forwards cancellation and waits for inspection cleanup before rejecting”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/test-service.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“test-service”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestSessionQueryEngine`；本地静态 import 图显示它直接依赖 1 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)、[packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/search-helpers.spec.ts)、[packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/session-query.spec.ts)、[packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/tracing.spec.ts)
- 对应测试：[packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/search-helpers.spec.ts)、[packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/session-query.spec.ts)、[packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/tracing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/session-query/session-query/tests/search-helpers.spec.ts`、`packages/session-query/session-query/tests/session-query.spec.ts`、`packages/session-query/session-query/tests/tracing.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `TestSessionQueryEngine`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/tracing.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询的具体场景，包括“session lineage tracing”、“returns complete ancestry, deterministic descendant trees, and detached records”、“represents root and unresolved-parent traces explicitly”、“rejects target-connected cycles and missing targets”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“session lineage tracing”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `mutableHeader`、`header`、`appendEvent`、`TracePersistence`、`queryContext`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/llm/llm/src/index.ts`、`packages/session-query/session-query/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 486 行；扫描到的声明包括 `mutableHeader`、`header`、`appendEvent`、`TracePersistence`、`queryContext`、`expectCode`、`appendTraceEvents`；扫描到的测试主题包括 “session lineage tracing”、“returns complete ancestry, deterministic descendant trees, and detached records”、“represents root and unresolved-parent traces explicitly”、“rejects target-connected cycles and missing targets”、“uses one cross-corpus observation and preserves persistence failure semantics”、“constructs deeply nested descendants without consuming the JavaScript call stack”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/session-query/tool-session-query

### [packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把会话、查询、工具相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Model-facing, workspace-authorized session-history search and read tools. @module @deepseek-ai/dsh-tool-session-query”；固定提交中扫描到的声明包括 `name`、`inject`、`DEFAULT_MAX_SEARCH_RESULTS`、`DEFAULT_SEARCH_TIMEOUT_MS`、`Config`；本地静态 import 图显示它直接依赖 8 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/session-query/tool-session-query/src/input.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/input.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)
- 对应测试：[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/session-query/tool-session-query/README.md`、入口和消费者，再读当前契约，沿着 `packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`、`scripts/gen-tool-catalog.ts` 看它怎样约束运行时，最后对照 `packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `name`、`inject`、`DEFAULT_MAX_SEARCH_RESULTS`、`DEFAULT_SEARCH_TIMEOUT_MS`、`Config`、`apply`、`resolveConfig`；源码顶部原注释（英文，仅作回查线索）：Model-facing, workspace-authorized session-history search and read tools. @module @deepseek-ai/dsh-tool-session-query。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/src/input.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/input.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供会话、查询、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model argument schemas, normalization, and filter construction. @module @deepseek-ai/dsh-tool-session-query/input”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Model argument schemas, normalization, and filter construction. @module @deepseek-ai/dsh-tool-session-query/input”；固定提交中扫描到的声明包括 `toolInput`、`buildSessionFilters`、`materializeParentSessionIds`、`buildEventFilters`、`normalizeQuery`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)、[packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/index.ts)、[packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/operations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/tool-session-query/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/session-query/session-query/src/index.ts` 和 `packages/session-query/tool-session-query/src/index.ts`、`packages/session-query/tool-session-query/src/operations.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `toolInput`、`buildSessionFilters`、`materializeParentSessionIds`、`buildEventFilters`、`normalizeQuery`、`sequenceRange`、`timestampRange`、`parseIsoTimestamp`；源码顶部原注释（英文，仅作回查线索）：Model argument schemas, normalization, and filter construction. @module @deepseek-ai/dsh-tool-session-query/input。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查会话、查询、工具必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-tool-session-query. @module @deepseek-ai/dsh-tool-session-query/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-tool-session-query. @module @deepseek-ai/dsh-tool-session-query/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/operations.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供会话、查询、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Tool operation orchestration over session-query service capabilities. @module @deepseek-ai/dsh-tool-session-query/operations”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Tool operation orchestration over session-query service capabilities. @module @deepseek-ai/dsh-tool-session-query/operations”；固定提交中扫描到的声明包括 `operations`、`executeSessionSearch`、`executeEventSearch`、`executeSessionTrace`、`executeEventTrace`；本地静态 import 图显示它直接依赖 9 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/tool-session-query/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/session-query/tool-session-query/src/index.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 281 行；扫描到的声明包括 `operations`、`executeSessionSearch`、`executeEventSearch`、`executeSessionTrace`、`executeEventTrace`、`executeEventRead`、`collectPages`；源码顶部原注释（英文，仅作回查线索）：Tool operation orchestration over session-query service capabilities. @module @deepseek-ai/dsh-tool-session-query/operations。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/presentation.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：呈现转换
- 这个文件有什么用：它把会话、查询、工具转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。
- 为什么这样设计：领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。
- 文件级设计证据：源码顶部注释把它定位为“Model text rendering and generic tool-call presentation. @module @deepseek-ai/dsh-tool-session-query/presentation”；固定提交中扫描到的声明包括 `presentation`、`formatSessionSearch`、`formatEmptySessionSearch`、`formatEventSearch`、`formatSessionTrace`；本地静态 import 图显示它直接依赖 4 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)、[packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/session-query/tool-session-query/src/index.ts`、`packages/session-query/tool-session-query/src/operations.ts` 确认状态如何进入 UI，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 255 行；扫描到的声明包括 `presentation`、`formatSessionSearch`、`formatEmptySessionSearch`、`formatEventSearch`、`formatSessionTrace`、`renderDescendants`、`formatEventTrace`、`formatEventRead`；源码顶部原注释（英文，仅作回查线索）：Model text rendering and generic tool-call presentation. @module @deepseek-ai/dsh-tool-session-query/presentation。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/src/service-boundary.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/service-boundary.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供会话、查询、工具的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“Session-query service error containment and model-safe translation. @module @deepseek-ai/dsh-tool-session-query/service-boundary”；固定提交中扫描到的声明包括 `serviceBoundary`、`unauthorizedTarget`、`call`、`sanitizeError`、`genericFailure`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/session-query/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/operations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/tool-session-query/README.md` 和入口，再读当前实现，沿着 `packages/llm/llm/src/index.ts`、`packages/session-query/session-query/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/session-query/tool-session-query/src/operations.ts`、`packages/session-query/tool-session-query/src/workspace-access.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 179 行；扫描到的声明包括 `serviceBoundary`、`unauthorizedTarget`、`call`、`sanitizeError`、`genericFailure`、`fullError`、`renderFullError`；源码顶部原注释（英文，仅作回查线索）：Session-query service error containment and model-safe translation. @module @deepseek-ai/dsh-tool-session-query/service-boundary。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/src/workspace-access.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/workspace-access.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：工具能力
- 这个文件有什么用：它提供会话、查询、工具的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Caller identity, workspace authorization, and visible lineage projection. @module @deepseek-ai/dsh-tool-session-query/workspace-access”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Caller identity, workspace authorization, and visible lineage projection. @module @deepseek-ai/dsh-tool-session-query/workspace-access”；固定提交中扫描到的声明包括 `workspaceAccess`、`callerOf`、`targetId`、`authorizeTarget`、`recordAuthorized`；本地静态 import 图显示它直接依赖 6 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/src/operations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/session-query/tool-session-query/README.md` 和入口，再读当前实现，沿着 `packages/core/session/src/index.ts`、`packages/core/tools/src/index.ts`、`packages/llm/llm/src/index.ts` 和 `packages/session-query/tool-session-query/src/operations.ts`、`packages/session-query/tool-session-query/src/presentation.ts` 确认输入输出，最后对照 `packages/core/tools/tests/gen-tool-catalog.spec.ts`、`packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts`、`packages/session-query/tool-session-query/tests/tool-session-query.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 255 行；扫描到的声明包括 `workspaceAccess`、`callerOf`、`targetId`、`authorizeTarget`、`recordAuthorized`、`headerAuthorized`、`assertObservedTargetAuthorized`、`authorizeSessionIds`；源码顶部原注释（英文，仅作回查线索）：Caller identity, workspace authorization, and visible lineage projection. @module @deepseek-ai/dsh-tool-session-query/workspace-access。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、工具的具体场景，包括“tool-session-query with the real SQLite provider”、“searches live prior-step history and a persisted same-workspace log”、“passes finite fractional epoch-millisecond bounds through SQLite comparisons”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“tool-session-query with the real SQLite provider”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `fakeAgent`；本地静态 import 图显示它直接依赖 9 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 230 行；扫描到的声明包括 `fakeAgent`；扫描到的测试主题包括 “tool-session-query with the real SQLite provider”、“searches live prior-step history and a persisted same-workspace log”、“passes finite fractional epoch-millisecond bounds through SQLite comparisons”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查会话、查询、工具的具体场景，包括“registration and schemas”、“registers the five cursor-free tools, prompt, timeouts, and pure generic presenters, th...”、“keeps generation-bound searches exclusive while exact observations remain parallel”、“fails invalid direct config before registering anything”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“registration and schemas”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `header`、`createSession`、`openStep`、`fakeAgent`、`sessionHit`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session-query/tool-session-query/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`、`packages/core/system-prompt/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 2075 行；扫描到的声明包括 `header`、`createSession`、`openStep`、`fakeAgent`、`sessionHit`、`eventHit`、`FakeQuery`、`mount`；扫描到的测试主题包括 “registration and schemas”、“registers the five cursor-free tools, prompt, timeouts, and pure generic presenters, then disposes them”、“keeps generation-bound searches exclusive while exact observations remain parallel”、“fails invalid direct config before registering anything”、“expresses the complete Node timer range in the Loader config schema”、“input validation and translation”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
