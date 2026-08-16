# DSH 源码学习仓库

> **第一次来？先点这一个链接：** [打开傻瓜式入口：START-HERE.md](START-HERE.md)
>
> 只看 GitHub 网页就能开始：不需要下载源码、不需要 API key、不需要安装 pnpm，也不需要先会 TypeScript。进入后按“第一课 → 仓库地图 → 选择一条路线”走；暂时不要点 `Code`，也不要从 2,756 个逐文件索引条目开始。

英文入口：[README.md](README.md)

这是基于 [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness) 的非官方学习型 fork。它不属于 DeepSeek AI，不由 DeepSeek AI 维护，也不代表 DeepSeek AI 的官方立场。

本仓库把官方 DSH（DeepSeek Harness）固定在提交 `47f943859bef60e4160492346772ded9b24f765a`，并增加中文源码导读。目标是让第一次接触大型 TypeScript 项目的人，也能知道每一层、每个关键文件和每个源文件索引条目分别解决什么问题。

## 不知道从哪里开始？只做三步

1. 打开[傻瓜式入口：START-HERE.md](START-HERE.md)，它会根据你的目标告诉你下一步点哪一篇。
2. 第一次只读[00-开始这里](study/00-开始这里.md)、[01-仓库地图](study/01-仓库地图.md)和[02-Cordis与插件树](study/02-Cordis与插件树.md)，不需要下载、不需要 API key、不需要先会 TypeScript。
3. 想查文件、写笔记或运行实验时，再分别看[逐文件索引导航](study/文件索引/README.md)和[GitHub 网页、github.dev 与 Codespaces 学习路线](study/21-GitHub网页与Codespaces学习路线.md)。

不要从 2,756 个索引条目第一页开始顺序阅读。先用 `START-HERE.md` 选目标，再用索引把概念落回固定版本源码。

## 先从这里开始

- [傻瓜式入口](START-HERE.md)：只回答“我现在点哪里、第一轮读什么、什么时候需要下载或开云端”。
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
- [GitHub 生态检索与插件实战核验](study/12-GitHub生态检索与插件实战核验.md)：重新核对每个源文件的学习入口，解释 topic、目录、registry、普通 Bundle、管理器和运行时注入器的区别，并给出安装前审计和写插件的完整路线。
- [官方工具插件完整契约](study/13-官方工具插件完整契约.md)：从工具流水线、呈现模式、权限可见性、并发、取消到结果事件，按官方扩展点解释怎样写工具插件。
- [官方 Hook Bridge 与兼容层](study/14-官方HookBridge与兼容层.md)：区分 Hook 协议桥接、普通 Cordis 插件、源码 patch 和运行时注入，说明协议映射与生命周期边界。
- [Bundle、Profile、Loader 与发布安装](study/15-BundleProfileLoader与发布安装.md)：解释组合包、运行 Profile、patch 覆盖、模块解析、启动失败和 HMR。
- [学习工作簿与首个实验](study/16-学习工作簿与首个实验.md)：按“阅读、追文件、画 Turn、静态插件、组合实验、社区审核”的顺序实际使用本仓库。
- [完成度审计与证据矩阵](study/17-完成度审计与证据矩阵.md)：把已覆盖、真正的审计提示、模板复用统计和未验证项分开，回答这份教材够不够以及还缺什么证据。
- [维护、更新与版本迁移](study/18-维护更新与版本迁移.md)：说明如何在不混淆新旧源码的前提下更新固定 commit、重生成索引和复核手写材料。
- [插件测试、卸载与版本证据](study/19-插件测试卸载与版本证据.md)：建立从单元测试到 Loader、构建产物、E2E、真实 API 和卸载检查的证据层级。
- [学习仓库实际使用手册](study/20-学习仓库实际使用手册.md)：按“第一次阅读、逐文件追踪、写插件、审核社区项目、下载固定源码和运行文档门禁”给出可执行路线。
- [GitHub 网页、github.dev 与 Codespaces 学习路线](study/21-GitHub网页与Codespaces学习路线.md)：说明不下载源码如何阅读、如何在浏览器中搜索和记笔记，以及什么时候需要云端终端和计算环境。

