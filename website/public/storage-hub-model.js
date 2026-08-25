/**
 * 存储枢纽后端契约的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/storage/storage/src/backend.ts
 * 与 registry.ts：
 *
 *   一个后端独占一种介质（文件树根或数据库文件），可选地暴露 kv 这类切面；
 *   切面缺位时解析大声失败，而不是悄悄换一条路。单元名与表名必须匹配
 *   UNIT_NAME_RE（/^[a-z][a-z0-9_]*$/）——它们同时充当文件名和 SQL 标识符段，
 *   所以不做转义、直接拒绝。open 时介质上已有版本戳且与 descriptor.version
 *   不同就报 version-mismatch；介质解析不出本单元格式报 malformed-medium；
 *   同名单元不关就再开是调用方错误。putRecord/setGlobal 在 resolve 后即持久，
 *   deleteRecord 对缺失键幂等；close 排空在途写入并释放介质，之后的一切调用
 *   报 closed。并发写排序是调用方的责任——领域层为每个单元跑一条写链。
 *
 * 教学约定：三种后端 × 六个剧本 × 两个单元名是固定教学常量；
 * 没有真实文件系统或 SQLite 文件。
 */

export const STORAGE_BACKENDS = Object.freeze(['json', 'sqlite', 'nofacet'])
export const STORAGE_SCENARIOS = Object.freeze([
  'happy-path',
  'version-mismatch',
  'malformed-medium',
  'double-open',
  'closed-unit',
  'missing-key-delete',
])
export const STORAGE_UNIT_NAMES = Object.freeze(['todos_v2', 'Todos-V2'])

export const BACKEND_LABELS = Object.freeze({
  json: 'json：文件树根上的 JSON 单元',
  sqlite: 'sqlite：数据库文件里的 KV 表',
  nofacet: 'nofacet：不提供 kv 切面的后端',
})

export const SCENARIO_LABELS = Object.freeze({
  'happy-path': '全流程：开单元 → 写入 → 关闭 → 重开读回',
  'version-mismatch': '重开时版本戳对不上',
  'malformed-medium': '介质内容不是本单元的格式',
  'double-open': '同名单元没关就再开',
  'closed-unit': '关闭之后还想写',
  'missing-key-delete': '删除一个不存在的键',
})

/** 与上游逐字一致：小写开头，小写字母/数字/下划线，不做任何转义。 */
const UNIT_NAME_RE = /^[a-z][a-z0-9_]*$/

const MEDIUM_VERSION_STAMP = { todos_v2: 2 }

function describeMedium(backend) {
  return backend === 'sqlite' ? '数据库文件 dsh-storage.sqlite' : '文件树根 units/todos_v2.json'
}

