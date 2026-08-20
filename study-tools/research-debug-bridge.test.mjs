import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  RESEARCH_PRESETS,
  createRequest,
  createRequestFromPreset,
  projectRequestToForm,
  summarizeResult,
  validateRequest,
  validateResult,
  writeText,
} from '../website/public/research-debug-bridge.js'

const contractFixture = name => new URL(`./fixtures/research-debug-contract/${name}`, import.meta.url)

function makeResult(status = 'COMPLETE') {
  const partial = status === 'PARTIAL'
  const unavailable = status === 'UNAVAILABLE'
  const failed = status === 'FAIL'
  return {
    schemaVersion: 1,
    kind: 'dsh-research-diagnostic-result',
    requestId: failed ? '' : 'course-context-001',
    status,
    result: status,
    course: failed ? undefined : {
      siteId: 'dsh-study',
      courseId: 'deepseek-harness',
      lessonId: 'debug-bridge-v1',
      questionId: 'evidence-coverage',
    },
    question: failed ? undefined : {
      title: '检查上下文诊断证据是否完整',
      requiredSourceKinds: ['diagnostics', 'trace'],
      requestedChecks: ['coverage', 'privacy'],
    },
    evidence: failed ? undefined : {
      artifactPresent: !unavailable,
      artifactKind: unavailable ? null : 'dsh-debug-repro',
      sourceCount: partial ? 1 : unavailable ? 0 : 2,
      sourceKinds: partial ? ['diagnostics'] : unavailable ? [] : ['diagnostics', 'trace'],
      sourceStatuses: partial
        ? [{ sourceKind: 'diagnostics', status: 'PASS' }]
        : unavailable ? [] : [{ sourceKind: 'diagnostics', status: 'PASS' }, { sourceKind: 'trace', status: 'PASS' }],
      missingKinds: partial ? ['trace'] : [],
      integrity: unavailable ? 'absent' : 'verified',
      trust: 'declared-metadata-only',
    },
    checks: failed ? [] : [
      {
        checkId: 'coverage',
        status: partial ? 'PARTIAL' : unavailable ? 'UNAVAILABLE' : 'PASS',
        findingCodes: [partial ? 'EVIDENCE_KIND_MISSING' : unavailable ? 'EVIDENCE_NOT_SUPPLIED' : 'REQUIRED_EVIDENCE_PRESENT'],
      },
      {
        checkId: 'privacy',
        status: unavailable ? 'UNAVAILABLE' : 'PASS',
        findingCodes: [unavailable ? 'EVIDENCE_NOT_SUPPLIED' : 'EVIDENCE_PRIVACY_DECLARATION_VALID'],
      },
    ],
    findings: [{
      code: failed ? 'REQUEST_KIND_INVALID' : partial ? 'EVIDENCE_KIND_MISSING' : unavailable ? 'EVIDENCE_NOT_SUPPLIED' : 'REQUIRED_EVIDENCE_PRESENT',
      severity: failed ? 'error' : partial ? 'warning' : 'info',
      message: '<not-html> is deliberately rendered as text',
    }],
    privacy: {
      inputMode: 'explicit-file-only',
      networkAccessed: false,
      commandsExecuted: false,
      targetMutated: false,
      uploads: false,
      rawPayloadStored: false,
      absolutePathsStored: false,
    },
    handoff: {
      returnToCourse: !failed,
      requiresManualReview: partial || unavailable || failed,
      nextAction: status === 'COMPLETE'
        ? 'return-to-course'
        : partial ? 'supply-missing-evidence' : unavailable ? 'run-explicit-repro-export' : 'fix-request-or-artifact',
    },
  }
}

test('createRequest returns a stable v1 request with explicit safety fields', () => {
  const first = createRequest()
  const second = createRequest()
  assert.deepEqual(first, second)
  assert.equal(validateRequest(first).ok, true)
  assert.equal(first.safety.inputMode, 'explicit-file-only')
  assert.equal(first.safety.networkAccessed, false)
})

