/**
 * workflow-node 实验页的渲染层。模型在 workflow-node-model.js；本文件只画返回值。
 * 左列持久记录流、右列折叠后的聊天节点和读数读的是同一次重放。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import { installInputReset } from './study-lab-kit.js'
import {
  NODE_ENDINGS,
  NODE_SHAPES,
  buildWorkflowNodeModel,
  evaluateWorkflowNodeOracle,
} from './workflow-node-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATUS_LABELS = {
  completed: '已完成',
  error: '出错',
  cancelled: '已取消',
  interrupted: '中断（缺终局事实）',
  ok: '完成',
  failed: '失败',
  running: '运行中',
}

function renderRecords(model, target) {
  target.replaceChildren()
  const list = document.createElement('ol')
  list.className = 'jb-timeline'
  for (const record of model.records) {
    const item = document.createElement('li')
    item.className = 'jb-step'
    item.setAttribute('data-reveal', '')
    const head = document.createElement('div')
    head.className = 'jb-step-head'
    const eventChip = document.createElement('span')
    eventChip.className = 'tj-view-chip'
    writeText(eventChip, record.event)
    const seq = document.createElement('code')
    writeText(seq, record.seq !== undefined ? `seq=${String(record.seq)}` : `step=${String(record.afterStep)}`)
    head.append(eventChip, seq)
    const detail = document.createElement('p')
    detail.className = 'jb-step-detail'
    const bits = [`runId=${record.runId}`]
    if (record.phase !== undefined) bits.push(`phase='${record.phase}'`)
    else if (record.event === 'tool-workflow/member-start') bits.push('phase=省略')
    if (record.outcome !== undefined) bits.push(`outcome=${String(record.outcome)}`)
    if (record.stopReason !== undefined) bits.push(`stopReason=${String(record.stopReason)}`)
    writeText(detail, bits.join(' · '))
    item.append(head, detail)
    list.append(item)
  }
  target.append(list)
  revealOnScroll(target)
}

function renderNode(model, target) {
  target.replaceChildren()
  const card = document.createElement('div')
  card.className = 'wn-node'

  // 原工具卡：折叠不改它。
  const toolCard = document.createElement('div')
  toolCard.className = 'wn-tool-card'
  const toolTitle = document.createElement('code')
  writeText(toolTitle, `workflow: ${model.node.metaName}（generic 卡 · 折叠不改它）`)
  toolCard.append(toolTitle)

  const head = document.createElement('button')
  head.type = 'button'
  head.className = 'wn-row wn-run' + (model.node.initialOpen ? ' is-open' : '')
  head.setAttribute('aria-expanded', String(model.node.initialOpen))
  const chevron = document.createElement('span')
  chevron.className = 'wn-chevron'
  writeText(chevron, model.node.initialOpen ? '▾' : '▸')
  const title = document.createElement('strong')
  writeText(title, `${model.node.metaName} · ${model.node.runId}`)
  const statusDot = document.createElement('span')
  statusDot.className = 'wn-status is-' + model.node.status
  writeText(statusDot, STATUS_LABELS[model.node.status] ?? model.node.status)
  head.append(chevron, title, statusDot)

  const body = document.createElement('div')
  body.className = 'wn-body'
  body.hidden = !model.node.initialOpen

  for (const phase of model.node.phases) {
    const phaseRow = document.createElement('button')
    phaseRow.type = 'button'
    phaseRow.className = 'wn-row wn-phase' + (phase.initialOpen ? ' is-open' : '')
    phaseRow.setAttribute('aria-expanded', String(phase.initialOpen))
    const pChevron = document.createElement('span')
    pChevron.className = 'wn-chevron'
    writeText(pChevron, phase.initialOpen ? '▾' : '▸')
    const pTitle = document.createElement('span')
    writeText(pTitle, `phase: ${phase.title}（${String(phase.memberCount)} 个成员）`)
    const anyFailed = phase.members.some(member => member.status === 'failed')
    const pStatus = document.createElement('span')
    pStatus.className = 'wn-status ' + (anyFailed ? 'is-failed' : 'is-completed')
    writeText(pStatus, anyFailed ? '含失败成员' : '成员全部结束')
    phaseRow.append(pChevron, pTitle, pStatus)

    const memberList = document.createElement('ul')
    memberList.className = 'wn-members'
    memberList.hidden = !phase.initialOpen
    for (const member of phase.members) {
      const li = document.createElement('li')
      li.className = 'wn-member'
      const name = document.createElement('span')
      name.className = 'wn-member-name'
      writeText(name, `#${String(member.seq)} ${member.label}`)
      const mStatus = document.createElement('span')
      mStatus.className = 'wn-status wn-member-status is-' + member.status
      writeText(mStatus, STATUS_LABELS[member.status] ?? member.status)
      li.append(name, mStatus)
      memberList.append(li)
    }

    head.addEventListener('click', () => {
      const open = body.hidden
      body.hidden = !open
      head.classList.toggle('is-open', open)
      head.setAttribute('aria-expanded', String(open))
    })
    phaseRow.addEventListener('click', () => {
      const open = memberList.hidden
      memberList.hidden = !open
      phaseRow.classList.toggle('is-open', open)
      phaseRow.setAttribute('aria-expanded', String(open))
    })

    body.append(phaseRow, memberList)
  }

  card.append(toolCard, head, body)
  target.append(card)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#wfn-form'),
    ending: document.querySelector('#wfn-ending'),
    shape: document.querySelector('#wfn-shape'),
    truncated: document.querySelector('#wfn-truncated'),
    feedback: document.querySelector('#wfn-feedback'),
    records: document.querySelector('#wfn-records'),
    node: document.querySelector('#wfn-node'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    recordsMetric: document.querySelector('#metric-records'),
    statusOut: document.querySelector('#metric-node-status'),
    groups: document.querySelector('#metric-groups'),
    toolCard: document.querySelector('#metric-tool-card'),
    oracle: document.querySelector('#metric-oracle'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const ending of NODE_ENDINGS) {
    const option = document.createElement('option')
    option.value = ending
    writeText(option, ending)
    elements.ending.append(option)
  }
  for (const shape of NODE_SHAPES) {
    const option = document.createElement('option')
    option.value = shape
    writeText(option, shape)
    elements.shape.append(option)
  }

  const rebuild = () => {
    try {
      const model = buildWorkflowNodeModel({
        ending: elements.ending.value,
        shape: elements.shape.value,
        truncated: elements.truncated.checked,
      })
      const verdict = evaluateWorkflowNodeOracle(model)

      renderRecords(model, elements.records)
      renderNode(model, elements.node)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.recordsMetric, String(model.observations.records))
      writeText(elements.statusOut, model.node.status)
      writeText(elements.groups, `${String(model.observations.phaseGroupCount)} 组`
        + (model.observations.emptyVsOmittedSplit ? '（空串与省略分列）' : ''))
      writeText(elements.toolCard, model.node.toolCardUnchanged ? '不变' : '被改')
      setFeedback('已折叠：节点状态「' + model.node.status + '」，来自 '
        + String(model.observations.records) + ' 条持久记录。', 'success')
    } catch (error) {
      console.error('[workflow-node] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.ending, elements.shape]) control.addEventListener('change', rebuild)
  elements.truncated.addEventListener('change', rebuild)

  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installStoryRail()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'interrupted-no-change',
    explain: {
      'corrupt-log': 'invariant 明确接受缺失的终端后缀——那是中断证据，不是损坏。',
      'drop-node': '记录仍在：节点照常锚定，只是以 interrupted 呈现缺掉的终局。',
      'interrupted-no-change': '正确。缺失的终端事件呈现为 interrupted，工具结果一个字都不变——展示层从不改写执行事实。',
    },
  })
}
