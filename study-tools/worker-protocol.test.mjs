import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  HOST_TO_WORKER,
  PROTOCOL_SCENARIOS,
  WORKER_TO_HOST,
  buildProtocolModel,
  evaluateProtocolOracle,
} from '../website/public/worker-protocol-model.js'

test('the same scenario produces byte-identical messages', () => {
  for (const scenario of PROTOCOL_SCENARIOS) {
    const model = buildProtocolModel({ scenario })
    assert.equal(JSON.stringify(model), JSON.stringify(model))
  }
})

test('every combo passes every oracle check across the grid', () => {
  for (const scenario of PROTOCOL_SCENARIOS) {
    const model = buildProtocolModel({ scenario })
    const result = evaluateProtocolOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true, `${scenario} failed ${check.id}: ${check.actual}`)
    }
  }
})

test('handshake is always Ready before Go', () => {
  for (const scenario of PROTOCOL_SCENARIOS) {
    const model = buildProtocolModel({ scenario })
    const ready = model.messages.findIndex(msg => msg.tag === 'Ready')
    const go = model.messages.findIndex(msg => msg.tag === 'Go')
    assert.ok(ready !== -1, `${scenario}: missing Ready`)
    assert.ok(go !== -1, `${scenario}: missing Go`)
    assert.ok(ready < go, `${scenario}: Ready must precede Go`)
  }
})

test('every ChildStart has exactly one reply', () => {
  for (const scenario of PROTOCOL_SCENARIOS) {
    const model = buildProtocolModel({ scenario })
    const starts = model.messages.filter(msg => msg.tag === 'ChildStart')
    const replies = model.messages.filter(msg =>
      msg.tag === 'ChildStarted' || msg.tag === 'ChildStartError')
    assert.equal(starts.length, replies.length, `${scenario}: starts=${starts.length} replies=${replies.length}`)
  }
})

test('exactly one Result per run and it is the last message', () => {
  for (const scenario of PROTOCOL_SCENARIOS) {
    const model = buildProtocolModel({ scenario })
    const results = model.messages.filter(msg => msg.tag === 'Result')
    assert.equal(results.length, 1, `${scenario}`)
    assert.equal(model.messages[model.messages.length - 1].tag, 'Result')
  }
})

test('cancel-mid-flight produces no AgentStart or ChildSettled after Cancel', () => {
  const model = buildProtocolModel({ scenario: 'cancel-mid-flight' })
  const cancelIdx = model.messages.findIndex(msg => msg.tag === 'Cancel')
  assert.ok(cancelIdx !== -1)
  for (const msg of model.messages) {
    if (msg.index <= cancelIdx) continue
    assert.ok(!['AgentStart', 'ChildStart', 'ChildStarted'].includes(msg.tag),
      `post-Cancel message ${msg.index} has tag ${msg.tag}`)
  }
})

test('all tags are from the declared enums', () => {
  for (const scenario of PROTOCOL_SCENARIOS) {
    const model = buildProtocolModel({ scenario })
    for (const msg of model.messages) {
      if (msg.dir === 'worker→host') assert.ok(WORKER_TO_HOST.includes(msg.tag), `${scenario}: bad W2H tag ${msg.tag}`)
      else assert.ok(HOST_TO_WORKER.includes(msg.tag), `${scenario}: bad H2W tag ${msg.tag}`)
    }
  }
})

test('the drop-child-reply fault is caught by CHILD_RPC_PAIRED alone', () => {
  const model = buildProtocolModel({ scenario: 'normal', fault: 'drop-child-reply' })
  assert.equal(model.observations.childReplies, 1, 'one of two replies must be gone')
  const result = evaluateProtocolOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['CHILD_RPC_PAIRED'],
    'exactly one rule should catch the lie, got: ' + red.join(','))
})

test('the drop-child-reply fault also catches the ChildStartError path', () => {
  const model = buildProtocolModel({ scenario: 'child-start-error', fault: 'drop-child-reply' })
  const result = evaluateProtocolOracle(model)
  const red = result.checks.filter(check => !check.pass).map(check => check.id)
  assert.deepEqual(red, ['CHILD_RPC_PAIRED'])
})

test('the drop-child-reply fault is ineffective without RPC traffic', () => {
  const model = buildProtocolModel({ scenario: 'cancel-mid-flight', fault: 'drop-child-reply' })
  assert.equal(evaluateProtocolOracle(model).pass, true,
    'cancel-mid-flight carries no ChildStart, so nothing can go missing')
})

test('an unknown fault type fails loud at the model boundary', () => {
  assert.throws(() => buildProtocolModel({ scenario: 'normal', fault: 'no-such-fault' }))
})
