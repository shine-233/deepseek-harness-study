# Agent Note：实验页全站动效总闸

Status: implemented

[English](2026-08-23-global-motion-pause.md) | [中文](2026-08-23-global-motion-pause.zh.md)

## Problem

每个离线实验室都尊重 `prefers-reduced-motion`，但读者的"想静下来"未必落在操作系统那两三档偏好里——省电、要截一张中间状态的图、对动态的敏感度介于系统档位之间——他们没有任何开关可拉。ciechanow.ski 在每篇文章下都放一句"你可以全局暂停"；而我们的十六个以上独立实验室页面各自跑着氛围循环（呼吸环、图章转盘、数据包流、状态脉冲），却没有一个总闸。

## Decision

每个实验室页面的 `hero-actions` 里放一个 `#motion-toggle` 按钮（17 页）。kit 自举它：模块加载时运行 `installMotionPauseToggle()`，逐页接线代码为零。打开时：

- 把 `data-motion="paused"` 写到文档根元素；`study-tokens.css` 里的 CSS 块冻结所有关键帧动画（`animation-play-state: paused`）并让过渡即时完成（`transition-duration: 0s`）——状态直接落到终值，没有停在半路的淡入；
- 调用所有已注册的连播停机回调，正在播放的步进器停下来，而不是在静止的页面里隐形地走帧；
- 偏好写进 `localStorage['dsh-lab-motion']`，像 ciechanow 的站点记忆一样跨全部实验室页面共享；
- 通过 `dsh-lab-motion` 事件广播变化，事件构造做了防御——部分测试 DOM shim 没有 `CustomEvent`。

总闸与 `prefers-reduced-motion` 相互独立：媒体查询是系统层立场，这个按钮是读者在单站之上的显式覆盖。

## Alternatives considered

**像 study-progress.js 那样经 VitePress 主题注入。** 否决：实验室是 VitePress 应用之外的独立 HTML 文档，主题注入根本够不到它们。kit 是每页都已加载的唯一脚本，也就成了唯一可行的注入点。

**只暂停 `animation-play-state`，放过过渡。** 否决：悬停和进场过渡照常动、关键帧却冻住——半静半动的页面读起来像坏了，而不是"静"。即时完成更贴近读者意图。

**在每个播放按钮旁放各自的开关。** 否决：读者要回应的诉求是"全部停下"；撒十七个小开关是把问题缩小重演一遍。

## Consequences

读者拿到了一个持久、跨页的静止开关，顺带管住播放定时器——这是交互式解释方法论里实验室此前缺的最后一块大交互。代价：一条只在 `[data-motion="paused"]` 时才参与匹配的通配选择器规则（运行态零开销）、启动时一次 `localStorage` 读取，以及 kit 多了一条自举职责——自举路径必须对残缺 DOM shim 保持防御，测试套件现在会演练这一点。

## Testing

- 全量 `node --test study-tools/*.test.mjs`：补上 stepper-smoke 对新派发路径的覆盖后 394 全过；第一版因缺 `CustomEvent` 挂了 11 个套件，直接催生了上面的防御性构造。
- `website:build` 保持绿色：119 页对账，16,145 条链接解析。
