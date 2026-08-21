import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import * as yaml from 'js-yaml'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')

// This fork ships exactly two workflows: the Pages deployment and the study
// quality gate. The README's "why this fork keeps two workflows" section and
// the removal of every upstream release/E2E/issue workflow both depend on
// that set staying closed.
describe('Workflow inventory', () => {
  it('keeps only the Pages deployment and the study quality gate', () => {
    const files = readdirSync(resolve(root, '.github/workflows')).sort()
    expect(files).toEqual(['docs-pages.yml', 'study-quality.yml'])
  })
})

describe('Docs Pages workflow', () => {
  it('deploys only from master pushes and manual dispatch', () => {
    const workflow = loadWorkflow('.github/workflows/docs-pages.yml')
    const push = workflowEvent(workflow, 'push')
    expect(push.branches).toEqual(['master'])
    expect(Array.isArray(push.paths) && push.paths.length > 0).toBe(true)
    expect(() => workflowEvent(workflow, 'pull_request')).toThrow()
    expect(hasEvent(workflow, 'workflow_dispatch')).toBe(true)
  })

  it('never cancels an in-progress Pages run', () => {
    const workflow = loadWorkflow('.github/workflows/docs-pages.yml')
    expect(workflow.concurrency).toMatchObject({
      group: 'github-pages',
      'cancel-in-progress': false,
    })
  })

  it('fetches the pinned upstream commit before any gate runs', () => {
    const steps = commandSteps('.github/workflows/docs-pages.yml', 'build')
    const fetchIndex = steps.findIndex(step => step.name === 'Fetch the pinned upstream commit the study gates read')
    expect(fetchIndex).toBeGreaterThan(-1)
    const fetchStep = steps[fetchIndex]
    if (!fetchStep) throw new TypeError('docs-pages must define the pinned-commit fetch step')
    expect(fetchStep.run).toContain("require('./study/source-index-manifest.json').commit")
    expect(fetchStep.run).toContain('git cat-file -e "$commit^{tree}"')

    const firstGate = steps.findIndex(step => step.name === 'Verify offline study bridge')
    expect(firstGate).toBeGreaterThan(fetchIndex)
  })

  it('runs the study gates before building the documentation', () => {
    const names = commandSteps('.github/workflows/docs-pages.yml', 'build').map(step => step.name)
    const docSyncIndex = names.indexOf('Verify and build documentation')
    expect(docSyncIndex).toBeGreaterThan(-1)
    for (const gate of [
      'Verify offline study bridge',
      'Verify deterministic study lab',
      'Verify the package graph fixture still matches the pinned commit',
      'Verify the package graph model',
      'Verify the four lesson lab models',
      'Verify the lab palette holds both contrast floors',
    ]) {
      expect(names.indexOf(gate), `${gate} must precede doc-sync`).toBeGreaterThanOrEqual(0)
      expect(names.indexOf(gate)).toBeLessThan(docSyncIndex)
    }
    expect(names.indexOf('Verify the published study shell before upload')).toBeGreaterThan(docSyncIndex)
  })

  it('uploads the built site and deploys it with least-privilege permissions', () => {
    const workflow = loadWorkflow('.github/workflows/docs-pages.yml')
    const build = workflowJob(workflow, 'build')
    const deploy = workflowJob(workflow, 'deploy')

    expect(build['runs-on']).toBe('ubuntu-latest')
    expect(build.permissions).toMatchObject({ contents: 'read', pages: 'read' })
    expect(deploy.needs).toBe('build')
    expect(deploy.permissions).toMatchObject({ pages: 'write', 'id-token': 'write' })

    const upload = (build.steps as unknown[]).find(
      step => isRecord(step) && typeof step.uses === 'string' && step.uses.startsWith('actions/upload-pages-artifact@'),
    )
    expect(upload).toMatchObject({ with: { path: 'website/.dist' } })
    expect((deploy.steps as unknown[]).some(
      step => isRecord(step) && typeof step.uses === 'string' && step.uses.startsWith('actions/deploy-pages@'),
    )).toBe(true)
  })

  it('disables production telemetry in CI runs', () => {
    const workflow = loadWorkflow('.github/workflows/docs-pages.yml')
    expect(workflow.env).toMatchObject({ DSH_TELEMETRY_DISABLED: '1' })
  })
})

