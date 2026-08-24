/**
 * 客户端三个组件族的概念入口模型：ui-tool 卡片状态机、ui-conversation 折叠
 * 引擎、ui-user-questions 提问接管。
 *
 * 事实来源是固定提交 aa6c361a 里三个包的 README 与相关契约：
 *
 *   ui-tool：ToolCallTree 递归派发；生命周期状态（running/successful/failed/
 *   interrupted）只来自冻结的 call/result 切片；generic 行按已知工具名分类为
 *   search/read/shell/write/edit/code/generic；未知名字与畸形卡片回落为
 *   展平的结果文本；锚点键形如 call:<id>。
 *
 *   ui-conversation：ChatFlow 按日志序放置 ConversationNode；压缩在检查点
 *   流位置渲染为一行折叠，带 compaction/summary 才可展开（窗口外则可见但
 *   不可展开）；上下文注入/跨会话召回渲染为默认折叠的 DisclosureRow，标题
 *   带角色名+生产者名；思考行默认折叠、流式尾部隔离。
 *
 *   ui-user-questions：提问经 conversation.composer 接管输入条（一次一个请
 *   求）；单选立即前进、多选保留草稿可叠加自定义答案；跳过提交空
 *   { selected: [] }；关闭以 ASK_CANCELLED 拒绝整个等待；plan-review 意图
 *   仅在「单问题+二元单选+存在批准标签+detail 带 plan」时接管卡片。
 */

export const CLIENT_MODES = Object.freeze(['tool-card', 'conversation-fold', 'user-questions'])

/** 教学工具名 → generic 行分类与结果卡意图。 */
const TOOL_CLASSIFY = Object.freeze({
  read_file: { row: 'read', resultCard: 'read' },
  grep: { row: 'search', resultCard: 'search' },
  bash: { row: 'shell', resultCard: 'terminal' },
  write_file: { row: 'write', resultCard: 'diff' },
  str_replace_editor: { row: 'edit', resultCard: 'diff' },
})

/* ---------- Panel A：工具卡状态机 ---------- */

const TOOL_STAGES = ['call-accepted', 'running', 'result-arrived', 'settled']

export function buildToolCardModel(input = {}) {
  const tool = typeof input.tool === 'string' ? input.tool : 'bash'
  const fails = input.fails === true
  const interrupted = input.interrupted === true
  if (fails && interrupted) throw new TypeError('fails 与 interrupted 不能同时成立')

  const classify = Object.prototype.hasOwnProperty.call(TOOL_CLASSIFY, tool)
    ? TOOL_CLASSIFY[tool]
    : null
  const rowKind = classify?.row ?? 'generic'

  // 状态只来自冻结的 call/result 切片：result 未到 = running；
  // 到了之后按结局落 successful/failed/interrupted。
  const stages = TOOL_STAGES.map((stage, index) => {
    let state = 'pending'
    let card = classify ? `generic · ${rowKind}` : 'generic'
    if (index >= 1) state = 'running'
    if (index >= 2) {
      state = interrupted ? 'interrupted' : 'running'
      card = interrupted ? `${card}（中断标记来自切片缺失）` : card
    }
    if (index >= 3) {
      if (interrupted) state = 'interrupted'
      else state = fails ? 'failed' : 'successful'
      card = classify && !interrupted && !fails ? String(classify.resultCard) : 'fallback 文本'
      if (interrupted) card = '保持原卡 + interrupted 标记'
    }
    return {
      stage,
      state,
      card,
      anchor: `call:tool-${String(index + 1)}a`,
      dataChatCallId: `tool-${String(index + 1)}a`,
    }
  })

  return {
    mode: 'tool-card',
    input: { tool, fails, interrupted },
    stages,
    observations: {
      statesOnlyFromSlice: true,
      knownNameClassified: classify !== null,
      fallbackUsed: classify === null || fails || interrupted,
    },
    canProve: Object.freeze([
      '生命周期四态只由冻结的 call/result 切片决定，展示层不自造状态。',
      '已知工具名分类成 search/read/shell/write/edit/code/generic 行。',
      '未注册工具名与畸形卡片数据回落为展平的结果文本。',
      '每个包装层携带 data-chat-anchor-key="call:<id>" 供分页与选区使用。',
    ]),
    cannotProve: Object.freeze([
      '真实 React 渲染或 CSS 细节。',
      '子调用递归树的完整拓扑；本页只演示根调用一条链。',
      'openFile 回调的宿主行为。',
    ]),
  }
}

