# Agent Note: Lab accessibility contract runs as deterministic gates

Status: implemented

[English](2026-08-22-lab-a11y-contract-gates.md) | 中文

## Problem

实验页的无障碍承诺（移动端 viewport、中文语言、reduced-motion 处理、canvas 替代数据、键盘可操作性、桥接页的显式文件边界）只存在于散文和交接文档里。页面丢了 viewport 标签、链接的样式表全都不理 `prefers-reduced-motion`、或者长出一个没有数据表替代的 canvas，构建都不会红——要等某个人恰好看见才知道退化。

## Decision

[`study-tools/lab-a11y-contract.test.mjs`](../../../../study-tools/lab-a11y-contract.test.mjs) 对 `website/public` 里每个 HTML 页面钉住五条确定性检查：

1. viewport meta 带 `width=device-width`，且 `lang="zh-CN"`；
2. reduced-motion 覆盖按页面真实的样式闭包检查——至少一个链接的本地 CSS 包含 `prefers-reduced-motion`；
3. 每个 `<canvas>` 带 `aria-label`，有 canvas 的页面必须保留 `<table>` 作为非视觉数据路径；
4. 必须存在原生可聚焦控件，且不得出现正数 `tabindex`；
5. research-debug 桥保持边界：证据用文件输入接收，脚本里不得出现 `fetch`/`XMLHttpRequest`/`WebSocket`/`localStorage`/`sessionStorage`/`indexedDB`。

reduced-motion 检查放在样式层，因为保证就在那层：共享 CSS（`study-tokens.css`、各实验样式）在媒体查询下关闭动画，共享 JS 助手（`study-lab-kit.js`、`study-lab-reveal.js`）用同一个查询守门。真正浏览器绑定的部分——焦点顺序、屏幕阅读器输出、窄屏溢出、真实 GPU 上的 WebGL 回退——仍按 lesson 33 和交接册记录为 unknown；本测试不冒充覆盖了它们。

## Alternatives considered

- **Playwright 视口×输入模式矩阵。** 暂缓：本仓库的质量立场是 CI 跑离线确定性检查，浏览器农场引入的偶发面积与静态契约能抓住的问题不成比例。
- **只留人工清单。** 否决：清单会漂移；这个仓库的门禁存在的意义就是「没有可执行检查的声明只是装饰」。

## Consequences

丢 viewport 标签、所有链接样式表失去 reduced-motion 覆盖、上线裸 canvas、往桥接页里塞存储 API，现在都会让 `node --test` 变红。这些检查是语法层的：证明存在与接线，不证明渲染后的行为；lesson 33 的 unknown 列仍然拥有真浏览器真相。
