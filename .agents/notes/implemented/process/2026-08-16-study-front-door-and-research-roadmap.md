# Agent Note: Add a direct study front door and evidence-ranked roadmap

Status: implemented

English | [中文](2026-08-16-study-front-door-and-research-roadmap.zh.md)

## Problem

The Pages site publishes the full Chinese study route and generated indexes, but a first-time reader can still mistake the complete catalog for the starting point. The remaining research work also needs a durable order that separates static documentation from host, provider, and runtime evidence.

## Decision

The study route publishes a 15-minute task sheet that takes a reader from the home page through two foundation lessons, one selected route, one fixed-source file, and a four-sentence learning record. A separate roadmap ranks host visibility observation and real tool-visibility A/B measurement ahead of manual index batches, community audits, example plugins, web UX, repository governance, dependency classification, and Actions maintenance. The Pages home, repository README, and START-HERE page link both entry points, and the Chinese site title identifies the site as a textbook.

## Alternatives considered

**Keep only the existing route table.** The table describes choices but does not give a reader who cannot choose an observable first output, so the task sheet is kept as a separate tutorial.

**Treat every remaining item as a flat TODO list.** A flat list hides the dependency between a host-exported visibility snapshot and a trustworthy A/B experiment, so the roadmap records prerequisites and acceptance evidence.

**Add a private observation hook to make the roadmap executable immediately.** That would turn a study repository into a runtime modification and would invite ordinary plugins to depend on private state; the roadmap keeps ownership with a host or explicitly labeled patched fork.

## Consequences

The web front door is more explicit while the 66 generated index pages remain available as a collapsed reference surface. A reader can finish the first exercise entirely in GitHub Pages, but the task sheet and roadmap explicitly preserve the boundary: web reading, document gates, host snapshots, provider measurements, and real DSH execution are different evidence classes. The new roadmap is a current prioritization, not proof that its P0 or P1 experiments have already run.