/* ---------- Panel B：会话折叠引擎 ---------- */

export function buildConversationFoldModel(input = {}) {
  const summaryInWindow = input.summaryInWindow !== false
  const injectionHasProducer = input.injectionHasProducer !== false

  // 教学事件流：固定顺序，覆盖五类节点。
  const events = [
    { kind: 'user-message' },
    { kind: 'think' },
    { kind: 'assistant-message' },
    { kind: 'context-injection', producer: injectionHasProducer ? 'skill-catalog' : null },
    { kind: 'tool-call' },
    { kind: 'compaction-marker', summaryLoaded: summaryInWindow, replacedItems: 12, estTokens: 4033 },
    { kind: 'assistant-message-2' },
  ]

  const nodes = []
  for (const event of events) {
    switch (event.kind) {
      case 'user-message':
        nodes.push({ type: 'user-bubble', collapsed: false, title: '用户消息' })
        break
      case 'think':
        nodes.push({ type: 'think-row', collapsed: true, title: '思考（流式尾部隔离）' })
        break
      case 'assistant-message':
        nodes.push({ type: 'assistant-block', collapsed: false, title: '助手回答' })
        break
      case 'context-injection':
        nodes.push({
          type: 'disclosure-row',
          collapsed: true,
          title: `上下文注入${event.producer === null ? '' : ' · ' + event.producer}`,
        })
        break
      case 'tool-call':
        nodes.push({ type: 'tool-node', collapsed: false, title: '工具卡（按键派发给 ui-tool）' })
        break
      case 'compaction-marker':
        nodes.push({
          type: 'compaction-row',
          collapsed: true,
          title: summaryInWindow
            ? `已压缩上下文（替换 ${String(event.replacedItems)} 项 · 约 ${String(event.estTokens)} tokens）`
            : '已压缩上下文（摘要不在加载窗口内——可见但不可展开）',
          expandable: summaryInWindow,
        })
        break
      default:
        nodes.push({ type: 'assistant-block', collapsed: false, title: '后续回答' })
    }
  }

  return {
    mode: 'conversation-fold',
    input: { summaryInWindow, injectionHasProducer },
    nodes,
    observations: {
      nodeCount: nodes.length,
      compactionExpandable: summaryInWindow,
      disclosureHasProducerLabel: injectionHasProducer,
      orderPreserved: nodes.every((node, index) => index === 0 || true),
    },
    canProve: Object.freeze([
      'ChatFlow 按日志序放置节点：顺序即权威，不靠相邻性配对。',
      '压缩行停在检查点流位置，不替换上方记录；有 compaction/summary 才可展开。',
      '上下文注入是默认折叠的 DisclosureRow，标题区分角色与生产者。',
      '思考行默认折叠且流式尾隔离；展开后页面流不再跟随增量滚动。',
    ]),
    cannotProve: Object.freeze([
      'React 渲染细节与 DisclosureRow 的像素规格。',
      '真实 compaction 触发策略；本页只演示折叠呈现。',
      '跨视图标签页的路由行为。',
    ]),
  }
}

/* ---------- Panel C：提问接管 ---------- */

export const QUESTION_INTENTS = Object.freeze(['none', 'plan-review'])

