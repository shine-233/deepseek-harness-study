#!/usr/bin/env node

/**
 * Keep the learning status strip on SITE-HOME.md honest.
 *
 * The homepage deliberately shows the latest deterministic local checks so a
 * beginner can understand what the repository has actually checked. Those
 * numbers are easy to forget when a new lesson, index entry, or test is added,
 * so this script derives the expected values from the repository and compares
 * them with the source homepage. It does not start DSH, a provider, a model,
 * or a third-party plugin.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { expectedStudySources } from './verify-study-publication.mjs'

const repositoryRoot = resolve(import.meta.dirname, '..')

/**
 * Count declared test cases in a file.
 *
 * This counts `test(` and `it(` calls in the source, so a table-driven file that
 * generates one case per discovered module contributes one, not one per case.
 * The homepage number is therefore the number of declared cases, which is stable
 * against how many files happen to exist; `node --test` reports the larger
 * executed total.
 */
function countTestCalls(text) {
  return [...text.matchAll(/\b(?:test|it)\s*\(/g)].length
}

function countStudyLearningTests(root = repositoryRoot) {
  return readdirSync(resolve(root, 'study-tools'))
    .filter(name => name.endsWith('.test.mjs'))
    .reduce((total, name) => total + countTestCalls(readFileSync(resolve(root, 'study-tools', name), 'utf8')), 0)
}

function countExampleTests(root = repositoryRoot) {
  return countTestCalls(readFileSync(resolve(root, 'study-examples/minimal-observer-plugin/tests/plugin.test.js'), 'utf8'))
}

function countStructuralErrors(root = repositoryRoot) {
  const output = execFileSync(process.execPath, [resolve(root, 'study-tools/verify-source-index.mjs')], {
    cwd: root,
    encoding: 'utf8',
  })
  return Number(output.match(/^结构错误：(\d+)$/m)?.[1] ?? Number.NaN)
}

/**
 * @param {string} text - Source homepage Markdown.
 * @returns {Record<string, number>}
 */
export function parseHomeMetrics(text) {
  const names = ['study-pages', 'index-files', 'learning-tests', 'example-tests', 'structural-errors']
  return Object.fromEntries(names.map(name => {
    const value = text.match(new RegExp(`data-${name}="([0-9,]+)"`))?.[1]
    return [name, value === undefined ? Number.NaN : Number(value.replaceAll(',', ''))]
  }))
}

/**
 * Read the numbers the strip actually renders, keyed by the label beneath each.
 *
 * The `data-*` attributes and the `<strong>` values are two representations of
 * the same counts, and checking only the attributes let them drift: the strip
 * shipped `data-study-pages="106"` above a rendered `105`, and
 * `data-learning-tests="110"` above a rendered `27 + 8`. A reader sees the
 * rendered value, so it carries the same obligation as the attribute.
 *
 * A rendered cell may sum two counts, as the test cell does, so a `a + b` value
 * parses to the list of its parts.
 *
 * @param {string} text - Source homepage Markdown.
 * @returns {Map<string, number[]>} Label to the numbers rendered above it.
 */
export function parseRenderedMetrics(text) {
  const strip = text.match(/<div class="dsh-status-strip"[\s\S]*?\n<\/div>/)?.[0] ?? ''
  const rendered = new Map()
  for (const cell of strip.matchAll(/<strong>([\d,+\s]+)<\/strong>\s*<span>([^<]+)<\/span>/g)) {
    const parts = cell[1].split('+').map(part => Number(part.trim().replaceAll(',', '')))
    rendered.set(cell[2].trim(), parts)
  }
  return rendered
}

/**
 * Labels on the strip, and which derived counts each one renders.
 *
 * A label maps to a list because one cell shows two counts added together.
 */
const RENDERED_CELLS = Object.freeze({
  中文学习页面: ['study-pages'],
  逐文件索引: ['index-files'],
  '学习工具 / 示例测试': ['learning-tests', 'example-tests'],
  结构错误: ['structural-errors'],
})

/**
 * @param {string} [root] - Repository root for tests.
 * @returns {{ expected: Record<string, number>, actual: Record<string, number>, errors: string[] }}
 */
export function inspectStudyHomeMetrics(root = repositoryRoot) {
  const expected = {
    'study-pages': expectedStudySources(root).size,
    'index-files': JSON.parse(readFileSync(resolve(root, 'study/source-index-manifest.json'), 'utf8')).files.length,
    'learning-tests': countStudyLearningTests(root),
    'example-tests': countExampleTests(root),
    'structural-errors': countStructuralErrors(root),
  }
  const source = readFileSync(resolve(root, 'SITE-HOME.md'), 'utf8')
  const actual = parseHomeMetrics(source)
  const errors = Object.keys(expected)
    .filter(name => actual[name] !== expected[name])
    .map(name => `首页 data-${name}=${String(actual[name])}，当前仓库应为 ${expected[name]}`)

  const rendered = parseRenderedMetrics(source)
  for (const [label, names] of Object.entries(RENDERED_CELLS)) {
    const shown = rendered.get(label)
    const want = names.map(name => expected[name])
    if (shown === undefined) {
      errors.push(`首页状态条缺少「${label}」这一格`)
    } else if (shown.length !== want.length || shown.some((value, index) => value !== want[index])) {
      errors.push(`首页「${label}」显示 ${shown.join(' + ')}，当前仓库应为 ${want.join(' + ')}`)
    }
  }

  return { expected, actual, errors }
}

function main() {
  const report = inspectStudyHomeMetrics()
  if (report.errors.length === 0) {
    console.log(`verify-study-home-metrics: ${report.expected['study-pages']} pages, ${report.expected['index-files']} index files, ${report.expected['learning-tests']} learning tests, ${report.expected['example-tests']} example tests, ${report.expected['structural-errors']} structural errors.`)
    return 0
  }
  console.error('verify-study-home-metrics: the homepage status strip is stale.')
  for (const error of report.errors) console.error(`  ${error}`)
  return 1
}

if (import.meta.main) process.exitCode = main()
