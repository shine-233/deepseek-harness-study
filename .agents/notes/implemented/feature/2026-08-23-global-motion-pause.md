# Agent Note: site-wide motion pause toggle for lab pages

Status: implemented

[English](2026-08-23-global-motion-pause.md) | [中文](2026-08-23-global-motion-pause.zh.md)

## Problem

Every offline lab respects `prefers-reduced-motion`, but a reader who wants stillness for reasons the OS preference does not capture — saving power, screenshotting a mid-state, motion sensitivity between the coarse OS buckets — had no lever to pull. ciechanow.ski puts one line under every article ("you can globally pause them"); our sixteen-plus standalone lab pages each animated ambient loops (breathe rings, stamp turntables, packet streams, status pulses) with no master switch.

## Decision

A `#motion-toggle` button sits in every lab page's `hero-actions` (17 pages). The kit self-boots it: `installMotionPauseToggle()` runs at module load, so wiring is zero per-page JS. Turning it:

- sets `data-motion="paused"` on the document element; the CSS block in `study-tokens.css` freezes every keyframe animation (`animation-play-state: paused`) and lands transitions instantly (`transition-duration: 0s`) — state jumps to its final value, nothing half-fades;
- calls every registered auto-advance stopper, so playing steppers halt instead of stepping invisibly;
- persists to `localStorage['dsh-lab-motion']`, shared across all lab pages like ciechanow's per-site memory;
- announces changes through `dsh-lab-motion` events, constructed defensively because some test DOM shims lack `CustomEvent`.

The toggle is independent of `prefers-reduced-motion`: the media query is the OS-level stance, this button is an explicit per-reader override on top of it.

## Alternatives considered

**Inject the button through the VitePress theme like study-progress.js.** Rejected: lab pages are standalone HTML documents outside the VitePress app; theme injection never reaches them. The kit is the only script every lab already loads, so it is the only viable injection point.

**Pause only `animation-play-state`, leave transitions running.** Rejected: hover and reveal transitions would still move while keyframes freeze — a half-still page reads as breakage, not as stillness. Instant-completion matches reader intent better.

**Per-lab toggles beside each play button.** Rejected: the request being answered is "stop everything"; scattering seventeen small switches recreates the problem at smaller scale.

## Consequences

Readers get a persistent, cross-page stillness switch that also pauses playback timers — the last big interaction affordance from the interactive-explanation canon that the labs lacked. Costs: one universal-selector CSS rule evaluated under `[data-motion="paused"]` only (idle cost when running), a `localStorage` read at boot, and one more kit bootstrap concern — the boot path must stay defensive about partial DOM shims, which the test suite now exercises.

## Testing

- Full `node --test study-tools/*.test.mjs`: 394 pass after adding stepper-smoke coverage of the new dispatch path; the first cut failed 11 suites on missing `CustomEvent` and drove the defensive construction above.
- `website:build` stays green: 119 pages reconcile, 16,145 links resolve.
