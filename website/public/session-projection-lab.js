/**
 * session-projection 实验页的渲染层。模型在 session-projection-model.js。
 * 四列投影状态并排显示，步进滑杆控制重放位置。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, bindRangeKeys, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installRelatedLabs } from './study-related-labs.js'
import { installStoryRail } from './study-lab-story.js'
import {
  PROJECTION_KEYS,
  SESSION_EVENTS,
  buildProjectionModel,
  evaluateProjectionOracle,
} from './session-projection-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

function initializePage() {
  const elements = {
    form: document.querySelector('#sp-form'),
    feedback: document.querySelector('#sp-feedback'),
    eventList: document.querySelector('#sp-events'),
    columns: document.querySelector('#sp-columns'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    eventsMetric: document.querySelector('#metric-events'),
    todos: document.querySelector('#metric-todos'),
    planMode: document.querySelector('#metric-plan'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    step: document.querySelector('#sp-step'),
    stepOutput: document.querySelector('#sp-step-output'),
    stepPrev: document.querySelector('#sp-step-prev'),
    stepNext: document.querySelector('#sp-step-next'),
    stepCaption: document.querySelector('#sp-step-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let currentModel = null

  const rebuild = () => {
    try {
      const model = buildProjectionModel({ upto: Number(elements.step.value) })
      const verdict = evaluateProjectionOracle(model)
      currentModel = model

      // 左列：事件流
      elements.eventList.replaceChildren()
      for (const event of model.events) {
        if (event.seq > model.input.upto + 1) break
        const li = document.createElement('li')
        li.className = 'jb-step' + (event.seq > model.input.upto ? ' is-future' : ' is-current')
        li.setAttribute('data-reveal', '')
        li.dataset.index = String(event.seq - 1)
        const head = document.createElement('div')
        head.className = 'jb-step-head'
        const kind = document.createElement('code')
        writeText(kind, `#${String(event.seq)} ${event.kind}`)
        head.append(kind)
        const detail = document.createElement('p')
        detail.className = 'jb-step-detail'
        writeText(detail, JSON.stringify(event.payload).slice(0, 80))
        li.append(head, detail)
        elements.eventList.append(li)
      }

      // 右列：四列投影
      elements.columns.replaceChildren()
      for (const key of PROJECTION_KEYS) {
        const col = document.createElement('div')
        col.className = 'sp-col'
        const header = document.createElement('h4')
        writeText(header, key)
        col.append(header)
        const state = model.states[key]
        const entries = Object.entries(state).filter(([k]) => !k.startsWith('_'))
        if (entries.length === 0) {
          const empty = document.createElement('small')
          writeText(empty, '（初始状态）')
          col.append(empty)
        } else {
          const dl = document.createElement('dl')
          for (const [k, v] of entries) {
            if (k === 'items') continue
            const dt = document.createElement('dt')
            writeText(dt, k)
            const dd = document.createElement('dd')
            writeText(dd, typeof v === 'object' ? JSON.stringify(v) : String(v))
            dl.append(dt, dd)
          }
          col.append(dl)
          if (state.items && Array.isArray(state.items)) {
            const ul = document.createElement('ul')
            ul.className = 'wt-sources'
            for (const item of state.items) {
              const li = document.createElement('li')
              li.className = 'wt-source'
              li.textContent = `[${item.status}] ${item.content}`
              ul.append(li)
            }
            col.append(ul)
          }
        }
        elements.columns.append(col)
      }

      renderOracle(verdict, elements.oracleList, elements.oracle)
      revealOnScroll(elements.eventList)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      const msg = model.events[model.input.upto]
      writeText(elements.stepCaption, `#${String(msg.seq)} ${msg.kind}`)

      writeText(elements.eventsMetric, `${String(model.input.upto + 1)} / ${String(model.observations.totalEvents)}`)
      writeText(elements.todos, model.summary.todos)
      writeText(elements.planMode, model.summary.planMode)

      setFeedback(`已重放到第 ${String(model.input.upto)} 条事件。`, 'success')
      persistState()
    } catch (error) {
      console.error('[sp] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        step: Number(elements.step.value),
      }, { step: { integerRange: [0, Number.MAX_SAFE_INTEGER] } }))
    } catch { /* 保持安静 */ }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })

  elements.step.max = String(SESSION_EVENTS.length - 1)
  elements.step.addEventListener('input', () => {
    writeText(elements.stepOutput, elements.step.value)
    rebuild()
    persistState()
  })
  const nudge = d => {
    elements.step.value = String(Math.min(Number(elements.step.max), Math.max(Number(elements.step.min), Number(elements.step.value) + d)))
    elements.step.dispatchEvent(new Event('input', { bubbles: true }))
  }
  elements.stepPrev.addEventListener('click', () => nudge(-1))
  elements.stepNext.addEventListener('click', () => nudge(1))
  bindRangeKeys(elements.step)
  // 图形即控制器：点事件流的任意一条，滑杆直接重放到那一步。
  elements.eventList.addEventListener('click', event => {
    const item = event.target instanceof Element ? event.target.closest('[data-index]') : null
    if (item === null) return
    elements.step.value = item.dataset.index
    elements.step.dispatchEvent(new Event('input', { bubbles: true }))
  })

  elements.step.max = String(Number.MAX_SAFE_INTEGER)
  const restored = readStateFromHash(location.hash, { step: { integerRange: [0, Number.MAX_SAFE_INTEGER] } })
  if (restored !== null && restored.ok) elements.step.value = String(restored.value.step)
  writeText(elements.stepOutput, elements.step.value)

  rebuild()
  if (Number(elements.step.value) > Number(elements.step.max)) {
    elements.step.value = elements.step.max; rebuild()
  }

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制链接。', 'success')
    } catch { setFeedback('手动复制地址栏链接。', 'error') }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installStoryRail()
  installRelatedLabs()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'independent-folds',
    explain: {
      'shared-state': '共享可变状态会破坏独立性——一条事件的 bug 会传染所有投影。',
      'recompute-all': '全量重算浪费 CPU；无关事件返回同一引用是零开销的关键。',
      'independent-folds': '正确。每个单元独立折叠，无关事件返回原引用——这就是 ProjectionDefinition 契约的核心。',
    },
  })
}
