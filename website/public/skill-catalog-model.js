/**
 * 技能目录渐进加载的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/skill/tool-skill/README.md：
 * 目录在每个 agent/pre-step 用 ctx.skills.snapshot() 生成，只含排序后的
 * name 与 description（规范化并截断，默认上限 500 字符）；技能正文、路径、
 * 来源和 whenToUse 一律不进目录。目录消息带 skill-catalog 来源与覆盖条目
 * 的 digest；digest 变了才追加完整替换信封，空信封显式退役旧名字。没有
 * 可被模型调用的技能、或 skill 工具被 restrict 走/被同名遮蔽时，整个目录
 * 省略。`skill` 工具按精确名加载：成功返回 { name, provider, resourceBase?,
 * content }；未知名字与 modelInvocable=false 是两种不同错误结果。
 *
 * 教学约定：三个技能与其描述是教学常量；「上一轮 digest」由输入给出，
 * 保持纯函数。没有真实 provider 或文件系统。
 */

export const SKILL_TOOL_VISIBILITY = Object.freeze(['visible', 'restricted', 'shadowed'])

const SKILL_POOL = Object.freeze([
  Object.freeze({
    name: 'commit-helper',
    description: '按约定式提交规范撰写 commit message',
    body: '## 步骤\n1. 读 staged diff\n2. 选 type/scope\n3. 输出一行 subject',
    modelInvocable: true,
  }),
  Object.freeze({
    name: 'release-notes',
    description: '从 git log 汇总面向用户的发布说明',
    body: '## 步骤\n1. 取上一个 tag 以来的提交\n2. 按 feature/fix 分组',
    modelInvocable: true,
  }),
  Object.freeze({
    name: 'legacy-migrate',
    description: '内部系统的迁移手册（仅用户显式调用）',
    body: '## 迁移手册\n……长正文……',
    modelInvocable: false,
  }),
])

export const SKILL_NAMES = Object.freeze(SKILL_POOL.map(skill => skill.name))

/** 描述规范化：压平空白再截断——上游用 catalogDescriptionMaxLength（默认 500）。 */
function normalizeDescription(text) {
  const flattened = text.replace(/\s+/g, ' ').trim()
  return flattened.length > 80 ? flattened.slice(0, 80) : flattened
}

function resolveInput(input = {}) {
  if (!SKILL_TOOL_VISIBILITY.includes(input.toolVisibility ?? 'visible')) {
    throw new RangeError('未知工具可见性：' + String(input.toolVisibility))
  }
  const present = Array.isArray(input.present) ? input.present : ['commit-helper']
  for (const name of present) {
    if (!SKILL_NAMES.includes(name)) throw new RangeError('未知技能名：' + String(name))
  }
  if (typeof input.descriptionOverride !== 'string') throw new TypeError('descriptionOverride 必须是字符串')
  if (typeof input.previousDigest !== 'string' && input.previousDigest !== null) {
    throw new TypeError('previousDigest 必须是字符串或 null')
  }
  const probe = input.probe ?? null
  if (probe !== null && !SKILL_NAMES.includes(probe) && probe !== 'nonexistent') {
    throw new RangeError('未知探测名：' + String(probe))
  }
  return {
    toolVisibility: input.toolVisibility ?? 'visible',
    present: [...new Set(present)],
    descriptionOverride: input.descriptionOverride,
    previousDigest: input.previousDigest ?? null,
    probe,
  }
}

function buildEntries(resolved) {
  return resolved.present
    .map((name) => {
      const skill = SKILL_POOL.find(item => item.name === name)
      const description = normalizeDescription(name === 'commit-helper' && resolved.descriptionOverride.length > 0
        ? resolved.descriptionOverride
        : skill.description)
      return { name, description, modelInvocable: skill.modelInvocable }
    })
    .sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0))
}

function digestOf(entries) {
  return JSON.stringify(entries.map(entry => [entry.name, entry.description]))
}

/**
 * 计算当前轮次的目录视图与一次 `skill` 工具探测的结果。
 * transition 只依赖 previousDigest 与本次 digest：null→有值是 initial，
 * 值变了是 replacement，变成 null（空目录）是 retired，相同则 unchanged。
 */
