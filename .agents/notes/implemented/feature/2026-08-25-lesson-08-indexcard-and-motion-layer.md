# Agent Note: Index-card field annotator (lesson 08) and the widget motion layer

Status: implemented

[中文](2026-08-25-lesson-08-indexcard-and-motion-layer.zh.md) | English

## Problem

Lesson 08 teaches the twelve index-card fields as a twelve-bullet list; those fields are the reading contract for all seventy-nine index pages, yet a first-time reader has no way to associate a field name with its definition without rereading the whole list. Separately, the five earlier lesson widgets swapped their detail cards instantly — functionally complete but visually abrupt, while the site's lab pages already carry a motion language (spring unlock, magnetic pull).

## Decision

- `study-indexcard.js` follows the established widget contract: twelve field chips (required ones badged 必填, the optional one 可选), a detail card quoting the lesson's definition verbatim, pure render functions tested in Node (`study-indexcard.test.mjs`, 5 tests — including a count assertion that exactly eleven fields are required), browser-guarded DOM, SPA-route observer.
- All six widgets now share a motion layer: each `paint()` wraps the detail content in a fresh `.dsh-swap-in` element, so the 180ms fade-rise keyframe replays on every selection change; `prefers-reduced-motion` disables both transitions and animations per widget. The fresh-element approach re-triggers the CSS animation without the class-retoggle-and-reflow hack, and the old node is discarded wholesale, so no stale markup survives a swap.

## Alternatives considered

**Animating with the Web Animations API inside paint().** Rejected: it needs an explicit reduced-motion branch in JavaScript; the CSS-only keyframe inherits the media-query guard for free.

**A shared motion stylesheet imported by all widgets.** Rejected: the widgets inject their own styles by contract and must keep working as standalone modules in Node tests; duplicating four CSS lines per module is the cheaper coupling.

**Applying the swap animation to the whole detail card instead of an inner wrapper.** Rejected: animating the persistent `<dl>` would also replay on unrelated re-renders and shift layout during the transform.

## Consequences

Lesson 08 now has an interactive model for the field list that governs the entire file-index family, and all six widgets give consistent selection feedback. The motion budget stays small on purpose: one 180ms opacity/transform keyframe, no layout-affecting properties, no per-chip animation. Verified on the built site: twelve chips render, field seven shows the verbatim 对应测试 definition with the 必填 badge, the computed swap animation is `dsh-fade-rise` on both probed widgets, lesson 08 has zero mobile horizontal overflow, and all six widget test files pass.
