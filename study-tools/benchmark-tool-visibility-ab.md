# 工具可见性 A/B 离线性能基准

`benchmark-tool-visibility-ab.mjs` 使用两份已经导出的脱敏快照，测量本地 JSON 解析、可见工具集合差异和 visible 列表 JSON 序列化。它不启动 DSH，不连接 provider，不读取 API key，也不执行快照里的工具。

## 运行

在仓库根目录执行：

```text
node study-tools/benchmark-tool-visibility-ab.mjs study-tools/tool-visibility-ab.a.example.json study-tools/tool-visibility-ab.b.example.json --iterations 1000 --warmup 100
```

脚本把 JSON 报告写到标准输出。`--iterations` 必须是大于 0 的安全整数；`--warmup` 可以是 0，默认值分别是 1000 和 100。需要把报告保存下来时，由调用方重定向标准输出即可；不要把真实参数、用户内容、凭据或绝对路径放进快照。

基准会先复用 `compare-tool-visibility-ab.mjs` 的 A/B 预检。以下条件不满足时不会测量：profile、agent、registered 集合和 fixed 条件必须相同；visible 集合必须发生变化；共同可见工具的顺序、presentation 和 schema 必须相同。这样可以避免把多个变量的变化误记成“工具数量性能差异”。

## 报告怎样读

| 报告部分 | 它记录什么 | 可以支持的结论 |
| --- | --- | --- |
| `environment` | Node.js 版本、平台和 CPU 架构 | 为跨环境复跑保留运行时上下文 |
| `input` | 两份快照文本、visible 列表和 schema 的 UTF-8 字节数、工具数量 | B 的本地输入对象比 A 大或小多少 |
| `proxyIndicators` | 可见工具数、visible JSON 字节数、schema 字节数和集合增删差异 | 两个脱敏快照的结构差异，及其请求可见部分的大小代理 |
| `operations.snapshotParsing` | 分别重复 `JSON.parse(A)` 和 `JSON.parse(B)` 的总耗时与每次耗时 | 当前 Node/机器上，解析这两份固定 JSON 的本地成本 |
| `operations.collectionDiff` | 重复计算 A/B visible 工具名集合差异的耗时 | 当前 Node/机器上，集合差异计算的本地成本 |
| `operations.serialization` | 分别重复 `JSON.stringify(A.visible)` 和 `JSON.stringify(B.visible)` 的耗时 | 当前 Node/机器上，序列化 visible 列表的本地成本 |
| `evidence` | provider 调用次数、是否需要 key 和证据限制 | 本次实验没有模型服务证据 |

UTF-8 字节数以及 `bytes / 4` 只是可解释的代理指标，不是任何 provider tokenizer 的真实 token 数。`totalMilliseconds` 和 `nanosecondsPerIteration` 是当前进程的墙上时钟观测，会受到 Node.js 版本、操作系统、CPU 负载、JIT 和垃圾回收影响；它们不是性能门禁。固定输入、迭代次数和预热次数让实验可以复跑，但不保证不同机器得到相同的微秒数。

## 推荐记录方式

1. 使用相同的两份脱敏快照和相同的 `--iterations`、`--warmup`。
2. 记录 Node.js 版本、操作系统、CPU 负载和命令；可以连续运行多次，报告中不要只保留一次异常值。
3. 先比较 `proxyIndicators`，确认 A/B 的工具数、schema 字节数和集合差异确实符合实验意图。
4. 再比较三类本地操作的每次耗时；把它们称为“快照处理成本”，不要写成模型响应变快。
5. 如果以后接入真实 provider，另建包含 input tokens、cached tokens、首 token 延迟、总延迟、工具错误、质量和成本的成对实验；没有 provider 字段就写“未提供”。

## 证据边界

这个基准不能推导真实模型延迟、provider 排队、网络耗时、首 token 延迟、总请求耗时、工具执行耗时、模型选择质量或成本。即使 B 的本地序列化更快，也只能说明这两份快照在当前机器上的一个输入准备成本较低；不能推出 B 对某个真实模型必然更快、更便宜或更准确。

已有的 `inspect-tool-visibility.mjs` 适合查看单份快照的注册/可见/执行计数和 schema 启发式；已有的 `compare-tool-visibility-ab.mjs` 适合检查 A/B 是否只改变了 visible 集合；本基准把这两个前置事实之后的三个离线处理成本变成重复测量。三者都不替代真实 provider 实验。
