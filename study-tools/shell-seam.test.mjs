import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SHELL_EXECUTORS,
  buildShellSeamModel,
  evaluateShellSeamOracle,
  resolveShellRequest,
} from '../website/public/shell-seam-model.js'

test('the same input produces byte-identical output', () => {
  const input = { executor: 'bash-sandbox', request: { command: 'npm test' } }
  assert.equal(
    JSON.stringify(buildShellSeamModel(input)),
    JSON.stringify(buildShellSeamModel(input)),
  )
})

const GRID = []
for (const executor of SHELL_EXECUTORS) {
  for (const workdir of [undefined, '/custom/dir']) {
    for (const timeoutMs of [undefined, 300000, 900000]) {
      for (const sandboxPolicy of [undefined, { mode: 'read-only', root: '/workspace' }, { mode: 'danger-full-access', root: '/workspace' }]) {
        GRID.push({ executor, request: { command: 'npm test', ...(workdir === undefined ? {} : { workdir }), ...(timeoutMs === undefined ? {} : { timeoutMs }), ...(sandboxPolicy === undefined ? {} : { sandboxPolicy }) } })
      }
    }
  }
}

test('every input passes every oracle check across the whole input grid', () => {
  assert.equal(GRID.length, 36)
  for (const input of GRID) {
    const model = buildShellSeamModel(input)
    const result = evaluateShellSeamOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true,
        `${input.executor}/${input.request.timeoutMs}/${input.request.sandboxPolicy?.mode} failed ${check.id}: ${check.actual}`)
    }
  }
})

test('resolve fills every required key and never leaves a default behind', () => {
  const model = resolveShellRequest({ executor: 'bash-local', request: { command: 'npm test' } })
  assert.equal(model.spec.workdir, '/repo')
  assert.equal(model.spec.timeoutMs, 120_000)
  assert.equal(model.spec.stdoutMaxBytes, 65_536)
  assert.equal(model.spec.sandboxPolicy, null)
})

test('timeout above maxTimeoutMs is clamped inside resolve, not at run time', () => {
  const model = resolveShellRequest({ executor: 'bash-local', request: { command: 'x', timeoutMs: 900000 } })
  const entry = model.entries.find(item => item.key === 'timeoutMs')
  assert.equal(entry.value, 600_000)
  assert.equal(entry.source, 'clamped')
})

test('sandboxing executor stamps a policy the caller omitted; local stays inert', () => {
  const stamped = resolveShellRequest({ executor: 'bash-sandbox', request: { command: 'x' } })
  assert.equal(stamped.entries.find(entry => entry.key === 'sandboxPolicy').source, 'executor-stamp')
  assert.match(String(stamped.spec.sandboxPolicy), /workspace-write/)

  const inert = resolveShellRequest({ executor: 'bash-local', request: { command: 'x' } })
  assert.equal(inert.entries.find(entry => entry.key === 'sandboxPolicy').source, 'executor-inert')
  assert.equal(inert.spec.sandboxPolicy, null)
})

test('an explicitly provided policy is carried verbatim on either executor', () => {
  for (const executor of SHELL_EXECUTORS) {
    const model = resolveShellRequest({ executor, request: { command: 'x', sandboxPolicy: { mode: 'read-only', root: '/workspace' } } })
    assert.equal(model.entries.find(entry => entry.key === 'sandboxPolicy').source, 'request')
    assert.match(String(model.spec.sandboxPolicy), /read-only/)
  }
})
