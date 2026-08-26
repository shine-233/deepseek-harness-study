/**
 * 实验室总览页接线：目的筛选、网址记忆、本机进度展示。
 *
 * 数据边界与其它学习页一致：只读本机 localStorage 里的 dsh-study-progress-v2
 * （study-progress.js 写入的那一份），不上传、不联网。解析复用 study-progress-core.js
 * 的纯函数，坏数据按空状态处理。
 */

import { parseProgress } from './study-progress-core.js'
import { installThemeToggle } from './study-lab-theme.js'

const PROGRESS_STORAGE_KEY = 'dsh-study-progress-v2'

/** research-debug-bridge 是工作台不是模型实验，刻意不进进度名单；其余全部实验室入册。 */
const TRACKED_LAB_IDS = new Set([
  'turn-flow',
  'package-graph',
  'profile-loader',
  'session-log',
   'tool-visibility',
   'tool-budget',
  'acp',
   'fs-edit',
  'web-tool',
  'code-mode-evidence',
  'compaction',
  'plugin-flow',
  'llm-stream',
  'prompt-assembly',
  'hook-flow',
  'waterfall-ladder',
  'approval-flow',
  'session-fork',
  'subagent-delegate',
  'guard-loop',
  'jobs',
  'orchestration',
  'worker-protocol',
  'workflow-node',
  'client',
  'provider',
  'credential',
  'settings',
  'plan-stack',
  'spill',
  'terminal',
  'mcp',
  'selfmod',
  'subprocess',
  'lsp',
  'wire',
  'tokenmeter',
  'preset',
  'checkpoint',
  'identity',
  'time',
  'attachment',
  'feedback',
  'shell-seam',
  'trajectory',
  'skill-catalog',
  'context',
  'code-run',
  'host-gateway',
  'invariant',
  'storage-hub',
  'session-projection',
  'query',
  'sandbox',
  'typert',
  'workspace',
])

const VALID_GROUPS = new Set(['all', 'main', 'plugin', 'evidence'])

function readProgress() {
  let text = null
  try {
    text = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
  } catch {
    return null
  }
  return parseProgress(text)
}

function fillChipCounts(cards) {
  const counts = { all: cards.length, main: 0, plugin: 0, evidence: 0 }
  for (const card of cards) counts[card.dataset.group] += 1
  // 大标题里的数字也由这里供给：实验室数量每周在变，硬编码会像上面那样过期。
  for (const node of document.querySelectorAll('[data-lab-count-all]')) {
    node.textContent = String(counts.all)
  }
  // 「计入进度」一行从本页卡片推导：入册数 / 本页卡片数，新实验上下后自动对齐。
  const trackedOnPage = cards.filter(card => TRACKED_LAB_IDS.has(card.dataset.lab)).length
  for (const node of document.querySelectorAll('#metric-tracked')) {
    node.textContent = `${trackedOnPage} / ${counts.all} 个实验`
  }
  for (const node of document.querySelectorAll('.lab-chip-count')) {
    const key = node.dataset.count
    if (key in counts) node.textContent = String(counts[key])
  }
}

function setFilter(group, cards, feedback) {
  let visible = 0
  for (const card of cards) {
    const show = group === 'all' || card.dataset.group === group
    card.classList.toggle('is-hidden', !show)
    if (show) visible += 1
  }
  for (const chip of document.querySelectorAll('.lab-chip')) {
    chip.setAttribute('aria-pressed', String(chip.dataset.group === group))
  }
  feedback.textContent = `这一组有 ${visible} 个实验。`
  const emptyNote = document.getElementById('lab-empty-feedback')
  if (emptyNote) emptyNote.hidden = visible > 0
  try {
    window.history.replaceState(null, '', group === 'all' ? '#' : `#group=${group}`)
  } catch {
    // file:// 下 history 可能受限：筛选仍然生效，只是不进网址
  }
}

function wireFilter() {
  const cards = [...document.querySelectorAll('.lab-card')]
  const feedback = document.getElementById('lab-filter-feedback')
  fillChipCounts(cards)

  let initial = 'all'
  const match = /^#group=([a-z]+)$/.exec(window.location.hash)
  if (match && VALID_GROUPS.has(match[1])) initial = match[1]

  for (const chip of document.querySelectorAll('.lab-chip')) {
    chip.addEventListener('click', () => setFilter(chip.dataset.group, cards, feedback))
  }
  window.addEventListener('hashchange', () => {
    const next = /^#group=([a-z]+)$/.exec(window.location.hash)
    if (next && VALID_GROUPS.has(next[1])) setFilter(next[1], cards, feedback)
  })
  setFilter(initial, cards, feedback)
}

function showCardProgress(card, state) {
  const slot = card.querySelector('.lab-card-progress')
  if (!slot || state === null) return
  const notes = []
  if (TRACKED_LAB_IDS.has(card.dataset.lab) && state.labs[`lab:${card.dataset.lab}`]?.done) {
    notes.push('这个实验你亲手做过')
  }
  if (state.lessons[card.dataset.lesson]?.done) {
    notes.push('配套课已读')
  }
  if (notes.length > 0) {
    slot.textContent = notes.join(' · ')
    slot.hidden = false
  }
}

function showProgressMetrics(state) {
  const labsDone = document.getElementById('metric-labs-done')
  const lessonsRead = document.getElementById('metric-lessons-read')
  if (state === null) {
    const note = document.getElementById('labs-progress-feedback')
    if (note) note.textContent = '这台浏览器读不到本地存储（隐私模式或 file://），进度照常可用，只是这里不显示。'
    return
  }
  if (labsDone) labsDone.textContent = `${Object.keys(state.labs).length} / ${TRACKED_LAB_IDS.size}`
  if (lessonsRead) lessonsRead.textContent = String(Object.keys(state.lessons).length)
}

function main() {
  const toggle = document.getElementById('theme-toggle')
  if (toggle) installThemeToggle(toggle)
  wireFilter()
  const state = readProgress()
  showProgressMetrics(state)
  for (const card of document.querySelectorAll('.lab-card')) showCardProgress(card, state)
}

if (typeof document !== 'undefined') {
  main()
}
