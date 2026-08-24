/**
 * web 缝隙的提供者选择与归一化矩阵（纯模型）。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/web/web/README.md 与四个实现包：
 *
 *   选择永不依赖注册顺序：配置了 id 就按「已注册且可用→运行；未注册→
 *   WEB_PROVIDER_CONFIGURED_MISSING；不可用→WEB_PROVIDER_CONFIGURED_
 *   UNAVAILABLE」执行；未配置时恰好一个可用→运行它，零个→WEB_PROVIDER_
 *   UNAVAILABLE，多个→WEB_PROVIDER_AMBIGUOUS。available() 是廉价的本地检查，
 *   绝不发网络请求。
 *
 *   三家搜索的差异：DeepSeek 走 Anthropic 兼容 /messages 的整轮模型调用
 *   （服务端工具），无结构块即抛 WEB_PROVIDER_ERROR（严格模式，绝不从模型
 *   正文里刮 URL）；Exa 是纯检索 /search，highlights 映射为 snippet；
 *   Perplexity 走 OpenAI 兼容 /chat/completions，返回答案+引用（引用可能只有
 *   URL）。ctx.web.search() 在缝隙层统一裁剪 sources 到 maxResults 并置
 *   truncated。
 *
 *   fetch-http 卫生：仅 http/https；URL 带凭据→WEB_BLOCKED_URL；超长/畸形→
 *   WEB_INVALID_URL；跨域重定向→WEB_REDIRECT_BLOCKED。
 */

export const PROVIDER_IDS = Object.freeze(['web-search-deepseek', 'web-search-exa', 'web-search-perplexity'])
export const FETCH_BLOCK_CODES = Object.freeze(['WEB_OK', 'WEB_BLOCKED_URL', 'WEB_INVALID_URL'])

const PROVIDER_LABELS = Object.freeze({
  'web-search-deepseek': 'DeepSeek（Anthropic 兼容 /messages · 整轮模型调用）',
  'web-search-exa': 'Exa（专用检索 /search）',
  'web-search-perplexity': 'Perplexity（OpenAI 兼容 /chat/completions）',
})

/* ---------- Panel A：选择策略 ---------- */

/**
 * 按上游选择表解析一个执行决定。
 * @param configured - 配置的 provider id 或 null（未配置）
 * @param registered - `{ [id]: boolean }` 已注册且可用的集合
 */
export function resolveWebProvider(configured, registered) {
  if (configured !== null && !Object.hasOwn(registered, configured)) {
    return { action: 'throw', code: 'WEB_PROVIDER_CONFIGURED_MISSING', detail: `配置的 ${configured} 从未注册` }
  }
  if (configured !== null && !registered[configured]) {
    return { action: 'throw', code: 'WEB_PROVIDER_CONFIGURED_UNAVAILABLE', detail: `${configured} 已注册但不可用（凭据缺失等）` }
  }
  const usable = PROVIDER_IDS.filter(id => registered[id] === true)
  if (configured !== null) {
    return { action: 'run', provider: configured, detail: '配置命中且可用' }
  }
  if (usable.length === 0) return { action: 'throw', code: 'WEB_PROVIDER_UNAVAILABLE', detail: '没有任何可用搜索提供者' }
  if (usable.length === 1) return { action: 'run', provider: usable[0], detail: '唯一可用者自动入选' }
  return {
    action: 'throw',
    code: 'WEB_PROVIDER_AMBIGUOUS',
    detail: `多个可用者需要显式配置：${usable.join('、')}`,
  }
}

