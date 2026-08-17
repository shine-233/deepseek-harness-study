import assert from 'node:assert/strict'
import test from 'node:test'
import { verifyStudyEntry } from './verify-study-entry.mjs'

test('the first-time reader route has its source files, copy, and Pages manifest entries', () => {
  assert.deepEqual(verifyStudyEntry(), [])
})
