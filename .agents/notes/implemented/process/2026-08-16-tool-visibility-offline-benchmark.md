# Agent Note: Provider-free tool visibility A/B benchmark

Status: implemented

English | [中文](2026-08-16-tool-visibility-offline-benchmark.zh.md)

## Problem

The tool-visibility study had an offline snapshot inspector and an A/B invariant checker, but it did not measure the local work needed to parse snapshots, compute visible-set differences, or serialize the visible list. A provider-free experiment also needs an explicit statement that these measurements are not model latency evidence.

## Decision

`study-tools/benchmark-tool-visibility-ab.mjs` accepts two validated snapshot JSON texts and runs a repeatable local benchmark with configurable warmup and iteration counts. It measures `JSON.parse` for each snapshot, visible-name collection difference for the pair, and `JSON.stringify` for each visible list. It reports Node.js/platform context, wall-clock observations, deterministic UTF-8 byte/count indicators, the comparison change, and `providerCalls: 0` / `apiKeyRequired: false` evidence.

The benchmark reuses the existing A/B comparison rules and refuses pairs whose fixed conditions or shared visible-tool presentation differ, or whose visible set does not change. `study-tools/benchmark-tool-visibility-ab.md` defines the command, reading guide, repeatability procedure, and evidence boundary. The unit tests inject a clock so correctness does not depend on timing thresholds.

## Alternatives considered

**Call a real provider and record response latency.** This would measure a different experiment, require credentials and network control, and exceed the requested provider-free slice. It remains a separate future experiment with provider token, queue, first-token, total-latency, quality, and cost fields.

**Report only schema bytes and rough tokens.** This would be deterministic and useful as a request-size proxy, but it would leave snapshot parsing, collection comparison, and serialization costs unobserved. The shipped benchmark records those local operations as well.

**Add timing thresholds to the unit tests.** This would make correctness depend on machine load, JIT behavior, and garbage collection. Tests verify report structure and deterministic indicators; timing is reported evidence, not a pass/fail gate.

## Consequences

The study now has a keyless, offline performance slice that can be rerun against fixed fixtures and compared across environments. Its byte and count indicators are stable for the same JSON inputs, while wall-clock timings must be interpreted as local observations. The benchmark cannot establish provider token counts, model latency, tool execution time, task quality, or cost, and the Chinese guide states those limits next to the command.
