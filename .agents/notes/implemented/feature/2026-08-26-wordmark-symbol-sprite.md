# Agent Note: the wordmark ships as an external symbol sprite

Status: implemented

English | [中文](2026-08-26-wordmark-symbol-sprite.zh.md)

## Problem

`siteTitle` embedded the full 10 KB wordmark markup. VitePress serializes `themeConfig` into every built page's payload, so the same path data shipped roughly ten times per page — 859 copies and about 8 MB of duplication across the site — on top of the rendered navbar instance.

## Decision

`website/public/wordmark.svg` is now a `<symbol id="dsh-mark">` sprite, and `siteTitle` embeds a ~130-byte stub: `<svg class="dsh-wordmark" viewBox="0 0 143 23" aria-hidden="true"><use href="…/wordmark.svg#dsh-mark"/></svg>`. The external reference keeps `currentColor` working — the symbol's fills resolve against the using document, so dark and light themes still repaint the mark without any JavaScript.

## Alternatives considered

- **An `<img src>` to the sprite** — one line simpler, but it freezes the mark at whatever fills the file declares, breaking dark-mode repaint.
- **Keep the inline markup in `siteTitle`** — the status quo that caused the duplication (≈8 MB and 859 copies across the site).

## Consequences

Every page sheds roughly 20 KB of payload; the navbar renders identically and still needs no JS. The sprite is one extra cacheable request per origin visit. Anything that edits the wordmark must keep the `<symbol id="dsh-mark">` wrapper — `config.ts` references the id, and removing it blanks every navbar.

## Testing

Playwright acceptance (5 assertions): navbar svg renders at its designed box (137×22), the stub carries the `#dsh-mark` reference, dark mode repaints the mark (`rgb(60,60,67)` → `rgb(223,223,214)`), the sprite resolves with the expected symbol, and a lesson page's payload keeps exactly one wordmark instance. Build stays five-green.
