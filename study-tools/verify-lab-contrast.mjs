/**
 * Contrast gate for the study lab stylesheets.
 *
 * The lab palette separates two roles that the earlier passes kept confusing. A
 * colour validated at 3:1 against the surface reads as a chart mark and fails as
 * small text, which needs 4.5:1, so each semantic hue carries a mark step and an
 * `-ink` text step. That split was applied by hand and verified by a one-off
 * sweep of rendered text nodes, which cannot see state-dependent elements: a
 * `[data-tone="notice"]` message and a `tr[data-state="skipped"]` cell only exist
 * after an interaction, and both used a mark colour as text at 2.6:1.
 *
 * This gate checks the stylesheets instead of a rendered snapshot, so it covers
 * every state and needs no browser. It asserts three things:
 *
 *   1. every `-ink` step clears 4.5:1 on the neutral surfaces and on its own
 *      tinted panel — the backdrops the token comments already claim;
 *   2. every mark step clears 3:1 on the neutral surfaces;
 *   3. no `color:` declaration names a mark token, which is the rule that the
 *      `--warning` uses broke.
 *
 * Rule 3 is what makes the gate cheap. Tracing real DOM nesting would need a
 * browser; forbidding the mark tokens in text position enforces the same
 * discipline from the source.
 */

import { readFileSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

/** Stylesheets that declare or consume the lab palette. */
const STYLE_DIR = new URL('../website/public/', import.meta.url)

/** Semantic hues that exist as a mark step plus an `-ink` text step. */
export const SEMANTIC_HUES = Object.freeze(['signal', 'allow', 'deny', 'warning'])

/** Neutral backdrops text can sit on, directly or through a panel. */
const NEUTRAL_SURFACES = Object.freeze(['--page', '--surface', '--surface-strong', '--surface-soft'])

/**
 * Surfaces a chart draws on.
 *
 * `.card` fills with `--surface` and the chart containers inside it add no fill,
 * so a mark is measured against the resolved card colour. Marks never sit on
 * `--page` or on `--surface-soft`: the one `--surface-soft` fill is a small pill
 * carrying `--muted` text, and the only `--signal` fill is a 1px decorative rule
 * under the eyebrow, which carries no information.
 */
const CHART_SURFACES = Object.freeze(['--surface', '--surface-strong'])

/** WCAG 2.x floors: small text, and non-text graphical objects. */
export const TEXT_FLOOR = 4.5
export const MARK_FLOOR = 3

/** sRGB hex to linear-light channels. */
function toLinear(hex) {
  const body = hex.replace('#', '')
  const full = body.length === 3 ? [...body].map(c => c + c).join('') : body
  return [0, 2, 4].map(offset => {
    const channel = Number.parseInt(full.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
}

/** Relative luminance per WCAG 2.x. */
function luminance(hex) {
  const [r, g, b] = toLinear(hex)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Contrast ratio between two opaque colours.
 *
 * @param {string} a - Hex colour.
 * @param {string} b - Hex colour.
 * @returns {number} Ratio between 1 and 21.
 */
export function contrastRatio(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

/** Encode linear-light channels back to a hex string. */
function toHex(linearChannels) {
  const encoded = linearChannels.map(channel => {
    const srgb = channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055
    return Math.round(Math.min(1, Math.max(0, srgb)) * 255)
  })
  return '#' + encoded.map(value => value.toString(16).padStart(2, '0')).join('')
}

/**
 * Flatten a translucent colour onto an opaque backdrop.
 *
 * The card surfaces are declared as `rgba(...)`, so their measured contrast
 * depends on the page colour behind them.
 *
 * @param {{ hex: string, alpha: number }} layer - Foreground colour and its alpha.
 * @param {string} backdrop - Opaque hex colour behind the layer.
 * @returns {string} The resolved opaque hex colour.
 */
export function flatten(layer, backdrop) {
  const front = toLinear(layer.hex)
  const back = toLinear(backdrop)
  return toHex(front.map((channel, index) => channel * layer.alpha + back[index] * (1 - layer.alpha)))
}

/** Parse `#rgb`, `#rrggbb`, or `rgba(r, g, b, a)` into a hex/alpha pair. */
function parseColour(raw) {
  const value = raw.trim()
  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hexMatch) return { hex: value, alpha: 1 }
  const rgbaMatch = value.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+))?\s*\)$/i)
  if (!rgbaMatch) return null
  const channels = rgbaMatch.slice(1, 4).map(part => Math.round(Number(part)))
  if (channels.some(part => !Number.isFinite(part) || part < 0 || part > 255)) return null
  return {
    hex: '#' + channels.map(part => part.toString(16).padStart(2, '0')).join(''),
    alpha: rgbaMatch[4] === undefined ? 1 : Number(rgbaMatch[4]),
  }
}

/**
 * Read the palette a stylesheet declares, split by colour scheme.
 *
 * @param {string} source - Stylesheet text.
 * @returns {{ light: Map<string, {hex: string, alpha: number}>, dark: Map<string, {hex: string, alpha: number}> }}
 */
export function readPalette(source) {
  const darkAt = source.search(/@media\s*\(\s*prefers-color-scheme\s*:\s*dark/)
  const sections = {
    light: darkAt === -1 ? source : source.slice(0, darkAt),
    dark: darkAt === -1 ? '' : source.slice(darkAt),
  }
  const result = { light: new Map(), dark: new Map() }
  for (const [scheme, text] of Object.entries(sections)) {
    for (const block of text.match(/:root\s*\{[^}]*\}/g) ?? []) {
      for (const declaration of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
        const colour = parseColour(declaration[2])
        if (colour) result[scheme].set(declaration[1], colour)
      }
    }
  }
  // A dark override only replaces the tokens it names; the rest stay as declared.
  for (const [name, colour] of result.light) {
    if (!result.dark.has(name)) result.dark.set(name, colour)
  }
  return result
}

/**
 * Find `color:` declarations that name a mark token instead of its `-ink` step.
 *
 * WCAG allows 3:1 for large text, where a mark colour is already legible. Those
 * cases opt out with a `large-text:` comment on the declaration or the line above
 * it, which keeps the exception and its reason in the stylesheet rather than in a
 * list inside this gate.
 *
 * @param {string} source - Stylesheet text.
 * @returns {{ line: number, token: string, text: string }[]} One entry per offence.
 */
export function findMarkTokensUsedAsText(source) {
  const offences = []
  const lines = source.split('\n')
  for (const [index, line] of lines.entries()) {
    // `-webkit-text-fill-color` and `border-color` are not text colour.
    const match = line.match(/(?<![-\w])color\s*:\s*var\(\s*(--(?:signal|allow|deny|warning))\s*\)/)
    if (!match) continue
    const exempt = /large-text:/.test(line) || /large-text:/.test(lines[index - 1] ?? '')
    if (exempt) continue
    offences.push({ line: index + 1, token: match[1], text: line.trim() })
  }
  return offences
}

/** Every stylesheet under the published lab directory. */
function labStylesheets() {
  const dir = new URL('.', STYLE_DIR)
  return readdirSync(dir)
    .filter(name => name.endsWith('.css'))
    .sort()
    .map(name => ({ name, source: readFileSync(join(dir.pathname.replace(/^\//, ''), name), 'utf8') }))
}

/**
 * Collect the tokens some stylesheet actually fills a background with.
 *
 * Deriving the backdrop set from real declarations keeps the gate from inventing
 * pairs. `--signal-soft`, for one, is declared in four stylesheets and never
 * used as a fill, so no text is ever measured against it.
 *
 * @param {{name: string, source: string}[]} sheets - Stylesheets to scan.
 * @returns {Set<string>} Token names used as a background anywhere.
 */
export function collectBackgroundTokens(sheets) {
  const used = new Set()
  for (const { source } of sheets) {
    for (const match of source.matchAll(/background(?:-color)?\s*:\s*var\(\s*(--[a-z0-9-]+)/gi)) {
      used.add(match[1])
    }
  }
  return used
}

/**
 * Check one palette against both floors.
 *
 * @param {Map<string, {hex: string, alpha: number}>} palette - Tokens for one scheme.
 * @param {string} scheme - `light` or `dark`, used in failure messages.
 * @param {Set<string>} backgroundTokens - Tokens some stylesheet fills with.
 * @returns {{ pair: string, ratio: number, floor: number, ok: boolean }[]} One row per checked pair.
 */
export function checkPalette(palette, scheme, backgroundTokens) {
  const page = palette.get('--page')
  if (!page) return []
  const rows = []

  /** Resolve a possibly translucent surface onto the page colour. */
  const surfaceHex = name => {
    const token = palette.get(name)
    if (!token) return null
    return token.alpha === 1 ? token.hex : flatten(token, page.hex)
  }

  const named = names => names.map(name => [name, surfaceHex(name)]).filter(([, hex]) => hex)
  const neutrals = named(NEUTRAL_SURFACES)
  const chartSurfaces = named(CHART_SURFACES)

  const add = (pair, fg, bg, floor) => {
    const ratio = contrastRatio(fg, bg)
    rows.push({ pair, ratio, floor, ok: ratio >= floor })
  }

  for (const hue of SEMANTIC_HUES) {
    const ink = palette.get(`--${hue}-ink`)
    if (ink) {
      for (const [name, hex] of neutrals) add(`${scheme}  --${hue}-ink on ${name}`, ink.hex, hex, TEXT_FLOOR)
      // The tinted panel of the same hue counts only when something fills with it.
      const panel = `--${hue}-soft`
      const panelHex = surfaceHex(panel)
      if (panelHex && backgroundTokens.has(panel)) {
        add(`${scheme}  --${hue}-ink on ${panel}`, ink.hex, panelHex, TEXT_FLOOR)
      }
    }

    const mark = palette.get(`--${hue}`)
    if (mark) {
      for (const [name, hex] of chartSurfaces) {
        add(`${scheme}  --${hue} (mark) on ${name}`, mark.hex, hex, MARK_FLOOR)
      }
    }
  }

  // Body and secondary text carry the same floor as the ink steps.
  for (const name of ['--ink', '--muted', '--brand']) {
    const token = palette.get(name)
    if (!token) continue
    for (const [backdropName, hex] of neutrals) {
      add(`${scheme}  ${name} on ${backdropName}`, token.hex, hex, TEXT_FLOOR)
    }
  }

  return rows
}

/**
 * Run every check over the published lab stylesheets.
 *
 * @returns {{ rows: object[], offences: object[], failures: object[] }} Collected results.
 */
export function audit() {
  const sheets = labStylesheets()
  const backgroundTokens = collectBackgroundTokens(sheets)
  const rows = []
  const offences = []

  for (const { name, source } of sheets) {
    for (const offence of findMarkTokensUsedAsText(source)) {
      offences.push({ file: name, ...offence })
    }
    const palette = readPalette(source)
    if (palette.light.size === 0) continue
    rows.push(
      ...checkPalette(palette.light, 'light', backgroundTokens).map(row => ({ file: name, ...row })),
      ...checkPalette(palette.dark, 'dark', backgroundTokens).map(row => ({ file: name, ...row })),
    )
  }

  return { rows, offences, failures: rows.filter(row => !row.ok) }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll('\\', '/').split('/').pop())) {
  const { rows, offences, failures } = audit()
  console.log(`检查了 ${rows.length} 组前景/背景配色。`)

  if (offences.length > 0) {
    console.log(`\n以下 ${offences.length} 处把 marks 颜色当正文色用，应改成同色相的 -ink 步进：`)
    for (const offence of offences) {
      console.log(`  ${offence.file}:${offence.line}  ${offence.token}  ${offence.text}`)
    }
  }

  if (failures.length > 0) {
    console.log(`\n以下 ${failures.length} 组低于对比度下限：`)
    for (const row of failures) {
      console.log(`  ${row.pair.padEnd(46)} ${row.ratio.toFixed(2)} < ${row.floor}  (${row.file})`)
    }
  }

  if (offences.length === 0 && failures.length === 0) {
    console.log('全部通过：正文 4.5:1，marks 3:1，且没有把 marks 颜色用在正文上。')
  } else {
    process.exitCode = 1
  }
}
