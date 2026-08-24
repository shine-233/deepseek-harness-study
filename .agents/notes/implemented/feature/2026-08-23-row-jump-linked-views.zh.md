# Agent Note：点行跳时间轴（linked views 的反向半边）

Status: implemented

[English](2026-08-23-row-jump-linked-views.md) | [中文](2026-08-23-row-jump-linked-views.zh.md)

## Problem

两个旗舰实验室早就实现了 Distill linked-views 模式的前一半：滑杆同时驱动去向条、状态块和事件表。后一半缺失——读者在处置表里扫到某一行、想让时间轴停在那儿，只能眯着眼对数字再手动拖滑杆。

## Decision

kit 新增 `bindRowJump(tableBody, slider)`：点击带 `data-key` 的行，把 key 夹进滑杆量程后派发普通 `input` 事件，所有既有监听器照手动拖动一样重建。接线在 session-log（处置表 → 重放位置）和 turn-flow（步骤表 → 主时间轴）。`renderRows` 本来就盖 `data-key`，两张表的 key 与滑杆共用值域，所以每页两行代码加 shell CSS 里一条 cursor 规则就接完了。

键盘与读屏用户继续走原生滑杆的完整路径；点击处理不加 tab 停靠点也不加 ARIA 角色——它是在已经完整的键盘契约之上补的指针 affordance。

## Alternatives considered

**把每行做成 button 换取完整键盘可达。** 否决：一张表多出几十个重复 tab 停靠点；旁边的滑杆用方向键本来到达任何位置。

**改用 hash 深链替代点击跳转。** 已有独立实现（copyLink 把状态写进 URL hash）；这里补的是深链覆盖不到的页内手势。

## Consequences

总览↔明细的环在两个旗舰实验室闭合；代价是一个 kit 导出、一个 CSS 类，以及"行 key 必须落在滑杆值域内"这条纪律。未来的明细表只要把 tbody 和管它值域的滑杆传进来，反向联动即得。

## Testing

- 全套件 407/407 绿（含并行工作流的 prompt-assembly 套件）。
- `website:build`：119 页对账，首页指标门禁通过。
