/**
 * 学习实验页共享的「状态链接」原语。
 *
 * 实验输入写进 URL hash（#state=…），刷新、复制链接、换设备都能带回同一份输入；
 * 不用 localStorage，不写文件，不联网。编码、解码和校验都是纯函数，在 Node 里
 * 单独测试；页面只做薄接线。
 *
 * schema 的每个键声明一种约束：
 *   'string'                  任意字符串
 *   { enum: [...] }           必须是列出的值之一
 *   { integerRange: [a, b] }  整数且 a ≤ 值 ≤ b
 */

const STATE_SEGMENT = 'state='

/** 按 schema 的键序挑字段再序列化：同样的输入永远得到同一串字节。 */
export function encodeState(value, schema) {
  const canonical = {}
  for (const key of Object.keys(schema)) canonical[key] = value[key]
  return encodeURIComponent(JSON.stringify(canonical))
}

/**
 * 校验并还原本地字符串。
 *
 * 返回 { ok: true, value } 或 { ok: false, error }；坏输入是常态而不是异常，
 * 所以这里不抛错，让调用方决定怎么提示。
 */
export function decodeState(text, schema) {
  let parsed
  try {
    parsed = JSON.parse(decodeURIComponent(text))
  } catch {
    return { ok: false, error: '不是有效的状态编码' }
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { ok: false, error: '状态必须是对象' }
  }
  for (const key of Object.keys(parsed)) {
    if (!(key in schema)) return { ok: false, error: '未知字段：' + key }
  }
  for (const [key, rule] of Object.entries(schema)) {
    if (!(key in parsed)) return { ok: false, error: '缺少字段：' + key }
    const verdict = checkRule(parsed[key], rule)
    if (verdict !== null) return { ok: false, error: key + verdict }
  }
  return { ok: true, value: parsed }
}

function checkRule(value, rule) {
  if (rule === 'string') {
    return typeof value === 'string' ? null : ' 不是字符串'
  }
  if (rule !== null && typeof rule === 'object' && Array.isArray(rule.enum)) {
    return rule.enum.includes(value) ? null : ' 不在允许的取值里'
  }
  if (rule !== null && typeof rule === 'object' && Array.isArray(rule.integerRange)) {
    const [min, max] = rule.integerRange
    if (!Number.isInteger(value)) return ' 不是整数'
    return value >= min && value <= max ? null : ' 超出范围'
  }
  return ' 的校验规则无效'
}

/**
 * 从 location.hash 读状态。没有 state 段时返回 null（首次打开是正常情况）；
 * 有但损坏时返回 { ok: false }，由页面决定回退到默认输入。
 */
export function readStateFromHash(hash, schema) {
  const segments = String(hash ?? '').replace(/^#/, '').split('&').filter(Boolean)
  const segment = segments.find(part => part.startsWith(STATE_SEGMENT))
  if (segment === undefined) return null
  return decodeState(segment.slice(STATE_SEGMENT.length), schema)
}

/** 把状态写进 hash，保留其它段（页内锚点等），返回带 # 的完整新 hash。 */
export function writeStateToHash(hash, value, schema) {
  const segments = String(hash ?? '').replace(/^#/, '').split('&').filter(Boolean)
  const kept = segments.filter(part => !part.startsWith(STATE_SEGMENT))
  kept.push(STATE_SEGMENT + encodeState(value, schema))
  return '#' + kept.join('&')
}
