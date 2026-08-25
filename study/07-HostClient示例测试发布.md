# Host、Client、示例、测试与发布

读 DSH 时容易把“服务器代码、浏览器代码、示例和测试”混成一个整体。这一页把它们分开，再说明它们怎样组合。

## Host 和 Client

- **Host** 在 Node 侧运行，负责 profile、Session、Agent、工具执行、HTTP API、Web Server 和持久化。
- **Client** 在浏览器侧运行，负责会话界面、工具卡片、消息节点、设置和交互。三个核心组件族各有可推演的契约，[客户端三面镜实验](/client-lab.html)逐个展开：ui-tool 的卡片状态机，生命周期每个状态都从冻结的 call/result 事件切片推导出来，组件自己不留第二份状态；ui-conversation 的折叠引擎，连续消息按日志序折成压缩行，披露后一字不改地展开；ui-user-questions 的提问接管，一条提问要同时满足五个条件才会换成审阅卡——意图是 plan-review、只有一个问题、二元单选、选项里有批准标签、detail 附带计划正文，缺任何一个都留在通用提问流。凭据解析与设置管理也有对应实验入口。
- 两边通过 API／远程协议和 Session 事件传递信息；Client 不应该直接访问 Node 的文件系统或模型密钥。

宿主半区的 HTTP 面也有一条可推演的路径：webserver 是唯一的路由载体，frontend-static 坐在回退座位上——只在没有任何已注册路由认领时才把 SPA dist 发出去；目录选择走 `ctx.directoryPicker` 共享接缝，native 与 browse 两个后端互相替换而消费方契约不变。[宿主路由与接缝实验](/host-gateway-lab.html)把「载体接收 → 路由扫描 → 应答」做成逐步推进的时间线，可以切换请求形态和接缝后端。

官方文档把它们放在不同的 TypeScript aggregate 中。原因是 Host 和 Client 会给 Cordis `Context` 合并不同服务，如果把两套程序强行放进一个 TypeScript program，声明可能发生冲突。读 `docs/development.md` 中的 `tsconfig.host.json`、`tsconfig.client.json` 说明，可以理解这种边界。

## 示例为什么重要

示例把真实组合压缩成可以运行的最小场景：headless agent 展示无服务器运行，ACP／JSON-RPC 展示进程外接口，web-cordis 展示浏览器组合。读示例时关注 profile、Bundle、环境变量和依赖，而不是只看最终输出。

## 测试的层次

| 测试 | 它回答什么问题 |
|---|---|
| 单元测试 | 一个函数、类型转换或状态规则是否正确 |
| 包级集成测试 | 一个包和 Cordis／同组服务组合后是否正确 |
| 快照测试 | CLI、UI 或协议输出是否保持结构 |
| E2E 测试 | 构建产物、HTTP、进程或浏览器流程是否接得起来 |
| 真实 API 测试 | 真实供应商网络和模型协议是否可用 |
| 属性测试 | 大量生成输入下，不变量是否仍成立 |

<div class="dsh-testlayers" data-dsh-testlayers aria-label="六层测试交互模型：点选一层，看它回答与不回答的问题"></div>

绿色的单元测试不能代表 E2E 或真实模型已经验证；反过来，E2E 失败也可能是环境、密钥或端口问题。报告结果时要写清楚是哪一层。上面的模型把这张表变成可点选的：选一层，右侧列出它回答的问题和它不回答的问题；「不回答」一栏由表中其余各层的问题推导，两条边界警告引自本页原文。

## 从源码运行时的合理顺序

官方开发指南给出的基本顺序是：先安装 Node.js 和 pnpm，再 `pnpm install`，然后做 typecheck 或 build，最后启动 Web、headless 或示例。开发者预览版本可能发生破坏性变化，不能把某次本地构建结果当成长期兼容承诺。

```sh
pnpm install
pnpm run typecheck
pnpm run build
pnpm dsh web
```

没有 API key 时可以进行静态检查、类型检查、mock 测试和配置 dump；不能把这些结果写成真实 DeepSeek API 调用成功。

## 发布和第三方边界

`packages` 中的包按组发布，`apps` 提供可运行入口，`vendor` 提供固定上游源码，`THIRD_PARTY_NOTICES.md` 记录依赖许可证。修改 vendor 时应先读 `vendor/README.md` 和 manifest；修改包公开 API 时应同步包 README、测试和必要的构建产物检查。

## 本学习仓库自己的验证

本仓库新增内容的第一道检查覆盖以下各项：生成器语法正确；生成器输出 `2973` 个条目；清单和索引一一对应；每条有十一个固定中文字段，另有可选的“测试支持”字段；链接固定在同一 commit。第二道检查是人工精读和公开案例复核。它们不能替代 DSH 官方的完整 build、E2E、浏览器和真实 API 验证。
