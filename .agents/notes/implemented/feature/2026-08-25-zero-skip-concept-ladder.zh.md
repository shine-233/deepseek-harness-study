# Agent Note: 零跳步概念阶梯原语与瀑布旗舰实验室

Status: implemented

[English](2026-08-25-zero-skip-concept-ladder.md) | 中文

## Problem

对照 Bartosz Ciechanowski 的交互式长文做了一次诚实的差距分析，结论是：本学习站的实验室是优秀的单点交互，但作为概念序列偏弱——读者从预测门直接跳到完整时间线，中间的概念步骤全靠散文自己补。差距在教学序列设计，而不是代码架构；一次性重写全部约 50 个现有实验室，等于把每个能用的页面押上风险去换一个最后才被修的内容问题。

## Decision

[website/public/study-lab-ladder.js](../../../../website/public/study-lab-ladder.js) 提供可复用的零跳步概念阶梯（`createConceptLadder`）：每级台阶只讲一个概念、配一个可交互的微模拟、散文不超过四句；读者完成当前级的必要交互（`api.engage()`）之前下一级保持折叠，「展开全部台阶」保留检索型读者的逃逸门而不让它成为默认路径。台阶进度按标签页存 sessionStorage；模拟通过 `api.everyFrame` 拿到离屏即暂停的逐帧回调，并遵循 reduced-motion 信号。

[waterfall-ladder-lab.html](../../../../website/public/waterfall-ladder-lab.html) 是第一个建在这个原语上的实验室，用五级台阶讲清 Cordis 瀑布语义：派发 → 注册顺序 → `next()` 传值 → 短路 → 谁可以短路。纯函数模型（[waterfall-ladder-model.js](../../../../website/public/waterfall-ladder-model.js)）对照 [vendor/cordis/src/events.ts](../../../../vendor/cordis/src/events.ts) 与 [docs/cordis-primer.md](../../../../docs/cordis-primer.md) 的 waterfall 一节；`evaluateWaterfall` 从每条轨迹独立重算四条教学结论，不依赖动画。站点级预测门契约继续生效：读者在第一级解锁前先对短路结局下注。

迁移决定落地后补了第二个共享引擎：[study-lab-trace-ladder.js](../../../../website/public/study-lab-trace-ladder.js) 把任意模型的泳道步骤（`{lane, phase, detail}`）画成扫掠播放头时间线，实验室只需把自己的场景映射成每级一条轨迹即可接入，不必手写 canvas 场景。已迁移：turn-flow（5 级）、plugin-flow（4）、session-log（4）、llm-stream（2）、compaction（3）、storage-hub（4）、worker-protocol（3）、code-run（3）、typert（3）、approval-flow（3）、guard-loop（3）、jobs（3）、orchestration（3）、invariant（3）、tool-visibility（3）、session-fork（3）、subagent-delegate（3）；其余实验室在被触碰时按同一配方跟进，`study-tools/study-lab-trace-ladder.test.mjs` 把「散文不超过四句」变成了机械可查的规则，并保持已迁移名单注释最新。

第二批接入 11 个实验室：preset、checkpoint、identity、time、attachment、feedback、credential、settings、plan-stack、tool-budget、acp-lab。其中六个小缝页改在生成器层接入：[gen-small-seams.mjs](../../../../study-tools/gen-small-seams.mjs) 按 `config.ladder` 在 HTML 外壳里展开挂载点，[small-seams-runtime.js](../../../../website/public/small-seams-runtime.js) 挂载 `replayRungs(config.ladder.rungs)`；没有步骤时间线的模型（plan-stack、tool-budget）配了显式枚举层，把每次推演的判定顺序收窄成轨迹步骤，说明文字全部逐字引用模型字段。`createConceptLadder` 现在按页懒注入共享样式表，此前十七个页面不改动 HTML 也能渲染出带样式的台阶。

登记点全部同步：`study-labs.html` 名单卡、`study-labs.js` TRACKED_LAB_IDS、`study-progress-core.js` LAB_PAGE_IDS、`public/llms.txt`、无 JS 时的静态计数（55 个实验）。

## Alternatives considered

- **一次性把所有现有实验室改造成阶梯**——作为大爆炸式重写被否决；轨迹重放引擎落地后改为持续批次迁移（首日接入五个实验室），单次改动小、可验证。
- **硬锁进度、不留逃逸门**——否决：零跳的是概念步骤，不是把需要查阅的读者关在门外。
- **去掉预测门，理由是阶梯本身已经在序列化教学**——否决：该契约是全仓库统一且有测试钉住的；在第一级之前先对一个结论下注是「第零个概念」，不是摩擦。

## Consequences

- 新的概念驱动实验室应直接构建在 `createConceptLadder` 上，不要各自手写台阶门控。
- 原语刻意不接管 canvas 渲染；每个模拟自绘场景，各级视觉可以差异很大。
