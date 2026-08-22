# Agent Note: 实验室总览页给十个离线实验一个统一入口

Status: implemented

[English](2026-08-22-study-lab-hub.md) | 中文

## Problem

十个确定性实验（`website/public/*-lab.html` 与 `research-debug-bridge.html`）各自只被一个课程页通过 `LessonWidget` 引用。站点内没有任何页面把它们放在一起：从首页进来的读者看不到"能动手玩什么"，只能靠 README 的实验表或撞进某一课才发现。GitHub Pages 上的裸 HTML 页面也没有统一的导航面，进了其中一个实验的读者想看其余九个，只能退回 GitHub。

## Decision

新增实验室总览页 `website/public/study-labs.html`，一页列出全部十个实验。它与既有独立页（`study-review.html`）共用同一套外壳：`study-tokens.css` + `study-lab-shell.css`、严格 CSP、`connect-src 'none'`。

- 十张静态卡片，每张带一幅线稿小图（SVG，`aria-hidden`，语义由卡片文字承担），对应实验的核心机制；卡片给出实验链接和配套课链接。
- 按目的分三组筛选（主链路 / 插件与生态 / 边界与交接），原生按钮 + `aria-pressed`，选择写入 `location.hash`（`#group=<name>`），刷新不丢。
- 进度联动：读 `dsh-study-progress-v2`（解析复用 `study-progress-core.js` 的纯函数），卡片显示"亲手做过 / 配套课已读"，顶部 metric 行显示计数；读不到 localStorage 时降级为一行说明。
- 课程页进度组件（`study-progress.js`）在"已读 n 课"旁新增"实验室"链接，指向总览页。
- `verify-built-study-site.mjs` 的 `REQUIRED_PUBLISHED_PAGES` 增加总览页契约条目；九条配套课链接走既有 `collectLabLessonLinks` 清单，构建产物按大小写精确核对。
- 首页路线表（`START-HERE.md`）增加一行入口，用原生 HTML 锚点指向 `/study-labs.html`，与 `LessonWidget` 的 url 属性同一降级约定（GitHub 网页上不可达，行内文字已注明改走 README 实验表）。

## Alternatives considered

**在首页 markdown 里用 md 链接直接指向实验室。** VitePress 的死链门禁按投影路由解析 markdown 链接目标，而 public 目录资产不是路由，写成 `[文字](/study-labs.html)` 会让 `website:build` 失败。原生 HTML 锚点不在死链检查范围内——这正是首页那行用锚点、`LessonWidget` 用 iframe url 而不用 markdown 链接的原因。

**把总览页挂进 `config.ts` 的顶部导航。** 导航按语言从 study 集合生成，根级 public 资产套不进 `studyPageLink`；为两种语言各穿一条例外，换来的东西不比"首页一行 + 全站进度组件链接"多。

**用 JS 数据渲染卡片而不是静态 HTML。** 静态标记让每张卡在没有 JavaScript 时照样可读，让中文标签门禁和无障碍门禁扫到真实源码文本，也和 `study-review.html` 的出货方式一致。脚本只负责切换类名和填充徽标。

## Consequences

进度数据仍然只写本机浏览器：总览页不引入新的存储键，也不联网。`research-debug-bridge` 不在进度白名单（`LAB_PAGE_IDS`）里，metric 按"9 / 10 个页面计入"呈现，不悄悄扩大名单。以后加第十一个实验室时，只需加一张卡片——分组计数由 `study-labs.js` 在加载时计算，静态标记里补上条目即可。
