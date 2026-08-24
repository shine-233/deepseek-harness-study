import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-research-board.js imports without a DOM', async () => {
  try {
    mod = await import('../website/public/study-research-board.js')
  } catch (error) {
    throw new Error(`study-research-board.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof mod.filterItems, 'function')
  assert.equal(typeof mod.renderItemDetailHtml, 'function')
})

test('the board carries exactly the ten research items of lesson 26, in table order', () => {
  assert.deepEqual(mod.RESEARCH_ITEMS.map(item => item.name), [
    '宿主导出工具可见集合',
    '工具可见性 A/B 性能实验',
    '分批人工抽查高风险索引',
    '社区插件、Hook bridge 和注入器复核',
    '最小示例插件工作台',
    '教材质量 CI 与审阅记录',
    'Pages 移动端与长索引体验',
    'GitHub 仓库治理',
    '依赖告警分类',
    'Actions 运行时维护',
  ])
})

test('priorities are P0/P1/P2 and every item fills why/who/evidence', () => {
  for (const item of mod.RESEARCH_ITEMS) {
    assert.ok(mod.PRIORITY_ORDER.includes(item.priority), `${item.name} 优先级非法`)
    assert.ok(item.why.length >= 10, `${item.name} 的 why 过短`)
    assert.ok(item.who.length >= 4, `${item.name} 的 who 过短`)
    assert.ok(item.evidence.length >= 10, `${item.name} 的 evidence 过短`)
  }
})

test('filterItems returns 2/4/4 items for P0/P1/P2 and all ten for 全部', () => {
  assert.equal(mod.filterItems('P0').length, 2)
  assert.equal(mod.filterItems('P1').length, 4)
  assert.equal(mod.filterItems('P2').length, 4)
  assert.equal(mod.filterItems('全部').length, 10)
  assert.throws(() => mod.filterItems('P3'), /未知筛选/)
})

test('renderItemDetailHtml escapes HTML-bearing text', () => {
  const html = mod.renderItemDetailHtml({
    priority: 'P0', name: 'n', why: 'w<b', who: 'h>"i', evidence: 'e&x',
  })
  assert.ok(html.includes('w&lt;b'))
  assert.ok(html.includes('h&gt;&quot;i'))
  assert.ok(html.includes('e&amp;x'))
  assert.ok(!html.includes('<b'))
})
