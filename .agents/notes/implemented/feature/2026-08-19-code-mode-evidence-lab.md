# Agent Note: Deterministic Code Mode evidence lab

Status: implemented

English | [中文](2026-08-19-code-mode-evidence-lab.zh.md)

## Problem

The study material explains that a Code Mode sub-call retains its parent identity and traverses the tool pipeline, but prose and screenshots cannot let a learner test the distinction between a policy decision, a tool-body execution, and a committed result. Reusing a production trace would also collapse two evidence classes: a fixed implementation record and a simplified model intended to teach one invariant. The site needs an interactive path that is repeatable without a model key, Host, Session, local port, or machine scan and that remains usable without motion or a graphical timeline.

## Decision

The study site publishes [a standalone evidence lab](../../../../website/public/code-mode-evidence-lab.html) backed by [one pure model module](../../../../website/public/code-mode-evidence-lab.js) and an external stylesheet. Its public interface accepts only a seed, one of three teaching policies, and a body-parallelism cap:

```js
simulateCodeMode({ seed, policy, parallelism })
// => { calls, frames, events, observations, oracle, canProve, cannotProve }
```

The model creates one fictional outer `run_code` call and four fictional child tools. Every child records dispatch, pre-execute, policy decision, post-execute, and result stages. Allowed children record exactly one body interval; denied children record none. Parallel-classified bodies may overlap up to the selected cap, while the exclusive body runs without another body and holds the model barrier through its ordered commit. A fixed seed controls generated ids and body durations only; it never changes the selected policy.

`evaluateCodeModeOracle` reads the produced events independently of the renderer. It checks parent linkage, pipeline order, policy agreement, zero denied-body executions, one body for each allowed call, one result for every child, bounded overlap, exclusive isolation, and outer settlement after all child results. The test suite injects a body-start event into a denied call and requires the oracle to fail, so a green view is not pinned by the same display branch that paints it.

The timeline uses two semantic dimensions: discrete tick on the horizontal axis and execution lane on the vertical axis. It supports seek, previous, next, play, pause, reset, meaningful first and final frames, native range-input keyboard control, documented global shortcuts, and an always-present event table. Reduced-motion preference disables automatic playback. The lab uses no third dimension because this state model has no third semantic variable.

The HTML sets `connect-src 'none'` and the implementation contains no network request, loopback discovery, cookie, browser storage, HTML interpolation, automatic Debug handoff, or local command. The lab and the existing [Research and Debug file handoff](2026-08-19-research-debug-bridge.md) remain independent: the first teaches a deterministic model, while the second exchanges user-mediated JSON files. The [course chapter](../../../../study/33-确定性可视化实验协议与Code-Mode权限管线.md) labels source facts, model-derived observations, local test results, browser evidence, and unknown runtime behavior separately.

This note owns only the course lab and its evidence contract. It does not supersede the [Code Mode foundation](2026-06-15-code-mode.md) or [live parallel dispatch](2026-07-26-code-mode-live-parallel-dispatch.md) decisions, which continue to own the shipped runtime behavior that the lesson cites.

## Alternatives considered

**Render a captured production trace.** Rejected because no approved trace belongs to this static course artifact, a fixture would still not prove a current Host run, and exposing real Session content would widen the page's data authority. The teaching model labels its invented calls and ticks instead.

**Use a three-dimensional scene.** Rejected because parent, policy, and execution order fit a time-by-lane diagram. A decorative depth axis would add camera and fallback costs without encoding another fact.

**Attach the lab to the Debug bridge or a loopback service.** Rejected because a policy lesson does not need ambient local authority. Users can separately export and import the existing versioned JSON files when they need explicit diagnostic evidence.

**Animate mutable UI state without a pure model or independent oracle.** Rejected because seek, deterministic tests, reduced-motion behavior, and tamper detection would then depend on renderer state. The view projects returned frames and events instead.

## Consequences

The lab is keyless, repeatable, inspectable through text, and testable under Node before browser QA. A learner can compare deny and allow paths without mistaking the absence of a body for the absence of a result, and can see that allowing a child does not remove its policy stage.

The model deliberately omits production event fields, real durations, plugin-specific approval text, cancellation, failures inside an allowed body, deferred contexts, and external side effects. Its oracle proves the model's stated invariants only. Source tests, a real assembled Host, real-model E2E, browser operation, and public Pages deployment remain separate evidence.

## Verification

`node --test study-tools/code-mode-evidence-lab.test.mjs` covers byte-identical replay, deny-write, allow-all, deny-all, parallelism bounds, first and final frames, oracle tamper rejection, invalid inputs, the content security policy, and absence of network, storage, uncontrolled randomness, HTML interpolation, and unsupported rendering primitives. `node --check website/public/code-mode-evidence-lab.js` checks the module syntax. The Pages workflow runs the lab test with the existing bridge test before documentation projection and build.
