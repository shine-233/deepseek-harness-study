# Agent Note: Lab accessibility contract runs as deterministic gates

Status: implemented

English | [中文](2026-08-22-lab-a11y-contract-gates.zh.md)

## Problem

The lab pages' accessibility claims (mobile viewport, Chinese language, reduced-motion handling, canvas alternatives, keyboard operability, the bridge's explicit-file-only boundary) lived in prose and handoffs. Nothing failed a build when a page lost its viewport tag, linked only stylesheets that ignore `prefers-reduced-motion`, or grew a canvas without a data-table alternative. A regression would have been invisible until a human happened to look.

## Decision

[`study-tools/lab-a11y-contract.test.mjs`](../../../../study-tools/lab-a11y-contract.test.mjs) pins five deterministic checks over every HTML page in `website/public`:

1. viewport meta with `width=device-width` and `lang="zh-CN"`;
2. reduced-motion coverage through the page's actual stylesheet closure — at least one linked local CSS file must contain `prefers-reduced-motion`;
3. every `<canvas>` carries an `aria-label`, and any page with a canvas also keeps a `<table>` as the non-visual data path;
4. native focusable controls exist and no positive `tabindex` appears;
5. the research-debug bridge keeps its boundary: a file input for evidence, and no `fetch`/`XMLHttpRequest`/`WebSocket`/`localStorage`/`sessionStorage`/`indexedDB` in its script.

Reduced-motion is checked at the stylesheet layer because that is where the guarantee lives today: shared CSS (`study-tokens.css`, lab stylesheets) disables animation under the media query, and shared JS helpers (`study-lab-kit.js`, `study-lab-reveal.js`) gate their own work on the same query. What remains genuinely browser-bound — focus order, screen-reader output, narrow-viewport overflow, WebGL fallback behavior on real GPUs — stays recorded as unknown in lesson 33 and the handoff; this test does not pretend to cover it.

## Alternatives considered

- **A Playwright matrix over viewports and input modes.** Rejected for now: the repository's quality stance runs offline deterministic checks in CI, and a browser farm adds flaky surface area disproportionate to what the static contract can already catch.
- **Manual checklist only.** Rejected: checklists drift; the whole point of this repo's gates is that a claim without an executable check is decoration.

## Consequences

Losing a viewport tag, dropping reduced-motion coverage from every linked stylesheet, shipping a naked canvas, or sneaking storage into the bridge now fails `node --test` like any other regression. The checks are syntactic, so they prove presence and wiring, not rendered behavior; the unknown column in lesson 33 still owns the real-browser truth.
