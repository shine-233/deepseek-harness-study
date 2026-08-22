# 逐文件索引导航

`study/文件索引/` 保存按目录分片的源码索引。当前已有 67 页生成索引，覆盖固定提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 的 2,973 个代码或界面源文件；本 README 是人工导航页，不计入这 67 页，也不增加源文件条目。

每个索引页把真实源文件整理成一张张中文卡片，卡片包含路径、文件角色、用途、设计证据、协作者、测试线索、阅读顺序和固定版本链接。先用本页选择目录，再打开对应索引页中的具体路径；需要理解行为时，回到源码和测试，不要把卡片当成完整代码审查。

## 最短阅读路线

- 第一次接触 DSH：先读 [00-开始这里](../00-开始这里.md)，再读 [01-仓库地图](../01-仓库地图.md) 和 [02-Cordis与插件树](../02-Cordis与插件树.md)。
- 想理解主链路：读 [03-核心文件精读](../03-核心文件精读.md)，然后打开 [packages-core.md](./packages-core.md)、[packages-boot.md](./packages-boot.md)、[packages-bundle.md](./packages-bundle.md)、[packages-session.md](./packages-session.md) 和 [packages-llm.md](./packages-llm.md)。
- 想按文件自己查：先读 [08-逐文件索引怎么读](../08-逐文件索引怎么读.md)，再按下面的目录表选择页面；页面内的固定源码链接是继续阅读的下一跳。
- 想看工具、文件、网络或外部进程：从 [06-LLM与工具执行](../06-LLM与工具执行.md) 出发，再看 [packages-core.md](./packages-core.md)、[packages-llm.md](./packages-llm.md)、[packages-fs.md](./packages-fs.md)、[packages-web.md](./packages-web.md)、[packages-shell.md](./packages-shell.md)、[packages-subprocess.md](./packages-subprocess.md) 和 [packages-sandbox.md](./packages-sandbox.md)。
- 想看宿主、浏览器和测试：从 [07-HostClient示例测试发布](../07-HostClient示例测试发布.md) 出发，再看 [apps.md](./apps.md)、[packages-host.md](./packages-host.md)、[packages-client.md](./packages-client.md)、[packages-examples.md](./packages-examples.md) 和 [packages-test-support.md](./packages-test-support.md)。
- 想研究插件边界：依次看 [10-社区生态与扩展边界](../10-社区生态与扩展边界.md)、[11-如何写一个合规插件](../11-如何写一个合规插件.md)，再按需要查看 [packages-hooks.md](./packages-hooks.md)、[packages-bundle.md](./packages-bundle.md)、[packages-skill.md](./packages-skill.md)、[packages-mcp.md](./packages-mcp.md) 和 [packages-client.md](./packages-client.md)。
- 想写正式工具插件：接着看 [13-官方工具插件完整契约](../13-官方工具插件完整契约.md)，再回到 [packages-core.md](./packages-core.md)、[packages-mcp.md](./packages-mcp.md)、[packages-interaction.md](./packages-interaction.md) 和 [packages-test-support.md](./packages-test-support.md)。
- 想接入外部 Hook：接着看 [14-官方HookBridge与兼容层](../14-官方HookBridge与兼容层.md)，再回到 [packages-hooks.md](./packages-hooks.md)、[packages-host.md](./packages-host.md)、[packages-subprocess.md](./packages-subprocess.md) 和 [packages-interaction.md](./packages-interaction.md)。
- 想发布 Bundle 或 Profile：接着看 [15-BundleProfileLoader与发布安装](../15-BundleProfileLoader与发布安装.md)，再回到 [packages-boot.md](./packages-boot.md)、[packages-bundle.md](./packages-bundle.md)、[packages-host.md](./packages-host.md) 和 [scripts.md](./scripts.md)。
- 想验证安装和卸载：最后看 [19-插件测试卸载与版本证据](../19-插件测试卸载与版本证据.md)，再回到 [packages-test-support.md](./packages-test-support.md)、[packages-bundle.md](./packages-bundle.md)、[packages-hooks.md](./packages-hooks.md) 和 [apps.md](./apps.md)。
- 想按步骤完成第一次练习：看 [16-学习工作簿与首个实验](../16-学习工作簿与首个实验.md)，再回到本页搜索目标文件。
- 想核对教材边界：看 [17-完成度审计与证据矩阵](../17-完成度审计与证据矩阵.md)；想更新上游版本：看 [18-维护、更新与版本迁移](../18-维护更新与版本迁移.md)。

