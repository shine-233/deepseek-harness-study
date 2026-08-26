/**
 * 六个小缝实验页的共享配置。
 *
 * 每个条目描述一个页面的全部差异：标题、预测门、控件、指标、步骤标签、
 * 概念阶梯与配套课链接。渲染逻辑在 small-seams-runtime.js；HTML 外壳由
 * study-tools/gen-small-seams.mjs 从同一份配置生成——改一处，三处同步。
 */

import { buildPresetModel } from './preset-model.js'
import { buildCheckpointModel } from './checkpoint-model.js'
import { buildIdentityModel } from './identity-model.js'
import { buildFeedbackModel } from './feedback-model.js'
import { buildTimeModel } from './time-model.js'
import { buildAttachmentModel } from './attachment-model.js'

/** 把模型步骤收窄成轨迹引擎需要的 {lane,phase,detail,index}。 */
const traceOf = build => input => build(input).steps.map(step => ({
  lane: step.lane,
  phase: step.phase,
  detail: step.detail,
  index: step.index,
}))

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
    stepLabels: [
      ['mount-once', '装载一次'],
      ['duplicate-rejected', '再次装载被拒'],
      ['join', '声明加入'],
      ['bind-scope', '挂接作用域'],
      ['shared-instance', '实例只有一份'],
      ['capabilities-visible', '工具视图就绪'],
    ],
    ladder: {
      title: '三级台阶，从常驻挂载到按名加入',
      rungs: [
        {
          id: 'mount',
          title: '装载一次：整个运行时只有一份',
          text: '预设的 cordis.yml 以常驻挂载方式装进运行时：插件实例、工具注册、prompt 分区都只存在一份。后面的 agent 全部在这份挂载上加入。',
          apply: { agents: 1 },
          traces: [{ id: 'mount', label: '单 agent 加入', steps: traceOf(buildPresetModel)({ agents: 1 }) }],
        },
        {
          id: 'join',
          title: '加入而不是复制：作用域父子关系',
          text: '每个 agent 把自己的作用域键挂到挂载的作用域下——挂载的注册对它可见，监听器也能收到它的事件。两个 agent 加入之后，实例仍然只有一份。',
          apply: { agents: 2 },
          traces: [{ id: 'join', label: '双 agent 加入', steps: traceOf(buildPresetModel)({ agents: 2 }), focusPhases: ['bind-scope', 'capabilities-visible'] }],
        },
        {
          id: 'reject',
          title: '再次装载同名预设会被拒',
          text: '第二个同名挂载被直接拒绝：一个预设就是一份组合，不是每会话一份副本。要不同的组合，定义另一个预设。',
          apply: { agents: 1, duplicateMount: true },
          traces: [{ id: 'reject', label: '重复装载', steps: traceOf(buildPresetModel)({ agents: 1, duplicateMount: true }), focusPhases: ['duplicate-rejected'] }],
        },
      ],
    },
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
    stepLabels: [
      ['checkpoint', '落一个检查点'],
      ['crash', '进程崩溃'],
      ['request-issued', '发出请求'],
      ['tool-dispatched', '执行工具'],
      ['request-2', '发出第二次请求'],
      ['answer', '产生回答'],
      ['turn-end', '回合结束'],
    ],
    ladder: {
      title: '三级台阶，从落盘时机到可恢复边界',
      rungs: [
        {
          id: 'moments',
          title: '三个语义时刻各落一个检查点',
          text: '检查点策略钉住三个时刻：模型请求前、顶层工具派发前、下一请求边界。检查点先于同拍动作——先留痕，再执行。',
          apply: { crashAt: 6 },
          traces: [{ id: 'full', label: '完整一拍', steps: traceOf(buildCheckpointModel)({ crashAt: 6 }), focusPhases: ['checkpoint'] }],
        },
        {
          id: 'crash',
          title: '中途崩溃：只丢最后一个检查点之后的部分',
          text: '进程在第 4 拍崩溃：此前已到达的语义时刻都 durable 了。恢复时从最后的检查点原样重放，不从零开始。',
          apply: { crashAt: 4 },
          traces: [{ id: 'crash4', label: '第 4 拍崩溃', steps: traceOf(buildCheckpointModel)({ crashAt: 4 }), focusPhases: ['crash'] }],
        },
        {
          id: 'off',
          title: '关掉检查点：崩溃即清零',
          text: '同样的崩溃位置，关闭策略后什么也没留下——持久层没有可重放的内容。「可恢复」的全部前提是把语义时刻先写下来。',
          apply: { crashAt: 4, checkpointsEnabled: false },
          traces: [{ id: 'disabled', label: '无检查点', steps: traceOf(buildCheckpointModel)({ crashAt: 4, checkpointsEnabled: false }) }],
        },
      ],
    },
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
    stepLabels: [
      ['read', '请求身份'],
      ['memo-hit', '命中进程记忆'],
      ['disk-read', '读自文件'],
      ['stored', '文件保持原样'],
      ['file-gone-note', '文件已不在'],
      ['mint', '铸造新身份'],
      ['fresh-identity', '全新身份生效'],
    ],
    ladder: {
      title: '三级台阶，从读盘到铸造',
      rungs: [
        {
          id: 'disk',
          title: '首次读取：id 住在 harness home 的一个文件里',
          text: '匿名 id 是随机 UUID，以裸行形式存在 home 的 .anonymous-user-id 里。新进程第一次读取走磁盘；id 与主机名、网络地址、git remote 无关。',
          apply: { fileExists: true, sameProcess: false },
          traces: [{ id: 'disk', label: '新进程读盘', steps: traceOf(buildIdentityModel)({ fileExists: true, sameProcess: false }), focusPhases: ['disk-read'] }],
        },
        {
          id: 'memo',
          title: '同一进程只碰一次磁盘',
          text: '读取结果按解析后的路径记忆在进程内。第二次请求直接返回记忆中的 id——运行期间不再碰文件系统。',
          apply: { fileExists: true, sameProcess: true },
          traces: [{ id: 'memo', label: '同进程复读', steps: traceOf(buildIdentityModel)({ fileExists: true, sameProcess: true }), focusPhases: ['memo-hit'] }],
        },
        {
          id: 'mint',
          title: '删掉文件：下次启动铸造全新身份',
          text: '身份跟着 home 走，不跟机器走。文件缺失且无记忆时铸造新的随机 UUID 写回原路径，与删除前的任何 id 都无关。',
          apply: { fileExists: false, sameProcess: false },
          traces: [{ id: 'mint', label: '缺失即铸造', steps: traceOf(buildIdentityModel)({ fileExists: false, sameProcess: false }), focusPhases: ['mint', 'fresh-identity'] }],
        },
      ],
    },
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
    stepLabels: [
      ['pre-step', '轮前决策'],
      ['skipped', '本轮跳过'],
      ['inject', '注入时间读数'],
      ['drift-attributed', '偏差带归因'],
      ['logged-durable', '读数入历史'],
    ],
    ladder: {
      title: '三级台阶，从注入到入册',
      rungs: [
        {
          id: 'inject',
          title: '选择加入的轮次才注入',
          text: '每一轮的 pre-step 决策点先问「这一轮要给模型看钟表吗」。选择加入时，一条带来源的时间读数被追加进请求历史。',
          apply: { optIn: true, clockDriftMinutes: 0, turns: 1 },
          traces: [{ id: 'on', label: '已加入', steps: traceOf(buildTimeModel)({ optIn: true, turns: 1 }), focusPhases: ['pre-step', 'inject'] }],
        },
        {
          id: 'drift',
          title: '读数署名：来源与时区一起交给模型',
          text: '时钟偏差 90 分钟时，注入的读数带着归因说明。模型不仅知道现在几点，还知道这个数怎么来的、该打几折。',
          apply: { optIn: true, clockDriftMinutes: 90, turns: 1 },
          traces: [{ id: 'drift', label: '偏差 90 分钟', steps: traceOf(buildTimeModel)({ optIn: true, clockDriftMinutes: 90, turns: 1 }), focusPhases: ['drift-attributed'] }],
        },
        {
          id: 'durable',
          title: 'durable：关掉开关也撤不回历史',
          text: '已入册的读数是 durable 用户消息，重放原样回来；关闭 opt-in 只管「以后还注入吗」。未加入的轮次连 pre-step 注入都不发生，历史完全不变。',
          apply: { optIn: false, clockDriftMinutes: 0, turns: 2 },
          traces: [
            { id: 'two-on', label: '两轮都加入', steps: traceOf(buildTimeModel)({ optIn: true, turns: 2 }) },
            { id: 'all-off', label: '从未加入', steps: traceOf(buildTimeModel)({ optIn: false, turns: 2 }), focusPhases: ['skipped'] },
          ],
        },
      ],
    },
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
    stepLabels: [
      ['save-request', '请求保存图片'],
      ['limit-rejected', '超限拒收'],
      ['stored', '写入存储'],
      ['request-ok', '按引用取回'],
      ['request-denied', '策略拒绝取回'],
    ],
    ladder: {
      title: '三级台阶，从保存到取回',
      rungs: [
        {
          id: 'save',
          title: 'saveImage：校验尺寸，写入存储，返回引用',
          text: '保存一张 800 字节的图：尺寸校验通过后写入持久附件存储，返回一个可持久化的引用。引用可以进会话日志，字节不必跟着走。',
          apply: { imageBytes: 800, maxBytes: 1200, requestAllowed: true },
          traces: [{ id: 'ok', label: '800 / 上限 1200', steps: traceOf(buildAttachmentModel)({ imageBytes: 800, maxBytes: 1200 }) }],
        },
        {
          id: 'reject',
          title: '超限在保存处拒收：引用根本不会诞生',
          text: '把上限收到 500 再交同一张图：保存直接失败，零引用。fail loud 且不留半个句柄——半真半假的引用比没有更危险。',
          apply: { imageBytes: 800, maxBytes: 500, requestAllowed: true },
          traces: [{ id: 'reject', label: '超限拒收', steps: traceOf(buildAttachmentModel)({ imageBytes: 800, maxBytes: 500 }), focusPhases: ['limit-rejected'] }],
        },
        {
          id: 'policy',
          title: '存储了 ≠ 能进上下文：RequestPolicy 另算',
          text: '按引用取回受 RequestPolicy 管辖：策略拒绝时工件还在存储里，但不会进入请求。存与用是两个决定。',
          apply: { imageBytes: 800, maxBytes: 1200, requestAllowed: false },
          traces: [
            { id: 'allowed', label: '允许取回', steps: traceOf(buildAttachmentModel)({ imageBytes: 800, maxBytes: 1200, requestAllowed: true }) },
            { id: 'denied', label: '策略拒绝', steps: traceOf(buildAttachmentModel)({ imageBytes: 800, maxBytes: 1200, requestAllowed: false }), focusPhases: ['request-denied'] },
          ],
        },
      ],
    },
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
    stepLabels: [
      ['too-early', '消息未定稿'],
      ['rejected', '通道不开放'],
      ['act', '执行反馈动作'],
      ['upsert', '更新既有记录'],
      ['persisted', '随会话持久化'],
    ],
    ladder: {
      title: '三级台阶，从生命周期到 upsert',
      rungs: [
        {
          id: 'lifecycle',
          title: '定稿之后，通道才开放',
          text: '反馈绑定消息生命周期：只能评价已定稿的 assistant 消息。流式中的半截回答不接受反馈。',
          apply: { action: 'rate-up', finalized: false },
          traces: [{ id: 'early', label: '未定稿', steps: traceOf(buildFeedbackModel)({ finalized: false }), focusPhases: ['too-early'] }],
        },
        {
          id: 'upsert',
          title: '按消息 id upsert：更新而非追加',
          text: '用户点赞后，记录按消息 id 写进 KV 表。重复反馈改的是同一条记录——历史不会长出一串重复行。',
          apply: { action: 'rate-up', finalized: true },
          traces: [{ id: 'rate', label: '点赞', steps: traceOf(buildFeedbackModel)({ action: 'rate-up' }), focusPhases: ['upsert'] }],
        },
        {
          id: 'clear',
          title: 'clear 是删除，不是打零分',
          text: '清除动作移除该消息的反馈记录，之后推演里不再产生记录。评价与撤销是两个动作，共享同一个键。',
          apply: { action: 'clear', finalized: true },
          traces: [{ id: 'clear', label: '清除', steps: traceOf(buildFeedbackModel)({ action: 'clear' }) }],
        },
      ],
    },
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
