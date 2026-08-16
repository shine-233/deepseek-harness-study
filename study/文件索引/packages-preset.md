# 源文件索引：packages/preset

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 25 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/preset/agent-presets/src/authoring.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/authoring.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：Agent preset 实现
- 这个文件有什么用：这个文件负责 Agent preset 的发现、挂载、元数据或创作，把可复用的 Agent 配置组合成用户可选择的入口。
- 为什么这样设计：preset 的发现、元数据和挂载分开于 Agent 执行，用户可以选择或复制配置而不直接编辑系统组合。
- 文件级设计证据：源码顶部注释把它定位为“Copying, reading, and deleting locally authored presets. Authoring is confined to a user root: the shipped .system set is part of the deployment, and letting a browser rewrite it would turn "reset to a known preset" into something the same caller could have...”；固定提交中扫描到的声明包括 `InvalidPresetIdError`、`PresetExistsError`、`PresetNotWritableError`、`writableRoot`、`readComposition`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/metadata.ts)、[packages/preset/agent-presets/src/preset.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/preset.ts)、[packages/util/atomic-write/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/atomic-write/src/index.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/scaffold-hermetic.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold-hermetic.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/preset/agent-presets/README.md` 和入口，再读当前实现，沿着 `packages/preset/agent-presets/src/metadata.ts`、`packages/preset/agent-presets/src/preset.ts`、`packages/util/atomic-write/src/index.ts` 和 `packages/preset/agent-presets/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 196 行；扫描到的声明包括 `InvalidPresetIdError`、`PresetExistsError`、`PresetNotWritableError`、`writableRoot`、`readComposition`、`copyComposition`、`deleteComposition`、`occupied`；源码顶部原注释（英文，仅作回查线索）：Copying, reading, and deleting locally authored presets. Authoring is confined to a user root: the shipped .system set is part of the deployment, and letting a browser rewrite it would turn "reset to a known preset" into something the same caller could have...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/discovery.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/discovery.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：Agent preset 实现
- 这个文件有什么用：这个文件负责 Agent preset 的发现、挂载、元数据或创作，把可复用的 Agent 配置组合成用户可选择的入口。
- 为什么这样设计：preset 的发现、元数据和挂载分开于 Agent 执行，用户可以选择或复制配置而不直接编辑系统组合。
- 文件级设计证据：源码顶部注释把它定位为“Filesystem discovery of agent presets. A preset is a directory holding COMPOSITION_FILE, optionally beside a METADATA_FILE carrying its display text; the directory name is the preset id. Discovery re-reads the roots on every call so a preset authored while ...”；固定提交中扫描到的声明包括 `COMPOSITION_FILE`、`USER_PRESET_DIR`、`scanRoot`、`discoverPresets`、`entryListProblem`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/metadata.ts)、[packages/preset/agent-presets/src/preset.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/preset.ts)、[packages/util/home-paths/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/util/home-paths/src/index.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/scaffold-hermetic.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold-hermetic.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/preset/agent-presets/README.md` 和入口，再读当前实现，沿着 `packages/preset/agent-presets/src/metadata.ts`、`packages/preset/agent-presets/src/preset.ts`、`packages/util/home-paths/src/index.ts` 和 `packages/preset/agent-presets/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 186 行；扫描到的声明包括 `COMPOSITION_FILE`、`USER_PRESET_DIR`、`scanRoot`、`discoverPresets`、`entryListProblem`、`compositionProblem`、`isFile`；源码顶部原注释（英文，仅作回查线索）：Filesystem discovery of agent presets. A preset is a directory holding COMPOSITION_FILE, optionally beside a METADATA_FILE carrying its display text; the directory name is the preset id. Discovery re-reads the roots on every call so a preset authored while ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent presets: each session composes its model-facing plugin set from one preset cordis.yml, mounted ONCE per preset under a standing scope and joined by every agent that names it. The standing mount is what makes a preset one composition rather than one pe...”；固定提交中扫描到的声明包括 `SETTINGS_NAMESPACE`、`AgentPresetSettings`、`AgentPresetSettingsSchema`、`AgentPresets`、`compositionStamp`；本地静态 import 图显示它直接依赖 13 个源文件，并被 15 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/preset/agent-presets/src/authoring.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/authoring.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)
- 对应测试：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/scaffold-hermetic.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold-hermetic.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/preset/agent-presets/tests/authoring.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/authoring.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[apps/web/tests/scaffold.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold.ts)
- 阅读顺序：先读 `packages/preset/agent-presets/README.md`、入口和消费者，再读当前契约，沿着 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`、`apps/web/tests/scaffold-hermetic.e2e.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`、`apps/web/tests/scaffold-hermetic.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 572 行；扫描到的声明包括 `SETTINGS_NAMESPACE`、`AgentPresetSettings`、`AgentPresetSettingsSchema`、`AgentPresets`、`compositionStamp`、`sameStamp`；源码顶部原注释（英文，仅作回查线索）：Agent presets: each session composes its model-facing plugin set from one preset cordis.yml, mounted ONCE per preset under a standing scope and joined by every agent that names it. The standing mount is what makes a preset one composition rather than one pe...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/invariant.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-agent-presets. @module @deepseek-ai/dsh-agent-presets/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)、[packages/preset/agent-presets/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/invariant.spec.ts)
- 对应测试：[packages/preset/agent-presets/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/invariant.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/agent/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/preset/agent-presets/src/index.ts` 和 `packages/preset/agent-presets/tests/invariant.spec.ts` 理解状态变化，最后对照 `packages/preset/agent-presets/tests/invariant.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 80 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-agent-presets. @module @deepseek-ai/dsh-agent-presets/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/metadata.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：Agent preset 实现
- 这个文件有什么用：这个文件负责 Agent preset 的发现、挂载、元数据或创作，把可复用的 Agent 配置组合成用户可选择的入口。
- 为什么这样设计：preset 的发现、元数据和挂载分开于 Agent 执行，用户可以选择或复制配置而不直接编辑系统组合。
- 文件级设计证据：源码顶部注释把它定位为“A preset's display metadata: the name and description a picker shows. It lives in its own file because the composition is a top-level list of plugin rows — YAML cannot carry sibling keys beside it, and faking a metadata row would hand the Loader something t...”；固定提交中扫描到的声明包括 `METADATA_FILE`、`PresetMetadata`、`readPresetMetadata`、`renderPresetMetadata`、`text`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/authoring.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/authoring.ts)、[packages/preset/agent-presets/src/discovery.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/discovery.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：[packages/preset/agent-presets/tests/metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/metadata.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/preset/agent-presets/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/preset/agent-presets/src/authoring.ts`、`packages/preset/agent-presets/src/discovery.ts`、`packages/preset/agent-presets/src/index.ts` 确认输入输出，最后对照 `packages/preset/agent-presets/tests/metadata.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 105 行；扫描到的声明包括 `METADATA_FILE`、`PresetMetadata`、`readPresetMetadata`、`renderPresetMetadata`、`text`；源码顶部原注释（英文，仅作回查线索）：A preset's display metadata: the name and description a picker shows. It lives in its own file because the composition is a top-level list of plugin rows — YAML cannot carry sibling keys beside it, and faking a metadata row would hand the Loader something t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/mount.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/mount.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：Agent preset 实现
- 这个文件有什么用：这个文件负责 Agent preset 的发现、挂载、元数据或创作，把可复用的 Agent 配置组合成用户可选择的入口。
- 为什么这样设计：preset 的发现、元数据和挂载分开于 Agent 执行，用户可以选择或复制配置而不直接编辑系统组合。
- 文件级设计证据：源码顶部注释把它定位为“Mount one preset composition under an agent's scope context, then prove the result is usable before the agent is published. The scope context is what makes the composition per-session: entry contexts chain to the context the subtree was plugged into, so eve...”；固定提交中扫描到的声明包括 `PresetMount`、`livePresetMounts`、`leakedServices`、`JoinedPresetMount`、`standingMountFor`；本地静态 import 图显示它直接依赖 5 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/preset/agent-presets/src/preset.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/preset.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/scaffold-hermetic.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold-hermetic.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/preset/agent-presets/README.md` 和入口，再读当前实现，沿着 `packages/core/scope/src/index.ts`、`packages/preset/agent-presets/src/preset.ts`、`vendor/cordis/src/index.ts` 和 `packages/preset/agent-presets/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 381 行；扫描到的声明包括 `PresetMount`、`livePresetMounts`、`leakedServices`、`JoinedPresetMount`、`standingMountFor`、`serviceForAgent`、`inactiveRows`、`mountPreset`；源码顶部原注释（英文，仅作回查线索）：Mount one preset composition under an agent's scope context, then prove the result is usable before the agent is published. The scope context is what makes the composition per-session: entry contexts chain to the context the subtree was plugged into, so eve...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/preset.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/preset.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：Agent preset 实现
- 这个文件有什么用：这个文件负责 Agent preset 的发现、挂载、元数据或创作，把可复用的 Agent 配置组合成用户可选择的入口。
- 为什么这样设计：preset 的发现、元数据和挂载分开于 Agent 执行，用户可以选择或复制配置而不直接编辑系统组合。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset vocabulary shared by discovery, mounting, and consumers.”；固定提交中扫描到的声明包括 `PresetTrust`、`PRESET_ID`、`AgentPreset`、`PresetRoot`、`Config`；本地静态 import 图显示它直接依赖 0 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/authoring.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/authoring.ts)、[packages/preset/agent-presets/src/discovery.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/discovery.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/minimal-preset.snapshot.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/minimal-preset.snapshot.ts)、[apps/web/tests/scaffold-hermetic.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/scaffold-hermetic.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/preset/agent-presets/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/preset/agent-presets/src/authoring.ts`、`packages/preset/agent-presets/src/discovery.ts`、`packages/preset/agent-presets/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/agent-preset-selection.e2e.ts`、`apps/web/tests/minimal-preset.snapshot.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `PresetTrust`、`PRESET_ID`、`AgentPreset`、`PresetRoot`、`Config`、`UnknownPresetError`、`PresetMountError`；源码顶部原注释（英文，仅作回查线索）：Agent-preset vocabulary shared by discovery, mounting, and consumers.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/session.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护智能体、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“The session-log record of which preset a session actually runs. The creation header names the preset a session STARTED with, and it is deep-frozen because that is a creation fact. A session may still change preset while it is blank, and the effect of that c...”；固定提交中扫描到的声明包括 `PresetBearingSession`、`resolveSessionPreset`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)、[packages/preset/agent-presets/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/session.spec.ts)
- 对应测试：[packages/preset/agent-presets/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/session.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/session/src/index.ts` 和 `packages/preset/agent-presets/src/index.ts`、`packages/preset/agent-presets/tests/session.spec.ts` 理解状态变化，最后对照 `packages/preset/agent-presets/tests/session.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `PresetBearingSession`、`resolveSessionPreset`；源码顶部原注释（英文，仅作回查线索）：The session-log record of which preset a session actually runs. The creation header names the preset a session STARTED with, and it is deep-frozen because that is a creation fact. A session may still change preset while it is blank, and the effect of that c...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/types.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述智能体中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Client-safe event declarations owned by the agent-preset domain.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/types.ts)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/client/index.ts)、[packages/api/remotes/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/api/remotes/src/index.ts)、[packages/host/apiproxy/src/api-proxy.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/src/api-proxy.ts)
- 对应测试：[packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts)、[packages/preset/agent-presets/tests/mount.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/mount.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/preset/agent-presets/README.md`、入口和消费者，再读当前契约，沿着 `packages/api/remotes/src/client/index.ts`、`packages/api/remotes/src/index.ts`、`packages/host/apiproxy/src/api-proxy.ts` 看它怎样约束运行时，最后对照 `packages/host/apiproxy/tests/api-proxy-agent-preset.spec.ts`、`packages/preset/agent-presets/tests/mount.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 17 行；源码顶部原注释（英文，仅作回查线索）：Client-safe event declarations owned by the agent-preset domain.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/authoring.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/authoring.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“copying a preset”、“copies a shipped preset into the user root and lists it”、“copies the whole directory and tightens POSIX modes”、“keeps the source description but never its name or order”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“copying a preset”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Authoring a preset copies an existing one's directory into the deployment's user root — copy is the only authoring write, so no caller ever supplies composition text. The id is a directory name, so its pattern is a containment boundary rather than a style r...”；固定提交中扫描到的声明包括 `seedPreset`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/preset/agent-presets/src/index.ts`、`vendor/cordis/src/index.ts`、`vendor/include/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 303 行；扫描到的声明包括 `seedPreset`；扫描到的测试主题包括 “copying a preset”、“copies a shipped preset into the user root and lists it”、“copies the whole directory and tightens POSIX modes”、“keeps the source description but never its name or order”、“stores the display name the author supplied”、“publishes no metadata file when there is nothing to publish”；源码顶部原注释（英文，仅作回查线索）：Authoring a preset copies an existing one's directory into the deployment's user root — copy is the only authoring write, so no caller ever supplies composition text. The id is a directory name, so its pattern is a containment boundary rather than a style r...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/discovery.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/discovery.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“display order”、“puts declared order first, then everything else by id”、“breaks a tie between equal declared orders by id”、“preset discovery”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“display order”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `scanned`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/preset/agent-presets/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 221 行；扫描到的声明包括 `scanned`；扫描到的测试主题包括 “display order”、“puts declared order first, then everything else by id”、“breaks a tie between equal declared orders by id”、“preset discovery”、“reports one preset per directory holding a composition, ordered by id”、“reports a directory with no composition as a broken preset slot”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/fixtures/plugins/contribute.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/fixtures/plugins/contribute.js)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为智能体的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“A preset row: registers one tool and one prompt section, both named from config. Import-free on purpose — the Loader resolves entry modules through Node's ESM resolver, which cannot see this workspace's TypeScript sources.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：A preset row: registers one tool and one prompt section, both named from config. Import-free on purpose — the Loader resolves entry modules through Node's ESM resolver, which cannot see this workspace's TypeScript sources.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/fixtures/plugins/global-service.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/fixtures/plugins/global-service.js)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为智能体的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Publishes a service with no isolate realm, so it lands in the ROOT realm.”；固定提交中扫描到的声明包括 `name`、`apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 5 行；扫描到的声明包括 `name`、`apply`；源码顶部原注释（英文，仅作回查线索）：Publishes a service with no isolate realm, so it lands in the ROOT realm.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/fixtures/plugins/late-service.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/fixtures/plugins/late-service.js)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为智能体的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Publishes into the ROOT realm only after its plugin body returned, escaping the one-shot mount audit. Exercises the package invariant.”；固定提交中扫描到的声明包括 `name`、`apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 6 行；扫描到的声明包括 `name`、`apply`；源码顶部原注释（英文，仅作回查线索）：Publishes into the ROOT realm only after its plugin body returned, escaping the one-shot mount audit. Exercises the package invariant.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/fixtures/plugins/needs-missing.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/fixtures/plugins/needs-missing.js)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为智能体的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Waits forever for a service the composition never supplies: the row stays pending rather than failing, which only the mount audit can catch.”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 5 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Waits forever for a service the composition never supplies: the row stays pending rather than failing, which only the mount audit can catch.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/fixtures/plugins/self-dispose.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/fixtures/plugins/self-dispose.js)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试夹具
- 这个文件有什么用：它为智能体的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Disposes itself once active. The Loader treats a self-disposing entry as a config change and writes the tree back through EntryTree.write(), which is the exact path that once truncated a preset file to [].”；固定提交中扫描到的声明包括 `name`、`apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试同包中与它同名或覆盖相近场景的测试，最后回看被测实现和清理路径。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `name`、`apply`；源码顶部原注释（英文，仅作回查线索）：Disposes itself once active. The Loader treats a self-disposing entry as a config change and writes the tree back through EntryTree.write(), which is the exact path that once truncated a preset file to [].。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/invariant.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/invariant.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“agent-presets invariants”、“keeps the standing composition alive across the agents that joined it”、“rejects a composition that publishes a process-global service after its audit”、“stays quiet while every composition keeps its services out of the root realm”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“agent-presets invariants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 139 行；扫描到的声明包括 `harness`；扫描到的测试主题包括 “agent-presets invariants”、“keeps the standing composition alive across the agents that joined it”、“rejects a composition that publishes a process-global service after its audit”、“stays quiet while every composition keeps its services out of the root realm”、“rejects an agent that addresses a model without joining any preset”、“rejects one just the same when the derived home root is the whole roster”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/metadata.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/metadata.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“reading display metadata”、“reads a name and a description”、“treats an absent file as no metadata”、“treats malformed YAML as no metadata”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“reading display metadata”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Display metadata is presentation, never capability: every way of getting it wrong degrades to "this preset has no display text" rather than to a preset that cannot be discovered or mounted. It also cannot carry identity — id is the directory and trust is th...”；固定提交中扫描到的声明包括 `presetDir`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/metadata.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/metadata.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/preset/agent-presets/src/metadata.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 114 行；扫描到的声明包括 `presetDir`；扫描到的测试主题包括 “reading display metadata”、“reads a name and a description”、“treats an absent file as no metadata”、“treats malformed YAML as no metadata”、“ignores fields that are not text”、“ignores blank text rather than showing an empty name”；源码顶部原注释（英文，仅作回查线索）：Display metadata is presentation, never capability: every way of getting it wrong degrades to "this preset has no display text" rather than to a preset that cannot be discovered or mounted. It also cannot carry identity — id is the directory and trust is th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/mount.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/mount.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“composing an agent from a preset”、“hands an absolute plugin path to Node as a file URL”、“gives each session only its own preset\”、“scopes prompt sections and assembled schemas to the same session”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“composing an agent from a preset”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`agentOn`、`providedServiceNames`、`rootResolves`、`childOf`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/scope/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 736 行；扫描到的声明包括 `harness`、`agentOn`、`providedServiceNames`、`rootResolves`、`childOf`、`rosterWith`、`editable`；扫描到的测试主题包括 “composing an agent from a preset”、“hands an absolute plugin path to Node as a file URL”、“gives each session only its own preset\”、“scopes prompt sections and assembled schemas to the same session”、“mounts the default preset when the caller names none”、“lets two sessions share one preset without colliding”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/session.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/session.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、会话的具体场景，包括“resolving which preset a session ran”、“reads the creation-time value when nothing was switched”、“prefers a logged switch over the header”、“takes the last switch when a session was moved twice”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“resolving which preset a session ran”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Which preset a session ran is a question about its LOG, not its header: the header records the creation-time choice, and a switch made during the blank window is an event. Every reconstruction — the list row, the header label, resume, fork — goes through th...”；固定提交中扫描到的声明包括 `header`、`selected`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)、[packages/preset/agent-presets/src/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/session.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/session/src/index.ts`、`packages/preset/agent-presets/src/session.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的声明包括 `header`、`selected`；扫描到的测试主题包括 “resolving which preset a session ran”、“reads the creation-time value when nothing was switched”、“prefers a logged switch over the header”、“takes the last switch when a session was moved twice”、“finds a switch behind later events”、“reports none when the deployment composes no presets”；源码顶部原注释（英文，仅作回查线索）：Which preset a session ran is a question about its LOG, not its header: the header records the creation-time choice, and a switch made during the blank window is an event. Every reconstruction — the list row, the header label, resume, fork — goes through th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/settings.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/settings.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体的具体场景，包括“the default preset as a user setting”、“falls back to the composition default while the user set none”、“takes the user default over the composition default”、“composes a new session from the user default”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the default preset as a user setting”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The default preset is a user setting. config.default is the deployment's engineering default; the settings document overrides it and is hot-reloaded, so a person can change which preset new sessions get without a restart.”；固定提交中扫描到的声明包括 `harness`；本地静态 import 图显示它直接依赖 12 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/core/agent-loop/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/src/index.ts)、[packages/core/agent/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent/src/index.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/agent-loop/src/index.ts`、`packages/core/agent/src/index.ts`、`packages/core/session/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 163 行；扫描到的声明包括 `harness`；扫描到的测试主题包括 “the default preset as a user setting”、“falls back to the composition default while the user set none”、“takes the user default over the composition default”、“composes a new session from the user default”、“leaves a running session on the preset it was composed from”、“re-inherits the composition default when the user setting is cleared”；源码顶部原注释（英文，仅作回查线索）：The default preset is a user setting. config.default is the deployment's engineering default; the settings document overrides it and is hot-reloaded, so a person can change which preset new sessions get without a restart.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/agent-presets/tests/user-root.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/tests/user-root.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查智能体、根目录的具体场景，包括“the harness-home preset root”、“is what a roster gets when config names no roots at all”、“is discovered without any app configuring it”、“makes a roster with only a system root authorable, and receives the copy”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the harness-home preset root”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The writable root is this package's own, not an assembly fact each app must remember: a roster configured with only a system root still discovers and authors into <dshHome>/.agent-presets, the way dsh-skill-filesystem owns <dshHome>/skills. includeUserRoot:...”；固定提交中扫描到的声明包括 `roster`、`seedHomePreset`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/agent-presets/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/README.md)、[packages/preset/agent-presets/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/agent-presets/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/include/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/include/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/preset/agent-presets/src/index.ts`、`vendor/cordis/src/index.ts`、`vendor/include/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 131 行；扫描到的声明包括 `roster`、`seedHomePreset`；扫描到的测试主题包括 “the harness-home preset root”、“is what a roster gets when config names no roots at all”、“is discovered without any app configuring it”、“makes a roster with only a system root authorable, and receives the copy”、“sorts after every configured root, so a shipped id still shadows a home directory”、“is absent under includeUserRoot: false, which leaves the roster unauthorable”；源码顶部原注释（英文，仅作回查线索）：The writable root is this package's own, not an assembly fact each app must remember: a roster configured with only a system root still discovers and authors into <dshHome>/.agent-presets, the way dsh-skill-filesystem owns <dshHome>/skills. includeUserRoot:...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/persona/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/src/index.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/preset/persona` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“A per-agent persona as a composable row. dsh-system-prompt owns the global persona as its own config, and registers that section unconditionally — so this row is **scope-only**. Mounted inside an agent preset it shadows the deployment persona for that one s...”；固定提交中扫描到的声明包括 `name`、`inject`、`Config`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/persona/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/README.md)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[vendor/schemastery/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/schemastery/src/index.ts)、[packages/preset/persona/tests/persona.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/tests/persona.spec.ts)
- 对应测试：[packages/preset/persona/tests/persona.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/tests/persona.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/preset/persona/README.md`、入口和消费者，再读当前契约，沿着 `packages/preset/persona/tests/persona.spec.ts` 看它怎样约束运行时，最后对照 `packages/preset/persona/tests/persona.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `name`、`inject`、`Config`、`apply`；源码顶部原注释（英文，仅作回查线索）：A per-agent persona as a composable row. dsh-system-prompt owns the global persona as its own config, and registers that section unconditionally — so this row is **scope-only**. Mounted inside an agent preset it shadows the deployment persona for that one s...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/persona/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/src/invariant.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/preset/persona` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-persona. @module @deepseek-ai/dsh-persona/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/persona/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-persona. @module @deepseek-ai/dsh-persona/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/preset/persona/tests/persona.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/tests/persona.spec.ts)

- 所属层：packages/preset：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/preset/persona` 包里的 `tests/persona.spec.ts` 的具体场景，包括“the persona row”、“rejects an unscoped mount, which would collide with the registry default”、“shadows the deployment default for one scope only”、“gives two scopes independent personas”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the persona row”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `harness`、`personaText`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/preset/persona/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/README.md)、[packages/core/scope/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/scope/src/index.ts)、[packages/core/system-prompt/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/system-prompt/src/index.ts)、[packages/preset/persona/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/preset/persona/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/core/scope/src/index.ts`、`packages/core/system-prompt/src/index.ts`、`packages/preset/persona/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `harness`、`personaText`；扫描到的测试主题包括 “the persona row”、“rejects an unscoped mount, which would collide with the registry default”、“shadows the deployment default for one scope only”、“gives two scopes independent personas”、“shadows the deployment persona away entirely when its text is empty”、“restores the shadowed default when its fiber unloads”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
