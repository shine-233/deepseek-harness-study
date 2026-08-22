/**
 * 错题本与复习排程的纯函数。
 *
 * 自测答错的题进入本子；之后每答对一次，复习间隔拉长一档。数据只回答
 * 「哪道题错过、下次该什么时候再见」，不包含任何用户输入的内容，
 * 所以可以放进本地存储。与学习进度（dsh-study-progress）分开存：
 * 两份数据的生命周期不同，进度可以清空而错题历史值得保留。
 *
 * 状态形状（v1）：
 *   { v: 1, items: { [`${lessonId}|${qid}`]: { lessonId, qid, ts, streak, due } } }
 *
 * ts 是最后一次作答时刻（完整 ISO 串）；due 是下次应复习的日期（YYYY-MM-DD，
 * 按天比较，避免时区和时分秒的噪声）。streak 是连续答对次数。
 * 所有函数都是纯函数：不碰 window、localStorage 或 DOM，可以在 Node 里单独测试。
 */

export const REVIEW_VERSION = 1
export const REVIEW_STORAGE_KEY = 'dsh-study-review-v1'

/** 连续答对 n 次后的间隔天数：1、3、7、16，之后停在 16。 */
export const REVIEW_INTERVALS = Object.freeze([1, 3, 7, 16])

export function emptyReview() {
  return { v: REVIEW_VERSION, items: {} }
}

function itemKey(lessonId, qid) {
  return lessonId + '|' + qid
}

function validItem(value) {
  return typeof value === 'object' && value !== null
    && typeof value.lessonId === 'string' && value.lessonId.length > 0
    && typeof value.qid === 'string' && value.qid.length > 0
    && Number.isInteger(value.streak) && value.streak >= 0
    && typeof value.ts === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(String(value.due))
}

/** 校验整份状态；结构不对或版本未知时返回空状态。坏条目逐条丢弃而不是修复。 */
export function parseReview(text) {
  let parsed
  try { parsed = JSON.parse(String(text ?? '')) } catch { return emptyReview() }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return emptyReview()
  if (parsed.v !== REVIEW_VERSION) return emptyReview()
  const out = emptyReview()
  if (typeof parsed.items === 'object' && parsed.items !== null) {
    for (const [key, entry] of Object.entries(parsed.items)) {
      if (!validItem(entry)) continue
      if (itemKey(entry.lessonId, entry.qid) !== key) continue
      out.items[key] = {
        lessonId: String(entry.lessonId),
        qid: String(entry.qid),
        streak: Number(entry.streak),
        ts: String(entry.ts),
        due: String(entry.due),
      }
    }
  }
  return out
}

/** 导出文本：键序固定，同样的状态永远得到同一串字节。 */
export function serializeReview(review) {
  const items = {}
  for (const key of Object.keys(review.items).sort()) items[key] = review.items[key]
  return JSON.stringify({ v: REVIEW_VERSION, items })
}

/** 合并导入与本机状态：同一条目取较新的 ts。 */
export function mergeReview(local, imported) {
  const out = emptyReview()
  for (const source of [local, imported]) {
    for (const [key, entry] of Object.entries(source.items)) {
      const kept = out.items[key]
      if (kept === undefined || String(entry.ts) > String(kept.ts)) out.items[key] = entry
    }
  }
  return out
}

function dateOnly(isoTimestamp) {
  const date = new Date(isoTimestamp)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

function addDays(dayStamp, days) {
  const date = new Date(dayStamp + 'T00:00:00Z')
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

/**
 * 记录一道题的一次作答。
 *
 * 答错：进入或重置本子，明天再见（streak 归零）。
 * 答对且题在本子里：streak 加一并按间隔推后 due。
 * 答对且题从没错过：不改状态——没错题就没有复习义务。
 */
export function recordAttempt(review, lessonId, qid, pass, isoTimestamp) {
  const next = { v: REVIEW_VERSION, items: { ...review.items } }
  const key = itemKey(lessonId, qid)
  const kept = next.items[key]
  if (pass) {
    if (kept === undefined) return next
    const streak = kept.streak + 1
    const interval = REVIEW_INTERVALS[Math.min(streak - 1, REVIEW_INTERVALS.length - 1)]
    next.items[key] = { ...kept, streak, ts: isoTimestamp, due: addDays(dateOnly(isoTimestamp), interval) }
    return next
  }
  const day = dateOnly(isoTimestamp)
  if (day === null) return next
  next.items[key] = {
    lessonId,
    qid,
    streak: 0,
    ts: isoTimestamp,
    due: addDays(day, REVIEW_INTERVALS[0]),
  }
  return next
}

/** 取出到期的条目（due ≤ 今天），按到期日升序、同日按课名和题号排序。 */
export function dueItems(review, todayIso) {
  const today = dateOnly(todayIso)
  if (today === null) return []
  return Object.values(review.items)
    .filter(item => item.due <= today)
    .sort((a, b) => a.due.localeCompare(b.due) || a.lessonId.localeCompare(b.lessonId) || a.qid.localeCompare(b.qid))
}

/** 还没到期的条目数。 */
export function upcomingCount(review, todayIso) {
  const today = dateOnly(todayIso)
  if (today === null) return 0
  return Object.values(review.items).filter(item => item.due > today).length
}
