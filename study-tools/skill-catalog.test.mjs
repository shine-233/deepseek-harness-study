import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SKILL_NAMES,
  buildSkillCatalogModel,
  evaluateSkillCatalogOracle,
} from '../website/public/skill-catalog-model.js'

const BASE = { present: ['commit-helper'], toolVisibility: 'visible', descriptionOverride: '', previousDigest: null, probe: null }

test('the same input produces byte-identical output', () => {
  assert.equal(
    JSON.stringify(buildSkillCatalogModel(BASE)),
    JSON.stringify(buildSkillCatalogModel(BASE)),
  )
})

const GRID = []
for (const present of [['commit-helper'], ['commit-helper', 'release-notes'], ['commit-helper', 'legacy-migrate'], [], ['legacy-migrate']]) {
  for (const toolVisibility of ['visible', 'restricted', 'shadowed']) {
    for (const descriptionOverride of ['', '按约定式提交规范撰写 commit message（v2）']) {
      for (const previousDigest of [null, '{"x":1}']) {
        GRID.push({ present, toolVisibility, descriptionOverride, previousDigest, probe: null })
      }
    }
  }
}

test('every input passes every oracle check across the whole input grid', () => {
  assert.equal(GRID.length, 60)
  for (const input of GRID) {
    const model = buildSkillCatalogModel(input)
    const result = evaluateSkillCatalogOracle(model)
    for (const check of result.checks) {
      assert.equal(check.pass, true,
        `${input.present.join('+')}/${input.toolVisibility}/${input.previousDigest} failed ${check.id}: ${check.actual}`)
    }
  }
})

test('the envelope contains only names and truncated descriptions, never bodies', () => {
  const model = buildSkillCatalogModel(BASE)
  assert.ok(model.envelope.includes('- `commit-helper`: 按约定式提交规范撰写 commit message'))
  assert.ok(!model.envelope.includes('staged diff'))
  assert.ok(!model.envelope.includes('whenToUse'))
  assert.ok(model.observations.bodiesLeaked === 0)
})

test('omission rules cover zero invocable skills, restriction and shadowing', () => {
  const noneInvocable = buildSkillCatalogModel({ ...BASE, present: ['legacy-migrate'] })
  assert.match(noneInvocable.omitReason, /没有任何可被模型调用的技能/)

  const restricted = buildSkillCatalogModel({ ...BASE, toolVisibility: 'restricted' })
  assert.match(restricted.omitReason, /restrict/)

  const shadowed = buildSkillCatalogModel({ ...BASE, toolVisibility: 'shadowed' })
  assert.match(shadowed.omitReason, /遮蔽/)
})

test('digest changes drive initial → replacement → retired transitions', () => {
  const first = buildSkillCatalogModel(BASE)
  assert.equal(first.transition, 'initial')

  const sameAgain = buildSkillCatalogModel({ ...BASE, previousDigest: first.digest })
  assert.equal(sameAgain.transition, 'unchanged')
  assert.equal(sameAgain.envelope, null)

  const edited = buildSkillCatalogModel({ ...BASE, previousDigest: first.digest, descriptionOverride: 'v2 描述' })
  assert.equal(edited.transition, 'replacement')
  assert.notEqual(edited.digest, first.digest)
  assert.ok(edited.envelope !== null)

  const retired = buildSkillCatalogModel({ ...BASE, previousDigest: first.digest, present: [] })
  assert.equal(retired.transition, 'retired')
  assert.ok(retired.envelope.includes('</available_skills>'))
})

test('the three skill-tool outcomes stay distinct', () => {
  const loaded = buildSkillCatalogModel({ ...BASE, probe: 'commit-helper' })
  assert.equal(loaded.probe.kind, 'loaded')

  const userOnly = buildSkillCatalogModel({ ...BASE, present: ['commit-helper', 'legacy-migrate'], probe: 'legacy-migrate' })
  assert.equal(userOnly.probe.kind, 'not-model-invocable')

  const unknown = buildSkillCatalogModel({ ...BASE, probe: 'nonexistent' })
  assert.equal(unknown.probe.kind, 'unknown')

  const kinds = new Set([loaded.probe.kind, userOnly.probe.kind, unknown.probe.kind])
  assert.equal(kinds.size, 3)
  assert.ok(SKILL_NAMES.length === 3)
})
