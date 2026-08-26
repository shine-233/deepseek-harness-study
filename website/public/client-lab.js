/**
 * client-lab 实验页的渲染层。模型在 client-model.js；本文件只画返回值。
 * 三面镜模式切换：工具卡状态机 / 会话折叠 / 提问接管。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import {
  CLIENT_MODES,
  QUESTION_INTENTS,
  buildConversationFoldModel,
  buildToolCardModel,
  buildUserQuestionsModel,
  evaluateClientOracle,
} from './client-model.js'

const STATE_LABELS = {
  pending: '等待中', running: '运行中', successful: '成功',
  failed: '失败', interrupted: '中断',
}

const MODE_PILL = {
  'tool-card': 'tool-card · ui-tool',
  'conversation-fold': 'conversation-fold · ui-conversation',
  'user-questions': 'user-questions · ui-user-questions',
}

function initializePage() {
  const elements = {
    form: document.querySelector('#client-form'),
    mode: document.querySelector('#client-mode'),
    panelTool: document.querySelector('#panel-tool'),
    panelFold: document.querySelector('#panel-fold'),
    panelQuestions: document.querySelector('#panel-questions'),
    tool: document.querySelector('#ct-tool'),
    fails: document.querySelector('#ct-fails'),
    interrupted: document.querySelector('#ct-interrupted'),
    summaryInWindow: document.querySelector('#cf-summary'),
    injectionProducer: document.querySelector('#cf-producer'),
    intent: document.querySelector('#cq-intent'),
    questionCount: document.querySelector('#cq-count'),
    binaryChoice: document.querySelector('#cq-binary'),
    hasApproveLabel: document.querySelector('#cq-approve-label'),
    planInDetail: document.querySelector('#cq-plan-detail'),
    feedback: document.querySelector('#client-feedback'),
    outTool: document.querySelector('#out-tool'),
    stagesBody: document.querySelector('#ct-stages-body'),
    foldList: document.querySelector('#cf-nodes'),
    outQuestions: document.querySelector('#out-questions'),
    questionsActions: document.querySelector('#cq-actions'),
    surfaceOut: document.querySelector('#metric-surface'),
    nodesMetric: document.querySelector('#metric-nodes'),
    modePill: document.querySelector('#cl-mode-pill'),
    oracle: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const mode of CLIENT_MODES) {
    const option = document.createElement('option')
    option.value = mode
    option.textContent = mode === 'tool-card' ? 'ui-tool —— 工具卡状态机'
      : mode === 'conversation-fold' ? 'ui-conversation —— 折叠引擎'
        : 'ui-user-questions —— 提问接管'
    elements.mode.append(option)
  }
  for (const intent of QUESTION_INTENTS) {
    const option = document.createElement('option')
    option.value = intent
    option.textContent = intent
    elements.intent.append(option)
  }

  const rebuild = () => {
    try {
      const mode = elements.mode.value
      writeText(elements.modePill, MODE_PILL[mode] ?? mode)
      elements.panelTool.hidden = mode !== 'tool-card'
      elements.panelFold.hidden = mode !== 'conversation-fold'
      elements.panelQuestions.hidden = mode !== 'user-questions'
      elements.outTool.hidden = mode !== 'tool-card'
      elements.foldList.hidden = mode !== 'conversation-fold'
      elements.outQuestions.hidden = mode !== 'user-questions'

      let model
      if (mode === 'tool-card') {
        model = buildToolCardModel({
          tool: elements.tool.value,
          fails: elements.fails.checked,
          interrupted: elements.interrupted.checked,
        })
      } else if (mode === 'conversation-fold') {
        model = buildConversationFoldModel({
          summaryInWindow: elements.summaryInWindow.checked,
          injectionHasProducer: elements.injectionProducer.checked,
        })
      } else {
        model = buildUserQuestionsModel({
          intent: elements.intent.value,
          questionCount: Number(elements.questionCount.value),
          binaryChoice: elements.binaryChoice.checked,
          hasApproveLabel: elements.hasApproveLabel.checked,
          planInDetail: elements.planInDetail.checked,
        })
      }
      const verdict = evaluateClientOracle(model)

      if (mode === 'tool-card') {
        elements.stagesBody.replaceChildren()
        for (const stage of model.stages) {
          const row = document.createElement('tr')
          for (const cell of [stage.stage, STATE_LABELS[stage.state] ?? stage.state, stage.card, stage.anchor]) {
            const td = document.createElement('td')
            td.textContent = cell
            row.append(td)
          }
          elements.stagesBody.append(row)
        }
        writeText(elements.surfaceOut, `${String(model.stages.length)} 阶段`)
      } else if (mode === 'conversation-fold') {
        elements.foldList.replaceChildren()
        for (const node of model.nodes) {
          const li = document.createElement('li')
          li.className = 'jb-step' + (node.collapsed ? ' wn-phase' : '')
          const head = document.createElement('div')
          head.className = 'jb-step-head'
          const title = document.createElement('strong')
          title.textContent = node.title
          const chip = document.createElement('span')
          chip.className = 'tj-view-chip'
          chip.textContent = node.type
          head.append(title, chip)
          li.append(head)
          elements.foldList.append(li)
        }
        writeText(nodesMetricSafe(), String(model.observations.nodeCount))
        writeText(elements.surfaceOut, `${String(model.observations.nodeCount)} 个节点`)
      } else {
        elements.questionsActions.replaceChildren()
        for (const action of model.actions) {
          const chip = document.createElement('span')
          chip.className = 'story-beat'
          chip.textContent = action
          elements.questionsActions.append(chip)
        }
        writeText(elements.surfaceOut, model.surface)
      }

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      setFeedback('已推演：' + (MODE_PILL[mode] ?? mode) + '。', 'success')
    } catch (error) {
      console.error('[client] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  function nodesMetricSafe() {
    return elements.nodesMetric
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.mode.addEventListener('change', rebuild)
  for (const control of elements.form.querySelectorAll('input, select')) {
    if (control === elements.mode) continue
    control.addEventListener('change', rebuild)
  }

  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installStoryRail()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 三个组件面板都不产 steps：把各自的状态序列枚举成轨迹，文字引用模型字段。
    const cardTrace = input => buildToolCardModel(input).stages.map((stage, index) => ({
      lane: '工具卡', phase: stage.stage, index,
      detail: `${stage.stage}：state=${stage.state} · ${stage.card}`,
    }))
    const foldTrace = input => {
      const model = buildConversationFoldModel(input)
      return model.nodes.map((node, index) => ({
        lane: '会话流', phase: node.type, index,
        detail: `${node.title}${node.collapsed ? '（默认折叠）' : ''}：按日志序放置`,
      }))
    }
    const questionsTrace = input => {
      const model = buildUserQuestionsModel(input)
      return [
        { lane: '提问', phase: 'intent', index: 0, detail: `意图=${model.input.intent}：问题占用 composer 输入区。` },
        { lane: '选项', phase: 'actions', index: 1, detail: `渲染 ${String(model.actions.length)} 个动作按钮${model.input.binaryChoice ? '，二元选择' : ''}。` },
        { lane: '结算', phase: 'claim', index: 2, detail: `composer 归属者 ${String(model.observations.composerOwnerCount)} 个：一次只有一个请求占用输入区。` },
      ]
    }
    createConceptLadder(ladderRoot, {
      storageKey: 'client-ladder',
      rungs: replayRungs([
        {
          title: '工具卡四态：只由冻结的切片决定',
          text: 'call-accepted → running → done/fails：生命周期状态只从日志里的 call/result 切片推导。展示层不自造状态，也不预测未来。',
          traces: [{ id: 'card', label: '失败收尾', steps: cardTrace({ fails: true }), focusPhases: [] }],
        },
        {
          title: '折叠与署名：节点按日志序就座',
          text: '用户气泡、助手消息、折叠摘要各有座位；折叠行是否可展开取决于摘要是否在窗口内，注入行署名 producer。',
          traces: [{ id: 'fold', label: '标准会话', steps: foldTrace({ summaryInWindow: true, injectionHasProducer: true }) }],
        },
        {
          title: '提问接管 composer：一个输入区只伺候一个请求',
          text: '计划审阅类提问带二元选择和批准按钮时才被认作接管。其余意图只是普通消息，不动输入区。',
          traces: [{ id: 'ask', label: '计划审阅提问', steps: questionsTrace({ intent: 'plan-review' }) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'interrupted-no-change',
    explain: {
      'corrupt-log': '状态只来自冻结切片：结果缺失就是 interrupted，不是损坏数据。',
      'stays-running': '永远 running 会让界面撒谎；切片缺失必须显式呈现为中断。',
      'interrupted-no-change': '正确。展示层从不自造成功，也从不改写执行事实。',
    },
  })
}
