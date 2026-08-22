# Agent Note: Lab hub page gives the ten offline experiments one entry point

Status: implemented

English | [中文](2026-08-22-study-lab-hub.zh.md)

## Problem

The ten deterministic labs (`website/public/*-lab.html` plus `research-debug-bridge.html`) were each referenced by exactly one lesson through `LessonWidget`. No page on the site put them together: a reader arriving from the homepage could not see what is hands-on playable, and only found the labs by meeting the README lab table or stumbling into the right lesson. The bare HTML pages on GitHub Pages had no shared navigation surface either, so a reader inside one lab had no way to see the other nine without going back to GitHub.

## Decision

A lab hub page `website/public/study-labs.html` now lists all ten experiments on one page. It shares the standalone-page shell with `study-review.html`: `study-tokens.css` + `study-lab-shell.css`, strict CSP, `connect-src 'none'`.

- Ten static cards, each with a small line-art SVG schematic (`aria-hidden`; the card text carries the meaning) of the mechanism that lab models, plus links to the lab page and its companion lesson.
- Goal-based filtering into three groups (main path / plugin ecosystem / boundaries and handoff) with native buttons and `aria-pressed`; the choice persists in `location.hash` (`#group=<name>`).
- Progress tie-in: reads `dsh-study-progress-v2` (parsing reuses the pure functions in `study-progress-core.js`), shows "done hands-on / lesson read" per card and counts in the metric row; when localStorage is unavailable it degrades to one explanatory line.
- The lesson progress widget (`study-progress.js`) carries an "实验室" link next to "已读 n 课", pointing at the hub.
- `REQUIRED_PUBLISHED_PAGES` in `verify-built-study-site.mjs` has a contract entry for the hub; its nine companion-lesson links flow through the existing `collectLabLessonLinks` inventory and are checked case-sensitively against build output.
- The homepage route table (`START-HERE.md`) has one entry row using a raw HTML anchor to `/study-labs.html`, following the same degradation convention as `LessonWidget` url props (unreachable from github.com; the row text points GitHub readers to the README lab table).

## Alternatives considered

**Embedding the labs into the homepage markdown as md-style links.** VitePress's dead-link gate resolves markdown link targets against projected routes, and public-dir assets are not routes, so `/study-labs.html` in a markdown link would fail `website:build`. Raw HTML anchors are not dead-link-checked, which is why the homepage row uses one — the same reason `LessonWidget` ships iframe urls instead of markdown links.

**Adding the hub to the top navigation in `config.ts`.** The nav is built per locale from study collections; a root-level public asset does not fit `studyPageLink`, and threading an exception through both locales buys little over the homepage row plus the site-wide progress-widget link.

**Building the cards from JS data instead of static HTML.** Static markup keeps every card readable without JavaScript, lets the label and a11y gates scan real source text, and matches how `study-review.html` ships content. The script only toggles classes and fills badges.

## Consequences

Progress data stays local-only: the hub introduces no new storage key and no network access. `research-debug-bridge` is not in the progress whitelist (`LAB_PAGE_IDS`), so the metric presents "9 / 10 pages counted" instead of silently growing the whitelist. Adding an eleventh lab now means adding one card and keeping the chip counts honest — the counts are computed by `study-labs.js` at load, so only the static markup needs the new entry.
