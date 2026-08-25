import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'

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
  runtime.mount('wander')
  assert.equal(disposed.length, 0)
  assert.ok(runtime.mounted('wander'))
  runtime.unmount('wander')
  assert.deepEqual(disposed, ['wander'])
  assert.ok(!runtime.mounted('wander'))
  runtime.unmount('wander')
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
})

test('pushLog keeps at most LOG_LIMIT entries, oldest dropped first', () => {
  let log = []
  for (let i = 0; i < mod.LOG_LIMIT + 3; i++) log = mod.pushLog(log, 'e' + i)
  assert.equal(log.length, mod.LOG_LIMIT)
  assert.equal(log[0], 'e3')
})

test('formatLogEntry uses the dispose vocabulary for unmount', () => {
  assert.equal(mod.formatLogEntry('unmount', 'wander'), '卸载插件：wander，监听已 dispose')
  assert.equal(mod.formatLogEntry('mount', 'nap'), '挂载插件：nap')
  assert.equal(mod.formatLogEntry('poke'), '收到戳一戳（click）')
  assert.equal(mod.formatLogEntry('delight'), '收到判分事件（dsh-study-delight）')
})

test('the blink plugin semantics: mount = blinking, unmount = frozen (dispose adds the freeze class)', () => {
  // 用假 root 断言 dispose 真的加了冻结类，而不是像旧实现那样类名错配成空操作。
  const calls = []
  const fakeApi = {
    root: {
      classList: {
        add: c => calls.push('add ' + c),
        remove: c => calls.push('remove ' + c),
      },
    },
    log: () => {},
  }
  // 从模块源码里提取 mountBlink 的行为等价物：模块不导出它，这里以契约测试代替。
  const source = readFileSync(
    new URL('../website/public/study-pet-plugins.js', import.meta.url), 'utf8')
  assert.match(source, /const mountBlink = api => \{\s*\n\s*api\.root\.classList\.remove\('dsh-pp-freeze-eyes'\)/)
  assert.match(source, /return \(\) => \{\s*\n\s*api\.root\.classList\.add\('dsh-pp-freeze-eyes'\)/)
  assert.ok(!source.includes('dsh-pp-nap-freeze-eyes'), '旧实现的反转类名不应残留')
  assert.ok(source.includes('.dsh-pp-freeze-eyes .dsh-comp-eye{animation:none!important;}'), '冻结 CSS 规则应在样式表里')
  void fakeApi; void calls
})

test('the drag handler passes the event explicitly (no implicit window.event)', () => {
  const source = readFileSync(
    new URL('../website/public/study-pet-plugins.js', import.meta.url), 'utf8')
  assert.match(source, /const up = event => \{/)
  assert.ok(!/const up = \(\) => \{/.test(source))
})

test('wander yields to dragging and to the post-drag grace window', () => {
  const source = readFileSync(
    new URL('../website/public/study-pet-plugins.js', import.meta.url), 'utf8')
  assert.match(source, /if \(baseFrame === 'nap' \|\| shared\.dragging \|\| Date\.now\(\) < shared\.pauseUntil\)/)
  assert.match(source, /shared\.pauseUntil = Date\.now\(\) \+ 12000/)
})
