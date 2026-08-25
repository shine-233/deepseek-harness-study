# Agent Note: ACP bridge lab — a three-lane sequence simulator for the automation wire

Status: implemented

[Chinese](2026-08-26-acp-bridge-lab.zh.md) | English

## Problem

Coverage audit against the pinned upstream tree showed the `packages/acp` group had no dedicated lab of its own, even though it owns the most counter-intuitive wire contract in the harness: the prompt-level stopReason vocabulary is narrower than the turn-level one (`max-tokens` and hook-driven `aborted` both report `end_turn`; `cancelled` is reserved for explicit `session/cancel` and disposal), cancellation has three distinct windows with different observable outcomes, and only committed assistant text ever reaches the client.

## Decision

A standalone model/view/page trio following the house contracts, grounded line-by-line in upstream `packages/acp/acp/src/index.ts` and `codec.ts` at `aa6c361a`:

- **Pure model** (`acp-lab-model.js`, DOM-free): builds a tick frame sequence for one prompt across three lanes (automation client / ACP bridge / DSH agent). Inputs: content-block count (1–8 clamped), cancel timing (`off`/`admission`/`queued`/`claimed`), turn ending (`completed`/`max-tokens`/`aborted`/`interrupted`/`error`). Frames carry lane, direction, label, and a detail sentence naming the source rule.
- **Real mechanics, not scripts**: admission abort means the message never enters the inbox and produces zero notifications; once queued, cancel forwards as `agent.cancel({kind:'user'})` but `cancelRequested` still wins settlement; mid-stream cancel surfaces `turn/end interrupted` yet still settles `cancelled`. Error endings reject the prompt instead of producing a stopReason.
- **Independent oracle** recomputes four rules from the frames (uplink-only updates, admission-cancel cleanliness, mapping-table conformance, one-prompt slot), never reading view state.
- **View** renders an SVG sequence diagram with animated dash-flow on the current frame, a stepper driven by the shared `bindAutoAdvance` engine (speed selector included), click-to-seek message log rows (`data-index` delegation), scrub-on-plot, URL-hash state, and a stopReason lookup table rendered from the same rules array the model uses.
- **Prediction gate**: "max-tokens ends the Turn — what does session/prompt answer?" with the wrong answers being exactly the two plausible misreadings (turn-level vocabulary passthrough; anything-incomplete-equals-cancelled).

Registration: `LAB_PAGE_IDS` gains `'acp'` (progress recording), `STEPPER_LABS` gains `['acp','acp']` (playback wiring gate), lesson 07 links it next to the ACP example mention.

## Alternatives considered

Building on the concurrent zero-skip ladder primitive (`study-lab-ladder.js`) — rejected for now: that module is uncommitted work from another session; coupling to a moving API risks breakage on either side. Revisit after it lands.
Modeling `requestPermission` round-trips too — deferred to the approval-flow lab's scope; this page stays single-concept (one prompt's lifecycle).

## Consequences

Lab count reconciles at 56 in home metrics. New `acp-lab.test.mjs` pins seven model contracts (all-input-oracle-pass, admission-cancel cleanliness, cancelRequested priority, mapping conformance per ending, error rejection, chunk clamping). Full suite: 847 study-tools tests pass; publication gates report 120 built pages and 16,406 resolving links; labels/a11y/prediction-gate/playback contracts all green on the new page.
