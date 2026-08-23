import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import {
  collectLabLessonLinks,
  inspectBuiltStudySite,
  inspectLabLessonLinks,
  REQUIRED_PUBLISHED_PAGES,
} from './verify-built-study-site.mjs'

test('the default home contract keeps the reading layer a beginner needs', () => {
  const home = REQUIRED_PUBLISHED_PAGES.find(page => page.file === 'index.html')
  assert.ok(home)
  // JournalHome 在客户端挂载，构建产物只保证阅读层资产与进度条存在；
  // 首屏文案与拍立得数字的契约由组件源侧的门禁负责。
  assert.ok(home.markers.includes('dsh-reading-progress'))
  assert.ok(home.markers.includes('reading.css'))
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

test('lab lesson links collect from the public pages and strip ./ prefixes', () => {
  const root = mkdtempSync(join(tmpdir(), 'dsh-lab-links-'))
  try {
    writeFileSync(join(root, 'turn-lab.html'),
      '<a href="./study/lessons/05-Session日志与恢复.html">x</a>'
      + '<a href="/study/lessons/00-开始这里.html">y</a>')
    const links = collectLabLessonLinks(root)
    assert.deepEqual(links, [
      { file: 'turn-lab.html', link: 'study/lessons/05-Session日志与恢复.html' },
      { file: 'turn-lab.html', link: 'study/lessons/00-开始这里.html' },
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a wrong-case lesson link fails against a case-sensitive listing, not existsSync', () => {
  const root = mkdtempSync(join(tmpdir(), 'dsh-lab-links-dist-'))
  try {
    mkdirSync(join(root, 'study', 'lessons'), { recursive: true })
    // 构建产物里是大写 S；existsSync 在 Windows/macOS 上对错误大小写也会返回 true，
    // 所以校验必须对照目录清单做精确字符串比较。
    writeFileSync(join(root, 'study', 'lessons', '05-Session日志与恢复.html'), 'lesson')
    const broken = inspectLabLessonLinks(root, [
      { file: 'session-log-lab.html', link: 'study/lessons/05-session日志与恢复.html' },
      { file: 'compaction-lab.html', link: 'study/lessons/05-Session日志与恢复.html' },
    ])
    assert.deepEqual(broken, [
      { file: 'session-log-lab.html', link: 'study/lessons/05-session日志与恢复.html' },
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
