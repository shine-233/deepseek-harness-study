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
  writeText, installDeclaredIcons } from './study-lab-kit.js'
import {
  OVERLAY_SOURCES,
  buildProfileModel,
  evaluateProfileOracle,
} from './profile-loader-model.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const DEFAULT_ORDER = ['base', 'web-tools', 'shell-tools', 'observability', 'strict-limits']

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
        writeText(cell, '●')
        cell.setAttribute('aria-label', key + '：这一步是最终写者')
      } else if (step.overriddenFor.includes(key)) {
        cell.dataset.mark = 'overridden'
        writeText(cell, '○')
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

function initializePage() {
  const elements = {
    form: document.querySelector('#profile-form'),
    orderList: document.querySelector('#order-list'),
    overlay: document.querySelector('#overlay'),
    broken: document.querySelector('#broken'),
    feedback: document.querySelector('#profile-feedback'),
    matrix: document.querySelector('#matrix-plot'),
    matrixNote: document.querySelector('#matrix-note'),
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
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  let order = [...DEFAULT_ORDER]

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
      })
      down.addEventListener('click', () => {
        ;[order[index + 1], order[index]] = [order[index], order[index + 1]]
        renderOrder()
        rebuild()
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

      renderMatrix(model, elements.matrix, elements.matrixNote)
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
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  elements.overlay.addEventListener('change', rebuild)
  elements.broken.addEventListener('change', rebuild)
  renderOrder()
  rebuild()
}

if (typeof document !== 'undefined') initializePage()

installDeclaredIcons()

// 主题切换：默认跟随系统，用户点过之后写 data-theme 显式覆盖。
installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))
