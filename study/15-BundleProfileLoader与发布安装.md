# Bundle、Profile、Loader 与发布安装

这篇解释一个插件怎样从代码变成可以被 DSH 发现、组合、启动和卸载的安装单元。读完你要能做一件事：拿 base Bundle patch 里的一个条目，说出它在 Profile、home 和 `--patch` 逐层叠加后的最终值是谁写的；顺带分清 package.json 里的 `dsh.bundle` 为什么只说明装配格式，不证明发布者是官方团队。

## 亲手换一次解析顺序

顺序是配置的一部分。下面这个组件让你调整 Bundle 的声明顺序，看最终配置跟着变：默认顺序下 `maxTurns` 解析成 4，把「严格上限」移到第一位后变成 12——同一组 Bundle，只换顺序。叠加命令行 overlay 后又变成 20，因为 overlay 永远在所有 Bundle patch 之后。

<LessonWidget
  id="profile-loader-lab"
  url="/profile-loader-lab.html"
  title="Profile 解析顺序实验"
  :height="900"
  fallback-href="#先记住四个对象"
>

不打开组件也能得到两个结论。第一，被写多次的键（本例是 `maxTurns`、`telemetry`）由最后一个写它的步骤决定最终值，所以换顺序会换结果；只被写一次的键不受顺序影响。第二，配置错误是显式失败而不是静默跳过：勾上那个「引用了不存在插件」的 Bundle 后，解析停在第 1 步，只有 1 步被应用，后面的 Bundle 一个都没跑——而不是跳过坏的那个继续。

</LessonWidget>

组件的横轴是声明顺序，不是加载耗时：它不能说明真实 DSH 的 Bundle 名、配置键或 patch 语法与这里相同，也不能说明插件激活顺序带来的副作用。


## 先记住四个对象

| 对象 | 初学者可以怎样理解 | 它负责什么 | 它不负责什么 |
| --- | --- | --- | --- |
| Cordis 插件 | 一项可以挂载和卸载的功能 | 注册服务、事件、工具或子插件 | 不负责决定整个产品组合 |
| Bundle | 一组插件和 patch 的可安装组合包 | 声明一层默认插件树 | 不负责证明发布者身份 |
| Profile | 一次运行选择的组合清单 | 选择 Bundle 顺序和用户覆盖 | 不等于单个插件 |
| Loader | 读取配置、解析模块并建立插件树的装配器 | 挂载、等待、失败和卸载 | 不替第三方包承担安全责任 |

官方 app-boot README 把这些职责拆开：Bundle 通过 manifest 和 dsh.bundle.patch 提供组合层，Profile 保存有序的 Bundle 名单，Loader 负责把最终配置树变成 Fiber。先分清对象，再读具体 YAML 和入口代码。

## 固定版本的证据入口

本篇使用的上游固定提交是 aa6c361a972c8369148dea7380bb5c21c24e07ec。
优先阅读[官方架构说明](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/docs/architecture.zh.md)。

再读[app-boot README](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.zh.md)。
[Profile 实现](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/profile.ts)。

再读[CLI Profile 启动编排](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/src/profile-boot.ts)。

配置语义还应对照[Cordis primer](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/docs/cordis-primer.zh.md)。

再读[官方发布指南](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/docs/user/develop/basic/publish.zh.md)。
这些链接固定到同一提交，不能用社区 README 或滚动的 master 代替。

## 一条 Bundle 到运行时的链

可以先用下面的顺序在脑中画图：

```text
Bundle package.json
  -> dsh.bundle.patch
  -> Profile 的 bundles 有序列表
  -> profile/home/--patch 覆盖层
  -> app-boot composeEntries
  -> Cordis include/group
  -> Loader 解析并创建 Fiber
  -> assertEntriesLoaded / assertEntriesActivated
  -> 应用开始工作
```

不同层各自拥有自己的事实：Bundle 只提供一层组合，Profile 决定哪些层参与，patch 决定最终配置，Loader 负责生命周期，宿主负责进程退出和诊断。

## Bundle manifest 怎样被识别

一个可被 DSH 识别的组合包通常在 package.json 中声明 dsh.bundle.patch，它指向本包中的 patch 文件。
固定提交中的[基础 Bundle manifest](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/base/package.json)。

再读[基础 patch](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/base/cordis.patch.yml)。
[headless Bundle](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/headless/cordis.patch.yml)。

再读[Web Bundle](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/bundle/web-app/cordis.patch.yml)，它们都是格式学习样本。

dsh.bundle.patch 是可识别的装配元数据，不是官方认证字段。社区包也可以使用同一个字段；判断官方身份仍然要看仓库归属、发布组织、上游源码、许可证和官方文档。

## cordis.patch.yml 做什么

固定提交中的 patch 是一个 YAML 数组。它可以按条目的 id 覆盖配置，也可以用 insert 添加新的条目。按 id 命中的配置覆盖是整行替换，而不是深度合并；如果只写一个字段，其他字段不会自动从原条目继承。

这条规则是初学者最容易踩的坑：你想改一个工具的超时，就必须在 patch 中重述该条目仍然需要的 provider、config 和依赖字段。阅读 patch 时要同时打开被覆盖的原始行，不能只看 patch 文件。

!!js 是 Loader 配置允许的 JavaScript 表达式标记，使用范围由官方 Loader 配置规则限制。它不是普通 YAML 字符串，也不应该被扩展到任意 metadata 字段。没有必要执行表达式时，优先写静态配置，便于审阅和回放。

cordis:include 负责引入一组条目，cordis:group 可以把提供方和消费者放进同一个 isolate realm。它们由宿主的模块管线解析，而不是让被包含的配置自己随意改变模块解析根目录。

