---
layout: home
title: DSH 源码学习
titleTemplate: 面向社区的中文零基础友好教材
hero:
  name: DSH 源码学习
  text: 从不知道点哪里，到能追一个源文件
  tagline: 面向 DSH 社区的非官方源码导读。不用下载，也不用 API key；先读总论，再认识源码。
  actions:
    - theme: brand
      text: 第一次来，按这里走
      link: /study/
    - theme: alt
      text: 不想选，照着做
      link: /study/lessons/25-从首页到第一次产出的动手任务单
    - theme: alt
      text: 想动手写插件
      link: /study/lessons/28-最小插件示例与学习检查
---

::: warning 项目身份：这是社区教材，不是官方教程

本网站由 DSH 社区维护，用来帮助读者理解固定版本源码、学习公开扩展点、审查社区插件，并把研究结论整理成上游建议。它不属于 DeepSeek AI，不代表官方立场，也不提供官方 API、兼容性或安全认证；遇到冲突时，请以上游固定提交和官方文档为准。

:::

> 这页只有一个选择原则：第一次来点“按这里走”，不想选择就点“照着做”，只有准备运行命令时才点“写插件”。其他内容都在下一层，不需要一次打开。

::: tip 第一轮的默认答案
先读教材总论、六个词和仓库地图；如果你愿意继续，再打开一个固定版本源文件并写下四句话。工具箱、逐文件索引和社区审计都是第二步，不要一开始全部打开。
:::

<div class="dsh-no-prereq" aria-label="第一次不用做的事">
  <span class="dsh-no-prereq-kicker">第一次不用做</span>
  <span>不用下载源码</span>
  <span>不用配置 API key</span>
  <span>不用先会 TypeScript</span>
</div>

<div class="dsh-route-heading">
  <span class="dsh-route-kicker">先选一条，今天就停在这里</span>
  <strong>你不需要一次学完整个仓库</strong>
  <small>只要完成一条路线，就会得到一个明确的下一步和一条可复核的学习记录。</small>
</div>

<div class="dsh-route-grid" aria-label="三条开始路线">
  <a class="dsh-route-card dsh-route-card-primary" href="./study/">
    <span class="dsh-route-step">01 · 默认路线</span>
    <strong>我第一次来</strong>
    <span>先读教材总论，再认识六个词和仓库地图。只读网页，不需要安装任何东西。</span>
    <span class="dsh-route-link">打开第一课 <span aria-hidden="true">→</span></span>
  </a>
  <a class="dsh-route-card" href="./study/lessons/25-从首页到第一次产出的动手任务单">
    <span class="dsh-route-step">02 · 不想选</span>
    <strong>照着 15 分钟任务单走</strong>
    <span>按顺序点开页面，最后留下第一条固定版本源码记录。</span>
    <span class="dsh-route-link">开始任务单 <span aria-hidden="true">→</span></span>
  </a>
  <a class="dsh-route-card" href="./study/examples/minimal-observer">
    <span class="dsh-route-step">03 · 想动手</span>
    <strong>先跑最小示例</strong>
    <span>先做示例自动测试和代码检查（lint）；真实 DSH、加载器（Loader）和卸载另算证据。</span>
    <span class="dsh-route-link">查看示例 <span aria-hidden="true">→</span></span>
  </a>
</div>

<div class="dsh-stuck-card" aria-label="卡住时怎么办">
  <div class="dsh-stuck-lead">
    <span class="dsh-proof-kicker">卡住时不用猜</span>
    <strong>只回到最近一个能看见结果的步骤</strong>
    <small>先确认页面、命令和证据层级，再决定是否继续深入源码。</small>
  </div>
  <ol class="dsh-stuck-steps">
    <li><span>01</span><strong>找不到页面</strong><small>回“从这里开始”，别在索引里乱跳。</small></li>
    <li><span>02</span><strong>命令报错</strong><small>先看前置条件；阅读不需要 API key。</small></li>
    <li><span>03</span><strong>结论不确定</strong><small>把源码事实和未运行证据分开写。</small></li>
  </ol>
</div>

