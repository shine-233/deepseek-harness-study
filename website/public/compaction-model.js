/**
 * 上下文压缩的纯模型。
 *
 * 课程 05 说清了「Surface 和历史不是一回事」：原始日志是事实，surface 是折叠后
 * 真正进入模型历史的视图。本模型把这件事拆成两层折叠再给出读数：
 *
 *   第一层：assistant chunk 折叠成完整消息；
 *   第二层：把最近 K 轮以外的表面节点替换成一个摘要节点，摘要带 sourceEventSeqs。
 *
 * 它检验的是三条实现里真正存在的规则：
 *
 *   1. 日志只追加：压缩替换 surface，不删除任何原始事件；
 *   2. 摘要必须引用来源：被替换节点的每一条事件序号都要出现在 sourceEventSeqs 里；
 *   3. 最近 K 轮逐字保留：压缩不许动它们。
 *
 * 篡改实验 fault='lossy-summary'：生成的摘要悄悄漏掉最早一条被替换序号的引用，
 * 其余读数照常，让读者能亲手触发第 2 条规则的失败并被独立校验指认。
 *
 * 每个视觉维度的含义：
 *   上排 = 原始事件序号（离散顺序，不是时间戳）
 *   下排 = surface 节点，矩形长度 = 该节点的估算 token（启发式估计值，不是真实分词）
 *   颜色 = 只区分事件类别和摘要，不编码任何数值
 * 没有测量：真实 tokenizer 计数、真实压缩 provider 的行为或质量、真实模型调用。
 */

export const COMPACTION_SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'twelve-turns',
    label: '十二轮混合会话',
    description: '轮次多、单轮不大。压缩省下的量随保留轮数近似线性变化。',
  }),
  Object.freeze({
    id: 'recent-heavy',
    label: '最近一轮特别大',
    description: '最后一轮带着一份大工具结果。旧历史压得再多，总量也降不了多少——压缩救不了最近的大负载。',
  }),
  Object.freeze({
    id: 'many-chunks',
    label: '大量流式片段',
    description: '每条助手消息先由多个 chunk 折叠而成；先折叠再压缩，两层各干各的事。',
  }),
])

/** 摘要成本随被替换内容增长：固定底价加一个确定性的比例项。 */
const SUMMARY_BASE_TOKENS = 48
const SUMMARY_RATE = 0.12

function chunkFoldTokens(chunks) {
  return chunks.reduce((total, value) => total + value.tokens, 0)
}

/**
 * 构造一段教学会话。返回轮次数组；每轮含事件列表和逐事件的估算 token。
 * 数字是构造的教学数据，页面会在证据边界里声明这一点。
 */
function buildTurns(scenario) {
  const turns = []
  const push = (label, events) => turns.push({ label, events })

  if (scenario === 'recent-heavy') {
    for (let index = 0; index < 7; index += 1) {
      push('第 ' + String(index + 1) + ' 轮', [
        { kind: 'user-message', label: '用户提问', tokens: 14 },
        { kind: 'tool-call', label: '调用 read_file', tokens: 9 },
        { kind: 'tool-result', label: '工具结果', tokens: 120 },
        { kind: 'assistant-message', label: '助手答复', tokens: 60 },
      ])
    }
    push('第 8 轮', [
      { kind: 'user-message', label: '用户提问', tokens: 18 },
      { kind: 'tool-call', label: '调用 read_file', tokens: 9 },
      { kind: 'tool-result', label: '整份大文件结果', tokens: 9200 },
      { kind: 'assistant-message', label: '长答复', tokens: 380 },
    ])
    return turns
  }

  if (scenario === 'many-chunks') {
    for (let index = 0; index < 10; index += 1) {
      push('第 ' + String(index + 1) + ' 轮', [
        { kind: 'user-message', label: '用户提问', tokens: 16 },
        { kind: 'assistant-chunk', label: 'chunk ×5', tokens: 12 },
        { kind: 'assistant-chunk', label: 'chunk ×5', tokens: 12 },
        { kind: 'assistant-chunk', label: 'chunk ×5', tokens: 12 },
        { kind: 'assistant-chunk', label: 'chunk ×5', tokens: 12 },
        { kind: 'assistant-chunk', label: 'chunk ×5', tokens: 12 },
        { kind: 'assistant-message', label: '折叠后的完整消息', tokens: 0 },
      ])
    }
    return turns
  }

  for (let index = 0; index < 12; index += 1) {
    push('第 ' + String(index + 1) + ' 轮', [
      { kind: 'user-message', label: '用户提问', tokens: 15 },
      { kind: 'tool-call', label: '调用 search', tokens: 8 },
      { kind: 'tool-result', label: '工具结果', tokens: 210 },
      { kind: 'assistant-message', label: '助手答复', tokens: 70 },
    ])
  }
  return turns
}

