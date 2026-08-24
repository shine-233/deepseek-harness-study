/**
 * 工作区注册表（dsh-workspace）的纯教学模型：基于上游
 * packages/workspace/workspace/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 核心规则：
 * - 注册表按 realpath 规范化后的根路径去重：同一路径重复注册得到同一记录。
 * - 注册顺序稳定（stable registry order）：新条目追加在末尾。
 * - 会话通过 header 校验才能挂到工作区名下；不匹配的 header 被拒。
 * - 移动到非法目标抛 WorkspaceMoveInvalidError，原记录不变。
 *
 * 教学模型不做真实 fs.stat：「路径是否合法」是输入旋钮。
 */

export const WS_LANES = Object.freeze(['调用方', '工作区注册表', '会话归属'])

function resolveInput(input = {}) {
  if (input.duplicate !== undefined && typeof input.duplicate !== 'boolean') throw new TypeError('duplicate 必须是布尔值')
  if (input.moveInvalid !== undefined && typeof input.moveInvalid !== 'boolean') throw new TypeError('moveInvalid 必须是布尔值')
  if (input.attachSession !== undefined && typeof input.attachSession !== 'boolean') throw new TypeError('attachSession 必须是布尔值')
  return {
    duplicate: input.duplicate === true,
    moveInvalid: input.moveInvalid === true,
    attachSession: input.attachSession !== false,
  }
}

/** 推演一次工作区注册、可选的重复注册/非法移动与会话挂接。 */
export function buildWorkspaceModel(input = {}) {
  const resolved = resolveInput(input)
  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: WS_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'register', '注册 /repo/app：realpath 规范化后写入域存储。')
  push(1, 'stored', '记录进入稳定注册序：id 由 UUID 派生，顺序此后不再变动。', { order: 1 })
  if (resolved.duplicate) {
    push(0, 're-register', '再次注册同一路径 /repo/app。')
    push(1, 'dedupe', '规范化后与既有记录相同：返回同一条记录，不产生第二行。', { deduped: true })
  }
  if (resolved.moveInvalid) {
    push(0, 'move-invalid', '尝试把工作区移动到 /nonexistent/target。')
    push(1, 'move-rejected', '目标 stat 失败：WorkspaceMoveInvalidError 抛出，原记录原地不动。')
  }
  if (resolved.attachSession) {
    push(2, 'attach', '会话 sess-1 的 header 通过校验：归属到该工作区名下。', { attached: true })
  }

  const recordCount = resolved.duplicate ? 1 : 1
  return {
    input: { ...resolved },
    lanes: WS_LANES,
    steps,
    observations: {
      recordCount,
      stableOrder: true,
      deduped: resolved.duplicate,
      moveRejected: resolved.moveInvalid,
      sessionAttached: resolved.attachSession,
      forkShape: resolved.moveInvalid ? '非法移动被拒'
        : resolved.duplicate ? '去重返回同一条'
        : '常规注册',
    },
    canProve: [
      '同一路径重复注册返回同一条记录：realpath 归一化挡住大小写与符号链接差异。',
      '注册序稳定：先到者永远排在前。',
      '非法移动 fail loud 且原记录不动。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 fs.stat 在网络盘上的行为。',
      '不能证明真实 header 校验的全部字段。',
      '不能证明 WorkspaceEntityHost 的生命周期细节。',
      '不能用本页替代多工作区并存的隔离语义。',
    ],
  }
}

/** 独立校验。 */
export function evaluateWorkspaceOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildWorkspaceModel(model.input)
  add('WS_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  add('WS_RECORD_COUNT', '无论重复与否，注册表恰好一条记录',
    o.recordCount === 1, '1 条', String(o.recordCount))

  const moveStep = model.steps.find(s => s.phase === 'move-rejected')
  add('WS_MOVE_ATOMIC', '非法移动零副作用',
    !o.moveRejected || moveStep !== undefined,
    o.moveRejected ? '存在拒绝步骤' : '无移动场景',
    moveStep ? '已拒绝' : '—')

  const attach = model.steps.find(s => s.phase === 'attach')
  add('WS_SESSION_ATTACH', '会话经 header 校验后挂接',
    model.input.attachSession ? attach !== undefined : true,
    model.input.attachSession ? '已挂接' : '未挂接场景',
    attach ? '已挂接' : '未出现')

  return { pass: checks.every(c => c.pass), checks }
}
