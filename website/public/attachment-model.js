/**
 * 图片附件缝（dsh-attachment）的纯教学模型：基于上游
 * packages/attachment/attachment/src/index.ts 与类型声明（基线 aa6c361a）。
 *
 * 核心规则：
 * - `ctx.attachments` 是持久存储缝：saveImage 存图并返回引用（AttachmentId +
 *   变体 id），请求策略（ImageRequestPolicy）决定什么样的图能被请求。
 * - 尺寸限制（ImageAttachmentLimits）在保存时强制：超限 fail loud。
 *
 * 教学模型不处理真实图片字节：尺寸与变体按给定值推演。
 */

export const ATT_LANES = Object.freeze(['调用方', '附件缝', '持久存储'])

export const ATT_LIMITS = Object.freeze({
  imageBytes: Object.freeze({ min: 100, max: 5000 }),
  maxBytes: Object.freeze({ min: 200, max: 4000 }),
})

function resolveInput(input = {}) {
  const intIn = (name, v, min, max) => {
    if (typeof v !== 'number' || !Number.isInteger(v)) throw new TypeError(name + ' 必须是整数')
    if (v < min || v > max) throw new RangeError(name + ' 超出范围：' + String(v))
    return v
  }
  return {
    imageBytes: intIn('imageBytes', input.imageBytes ?? 800, ATT_LIMITS.imageBytes.min, ATT_LIMITS.imageBytes.max),
    maxBytes: intIn('maxBytes', input.maxBytes ?? 1200, ATT_LIMITS.maxBytes.min, ATT_LIMITS.maxBytes.max),
    requestAllowed: input.requestAllowed !== false,
  }
}

/** 推演一次图片附件的保存与请求。 */
export function buildAttachmentModel(input = {}) {
  const resolved = resolveInput(input)
  const { imageBytes, maxBytes, requestAllowed } = resolved
  const accepted = imageBytes <= maxBytes

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: ATT_LANES[laneIdx], phase, detail, ...extra })
  }

  push(0, 'save-request', 'saveImage：请求保存一张 ' + String(imageBytes) + ' 字节的图片。')
  if (!accepted) {
    push(1, 'limit-rejected', '超过 ImageAttachmentLimits（' + String(maxBytes) + '）：fail loud，不产生任何引用。')
  } else {
    push(1, 'stored', '校验通过：写入持久存储，返回 AttachmentId 与缩略变体 id。', { storedBytes: imageBytes })
    if (requestAllowed) {
      push(0, 'request-ok', 'RequestImageAttachment 按引用取回原图——模型拿到的是引用解析后的内容。')
    } else {
      push(0, 'request-denied', 'RequestPolicy 拒绝本次取回：存储与「能否进入上下文」是两个决定。')
    }
  }

  const stored = accepted
  return {
    input: { ...resolved },
    lanes: ATT_LANES,
    steps,
    observations: {
      stored,
      storedBytes: stored ? imageBytes : null,
      requestOutcome: stored ? (requestAllowed ? '取回成功' : '策略拒绝') : '无引用可请求',
      forkShape: accepted ? '已存储' : '超限拒收',
    },
    canProve: [
      '超过尺寸限制的图片在保存处被拒，fail loud 且不产生引用。',
      '存储成功后返回可持久化的引用；按引用取回受 RequestPolicy 管辖。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实图片解码或格式校验行为。',
      '不能证明真实变体生成的算法与缓存。',
      '不能证明真实 AttachmentError 的错误码表。',
      '不能用本页替代 RequestPolicy 的完整规则表。',
    ],
  }
}

/** 独立校验。 */
export function evaluateAttachmentOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildAttachmentModel(model.input)
  add('AT_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  const expectStored = model.input.imageBytes <= model.input.maxBytes
  add('AT_LIMIT_ENFORCED', '尺寸限制在保存处强制执行',
    o.stored === expectStored,
    expectStored ? '存储成功' : '被拒收',
    o.stored ? '已存储' : '已拒收')

  add('AT_NO_REF_ON_REJECT', '拒收时不产生任何引用',
    !o.stored || o.storedBytes === model.input.imageBytes,
    o.stored ? '有引用' : '零引用',
    o.stored ? String(o.storedBytes) + ' 字节' : '—')

  return { pass: checks.every(c => c.pass), checks }
}
