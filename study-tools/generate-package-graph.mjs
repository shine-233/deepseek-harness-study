#!/usr/bin/env node

/**
 * 从固定上游提交生成包依赖图数据。
 *
 * 图里的每个数字都来自固定提交本身，不来自任何页面自述：
 *   节点大小 = 该包 `src/**\/*.ts` 的总行数
 *   边       = 该包 `package.json` 的 peerDependencies 中指向仓库内其他包的项
 *   边的粗细 = 被依赖次数
 *
 * 输出写入 study/fixtures/package-graph.json，带固定提交、生成口径和内容哈希，
 * 这样渲染页只做渲染，不在浏览器里推导数字。
 *
 * 用法：
 *   node study-tools/generate-package-graph.mjs           # 写入 fixture
 *   node study-tools/generate-package-graph.mjs --check    # 只比对，不写入
 */

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const root = process.cwd()
const manifest = JSON.parse(readFileSync(join(root, 'study', 'source-index-manifest.json'), 'utf8'))
const commit = manifest.commit
const outputPath = join(root, 'study', 'fixtures', 'package-graph.json')

function git(args, options = {}) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, ...options })
}

/** `packages/<group>/<pkg>/src/**\/*.ts` 的每文件行数。 */
function sourceLineCounts() {
  const counts = new Map()
  const output = git(['grep', '-c', '', commit, '--', 'packages'])
  for (const line of output.split(/\r?\n/)) {
    if (line === '') continue
    const separator = line.indexOf(':')
    const rest = line.slice(separator + 1)
    const lastColon = rest.lastIndexOf(':')
    const path = rest.slice(0, lastColon)
    const lines = Number(rest.slice(lastColon + 1))
    const match = /^packages\/([^/]+)\/([^/]+)\/src\/.*\.ts$/.exec(path)
    if (match === null || !Number.isFinite(lines)) continue
    const key = match[1] + '/' + match[2]
    const entry = counts.get(key) ?? { lines: 0, files: 0 }
    entry.lines += lines
    entry.files += 1
    counts.set(key, entry)
  }
  return counts
}

/**
 * 一次 `git cat-file --batch` 读回全部 package.json，避免 219 次进程启动。
 *
 * 必须按字节处理：batch 头里的 size 是字节数，而 JS 字符串按字符计长，任何非
 * ASCII 内容都会让偏移漂移，并且是静默漂移——后面每个包都读到错位的内容。
 */
function readPackageManifests() {
  const tree = git(['ls-tree', '-r', commit, '--', 'packages'])
  const targets = []
  for (const line of tree.split(/\r?\n/)) {
    const match = /^\d+ blob ([0-9a-f]{40})\t(packages\/[^/]+\/[^/]+\/package\.json)$/.exec(line)
    if (match !== null) targets.push({ sha: match[1], path: match[2] })
  }
  if (targets.length === 0) return []

  const batch = execFileSync('git', ['cat-file', '--batch'], {
    cwd: root,
    input: targets.map(target => target.sha).join('\n') + '\n',
    maxBuffer: 256 * 1024 * 1024,
  })
  const results = []
  let offset = 0
  for (const target of targets) {
    const headerEnd = batch.indexOf(0x0a, offset)
    const header = batch.slice(offset, headerEnd).toString('utf8')
    const size = Number(header.split(' ')[2])
    if (!Number.isFinite(size)) {
      results.push({ path: target.path, json: null, reason: 'cat-file 头无法解析：' + header })
      break
    }
    const body = batch.slice(headerEnd + 1, headerEnd + 1 + size).toString('utf8')
    offset = headerEnd + 1 + size + 1
    try {
      results.push({ path: target.path, json: JSON.parse(body) })
    } catch (error) {
      results.push({
        path: target.path,
        json: null,
        reason: error instanceof Error ? error.message.slice(0, 120) : 'JSON 解析失败',
      })
    }
  }
  return results
}

const lineCounts = sourceLineCounts()
const manifests = readPackageManifests()

const nodes = []
const skipped = []
const byNpmName = new Map()

