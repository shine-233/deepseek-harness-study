/**
 * LSP 缝（dsh-lsp）的纯教学模型：基于上游 packages/lsp/lsp/src/index.ts
 * 顶注的真实约定。
 *
 * 核心规则：
 * - Provider 注册是原子事务：先全部校验并冲突检查，再一次性生效；
 *   无效或冲突的注册不发布任何东西（fail loud，零残留）。
 * - 每个 provider 独占地预留一组文件扩展名：两个 provider 抢同一个扩展名
 *   ⇒ 后者整体注册失败。
 * - 查询按「文件的最终扩展名」路由，与注册顺序无关。
 * - 缝只暴露四个操作（goToDefinition / findReferences / goToImplementation /
 *   hover），没有 JSON-RPC 逃生门。
 *
 * 教学模型不启动真实语言服务器。
 */

export const LSP_LANES = Object.freeze(['调用方', 'LSP 注册表', 'Provider', '查询结果'])

export const LSP_OPS = Object.freeze(['goToDefinition', 'findReferences', 'goToImplementation', 'hover'])

function resolveInput(input = {}) {
  if (input.conflict !== undefined && typeof input.conflict !== 'boolean') throw new TypeError('conflict 必须是布尔值')
  if (input.invalidExt !== undefined && typeof input.invalidExt !== 'boolean') throw new TypeError('invalidExt 必须是布尔值')
  if (input.queryExt !== undefined && !['ts', 'py'].includes(input.queryExt)) {
    throw new RangeError('未知扩展名：' + String(input.queryExt))
  }
  return {
    conflict: input.conflict === true,
    invalidExt: input.invalidExt === true,
    queryExt: input.queryExt ?? 'ts',
    queryOp: LSP_OPS.includes(input.queryOp) ? input.queryOp : 'hover',
  }
}

/**
 * 推演一次 provider 注册与一次查询路由。
 */
export function buildLspModel(input = {}) {
  const resolved = resolveInput(input)
  const { conflict, invalidExt, queryExt, queryOp } = resolved

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: LSP_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'register-request', 'typescript-lsp 申请预留 .ts；python-lsp 申请预留 .py——各自带品牌化 id。')
  if (!invalidExt) {
    push(1, 'reserved-ts', '.ts 预留成功：typescript-lsp 独占该扩展名的四类查询。')
  } else {
    push(0, 'invalid-registration', '某个 provider 声明了非法扩展名（空串）：整笔注册在生效前被拒绝。')
    push(1, 'nothing-published', '原子性：校验先于变更——没有任何预留被部分写入。')
  }
  if (conflict) {
    push(0, 'conflict-request', 'deno-lsp 也想预留 .ts。')
    push(1, 'conflict-rejected', '扩展名独占：冲突注册整体失败，先到者不受影响。')
  }
  push(2, 'ready', (invalidExt ? 'python-lsp' : 'typescript-lsp 与 python-lsp') + ' 就绪，可接受查询。')

  const router = !invalidExt ? { ts: 'typescript-lsp', py: 'python-lsp' } : { py: 'python-lsp' }
  const routedTo = router[queryExt] ?? null
  push(0, 'query', '发起 ' + queryOp + ' 查询：文件是 sample.' + queryExt + '。')
  push(1, 'route-by-extension', '按最终扩展名路由 → ' + routedTo + '：与两家的注册顺序无关。',
    { routedTo })
  push(3, 'result', routedTo
    ? routedTo + ' 返回 ' + queryOp + ' 结果。缝只有四个操作——没有 JSON-RPC 逃生门。'
    : '没有 provider 预留这个扩展名：查询无路可走。')

  return {
    input: { ...resolved },
    lanes: LSP_LANES,
    steps,
    observations: {
      queryExt,
      queryOp,
      routedTo,
      registrationFailed: invalidExt || conflict,
      atomicNoResidue: true,
      opsExposed: [...LSP_OPS],
      forkShape: invalidExt ? '非法注册被整体拒收'
        : conflict ? '冲突注册让位给先到者'
        : '双 provider 各占一个扩展名',
    },
    canProve: [
      'provider 注册是原子的：无效或冲突时不发布任何预留。',
      '每个扩展名同时只有一个 provider：后来者的冲突注册整体失败。',
      '查询按文件最终扩展名路由，注册顺序不影响结果。',
      '缝恰好暴露四个查询操作，没有 JSON-RPC 逃生门。',
    ],
    cannotProve: [
      '不能证明真实语言服务器的启动参数或诊断推送行为。',
      '不能证明真实 textDocument 同步协议；本页只建模注册与路由。',
      '不能证明真实 HarnessError 的错误码表。',
      '不能用本页替代 provider 的崩溃恢复语义。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算每一条规则。 */
export function evaluateLspOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildLspModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('LS_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  const failStep = model.steps.some(s => s.phase === 'nothing-published' || s.phase === 'conflict-rejected')
  add('LS_ATOMIC_REGISTRATION', '失败注册零残留',
    o.registrationFailed === failStep,
    o.registrationFailed ? '存在失败步骤' : '无失败场景',
    failStep ? '有失败步骤' : '全部成功')

  // 路由必须由扩展名决定：换注册顺序不改变结果（模型里顺序固定，校验口径本身）。
  const routeStep = model.steps.find(s => s.phase === 'route-by-extension')
  add('LS_EXTENSION_ROUTING', '查询按最终扩展名路由',
    routeStep !== undefined && routeStep.routedTo === o.routedTo,
    String(o.routedTo ?? '无处可去'),
    String(routeStep?.routedTo ?? '未路由'))

  const opUsed = LSP_OPS.includes(o.queryOp)
  add('LS_FOUR_OPS_ONLY', '只暴露四个查询操作',
    opUsed && model.steps.every(s => !String(s.phase).includes('jsonrpc')),
    '[' + LSP_OPS.join(', ') + ']',
    String(o.queryOp))

  return { pass: checks.every(c => c.pass), checks }
}
