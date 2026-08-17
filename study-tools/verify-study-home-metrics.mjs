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
  const actual = parseHomeMetrics(readFileSync(resolve(root, 'SITE-HOME.md'), 'utf8'))
  const errors = Object.keys(expected)
    .filter(name => actual[name] !== expected[name])
    .map(name => `首页 data-${name}=${String(actual[name])}，当前仓库应为 ${expected[name]}`)
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
