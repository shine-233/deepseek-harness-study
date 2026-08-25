/**
 * context-lab 实验页的渲染层。模型在 context-model.js。
 * 发现链 + 注入预览 + DisclosureRow 模拟。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import {
  buildContextInjectionModel,
  evaluateContextOracle,
} from './context-model.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

function initializePage() {
  const elements = {
    form: document.querySelector('#ctx-form'),
    cwdDepth: document.querySelector('#ctx-cwd-depth'),
    timeContext: document.querySelector('#ctx-time'),
    sessionRef: document.querySelector('#ctx-session-ref'),
    feedback: document.querySelector('#ctx-feedback'),
    chainList: document.querySelector('#ctx-chain-list'),
    injectionsList: document.querySelector('#ctx-injections'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    filesFound: document.querySelector('#metric-files'),
    dedupCount: document.querySelector('#metric-dedup'),
    producersActive: document.querySelector('#metric-producers'),
    oracle: document.querySelector('#metric-oracle'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  const rebuild = () => {
    try {
      const model = buildContextInjectionModel({
        cwdDepth: Number(elements.cwdDepth.value),
        hasTimeContext: elements.timeContext.checked,
        hasSessionRef: elements.sessionRef.checked,
      })
      const verdict = evaluateContextOracle(model)

      // 渲染发现链
      elements.chainList.replaceChildren()
      for (const item of model.chain) {
        const li = document.createElement('li')
        li.className = 'wt-source'
        li.textContent = `${item.path} — ${item.content.slice(0, 50)}`
        elements.chainList.append(li)
      }

      // 渲染注入
      elements.injectionsList.replaceChildren()
      for (const injection of model.injections) {
        const div = document.createElement('div')
        div.className = 'jb-step wn-phase'
        div.setAttribute('data-reveal', '')
        const head = document.createElement('strong')
        writeText(head, injection.role + (injection.producer ? ` · ${injection.producer}` : ''))
        div.append(head)
        if (injection.sources.length > 0) {
          for (const src of injection.sources) {
            const small = document.createElement('small')
            writeText(small, src)
            div.append(small)
          }
        }
        elements.injectionsList.append(div)
      }

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.filesFound, String(model.observations.discoveredFiles))
      writeText(elements.dedupCount, String(model.observations.deduplicated))
      writeText(elements.producersActive, String(model.observations.producersActive))
      revealOnScroll(elements.chainList.parentElement ?? elements.chainList)
      setFeedback(`已推演：发现 ${String(model.observations.discoveredFiles)} 个文件、${String(model.observations.producersActive)} 条注入。`, 'success')
    } catch (error) {
      console.error('[context] rebuild failed', error)
      revealOnScroll(elements.chainList.parentElement ?? elements.chainList)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })
  for (const control of [elements.cwdDepth, elements.timeContext, elements.sessionRef]) {
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
    correct: 'dedup-identical',
    explain: {
      'inject-all': '重复内容会浪费上下文预算——去重是设计决定，不是副作用。',
      'dedup-identical': '正确。同一目录内字节相同的候选去重取最早。',
      'skip-nested': '嵌套指令有独立价值：越靠近工作目录的指令越具体。',
    },
  })
}
