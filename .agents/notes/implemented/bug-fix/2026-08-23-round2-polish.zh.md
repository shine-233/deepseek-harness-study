# Agent Note：第二轮打磨——步进器对齐、varint 忠实性、深色补漏

Status: implemented

[English](2026-08-23-round2-polish.md) | 中文

## 问题

对重写后的实验室与吉祥物伴侣的第二轮审计发现：

1. `study-progress.js` 的 MutationObserver 自持循环：任何 DOM 变动（包括组件自己的插入和每次判分提交）都会触发拆掉重建，课程页在第一次交互后永久劣化（jsdom 实测 5 秒内自测题复制 38 份）。
2. guard-loop 步进器缺件：泳道圆点没有 `data-step`、步进位置不写 URL hash、切换枚举后不把播放头拉回末步——五个步进实验里唯一缺这三样的。
3. 两处模型声明跑在代码前面：sqlite-row 的 decode 拒绝合法的大 zigzag 值（上限写成 2^52，应为 2^54），又漏了非规范 varint 拒绝，却自称「逐字节移植」；subagent-delegate 把 `UNSUPPORTED_CAPABILITY` 安到 tool 插件挂载期，实际它属于 service 层 `start()` 的逐请求拒绝。一处 oracle 是恒真式（`every(step => true)`），另一处拿函数自己等于自己的公式。
4. 深色缺口：手账 Turn 活动步几乎不可读（#1d4477 压在 #2e4059 上，约 1.07:1）——`.dj-on i` 特异性压过深色覆写块；mermaid 图不随外观切主题。
5. 文案与事实：吉祥物的完成台词承诺了不存在的首页集章联动；第 05 课说「前三拍」与组件同源，实际是四拍；session-log 的恢复默认值漏了 SQLite 两个开关；打包行没有任何视觉状态；schema 徽章没说明那是基线钉定值。

## 决定

- study-progress.js：观察器改为比对归一化课程 id，内容没变就不重建；只有真实路由变化才拆掉重建。
- guard-loop-lab.js：圆点带 `data-step` 并随播放头联动；SCHEMA 与 persist 收入 `step`；枚举变更后重建并跳到末步（与 approval-flow 对齐）。
- sqlite-row-model.js：非首值 varint 上限改为 `MAX_SAFE_INTEGER * 2n`；结尾补零组按非规范拒绝（中间全零组仍然合法）；措辞不再暗示编码器会排序。
- subagent-delegate-model.js：顶注与 canProve 改正能力错误的归属层；删恒真式；MONOTONE_HEADER 改为核对手工期望值。
- guard-loop-model.js：详细提醒文案恢复为上游完整句子。
- JournalHome.vue：Turn 活动步的深色覆写；reading.css：`html.dark` 下 mermaid 反相。
- session-log：恢复默认同时复位 SQLite 开关并重渲染面板；打包/纯文本行首格有区分样式；schema 徽章注明是 aa6c361a 值。
- study-companion.js：完成台词改回与真实行为一致；注释对齐实际路由行为。
- verify-built-study-site：REQUIRED_PUBLISHED_ASSETS 钉住四个运行时脚本，丢了会在 CI 报错。

## 后果

- 四个被钉住的运行时脚本从此是发布必需品：删掉任何一个都会让 CI 变红，而不是悄悄劣化实验室。
- varint 解码变严了：旧模型接受的结尾补零字节现在会被拒绝，携带这种字段的夹具或状态链接需要重新生成。
- 进度重建只在归一化课程 id 变化时触发。同课内的变动（判分提交、伴侣插入）不再重建——按设计，未来保持 id 不变的路由变化也不会触发重建。
- 深色 mermaid 反相作用于 `html.dark` 下渲染的每一张图，包括以后新加的图。

## 考虑过的替代方案

- 把另外四个实验室的步进器拆掉来换取对齐——否决：对齐方向应当向上。
- 保留 2^52 上限、只把「逐字节移植」的措辞软化——否决：这次移植的目的就是对齐上游解码行为。
- 给进度重建加节流计时器——否决：比对课程 id 把无效功彻底去掉，而不是推迟它。

## 证据边界

study-tools 全量 node --test（388 通过）、改动脚本的 node --check、含中间全零组与结尾补零案例的编解码往返探针、推送前本地完整 `pnpm run website:build` 门禁链全绿。没有运行真实 DSH、provider 或模型；深色对比度由选择器推算而非截图实测。

## 环境备注

上一轮的全机 ESM 段错误（0xC0000005）在本轮开始前自行恢复；本次 pre-commit 钩子正常执行。

## Decision

- 进度观察器以归一化课程 id 为重建开关：id 没变且组件还在就什么都不做，判分提交和组件自身插入不再触发拆建循环。
- guard-loop 整套照搬 approval-flow 的步进器契约（data-step 圆点、hash schema 收入 step、换枚举先重建再跳到末步），不再发明第三种变体。
- sqlite-row 维持忠实移植口径：非首值 varint 上限改为 MAX_SAFE_INTEGER * 2n，只把结尾补零组按非规范拒绝；中间全零组保持合法，大跳差分本就会产生它们。
- subagent 的能力错误措辞按层拆开（service 层 start() 逐请求拒绝 vs tool 插件挂载期普通 Error），顶注与 canProve 同步；MONOTONE_HEADER 改查手工期望值，不再拿被测函数自证。
- 深色修复只动 CSS：Turn 活动步一条更高特异性的覆写，mermaid 在 html.dark 下反相一次，不引入客户端主题切换机制。
- 吉祥物完成台词改写为与真实行为一致；进度存储与首页集章卡的打通推迟，而不是假装已联通。

## Alternatives considered

- 加大观察器防抖或只盯 .vp-doc：否——任何无条件重建仍会在会话中途丢答题状态，身份比对才是正确的闸门。
- 把 sqlite 注释降级成「教学近似」而不修 decode：否——两行的修复能让更强的声明为真。
- 用插件配置实现 mermaid 主题切换：否——vitepress-plugin-mermaid 只收一份静态 MermaidConfig，随外观切换需要客户端重渲染包装；CSS 反相对唯一一张仓库地图图是近零风险解。
- 打通 dsh-study-progress-v2 与 am-stamps-home 让吉祥物台词成真：推迟——跨键迁移涉及用户数据语义，值得独立一个变更来做。
