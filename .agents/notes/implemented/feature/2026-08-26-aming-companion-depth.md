# Agent Note: A-Ming 2.5D depth layer

Status: implemented

English | [中文](2026-08-26-aming-companion-depth.zh.md)

## Problem

The course-page companion mascot was a flat sprite. The original proposal assumed the site could reuse a vendored three.js renderer via `study-lab-scene3d.js`; exploration refuted that assumption — `study-lab-scene3d.js` has zero external imports and the repository contains no three.js anywhere.

## Decision

The companion ships a 2.5D sprite depth layer built entirely with CSS transforms inside [study-companion.js](../../../website/public/study-companion.js):

- Three `preserve-3d` layers wrap the sprite: a blurred dimmed aura behind (`translateZ(-22px)`), the body at `0`, and the eye glints in front (`translateZ(20px)`).
- Scroll velocity drives a tilt angle (`rotateX` up to ±14° plus a slight `rotateZ` sway), eased back to rest when scrolling stops.
- Cursor position drives per-layer parallax through two CSS custom properties (`--nx`/`--ny`); layer multipliers live in the stylesheet. Fine-pointer devices only — touch devices keep the tilt and skip cursor tracking.
- A perfect quiz or lesson-done event pops the scene once (the independent `scale` property, so it composes with the tilt transform instead of overwriting it).
- Under `prefers-reduced-motion: reduce` no listener is installed and the stylesheet zeroes every depth transform, leaving the page fully static.

`study-pet-plugins.js` swaps frames by grabbing the button's first `svg` and calling `replaceChildren`. The contract is preserved by keeping the body-layer svg as the first svg in the DOM and mirroring every frame change to the two copy layers through a MutationObserver: the back layer clones all rects, the front layer keeps only small white eye-glint rects. pet-plugins itself is unchanged.

## Alternatives considered

**Self-hosting three.js.** Rejected: ~600 KB minified, breaking the zero-dependency stance and the just-finished preload stripping; the depth effect needs three planes, not a scene graph.

**Hand-written mini-WebGL head (Phase 1).** Deferred, not rejected: a sub-300-line low-poly renderer in a corner canvas stays the escalation path if this depth layer is judged insufficient; it costs hundreds of lines of shader/matrix maintenance that Phase 0 does not.

**Splitting into three independent svgs with pet-plugins taught to swap all of them.** Rejected: it widens pet-plugins' contract and makes its frame builder responsible for per-layer filtering (the front layer must contain glints only). Mirroring inside the companion module keeps the layer semantics owned by whoever defines them.

## Consequences

Zero new dependencies and unchanged page weight; all behavior lives in `study-companion.js`.

The frame-swap contract widened from "one svg" to "body svg plus two mirrored copies" — an internal coupling owned by the companion module. Any future code that rebuilds companion sprites must go through the body layer (or update `syncDepthCopies`) or the copies will drift.

## Testing

Playwright acceptance (`dsh-depth-check.mjs`, 13 assertions, all passing): layer mount order, initial mirror counts, scroll tilt applied then settled back to identity, parallax offsets matching the variable ratios exactly, one-shot pop class lifecycle, frame-swap re-mirroring with pet-plugins mounted, zero computed displacement under reduced motion across scroll/cursor/event stimulation, and tilt-only behavior on a coarse-pointer context. The existing full smoke suite passes 9/9 and `study-companion.test.mjs` passes 3/3.