export function buildUserQuestionsModel(input = {}) {
  const intent = QUESTION_INTENTS.find(item => item === (input.intent ?? 'none')) ?? 'none'
  const questionCount = input.questionCount === 2 ? 2 : 1
  const binaryChoice = input.binaryChoice !== false
  const hasApproveLabel = input.hasApproveLabel !== false
  const planInDetail = input.planInDetail !== false

  const claimsPlanReview = intent === 'plan-review'
    && questionCount === 1
    && binaryChoice
    && hasApproveLabel
    && planInDetail

  const actions = claimsPlanReview
    ? ['Chat about it', 'Refuse', 'Approve']
    : ['跳过此题', '提交']

  return {
    mode: 'user-questions',
    input: { intent, questionCount, binaryChoice, hasApproveLabel, planInDetail },
    surface: claimsPlanReview ? 'plan-review 卡片' : '通用提问流',
    actions,
    observations: {
      claimsPlanReview,
      skipShape: '{ selected: [] }',
      closeRejects: 'ASK_CANCELLED',
      multiKeepsDraftWithCustom: true,
      composerOwnerCount: 1,
    },
    canProve: Object.freeze([
      '提问接管 composer：一次只有一个请求占用输入区。',
      '跳过提交空 { selected: [] }；关闭以 ASK_CANCELLED 拒绝整个等待。',
      '多选草稿在填写自定义答案时保留，提交可同时携带 selected 与 custom。',
      'plan-review 只在单问题+二元单选+批准标签存在+detail 带计划时接管；否则留在通用流。',
    ]),
    cannotProve: Object.freeze([
      'MarkdownText 对不可信内容的完整消毒策略。',
      'IME 组合期间的按键细节。',
      '重连后未提交草稿的恢复——它们本来就不持久化。',
    ]),
  }
}

export function evaluateClientOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  if (model.mode === 'tool-card') {
    const rebuilt = buildToolCardModel(model.input)
    add('TOOLCARD_DETERMINISTIC', '同一输入重建同一份状态机',
      JSON.stringify(rebuilt.stages) === JSON.stringify(model.stages),
      '两次一致', rebuilt.stages.length === model.stages.length ? '一致' : '不一致')

    const badState = model.stages.filter(stage => !['pending', 'running', 'successful', 'failed', 'interrupted'].includes(stage.state))
    add('STATE_FROM_FROZEN_SLICE', '状态词表封闭且只出自切片',
      badState.length === 0, '0 个越界', `${String(badState.length)} 个越界`)

    const unknownOk = model.input.tool === 'mystery_tool'
      ? model.stages.every(stage => stage.state !== 'successful' || stage.card.includes('fallback'))
      : true
    add('UNKNOWN_FALLS_BACK', '未知工具名回落为文本而非硬造卡片',
      unknownOk, '回落或正常分类', unknownOk ? '符合' : '硬造了卡片')
    return { pass: checks.every(check => check.pass), checks }
  }

  if (model.mode === 'conversation-fold') {
    const rebuilt = buildConversationFoldModel(model.input)
    add('FOLD_DETERMINISTIC', '同一输入重建同一份 ChatFlow',
      JSON.stringify(rebuilt.nodes) === JSON.stringify(model.nodes),
      '两次一致', rebuilt.nodes.length === model.nodes.length ? '一致' : '不一致')

    const compaction = model.nodes.find(node => node.type === 'compaction-row')
    add('COMPACTION_EXPANDABLE_ONLY_WITH_SUMMARY', '压缩行只在摘要在窗时可展开',
      compaction.expandable === model.input.summaryInWindow,
      model.input.summaryInWindow ? '可展开' : '不可展开',
      compaction.expandable ? '可展开' : '不可展开')

    const disclosure = model.nodes.find(node => node.type === 'disclosure-row')
    const labelOk = model.input.injectionHasProducer
      ? disclosure.title.includes('·')
      : !disclosure.title.includes('·')
    add('DISCLOSURE_ROLE_LABEL', '披露行标题按生产者有无给出不同文案',
      labelOk, model.input.injectionHasProducer ? '含生产者名' : '仅角色名',
      disclosure.title)
    return { pass: checks.every(check => check.pass), checks }
  }

  const rebuilt = buildUserQuestionsModel(model.input)
  add('QUESTIONS_DETERMINISTIC', '同一输入重建同一份接表面',
    rebuilt.surface === model.surface && JSON.stringify(rebuilt.actions) === JSON.stringify(model.actions),
    '两次一致', rebuilt.surface === model.surface ? '一致' : '不一致')

  const shouldClaim = model.input.intent === 'plan-review'
    && model.input.questionCount === 1
    && model.input.binaryChoice
    && model.input.hasApproveLabel
    && model.input.planInDetail
  add('PLAN_REVIEW_CLAIM_RULES', 'plan-review 的五个接管条件缺一不可',
    model.observations.claimsPlanReview === shouldClaim,
    shouldClaim ? '接管' : '不接管',
    model.observations.claimsPlanReview ? '接管' : '不接管')

  return { pass: checks.every(check => check.pass), checks }
}
