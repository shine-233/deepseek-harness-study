# Agent Note：08 课索引卡片字段注解器与组件动画层

Status: implemented

[English](2026-08-25-lesson-08-indexcard-and-motion-layer.md) | 中文

## Problem

08 课用十二条列表项讲授索引卡片的十二个字段；这些字段是全部七十九个索引页的阅读契约，但初读者想把字段名和定义对应起来，只能反复通读整张清单。另外，此前五个课程组件的详情卡是瞬时切换——功能完整但视觉生硬，而实验室页面已经有自己的动效语言（spring unlock、magnetic pull）。

## Decision

- `study-indexcard.js` 沿用既定组件契约：十二个字段按钮（必填标「必填」、可选标「可选」），详情卡逐字引用课程定义，纯渲染函数在 Node 里测试（`study-indexcard.test.mjs`，5 条——含「恰好十一个必填」的计数断言），DOM 收浏览器守卫，SPA 路由观察者跟随。
- 六个组件现在共享一个动画层：每次 `paint()` 把详情内容包进新的 `.dsh-swap-in` 元素，180ms 淡入上浮关键帧随每次选择变化重新播放；`prefers-reduced-motion` 下每个组件同时停用过渡与动画。新元素方案无需「移除类再强制回流」的技巧即可重触发 CSS 动画，旧节点整体丢弃，切换后不残留过期标记。

## Alternatives considered

**在 paint() 里用 Web Animations API 做动画。** 否决：它需要在 JavaScript 里显式处理 reduced-motion 分支；纯 CSS 关键帧免费继承媒体查询守卫。

**抽一个所有组件共享的动效样式表。** 否决：组件按契约自注入样式，且必须保持 Node 测试中可独立运行；每个模块重复四行 CSS 是更便宜的耦合。

**把切换动画放在整个详情卡而不是内层包装上。** 否决：给持久的 `<dl>` 加动画会让无关重渲染也重播动画，transform 期间还会挤压布局。

## Consequences

08 课现在有了管辖整个文件索引家族的字段清单交互模型，六个组件的选择反馈保持一致。动效预算刻意保持很小：一条 180ms 的 opacity/transform 关键帧，不动画布局属性，不做逐 chip 动画。已构建站点实测：十二个字段渲染、第七个字段显示逐字的「对应测试」定义与必填徽标、两个被测组件的计算动画均为 `dsh-fade-rise`、08 课移动端横向溢出 0px、六个组件测试文件全过。
