# Agent Note：宠物插件面板——阿溟跑在 DSH 式插件上

Status: implemented

[English](2026-08-25-pet-plugin-panel.md) | 中文

## Problem

吉祥物阿溟此前只有两个固定行为（CSS 眨眼、判分庆祝）——可爱但静止。与此同时，课程的核心主张「万物皆插件：注册 → 效果 → 卸载即 dispose」（02/11 课）只有散文讲授。外部的宠物组件（support-pet、agent-pet、lenny-pet）有巡游、眼神跟随、打盹和拖拽，但没有一个把宠物本身做成插件系统的模型。

## Decision

`study-pet-plugins.js` 在既有 `#dsh-companion` 元素上叠加一个真正的插件运行时，不修改 `study-companion.js`。五个行为插件——巡游、眼神跟随、打盹（45 秒无操作趴下冒 zzZ）、拖拽（位置存 localStorage）、眨眼（伴侣的 CSS 循环，可停用）——各自挂载真实的监听与定时器，并返回真实的 dispose 函数。吉祥物身上的小按钮打开面板：列出每个插件的订阅与效果，开关实时挂载/卸载（卸载「巡游」能看到它停下并清空位移），以及六条的事件日志，记录戳一戳 / dsh-study-delight / 标记已读事件和每次挂载与 dispose——微缩的 Session 日志。`createPetRuntime(factories, host)` 把簿记做成可注入，`study-pet-plugins.test.mjs`（6 条）在无 DOM 环境断言真实 dispose、重复挂载幂等、未知插件拒绝与日志模型。脚本在 `theme/index.ts` 追加；无伴侣的页面静默退出。

## Alternatives considered

**直接扩展 study-companion.js。** 否决：它是另一条工作线的活跃文件；并排叠加让两个模块可独立回滚，伴侣的判分反应在底层继续原样工作。

**Live2D 或精灵图集宠物（live2d-widget、codex-pets）。** 否决：重型资源或第三方精灵契约，而本站吉祥物是 22×21 字符网格 SVG 加单一来源调色板；教学价值在插件语义，不在更华丽的美术。

**只用 CSS 类切换伪造 dispose。** 对四个自有插件否决：教学点是卸载真的移除监听与定时器，所以巡游/眼神/打盹/拖拽注册并 dispose 真实处理器；只有眨眼是注明了的视觉停用，因为它的定时器住在伴侣的 CSS 里。

## Consequences

吉祥物现在会巡游、瞳孔跟随鼠标、在读者发呆时打盹、可以被拖走（位置持久化）；每个行为都能实时卸载，事件日志用 dispose 词汇叙述挂载、卸载与页面事件。面板明确说明自己是插件架构的教学模型。已构建站点实测：五个开关正确挂载/卸载并维护 aria 状态、卸载巡游清空位移、眼神跟随移动瞳孔、戳一戳与判分事件进日志、移动端横向溢出 0px、六条运行时模型测试通过；全量套件剩余失败属于另一工作线的最新实验室。
