# Agent Note: review queue, quiz variants, lab keyboard, scrollytelling, prose-graph linking

Status: implemented

[中文](2026-08-22-study-review-variants-keys-scrolly-termref.zh.md) | English

## Problem

A pattern survey of best-in-class interactive teaching sites (Distill.pub, VisuAlgo, ncase.me, MIT 6.824, Pudding.cool) left five concrete gaps against this study site's otherwise complete lab set:

1. Only one lab (code-mode-evidence) answered to arrow keys; the other timeline labs forced pointer-only stepping.
2. Graded quizzes recorded a score but forgot which questions were missed; there was no way to return to them.
3. Every quiz attempt presented the same question and option order, so position memory could masquerade as recall.
4. The package graph highlighted from within its own views only; prose could not point at a package.
5. Lesson 04 embedded the turn-flow widget but had no scroll-driven walkthrough of the same trace.

## Decision

1. **Shared keyboard stepping**: `study-lab-kit.js` gains pure `nextRangeValue` plus DOM-thin `bindRangeKeys`, wired into the primary sliders of turn-flow, session-log, llm-stream and compaction. When focus sits on any form control the browser keeps native behaviour; otherwise ←/→ step and Home/End jump, submitted through the existing `input` wiring. Each page's slider hint names the keys.
2. **Review queue (错题本)**: new pure module `study-review-core.js` stores one entry per missed question (`lessonId|qid`, streak, last-attempt ts, due date) under `dsh-study-review-v1`. Wrong answers enter due tomorrow; each later correct answer extends the interval 1→3→7→16 days. A standalone `study-review.html` renders the due queue with per-item 记住了/还没记住 actions, source links back into lessons, and JSON export/import. The progress pill links to it with a live count.
3. **Seeded quiz variants**: pure `mulberry32` + `shuffleQuiz` in `study-quiz.js` shuffle question order and option order while the answer index follows its own text. A 再练一轮 button re-renders the section with a fresh seed after grading.
4. **Scrollytelling**: `study-scrolly.js` (theme-injected like the progress loader) turns an empty `<div data-scrolly="turn-flow">` in lesson 04 into sticky stage + six beat cards, drawing lane track, dots and payload pairing lines from the same `buildTurnModel` the lab uses. Beats are native buttons; IntersectionObserver drives activation, click jumps.
5. **Prose↔graph linking**: package-graph hero prose now carries three `<button data-graph-id>` terms (core/agent, llm/llm, skill/skill); hover or focus highlights the same package across scatter, bars and table via the existing linker, click scrolls the table row.
6. **Transport play buttons** (follow-up): pure `nextPlayValue` plus DOM-thin `bindAutoAdvance` in the kit give turn-flow, session-log, llm-stream and compaction a 播放/暂停 button that sweeps the slider end-to-end at 650ms per frame, pauses on any externally sourced input (drag or keyboard step — detected by a self-dispatch flag, not `isTrusted`, because re-dispatched events are never trusted), stops at the last frame, and under reduced motion degrades to one frame per click.
7. **Template-generated questions** (follow-up): `generatedQuestionsFor` builds questions from the same model functions the labs render — lesson 04 asks which lane two fixed steps of the two-tools scenario run on, lesson 05 asks for replayed tool-call counts of two log scenarios. Ids are stable (`gen-04-lane-5` style) so review-page resolution works; canonical option order is deterministic and position randomization stays with `shuffleQuiz`. `allQuestionsFor` composes bank + generated without touching the pinned 3-per-lesson hand-written banks.
8. **Second linking instance** (follow-up): tool-visibility hero terms 已注册 / 对模型可见 / 允许执行 became focusable buttons that flash the matching metric card (`.term-flash`, shared shell style).

## Alternatives considered

- Storing misses inside the progress state (v3 bump): rejected — progress answers "what is done", the review list answers "what to revisit"; separate lifecycles avoid a migration on the v2 contract.
- SM-2 with per-item ease factors: rejected — four fixed intervals are explainable in one sentence and testable without floats.
- Randomizing without a stored seed: accepted for the re-roll button (variants need not be shareable yet); the seeded API keeps that door open.
- Scrolling inside the framed lab instead of the lesson: rejected — the lesson is where narrative belongs; the iframe boundary would fight sticky positioning anyway.

## Consequences

- One more localStorage key (`dsh-study-review-v1`); it never leaves the machine except through explicit export, same promise as progress.
- `data-learning-tests` moved 237 → 249; homepage strip updated in the same change (the verifier pins it).
- `study-review.js` and `study-scrolly.js` are covered by the no-DOM import gate; all model logic stays in Node-testable modules.
- Quiz grading code path is unchanged: variants are plain question arrays, so future quiz additions get shuffling for free.

## Verification

`node --test study-tools/*.test.mjs` 284/284 (17 new: review schedule 9 incl. month boundary, variants/keys 4, generated questions 5); `verify-lab-contrast` 78 pairs pass; full `pnpm run docs:build` green including verify-doc-site-fragments (5,976 refs), verify-built-study-site, verify-study-publication (108 sources → 108 pages → 13474 links), learning contract, home metrics (249 at the time; re-pinned after follow-ups).

Real-browser walkthrough (Playwright Chromium against a local preview build, same day): 31/31 checks pass — the 23 from the first pass plus: the new play button enters playing state and advances the slider, manual stepping pauses it (this check caught a real bug: pausing keyed on `isTrusted`, which re-dispatched events never have; fixed with a self-dispatch flag); lessons 04 and 05 render five quiz items each (3 written + 2 generated); hovering tool-visibility hero terms flashes the matching metric card and leaving clears it. Screen-reader announcement itself was not exercised — ARIA wiring (`role="status"`, `aria-current`, `aria-label`) is what was verified.

## Boundaries

One real-browser walkthrough pass exists (see Verification) but it is a point-in-time check, not an automated regression: screen-reader spoken output, other labs' narrow screens, and Pages-specific serving remain unexercised; lesson 33 keeps that class of work as its standing unknown. The review intervals are pedagogy constants, not claims about optimal spacing research.
