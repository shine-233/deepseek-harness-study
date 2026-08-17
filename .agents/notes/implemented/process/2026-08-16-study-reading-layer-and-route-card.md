# Agent Note: Study reading layer and route card

Status: implemented

English | [中文](2026-08-16-study-reading-layer-and-route-card.zh.md)

## Problem

The study website already publishes a deliberate front door and a complete lesson/index sidebar, but the reading surface does not make the short route distinct from the full catalog. Long lessons also need stronger active-page, outline, code, table, and mobile cues without changing canonical Markdown or the generated projection.

## Decision

The Chinese study sidebar begins with a small `阅读路线` group containing the published start page, the 15-minute task sheet, the tool/plugin decision card, and the file-index entry. `studyPageLink` resolves these links from `docsPages`, so the route card follows the publication manifest instead of maintaining a second set of generated filenames.

The site loads `website/public/reading.css` as a presentation-only layer. It gives headings scroll offset, readable body rhythm, stronger active sidebar and outline states, bounded code and table overflow, sticky table headings, keyboard focus rings, and compact mobile home/document spacing. The layer keeps the stock VitePress navigation, home, outline, footer, and search components; it does not add client state, copy canonical prose, or infer completion from browser storage.

## Alternatives considered

**Add progress state to the lesson pages.** Rejected: completion state would need persistence and a definition of finished that the canonical study material does not provide. The route card gives orientation without claiming learning progress.

**Maintain the route card with hard-coded public URLs.** Rejected: generated study routes intentionally encode source filenames, so hard-coded links would drift when the manifest changes. The card resolves the source entries through `docsPages` and `routeLink`.

**Move or rewrite the canonical Markdown for visual treatment.** Rejected: `website/` owns configuration and presentation assets, while study prose remains in `study/` and the home prose remains in its canonical root files. The CSS layer preserves that ownership boundary.

## Consequences

First-time Chinese study readers see a short route before the complete lesson and file-index groups, while readers can still use the full sidebar and the default previous/next links. Tables remain horizontally usable on narrow screens, code remains copyable through the stock VitePress control, and keyboard focus is visible. The site does not report a numeric course completion percentage, synchronize progress between devices, or prove that a reader completed any lesson.

The styling is coupled to stable VitePress default-theme class names such as `VPSidebarItem`, `VPHome`, and `VPDocAsideOutline`; the build verifies asset delivery and rendering, but a future VitePress major upgrade still requires visual review.
