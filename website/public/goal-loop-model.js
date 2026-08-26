/**
 * Goal 循环（tool-ralph）的纯教学模型：固定脚本每轮启动一个全新结构化输出
 * 子代理，子代理只携带不可变目标与上一轮的有界交接摘要。
 * 规则钉在上游 packages/workflow/tool-ralph/src/index.ts（aa6c361a）：
 * - 轮数上限 maxRounds（默认 256，教学视图夹到 1..8）
 * - 交接序列化字符预算 maxHandoffChars（默认 16384）
 * - 每轮状态三值：continue | complete | blocked
 */

export const GOAL_STATUSES = Object.freeze(['continue', 'complete', 'blocked'])

export const GOAL_PATTERNS = Object.freeze([
  { id: 'pass-first', label: '一轮完成：第一次尝试就通过验证' },
  { id: 'fail-then-pass', label: '两轮收敛：第一轮 continue、第二轮 complete' },
  { id: 'always-blocked', label: '持续受阻：每轮都 blocked 直到预算耗尽' },
])

function clampRounds(value) {
  const parsed = Number.isInteger(value) ? value : Number.parseInt(String(value), 10)
  if (!Number.isFinite(parsed)) return 3
  return Math.min(8, Math.max(1, parsed))
}

function outcomeFor(pattern, round) {
  if (pattern === 'pass-first') return 'complete'
  if (pattern === 'always-blocked') return 'blocked'
  return round === 1 ? 'continue' : 'complete'
}

/**
 * @param {{ rounds?: number, handoffBudget?: number, pattern?: string }} input
 */
export function buildGoalModel(input = {}) {
  const rounds = clampRounds(input.rounds)
  const budget = Math.min(400, Math.max(40, Number.isInteger(input.handoffBudget) ? input.handoffBudget : 120))
  const pattern = GOAL_PATTERNS.some(item => item.id === input.pattern) ? input.pattern : 'fail-then-pass'

  const frames = []
  let handoff = ''
  let finalStatus = null
  let usedRounds = 0

  for (let round = 1; round <= rounds; round += 1) {
    usedRounds = round
    frames.push({
      tick: frames.length,
      kind: 'spawn',
      label: `第 ${String(round)} 轮 · 启动全新子代理`,
      detail: `子代理不继承任何记忆——输入只有不可变目标${round > 1 ? `和上一轮交接摘要（${String(handoff.length)} 字符）` : ''}。`,
      handoffChars: handoff.length,
    })
    const status = outcomeFor(pattern, round)
    const rawSummary = status === 'continue'
      ? `已定位到配置文件，剩余：替换 timeout 值并复跑验证。`.repeat(round)
      : status === 'complete'
        ? 'timeout 已改为 45s，验证通过，证据在轮内记录。'
        : '缺写入权限，无法继续。'
    frames.push({
      tick: frames.length,
      kind: 'report',
      label: `第 ${String(round)} 轮 · 结构化回报 ${status}`,
      detail: `原始摘要 ${String(rawSummary.length)} 字符${rawSummary.length > budget ? `，超过预算 ${String(budget)} → 截断入库` : '，未超预算'}。`,
      handoffChars: rawSummary.length,
    })
    if (status === 'complete' || status === 'blocked') {
      finalStatus = status
      frames.push({
        tick: frames.length,
        kind: 'end',
        label: status === 'complete' ? `循环完成于第 ${String(round)} 轮` : `第 ${String(round)} 轮受阻终止`,
        detail: status === 'complete'
          ? '脚本把成功回报交给父会话；轮数由固定脚本决定，模型不能自己续轮。'
          : 'blocked 不是失败也不是完成：父会话拿到阻塞原因，由人决定是否重下目标。',
      })
      break
    }
    handoff = rawSummary.slice(0, budget)
    frames.push({
      tick: frames.length,
      kind: 'carry',
      label: `交接摘要入库（${String(handoff.length)}/${String(budget)} 字符）`,
      detail: '下一轮的子代理拿到的就是这份截断后的摘要——它是子代理之间唯一的记忆。',
      handoffChars: handoff.length,
    })
  }

  if (finalStatus === null) {
    frames.push({
      tick: frames.length,
      kind: 'end',
      label: `轮数预算耗尽（${String(rounds)} 轮）`,
      detail: `上游默认上限是 256 轮；教学视图夹到 8。耗尽时父会话拿到最后一轮的 blocked/continue 记录。`,
      handoffChars: handoff.length,
    })
    finalStatus = 'exhausted'
  }

  return {
    input: { rounds, handoffBudget: budget, pattern },
    frames,
    observations: {
      usedRounds,
      finalStatus,
      finalHandoffChars: handoff.length,
      handoffNeverOverBudget: true,
    },
    canProve: [
      '循环结构来自固定脚本：每轮一个全新结构化输出子代理，携带不可变目标与有界交接。',
      '交接摘要在入库前按 maxHandoffChars 截断——子代理间没有别的记忆通道。',
      '轮数由脚本决定，模型不能给自己续轮；上游默认上限 256。',
      '三值状态 continue/complete/blocked 各有自己的出口语义。',
    ],
    cannotProve: [
      '不启动真实子代理，也不调用模型或 workflow 引擎。',
      '真实结构化输出的 schema 校验与重试不在帧里。',
      'goal 命令入口与 tool-goal 工具的持久化目标域未建模（见第 37 课正文）。',
    ],
  }
}

/** 独立校验：直接对帧重算三条硬规则。 */
export function evaluateGoalOracle(model) {
  const checks = []
  const carries = model.frames.filter(frame => frame.kind === 'carry')
  checks.push({
    id: 'GOAL_HANDOFF_BOUNDED',
    pass: carries.every(frame => frame.handoffChars <= model.input.handoffBudget),
    label: '交接摘要永不超预算',
  })
  checks.push({
    id: 'GOAL_ROUNDS_WITHIN_CAP',
    pass: model.observations.usedRounds <= model.input.rounds,
    label: '轮数不超过脚本上限',
  })
  const completes = model.frames.filter(frame => frame.label.includes('循环完成'))
  checks.push({
    id: 'GOAL_COMPLETE_NEEDS_STATUS',
    pass: model.observations.finalStatus !== 'complete' || completes.length >= 1,
    label: '完成判定必须来自 complete 状态回报',
  })
  return { pass: checks.every(check => check.pass), checks }
}
