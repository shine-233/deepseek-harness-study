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
import {
  dueItems,
  mergeReview,
  parseReview,
  recordAttempt,
  REVIEW_STORAGE_KEY,
  serializeReview,
  upcomingCount,
} from './study-review-core.js'
import { allQuestionsFor, gradeAnswers, shuffleQuiz } from './study-quiz.js'
// 代码格挂载器：导入即自注册 MutationObserver，负责 js-run 围栏块的替换。
import './study-code-cell.js'

const STORAGE_KEY = 'dsh-study-progress-v2'
const WIDGET_ID = 'dsh-progress-pill'

/** localStorage 在隐私模式或 file:// 下可能抛错：读写都包住，坏掉时退化为内存态。 */
function createStorage(storageKey) {
  let memory = null
  const available = (() => {
    try {
      window.localStorage.setItem(storageKey + '.probe', '1')
      window.localStorage.removeItem(storageKey + '.probe')
      return true
    } catch {
      return false
    }
  })()
  return {
    available,
    read() {
      if (!available) return memory
      try { return window.localStorage.getItem(storageKey) } catch { return memory }
    },
    write(text) {
      if (available) {
        try { window.localStorage.setItem(storageKey, text); return } catch { memory = text }
      } else {
        memory = text
      }
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

function loadReview(storage) {
  return parseReview(storage.read())
}

function saveReview(storage, review) {
  storage.write(serializeReview(review))
  return review
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

function buildWidget(state, lessonId, reviewHref, reviewLabel) {
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

  const labsLink = document.createElement('a')
  labsLink.textContent = '实验室'
  labsLink.href = siteBase() + 'study-labs.html'
  labsLink.target = '_blank'
  labsLink.rel = 'noreferrer'

  const reviewLink = document.createElement('a')
  reviewLink.textContent = reviewLabel
  reviewLink.href = reviewHref
  // 独立页不是 VitePress 路由：不加 target 时站内点击会被 SPA 路由接住，
  // 剥掉 .html 后渲染成客户端 404（错题本此前一直如此）。
  reviewLink.target = '_blank'
  reviewLink.rel = 'noreferrer'

  pill.append(toggle, count, labsLink, exportLink, importLabel, reviewLink)

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

async function renderQuizInto(docRoot, lessonId, getState, applyQuizScore, applyAttempt, seed) {
  const bank = allQuestionsFor(lessonId)
  if (bank === undefined || bank.length === 0 || docRoot === null) return
  const questions = seed === undefined ? bank : shuffleQuiz(bank, seed)

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
      applyAttempt(lessonId, questions[index].id, result.pass)
      const fieldset = form.children[index]
      const feedback = fieldset.querySelector('.explain')
      feedback.hidden = false
      feedback.textContent = (result.pass ? '✔ 答对。' : '✘ 答错。') + ' '
        + questions[index].explain + '（出处：' + questions[index].source + '）'
      feedback.classList.add(result.pass ? 'result-pass' : 'result-fail')
    })
    submit.replaceWith(Object.assign(document.createElement('p'), {
      className: verdict.score === verdict.total ? 'result-pass' : '',
      textContent: `得分 ${verdict.score}/${verdict.total}。这轮不再重判；想换一套题就点下面再练一轮。`,
    }))
    // 通知吉祥物伴侣：满分有小庆祝，错题给鼓励台词。
    document.dispatchEvent(new CustomEvent('dsh-study-delight', {
      detail: { kind: 'quiz', score: verdict.score, total: verdict.total },
    }))
    const again = document.createElement('button')
    again.type = 'button'
    again.textContent = '再练一轮（题目与选项重新打乱）'
    again.className = 'button'
    again.addEventListener('click', () => {
      section.remove()
      void renderQuizInto(docRoot, lessonId, getState, applyQuizScore, applyAttempt,
        Math.floor(Math.random() * 0x7FFFFFFF)).catch(() => {})
    })
    section.append(again)
    applyQuizScore(lessonId, verdict.score, verdict.total)
    section.scrollIntoView({ block: 'nearest' })
  })

  section.append(form)
  docRoot.append(section)
}

/** 站点前缀：主题在注入脚本前写进 window；直接打开 lab 页时回退到根路径。 */
function siteBase() {
  if (typeof window === 'undefined') return '/'
  const baked = window.__DSH_STUDY_BASE__
  return typeof baked === 'string' && baked.length > 0 ? baked : '/'
}

function initialize() {
  const lessonId = normalizeLessonId(location.pathname)
  if (lessonId === null) return
  const docRoot = document.querySelector('.vp-doc') ?? document.querySelector('main')
  if (docRoot === null) return

  const storage = createStorage(STORAGE_KEY)
  let state = loadState(storage)
  const reviewStorage = createStorage(REVIEW_STORAGE_KEY)
  let reviewState = loadReview(reviewStorage)

  injectStyles()
  const dueNow = dueItems(reviewState, new Date().toISOString()).length
  const upcoming = upcomingCount(reviewState, new Date().toISOString())
  const reviewLabel = '错题本' + (dueNow + upcoming > 0 ? '（' + String(dueNow + upcoming) + '）' : '')
  const { pill, toggle, exportLink, importLabel, status } = buildWidget(
    state,
    lessonId,
    siteBase() + 'study-review.html',
    reviewLabel,
  )
  document.body.append(pill)

  const persist = () => saveState(storage, state)
  const persistReview = () => saveReview(reviewStorage, reviewState)
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
      // 通知吉祥物伴侣：盖一枚虚拟邮票。
      document.dispatchEvent(new CustomEvent('dsh-study-delight', { detail: { kind: 'done', lessonId } }))
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
  }, (id, qid, pass) => {
    reviewState = recordAttempt(reviewState, id, qid, pass, new Date().toISOString())
    persistReview()
    const counter = pill.querySelector('a[href$="study-review.html"]')
    const total2 = dueItems(reviewState, new Date().toISOString()).length
      + upcomingCount(reviewState, new Date().toISOString())
    if (counter !== null) counter.textContent = '错题本（' + String(total2) + '）'
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

  // 等 Vue 完成 hydration 再注入非受控节点：load 之后多等两帧，
  // 避免水合期间改写 .vp-doc 触发 "Hydration completed but contains mismatches"。
  const startWhenSettled = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      initialize()
      observer.observe(document.body, { childList: true, subtree: true })
    }))
  }
  if (document.readyState === 'complete') startWhenSettled()
  else addEventListener('load', startWhenSettled, { once: true })

  // [ / ] 翻上一课/下一课：路由信息以页脚 pager 链接为准，这里不维护第二份课程顺序。
  addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key !== '[' && event.key !== ']') return
    const target = event.target
    if (target instanceof HTMLElement
      && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
        || target.tagName === 'SELECT' || target.isContentEditable)) return
    const link = document.querySelector(event.key === '[' ? '.pager-link.prev' : '.pager-link.next')
    if (link === null) return
    event.preventDefault()
    location.href = link instanceof HTMLAnchorElement ? link.href : link.getAttribute('href')
  })

  // ? 呼出快捷键速查（Bruno Simon 的 Options 面板模式）：面板惰性构建，Esc 或点击关闭。
  let shortcutPanel = null
  const closeShortcuts = () => {
    if (shortcutPanel !== null) {
      shortcutPanel.remove()
      shortcutPanel = null
    }
  }
  addEventListener('keydown', event => {
    if (event.key === 'Escape') closeShortcuts()
    if (event.key !== '?') return
    const target = event.target
    if (target instanceof HTMLElement
      && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
        || target.tagName === 'SELECT' || target.isContentEditable)) return
    event.preventDefault()
    if (shortcutPanel !== null) {
      closeShortcuts()
      return
    }
    shortcutPanel = document.createElement('div')
    shortcutPanel.setAttribute('role', 'dialog')
    shortcutPanel.setAttribute('aria-label', '键盘快捷键')
    Object.assign(shortcutPanel.style, {
      position: 'fixed', insetInlineEnd: '18px', bottom: '130px', zIndex: '96',
      maxWidth: '300px', padding: '14px 16px', borderRadius: '10px',
      background: 'var(--vp-c-bg-elv)', color: 'var(--vp-c-text-1)',
      border: '1px solid var(--vp-c-border)', boxShadow: 'var(--vp-shadow-3)',
      fontSize: '13px', lineHeight: '1.7',
    })
    const rows = [
      ['[ / ]', '上一课 / 下一课'],
      ['Ctrl K', '搜索文档'],
      ['← → Home End', '实验时间轴步进（实验页内）'],
      ['?', '开合本面板'],
    ]
    for (const [keys, what] of rows) {
      const row = document.createElement('div')
      const kbd = document.createElement('kbd')
      kbd.textContent = keys
      Object.assign(kbd.style, {
        fontFamily: 'var(--vp-font-family-mono)', fontSize: '11px',
        padding: '1px 6px', borderRadius: '5px', marginRight: '8px',
        background: 'var(--vp-c-default-soft)', border: '1px solid var(--vp-c-border)',
      })
      row.append(kbd, document.createTextNode(what))
      shortcutPanel.append(row)
    }
    const close = document.createElement('button')
    close.type = 'button'
    close.textContent = '关闭'
    Object.assign(close.style, {
      marginTop: '10px', padding: '2px 10px', cursor: 'pointer',
      font: 'inherit', borderRadius: '6px',
      background: 'var(--vp-c-default-soft)', color: 'var(--vp-c-text-1)',
      border: '1px solid var(--vp-c-border)',
    })
    close.addEventListener('click', closeShortcuts)
    shortcutPanel.append(close)
    document.body.append(shortcutPanel)
  })
}
