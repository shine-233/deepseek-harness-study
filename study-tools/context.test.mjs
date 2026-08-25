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
