# Agent Note: click-a-row jumps the timeline (reverse linked views)

Status: implemented

[English](2026-08-23-row-jump-linked-views.md) | [中文](2026-08-23-row-jump-linked-views.zh.md)

## Problem

Both flagship labs already implemented one half of Distill's linked-views pattern: the slider drives the destination bar, status block, and event tables together. The other half was missing — a reader scanning the disposition table who wants the timeline at that row had no way to say so except by eyeballing numbers and dragging.

## Decision

`bindRowJump(tableBody, slider)` in the kit: clicking a `tr[data-key]` clamps the key into the slider's range and dispatches a plain `input` event, so every existing listener rebuilds exactly as a manual drag would. Wired in session-log (disposition rows → replay position) and turn-flow (step rows → main timeline). `renderRows` already stamped `data-key`, and both tables' keys share the slider domain, so wiring is two lines per lab plus one cursor rule in shell CSS.

Keyboard and screen-reader users keep their full path through the native slider; the click handler adds no tab stop and no ARIA role — it is a pointer affordance on top of an already-complete keyboard contract.

## Alternatives considered

**Make every wired row a button for full keyboard reachability.** Rejected: dozens of duplicate tab stops per table; the slider next to it already reaches every position by arrow key.

**Hash-based deep links instead of click-to-jump.** Already exists separately (`copyLink` writes state to the URL hash); this covers the in-page gesture that deep links do not.

## Consequences

The overview↔detail loop closes in both flagship labs at the cost of one kit export, one CSS class, and the discipline of keeping row keys inside slider domains. Future detail tables get reverse linkage by passing their body to `bindRowJump` with whatever slider owns their domain.

## Testing

- Full suite 407/407 green (`node --test study-tools/*.test.mjs`), including the parallel workflow's prompt-assembly suites.
- `website:build`: 119 pages reconcile, home metrics gate passes.
