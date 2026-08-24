import assert from 'node:assert/strict'
import { test } from 'node:test'

let mod
test('setup: study-indexcard.js imports without a DOM', async () => {
  try {
    mod = await import('../website/public/study-indexcard.js')
  } catch (error) {
    throw new Error(`study-indexcard.js must import without a DOM: ${error.message}`)
  }
  assert.equal(typeof mod.renderFieldDetailHtml, 'function')
})

test('the model carries the eleven required fields plus the optional one, in lesson order', () => {
  assert.deepEqual(mod.INDEX_FIELDS.map(field => field.field), [
    '所属层', '文件角色', '这个文件有什么用', '为什么这样设计', '文件级设计证据',
    '直接协作者', '对应测试', '测试关联依据', '阅读顺序', '代码证据', '固定版本', '测试支持',
  ])
})

test('exactly eleven fields are required and only 测试支持 is optional', () => {
  const required = mod.INDEX_FIELDS.filter(field => field.required)
  const optional = mod.INDEX_FIELDS.filter(field => !field.required)
  assert.equal(required.length, 11)
  assert.deepEqual(optional.map(field => field.field), ['测试支持'])
})

test('every definition is substantive and quotes the lesson scope', () => {
  for (const field of mod.INDEX_FIELDS) {
    assert.ok(field.definition.length >= 12, `${field.field} 的定义过短`)
  }
  const fixedVersion = mod.INDEX_FIELDS.find(field => field.field === '固定版本')
  assert.ok(fixedVersion.definition.includes('commit'))
})

test('renderFieldDetailHtml escapes HTML and marks required vs optional', () => {
  const required = mod.renderFieldDetailHtml(mod.INDEX_FIELDS[0])
  assert.ok(required.includes('必填'))
  assert.ok(!required.includes('可选'))
  const optional = mod.renderFieldDetailHtml(mod.INDEX_FIELDS[11])
  assert.ok(optional.includes('可选'))
  const hostile = mod.renderFieldDetailHtml({ field: 'f<b>', required: true, definition: 'd"e' })
  assert.ok(!hostile.includes('<b>'))
  assert.ok(hostile.includes('d&quot;e'))
})
