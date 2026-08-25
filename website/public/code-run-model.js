/**
 * Code 运行结果分类学的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/code-runtime/code-runtime/src/types.ts：
 *
 *   run(request) 的错误是结算结果上的 error 字段，永远不是对 run() 本身的
 *   reject——报告失败的程序是调用方的职责，不是异常路径。六种失败类彼此正交：
 *   exception（程序抛错或没过解析）、timeout（预算到期，消息说明是哪条预算）、
 *   abort（signal 触发；在途 binding 调用由调用方结算，运行时只是不再等待）、
 *   worker-exit（执行基底未结算就死亡，例如 OOM）、invalid-output（完成值不是
 *   无损 JSON）、output-limit（序列化后的日志/值/诊断超出配置上限）。
 *   binding 命名空间：global 必须匹配语言中立标识符 [A-Za-z_][A-Za-z0-9_]*、
 *   不是任何语言的保留字、也不占用后端自有槽位（RESERVED_BINDING_GLOBALS，
 *   如 console 与 __dsh_main__）；$tools 这类 JS 专属拼写在任何后端都被拒绝。
 *
 * 教学约定：七个剧本是固定教学常量；没有真实 worker 线程或真实进程。
 */

export const CODE_RUN_SCENARIOS = Object.freeze([
  'success',
  'exception',
  'timeout',
  'abort',
  'worker-exit',
  'invalid-output',
  'output-limit',
])

export const FAILURE_KINDS = Object.freeze([
  'exception',
  'timeout',
  'abort',
  'worker-exit',
  'invalid-output',
  'output-limit',
])

/** 语言中立标识符规则：所有后端共用同一套，拒绝任何语言的专属拼写。 */
const PORTABLE_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/

/** 后端自有槽位：程序里的这些名字归运行时，binding 不许占用。 */
export const RESERVED_BINDING_GLOBALS = Object.freeze(['console', '__dsh_main__'])

/** 各语言共有的保留字抽样；命中即拒绝，保证同一份名单跨后端可用。 */
const RESERVED_WORDS = Object.freeze(['for', 'class', 'def', 'fn', 'func'])

export const BINDING_CANDIDATES = Object.freeze([
  'tools',
  'app_data',
  '$tools',
  'console',
  '__dsh_main__',
  'for',
])

export const BINDING_LABELS = Object.freeze({
  tools: 'tools —— 工具命名空间（合法）',
  app_data: 'app_data —— 业务数据命名空间（合法）',
  $tools: '$tools —— JS 专属拼写',
  console: 'console —— 后端自有槽位',
  __dsh_main__: '__dsh_main__ —— 后端入口槽位',
  for: 'for —— 保留字',
})

function validateBindingNamespace(globalName) {
  if (!PORTABLE_IDENTIFIER.test(globalName)) {
    return { ok: false, reason: `global 必须匹配 [A-Za-z_][A-Za-z0-9_]*：「${globalName}」在任何后端都不接受` }
  }
  if (RESERVED_WORDS.includes(globalName)) {
    return { ok: false, reason: `「${globalName}」是保留字；同一份 namespace 名单要跨语言可用，所以一律拒绝` }
  }
  if (RESERVED_BINDING_GLOBALS.includes(globalName)) {
    return { ok: false, reason: `「${globalName}」是后端自有槽位（RESERVED_BINDING_GLOBALS），binding 不许占用` }
  }
  return { ok: true, reason: `「${globalName}」通过三道检查：标识符形状、非保留字、非后端槽位` }
}

