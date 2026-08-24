/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */
import { bootSmallSeam } from './small-seams-runtime.js'

if (typeof document !== 'undefined') {
  bootSmallSeam('feedback', {
    correct: 'one',
    explain: {
      'one': 'FB_LIFECYCLE_BOUND 校验钉住了它：upsert 语义让重复评价收敛为一条记录。',
      'three': '追加式会让「撤销反馈」变成猜谜；设计选择了更新。',
      'zero': '反馈随操作即时持久化，不是批处理。',
      },
    hint: '线索：如果允许追加，「取消反馈」该怎么表达？',
  })
}