export function buildSkillCatalogModel(input = {}) {
  const resolved = resolveInput(input)
  const allEntries = buildEntries(resolved)
  const invocable = allEntries.filter(entry => entry.modelInvocable)

  let publishReason
  if (resolved.toolVisibility === 'restricted') publishReason = '省略：skill 工具被 restrict 走，目录对这轮请求没有意义'
  else if (resolved.toolVisibility === 'shadowed') publishReason = '省略：同名作用域技能遮蔽了官方 skill 工具'
  else if (invocable.length === 0) publishReason = '省略：没有任何可被模型调用的技能'
  else publishReason = null

  // 目录条目只收可被模型调用的技能；modelInvocable=false 的仍占快照位，
  // 但不进 <available_skills>（它只能由用户显式触发）。
  const entries = invocable.map(({ name, description }) => ({ name, description }))
  const digest = digestOf(entries)

  let transition
  let envelope = null
  if (entries.length === 0) {
    transition = resolved.previousDigest !== null && resolved.previousDigest !== digestOf([]) ? 'retired' : 'unchanged-empty'
    envelope = resolved.previousDigest !== null && resolved.previousDigest !== digestOf([])
      ? '<system-reminder>\n<available_skills>\n</available_skills>\n不要使用上面列出的旧技能名。\n</system-reminder>'
      : null
  } else if (publishReason !== null) {
    transition = 'omitted'
  } else if (resolved.previousDigest === null) {
    transition = 'initial'
    envelope = renderEnvelope(entries)
  } else if (resolved.previousDigest !== digest) {
    transition = 'replacement'
    envelope = renderEnvelope(entries)
  } else {
    transition = 'unchanged'
  }

  const probeOutcome = resolveProbe(resolved.probe, allEntries)

  return {
    input: resolved,
    entries,
    digest,
    transition,
    envelope,
    omitReason: publishReason,
    probe: probeOutcome,
    observations: {
      snapshotSize: allEntries.length,
      publishedCount: entries.length,
      longestDescription: entries.reduce((max, entry) => Math.max(max, entry.description.length), 0),
      bodiesLeaked: countBodyLeaks(entries),
    },
    canProve: Object.freeze([
      '目录里只有 name 和截断后的 description；技能正文、路径和 whenToUse 不出现。',
      'digest 由排序后的 [name, description] 对算出：改一个字都会得到新 digest。',
      '省略规则：零个可调用技能、工具被 restrict 或被遮蔽时整份目录不发布。',
      'skill 工具的三种结局互不相同：成功返回内容块，未知名字与 modelInvocable=false 各有自己的报错。',
    ]),
    cannotProve: Object.freeze([
      '真实 provider 的发现顺序或磁盘布局。',
      'pre-step 监听器的中止与重试行为。',
      'compaction 隐藏目录后的重建时序；本页只对比 digest 与信封本身。',
    ]),
  }
}

function renderEnvelope(entries) {
  const lines = entries.map(entry => `- \`${entry.name}\`: ${entry.description}`)
  return `<system-reminder>\nA skill is a reusable set of task-specific instructions. The following skills are available in this session:\n\n<available_skills>\n${lines.join('\n')}\n</available_skills>\n</system-reminder>`
}

/** 正文泄漏计数：目录文本里不允许出现任何技能正文片段。 */
function countBodyLeaks(entries) {
  const envelopeText = entries.map(entry => `${entry.name}: ${entry.description}`).join('\n')
  let leaks = 0
  for (const skill of SKILL_POOL) {
    const marker = skill.body.split('\n')[1] ?? ''
    if (marker && envelopeText.includes(marker.slice(0, 8))) leaks += 1
  }
  return leaks
}

function resolveProbe(probe, allEntries) {
  if (probe === null) return { name: null, kind: 'idle', detail: '—' }
  const skill = allEntries.find(item => item.name === probe)
  if (skill === undefined) {
    return { name: probe, kind: 'unknown', detail: '该技能未知或已不再可用（unknown / no longer available）' }
  }
  if (!skill.modelInvocable) {
    return { name: probe, kind: 'not-model-invocable', detail: '这个技能标记为仅供用户显式调用：模型侧得到专门的错误结果' }
  }
  return {
    name: probe,
    kind: 'loaded',
    detail: `{ name: '${probe}', provider: …, content } → 渲染为 <skill_content name="${probe}">…</skill_content>`,
  }
}

export function evaluateSkillCatalogOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildSkillCatalogModel(model.input)
  add('CATALOG_DETERMINISTIC', '同一输入重建同一份目录视图',
    rebuilt.digest === model.digest && rebuilt.transition === model.transition,
    '两次一致', rebuilt.digest === model.digest ? '一致' : '不一致')

  add('DIGEST_COVERS_ENTRIES', 'digest 等于排序后 [name, description] 的序列化',
    model.digest === digestOf(model.entries),
    digestOf(model.entries).slice(0, 40) + '…', model.digest.slice(0, 40) + '…')

  const shouldPublish = model.input.toolVisibility === 'visible' && model.entries.length > 0
  add('PUBLISH_OR_OMIT', '发布与否恰好由可见性与可调用数量决定',
    shouldPublish ? model.envelope !== null || model.transition === 'unchanged' : model.omitReason !== null,
    shouldPublish ? '发布' : '省略并给原因',
    shouldPublish ? (model.transition === 'omitted' ? '却被省略' : '发布') : model.omitReason ?? '未给原因')

  add('NO_BODY_LEAKAGE', '目录里没有任何技能正文片段',
    model.observations.bodiesLeaked === 0, '0 处正文', `${String(model.observations.bodiesLeaked)} 处正文`)

  const probeExpected = resolveProbe(model.input.probe, buildEntries({ ...model.input, descriptionOverride: '', present: model.input.present }))
  add('PROBE_OUTCOME_TABLE', 'skill 探测结局与快照及可调用标记一致',
    model.probe.kind === probeExpected.kind,
    probeExpected.kind, model.probe.kind)

  return { pass: checks.every(check => check.pass), checks }
}
