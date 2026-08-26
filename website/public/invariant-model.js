/**
 * 包级运行时不变量注册台的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里
 * packages/runtime-diagnostics/invariants/src/index.ts 与 invariant.ts：
 *
 *   每个工作区包都从自己的 `./invariant` 伴生插件向 InvariantRegistry 注册
 *   检查；普通入口保持与诊断无关。register(packageName, installer) 先保留
 *   包名——即使过滤器把检查关掉，名字也照留；重复注册同一个包名直接拒绝。
 *   enabled / package_allowlist / package_blocklist 三层过滤决定是否真正起
 *   一个子 fiber 跑 installer：fail(message) 抛出带包归属的 InvariantError
 *   （`invariant violated by "<包名>"`），子 fiber 随之销毁、保留位释放；
 *   installer 启动失败走同一条路径。没有合理关系的包允许空 installer，
 *   但要写明理由——这条由仓库门禁把关，不属于本页的运行时模型。
 *
 * 教学约定：两个包名与五档过滤器 × 三种结局是固定教学常量；
 * 没有 Cordis 注册表或真实 fiber。
 * 教学故障：fault='swallow-violation' 把一次真实违规静默吞成「通过」——
 * 恒真校验骗局的标准造法，由 FAIL_ATTRIBUTES_PACKAGE 抓住错误凭据缺失。
 */

export const INVARIANT_PACKAGES = Object.freeze([
  '@deepseek-ai/dsh-jobs',
  '@deepseek-ai/dsh-invariants',
])

export const INVARIANT_FILTERS = Object.freeze([
  'unfiltered',
  'allowlist-match',
  'allowlist-miss',
  'blocklist-hit',
  'disabled',
])

export const INVARIANT_OUTCOMES = Object.freeze(['pass', 'violation', 'startup-error'])

/** 教学故障注入：把一次真实违规静默吞成「通过」。none 是唯一默认。 */
export const INVARIANT_FAULT_TYPES = Object.freeze(['none', 'swallow-violation'])

export const FILTER_LABELS = Object.freeze({
  unfiltered: '无过滤：enabled=true，名单为空',
  'allowlist-match': 'allowlist 命中：名单里有本包的正则',
  'allowlist-miss': 'allowlist 未命中：名单只认别的包',
  'blocklist-hit': 'blocklist 命中：本包被显式排除',
  disabled: 'enabled=false：全局开关关闭',
})

export const OUTCOME_LABELS = Object.freeze({
  pass: '检查通过：子 fiber 正常落座',
  violation: 'fail() 抛错：关系不成立',
  'startup-error': 'installer 启动即抛错',
})

function isSelected(filter) {
  return filter === 'unfiltered' || filter === 'allowlist-match'
}

/*
 * 教学故障注入：违规发生时把 fail() 步骤从时间线里抹掉、错误置空——
 * 检查「通过」了，但那条关系根本没有成立。其余步骤一律不变，
 * oracle 变红时只有一个原因：FAIL_ATTRIBUTES_PACKAGE 发现错误凭据缺失。
 */
function applyInvariantFault(model, fault) {
  if (fault !== 'swallow-violation' || model.input.outcome === 'pass') return model
  const withoutViolation = model.steps
    .filter(step => step.kind !== 'violate')
    .map((step, index) => ({ ...step, index }))
  model.steps = withoutViolation
  model.observations.error = null
  model.observations.checksRan = true
  return model
}

