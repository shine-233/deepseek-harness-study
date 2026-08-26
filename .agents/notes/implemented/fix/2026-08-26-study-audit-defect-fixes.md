# Agent Note: full-site audit defects and their fixes

Status: implemented

[中文](2026-08-26-study-audit-defect-fixes.zh.md) | English

## Problem

A whole-repository audit (38 lesson pages, 56 labs, shared engines, upstream
spot-checks against `aa6c361a`) confirmed four defects:

1. `study/22` carried a physically truncated sentence: the sandbox-lab promo
   had been inserted mid-word between 证 and 据.
2. `README.md` line 89 wrote the link text `[29/34]` but linked only to lesson
   34; lesson 29 is the quality-review lesson, not Debug collaboration
   (lesson 36). `README.zh.md` dropped the 36 link entirely.
3. `createTraceLadderSim` auto-replayed 900 ms after load and invoked
   `opts.onReplayed`, which every `replayRungs` consumer wires to
   `api.engage()`. The documented ladder contract — the next rung stays folded
   until one real interaction — was therefore void across all consuming labs.
4. The context lab asked readers to predict same-directory deduplication, but
   the teaching filesystem contained no duplicate pair, so the scenario could
   never occur and `observations.deduplicated` was the constant `0` while
   `canProve` claimed the rule.

## Decision

- Repaired the lesson 22 sentence and moved the lab promo into its own
  paragraph.
- Both READMEs now link Debug collaboration (36) and author judgment (34)
  separately.
- `study-lab-trace-ladder.js` tracks user-initiated replays only; the load-time
  preview and the reduced-motion initial render still animate but no longer
  call `onReplayed`, so ladders unlock exclusively through real interaction.
- `context-model.js` accepts a `sameDirDuplicate` input that overlays a
  byte-identical `AGENTS.md`/`CLAUDE.md` pair onto `packages/app`; discovery
  returns `{ chain, duplicatesSkipped }`, the observation counts real skips,
  and the oracle gained `DEDUP_APPLIED`, which rejects a projection that hides
  an applied dedup. The lab exposes the scenario as a checkbox and reports the
  skip count in feedback.

## Alternatives considered

- Removing the autoplay entirely: keeps the gate honest but sacrifices the
  first-impression motion every static render relies on; gating the callback
  achieves the contract at lower cost.
- Hardcoding a duplicate pair into the base filesystem: changes every existing
  scenario's chain and breaks the global-first narrative; an overlay keyed by
  input leaves default behavior untouched.

## Consequences

- Ladder progression now genuinely requires interaction; readers who only
  scroll stay at rung one until they press 重放 or switch traces (or use the
  explicit 展开全部 escape hatch).
- `discoverInstructionChain` changed its return shape; the only callers are
  within `context-model.js`, and `study-tools/context.test.mjs` covers the
  applied, not-yet-reached, and tampered cases.
