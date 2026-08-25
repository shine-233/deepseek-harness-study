import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-migration.js imports without a DOM', async () => {
  mod = await import('../website/public/study-migration.js')
  assert.equal(typeof mod.renderStepHtml, 'function')
})

test('the model carries exactly the six safe-order steps of lesson 18, in order', () => {
  assert.deepEqual(mod.MIGRATION_STEPS.map(s => s.title), [
    '先记录新基线', '下载到独立临时目录', '在生成前保留旧版本',
    '重新生成并检查差异', '重新人工核对高风险专题', '更新边界说明并清理临时目录',
  ])
})

test('every step body carries its operational guard', () => {
  for (const step of mod.MIGRATION_STEPS) {
    assert.ok(step.body.length >= 30, `${step.title} 的步骤说明过短`)
  }
  // 高风险守卫必须出现在对应步骤里（课程原文的硬性要求）。
  assert.ok(mod.MIGRATION_STEPS[1].body.includes('若不一致就停止'))
  assert.ok(mod.MIGRATION_STEPS[3].body.includes('只是第一道门'))
})

test('renderStepHtml numbers steps from one and rejects bad indexes', () => {
  const html = mod.renderStepHtml(mod.MIGRATION_STEPS[0], 1)
  assert.ok(html.includes('第 1 步'))
  assert.throws(() => mod.renderStepHtml(mod.MIGRATION_STEPS[0], 0), /从 1 开始/)
})

test('renderStepHtml escapes HTML-bearing text', () => {
  const html = mod.renderStepHtml({ title: 't<i>', body: 'b&c' }, 2)
  assert.ok(html.includes('t&lt;i&gt;'))
  assert.ok(html.includes('b&amp;c'))
})
