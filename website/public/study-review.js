/**
 * 错题本页面层。
 *
 * 职责只有两件：把到期队列渲染成可操作的卡片；把「记住了 / 还没记住」
 * 写回本地存储。排程与校验都在 study-review-core.js 里，那里是纯函数，
 * 可以在 Node 单测。数据不出本机：唯一的网络请求是没有，唯一的写出是
 * localStorage 和用户主动点导出。
 */

import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'
import {
  dueItems,
  parseReview,
  REVIEW_STORAGE_KEY,
  recordAttempt,
  serializeReview,
  upcomingCount,
} from './study-review-core.js'
import { QUIZ_BANK } from './study-quiz.js'

/** 页面目录即站点根：部署在子路径下时同样成立。Node 导入时没有 location，惰性求值。 */
function pageDir() {
  return location.pathname.replace(/[^/]*$/, '')
}

function requireElements(elements) {
  return Object.values(elements).every(value => value instanceof HTMLElement)
}

/** 课程页在站点里的地址：由题库的 source 字段（study/xx.md#锚点）推导。 */
function lessonHref(lessonId, source) {
  const hashIndex = source.indexOf('#')
  const anchor = hashIndex >= 0 ? source.slice(hashIndex) : ''
  return pageDir() + 'study/lessons/' + lessonId + '.html' + anchor
}

function findQuestion(lessonId, qid) {
  const bank = QUIZ_BANK[lessonId]
  if (bank === undefined) return null
  return bank.find(question => question.id === qid) ?? null
}

/** 课名形如 '04-Agent与Turn流程'，拆成「第 04 课 · Agent 与 Turn 流程」。 */
function lessonLabel(lessonId) {
  const splitAt = lessonId.indexOf('-')
  if (splitAt !== 2) return lessonId
  return '第 ' + lessonId.slice(0, 2) + ' 课 · ' + lessonId.slice(3)
}

function renderMetrics(review, elements, todayIso) {
  const due = dueItems(review, todayIso)
  const total = Object.keys(review.items).length
  elements.due.textContent = String(due.length)
  elements.upcoming.textContent = String(upcomingCount(review, todayIso))
  elements.total.textContent = String(total)
  elements.emptyCard.hidden = total > 0
  if (total === 0) {
    elements.dueList.replaceChildren()
    elements.feedback.textContent = ''
    return
  }
  if (due.length === 0) {
    elements.dueList.replaceChildren()
    const calm = document.createElement('li')
    calm.className = 'review-calm'
    calm.textContent = '今天没有到期的题；下一批到期日见下面每张卡片。'
    elements.dueList.append(calm)
  }
}

function buildItemCard(item) {
  const card = document.createElement('li')
  card.className = 'review-item'
  const question = findQuestion(item.lessonId, item.qid)

  const meta = document.createElement('p')
  meta.className = 'review-meta'
  meta.textContent = lessonLabel(item.lessonId)
    + ' · 连续答对 ' + String(item.streak) + ' 次 · 到期 ' + item.due

  const body = document.createElement('details')
  const summary = document.createElement('summary')
  summary.textContent = question === null ? item.qid : question.q
  body.append(summary)
  if (question !== null) {
    const options = document.createElement('ul')
    question.options.forEach((optionText, index) => {
      const li = document.createElement('li')
      li.textContent = (index === question.answer ? '✓ ' : '') + optionText
      if (index === question.answer) li.className = 'review-correct'
      options.append(li)
    })
    const explain = document.createElement('p')
    explain.textContent = question.explain + '（出处：' + question.source + '）'
    body.append(options, explain)
  }

  const actions = document.createElement('div')
  actions.className = 'review-actions'
  const pass = document.createElement('button')
  pass.type = 'button'
  pass.className = 'button button-primary'
  pass.textContent = '记住了'
  pass.dataset.action = 'pass'
  const fail = document.createElement('button')
  fail.type = 'button'
  fail.className = 'button button-quiet'
  fail.textContent = '还没记住，明天再见'
  fail.dataset.action = 'fail'
  actions.append(pass, fail)

  card.append(meta, body, actions)
  if (question !== null) {
    const link = document.createElement('a')
    link.href = lessonHref(item.lessonId, question.source)
    link.textContent = '回课文重读这一节 →'
    link.className = 'review-source'
    card.append(link)
  }
  return card
}

function initialize() {
  const elements = {
    due: document.getElementById('metric-due'),
    upcoming: document.getElementById('metric-upcoming'),
    total: document.getElementById('metric-total'),
    feedback: document.getElementById('review-feedback'),
    emptyCard: document.getElementById('empty-card'),
    dueList: document.getElementById('due-list'),
    dueTitle: document.getElementById('due-title'),
    exportButton: document.getElementById('export-review'),
    importInput: document.getElementById('import-review'),
  }
  if (!requireElements(elements)) return

  let review = (() => {
    try { return parseReview(localStorage.getItem(REVIEW_STORAGE_KEY)) } catch { return parseReview(null) }
  })()

  const persist = () => {
    try { localStorage.setItem(REVIEW_STORAGE_KEY, serializeReview(review)) } catch {
      // 写不进去（隐私模式等）时页面仍可用，只是刷新后丢失。
    }
  }

  const rerender = () => {
    const todayIso = new Date().toISOString()
    renderMetrics(review, elements, todayIso)
    const due = dueItems(review, todayIso)
    for (const item of due) {
      const card = buildItemCard(item)
      card.addEventListener('click', event => {
        const action = event.target?.dataset?.action
        if (action !== 'pass' && action !== 'fail') return
        review = recordAttempt(review, item.lessonId, item.qid, action === 'pass', new Date().toISOString())
        persist()
        elements.feedback.textContent = action === 'pass'
          ? '已记录：下次见面隔得更远。'
          : '已记录：这道题明天再来。'
        rerender()
      })
      elements.dueList.append(card)
    }
  }

  elements.exportButton.addEventListener('click', () => {
    try {
      const blob = new Blob([serializeReview(review)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'dsh-study-review.json'
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
      elements.feedback.textContent = '已导出错题名单；导入到另一台设备即可接着复习。'
    } catch {
      elements.feedback.textContent = '导出失败：浏览器拒绝了下载。'
    }
  })

  elements.importInput.addEventListener('change', () => {
    const file = elements.importInput.files?.[0]
    if (file === undefined) return
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const imported = parseReview(String(reader.result))
      const known = Object.keys(imported.items).length
      review = imported
      persist()
      rerender()
      elements.feedback.textContent = known > 0
        ? '已导入 ' + String(known) + ' 条错题记录。'
        : '这份文件里没有可识别的错题记录。'
    })
    reader.readAsText(file)
    elements.importInput.value = ''
  })

  rerender()

  document.getElementById('back-to-course')?.setAttribute('href', pageDir() + 'index.html')
  document.getElementById('course-link')?.setAttribute('href', pageDir() + 'index.html')
  const toggle = document.getElementById('theme-toggle')
  if (toggle instanceof HTMLButtonElement) installThemeToggle(toggle, name => icon(name, 15))
}

if (typeof document !== 'undefined') {
  initialize()
}
