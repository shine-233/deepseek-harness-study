/**
 * Trajectory 投影视角的纯模型：给定一段 Session 事件流，按客户端的呈现契约
 * 把它折叠成用户看到的卡片列表。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/core/tools/src/presentation.ts 的
 * 视图词表——工具调用卡（ToolCallView）只有三种：generic / terminal / diff；
 * 结果卡（ToolResultView）在此基础上多出 search 与 web 两族；search 工具的
 * 等待态没有匹配可展示，所以保持 generic 调用卡。文本块只在 assistant/message
 * 落册后定稿；流式 chunk 只允许改「打字中」预览，不能凭空造出最终块。
 *
 * 教学约定：事件流是固定教学数据；卡片标题与视图类别按上面的映射逐字给出。
 * 没有真实 UI、没有真实 React 组件、没有样式还原。
 */

export const TRAJECTORY_EVENTS = Object.freeze([
  Object.freeze({ index: 0, kind: 'user/message', detail: '帮我把超时改成 45 秒' }),
  Object.freeze({ index: 1, kind: 'assistant/chunk', detail: '我先看一下当前配置…' }),
  Object.freeze({ index: 2, kind: 'assistant/message', detail: '我先看一下当前配置…' }),
  Object.freeze({ index: 3, kind: 'tool/call', tool: 'read_file', argsPreview: '/workspace/config.yml' }),
  Object.freeze({ index: 4, kind: 'tool/result', tool: 'read_file', outcome: 'ok' }),
  Object.freeze({ index: 5, kind: 'assistant/chunk', detail: '找到了 timeout 行，直接替换。' }),
  Object.freeze({ index: 6, kind: 'assistant/message', detail: '找到了 timeout 行，直接替换。' }),
  Object.freeze({ index: 7, kind: 'tool/call', tool: 'str_replace_editor', argsPreview: 'timeout: 30s → 45s' }),
  Object.freeze({ index: 8, kind: 'tool/result', tool: 'str_replace_editor', outcome: 'ok' }),
  Object.freeze({ index: 9, kind: 'tool/call', tool: 'bash', argsPreview: 'grep -n "timeout" config.yml' }),
  Object.freeze({ index: 10, kind: 'tool/result', tool: 'bash', outcome: 'exit 0' }),
  Object.freeze({ index: 11, kind: 'tool/call', tool: 'grep', argsPreview: '"retries" *.yml' }),
  Object.freeze({ index: 12, kind: 'tool/result', tool: 'grep', outcome: '2 matches' }),
  Object.freeze({ index: 13, kind: 'assistant/message', detail: '完成：timeout 已改为 45s，其余未动。' }),
])

/**
 * 呈现契约的教学切片：每个工具给出等待态与结果态的视图。
 * search 族在等待态保持 generic——那时还没有任何匹配可展示。
 */
const TOOL_VIEWS = Object.freeze({
  read_file: Object.freeze({ pendingCard: 'generic', pendingKind: 'read', resultCard: 'read' }),
  str_replace_editor: Object.freeze({ pendingCard: 'diff', pendingKind: null, resultCard: 'diff' }),
  bash: Object.freeze({ pendingCard: 'terminal', pendingKind: null, resultCard: 'terminal' }),
  grep: Object.freeze({ pendingCard: 'generic', pendingKind: 'search', resultCard: 'search' }),
})

/** 一条事件的投影增量：返回该事件让卡片列表发生的变化。 */
function applyEvent(cards, event) {
  if (event.kind === 'user/message') {
    cards.push({ id: 'u' + String(event.index), lane: 'chat', type: 'user', text: event.detail })
    return
  }
  if (event.kind === 'assistant/chunk') {
    const last = cards[cards.length - 1]
    const streaming = last !== undefined && last.type === 'assistant-streaming'
      ? last
      : cards[cards.push({ id: 'a-draft-' + String(event.index), lane: 'chat', type: 'assistant-streaming', text: '' }) - 1]
    streaming.text = event.detail
    streaming.until = event.index
    return
  }
  if (event.kind === 'assistant/message') {
    const draftIndex = cards.findIndex(card => card.type === 'assistant-streaming')
    if (draftIndex !== -1) {
      const draft = cards[draftIndex]
      cards[draftIndex] = { ...draft, type: 'assistant', text: event.detail, until: event.index }
      return
    }
    cards.push({ id: 'a' + String(event.index), lane: 'chat', type: 'assistant', text: event.detail, until: event.index })
    return
  }
  if (event.kind === 'tool/call') {
    const views = TOOL_VIEWS[event.tool]
    cards.push({
      id: 't' + String(event.index),
      lane: 'tools',
      type: 'tool',
      tool: event.tool,
      argsPreview: event.argsPreview,
      state: 'pending',
      pendingCard: views.pendingCard,
      pendingKind: views.pendingKind,
      resultCard: null,
      since: event.index,
    })
    return
  }
  if (event.kind === 'tool/result') {
    const card = [...cards].reverse().find(candidate => candidate.type === 'tool' && candidate.tool === event.tool && candidate.state === 'pending')
    if (card === undefined) return
    card.state = 'settled'
    card.resultCard = TOOL_VIEWS[event.tool].resultCard
    card.outcome = event.outcome
    card.settledAt = event.index
  }
}