<div class="dsh-home-contract" aria-label="这一轮学习目标">
  <div class="dsh-home-contract-lead">
    <span class="dsh-proof-kicker">这一轮你会得到什么</span>
    <strong>一条能回到源码的学习记录</strong>
    <small>按“打开 → 看什么 → 看到什么 → 没证明什么”走完一小轮；读不懂时知道该回哪里。</small>
  </div>
  <ol class="dsh-home-contract-steps">
    <li><span class="dsh-home-contract-number">1</span><span><strong>打开</strong><small>第一课和仓库地图</small></span></li>
    <li><span class="dsh-home-contract-number">2</span><span><strong>看什么</strong><small>一个固定版本源文件和它的下一跳</small></span></li>
    <li><span class="dsh-home-contract-number">3</span><span><strong>留下</strong><small>用途、证据、边界和下一步</small></span></li>
  </ol>
</div>

<div class="dsh-proof-strip" aria-label="第一轮学习结果">
  <div class="dsh-proof-item">
    <span class="dsh-proof-kicker">05 分钟</span>
    <strong>先认识</strong>
    <small>六个词 + 仓库地图</small>
  </div>
  <div class="dsh-proof-item">
    <span class="dsh-proof-kicker">15 分钟</span>
    <strong>留下一条记录</strong>
    <small>固定版本、用途、证据、下一跳</small>
  </div>
  <div class="dsh-proof-item">
    <span class="dsh-proof-kicker">需要时再运行</span>
    <strong>先做离线检查</strong>
    <small>自动测试、代码检查、索引和 Pages 页面</small>
  </div>
  <div class="dsh-proof-item">
    <span class="dsh-proof-kicker">始终分开</span>
    <strong>已证明 / 未证明</strong>
    <small>不把静态结果写成模型运行结果</small>
  </div>
</div>

<section class="dsh-home-learning-results" aria-labelledby="dsh-home-learning-results-title">
  <div class="dsh-home-learning-results-intro">
    <span class="dsh-proof-kicker">读完第一轮，你会得到什么</span>
    <strong id="dsh-home-learning-results-title">不是“看过很多”，而是能回答四个问题</strong>
    <small>这组目标借鉴了公开教程常用的 “Objectives / You will learn / What's next” 结构；每一格都能回到一个页面或一条源码证据。</small>
  </div>
  <div class="dsh-home-learning-results-grid">
    <a class="dsh-home-learning-card" href="./study/lessons/00-开始这里">
      <span class="dsh-home-learning-number">01</span>
      <strong>它是什么</strong>
       <small>先理解 Agent 的工作循环和证据边界，再用六个词说清插件、服务、事件、运行清单（Profile）、功能组合（Bundle）和一次任务轮次（Turn）。</small>
    </a>
    <a class="dsh-home-learning-card" href="./study/lessons/01-仓库地图">
      <span class="dsh-home-learning-number">02</span>
      <strong>从哪里找</strong>
      <small>从目录和入口找到一个源文件、一个直接协作者和一条下一跳。</small>
    </a>
    <a class="dsh-home-learning-card" href="./study/lessons/25-从首页到第一次产出的动手任务单">
      <span class="dsh-home-learning-number">03</span>
      <strong>怎么证明</strong>
      <small>把“源码事实”和“还没有运行证据”写进同一条学习记录。</small>
    </a>
    <a class="dsh-home-learning-card" href="./study/lessons/27-工具预算与插件责任决策卡">
      <span class="dsh-home-learning-number">04</span>
      <strong>下一步做什么</strong>
      <small>知道什么时候继续网页阅读，什么时候才进入示例、云端终端或实验。</small>
    </a>
  </div>
</section>

<div class="dsh-status-strip" aria-label="当前学习仓库门禁状态" data-study-pages="104" data-index-files="2756" data-learning-tests="27" data-example-tests="8" data-structural-errors="0">
  <div class="dsh-status-summary">
    <span class="dsh-status-kicker">本地最近一轮</span>
    <strong>入口和教材结构已通过</strong>
    <small>这些是静态构建与确定性检查的结果，不是 DSH、provider 或模型运行证明。</small>
  </div>
  <div class="dsh-status-metric">
    <strong>104</strong>
    <span>中文学习页面</span>
  </div>
  <div class="dsh-status-metric">
    <strong>2,756</strong>
    <span>逐文件索引</span>
  </div>
  <div class="dsh-status-metric">
    <strong>27 + 8</strong>
    <span>学习工具 / 示例测试</span>
  </div>
  <div class="dsh-status-metric dsh-status-metric-good">
    <strong>0</strong>
    <span>结构错误</span>
  </div>
