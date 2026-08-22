# Agent Note: Study lab state lives in the URL hash

Status: implemented

English | [中文](2026-08-21-study-lab-state-links.zh.md)

## Problem

The lesson labs kept their input only in memory: a learner who set a scenario, tuned the step slider, and refreshed the page started over, and there was no way to hand an exact experiment state to someone else. The QA gap list carried "export/import and refresh persistence" as unclosed. Browser storage was not an option — the site promises no localStorage for learning state, and the theme toggle's storage is a separate, explicitly local convenience.

## Decision

A shared module, [`website/public/study-lab-state.js`](../../../../website/public/study-lab-state.js), owns four pure functions:

- `encodeState(value, schema)` canonicalizes field order by the schema before serializing, so the same input always produces the same bytes.
- `decodeState(text, schema)` returns `{ ok, value }` or `{ ok: false, error }` and never throws; it rejects unknown fields, missing fields, wrong types, out-of-range integers, and values outside an enum.
- `readStateFromHash(hash, schema)` returns `null` when the hash has no `state=` segment (a first visit is normal, not an error) and a structured result otherwise.
- `writeStateToHash(hash, value, schema)` replaces only the `state=` segment and preserves unrelated anchor segments.

[`turn-flow-lab.js`](../../../../website/public/turn-flow-lab.js) wires them: every successful rebuild persists `{ scenario, upTo }` into the hash via `history.replaceState`, boot restores controls from a valid hash before the first render, an invalid or missing hash falls back to defaults silently, and a "复制状态链接" button copies the full URL. `replaceState` failures (file://, sandboxed contexts) are swallowed — the state link is an enhancement, never a prerequisite. The upper bound of `upTo` is validated at apply time against the current scenario's step count; the schema only pins the integer lower bound.

Ten deterministic tests in [`study-tools/study-lab-state.test.mjs`](../../../../study-tools/study-lab-state.test.mjs) cover round-trips, byte-stability across key order, schema violations, corrupt payloads, anchor preservation, and page wiring.

All six remaining model labs now wire the same contract. Session-log mirrors turn-flow (enum scenario plus bounded range). Tool-visibility persists checked bundles with two enums; its schema uses a `stringList` rule whose entries must come from the model's known bundle list. Package-graph builds its group enum from the loaded fixture at boot and validates a restored group against the live options, so links survive fixture changes by falling back to the overview. Profile-loader persists a reorderable bundle sequence plus an overlay enum and a broken-reference toggle; the module gained a `boolean` rule, and the page additionally requires a restored order to be a permutation of the default before applying it. Code-mode persists a uint32 seed, one of three teaching policies, and the parallelism cap; frame position stays out of the state because timeline position is playback, not input. The research-debug bridge deliberately stays outside: its input is user-selected evidence files, which a URL cannot carry.

## Alternatives considered

- **localStorage / IndexedDB.** Rejected: the course's privacy stance keeps learner state out of browser storage, and stored state cannot be shared by pasting a link.
- **Clipboard-only export/import buttons.** Rejected: clipboard round-trips lose the state on any page navigation and need permission prompts; the URL is already a durable, shareable carrier.
- **Wire all labs now.** Deferred: each lab has its own input contract and deserves its own schema decision; one wired flagship plus tested primitives beats six rushed wirings.

## Consequences

Refresh, bookmarking, and link-sharing now reproduce an exact turn-flow experiment state without storage, network, or accounts. The hash is user-visible, which doubles as honest labeling of what persists. Costs: URLs carry encoded state (longer links), and labs that adopt the module must define a schema before persisting — there is no generic escape hatch for unvalidated state.
