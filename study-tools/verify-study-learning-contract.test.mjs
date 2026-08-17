import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { inspectStudyLearningContracts } from './verify-study-learning-contract.mjs'

test('the current beginner route contains actions and evidence boundaries', () => {
  assert.deepEqual(inspectStudyLearningContracts(), [])
})

test('the learning contract reports missing pages and markers separately', () => {
  const root = mkdtempSync(join(tmpdir(), 'dsh-learning-contract-'))
  try {
    writeFileSync(join(root, 'present.md'), '打开页面，然后记录已经证明和还没有证明。')
    const errors = inspectStudyLearningContracts(root, [
      { source: 'missing.md', label: '缺失页', markers: ['动作'] },
      { source: 'present.md', label: '已有页', markers: ['未出现'] },
    ])
    assert.deepEqual(errors, [
      '缺少学习契约页面：missing.md',
      '已有页缺少学习契约标记：未出现',
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
