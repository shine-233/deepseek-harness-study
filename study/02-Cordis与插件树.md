# Cordis 与插件树

如果把 DSH 看成一台可以换零件的机器，那么 Cordis 就是它的插座、线路和拆装规则。DSH 的模型、Session、工具、Agent Loop、Web Server 甚至测试替身，都是插件，可以挂载、替换和卸载。

这篇先解释四个最重要的词：`Context`、`Fiber`、`Service`、`Event`。再把它们和 DSH 的 `Profile`、`Bundle` 接起来。读懂这棵树后，再看逐文件索引中的 `ctx.sessions`、`ctx.llm`、`ctx.tools`，就不会只把它们当成神秘的全局变量。

“万物皆插件”描述的是装配和生命周期，不是“所有能力都要在每轮对模型公开”。工具还要经过 agent 作用域、呈现方式和执行策略；想专门学习这三层，请看[工具可见性与非侵入扩展](22-工具可见性与非侵入扩展.md)。

## 这棵树到底有多大，谁在树的中间

“万物皆插件”是可以数出来的：下面这个组件读取固定提交 `aa6c361a97` 的清单和源码行数。结果是 227 个包分在 50 个组里，指向仓库内其他包的 `peerDependencies` 有 1124 条——口径是只数解析到本仓库节点的 peer，`@deepseek-ai/cordis` 系列 vendor 包的 peer 单独归入外部依赖，不在这 1124 里。自己复数时注意对齐这个口径，否则会得到不同的总数。

先看散点图右下角和左上角，再回答一个问题：最被依赖的包，是不是最大的那个？

<LessonWidget
  id="package-graph-lab"
  url="/package-graph-lab.html"
  title="包依赖图证据实验"
  :height="920"
  fallback-href="#先记住一张图"
>

不打开组件也能知道答案：在固定提交里，`runtime-diagnostics/invariants` 只有 230 行，却被 226 个包依赖；`client/runtime` 在 fixture 快照里有 9032 行，只被 37 个包依赖（行数以生成 fixture 时计得的快照为准，上游文件后续微调不会回写这张表）。体量和被依赖程度是两件事，所以“哪个包重要”不能按行数排。组件里的每个数字都在它自己的表格里逐行给出。

</LessonWidget>

这张图只读清单和行数。它不能说明运行时真的调用过这些依赖，也不能说明打包体积或启动耗时和行数相关；`dependencies`、动态 `import` 和 `cordis.yml` 装配都没有画进去。

## 先记住一张图

```text
Profile
  -> 按顺序列出 Bundle
  -> 每个 Bundle 提供代码包和 cordis.patch.yml
  -> Profile、用户目录、命令行覆盖层（overlay，在已有配置上再叠加一层修改）继续修改配置行
  -> Cordis Loader 读取最终配置
  -> 创建 Context 和插件 Fiber
  -> 插件注册 Service、Event 和可撤销 Effect
  -> Agent、Session、Tools、LLM 在同一棵树中协作
```

这里有两个容易混淆的层次：

- `Profile` 是“我要启动哪一种产品组合”。例如 Web 和 headless 可以使用不同 Profile。
- `Bundle` 是“这一层要加入哪些插件配置和代码”。例如基础 Bundle 提供 Session、工具、凭据、沙箱和模型等基础能力，Web Bundle 再加 Web Server 和浏览器客户端。

Profile 和 Bundle 都不是一个巨大的类。它们主要是配置和组合方式，真正执行工作的仍然是被 Loader 挂到 Context 上的插件。

往下滚动时，右边五段解说按同一顺序走完五个词，每一段的规模读数都来自固定提交的依赖图数据——先看形状，再记数字。

<div class="dsh-scrolly" data-scrolly="cordis-map" aria-label="六个词到依赖图的滚动引导"></div>
## Context：插件共同工作的范围

