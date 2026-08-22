/**
 * 课程自测题：题库与判分。
 *
 * 每道题都必须指向教材里的具体出处；答错时把读者带回那一节，而不是只给对错。
 * 题目数据是纯数据，判分是纯函数，都可以在 Node 里单独测试；
 * DOM 渲染层在本文件底部，只有被进度模块调用时才碰 document。
 */

import { TURN_SCENARIOS, buildTurnModel } from './turn-flow-model.js'
import { LOG_SCENARIOS, buildSessionLogModel } from './session-log-model.js'
import quizBankA from './study-quiz-bank-a.js'
import quizBankB from './study-quiz-bank-b.js'
import quizBankC from './study-quiz-bank-c.js'
import quizBankD from './study-quiz-bank-d.js'
import quizBankE from './study-quiz-bank-e.js'
import quizBankF from './study-quiz-bank-f.js'

/**
 * 题库。source 字段告诉读者答案依据在哪一节或哪个源文件；
 * explain 在提交后显示，答对答错都显示，因为解释才是学习材料。
 */
const QUIZ_BANK = {
  '00-开始这里': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: '“插件”和“服务”的区别是什么？',
      options: Object.freeze([
        '插件是可以插入拔出的功能模块；服务是插件放进共享上下文后、其他插件可以取得的能力',
        '插件运行在浏览器里，服务运行在 Node 里',
        '服务是插件的配置文件，插件是服务打包后的产物',
      ]),
      answer: 0,
      explain: '第 1 课「先记住六个词」：模型适配器、工具注册表、Session 等都可以作为插件装配；`ctx.sessions`、`ctx.tools` 这类能力就是服务。',
      source: 'study/00-开始这里.md#先记住六个词',
    }),
    Object.freeze({
      id: 'q2',
      q: '一个 Turn 和一个 Step 的关系是什么？',
      options: Object.freeze([
        '一个 Turn 固定包含一个 Step',
        'Turn 和 Step 是同一件事的两个名字',
        '一个 Turn 可以包含 0 个或多个 Step，每个 Step 是一次模型请求及其触发的工具调用',
      ]),
      answer: 2,
      explain: '第 1 课「先记住六个词」：首次输入被拒绝时甚至可能记录一个没有 Step 的 Turn。',
      source: 'study/00-开始这里.md#先记住六个词',
    }),
    Object.freeze({
      id: 'q3',
      q: '读完源码得出“这个工具会截断预览文本”，这属于哪类结论？',
      options: Object.freeze([
        '真实 DSH 运行证据',
        '模型回答质量结论',
        '源码事实；它不能证明真实 Profile 已加载该插件',
      ]),
      answer: 2,
      explain: '第 1 课「先看一个贯穿示例」：四句话方法要求把“已能证明”（源码和单元测试）与“还没有证明”（真实加载、token 变化）分开写。',
      source: 'study/00-开始这里.md#先看一个贯穿示例',
    }),
  ]),
  '01-仓库地图': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: '`vendor/` 目录里放的是什么？读它时要注意什么？',
      options: [
        '上游从未发布的实验代码，可以直接当成官方 API 使用',
        '固定放进仓库的第三方基础库副本，带有 DSH 的重命名和部分行为修改',
        '文档站点的构建产物',
      ],
      answer: 1,
      explain: '仓库地图顶层目录表：vendor 是 Cordis 等第三方项目的副本，先读 vendor/README.md 的 Manifest 和 Local modifications，不要把第三方设计和 DSH 修改混为一谈。',
      source: 'study/01-仓库地图.md#顶层目录',
    }),
    Object.freeze({
      id: 'q2',
      q: '工具想使用文件系统，为什么通过 `ctx.tools` 这类服务而不是直接导入某个后端文件？',
      options: [
        '因为直接导入会被 lint 拒绝',
        '为了依赖方向从抽象指向具体：换后端时工具本身不用重写',
        '为了让打包体积变大',
      ],
      answer: 1,
      explain: '仓库地图「依赖方向」一节：核心包提供接口和事件，具体包提供实现；这样换实现不需要改调用方。',
      source: 'study/01-仓库地图.md#依赖方向',
    }),
    Object.freeze({
      id: 'q3',
      q: '官方架构文档（architecture.md）在哪个目录？',
      options: ['study/', 'docs/', 'website/'],
      answer: 1,
      explain: '仓库地图顶层目录表：docs/ 是官方架构、开发、用户和子系统文档的权威来源；study/ 是本仓库新增的中文导读。',
      source: 'study/01-仓库地图.md#顶层目录',
    }),
  ]),
  '02-Cordis与插件树': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: 'Fiber 记录并清理的是哪些东西？',
      options: [
        '插件通过 Cordis 注册机制登记的可撤销效果',
        '进程里所有定时器和文件句柄',
        '插件私下创建的网络连接和子进程',
      ],
      answer: 0,
      explain: 'Cordis 基础一节：Fiber 按相反顺序清理已登记的效果；插件绕过注册机制私建的 timer、watcher 或子进程不在它的视野里。',
      source: 'study/02-Cordis与插件树.md',
    }),
    Object.freeze({
      id: 'q2',
      q: 'waterfall 监听器想继续让链条走下去，必须做什么？',
      options: ['返回 true', '调用 next()', '重新抛出事件'],
      answer: 1,
      explain: '事件分发模式一节：waterfall 需要监听器调用 next() 才继续；直接返回等于短路整条链。',
      source: 'study/02-Cordis与插件树.md',
    }),
    Object.freeze({
      id: 'q3',
      q: '227 个包、1124 条 peerDependencies 这个数字能说明什么？',
      options: [
        '说明行数多的包更重要',
        '只说明清单里的静态依赖形状；不能说明运行时真的调用过这些依赖',
        '说明启动耗时和包数量成正比',
      ],
      answer: 1,
      explain: '组件边界声明：这张图只读清单和行数，dependencies、动态 import 和 cordis.yml 装配都没有画进去。',
      source: 'website/public/package-graph-lab.html 的证据边界',
    }),
  ]),
  '03-核心文件精读': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: '从输入到回答，谁打开 Turn 和 Step，谁把过程记录下来？',
      options: [
        'Session 先打开 Turn，Agent Loop 再把日志翻译成模型请求',
        'Agent Loop 打开 Turn 和 Step，Session 把输入、模型片段、工具调用和结果追加成日志',
        'LLM Adapter 决定 Turn 的开关，Tools 负责记录全过程',
      ],
      answer: 1,
      explain: '「先看总链路」一节：Cordis Context 起，Profile 读 Bundle 挂载插件，Agent Loop 打开 Turn 和 Step，Session 记录输入、模型片段、工具调用和结果；LLM Adapter 只产生流式片段。',
      source: 'study/03-核心文件精读.md#先看总链路',
    }),
    Object.freeze({
      id: 'q2',
      q: '想替换基础 Bundle 里的一行默认配置（比如换默认模型），按 Profile 一节应该怎么做？',
      options: [
        '复制整个 Bundle，改掉那一行后整体替换原来的 Bundle',
        '修改 app-boot 启动入口，在挂载前硬编码覆盖这个默认值',
        '在 Bundle 之上加一层只改这一行的补丁：profile 层覆盖 Bundle 层，home 层和命令行 --patch 再继续覆盖',
      ],
      answer: 2,
      explain: '「启动、Profile 与 Bundle」一节：补丁按层叠加——Bundle 层先来，profile 层覆盖它，home 层和命令行 --patch 继续覆盖；每层只改自己拥有的配置行，所以不必复制整个 Bundle。',
      source: 'study/03-核心文件精读.md#启动profile-与-bundle',
    }),
    Object.freeze({
      id: 'q3',
      q: '工具执行结果的“给模型的文本”和“给人的卡片”是什么关系？',
      options: [
        '是同一份字符串，UI 原样显示发给模型的文本',
        '卡片由模型返回的 HTML 渲染，给模型的文本只是兜底',
        '是两回事：展示意图抽成 provider-neutral 类型后由各前端渲染；给模型的文本另行规范化',
      ],
      answer: 2,
      explain: '「工具注册、schema 与展示」一节 presentation.ts：工具执行结果给模型看的文本和给人看的卡片不是一回事；展示意图抽成中立类型后，Web、CLI 各自渲染同一意图。',
      source: 'study/03-核心文件精读.md#工具注册schema-与展示',
    }),
  ]),
  '04-Agent与Turn流程': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: '“带两个工具调用的 Turn”实验里，一次 Turn 为什么出现了 4 次模型请求？',
      options: [
        '组件把每次工具执行都误计成了一次模型请求',
        '为了对抗限流，同一个请求被自动重试了四次',
        '每拿到一个工具结果都要把它带回模型才能继续，于是同一 Turn 内开出后续 Step',
      ],
      answer: 2,
      explain: '「亲手看一次 Turn 展开」：一次 Turn 不是一次模型调用，20 步里模型请求出现 4 次。「为什么要分 Turn 和 Step」补充：工具结果让同一 Turn 进入下一个 Step，而不是伪装成新的用户请求。',
      source: 'study/04-Agent与Turn流程.md#亲手看一次-turn-展开',
    }),
    Object.freeze({
      id: 'q2',
      q: '首次输入在 `agent/pre-step` 被拒绝后，日志里会留下什么？',
      options: [
        '什么都不留，这次输入就像没有发生过',
        '伪造一条 assistant/message，把拒绝原因写成模型回复存下来',
        '一条没有 Step 的 Turn 结束记录，用来解释“为什么用户发了话却没有模型请求”',
      ],
      answer: 2,
      explain: '「`agent/pre-step` 为什么重要」一节：首次领取被拒绝时仍会记录一个没有 Step 的 Turn 结束；「为什么要分 Turn 和 Step」也说明被拒绝或取消的 Turn 可以没有 Step 但仍被记录。',
      source: 'study/04-Agent与Turn流程.md#agentpre-step-为什么重要',
    }),
    Object.freeze({
      id: 'q3',
      q: '模型流里出现 tool-call block 后，DSH 怎样处理它？',
      options: [
        'Agent Loop 直接调用本地函数，并把输出拼进一段隐藏提示词',
        '交给 Tools 服务重新检查可见性、参数、审批和并发；结果写回 Session，下一次 prompt 由日志推导',
        '由 LLM Adapter 在同一条 HTTP 连接里代为执行并直接返回结果',
      ],
      answer: 1,
      explain: '「工具调用怎样回来」一节：Agent Loop 不直接执行函数，而是交给 Tools 服务；结果回到 Session 后，下一次 prompt 由日志推导，而不是 Agent 私自拼隐藏文本。',
      source: 'study/04-Agent与Turn流程.md#工具调用怎样回来',
    }),
  ]),
  '05-Session日志与恢复': Object.freeze([
    Object.freeze({
      id: 'q1',
      q: 'Session 为什么保存完整事件日志，而不只保存最后一段文本？',
      options: [
        '因为事件日志比文本更短，可以节省磁盘空间',
        '因为 JSON 比 Markdown 更容易被前端解析和传输',
        '这样“模型为何看到某段内容、崩溃停在哪、fork 从哪个事件开始”都变成从原始事实推导的投影问题',
      ],
      answer: 2,
      explain: '「为什么不只保存最后一段文本」一节：原始事件是事实，模型历史、UI 卡片、transcript 和统计都是从事实推导出的不同视图；只存最后文本就无法回答这些追溯问题。',
      source: 'study/05-Session日志与恢复.md#为什么不只保存最后一段文本',
    }),
    Object.freeze({
      id: 'q2',
      q: '“模型可见即已记录”这条规则主要防止哪类错误？',
      options: [
        '防止模型生成超出长度限制的超长回答',
        '防止重启后模型历史看起来一样、却缺少某个隐式注入，导致行为悄悄变化且无法解释',
        '防止用户在界面上删除或篡改历史消息',
      ],
      answer: 1,
      explain: '「模型可见即已记录」一节：任何会影响模型请求的内容都必须能从 Session 日志重建；动态运行时上下文因此生成来源明确的 user/message，请求头在配置改变时追加新快照。',
      source: 'study/05-Session日志与恢复.md#模型可见即已记录',
    }),
    Object.freeze({
      id: 'q3',
      q: '进程在工具执行中途崩溃后恢复时，“修复”会怎么做？',
      options: [
        '把没跑完的工具标记为成功，保证会话能继续往下走',
        '丢弃崩溃点之后的整段会话，请用户从头再来',
        '根据日志中的未闭合事实补出 interrupted 状态，不假装工具成功',
      ],
      answer: 2,
      explain: '「恢复、fork 和修复」一节：修复根据日志中的未闭合事实补出 interrupted 状态；这不等于假装工具成功。',
      source: 'study/05-Session日志与恢复.md#恢复fork-和修复',
    }),
  ]),
}

