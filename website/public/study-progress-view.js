/**
 * 学习进度总览页（progress.html）的渲染层。
 *
 * 课程名单从 sitemap.xml 推导（同一事实来源，实验室每周加页也不会过期）；
 * 实验名单来自 study-progress-core.js 的 LAB_PAGE_IDS；进度来自本机 localStorage。
 * 纯函数（parseSitemapLessons / lessonRow / labRow）导出供 Node 测试；
 * DOM 与 fetch 收在浏览器守卫里。
 */

import { LAB_PAGE_IDS } from './study-progress-core.js'
import { parseProgress, summarize } from './study-progress-core.js'
import { dueItems, parseReview, REVIEW_STORAGE_KEY, upcomingCount } from './study-review-core.js'

const PROGRESS_KEY = 'dsh-study-progress-v2'

/**
 * 从 sitemap 文本推导课程名单：取 /study/lessons/ 下的 URL，解码成课件 id，
 * 按数字前缀排序。base 段（/deepseek-harness-study/）原样容忍。
 *
 * @param {string} xmlText
 * @returns {{ id: string, href: string }[]} 排序后的课程名单。
 */
export function parseSitemapLessons(xmlText) {
  const ids = new Map()
  for (const match of String(xmlText ?? '').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    let url
    try { url = decodeURIComponent(match[1]) } catch { url = match[1] }
    const marker = url.indexOf('/study/lessons/')
    if (marker < 0) continue
    const last = url.slice(marker + '/study/lessons/'.length).replace(/\.html$/, '').replace(/\/$/, '')
    if (last === '' || last === 'index') continue
    if (!ids.has(last)) ids.set(last, url)
  }
  const numeric = id => Number(/^\d+/.exec(id)?.[0] ?? 9999)
  return [...ids.entries()]
    .map(([id, url]) => ({ id, href: url }))
    .sort((a, b) => numeric(a.id) - numeric(b.id) || a.id.localeCompare(b.id))
}

/**
 * 一节课的展示行：done / 自测成绩 / 未读三态。
 *
 * @param {{ id: string, href: string }} lesson
 * @param {{ lessons: Record<string, {done: true, ts: string}>, quizzes: Record<string, {score: number, total: number, ts: string}> }} state
 */
export function lessonRow(lesson, state) {
  const done = state.lessons[lesson.id]?.done === true
  const quiz = state.quizzes[lesson.id]
  return {
    id: lesson.id,
    href: lesson.href,
    done,
    quiz: quiz ? `${quiz.score}/${quiz.total}` : null,
    perfect: quiz !== undefined && quiz.score === quiz.total,
  }
}

/**
 * 一个实验室的展示行。
 *
 * @param {string} labId - LAB_PAGE_IDS 里的 id（如 'turn-flow'）。
 * @param {{ labs: Record<string, {done: true, ts: string}> }} state
 */
export function labRow(labId, state) {
  return { id: labId, href: `./${labId}-lab.html`, done: state.labs['lab:' + labId]?.done === true }
}

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
    read() {
      if (!available) return memory
      try { return window.localStorage.getItem(storageKey) } catch { return memory }
    },
  }
}

function renderRow(target, row, kind) {
  const li = document.createElement('li')
  li.className = 'progress-row'
  li.dataset.done = String(row.done)
  const link = document.createElement('a')
  link.href = row.href
  const state = document.createElement('span')
  state.className = 'progress-state'
  state.textContent = row.done ? '✓' : '·'
  const name = document.createElement('span')
  name.className = 'progress-name'
  name.textContent = kind === 'lesson' ? row.id : row.id + '-lab'
  const quizBadge = document.createElement('span')
  quizBadge.className = 'progress-quiz'
  quizBadge.textContent = row.quiz ?? ''
  link.append(state, name)
  li.append(link)
  if (kind === 'lesson' && row.quiz !== null) li.append(quizBadge)
  if (row.done) li.title = '已读完'
  target.append(li)
}

async function initialize() {
  const storage = createStorage(PROGRESS_KEY)
  const state = parseProgress(storage.read())
  const reviewStorage = createStorage(REVIEW_STORAGE_KEY)
  const review = parseReview(reviewStorage.read())
  const now = new Date().toISOString()

  const summary = summarize(state)
  const setSum = (id, value) => {
    const node = document.getElementById(id)
    if (node !== null) node.textContent = String(value)
  }
  setSum('sum-lessons', summary.doneLessons)
  setSum('sum-labs', summary.doneLabs)
  setSum('sum-perfect', summary.perfectQuizzes)
  setSum('sum-due', dueItems(review, now).length + '（待来 ' + upcomingCount(review, now) + '）')

  // 课程名单：sitemap 推导；失败时退化为「只显示标记过的课」。
  let lessons = []
  try {
    const xml = await fetch('./sitemap.xml').then(response => response.text())
    lessons = parseSitemapLessons(xml)
  } catch {
    document.getElementById('lesson-fallback')?.removeAttribute('hidden')
    for (const id of Object.keys(state.lessons)) {
      lessons.push({ id, href: './study/lessons/' + encodeURIComponent(id) + '.html' })
    }
  }
  const lessonGrid = document.getElementById('lesson-grid')
  const seen = new Set()
  for (const lesson of lessons) {
    if (seen.has(lesson.id)) continue
    seen.add(lesson.id)
    renderRow(lessonGrid, lessonRow(lesson, state), 'lesson')
  }

  const labGrid = document.getElementById('lab-grid')
  for (const labId of LAB_PAGE_IDS) {
    renderRow(labGrid, labRow(labId, state), 'lab')
  }
}

if (typeof document !== 'undefined') {
  const start = () => { initialize().catch(() => {}) }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true })
  else start()
}
