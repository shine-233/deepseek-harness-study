# Widget runtime contract

Use one small contract for simulations, diagrams, code labs, games, 3D visualizations, and procedures. Adapt names to the host project, but do not let each widget invent incompatible lifecycle, action, or error rules.

## Minimal model

```ts
type WidgetType =
  | 'simulation'
  | 'diagram'
  | 'code'
  | 'game'
  | 'visualization3d'
  | 'procedure';

type WidgetAction =
  | { id: string; type: 'widget_highlight'; target: string; content?: string }
  | { id: string; type: 'widget_setState'; state: Record<string, unknown>; content?: string }
  | { id: string; type: 'widget_annotation'; target: string; content?: string }
  | { id: string; type: 'widget_reveal'; target: string; content?: string };

type LabResult<State, Observation> = {
  state: State;
  observation: Observation;
  oracle: { pass: boolean; checks: Array<{ id: string; pass: boolean; detail: string }> };
  canProve: string[];
  cannotProve: string[];
};

type LessonWidget = {
  id: string;
  type: WidgetType;
  html?: string;
  url?: string;
  config: Record<string, unknown>;
  actions: WidgetAction[];
  stateVersion: number;
};
```

Require at least one of `html` or `url`. Validate type/config/action fields before rendering.

## Generation order

1. Generate or author the widget HTML/config.
2. Parse the HTML and inventory real IDs, stable `data-*` selectors, named controls, and semantic classes.
3. Generate actions only from the inventory or the typed config.
4. Reject or downgrade actions whose selectors do not resolve.
5. Run the widget and action sequence in a browser.

Strip script/style/comment bodies before creating a selector inventory. Cap inventory size and attribute length. Do not let untrusted labels forge prompt sections.

## Message protocol

Normalize parent-to-iframe messages to:

```js
window.addEventListener('message', (event) => {
  const data = event.data || {};
  switch (data.type) {
    case 'SET_WIDGET_STATE':
      setState(data.state || {});
      renderState();
      break;
    case 'HIGHLIGHT_ELEMENT':
      highlight(resolveTarget(data.target), data.content);
      break;
    case 'ANNOTATE_ELEMENT':
      annotate(resolveTarget(data.target), data.content);
      break;
    case 'REVEAL_ELEMENT':
      reveal(resolveTarget(data.target));
      break;
  }
});
```

Do not mix `event.data.type` with an undocumented `event.data.action/payload` variant. Add an explicit adapter and contract tests if legacy content requires both.

## State and reset

Use one central state object and one `renderState()` path for:

- learner clicks;
- keyboard/touch actions;
- `SET_WIDGET_STATE`;
- reset;
- import/migration;
- deterministic seek/replay.

Test that reset restores controls, progress, feedback, risk/decision state, success gates, classes, annotations, highlights, and enabled/disabled state. Do not implement a visual-only reset.

Keep temporary iframe state, durable learner state, and course progress separate. Keep-alive preserves a document in memory; it does not survive eviction, browser restart, or schema change.

## Lab oracle

Implement model logic as a pure function when practical:

```ts
run(input, seed) -> { state, observation, oracle, canProve, cannotProve }
```

Test:

- fixed seeds;
- boundary inputs;
- a deliberately broken condition;
- reset and replay;
- theory/observed-value wording;
- tampered events that must fail the oracle.

## Iframe and error boundary

- For generated `srcDoc`, use a sandbox that allows only required capabilities.
- Never combine `allow-scripts` with `allow-same-origin` without a separately reviewed trust model.
- Capture early parse errors, resource failures, unhandled rejections, and `console.error`.
- Buffer early errors and replay them after the parent subscribes.
- Key errors by scene/widget ID, deduplicate them, cap stored entries, and clear stale errors after content changes.
- Treat `postMessage('*')` as a narrow transport, not permission to accept arbitrary messages; validate message shape and source where the architecture permits.

## Keep-alive

Use a stable host and placeholder rect only when state preservation across scene/mode switches is required. Make equal content reuse the live iframe. Reload only when content changes. Use ownership tokens to make stale unmount cleanup a no-op. Bound memory with LRU and never evict the active widget while visible.

## 3D requirements

State the meaning of X, Y, Z, color, size, line width, time, and animation speed. Mark any dimension that is only layout or attention guidance.

Provide:

- seek and deterministic frames;
- labeled controls and keyboard access;
- reduced-motion behavior;
- a 2D/table/text fallback;
- loading, zero-size, WebGL-failure, and CDN-failure states;
- reset to a known camera and model state;
- constructed-data and simplification labels.

Do not claim that a visually correct 3D scene proves production performance, numerical accuracy, or a real trace.

## Procedure gate

Default a procedure/real-world-operation widget to a diagram or read-only lesson. Enable it only when it has:

- a bounded task and required tools;
- ordered steps and stable selectors;
- at least one real judgment, not only Done buttons;
- observable state and feedback;
- success criteria gated by actual state;
- error/unsafe consequence handling;
- full reset;
- explicit permission and `canProve/cannotProve` boundaries.
