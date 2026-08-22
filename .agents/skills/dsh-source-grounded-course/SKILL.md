---
name: dsh-source-grounded-course
description: Audit, design, build, and verify source-grounded interactive courses from papers, documentation, source repositories, community skills, and reference learning sites, with special support for DeepSeek Harness/DSH and Kimi-style labs, 3D visualizations, quizzes, evidence manifests, and browser QA. Use when Codex must inspect relevant source files and pages, turn claims into prerequisite-aware lessons, extract reusable mechanisms from public course projects, improve deepseek-harness-study, or create a course skill without confusing README claims, static source, browser behavior, and production runtime evidence.
---

# DSH Source-Grounded Course

Build a course whose claims can be traced, whose labs can be falsified, whose learner state can be recovered, and whose browser behavior is tested. Reuse mechanisms from reference projects without copying an author's identity, unlicensed templates, or unverified promotional claims.

## Select the operating mode

- Use **audit** to inspect sites, repositories, papers, skills, licenses, tests, and live behavior without changing the course.
- Use **improve** to update the existing course, evidence manifest, tests, and QA records in one pass.
- Use **build** to create new chapters, labs, widgets, question sets, or a course runtime from pinned sources.
- Use **prototype** only when an interaction or state model is still uncertain. Make the prototype disposable, deterministic, and visibly expose all state before carrying it into the course.

Do not turn an audit request into installation, deployment, publication, system configuration, or third-party messaging. Continue in one session when agent creation is forbidden or rate-limited; agents are optional, never a prerequisite of this workflow.

## Load only the needed project evidence

For work in this repository, read the relevant current research before editing:

- Deterministic visualization and Code Mode protocol: [study/33](../../../study/33-确定性可视化实验协议与Code-Mode权限管线.md)
- Progressive course design and its QA closure: [study/32](../../../study/32-源码学习项目的渐进式设计.md)
- Maintenance and version migration: [study/18](../../../study/18-维护更新与版本迁移.md)
- Machine-readable source index: [source-index-manifest.json](../../../study/source-index-manifest.json)

The earlier research matrices (reference-site browser evidence, Shubham comparison, writing-evidence, course-project matrix, source-evidence manifest) were consolidated away in a later reorganization; their surviving engineering rules live in this skill and in the two lessons above.

Read [evidence-contract.md](references/evidence-contract.md) before adding or changing sources, browser runs, or claims. Read [widget-runtime-contract.md](references/widget-runtime-contract.md) before implementing a lab, iframe, 3D scene, or teacher action. Read [qa-and-license-gates.md](references/qa-and-license-gates.md) before calling an artifact complete or reusable.

## Execute the workflow

### 1. Freeze every input before interpreting it

Record the URL or local path, retrieval date, commit/tag/edition, content hash when practical, license, public attribution, audience, language, device/offline target, and build/deploy boundary.

Treat these as separate sources:

- a live website;
- the repository a website links to;
- a paper or official specification;
- a user-supplied attachment;
- an author's article or social post;
- a community skill or README.

Do not infer site ownership from repository authorship. Keep old and new attachment paths when their hashes match; record the provenance transition instead of silently replacing it.

### 2. Inventory source and rendered behavior independently

Use `rg --files`, `git ls-tree`, `git show`, build configuration, schemas, tests, and license files to inventory a pinned source tree. Use a real browser to enumerate routes/chapters and operate representative controls.

For each important surface, record:

1. what the learner can see;
2. what action the learner can perform;
3. which file or data entry appears to implement it;
4. what changed after the action;
5. console, page, resource, and loading errors;
6. what the action cannot prove.

Do not equate a route hit, DOM node, screenshot, test filename, README count, or GitHub star count with a working learning flow.

### 3. Classify every non-trivial claim

Use exactly these evidence statuses:

- `browser-verified`
- `source-verified`
- `self-report`
- `inference`
- `conflict`
- `unknown`

Attach a source ID and narrow locator to every number, formula, definition, implementation statement, quotation, causal conclusion, and license conclusion. Preserve both sides of a conflict. Write `unknown` when the source does not answer the question.

### 4. Build the learning map before writing polished prose

Assign stable IDs to sources, chapters, sections, claims, figures, labs, exercises, knowledge cards, and browser runs. Build both a linear chapter order and a prerequisite graph. Add a diagnostic entry path for learners who already know part of the material.

Use this chapter rhythm when an interaction is justified:

```text
problem and missing prerequisite
→ small worked explanation
→ source/code walk
→ prediction
→ deterministic experiment
→ oracle and observation
→ misconception repair
→ changed-surface transfer question
→ recap, evidence links, and next prerequisite
```

Do not add an animation merely to decorate an explanation.

### 5. Define seams from state, capability, and failure boundaries

For each proposed plugin, widget, module, or course service, answer:

1. Which state does it own?
2. Which capability does it expose?
3. What can replace it without editing it?
4. Which lifecycle creates, updates, resets, or destroys it?
5. Which policy or permission gates it?
6. Which failures must remain local and observable?

Prefer a monolith with explicit seams over premature package fragmentation. Split only when lifecycle, state, policy, dependency, replaceability, or failure isolation independently demands it.

