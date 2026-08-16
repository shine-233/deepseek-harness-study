# Agent Note: Add a tool-budget and plugin-responsibility decision card

Status: implemented

English | [中文](2026-08-16-study-tool-budget-and-plugin-responsibility.zh.md)

## Problem

The study route already explained tool visibility, public extension points, Hook bridges, patched forks, and runtime injectors, but a first-time reader still had to synthesize those pages before deciding what kind of project they were looking at. The root README and Pages front door needed one short, direct decision surface.

## Decision

Add `study/27-工具预算与插件责任决策卡.md` as a Chinese beginner-facing synthesis. It defines registered, model-visible, and execution-allowed tools; gives a six-layer ecosystem map; separates ordinary plugin authors from host or distribution maintainers; provides a five-question classification card and a ten-minute community audit card; and ranks future work by whether it needs only the web, the study repository, a host maintainer, a provider, or repository administration. Link this page from the repository README, Pages home, `START-HERE.md`, the 15-minute task sheet, the usage manual, and the related tool/plugin lessons.

The page uses direct definitions rather than metaphors. It keeps the evidence boundary explicit: offline snapshots are not provider token counts, static source is not runtime proof, and a project with a Bundle shell may still contain a separate injection layer.

## Alternatives considered

**Keep the existing pages separate.** The individual pages were accurate, but the reader had to assemble the classification and responsibility boundary themselves; a single decision card reduces that synthesis cost without replacing the detailed lessons.

**Call every project that exports `apply(ctx)` a plugin.** This would erase the difference between public Cordis integration, Bundle composition, patched forks, and process or OS-level injection, so the card classifies the implementation layer and ownership separately.

**Use a metaphor to make the topic easier.** Repository prose rules require direct technical terms and no metaphors. The card therefore uses a three-layer literal mapping and concrete evidence fields instead of an analogy that could be mistaken for an implementation claim.

## Consequences

The GitHub repository and Pages home now have a single route for readers concerned about long tool lists or plugin identity. Tool, plugin, Hook, and community-audit routes all pass through the same classification point before reaching detailed material. The new card improves navigation and learning clarity; it does not create a runtime visibility API, run a real model A/B test, or certify any third-party project.
