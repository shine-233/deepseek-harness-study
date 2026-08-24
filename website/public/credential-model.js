/**
 * 凭据解析的纯模型：基于上游
 * packages/credentials/authorization/src/index.ts（基线 aa6c361a）的真实行为。
 *
 * 授权能力缝（ctx.authorization）的核心规则：凭据引用不能只靠配置解析——
 * 配置只能说「我要用哪个凭据」，但凭据的值必须由一个具体的 provider 提供。
 * 如果没有任何已注册的 provider 能供应这个引用，请求 fail-closed 拒绝，
 * 而不是返回 undefined 让调用方自己猜。
 *
 * 教学模型：三步流水线。
 *   1. 引用声明：配置里写了 credentialRef = "github-token"
 *   2. Provider 解析：逐个问已注册的 provider "你能供应 github-token 吗？"
 *   3. 结算：恰好一个 → 注入；零个 → fail-closed 拒绝；多个 → 取第一个注册者
 *
 * 没有测量：真实 OAuth 流程、真实 token 刷新、真实网络请求。
 */

export const CRED_LANES = Object.freeze(['配置声明', 'Provider 解析', '结算'])

export const CRED_SOURCES = Object.freeze(['env', 'keychain', 'none'])

export const CRED_REF_NAMES = Object.freeze(['github-token', 'api-key', 'unknown-ref'])

/**
 * 纯函数：给定输入，产出确定性步骤表与观测值。
 */
export function buildCredentialModel(input) {
  if (typeof input.refName !== 'string') throw new TypeError('refName 必须是字符串')
  const refName = input.refName
  const source = CRED_SOURCES.find(item => item === input.source)
  if (source === undefined) throw new RangeError('未知凭据来源：' + String(input.source))

  const steps = []
  let lane = 0
  function push(laneIdx, phase, detail, extra = {}) {
    steps.push({ lane: CRED_LANES[laneIdx], phase, detail, ...extra })
  }

  // 第一步：配置声明
  push(0, 'declare', `配置声明 credentialRef = "${refName}"，来源标记为 ${source}`)

  // 第二步：Provider 解析。教学模型是确定性的：unknown-ref 没有任何 Provider
  // 声明过，所以无论来源是什么都查不到；其余两个引用在已注册来源上命中。
  // 不读真实环境变量或钥匙串——那既不确定，也会让 oracle 在不同机器上结果不同。
  let resolved = null
  let resolverCount = 0
  const resolvable = refName !== 'unknown-ref'
  if (source === 'env') {
    push(1, 'probe', '环境变量 Provider：检查 ' + refName.toUpperCase().replace(/-/g, '_') + ' …', { attempt: 'env' })
    if (resolvable) {
      resolved = 'env'
      resolverCount = 1
      push(1, 'resolve', '环境变量命中：值已注入（本页不显示真实凭据值）。', { tier: 'ok' })
    } else {
      push(1, 'miss', '没有任何 Provider 声明过这个引用：该来源无法供应此凭据。', { tier: 'miss' })
    }
  } else if (source === 'keychain') {
    push(1, 'probe', '系统钥匙串 Provider：查询 ' + refName + ' …', { attempt: 'keychain' })
    if (resolvable) {
      resolved = 'keychain'
      resolverCount = 1
      push(1, 'resolve', '钥匙串命中：凭据已通过安全通道注入。', { tier: 'ok' })
    } else {
      push(1, 'miss', '钥匙串里没有这个引用的登记项：无法供应此凭据。', { tier: 'miss' })
    }
  } else {
    push(1, 'probe', '无已注册 Provider 可查——跳过解析阶段。', { tier: 'skip' })
  }

  // 第三步：结算
  if (resolved !== null) {
    push(2, 'settle-ok', `结算成功：凭据 "${refName}" 由 ${resolved} Provider 提供，注入 ctx.authorization。`)
  } else {
    push(2, 'settle-fail', `Fail-closed 拒绝：没有 Provider 能供应 "${refName}"。工具调用被阻止，不是返回空值让调用方猜。`)
  }

  return {
    input: { refName, source },
    steps,
    observations: {
      refName,
      source,
      resolved,
      resolverCount,
      failClosed: resolved === null,
    },
    canProve: Object.freeze([
      '凭据引用不能只靠配置解析——必须有具体的 Provider 提供值',
      '零个 Provider 命中时 fail-closed 拒绝，不是静默返回空',
      '多个 Provider 同时命中时取第一个注册者（本页模拟单 Provider 场景）',
      '凭据值永远不出现在日志或 Session 里——只有"命中/未命中"状态',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 OAuth 刷新流程',
      '真实 keychain 加密与解锁交互',
      '多 Provider 竞争时的优先级排序细节',
      '真实网络请求的延迟和超时行为',
    ]),
  }
}

export function evaluateCredentialOracle(model) {
  const checks = []
  const rebuilt = buildCredentialModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'CRED_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })
  checks.push({
    id: 'FAIL_CLOSED',
    label: model.input.source === 'none' || model.input.refName === 'unknown-ref'
      ? '无人能供应时 fail-closed'
      : '有 Provider 能供应时不触发 fail-closed',
    expected: model.input.source === 'none' || model.input.refName === 'unknown-ref' ? '拒绝' : '注入',
    actual: model.observations.failClosed ? '拒绝' : '注入',
    pass: model.observations.failClosed === (model.input.source === 'none' || model.input.refName === 'unknown-ref'),
  })
  return { pass: checks.every(c => c.pass), checks }
}
