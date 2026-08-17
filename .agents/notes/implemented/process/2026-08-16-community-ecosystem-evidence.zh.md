# Agent Note: DSH 社区生态的带日期公开 GitHub 证据

Status: implemented

[English](2026-08-16-community-ecosystem-evidence.md) | 中文

## Problem

公开 DSH 仓库使用 plugin、bundle、hook、fork、patch、injector 和 registry 等相互重叠的词。topic 查询或 README 因此容易被误读成官方注册表、兼容性声明或安全审查。搜索总数也会随索引时间和查询参数变化。

## Decision

社区研究文档把公开 GitHub 研究记录为带日期的观察账本。每个外部项目名称、数量和兼容性表述都带来源 URL 与访问日期。正文标明证据属于上游固定源码、固定社区源码/manifest、项目自述、仓库元数据或搜索索引观察。

研究材料保持四类分开：普通插件使用公开 DSH/Cordis 或 Bundle 入口；上游 Hook bridge 把有文档的外部命令 hook 子集翻译进来；patched fork 修改并维护 DSH 源码 checkout；注入器或 registry 修改工具触碰 loader 内部、缓存、Fiber 状态、链接或宿主表。单凭 manifest 或 `apply(ctx)` 不能证明其中任何一种分类。

topic 总数只作为查询时的观察记录。README 声明、stars、release 标签、自测和可加载性都不升级为独立的兼容性、安全性或官方背书证据。安装、执行、卸载、回滚和跨版本结论仍需在受控环境中另行验证。

## Alternatives considered

**把 `dsh-plugin` topic 当成官方目录。** 否决，因为查询结果同时包含上游仓库、目录、宿主封装和仅在描述中提到 DSH 的项目；没有证据表明 topic 具备维护者审核契约。

**把社区 README 或 manifest 当成兼容性证明。** 否决，因为这些文件只能说明项目声称了什么或打包了什么，不能证明目标 DSH 提交可以运行、干净卸载，或保持权限与生命周期语义。

**在写边界前先运行所有发现的项目。** 本切片不采用，因为大规模安装会改变宿主并混淆不兼容的 Profile；研究材料先记录静态证据，把受控运行验证明确列为后续工作。

## Consequences

读者可以区分发现证据、源码证据和运行证据，topic 数量变化也不会悄悄变成产品结论。文档更长，并且需要维护来源 URL、固定 commit 与访问日期。社区样本仍可用于理解生态，但在没有更强证据前，不把任何样本写成官方、安全或普遍兼容的扩展。
