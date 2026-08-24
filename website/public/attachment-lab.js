/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */
import { bootSmallSeam } from './small-seams-runtime.js'

if (typeof document !== 'undefined') {
  bootSmallSeam('attachment', {
    correct: 'no-ref',
    explain: {
      'no-ref': 'AT_NO_REF_ON_REJECT 校验钉住了它：拒收时零引用，绝不留下半个句柄。',
      'ref': '截断不属于这里——尺寸限制是保存门槛，不是压缩器。',
      'error-flag': '半真半假的引用比没有更危险：设计上不给。',
      },
    hint: '线索：仓库规则「Misconfiguration fails loud」对超限输入同样生效。',
  })
}
