# Agent Note: Redacted ToolRuntime debug snapshots

Status: implemented

English | [中文](2026-08-16-tool-runtime-debug-snapshot.zh.md)

## Problem

Hosts need evidence for the difference between a tool registered in a layer, known before restrictions, visible to scoped runtime lookup, and actually projected to the model-facing host. Existing public methods intentionally return either executable definitions or complete schemas, so they are not a safe diagnostic payload and do not report restriction causes or schema byte cost together.

## Decision

`ToolRuntime.debugSnapshot(scope?)` returns a deeply frozen JSON-serializable snapshot containing only the exact-layer `registered` names, pre-restriction `known` names, effective runtime `visible` names, `hiddenByRestriction`, the effective presentation mode, and compact JSON UTF-8 byte counts for each schema in the actual model-facing wire projection. Scope identity, execute/presenter callbacks, arguments, credentials, and user content are excluded.

The snapshot keeps runtime lookup and model presentation separate. In Code Mode, `visible` can include SDK-reachable tools while `visibleSchemas` contains only the direct `run_code` schema; `hiddenByRestriction` contains only inherited names removed by allow/deny filters and never scope-local registrations. The byte count is a deterministic serialization-size indicator, not provider tokenization or a complete prompt size.

## Alternatives considered

**Expose `ToolDefinition` or `schemas()` directly.** This would make a diagnostic caller retain executable callbacks or complete schema content and would not identify whether a missing name was restricted or merely absent from the selected presentation. The snapshot projects names and costs into a separate redacted value.

**Add a new system-prompt or agent-loop event.** That would widen the change into a transport or orchestration contract and still would not make the registry facts safe for arbitrary host diagnostics. The API reuses the registry's existing scoped view and wire projection without changing either consumer.

**Return only one visible list and one total byte count.** That would hide the distinction between SDK-reachable Code Mode tools and direct model schemas, and would make scope-local registrations indistinguishable from inherited names. The small additional fields preserve those existing semantics without returning schema bodies.

## Consequences

Hosts can record a stable, privacy-bounded explanation of scope filtering and presentation changes and can compare schema-size deltas without importing private registry state. The API does not prove provider token counts, prompt-listener replacements, OS authority, execution permission, or tool success; callers must keep those as separate observations. No generated catalog, system-prompt source, or agent-loop source is changed.
