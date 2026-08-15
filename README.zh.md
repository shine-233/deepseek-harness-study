# DeepSeek Harness 源码导读学习仓库

中文镜像（主入口：[README.md](README.md)）

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

## 每个源文件在哪里

当前固定提交中有 2,756 个代码或界面源文件，包括 TypeScript、TSX、CSS、JavaScript、Python、C/C++、Shell 和 HTML；测试文件也包括在内。它们被分到 `study/文件索引/` 的 66 个索引页中，每个文件都有单独的中文条目，至少说明用途、拆分原因、直接协作者、测试线索、阅读顺序和固定版本链接。

[源文件索引清单](study/source-index-manifest.json) 是机器可检查的文件列表；[生成器](study-tools/generate-source-index.mjs) 可以在切换到另一个官方提交后重新生成索引。普通条目是结构化自动导读，核心链路文件另外有人工精读，不能把自动分类当成完整代码审查。

## 官方源码与本仓库材料的边界

- [上游固定版本说明](UPSTREAM.md) 记录来源、提交、文件范围和许可证边界。
- 官方架构、开发和 Cordis 说明仍在 [`docs/`](docs/) 中；本仓库的 `study/` 是额外的中文学习层，不改写官方实现。
- `vendor/` 中的 Cordis 是固定在官方仓库里的第三方源码；索引会列出它，但精读时要先看来源和许可证。
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
node study-tools/generate-source-index.mjs --commit 47f943859bef60e4160492346772ded9b24f765a
```

如果还想让索引记录归档源码的行数和导出名，可以把 `--source-root` 指向同一提交的临时解压目录。索引对象仍由 Git tree 决定，不会把临时目录或本仓库新增文件混进官方文件清单。

## 许可证

官方项目使用 [MIT 许可证](LICENSE)。本仓库新增的中文导读和生成工具也按 MIT 许可发布；第三方依赖及其许可证见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
