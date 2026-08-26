# Agent Note: Zero-skip concept ladder primitive and the waterfall flagship lab

Status: implemented

English | [中文](2026-08-25-zero-skip-concept-ladder.zh.md)

## Problem

An honest gap analysis against Bartosz Ciechanowski's interactive articles found that this study site's labs are excellent single-point interactions but weak as concept sequences: a reader jumps from a prediction gate straight to a fully assembled timeline, and the intermediate conceptual steps are left to prose. The gap is pedagogical sequencing, not code architecture — rewriting all ~50 existing labs would risk every working page while fixing content last.

## Decision

[website/public/study-lab-ladder.js](../../../../website/public/study-lab-ladder.js) ships a reusable zero-skip concept ladder (`createConceptLadder`): each rung carries exactly one concept, one interactive micro-simulation, and at most four sentences of prose; the next rung stays collapsed until the reader completes the required interaction with the current simulation (`api.engage()`), and an escape hatch (「展开全部台阶」) keeps reference use viable without making skipping the default. Rung progress persists per tab via sessionStorage; sims receive `api.everyFrame` (offscreen-paused frames) and honor reduced-motion signaling.

[waterfall-ladder-lab.html](../../../../website/public/waterfall-ladder-lab.html) is the first lab on this primitive, teaching Cordis waterfall semantics in five rungs: dispatch → registration order → `next()` value threading → short-circuit → who may short-circuit. Its pure model ([waterfall-ladder-model.js](../../../../website/public/waterfall-ladder-model.js)) mirrors [vendor/cordis/src/events.ts](../../../../vendor/cordis/src/events.ts) and the waterfall section of [docs/cordis-primer.md](../../../../docs/cordis-primer.md); `evaluateWaterfall` re-derives the four teaching claims from each trace, independent of the animation. The site-wide prediction gate contract still applies: the reader commits to the short-circuit outcome before rung one.

A second shared engine followed once the retrofit decision landed: [study-lab-trace-ladder.js](../../../../website/public/study-lab-trace-ladder.js) renders any model's swim-lane step trace (`{lane, phase, detail}`) with a sweeping playhead, so a lab joins the ladder program by mapping its own scenarios into per-rung traces instead of hand-building canvas scenes. Migrated on this engine: turn-flow (5 rungs), plugin-flow (4), session-log (4), llm-stream (2), compaction (3), storage-hub (4), worker-protocol (3), code-run (3), typert (3), approval-flow (3), guard-loop (3), jobs (3), orchestration (3), invariant (3), tool-visibility (3), session-fork (3), subagent-delegate (3). Remaining labs follow the same recipe when touched; `study-tools/study-lab-trace-ladder.test.mjs` pins the ≤4-sentence prose rule mechanically and keeps the migrated-roster comment current.

Second batch (11 labs): preset, checkpoint, identity, time, attachment, feedback, credential, settings, plan-stack, tool-budget, acp-lab. The six small-seams pages among them integrate at the generator layer instead of per page: the HTML shell emits the mount point from `config.ladder` in [gen-small-seams.mjs](../../../../study-tools/gen-small-seams.mjs), and [small-seams-runtime.js](../../../../website/public/small-seams-runtime.js) mounts `replayRungs(config.ladder.rungs)`; models without step timelines (plan-stack, tool-budget) get an explicit enumeration layer that turns each decision sequence into trace steps quoting model fields verbatim. `createConceptLadder` now lazily injects its shared stylesheet once per page, so the seventeen earlier pages render styled rungs without editing their HTML.

Third batch (19 labs): client, provider, mcp, selfmod, subprocess, lsp, wire, shell-seam, trajectory, skill-catalog, context, query, sandbox, workspace, host-gateway, spill, fs-edit, code-mode-evidence, tokenmeter. Multi-panel pages (client, provider) map each panel's state sequence into traces; shell-seam walks the spec entries with their `source` tags as phases; code-mode-evidence feeds its own exported `simulateCodeMode` events straight into the engine; fs-edit quotes the pipeline stages including match-count outcomes.

Final batch (9 labs never on any queue): workflow-node, web-tool, terminal, session-projection, prompt-assembly, profile-loader, package-graph, hook-flow, goal-loop — completing all 57 offline labs. Non-timeline models get honest enumerations: prompt-assembly walks its segments with byte counts and sources; package-graph ranks hubs by `dependedOnBy` and groups by package count from the static fixture (imported as JSON instead of the page's runtime fetch); workflow-node replays the run's event records; goal-loop replays its tick frames verbatim. terminal carries two rungs rather than three — two scripts exist, and padding would invent content.

Post-coverage interaction audit found the trace figures passive — replay was watch-only, far from the Ciechanowski standard every figure is built on. The engine now treats the figure as the controller: horizontal pointer drag drives the playhead directly (autoplay yields while dragging), clicking any step dot jumps to it, arrow/Home/End keys step when the figure is focused, and a ×1/×2/×4 toggle speeds long traces (compaction's 48-step rung replays in ~5s at ×4). The figure exposes slider semantics (`role="slider"` with live `aria-valuenow`) so screen readers track the same step sighted readers see. All manipulation counts as real interaction for the unlock contract; one shared-engine change carried it to every trace page at once.

Two follow-ups closed the remaining gaps. Small-seams rungs that teach a specific input gained `apply` — an "install into the form below" button that loads the exact control values the trace demonstrates, so ladder and sandbox stop being two separate worlds. The waterfall flagship canvas became a playhead too: pointer drag or Home/End reconstructs the world frame-by-frame from the cue list (`role="slider"`, autoplay yields, untouched semantics preserved). A second 3D page was evaluated and rejected: session-fork's data is a two-rail shared-prefix timeline, not a tree — dimensional decoration without information is exactly what the slop gate forbids, and package-graph already carries the one genuinely spatial model.

Registration points kept in sync: the `study-labs.html` roster card, `study-labs.js` TRACKED_LAB_IDS, `study-progress-core.js` LAB_PAGE_IDS, `public/llms.txt`, and the static no-JS counters (55 labs).

## Alternatives considered

- **Retrofit every existing lab into a ladder at once** — rejected as a big-bang rewrite; superseded by the trace-ladder engine, which makes per-lab migration cheap enough to run as an ongoing batch (five labs migrated on day one).
- **Hard-lock progression with no escape hatch** — rejected: zero skipped *steps* is about concept ordering, not trapping readers who need reference.
- **Drop the prediction gate because the ladder already sequences learning** — rejected: the contract is repository-wide and tested; committing to an answer before rung one is concept zero, not friction.

## Consequences

- New concept-driven labs should build on `createConceptLadder` rather than hand-rolling step gating.
- The primitive deliberately does not own canvas rendering; each sim draws its own scene so rung visuals can differ as much as they need to.
