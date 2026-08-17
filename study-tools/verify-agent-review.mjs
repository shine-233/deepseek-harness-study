#!/usr/bin/env node

/**
 * Verify the repository's Agent-review contract without calling an external
 * model.  The contract is deliberately deterministic: it checks that the
 * review guide, PR template, package entry, and GitHub Actions workflow still
 * ask for evidence, scope, risk, and unverified boundaries.
 *
 * A green result means the review process is wired into the repository.  It
 * does not mean that an Agent has reviewed a pull request, that a model is
 * correct, or that DSH has been run.
 */

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repositoryRoot = resolve(import.meta.dirname, '..')

export const REVIEW_CONTRACT = [
  {
    file: '.github/AGENT_REVIEW.md',
    markers: [
      '# Agent 审阅说明',
      '## 适用范围',
      '## 每次审阅必须回答',
      '## 审阅输出格式',
      '## 禁止的自动化做法',
      '固定源码',
      '普通插件',
      'Bundle',
      'Hook bridge',
      'patched fork',
      '注入',
      '模型输出',
      '人工',
    ],
  },
  {
    file: '.github/pull_request_template.md',
    markers: [
      '## 证据与边界',
      '## 已运行的确定性检查',
      '## 侵入性与审阅',
      '## 仍未验证什么',
      'Agent 审阅',
    ],
  },
  {
    file: 'package.json',
    markers: ['"study:agent-review": "node study-tools/verify-agent-review.mjs"'],
  },
  {
    file: '.github/workflows/study-quality.yml',
    markers: [
      '- name: Verify agent-review contract',
      'run: pnpm run study:agent-review',
    ],
  },
]

/**
 * @param {string} [root] - Repository root to inspect.
 * @returns {{ checked: number, errors: string[] }} Deterministic contract report.
 */
export function inspectAgentReview(root = repositoryRoot) {
  const errors = []
  let checked = 0

  for (const contract of REVIEW_CONTRACT) {
    const path = resolve(root, contract.file)
    if (!existsSync(path)) {
      errors.push(`缺少审阅契约文件：${contract.file}`)
      continue
    }

    checked++
    const text = readFileSync(path, 'utf8')
    for (const marker of contract.markers) {
      if (!text.includes(marker)) errors.push(`${contract.file} 缺少审阅契约标记：${marker}`)
    }
  }

  return { checked, errors }
}

function main() {
  const report = inspectAgentReview()
  if (report.errors.length === 0) {
    console.log(`verify-agent-review: ${report.checked} contract files checked; deterministic wiring passed; no external model invoked.`)
    return 0
  }

  console.error('verify-agent-review: the Agent-review contract is incomplete.')
  for (const error of report.errors) console.error(`  ${error}`)
  return 1
}

if (import.meta.main) process.exitCode = main()
