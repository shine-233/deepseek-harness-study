# GitHub 网页、github.dev 与 Codespaces 学习路线

这份说明回答“我想马上学习 DSH，是否必须先下载到本地”。结论是：只读教材和固定版本源码时不需要下载；需要在浏览器里搜索、做少量笔记时可以使用 `github.dev`；需要终端、构建、运行、调试或执行学习仓库检查时，再使用 GitHub Codespaces。

## 三种方式先看懂

| 方式 | 最适合做什么 | 终端、构建和运行 | 是否需要把仓库下载到本机 | 费用与注意事项 |
| --- | --- | --- | --- | --- |
| GitHub 仓库网页 | 阅读 README、导读、索引、源码和固定版本链接 | 不提供 | 不需要 | 直接打开网页即可 |
| `github.dev` | 浏览文件、全文搜索、语法高亮、少量编辑和提交笔记 | 不提供终端，不能 build、run 或 debug | 不需要完整 clone；未提交内容保存在浏览器本地存储 | 对 GitHub.com 用户免费，需要登录；要经常提交 |
| GitHub Codespaces | 运行文档检查、逐行试验、构建或调试 | 提供云端终端和计算环境 | 不需要下载到自己的电脑；仓库会在云端环境中准备 | 个人账户有每月免费额度，超额使用可能计费；创建前先看账单和 spending limit |

GitHub 官方把 `github.dev` 定义为完全运行在浏览器中的轻量编辑器，把 Codespaces 定义为托管在云端的开发环境。两者不是同一个功能：前者适合阅读和改文字，后者才有虚拟机、容器、终端和运行能力。

## 路线一：直接在 GitHub 网页端阅读

