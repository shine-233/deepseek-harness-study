/**
 * 自我修改（tool-cordis）的纯教学模型：基于上游
 * packages/extensions/tool-cordis（基线 aa6c361a）的顶注与 present.ts 暴露的工具面。
 *
 * DSH 的招牌能力：模型通过 cordis_inspect / cordis_define / cordis_run /
 * cordis_stop / cordis_undefine 五个工具，检查并修改自己脚下的运行时——
 * 定义一个动态 Cordis 包（cordis.yml + 代码），把它装载成动态插件，
 * 停止它，再把它删掉。
 *
 * 核心规则：
 * - define 只登记定义；run 才创建动态 entry 并激活 Fiber，插件贡献的能力
 *   （例如一个新工具）从这一刻起进入后续请求的 schema。
 * - 配置解析失败 fail loud：Fiber 不会进入半激活状态，错误原文回到模型。
 * - stop 触发 effect 清理：插件注册的工具随之从 schema 里消失。
 * - 动态工具和内置工具走同一条权限管线：可见不等于允许执行。
 *
 * 教学模型不执行真实 yml 或代码：「语法错误」与「guard 拒绝」是输入旋钮，
 * 时间线按给定规则推演。没有测量：真实 HMR 时序或文件系统写入。
 */

export const SELFMOD_LANES = Object.freeze(['模型(工具调用)', 'dynamicCordisRunner', '动态包/Fiber', '工具注册表'])

export const SELFMOD_ACTIONS = Object.freeze([
  Object.freeze({ id: 'full-lifecycle', label: 'define → run → stop → undefine' }),
  Object.freeze({ id: 'run-only', label: 'define → run（保持运行）' }),
  Object.freeze({ id: 'broken-yml', label: 'define → run（yml 有语法错误）' }),
])

function resolveInput(input = {}) {
  if (input.actionId !== undefined && !SELFMOD_ACTIONS.some(action => action.id === input.actionId)) {
    throw new RangeError('未知动作序列：' + String(input.actionId))
  }
  if (input.guardDenies !== undefined && typeof input.guardDenies !== 'boolean') throw new TypeError('guardDenies 必须是布尔值')
  return {
    actionId: input.actionId ?? 'full-lifecycle',
    guardDenies: input.guardDenies === true,
  }
}

const DYN_TOOL = 'dyn__greet'

/**
 * 推演一次自我修改的完整时间线。
 */
