<script setup lang="ts">
/**
 * Host for one lesson widget, implementing the project's widget runtime
 * contract (.agents/skills/dsh-source-grounded-course/references/widget-runtime-contract.md).
 *
 * A widget is a complete HTML document reached by `url` and framed here. Framing
 * rather than inlining is what lets a widget keep its own Content-Security-Policy:
 * the lab pages declare `connect-src 'none'`, and that header is what makes their
 * offline claim checkable. A component that re-implemented the widget inside this
 * Vue app would inherit the site's policy instead and lose that guarantee.
 *
 * Trust model for the sandbox: `url` widgets are first-party files in this
 * repository, reviewed like any other source, so `allow-scripts allow-same-origin`
 * is deliberate — it still withholds top-level navigation, form submission,
 * popups, pointer lock and downloads, while leaving the framed document's own
 * `'self'` policy resolvable. Generated or third-party `srcDoc` content must not
 * use this pair, because a same-origin frame can reach `parent.document` and drop
 * its own restrictions; such content belongs in an opaque-origin frame with a
 * policy written for that origin.
 */

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

interface Props {
  /** Stable widget id; scopes reported errors so stale ones can be dropped. */
  id: string
  /** Site-absolute path to the widget document. */
  url: string
  /** Accessible frame name, read by screen readers before the frame content. */
  title: string
  /** Rendered height in CSS pixels; the widget itself stays responsive. */
  height?: number
  /** Where the same information exists as text, for the fallback link. */
  fallbackHref?: string
}

const props = withDefaults(defineProps<Props>(), { height: 620, fallbackHref: '' })

interface WidgetError {
  key: string
  message: string
  count: number
}

const frame = ref<HTMLIFrameElement | null>(null)
const loaded = ref(false)
const failed = ref(false)
const errors = ref<WidgetError[]>([])
const expanded = ref(false)

/** Keeps one bounded, de-duplicated list so a looping widget cannot flood the page. */
const MAX_ERRORS = 6

function recordError(message: string) {
  const key = props.id + '::' + message.slice(0, 160)
  const existing = errors.value.find(entry => entry.key === key)
  if (existing !== undefined) {
    existing.count += 1
    return
  }
  if (errors.value.length >= MAX_ERRORS) return
  errors.value.push({ key, message: message.slice(0, 300), count: 1 })
}

/**
 * Messages arriving from the framed widget.
 *
 * Only messages whose source is this component's own frame are read, and only
 * the documented `type` field is honoured; an undocumented `action`/`payload`
 * variant is ignored rather than guessed at.
 */
function onMessage(event: MessageEvent) {
  if (frame.value === null || event.source !== frame.value.contentWindow) return
  const data = event.data
  if (typeof data !== 'object' || data === null) return
  const type = (data as { type?: unknown }).type
  if (type !== 'WIDGET_ERROR') return
  const message = (data as { message?: unknown }).message
  recordError(typeof message === 'string' ? message : '组件报告了一个没有文本的错误。')
}

function onLoad() {
  loaded.value = true
  // A framed document that answers but renders nothing is a failure the reader
  // should see, so check for a body rather than trusting the load event alone.
  try {
    const body = frame.value?.contentDocument?.body
    if (body !== null && body !== undefined && body.childElementCount === 0) {
      failed.value = true
      recordError('组件文档已加载，但没有渲染任何内容。')
    }
  } catch {
    // A cross-origin frame cannot be inspected; that is not an error here.
  }
}

function onError() {
  failed.value = true
  recordError('组件文档无法加载；请使用下面的文字替代。')
}

/** Reloads the framed document, which resets its state to the authored default. */
function reset() {
  errors.value = []
  failed.value = false
  loaded.value = false
  const element = frame.value
  if (element === null) return
  // Reassigning the resolved absolute src reloads the document; props.url is
  // base-relative and would not resolve here.
  element.src = element.src
}

/**
 * The widget lives in `public/`, so it is not a VitePress route and VitePress does
 * not rewrite a site-absolute path to it. Under a base path — GitHub Pages serves
 * this site from /deepseek-harness-study/ — a bare `/foo.html` resolves to the
 * domain root and 404s, so the base has to be applied here.
 */
const frameSrc = computed(() => withBase(props.url))

const frameHeight = computed(() => String(props.height) + 'px')

onMounted(() => window.addEventListener('message', onMessage))
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <figure class="lesson-widget" :data-widget-id="id">
    <figcaption class="lesson-widget__bar">
      <span class="lesson-widget__label">互动组件</span>
      <span class="lesson-widget__title">{{ title }}</span>
      <span class="lesson-widget__actions">
        <button type="button" class="lesson-widget__button" @click="reset">重置组件</button>
        <a class="lesson-widget__button" :href="frameSrc" target="_blank" rel="noreferrer">单独打开</a>
      </span>
    </figcaption>

    <div class="lesson-widget__stage" :style="{ height: frameHeight }">
      <iframe
        ref="frame"
        class="lesson-widget__frame"
        :src="frameSrc"
        :title="title"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        referrerpolicy="no-referrer"
        @load="onLoad"
        @error="onError"
      />
      <p v-if="!loaded && !failed" class="lesson-widget__status">正在载入互动组件……</p>
    </div>

    <p v-if="failed" class="lesson-widget__failure">
      这个组件在当前浏览器里没有运行起来。本页的结论不依赖它渲染成功——同一组数字在正文和表格里逐条给出。
      <a v-if="fallbackHref" :href="fallbackHref">打开文字版</a>
    </p>

    <ul v-if="errors.length > 0" class="lesson-widget__errors" aria-label="组件报告的错误">
      <li v-for="entry in errors" :key="entry.key">
        {{ entry.message }}<template v-if="entry.count > 1"> ×{{ entry.count }}</template>
      </li>
    </ul>

    <details class="lesson-widget__fallback" :open="expanded" @toggle="expanded = !expanded">
      <summary>不看组件也能读的说明</summary>
      <slot>
        <p>本页正文已经写出这个组件展示的每一个数字及其来源。</p>
      </slot>
    </details>
  </figure>
</template>