describe('Study quality workflow', () => {
  it('stays read-only over repository contents', () => {
    const workflow = loadWorkflow('.github/workflows/study-quality.yml')
    expect(workflow.permissions).toEqual({ contents: 'read' })
  })

  it('gates pull requests and master pushes behind the study paths', () => {
    const workflow = loadWorkflow('.github/workflows/study-quality.yml')
    const pullRequest = workflowEvent(workflow, 'pull_request')
    const push = workflowEvent(workflow, 'push')
    expect(Array.isArray(pullRequest.paths) && pullRequest.paths.length > 0).toBe(true)
    expect(push.branches).toEqual(['master'])
    expect(Array.isArray(push.paths) && push.paths.length > 0).toBe(true)
    expect(hasEvent(workflow, 'workflow_dispatch')).toBe(true)
  })

  it('runs source verification before documentation projection', () => {
    const names = commandSteps('.github/workflows/study-quality.yml', 'verify').map(step => step.name)
    const indexOf = (name: string) => {
      const index = names.indexOf(name)
      expect(index, `${name} must stay in the verify job`).toBeGreaterThanOrEqual(0)
      return index
    }

    const install = indexOf('Install (immutable)')
    const build = indexOf('Build DSH source and web artifacts')
    const test = indexOf('Run DSH unit tests')
    const lint = indexOf('Run DSH lint')
    const docSync = indexOf('Verify documentation and build Pages input')
    const siteCheck = indexOf('Verify the built Pages study shell')
    const whitespace = indexOf('Check committed whitespace')

    expect(install).toBeLessThan(build)
    expect(build).toBeLessThan(test)
    expect(test).toBeLessThan(lint)
    expect(lint).toBeLessThan(docSync)
    expect(docSync).toBeLessThan(siteCheck)
    expect(siteCheck).toBeLessThan(whitespace)
  })

  it('uploads the built site as a named artifact and records the evidence boundary', () => {
    const workflow = loadWorkflow('.github/workflows/study-quality.yml')
    const verify = workflowJob(workflow, 'verify')

    const upload = (verify.steps as unknown[]).find(
      step => isRecord(step) && typeof step.uses === 'string' && step.uses.startsWith('actions/upload-artifact@'),
    )
    expect(upload).toMatchObject({
      with: {
        name: 'dsh-study-site-${{ github.sha }}',
        path: 'website/.dist',
        'if-no-files-found': 'error',
      },
    })

    const summary = (verify.steps as unknown[]).find(
      step => isRecord(step) && step.name === 'Write evidence boundary to job summary',
    )
    expect(summary).toMatchObject({ if: 'always()' })
    expect(JSON.stringify(summary)).toContain('GITHUB_STEP_SUMMARY')
  })
})

describe('Git hooks', () => {
  it('leaves frozen Agent Note sidecars to the archive verifier', () => {
    const lefthook = loadWorkflow('lefthook.yml')

    for (const hookName of ['pre-commit', 'pre-merge-commit']) {
      const hook = lefthook[hookName]
      if (!isRecord(hook) || !Array.isArray(hook.jobs)) {
        throw new TypeError(`lefthook must define ${hookName} jobs`)
      }
      const pairing: unknown = hook.jobs.find(
        (job: unknown) => isRecord(job) && job.name === 'translation pairing (staged records)',
      )

      expect(pairing).toMatchObject({ exclude: ['.agents/notes/archived/**'] })
    }
  })
})

function loadWorkflow(path: string): Record<string, unknown> {
  const workflow: unknown = yaml.load(readFileSync(resolve(root, path), 'utf8'))
  if (!isRecord(workflow)) throw new TypeError(`${path} must define a workflow`)
  return workflow
}

function workflowEvent(workflow: Record<string, unknown>, event: string): Record<string, unknown> {
  if (!isRecord(workflow.on) || !isRecord(workflow.on[event])) {
    throw new TypeError(`workflow must define the ${event} event`)
  }
  return workflow.on[event]
}

function hasEvent(workflow: Record<string, unknown>, event: string): boolean {
  return isRecord(workflow.on) && event in workflow.on
}

function workflowJob(workflow: Record<string, unknown>, job: string): Record<string, unknown> {
  if (!isRecord(workflow.jobs) || !isRecord(workflow.jobs[job])) {
    throw new TypeError(`workflow must define the ${job} job`)
  }
  return workflow.jobs[job]
}

function commandSteps(path: string, job: string): Array<Record<string, unknown> & { name?: unknown; run: string }> {
  const jobValue = workflowJob(loadWorkflow(path), job)
  if (!Array.isArray(jobValue.steps)) throw new TypeError(`${path} job ${job} must define steps`)
  return (jobValue.steps as unknown[]).flatMap((step) => {
    if (!isRecord(step) || typeof step.run !== 'string') return []
    return [{ ...step, run: step.run }]
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
