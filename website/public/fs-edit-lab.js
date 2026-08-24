/**
 * fs-edit 实验页的渲染层。模型在 fs-edit-model.js；本文件只画返回值。
 * 管线阶段条、diff 预览和判定表读的是同一次推演结果。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  renderRows,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  EDIT_TARGETS,
  SANDBOX_MODES,
  buildFsEditModel,
  evaluateFsEditOracle,
} from './fs-edit-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const EDIT_STATE_SCHEMA = {
  target: { enum: EDIT_TARGETS.map(target => target.id) },
  sandboxMode: { enum: SANDBOX_MODES },
}

const OUTCOME_LABELS = {
  success: '写入成功',
  'not-found': '未找到匹配',
  ambiguous: '多义拒绝',
  'sandbox-denied': '沙箱拒绝',
}

/** 单跨度替换的行级 diff：公共前后缀之外就是要展示的改动块。 */
function buildDiffLines(before, after) {
  const left = before.split('\n')
  const right = after.split('\n')
  let start = 0
  while (start < left.length && start < right.length && left[start] === right[start]) start += 1
  let endLeft = left.length
  let endRight = right.length
  while (endLeft > start && endRight > start && left[endLeft - 1] === right[endRight - 1]) {
    endLeft -= 1
    endRight -= 1
  }
  const context = 2
  const from = Math.max(0, start - context)
  const toLeft = Math.min(left.length, endLeft + context)
  const toRight = Math.min(right.length, endRight + context)
  const rows = []
  for (let index = from; index < start; index += 1) rows.push({ marker: ' ', text: left[index], line: index + 1 })
  for (let index = start; index < endLeft; index += 1) rows.push({ marker: '-', text: left[index], line: index + 1 })
  for (let index = start; index < endRight; index += 1) rows.push({ marker: '+', text: right[index], line: index + 1 })
  for (let index = endLeft; index < toLeft; index += 1) rows.push({ marker: ' ', text: left[index], line: index + 1 })
  void toRight
  return rows
}

function renderPipeline(model, target) {
  target.replaceChildren()
  const strip = document.createElement('div')
  strip.className = 'fe-pipeline'
  for (const step of model.steps) {
    const chip = document.createElement('span')
    chip.className = 'fe-stage ' + (step.ok ? 'is-ok' : 'is-fail')
    chip.setAttribute('data-reveal', '')
    const name = document.createElement('strong')
    writeText(name, step.stage)
    const detail = document.createElement('small')
    writeText(detail, step.detail)
    chip.append(name, detail)
    strip.append(chip)
    if (step.ok && step !== model.steps[model.steps.length - 1]) {
      const arrow = document.createElement('span')
      arrow.className = 'fe-arrow'
      arrow.textContent = '→'
      strip.append(arrow)
    }
  }
  target.append(strip)
  revealOnScroll(target)
}

function renderDiff(model, target, note) {
  target.replaceChildren()
  if (model.after === null) {
    const empty = document.createElement('p')
    empty.className = 'fe-empty-diff'
    writeText(empty, model.outcome.kind === 'success' ? '' : '没有写入发生：下面是失败报错与它所在的管线位置。')
    if (model.outcome.kind !== 'success') target.append(empty)
    writeText(note, '结局：' + OUTCOME_LABELS[model.outcome.kind] + '。')
    return
  }
  const pre = document.createElement('pre')
  pre.className = 'fe-diff'
  for (const row of buildDiffLines(model.before, model.after)) {
    const lineNode = document.createElement('span')
    lineNode.className = row.marker === '+' ? 'is-add' : row.marker === '-' ? 'is-del' : 'is-ctx'
    writeText(lineNode, `${row.marker} ${String(row.line).padStart(4, ' ')}  ${row.text}`)
    pre.append(lineNode)
  }
  target.append(pre)
  writeText(note, 'diff 卡载荷（presentCall）：oldText 是请求里的 old_str，newText 是 new_str——UI 渲染它，模型收到的是成功文案。')
}

