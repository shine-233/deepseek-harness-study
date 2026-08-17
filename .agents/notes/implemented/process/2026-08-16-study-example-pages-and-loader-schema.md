# Agent Note: Study example pages and loader schema

Status: implemented

English | [中文](2026-08-16-study-example-pages-and-loader-schema.zh.md)

## Problem

The first runnable study example needed to be useful from the Pages site and structurally honest about what a DSH Bundle exports. Its README links were external even though the study repository owned the material, and a type-only `Config` description did not give a real Loader a schema to consume.

## Decision

The Chinese README pages for `study-examples/` are projected into the root-only `zh-study` collection. English README paths remain source aliases so links authored for GitHub resolve to the same Pages lesson instead of escaping the learning route. Source, test, and patch files remain GitHub links; the site does not copy executable code into the generated documentation tree.

The minimal observer exports a Schemastery `Config` schema whose defaults are the deployment defaults. `resolveConfig()` still performs strict direct-call checks for unknown keys and safe positive integers before using that schema's normalized values. The root development dependencies provide the workspace schema package so the example's test and lint commands run after one repository install. These checks still use a fake context and do not claim a real Loader/Profile composition or Fiber disposal.

The study sidebar exposes the example as an optional first terminal exercise, while the home and first lesson retain a no-download reading path. The projection test checks the two example routes, their aliases, and the distinction between a published example README and an unpublished review file.

## Alternatives considered

**Keep the example README on GitHub.** This preserves the original repository layout but makes the Pages learning route jump away at its first hands-on step. It loses the benefit of a single readable site without adding runtime evidence.

**Export a plain `Config` object or only a JSDoc typedef.** Cordis expects a Standard Schema-compatible export for loader configuration. A plain object would teach a shape that the host cannot validate, so the example uses the same Schemastery contract as a product plugin while keeping its local test dependency-light in behavior.

**Copy the example source into the website.** Duplicating JavaScript would create a second source of truth and could make a rendered code copy look like a verified product artifact. The projection publishes the README only and sends code links to the repository.

**Add a real Loader/Profile test in this change.** That would require choosing a host composition, version pin, cleanup assertions, and a process boundary. The current example keeps those as an explicit next evidence level rather than implying them from a fake-context unit test.

## Consequences

New readers can stay on Pages while reading the example's explanation, then open the exact source files when they are ready to use a terminal. The example follows the host's configuration export convention and fails direct misconfiguration loudly. The repository still needs a real Loader/Profile composition test, unload observation, and provider evaluation before the example can claim runtime compatibility.
