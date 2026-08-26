/**
 * Profile 解析顺序实验页的渲染层。
 *
 * 模型在 profile-loader-model.js；本文件只画返回值。写入矩阵、最终配置表和步骤表读的
 * 是同一次解析结果，所以三者不可能互相矛盾。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { bindAutoAdvance } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  OVERLAY_SOURCES,
  buildProfileModel,
  evaluateProfileOracle,
  snapshotProfileAt,
} from './profile-loader-model.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'

const DEFAULT_ORDER = ['base', 'web-tools', 'shell-tools', 'observability', 'strict-limits']

// 状态链接的输入契约：order 必须是 DEFAULT_ORDER 的一个排列（stringList 先保证
// 条目都认识，排列关系在恢复时单独核对）；overlay 是枚举；broken 是开关。
const PROFILE_STATE_SCHEMA = {
  order: { stringList: DEFAULT_ORDER },
  overlay: { enum: OVERLAY_SOURCES.map(overlay => overlay.id) },
  broken: 'boolean',
  step: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

/**
 * 写入矩阵用 HTML 表格而不是 SVG：它本来就是一张表，用表格能直接获得表头关联、
 * 键盘导航和屏幕阅读器的行列播报，不需要再补 ARIA。
 */
function renderMatrix(model, target, note) {
  target.replaceChildren()
  const table = document.createElement('table')
  table.className = 'write-matrix'
  const caption = document.createElement('caption')
  writeText(caption, '行是解析步骤，列是配置键；实心格是该键的最终写者。')
  table.append(caption)

  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  const corner = document.createElement('th')
  corner.scope = 'col'
  writeText(corner, '步骤')
  headRow.append(corner)
  for (const key of model.keys) {
    const cell = document.createElement('th')
    cell.scope = 'col'
    writeText(cell, key)
    headRow.append(cell)
  }
  head.append(headRow)

  const body = document.createElement('tbody')
  for (const step of model.steps) {
    const row = document.createElement('tr')
    row.dataset.kind = step.kind
    row.dataset.applied = String(step.applied)
    const label = document.createElement('th')
    label.scope = 'row'
    writeText(label, '#' + String(step.index) + ' ' + step.label)
    row.append(label)
    for (const key of model.keys) {
      const cell = document.createElement('td')
      if (!step.applied) {
        cell.dataset.mark = 'not-applied'
        writeText(cell, '—')
        cell.setAttribute('aria-label', key + '：这一步没有应用')
      } else if (step.finalFor.includes(key)) {
        cell.dataset.mark = 'final'
        // 图标只加快扫读；语义由 aria-label 承担，去掉图标信息量不变。
        cell.append(icon('disc', 13))
        cell.setAttribute('aria-label', key + '：这一步是最终写者')
      } else if (step.overriddenFor.includes(key)) {
        cell.dataset.mark = 'overridden'
        cell.append(icon('ring', 13))
        cell.setAttribute('aria-label', key + '：这一步写了但被后面覆盖')
      } else {
        cell.dataset.mark = 'untouched'
        writeText(cell, '')
        cell.setAttribute('aria-label', key + '：这一步没有触及')
      }
      row.append(cell)
    }
    body.append(row)
  }

  table.append(head, body)
  target.append(table)

  const contested = model.observations.contestedKeys
  writeText(note, model.failure !== null
    ? '解析在第 ' + String(model.failure.stepIndex) + ' 步（' + model.failure.source
      + '）停下：' + model.failure.reason + '。后面的步骤一条都没有应用。'
    : contested.length === 0
      ? '本次输入里没有键被写多次，所以顺序不影响结果。把「严格上限」拖到前面就能造出差别。'
      : '被写多次的键有 ' + contested.join('、') + '：只有最后一个写它的步骤决定最终值，'
        + '这就是顺序为什么是配置的一部分。')
}

/**
 * 装配舞台：左列步骤卡、右列配置键，贝塞尔线连「最终写者」，虚线连被覆写的
 * 历史写入者（vasturiano highlight 模式：悬停/聚焦某张卡时只亮它自己的线）。
 * 每步的色相从 --brand 旋转得来——颜色仍然只有一个 token 源。
 */