export function buildSelfModModel(input = {}) {
  const resolved = resolveInput(input)
  const broken = resolved.actionId === 'broken-yml'
  const stopsAtEnd = resolved.actionId === 'full-lifecycle'

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: SELFMOD_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'inspect', 'cordis_inspect self：模型先看自己脚下装了哪些包、哪些在运行。')
  push(0, 'define', 'cordis_define：提交动态包定义（cordis.yml + 入口），只登记、未装载。')
  push(1, 'registered', '定义进入 dynamicCordisRunner 的登记表，拿到动态包 id。')

  if (broken) {
    push(0, 'run-broken', 'cordis_run：要求装载这个包。')
    push(1, 'parse-fail', '配置解析失败 fail loud：错误原文原样返回给模型，不做兜底猜测。')
    push(2, 'nothing-mounted', 'Fiber 从未激活：没有半个插件被挂上来。')
    push(3, 'schema-unchanged', '工具 schema 保持原样——失败的 run 不产生任何新能力。')
  } else {
    push(0, 'run', 'cordis_run：创建动态 entry 并激活 Fiber。')
    push(2, 'fiber-active', '动态插件已激活：它向 ctx 注册了一个 greet 工具（effect 登记）。')
    push(3, 'schema-grows', '下一次模型请求的 schema 多了 ' + DYN_TOOL + ' —— 能力从这一步起可见。')
    if (resolved.guardDenies) {
      push(0, 'call-dyn-tool', '模型尝试调用 ' + DYN_TOOL + '。')
      push(3, 'guard-denied', 'pre-execute 的 guard 瀑布拒绝了这次调用：可见从来不等于允许执行，结果事件照常入日志。')
    }
  }

  if (stopsAtEnd) {
    if (!broken) {
      push(0, 'stop', 'cordis_stop：停掉这个动态插件。')
      push(2, 'fiber-disposed', 'Fiber dispose：effect 清理执行，greet 工具的注册被撤销。')
      push(3, 'schema-shrinks', 'schema 回到运行前的大小——来去都要留痕，没有隐藏残留。')
    }
    push(0, 'undefine', 'cordis_undefine：把定义也从登记表里删掉。')
    push(1, 'forgotten', '动态包 id 被遗忘：运行时回到 inspect 时的样子。')
  }

  const activated = !broken && steps.some(s => s.phase === 'fiber-active')
  const schemaGrew = steps.some(s => s.phase === 'schema-grows')
  const schemaShrunk = steps.some(s => s.phase === 'schema-shrinks')

  return {
    input: { ...resolved },
    lanes: SELFMOD_LANES,
    steps,
    observations: {
      actionId: resolved.actionId,
      brokenYml: broken,
      fiberActivated: activated,
      failLoud: broken,
      schemaGrew,
      schemaShrunk,
      guardDenied: resolved.guardDenies && activated,
      finalToolVisible: activated && !stopsAtEnd,
      forkShape: broken ? 'fail loud：坏定义没有挂起任何东西'
        : stopsAtEnd ? '完整生命周期：来去都留痕'
        : '保持运行：动态能力仍在 schema 里',
    },
    canProve: [
      'define 与 run 是两步：只 define 不改变任何能力，run 才激活 Fiber。',
      '坏的动态包 fail loud：解析失败时没有任何半个插件被挂载。',
      'stop 之后 schema 缩回原样：effect 清理撤销了插件注册的一切。',
      '动态工具仍要过完整权限管线：schema 可见不等于允许执行。',
    ],
    cannotProve: [
      '不能证明真实 cordis.yml 的完整语法表与校验器行为。',
      '不能证明真实 HMR 的热替换时序；本页只有显式的 stop/undefine。',
      '不能证明真实 inspect 对宿主清单的全部字段。',
      '不能用本页替代 sandbox 或权限策略的真实实现。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算每一条规则。 */
export function evaluateSelfModOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildSelfModModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('SM_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  add('SM_FAIL_LOUD', '坏定义 fail loud 且零挂载',
    !o.brokenYml || (o.failLoud && !o.fiberActivated),
    o.brokenYml ? '报错且无 Fiber' : '不适用',
    o.brokenYml ? (o.fiberActivated ? '竟然挂载了' : '零挂载') : '—')

  const grew = model.steps.some(s => s.phase === 'schema-grows')
  add('SM_SCHEMA_GROWTH', 'run 之后 schema 才增长',
    grew === (o.fiberActivated && model.input.actionId !== 'broken-yml'),
    o.fiberActivated ? '出现 schema-grows 步骤' : 'schema 不变',
    grew ? '已增长' : '未变化')

  const shrinkExpected = model.input.actionId === 'full-lifecycle'
  add('SM_STOP_CLEANS', 'stop 之后 schema 收缩回原样',
    model.steps.some(s => s.phase === 'schema-shrinks') === (shrinkExpected && !model.input.brokenYml),
    shrinkExpected ? '出现收缩步骤' : '不适用',
    model.steps.some(s => s.phase === 'schema-shrinks') ? '已收缩' : '未收缩')

  const denyStep = model.steps.some(s => s.phase === 'guard-denied')
  add('SM_GUARD_STILL_APPLIES', '动态工具同样过权限管线',
    denyStep === o.guardDenied,
    o.guardDenied ? '拒绝步骤存在' : '无拒绝场景',
    denyStep ? '已被拒' : '未触发')

  return { pass: checks.every(c => c.pass), checks }
}
