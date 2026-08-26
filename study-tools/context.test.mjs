import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  buildContextInjectionModel,
  evaluateContextOracle,
} from '../website/public/context-model.js'

test('the same input produces byte-identical output', () => {
  const input = { cwdDepth: 1, hasTimeContext: true, hasSessionRef: false }
  assert.equal(JSON.stringify(buildContextInjectionModel(input)), JSON.stringify(buildContextInjectionModel(input)))
})

test('discovery deduplicates identical content across candidates', () => {
  const model = buildContextInjectionModel({ cwdDepth: 2, hasTimeContext: false, hasSessionRef: false })
  const contents = model.chain.map(item => item.content)
  assert.equal(new Set(contents).size, contents.length, 'duplicate content found')
})

test('same-directory candidates with byte-identical content keep only the earliest name', () => {
  const model = buildContextInjectionModel({ cwdDepth: 2, sameDirDuplicate: true })
  assert.equal(model.observations.deduplicated, 1)
  assert.ok(model.chain.some(item => item.path === 'packages/app/AGENTS.md'), 'AGENTS.md 应保留')
  assert.ok(!model.chain.some(item => item.path === 'packages/app/CLAUDE.md'), 'CLAUDE.md 应被去重丢弃')
  const contents = model.chain.map(item => item.content)
  assert.equal(new Set(contents).size, contents.length)
})

test('the duplicate pair has no effect before cwd reaches that directory', () => {
  const shallow = buildContextInjectionModel({ cwdDepth: 1, sameDirDuplicate: true })
  assert.equal(shallow.observations.deduplicated, 0)
  const plain = buildContextInjectionModel({ cwdDepth: 1 })
  assert.equal(JSON.stringify(shallow.chain), JSON.stringify(plain.chain))
})

test('oracle accepts an honest dedup projection and rejects a tampered one', () => {
  const model = buildContextInjectionModel({ cwdDepth: 2, sameDirDuplicate: true })
  assert.equal(evaluateContextOracle(model).pass, true)
  const tampered = { ...model, observations: { ...model.observations, deduplicated: 0 } }
  assert.equal(evaluateContextOracle(tampered).pass, false)
})

test('global instructions always come first when present', () => {
  const model = buildContextInjectionModel({ cwdDepth: 0, hasTimeContext: false, hasSessionRef: false })
  if (model.chain.length > 0) {
    assert.equal(model.chain[0].source, 'global')
  }
})

test('deeper cwd discovers more files', () => {
  const shallow = buildContextInjectionModel({ cwdDepth: 0 })
  const deep = buildContextInjectionModel({ cwdDepth: 2 })
  assert.ok(deep.chain.length >= shallow.chain.length)
})
