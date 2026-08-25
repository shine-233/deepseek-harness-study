# Agent Note: Click-to-seek completion, inertia tuning, and a quiz content audit

Status: implemented

[English](2026-08-25-click-to-seek-completion.md) | Chinese

## Problem

poloclub 式「图形即控制器」的那次提交只给了五个实验室委托点击定位。把每个实验室的时间线构造（`renderTimeline|data-index|step.max`）都走一遍后，缺口有三类：列表时间线实验室的步骤带 `data-index` 却没有点击处理（jobs、worker-protocol、session-projection）；profile-loader 的舞台卡片悬停会高亮，回放头却纹丝不动；orchestration 干脆没有步进器——时间线无从「定位」，因为没有可定位的滑杆。3D 场景的惯性滑行把衰减系数（0.9）硬编码了两处，一处在 `fling`，另一处是可见性观察器里整段复制粘贴的 resume tick。另外，题库的格式测试只钉结构（3 个选项、答案下标在界内、`source` 锚点形状），从来没有验证过被钉住的答案是不是真的。

## Decision

**click-to-seek 现在覆盖全部 18 个构造时间线的实验室。** 列表时间线（jobs、worker-protocol、session-projection）套用 code-run 的同一套委托处理：监听器绑在常驻容器上，`closest('[data-index]')`，给滑杆赋值，派发 `input`。profile-loader 的舞台点击（以及回车/空格激活）直接驱动 `replay` 滑杆（前缀是 `replay`，不是页面名），因为卡片本就是 `role="button"` 的 SVG 组。orchestration 补了完整步进器——滑杆、上一步/下一步、带速度选择的播放、说明行、`bindRangeKeys`——标记与 jobs-lab 同构，再加同款时间线点击定位。按帧推进的 code-mode-evidence 把事件标记、相位矩阵格、并发图标记和事件表行全部当作定位控件：点任意 `[data-tick]`，播放头落到该 tick 当帧或其后第一帧。没有滑杆的泳道图（terminal、selfmod）改绑「圆点↔表格」：点圆点闪亮对应表格行（`metric-flash`）并滚动到可见；selfmod 的圆点补上 `data-step`，点击后把该步的泳道/相位/说明写进图下说明行。已有 `bindPlotScrub` 的六个 SVG 图实验室和已有处理器的五个只做回归确认，未改动。

**惯性衰减从常量变成参数。** `createPackageScene` 接受 `options.inertiaDecay`（每帧速度保留比例，0–1 开区间，默认 0.9），`fling` 与离屏恢复路径共用同一个 `runInertiaTick`，删掉了重复的 tick 函数体。package-graph 场景传 `inertiaDecay: 0.92`——致密双环配略长一点的滑行手感更好。停判阈值提为具名常量 `INERTIA_STOP`。

**题库 a–f 逐题对照固定上游树**（aa6c361a）**与其引用的课程原文做了内容审**：114 题，每题的答案与解释都对照源码行或课程文本核过。五处答案有错，已修：bank-c 的 17/q1、18/q3、19/q3 的答案下标指向被自己 `explain` 驳斥的干扰项；bank-f 32/q3 同病；bank-d 21/q3 断言仓库没有提交 `.devcontainer/` 配置——与实际提交的 `devcontainer.json`（Node 24 镜像、pnpm 11、frozen-lockfile 安装、转发 5173/4173 端口）正好相反——选项组按真实文件重写。另有一处解释措辞修正（bank-c 14/q1：字面量 matcher 的字符类含下划线）。其余 108 题通过，包括对 `tools/src/index.ts` 优先级注释、`matcher.ts` 正则行为、workflow/tool-ralph 顶注的抽查。

**无头巡检还揪出两个整页静默空白的 bug，随本次一并修复。** session-projection 依赖一个任何 HTML 里都不存在的 `#metric-changed`，`requireElements` 直接放弃，页面什么都不渲染；已删除这个死引用。profile-loader 把 `#profile-stage`——一个 `<svg>`——放进用 `instanceof HTMLElement` 校验的必查清单，整页静默空白；校验改为接受任意 `Element`。两处在线上都是坏的，只是从没人在它们上面点过一下。

## Alternatives considered

**给列表时间线点击定位做共享 kit 辅助函数。** 暂缓：处理器只有四行，各页持有自己的滑杆变量与事件细节；在出现第五个重复者之前，辅助函数省不下任何东西。SVG 图已经有共享的 `bindPlotScrub`，那才是承重的抽象。

**给 terminal/selfmod 也加步进器而不是圆点↔表格联动。** 否决：两页本来就同屏展示全部步骤并配了全文表格，滑杆等于给同一份数据造第二个真相。点到行保持单一真相，同时补上了图缺的定位能力。

**以「格式测试已存在」为由把题库继续冻结。** 否决：格式测试从不断言真值。114 题错 5 题（4.4%）正是结构测试看不见的失败模式；逐题带上游文件行号证据的审计记录才是可复核的产物。

**调手感直接改常数。** 否决：衰减是随场景密度变化的手感参数；把 0.92 硬编码回去只是换个地方放魔法数。

## Consequences

现在每个带时间线的实验室都能从图形定位：对构建产物跑无头验证，16 条交互断言全过（jobs/wp/sp/profile-loader/orchestration/code-mode-evidence 的点击定位、terminal 圆点→行闪亮、selfmod 圆点→说明行，外加 code-run 与 approval-flow 拖拽的回归）。95 页巡检（38 课 + 全部实验室 + 首页/总览/复习页）零控制台错误、零请求失败；仅有的告警是实验室同源 iframe 嵌入触发的 Chromium 沙箱提示，属有意为之。AI 味审计读数为每千汉字 1.26 加权命中（此前 1.30）；唯一真实的簇——study/37 里连用七个破折号——收敛到一处成对用法，同课一处掉字病句顺手修复。study/24 与 33 被标记的引号重复是界面文案（「模块入口」「重建实验」「全部放行」）的准确引用，保留；study/08 与 11 的单处对比句承载真实信息，不动。已知边界：约 8 组 client 渲染与基础设施包仍按 2026-08-25-infra-seam-labs 记录的边界保持读码课；题库答案维持审计冻结，日后改动应重跑同样的逐题上游比对，而不是信格式门禁。
