/**
 * 六个小缝实验页的共享运行时。
 *
 * 每个页面用 <script type="module" src="./small-seams-runtime.js"
 * data-lab="<id>"></script> 引入本模块；差异全部在 small-seams-configs.js 里。
 * 行为：预测门 → 控件读取 → 纯模型重建 → 指标/步骤表/oracle/边界渲染 → hash 持久化。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  writeText,
  installDeclaredIcons,
  installScrollProgress,
} from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'
import { SMALL_SEAMS_LABS } from './small-seams-configs.js'

/**
 * 启动一个小缝实验页：按 id 取配置，回填外壳、构建控件并接线。
 * 由各页的 <id>-lab.js 存根调用。
 */
export async function bootSmallSeam(labId, gateOverride = {}) {
  const base = SMALL_SEAMS_LABS[labId]
  if (base === undefined) throw new Error('未知的小缝实验：' + String(labId))
  const config = {
    ...base,
    gate: {
      ...base.gate,
      ...(gateOverride.correct !== undefined ? { correct: gateOverride.correct } : {}),
      ...(gateOverride.explain !== undefined ? { explain: gateOverride.explain } : {}),
      ...(gateOverride.hint !== undefined ? { hint: gateOverride.hint } : {}),
    },
  }
  const modelModule = await import(config.modelModule)
  await initializePage(config, modelModule)
}

