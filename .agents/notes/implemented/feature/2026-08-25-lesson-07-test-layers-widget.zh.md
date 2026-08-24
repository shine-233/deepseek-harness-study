# Agent Note：07 课测试层次交互模型

Status: implemented

[English](2026-08-25-lesson-07-test-layers-widget.md) | 中文

## Problem

07 课用一张表格陈述六层测试，再用脚注敲本课核心规则：单元测试全绿不代表 E2E 或真实模型已验证，E2E 失败也可能是环境问题。读者扫过表格能拿到六个「回答什么」，却没有任何东西让跨层边界变得可触摸；07 课也是主链路上少数完全没有交互模型的课程之一。

## Decision

课程正文里的占位容器 `<div class="dsh-testlayers" data-dsh-testlayers>` 由新注入模块 `website/public/study-testlayers.js` 渲染成双栏模型：左侧六个层按钮，右侧详情卡。选中一层时展示它回答什么（表格原句）、它不回答什么（只由同一张表里其余各层的问题推导），以及课程原文给出边界警告时的逐字引文。模块沿用仓库契约：数据与 `buildLayerDetail`/`renderLayerDetailHtml` 是导出的纯函数，在 Node 里测试（`study-tools/study-testlayers.test.mjs`，8 条）；DOM 操作收在浏览器守卫内；样式由模块自身注入；去抖 MutationObserver 跟随 VitePress 单页路由。脚本标签在 `theme/index.ts` 里与既有三个注入并列；没有容器的页面只付一次扫描的开销。

## Alternatives considered

**往 study-quiz 题库里加「这句话是哪层证明的」题目。** 暂缓：题库是另一条在制工作线，本模型教的是表格结构，测验路线考的是回忆，两者以后组合不需要改这个组件。

**像内嵌实验那样用 iframe 装模型。** 否决：内容只有六行两句警告，iframe 带来文档边界、第二套 CSS 上下文和一整套实验门管线，而数据只是一个冻结数组。

**「不回答」一栏从一般测试常识推导。** 否决：每个不回答条目都是对同一张表其他行的否定式推导，两条警告逐字复制，组件因此不会偏离它所引用的课程文本。

## Consequences

07 课的核心证据规则现在有了键盘可达、`aria-pressed` 跟踪的模型；选中是瞬时状态，不需要 URL hash 持久化。组件由数据驱动：课程表加第七层只需一条数组项加它的不回答推导；Node 测试断言六个层名序列，数组与表格漂移时会直接失败。已构建站点实测：六个按钮渲染、点选与键盘选择更新 `aria-live` 详情卡、移动端横向溢出 0px，study-tools 全量测试与站点门禁保持全绿。
