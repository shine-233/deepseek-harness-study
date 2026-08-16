# DeepSeek Harness 源码导读学习仓库

中文主入口与中文镜像：[README.md](README.md) | [README.zh.md](README.zh.md)

这是基于 [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness) 的非官方学习型 fork。它不属于 DeepSeek AI，不由 DeepSeek AI 维护，也不代表 DeepSeek AI 的官方立场。

本仓库把官方 DSH（DeepSeek Harness）固定在提交 `47f943859bef60e4160492346772ded9b24f765a`，并增加中文源码导读。目标是让第一次接触大型 TypeScript 项目的人，也能知道每一层、每个关键文件和每个源文件索引条目分别解决什么问题。

## 先从这里开始

- [从零开始的学习路线](study/00-开始这里.md)：先建立“插件、服务、事件、轮次、会话”的整体认识。
- [仓库地图](study/01-仓库地图.md)：解释 `apps`、`packages`、`vendor`、`examples`、`scripts` 等目录的分工。
- [Cordis、Profile 与 Bundle](study/02-Cordis与插件树.md)：解释 DSH 为什么采用“一切皆插件”。
- [核心文件精读](study/03-核心文件精读.md)：人工阅读并用简单中文解释启动、会话、agent、工具和 LLM 主链路。
- [Agent 与 Turn 流程](study/04-Agent与Turn流程.md)：把一次用户请求从输入讲到模型和工具返回。
- [Session 日志与恢复](study/05-Session日志与恢复.md)：解释为什么模型看见的内容必须能从事件日志重建。
- [LLM 与工具执行](study/06-LLM与工具执行.md)：解释流式响应、工具 schema、执行、审批和结果展示。
- [Host、Client、示例、测试与发布](study/07-HostClient示例测试发布.md)：把运行环境和验证方法接起来。
- [逐文件索引的读法](study/08-逐文件索引怎么读.md)：解释自动索引的字段、证据等级和局限。
- [业界案例与写法](study/09-业界案例与写法.md)：说明这种做法叫什么、为什么合理，以及参考了哪些公开项目。
- [社区生态与扩展边界](study/10-社区生态与扩展边界.md)：区分 hook、插件、Bundle、配置 patch、源码 fork、注入、注册表修改和冒用官方身份，并拆解 `dsh-super-injector` 与 GitHub `dsh-plugin` 主题页/发现标签。
- [如何写一个合规插件](study/11-如何写一个合规插件.md)：从最小观察插件开始，讲公开 API、Bundle 安装、生命周期、测试、卸载和发布信任。

## 每个源文件在哪里

当前固定提交中按生成器的源码扩展名白名单识别出 2,756 个代码或界面源文件，包括 TypeScript、TSX、CSS、JavaScript、Python、C/C++、Shell 和 HTML；测试文件也包括在内。它们被分到 `study/文件索引/` 的 66 个索引页中，每个文件都有单独的中文条目，至少说明用途、拆分原因、文件级设计证据、直接协作者、测试线索、阅读顺序和固定版本链接。JSON、YAML、Markdown、JSONL、锁文件和资源仍然是官方仓库的重要文件，只是当前没有被计入这组“源码文件”索引。

[源文件索引清单](study/source-index-manifest.json) 是机器可检查的文件列表；[生成器](study-tools/generate-source-index.mjs) 可以在切换到另一个官方提交后重新生成索引。

[索引验证器](study-tools/verify-source-index.mjs)、[索引质量审计器](study-tools/audit-source-index-quality.mjs) 和[手写路径验证器](study-tools/verify-study-links.mjs) 可以检查覆盖、固定版本、文件级静态证据和教程中的官方路径。普通条目是结构化自动导读，核心链路文件另外有人工精读，不能把自动分类当成完整代码审查。

如果你关心“不改源码怎么 hook”，先读[社区生态与扩展边界](study/10-社区生态与扩展边界.md)，再读[如何写一个合规插件](study/11-如何写一个合规插件.md)。这里明确区分官方维护包、合规第三方插件、配置组合层、源码 fork、运行时注入和私有 registry 改写；“能 hook”本身不等于“是插件”。

## 官方源码与本仓库材料的边界

- [上游固定版本说明](UPSTREAM.md) 记录来源、提交、文件范围和许可证边界。
- 本仓库主要保存中文导读、逐文件索引和生成/验证工具，不把完整的 7,412 个上游 Git tree 文件复制进来；每条源码链接都回到官方仓库的固定 commit。需要逐行运行或构建官方实现时，应按 `UPSTREAM.md` 下载同一 commit，并在研究完成后清理临时归档。
- 官方架构、开发和 Cordis 说明仍在 [`docs/`](docs/) 中；本仓库的 `study/` 是额外的中文学习层，不改写官方实现。
- `vendor/` 是 Cordis、Schemastery 等第三方项目的固定副本，但官方 DSH 对它们做了重命名、构建配置和部分行为修改。索引会列出它们；精读时先看固定版本的 [`vendor/README.md`](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/README.md) 的 Manifest 和 Local modifications，不能把每项实现都直接归因于上游，也不能把它们全部当成 DSH 原创代码。
- 本仓库新增的导读、索引和生成器不代表官方 API，也不承诺跟随 DSH 的未来兼容性。

## 运行官方 DSH

如果只是想运行官方项目，仍按官方方式安装 Node.js 和 pnpm：

```sh
pnpm install
pnpm run build
pnpm dsh web
```

运行和构建可能需要网络、操作系统能力以及 `DEEPSEEK_API_KEY`；本仓库没有把“文档索引生成成功”说成 DSH 已经构建或真实模型调用成功。

## 重新生成索引

在仓库根目录执行：

```sh
node study-tools/generate-source-index.mjs --commit 47f943859bef60e4160492346772ded9b24f765a --source-root <固定提交的完整源码目录>
```

`--source-root` 必须指向同一个官方提交的完整源码目录，才能保留行数、声明、测试主题和本地 import 证据；当前提交的索引就是按这种方式生成的。省略它可以生成“只有路径覆盖”的索引，但会把这些证据降级为空，不能用来覆盖已提交的学习材料。临时下载或 worktree 用完后应删除；索引对象仍由 Git tree 决定，不会把临时目录或本仓库新增文件混进官方文件清单。

## 许可证

官方项目使用 [MIT 许可证](LICENSE)。本仓库新增的中文导读和生成工具也按 MIT 许可发布；第三方依赖及其许可证见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
