# Agent Note: 学习示例页面与 Loader 配置 Schema

Status: implemented

[English](2026-08-16-study-example-pages-and-loader-schema.md) | 中文

## Problem

第一个可运行学习示例既要能从 Pages 直接读懂，也要诚实说明 DSH Bundle 需要导出什么。原来的 README 会在第一次动手时跳出 Pages，而只有类型说明的 `Config` 不能给真实 Loader 提供可消费的 schema。

## Decision

`study-examples/` 下的中文 README 会投影到根路径专用的 `zh-study` 集合。英文 README 路径保留为 source alias，因此原本为 GitHub 写的链接会落到同一篇 Pages 学习页，不会离开学习路线。源代码、测试和 patch 文件仍然链接到 GitHub；网站不会把可执行代码复制进生成的文档树。

最小观察器导出 Schemastery `Config` schema，并由它持有部署默认值。`resolveConfig()` 仍在直接调用前严格检查未知键和正安全整数，再使用 schema 归一化后的值。根目录开发依赖提供 workspace schema 包，使示例在仓库完成一次安装后可以运行自己的 test 和 lint。这些检查仍使用 fake context，不能声称真实 Loader/Profile 组合或 Fiber 卸载已经验证。

学习侧栏把示例作为可选的第一个终端练习；首页和第一课仍保留不下载即可阅读的路径。网页投影测试检查两个示例路由、它们的 alias，以及“已发布的示例 README”和“仍未发布的审阅文件”之间的区别。

## Alternatives considered

**继续把示例 README 放在 GitHub。** 这样保留原目录结构，却让 Pages 的第一次动手路线在最早一步跳出网站。它没有增加运行证据，却损失了连续阅读体验。

**导出普通 `Config` 对象或只保留 JSDoc typedef。** Cordis Loader 需要兼容 Standard Schema 的导出。普通对象会教给读者一个宿主无法校验的形式，因此示例采用产品插件相同的 Schemastery 契约，同时让本地测试保持轻量。

**把示例源代码复制到网站。** 复制 JavaScript 会制造第二个事实来源，也可能让页面中的代码副本看起来像已验证的产品构件。当前只投影 README，准备动手时再回到仓库中的真实文件。

**这次就加入真实 Loader/Profile 测试。** 这需要先确定宿主组合、版本固定方式、清理断言和进程边界。当前示例把它保留为明确的下一层证据，不把 fake-context 单元测试夸成真实运行证明。

## Consequences

新读者可以留在 Pages 上读完示例说明，准备使用终端时再打开精确的源文件。示例遵循宿主的配置导出约定，并且直接配置错误会尽早失败。在示例能够声称运行时兼容之前，仓库仍需要补真实 Loader/Profile 组合测试、卸载观测和 provider 评估。