/** 重放到 upto（含）为止，返回当时的卡片列表与逐事件去向。 */
export function projectTrajectory(upto) {
  if (!Number.isInteger(upto)) throw new TypeError('upto 必须是整数')
  const max = TRAJECTORY_EVENTS.length - 1
  if (upto < 0 || upto > max) throw new RangeError(`upto 必须落在 [0, ${String(max)}]`)
  const cards = []
  const consumed = []
  for (const event of TRAJECTORY_EVENTS) {
    if (event.index > upto) {
      consumed.push({ index: event.index, kind: event.kind, applied: false, note: '尚未到达' })
      continue
    }
    const before = cards.length
    applyEvent(cards, event)
    consumed.push({ index: event.index, kind: event.kind, applied: true, note: cards.length === before ? '更新已有卡片' : '新增 1 张卡片' })
  }
  return { upto, cards, consumed }
}

export function buildTrajectoryModel(input = {}) {
  const upto = input.upto ?? TRAJECTORY_EVENTS.length - 1
  const projection = projectTrajectory(upto)
  const toolCards = projection.cards.filter(card => card.type === 'tool')
  return {
    input: { upto },
    events: TRAJECTORY_EVENTS,
    ...projection,
    observations: {
      cards: projection.cards.length,
      toolCards: toolCards.length,
      pendingCards: toolCards.filter(card => card.state === 'pending').length,
      diffCards: toolCards.filter(card => (card.resultCard ?? card.pendingCard) === 'diff').length,
      finalizedAssistantBlocks: projection.cards.filter(card => card.type === 'assistant').length,
    },
    canProve: Object.freeze([
      '同一事件流重放两次得到完全相同的卡片列表（确定性）。',
      '工具卡的视图类别遵循呈现契约：read/grep 等待态是 generic，bash 是 terminal，str_replace 是 diff。',
      'grep 的等待态保持 generic——search 结果卡要等结果到来才出现。',
      'assistant 最终文本块的数量等于已到达的 assistant/message 数量。',
    ]),
    cannotProve: Object.freeze([
      '真实 Web 客户端的 React 组件、样式或交互。',
      '真实 Session 存储与恢复行为；这里的事件是教学常量。',
      '其他工具的视图映射；本页只收录四种代表性工具。',
    ]),
  }
}

export function evaluateTrajectoryOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildTrajectoryModel(model.input)
  add('TRAJECTORY_DETERMINISTIC', '同一重放位置得到同一份卡片列表',
    JSON.stringify(rebuilt.cards) === JSON.stringify(model.cards),
    '两次投影一致', JSON.stringify(rebuilt.cards) === JSON.stringify(model.cards) ? '一致' : '不一致')

  const badView = model.cards.filter((card) => {
    if (card.type !== 'tool') return false
    const expected = TOOL_VIEWS[card.tool]
    return card.pendingCard !== expected.pendingCard || (card.state === 'settled' && card.resultCard !== expected.resultCard)
  })
  add('VIEW_KINDS_FOLLOW_CONTRACT', '工具卡视图类别与呈现契约一致',
    badView.length === 0, '0 个越界',
    badView.map(card => card.tool).join('、') || '0 个越界')

  const grepPendingGeneric = model.cards.every((card) => {
    if (!(card.type === 'tool' && card.tool === 'grep')) return true
    return card.state === 'pending' ? card.pendingCard === 'generic' : true
  })
  add('SEARCH_PENDING_STAYS_GENERIC', 'search 族等待态没有提前换上结果卡',
    grepPendingGeneric, '等待态为 generic', grepPendingGeneric ? '符合' : '有越界')

  const messagesArrived = model.events.filter(event => event.index <= model.input.upto && event.kind === 'assistant/message').length
  const blocks = model.cards.filter(card => card.type === 'assistant').length
  add('FINAL_BLOCKS_MATCH_MESSAGES', '最终文本块数量等于已到达的 assistant/message 数量',
    blocks === messagesArrived, String(messagesArrived) + ' 块', String(blocks) + ' 块')

  const unsettledTail = model.cards.filter(card =>
    card.type === 'tool' && card.state === 'settled' && !(card.settledAt <= model.input.upto))
  add('SETTLE_WITHIN_RANGE', '已结算的卡片其结果事件都在重放范围内',
    unsettledTail.length === 0, '全部 ≤ upto', String(unsettledTail.length) + ' 张越界')

  return { pass: checks.every(check => check.pass), checks }
}
