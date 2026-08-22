# Agent Note: 实验页交互升级、桥接流转图、文案去味与共享层去重

Status: implemented

[English](2026-08-22-lab-interaction-upgrade-bridge-flow-copy-deslop.md) | 中文

## Problem

一次基于可用性规范的审计（frontend-design-audit、Vercel Web Interface Guidelines、anti-ui-slop、moonshine 编辑准则）发现四个缺口：

1. **一个已上线的回归**：`package-graph-lab.js` 调用了 `installDeclaredIcons()` 却没有 import，模块在浏览器里求值即抛错——该页的主题切换和预测门控从未安装成功。
2. **依赖表不是数据工具**：227 行固定顺序、原生 `<title>` 提示（延迟约一秒、触屏不可用）、不能排序、图表与表格互不联动；筛选变化让点瞬移，没有任何位置连续性。
3. **一个 AI 写作标记**：否定转折句式（「不是 X，而是 Y」）在学习课程里出现 24 次；moonshine 的编辑标准只允许在纠正真实错误前提时使用。
4. **重复与沉默页**：三个早期实验页各自复制了 shell 工具与样式，research-debug-bridge 仍是唯一零图形的实验页。

## Decision

1. **文案去味**：把 11 篇课程和索引生成器源码（`generate-source-index.mjs`，生成的卡片手工同步）里的 15 处否定转折改写为直陈；保留 9 处真正纠正读者可能持有的误解的用法。
2. **package-graph 以键控标记重写**：圆点/柱按包 id 跨渲染复用，位置之间做 200ms 补间（时长读 `--dur-enter` token；reduced-motion 直接落位）。新增可排序表头（`aria-sort` 三态循环，npm 名为空恒排末尾）、跨视图悬停联动（散点 ↔ 柱 ↔ 表格行，滚动只在容器内居中）、由 `data-tip` 驱动的指针跟随提示（移除原生 title），以及滚轮缩放/拖拽平移加键盘与触屏按钮等价物。每次重建都回到全貌，因为筛选会改变两轴范围。
3. **修复缺失 import**，同时把该页迁到共享 kit；样式表改为链接 `study-lab-shell.css`，删掉 60 个逐字节重复的块。
4. **桥接生命周期图**：工作台上方一条静态 SVG 流程带（request.json → 脱敏 repro → result.json → 四种结果状态）；当前阶段高亮跟随 request 生成。含文字替代；零动画；不新增存储或网络面。
5. **题库扩到完整主链路**：新增第 03/04/05 课（各三道引用出处的题目，锚点由 slug 匹配测试对照真实标题校验）。
6. **进度模式 v2**：`labs` 表通过预测门控提交记录七个模型实验（做过实验即完成证据），存储键为 `dsh-study-progress-v2`；解析时迁移 v1 数据，导出导入继续可用。
7. **jsdom 冒烟覆盖**：新测试用真实 fixture 启动真实页面——fetch 失败文案、oracle 徽标、行数、排序点击、联动高亮、缩放按钮、按组筛选后的柱视图。
8. **审计修复**：fixture 加载中的反馈文案、按钮方位文案纠正（下方，而非右侧）、排序按钮 hover 态、拖拽平移时 `user-select: none`、滚动容器 `overscroll-behavior-x: contain`、按钮 `touch-action: manipulation`（shell 与 bridge 两处）。

## Alternatives considered

- 把缩放和表格排序写进 `#state=` hash：拒绝——状态契约承载实验输入；坐标轴重标后旧缩放窗口指向误导性区域，排序是阅读辅助而非输入。
- 用 CSS transition 过渡 `cx`/`cy`/`r`：拒绝——会与 hover 过渡及属性写入叠成二次缓动；rAF 补间可中断且集中处理 reduced-motion。
- bridge/code-mode 的 CSS 全面并入 shell：延后——bridge 有意保留一处行为差异（空值安全的 `writeText`，已在文件内注明）；没有浏览器走查就整批改类名是用真实风险换外观。
- 题库只随新课被动增长：接受并加护栏——quiz 测试钉住课程清单，静默漂移会大声失败。

## Consequences

- package-graph 的预测门控和主题切换自 kit 重构以来首次在线上正常工作。
- 新增维护面：`TABLE_COLUMNS` 必须跟随模型字段；冒烟测试依赖 jsdom（已是 devDependency）。
- 进度存储迁到 `dsh-study-progress-v2`；旧的 v1 导出文件仍可导入（迁移有测试覆盖）。
- 课程文案的否定转折收敛到至多 9 处，每处都对应一个明说的误解。
- 首页指标变为 237 + 8；验证器强制同步（该数值与本树上并行进行的工作存在竞争）。

## Verification

`node --test study-tools/*.test.mjs` 263/263；`verify-study-home-metrics`、`verify-lab-contrast`（78 组配色）、`verify-study-links`（0 路径错误）全绿；清掉供出过期投影指标的 VitePress 陈旧缓存后 `study:quick-check --site` 通过。

## Boundaries

真实浏览器走查（焦点顺序、窄屏溢出、滚轮缩放手感、读屏播报）仍是第 33 课声明的未知项；本次改动略微扩大了它的面，应搭下一次 QA 一并处理。
