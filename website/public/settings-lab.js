import { buildSettingsModel, evaluateSettingsOracle, SETTINGS_LANES } from './settings-model.js'
import { makeFeedback, renderBoundary, renderOracle, renderRows, requireElements,
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
  namespace: { enum: ['model', 'tools', 'approval'] },
  action: { enum: ['write', 'external-edit'] },
}

function initializePage() {
  const el = {
    form: document.querySelector('#settings-form'),
    namespace: document.querySelector('#namespace'),
    action: document.querySelector('#action'),
    copyLink: document.querySelector('#copy-state-link'),
    feedback: document.querySelector('#settings-feedback'),
    flow: document.querySelector('#settings-plot'),
    note: document.querySelector('#settings-note'),
    tableBody: document.querySelector('#settings-table-body'),
    oracleList: document.querySelector('#oracle-list'),
    oracle: document.querySelector('#metric-oracle'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    mAction: document.querySelector('#metric-action'),
    mLock: document.querySelector('#metric-lock'),
    mHot: document.querySelector('#metric-hot'),
    mReread: document.querySelector('#metric-reread'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(el)) return
  const fb = makeFeedback(el.feedback)

  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        namespace: el.namespace.value,
        action: el.action.value,
      }, STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  function rebuild() {
    try {
      const model = buildSettingsModel({ namespace: el.namespace.value, action: el.action.value })
      const verdict = evaluateSettingsOracle(model)
      renderFlow(model, el.flow)
      renderOracle(verdict, el.oracleList, el.oracle)
      renderBoundary(model, el.canProve, el.cannotProve)
      renderRows(el.tableBody, model.steps.map((s, i) => ({
        key: String(i), state: s.phase === 'hot-publish' ? 'hot' : 'plain',
        cells: [String(i), s.lane, s.phase, s.detail],
      })))
      const rereadStep = [...model.steps].reverse().find(s => s.phase === 're-read')
      writeText(el.mAction, model.input.action === 'external-edit' ? '外部编辑' : '经缝写入')
      writeText(el.mLock, model.observations.writeLockAcquired ? '获取并释放' : '未经过（外部编辑）')
      writeText(el.mHot, model.observations.hotPublished ? '已触发' : '未触发')
      writeText(el.mReread, rereadStep ? rereadStep.detail.replace('重新读取：', '') : '—')
      fb(model.input.action === 'external-edit'
        ? '外部编辑经 fs 监听器汇入同一条热发布路径，本进程无需重启。'
        : '写入完成并热发布；订阅者拿到的文档已是新值。', 'success')
      persistState()
    } catch (e) { console.error('[settings]', e); fb(e.message, 'error') }
  }

  function renderFlow(model, target) {
    target.replaceChildren()
    const lh = 58, top = 34, left = 110
    const w = Math.max(900, left + model.steps.length * 80 + 24)
    const h = top + SETTINGS_LANES.length * lh + 42
    const svg = svgElement('svg', {
      viewBox: `0 0 ${w} ${h}`, role: 'img',
      'aria-labelledby': 'st-svg-title st-svg-desc',
    })
    svg.append(svgElement('title', { id: 'st-svg-title' }, '文件设置热发布的有序步骤'))
    svg.append(svgElement('desc', { id: 'st-svg-desc' },
      `命名空间 ${model.input.namespace}，动作 ${model.input.action}，共 ${model.steps.length} 步`))
    for (const lane of SETTINGS_LANES) {
      const y = top + SETTINGS_LANES.indexOf(lane) * lh + lh / 2
      svg.append(
        svgElement('text', { x: left - 14, y: y + 5, class: 'axis', 'text-anchor': 'end' }, lane),
        svgElement('line', { x1: left, y1: y, x2: w - 18, y2: y, class: 'grid' }),
      )
    }
    for (const [i, s] of model.steps.entries()) {
      const cls = ['st-dot']
      if (s.phase === 'hot-publish') cls.push('is-hot')
      if (s.phase === 'lock') cls.push('is-lock')
      if (s.phase === 'ext-edit') cls.push('is-ext')
      const dot = svgElement('circle', {
        cx: left + i * 80 + 30, cy: top + SETTINGS_LANES.indexOf(s.lane) * lh + lh / 2,
        r: 9, class: cls.join(' '), 'data-reveal': '', 'data-step': String(i),
      })
      dot.append(svgElement('title', {}, `${i} ${s.phase}: ${s.detail}`))
      svg.append(dot)
    }
    target.append(svg); revealOnScroll(target)
    writeText(el.note, model.observations.hotPublished
      ? '热发布已触发：订阅者无需重启即看到新值。'
      : '热发布未触发——这不合预期，请检查输入。')
  }

  el.form.addEventListener('submit', e => { e.preventDefault(); rebuild() })
  for (const c of [el.namespace, el.action]) c.addEventListener('change', rebuild)
  installInputReset(el.resetInputs, el.form, { onReset: rebuild })
  el.copyLink.addEventListener('click', async () => {
    persistState()
    try {
      await navigator.clipboard.writeText(location.href)
      fb('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      fb('复制失败：手动复制地址栏里的整条链接即可，状态就在 #state= 后面。', 'error')
    }
  })

  const restored = readStateFromHash(location.hash, STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    el.namespace.value = restored.value.namespace
    el.action.value = restored.value.action
  }
  rebuild()
}

if (typeof document !== 'undefined') {
  initializePage(); installDeclaredIcons(); installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), n => icon(n, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    const trace = input => buildSettingsModel(input).steps.map((step, index) => ({
      lane: step.lane, phase: step.phase, detail: step.detail, index,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'settings-ladder',
      rungs: replayRungs([
        {
          title: '写路径：写入锁 → 缝 → 热发布',
          text: '每次写都先拿写入锁，经缝落盘后立刻热发布给所有订阅者。改完重新读取就是新值——本进程不需要重启。',
          traces: [{ id: 'write', label: '经缝写入', steps: trace({ namespace: 'model', action: 'write' }), focusPhases: ['lock', 'hot-publish'] }],
        },
        {
          title: '外部编辑走同一条热发布路',
          text: '另一个进程直接改了文件：fs 监听器触发，缝收到新文档再热发布。共享同一个 harness home 时，对方的保存就是本进程的外部编辑。',
          traces: [{ id: 'external', label: '外部编辑', steps: trace({ namespace: 'model', action: 'external-edit', externalEditValue: { maxTurns: 12 } }), focusPhases: ['ext-edit', 'hot-publish'] }],
        },
        {
          title: '一份文档，各命名空间互不打扰',
          text: '一个 YAML/JSON 文件承载全部命名空间段落，每次推演只读写自己那一段。approval 段的读取里看不到 model 段的任何变更。',
          traces: [{ id: 'isolation', label: 'approval 段', steps: trace({ namespace: 'approval', action: 'write' }) }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'hot-publish',
    explain: {
      'hot-publish': 'HOT_PUBLISH 校验钉住了它：fs 监听器触发 → 缝收到新文档 → 热发布。',
      restart: '那是另一种设计——DSH 的缝让热发布成为默认行为。',
      polling: '轮询也能做到，但 DSH 没选它：fs 监听器把变更推给缝，不需要等下一次重读。',
    },
    hint: '线索：看「热发布」泳道——它在外部编辑后有没有活动。',
  })
}
