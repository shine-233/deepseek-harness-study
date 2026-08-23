/**
 * 系统提示词装配与缓存前缀的纯模型。规则逐条来自上游源码
 * packages/core/system-prompt/src/index.ts 与 packages/interaction/user-approval
 * （基线 aa6c361a）：
 *
 * - 段落与上下文按 order 升序拼接；约定 -100 渲染在 persona 之前，
 *   persona 槽位是 deployment:persona、order 0，是模型读到的第一段。
 * - renderPrompt 先做严格 {{variable}} 插值、丢空段，再用 \n\n 连接。
 * - 工具 schema 块按名称的码元字典序排列（locale 无关），未列出的工具
 *   汇总成 <unlisted-tools> 标记恰好出现一次。
 * - 审批上下文挂在 order 115：ask 档与 never 档各有一句固定文案
 *   （NEVER_SENTENCE / ASK_SENTENCE，此处逐字引用）。
 *
 * 缓存教学约定：provider 按「上一轮完全相同的前缀」命中缓存。本轮相对
 * 上一轮的第一个变化段之前的所有字节照旧命中，其后全部重新计费——所以
 * 变化点越靠后，浪费越少。字节数按 UTF-8 计（本页所有段文本均为 ASCII）。
 * 没有测量：真实 provider 的缓存计价、真实 KV 复用粒度、真实 token 切分。
 */

const ENCODER = new TextEncoder()

export const PROMPT_LANES = Object.freeze(['前导', 'persona', '策略上下文', '工具表'])

/** 上游约定：这一档渲染在 persona 之前。 */
export const PRE_PERSONA_ORDER = -100
/** 上游导出的 persona 段名与槽位。 */
export const PERSONA_SECTION = 'deployment:persona'
export const PERSONA_ORDER = 0
/** 上游导出的审批上下文槽位。 */
export const POLICY_ORDER = 115
/** 上游常量：未列出工具的汇总标记，恰好出现一次。 */
export const TOOL_ORDER_REST = '<unlisted-tools>'

const NEVER_SENTENCE = 'Approval prompts are disabled in this session: actions that require approval are rejected automatically — do not request sandbox escalation (do not set `sandbox_permissions`).'
const ASK_SENTENCE = 'Approval policy: ask. Operations that require approval may ask through the configured answerers; without an available answerer, the request fails closed.'

const PERSONA_V1 = 'You are the deployment assistant. Answer in the operator language.'
const PERSONA_V2 = 'You are the deployment assistant. Prefer compact bullet answers and cite file paths.'
const PRE_SEGMENT = 'Platform runtime directives for this deployment.'
const TOOL_NAMES = ['read_file', 'write_file']

export const PA_POLICIES = Object.freeze(['ask', 'never', 'absent'])
export const PA_CHANGE_TARGETS = Object.freeze(['none', 'persona', 'policy', 'tools'])
export const PA_TOOL_ORDERS = Object.freeze(['default', 'custom-first'])

function utf8(text) {
  return ENCODER.encode(text).length
}

/**
 * 组装有序段列表：每段带 order、来源标签与 UTF-8 字节数；
 * 空段（策略 absent）直接不产生条目，对应上游「丢空段」规则。
 */
function buildSegments(input) {
  const segments = []
  segments.push({ order: PRE_PERSONA_ORDER, lane: '前导', source: 'platform', text: PRE_SEGMENT })
  segments.push({
    order: PERSONA_ORDER,
    lane: 'persona',
    source: 'deployment:persona',
    text: input.personaVersion === 'v2' ? PERSONA_V2 : PERSONA_V1,
  })
  if (input.policy !== 'absent') {
    segments.push({
      order: POLICY_ORDER,
      lane: '策略上下文',
      source: 'approval:policy',
      text: input.policy === 'never' ? NEVER_SENTENCE : ASK_SENTENCE,
    })
  }
  const tools = input.toolOrder === 'custom-first'
    ? [...TOOL_NAMES].reverse()
    : [...TOOL_NAMES].sort()
  const toolTexts = tools.map(name => `tool: ${name}()`)
  toolTexts.push(`tool: ${TOOL_ORDER_REST}`)
  segments.push({
    order: Number.MAX_SAFE_INTEGER,
    lane: '工具表',
    source: 'tool schemas',
    text: toolTexts.join('\n'),
    tools,
  })
  for (const segment of segments) segment.bytes = utf8(segment.text)
  return segments
}

