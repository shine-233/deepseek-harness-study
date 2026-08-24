# DSH 学习用最小观察插件

[English](README.md) | 中文

这个目录是学习用途的第三方 DSH Bundle。它刻意保持很小：只监听公开的 `tools/result` 事件，并写出经过长度限制的文本结果预览。两个预览上限是可部署的配置字段，由导出的 `Config` schema 提供默认值、由 `resolveConfig()` 做直接调用的严格校验，并从 `cordis.patch.yml` 传入。它不读取私有 registry、不改写 Loader、不 patch 源码、不注入进程，也不冒充 DeepSeek AI 包。

## 这个示例能证明什么

| 证据 | 它支持的结论 | 它不支持的结论 |
| --- | --- | --- |
| `package.json`、`src/index.js` 和 `cordis.patch.yml` | 该示例声明了一个第三方 Bundle 入口、宿主可识别的 `Config` schema 和两个可配置的预览上限 | 这个 Bundle 已被真实 Profile 安装或加载 |
| Node 单元测试 | 模块登记了一个公开事件监听器，校验并应用预览上限，未知配置键会失败，限制文本预览长度，而且不改写传入的结果夹具 | Cordis Fiber 卸载、Loader 组合或真实 DSH 进程 |
| 本地 lint | 已提交的 JavaScript 可以解析，并通过示例自己的 correctness/suspicious 规则 | 产品安全、兼容所有 DSH 版本或模型行为 |

## 三步阅读和运行

1. 阅读 `src/index.js` 和 `cordis.patch.yml`。它唯一调用的宿主能力是 `ctx.on('tools/result', ...)`；两个长度上限通过配置传入。
2. 在仓库根目录运行单元测试和 lint。
3. 修改 `cordis.patch.yml` 中的 `maxPreviewCharacters`，再同步修改直接调用 `apply(ctx, config)` 的测试，运行检查并写下测试实际证明了什么。

```sh
pnpm --dir study-examples/minimal-observer-plugin run demo
pnpm --dir study-examples/minimal-observer-plugin run test
pnpm --dir study-examples/minimal-observer-plugin run lint
```

先运行 `demo`，你应该看到这一行：

```text
[study-observer] study_greet -> ["hello world","second block"]
```

它只是一个假的 `ctx.on()` 事件上下文，用来把“注册观察器 → 发出结果 → 打印限长文本”变成一眼能看见的最小演示；它没有启动 DSH、Profile、Loader、provider 或模型。看到输出后再运行 `test` 和 `lint`，这样你能把“我看到了 demo”与“测试断言通过”区分开。

<div class="dsh-task-card" aria-label="运行后怎样判断">
  <span class="dsh-proof-kicker">运行后只看两件事</span>
  <div class="dsh-check-row">
    <div class="dsh-check-item"><span>✓</span><small>test 退出码为 0：示例行为断言通过</small></div>
    <div class="dsh-check-item"><span>✓</span><small>lint 退出码为 0：示例语法和规则通过</small></div>
    <div class="dsh-check-item"><span>!</span><small>这两项都不能替代真实 Loader 或 DSH 运行</small></div>
  </div>
</div>

正常情况下你会先看到一行 demo 输出，随后 Node 测试全部通过，最后 lint 命令以退出码 0 结束。报告文字和 oxlint 版本可以变化；关键是三个命令都没有报错。这只证明示例自己的行为和语法规则，不证明真实 DSH 已经加载它。

这两项检查不需要 API key，也不会启动本地 DSH 进程；它们同样不涉及 registry 修改或进程注入这类宿主层动作（原因见上面的证据表）。

## 三个教学点

### 1. 公开事件，不是私有 Hook

`apply(ctx, config)` 会先校验部署上限，再订阅 `tools/result`。DSH 把它声明为最终 live observation 事件。观察器能收到最终结果，但不能修改结果、决定权限，或凭空造出一个新工具。

示例还会拒绝拼写错误的配置键，而不是静默退回默认值。导出的 Schemastery `Config` 让真实 Loader 有标准 schema 可以读取；`resolveConfig()` 继续负责直接调用时的未知键和安全整数检查。这个本地单元测试验证的是插件自己的 schema 和校验逻辑，仍然不等于真实 Loader 组合验证。

Cordis 会把通过 `ctx.on()` 做出的登记记录到挂载插件的 Fiber。真实卸载时，Cordis 会随这个 Fiber 移除监听器。单元测试使用的是特意做得很小的 fake context，所以它验证了插件自己的公开交互和输出，却不冒充证明 Cordis 的实现已经运行。「订阅、策略拒绝和卸载怎样影响一个观察插件」的完整时间线，可以在[插件订阅与日志实验](/plugin-flow-lab.html)里逐步推演。

### 2. 有边界的日志数据

`previewTextBlocks()` 使用经过校验的 `maxPreviewBlocks` 和 `maxPreviewCharacters`，把换行变成空格，并忽略图片和其他非文本块。patch 默认值是三段文本和每段 160 个字符。这是一个观测示例，不是一套完整隐私策略：真实插件还要决定哪些文本允许进入日志，以及保存多久。

### 3. Bundle 组合不是源码 patch

`cordis.patch.yml` 把这个包插入插件树。它改变的是 Profile 加载哪些插件，不会修改 DSH TypeScript 源码。如果功能需要私有 Loader 表、模块缓存替换、运行中进程注入或操作系统配置改写，它就不再是这种普通插件。

## 一个安全的修改练习

把 `cordis.patch.yml` 中的 `maxPreviewCharacters: 160` 改成 `80`。同步修改 `tests/plugin.test.js` 中直接传给 `apply(ctx, config)` 的测试值和预期，然后再次运行两个命令。不要改源码默认值：这一步练习的是部署配置，不是硬编码常量。练习结束后把这两个 80 恢复成 160，或者只在自己的分支保留改动；不要把临时学习改动写成已经发布的插件版本。你的学习记录应当区分下面几种说法：

- **单元测试已经证明：**该示例能接受配置值，并生成 80 个字符的文本预览。
- **尚未证明：**第三方 Bundle 已经通过真实 DSH Profile 加载。
- **尚未证明：**模型收到了更少 token，或表现更好。

然后再阅读[中文插件课](../../study/11-如何写一个合规插件.md)、[工具完整契约](../../study/13-官方工具插件完整契约.md)和[证据阶梯](../../study/19-插件测试卸载与版本证据.md)，再尝试真实 Profile 安装。

## 真实安装清单

以后在隔离 DSH Profile 中安装副本时，记录固定 DSH commit、包 commit、Profile 名、命令、Loader 输出、工具结果观察、卸载命令和卸载后的检查。要把该包写成“可安装”，先补 Loader 组合测试；只有在有意纳入模型/API key 时，才补真实 provider 测试。

`package.json` 中的 peer 范围只表达预期兼容范围，不证明兼容性。发布前要重新核对目标 DSH 版本的公开 tools README，并测试真实包。
