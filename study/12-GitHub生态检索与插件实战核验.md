# GitHub 生态检索与插件实战核验

这一章补上两个容易混在一起的问题：**当前索引是否真的覆盖了每一个纳入的源文件**，以及**GitHub 上看起来像 DSH 插件的仓库到底属于哪一类**。

先给结论：固定 DSH 提交中被本仓库纳入的 2,756 个代码或界面源文件，确实都有一条对应的中文索引条目；每条条目都有用途、设计理由、文件级证据、协作者、测试关系、阅读顺序和固定版本链接。但这不等于 2,756 个文件都被人工逐行精读，也不等于所有 JSON、YAML、Markdown、快照和资源文件都被遗漏。它们是另一类重要材料，当前不计入“逐源码文件”数字。

本章还把 GitHub 的生态搜索结果当作**候选发现数据**，不当作官方注册表。目录、市场、扫描器、管理器、普通插件、桌面封装和运行时注入器解决的是不同问题；安装前必须分别核对身份、装配方式、权限、版本、测试和卸载行为。

## 一、怎样证明“每个源文件都有对应材料”

本仓库固定的上游提交是 [`47f943859bef60e4160492346772ded9b24f765a`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a)。这个提交的 Git tree 有 7,412 个文件，生成器按照源码扩展名白名单识别出 2,756 个代码或界面源文件，分到 `study/文件索引/` 的 66 个索引页中。

每一条索引不是只有一个文件名，而是包含下面这些字段：

<details class="reference-table">
<summary>展开一、怎样证明“每个源文件都有对应材料”（10 行）</summary>

| 字段 | 用初学者能懂的话说 | 证据强度 |
| --- | --- | --- |
| 所属层 | 它在应用、包、测试、原生能力还是第三方 vendored 源码哪一层 | 路径和目录事实 |
| 文件角色 | 它是入口、类型、服务、工具、测试、UI 还是配置逻辑 | 路径、扩展名和源码线索推断 |
| 这个文件有什么用 | 读者先知道它解决什么问题 | 结构化中文解释 |
| 为什么这样设计 | 说明为什么职责要放在这里，而不是随便放到别处 | 角色规则加文件级证据 |
| 文件级设计证据 | 顶部注释、声明、行数和本地 import 关系 | 固定提交的静态读取结果 |
| 直接协作者 | 先读哪些邻近入口、实现或 README | 本地路径和静态 import 关系 |
| 对应测试 | 哪个测试直接或间接覆盖它 | import 图、同包路径和保守推断 |
| 测试关联依据 | 为什么把这个测试列出来，是否只是间接线索 | 关系类型说明 |
| 阅读顺序 | 初学者下一步看哪个文件，再回到哪里 | 结构化学习路线 |
| 固定版本 | 防止链接跟着 `master` 漂移 | 上游 commit 固定链接 |

</details>

所以，“每个文件都有学习材料”在这里的准确含义是：**每个纳入清单的源文件都有一条可定位、可回查、带阅读顺序的中文学习入口**。它不承诺每个小常量、样式文件或测试辅助函数都拥有和 Agent 主循环一样长的人工论文；复杂主链路在 `03-核心文件精读.md` 到 `07-HostClient示例测试发布.md` 里另行精读。

可以在仓库根目录重复检查：

```sh
node study-tools/verify-source-index.mjs
node study-tools/audit-source-index-quality.mjs
node study-tools/verify-study-links.mjs
```

当前固定提交的检查结果是：清单源文件 2,756、索引条目 2,756、结构错误 0、文件级设计证据 2,756/2,756、手写导读路径错误 0。质量审计仍会提示一些角色采用相同的共性模板；这是为了提醒维护者人工抽查，不是隐藏的缺条目。实际条目仍保留自己的路径、声明、注释、测试主题和 import 关系。

## 二、这次 GitHub 搜索查到了什么

本次使用 GitHub 官方公开 repository search API 做只读查询，核心查询是：

```text
q=topic:dsh-plugin
per_page=30
未指定排序和页码
```

