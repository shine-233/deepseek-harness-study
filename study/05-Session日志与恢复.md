# Session 日志与恢复

可以把 Session 想成一本只追加、不随意擦除的工作日记。它记录的不只是最后答案，还记录用户消息、模型流片段、完整 assistant message、工具调用、工具结果、请求头、todo 和 Turn／Step 边界。

## 亲手把状态从日志折叠出来

状态是事件的函数。下面这个组件让你把重放位置拖到任意一条事件上，看状态怎么被折叠出来。完整日志有 10 条事件，重放到末尾得到 4 条消息、标题「读 Cordis 装配」；只重放到第 4 条时是 2 条消息，标题还停在「未命名会话」。

<LessonWidget
  id="session-log-lab"
  url="/session-log-lab.html"
  title="Session 日志重放实验"
  :height="900"
  fallback-href="#为什么不只保存最后一段文本"
>

不打开组件也能得到两个结论。第一，同一段日志重放到同一位置一定得到同一个状态，重放是确定性的。第二，读不懂的事件分两种：标了 `ignorable` 的可以跳过，跳过后最终状态与完整日志一致；没标的必须让加载停下——「含一条必需的未知事件」场景里，加载停在第 6 条，之前 6 条折叠成可用的部分状态，之后 4 条建立在一个没人知道的状态上，一条都不应用。

组件往下还有一个「物理行布局」面板：上游的 SQLite 会话库（schema 17，应用 id `0x44534850`，四个字节正好是 ASCII 的 DSHP）把连续的流式增量打包成一条物理行，信封只存首序号和首时间戳，其余时间用增量数组还原；data 不足 4096 字节直接存文本，达到阈值才进 zstd 分支。打包只是物理形态，重放结果不变。

SQLite 只是存储枢纽的一个后端，往上一层还有一份所有后端都要遵守的存储契约：必需的 kv 能力缺失时在解析点立刻报错，而不是带病运行；存储单元的名字同时用作文件名和 SQL 标识符，所以大写与连字符直接被拒；版本戳对不上按 `version-mismatch` 拒开；写入一旦 resolve 即持久；删除缺失键幂等；close 之后一切调用报 `closed`。这些规则在[存储后端契约实验](/storage-hub-lab.html)里按后端 × 剧本 × 单元名逐步推演，错误码全部取自上游词汇表原文。

</LessonWidget>

组件的横轴是事件序号，不是时间戳：它不能说明真实写盘耗时、真实日志体积，也不能说明真实部署遇到未知事件时的用户可见行为。

往下滚动时，右边六段解说用同一批模型的确定性读数走完一条线：事件落日志 → 重放折叠出状态 → 恢复就是前缀重放 → 必需的未知事件让加载停下 → fork 继承父日志前缀 → interrupted 修复记 unknown。不想滚动就点任意一段跳转；脚本不可用时这里只是留白，上面的结论清单本身就是完整答案。

<div class="dsh-scrolly" data-scrolly="session-log" aria-label="Session 日志与恢复过程的滚动引导"></div>

## 为什么不只保存最后一段文本

如果只保存最后文本，下面这些问题都很难回答：模型为什么会看到某段内容？工具调用的原始参数是什么？回答是流式产生到哪一步时崩溃的？会话 fork 从哪一个事件开始？UI 怎样在刷新后还原工具卡片？最后两个问题有可交互的答案：[Trajectory 投影实验](/trajectory-lab.html)把一段事件流按呈现契约折叠成用户气泡、助手块和三种工具卡（generic / terminal / diff），重放滑杆停在哪一步，右列就是当时的完整界面；[工作流节点折叠实验](/workflow-node-lab.html)再进一步——四条持久记录折成一个聊天节点，截断的日志是合法前缀，按 interrupted 呈现而工具卡一字不改。

追加式事件日志把这些问题变成投影问题：原始事件是事实，模型历史、UI 卡片、transcript、统计和持久化都是从事实推导出的不同视图。

## 重要事件

| 事件 | 作用 |
|---|---|
| `turn/start`、`turn/end` | 标出一轮工作的边界和结束原因 |
| `step/start`、`step/end` | 标出一次模型请求及其工具处理的边界 |
| `user/message` | 记录直接输入或模型可见的注入上下文 |
| `assistant/chunk` | 保留流式输出，便于回放和 UI 保真 |
| `assistant/message` | 保存一个 Step 最终组装出的 assistant 消息；Turn 在流中途被取消时，已送达的前缀也会以此事件落盘并带 `interrupted: true` 标记 |
| `tool/call` | 保存模型原样产生的工具名、调用 id 和参数字符串 |
| `tool/result` | 保存模型可见结果以及工具私有的展示元数据 |
| `request/header` | 保存本次请求使用的模型配置、系统提示词和工具 schema |
| `request/context` | 保存提供方、模型和上下文容量等路由信息 |

