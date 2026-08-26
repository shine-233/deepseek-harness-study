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
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

function initializePage() {
  const elements = {
    form: document.querySelector('#ctx-form'),
    cwdDepth: document.querySelector('#ctx-cwd-depth'),
    timeContext: document.querySelector('#ctx-time'),
    sessionRef: document.querySelector('#ctx-session-ref'),
    dupNested: document.querySelector('#ctx-dup-nested'),
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
        sameDirDuplicate: elements.dupNested.checked,
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
      setFeedback(model.observations.deduplicated > 0
        ? `已推演：发现 ${String(model.observations.discoveredFiles)} 个文件、${String(model.observations.producersActive)} 条注入；去重丢弃 ${String(model.observations.deduplicated)} 个同目录重复候选。`
        : `已推演：发现 ${String(model.observations.discoveredFiles)} 个文件、${String(model.observations.producersActive)} 条注入。`, 'success')
    } catch (error) {
      console.error('[context] rebuild failed', error)
      revealOnScroll(elements.chainList.parentElement ?? elements.chainList)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })
  for (const control of [elements.cwdDepth, elements.timeContext, elements.sessionRef, elements.dupNested]) {
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
    // 模型产出 chain + injections：发现链一步一条，注入一步一条。
    const ctxTrace = input => {
      const model = buildContextInjectionModel(input)
      const steps = model.chain.map((entry, index) => ({
        lane: '发现链',
        phase: entry.source,
        index,
        detail: `${entry.path}（${entry.source}）`,
      }))
      for (const injection of model.injections) {
        steps.push({
          lane: '注入',
          phase: injection.role,
          index: steps.length,
          detail: `${injection.type} · producer=${injection.producer} · 来源 ${injection.sources.join(', ')}`,
        })
      }
      return steps
    }
    createConceptLadder(ladderRoot, {
      storageKey: 'context-ladder',
      rungs: replayRungs([
        {
          title: '发现链从全局出发，逐目录向下',
          text: '先读 ~/.dsh/AGENTS.md 的全局指令；cwd 所在目录再向上没有更近的候选时，全局就是唯一来源。来源标签跟着每条指令走。',
          traces: [{ id: 'global', label: '仓库根', steps: ctxTrace({ cwdDepth: 0 }) }],
        },
        {
          title: '越近越具体：cwd 里发现的指令合并进同一次注入',
          text: 'packages/app/CLAUDE.md 被发现后与全局指令汇成一条 workspace-instructions 注入。离代码越近的约定，和全局约定一起到达模型。',
          traces: [{ id: 'discovered', label: '深入一层', steps: ctxTrace({ cwdDepth: 1 }), focusPhases: ['discovered'] }],
        },
        {
          title: '时间与会话引用是另两条独立的注入',
          text: '开启时间上下文与跨会话召回后，注入列表各多一项：time-context 与 disclosure-row 形式的 session-reference。每条注入都署名自己的 producer。',
          traces: [{ id: 'extras', label: '时间 + 会话', steps: ctxTrace({ cwdDepth: 1, hasTimeContext: true, hasSessionRef: true }), focusPhases: ['time-context', 'session-reference'] }],
        },
      ]),
    })
  }

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
