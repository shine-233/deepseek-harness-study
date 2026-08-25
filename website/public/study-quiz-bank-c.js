/**
 * 课程自测题题库 C（第 14—19、29 课）。
 *
 * 纯数据模块：只包含题目对象字面量，不触碰 document/window。
 * source 指向教材里的真实小节标题；答错时把读者带回那一节。
 */
export default {
  '14-官方HookBridge与兼容层': [
    {
      id: 'q1',
      q: '同样是 matcher 里写了 Bash，Claude Code 与 Codex 两个 bridge 的行为差异是什么？',
      options: [
        '两个方言都把所有模式当作不自动加锚点的正则',
        'Claude Code 的 matcher 只支持字面量，Codex 只支持带自动锚点的正则',
        'Claude Code 的 Bash 按字面量精确匹配，不会匹配 BashOutput；Codex 的 Bash 相当于 /Bash/，会匹配包含 Bash 的工具名',
      ],
      answer: 2,
      explain: '「配置和 matcher」一节给了这个对比例子：Claude Code 用字母数字、下划线和竖线组成的字面量精确匹配，竖线是精确备选项，其余才按不加锚点的正则；Codex 所有非空模式都是不自动加锚点的正则。matcher 测试专门覆盖了这两个容易混淆的差异。',
      source: 'study/14-官方HookBridge与兼容层.md#官方-hookbridge-与兼容层',
    },
    {
      id: 'q2',
      q: '外部 hook 命令以退出码 1 结束且 stderr 有内容时，bridge 通常怎么处理？',
      options: [
        '作为非阻断错误处理：exit code 和 stderr 可以记录，但当前桥接不会仅因为退出码 1 就拒绝工具',
        '立即映射成对这次工具调用的 deny 决策并阻断执行',
        '让 agent loop 抛出异常并终止整个 run',
      ],
      answer: 0,
      explain: '「退出码和 stdout/stderr 字段」的解码表：exit 0 是成功；exit 2 才映射为 block 且 stderr 成为阻断理由；其他非零退出码是非阻断错误；进程无法运行或被信号终止时 exitCode 为 undefined，同样非阻断。',
      source: 'study/14-官方HookBridge与兼容层.md#官方-hookbridge-与兼容层',
    },
    {
      id: 'q3',
      q: '关于 detached hook（如 SessionStart）的 abort 与 drain，下列哪条符合课程描述？',
      options: [
        'SessionStart hook 运行期间 agent 启动会被阻断，直到外部命令成功返回',
        'emit point 不等待外部命令完成；bridge 卸载时 drain() 先以固定原因 abort，避免 detached hook 被十分钟默认 timeout 拖住，并等待全部 promise 波次 settle',
        '插件销毁后 detached promise 被直接丢弃，hook 会继续运行到默认超时自然结束',
      ],
      answer: 1,
      explain: '「四、detached hook 的 abort 与 drain」：detached 表示 emit-shaped point 不等待外部命令，bridge 用 AbortController 加 in-flight Set 跟踪整条 chain；drain() 触发 abort 后还要重新观察 Set 直到所有波次结束。SessionStart 本身不能阻断启动，context 是 best effort。',
      source: 'study/14-官方HookBridge与兼容层.md#官方-hookbridge-与兼容层',
    },
  ],
  '15-BundleProfileLoader与发布安装': [
    {
      id: 'q1',
      q: 'cordis.patch.yml 中按条目 id 命中的配置覆盖，规则是什么？',
      options: [
        '与原条目做深度合并，patch 里没写的字段自动继承原值',
        '整行替换而不是深度合并：想改一个字段，可能需要在 patch 中重述该条目原本仍需要的 provider、config 等字段',
        '字段冲突时静默跳过 patch，保留原条目不动',
      ],
      answer: 1,
      explain: '「cordis.patch.yml 做什么」明确：按 id 命中的覆盖是整行替换而非深度合并，只写一个字段时其他字段不会从原条目继承——这是初学者最容易踩的坑，阅读 patch 时要同时打开被覆盖的原始行。',
      source: 'study/15-BundleProfileLoader与发布安装.md#bundleprofileloader-与发布安装',
    },
    {
      id: 'q2',
      q: '一个包在 package.json 中声明了 dsh.bundle.patch 字段，这能证明什么？',
      options: [
        '证明该包由 DeepSeek AI 官方团队维护并通过认证',
        '证明 npm 已审计过它的安装脚本和依赖安全',
        '只能证明它采用了可被 DSH 识别的装配格式；社区包也能使用同一字段，官方身份要看仓库归属、发布组织、上游源码和许可证',
      ],
      answer: 2,
      explain: '「Bundle manifest 怎样被识别」：dsh.bundle.patch 是可识别的装配元数据，不是官方认证字段。使用官方字段、官方包风格或官方 UI 位置都不能证明 DeepSeek AI 维护该项目。',
      source: 'study/15-BundleProfileLoader与发布安装.md#bundleprofileloader-与发布安装',
    },
    {
      id: 'q3',
      q: '解析顺序实验中勾选「引用了不存在插件」的 Bundle 之后，会发生什么？',
      options: [
        '解析停在第 1 步显式失败，只有该步被应用，后面的 Bundle 一个都不跑，而不是跳过坏的那个继续',
        '跳过引用了不存在插件的 Bundle，继续组合其余 Bundle',
        '自动为缺失插件创建空占位条目后继续组合',
      ],
      answer: 0,
      explain: '「亲手换一次解析顺序」的两个结论之一：配置错误是显式失败而不是静默跳过，坏 Bundle 让解析停在当前步骤，后面的 Bundle 都不被应用。',
      source: 'study/15-BundleProfileLoader与发布安装.md#亲手换一次解析顺序',
    },
  ],
  '16-学习工作簿与首个实验': [
    {
      id: 'q1',
      q: '第一次学习这个仓库，课程建议先走哪些模式？',
      options: [
        '插件实验和上游源码追踪，先把完整 DSH 构建出来再说',
        'GitHub 阅读和本地读文档，先把概念路线和证据边界建立起来',
        '直接跑真实模型基准，再回头读概念文章',
      ],
      answer: 1,
      explain: '「先选择你要走的模式」明确：第一次学习建议只走前两种模式（GitHub 阅读、本地读文档）；不需要看到 pnpm install 就立即安装完整 DSH。',
      source: 'study/16-学习工作簿与首个实验.md#先选择你要走的模式',
    },
    {
      id: 'q2',
      q: '工作簿三里对入口文件运行 node --check ./index.js，能证明什么？',
      options: [
        '只能证明 JavaScript 能被解析；不能证明 DSH Loader 能找到包，也不能证明工具、事件、Profile 或卸载行为正确',
        '证明 Loader 已经发现该包并完成服务注册',
        '证明插件的 dispose 路径没有资源泄漏',
      ],
      answer: 0,
      explain: '「工作簿三：先做静态插件实验」：node --check 只是入口语法检查，课程原文强调它不能证明包被发现或任何运行时行为正确，第一阶段只做包名、公开接口、dispose 路径三项静态检查。',
      source: 'study/16-学习工作簿与首个实验.md#学习工作簿与首个实验',
    },
    {
      id: 'q3',
      q: '把本地 Bundle 加入专用 Profile 后，下列哪种观察才算卸载证据？',
      options: [
        '--dump-config 输出里还能看到该 Bundle 的 patch 行',
        '启动日志显示 Fiber 已激活且没有报错',
        'dispose（移除）之后再次触发事件或调用工具，不再出现旧输出',
      ],
      answer: 2,
      explain: '「工作簿四：有 DSH CLI 时做组合实验」要求分层记录观察证据：--dump-config 只能证明 patch 被组合；启动日志才可能证明 Fiber 激活；dispose 后再次触发且没有旧输出才是卸载证据。',
      source: 'study/16-学习工作簿与首个实验.md#学习工作簿与首个实验',
    },
  ],
  '17-完成度审计与证据矩阵': [
    {
      id: 'q1',
      q: '证据矩阵里的「已覆盖」表示什么？',
      options: [
        '上游所有运行行为都已经在本机执行并验证过',
        '学习入口和可追踪证据已经存在，但不表示上游运行行为已在本机执行过',
        '官方 DSH 的完整 build 已经通过',
      ],
      answer: 1,
      explain: '「目前已经被证据支持的内容」末尾原文：「已覆盖」表示学习入口和可追踪证据已经存在，不表示上游所有运行行为都已经在本机执行过。',
      source: 'study/17-完成度审计与证据矩阵.md#目前已经被证据支持的内容',
    },
    {
      id: 'q2',
      q: '按「仍然没有被本仓库证明的内容」，下面哪个说法是错的？',
      options: [
        '在隔离 Profile 中做一次真实模型请求，才能补上真实模型请求的证据',
        '第三方社区项目的 README、topic 或 manifest 就是本地实际安装运行的证据',
        '跨平台行为需要分别在 Windows、macOS、Linux 上记录命令和差异',
      ],
      answer: 1,
      explain: '未证明表明确写着：第三方插件实际安装方面，社区项目的 README、topic 或 manifest 不是本地运行证据；需要锁定 commit，在隔离目录安装、启动、卸载并保存输出。',
      source: 'study/17-完成度审计与证据矩阵.md#仍然没有被本仓库证明的内容',
    },
    {
      id: 'q3',
      q: '质量审计中 44 条模板复用统计信息应该怎样理解？',
      options: [
        '它们是结构错误，必须清零后索引才算通过',
        '说明这批卡片完全缺少文件级设计证据',
        '统计指出同类角色复用了设计理由模板；模板复用不等于缺少文件证据，若模板与源码冲突应以源码为准并把该文件提升为人工精读对象',
      ],
      answer: 2,
      explain: '「质量审计提示与模板复用统计应该怎样理解」：审计器把模板复用单独列为统计信息而不是提示或错误；每张卡片仍有顶部注释、声明、import 等文件级证据，验证器也确认这一点。',
      source: 'study/17-完成度审计与证据矩阵.md#质量审计提示与模板复用统计应该怎样理解',
    },
  ],
  '18-维护更新与版本迁移': [
    {
      id: 'q1',
      q: '只想修错别字、改善中文或补充一个静态链接时，应该怎么做？',
      options: [
        '顺手把上游基线换成最新 commit 并重新生成索引',
        '保留当前固定 commit，只修改学习材料并运行手写链接检查，不需要下载上游源码',
        '等下一次版本迁移一起处理，平时不要改动任何文件',
      ],
      answer: 1,
      explain: '「什么时候不要更新上游」：这类小改动不需要下载上游源码；只有要研究的新功能不在固定提交、固定链接失效、API/CLI 变化或要建立新快照时才考虑迁移。',
      source: 'study/18-维护更新与版本迁移.md#什么时候不要更新上游',
    },
    {
      id: 'q2',
      q: '为什么生成新索引必须用完整源码目录，而不能用 sparse-checkout？',
      options: [
        'sparse-checkout 无法从 GitHub 拉取任何内容',
        '因为 blob:none 过滤器与 sparse-checkout 互斥',
        '生成文件级证据需要完整源码目录；sparse-checkout 只能支持路径导航，在其工作树上生成会把 import 和行数错误地写成空值',
      ],
      answer: 2,
      explain: '「2. 下载到独立临时目录」要求完整 clone 到学习仓库之外；「迁移时最容易犯的错误」再次点名：在 sparse-checkout 工作树上生成会把所有 import 和行数写成空值。',
      source: 'study/18-维护更新与版本迁移.md#版本迁移的安全顺序',
    },
    {
      id: 'q3',
      q: '下载新基线后运行 git -C $sourceRoot rev-parse HEAD，这一步的作用是什么？',
      options: [
        '把短 SHA 自动展开成最新的 release tag 名',
        '生成新的索引清单文件',
        '校验检出的 HEAD 必须与计划迁移的完整 SHA 完全一致；不一致就停止，不要生成新索引',
      ],
      answer: 2,
      explain: '「2. 下载到独立临时目录」明确：最后一条命令必须与 $commit 完全一致，若不一致就停止，不要生成新索引；记录新基线时也不要只写 master 或短 SHA。',
      source: 'study/18-维护更新与版本迁移.md#版本迁移的安全顺序',
    },
  ],
  '19-插件测试卸载与版本证据': [
    {
      id: 'q1',
      q: '六层证据中的第三层「Loader 组合测试」，关键特征是什么？',
      options: [
        '只在 tsx 或 workspace alias 下测试源码入口',
        '使用与发布包相同的 manifest、Bundle patch、Profile，走 loadProfile、composeEntries、boot() 等正式装配路径，能发现裸包解析、id 覆盖、激活和依赖顺序问题',
        '断言 ctx.plugin 和 register 方法存在即可',
      ],
      answer: 1,
      explain: '「六层证据，从便宜到接近用户」：第三层走正式装配路径，是普通插件测试与「能作为产品扩展安装」之间的关键证据；第二层最小 Context 测试则要求断言真实关系而不是方法是否存在。',
      source: 'study/19-插件测试卸载与版本证据.md#插件测试卸载与版本证据',
    },
    {
      id: 'q2',
      q: '生命周期测试中，关于 dispose() 与后台任务，正确的做法是？',
      options: [
        'dispose() 一返回就证明后台任务已经全部结束',
        '固定等待几百毫秒即可当作异步任务结束的证明',
        'detached hook 要先 abort 再等待 drain() 完成；dispose 后再次触发事件或调用工具不应产生新的副作用',
      ],
      answer: 2,
      explain: '「每个插件都要测生命周期」：dispose() 返回并不自动证明后台任务结束，尤其是 detached hook、worker、子进程和网络连接；课程同时反对用固定 sleep 或「没抛异常」替代资源断言。',
      source: 'study/19-插件测试卸载与版本证据.md#每个插件都要测生命周期',
    },
    {
      id: 'q3',
      q: '多个 hook 结果合并权限决策时，优先级顺序是什么？',
      options: [
        'allow 最高，其次是 ask，deny 最低',
        'deny 高于 ask，ask 高于 allow；理由只保留最终获胜等级的理由',
        '按注册顺序取最后一个 hook 的结果，无条件覆盖前面的',
      ],
      answer: 1,
      explain: '「Hook bridge 要测什么」要求覆盖 deny 大于 ask 大于 allow 的优先级；这一规则同样出现在第 14 课的合并描述里：权限结果按 deny、ask、allow 合并，理由只留获胜等级。',
      source: 'study/19-插件测试卸载与版本证据.md#插件测试卸载与版本证据',
    },
  ],
  '29-学习仓库的质量检查与审阅': [
    {
      id: 'q1',
      q: 'CI 全绿时，下列哪个结论仍然是它不能支持的？',
      options: [
        '给定提交范围内的静态检查、编译打包和文档门禁可以通过',
        '真实 DSH 已经运行、模型质量达标、第三方插件安全',
        '提交范围内的差异没有 Git 能识别的空白错误',
      ],
      answer: 1,
      explain: '「每一种检查到底证明什么」逐项列出边界：CI 是一串带边界的证据，不能支持真实 DSH 运行、provider 响应、模型质量、第三方插件安装或跨平台行为；这些结论必须另行取证。',
      source: 'study/29-学习仓库的质量检查与审阅.md#每一种检查到底证明什么',
    },
    {
      id: 'q2',
      q: '关于本仓库的 Agent 审阅（study:agent-review），正确的理解是？',
      options: [
        '它是必过的安全认证，通过后可以自动批准合并',
        '该脚本会调用外部模型对每个 PR 自动给出审阅意见',
        '它是辅助意见（advisory）：脚本只检查审阅指南、PR 模板和工作流的接线是否漂移，不调用外部模型；真正的意见须由维护者复核',
      ],
      answer: 2,
      explain: '「Agent review 应该怎样加」：在数据范围、secret 隔离、费用和误判责任等决定明确之前，Agent 审阅只能是 advisory，不是必过的安全认证或自动合并条件。',
      source: 'study/29-学习仓库的质量检查与审阅.md#学习仓库的质量检查与审阅',
    },
    {
      id: 'q3',
      q: '把最小观察插件的预览上限从 160 改成 80 并跑完 test 和 lint 后，PR 记录应该怎么写？',
      options: [
        '单元测试证明 80 字符预览；尚未证明真实 Profile 安装',
        '插件已经可以发布，DSH 全部验证完成',
        'Actions 全绿即代表无需再写已证明和未证明的边界',
      ],
      answer: 0,
      explain: '「一个具体练习」和「一个合格的 PR 记录长什么样」都要求同时写出已证明与未证明：测试守住行为，lint 守住静态规则，但不能把结论改成「可发布」或「DSH 全部验证」。',
      source: 'study/29-学习仓库的质量检查与审阅.md#一个具体练习',
    },
  ],
}
