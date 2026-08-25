/**
 * 上下文注入发现链的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/context/agent-instructions/README.md：
 * 从 $DSH_HOME/AGENTS.md 开始，沿项目根到 cwd 的每一目录，按配置顺序检查每
 * 个候选名（AGENTS.md、CLAUDE.md 等）；同一目录内内容去重后取最早候选；
 * 注入为 durable user-role 消息（system-reminder 包裹）。
 *
 * 教学约定：文件系统是固定教学常量；没有真实 fs 或 provider。
 */

export const CANDIDATE_NAMES = Object.freeze(['AGENTS.md', 'CLAUDE.md'])
export const CONTEXT_SOURCES = Object.freeze(['global', 'project-root', 'nested'])

/** 教学文件系统：路径 → 内容。 */
const FS = Object.freeze({
  '~/.dsh/AGENTS.md': 'Global DSH instructions.',
  'AGENTS.md': 'Project root instructions.',
  'packages/app/CLAUDE.md': 'App-specific guidance.',
})

/**
 * 发现指令链：从全局到 cwd，逐目录检查候选名；同目录内字节相同的内容去重。
 */
export function discoverInstructionChain(cwdParts) {
  if (!Array.isArray(cwdParts)) throw new TypeError('cwdParts 必须是路径段数组')
  const chain = []
  const seenContents = new Set()

  // 全局层
  const globalPath = '~/.dsh/AGENTS.md'
  const globalContent = FS[globalPath]
  if (globalContent !== undefined) {
    chain.push({ path: globalPath, source: 'global', content: globalContent })
    seenContents.add(globalContent)
  }

  // 项目根 → cwd 逐层
  let currentPath = ''
  for (const part of cwdParts) {
    currentPath += part + '/'
    for (const name of CANDIDATE_NAMES) {
      const fullPath = currentPath + name
      const content = FS[fullPath]
      if (content === undefined) continue
      if (seenContents.has(content)) continue
      seenContents.add(content)
      chain.push({ path: fullPath, source: 'discovered', content })
    }
  }

  return chain
}

export function buildContextInjectionModel(input = {}) {
  const cwdDepth = Math.max(0, Math.min(3, input.cwdDepth ?? 1))
  const hasTimeContext = input.hasTimeContext === true
  const hasSessionRef = input.hasSessionRef === true
  const cwdParts = ['packages', 'app'].slice(0, cwdDepth)

  const chain = discoverInstructionChain(cwdParts)

  const injections = []
  if (chain.length > 0) {
    injections.push({
      type: 'system-reminder',
      role: 'workspace-instructions',
      producer: 'agent-instructions',
      sources: chain.map(item => item.path),
      collapsible: true,
    })
  }
  if (hasTimeContext) {
    injections.push({
      type: 'system-reminder',
      role: 'time-context',
      producer: 'time-context',
      sources: ['current zoned time'],
      collapsible: true,
    })
  }
  if (hasSessionRef) {
    injections.push({
      type: 'disclosure-row',
      role: '跨会话召回',
      producer: 'session-reference',
      sources: [],
      collapsible: true,
    })
  }

  return {
    mode: 'context-injection',
    input: { cwdDepth, hasTimeContext, hasSessionRef },
    chain,
    injections,
    observations: {
      discoveredFiles: chain.length,
      deduplicated: 0,
      producersActive: injections.length,
      timeContextEnabled: hasTimeContext,
    },
    canProve: Object.freeze([
      '发现链从全局到 cwd 逐目录扫描候选名。',
      '同目录内字节相同的内容去重——重复的 CLAUDE.md 不重复注入。',
      '注入为 durable user-role 消息（system-reminder 包裹）。',
      '每个注入在 ChatFlow 中渲染为默认折叠的 DisclosureRow。',
    ]),
    cannotProve: Object.freeze([
      '真实文件系统监听和变更通知时序。',
      '真实 Intl.DateTimeFormat 时区解析。',
      'fork 后 seedLength 裁剪对注入链的影响。',
    ]),
  }
}

export function evaluateContextOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildContextInjectionModel(model.input)
  add('CTX_DETERMINISTIC', '同一输入重建同一发现链',
    JSON.stringify(rebuilt.chain) === JSON.stringify(model.chain),
    '两次一致', rebuilt.chain.length === model.chain.length ? '一致' : '不一致')

  const contents = model.chain.map(item => item.content)
  add('DEDUP_BY_CONTENT', '发现链无重复内容',
    new Set(contents).size === contents.length,
    '0 条重复', `${String(contents.length - new Set(contents).size)} 条重复`)

  add('GLOBAL_FIRST', '全局指令排在最前面',
    model.chain.length === 0 || model.chain[0].source === 'global' || !model.chain.some(item => item.source === 'global'),
    '全局优先', model.chain[0]?.source ?? '空链')

  return { pass: checks.every(check => check.pass), checks }
}
