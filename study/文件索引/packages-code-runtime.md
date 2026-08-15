# 源文件索引：packages/code-runtime

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 19 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 运行时、工作线程；文件顶部注释把它定位为“Worker-side execution logic, written as plain functions over an injected port so the unit suite can run every line IN-PROCESS against a fake port (a real worker thread is a separate V8 isolate the coverage provider cannot observe). @module @deepseek-ai/dsh-...”。固定提交中扫描到的公开或顶层声明包括 `BootstrapPort`、`PatchableStream`、`LogBuffer`、`makeConsoleShim`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Worker-side execution logic, written as plain functions over an injected port so the unit suite can run every line IN-PROCESS against a fake port (a real worker thread is a separate V8 isolate the coverage provider cannot observe). @module @deepseek-ai/dsh-...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/output-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/output-json.ts)、[packages/code-runtime/code-runtime-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/protocol.ts)、[packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)、[packages/code-runtime/code-runtime-worker-thread/src/worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker.ts)
- 对应测试：[packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 424 行；扫描到的声明包括 `BootstrapPort`、`PatchableStream`、`LogBuffer`、`makeConsoleShim`、`captureStreamWrites`、`prepareCompletion`、`prepareException`、`PendingCall`；文件顶部注释线索：Worker-side execution logic, written as plain functions over an injected port so the unit suite can run every line IN-PROCESS against a fake port (a real worker thread is a separate V8 isolate the coverage provider cannot observe). @module @deepseek-ai/dsh-...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 运行时、工作线程 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/output-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/output-json.ts)、[packages/code-runtime/code-runtime-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/protocol.ts)、[packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)、[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)
- 对应测试：[examples/headless-agent/tests/code-mode.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/headless-agent/tests/code-mode.e2e.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/built-lib.e2e.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/runtime.spec.ts)、[packages/spill/spill-policy/tests/spill-policy.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/spill/spill-policy/tests/spill-policy.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 561 行；扫描到的声明包括 `Config`、`WorkerThreadCodeRuntime`、`messageOf`、`waitForPipeDrain`、`parseWorkerMessage`、`OutputLedger`；文件顶部注释线索：Worker-thread code runtime: a fresh worker runs each host-type-stripped TypeScript program and bridges bindings over its message port. This is containment, not a security boundary: model code has bash-equivalent trust despite an empty environment, a heap ca...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/invariant.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 运行时、工作线程 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-code-runtime-worker-thread. @module @deepseek-ai/dsh-code-runtime-worker-thread/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/src/output-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/output-json.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 运行时、工作线程；文件顶部注释把它定位为“JSON string-prefix accounting for the outer-output ledger. @module @deepseek-ai/dsh-code-runtime-worker-thread/output-json”。固定提交中扫描到的公开或顶层声明包括 `jsonStringBytesUpTo`、`jsonValueBytesUpTo`、`truncateJsonStringBytes`、`dataDescriptor`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“JSON string-prefix accounting for the outer-output ledger. @module @deepseek-ai/dsh-code-runtime-worker-thread/output-json”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts)、[packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts)
- 对应测试：[packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 179 行；扫描到的声明包括 `jsonStringBytesUpTo`、`jsonValueBytesUpTo`、`truncateJsonStringBytes`、`dataDescriptor`、`defineEnumerableDataProperty`、`byteLength`、`append`、`takeLast`；文件顶部注释线索：JSON string-prefix accounting for the outer-output ledger. @module @deepseek-ai/dsh-code-runtime-worker-thread/output-json。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/protocol.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 运行时、工作线程；文件顶部注释把它定位为“Versionless, structured-clone wire protocol between co-shipped host and worker code. The host treats inbound traffic as hostile because model code can forge parentPort messages; the worker trusts host replies. @module @deepseek-ai/dsh-code-runtime-worker-th...”。固定提交中扫描到的公开或顶层声明包括 `WorkerBootData`、`DoneMessage`、`WorkerToHost`、`ReplyMessage`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Versionless, structured-clone wire protocol between co-shipped host and worker code. The host treats inbound traffic as hostile because model code can forge parentPort messages; the worker trusts host replies. @module @deepseek-ai/dsh-code-runtime-worker-th...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)、[packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts)、[packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/src/worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker.ts)
- 对应测试：[packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `WorkerBootData`、`DoneMessage`、`WorkerToHost`、`ReplyMessage`；文件顶部注释线索：Versionless, structured-clone wire protocol between co-shipped host and worker code. The host treats inbound traffic as hostile because model code can forge parentPort messages; the worker trusts host replies. @module @deepseek-ai/dsh-code-runtime-worker-th...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它负责 运行时、工作线程；文件顶部注释把它定位为“Lossless-JSON snapshots for the dependency-free source worker closure. @module @deepseek-ai/dsh-code-runtime-worker-thread/worker-json”。固定提交中扫描到的公开或顶层声明包括 `snapshotCodeJsonValue`、`WorkerJsonWire`、`encodeWorkerJson`、`decodeWorkerJson`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Lossless-JSON snapshots for the dependency-free source worker closure. @module @deepseek-ai/dsh-code-runtime-worker-thread/worker-json”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts)、[packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/protocol.ts)
- 对应测试：[packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/source-worker.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/source-worker.compat.spec.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/worker-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/worker-json.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 420 行；扫描到的声明包括 `snapshotCodeJsonValue`、`WorkerJsonWire`、`encodeWorkerJson`、`decodeWorkerJson`、`dataDescriptor`、`defineEnumerableDataProperty`、`append`、`takeLast`；文件顶部注释线索：Lossless-JSON snapshots for the dependency-free source worker closure. @module @deepseek-ai/dsh-code-runtime-worker-thread/worker-json。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/src/worker.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：进程或线程边界
- 这个文件有什么用：它把 运行时、工作线程 的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Spawn-only worker entrypoint over runWorkerMain. Executable logic stays in bootstrap.ts for in-process coverage; real-worker tests cover this glue. @module @deepseek-ai/dsh-code-runtime-worker-thread/src/worker”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts)、[packages/code-runtime/code-runtime-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/protocol.ts)
- 对应测试：[packages/code-runtime/code-runtime-worker-thread/tests/source-worker.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/source-worker.compat.spec.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/worker-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/worker-json.spec.ts)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 14 行；文件顶部注释线索：Spawn-only worker entrypoint over runWorkerMain. Executable logic stays in bootstrap.ts for in-process coverage; real-worker tests cover this glue. @module @deepseek-ai/dsh-code-runtime-worker-thread/src/worker。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/bootstrap.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时、工作线程 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts)、[packages/code-runtime/code-runtime-worker-thread/src/protocol.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/protocol.ts)、[packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 444 行；扫描到的声明包括 `FakePort`、`fakeStreams`、`rejectionOf`、`toolNamespace`、`Exotic`；扫描到的测试主题包括 “LogBuffer”、“streams entries to the sink until the byte budget, then emits one fitting prefix and reports the limit once”、“makeConsoleShim”、“captures the five methods and renders non-strings inspect-style”、“captureStreamWrites”、“redirects writes into the buffer and restores on request”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tests/built-lib.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/built-lib.e2e.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时、工作线程 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的测试主题包括 “runs a TypeScript program with a binding through lib/index.js and its lib/worker.cjs entry”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时、工作线程 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/output-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/output-json.ts)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 109 行；扫描到的测试主题包括 “truncateJsonStringBytes”、“returns a fitting string whole and rejects budgets without JSON quotes”、“accounts every JSON escape and cuts only between complete code points”、“bounds hostile strings without materializing their complete escaped form”、“jsonValueBytesUpTo”、“matches JSON serialization for every lossless value branch and stops at the cap”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/runtime.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时、工作线程 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 893 行；扫描到的声明包括 `setup`、`tools`；扫描到的测试主题包括 “WorkerThreadCodeRuntime — programs and bindings (real workers)”、“registers with the seam descriptors”、“runs TypeScript (erasable syntax), captures output in order, returns the value”、“bridges binding calls both ways and rejects the program-side call on a host rejection”、“materializes a typed rejection from a generic namespace descriptor”、“bridges a deeply nested lossless JSON argument, resolution, and completion”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tests/source-worker.compat.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/source-worker.compat.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时、工作线程 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 39 行；扫描到的测试主题包括 “boots the source worker without workspace package outputs”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tests/worker-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/worker-json.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时、工作线程 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)、[packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/worker-json.ts)、[packages/core/session/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/session/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 257 行；扫描到的声明包括 `ExoticObject`、`ExoticArray`；扫描到的测试主题包括 “snapshotCodeJsonValue”、“matches the canonical scalar boundary”、“detaches dense arrays and plain or null-prototype records”、“accepts intrinsic plain containers from another JavaScript realm”、“reads each accepted slot once and preserves a literal __proto__ key”、“accepts deeply nested valid JSON without using the JavaScript call stack”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime-worker-thread/tsdown.config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tsdown.config.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：构建或测试配置
- 这个文件有什么用：它定义 运行时、工作线程 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。
- 为什么这样设计：工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。
- 直接协作者：[packages/code-runtime/code-runtime-worker-thread/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 29 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 运行时 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 直接协作者：[packages/code-runtime/code-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/README.md)、[packages/code-runtime/code-runtime/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/types.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/index.ts)、[packages/code-runtime/code-runtime-worker-thread/src/output-json.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/src/output-json.ts)
- 对应测试：[packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/output-json.spec.ts)、[packages/code-runtime/code-runtime-worker-thread/tests/runtime.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime-worker-thread/tests/runtime.spec.ts)、[packages/code-runtime/code-runtime/tests/reserved.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/tests/reserved.spec.ts)、[packages/code-runtime/code-runtime/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/tests/service.spec.ts)、[packages/core/agent-loop/tests/tool-calls.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/tool-calls.spec.ts)、[packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-tool-presentation/tests/agent-tool-presentation.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/core/agent-loop/tests/mock-adapter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/core/agent-loop/tests/mock-adapter.ts)
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 137 行；扫描到的声明包括 `RESERVED_BINDING_GLOBALS`、`RESERVED_ERROR_MEMBERS`、`DUNDER_MEMBER`、`PORTABLE_RESERVED_WORDS`；文件顶部注释线索：Service Definition for the code-execution capability seam that runs one model-written program against host async bindings. Runtimes know nothing about tools or sessions; consumers own those concerns. @module @deepseek-ai/dsh-code-runtime。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/invariant.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 运行时 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 直接协作者：[packages/code-runtime/code-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；扫描到的声明包括 `name`、`inject`、`apply`；文件顶部注释线索：Package-owned invariant companion for @deepseek-ai/dsh-code-runtime. @module @deepseek-ai/dsh-code-runtime/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/types.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 运行时 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 直接协作者：[packages/code-runtime/code-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/agent-preset-selection.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/agent-preset-selection.e2e.ts)、[apps/web/tests/shipped-composition.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/shipped-composition.e2e.ts)、[apps/web/tests/sidebar-subagent-activity.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/sidebar-subagent-activity.e2e.ts)、[apps/web/tests/subagent-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/apps/web/tests/subagent-conversation.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 127 行；扫描到的声明包括 `CodeBindingFunction`、`CodeJsonValue`、`CodeBindingErrorClass`、`CodeBindingNamespace`、`CodeRunRequest`、`CodeRunFailure`、`CodeRunResult`；文件顶部注释线索：Vocabulary types for the code-execution seam: what a caller hands a ../index.ts | CodeRuntime and what it gets back. Pure types — no runtime code lives here. @module @deepseek-ai/dsh-code-runtime/src/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime/tests/reserved.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/tests/reserved.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 57 行；扫描到的测试主题包括 “seam-owned portable identifier exclusions”、“RESERVED_BINDING_GLOBALS covers each backend-owned slot”、“RESERVED_ERROR_MEMBERS covers the JS Error and Python exception-protocol members”、“DUNDER_MEMBER matches dunder-form names only”、“__dict__”、“__init__”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/code-runtime/code-runtime/tests/service.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/tests/service.spec.ts)

- 所属层：packages/code-runtime：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 运行时 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[packages/code-runtime/code-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/README.md)、[packages/code-runtime/code-runtime/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/code-runtime/code-runtime/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的声明包括 `StubRuntime`、`setup`；扫描到的测试主题包括 “CodeRuntime service seam”、“registers as ctx.codeRuntime and serves the abstract API”、“reports a failed run as an error field on a resolved result, never a rejection”、“reports a pre-aborted signal as an abort failure”、“is removed from the context when the providing fiber disposes (HMR safety)”、“rejects a second implementation in the same context (duplicate service)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
