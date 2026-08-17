# Agent Note: 为 master 增加破坏性操作最小保护

Status: implemented

[English](2026-08-16-minimal-master-protection.md) | 中文

## Problem

学习仓库直接从 `master` 发布 Pages，因此一次误操作的强制推送或分支删除就可能移除已发布教材的源头，却不会改善文档工作流。

## Decision

GitHub 仓库 `shine-233/deepseek-harness-study` 现在为 `master` 启用最小保护：`allow_force_pushes: false`，`allow_deletions: false`。它暂不要求 Pull Request、状态检查或管理员强制执行，因此现有 Pages 工作流仍然可以在 `master` push 后发布。保护状态通过 GitHub 分支保护 API 核对，不从本地配置文件推断。

## Alternatives considered

**保持 `master` 不受保护。** 这样仓库设置最少，但会留下可以避免的破坏性操作风险。

**立即强制要求 Pull Request 和 Actions 检查。** 这对更大的协作团队有价值，但当前 Pages 工作流有意按 push 发布，仓库也尚未定义稳定的必需检查集合；现在强制这些检查可能阻塞正常的文档发布。

**同时强制管理员遵守规则。** 共享生产仓库通常需要管理员强制执行，但当前所有者需要的是适合个人学习仓库的、可逆的最小保护策略。

## Consequences

通过受保护分支 API，`master` 不能被强制推送或删除。Pages 发布仍然基于 push；这不表示仓库已经启用 Pull Request 审查或必需 CI 检查。以后如果仓库增加维护者，可以先确认这些检查不会破坏 Pages 工作流，再增加审查要求和少量稳定的文档检查。
