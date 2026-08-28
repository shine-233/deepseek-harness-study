# Agent Note: schedule lab

Status: implemented

[Chinese](2026-08-26-schedule-lab.zh.md) | English

## Problem

Fills the schedule/time roadmap gap from the HANDOFF remaining-gaps audit (priority right after goal): lesson 37 covers schedule in one paragraph and explicitly defers real trigger timing to runtime evidence. Readers had no offline way to see how `schedule/change` events fold into durable reminders, why a fixed-rate reminder that sleeps through several intervals does not replay a backlog, or what the fork seed boundary does to inheritance.

## Decision

A tick-frame simulator over a fixed teaching clock (2026-08-26T00:00Z — deterministic, never reads the wall clock). Three scenarios mirror upstream domain.ts (aa6c361a): one-shot dispatch removes the record; fixed-rate dispatch carries `acceptedAt`, answers only the latest anchor-aligned occurrence and writes the next occurrence back (missed beats are skipped, never enumerated); fork cuts the log at seedLength so the child inherits nothing and reuses the parent's id space legally. The oracle replays create/dispatch per ownership segment from frames alone (unique ids per segment, every-floor 300s, dispatch targets active, one-shot fires at most once, catch-up alignment, fork inherits nothing). Follows the current house pattern end to end: zero-skip concept ladder, prediction gate, stepper with shared playback engine (`sch-` prefix registered in STEPPER_LABS and LAB_PAGE_IDS), boundary card, `#state=` persistence, viewport-fit=cover. Lesson 37 links it in the Schedule section; README/START-HERE lab counts move 58 → 59.

## Alternatives considered

- Modeling the `at` form with real time-zone resolution — rejected: Intl calendar math would dominate the frame budget without adding a teaching rule beyond one-shot removal, which `after` already shows.
- Letting readers edit events freely — rejected for the same reason as goal-loop: it turns the lab into a debugger and invites malformed input far from the teaching point.
- Driving the real scheduler with fake timers — rejected: needs a running harness session, breaking the offline-deterministic contract every lab shares.

## Consequences

study-tools gains schedule-lab.test.mjs (5 tests). The lab count prose in README.md, README.zh.md and START-HERE.md is gate-pinned to 59; the next lab must move all five mentions again.
