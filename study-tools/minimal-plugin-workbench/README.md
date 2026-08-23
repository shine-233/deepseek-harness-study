# Minimal plugin workbench

English | [中文](README.zh.md)

This directory is an offline plugin exercise for the study repository. It compiles `src/minimal-plugin.ts` into `dist/minimal-plugin.js`, loads that built artifact with a real Cordis `Context` and Loader, then removes the Loader entry and asserts that the service and timer have been cleaned up.

This is not a publishable npm package. It does not start the DSH Web/CLI, call a real model, or access the network. Run `pnpm install` at the repository root first, then run:

```sh
pnpm --dir study-tools/minimal-plugin-workbench run build
pnpm --dir study-tools/minimal-plugin-workbench run verify
```

The `verify` output is machine-readable JSON. It includes `result: "PASS"`, the build artifact, the Loader entry, service phases, the number of entries remaining after unload, and model/network request counters. `dist/` is temporary build output and must not be committed.

The accompanying lesson is [`study/35-最小插件工作台.md`](../../study/35-最小插件工作台.md).
