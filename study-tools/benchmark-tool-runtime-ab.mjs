#!/usr/bin/env node

/**
 * Run a provider-free A/B observation through the real local ToolRuntime.
 *
 * A and B share one registered tool set and one native presentation mode.
 * B adds a scoped `restrict({ allow })` policy, so the experiment changes the
 * effective view without deleting registrations or changing tool schemas.
 * The script measures only local registry/schema/prompt preparation; it never
 * starts DSH, loads a Profile, contacts a provider, or invokes a model.
 */

import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { compareSnapshots } from './compare-tool-visibility-ab.mjs'

const repositoryRoot = resolve(import.meta.dirname, '..')
// This script lives outside the workspace packages, so Node's normal package
// lookup cannot see every `@deepseek-ai/*` workspace link from the repository
// root. Load the already-built library entrypoints explicitly; their own
// package-local dependencies still resolve through their workspace links.
const importLocal = file => import(pathToFileURL(resolve(repositoryRoot, file)).href)
const { Context } = await importLocal('vendor/cordis/lib/index.js')
const { createScope } = await importLocal('packages/core/scope/lib/index.js')
const systemPromptModule = await importLocal('packages/core/system-prompt/lib/index.js')
const toolsModule = await importLocal('packages/core/tools/lib/index.js')
const { default: SystemPrompt, renderPrompt } = systemPromptModule
const { default: ToolRuntime, defineTool } = toolsModule

export const DEFAULT_ITERATIONS = 200
export const DEFAULT_WARMUP = 25
export const STUDY_TOOL_COUNT = 24
export const STUDY_ALLOWED_TOOLS = ['read_file', 'search_text', 'show_status']

/**
 * Build one small, deterministic registry. The names are deliberately
 * representative rather than copied from a product Profile: the experiment
 * tests the host seam, not the exact contents of a deployment.
 *
 * @param {Context} ctx - active Cordis context
 * @returns {void}
 */
function registerStudyTools(ctx) {
  const names = [
    'read_file',
    'write_file',
    'search_text',
    'list_directory',
    'show_status',
    ...Array.from({ length: STUDY_TOOL_COUNT - 5 }, (_, index) => `auxiliary_tool_${String(index + 1).padStart(2, '0')}`),
  ]

  for (const name of names) {
    ctx.tools.register(defineTool({
      name,
      description: `Study fixture tool ${name}. It exists only to make the visible-set experiment measurable.`,
      parameters: {},
      output: {
        schema: { type: 'object', additionalProperties: false, properties: { ok: { type: 'boolean', required: true } } },
        render: (_args, value) => [{ type: 'text', text: JSON.stringify(value) }],
      },
      execute: async () => ({ ok: true }),
    }))
  }
}

/**
 * Mount a real ToolRuntime and mint an agent-like scope for the restriction.
 *
 * @returns {Promise<{ctx: Context, tools: ToolRuntime, systemPrompt: object, agent: object, scope: object}>}
 */
async function mountExperiment() {
  const ctx = new Context()
  await ctx.plugin(SystemPrompt, {
    includeHarnessIdentity: false,
    includeRuntimeContext: false,
    persona: 'This is a deterministic local study fixture.',
  })
  await ctx.plugin(ToolRuntime, { mode: 'native' })
  registerStudyTools(ctx)

  const agent = { id: 'dsh-study-runtime-ab-agent' }
  let scope
  await ctx.plugin(Object.assign((inner) => {
    scope = createScope(inner, agent)
  }, { inject: ['tools', 'systemPrompt'] }))

  if (scope === undefined) throw new Error('无法创建实验 agent 作用域')
  return { ctx, tools: ctx.tools, systemPrompt: ctx.systemPrompt, agent, scope }
}

function wireSchemas(schemas) {
  return schemas.map(schema => ({
    name: schema.name,
    schema: {
      name: schema.name,
      description: schema.description,
      parameters: schema.parameters,
    },
  }))
}

