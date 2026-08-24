# Agent Note: Lesson-07 test-layer explorer widget

Status: implemented

[中文](2026-08-25-lesson-07-test-layers-widget.zh.md) | English

## Problem

Lesson 07 states the six-layer test table in prose and then hammers the lesson's core rule in a footnote: green unit tests do not mean E2E or real-model coverage, and E2E failures may be environmental. A reader scanning the table gets the six answers but nothing makes the cross-layer boundaries tangible; lesson 07 was also one of the few core-chain lessons with no interactive model at all.

## Decision

A placeholder `<div class="dsh-testlayers" data-dsh-testlayers>` in the lesson markdown is rendered by a new injected module `website/public/study-testlayers.js` into a two-pane explorer: six layer bands on the left, a detail card on the right. Selecting a layer shows what it answers (the table sentence verbatim), what it does not answer (derived only from the other layers' own questions in the same table), and, where the lesson text states one, the boundary warning quoted verbatim. The module follows the house contract: data and `buildLayerDetail`/`renderLayerDetailHtml` are exported pure functions tested in Node (`study-tools/study-testlayers.test.mjs`, 8 tests), DOM work sits behind a browser guard, styling is injected by the module itself, and a debounced MutationObserver follows VitePress SPA route changes. The script tag is appended in `theme/index.ts` next to the existing three injections; pages without the container pay one scan.

## Alternatives considered

**Extending study-quiz banks with "which layer proves this claim" questions.** Rejected for now: the quiz banks are another in-flight work area, and the explorer teaches the table's structure while the quiz route tests recall; they compose later without changing this widget.

**Putting the model into an iframe like the embedded labs.** Rejected: the content is six rows and two caveats; an iframe adds a document boundary, a second CSS context, and lab-gate plumbing for data that fits in one frozen array.

**Deriving "does not answer" from general testing lore.** Rejected: every notAnswers entry is a negation scoped to the other rows of the same table, and the two caveats are copied verbatim, so the widget cannot drift from the lesson text it cites.

## Consequences

Lesson 07 now has a keyboard-reachable, `aria-pressed`-tracked model for its central evidence rule; selection is momentary state, so no URL-hash persistence is needed. The widget is data-driven: adding a seventh test layer to the lesson table is one array entry plus its notAnswers derivation, and the Node tests fail if the array and the table drift apart (the six-name sequence is asserted). Verified on the built site: six bands render, click and keyboard selection update the `aria-live` detail, mobile layout has zero horizontal overflow, and the full study-tools suite plus site gates stay green.
