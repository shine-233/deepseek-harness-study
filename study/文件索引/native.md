# 源文件索引：native

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 16 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)

- 所属层：与操作系统或原生沙箱连接的运行时边界
- 文件角色：原生沙箱 Launcher API
- 这个文件有什么用：它找到当前平台的预编译 launcher，生成 --ro/--rw allow-list 参数并探测 full、partial 或 unusable 能力。
- 为什么这样设计：把“原生沙箱 Launcher API”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[native/landlock-run/packages/entry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/README.md)、[native/landlock-run/scripts/verify-packed-install.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/verify-packed-install.mjs)、[native/landlock-run/test/entry.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/entry.test.js)、[native/landlock-run/test/launcher.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/launcher.test.js)
- 对应测试：[native/landlock-run/test/entry.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/entry.test.js)、[native/landlock-run/test/launcher.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/launcher.test.js)、[packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/examples/agent-spine-demo/tests/multi-project-sandbox.e2e.ts)、[packages/sandbox/sandbox-local/tests/landlock.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/landlock.e2e.ts)、[packages/sandbox/sandbox-local/tests/local.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/local.spec.ts)、[packages/sandbox/sandbox-local/tests/packed-install.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/sandbox/sandbox-local/tests/packed-install.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 127 行；扫描到的声明包括 `LAUNCHER_BIN`、`LAUNCHER_FAILURE_EXIT`、`LandlockEnforcement`、`LauncherGrants`、`launcherPath`、`grantArgs`、`probe`；文件顶部注释线索：The JavaScript API over the prebuilt landlock-run launcher: resolve the binary for this host, build its grant argv, and run its functional probe. This module owns the launcher's CLI contract (docs/cli-contract.md) so consumers never parse launcher output or...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/packages/entry/src/main.c](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/main.c)

- 所属层：与操作系统或原生沙箱连接的运行时边界
- 文件角色：Landlock 沙箱 Launcher
- 这个文件有什么用：它解析 probe、只读/读写 allow-list 和命令分隔符，创建 Landlock 规则并在限制当前进程后 exec 子命令；无法强制时 fail closed。
- 为什么这样设计：把“Landlock 沙箱 Launcher”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[native/landlock-run/packages/entry/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 298 行；文件顶部注释线索：landlock-run: self-restrict-then-exec Landlock launcher. The Landlock rung of a consuming sandbox seam, for Linux hosts where bwrap is unusable (not installed, unprivileged user namespaces disabled, or an LSM profile that denies mount — Landlock is an indep...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/assemble-prebuilds.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/assemble-prebuilds.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Assemble downloaded release artifacts into the platform packages and verify the result. The Release workflow's build legs upload one prebuild-<package> artifact per platform package (its bin/ payload); this script copies each into packages/<package>/bin/ an...”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Assemble downloaded release artifacts into the platform packages and verify the result. The Release workflow's build legs upload one prebuild-<package> artifact per platform package (its bin/ payload); this script copies each into packages/<package>/bin/ an...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 51 行；文件顶部注释线索：Assemble downloaded release artifacts into the platform packages and verify the result. The Release workflow's build legs upload one prebuild-<package> artifact per platform package (its bin/ payload); this script copies each into packages/<package>/bin/ an...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/build.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/build.ts)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Build every native tool this host can build, into its per-platform package. Targets are derived from the checked-in matrix: each packages/<name>/prebuilds.json whose platform matches this host names the binaries to produce; the TOOLS table below maps each t...”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Build every native tool this host can build, into its per-platform package. Targets are derived from the checked-in matrix: each packages/<name>/prebuilds.json whose platform matches this host names the binaries to produce; the TOOLS table below maps each t...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 86 行；文件顶部注释线索：Build every native tool this host can build, into its per-platform package. Targets are derived from the checked-in matrix: each packages/<name>/prebuilds.json whose platform matches this host names the binaries to produce; the TOOLS table below maps each t...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/bump-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/bump-release.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Bump the launcher workspace root and packages to one version, refresh the repository lockfile, and verify. Usage: pnpm release:bump <major|minor|patch|x.y.z>.”。固定提交中扫描到的公开或顶层声明包括 `writeJson`、`run`、`packageFiles`、`parseVersion`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Bump the launcher workspace root and packages to one version, refresh the repository lockfile, and verify. Usage: pnpm release:bump <major|minor|patch|x.y.z>.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `writeJson`、`run`、`packageFiles`、`parseVersion`、`nextVersion`、`currentPublishedVersion`；文件顶部注释线索：Bump the launcher workspace root and packages to one version, refresh the repository lockfile, and verify. Usage: pnpm release:bump <major|minor|patch|x.y.z>.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/commit-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/commit-release.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Bump, stage, and commit a release in one command: pnpm release:commit <major|minor|patch|x.y.z>. The namespaced tag stays manual — create it from the merged release commit.”。固定提交中扫描到的公开或顶层声明包括 `run`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Bump, stage, and commit a release in one command: pnpm release:commit <major|minor|patch|x.y.z>. The namespaced tag stays manual — create it from the merged release commit.”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 42 行；扫描到的声明包括 `run`；文件顶部注释线索：Bump, stage, and commit a release in one command: pnpm release:commit <major|minor|patch|x.y.z>. The namespaced tag stays manual — create it from the merged release commit.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/github-matrix.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/github-matrix.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Derive the GitHub Actions matrices from the checked-in package matrix (packages/<name>/prebuilds.json). Single source: adding a platform package extends CI and Release without editing a workflow. node scripts/github-matrix.mjs ci → one leg per distinct plat...”。固定提交中扫描到的公开或顶层声明包括 `runnerFor`、`platformManifests`、`ciMatrix`、`releasePrebuildMatrix`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Derive the GitHub Actions matrices from the checked-in package matrix (packages/<name>/prebuilds.json). Single source: adding a platform package extends CI and Release without editing a workflow. node scripts/github-matrix.mjs ci → one leg per distinct plat...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的声明包括 `runnerFor`、`platformManifests`、`ciMatrix`、`releasePrebuildMatrix`；文件顶部注释线索：Derive the GitHub Actions matrices from the checked-in package matrix (packages/<name>/prebuilds.json). Single source: adding a platform package extends CI and Release without editing a workflow. node scripts/github-matrix.mjs ci → one leg per distinct plat...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/pack-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/pack-release.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Pack every published package into release tarballs, in publish order (platform packages first, then the entries that optionally depend on them), and write publish-order.txt next to them. pnpm pack produces the EXACT bytes pnpm publish would upload and runs ...”。固定提交中扫描到的公开或顶层声明包括 `hostPlatformDirs`、`run`、`tarballName`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Pack every published package into release tarballs, in publish order (platform packages first, then the entries that optionally depend on them), and write publish-order.txt next to them. pnpm pack produces the EXACT bytes pnpm publish would upload and runs ...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；扫描到的声明包括 `hostPlatformDirs`、`run`、`tarballName`；文件顶部注释线索：Pack every published package into release tarballs, in publish order (platform packages first, then the entries that optionally depend on them), and write publish-order.txt next to them. pnpm pack produces the EXACT bytes pnpm publish would upload and runs ...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/publish-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/publish-release.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Publish the packed launcher family from the tarballs pack-release.mjs produced, in publish-order.txt order. What goes out is decided per package against the registry, never from the order file alone: a version the registry lacks is published, a version whos...”。固定提交中扫描到的公开或顶层声明包括 `isTransientFailure`、`integrityOf`、`packedIdentity`、`registryState`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Publish the packed launcher family from the tarballs pack-release.mjs produced, in publish-order.txt order. What goes out is decided per package against the registry, never from the order file alone: a version the registry lacks is published, a version whos...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 165 行；扫描到的声明包括 `isTransientFailure`、`integrityOf`、`packedIdentity`、`registryState`、`publishTarball`；文件顶部注释线索：Publish the packed launcher family from the tarballs pack-release.mjs produced, in publish-order.txt order. What goes out is decided per package against the registry, never from the order file alone: a version the registry lacks is published, a version whos...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Shared helpers for the repo scripts: package discovery, the checked-in prebuild matrix, and binary verification. The package matrix is explicit metadata — packages/<name>/prebuilds.json marks a platform package and declares its binaries; everything else und...”。固定提交中扫描到的公开或顶层声明包括 `root`、`readJson`、`platformDirs`、`entryDirs`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Shared helpers for the repo scripts: package discovery, the checked-in prebuild matrix, and binary verification. The package matrix is explicit metadata — packages/<name>/prebuilds.json marks a platform package and declares its binaries; everything else und...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/assemble-prebuilds.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/assemble-prebuilds.mjs)、[native/landlock-run/scripts/bump-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/bump-release.mjs)、[native/landlock-run/scripts/commit-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/commit-release.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 88 行；扫描到的声明包括 `root`、`readJson`、`platformDirs`、`entryDirs`、`packageDirs`、`verifyPlatformBinaries`；文件顶部注释线索：Shared helpers for the repo scripts: package discovery, the checked-in prebuild matrix, and binary verification. The package matrix is explicit metadata — packages/<name>/prebuilds.json marks a platform package and declares its binaries; everything else und...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/verify-entry-lib.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/verify-entry-lib.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Prepack gate for entry packages: refuse to pack a tarball whose built lib/ is missing. Entry files lists use globs, and a glob matching nothing packs a silently JS-less tarball instead of failing — this gate turns that into a loud refusal on a checkout that...”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Prepack gate for entry packages: refuse to pack a tarball whose built lib/ is missing. Entry files lists use globs, and a glob matching nothing packs a silently JS-less tarball instead of failing — this gate turns that into a loud refusal on a checkout that...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)
- 对应测试：[native/landlock-run/test/entry.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/entry.test.js)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 25 行；文件顶部注释线索：Prepack gate for entry packages: refuse to pack a tarball whose built lib/ is missing. Entry files lists use globs, and a glob matching nothing packs a silently JS-less tarball instead of failing — this gate turns that into a loud refusal on a checkout that...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/verify-launcher-binary.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/verify-launcher-binary.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Prepack gate for platform packages: refuse to pack a tarball whose declared binaries are missing or built for the wrong architecture. Without it, pnpm pack on a checkout that never ran pnpm run build:native would ship an EMPTY platform package — the binary'...”。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Prepack gate for platform packages: refuse to pack a tarball whose declared binaries are missing or built for the wrong architecture. Without it, pnpm pack on a checkout that never ran pnpm run build:native would ship an EMPTY platform package — the binary'...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：[native/landlock-run/test/launcher.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/launcher.test.js)
- 测试关联依据：按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 30 行；文件顶部注释线索：Prepack gate for platform packages: refuse to pack a tarball whose declared binaries are missing or built for the wrong architecture. Without it, pnpm pack on a checkout that never ran pnpm run build:native would ship an EMPTY platform package — the binary'...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/verify-packed-install.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/verify-packed-install.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Publish-path rehearsal without publishing: verify the packed tarballs are exactly what a consumer install needs. pnpm pack already produced the bytes pnpm publish would upload; this script checks the payload (coverage, concrete dependency versions, NO lifec...”。固定提交中扫描到的公开或顶层声明包括 `tarballName`、`tarballPath`、`run`、`runCapture`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Publish-path rehearsal without publishing: verify the packed tarballs are exactly what a consumer install needs. pnpm pack already produced the bytes pnpm publish would upload; this script checks the payload (coverage, concrete dependency versions, NO lifec...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 223 行；扫描到的声明包括 `tarballName`、`tarballPath`、`run`、`runCapture`、`readPackedManifest`、`verifyPackedManifest`、`sha256`、`packageInstallDir`；文件顶部注释线索：Publish-path rehearsal without publishing: verify the packed tarballs are exactly what a consumer install needs. pnpm pack already produced the bytes pnpm publish would upload; this script checks the payload (coverage, concrete dependency versions, NO lifec...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/scripts/verify-release.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/verify-release.mjs)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：功能实现
- 这个文件有什么用：它负责 原生边界；文件顶部注释把它定位为“Release verification. Always: every published package carries one shared version, and — when running from a tag or publishing — the landlock-run-vX.Y.Z tag matches it. With --prebuilds: every platform package's declared binaries exist with the right ELF arc...”。固定提交中扫描到的公开或顶层声明包括 `verifyVersions`、`verifyPrebuilds`。把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Release verification. Always: every published package carries one shared version, and — when running from a tag or publishing — the landlock-run-vX.Y.Z tag matches it. With --prebuilds: every platform package's declared binaries exist with the right ELF arc...”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/scripts/repo.mjs](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/scripts/repo.mjs)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 54 行；扫描到的声明包括 `verifyVersions`、`verifyPrebuilds`；文件顶部注释线索：Release verification. Always: every published package carries one shared version, and — when running from a tag or publishing — the landlock-run-vX.Y.Z tag matches it. With --prebuilds: every platform package's declared binaries exist with the right ELF arc...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/test/entry.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/entry.test.js)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 原生边界 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 76 行；文件顶部注释线索：Keyless entry-package tests — run on every host, no kernel or binary required. Cover the JavaScript API's pure surface: grant-argv construction, the resolution contract (platform package → fallback), and probe verdicts over fake launchers. Requires built li...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [native/landlock-run/test/launcher.test.js](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/test/launcher.test.js)

- 所属层：原生包的构建、发布和验证自动化
- 文件角色：测试用例
- 这个文件有什么用：它直接验证 原生边界 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[native/landlock-run/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/README.md)、[native/landlock-run/packages/entry/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/native/landlock-run/packages/entry/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 137 行；文件顶部注释线索：Behavioral tests against the REAL launcher binary on a real kernel: the CLI contract (usage errors, exit codes, argv passthrough) and the confinement world-proofs (denied writes stay off disk, grants land). Preconditions and their skip semantics: - Non-Linu...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