function neutralSnapshot(runtimeSnapshot, globalSnapshot, schemas, fixed, agent) {
  return {
    profile: 'study-native-runtime',
    agent,
    // `debugSnapshot(scope).registered` is intentionally layer-local. The A/B
    // fixture has no scoped registrations, so the fixed global snapshot is
    // the honest shared registration baseline for both variants.
    registered: globalSnapshot.registered.map(name => ({ name })),
    visible: wireSchemas(schemas),
    execution: [],
    fixed,
    runtime: {
      scope: runtimeSnapshot.scope,
      presentationMode: runtimeSnapshot.presentationMode,
      known: runtimeSnapshot.known,
      hiddenByRestriction: runtimeSnapshot.hiddenByRestriction,
      visible: runtimeSnapshot.visible,
      visibleSchemaUtf8Bytes: runtimeSnapshot.visibleSchemaUtf8Bytes,
    },
  }
}

function bytes(value) {
  return Buffer.byteLength(value, 'utf8')
}

function summaryAssembly(assembly) {
  const prompt = renderPrompt(assembly)
  return {
    sectionCount: assembly.sections.length,
    contextCount: assembly.contexts.length,
    toolCount: assembly.tools.length,
    toolNames: assembly.tools.map(tool => tool.name),
    promptUtf8Bytes: bytes(prompt),
    toolWireUtf8Bytes: bytes(JSON.stringify(assembly.tools)),
  }
}

function readClock(clock) {
  const value = clock()
  if (typeof value !== 'bigint') throw new TypeError('clock 必须返回 bigint')
  return value
}

function measureSync(action, iterations, warmup, clock) {
  for (let index = 0; index < warmup; index += 1) action()
  const started = readClock(clock)
  for (let index = 0; index < iterations; index += 1) action()
  const elapsedNanoseconds = readClock(clock) - started
  if (elapsedNanoseconds < 0n) throw new Error('clock 返回了倒退的时间')
  return timing(elapsedNanoseconds, iterations, warmup)
}

async function measureAsync(action, iterations, warmup, clock) {
  for (let index = 0; index < warmup; index += 1) await action()
  const started = readClock(clock)
  for (let index = 0; index < iterations; index += 1) await action()
  const elapsedNanoseconds = readClock(clock) - started
  if (elapsedNanoseconds < 0n) throw new Error('clock 返回了倒退的时间')
  return timing(elapsedNanoseconds, iterations, warmup)
}

function timing(elapsedNanoseconds, iterations, warmup) {
  const totalNanoseconds = Number(elapsedNanoseconds)
  return {
    iterations,
    warmup,
    totalNanoseconds,
    totalMilliseconds: totalNanoseconds / 1_000_000,
    nanosecondsPerIteration: totalNanoseconds / iterations,
  }
}

function positiveInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 1) throw new RangeError(`${field} 必须是大于 0 的安全整数`)
  return value
}

function nonNegativeInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(`${field} 必须是非负安全整数`)
  return value
}

/**
 * Execute the local runtime experiment.
 *
 * @param {{iterations?: number, warmup?: number, clock?: () => bigint}} [options]
 * @returns {Promise<Record<string, unknown>>} structured report
 */
