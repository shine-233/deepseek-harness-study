# Agent Note: 学习站加固——首页深色、索引图例、client 拆页、scrollytelling

Status: implemented

[English](2026-08-23-study-site-hardening.md) | 中文

## 问题

对学习网站的又一轮审计发现了首轮加固没有覆盖的缺口：

1. 手账首页只有一套硬编码浅色版式，VitePress 深色主题下站点门面直接断裂。
2. 生成的逐文件索引页把四句免责说明在每个条目里重复一遍（4 × 2,973 处），生成器和 `verify-source-index.mjs` 的口径也没有描述条目已经在输出的第 12 个可选字段「测试支持」。
3. `packages-client.md` 单页 3.4MB（923 张卡），加载慢、滚动难，移动端基本不可用。
4. scrollytelling 只有第 04 课在用；五个实验（hook-flow、approval-flow、session-fork、subagent-delegate、guard-loop）的模型明明是确定性步骤表却没有步进控件；subagent-delegate 页面还有重复的 `depth` 元素键，每次重建都抛 RangeError。
5. 第 02 课引用的依赖数字（218 / 8989 / 32）和自己页面的数据文件（226 / 9032 / 37）互相打架；第 00 课推荐表三处阶段编号与链接文件不符；第 03 课列了一个固定提交里不存在的测试文件；第 33 课还写着「固定 rc.6 源码」；测验得分句承诺了代码做不到的重新判分；实验总览把上下移排序叫成拖拽；集章卡两条链接指向同一路由。

## 决定

- 首页：新增 `html.dark` 覆写块，把手账调色板映射到夜读纸色（只动颜色不动布局）；吉祥物 SVG 可键盘操作（`role="button"`，Enter/Space）；集章卡 l00/l01 指向真实课程路由；「108 中文学习页面」拍立得改为跟随当前事实。
- 索引页：新增 `study-tools/migrate-index-legend.mjs`，把四句逐条目免责提升为每页一个图例区（减少 11,892 行重复）；`generate-source-index.mjs` 直接输出图例版式；`verify-source-index.mjs` / `audit-source-index-quality.mjs` 双版本通吃；`verify-study-links.mjs` 补上 `LessonWidget fallback-href` 锚点校验（原盲区）。
- client 拆页：新增 `study-tools/split-packages-client.mjs`，单体改为总览目录加十一个按体量切分的分页（每页约 ≤400KB，923/923 条逐字保留）；README 导航表逐页列出真实条数；全部页数口径同步为 78 页索引 / 119 页教材（README、README.zh、HANDOFF、第 08/12/16/20 课、文件索引 README）。
- 实验：hook-flow、approval-flow、session-fork、subagent-delegate、guard-loop 增加步进器（滑杆＋上一步下一步＋取自模型数据的步骤说明，←/→/Home/End 键盘可用，URL hash 持久化，泳道/表格行同步高亮，只用既有 token）；修复 subagent-delegate 重复的 `depth` 键。
- scrollytelling：`study-scrolly.js` 改为场景注册表驱动；新增 `study-scrolly-beats.js`，含六拍 session-log 场景（落日志→投影→前缀重放→必需未知→fork 继承→interrupted 记 unknown）和四拍 compaction 场景（压缩前→替换→保留/丢弃→oracle 核对），数字全部从现有确定性模型插值；拍子是按钮、尊重 reduced-motion、无 JS 时正文自足。
- 文案与事实：测验得分句不再承诺重判；总览标签改名上下移排序；第 02 课数字对齐 package-graph.json；第 00 课阶段编号对齐链接；第 03 课删掉不存在的 agent-loop 测试路径；第 33 课改述固定基线而不是 rc.6。

## 后果

- 换基线从此和两个脚本耦合：重建索引后必须重跑 `split-packages-client.mjs`，再同步各处的 78/119 计数（见再生成提示）。
- `verify-study-links.mjs` 会校验组件回退锚点：课程组件指向不存在的锚点将直接挂门禁，而不是静默降级。
- 步进器交付时只有手工点验；`study-tools/lab-stepper-smoke.test.mjs` 后来补上了这个缺口，在 jsdom 里重放五个实验室的全部输入组合，并断言滑杆上界与纯模型一致。

## 考虑过的替代方案

- 保留逐条目免责但缩短句子——否决：缩短后同样的句子仍要重复数千次，不如提升为每页一个图例。
- 把 `packages-client.md` 按等量拆分——否决：等量拆分在最密的区段仍可能超出可用的单页体积，按体量切分更稳。
- 给 client 卡片上虚拟滚动运行时——搁置：静态分页保住了无 JS 阅读路径，不为一个目录页引入运行时依赖。

## 证据边界

全部是静态证据：study-tools 测试套件的 node --test、四个校验器、改动脚本的 `node --check`。步进器没有留下 jsdom 冒烟测试——当时是手工在浏览器里逐页点验的，后续若改动 stepper 接线应补一个可重放的冒烟。没有运行真实 DSH、provider 或模型；首页数字对账（`verify-study-home-metrics`）把可见数字钉在仓库事实上。

## 再生成提示

换基线重跑 `generate-source-index.mjs` 会原生得到图例版式，但 packages/client 会重新变回单体——之后需重跑 `split-packages-client.mjs`，并把各处 78/119 的计数一并更新。