打开[学习仓库首页](https://github.com/shine-233/deepseek-harness-study)，然后依次进入[从零开始读 DSH](00-开始这里.md)、[仓库地图](01-仓库地图.md)和[Cordis 与插件树](02-Cordis与插件树.md)。GitHub 会直接渲染 Markdown，导读中的相对链接也可以继续点击，不需要先把仓库保存到本机。

第一次学习建议只做三件事：读懂六个词，画出一次 Turn 的时间顺序，再从一个索引条目跳到官方固定提交的源文件。推荐阅读顺序和“每个文件应该记录什么”已经写在[学习仓库实际使用手册](20-学习仓库实际使用手册.md)和[学习工作簿与首个实验](16-学习工作簿与首个实验.md)中。

普通 GitHub 网页的优点是最简单、最稳定，适合先建立整体认识。它不能替你运行 TypeScript、验证索引，也不能证明一个插件真的能装载或卸载；这些需要 Codespaces 或本地环境。

## 路线二：用 `github.dev` 在浏览器里搜索和记笔记

可以直接打开[本学习仓库的 github.dev 编辑器](https://github.dev/shine-233/deepseek-harness-study)。也可以在 GitHub 仓库页面按 `.`，或者把地址中的 `github.com` 改成 `github.dev`。官方文档把它称为 GitHub.com 上免费的 Web 版 VS Code 编辑器。

`github.dev` 适合做以下事情：按文件名和符号搜索，打开多个文件对照阅读，查看语法高亮，修改自己的 Markdown 学习笔记，以及通过 Source Control 提交变更。它不会把整个仓库 clone 到本地，而是通过浏览器中的 GitHub Repositories 扩展读取仓库；未提交的修改暂存在浏览器本地存储中，所以重要笔记应及时提交。

`github.dev` 不能做以下事情：没有集成终端，不能安装 pnpm 依赖，不能运行 `node study-tools/...`，不能构建 DSH，不能启动 Web 服务，也不能进行真实 API、插件加载或调试实验。浏览器只支持能够在 Web 中运行的部分 VS Code 扩展；如果页面显示的是 `vscode.dev` 的 VS Code 浏览器界面，这是当前入口的正常跳转形式，不代表已经进入 Codespaces。

使用时遵守这个小流程：先按 `Ctrl+P` 打开文件，再按 `Ctrl+Shift+F` 搜索概念或符号，阅读后把自己的结论写进个人分支或学习笔记，最后在 Source Control 中填写提交信息并提交。不要把未提交的浏览器本地修改当成永久备份。

## 路线三：需要运行时再开 Codespaces

GitHub Codespaces 是运行在云端 Docker 容器和虚拟机中的开发环境，可以从仓库的分支或固定 commit 创建，并从浏览器中的 VS Code 界面连接。官方默认环境是 Ubuntu Linux；即使你的电脑是 Windows，Codespace 里的命令和文件系统也按 Linux 处理。

在本仓库网页上可以通过 `Code → Codespaces` 查看入口。打开菜单本身不会启动云端资源；真正创建之后发生什么，取决于仓库里提交的 [.devcontainer/devcontainer.json](https://github.com/shine-233/deepseek-harness-study/blob/master/.devcontainer/devcontainer.json)。它声明了 Node 24 基础镜像、pnpm 11、创建后自动执行 `pnpm install --frozen-lockfile`，并转发 5173／4173 两个预览端口。也就是说，Codespace 准备的是这套 Linux 容器和依赖安装步骤，不是你本机的 Windows 环境。本仓库核验时只确认到配置文件的内容，没有逐项验证云端创建流程；以官方文档和你的账单页面为准。

创建后，先在云端终端确认目录和 Node，再按需要运行学习仓库自己的检查：

```sh
pwd
node --version
node study-tools/verify-source-index.mjs
node study-tools/audit-source-index-quality.mjs
node study-tools/verify-study-links.mjs
```

这些命令检查的是中文索引和文档链接，不会自动证明官方 DSH 已经完成构建、真实模型请求、完整 E2E 或第三方插件安装。需要运行官方 DSH 时，还必须遵循[上游固定版本说明](../UPSTREAM.md)和官方项目的依赖、密钥及平台要求；不要把 Codespaces 能打开仓库写成 DSH 已经运行成功。

个人 GitHub Free 或 Pro 账户包含每月 Codespaces 免费额度；使用超出免费额度后可能需要支付方式和 spending limit。当前仓库的 Codespaces 菜单还显示“Codespace usage for this repository is paid for by shine-233”，因此创建前应在 GitHub 的计费页面确认由谁承担费用、剩余额度和停止策略。学习只需要阅读时，不建议为了打开 README 创建 Codespace。

## 我建议你的第一次在线学习顺序

1. 先打开[仓库首页](https://github.com/shine-233/deepseek-harness-study)，阅读 README 的免责声明、固定 commit 和证据边界。
2. 打开[00-开始这里](00-开始这里.md)，用自己的话解释插件、服务、事件、Profile、Bundle、Turn 六个词。
3. 打开[01-仓库地图](01-仓库地图.md)和[02-Cordis与插件树](02-Cordis与插件树.md)，把 `apps`、`packages`、`vendor`、`examples`、`scripts` 的责任写成一张小表。
4. 从[核心文件精读](03-核心文件精读.md)或[Agent与Turn流程](04-Agent与Turn流程.md)选一个主链路，再从[逐文件索引导航](文件索引/README.md)跳到一个具体源文件。
5. 只想查找和对照时继续用 GitHub 网页；想在浏览器里做笔记时切换到 `github.dev`；只有需要命令和运行证据时才创建 Codespace。
6. 完成第一轮后，用[学习工作簿与首个实验](16-学习工作簿与首个实验.md)记录“我证明了什么、还没有证明什么、下一跳是什么”。

这条路线把“阅读证据”和“运行证据”分开：网页可以让你开始学习，`github.dev`可以让你整理自己的理解，Codespaces 才能提供实验所需的计算环境。三者可以接续使用，但不能用前两者的阅读或编辑能力替代运行时验证。

## 官方资料

- [The github.dev web-based editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)：说明浏览器编辑器、登录、浏览器存储、Source Control，以及它与 Codespaces 的区别。
- [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces)：说明云端容器、虚拟机、默认 Ubuntu、分支或 commit 创建方式、dev container 和计费。
- [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/quickstart)：说明如何创建 Codespace、使用内置终端、转发端口和提交变更。
