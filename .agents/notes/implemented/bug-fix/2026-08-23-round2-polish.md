# Agent Note: Round-2 polish — stepper parity, varint fidelity, dark-mode gaps

Status: implemented

English | [中文](2026-08-23-round2-polish.zh.md)

## Problem

A second audit pass over the newly rewritten labs and the companion feature found:

1. A MutationObserver self-sustaining loop in `study-progress.js`: every DOM mutation (including the widget's own insertions and each quiz submit) scheduled a teardown + rebuild, so a lesson page degraded forever after the first interaction (jsdom: quiz section copied 38x in 5s).
2. Stepper parity gap in guard-loop: lane dots lacked `data-step`, step position was not persisted to the URL hash, and switching enum inputs did not pull the playhead back to the end — the only one of the five stepper labs missing these.
3. Fidelity claims outrunning code in two models: sqlite-row decode rejected large-but-legal zigzag values (limit 2^52 instead of 2^54) and missed non-canonical-varint rejection while claiming "byte-for-byte port"; subagent-delegate attributed `UNSUPPORTED_CAPABILITY` to tool-plugin mount time when that error belongs to service-layer `start()` per-request rejection. One oracle check was tautological (`every(step => true)`), another compared a function against its own formula.
4. Dark-mode gaps: journal Turn-track active step was unreadable (#1d4477 on #2e4059, ~1.07:1) because `.dj-on i` out-specifies the dark override block; mermaid diagrams stayed light-themed.
5. Copy/facts: mascot "done" line promised homepage stamp integration that does not exist; lesson 05 said 前三拍 where four beats share the component's model; session-log reset left the SQLite toggles at user-chosen values; packed rows had no visual state; schema pill did not mention it is the pinned-baseline value.

## Decision

- study-progress.js: observer now compares the normalized lesson id and skips rebuilds when nothing changed; teardown+rebuild happens only on a real route change.
- guard-loop-lab.js: dots carry `data-step` and sync with the playhead; SCHEMA/persist include `step`; enum changes rebuild then jump to the last step (mirrors approval-flow).
- sqlite-row-model.js: non-first varint bound raised to `MAX_SAFE_INTEGER * 2n`; trailing-zero-group varints rejected as non-canonical (interior zero groups stay legal); wording no longer implies the encoder sorts.
- subagent-delegate-model.js: capability error layering corrected in header comment and canProve; tautology removed; MONOTONE_HEADER now checks hand-computed expectations.
- guard-loop-model.js: detailed reminder text restored to the full upstream sentence.
- JournalHome.vue: dark override for the active Turn step; reading.css: mermaid inverted under `html.dark`.
- session-log: reset also restores SQLite toggles and re-renders the panel; packed/plain rows get distinct first-cell styling; schema pill notes it is the aa6c361a value.
- study-companion.js: honest done lines, comment matches actual route behavior.
- verify-built-study-site: REQUIRED_PUBLISHED_ASSETS now pins the four runtime scripts so their loss fails CI.

## Consequences

- The four pinned runtime scripts are now publication-required: deleting any one of them fails CI instead of silently degrading the labs.
- The varint decoder got stricter: trailing-zero-group bytes that the previous model accepted are now rejected, so any fixture or state link carrying such bytes must be regenerated.
- Progress rebuilds fire only on a normalized lesson-id change. Same-lesson mutations (quiz submits, companion insertions) no longer rebuild — and by design, a future route change that keeps the id stable will not rebuild either.
- Dark-mode mermaid inversion applies to every diagram rendered under `html.dark`, including diagrams added later.

## Alternatives considered

- Closing the stepper parity gap by removing steppers from the other four labs was rejected: the parity direction was upward.
- Keeping the 2^52 varint bound while softening the fidelity wording was rejected: matching upstream decode behavior was the point of the port.
- Throttling progress rebuilds with a timer was rejected in favor of comparing the lesson id: the comparison removes the wasted work entirely instead of delaying it.

## Evidence boundary

node --test across study-tools (388 passing), node --check on changed scripts, encode/decode round-trip probes including interior-zero-group and trailing-zero cases, plus the full `pnpm run website:build` gate chain locally green before push. No real DSH, provider, or model ran; dark-mode contrast was reasoned from selectors, not screenshot-measured.

## Environment note

The earlier host-wide ESM segfault (0xC0000005) resolved itself before this round; pre-commit hooks were exercised normally here.
