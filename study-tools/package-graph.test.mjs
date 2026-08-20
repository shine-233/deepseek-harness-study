import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  BAR_VIEW_MAX_NODES,
  buildPackageGraphModel,
  evaluatePackageGraphOracle,
} from '../website/public/package-graph-model.js'

const fixture = JSON.parse(readFileSync('website/public/package-graph.json', 'utf8'))

test('the fixture the page ships passes every oracle check', () => {
  const verdict = evaluatePackageGraphOracle(fixture)
  for (const check of verdict.checks) {
    assert.equal(check.pass, true, check.id + ' failed: expected ' + check.expected + ', actual ' + check.actual)
  }
  assert.equal(verdict.pass, true)
  assert.equal(verdict.checks.length, 8)
})

test('the recorded totals are reproducible from the nodes and edges alone', () => {
  assert.equal(fixture.nodes.length, fixture.totals.packages)
  assert.equal(fixture.edges.length, fixture.totals.edges)
  assert.equal(new Set(fixture.nodes.map(node => node.group)).size, fixture.totals.groups)
  assert.equal(fixture.nodes.reduce((sum, node) => sum + node.srcLines, 0), fixture.totals.srcLines)
  assert.equal(fixture.nodes.reduce((sum, node) => sum + node.srcFiles, 0), fixture.totals.srcFiles)
})

test('a tampered in-degree fails the oracle instead of rendering as correct', () => {
  const target = fixture.nodes.reduce((best, node) => node.dependedOnBy > best.dependedOnBy ? node : best)
  const tampered = {
    ...fixture,
    nodes: fixture.nodes.map(node => node.id === target.id
      ? { ...node, dependedOnBy: node.dependedOnBy + 1 }
      : node),
  }
  const verdict = evaluatePackageGraphOracle(tampered)
  assert.equal(verdict.pass, false)
  const check = verdict.checks.find(candidate => candidate.id === 'IN_DEGREE_MATCHES')
  assert.equal(check.pass, false)
  assert.ok(check.actual.includes(target.id))
})

test('a dangling edge fails the oracle', () => {
  const tampered = { ...fixture, edges: [...fixture.edges, { from: fixture.nodes[0].id, to: 'no/such-package' }] }
  const verdict = evaluatePackageGraphOracle(tampered)
  assert.equal(verdict.pass, false)
  assert.equal(verdict.checks.find(check => check.id === 'EDGES_RESOLVE').pass, false)
})

test('filtering to a group keeps only that group and only its internal edges', () => {
  const model = buildPackageGraphModel(fixture, { group: 'core' })
  assert.ok(model.nodes.length > 0)
  assert.equal(model.nodes.every(node => node.group === 'core'), true)
  const ids = new Set(model.nodes.map(node => node.id))
  assert.equal(model.edges.every(edge => ids.has(edge.from) && ids.has(edge.to)), true)

  // The repository-wide in-degree must survive the filter, because dropping to
  // the within-view count would understate how depended-upon a package is.
  for (const node of model.nodes) {
    const original = fixture.nodes.find(candidate => candidate.id === node.id)
    assert.equal(node.dependedOnBy, original.dependedOnBy)
    assert.ok(node.degreeWithinView <= node.dependedOnBy)
  }
})

test('the bar view is offered only when it can be read', () => {
  const all = buildPackageGraphModel(fixture)
  assert.equal(all.observations.packages, fixture.totals.packages)
  assert.equal(all.barViewAvailable, fixture.totals.packages <= BAR_VIEW_MAX_NODES)
  assert.equal(all.barViewAvailable, false)

  const small = fixture.groups
    .map(group => buildPackageGraphModel(fixture, { group }))
    .find(model => model.nodes.length <= BAR_VIEW_MAX_NODES)
  assert.ok(small !== undefined)
  assert.equal(small.barViewAvailable, true)
})

test('sorting changes the order and nothing else', () => {
  const byLines = buildPackageGraphModel(fixture, { group: 'core', sort: 'lines' })
  const byDegree = buildPackageGraphModel(fixture, { group: 'core', sort: 'degree' })
  assert.deepEqual(
    byLines.nodes.map(node => node.id).sort(),
    byDegree.nodes.map(node => node.id).sort(),
  )
  assert.deepEqual(byLines.observations.srcLines, byDegree.observations.srcLines)
  assert.notDeepEqual(byLines.nodes.map(node => node.id), byDegree.nodes.map(node => node.id))
  assert.deepEqual(
    byLines.nodes.map(node => node.srcLines),
    [...byLines.nodes.map(node => node.srcLines)].sort((left, right) => right - left),
  )
})

test('size and in-degree are independent, which is what the page claims', () => {
  const model = buildPackageGraphModel(fixture)
  const biggest = model.observations.biggest
  const mostDepended = model.observations.mostDepended
  assert.notEqual(biggest.id, mostDepended.id)
  // The claim in the page heading: the most-depended-on package is small.
  assert.ok(mostDepended.srcLines < biggest.srcLines / 4,
    mostDepended.id + ' is not much smaller than ' + biggest.id)
  assert.ok(mostDepended.dependedOnBy > biggest.dependedOnBy * 4)
})

test('an unknown group is rejected rather than silently returning everything', () => {
  assert.throws(() => buildPackageGraphModel(fixture, { group: 'no-such-group' }), RangeError)
})

test('a malformed fixture is rejected before anything is rendered', () => {
  assert.throws(() => evaluatePackageGraphOracle(null), TypeError)
  assert.throws(() => evaluatePackageGraphOracle({ commit: 'x' }), TypeError)
  assert.throws(() => buildPackageGraphModel({ ...fixture, nodes: 'not-an-array' }), TypeError)
})

test('every claim the page can prove names the pinned commit or a checkable relation', () => {
  const model = buildPackageGraphModel(fixture)
  assert.ok(model.canProve.length >= 3)
  assert.ok(model.cannotProve.length >= 3)
  assert.ok(model.canProve.some(claim => claim.includes(fixture.commit.slice(0, 10))))
  // The boundary has to name the three things a manifest read cannot show.
  const boundary = model.cannotProve.join('\n')
  for (const absent of ['运行时', '打包体积', 'peerDependencies']) {
    assert.ok(boundary.includes(absent), 'cannotProve must mention ' + absent)
  }
})
