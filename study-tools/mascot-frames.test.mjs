import assert from 'node:assert/strict'
import { test } from 'node:test'
import { MASCOT_FRAMES, MASCOT_PALETTE, MASCOT_GRID_W, buildMascotRects } from '../website/public/mascot-sprite.js'

test('every named frame shares the grid width and uses only palette characters', () => {
  for (const [name, grid] of Object.entries(MASCOT_FRAMES)) {
    assert.equal(grid.length, 22, `${name} 行数应为 22`)
    for (const row of grid) {
      assert.ok(row.length <= MASCOT_GRID_W, `${name} 行超宽`)
      for (const ch of row) {
        assert.ok(ch === '.' || ch in MASCOT_PALETTE, `${name} 出未知字符 ${ch}`)
      }
    }
  }
})

test('idle / wave / walk keep open eyes; happy and nap close them differently', () => {
  const eyeRows = grid => grid.filter(row => row.includes('E') || (row.includes('w') && row.includes('S')))
  assert.equal(eyeRows(MASCOT_FRAMES.idle).length, 2)
  assert.equal(eyeRows(MASCOT_FRAMES.wave).length, 2)
  assert.equal(eyeRows(MASCOT_FRAMES.walk).length, 2)
  // 开心：∧ 眼（上行只有边缘 E）
  assert.match(MASCOT_FRAMES.happy[11], /S\.E\.SSSSS\.E\.S/)
  assert.match(MASCOT_FRAMES.happy[12], /SE\.ESSSSSE\.ES/)
  // 打盹：上眼行完全闭 合，下眼行留一条线
  assert.ok(!MASCOT_FRAMES.nap[11].includes('E'))
  assert.match(MASCOT_FRAMES.nap[12], /SEEESSSSSEEES/)
})

test('wave raises the right arm and drops it from the standing rows', () => {
  assert.match(MASCOT_FRAMES.wave[2], /DD\.$/)
  assert.match(MASCOT_FRAMES.wave[4], /DD\.$/)
  // 待机帧右臂在站立行，挥手帧那里应为空
  assert.match(MASCOT_FRAMES.idle[18], /\.DD\.\.$/)
  assert.ok(!/\DD\.\.$/.test(MASCOT_FRAMES.wave[18].replace(/\./g, '')) || MASCOT_FRAMES.wave[18].endsWith('.....'))
})

test('walk frame splays the feet', () => {
  assert.match(MASCOT_FRAMES.walk[19], /\.DD\.$/)
  assert.match(MASCOT_FRAMES.walk[20], /\.\.ss\.$/)
})

test('buildMascotRects renders a custom frame and marks eye rects', () => {
  const rects = buildMascotRects(MASCOT_FRAMES.idle)
  assert.ok(rects.length > 40)
  const paletteValues = Object.values(MASCOT_PALETTE)
  assert.ok(rects.every(r => paletteValues.includes(r.fill) || r.fill === '#cccccc'))
  assert.ok(rects.some(r => r.eye))
  const happy = buildMascotRects(MASCOT_FRAMES.happy)
  assert.ok(happy.some(r => r.eye))
  const nap = buildMascotRects(MASCOT_FRAMES.nap)
  // 打盹帧的上眼行没有眼睛格，但下眼行仍有
  assert.ok(nap.some(r => r.eye))
})
