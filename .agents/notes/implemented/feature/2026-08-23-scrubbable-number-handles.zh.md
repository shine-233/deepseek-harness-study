# Agent Note：实验页读数变成可拖对象

Status: implemented

[English](2026-08-23-scrubbable-number-handles.md) | [中文](2026-08-23-scrubbable-number-handles.zh.md)

## Problem

离线实验室里的数值参数此前只能通过范围滑杆调整。这对键盘用户够用，但有两个缺口——交互式解释领域的公认做法把它们当一等公民对待：指针用户难以在某个值附近做小幅精确调整（滑块本身的颗粒度在跟他们作对）；而展示参数的读数是死的，尽管读者的视线恰好停在那里。redblobgames 把这叫"scrubbable numbers"，ciechanow.ski 的演示通篇都在用同一招。

## Decision

`study-lab-kit.js` 新增 `nextScrubValue`（纯函数的像素换步数数学，可在 Node 单测）和 `installNumberScrub`（指针接线）。拖柄就是现成的 `<output>` 读数：按住左右拖，驱动旁边那个 range input 走它正常的 `input` 事件——滑杆仍是唯一事实来源，所有既有监听器不用改一行。

首个消费方是 `session-log-lab.html` 的打包行成员数 scrubber：拖动读数等于拨动 `bindRangeKeys` 和 `bindAutoAdvance` 已经挂好的那根滑杆。因为拖柄派发的是普通 `input` 事件，连播会在拖动期间暂停，与手动抓滑杆的行为一致。

键盘路径刻意**不**复制到拖柄上：旁边的原生滑杆已有方向键/Home/End 全套支持，`<output>` 因此保持本来语义——不加 `role="slider"`、不加第二个焦点停靠点去让屏幕阅读器把同一个值念两遍。

## Alternatives considered

**把读数升级成带 tabindex 和完整 ARIA 值属性的 `role="slider"`。** 否决：一个参数出现两个可聚焦控件是屏幕阅读器噪音；指针 affordance 在隔壁就有真控件的情况下不需要自己成为语义控件。

**全面用自制 scrub 组件替换 range input。** 否决：原生滑杆免费带来键盘支持、焦点行为和 reduced-motion 语义；重建这些只有成本，对读者没有可见收益。

**通用 `get`/`set` 回调 API 而不是绑定滑杆。** 目前否决：现有场景背后都有真滑杆；直接绑定消灭了第二事实来源。纯数学单独导出，未来出现无滑杆的消费方时依然可以复用。

## Consequences

凡是数值读数挨着 range input 的地方，实验室现在都能提供 ciechanow 级的精细控制；代价是一个 kit 导出、一个 CSS 类（`.lab-scrub-number`：`ew-resize` 光标、禁选中、横向 `touch-action`），以及"配对滑杆保持权威"这条纪律。像素换步的比例放在一个常量里（`pxPerStep = 6`）；哪个实验需要更粗或更细的手感，应该扩展 options 对象，而不是在调用点手调 delta。

## Testing

- `node --test study-tools/study-lab-kit.test.mjs` — 5 个用例覆盖步进取整、两端夹紧、非整数步长、自定义像素比例和不可用量程。
- `study-tools/lab-modules-import-without-dom.test.mjs` 保持绿色：新导出维持模块加载无 DOM。
- `session-log`、`study-lab-state` 与 stepper smoke 各套件不变且全绿。
