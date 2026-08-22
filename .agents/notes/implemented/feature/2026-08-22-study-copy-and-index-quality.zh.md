# Agent Note: 教材文案修复与索引页分组

Status: implemented

[English](2026-08-22-study-copy-and-index-quality.md) | 中文

## 问题

对已发布的 108 个学习页面做全量核查后，发现几类现有门禁抓不到的缺陷：

- 中英 README 都写「八个可以动手的实验」，而 `website/public/` 实际有十个实验页；`study-labs.html`、`START-HERE.md` 和 `SITE-HOME.md` 早已写的是十个。
- 第 21、22 课残留创作会话口吻：22 课用「你的原话…需要稍微改准」面向一个未具名的对话者；21 课的「本学习会话没有点击创建」指代一次读者不可能知道的调研会话。
- 第 09 课积累了三个追加式核验小标题（本轮联网核对 / 本次刷新核对 / 本次直接核验），同一张表里 linux-insides 以两种写法收录了两次。
- 第 13 课推荐阅读顺序是七行连续的「再读」链接，其中还有一句没有动词的孤链残句 `[schema](…)。`
- 五个实验室页脚写成「独立 独立校验」——一次机械词替换把「独立 oracle 校验」中的 oracle 替换后叠词了。
- 七处面向读者的话术使用「闭环」，换成平实说法不损失信息。
- 自动索引把 `packages/attachment/attachment-local/src/request-image.ts` 标成「智能体运行时」，只因文件名含 `request`；该文件自己的顶部注释写的是 "Deterministic cached image versions for model requests."
- 测试条目的 concept 回退成路径回声时，用途字段出现自指：「检查 `tests/x.spec.ts` 的具体场景」——被审对象就是审计者自己。
- 大索引页（packages-client 有 923 条）所有条目平铺成一级 `###` 列表，没有任何分组结构。

## 决定

文案修复（已提交页面，下次站点构建生效）：

- README.md / README.zh.md：「八个」改「十」，补 llm-stream-lab 与 plugin-flow-lab 两行，名称与枢纽卡片一致。
- 22 课开头改为第三人称的说法纠正；21 课改写成明确的核验边界声明，不再自指会话。
- 09 课：合并重复行，三个核验小节标题去掉追加式日志措辞。
- 13 课：阅读顺序按依赖重组（README → 类型 → 注册表 → 呈现/schema → 测试辅助 → 测试），全部 URL 不变。
- 五处页脚统一为「独立 oracle 校验」。
- 16/17/20/26 课、START-HERE.md、SITE-HOME.md 的「闭环」换成平实表述；`packages/core/scope/README.zh.md` 里图循环含义的用法和冻结的工程笔记保留原词，因为那里它是技术词汇。
- 23 课新增静态内联 SVG 分组柱状图，呈现 200 次测量的 A/B 计时（数值与相邻表格完全一致，填充走主题变量，`role="img"` 且以表格作文字替代；`.dsh-ab-chart` 响应式规则追加到 `reading.css`）。

生成器修复（`study-tools/generate-source-index.mjs`，下次对着源码根重新生成时生效）：

- 两条按路径键入的覆盖项给 request-image.ts 真实角色（图像请求版本缓存）和锚定在测试主题引文上的设计原因。
- 测试用例 / 测试夹具的用途在 `conceptFor` 回退成路径回声时不再复读自身路径，改由扫描到的真实测试主题领句。

llm-stream 实验对齐：补上其他实验室都有的「完整文字替代」表格卡；模型导出 `listArrivals()` 让表格与时间轴共用同一份数据；页脚如实声明完整表格替代。索引页在单页条目 ≥ 40 时插入 `## <所属包>` 分组标题和每组计数行，VitePress 右侧大纲随之获得分组导航。

## 已考虑的替代方案

**手工重写 67 个索引页里的模板填空条目。** 否决：这些页面对着上游源码根重新生成，文字修法应落在生成器里，手改会被覆盖。

**把低信息量条目降级为一行记录。** 暂缓：`verify-source-index.mjs` 要求每条目具备全部十一字段；放宽这份契约需要单独的决定和配套门禁修改。

**为五个尚无实验的主题新建实验室**（Hook waterfall 步进、审批流、Session fork/崩溃修复、subagent 委派、guard 循环卫生）。暂缓：每个实验室都带着预测门控、状态 schema、枢纽卡片和构建产物契约，应当各自成篇。

**单独提交 reading.css。** 追加图表样式时该文件已带有并行 lab-hub 工作的未提交改动；两处一起提交，不把一个文件拆进两个提交。

## 后果

文案修复在下一次 `pnpm docs:check` / Pages 构建后到达部署站点；生成器修复要到下一次带 `--source-root` 的重新生成才会写入已提交的索引页。在此之前，手工修补过的 packages-attachment.md 条目保证线上正确，生成器则为未来基线产出同样的文本。柱状图不引入 JavaScript 和网络访问；回退表格不新增存储或 CSP 面。题库没有引用任何被替换的措辞（编辑前已核实）。
