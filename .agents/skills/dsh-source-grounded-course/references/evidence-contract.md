# Evidence contract

Use this contract for every source, browser run, claim, and generated artifact.

## Source record

Record:

```json
{
  "id": "repo-example-abcdef0",
  "kind": "source-repository",
  "url": "https://github.com/org/repo/tree/full-commit",
  "locator": "optional local cache path",
  "retrievalDate": "YYYY-MM-DD",
  "snapshot": "full commit, tag, edition, or deployment state",
  "license": "verified file and scope, or license-unconfirmed",
  "notes": "what was and was not inspected or run"
}
```

Separate a rendered site from its repository. Separate a user attachment from an article that discusses it. Preserve previous attachment locators when a later upload has the same hash.

## Claim record

Record one narrow falsifiable statement per row:

```json
{
  "id": "claim.example.behavior",
  "claim": "The exact statement the course makes.",
  "sourceRefs": ["repo-example-abcdef0"],
  "locator": "file, line/section, route, or browser-run id",
  "snapshot": "commit/date/version",
  "status": "source-verified",
  "confidence": "high",
  "usedIn": ["chapter-or-lab-id"],
  "notes": "limits, competing evidence, and missing proof"
}
```

Use exactly these statuses:

| Status | Meaning |
| --- | --- |
| `browser-verified` | A real control was operated and visible state/error changed as recorded. |
| `source-verified` | A pinned file directly contains the stated implementation or contract. |
| `self-report` | A site, README, paper, or author reports it without this review reproducing it. |
| `inference` | The course derives a design conclusion from cited evidence. |
| `conflict` | Sources or live behavior disagree; retain both sides. |
| `unknown` | The available evidence does not answer the question. |

Do not call source presence a runtime result. A test file is `source-verified`; a test execution can be runtime evidence only when command, environment, and result are recorded.

## Browser-run record

Record:

- source/site ID and exact route;
- viewport and relevant media preferences;
- concrete learner actions;
- before/after observations;
- console, page, resource, and network errors;
- status and limitation.

Use separate assertions for:

- page loaded;
- control existed;
- control changed state;
- state survived reload/navigation;
- result matched an oracle;
- no console/page error occurred.

## Conflict resolution

Prefer the source that owns the claim:

1. official specification for normative behavior;
2. pinned implementation for implementation behavior;
3. real browser for visible live behavior;
4. executed test/log for the exact tested runtime;
5. README, screenshots, social posts, and metadata as self-report/context.

Do not erase the lower-priority source. State the discrepancy and the release rule.

## Counts

Reconcile four count surfaces before release:

1. source inventory;
2. machine-readable manifest;
3. rendered DOM/runtime;
4. public README/metadata.

If they differ, name what each count measures. Never infer question, lab, or chapter counts from generic DOM elements.

## Privacy and provenance

Do not read or record cookies, browser profiles, credentials, private repositories, or unrelated session content. Hash only supplied/in-scope artifacts. Never upload source, logs, or learner data without explicit permission.