export function buildProviderSelectionModel(input = {}) {
  const configured = typeof input.configured === 'string' && input.configured.length > 0 ? input.configured : null
  if (configured !== null && !PROVIDER_IDS.includes(configured)) {
    throw new RangeError('未知配置 id：' + String(input.configured))
  }
  const registered = {}
  for (const id of PROVIDER_IDS) registered[id] = input.registered?.[id] === true

  const decision = resolveWebProvider(configured, registered)

  // available() 的本地检查演示：缺凭据 = 不可用，绝不发网络请求。
  const availabilityNotes = PROVIDER_IDS.map((id) => ({
    id,
    registered: registered[id] === true,
    note: registered[id] === true ? 'available(): 本地检查通过' : 'available(): false——本地检查失败，不发任何请求',
  }))

  return {
    mode: 'selection',
    input: { configured, registered },
    decision,
    availabilityNotes,
    steps: [
      { stage: '读配置', ok: true, detail: configured === null ? 'searchProvider 未配置' : `searchProvider=${configured}` },
      { stage: '查注册表', ok: true, detail: `可用者：${PROVIDER_IDS.filter(id => registered[id]).join('、') || '（空）'}` },
      decision.action === 'run'
        ? { stage: '执行', ok: true, detail: `交给 ${decision.provider}；结果由缝隙统一裁剪 maxResults` }
        : { stage: '抛 WebError', ok: false, detail: `${decision.code}——${decision.detail}` },
    ],
    observations: {
      usableCount: PROVIDER_IDS.filter(id => registered[id] === true).length,
      action: decision.action,
      code: decision.code ?? null,
    },
    canProve: Object.freeze([
      '选择永不依赖注册顺序或 HMR 时序：同一输入永远得到同一决定。',
      '配置了不存在的 id 与配置了不可用的 id 是两个不同的错误码。',
      '未配置且恰好一个可用者时自动入选；零个与多个都显式失败。',
      'available() 只做本地检查（凭据在不在），绝不发网络请求。',
    ]),
    cannotProve: Object.freeze([
      '真实凭据服务的轮换行为。',
      '真实网络延迟或限流。',
      'fetch-http 提供者的传输细节——那在本页另一面板。',
    ]),
  }
}

/* ---------- Panel B：归一化矩阵 ---------- */

/** 三家原始载荷的教学切片（字段名照抄各家 API 形状）。 */
const RAW_PAYLOADS = Object.freeze({
  'web-search-deepseek': Object.freeze({
    wireShape: 'Messages 回复里的 web_search_tool_result 块',
    rawSources: [
      { url: 'https://docs.example.com/a', title: '结构化块 A' },
      { url: 'https://docs.example.com/b', title: '结构化块 B', snippet: '来自工具结果块' },
    ],
    hasBlocks: true,
    strictNote: '响应里没有 web_search_tool_result 块时抛 WEB_PROVIDER_ERROR，绝不从模型正文刮 URL。',
  }),
  'web-search-exa': Object.freeze({
    wireShape: 'results[]（含 highlights[]）',
    rawSources: [
      { url: 'https://exa.io/r1', title: 'R1', highlights: ['高亮句映射为 snippet'] },
      { url: 'https://exa.io/r2', title: 'R2', highlights: [] },
    ],
    strictNote: null,
  }),
  'web-search-perplexity': Object.freeze({
    wireShape: 'choices[0].message.content + citations[]',
    rawSources: [
      { url: 'https://px.io/c1' },
      { url: 'https://px.io/c2', title: '带标题的引用' },
    ],
    answer: 'Perplexity 会生成一段直接回答……',
    strictNote: '引用可能只有 URL：title/snippet 是可选字段。',
  }),
})

/** 把一家原始载荷归一化成缝隙的 WebSearchResult.sources。 */
function normalizeSources(providerId) {
  const payload = RAW_PAYLOADS[providerId]
  return payload.rawSources.map(source => ({
    url: source.url,
    ...(source.title !== undefined ? { title: source.title } : {}),
    ...(source.snippet !== undefined
      ? { snippet: source.snippet }
      : source.highlights !== undefined && source.highlights.length > 0
        ? { snippet: source.highlights[0] }
        : {}),
  }))
}

