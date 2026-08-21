# Agent Note: Fork workflow spec pins this fork's own workflows

Status: implemented

English | [中文](2026-08-21-fork-workflow-spec-pins-own-workflows.zh.md)

## Problem

`scripts/ci-workflow.spec.ts` came from upstream, where it validates five workflow files (`ci.yml`, `e2b-e2e.yml`, `python-release.yml`, `build-exe-for-python-sdk.yml`, `issue-lifecycle.yml`). This fork removed all five on purpose — the README documents the two-workflow stance — but kept the spec, so every push failed the `Study material quality` gate with eight ENOENT assertions against files that must not exist. The red gate also buried real signal: nothing distinguished "upstream tests we deleted" from "tests that check what we actually ship".

## Decision

The spec now pins the two workflows this fork ships:

- A closed inventory test: `.github/workflows/` contains exactly `docs-pages.yml` and `study-quality.yml`.
- `docs-pages.yml`: deploys only from master pushes and manual dispatch (no `pull_request` trigger), never cancels an in-progress Pages run, fetches the pinned upstream commit from `study/source-index-manifest.json` before any study gate runs, orders all six study gates before `doc-sync` and the site shell check after it, uploads `website/.dist` through `upload-pages-artifact`, deploys with least-privilege permissions, and keeps production telemetry disabled.
- `study-quality.yml`: stays read-only over contents, gates pull requests and master pushes behind the study path filters, orders install → build → test → lint → doc gates → site check → whitespace check, uploads the named site artifact with `if-no-files-found: error`, and writes the evidence-boundary job summary.
- The lefthook test from upstream remains: frozen Agent Note sidecars stay excluded from the translation-pairing hook.

The filename is unchanged because four inherited notes link to it by relative path. Those notes ([pnpm setup isolation](../bug-fix/2026-07-29-pnpm-setup-runner-isolation.md), [CI failover runbook](2026-07-26-ci-failover-runbook.md), [event-directed PR review status](2026-08-10-event-directed-pr-review-status.md)) describe upstream CI decisions; their descriptions of what the spec asserted are now upstream history, not current behavior here. This note owns the fork's spec.

## Alternatives considered

- **Delete the spec.** Rejected: it would remove the only automated check on the deploy-critical invariants above, and four inherited notes would carry dead relative links.
- **Skip or filter the failing tests.** Rejected: a skipped test still advertises coverage of workflows this fork deliberately does not have, which is exactly the "static result dressed as runtime proof" pattern the study material warns about.
- **Rename to `github-workflows.spec.ts`.** Rejected for now: it breaks the four inherited note links, and renaming buys nothing while those notes stay active.

## Consequences

The quality gate returns green on this fork's actual surface. New workflows cannot appear silently — the inventory test fails until the README's two-workflow claim and the spec are updated together. The cost is that the spec no longer protects upstream-only invariants (Wine jobs, Python release separation); that protection belongs to upstream, where those files exist.
