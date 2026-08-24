import { buildSpillModel, evaluateSpillOracle, SPILL_LIMITS } from './spill-model.js'
import { makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  resultBytes: { integerRange: [SPILL_LIMITS.resultBytes.min, SPILL_LIMITS.resultBytes.max] },
  maxInlineBytes: { integerRange: [SPILL_LIMITS.maxInlineBytes.min, SPILL_LIMITS.maxInlineBytes.max] },
  unset: { boolean: true },
  read: { boolean: true },
  backend: { boolean: true },
  plain: { boolean: true },
}

function initializePage() {
  const el = {
    form: document.querySelector('#spill-form'),
    bytes: document.querySelector('#sp-bytes'),
    bytesOut: document.querySelector('#sp-bytes-output'),
    cap: document.querySelector('#sp-cap'),
    capOut: document.querySelector('#sp-cap-output'),
    unset: document.querySelector('#sp-unset'),
    read: document.querySelector('#sp-read'),
    backend: document.querySelector('#sp-backend'),
    plain: document.querySelector('#sp-plain'),
    feedback: document.querySelector('#spill-feedback'),
    plot: document.querySelector('#spill-plot'),
    note: document.querySelector('#spill-note'),
    shape: document.querySelector('#metric-shape'),
    mResult: document.querySelector('#metric-result'),
    mInline: document.querySelector('#metric-inline'),
    mArtifact: document.querySelector('#metric-artifact'),
    mLoop: document.querySelector('#metric-loop'),
    oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    stepsBody: document.querySelector('#sp-steps-body'),
    caption: document.querySelector('#sp-caption'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        resultBytes: Number(el.bytes.value),
        maxInlineBytes: Number(el.cap.value),
        unset: el.unset.checked,
        read: el.read.checked,
        backend: el.backend.checked,
        plain: el.plain.checked,
      }, STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  // 字节预算图：原始结果一条，替换组成一条；竖线是 cap。
  function renderBudget(model, target) {
    target.replaceChildren()
    const axisMax = Math.max(SPILL_LIMITS.resultBytes.max, model.input.resultBytes)
    const w = 900
    const xFor = bytes => (bytes / axisMax) * (w - 160)
    let y = 30
    const rows = []
    const svg = svgElement('svg', {
      viewBox: `0 0 ${w} ${y + 150}`, role: 'img',
      'aria-labelledby': 'sp-svg-title sp-svg-desc',
    })
    svg.append(svgElement('title', { id: 'sp-svg-title' }, '工具结果的字节预算图'))
    svg.append(svgElement('desc', { id: 'sp-svg-desc' },
      `结果 ${model.observations.resultBytes} 字节；cap ${model.input.configured ? model.observations.maxInlineBytes : '未配置'}。`))

    const barRow = (label, segments, yPos) => {
      svg.append(svgElement('text', { x: 8, y: yPos + 16, class: 'axis' }, label))
      let cursor = 0
      for (const seg of segments) {
        if (seg.bytes <= 0) continue
        const rect = svgElement('rect', {
          x: 150 + xFor(cursor), y: yPos, width: Math.max(xFor(seg.bytes), 2), height: 26,
          class: seg.cls, rx: 3, 'data-reveal': '',
        })
        rect.append(svgElement('title', {}, `${seg.label}：${seg.bytes} 字节`))
        svg.append(rect)
        cursor += seg.bytes
      }
    }
    rows.push(y)

    barRow('原始结果', [{ bytes: model.observations.resultBytes, label: '完整文本', cls: 'sp-raw' }], y)
    y += 52

    if (model.input.configured) {
      const capX = 150 + xFor(model.observations.maxInlineBytes)
      svg.append(
        svgElement('line', { x1: capX, y1: y - 26, x2: capX, y2: y + 96, class: 'cap-line' }),
        svgElement('text', { x: capX + 5, y: y - 30, class: 'cap-label' }, 'cap ' + String(model.observations.maxInlineBytes)),
      )
    }
    if (model.observations.spilled) {
      const p = model.observations.preview
      barRow('模型看到', [
        { bytes: p.headBytes, label: 'head 预览', cls: 'sp-head' },
        { bytes: model.observations.resultBytes - p.headBytes - p.tailBytes, label: '省略→工件', cls: 'sp-omit' },
        { bytes: p.tailBytes, label: 'tail 预览', cls: 'sp-tail' },
        { bytes: p.noticeBytes, label: '定位符提示', cls: 'sp-notice' },
      ], y)
      y += 52
      barRow('溢出工件', [{ bytes: model.observations.savedFullBytes ?? 0, label: '完整文本（逐字保留）', cls: 'sp-artifact' }], y)
      y += 40
    } else {
      barRow('模型看到', [{ bytes: model.observations.replacementBytes, label: '原样进入上下文', cls: 'sp-raw' }], y)
      y += 52
    }

    svg.setAttribute('viewBox', `0 0 ${w} ${y + 10}`)
    target.append(svg)
    revealOnScroll(target)
  }

  function rebuild() {
    try {
      const model = buildSpillModel({
        resultBytes: Number(el.bytes.value),
        maxInlineBytes: Number(el.cap.value),
        configured: !el.unset.checked,
        isReadTool: el.read.checked,
        hasBackend: el.backend.checked,
        plainText: el.plain.checked,
      })
      const verdict = evaluateSpillOracle(model)
      renderBudget(model, el.plot)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.stepsBody, model.steps.map((s, i) => ({
        key: String(i),
        state: s.phase === 'save-full' ? 'ok' : s.phase.startsWith('best') ? 'fail' : 'plain',
        cells: [String(i), s.lane, s.phase, s.detail],
      })))
      writeText(el.caption, '当前输入的 ' + String(model.steps.length) + ' 步')
      writeText(el.shape, model.observations.forkShape)
      writeText(el.mResult, String(model.observations.resultBytes))
      writeText(el.mInline, String(model.observations.replacementBytes))
      writeText(el.mArtifact, model.observations.spilled ? String(model.observations.savedFullBytes) : '—')
      writeText(el.mLoop, model.observations.loopPrevented ? '已预防' : '未触发场景')
      fb(model.observations.spilled
        ? '已转储：全文进工件，模型拿到预算内的预览加定位符。'
        : '未转储：结果按规则原样进入上下文。', 'success')
      persistState()
    } catch (e) {
      console.error('[spill]', e)
      fb(e instanceof Error ? e.message : '输入无效。', 'error')
    }
  }

  for (const c of [el.bytes, el.cap, el.unset, el.read, el.backend, el.plain]) {
    c.addEventListener('input', rebuild)
    c.addEventListener('change', rebuild)
  }
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.bytes.value = String(restored.value.resultBytes)
    el.cap.value = String(restored.value.maxInlineBytes)
    el.unset.checked = restored.value.unset
    el.read.checked = restored.value.read
    el.backend.checked = restored.value.backend
    el.plain.checked = restored.value.plain
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'exempt',
    explain: {
      exempt: 'READ_EXEMPT 校验钉住了它：read 由模型侧豁免——否则 read 会把巨大的日志读回来，再触发一次转储。',
      spilled: '那是没有豁免时的行为；对 read 这条臂被跳过，避免转储循环。',
      truncated: '截断不是这里的机制：要么原样、要么预览加定位符。',
    },
    hint: '线索：上游为什么专门写了一条「read → spill → read again」的循环防护？',
  })
}
