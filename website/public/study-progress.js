/**
 * 学习进度与自测题的页面层。
 *
 * 职责只有三件：把当前课程页映射成 lessonId；把状态存进 localStorage（失败就
 * 静默降级，功能变成“仅本次会话”）；渲染右下角的小组件和课末自测题。
 * 全部判断逻辑在 study-progress-core.js 和 study-quiz.js 里，那里可以在 Node 单测。
 *
 * 隐私边界：进度只写本浏览器的 localStorage，不上传、不联网；
 * 研究桥接页（research-debug-bridge）的显式无存储承诺不受影响。
 */

import {
  markDone,
  mergeProgress,
  normalizeLessonId,
  parseProgress,
  recordQuiz,
  serializeProgress,
  summarize,
} from './study-progress-core.js'
import { QUIZ_BANK, gradeAnswers } from './study-quiz.js'

const STORAGE_KEY = 'dsh-study-progress-v1'
const WIDGET_ID = 'dsh-progress-pill'

/** localStorage 在隐私模式或 file:// 下可能抛错：读写都包住，坏掉时退化为内存态。 */
function createStorage() {
  let memory = null
  const available = (() => {
    try {
      window.localStorage.setItem(STORAGE_KEY + '.probe', '1')
      window.localStorage.removeItem(STORAGE_KEY + '.probe')
      return true
    } catch {
      return false
    }
  })()
  return {
    available,
    read() {
      if (!available) return memory
      try { return window.localStorage.getItem(STORAGE_KEY) } catch { return memory }
    },
    write(text) {
      if (!available) { memory = text; return }
      try { window.localStorage.setItem(STORAGE_KEY, text) } catch { memory = text }
    },
  }
}

function loadState(storage) {
  return parseProgress(storage.read())
}

function saveState(storage, state) {
  storage.write(serializeProgress(state))
  return state
}

function injectStyles() {
  if (document.getElementById('dsh-progress-style')) return
  const style = document.createElement('style')
  style.id = 'dsh-progress-style'
  // 只用 VitePress 主题变量，浅色/深色自动适配；文字对比度跟随主题正文色。
  style.textContent = `
#${WIDGET_ID} {
  position: fixed; right: 16px; bottom: 16px; z-index: 40;
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-radius: 10px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, rgba(0,0,0,.12));
  box-shadow: var(--vp-shadow-2, 0 4px 14px rgba(0,0,0,.08));
  font-size: 13px; line-height: 1.4;
}
#${WIDGET_ID} button {
  font: inherit; cursor: pointer;
  border: 1px solid var(--vp-c-divider, rgba(0,0,0,.16));
  background: transparent; color: var(--vp-c-text-1, inherit);
  border-radius: 8px; padding: 3px 10px;
}
#${WIDGET_ID} button:focus-visible { outline: 2px solid var(--vp-c-brand-1, #3aa2ff); outline-offset: 1px; }
#${WIDGET_ID} .done { color: var(--vp-c-brand-1, #3aa2ff); font-weight: 600; }
#${WIDGET_ID} .count { color: var(--vp-c-text-2, inherit); }
#${WIDGET_ID} a { color: var(--vp-c-text-2, inherit); cursor: pointer; text-decoration: underline; }
.dsh-quiz { margin-top: 24px; padding: 16px 20px; border-radius: 12px;
  border: 1px solid var(--vp-c-divider, rgba(0,0,0,.12)); }
.dsh-quiz fieldset { border: none; margin: 12px 0 0; padding: 0; }
.dsh-quiz legend { font-weight: 600; padding: 0; }
.dsh-quiz label { display: block; margin: 6px 0; cursor: pointer; }
.dsh-quiz .result-pass { color: var(--vp-c-brand-1, #1a7f37); font-weight: 600; }
.dsh-quiz .result-fail { color: var(--vp-c-danger-1, #b35900); font-weight: 600; }
.dsh-quiz .explain { display: block; margin: 4px 0 12px; color: var(--vp-c-text-2, inherit); font-size: 13px; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
`
  document.head.append(style)
}

function buildWidget(state, lessonId) {
  const summary = summarize(state)
  const pill = document.createElement('div')
  pill.id = WIDGET_ID
  pill.setAttribute('role', 'group')
  pill.setAttribute('aria-label', '学习进度')

  const toggle = document.createElement('button')
  toggle.type = 'button'
  const done = lessonId !== null && state.lessons[lessonId]?.done === true
  toggle.textContent = done ? '✓ 本课已读（点击撤销）' : '标记本课已读'
  toggle.dataset.done = String(done)
  if (done) toggle.classList.add('done')

  const count = document.createElement('span')
  count.className = 'count'
  count.textContent = `已读 ${summary.doneLessons} 课`

  const exportLink = document.createElement('a')
  exportLink.textContent = '导出'
  exportLink.href = '#'
  const importLabel = document.createElement('label')
  importLabel.textContent = '导入'
  importLabel.style.cursor = 'pointer'
  importLabel.style.textDecoration = 'underline'

  pill.append(toggle, count, exportLink, importLabel)

  const status = document.createElement('p')
  status.id = WIDGET_ID + '-status'
  status.className = 'visually-hidden'
  status.setAttribute('role', 'status')
  pill.append(status)

  return { pill, toggle, exportLink, importLabel, status }
}

