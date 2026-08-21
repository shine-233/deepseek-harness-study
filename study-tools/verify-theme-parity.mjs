#!/usr/bin/env node

/**
 * 比对深色板的两份副本是否逐 token 一致。
 *
 * study-tokens.css 的深色值必须写两份：`@media (prefers-color-scheme: dark)` 里
 * 那份服务系统偏好，也是关掉脚本时唯一生效的一份；`:root[data-theme="dark"]` 那份
 * 服务用户在主题按钮上的显式选择。CSS 无法让媒体查询作用域内外的两个选择器共用
 * 同一个声明块，所以副本不可避免——这道门禁负责让它们不漂移。
 *
 * 只改一边就会在这里失败，附带指出哪个 token 的两份值不同。
 *
 * 退出码：一致为 0；缺 token 或值不同为 1。
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const tokensPath = join(process.cwd(), 'website', 'public', 'study-tokens.css')

if (!existsSync(tokensPath)) {
  console.error('找不到 token 文件：' + tokensPath)
  process.exit(1)
}

const css = readFileSync(tokensPath, 'utf8')

/**
 * 取出一个选择器块里的自定义属性。
 *
 * @param selector 选择器原文，正则会转义它。
 * @returns token 名到取值的映射；找不到该块返回 null。
 */
function blockTokens(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
  const match = new RegExp(escaped + String.raw`\s*\{([\s\S]*?)\n\s*\}`).exec(css)
  if (match === null) return null
  const tokens = new Map()
  for (const declaration of match[1].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    tokens.set(declaration[1], declaration[2].trim().replace(/\s+/g, ' '))
  }
  return tokens
}

const fromMedia = blockTokens(':root:not([data-theme="light"])')
const fromAttribute = blockTokens(':root[data-theme="dark"]')

const problems = []
if (fromMedia === null) problems.push('找不到媒体查询里的深色块 :root:not([data-theme="light"])')
if (fromAttribute === null) problems.push('找不到属性深色块 :root[data-theme="dark"]')

if (problems.length === 0) {
  const names = new Set([...fromMedia.keys(), ...fromAttribute.keys()])
  for (const name of [...names].sort()) {
    const media = fromMedia.get(name)
    const attribute = fromAttribute.get(name)
    if (media === undefined) problems.push(name + '：只在属性块里有，媒体查询块缺失')
    else if (attribute === undefined) problems.push(name + '：只在媒体查询块里有，属性块缺失')
    else if (media !== attribute) problems.push(name + '：两份值不同\n    媒体查询：' + media + '\n    属性：    ' + attribute)
  }
}

console.log('token 文件：' + tokensPath)
if (fromMedia !== null) console.log('媒体查询深色块：' + String(fromMedia.size) + ' 个 token')
if (fromAttribute !== null) console.log('属性深色块：  ' + String(fromAttribute.size) + ' 个 token')

if (problems.length > 0) {
  console.log('')
  console.log('两份深色板不一致：')
  for (const problem of problems) console.log('  - ' + problem)
  process.exit(1)
}

console.log('两份深色板逐 token 一致。')
