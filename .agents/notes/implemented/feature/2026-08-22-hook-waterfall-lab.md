# Agent Note: Hook waterfall lab makes the next() short-circuit rule hands-on

Status: implemented

English | [中文](2026-08-22-hook-waterfall-lab.zh.md)

## Problem

Lesson 14 teaches the repository invariant that a waterfall listener must call `next()` to delegate; returning without it short-circuits the chain and later listeners never run. The lesson stated the rule in prose, tables and one mermaid diagram, but a reader could not see the consequence move: which listeners execute, what the fallback does with an existing versus missing result, and who ends up as the result's author. The lab inventory also had no experiment covering the hook/waterfall theme (the bridge page is a file-exchange workbench, not a model lab).

## Decision

A new model lab `hook-flow` ships as four files under `website/public/`: `hook-flow-model.js` (pure timeline), `hook-flow-lab.html`, `hook-flow-lab.js` (render layer), `hook-flow-lab.css`.

- Three listeners on one dispatched event: audit (always records once, always delegates), policy (input-controlled behavior and verdict), fallback (writes allow only when the chain carries no result; otherwise passes an existing decision through).
- Two inputs form the state schema: `behavior` (`call-next` | `return-direct`) and `verdict` (`allow` | `deny`). Both are validated enums in `HOOK_STATE_SCHEMA`; hash-state links round-trip like every other lab.
- Five-check oracle recomputes the timeline independently: determinism, short-circuit iff return-direct, declaration-order delegation, audit-exactly-once-and-delegates, and final-result authorship consistent with the short-circuit state.
- Prediction gate asks the reader to bet on the `return-direct` + deny case before unlocking controls; wrong answers unlock anyway, and each explanation names the oracle checks that settle it.
- Full text-alternative table lists every step with its lane, action and delegate call. No canvas, no network, CSP `connect-src 'none'`.
- Lesson 14 embeds the widget after its evidence-scope blockquotes with a degradation link; the lab hub gains an eleventh card in the evidence group wired to lesson 14 through the existing progress whitelist (`LAB_PAGE_IDS`) and count markers.

## Alternatives considered

**Modeling Cordis waterfall semantics beyond the taught invariant** (undefined-return handling, argument mutation across `next`). Rejected for this lab: those behaviors need upstream source evidence to be honest; the lab keeps `cannotProve` explicit about them instead.

**Placing the lab in the plugin group on the hub.** The bridge theme sits in the boundaries/handoff group with the research-debug workbench, so the card uses `data-group="evidence"` and links lesson 14.

## Consequences

Count contracts were moved together: the three-boundary-id assertion now requires ten model labs, the hub title/meta and built-site marker say eleven, README tables list the new row, START-HERE/SITE-HOME wording matches, and `LAB_PAGE_IDS` includes `hook-flow` so hub progress counts it. The dedicated suite `study-tools/hook-flow.test.mjs` pins determinism, the full input grid against all five oracle checks, lane membership, short-circuit semantics, audit accounting and page wiring.
