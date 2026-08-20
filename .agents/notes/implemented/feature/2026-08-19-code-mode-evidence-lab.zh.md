# Agent Note: 确定性 Code Mode 证据实验

Status: implemented

[English](2026-08-19-code-mode-evidence-lab.md) | 中文

## 问题

学习材料解释了 Code Mode 子调用会保留 parent 标识并经过工具流水线，但文字和截图不能让学习者验证策略决定、工具主体执行和结果提交之间的区别。直接复用生产 trace 还会混淆两种证据：固定实现记录，以及只为讲清一个不变量而构造的简化模型。网站需要一条无需模型 key、Host、Session、本机端口或机器扫描即可重复操作的交互路径，并且在关闭动态效果或无法使用图形时间轴时仍可学习。

## 决策

学习网站发布[一个独立证据实验](../../../../website/public/code-mode-evidence-lab.html)，由[一个纯模型模块](../../../../website/public/code-mode-evidence-lab.js)和外部样式表驱动。它的公开接口只接受 seed、三种教学策略之一和工具主体并发上限：

```js
simulateCodeMode({ seed, policy, parallelism })
// => { calls, frames, events, observations, oracle, canProve, cannotProve }
```

模型构造一个虚构的外层 `run_code` 调用和四个虚构子工具。每个子调用记录 dispatch、pre-execute、policy decision、post-execute 和 result 阶段。被允许的调用恰好记录一个主体区间；被拒绝的调用不记录主体。parallel 类主体最多按所选上限重叠，exclusive 主体不与其他主体同时运行，并把模型屏障保持到有序提交完成。固定 seed 只控制生成的 id 和主体持续 tick，绝不改变所选策略。

`evaluateCodeModeOracle` 独立于渲染器读取生成的事件。它检查 parent 关联、流水线顺序、策略一致性、被拒主体执行次数为零、每个允许调用恰好执行一次主体、每个子调用恰好一个结果、有界重叠、exclusive 隔离，以及外层结算晚于全部子结果。测试会向被拒调用注入一条 body-start 事件并要求 oracle 失败，因此绿色视图不是由绘制它的同一个显示分支钉死的。

时间轴只使用两个语义维度：横轴为离散 tick，纵轴为执行 lane。它支持 seek、上一步、下一步、播放、暂停、重置、有明确含义的首帧和末帧、range input 的原生键盘操作、页面说明的全局快捷键，以及始终存在的事件表。系统启用减少动态效果时，自动播放会被关闭。这个状态模型没有第三个语义变量，因此实验不使用第三维。

HTML 设置 `connect-src 'none'`，实现不包含网络请求、loopback 探测、Cookie、浏览器存储、HTML 插值、自动 Debug 交接或本地命令。这个实验与既有的[研究与 Debug 文件交接](2026-08-19-research-debug-bridge.md)保持独立：前者讲解确定性模型，后者交换由用户手动传递的 JSON 文件。[课程章节](../../../../study/33-确定性可视化实验协议与Code-Mode权限管线.md)分别标记源码事实、模型推导观测、本地测试结果、浏览器证据和未知运行时行为。

本篇只负责课程实验及其证据约定，不取代 [Code Mode 基础](2026-06-15-code-mode.md)或[实时并行分发](2026-07-26-code-mode-live-parallel-dispatch.md)决策；课程引用的已交付运行时行为仍由它们负责。

## 考虑过的替代方案

**渲染一份捕获的生产 trace。** 拒绝，因为没有一份获准使用的 trace 归这个静态课程 artifact 所有，fixture 仍不能证明当前 Host 运行过，暴露真实 Session 内容还会扩大页面的数据权限。教学模型改为明确标出虚构调用和 tick。

**使用三维场景。** 拒绝，因为 parent、policy 和执行顺序可以用时间与 lane 两个维度表达。装饰性的深度轴不会编码新事实，却会增加镜头与 fallback 成本。

**把实验连接到 Debug bridge 或 loopback 服务。** 拒绝，因为一节权限课程不需要环境中的本地权限。需要显式诊断证据时，用户仍可单独导出和导入既有的版本化 JSON 文件。

**不设纯模型或独立 oracle，只给可变 UI 状态加动画。** 拒绝，因为 seek、确定性测试、减少动态效果和篡改检测会依赖渲染器状态。页面改为投影模型返回的 frames 与 events。

## 后果

这个实验无需 key，可以重复运行，可以按文字检查，并能在浏览器 QA 前先用 Node 测试。学习者可以对照 deny 与 allow 路径，不会把“没有主体”误解成“没有结果”，也能看到放行子调用并不会移除它的 policy 阶段。

模型有意省略生产事件字段、真实耗时、插件专属审批文案、取消、允许主体内部失败、延后上下文和外部副作用。oracle 只证明模型声明的不变量。源码测试、真实组装 Host、真实模型 E2E、浏览器操作和公开 Pages 部署仍是彼此独立的证据。

## 验证

`node --test study-tools/code-mode-evidence-lab.test.mjs` 覆盖逐字节一致的回放、deny-write、allow-all、deny-all、并发上限、首末帧、oracle 篡改拒绝、无效输入、内容安全策略，以及不存在网络、存储、不可控随机、HTML 插值和不支持的渲染原语。`node --check website/public/code-mode-evidence-lab.js` 检查模块语法。Pages workflow 会在文档投影和构建前同时运行这项实验测试与既有 bridge 测试。
