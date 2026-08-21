# Agent Note: Densify the study entry copy

Status: implemented

English | [中文](2026-08-21-study-entry-copy-densify.zh.md)

## Problem

The entry surfaces carried structural machine-writing tells: the homepage repeated the same reassurance ("no download / no API key / no TypeScript", "proven vs not proven") four to six times per page across five near-identical card grids; rhetorical question headings appeared twice for the same promise; motivational clipped lines ("今天就停在这里", "卡住时不用猜") substituted for instructions. The pattern was not dishonesty — the evidence boundaries were accurate — but every section re-stated the page's premise instead of adding one.

## Decision

- The homepage keeps one instance of each promise. The five overlapping grids became three blocks with distinct jobs: the route grid (choose an entry), the stuck card (recovery), and the learning-results grid (the four questions a first round must answer). The separate contract block, proof strip, and footer learning map were removed; their non-duplicated content moved into the surviving blocks.
- Motivational kickers were replaced by concrete ones ("卡住时不用猜" → "卡住时"; "先选一条，今天就停在这里" → "先选一条，读完就停").
- START-HERE.md lost its duplicated Codespace warnings (three said the same thing; one remains in the commands card plus one in the cloud section), its pre-checklist pep line, and its closing reassurance clauses.
- README.md / README.zh.md dropped their second and third restatements of the no-prerequisite promise and converted rhetorical lead-ins to statements.
- A light pass over lessons 00–09 removed 19 residual tells (defensive "not X" openers, drama words, repeated thesis sentences); lessons 10–34 were scanned and left alone where prose was already dense — including every "不证明" boundary sentence, which states a distinct fact each time.
- Gate markers that referenced removed copy were retired with it: `dsh-home-contract`, `卡住时不用猜` (learning-contract verifier) and `dsh-learning-map` (entry verifier). All remaining markers still match shipped text.

## Alternatives considered

- **Rewrite every lesson page top-to-bottom.** Rejected: scans showed lessons 10–34 are reference-dense with few tells; mass rewriting risked damaging precise evidence-boundary prose for no reader gain.
- **Keep all grids and only reword.** Rejected: the AI tell on this page was structural repetition, not word choice; rewording five grids that say one thing would keep the problem.
- **Soften the evidence-boundary repetitions globally.** Rejected: each remaining boundary sentence names a different unproven surface; collapsing them would hide real distinctions.

## Consequences

The homepage states each promise once and every grid has one job; the gate verifiers pin the slimmer structure. Readers lose the redundant reminders — the stuck card and status strip now carry the whole "what is proven" message. Copy in generated index pages is untouched, so the de-AI pass covers hand-written surfaces only.
