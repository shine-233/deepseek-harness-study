# Agent Note: Progress overview page — four ledgers on one page

Status: implemented

[中文](2026-08-25-progress-overview-page.zh.md) | English

## Problem

Progress lived in four places that never met: the pill counts read lessons, the labs hub counts hands-on experiments, the quiz scores sit per lesson, and the wrong-answer book holds the review queue. No single page answered "where am I overall?" — the stamp card covers six curated lessons, and everything else is a number without a name.

## Decision

`progress.html` is a standalone page following the study-review.html pattern. The lesson roster is derived at runtime from `./sitemap.xml` — the same source the build generates, so the roster tracks new lessons without a hardcoded list (the exact staleness that hit the labs-hub headline twice). Lab ids come from `LAB_PAGE_IDS` in study-progress-core.js. Pure functions (`parseSitemapLessons`, `lessonRow`, `labRow`) are exported and tested in Node (5 tests: URL decoding, numeric sort, dedupe, malformed-input tolerance, state mapping). The page's own CSP loosens `connect-src` from 'none' to 'self' — the only addition is the same-origin sitemap fetch; everything else keeps the strict lab boundary.

## Alternatives considered

**Hardcoding the lesson list like the stamp card does.** Rejected: the stamp card's six entries went stale the week after they were written; a sitemap-derived roster self-maintains and the fallback (localStorage-only listing) covers file:// previews where fetch may fail.

**Putting the overview inside VitePress as a page.** Rejected: it reads localStorage and the sitemap, both awkward in SSG; the standalone-page pattern (study-review.html) already has the shell, theme boot and CSP solved.

**Adding exam mode at the same time.** Rejected: the exam needs quiz-bank cross-section logic owned by another workstream; the overview ships the missing read-side first.

## Consequences

A reader can now see all 38 lessons, all 53 labs, per-lesson quiz scores and the review due-count on one page, with done rows struck through and quiz badges in brand color. The page degrades honestly: without the sitemap it lists only touched lessons and says so. Verified on the built site: 38 lesson rows, 53 lab rows, a marked lesson shows ✓ with its 2/3 badge, zero mobile overflow, zero page errors, and the five view-model tests pass.
