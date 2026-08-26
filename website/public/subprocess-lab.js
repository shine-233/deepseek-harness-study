import { buildSubprocessModel, evaluateSubprocessOracle, SP_LIMITS } from './subprocess-model.js'
import { makeFeedback, renderBoundary, renderOracle, requireElements,
  svgElement, writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const STATE_SCHEMA = {
  outputBytes: { integerRange: [SP_LIMITS.outputBytes.min, SP_LIMITS.outputBytes.max] },
  maxBytes: { integerRange: [SP_LIMITS.maxBytes.min, SP_LIMITS.maxBytes.max] },
  spillEnabled: { boolean: true },
  spillCapBytes: { integerRange: [500, 8000] },
  stdinMode: { enum: ['ignore', 'pipe', 'data'] },
}

function initializePage() {
  const el = {
    form: document.querySelector('#subprocess-form'),
    bytes: document.querySelector('#spx-bytes'), bytesOut: document.querySelector('#spx-bytes-output'),
    cap: document.querySelector('#spx-cap'), capOut: document.querySelector('#spx-cap-output'),
    stdin: document.querySelector('#spx-stdin'),
    spill: document.querySelector('#spx-spill'),
    spillCap: document.querySelector('#spx-spillcap'), spillCapOut: document.querySelector('#spx-spillcap-output'),
    feedback: document.querySelector('#subprocess-feedback'),
    plot: document.querySelector('#spx-plot'), note: document.querySelector('#spx-note'),
    shape: document.querySelector('#metric-shape'), mOut: document.querySelector('#metric-out'),
    mKept: document.querySelector('#metric-kept'), mDropped: document.querySelector('#metric-dropped'),
    mSpill: document.querySelector('#metric-spill'), oracleBadge: document.querySelector('#metric-oracle'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'), cannotProve: document.querySelector('#cannot-prove-list'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        outputBytes: Number(el.bytes.value), maxBytes: Number(el.cap.value),
        spillEnabled: el.spill.checked, spillCapBytes: Number(el.spillCap.value),
        stdinMode: el.stdin.value,
      }, STATE_SCHEMA))
    } catch { /* file:// 下可能被拒；只影响地址栏。 */ }
  }

  function renderBudget(model) {
    el.plot.replaceChildren()
    const axisMax = Math.max(SP_LIMITS.outputBytes.max, model.observations.outputBytes)
    const w = 900
    const xFor = b => (b / axisMax) * (w - 170)
    const svg = svgElement('svg', { viewBox: `0 0 ${w} ${model.observations.truncated ? 190 : 130}`,
      role: 'img', 'aria-labelledby': 'sp-x-title sp-x-desc' })
    svg.append(svgElement('title', { id: 'sp-x-title' }, '子进程输出的字节去向'))
    svg.append(svgElement('desc', { id: 'sp-x-desc' },
      `原始 ${model.observations.outputBytes} 字节；TAIL ${model.observations.keptBytes}、丢弃 ${model.observations.droppedBytes}。`))
    let y = 30
    const row = (label, segs, yPos) => {
      svg.append(svgElement('text', { x: 8, y: yPos + 16, class: 'axis' }, label))
      let cursor = 0
      for (const s of segs) {
        if (s.bytes <= 0) continue
        const r = svgElement('rect', { x: 150 + xFor(cursor), y: yPos, width: Math.max(xFor(s.bytes), 2), height: 26,
          class: s.cls, rx: 3, 'data-reveal': '' })
        r.append(svgElement('title', {}, `${s.label}：${s.bytes} 字节`))
        svg.append(r)
        cursor += s.bytes
      }
    }
    row('原始输出', [{ bytes: model.observations.outputBytes, label: '完整流', cls: 'sp2-raw' }], y)
    if (!model.input.spillEnabled && !model.observations.truncated) {
      const capX = 150 + xFor(model.observations.maxBytes)
      svg.append(svgElement('line', { x1: capX, y1: y - 8, x2: capX, y2: y + 60, class: 'cap-line' }),
        svgElement('text', { x: capX + 5, y: y - 10, class: 'cap-label' }, 'maxBytes'))
    }
    y += 52
    if (model.observations.truncated) {
      row('内存 TAIL', [{ bytes: model.observations.keptBytes, label: '保留的尾部', cls: 'sp2-kept' }], y)
      y += 44
      row('丢弃头部', [{ bytes: model.observations.droppedBytes, label: '被丢弃', cls: 'sp2-drop' }], y)
      y += 52
      if (model.input.spillEnabled) {
        const saved = model.steps.some(s => s.phase === 'spill-saved')
        row('溢出工件', [{ bytes: saved ? model.observations.outputBytes : 0,
          label: saved ? '完整可恢复' : '超限已丢弃（不假装存在）', cls: saved ? 'sp2-artifact' : 'sp2-drop' }], y)
        y += 46
      }
    }
    svg.setAttribute('viewBox', `0 0 ${w} ${y + 6}`)
    el.plot.append(svg)
    revealOnScroll(el.plot)
  }

  function rebuild() {
    try {
      const model = buildSubprocessModel({
        outputBytes: Number(el.bytes.value), maxBytes: Number(el.cap.value),
        spillEnabled: el.spill.checked, spillCapBytes: Number(el.spillCap.value),
        stdinMode: el.stdin.value,
      })
      const verdict = evaluateSubprocessOracle(model)
      renderBudget(model)
      renderOracle(verdict, el.oracleList, el.oracleBadge)
      renderBoundary(model, el.canProve, el.cannotProve)
      writeText(el.bytesOut, String(model.observations.outputBytes))
      writeText(el.capOut, String(model.observations.maxBytes))
      writeText(el.spillCapOut, String(model.input.spillCapBytes))
      writeText(el.shape, model.observations.truncated ? '截断：TAIL 进内存' : '完整收集')
      writeText(el.mOut, String(model.observations.outputBytes))
      writeText(el.mKept, String(model.observations.keptBytes))
      writeText(el.mDropped, String(model.observations.droppedBytes))
      writeText(el.mSpill, model.observations.spillState)
      fb(model.observations.truncated ? '溢出：TAIL 已保留，头部按 spill 策略处置。' : '未超限：完整输出进内存。', 'success')
      persistState()
    } catch (e) { console.error('[subprocess]', e); fb(e instanceof Error ? e.message : '输入无效。', 'error') }
  }

  for (const c of [el.bytes, el.cap, el.spill, el.spillCap]) c.addEventListener('input', rebuild)
  el.stdin.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })

  const r = readStateFromHash(location.hash, STATE_SCHEMA)
  if (r !== null && r.ok) {
    el.bytes.value = String(r.value.outputBytes); el.cap.value = String(r.value.maxBytes)
    el.spill.checked = r.value.spillEnabled; el.spillCap.value = String(r.value.spillCapBytes)
    el.stdin.value = r.value.stdinMode
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))
  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    const trace = input => buildSubprocessModel(input).steps.map(step => ({
      lane: step.lane, phase: step.phase, detail: step.detail, index: step.index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'subprocess-ladder',
      rungs: replayRungs([
        {
          title: '一次受管的子进程执行',
          text: '请求里显式声明 stdin 策略和输出上限；缝把 DSH_ 前缀的管理变量注入环境后再执行。尾部输出被收集回来，调用方环境不被污染。',
          traces: [{ id: 'basic', label: '默认输入', steps: trace({}) }],
        },
        {
          title: '超限截断：模型读到尾部，全文落成工件',
          text: '输出超过 maxBytes 时只保留尾部视图，完整流写入 spill 文件。模型看到的是「截断后的尾巴＋工件引用」，不是全部原文。',
          traces: [{ id: 'spill', label: '3000 字节 / 上限 200', steps: trace({ outputBytes: 3000, maxBytes: 200, spillEnabled: true }), focusPhases: ['tail-collected', 'spill-saved'] }],
        },
        {
          title: 'stdin 三种处置，全在请求里声明',
          text: '忽略时接到 /dev/null，pipe 把写端交给调用方交互，data 写入给定字节后立即关闭。缝不做猜测：stdin 怎么处置由请求显式说出。',
          traces: [
            { id: 'ignore', label: 'ignore', steps: trace({ stdinMode: 'ignore' }) },
            { id: 'pipe', label: 'pipe', steps: trace({ stdinMode: 'pipe' }) },
            { id: 'data', label: 'data', steps: trace({ stdinMode: 'data' }) },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'tail-only',
    explain: {
      'tail-only': '守恒校验钉住了它：流比 spill 上限还大时不完整的 spill 直接丢弃，只剩 TAIL。',
      'full-spill': '那要求流不超过 spill 上限——1000 > 500 时假装完整才是真正的错误。',
      head: '方向反了：截断丢的是头部，诊断要的是最后一段。',
    },
    hint: '线索：为什么默认保留 TAIL 而不是 HEAD？语言服务器崩溃时哪段最有用？',
  })
}