function renderStage(model, svg, note) {
  if (svg === null) return
  const steps = model.steps
  const keys = model.keys
  const cardW = 196
  const cardH = 50
  const cardGap = 12
  const keyRowH = 34
  const width = 760
  const height = Math.max(steps.length, keys.length) * (cardH + cardGap) + 28

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  svg.setAttribute('width', String(width))
  svg.setAttribute('height', String(height))
  svg.replaceChildren()

  const brand = getComputedStyle(svg).getPropertyValue('--brand').trim() || '#3157c8'
  const hex = brand.replace('#', '')
  const baseHue = (() => {
    const value = parseInt(hex.length === 3 ? hex.split('').map(ch => ch + ch).join('') : hex, 16)
    if (Number.isNaN(value)) return 222
    const r = ((value >> 16) & 255) / 255
    const g = ((value >> 8) & 255) / 255
    const b = (value & 255) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    if (max === min) return 222
    const d = max - min
    let h = 0
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    return ((h * 60) + 360) % 360
  })()
  const stepColor = index => `hsl(${(baseHue + index * 52) % 360} 62% 52%)`

  const failedAt = model.failure === null ? null : model.failure.stepIndex
  const winnerOf = new Map()
  const ghostWriters = new Map()
  for (const step of steps) {
    if (!step.applied) continue
    for (const key of step.finalFor ?? []) winnerOf.set(key, step.index)
    for (const key of step.overriddenFor ?? []) {
      const list = ghostWriters.get(key) ?? []
      list.push(step.index)
      ghostWriters.set(key, list)
    }
  }

  const cardY = index => 10 + index * (cardH + cardGap)
  const keyY = index => 18 + index * keyRowH

  // 线画在卡片下层：先线后卡。
  for (const [keyIndex, key] of keys.entries()) {
    const winner = winnerOf.get(key)
    if (winner !== undefined) {
      const path = svgElement('path', {
        class: 'pl-line',
        'data-from': String(winner),
        d: `M ${cardW + 6} ${cardY(winner) + cardH / 2}`
          + ` C ${cardW + 90} ${cardY(winner) + cardH / 2},`
          + ` ${560 - 90} ${keyY(keyIndex)}, ${556} ${keyY(keyIndex)}`,
      })
      svg.append(path)
    }
    for (const ghost of ghostWriters.get(key) ?? []) {
      const path = svgElement('path', {
        class: 'pl-ghost',
        'data-from': String(ghost),
        d: `M ${cardW + 6} ${cardY(ghost) + cardH / 2}`
          + ` C ${cardW + 70} ${cardY(ghost) + cardH / 2},`
          + ` ${560 - 70} ${keyY(keyIndex)}, ${556} ${keyY(keyIndex)}`,
      })
      svg.append(path)
    }
  }

  for (const [index, step] of steps.entries()) {
    const failed = step.applied === false
    const group = svgElement('g', {
      class: 'pl-card' + (failed ? ' is-failed' : ''),
      tabindex: '0',
      role: 'button',
      'data-step': String(index),
      'aria-label': `${step.label}${failed ? '：失败，' + (step.reason ?? '') : ''}`,
    })
    group.style.transform = `translate(0px, ${cardY(index)}px)`
    group.append(svgElement('rect', {
      x: 4, y: 0, width: cardW, height: cardH, rx: 9,
      class: 'pl-card-box',
    }))
    group.append(svgElement('text', {
      x: 16, y: 20, class: 'pl-card-title',
    }, `${failed ? '✕ ' : `#${index} `}${step.label}`))
    group.append(svgElement('text', {
      x: 16, y: 38, class: 'pl-card-sub',
    }, step.wrote.join('、').slice(0, 26) || '（无写入）'))
    svg.append(group)

    const setHighlight = on => {
      for (const line of svg.querySelectorAll(`.pl-line[data-from="${index}"], .pl-ghost[data-from="${index}"]`)) {
        line.classList.toggle('is-hot', on)
      }
      svg.classList.toggle('is-highlighting', on)
    }
    group.addEventListener('pointerenter', () => setHighlight(true))
    group.addEventListener('pointerleave', () => setHighlight(false))
    group.addEventListener('focus', () => setHighlight(true))
    group.addEventListener('blur', () => setHighlight(false))
  }

  for (const [keyIndex, key] of keys.entries()) {
    const finalEntry = model.observations.finalValues.find(entry => entry.key === key)
    const row = svgElement('g', { class: 'pl-key', 'data-key': key })
    row.style.transform = `translate(0px, ${keyY(keyIndex)}px)`
    row.append(svgElement('rect', {
      x: 556, y: -14, width: width - 562, height: 28, rx: 7, class: 'pl-key-box'
        + (finalEntry?.value == null ? ' is-unset' : ''),
    }))
    row.append(svgElement('text', { x: 568, y: 4, class: 'pl-key-name' },
      finalEntry?.value == null ? `${key}（未声明）` : key))
    if (finalEntry?.value != null) {
      row.append(svgElement('text', { x: width - 12, y: 4, class: 'pl-key-value', 'text-anchor': 'end' },
        `${String(finalEntry.value)} ← ${finalEntry.writtenBy}`))
    }
    svg.append(row)
  }

  writeText(note, model.failure === null
    ? `实线 ${winnerOf.size} 条指向最终值；虚线是被覆写的旧写入。悬停左列卡片只看单步贡献。`
    : `解析在第 ${failedAt + 1} 步失败（${model.failure.reason ?? '原因见上'}），其后所有键保持未声明。`)
}

function initializePage() {
  const elements = {
    form: document.querySelector('#profile-form'),
    orderList: document.querySelector('#order-list'),
    overlay: document.querySelector('#overlay'),
    broken: document.querySelector('#broken'),
    feedback: document.querySelector('#profile-feedback'),
    matrix: document.querySelector('#matrix-plot'),
    matrixNote: document.querySelector('#matrix-note'),
    stage: document.querySelector('#profile-stage'),
    stageNote: document.querySelector('#stage-note'),
    finalBody: document.querySelector('#final-table-body'),
    finalCaption: document.querySelector('#final-caption'),
    stepsBody: document.querySelector('#steps-table-body'),
    stepsCaption: document.querySelector('#steps-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    declared: document.querySelector('#metric-declared'),
    applied: document.querySelector('#metric-applied'),
    failed: document.querySelector('#metric-failed'),
    keys: document.querySelector('#metric-keys'),
    contested: document.querySelector('#metric-contested'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    replay: document.querySelector('#replay-step'),
    replayOutput: document.querySelector('#replay-output'),
    replayCaption: document.querySelector('#replay-caption'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let order = [...DEFAULT_ORDER]
  let currentModel = null

  // 逐步回放：滑杆只改变「已应用几步」的可见状态——卡片淡出、连线隐藏、
  // 右列键值改读当时的中间快照；快照与最终解析折叠同一份数据。
  const syncReplay = () => {
    if (currentModel === null) return
    const total = currentModel.steps.length
    elements.replay.max = String(total - 1)
    if (Number(elements.replay.value) > total - 1 || Number(elements.replay.value) < 0) {
      elements.replay.value = String(total - 1)
    }
    const upto = Number(elements.replay.value)
    writeText(elements.replayOutput, String(upto))
    const snapshot = snapshotProfileAt(currentModel, upto)
    for (const card of elements.stage.querySelectorAll('.pl-card[data-step]')) {
      card.classList.toggle('is-future', Number(card.getAttribute('data-step')) > upto)
      card.classList.toggle('is-current', Number(card.getAttribute('data-step')) === upto)
    }
    for (const path of elements.stage.querySelectorAll('.pl-line[data-from], .pl-ghost[data-from]')) {
      path.classList.toggle('is-future', Number(path.getAttribute('data-from')) > upto)
    }
    for (const row of elements.stage.querySelectorAll('.pl-key[data-key]')) {
      const key = row.getAttribute('data-key')
      const valueNode = row.querySelector('.pl-key-value')
      const has = Object.hasOwn(snapshot.config, key)
      const box = row.querySelector('.pl-key-box')
      if (box !== null) box.classList.toggle('is-unset', !has)
      if (valueNode === null) continue
      if (!has) {
        row.setAttribute('data-value', '')
        valueNode.textContent = ''
        const nameNode = row.querySelector('.pl-key-name')
        if (nameNode !== null && !nameNode.textContent.includes('（未声明）')) {
          nameNode.textContent = nameNode.textContent + '（未声明）'
        }
      } else {
        const writer = snapshot.writerOf.get(key)
        row.removeAttribute('data-value')
        valueNode.textContent = `${String(snapshot.config[key])} ← ${writer?.label ?? ''}（#${String(writer?.index ?? '—')} 时写入）`
        const nameNode = row.querySelector('.pl-key-name')
        if (nameNode !== null) nameNode.textContent = key
      }
    }
    const step = currentModel.steps[upto]
    writeText(elements.replayCaption, step.applied
      ? '回放到 #' + String(upto) + ' ' + step.label + '：本步写入 ' + (step.wrote.join('、') || '（无）') + '。右列是此刻的中间配置。'
      : '回放到 #' + String(upto) + '：' + (step.reason ?? '这一步未应用。'))
    elements.replayCaption.hidden = false
  }

  for (const overlay of OVERLAY_SOURCES) {
    const option = document.createElement('option')
    option.value = overlay.id
    writeText(option, overlay.label)
    elements.overlay.append(option)
  }

  const renderOrder = () => {
    elements.orderList.replaceChildren()
    for (const [index, name] of order.entries()) {
      const chip = document.createElement('span')
      chip.className = 'order-chip'
      const label = document.createElement('span')
      writeText(label, String(index + 1) + '. ' + name)
      const up = document.createElement('button')
      up.type = 'button'
      up.className = 'order-move'
      up.disabled = index === 0
      up.setAttribute('aria-label', '把 ' + name + ' 上移一位')
      writeText(up, '↑')
      const down = document.createElement('button')
      down.type = 'button'
      down.className = 'order-move'
      down.disabled = index === order.length - 1
      down.setAttribute('aria-label', '把 ' + name + ' 下移一位')
      writeText(down, '↓')
      up.addEventListener('click', () => {
        ;[order[index - 1], order[index]] = [order[index], order[index - 1]]
        renderOrder()
        rebuild()
        resetReplayToEnd()
      })
      down.addEventListener('click', () => {
        ;[order[index + 1], order[index]] = [order[index], order[index + 1]]
        renderOrder()
        rebuild()
        resetReplayToEnd()
      })
      chip.append(label, up, down)
      elements.orderList.append(chip)
    }
  }

  const rebuild = () => {
    try {
      const withBroken = elements.broken.checked
        ? [order[0], 'broken-ref', ...order.slice(1)]
        : order
      const model = buildProfileModel({ order: withBroken, overlay: elements.overlay.value })
      const verdict = evaluateProfileOracle(model)
      currentModel = model

      renderMatrix(model, elements.matrix, elements.matrixNote)
      renderStage(model, elements.stage, elements.stageNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      renderRows(elements.finalBody, model.observations.finalValues.map(entry => ({
        key: entry.key,
        state: entry.value === null ? 'unset' : 'set',
        cells: [entry.key, entry.value === null ? '（未声明）' : String(entry.value), entry.writtenBy ?? '—'],
      })))
      writeText(elements.finalCaption, '当前输入解析出的 '
        + String(model.observations.resolvedKeys) + ' 个键（共 ' + String(model.keys.length) + ' 个）')

      renderRows(elements.stepsBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.applied ? 'applied' : 'failed',
        cells: [
          String(step.index), step.label, step.kind,
          step.wrote.join('、') || '—',
          step.applied ? (step.finalFor.join('、') || '—') : '—',
          step.applied ? (step.overriddenFor.join('、') || '—') : '—',
          step.applied ? '✓' : '✕ ' + (step.reason ?? ''),
        ],
      })))
      writeText(elements.stepsCaption, '当前输入的 ' + String(model.steps.length) + ' 个解析步骤')

      writeText(elements.declared, String(model.observations.declaredBundles))
      writeText(elements.applied, String(model.observations.appliedSteps))
      writeText(elements.failed, model.observations.failedAt === null ? '无' : '#' + String(model.observations.failedAt))
      writeText(elements.keys, String(model.observations.resolvedKeys))
      writeText(elements.contested, String(model.observations.contestedKeys.length))
      setFeedback(model.failure === null
        ? '已解析：' + String(model.observations.appliedSteps) + ' 步应用，maxTurns='
          + String(model.config.maxTurns) + '，telemetry=' + String(model.config.telemetry) + '。'
        : '解析在第 ' + String(model.failure.stepIndex) + ' 步显式失败，不是跳过它继续。',
      model.failure === null ? 'success' : 'notice')
      elements.replay.max = String(model.steps.length - 1)
      if (Number(elements.replay.value) > model.steps.length - 1) {
        elements.replay.value = String(model.steps.length - 1)
      }
      syncReplay()
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash；replaceState 被拒（file:// 等）时页面行为不变。
  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        order,
        overlay: elements.overlay.value,
        broken: elements.broken.checked,
        step: Number(elements.replay.value),
      }, PROFILE_STATE_SCHEMA))
    } catch {
      // 保持安静。
    }
  }

    bindAutoAdvance(document.getElementById('replay-play'), elements.replay, { stepMs: 650, speedSelect: document.getElementById('replay-speed') })
elements.replay.addEventListener('input', () => {
    syncReplay()
    persistState()
  })
  const nudgeReplay = delta => {
    elements.replay.value = String(Math.min(Number(elements.replay.max),
      Math.max(Number(elements.replay.min), Number(elements.replay.value) + delta)))
    elements.replay.dispatchEvent(new (elements.replay?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  document.querySelector('#replay-prev')?.addEventListener('click', () => nudgeReplay(-1))
  document.querySelector('#replay-next')?.addEventListener('click', () => nudgeReplay(1))
  // 图形即控制器：点（或回车/空格激活）舞台上的任意一张卡，回放直接跳到那一步。
  const seekReplayTo = target => {
    const card = target instanceof Element ? target.closest('[data-step]') : null
    if (card === null) return
    elements.replay.value = card.getAttribute('data-step')
    elements.replay.dispatchEvent(new (elements.replay?.ownerDocument?.defaultView?.Event ?? Event)('input', { bubbles: true }))
  }
  elements.stage.addEventListener('click', event => seekReplayTo(event.target))
  elements.stage.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    seekReplayTo(event.target)
  })
  // 焦点不在表单控件时，← / → 步进回放。
  elements.replay.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); nudgeReplay(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); nudgeReplay(1) }
  })

  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  const resetReplayToEnd = () => {
    elements.replay.value = elements.replay.max
    syncReplay()
  }
  elements.overlay.addEventListener('change', () => { rebuild(); resetReplayToEnd() })
  elements.broken.addEventListener('change', () => { rebuild(); resetReplayToEnd() })

  // 恢复前先放宽滑杆上界，避免 max=0 时 hash 里的步进被钳掉；真实上界由 rebuild 写回。
  elements.replay.max = String(Number.MAX_SAFE_INTEGER)

  // 从状态链接恢复输入：order 必须是默认清单的排列（同集合不重不漏）才接受。
  const restored = readStateFromHash(location.hash, PROFILE_STATE_SCHEMA)
  const isPermutation = value => (
    Array.isArray(value)
    && value.length === DEFAULT_ORDER.length
    && [...value].sort().join() === [...DEFAULT_ORDER].sort().join()
  )
  if (restored !== null && restored.ok && isPermutation(restored.value.order)) {
    order = [...restored.value.order]
    elements.overlay.value = restored.value.overlay
    elements.broken.checked = restored.value.broken
    if (typeof restored.value.step === 'number') elements.replay.value = String(restored.value.step)
  }

  renderOrder()
  rebuild()
  if (Number(elements.replay.value) > Number(elements.replay.max)) resetReplayToEnd()

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可，状态就在 #state= 后面。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  // 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  // 预测题门控：先押注，再解锁参数控件。答错也解锁。
  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 模型步骤 kind=bundle/overlay：bundle 按 source 分泳道，overlay 单列。
    const trace = input => buildProfileModel(input).steps.map((step, index) => ({
      lane: step.kind === 'overlay' ? 'overlay 覆盖' : `bundle · ${String(step.source ?? '')}`,
      phase: step.kind,
      index,
      detail: Array.isArray(step.wrote) && step.wrote.length > 0
        ? `${step.label ?? ''}写入 ${step.wrote.join('、')}`
        : String(step.label ?? step.kind),
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'profile-loader-ladder',
      rungs: replayRungs([
        {
          title: 'base bundle 先铺底',
          text: '一个 profile 由若干 bundle 依序叠放：每个 bundle 写入自己的键。没有叠加时最后一份 base 就是全部配置。',
          traces: [{ id: 'base', label: '仅 base', steps: trace({ order: ['base'], overlay: 'none' }) }],
        },
        {
          title: 'overlay 只覆盖它声明的键',
          text: '用户目录 overlay 把 telemetry 改为 off：其余键保持 bundle 写入的值。覆盖是按键精确进行的，不做整份替换。',
          traces: [{ id: 'overlay', label: '+ 用户目录 overlay', steps: trace({ order: ['base'], overlay: 'user-dir' }), focusPhases: ['overlay'] }],
        },
        {
          title: '多层叠加：后写的赢',
          text: '用户目录再叠命令行：maxTurns 与 model 被命令行再次改写。同键后写优先，冲突在叠加时就地解决。',
          traces: [
            { id: 'cli', label: '仅命令行 overlay', steps: trace({ order: ['base'], overlay: 'cli' }) },
            { id: 'both', label: '目录 + 命令行', steps: trace({ order: ['base'], overlay: 'user-then-cli' }), focusPhases: ['overlay'] },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'overlay-last',
      hint: 'overlay 排在所有 Bundle 之后应用，同一个键最后一个写者赢。',
    explain: {
      'overlay-last': 'OVERLAY_APPLIES_LAST 和 LAST_WRITER_WINS 两条校验项一起决定了这个结果。',
      'first-writer': '这一页的模型是「最后写的人赢」，不是「先声明的赢」。',
      'bundle-priority': 'overlay 的位置是固定的最后一层，不参与 Bundle 之间的排序。',
      merge: '这个模型里每个键取单一值，不做合并——所以顺序才这么关键。',
    },
  })
}