async function initializePage(config, modelModule) {
  const build = modelModule[config.buildFn]
  const oracle = modelModule[config.oracleFn]

  // 用配置回填外壳文案与链接：单一事实来源在 small-seams-configs.js。
  // writeText 对 null 目标安全跳过（由调用方决定哪些元素必须存在）。
  const safeWrite = (selector, text) => {
    const el = document.querySelector(selector)
    if (el !== null) el.textContent = text
  }
  safeWrite('#ss-eyebrow', config.eyebrow)
  safeWrite('#ss-h1', config.h1)
  safeWrite('#ss-lead', config.lead)
  const warning = document.querySelector('#ss-warning-text')
  if (warning !== null) writeText(warning, config.warning)
  const lessonLink = document.querySelector('#ss-lesson-link')
  if (lessonLink !== null) { lessonLink.href = config.lessonHref; writeText(lessonLink, config.lessonLabel) }
  const siblingLink = document.querySelector('#ss-sibling-link')
  if (siblingLink !== null) { siblingLink.href = config.siblingHref; writeText(siblingLink, config.siblingLabel) }

  // 预测门的问题与三个选项（选项由生成器静态写入；这里只回填问题文案）。
  safeWrite('#gate-question', config.gate.q)

  // 控件按配置构建。
  const form = document.querySelector('#seam-form')
  const controls = []
  for (const control of config.controls) {
    const labelEl = document.createElement('label')
    const span = document.createElement('span')
    let input
    if (control.kind === 'range') {
      input = document.createElement('input')
      input.type = 'range'
      input.min = String(control.min); input.max = String(control.max); input.step = String(control.step); input.value = String(control.value)
      const out = document.createElement('output')
      out.id = 'ctl-' + control.id + '-output'
      out.textContent = String(control.value)
      span.append(control.label + '：', input, out)
      labelEl.append(span)
    } else if (control.kind === 'select') {
      input = document.createElement('select')
      for (const [value, labelText] of control.options) {
        const option = document.createElement('option')
        option.value = value
        option.textContent = labelText
        input.append(option)
      }
      span.textContent = control.label
      labelEl.append(span, input)
    } else {
      input = document.createElement('input')
      input.type = 'checkbox'
      input.checked = control.value === true
      span.textContent = control.label
      labelEl.className = 'sb-check'
      labelEl.append(input, span)
    }
    input.id = 'ctl-' + control.id
    controls.push({ control, node: input })
    form.append(labelEl)
  }
  // range 的输出位补进 span 后面（上面 range 分支已插入）。
  form.insertAdjacentHTML('beforeend',
    '<button class="button button-quiet" type="button" id="reset-inputs">恢复默认输入</button>'
    + '<small>当前选择写在地址栏 #state= 后面：刷新不丢。</small>')

  // 指标格：forkShape 之外逐项建 dd。
  const dl = document.querySelector('dl.metric-grid')
  const extraNodes = {}
  for (const [label, key] of config.metrics.slice(1)) {
    const row = document.createElement('div')
    const dt = document.createElement('dt')
    const dd = document.createElement('dd')
    dd.id = 'metric-' + key
    writeText(dd, '—')
    writeText(dt, label)
    row.append(dt, dd)
    dl.append(row)
    extraNodes[key] = dd
  }
  const oracleRow = document.createElement('div')
  oracleRow.className = 'metric-oracle'
  const odt = document.createElement('dt'); writeText(odt, '独立校验')
  const odd = document.createElement('dd'); odd.id = 'metric-oracle'; writeText(odd, '—')
  oracleRow.append(odt, odd)
  dl.append(oracleRow)

  const elements = {
    form,
    feedback: document.querySelector('#seam-feedback'),
    shape: document.querySelector('#metric-shape'),
    extraNodes,
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stepsBody: document.querySelector('#seam-steps-body'),
    caption: document.querySelector('#seam-caption'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements({
    form: elements.form,
    feedback: elements.feedback,
    shape: elements.shape,
    oracleBadge: elements.oracleBadge,
    oracleList: elements.oracleList,
    canProve: elements.canProve,
    cannotProve: elements.cannotProve,
    stepsBody: elements.stepsBody,
    caption: elements.caption,
    resetInputs: elements.resetInputs,
  })) return
  const fb = makeFeedback(document.querySelector('#seam-feedback'))

  const readInput = () => {
    const input = {}
    for (const { control, node } of controls) {
      if (node.type === 'checkbox') input[control.id] = node.checked
      else if (node.type === 'range') input[control.id] = Number(node.value)
      else input[control.id] = node.value
    }
    return input
  }

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, readInput(), config.stateSchema))
    } catch {
      // file:// 下可能被拒；只影响地址栏整洁度。
    }
  }

  const rebuild = () => {
    try {
      const model = build(readInput())
      const verdict = oracle(model)
      renderOracle(verdict, elements.oracleList, elements.oracleBadge)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      for (const [label, key] of config.metrics) {
        void label
        const raw = model.observations[key]
        const text = typeof raw === 'boolean' ? (raw ? '是' : '否') : String(raw ?? '—')
        if (key === config.metrics[0][1]) writeText(elements.shape, text)
        else if (extraNodes[key] !== undefined) writeText(extraNodes[key], text)
      }

      renderRows(elements.stepsBody, model.steps.map(step => ({
        key: String(step.index),
        state: /reject|crash|parse-fail|limit-rejected|conflict-rejected|nothing-published/.test(step.phase) ? 'fail' : 'plain',
        cells: [String(step.index), step.lane, step.phase, step.detail],
      })))
      writeText(elements.caption, '当前输入的 ' + String(model.steps.length) + ' 步')
      fb(String(model.observations.forkShape), 'success')
      persistState()
    } catch (error) {
      console.error('[' + labId + ']', error)
      fb(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  for (const { node } of controls) {
    node.addEventListener('input', rebuild)
    node.addEventListener('change', rebuild)
  }
  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  const restored = readStateFromHash(location.hash, config.stateSchema)
  if (restored !== null && restored.ok) {
    for (const { control, node } of controls) {
      const value = restored.value[control.id]
      if (value === undefined) continue
      if (node.type === 'checkbox') node.checked = value
      else node.value = String(value)
    }
  }

  rebuild()

  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: config.gate.correct,
    explain: Object.fromEntries(config.gate.options.map(([value]) => [value, config.gate.explain[value] ?? ''])),
    hint: config.gate.hint,
  })
}
