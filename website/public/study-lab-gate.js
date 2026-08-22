/**
 * 预测题门控：先写下预测，再解锁控件。
 *
 * 这不是装饰。先看到结果再解释它，和先押注再看结果，学到的东西不一样——后者会
 * 暴露你以为自己懂但其实不懂的地方。参考站用这个机制门控滑杆，本模块把它做成
 * 各实验页共用的一层。
 *
 * 门控只挡「改参数重跑」这类探索性控件，不挡阅读：图、表格、oracle、证据边界
 * 从一开始就完整可见。答错也解锁——目的是让你先表态，不是考试。
 *
 * 预测本身仍不落存储：重看这一页时应当重新押注。但提交或跳过成功会把当前实验页
 * 记入学习进度的 labs 表（键 dsh-study-progress-v2），作为「亲手做过这个实验」的
 * 证据；localStorage 不可用时静默跳过，只影响记录，不影响解锁。
 */

import { emptyState, markLabDone, mergeProgress, normalizeLessonId, parseProgress, serializeProgress } from './study-progress-core.js'

const PROGRESS_KEY = 'dsh-study-progress-v2'

/**
 * 把一个实验记入进度。解析已存数据后按时间戳合并写入，防止覆盖已有课程与自测
 * 记录；隐私模式或坏数据时安静放弃。
 *
 * @param labId 形如 'lab:turn-flow' 的实验标识。
 * @returns 是否成功写入了存储。
 */
function rememberLab(labId) {
  try {
    const stored = parseProgress(window.localStorage.getItem(PROGRESS_KEY))
    const delta = markLabDone(emptyState(), labId, new Date().toISOString())
    window.localStorage.setItem(PROGRESS_KEY, serializeProgress(mergeProgress(stored, delta)))
    return true
  } catch {
    // localStorage 抛错只发生在存储不可用的环境里；记录是增强，解锁不能依赖它。
    return false
  }
}

/**
 * 装一个预测题门控。
 *
 * @param options.form 含单选项的表单元素。
 * @param options.locked 被门控的控件容器；解锁前设为 inert。
 * @param options.feedback 反馈文本节点。
 * @param options.correct 正确选项的 value；用于给出对错提示，不影响是否解锁。
 * @param options.explain value 到解释文字的映射，答完后显示。
 * @returns 读取当前是否已解锁。
 */
export function installPredictionGate({ form, locked, feedback, correct, explain = {} }) {
  if (!(form instanceof HTMLElement) || !(locked instanceof HTMLElement)) {
    return () => true
  }

  let unlocked = false
  let progressNoted = false

  // 记录成功才在状态行追加一句；失败或非实验页时保持原文案。
  const noteProgress = () => {
    if (progressNoted) return ''
    if (typeof location === 'undefined') return ''
    const labId = normalizeLessonId(location.pathname)
    if (labId === null || !rememberLab(labId)) return ''
    progressNoted = true
    return ' 已记入学习进度。'
  }

  const lock = () => {
    // inert 同时挡住指针、键盘和辅助技术；只设 disabled 会让屏幕阅读器
    // 仍然念出一堆不可用的控件。
    locked.inert = true
    locked.setAttribute('aria-describedby', form.id)
    locked.dataset.gated = 'locked'
  }

  const unlock = (chosen) => {
    unlocked = true
    locked.inert = false
    locked.removeAttribute('aria-describedby')
    locked.dataset.gated = 'unlocked'
    const verdict = chosen === correct ? '预测正确。' : '预测和模型结果不一致。'
    const detail = explain[chosen] ?? ''
    feedback.dataset.tone = chosen === correct ? 'success' : 'error'
    feedback.textContent = verdict + (detail === '' ? '' : ' ' + detail) + ' 控件已解锁，去改参数看它怎么变。' + noteProgress()
  }

  lock()

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const chosen = new FormData(form).get('prediction')
    if (chosen === null) {
      feedback.dataset.tone = 'error'
      feedback.textContent = '先选一个再提交。'
      return
    }
    unlock(String(chosen))
  })

  // 明确的「跳过」出口：门控是教学手段，不该变成一堵墙。
  const skip = form.querySelector('[data-gate-skip]')
  if (skip !== null) {
    skip.addEventListener('click', () => {
      unlocked = true
      locked.inert = false
      locked.dataset.gated = 'skipped'
      feedback.dataset.tone = 'neutral'
      feedback.textContent = '已跳过预测，控件解锁。回头想试的话，刷新页面就能再来一次。' + noteProgress()
    })
  }

  return () => unlocked
}
