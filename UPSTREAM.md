# 上游固定版本说明

本仓库是 `shine-233/deepseek-harness-study`，源头是 [DeepSeek AI 的官方 DeepSeek Harness 仓库](https://github.com/deepseek-ai/deepseek-harness)。它是面向社区的非官方学习型 fork，不是官方中文版，也不是官方教程或官方镜像。

## 固定来源

- 上游仓库：`https://github.com/deepseek-ai/deepseek-harness`
- 本次学习版本：`47f943859bef60e4160492346772ded9b24f765a`（根包版本 `0.1.0-rc.5`）
- 固定提交时间：`2026-08-13T11:38:46Z`
- 上游默认分支：`master`
- 上游许可证：MIT

所有索引中的官方源码链接都固定到这个提交，而不是链接到会不断变化的 `master`。这样读者今天看到的解释，明天仍然能对应到同一份代码。

## 文件范围

固定提交的 Git tree 有 7,412 个文件，其中本导读按当前生成器的源码扩展名白名单识别出 2,756 个代码或界面源文件并列入逐文件索引：TypeScript 2,319 个、TSX 259 个、CSS 111 个、MJS 29 个、Python 19 个、JavaScript 9 个、Shell 6 个，以及 C、CJS、C++、HTML 各 1 个。测试文件没有被排除，因为测试也是理解设计的重要材料。这个数字不是“仓库所有需要阅读的文件”数量；JSON、YAML、Markdown、JSONL、锁文件、快照和资源仍然属于仓库的重要材料，只是没有进入当前逐源码索引范围。

JSON、YAML、Markdown、图片和锁文件属于配置、文档或资源，不计入“源代码文件”数量；仓库地图仍会说明它们的作用。归档中的 `vendor/` 源码会被索引。它是 Cordis、Schemastery 等第三方项目的固定副本，但 DSH 对这层做了重命名、构建配置和部分行为修改；应阅读固定版本的 [`vendor/README.md`](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/README.md) 的 Manifest 和 Local modifications，不能把它的设计决定全部写成 DSH 原创，也不能把 DSH 的本地修改全部归因于上游。

## 两种解释证据

逐文件索引是自动生成的参考层：它根据路径、扩展名、所在目录、同包测试、包 README 和一次固定提交归档的行数／声明，给出适合入门的第一解释。它保证不漏路径，但不能代替逐行代码审查。

核心文件精读是人工阅读层：它只对启动、Cordis、Profile、Bundle、Session、Agent、工具、LLM 和 CLI 的主链路作更详细说明，并明确列出协作者和测试方向。两层分开，是为了既保证 2,756 个文件都有入口，又不把自动猜测伪装成深度理解。

## 上游文档优先级

当本学习材料与官方源码或官方文档不一致时，应以固定提交的源码、包 README、[架构文档](docs/architecture.md)、[开发指南](docs/development.md) 和 [Cordis primer](docs/cordis-primer.md) 为准，并在学习材料中提交修正。官方项目仍处于 Developer Preview，未来允许出现破坏兼容性的变化。

## 许可证边界

上游源码继续遵守官方 MIT 许可证和第三方声明。本仓库新增的中文说明、索引生成器和研究笔记也采用 MIT 许可证；学习解释不是 DeepSeek AI 的承诺，不应作为官方 API 保证或生产部署指南。
