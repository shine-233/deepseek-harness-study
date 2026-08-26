# Agent Note：可失败 oracle 从四个旗舰扩展到更多实验室

Status: implemented

[English](2026-08-26-fault-injection-batch-2.md) | 中文

## 问题

只有四个旗舰实验室（turn-flow、llm-stream、compaction、session-log）带篡改实验：读者可以亲手弄坏一条不变量，看 oracle 当场变红并指认规则。其余实验室的 oracle 是恒真的——它们反复核对一条永远不可能撒谎的时间线，「独立校验」因此演示不出违规长什么样。

## 决策

在首批之外，另有六个实验室补上同款篡改实验，每个故障都是单因的：变红时恰好指向一条校验。

- `session-fork-lab.html`——`fake-result-ok`：在工具中崩溃形态下，把 unknown 修复步骤替换成伪造的「结果 ok」落册。`REPAIR_HONESTY` 抓住它，而 `NO_GHOST_SUCCESS` 被故意骗过（伪造结果满足了「意图必须有去向」的扫描）——这本身就是教学点：每条校验都有盲区，所以校验要分层。该形态之外注入不生效。
- `invariant-lab.html`——`swallow-violation`：真实违规发生后，fail() 步骤被从时间线里抹掉、错误记录清空。`FAIL_ATTRIBUTES_PACKAGE` 抓住错误凭据缺失；检查被过滤关掉的无效场景会明说，而不是假装注入成功。
- `tool-visibility-lab.html`——`ghost-allow`：把一个被作用域挡住的工具挪进允许执行集合，层级、被挡原因与观测计数全部同步改好。页面每个读数都自洽，唯一能抓住伪造的是嵌套关系本身（`ALLOWED_SUBSET_VISIBLE`）。
- `guard-loop-lab.html`——`overreach-block`：把最后一次调用标记成被提醒插件拦截，而它只有建议权。账目变成 N−1 次执行、1 次拦截，`ADVISORY_ONLY` 抓住越权；守卫关闭或末次恰在阈值上时注入不生效（那会同时弄脏链条记账）。
- `subagent-delegate-lab.html`——`run-rejected-child`：SubagentDepthError 抛出之后，子 create/run/settle 步骤照常伪造出现。`REJECTION_RULE` 要求拒绝发生时子泳道为空；深度未超限时注入不生效。
- `plan-stack-lab.html`——单选择器按面板生效：`bump-counts` 弄乱 todo 账目（`COUNTS_MATCH_ITEMS`），`fake-commit` 把忙时挂起伪成立即提交（`IDLE_COMMITS_BUSY_QUEUES`），`fake-rearm` 把撤权动词伪造成仍持权（`ARMING_MATCHES_VERB`）。选错面板或条件不满足时打印原因，而不是静默失败。

十个实验室沿用旗舰机制：故障是经过校验的模型输入（`none` 是唯一默认；未知类型在模型边界直接抛错）、oracle 继续从原始状态独立重算规则、故障选择器进入页面的 `#state=` 状态链接（plan-stack 页面本来就没有状态链接）。fault note 指认被触发的校验 id 和这条校验存在的理由。

## 后果

篡改实验现在覆盖十个实验室、六种违规形态：证据被丢（turn-flow、compaction）、证据被造（session-fork）、证据被吞（invariant）、证据不自洽（tool-visibility）、越权行为（guard-loop）、拒绝后照跑（subagent-delegate），以及结论字段伪造（llm-stream、session-log、plan-stack）。其余实验室仍是恒真 oracle；扩展它们需要为每个模型决策「读者应该亲手弄坏哪条不变量」，而不是再加共享机制。

故障通过对已构建模型对象的变更实现（`applyXFault`），不穿透各构建助手函数，每个模型只保留一个变更点。今后改动被篡改字段的模型代码时，必须在同一处修改里同步更新对应的 fault applier。单因纪律也约束了故障的生效位置：guard-loop 会拒绝会同时弄脏两本账的注入。

## Alternatives considered

**由逐实验室配置驱动的通用故障框架。** 暂缓否决：每个实验室可教的违规形状不同（丢日志写入、伪造结果、抹掉错误、拦截调用），共享引擎需要在所有地方开逐实验室钩子，还会藏起本设计依赖的那个单一变更点。出现新形态再重新评估。

**让单个故障同时打红多条规则，戏剧性更强。** 否决：旗舰惯例是红色只有一个原因，这正是「指认规则的 note」可信的前提。

## 测试

模型测试断言每个故障的精确红集、无效组合保持绿、未知故障类型大声抛错（`session-fork.test.mjs` 11 通过、`invariant.test.mjs` 9 通过、`tool-visibility.test.mjs` 15 通过、`guard-loop.test.mjs` 19 通过、`subagent-delegate.test.mjs` 15 通过、新建 `plan-stack.test.mjs` 4 通过）。Playwright 验收端到端驱动全部六个页面：基线绿、注入后红且 note 指认规则、无效组合绿且解释可见、撤销后回绿、有状态链接的页面验证链接在位。完整冒烟 9/9 通过，`pnpm run website:build` 保持五绿。
