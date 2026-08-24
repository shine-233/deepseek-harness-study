/**
 * 沙箱策略（sandbox-policy）的纯教学模型：基于上游
 * packages/sandbox/sandbox-policy 与 sandbox/src/index.ts（基线 aa6c361a）。
 *
 * 核心规则：
 * - 沙箱模式是封闭三元：read-only / workspace-write / danger-full-access。
 * - workspace-write 只放行「会话工作区内 + 平台临时区」的写入；
 *   工作区根在策略解析时做 realpath 规范化，符号链接无法绕过。
 * - 会话可用 sandbox/mode 事件覆盖模式；该事件作为模型历史入册，
 *   所以重放能重建出与执行侧一致的策略（模型可见 ⟺ 可从日志重建）。
 * - 拒绝不是终点：工具自带的拒绝与升级指引会随结果返回。
 *
 * 教学模型不碰真实文件系统：写入位置按「工作区内/外/临时区」三类枚举。
 */

export const SBX_LANES = Object.freeze(['操作', '策略解析', '文件沙箱'])

export const SANDBOX_MODES = Object.freeze(['read-only', 'workspace-write', 'danger-full-access'])

function resolveInput(input = {}) {
  const mode = SANDBOX_MODES.includes(input.mode) ? input.mode : 'workspace-write'
  if (input.mode !== undefined && !SANDBOX_MODES.includes(input.mode)) {
    throw new RangeError('未知模式：' + String(input.mode))
  }
  if (input.op !== undefined && !['write-in-workspace', 'write-outside', 'write-temp', 'read'].includes(input.op)) {
    throw new RangeError('未知操作：' + String(input.op))
  }
  if (input.sessionOverride !== undefined && typeof input.sessionOverride !== 'boolean') {
    throw new TypeError('sessionOverride 必须是布尔值')
  }
  return {
    mode,
    op: input.op ?? 'write-in-workspace',
    sessionOverride: input.sessionOverride === true,
  }
}

/** 判定一次操作在给定模式下的结局。 */
export function decideOperation(mode, op) {
  if (mode === 'danger-full-access') return 'allowed'
  if (op === 'read') return 'allowed'
  if (op === 'write-temp' && mode === 'workspace-write') return 'allowed'
  if (op === 'write-in-workspace' && mode === 'workspace-write') return 'allowed'
  return 'denied'
}

/** 推演一次操作穿越策略缝的全过程。 */
export function buildSandboxModel(input = {}) {
  const resolved = resolveInput(input)
  const { mode, op, sessionOverride } = resolved

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: SBX_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'operation', op.startsWith('write')
    ? '请求写入：' + (op === 'write-in-workspace' ? '会话工作区内路径。' : op === 'write-temp' ? '平台临时区路径。' : '工作区外路径。')
    : '读取请求：不落任何写效应。')

  let effective = mode
  if (sessionOverride) {
    effective = mode
    push(1, 'override-event', '本会话曾以 sandbox/mode 事件把模式覆盖为 ' + mode
      + '——事件已作为模型历史入册，重放重建出同一策略。', { overridden: true })
  } else {
    push(1, 'resolve', '部署默认生效：' + mode
      + (mode === 'workspace-write' ? '（工作区根经 realpath 规范化，符号链接绕不过）。' : '。'))
  }

  const verdict = decideOperation(effective, op)
  if (verdict === 'allowed') {
    push(2, 'enforce-allow', '文件沙箱放行本次' + (op === 'read' ? '读' : '写') + '效应。')
    push(0, 'done-allow', '操作完成。')
  } else {
    push(2, 'enforce-deny', '文件沙箱拒绝本次写效应。')
    push(0, 'denial-guidance', '拒绝连同该工具自己的升级指引一起返回给模型——被拒不等于死路。')
  }

  return {
    input: { ...resolved },
    lanes: SBX_LANES,
    steps,
    observations: {
      mode,
      effectiveMode: effective,
      op,
      verdict,
      policyInHistory: sessionOverride,
      forkShape: verdict === 'allowed'
        ? '放行：' + op
        : '拒绝：' + op + ' 在 ' + effective + ' 下',
    },
    canProve: [
      '模式是封闭三元，任何输入都落在三者之一。',
      'workspace-write 放行工作区内与临时区写入，其余一律拒绝。',
      '会话覆盖走 sandbox/mode 事件并入册，重放可重建同一策略。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 landlock/windows-acl 的内核强制机制。',
      '不能证明平台临时区的具体清单。',
      '不能证明各工具升级指引的完整文案。',
      '不能用本页替代 bash/pwsh 后端各自的执行方言。',
    ],
  }
}

/** 独立校验。 */
export function evaluateSandboxOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildSandboxModel(model.input)
  add('SBX_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  // 全网格真值表由测试遍历；这里核对单条推演的自洽性。
  const expectVerdict = decideOperation(o.effectiveMode ?? model.input.mode, model.input.op)
  add('SBX_DECISION_TABLE', '结局符合三模式 × 操作判定表',
    o.verdict === expectVerdict,
    String(expectVerdict), String(o.verdict))

  const overrideStep = model.steps.find(s => s.phase === 'override-event')
  add('SBX_OVERRIDE_IN_HISTORY', '会话覆盖以事件形式入册（可重放）',
    (model.input.sessionOverride === true) === (overrideStep !== undefined),
    model.input.sessionOverride ? '存在覆盖事件' : '无覆盖场景',
    overrideStep !== undefined ? '已入册' : '未出现')

  return { pass: checks.every(c => c.pass), checks }
}
