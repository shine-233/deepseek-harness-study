# Agent Note: inertia fling and offscreen suspension for the package scene

Status: implemented

[English](2026-08-23-scene-inertia-and-visibility.md) | [中文](2026-08-23-scene-inertia-and-visibility.zh.md)

## Problem

The 2D-canvas pseudo-3D package scene stopped dead the instant a drag released, and its auto-spin kept burning requestAnimationFrame cycles after the user scrolled the stage out of view. Top canvas interactions (tldraw, excalidraw) treat release momentum as table stakes, and battery-respecting render loops pause when nobody is watching.

## Decision

`createPackageScene` gains `fling(vYaw, vPitch)` / `stopInertia()`: release velocity from the last pointer move decays by `0.9^(dt/16.7)` per frame until below 1e-4. An IntersectionObserver on the canvas suspends spin and inertia whenever the scene leaves the viewport and resumes auto-spin on return (inertia does not resume — the gesture ended long ago). Inertia is cancelled by focus flights, explicit spin start, new pointerdown, and dispose; it never starts under reduced motion or while offscreen.

## Alternatives considered

**Adopt three.js for real depth buffering.** Rejected: CSP `script-src 'self'` plus the weight discipline that keeps every lab offline-first; the painter's algorithm over 227 bars has no visible layering errors at this scale.

**Resume inertia on visibility return instead of dropping it.** Rejected: coasting motion that outlives its gesture across a scroll boundary reads as a bug, not continuity.

## Consequences

Release now coasts like every reference-quality canvas interaction, and a spinning scene costs zero frames while scrolled away. The controller API grows by two methods; the observer is disconnected in `dispose`, so teardown stays complete.

## Testing

- scene3d contract, package-graph model/smoke, and kit suites: 26/26 green; `node --check` on both touched files.
- Full build reconciles 119 pages with 16,145 links resolved.
