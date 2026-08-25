import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-verdict.js imports without a DOM', async () => {
  mod = await import('../website/public/study-verdict.js')
  assert.equal(typeof mod.verdictLevel, 'function')
  assert.equal(typeof mod.renderVerdictDetailHtml, 'function')
})

test('the model carries exactly the seven goals of lesson 17, in table order', () => {
  assert.deepEqual(mod.VERDICTS.map(v => v.goal), [
    '第一次理解 DSH 的架构', '定位任意纳入范围的源文件', '设计一个普通第三方插件',
    '设计默认工具集合和 agent 可见性', '审核社区项目是否冒用官方身份',
    '证明一个插件可以生产部署', '声称自己完整理解全部源码',
  ])
})

test('verdict levels: two enough, three qualified, two insufficient', () => {
  assert.equal(mod.VERDICTS.filter(v => v.level === 'enough').length, 2)
  assert.equal(mod.VERDICTS.filter(v => v.level === 'qualified').length, 3)
  assert.equal(mod.VERDICTS.filter(v => v.level === 'insufficient').length, 2)
})

test('verdictLevel derives from the verbatim prefix and rejects unknown text', () => {
  assert.equal(mod.verdictLevel('够用'), 'enough')
  assert.equal(mod.verdictLevel('够用作设计教材'), 'qualified')
  assert.equal(mod.verdictLevel('不够'), 'insufficient')
  assert.throws(() => mod.verdictLevel('看心情'), /未知裁决/)
})

test('renderVerdictDetailHtml escapes HTML-bearing text', () => {
  const html = mod.renderVerdictDetailHtml({ goal: 'g', verdict: 'v<b>', level: 'enough', needs: 'n&n' })
  assert.ok(html.includes('v&lt;b&gt;'))
  assert.ok(html.includes('n&amp;n'))
})
