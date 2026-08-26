/**
 * tool-budget-lab 实验页的渲染层。模型在 tool-budget-model.js；本文件只画返回值。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  writeText,
  installDeclaredIcons,
  bindRangeKeys,
  installScrollProgress,
  installInputReset,
  svgElement,
} from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import {
  APPROVAL_OPTIONS,
  RESTRICT_OPTIONS,
  buildToolBudgetModel,
  evaluateToolBudgetOracle,
} from './tool-budget-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const TB_STATE_SCHEMA = {
  plugins: { integerRange: [2, 12] },
  toolsPerPlugin: { integerRange: [1, 6] },
  restrict: { enum: RESTRICT_OPTIONS },
  native: { integerRange: [0, 72] },
  approval: { enum: APPROVAL_OPTIONS },
}

/** 漏斗几何：viewBox 常量与每行的纵向节奏。条宽按最大注册数归一。 */
const FUNNEL_VIEW_BOX = '0 0 660 292'
const FUNNEL_ROW_HEIGHT = 56
const FUNNEL_TOP_PAD = 8
const FUNNEL_LABEL_X = 8
const FUNNEL_BAR_X = 200
const FUNNEL_BAR_MAX_WIDTH = 350

function renderFunnel(model, container) {
  container.replaceChildren()
  const svg = svgElement('svg', {
    viewBox: FUNNEL_VIEW_BOX,
    role: 'img',
    'aria-label': '五层漏斗：' + model.layers.map(layer => `${layer.title} ${layer.count}`).join('，'),
  })
  const widest = Math.max(model.counts.registered, 1)

  model.layers.forEach((layer, index) => {
    const rowY = FUNNEL_TOP_PAD + index * FUNNEL_ROW_HEIGHT
    const group = svgElement('g', { 'data-reveal': '' })

    group.append(svgElement('text', {
      x: FUNNEL_LABEL_X, y: rowY + 18,
      'font-size': 13, 'font-weight': 600, fill: 'var(--ink)',
    }, `${layer.no} ${layer.title}`))
    group.append(svgElement('text', {
      x: FUNNEL_LABEL_X, y: rowY + 35,
      'font-size': 11, fill: 'var(--muted)',
    }, layer.mechanism))

    if (layer.count > 0) {
      const width = Math.max(3, Math.round((layer.count / widest) * FUNNEL_BAR_MAX_WIDTH))
      group.append(svgElement('rect', {
        x: FUNNEL_BAR_X, y: rowY + 4, width, height: 26, rx: 5,
        fill: layer.id === 'approved' ? 'var(--allow)' : 'var(--brand)',
      }))
      group.append(svgElement('text', {
        x: FUNNEL_BAR_X + width + 8, y: rowY + 23,
        'font-size': 14, 'font-weight': 600, fill: 'var(--ink)',
      }, `${layer.count} 个`))
    } else {
      group.append(svgElement('text', {
        x: FUNNEL_BAR_X + 4, y: rowY + 23,
        'font-size': 14, 'font-weight': 600, fill: 'var(--muted)',
      }, '0 个'))
    }

    if (index < model.layers.length - 1) {
      const blocked = Object.values(model.blocked)[index]
      const arrowY = rowY + 40
      const arrow = svgElement('path', {
        d: `M${FUNNEL_BAR_X + 30} ${arrowY} v10 m-4 -5 l4 5 l4 -5`,
        fill: 'none', stroke: 'var(--deny-ink)', 'stroke-width': 1.5,
      })
      const note = svgElement('text', {
        x: FUNNEL_BAR_X + 44, y: arrowY + 9,
        'font-size': 11, fill: 'var(--deny-ink)',
      }, `这层挡下 ${blocked} 个`)
      if (blocked === 0) note.setAttribute('fill', 'var(--muted)')
      group.append(arrow, note)
    }

    svg.append(group)
  })

  container.append(svg)
  revealOnScroll(container)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#tb-form'),
    plugins: document.querySelector('#tb-plugins'),
    toolsPerPlugin: document.querySelector('#tb-tools'),
    restrict: document.querySelector('#tb-restrict'),
    native: document.querySelector('#tb-native'),
    approval: document.querySelector('#tb-approval'),
    pluginsOut: document.querySelector('#tb-plugins-out'),
    toolsOut: document.querySelector('#tb-tools-out'),
    nativeOut: document.querySelector('#tb-native-out'),
    feedback: document.querySelector('#tb-feedback'),
    funnel: document.querySelector('#tb-funnel'),
    tableBody: document.querySelector('#tb-tools-body'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    registered: document.querySelector('#metric-registered'),
    visible: document.querySelector('#metric-visible'),
    nativeCount: document.querySelector('#metric-native-count'),
    capable: document.querySelector('#metric-capable'),
    approved: document.querySelector('#metric-approved'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  const syncOutputs = () => {
    writeText(elements.pluginsOut, elements.plugins.value)
    writeText(elements.toolsOut, elements.toolsPerPlugin.value)
    writeText(elements.nativeOut, elements.native.value)
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        plugins: Number(elements.plugins.value),
        toolsPerPlugin: Number(elements.toolsPerPlugin.value),
        restrict: elements.restrict.value,
        native: Number(elements.native.value),
        approval: elements.approval.value,
      }, TB_STATE_SCHEMA))
    } catch {
      // 保持安静：file:// 下 replaceState 可能被拒，推演照常。
    }
  }

  const rebuild = () => {
    try {
      const registeredCap = Number(elements.plugins.value) * Number(elements.toolsPerPlugin.value)
      if (Number(elements.native.value) > registeredCap) elements.native.value = String(registeredCap)
      elements.native.max = String(Math.max(registeredCap, 1))
      syncOutputs()

      const model = buildToolBudgetModel({
        plugins: Number(elements.plugins.value),
        toolsPerPlugin: Number(elements.toolsPerPlugin.value),
        restrict: elements.restrict.value,
        nativePresenters: Number(elements.native.value),
        approval: elements.approval.value,
      })
      const verdict = evaluateToolBudgetOracle(model)

      renderFunnel(model, elements.funnel)
      renderRows(elements.tableBody, model.tools.map(tool => ({
        cells: [tool.name, tool.kindLabel, tool.stopLabel, tool.reason],
      })))
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.registered, model.counts.registered)
      writeText(elements.visible, model.counts.visible)
      writeText(elements.nativeCount, model.counts.native)
      writeText(elements.capable, model.counts.capable)
      writeText(elements.approved, model.counts.approved)

      setFeedback(`已重算：${model.counts.registered} 注册 → ${model.counts.visible} 可见 → `
        + `${model.counts.native} 原生呈现 → ${model.counts.capable} 能力放行 → `
        + `${model.counts.approved} 可执行。挡下明细见判定表。`, 'success')
      persistState()
    } catch (error) {
      console.error('[tool-budget] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.plugins, elements.toolsPerPlugin, elements.native]) {
    control.addEventListener('input', rebuild)
  }
  for (const control of [elements.restrict, elements.approval]) {
    control.addEventListener('change', rebuild)
  }

  bindRangeKeys(elements.plugins)

  const restored = readStateFromHash(location.hash, TB_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.plugins.value = String(restored.value.plugins)
    elements.toolsPerPlugin.value = String(restored.value.toolsPerPlugin)
    elements.restrict.value = restored.value.restrict
    elements.native.value = String(restored.value.native)
    elements.approval.value = restored.value.approval
  }

  rebuild()

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installStoryRail()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 模型不产 steps：漏斗枚举成「每层一步」，点名枚举成「每工具一步」，
    // 全部数字与原因取自模型字段，不新编事实。
    const funnelTrace = input => {
      const model = buildToolBudgetModel(input)
      const counts = model.counts
      return [
        { lane: '漏斗', phase: 'registered', index: 0, detail: `① 已注册 ${String(counts.registered)} 个（${String(model.input.plugins)} 插件 × 每插件 ${String(model.input.toolsPerPlugin)} 个）。` },
        { lane: '漏斗', phase: 'visible', index: 1, detail: `② restrict=${model.input.restrict} 后模型可见 ${String(counts.visible)} 个。` },
        { lane: '漏斗', phase: 'native', index: 2, detail: `③ 原生名额 ${String(model.input.nativePresenters)}：拿到原生 schema 的有 ${String(counts.native)} 个，其余改走 Code Mode。` },
        { lane: '漏斗', phase: 'capable', index: 3, detail: `④ 宿主能力放行 ${String(counts.capable)} 个——可见性管不到这一层。` },
        { lane: '漏斗', phase: 'approved', index: 4, detail: `⑤ 审批策略 ${model.input.approval} 下本轮可执行 ${String(counts.approved)} 个。` },
      ]
    }
    const namedTrace = input => {
      const model = buildToolBudgetModel(input)
      const picked = []
      for (const stop of [2, 3, 4, 5, null]) {
        const tool = model.tools.find(candidate => candidate.stopLayer === stop)
        if (tool !== undefined) picked.push(tool)
      }
      return picked.map((tool, index) => ({
        lane: tool.stopLayer === null ? '全链路' : `止步第 ${String(tool.stopLayer)} 层`,
        phase: tool.stopLayer === null ? 'pass' : `stop-${String(tool.stopLayer)}`,
        index,
        detail: `${tool.name}（${tool.kindLabel}）：${tool.reason}。`,
      }))
    }

    createConceptLadder(ladderRoot, {
      storageKey: 'tool-budget-ladder',
      rungs: replayRungs([
        {
          title: '五层漏斗：注册数逐层只减不增',
          text: '从注册到可执行要过五道机制：注册表、作用域 restrict、原生呈现名额、宿主能力、审批。条宽逐层收窄，每一层挡下谁都有名单可查。',
          traces: [{ id: 'funnel', label: '默认输入', steps: funnelTrace({}) }],
        },
        {
          title: '挡下名单可以逐工具点名',
          text: '没拿到原生名额不等于删除：它改走 Code Mode，仍然可解析。「删除路径／跑子进程」由宿主能力拒绝，「写文件／网络抓取」在 ask 策略下停在待批准。',
          traces: [{
            id: 'named',
            label: '全部放行 × 名额 6',
            steps: namedTrace({ plugins: 6, toolsPerPlugin: 3, restrict: 'all', nativePresenters: 6, approval: 'ask' }),
            focusPhases: ['pass'],
          }],
        },
        {
          title: '两笔账：注册但看不见 ≠ 看得见但执行不了',
          text: 'restrict 决定查找面，呈现与审批决定发言面和执行面。把 restrict 放开、审批收紧，两个数字当场分离——同一份输入下各自对账。',
          traces: [
            { id: 'narrow', label: 'restrict 收窄', steps: funnelTrace({}) },
            { id: 'all-ask', label: '全部放行 + ask', steps: funnelTrace({ plugins: 6, toolsPerPlugin: 3, restrict: 'all', nativePresenters: 3, approval: 'ask' }) },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'depends-present',
    explain: {
      'always-schema': '能解析只说明查找找得到它；schema 要等 presentAs 与最终组装放行才随请求发出。',
      'depends-present': '正确。restrict 之后还有呈现层：没拿到原生名额的工具改走 Code Mode，请求里只有 run_code 和 SDK。',
      'none-left': '一个都不发言过其实：只要呈现层给出名额，可解析工具的原生 schema 就会进请求。',
    },
  })
}
