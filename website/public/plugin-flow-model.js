/**
 * 最小插件事件流的纯模型。
 *
 * 课程 11 要说明三件事：订阅决定插件收不收得到广播、策略拒绝不影响日志完整性、
 * 卸载必须注销监听。本模型用一条固定的教学时间线把三层（工具、事件总线、观察插件）
 * 和 Session 日志摆在同一条有序步骤上。
 *
 * 每个视觉维度的含义：
 *   纵轴 = 参与方 lane（不是时间戳）
 *   横轴 = 步骤序号（离散顺序）
 *   预览文本 = 教学数据上的确定性切片，不代表真实 tokenizer 或真实 UI 渲染
 * 没有测量：真实 Loader 行为、真实审批界面、真实模型调用。
 */

export const PLUGIN_LANES = Object.freeze(['工具', '事件总线', '观察插件', 'Session 日志'])

export const PLUGIN_SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'normal',
    label: '正常一轮',
    description: '插件已订阅，工具正常执行，预览按长度截断。',
  }),
  Object.freeze({
    id: 'denied',
    label: '策略拒绝',
    description: '策略在主体执行前拒绝；结果仍会产生事件并写入日志。',
  }),
  Object.freeze({
    id: 'unload-midway',
    label: '中途卸载',
    description: '第一轮之后卸载插件；第二次广播不再有人接收，但日志照记。',
  }),
])

const RESULT_TEXT = 'read_file 完成：共 42 行配置，其中 3 行包含 retry 设置。'
const DENIED_TEXT = '[denied] 策略拒绝了本次工具调用'

function clampMaxLength(value) {
  return Math.min(60, Math.max(0, value))
}

/** 组装一条确定性的教学时间线。所有数字和文本都来自固定常量。 */
function buildSteps(input) {
  const steps = []
  const push = (lane, phase, detail, extras = {}) => {
    steps.push({ index: steps.length, lane, phase, detail, ...extras })
  }

  const denied = input.scenario === 'denied'
  const midway = input.scenario === 'unload-midway'

  push('观察插件', 'load', 'Bundle 挂载观察插件', {
    effectChange: input.subscribed ? 'register' : null,
  })
  push('工具', 'tool-start', denied ? '策略拦截 read_file，主体未执行' : '执行 read_file')
  push('Session 日志', 'log', 'tool/call 写入日志')
  push('工具', 'tool-end', denied ? '得到 ok:false 的拒绝结果' : '读取完成，得到结果文本')
  push('事件总线', 'broadcast', '广播 tools/result')

  if (input.subscribed) {
    const source = denied ? DENIED_TEXT : RESULT_TEXT
    const preview = source.slice(0, clampMaxLength(input.maxLength))
    push('观察插件', 'preview', `写预览（${preview.length} 字）：${preview}`, {
      previewText: preview,
    })
  } else {
    push('观察插件', 'skip', '未订阅 tools/result，无动作')
  }
  push('Session 日志', 'log', 'tool/result 写入日志（宿主写入，与插件是否订阅无关）')

  if (midway) {
    push('观察插件', 'unload', '卸载插件：注销 tools/result 监听', {
      effectChange: input.subscribed ? 'remove' : null,
    })
    push('工具', 'tool-start', '第二次调用 write_file')
    push('Session 日志', 'log', '第二次 call 与 result 都写入日志')
    push('事件总线', 'broadcast', '再次广播；没有监听者接收')
  } else {
    push('观察插件', 'unload', '会话结束，卸载插件并注销监听', {
      effectChange: input.subscribed ? 'remove' : null,
    })
  }
  return steps
}