// 静态题库分片（bank-a…bank-f）覆盖其余课程；已有手写条目的课以现行条目为准，
// 分片里的重复键自动让位——这样新课先写 bank 分片、后补精修条目时不会互相覆盖。
const EXTRA_QUIZ_BANKS = [quizBankA, quizBankB, quizBankC, quizBankD, quizBankE, quizBankF]
for (const bank of EXTRA_QUIZ_BANKS) {
  for (const [lessonId, questions] of Object.entries(bank)) {
    if (Object.prototype.hasOwnProperty.call(QUIZ_BANK, lessonId)) continue
    QUIZ_BANK[lessonId] = Object.freeze(questions)
  }
}
Object.freeze(QUIZ_BANK)

export const QUIZ_LESSONS = Object.freeze(Object.keys(QUIZ_BANK).sort())

/**
 * 稳定的 32 位种子随机数：同一颗种子永远得到同一个序列。
 * 变体因此可以复现——把种子写进链接，别人打开的就是同一份打乱结果。
 */
export function mulberry32(seed) {
  let state = seed >>> 0
  return function next() {
    state = (state + 0x6D2B79F5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle(items, random) {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * 由种子生成一轮练习变体：题目顺序和每题的选项顺序都换，正确答案始终跟着
 * 自己的选项文本走。题干、解释和出处原样保留；判分函数不需要任何改动。
 */
export function shuffleQuiz(questions, seed) {
  const random = mulberry32(seed)
  return Object.freeze(seededShuffle(questions, random).map(question => {
    const correctText = question.options[question.answer]
    const options = Object.freeze(seededShuffle(question.options, random))
    const answer = options.indexOf(correctText)
    if (answer < 0) throw new Error('选项文本在打乱后丢失：' + correctText)
    return Object.freeze({ ...question, options, answer })
  }))
}

/**
 * 数据驱动的生成题：与实验页共用同一批模型函数，读数即答案。
 *
 * 生成在模块加载时完成一次，输入固定、输出固定；选项按稳定顺序排列，
 * 正确答案的文本永远在 options 里，位置随机交给 shuffleQuiz。
 * 生成题不进 QUIZ_BANK：题库测试钉住手写题为每课恰好 3 道，生成题
 * 通过 allQuestionsFor 在组合层追加。
 */

const TURN_LANE_LABELS = Object.freeze({
  user: '用户',
  context: '上下文装配',
  model: '模型',
  tool: '工具',
  session: 'Session 日志',
})

function turnLaneQuestion(stepIndex) {
  const scenario = TURN_SCENARIOS.find(candidate => candidate.id === 'two-tools')
  const step = buildTurnModel({ scenario: 'two-tools' }).steps[stepIndex]
  if (step === undefined) return null
  const correct = TURN_LANE_LABELS[step.lane] ?? step.lane
  const options = [correct, ...Object.entries(TURN_LANE_LABELS)
    .filter(([lane]) => lane !== step.lane)
    .map(([, label]) => label)]
  return {
    id: 'gen-04-lane-' + String(stepIndex),
    q: '「' + scenario.label + '」场景的第 ' + String(stepIndex) + ' 步「' + step.detail + '」发生在哪条参与方泳道上？',
    options,
    answer: 0,
    explain: '第 ' + String(stepIndex) + ' 步的泳道是「' + correct + '」。完整轨迹可在 Turn 流程实验里逐步查看。',
    source: 'website/public/turn-flow-model.js 的 buildSteps（与实验页同一份数据）',
  }
}

function sessionReadingsQuestion(scenarioId) {
  const model = buildSessionLogModel({ scenario: scenarioId })
  const readings = model.observations
  const truth = readings.toolCalls
  const optionValues = [...new Set([truth, truth + 1, Math.max(0, truth - 1), readings.toolFailures])]
  const options = optionValues.map(value => String(value) + ' 次')
  return {
    id: 'gen-05-tools-' + scenarioId,
    q: '完整重放「' + model.scenario.label + '」场景的日志后，恢复出的状态里有几次工具调用？',
    options,
    answer: optionValues.indexOf(truth),
    explain: '重放是纯函数：同一段日志永远得到 toolCalls=' + String(truth) + '。读数来自 Session 日志实验用的同一个模型。',
    source: 'website/public/session-log-model.js 的 replaySessionLog',
  }
}

function turnRequestCountQuestion() {
  const scenario = TURN_SCENARIOS.find(candidate => candidate.id === 'two-tools')
  const model = buildTurnModel({ scenario: 'two-tools' })
  const truth = model.observations.modelRequests
  const optionValues = [...new Set([truth, truth + 1, Math.max(1, truth - 1), truth + 2])]
  const options = optionValues.map(value => String(value) + ' 次')
  return {
    id: 'gen-04-requests-two-tools',
    q: '「' + scenario.label + '」的完整轨迹里有几次模型请求？',
    options,
    answer: optionValues.indexOf(truth),
    explain: '每拿到一个工具结果都要带回模型：' + String(truth) + ' 次请求对应一次初始输入加三次工具结果回传。',
    source: 'website/public/turn-flow-model.js 的 buildSteps（与实验页同一份数据）',
  }
}

function sessionRefusalQuestion(scenarioId) {
  const model = buildSessionLogModel({ scenario: scenarioId })
  const stop = model.observations.refusedAt
  if (stop === null || stop === undefined) return null
  const optionValues = [...new Set([stop, stop + 1, Math.max(1, stop - 1), model.maxSequence])
    .add(model.maxSequence + 1)]
  const options = [...optionValues].sort((a, b) => a - b).map(value => '序号 ' + String(value))
  return {
    id: 'gen-05-refusal-' + scenarioId,
    q: '重放「' + model.scenario.label + '」场景的日志时，加载会在哪里停下？',
    options,
    answer: [...optionValues].sort((a, b) => a - b).indexOf(stop),
    explain: '必需事件读不懂或序号缺口都会让加载停下并报告位置；停下之前的事件已经折叠出可用的部分状态，这里停在序号 ' + String(stop) + '。',
    source: 'website/public/session-log-model.js 的 replaySessionLog 拒绝规则',
  }
}

/** 每课的生成题；返回新数组，调用方可以自由拼接和打乱。 */
export function generatedQuestionsFor(lessonId) {
  const generated = []
  if (lessonId === '04-Agent与Turn流程') {
    for (const stepIndex of [5, 11]) {
      const question = turnLaneQuestion(stepIndex)
      if (question !== null) generated.push(question)
    }
    generated.push(turnRequestCountQuestion())
  }
  if (lessonId === '05-Session日志与恢复') {
    for (const scenarioId of LOG_SCENARIOS.slice(0, 2).map(candidate => candidate.id)) {
      generated.push(sessionReadingsQuestion(scenarioId))
    }
    const refusal = sessionRefusalQuestion('gap')
    if (refusal !== null) generated.push(refusal)
  }
  return generated
}

/** 手写题库加生成题的完整组合；判分、复习解析都用这一份。 */
export function allQuestionsFor(lessonId) {
  const bank = QUIZ_BANK[lessonId]
  if (bank === undefined) return undefined
  return [...bank, ...generatedQuestionsFor(lessonId)]
}

/** 判一份答卷：answers 以题号为键，值是选项下标；返回每题对错和总分。 */
export function gradeAnswers(questions, answers) {
  const results = questions.map(question => {
    const chosen = answers[question.id]
    const pass = chosen === question.answer
    return { id: question.id, pass, chosen: chosen ?? null }
  })
  return {
    results,
    score: results.filter(result => result.pass).length,
    total: questions.length,
  }
}
