# DSH 源码学习仓库

[![Study material quality](https://github.com/shine-233/deepseek-harness-study/actions/workflows/study-quality.yml/badge.svg)](https://github.com/shine-233/deepseek-harness-study/actions/workflows/study-quality.yml) [![Deploy documentation](https://github.com/shine-233/deepseek-harness-study/actions/workflows/docs-pages.yml/badge.svg)](https://github.com/shine-233/deepseek-harness-study/actions/workflows/docs-pages.yml)

这是 [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness) 的社区学习型 fork：把官方 DSH 固定在提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`（根包 `0.1.1-rc.2`），为 2,973 个源文件提供中文逐文件导读，并配套三十四个可动手的确定性实验。它不属于 DeepSeek AI，不代表官方立场；"官方"在本文中只指上游来源，不表示本仓库获得授权。中文镜像：[README.zh.md](README.zh.md)。

## 三条入口

第一次来不需要下载源码、配置 API key、安装 pnpm 或先会 TypeScript——普通 GitHub 网页就能完成第一轮。

1. [开始学习入口 START-HERE.md](START-HERE.md)：按你的目标告诉你下一步点哪一篇。
2. [15 分钟动手任务单](study/25-从首页到第一次产出的动手任务单.md)：不想选路线就照着做，最后留下一条带源码证据的学习记录。
3. [最小插件示例与学习检查](study/28-最小插件示例与学习检查.md)：想动手时先跑示例的单元测试和 lint。

发现文档事实错误、链接问题、教程无法复现或社区扩展风险时，请使用[按类型填写的 Issue 表单](https://github.com/shine-233/deepseek-harness-study/issues/new/choose)；不要提交密钥、Cookie 或私有运行日志。

## 三十四个可以动手的实验

这套教材要求每个关键结论都能落到一个确定性实验里：实验全部离线运行——固定输入、固定输出、独立 oracle、公开 canProve/cannotProve；它们是教学模型，不启动真实 DSH、provider 或模型。完整清单见[实验室总览](https://shine-233.github.io/deepseek-harness-study/study-labs.html)。

| 实验 | 回答什么问题 |
| --- | --- |
| [Turn 流程与日志对应](https://shine-233.github.io/deepseek-harness-study/turn-flow-lab.html) | 一次 Turn 怎样从输入走到 Session 日志；步进滑杆能停在任意一步；输入写进 URL hash，刷新不丢 |
| [包依赖图证据](https://shine-233.github.io/deepseek-harness-study/package-graph-lab.html) | 227 个包、50 个组的依赖形状；含可选的 3D 组体量场景（带 2D 表格回退） |
| [Profile 解析顺序](https://shine-233.github.io/deepseek-harness-study/profile-loader-lab.html) | Bundle 声明顺序怎样决定最终装配出的配置 |
| [Session 日志重放](https://shine-233.github.io/deepseek-harness-study/session-log-lab.html) | 为什么模型可见内容必须能从事件日志重建 |
| [LLM 流式拼装](https://shine-233.github.io/deepseek-harness-study/llm-stream-lab.html) | chunk 按到达顺序怎样拼成一条消息；finish 之后的迟到重复块为什么必须丢弃 |
| [提示词装配与缓存边界](https://shine-233.github.io/deepseek-harness-study/prompt-assembly-lab.html) | 系统提示词按 order 升序装配后，变化点之前的前缀为什么照旧命中缓存 |
| [文件编辑管线](https://shine-233.github.io/deepseek-harness-study/fs-edit-lab.html) | str_replace_editor 的唯一匹配替换、多义行号拒绝与沙箱写入执法 |
| [Web 工具管线](https://shine-233.github.io/deepseek-harness-study/web-tool-lab.html) | HTML→GFM 的深度守卫、有效截断脚注，以及搜索多查询的轮转合并去重 |
| [工具可见性三层集合](https://shine-233.github.io/deepseek-harness-study/tool-visibility-lab.html) | "已注册、模型可见、执行允许"为什么是三件事 |
| [Code Mode 权限管线](https://shine-233.github.io/deepseek-harness-study/code-mode-evidence-lab.html) | Code Mode 子调用为什么仍要经过完整权限管线 |
| [上下文压缩](https://shine-233.github.io/deepseek-harness-study/compaction-lab.html) | 压缩前后各保留什么、丢什么、oracle 怎样核对 |
| [插件订阅与日志](https://shine-233.github.io/deepseek-harness-study/plugin-flow-lab.html) | 订阅、策略拒绝和卸载怎样影响一个观察插件；插件动作与 Session 日志为什么是两回事 |
| [Hook 瀑布短路](https://shine-233.github.io/deepseek-harness-study/hook-flow-lab.html) | 瀑布监听器直接 return 而不调用 next 会怎样；被跳过的兜底和最终结果的作者 |
| [审批流](https://shine-233.github.io/deepseek-harness-study/approval-flow-lab.html) | ask 的完整生命周期；没有应答者时怎样退化为拒绝、allow 的授权范围有多大 |
| [Session fork 与修复](https://shine-233.github.io/deepseek-harness-study/session-fork-lab.html) | fork 怎样继承父日志前缀；崩溃后的 interrupted 修复为什么记为 unknown 而不是成功 |
| [subagent 委派](https://shine-233.github.io/deepseek-harness-study/subagent-delegate-lab.html) | 深度上限如何在边界拦下委派；子工作的回报结算与父子泳道隔离 |
| [循环卫生](https://shine-233.github.io/deepseek-harness-study/guard-loop-lab.html) | 重复调用的阈值拦截；为什么后置结算撤不回 guard 的拒绝、执行账目如何保持平衡 |
| [Shell 解析缝隙](https://shine-233.github.io/deepseek-harness-study/shell-seam-lab.html) | resolve(request) 怎样补默认、封顶、盖沙箱章；run/start 为什么只收 Spec |
| [凭据解析](https://shine-233.github.io/deepseek-harness-study/credential-lab.html) | 没有 Provider 能供应凭据引用时，fail-closed 怎样在解析处拒绝 |
| [文件设置热发布](https://shine-233.github.io/deepseek-harness-study/settings-lab.html) | 另一个进程改了 settings.yaml 后，本进程靠 fs 监听器走同一条热发布路径 |
| [后台任务生命周期](https://shine-233.github.io/deepseek-harness-study/jobs-lab.html) | kill 的两种返回、先到先得的结算、reported 认领与通知抑制 |
| [定时与工作流编排](https://shine-233.github.io/deepseek-harness-study/orchestration-lab.html) | 三种定时触发器的追投语义，工作流 agent 按 seq 配对与有界宽限强结算 |
| [工作流节点折叠](https://shine-233.github.io/deepseek-harness-study/workflow-node-lab.html) | 四条持久记录折成一个聊天节点；合法前缀与 interrupted 呈现，工具卡不变 |
| [客户端三面镜](https://shine-233.github.io/deepseek-harness-study/client-lab.html) | ui-tool 卡片状态机、ui-conversation 折叠引擎、ui-user-questions 提问接管 |
| [Web 提供者矩阵](https://shine-233.github.io/deepseek-harness-study/provider-lab.html) | 同一缝隙三种搜索实现的归一化对照；选择策略的六情形错误码表 |
| [Trajectory 投影](https://shine-233.github.io/deepseek-harness-study/trajectory-lab.html) | 事件流怎样按呈现契约折叠成用户气泡与三种工具卡（generic/terminal/diff） |
| [技能目录渐进加载](https://shine-233.github.io/deepseek-harness-study/skill-catalog-lab.html) | 摘要信封、digest 驱动的替换退役，以及 skill 工具的三种结局 |
| [计划栈](https://shine-233.github.io/deepseek-harness-study/plan-stack-lab.html) | Todo 整表替换、Plan 状态机与 Goal 生命周期怎样落在同一份日志上 |
| [Worker 协议](https://shine-233.github.io/deepseek-harness-study/worker-protocol-lab.html) | workflow 子任务的阶段推进、取消语义与日志边界 |
| [溢出转储](https://shine-233.github.io/deepseek-harness-study/spill-lab.html) | 超过 maxInlineBytes 的结果全文进工件，模型拿到预算内的预览加定位符 |
| [终端会话](https://shine-233.github.io/deepseek-harness-study/terminal-lab.html) | 持久会话的状态延续与一次性模式对比，单发送位与进程树停稳 |
| [MCP 客户端](https://shine-233.github.io/deepseek-harness-study/mcp-lab.html) | 外部服务器工具以限定名进场；指数退避重连，卸载释放命名空间 |
| [自我修改](https://shine-233.github.io/deepseek-harness-study/selfmod-lab.html) | define/run/stop/undefine 给自己装插件；坏定义 fail loud，动态工具同一条权限管线 |
| [研究 ↔ Debug 离线桥](https://shine-233.github.io/deepseek-harness-study/research-debug-bridge.html) | 课程网站与独立 Debug 工具怎样用显式文件交接 |

## 课程地图

| 阶段 | 课程 |
| --- | --- |
| 认识 DSH | [00 从零开始](study/00-开始这里.md) · [01 仓库地图](study/01-仓库地图.md) · [02 Cordis 与插件树](study/02-Cordis与插件树.md) · [25 动手任务单](study/25-从首页到第一次产出的动手任务单.md) · [27 工具预算决策卡](study/27-工具预算与插件责任决策卡.md) |
| 主链路精读 | [03 核心文件](study/03-核心文件精读.md) · [04 Agent 与 Turn](study/04-Agent与Turn流程.md) · [05 Session 日志与恢复](study/05-Session日志与恢复.md) · [06 LLM 与工具执行](study/06-LLM与工具执行.md) · [07 Host/Client/测试发布](study/07-HostClient示例测试发布.md) |
| 插件与生态 | [10 扩展边界](study/10-社区生态与扩展边界.md) · [11 写合规插件](study/11-如何写一个合规插件.md) · [12 生态检索核验](study/12-GitHub生态检索与插件实战核验.md) · [13 工具插件契约](study/13-官方工具插件完整契约.md) · [14 Hook Bridge](study/14-官方HookBridge与兼容层.md) · [15 Bundle/Loader](study/15-BundleProfileLoader与发布安装.md) · [22 工具可见性](study/22-工具可见性与非侵入扩展.md) · [35 最小插件工作台](study/35-最小插件工作台.md) |
| 实验与治理 | [16 工作簿](study/16-学习工作簿与首个实验.md) · [19 测试卸载证据](study/19-插件测试卸载与版本证据.md) · [21 网页/Codespaces 路线](study/21-GitHub网页与Codespaces学习路线.md) · [29 质量检查与审阅](study/29-学习仓库的质量检查与审阅.md) · [30 安全告警与发布维护](study/30-安全告警与网页发布维护.md) · [31 学习工具箱](study/31-学习工具箱.md) · [32 渐进式设计](study/32-源码学习项目的渐进式设计.md) · [33 可视化协议](study/33-确定性可视化实验协议与Code-Mode权限管线.md) |

其余专题（索引读法 [08](study/08-逐文件索引怎么读.md)、业界案例 [09](study/09-业界案例与写法.md)、观测实验 [23](study/23-工具可见集合观测与性能实验.md)、人工抽查 [24](study/24-高风险索引人工抽查.md)、完成度审计 [17](study/17-完成度审计与证据矩阵.md)、维护迁移 [18](study/18-维护更新与版本迁移.md)、实际使用手册 [20](study/20-学习仓库实际使用手册.md)、后续研究 [26](study/26-后续研究路线.md)、Debug 协作与作者判断 [29/34](study/34-作者的判断与理由.md)）都从 [START-HERE](START-HERE.md) 可达。

## 逐文件索引

固定提交中按生成器白名单识别出 2,973 个代码或界面源文件（TypeScript 2,472、TSX 262、CSS 112、SQL 56、MJS 32、Python 20、JS 9、Shell 6 及其他），分到 `study/文件索引/` 的 78 个索引页；每条目有 11 个必填字段：所属层、文件角色、用途、设计原因、文件级设计证据、直接协作者、对应测试、测试关联依据、阅读顺序、代码证据和固定版本，另有可选的「测试支持」字段。[清单](study/source-index-manifest.json)机器可查，[生成器](study-tools/generate-source-index.mjs)、[验证器](study-tools/verify-source-index.mjs)、[质量审计器](study-tools/audit-source-index-quality.mjs)和[手写路径验证器](study-tools/verify-study-links.mjs)保证覆盖与路径正确。普通条目是结构化自动导读，不是逐行人工审查。

## 与上游的边界

- 上游固定提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 的 Git tree 有 7,903 个文件；本仓库不复制它们，每条源码链接都回到该 commit。要逐行构建时按 [UPSTREAM.md](UPSTREAM.md) 下载同一提交。
- 官方架构与开发文档仍在 [`docs/`](docs/)；`study/` 是额外的中文学习层。本仓库对上游代码只做过两类已登记的改动：给 `ToolRuntime` 加只读 [`debugSnapshot()` 观测接口](https://github.com/shine-233/deepseek-harness-study/blob/master/.agents/notes/implemented/feature/2026-08-16-tool-runtime-debug-snapshot.zh.md)供第 23 课的离线 A/B 使用，以及少量 CI/测试适配；除此之外不改写官方实现，源码解释一律以固定提交为准。
- [`vendor/`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/README.md) 是 Cordis 等第三方项目的固定副本，DSH 对其有本地修改；不能把每项实现都归因于上游或 DSH 原创。
- 本仓库的导读、索引和生成器不是官方 API，不承诺跟随 DSH 未来兼容性。

## CI 只保留两条工作流

`docs-pages.yml` 把教材构建到 GitHub Pages；`study-quality.yml` 跑源码编译、单元测试、lint、最小示例、索引校验、学习契约和文档门禁。上游的发布/E2E/E2B 工作流已移除，避免误跑外部服务。绿色只证明各自列出的静态或离线检查通过，不证明 DSH 运行时、真实模型调用或社区插件安全。

在 Codespaces 里可以一条命令自查教材完整性（不启动 DSH）：`pnpm run study:quick-check --example --runtime`。

<a id="run"></a><a id="run-from-source"></a>

## 运行官方 DSH

```sh
pnpm install
pnpm run build
pnpm dsh web
```

需要网络、操作系统能力和 `DEEPSEEK_API_KEY`；文档索引生成成功不等于 DSH 构建成功。

## 重新生成索引

```sh
node study-tools/generate-source-index.mjs --commit aa6c361a972c8369148dea7380bb5c21c24e07ec --source-root <同一提交的完整源码目录>
```

省略 `--source-root` 会把行数、声明和 import 证据降级为空，不能用来覆盖已提交的学习材料。换基线的完整流程见[第 18 课](study/18-维护更新与版本迁移.md)。

## 许可证

官方项目与本仓库新增材料均为 [MIT 许可证](LICENSE)；第三方依赖见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