## Profile 怎样选择 Bundle

Profile 位于 `$DSH_HOME/profiles/<name>`。它的 manifest 保存 `dsh.profile.bundles` 有序列表和树外插件依赖，Profile 自己还可以拥有 `cordis.patch.yml`。`loadProfile` 读取这些信息，按顺序找到每一个 Bundle 的 patch，再由 `composeEntries` 组合出最终条目。

Profile 的顺序有实际意义：后面的层可以覆盖前面层的同 id 条目。通常可以把 Bundle 看成默认产品组合，把 Profile patch 看成某个用户或某个部署的选择，把 home patch 和 --patch 看成更高优先级的本地覆盖。

官方 Profile 模板通常包括 web 和 headless。其他名称不能凭空被当作官方模板；CLI 会在相应的插件管理路径中明确处理创建和缺失错误。读 Profile 时要区分“产品随发行版交付的模板”和“用户自己创建的 Profile”。

## 解析裸包名和相对路径

配置里的裸插件名，例如 @deepseek-ai/dsh-* 或 npm 包名，需要由 Loader 的模块加载器解析。默认解析根与配置目录有关；封闭运行时可以通过 bareModuleBaseUrl 指向已安装的宿主包树，使配置文件所在目录不会意外遮蔽真正的发布依赖。

相对 specifier 仍然以配置目录为基准。这个差异解释了为什么“本地源码运行成功”不一定等于“打包后的 CLI 成功”：源码启动器可能有 workspace 映射，构建后的普通 Node 进程则依赖真实的 package.json、exports 和安装布局。

检查社区 Bundle 时，至少同时核对 package.json 的 dependencies、exports、bin 和 scripts。prepare、preinstall、postinstall、构建脚本和包管理器的构建许可都会在安装阶段执行；它们属于供应链和安装权限问题，不是 Cordis 插件 API。

## Loader 的启动、失败和卸载

app-boot 的 boot() 会创建根 Context，安装 Loader，挂载 include 树，等待条目结算，然后检查所有启用条目是否真的有 Fiber、所有 Fiber 是否真的激活。只看到一个配置行或一个成功的 import，不足以证明插件已经可用。

Loader 会并发挂载多个条目，因此某个插件可能已经打开终端、watcher 或连接，而另一条配置仍然失败。启动失败必须先 dispose 已经构造的上下文，再把带有条目和阶段信息的错误交给宿主；否则用户的终端状态和后台资源可能残留。

installFailLoud 把无法处理的 Loader 拒绝转换成带标签的错误并退出，但退出前可以等待宿主提供的 release 回调。这里的“fail loud”不是粗暴地立即杀进程，而是先给 Fiber 和宿主资源一个有界的清理机会。

插件的 ctx.on()、ctx.provide()、ctx.tools.register() 等注册会随当前 Fiber dispose。timer、文件 watcher、socket、子进程和临时文件不会因为写在 apply(ctx) 里就自动消失；它们必须拥有显式 disposer 或可等待的终止流程。

## HMR 和用户 patch

用户 patch 可以由 HMR watcher 监视。文件新增、修改或删除时，app-boot 会通过 compose 闭包重新组合完整 patch 列表，并以事务方式更新树。成功时新树替换旧组合，失败时最后一个可用树继续运行，错误通过 HMR 事件报告。

这意味着 HMR 不是“随便重载一个 JavaScript 模块”。它要处理 patch 解析、配置验证、Loader 候选、旧 Fiber 清理和新 Fiber 激活。研究 HMR 时，必须同时看成功、语法错误、缺少 id、插件启动失败和 watcher dispose。

## 发布前的最小审计

一个容易被正确安装的 Bundle README 至少要写：维护者和许可证、支持的 DSH commit 或版本、包名和 Bundle manifest、公开扩展点、文件/网络/凭据/子进程权限、安装脚本、构建方式、测试层级、卸载方法和失败恢复。

如果项目自称“官方 Bundle”，还要去上游仓库和官方发布链路核对。使用官方字段、官方包风格或官方 UI 位置，都只能证明它采用了某种兼容格式，不能证明 DeepSeek AI 维护它。

## 读源码时的练习顺序

先读 packages/boot/app-boot/README.zh.md 的 Profiles 段落，再读 packages/boot/app-boot/src/profile.ts 的路径解析和组合逻辑。然后读 packages/bundle/base/cordis.patch.yml，把一个 patch id 对回基础 Bundle 中的原始条目。

接着打开 apps/cli/src/profile-boot.ts，找宿主怎样加入 home patch、命令行 overlay、环境快照和退出处理。最后对照 packages/bundle/headless 或 packages/bundle/web-app 的 Loader 组合测试，确认你读到的是实际装配路径，而不是只在单元测试里手工 ctx.plugin() 的路径。

## 你应该能回答的问题

- 为什么 Bundle 不是 Profile，Profile 也不是插件？
- 为什么 patch 按 id 覆盖时必须重述整行配置？
- 裸包名为什么在源码运行和构建产物中可能解析到不同位置？
- assertEntriesLoaded 和 assertEntriesActivated 各自防什么问题？
- 一个插件 dispose 后，哪些资源由 Fiber 自动清理，哪些资源必须由插件自己清理？
- 为什么 dsh.bundle.patch 不能证明社区项目是官方项目？

## 固定版本参考

- [官方架构](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/docs/architecture.zh.md)
- [Cordis primer](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/docs/cordis-primer.zh.md)
- [app-boot README](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/README.zh.md)
- [Profile 实现](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/boot/app-boot/src/profile.ts)
- [CLI Profile 启动](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/src/profile-boot.ts)
- [Bundle 发布指南](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/docs/user/develop/basic/publish.zh.md)
