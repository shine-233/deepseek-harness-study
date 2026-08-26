# Agent Note: failable oracles expand beyond the four flagship labs

Status: implemented

English | [中文](2026-08-26-fault-injection-batch-2.zh.md)

## Problem

Only the four flagship labs (turn-flow, llm-stream, compaction, session-log) shipped tamper experiments: a fault selector that lets a reader break an invariant by hand and watch the oracle turn red with the rule named. The other labs' oracles were tautologies — they re-verified a timeline that could never lie, so "independent verification" demonstrated nothing about what a violation looks like.

## Decision

Six more labs ship the same tamper experiment beyond the original batch of two, each with a single-cause fault whose red points at exactly one check:

- `session-fork-lab.html` — `fake-result-ok`: for the crash-mid-tool shape, the unknown repair step is replaced with a fabricated "result ok" entry. `REPAIR_HONESTY` catches it while `NO_GHOST_SUCCESS` is deliberately fooled (the forged result satisfies the intent-needs-destination scan), which is itself part of the lesson: checks must be layered because each one has blind spots. Ineffective outside that crash shape.
- `invariant-lab.html` — `swallow-violation`: when a real violation ran, the fail() step is removed from the timeline and the error record blanked. `FAIL_ATTRIBUTES_PACKAGE` catches the missing error credentials; the ineffective case (checks filtered off) says so instead of pretending.
- `tool-visibility-lab.html` — `ghost-allow`: one scope-blocked tool is moved into the allowed-execution set with level, blocked-by reason and observation counts all updated coherently. Every page readout stays self-consistent and only the nesting rule `ALLOWED_SUBSET_VISIBLE` can catch the forgery.
- `guard-loop-lab.html` — `overreach-block`: the final call is marked as blocked by the reminder plugin, which only ever had advisory power. The ledger shows N−1 executed / 1 blocked and `ADVISORY_ONLY` catches the breach; ineffective when the guard is off or the last attempt sits on a threshold (that would dirty chain accounting too).
- `subagent-delegate-lab.html` — `run-rejected-child`: after `SubagentDepthError`, child create/run/settle steps are forged anyway. `REJECTION_RULE` requires an empty child lane when a rejection happened; ineffective below the depth cap.
- `plan-stack-lab.html` — one selector, per-panel faults: `bump-counts` breaks the todo ledger (`COUNTS_MATCH_ITEMS`), `fake-commit` forges a busy-time suspension into an immediate commit (`IDLE_COMMITS_BUSY_QUEUES`), `fake-rearm` forges a disarming verb back to armed (`ARMING_MATCHES_VERB`). A wrong-panel or unmet-precondition combination prints why instead of failing silently.

All ten follow the flagship mechanics: the fault is a validated model input (`none` is the only default; unknown types throw at the model boundary), the oracle keeps recomputing its rules from raw state, and the fault select participates in each page's `#state=` link schema where the page has one (plan-stack never shipped state links). The fault note names the tripped check id and why that check exists.

## Consequences

The tamper-experiment pattern now spans ten labs covering six violation shapes: dropped evidence (turn-flow, compaction), forged evidence (session-fork), swallowed evidence (invariant), inconsistent evidence (tool-visibility), overstepping authority (guard-loop), and rejected work leaking through (subagent-delegate) plus forged conclusion fields (llm-stream, session-log, plan-stack). Remaining labs still have tautological oracles; extending them needs a per-model decision about which invariant a reader should break, not more shared machinery.

Faults mutate built model objects (`applyXFault`) rather than threading through every build helper, so each model owns one mutation site. A future model change that renames mutated fields must update the fault appliers in the same change. Single-cause discipline constrains where a fault may fire: guard-loop refuses injections that would dirty two ledgers at once.

## Alternatives considered

**A generic fault framework driven by per-lab config.** Rejected for now: each lab's teachable violation differs in shape (drop a log write vs forge a result vs blank an error vs block a call), so a shared engine would need per-lab hooks everywhere while hiding the single mutation site this design relies on. Revisit only when another shape appears.

**Failing multiple rules per fault for louder drama.** Rejected: the flagship convention is that red has exactly one cause, which is what makes the named-rule note trustworthy.

## Testing

Model tests assert the exact red-check set per fault plus ineffective-case green and loud failure on unknown fault types (`session-fork.test.mjs` 11 pass, `invariant.test.mjs` 9 pass, `tool-visibility.test.mjs` 15 pass, `guard-loop.test.mjs` 19 pass, `subagent-delegate.test.mjs` 15 pass, new `plan-stack.test.mjs` 4 pass). Playwright acceptance drives all six pages end to end: baseline green, injected red with the note naming the rule, ineffective combination green with the explanation visible, revert to green, and state-link presence where the page ships it. Full smoke passes 9/9 and `pnpm run website:build` stays five-green.
