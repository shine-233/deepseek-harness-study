import assert from 'node:assert/strict'
import test from 'node:test'
import { createChecks, enabledOptionMessages, parseOptions } from './quick-check.mjs'

test('default quick check is offline and keeps the first-time route small', () => {
  const checks = createChecks()
  assert.deepEqual(checks.map(check => check.label), [
    '学习工具单元测试',
    '学习入口接线',
    '学习体验契约',
    '首页状态数字',
    'Agent 审阅契约',
    '实验页配色对比度',
    '固定提交源码链接',
    '离线工具可见性 A/B',
  ])
  assert.ok(checks.every(check => check.executable.endsWith('node.exe') || check.executable.endsWith('node')))
})

test('optional flags add example and deep evidence without changing the default route', () => {
  const checks = createChecks({ example: true, deep: true })
  assert.deepEqual(checks.slice(-4).map(check => check.label), [
    '最小示例单元测试',
    '最小示例 lint',
    '逐文件索引覆盖',
    '索引质量信号',
  ])
  assert.ok(checks.some(check => check.args.some(arg => arg.endsWith('verify-source-index.mjs'))))
  assert.ok(checks.some(check => check.args.join(' ').includes('run lint')))
})

test('the site flag checks the built beginner route and every projected study page', () => {
  const checks = createChecks({ site: true })
  assert.deepEqual(checks.slice(-2).map(check => check.label), [
    '已构建 Pages 入口',
    '全量学习页面与网页外壳',
  ])
  assert.ok(checks.some(check => check.args.some(arg => arg.endsWith('verify-built-study-site.mjs'))))
  assert.ok(checks.some(check => check.args.some(arg => arg.endsWith('verify-study-publication.mjs'))))
})

test('the command-line site flag reaches the check builder and typos fail closed', () => {
  assert.deepEqual(parseOptions(['--site']), { deep: false, example: false, runtime: false, site: true })
  assert.throws(() => parseOptions(['--siet']), /不支持的快速检查选项/)
})

test('the CLI option notes are derived from parsed flags', () => {
  assert.deepEqual(enabledOptionMessages(parseOptions(['--deep', '--example', '--runtime', '--site'])), [
    '已开启 --deep：会扫描完整逐文件索引。',
    '已开启 --example：会运行最小示例 test 和 lint。',
    '已开启 --runtime：会挂载本地 ToolRuntime 做 provider-free A/B，不启动 DSH/provider/model。',
    '已开启 --site：会检查 website/.dist 中每个学习页的 HTML 外壳、标题、样式和站内链接。',
  ])
})
