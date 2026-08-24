# Agent Note: scrubbable number handles on lab readouts

Status: implemented

[English](2026-08-23-scrubbable-number-handles.md) | [中文](2026-08-23-scrubbable-number-handles.zh.md)

## Problem

Numeric parameters in the offline labs were reachable only through range sliders. That covers keyboard users well but leaves two gaps the interactive-explanation canon treats as first-class: pointer users cannot make small precise adjustments near a value (slider thumb granularity works against them), and the readout that displays a parameter is dead display even though it is exactly where the reader's eyes already are. redblobgames calls these "scrubbable numbers"; ciechanow.ski uses the same move throughout its demonstrations.

## Decision

`study-lab-kit.js` gains `nextScrubValue` (pure pixel-to-step math, Node-testable) and `installNumberScrub` (pointer wiring). The handle is an existing `<output>` readout: pressing it and dragging horizontally drives the adjacent range input through its normal `input` event, so the slider stays the single source of truth and every existing listener keeps working without changes.

The first consumer is the packed-row scrubber in `session-log-lab.html`: dragging the member-count readout moves the same slider that `bindRangeKeys` and `bindAutoAdvance` already attach to. Because the handle dispatches plain `input` events, auto-advance pauses during a drag, matching how a manual slider grab behaves.

Keyboard access is deliberately NOT duplicated on the handle: the native slider next to it already provides arrows/Home/End, so the `<output>` keeps its original semantics — no extra `role="slider"`, no second tab stop announcing the same value twice to screen readers.

## Alternatives considered

**Promote the readout to `role="slider"` with tabindex and full ARIA value attributes.** Rejected: two focusable controls announcing one parameter is screen-reader noise; the pointer affordance does not need to be a semantic control when a real one sits adjacent.

**Replace range inputs with a bespoke scrub component everywhere.** Rejected: the native slider brings keyboard support, focus behavior, and reduced-motion semantics for free; rebuilding those is cost with no reader-visible gain over handle-plus-slider.

**Generic `get`/`set` callback API instead of binding to a slider.** Rejected for now: every current use case has a real slider behind it; binding directly removes a second source of truth. The pure math is exported separately so a future sliderless consumer can still reuse it.

## Consequences

Labs can now offer ciechanow-grade fine control wherever a numeric readout sits next to a range input, at the cost of one kit export, one CSS class (`.lab-scrub-number`: `ew-resize` cursor, selection off, horizontal `touch-action`), and the discipline of keeping the paired slider authoritative. Pixel-to-step scale lives in one constant (`pxPerStep = 6`); if a lab ever needs coarser or finer drags it should extend the options object rather than hand-tuning deltas at call sites.

## Testing

- `node --test study-tools/study-lab-kit.test.mjs` — 5 cases cover step rounding, both clamp edges, non-unit steps, custom pixel scale, and unusable ranges.
- `study-tools/lab-modules-import-without-dom.test.mjs` stays green: the new exports keep module load DOM-free.
- `session-log`, `study-lab-state`, and stepper smoke suites unchanged and green.
