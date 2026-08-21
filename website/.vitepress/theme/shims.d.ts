/**
 * Module shapes the host compiler face needs but cannot infer.
 *
 * Vite resolves `.vue` and `.css` imports when VitePress builds the site, so the
 * theme entry can import them directly. `tsc -b tsconfig.host.json` type-checks
 * the same file (tsconfig.host.json includes `website/.vitepress/**\/*.ts`) and has
 * no loader for either, so it needs the shape declared here rather than the theme
 * being dropped from the checked set.
 *
 * The declarations stay narrow on purpose: the component's own props are typed in
 * LessonWidget.vue and reach callers through the Vue compiler, so widening this to
 * a fully typed component would duplicate that contract in a second place.
 */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.css' {}
