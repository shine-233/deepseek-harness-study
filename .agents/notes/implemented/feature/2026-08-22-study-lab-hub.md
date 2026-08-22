# Agent Note: Lab hub page gives the ten offline experiments one entry point

Status: implemented

English | [中文](2026-08-22-study-lab-hub.zh.md)

## Background

The ten deterministic labs (`website/public/*-lab.html` plus `research-debug-bridge.html`) were each referenced by exactly one lesson through `LessonWidget`. No page on the site put them together: a reader arriving from the homepage could not see what is hands-on playable, and only found the labs by meeting the README table or stumbling into the right lesson. The bare HTML pages on GitHub Pages also had no shared navigation surface.

## What was built

A lab hub page `website/public/study-labs.html`, sharing the standalone-page shell with `study-review.html`: `study-tokens.css` + `study-lab-shell.css`, strict CSP, `connect-src 'none'`.

- Ten static cards, each with a small line-art SVG schematic (`aria-hidden`; the card text carries the meaning) of the mechanism that lab models, plus links to the lab page and its companion lesson.
- Goal-based filtering into three groups (main path / plugin ecosystem / boundaries and handoff) with native buttons and `aria-pressed`; the choice persists in `location.hash` (`#group=<name>`).
- Progress tie-in: reads `dsh-study-progress-v2` (parsing reuses the pure functions in `study-progress-core.js`), shows "done hands-on / lesson read" per card and counts in the metric row; when localStorage is unavailable it degrades to one explanatory line.
- The lesson progress widget (`study-progress.js`) gains an "实验室" link next to "已读 n 课", pointing at the hub.

## Gate wiring

- `REQUIRED_PUBLISHED_PAGES` in `verify-built-study-site.mjs` gained a contract entry for `study-labs.html` (stable text markers).
- The hub's nine companion-lesson links flow through the existing `collectLabLessonLinks` inventory and are checked case-sensitively against build output.
- The homepage route table (`START-HERE.md`) gained one entry row using a raw HTML anchor to `/study-labs.html`, following the same degradation convention as `LessonWidget` url props (unreachable from github.com; the row text points GitHub readers to the README lab table).

## Boundary

Progress data stays local-only; the hub introduces no new storage key and no network access. `research-debug-bridge` is not in the progress whitelist (`LAB_PAGE_IDS`), so the metric presents "9 / 10 pages counted" instead of silently growing the whitelist.
