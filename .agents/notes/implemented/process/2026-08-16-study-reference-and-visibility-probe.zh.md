# Agent Note: 发布完整学习索引与中立可见性检查器

Status: implemented

[English](2026-08-16-study-reference-and-visibility-probe.md) | 中文

## Problem

中文源码学习路线需要在 GitHub Pages 中可读，包括按目录生成的逐文件索引；工具可见性课程也需要一个可复现的观测辅助工具，但不能把它冒充成 DSH 运行时 Hook 或 provider tokenizer。

## Decision

网站现在会投影 `study/文件索引/` 下的全部 Markdown 页面；`.agents.md` 这类点号开头的文件在网站上使用 `dot-` 路由，同时保留真实源文件路径和侧栏标签。只有生成索引正文会为 Vue 模板安全做转义。学习材料新增中立 JSON 快照示例和离线 Node 检查器，用于报告集合差异、schema 字节数和执行决策；它不导入 DSH、不连接模型，也不修改运行时状态。第 23 篇和第 24 篇课程记录观测方法、A/B 实验边界和五个高风险文件的人工抽查。

## Alternatives considered

**继续只在 GitHub 上提供大型索引。** 这样可以减小 Pages 产物，但会破坏“从网站开始学习并打开任意文件”的承诺，因此不满足学习入口的目标。

**直接改写生成的 canonical 索引 Markdown。** 这样会让生成源文件偏离固定源码索引，也会让 GitHub 链接失去一致性。投影层只负责 VitePress 路由和渲染适配。

**实现私有运行时 Hook 或调用 provider tokenizer。** 这会引入凭据、运行时专属集成，以及本学习仓库没有承担的安全和测量契约。因此检查器只接受宿主导出的明确快照，并把按字节估算 token 标成启发式结果。

## Consequences

Pages 现在包含全部 66 个生成索引页，包括较大的 client 和 scripts 参考页，因此构建时间更长，侧栏会把它们折叠起来。点号开头的索引只在网站使用 `dot-agents` 和 `dot-github` URL。离线检查器适合教学和比较导出的快照，但不能证明真实 prompt、provider token 数、模型延迟、模型质量或工具执行结果。以后如果宿主或 patched fork 维护私有观测接入点，必须由它公开权限、版本范围和回滚步骤。
