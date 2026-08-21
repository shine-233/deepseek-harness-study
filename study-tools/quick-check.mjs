#!/usr/bin/env node

/**
 * One-command, offline smoke for the learning repository.
 *
 * The default route checks only deterministic study material and snapshot
 * inputs. `--example` adds the minimum example's test/lint, `--deep` adds the
 * full source-index checks, and `--site` checks the already-built Pages
 * artifact page-by-page. `--runtime` additionally mounts the local ToolRuntime
 * and assembles two provider-free prompt variants. None of these commands
 * starts a DSH process, a provider, a model, or a third-party plugin.
 */

import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const studyTools = resolve(root, 'study-tools')
const node = process.execPath
const packageManager = process.platform === 'win32' ? (process.env.ComSpec ?? 'cmd.exe') : 'pnpm'

function nodeScript(name, args = []) {
  return { executable: node, args: [resolve(studyTools, name), ...args] }
}

function studyToolTests() {
  return readdirSync(studyTools)
    .filter(name => name.endsWith('.test.mjs'))
    .sort()
    .map(name => resolve(studyTools, name))
}

function exampleScript(script) {
  const command = `pnpm.cmd --dir study-examples/minimal-observer-plugin run ${script}`
  return process.platform === 'win32'
    ? { executable: packageManager, args: ['/d', '/s', '/c', command] }
    : { executable: packageManager, args: ['--dir', 'study-examples/minimal-observer-plugin', 'run', script] }
}

const SUPPORTED_OPTIONS = new Set(['--deep', '--example', '--runtime', '--site'])

/**
 * Parse the small command-line surface instead of silently ignoring a typo.
 *
 * @param {string[]} args - Flags after the script name.
 * @returns {{ deep: boolean, example: boolean, runtime: boolean, site: boolean }}
 */
export function parseOptions(args = []) {
  const unknown = args.filter(arg => !SUPPORTED_OPTIONS.has(arg))
  if (unknown.length > 0) throw new Error(`不支持的快速检查选项：${unknown.join('、')}`)
  const options = new Set(args)
  return {
    deep: options.has('--deep'),
    example: options.has('--example'),
    runtime: options.has('--runtime'),
    site: options.has('--site'),
  }
}

/**
 * Build the checks shown by the one-command route.
 *
 * @param {{ deep?: boolean, example?: boolean, runtime?: boolean, site?: boolean }} options - Optional depth.
 * @returns {Array<{ label: string, executable: string, args: string[] }>}
 */
export function createChecks({ deep = false, example = false, runtime = false, site = false } = {}) {
  const checks = [
    {
      label: '学习工具单元测试',
      executable: node,
      args: ['--test', ...studyToolTests()],
    },
    { label: '学习入口接线', ...nodeScript('verify-study-entry.mjs') },
    { label: '学习体验契约', ...nodeScript('verify-study-learning-contract.mjs') },
    { label: '首页状态数字', ...nodeScript('verify-study-home-metrics.mjs') },
    { label: 'Agent 审阅契约', ...nodeScript('verify-agent-review.mjs') },
    { label: '实验页配色对比度', ...nodeScript('verify-lab-contrast.mjs') },
    { label: '固定提交源码链接', ...nodeScript('verify-study-links.mjs') },
    {
      label: '离线工具可见性 A/B',
      ...nodeScript('compare-tool-visibility-ab.mjs', [
        resolve(studyTools, 'tool-visibility-ab.a.example.json'),
        resolve(studyTools, 'tool-visibility-ab.b.example.json'),
      ]),
    },
  ]

  if (example) {
    checks.push(
      {
        label: '最小示例单元测试',
        ...exampleScript('test'),
      },
      {
        label: '最小示例 lint',
        ...exampleScript('lint'),
      },
    )
  }

  if (deep) {
    checks.push(
      { label: '逐文件索引覆盖', ...nodeScript('verify-source-index.mjs') },
      { label: '索引质量信号', ...nodeScript('audit-source-index-quality.mjs') },
    )
  }

  if (site) {
    checks.push(
      { label: '已构建 Pages 入口', ...nodeScript('verify-built-study-site.mjs') },
      { label: '全量学习页面与网页外壳', ...nodeScript('verify-study-publication.mjs') },
    )
  }

  if (runtime) {
    checks.push({
      label: '真实 ToolRuntime 离线 A/B',
      ...nodeScript('benchmark-tool-runtime-ab.mjs', ['--iterations', '20', '--warmup', '5']),
    })
  }

  return checks
}

/**
 * Render the optional-route notes shown by the CLI.
 *
 * Keeping this derived from the parsed boolean object avoids a second, subtly
 * different command-line parser at the point where the process starts its
 * checks.
 *
 * @param {{ deep?: boolean, example?: boolean, runtime?: boolean, site?: boolean }} options - Parsed flags.
 * @returns {string[]} Human-readable notes for enabled optional routes.
 */
export function enabledOptionMessages({ deep = false, example = false, runtime = false, site = false } = {}) {
  const messages = []
  if (deep) messages.push('已开启 --deep：会扫描完整逐文件索引。')
  if (example) messages.push('已开启 --example：会运行最小示例 test 和 lint。')
  if (runtime) messages.push('已开启 --runtime：会挂载本地 ToolRuntime 做 provider-free A/B，不启动 DSH/provider/model。')
  if (site) messages.push('已开启 --site：会检查 website/.dist 中每个学习页的 HTML 外壳、标题、样式和站内链接。')
  return messages
}

/** @param {{ label: string, executable: string, args: string[] }} check */
function runCheck(check) {
  console.log(`\n[检查] ${check.label}`)
  const result = spawnSync(check.executable, check.args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    windowsHide: true,
  })
  if (result.error !== undefined) {
    console.error(`启动失败：${result.error.message}`)
    return false
  }
  if (result.status !== 0) {
    console.error(`退出码：${result.status ?? '未知'}`)
    return false
  }
  return true
}

const invoked = process.argv[1] === undefined ? '' : resolve(process.argv[1])
if (invoked === resolve(import.meta.dirname, 'quick-check.mjs')) {
  let parsedOptions
  try {
    parsedOptions = parseOptions(process.argv.slice(2))
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
    parsedOptions = undefined
  }
  if (parsedOptions === undefined) process.exit()
  const checks = createChecks(parsedOptions)

  console.log('DSH 学习仓库快速检查')
  console.log(`共 ${checks.length} 项；只读教材、快照、链接和示例，不启动 DSH/provider/model。`)
  for (const message of enabledOptionMessages(parsedOptions)) console.log(message)

  const failed = checks.filter(check => !runCheck(check))
  if (failed.length > 0) {
    console.error(`\n快速检查失败：${failed.map(check => check.label).join('、')}`)
    process.exitCode = 1
  } else {
    console.log('\n快速检查通过。它不证明真实 DSH、Loader、provider、模型、安装/卸载或安全行为。')
  }
}
