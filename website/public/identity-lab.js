/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */
import { bootSmallSeam } from './small-seams-runtime.js'

if (typeof document !== 'undefined') {
  bootSmallSeam('identity', {
    correct: 'memo',
    explain: {
      'memo': 'ID_PROCESS_MEMO 校验钉住了它：一个进程只碰一次磁盘。',
      'fresh': '那是下一次启动的行为；运行中的进程有记忆。',
      'error': '缺失文件在首次读取时会铸造新 id，永远不会抛错。',
      },
    hint: '线索：顶注说结果是「memoized per resolved file path」。',
  })
}