function wireExport(exportLink, getState) {
  exportLink.addEventListener('click', event => {
    event.preventDefault()
    try {
      const blob = new Blob([serializeProgress(getState())], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'dsh-study-progress.json'
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    } catch {
      // 导出失败不打断阅读；用户仍可手动复制 localStorage。
    }
  })
}

function wireImport(importLabel, applyImported) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json,application/json'
  input.style.display = 'none'
  importLabel.append(input)
  input.addEventListener('change', () => {
    const file = input.files?.[0]
    if (file === undefined) return
    const reader = new FileReader()
    reader.addEventListener('load', () => { applyImported(String(reader.result)) })
    reader.readAsText(file)
    input.value = ''
  })
}

async function renderQuizInto(docRoot, lessonId, getState, applyQuizScore) {
  const questions = QUIZ_BANK[lessonId]
  if (questions === undefined || docRoot === null) return

  const section = document.createElement('section')
  section.className = 'dsh-quiz'
  section.setAttribute('aria-labelledby', 'dsh-quiz-title')

  const heading = document.createElement('h2')
  heading.id = 'dsh-quiz-title'
  heading.textContent = `自测题（${questions.length} 题，即时判分）`
  section.append(heading)

  const form = document.createElement('form')
  for (const question of questions) {
    const fieldset = document.createElement('fieldset')
    const legend = document.createElement('legend')
    legend.textContent = question.q
    fieldset.append(legend)
    question.options.forEach((optionText, index) => {
      const label = document.createElement('label')
      const radio = document.createElement('input')
      radio.type = 'radio'
      radio.name = 'dsh-quiz-' + question.id
      radio.value = String(index)
      label.append(radio, document.createTextNode(' ' + optionText))
      fieldset.append(label)
    })
    const feedback = document.createElement('span')
    feedback.className = 'explain'
    feedback.hidden = true
    fieldset.append(feedback)
    form.append(fieldset)
  }

  const submit = document.createElement('button')
  submit.type = 'submit'
  submit.textContent = '提交判分'
  submit.className = 'button button-primary'
  form.append(submit)

  form.addEventListener('submit', event => {
    event.preventDefault()
    const answers = {}
    for (const question of questions) {
      const chosen = form.querySelector(`input[name="dsh-quiz-${question.id}"]:checked`)
      answers[question.id] = chosen === null ? null : Number(chosen.value)
    }
    const verdict = gradeAnswers(questions, answers)
    verdict.results.forEach((result, index) => {
      const fieldset = form.children[index]
      const feedback = fieldset.querySelector('.explain')
      feedback.hidden = false
      feedback.textContent = (result.pass ? '✔ 答对。' : '✘ 答错。') + ' '
        + questions[index].explain + '（出处：' + questions[index].source + '）'
      feedback.classList.add(result.pass ? 'result-pass' : 'result-fail')
    })
    submit.replaceWith(Object.assign(document.createElement('p'), {
      className: verdict.score === verdict.total ? 'result-pass' : '',
      textContent: `得分 ${verdict.score}/${verdict.total}。可以改选项重新判分。`,
    }))
    applyQuizScore(lessonId, verdict.score, verdict.total)
    section.scrollIntoView({ block: 'nearest' })
  })

  section.append(form)
  docRoot.append(section)
}

function initialize() {
  const lessonId = normalizeLessonId(location.pathname)
  if (lessonId === null) return
  const docRoot = document.querySelector('.vp-doc') ?? document.querySelector('main')
  if (docRoot === null) return

  const storage = createStorage()
  let state = loadState(storage)

  injectStyles()
  const { pill, toggle, exportLink, importLabel, status } = buildWidget(state, lessonId)
  document.body.append(pill)

  const persist = () => saveState(storage, state)
  toggle.addEventListener('click', () => {
    if (state.lessons[lessonId]?.done === true) {
      delete state.lessons[lessonId]
      toggle.textContent = '标记本课已读'
      toggle.dataset.done = 'false'
      toggle.classList.remove('done')
    } else {
      state = markDone(state, lessonId, new Date().toISOString())
      toggle.textContent = '✓ 本课已读（点击撤销）'
      toggle.dataset.done = 'true'
      toggle.classList.add('done')
    }
    persist()
    status.textContent = summarize(state).doneLessons + ' 课已读完'
    const counter = pill.querySelector('.count')
    if (counter !== null) counter.textContent = `已读 ${summarize(state).doneLessons} 课`
  })

  wireExport(exportLink, () => state)
  wireImport(importLabel, text => {
    const imported = parseProgress(text)
    state = mergeProgress(state, imported)
    persist()
    status.textContent = summarize(state).doneLessons + ' 课已读完（导入完成）'
  })

  renderQuizInto(docRoot, lessonId, () => state, (id, score, total) => {
    state = recordQuiz(state, id, score, total, new Date().toISOString())
    persist()
  }).catch(() => {
    // 自测题渲染失败不影响正文阅读和进度记录。
  })
}

// VitePress 是单页应用：路由切换不会重载页面，用 MutationObserver 盯正文替换。
// 每次进入新的课程页就先拆掉旧组件再重建，否则 pill 上还挂着上一课的 lessonId。
// 整个自动初始化必须待在浏览器守卫里：lab-modules-import-without-dom 门禁会在
// Node 里导入本文件，模块顶层碰 document 会直接失败。
if (typeof document !== 'undefined') {
  let initTimer = 0
  const observer = new MutationObserver(() => {
    clearTimeout(initTimer)
    initTimer = setTimeout(() => {
      document.getElementById(WIDGET_ID)?.remove()
      if (normalizeLessonId(location.pathname) === null) return
      initialize()
    }, 120)
  })

  initialize()
  observer.observe(document.body, { childList: true, subtree: true })
}