const SCENARIO_STEPS = {
  success: [
    { op: 'bindings 校验', detail: 'tools 通过三道检查；成员函数收到的 args 与返回值都必须是无损 JSON' },
    { op: 'run() 启动', detail: '程序作为 async 函数体执行：顶层 await 与 return 可用' },
    { op: 'console.log(\'computing…\')', detail: 'logs 按发出顺序收集：["computing…"]' },
    { op: 'return { ok: true }', detail: '完成值穿过无损 JSON 边界：result.value = { ok: true }，无 error 字段' },
  ],
  exception: [
    { op: 'run() 启动', detail: '同一套 bindings，程序第一行就引用了 undefined 的属性' },
    { op: '程序抛出 TypeError', detail: '解析或执行失败都归入 exception；detail 会原样喂回模型供自我修正' },
    { op: 'run() 正常 resolve', detail: 'error 是结果字段 { kind: \'exception\', message }——run() 本身不 reject' },
  ],
  timeout: [
    { op: 'run() 启动', detail: '预算是实现方经过校验的 Config，请求里没有隐藏旋钮' },
    { op: '循环长时间不归还', detail: '预算到期时运行时硬停程序，哪怕正在循环中途' },
    { op: 'resolve({ error: { kind: \'timeout\' } })', detail: '预算到期不是异常：kind=timeout 的消息会说明是哪条预算' },
  ],
  abort: [
    { op: 'signal 已处于 aborted', detail: 'AbortSignal 由调用方持有；本剧本在启动前就已触发' },
    { op: '运行时停止询问', detail: '在途 binding 调用仍由调用方结算——运行时只是不再等它' },
    { op: 'resolve({ error: { kind: \'abort\' } })', detail: 'abort 与 timeout 是两种独立结局：谁先到就报哪一种' },
  ],
  'worker-exit': [
    { op: 'run() 启动', detail: '程序跑在 worker 线程基底里' },
    { op: '基底未结算就死亡', detail: '例如 OOM：没有任何 JS 异常冒出来，线程直接消失' },
    { op: 'resolve({ error: { kind: \'worker-exit\' } })', detail: '基底死亡既不是 exception 也不是 timeout，单独归类' },
  ],
  'invalid-output': [
    { op: 'run() 启动', detail: '程序的 return 语句带了一个函数属性' },
    { op: '完成值无法无损 JSON 化', detail: '边界只放行 null/布尔/数/字符串/数组/纯对象' },
    { op: 'resolve({ error: { kind: \'invalid-output\' } })', detail: '失败就用 error 字段报告，不会偷偷把值渲染成字符串顶替' },
  ],
  'output-limit': [
    { op: 'run() 启动', detail: '程序持续输出大量日志' },
    { op: '序列化整体超限', detail: '上限量的是外层结果：日志 + 值 + 诊断一起算' },
    { op: 'resolve({ error: { kind: \'output-limit\' } })', detail: '截断不静默发生——超出上限就是 output-limit 结局' },
  ],
}

