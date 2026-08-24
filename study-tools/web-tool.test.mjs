import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FETCH_PAGES,
  buildWebFetchModel,
  buildWebSearchModel,
  evaluateWebToolOracle,
} from '../website/public/web-tool-model.js'

const FOOTER = '\n\n(Content truncated. Fetch a more specific URL or section for the full text.)'

test('the same input produces byte-identical output', () => {
  const input = { url: 'https://example.com/docs/config', pageId: 'docs', maxOutputChars: 600 }
  assert.equal(
    JSON.stringify(buildWebFetchModel(input)),
    JSON.stringify(buildWebFetchModel(input)),
  )
})

const FETCH_GRID = []
for (const pageId of Object.keys(FETCH_PAGES)) {
  for (const maxOutputChars of [120, 600, 2000]) {
    FETCH_GRID.push({ url: 'https://example.com/x', pageId, maxOutputChars })
  }
}

test('every fetch input passes every oracle check across the grid', () => {
  for (const input of FETCH_GRID) {
    const model = buildWebFetchModel(input)
    const result = evaluateWebToolOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true,
        `${input.pageId}/${input.maxOutputChars} failed ${check.id}: ${check.actual}`)
    }
  }
})

test('blank url fails at parseFetchArgs with the upstream message', () => {
  const model = buildWebFetchModel({ url: '   ', pageId: 'docs', maxOutputChars: 600 })
  assert.equal(model.ok, false)
  assert.equal(model.error.message, 'url must be a non-empty string')
})

test('normal HTML converts to GFM and strips script/style wholesale', () => {
  const model = buildWebFetchModel({ url: 'u', pageId: 'docs', maxOutputChars: 4000 })
  assert.ok(model.text.startsWith('Fetched u (HTTP 200)\n\n'))
  assert.ok(model.text.includes('# Config guide'))
  assert.ok(model.text.includes('[timeouts](/docs/timeouts)'))
  assert.ok(!model.text.includes('telemetry.beacon'))
  assert.ok(!model.text.includes('.hidden{}'))
  assert.equal(model.meta.truncated, false)
})

test('nesting beyond the ceiling passes raw with no markdown artifacts', () => {
  const model = buildWebFetchModel({ url: 'u', pageId: 'deep', maxOutputChars: 2000 })
  assert.equal(model.observations.rawPassthrough, true)
  assert.ok(model.text.includes('<div>'))
  assert.ok(!model.text.startsWith('Fetched u (HTTP 200)\n\n#'))
})

test('truncation footer appears exactly when effective truncation is true', () => {
  const capped = buildWebFetchModel({ url: 'u', pageId: 'docs', maxOutputChars: 120 })
  assert.equal(capped.observations.effectiveTruncated, true)
  assert.ok(capped.text.endsWith(FOOTER))
  assert.ok(capped.text.length <= 120)

  const roomy = buildWebFetchModel({ url: 'u', pageId: 'plain', maxOutputChars: 2000 })
  assert.equal(roomy.observations.effectiveTruncated, false)
  assert.ok(!roomy.text.includes('(Content truncated'))

  const providerCut = buildWebFetchModel({ url: 'u', pageId: 'slow', maxOutputChars: 4000 })
  assert.equal(providerCut.observations.effectiveTruncated, true)
  assert.ok(providerCut.text.endsWith(FOOTER))
})

test('multi-query merge is round-robin, deduped by url, and capped', () => {
  const model = buildWebSearchModel({ queries: ['cache policy', 'prompt caching'], maxResults: 4 })
  assert.deepEqual(
    model.sources.map(source => source.url),
    [
      'https://docs.example.com/cache',
      'https://blog.example.com/kv',
      'https://spec.example.io/http',
      'https://wiki.example.com/prompt',
    ],
  )
  // 唯一来源恰好 4 个：全部入选，没有任何丢弃。
  assert.equal(model.droppedSource, false)
  assert.equal(model.meta.truncated, false)
})

test('a tighter cap actually drops a source and raises meta.truncated', () => {
  const model = buildWebSearchModel({ queries: ['cache policy', 'prompt caching'], maxResults: 3 })
  assert.equal(model.sources.length, 3)
  assert.equal(model.droppedSource, true)
  assert.equal(model.meta.truncated, true)
})

test('a failed second query aborts siblings and rethrows the first failure', () => {
  const model = buildWebSearchModel({ queries: ['cache policy', 'prompt caching'], failSecondQuery: true })
  assert.equal(model.ok, false)
  assert.equal(model.error.kind, 'provider-failed')
  assert.equal(model.observations.abortedSiblings, 1)
})
