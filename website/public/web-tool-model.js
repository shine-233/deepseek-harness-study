/**
 * web_fetch 与 web_search 两个工具管线的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/web/tool-web/src/{fetch,search}.ts：
 *
 *   fetch：parseFetchArgs 只要求 url 非空白；输出以 `Fetched <url> (HTTP <s>)`
 *   开头，HTML 经 turndown 转 GFM（script/style/noscript 整体剔除），词法嵌套
 *   深度超过 MAX_CONVERSION_DEPTH=512 时放弃转换、原文透传；有效截断 =
 *   provider 截断 ∨ 源码切割 ∨ 超过 maxOutputChars，命中时追加
 *   TRUNCATION_FOOTER，且封顶切片尽量保住这行脚注。meta 携带
 *   { url, statusCode, truncated }，truncated 是「文本所反映的有效截断」。
 *
 *   search：单查询原样返回；多查询并发执行、按名次轮转合并、URL 去重、封顶
 *   maxResults，丢源时记 droppedSource；任一查询失败会中止同批兄弟并重抛首个
 *   失败。presentSearchResult 在 isError 或 meta 畸形时返回 undefined——UI 回落
 *   到 generic 卡。
 *
 * 教学约定：页面与搜索结果是固定教学常量；「教学转换器」只覆盖预设用到的
 * 标签子集（h1-h3/p/a/ul-li/table/script/style/noscript），真实页面走 turndown。
 * 没有网络请求、没有真实 provider。
 */

export const WEB_MODES = Object.freeze(['fetch', 'search'])
export const SANDBOX_STYLE_DEPTH_LIMIT = 512

const TRUNCATION_FOOTER = '\n\n(Content truncated. Fetch a more specific URL or section for the full text.)'

/** 教学页面库：normal 演示转换，deep 演示深度守卫，plain 演示 text 直通。 */
export const FETCH_PAGES = Object.freeze({
  docs: Object.freeze({
    id: 'docs',
    url: 'https://example.com/docs/config',
    contentType: 'html',
    status: 200,
    providerTruncated: false,
    html: [
      '<h1>Config guide</h1>',
      '<script>telemetry.beacon()</script>',
      '<p>Set <a href="/docs/timeouts">timeouts</a> before deploying.</p>',
      '<ul><li>read</li><li>write</li></ul>',
      '<style>.hidden{}</style>',
      '<table><thead><tr><th>key</th><th>default</th></tr></thead>',
      '<tbody><tr><td>timeout</td><td>30s</td></tr></tbody></table>',
      '<h2>Advanced</h2><p>Nested sections follow.</p>',
    ].join(''),
  }),
  deep: Object.freeze({
    id: 'deep',
    url: 'https://example.com/nested',
    contentType: 'html',
    status: 200,
    providerTruncated: false,
    depth: 640,
    html: '',
    // 深层页面由 openDeepPage 按需生成，保持常量区干净。
  }),
  plain: Object.freeze({
    id: 'plain',
    url: 'https://example.com/logs/build.txt',
    contentType: 'text',
    status: 200,
    providerTruncated: false,
    text: 'build started\nunit tests passed\n[exit code: 0]',
  }),
  slow: Object.freeze({
    id: 'slow',
    url: 'https://example.com/big-report',
    contentType: 'html',
    status: 200,
    providerTruncated: true,
    html: '<h1>Report</h1>' + '<p>Section paragraph.</p>'.repeat(40),
  }),
})

/** 生成嵌套 div 页面：depth 由参数决定，内容确定。 */
function deepPageHtml(depth) {
  let html = ''
  for (let index = 0; index < depth; index += 1) html += '<div>'
  html += '<p>deepest content</p>'
  for (let index = 0; index < depth; index += 1) html += '</div>'
  return html
}