for (const entry of manifests) {
  const match = /^packages\/([^/]+)\/([^/]+)\/package\.json$/.exec(entry.path)
  if (match === null) continue
  const [, group, directory] = match
  if (entry.json === null) {
    skipped.push({ path: entry.path, reason: entry.reason ?? 'package.json 在固定提交无法解析' })
    continue
  }
  const npmName = typeof entry.json.name === 'string' ? entry.json.name : null
  const key = group + '/' + directory
  const counted = lineCounts.get(key) ?? { lines: 0, files: 0 }
  const node = {
    id: key,
    group,
    directory,
    npmName,
    srcLines: counted.lines,
    srcFiles: counted.files,
    private: entry.json.private === true,
    peers: Object.keys(entry.json.peerDependencies ?? {}),
  }
  nodes.push(node)
  if (npmName !== null) byNpmName.set(npmName, key)
}

const edges = []
const externalPeers = new Map()
for (const node of nodes) {
  for (const peer of node.peers) {
    const target = byNpmName.get(peer)
    if (target === undefined) {
      externalPeers.set(peer, (externalPeers.get(peer) ?? 0) + 1)
      continue
    }
    if (target === node.id) continue
    edges.push({ from: node.id, to: target })
  }
}

const inDegree = new Map()
for (const edge of edges) inDegree.set(edge.to, (inDegree.get(edge.to) ?? 0) + 1)
for (const node of nodes) {
  node.dependedOnBy = inDegree.get(node.id) ?? 0
  delete node.peers
}

nodes.sort((left, right) => left.id.localeCompare(right.id))
edges.sort((left, right) => (left.from + '->' + left.to).localeCompare(right.from + '->' + right.to))

const groups = [...new Set(nodes.map(node => node.group))].sort()
const payload = {
  generatedBy: 'study-tools/generate-package-graph.mjs',
  commit,
  meaning: {
    node: '一个 packages/<group>/<pkg> 目录',
    size: '该包 src/**/*.ts 的总行数',
    edge: 'package.json 的 peerDependencies 指向仓库内另一个包',
    thickness: '被依赖次数（入度）',
    notMeasured: '运行时调用次数、打包体积、导入频率都没有测量；本图只读固定提交的清单和源码行数。',
  },
  totals: {
    packages: nodes.length,
    groups: groups.length,
    edges: edges.length,
    srcFiles: nodes.reduce((sum, node) => sum + node.srcFiles, 0),
    srcLines: nodes.reduce((sum, node) => sum + node.srcLines, 0),
    externalPeerNames: [...externalPeers.keys()].sort(),
  },
  groups,
  nodes,
  edges,
  skipped,
}

payload.contentHash = createHash('sha256')
  .update(JSON.stringify({ ...payload, contentHash: undefined }))
  .digest('hex')
  .toUpperCase()
const finalText = JSON.stringify(payload, null, 2) + '\n'

const checkOnly = process.argv.includes('--check')
if (checkOnly) {
  if (!existsSync(outputPath)) {
    console.error('package-graph fixture 不存在：' + outputPath)
    process.exit(1)
  }
  const current = readFileSync(outputPath, 'utf8')
  if (current !== finalText) {
    console.error('package-graph fixture 与固定提交不一致；请重新运行本脚本。')
    process.exit(1)
  }
  console.log('package-graph：与固定提交一致（' + String(payload.totals.packages) + ' 包，'
    + String(payload.totals.edges) + ' 条边）')
  process.exit(0)
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, finalText)
console.log('固定提交：' + commit)
console.log('包：' + String(payload.totals.packages)
  + '，组：' + String(payload.totals.groups)
  + '，内部依赖边：' + String(payload.totals.edges))
console.log('src 文件：' + String(payload.totals.srcFiles)
  + '，src 行：' + String(payload.totals.srcLines))
console.log('外部 peer（不画进图）：' + payload.totals.externalPeerNames.join('、'))
if (skipped.length > 0) console.log('跳过：' + String(skipped.length) + ' 个包')
console.log('写入：' + outputPath)
console.log('内容哈希：' + payload.contentHash.slice(0, 16) + '…')
console.log('')
console.log('这些数字来自固定提交的清单和源码行数，不是任何页面的自述。')
console.log('未测量：运行时调用次数、打包体积、导入频率。')