## 导读与索引怎样互相跳转

导读负责解释概念、主链路和阅读顺序，索引负责告诉你“具体文件在哪一页”。从导读跳到索引时，先找导读中的主题，再使用下表的相对链接；从索引回到导读时，回到同级的本导航页，或在仓库路径栏从 `study/文件索引/` 返回 `study/`，再打开对应的导读链接。

现有索引页主要由生成器维护，不能假定每一页都带有手写的导读回链；本页提供统一的回程入口。生成页中的“阅读顺序”如果已经给出 [03-核心文件精读](../03-核心文件精读.md) 等链接，可以直接使用；没有回链的页面按本段路径返回即可。

- [00-开始这里](../00-开始这里.md)：总入口先解释基本名词和阅读方法，接着进入 [01-仓库地图](../01-仓库地图.md) 或 [08-逐文件索引怎么读](../08-逐文件索引怎么读.md)，再从目录表打开任意索引页。
- [01-仓库地图](../01-仓库地图.md)：按顶层目录找 [apps.md](./apps.md)、[examples.md](./examples.md)、[native.md](./native.md)、[python.md](./python.md)、[scripts.md](./scripts.md)、[vendor.md](./vendor.md) 和 [website.md](./website.md)；要进入具体包则转到下面的 `packages-*` 页面。
- [02-Cordis与插件树](../02-Cordis与插件树.md)：理解 Context、Fiber、Service、Event、Profile 和 Bundle 后，转到 [packages-core.md](./packages-core.md)、[packages-boot.md](./packages-boot.md)、[packages-bundle.md](./packages-bundle.md)、[packages-context.md](./packages-context.md)、[packages-host.md](./packages-host.md) 和 [vendor.md](./vendor.md)。
- [03-核心文件精读](../03-核心文件精读.md)：精读列表中的 Cordis、启动、Bundle、Session、Agent、工具、LLM 和 CLI 文件，分别可在 [packages-boot.md](./packages-boot.md)、[packages-bundle.md](./packages-bundle.md)、[packages-core.md](./packages-core.md)、[packages-llm.md](./packages-llm.md) 和 [apps.md](./apps.md) 中按路径定位。
- [04-Agent与Turn流程](../04-Agent与Turn流程.md)：从 Turn、Step、Agent Loop、工具调用和取消失败跳到 [packages-core.md](./packages-core.md)、[packages-session.md](./packages-session.md)、[packages-llm.md](./packages-llm.md)、[packages-plan.md](./packages-plan.md)、[packages-goal.md](./packages-goal.md) 和 [packages-interaction.md](./packages-interaction.md)。
- [05-Session日志与恢复](../05-Session日志与恢复.md)：从 Session 事件和恢复流程跳到 [packages-core.md](./packages-core.md)、[packages-session.md](./packages-session.md)、[packages-session-query.md](./packages-session-query.md)、[packages-storage.md](./packages-storage.md)、[packages-spill.md](./packages-spill.md) 和 [packages-settings.md](./packages-settings.md)。
- [06-LLM与工具执行](../06-LLM与工具执行.md)：从模型适配、流式响应、工具 schema 和结果展示跳到 [packages-llm.md](./packages-llm.md)、[packages-core.md](./packages-core.md)、[packages-web.md](./packages-web.md)、[packages-shell.md](./packages-shell.md)、[packages-fs.md](./packages-fs.md)、[packages-subprocess.md](./packages-subprocess.md) 和 [packages-sandbox.md](./packages-sandbox.md)。
- [07-HostClient示例测试发布](../07-HostClient示例测试发布.md)：从 Host、Client、示例、测试和发布边界跳到 [apps.md](./apps.md)、[packages-host.md](./packages-host.md)、[packages-client.md](./packages-client.md)、[packages-examples.md](./packages-examples.md)、[packages-test-support.md](./packages-test-support.md)、[packages-sdk.md](./packages-sdk.md)、[packages-bundle.md](./packages-bundle.md) 和 [vendor.md](./vendor.md)。
- [08-逐文件索引怎么读](../08-逐文件索引怎么读.md)：这是索引的使用说明，定义卡片字段、自动索引与人工精读的区别、覆盖检查方法和继续追代码的顺序；读完后可从下表进入全部 66 页。
- [09-业界案例与写法](../09-业界案例与写法.md)：它讨论固定版本源码导读的写法和证据边界，适合回到 [08-逐文件索引怎么读](../08-逐文件索引怎么读.md) 查看索引规则，再看 [03-核心文件精读](../03-核心文件精读.md)、[10-社区生态与扩展边界](../10-社区生态与扩展边界.md) 和 [11-如何写一个合规插件](../11-如何写一个合规插件.md)。
- [10-社区生态与扩展边界](../10-社区生态与扩展边界.md)：按公开扩展点、Bundle、Hook bridge、Skill、MCP 和运行时注入的区别，转到 [packages-core.md](./packages-core.md)、[packages-bundle.md](./packages-bundle.md)、[packages-hooks.md](./packages-hooks.md)、[packages-skill.md](./packages-skill.md)、[packages-mcp.md](./packages-mcp.md)、[packages-host.md](./packages-host.md) 和 [packages-client.md](./packages-client.md)。
- [11-如何写一个合规插件](../11-如何写一个合规插件.md)：按公开事件、工具、服务、Bundle、Profile 和卸载测试的顺序，转到 [packages-core.md](./packages-core.md)、[packages-bundle.md](./packages-bundle.md)、[packages-hooks.md](./packages-hooks.md)、[packages-host.md](./packages-host.md)、[packages-client.md](./packages-client.md) 和 [packages-test-support.md](./packages-test-support.md)。
- [12-GitHub生态检索与插件实战核验](../12-GitHub生态检索与插件实战核验.md)：先回看 [08-逐文件索引怎么读](../08-逐文件索引怎么读.md) 的覆盖定义，再按目录表选页；若要理解生成、验证和发布门禁，可打开 [scripts.md](./scripts.md)、[packages-bundle.md](./packages-bundle.md)、[packages-hooks.md](./packages-hooks.md)、[packages-skill.md](./packages-skill.md) 和 [packages-mcp.md](./packages-mcp.md)。
- [13-官方工具插件完整契约](../13-官方工具插件完整契约.md)：按工具流水线、呈现模式、可见性、并发、取消和结果事件追到 [packages-core.md](./packages-core.md)、[packages-mcp.md](./packages-mcp.md)、[packages-interaction.md](./packages-interaction.md) 和 [packages-test-support.md](./packages-test-support.md)。
- [14-官方HookBridge与兼容层](../14-官方HookBridge与兼容层.md)：按协议解析、Decision 映射、detached run 和 dispose 追到 [packages-hooks.md](./packages-hooks.md)、[packages-host.md](./packages-host.md)、[packages-subprocess.md](./packages-subprocess.md) 和 [packages-interaction.md](./packages-interaction.md)。
- [15-BundleProfileLoader与发布安装](../15-BundleProfileLoader与发布安装.md)：按 manifest、patch、Profile、Loader、模块解析和 HMR 追到 [packages-boot.md](./packages-boot.md)、[packages-bundle.md](./packages-bundle.md)、[packages-host.md](./packages-host.md) 和 [scripts.md](./scripts.md)。
- [16-学习工作簿与首个实验](../16-学习工作簿与首个实验.md)：把索引卡片、固定源码、测试和最小插件实验串成一条可记录的路线。
- [17-完成度审计与证据矩阵](../17-完成度审计与证据矩阵.md)：查看 2,973 条覆盖、质量审计提示、模板复用统计和运行时未验证边界。
- [18-维护、更新与版本迁移](../18-维护更新与版本迁移.md)：需要切换上游 commit 时，按完整源码、重生成、复核和清理顺序操作。
- [19-插件测试卸载与版本证据](../19-插件测试卸载与版本证据.md)：按单元、Context、Loader、构建产物、快照、E2E、真实 API 和资源清理追到 [packages-test-support.md](./packages-test-support.md)、[packages-bundle.md](./packages-bundle.md)、[packages-hooks.md](./packages-hooks.md) 和 [apps.md](./apps.md)。
- [20-学习仓库实际使用手册](../20-学习仓库实际使用手册.md)：按阅读目标、逐文件追踪、插件开发、社区审核、固定源码和文档门禁选择索引页与下一步实验。

