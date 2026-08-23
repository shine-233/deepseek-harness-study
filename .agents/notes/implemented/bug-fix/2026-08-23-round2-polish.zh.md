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

## 改动

- study-progress.js：观察器改为比对归一化课程 id，内容没变就不重建；只有真实路由变化才拆掉重建。
- guard-loop-lab.js：圆点带 `data-step` 并随播放头联动；SCHEMA 与 persist 收入 `step`；枚举变更后重建并跳到末步（与 approval-flow 对齐）。
- sqlite-row-model.js：非首值 varint 上限改为 `MAX_SAFE_INTEGER * 2n`；结尾补零组按非规范拒绝（中间全零组仍然合法）；措辞不再暗示编码器会排序。
- subagent-delegate-model.js：顶注与 canProve 改正能力错误的归属层；删恒真式；MONOTONE_HEADER 改为核对手工期望值。
- guard-loop-model.js：详细提醒文案恢复为上游完整句子。
- JournalHome.vue：Turn 活动步的深色覆写；reading.css：`html.dark` 下 mermaid 反相。
- session-log：恢复默认同时复位 SQLite 开关并重渲染面板；打包/纯文本行首格有区分样式；schema 徽章注明是 aa6c361a 值。
- study-companion.js：完成台词改回与真实行为一致；注释对齐实际路由行为。
- verify-built-study-site：REQUIRED_PUBLISHED_ASSETS 钉住四个运行时脚本，丢了会在 CI 报错。

## 证据边界

study-tools 全量 node --test（388 通过）、改动脚本的 node --check、含中间全零组与结尾补零案例的编解码往返探针、推送前本地完整 `pnpm run website:build` 门禁链全绿。没有运行真实 DSH、provider 或模型；深色对比度由选择器推算而非截图实测。

## 环境备注

上一轮的全机 ESM 段错误（0xC0000005）在本轮开始前自行恢复；本次 pre-commit 钩子正常执行。
