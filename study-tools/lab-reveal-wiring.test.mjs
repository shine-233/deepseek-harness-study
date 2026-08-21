/**
 * Entrance animation wiring for the lab charts.
 *
 * The reveal is decorative: it must not encode a value, and switching it off must
 * not remove information. Two failure modes are invisible in a browser, which is
 * why they need a gate rather than review.
 *
 * The first is a silent no-op. `revealMarks` returns early when a container holds
 * no `[data-reveal]` element, so a page can call `revealOnScroll` on every chart
 * and animate nothing. The code-mode lab shipped that way: one bound container,
 * 110 SVG marks, zero tagged.
 *
 * The second is tagged chrome. Grid lines, axes, capacity lines and the
 * current-tick guide are not data, so fading them in makes the chart look like it
 * is still loading. Only the data marks may carry the attribute.
 */

import { strict as assert } from 'node:assert'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)

const read = name => readFileSync(new URL(name, PUBLIC_DIR), 'utf8')

/** Lab entry points, excluding the shared modules and the pure models. */
function labPages() {
  return readdirSync(PUBLIC_DIR)
    .filter(name => name.endsWith('-lab.js') || name === 'research-debug-bridge.js')
    .sort()
}

/** Class names that draw chart furniture rather than a value. */
const CHROME_CLASSES = [
  'tick-grid',
  'lane-line',
  'grid',
  'baseline',
  'axis',
  'axis-title',
  'conc-grid',
  'conc-axis',
  'conc-cap',
  'conc-guide',
]

test('a page that calls revealOnScroll also tags marks to reveal', () => {
  const offenders = []
  for (const name of labPages()) {
    const source = read(name)
    const calls = (source.match(/revealOnScroll\s*\(/g) ?? []).length
    const tagged = (source.match(/'data-reveal'/g) ?? []).length
    if (calls > 0 && tagged === 0) offenders.push(`${name}: ${calls} revealOnScroll call(s), 0 tagged marks`)
  }
  assert.deepEqual(offenders, [], 'revealOnScroll runs but finds nothing to animate')
})

test('a page that tags marks also schedules the reveal', () => {
  const offenders = []
  for (const name of labPages()) {
    const source = read(name)
    const calls = (source.match(/revealOnScroll\s*\(/g) ?? []).length
    const tagged = (source.match(/'data-reveal'/g) ?? []).length
    if (tagged > 0 && calls === 0) offenders.push(`${name}: ${tagged} tagged mark(s), never revealed`)
  }
  assert.deepEqual(offenders, [], 'tagged marks would stay at their pre-entrance state')
})

test('chart chrome is never tagged for reveal', () => {
  const offenders = []
  for (const name of labPages()) {
    for (const [index, line] of read(name).split('\n').entries()) {
      if (!line.includes("'data-reveal'")) continue
      const chrome = CHROME_CLASSES.find(cls => new RegExp(`class: '${cls}[ ']`).test(line))
      if (chrome !== undefined) offenders.push(`${name}:${index + 1} tags .${chrome}`)
    }
  }
  assert.deepEqual(offenders, [], 'grid, axis and guide elements must not fade in')
})

test('the reveal clears its stagger so interaction is not delayed', () => {
  const source = read('study-lab-reveal.js')
  // The entrance sets an inline transition-delay per mark. The same marks change
  // class on every interaction, so leaving the delay behind makes one click look
  // like a batched response: measured up to 318ms on the code-mode timeline.
  assert.match(source, /transitionDelay = ''/, 'the inline stagger is never cleared')
})

test('the reveal reads its duration from the token layer', () => {
  const source = read('study-lab-reveal.js')
  assert.match(source, /--dur-enter/, 'the duration must come from study-tokens.css, not a copied number')
  // A second copy of the duration is how the site's timing drifted before.
  const hardcodedSeconds = source.match(/\b0\.\d+\s*\*\s*1000\b/g) ?? []
  assert.deepEqual(hardcodedSeconds, [], 'no duplicated duration constant')
})

test('reduced motion is handled in CSS, not only in script', () => {
  const tokens = read('study-tokens.css')
  // If only the script checked the preference, a script failure would leave the
  // marks at opacity 0 — an invisible chart rather than a still one.
  const reducedBlocks = tokens.match(/@media \(prefers-reduced-motion: reduce\)/g) ?? []
  assert.ok(reducedBlocks.length >= 1, 'the token layer must neutralise the entrance itself')
  assert.match(tokens, /\[data-reveal\]\.awaits-reveal/, 'the pre-entrance state must be defined in CSS')
})
