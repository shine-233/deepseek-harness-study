import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const workbenchRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repositoryRoot = resolve(workbenchRoot, '..', '..')
const configPath = resolve(workbenchRoot, 'tsconfig.json')
const artifactPath = resolve(workbenchRoot, 'dist', 'minimal-plugin.js')
const tscPath = resolve(repositoryRoot, 'node_modules', 'typescript', 'bin', 'tsc')

execFileSync(process.execPath, [tscPath, '-p', configPath], {
  cwd: repositoryRoot,
  stdio: 'inherit',
})

if (!existsSync(artifactPath)) {
  throw new Error(`build did not produce ${artifactPath}`)
}

const digest = createHash('sha256').update(readFileSync(artifactPath)).digest('hex')
const manifestPath = resolve(workbenchRoot, 'dist', 'build-manifest.json')
mkdirSync(dirname(manifestPath), { recursive: true })
writeFileSync(manifestPath, `${JSON.stringify({
  artifact: 'dist/minimal-plugin.js',
  source: 'src/minimal-plugin.ts',
  sha256: digest,
}, null, 2)}\n`)
console.log(`built dist/minimal-plugin.js (sha256 ${digest})`)
