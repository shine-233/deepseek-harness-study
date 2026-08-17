# Agent Note: Study example and quality CI

Status: implemented

English | [中文](2026-08-16-study-example-and-quality-ci.zh.md)

## Problem

The source-learning material needed a runnable first extension exercise and a reviewable way to keep its links, examples, and Pages projection from drifting. A documentation-only build could not show the difference between a small behavior test, a static rule check, a structured experiment preflight, and a real DSH runtime claim.

## Decision

`study-examples/minimal-observer-plugin` is a deliberately non-official third-party Bundle that listens only to the public `tools/result` event. Its two preview limits are deployment configuration fields validated by the example before use; `cordis.patch.yml` supplies the defaults. Its Node tests and local oxlint configuration prove the example's bounded, non-mutating behavior without starting DSH, loading a Profile, contacting a provider, or claiming product compatibility.

`study/28-最小插件示例与学习检查.md` teaches that example, while `study/29-学习仓库的质量检查与审阅.md` names the evidence supplied by the example tests, the tool-visibility A/B preflight, `doc-sync`, the Pages build, `git diff --check`, and review.

`.github/workflows/study-quality.yml` runs the deterministic learning-material checks on relevant pull requests and `master` pushes, including the comparison of the committed A/B teaching snapshots. Its checkout fetches full history so the whitespace check compares the event's commit range rather than an empty clean worktree. The Pages workflow remains responsible for deployment. `.github/AGENT_REVIEW.md` and the pull-request template make Agent review advisory: they require an evidence and intrusion check, but neither model output nor a green workflow authorizes merge or certifies security.

The workflow also checks every study-tool module for Node syntax, runs `audit-source-index-quality.mjs`, and runs `verify-study-entry.mjs`. The latter is a deliberately small source/manifest smoke check for the home, START-HERE, first lessons, example README, and Pages aliases; it is not a browser smoke test. The index audit reports structural errors and reusable-template prompts separately, so repeated design-reason text remains an inspection signal rather than an automatic runtime failure.

## Evidence levels

The minimal observer's test covers preview truncation, non-text omission, configuration validation and override, event subscription, and result-fixture non-mutation. Its lint covers the selected correctness and suspicious rule categories plus Node syntax checks. The A/B unit test checks comparator logic, while the CLI check reads the committed teaching snapshots. `doc-sync` checks repository documentation rules and site generation on a full checkout.

Those checks do not prove a real Loader installation, Fiber disposal, model token usage, provider latency, task quality, cross-version compatibility, community-package safety, or operating-system isolation. The event-range whitespace check only checks Git-recognized whitespace errors in that range. Those claims retain their own runtime, lifecycle, provider, or security evidence requirements.

## Alternatives considered

**Place the teaching package in `examples/`.** That directory owns shipped DSH compositions and product-oriented tests. A study package there would make its non-official, incomplete runtime evidence too easy to confuse with a product example.

**Use only prose snippets.** A snippet cannot demonstrate the relationship among source, a focused behavior test, lint, a small modification, and a bounded conclusion. The separate package keeps that loop executable without a model key.

**Make an external model reviewer a required GitHub Action.** This would require a decision about sending pull-request content to a provider, fork-secret isolation, cost, latency, failure handling, output retention, and final authority. The repository records an advisory checklist until those decisions are made explicitly.

**Run the full DSH release suite as the study workflow.** The learning fork's quality workflow owns its examples and documentation. Full product validation belongs to upstream product CI and must not be implied by a green learning-repository workflow.

## Consequences

Contributors receive a clear, inexpensive first example and a deterministic quality path. Maintainers receive a PR record that preserves the difference between static, build, runtime, and advisory evidence.

The workflow adds duplicate document work on `master` because deployment and quality reports are intentionally separate. It also leaves real Profile installation, unload verification, provider evaluation, and security review as explicit future work rather than silent assumptions.
