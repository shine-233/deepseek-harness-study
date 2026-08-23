# Agent Note: Lesson-page mascot companion reacts to quiz and progress events

Status: implemented

[中文](2026-08-23-mascot-companion.zh.md) | English

## Problem

The pixel mascot 阿溟, the stamp card, and every moment of delight lived only on the homepage. Lesson pages — where learners actually spend their time — gave no feedback beyond quiz text: finishing a self-test or marking a lesson as read produced zero visible celebration, and nothing tied the reading experience back to the progress mechanics the homepage advertises.

## Decision

A new injected module `website/public/study-companion.js` follows the same architecture as `study-progress.js`: pure data plus render helpers exported for Node tests, with all DOM work inside a browser guard and route-following via a debounced MutationObserver.

- The sprite reuses the homepage pixel grid and palette (22×21 chars greedily merged into SVG rects, eye runs flagged for a CSS blink loop). `JournalHome.vue` keeps its private copy for now; consolidating both onto one module is left as follow-up because that file is under active parallel work.
- The sprite appears only on `/study/lessons/` routes. It blinks while idle, hops on celebrations, and speaks short bubble lines: poke quotes on click, praise on a perfect quiz score, encouragement otherwise, and a stamp-collecting nudge when a lesson is marked read.
- Trigger contract: `study-progress.js` dispatches `dsh-study-delight` CustomEvents (`{kind:'quiz', score, total}` after grading, `{kind:'done', lessonId}` on mark-read). The companion listens on `document`; either side can change independently.
- `prefers-reduced-motion` disables blink and hop animations; the bubble keeps working as a plain status region. The whole widget hides in print stylesheets.

## Alternatives considered

**Mounting the companion through a wrapped VitePress Layout component.** Rejected: wrapping the default Layout risks CSS assumptions about the app root, and a Vue component cannot be unit-tested by the existing Node-based lab gates; the injected-script pattern already has test infrastructure and SPA-route handling.

**Sharing one sprite module between JournalHome and the companion right away.** Deferred: JournalHome is under active parallel work, and a 50-line data duplicate is cheaper than a merge conflict in someone else's file. Follow-up should move the Vue copy onto the shared module.

## Consequences

Learners now get a small, consistent reward loop across all 37 lesson pages: answer quizzes well and 阿溟 celebrates, mark a lesson read and the bubble nudges toward the homepage stamp card. The feature adds one script tag site-wide, no layout changes, and four new Node tests covering import safety, grid integrity, palette coverage, and line-pool hygiene.
