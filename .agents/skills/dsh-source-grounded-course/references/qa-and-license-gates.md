# QA and license gates

Do not release or recommend direct reuse until every applicable gate has a recorded result. Use `not-applicable` with a reason; do not silently omit a promised surface.

## Gate 0: Scope and mutation

- Confirm audit/build/prototype mode.
- Record allowed repositories, websites, files, and output paths.
- Preserve dirty worktrees and unrelated changes.
- Confirm whether installation, model/API use, deployment, push, or publication is authorized.

## Gate 1: Source and license

- Pin full commit/tag/edition and retrieval date.
- Record root and package-level license files.
- Treat README-only license text with no pinned LICENSE as `license-unconfirmed`.
- Treat repository license and site/content license separately.
- Block GPL code copying into an MIT project unless the project license strategy explicitly changes.
- Block copying copyrighted course prose, question banks, paper figures, author identity, and personal material without permission.
- Record attribution and notice requirements for reused MIT/Apache assets.

## Gate 2: Manifest and structure

- Parse JSON/YAML successfully.
- Resolve every `sourceRef`.
- Enforce globally unique source/chapter/section/claim/exercise/lab/widget IDs.
- Recompute declared counts.
- Detect orphaned claims, labs, browser runs, and artifacts.
- Verify source snapshots match the intended build.

## Gate 3: Static and deterministic logic

- Run parser/type/lint checks.
- Run unit/property/round-trip tests.
- Test fixed seeds and boundary inputs.
- Test a deliberate tamper or broken condition that must fail.
- Validate selectors against generated HTML.
- Validate the action whitelist and message schema.
- Confirm reset reconstructs the initial state.
- Confirm every lab exposes `canProve` and `cannotProve`.

## Gate 4: Build and degraded paths

- Build from modular source to the consumer artifact.
- Record local/runtime versions and exact command.
- Verify first paint, loading, empty, error, offline/CDN-failure, non-JavaScript, and non-WebGL paths when promised.
- Verify lazy-loaded chapters/widgets fail visibly and recoverably.
- Do not call a successful build browser proof.

## Gate 5: Real browser

Enumerate every route/chapter for presence. Deep-test a beginner chapter, middle chapter, hardest chapter, and edge/appendix path.

For each deep path:

1. assert page/chapter identity and non-empty content;
2. use one navigation or mode control;
3. submit a correct answer;
4. submit a wrong/boundary answer and retry;
5. request every hint level and confirm added information;
6. change a lab input and compare to the oracle;
7. exercise break/reset/seek/replay;
8. create and reload a note/card if supported;
9. export/import and validate stable IDs if supported;
10. inspect console, page, resource, and network errors.

Record viewport, device scale, theme, reduced-motion preference, action, expected observation, actual observation, and artifact/log path.

## Gate 6: Accessibility and layout

- Keyboard-reach every meaningful control.
- Verify visible focus.
- Verify labels, roles, status announcements, and error association.
- Verify touch targets and narrow viewports.
- Verify no unintended horizontal overflow.
- Verify reduced motion changes behavior rather than only showing a badge.
- Verify 3D has a keyboard-usable 2D/table/text fallback.
- Verify dark/light contrast and loading/error legibility.

## Gate 7: State and privacy

- Define temporary iframe state, durable learner state, and course progress separately.
- Test reload, scene switch, eviction, export/import, and migration boundaries.
- Version persisted state and reject/migrate incompatible imports.
- Default learner data to local storage when the product allows it.
- Do not upload answers, notes, source, logs, or history without explicit informed choice.
- Do not read credentials, cookies, browser profiles, or unrelated private data during QA.

## Gate 8: Evidence reconciliation

Publish separate lists of:

- browser-verified behavior;
- source-verified implementation;
- self-reported project claims;
- inferences;
- conflicts;
- unknowns.

Reconcile source, manifest, rendered, and README counts. Record browser failures even when the visual result is attractive.

## Known project-specific blockers at the 2026-08-19 snapshot

- OpenMAIC source/test design is inspected, but dependencies, local service, model routes, unit tests, and E2E were not run.
- OpenMAIC's 3D prompt contains an `action/payload` example that conflicts with the prevailing `type/state/target/content` contract.
- The public ECC generated course loads but reports a `JSON.parse` error in `main.js:391`; complete flow animation is not healthy evidence.
- UpSkillOS is GPLv3 and its Windows checkout is incomplete because of long paths; read through Git objects and do not copy implementation files.
- `codebase-to-course` and `agent-skills` have README MIT statements but no independent LICENSE in their pinned trees.
- DSH/Kimi scenes and labs are teaching models unless tied to an executed production trace or independent oracle.
