# Agent Note：Hook 瀑布实验室把 next() 短路规则做成动手实验

Status: implemented

[English](2026-08-22-hook-waterfall-lab.md) | 中文

## 问题

第 14 课讲授仓库级不变式：瀑布监听器必须调用 `next()` 把控制权交还链条；不调用就返回即短路，后面的监听器不再执行。课程用正文、表格和一张 mermaid 图陈述了这条规则，但读者看不到后果动起来：哪些监听器执行了、兜底对「已有结果」与「没有结果」分别做什么、最终结果的作者落到谁头上。实验清单里也没有覆盖 hook/瀑布主题的实验（桥接页是文件交接工作台，不是模型实验）。

## 决定

新模型实验 `hook-flow` 以四个文件落地于 `website/public/`：`hook-flow-model.js`（纯时间线）、`hook-flow-lab.html`、`hook-flow-lab.js`（渲染层）、`hook-flow-lab.css`。

- 三个监听器挂在同一次派发上：审计（恰好记录一次、总是委托）、策略（行为与裁决由输入控制）、兜底（仅当链条尚无结果时写入放行；已有结果则原样传递）。
- 两个输入构成状态契约：`behavior`（`call-next` | `return-direct`）与 `verdict`（`allow` | `deny`）。二者都是 `HOOK_STATE_SCHEMA` 里经校验的枚举；hash 状态链接与其他实验一样可往返。
- 五条校验的独立 oracle 自行重推时间线：确定性、当且仅当 return-direct 时短路、按声明顺序委托、审计恰好一次且总是委托、最终结果作者与短路状态一致。
- 预测门控让读者在解锁控件前先对「直接 return + deny」押注；答错同样解锁，每条解释都指名由哪几条校验裁决。
- 完整文字替代表逐行列出每一步的泳道、动作和委托调用。无 canvas、不联网，CSP `connect-src 'none'`。
- 第 14 课在证据声明之后嵌入组件并给出降级链接；实验室枢纽在 evidence 组新增第十一张卡片，通过既有进度白名单（`LAB_PAGE_IDS`）与计数标记接入第 14 课。

## 已考虑的替代方案

**把 Cordis 瀑布语义建模得超出所教不变式**（undefined 返回的处理、跨 `next` 的参数变更）。本实验否决：这些行为需要上游源码证据才说得诚实；实验改为在 `cannotProve` 里显式声明它们不在证明范围。

**在枢纽上把卡片放进插件分组。** bridge 主题与 research-debug 工作台同属边界与交接组，因此卡片使用 `data-group="evidence"` 并链接第 14 课。

## 后果

计数契约同步迁移：三个边界 id 的断言现在要求十个模型实验页，枢纽标题/meta 与构建产物标记写的是十一，README 表格新增一行，START-HERE/SITE-HOME 措辞同步，`LAB_PAGE_IDS` 收入 `hook-flow` 使枢纽进度把它计入。专属测试套件 `study-tools/hook-flow.test.mjs` 钉住确定性、全输入网格对五条校验的通过、泳道归属、短路语义、审计账目和页面接线。
