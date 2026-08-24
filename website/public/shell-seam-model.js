/**
 * dsh-shell 显式解析缝隙（resolve seam）的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/shell/shell/src/index.ts 与
 * packages/shell/bash-local/src/index.ts：Service Definition 只声明
 * `abstract resolve(request): Spec`；run/start 只收 Spec、绝不收裸请求。
 * bash-local 的 resolve 填 workdir（config.cwd，否则 process.cwd()）、
 * timeoutMs（请求值缺省取 config.timeoutMs=120_000，封顶 maxTimeoutMs=
 * 600_000）、stdoutMaxBytes（缺省 config.maxOutputBytes）；stdin/env/dshEnv/
 * sandboxPolicy 原样携带——非沙箱执行器里 sandboxPolicy 是惰性字段，
 * 沙箱子类覆写 resolve 给它盖默认章。
 *
 * 教学约定：路径、超时和字节预算都是教学常量；「run 不再补默认值」由
 * SPEC_HAS_NO_UNDEFINED 检查表达。没有真实子进程。
 */

export const SHELL_EXECUTORS = Object.freeze(['bash-local', 'bash-sandbox'])

/** 教学用执行器配置；数值取自 bash-local 的 Config 默认值。 */
const EXECUTOR_CONFIG = Object.freeze({
  'bash-local': Object.freeze({
    cwd: '/repo',
    timeoutMs: 120_000,
    maxTimeoutMs: 600_000,
    maxOutputBytes: 65_536,
    stampsSandboxPolicy: false,
    label: '本地执行器（不设防）',
  }),
  'bash-sandbox': Object.freeze({
    cwd: '/workspace',
    timeoutMs: 120_000,
    maxTimeoutMs: 600_000,
    maxOutputBytes: 65_536,
    stampsSandboxPolicy: true,
    defaultPolicy: Object.freeze({ mode: 'workspace-write', root: '/workspace' }),
    label: '沙箱执行器（同一 Service Definition 的另一个 Provider）',
  }),
})

export const SANDBOX_MODES = Object.freeze(['read-only', 'workspace-write', 'danger-full-access'])

function resolveInput(input = {}) {
  if (!SHELL_EXECUTORS.includes(input.executor ?? 'bash-local')) {
    throw new RangeError('未知执行器：' + String(input.executor))
  }
  const request = input.request ?? {}
  if (typeof request.command !== 'string' || request.command.trim().length === 0) {
    throw new TypeError('command 必须是非空字符串')
  }
  for (const key of ['workdir', 'stdin']) {
    if (request[key] !== undefined && typeof request[key] !== 'string') {
      throw new TypeError(`${key} 必须是字符串或省略`)
    }
  }
  for (const key of ['timeoutMs', 'stdoutMaxBytes']) {
    if (request[key] !== undefined && !Number.isInteger(request[key])) {
      throw new TypeError(`${key} 必须是整数或省略`)
    }
  }
  const policy = request.sandboxPolicy
  if (policy !== undefined && (typeof policy !== 'object' || policy === null || !SANDBOX_MODES.includes(policy.mode))) {
    throw new TypeError('sandboxPolicy.mode 必须是三种档位之一')
  }
  return {
    executor: input.executor ?? 'bash-local',
    // 深拷贝请求：resolve 是纯函数，绝不允许改写调用方的对象。
    request: Object.freeze({ ...request }),
  }
}

/**
 * 把 ShellExecRequest 解析成 ShellExecSpec，并给每个键标出来源：
 *   request         调用方显式给了
 *   config-default  请求省略，由执行器配置补齐
 *   clamped         请求值超过 maxTimeoutMs，被封顶
 *   executor-stamp  沙箱执行器在 resolve 里盖的默认章
 */
export function resolveShellRequest(input = {}) {
  const resolved = resolveInput(input)
  const config = EXECUTOR_CONFIG[resolved.executor]
  const request = resolved.request

  const specEntries = []
  const push = (key, value, source, note = null) => specEntries.push({ key, value, source, note })

  push('command', request.command, 'request')

  if (request.workdir !== undefined) push('workdir', request.workdir, 'request')
  else push('workdir', config.cwd, 'config-default', `config.cwd，最终兜底是 process.cwd()`)

  let timeoutSource = 'request'
  let timeoutNote = null
  let timeoutValue = request.timeoutMs
  if (timeoutValue === undefined) {
    timeoutValue = config.timeoutMs
    timeoutSource = 'config-default'
    timeoutNote = 'config.timeoutMs'
  }
  if (timeoutValue > config.maxTimeoutMs) {
    timeoutValue = config.maxTimeoutMs
    timeoutSource = 'clamped'
    timeoutNote = `被 maxTimeoutMs=${String(config.maxTimeoutMs)} 封顶`
  }
  push('timeoutMs', timeoutValue, timeoutSource, timeoutNote)

  if (request.stdoutMaxBytes !== undefined) push('stdoutMaxBytes', request.stdoutMaxBytes, 'request')
  else push('stdoutMaxBytes', config.maxOutputBytes, 'config-default', 'config.maxOutputBytes')

  if (request.stdin !== undefined) push('stdin', request.stdin, 'request')
  if (request.env !== undefined) push('env', request.env, 'request')
  if (request.dshEnv !== undefined) push('dshEnv', request.dshEnv, 'request')

  if (request.sandboxPolicy !== undefined) {
    push('sandboxPolicy', request.sandboxPolicy.mode === undefined ? request.sandboxPolicy : request.sandboxPolicy.mode, 'request')
  } else if (config.stampsSandboxPolicy) {
    push('sandboxPolicy', `${config.defaultPolicy.mode} @ ${config.defaultPolicy.root}`, 'executor-stamp', '沙箱子类覆写 resolve 盖的默认章')
  } else {
    push('sandboxPolicy', null, 'executor-inert', '非沙箱执行器原样携带 undefined——字段存在但不起作用')
  }

  const spec = {}
  for (const entry of specEntries) spec[entry.key] = entry.value

  return {
    input: resolved,
    executorLabel: config.label,
    stampsSandboxPolicy: config.stampsSandboxPolicy,
    entries: specEntries,
    spec,
  }
}

