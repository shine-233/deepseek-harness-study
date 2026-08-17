# Agent Note: Offline minimal plugin lifecycle workbench

Status: implemented

English | [中文](2026-08-17-minimal-plugin-workbench.zh.md)

## Problem

The study route explained plugin lifecycle and unload evidence, but it did not give a small runnable path from a built plugin artifact through the real Loader to completed cleanup. A static code excerpt would not prove that the Loader can import the artifact, activate its Fiber, or remove its service.

## Decision

The repository contains `study-tools/minimal-plugin-workbench`. Its TypeScript source compiles to an ignored `dist/minimal-plugin.js` artifact. The runner creates a real Cordis `Context`, installs the real `@deepseek-ai/cordis-plugin-loader`, creates a Loader entry for the built artifact, reads the service registered by `ctx.provide()`, observes its heartbeat effect, removes the entry, and asserts that the service is absent, the entry tree is empty, and the heartbeat remains stopped after disposal.

The workbench is an offline study tool rather than a published package. It performs no model request, network request, Host/Web startup, credential read, or real hot swap. The accompanying Chinese lesson records this evidence boundary and links the implementation lines for further reading.

## Alternatives considered

**A static transcript or fake registry** — rejected. It would not exercise Cordis Fiber ownership, Loader module import, service registration, or disposer ordering.

**A full DSH Host/Web composition** — rejected for the first exercise. It would add model, port, browser, and platform conditions before the learner has a small lifecycle proof; the lesson explicitly identifies those as separate unverified surfaces.

**A separately published npm package** — rejected. The workbench is a version-pinned teaching fixture and its generated `dist/` output is intentionally local; publication and consumer-install evidence belong to a real extension project.

## Consequences

Learners can reproduce a build → Loader registration → unload loop without an API key or network. The smoke asserts observable runtime relationships instead of trusting a success string. The exercise does not certify DSH profiles, bundles, Web/CLI hosts, real models, third-party installation, or cross-platform behavior.

## Verification

`pnpm --dir study-tools/minimal-plugin-workbench run build` compiles the plugin and writes a deterministic artifact digest. `pnpm --dir study-tools/minimal-plugin-workbench run verify` loads the artifact through Loader and passes assertions for active service state, heartbeat progress, disposed service state, absent service, zero remaining entries, and a stable heartbeat after disposal.