这张表是教学选摘，不是完整清单；全部已知事件类型见固定提交的 [`known-event-types.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/core/session/src/known-event-types.ts)。

## “模型可见即已记录”

这是 DSH 设计中的关键规则：任何会影响模型请求的内容都必须能从 Session 日志重建。动态运行时上下文因此会生成来源明确的 `user/message`；工具结果不会只停留在内存；请求头会在配置改变时追加新的快照。

它避免了一个很难查的错误：程序重启后模型历史看起来一样，但缺少某个隐式注入，导致模型行为悄悄变化。日志的目的是让“这次请求为什么这样”可以被解释。

## Surface 和历史不是一回事

原始日志可能有很多 assistant chunk，也可能有 compaction replacement。`surface` 是按规则折叠后真正进入模型历史的有序节点；日志仍保留原始事实，surface 只是一个可重算的视图。`sourceEventSeqs` 记录一个节点引用了哪些原始事件，这样替换、回放和调试不会失去来源。

<LessonWidget
  id="compaction-lab"
  url="/compaction-lab.html"
  title="上下文压缩实验"
  :height="1000"
  fallback-href="#surface-和历史不是一回事"
>

不打开组件也能得到三个结论。第一，压缩替换的是 surface，不是日志：把「最近保留轮数」拉到 0，被替换的事件一条也不会从日志里消失。第二，摘要必须逐条引用它替换的事件——少了任何一条序号，独立校验的「摘要恰好引用被替换事件」就会失败。第三，最近几轮永远逐字保留，而且摘要本身有成本（固定底价加被替换内容的一个比例），所以「最近一轮特别大」的会话压不出多少空间。

</LessonWidget>

组件里的 token 一栏是构造教学数据上的启发式估计，不是真实 tokenizer 的计数；页面也不连接 Host，不调用模型。

往下滚动时，右边四段解说把「十二轮混合会话、保留最近 2 轮」这次压缩的前后对比拆开讲：压缩前有什么、替换成什么、保留什么丢什么、oracle 怎样独立核对。不想滚动就点任意一段跳转；脚本不可用时这里只是留白，上一段的三个结论就是完整答案。

<div class="dsh-scrolly" data-scrolly="compaction" aria-label="上下文压缩前后对比的滚动引导"></div>

## 恢复、fork 和修复

- **恢复**：持久化层先取回 header 和 event seed，再由 `packages/core/session/src/index.ts` 的恢复入口和 `packages/session/session-persistence/src/preparations.ts` 协调准备；`packages/core/session/src/preparation.ts` 只持有尚未公开的 Session 并负责 provider 资源释放。
- **fork**：子 Session 可以继承父日志的前缀，并记录 parent、seed length 和边界，之后的事件属于子工作。
- **修复**：如果进程在工具或 Turn 中间崩溃，恢复阶段可以根据日志中的未闭合事实补出 interrupted 状态；这不等于假装工具成功。
- **版本**：`SESSION_FORMAT_VERSION` 保护磁盘格式。读取器不能因为“能解析 JSON”就默默忽略会影响重建的字段。

下面的组件把上面的恢复、fork 和修复三条规则做成可以亲手触发的实验：切三种崩溃点、开关 fork，看子会话继承哪段前缀、每种缺口各由哪种修复补齐。

<LessonWidget
  id="session-fork-lab"
  url="/session-fork-lab.html"
  title="Session fork 与崩溃修复实验"
  :height="880"
  fallback-href="#亲手把状态从日志折叠出来"
>

时间线是固定教学模型：四种崩溃形态 × fork 开关共八种组合、一份确定性步骤表。它不读写真实 Session 文件，也不模拟真实进程信号；不打开组件也能继续读本节清单得到同样结论。

</LessonWidget>

## 相关源码和测试

推荐顺序是 `packages/core/session/src/types.ts`、`packages/core/session/src/index.ts`、`packages/core/session/src/preparation.ts`、`packages/core/session/src/surface.ts`，然后读：

- `packages/core/session/tests/session.spec.ts`
- `packages/core/session/tests/invariant.spec.ts`
- `packages/core/session/tests/fork.spec.ts`
- `packages/core/session/tests/surface.spec.ts`
- `packages/core/session/tests/repair.spec.ts`
- `packages/core/session/tests/request-header.spec.ts`
- `packages/session/session-persistence/tests/` 下的通用 contract、coordinator 和 persistence orchestration 测试
- `packages/session/session-persistence-jsonl/tests/` 下的 JSONL、Windows 和 zstd 测试
- `packages/session/session-persistence-sqlite/tests/` 下的 SQLite 后端测试

注意：索引和这些文档只说明固定提交的结构。是否真的能从某个磁盘文件恢复，还要运行对应 persistence 测试或做实际恢复实验。
