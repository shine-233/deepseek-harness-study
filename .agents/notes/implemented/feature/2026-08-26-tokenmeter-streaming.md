# Agent Note: tokenmeter upgrade — structured estimation and a streaming timeline

Status: implemented

[Chinese](2026-08-26-tokenmeter-streaming.zh.md) | English

## Problem

The full-lab audit classified tokenmeter as the weakest lab in the set: a calculator in a shell. Its estimator was flat `ceil(chars/4)`, which both under-represents the upstream heuristic it claims to teach (`packages/llm/token-meter/src/estimate.ts` prices per block with structural overhead, splits tool-call name from arguments, recurses into tool results, and adds role framing to headers) and had no time dimension — nothing moved, so pressing play was impossible.

## Decision

Keep every existing contract (model API, oracle checks, prediction gate, page ids), then add the two missing dimensions:

- **Structured estimation, ported not invented.** `estimateBlocks` mirrors upstream `estimate.ts` rule by rule: text at `⌈chars/4⌉ + BLOCK_OVERHEAD(4)`; tool-calls pricing name and arguments separately plus overhead; tool-results recursing into nested content plus overhead; system header via `estimateSystemTokens` adding `ROLE_OVERHEAD(4)`. Constants are exported (`METER_ESTIMATE_CONSTANTS`) and pinned by test. A new optional `withToolPair` input adds a read_file call/result pair to the new surface so the ledger shows all three block kinds.
- **Block ledger rendered on-page**: one row per content block with its formula and tokens; rows plus header sum exactly to totalTokens (test-pinned).
- **Streaming timeline** (`buildStreamFrames`): chunks arrive tick by tick (count derived from newChars, 1–12), each frame recomputes the replay reading through the real model function, and the final frame is the verdict moment — usage lands and attribution switches to measured, or stays estimated. Totals never decrease; final frame equals the static model's total.
- **View**: gauge bar widths now tween via rAF (reduced-motion drops straight to end values); a stepper row (`bindAutoAdvance`, speeds 0.5–4×) drives the timeline with click-to-seek log rows; the fill bar animates via CSS transition.

One real accounting bug was caught by the new sum-to-total test during development: my first cut derived surfaceDelta as `everything − baseline`, which dropped the header from the measured-path total. Fixed to the explicit attribution form: measured baseline = header + existing surface, delta = new surface only; estimated baseline = header, delta = all surface. Both paths land on header + all-surface, preserving the dual-kind totals identity the page teaches.

Registration: `STEPPER_LABS` gains `['tokenmeter','tmk']`. Lesson copy untouched — the lesson already describes this meter correctly; only its proof got stronger.

## Alternatives considered

Shipping a real tokenizer vocab in-browser — rejected: DeepSeek's tokenizer data is not in the pinned tree and an OpenAI vocab would fake provider numbers, violating the page's own cannotProve list. The honest upgrade is faithful structure plus visible time.
Rewriting the page shell — rejected: the hero/gate/evidence layout passed every label and a11y gate; only sections were added.

## Consequences

study-tools suite grows 847 → 854, all green; publication gates report 120 built pages / 16,406 links / home metrics reconciling at 57 labs. The lab moves from STATE-DISPLAY toward SIMULATION in the audit's taxonomy: parameters now produce time-evolving frames instead of a single recomputation.
