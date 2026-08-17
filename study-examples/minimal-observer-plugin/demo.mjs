import { apply } from './src/index.js'

// This driver is intentionally smaller than a DSH process. It supplies the
// one public event used by the example so a beginner can see the observer's
// output before learning about Profile/Loader composition.
const listeners = new Map()
const context = {
  on(event, listener) {
    listeners.set(event, listener)
  },
}

apply(context, { maxPreviewBlocks: 2, maxPreviewCharacters: 12 })
listeners.get('tools/result')?.(
  { name: 'study_greet' },
  {
    content: [
      { type: 'text', text: 'hello world' },
      { type: 'image', url: 'https://example.invalid/ignored.png' },
      { type: 'text', text: 'second block' },
    ],
  },
)