test('projectRequestToForm restores a preset request without adding browser state', () => {
  const request = createRequestFromPreset('context-compaction', { requestId: 'restore-001' })
  const projection = projectRequestToForm(request)
  assert.equal(projection.presetId, 'context-compaction')
  assert.equal(projection.fields['request-id'], 'restore-001')
  assert.deepEqual(projection.sourceKinds, request.question.requiredSourceKinds)
  assert.deepEqual(projection.requestedChecks, request.question.requestedChecks)

  const custom = createRequest({
    requestId: 'custom-001',
    title: '自定义证据问题',
    requiredSourceKinds: ['pointer'],
    requestedChecks: ['integrity'],
  })
  assert.equal(projectRequestToForm(custom).presetId, 'custom')
})

test('validateRequest rejects unsafe or malformed course context', () => {
  const unsafe = createRequest()
  unsafe.safety.networkAccessed = true
  assert.equal(validateRequest(unsafe).ok, false)
  assert.ok(validateRequest(unsafe).errors.includes('SAFETY_FAIL_CLOSED'))

  const malformed = createRequest()
  delete malformed.course
  assert.equal(validateRequest(malformed).ok, false)
  assert.ok(validateRequest(malformed).errors.includes('COURSE_INVALID'))
})

test('every research preset creates a valid request and publishes proof boundaries', () => {
  assert.equal(RESEARCH_PRESETS.length, 8)
  const ids = new Set()
  for (const preset of RESEARCH_PRESETS) {
    assert.equal(ids.has(preset.presetId), false)
    ids.add(preset.presetId)
    assert.ok(preset.canProve.length > 0)
    assert.ok(preset.cannotProve.length > 0)
    const request = createRequestFromPreset(preset.presetId)
    assert.equal(validateRequest(request).ok, true)
    assert.deepEqual(request.question.requestedChecks, preset.question.requestedChecks)
  }
  assert.throws(() => createRequestFromPreset('not-a-preset'), /Unknown research preset/)
})

test('canonical contract fixtures validate and project the expected website result', () => {
  const request = JSON.parse(readFileSync(contractFixture('request.json'), 'utf8'))
  const repro = JSON.parse(readFileSync(contractFixture('repro.json'), 'utf8'))
  const manifest = JSON.parse(readFileSync(contractFixture('manifest.json'), 'utf8'))
  const expected = JSON.parse(readFileSync(contractFixture('expected.json'), 'utf8'))
  const reproHash = createHash('sha256').update(readFileSync(contractFixture('repro.json'))).digest('hex')
  assert.equal(manifest.artifacts[0].sha256, reproHash)
  assert.equal(validateRequest(request).ok, true)

  const result = {
    schemaVersion: expected.schemaVersion,
    kind: 'dsh-research-diagnostic-result',
    requestId: expected.requestId,
    status: expected.status,
    result: expected.status,
    course: request.course,
    question: request.question,
    evidence: {
      artifactPresent: true,
      artifactKind: repro.kind,
      sourceCount: repro.sourceCount,
      sourceKinds: expected.sourceKinds,
      sourceStatuses: repro.sources.map(source => ({ sourceKind: source.sourceKind, status: source.evidence.status })),
      missingKinds: expected.missingKinds,
      integrity: expected.integrity,
      trust: expected.trust,
    },
    checks: expected.checks,
    findings: [],
    privacy: {
      inputMode: 'explicit-file-only',
      networkAccessed: false,
      commandsExecuted: false,
      targetMutated: false,
      uploads: false,
      rawPayloadStored: false,
      absolutePathsStored: false,
    },
    handoff: {
      returnToCourse: true,
      requiresManualReview: false,
      nextAction: 'return-to-course',
    },
  }
  const checked = validateResult(result)
  assert.equal(checked.ok, true, checked.errors?.join(', '))
  const summary = summarizeResult(result)
  assert.equal(summary.ok, true)
  assert.deepEqual(summary.checks, expected.checks)
})

test('validateResult and summarizeResult accept every honest status', () => {
  for (const status of ['COMPLETE', 'PARTIAL', 'UNAVAILABLE', 'FAIL']) {
    const checked = validateResult(makeResult(status))
    assert.equal(checked.ok, true, `${status} should be valid: ${checked.errors?.join(', ')}`)
    const summary = summarizeResult(makeResult(status))
    assert.equal(summary.ok, true)
    assert.equal(summary.status, status)
  }
})

