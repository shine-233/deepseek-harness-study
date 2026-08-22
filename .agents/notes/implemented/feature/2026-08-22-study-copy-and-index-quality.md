# Agent Note: Study copy hygiene fixes and index grouping

Status: implemented

English | [中文](2026-08-22-study-copy-and-index-quality.zh.md)

## Problem

A full pass over the 108 published study pages surfaced several defects that no existing gate caught:

- Both READMEs claimed「八个可以动手的实验」while `website/public/` ships ten lab pages; `study-labs.html`, `START-HERE.md`, and `SITE-HOME.md` already said ten.
- Lessons 21 and 22 contained authoring-session residue: lesson 22 addressed an unnamed reader with「你的原话…需要稍微改准」, and lesson 21 said「本学习会话没有点击创建」, referring to a research session a reader knows nothing about.
- Lesson 09 accumulated three append-only verification-log section titles（本轮联网核对 / 本次刷新核对 / 本次直接核验）and listed linux-insides twice in one table with different framing.
- Lesson 13's recommended reading order was seven consecutive「再读」link lines, including an orphan fragment `[schema](…)。` with no verb.
- Five lab footers read「独立 独立校验」— a mechanical word substitution had doubled the word where「独立 oracle 校验」was meant.
- Seven reader-facing sentences used the buzzword「闭环」where plain wording works.
- The generated index called `packages/attachment/attachment-local/src/request-image.ts` a「智能体运行时」file because its basename contains `request`; the file's own header says "Deterministic cached image versions for model requests."
- Test-case entries whose concept fell back to a path echo produced self-referential purposes like「检查 `tests/x.spec.ts` 的具体场景」— the audited object was the auditor.
- Large index pages (packages-client has 923 entries) rendered every entry as one flat `###` list with no group structure.

## Decision

Copy fixes (committed pages, effective on next site build):

- README.md / README.zh.md:「八个」→「十个」，plus rows for llm-stream-lab and plugin-flow-lab labeled to match the hub cards.
- Lesson 22 lead-in rewritten as a third-person claim correction; lesson 21 rewritten as an explicit verification boundary without session self-reference.
- Lesson 09: merged duplicate row, retitled the three verification sections away from session-log phrasing.
- Lesson 13: reading order reorganized by dependency (README → types → registry → presentation/schema → testing helper → tests), every URL unchanged.
- The five footers now read「独立 oracle 校验」.
- 闭环 replaced with plain wording in lessons 16/17/20/26, START-HERE.md, and SITE-HOME.md; graph-cycle usage in `packages/core/scope/README.zh.md` and frozen agent notes keep the term because there it is technical vocabulary.
- Lesson 23 gains a static inline-SVG grouped bar chart of the 200-run A/B timings (values identical to the adjacent table, theme-variable fills, `role="img"` with the table as text alternative; `.dsh-ab-chart` responsive rule appended to `reading.css`).

Generator fixes (`study-tools/generate-source-index.mjs`, effective on next regeneration against a source root):

- Two path-keyed overrides give request-image.ts its real role（图像请求版本缓存）and a design reason anchored to its quoted test topics.
- 测试用例 / 测试夹具 purposes no longer echo their own path when `conceptFor` falls back to one; scanned test topics lead the sentence instead.

llm-stream-lab parity: added the same「完整文字替代」table card other labs have; `listArrivals()` exported from the model so the table and the timeline share one data source; footer now claims 完整表格替代 honestly. Index pages get `## <packageRoot>` group headers plus a per-group count line whenever a bucket holds ≥ 40 entries, which also gives the VitePress outline grouped navigation.

## Alternatives considered

**Hand-rewriting template-fill entries across the 67 index pages.** Rejected: the pages regenerate from an upstream source root, so prose fixes belong in the generator; hand edits would be overwritten.

**Downgrading low-information entries to one-line records.** Deferred: `verify-source-index.mjs` requires all eleven fields per entry; relaxing that contract is a separate decision with its own gate change.

**Building new labs for the five uncovered themes (hook waterfall stepping, approval flow, session fork/crash repair, subagent delegation, guard loop hygiene).** Deferred: each lab carries prediction-gate, state-schema, hub-card, and built-site contract obligations that deserve their own change.

**Committing reading.css separately.** The file already carried an uncommitted hunk from the parallel lab-hub work when this change appended the chart rule; both hunks ship together rather than splitting one file across commits.

## Consequences

The copy fixes reach the deployed site on the next `pnpm docs:check` / Pages build; the generator fixes reach the committed index pages only at the next regeneration with `--source-root`. Until then, the hand-patched packages-attachment.md entry keeps the live page correct while the generator produces the same text for future baselines. The chart adds no JavaScript and no network access; the fallback table adds no new storage or CSP surface. Quiz banks do not reference any replaced wording (verified before editing).
