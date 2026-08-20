# 确定性可视化实验协议与 Code Mode 权限管线

这一页把一个容易被跳过的判断变成可操作实验：Code Mode 的内部工具调用仍要经过有序的前置策略、工具主体和后置结算。先打开[Code Mode 权限管线证据实验](/code-mode-evidence-lab.html)，再回来读每一个数字从哪里来。

这不是生产 trace 查看器。页面不连接 DSH Host，不读取 Session，不调用模型或工具，也不写文件；它运行一个固定 seed 的教学函数，并用另一个函数重新检查事件流。

<LessonWidget
  id="code-mode-evidence-lab"
  url="/code-mode-evidence-lab.html"
  title="Code Mode 权限管线证据实验"
  :height="880"
  fallback-href="#读懂二维时间轴"
>

组件里的每一个数字，本页正文都写了它从哪里来：默认输入下 `policy checks=4`、`body executions=3`、`denied bodies=0`；被拒调用没有 `body-start`，但仍有 `post-execute` 和 `result`。阶段矩阵的空格就是这个缺失，并发阶梯图的虚线是所选上限。不打开组件也能按“读懂二维时间轴”和“`simulateCodeMode` 返回什么”两节读完同样的结论。

</LessonWidget>

## 先锁定问题

实验只回答一个窄问题：

> 当外层 `run_code` 程序发起多个内部调用时，策略拒绝是否会阻止工具主体执行？策略允许时，内部调用是否仍先经过同一条 policy lane？并发安全调用和 exclusive 调用在这个模型里怎样排列？

