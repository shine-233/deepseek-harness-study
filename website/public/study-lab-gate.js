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
 * 选择不写 localStorage：预测是一次性的学习动作，记住它反而让重看这一页时
 * 跳过了这一步。
 */

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
    feedback.textContent = verdict + (detail === '' ? '' : ' ' + detail) + ' 控件已解锁，去改参数看它怎么变。'
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
      feedback.textContent = '已跳过预测，控件解锁。回头想试的话，刷新页面就能再来一次。'
    })
  }

  return () => unlocked
}