</div>

<p class="dsh-status-boundary"><strong>证据边界：</strong>页面和链接完整，只说明教材可以被构建和定位；真实 Loader、插件安装卸载、provider、模型延迟和安全行为仍需单独验证。</p>

<section class="dsh-feedback-section" aria-labelledby="dsh-feedback-title">
  <div class="dsh-feedback-copy">
    <span class="dsh-proof-kicker">遇到问题也有下一步</span>
    <strong id="dsh-feedback-title">把问题交给正确的入口</strong>
    <small>发现事实错误、页面打不开、教程无法复现或社区扩展风险时，按类型提交一条最小线索；不要粘贴密钥，也不要把“待核验”写成“已证实”。</small>
  </div>
  <div class="dsh-feedback-links" aria-label="问题反馈入口">
    <a href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=doc-fact-error.yml">文档事实错误</a>
    <a href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=broken-link.yml">链接或页面问题</a>
    <a href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=tutorial-reproduction.yml">教程无法复现</a>
    <a href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=community-audit.yml">社区扩展审计</a>
  </div>
</section>

<div class="dsh-learning-map" aria-label="四步学习路线">
  <a class="dsh-learning-step" href="./study/lessons/00-开始这里">
    <span>01</span>
    <span><strong>先认识</strong><small>六个词和最小心智模型</small></span>
  </a>
  <a class="dsh-learning-step" href="./study/lessons/01-仓库地图">
    <span>02</span>
    <span><strong>再定位</strong><small>知道目录、入口和下一跳</small></span>
  </a>
    <a class="dsh-learning-step" href="./study/lessons/25-从首页到第一次产出的动手任务单">
    <span>03</span>
    <span><strong>留下一条记录</strong><small>固定版本、用途、证据、边界</small></span>
  </a>
  <a class="dsh-learning-step" href="./study/examples/minimal-observer">
    <span>04</span>
    <span><strong>想动手再验证</strong><small>示例自动测试、代码检查和明确未证明项</small></span>
  </a>
</div>

## 第一次只按这三步做

