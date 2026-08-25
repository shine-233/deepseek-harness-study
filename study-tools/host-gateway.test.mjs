import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  HOST_REQUESTS,
  PICKER_BACKENDS,
  buildHostGatewayModel,
  evaluateHostGatewayOracle,
} from '../website/public/host-gateway-model.js'

test('the same input produces byte-identical output', () => {
  const input = { request: 'picker-api', picker: 'auto' }
  assert.equal(
    JSON.stringify(buildHostGatewayModel(input)),
    JSON.stringify(buildHostGatewayModel(input)),
  )
})

test('every request × backend combo passes every oracle check', () => {
  assert.equal(HOST_REQUESTS.length * PICKER_BACKENDS.length, 12)
  for (const request of HOST_REQUESTS) {
    for (const picker of PICKER_BACKENDS) {
      const model = buildHostGatewayModel({ request, picker })
      const result = evaluateHostGatewayOracle(model)
      for (const check of result.checks) {
        assert.equal(check.pass, true, `${request}/${picker} failed ${check.id}: ${check.actual}`)
      }
    }
  }
})

test('registered requests answer from the route owner, never the fallback seat', () => {
  for (const request of ['inventory-api', 'picker-api']) {
    for (const picker of PICKER_BACKENDS) {
      const model = buildHostGatewayModel({ request, picker })
      assert.notEqual(model.observations.matchedRoute, null, request)
      assert.equal(model.observations.usedFallback, false, request)
    }
  }
})

test('spa requests always land on the fallback seat after a full miss scan', () => {
  for (const request of ['spa-doc', 'spa-asset']) {
    const model = buildHostGatewayModel({ request, picker: 'native' })
    assert.equal(model.observations.matchedRoute, null, request)
    assert.equal(model.observations.usedFallback, true, request)
    const serve = model.steps.find(step => step.kind === 'serve')
    assert.equal(serve.fallback, true, request)
  }
})

test('every timeline carries exactly one carrier step and scans the whole table on miss', () => {
  for (const request of HOST_REQUESTS) {
    const model = buildHostGatewayModel({ request, picker: 'browse' })
    assert.equal(model.steps.filter(step => step.kind === 'carrier').length, 1, request)
    if (model.observations.matchedRoute === null) {
      assert.equal(model.observations.scanSteps, model.routeTable.length + 1, request)
    }
  }
})

test('picker requests expose exactly one seam step with the resolved backend', () => {
  const model = buildHostGatewayModel({ request: 'picker-api', picker: 'auto' })
  const seams = model.steps.filter(step => step.kind === 'seam')
  assert.equal(seams.length, 1)
  assert.match(seams[0].op, /native/)
})

test('unknown inputs are rejected loudly', () => {
  assert.throws(() => buildHostGatewayModel({ request: 'ftp://x', picker: 'native' }), RangeError)
  assert.throws(() => buildHostGatewayModel({ request: 'spa-doc', picker: 'magic' }), RangeError)
})
