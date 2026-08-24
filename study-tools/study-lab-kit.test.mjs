import assert from 'node:assert/strict'
import { test } from 'node:test'

let kit
test('setup: study-lab-kit.js imports without a DOM', async () => {
  try {
    kit = await import('../website/public/study-lab-kit.js')
  } catch (error) {
    throw new Error(`study-lab-kit.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof kit.nextScrubValue, 'function')
})

test('nextScrubValue converts horizontal pixels into slider steps', () => {
  const range = { min: 3, max: 260, step: 1 }
  assert.equal(kit.nextScrubValue(8, 6 * 5, range), 13)
  assert.equal(kit.nextScrubValue(13, -6 * 4, range), 9)
  // 半格像素四舍五入：不到半步不动，超过半步走一步。
  assert.equal(kit.nextScrubValue(8, 2, range), 8)
  assert.equal(kit.nextScrubValue(8, 3, range), 9)
})

test('nextScrubValue clamps to the slider range', () => {
  const range = { min: 3, max: 260, step: 1 }
  assert.equal(kit.nextScrubValue(258, 60, range), 260)
  assert.equal(kit.nextScrubValue(4, -60, range), 3)
})

test('nextScrubValue honors non-unit steps and custom pixel scale', () => {
  assert.equal(kit.nextScrubValue(0, 12, { min: 0, max: 10, step: 0.5, pxPerStep: 4 }), 1.5)
})

test('nextScrubValue returns the current value for unusable ranges', () => {
  assert.equal(kit.nextScrubValue(7, 100, {}), 7)
  assert.equal(kit.nextScrubValue(7, 100, { min: Number.NaN, max: 10 }), 7)
})
