import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  FORK_LANES,
  buildSessionForkModel,
  evaluateSessionForkOracle,
} from '../website/public/session-fork-model.js'

test('the same input produces byte-identical output', () => {
  const input = { crash: 'crash-mid-tool', fork: 'fork' }
  assert.equal(
    JSON.stringify(buildSessionForkModel(input)),
    JSON.stringify(buildSessionForkModel(input)),
  )
})

test('every input passes every oracle check across the whole input grid', () => {
  for (const crash of ['complete', 'crash-mid-tool']) {
    for (const fork of ['no-fork', 'fork']) {
      const model = buildSessionForkModel({ crash, fork })
      const result = evaluateSessionForkOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true,
          crash + '/' + fork + ' failed ' + check.id + ': ' + check.actual)
      }
    }
  }
})

test('every step lands on a declared lane', () => {
  for (const crash of ['complete', 'crash-mid-tool']) {
    const model = buildSessionForkModel({ crash, fork: 'fork' })
    for (const step of model.steps) {
      assert.ok(FORK_LANES.includes(step.lane), crash + ': ' + step.lane)
    }
  }
})

test('a crash produces exactly one unknown repair and never a ghost success', () => {
  const model = buildSessionForkModel({ crash: 'crash-mid-tool', fork: 'fork' })
  const repairs = model.steps.filter(step => step.repairedAsUnknown === true)
  assert.equal(repairs.length, 1)
  assert.equal(model.observations.interruptedRepaired, true)
  assert.equal(model.observations.ghostSuccess, false)
})

test('a complete run needs no repair', () => {
  const model = buildSessionForkModel({ crash: 'complete', fork: 'no-fork' })
  assert.equal(model.observations.interruptedRepaired, false)
  assert.ok(model.steps.some(step => step.phase === 'result'))
  assert.ok(!model.steps.some(step => step.phase === 'repair'))
})

test('fork records the inherited prefix length on the child lane', () => {
  const forked = buildSessionForkModel({ crash: 'crash-mid-tool', fork: 'fork' })
  assert.equal(forked.observations.eventsInherited, 2)
  assert.equal(forked.observations.closingLane, '子 Session')

  const plain = buildSessionForkModel({ crash: 'crash-mid-tool', fork: 'no-fork' })
  assert.equal(plain.observations.eventsInherited, null)
  assert.equal(plain.observations.closingLane, '父 Session')
})

test('unknown crash modes fail loud at the model boundary', () => {
  assert.throws(() => buildSessionForkModel({ crash: 'exploded', fork: 'fork' }), RangeError)
  assert.throws(() => buildSessionForkModel({ crash: 'complete', fork: 'maybe' }), RangeError)
})

test('the page wires the shared gate, boundary lists and state link', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const html = readFileSync(new URL('session-fork-lab.html', publicDir), 'utf8')
  for (const id of ['prediction-gate', 'gated-controls', 'oracle-list', 'can-prove-list', 'cannot-prove-list']) {
    assert.ok(html.includes(`id="${id}"`), 'missing id: ' + id)
  }
  const script = readFileSync(new URL('session-fork-lab.js', publicDir), 'utf8')
  assert.match(script, /correct: 'interrupted-unknown'/)
  for (const option of ['marked-ok', 'interrupted-unknown', 'dropped-intent']) {
    assert.match(script, new RegExp(`'${option}'`), 'missing explanation for ' + option)
  }
})
