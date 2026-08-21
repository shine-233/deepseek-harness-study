#!/usr/bin/env node

/**
 * 锁住 3D 场景的几个不变量。
 *
 * 这一幕默认不启动、不承载精确数值、必须有键盘等价操作、且要尊重减少动态效果。
 * 这四条都是手工在浏览器里验证过的，所以它们需要门禁——下一次改动不该静默破坏。
 *
 * 这里不渲染画面。渲染要真实 canvas，那属于浏览器验证；本门禁检查的是布局函数的
 * 数学性质和页面标记里的承诺。
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'

import { layoutRings } from '../website/public/study-lab-scene3d.js'

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'website', 'public')
const fixture = JSON.parse(readFileSync(resolve(publicDir, 'package-graph.json'), 'utf8'))
const html = readFileSync(resolve(publicDir, 'package-graph-lab.html'), 'utf8')
const script = readFileSync(resolve(publicDir, 'package-graph-lab.js'), 'utf8')
const scene = readFileSync(resolve(publicDir, 'study-lab-scene3d.js'), 'utf8')

test('每个包恰好落在一个环位上', () => {
  const { placed } = layoutRings(fixture.nodes, fixture.groups)
  assert.equal(placed.length, fixture.nodes.length)
  const ids = new Set(placed.map(entry => entry.node.id))
  assert.equal(ids.size, fixture.nodes.length)
})

test('内环是行数最多的 12 组', () => {
  const { ringGroups } = layoutRings(fixture.nodes, fixture.groups)
  assert.equal(ringGroups.inner.length, 12)
  const linesOf = (group) => fixture.nodes
    .filter(node => node.group === group)
    .reduce((sum, node) => sum + node.srcLines, 0)
  const innerMin = Math.min(...ringGroups.inner.map(linesOf))
  const outerMax = Math.max(...ringGroups.outer.map(linesOf))
  assert.ok(innerMin >= outerMax, '内环任一组的行数都不应少于外环最大的组')
})

test('同一组的包在环上相邻', () => {
  const { placed } = layoutRings(fixture.nodes, fixture.groups)
  for (const ring of [0, 1]) {
    const sequence = placed.filter(entry => entry.ring === ring)
      .sort((left, right) => left.angle - right.angle)
      .map(entry => entry.group)
    const seen = new Set()
    let previous = null
    for (const group of sequence) {
      if (group === previous) continue
      // 一个组名再次出现，说明它被别的组隔断了。
      assert.ok(!seen.has(group), '组 ' + group + ' 在环 ' + String(ring) + ' 上不连续')
      seen.add(group)
      previous = group
    }
  }
})

test('页面默认不启动场景', () => {
  assert.match(html, /id="scene-stage"[^>]*\shidden/, 'scene-stage 必须带 hidden')
  assert.match(html, /id="scene-launch"/, '必须有启动按钮')
  // 场景只能在 installScene 里创建，而且要在按钮回调里；顶层创建就等于加载即渲染。
  const creations = [...script.matchAll(/^([ \t]*)\S[^\r\n]*createPackageScene\(/gm)]
  assert.ok(creations.length > 0, '找不到创建场景的地方')
  for (const creation of creations) {
    assert.ok(creation[1].length > 0, '创建场景的语句不能写在顶层（缩进为 0）')
  }
})

test('场景用全量模型，不跟随按组筛选', () => {
  assert.match(script, /installScene\(buildPackageGraphModel\(fixture, \{ group: 'all'/)
})

test('有键盘等价操作', () => {
  for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
    assert.ok(script.includes(key), '缺少 ' + key + ' 的处理')
  }
  assert.match(html, /id="scene-canvas"[^>]*tabindex="0"/s, 'canvas 必须可聚焦')
})

test('自动旋转尊重减少动态效果', () => {
  assert.match(scene, /options\.reducedMotion === true \|\| spinning/,
    'startSpin 必须在 reducedMotion 下直接返回')
  assert.match(script, /prefers-reduced-motion: reduce/)
})

test('页面把三个维度的含义写出来，并指明数值看表格', () => {
  for (const promise of ['柱高', '环上位置', '连线', '对数刻度']) {
    assert.ok(html.includes(promise), '图例缺少「' + promise + '」')
  }
  assert.ok(html.includes('表格'), '必须指明精确数值在表格里')
  assert.match(html, /role="img"[\s\S]{0,240}aria-label/, 'canvas 必须有 aria-label')
})

test('依赖边默认不画', () => {
  assert.match(html, /id="scene-edges"(?![^>]*\bchecked\b)/, '依赖边复选框不应默认勾选')
  assert.match(scene, /let showEdges = false/)
})
