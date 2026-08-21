/**
 * Every lab module must be importable without a DOM.
 *
 * The lab pages ship as browser modules, but their pure models are also imported
 * by `node --test` to check the numbers a page renders. Any statement that
 * touches `document` at module scope therefore breaks the test run and the
 * deployment gate that runs it, while the page itself keeps working — so the
 * mistake is invisible in a browser and only shows up in CI.
 *
 * Three separate features landed with this defect in one afternoon: the inline
 * icon installer, the theme toggle, and the prediction gate. Each was fixed by
 * hand. This test is the standing check, so the next one fails here instead.
 */

import { strict as assert } from 'node:assert'
import { readdirSync } from 'node:fs'
import { basename } from 'node:path'
import test from 'node:test'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)

/** Browser entry points, which are the modules a page loads with a script tag. */
function labModules() {
  return readdirSync(PUBLIC_DIR)
    .filter(name => name.endsWith('.js'))
    .sort()
}

for (const name of labModules()) {
  test(`${name} imports without a DOM`, async () => {
    // A bare `node --test` run has no document; importing must not need one.
    assert.equal(typeof globalThis.document, 'undefined', 'this test only means something without a DOM')
    await assert.doesNotReject(
      () => import(new URL(name, PUBLIC_DIR).href),
      `${basename(name)} touches the DOM at module scope. Move the call inside the existing \`if (typeof document !== 'undefined')\` guard.`,
    )
  })
}
