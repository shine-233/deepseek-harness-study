# 给官方 DSH 的下一步更新建议

这篇是面向 DSH 社区的研究建议，不是 DeepSeek 官方路线图，也不是对社区项目的安全认证。它把固定版本源码、公开社区仓库和本教材的工具可见性实验放在一起，回答一个更具体的问题：**如果 DSH 继续演进，哪些基础能力最值得优先补齐？**

先读[社区生态与扩展边界](10-社区生态与扩展边界.md)可以理解项目分类；再读本篇可以把分类转换成给上游的工程建议。建议都保留证据等级，不把“社区有人做了”写成“方案已经被证明”。

## 先给结论

社区现在最缺的不是更多“能把功能塞进 DSH”的方法，而是让扩展**可见、可控、可回滚、可评估**的公共边界。

我建议官方优先建设五件事：版本化扩展契约、工具可见性与上下文预算、来源与生命周期观测、启动失败隔离、可执行的插件合规检查。

UI App、Host 服务、Hook bridge、社区目录和自进化评估都值得做，但它们应建立在这五件基础能力之上。否则只是把更多功能叠在一个难以解释的 Agent loop 上。

这和“万物皆插件”的工具列表问题直接相关。插件数量增加并不等于每一轮对话都应该把所有工具名称、描述和 schema 一次性送进模型。官方更应该提供“注册但不默认呈现”“轻量目录后按需展开 schema”“按 Agent／任务作用域限制”“达到上下文预算时给出诊断”这几种公开路径，并让作者知道自己的工具当前处在注册、解析、模型呈现还是执行允许哪一层。

否则大家只能通过改源码、读取私有 registry、注入 Loader 或维护 patched fork 来回答“模型到底看到了什么”。这不是插件作者应该承担的公共基础设施责任，也会把上下文优化和权限隔离混成同一件事。

## 官方教程、白皮书和社区教材各自负责什么

这里的“白皮书”不是宣传稿，而是一篇正式说明：官方为什么这样设计、希望解决什么问题、明确不解决什么问题、哪些内容已经验证、哪些内容仍然只是研究方向。

官方教程应该回答“我怎样把它用起来”：怎样安装、怎样运行、怎样写最小插件、怎样使用工具、怎样处理权限、怎样调试、怎样卸载，以及哪些接口在版本升级后仍受支持。教程要让读者不读完整源码也能完成一件小事。

官方白皮书应该回答“这个系统想成为什么”：它怎样组织 Agent loop，工具为什么按需出现，插件和宿主如何分工，怎样记录失败和回滚，怎样评估改动，以及官方明确不保证哪些效果。

社区教材负责把源码和现实生态讲给读者听：逐文件导读、最小示例、社区插件分类、Hook bridge 与注入器的差异、实验记录、源码与运行证据的边界，以及对官方设计的优点和不足提出可验证的意见。

三者的分工可以简单记成：**官方教程教你怎么用，官方白皮书解释为什么这样做，社区教材带你看源码、做实验并提出质疑。** 本仓库属于第三种，而且是非官方材料，不代表 DeepSeek AI 的立场或承诺。

如果未来要把 DSH 与 Linux 类比，比较稳妥的说法是：DSH 有机会成为 Agent 工具和工作流的公共基础之一，但目前还不能直接称为“新时代 Linux”。它需要先证明扩展规则、权限、工具按需加载、版本兼容、回滚、社区维护和效果评估能够长期工作。

## 一、这次到底看了什么

### 1. 证据范围

本轮公开资料读取时间为 2026-08-17（Asia/Shanghai）。上游 DSH 的学习基线仍是提交 `47f943859bef60e4160492346772ded9b24f765a`。

