import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateRequest, validateResult } from '../website/public/research-debug-bridge.js'

const toolRoot = dirname(fileURLToPath(import.meta.url))
const courseRoot = resolve(toolRoot, '..')
const fixtureRoot = resolve(toolRoot, 'fixtures', 'research-debug-contract')
const debugRootFlag = process.argv.indexOf('--debug-root')
const debugRoot = debugRootFlag >= 0 && process.argv[debugRootFlag + 1]
  ? resolve(process.argv[debugRootFlag + 1])
  : resolve(courseRoot, '..', 'dsh-open-source', 'packages', 'dsh-plugin-debug')
const debugFixtureRoot = resolve(debugRoot, 'tools', 'fixtures', 'research-bridge-contract')
const bridgeScript = resolve(debugRoot, 'tools', 'DSH-ResearchBridge.ps1')

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function hash(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

function fail(message, detail = null) {
  process.stdout.write(`${JSON.stringify({
    result: 'FAIL',
    message,
    detail,
    offline: true,
    networkAccessed: false,
    targetMutated: false,
  }, null, 2)}\n`)
  process.exit(1)
}

try {
  if (!existsSync(bridgeScript)) fail('Debug bridge was not found; pass --debug-root with the dsh-plugin-debug package directory.')

  const filenames = ['request.json', 'repro.json', 'manifest.json', 'expected.json']
  for (const filename of filenames) {
    const courseBytes = readFileSync(resolve(fixtureRoot, filename))
    const debugBytes = readFileSync(resolve(debugFixtureRoot, filename))
    assert.deepEqual(debugBytes, courseBytes, `${filename} differs between repositories`)
  }

  const requestPath = resolve(fixtureRoot, 'request.json')
  const reproPath = resolve(fixtureRoot, 'repro.json')
  const request = readJson(requestPath)
  const manifest = readJson(resolve(fixtureRoot, 'manifest.json'))
  const expected = readJson(resolve(fixtureRoot, 'expected.json'))
  const requestValidation = validateRequest(request)
  assert.equal(requestValidation.ok, true, requestValidation.errors?.join(', '))
  assert.equal(manifest.artifacts[0].sha256, hash(reproPath), 'manifest hash does not match repro.json')

  const child = spawnSync('pwsh', [
    '-NoLogo',
    '-NoProfile',
    '-ExecutionPolicy',
    'Bypass',
    '-File',
    bridgeScript,
    '-RequestPath',
    requestPath,
    '-EvidencePath',
    reproPath,
  ], {
    encoding: 'utf8',
    windowsHide: true,
  })
  if (child.error) throw child.error
  assert.equal(child.status, 0, child.stderr || child.stdout)
  const result = JSON.parse(child.stdout.trim())
  const resultValidation = validateResult(result)
  assert.equal(resultValidation.ok, true, resultValidation.errors?.join(', '))
  const projected = {
    schemaVersion: result.schemaVersion,
    requestId: result.requestId,
    status: result.status,
    sourceKinds: result.evidence.sourceKinds,
    missingKinds: result.evidence.missingKinds,
    integrity: result.evidence.integrity,
    trust: result.evidence.trust,
    checks: result.checks,
  }
  assert.deepEqual(projected, expected)

  process.stdout.write(`${JSON.stringify({
    result: 'PASS',
    schemaVersion: result.schemaVersion,
    status: result.status,
    checks: result.checks.map(check => `${check.checkId}:${check.status}`),
    requestValidatedByWebsite: true,
    resultValidatedByWebsite: true,
    executedByDebugBridge: true,
    repositoryFixtureCopiesIdentical: true,
    offline: true,
    networkAccessed: false,
    targetMutated: false,
  }, null, 2)}\n`)
} catch (error) {
  fail('Cross-repository research bridge contract replay failed.', error instanceof Error ? error.message : String(error))
}