官方起点是 [`vendor/cordis/src/context.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/context.ts)。可以把 `Context` 想成一个带作用范围的工作台：插件从这里取得服务、监听事件、创建子作用域，也把自己提供的能力放回这里。

例如下面这些名字是各个包向 Context 提供的服务入口：

| Context 能力 | 负责什么 | 适合先读的官方包 |
|---|---|---|
| `ctx.sessions` | 追加和读取会话事件，恢复 Session | `packages/core/session` |
| `ctx.agents` | 管理 Agent 公共接口和 agent 事件 | `packages/core/agent` |
| `ctx.agentLoop` | 驱动默认的 Agent Loop | `packages/core/agent-loop` |
| `ctx.tools` | 注册工具、校验参数、执行和返回结果 | `packages/core/tools` |
| `ctx.llm` | 统一的模型请求和流式片段接口 | `packages/llm/llm` |
| `ctx.systemPrompt` | 组装系统提示词和工具 schema | `packages/core/system-prompt` |

Context 还有三个对初学者很重要的性质：

1. 子 Context 可以继承父 Context 的能力，也可以在自己的范围内替换某项服务。
2. 不同 Agent 可以拥有自己的 scoped context，所以一个 Agent 的工具或策略不必污染另一个 Agent。
3. Context 不是“永远活着的全局单例”。它和插件生命周期绑定，插件被卸载后，自己注册的服务、事件监听器和效果也应该被撤销。

这就是为什么官方架构文档说“一切皆插件”：核心系统靠稳定的 Context 契约连接起来，而不是靠每个模块直接导入另一个模块的私有实现。

Context 上注册出来的服务入口长什么样，可以看一个具体例子：[上下文指令发现实验](/context-lab.html)沿 agent-instructions 的扫描链演示服务怎样从项目根到 cwd 逐层发现指令文件。

## Fiber：一个插件实例的生命周期账本

[`vendor/cordis/src/fiber.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/fiber.ts) 是理解“可卸载插件”的关键。

一个插件函数被调用，不代表它只做了一次计算。它可能注册事件监听器、创建 Service、启动定时器、加载子插件、等待依赖或打开文件。Fiber 会记录已经通过 Cordis 注册机制登记的可撤销效果，并在插件离开树时按正确顺序清理；它不会自动发现插件私下创建的 timer、文件 watcher、网络连接或子进程。

可以把常见状态粗略理解为：

```text
PENDING -> LOADING -> ACTIVE -> UNLOADING -> DISPOSED
                    \-> FAILED
```

实际源码还有更多异步和重入保护。这里要抓住设计重点：

- 依赖还没准备好时，插件不能假装已经可用。
- 加载失败要能观察，不能只留一个半初始化对象。
- 卸载时要清理已经登记的事件、服务、子插件和其他 Effect；插件自己创建的外部资源必须用 `ctx.effect()` 显式登记 disposer。
- 重复 dispose 必须保持幂等，清理过程中不能偷偷注册逃出生命周期的新 Effect。
- 固定提交的 Loader entry 替换路径会先处理候选状态，并在特定的 dispose/reload 路径失败时尝试恢复仍然有效的旧 entry；不能把这句话泛化成所有插件状态更新都有事务性回滚。

Fiber 是已登记资源的所有权边界。谁创建了一个外部资源，谁就必须把停止、关闭或等待逻辑登记到自己的 Fiber；否则 `fiber.dispose()` 完成并不代表那个资源已经消失。

## Service：把能力放进插座

[`vendor/cordis/src/service.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/service.ts) 提供服务注册的基础规则。一个服务通常包含三部分：

```text
Service Definition  定义别人可以调用的接口
Service Provider    提供这一接口的一种实现
Consumer            使用接口，不关心具体实现
```

例如 LLM 包定义统一的流式模型接口，DeepSeek 包提供 HTTP/SSE 实现，Agent Loop 只使用 `ctx.llm.stream()`。以后把 DeepSeek 换成另一个模型适配器，Agent Loop 不需要知道供应商的 URL、SSE 字段或重试方式。

服务也可以有不同作用域：

- 根 Context 的服务对整棵树可见。
- Agent scoped 服务只对某个 Agent 的子树可见。
- 测试可以在隔离 Context 中安装 fake provider，不影响另一个测试。

这就是“能力扩展边界（seam）”的直观版本：接口和实现之间留一个插座，插件通过这个预留边界协作。它标记的是位置而非某一次调用，所以实现可以整体换掉，调用点跟着换。这条缝在 dsh-shell 里长成了显式的 `resolve(request): Spec`——[Shell 解析缝隙实验](/shell-seam-lab.html)展示同一份请求在本地执行器和沙箱执行器上怎样解析出不同的 Spec。web 缝隙同理：[Web 提供者矩阵实验](/provider-lab.html)对照 DeepSeek/Exa/Perplexity 三家搜索实现怎样归一化到同一份 sources。

## Event：插件之间的通知和拦截点

[`vendor/cordis/src/events.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/events.ts) 提供事件系统。事件用在多个插件可能观察、修改或阻止同一流程的位置。

DSH 中要区分两种事实：

- Session event 是要写入日志的持久事实，例如用户消息、assistant chunk、tool call 和 tool result。
- Agent 或 capability event 主要是运行中的扩展点，例如 `agent/request`、`tools/pre-execute` 和 `fs/*`。它们可能参与当前流程，但不一定单独写入 Session。

事件有多种派发方式：

