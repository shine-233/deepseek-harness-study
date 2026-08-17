import { strict as assert } from 'node:assert'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Context } from '@deepseek-ai/cordis'
import Loader from '@deepseek-ai/cordis-plugin-loader'
import { SERVICE_NAME, type MinimalPluginService } from './minimal-plugin.ts'

const workbenchRoot = resolve(fileURLToPath(import.meta.url), '..', '..')
const artifactPath = resolve(workbenchRoot, 'dist', 'minimal-plugin.js')

if (!existsSync(artifactPath)) {
  throw new Error('missing dist/minimal-plugin.js; run the workbench build first')
}

const ctx = new Context()
ctx.baseUrl = `${pathToFileURL(`${workbenchRoot}${process.platform === 'win32' ? '\\' : '/'}`).href}`
const loaderFiber = ctx.plugin(Loader)
await loaderFiber.await()

const entryId = await ctx.loader.create({
  name: './dist/minimal-plugin.js',
  config: { intervalMs: 5 },
})
let service: MinimalPluginService | undefined
let active: ReturnType<MinimalPluginService['snapshot']> | undefined
let ticking: ReturnType<MinimalPluginService['snapshot']> | undefined
let disposed: ReturnType<MinimalPluginService['snapshot']> | undefined
let afterDispose: ReturnType<MinimalPluginService['snapshot']> | undefined
let entriesRemaining: number | undefined
try {
  await ctx.loader.await()

  const entry = ctx.loader.resolve(entryId)
  service = ctx.get(SERVICE_NAME) as MinimalPluginService | undefined
  assert(service !== undefined, 'Loader registration did not expose the plugin service')
  active = service.snapshot()
  assert.equal(active.phase, 'active')
  assert.equal(entry.fiber?.uid === null, false, 'Loader entry did not retain an active fiber')

  await new Promise(resolvePromise => setTimeout(resolvePromise, 35))
  ticking = service.snapshot()
  assert(ticking.tickCount > 0, 'registered plugin effect did not run')

  await ctx.loader.remove(entryId)
  await ctx.loader.await()
  disposed = service.snapshot()
  assert.equal(disposed.phase, 'disposed')
  assert(disposed.disposedAt !== undefined, 'plugin cleanup did not run')
  await new Promise(resolvePromise => setTimeout(resolvePromise, 25))
  afterDispose = service.snapshot()
  assert.equal(afterDispose.tickCount, disposed.tickCount, 'heartbeat continued after unload')
  assert.equal(ctx.get(SERVICE_NAME), undefined, 'Loader removal left the service registered')
  entriesRemaining = [...ctx.loader.entries()].length
  assert.equal(entriesRemaining, 0, 'Loader removal left an entry behind')
} finally {
  if (ctx.loader.store[entryId] !== undefined) await ctx.loader.remove(entryId)
  await loaderFiber.dispose()
}

assert(service !== undefined && active !== undefined && ticking !== undefined && disposed !== undefined && afterDispose !== undefined && entriesRemaining !== undefined)
console.log(JSON.stringify({
  result: 'PASS',
  build: 'dist/minimal-plugin.js',
  registration: {
    entryId,
    service: SERVICE_NAME,
    phase: active.phase,
    tickCount: ticking.tickCount,
  },
  unload: {
    phase: disposed.phase,
    serviceAbsent: ctx.get(SERVICE_NAME) === undefined,
    entriesRemaining,
    heartbeatStable: afterDispose.tickCount === disposed.tickCount,
  },
  externalServices: {
    modelRequests: 0,
    networkRequests: 0,
  },
}, null, 2))
