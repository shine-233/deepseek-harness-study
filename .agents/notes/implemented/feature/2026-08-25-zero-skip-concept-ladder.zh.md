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

第三批接入 19 个实验室：client、provider、mcp、selfmod、subprocess、lsp、wire、shell-seam、trajectory、skill-catalog、context、query、sandbox、workspace、host-gateway、spill、fs-edit、code-mode-evidence、tokenmeter。多面板页面（client、provider）把每个面板的状态序列映射成轨迹；shell-seam 以规格条目的 `source` 标签为相位逐键重放；code-mode-evidence 直接把本页导出的 `simulateCodeMode` 事件流交给引擎；fs-edit 逐字引用管线阶段与匹配数结局。

最后一批接入从未进过队列的 9 个：workflow-node、web-tool、terminal、session-projection、prompt-assembly、profile-loader、package-graph、hook-flow、goal-loop——57 个离线实验室至此全部完成。非时间线模型同样给了诚实的枚举：prompt-assembly 逐段列出字节数与来源；package-graph 从静态 fixture（以 JSON 模块导入，取代页面运行时的 fetch）按 `dependedOnBy` 排枢纽、按分组数规模；workflow-node 重放 run 的事件记录；goal-loop 逐帧照抄 tick 序列。terminal 只有两级台阶——脚本只有两个，凑数就是编造。名单收口后，新实验室按同一配方接入并同步名单。

覆盖完成后的交互审计发现轨迹图是被动观看——重放只能等，离这套图所对标的 Ciechanowski 标准（每张图都可操纵）差得远。引擎现在把图形当作控制器：横向拖拽直接驱动播放头（拖拽中自动重放让位），点击任一步圆点跳到该步，图形聚焦后 ←/→/Home/End 逐步步进，×1/×2/×4 变速让长轨迹可用（compaction 的 48 步在 ×4 下约五秒放完）。图形带滑杆语义（`role="slider"` 与实时 `aria-valuenow`），屏幕阅读器与明眼读者读到同一个步数。所有操纵都计入「真实交互」解锁契约；一处共享引擎改动同时抬升了全部轨迹页。

登记点全部同步：`study-labs.html` 名单卡、`study-labs.js` TRACKED_LAB_IDS、`study-progress-core.js` LAB_PAGE_IDS、`public/llms.txt`、无 JS 时的静态计数（55 个实验）。

## Alternatives considered

- **一次性把所有现有实验室改造成阶梯**——作为大爆炸式重写被否决；轨迹重放引擎落地后改为持续批次迁移（首日接入五个实验室），单次改动小、可验证。
- **硬锁进度、不留逃逸门**——否决：零跳的是概念步骤，不是把需要查阅的读者关在门外。
- **去掉预测门，理由是阶梯本身已经在序列化教学**——否决：该契约是全仓库统一且有测试钉住的；在第一级之前先对一个结论下注是「第零个概念」，不是摩擦。

## Consequences

- 新的概念驱动实验室应直接构建在 `createConceptLadder` 上，不要各自手写台阶门控。
- 原语刻意不接管 canvas 渲染；每个模拟自绘场景，各级视觉可以差异很大。
