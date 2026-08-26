# Agent Note: trajectory lab — the event stream becomes an input, not a constant

Status: implemented

[Chinese](2026-08-26-trajectory-scenarios.zh.md) | English

## Problem

The audit classified trajectory as "a slideshow with a play button": fourteen events frozen in a constant, one knob (replay up to N), no forks, no hypothesis testing. The presentation contract it teaches is real, but the page could only ever demonstrate that contract against a single hand-picked stream.

## Decision

Make the stream an input while keeping every existing contract:

- **Four scenarios** (`TRAJECTORY_SCENARIOS`): `canon` (the original 14-event stream, byte-identical to before), `unknown-tool` (web_search appears — exercising the conservative fallback path), `interrupted` (the turn dies mid-chunk, so the draft card stays streaming forever), and `failing-tool` (str_replace errors out but still settles into its diff view).
- **Fallback views** for tools outside `TOOL_VIEWS`, matching upstream's conservative default: generic pending card, generic result card. Previously an unknown tool would have crashed the projector.
- The oracle grows three scenario-specific checks (unknown-tool fallback, interrupted-draft-never-finalizes, failed-tool-still-settles) alongside the existing five; canon replay bounds skip checks that cannot apply to them.
- View: a scenario select joins the form; the step slider's max now follows the composed stream length and clamps on switch; state hash carries the scenario.

## Alternatives considered

Free-form event editing (user types arbitrary JSON events) — rejected: it turns the lab into a debugger and invites malformed input far from the teaching point. Four curated scenarios cover each contract branch with zero-invalid-input guarantees. Also rewriting subagent-delegate in the same pass — deferred; it deserves its own spawn-tree simulation and its own note.

## Consequences

trajectory.test.mjs keeps all five original tests verbatim and adds three scenario tests (23 total on this file; 860 across study-tools). The lab moves from playback to simulation in the audit taxonomy: the user now perturbs the input stream and watches the projection contract respond. Lesson copy untouched — lesson 05 already describes this projection correctly.
