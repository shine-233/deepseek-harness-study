# Agent Note: Pet plugin panel — the mascot runs on DSH-style plugins

Status: implemented

[中文](2026-08-25-pet-plugin-panel.zh.md) | English

## Problem

The mascot 阿溟 had two behaviors (CSS blink, quiz cheer) fixed at mount time — cute but inert. Meanwhile the course's central claim, "everything is a plugin: register → effect → unload means dispose" (lessons 02/11), was taught only in prose. External pet widgets (support-pet, agent-pet, lenny-pet) offer wandering, eye tracking, napping and dragging, but none turns the pet itself into a model of a plugin system.

## Decision

`study-pet-plugins.js` layers a real plugin runtime on top of the existing `#dsh-companion` element without touching `study-companion.js`. Five behavior plugins — 巡游 (wander), 眼神跟随 (eye tracking), 打盹 (nap after 45s idle with a zzZ bubble), 拖拽 (drag with localStorage persistence), 眨眼 (the companion's CSS loop, toggleable) — each mount real listeners/timers and return a real dispose function. A chip on the mascot opens a panel listing every plugin with its subscription and effect, a toggle that mounts/unmounts live (unmounting 巡游 visibly stops the walk and clears the transform), and a six-line event log recording poke / dsh-study-delight / mark-as-read events plus every mount and dispose — the Session-log idea in miniature. `createPetRuntime(factories, host)` keeps mount/unmount/disposeAll bookkeeping injectable, so `study-pet-plugins.test.mjs` (6 tests) asserts real dispose calls, double-mount idempotence, unknown-plugin rejection, and the log model without any DOM. The script is appended in `theme/index.ts`; pages without the companion exit silently.

## Alternatives considered

**Extending study-companion.js directly.** Rejected: it is another workstream's active file; layering beside it keeps both modules independently revertible, and the companion's quiz reactions keep working unchanged underneath.

**A Live2D or spritesheet-atlas pet (live2d-widget, codex-pets).** Rejected: heavy assets or third-party sprite contracts for a site whose mascot is a 22×21 character-grid SVG with a single-source palette; the teaching value is the plugin semantics, not fancier art.

**Faking dispose with CSS class toggles only.** Rejected for the four owned plugins: the teaching point is that unmounting really removes listeners and timers, so wander/eyetrack/nap/drag register and dispose genuine handlers; only 眨眼 is a documented visual toggle because its timer lives in the companion's CSS.

## Consequences

The mascot now wanders, follows the cursor with its eyes, naps when the reader idles, and can be dragged (position persisted); every behavior can be unmounted live while an event log narrates mounts, disposes and page events in dispose vocabulary. The panel states plainly that it is a teaching model of the plugin architecture. Verified on the built site: five toggles mount/unmount with correct aria state, unmounting 巡游 clears the transform, eye tracking moves the pupils, poke and delight events land in the log, mobile has zero horizontal overflow, and the six runtime-model tests pass; the full suite's remaining failures belong to another workstream's newest labs.
