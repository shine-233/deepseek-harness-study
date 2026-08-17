# Agent Note: Study entry smoke check and home-first presentation

Status: implemented

English | [中文](2026-08-16-study-entry-smoke-and-home-polish.zh.md)

## Problem

The learning site had the necessary route content, but its first screen exposed more choices than a first-time reader needed. The repository also had manifest and projection tests without one small check that names the complete first-time path: home, START-HERE, the first lessons, the example README, and the Pages aliases.

## Decision

The study home keeps three first-screen actions: start the guided route, follow the 15-minute task, or open the terminal example. File search, Codespaces, community research, and quality checks remain in the route table and sidebar rather than competing with the first click. The stock VitePress theme receives a restrained visual layer for hero hierarchy, feature cards, focus states, mobile layout, and reduced-motion preferences.

`study-tools/verify-study-entry.mjs` checks the source files, copy markers, and publication manifest for that short route. It does not start DSH, run VitePress, click a browser, or claim that a reader understood the lesson. Its unit test joins the existing offline study-tool test lane, and the study-quality workflow runs the script as a separate deterministic step.

## Alternatives considered

**Keep every destination as a hero button.** Rejected because first-time readers need one decision at a time; the full destination list remains available one level down.

**Treat the manifest test as a browser smoke test.** Rejected because a source manifest can prove route intent, not clean-URL serving, visual layout, responsive behavior, or human comprehension.

**Add a server or client application backend.** Rejected because this repository publishes static VitePress output; the useful backend-like seam is the source-to-site projector and its deterministic checks, not a new runtime service.

## Consequences

The home page has a smaller first decision and a more readable visual hierarchy. A missing source or mapping in the short path fails quickly without requiring credentials or a DSH process. Browser rendering and accessibility still require a built-site or real-browser check, and the check intentionally cannot prove DSH runtime behavior.
