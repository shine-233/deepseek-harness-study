/**
 * provider-lab 实验页的渲染层。模型在 provider-model.js；本文件只画返回值。
 * 三面板模式切换：选择策略 / 归一化矩阵 / fetch 卫生。
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
  PROVIDER_IDS,
  buildFetchHygieneModel,
  buildNormalizationModel,
  buildProviderSelectionModel,
  evaluateProviderOracle,
} from './provider-model.js'

const PROVIDER_SHORT = {
  'web-search-deepseek': 'DeepSeek',
  'web-search-exa': 'Exa',
  'web-search-perplexity': 'Perplexity',
}

function initializePage() {
  const elements = {
    form: document.querySelector('#prov-form'),
    mode: document.querySelector('#prov-mode'),
    panelSelection: document.querySelector('#panel-selection'),
    panelNormalize: document.querySelector('#panel-normalize'),
    panelHygiene: document.querySelector('#panel-hygiene'),
    configured: document.querySelector('#sel-configured'),
    regDeepseek: document.querySelector('#reg-deepseek'),
    regExa: document.querySelector('#reg-exa'),
    regPx: document.querySelector('#reg-px'),
    normProvider: document.querySelector('#norm-provider'),
    normMax: document.querySelector('#norm-max'),
    normNoBlocks: document.querySelector('#norm-no-blocks'),
    hygieneUrls: document.querySelector('#hyg-urls'),
    feedback: document.querySelector('#prov-feedback'),
    decisionOut: document.querySelector('#sel-decision'),
    availList: document.querySelector('#sel-avail'),
    pipeline: document.querySelector('#sel-pipeline'),
    wireShape: document.querySelector('#norm-wire-shape'),
    rawList: document.querySelector('#norm-raw'),
    normList: document.querySelector('#norm-result'),
    strictNote: document.querySelector('#norm-strict'),
    hygList: document.querySelector('#hyg-verdicts'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    outcome: document.querySelector('#metric-outcome'),
    code: document.querySelector('#metric-code'),
    kept: document.querySelector('#metric-kept'),
    truncatedMetric: document.querySelector('#metric-truncated'),
    oracle: document.querySelector('#metric-oracle'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const optionSpec of [[null, '（未配置——走自动选择）'], ...PROVIDER_IDS.map(id => [id, id])]) {
    const option = document.createElement('option')
    option.value = optionSpec[0] ?? ''
    option.textContent = optionSpec[1]
    elements.configured.append(option)
  }
  for (const id of PROVIDER_IDS) {
    const option = document.createElement('option')
    option.value = id
    option.textContent = PROVIDER_SHORT[id]
    elements.normProvider.append(option)
  }

  const rebuild = () => {
    try {
      const mode = elements.mode.value
      elements.panelSelection.hidden = mode !== 'selection'
      elements.panelNormalize.hidden = mode !== 'normalization'
      elements.panelHygiene.hidden = mode !== 'fetch-hygiene'

      let model
      if (mode === 'selection') {
        model = buildProviderSelectionModel({
          configured: elements.configured.value === '' ? null : elements.configured.value,
          registered: {
            'web-search-deepseek': elements.regDeepseek.checked,
            'web-search-exa': elements.regExa.checked,
            'web-search-perplexity': elements.regPx.checked,
          },
        })
      } else if (mode === 'normalization') {
        model = buildNormalizationModel({
          providerId: elements.normProvider.value,
          maxResults: Number(elements.normMax.value),
          deepseekNoBlocks: elements.normNoBlocks.checked,
        })
      } else {
        model = buildFetchHygieneModel({
          urls: elements.hygieneUrls.value.split('\n').map(line => line.trim()).filter(Boolean),
        })
      }
      const verdict = evaluateProviderOracle(model)

      elements.pipeline.replaceChildren()
      if (model.steps !== undefined) {
        for (const step of model.steps) {
          const chip = document.createElement('span')
          chip.className = 'fe-stage ' + (step.ok ? 'is-ok' : 'is-fail')
          chip.setAttribute('data-reveal', '')
          const name = document.createElement('strong')
          writeText(name, step.stage)
          const detail = document.createElement('small')
          writeText(detail, step.detail)
          chip.append(name, detail)
          elements.pipeline.append(chip)
        }
        revealSafe(elements.pipeline)
      }

      if (mode === 'selection') {
        writeText(elements.decisionOut, model.decision.action === 'run'
          ? `运行 ${String(model.decision.provider)}`
          : `${String(model.decision.code)}：${String(model.decision.detail)}`)
        elements.availList.replaceChildren()
        for (const note of model.availabilityNotes) {
          const li = document.createElement('li')
          li.className = 'wt-source'
          li.textContent = `${note.id} — 已注册:${note.registered ? '是' : '否'} · ${note.note}`
          elements.availList.append(li)
        }
        writeText(elements.outcome, model.decision.action === 'run' ? '执行' : '抛错')
        writeText(elements.code, String(model.decision.code ?? '—'))
      } else if (mode === 'normalization') {
        writeText(elements.wireShape, model.failed
          ? '（严格模式触发，未进入映射）'
          : `原始线形状：${model.wireShape}${model.strictNote !== null ? ` · ${model.strictNote}` : ''}`)
        elements.rawList.replaceChildren()
        if (!model.failed) {
          for (const source of model.rawSources) {
            const li = document.createElement('li')
            li.className = 'wt-source'
            li.textContent = JSON.stringify(source)
            elements.rawList.append(li)
          }
        }
        elements.normList.replaceChildren()
        if (!model.failed) {
          for (const source of model.normalized) {
            const li = document.createElement('li')
            li.className = 'wt-source'
            li.textContent = JSON.stringify(source)
            elements.normList.append(li)
          }
        }
        writeText(elements.strictNote, model.failed
          ? model.errorDetail
          : (model.seamTruncation.truncated
            ? `缝隙裁剪：丢弃 ${String(model.seamTruncation.dropped)} 条并置 truncated=true`
            : '未触发截断'))
        writeText(elements.kept, model.failed ? '—' : String(model.observations.sourcesKept))
        writeText(elements.truncatedMetric, model.failed ? '—' : String(model.observations.truncated))
        writeText(elements.outcome, model.failed ? 'WEB_PROVIDER_ERROR' : '归一化完成')
        writeText(elements.code, model.failed ? String(model.errorCode) : '—')
      } else {
        elements.hygList.replaceChildren()
        for (const verdict of model.verdicts) {
          const li = document.createElement('li')
          li.className = 'wt-source'
          li.textContent = `${verdict.url} → ${verdict.code}（${verdict.detail}）`
          elements.hygList.append(li)
        }
        writeText(elements.outcome, `${String(model.observations.passed)} 过 / ${String(model.observations.blocked)} 拦 / ${String(model.observations.invalid)} 无效`)
        writeText(elements.code, '—')
      }

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      setFeedback(`已推演：${mode}。`, 'success')
    } catch (error) {
      console.error('[provider] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  function revealSafe(target) {
    import('./study-lab-reveal.js').then(module => module.revealOnScroll(target)).catch(() => {})
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.mode.addEventListener('change', rebuild)
  for (const control of [elements.configured, elements.regDeepseek, elements.regExa, elements.regPx, elements.normProvider, elements.normNoBlocks]) {
    control.addEventListener('change', rebuild)
  }
  elements.normMax.addEventListener('input', rebuild)
  elements.hygieneUrls.addEventListener('input', rebuild)

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
    // 选择策略模型自带 steps；归一化与 fetch 卫生由载荷/判定枚举成轨迹。
    const selectionTrace = input => buildProviderSelectionModel(input).steps.map((step, index) => ({
      lane: '选择策略', phase: step.stage, index, detail: step.detail,
    }))
    const normTrace = input => {
      const model = buildNormalizationModel(input)
      const steps = model.rawSources.map((raw, index) => ({
        lane: '归一化', phase: model.providerId, index,
        detail: `${raw.url}：原始载荷重排为「url 必填，title/snippet/publishedAt 可选」的统一形状`,
      }))
      steps.push({
        lane: '出口', phase: 'cap', index: steps.length,
        detail: `maxResults=${String(model.input.maxResults)}：出口保留 ${String(model.normalized.length)} 条${model.strictTriggered ? '（deepseek 无 blocks 触发 strict 处理）' : ''}`,
      })
      return steps
    }
    const hygieneTrace = input => buildFetchHygieneModel(input).verdicts.map((verdict, index) => ({
      lane: 'URL 校验', phase: verdict.code, index, detail: `${verdict.url}：${verdict.detail}`,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'provider-ladder',
      rungs: replayRungs([
        {
          title: '选择 = 配置声明 × 注册表实况',
          text: '配置说「我要用谁」，注册表的 available() 说「谁能用」。两者对不上时给出明确错误码——选择永不依赖注册顺序或 HMR 时序。',
          traces: [
            { id: 'ok', label: '配置命中', steps: selectionTrace({ configured: 'web-search-exa', registered: { 'web-search-exa': true } }) },
            { id: 'missing', label: '配置了但没注册', steps: selectionTrace({ configured: 'web-search-perplexity', registered: {} }), focusPhases: ['执行'] },
          ],
        },
        {
          title: '归一化矩阵：三种载荷进同一个 sources 出口',
          text: '三家 provider 的返回字段各不相同，出口只有一个统一形状。maxResults 在出口截断；deepseek 无 blocks 时触发 strict 处理。',
          traces: [{ id: 'norm', label: 'exa 载荷', steps: normTrace({ providerId: 'web-search-exa', maxResults: 5 }) }],
        },
        {
          title: 'fetch 卫生：校验发生在请求之前',
          text: '协议不认识的 scheme 直接判无效；明文 http 放行但附生产建议。校验是纯函数——URL 进、结论出，不发任何网络请求。',
          traces: [{
            id: 'hygiene',
            label: '三种 URL',
            steps: hygieneTrace({ urls: ['https://ok.example.com/a', 'http://plain.example.com/b', 'ftp://odd/x'] }),
          }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'ambiguous-explicit',
    explain: {
      'first-wins-registration': '选择永不依赖注册顺序：按顺序猜会破坏「同一输入同一决定」。',
      'ambiguous-explicit': '正确。多个可用者必须由配置显式点名，否则 WEB_PROVIDER_AMBIGUOUS。',
      'merge-all': '合并三家会把延迟和账单都乘三；缝隙要求恰好一个执行者。',
    },
  })
}
