# Agent Note: Click-to-seek completion, inertia tuning, and a quiz content audit

Status: implemented

[Chinese](2026-08-25-click-to-seek-completion.zh.md) | English

## Problem

The poloclub-style "every visual is a controller" commit gave five labs a delegated click-to-seek handler, but the pattern stopped there. Walking every lab's timeline construction (`renderTimeline|data-index|step.max`) showed three gaps: list-timeline labs whose steps carry `data-index` but no click handler (jobs, worker-protocol, session-projection), profile-loader's stage cards that highlighted on hover yet could not move the replay head, and orchestration, which had no stepper at all — its timeline could not be seeked because there was nothing to seek with. The 3D scene's inertia glide hardcoded its decay factor (0.9) twice, once in `fling` and again in a copy-pasted resume tick inside the visibility observer. Separately, the quiz bank's format tests pin structure (3 options, answer in range, `source` anchor shape) but nothing had ever checked that the pinned answers are true.

## Decision

**Click-to-seek is now uniform across all 18 labs that build timelines.** List timelines (jobs, worker-protocol, session-projection) get the same delegated handler as code-run: one listener on the persistent container, `closest('[data-index]')`, assign the slider, dispatch `input`. Profile-loader's stage seeks the `replay` slider (prefix is `replay`, not the page name) on click and on Enter/Space, since its cards are `role="button"` SVG groups. Orchestration gets a full stepper — slider, prev/next, play with speed select, caption, `bindRangeKeys` — mirroring jobs-lab markup, plus the same timeline click-to-seek. Frame-based code-mode-evidence treats markers, phase-matrix cells, concurrency markers and event-table rows as seek controls: clicking any `[data-tick]` lands the playhead on the first frame at or after that tick. Slider-less swim-lane plots (terminal, selfmod) bind dot↔table instead: a dot click flashes its table row (`metric-flash`) and scrolls it into view; selfmod's dots gained `data-step` and write the step's lane/phase/detail into the note line. The six SVG-plot labs that already had `bindPlotScrub` and the five with existing handlers were regression-checked, not touched.

**Inertia decay is a parameter, not a constant.** `createPackageScene` accepts `options.inertiaDecay` (per-frame velocity retention, 0–1 open interval, default 0.9) and one shared `runInertiaTick` now serves both `fling` and the visibility-resume path, deleting the duplicated tick body. The package-graph scene passes `inertiaDecay: 0.92` — the dense double ring reads better with a slightly longer glide. Stop threshold moved to a named `INERTIA_STOP` constant.

**Quiz banks a–f were audited question-by-question against the pinned upstream tree** (aa6c361a) and the study lessons they cite: 114 questions, each answer and explanation checked against source lines or lesson text. Five answers were wrong and are fixed: bank-c 17/q1, 18/q3 and 19/q3 had answer indices pointing at the distractor their own `explain` refutes; bank-f 32/q3 likewise; bank-d 21/q3 asserted the repo has no `.devcontainer/` config — the opposite of the committed `devcontainer.json` (Node 24 image, pnpm 11, frozen-lockfile install, ports 5173/4173 forwarded) — so the option set was rewritten around the real file. One explanation wording fix (bank-c 14/q1: the literal-matcher character class includes underscore). The other 108 questions passed, including spot-checks against `tools/src/index.ts` precedence comments, `matcher.ts` regex behavior, and the workflow/tool-ralph top comments.

**Two silent-blank bugs surfaced during the headless walk and are fixed in the same change.** session-projection required a `#metric-changed` element that exists in no HTML, so `requireElements` bailed and the page rendered nothing; the dead element reference is removed. profile-loader put `#profile-stage` — an `<svg>` — into a checklist that `requireElements` verified with `instanceof HTMLElement`, so the whole page silently rendered empty; the check now accepts any `Element`. Both shipped broken and pass only because nothing executed a click on them.

## Alternatives considered

**A shared kit helper for list-timeline click-seek.** Rejected for now: the handler is four lines and each page owns its slider variable and event detail; a helper would save nothing until a fifth page repeats it. The SVG plots already share `bindPlotScrub`, which is the load-bearing abstraction.

**Adding steppers to terminal/selfmod instead of dot↔table binding.** Rejected: both pages present all steps simultaneously with a full-text table; a slider would add a second truth for the same data. Point-to-row keeps one source of truth and adds the seek affordance the plots lacked.

**Leaving quiz banks frozen because "format tests exist".** Rejected: format tests never assert truth. Five of 114 answers being wrong (4.4%) is exactly the failure mode structure tests cannot see; the audit trail (per-question verdict with upstream file/line evidence) is the reviewable artifact.

**Tuning inertia by editing the constant.** Rejected: the decay is a feel parameter that varies with scene density; hardcoding 0.92 back would just move the magic number.

## Consequences

Every timeline-bearing lab now seeks from its visual: 16 interaction assertions pass headless against the built site (click-seek on jobs/wp/sp/profile-loader/orchestration/code-mode-evidence, terminal dot→row flash, selfmod dot→note, plus code-run and approval-flow scrub regressions). A 95-page sweep (38 lessons + all labs + index/progress/review pages) shows zero console errors and zero failed requests; the only warnings are Chromium's iframe-sandbox notices from the intentional same-origin lab embeds. The AI-flavor audit reads 1.26 weighted hits per 1000 prose characters (was 1.30); the one genuine cluster — a seven-dash chain in study/37 — is reduced to a single paired usage, and one dropped-character typo in the same lesson is fixed. Flagged quote-repetition hits in study/24 and 33 are on-screen labels ("模块入口", "重建实验", "全部放行") quoted accurately and left alone; single-instance contrast sentences in study/08 and 11 carry real information and stay. Remaining known limits: the ~8 client-rendering/infra groups stay read-code lessons by documented boundary (2026-08-25-infra-seam-labs), and quiz answers remain audit-frozen data — future edits should re-run the same per-question upstream comparison rather than trusting the format gate.
