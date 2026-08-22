# Agent Note: Progress pill, graded quizzes, runnable code cells, and the plugin-flow lab

Status: implemented

English | [中文](2026-08-22-progress-quiz-code-cell-plugin-flow.zh.md)

## Problem

The course had four gaps against its own benchmarks: learner progress died with the page (lab inputs lived in URL hashes only), lessons 00–02 had no graded self-checks, teaching snippets could only be executed by jumping to a terminal, and lesson 11 described subscription/denial/unload semantics in prose without an experiment.

## Decision

Four pieces, each following the existing lab contract:

1. **Progress (`study-progress-core.js` + `study-progress.js`, v2).** A bottom-right pill marks a lesson read or toggles it off; state lives exclusively in `localStorage` key `dsh-study-progress-v1`, guarded against private-mode failures, with JSON export/import for moving between devices. The research-debug bridge keeps its explicit no-storage promise — progress is not user-input data. Labs count as progress too (`labs` table, `markLabDone`). The module self-guards DOM access so `lab-modules-import-without-dom` can import it in Node.
2. **Quizzes (`study-quiz.js`).** Three source-cited questions per pilot lesson (00/01/02); instant client-side scoring; every wrong answer shows an explanation plus a link back to the section. Best score per lesson is recorded into progress.
3. **Runnable cells (`study-code-cell.js`).** Fenced blocks marked `js-run` become editor/run/output triplets. User code executes inside a sandboxed iframe (`allow-scripts`, no same-origin) built from inline srcdoc — no eval on the host page, no external service, no network. Output returns over `postMessage` with a 200-line cap; the cell cannot touch page storage because the sandbox origin is opaque.
4. **Plugin-flow lab (`plugin-flow-model.js` + page trio).** The minimal observer plugin drawn as one ordered timeline across tool / event bus / plugin / session-log lanes, with scenario (normal / denied / unload-midway), subscription toggle, preview length, prediction gate, independent oracle (`FLOW_DETERMINISTIC`, `LOG_COMPLETE`, `PREVIEW_RULE`, `EFFECTS_CLEAN`, `UNLOAD_SEMANTICS`), full text table, and hash state links. Wired into lesson 11 together with a `js-run` walkthrough of the same observer logic.

Injection moved from a favicon-probing inline script to the official extension point: `theme/index.ts` loads the module via `withBase`.

## Alternatives considered

- In-page code editing through `new Function`: rejected — lab pages carry a deliberately strict CSP (`unsafe-eval` would be a security regression), and host-page eval gives user code access to page storage.
- WebContainers or Playground-style remote runtimes: rejected — an external service with network dependency and licensing cost contradicts the offline, no-backend posture.
- A step-seek slider for the flow lab: deferred — compaction-lab also ships without one, and prefix truncation would re-implement turn-flow's oracle semantics without adding a new teaching point.

## Consequences

- Progress state now lives in localStorage; the START-HERE disclosure covers it, and export/import replaces device sync.
- Every future public module must keep DOM access behind environment guards; the import gate now enforces that for us.
- Quiz content becomes a maintenance surface: new pilot lessons need source-cited questions, or the bank silently stays at three lessons.
- Lesson 11 now carries two interactive embeds plus three code fences — the heaviest teaching page; watch bundle size and mobile layout in the next browser QA pass.

## Verification

`node --test study-tools/*.test.mjs` green (plugin-flow adds 12 cases incl. tamper and grid coverage); `study:quick-check -- --example --runtime` green after fixing a top-level DOM access the import gate caught; `docs:build` green with homepage metrics resynced (227 + 8).

## Boundaries

Quizzes cover the pilot lessons only; cells run JavaScript, not TypeScript or DSH itself; the simulator is a teaching model, not a real Loader trace.