对应的[查询入口](https://api.github.com/search/repositories?q=topic%3Adsh-plugin&per_page=30)在 2026-08-16 的本次读取返回 `total_count=4136`。此前材料记录的 `per_page=5` 查询曾返回 `4099`；两个数字都只是不同时间的公开检索快照，不是矛盾，也不是已验证插件数。

“整个 GitHub”要说得准确一些：这个查询覆盖的是公开 repository 元数据中被 topic 标记的候选集合，不包括私有仓库、已删除仓库、没有 topic 的项目、只存在于代码或 issue 中但没有匹配仓库元数据的项目，也不会替你验证项目是否真的能被 DSH 安装。因此不能写成“GitHub 上有 4,136 个 DSH 插件”。更准确的写法是：

> 2026-08-16 的公开 `topic:dsh-plugin` repository search 返回了 4,136 个候选仓库；候选集合包含核心仓库、目录、UI、桌面封装、Skill、MCP、跨 Agent 工具和可能只是蹭 topic 的项目，必须逐仓库核验。

这次查询还遇到了 GitHub API 的匿名 rate limit，因此关键词搜索不能被假装成完整统计。后续维护时应记录查询时间、query、`per_page`、页码或排序，并把新结果当作增量观察，不要覆盖历史快照。

## 三、社区生态可以分成哪些层

下面的项目是本次只读核验的代表性样本，不是官方推荐名单。链接固定到本次读取的分支 HEAD，方便以后比较；“固定 commit”只固定了当时看的内容，不代表项目未来仍然兼容。

| 层次 | 代表样本 | 固定核验点 | 应该怎样理解 |
| --- | --- | --- | --- |
| 官方上游 | [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a) | `47f943859bef60e4160492346772ded9b24f765a`，根包为 `0.1.0-rc.5` | 官方源码、官方文档和公开扩展契约的首要证据 |
| 目录与精选列表 | [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/tree/b23d58c72d8ea267a230ec848f5d96a0821c84ce)、[awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness/tree/57eaea3dc32b3b5bf64d0f24a09f1cf16e76524a) | 各自的 README 和收录规则 | 方便发现项目，不是安全认证；前者明确提醒第三方代码会在本机权限下运行 |
| 第三方 registry | [awesome-dsh-plugins](https://github.com/dshworks/awesome-dsh-plugins/tree/e60ca29e9521a52ac641d534dd3528f8dac4b4e0) | README 自述有 `verifiedAgainst`、`lastVerified`、分类和过滤；固定 commit `e60ca29...` | 比 topic 多了一层过滤和版本字段，但 registry 的“已验证”仍是该项目自己的声明，不能替代独立 Loader、平台和安全验证 |
| 普通 Bundle | [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation/tree/40216642260821da1c16d6d219150c3e4f31a222)、[dsh-navbar](https://github.com/vlln/dsh-navbar/tree/10e9d1546db28c499687d66a369e548cd3f52237) | `package.json`、`cordis.patch.yml`、client 声明和 README | 典型的第三方 UI Bundle；采用官方装配格式不等于 DeepSeek 官方维护 |
| Agent/能力 Bundle | [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams/tree/2b1141248f34ee28870d2e39462c0dbefaa5ffdb)、[dsh-computer-use](https://github.com/Anionex/dsh-computer-use/tree/76bfe8607f61945c1cbb84e73976e601100c13a2) | 依赖、平台权限、外部进程、真实测试和模型/系统资源 | 功能越接近文件、网络、桌面和子进程，安装信任和卸载验证越重要 |
| 独立宿主或 TUI | [dsh-tui](https://github.com/dsh-tui/dsh-tui/tree/8bdc850732464e2c10278f47b4f2b82da38d801e) | README 说明它是 out-of-tree profile bundle，并声明测试套件状态 | 可能复用官方 Bundle，也可能是独立客户端；要看它到底装进哪棵树，不要只看项目名称 |
| 插件管理器 | [dsh-web-plugin-manager](https://github.com/LX2000WASD/dsh-web-plugin-manager/tree/1162fb2182e5ec61f90614c79dd4900465ffd097) | README 自述安装、回滚、环境变量扫描、REST 路由、安装守卫和市场 | 管理器拥有比普通插件更大的安装和更新影响面；“有质量门”仍不等于官方安全审查 |
| 运行时注入 | [dsh-super-injector](https://github.com/yjh051108/dsh-super-injector/tree/f4ef59fb31439225abefe45d6e793235a2a9d5e0) | Loader entry、Fiber、模块缓存、junction 和宿主内部表 | 是运行时注入/兼容层边界案例，不应改写成普通插件教程 |

这里还有一个常见误区：有些社区 README 会把项目叫作“official bundle plugin”或“官方插件形态”。这通常可能只是在说“使用官方可识别的 Bundle 格式”，并不代表 DeepSeek AI 维护、审核或背书。判断身份要看仓库归属、发布者、许可证、官方源码是否实际包含它，以及官方文档是否列出它；不能只看项目自己写的形容词。

## 四、怎样从一个 GitHub 仓库判断它到底是什么

打开一个候选仓库后，按下面顺序读，先分类再决定是否安装：

### 1. 先看身份和来源

记录仓库 owner、默认分支、当前 commit、许可证、release、npm 包名和维护者。若包名使用 `@deepseek-ai/*` 或 logo、文案暗示官方身份，却不在官方仓库和发布链路中，要把它标为身份风险，而不是官方插件。

### 2. 再看装配格式

| 看到的证据 | 初步分类 | 不能直接推出的结论 |
| --- | --- | --- |
| `apply(ctx)`、`ctx.on()`、`ctx.provide()`、`Service` | Cordis 插件或服务 | 不代表有独立安装包，也不代表官方维护 |
| `package.json` 中有 `dsh.bundle.patch` | 可被 DSH 识别的 Bundle | 只证明采用装配格式，不证明官方身份或兼容性 |
| `cordis.patch.yml` | 配置组合层 | 它不是修改 DSH TypeScript 源码的 source patch |
| `dsh.client`、client module、UI slot | 浏览器端或双端扩展 | 仍需检查 Node half、WebSocket、CSS、路由和卸载 |
| 只有 `SKILL.md`、MCP 配置或 preset | Skill、MCP 或 preset | 不一定是 Cordis 插件，权限和加载路径另算 |
| 市场 registry、安装器、CLI 管理命令 | 插件管理器 | 它会接触更多包、网络和 Profile 状态，供应链风险更大 |
| `loader.internal`、`entry.fiber`、私有 Map、模块缓存、junction、进程注入 | 运行时补丁或注入器 | 不应包装成稳定的官方公开扩展 API |

### 3. 再看真正的资源和权限

搜索 `package.json` 的 `scripts`，尤其是 `prepare`、`preinstall`、`postinstall`；检查它是否启动 Node/Python/Swift/Rust 子进程，读写 Profile、凭据、SSH、浏览器目录或工作区，访问网络，创建 watcher、junction、socket 或后台服务。插件代码和它安装时执行的构建脚本都在用户机器的权限范围内。

`tools/result`、`ctx.tools.register()` 或 `inject: ['tools']` 不会自动产生操作系统沙箱。`inject` 是服务依赖声明；工具注册也不是文件、网络、Shell 或凭据授权。权限应由对应 provider、审批策略和操作系统配置共同决定。

### 4. 最后看证据，而不是宣传语

把项目声称的“支持 DSH”“已验证”“有 self-test”拆成不同问题：

| 证据 | 它最多证明什么 |
| --- | --- |
| README 有安装命令 | 作者希望用户这样安装 |
| `dsh.bundle.patch` 存在 | 包使用了可识别的 Bundle manifest |
| typecheck/build 通过 | 某个构建环境可以产出代码 |
| 单元测试通过 | 被测纯逻辑在测试输入下符合断言 |
| Loader 组合测试通过 | 包清单、patch 层、依赖和真实装载路径至少被测过 |
| Web/协议 E2E 通过 | 某个平台和某个宿主流程被测过 |
| 真实模型请求通过 | 某个 API key、模型和网络环境下跑通了真实请求 |
| 卸载测试通过 | 该测试场景下资源清理达到预期 |
| registry 中有 `verifiedAgainst` | registry 维护者记录了一个版本字段，仍需查看它的验证方法 |

这些证据不能互相替代。一个项目有 8/8 self-test，不代表它经过官方 CI；一个市场显示“兼容”，不代表当前 DSH commit、Windows/macOS/Linux、Web UI 和卸载都被验证。

## 五、写一个容易被别人正确使用的插件

现有的[如何写一个合规插件](11-如何写一个合规插件.md)给出了普通观察插件、工具、服务、Bundle、安装、生命周期和测试骨架。本节把官方文档里最容易漏掉的选择规则再压缩成一张路线图。

### 第一步：先选择公开扩展点

| 你的目标 | 优先阅读或使用 | 不要一开始做什么 |
| --- | --- | --- |
| 记录已经完成的工具结果 | `ctx.on('tools/result', ...)` | 不要改私有事件数组或偷偷替换结果 |
| 允许、拒绝或询问工具调用 | `tools/pre-execute`、`ctx.tools.guard()` | 不要把观察事件伪装成安全授权 |
| 包住执行过程做超时、重试或指标 | `tools/execute` | 不要直接改 Agent loop 的执行函数 |
| 检查或变换规范结果 | `tools/post-execute`、工具定义的 `finalizeContent` | 不要假定内容变换天然是保密边界 |
| 提供模型可调用能力 | `ctx.tools.register(defineTool(...))` | 不要直接向 Registry 的私有 Map 写入 |
| 提供共享且可替换的能力 | Cordis `Service` / provider | 不要把全局变量当服务 |
| 观察会话和 UI 流程 | `session/event`、官方 client manifest、UI slot | 不要直接改 React 内部组件或路由表 |
| 贡献对话节点 | `ConversationNodeDefinition` 和官方 Chat renderer 扩展点 | 不要把 CSS 注入当成完整的 UI 插件契约 |

官方 `dsh-tools` 的流水线是：

```text
tools/pre-execute
  -> 单调 guard
  -> tools/execute
  -> tools/post-execute
  -> 工具定义的 finalizeContent
  -> tools/result（只观察）
```

这个顺序就是设计边界：越靠前越可能作出决策，越靠后越接近不可变的观察结果。选择扩展点时，先问“我想观察、决策、包裹执行，还是提供能力”，再看对应 API。

### 第二步：让生命周期拥有所有资源

`ctx.on()`、`ctx.plugin()`、`ctx.provide()`、`ctx.tools.register()` 等 Cordis 注册会和当前 Fiber 关联，插件卸载时可以撤销。timer、watcher、连接、子进程和临时文件不会因为你把它们写在 `apply(ctx)` 里就自动消失；必须用 `ctx.effect()` 返回 disposer，或者明确写出可等待的清理流程。

一个真正合格的卸载测试至少要检查：

1. Fiber dispose 完成后，事件不再触发；
2. 工具不再出现在正确的作用域；
3. timer、watcher、网络连接和子进程已经结束；
4. 文件、junction、Profile patch 和持久化清单恢复到预期状态；
5. 重复安装、重复卸载、依赖消失和失败启动不会留下第二份注册。

### 第三步：用正确的测试层级

普通函数可以从单元测试开始，但面向用户安装的 Bundle 至少要补 Loader 组合测试。官方测试策略明确要求：仅仅手工 `ctx.plugin(...)` 并断言某个函数被调用，不足以证明真实 package manifest、Loader、Profile patch 和发布产物能一起工作。

推荐顺序是：

```text
纯函数/类型
  -> 最小 Context
  -> Loader + cordis.yml 真实组合
  -> 构建后入口或真实 Web/协议流程
  -> 卸载、失败恢复和外部世界断言
```

没有 API key 可以验证加载、schema、事件、工具参数和卸载；不能把它写成“真实模型已验证”。没有真实浏览器就不能写成“Web UI 完整验证”。测试报告应写 DSH commit、平台、Node/pnpm、是否有密钥、是否使用构建产物，以及跳过了哪些部分。

### 第四步：把 README 写成安装前的安全说明

一个好插件 README 至少回答：

```text
项目身份：谁维护、什么许可证、是否官方
支持范围：DSH 版本或固定 commit、平台、Node/pnpm
装配方式：普通库 / Cordis 插件 / Bundle / client / Skill / MCP / preset
公开入口：具体的 service、event、tool、UI slot 或 manifest
权限：文件、网络、凭据、Shell、子进程、系统辅助功能
安装：npm/Git/local 的命令，是否执行 prepare/postinstall
验证：typecheck、单元、Loader、E2E、真实模型和卸载分别到什么程度
卸载：删除哪些包、patch、Fiber、路由、文件链接和持久化状态
失败恢复：启动失败、版本不兼容、依赖缺失时怎么恢复
版本记录：源码 commit、构建产物、变更日志和已知破坏性变化
```

如果 README 只写“支持 hook、功能强大、兼容官方”，却没有这些内容，读者无法区分普通插件、Bundle、管理器、fork 和注入器。

## 六、为什么当前社区特别容易出现版本错位

本学习仓库固定的是 DSH `0.1.0-rc.5`，而本次核验到的多个社区 README 或 registry 条目自述测试的是 `0.1.0-rc.6`。这两个版本之间可能有破坏性变化；“在 rc.6 验证过”不能自动证明“在本仓库固定的 rc.5 可用”。

另外，社区项目的 README、`package.json`、`cordis.patch.yml`、npm 包、Release 和安装文档可能来自不同时间。例如某些仓库的包名已经换过 namespace，而安装文档仍保留旧名称。这不是只看一段 README 就能发现的问题，所以核验必须同时看：

```text
仓库 commit
  -> package.json
  -> cordis.patch.yml / client manifest
  -> 入口源码
  -> 安装文档和 Release 资产
  -> 测试与 CI
```

如果这些证据不一致，就把结论写成“发现文档或发布一致性风险”，不要擅自替作者猜测哪个名字才是正确的。

## 七、这份学习材料仍然没有声称什么

- 2,756 条索引是静态源码证据驱动的逐文件入口，不是 2,756 条人工逐行代码审查。
- GitHub topic 的 4,136 是一次公开 API 检索快照，不是插件数量、安装数量或安全名单。
- 社区 registry 的 `verifiedAgainst` 是 registry 自己维护的字段，不等于官方认证。
- `dsh-super-injector` 的低层注入能力是边界案例，不等于官方公开热插拔 API。
- 当前没有对所有第三方项目做真实安装、真实模型请求、三平台兼容性和卸载验证。
- 普通插件、Bundle、Skill、MCP、preset、市场、管理器、桌面 wrapper 和运行时注入器必须分开描述。

下一步阅读顺序建议是：先看[逐文件索引的读法](08-逐文件索引怎么读.md)确认静态证据，再看[社区生态与扩展边界](10-社区生态与扩展边界.md)理解分类，最后看[如何写一个合规插件](11-如何写一个合规插件.md)写最小包；本章适合在准备安装社区项目或建立自己的 registry 前回看。

## 固定核验链接

- [官方第一个插件教程](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/cordis-tutorial/01-first-plugin.zh.md)
- [官方生命周期与 effect](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/cordis-tutorial/02-lifecycle-and-effects.zh.md)
- [官方进入 harness 的工具教程](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/cordis-tutorial/07-into-the-harness.zh.md)
- [官方扩展插件手册](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/cookbook/extension-cookbook.zh.md)
- [官方工具流水线说明](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/tools/README.zh.md)
- [官方测试策略](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/testing.zh.md)
- [官方插件打包与安装](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/user/develop/basic/publish.zh.md)
- [GitHub `dsh-plugin` topic](https://github.com/topics/dsh-plugin)
- [本次公开 topic 查询](https://api.github.com/search/repositories?q=topic%3Adsh-plugin&per_page=30)
