/** Service name used by the workbench's loader and assertions. */
export const SERVICE_NAME = 'studyMinimalPlugin'

/**
 * The two Cordis methods used by this isolated build target.
 *
 * The runner supplies the real Cordis `Context`; keeping this small structural
 * type here prevents the plugin-only `tsc` build from compiling the whole
 * vendored framework just to erase a type-only import.
 */
interface PluginContext {
  provide(name: string, value: MinimalPluginService): () => void
  effect(execute: () => () => void, label?: string): () => void
}

/** Configuration accepted by the minimal plugin. */
export interface MinimalPluginConfig {
  /** Interval between observable heartbeat increments. */
  intervalMs?: number
}

/** Lifecycle phase exposed by the study service. */
export type MinimalPluginPhase = 'active' | 'disposed'

/** Snapshot returned by the service for lifecycle assertions. */
export interface MinimalPluginSnapshot {
  phase: MinimalPluginPhase
  tickCount: number
  startedAt: number
  disposedAt?: number
}

/** Small service that exposes observable state without calling a model or network. */
export interface MinimalPluginService {
  readonly name: typeof SERVICE_NAME
  snapshot(): MinimalPluginSnapshot
}

function resolveInterval(config: MinimalPluginConfig): number {
  const intervalMs = config.intervalMs ?? 10
  if (!Number.isInteger(intervalMs) || intervalMs < 1 || intervalMs > 1_000) {
    throw new TypeError('minimal plugin intervalMs must be an integer between 1 and 1000')
  }
  return intervalMs
}

/**
 * Register a service and a disposable timer on the current Cordis fiber.
 *
 * The service is intentionally tiny: the runner can observe a real effect
 * while the plugin remains independent of the model, filesystem, and network.
 * Cordis owns both effects, so `ctx.loader.remove()` unregisters the service
 * and runs the timer cleanup before the loader reports removal.
 *
 * @param ctx - Context supplied by Cordis when the plugin fiber starts.
 * @param config - Optional heartbeat interval used by the offline exercise.
 */
export default function minimalPlugin(ctx: PluginContext, config: MinimalPluginConfig = {}): void {
  const intervalMs = resolveInterval(config)
  const state: MinimalPluginSnapshot = {
    phase: 'active',
    tickCount: 0,
    startedAt: Date.now(),
  }

  const service: MinimalPluginService = {
    name: SERVICE_NAME,
    snapshot: () => ({ ...state }),
  }

  ctx.provide(SERVICE_NAME, service)
  ctx.effect(() => {
    const timer = setInterval(() => {
      if (state.phase === 'active') state.tickCount += 1
    }, intervalMs)

    return () => {
      clearInterval(timer)
      state.phase = 'disposed'
      state.disposedAt = Date.now()
    }
  }, 'study-minimal-plugin.heartbeat')
}
