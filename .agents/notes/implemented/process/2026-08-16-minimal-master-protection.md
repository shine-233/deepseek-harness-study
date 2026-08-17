# Agent Note: Protect master against destructive branch operations

Status: implemented

English | [中文](2026-08-16-minimal-master-protection.zh.md)

## Problem

The study repository publishes Pages directly from `master`, so an accidental force push or branch deletion could remove the source of the published textbook without improving the documentation workflow.

## Decision

The GitHub repository `shine-233/deepseek-harness-study` protects `master` with `allow_force_pushes: false` and `allow_deletions: false`. It does not require pull requests, status checks, or administrator enforcement; the existing Pages workflow can therefore continue to publish on a `master` push. The protection state is checked through the GitHub branch-protection API rather than inferred from a local configuration file.

## Alternatives considered

**Leave `master` unprotected.** This keeps the fewest repository settings, but it leaves the published learning entry vulnerable to an avoidable destructive operation.

**Require pull requests and Actions checks immediately.** This would add a useful review gate for a larger contributor group, but the current Pages workflow is intentionally push-driven and the repository has not defined a stable required-check set; making those checks mandatory now could block legitimate documentation publication.

**Enforce the rules for administrators.** Administrator enforcement is appropriate for a shared production repository, but the current owner needs a reversible minimum protection policy while the study repository remains a small personal project.

## Consequences

The `master` branch cannot be force-pushed or deleted through the protected-branch API. Pages publication remains push-based, and no claim is made that the branch has pull-request review or required CI checks. If the repository gains additional maintainers, review requirements and a small set of stable documentation checks can be added after verifying their effect on the Pages workflow.
