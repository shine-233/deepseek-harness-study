import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import test from 'node:test'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { apply, Config, inject, name, previewTextBlocks, resolveConfig } from '../src/index.js'

const exampleRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function createFakeContext() {
  const listeners = new Map()
  return {
    on(event, listener) {
      listeners.set(event, listener)
    },
    emit(event, ...args) {
      listeners.get(event)?.(...args)
    },
  }
}

test('exports a third-party observer plugin that declares the tools service', () => {
  assert.equal(name, 'dsh-study-minimal-observer-plugin')
  assert.deepEqual(inject, ['tools'])
})

test('exports a loader-facing schema with the patch defaults', () => {
  assert.deepEqual(Config({}), {
    maxPreviewBlocks: 3,
    maxPreviewCharacters: 160,
  })
})

test('keeps only short, single-line text previews', () => {
  const preview = previewTextBlocks([
    { type: 'text', text: 'first\nline' },
    { type: 'image', url: 'https://example.invalid/secret.png' },
    { type: 'text', text: 'x'.repeat(200) },
    { type: 'text', text: 'third' },
    { type: 'text', text: 'fourth' },
  ])

  assert.deepEqual(preview, [
    'first line',
    'x'.repeat(160),
    'third',
  ])
})

test('takes preview limits from the deployment config', () => {
  const ctx = createFakeContext()
  const lines = []

  apply(ctx, { maxPreviewBlocks: 1, maxPreviewCharacters: 160 }, { log: (line) => lines.push(line) })
  ctx.emit('tools/result', { name: 'study_greet' }, {
    content: [
      { type: 'text', text: 'x'.repeat(200) },
      { type: 'text', text: 'not included' },
    ],
  })

  assert.deepEqual(lines, [`[study-observer] study_greet -> [${JSON.stringify('x'.repeat(160))}]`])
})

test('rejects non-positive preview limits', () => {
  assert.throws(() => resolveConfig({ maxPreviewCharacters: 0 }), /positive safe integer/)
})

test('rejects misspelled deployment keys instead of silently using a default', () => {
  assert.throws(() => resolveConfig({ maxPreviewCharaters: 80 }), /unknown key: maxPreviewCharaters/)
})

test('observes a result through the public event without mutating it', () => {
  const ctx = createFakeContext()
  const lines = []
  const result = {
    content: [
      { type: 'text', text: 'safe preview' },
      { type: 'image', url: 'https://example.invalid/not-logged.png' },
    ],
  }

  apply(ctx, {}, { log: (line) => lines.push(line) })
  ctx.emit('tools/result', { name: 'study_greet' }, result)

  assert.deepEqual(lines, ['[study-observer] study_greet -> ["safe preview"]'])
  assert.deepEqual(result, {
    content: [
      { type: 'text', text: 'safe preview' },
      { type: 'image', url: 'https://example.invalid/not-logged.png' },
    ],
  })
})

test('the copy-paste demo prints one bounded observation without a DSH process', () => {
  const output = execFileSync(process.execPath, [resolve(exampleRoot, 'demo.mjs')], {
    cwd: exampleRoot,
    encoding: 'utf8',
  })

  assert.equal(output.trim(), '[study-observer] study_greet -> ["hello world","second block"]')
})
