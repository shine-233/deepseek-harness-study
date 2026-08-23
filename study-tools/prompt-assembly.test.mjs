import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  PERSONA_ORDER,
  POLICY_ORDER,
  PRE_PERSONA_ORDER,
  TOOL_ORDER_REST,
  buildPromptAssemblyModel,
  evaluatePromptAssemblyOracle,
} from '../website/public/prompt-assembly-model.js'

const GRID = {
  personaVersion: ['v1', 'v2'],
  policy: ['ask', 'never', 'absent'],
  changeTarget: ['none', 'persona', 'policy', 'tools'],
  toolOrder: ['default', 'custom-first'],
}

function* inputs() {
  for (const personaVersion of GRID.personaVersion)
    for (const policy of GRID.policy)
      for (const changeTarget of GRID.changeTarget)
        for (const toolOrder of GRID.toolOrder)
          yield { personaVersion, policy, changeTarget, toolOrder }
}

test('the same input produces byte-identical output', () => {
  const input = { personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'default' }
  assert.equal(JSON.stringify(buildPromptAssemblyModel(input)), JSON.stringify(buildPromptAssemblyModel(input)))
})

test('every input passes every oracle check across the whole grid', () => {
  for (const input of inputs()) {
    const result = evaluatePromptAssemblyOracle(buildPromptAssemblyModel(input))
    for (const check of result.checks) {
      assert.equal(check.pass, true, JSON.stringify(input) + ': ' + check.id + ': ' + check.actual)
    }
  }
})

test('segments concatenate in ascending upstream order', () => {
  const m = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'default' })
  const orders = m.segments.map(s => s.order)
  assert.deepEqual(orders, [PRE_PERSONA_ORDER, PERSONA_ORDER, POLICY_ORDER, Number.MAX_SAFE_INTEGER])
})

test('absent policy drops the whole context segment instead of leaving an empty one', () => {
  const m = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'absent', changeTarget: 'none', toolOrder: 'default' })
  assert.equal(m.segments.some(s => s.source === 'approval:policy'), false)
  assert.equal(m.observations.emptyDropped, true)
  assert.equal(m.observations.segmentCount, 3)
})

test('ask and never use different verbatim sentences at order 115', () => {
  const ask = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'default' })
  const never = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'never', changeTarget: 'none', toolOrder: 'default' })
  const askText = ask.segments.find(s => s.source === 'approval:policy').text
  const neverText = never.segments.find(s => s.source === 'approval:policy').text
  assert.match(askText, /Approval policy: ask/)
  assert.match(neverText, /Approval prompts are disabled in this session/)
  assert.notEqual(askText, neverText)
})

test('configured tool order keeps listed tools in config order, rest marker still last', () => {
  const m = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'custom-first' })
  const seg = m.segments.find(s => s.source === 'tool schemas')
  const lines = seg.text.split('\n')
  assert.ok(lines[0].includes('write_file'), '配置顺序第一位')
  assert.ok(lines[1].includes('read_file'), '配置顺序第二位')
  assert.equal(lines[2], `tool: ${TOOL_ORDER_REST}`)
})

test('default order sorts the whole table lexicographically', () => {
  const m = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'default' })
  const lines = m.segments.find(s => s.source === 'tool schemas').text.split('\n')
  assert.ok(lines[0].includes('read_file'))
  assert.ok(lines[1].includes('write_file'))
})

test('cache boundary: changing tools keeps everything before the tool table cached', () => {
  const base = { personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'default' }
  const changed = { ...base, changeTarget: 'tools', toolOrder: 'custom-first' }
  const a = buildPromptAssemblyModel(base)
  const b = buildPromptAssemblyModel(changed)
  assert.deepEqual(
    a.segments.slice(0, 3).map(s => s.text),
    b.segments.slice(0, 3).map(s => s.text),
  )
  assert.equal(b.observations.changedIndex, 3)
  assert.equal(b.observations.cachedBytes, b.observations.totalBytes - b.segments[3].bytes)
  assert.ok(b.observations.cacheHitRatio > 0 && b.observations.cacheHitRatio < 100)
})

test('changing the persona invalidates everything after the pre-persona segment', () => {
  const changed = buildPromptAssemblyModel({
    personaVersion: 'v2', policy: 'ask', changeTarget: 'persona', toolOrder: 'default',
  })
  assert.equal(changed.observations.changedIndex, 1)
  const preBytes = changed.segments[0].bytes
  assert.equal(changed.observations.cachedBytes, preBytes)
  assert.equal(changed.observations.freshBytes, changed.observations.totalBytes - preBytes)
})

test('no change means a full cache hit', () => {
  const m = buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'default' })
  assert.equal(m.observations.changedIndex, null)
  assert.equal(m.observations.freshBytes, 0)
  assert.equal(m.observations.cacheHitRatio, 100)
})

test('unknown inputs fail loud at the model boundary', () => {
  assert.throws(() => buildPromptAssemblyModel({ personaVersion: 'v9', policy: 'ask', changeTarget: 'none', toolOrder: 'default' }), RangeError)
  assert.throws(() => buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'maybe', changeTarget: 'none', toolOrder: 'default' }), RangeError)
  assert.throws(() => buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'teleport', toolOrder: 'default' }), RangeError)
  assert.throws(() => buildPromptAssemblyModel({ personaVersion: 'v1', policy: 'ask', changeTarget: 'none', toolOrder: 'shuffle' }), RangeError)
})