export function buildStorageModel(input = {}) {
  const backend = STORAGE_BACKENDS.find(item => item === input.backend)
  if (backend === undefined) throw new RangeError('未知后端：' + String(input.backend))
  const scenario = STORAGE_SCENARIOS.find(item => item === input.scenario)
  if (scenario === undefined) throw new RangeError('未知剧本：' + String(input.scenario))
  const unitName = STORAGE_UNIT_NAMES.find(item => item === input.unitName)
  if (unitName === undefined) throw new RangeError('未知单元名：' + String(input.unitName))

  const steps = []
  const push = (op, detail, extras = {}) => {
    steps.push({ index: steps.length, op, detail, ...extras })
  }

  push(`registry.get('${backend}')`,
    `命名注册表按名字解析后端：${BACKEND_LABELS[backend]}`,
    { kind: 'resolve', pass: true })

  const hasFacet = backend !== 'nofacet'
  push('kv 切面解析',
    hasFacet ? 'kv 切面在位：这个后端能伺服键值数据' : 'kv 切面缺位：解析大声失败，绝不悄悄改走别的路',
    { kind: 'facet', pass: hasFacet })

  if (!hasFacet) {
    return {
      input: { backend, scenario, unitName },
      steps,
      observations: {
        errorCode: 'facet-missing',
        openedUnit: null,
        durableOnceResolved: false,
        deleteIdempotent: null,
        writeChainPerUnit: true,
      },
      canProve: Object.freeze([
        '切面缺位的后端在解析点大声失败——契约不允许静默降级。',
        '失败发生在任何单元被打开之前。',
      ]),
      cannotProve: Object.freeze([
        '真实介质上的字节布局；json 与 sqlite 的差异另见第 05 课的物理行面板。',
        '真实并发写入的排序行为。',
      ]),
    }
  }

  const nameOk = UNIT_NAME_RE.test(unitName)
  push(`单元名校验：${unitName}`,
    nameOk
      ? '匹配 UNIT_NAME_RE：这个名字可以直接当文件名和 SQL 标识符段用'
      : 'UNIT_NAME_RE 拒绝：大写与连字符会破坏文件名和 SQL 标识符的双重身份',
    { kind: 'name', pass: nameOk })

  if (!nameOk) {
    return {
      input: { backend, scenario, unitName },
      steps,
      observations: {
        errorCode: 'invalid-unit-name',
        openedUnit: null,
        durableOnceResolved: false,
        deleteIdempotent: null,
        writeChainPerUnit: true,
      },
      canProve: Object.freeze([
        '非法单元名在 open 之前就被拒绝：名字的合法性属于描述符校验。',
      ]),
      cannotProve: Object.freeze([
        '真实存储层抛出的原始错误栈。',
      ]),
    }
  }

  let errorCode = null
  let opened = true

  if (scenario === 'version-mismatch') {
    push(`open({ name: '${unitName}', version: 2 })`,
      `${describeMedium(backend)} 上已盖着版本戳 ${String(MEDIUM_VERSION_STAMP[unitName])}，但这次声明的是版本 3`,
      { kind: 'open' })
    errorCode = 'version-mismatch'
    opened = false
    push('reject：version-mismatch',
      '介质上的版本戳与描述符不同就拒绝打开——静默升级或降级都会毁掉读取方',
      { kind: 'error', code: errorCode })
  } else if (scenario === 'malformed-medium') {
    push(`open({ name: '${unitName}', version: 2 })`,
      `${describeMedium(backend)} 上的内容无法按本单元格式解析`,
      { kind: 'open' })
    errorCode = 'malformed-medium'
    opened = false
    push('reject：malformed-medium',
      '解析不出就拒绝：半猜半凑地读只会把损坏扩散到上层',
      { kind: 'error', code: errorCode })
  } else if (scenario === 'double-open') {
    push(`open({ name: '${unitName}', version: 2 })`,
      '第一次打开成功，单元进入「已开」状态',
      { kind: 'open', pass: true })
    errorCode = 'already-open'
    opened = false
    push('第二次 open 同名单元',
      '没有先 close 就再开是调用方错误：两个句柄会各自声称持有同一条写链',
      { kind: 'error', code: errorCode })
  } else {
    push(`open({ name: '${unitName}', version: 2 })`,
      `介质上还没有痕迹：首次物化可以推迟到第一次写入，但 loadAll 立即可用且返回空形状`,
      { kind: 'open', pass: true })

    if (scenario === 'closed-unit') {
      push('putRecord(\'records\', \'a-1\', { … })',
        '写入成功并持久化：resolve 返回即代表介质上可见',
        { kind: 'write', pass: true })
      push('close()：排空在途写入并释放介质',
        '幂等；并发与重复调用都在排空完成后结算',
        { kind: 'close', pass: true })
      errorCode = 'closed'
      opened = false
      push('关闭后的再一次 putRecord',
        'reject：closed——介质已经交还，谁也别想隔门写字',
        { kind: 'error', code: errorCode })
    } else {
      push('putRecord(\'records\', \'a-1\', { title: \'登录页\' })',
        '整记录覆盖语义：键已存在则替换；resolve 即持久——崩溃后再开也能读到它',
        { kind: 'write', pass: true })
      push('setGlobal({ lastOpened: \'2026-08-25\' })',
        '全局单例槽只在描述符声明 hasGlobal 时可用',
        { kind: 'write', pass: true })

      if (scenario === 'missing-key-delete') {
        push('deleteRecord(\'records\', \'ghost\')',
          '键不存在：幂等空操作，照常 resolve——删除缺失键不是错误',
          { kind: 'delete-idempotent', pass: true })
      }

      push('close()：排空在途写入并释放介质',
        '单元级 close 先排空，介质级 close 再兜底',
        { kind: 'close', pass: true })
      push('重开并 loadAll()',
        '读回完整快照：records 里是 a-1，global 是最后写入的单例值',
        { kind: 'reopen', pass: true })
    }
  }

  return {
    input: { backend, scenario, unitName },
    steps,
    observations: {
      errorCode,
      openedUnit: opened ? unitName : null,
      durableOnceResolved: true,
      deleteIdempotent: scenario === 'missing-key-delete' ? true : null,
      writeChainPerUnit: true,
    },
    canProve: Object.freeze([
      '单元名在 open 前过 UNIT_NAME_RE：同一规则守护文件名与 SQL 标识符两重身份。',
      '版本戳不一致按 version-mismatch 拒绝；介质不可解析按 malformed-medium 拒绝。',
      '未关闭就二次打开被拒绝；close 之后的一切调用按 closed 拒绝。',
      'deleteRecord 对缺失键幂等；putRecord 一旦 resolve 即持久。',
    ]),
    cannotProve: Object.freeze([
      '真实 JSON/SQLite 后端的磁盘布局——那是 storage-json 与 storage-sqlite 各自的实现。',
      '真实崩溃恢复的时间窗：模型只保证 resolve 后可读，不模拟断电时序。',
      '领域层路由表如何挑选后端——那属于消费方的配置。',
    ]),
  }
}

