# Agent Note: Four meta-lesson widgets (lessons 17, 18, 24, 29)

Status: implemented

[中文](2026-08-25-lesson-17-18-24-29-meta-lesson-widgets.zh.md) | English

## Problem

An earlier round classified lessons 17/18/24/29 as "reference/meta pages where a widget would be adding for adding's sake". Challenged to justify that per lesson, the claim failed: lesson 17 hides a seven-row sufficiency verdict matrix (够用 / 够用作设计教材 / 不够) whose honest boundaries are the lesson's payload; lesson 18 documents a six-step risky migration procedure with two hard guards; lesson 24 demonstrates the three-column audit-card method on seven real files; lesson 29's sixteen-row table operationalizes "green CI does not mean DSH ran" per check. All four are decision or procedure content — the exact shape the other ten widgets already serve.

## Decision

Four sibling modules join the widget contract (frozen verbatim data, exported pure render functions, Node tests, browser-guarded DOM, self-injected styles, SPA-route observer, container-gated rendering, `.dsh-swap-in` motion layer):

- `study-verdict.js`: seven goal rows with a level badge — enough / qualified / insufficient — derived by `verdictLevel()` from the table's verbatim prefixes; unknown prefix text throws, so reworded verdicts force a test update. The two insufficient rows render red badges, guarding against reading 够用作设计教材 as production-ready.
- `study-migration.js`: six-step stepper with prev/next buttons (disabled at the ends) and direct step jumps; each step body keeps the lesson's hard guards verbatim (若不一致就停止; 验证器通过只是第一道门).
- `study-auditcards.js`: seven audited files, each showing the three audit columns verbatim — confirmed facts / whether the index needs correcting / what evidence is still missing. The approval card keeps the fail-closed sentence (unavailable 而不是默认放行), and a test pins it.
- `study-pipeline.js`: all sixteen CI checks, each with location / what passing supports / what passing still cannot support. Tests pin the flagship boundaries (build does not mean 真实 DSH 已启动; the index check covers 2,973 but not 逐行人工阅读).

Tests: four files, 20 cases total. Script tags appended in `theme/index.ts`; containerless pages pay one scan.

## Alternatives considered

**Skipping these lessons because their numbers go stale (alert counts, audit statistics).** Rejected per widget: the stale-prone facts (47 Dependabot alerts, 44 template hints) stay in prose; the widgets carry only the tables whose columns are structural (goal→verdict, step→guard, file→columns, check→boundary), which age with the lesson they cite.

**One generic table-explorer fed by parsing the rendered `<details>` markup.** Rejected again: parsing rendered HTML couples behavior to VitePress markup and lets silent edits change widget semantics; frozen literals with sequence assertions keep the coupling explicit.

**Widgets for lessons 09 and 30 as well.** Skipped with reasons, not laziness: lesson 09's twenty-three tables are external case snapshots whose value is reading the cases themselves, and lesson 30's core is a point-in-time maintenance log — a widget there would fossilize stale numbers into the interface. Lesson 37 belongs to another in-flight workstream.

## Consequences

Every non-reference lesson in the course now carries at least one interactive model; the widget-less set shrinks to 09, 30 (deliberately, with reasons above) and 37 (another workstream's new lesson). Verified on the built site: 7 goals, 6 steps, 7 cards, 16 checks render; the insufficient verdict, step guards, codec card, and build boundary all display verbatim; prev/next disable correctly at the stepper ends; all four lessons have zero mobile horizontal overflow; the four new test files (20 cases) pass and the full widget suite reaches 55 cases.
