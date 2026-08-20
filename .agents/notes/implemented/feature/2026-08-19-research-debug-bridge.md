# Agent Note: Research and Debug file handoff

Status: implemented

English | [中文](2026-08-19-research-debug-bridge.zh.md)

## Problem

The study site can explain a Harness mechanism and ask for evidence, while the separate Debug package can produce and inspect redacted diagnostic artifacts. Without an owned seam between them, either the learner manually compares unrelated JSON shapes or one product must gain ambient authority over the other. A browser-to-loopback connection, automatic PowerShell launch, or machine scan would make a learning page responsible for local execution and user data that it does not own.

## Decision

The site and Debug package cooperate only through a versioned, user-mediated file protocol. `website/public/research-debug-bridge.html` is a standalone static workbench backed by `research-debug-bridge.js` and `research-debug-bridge.css`. It creates a `dsh-research-diagnostic-request` v1 file from explicit course context, downloads that file only after a user action, can restore a manually selected request through the same schema projection, and imports a manually selected `dsh-research-diagnostic-result` v1 file. Imported fields are schema-projected and written through `textContent`; the page uses no fetch, WebSocket, loopback endpoint, cookie, browser storage, shared database, or automatic local command.

The Debug package remains a separate repository and executable. Its opt-in `research-bridge` action reads one explicit request and, when supplied, one explicit metadata-only `dsh-debug-repro` v1 file. It returns `COMPLETE`, `PARTIAL`, `UNAVAILABLE`, or `FAIL`, produces per-request `coverage`/`privacy`/`integrity` check results, checks a sibling manifest hash when present, rejects privacy violations and input/output path collisions, and fixes `evidence.trust` at `declared-metadata-only`. No ordinary diagnostic or repro action invokes this handoff automatically.

The two products remain independently useful. The site can generate requests and display synthetic result examples without Debug. Debug can validate a request, return `UNAVAILABLE` without evidence, or emit a result to stdout without the site. The file protocol reports artifact coverage and integrity state; it does not convert a course model into production runtime evidence.

## Alternatives considered

**A browser-to-loopback HTTP or WebSocket bridge** — rejected. It would introduce origin, port, authentication, lifecycle, and ambient local-network authority that a static learning site does not need.

**Let the website launch PowerShell or scan for DSH state** — rejected. A website does not own the user's process, Profile, Session, workspace, or credential boundaries, and automatic discovery would make the explicit-file privacy claim false.

**Embed the Debug implementation into the course repository** — rejected. It would couple releases and permissions, duplicate an independently useful tool, and blur whether a result came from teaching code or the diagnostic package.

**Accept raw Session, log, or Tool result files** — rejected. The handoff consumes only the existing redacted repro contract; widening it would move raw payload handling into a course integration without a need or a safe display contract.

## Consequences

The handoff adds manual request/result file selection, and a missing manifest stays an explicit `integrity=absent` warning rather than an integrity proof. Restoring a request rehydrates only v1-owned form fields and preset boundaries; it does not persist browser state or accept unknown fields. Learners must install and invoke Debug themselves when they want non-synthetic evidence. In return, the site has no default local authority, Debug does not scan the site or machine, both sides can evolve behind a small v1 schema, and a result cannot silently claim more than metadata coverage.

`COMPLETE` means every requested source kind occurs in the supplied repro and every requested check is `PASS`; it does not mean the original run happened, the lesson's model is an exact trace, the fault is fixed, or a production DSH Web instance was exercised. Those stronger claims still require their own Host, Session, browser, and runtime evidence. The course workbench now exposes eight bounded research-node presets; they generate a question and `canProve`/`cannotProve` limits, not pre-existing evidence.

The workbench also shows a copyable PowerShell template for the two user-run steps (`repro-export` followed by `research-bridge`). The template is guidance only: the user must replace paths and execute it outside the browser. The page does not launch PowerShell, inspect local files, or claim OS clipboard persistence; its feedback only reports that the browser accepted a clipboard write request.

The manual source-path verifier was also narrowed to paths explicitly rooted in the pinned DeepSeek Harness tree. It no longer guesses that unqualified paths from Kimi, OpenMAIC, Huashu, or the local workbench belong to that tree; those sources remain separate evidence records.

The project-local `dsh-source-grounded-course` skill now records the general handoff rule: restore only schema-owned request fields from an explicitly selected file, keep request/result separate from learner progress, and reject ambient machine authority.

## Verification

`node --test study-tools/research-debug-bridge.test.mjs` covers deterministic request generation, fail-closed safety, every result status, privacy and count rejection, text-only rendering, and absence of network/storage primitives. The Pages workflow runs this test before `doc-sync`. `node --check website/public/research-debug-bridge.js` checks syntax, while the documentation build verifies that the lesson and static assets publish under the configured Pages base path.

The Debug repository's `tools/Test-DSHResearchBridge.ps1` runs on PowerShell 7 and Windows PowerShell 5.1 with synthetic temporary files. It covers complete, partial, unavailable, invalid request, unsupported check, invalid privacy, missing/mismatched manifest, per-check status propagation, existing output, input/output collisions, unchanged inputs, public dispatcher routing, sensitive-marker exclusion, and offline behavior. Both repositories carry byte-identical canonical request/repro/manifest/expected fixtures. The development-only `study-bridge:contract-replay` runs the Debug bridge against the course copy and then validates the result with the course JS. These fixtures verify the protocol; they are not production DSH runtime proof.
