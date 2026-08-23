# 源文件索引：packages/client（第 2/11 部分）

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 923 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

本页是 [packages-client.md](./packages-client.md) 总览的第 2 部分，覆盖：packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

条目按所属包分组：packages/client/connection（28 条）、packages/client/hmr（6 条）、packages/client/locale（20 条）、packages/client/modules（8 条）、packages/client/runtime（70 条）、packages/client/tsdown.client.ts（1 条）、packages/client/ui-agent-preset（25 条）、packages/client/ui-attachment（24 条）、packages/client/ui-brand-official（7 条）、packages/client/ui-commands（17 条）、packages/client/ui-conversation（124 条）、packages/client/ui-deliverables（11 条）、packages/client/ui-directory-picker-browse（10 条）、packages/client/ui-directory-picker-native（6 条）、packages/client/ui-goal（15 条）、packages/client/ui-input-trigger（21 条）、packages/client/ui-jobs（10 条）、packages/client/ui-layout（17 条）、packages/client/ui-message-feedback（14 条）、packages/client/ui-model-selection（13 条）、packages/client/ui-permission-presets（13 条）、packages/client/ui-plan（10 条）、packages/client/ui-primitives（92 条）、packages/client/ui-reference（6 条）、packages/client/ui-renderer（19 条）、packages/client/ui-settings-general（23 条）、packages/client/ui-settings-models（35 条）、packages/client/ui-settings-plugin-inventory（11 条）、packages/client/ui-settings-plugins（27 条）、packages/client/ui-settings（14 条）、packages/client/ui-sidebar（16 条）、packages/client/ui-skill（10 条）、packages/client/ui-slots（9 条）、packages/client/ui-subagent（12 条）、packages/client/ui-theme（26 条）、packages/client/ui-tool（46 条）、packages/client/ui-trajectory（45 条）、packages/client/ui-user-questions（15 条）、packages/client/ui-workflow-run（10 条）、packages/client/ui-workspace（23 条）、packages/client/web（14 条）。


## packages/client/runtime