/** 完整模型：解析结果加观测读数与证据边界。 */
export function buildShellSeamModel(input = {}) {
  const resolution = resolveShellRequest(input)
  const requiredKeys = ['command', 'workdir', 'timeoutMs', 'stdoutMaxBytes', 'sandboxPolicy']
  const missing = requiredKeys.filter(key => !(key in resolution.spec))

  return {
    ...resolution,
    requiredKeys,
    observations: {
      filledKeys: resolution.entries.length,
      missingRequiredKeys: missing,
      clampedFields: resolution.entries.filter(entry => entry.source === 'clamped').map(entry => entry.key),
      sandboxPolicyAlwaysPresentOnSandboxExecutor:
        !resolution.stampsSandboxPolicy || (resolution.spec.sandboxPolicy !== undefined && resolution.spec.sandboxPolicy !== null),
    },
    canProve: Object.freeze([
      'resolve 之后每个必需键都有显式值：run/start 收到的 Spec 没有任何待补默认。',
      'timeoutMs 超过 maxTimeoutMs 时在 resolve 里被封顶，而不是执行到一半才失效。',
      '沙箱执行器的 Spec 一定带 sandboxPolicy（请求给的照搬，没给就盖章）；本地执行器原样携带 undefined。',
      'resolve 是纯函数：调用方传入的 request 对象不会被改写。',
    ]),
    cannotProve: Object.freeze([
      '真实子进程的启动、输出采集或退出码语义。',
      '真实部署里 config.cwd 与 process.cwd() 的取值。',
      '沙箱策略插件的全部行为；本页只演示 resolve 这一道缝隙。',
    ]),
  }
}

/**
 * 独立校验：重跑一次解析比对条目，再核对「Spec 无缺口」「封顶规则」
 * 「沙箱盖章」「请求不可变」四条不变量。
 */
export function evaluateShellSeamOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const again = resolveShellRequest(model.input)
  add('RESOLVE_DETERMINISTIC', '同一请求重复解析得到同一条 Spec',
    JSON.stringify(again.entries) === JSON.stringify(model.entries),
    '两次解析一致', JSON.stringify(again.entries) === JSON.stringify(model.entries) ? '一致' : '不一致')

  const stillMissing = model.requiredKeys.filter(key => !(key in model.spec))
  add('SPEC_HAS_NO_UNDEFINED', 'run/start 需要的键在 Spec 里全部就位',
    stillMissing.length === 0, '0 个缺口', stillMissing.join('、') || '0 个缺口')

  const config = EXECUTOR_CONFIG[model.input.executor]
  const timeout = model.entries.find(entry => entry.key === 'timeoutMs')
  add('TIMEOUT_CLAMPED', 'timeoutMs 永远不超过 maxTimeoutMs',
    timeout.value <= config.maxTimeoutMs,
    `≤ ${String(config.maxTimeoutMs)}`,
    String(timeout.value) + (timeout.source === 'clamped' ? '（已封顶）' : ''))

  const policyEntry = model.entries.find(entry => entry.key === 'sandboxPolicy')
  const policyOk = config.stampsSandboxPolicy
    ? policyEntry.value !== null && policyEntry.value !== undefined
    : policyEntry.source === 'executor-inert' ? policyEntry.value === null || policyEntry.value === undefined : true
  add('SANDBOX_STAMP_OR_INERT', '沙箱执行器必盖章；本地执行器保持惰性透传',
    policyOk,
    config.stampsSandboxPolicy ? 'sandboxPolicy 有值' : 'sandboxPolicy 为 null 且标记 inert',
    String(policyEntry.value))

  const requestAgain = model.input.request
  add('REQUEST_IMMUTABLE', 'resolve 不改写调用方的请求对象',
    JSON.stringify(requestAgain) === JSON.stringify(again.input.request),
    '前后一致', JSON.stringify(requestAgain) === JSON.stringify(again.input.request) ? '一致' : '被改写')

  return { pass: checks.every(check => check.pass), checks }
}
