/**
 * 课程自测题扩展题库（E 组）：26–29 课。
 *
 * 纯数据对象字面量：不在本文件触碰 document 或 window；
 * 每道题的 source 指向教材真实小节，答错时把读者带回出处。
 */

export default {
  '26-后续研究路线': [
    {
      id: 'q1',
      q: '本学习工作树已完成的 provider-free A/B 观测里，哪些已经观察到，哪些还没有测量？',
      options: [
        '已经测到真实 provider token、缓存 token 和首 token 延迟，只差回答质量没有盲评',
        '已观察到 24 个工具注册不变、当前可见集合从 24 变为 3、schema/wire 字节数和部分宿主准备阶段耗时的变化；provider token、缓存 token、延迟、回答质量和工具执行结果仍未测量',
        '已经完整证明工具越少模型越快，可以推广到所有模型和 provider',
      ],
      answer: 1,
      explain: '「先看结论」要求把当前状态分开记：本地只做了不调用 provider/model 的真实 ToolRuntime 观测；真实 provider 字段和质量指标都没有测量，debugSnapshot() 也是学习工作树新增的调试接口，不是上游承诺的公共 API。',
      source: 'study/26-后续研究路线.md#先看结论',
    },
    {
      id: 'q2',
      q: '一个自动改 prompt、工具配置或模型的系统，要满足哪组条件才值得称为「自进化」？',
      options: [
        '只记录成功样本，看到指标变好就直接宣布进化成功并推广上线',
        '换一个更强的模型后成功案例变多，就足以下结论说这次改动有效',
        '固定 Harness 版本、模型和 Provider，预先定义主指标和护栏指标，保留不可见的 holdout 集，做交错或配对 A/B 并记录环境，由人工批准推广并能自动回滚',
      ],
      answer: 2,
      explain: '「“自进化”必须先变成可审计的实验」给出最小可信门槛：目标、数据、版本和回滚明确之前，自动产生改动不等于自动证明改动有益；否则提升可能来自模型更换、任务更换或样本选择偏差等混杂因素。',
      source: 'study/26-后续研究路线.md#后续研究路线从学习材料走到运行证据',
    },
    {
      id: 'q3',
      q: '按 P1 的社区项目审核思路，「README 自述」和「真实 DSH 启动」分别属于哪一类证据？',
      options: [
        'README 是声明；真实启动是运行证据',
        '两者都是卸载之后才有的生命周期证据',
        'README 是运行证据；启动只是项目声明',
      ],
      answer: 0,
      explain: '「P1：社区项目审核顺序」把「项目自称支持」拆成证据层：README 是声明，静态源码是结构证据，Bundle 装配是加载证据，真实 DSH 启动是运行证据，模型调用是 provider 证据，卸载和回滚才是生命周期证据。',
      source: 'study/26-后续研究路线.md#后续研究路线从学习材料走到运行证据',
    },
  ],
  '27-工具预算与插件责任决策卡': [
    {
      id: 'q1',
      q: '「20 个工具仍注册、当前 agent 只解析其中 3 个、native 模式向模型呈现这 3 个」，正确的理解是什么？',
      options: [
        '另外 17 个工具已经被删除，而且这 3 个工具自动获得了文件和网络隔离',
        '说明 restrict() 让当前 agent 绕过了 guard、审批、沙箱等执行策略',
        '这是合理的实验组状态：另外 17 个工具没有被删除；restrict() 使同一作用域的 get() 与分发把被排除工具当作未知，但可解析或可呈现的工具照样要经过 guard、审批、沙箱和宿主能力，可见性不是操作系统权限隔离',
      ],
      answer: 2,
      explain: '「先记住三层和一条呈现线」强调注册、解析、呈现、执行四层不能压缩成一个「工具列表」：restrict() 让选择面和查找面一致，但不是 OS 权限开关；呈现集合缩小也没有给可见工具无限权限。',
      source: 'study/27-工具预算与插件责任决策卡.md#先记住三层和一条呈现线',
    },
    {
      id: 'q2',
      q: '五问决策卡特别提醒小心「注册表」这个词，因为它混用了哪两个不同层面的东西？',
      options: [
        'ctx.tools.register() 是公开的工具登记接口；Windows Registry 是操作系统配置。两者不在同一层，也不共享 DSH 插件生命周期',
        'ctx.tools.register() 和 Windows Registry 是同一个机制的两个名字，都随插件 Fiber 卸载',
        'Windows Registry 属于公开插件 API 的一部分，普通插件可以为了实现功能自由读写',
      ],
      answer: 0,
      explain: '「五问决策卡：我到底在写什么」末尾专门区分这两个译名：公开工具登记接口走正常插件生命周期；改写操作系统注册表属于第 5 层之外的宿主级动作，普通插件作者不应把它藏进安装路径。',
      source: 'study/27-工具预算与插件责任决策卡.md#工具预算与插件责任从万物皆插件到可维护生态',
    },
    {
      id: 'q3',
      q: '某个项目先用 Bundle 把 apply(ctx) 装进插件树，再用 Windows 目录链接和私有 Loader 接管模块解析。审计时应该怎么处理？',
      options: [
        '它有 Bundle manifest 外壳，整体按普通插件的生命周期审计就够了',
        '拆开两层分别审计：Bundle 装配按组合配置层看，用私有 Loader 接管模块解析属于非官方运行时补丁或注入器一类，需要额外公开基线提交、差异、权限、版本矩阵、回滚和卸载方式',
        'README 写明自己是插件就采信它的自称，不需要再看实际入口',
      ],
      answer: 1,
      explain: '「社区生态有六层」指出一个项目可以同时跨越多层：第 2 层公开扩展通常可按普通插件审计，第 6 层运行时改写改变的是宿主或进程本身；不能因为外壳有 manifest 就给整个项目贴上「普通插件」标签。',
      source: 'study/27-工具预算与插件责任决策卡.md#社区生态有六层',
    },
  ],
  '28-最小插件工作台': [
    {
      id: 'q1',
      q: '工作台 verify 成功输出的 unload 部分，真正作为卸载断言重点的是哪组字段？',
      options: [
        'result: PASS 和构建清单里的 SHA-256',
        'serviceAbsent: true（服务不再能从 Context 读取）和 entriesRemaining: 0（entry 数量为零）',
        'tickCount 继续增长，证明心跳计时器仍在后台运行',
      ],
      answer: 1,
      explain: '「运行真实 Loader 全流程」指出 serviceAbsent 和 entriesRemaining 才是卸载断言的重点；tickCount 只是插件定时器对实际生命周期的可观察信号，不是模型调用，也不是伪造的固定文本，卸载后应停止并被清理。',
      source: 'study/28-最小插件工作台.md#最小插件工作台构建--注册--卸载',
    },
    {
      id: 'q2',
      q: '如果构建失败导致 dist/minimal-plugin.js 不存在，正确的做法是什么？',
      options: [
        '不要手动创建 dist/minimal-plugin.js，先修复构建；运行器会拒绝缺少构建产物的状态',
        '手动新建一个空的 dist/minimal-plugin.js 让 verify 继续跑',
        '让 Loader 直接导入 src/minimal-plugin.ts 源文件来绕过构建',
      ],
      answer: 0,
      explain: '「先安装和构建」写明构建命令只编译 src/minimal-plugin.ts 并在被忽略的 build-manifest.json 记录入口和 SHA-256；产物缺失说明构建链路有问题，手工补一个假产物会让运行证据失效。',
      source: 'study/28-最小插件工作台.md#先安装和构建',
    },
    {
      id: 'q3',
      q: '这条「构建 → 真实 Loader 注册 → 卸载」实验的证明边界是什么？',
      options: [
        '证明了真实模型请求数为零意味着 token 成本已经下降',
        '证明了跨平台行为和生产发布门禁全部通过，可以直接分发给用户',
        '只证明了最小 Context/Loader 插件生命周期：entry 创建、Fiber 激活、服务读取和卸载清理；没有覆盖完整 Host/Web/CLI、profile/bundle 组合、第三方 npm 安装、真实模型或生产门禁',
      ],
      answer: 2,
      explain: '「证据边界」一节限定它是固定源码仓库中的最小运行证据：真实 Host/Web 端口、凭据、子进程、跨平台行为和生产发布门禁都不在其内，提升为可分发扩展还要按插件测试与卸载证据补齐更多层次。',
      source: 'study/28-最小插件工作台.md#证据边界',
    },
  ],
  '28-最小插件示例与学习检查': [
    {
      id: 'q1',
      q: 'minimal-observer-plugin 的 demo、test、lint 三条命令全部成功后，能得到什么结论？',
      options: [
        '示例自身的行为断言和 JavaScript 静态规则通过；仍然不能写成真实 DSH 已加载该插件',
        '真实 DSH 的 Profile 和 Loader 已经在进程里加载了这个 Bundle',
        '模型收到的 token 数量已经减少，插件对性能有正向收益',
      ],
      answer: 0,
      explain: '「第二步：先运行两个确定性检查」说明 demo 只用一个很小的 fake context 发出公开事件，没有启动 DSH、Profile、Loader、provider 或模型；三条命令成功只证明学习示例自己的行为和语法规则。',
      source: 'study/28-最小插件示例与学习检查.md#最小插件示例与学习检查',
    },
    {
      id: 'q2',
      q: '把 cordis.patch.yml 里的 maxPreviewCharacters 从 160 改成 80 之后，还应怎么做？',
      options: [
        '什么都不用做，单元测试会自动跟随配置文件变化',
        '顺手把 src/index.js 里的默认预览长度也改成 80 保持一致',
        '把测试里直接传给 apply(ctx, config) 的对应输入值和预期同步改成 80，不动 src/index.js 的默认值；练习结束后恢复原值或保存到自己的分支',
      ],
      answer: 2,
      explain: '「第三步：做一次安全修改」的核心是体验「测试和配置一起维护」：只改配置而不更新受测输入，或只改测试而没有对应行为，都无法构成有效验证；默认值不属于这次练习要动的部分。',
      source: 'study/28-最小插件示例与学习检查.md#最小插件示例与学习检查',
    },
    {
      id: 'q3',
      q: '这一课为什么说最小观察示例比「大而全 demo」更适合作为第一步？',
      options: [
        '因为大 demo 无法在本地安装，只能阅读代码',
        '大 demo 往往同时包含 Profile、Web UI、模型、文件、网络、子进程等，第一次失败时无法定位原因；这个示例只留一个公开事件和一个纯函数，每个失败都能先在本地解释',
        '因为它自带热重载和真实模型调用，功能更完整',
      ],
      answer: 1,
      explain: '「这套示例为什么比“大而全 demo”更适合第一步」对比了两者的排错成本：最小示例把变量减到最少，等你能说清证据边界后，再按同样结构逐步增加工具、限制和 Loader 卸载例子。',
      source: 'study/28-最小插件示例与学习检查.md#这套示例为什么比大而全-demo更适合第一步',
    },
  ],
  '29-研究与-Debug-协作': [
    {
      id: 'q1',
      q: 'Debug 工具单独下载、用户没有提供任何 evidence 时，research-bridge 会发生什么？',
      options: [
        '它会扫描用户的系统和文件，帮忙自动找到可能可用的 repro',
        '返回 UNAVAILABLE；只有用户把文件路径明确交给 Debug，才会发生一次本地文件读取，它不会扫描系统来“帮你找”',
        '主动连接课程网站索取 request 并上传本机诊断信息',
      ],
      answer: 1,
      explain: '「先记住边界」列出四条必须同时成立的事实：协作链只通过 diagnostic-request.json 和 diagnostic-result.json 两个文件交接，没有 loopback、HTTP、WebSocket、共享数据库或常驻 watcher，实时 RPC 需要另立设计而不是从这个协议推断。',
      source: 'study/29-研究与-Debug-协作.md#先记住边界',
    },
    {
      id: 'q2',
      q: 'requestedChecks 当前只有 coverage、privacy、integrity 三项，它们分别检查什么？',
      options: [
        'coverage 检查 source kind 覆盖；privacy 检查 repro 的 metadata-only 声明；integrity 用同目录 manifest 核对 repro.json 的 SHA-256',
        '三项分别检查网络连通性、页面样式和构建耗时',
        'coverage 检查模型回答质量；privacy 检查 token 数量；integrity 检查语言流畅度',
      ],
      answer: 0,
      explain: '「第四步：回到网站导入 result」说明未知或重复 check 会 fail-closed；repro-export 旁没有 manifest.json 时显示 integrity=absent warning，而不是声称哈希已验证。',
      source: 'study/29-研究与-Debug-协作.md#研究与-debug-协作一份-request另一份-result',
    },
    {
      id: 'q3',
      q: 'bridge 返回 COMPLETE 且 result 里 evidence.trust 为 declared-metadata-only，这说明什么？',
      options: [
        '原始 Session 确实存在，故障已被 Debug 工具修复',
        '生产 DSH Web 已经验证通过，结论可以推广到所有模型和平台',
        'repro 合法、要求的 source kind 都在显式 repro 中、每项 requested check 都是 PASS；但结果只对这份脱敏 artifact 的声明和覆盖范围负责，不证明原始 Session 存在、课程描述的 trace 真的发生过或目标已被修复',
      ],
      answer: 2,
      explain: '「第四步：回到网站导入 result」强调 COMPLETE 不是「故障已修复」：trust 等于 declared-metadata-only 表示只对显式 artifact 负责，真实运行时事实仍需要 Host/Session 层的证据。',
      source: 'study/29-研究与-Debug-协作.md#研究与-debug-协作一份-request另一份-result',
    },
  ],
}
