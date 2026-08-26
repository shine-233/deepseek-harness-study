# Agent Note：阿溟 2.5D 深度层

Status: implemented

[English](2026-08-26-aming-companion-depth.md) | 中文

## 问题

课程页伴侣吉祥物是一张平面精灵。原方案假设站点能经 `study-lab-scene3d.js` 复用 vendored three.js 渲染器；勘探推翻了这一假设——`study-lab-scene3d.js` 零外部 import，全仓不存在 three.js。

## 决策

伴侣在 [study-companion.js](../../../website/public/study-companion.js) 内以纯 CSS transform 实现 2.5D 精灵深度层：

- 三片 `preserve-3d` 层包裹精灵：模糊减淡的背景晕影（`translateZ(-22px)`）、z=0 的身体、置前的眼神高光（`translateZ(20px)`）。
- 滚动速度驱动倾斜角（`rotateX` 至 ±14°，附轻微 `rotateZ` 摆动），停止滚动后缓回正。
- 光标位置经两个 CSS 变量（`--nx`/`--ny`）驱动分层视差；层间倍率写在样式表里。仅精细指针设备生效——触屏设备保留倾斜、不跟光标。
- 判分满分或标记已读时场景弹跳一次（用独立的 `scale` 属性，与倾斜 transform 叠加而非互相覆盖）。
- `prefers-reduced-motion: reduce` 下不安装任何监听器，样式表把全部深度位移归零，页面完全静止。

`study-pet-plugins.js` 换帧的方式是抓按钮里第一个 `svg` 并 `replaceChildren`。契约保持不变：身体层 svg 固定为 DOM 首个 svg，换帧经 MutationObserver 镜像到两个副本层——背景层克隆全部矩形，前景层只留白色眼神高光小格。pet-plugins 本身零改动。

## Alternatives considered

**自托管 three.js。** 否决：约 600KB min，破坏零依赖立场与刚完成的 preload 减负；三层深度效果不需要场景图。

**手写 mini-WebGL 头像（Phase 1）。** 缓议而非否决：不到 300 行的低多边形渲染器固定角落 canvas 仍是升级路径；但它的 shader/矩阵维护成本是 Phase 0 不必付的。

**拆成三个独立 svg 并让 pet-plugins 逐个换帧。** 否决：这会扩宽 pet-plugins 的契约，让它的帧构建器承担分层过滤职责（前景层只能装眼神高光）。镜像逻辑收在伴侣模块内，分层语义由定义它的一方持有。

## 后果

零新增依赖，页面重量不变；全部行为收敛在 `study-companion.js` 一个文件。

换帧契约从「单 svg」扩为「身体层 svg 加两个镜像副本」——这是伴侣模块内部自有的耦合。今后任何重建伴侣精灵的代码必须走身体层（或同步更新 `syncDepthCopies`），否则副本会漂移。

## 测试

Playwright 验收（`dsh-depth-check.mjs`，13 断言全绿）：分层挂载顺序、初始镜像计数、滚动倾斜生效并回落恒等、视差偏移与变量比例精确一致、弹跳类一次性生命周期、pet-plugins 在挂载状态下换帧后重镜像一致、reduced-motion 下滚动/光标/事件三重刺激后计算位移仍为零、粗指针上下文只倾斜不跟光标。既有冒烟 9/9 通过，`study-companion.test.mjs` 3/3 通过。
