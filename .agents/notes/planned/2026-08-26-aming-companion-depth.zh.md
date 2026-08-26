# 阿溟 3D 常驻主角：开工前勘误与分期计划

日期：2026-08-26 · 状态：待开工（规格已修订，勿按旧规格动工）

## 勘探结论（推翻原假设）

原规格写「scene3d.js 复用渲染器」。实测：`website/public/study-lab-scene3d.js`
零外部 import，是自研渲染；仓库不存在 vendored three.js。

| 方案 | 成本 | 结论 |
| --- | --- | --- |
| 引 three.js（自托管） | ~600KB min，破坏零依赖与刚完成的页面减负 | 否决 |
| 手写 WebGL 低多边形 | 数百行 shader/矩阵代码，维护面大 | 缓议 |
| 2.5D 精灵深度层 | CSS preserve-3d + 分层视差 + 待机呼吸，复用现有像素精灵 | Phase 0 采用 |

## Phase 0（半天级）：2.5D 活感

- 目标容器：`study-companion.js` 已挂载的课程页伴侣元素
- 行为：滚动速度 → 倾斜角；光标 → 三片分层视差（前景/身体/背景）；
  判分事件 `dsh-study-delight`（companion L163 已监听）→ 弹跳一次
- 约束：`prefers-reduced-motion` 静默；移动端只保留倾斜不跟光标
- 验收：Playwright 断言 transform 随滚动变化；reduced-motion 下零位移

## Phase 1（缓议）：真 3D

仅当 Phase 0 被认可「还不够」时启动：手写 mini-WebGL（球+锥组合的低多边形头，
<300 行），单 canvas 固定角落，页面卸载即释放。不引外部库。
