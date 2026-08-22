/**
 * 学习进度存储的纯函数。
 *
 * 进度只回答一件事：哪些课读完了。它不包含任何用户输入的内容，所以可以放进
 * 本地存储；研究桥接页的 request/result 是隐私数据，仍然坚持显式文件、不落存储。
 *
 * 状态形状（v1）：
 *   { v: 1, lessons: { [lessonId]: { done: true, ts: ISO 字符串 } },
 *     quizzes: { [lessonId]: { score: n, total: m, ts: ISO } } }
 *
 * 所有函数都是纯函数：输入决定输出，不碰 window、localStorage 或 DOM，
 * 可以在 Node 里单独测试；DOM 层只做薄接线。
 */

export const PROGRESS_VERSION = 1

/** 从页面路径取课件标识：最后一段去掉 .html；不是课程页返回 null。 */
export function normalizeLessonId(pathname) {
  const parts = String(pathname ?? '').split('/').filter(Boolean)
  if (parts.includes('en')) return null // 英文站暂不挂中文进度组件。
  const last = parts.pop()
  if (last === undefined) return null
  const decoded = (() => { try { return decodeURIComponent(last) } catch { return last } })()
    .replace(/\.html$/, '')
  if (!decoded || decoded === 'index') return null
  // 只接受课程页：路径里必须出现 study/lessons 段。
  if (!parts.includes('lessons') || !parts.includes('study')) return null
  return decoded
}

/** 校验一条课程记录；坏数据直接丢弃而不是修复。 */
function validLessonEntry(value) {
  return typeof value === 'object' && value !== null
    && value.done === true
    && typeof value.ts === 'string'
}

/** 校验整份状态；结构不对或版本未知时返回空状态。 */
export function parseProgress(text) {
  let parsed
  try { parsed = JSON.parse(String(text ?? '')) } catch { return emptyState() }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return emptyState()
  if (parsed.v !== PROGRESS_VERSION) return emptyState()
  const out = emptyState()
  if (typeof parsed.lessons === 'object' && parsed.lessons !== null) {
    for (const [id, entry] of Object.entries(parsed.lessons)) {
      if (validLessonEntry(entry)) out.lessons[id] = { done: true, ts: String(entry.ts) }
    }
  }
  if (typeof parsed.quizzes === 'object' && parsed.quizzes !== null) {
    for (const [id, entry] of Object.entries(parsed.quizzes)) {
      if (typeof entry === 'object' && entry !== null
        && Number.isInteger(entry.score) && entry.score >= 0
        && Number.isInteger(entry.total) && entry.total > 0
        && typeof entry.ts === 'string') {
        out.quizzes[id] = { score: entry.score, total: entry.total, ts: String(entry.ts) }
      }
    }
  }
  return out
}

export function emptyState() {
  return { v: PROGRESS_VERSION, lessons: {}, quizzes: {} }
}

/** 合并导入与本地状态：同一条目取较新的时间戳。 */
export function mergeProgress(local, imported) {
  const out = emptyState()
  const sources = [local, imported]
  for (const key of ['lessons', 'quizzes']) {
    for (const source of sources) {
      for (const [id, entry] of Object.entries(source[key])) {
        const kept = out[key][id]
        if (kept === undefined || String(entry.ts) > String(kept.ts)) out[key][id] = entry
      }
    }
  }
  return out
}

/** 标记一课完成（重复标记刷新时间戳）。 */
export function markDone(state, lessonId, isoTimestamp) {
  const next = clone(state)
  next.lessons[lessonId] = { done: true, ts: isoTimestamp }
  return next
}

/** 记录一次自测成绩；只保留最好成绩。 */
export function recordQuiz(state, lessonId, score, total, isoTimestamp) {
  if (!Number.isInteger(score) || !Number.isInteger(total) || total <= 0) return clone(state)
  if (score < 0 || score > total) return clone(state)
  const next = clone(state)
  const kept = next.quizzes[lessonId]
  if (kept === undefined || score > kept.score) {
    next.quizzes[lessonId] = { score, total, ts: isoTimestamp }
  }
  return next
}

/** 汇总给小组件显示。 */
export function summarize(state) {
  return {
    doneLessons: Object.keys(state.lessons).length,
    quizLessons: Object.keys(state.quizzes).length,
    perfectQuizzes: Object.values(state.quizzes).filter(q => q.score === q.total).length,
  }
}

/** 导出文本：键序固定，同样的状态永远得到同一串字节。 */
export function serializeProgress(state) {
  const canonical = { v: PROGRESS_VERSION, lessons: sortKeys(state.lessons), quizzes: sortKeys(state.quizzes) }
  return JSON.stringify(canonical)
}

function sortKeys(object) {
  const out = {}
  for (const key of Object.keys(object).sort()) out[key] = object[key]
  return out
}

function clone(state) {
  return {
    v: PROGRESS_VERSION,
    lessons: { ...state.lessons },
    quizzes: { ...state.quizzes },
  }
}