- 普通事件适合通知多个监听者。
- `parallel` 适合彼此独立的监听器同时工作。
- `serial` 适合按顺序观察或处理。
- `bail` 在某个监听器给出足够结果后停止。
- `waterfall`（瀑布式派发）要求监听器调用 `next()`，这样监听器可以在委托前后检查或改写数据；如果监听器不继续委托，后面的处理就会停在这里。

选错事件域的代价很具体：持久事实若只走 live event，重启后就无法从日志解释这次请求为什么发生。必须恢复的事实应该进入 Session 日志；只影响当前请求的拦截和策略则更适合使用 live event。模型能看到的内容原则上都应该能够从 Session 日志重建，这条不变量是 DSH 可恢复设计的核心。

瀑布派发的“不调用 `next()` 就短路”行为，可以在 [Hook 瀑布短路实验](/hook-flow-lab.html)里逐步推：换一个监听器直接 return，看被跳过的兜底和最终结果的作者怎么变。

## Profile 与 Bundle 怎样长成一棵树

官方架构文档把启动过程概括成有序层叠。可以按下面顺序想象：

```text
空的 Entry List
  -> Profile 列出的第一个 Bundle
  -> Profile 列出的下一个 Bundle
  -> Profile 自己的 cordis.patch.yml
  -> Harness home 层的 patch
  -> 命令行 --patch 覆盖层（overlay）
  -> Cordis Loader 挂载最终 Entry List
```

每一行配置通常有稳定的 id。patch 可以替换某一行的完整配置，也可以插入新行。这样用户可以只换模型、工具或策略，而不必复制整个官方 Bundle。想亲手验证“声明顺序决定最终配置”，打开 [Profile 解析顺序实验](/profile-loader-lab.html)：调整 Bundle 顺序、叠加 overlay、故意引入坏引用，矩阵会逐格显示每一步写下了什么。

这一点解释了几个常见文件为什么分开：

- `packages/boot/app-boot/src/profile.ts` 负责找到 Profile、Bundle 和各层 patch。
- `packages/boot/app-boot/src/index.ts` 负责把这些层交给 Loader，收束启动失败和退出。
- `packages/bundle/base/src/index.ts` 提供共享基础能力层。
- `packages/bundle/headless/src/index.ts` 在基础层上提供无 Web Server 的一次性运行器。
- `packages/bundle/web-app/src/index.ts` 增加 Web Server、静态前端和浏览器运行时。
- `apps/cli/src/profile-boot.ts` 把 CLI 参数、环境变量、进程退出和 Profile 启动接起来。

应用层可以改变启动方式，核心包不需要复制一份 Web 版和 headless 版的 Session 或 Agent Loop。

## 用一个小例子理解“插件替换”

假设工具只需要读取文件。工具 Consumer 依赖的是 `ctx.fs` 的能力，不直接 `import` 本地磁盘实现：

```text
工具 -> ctx.fs -> 本地 fs provider
                 \-> 远程沙箱 provider
                 \-> 测试 fake provider
```

换 provider 后，工具的 schema、审批和 Agent Loop 都可以不变。测试时安装 fake provider，既能控制返回值，也能验证工具是否正确传递路径和权限，而不必真的修改开发者电脑上的文件。

只有当一个能力需要被替换、隔离、测试或按 Agent 作用域控制时，Service/Provider/Consumer 这条边界才有明显价值。

## 推荐阅读顺序

1. 先读官方 [`docs/architecture.md`](../docs/architecture.md)，建立 Profile、Bundle、Event、Turn 和 Session 的词汇表。
2. 再读 [`vendor/cordis/src/context.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/context.ts) 和 [`fiber.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/fiber.ts)，理解作用域和生命周期。
3. 接着读 [`service.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/service.ts)、[`events.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/events.ts)，理解能力和扩展点怎样注册。
4. 再读 [`packages/boot/app-boot/src/profile.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/profile.ts) 和 [`index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/index.ts)，看配置如何变成插件树。
5. 最后回到[核心文件精读](03-核心文件精读.md)和[逐文件索引](08-逐文件索引怎么读.md)，沿着 `Session -> Agent Loop -> Tools -> LLM` 主链路阅读。

每读一个 Service，都问自己三个问题：它定义了什么能力？谁提供实现？谁在消费它？每读一个 Event，都问：它是持久事实还是 live extension point？

如果要把自己的功能接入 DSH，继续阅读[社区生态与扩展边界](10-社区生态与扩展边界.md)和[如何写一个合规插件](11-如何写一个合规插件.md)。它们把本页的 Context、Service、Event、Fiber 和 Profile 具体化为插件选择、Bundle manifest、卸载清理和测试证据。
