import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  CODE_MODE_POLICIES,
  evaluateCodeModeOracle,
  frameAt,
  simulateCodeMode,
} from '../website/public/code-mode-evidence-lab.js'

test('the same input produces byte-identical events, frames, observations, and oracle output', () => {
  const input = { seed: 42, policy: 'deny-write', parallelism: 2 }
  const first = simulateCodeMode(input)
  const second = simulateCodeMode(input)
  assert.equal(JSON.stringify(first), JSON.stringify(second))
  assert.deepEqual(first.input, input)
  assert.equal(first.oracle.pass, true)
})

test('the default deny-write path rejects the write body but still commits its result', () => {
  const simulation = simulateCodeMode()
  const write = simulation.calls.find(call => call.name === 'write_summary')
  assert.ok(write)
  assert.equal(write.decision, 'deny')
  assert.equal(simulation.observations.deniedCalls, 1)
  assert.equal(simulation.observations.deniedBodyExecutions, 0)
  assert.equal(simulation.events.filter(event =>
    event.callId === write.callId && event.phase === 'body-start').length, 0)
  assert.equal(simulation.events.filter(event =>
    event.callId === write.callId && event.phase === 'post-execute').length, 1)
  assert.equal(simulation.events.filter(event =>
    event.callId === write.callId && event.phase === 'result').length, 1)
})

test('allow-all still sends every internal call through the policy lane before one body execution', () => {
  const simulation = simulateCodeMode({ seed: 42, policy: 'allow-all', parallelism: 3 })
  assert.equal(simulation.observations.allowedCalls, 4)
  assert.equal(simulation.observations.deniedCalls, 0)
  assert.equal(simulation.observations.policyChecks, 4)
  assert.equal(simulation.observations.bodyExecutions, 4)
  assert.equal(simulation.oracle.pass, true)
  for (const call of simulation.calls) {
    const stream = simulation.events.filter(event => event.callId === call.callId)
    const decision = stream.find(event => event.phase === 'policy-decision')
    const body = stream.find(event => event.phase === 'body-start')
    assert.equal(decision?.decision, 'allow')
    assert.ok(body)
    assert.ok(decision.tick < body.tick)
  }
})

test('deny-all keeps every body at zero without losing child results', () => {
  const simulation = simulateCodeMode({ seed: 0, policy: 'deny-all', parallelism: 2 })
  assert.equal(simulation.observations.deniedCalls, 4)
  assert.equal(simulation.observations.bodyExecutions, 0)
  assert.equal(simulation.observations.deniedBodyExecutions, 0)
  assert.equal(simulation.observations.childResults, 4)
  assert.equal(simulation.observations.maxObservedBodyConcurrency, 0)
  assert.equal(simulation.oracle.pass, true)
})

test('parallel bodies obey the selected cap and exclusive work never overlaps', () => {
  for (const parallelism of [1, 2, 3]) {
    const simulation = simulateCodeMode({ seed: 91, policy: 'allow-all', parallelism })
    assert.ok(simulation.observations.maxObservedBodyConcurrency <= parallelism)
    assert.equal(simulation.oracle.checks.find(check =>
      check.id === 'PARALLELISM_BOUNDED')?.pass, true)
  }
  assert.equal(
    simulateCodeMode({ seed: 91, policy: 'allow-all', parallelism: 1 })
      .observations.maxObservedBodyConcurrency,
    1,
  )
  assert.equal(
    simulateCodeMode({ seed: 91, policy: 'allow-all', parallelism: 2 })
      .observations.maxObservedBodyConcurrency,
    2,
  )
})

test('the first and last frame carry stable meanings and frameAt clamps seek requests', () => {
  const simulation = simulateCodeMode({ seed: 7, policy: 'deny-write', parallelism: 2 })
  const first = frameAt(simulation, -500)
  const last = frameAt(simulation, Number.MAX_SAFE_INTEGER)
  assert.equal(first.isFirst, true)
  assert.equal(first.activeBodyCount, 0)
  assert.match(first.summary, /首帧/)
  assert.equal(last.isLast, true)
  assert.equal(last.settledChildCount, 4)
  assert.match(last.summary, /末帧/)
  assert.equal(simulation.frames.every((frame, index) => frame.index === index), true)
})

test('the independent oracle detects a denied body injected after simulation', () => {
  const simulation = simulateCodeMode({ seed: 17, policy: 'deny-write', parallelism: 2 })
  const events = structuredClone(simulation.events)
  const denied = events.find(event =>
    event.phase === 'policy-decision' && event.decision === 'deny')
  assert.ok(denied)
  events.push({
    ...denied,
    id: 'tampered-body',
    tick: denied.tick + 1,
    phase: 'body-start',
    bodyExecutionDelta: 1,
    detail: 'tampered event',
  })
  const oracle = evaluateCodeModeOracle({
    events,
    policy: simulation.input.policy,
    parallelism: simulation.input.parallelism,
  })
  assert.equal(oracle.pass, false)
  assert.equal(oracle.checks.find(check => check.id === 'DENIED_BODY_ZERO')?.pass, false)
})

test('invalid model inputs fail loud instead of being silently normalized', () => {
  assert.equal(CODE_MODE_POLICIES.length, 3)
  assert.throws(() => simulateCodeMode({ seed: -1 }), /seed/)
  assert.throws(() => simulateCodeMode({ seed: 1.5 }), /seed/)
  assert.throws(() => simulateCodeMode({ policy: 'invented' }), /policy/)
  assert.throws(() => simulateCodeMode({ parallelism: 0 }), /parallelism/)
  assert.throws(() => simulateCodeMode({ parallelism: 4 }), /parallelism/)
  assert.throws(() => frameAt({}, 0), /frames/)
})

test('the static lab uses no network, storage, random, HTML interpolation, Canvas, or WebGL primitive', () => {
  const js = readFileSync(new URL('../website/public/code-mode-evidence-lab.js', import.meta.url), 'utf8')
  const html = readFileSync(new URL('../website/public/code-mode-evidence-lab.html', import.meta.url), 'utf8')
  const css = readFileSync(new URL('../website/public/code-mode-evidence-lab.css', import.meta.url), 'utf8')
  const source = js + '\n' + html
  assert.doesNotMatch(source, /\bfetch\s*\(/i)
  assert.doesNotMatch(source, /\bWebSocket\b/i)
  assert.doesNotMatch(source, /\bpostMessage\b/i)
  assert.doesNotMatch(source, /\b(?:localStorage|sessionStorage)\b/i)
  assert.doesNotMatch(source, /document\.cookie|innerHTML/i)
  assert.doesNotMatch(source, /Math\.random|requestAnimationFrame/i)
  assert.doesNotMatch(source, /\b(?:canvas|WebGL)\b/i)
  assert.match(html, /connect-src 'none'/)
  assert.match(html, /这是教学模型，不是真实 DSH trace/)
  assert.match(html, /id="timeline-seek"/)
  assert.match(html, /id="event-table-body"/)
  assert.match(css, /prefers-reduced-motion:\s*reduce/)
})