Treat Cordis-style reversible internal effects as a design goal, not magic rollback. Email, payment, deployment, merged changes, network calls, and deleted external resources require compensation or an `unknown outcome`; an in-process dispose hook does not undo them.

### 6. Separate authoring source, evaluated content, runtime, and export

Keep four layers distinct:

- raw source and immutable snapshots;
- structured lesson/claim/widget data;
- runtime rendering and learner state;
- generated HTML, PDF, DOCX, video, or deployed bundle.

Use stable IDs across languages and exports. Overlay edits on raw lesson data instead of serializing unrelated defaults. Validate serializer round trips and avoid noisy rewrites. Make every bundled artifact reproducible from modular sources.

For a course-to-tool handoff, prefer a versioned, explicit-file-only request/result protocol. A user-selected request may be restored by schema-validating and projecting only fields owned by the course form; it must not scan the machine, start a command, use ambient loopback authority, or persist unknown fields. Keep request/result artifacts, durable learner state, and course progress as separate state classes.

### 7. Implement interactions through a narrow contract

Define one widget schema and one action protocol. Generate content first, extract real element IDs/data attributes second, then generate or validate actions against that inventory.

For this course, normalize parent-to-widget messages to:

```text
event.data.type
event.data.target
event.data.state
event.data.content
```

Do not mix this with an `action/payload` variant unless an explicit adapter and tests exist. Allow only a small action whitelist such as highlight, set-state, annotate, and reveal.

Keep learner clicks, reset, imported state, and `SET_WIDGET_STATE` on one central state object and one render path. Require reset to restore the actual initial state, not just change a label.

### 8. Make every lab falsifiable

Accept explicit inputs and a seed. Return full state, observations, and an independent oracle. Compute displayed values from the model. Add a deliberate break condition when it teaches a real misconception.

Publish `canProve` and `cannotProve` beside the lab. Label constructed conversations, pseudo-random routes, reduced dimensions, heuristic token estimates, and theoretical bounds. Do not convert a theoretical upper bound into a guaranteed observed measurement.

Use 3D only when the third dimension has a named semantic meaning. Provide seek, meaningful first/last frames, reduced motion, keyboard operation, labels, and a 2D/table/text fallback. Treat camera motion, glow, and particle speed as presentation unless they encode a documented variable.

### 9. Isolate generated interactive HTML

Prefer a sandboxed iframe for generated or imported HTML. Do not combine `allow-scripts` and `allow-same-origin` for `srcDoc` content. Communicate through a narrow `postMessage` contract.

Capture synchronous parse errors, `window.onerror`, unhandled rejections, `console.error`, and resource failures early. Buffer and replay errors when the parent listener may subscribe after document parsing. Associate errors with stable scene IDs and clear stale errors after content changes.

Use keep-alive only when preserving in-widget state is an explicit product requirement. Bound resident documents with LRU eviction, protect the active scene, and make content change the only intended reload path. Still provide explicit export/import for durable learner state; iframe keep-alive is not persistence.

Gate procedural or real-world-operation widgets explicitly. Default them to a safe diagram or read-only explanation unless the task, success criteria, failure consequences, and permissions are all modeled.

### 10. Write from evidence, not from an imitated persona

Preserve entities, numbers, dates, URLs, citations, uncertainty, and conflicts. Use the user's supplied samples when matching voice. Otherwise use a neutral technical register.

Do not copy a living author's identity, personal experience, fixed CTA, contact details, signature phrasing, or complete style recipe. Do not invent user experience to make prose sound human. Do not use a fixed banned-word list, sentence quota, or detector score as the quality gate.

### 11. Verify as a learner

Run the applicable gates from [qa-and-license-gates.md](references/qa-and-license-gates.md):

- schema, ID, source-reference, link, count, and license checks;
- parser/type/unit/property/round-trip/build checks;
- fixed-seed oracle cases and deliberate tamper cases;
- real browser traversal with correct/wrong answers, lab changes, reset, reload, persistence, export/import, and error logs;
- desktop/mobile, keyboard, focus, reduced motion, overflow, dark/light, offline/degraded network, and non-WebGL checks where promised.

Report the exact command, viewport, action, expected result, actual result, and uncovered surface. Do not call the whole course complete because one representative path is green.

## Deliver the result

Return or update:

1. changed artifact links;
2. source snapshots and licenses;
3. evidence manifest and claim ledger;
4. learning map and stable ID counts;
5. commands and browser actions actually run;
6. verified facts;
7. project/README self-reports;
8. inferences;
9. conflicts;
10. unknowns and next proof needed.

State whether dependencies were installed, whether a model/API key was used, whether the local service ran, and whether tests were merely found or actually executed.

## Preserve hard boundaries

- Preserve dirty worktrees and unrelated changes.
- Do not install dependencies, publish, deploy, push, read credentials, or change system settings unless explicitly authorized.
- Do not copy GPL code into an MIT project.
- Do not copy a template whose pinned license is unconfirmed.
- Do not present a teaching model as a production trace.
- Do not present a static test as a runtime pass.
- Do not hide a browser error because the page still looks impressive.
- Do not let an attractive 3D scene outrank its oracle, fallback, or evidence boundary.
