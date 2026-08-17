# Agent Note: Publish complete study reference and neutral visibility probe

Status: implemented

English | [中文](2026-08-16-study-reference-and-visibility-probe.zh.md)

## Problem

The Chinese source-learning route needs to be readable from GitHub Pages, including the generated per-folder indexes, while the tool-visibility lesson needs a reproducible observation aid that does not pretend to be a DSH runtime hook or a provider tokenizer.

## Decision

The website projects every Markdown page under `study/文件索引/` and gives source filenames a VitePress-safe public route: dot-prefixed names use `dot-`, and every remaining dot uses `-dot-`, while the canonical source path and sidebar label stay unchanged. Only generated index prose is escaped for Vue template safety. The study materials add a neutral JSON snapshot example, an offline Node checker, and an A/B structure preflight that reports set differences, schema byte counts, and execution decisions without importing DSH, connecting to a model, or modifying runtime state. Lessons 23 and 24 document the observation method, A/B experiment limits, and a five-file manual audit.

## Alternatives considered

**Keep large indexes GitHub-only.** This avoids the larger Pages artifact but breaks the promised “start from the website and open any file” route, so it does not satisfy the study surface.

**Rewrite generated canonical index Markdown.** This would make the generated source drift from the fixed-source index and would make GitHub links less faithful. The projection layer owns only the VitePress route and rendering adaptation.

**Implement a private runtime hook or call a provider tokenizer.** That would require credentials, a runtime-specific integration, and a stronger security and measurement contract than this learning repository owns. The checker therefore accepts an explicit host-exported snapshot and labels byte-based token estimates as heuristics.

## Consequences

Pages now carries all 66 generated index pages, including large client and script references, so builds take longer and the sidebar keeps them collapsed. Dotted index routes remain inside a configured GitHub Pages base path, including names such as `vitest-dot-web-dot-config-dot-ts`. The offline checker and A/B preflight are useful for teaching and comparing exported snapshots, but they cannot prove the actual prompt, provider token count, model latency, model quality, or tool execution. A future host or patched fork must own any private observation seam and publish its permissions, version range, and rollback procedure.
