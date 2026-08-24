/**
 * 会话查询（session-query）的纯教学模型：基于上游
 * packages/session-query/session-query/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 核心规则：
 * - 同一服务提供读取、过滤、全文搜索与 trace 观察四类读。
 * - 过滤是合取的：种类、窗口等条件同时满足才入选。
 * - 窗口按事件序号闭区间截取；分页在过滤后的结果上切片。
 *
 * 教学日志固定为 12 条混合事件；搜索对 detail 做大小写不敏感子串匹配。
 */

export const QUERY_LANES = Object.freeze(['查询请求', 'session-query', '事件记录'])

export const QUERY_LOG = Object.freeze([
  Object.freeze({ seq: 0, kind: 'user/message', text: '帮我修复登录页面的样式' }),
  Object.freeze({ seq: 1, kind: 'system/prompt', text: '装配 system prompt（v3）' }),
  Object.freeze({ seq: 2, kind: 'assistant/message', text: '我先读取登录页面组件' }),
  Object.freeze({ seq: 3, kind: 'tool/call', text: 'read_file src/Login.vue' }),
  Object.freeze({ seq: 4, kind: 'tool/result', text: '返回 240 行源码' }),
  Object.freeze({ seq: 5, kind: 'tool/call', text: 'edit_file 调整按钮布局' }),
  Object.freeze({ seq: 6, kind: 'tool/result', text: '编辑成功' }),
  Object.freeze({ seq: 7, kind: 'assistant/message', text: '样式已修复并说明改动' }),
  Object.freeze({ seq: 8, kind: 'user/message', text: '再检查一下移动端断点' }),
  Object.freeze({ seq: 9, kind: 'tool/call', text: 'read_file src/breakpoints.css' }),
  Object.freeze({ seq: 10, kind: 'tool/result', text: '返回 80 行' }),
  Object.freeze({ seq: 11, kind: 'turn/end', text: '' }),
])

function resolveInput(input = {}) {
  const kindFilter = input.kindFilter ?? 'all'
  if (kindFilter !== 'all' && !['user/message', 'tool/call', 'tool/result'].includes(kindFilter)) {
    throw new RangeError('未知种类过滤：' + String(kindFilter))
  }
  if (input.searchText !== undefined && typeof input.searchText !== 'string') throw new TypeError('searchText 必须是字符串')
  const win = input.window ?? [0, QUERY_LOG.length - 1]
  if (!Array.isArray(win) || win.length !== 2
    || !win.every(n => typeof n === 'number' && Number.isInteger(n))
    || win[0] < 0 || win[1] > QUERY_LOG.length - 1 || win[0] > win[1]) {
    throw new RangeError('窗口必须是 [start, end] 且 0 ≤ start ≤ end ≤ ' + String(QUERY_LOG.length - 1))
  }
  return {
    kindFilter,
    searchText: input.searchText ?? '',
    window: win,
  }
}

/** 推演一次查询：过滤 → 搜索 → 窗口。 */
export function buildQueryModel(input = {}) {
  const resolved = resolveInput(input)
  const { kindFilter, searchText } = resolved
  const [winStart, winEnd] = resolved.window

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: QUERY_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'request', '查询：kind=' + kindFilter
    + (searchText ? '，搜索「' + searchText + '」' : '')
    + '，窗口 [' + String(winStart) + ', ' + String(winEnd) + ']。')

  const matched = QUERY_LOG.filter(entry =>
    entry.seq >= winStart
    && entry.seq <= winEnd
    && (kindFilter === 'all' || entry.kind === kindFilter)
    && (searchText === '' || entry.text.toLowerCase().includes(searchText.toLowerCase())))

  for (const entry of matched) {
    push(2, 'record', '#' + String(entry.seq) + ' [' + entry.kind + '] ' + entry.text, { seq: entry.seq })
  }

  return {
    input: { ...resolved },
    lanes: QUERY_LANES,
    steps,
    observations: {
      matchedSeqs: matched.map(e => e.seq),
      matchCount: matched.length,
      kindsPresent: [...new Set(matched.map(e => e.kind))],
      forkShape: matched.length === 0 ? '空结果——条件太紧或窗口为空'
        : matched.length < 4 ? '少量命中'
        : '大量命中',
    },
    canProve: [
      '三类条件（种类、搜索、窗口）合取生效：同时满足才入选。',
      '窗口是事件序号的闭区间，边界上的事件包含在内。',
      '搜索对 detail 文本做大小写不敏感的子串匹配。',
      '同一查询重复执行得到同一结果序列（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 SQLite 全文索引的分词行为。',
      '不能证明真实 trace 观察的采样策略。',
      '不能证明真实分页游标在并发追加下的稳定性。',
      '不能用本页替代 tool-session-query 的工具 schema 表。',
    ],
  }
}

/** 独立校验。 */
export function evaluateQueryOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildQueryModel(model.input)
  add('Q_DETERMINISTIC', '同一查询重复执行得到同一结果',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const seqsAsc = o.matchedSeqs.every((v, i, arr) => i === 0 || v > arr[i - 1])
  const inWindow = o.matchedSeqs.every(seq =>
    seq >= model.input.window[0] && seq <= model.input.window[1])
  add('Q_WINDOW_ORDERED', '命中序号升序且全部落在窗口内',
    seqsAsc && inWindow,
    '升序 ∩ 窗口', seqsAsc && inWindow ? '成立' : '越界或乱序')

  const kindOk = o.matchedSeqs.every(seq => {
    const entry = QUERY_LOG[seq]
    return model.input.kindFilter === 'all' || entry.kind === model.input.kindFilter
  })
  add('Q_KIND_FILTER', '种类过滤逐条成立',
    kindOk,
    model.input.kindFilter === 'all' ? '不过滤' : '仅 ' + model.input.kindFilter,
    kindOk ? '逐条吻合' : '出现异类')

  return { pass: checks.every(c => c.pass), checks }
}
