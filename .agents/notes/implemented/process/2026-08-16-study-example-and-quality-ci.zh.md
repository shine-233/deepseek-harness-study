# Agent Note: 学习示例与质量 CI

Status: implemented

[English](2026-08-16-study-example-and-quality-ci.md) | 中文

## Problem

源码学习材料需要一个可运行的第一个扩展练习，也需要一种可审阅的方法，防止链接、示例和 Pages 投影悄悄漂移。只有文档构建无法说明小型行为测试、静态规则检查、结构化实验预检和真实 DSH 运行结论之间的差别。

## Decision

`study-examples/minimal-observer-plugin` 是一个刻意标为非官方的第三方 Bundle，只监听公开的 `tools/result` 事件。它的两个预览上限是部署配置字段，示例会在使用前校验它们，`cordis.patch.yml` 提供默认值。它的 Node 测试和本地 oxlint 配置证明示例会限长且不改写结果；它们不会启动 DSH、加载 Profile、联系 provider，也不声称产品兼容性。

`study/28-最小插件示例与学习检查.md` 讲解这个示例，`study/29-学习仓库的质量检查与审阅.md` 则说明示例测试、工具可见性 A/B 预检、`doc-sync`、Pages 构建、`git diff --check` 和审阅分别提供什么证据。

`.github/workflows/study-quality.yml` 会在相关 Pull Request 和 `master` 推送上运行确定性的学习材料检查，其中包括比较版本库内的 A/B 教学快照。它的 checkout 会取得完整历史，使空白检查比较事件对应的提交范围，而不是检查一个没有工作树差异的干净 checkout。Pages 工作流仍负责部署。`.github/AGENT_REVIEW.md` 和 Pull Request 模板把 Agent 审阅限定为辅助意见：它们要求检查证据和侵入性，但模型输出或绿色工作流都不授权合并，也不认证安全性。

工作流还会检查每个 study-tool 模块的 Node 语法，运行 `audit-source-index-quality.mjs`，并运行 `verify-study-entry.mjs`。后者是一个刻意保持很小的源文件／manifest smoke 检查，覆盖首页、START-HERE、基础课、示例 README 和 Pages alias；它不是浏览器 smoke test。索引质量审计会把结构错误和可复用模板提示分开报告，因此重复的设计理由仍是人工抽查信号，不会自动变成 DSH 运行时错误。

## Evidence levels

最小观察器的测试覆盖预览截断、非文本省略、配置校验与覆盖、事件订阅和结果夹具不被改写。它的 lint 覆盖选定的 correctness/suspicious 规则类别和 Node 语法检查。A/B 单元测试检查比较器逻辑，CLI 检查读取版本库内实际提交的教学快照。`doc-sync` 在完整 checkout 中检查仓库文档规则和站点生成。

这些检查不能证明真实 Loader 安装、Fiber 卸载、模型 token 使用、provider 延迟、任务质量、跨版本兼容、社区包安全或操作系统隔离。事件范围空白检查也只检查该范围内 Git 能识别的空白错误。这类说法仍要各自的运行、生命周期、provider 或安全证据。

## Alternatives considered

**把教学包放进 `examples/`。** 该目录保存已交付的 DSH 组合和面向产品的测试。把学习包放进去会让读者更容易把它的非官方、不完整运行证据误认为产品示例。

**只使用文档片段。** 片段无法演示源码、聚焦行为测试、lint、小改动和有限结论之间的关系。独立包让这个循环可执行，同时不需要模型密钥。

**把外部模型审阅做成必过的 GitHub Action。** 这需要先决定是否向 provider 发送 Pull Request 内容、如何隔离 fork secret、费用、延迟、失败处理、输出保留和最终责任。仓库在这些决定明确前只记录辅助审阅清单。

**让学习工作流运行完整 DSH 发布套件。** 学习 fork 的质量工作流负责自己的示例和文档。完整产品验证属于上游产品 CI，不能由绿色学习仓库工作流暗示已经完成。

## Consequences

贡献者得到一个清楚、低成本的第一个示例和确定性的质量路径。维护者得到一份 PR 记录，保留静态、构建、运行和辅助审阅证据之间的区别。

由于部署报告与质量报告有意分开，工作流会在 `master` 上重复一部分文档工作。它也明确保留真实 Profile 安装、卸载验证、provider 评估和安全审阅，作为未来工作而不是隐含假设。
