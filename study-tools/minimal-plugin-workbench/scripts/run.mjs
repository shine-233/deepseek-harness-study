import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const workbenchRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const repositoryRoot = resolve(workbenchRoot, '..', '..')
const runnerPath = resolve(workbenchRoot, 'src', 'run.ts')
const tsxPath = resolve(repositoryRoot, 'node_modules', 'tsx', 'dist', 'cli.mjs')

execFileSync(process.execPath, [tsxPath, runnerPath, ...process.argv.slice(2)], {
  cwd: repositoryRoot,
  stdio: 'inherit',
})
