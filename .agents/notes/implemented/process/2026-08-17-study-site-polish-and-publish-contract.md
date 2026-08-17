# Agent Note: Study site polish and published-route contract

Status: implemented

English | [中文](2026-08-17-study-site-polish-and-publish-contract.zh.md)

## Problem

The study site already had a guided home page and a minimal example, but the beginner route was still only checked at the source-manifest level. A route could be present in Markdown and the VitePress manifest while a published page or reading asset was absent from the final `website/.dist` output. The repository's fixed-commit path checker also treated study-site-only assets as if they were official DSH source paths, and bilingual example links could not point at the translated README without failing structural comparison.

## Decision

The root VitePress navigation gives the Chinese study route a direct “start learning” entry, a direct minimal-example entry, a learning-toolbox entry, and a file-index entry. The site adds a localized footer, last-checked label, GitHub feedback link, and the tracked reading stylesheet while preserving the stock VitePress theme. These are presentation changes only; the repository remains a static Pages site with no new API, database, or runtime backend.

The beginner route separates roughly five minutes of vocabulary and repository mapping from roughly fifteen minutes of producing a fixed-commit source note. The [learning toolbox](../../../../study/31-学习工具箱.md) gathers entry, snapshot, A/B, index, and publication checks; the example README and lesson use one repository-root command form and state the expected exit status and reset step.

`study-tools/verify-built-study-site.mjs` defines a small published-route contract for the home page, START-HERE page, example directory, minimal observer page, and example lesson. It checks semantic content markers plus `reading.css` and `favicon.svg`, and its unit tests cover both a complete artifact and separate missing-page, missing-marker, and missing-asset failures. `docs:build` runs this check after the fragment verifier, so a successful build also confirms that the first-time route was emitted.

`study-tools/verify-study-publication.mjs` then reads the generated projection's `editSource` metadata, enumerates all Chinese study pages (lessons, file-index pages, START-HERE, the learning toolbox, and example pages), confirms that every page has a built HTML file and an H1, and checks same-site study links against the built route aliases. It is a route-coverage check, not a claim that a human has read every paragraph or that a runtime plugin works.

The fixed-commit path verifier exempts only the explicitly named study-owned paths `website/public/reading.css` and `website/.dist`; other `website/...` paths remain subject to the official tree check. The translation pairing signature canonicalizes only a terminal `.zh.md` suffix when comparing a link to the corresponding `.md` document; anchors, queries, and different destinations remain strict. This lets the Chinese example link to its Chinese README without weakening ordinary link-drift detection.

## Alternatives considered

**Add a server-side learning backend.** Rejected because the content is static, the user can begin from GitHub Pages, and a new service would add deployment, credentials, and runtime failure modes without helping the first source-reading exercise.

**Snapshot the whole generated HTML.** Rejected because VitePress and Shiki legitimately change markup and asset hashes. Stable page contracts and semantic markers catch route regressions while allowing harmless visual rebuild differences.

**Ignore every missing path below `website/`.** Rejected because that would hide a typo in an official DSH website source. The exemption is limited to the two study-repository-owned paths that caused the false positive.

**Force both language pages to link to the English README.** Rejected because the Chinese learning path should remain Chinese-first. The pairing checker now understands the narrow locale-suffix equivalence while continuing to compare the actual destination, anchor, and query.

## Consequences
The study learning contract is also checked before the Pages build: it keeps the home page, START-HERE, the key lessons, and both Chinese example READMEs explicit about the action, expected observation, and evidence boundary a first-time reader needs. It is a content-presence check, not a comprehension, browser, or DSH runtime test.

The first-time reader sees fewer competing navigation choices, receives a visible feedback path, and gets a toolbox entry that does not start DSH. The build checks that the pages and assets behind the route were emitted. The generated-site check still does not prove browser clicks, responsive accessibility, a real DSH Loader, a provider call, model quality, plugin unloading, or security. Those remain separate evidence levels in the study material. The checked-in site is intentionally a static projection chain: Markdown and source manifests feed VitePress, the build produces `.dist`, and GitHub Pages serves that output.
