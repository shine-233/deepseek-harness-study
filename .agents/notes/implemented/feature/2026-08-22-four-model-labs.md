# Agent Note: Four model labs cover approval, fork recovery, delegation and loop hygiene

Status: implemented

English | [中文](2026-08-22-four-model-labs.zh.md)

## Problem

The lab audit left four taught mechanisms without a hands-on experiment: the ask/approval lifecycle and its fail-closed degradation, Session fork prefix inheritance plus crash repair to `unknown`, subagent delegation bounded by depth at a boundary check, and loop-hygiene threshold blocking whose rejections are monotonic against post-execute undo attempts. Each rule was prose-only; each is exactly the kind of consequence a reader will not believe until they flip the switch themselves.

## Decision

Four model labs ship under `website/public/`, each as `*-model.js` + `*-lab.html` + `*-lab.js` + `*-lab.css` with the shared gate, hash-state link, oracle card, evidence boundary and full text-alternative table:

- `approval-flow`: responder (`ui-answerer` | `none`) × decision (`allow` | `deny`). Encodes lesson 13's fail-closed rule verbatim — no answerer degrades to denial, body never runs; allow executes the body exactly once; deny/absence converge into the unified result classification.
- `session-fork`: crash (`complete` | `crash-mid-tool`) × fork (`no-fork` | `fork`). Fork inherits the parent prefix (seed length 2 after a crash, 3 after a complete turn) with parent/seed/boundary recorded; recovery adds exactly one `interrupted` repair marked unknown; `NO_GHOST_SUCCESS` forbids any intent without a result or unknown marker.
- `subagent-delegate`: depth (`within-limit` | `beyond-limit`) × outcome (`report` | `fail`). Beyond-limit delegations are rejected at the boundary and spawn no child steps; accepted ones run on the child lane only and settle exactly once, where a failure report counts as a full settlement.
- `guard-loop`: attempts (1–5) × guard on/off with threshold 3. Blocks start at attempt three before execution; execution + blocked always equals issued; the single post-execute undo attempt has `undoWorked: false` structurally (monotonic).

Lesson embeds: 05 (fork), 13 (approval), 22 (guard), 03 (delegation), each with a degradation anchor to an existing heading. Registry updates moved together: model-lab count assertion 10→14, `LAB_PAGE_IDS` gains four ids, hub title/meta/h1 say fifteen and gain four cards in main/plugin groups, built-site markers require two of the new `data-lab` attributes plus the fifteen string, README tables add four rows, START-HERE/SITE-HOME wording says fifteen, and JournalHome's polaroid/chips enumerate through 其十五.

## Alternatives considered

**Modeling real Cordis undefined-return handling for waterfalls or real approval timeouts.** Kept out of scope per lab `cannotProve`; those need upstream source evidence to stay honest.

**Separate notes per lab.** One note covers the batch because the four labs share the template, the registration sweep and this count migration; per-lab specifics live in the dedicated suites.

## Consequences

The homepage learning-test metric grows by the thirty-two declared cases in the four new suites; the committed status strip records 298 (+8 example). The homepage itself is being migrated to a `JournalHome` component by parallel work — its polaroid and chip list were updated in the same commit to say fifteen labs so the rendered number matches the registry. The regeneration workflow added earlier remains deleted; grouped index pages are unaffected by this change.