## 66 页索引清单

括号内是当前索引页页头声明的源文件条数。页面名和覆盖路径不是一一按文件名直译的规则：`packages-foo.md` 覆盖 `packages/foo/`，而 `vitest-*.md` 和 `tsdown.config.ts.md` 覆盖仓库根部对应的单个配置文件。

## 顶层目录、应用和工具

| 索引页 | 覆盖目录或文件 | 这页用来找什么 |
| --- | --- | --- |
| [.agents.md](./.agents.md)（1 条） | `.agents/` | Agent 工作流、技能和自动化脚本的源文件；适合先了解仓库给 Agent 使用的辅助层。 |
| [.github.md](./.github.md)（2 条） | `.github/` | GitHub 规则、issue 管理和仓库自动化；适合查协作门禁与平台脚本。 |
| [apps.md](./apps.md)（107 条） | `apps/` | 可运行的 CLI、Web 和宿主入口及其测试；适合从产品入口追到包组合。 |
| [examples.md](./examples.md)（63 条） | `examples/` | 根目录下可运行的 Cordis/DSH 示例；适合用最小组合理解 Profile、Bundle 和宿主。 |
| [native.md](./native.md)（16 条） | `native/` | 原生扩展和 Landlock 运行器；适合查操作系统能力、预编译 launcher 和 TypeScript 边界。 |
| [python.md](./python.md)（14 条） | `python/` | Python SDK 与随附运行时；适合查 Python 调用方和跨语言打包入口。 |
| [scripts.md](./scripts.md)（147 条） | `scripts/` | 构建、生成、检查、发布和文档门禁脚本；适合查“仓库怎样验证自己”，不把它当成产品运行时。 |
| [vendor.md](./vendor.md)（35 条） | `vendor/` | 固定引入的上游 Cordis 与其他 vendored 源码；适合查第三方运行时、许可证和同步边界。 |
| [website.md](./website.md)（2 条） | `website/` | VitePress 网站的入口和配置；适合查哪些学习材料会被投影到文档站。 |
| [tsdown.config.ts.md](./tsdown.config.ts.md)（1 条） | `tsdown.config.ts` | 根部打包配置；适合查构建入口、输出产物和工具链选项。 |
| [vitest.config.ts.md](./vitest.config.ts.md)（1 条） | `vitest.config.ts` | 根部 Vitest 配置；适合查默认测试环境和测试文件如何被收集。 |
| [vitest.e2e.config.ts.md](./vitest.e2e.config.ts.md)（1 条） | `vitest.e2e.config.ts` | E2E 测试配置；适合查进程、网络或构建产物测试采用的入口。 |
| [vitest.shared.ts.md](./vitest.shared.ts.md)（1 条） | `vitest.shared.ts` | 多套 Vitest 配置共享的设置；适合查测试环境之间共用的基础规则。 |
| [vitest.snapshot.config.ts.md](./vitest.snapshot.config.ts.md)（1 条） | `vitest.snapshot.config.ts` | 快照测试配置；适合查 CLI、协议或 UI 快照使用的测试组合。 |
| [vitest.web-stress.config.ts.md](./vitest.web-stress.config.ts.md)（1 条） | `vitest.web-stress.config.ts` | Web 压力测试配置；适合查浏览器侧压力场景如何被单独选择。 |
| [vitest.web.config.ts.md](./vitest.web.config.ts.md)（1 条） | `vitest.web.config.ts` | Web 测试配置；适合查 jsdom、浏览器组合和 Web 测试入口。 |
| [vitest.web.perf.config.ts.md](./vitest.web.perf.config.ts.md)（1 条） | `vitest.web.perf.config.ts` | Web 性能测试配置；适合查性能场景与普通 Web 测试的分开方式。 |

