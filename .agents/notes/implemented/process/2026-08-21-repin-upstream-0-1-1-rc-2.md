# Agent Note: Re-pin the study baseline to upstream 0.1.1-rc.2

Status: implemented

English | [中文](2026-08-21-repin-upstream-0-1-1-rc-2.zh.md)

## Problem

The study material was pinned to `47f943859bef60e4160492346772ded9b24f765a` (root package `0.1.0-rc.5`, 2026-08-13). Upstream had moved 854 commits ahead and npm had published `0.1.1-rc.2` (2026-08-21). A reader comparing the lessons against the current npm package would meet interfaces the text never mentions, and the homepage carried no statement of which baseline the teaching described.

## Decision

The pinned commit is now `aa6c361a972c8369148dea7380bb5c21c24e07ec` — the `release(dsh): 0.1.1-rc.2` commit:

- The source index was regenerated from a full archive of that commit: 2,973 source files across 67 index pages (previously 2,756 / 66; SQL entered the extension whitelist with 56 files).
- The package-graph fixture was regenerated from the new manifest: 227 packages, 50 groups, 1,124 peer edges (previously 219 / 49 / 1,089). Lesson 02, the package-graph lab copy, model comments, and the 3D scene labels quote the new numbers, including the recomputed "top 14 groups hold 72% of lines across 28% of groups".
- All 201 hand-written links to the old commit SHA now point at the new one; `UPSTREAM.md` records the new version, date, tree size (7,903 files), and per-extension counts.
- Stale derived numbers were swept: index counts in 14 lessons, page/test counts in lesson 32, and version strings that still said `0.1.0-rc.5` next to the new SHA.
- Lesson 14's evidence-scope note now states its human review happened on the previous baseline (2026-08-16) and that migration only re-verified link paths, not line-by-line diffs.
- The homepage status strip carries a baseline line: upstream `0.1.1-rc.2`, commit `aa6c361a`, with a link to lesson 18's migration procedure.

Verification after the move: `verify-source-index` (2,973/2,973/0 errors), `audit-source-index-quality`, `verify-study-links` (41 handwritten materials, 0 path errors), and the package-graph model test all pass.

## Alternatives considered

- **Stay on rc.5 and only add a banner.** Rejected: the gap was already one minor line plus 854 commits; every future lesson would be written against a shrinking audience of readers who can reproduce it.
- **Pin to master HEAD (`b150a55`).** Rejected: master moves daily; the release commit is reproducible from npm and gives the index a stable target.
- **Wait for a stable 0.1.x.** Rejected by the maintainer call: the Developer Preview iterates fast, but the migration procedure is scripted and cheap to repeat; deferring would compound drift.

## Consequences

Lessons, index entries, and lab fixtures describe the same tree a reader gets from `npm pack @deepseek-ai/dsh@0.1.1-rc.2`. Hand-written prose that asserts behavior specific to rc.5/rc.6 differences has been updated where detected, but the migration's semantic review is bounded: link-path existence is verified for all 41 materials, while deep behavioral diffs between baselines remain unreviewed except where a lesson calls them out. The homepage baseline line makes that boundary visible to readers.
