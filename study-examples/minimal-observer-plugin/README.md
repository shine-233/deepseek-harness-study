# Minimum observer plugin for DSH study

English | [中文](README.zh.md)

This directory is a study-only third-party DSH Bundle. It is intentionally small: it listens to the public `tools/result` event and writes a bounded preview of text result blocks. Its two preview limits are deployment configuration fields, defaulted by the exported `Config` schema, strictly checked for direct calls by `resolveConfig()`, and supplied by `cordis.patch.yml`. It does not read a private registry, rewrite a loader, patch source, inject a process, or claim to be a DeepSeek AI package.

## What this example proves

| Evidence | What it supports | What it does not support |
| --- | --- | --- |
| `package.json`, `src/index.js`, plus `cordis.patch.yml` | The example declares a third-party Bundle entry, a host-readable `Config` schema, and two configurable preview limits | The bundle has been installed or loaded by a real Profile |
| Node unit test | The module registers one public event listener, validates and applies preview limits, rejects unknown configuration keys, bounds text previews, and does not mutate the supplied result fixture | Cordis Fiber disposal, Loader composition, or a real DSH process |
| Local lint | The committed JavaScript parses and passes the example's correctness/suspicious rules | Product security, compatibility with every DSH release, or model behavior |

## Read and run in three steps

1. Read `src/index.js` and `cordis.patch.yml`. The only host capability it calls is `ctx.on('tools/result', ...)`; the two length limits arrive as configuration.
2. From the repository root, run the unit test and linter.
3. Change `maxPreviewCharacters` in the patch and the matching direct `apply(ctx, config)` test value, run the checks again, and write down what the test actually proves.

```sh
pnpm --dir study-examples/minimal-observer-plugin run demo
pnpm --dir study-examples/minimal-observer-plugin run test
pnpm --dir study-examples/minimal-observer-plugin run lint
```

Run `demo` first. You should see:

```text
[study-observer] study_greet -> ["hello world","second block"]
```

This uses a fake `ctx.on()` event context so the smallest possible flow is visible: register the observer, emit a result, and print bounded text. It does not start DSH, a Profile, a Loader, a provider, or a model. Run `test` and `lint` afterwards so you can distinguish “the demo printed” from “the behavior assertions passed”.

You should see the demo line, the Node tests finish successfully, and the lint command return exit code 0. Exact reporter text and the oxlint version may change; all three commands must finish without an error. This proves the example's behavior and syntax rules, not a real DSH load.

No API key, model call, local DSH process, registry modification, Windows Registry change, or process injection is needed for these two checks.

## The three teaching points

### 1. Public event, not private hook

`apply(ctx, config)` subscribes to `tools/result` after validating the deployment limits. DSH declares it as a final live observation event. The observer receives the final result but does not change the result, decide permission, or manufacture a new tool.

The example also rejects misspelled configuration keys instead of silently falling back to a default. That makes the "fail early on deployment misconfiguration" responsibility visible to the reader. Its exported Schemastery `Config` gives a real Loader a standard schema to read, while `resolveConfig()` keeps the unknown-key and safe-integer checks for direct calls. The local unit test verifies the example's schema and validation logic, but it is still not a real Loader composition proof.

Cordis records registrations made through `ctx.on()` in the mounting plugin Fiber. On real unload, Cordis removes the listener with that Fiber. The unit test uses a deliberately tiny fake context, so it verifies the plugin's public interaction and output but does not pretend to prove Cordis's implementation. The full timeline of how subscriptions, policy rejections, and unloading affect one observer plugin is walked step by step in the [plugin subscription and logging lab](/plugin-flow-lab.html).

### 2. Bounded log data

`previewTextBlocks()` uses `maxPreviewBlocks` and `maxPreviewCharacters` from the validated configuration, turns line breaks into spaces, and ignores image and other non-text blocks. The patch defaults are three blocks and 160 characters. This is an observability example, not a complete privacy policy: a real plugin must decide which text is allowed to enter logs and how long it is retained.

### 3. Bundle composition is not a source patch

`cordis.patch.yml` inserts this package into a plugin tree. It changes which plugin the Profile loads; it does not modify DSH TypeScript source. If a feature requires a private Loader table, module-cache replacement, a running-process injection, or operating-system configuration changes, it is no longer this kind of ordinary plugin.

## A safe modification exercise

Change `maxPreviewCharacters: 160` to `80` in `cordis.patch.yml`. Change the matching `apply(ctx, config)` test input and expectation in `tests/plugin.test.js`, then run the two commands again. Keep the source default unchanged: the exercise is about deployment configuration, not a hardcoded constant. Restore both exercise values to `160` when you finish, or keep the change only on your own branch; do not describe a temporary learning edit as a published plugin version. Your learning record should distinguish these claims:

- **Proved by the unit test:** the example accepts a configuration value and produces an 80-character text preview.
- **Not proved:** the third-party Bundle loaded through a real DSH Profile.
- **Not proved:** a model received fewer tokens or performed better.

After that, follow the [Chinese plugin lesson](../../study/11-如何写一个合规插件.md), the [tool contract lesson](../../study/13-官方工具插件完整契约.md), and the [evidence ladder](../../study/19-插件测试卸载与版本证据.md) before attempting a real Profile installation.

## Real-install checklist

When you later install a copy in an isolated DSH Profile, record the fixed DSH commit, package commit, Profile name, command, Loader output, tool-result observation, unload command, and post-unload check. Add a Loader composition test before treating the package as installable, and a real provider test only when a model/API key is intentionally in scope.

The peer ranges in `package.json` communicate an intended compatibility range; they do not prove compatibility. Re-check the target DSH version's public tools README and test the actual package before publishing it.
