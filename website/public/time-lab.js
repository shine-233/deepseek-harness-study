/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */
import { bootSmallSeam } from './small-seams-runtime.js'

if (typeof document !== 'undefined') {
  bootSmallSeam('time', {
    correct: 'kept',
    explain: {
      'kept': 'TC_DURABLE_IN_HISTORY 校验钉住了它：入册的消息随日志重放回来，开关管的是「以后还注入吗」。',
      'gone': 'durable 的意思是不可撤回——这正是第 05 课那条不变式。',
      'partial': '不存在选择性删除；要么都在，要么不再新增。',
    },
    hint: '线索：「durable 用户消息」这五个字怎么读？',
  })
}
