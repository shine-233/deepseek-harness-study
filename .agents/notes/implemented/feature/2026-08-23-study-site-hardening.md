# Agent Note: Study-site hardening — dark homepage, index legend, client split, scrollytelling

Status: implemented

English | [中文](2026-08-23-study-site-hardening.zh.md)

## Problem

A second audit pass over the study website found gaps the first hardening round did not cover:

1. The journal homepage shipped one hardcoded light palette, so the VitePress dark theme broke the site's front door.
2. Every generated file-index entry repeated four disclaimer sentences (4 × 2,973 occurrences), and neither the generator nor `verify-source-index.mjs` described the twelfth optional field「测试支持」that entries already emit.
3. `packages-client.md` was a single 3.4MB page (923 cards) — slow to load, hard to scroll, effectively unusable on mobile.
4. Scrollytelling existed only in lesson 04; five labs whose models are deterministic step tables (hook-flow, approval-flow, session-fork, subagent-delegate, guard-loop) had no step-through control; subagent-delegate also carried a duplicate `depth` element key that threw a RangeError on every rebuild.
5. Lesson 02 quoted dependency numbers (218 / 8989 / 32) that contradict its own data file (226 / 9032 / 37); lesson 00's reading table had three stage labels disagreeing with their links; lesson 03 listed a test file that does not exist at the fixed commit; lesson 33 still said "固定 rc.6 源码"; the quiz score line promised re-grading the code cannot do; the labs overview called up/down sorting "drag"; two stamp-card entries linked to the same route.

## Decision

- Homepage: added an `html.dark` override block mapping the journal palette onto night-reading paper colors (colors only, no layout changes); mascot SVG is now keyboard-operable (`role="button"`, Enter/Space); stamp card l00/l01 point at real lesson routes; the "108 中文学习页面" polaroid now tracks current facts.
- Index pages: added `study-tools/migrate-index-legend.mjs`, lifting the four per-entry disclaimers into one legend per page (11,892 duplicated lines removed); `generate-source-index.mjs` emits the legend layout natively; `verify-source-index.mjs` / `audit-source-index-quality.mjs` accept both layouts; `verify-study-links.mjs` now validates `LessonWidget fallback-href` anchors (previously unchecked).
- Client split: added `study-tools/split-packages-client.mjs`; the monolith became an overview directory plus eleven size-bounded part pages (≈ ≤400KB each, all 923/923 entries preserved verbatim); the README navigation table lists real per-page counts; every page-count claim synced to 78 index pages / 119 study pages (README, README.zh, HANDOFF, lessons 08/12/16/20, file-index README).
- Labs: hook-flow, approval-flow, session-fork, subagent-delegate and guard-loop gained steppers (range slider + prev/next + captions taken from model data, ←/→/Home/End keys, URL-hash persistence, lane/table-row highlight sync, existing tokens only); fixed the duplicate `depth` key in subagent-delegate.
- Scrollytelling: `study-scrolly.js` became a scenario registry; new `study-scrolly-beats.js` adds a six-beat session-log scene (log→projection→prefix replay→required unknown→fork inheritance→interrupted-as-unknown) and a four-beat compaction scene (before→replace→keep/drop→oracle), with every number interpolated from the existing deterministic models; beats are buttons, respect reduced-motion, and the prose stands alone without JS.
- Copy and facts: quiz score line no longer promises re-grading; overview label renamed to up/down sorting; lesson 02 numbers aligned to package-graph.json; lesson 00 stage labels aligned to links; lesson 03 dropped the nonexistent agent-loop test path; lesson 33 restated the fixed baseline instead of rc.6.

## Consequences

- Baseline refreshes are now coupled to two scripts: regenerate the index, then re-run `split-packages-client.mjs`, then sync the 78/119 counts everywhere they appear (see Regeneration note).
- `verify-study-links.mjs` validates widget fallback anchors, so a lesson widget pointing at a missing anchor fails the gate instead of silently degrading.
- The steppers originally shipped with hand-verified wiring only; `study-tools/lab-stepper-smoke.test.mjs` later closed that gap by replaying every input combination of all five labs in jsdom and asserting the step bound matches the pure model.

## Alternatives considered

- Keeping the per-entry disclaimer lines but shortening them was rejected in favor of one legend per page: shortening still repeated the same sentences thousands of times.
- Splitting `packages-client.md` into equal-count parts was rejected in favor of size-bounded parts: equal splits could still exceed a usable payload on the densest ranges.
- A virtual-scroll runtime for the client cards was passed over: static bounded pages keep the no-JS reading path intact.

## Evidence boundary

Everything here is static evidence: the study-tools node --test suite, the four validators, and `node --check` on changed scripts. The steppers left no jsdom smoke test behind — they were verified by hand in a browser page by page; future stepper wiring changes should add a replayable smoke. No real DSH, provider, or model ran; `verify-study-home-metrics` pins the visible homepage numbers to repository facts.

## Regeneration note

Re-running `generate-source-index.mjs` on a new baseline produces the legend layout natively, but packages/client collapses back into one file — re-run `split-packages-client.mjs` afterwards and update the 78/119 counts everywhere they appear.
