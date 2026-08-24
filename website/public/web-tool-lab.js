/**
 * web-tool 实验页的渲染层。模型在 web-tool-model.js；本文件只画返回值。
 * 模式开关切换 fetch / search 两套控件与输出，读数读的是同一次推演。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  FETCH_PAGES,
  buildWebFetchModel,
  buildWebSearchModel,
  evaluateWebToolOracle,
} from './web-tool-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const PAGE_LABELS = {
  docs: '普通 HTML（标题/链接/列表/表格 + 杂散 script/style）',
  deep: '嵌套 640 层的 div 页（超过 512 上限）',
  plain: 'text/plain 直通',
  slow: 'provider 已截断的长报告',
}

function renderSteps(model, target) {
  target.replaceChildren()
  const strip = document.createElement('div')
  strip.className = 'fe-pipeline'
  model.steps.forEach((step, index) => {
    const chip = document.createElement('span')
    chip.className = 'fe-stage ' + (step.ok ? 'is-ok' : 'is-fail')
    chip.setAttribute('data-reveal', '')
    const name = document.createElement('strong')
    writeText(name, step.stage)
    const detail = document.createElement('small')
    writeText(detail, step.detail)
    chip.append(name, detail)
    strip.append(chip)
    if (index < model.steps.length - 1) {
      const arrow = document.createElement('span')
      arrow.className = 'fe-arrow'
      arrow.textContent = '→'
      strip.append(arrow)
    }
  })
  target.append(strip)
  revealOnScroll(target)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#web-form'),
    mode: document.querySelector('#web-mode'),
    fetchPanel: document.querySelector('#panel-fetch'),
    searchPanel: document.querySelector('#panel-search'),
    url: document.querySelector('#web-url'),
    page: document.querySelector('#web-page'),
    cap: document.querySelector('#web-cap'),
    capOutput: document.querySelector('#web-cap-output'),
    queryA: document.querySelector('#query-a'),
    queryB: document.querySelector('#query-b'),
    maxResults: document.querySelector('#web-max-results'),
    maxResultsOutput: document.querySelector('#web-max-results-output'),
    failSecond: document.querySelector('#fail-second'),
    feedback: document.querySelector('#web-feedback'),
    pipeline: document.querySelector('#wt-pipeline'),
    errorBox: document.querySelector('#wt-error-box'),
    textOut: document.querySelector('#wt-text'),
    textNote: document.querySelector('#wt-text-note'),
    metaOut: document.querySelector('#wt-meta'),
    sourcesList: document.querySelector('#wt-sources'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stages: document.querySelector('#metric-stages'),
    outcomeMetric: document.querySelector('#metric-outcome'),
    truncated: document.querySelector('#metric-truncated'),
    oracle: document.querySelector('#metric-oracle'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const [id, page] of Object.entries(FETCH_PAGES)) {
    const option = document.createElement('option')
    option.value = id
    writeText(option, PAGE_LABELS[id] ?? id)
    elements.page.append(option)
  }

  const currentInputs = () => ({
    mode: elements.mode.value,
    url: elements.url.value,
    pageId: elements.page.value,
    maxOutputChars: Number(elements.cap.value),
    queries: [
      ...(elements.queryA.checked ? ['cache policy'] : []),
      ...(elements.queryB.checked ? ['prompt caching'] : []),
    ],
    maxResults: Number(elements.maxResults.value),
    failSecondQuery: elements.failSecond.checked,
  })

  const rebuild = () => {
    try {
      const input = currentInputs()
      const isFetch = input.mode === 'fetch'
      elements.fetchPanel.hidden = !isFetch
      elements.searchPanel.hidden = isFetch
      elements.sourcesList.hidden = isFetch

      const model = isFetch ? buildWebFetchModel(input) : buildWebSearchModel(input)
      const verdict = evaluateWebToolOracle(model)

      renderSteps(model, elements.pipeline)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      if (!model.ok) {
        elements.errorBox.hidden = false
        writeText(elements.errorBox, model.error.kind + ': ' + model.error.message)
        writeText(elements.textOut, '')
        elements.textOut.hidden = true
        writeText(elements.textNote, '管线在入口或执行处停下：没有可展示的模型可见文本。')
        writeText(elements.metaOut, '—')
        writeText(elements.stages, String(model.steps.length))
        writeText(elements.outcomeMetric, '失败')
        writeText(elements.truncated, '—')
      } else {
        elements.errorBox.hidden = true
        writeText(elements.errorBox, '')
        elements.textOut.hidden = false
        writeText(elements.textOut, model.text)
        elements.textNote.textContent = isFetch
          ? '上面是 tool/result 里面向模型的完整文本；首行头部 + 渲染正文 + （命中时）脚注。'
          : '单查询时 provider 结果原样返回；多查询经轮转合并、去重并封顶。'
        writeText(elements.metaOut, JSON.stringify(model.meta))
        writeText(elements.stages, String(model.observations.stages))
        writeText(elements.outcomeMetric, isFetch ? `HTTP ${String(model.meta.statusCode)}` : `${String(model.sources.length)} 个来源`)
        writeText(elements.truncated, String(model.meta.truncated))

        if (!isFetch) {
          elements.sourcesList.replaceChildren()
          for (const [index, source] of model.sources.entries()) {
            const item = document.createElement('li')
            item.className = 'wt-source'
            const rank = document.createElement('span')
            rank.className = 'tj-view-chip'
            writeText(rank, '#' + String(index + 1))
            const link = document.createElement('code')
            writeText(link, source.url)
            const title = document.createElement('small')
            writeText(title, source.title + '——' + source.snippet)
            item.append(rank, link, title)
            elements.sourcesList.append(item)
          }
        }
      }
      persistState()
    } catch (error) {
      console.error('[web-tool] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  function persistState() {
    // 本页输入含自由文本 URL 与多选查询，状态留在页面内存即可；
    // 教学重点是即时重算，不是分享固定输入。
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.mode.addEventListener('change', rebuild)
  elements.url.addEventListener('input', rebuild)
  elements.page.addEventListener('change', rebuild)
  elements.cap.addEventListener('input', () => {
    writeText(elements.capOutput, elements.cap.value)
    rebuild()
  })
  for (const control of [elements.queryA, elements.queryB, elements.failSecond]) {
    control.addEventListener('change', rebuild)
  }
  elements.maxResults.addEventListener('input', () => {
    writeText(elements.maxResultsOutput, elements.maxResults.value)
    rebuild()
  })

  writeText(elements.capOutput, elements.cap.value)
  writeText(elements.maxResultsOutput, elements.maxResults.value)
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'meta-carried',
    explain: {
      'meta-carried': '正确。truncated 是渲染文本反映的「有效截断」，客户端无法自己重算（不知道部署的输出帽），所以放进 meta 随日志重放。',
      'reparse-header': '头部只有 URL 和状态码：从文本重新推断截断要复刻整条封顶规则，还要知道部署配置。',
      'always-false': 'provider、源码切割、超帽三个来源都会让它变真——恒假会让卡片和文本各说各话。',
    },
  })
}