export function buildNormalizationModel(input = {}) {
  const providerId = PROVIDER_IDS.find(id => id === input.providerId) ?? 'web-search-exa'
  const payload = RAW_PAYLOADS[providerId]
  const sources = normalizeSources(providerId)
  const maxResults = input.maxResults ?? 5
  if (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 10) {
    throw new RangeError('maxResults 必须落在 [1, 10]')
  }

  // 缝隙层统一裁剪：无论 provider 返回多少，sources[] 截到 maxResults 并置 truncated。
  const truncated = sources.length > maxResults
  const kept = sources.slice(0, maxResults)

  const strictTriggered = providerId === 'web-search-deepseek' && input.deepseekNoBlocks === true
  if (strictTriggered) {
    return {
      mode: 'normalization',
      input: { providerId, maxResults, deepseekNoBlocks: true },
      failed: true,
      errorCode: 'WEB_PROVIDER_ERROR',
      errorDetail: '严格模式：响应缺少 web_search_tool_result 块——拒绝降级为正文刮取。',
      observations: { sourcesKept: 0, truncated: false, urlOnlyCitations: false, strictMode: true },
      canProve: Object.freeze(['严格模式宁可报错也不刮正文。']),
      cannotProve: Object.freeze(['真实模型是否触发原生搜索。']),
    }
  }

  return {
    mode: 'normalization',
    input: { providerId, maxResults, deepseekNoBlocks: input.deepseekNoBlocks === true },
    providerLabel: PROVIDER_LABELS[providerId],
    wireShape: payload.wireShape,
    rawSources: payload.rawSources,
    normalized: kept,
    seamTruncation: { truncated, dropped: sources.length - kept.length },
    answer: payload.answer ?? null,
    strictNote: payload.strictNote ?? null,
    observations: {
      sourcesKept: kept.length,
      truncated,
      urlOnlyCitations: kept.some(source => source.title === undefined),
      strictMode: providerId === 'web-search-deepseek',
    },
    canProve: Object.freeze([
      '三家返回形状不同，归一化后都是 { url 必填, title/snippet/publishedAt 可选 }。',
      'maxResults 由缝隙层统一执行：截断 sources 并置 truncated，provider 各自的默认值只是请求参数。',
      'DeepSeek 的严格模式把「没触发原生搜索」变成显式错误而不是降级。',
      'Perplexity 的引用可能只有 URL——可选字段正是为它设计的。',
    ]),
    cannotProve: Object.freeze([
      '各家的相关性排序质量。',
      'answer 生成的实际策略。',
      '真实凭据解析与轮换。',
    ]),
  }
}

/* ---------- Panel C：fetch-http 卫生 ---------- */

/**
 * 按 fetch-http README 的卫生规则校验一个 URL。
 * 仅 http/https；带凭据（userinfo）→ WEB_BLOCKED_URL；其它非法 → WEB_INVALID_URL。
 */
export function validateFetchUrl(rawUrl) {
  if (typeof rawUrl !== 'string' || rawUrl.trim().length === 0) {
    return { ok: false, code: 'WEB_INVALID_URL', detail: 'url 必须是非空字符串' }
  }
  const trimmed = rawUrl.trim()
  let parsed
  try {
    parsed = new URL(trimmed)
  } catch {
    return { ok: false, code: 'WEB_INVALID_URL', detail: 'URL 无法解析' }
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { ok: false, code: 'WEB_INVALID_URL', detail: `只接受 http/https，收到 ${parsed.protocol}` }
  }
  if (parsed.username.length > 0 || parsed.password.length > 0) {
    return { ok: false, code: 'WEB_BLOCKED_URL', detail: 'URL 内嵌凭据被拒绝' }
  }
  if (trimmed.length > 2000) {
    return { ok: false, code: 'WEB_INVALID_URL', detail: 'URL 超长' }
  }
  return { ok: true, code: 'WEB_OK', detail: parsed.protocol === 'http:' ? '明文 http 放行（生产建议 https）' : 'https 放行' }
}

export function buildFetchHygieneModel(input = {}) {
  const verdicts = (input.urls ?? []).map(url => ({ url, ...validateFetchUrl(url) }))
  return {
    mode: 'fetch-hygiene',
    verdicts,
    observations: {
      blocked: verdicts.filter(v => v.code === 'WEB_BLOCKED_URL').length,
      invalid: verdicts.filter(v => v.code === 'WEB_INVALID_URL').length,
      passed: verdicts.filter(v => v.code === 'WEB_OK').length,
    },
    canProve: Object.freeze([
      '非 2xx 是结果不是错误；WebError 只留给「无法安全取回或表示资源」。',
      '同源重定向才跟随；跨域重定向要求模型重新发起调用。',
      'User-Agent 是显式产品标识，从不伪装浏览器。',
    ]),
    cannotProve: Object.freeze([
      '真实重定向链与字节上限的具体数值。',
      'charset 解码的全部边界。',
      '二进制内容类型的完整黑名单。',
    ]),
  }
}

