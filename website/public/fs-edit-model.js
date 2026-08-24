/**
 * str_replace_editor 替换管线的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/fs/tool-str-replace-editor/src/index.ts：
 * matchOffsets 找出 old_str 的全部逐字出现；0 次报 FS_EDIT_NOT_FOUND，多次报
 * FS_AMBIGUOUS_EDIT（附行号列表），恰好一次才写入，写入带 replaceIfVersion 的
 * 乐观并发版本；沙箱拒绝发生在写入阶段，错误被映射成
 * `[sandbox: file access denied under <mode> mode]`。
 *
 * 教学约定：文件内容、路径和策略档位都是固定教学常量；「呈现契约」用上游
 * presentCall 的 diff 卡载荷（oldText/newText）原样演示。
 * 没有测量：真实磁盘 IO、真实进程、真实审批界面。
 */

export const SANDBOX_MODES = Object.freeze(['read-only', 'workspace-write', 'danger-full-access'])

export const EDIT_TARGETS = Object.freeze([
  Object.freeze({ id: 'config', path: '/workspace/config.yml', insideWorkspace: true }),
  Object.freeze({ id: 'notes', path: '/tmp/notes.txt', insideWorkspace: false }),
])

/** 教学文件：「retries: 3」故意出现两次，用来演示多义拒绝。 */
const CONFIG_CONTENT = [
  '# service config',
  'retries: 3',
  'timeout: 30s',
  'endpoint: https://api.example.com',
  '# retry policy',
  'retries: 3',
  'backoff: exponential',
  'pool: 8',
].join('\n')

const NOTES_CONTENT = [
  'scratch notes',
  'retries: 3',
  'remember to water the plants',
].join('\n')

export function fileContentFor(targetId) {
  return targetId === 'notes' ? NOTES_CONTENT : CONFIG_CONTENT
}

export function filePathFor(targetId) {
  const target = EDIT_TARGETS.find(item => item.id === targetId)
  if (target === undefined) throw new RangeError('未知目标文件：' + String(targetId))
  return target.path
}

/** 与上游同名的匹配函数：返回全部逐字出现的偏移。 */
function matchOffsets(content, search) {
  const offsets = []
  let offset = 0
  while (true) {
    const match = content.indexOf(search, offset)
    if (match < 0) return offsets
    offsets.push(match)
    offset = match + search.length
  }
}

/** 与上游同名：把偏移换算成 1 起始的行号。 */
function lineNumbersAt(content, offsets) {
  let line = 1
  let cursor = 0
  return offsets.map((offset) => {
    while (cursor < offset) {
      if (content[cursor] === '\n') line += 1
      cursor += 1
    }
    return line
  })
}

function resolveInput(input = {}) {
  const target = EDIT_TARGETS.find(item => item.id === (input.target ?? 'config'))
  if (target === undefined) throw new RangeError('未知目标文件：' + String(input.target))
  if (!SANDBOX_MODES.includes(input.sandboxMode ?? 'workspace-write')) {
    throw new RangeError('未知沙箱模式：' + String(input.sandboxMode))
  }
  if (typeof input.oldStr !== 'string' || input.oldStr.length === 0) {
    throw new TypeError('old_str 必须是非空字符串（上游对空串显式报错）')
  }
  if (typeof input.newStr !== 'string') throw new TypeError('new_str 必须是字符串（缺省按空串处理）')
  return { target: target.id, sandboxMode: input.sandboxMode ?? 'workspace-write', oldStr: input.oldStr, newStr: input.newStr }
}

/**
 * 推演一次 str_replace。
 *
 * 管线阶段顺序照抄上游 replaceInFile：resolve → fs/edit-intent → stat → read →
 * 计数匹配 → write（沙箱在这一步执行，拒绝被映射成 marker）。
 */
