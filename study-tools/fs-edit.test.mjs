import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  EDIT_TARGETS,
  SANDBOX_MODES,
  buildFsEditModel,
  evaluateFsEditOracle,
  fileContentFor,
} from '../website/public/fs-edit-model.js'

test('the same input produces byte-identical output', () => {
  const input = { target: 'config', sandboxMode: 'workspace-write', oldStr: 'timeout: 30s', newStr: 'timeout: 45s' }
  assert.equal(
    JSON.stringify(buildFsEditModel(input)),
    JSON.stringify(buildFsEditModel(input)),
  )
})

const GRID = []
for (const target of EDIT_TARGETS.map(item => item.id)) {
  for (const sandboxMode of SANDBOX_MODES) {
    for (const [oldStr, newStr] of [
      ['timeout: 30s', 'timeout: 45s'],
      ['retries: 3', 'retries: 5'],
      ['absent-line', 'x'],
      ['pool: 8', ''],
    ]) {
      GRID.push({ target, sandboxMode, oldStr, newStr })
    }
  }
}

test('every input passes every oracle check across the whole input grid', () => {
  for (const input of GRID) {
    const model = buildFsEditModel(input)
    const result = evaluateFsEditOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true,
        `${input.target}/${input.sandboxMode}/${input.oldStr} failed ${check.id}: ${check.actual}`)
    }
  }
})

test('a unique match inside workspace writes and reports success verbatim', () => {
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'workspace-write', oldStr: 'timeout: 30s', newStr: 'timeout: 45s' })
  assert.equal(model.outcome.kind, 'success')
  assert.equal(model.outcome.message, 'The file /workspace/config.yml has been edited successfully.')
  assert.ok(model.after.includes('timeout: 45s'))
  assert.equal(model.diffCard.diffs[0].oldText, 'timeout: 30s')
  assert.equal(model.diffCard.diffs[0].newText, 'timeout: 45s')
})

test('duplicate matches are rejected with upstream line numbers and no write', () => {
  const content = fileContentFor('config')
  const occurrences = [...content.matchAll(/retries: 3/g)].length
  assert.equal(occurrences, 2)
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'danger-full-access', oldStr: 'retries: 3', newStr: 'retries: 5' })
  assert.equal(model.outcome.kind, 'ambiguous')
  assert.equal(model.outcome.errorCode, 'FS_AMBIGUOUS_EDIT')
  assert.equal(model.outcome.message,
    'No replacement was performed. Multiple occurrences of old_str `retries: 3` in lines [2, 6]. Please ensure it is unique')
  assert.equal(model.after, null)
})

test('read-only mode denies even in-workspace writes with the upstream marker', () => {
  const model = buildFsEditModel({ target: 'config', sandboxMode: 'read-only', oldStr: 'timeout: 30s', newStr: 'x' })
  assert.equal(model.outcome.kind, 'sandbox-denied')
  assert.equal(model.outcome.message, '[sandbox: file access denied under read-only mode]')
  assert.equal(model.after, null)
})

test('workspace-write denies only paths outside the workspace root', () => {
  const inside = buildFsEditModel({ target: 'config', sandboxMode: 'workspace-write', oldStr: 'timeout: 30s', newStr: 'x' })
  const outside = buildFsEditModel({ target: 'notes', sandboxMode: 'workspace-write', oldStr: 'retries: 3', newStr: 'x' })
  assert.equal(inside.outcome.kind, 'success')
  assert.equal(outside.outcome.kind, 'sandbox-denied')
  assert.equal(outside.outcome.message, '[sandbox: file access denied under workspace-write mode]')
})