上游源码给出可核对的依据。Code Mode 的 bridge 让内部绑定进入 registry 的 staged scheduler；前置阶段和提交阶段在有序 driver lane 中运行，只有 around-dispatch/body 阶段可以并发，exclusive 调用会先排空并发池，再独占运行，屏障持续到提交完成。[``code-mode.ts`` 的调度注释](../packages/core/tools/src/code-mode.ts#L342-L357)和[实时并行 Agent Note](../.agents/notes/implemented/feature/2026-07-26-code-mode-live-parallel-dispatch.md)描述了这条约定。

“拒绝后主体不执行”也不是动画作者凭经验补的。`prepareExecution` 在策略或 guard 产生 denial 时返回 `post-result`，而不是 `dispatch`；真正调用工具主体的 `dispatchToolBody` 只有在调度器拿到 `dispatch` 后才会运行。可以对照 [``index.ts`` 的 prepare 路径](../packages/core/tools/src/index.ts#L1463-L1505)和[主体调用路径](../packages/core/tools/src/index.ts#L1527-L1558)。

## 三层证据不要混在一起

| 层 | 本页使用的证据 | 能说什么 | 不能说什么 |
| --- | --- | --- | --- |
| 固定源码 | `packages/core/tools/src/code-mode.ts`、`packages/core/tools/src/index.ts`、已有 Code Mode Agent Note | 上游实现如何描述 parent、前置策略、主体并发和 exclusive 屏障 | 这一次浏览器是否启动过真实 Host |
| 教学模型 | `simulateCodeMode({ seed, policy, parallelism })` 的事件、帧和 oracle | 在明确输入下，四个虚构调用会怎样排列；deny 的主体次数是否为 0 | 生产事件字段、真实耗时、真实权限插件的全部行为 |
| 运行证据 | 本页 Node 单测和后续浏览器动作 | 固定函数是否可重复，页面控件是否真的改变可见状态 | 真实模型质量、真实 Session 回放、GitHub Pages 已部署 |

这张表是本实验的防误读装置。页面显示 `PASS`，只代表教学模型的 oracle 通过；它不把静态源码、fixture、浏览器和真实 Host 证据压成一个“已验证”标签。

## 先做预测，再动控件

默认输入是：

| 输入 | 值 |
| --- | --- |
| `seed` | `17` |
| `policy` | `deny-write` |
| `parallelism` | `2` |

四个内部调用按这个顺序提交：

```
inspect_context   read   parallel
search_workspace  read   parallel
write_summary     write  exclusive
read_session      read   parallel
```

在点击“重建实验”前，先写下三个预测：

1. `write_summary` 的 `policy-decision` 是 `allow` 还是 `deny`？
2. 被拒绝的调用是否会出现 `body-start`？
3. 把策略切到“全部放行”后，`write_summary` 是否会跳过 `policy-check`？

答案不是靠看颜色猜出来的：默认场景的 `policy checks=4`、`body executions=3`、`denied bodies=0`；切到“全部放行”后，四个调用都执行主体，但每一个仍有自己的 `policy-check` 和 `policy-decision`。如果你的预测错了，先看事件表中的 tick 和 phase，再回到源码定位。

## 读懂二维时间轴

时间轴只使用两个有明确含义的维度：

- 横轴是离散 `tick`，不是毫秒、token 数或浏览器帧率。
- 纵轴是执行 lane：`outer run_code`、`parallel-1…parallel-N` 和 `exclusive body`。
- 圆点是教学事件；横条是允许执行的工具主体区间。
- 下方文字表是完整 fallback。没有脚本、动态效果偏好或图形支持时，事件仍可以按行读取。

首帧固定表示“外层 `run_code` 已分发，但尚无内部工具主体执行”。末帧固定表示“所有子调用已结算，外层结果完成”。中间没有新事件的 tick 也有意义：它表示某个允许的工具主体仍在执行，而不是页面卡住。

`parallelism=1` 时，两个 read 主体不能重叠；`parallelism=2` 时，前两个 read 可以落在两个 parallel lane；`write_summary` 的 exclusive 主体必须等前一组提交完成，后面的 `read_session` 也要等它结束。模型把这段规则写成可检查的区间，而不是用一张看起来像并行的静态插图。

## 为什么 deny 仍然有 post-execute 和 result

“主体没有执行”和“没有结果”是两件事。教学模型把拒绝调用画成：

```
dispatch-start → pre-execute → policy-check → policy-decision(deny)
              → post-execute → result
```

它没有 `body-start` 或 `body-end`。这样可以把三个层次分开：

1. policy 决定是否允许主体执行；
2. post-execute 仍负责处理已经形成的拒绝结果；
3. result 让调用者知道这一次调用如何结算。

这正是源码中 `post-result` 与 `dispatch` 的分叉所支持的保守读法。它不等于每个真实部署的错误文案都叫 `policy denial`，也不等于外部副作用会自动回滚。

## `simulateCodeMode` 返回什么

实验逻辑对输入和 seed 是纯的；页面只是把返回值画出来。核心接口是：

```js
simulateCodeMode({
  seed: 17,
  policy: 'deny-write',
  parallelism: 2,
})
// {
//   frames,
//   events,
//   observations,
//   oracle,
//   canProve,
//   cannotProve,
// }
```

`events` 保存 parent/child 关系、phase、decision、lane 和 tick；`frames` 为每个离散 tick 保存当前事件、主体并发数和四个子调用状态；`observations` 是从事件重新计数后的教学读数；`oracle` 不读取页面颜色，而是检查事件流。

oracle 至少检查六件事：

| 检查 | 失败意味着什么 |
| --- | --- |
| `PARENT_LINKED` | 子事件没有回到同一个外层调用 |
| `PIPELINE_ORDERED` | 某个调用跳过或倒置了阶段 |
| `POLICY_MATCHES_INPUT` | 事件里的决定与当前策略不一致 |
| `DENIED_BODY_ZERO` | deny 路径错误地进入了主体 |
| `ALLOWED_BODY_ONCE` | allow 路径没有恰好执行一次主体 |
| `PARALLELISM_BOUNDED` | 主体超过并发上限，或 exclusive 与其他主体重叠 |

单测会复制一份事件数组，给被拒调用塞进一个伪造的 `body-start`，再调用 oracle；预期结果是 `DENIED_BODY_ZERO=FAIL`。这比只断言页面显示绿色更强，因为它验证了“动画状态”和“判定逻辑”不是同一份硬编码结果。

## 练习：把视觉判断换成证据判断

**练习 ID：** `lab-code-mode-policy-001`

先保持 `seed=17、parallelism=2`，分别运行 `deny-write` 和 `allow-all`，回答：

1. 两种策略的 `policy checks` 是否都为 4？
2. 哪一种策略的 `body executions` 为 3？
3. `write_summary` 在两种策略下的 `parentCallId` 是否改变？
4. `parallelism=1` 与 `parallelism=2` 改变的是策略结果，还是主体区间的重叠？

**答案和理由：** 两种策略都对四个子调用做一次 policy check；`deny-write` 只执行三个 read 主体，`allow-all` 执行四个主体；parent 不变，因为策略不是重新创建外层调用；改变 `parallelism` 只改变允许重叠的主体区间，不改变 policy decision。若你在事件表中看到不同结果，先检查输入是否真的点击了“重建实验”，再检查 seed、策略和上限三项。

**提示顺序：**

1. 方向：先比较 `policy-decision` 行的 `decision` 列。
2. 概念：policy lane 与 body lane 是不同阶段。
3. 第一步：按 `call` 过滤 `write_summary` 的事件。
4. 答案：deny 没有 `body-start`；allow 有且只有一个，parent 都是同一个 `run-code-*`。

## 这个实验明确不证明什么

页面的 `cannotProve` 会随模型一起显示，核心限制是：

- 它不证明真实 DSH Host、Session、模型、审批服务或工具进程运行过。
- 它不证明教学 tick 等于真实时间，也不证明示例工具名和策略配置存在于你的部署。
- 它不证明所有插件拥有相同的并发安全声明，或所有外部副作用可以撤销。
- 它不替代固定 rc.6 源码、keyless 测试、真实模型 E2E、生产日志或人工审批证据。

如果你需要真实诊断证据，回到[研究与 Debug 协作](29-研究与-Debug-协作.md)，按用户手动传递的 request/repro/result 文件流程走；本页不会自动调用那个桥。

## 验证记录

实验逻辑的本地检查是：

```powershell
node --check website/public/code-mode-evidence-lab.js
node --test study-tools/code-mode-evidence-lab.test.mjs
```

这两条命令证明语法、固定 seed、四种策略/调度关系、oracle 篡改检测和静态离线边界。它们不证明真实浏览器的窄屏、键盘、减少动态效果偏好或 Pages 部署；这些属于单独的浏览器 QA，未完成的路径保留为 `unknown`。

来源方面，优先读[Code Mode 基础 Agent Note](../.agents/notes/implemented/feature/2026-06-15-code-mode.md)、[实时并行分发 Agent Note](../.agents/notes/implemented/feature/2026-07-26-code-mode-live-parallel-dispatch.md)和[工具插件完整契约](13-官方工具插件完整契约.md)。Shubham 文章只是提出模式的二手材料；文章正文的公开 X Article 在当前检索中不能稳定展开，因此课程使用可读取的标题、配图和源码对照，不把无法读取的正文写成已核验事实。
