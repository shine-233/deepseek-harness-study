import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import test from 'node:test'
import { inspectStudyPublication } from './verify-study-publication.mjs'

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'dsh-study-publication-'))
  const generated = join(root, 'generated')
  const dist = join(root, 'dist')
  mkdirSync(join(generated, 'study'), { recursive: true })
  mkdirSync(join(dist, 'study'), { recursive: true })
  writeFileSync(join(generated, 'study', 'index.md'), '---\neditSource: "START-HERE.md"\n---\n\n# Start\n')
  writeFileSync(join(dist, 'study', 'index.html'), '<!doctype html><html lang="zh-CN"><head><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/reading.css"></head><body><div id="VPContent"><div class="vp-doc"><main><h1>Start</h1><a href="/study/">home</a></main></div></div></body></html>')
  return { root, generated, dist }
}

test('the study publication audit accepts a projected page and its same-site link', () => {
  const paths = fixture()
  try {
    const report = inspectStudyPublication({
      generatedRoot: paths.generated,
      distRoot: paths.dist,
      expectedSources: new Set(['START-HERE.md']),
    })
    assert.deepEqual(report, {
      expectedSources: 1,
      projectedPages: 1,
      builtStudyPages: 1,
      missingSources: [],
      unexpectedSources: [],
      missingBuiltPages: [],
      pagesWithoutHeadings: [],
      pagesWithInvalidHtmlShell: [],
      checkedStudyLinks: 1,
      brokenStudyLinks: [],
    })
  } finally {
    rmSync(paths.root, { recursive: true, force: true })
  }
})

test('the study publication audit reports a broken same-site route', () => {
  const paths = fixture()
  try {
    writeFileSync(join(paths.dist, 'study', 'index.html'), '<main><h1>Start</h1><a href="/study/missing">missing</a></main>')
    const report = inspectStudyPublication({
      generatedRoot: paths.generated,
      distRoot: paths.dist,
      expectedSources: new Set(['START-HERE.md']),
    })
    assert.deepEqual(report.brokenStudyLinks, [{ source: 'study/index.html', href: '/study/missing', target: '/study/missing' }])
  } finally {
    rmSync(paths.root, { recursive: true, force: true })
  }
})

test('the study publication audit resolves project Pages links after stripping a base path', () => {
  const paths = fixture()
  try {
    writeFileSync(join(paths.dist, 'study', 'index.html'), '<!doctype html><html lang="zh-CN"><head><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/deepseek-harness-study/reading.css"></head><body><div id="VPContent"><div class="vp-doc"><main><h1>Start</h1><a href="/deepseek-harness-study/study/">home</a></main></div></div></body></html>')
    const report = inspectStudyPublication({
      generatedRoot: paths.generated,
      distRoot: paths.dist,
      expectedSources: new Set(['START-HERE.md']),
      basePath: '/deepseek-harness-study/',
    })
    assert.equal(report.checkedStudyLinks, 1)
    assert.deepEqual(report.brokenStudyLinks, [])
  } finally {
    rmSync(paths.root, { recursive: true, force: true })
  }
})

test('the study publication audit reports an incomplete readable-page shell', () => {
  const paths = fixture()
  try {
    writeFileSync(join(paths.dist, 'study', 'index.html'), '<html><body><div id="VPContent"><div class="vp-doc"><h1>Start</h1></div></div></body></html>')
    const report = inspectStudyPublication({
      generatedRoot: paths.generated,
      distRoot: paths.dist,
      expectedSources: new Set(['START-HERE.md']),
    })
    assert.deepEqual(report.pagesWithInvalidHtmlShell, [{
      route: 'study/index.html',
      missing: ['zh-CN html language', 'viewport meta', 'reading.css'],
    }])
  } finally {
    rmSync(paths.root, { recursive: true, force: true })
  }
})
