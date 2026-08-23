/**
 * The lab pages are `lang="zh-CN"`, so their visible labels must read Chinese.
 *
 * These pages shipped with English scaffolding in every position a reader scans
 * first: 35 section kickers, 20 chart legends, 9 table headers, and `canProve` /
 * `cannotProve` as visible headings. Each was correct as a field name in the pure
 * model and wrong as a label, which is why the model keeps its English names and
 * only the rendered text changed.
 *
 * A label may stay English when it is a proper noun the course teaches (`Bundle`,
 * `Turn`, `npm`), a path or field name from the source (`src 行`), or a protocol
 * constant. Those are listed here so adding one is a deliberate edit.
 */

import { strict as assert } from 'node:assert'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)

/**
 * Terms allowed to appear as a label without Chinese.
 *
 * Proper nouns the course defines in its glossary, plus identifiers that name a
 * real directory, package field, or protocol value. Translating these would make
 * them impossible to search for in the source.
 */
const ALLOWED_ENGLISH = new Set([
  'Bundle',
  'Profile',
  'Turn',
  'Step',
  'Session',
  'Hook',
  'DSH',
  'npm',
  'src',
  'v1',
  'JSON',
  'oracle',
])

/** Selectors whose text a reader scans before any prose. */
const LABEL_PATTERNS = [
  { name: 'section kicker', pattern: /<p class="(?:section-label|eyebrow)"[^>]*>([^<]+)<\/p>/g },
  { name: 'chart legend', pattern: /<span class="schema-pill[^"]*">([^<]+)<\/span>/g },
  { name: 'table header', pattern: /<th scope="col">([^<]+)<\/th>/g },
  { name: 'metric label', pattern: /<dt>([^<]+)<\/dt>/g },
  // `<h3 data-icon="...">` is as visible as a bare `<h3>`; matching only the bare
  // form let two English headings through on the bridge page.
  { name: 'boundary heading', pattern: /<h3(?:\s[^>]*)?>([^<]+)<\/h3>/g },
  { name: 'block heading', pattern: /<h2(?:\s[^>]*)?>([^<]+)<\/h2>/g },
]

const hasChinese = text => /[一-鿿]/.test(text)

/** Strip the allowed proper nouns, then see whether anything is left to translate. */
function isUntranslated(label) {
  if (hasChinese(label)) return false
  let residue = label
  for (const term of ALLOWED_ENGLISH) residue = residue.replaceAll(term, '')
  // Separators, digits and punctuation are not words needing translation.
  return /[A-Za-z]/.test(residue)
}

function labPages() {
  return readdirSync(PUBLIC_DIR).filter(name => name.endsWith('.html')).sort()
}

test('every visible label on the lab pages reads Chinese', () => {
  const offenders = []
  for (const file of labPages()) {
    const source = readFileSync(new URL(file, PUBLIC_DIR), 'utf8')
    for (const { name, pattern } of LABEL_PATTERNS) {
      for (const match of source.matchAll(pattern)) {
        const label = match[1].trim()
        if (isUntranslated(label)) offenders.push(`${file} ${name}: ${label}`)
      }
    }
  }
  assert.deepEqual(offenders, [], 'a reader-facing label is English-only')
})

test('the model field names stay English', () => {
  // The headings above these lists now read Chinese; six test files and the pure
  // models still reference the fields, so renaming them would break the models.
  const models = readdirSync(PUBLIC_DIR).filter(name => name.endsWith('-model.js'))
  assert.ok(models.length > 0, 'the pure models must be present to check')
  for (const file of models) {
    const source = readFileSync(new URL(file, PUBLIC_DIR), 'utf8')
    if (!source.includes('canProve')) continue
    assert.match(source, /canProve/, `${file} must keep the canProve field`)
    assert.match(source, /cannotProve/, `${file} must keep the cannotProve field`)
  }
})

test('the ids the scripts bind to are not translated', () => {
  // Translating a label must never touch the element it labels. The seven model
  // labs fill their boundary lists from `canProve` / `cannotProve`; the bridge
  // states its own boundary in prose and uses different ids, so it is checked
  // for the ids it actually has rather than forced into the same list.
  const MODEL_LAB_IDS = ['can-prove-list', 'cannot-prove-list', 'oracle-list']
  const checked = []
  for (const file of labPages()) {
    const source = readFileSync(new URL(file, PUBLIC_DIR), 'utf8')
    const ids = MODEL_LAB_IDS.filter(id => source.includes(`id="${id}"`))
    if (ids.length === 0) continue
    assert.deepEqual(
      ids,
      MODEL_LAB_IDS,
      `${file} has some boundary ids but not all of them, so a list will render empty`,
    )
    checked.push(file)
  }
  // 新增模型实验页时这里要同步加一：数字是「有几页必须带齐三个 id」的契约，
  // 不是页面总数的自动统计，所以漏登记新页面会在这里失败。
  assert.equal(checked.length, 15, 'the fifteen model labs must each keep all three ids')
})

test('a verdict badge carries its state in data-pass, not in its text', () => {
  // The Chinese badge text is presentation. Colour and icon read the boolean, so
  // the wording can change without changing what the page asserts.
  const kit = readFileSync(new URL('study-lab-kit.js', PUBLIC_DIR), 'utf8')
  assert.match(kit, /badge\.dataset\.pass = String\(verdict\.pass\)/)
  assert.match(kit, /verdict\.pass \? '通过' : '未通过'/)
})
