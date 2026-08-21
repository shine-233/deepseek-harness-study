/**
 * Tests for the lab contrast gate.
 *
 * Each acceptance path is proved to reject an invalid case, not only to pass on
 * the current tree: a gate that never fails is indistinguishable from no gate.
 */

import { strict as assert } from 'node:assert'
import test from 'node:test'

import {
  MARK_FLOOR,
  SEMANTIC_HUES,
  TEXT_FLOOR,
  audit,
  checkPalette,
  collectBackgroundTokens,
  contrastRatio,
  findMarkTokensUsedAsText,
  flatten,
  readPalette,
} from './verify-lab-contrast.mjs'

test('contrastRatio matches the WCAG reference pairs', () => {
  assert.equal(contrastRatio('#000000', '#ffffff').toFixed(2), '21.00')
  assert.equal(contrastRatio('#ffffff', '#ffffff').toFixed(2), '1.00')
  // --signal-ink against the opaque card. The palette comment quotes 5.47 for
  // this hue, measured against the translucent card, which resolves slightly
  // darker than pure white.
  assert.equal(contrastRatio('#aa4d26', '#ffffff').toFixed(2), '5.53')
  assert.equal(contrastRatio('#aa4d26', '#fefefe').toFixed(2), '5.48')
})

test('contrastRatio is symmetric', () => {
  assert.equal(contrastRatio('#8a6410', '#faf8f4'), contrastRatio('#faf8f4', '#8a6410'))
})

test('flatten resolves a translucent surface onto the page colour', () => {
  // A fully opaque layer ignores the backdrop.
  assert.equal(flatten({ hex: '#ffffff', alpha: 1 }, '#000000'), '#ffffff')
  // A fully transparent layer is the backdrop.
  assert.equal(flatten({ hex: '#ffffff', alpha: 0 }, '#123456'), '#123456')
  // The real card: white at 92% over the warm page. The page is warmer in red
  // than in blue, so the flattened result keeps a full red channel.
  assert.equal(flatten({ hex: '#ffffff', alpha: 0.92 }, '#faf8f4'), '#fffefe')
})

test('readPalette separates the light and dark declarations', () => {
  const palette = readPalette(`
    :root { --page: #ffffff; --ink: #000000; }
    @media (prefers-color-scheme: dark) {
      :root { --page: #101010; }
    }
  `)
  assert.equal(palette.light.get('--page').hex, '#ffffff')
  assert.equal(palette.dark.get('--page').hex, '#101010')
  // A dark block overrides only what it names; the rest carries over.
  assert.equal(palette.dark.get('--ink').hex, '#000000')
})

test('readPalette records the alpha of a translucent token', () => {
  const palette = readPalette(':root { --surface: rgba(255, 255, 255, 0.92); }')
  assert.deepEqual(palette.light.get('--surface'), { hex: '#ffffff', alpha: 0.92 })
})

test('readPalette ignores non-colour declarations', () => {
  const palette = readPalette(':root { --dur: 0.2s; --sans: Inter, sans-serif; --page: #fff; }')
  assert.deepEqual([...palette.light.keys()], ['--page'])
})

test('collectBackgroundTokens reports only tokens used as a fill', () => {
  const used = collectBackgroundTokens([
    { name: 'a.css', source: '.x { background: var(--warning-soft); color: var(--signal-soft); }' },
    { name: 'b.css', source: '.y { background-color: var(--brand-soft); }' },
  ])
  assert.ok(used.has('--warning-soft'))
  assert.ok(used.has('--brand-soft'))
  // Declared and never filled with, so no text is measured against it.
  assert.ok(!used.has('--signal-soft'))
})

test('findMarkTokensUsedAsText catches a mark colour in text position', () => {
  const offences = findMarkTokensUsedAsText('.a { color: var(--warning); }')
  assert.equal(offences.length, 1)
  assert.equal(offences[0].token, '--warning')
  assert.equal(offences[0].line, 1)
})

test('findMarkTokensUsedAsText accepts the ink steps', () => {
  const source = SEMANTIC_HUES.map(hue => `.${hue} { color: var(--${hue}-ink); }`).join('\n')
  assert.deepEqual(findMarkTokensUsedAsText(source), [])
})

