---
layout: home
title: DSH 源码学习
titleTemplate: 中文傻瓜式教材
hero:
  name: DSH 源码学习
  text: 从“我不知道点哪里”开始，走到能追一个源文件
  tagline: 先用 15 分钟建立地图，再按工具、插件、Hook、Session 或源码阅读选择路线。
  actions:
    - theme: brand
      text: 开始第一课
      link: /study/
    - theme: alt
      text: 我只想查一个文件
      link: /study/files/README
    - theme: alt
      text: 了解网页与云端学习
      link: /study/lessons/21-GitHub网页与Codespaces学习路线
features:
  - title: 先建立地图
    details: 不要求先会 TypeScript。先认识插件、服务、事件、Profile、Bundle、Session 和 Turn。
  - title: 再追一条主链路
    details: 从用户输入走到 Agent、LLM、工具、Session 和 UI；每一跳都回到固定版本源码。
  - title: 最后做可验证的扩展
    details: 分清注册、模型可见、执行权限，以及普通插件、Hook bridge、patch、fork 和注入。
---

## 你现在该点哪一个

| 你的问题 | 点击这里 | 第一轮结束时应能回答 |
| --- | --- | --- |
| 我完全不知道 DSH 是什么 | [从这里开始](START-HERE.md) | 插件、服务、事件和一次 Turn 分别做什么 |
| 我担心工具太多、模型上下文太长 | [工具可见性与非侵入扩展](study/22-工具可见性与非侵入扩展.md) | 注册、可见和有权限为什么是三件事 |
| 我想写普通插件 | [如何写一个合规插件](study/11-如何写一个合规插件.md) | 如何注册、装配、测试、卸载和说明版本 |
| 我想不改源码做 Hook | [社区生态与扩展边界](study/10-社区生态与扩展边界.md) | 什么是公开扩展点，什么已经属于 patch 或注入 |
| 我只想查一个源文件 | [逐文件索引导航](study/文件索引/README.md) | 这个文件的用途、协作者、测试线索和下一跳在哪里 |
| 我想运行检查或实验 | [网页、github.dev 与 Codespaces](study/21-GitHub网页与Codespaces学习路线.md) | 哪些事只需网页，哪些事才需要云端终端 |

## 这份教材怎样保证不乱说

- 每个纳入范围的源文件都有中文索引，但索引卡片不是逐行人工翻译。
- 固定源码、源码测试、文档门禁、Pages 部署和真实 DSH 运行是五种不同证据。
- 本仓库当前没有真实模型的 token、延迟或质量基准，所以工具性能部分会明确写“有设计依据，尚无本仓库实测”。
- 普通插件作者不应偷偷替宿主修改私有 registry、模块缓存、进程或 Windows 注册表；需要改变核心一致性时，应由宿主维护者维护 patch/fork，或把兼容层明确标成非官方方案。

准备好后，点上面的“开始第一课”。如果只是想在 GitHub 网页阅读，不需要下载源码、API key 或 pnpm。
