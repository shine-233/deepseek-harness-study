# Agent Note: Repo-map explorer (lesson 01) and environment comparer (lesson 21)

Status: implemented

[中文](2026-08-25-lesson-01-21-repomap-and-envcompare-widgets.zh.md) | English

## Problem

After the routes/research round, two beginner-facing lessons still had no interactive model: lesson 01 (repository map) buries its ten-row top-level directory table in a `<details>` block and renders its dependency flow only as a static mermaid diagram; lesson 21 (GitHub web / github.dev / Codespaces) states in its first paragraph "不要把三者的能力混在一起" (do not mix up the three environments' capabilities) and then presents exactly that risk as a five-column prose table.

## Decision

Two modules follow the established widget contract (frozen verbatim data, exported pure functions, browser-guarded DOM, self-injected styles, SPA-route observer, container-gated rendering):

- `study-repomap.js`: ten directory chips plus a detail card carrying the table's two columns verbatim and an explicit chain-relationship line ("在运行时依赖主链上" / "不在"). A small SVG re-renders the lesson's own mermaid chain (apps → boot → bundle → packages → core·impl, vendor dashed); selecting `apps/`, `packages/`, or `vendor/` highlights the matching node, and selecting any other directory highlights nothing — the diagram teaches chain membership instead of decorating. `chainMember()` is exported so the membership flags are testable.
- `study-envcompare.js`: three environment tabs; the detail card shows the table's four columns verbatim plus the lesson's own 能做/不能做 bullet lists. A capability matrix renders ✓/✗/— per environment, where — means "the lesson does not claim this for the web page"; a test pins that rule so the matrix can never drift into invention. The matrix table scrolls horizontally inside its container on narrow screens instead of widening the document.
- Tests: `study-repomap.test.mjs` (5) and `study-envcompare.test.mjs` (5) assert the exact directory/environment sequences and the capability notation alphabet. Script tags are appended in `theme/index.ts`.

## Alternatives considered

**Making every chain node clickable.** Rejected: boot and bundle are `packages/` subdirectories, not top-level directories; giving them click targets would imply detail data the lesson table does not carry.

**Filling the web-page column of the capability matrix from general GitHub knowledge.** Rejected: the lesson deliberately does not claim web-page search/editing capabilities, and the widget cites the lesson — an invented ✓ would be exactly the evidence inflation the course teaches against.

**One shared "chips + detail card" base module.** Rejected again for the same reason as before: with five widgets now sharing only a contract (not code), each stays independently testable, and the natural shared home remains an in-flight file.

## Consequences

Every lesson a first-time reader walks through (00, 01, 02, 03, 04, 05, 06, 07, 20, 21, 26) now carries at least one interactive model. The remaining widget-less lessons (08, 09, 17, 18, 24, 29, 30, 37) are reference/meta pages, several inside another in-flight workstream. Verified on the built site: ten chips and three tabs render, chain highlighting fires for exactly the three chain members, the matrix shows six rows, both pages have zero mobile horizontal overflow, and the widget-specific test suites pass; the full-suite failures present at verification time trace to another workstream's new labs (provider-lab, credential-lab), not to these modules.