export function buildInvariantModel(input = {}) {
  const packageName = INVARIANT_PACKAGES.find(item => item === input.packageName)
  if (packageName === undefined) throw new RangeError('未知包名：' + String(input.packageName))
  const filter = INVARIANT_FILTERS.find(item => item === input.filter)
  if (filter === undefined) throw new RangeError('未知过滤器：' + String(input.filter))
  const outcome = INVARIANT_OUTCOMES.find(item => item === input.outcome)
  if (outcome === undefined) throw new RangeError('未知结局：' + String(input.outcome))
  const fault = INVARIANT_FAULT_TYPES.includes(input.fault ?? 'none') ? input.fault ?? 'none' : null
  if (fault === null) throw new RangeError('未知故障类型：' + String(input.fault))

  const steps = []
  const push = (op, detail, extras = {}) => {
    steps.push({ index: steps.length, op, detail, ...extras })
  }

  push(`register('${packageName}', installer)`,
    '先保留包名：这一步在过滤判断之前完成，所以被过滤的包同样占住名字',
    { kind: 'reserve', reserved: true })

  const selected = isSelected(filter)
  push(`过滤器判定：${FILTER_LABELS[filter]}`,
    selected ? '通过三层过滤：起一个子 fiber 真正安装检查' : '不安装检查，但保留位不动',
    { kind: 'filter', selected })

  let checksRan = false
  let error = null

  if (!selected) {
    push('返回仅释放保留位的 disposer',
      '检查被跳过：诊断开关不该改变注册表的形状，只改变谁真正跑起来',
      { kind: 'skip' })
  } else {
    push('子 fiber 启动 installer(ctx, fail)',
      'fail 绑定注册时的包名：它一旦调用就抛 InvariantError',
      { kind: 'child-start' })

    if (outcome === 'pass') {
      checksRan = true
      push('检查成立（事件流与数据对得上）',
        packageName === '@deepseek-ai/dsh-invariants'
          ? '这个包的 installer 是空的，但伴生文件写明了理由：注册所有权与子生命周期就是服务自身的变更边界'
          : '例如：结算记录与通知流的先后关系核对无误',
        { kind: 'check-pass' })
      push('disposer 落座',
        '卸载时先销毁子 fiber，再释放保留位——顺序固定',
        { kind: 'dispose-release' })
    } else {
      const message = outcome === 'violation'
        ? '结算记录缺失，但通知已经发出'
        : 'installer 在启动阶段就抛出了 TypeError'
      error = { code: 'INVARIANT', packageName, message }
      push(`fail('${message}')`,
        `InvariantError 抛出，文案带包归属：invariant violated by "${packageName}"`,
        { kind: 'violate', attributed: packageName })
      push('子 fiber 销毁，保留位释放',
        '失败的检查不留半座：下一次启动可以带着修好的检查重新注册',
        { kind: 'dispose-release' })
    }
  }

  const model = {
    input: { packageName, filter, outcome, fault },
    steps,
    observations: {
      reserved: true,
      selected,
      checksRan,
      error,
      duplicateRejected: true,
    },
    canProve: Object.freeze([
      '包名在过滤判断之前就被保留：关掉检查不会让名字回到可注册池。',
      'fail() 的错误文案带完整包名，违规当场知道该找谁。',
      '检查失败或 installer 启动失败都会销毁子 fiber 并释放保留位。',
      '同一包名的第二次 register 被 already registered 拒绝。',
    ]),
    cannotProve: Object.freeze([
      '真实 Cordis 注册表里 effect 与 fiber 的调度细节。',
      '仓库门禁 verify-package-invariants 对空 installer 理由的静态审查。',
      '真实进程里诊断开关的热更新行为。',
    ]),
  }
  return applyInvariantFault(model, fault)
}

export function evaluateInvariantOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  add('RESERVED_BEFORE_FILTER', '第一步就是保留包名，且任何组合下 reserved 都为真',
    model.steps[0].kind === 'reserve' && model.steps[0].reserved === true && model.observations.reserved,
    '第 0 步保留', model.steps[0].kind === 'reserve' ? '第 0 步保留' : `第 0 步是 ${String(model.steps[0].kind)}`)

  const selectedExpected = isSelected(model.input.filter)
  add('FILTER_DECIDES_INSTALL_ONLY', '过滤只决定是否安装检查，不影响保留位',
    model.observations.selected === selectedExpected && model.observations.reserved,
    selectedExpected ? '安装' : '跳过', selectedExpected ? '安装' : '跳过')

  if (!model.observations.selected) {
    add('NO_CHILD_WHEN_FILTERED', '被过滤的组合没有子 fiber 步骤',
      !model.steps.some(step => step.kind === 'child-start'),
      '0 步', `${String(model.steps.filter(step => step.kind === 'child-start').length)} 步`)
  } else if (model.input.outcome === 'pass') {
    add('PASS_SEATS_DISPOSER', '通过的检查以 disposer 落座收尾',
      model.steps[model.steps.length - 1].kind === 'dispose-release' && model.observations.checksRan,
      'disposer 收尾', model.steps[model.steps.length - 1].kind === 'dispose-release' ? 'disposer 收尾' : '异常收尾')
    add('NO_ERROR_ON_PASS', '通过的组合不带错误',
      model.observations.error === null, 'error=null', String(model.observations.error?.code ?? 'null'))
  } else {
    add('FAIL_ATTRIBUTES_PACKAGE', '失败的错误带包归属与稳定码',
      model.observations.error !== null
        && model.observations.error.code === 'INVARIANT'
        && model.observations.error.packageName === model.input.packageName,
      `INVARIANT @ ${model.input.packageName}`,
      `${String(model.observations.error?.code)} @ ${String(model.observations.error?.packageName)}`)
    add('FAILURE_RELEASES_RESERVATION', '失败路径以「销毁子 fiber + 释放保留位」收尾',
      model.steps[model.steps.length - 1].kind === 'dispose-release',
      '释放收尾', model.steps[model.steps.length - 1].kind === 'dispose-release' ? '释放收尾' : '其他')
  }

  const rebuilt = buildInvariantModel(model.input)
  add('INVARIANT_DETERMINISTIC', '同一输入重建同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  return { pass: checks.every(check => check.pass), checks }
}