test('findMarkTokensUsedAsText ignores properties that only end in -color', () => {
  const source = [
    '.a { border-color: var(--signal); }',
    '.b { background-color: var(--deny); }',
    '.c { border-left-color: var(--warning); }',
    '.d { -webkit-text-fill-color: var(--allow); }',
  ].join('\n')
  assert.deepEqual(findMarkTokensUsedAsText(source), [])
})

test('findMarkTokensUsedAsText honours a large-text exemption', () => {
  const sameLine = '.a { color: var(--signal); /* large-text: 36px stamp */ }'
  assert.deepEqual(findMarkTokensUsedAsText(sameLine), [])

  const previousLine = '/* large-text: 36px stamp */\n  color: var(--signal);'
  assert.deepEqual(findMarkTokensUsedAsText(previousLine), [])

  // The exemption does not leak to the line after the declaration.
  const leaked = 'color: var(--signal);\n/* large-text: unrelated */'
  assert.equal(findMarkTokensUsedAsText(leaked).length, 1)
})

test('checkPalette fails an ink step that misses the text floor', () => {
  const palette = readPalette(`:root {
    --page: #ffffff;
    --surface: #ffffff;
    --surface-strong: #ffffff;
    --surface-soft: #ffffff;
    --warning-ink: #e0c07a;
  }`)
  const rows = checkPalette(palette.light, 'light', new Set())
  const failed = rows.filter(row => !row.ok)
  assert.ok(failed.length > 0, 'a pale amber on white must fail the 4.5:1 floor')
  assert.equal(failed[0].floor, TEXT_FLOOR)
})

test('checkPalette fails a mark that misses the graphical floor', () => {
  const palette = readPalette(`:root {
    --page: #ffffff;
    --surface: #ffffff;
    --surface-strong: #ffffff;
    --surface-soft: #ffffff;
    --signal: #f5e6dd;
  }`)
  const rows = checkPalette(palette.light, 'light', new Set())
  const failed = rows.filter(row => !row.ok)
  assert.ok(failed.length > 0, 'a near-white mark on white must fail the 3:1 floor')
  assert.equal(failed[0].floor, MARK_FLOOR)
})

test('checkPalette measures an ink step against its own panel only when filled with', () => {
  const source = `:root {
    --page: #ffffff;
    --surface: #ffffff;
    --surface-strong: #ffffff;
    --surface-soft: #ffffff;
    --warning-ink: #8a6410;
    --warning-soft: #f6ecd6;
  }`
  const palette = readPalette(source)

  const withoutPanel = checkPalette(palette.light, 'light', new Set())
  assert.ok(!withoutPanel.some(row => row.pair.includes('--warning-soft')))

  const withPanel = checkPalette(palette.light, 'light', new Set(['--warning-soft']))
  assert.ok(withPanel.some(row => row.pair.includes('--warning-soft')))
})

test('checkPalette resolves a translucent card before measuring', () => {
  // #8a6410 clears 4.5:1 on white but not on the dark page behind a clear card,
  // so the alpha has to be flattened rather than ignored.
  const palette = readPalette(`:root {
    --page: #101014;
    --surface: rgba(255, 255, 255, 0.92);
    --surface-strong: #ffffff;
    --surface-soft: #f4f1ea;
    --warning-ink: #8a6410;
  }`)
  const rows = checkPalette(palette.light, 'light', new Set())
  const onCard = rows.find(row => row.pair.includes('--warning-ink on --surface'))
  assert.ok(onCard.ratio > 4.5, 'the flattened card is nearly white, so the ink step passes')
})

test('the published lab stylesheets pass both floors and the text-colour rule', () => {
  const { rows, offences, failures } = audit()
  assert.ok(rows.length > 0, 'the audit must find a palette to check')
  assert.deepEqual(offences, [], 'a mark colour is being used as text')
  assert.deepEqual(
    failures.map(row => `${row.pair} = ${row.ratio.toFixed(2)} < ${row.floor}`),
    [],
  )
})