/** 给事件编上全局序号：序号是日志事实的一部分，压缩不能改变它们。 */
function numberEvents(turns) {
  let sequence = 0
  return turns.map(turn => ({
    ...turn,
    events: turn.events.map(entry => {
      const numbered = { ...entry, sequence }
      sequence += 1
      return numbered
    }),
  }))
}

/** 第一层折叠：chunk 并进同一条消息节点，其余事件一比一成为节点。 */
function foldChunks(turns) {
  const nodes = []
  for (const turn of turns) {
    let pending = null
    for (const entry of turn.events) {
      if (entry.kind === 'assistant-chunk') {
        pending = pending ?? { tokens: 0, seqs: [] }
        pending.tokens += entry.tokens
        pending.seqs.push(entry.sequence)
        continue
      }
      if (entry.kind === 'assistant-message' && pending !== null) {
        nodes.push({
          kind: 'assistant-message',
          label: '折叠 ' + String(pending.seqs.length) + ' 个 chunk',
          tokens: pending.tokens,
          // 每一条来源事件都要被引用：少一条，oracle 的覆盖检查就会失败。
          sourceEventSeqs: [...pending.seqs, entry.sequence],
          turn: turn.label,
          turnIndex: turn.turnIndex,
        })
        pending = null
        continue
      }
      nodes.push({
        kind: entry.kind,
        label: entry.label,
        tokens: entry.tokens,
        sourceEventSeqs: [entry.sequence],
        turn: turn.label,
        turnIndex: turn.turnIndex,
      })
    }
  }
  return nodes
}

/**
 * 第二层折叠：最近 keepRecent 轮逐字保留，更早的节点替换成一个摘要节点。
 * keepRecent 不小于总轮数时什么都不替换——这也是一种合法结果，不是错误。
 */
function compact(nodes, turns, keepRecent, fault) {
  const keptFromTurn = Math.max(0, turns.length - keepRecent)
  const kept = nodes.filter(node => node.turnIndex >= keptFromTurn)
  const replaced = nodes.filter(node => node.turnIndex < keptFromTurn)
  if (replaced.length === 0) {
    return { nodes: kept, summary: null }
  }
  const replacedTokens = replaced.reduce((total, node) => total + node.tokens, 0)
  const replacedSeqs = replaced.flatMap(node => node.sourceEventSeqs)
  // 篡改实验：lossy-summary 让摘要悄悄漏掉最早一条被替换序号的引用；
  // token、节点数等其余读数一律照常，好让独立校验单独抓住这一处违规。
  const citedSeqs = fault === 'lossy-summary' ? replacedSeqs.slice(1) : replacedSeqs
  const summary = {
    kind: 'compaction-summary',
    label: '压缩摘要（替换 ' + String(replaced.length) + ' 个节点）',
    tokens: SUMMARY_BASE_TOKENS + Math.round(replacedTokens * SUMMARY_RATE),
    sourceEventSeqs: citedSeqs,
    turn: keptFromTurn < turns.length ? turns[keptFromTurn].label + ' 之前' : '全部历史',
  }
  return { nodes: [summary, ...kept], summary }
}

/** 从零重算一遍读数，供 oracle 与渲染层各自独立使用。 */
function recount(nodes) {
  return nodes.reduce((total, node) => total + node.tokens, 0)
}