重点核对了 [dshapps/dsh-webpage](https://github.com/dshapps/dsh-webpage/tree/9fb0fff86f59a0a50045319b10116859800fda2e) 及其公开家族仓库；它们的目标 DSH 是 `0.1.0-rc.6`，不是 DeepSeek AI 的官方发行仓库。

GitHub 公开 `topic:dsh-plugin` 检索在本轮只读 API 刷新中返回 `5,905` 个候选仓库；本篇此前记录过 `5,889`、`5,874` 和 `5,827`。这些数字都是不同时间点的检索索引快照，不是插件数量。

这里的 `total_count` 只是 GitHub 搜索索引返回的候选总数；搜索排序、分页上限、主题误标和仓库删除都会影响可见窗口。本篇没有把它等同于“完整插件数据库”，也没有声称已经逐一打开了全部 5,905 个仓库。

结果会混入目录、市场、桌面封装、Skill、MCP、Fork、UI 皮肤和只在描述中提到 DSH 的仓库。查询入口是 [GitHub repository search API](https://api.github.com/search/repositories?q=topic%3Adsh-plugin&per_page=1)。

本轮按 stars 排序的前 30 个结果里甚至出现了 `deepseek-ai/deepseek-harness`、`nexu-io/open-design`、`amruthpillai/reactive-resume`、`volcengine/OpenViking` 和 `walkinglabs/learn-harness-engineering`。这不是说这些项目都属于 DSH 插件，而是实测说明 GitHub topic 是发现入口，不是分类器。

因此，本篇采用“**全量发现，分层核验，重点深读**”的口径：全量记录发现范围，重点项目核对 README、源码树、manifest、测试和安装边界；没有把 5,905 个候选仓库（或此前的 5,889、5,874、5,827 个）都安装到本机，也没有把未运行项目写成已兼容。

这里要把“所有社区插件都看一下”拆成三个不同工作。第一层是全量发现：记录 GitHub 检索窗口、仓库名和自述标签。第二层是分层抽样：选目录、UI、纯客户端 Bundle、Host／工具、审阅工具、Fork 和注入器等代表类型。第三层才是固定提交的源码、manifest、测试、安装、运行和卸载核验。

公开索引可以帮助完成第一层，不能自动完成后两层。若没有把第二、三层也做完，教材只能说“被公开索引到”或“作者自称支持”，不能说“所有插件都兼容”或“社区方案已经安全”。

### 2. 证据等级

| 证据 | 能说明什么 | 不能说明什么 |
| --- | --- | --- |
| GitHub 搜索结果 | 某个仓库被公开索引到 | 它是插件、可安装或安全 |
| README 自述 | 作者声称的目标、安装方式和限制 | 作者的声称已经被独立验证 |
| 固定源码与 manifest | 提交中实际存在的入口、依赖和装配文件 | 目标 DSH 能运行、能卸载或权限安全 |
| 单元、Loader、Web 测试 | 被测环境和路径中的行为 | 所有平台、模型、Profile 和真实用户任务 |
| 真实安装、失败恢复、卸载 | 某个固定环境的生命周期证据 | 对所有版本和所有插件都成立 |

这张表是本篇最重要的阅读规则。建议官方更新时，也应该把“文档声称”“源码事实”“测试结果”和“运行证据”分开展示。

## 二、dsh-webpage 给出的关键启发

### 1. 它不是又一个插件运行时

`dsh-webpage` 的核心判断是：插件仍然负责安装、版本、依赖、信任、启用和生命周期；App 只是插件贡献出来的一个可寻址窗口；Pack 只是已有插件和配置的组合。

它没有把 App 重新定义成第二种插件，也没有建立第二个 Loader 或商店。这一点很重要：社区的 UI 需求可以被吸收，但不必再造一个平行的运行时。

本轮还核对了版本指针：`main` 当前为 `9fb0fff86f59a0a50045319b10116859800fda2e`，带注释的 `v0.2.0` tag（tag 对象为 `4ac228ce…`）最终也指向这个提交。`v0.2.0` 是合同版本标记，不是已经发布到 npm 的包；试用依赖 DSH `0.1.0-rc.6`、Node `^22.19.0 || >=24.0.0` 和根路径 Web UI。

复现时仍应优先固定完整 commit，而不是只写 `main` 或只写 tag。GitHub Actions 的静态、构建和单元检查可以变绿，但更重的真实外部 Profile、浏览器和 HMR gate 仍属于发布级验证，不能把“仓库 CI 通过”写成“所有真实安装路径已通过”。

这给官方的启示是：扩展合同还要同时发布“支持等级”和“验证等级”。`源码可构建`、`打包可安装`、`固定 Profile 可启动`、`浏览器已验证`、`跨版本兼容`应当是不同状态，而不是一个 `works` 标签。

### 2. 它把“侧栏功能”改成了地址空间

它提出 `/apps/<id>/*` 这样的地址。人可以收藏和刷新，Session agent 可以调用 `open_app`，App 自己拥有局部路径；Conversation 仍然挂在原来的 Shell 上。

这个设计回答了社区大量 UI 插件的共同问题：不是每个功能都必须再占一个永久侧栏入口。入口、路由、窗口表面和 App 内部页面可以有清楚的所有权。

### 3. 它把故障限制在窗口内

App body 使用懒加载和错误边界。一个 App 渲染失败时，窗口可以显示崩溃或重试状态，Conversation、Shell 和其他 App 仍然存在。

这不是“所有插件都安全”的承诺。`apply()`、Loader、核心 Bundle 或启动路径上的插件仍可能让 DSH 启动失败；它只把自己拥有的 UI 子树的失败边界写清楚。

### 4. 它把契约变成可执行检查

`dsh-app-check` 把包名、`dsh.client.inject`、Bundle patch、DSH/Cordis 版本、`codeSplitting: false`、导出形状、构建产物和 tarball allowlist 变成 `--lint` / `--pack` 检查。

`dsh-app-template` 再把懒加载、双端清理、Host 服务等待、loopback 路由和测试骨架放进一个可复制的起点。它的价值不是“包一定安全”，而是减少每个作者重新猜契约的机会。

### 5. 它把 Host 和 Window 分开

`dsh-usage-app` 把凭据解析和 Provider 余额请求留在 Host，只把脱敏结果通过本地路由给浏览器；`dsh-gateway` 进一步把管理、登录、凭据、进程和 Playground 分成 Host、App 和 typed remote。

`dsh-notes-app` 则展示了一个没有 Host 的轻量 App：它有地址、面板、未知 ID 状态和浏览器本地持久化，但明确说明数据不同步、不加密。

这几种样本共同说明：UI、Host 能力、凭据、外部进程和持久化不是同一种权限，不能因为它们最后都显示在一个网页里就混成“前端插件”。

### 6. 它也明确写出了不做什么

`dsh-webpage` 的 ADR 明确拒绝把自己变成插件商店、调度器、外部 Origin 代理或 Cordis 的包装运行时；`dsh-automations-app` 甚至把自动化重新表述为“触发器 + Prompt + 权限边界，产生新的 Session”，而不是在 Web App 里偷偷造一个 Cron 系统。

这对官方 DSH 的启发是：好的平台设计不只列出能力，也要把不属于自己的责任写出来。

### dsh-webpage 家族的可复核样本

| 仓库 | 固定 HEAD | 观察到的重点 | 身份 |
| --- | --- | --- | --- |
| [dsh-webpage](https://github.com/dshapps/dsh-webpage/tree/9fb0fff86f59a0a50045319b10116859800fda2e) | `9fb0fff` | App 注册、地址、Outlet、Inspector、失败边界、契约文档 | 社区平台仓库，不是上游官方包 |
| [dsh-app-check](https://github.com/dshapps/dsh-app-check/tree/4fe142547d5575ccb68d4e57783d57ac232a6d1e) | `4fe1425` | `--lint` / `--pack`、精确产物清单、契约版本 | 社区检查器 |
| [dsh-app-template](https://github.com/dshapps/dsh-app-template/tree/e6107f6d78136315474e589fccf493ca1caf5c27) | `e6107f6` | 客户端、Host 半部、懒加载、清理和测试起点 | 社区模板 |
| [dsh-usage-app](https://github.com/dshapps/dsh-usage-app/tree/6d08d6c309f3b0f390b162acc952aa2b1b1d7a05) | `6d08d6c` | 本地 Token 统计、Host 余额、凭据不进浏览器 | 社区应用样本 |
| [dsh-notes-app](https://github.com/dshapps/dsh-notes-app/tree/9068425a9ca4cc180c0e88dea04ce915f16c4487) | `9068425` | 深链接、未知资源、无 Host 本地持久化 | 社区应用样本 |
| [dsh-jobs-app](https://github.com/dshapps/dsh-jobs-app/tree/c9a2c79d54649205076d46c0e7e9a1baa05d3191) | `c9a2c79` | 只读查看 Jobs，不替换官方 Jobs UI | 历史样本，不在常驻 Profile |
| [dsh-automations-app](https://github.com/dshapps/dsh-automations-app/tree/fee7e345d085df23495d7dac0624206494f12b29) | `fee7e34` | 把自动化边界留给可选 Host 和新 Session | 历史样本，不在常驻 Profile |
| [dsh-gateway](https://github.com/dshapps/dsh-gateway/tree/362ab9d4e944c2d488b8bfe89535531278370abf) | `362ab9d` | 外部 CLIProxyAPI、Host 管理、typed remote、秘密不进浏览器 | 社区重型应用样本 |

这些仓库的共同目标并不等于它们已经得到 DSH 官方支持。它们更适合作为需求和契约设计的证据样本。

### 本轮社区能力簇刷新：从“插件名字”归纳真正的需求

为了不把一个会变化的搜索榜单写成静态百科，本轮又按 `topic:dsh-plugin` 的“最近更新”窗口看了一遍公开元数据和项目自述。下面的项目名只证明它们在本轮检索中被索引到，能力描述主要来自仓库简介、README 或项目名。

没有把它们都下载、安装、运行或做安全审计；特别是只看到项目名而没有明确简介时，项目名本身不能证明能力。

| 能力簇 | 本轮出现的代表项目 | 从这些公开自述可以提出的官方问题 | 目前不能据此断言 |
| --- | --- | --- | --- |
| 上下文、记忆与 RAG | [`context-vista`](https://github.com/GooodWei/context-vista)、[`dsh-library`](https://github.com/PerryLink/dsh-library)、[`dsh-fovea`](https://github.com/monotykamary/dsh-fovea)、[`dsh-agent-memory`](https://github.com/Culeot/dsh-agent-memory)、[`dsh-layered-memory`](https://github.com/JunNanLYS/dsh-layered-memory) | 官方是否应公开当前上下文预算、工具描述预算、召回证据、引用和“未命中”事件，让延迟加载和 RAG 能被测量 | 记忆写入了、检索返回了结果，或描述里写了“避免 lost in the middle”，都不等于任务正确率已经提升 |
| 审阅、审批与安全 | [`dsh-auto-review`](https://github.com/PerryLink/dsh-auto-review)、[`dsh-doublecheck`](https://github.com/PerryLink/dsh-doublecheck)、[`dsh-defend`](https://github.com/PerryLink/dsh-defend)、[`dsh-edit-approval`](https://github.com/SiriLee/dsh-edit-approval)、[`dsh-perm-guard`](https://github.com/a903067276-rgb/dsh-perm-guard) | 官方是否应提供 fail-closed 的审批事件、策略结果、人工覆盖、拒绝原因和可回放审计格式 | “第二个模型同意”“检测到了注入”或“有权限插件”不等于安全边界已经成立，也不等于人类不需要审批 |
| 编排、Host 与外部协议 | [`dsh-background-agents`](https://github.com/PerryLink/dsh-background-agents)、[`dsh-subagent-pool`](https://github.com/xiagaogaozi/dsh-subagent-pool)、[`dsh-github`](https://github.com/PerryLink/dsh-github)、[`dsh-acp`](https://github.com/dushaobindoudou/dsh-acp)、[`dsh-gateway`](https://github.com/dshapps/dsh-gateway) | 官方是否应把子 Agent、外部服务、GitHub 写操作和 ACP 等能力声明成可见的 Host capability，并统一等待、取消、重试、审批和清理 | README 说“支持团队”“支持 ACP”或“每次写入需审批”，不等于目标 DSH 版本上已经安装可用、失败可恢复或没有残留进程 |
| 成本、延迟与运行观测 | [`dsh-budget`](https://github.com/PerryLink/dsh-budget)、[`dsh-bill`](https://github.com/Jannchie/dsh-bill)、[`context-vista`](https://github.com/GooodWei/context-vista) | 官方是否应提供每轮／每步的 token、成本、延迟、工具调用、重试和上下文占用事件，并允许按 Profile 导出脱敏数据 | 显示了一个费用数字或上下文环形图，不等于计量口径正确，更不等于性能优化已被实测 |
| UI、远程入口与多模态 | [`dsh-TUI`](https://github.com/ccch1mneyyy/dsh-TUI)、[`dsh-web-ui`](https://github.com/zhu1090093659/dsh-web-ui)、[`dsh-client-ui-custom`](https://github.com/yoli-mi/dsh-client-ui-custom)、[`dsh-chat-tweaks`](https://github.com/haiyoucuv/dsh-chat-tweaks)、[`dsh-mobile-link`](https://github.com/Cheng-xiu/dsh-mobile-link)、[`dsh-vision-router`](https://github.com/ysr666/dsh-vision-router) | 官方是否应提供稳定的 App、Slot、Surface、地址和 Origin 边界，让界面、手机入口和视觉能力不必依赖私有 DOM 或隐式代理 | 能打开一个面板、能发一个远程通知或能调用视觉模型，不等于跨版本兼容、权限最小化或外部 Origin 已被安全隔离 |
| 发现、评分与验证目录 | [`dsh-plugin-scorecard`](https://github.com/863683348/dsh-plugin-scorecard)、[`dsh-lab`](https://github.com/hackerFish/dsh-lab)、[`dsh-recommend`](https://github.com/zp-home/dsh-recommend)、[`dsh-plugin-registry`](https://github.com/majiayu000/dsh-plugin-registry)、[`dsh-plugins-store`](https://github.com/ZASENJC/dsh-plugins-store)、[`awesome-dsh-plugin`](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 官方是否应定义一份可签名或可复核的验证记录：源码 commit、目标 DSH、依赖、权限、测试、安装、卸载、最后验证时间和未知项 | 排名、收录、自动分类或“已验证”字样本身不是官方背书，也不能替代固定版本的真实生命周期证据 |

本轮 `dsh-perm-guard` 的公开搜索结果没有提供足够简介，因此这里只把它作为一个待核验的权限相关项目名，不把它写成已确认的安全实现。其他项目的能力描述同样仍属于公开资料层，想进入“已核对”层必须继续固定 commit、阅读 manifest 和测试，并记录实际安装与卸载结果。

这次刷新反而强化了本篇原来的判断：社区不是缺少想法，而是每个想法都在自己的插件里重新发明**工具目录、权限声明、审批事件、上下文计量、生命周期记录和效果评估**。官方最值得上移的不是某个项目的 UI，而是这些反复出现的公共数据和生命周期契约。

把上表翻译成官方更新顺序，就是：先给工具和 Host 做可见性／权限／来源快照；再给 App、Slot 和外部协议做版本化边界；最后提供统一的评估和验证记录。这样社区项目仍然可以保持独立，官方也能让它们用同一套语言说明“我改变了 Agent loop 的哪一部分、需要什么权限、如何证明没有变坏”。

## 补充：社区样本应该怎样分层

下面不是“最好的插件排行榜”，而是一张研究取样表。项目名称、功能和兼容性首先来自公开仓库的 README 或 GitHub 元数据；“官方启示”是本教材的分析；没有在固定隔离 Profile 中运行的项目，仍然标为未验证。

| 类型 | 代表性公开项目 | 从公开资料能确认的内容 | 对官方 DSH 的启示 | 仍不能确认的内容 |
| --- | --- | --- | --- | --- |
| 目录与市场 | [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)、[dsh-market](https://github.com/dsh-market/dsh-market)、[dsh-find-plugin](https://github.com/awesome-dsh-plugin/dsh-find-plugin) | 提供分类、搜索或安装入口；`awesome-dsh-plugin` 自己明确警告“被收录不是安全审查” | 官方应提供可验证的 manifest、权限和验证记录，而不是把列表徽章当认证 | 每个条目的来源、权限、卸载和跨版本行为 |
| UI 工作台与服务化侧栏 | [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar)、[dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 自述提供侧栏、文件、终端、Git、后台任务、皮肤或第三方注册 API；其中一项明确采用按需加载 | 官方需要稳定的 Slot／Surface／Capability 边界，允许社区做工作台而不争抢同一私有 React 表面 | API 是否长期兼容、每个 Host 能力的权限和卸载残留 |
| 纯客户端 Bundle | [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation)、[dsh-navbar](https://github.com/vlln/dsh-navbar)、[dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | README 自称使用 `dsh.bundle`／客户端入口、零核心改动或纯插件挂载；功能主要是消息、导航或 TUI 表面 | 官方应提供公开的客户端 Slot、锚点和版本化 UI 契约，减少作者依赖 DOM 猜测和私有组件 | 固定 DSH 版本上的真实挂载、升级后回归和卸载完全性 |
| Host、工具与团队编排 | [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams)、[dsh-gateway](https://github.com/dshapps/dsh-gateway) | 自述涉及子 Agent、任务依赖、持久化状态、Host 服务或外部进程；这些能力不只是一个按钮 | manifest 应声明工具数量、状态存储、网络、子进程和凭据边界；工具还应支持按作用域呈现 | 真实任务质量、工具选择率、失败恢复、权限和数据清理 |
| Agent 审阅与策略工具 | [brooks-lint](https://github.com/hyhmrright/brooks-lint) | GitHub 元数据和 README 将其描述为带严重性标签、书目依据和多种分析模式的 AI 代码审阅工具 | “有审阅工具”不等于“审阅正确”；官方应提供固定任务、盲评、误报／漏报和回滚记录格式 | 在不同模型、代码库和任务分布上的真实收益 |
| 运行时注入与热重载 | [dsh-super-injector](https://github.com/yjh051108/dsh-super-injector) | README 自称运行时注入 Host／Client、热重载、清理 junction 和内部路由；源码还需要单独核对其 Loader／registry 触点 | 官方文档应把普通 Bundle、Hook bridge、patched fork 和注入器明确分级，不能统一叫“插件” | 跨版本稳定性、权限扩大、完全卸载、进程 quiescent 和残留清理 |

这张表也解释了为什么不应只按 Star 数量挑“官方推荐插件”。Star 可以反映关注度，却不能替代固定版本、源码、测试、权限和生命周期证据。对官方来说，更有价值的是让每类项目都能提交同一种验证记录。

## 三、从整个社区生态看到的共同问题

### 1. UI 插件正在重复占用同一块表面

导航栏、TUI、底栏、用量面板、归档面板、模型选择器、代码审查工作台和桌面封装都在争夺“用户打开 DSH 后第一眼看到什么”。

这说明 DSH 需要可寻址的 App、命名的 Slot、统一的打开/关闭语义和失败边界，而不是让每个作者都改同一层侧栏或私有 React 组件。

### 2. Host 能力的风险差异远大于名称差异

识图、股票、飞书、GitHub、手机远程、浏览器自动化、外部 CLI、凭据余额和桌面控制，在 README 中都可能被叫作“插件”，但它们涉及的文件、网络、Token、子进程和远程控制权限完全不同。

官方需要让作者声明能力和权限，而不是只让安装者看到一个包名。工具注册也不等于文件、网络、进程或凭据授权。

### 3. “自进化”和“记忆”缺少共同评估协议

社区有长期记忆、技能管理、自我审查、多 Agent、自动化和模型路由项目。它们解决的对象不同，但都容易把“保存了状态”“生成了新 Prompt”或“多跑了一轮”写成效果已经提升。

官方可以提供评估接口和实验记录格式，但不应替每个社区项目声称任务质量已经提高。固定任务、失败样本、成本、延迟和回滚仍然是作者自己的责任。

### 4. 市场和目录解决发现，不解决信任

`dsh-plugin` topic、awesome 列表、registry、市场 UI 和安装器都能降低发现成本；它们不能仅凭列表存在就证明兼容、权限安全、卸载完整或官方背书。

官方应该提供可验证的元数据和验证记录格式，而不是在核心里再造一个“官方商店”，或者给没有可重复方法的项目加一个“已验证”徽章。

### 5. Patch、Fork、Hook bridge 和注入器需要不同的责任归属

普通插件使用公开 Service、Event、Tool 和 Bundle；Hook bridge 翻译外部协议；patched fork 维护一份修改后的源码；注入器则可能触碰 Loader、模块缓存、Fiber、junction 或宿主内部表。

这些方案都可能“让功能出现”，但更新、权限、回滚和卸载的负责人不同。官方文档应该让安装者在第一步就看出这个区别。

## 四、给官方 DSH 的更新建议

下面的优先级不是官方承诺，而是从上述公开需求和固定源码边界推导出的工程顺序。

### P0：先补公共边界和可观测性

| 建议 | 官方应交付什么 | 直接解决的问题 |
| --- | --- | --- |
| 版本化扩展契约 | 每个公开 Service、Event、Tool、Client Slot 和 Hook bridge 都有版本、语义、生命周期、兼容矩阵和弃用流程 | 作者不必靠读取私有实现猜接入点 |
| 四层工具可见性 | 明确区分注册、作用域可解析、模型呈现和执行允许；提供按 agent/Profile 的只读快照 | 工具太多时知道到底哪一层变多了 |
| 来源与生命周期观测 | 记录 source plugin、注册/撤销、当前 Profile、来源版本、失败原因和 disposer 状态；字段脱敏 | 能回答“谁提供、谁覆盖、谁还在生效” |
| 启动安全门 | Bundle patch allowlist、核心 ID 覆盖检查、安装前预检、失败报告、safe mode 和可回滚 Profile | 一个坏插件不应把整个 Web 启动路径变成黑盒 |
| 官方模板与 conformance kit | 最小插件、最小工具、最小 UI、最小 Host、Loader/pack/卸载测试和 CI 示例 | 社区不必重复发明 `apply`、CSS、清理和打包契约 |

这里的“快照”应该是调试和审计能力，不是权限授予。它不能包含完整 Prompt、用户内容、工具参数、凭据或私有文件正文。

本教材当前工作树已经做了一个不调用模型的本地机制实验：同一个 `ToolRuntime` 注册 24 个夹具工具，A 组让 24 个可见，B 组仍注册 24 个但只让 3 个在 agent 作用域可见。

1,000 次复跑中，schema UTF-8 字节数为 `4,524` 对 `533`，`SystemPrompt.assemble()` 的本地准备阶段为 `74,318.4 ns` 对 `45,690.9 ns`。

这只支持“可见集合会改变本地组装输入和准备成本”，不支持“Provider token、首 token、任务质量或所有模型都因此改善”。完整边界见[工具可见集合观测与性能实验](23-工具可见集合观测与性能实验.md)。

### P1：把成熟社区模式变成可选官方契约

| 建议 | 推荐边界 | 不建议的做法 |
| --- | --- | --- |
| 可寻址 UI App | 提供公开的页面/Slot/Surface/History/失败边界契约；允许社区平台作为 out-of-tree 实现 | 把整个 Webpage 方案硬塞进核心，制造第二个 Router 或第二个 Loader |
| Host 能力声明 | manifest 声明所需 Host 服务、网络、文件、子进程和凭据范围；支持可选依赖等待 | 让普通插件通过私有 `Map`、模块缓存或注册表获得隐形权限 |
| typed remote 规范 | 对 Host 到 Window 的闭集 RPC、错误、超时和取消给出约束 | 为每个 App 无限制增加工具和 Remote，继续扩大上下文 |
| Hook bridge 协议 | 固定输入输出、版本、超时、失败和卸载语义，并提供跨版本测试矩阵 | 把外部 shell hook、普通插件和 OS 进程注入统一叫“官方 Hook” |
| 发现元数据 | 提供来源、固定版本、目标 DSH、权限、测试、卸载和最后验证日期字段 | 核心内置一个没有独立验证方法的“官方安全徽章” |

`dsh-webpage` 的价值在于展示这些契约如何组合，而不是要求官方接受它的全部实现。官方可以先认可接口和验证方法，再决定哪些部分进入上游。

### P2：把“Agent 变好了”变成可复核研究

| 研究方向 | 最小可行交付 | 必须保留的边界 |
| --- | --- | --- |
| 工具路由与延迟加载 | 固定任务集、候选工具集、选择正确率、漏选率、恢复率、schema/延迟/成本记录 | 工具数量减少不等于任务质量提高 |
| RAG | Recall@k、Precision@k、nDCG、证据覆盖、无答案拒答、最终正确性和成本 | 召回非空不等于回答有证据 |
| 自修改与记忆 | 版本化候选、固定评估集、holdout、主指标、护栏、人工批准和回滚 | 自动生成改动不等于自动证明收益 |
| 权限与沙箱 | 工具能力声明、审批、文件/网络/子进程隔离和审计日志 | 可见性快照不是操作系统隔离 |

官方可以提供实验接口和事件格式，但不能用一组漂亮的架构图替代任务结果。Agent 仍然是“观察 → 决策 → 动作 → 结果 → 更新状态”的循环，评估闭环必须跟着循环一起交付。

## 五、官方更新的验收门槛

以后任何新增扩展点，至少应该回答下面八个问题：

1. 公开名称、类型和契约版本是什么？
2. 它改变 Agent loop 的观测、上下文、动作、状态、策略还是评估？
3. 谁注册、谁消费、谁拥有退出和清理？
4. 它是否会改变模型可见工具、文件、网络、进程或凭据权限？
5. 启动失败、运行失败、超时、取消、重复安装和卸载如何处理？
6. 哪些结论有源码、单元、Loader、Web、Provider 或模型任务证据？
7. 上游版本升级时，作者得到什么兼容提示和迁移工具？
8. 如何禁用、回滚和确认没有残留？

如果一个设计只能回答“它能让功能出现”，还不能进入稳定的官方扩展契约。能出现是动作层证据，不是生命周期、安全和效果证据。

## 六、官方不应该优先做什么

### 不要先造第二个运行时

用 wrapper 把 Cordis 包成“不会出错的 App Runtime”，会制造新的生命周期、版本和失败面。更好的顺序是类型、模板、检查器和最小运行时能力。

### 不要把市场塞进核心

发现、安装和升级可以由社区目录和市场承担；官方核心提供可验证的 manifest、权限和测试记录格式即可。`Listing` 不等于 `Endorsement`，`Compatible` 也不等于 `Certified`。

### 不要把所有工具默认送给模型

注册工具、Agent 可解析工具、模型原生 schema 和执行允许应当分层。默认 Profile 应有工具预算，复杂工具可以按任务、作用域或路由器渐进呈现。

### 不要把自动修改叫作已经成功的自进化

没有固定任务、holdout、护栏指标和回滚的自修改，更准确的名字是“候选策略生成”或“配置搜索”。这不是贬低功能，而是让效果声明可验证。

## 七、如果要给官方提交一份 RFC，应该怎么写

社区作者可以按下面的顺序写一页 RFC：

1. **问题**：哪一类插件或用户任务被当前公开 API 卡住？
2. **现有 workaround**：是普通插件、Bundle、Hook bridge、fork 还是注入？它的代价是什么？
3. **循环位置**：改变观测、上下文、动作、状态、策略还是评估？
4. **最小 API**：类型、事件、服务、manifest 或 Slot 的最小新增面是什么？
5. **生命周期**：安装、等待、运行、失败、取消、卸载和回滚如何发生？
6. **安全与权限**：文件、网络、子进程、凭据、外部 Origin 和用户内容怎样被限制？
7. **验证**：固定 DSH/Node/pnpm、测试、Loader、Web、Provider、任务质量和未验证项是什么？
8. **不做什么**：明确拒绝的边界是什么，避免提案不断膨胀成第二个运行时。

这套 RFC 格式比“社区已经有很多插件，所以官方应该把它们都合并进来”更适合作为上游讨论材料。

## 八、这篇对读者的学习任务

如果你是第一次接触 DSH，不需要把 5,905 个候选仓库全部打开。完成下面四步就足够理解本篇：

1. 读 `dsh-webpage` 的 README，写下 Plugin、App、Pack、Address 四个词的区别。
2. 读 `dsh-app-template` 的 authoring guide，对照一个普通插件的 `apply(ctx)` 和 App 的客户端/Host 两半。
3. 读[工具可见性与非侵入扩展](22-工具可见性与非侵入扩展.md)，画出注册、解析、呈现、执行四层。
4. 用[五问决策卡](27-工具预算与插件责任决策卡.md)审核一个社区仓库，只写“已核对”和“仍未验证”。

如果你要继续研究社区插件，按照[GitHub 生态检索与插件实战核验](12-GitHub生态检索与插件实战核验.md)记录 owner、commit、manifest、权限、测试、安装、卸载和清理，不要把搜索结果数量当成全量兼容性证明。

## 最终判断

`dsh-webpage` 给出的不是“DSH 应该再加一个插件市场”的答案，而是一个更有价值的方向：让 DSH 的插件模型能够承载可寻址窗口、可验证契约、可观察生命周期和清楚的 Host 边界。

官方下一步最值得做的，是把这些需求中跨项目反复出现的底层边界上移为公共契约；不是把每个社区项目的具体 UI、记忆策略、市场页面或注入方式都收编进核心。

这篇建议可以作为本教材的独立章节。它与[后续研究路线](26-后续研究路线.md)的关系是：26 说明本学习仓库接下来如何取证，33 说明从社区证据可以向 DSH 上游提出什么类型的工程建议。

## 本章来源

- [dsh-webpage 固定提交](https://github.com/dshapps/dsh-webpage/tree/9fb0fff86f59a0a50045319b10116859800fda2e)
- [dsh-webpage README](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/README.md)
- [App Authoring Guide](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/docs/guides/app-authoring.md)
- [dsh-webpage Architecture](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/docs/design/architecture.md)
- [ADR 0006：Webpage 是窗口系统，不是商店](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/docs/adr/0006-webpage-is-a-windowing-system-not-a-store.md)
- [ADR 0007：自动化是触发器到 Agent loop](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/docs/adr/0007-automations-are-trigger-to-agent-loop.md)
- [ADR 0008：契约优先于包装运行时](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/docs/adr/0008-contract-over-wrapper.md)
- [ADR 0009：App 不代理外部 Origin](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/docs/adr/0009-apps-do-not-proxy-foreign-origins.md)
- [dsh-webpage 的领域词汇](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/CONTEXT.md)
- [dsh-app-check 合约检查器](https://github.com/dshapps/dsh-app-check)
- [dsh-app-template 最小 App 模板](https://github.com/dshapps/dsh-app-template)
- [dsh-webpage 当前 README 的 Try it / Write one / Family 说明](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/README.md)
- [dsh-webpage 核心包 manifest](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/packages/webpage/package.json)
- [dsh-webpage CI 工作流](https://github.com/dshapps/dsh-webpage/blob/9fb0fff86f59a0a50045319b10116859800fda2e/.github/workflows/ci.yml)
- [GitHub `dsh-plugin` 主题](https://github.com/topics/dsh-plugin)
- [GitHub `dsh-plugin` 公开检索接口](https://api.github.com/search/repositories?q=topic%3Adsh-plugin&per_page=1)
- [本轮按最近更新读取的 `dsh-plugin` 检索窗口](https://github.com/search?q=topic%3Adsh-plugin&type=repositories&s=updated&o=desc)
- [Awesome DSH Plugin 的收录免责声明与分类](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)
- [DSH better sidebar 服务化侧栏](https://github.com/omdsh-dev/DSH-better-sidebar)
- [dsh-web-ui 插件与皮肤集合](https://github.com/zhu1090093659/dsh-web-ui)
- [dsh-TUI 纯插件挂载自述](https://github.com/ccch1mneyyy/dsh-TUI)
- [dsh-agent-teams 团队工具与状态自述](https://github.com/NanmiCoder/dsh-agent-teams)
- [brooks-lint AI 审阅工具自述](https://github.com/hyhmrright/brooks-lint)
- [dsh-super-injector 固定提交](https://github.com/yjh051108/dsh-super-injector/tree/f4ef59fb31439225abefe45d6e793235a2a9d5e0)
