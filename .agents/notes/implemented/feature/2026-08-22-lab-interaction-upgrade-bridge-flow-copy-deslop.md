# Agent Note: Lab interaction upgrade, bridge flow diagram, copy de-slop, and kit dedupe

Status: implemented

English | [中文](2026-08-22-lab-interaction-upgrade-bridge-flow-copy-deslop.zh.md)

## Problem

Four gaps, found by a skills-driven usability audit (frontend-design-audit, Vercel Web Interface Guidelines, anti-ui-slop, moonshine editorial rules):

1. **A shipped regression**: `package-graph-lab.js` called `installDeclaredIcons()` without importing it, so module evaluation threw in the browser — the theme toggle and the prediction gate never installed on that page.
2. **The dependency table was not a data tool**: 227 fixed-order rows, native `<title>` tooltips (~1 s delay, unusable on touch), no sorting, no linkage between figure and table; filter changes teleported points without any positional continuity.
3. **An AI-writing tell**: the negation-pivot sentence shape («不是 X，而是 Y») appeared 24 times across the study lessons; moonshine's editorial standard allows it only when correcting a genuine false premise.
4. **Duplication and a silent page**: three early labs copied shell helpers/styles locally, and research-debug-bridge remained the only lab with zero graphics.

## Decision

1. **Copy de-slop**: rewrote 15 negation pivots into direct statements across 11 lessons plus the index generator source (`generate-source-index.mjs`, regenerated card synced by hand); kept the 9 that correct misconceptions a reader can actually hold.
2. **package-graph rewrite around keyed marks**: circles/rects are reused across renders by package id and glide 200 ms between positions (duration read from the `--dur-enter` token; reduced-motion lands instantly). Added sortable table headers (`aria-sort` tri-state cycle, null npm names always last), cross-view hover linkage (scatter ↔ bars ↔ table row, container-scoped scroll centering), a custom pointer-follow tooltip fed by `data-tip` attributes (native titles removed), and wheel-zoom/drag-pan with keyboard-and-touch button equivalents. Zoom resets on every rebuild because filtering rescales both axes.
3. **Fixed the missing import** as part of moving the page onto shared kit helpers; its stylesheet now links `study-lab-shell.css` and drops the 60 byte-identical duplicated blocks.
4. **Bridge lifecycle diagram**: a static SVG strip (request.json → sanitized repro → result.json → four outcome states) above the workspace; the current-stage highlight follows request generation. Text alternative included; zero animation; no new storage or network surface.
5. **Quiz bank grew to the full main chain**: lessons 03/04/05 added (three source-cited questions each, anchors verified against real headings by a slug-matching test).
6. **Progress schema v2**: a `labs` table records the seven model labs through their prediction-gate submission (doing the experiment is the completion evidence), stored under `dsh-study-progress-v2`; v1 payloads migrate on parse, export/import keeps working.
7. **jsdom smoke coverage**: a new test boots the real page against the real fixture — fetch-failure messaging, oracle badge, row counts, sort clicks, hover linkage, zoom buttons, group-filter bar view.
8. **Audit fixes**: loading feedback while the fixture loads, button-position copy corrected (下方, not 右侧), sort-button hover state, `user-select: none` while panning, `overscroll-behavior-x: contain` on scrollers, `touch-action: manipulation` on buttons (shell + bridge).

## Alternatives considered

- Persisting zoom and table sort into the `#state=` hash: rejected — the state contract carries experiment inputs; a stale zoom window points at misleading coordinates after axes rescale, and sort order is a reading aid rather than input.
- CSS transitions on `cx`/`cy`/`r`: rejected — they would stack with hover transitions and attribute writes into double easing; the rAF glide is interruptible and centrally honors reduced-motion.
- Unifying bridge/code-mode CSS onto the shared shell: deferred — bridge intentionally keeps one behavioral divergence (null-safe `writeText`), documented in-file; wholesale class renames without a browser walkthrough trade real risk for cosmetics.
- Growing the quiz bank only when lessons ship: accepted with a guard — the quiz test pins the lesson list, so silent drift fails loudly instead.

## Consequences

- The package-graph prediction gate and theme toggle work in production for the first time since the kit refactor landed.
- New maintenance surfaces: `TABLE_COLUMNS` must track model fields, and the smoke test depends on jsdom (already a devDependency).
- Progress storage moves to `dsh-study-progress-v2`; old v1 exports still import (migration covered by tests).
- Lesson copy now holds at most 9 negation pivots, each tied to a stated misconception.
- Homepage metrics moved to 237 + 8; the verifier enforces the sync (value contended with concurrent work on this tree).

## Verification

`node --test study-tools/*.test.mjs` 263/263; `verify-study-home-metrics`, `verify-lab-contrast` (78 pairs), `verify-study-links` (0 path errors) green; `study:quick-check --site` green after clearing a stale VitePress cache that served outdated projected metrics.

## Boundaries

Real-browser walkthrough (focus order, narrow-viewport overflow, wheel-zoom ergonomics, screen-reader announcements) remains the declared unknown in lesson 33; this change widens it slightly and should ride the next QA pass.