/** 本轮变化点落在哪个段：返回第一个内容与上一轮不同的段的下标；无变化为 null。 */
function changedIndex(input) {
  const segments = buildSegments(input)
  switch (input.changeTarget) {
    case 'persona': {
      // persona 文案换版：无论当前是哪一版，都视为该段整体变化。
      return segments.findIndex(segment => segment.source === 'deployment:persona')
    }
    case 'policy': {
      // 策略上下文的出现/消失/改值都算这一段变化；absent 时没有可变段。
      if (input.policy === 'absent') return null
      return segments.findIndex(segment => segment.source === 'approval:policy')
    }
    case 'tools': {
      return segments.findIndex(segment => segment.source === 'tool schemas')
    }
    default:
      return null
  }
}

export function buildPromptAssemblyModel(input) {
  const personaVersion = input.personaVersion === 'v2' ? 'v2' : input.personaVersion === 'v1' ? 'v1' : undefined
  if (personaVersion === undefined) throw new RangeError('未知 persona 版本：' + String(input.personaVersion))
  const policy = PA_POLICIES.find(item => item === input.policy)
  if (policy === undefined) throw new RangeError('未知策略：' + String(input.policy))
  const changeTarget = PA_CHANGE_TARGETS.find(item => item === input.changeTarget)
  if (changeTarget === undefined) throw new RangeError('未知变化目标：' + String(input.changeTarget))
  const toolOrder = PA_TOOL_ORDERS.find(item => item === input.toolOrder)
  if (toolOrder === undefined) throw new RangeError('未知工具顺序：' + String(input.toolOrder))

  const normalized = { personaVersion, policy, changeTarget, toolOrder }
  const segments = buildSegments(normalized)

  // 升序不变量：上游按 order 升序拼接，这里排序后必须与构造顺序一致。
  const orders = segments.map(segment => segment.order)
  const sortedOk = orders.every((order, index) => index === 0 || orders[index - 1] <= order)

  const boundary = changedIndex(normalized)
  const cachedBytes = boundary === null
    ? segments.reduce((sum, segment) => sum + segment.bytes, 0)
    : segments.slice(0, boundary).reduce((sum, segment) => sum + segment.bytes, 0)
  const totalBytes = segments.reduce((sum, segment) => sum + segment.bytes, 0)

  return {
    input: { ...normalized },
    segments,
    observations: {
      segmentCount: segments.length,
      totalBytes,
      changedIndex: boundary,
      cachedBytes,
      freshBytes: totalBytes - cachedBytes,
      cacheHitRatio: totalBytes === 0 ? 0 : Math.round((cachedBytes / totalBytes) * 100),
      ascendingOrders: sortedOk,
      emptyDropped: normalized.policy === 'absent'
        ? !segments.some(segment => segment.source === 'approval:policy')
        : true,
      restMarkerOnce: segments.filter(segment => segment.source === 'tool schemas')
        .every(segment => (segment.text.match(/<unlisted-tools>/g) ?? []).length === 1),
    },
    canProve: Object.freeze([
      '段落与上下文按 order 升序拼接：-100 在 persona 之前，工具表永远最后',
      '空段不进提示词：策略 absent 时 115 号上下文整个消失而不是留空行',
      '连接符是 \\n\\n；字节数含每个段自身的文本但不翻倍计入连接符',
      '本轮第一个变化段之前的字节全部命中缓存，其后全部重算——变化点越靠后越省',
      '工具表按名称码元字典序排列，<unlisted-tools> 标记恰好出现一次且在末尾',
      '同一输入重建得到完全相同的分段与字节数（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 provider 的缓存计价单位与折扣比例',
      '真实 KV 复用的块粒度（可能不是整段对齐）',
      '真实 token 切分下字节数与 token 数的差异',
      '真实部署里 skills、settings 等其他贡献段的取值',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重排分段并核对升序、空段、缓存边界算术、
 * 工具规范序、REST 标记唯一性与确定性。
 */
export function evaluatePromptAssemblyOracle(model) {
  const checks = []

  const rebuilt = buildPromptAssemblyModel(model.input)
  const sameSegments = JSON.stringify(rebuilt.segments) === JSON.stringify(model.segments)
  checks.push({
    id: 'PA_DETERMINISTIC',
    label: '同一输入重建出同一条装配序列',
    expected: '两次构建完全一致',
    actual: sameSegments ? '一致' : '不一致',
    pass: sameSegments,
  })

  const orders = model.segments.map(segment => segment.order)
  checks.push({
    id: 'ORDER_ASCENDING',
    label: '段按 order 严格升序排列',
    expected: '非递减序列',
    actual: orders.join(' ≤ '),
    pass: model.observations.ascendingOrders && orders.every((o, i) => i === 0 || orders[i - 1] <= o),
  })

  checks.push({
    id: 'EMPTY_DROPPED',
    label: '策略 absent 时 115 号上下文不产生任何段',
    expected: model.input.policy === 'absent' ? '无策略段' : '有策略段',
    actual: `${model.segments.filter(s => s.source === 'approval:policy').length} 段`,
    pass: model.observations.emptyDropped,
  })

  const boundary = model.observations.changedIndex
  const expectedCached = boundary === null
    ? model.observations.totalBytes
    : model.segments.slice(0, boundary).reduce((sum, segment) => sum + segment.bytes, 0)
  checks.push({
    id: 'CACHE_BOUNDARY_ARITHMETIC',
    label: '缓存命中字节等于变化段之前所有段之和',
    expected: String(expectedCached),
    actual: String(model.observations.cachedBytes),
    pass: model.observations.cachedBytes === expectedCached
      && model.observations.cachedBytes + model.observations.freshBytes === model.observations.totalBytes,
  })

  const toolSeg = model.segments.find(segment => segment.source === 'tool schemas')
  const lines = (toolSeg?.text ?? '').split('\n')
  const restIndex = lines.findIndex(line => line.includes(TOOL_ORDER_REST))
  const names = lines.filter(line => !line.includes(TOOL_ORDER_REST))
    .map(line => line.replace(/^tool: /, '').replace(/\(\)$/, ''))
  const restSorted = JSON.stringify(lines.slice(restIndex + 1)) === JSON.stringify([...lines.slice(restIndex + 1)].sort())
  if (model.input.toolOrder === 'default') {
    checks.push({
      id: 'TOOL_CANONICAL_ORDER',
      label: '未配置顺序时整表码元字典序，标记收尾',
      expected: 'read_file < write_file < <unlisted-tools>',
      actual: lines.join(' | '),
      pass: JSON.stringify(names) === JSON.stringify([...names].sort()) && restIndex === lines.length - 1,
    })
  } else {
    // 配置了 toolOrder：已列出工具保持配置顺序，未列出的 rest 排在其后且内部有序。
    checks.push({
      id: 'TOOL_CANONICAL_ORDER',
      label: '配置顺序下：已列出按配置排，rest 段内部有序，标记仍收尾',
      expected: 'write_file < read_file < <unlisted-tools>',
      actual: lines.join(' | '),
      pass: restIndex === lines.length - 1 && restSorted
        && names[0] === 'write_file' && names[1] === 'read_file',
    })
  }

  checks.push({
    id: 'REST_MARKER_ONCE',
    label: '<unlisted-tools> 恰好出现一次',
    expected: '1 次',
    actual: model.observations.restMarkerOnce ? '1 次' : '异常',
    pass: model.observations.restMarkerOnce === true,
  })

  return { pass: checks.every(check => check.pass), checks }
}
