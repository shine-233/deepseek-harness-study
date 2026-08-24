# Agent Note: reading.css dead-rule purge and the home full-bleed overflow clip

Status: implemented

[中文](2026-08-24-reading-css-dead-rules-and-mobile-overflow.zh.md) | English

## Problem

`reading.css` still carried rules for homepage blocks deleted when the journal home replaced the card-grid home: `dsh-home-contract`, `dsh-home-learning-*`, `dsh-route-*`, `dsh-status-*`, `dsh-stuck-*`, `dsh-proof-item/strip`, `dsh-learning-map/step`, `dsh-no-prereq-*`, `dsh-overview-kicker/summary`, and `dsh-feedback-*` — 36 class families, 627 lines, none reachable from any live selector match. HANDOFF listed the cleanup as pending. Separately, the journal home's `.dj-page` uses negative inline margins for its full-bleed paper texture; on a 375px viewport the box extended 16px past the right edge and the document gained horizontal scroll.

## Decision

A block-structured prune removed every rule whose selector references at least one dead `dsh-*` class, including rules nested in `@media` and dead members of mixed selector groups. Custom properties (`--dsh-reading-*`, `--dsh-font-*`) stay: live rules still consume them. Comments attached to a dropped rule are dropped with it. The file went from 1,593 to 966 lines.

The horizontal scroll is removed by `.VPPage { overflow-x: clip }` in `reading.css`, not by changing `.dj-page`'s margins: `clip` (unlike `hidden`) does not create a scroll container and does not break sticky positioning, and one rule covers every current and future full-bleed block inside the page container.

## Alternatives considered

**Hand-deleting the 36 rule families.** Rejected: the same audit that found them will be re-run after future homepage rewrites, and a repeatable prune with a structural self-check (comment pairing, brace balance, restore-on-damage) is cheaper than another manual pass.

**`overflow-x: hidden` on `body`.** Rejected: turning `body` into a scroll container risks breaking VitePress sticky sidebars; `clip` on the narrower `.VPPage` container has neither problem.

**Fixing `.dj-page` margins to a `50vw` full-bleed idiom.** Rejected: it changes the desktop layout math to fix a mobile-only symptom, and the scrollbar-width caveat of `50vw` lands exactly on the narrow viewports being fixed.

## Consequences

The stylesheet no longer describes deleted UI, so the next homepage reader does not reverse-engineer which classes exist. The prune is repeatable with the same dead-class list; the structural self-check matters because the first prune run corrupted two comments (an unclosed `/*` swallowed every rule below it, which silently removed the lesson contract grid) — the check now fails closed and restores the input file. Verified by rebuild: homepage screenshot differs 0.05% (mascot blink frame), lesson page 0.00%; all 28 doc-sync gates and 407 study-tools tests pass; mobile scroll overflow is 0px on home, lesson, lab, and file-index pages.