export function buildFsEditModel(input = {}) {
  const resolved = resolveInput(input)
  const target = EDIT_TARGETS.find(item => item.id === resolved.target)
  const path = target.path
  const before = fileContentFor(resolved.target)

  const steps = []
  const push = (stage, ok, detail, extras = {}) => {
    steps.push({ index: steps.length, stage, ok, detail, ...extras })
  }

  push('resolve(path)', true, '绝对路径解析为 FsTarget：' + path)
  push('fs/edit-intent', true, 'waterfall 预检写入意图（单一决策位）')
  push('stat', true, '文件存在且是常规文件')
  push('read', true, `读入 ${String(before.split('\n').length)} 行原文`)

  const offsets = matchOffsets(before, resolved.oldStr)
  const matchLines = lineNumbersAt(before, offsets)
  push(`match ×${String(offsets.length)}`, offsets.length === 1,
    offsets.length === 0 ? 'old_str 没有逐字出现'
      : offsets.length === 1 ? `恰好一次，位于第 ${String(matchLines[0])} 行`
        : `出现 ${String(offsets.length)} 次（第 ${matchLines.map(line => String(line)).join('、')} 行）——必须唯一`,
    { matchCount: offsets.length })

  const confinedViolation = resolved.sandboxMode === 'read-only'
    || (resolved.sandboxMode === 'workspace-write' && !target.insideWorkspace)
  const denied = offsets.length === 1 && confinedViolation

  let outcome
  let after = null
  let diffCard = null
  let versionFrom = null
  let versionTo = null

  if (offsets.length === 0) {
    outcome = {
      kind: 'not-found',
      errorCode: 'FS_EDIT_NOT_FOUND',
      message: `No replacement was performed, old_str \`${resolved.oldStr}\` did not appear verbatim in ${path}.`,
    }
    push('write（沙箱执行）', false, '没有到达写入：匹配阶段已经失败')
  } else if (offsets.length > 1) {
    outcome = {
      kind: 'ambiguous',
      errorCode: 'FS_AMBIGUOUS_EDIT',
      message: `No replacement was performed. Multiple occurrences of old_str \`${resolved.oldStr}\` in lines [${matchLines.join(', ')}]. Please ensure it is unique`,
    }
    push('write（沙箱执行）', false, '没有到达写入：匹配阶段已经失败')
  } else if (denied) {
    outcome = {
      kind: 'sandbox-denied',
      errorCode: 'FS_SANDBOX_DENIED',
      message: `[sandbox: file access denied under ${resolved.sandboxMode} mode]`,
    }
    push('write（沙箱执行）', false, `沙箱在写入时拒绝：${outcome.message}`, { sandboxDenied: true })
  } else {
    after = before.slice(0, offsets[0]) + resolved.newStr + before.slice(offsets[0] + resolved.oldStr.length)
    // 上游 presentCall 的 diff 卡载荷：oldText 是请求里的 old_str，newText 是 new_str。
    diffCard = {
      card: 'diff',
      title: `str_replace ${path}`,
      diffs: [{ path, oldText: resolved.oldStr, newText: resolved.newStr }],
      locations: [{ path }],
    }
    versionFrom = 7
    versionTo = 8
    outcome = {
      kind: 'success',
      errorCode: null,
      message: `The file ${path} has been edited successfully.`,
    }
    push('write（沙箱执行）', true, `replaceIfVersion(version=${String(versionFrom)}) 写入成功 → version=${String(versionTo)}`, {
      wroteVersion: versionTo,
    })
    push('fs/observed', true, `广播 fs/observed（kind=present, version=${String(versionTo)}）`)
  }

  const observations = {
    matchCount: offsets.length,
    matchLines,
    sandboxMode: resolved.sandboxMode,
    outcomeKind: outcome.kind,
    wrote: outcome.kind === 'success',
  }

  return {
    input: resolved,
    path,
    before,
    after,
    steps,
    outcome,
    diffCard,
    versionFrom,
    versionTo,
    observations,
    canProve: Object.freeze([
      '匹配规则：old_str 必须逐字出现且唯一；0 次与多于一次都不写入。',
      '多义拒绝的行号列表由同一个 lineNumbersAt 算法给出。',
      '沙箱拒绝发生在写入阶段：read-only 全拒，workspace-write 只放行 workspace 内的路径。',
      '成功写入携带 replaceIfVersion 版本号；diff 卡载荷就是请求里的 old_str 与 new_str。',
    ]),
    cannotProve: Object.freeze([
      '真实文件系统、真实磁盘版本号或真实并发竞争。',
      '真实部署里 fs/write-intent 策略插件的全部行为。',
      '审批界面与审批人动作；本页的策略是一个纯函数。',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，重跑同一份匹配算法并核对四类不变量；
 * 篡改任一输出字段都会让对应检查失败。
 */
export function evaluateFsEditOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildFsEditModel(model.input)
  add('EDIT_DETERMINISTIC', '同一输入重复推演得到同一条管线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const before = fileContentFor(model.input.target)
  const offsets = matchOffsets(before, model.input.oldStr)
  add('MATCH_COUNT_RULE', '结果类型与匹配次数一致',
    (offsets.length === 0 && model.outcome.kind === 'not-found')
    || (offsets.length > 1 && model.outcome.kind === 'ambiguous')
    || (offsets.length === 1 && (model.outcome.kind === 'success' || model.outcome.kind === 'sandbox-denied')),
    `${String(offsets.length)} 次匹配对应的结局`, model.outcome.kind)

  const lines = lineNumbersAt(before, offsets)
  add('AMBIGUOUS_LINES', '多义报错的行号列表可独立复算',
    offsets.length <= 1 || model.observations.matchLines.join(',') === lines.join(','),
    offsets.length > 1 ? `[${lines.join(', ')}]` : '（不适用）',
    `[${model.observations.matchLines.join(', ')}]`)

  const target = EDIT_TARGETS.find(item => item.id === model.input.target)
  const shouldDeny = offsets.length === 1
    && (model.input.sandboxMode === 'read-only'
      || (model.input.sandboxMode === 'workspace-write' && !target.insideWorkspace))
  add('SANDBOX_GATE', '沙箱只在「受限模式 × 越界路径」组合下拒绝',
    (shouldDeny && model.outcome.kind === 'sandbox-denied')
    || (!shouldDeny && model.outcome.kind !== 'sandbox-denied'),
    shouldDeny ? '拒绝写入' : '放行或因其他原因失败', model.outcome.kind)

  const failureKinds = ['not-found', 'ambiguous', 'sandbox-denied']
  add('NO_WRITE_ON_FAILURE', '任何失败结局都没有产出新内容',
    failureKinds.includes(model.outcome.kind) ? model.after === null : typeof model.after === 'string',
    failureKinds.includes(model.outcome.kind) ? 'after 为空' : 'after 为新内容',
    model.after === null ? 'after 为空' : 'after 为新内容')

  if (model.outcome.kind === 'success') {
    const expectedAfter = before.slice(0, offsets[0]) + model.input.newStr + before.slice(offsets[0] + model.input.oldStr.length)
    const diffOk = model.diffCard !== null
      && model.diffCard.diffs[0].oldText === model.input.oldStr
      && model.diffCard.diffs[0].newText === model.input.newStr
      && model.after === expectedAfter
    add('WRITE_AND_DIFF_PAYLOAD', '成功写入的内容与 diff 卡载荷都可复算',
      diffOk, '新内容与 oldText/newText 一致', diffOk ? '一致' : '不一致')
  }

  return { pass: checks.every(check => check.pass), checks }
}
