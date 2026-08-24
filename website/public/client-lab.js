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
