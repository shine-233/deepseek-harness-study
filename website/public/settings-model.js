/**
 * 文件设置热发布与写入锁的纯模型：基于上游
 * packages/settings/settings-file/src/index.ts（基线 aa6c361a）的真实行为。
 *
 * 核心规则：
 * - 一个 YAML/JSON 文件承载全部命名空间段落
 * - 每次写都经过缝（seam），写完即热发布给所有订阅者
 * - 外部编辑也通过文件监听器热发布——两个进程共享一个 harness home 时，
 *   对方进程的保存就是本进程的"外部编辑"
 * - 写入锁：同一文档同时只有一个写者；第二个写者必须等第一个释放
 *
 * 教学模型：三步生命周期。
 *   1. 读取：从命名空间读一个键
 *   2. 写入：改值 → 写文件 → 热发布
 *   3. 外部编辑：模拟另一个进程改了文件 → 热发布通知本进程
 *
 * 没有测量：真实 YAML 解析、真实 fs.watch、真实跨进程锁原语。
 */

export const SETTINGS_LANES = Object.freeze(['读取', '写入', '热发布'])

export const SETTINGS_NAMESPACES = Object.freeze(['model', 'tools', 'approval'])

const INITIAL = {
  model: { provider: 'deepseek-chat', maxTurns: 8 },
  tools: { restrict: 'default' },
  approval: { policy: 'ask' },
}

export function buildSettingsModel(input) {
  if (typeof input.namespace !== 'string') throw new TypeError('namespace 必须是字符串')
  const namespace = input.namespace
  if (!SETTINGS_NAMESPACES.includes(namespace)) throw new RangeError('未知命名空间：' + namespace)
  const action = input.action === 'external-edit' ? 'external-edit' : 'write'
  const externalEditValue = input.externalEditValue ?? null

  const steps = []
  let document_ = JSON.parse(JSON.stringify(INITIAL))
  let writeLockHeld = false

  function push(laneIdx, phase, detail, extra = {}) {
    steps.push({ lane: SETTINGS_LANES[laneIdx], phase, detail, ...extra })
  }

  // 第一步：读取当前值
  const currentValue = document_[namespace]
  push(0, 'read', `读取命名空间 "${namespace}"：${JSON.stringify(currentValue)}`, { phase: 'read' })

  if (action === 'external-edit') {
    // 外部编辑：另一个进程直接改了文件
    push(1, 'ext-edit', '外部进程直接修改了 settings.yaml 的 "' + namespace + '" 段。', { ext: true })
    if (externalEditValue !== null && typeof externalEditValue === 'object') {
      document_[namespace] = { ...document_[namespace], ...externalEditValue }
    }
    push(2, 'hot-publish', 'fs 监听器触发 → 缝收到新文档 → 热发布给所有订阅者。本进程不需要重启。', { hot: true })
    push(0, 're-read', `重新读取："${namespace}" 现在是 ${JSON.stringify(document_[namespace])}`)
  } else {
    // 写入：经过缝
    push(1, 'lock', '获取写入锁：确认没有其他实例正在写同一份文档。', { lock: true })
    writeLockHeld = true
    const key = Object.keys(currentValue)[0] ?? 'key'
    // 新值必须确定性地派生：oracle 会整体重建一次时间线并逐字节比较，
    // 这里若掺入 Date.now()，「同一输入得到同一条时间线」的校验必然失败。
    const newValue = 'changed-' + key
    document_[namespace][key] = newValue
    push(1, 'write', `写入 ${namespace}.${key} = "${newValue}"（经缝写入，不走旁路）。`, { wrote: key })
    push(1, 'unlock', '写入完成，释放锁。下一个写者现在可以进入。')
    writeLockHeld = false
    push(2, 'hot-publish', '缝检测到变更 → 热发布给所有订阅者。外部编辑和本进程写入走同一条路。', { hot: true })
    push(0, 're-read', `重新读取："${namespace}" 现在是 ${JSON.stringify(document_[namespace])}`)
  }

  return {
    input: { namespace, action, externalEditValue: externalEditValue ?? undefined },
    steps,
    observations: {
      namespace,
      action,
      finalValue: JSON.parse(JSON.stringify(document_[namespace])),
      writeLockAcquired: action !== 'external-edit',
      hotPublished: true,
    },
    canProve: Object.freeze([
      '一个 YAML/JSON 文件承载全部命名空间段落',
      '每次写都经过缝并立即热发布给订阅者',
      '外部编辑通过 fs 监听器走同一条热发布路径',
      '写入锁保证同一文档同时只有一个写者',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 YAML 解析器的容错行为',
      '真实 fs.watch 在不同操作系统上的事件延迟',
      '真实跨进程文件锁的原语实现',
      '设置变更对已运行插件的实时传播延迟',
    ]),
  }
}

export function evaluateSettingsOracle(model) {
  const checks = []
  const rebuilt = buildSettingsModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'SETTINGS_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })
  checks.push({
    id: 'HOT_PUBLISH',
    label: '写入或外部编辑后必然触发热发布',
    expected: '热发布已触发',
    actual: model.steps.some(s => s.phase === 'hot-publish') ? '已触发' : '未触发',
    pass: model.steps.some(s => s.phase === 'hot-publish'),
  })
  return { pass: checks.every(c => c.pass), checks }
}