export function buildCompactionModel(input) {
  const scenario = COMPACTION_SCENARIOS.find(item => item.id === input.scenario)
  if (scenario === undefined) throw new RangeError('未知场景：' + String(input.scenario))
  if (!Number.isInteger(input.keepRecent)) throw new TypeError('保留轮数必须是整数')
  if (input.keepRecent < 0) throw new RangeError('保留轮数不能为负')
  const fault = input.fault ?? 'none'
  if (fault !== 'none' && fault !== 'lossy-summary') {
    throw new RangeError('未知篡改实验：' + String(fault))
  }

  const turns = numberEvents(buildTurns(scenario.id))
  const withIndex = turns.map((turn, index) => ({
    ...turn,
    events: turn.events,
    turnIndex: index,
  }))
  const folded = foldChunks(withIndex)
  const before = recount(folded)
  const { nodes, summary } = compact(folded, withIndex, input.keepRecent, fault)
  const after = recount(nodes)
  const eventCount = withIndex.reduce((total, turn) => total + turn.events.length, 0)

  return {
    input: { scenario: scenario.id, keepRecent: input.keepRecent, fault },
    scenario,
    turns: withIndex,
    surfaceNodes: nodes,
    summary,
    observations: {
      eventCount,
      nodesBefore: folded.length,
      nodesAfter: nodes.length,
      tokensBefore: before,
      tokensAfter: after,
      savedRatio: after === 0 ? 0 : Math.round((1 - after / before) * 100),
      summaryTokens: summary === null ? 0 : summary.tokens,
    },
    canProve: Object.freeze([
      '在这份构造数据上，压缩前后的事件总数相同（日志只追加）',
      '摘要节点的 sourceEventSeqs 覆盖且仅覆盖被替换节点的来源事件',
      '最近 ' + String(Math.min(input.keepRecent, turns.length)) + ' 轮在 surface 里逐字保留',
      '同一输入重复折叠得到完全相同的 surface（确定性）',
    ]),
    cannotProve: Object.freeze([
      'token 数是按教学数据给的启发式估计，不是真实 tokenizer 的计数',
      '真实 compaction provider 的策略、时机和质量',
      '真实模型看到压缩后上下文的表现差异',
    ]),
  }
}

/**
 * 独立校验：不读 buildCompactionModel 的中间量，自己从 events + 输入重算每一条。
 * 任何一条失败都说明折叠规则被破坏，而不是数据不好看。
 */
export function evaluateCompactionOracle(model) {
  const checks = []

  const rebuilt = buildCompactionModel(model.input)
  checks.push({
    id: 'FOLD_DETERMINISTIC',
    label: '同一输入重复折叠得到同一份 surface',
    expected: '两次构建的 JSON 完全一致',
    actual: JSON.stringify(rebuilt.surfaceNodes) === JSON.stringify(model.surfaceNodes)
      ? '一致'
      : '不一致',
    pass: JSON.stringify(rebuilt.surfaceNodes) === JSON.stringify(model.surfaceNodes),
  })

  const eventCount = model.turns.reduce((total, turn) => total + turn.events.length, 0)
  checks.push({
    id: 'LOG_APPEND_ONLY',
    label: '压缩不删除原始事件',
    expected: '事件数保持 ' + String(eventCount),
    actual: '事件数为 ' + String(model.observations.eventCount),
    pass: model.observations.eventCount === eventCount,
  })

  if (model.summary !== null) {
    const citedSeqs = new Set(model.summary.sourceEventSeqs)
    const expectedSeqs = model.turns
      .slice(0, Math.max(0, model.turns.length - model.input.keepRecent))
      .flatMap(turn => turn.events.map(entry => entry.sequence))
    // 漏引：被替换事件的序号没出现在摘要里；越界：摘要引了不在替换范围内的序号。
    const absent = expectedSeqs.filter(seq => !citedSeqs.has(seq))
    const extra = [...citedSeqs].filter(seq => !expectedSeqs.includes(seq))
    const problems = []
    if (absent.length > 0) problems.push('缺少对序号 ' + absent.join('、') + ' 的引用')
    if (extra.length > 0) problems.push('多引了未替换的序号 ' + extra.join('、'))
    checks.push({
      id: 'SUMMARY_CITES_SOURCES',
      label: '摘要应恰好引用全部被替换事件',
      expected: '恰好引用这 ' + String(expectedSeqs.length) + ' 条被替换序号：' + expectedSeqs.join('、'),
      actual: problems.length === 0
        ? '恰好引用这 ' + String(expectedSeqs.length) + ' 条序号，无越界引用'
        : problems.join('；'),
      pass: problems.length === 0,
    })
  }

  const keptTurnStart = Math.max(0, model.turns.length - model.input.keepRecent)
  const keptLabels = model.turns.slice(keptTurnStart).map(turn => turn.label)
  const intact = keptLabels.every(label =>
    model.surfaceNodes.some(node => node.turn === label && node.kind !== 'compaction-summary'))
  checks.push({
    id: 'RECENT_INTACT',
    label: '最近 ' + String(keptLabels.length) + ' 轮逐字保留',
    expected: '每一轮都有原样节点留在 surface',
    actual: intact ? '全部保留' : '有轮次被替换或丢失',
    pass: intact,
  })

  const recounted = recount(model.surfaceNodes)
  checks.push({
    id: 'NO_DOUBLE_COUNT',
    label: '压缩后估算等于各节点之和',
    expected: String(recounted) + '（逐节点重加）',
    actual: String(model.observations.tokensAfter),
    pass: recounted === model.observations.tokensAfter,
  })

  return { pass: checks.every(check => check.pass), checks }
}
