import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readdirSync } from 'node:fs'
import { LAB_PAGE_IDS } from '../website/public/study-progress-core.js'

/**
 * 进度名单完整性门禁：public 下每个 *-lab.html 都要登记进 LAB_PAGE_IDS。
 *
 * 背景：这份名单此前是手工维护的第二份清单，credential/settings/plan-stack/
 * subprocess 等页面漏登后，读者在这些实验室提交预测门控时进度被静默丢弃
 * （总览页却仍把它们算作可记录对象）。本测试按文件系统钉住名单，
 * 新增实验室页忘了登记会在这里红。
 */

test('every lab page on disk is registered in LAB_PAGE_IDS', () => {
  const publicDir = new URL('../website/public/', import.meta.url)
  const pages = readdirSync(publicDir)
    .filter(name => name.endsWith('-lab.html'))
    .map(name => name.replace(/-lab\.html$/, ''))
  assert.ok(pages.length >= 50, `实验页数量异常：${String(pages.length)}`)
  const missing = pages.filter(id => !LAB_PAGE_IDS.includes(id))
  assert.deepEqual(missing, [], '这些实验室页没有登记进 LAB_PAGE_IDS，门控进度会被静默丢弃')
})

test('LAB_PAGE_IDS has no duplicates and no stale entries', () => {
  assert.equal(new Set(LAB_PAGE_IDS).size, LAB_PAGE_IDS.length, '名单里有重复 id')
})