## 每个源文件在哪里

当前固定提交中按生成器的源码扩展名白名单识别出 2,756 个代码或界面源文件，包括 TypeScript、TSX、CSS、JavaScript、Python、C/C++、Shell 和 HTML；测试文件也包括在内。它们被分到 `study/文件索引/` 的 66 个索引页中，每个文件都有单独的中文条目，固定包含十一个字段：所属层、文件角色、用途、设计原因、文件级设计证据、直接协作者、对应测试、测试关联依据、阅读顺序、代码证据和固定版本。JSON、YAML、Markdown、JSONL、锁文件和资源仍然是官方仓库的重要文件，只是当前没有被计入这组“源码文件”索引。

[源文件索引清单](study/source-index-manifest.json) 是机器可检查的文件列表；[生成器](study-tools/generate-source-index.mjs) 可以在切换到另一个官方提交后重新生成索引。

[索引验证器](study-tools/verify-source-index.mjs)、[索引质量审计器](study-tools/audit-source-index-quality.mjs) 和[手写路径验证器](study-tools/verify-study-links.mjs) 可以检查覆盖、固定版本、文件级静态证据和教程中的官方路径。普通条目是结构化自动导读，核心链路文件另外有人工精读，不能把自动分类当成完整代码审查。

如果你关心“不改源码怎么 hook”，先读[社区生态与扩展边界](study/10-社区生态与扩展边界.md)，再读[如何写一个合规插件](study/11-如何写一个合规插件.md)。这里明确区分官方维护包、合规第三方插件、配置组合层、源码 fork、运行时注入和私有 registry 改写；“能 hook”本身不等于“是插件”。

## 官方源码与本仓库材料的边界

- [上游固定版本说明](UPSTREAM.md) 记录来源、提交、文件范围和许可证边界。
- 本仓库主要保存中文导读、逐文件索引和生成/验证工具，不把完整的 7,412 个上游 Git tree 文件复制进来；每条源码链接都回到官方仓库的固定 commit。需要逐行运行或构建官方实现时，应按 `UPSTREAM.md` 下载同一 commit，并在研究完成后清理临时归档。
- 官方架构、开发和 Cordis 说明仍在 [`docs/`](docs/) 中；本仓库的 `study/` 是额外的中文学习层，不改写官方实现。
- `vendor/` 是 Cordis、Schemastery 等第三方项目的固定副本，但官方 DSH 对它们做了重命名、构建配置和部分行为修改。索引会列出它们；精读时先看固定版本的 [`vendor/README.md`](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/vendor/README.md) 的 Manifest 和 Local modifications，不能把每项实现都直接归因于上游，也不能把它们全部当成 DSH 原创代码。
- 本仓库新增的导读、索引和生成器不代表官方 API，也不承诺跟随 DSH 的未来兼容性。

## 为什么这个 fork 只保留一条 Actions 工作流

这是学习仓库，不是官方 DSH 的发布镜像。因此 `.github/workflows/` 只保留 `docs-pages.yml`：它负责把中文导读和官方文档构建成 GitHub Pages。上游带来的完整 CI、真实 API E2E、E2B 沙箱、跨平台 Sandbox、npm/PyPI 发布和官方 issue 自动化工作流都已从本 fork 移除，避免误跑外部服务、消耗凭据或把学习仓库误当成官方发布源。

GitHub Actions 的绿色运行只证明“这次文档构建和 Pages 部署通过”；它不证明 DSH 运行时、真实模型调用、插件安装卸载或社区项目安全。要研究这些内容，请回到固定 commit 的源码，按[插件测试、卸载与版本证据](study/19-插件测试卸载与版本证据.md)记录实际命令、输入、输出和清理结果。

<a id="run"></a><a id="run-from-source"></a>

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