1. 点击页面顶部的主按钮，进入[从这里开始](START-HERE.md)，再只读[六个基础词](study/00-开始这里.md#先记住六个词)和“一个最小的心智模型”。先不要打开逐文件索引。
2. 打开[仓库地图](study/01-仓库地图.md)，只回答三个问题：一次输入从哪里开始？工具说明在哪里进入请求？一次 Turn 的结果在哪里保存？
3. 回到下面的表格，只选择一行。读完这一行推荐的文章，再决定要不要查具体文件、写插件或开 Codespace。

> 如果你只是想阅读，停留在 GitHub 网页就够了；不要为了打开教材点击 `Code`、下载源码或创建 Codespace。

> 已经知道文件名、包名或术语时，点击右上角“搜索文档”，或按 `Ctrl+K`（Mac：`⌘K`），试试 `Agent`、`tools` 或 `session`；不知道名称时，再从逐文件索引按目录找。

> 不想选择路线？直接打开[15 分钟动手任务单](study/25-从首页到第一次产出的动手任务单.md)，按顺序点击并写下第一条源码结论。

> 只想先弄懂“工具太多”和“插件到底算哪一类”？直接打开[工具预算与插件责任决策卡](study/27-工具预算与插件责任决策卡.md)，先记住三层工具状态和六层社区生态。

## 第二步：按你的问题只选一条

| 你的问题 | 点击这里 | 第一轮结束时应能回答 |
| --- | --- | --- |
| 我完全不知道 DSH 是什么 | [从这里开始](START-HERE.md) | 插件、服务、事件和一次 Turn 分别做什么 |
| 我想先搞懂插件生态怎么分层 | [工具预算与插件责任决策卡](study/27-工具预算与插件责任决策卡.md) | 普通插件、Bundle、Hook bridge、patch、fork、注入分别由谁负责 |
| 我想把社区观察写成给官方的更新建议 | [给官方 DSH 的下一步更新建议](study/33-给官方DSH的更新建议.md) | 哪些社区需求应该上移为公共契约，哪些不应该塞进 DSH 核心 |
| 我担心工具太多、模型上下文太长 | [工具预算与插件责任决策卡](study/27-工具预算与插件责任决策卡.md) → [工具可见性与非侵入扩展](study/22-工具可见性与非侵入扩展.md) → [工具可见集合观测与性能实验](study/23-工具可见集合观测与性能实验.md) | 注册、可见和有权限为什么是三件事，以及怎样开始测 |
| 我想写普通插件 | [工具预算与插件责任决策卡](study/27-工具预算与插件责任决策卡.md) → [如何写一个合规插件](study/11-如何写一个合规插件.md) | 如何先选对扩展层，再注册、装配、测试、卸载和说明版本 |
| 我想先实际改一个最小插件 | [最小插件示例与学习检查](study/28-最小插件示例与学习检查.md) | 怎样运行单元测试和 lint，又不误把它写成真实 DSH 验证 |
| 我想知道 CI 和 Agent 审阅到底检查什么 | [学习仓库的质量检查与审阅](study/29-学习仓库的质量检查与审阅.md) | 哪些检查是确定性的、Agent 审阅为什么只能当辅助，以及哪些结论仍要真人或真实运行来证明 |
| 我想知道教材为什么这样设计 | [源码学习项目的渐进式设计](study/32-源码学习项目的渐进式设计.md) | 首页分流、最小示例、练习、自检和 CI 如何组成学习闭环 |
| 我想不改源码做 Hook | [工具预算与插件责任决策卡](study/27-工具预算与插件责任决策卡.md) → [社区生态与扩展边界](study/10-社区生态与扩展边界.md) | 什么是公开扩展点，什么已经属于 patch 或注入 |
| 我只想查一个源文件 | [逐文件索引导航](study/文件索引/README.md) | 这个文件的用途、协作者、测试线索和下一跳在哪里 |
| 我想知道索引卡片是否真的准确 | [高风险索引人工抽查](study/24-高风险索引人工抽查.md) | 自动索引、源码事实和运行时证据怎样分开 |
| 我想运行检查或实验 | [网页、github.dev 与 Codespaces](study/21-GitHub网页与Codespaces学习路线.md) | 哪些事只需网页，哪些事才需要云端终端 |
| 我想照着命令检查教材或工具快照 | [学习工具箱](study/31-学习工具箱.md) | 怎样在不启动 DSH 的前提下运行入口、索引、A/B 和发布检查 |
| 我想知道以后还能做什么 | [后续研究路线](study/26-后续研究路线.md) | 哪些工作值得做，哪些工作需要宿主、模型或仓库权限 |
| 我想处理漏洞、Actions 提示和 Pages 发布 | [安全告警与网页发布维护](study/30-安全告警与网页发布维护.md) | 如何读取 47 条告警、区分已处理与未验证，并确认整套教材确实能从网页读完 |

## 这份教材怎样保证不乱说

- 每个纳入范围的源文件都有中文索引，但索引卡片不是逐行人工翻译。
- 固定源码、源码测试、文档门禁、Pages 部署和真实 DSH 运行是五种不同证据。
- 本仓库当前没有真实模型的 token、延迟或质量基准，所以工具性能部分会明确写“有设计依据，尚无本仓库实测”。
- 普通插件作者不应偷偷替宿主修改私有 registry、模块缓存、进程或 Windows 注册表；需要改变核心一致性时，应由宿主维护者维护 patch/fork，或把兼容层明确标成非官方方案。
- Pages 构建会从磁盘递归核对学习入口和 `study/**/*.md` 的路由覆盖；网页构建通过只证明教材投影完整，不证明真实 DSH 或社区插件运行安全。

准备好后，点上面的“第一次来，按这里走”。如果读到一半迷路，只回到这一页重新选一行；不要在 2,756 个索引条目里随机跳转。
