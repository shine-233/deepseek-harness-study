/**
 * skill-catalog 实验页的渲染层。模型在 skill-catalog-model.js；本文件只画返回值。
 * 信封预览、digest 与探测结局读的是同一次计算；「上一轮 digest」由上一轮输入
 * 的 digest 在页面内存里接续（不进 URL、不落存储）。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installInputReset } from './study-lab-kit.js'
import {
  SKILL_NAMES,
  SKILL_TOOL_VISIBILITY,
  buildSkillCatalogModel,
  evaluateSkillCatalogOracle,
} from './skill-catalog-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const TRANSITION_LABELS = {
  initial: '首次发布：这轮 pre-step 追加了初始目录消息',
  replacement: '替换：digest 变了，追加完整的新信封',
  retired: '退役：目录清空，显式告知不要再用旧名字',
  unchanged: '未变：digest 相同，不追加任何消息',
  omitted: '本轮省略（原因见下）',
  'unchanged-empty': '空且此前也无目录：无需墓碑',
}

function initializePage() {
  const elements = {
    form: document.querySelector('#skill-form'),
    commitPresent: document.querySelector('#skill-commit'),
    releasePresent: document.querySelector('#skill-release'),
    legacyPresent: document.querySelector('#skill-legacy'),
    description: document.querySelector('#skill-desc'),
    visibility: document.querySelector('#skill-visibility'),
    probe: document.querySelector('#skill-probe'),
    feedback: document.querySelector('#skill-feedback'),
    envelope: document.querySelector('#sc-envelope'),
    envelopeNote: document.querySelector('#sc-envelope-note'),
    transitionOut: document.querySelector('#metric-transition'),
    digestOut: document.querySelector('#metric-digest'),
    countOut: document.querySelector('#metric-count'),
    probeOut: document.querySelector('#metric-probe'),
    omitOut: document.querySelector('#metric-omit'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const option of SKILL_TOOL_VISIBILITY) {
    const node = document.createElement('option')
    node.value = option
    writeText(node, option)
    elements.visibility.append(node)
  }
  for (const name of [...SKILL_NAMES, 'nonexistent']) {
    const node = document.createElement('option')
    node.value = name
    writeText(node, name)
    elements.probe.append(node)
  }

  let previousDigest = null

  const rebuild = () => {
    try {
      const present = [
        ...(elements.commitPresent.checked ? ['commit-helper'] : []),
        ...(elements.releasePresent.checked ? ['release-notes'] : []),
        ...(elements.legacyPresent.checked ? ['legacy-migrate'] : []),
      ]
      const model = buildSkillCatalogModel({
        present,
        toolVisibility: elements.visibility.value,
        descriptionOverride: elements.description.value,
        previousDigest,
        probe: elements.probe.value === '' ? null : elements.probe.value,
      })
      const verdict = evaluateSkillCatalogOracle(model)

      if (model.envelope !== null) {
        elements.envelope.hidden = false
        writeText(elements.envelope, model.envelope)
      } else {
        elements.envelope.hidden = true
        writeText(elements.envelope, '')
      }
      writeText(elements.envelopeNote, model.omitReason ?? '目录按 <available_skills> 信封渲染：只有名字和截断后的描述。')
      writeText(elements.transitionOut, TRANSITION_LABELS[model.transition] ?? model.transition)
      writeText(elements.digestOut, model.digest.slice(0, 12) + '…')
      writeText(elements.countOut, `${String(model.observations.publishedCount)} / ${String(model.observations.snapshotSize)}`)
      writeText(elements.probeOut, model.probe.name === null ? '—' : `${model.probe.name}: ${model.probe.detail}`)
      writeText(elements.omitOut, model.omitReason ?? '无——满足发布条件')

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      // 推进「上一轮」：本轮已发布的 digest 成为下一轮比较基线；省略轮不改变基线。
      if (model.transition !== 'omitted' && model.entries.length > 0) previousDigest = model.digest
      if (model.transition === 'retired') previousDigest = null

      setFeedback('目录视图已重算：' + (TRANSITION_LABELS[model.transition] ?? model.transition) + '。', 'success')
    } catch (error) {
      console.error('[skill-catalog] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: () => { previousDigest = null; rebuild() } })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.commitPresent, elements.releasePresent, elements.legacyPresent]) {
    control.addEventListener('change', rebuild)
  }
  for (const control of [elements.description, elements.visibility, elements.probe]) {
    control.addEventListener('input', rebuild)
    control.addEventListener('change', rebuild)
  }

  rebuild()

  elements.copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'summary-only',
    explain: {
      'summary-only': '正确。目录只含 name 和截断后的 description；正文要等模型精确调用 skill 工具才加载——这就是渐进加载。',
      'full-body': '把全部正文塞进每轮提示词正是这个设计要避免的事：上下文成本会随技能数量线性膨胀。',
      'no-entry': '完全不提会让模型错过可用的技能；一行摘要就是为此存在的最小提示。',
    },
  })
}
