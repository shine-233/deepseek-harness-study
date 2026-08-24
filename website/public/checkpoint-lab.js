/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */
import { bootSmallSeam } from './small-seams-runtime.js'

if (typeof document !== 'undefined') {
  bootSmallSeam('checkpoint', {
    correct: 'zero',
    explain: {
      'zero': '本模型的持久化完全由检查点驱动：关闭即从零开始。',
      'three': '那正是启用时的行为——三个时刻各留一个锚点。',
      'four': '「崩溃前的都算」恰恰是被否定的假设：没过检查点的拍子不算数。',
      },
    hint: '线索：这个缝存在的意义就是定义「什么时候才算存上了」。',
  })
}