## packages 功能组

| 索引页 | 覆盖目录 | 这页用来找什么 |
| --- | --- | --- |
| [packages-acp.md](./packages-acp.md)（11 条） | `packages/acp/` | Automation-only ACP 服务、协议编解码和进程外 Agent 接口。 |
| [packages-api.md](./packages-api.md)（16 条） | `packages/api/` | API 网关、远程入口和 Typert RPC 组装；适合查服务端公开边界。 |
| [packages-attachment.md](./packages-attachment.md)（12 条） | `packages/attachment/` | 本地附件和图像处理；适合查格式、尺寸、像素限制和存储前的校验。 |
| [packages-boot.md](./packages-boot.md)（13 条） | `packages/boot/` | 启动 glue、命令行装配、Profile 读取和启动生命周期。 |
| [packages-bundle.md](./packages-bundle.md)（14 条） | `packages/bundle/` | Base、headless、Web 等可安装 Bundle；适合查插件树怎样被组合。 |
| [packages-client.md](./packages-client.md)（892 条） | `packages/client/` | 浏览器运行时、React/UI 组件、会话界面、工具卡片和客户端连接；这是最大的界面索引页。 |
| [packages-code-runtime.md](./packages-code-runtime.md)（19 条） | `packages/code-runtime/` | Worker 中的代码执行、日志捕获和结果预算；适合查用户代码如何被隔离运行。 |
| [packages-compaction.md](./packages-compaction.md)（31 条） | `packages/compaction/` | Session 上下文压缩、compact 命令和压缩服务。 |
| [packages-context.md](./packages-context.md)（29 条） | `packages/context/` | 请求上下文、Agent instructions、时间等上下文提供器。 |
| [packages-core.md](./packages-core.md)（109 条） | `packages/core/` | DSH 核心主链路：Session、System Prompt、Agent、Agent Loop、Tools 和作用域。 |
| [packages-credentials.md](./packages-credentials.md)（12 条） | `packages/credentials/` | 凭据引用、环境变量和本地 `.env` 提供器；适合查密钥如何进入运行时。 |
| [packages-e2b.md](./packages-e2b.md)（16 条） | `packages/e2b/` | E2B 沙箱、文件系统和子进程适配器；适合查外部沙箱集成。 |
| [packages-examples.md](./packages-examples.md)（18 条） | `packages/examples/` | 包内 ACP、JSON-RPC 和其他 demo Bundle；适合查发布包级别的最小示例。 |
| [packages-extensions.md](./packages-extensions.md)（64 条） | `packages/extensions/` | Cordis 客户端运行器和扩展接入代码；适合查插件怎样把能力投影到浏览器侧。 |
| [packages-feedback.md](./packages-feedback.md)（12 条） | `packages/feedback/` | 用户反馈命令和反馈相关服务；适合查反馈从交互入口进入运行时的路径。 |
| [packages-fs.md](./packages-fs.md)（57 条） | `packages/fs/` | 文件系统能力、本地实现、策略和文件工具；适合查路径与读写权限。 |
| [packages-goal.md](./packages-goal.md)（26 条） | `packages/goal/` | Goal 命令、目标轮次和目标驱动逻辑。 |
| [packages-guard.md](./packages-guard.md)（6 条） | `packages/guard/` | 循环卫生、重复工具提醒和工具超时保护。 |
| [packages-hooks.md](./packages-hooks.md)（35 条） | `packages/hooks/` | Claude Code/Codex hook bridge 与共享 wire protocol；适合区分协议库和真正的插件。 |
| [packages-host.md](./packages-host.md)（101 条） | `packages/host/` | Node 侧宿主、API 代理、Web Server、运行时装配和持久化连接。 |
| [packages-identity.md](./packages-identity.md)（4 条） | `packages/identity/` | 匿名用户身份和本地身份标识。 |
| [packages-interaction.md](./packages-interaction.md)（26 条） | `packages/interaction/` | 审批、权限、命令、ask-user 和人机交互类型。 |
| [packages-jobs.md](./packages-jobs.md)（13 条） | `packages/jobs/` | 后台任务定义与本地任务提供器。 |
| [packages-llm.md](./packages-llm.md)（88 条） | `packages/llm/` | LLM 服务定义、流式组装、DeepSeek 适配器、失败处理和 token 统计。 |
| [packages-lsp.md](./packages-lsp.md)（32 条） | `packages/lsp/` | Language Server Protocol 的 stdio 连接和编辑器协议适配。 |
| [packages-mcp.md](./packages-mcp.md)（11 条） | `packages/mcp/` | MCP 客户端、连接、消息传输和外部 MCP 服务接入。 |
| [packages-plan.md](./packages-plan.md)（8 条） | `packages/plan/` | Plan mode 的记录状态、客户端交互和计划展示。 |
| [packages-preset.md](./packages-preset.md)（25 条） | `packages/preset/` | Agent preset 的发现、创作、元数据和 Profile 组合入口。 |
| [packages-runtime-diagnostics.md](./packages-runtime-diagnostics.md)（3 条） | `packages/runtime-diagnostics/` | 运行时不变量和诊断导出；适合查系统如何报告装配错误。 |
| [packages-sandbox.md](./packages-sandbox.md)（50 条） | `packages/sandbox/` | 沙箱能力、策略和本地实现；适合查文件、命令和平台隔离的提供器。 |
| [packages-schedule.md](./packages-schedule.md)（16 条） | `packages/schedule/` | 定时任务的领域模型、调度和持久化相关代码。 |
| [packages-sdk.md](./packages-sdk.md)（21 条） | `packages/sdk/` | JSON-RPC 协议、服务端和 TypeScript 客户端 SDK。 |
| [packages-session-query.md](./packages-session-query.md)（48 条） | `packages/session-query/` | Session 查询、日志导出、搜索和面向客户端的历史读取。 |
| [packages-session.md](./packages-session.md)（78 条） | `packages/session/` | Durable Session 数据、JSONL/SQLite 持久化、投影、标题、checkpoint 和 telemetry。 |
| [packages-settings.md](./packages-settings.md)（16 条） | `packages/settings/` | 用户设置能力和文件提供器。 |
| [packages-shell.md](./packages-shell.md)（48 条） | `packages/shell/` | Bash、PowerShell 和本地 Shell 能力；适合查命令执行接口与提供器。 |
| [packages-skill.md](./packages-skill.md)（13 条） | `packages/skill/` | Skill provider registry、本地加载器、catalog 和 loader tool。 |
| [packages-spill.md](./packages-spill.md)（12 条） | `packages/spill/` | 大对象溢写和本地 spill 存储；适合查内存数据何时转到临时存储。 |
| [packages-storage.md](./packages-storage.md)（28 条） | `packages/storage/` | Storage 领域模型、JSON/SQLite 等存储实现和统一读写语义。 |
| [packages-subagent.md](./packages-subagent.md)（90 条） | `packages/subagent/` | 子 Agent 服务、委派、提供器、客户端和 ACP 连接。 |
| [packages-subprocess.md](./packages-subprocess.md)（17 条） | `packages/subprocess/` | 子进程能力、本地进程树和 spawn 辅助脚本。 |
| [packages-terminal.md](./packages-terminal.md)（20 条） | `packages/terminal/` | 持久终端会话、Shell 配置和终端生命周期。 |
| [packages-test-support.md](./packages-test-support.md)（47 条） | `packages/test-support/` | 快照 harness、测试夹具和共享测试环境；适合判断测试实际组装了什么。 |
| [packages-todo.md](./packages-todo.md)（9 条） | `packages/todo/` | todo_write 工具和客户端投影。 |
| [packages-typert.md](./packages-typert.md)（44 条） | `packages/typert/` | 类型图分析、代码生成、loader 和运行时 registry。 |
| [packages-util.md](./packages-util.md)（21 条） | `packages/util/` | 零依赖共享工具，例如原子写入、路径、超时和通用类型。 |
| [packages-web.md](./packages-web.md)（38 条） | `packages/web/` | Web 搜索、抓取和工具消费者；适合查网络能力的服务与结果处理。 |
| [packages-workflow.md](./packages-workflow.md)（34 条） | `packages/workflow/` | Workflow 能力、worker-thread 提供器和 workflow tool consumer。 |
| [packages-workspace.md](./packages-workspace.md)（8 条） | `packages/workspace/` | Workspace 实体、路径和约束；适合查文件、Session 与工作区怎样共享语义。 |

