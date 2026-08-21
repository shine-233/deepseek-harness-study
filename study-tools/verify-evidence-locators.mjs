#!/usr/bin/env node

/**
 * 检查 study/source-evidence-manifest.json 里每条证据 locator 是否仍能定位到真实文件。
 *
 * 这是路径可达性检查，不是证据语义审查：它只回答“这个 locator 现在还能打开吗”，
 * 不回答“这条 claim 的结论是否成立”。结论仍需读源码、读测试或重跑浏览器动作。
 *
 * manifest 的 locator 采用四条书写约定，本工具按同样的约定解析：
 *   1. 绝对路径直接使用；
 *   2. 相对路径优先相对于该条目 sourceRefs 所指 source 的 locator 根，
 *      其次相对于研究仓库、工作区和 Debug 包；
 *   3. 同一 locator 字符串里后续原子可以继承前一个已解析原子的目录，
 *      让 “website/public/a.js and b.html” 这种同目录简写保持可读又可校验；
 *   4. 部分研究缓存因 Windows 路径长度限制没有完整 checkout，只能通过 Git object 读取，
 *      所以工作树里找不到时还要按 `HEAD:<path>` 在该来源的 Git 仓库里再查一次。
 * 第 4 条对应 study/34 记录的“通过 Git object 读取源码”，不是把缺失当成通过。
 *
 * 退出码：全部可达为 0；出现不可达 locator 为 1。
 */

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { isAbsolute, join, posix, resolve } from 'node:path'

const root = process.cwd()
const manifestPath = join(root, 'study', 'source-evidence-manifest.json')

