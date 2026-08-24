/**
 * 六个小缝实验页的共享配置。
 *
 * 每个条目描述一个页面的全部差异：标题、预测门、控件、指标与配套课链接。
 * 渲染逻辑在 small-seams-runtime.js；HTML 外壳由 study-tools/gen-small-seams.mjs
 * 从同一份配置生成——改一处，三处同步。
 */

/** 与 time-model.js 的 TIME_ZONES 保持一致（避免跨模块耦合）。 */
const SMALL_SEAM_TIME_ZONES = ['Asia/Shanghai', 'UTC', 'America/New_York']

export const SMALL_SEAMS_LABS = {
  preset: {
    title: 'Agent 预设实验室',
    modelModule: './preset-model.js',
    buildFn: 'buildPresetModel',
    oracleFn: 'evaluatePresetOracle',
    eyebrow: 'DSH 学习 · 预设与组合',
    h1: '预设装载一次，所有 agent 加入同一份。',
    lead: '每个预设的 cordis.yml 以常驻挂载方式装载一次：插件实例、工具注册、prompt 分区只存在一份，agent 通过作用域父子关系加入而非复制。没有 agent 的冷读也按 preset id 解析到同一批注册。',
    lessonHref: './study/lessons/02-Cordis与插件树.html',
    lessonLabel: '阅读配套课程',
    siblingHref: './mcp-lab.html',
    siblingLabel: '打开 MCP 客户端实验',
    warning: '规则取自上游 agent-presets 源码（基线 aa6c361a）；页面不加载真实 cordis.yml。',
    gate: {
      q: '两个 agent 加入同一个预设后，运行时里有几份插件实例？',
      options: [
        ['two', '两份——每个会话一份独立副本'],
        ['one', '一份——常驻挂载被所有加入者共享'],
        ['zero', '零份——预设只是配置文本，不会实例化'],
      ],
      correct: 'one',
      explain: {
        one: 'PR_MOUNT_ONCE 校验钉住了它：挂载恰好发生一次，N 个加入者共享。',
        two: '那是「每会话一份」的旧世界；预设的存在意义就是消除这种重复。',
        zero: '预设会真实实例化插件——只是只做一次。',
      },
      hint: '线索：顶注里的关键词是「mounted ONCE per preset」。',
    },
    controls: [
      { kind: 'range', id: 'agents', label: '加入的 agent 数', min: 1, max: 3, step: 1, value: 2, out: true },
      { kind: 'select', id: 'presetId', label: '预设', options: PRESET_CATALOG_OPTIONS() },
      { kind: 'check', id: 'duplicateMount', label: '再次装载同名预设（观察拒绝）' },
    ],
    metrics: [['分叉形态', 'forkShape'], ['挂载份数', 'mountCount'], ['agent 数', 'agents'], ['实例副本', 'instanceCopies'], ['冷读一致', 'coldReadResolvesSame']],
    stateSchema: {
      agents: { integerRange: [1, 3] },
      presetId: { enum: PRESET_CATALOG_IDS() },
      duplicateMount: { boolean: true },
    },
  },
  checkpoint: {
    title: '检查点策略实验室',
    modelModule: './checkpoint-model.js',
    buildFn: 'buildCheckpointModel',
    oracleFn: 'evaluateCheckpointOracle',
    eyebrow: 'DSH 学习 · 持久化时机',
    h1: '三个检查点钉住三种进度，崩溃只能吃掉没落盘的部分。',
    lead: 'session-checkpoint-policy 在三个语义时刻落盘：adapter 派发前的请求前缀、工具主体执行前已记录的调用、下一个请求边界结算的已完成步骤。检查点拒绝会阻止派发——不会出现没落盘就发出的请求。',
    lessonHref: './study/lessons/05-Session日志与恢复.html',
    lessonLabel: '阅读配套课程',
    siblingHref: './session-log-lab.html',
    siblingLabel: '打开 Session 日志重放实验',
    warning: '规则取自上游 checkpoint-policy 源码（基线 aa6c361a）；页面不写真实存储。',
    gate: {
      q: '关闭全部检查点、在第 4 拍崩溃——重启后能恢复几拍？',
      options: [
        ['three', '3 拍——日志天然是 durable 的'],
        ['zero', '0 拍——没有检查点就没有可重放的内容'],
        ['four', '4 拍——崩溃前的都算'],
      ],
      correct: 'zero',
      explain: {
        zero: '本模型的持久化完全由检查点驱动：关闭即从零开始。',
        three: '那正是启用时的行为——三个时刻各留一个锚点。',
        four: '「崩溃前的都算」恰恰是被否定的假设：没过检查点的拍子不算数。',
      },
      hint: '线索：这个缝存在的意义就是定义「什么时候才算存上了」。',
    },
    controls: [
      { kind: 'range', id: 'crashAt', label: '在第几拍崩溃（0 = 不崩溃）', min: 0, max: 6, step: 1, value: 3, out: true },
      { kind: 'check', id: 'checkpointsEnabled', label: '启用检查点策略', value: true },
    ],
    metrics: [['分叉形态', 'forkShape'], ['最后 durable 拍', 'lastDurableTick'], ['可恢复拍数', 'recoverableCount'], ['可从日志重放', 'replayableFromLog']],
    stateSchema: {
      crashAt: { integerRange: [0, 6] },
      checkpointsEnabled: { boolean: true },
    },
  },
  identity: {
    title: '匿名身份实验室',
    modelModule: './identity-model.js',
    buildFn: 'buildIdentityModel',
    oracleFn: 'evaluateIdentityOracle',
    eyebrow: 'DSH 学习 · 身份与隐私',
    h1: '身份跟着 harness home 走，不跟机器走。',
    lead: '匿名 id 是一个随机 UUID，以裸行存在 $DSH_HOME/.anonymous-user-id 里——绝不从主机名、网络地址或 git remote 派生。删掉文件，下次启动铸造全新身份；运行中删除则不影响已记忆的读数。',
    lessonHref: './study/lessons/07-HostClient示例测试发布.html',
    lessonLabel: '阅读配套课程',
    siblingHref: './settings-lab.html',
    siblingLabel: '打开设置热发布实验',
    warning: '规则取自上游 anonymous-user-id 源码（基线 aa6c361a）；页面不碰真实文件系统。',
    gate: {
      q: '进程已经读过一次 id 之后，文件被外部删除——同进程再读一次得到什么？',
      options: [
        ['fresh', '全新 UUID——文件没了就重新铸造'],
        ['memo', '原来的 id——结果已按进程记忆，不再碰磁盘'],
        ['error', '抛错——找不到身份文件是致命错误'],
      ],
      correct: 'memo',
      explain: {
        memo: 'ID_PROCESS_MEMO 校验钉住了它：一个进程只碰一次磁盘。',
        fresh: '那是下一次启动的行为；运行中的进程有记忆。',
        error: '缺失文件在首次读取时会铸造新 id，永远不会抛错。',
      },
      hint: '线索：顶注说结果是「memoized per resolved file path」。',
    },
    controls: [
      { kind: 'select', id: 'home', label: 'harness home', options: [['home-a', '~/.dsh'], ['home-b', '/other/dsh']] },
      { kind: 'check', id: 'fileExists', label: '.anonymous-user-id 文件存在', value: true },
      { kind: 'check', id: 'sameProcess', label: '同一个进程第二次读取' },
    ],
    metrics: [['分叉形态', 'forkShape'], ['当前 id', 'id']],
    stateSchema: {
      home: { enum: ['home-a', 'home-b'] },
      fileExists: { boolean: true },
      sameProcess: { boolean: true },
    },
  },
  time: {
    title: '时间上下文实验室',
    modelModule: './time-model.js',
    buildFn: 'buildTimeModel',
    oracleFn: 'evaluateTimeOracle',
    eyebrow: 'DSH 学习 · 时间上下文',
    h1: '钟表可以给模型看，但要署名来源与时区。',
    lead: '选择加入后，符合条件的步骤会把一条带来源归因的时间读数追加进请求历史——作为 durable 用户消息入册，重放原样回来。未加入的轮次，历史完全不变。',
    lessonHref: './study/lessons/06-LLM与工具执行.html',
    lessonLabel: '阅读配套课程',
    siblingHref: './client-lab.html',
    siblingLabel: '打开 Client 三面镜实验',
    warning: '规则取自上游 time-context 源码（基线 aa6c361a）；页面不读真实时钟。',
    gate: {
      q: '关掉选择加入开关之后，请求历史里还有时间读数吗？',
      options: [
        ['kept', '有——之前注入的读数已经是 durable 历史'],
        ['gone', '没有了——opt-in 关闭会撤掉历史里的时间'],
        ['partial', '只剩最后一条'],
      ],
      correct: 'kept',
      explain: {
        kept: 'TC_DURABLE_IN_HISTORY 校验钉住了它：入册的消息随日志重放回来，开关管的是「以后还注入吗」。',
        gone: 'durable 的意思是不可撤回——这正是第 05 课那条不变式。',
        partial: '不存在选择性删除；要么都在，要么不再新增。',
      },
      hint: '线索：「durable 用户消息」这五个字怎么读？',
    },
    controls: [
      { kind: 'select', id: 'timezone', label: '时区', options: SMALL_SEAM_TIME_ZONES.map(tz => [tz, tz]) },
      { kind: 'range', id: 'clockDriftMinutes', label: '时钟偏差（分钟）', min: -720, max: 720, step: 15, value: 0, out: true },
      { kind: 'select', id: 'turns', label: '对话轮数', options: [['1', '一轮'], ['2', '两轮（对比时间流逝）']] },
      { kind: 'check', id: 'optIn', label: '选择加入时间上下文', value: true },
    ],
    metrics: [['分叉形态', 'forkShape'], ['注入条数', 'injectedCount']],
    stateSchema: {
      timezone: { enum: [...SMALL_SEAM_TIME_ZONES] },
      clockDriftMinutes: { integerRange: [-720, 720] },
      turns: { integerRange: [1, 2] },
      optIn: { boolean: true },
    },
  },
  attachment: {
    title: '图片附件实验室',
    modelModule: './attachment-model.js',
    buildFn: 'buildAttachmentModel',
    oracleFn: 'evaluateAttachmentOracle',
    eyebrow: 'DSH 学习 · 附件存储',
    h1: '超限的图在保存处就被拒收，引用根本不会诞生。',
    lead: 'ctx.attachments 是持久附件缝：saveImage 校验尺寸限制后写入存储并返回可持久化的引用；按引用取回受 RequestPolicy 管辖——存储与「能否进入上下文」是两个决定。',
    lessonHref: './study/lessons/06-LLM与工具执行.html',
    lessonLabel: '阅读配套课程',
    siblingHref: './spill-lab.html',
    siblingLabel: '打开溢出转储实验',
    warning: '规则取自上游 attachment 源码（基线 aa6c361a）；页面不处理真实图片字节。',
    gate: {
      q: '保存一张超过 ImageAttachmentLimits 的图，返回值里有什么？',
      options: [
        ['ref', '有一个引用，指向截断后的图'],
        ['no-ref', '什么都没有——fail loud 且不产生引用'],
        ['error-flag', '引用还在，但带一个错误标记位'],
      ],
      correct: 'no-ref',
      explain: {
        'no-ref': 'AT_NO_REF_ON_REJECT 校验钉住了它：拒收时零引用，绝不留下半个句柄。',
        ref: '截断不属于这里——尺寸限制是保存门槛，不是压缩器。',
        'error-flag': '半真半假的引用比没有更危险：设计上不给。',
      },
      hint: '线索：仓库规则「Misconfiguration fails loud」对超限输入同样生效。',
    },
    controls: [
      { kind: 'range', id: 'imageBytes', label: '图片大小', min: 100, max: 5000, step: 50, value: 800, out: true },
      { kind: 'range', id: 'maxBytes', label: '尺寸上限', min: 200, max: 4000, step: 50, value: 1200, out: true },
      { kind: 'check', id: 'requestAllowed', label: 'RequestPolicy 允许取回', value: true },
    ],
    metrics: [['分叉形态', 'forkShape'], ['存储结果', 'requestOutcome'], ['工件字节', 'storedBytes']],
    stateSchema: {
      imageBytes: { integerRange: [100, 5000] },
      maxBytes: { integerRange: [200, 4000] },
      requestAllowed: { boolean: true },
    },
  },
  feedback: {
    title: '消息反馈实验室',
    modelModule: './feedback-model.js',
    buildFn: 'buildFeedbackModel',
    oracleFn: 'evaluateFeedbackOracle',
    eyebrow: 'DSH 学习 · 反馈闭环',
    h1: '反馈按消息 id 归档：重复评价是更新，不是追加。',
    lead: 'message-feedback 把用户反馈绑定到已定稿的 assistant message 上，按消息 id upsert 进 KV 表并随会话持久化。流式中的半截回答不在可评范围——生命周期绑定意味着只能评价完成的东西。',
    lessonHref: './study/lessons/05-Session日志与恢复.html',
    lessonLabel: '阅读配套课程',
    siblingHref: './trajectory-lab.html',
    siblingLabel: '打开 Trajectory 投影实验',
    warning: '规则取自上游 message-feedback 源码（基线 aa6c361a）；页面不写真实 KV 存储。',
    gate: {
      q: '同一条消息上点了三次「有用」——KV 表里有几条记录？',
      options: [
        ['three', '三条——每次点击都是一条新反馈'],
        ['one', '一条——按消息 id upsert，后一次覆盖前一次'],
        ['zero', '零条——反馈只在会话结束才批量写入'],
      ],
      correct: 'one',
      explain: {
        one: 'FB_LIFECYCLE_BOUND 校验钉住了它：upsert 语义让重复评价收敛为一条记录。',
        three: '追加式会让「撤销反馈」变成猜谜；设计选择了更新。',
        zero: '反馈随操作即时持久化，不是批处理。',
      },
      hint: '线索：如果允许追加，「取消反馈」该怎么表达？',
    },
    controls: [
      { kind: 'select', id: 'action', label: '动作', options: [['rate-up', '有用'], ['rate-down', '没用'], ['clear', '清除反馈']] },
      { kind: 'check', id: 'finalized', label: '消息已定稿', value: true },
    ],
    metrics: [['分叉形态', 'forkShape'], ['产生记录', 'recorded']],
    stateSchema: {
      action: { enum: ['rate-up', 'rate-down', 'clear'] },
      finalized: { boolean: true },
    },
  },
}

function PRESET_CATALOG_OPTIONS() {
  return [['research', 'research（检索 + 引用）'], ['writer', 'writer（长文 + 校对）']]
}
function PRESET_CATALOG_IDS() {
  return PRESET_CATALOG_OPTIONS().map(option => option[0])
}
