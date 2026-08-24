# Agent Note: source-index domain-word mapping corrections

Status: implemented

[English](2026-08-23-source-index-domain-word-mapping.md) | [中文](2026-08-23-source-index-domain-word-mapping.zh.md)

## Problem

The generated per-file index derives each card's domain vocabulary from path segments (`CONCEPT_WORDS`). Three package names read wrong under that generic mapping, so every generated card on three index pages opened with a misleading positioning sentence:

- `packages/web/` cards said "Web 界面" (browser UI) — but `tool-web/src/index.ts` is model-facing `web_search`/`web_fetch` tooling. 36 cards affected.
- `packages/guard/` cards said "权限保护" (permissions) — but the package owns loop hygiene and tool-timeout protection. 6 cards affected.
- `mcp-client` paths split into tokens `mcp`+`client`, so connection cards said "MCP 连接、浏览器端、连接的建立…" — the MCP client is a Node-side connection supervisor. 9 cards affected.

The hand-written navigation README described these pages correctly ("Web 搜索、抓取和工具消费者"), proving the generator's descriptor mapping, not the packages, had drifted.

## Decision

`study-tools/generate-source-index.mjs` corrects the three mappings at the concept level instead of post-editing pages:

- `SCOPED_CONCEPT_WORDS` replaces one token's value under a path prefix: `packages/web/` maps `web`→"Web 能力"; `packages/guard/` maps `guard`→"循环卫生". Prefix scoping keeps `apps/web` (the actual browser app) reading as Web 界面.
- `PAIRED_CONCEPT_WORDS` reads adjacent segments as one concept before single-token lookup: `mcp-client`→"MCP 客户端", which also stops the bare `client` token from yielding 浏览器端.
- Consecutive duplicate segments collapse before pairing (`packages/mcp/mcp-client` yields `mcp,mcp,client`). Duplicates never added a second concept anyway, so this changes no other page's output while letting the pair table see `mcp-client`.

All 78 committed pages were regenerated with `--source-root` pointing at the pinned upstream tree and re-split through `split-packages-client.mjs`. The full generate→split round trip reproduces every committed page byte-for-byte except the four intended files (index README plus the three corrected pages).

## Alternatives considered

**Hand-edit the ~55 card sentences and leave the generator alone.** Rejected as primary fix: the next regeneration would silently reintroduce the wrong words. The committed pages ARE hand-replacement-free — they are regenerated output, so text and tooling cannot drift apart.

**Drop package-name segments from concept extraction entirely.** Rejected: guard cards like `repeat-tool-reminder` carry no other domain token and would fall back to generic prose, losing more precision than the wrong word cost.

**Change the global `'client'` entry away from 浏览器端.** Rejected: `packages/client/` pages use that word correctly for browser projections; a global change trades 9 wrong cards for dozens of newly vague ones.

## Consequences

Index pages web/guard/mcp open with accurate domain words (51 sentences corrected); future regenerations keep them correct by construction. The concept table now has three layers (global / prefix-scoped / paired), so adding a package whose name is not its domain requires one scoped entry — the mapping's failure mode is now explicit in code rather than discovered by readers.

## Testing

- `node study-tools/verify-source-index.mjs` — 2,973 entries, 0 structure errors.
- `node study-tools/verify-study-links.mjs` — 0 path errors across 41 handwritten sources.
- `node study-tools/study-companion.test.mjs` and `pnpm run website:build` stay green after the related sprite-module work in the same change set.
