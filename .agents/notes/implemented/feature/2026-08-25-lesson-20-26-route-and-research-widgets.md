# Agent Note: Goal-route picker (lesson 20) and research priority board (lesson 26)

Status: implemented

[中文](2026-08-25-lesson-20-26-route-and-research-widgets.zh.md) | English

## Problem

The interaction audit left exactly two core lessons with no interactive model: lesson 20 (usage manual) opens with a twelve-row goal→route→evidence table hidden inside a `<details>` block, and lesson 26 (research roadmap) hides its ten-row priority/acceptance table the same way. Both tables are the pages' central content and both require cross-referencing three columns to act on; scanning them gives no way to act on one row without losing the others.

## Decision

Two sibling modules follow the study-testlayers.js contract exactly: markdown carries an empty container, a self-contained injected module renders it, pure functions are exported for Node tests, and DOM work sits behind a browser guard.

- `study-routes.js`: twelve goal chips; selecting one shows the route chain and the evidence sentence verbatim. Two-digit hops become real links to the corresponding lesson pages (slug map mirrors the `study/` filenames); `study/文件索引/README.md` links to the index nav; `对应索引页` has no unique target and stays linkless rather than inventing one. Links resolve through `window.__DSH_STUDY_BASE__` so they survive the Pages base path.
- `study-research-board.js`: P0/P1/P2/全部 filter chips plus ten item buttons; selecting an item shows why / who / evidence verbatim. Filtering keeps the selection stable by falling back to the first visible item.
- Tests: `study-routes.test.mjs` (7) and `study-research-board.test.mjs` (5) assert the exact goal/name sequences, so the modules fail loudly if the lesson tables change without them. Script tags are appended in `theme/index.ts`; pages without the containers pay one scan.

## Alternatives considered

**One generic "table-to-explorer" component driven by scraped DOM.** Rejected: parsing rendered tables to rebuild data would couple the modules to VitePress's markup and let silent content edits change widget behavior; frozen literal data with sequence-asserting tests keeps the coupling explicit and checkable.

**Replacing the `<details>` tables with the widgets.** Rejected: the tables stay as the canonical, printable, search-indexed content; the widgets are an added view and say so in one sentence each.

**A shared explorer library parameterized by both data sets.** Rejected for two call sites: the abstraction would be exercised twice, and study-lab-kit.js — the natural home — is another in-flight work area.

## Consequences

Every core-chain lesson now has at least one interactive model; the remaining lessons without widgets are process/meta pages (17, 18, 21, 24, 29, 30) inside another in-flight workstream. Route links are client-generated and therefore outside verify-study-links' static checks; the slug-map test pins the hop labels, and the URL shape is asserted for one route. Verified on the built site: 12 goals and 10 items render, filtering shows 2/4/4, links carry the base path, keyboard and `aria-pressed`/`aria-live` behave, both pages have zero mobile horizontal overflow, and the full study-tools suite stays green.
