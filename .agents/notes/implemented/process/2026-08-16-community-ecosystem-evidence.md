# Agent Note: Dated public GitHub evidence for the DSH ecosystem

Status: implemented

English | [中文](2026-08-16-community-ecosystem-evidence.zh.md)

## Problem

Public DSH repositories use overlapping words such as plugin, bundle, hook, fork, patch, injector, and registry. A topic search or a README can therefore be mistaken for an official registry, a compatibility statement, or a security review. Search totals also change with indexing time and query parameters.

## Decision

The community study documents treat public GitHub research as a dated observation ledger. Every external project name, count, and compatibility statement carries a source URL and access date. The prose labels the evidence as upstream fixed source, fixed community source/manifest, project self-description, repository metadata, or search-index observation.

The study keeps four classifications separate: a normal plugin uses public DSH/Cordis or Bundle entry points; an upstream hook bridge translates a documented external command-hook subset; a patched fork changes and maintains a DSH source checkout; an injector or registry-modification tool reaches loader internals, caches, Fiber state, links, or host tables. A manifest or `apply(ctx)` proves none of these classifications by itself.

Topic totals are recorded only as query-time observations. README claims, stars, release labels, self-tests, and loadability do not become independent compatibility, safety, or official-endorsement evidence. Runtime installation, execution, unload, rollback, and cross-version claims remain open until separately verified in a controlled environment.

## Alternatives considered

**Treat the `dsh-plugin` topic as an official catalog.** Rejected because the search result includes the upstream repository, directories, wrappers, and projects that merely mention DSH; it has no demonstrated maintainer review contract.

**Treat a community README or manifest as compatibility proof.** Rejected because those files establish what the project claims or packages, not whether a target DSH commit runs, unloads cleanly, or preserves permissions and lifecycle semantics.

**Run every discovered project before documenting the boundary.** Rejected for this slice because broad installation would change the host and mix incompatible profiles; the study records the static evidence and leaves controlled runtime verification as an explicit follow-up.

## Consequences

Readers can distinguish discovery evidence from source evidence and runtime evidence, and a changed topic count does not silently become a changed product claim. The documentation is longer and requires maintenance of source URLs, fixed commits, and access dates. Community samples remain useful for learning the ecosystem, but none is presented as an official, secure, or generally compatible extension without stronger evidence.
