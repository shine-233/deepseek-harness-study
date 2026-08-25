# Agent Note: Three latent site-wide bugs found by a full read of the shared foundation

Status: implemented

[Chinese](2026-08-25-foundation-bug-sweep.zh.md) | English

## Problem

A challenge to "actually read the source" turned into a line-by-line pass over the shared runtime every page depends on (study-lab-kit.js, study-lab-state.js, study-progress-core.js, study-companion.js) plus filesystem-vs-list cross-checks. Three real defects surfaced, two of them invisible to every existing gate because they were dead code or silent no-ops rather than errors.

## Decision

**Metric tween observer never fired.** The observer read `mutation.oldValue`, but `textContent` assignment produces childList records whose oldValue is always null — so neither the number-roll branch nor the value-changed flash could ever trigger, on every lab page, since the feature shipped. Fixed by keeping previous values in a WeakMap keyed by the observed `dd` (records are mapped back through `closest('.metric-grid dd')`). Verified in a headless browser: changed metrics now flash and numeric ones run the roll.

**animateNumber chains overlapped.** A new target while a tween was mid-flight started a second rAF chain that fought the first for the element's text. Each element's pending frame handle now lives in a WeakMap and is cancelled before the next chain starts.

**Progress list drift dropped completions silently.** `LAB_PAGE_IDS` in study-progress-core.js was a second hand-maintained list and had fallen 12 pages behind the filesystem; eight of them (credential, settings, plan-stack, subprocess plus the four new infra labs) were also counted as trackable by the overview page, so readers who solved those prediction gates got their progress discarded with no error anywhere. All twelve are registered now, and `lab-progress-pages.test.mjs` pins the list against `public/*-lab.html` so the next new lab fails loudly instead of silently.

## Alternatives considered

**Deriving LAB_PAGE_IDS from TRACKED_LAB_IDS in study-labs.js.** Rejected: progress-core must import nothing DOM-side, and the reverse import would be circular; instead the test pins both lists to the one authority that cannot drift — the directory listing.

**Leaving query/sandbox/typert/workspace unregistered as "intentionally untracked".** No documented rationale exists (only research-debug-bridge is documented as outside progress), and their gates already call rememberLab; registering everything matching `*-lab.html` is the only rule that survives the next rename.

## Consequences

Metric feedback works for the first time on all lab pages; repeated runs no longer stack animation chains; solving any lab's prediction gate records progress on every registered page. Full suite: 819 study-tools tests, 28 doc-sync gates, headless re-verification on the built site.
