# Agent Note: Lesson prose surgery — cut cross-page rehash, fix concept jumps

Status: implemented

[Chinese](2026-08-26-lesson-prose-surgery.zh.md) | English

## Problem

A full-book audit (all 38 lessons read end to end, on top of the mechanical `audit-ai-flavor` report) found three systematic defects the machine checks cannot see: sections in lessons 20/26/32 retelling facts owned by lessons 10–19 and 27 as compressed pointers; five concept jumps where a term is used before any introduction (subagent in 03, the waterfall invariant in 14, 切面/单元名 in 05, the three noun pointers in 07, official type names in 23); and the same evidence-boundary disclaimer repeated up to three times inside a single page (23, 32).

## Decision

Cut where another page owns the fact; keep every proposition that has no other home.

- **Lesson 20** (−39% prose): the four-step first-use sequence compresses to one paragraph; the six-paragraph plugin-writing guide keeps only its two hard rules (every resource added brings its own cancel/cleanup test; evidence layers do not substitute upward) plus per-lesson pointers; the four-paragraph community-audit guide reduces to its unique rule — record "what the project README claims" and "the command you actually ran" as two columns — and points to 12/27 for the checklist itself.
- **Lesson 32**: the triple disclaimer merged into one intro sentence carrying the re-check date; the lab-links paragraph moved below the learning-path diagram it says "above" to (it sat above); the homepage status-bar sentence no longer cites hardcoded counts — they drift, gate output is authoritative.
- **Lesson 26**: the component-to-loop-layer paragraph (verbatim duplicate of lesson 32's table) became a pointer; four methodology paragraphs compress to two, keeping every operative rule: marginal-return framing, mechanism-verified-but-not-generalized gap, the confounder list, and A/B-as-causal-comparison.
- **Jump fixes add content rather than cut**: 03 introduces subagent delegation before depth limits; 14 glosses what a waterfall dispatch is before stating the invariant and links lesson 02; 05 states the storage contract in plain words (missing required kv capability fails loud at parse point; the unit name doubles as filename and SQL identifier) instead of the bare jargon; 07 unpacks all three noun pointers into real contract content — the five plan-review claim conditions (plan-review intent, single question, binary choice, approval label, plan in detail) are taken from `client-model.js`, not invented; 23 grounds `ToolProviderResult.schemas`/`knownNames` in the layer table they extend.
- **Disclaimer consolidation stays within pages already touched** (23: three same-page statements → two; 32: three → one). Book-wide removal rejected: the learning-contract gates check several of these phrases, and the repetition is the repo's evidence-boundary discipline showing.
- **Aphorism endings**: 16/17 keep theirs — each summarizes the procedure directly above it; rewriting strong text is its own failure. Only 23's ending changed, to name its concrete artifact (an environment+numbers+unproven-items A/B record template).

## Alternatives considered

Merging START-HERE/16/25 (three tellings of the same first round) — deferred: START-HERE was under concurrent edit and entry-page merges must move learning-contract gate expectations in the same change. Book-wide sweep of ~100 boundary disclaimers — rejected for the gate reason above; per-page consolidation gets the readability gain without fighting the quality system. Rewriting lesson 37's thin source coverage — left to the concurrent zero-skip ladder lab work landing there.

## Consequences

Total lesson prose moved 127,694 → 127,126 han characters while absorbing the jump-fix additions; `audit-ai-flavor` weighted density 1.25 → 1.24, lesson 20 specifically 2.41 → 1.17 per thousand. On this tree: 837 study-tools tests pass, publication gates report 120 sources → 120 projected → 120 built pages with 16,406 resolving study links, the learning contract passes on 11 entry pages, and home metrics reconcile.
