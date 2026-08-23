# Agent Note: Lesson audit hardening — renumbering, evidence dedupe, lab input resets

Status: implemented

[中文](2026-08-23-lesson-audit-hardening.zh.md) | English

## Problem

A full-repo audit (37 lesson pages read end to end, the file-index generator, and all 15 interactive labs against the 15 usability heuristics) found three classes of defects that gates did not catch:

1. Duplicate lesson numbers: two `28-` and two `29-` files made number-based navigation ambiguous, and the START-HERE routing table never linked the two newest interactive lessons.
2. Factual drift between pages: a snapshot summary contradicted its own fixture example (lesson 23), three mutually exclusive duration claims on the beginner task list (lesson 25), a dead widget fallback anchor (lesson 14), a stale lesson range (lesson 09), "three rules" over four bullets (lesson 05), two conflicting Debug-tool paths (lesson 36, then 29), prediction answers printed next to the prediction prompt (lesson 33), and a file-index navigation table with a missing row plus sixteen stale entry counts summing to 2,756 rather than 2,973.
3. Formula-density in prose and UX gaps: the four-domain isolation disclaimer appeared verbatim on four pages, lessons 26/27 carried near-duplicate evidence ladders, lesson 32 broke the impersonal register, and no lab offered an input reset — clearing `#state=` required hand-editing the URL. Wheel zoom on the package graph hijacked page scrolling.

## Decision

- Renumbered `28-最小插件工作台` → `35-` and `29-研究与-Debug-协作` → `36-`, keeping the numbers that `verify-study-entry` and the learning contract pin; synced all 15 references including quiz-bank lesson ids and lab back-links.
- Fixed each factual defect at its source. Lesson 23 now states which file the summary numbers describe; durations are unified as 5 + 10 = 15 minutes across lesson 25 and START-HERE; the fallback anchor targets a real heading; lesson 33 moves answers behind a `<details>` gate.
- Deduplicated shared boundaries: lesson 22 stays the single home of the four-domain isolation disclaimer; 23/26/27 point at it. The evidence ladder lives once, in the decision card (27); 26 links instead. Lesson 32 drops first person and links judgments to lesson 34.
- Added a shared `installInputReset(button, form, { onReset })` to `study-lab-kit.js` (duck-typed guards so DOM-less test environments import cleanly) and wired a 恢复默认输入 button into every lab form, including the two standalone pages. Package-graph wheel zoom now exempts modifier keys.
- The standalone code-mode and research-debug pages load `study-lab-shell.css` between tokens and their private stylesheets, so shell-level focus, forced-colors, and touch-target hardening propagates without ceding selector priority.
- Quiz banks e/f re-pointed at renamed lessons and the retitled heading; the README pair hashes were re-recorded after link-text changes.

## Alternatives considered

**Renumbering by swapping with existing numbers to keep sidebar position.** Rejected: it would cascade renames through occupied numbers; appending 35/36 keeps section grouping stable because `studySection()` only reads the numeric prefix.

**Generator-emitting the file-index navigation table behind a new gate.** Correct long-term fix, but a parallel work stream is actively refactoring the generator (`migrate-index-legend`); hand-correcting the table from generated headers keeps this change conflict-free and the counts verified against all 67 page headers.

**Full CSS migration of the two standalone labs onto the shell.** Deferred: their private stylesheets redefine the same class names, so moving markup classes needs browser QA; stylesheet layering captures most of the benefit at none of the risk.

## Consequences

Number-based navigation is unambiguous and every interactive lab exposes an explicit reset that also cleans the shareable state link. Boundary statements now have one citable home each, cutting the cross-page sync burden that previously needed four edits per baseline migration. The pending `.stepper` styles in `study-lab-shell.css` ship here because the already-committed guard-loop stepper UI references them; four sibling labs carry equivalent pending stepper markup that the same tests cover. Translation pairing passes at 966 pairs after re-recording the two affected README pairs.
