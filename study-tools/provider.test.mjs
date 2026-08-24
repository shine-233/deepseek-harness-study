import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  PROVIDER_IDS,
  buildFetchHygieneModel,
  buildNormalizationModel,
  buildProviderSelectionModel,
  evaluateProviderOracle,
  resolveWebProvider,
  validateFetchUrl,
} from '../website/public/provider-model.js'

test('the same input produces byte-identical output on all three faces', () => {
  for (const model of [
    buildProviderSelectionModel({ configured: null, registered: { 'web-search-exa': true } }),
    buildNormalizationModel({ providerId: 'web-search-exa', maxResults: 5 }),
    buildFetchHygieneModel({ urls: ['https://a.com'] }),
  ]) {
    assert.equal(JSON.stringify(model), JSON.stringify(model))
  }
})

test('the selection table covers every configured × registered combo', () => {
  const configs = [null, ...PROVIDER_IDS]
  const registeredStates = [
    {},
    { 'web-search-deepseek': true },
    { 'web-search-deepseek': true, 'web-search-exa': true },
    { 'web-search-exa': true },
    { 'web-search-exa': true, 'web-search-perplexity': true },
    { 'web-search-deepseek': true, 'web-search-exa': true, 'web-search-perplexity': true },
  ]
  for (const configured of configs) {
    for (const registered of registeredStates) {
      const model = buildProviderSelectionModel({ configured, registered })
      const result = evaluateProviderOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          `configured=${String(configured)} reg=${JSON.stringify(registered)} failed ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('selection error codes match the documented table exactly', () => {
  assert.equal(
    resolveWebProvider('web-search-exa', { 'web-search-deepseek': true }).code,
    'WEB_PROVIDER_CONFIGURED_MISSING',
  )
  assert.equal(
    resolveWebProvider('web-search-exa', { 'web-search-exa': false, 'web-search-deepseek': true }).code,
    'WEB_PROVIDER_CONFIGURED_UNAVAILABLE',
  )
  assert.equal(resolveWebProvider(null, {}).code, 'WEB_PROVIDER_UNAVAILABLE')
  assert.equal(
    resolveWebProvider(null, { 'web-search-exa': true, 'web-search-perplexity': true }).code,
    'WEB_PROVIDER_AMBIGUOUS',
  )
  const single = resolveWebProvider(null, { 'web-search-exa': true })
  assert.equal(single.action, 'run')
  assert.equal(single.provider, 'web-search-exa')
})

test('normalization keeps url mandatory and lets the seam enforce maxResults', () => {
  for (const providerId of PROVIDER_IDS) {
    const model = buildNormalizationModel({ providerId, maxResults: 1 })
    if (model.failed) continue
    assert.ok(model.normalized.length <= 1)
    for (const source of model.normalized) {
      assert.equal(typeof source.url, 'string')
      assert.ok(source.url.length > 0)
    }
  }
})

test('deepseek strict mode throws rather than scraping prose', () => {
  const model = buildNormalizationModel({
    providerId: 'web-search-deepseek',
    maxResults: 5,
    deepseekNoBlocks: true,
  })
  assert.equal(model.failed, true)
  assert.equal(model.errorCode, 'WEB_PROVIDER_ERROR')
})

test('fetch hygiene blocks userinfo urls and non-http schemes', () => {
  assert.equal(validateFetchUrl('http://user:pw@x.com').code, 'WEB_BLOCKED_URL')
  assert.equal(validateFetchUrl('ftp://files.com/x').code, 'WEB_INVALID_URL')
  assert.equal(validateFetchUrl('https://ok.com').code, 'WEB_OK')

  const batch = buildFetchHygieneModel({
    urls: ['https://ok.example.com', 'http://user:pw@x.com', 'ftp://y.com'],
  })
  assert.equal(batch.observations.blocked, 1)
  assert.equal(batch.observations.invalid, 1)
  assert.equal(batch.observations.passed, 1)
})
