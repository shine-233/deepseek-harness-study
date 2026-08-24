import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-pet-plugins.js imports without a DOM', async () => {
  mod = await import('../website/public/study-pet-plugins.js')
  assert.equal(typeof mod.createPetRuntime, 'function')
  assert.equal(typeof mod.pushLog, 'function')
  assert.equal(typeof mod.formatLogEntry, 'function')
})

test('the registry carries the five behavior plugins with subscription docs', () => {
  assert.deepEqual(mod.PET_PLUGINS.map(p => p.id), ['wander', 'eyetrack', 'nap', 'drag', 'blinkoff'])
  for (const plugin of mod.PET_PLUGINS) {
    assert.ok(plugin.name.length >= 2)
    assert.ok(plugin.subscribes.includes('定时器') || plugin.subscribes.includes('pointer') || plugin.subscribes.includes('伴侣') || plugin.subscribes.includes('事件'))
    assert.ok(plugin.effect.length >= 8)
  }
})

test('runtime mount/unmount calls the real dispose and refuses double mount', () => {
  const disposed = []
  const runtime = mod.createPetRuntime({
    wander: () => () => disposed.push('wander'),
    nap: () => () => disposed.push('nap'),
  }, { root: {}, log: () => {} })
  runtime.mount('wander')
  runtime.mount('wander') // 重复挂载是空操作
  assert.equal(disposed.length, 0)
  assert.ok(runtime.mounted('wander'))
  runtime.unmount('wander')
  assert.deepEqual(disposed, ['wander'])
  assert.ok(!runtime.mounted('wander'))
  runtime.unmount('wander') // 卸载未挂载的插件是空操作
  assert.equal(disposed.length, 1)
  assert.throws(() => runtime.mount('nope'), /未知插件/)
})

test('disposeAll unwinds every mounted plugin', () => {
  const disposed = []
  const runtime = mod.createPetRuntime({
    a: () => () => disposed.push('a'),
    b: () => () => disposed.push('b'),
    c: () => () => disposed.push('c'),
  }, { root: {}, log: () => {} })
  runtime.mount('a'); runtime.mount('b'); runtime.mount('c')
  runtime.disposeAll()
  assert.equal(disposed.length, 3)
  assert.ok(!runtime.mounted('a') && !runtime.mounted('b') && !runtime.mounted('c'))
})

test('pushLog keeps at most LOG_LIMIT entries, oldest dropped first', () => {
  let log = []
  for (let i = 0; i < mod.LOG_LIMIT + 3; i++) log = mod.pushLog(log, 'e' + i)
  assert.equal(log.length, mod.LOG_LIMIT)
  assert.equal(log[0], 'e3')
  assert.equal(log.at(-1), 'e8')
})

test('formatLogEntry uses the dispose vocabulary for unmount', () => {
  assert.equal(mod.formatLogEntry('unmount', 'wander'), '卸载插件：wander，监听已 dispose')
  assert.equal(mod.formatLogEntry('mount', 'nap'), '挂载插件：nap')
  assert.equal(mod.formatLogEntry('poke'), '收到戳一戳（click）')
  assert.equal(mod.formatLogEntry('delight'), '收到判分事件（dsh-study-delight）')
  assert.ok(mod.formatLogEntry('x<b>').includes('&lt;'))
})
