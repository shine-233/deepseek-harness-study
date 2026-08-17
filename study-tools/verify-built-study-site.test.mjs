import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { inspectBuiltStudySite, REQUIRED_PUBLISHED_PAGES } from './verify-built-study-site.mjs'

test('the default home contract keeps a visible recovery lane for beginners', () => {
  const home = REQUIRED_PUBLISHED_PAGES.find(page => page.file === 'index.html')
  assert.ok(home)
  assert.ok(home.markers.includes('dsh-stuck-card'))
  assert.ok(home.markers.includes('卡住时不用猜'))
})

test('the built-study contract accepts pages with all required markers', () => {
  const root = mkdtempSync(join(tmpdir(), 'dsh-built-study-site-'))
  try {
    mkdirSync(join(root, 'study'), { recursive: true })
    writeFileSync(join(root, 'reading.css'), '/* reading layer */')
    writeFileSync(join(root, 'favicon.svg'), '<svg />')
    writeFileSync(join(root, 'index.html'), '<a>第一次来，按这里走</a><link href="reading.css">')
    writeFileSync(join(root, 'study', 'index.html'), '第一课：从零开始读 DSH')
    const report = inspectBuiltStudySite(root, [
      { file: 'index.html', label: 'home', markers: ['第一次来，按这里走', 'reading.css'] },
      { file: 'study/index.html', label: 'study', markers: ['第一课：从零开始读 DSH'] },
    ])
    assert.deepEqual(report, { checked: 2, missingFiles: [], missingMarkers: [], missingAssets: [] })
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('the built-study contract reports a missing page and marker separately', () => {
  const root = mkdtempSync(join(tmpdir(), 'dsh-built-study-site-'))
  try {
    writeFileSync(join(root, 'index.html'), '首页')
    const report = inspectBuiltStudySite(root, [
      { file: 'index.html', label: 'home', markers: ['缺失按钮'] },
      { file: 'study/index.html', label: 'study', markers: ['第一课'] },
    ])
    assert.deepEqual(report, {
      checked: 1,
      missingFiles: ['study/index.html'],
      missingMarkers: [{ file: 'index.html', marker: '缺失按钮' }],
      missingAssets: ['reading.css', 'favicon.svg'],
    })
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