export function buildPluginFlowModel(input) {
  const scenario = PLUGIN_SCENARIOS.find(item => item.id === input.scenario)
  if (scenario === undefined) throw new RangeError('未知场景：' + String(input.scenario))
  if (typeof input.subscribed !== 'boolean') throw new TypeError('subscribed 必须是布尔值')
  if (!Number.isInteger(input.maxLength)) throw new TypeError('预览长度必须是整数')
  if (input.maxLength < 0 || input.maxLength > 60) throw new RangeError('预览长度必须在 0 到 60 之间')

  const steps = buildSteps({ ...input, scenario: scenario.id })
  const previews = steps
    .filter(step => typeof step.previewText === 'string')
    .map(step => ({ stepIndex: step.index, text: step.previewText }))
  const loggedEvents = steps.filter(step => step.phase === 'log').length
  const broadcastCount = steps.filter(step => step.phase === 'broadcast').length
  const removes = steps.filter(step => step.effectChange === 'remove').length
  const registers = steps.filter(step => step.effectChange === 'register').length

  return {
    input: { ...input },
    scenario,
    steps,
    previews,
    observations: {
      steps: steps.length,
      loggedEvents,
      broadcasts: broadcastCount,
      previewsWritten: previews.length,
      // 注册数减去注销数：正确的流程结束时必然归零。
      effectsActiveAtEnd: registers - removes,
      secondBroadcastIgnored: input.scenario === 'unload-midway' && input.subscribed
        ? true
        : null,
    },
    canProve: Object.freeze([
      '在这条教学时间线上，每次广播都有对应的 tool/result 日志（日志由宿主写入）',
      `订阅时每个预览都等于来源文本的前 ${clampMaxLength(input.maxLength)} 字；未订阅时预览数为零`,
      '注册与注销成对出现，结束时活跃效果数为零',
      '同一输入重建时间线得到完全相同的步骤序列（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 Loader 的挂载顺序和失败回滚行为',
      '真实审批界面与审批人的交互',
      '真实 DSH Host 中该插件的性能或兼容性',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重算步骤序列、预览规则和效果账目。
 * 任何一条失败都说明折叠规则被破坏，而不是画面不好看。
 */
export function evaluatePluginFlowOracle(model) {
  const checks = []

  const rebuilt = buildPluginFlowModel(model.input)
  const sameSteps = JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps)
  checks.push({
    id: 'FLOW_DETERMINISTIC',
    label: '同一输入重复推演得到同一条时间线',
    expected: '两次构建的步骤完全一致',
    actual: sameSteps ? '一致' : '不一致',
    pass: sameSteps,
  })

  // 宿主写日志不依赖插件：每次广播前后都必须能找到 tool/result 的日志步骤。
  const logPhases = model.steps.filter(step => step.phase === 'log').map(step => step.detail)
  const expectsSecondLog = model.input.scenario === 'unload-midway'
  const requiredLogs = expectsSecondLog ? 3 : 2
  checks.push({
    id: 'LOG_COMPLETE',
    label: 'call 与 result 全部入册，与插件是否订阅无关',
    expected: `${requiredLogs} 条日志步骤`,
    actual: `实际 ${logPhases.length} 条`,
    pass: logPhases.length === requiredLogs,
  })

  const maxLen = Math.min(60, Math.max(0, model.input.maxLength))
  const previewFailures = []
  if (model.input.subscribed) {
    const source = model.input.scenario === 'denied' ? DENIED_TEXT : RESULT_TEXT
    for (const preview of model.previews) {
      const expected = source.slice(0, maxLen)
      if (preview.text !== expected) previewFailures.push(preview.text)
    }
    if (model.previews.length !== 1) previewFailures.push(`预览数应为 1，实际 ${model.previews.length}`)
  } else if (model.previews.length !== 0) {
    previewFailures.push('未订阅却产生了预览')
  }
  checks.push({
    id: 'PREVIEW_RULE',
    label: '预览严格等于来源文本的截断，且只受订阅开关控制',
    expected: model.input.subscribed ? '恰好 1 条正确截断的预览' : '0 条预览',
    actual: previewFailures.length === 0 ? '符合' : previewFailures.join('；'),
    pass: previewFailures.length === 0,
  })

  const registers = model.steps.filter(step => step.effectChange === 'register').length
  const removes = model.steps.filter(step => step.effectChange === 'remove').length
  checks.push({
    id: 'EFFECTS_CLEAN',
    label: '注册与注销成对，结束时无残留效果',
    expected: '活跃效果数为 0',
    actual: `活跃效果数为 ${String(model.observations.effectsActiveAtEnd)}（注册 ${registers} / 注销 ${removes}）`,
    pass: model.observations.effectsActiveAtEnd === 0 && registers - removes === 0,
  })

  if (expectsSecondLog && model.input.subscribed) {
    const afterUnload = model.steps.filter(step =>
      step.phase === 'preview' && step.index > (model.steps.find(s => s.phase === 'unload')?.index ?? -1))
    checks.push({
      id: 'UNLOAD_SEMANTICS',
      label: '卸载后第二次广播不再产生预览',
      expected: '卸载后预览数为 0',
      actual: `实际 ${afterUnload.length} 条`,
      pass: afterUnload.length === 0,
    })
  }

  return { pass: checks.every(check => check.pass), checks }
}
