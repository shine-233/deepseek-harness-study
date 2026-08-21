/**
 * Prediction gates on the model labs.
 *
 * Reading a result and then explaining it teaches less than committing to an
 * answer first and finding out you were wrong. The reference site gates every
 * experiment this way; this repository shipped the mechanism as a shared module
 * and then used it on one page out of seven.
 *
 * Three properties have to hold, and each has already been violated once:
 *
 *   1. the gate blocks exploration, never reading — the chart, the table, the
 *      oracle list and the evidence boundary stay visible before answering;
 *   2. every question names a control that exists, using the label the page
 *      actually renders (one question said "勾上" for a `<select>`, another named
 *      a scenario "工具调用被拒绝" when the option reads "工具被策略拒绝");
 *   3. the correct answer corresponds to an invariant the page's own oracle
 *      checks, so the experiment settles the bet instead of the prose.
 */

import { strict as assert } from 'node:assert'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)
const read = name => readFileSync(new URL(name, PUBLIC_DIR), 'utf8')

/** Labs built on a pure model, which are the pages a prediction gate suits. */
function modelLabs() {
  return readdirSync(PUBLIC_DIR)
    .filter(name => name.endsWith('-lab.html'))
    .filter(name => read(name).includes('id="oracle-list"'))
    .sort()
}

test('every model lab gates its controls behind a prediction', () => {
  const missing = modelLabs().filter(name => !read(name).includes('id="prediction-gate"'))
  assert.deepEqual(missing, [], 'a lab lets you change parameters before committing to an answer')
})

test('the gate wraps the controls, not the whole page', () => {
  for (const name of modelLabs()) {
    const html = read(name)
    assert.ok(html.includes('id="gated-controls"'), `${name} has no gated container`)
    // Reading surfaces must sit outside the gated wrapper.
    const gatedAt = html.indexOf('id="gated-controls"')
    const closeAt = html.indexOf('</div>', html.lastIndexOf('</form>', html.indexOf('oracle-list')))
    for (const id of ['oracle-list', 'can-prove-list', 'cannot-prove-list']) {
      const at = html.indexOf(`id="${id}"`)
      assert.ok(at > gatedAt || at === -1, `${name}: ${id} must not be inside the gate`)
      assert.ok(at > closeAt || closeAt === -1, `${name}: ${id} appears before the gate closes`)
    }
  }
})

test('a gate offers a skip, so it teaches rather than blocks', () => {
  for (const name of modelLabs()) {
    const html = read(name)
    if (!html.includes('id="prediction-gate"')) continue
    assert.match(html, /data-gate-skip/, `${name} has no way past the gate`)
  }
})

test('each question names controls the page actually has', () => {
  const offenders = []
  for (const name of modelLabs()) {
    const html = read(name)
    const question = html.match(/<p class="gate-question"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? ''

    // Option labels are often built by the model rather than written in the HTML,
    // so the search covers the page markup, its script, and its pure model.
    //
    // The question itself is removed first. Searching the whole file would let
    // every term match its own occurrence inside the question, which makes the
    // check pass unconditionally.
    const script = read(name.replace('.html', '.js'))
    let model = ''
    try {
      model = read(name.replace('-lab.html', '-model.js'))
    } catch {
      // Two labs keep their model inline in the page script; nothing to add.
      model = ''
    }
    const rendered = html.replace(question, '') + script + model

    for (const quoted of question.matchAll(/「([^」]+)」/g)) {
      const term = quoted[1]
      // A term describing a chain of values is prose, not one control.
      if (term.includes('→')) continue
      if (!rendered.includes(term)) offenders.push(`${name}: 「${term}」`)
    }
  }
  assert.deepEqual(offenders, [], 'a question names a control or option the page never renders')
})

test('each gate has at least three options and exactly one marked correct', () => {
  for (const name of modelLabs()) {
    const html = read(name)
    const options = [...html.matchAll(/<input type="radio" name="prediction" value="([^"]+)"/g)].map(m => m[1])
    assert.ok(options.length >= 3, `${name} offers only ${options.length} option(s)`)
    assert.equal(new Set(options).size, options.length, `${name} has duplicate option values`)

    const script = read(name.replace('.html', '.js'))
    const correct = script.match(/correct: '([^']+)'/)?.[1]
    assert.ok(correct !== undefined, `${name} never declares a correct answer`)
    assert.ok(options.includes(correct), `${name}: correct answer '${correct}' is not one of the options`)
  }
})

test('every option has an explanation', () => {
  for (const name of modelLabs()) {
    const html = read(name)
    const options = [...html.matchAll(/<input type="radio" name="prediction" value="([^"]+)"/g)].map(m => m[1])
    const script = read(name.replace('.html', '.js'))
    const explain = script.match(/explain: \{([\s\S]*?)\n {4}\}/)?.[1] ?? ''
    for (const option of options) {
      const quoted = new RegExp(`(?:^|\\s)'?${option}'?:`, 'm')
      assert.match(explain, quoted, `${name}: option '${option}' has no explanation`)
    }
  }
})

test('the gate module keeps the controls inert, not merely disabled', () => {
  const module = read('study-lab-gate.js')
  // `disabled` still lets a screen reader announce a list of dead controls.
  assert.match(module, /locked\.inert = true/)
  assert.match(module, /locked\.inert = false/)
})
