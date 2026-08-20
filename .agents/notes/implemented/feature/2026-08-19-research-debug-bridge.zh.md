# Agent Note: 研究与 Debug 文件交接

Status: implemented

[English](2026-08-19-research-debug-bridge.md) | 中文

## 问题

研究网站可以解释 Harness 机制并提出证据问题，独立的 Debug 工具则可以生成和检查脱敏诊断 artifact。如果两者之间没有一个明确归属的 seam，学习者只能手工比对互不相关的 JSON，或者让其中一方获得对另一方的环境权限。浏览器连接 loopback、自动启动 PowerShell 或扫描机器，会让教学页面负责它并不拥有的本地执行和用户数据。

## 决策

网站和 Debug 工具只通过版本化、由用户手动传递的文件协议协作。`website/public/research-debug-bridge.html` 是独立静态工作台，由 `research-debug-bridge.js` 和 `research-debug-bridge.css` 支撑。它从显式课程上下文创建 `dsh-research-diagnostic-request` v1 文件，只在用户操作后下载，也可以通过同一套 schema 投影恢复用户手动选择的 request，并导入用户手动选择的 `dsh-research-diagnostic-result` v1 文件。导入字段先经过 schema 投影，再用 `textContent` 写入页面；工作台不使用 fetch、WebSocket、loopback 接口、Cookie、浏览器存储、共享数据库或自动本地命令。

Debug 工具仍是另一个独立仓库和可执行程序。它的 opt-in `research-bridge` 动作只读取一个显式 request，以及可选的一个显式 metadata-only `dsh-debug-repro` v1 文件。它返回 `COMPLETE`、`PARTIAL`、`UNAVAILABLE` 或 `FAIL`，并逐项产生 `coverage`、`privacy`、`integrity` 检查结果；同目录 manifest 存在时核对哈希；privacy 违规和输入/输出路径碰撞会被拒绝；`evidence.trust` 固定为 `declared-metadata-only`。普通诊断或 repro 动作不会自动调用这条交接路径。

两边都保留独立用途。没有 Debug 时，网站仍能生成 request 并显示合成 result 示例；没有网站时，Debug 仍能验证 request、在没有 evidence 时返回 `UNAVAILABLE`，或只向 stdout 输出 result。这个文件协议报告 artifact 覆盖和完整性状态，不会把课程模型转换成生产运行时证据。

## 曾考虑的替代方案

**浏览器连接 loopback HTTP 或 WebSocket**：否决。它会引入源、端口、认证、生命周期和本地网络权限，而静态学习网站并不需要这些能力。

**让网站启动 PowerShell 或扫描 DSH 状态**：否决。网站不拥有用户的进程、Profile、Session、工作区或凭据边界；自动发现也会让 explicit-file 隐私声明失真。

**把 Debug 实现嵌入课程仓库**：否决。这会绑定两个发布和权限边界、复制一个本来可以独立使用的工具，并让读者无法分清结果来自教学代码还是诊断包。

**接受原始 Session、日志或 Tool result 文件**：否决。交接只消费已有脱敏 repro 合同；扩宽输入会在没有需要和安全展示合同的情况下，把 raw payload 处理搬进课程集成。

## 后果

交接需要手动选择 request/result 文件；manifest 缺失时保持明确的 `integrity=absent` warning，而不是完整性证明。恢复 request 只回填 v1 所有的表单字段和预设边界，不保存浏览器状态，也不接受未知字段。学习者想使用非合成证据时，必须自己安装和运行 Debug。换来的好处是网站默认没有本地权限、Debug 不扫描网站或机器、两边可以在小型 v1 schema 后分别演进，并且 result 不能悄悄扩大 metadata coverage 的含义。

`COMPLETE` 只表示 request 要求的 source kind 都出现在所给 repro 中，并且每一项 requested check 都是 `PASS`；它不表示原始运行确实发生、课程模型就是精确 trace、故障已经修复，或生产 DSH Web 已经被操作。更强的结论仍要分别提供 Host、Session、浏览器和运行时证据。课程工作台现在提供 8 个有界研究节点预设；预设只生成问题和 `canProve/cannotProve` 边界，不预先声称证据存在。

工作台还会展示一个可复制的 PowerShell 命令模板，对应两个由用户自己运行的步骤（先 `repro-export`，再 `research-bridge`）。模板只是操作指引：用户需要自行替换路径，并在浏览器之外执行。页面不会启动 PowerShell、读取本地文件，也不会声称操作系统剪贴板已经持久化成功；页面反馈只说明浏览器已接受剪贴板写入请求。

手写源码路径验证器也已收窄到只检查明确以 DeepSeek Harness 固定树为根的路径。它不再猜测 Kimi、OpenMAIC、花叔项目或本地工作台中的无前缀路径属于这棵树；这些来源仍然作为独立证据记录。

项目内的 `dsh-source-grounded-course` skill 现在也记录了通用交接规则：只从用户明确选择的文件恢复 schema 所有的 request 字段，把 request/result 与学习者进度分开，并拒绝机器的隐式权限。

## 验证

`node --test study-tools/research-debug-bridge.test.mjs` 覆盖确定性 request、失败即停止的 safety、全部 result 状态、privacy 和计数拒绝、纯文本渲染，以及网络/存储原语缺失。Pages 工作流在 `doc-sync` 前运行这项测试。`node --check website/public/research-debug-bridge.js` 检查语法，文档构建则验证课程章节和静态资源能在配置的 Pages base path 下发布。

Debug 仓库的 `tools/Test-DSHResearchBridge.ps1` 使用合成临时文件，在 PowerShell 7 和 Windows PowerShell 5.1 上运行。它覆盖完整、部分、不可用、无效 request、未知 check、无效 privacy、manifest 缺失/不匹配、逐项检查状态传播、已有输出、输入/输出碰撞、输入不变、公共入口路由、敏感 marker 排除和离线行为。两个仓库各自保留逐字节一致的 canonical request/repro/manifest/expected fixture；开发期 `study-bridge:contract-replay` 会让 Debug 读取课程副本，再由课程 JS 校验 result。这些 fixture 验证协议，不是生产 DSH 运行时证明。
