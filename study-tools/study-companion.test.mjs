import assert from 'node:assert/strict'
import { test } from 'node:test'

let companion
try {
  companion = await import('../website/public/study-companion.js')
} catch (error) {
  // 与其他 lab 模块同一约定：模块顶层不允许碰 document。
  throw new Error(`study-companion.js must import without a DOM: ${error.message}`)
}

test('the mascot grid renders merged rects with eye cells flagged', () => {
  const rects = companion.buildMascotRects()
  assert.ok(rects.length > 40 && rects.length < 220, `rect count looks sane (${rects.length})`)
  const eyes = rects.filter(rect => rect.eye)
  assert.ok(eyes.length >= 2, 'both eye runs are flagged for the blink animation')
  const width = Math.max(...rects.map(rect => rect.x + rect.w))
  const height = Math.max(...rects.map(rect => rect.y + 1))
  assert.ok(width <= companion.MASCOT_GRID_W, 'no rect exceeds the declared grid width')
  assert.equal(height, companion.MASCOT_SPRITE.length)
})

test('every palette character in the sprite resolves to a color', () => {
  const unknown = new Set()
  for (const row of companion.MASCOT_SPRITE) {
    for (const ch of row) {
      if (ch !== '.' && !(ch in companion.MASCOT_PALETTE)) unknown.add(ch)
    }
  }
  assert.deepEqual([...unknown], [], 'sprite uses only palette characters')
})

test('each line pool is non-empty and free of duplicate sentences', () => {
  for (const [pool, lines] of Object.entries(companion.COMPANION_LINES)) {
    assert.ok(lines.length >= 2, `${pool} has at least two lines`)
    assert.equal(new Set(lines).size, lines.length, `${pool} has no duplicate lines`)
    for (const line of lines) {
      assert.ok(line.length <= 30, `${pool} line stays short enough for the bubble: ${line}`)
    }
  }
})
