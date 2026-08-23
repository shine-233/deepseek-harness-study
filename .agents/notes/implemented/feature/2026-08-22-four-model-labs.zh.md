# Agent Note：四个模型实验覆盖审批、fork 恢复、委派与循环卫生

Status: implemented

[English](2026-08-22-four-model-labs.md) | 中文

## 问题

实验室审计留下四个只有正文、没有动手实验的机制：ask/审批生命周期及其 fail-closed 退化、Session fork 的前缀继承与崩溃后到 `unknown` 的修复、受深度上限约束的 subagent 委派、以及拒绝相对后置结算撤销呈单调性的循环卫生阈值拦截。每条规则都只是文字——读者不亲手扳一次开关，就不会真的相信这些后果。

## 决定

四个模型实验落地于 `website/public/`，各自为 `*-model.js` + `*-lab.html` + `*-lab.js` + `*-lab.css` 四件套，带共享门控、hash 状态链接、oracle 卡、证据边界和完整文字替代表：

- `approval-flow`：应答者（`ui-answerer` | `none`）× 裁决（`allow` | `deny`）。逐字实现第 13 课的 fail-closed 规则——无应答者退化为拒绝、主体不运行；allow 让主体恰好执行一次；拒绝与缺席都收敛进统一结果分类。
- `session-fork`：崩溃（`complete` | `crash-mid-tool`）× fork（`no-fork` | `fork`）。fork 继承父前缀（崩溃后 seed length 为 2，完整轮为 3）并记录 parent/seed/边界；恢复恰好补出一条标记为 unknown 的 `interrupted`；`NO_GHOST_SUCCESS` 禁止任何意图缺少结果或 unknown 去向。
- `subagent-delegate`：深度（`within-limit` | `beyond-limit`）× 结局（`report` | `fail`）。超限委派在边界被拒且不产生子步骤；通过的委派只在子泳道执行并恰好结算一次，失败回报同样算完整结算。
- `guard-loop`：次数（1–5）× 守卫开关，阈值为 3。拦截从第三次尝试开始且发生在主体执行前；执行数 + 拦截数恒等于发出数；唯一一次后置撤销尝试在结构上 `undoWorked: false`（单调）。

课程嵌入：05（fork）、13（审批）、22（守卫）、03（委派），各带指向既有标题的降级锚点。登记项同步迁移：模型实验页数量断言 10→14，`LAB_PAGE_IDS` 新增四个 id，枢纽标题/meta/h1 写十五并新增四张卡片分属 main/plugin 组，构建产物标记要求十五字样及两个新 `data-lab` 属性，README 表格新增四行，START-HERE/SITE-HOME 措辞同步，JournalHome 的拍立得与芯片清单枚举至其十五。

## 已考虑的替代方案

**建模真实 Cordis 对 undefined 返回的处理或真实审批超时。** 保留在各实验的 `cannotProve` 里：这些需要上游源码证据才说得诚实。

**每个实验单独写笔记。** 四个实验室共用模板、登记清扫和这次计数迁移，合并成一篇；各自细节由专属测试套件承载。

## 后果

首页学习测试指标随四个新套件的 32 个声明用例增长；已提交的状态条记录 298（另加示例 8）。首页本身正由并行工作迁移到 `JournalHome` 组件——其拍立得与芯片清单已在同一提交里改为十五个实验，使渲染数字与登记一致。此前添加的再生成工作流保持删除状态；本次改动不影响已分组导航的索引页。
