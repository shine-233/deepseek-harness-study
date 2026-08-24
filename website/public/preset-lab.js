/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */
import { bootSmallSeam } from './small-seams-runtime.js'

if (typeof document !== 'undefined') {
  bootSmallSeam('preset', {
    correct: 'one',
    explain: {
      'one': 'PR_MOUNT_ONCE 校验钉住了它：挂载恰好发生一次，N 个加入者共享。',
      'two': '那是「每会话一份」的旧世界；预设的存在意义就是消除这种重复。',
      'zero': '预设会真实实例化插件——只是只做一次。',
      },
    hint: '线索：顶注里的关键词是「mounted ONCE per preset」。',
  })
}
