# Agent Note：包依赖场景的惯性滑行与离屏挂起

Status: implemented

[English](2026-08-23-scene-inertia-and-visibility.md) | [中文](2026-08-23-scene-inertia-and-visibility.zh.md)

## Problem

2D canvas 伪三维的包依赖场景在松手的瞬间急停，而且用户把舞台滚出视口后，自动旋转仍在烧 requestAnimationFrame。一线 canvas 交互（tldraw、excalidraw）把释放动量当标配，尊重电池的渲染循环在没人看时暂停。

## Decision

`createPackageScene` 新增 `fling(vYaw, vPitch)` / `stopInertia()`：取最后一次指针位移作为出手速度，每帧按 `0.9^(dt/16.7)` 衰减，低于 1e-4 停止。canvas 上挂 IntersectionObserver：场景离开视口就挂起自转与惯性，回到视口恢复自转（惯性不恢复——手势早已结束）。惯性会被聚焦飞行、显式开始自转、新的 pointerdown 和 dispose 取消；reduced-motion 与离屏状态下不启动。

## Alternatives considered

**换 three.js 拿真深度缓冲。** 否决：CSP `script-src 'self'` 加上让每个实验保持离线优先的体积纪律；227 根柱子在画家算法下看不出分层错误。

**回到视口时连惯性一起恢复。** 否决：滑行越过滚动边界还继续，读起来像 bug 而不是连续感。

## Consequences

松手后的滑行与参照级 canvas 交互一致；滚出视口的自转场景零帧开销。控制器 API 多两个方法；观察器在 dispose 里断开，拆卸仍然完整。

## Testing

- scene3d 契约、package-graph 模型/冒烟与 kit 套件：26/26 绿；两份改动文件过 `node --check`。
- 完整构建对账 119 页、解析 16,145 条链接。
