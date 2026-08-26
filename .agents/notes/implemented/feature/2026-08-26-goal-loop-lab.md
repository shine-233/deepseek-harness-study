# Agent Note: goal-loop lab

Status: implemented

[Chinese](2026-08-26-goal-loop-lab.zh.md) | English

## Problem

Fills the top roadmap gap (lesson 37 is the thinnest): a tick-frame simulator for tool-ralph's fixed script — one fresh structured-output child per round carrying only the immutable objective plus the previous bounded handoff, with truncation visible when summaries exceed the budget.

## Decision

Three exits modeled per upstream Config defaults (maxRounds 256 clamped to 8 for display, maxHandoffChars clamped to 40–400 chars): continue carries, complete hands to parent, blocked waits for a human; exhausted-budget is its own terminal frame and never masquerades as success. The oracle recomputes handoff-bound, rounds-cap and complete-needs-status from frames alone. Registered in LAB_PAGE_IDS (staged HEAD+goal-loop only — the working file is under concurrent edit) and STEPPER_LABS. Lesson 37 link deferred until that file clears the concurrent sweep.

## Alternatives considered

- Free-form event editing so readers type arbitrary round reports — rejected: it turns the lab into a debugger and invites malformed input far from the teaching point.
- Driving the real subagent runtime live — rejected: it needs an API key and a running provider, breaking the offline-deterministic contract every lab shares.

## Consequences

study-tools at 864 green.