function initializePage() {
  const elements = {
    form: document.querySelector('#fsedit-form'),
    target: document.querySelector('#fs-target'),
    sandbox: document.querySelector('#fs-sandbox'),
    oldStr: document.querySelector('#fs-old-str'),
    newStr: document.querySelector('#fs-new-str'),
    presetAmbiguous: document.querySelector('#fs-preset-ambiguous'),
    feedback: document.querySelector('#fsedit-feedback'),
    pipeline: document.querySelector('#fs-pipeline'),
    errorBox: document.querySelector('#fs-error-box'),
    diff: document.querySelector('#fs-diff'),
    diffNote: document.querySelector('#fs-diff-note'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    tableBody: document.querySelector('#fs-table-body'),
    tableCaption: document.querySelector('#fs-table-caption'),
    matchCount: document.querySelector('#metric-matches'),
    matchLine: document.querySelector('#metric-match-line'),
    outcome: document.querySelector('#metric-outcome'),
    version: document.querySelector('#metric-version'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const target of EDIT_TARGETS) {
    const option = document.createElement('option')
    option.value = target.id
    writeText(option, target.path + (target.insideWorkspace ? '（workspace 内）' : '（workspace 外）'))
    elements.target.append(option)
  }
  for (const mode of SANDBOX_MODES) {
    const option = document.createElement('option')
    option.value = mode
    writeText(option, mode)
    elements.sandbox.append(option)
  }

  const rebuild = () => {
    try {
      const input = {
        target: elements.target.value,
        sandboxMode: elements.sandbox.value,
        oldStr: elements.oldStr.value,
        newStr: elements.newStr.value,
      }
      const model = buildFsEditModel(input)
      const verdict = evaluateFsEditOracle(model)

      renderPipeline(model, elements.pipeline)
      renderDiff(model, elements.diff, elements.diffNote)
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      if (model.outcome.kind === 'success') {
        elements.errorBox.hidden = true
        writeText(elements.errorBox, '')
      } else {
        elements.errorBox.hidden = false
        writeText(elements.errorBox, model.outcome.errorCode + ': ' + model.outcome.message)
      }

      renderRows(elements.tableBody, model.steps.map(step => ({
        key: String(step.index),
        state: step.ok ? 'ok' : 'fail',
        cells: [
          step.stage,
          step.ok ? '✓' : '✕',
          step.detail,
          typeof step.matchCount === 'number' ? String(step.matchCount) : '—',
          step.sandboxDenied === true ? 'denied' : '—',
        ],
      })))
      writeText(elements.tableCaption, 'str_replace 管线的 ' + String(model.steps.length) + ' 个阶段')

      writeText(elements.matchCount, String(model.observations.matchCount))
      writeText(elements.matchLine, model.observations.matchLines.length === 0
        ? '—' : model.observations.matchLines.map(line => String(line)).join('、'))
      writeText(elements.outcome, OUTCOME_LABELS[model.outcome.kind])
      writeText(elements.version, model.versionFrom === null ? '—' : `${String(model.versionFrom)} → ${String(model.versionTo)}`)
      setFeedback('结局：' + OUTCOME_LABELS[model.outcome.kind]
        + (model.observations.wrote ? '；文件已写入并广播 fs/observed。' : '；没有任何写入发生。'),
      model.observations.wrote ? 'success' : 'notice')
      persistState()
    } catch (error) {
      console.error('[fs-edit] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        target: elements.target.value,
        sandboxMode: elements.sandbox.value,
      }, EDIT_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.target, elements.sandbox]) {
    control.addEventListener('change', rebuild)
  }
  for (const control of [elements.oldStr, elements.newStr]) {
    control.addEventListener('input', rebuild)
  }
  elements.presetAmbiguous.addEventListener('click', () => {
    elements.oldStr.value = 'retries: 3'
    elements.newStr.value = 'retries: 5'
    rebuild()
  })

  const restored = readStateFromHash(location.hash, EDIT_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.target.value = restored.value.target
    elements.sandbox.value = restored.value.sandboxMode
  }

  rebuild()

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可。', 'error')
    }
  })
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
    correct: 'ambiguous',
      hint: '两种编辑路径对同一位置的写入语义不同，先分清谁以什么顺序落盘。',
    explain: {
      ambiguous: '正确。FS_AMBIGUOUS_EDIT 会带着两个行号 [2, 6]，一次都不会写入。',
      'first-wins': '上游没有「第一次胜出」规则：不唯一就整体拒绝，由模型自己加上下文再试。',
      merged: '也不会全部替换——那会把两处语义都改掉；唯一性检查就是为此存在的。',
    },
  })
}
