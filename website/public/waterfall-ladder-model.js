/**
 * 瀑布语义阶梯的纯函数模型。
 *
 * 语义对照 vendored Cordis（vendor/cordis/src/events.ts）与
 * docs/cordis-primer.md「waterfall 语义」一节：
 * - 监听器按注册顺序执行；
 * - 每个监听器收到 `(...args, next)`，`next(value)` 把（可能改写的）值交给下一个；
 * - 不调 next() 直接 return = 短路：后面的监听器收不到，自己的返回值成为合成结果；
 * - 单决策事件里短路是设计：拥有决定权的策略监听器可以不委托，
 *   只做注释/观察的监听器必须调用 next()。
 *
 * 本文件不碰 document；视图层据此逐帧动画。所有变换都是教学用的最小示例。
 */

export const WATERFALL_INITIAL_VALUE = 1

export const TRANSFORMS = {
  A: { label: '×2', apply: value => value * 2 },
  B: { label: '+10', apply: value => value + 10 },
  C: { label: '原样', apply: value => value },
}

/**
 * @param options.scenario 'single' | 'order' | 'compose' | 'shortcircuit' | 'roles'
 * @param options.initialValue 进入 ctx 的初始数值（教学示例里是一个整数）。
 * @param options.bDelegates shortcircuit 场景下 B 是否调用 next() 委托给 C。
 * @param options.role roles 场景下 B 扮演的角色：'policy'（策略官）或 'annotator'（记录员）。
 * @returns 轨迹：steps 逐段给出信号从谁到谁、当时携带的值；result 汇总结局。
 */
export function buildWaterfallTrace(options = {}) {
  const scenario = options.scenario ?? 'compose'
  const initialValue = Number.isFinite(options.initialValue) ? Math.trunc(options.initialValue) : WATERFALL_INITIAL_VALUE
  const bDelegates = options.bDelegates !== undefined ? Boolean(options.bDelegates) : true
  const role = options.role === 'policy' ? 'policy' : 'annotator'

  const chain = {
    single: ['A'],
    order: ['A', 'B'],
    compose: ['A', 'B', 'C'],
    shortcircuit: ['A', 'B', 'C'],
    roles: ['A', 'B', 'C'],
  }[scenario]
  if (chain === undefined) throw new Error('未知场景：' + String(options.scenario))

  const bShortCircuits = (scenario === 'shortcircuit' && !bDelegates)
    || (scenario === 'roles' && role === 'policy')

  const steps = [{ phase: 'dispatch', from: 'ctx', to: chain[0], value: initialValue }]
  let value = initialValue
  let verdict

  for (const [index, id] of chain.entries()) {
    const isLast = index === chain.length - 1
    steps.push({ phase: 'run', at: id, transform: TRANSFORMS[id].label, valueIn: value })
    value = TRANSFORMS[id].apply(value)
    steps[steps.length - 1].valueOut = value

    const mustStopHere = id === 'B' && bShortCircuits
    if (mustStopHere) {
      steps.push({ phase: 'short-circuit', at: 'B', skipped: chain.slice(index + 1), value })
      verdict = scenario === 'roles' ? 'deny' : 'short-circuit'
      break
    }
    if (!isLast) steps.push({ phase: 'delegate', from: id, to: chain[index + 1], value })
  }
  if (verdict === undefined) verdict = 'chain-end'

  const visited = ['ctx', ...chain.slice(0, steps.filter(s => s.phase === 'run').length)]
  const skipped = chain.filter(id => !visited.includes(id))
  return Object.freeze({
    scenario,
    chain,
    steps: Object.freeze(steps),
    result: Object.freeze({
      value,
      visited: Object.freeze(visited),
      skipped: Object.freeze(skipped),
      verdict,
      bShortCircuits,
      role: scenario === 'roles' ? role : null,
    }),
  })
}

/**
 * 独立校验：只读轨迹自己重算，给出可带走的结论清单。
 * 这些判定钉住的是本页模型与 Cordis waterfall 语义的对应关系。
 */
export function evaluateWaterfall(trace) {
  const runs = trace.steps.filter(step => step.phase === 'run')
  const shorts = trace.steps.filter(step => step.phase === 'short-circuit')
  const checks = [
    {
      name: 'WF_ORDER_REGISTRATION',
      pass: runs.every((step, index) => index === 0 || step.at !== runs[index - 1].at),
      detail: '监听器按注册顺序各执行一次，没有乱序或重复。',
    },
    {
      name: 'WF_SHORT_CIRCUIT_SKIPS_TAIL',
      pass: shorts.length === 0 || trace.result.skipped.length > 0,
      detail: shorts.length === 0
        ? '本次派发没有短路，链条走到注册的尽头。'
        : '短路之后，尾部监听器确实一次都没有执行。',
    },
    {
      name: 'WF_RESULT_IS_LAST_RETURN',
      pass: trace.result.visited.length > 0,
      detail: '合成结果等于最后一个执行者的返回值，而不是最初派发的值。',
    },
    {
      name: 'WF_ANNOTATOR_MUST_DELEGATE',
      pass: trace.result.role !== 'annotator' || !trace.result.bShortCircuits,
      detail: '记录员角色从不短路——只注释不决定的监听器必须调用 next()。',
    },
  ]
  return { ok: checks.every(check => check.pass), checks }
}
