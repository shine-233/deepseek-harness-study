/**
 * Session 日志重放实验页的渲染层。
 *
 * 模型在 session-log-model.js；本文件只画返回值。去向条、状态块和事件表读的是同一次
 * 重放结果，所以三者不可能互相矛盾。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  svgElement,
  writeText, animateNumber, installDeclaredIcons, bindRangeKeys, bindAutoAdvance, installScrollProgress,
  installNumberScrub, bindRowJump } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  LOG_SCENARIOS,
  buildSessionLogModel,
  evaluateSessionLogOracle,
} from './session-log-model.js'
import {
  firstCompressionBranchMembers,
  packedRowFootprint,
  buildSqliteRowModel,
  evaluateSqliteRowOracle,
} from './sqlite-row-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

// 状态链接的输入契约：场景是枚举；重放位置的上界由模型按日志长度给出，
// 这里只卡整数下界，越界值在恢复时被拉回当前场景的末尾。
// SQLite 面板的两个开关和重放输入共用同一段 #state=，所以放进同一张 schema。
const SESSION_STATE_SCHEMA = {
  scenario: { enum: LOG_SCENARIOS.map(scenario => scenario.id) },
  upTo: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
  sqlitePacking: { enum: ['on', 'off'] },
  sqlitePayload: { enum: ['small', 'large'] },
  packN: { integerRange: [3, 260] },
}

// 只含重放输入的旧版链接：整表校验失败时按它兜底，老书签不至于整页回默认。
const LEGACY_REPLAY_SCHEMA = {
  scenario: { enum: LOG_SCENARIOS.map(scenario => scenario.id) },
  upTo: { integerRange: [0, Number.MAX_SAFE_INTEGER] },
}

const DISPOSITION_GLYPH = {
  applied: '✓',
  skipped: '⤼',
  refused: '✕',
  'not-reached': '·',
}

const DISPOSITION_LABEL = {
  applied: '已应用',
  skipped: '已跳过',
  refused: '导致拒绝',
  'not-reached': '未达',
}

function renderStrip(model, target, note) {
  const cell = 62
  const left = 20
  const width = Math.max(720, left * 2 + model.log.length * cell)
  const height = 132
  const top = 26
  target.replaceChildren()

  const svg = svgElement('svg', {
    viewBox: '0 0 ' + String(width) + ' ' + String(height),
    role: 'img',
    'aria-labelledby': 'strip-svg-title strip-svg-desc',
  })
  svg.append(
    svgElement('title', { id: 'strip-svg-title' }, '每条事件在本次重放里的去向'),
    svgElement('desc', { id: 'strip-svg-desc' },
      '一格一条事件，按序号排列；去向分为已应用、已跳过、导致拒绝和未达。'
      + '完整去向和原因在本页最后的表格里逐行给出。'),
  )

  for (const [index, entry] of model.partial.dispositions.entries()) {
    const x = left + index * cell
    const group = svgElement('g', { class: 'cell disposition-' + entry.disposition })
    group.append(
      svgElement('rect', { x, y: top, width: cell - 8, height: 54, rx: 6, class: 'cell-box', 'data-reveal': '' }),
      svgElement('text', { x: x + (cell - 8) / 2, y: top + 24, class: 'cell-glyph', 'text-anchor': 'middle' },
        DISPOSITION_GLYPH[entry.disposition] ?? '?'),
      svgElement('text', { x: x + (cell - 8) / 2, y: top + 44, class: 'cell-seq', 'text-anchor': 'middle' },
        '#' + String(entry.sequence)),
      svgElement('text', { x: x + (cell - 8) / 2, y: top + 74, class: 'cell-type', 'text-anchor': 'middle' },
        entry.type.length > 9 ? entry.type.slice(0, 8) + '…' : entry.type),
    )
    group.append(svgElement('title', {},
      '#' + String(entry.sequence) + ' ' + entry.type + '：'
      + (DISPOSITION_LABEL[entry.disposition] ?? entry.disposition) + '——' + entry.reason))
    svg.append(group)
  }

  const marker = left + Math.min(model.log.length, model.input.upTo + 1) * cell - 4
  svg.append(svgElement('line', {
    x1: marker, y1: top - 12, x2: marker, y2: top + 88, class: 'replay-marker',
  }))

  target.append(svg)
  revealOnScroll(target)
  writeText(note, model.observations.refusedAt === null
    ? '本次重放没有拒绝：' + String(model.observations.applied) + ' 条应用，'
      + String(model.observations.skipped) + ' 条跳过。'
    : '加载在第 ' + String(model.observations.refusedAt) + ' 条停下，之后 '
      + String(model.observations.notReached) + ' 条没有被应用——它们建立在一个未知状态上，'
      + '所以跳过它们和拒绝加载不是同一件事。')
}

function renderState(model, grid, messageList) {
  const state = model.partial.state
  const fields = [
    ['会话已开始', state.started ? '是' : '否'],
    ['标题', state.title ?? '（尚未设置）'],
    ['消息数', String(state.messages.length)],
    ['工具调用', String(state.toolCalls)],
    ['工具失败', String(state.toolFailures)],
    ['累计 token', String(state.tokens)],
    ['已应用事件', String(state.appliedCount)],
  ]
  grid.replaceChildren()
  for (const [label, value] of fields) {
    const wrap = document.createElement('div')
    const dt = document.createElement('dt')
    const dd = document.createElement('dd')
    writeText(dt, label)
    writeText(dd, value)
    wrap.append(dt, dd)
    grid.append(wrap)
  }
  messageList.replaceChildren()
  if (state.messages.length === 0) {
    const item = document.createElement('li')
    writeText(item, '这一位置还没有折叠出任何消息。')
    messageList.append(item)
    return
  }
  for (const message of state.messages) {
    const item = document.createElement('li')
    item.dataset.role = message.role
    writeText(item, (message.role === 'user' ? '用户：' : '助手：') + message.text)
    messageList.append(item)
  }
}

function renderSqlitePanel(elements, persistState = () => {}) {
  // 本函数会被「恢复默认」反复调用；监听器只在第一次接线，
  // 之后只重算渲染，否则每次重置都叠一层 keydown/pointer/click 处理器。
  const firstWire = elements.sqliteForm.dataset.wired !== 'true'
  // Mathigon 式参数滑杆：成员数一动，物理行形状的三个读数立刻跟着走。
  const updatePackScrubber = () => {
    const n = Number(elements.packN.value)
    const fp = packedRowFootprint(n)
    writeText(elements.packNOutput, String(n))
    animateNumber(elements.packBytes, fp.dataBytes)
    animateNumber(elements.packDt, fp.dtCount)
    writeText(elements.packZstd, fp.entersCompressionBranch ? '是' : '否')
  }

  const rebuildSqlite = () => {
    try {
      const model = buildSqliteRowModel({
        packing: elements.sqlitePacking.value,
        payload: elements.sqlitePayload.value,
      })
      const verdict = evaluateSqliteRowOracle(model)
      renderOracle(verdict, elements.sqliteOracleList, elements.sqliteOracle)
      renderRows(elements.sqliteRowBody, model.rows.map(row => ({
        key: String(row.position),
        state: row.kind === 'packed' ? 'final' : 'plain',
        cells: [
          String(row.position),
          row.seqLabel,
          row.tag,
          String(row.memberCount),
          String(row.dtCount),
          String(row.dataBytes),
          row.entersCompressionBranch ? '是' : '否',
          row.ignorable === 0 ? '0（打包行）' : 'NULL',
          row.sourceEventSeqsHex ?? '—',
        ],
      })))
      writeText(elements.sqliteTableCaption, (model.input.packing === 'on' ? '打包开启' : '打包关闭')
        + '、单条增量 ' + (model.input.payload === 'large' ? '大' : '小')
        + ' 时的物理行布局（schema ' + String(model.schemaVersion)
        + '，应用 id ' + model.applicationIdAscii + '）')
      animateNumber(elements.sqliteLogical, model.observations.logicalEvents)
      animateNumber(elements.sqlitePhysical, model.observations.physicalRowCount)
      animateNumber(elements.sqliteBytes, model.observations.totalDataBytes)
      animateNumber(elements.sqliteZstd, model.observations.compressionCandidates)
      persistState()
    } catch (error) {
      console.error('[sqlite-panel] rebuild failed', error)
    }
  }

  if (firstWire) {
    elements.sqliteForm.dataset.wired = 'true'
    elements.sqliteForm.addEventListener('submit', (event) => {
      event.preventDefault()
      rebuildSqlite()
    })
    for (const control of [elements.sqlitePacking, elements.sqlitePayload]) {
      control.addEventListener('change', rebuildSqlite)
    }
    elements.packN.addEventListener('input', updatePackScrubber)
    bindRangeKeys(elements.packN)
    // 读数本身也能左右拖：滑杆管键盘与粗调，读数柄补鼠标/触控的精确操纵。
    installNumberScrub(elements.packNOutput, elements.packN)
    // 反向联动：点处置表里的一行，重放位置跳到那条事件。
    bindRowJump(elements.tableBody, elements.upTo)
  }
  rebuildSqlite()
  updatePackScrubber()
  if (firstWire) animateNumber(elements.packCross, firstCompressionBranchMembers() ?? 0, { duration: 700 })
}

function initializePage() {
  const elements = {
    form: document.querySelector('#session-form'),
    scenario: document.querySelector('#scenario'),
    scenarioNote: document.querySelector('#scenario-note'),
    upTo: document.querySelector('#upto'),
    upToOutput: document.querySelector('#upto-output'),
    feedback: document.querySelector('#session-feedback'),
    strip: document.querySelector('#strip-plot'),
    stripNote: document.querySelector('#strip-note'),
    stateGrid: document.querySelector('#state-grid'),
    messageList: document.querySelector('#message-list'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    tableBody: document.querySelector('#session-table-body'),
    tableCaption: document.querySelector('#table-caption'),
    events: document.querySelector('#metric-events'),
    applied: document.querySelector('#metric-applied'),
    skipped: document.querySelector('#metric-skipped'),
    refused: document.querySelector('#metric-refused'),
    messages: document.querySelector('#metric-messages'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
    sqliteForm: document.querySelector('#sqlite-form'),
    sqlitePacking: document.querySelector('#sqlite-packing'),
    sqlitePayload: document.querySelector('#sqlite-payload'),
    sqliteOracleList: document.querySelector('#sqlite-oracle-list'),
    sqliteOracle: document.querySelector('#sqlite-metric-oracle'),
    sqliteRowBody: document.querySelector('#sqlite-row-body'),
    sqliteTableCaption: document.querySelector('#sqlite-table-caption'),
    sqliteLogical: document.querySelector('#sqlite-metric-logical'),
    sqlitePhysical: document.querySelector('#sqlite-metric-physical'),
    sqliteBytes: document.querySelector('#sqlite-metric-bytes'),
    sqliteZstd: document.querySelector('#sqlite-metric-zstd'),
    packN: document.querySelector('#pack-n'),
    packNOutput: document.querySelector('#pack-n-output'),
    packBytes: document.querySelector('#pack-metric-bytes'),
    packDt: document.querySelector('#pack-metric-dt'),
    packZstd: document.querySelector('#pack-metric-zstd'),
    packCross: document.querySelector('#pack-metric-cross'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const scenario of LOG_SCENARIOS) {
    const option = document.createElement('option')
    option.value = scenario.id
    writeText(option, scenario.label)
    elements.scenario.append(option)
  }

  const rebuild = () => {
    try {
      const model = buildSessionLogModel({
        scenario: elements.scenario.value,
        upTo: Number(elements.upTo.value),
      })
      const verdict = evaluateSessionLogOracle(model)

      elements.upTo.max = String(model.maxSequence)
      writeText(elements.upToOutput, String(model.input.upTo))
      writeText(elements.scenarioNote, model.scenario.description)
      renderStrip(model, elements.strip, elements.stripNote)
      renderState(model, elements.stateGrid, elements.messageList)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)
      renderRows(elements.tableBody, model.partial.dispositions.map(entry => ({
        key: String(entry.sequence),
        state: entry.disposition,
        cells: [
          String(entry.sequence),
          entry.type,
          (model.log.find(candidate => candidate.sequence === entry.sequence)?.ignorable ?? false) ? '✓' : '✕',
          DISPOSITION_LABEL[entry.disposition] ?? entry.disposition,
          entry.reason,
        ],
      })))
      writeText(elements.tableCaption, '当前场景重放到第 ' + String(model.input.upTo)
        + ' 条时的 ' + String(model.partial.dispositions.length) + ' 条事件')

      writeText(elements.events, String(model.observations.events))
      writeText(elements.applied, String(model.observations.applied))
      writeText(elements.skipped, String(model.observations.skipped))
      writeText(elements.refused, model.observations.refusedAt === null ? '无' : '#' + String(model.observations.refusedAt))
      writeText(elements.messages, String(model.observations.messages))
      setFeedback(model.observations.refusedAt === null
        ? '已重放到第 ' + String(model.input.upTo) + ' 条：' + String(model.observations.applied)
          + ' 条应用，' + String(model.observations.messages) + ' 条消息。'
        : '加载在第 ' + String(model.observations.refusedAt) + ' 条被拒绝；之前的 '
          + String(model.observations.applied) + ' 条已折叠成可用的部分状态。',
      model.observations.refusedAt === null ? 'success' : 'notice')
      persistState()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  // 状态进 URL hash：刷新或把链接发给别人，打开的就是同一份输入。
  // replaceState 在 file:// 或沙箱环境下可能被拒；状态链接是增强，不是前提。
  // 重放输入和 SQLite 面板的开关写同一段 #state=，一次全量写入避免互相覆盖。
  const persistState = () => {
    try {
      history.replaceState(null, '', writeStateToHash(location.hash, {
        scenario: elements.scenario.value,
        upTo: Number(elements.upTo.value),
        sqlitePacking: elements.sqlitePacking.value,
        sqlitePayload: elements.sqlitePayload.value,
        packN: Number(elements.packN.value),
      }, SESSION_STATE_SCHEMA))
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  // 恢复默认输入：清地址栏状态、表单回到 authored 默认值，再按当前输入重建一次。
  // SQLite 面板的两个开关在独立表单里，也要一并回到 authored 默认值并重渲染。
  installInputReset(elements.resetInputs, elements.form, {
    onReset: () => {
      elements.sqlitePacking.value = 'packed'
      elements.sqlitePayload.value = 'auto'
      renderSqlitePanel(elements, persistState)
      rebuild()
    },
  })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.scenario.addEventListener('change', () => {
    // 换场景时日志长度会变，先把滑块拉到末尾，避免停在一个不存在的序号上。
    elements.upTo.value = elements.upTo.max
    rebuild()
  })
  elements.upTo.addEventListener('input', rebuild)
  // 焦点在页面其它地方时，← / → / Home / End 直接步进这条主时间轴。
  bindRangeKeys(elements.upTo)
  const playButton = document.querySelector('#frame-play')
  if (playButton instanceof HTMLButtonElement) bindAutoAdvance(playButton, elements.upTo, { stepMs: 450 })

  // 从状态链接恢复输入；链接缺失时保持默认场景。新版链接带 SQLite 开关；
  // 只有旧版两个字段的老书签也能恢复重放输入，SQLite 面板留在默认值。
  const restored = readStateFromHash(location.hash, SESSION_STATE_SCHEMA)
  const legacy = restored !== null && !restored.ok
    ? readStateFromHash(location.hash, LEGACY_REPLAY_SCHEMA)
    : null
  const hasRestoredUpTo = (restored !== null && restored.ok)
    || (legacy !== null && legacy.ok)
  if (restored !== null && restored.ok) {
    elements.scenario.value = restored.value.scenario
    elements.upTo.value = String(restored.value.upTo)
    elements.sqlitePacking.value = restored.value.sqlitePacking
    elements.sqlitePayload.value = restored.value.sqlitePayload
    if ('packN' in restored.value) elements.packN.value = String(restored.value.packN)
  } else if (legacy !== null && legacy.ok) {
    elements.scenario.value = legacy.value.scenario
    elements.upTo.value = String(legacy.value.upTo)
  }

  rebuild()
  if (!hasRestoredUpTo || Number(elements.upTo.value) > Number(elements.upTo.max)) {
    elements.upTo.value = elements.upTo.max
    rebuild()
  }
  renderSqlitePanel(elements, persistState)

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
  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'same-state',
      hint: '状态只能从事件折叠出来——同一前缀重放两次，结果必然一致。',
    explain: {
      'same-state': 'REPLAY_IS_DETERMINISTIC 每次都重放两次并逐字段比对，就是在钉住这一点。',
      drift: '重放不累积状态：每次都从空状态开始重新折叠这段日志。',
      'depends-order': '路径不进入结果，只有前缀长度进入。',
      'cannot-return': 'PREFIX_REPLAY_CONSISTENT 检查任意前缀都自洽，包括来回拖动之后。',
    },
  })
}