test('result checks must match the request and COMPLETE requires every requested check to pass', () => {
  const mismatch = makeResult()
  mismatch.checks.pop()
  const mismatchResult = validateResult(mismatch)
  assert.equal(mismatchResult.ok, false)
  assert.ok(mismatchResult.errors.includes('RESULT_CHECKS_REQUEST_MISMATCH'))

  const warning = makeResult()
  warning.checks[0].status = 'WARN'
  const warningResult = validateResult(warning)
  assert.equal(warningResult.ok, false)
  assert.ok(warningResult.errors.includes('RESULT_COMPLETE_CHECKS_INVALID'))

  const legacy = makeResult()
  delete legacy.checks
  const legacySummary = summarizeResult(legacy)
  assert.equal(legacySummary.ok, true)
  assert.equal(legacySummary.checksAvailable, false)
})

test('a fail-closed result remains importable when its optional context is incomplete', () => {
  const failed = makeResult('FAIL')
  failed.course = { siteId: '', courseId: '', lessonId: '', questionId: '' }
  failed.question = { title: '', requiredSourceKinds: [], requestedChecks: [] }
  failed.evidence = {
    artifactPresent: true,
    artifactKind: 'dsh-debug-repro',
    sourceCount: 1,
    sourceKinds: ['diagnostics'],
    sourceStatuses: [],
    missingKinds: [],
    integrity: 'mismatch',
    trust: 'declared-metadata-only',
  }
  assert.equal(validateResult(failed).ok, true)
  assert.equal(summarizeResult(failed).status, 'FAIL')
})

test('validateResult rejects privacy violations, wrong kinds, and count mismatches', () => {
  const privacy = makeResult()
  privacy.privacy.rawPayloadStored = true
  assert.equal(validateResult(privacy).ok, false)

  const wrongKind = makeResult()
  wrongKind.kind = 'not-a-result'
  assert.equal(validateResult(wrongKind).ok, false)

  const mismatch = makeResult()
  mismatch.evidence.sourceCount = 1
  assert.equal(validateResult(mismatch).ok, false)
  assert.ok(validateResult(mismatch).errors.includes('RESULT_SOURCE_COUNT_MISMATCH'))
})

test('imported strings are assigned as text, never interpreted as markup', () => {
  const target = { textContent: '' }
  writeText(target, '<img src=x onerror=alert(1)>')
  assert.equal(target.textContent, '<img src=x onerror=alert(1)>')
  assert.equal(target.innerHTML, undefined)
})

test('the static bridge has no network, browser-storage, or HTML-interpolation primitive', () => {
  const source = [
    readFileSync(new URL('../website/public/research-debug-bridge.js', import.meta.url), 'utf8'),
    readFileSync(new URL('../website/public/research-debug-bridge.html', import.meta.url), 'utf8'),
  ].join('\n')
  assert.doesNotMatch(source, /\bfetch\s*\(/i)
  assert.doesNotMatch(source, /\bWebSocket\b/i)
  assert.doesNotMatch(source, /\bpostMessage\b/i)
  assert.doesNotMatch(source, /\b(?:localStorage|sessionStorage)\b/i)
  assert.doesNotMatch(source, /innerHTML|document\.cookie/i)
})

test('the bridge publishes an explicit two-step Debug command without executing it', () => {
  const script = readFileSync(new URL('../website/public/research-debug-bridge.js', import.meta.url), 'utf8')
  const html = readFileSync(new URL('../website/public/research-debug-bridge.html', import.meta.url), 'utf8')
  assert.match(html, /id="debug-command-preview"/)
  assert.match(html, /id="copy-debug-command"/)
  assert.match(html, /id="request-file"/)
  assert.match(script, /-Action repro-export/)
  assert.match(script, /-Action research-bridge/)
  assert.match(script, /file\.text\(\)/)
  assert.match(script, /navigator\.clipboard/)
  assert.doesNotMatch(script, /child_process|spawn\s*\(|exec\s*\(/i)
})
