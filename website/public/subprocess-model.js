/**
 * 子进程缝（dsh-subprocess）的纯教学模型：基于上游
 * packages/subprocess/subprocess/src/types.ts（基线 aa6c361a）的类型声明。
 *
 * 核心规则：
 * - 环境变量命名空间：DSH 管理的子进程环境事实一律带 `DSH_` 前缀，
 *   与调用方环境隔离。
 * - 输出收集按字节封顶，溢出保留 TAIL（尾部才是诊断最有用的部分）；
 *   truncated 标记如实报告丢没丢字节。
 * - spill 文件可选：配置了才有完整流可恢复；spill 自身也有上限，
 *   超过上限的流连 spill 都不完整——此时丢弃，绝不假装完整。
 * - stdin 三态：'ignore' 接 /dev/null、'pipe' 暴露写入端、{ data } 写完即关（批处理形态）。
 *
 * 教学模型不启动真实进程：字节数与截断按给定值直接推演。
 */

export const SUBPROCESS_LANES = Object.freeze(['调用方', '子进程缝', '子进程', '输出收集'])

export const SP_LIMITS = Object.freeze({
  outputBytes: Object.freeze({ min: 0, max: 4000 }),
  maxBytes: Object.freeze({ min: 50, max: 2000 }),
})

function resolveInput(input = {}) {
  const limits = SP_LIMITS
  const intIn = (name, value, min, max) => {
    if (typeof value !== 'number' || !Number.isInteger(value)) throw new TypeError(name + ' 必须是整数')
    if (value < min || value > max) throw new RangeError(name + ' 超出范围：' + String(value))
    return value
  }
  if (input.spillEnabled !== undefined && typeof input.spillEnabled !== 'boolean') throw new TypeError('spillEnabled 必须是布尔值')
  if (input.stdinMode !== undefined && !['ignore', 'pipe', 'data'].includes(input.stdinMode)) {
    throw new RangeError('未知 stdinMode：' + String(input.stdinMode))
  }
  return {
    outputBytes: intIn('outputBytes', input.outputBytes ?? 300, limits.outputBytes.min, limits.outputBytes.max),
    maxBytes: intIn('maxBytes', input.maxBytes ?? 200, limits.maxBytes.min, limits.maxBytes.max),
    spillCapBytes: input.spillCapBytes === null ? null : intIn('spillCapBytes', input.spillCapBytes ?? 4000, 1, 8000),
    spillEnabled: input.spillEnabled !== false,
    stdinMode: input.stdinMode ?? 'pipe',
  }
}

/**
 * 推演一次子进程执行：环境注入 → 运行 → 输出收集（截断/spill 判定）。
 */