### [packages/client/runtime/src/client/agents/scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/agents/scope.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端运行时契约
- 这个文件有什么用：这个文件定义客户端运行时的 agent、设置或 workspace 状态契约，让界面包通过稳定端口读取宿主事实。
- 为什么这样设计：客户端运行时通过窄契约暴露宿主事实，界面可以替换而不改变服务端和 Session 的核心语义。
- 文件级设计证据：源码顶部注释把它定位为“Client Agent-scope primitive: mint a Cordis context tagged with the owning Agent's identity. The mechanism mirrors the host dsh-scope architecture (no-op plugin fiber + context tag + Context.filter routing predicate); the shape deliberately diverges: the fi...”；固定提交中扫描到的声明包括 `AgentContext`、`AgentScopeHandle`、`createScope`、`scopeOf`、`agentScope`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/typert/protocol/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/typert/protocol/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/src/client/contract/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions.ts)
- 对应测试：[packages/client/runtime/tests/scope.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/scope.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/runtime/src/client/contract/sessions.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts` 确认状态如何进入 UI，最后对照 `packages/client/runtime/tests/scope.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 77 行；扫描到的声明包括 `AgentContext`、`AgentScopeHandle`、`createScope`、`scopeOf`、`agentScope`；源码顶部原注释（英文，仅作回查线索）：Client Agent-scope primitive: mint a Cordis context tagged with the owning Agent's identity. The mechanism mirrors the host dsh-scope architecture (no-op plugin fiber + context tag + Context.filter routing predicate); the shape deliberately diverges: the fi...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、对话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationEventInput`、`ConversationMatchResult`、`ConversationTurnDataMap`、`ConversationStepDataMap`、`ConversationLocationDataStore`；本地静态 import 图显示它直接依赖 2 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/client/runtime/src/client/conversation/event-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/event-registry.ts)、[packages/client/runtime/src/client/conversation/view-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/view-registry.ts)
- 对应测试：[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-assembler.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-assembler.client.spec.ts)、[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/core/session/src/types.ts` 和 `packages/client/runtime/src/client/conversation/event-registry.ts`、`packages/client/runtime/src/client/conversation/view-registry.ts`、`packages/client/runtime/src/client/index.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/client-apply.client.spec.ts`、`packages/client/runtime/tests/conversation-assembler.client.spec.ts`、`packages/client/runtime/tests/conversation-registry.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 274 行；扫描到的声明包括 `ConversationEventInput`、`ConversationMatchResult`、`ConversationTurnDataMap`、`ConversationStepDataMap`、`ConversationLocationDataStore`、`ConversationLocationData`、`StepLocation`、`TurnLocation`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/session.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“The outward session face. Feature packages never see the concrete Session class: components read conversation state through useSession (the ObservableSnapshot half), and orchestration code calls the behavior verbs below — nothing else. Widening this interfa...”；固定提交中扫描到的声明包括 `ProjectionsFace`、`ISession`、`SessionFace`；本地静态 import 图显示它直接依赖 5 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)、[packages/client/runtime/src/client/contract/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/attachment/attachment/src/index.ts`、`packages/client/runtime/src/client/contract/store.ts` 和 `packages/client/runtime/src/client/contract/sessions.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 93 行；扫描到的声明包括 `ProjectionsFace`、`ISession`、`SessionFace`；源码顶部原注释（英文，仅作回查线索）：The outward session face. Feature packages never see the concrete Session class: components read conversation state through useSession (the ObservableSnapshot half), and orchestration code calls the behavior verbs below — nothing else. Widening this interfa...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/sessions-port.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions-port.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Cross-domain sessions face: the contract surface sibling domains (today: workspaces) consume instead of the sessions implementation. The sessions domain satisfies it structurally — SessionRuntime is assignable, checked wherever the assembly layer or a test ...”；固定提交中扫描到的声明包括 `SessionsPortSummary`、`SessionsPortList`、`SessionsPort`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)、[packages/client/runtime/src/client/workspaces/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/service.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/contract/store.ts` 和 `packages/client/runtime/src/client/workspaces/service.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 47 行；扫描到的声明包括 `SessionsPortSummary`、`SessionsPortList`、`SessionsPort`；源码顶部原注释（英文，仅作回查线索）：Cross-domain sessions face: the contract surface sibling domains (today: workspaces) consume instead of the sessions implementation. The sessions domain satisfies it structurally — SessionRuntime is assignable, checked wherever the assembly layer or a test ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“The outward sessions-service face — what ctx.sessions exposes to feature packages and the renderer host, and therefore exactly what the test runtime's sessions double must implement. Wire-pump entry points (handleMuxEnvelope/handleConnected/refresh) and run...”；固定提交中扫描到的声明包括 `ISessions`；本地静态 import 图显示它直接依赖 8 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/agents/scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/agents/scope.ts)、[packages/client/runtime/src/client/contract/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/session.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/agents/scope.ts`、`packages/client/runtime/src/client/contract/session.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `ISessions`；源码顶部原注释（英文，仅作回查线索）：The outward sessions-service face — what ctx.sessions exposes to feature packages and the renderer host, and therefore exactly what the test runtime's sessions double must implement. Wire-pump entry points (handleMuxEnvelope/handleConnected/refresh) and run...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/settings-scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/settings-scope.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端运行时契约
- 这个文件有什么用：这个文件定义客户端运行时的 agent、设置或 workspace 状态契约，让界面包通过稳定端口读取宿主事实。
- 为什么这样设计：客户端运行时通过窄契约暴露宿主事实，界面可以替换而不改变服务端和 Session 的核心语义。
- 文件级设计证据：源码顶部注释把它定位为“The settings-namespace scope contract. The type lives here, in the common dependency of every feature that owns a preference, while the implementation and its Host transport live with the Settings surface (dsh-client-ui-settings): a feature service accepts ...”；固定提交中扫描到的声明包括 `SettingsScopeSnapshot`、`SettingsScopeSpec`、`SettingsScope`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/runtime/src/client/index.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 81 行；扫描到的声明包括 `SettingsScopeSnapshot`、`SettingsScopeSpec`、`SettingsScope`；源码顶部原注释（英文，仅作回查线索）：The settings-namespace scope contract. The type lives here, in the common dependency of every feature that owns a preference, while the implementation and its Host transport live with the Settings surface (dsh-client-ui-settings): a feature service accepts ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、运行时、状态存储的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Snapshot store engine (zustand vanilla + immer + subscribeWithSelector + rafFlush middleware + opt-in persist + dev freeze) plus the declarative shell over it: defineStore bakes an init/persist/actions literal into a StoreHandle, the registration-side store...”；固定提交中扫描到的声明包括 `ObservableSnapshot`、`SnapshotStore`、`shallowEqual`、`createSnapshotStore`、`EngineStoreInstance`；本地静态 import 图显示它直接依赖 1 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/runtime/src/client/contract/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/session.ts)、[packages/client/runtime/src/client/contract/sessions-port.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions-port.ts)、[packages/client/runtime/src/client/contract/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions.ts)
- 对应测试：[packages/client/runtime/tests/store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/ui-slots/src/index.ts` 和 `packages/client/runtime/src/client/contract/session.ts`、`packages/client/runtime/src/client/contract/sessions-port.ts`、`packages/client/runtime/src/client/contract/sessions.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 240 行；扫描到的声明包括 `ObservableSnapshot`、`SnapshotStore`、`shallowEqual`、`createSnapshotStore`、`EngineStoreInstance`、`EngineStoreHandle`、`defineStore`、`rafBatch`；源码顶部原注释（英文，仅作回查线索）：Snapshot store engine (zustand vanilla + immer + subscribeWithSelector + rafFlush middleware + opt-in persist + dev freeze) plus the declarative shell over it: defineStore bakes an init/persist/actions literal into a StoreHandle, the registration-side store...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/contract/workspaces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/workspaces.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端运行时契约
- 这个文件有什么用：这个文件定义客户端运行时的 agent、设置或 workspace 状态契约，让界面包通过稳定端口读取宿主事实。
- 为什么这样设计：客户端运行时通过窄契约暴露宿主事实，界面可以替换而不改变服务端和 Session 的核心语义。
- 文件级设计证据：源码顶部注释把它定位为“The outward workspaces-service face — what ctx.workspaces exposes to feature packages and the renderer host, and therefore exactly what the test runtime's workspaces double must implement. Wire-pump entry points (handleHostEnvelope/handleConnected/refresh/s...”；固定提交中扫描到的声明包括 `IWorkspaces`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)、[packages/client/runtime/src/client/workspaces/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/service.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/workspaces/service.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 94 行；扫描到的声明包括 `IWorkspaces`；源码顶部原注释（英文，仅作回查线索）：The outward workspaces-service face — what ctx.workspaces exposes to feature packages and the renderer host, and therefore exactly what the test runtime's workspaces double must implement. Wire-pump entry points (handleHostEnvelope/handleConnected/refresh/s...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/conversation/definition-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/definition-registry.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、运行时、对话的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/src/client/conversation/event-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/event-registry.ts)、[packages/client/runtime/src/client/conversation/view-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/view-registry.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着 `vendor/cordis/src/index.ts` 和 `packages/client/runtime/src/client/conversation/event-registry.ts`、`packages/client/runtime/src/client/conversation/view-registry.ts` 确认输入输出，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 60 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/conversation/event-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/event-registry.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：事件契约
- 这个文件有什么用：它列出浏览器端、运行时、对话可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。
- 为什么这样设计：事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationEventRegistry`、`assertDefinitionTarget`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/conversation/definition-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/definition-registry.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)、[packages/client/ui-goal/tests/browser-plugin.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-goal/tests/browser-plugin.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/runtime/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/tests/conversation-registry.client.spec.ts`、`packages/client/ui-goal/tests/browser-plugin.client.spec.tsx` 看它怎样约束运行时，最后对照 `packages/client/runtime/tests/conversation-registry.client.spec.ts`、`packages/client/ui-goal/tests/browser-plugin.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 67 行；扫描到的声明包括 `ConversationEventRegistry`、`assertDefinitionTarget`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/conversation/view-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/view-registry.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、运行时、对话的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationViewRegistry`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/conversation/definition-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/definition-registry.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/contract/conversation.ts`、`packages/client/runtime/src/client/conversation/definition-registry.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/tests/conversation-registry.client.spec.ts` 确认输入输出，最后对照 `packages/client/runtime/tests/conversation-registry.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 26 行；扫描到的声明包括 `ConversationViewRegistry`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、运行时相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Browser runtime services for slots, sessions, workspaces, and connection-stream delivery.”；固定提交中扫描到的声明包括 `ClientContext`、`UseConversationSession`、`inject`、`apply`；本地静态 import 图显示它直接依赖 35 个源文件，并被 270 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/agents/scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/agents/scope.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)
- 对应测试：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/session.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/session.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/runtime/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/locale/src/client/index.ts`、`packages/client/locale/src/client/settings-store.ts`、`packages/client/locale/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 233 行；扫描到的声明包括 `ClientContext`、`UseConversationSession`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Browser runtime services for slots, sessions, workspaces, and connection-stream delivery.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/ordered-baseline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/ordered-baseline.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：有序基线合并器
- 这个文件有什么用：它把带顺序的基线片段合并成客户端可消费的稳定结果，避免增量事件到达顺序变化时产生不同快照。
- 为什么这样设计：增量事件如果只按到达顺序合并，重连或批处理就可能产生不同快照；有序基线合并器明确顺序和覆盖规则，让客户端状态可以稳定重算。
- 文件级设计证据：源码顶部注释把它定位为“Merge an authoritative baseline without moving identities already visible to the client. Baseline-only identities are inserted relative to the nearest following known identity; identities absent from the baseline are removed. @param current - the establishe...”；固定提交中扫描到的声明包括 `mergeOrderedBaseline`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/client/runtime/src/client/sessions/manager.ts` 确认输入输出，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 43 行；扫描到的声明包括 `mergeOrderedBaseline`；源码顶部原注释（英文，仅作回查线索）：Merge an authoritative baseline without moving identities already visible to the client. Baseline-only identities are inserted relative to the nearest following known identity; identities absent from the baseline are removed. @param current - the establishe...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/assistant-timing.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/assistant-timing.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Shared assistant step-timing fold: Chat Definitions and the Trajectory history fold derive AssistantTiming from the same step/start -> first token delta -> assistant/message sequence.”；固定提交中扫描到的声明包括 `AssistantStepMetadata`、`assistantStepKey`、`indexAssistantStepTiming`、`settledAssistantTiming`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/message.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/message.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/core/session/src/types.ts`、`packages/llm/llm/src/message.ts` 和 `packages/client/runtime/src/client/index.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 70 行；扫描到的声明包括 `AssistantStepMetadata`、`assistantStepKey`、`indexAssistantStepTiming`、`settledAssistantTiming`；源码顶部原注释（英文，仅作回查线索）：Shared assistant step-timing fold: Chat Definitions and the Trajectory history fold derive AssistantTiming from the same step/start -> first token delta -> assistant/message sequence.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/context-provenance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/context-provenance.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Context source projection: the role and the human-facing producer name of one logged non-user user/message, read from its durable source alone. The client keeps no table of known plugin ids — a renamed or newly mounted producer must never need a client rele...”；固定提交中扫描到的声明包括 `ContextRole`、`ContextProvenanceView`、`sessionRecallLabels`、`contextProvenance`、`KnownContextForm`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/client/runtime/tests/context-provenance.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/context-provenance.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/context-provenance.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/context-provenance.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/conversation.ts`、`packages/client/runtime/tests/context-provenance.client.spec.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/context-provenance.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 132 行；扫描到的声明包括 `ContextRole`、`ContextProvenanceView`、`sessionRecallLabels`、`contextProvenance`、`KnownContextForm`、`contextForm`、`asRecord`、`readString`；源码顶部原注释（英文，仅作回查线索）：Context source projection: the role and the human-facing producer name of one logged non-user user/message, read from its durable source alone. The client keeps no table of known plugin ids — a renamed or newly mounted producer must never need a client rele...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/conversation-assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-assembler.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationEventDefinitions`、`ConversationViewDefinitions`、`ConversationNodeAssembler`、`ConversationRuntime`、`emptyLocationData`；本地静态 import 图显示它直接依赖 2 个源文件，并被 5 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/sessions/conversation-location-index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-location-index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)
- 对应测试：[packages/client/runtime/tests/conversation-assembler.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-assembler.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/contract/conversation.ts`、`packages/client/runtime/src/client/sessions/conversation-location-index.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/service.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/conversation-assembler.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 808 行；扫描到的声明包括 `ConversationEventDefinitions`、`ConversationViewDefinitions`、`ConversationNodeAssembler`、`ConversationRuntime`、`emptyLocationData`、`maximumPublication`、`startSeq`、`insertionIndex`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/conversation-context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-context.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationContextOriginKind`、`ConversationContext`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/client/runtime/src/client/sessions/request-inspection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/request-inspection.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/client/runtime/src/client/sessions/request-inspection.ts` 和 `packages/client/runtime/src/client/index.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `ConversationContextOriginKind`、`ConversationContext`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/conversation-location-index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-location-index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationLocationDataChange`、`ConversationLocationIndex`、`MutableLocationDataStore`、`payloadCoordinates`、`sameReferences`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/src/client/sessions/conversation-assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-assembler.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/contract/conversation.ts`、`packages/core/session/src/types.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/conversation-assembler.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 516 行；扫描到的声明包括 `ConversationLocationDataChange`、`ConversationLocationIndex`、`MutableLocationDataStore`、`payloadCoordinates`、`sameReferences`、`sameStep`、`sameTurn`、`sameLocation`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“ConversationSnapshot / ConversationNode: the only data shape the logic layer feeds the UI. Publication contract: every change swaps the top-level object; unchanged substructures keep their references (the React.memo premise). Chat node and Location stores a...”；固定提交中扫描到的声明包括 `AssistantRequestConfig`、`AssistantProvenanceView`、`AssistantBlock`、`toAssistantBlocks`、`toAssistantBlock`；本地静态 import 图显示它直接依赖 10 个源文件，并被 11 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/contract/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/session.ts)
- 对应测试：[packages/client/runtime/tests/conversation.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation.client.spec.ts)、[packages/client/runtime/tests/tool-call-tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/tool-call-tree.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/attachment/attachment/src/index.ts`、`packages/client/runtime/src/client/contract/conversation.ts` 和 `packages/client/runtime/src/client/contract/session.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/assistant-timing.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/conversation.client.spec.ts`、`packages/client/runtime/tests/tool-call-tree.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 481 行；扫描到的声明包括 `AssistantRequestConfig`、`AssistantProvenanceView`、`AssistantBlock`、`toAssistantBlocks`、`toAssistantBlock`、`UserMessageNode`、`AssistantTiming`、`AssistantMessageNode`；源码顶部原注释（英文，仅作回查线索）：ConversationSnapshot / ConversationNode: the only data shape the logic layer feeds the UI. Publication contract: every change swaps the top-level object; unchanged substructures keep their references (the React.memo premise). Chat node and Location stores a...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/failure-display.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/failure-display.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Convert a durable failure into copy that is safe to expose in the GUI. @param failure - Failure value preserved by the session event. @returns Display-safe copy for client projections.”；固定提交中扫描到的声明包括 `displayFailureMessage`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/client/runtime/src/client/index.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 13 行；扫描到的声明包括 `displayFailureMessage`；源码顶部原注释（英文，仅作回查线索）：Convert a durable failure into copy that is safe to expose in the GUI. @param failure - Failure value preserved by the session event. @returns Display-safe copy for client projections.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/lineage.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/lineage.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“flattenLineage: summaries -> flat list with lineage indentation (pure function). The input order is authoritative; lineage only makes each child adjacent to its parent. Orphaned lineage degrades to root level; cycles fail soft and emit as roots.”；固定提交中扫描到的声明包括 `TitledSessionSummary`、`SessionListEntry`、`flattenLineage`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/pending.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/pending.ts)、[packages/session/session-projection/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/types.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)
- 对应测试：[packages/client/runtime/tests/lineage.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/lineage.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/pending.ts`、`packages/session/session-projection/src/types.ts` 和 `packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/tests/lineage.client.spec.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/lineage.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 94 行；扫描到的声明包括 `TitledSessionSummary`、`SessionListEntry`、`flattenLineage`；源码顶部原注释（英文，仅作回查线索）：flattenLineage: summaries -> flat list with lineage indentation (pure function). The input order is authoritative; lineage only makes each child adjacent to its parent. Orphaned lineage degrades to root level; cycles fail soft and emit as roots.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端 Session 管理器
- 这个文件有什么用：它维护客户端的 Session 实例簇、会话列表快照、选择状态、未实例化请求缓冲、子 agent 目录和后台任务投影；Session 按需创建，但列表和事件不能因为尚未打开某个会话就丢失。
- 为什么这样设计：客户端同时面对会话列表、懒加载实例、未打开会话的事件、子 agent 和后台任务；由一个 manager 合并这些来源，才能保持选择状态与快照一致，避免组件各自维护副本。
- 文件级设计证据：源码顶部注释把它定位为“SessionManager: the instance cluster Map<SessionId, Session> (lazy-built, resident) + the frame dispatch entry + list state, constructed and held by SessionRuntime (one per client runtime). List data never enters zustand; React connects via subscribe/getLis...”；固定提交中扫描到的声明包括 `SessionListPhase`、`SessionSearchResultItem`、`SessionListSnapshot`、`SubagentCatalogSnapshot`、`SessionManager`；本地静态 import 图显示它直接依赖 11 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/ordered-baseline.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/ordered-baseline.ts)、[packages/client/runtime/src/client/sessions/conversation-assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-assembler.ts)、[packages/client/runtime/src/client/contract/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions.ts)
- 对应测试：[packages/client/runtime/tests/manager.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/manager.client.spec.ts)、[packages/client/runtime/tests/projection-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/projection-store.client.spec.ts)、[packages/client/runtime/tests/queue-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/queue-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/runtime/src/client/contract/sessions.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts` 确认状态如何进入 UI，最后对照 `packages/client/runtime/tests/manager.client.spec.ts`、`packages/client/runtime/tests/projection-store.client.spec.ts`、`packages/client/runtime/tests/queue-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 1131 行；扫描到的声明包括 `SessionListPhase`、`SessionSearchResultItem`、`SessionListSnapshot`、`SubagentCatalogSnapshot`、`SessionManager`、`bufferedRequestKey`、`questionInteractionStatus`、`applyMutation`；源码顶部原注释（英文，仅作回查线索）：SessionManager: the instance cluster Map<SessionId, Session> (lazy-built, resident) + the frame dispatch entry + list state, constructed and held by SessionRuntime (one per client runtime). List data never enters zustand; React connects via subscribe/getLis...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/notifier.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/notifier.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Notifier: subscription + batched notification primitive shared by Session and SessionManager. Semantics: N markDirty calls collapse into one microtask flush, while N markFrameDirty calls collapse into one animation-frame flush; the flush rebuilds the snapsh...”；固定提交中扫描到的声明包括 `Notifier`；本地静态 import 图显示它直接依赖 0 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)、[packages/client/runtime/src/client/sessions/projection-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/projection-store.ts)、[packages/client/runtime/src/client/sessions/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/session.ts)
- 对应测试：[packages/client/runtime/tests/notifier.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/notifier.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着相关类型、协议或实现和 `packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/projection-store.ts`、`packages/client/runtime/src/client/sessions/session.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/notifier.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的声明包括 `Notifier`；源码顶部原注释（英文，仅作回查线索）：Notifier: subscription + batched notification primitive shared by Session and SessionManager. Semantics: N markDirty calls collapse into one microtask flush, while N markFrameDirty calls collapse into one animation-frame flush; the flush rebuilds the snapsh...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/partial.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/partial.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“PartialAccumulator: assistant/chunk accumulator. Folds the six StreamChunk variants into AssistantBlock[] keyed by block index; block-level immutability (a delta only swaps that block's reference).”；固定提交中扫描到的声明包括 `isVisibleAssistantChunk`、`PartialAccumulator`、`emptyAssistantBlock`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/tests/partial.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/partial.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/partial.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/partial.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/llm/llm/src/types.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/tests/partial.client.spec.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/partial.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 117 行；扫描到的声明包括 `isVisibleAssistantChunk`、`PartialAccumulator`、`emptyAssistantBlock`；源码顶部原注释（英文，仅作回查线索）：PartialAccumulator: assistant/chunk accumulator. Folds the six StreamChunk variants into AssistantBlock[] keyed by block index; block-level immutability (a delta only swaps that block's reference).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/pending.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/pending.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“PendingWait: the carrier-protocol half of a pending host interaction. The runtime owns only envelope knowledge (rpcId backfill into a client-response); domain result encoding belongs to the interaction's consumer package.”；固定提交中扫描到的声明包括 `PendingPayloads`、`PendingKind`、`PendingInteractionStatus`、`PendingInteraction`、`PendingWait`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/client/runtime/src/client/sessions/lineage.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/lineage.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/conversation.ts`、`packages/client/runtime/src/client/sessions/lineage.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 82 行；扫描到的声明包括 `PendingPayloads`、`PendingKind`、`PendingInteractionStatus`、`PendingInteraction`、`PendingWait`；源码顶部原注释（英文，仅作回查线索）：PendingWait: the carrier-protocol half of a pending host interaction. The runtime owns only envelope knowledge (rpcId backfill into a client-response); domain result encoding belongs to the interaction's consumer package.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/projection-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/projection-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、运行时、会话的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Generic per-session projection value store (push model; see the session-projection subsystem page, docs/subsystems/session-projection.md): the host is the only computation site; the client holds finished whole values per key — key → { value, seq } — seeded ...”；固定提交中扫描到的声明包括 `UseProjection`、`ProjectionsBaseline`、`ProjectionValueStore`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)、[packages/client/runtime/src/client/sessions/notifier.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/notifier.ts)、[packages/session/session-projection/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/session/session-projection/src/types.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/projection-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/projection-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/contract/store.ts`、`packages/client/runtime/src/client/sessions/notifier.ts`、`packages/session/session-projection/src/types.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/session.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/projection-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 201 行；扫描到的声明包括 `UseProjection`、`ProjectionsBaseline`、`ProjectionValueStore`；源码顶部原注释（英文，仅作回查线索）：Generic per-session projection value store (push model; see the session-projection subsystem page, docs/subsystems/session-projection.md): the host is the only computation site; the client holds finished whole values per key — key → { value, seq } — seeded ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/provide.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/provide.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“The session standard-props provide channel: provider roster, bundle materialization (fail-loud on undeclared/missing/duplicate members), the static no-session projection, and the atomic current-session projection observable. One implementation — SessionRunt...”；固定提交中扫描到的声明包括 `SessionProvideChannelHost`、`SessionProvideChannel`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/sessions/service.ts`、`packages/client/ui-slots/src/index.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 190 行；扫描到的声明包括 `SessionProvideChannelHost`、`SessionProvideChannel`；源码顶部原注释（英文，仅作回查线索）：The session standard-props provide channel: provider roster, bundle materialization (fail-loud on undeclared/missing/duplicate members), the static no-session projection, and the atomic current-session projection observable. One implementation — SessionRunt...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/queue-mirror.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/queue-mirror.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：队列状态
- 这个文件有什么用：它维护浏览器端、运行时、会话中尚未处理的项目，集中定义入队、出队、顺序和取消规则。
- 为什么这样设计：等待中的项目需要稳定顺序、取消和重试语义，单独的队列边界可以避免这些规则散落在生产者和消费者之间。
- 文件级设计证据：固定提交中扫描到的声明包括 `SessionQueueMirror`、`previewOf`、`textOf`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/client/runtime/src/client/sessions/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/session.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/conversation.ts`、`packages/core/session/src/types.ts` 和 `packages/client/runtime/src/client/sessions/session.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 74 行；扫描到的声明包括 `SessionQueueMirror`、`previewOf`、`textOf`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/remotes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/remotes.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Remote namespaces the Session cluster calls. One parameter for one concept: the generated surface a Session and its manager reach the Host through. @module @deepseek-ai/dsh-client-runtime/client/sessions/remotes”；固定提交中扫描到的声明包括 `SessionRemotes`；本地静态 import 图显示它直接依赖 2 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)、[packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/service.ts`、`packages/client/runtime/src/client/sessions/session.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 12 行；扫描到的声明包括 `SessionRemotes`；源码顶部原注释（英文，仅作回查线索）：Remote namespaces the Session cluster calls. One parameter for one concept: the generated surface a Session and its manager reach the Host through. @module @deepseek-ai/dsh-client-runtime/client/sessions/remotes。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/request-inspection.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/request-inspection.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：固定提交中扫描到的声明包括 `ConversationPromptSnapshot`、`RequestPromptChange`、`RequestView`、`RequestInspectionSnapshot`；本地静态 import 图显示它直接依赖 2 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/src/client/sessions/conversation-context.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-context.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/llm/llm/src/types.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/conversation-context.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 85 行；扫描到的声明包括 `ConversationPromptSnapshot`、`RequestPromptChange`、`RequestView`、`RequestInspectionSnapshot`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、运行时、会话的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“SessionRuntime: root sessions service — list snapshot store (manager projection; carries current, the persisted selection every session-scoped surface keys off), Agent scope tree (mintScope pattern: no-op plugin Fiber + ctx.extend scope tag; one scope per s...”；固定提交中扫描到的声明包括 `SessionSummary`、`SessionListState`、`SessionCreateError`、`SessionForkError`、`SessionBinding`；本地静态 import 图显示它直接依赖 15 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/agents/scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/agents/scope.ts)、[packages/client/runtime/src/client/contract/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/session.ts)、[packages/client/runtime/src/client/contract/sessions.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions.ts)
- 对应测试：[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)、[packages/client/runtime/tests/sessions-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/sessions-service.client.spec.ts)、[packages/client/runtime/tests/workspaces-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/workspaces-service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/agents/scope.ts`、`packages/client/runtime/src/client/contract/session.ts` 和 `packages/client/runtime/src/client/contract/sessions.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/provide.ts` 确认输入输出，最后对照 `packages/client/runtime/tests/client-apply.client.spec.ts`、`packages/client/runtime/tests/conversation-registry.client.spec.ts`、`packages/client/runtime/tests/sessions-service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 791 行；扫描到的声明包括 `SessionSummary`、`SessionListState`、`SessionCreateError`、`SessionForkError`、`SessionBinding`、`workspaceTitleOf`、`SessionProvideContribution`、`SessionProvideDescriptor`；源码顶部原注释（英文，仅作回查线索）：SessionRuntime: root sessions service — list snapshot store (manager projection; carries current, the persisted selection every session-scoped surface keys off), Agent scope tree (mintScope pattern: no-op plugin Fiber + ctx.extend scope tag; one scope per s...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/session.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：会话状态模型
- 这个文件有什么用：它描述或维护浏览器端、运行时、会话的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。
- 为什么这样设计：会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。
- 文件级设计证据：源码顶部注释把它定位为“Sessions remain resident after creation so they continue consuming mux frames off-screen.”；固定提交中扫描到的声明包括 `PAGE_MESSAGES`、`SessionOptions`、`Session`、`conversationInput`、`hasVisibleConversationContent`；本地静态 import 图显示它直接依赖 16 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)、[packages/client/runtime/tests/projection-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/projection-store.client.spec.ts)、[packages/client/runtime/tests/queue-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/queue-store.client.spec.ts)、[packages/client/runtime/tests/session.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/session.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/attachment/attachment/src/index.ts`、`packages/client/runtime/src/client/contract/conversation.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/service.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/client-apply.client.spec.ts`、`packages/client/runtime/tests/conversation-registry.client.spec.ts`、`packages/client/runtime/tests/projection-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 809 行；扫描到的声明包括 `PAGE_MESSAGES`、`SessionOptions`、`Session`、`conversationInput`、`hasVisibleConversationContent`、`derivePhase`；源码顶部原注释（英文，仅作回查线索）：Sessions remain resident after creation so they continue consuming mux frames off-screen.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/steering-history.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/steering-history.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Reconstruct durable steering identity from the event-sourced agent inbox.”；固定提交中扫描到的声明包括 `SteeringHistory`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/core/agent/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/agent/src/types.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/core/agent/src/types.ts`、`packages/core/session/src/types.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `SteeringHistory`；源码顶部原注释（英文，仅作回查线索）：Reconstruct durable steering identity from the event-sourced agent inbox.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/subagent-lineage.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/subagent-lineage.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端会话投影
- 这个文件有什么用：这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。
- 为什么这样设计：客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。
- 文件级设计证据：源码顶部注释把它定位为“Pure subagent-lineage aggregation over the retained session-list mirror. Ordinary forks terminate propagation so each visible session owns only its uninterrupted subagent subtree. @module @deepseek-ai/dsh-client-runtime/client/sessions/subagent-lineage”；固定提交中扫描到的声明包括 `SubagentDescendantSummary`、`indexSubagentDescendants`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts` 和 `packages/client/runtime/src/client/index.ts` 理解状态变化，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 50 行；扫描到的声明包括 `SubagentDescendantSummary`、`indexSubagentDescendants`；源码顶部原注释（英文，仅作回查线索）：Pure subagent-lineage aggregation over the retained session-list mirror. Ordinary forks terminate propagation so each visible session owns only its uninterrupted subagent subtree. @module @deepseek-ai/dsh-client-runtime/client/sessions/subagent-lineage。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/sessions/tool-call-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/tool-call-tree.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工具调用树投影器
- 这个文件有什么用：它从 Session 的 Code Dispatch 事件维护父子调用索引，投影递归 ToolCallBlock 树和 running tool 列表，并对递归深度设上限。
- 为什么这样设计：工具调用可以递归嵌套且事件可能先到子调用再到结果；独立 parent index 和 projection 把事件折叠成稳定的树，并用深度上限防止异常 wire 数据耗尽递归消费者。
- 文件级设计证据：固定提交中扫描到的声明包括 `MAX_TOOL_CALL_TREE_DEPTH`、`ToolCallTree`、`sameReferences`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/core/tools/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/tools/src/types.ts)、[packages/client/runtime/tests/tool-call-tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/tool-call-tree.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/tool-call-tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/tool-call-tree.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/core/session/src/types.ts`、`packages/core/tools/src/types.ts` 和 `packages/client/runtime/tests/tool-call-tree.client.spec.ts` 确认输入输出，最后对照 `packages/client/runtime/tests/tool-call-tree.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 200 行；扫描到的声明包括 `MAX_TOOL_CALL_TREE_DEPTH`、`ToolCallTree`、`sameReferences`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/slots.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：扩展槽位契约
- 这个文件有什么用：它为浏览器端、运行时、扩展槽位定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。
- 为什么这样设计：把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。
- 文件级设计证据：源码顶部注释把它定位为“SlotRegistry: the cordis Service layer of the slot system over the pure SlotCore (ui-slots owns registration semantics, the declaration ledger, the load-time validations, and the unload cascade). This layer owns what needs the runtime: the 'slots/changed' e...”；固定提交中扫描到的声明包括 `RootOwnerProps`、`SlotRegistry`；本地静态 import 图显示它直接依赖 2 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/invariant.client.spec.ts)、[packages/client/runtime/tests/slots-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/slots-service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/runtime/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/tests/invariant.client.spec.ts`、`packages/client/runtime/tests/slots-service.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/runtime/tests/invariant.client.spec.ts`、`packages/client/runtime/tests/slots-service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 471 行；扫描到的声明包括 `RootOwnerProps`、`SlotRegistry`；源码顶部原注释（英文，仅作回查线索）：SlotRegistry: the cordis Service layer of the slot system over the pure SlotCore (ui-slots owns registration semantics, the declaration ledger, the load-time validations, and the unload cascade). This layer owns what needs the runtime: the 'slots/changed' e...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/time-zone.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/time-zone.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端时区解析器
- 这个文件有什么用：它解析浏览器当前可用的时区并提供稳定结果，让时间展示和会话相关计算不必在各个组件中重复探测。
- 为什么这样设计：时区是浏览器环境事实，组件各自探测会造成显示不一致和重复回退；集中解析并提供稳定值，时间显示和会话计算共享同一个宿主判断。
- 文件级设计证据：源码顶部注释把它定位为“Browser-owned time-zone sampling for prompt RPC provenance.”；固定提交中扫描到的声明包括 `resolvedClientTimeZone`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/session.ts)、[packages/client/runtime/tests/time-zone.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/time-zone.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/time-zone.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/time-zone.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/runtime/src/client/sessions/session.ts`、`packages/client/runtime/tests/time-zone.client.spec.ts` 确认状态如何进入 UI，最后对照 `packages/client/runtime/tests/time-zone.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 14 行；扫描到的声明包括 `resolvedClientTimeZone`；源码顶部原注释（英文，仅作回查线索）：Browser-owned time-zone sampling for prompt RPC provenance.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/workspaces/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/manager.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态管理器
- 这个文件有什么用：它协调浏览器端、运行时、管理器的一组实例、缓存或生命周期，集中处理创建、选择、更新和清理。
- 为什么这样设计：一组对象的创建、选择和清理若由多个调用者分别负责，状态容易分叉；管理器集中生命周期可以保持快照与事件顺序一致。
- 文件级设计证据：源码顶部注释把它定位为“Workspace baseline, incremental-frame, and unary-action owner.”；固定提交中扫描到的声明包括 `WorkspaceListPhase`、`WorkspaceListSnapshot`、`WorkspaceManager`、`upsertWorkspace`、`applyWorkspaceDelta`；本地静态 import 图显示它直接依赖 4 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/notifier.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/notifier.ts)、[packages/client/runtime/src/client/workspaces/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/workspace.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：[packages/client/runtime/tests/workspaces-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/workspaces-service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/notifier.ts`、`packages/client/runtime/src/client/workspaces/workspace.ts` 和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/workspaces/service.ts`、`packages/client/runtime/tests/workspaces-service.client.spec.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/workspaces-service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 425 行；扫描到的声明包括 `WorkspaceListPhase`、`WorkspaceListSnapshot`、`WorkspaceManager`、`upsertWorkspace`、`applyWorkspaceDelta`、`insertIdBefore`；源码顶部原注释（英文，仅作回查线索）：Workspace baseline, incremental-frame, and unary-action owner.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/workspaces/path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/path.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：工作区路径解析器
- 这个文件有什么用：它把工作区相对路径转换成 Host.openPath 能理解的绝对或工作区路径；有工作区根目录时补全绝对路径，没有根目录时保留调用者能提供的原始形式。
- 为什么这样设计：工作区相对路径既有跨平台差异也有越界风险，还要满足 Host.openPath 的输入契约；集中解析和保留无根目录的原始形式，能避免 UI、连接层和宿主各自改写路径。
- 文件级设计证据：源码顶部注释把它定位为“Resolve a workspace-relative path into the Host-facing spelling used by openPath. @param cwd - session workspace root, when known. @param path - absolute or workspace-relative path. @returns an absolute path when a workspace root is available, otherwise the...”；固定提交中扫描到的声明包括 `resolveWorkspacePath`、`abbreviateHomePath`、`isWindowsStylePath`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/tests/path.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/path.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/path.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/path.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/client/runtime/src/client/index.ts`、`packages/client/runtime/tests/path.client.spec.ts` 确认输入输出，最后对照 `packages/client/runtime/tests/path.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 36 行；扫描到的声明包括 `resolveWorkspacePath`、`abbreviateHomePath`、`isWindowsStylePath`；源码顶部原注释（英文，仅作回查线索）：Resolve a workspace-relative path into the Host-facing spelling used by openPath. @param cwd - session workspace root, when known. @param path - absolute or workspace-relative path. @returns an absolute path when a workspace root is available, otherwise the...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/workspaces/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/service.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：服务或提供方
- 这个文件有什么用：它定义或提供浏览器端、运行时的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。
- 为什么这样设计：把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。
- 文件级设计证据：源码顶部注释把它定位为“WorkspaceRuntime projects the Workspace object manager for UI consumers.”；固定提交中扫描到的声明包括 `WorkspaceListState`、`WorkspaceCreateError`、`DirectoryBrowseError`、`WorkspaceRuntime`、`recentWorkspace`；本地静态 import 图显示它直接依赖 6 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/contract/sessions-port.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/sessions-port.ts)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)、[packages/client/runtime/src/client/contract/workspaces.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/workspaces.ts)
- 对应测试：[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/workspaces-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/workspaces-service.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先读 `packages/client/runtime/README.md` 和入口，再读当前实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/contract/sessions-port.ts`、`packages/client/runtime/src/client/contract/store.ts` 和 `packages/client/runtime/src/client/contract/workspaces.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/tests/client-apply.client.spec.ts` 确认输入输出，最后对照 `packages/client/runtime/tests/client-apply.client.spec.ts`、`packages/client/runtime/tests/workspaces-service.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 377 行；扫描到的声明包括 `WorkspaceListState`、`WorkspaceCreateError`、`DirectoryBrowseError`、`WorkspaceRuntime`、`recentWorkspace`；源码顶部原注释（英文，仅作回查线索）：WorkspaceRuntime projects the Workspace object manager for UI consumers.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/client/workspaces/workspace.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/workspace.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：客户端运行时契约
- 这个文件有什么用：这个文件定义客户端运行时的 agent、设置或 workspace 状态契约，让界面包通过稳定端口读取宿主事实。
- 为什么这样设计：客户端运行时通过窄契约暴露宿主事实，界面可以替换而不改变服务端和 Session 的核心语义。
- 文件级设计证据：源码顶部注释把它定位为“React-free Workspace entity with a client-local materialization lifecycle.”；固定提交中扫描到的声明包括 `WorkspaceCreateInput`、`WorkspaceIntentSnapshot`、`WorkspaceSnapshot`、`Workspace`、`intentName`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)、[packages/client/runtime/src/client/sessions/notifier.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/notifier.ts)、[packages/client/runtime/src/client/workspaces/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/manager.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/locale/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/apply.client.spec.ts)、[packages/client/locale/tests/document-language.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/document-language.client.spec.ts)、[packages/client/locale/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/invariant.client.spec.ts)、[packages/client/locale/tests/language-row.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/language-row.client.spec.tsx)、[packages/client/locale/tests/locale.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/locale.client.spec.ts)、[packages/client/locale/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/runtime/src/client/workspaces/manager.ts` 确认状态如何进入 UI，最后对照 `packages/client/locale/tests/apply.client.spec.ts`、`packages/client/locale/tests/document-language.client.spec.ts`、`packages/client/locale/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 142 行；扫描到的声明包括 `WorkspaceCreateInput`、`WorkspaceIntentSnapshot`、`WorkspaceSnapshot`、`Workspace`、`intentName`；源码顶部原注释（英文，仅作回查线索）：React-free Workspace entity with a client-local materialization lifecycle.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、运行时相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Host loader entry for the browser runtime exported from ./client and ./loader.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/node-half.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/node-half.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/runtime/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/runtime/tests/node-half.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/runtime/tests/node-half.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 4 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Host loader entry for the browser runtime exported from ./client and ./loader.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、运行时必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-runtime. @module @deepseek-ai/dsh-client-runtime/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/client/ui-slots/src/index.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/runtime/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/runtime/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 52 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-runtime. @module @deepseek-ai/dsh-client-runtime/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“runtime client apply”、“mounts slots, Sessions, and Workspaces and fans host frames into both managers”、“selects the recent Workspace once when the first baselines have no current session”、“wires registry changes into resident Sessions during the runtime apply pass”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runtime client apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Runtime plugin browser-half apply: slots + object services mounting over the connection handle, stream-loop sink wiring into the object layer, and the fiber-scoped loop teardown.”；固定提交中扫描到的声明包括 `mount`、`flushMicrotasks`；本地静态 import 图显示它直接依赖 10 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/contract/conversation.ts`、`packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 156 行；扫描到的声明包括 `mount`、`flushMicrotasks`；扫描到的测试主题包括 “runtime client apply”、“mounts slots, Sessions, and Workspaces and fans host frames into both managers”、“selects the recent Workspace once when the first baselines have no current session”、“wires registry changes into resident Sessions during the runtime apply pass”、“stops the stream loop when the plugin fiber unloads”；源码顶部原注释（英文，仅作回查线索）：Runtime plugin browser-half apply: slots + object services mounting over the connection handle, stream-loop sink wiring into the object layer, and the fiber-scoped loop teardown.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/context-provenance.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/context-provenance.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、上下文的具体场景，包括“contextProvenance”、“names a plugin producer by its logged plugin id”、“names workspace instructions by the files they reconciled, deduplicated in first-seen o...”、“marks a cross-session snapshot as recall and names the sessions it read”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“contextProvenance”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Context provenance projection: the role and producer name a transcript row shows for one logged non-user message, read from the durable source alone.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/context-provenance.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/context-provenance.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/sessions/context-provenance.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 103 行；扫描到的测试主题包括 “contextProvenance”、“names a plugin producer by its logged plugin id”、“names workspace instructions by the files they reconciled, deduplicated in first-seen order”、“marks a cross-session snapshot as recall and names the sessions it read”、“identifies a producer this UI version does not know by its own durable kind”、“falls back to the source kind when the expected name field is unusable”；源码顶部原注释（英文，仅作回查线索）：Context provenance projection: the role and producer name a transcript row shows for one logged non-user message, read from the durable source alone.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/conversation-assembler.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-assembler.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、对话的具体场景，包括“ConversationNodeAssembler”、“appends through an exact business-id Context without replaying unrelated Contexts”、“keeps one Match collection while a long Context appends without replay”、“merges an older page and replays its affected Context once”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ConversationNodeAssembler”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`testView`、`at`、`input`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/sessions/conversation-assembler.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation-assembler.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/contract/conversation.ts`、`packages/client/runtime/src/client/sessions/conversation-assembler.ts`、`packages/core/session/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1047 行；扫描到的声明包括 `TestEventDefinitions`、`TestViewDefinitions`、`testView`、`at`、`input`、`chatSnapshot`、`node`、`fallbackDefinition`；扫描到的测试主题包括 “ConversationNodeAssembler”、“appends through an exact business-id Context without replaying unrelated Contexts”、“keeps one Match collection while a long Context appends without replay”、“merges an older page and replays its affected Context once”、“collects an update before its start and replays it once prepend supplies the start”、“rejects a Definition whose declared start follows an update in log order”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、对话的具体场景，包括“Conversation registries”、“rejects duplicate Event Definitions and disposes an ordinary registration once”、“rejects a duplicate fallback and clears it through its idempotent disposer”、“rejects rendering Definitions that omit either target or builder”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Conversation registries”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `eventDefinition`、`viewDefinition`、`bootRegistries`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/contract/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/conversation.ts)、[packages/client/runtime/src/client/conversation/event-registry.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/conversation/event-registry.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/contract/conversation.ts`、`packages/client/runtime/src/client/conversation/event-registry.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 161 行；扫描到的声明包括 `eventDefinition`、`viewDefinition`、`bootRegistries`；扫描到的测试主题包括 “Conversation registries”、“rejects duplicate Event Definitions and disposes an ordinary registration once”、“rejects a duplicate fallback and clears it through its idempotent disposer”、“rejects rendering Definitions that omit either target or builder”、“rejects a State-only Definition as the unmatched-event fallback”、“rejects duplicate view targets and disposes a view registration once”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/conversation.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、对话的具体场景，包括“toAssistantBlock”、“classifies the four block shapes”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“toAssistantBlock”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Assistant block classifier (moved here with sessions/conversation.ts).”；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/attachment/attachment/src/index.ts`、`packages/client/runtime/src/client/sessions/conversation.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 31 行；扫描到的测试主题包括 “toAssistantBlock”、“classifies the four block shapes”；源码顶部原注释（英文，仅作回查线索）：Assistant block classifier (moved here with sessions/conversation.ts).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“event-script.client”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：固定提交中扫描到的声明包括 `ev`、`plainTurn`、`entries`；本地静态 import 图显示它直接依赖 3 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)、[packages/llm/llm/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/index.ts)、[packages/llm/llm/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/llm/llm/src/types.ts)、[packages/client/runtime/tests/manager.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/manager.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/manager.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/manager.client.spec.ts)、[packages/client/runtime/tests/projection-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/projection-store.client.spec.ts)、[packages/client/runtime/tests/session.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/session.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/runtime/tests/manager.client.spec.ts`、`packages/client/runtime/tests/projection-store.client.spec.ts`、`packages/client/runtime/tests/session.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 146 行；扫描到的声明包括 `ev`、`plainTurn`、`entries`。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试支持
- 这个文件有什么用：它为“fake-api.client”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。
- 为什么这样设计：测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。
- 文件级设计证据：源码顶部注释把它定位为“Test-local programmable IApiClient fake (NOT the fixture: fixture is a demo data source on a real clock; behavior tests need per-case responses and deferred-controlled timing). Streams are hand pumps: pushMux/pushHost.”；固定提交中扫描到的声明包括 `Deferred`、`deferred`、`ok`、`err`、`fakeRemote`；本地静态 import 图显示它直接依赖 3 个源文件，并被 10 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/connection/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/src/client/index.ts)、[packages/client/runtime/src/client/sessions/remotes.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/remotes.ts)、[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)
- 对应测试：[packages/client/runtime/tests/client-apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/client-apply.client.spec.ts)、[packages/client/runtime/tests/conversation-registry.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/conversation-registry.client.spec.ts)、[packages/client/runtime/tests/manager.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/manager.client.spec.ts)、[packages/client/runtime/tests/projection-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/projection-store.client.spec.ts)、[packages/client/runtime/tests/queue-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/queue-store.client.spec.ts)、[packages/client/runtime/tests/session.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/session.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)
- 阅读顺序：先看它提供的固定输入或环境，再跳到实际使用它的测试 `packages/client/runtime/tests/client-apply.client.spec.ts`、`packages/client/runtime/tests/conversation-registry.client.spec.ts`、`packages/client/runtime/tests/manager.client.spec.ts`，最后回看被测实现和清理路径。
- 代码证据：固定提交归档实际读取结果：约 367 行；扫描到的声明包括 `Deferred`、`deferred`、`ok`、`err`、`fakeRemote`、`FakeApiClient`、`fakeWorkspace`；源码顶部原注释（英文，仅作回查线索）：Test-local programmable IApiClient fake (NOT the fixture: fixture is a demo data source on a real clock; behavior tests need per-case responses and deferred-controlled timing). Streams are hand pumps: pushMux/pushHost.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“runtime slots/changed invariant”、“passes foreign events and a legitimate mutation-then-emission sequence”、“fails loud on a missing key and on an emission with no applied mutation”、“stays quiet when no slots service is mounted (nothing to audit against)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“runtime slots/changed invariant”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Runtime invariant companion: the 'slots/changed' emission-order audit — a fired key must already carry a bumped version (emission follows the applied mutation), bogus payloads fail loud, foreign events pass.”；固定提交中扫描到的声明包括 `setup`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/slots.ts)、[packages/client/runtime/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/slots.ts`、`packages/client/runtime/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 49 行；扫描到的声明包括 `setup`；扫描到的测试主题包括 “runtime slots/changed invariant”、“passes foreign events and a legitimate mutation-then-emission sequence”、“fails loud on a missing key and on an emission with no applied mutation”、“stays quiet when no slots service is mounted (nothing to audit against)”；源码顶部原注释（英文，仅作回查线索）：Runtime invariant companion: the 'slots/changed' emission-order audit — a fired key must already carry a bumped version (emission follows the applied mutation), bogus payloads fail loud, foreign events pass.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/lineage.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/lineage.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“flattenLineage”、“keeps established root and sibling order while expanding children DFS with depth”、“degrades an orphan (absent parent) to root level without dropping it”、“fails soft on a two-node cycle: all entries emitted, warn fired, no hang”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“flattenLineage”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“flattenLineage: root ordering, DFS child expansion, orphan degradation, and cycle fail-soft (every entry always emitted, no infinite walk).”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/lineage.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/lineage.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/lineage.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 62 行；扫描到的测试主题包括 “flattenLineage”、“keeps established root and sibling order while expanding children DFS with depth”、“degrades an orphan (absent parent) to root level without dropping it”、“fails soft on a two-node cycle: all entries emitted, warn fired, no hang”、“handles a self-referencing entry as a cycle member”、“projects the completion-reminder set into rows (absent = false)”；源码顶部原注释（英文，仅作回查线索）：flattenLineage: root ordering, DFS child expansion, orphan degradation, and cycle fail-soft (every entry always emitted, no infinite walk).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/manager.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/manager.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、管理器的具体场景，包括“instances”、“lazily builds one resident instance per id and syncs the running bit from the list”、“replays buffered approval frames on instantiation and drops ordinary frames for uninsta...”、“retains every live answerable request and compacts resolutions before instantiation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“instances”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SessionManager orchestration: lazy resident instances, list lifecycle, host frame routing, and the pending-frame buffer for uninstantiated sessions.”；固定提交中扫描到的声明包括 `summary`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)、[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/manager.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1210 行；扫描到的声明包括 `summary`；扫描到的测试主题包括 “instances”、“lazily builds one resident instance per id and syncs the running bit from the list”、“replays buffered approval frames on instantiation and drops ordinary frames for uninstantiated sessions”、“retains every live answerable request and compacts resolutions before instantiation”、“drops buffered answerable requests on session removal”、“list lifecycle”；源码顶部原注释（英文，仅作回查线索）：SessionManager orchestration: lazy resident instances, list lifecycle, host frame routing, and the pending-frame buffer for uninstantiated sessions.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/node-half.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/node-half.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“node half”、“apply is a no-op host placeholder”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“node half”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Node half: the empty host apply (Loader governance + dsh.client discovery placeholder).”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 10 行；扫描到的测试主题包括 “node half”、“apply is a no-op host placeholder”；源码顶部原注释（英文，仅作回查线索）：Node half: the empty host apply (Loader governance + dsh.client discovery placeholder).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/notifier.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/notifier.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“Notifier”、“collapses N markDirty calls into one flush, rebuilding before notifying”、“skips rebuild with zero listeners and ensureFresh rebuilds lazily exactly once”、“notifyNow runs listeners synchronously (controlled-input contract)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“Notifier”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Notifier: microtask/frame batching, rebuild-before-notify ordering, no-listener laziness, synchronous notifyNow, and unsubscribe.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/notifier.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/notifier.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/sessions/notifier.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的测试主题包括 “Notifier”、“collapses N markDirty calls into one flush, rebuilding before notifying”、“skips rebuild with zero listeners and ensureFresh rebuilds lazily exactly once”、“notifyNow runs listeners synchronously (controlled-input contract)”、“notifyNow with zero listeners stays lazy like markDirty”、“a scheduled flush after notifyNow already flushed is a no-op”；源码顶部原注释（英文，仅作回查线索）：Notifier: microtask/frame batching, rebuild-before-notify ordering, no-listener laziness, synchronous notifyNow, and unsubscribe.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/partial.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/partial.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“PartialAccumulator”、“builds empty blocks per block-start type, unknown type falls to other”、“accumulates text deltas, starting from empty when prev is missing or another kind”、“accumulates reasoning deltas on the reasoning lane”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“PartialAccumulator”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“PartialAccumulator: six-variant chunk folding, sparse-index compaction, and the block/snapshot reference discipline (a delta swaps only that block).”；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/partial.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/partial.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/partial.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 97 行；扫描到的测试主题包括 “PartialAccumulator”、“builds empty blocks per block-start type, unknown type falls to other”、“accumulates text deltas, starting from empty when prev is missing or another kind”、“accumulates reasoning deltas on the reasoning lane”、“continues from a materialized history prefix”、“folds tool-call deltas: first id pins callId, late name overrides, argsRaw concatenates”；源码顶部原注释（英文，仅作回查线索）：PartialAccumulator: six-variant chunk folding, sparse-index compaction, and the block/snapshot reference discipline (a delta swaps only that block).。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/path.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/path.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、路径的具体场景，包括“abbreviateHomePath”、“collapses a POSIX home and its descendants”、“keeps prefix-adjacent names and non-home paths”、“does not abbreviate when home is missing, empty, or the filesystem root”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“abbreviateHomePath”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/workspaces/path.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/path.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/workspaces/path.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的测试主题包括 “abbreviateHomePath”、“collapses a POSIX home and its descendants”、“keeps prefix-adjacent names and non-home paths”、“does not abbreviate when home is missing, empty, or the filesystem root”、“leaves Windows drive and UNC paths verbatim”、“resolveWorkspacePath”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/projection-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/projection-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、状态投影的具体场景，包括“ProjectionValueStore semantics”、“reads undefined until a value lands (capability absence)”、“applies frames last-wins by seq: replayed and stale frames drop”、“a stale baseline can neither overwrite nor clear a newer frame; a fresh one reseeds and...”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ProjectionValueStore semantics”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Projection value store (push model; session-projection subsystem page: docs/subsystems/session-projection.md): the single higher-seq-wins rule on both paths (a stale baseline cannot overwrite a newer push frame; a replayed frame cannot regress), capability ...”；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)、[packages/client/runtime/src/client/sessions/projection-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/projection-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/projection-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 229 行；扫描到的测试主题包括 “ProjectionValueStore semantics”、“reads undefined until a value lands (capability absence)”、“applies frames last-wins by seq: replayed and stale frames drop”、“a stale baseline can neither overwrite nor clear a newer frame; a fresh one reseeds and clears”、“truncate drops rows past the durable baseline and keeps the rest”、“notifies the key face on change (batched) and not on dropped applications”；源码顶部原注释（英文，仅作回查线索）：Projection value store (push model; session-projection subsystem page: docs/subsystems/session-projection.md): the single higher-seq-wins rule on both paths (a stale baseline cannot overwrite a newer push frame; a replayed frame cannot regress), capability ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/queue-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/queue-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、队列的具体场景，包括“queue snapshot intake”、“projects stable ids, flat previews, and complete text”、“marks mixed-content messages non-editable while retaining their preview”、“caps previews at 200 code points and preserves the full editable text”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“queue snapshot intake”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Queue snapshot semantics: authoritative replacement after every host-side change, reconnect re-baselining, pre-instantiation buffering, editable-text projection, and snapshot reference stability.”；固定提交中扫描到的声明包括 `queueFrame`、`makeSession`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/manager.ts)、[packages/client/runtime/src/client/sessions/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/session.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/manager.ts`、`packages/client/runtime/src/client/sessions/session.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 276 行；扫描到的声明包括 `queueFrame`、`makeSession`；扫描到的测试主题包括 “queue snapshot intake”、“projects stable ids, flat previews, and complete text”、“marks mixed-content messages non-editable while retaining their preview”、“caps previews at 200 code points and preserves the full editable text”、“replaces content, order, and membership from each authoritative frame”、“keeps the queue array reference stable across unrelated snapshot swaps”；源码顶部原注释（英文，仅作回查线索）：Queue snapshot semantics: authoritative replacement after every host-side change, reconnect re-baselining, pre-instantiation buffering, editable-text projection, and snapshot reference stability.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/scope.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/scope.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“createScope”、“tags the ctx (scopeOf) and leaves the root untagged”、“scoped dispatch reaches same-session and untagged listeners, never a foreign session”、“bail answers the first same-scope listener and skips filtered foreign ones”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createScope”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Agent-scope primitive spec: the actx minted by createScope carries the tag and the dispatch filter itself, so plain cordis dispatch with the actx as subject routes by agent — same-agent tagged listeners receive, foreign-agent ones are filtered out, untagged...”；固定提交中扫描到的声明包括 `bench`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/agents/scope.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/agents/scope.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/agents/scope.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `bench`；扫描到的测试主题包括 “createScope”、“tags the ctx (scopeOf) and leaves the root untagged”、“scoped dispatch reaches same-session and untagged listeners, never a foreign session”、“bail answers the first same-scope listener and skips filtered foreign ones”、“a subject-less root dispatch is unfiltered (every listener hears it)”、“fiber disposal removes scope-owned listeners”；源码顶部原注释（英文，仅作回查线索）：Agent-scope primitive spec: the actx minted by createScope carries the tag and the dispatch filter itself, so plain cordis dispatch with the actx as subject routes by agent — same-agent tagged listeners receive, foreign-agent ones are filtered out, untagged...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/session.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/session.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、会话的具体场景，包括“open”、“keeps a bare Session blank until an authoritative lifecycle signal arrives”、“installs the tail page: cold → loading → open with window and nodes in place”、“is idempotent: concurrent opens share one history call, reopening when open is a no-op”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“open”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Session orchestration: drive the object through contract calls and injected frames (open → prompt → stream → finalize → cancel → resync) and assert the ConversationSnapshot it settles into. Reference stability is asserted with toBe/not.toBe — it is the Reac...”；固定提交中扫描到的声明包括 `TestNodeStore`、`testLegacy`、`testViewDefinition`、`makeSession`、`chatEvents`；本地静态 import 图显示它直接依赖 7 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/src/client/sessions/session.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/session.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/event-script.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/event-script.client.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/runtime/src/client/sessions/session.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 1016 行；扫描到的声明包括 `TestNodeStore`、`testLegacy`、`testViewDefinition`、`makeSession`、`chatEvents`、`chatSeqs`、`histResponse`、`opened`；扫描到的测试主题包括 “open”、“keeps a bare Session blank until an authoritative lifecycle signal arrives”、“installs the tail page: cold → loading → open with window and nodes in place”、“is idempotent: concurrent opens share one history call, reopening when open is a no-op”、“lands an error result in openState=error with the RpcError kept”、“folds a transport throw into openState=error / internal”；源码顶部原注释（英文，仅作回查线索）：Session orchestration: drive the object through contract calls and injected frames (open → prompt → stream → finalize → cancel → resync) and assert the ConversationSnapshot it settles into. Reference stability is asserted with toBe/not.toBe — it is the Reac...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/sessions-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/sessions-service.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、会话的具体场景，包括“list store projection”、“projects durable titles separately from cwd/id display fallbacks and parent links”、“reprojects a blank session whose composition switched and nothing else moved”、“reflects live increments (host stream via manager) into the store”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“list store projection”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SessionRuntime: list store projection (manager → {ids, byId, current} with derived titles), the migrated current-selection account (open validation, persisted mask semantics, cell resolution), scope-tree lifecycle (lazy mint / frozen survival / removed tear...”；固定提交中扫描到的声明包括 `bench`、`feedList`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 749 行；扫描到的声明包括 `bench`、`feedList`；扫描到的测试主题包括 “list store projection”、“projects durable titles separately from cwd/id display fallbacks and parent links”、“reprojects a blank session whose composition switched and nothing else moved”、“reflects live increments (host stream via manager) into the store”、“search”、“delegates transient content search without changing the list snapshot”；源码顶部原注释（英文，仅作回查线索）：SessionRuntime: list store projection (manager → {ids, byId, current} with derived titles), the migrated current-selection account (open validation, persisted mask semantics, cell resolution), scope-tree lifecycle (lazy mint / frozen survival / removed tear...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/slots-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/slots-service.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、扩展槽位的具体场景，包括“built-in”、“is declared at construction: spec readable, occupancy open, no plugin needed”、“rejects a second declaration of root, attributing the built-in row”、“load-time validation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“built-in”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“SlotRegistry terminal-design account: built-in 'root', the three load-time throws (duplicate declaration / undeclared contribution / cross-scope store handle), the renderer installation contract (double install / not installed / non-root key), store instanc...”；固定提交中扫描到的声明包括 `boot`、`fakeHandle`、`captureHost`、`fakeWorkspaces`、`fakeSessions`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/slots.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/slots.ts)、[packages/client/ui-slots/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-slots/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/slots.ts`、`packages/client/ui-slots/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 666 行；扫描到的声明包括 `boot`、`fakeHandle`、`captureHost`、`fakeWorkspaces`、`fakeSessions`、`storeBench`；扫描到的测试主题包括 “built-in”、“is declared at construction: spec readable, occupancy open, no plugin needed”、“rejects a second declaration of root, attributing the built-in row”、“load-time validation”、“throws on contributing into an undeclared slot”、“throws on a duplicate declaration, naming the slot and the prior declarant”；源码顶部原注释（英文，仅作回查线索）：SlotRegistry terminal-design account: built-in 'root', the three load-time throws (duplicate declaration / undeclared contribution / cross-scope store handle), the renderer installation contract (double install / not installed / non-root key), store instanc...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、状态存储的具体场景，包括“createSnapshotStore”、“applies update through a draft and preserves untouched branch references”、“notifies synchronously per update by default”、“coalesces a frame of updates into one notification in raf mode”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“createSnapshotStore”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/contract/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/contract/store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/contract/store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 227 行；扫描到的测试主题包括 “createSnapshotStore”、“applies update through a draft and preserves untouched branch references”、“notifies synchronously per update by default”、“coalesces a frame of updates into one notification in raf mode”、“falls back to microtask batching in raf mode without requestAnimationFrame”、“unsubscribes raf-mode listeners”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/subagent-lineage.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/subagent-lineage.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、子 agent的具体场景，包括“indexSubagentDescendants”、“counts every nested descendant and its exact running state”、“stops at ordinary forks and fails soft on cycles and missing parents”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“indexSubagentDescendants”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `summary`、`index`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 53 行；扫描到的声明包括 `summary`、`index`；扫描到的测试主题包括 “indexSubagentDescendants”、“counts every nested descendant and its exact running state”、“stops at ordinary forks and fails soft on cycles and missing parents”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/time-zone.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/time-zone.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“browser time zone”、“returns the runtime-resolved zone”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“browser time zone”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/time-zone.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/time-zone.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/time-zone.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 24 行；扫描到的测试主题包括 “browser time zone”、“returns the runtime-resolved zone”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/tool-call-tree.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/tool-call-tree.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、工具的具体场景，包括“ToolCallTree”、“rejects a self-parenting dispatch edge”、“rejects a settling edge that would close a multi-call cycle”、“accepts an acyclic graph with a shared descendant”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ToolCallTree”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/runtime/src/client/sessions/conversation.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/conversation.ts)、[packages/client/runtime/src/client/sessions/tool-call-tree.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/tool-call-tree.ts)、[packages/core/session/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/sessions/conversation.ts`、`packages/client/runtime/src/client/sessions/tool-call-tree.ts`、`packages/core/session/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的测试主题包括 “ToolCallTree”、“rejects a self-parenting dispatch edge”、“rejects a settling edge that would close a multi-call cycle”、“accepts an acyclic graph with a shared descendant”、“rejects an edge beyond the recursive depth safety limit”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/wire-events.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/wire-events.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时、事件的具体场景，包括“wire event bridge”、“republishes a forwarded host event verbatim, and routes no other host frame there”、“carries each forwarded event name with its own argument list, unfiltered”、“broadcasts connection/reset on every established generation (reconnect invalidation)”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“wire event bridge”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Wire-to-typed-event bridge: a host/remote-event frame is handed verbatim to the Remote service's $dispatch (its fan-out to ctx.remote.$on is api-gateway's own coverage); each established connection generation emits connection/reset for generation-scoped cac...”；固定提交中扫描到的声明包括 `forwardedEventContracts`、`mount`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/typert/registry/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 135 行；扫描到的声明包括 `forwardedEventContracts`、`mount`；扫描到的测试主题包括 “wire event bridge”、“republishes a forwarded host event verbatim, and routes no other host frame there”、“carries each forwarded event name with its own argument list, unfiltered”、“broadcasts connection/reset on every established generation (reconnect invalidation)”；源码顶部原注释（英文，仅作回查线索）：Wire-to-typed-event bridge: a host/remote-event frame is handed verbatim to the Remote service's $dispatch (its fan-out to ctx.remote.$on is api-gateway's own coverage); each established connection generation emits connection/reset for generation-scoped cac...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tests/workspaces-service.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/workspaces-service.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、运行时的具体场景，包括“WorkspaceManager”、“replays changed frames over hydration and adopts the durable order on refresh”、“single-flights refreshes and exposes result and transport failures independently of rea...”、“creates by path, prepends a new row, and folds failures”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“WorkspaceManager”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `workspace`、`bench`；本地静态 import 图显示它直接依赖 6 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/sessions/service.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/sessions/service.ts)、[packages/client/runtime/src/client/workspaces/manager.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/workspaces/manager.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 测试支持：[packages/client/runtime/tests/fake-api.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tests/fake-api.client.ts)
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/sessions/service.ts`、`packages/client/runtime/src/client/workspaces/manager.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 597 行；扫描到的声明包括 `workspace`、`bench`；扫描到的测试主题包括 “WorkspaceManager”、“replays changed frames over hydration and adopts the durable order on refresh”、“single-flights refreshes and exposes result and transport failures independently of readiness”、“creates by path, prepends a new row, and folds failures”、“reorders optimistically while newer Host frames outrank unary echoes and failures roll back”、“rolls overlapping rejected reorders back to the last Host-confirmed order”。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/runtime/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、运行时：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/runtime/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/tsdown.client.ts

### [packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：源码顶部注释把它定位为“Shared tsdown preset for UI plugin client bundles. Emits a closure-factory artifact: the bundle calls window.__ModuleLoader__.load({id, factory}) and resolves externals through the injected require (loader module table — cordis DI entities, no globals, no i...”；固定提交中扫描到的声明包括 `INLINE_SAFE`、`clientBundle`、`staticLinked`、`isStaticLinkedConfig`、`clientLibrary`；本地静态 import 图显示它直接依赖 3 个源文件，并被 50 个源文件直接引用。
- 直接协作者：[packages/client/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/README.md)、[packages/client/modules/src/client/manifest.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/modules/src/client/manifest.ts)、[packages/client/web/src/platform.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/web/src/platform.ts)、[scripts/client-build-environment.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.ts)、[packages/api/gateway/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/gateway/tsdown.config.ts)
- 对应测试：[scripts/client-build-environment.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-build-environment.client.spec.ts)、[scripts/client-bundle-css.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-bundle-css.spec.ts)、[scripts/client-bundle-purity.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/client-bundle-purity.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/README.md`，再读本配置/脚本，沿着 `packages/api/gateway/tsdown.config.ts`、`packages/api/remotes/tsdown.config.ts`、`packages/client/connection/tsdown.config.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 588 行；扫描到的声明包括 `INLINE_SAFE`、`clientBundle`、`staticLinked`、`isStaticLinkedConfig`、`clientLibrary`、`clientOnly`、`requestedExternals`、`styleInjectionModule`；源码顶部原注释（英文，仅作回查线索）：Shared tsdown preset for UI plugin client bundles. Emits a closure-factory artifact: the bundle calls window.__ModuleLoader__.load({id, factory}) and resolves externals through the injected require (loader module table — cordis DI entities, no globals, no i...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

## packages/client/ui-agent-preset

### [packages/client/ui-agent-preset/src/client/AgentPresetLabel.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AgentPresetLabel` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AgentPresetLabel` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Session-header agent-preset label: static chrome, never a control.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .label、.icon；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 23 行；样式结构包含选择器 .label、.icon；源码顶部原注释（英文，仅作回查线索）：Session-header agent-preset label: static chrome, never a control.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：Session Agent preset 标签
- 这个文件有什么用：它在已经开始的 Session header 中只读显示 agent preset 名称；它不提供切换控制，preset 选择留在新建 Session 页面。
- 为什么这样设计：Session 开始后 composition 是固定的，header 中提供切换按钮会承诺宿主并不支持的行为；只读标签把“当前运行什么”与“新建时选择什么”分成两个清楚的界面边界。
- 文件级设计证据：源码顶部注释把它定位为“The session header's agent-preset label. Read-only by construction: a session's composition is fixed once its conversation starts, and a header is only worth reading after that. Offering a control here would promise a switch the host refuses; naming what th...”；固定提交中扫描到的声明包括 `AgentPresetLabelInjected`、`AgentPresetLabelProps`、`AgentPresetLabel`；本地静态 import 图显示它直接依赖 7 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetLabel.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.module.css)、[packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)、[packages/client/ui-agent-preset/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/index.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-agent-preset/README.md` 和入口，再读当前实现，沿着 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/AgentPresetLabel.module.css`、`packages/client/ui-agent-preset/src/client/locales.ts` 和 `packages/client/ui-agent-preset/src/client/index.ts`、`packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx` 确认输入输出，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 64 行；扫描到的声明包括 `AgentPresetLabelInjected`、`AgentPresetLabelProps`、`AgentPresetLabel`；源码顶部原注释（英文，仅作回查线索）：The session header's agent-preset label. Read-only by construction: a session's composition is fixed once its conversation starts, and a header is only worth reading after that. Offering a control here would promise a switch the host refuses; naming what th...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AgentPresetRow` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AgentPresetRow` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset row: title/description plus the preset selector pill.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .row、.rowText、.title、.desc、.selector、.chevron；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 60 行；样式结构包含选择器 .row、.rowText、.title、.desc、.selector、.chevron；源码顶部原注释（英文，仅作回查线索）：Agent-preset row: title/description plus the preset selector pill.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AgentPresetRow` 的界面组件或交互逻辑，并导出 `AgentPresetRowInjected`、`AgentPresetRowProps`、`AgentPresetRow`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Agent-preset preference row: the preset new sessions are composed from. A running session keeps the composition it began with, so this row never disturbs work in progress.。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Agent-preset preference row: the preset new sessions are composed from. A running session keeps the composition it began with, so this row never disturbs work in progress.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset preference row: the preset new sessions are composed from. A running session keeps the composition it began with, so this row never disturbs work in progress.”；固定提交中扫描到的声明包括 `AgentPresetRowInjected`、`AgentPresetRowProps`、`AgentPresetRow`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetRow.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.module.css)、[packages/client/ui-agent-preset/src/client/PresetMenu.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/PresetMenu.tsx)、[packages/client/ui-agent-preset/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/index.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/index.ts`、`packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 89 行；扫描到的声明包括 `AgentPresetRowInjected`、`AgentPresetRowProps`、`AgentPresetRow`；源码顶部原注释（英文，仅作回查线索）：Agent-preset preference row: the preset new sessions are composed from. A running session keeps the composition it began with, so this row never disturbs work in progress.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetSeat.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSeat.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AgentPresetSeat` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AgentPresetSeat` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset chip on the new-session screen, beside the workspace picker. Geometry mirrors HeroShell's .workspace so the two read as one row.”；固定提交中扫描到的结构线索是：样式结构包含选择器 .seat、.seatIcon、.introIcon、.introText、.introChar、.chevron；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 119 行；样式结构包含选择器 .seat、.seatIcon、.introIcon、.introText、.introChar、.chevron；源码顶部原注释（英文，仅作回查线索）：Agent-preset chip on the new-session screen, beside the workspace picker. Geometry mirrors HeroShell's .workspace so the two read as one row.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AgentPresetSeat` 的界面组件或交互逻辑，并导出 `AgentPresetSeatInjected`、`AgentPresetSeatProps`、`AgentPresetSeat`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The agent-preset chip on the new-session screen, beside the workspace picker. It lives here rather than in the composer because the choice is only available before a conversation starts: once a turn has run, the session's history was produced under that pre...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The agent-preset chip on the new-session screen, beside the workspace picker. It lives here rather than in the composer because the choice is only available before a conversation starts: once a turn has run, the session's history was produced under that pre...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The agent-preset chip on the new-session screen, beside the workspace picker. It lives here rather than in the composer because the choice is only available before a conversation starts: once a turn has run, the session's history was produced under that pre...”；固定提交中扫描到的声明包括 `AgentPresetSeatInjected`、`AgentPresetSeatProps`、`AgentPresetSeat`、`introStaggerMs`；本地静态 import 图显示它直接依赖 7 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetSeat.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSeat.module.css)、[packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)、[packages/client/ui-agent-preset/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/index.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/index.ts`、`packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 170 行；扫描到的声明包括 `AgentPresetSeatInjected`、`AgentPresetSeatProps`、`AgentPresetSeat`、`introStaggerMs`；源码顶部原注释（英文，仅作回查线索）：The agent-preset chip on the new-session screen, beside the workspace picker. It lives here rather than in the composer because the choice is only available before a conversation starts: once a turn has run, the session's history was produced under that pre...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSection.module.css)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面样式
- 这个文件有什么用：它定义 `AgentPresetSection` 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。
- 为什么这样设计：把 `AgentPresetSection` 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。
- 文件级设计证据：固定提交中扫描到的结构线索是：样式结构包含选择器 .section、.title、.intro、.group、.groupHead、.cards；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 409 行；样式结构包含选择器 .section、.title、.intro、.group、.groupHead、.cards；自定义属性 --dsh-scrollbar-thumb、--dsh-scrollbar-thumb-hover。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `AgentPresetSection` 的界面组件或交互逻辑，并导出 `AgentPresetSectionInjected`、`AgentPresetSectionProps`、`AgentPresetSection`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：Agent-presets settings section: the roster as cards, a copy dialog as the only way a preset is created, and a read-only viewer over the shipped compositions. The browser edits no composition text — a shipped preset opens read-only to be READ (it is the know...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Agent-presets settings section: the roster as cards, a copy dialog as the only way a preset is created, and a read-only viewer over the shipped compositions. The browser edits no composition text — a shipped preset opens read-only to be READ (it is the know...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Agent-presets settings section: the roster as cards, a copy dialog as the only way a preset is created, and a read-only viewer over the shipped compositions. The browser edits no composition text — a shipped preset opens read-only to be READ (it is the know...”；固定提交中扫描到的声明包括 `AgentPresetSectionInjected`、`AgentPresetSectionProps`、`AgentPresetSection`、`CopyDialog`、`CardDescription`；本地静态 import 图显示它直接依赖 6 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetSection.module.css](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSection.module.css)、[packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)、[packages/client/ui-agent-preset/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/index.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/index.ts`、`packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/section.client.spec.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 421 行；扫描到的声明包括 `AgentPresetSectionInjected`、`AgentPresetSectionProps`、`AgentPresetSection`、`CopyDialog`、`CardDescription`；源码顶部原注释（英文，仅作回查线索）：Agent-presets settings section: the roster as cards, a copy dialog as the only way a preset is created, and a read-only viewer over the shipped compositions. The browser edits no composition text — a shipped preset opens read-only to be READ (it is the know...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/PresetMenu.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/PresetMenu.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：界面组件或界面逻辑
- 这个文件有什么用：它实现名为 `PresetMenu` 的界面组件或交互逻辑，并导出 `PresetMenuProps`、`PresetMenu`，把输入、局部状态和用户操作组织成可渲染的 UI 单元；源码顶部还说明：The preset picker both surfaces render: a menu of presets over a button naming the current one. The settings row and the composer seat differ in where they sit, what they call the current value, and when they refuse a pick — not in how the picker itself beh...。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“The preset picker both surfaces render: a menu of presets over a button naming the current one. The settings row and the composer seat differ in where they sit, what they call the current value, and when they refuse a pick — not in how the picker itself beh...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“The preset picker both surfaces render: a menu of presets over a button naming the current one. The settings row and the composer seat differ in where they sit, what they call the current value, and when they refuse a pick — not in how the picker itself beh...”；固定提交中扫描到的声明包括 `PresetMenuProps`、`PresetMenu`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)、[packages/client/ui-agent-preset/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/settings-store.ts)、[packages/client/ui-primitives/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-primitives/src/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)、[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 84 行；扫描到的声明包括 `PresetMenuProps`、`PresetMenu`；源码顶部原注释（英文，仅作回查线索）：The preset picker both surfaces render: a menu of presets over a button naming the current one. The settings row and the composer seat differ in where they sit, what they call the current value, and when they refuse a pick — not in how the picker itself beh...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset surface plugin, browser half — four surfaces over one roster: a General-settings row for the default preset, a chip on the new-session screen for the session about to start, a read-only label in the session header, and a settings section that m...”；固定提交中扫描到的声明包括 `inject`、`apply`；本地静态 import 图显示它直接依赖 12 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-agent-preset/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-agent-preset/tests/apply.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-agent-preset/tests/apply.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 224 行；扫描到的声明包括 `inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Agent-preset surface plugin, browser half — four surfaces over one roster: a General-settings row for the default preset, a chip on the new-session screen for the session about to start, a read-only label in the session header, and a settings section that m...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：本地化资源
- 这个文件有什么用：它为浏览器端、用户界面、智能体提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。
- 为什么这样设计：文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。
- 文件级设计证据：源码顶部注释把它定位为“Locale bundles for the agent-preset settings row, hero chip, header label, and management section.”；固定提交中扫描到的声明包括 `AgentPresetSettingsKey`、`en`、`zh`、`PresetDisplaySource`、`PresetDisplayText`；本地静态 import 图显示它直接依赖 0 个源文件，并被 9 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx)、[packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx)、[packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx)
- 对应测试：[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)、[packages/client/ui-agent-preset/tests/locales.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/locales.client.spec.ts)、[packages/client/ui-agent-preset/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx`、`packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx`、`packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx` 确认状态如何进入 UI，最后对照 `packages/client/ui-agent-preset/tests/components.client.spec.tsx`、`packages/client/ui-agent-preset/tests/locales.client.spec.ts`、`packages/client/ui-agent-preset/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 192 行；扫描到的声明包括 `AgentPresetSettingsKey`、`en`、`zh`、`PresetDisplaySource`、`PresetDisplayText`、`presetDisplayText`；源码顶部原注释（英文，仅作回查线索）：Locale bundles for the agent-preset settings row, hero chip, header label, and management section.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/seat-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/seat-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、智能体的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Hero-chip controller: which preset the NEXT session gets. The new-session screen has no session, so a pick is staged rather than applied. It reaches a session when one becomes current and is still blank — whether the workspace connect created it or reused a...”；固定提交中扫描到的声明包括 `AgentPresetSeatState`、`SeatSessionSummary`、`AgentPresetSeatController`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/settings-store.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx)
- 对应测试：[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)、[packages/client/ui-agent-preset/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/settings-store.ts` 和 `packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx`、`packages/client/ui-agent-preset/src/client/index.ts`、`packages/client/ui-agent-preset/tests/components.client.spec.tsx` 理解状态变化，最后对照 `packages/client/ui-agent-preset/tests/components.client.spec.tsx`、`packages/client/ui-agent-preset/tests/settings-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 177 行；扫描到的声明包括 `AgentPresetSeatState`、`SeatSessionSummary`、`AgentPresetSeatController`；源码顶部原注释（英文，仅作回查线索）：Hero-chip controller: which preset the NEXT session gets. The new-session screen has no session, so a pick is staged rather than applied. It reaches a session when one becomes current and is still blank — whether the workspace connect created it or reused a...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/section-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/section-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、智能体的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset management controller: the roster as a list, a copy dialog as the only way a preset is created, and a read-only viewer over the shipped compositions. The browser edits no composition text. A new preset is a host-side copy of an existing one ({ ...”；固定提交中扫描到的声明包括 `PresetRow`、`CopyDraft`、`PresetView`、`AgentPresetSectionState`、`draftBlocker`；本地静态 import 图显示它直接依赖 3 个源文件，并被 4 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/settings-store.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx)
- 对应测试：[packages/client/ui-agent-preset/tests/section-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section-store.client.spec.ts)、[packages/client/ui-agent-preset/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section.client.spec.tsx)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/settings-store.ts` 和 `packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx`、`packages/client/ui-agent-preset/src/client/index.ts`、`packages/client/ui-agent-preset/tests/section-store.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-agent-preset/tests/section-store.client.spec.ts`、`packages/client/ui-agent-preset/tests/section.client.spec.tsx`。
- 代码证据：固定提交归档实际读取结果：约 348 行；扫描到的声明包括 `PresetRow`、`CopyDraft`、`PresetView`、`AgentPresetSectionState`、`draftBlocker`、`AgentPresetSectionController`；源码顶部原注释（英文，仅作回查线索）：Agent-preset management controller: the roster as a list, a copy dialog as the only way a preset is created, and a read-only viewer over the shipped compositions. The browser edits no composition text. A new preset is a host-side copy of an existing one ({ ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/settings-store.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：状态存储
- 这个文件有什么用：它维护浏览器端、用户界面、智能体的状态、快照或队列，并集中处理更新、读取和清理规则。
- 为什么这样设计：状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset default-settings controller. Options and the current default both come from one agentPreset.list call: the roster already reports which id a session with no explicit choice gets, so the row needs no schema introspection. Writes target the setti...”；固定提交中扫描到的声明包括 `AGENT_PRESET_SETTINGS_NS`、`messageOf`、`writeDefaultPreset`、`AgentPresetOption`、`RosterPreset`；本地静态 import 图显示它直接依赖 3 个源文件，并被 8 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-settings/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-settings/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx)
- 对应测试：[packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)、[packages/client/ui-agent-preset/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/settings-store.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/api/remotes/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-settings/src/client/index.ts` 和 `packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx`、`packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx`、`packages/client/ui-agent-preset/src/client/PresetMenu.tsx` 理解状态变化，最后对照 `packages/client/ui-agent-preset/tests/components.client.spec.tsx`、`packages/client/ui-agent-preset/tests/settings-store.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 259 行；扫描到的声明包括 `AGENT_PRESET_SETTINGS_NS`、`messageOf`、`writeDefaultPreset`、`AgentPresetOption`、`RosterPreset`、`RosterValue`、`RosterRead`、`readRoster`；源码顶部原注释（英文，仅作回查线索）：Agent-preset default-settings controller. Options and the current default both come from one agentPreset.list call: the roster already reports which id a session with no explicit choice gets, so the row needs no schema introspection. Writes target the setti...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/css-modules.d.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/css-modules.d.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：类型声明
- 这个文件有什么用：这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。
- 为什么这样设计：它位于 packages/client/ui-agent-preset/src的类型声明层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 0 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-agent-preset/README.md`、入口和消费者，再读当前契约，沿着所在包的入口或服务看它怎样约束运行时，最后对照同包中与它同名或覆盖相近场景的测试。
- 代码证据：固定提交归档实际读取结果：约 4 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/index.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把浏览器端、用户界面、智能体相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Agent-preset surface plugin, node half. The empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships the General-settings row through exports"./client", discovered from the package.json dsh.client declaration.”；固定提交中扫描到的声明包括 `apply`；本地静态 import 图显示它直接依赖 0 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/client/ui-agent-preset/README.md`、入口和消费者，再读当前契约，沿着 `packages/client/ui-agent-preset/tests/invariant.client.spec.ts` 看它怎样约束运行时，最后对照 `packages/client/ui-agent-preset/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 9 行；扫描到的声明包括 `apply`；源码顶部原注释（英文，仅作回查线索）：Agent-preset surface plugin, node half. The empty apply exists so the plugin appears in the host cordis.yml / Loader; the browser half ships the General-settings row through exports"./client", discovered from the package.json dsh.client declaration.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/invariant.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查浏览器端、用户界面、智能体必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-client-ui-agent-preset. @module @deepseek-ai/dsh-client-ui-agent-preset/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 1 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)、[packages/client/ui-agent-preset/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/invariant.client.spec.ts)
- 对应测试：[packages/client/ui-agent-preset/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/invariant.client.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和 `packages/client/ui-agent-preset/tests/invariant.client.spec.ts` 理解状态变化，最后对照 `packages/client/ui-agent-preset/tests/invariant.client.spec.ts`。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-client-ui-agent-preset. @module @deepseek-ai/dsh-client-ui-agent-preset/invariant。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/apply.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/apply.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“ui-agent-preset apply”、“declares the services it uses”、“registers the General row and the settings section”、“registers into a declaration that arrives after apply”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“ui-agent-preset apply”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Registration: the General row, the settings section, the new-session chip, and the header label all come from one apply, and each defers until the slot it fills has been declared. A pushed settings change refreshes the surfaces that are already showing, so ...”；固定提交中扫描到的声明包括 `bench`、`declareRoot`、`declareConversation`、`workspacesDouble`、`sessionsDouble`；本地静态 import 图显示它直接依赖 11 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/locale/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/locale/src/client/index.ts)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/locale/src/client/index.ts`、`packages/client/runtime/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 585 行；扫描到的声明包括 `bench`、`declareRoot`、`declareConversation`、`workspacesDouble`、`sessionsDouble`；扫描到的测试主题包括 “ui-agent-preset apply”、“declares the services it uses”、“registers the General row and the settings section”、“registers into a declaration that arrives after apply”、“hands each surface its own store and actions”、“routes the section actions to one controller”；源码顶部原注释（英文，仅作回查线索）：Registration: the General row, the settings section, the new-session chip, and the header label all come from one apply, and each defers until the slot it fills has been declared. A pushed settings change refreshes the surfaces that are already showing, so ...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/components.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/components.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“the General-settings row”、“reads the roster once and shows the current default”、“marks a locally authored option as local”、“falls back to the id for a preset that published no name”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the General-settings row”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `renderRow`、`renderSeat`、`renderLabel`、`delayedChars`；本地静态 import 图显示它直接依赖 8 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx)、[packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx`、`packages/client/ui-agent-preset/src/client/AgentPresetRow.tsx`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 405 行；扫描到的声明包括 `renderRow`、`renderSeat`、`renderLabel`、`delayedChars`；扫描到的测试主题包括 “the General-settings row”、“reads the roster once and shows the current default”、“marks a locally authored option as local”、“falls back to the id for a preset that published no name”、“shows the selected id until a stale roster contains it”、“writes the picked preset and closes the menu”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/invariant.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/invariant.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“invariant companion”、“reserves package ownership with an empty installer”、“has an empty node half”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“invariant companion”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The package's node half: an empty host body and an explained empty invariant companion.”；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/index.ts)、[packages/client/ui-agent-preset/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/invariant.ts)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-agent-preset/src/index.ts`、`packages/client/ui-agent-preset/src/invariant.ts`、`packages/runtime-diagnostics/invariants/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 25 行；扫描到的测试主题包括 “invariant companion”、“reserves package ownership with an empty installer”、“has an empty node half”；源码顶部原注释（英文，仅作回查线索）：The package's node half: an empty host body and an explained empty invariant companion.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/locales.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/locales.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“preset display copy”、“keeps file metadata for user and unknown system presets”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“preset display copy”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“Web-localized copy for the four shipped presets and file copy for every other row.”；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/ui-agent-preset/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 33 行；扫描到的测试主题包括 “preset display copy”、“keeps file metadata for user and unknown system presets”；源码顶部原注释（英文，仅作回查线索）：Web-localized copy for the four shipped presets and file copy for every other row.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/section-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“loading the roster”、“maps the roster onto rows with the capability flags”、“reports an empty roster as unavailable, not as an error”、“keeps one load in flight rather than stacking reads”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“loading the roster”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The agent-preset management controller: a copy dialog is the only way a preset is created, the shipped compositions open in a read-only viewer, and the way into a custom preset's files is the location action — opened on a desktop, revealed as a path where t...”；固定提交中扫描到的声明包括 `fakeApi`、`seed`、`harness`、`copyOf`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/section-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/section-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/section-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 580 行；扫描到的声明包括 `fakeApi`、`seed`、`harness`、`copyOf`；扫描到的测试主题包括 “loading the roster”、“maps the roster onto rows with the capability flags”、“reports an empty roster as unavailable, not as an error”、“keeps one load in flight rather than stacking reads”、“surfaces a refusal as the page error”、“folds a dead transport into the same error surface”；源码顶部原注释（英文，仅作回查线索）：The agent-preset management controller: a copy dialog is the only way a preset is created, the shipped compositions open in a read-only viewer, and the way into a custom preset's files is the location action — opened on a desktop, revealed as a path where t...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/section.client.spec.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/section.client.spec.tsx)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“the preset list”、“reads the roster once when it first renders”、“shows resolved copy for built-ins and falls back to custom ids”、“marks trust and the one in use, and offers no”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the preset list”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“@vitest-environment jsdom”；固定提交中扫描到的声明包括 `renderSection`、`rowFor`、`ResizeObserverStub`、`clamp`；本地静态 import 图显示它直接依赖 5 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/runtime/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/runtime/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx)、[packages/client/ui-agent-preset/src/client/locales.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/locales.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/client/runtime/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx`、`packages/client/ui-agent-preset/src/client/locales.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 519 行；扫描到的声明包括 `renderSection`、`rowFor`、`ResizeObserverStub`、`clamp`；扫描到的测试主题包括 “the preset list”、“reads the roster once when it first renders”、“shows resolved copy for built-ins and falls back to custom ids”、“marks trust and the one in use, and offers no”、“separates built-in presets from custom ones”、“shows no group heading for a set nobody has”；源码顶部原注释（英文，仅作回查线索）：@vitest-environment jsdom。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tests/settings-store.client.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tests/settings-store.client.spec.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查浏览器端、用户界面、智能体的具体场景，包括“the agent-preset settings controller”、“disables the control when this browser may not write settings”、“derives options and the current default from one roster call”、“offers no broken preset: the pickers choose the NEXT session\”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“the agent-preset settings controller”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：源码顶部注释把它定位为“The agent-preset settings controller: it derives both the options and the current default from one roster call, writes only the default field, and treats an empty roster as "this deployment composes no presets" rather than as a failure.”；固定提交中扫描到的声明包括 `derivedController`、`fakeApi`、`chip`；本地静态 import 图显示它直接依赖 4 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/api/remotes/src/client/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/api/remotes/src/client/index.ts)、[packages/client/ui-agent-preset/src/client/seat-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/seat-store.ts)、[packages/client/ui-agent-preset/src/client/settings-store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/src/client/settings-store.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/api/remotes/src/client/index.ts`、`packages/client/ui-agent-preset/src/client/seat-store.ts`、`packages/client/ui-agent-preset/src/client/settings-store.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。
- 代码证据：固定提交归档实际读取结果：约 467 行；扫描到的声明包括 `derivedController`、`fakeApi`、`chip`；扫描到的测试主题包括 “the agent-preset settings controller”、“disables the control when this browser may not write settings”、“derives options and the current default from one roster call”、“offers no broken preset: the pickers choose the NEXT session\”、“carries the display metadata a preset published”、“reports an empty roster as unavailable, not as an error”；源码顶部原注释（英文，仅作回查线索）：The agent-preset settings controller: it derives both the options and the current default from one roster call, writes only the default field, and treats an empty roster as "this deployment composes no presets" rather than as a failure.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [packages/client/ui-agent-preset/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/tsdown.config.ts)

- 所属层：packages/client：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它告诉工具链怎样处理浏览器端、用户界面、智能体：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[packages/client/ui-agent-preset/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/ui-agent-preset/README.md)、[packages/client/tsdown.client.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/tsdown.client.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `packages/client/ui-agent-preset/README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 3 行。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

