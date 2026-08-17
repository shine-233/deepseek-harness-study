# Study examples

English | [中文](README.zh.md)

This directory contains deliberately small, non-official learning artifacts. Unlike `examples/`, which owns shipped DSH compositions and their product-oriented tests, these packages teach one extension decision at a time and state their evidence limits beside the code.

## Available example

| Example | Learn | Deterministic checks | Does not prove |
| --- | --- | --- | --- |
| [Minimum observer plugin](minimal-observer-plugin/README.md) | A third-party Bundle that observes the public `tools/result` event without changing a result | `demo`, Node unit test, and local lint | Loader installation, real DSH runtime, provider tokens, latency, or model quality |

## How to use an example

1. Read its README before its source file.
2. Run its named demo first, then its test and lint commands.
3. Make one small change, update the corresponding test, and run the checks again.
4. Record both the supported conclusion and the missing runtime evidence.

When an example grows into a real package, move reusable code to an owning `packages/` workspace, add a Loader composition test, declare version/permission/cleanup behavior, and only then add a real provider or UI test when that behavior is in scope.
