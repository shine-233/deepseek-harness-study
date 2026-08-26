#!/usr/bin/env node

/**
 * 构建后减负：从 .dist 的每个 HTML 里剥掉重型 vendor 的 modulepreload。
 *
 * withMermaid 全局注册后，VitePress 把 mermaid 全部图表类型、dagre、cytoscape
 * 布局和 katex 都算进每个页面的静态依赖图，首页与课程页各背约 40 个 preload，
 * 浏览器会在首屏前抢下数 MB 与本页无关的 JS。modulepreload 只是预取提示：
 * 删掉不改变任何运行时行为，需要时动态 import 照常拉取。framework/theme 的
 * 预载保留——那是水合真正要用的。
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(import.meta.dirname, '../website/.dist')
const HEAVY = /(?:mermaid|katex|dagre|cose-bilkent|swimlanes|[a-z]Diagram[-.]|\bdag[\d-])/i

let files = 0
let stripped = 0

const walk = dir => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
      continue
    }
    if (!entry.name.endsWith('.html')) continue
    const source = readFileSync(full, 'utf8')
    const next = source.replace(/<link rel="modulepreload"[^>]*href="[^"]*"[^>]*>\n?/gi, tag => {
      return HEAVY.test(tag) ? (stripped += 1, '') : tag
    })
    if (next !== source) {
      writeFileSync(full, next)
      files += 1
    }
  }
}

walk(distDir)
console.log(`strip-heavy-preloads: removed ${stripped} preload link(s) from ${files} file(s).`)
