/**
 * Smallest study-only third-party DSH plugin: observe final tool results.
 * It deliberately uses only the public `tools/result` event and never reads
 * a registry, loader cache, process state, tool arguments, or image blocks.
 */

import z from '@deepseek-ai/schemastery'

export const name = 'dsh-study-minimal-observer-plugin'
export const inject = ['tools']

/**
 * Deployment-tunable limits for the study observer.
 *
 * @typedef {Object} Config
 * @property {number} [maxPreviewBlocks] Maximum text blocks in one preview.
 * @property {number} [maxPreviewCharacters] Maximum characters per text block.
 */

/** Loader-facing schema; defaults belong to the deployment contract. */
export const Config = z.object({
  maxPreviewBlocks: z.number().min(1).step(1).default(3),
  maxPreviewCharacters: z.number().min(1).step(1).default(160),
})

/** Defaults resolved from the same schema used by a real Bundle loader. */
export const DEFAULT_CONFIG = Object.freeze(Config({}))

const CONFIG_KEYS = new Set(Object.keys(DEFAULT_CONFIG))

/**
 * Validate and detach the deployment configuration.
 *
 * The real DSH loader validates a plugin's exported Config schema before calling
 * apply. This dependency-free example keeps the same ownership rule locally so
 * its direct unit tests do not require a loader or a schema package.
 *
 * @param {Config} [config] Values supplied by the Bundle/Profile layer.
 * @returns {{maxPreviewBlocks: number, maxPreviewCharacters: number}} Validated limits.
 */
export function resolveConfig(config = {}) {
  if (config === null || typeof config !== 'object' || Array.isArray(config)) {
    throw new TypeError('study observer config must be an object')
  }

  for (const key of Object.keys(config)) {
    if (!CONFIG_KEYS.has(key)) {
      throw new TypeError(`study observer config has unknown key: ${key}`)
    }
  }

  for (const [fieldName, value] of Object.entries(config)) {
    if (!Number.isSafeInteger(value) || value < 1) {
      throw new TypeError(`${fieldName} must be a positive safe integer`)
    }
  }

  const normalized = Config(config)
  const maxPreviewBlocks = normalized.maxPreviewBlocks
  const maxPreviewCharacters = normalized.maxPreviewCharacters

  return Object.freeze({ maxPreviewBlocks, maxPreviewCharacters })
}

/**
 * Convert model-visible text blocks into a bounded, single-line log preview.
 *
 * @param {unknown} content A tool result's content blocks.
 * @param {Config} [config] Preview limits supplied by the deployment.
 * @returns {string[]} Safe text-only preview blocks.
 */
export function previewTextBlocks(content, config = DEFAULT_CONFIG) {
  if (!Array.isArray(content)) return []
  const resolved = resolveConfig(config)

  const preview = []
  for (const block of content) {
    if (block?.type !== 'text' || typeof block.text !== 'string') continue
    preview.push(block.text.replace(/[\r\n]+/g, ' ').slice(0, resolved.maxPreviewCharacters))
    if (preview.length === resolved.maxPreviewBlocks) break
  }
  return preview
}

/**
 * Register a final-result observer on the host-provided Cordis context.
 * Cordis owns the listener's lifetime through the mounting plugin Fiber.
 *
 * @param {{ on(event: 'tools/result', listener: (exec: { name?: unknown }, result: { content?: unknown }) => void): unknown }} ctx Public event context.
 * @param {Config} [config] Validated deployment configuration in a real loader.
 * @param {{ log?: (line: string) => void }} [options] Test-only logger override.
 * @returns {void}
 */
export function apply(ctx, config = {}, options = {}) {
  if (ctx === null || typeof ctx !== 'object' || typeof ctx.on !== 'function') {
    throw new TypeError('dsh-study-minimal-observer-plugin requires a public ctx.on() event API')
  }
  const resolved = resolveConfig(config)
  const log = typeof options.log === 'function' ? options.log : console.info

  ctx.on('tools/result', (exec, result) => {
    const toolName = typeof exec?.name === 'string' ? exec.name : 'unknown-tool'
    log(`[study-observer] ${toolName} -> ${JSON.stringify(previewTextBlocks(result?.content, resolved))}`)
  })
}