if (!existsSync(manifestPath)) {
  console.error(`找不到 manifest：${manifestPath}`)
  process.exit(1)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

const workspace = resolve(root, '..')
const genericRoots = [
  root,
  workspace,
  join(workspace, 'dsh-open-source'),
  join(workspace, 'dsh-open-source', 'packages', 'dsh-plugin-debug'),
  join(workspace, '_research-cache-20260819'),
  join(workspace, '_research-cache-20260819', 'github-course-candidates'),
].filter((candidate) => existsSync(candidate))

/** source id -> 该来源的本地根目录（只保留真实存在的目录型 locator）。 */
const sourceRoots = new Map()
for (const source of manifest.sources ?? []) {
  if (!source?.id || typeof source.locator !== 'string') continue
  const locator = source.locator.replaceAll('\\', '/')
  if (!isAbsolute(locator)) continue
  if (existsSync(locator) && statSync(locator).isDirectory()) {
    sourceRoots.set(source.id, locator)
  }
}

const FILE_SUFFIX = /\.[A-Za-z0-9]{1,5}$/
const LINE_RANGE_SUFFIX = /:[\d,\s-]+$/

/**
 * 把一个 locator 字符串切成候选路径原子。
 * 分隔符是分号、逗号和 " and "；锚点和行号后缀会被剥掉。
 * 只保留看起来像文件名的原子，纯描述性英文短句会被跳过并单独统计。
 */
function splitAtoms(value) {
  const atoms = []
  const prose = []
  for (const rawPart of value.split(/;|,\s+|\s+and\s+/)) {
    let part = rawPart.trim().replace(/^["'`]|["'`]$/g, '')
    part = part.replace(/^and\s+/i, '')
    part = part.split('#')[0]
    part = part.replace(LINE_RANGE_SUFFIX, '').trim()
    if (!part) continue
    const tail = part.split('/').pop()
    if (!FILE_SUFFIX.test(tail)) {
      prose.push(rawPart.trim())
      continue
    }
    if (/\s/.test(part) && !part.includes('/')) {
      // 例如 "dsh-session README.md"：包名加文件名的散文写法，无法当路径解析。
      prose.push(rawPart.trim())
      continue
    }
    atoms.push(part)
  }
  return { atoms, prose }
}

function tryResolve(candidate, roots) {
  const normalized = candidate.replaceAll('\\', '/')
  if (isAbsolute(normalized)) {
    return existsSync(normalized) ? normalized : null
  }
  for (const base of [...roots, ...genericRoots]) {
    const full = join(base, normalized)
    if (existsSync(full)) return full
  }
  return null
}

/** 缓存每个 Git 仓库根在 HEAD 上的全部路径，避免对同一仓库反复调用 git。 */
const gitTreeCache = new Map()

function gitTreePaths(repoRoot) {
  if (gitTreeCache.has(repoRoot)) return gitTreeCache.get(repoRoot)
  let paths = null
  if (existsSync(join(repoRoot, '.git'))) {
    try {
      const output = execFileSync('git', ['-C', repoRoot, 'ls-tree', '-r', '--name-only', 'HEAD'], {
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
      })
      paths = new Set(output.split('\n').map((line) => line.trim()).filter(Boolean))
    } catch {
      paths = null
    }
  }
  gitTreeCache.set(repoRoot, paths)
  return paths
}

/**
 * 工作树里找不到时，在来源仓库的 Git 对象里再查一次。
 * 命中表示“固定提交里确实有这个文件，只是没 checkout”，仍算可达证据。
 */
function tryResolveInGitObjects(candidate, roots) {
  const normalized = candidate.replaceAll('\\', '/')
  if (isAbsolute(normalized)) return null
  for (const base of roots) {
    const paths = gitTreePaths(base)
    if (paths?.has(normalized)) return `${base}@HEAD:${normalized}`
  }
  return null
}

const errors = []
const proseOnly = []
let fieldsChecked = 0
let resolvedDirect = 0
let resolvedViaSource = 0
let resolvedViaSibling = 0
let resolvedViaGit = 0

const sections = ['claims', 'artifacts', 'browserRuns', 'qaGaps']
for (const section of sections) {
  const items = manifest[section]
  if (!Array.isArray(items)) continue
  for (const [index, item] of items.entries()) {
    if (!item || typeof item !== 'object') continue
    const refs = item.sourceRefs ?? (item.sourceId ? [item.sourceId] : [])
    const roots = refs.map((ref) => sourceRoots.get(ref)).filter(Boolean)
    const identity = item.id ?? item.sourceId ?? `${section}[${index}]`

    for (const key of ['locator', 'path']) {
      const value = item[key]
      if (typeof value !== 'string' || !value) continue
      if (/^https?:\/\//.test(value)) continue

      const { atoms, prose } = splitAtoms(value)
      if (atoms.length === 0) {
        if (prose.length > 0) proseOnly.push({ section, index, key, identity, value })
        continue
      }

      fieldsChecked += 1
      const missing = []
      let lastDirectory = null

      for (const atom of atoms) {
        let hit = tryResolve(atom, [])
        let how = 'direct'
        if (!hit && roots.length > 0) {
          hit = tryResolve(atom, roots)
          how = 'source'
        }
        if (!hit && lastDirectory) {
          hit = tryResolve(posix.join(lastDirectory, atom), roots)
          how = 'sibling'
        }
        if (!hit && roots.length > 0) {
          hit = tryResolveInGitObjects(atom, roots)
          how = 'git'
        }
        if (!hit && lastDirectory && roots.length > 0) {
          hit = tryResolveInGitObjects(posix.join(lastDirectory, atom), roots)
          how = 'git'
        }
        if (!hit) {
          missing.push(atom)
          continue
        }
        if (how === 'direct') resolvedDirect += 1
        else if (how === 'source') resolvedViaSource += 1
        else if (how === 'git') resolvedViaGit += 1
        else resolvedViaSibling += 1
        lastDirectory = atom.includes('/') ? posix.dirname(atom.replaceAll('\\', '/')) : lastDirectory
      }

      if (missing.length > 0) {
        errors.push({ section, index, key, identity, value, missing, refs })
      }
    }
  }
}

console.log(`manifest：${manifestPath}`)
console.log(`已登记来源：${manifest.sources?.length ?? 0}；其中有本地目录根的：${sourceRoots.size}`)
console.log(`检查的 locator 字段：${fieldsChecked}`)
console.log(`  直接解析的原子：${resolvedDirect}`)
console.log(`  经 sourceRefs 根解析的原子：${resolvedViaSource}`)
console.log(`  经同目录简写解析的原子：${resolvedViaSibling}`)
console.log(`  仅存在于 Git object（未 checkout）的原子：${resolvedViaGit}`)
console.log(`纯描述性 locator（不含可解析路径，不计入错误）：${proseOnly.length}`)
console.log(`不可达 locator 字段：${errors.length}`)

if (proseOnly.length > 0) {
  console.log('')
  console.log('以下 locator 只有文字描述，没有可校验路径；它们不是错误，但也不能当成文件级证据：')
  for (const entry of proseOnly) {
    console.log(`  - ${entry.identity}（${entry.section}[${entry.index}].${entry.key}）：${entry.value}`)
  }
}

if (errors.length > 0) {
  console.log('')
  console.log('以下 locator 无法定位到真实文件：')
  for (const entry of errors) {
    console.log(`  - ${entry.identity}（${entry.section}[${entry.index}].${entry.key}）`)
    console.log(`      locator：${entry.value}`)
    console.log(`      缺失原子：${entry.missing.join('、')}`)
    if (entry.refs.length > 0) console.log(`      sourceRefs：${entry.refs.join('、')}`)
  }
  process.exit(1)
}

console.log('')
console.log('全部 locator 均可定位。注意：可定位不等于结论成立，语义仍需读源码或重跑验证。')