export function buildCodeRunModel(input = {}) {
  const scenario = CODE_RUN_SCENARIOS.find(item => item === input.scenario)
  if (scenario === undefined) throw new RangeError('未知剧本：' + String(input.scenario))
  const binding = BINDING_CANDIDATES.find(item => item === input.binding)
  if (binding === undefined) throw new RangeError('未知命名空间：' + String(input.binding))

  const bindingCheck = validateBindingNamespace(binding)
  const steps = []
  steps.push({
    index: steps.length,
    op: `bindings 校验：{ global: '${binding}' }`,
    kind: 'validate',
    pass: bindingCheck.ok,
    detail: bindingCheck.reason,
  })

  if (!bindingCheck.ok) {
    return {
      input: { scenario, binding },
      bindingCheck,
      steps,
      result: { resolved: true, value: null, logs: [], error: null, blockedBeforeRun: true },
      observations: { failureKind: null, logCount: 0, resolvedWithoutReject: true, blockedBeforeRun: true },
      canProve: Object.freeze([
        '非法命名空间让装配在任何程序执行之前大声失败。',
        '拒绝理由逐条对应三道检查：标识符形状、保留字、后端自有槽位。',
      ]),
      cannotProve: Object.freeze([
        '真实 worker 线程的创建耗时或内存水位。',
        '真实 V8/CPython 底座对非法名字的原生报错文案。',
      ]),
    }
  }

  for (const template of SCENARIO_STEPS[scenario]) {
    steps.push({ index: steps.length, kind: 'run', ...template })
  }

  const failed = scenario !== 'success'
  const failureKind = failed ? scenario : null
  const logCount = scenario === 'success' ? 1 : 0

  return {
    input: { scenario, binding },
    bindingCheck,
    steps,
    result: {
      resolved: true,
      value: scenario === 'success' ? { ok: true } : null,
      logs: scenario === 'success' ? ['computing…'] : [],
      error: failed ? { kind: failureKind, message: '教学示例：固定文案' } : null,
      blockedBeforeRun: false,
    },
    observations: {
      failureKind,
      logCount,
      resolvedWithoutReject: true,
      blockedBeforeRun: false,
    },
    canProve: Object.freeze([
      '失败以 error 字段随 resolve 返回；run() 对失败的程序从不 reject。',
      '六种失败类彼此正交：预算到期不是异常，中止不是超时，基底死亡两者都不是。',
      '完成值必须穿过无损 JSON 边界，否则按 invalid-output 报告而不是渲染字符串顶替。',
      '合法命名空间恰好通过三道检查：标识符形状、非保留字、非后端自有槽位。',
    ]),
    cannotProve: Object.freeze([
      '真实时间预算的毫秒数或真实输出上限的字节数——它们是实现方的 Config。',
      '真实 AbortSignal 的触发时机；教学剧本在启动前就已中止。',
      'worker 线程底座的真实崩溃现场（core dump 级别的证据）。',
    ]),
  }
}

export function evaluateCodeRunOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  add('ERROR_IS_FIELD_NOT_REJECTION', '失败剧本的 run() 仍然 resolve：错误住在 error 字段里',
    model.observations.resolvedWithoutReject === true,
    'resolved=true', `resolved=${String(model.observations.resolvedWithoutReject)}`)

  if (model.result.blockedBeforeRun) {
    add('FAIL_LOUD_BEFORE_RUN', '非法命名空间在程序启动前就被拒绝',
      model.steps.length === 1 && model.bindingCheck.ok === false,
      '恰 1 步校验失败', `${String(model.steps.length)} 步`)
    add('NO_PARTIAL_RUN', '被拒的装配没有产生任何运行步骤或日志',
      model.observations.logCount === 0 && !model.steps.some(step => step.kind === 'run'),
      '0 条运行步骤', `${String(model.steps.filter(step => step.kind === 'run').length)} 条`)
    return { pass: checks.every(check => check.pass), checks }
  }

  const expectedKind = model.input.scenario === 'success' ? null : model.input.scenario
  add('TAXONOMY_MATCHES_SCENARIO', 'failureKind 与剧本一一对应，六类互不混用',
    model.observations.failureKind === expectedKind,
    String(expectedKind), String(model.observations.failureKind))

  add('ORTHOGENAL_SINGLE_KIND', '结果至多携带一个失败类：正交性意味着不叠加',
    model.result.error === null || model.result.error.kind === expectedKind,
    '0 或 1 个 kind', String(model.result.error?.kind ?? 'none'))

  add('LOSSLESS_JSON_BOUNDARY', '成功值是无损 JSON；失败时 value 缺席而不是伪造',
    model.input.scenario === 'success'
      ? JSON.stringify(model.result.value) === '{"ok":true}'
      : model.result.value === null,
    model.input.scenario === 'success' ? '{"ok":true}' : 'value 缺席',
    model.input.scenario === 'success' ? JSON.stringify(model.result.value) : 'value 缺席')

  const rebuilt = buildCodeRunModel(model.input)
  add('CODE_RUN_DETERMINISTIC', '同一输入重建同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  return { pass: checks.every(check => check.pass), checks }
}