export function buildSubprocessModel(input = {}) {
  const resolved = resolveInput(input)
  const { outputBytes, maxBytes, spillCapBytes, spillEnabled, stdinMode } = resolved

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: SUBPROCESS_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'spawn-request', '请求执行命令：声明 stdin=' + stdinMode + '、collect.maxBytes=' + String(maxBytes)
    + (spillEnabled ? '、spill 上限 ' + String(spillCapBytes ?? 0) + ' 字节。' : '、不启用 spill。'))
  push(1, 'env-namespace', '子进程环境注入 DSH_ 前缀的管理变量——调用方环境与受管事实互不串台。',
    { envPrefixed: true })
  push(2, 'run', '进程运行，产出 ' + String(outputBytes) + ' 字节标准输出。')

  const truncated = outputBytes > maxBytes
  const keptBytes = Math.min(outputBytes, maxBytes)
  if (!truncated) {
    push(3, 'collected', '全部 ' + String(outputBytes) + ' 字节进入内存缓冲：未超限，truncated=false。')
  } else {
    // 溢出保留 TAIL：内存里是最后 maxBytes 字节，头部被丢弃。
    push(3, 'tail-collected', '超出 maxBytes：保留 TAIL ' + String(keptBytes) + ' 字节（最后一段），'
      + '丢弃头部 ' + String(outputBytes - keptBytes) + ' 字节，truncated=true。', { truncated: true })
    if (spillEnabled) {
      if (outputBytes <= spillCapBytes) {
        push(3, 'spill-saved', '完整流已写入 spill 文件（' + String(outputBytes) + ' ≤ spill 上限 '
          + String(spillCapBytes) + '）：需要时可以整段恢复。')
      } else {
        push(3, 'spill-discarded', '流比 spill 上限还大（' + String(outputBytes) + ' > '
          + String(spillCapBytes) + '）：不完整的 spill 直接丢弃——绝不假装它是完整流。')
      }
    } else {
      push(3, 'no-spill', '未启用 spill：只有内存里的 TAIL，头部永久丢失——这是诊断尾迹形态的取舍。')
    }
  }
  push(1, 'stdin-disposition', stdinMode === 'ignore'
    ? 'stdin 接到 /dev/null：进程读不到任何输入。'
    : stdinMode === 'data' ? '批处理形态：写入给定字节后立即关闭写端。'
    : 'pipe 形态：写端暴露给调用方按需交互。')

  const spillState = truncated && spillEnabled
    ? (outputBytes <= spillCapBytes ? '完整可恢复' : '超限丢弃')
    : '未使用'

  return {
    input: { ...resolved },
    lanes: SUBPROCESS_LANES,
    steps,
    observations: {
      outputBytes,
      maxBytes,
      truncated,
      keptBytes,
      droppedBytes: Math.max(0, outputBytes - keptBytes),
      spillState,
      stdinMode,
    },
    canProve: [
      '溢出时保留的是 TAIL：诊断价值最高的最后一段永远在内存里。',
      'truncated 标记如实反映字节是否被丢弃。',
      'spill 只在显式启用且流不超其上限时可恢复；否则宁可承认丢失也不假装完整。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实进程退出码或信号语义；本页只推演输出收集。',
      '不能证明真实文件系统上 spill 文件的命名与清理时机。',
      '不能证明真实 UTF-8 多字节字符在字节边界上的切割行为。',
      '不能用本页替代 kill 进程树语义（见终端会话实验）。',
    ],
  }
}

/** 独立校验：只读 steps 与 observations，自己重算每一条规则。 */
export function evaluateSubprocessOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildSubprocessModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  add('SPC_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    sameSteps, '两次构建完全一致', sameSteps ? '一致' : '不一致')

  const o = model.observations
  add('SPC_TAIL_KEPT', '溢出时保留的是 TAIL 且字节守恒',
    o.keptBytes + o.droppedBytes === o.outputBytes && o.keptBytes <= o.maxBytes,
    'kept + dropped = ' + String(o.outputBytes),
    String(o.keptBytes) + ' + ' + String(o.droppedBytes))

  const truncStep = model.steps.find(s => s.truncated === true)
  add('SPC_TRUNCATED_HONEST', 'truncated 标记与实际丢弃一致',
    (o.truncated && truncStep !== undefined) || (!o.truncated && o.droppedBytes === 0),
    o.truncated ? '标记为截断' : '无丢弃',
    o.truncated ? '已标记' : '完整')

  const savedFull = model.steps.some(s => s.phase === 'spill-saved')
  const discarded = model.steps.some(s => s.phase === 'spill-discarded')
  const noSpill = model.steps.some(s => s.phase === 'no-spill')
  add('SPC_SPILL_HONESTY', 'spill 三态互斥：完整可恢复 / 明确丢弃 / 未启用只剩 TAIL',
    !o.truncated || (savedFull !== discarded) || noSpill,
    o.truncated ? '可恢复或已丢弃或未启用' : '不适用',
    savedFull ? '完整可恢复' : discarded ? '已丢弃' : noSpill ? '未启用' : '未触发')

  const envStep = model.steps.find(s => s.envPrefixed === true)
  add('SPC_ENV_NAMESPACE', '受管环境变量带 DSH_ 前缀',
    envStep !== undefined, '存在 DSH_ 注入步骤', envStep ? '已注入' : '缺失')

  return { pass: checks.every(c => c.pass), checks }
}
