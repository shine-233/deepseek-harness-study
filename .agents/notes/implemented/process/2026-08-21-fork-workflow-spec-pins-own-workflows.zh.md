# Agent Note: Fork workflow spec pins this fork's own workflows

Status: implemented

[English](2026-08-21-fork-workflow-spec-pins-own-workflows.md) | 中文

## Problem

`scripts/ci-workflow.spec.ts` 来自上游，校验五个 workflow 文件（`ci.yml`、`e2b-e2e.yml`、`python-release.yml`、`build-exe-for-python-sdk.yml`、`issue-lifecycle.yml`）。本 fork 有意删除了这五个文件——README 记录了两条 workflow 的边界——但保留了这份 spec，于是每次 push 都让 `Study material quality` 门禁变红：八个断言去找那些按设计就不该存在的文件，报 ENOENT。红门禁还淹没了真实信号：读者分不清「上游测试被我们删了」和「我们实际发布的东西没通过检查」。

## Decision

spec 现在锁定本 fork 实际拥有的两条 workflow：

- 一条封闭清单测试：`.github/workflows/` 恰好包含 `docs-pages.yml` 和 `study-quality.yml`。
- `docs-pages.yml`：只从 master push 和手动触发部署（没有 `pull_request` 触发器）；不取消进行中的 Pages 运行；在任何 study 门禁之前先从 `study/source-index-manifest.json` 取固定上游提交；六条 study 门禁全部排在 `doc-sync` 之前、站点外壳检查排在之后；用 `upload-pages-artifact` 上传 `website/.dist`；以最小权限部署；保持生产遥测关闭。
- `study-quality.yml`：对仓库内容只读；PR 和 master push 都受 study 路径过滤约束；顺序为 install → build → test → lint → 文档门禁 → 站点检查 → 空白检查；上传带名字的站点工件且 `if-no-files-found: error`；写证据边界 job summary。
- 上游的 lefthook 测试保留：冻结的 Agent Note sidecar 继续被翻译配对钩子排除。

文件名不变，因为四个继承的 note 用相对路径链接它。这些 note（[pnpm setup 隔离](../bug-fix/2026-07-29-pnpm-setup-runner-isolation.md)、[CI failover runbook](2026-07-26-ci-failover-runbook.md)、[事件驱动的 PR 评审状态](2026-08-10-event-directed-pr-review-status.md)）描述的是上游 CI 决定；它们对 spec 行为的描述从今天起是上游历史，不是本 fork 的现状。本 note 拥有 fork 的 spec。

## Alternatives considered

- **删除 spec。** 否决：会失去上面对部署关键不变量的唯一自动化检查，四个继承 note 的相对链接也会变成死链。
- **跳过或过滤失败测试。** 否决：被跳过的测试仍然宣称覆盖本 fork 刻意没有的 workflow——这正是教材警告的「把静态结果写成运行证明」。
- **改名为 `github-workflows.spec.ts`。** 暂缓：会弄断四个继承 note 的链接，在它们仍然活跃时改名没有收益。

## Consequences

质量门禁在本 fork 的真实面上回绿。新 workflow 无法悄悄出现——清单测试会失败，直到 README 的两条 workflow 声明和 spec 一起更新。代价是 spec 不再保护仅上游关心的不变量（Wine 任务、Python 发布隔离）；那层保护属于拥有那些文件的上游。