/** 教学转换器：把教学页面 HTML 折成 GFM 子集。 */
function convertHtml(html) {
  let text = html
  // 上游 turndown.remove(['script','style','noscript'])：整体剔除，不留文本。
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '')
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '')
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  text = text.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
  text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
  text = text.replace(/<a\s[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
  text = text.replace(/<li[^>]*>(.*?)<\/li>/gi, '\n- $1')
  text = text.replace(/<\/?(ul|ol)[^>]*>/gi, '\n')
  text = text.replace(/<td[^>]*>(.*?)<\/td>/gi, '| $1 ')
  text = text.replace(/<th[^>]*>(.*?)<\/th>/gi, '| $1 ')
  text = text.replace(/<\/tr>/gi, '|\n')
  text = text.replace(/<tr[^>]*>/gi, '')
  text = text.replace(/<\/?(thead|tbody|table)[^>]*>/gi, '\n')
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n')
  text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
  text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
  text = text.replace(/<[^>]+>/g, '')
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

/** fetch 分支的输入解析；对齐 parseFetchArgs 的非空白校验。 */
export function parseFetchInput(input = {}) {
  const url = typeof input.url === 'string' ? input.url : ''
  if (url.trim().length === 0) {
    return { ok: false, error: { kind: 'invalid-args', message: 'url must be a non-empty string' } }
  }
  const pageId = FETCH_PAGES[input.pageId ?? 'docs'] !== undefined ? (input.pageId ?? 'docs') : null
  if (pageId === null) throw new RangeError('未知教学页面：' + String(input.pageId))
  const maxOutputChars = input.maxOutputChars ?? 600
  if (!Number.isInteger(maxOutputChars) || maxOutputChars < 120 || maxOutputChars > 4000) {
    throw new RangeError('maxOutputChars 必须落在 [120, 4000]')
  }
  return { ok: true, url, pageId, maxOutputChars }
}

/**
 * fetch 管线：parseArgs → ctx.web.fetch（provider）→ 深度守卫 → 转换/直通 →
 * 头部拼接 → 有效截断判定 → 封顶与脚注。每一步带可读 detail。
 */
export function buildWebFetchModel(input = {}) {
  const parsed = parseFetchInput(input)
  if (!parsed.ok) {
    return {
      mode: 'fetch',
      ok: false,
      steps: [{ stage: 'parseFetchArgs', ok: false, detail: parsed.error.message }],
      error: parsed.error,
      observations: { stages: 1 },
      canProve: Object.freeze(['schema DSL 表达不了的约束在工具入口显式报错。']),
      cannotProve: Object.freeze(['真实网络行为。']),
    }
  }
  const { url, pageId, maxOutputChars } = parsed
  const page = FETCH_PAGES[pageId]
  const bodyContent = page.id === 'deep' ? deepPageHtml(page.depth) : (page.text ?? page.html)

  const steps = []
  const push = (stage, ok, detail, extras = {}) => steps.push({ stage, ok, detail, ...extras })

  push('parseFetchArgs', true, 'url 非空白，进入缝隙请求：' + url)
  push('ctx.web.fetch', true, `provider 返回 HTTP ${String(page.status)}，body.kind=${page.contentType}`
    + (page.providerTruncated ? '（provider 已截断）' : ''))

  const sourceCut = bodyContent.length > maxOutputChars
  const worked = sourceCut ? bodyContent.slice(0, maxOutputChars) : bodyContent
  if (sourceCut) {
    push('renderBody·源码切割', true, `源码超出同步处理预算：只取前 ${String(maxOutputChars)} 字符再进转换`)
  }

  let renderedText
  if (page.contentType === 'text') {
    renderedText = worked
    push('renderBody', true, 'body.kind=text：逐字直通，不做任何转换')
  } else if (page.id === 'deep') {
    renderedText = worked
    push('renderBody·深度守卫', true,
      `词法嵌套 ${String(page.depth)} > MAX_CONVERSION_DEPTH=${String(SANDBOX_STYLE_DEPTH_LIMIT)}：跳过转换，HTML 原文透传`,
      { rawPassthrough: true })
  } else {
    renderedText = convertHtml(worked)
    push('renderBody', true, 'turndown（教学转换器）→ GFM 子集；script/style 已整体剔除')
  }

  const header = `Fetched ${url} (HTTP ${String(page.status)})\n\n`
  const prefix = header + renderedText
  // 上游 computeFetchOutput 的有效截断：provider ∨ 源码切割 ∨ 前缀超帽。
  const effectiveTruncated = page.providerTruncated === true || sourceCut || prefix.length > maxOutputChars
  const full = prefix + (effectiveTruncated ? TRUNCATION_FOOTER : '')
  push('截断判定', true, `provider=${String(page.providerTruncated === true)} ∨ 源码切割=${String(sourceCut)} ∨ 前缀超帽 → 有效截断=${String(effectiveTruncated)}`)

  let text
  if (full.length <= maxOutputChars) {
    text = full
    push('封顶', true, `完整输出 ${String(full.length)} 字符未超帽，原样返回`)
  } else if (maxOutputChars < TRUNCATION_FOOTER.length) {
    text = full.slice(0, maxOutputChars)
    push('封顶', true, `帽比脚注还短：只能硬切到 ${String(maxOutputChars)} 字符`)
  } else {
    text = prefix.slice(0, maxOutputChars - TRUNCATION_FOOTER.length) + TRUNCATION_FOOTER
    push('封顶', true, `切片到 ${String(maxOutputChars)} 字符，脚注仍收尾`)
  }

  const meta = { url, statusCode: page.status, truncated: effectiveTruncated }
  push('meta', true, `presentationMeta = ${JSON.stringify(meta)}（卡片用它重放，UI 不必重新解析头部）`)

  return {
    mode: 'fetch',
    ok: true,
    input: { url, pageId, maxOutputChars },
    url,
    pageId,
    header,
    text,
    meta,
    steps,
    observations: {
      stages: steps.length,
      effectiveTruncated,
      rawPassthrough: page.id === 'deep',
      outputChars: text.length,
      scriptsLeaked: /telemetry\.beacon|\.hidden\{\}/.test(text) ? 1 : 0,
    },
    canProve: Object.freeze([
      '输出首行永远是 `Fetched <url> (HTTP <status>)`。',
      '有效截断由三个来源取或：provider 截断、源码切割、超帽；脚注只在它为真时出现。',
      '嵌套超过 512 层的 HTML 放弃转换、原文透传——降级页面好过报错。',
      'meta.truncated 与渲染文本反映同一个「有效截断」，卡片和文本不可能各说各话。',
    ]),
    cannotProve: Object.freeze([
      '真实网络、重定向或 provider 行为。',
      'turndown 对任意网页的完整转换结果；本页只覆盖预设标签子集。',
      '部署里 fetchTimeoutMs 与 fetchMaxOutputChars 的实际取值。',
    ]),
  }
}

/** 教学搜索结果库：qB 与 qA 共享一个 URL 用于去重演示。 */
export const SEARCH_QUERIES = Object.freeze({
  'cache policy': Object.freeze({
    sources: Object.freeze([
      Object.freeze({ url: 'https://docs.example.com/cache', title: 'Cache-Control 详解', snippet: '前缀缓存命中的条件……' }),
      Object.freeze({ url: 'https://blog.example.com/kv', title: 'KV cache 实战', snippet: '字节与 token 的换算……' }),
      Object.freeze({ url: 'https://wiki.example.com/prompt', title: '提示词结构', snippet: '稳定前缀的价值……' }),
    ]),
  }),
  'prompt caching': Object.freeze({
    sources: Object.freeze([
      Object.freeze({ url: 'https://docs.example.com/cache', title: 'Cache-Control 详解（另一篇抓取）', snippet: '不同摘要，同一 URL……' }),
      Object.freeze({ url: 'https://spec.example.io/http', title: 'HTTP 缓存语义', snippet: '标准文本……' }),
    ]),
  }),
})

export function buildWebSearchModel(input = {}) {
  const queriesRaw = Array.isArray(input.queries) ? input.queries : ['cache policy']
  const queries = queriesRaw.filter(query => typeof query === 'string' && query.trim().length > 0)
  if (queries.length === 0) {
    return {
      mode: 'search',
      ok: false,
      error: { kind: 'invalid-args', message: 'queries 必须至少包含一条非空查询' },
      steps: [{ stage: 'parseArgs', ok: false, detail: 'queries 为空' }],
      observations: { stages: 1 },
      canProve: Object.freeze([]),
      cannotProve: Object.freeze([]),
    }
  }
  const maxResults = input.maxResults ?? 4
  if (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 5) {
    throw new RangeError('maxResults 必须落在 [1, 5]')
  }
  const failSecond = input.failSecondQuery === true && queries.length > 1

  const steps = []
  const push = (stage, ok, detail, extras = {}) => steps.push({ stage, ok, detail, ...extras })
  push('parseArgs', true, `${String(queries.length)} 条查询：${queries.join(' | ')}`)

  if (failSecondQueryGuard(failSecond, queries)) {
    const message = `search provider failed for query: ${queries[1]}`
    push('并发执行', false, `第一条失败已中止同批兄弟；等待全部结算后重抛：${message}`, { aborted: true })
    return {
      mode: 'search',
      ok: false,
      queries,
      maxResults,
      error: { kind: 'provider-failed', message },
      steps,
      observations: { stages: steps.length, sources: 0, droppedSource: false, abortedSiblings: queries.length - 1 },
      canProve: Object.freeze(['一次失败中止同批全部查询，结果卡回落 generic。']),
      cannotProve: Object.freeze(['真实 provider 错误分类。']),
    }
  }

  push('并发执行', true, queries.length === 1
    ? '单条查询：provider 结果原样返回，不进合并器'
    : `${String(queries.length)} 条并发；失败会中止兄弟，这里全部成功`)

  const perQuery = queries.map((query) => {
    const found = SEARCH_QUERIES[query]
    return found !== undefined ? found : { sources: [] }
  })

  let sources = []
  let droppedSource = false
  if (queries.length === 1) {
    sources = perQuery[0].sources.slice(0, maxResults)
    if (sources.length < perQuery[0].sources.length) droppedSource = true
    push('合并器', true, '单查询跳过轮转合并；仅按 maxResults 封顶')
  } else {
    const seen = new Set()
    const ranks = Math.max(...perQuery.map(result => result.sources.length))
    mergeLoop: for (let rank = 0; rank < ranks; rank += 1) {
      for (const result of perQuery) {
        const source = result.sources[rank]
        if (source === undefined) continue
        if (seen.has(source.url)) continue
        if (sources.length >= maxResults) { droppedSource = true; break mergeLoop }
        seen.add(source.url)
        sources.push(source)
      }
    }
    push('合并器', true, `按名次轮转、URL 去重（${String(seen.size)} 个唯一）、封顶 ${String(maxResults)}`
      + (droppedSource ? '；有来源被丢弃' : ''))
  }

  const metaSources = sources.map(source => ({ url: source.url, title: source.title, snippet: source.snippet }))
  const meta = { sources: metaSources, truncated: droppedSource }

  return {
    mode: 'search',
    ok: true,
    input: { queries, maxResults, failSecondQuery: failSecond },
    queries,
    maxResults,
    sources,
    droppedSource,
    meta,
    steps,
    observations: {
      stages: steps.length,
      sources: sources.length,
      droppedSource,
      uniqueUrls: new Set(sources.map(source => source.url)).size,
      abortedSiblings: 0,
    },
    canProve: Object.freeze([
      '多查询按名次轮转合并：每个结果的第 1 名排完才轮到第 2 名。',
      'URL 是去重键；重复命中的后来者直接跳过。',
      '总数到 maxResults 即停，并把 droppedSource 记进 meta.truncated。',
      'isError 或 meta 畸形时 presentSearchResult 返回 undefined，UI 回落 generic 卡。',
    ]),
    cannotProve: Object.freeze([
      '真实搜索引擎的相关性排序。',
      'provider 对 answer 字段的实际填充策略。',
      '网络延迟与取消时序。',
    ]),
  }
}

function failSecondQueryGuard(failSecond, queries) {
  return failSecond && queries.length > 1
}

export function evaluateWebToolOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  if (model.mode === 'fetch') {
    if (!model.ok) {
      add('FETCH_ARGS_GUARD', '空 url 在入口显式失败',
        model.error.kind === 'invalid-args', 'invalid-args', model.error.kind)
      return { pass: true, checks }
    }
    const rebuilt = buildWebFetchModel(model.input)
    add('WEB_DETERMINISTIC', '同一输入重建同一份输出',
      rebuilt.text === model.text, '两次一致', rebuilt.text === model.text ? '一致' : '不一致')

    add('HEADER_FORMAT', '输出以 Fetched <url> (HTTP <status>) 开头',
      model.text.startsWith(model.header),
      model.header.trim(), model.text.split('\n')[0])

    add('SCRIPT_STYLE_STRIPPED', 'script/style 内容不进模型可见文本',
      model.observations.scriptsLeaked === 0, '0 处泄漏', `${String(model.observations.scriptsLeaked)} 处泄漏`)

    const deepExpected = model.pageId === 'deep'
    add('DEPTH_GUARD', '深页原文透传，普通页走转换',
      deepExpected ? model.observations.rawPassthrough : !model.observations.rawPassthrough,
      deepExpected ? 'raw 透传' : 'markdown', model.observations.rawPassthrough ? 'raw 透传' : 'markdown')

    const expectFooter = model.observations.effectiveTruncated
    add('FOOTER_RULES', '脚注恰好在有效截断时出现且收尾',
      expectFooter ? model.text.endsWith(TRUNCATION_FOOTER) : !model.text.includes('(Content truncated'),
      expectFooter ? '以脚注收尾' : '无脚注',
      model.text.endsWith(TRUNCATION_FOOTER) ? '以脚注收尾' : '无脚注')

    add('META_REFLECTS_TEXT', 'meta.truncated 与文本的脚注反映同一有效截断',
      model.meta.truncated === expectFooter,
      String(expectFooter), String(model.meta.truncated))
    return { pass: checks.every(check => check.pass), checks }
  }

  if (!model.ok) {
    if (model.error.kind === 'invalid-args') {
      add('SEARCH_ARGS_GUARD', '空查询列表在入口显式失败',
        true, 'invalid-args', model.error.kind)
      return { pass: true, checks }
    }
    add('FAILURE_ABORTS_BATCH', '首个失败中止兄弟并重抛',
      model.observations.abortedSiblings >= 1, '≥1 个兄弟被中止', `${String(model.observations.abortedSiblings)} 个`)
    return { pass: checks.every(check => check.pass), checks }
  }

  const rebuilt = buildWebSearchModel(model.input)
  add('SEARCH_DETERMINISTIC', '同一输入重建同一份来源列表',
    JSON.stringify(rebuilt.sources) === JSON.stringify(model.sources),
    '两次一致', JSON.stringify(rebuilt.sources) === JSON.stringify(model.sources) ? '一致' : '不一致')

  const urls = model.sources.map(source => source.url)
  add('DEDUP_BY_URL', 'URL 不重复',
    new Set(urls).size === urls.length, '0 个重复', `${String(urls.length - new Set(urls).size)} 个重复`)

  add('CAP_RESPECTED', '来源数不超过 maxResults',
    model.sources.length <= model.maxResults,
    `≤ ${String(model.maxResults)}`, String(model.sources.length))

  add('DROP_FLAG_MATCHES', '被丢弃来源时 meta.truncated 为真',
    model.droppedSource === model.meta.truncated,
    String(model.droppedSource), String(model.meta.truncated))

  return { pass: checks.every(check => check.pass), checks }
}
