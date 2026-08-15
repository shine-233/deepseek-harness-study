# 源文件索引：packages/session-query

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 48 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/Dialog.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它负责 会话、浏览器端；固定提交中扫描到的公开或顶层声明包括 `SessionLogDownloadDialogInjected`、`SessionLogDownloadDialogProps`、`SessionLogDownloadDialog`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交中它与 5 个相对依赖和 5 个直接使用者相连；保持这个文件职责较窄，可以让依赖方向和替换边界清楚。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-slots/src/index.ts)、[packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/HeaderAction.tsx)
- 对应测试：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)、[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `SessionLogDownloadDialogInjected`、`SessionLogDownloadDialogProps`、`SessionLogDownloadDialog`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/client/HeaderAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/HeaderAction.module.css)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 会话、浏览器端 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：样式不和业务流程混在一起，浏览器端可以调整外观而不改变服务端或 agent 的行为。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/HeaderAction.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 36 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/HeaderAction.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它负责 会话、浏览器端；固定提交中扫描到的公开或顶层声明包括 `SessionLogDownloadHeaderAction`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交中它与 3 个相对依赖和 3 个直接使用者相连；保持这个文件职责较窄，可以让依赖方向和替换边界清楚。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-primitives/src/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/HeaderAction.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/HeaderAction.module.css)、[packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/index.ts)
- 对应测试：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `SessionLogDownloadHeaderAction`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/controller.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、浏览器端；文件顶部注释把它定位为“Browser download state shared by the Session Header button and /export.”。固定提交中扫描到的公开或顶层声明包括 `SessionLogDownloadStatus`、`SessionLogDownloadEntry`、`SessionLogDownloadState`、`sessionLogZipFilename`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Browser download state shared by the Session Header button and /export.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/index.ts)、[packages/session-query/session-log-export/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/controller.client.spec.ts)
- 对应测试：[packages/session-query/session-log-export/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/controller.client.spec.ts)、[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `SessionLogDownloadStatus`、`SessionLogDownloadEntry`、`SessionLogDownloadState`、`sessionLogZipFilename`、`downloadUrl`、`SessionLogDownloadController`、`hostBase`、`messageOf`；文件顶部注释线索：Browser download state shared by the Session Header button and /export.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 会话、浏览器端 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/client/ui-commands/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-commands/src/client/index.ts)、[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)
- 对应测试：[packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `inject`、`apply`；文件顶部注释线索：Browser plugin owning Session export download state and its shared modal.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/locales.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、浏览器端；文件顶部注释把它定位为“Locale namespace owned by Session export browser feedback.”。固定提交中扫描到的公开或顶层声明包括 `NS`、`zh`、`en`、`SessionLogDownloadKey`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Locale namespace owned by Session export browser feedback.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/index.ts)、[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)
- 对应测试：[packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)、[packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `NS`、`zh`、`en`、`SessionLogDownloadKey`；文件顶部注释线索：Locale namespace owned by Session export browser feedback.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/css-modules.d.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：它被放在 packages/session-query/session-log-export/src 的 功能实现 层中；独立成文件可以让这项规则有明确的维护位置，并能单独被检查。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 6 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 会话 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/interaction/commands/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/session-query/session-log-export/tests/command.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/command.client.spec.ts)、[packages/session-query/session-log-export/tests/loader-composition.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/loader-composition.client.spec.ts)
- 对应测试：[packages/session-query/session-log-export/tests/command.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/command.client.spec.ts)、[packages/session-query/session-log-export/tests/loader-composition.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/loader-composition.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Web Session-log download command over the host endpoint owned by ApiProxy.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 会话 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/session-query/session-log-export/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/invariant.client.spec.ts)
- 对应测试：[packages/session-query/session-log-export/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 22 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package invariant companion for @deepseek-ai/dsh-session-log-export.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/client-apply.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/client-apply.client.spec.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话、浏览器端 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/client/ui-conversation/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/ui-conversation/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 86 行；扫描到的声明包括 `declare`、`bench`；扫描到的测试主题包括 “session-log-download browser plugin”、“provides one controller and removes its Header contribution on disposal”、“downloads only for an export execution acknowledged by this browser client”、“re-registers after the declaring Header slot collapses and returns”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/command.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/command.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/interaction/commands/src/index.ts)、[packages/session-query/session-log-export/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的测试主题包括 “/export Web download command”、“registers one pathless command and removes it with the plugin fiber”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/controller.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/controller.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/controller.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 146 行；扫描到的测试主题包括 “SessionLogDownloadController”、“downloads the host ZIP and publishes one shared success state”、“collapses concurrent gestures and preserves a dismissed dialog”、“publishes HTTP and transport failures without leaking rejections”、“aborts active fetches on disposal and rejects later requests”、“uses the null-origin fallback and default browser operations”；文件顶部注释线索：@vitest-environment jsdom。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/dialog.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/dialog.client.spec.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/controller.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/controller.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `bench`、`useSessionLogDownload`；扫描到的测试主题包括 “SessionLogDownloadDialog”、“shows a controller failure and closes it without reading Session history”、“renders the in-flight state and the settled browser download state”、“uses fallback copy when a failure has no detail”；文件顶部注释线索：@vitest-environment jsdom。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/header-action.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/header-action.client.spec.tsx)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/runtime/src/client/index.ts)、[packages/session-query/session-log-export/src/client/Dialog.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/Dialog.tsx)、[packages/session-query/session-log-export/src/client/HeaderAction.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/client/HeaderAction.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 72 行；扫描到的声明包括 `bindSessionExport`、`bench`；扫描到的测试主题包括 “Session export Header action”、“renders the 111×32 text capsule and downloads through the shared controller”、“disables the capsule while either entry path downloads this Session”；文件顶部注释线索：@vitest-environment jsdom。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/invariant.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/session-query/session-log-export/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/src/invariant.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 16 行；扫描到的测试主题包括 “@deepseek-ai/dsh-session-log-export/invariant”、“registers the package-owned empty companion”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tests/loader-composition.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tests/loader-composition.client.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/interaction/commands/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/interaction/commands/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的测试主题包括 “session-log-download real Loader composition”、“discovers and executes /export through the assembled command plane”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-log-export/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/tsdown.config.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它定义 会话 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/session-query/session-log-export/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-log-export/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 3 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 会话 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query-sqlite/src/query.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/query.ts)、[packages/session-query/session-query-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/schema.ts)、[packages/examples/acp-demo/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/src/index.ts)
- 对应测试：[packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1103 行；扫描到的声明包括 `SESSION_QUERY_SQLITE_PATH_KEY`、`SESSION_QUERY_SQLITE_DEFAULT_LIMIT`、`SESSION_QUERY_SQLITE_MAX_LIMIT`、`SESSION_QUERY_SQLITE_SNIPPET_CHARS`、`OpenAt`、`Config`、`SqliteSessionQueryEngine`、`headerBindings`；文件顶部注释线索：Concrete session-query service with SQLite FTS5 over the live-preferred corpus. @module @deepseek-ai/dsh-session-query-sqlite。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 会话 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-session-query-sqlite. @module @deepseek-ai/dsh-session-query-sqlite/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/src/query.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/query.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Request normalization, parameterized predicates, and result presentation.”。固定提交中扫描到的公开或顶层声明包括 `FTS_HIGHLIGHT_START`、`FTS_HIGHLIGHT_END`、`SQLITE_MAX_PAGE_LIMIT`、`SQLITE_PORTABLE_VARIABLE_LIMIT`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Request normalization, parameterized predicates, and result presentation.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/index.ts)、[packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/query.spec.ts)
- 对应测试：[packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 477 行；扫描到的声明包括 `FTS_HIGHLIGHT_START`、`FTS_HIGHLIGHT_END`、`SQLITE_MAX_PAGE_LIMIT`、`SQLITE_PORTABLE_VARIABLE_LIMIT`、`SQLITE_FTS5_OUTER_PREDICATE_LIMIT`、`assertPortableBindingCount`、`assertFts5OuterPredicateCount`、`QueryLimits`；文件顶部注释线索：Request normalization, parameterized predicates, and result presentation.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/src/schema.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/schema.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义 会话、数据 schema 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 173 行；扫描到的声明包括 `SESSION_QUERY_SQLITE_SCHEMA_VERSION`、`SESSION_QUERY_SQLITE_APPLICATION_ID`、`JournalMode`、`openSearchDatabase`、`createDatabaseFile`、`listUserTables`、`assertDerivedUserTables`、`resetDerivedSchema`；文件顶部注释线索：SQLite schema for the disposable session full-text read model.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/tests/load-path.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/load-path.e2e.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 65 行；扫描到的声明包括 `temporaryPath`；扫描到的测试主题包括 “dsh-session-query-sqlite real Loader path”、“unwraps, mounts, and searches the real persistence backend”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/query.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query-sqlite/src/query.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/query.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 262 行；扫描到的声明包括 `expectCode`；扫描到的测试主题包括 “SQLite search request normalization”、“normalizes both scopes, defaults arrays and limits, and preserves cursors”、“rejects non-text, blank, non-integer, non-positive, and oversized requests”、“materializes owned filter values during normalization”、“SQLite search predicate compilation”、“compiles all logical-session clauses including empty and nullable values”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-query-sqlite/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query-sqlite/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1819 行；扫描到的声明包括 `temporaryPath`、`header`、`messageEvents`、`expectCode`、`replaceCursorOffset`、`TestPersistence`、`liveContext`；扫描到的测试主题包括 “SQLite session search”、“defaults and validates opening policy and persisted inspection concurrency through its Cordis config”、“mounts and disposes first-search mode without opening its database”、“refuses search in never mode while inherited reads and traces keep working”、“opens once on the first search and reuses readiness for later searches”、“shares one readiness promise across concurrent first searches”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：配置与数据形状
- 这个文件有什么用：它定义 会话、配置 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/corpus.ts)、[packages/session-query/session-query/src/documents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/documents.ts)、[packages/session-query/session-query/src/filters.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/filters.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 48 行；扫描到的声明包括 `SESSION_QUERY_READ_WINDOW_MAX`、`SESSION_QUERY_DEFAULT_PERSISTED_INSPECT_CONCURRENCY`、`Config`、`SessionQueryErrorCode`、`SessionQueryError`；文件顶部注释线索：Public configuration and typed failures for the combined session-query service.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/corpus.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Live/persisted logical-corpus resolution for session-query.”。固定提交中扫描到的公开或顶层声明包括 `LogicalSession`、`LogicalSessionSource`、`LogicalProjectionResult`、`SessionCorpus`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Live/persisted logical-corpus resolution for session-query.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/sources.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/sources.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 309 行；扫描到的声明包括 `LogicalSession`、`LogicalSessionSource`、`LogicalProjectionResult`、`SessionCorpus`、`projectSource`、`sourceLive`、`orderedResults`、`listPersisted`；文件顶部注释线索：Live/persisted logical-corpus resolution for session-query.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/cursor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/cursor.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Opaque cursor identity for session-search pagination.”。固定提交中扫描到的公开或顶层声明包括 `SessionSearchCursor`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Opaque cursor identity for session-search pagination.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/brand/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 15 行；扫描到的声明包括 `SessionSearchCursor`；文件顶部注释线索：Opaque cursor identity for session-search pagination.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/documents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/documents.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Shared event metadata and semantic-document projection.”。固定提交中扫描到的公开或顶层声明包括 `buildSessionEventRecords`、`buildSessionEventSearchDocuments`、`classifySurface`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared event metadata and semantic-document projection.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/extraction.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/extraction.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `buildSessionEventRecords`、`buildSessionEventSearchDocuments`、`classifySurface`；文件顶部注释线索：Shared event metadata and semantic-document projection.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/extraction.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/extraction.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“First-party semantic text extraction for session-query consumers.”。固定提交中扫描到的公开或顶层声明包括 `extractSessionEventText`、`turnEndText`、`contentText`、`blockText`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“First-party semantic text extraction for session-query consumers.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/documents.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/documents.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 87 行；扫描到的声明包括 `extractSessionEventText`、`turnEndText`、`contentText`、`blockText`、`joinText`；文件顶部注释线索：First-party semantic text extraction for session-query consumers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/filters.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/filters.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Pure provider-independent predicates for logical sessions and event text.”。固定提交中扫描到的公开或顶层声明包括 `filterSessionResults`、`filterSessionEventDocuments`、`materializeSessionResultFilters`、`materializeSessionEventResultFilters`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Pure provider-independent predicates for logical sessions and event text.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/types.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 243 行；扫描到的声明包括 `filterSessionResults`、`filterSessionEventDocuments`、`materializeSessionResultFilters`、`materializeSessionEventResultFilters`、`compileSessionTextFilter`、`sessionPredicate`、`eventPredicate`、`copyStrings`；文件顶部注释线索：Pure provider-independent predicates for logical sessions and event text.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 会话 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/corpus.ts)、[packages/context/session-reference/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/src/index.ts)
- 对应测试：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/host/apiproxy/tests/api-proxy-search.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-search.spec.ts)、[packages/host/apiproxy/tests/session-export.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/session-export.spec.ts)、[packages/session-query/session-query-sqlite/tests/query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/query.spec.ts)、[packages/session-query/session-query-sqlite/tests/sqlite.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query-sqlite/tests/sqlite.spec.ts)、[packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/search-helpers.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 359 行；文件顶部注释线索：Service Definition for combined session-history reads, traces, filters, and full-text search. @module @deepseek-ai/dsh-session-query。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 会话 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-session-query. @module @deepseek-ai/dsh-session-query/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/sources.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/sources.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“Shared immutable-header checks for logical session source observers.”。固定提交中扫描到的公开或顶层声明包括 `assertSessionHeadersCompatible`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared immutable-header checks for logical session source observers.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/corpus.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `assertSessionHeadersCompatible`；文件顶部注释线索：Shared immutable-header checks for logical session source observers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/tracing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/tracing.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话；文件顶部注释把它定位为“One-shot session-lineage and event-relationship tracing helpers.”。固定提交中扫描到的公开或顶层声明包括 `eventRecords`、`currentSurfaceEvents`、`traceEvent`、`traceSession`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“One-shot session-lineage and event-relationship tracing helpers.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/config.ts)、[packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/types.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 248 行；扫描到的声明包括 `eventRecords`、`currentSurfaceEvents`、`traceEvent`、`traceSession`、`analyzeEventLog`、`eventSources`、`buildDescendants`、`cloneRecord`；文件顶部注释线索：One-shot session-lineage and event-relationship tracing helpers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/types.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 会话 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/cursor.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/cursor.ts)、[packages/session/session-title/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-title/src/index.ts)、[packages/session-query/session-query/src/corpus.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/corpus.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/context/session-reference/tests/session-reference.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/context/session-reference/tests/session-reference.spec.ts)、[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/examples/acp-demo/tests/acp-agent.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/acp-demo/tests/acp-agent.spec.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/host/apiproxy/tests/api-proxy-approval.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-approval.spec.ts)、[packages/host/apiproxy/tests/api-proxy-blank.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-blank.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 279 行；扫描到的声明包括 `SessionEventSurface`、`SessionRecord`、`SessionSurfaceSnapshot`、`SessionLogSnapshot`、`SessionEventRecord`、`SessionLineageNode`、`SessionLineageTrace`、`SessionEventTraceRequest`；文件顶部注释线索：Public records for exact reads and relationship traces over the live-preferred logical session corpus. @module @deepseek-ai/dsh-session-query/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/search-helpers.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 300 行；扫描到的声明包括 `header`、`expectCode`；扫描到的测试主题包括 “session-query semantic extraction”、“extracts first-party message, tool, todo, and failure detail”、“extracts meaningful turn outcomes and skips structural or unknown events”、“session-query document and filter helpers”、“classifies every event and omits non-semantic documents”、“applies every session clause with OR values and validates closed values”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/session-query.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1222 行；扫描到的声明包括 `header`、`eventLog`、`TestPersistence`、`liveContext`、`expectCode`、`rejectUnknown`；扫描到的测试主题包括 “preserves an exact pre-abort reason without entering persistence”、“forwards in-flight cancellation and waits for persistence cleanup before rejecting”、“preserves cancellation after a persistence implementation ignores the signal”、“forwards in-flight list cancellation and waits for cleanup before rejecting”、“waits for an ignoring backend to return before preserving the abort reason”、“forwards cancellation and waits for inspection cleanup before rejecting”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/test-service.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为 会话 的测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/search-helpers.spec.ts)、[packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/session-query.spec.ts)、[packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/tracing.spec.ts)
- 对应测试：[packages/session-query/session-query/tests/search-helpers.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/search-helpers.spec.ts)、[packages/session-query/session-query/tests/session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/session-query.spec.ts)、[packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/tracing.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行；扫描到的声明包括 `TestSessionQueryEngine`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/session-query/tests/tracing.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/tracing.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/session-query/session-query/tests/test-service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/tests/test-service.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 486 行；扫描到的声明包括 `mutableHeader`、`header`、`appendEvent`、`TracePersistence`、`queryContext`、`expectCode`、`appendTraceEvents`；扫描到的测试主题包括 “session lineage tracing”、“returns complete ancestry, deterministic descendant trees, and detached records”、“represents root and unresolved-parent traces explicitly”、“rejects target-connected cycles and missing targets”、“uses one cross-corpus observation and preserves persistence failure semantics”、“constructs deeply nested descendants without consuming the JavaScript call stack”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/index.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 会话、工具 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/session-query/tool-session-query/src/input.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/input.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)
- 对应测试：[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `name`、`inject`、`DEFAULT_MAX_SEARCH_RESULTS`、`DEFAULT_SEARCH_TIMEOUT_MS`、`Config`、`apply`、`resolveConfig`；文件顶部注释线索：Model-facing, workspace-authorized session-history search and read tools. @module @deepseek-ai/dsh-tool-session-query。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/input.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/input.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、工具；文件顶部注释把它定位为“Model argument schemas, normalization, and filter construction. @module @deepseek-ai/dsh-tool-session-query/input”。固定提交中扫描到的公开或顶层声明包括 `toolInput`、`buildSessionFilters`、`materializeParentSessionIds`、`buildEventFilters`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model argument schemas, normalization, and filter construction. @module @deepseek-ai/dsh-tool-session-query/input”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/index.ts)、[packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/operations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 307 行；扫描到的声明包括 `toolInput`、`buildSessionFilters`、`materializeParentSessionIds`、`buildEventFilters`、`normalizeQuery`、`sequenceRange`、`timestampRange`、`parseIsoTimestamp`；文件顶部注释线索：Model argument schemas, normalization, and filter construction. @module @deepseek-ai/dsh-tool-session-query/input。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/invariant.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 会话、工具 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-tool-session-query. @module @deepseek-ai/dsh-tool-session-query/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/operations.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、工具；文件顶部注释把它定位为“Tool operation orchestration over session-query service capabilities. @module @deepseek-ai/dsh-tool-session-query/operations”。固定提交中扫描到的公开或顶层声明包括 `operations`、`executeSessionSearch`、`executeEventSearch`、`executeSessionTrace`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Tool operation orchestration over session-query service capabilities. @module @deepseek-ai/dsh-tool-session-query/operations”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 281 行；扫描到的声明包括 `operations`、`executeSessionSearch`、`executeEventSearch`、`executeSessionTrace`、`executeEventTrace`、`executeEventRead`、`collectPages`；文件顶部注释线索：Tool operation orchestration over session-query service capabilities. @module @deepseek-ai/dsh-tool-session-query/operations。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/presentation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/presentation.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、工具；文件顶部注释把它定位为“Model text rendering and generic tool-call presentation. @module @deepseek-ai/dsh-tool-session-query/presentation”。固定提交中扫描到的公开或顶层声明包括 `presentation`、`formatSessionSearch`、`formatEmptySessionSearch`、`formatEventSearch`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Model text rendering and generic tool-call presentation. @module @deepseek-ai/dsh-tool-session-query/presentation”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[packages/session-query/tool-session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 255 行；扫描到的声明包括 `presentation`、`formatSessionSearch`、`formatEmptySessionSearch`、`formatEventSearch`、`formatSessionTrace`、`renderDescendants`、`formatEventTrace`、`formatEventRead`；文件顶部注释线索：Model text rendering and generic tool-call presentation. @module @deepseek-ai/dsh-tool-session-query/presentation。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/service-boundary.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/service-boundary.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、工具；文件顶部注释把它定位为“Session-query service error containment and model-safe translation. @module @deepseek-ai/dsh-tool-session-query/service-boundary”。固定提交中扫描到的公开或顶层声明包括 `serviceBoundary`、`unauthorizedTarget`、`call`、`sanitizeError`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Session-query service error containment and model-safe translation. @module @deepseek-ai/dsh-tool-session-query/service-boundary”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/session-query/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/session-query/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/operations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 179 行；扫描到的声明包括 `serviceBoundary`、`unauthorizedTarget`、`call`、`sanitizeError`、`genericFailure`、`fullError`、`renderFullError`；文件顶部注释线索：Session-query service error containment and model-safe translation. @module @deepseek-ai/dsh-tool-session-query/service-boundary。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/src/workspace-access.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/workspace-access.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 会话、工具；文件顶部注释把它定位为“Caller identity, workspace authorization, and visible lineage projection. @module @deepseek-ai/dsh-tool-session-query/workspace-access”。固定提交中扫描到的公开或顶层声明包括 `workspaceAccess`、`callerOf`、`targetId`、`authorizeTarget`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Caller identity, workspace authorization, and visible lineage projection. @module @deepseek-ai/dsh-tool-session-query/workspace-access”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/tools/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/src/index.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/llm/llm/src/index.ts)、[packages/session-query/tool-session-query/src/operations.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/src/operations.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/core/tools/tests/gen-tool-catalog.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/tests/gen-tool-catalog.spec.ts)、[packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)、[packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 255 行；扫描到的声明包括 `workspaceAccess`、`callerOf`、`targetId`、`authorizeTarget`、`recordAuthorized`、`headerAuthorized`、`assertObservedTargetAuthorized`、`authorizeSessionIds`；文件顶部注释线索：Caller identity, workspace authorization, and visible lineage projection. @module @deepseek-ai/dsh-tool-session-query/workspace-access。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/sqlite-integration.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话、工具 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 230 行；扫描到的声明包括 `fakeAgent`；扫描到的测试主题包括 “tool-session-query with the real SQLite provider”、“searches live prior-step history and a persisted same-workspace log”、“passes finite fractional epoch-millisecond bounds through SQLite comparisons”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/session-query/tool-session-query/tests/tool-session-query.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/tests/tool-session-query.spec.ts)

- 所属层：packages/session-query：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 会话、工具 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/session-query/tool-session-query/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session-query/tool-session-query/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 2075 行；扫描到的声明包括 `header`、`createSession`、`openStep`、`fakeAgent`、`sessionHit`、`eventHit`、`FakeQuery`、`mount`；扫描到的测试主题包括 “registration and schemas”、“registers the five cursor-free tools, prompt, timeouts, and pure generic presenters, then disposes them”、“keeps generation-bound searches exclusive while exact observations remain parallel”、“fails invalid direct config before registering anything”、“expresses the complete Node timer range in the Loader config schema”、“input validation and translation”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
