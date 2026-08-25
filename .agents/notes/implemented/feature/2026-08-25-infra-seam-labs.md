# Agent Note: Infra-seam labs — the last eight uncovered upstream groups

Status: implemented

[Chinese](2026-08-25-infra-seam-labs.zh.md) | English

## Problem

A coverage pass over the pinned upstream tree (aa6c361a) left roughly eight package groups without a lab: code-runtime's run-outcome taxonomy, the web-GUI host half (webserver route carrier, frontend-static fallback seat, directory-picker seam), runtime-diagnostics' invariant registry, and the storage hub's backend contract — plus client rendering internals that were judged to need a real React DOM to be meaningful. That judgment did not survive inspection: each of these packages owns a deterministic contract (fixed inputs, fixed transitions, stable error vocabulary) that teaches exactly what a browser cannot fake anyway.

## Decision

Four labs in the established four-file shape (`*-model.js`, `*-lab.html/js/css`) plus Node tests, prediction gates, steppers with shared playback, hash-persisted state, oracle cards and evidence boundaries:

- `code-run`: `run()` resolves `{ value?, logs, error? }` — failure is a field, never a rejection; six orthogonal failure kinds (exception / timeout / abort / worker-exit / invalid-output / output-limit) mapped one-to-one to scenarios; binding namespaces pass three checks (portable identifier, non-reserved-word, not a backend-owned slot like `console`/`__dsh_main__`), and an invalid namespace stops the timeline at step 0.
- `host-gateway`: every request rides the one `ctx.webServer` carrier; registered routes short-circuit the scan and the fallback seat answers only after a total miss; the picker seam swaps native/browse/auto behind an unchanged consumer contract.
- `invariant`: registration reserves the package name before any filter runs; filters decide installation only; `fail()` throws an `InvariantError` attributed to the registering package; failure disposes the child fiber and releases the reservation; duplicate registration rejects.
- `storage-hub`: facet-missing fails loud at resolution before any open; unit names must satisfy `UNIT_NAME_RE` (file name and SQL identifier at once); version stamps reject with `version-mismatch`, unparseable media with `malformed-medium`; writes are durable once resolved, deletes of missing keys are idempotent, calls after `close` reject with `closed`.

Registration: four cards in `study-labs.html` (count 44 → 48), ids in `TRACKED_LAB_IDS`, stepper prefixes in the playback-wiring gate, jsdom smoke entries for all 120 input combos, lesson prose links from 05/07/19/33, and `RELATED` extended so every tracked lab now has concept neighbors (47 keys).

Two CSP fixes came out of the browser walk: the back-to-top sentinel in `study-lab-kit.js` set `style.cssText` (blocked by `style-src 'self'`; replaced with per-property CSSOM assignment), and `web-tool-lab.html` carried two inline `style="margin-top:14px"` attributes (replaced by a `.wt-gap` class). Both surfaced as console errors only under load-order races; they are now gone structurally.

## Alternatives considered

**Leaving these groups unlabbed because "they need real React DOM or processes."** Rejected: the contracts above are pure transition rules; the labs state plainly in `cannotProve` what still requires a live worker, HTTP listener or file system. The ui-renderer/slot layer remains unlabbed on those grounds, now as a documented boundary instead of an oversight.

**One mega-lab for all infra packages.** Rejected: each seam has its own vocabulary and oracle; merging would have produced tab-switching theater without per-seam determinism checks.

**Extending orchestration/client models instead of new pages.** Rejected: both files are other lessons' active surfaces; separate pages keep revertibility and keep the overview grid honest about what is covered.

## Consequences

Every product package group in the pinned upstream tree now has either a dedicated lab or an explicit documented reason not to. Verified on the built site: 38 lesson pages and 56 lab pages walked headless at 1280px and 61 walks at 375px with zero console errors and zero horizontal overflow; gate unlock, select combos, stepper end-states, play toggle and hash round-trip asserted for the four new labs; model tests (26), stepper smoke (18), playback wiring, contrast (78 pairs) and the full 28-gate `doc-sync` pass.