export function evaluateStorageOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  add('FACET_RESOLUTION_FAILS_LOUD', '切面缺位在解析点失败，且发生在开单元之前',
    model.input.backend !== 'nofacet' || (model.steps.length === 2 && model.observations.errorCode === 'facet-missing'),
    '≤2 步即失败', `${String(model.steps.length)} 步`)

  const reachesOpen = model.input.backend !== 'nofacet' && model.input.unitName === 'todos_v2'
  add('NAME_GATE_BEFORE_OPEN', '单元名非法或切面缺位时时间线停在门上，不产生 open 步骤',
    !reachesOpen
      ? !model.steps.some(step => step.kind === 'open')
      : model.steps.some(step => step.kind === 'open'),
    reachesOpen ? '有 open' : '无 open',
    model.steps.some(step => step.kind === 'open') ? '有 open' : '无 open')

  const errorStep = model.steps.find(step => step.kind === 'error')
  const gateFail = model.steps.find(step => (step.kind === 'facet' || step.kind === 'name') && step.pass === false)
  const expectedCode = model.observations.errorCode
  const shownCode = errorStep?.code ?? (gateFail ? expectedCode : null)
  add('ERROR_CODE_EXACT', '失败剧本的错误码与上游词汇一字不差',
    expectedCode === null ? shownCode === null : shownCode === expectedCode,
    String(expectedCode), String(shownCode ?? 'none'))

  if (model.observations.openedUnit !== null) {
    add('DURABLE_ONCE_RESOLVED', '打开的单元里每次写入都满足 resolve 即持久',
      model.observations.durableOnceResolved && model.steps.some(step => step.kind === 'write'),
      '写入即持久', model.observations.durableOnceResolved ? '写入即持久' : '未持久')
  }

  if (model.input.scenario === 'missing-key-delete' && model.observations.openedUnit !== null) {
    add('DELETE_IS_IDEMPOTENT', '删除缺失键是空操作而不是错误',
      model.observations.deleteIdempotent === true,
      '幂等', model.observations.deleteIdempotent ? '幂等' : '—')
  }

  const rebuilt = buildStorageModel(model.input)
  add('STORAGE_DETERMINISTIC', '同一输入重建同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  return { pass: checks.every(check => check.pass), checks }
}