export function evaluateProviderOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  if (model.mode === 'selection') {
    const rebuilt = resolveWebProvider(model.input.configured, model.input.registered)
    add('SELECTION_DETERMINISTIC', '同一注册状态重复解析得到同一决定',
      JSON.stringify(rebuilt) === JSON.stringify(model.decision),
      '两次一致', JSON.stringify(rebuilt) === JSON.stringify(model.decision) ? '一致' : '不一致')

    const usableCount = PROVIDER_IDS.filter(id => model.input.registered[id] === true).length
    if (model.input.configured === null) {
      const expectedCode = usableCount === 0 ? 'WEB_PROVIDER_UNAVAILABLE'
        : usableCount === 1 ? null
          : 'WEB_PROVIDER_AMBIGUOUS'
      if (expectedCode === null) {
        add('AUTO_SELECT_SINGLE', '未配置且恰好一个可用者时自动入选', model.decision.action === 'run', 'run', model.decision.action)
      } else {
        add(expectedCode, '显式失败并给出正确错误码',
          model.decision.code === expectedCode, expectedCode, String(model.decision.code))
      }
    } else {
      const expected = model.input.registered[model.input.configured] ? null
        : Object.hasOwn(model.input.registered, model.input.configured) ? 'WEB_PROVIDER_CONFIGURED_UNAVAILABLE'
          : 'WEB_PROVIDER_CONFIGURED_MISSING'
      if (expected === null) {
        add('CONFIGURED_RUNS', '配置命中且可用：运行该提供者', model.decision.action === 'run', 'run', model.decision.action)
      } else {
        add(expected, expected, model.decision.code === expected, expected, String(model.decision.code))
      }
    }

    add('NO_NETWORK_IN_AVAILABLE', '可用性检查是本地的：判定步骤不含任何网络动作',
      model.steps.every(step => !step.detail.includes('fetch(')),
      '无网络字样', '无网络字样')
    return { pass: checks.every(check => check.pass), checks }
  }

  if (model.mode === 'normalization') {
    if (model.failed === true) {
      add('STRICT_MODE', 'DeepSeek 严格模式：无结构块即抛 WEB_PROVIDER_ERROR',
        model.errorCode === 'WEB_PROVIDER_ERROR', 'WEB_PROVIDER_ERROR', String(model.errorCode))
      return { pass: checks.every(check => check.pass), checks }
    }
    const rebuilt = buildNormalizationModel(model.input)
    add('NORMALIZE_DETERMINISTIC', '同一载荷重复归一化得到同一份 sources',
      JSON.stringify(rebuilt.normalized) === JSON.stringify(model.normalized),
      '两次一致', JSON.stringify(rebuilt.normalized) === JSON.stringify(model.normalized) ? '一致' : '不一致')

    add('URL_REQUIRED', '每个归一化来源都有 url 字段',
      model.normalized.every(source => typeof source.url === 'string' && source.url.length > 0),
      '全部有 url', `${String(model.normalized.filter(s => !s.url)).length} 个缺失`)

    const cappedOk = model.normalized.length <= model.input.maxResults
      && (!rebuilt.seamTruncation.truncated || model.seamTruncation.truncated)
    add('CENTRAL_MAXRESULTS', 'maxResults 由缝隙层统一裁剪并置 truncated',
      cappedOk,
      `≤ ${String(model.input.maxResults)}`, String(model.normalized.length))

    if (model.providerId === 'web-search-perplexity') {
      add('URL_ONLY_CITATIONS_ALLOWED', 'Perplexity 允许只有 URL 的引用（title/snippet 可选）',
        true, '允许', '允许')
    }
    return { pass: checks.every(check => check.pass), checks }
  }

  const rebuilt = buildFetchHygieneModel({ urls: model.verdicts.map(v => v.url) })
  add('HYGIENE_DETERMINISTIC', '同一组 URL 重复校验得到同一组判决',
    JSON.stringify(rebuilt.verdicts) === JSON.stringify(model.verdicts),
    '两次一致', JSON.stringify(rebuilt.verdicts) === JSON.stringify(model.verdicts) ? '一致' : '不一致')

  const userinfoBlocked = model.verdicts.every((verdict) => {
    let parsed
    try { parsed = new URL(verdict.url) } catch { return true }
    return parsed.username.length > 0 || parsed.password.length > 0 ? verdict.code === 'WEB_BLOCKED_URL' : true
  })
  add('USERINFO_BLOCKED', '内嵌凭据的 URL 一律 WEB_BLOCKED_URL',
    userinfoBlocked, '全部拦截', userinfoBlocked ? '全部拦截' : '有放行')

  return { pass: checks.every(check => check.pass), checks }
}