export async function runRuntimeAbBenchmark(options = {}) {
  const iterations = positiveInteger(options.iterations ?? DEFAULT_ITERATIONS, 'iterations')
  const warmup = nonNegativeInteger(options.warmup ?? DEFAULT_WARMUP, 'warmup')
  const clock = options.clock ?? (() => process.hrtime.bigint())
  if (typeof clock !== 'function') throw new TypeError('clock 必须是函数')

  const experiment = await mountExperiment()
  const { ctx, tools, systemPrompt, agent, scope } = experiment
  try {
    const globalSnapshot = tools.debugSnapshot()
    const globalSchemas = tools.schemas()
    const fixed = {
      mode: globalSnapshot.presentationMode,
      registeredNames: globalSnapshot.registered,
      allowedNames: STUDY_ALLOWED_TOOLS,
      providerCalls: 0,
      modelCalls: 0,
    }

    const assemblyA = await systemPrompt.assemble()
    const aSnapshot = neutralSnapshot(globalSnapshot, globalSnapshot, globalSchemas, fixed, 'study-agent')

    const disposeRestriction = scope.ctx.tools.restrict({ allow: STUDY_ALLOWED_TOOLS })
    try {
      const scopedSnapshot = tools.debugSnapshot(agent)
      const scopedSchemas = tools.schemas(agent)
      const assemblyB = await systemPrompt.assemble({ scope: agent })
      const bSnapshot = neutralSnapshot(scopedSnapshot, globalSnapshot, scopedSchemas, fixed, 'study-agent')
      const comparison = compareSnapshots(aSnapshot, bSnapshot)
      if (!comparison.valid) throw new Error(`真实 ToolRuntime A/B 前置条件失败：${comparison.errors.join('；')}`)

      const operations = {
        debugSnapshot: {
          A: measureSync(() => { tools.debugSnapshot() }, iterations, warmup, clock),
          B: measureSync(() => { tools.debugSnapshot(agent) }, iterations, warmup, clock),
        },
        schemas: {
          A: measureSync(() => { tools.schemas() }, iterations, warmup, clock),
          B: measureSync(() => { tools.schemas(agent) }, iterations, warmup, clock),
        },
        systemPromptAssembly: {
          A: await measureAsync(() => systemPrompt.assemble(), iterations, warmup, clock),
          B: await measureAsync(() => systemPrompt.assemble({ scope: agent }), iterations, warmup, clock),
        },
      }

      return {
        benchmark: 'tool-runtime-assembly-ab',
        config: { iterations, warmup },
        environment: { node: process.version, platform: process.platform, arch: process.arch },
        variants: {
          A: {
            runtime: aSnapshot.runtime,
            visibleToolCount: aSnapshot.visible.length,
            visibleToolNames: aSnapshot.visible.map(tool => tool.name),
            schemaUtf8Bytes: aSnapshot.runtime.visibleSchemaUtf8Bytes,
            assembly: summaryAssembly(assemblyA),
          },
          B: {
            runtime: bSnapshot.runtime,
            visibleToolCount: bSnapshot.visible.length,
            visibleToolNames: bSnapshot.visible.map(tool => tool.name),
            schemaUtf8Bytes: bSnapshot.runtime.visibleSchemaUtf8Bytes,
            assembly: summaryAssembly(assemblyB),
          },
        },
        operations,
        comparison,
        evidence: {
          providerCalls: 0,
          modelCalls: 0,
          dshProcessStarted: false,
          statement: '这是真实本地 ToolRuntime、schemas() 和 SystemPrompt.assemble() 的准备阶段观测。',
          limitations: [
            'A/B 只改变 agent 作用域的公开 restrict allow 集合，没有证明某个生产 Profile 的默认工具数量。',
            '计时会受 Node.js、操作系统、CPU、JIT 和垃圾回收影响；它不是性能门禁。',
            'schema UTF-8 字节数不是 provider tokenizer 的 token 数；本实验没有首 token、网络、缓存或任务质量数据。',
            '本实验没有执行工具、安装 Bundle、加载真实 Profile、调用 provider 或启动模型。',
          ],
        },
      }
    } finally {
      await disposeRestriction()
    }
  } finally {
    await scope.dispose()
    if (typeof ctx.dispose === 'function') await ctx.dispose()
  }
}

export function parseCliArgs(args) {
  const options = {}
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    // `pnpm run script -- --flag` forwards the separator to the child on
    // some pnpm/Node combinations. It is a transport marker, not an option
    // belonging to this benchmark, so accepting it keeps the documented
    // command copyable without weakening validation for real arguments.
    if (argument === '--') continue
    if (argument === '--help' || argument === '-h') return { help: true }
    if (argument === '--iterations' || argument === '--warmup') {
      const value = args[index + 1]
      if (value === undefined) throw new Error(`${argument} 缺少数值`)
      options[argument.slice(2)] = Number(value)
      index += 1
    } else if (argument.startsWith('--iterations=') || argument.startsWith('--warmup=')) {
      const separator = argument.indexOf('=')
      options[argument.slice(2, separator)] = Number(argument.slice(separator + 1))
    } else {
      throw new Error(`未知参数：${argument}`)
    }
  }
  return { options }
}

function printUsage() {
  console.error('用法：node study-tools/benchmark-tool-runtime-ab.mjs [--iterations N] [--warmup N]')
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try {
    const parsed = parseCliArgs(process.argv.slice(2))
    if (parsed.help) printUsage()
    else console.log(JSON.stringify(await runRuntimeAbBenchmark(parsed.options), null, 2))
  } catch (error) {
    printUsage()
    console.error(`真实 ToolRuntime A/B 失败：${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 2
  }
}