## 自动索引和人工精读的边界

自动索引由 [generate-source-index.mjs](../../study-tools/generate-source-index.mjs) 根据固定提交的 Git tree 生成，目标是做到“每个纳入白名单的代码或界面源文件都有一条可追踪记录”。它适合做目录导航、按路径搜索、查看静态 import 和测试线索、回到固定版本源码，以及发现下一跳。

自动索引不等于人工精读。卡片中的用途、角色、设计原因和测试关系是静态定位证据，不能替代逐函数语义阅读，也不能单独证明异常路径、并发、权限、卸载、构建产物、浏览器流程、真实 API 或生产环境行为。

人工精读集中在主链路和需要解释的边界。[03-核心文件精读](../03-核心文件精读.md) 覆盖 Cordis、Profile、Bundle、Session、Agent、Agent Loop、Tools、LLM 和 CLI；[04-Agent与Turn流程](../04-Agent与Turn流程.md) 到 [07-HostClient示例测试发布](../07-HostClient示例测试发布.md) 继续解释运行时流程、恢复、工具执行、Host/Client、示例、测试和发布；[10-社区生态与扩展边界](../10-社区生态与扩展边界.md) 到 [12-GitHub生态检索与插件实战核验](../12-GitHub生态检索与插件实战核验.md) 解释扩展身份和外部证据；[13-官方工具插件完整契约](../13-官方工具插件完整契约.md) 到 [20-学习仓库实际使用手册](../20-学习仓库实际使用手册.md) 继续解释工具契约、Hook bridge、Bundle/Profile/Loader、测试卸载和实际使用路线。

覆盖检查只能证明清单、索引条目、相对目录分片和固定源码链接彼此对应；即使检查通过，也不能把它写成“全部源码已经读懂”或“DSH 已经运行验证”。需要做行为结论时，先沿索引卡片的“直接协作者”和“对应测试”回到源码，再选择单元、组合、E2E、浏览器或真实 API 层级的证据。

## 维护时怎样使用本页

本页是手写导航，生成器只负责现有索引卡片和清单；新增目录、拆分页或固定版本变化后，应重新核对本页的页面名、覆盖路径和条目数。不要把单个文件的详细用途复制到本页，也不要用本页的目录描述替代索引页中的固定源码证据。

阅读顺序可以记成一条线：[导读总入口](../00-开始这里.md) → [仓库地图](../01-仓库地图.md) → [索引读法](../08-逐文件索引怎么读.md) → 本页选择索引页 → 索引卡片的固定源码链接 → 对应源码和测试。
